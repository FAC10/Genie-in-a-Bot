const express = require('express');

const app = express.Router();

/* Home */
module.exports = [
  app.get('/', (req, res) => {
    res.send('I should be working');
    res.status(200);
  }),
];
