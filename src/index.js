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

const generateHash = (ts) => CryptoJS.MD5(`${generateTs()}${privateKey}${publicKey}`);

app.use(express.json());

app.get('/', async (req, res) => {
  res.send(`Get ready for the superheroes! Your hash is ${generateHash()}`);
});

app.get('/characters', async (req, res) => {
  const ts = generateTs();
  const hash = generateHash(ts);
  const page = 500;
  const limit = 10;
  const offset = (page - 1) * limit;
  const path = `/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  const response = await axios.get(`${marvelURL}${path}`);

  const ids = response.data.data.results.map(char => char.id);

  console.log('RESPONSE HERE', response.data.data);

  res.send(`Here is your array -> ${ids}`);
});

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});
