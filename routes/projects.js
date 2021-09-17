const express = require('express');
const router = express.Router();

const connexion = require('../conf');
const projectModel = require('../models/project');
const technoModel = require('../models/techno');

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
    const listTechnos = technos.reduce((acc, technoId) => {
      acc.push([result.insertId, parseInt(technoId)]);
      return acc;
    }, []);
    technoModel.addTechnosToProject(listTechnos, (err, _) => err && requestErrors(err, res));
    // return create infos to the user
    projectModel.findOneById(result.insertId, (err, project) => {
      return err ? requestErrors(err, res) : res.json(project);
    });
  });
});

// Update one field from a project
router.patch('/async/:id', verifyToken, (req, res) => {
  const key = req.body.key.split(/(?=[A-Z])/).join('_').toLowerCase();
  const value = req.body.value !== '' ? req.body.value : null;
  connexion.query(`UPDATE project SET ${key} = ? WHERE id = ?`, [value, req.params.id], (err, result) => {
    if (err) return requestErrors(err, res);

    projectModel.findOneById(req.params.id, (err, project) => {
      return err ? requestErrors(err, res) : res.json(project);
    });
  });
});

// Add one techno on a project
router.post('/:project/addTechno', verifyToken, (req, res) => {
  technoModel.addOneTechnoToProject(req.params.project, req.body.technoId, (err, _) => {
    if (err) return requestErrors(err, res);
    return technoModel.findTechnosByProject(req.params.project, (err, technos) => err ? requestErrors(err, res) : res.json(technos));
  });
});

// Remove one techno from a project
router.delete('/:project/technos/:id', verifyToken, (req, res) => {
  technoModel.removeOneTechnoFromProject(req.params.project, req.params.id, (err, _) => {
    if (err) return requestErrors(err, res);
    return technoModel.findTechnosByProject(req.params.project, (err, technos) => err ? requestErrors(err, res) : res.json(technos));
  });
});

// Delete a full project
router.delete('/:id', verifyToken, (req, res) => {
  projectModel.deleteFullProject(req.params.id, (err, _) => {
    if (err) return requestErrors(err, res);
    return projectModel.findAll((err, projects) => err ? requestErrors(err, res) : res.json(projects));
  });
});

module.exports = router;
