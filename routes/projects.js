const express = require('express');

const router = express.Router();
const connexion = require('../conf');

const { verifyToken } = require('../services/token');
const projectModel = require('../models/project');

const isDev = process.env.NODE_ENV === 'development';

// fetch all projects
router.get('/', (req, res) => {
  projectModel.findAll((err, projects) => {
    if (err) {
      return res.status('500').json({
        message: isDev ? err.message : 'Erreur Serveur',
        sql: isDev && err.sql
      });
    }
    return res.json(projects);
  });
});

// fetch a particular projects
router.get('/:id', (req, res) => {
  projectModel.findOneById(req.params.id, (err, project) => {
    if (err) {
      return res.status('500').json({
        message: isDev ? err.message : 'Erreur Serveur',
        sql: isDev && err.sql
      });
    }
    return res.json(project);
  });
});

// Post a new project
router.post('/', verifyToken, (req, res) => {
  const { technos, ...project } = req.body;
  const { imgPrefix, context, contextUrl, title, description, urlGithub, urlTest, nbImages, date, shortDescription, background, active } = project;

  connexion.query('INSERT INTO project (img_prefix, context, context_url, title, description, url_github, url_test, nb_images, date, short_description, background, active ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [imgPrefix, context, contextUrl, title, description, urlGithub, urlTest, nbImages, date, shortDescription, background, active], (err, result) => {
    if (err) {
      return res.status('500').json({
        message: isDev ? err.message : 'Erreur Serveur',
        sql: isDev && err.sql
      });
    }
    // Add technos selected
    const sql = 'INSERT INTO project_techno VALUES ?';
    const listTechnos = technos.reduce((acc, technoId) => {
      acc.push([result.insertId, parseInt(technoId)]);
      return acc;
    }, []);

    connexion.query(sql, [listTechnos], (err, result) => {
      if (err) {
        return res.status(500).json({
          server: isDev ? err.message : 'Erreur Serveur',
          sql: isDev && err.sql
        });
      }
    });

    // return create infos to the user
    connexion.query(
      'SELECT * FROM project WHERE id = ?',
      result.insertId,
      (err, result2) => {
        if (err) {
          return res.status('500').json({
            message: isDev ? err.message : 'Erreur Serveur',
            sql: isDev && err.sql
          });
        }
        const host = req.get('host');
        const location = `http://${host}/project/${result.insertId}`;
        return res.status(201).set('location', location).json({ 'new project': result2 });
      }
    );
  });
});

module.exports = router;
