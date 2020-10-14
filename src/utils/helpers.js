const CryptoJS = require('crypto-js');

const publicKey = process.env.PUBLIC_KEY;

const privateKey = process.env.PRIVATE_KEY;

const generateTs = () => new Date().getTime();

const generateHash = (ts) => CryptoJS.MD5(`${ts}${privateKey}${publicKey}`);

module.exports = { generateTs, generateHash };
