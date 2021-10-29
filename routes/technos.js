const express = require('express');
const router = express.Router();

const technoModel = require('../models/techno');

const { verifyToken } = require('../services/token');
const { requestErrors } = require('../handlers/request');

router.get('/', (req, res) => {
  technoModel.findAllTechnos((err, technos) =>
    err ? requestErrors(req, err, res) : res.json(technos)
  );
});

router.post('/', verifyToken, (req, res) => {
  technoModel.createTechno({ ...req.body }, (err, resultId) => {
    if (err) return requestErrors(req, err, res);
    technoModel.findTechnoById(resultId, (err, newTechno) =>
      err ? requestErrors(req, err, res) : res.json(newTechno)
    );
  });
});

module.exports = router;
