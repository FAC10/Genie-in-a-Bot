const express = require('express');

const app = express.Router();

/* Home */
module.exports = [
  app.get('/', (req, res) => {
    const url = 'https://m.me/politicalgenie';
    res.send(`Visit <a href=${url}>https://m.me/politicalgenie</a> to start talking to me`);
    res.status(200);
  }),
];
