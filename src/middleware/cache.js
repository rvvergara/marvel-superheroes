const redis = require('redis');

const response = require('../utils/response');

const redisPort = process.env.REDIS_PORT;

const redisClient = redis.createClient(redisPort);

const setCharactersInCache = (req, res, next) => {
  const { data } = res.locals;
  const charactersPage = data.page;

  const key = `charactersPage${charactersPage}`;

  redisClient.setex(key, 3600, JSON.stringify(data));

  return next();
};

const setIndividualCharacterInCache = (req, res, next) => {
  const { data } = res.locals;

  const key = data.id;

  redisClient.setex(key, 3600, JSON.stringify(data));

  return next();
};

const getCharactersFromCache = (req, res, next) => {
  const charactersPage = req.query.page || 1;

  const key = `charactersPage${charactersPage}`;

  redisClient.get(key, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } if (data !== null) {
      res.locals = {
        data,
        code: 200,
      };
      return response.responseObject(req, res);
    }
    return next();
  });
};

const getIndividualCharacterFromCache = (req, res, next) => {
  const key = req.params.id;

  redisClient.get(key, (err, data) => {
    if (err) {
      return response.errorResponse(req, res, err);
    } if (data !== null) {
      res.locals = {
        code: 200,
        data,
      };
      return response.responseObject(req, res);
    }
    return next();
  });
};

module.exports = {
  setCharactersInCache,
  getCharactersFromCache,
  setIndividualCharacterInCache,
  getIndividualCharacterFromCache,
};
