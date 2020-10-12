const express = require('express');

const router = new express.Router();

const charactersController = require('../controllers/characters');

router.get('/characters', charactersController.index);

router.get('/characters/:id', charactersController.show);

module.exports = router;
