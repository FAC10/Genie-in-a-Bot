const express = require('express');
require('env2')('./config.env');

const app = express.Router();

/* For Facebook Validation */
module.exports = [
  app.get('/webhook', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.FB_SECRET) {
      console.log('Validating webhook');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('Failed validation. Make sure the validation tokens match.');
      res.sendStatus(403);
    }
  }),
];
