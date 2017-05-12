const Twitter = require('twitter');
require('env2')('./config.env');

function getTweets() {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  client.get('search/tweets', { q: 'from:jeremycorbyn' }, (error, tweets, response) => {
    console.log(tweets);
  });
}

module.exports = getTweets;
