const redis = require('redis');

const redisPort = process.env.REDIS_PORT;

const redisClient = redis.createClient(redisPort);

const set = 