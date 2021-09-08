const express = require('express');
const router = express.Router();

const connexion = require('../conf');
const projectModel = require('../models/project');

const { requestErrors } = require('../handlers/request');
const { verifyToken } = require('../services/token');

// fetch all projects
router.get('/', (req, res) => {
  projectModel.findAll((err, projects) => {
    return err ? requestErrors(err, res) : res.json(projects);
  });
});

// fetch a particular projects
router.get('/:id', (req, res) => {
  projectModel.findOneById(req.params.id, (err, project) => {
    return err ? requestErrors(err, res) : res.json(project);
  });
});

// Post a new project
router.post('/', verifyToken, (req, res) => {
  const { technos, ...project } = req.body;
  const entries = {};
  // convert camelCase keys to snake_case
  for (const entry in project) {
    entries[entry.split(/(?=[A-Z])/).join('_').toLowerCase()] = project[entry];
  }

  connexion.query(`INSERT INTO project (${[...Object.keys(entries)]}) VALUES (?)`, [Object.values(entries)], (err, result) => {
    if (err) return requestErrors(err, res);
    // Add technos selected
    const sql = 'INSERT INTO project_techno VALUES ?';
    const listTechnos = technos.reduce((acc, technoId) => {
      acc.push([result.insertId, parseInt(technoId)]);
      return acc;
    }, []);

    connexion.query(sql, [listTechnos], (err, result) => {
      if (err) return requestErrors(err, res);
    });

    // return create infos to the user
    projectModel.findOneById(result.insertId, (err, project) => {
      return err ? requestErrors(err, res) : res.json(project);
    });
  });
});

router.patch('/async/:id', verifyToken, (req, res) => {
  const { key, value } = req.body;
  const id = req.params.id;
  connexion.query(`UPDATE project SET ${key} = ? WHERE id = ?`, [value, id], (err, result) => {
    if (err) return requestErrors(err, res);

    projectModel.findOneById(id, (err, project) => {
      return err ? requestErrors(err, res) : res.json(project);
    });
  });
});

router.delete('/:id', verifyToken, (req, res) => {
  connexion.query('DELETE FROM project WHERE id = ?', req.params.id, (err, _) => {
    if (err) return requestErrors(err, res);
    projectModel.findAll((err, projects) => {
      return err ? requestErrors(err, res) : res.json(projects);
    });
  });
});

module.exports = router;
