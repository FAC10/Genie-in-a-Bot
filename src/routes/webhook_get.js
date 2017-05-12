const express = require('express');
require('env2')('./config.env');
const getBearerToken = require('get-twitter-bearer-token');
const twitter_consumer_key = process.env.TWITTER_CONSUMER_KEY;
const twitter_consumer_secret = process.env.TWITTER_CONSUMER_SECRET;

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


  getBearerToken(twitter_consumer_key, twitter_consumer_secret, (err, res) => {
    if (err) {
    // handle error
    } else {
    // bearer token
      console.log('twitter access token is ', res.body.access_token);
    }
  }),
];
