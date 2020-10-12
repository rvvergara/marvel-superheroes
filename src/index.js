require('dotenv').config();

const express = require('express');

const charactersRouter = require('./routes/characters');

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(charactersRouter);

app.get('/', async (req, res) => {
  res.send('Get ready for the superheroes!');
});

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});
