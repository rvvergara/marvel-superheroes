/* eslint-disable radix */
const helpers = require('../utils/helpers');

const apiHelper = require('../utils/axiosRequest');

const { marvelUrl, charactersPerPage } = require('../utils/constants');

const { generateHash, generateTs } = helpers;

const { fetchData } = apiHelper;

const publicKey = process.env.PUBLIC_KEY;

exports.index = async (req, res, next) => {
  const ts = generateTs();
  const hash = generateHash(ts);
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * charactersPerPage + 1;
  const path = `/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${charactersPerPage}&offset=${offset}&orderBy=modified`;

  try {
    const response = await fetchData(`${marvelUrl}${path}`);

    const { data } = response;

    const { results, total, limit } = data;

    const characterIds = results.map(char => char.id);

    const totalPages = Math.ceil(total / limit);

    const charactersData = {
      total,
      limit,
      characterIds,
      page,
      totalPages,
    };

    res.locals = {
      data: charactersData,
      code: response.code,
    };

    return next();
  } catch (error) {
    return res.status(500).send(error);
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
