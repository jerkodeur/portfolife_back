const express = require('express');
const router = express.Router();

const technoModel = require('../models/techno');

const { verifyToken } = require('../services/token');
const { requestErrors } = require('../handlers/request');

router.get('/', verifyToken, (req, res) => {
  technoModel.findAllTechnos((err, technos) => err ? requestErrors(err, res) : res.json(technos));
});

router.post('/', verifyToken, (req, res) => {
  technoModel.createTechno({ ...req.body }, (err, resultId) => {
    if (err) return requestErrors(err, res);
    technoModel.findTechnoById(resultId, (err, newTechno) => err ? requestErrors(err, res) : res.json(newTechno));
  });
});

module.exports = router;
