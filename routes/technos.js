const express = require('express');

const router = express.Router();

const connexion = require('../conf');

const isDev = process.env.NODE_ENV === 'development';
const { verifyToken } = require('../services/token');

router.get('/', verifyToken, (req, res) => {
  connexion.query('SELECT * from techno', (err, result) => {
    if (err) {
      return res.status('500').json({
        message: err.message,
        sql: isDev && err.sql
      });
    }
    return res.status(200).json(result);
  });
});

router.post('/', verifyToken, (req, res) => {
  connexion.query('INSERT INTO techno SET ?', [{ ...req.body }], (err, result) => {
    if (err) {
      return res.status('500').json({
        message: isDev ? err.message : 'Erreur Serveur',
        sql: isDev && err.sql
      });
    }
    const host = req.get('host');
    const location = `http://${host}/project/${result.insertId}`;
    return res.status(201).set('location', location).json({ result });
  });
});

module.exports = router;
