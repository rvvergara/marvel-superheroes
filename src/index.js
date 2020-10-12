require('dotenv').config();

const express = require('express');

const axios = require('axios');

const CryptoJS = require('crypto-js');

const app = express();

const port = process.env.PORT;

const marvelURL = 'http://gateway.marvel.com';

const publicKey = process.env.PUBLIC_KEY;

const generateTs = () => new Date().getTime();

const privateKey = process.env.PRIVATE_KEY;

const generateHash = (ts) => CryptoJS.MD5(`${ts}${privateKey}${publicKey}`);

app.use(express.json());

app.get('/', async (req, res) => {
  res.send(`Get ready for the superheroes! Your hash is ${generateHash()}`);
});

app.get('/characters', async (req, res) => {
  const ts = generateTs();
  const hash = generateHash(ts);
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  const path = `/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  const response = await axios.get(`${marvelURL}${path}`);

  const ids = response.data.data.results.map(char => char.id);

  res.send(`Here is your array -> ${ids}`);
});

app.get('/characters/:id', async (req, res) => {
  const ts = generateTs();
  const hash = generateHash(ts);

  const path = `/v1/public/characters/${req.params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  const response = await axios.get(`${marvelURL}${path}`);

  const character = response.data.data.results[0];

  const { id, name, description } = character;

  const charProfile = { id, name, description };

  res.status(200).send(charProfile);
});

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});
