const express = require('express');

const app = express.Router();

/* Home */
module.exports = [
  app.get('/', (req, res) => {
    const url = 'https://m.me/politicalgenie';
    res.send(`Visit me <a href=${url}>on facebook</a> to start talking to me`);
    res.status(200);
  }),
];
