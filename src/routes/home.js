const express = require('express');
require('env2')('./config.env');
// const twitter_consumer_key = process.env.TWITTER_CONSUMER_KEY;
// const twitter_consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
// const getBearerToken = require('get-twitter-bearer-token');
const app = express.Router();

/* Home */
module.exports = [
  app.get('/', (req, res) => {
    // UNCOMMENT IF WE NEED A NEW BEARER TOKEN ONLY
    // getBearerToken(twitter_consumer_key, twitter_consumer_secret, (err, res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //   // bearer token
    //     console.log('twitter access token is ', res.body.access_token);
    //   }
    // });
    const url = 'https://m.me/politicalgenie';
    res.send(`Visit me <a href=${url}>on facebook</a> to start talking to me`);
    res.status(200);
  }),
];
