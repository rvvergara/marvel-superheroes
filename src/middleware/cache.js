const redis = require('redis');

const redisPort = process.env.REDIS_PORT;

const redisClient = redis.createClient(redisPort);

const setCharactersInCache = (req, res, next) => {
  const { data } = res.locals;
  const charactersPage = data.page;

  const key = `charactersPage${charactersPage}`;

  redisClient.setex(key, 3600, JSON.stringify(data));

  return next();
}

const getCharactersFromCache = async (req, res, next) => {
  const charactersPage = req.query.page || 1;

  const key = `charactersPage${charactersPage}`;

  redisClient.get(key, (err, data) => {
    if(err){
      res.status(500).send(err);
    } else if(data !== null) {
      return res.status(200).send(data);
    } else {
      return next();
    }
  })

}

module.exports = {
  setCharactersInCache,
  getCharactersFromCache
}