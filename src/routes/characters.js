const express = require('express');

const router = new express.Router();

const helpers = require('../utils/helpers');

const apiHelper = require('../utils/axiosRequest');

const { marvelUrl } = require('../utils/constants');

const { generateHash, generateTs } = helpers;

const { fetchData } = apiHelper;

const publicKey = process.env.PUBLIC_KEY;

router.get('/characters', async (req, res) => {
  const ts = generateTs();
  const hash = generateHash(ts);
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  const path = `/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  const response = await fetchData(`${marvelUrl}${path}`);

  const ids = response.data.results.map(char => char.id);

  res.send(`Here is your array -> ${ids}`);
});

router.get('/characters/:id', async (req, res) => {
  const ts = generateTs();
  const hash = generateHash(ts);

  const path = `/v1/public/characters/${req.params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  const response = await fetchData(`${marvelUrl}${path}`);

  const character = response.data.results[0];

  const { id, name, description } = character;

  const charProfile = { id, name, description };

  res.status(200).send(charProfile);
});

module.exports = router;
