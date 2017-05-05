const express = require('express');

const app = express.Router();

/* Home */
module.exports = [
  app.get('/test', (req, res) => {
    res.send('I worked');
    res.status(200);
  }),
];
