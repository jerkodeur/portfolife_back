const express = require('express');
const router = express.Router();

const projectModel = require('../models/project');
const technoModel = require('../models/techno');

const { requestErrors } = require('../handlers/request');
const { verifyToken } = require('../services/token');
const { camelToSnakeCase } = require('../services/helpers');
const { getRoles } = require('../services/verify');

// fetch all projects
router.get('/', (req, res) => {
  projectModel.findAll((err, projects) =>
    err ? requestErrors(req, err, res) : res.json(projects)
  );
});

// fetch a particular projects
router.get('/:id', (req, res) => {
  projectModel.findOneById(req.params.id, (err, project) =>
    err ? requestErrors(req, err, res) : res.json(project)
  );
});

// Post a new project
router.post('/', verifyToken, getRoles, (req, res) => {
  const { technos, ...project } = req.body;
  const entries = {};
  // convert camelCase keys to snake_case
  for (const entry in project) {
    entries[camelToSnakeCase(entry)] = project[entry];
  }

  projectModel.createProject(
    Object.keys(entries),
    Object.values(entries),
    (err, insertId) => {
      if (err) return requestErrors(req, err, res);

      const listTechnos = technos.reduce((acc, technoId) => {
        acc.push([insertId, parseInt(technoId)]);
        return acc;
      }, []);

      technoModel.addTechnosToProject(listTechnos, (err, _) => {
        if (err) return requestErrors(req, err, res);
        // return create infos to the user
        projectModel.findOneById(insertId, (err, project) =>
          err ? requestErrors(req, err, res) : res.json(project)
        );
      });
    }
  );
});

// Update one field from a project
router.put('/async/:id', verifyToken, (req, res) => {
  const key = camelToSnakeCase(req.body.key);
  const value = req.body.value !== '' ? req.body.value : null;
  projectModel.updateOneById([key, value], req.params.id, (err, _) => {
    if (err) return requestErrors(req, err, res);
    projectModel.findOneById(req.params.id, (err, project) =>
      err ? requestErrors(req, err, res) : res.json(project)
    );
  });
});

// Add one techno on a project
router.post('/:project/addTechno/:technoId', verifyToken, (req, res) => {
  const { project, technoId } = req.params;
  technoModel.addOneTechnoToProject(project, technoId, (err, _) => {
    if (err) return requestErrors(req, err, res);
    technoModel.findTechnosByProject(req.params.project, (err, technos) =>
      err ? requestErrors(req, err, res) : res.json(technos)
    );
  });
});

// Remove one techno from a project
router.delete('/:project/technos/:id', verifyToken, (req, res) => {
  const { project, id } = req.params;
  technoModel.removeTechnoFromProject(project, id, (err, _) => {
    if (err) return requestErrors(req, err, res);
    technoModel.findTechnosByProject(project, (err, technos) =>
      err ? requestErrors(req, err, res) : res.json(technos)
    );
  });
});

// Delete a full project
router.delete('/:id', verifyToken, (req, res) => {
  projectModel.deleteFullProject(req.params.id, (err, _) => {
    if (err) return requestErrors(req, err, res);
    projectModel.findAll((err, projects) =>
      err ? requestErrors(req, err, res) : res.json(projects)
    );
  });
});

module.exports = router;
