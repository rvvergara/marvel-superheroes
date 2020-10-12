require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT;

const publicKey = process.env.PUBLIC_KEY;

const privateKey = process.env.PRIVATE_KEY;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send(`Get ready for the superheroes! Your public key is ${publicKey}. Your private key is ${privateKey}`);
});

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});
