const Twitter = require('twitter');
require('env2')('./config.env');
const constructRemoteReply = require('./constructRemoteReply.js');

function getTweets() {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  function getUserTweets(senderID, username) {
    client.get('search/tweets', { q: `from:${username}` }, (error, tweets, response) => {
      console.log(tweets);
      const messageOne = tweets.statuses[0].text;
      constructRemoteReply(senderID, messageOne);
    });
  }
}

module.exports = getTweets;
