const helpers = require('../utils/helpers');

const apiHelper = require('../utils/axiosRequest');

const { marvelUrl, charactersPerPage } = require('../utils/constants');

const { generateHash, generateTs } = helpers;

const { fetchData } = apiHelper;

const publicKey = process.env.PUBLIC_KEY;

exports.index = async (req, res) => {
  const ts = generateTs();
  const hash = generateHash(ts);
  const page = req.query.page || 1;
  const offset = (page - 1) * charactersPerPage + 1;
  const path = `/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${charactersPerPage}&offset=${offset}`;

  try {
    const response = await fetchData(`${marvelUrl}${path}`);

    const ids = response.data.results.map(char => char.id);

    res.status(200).send(`Here is your array -> ${ids}`);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

exports.show = async (req, res) => {
  const ts = generateTs();
  const hash = generateHash(ts);

  const path = `/v1/public/characters/${req.params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetchData(`${marvelUrl}${path}`);

    const character = response.data.results[0];

    const { id, name, description } = character;

    const charProfile = { id, name, description };

    res.status(200).send(charProfile);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
