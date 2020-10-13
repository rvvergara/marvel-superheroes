const express = require('express');

const router = new express.Router();

const charactersController = require('../controllers/characters');

const cache = require('../middleware/cache');

const response = require('../utils/response');

router.get(
  '/characters',
  cache.getCharactersFromCache,
  charactersController.index,
  cache.setCharactersInCache,
  response.successResponse,
);

router.get(
  '/characters/:id', charactersController.show,
);

module.exports = router;
