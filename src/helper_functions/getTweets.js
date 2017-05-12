const Twitter = require('twitter');
require('env2')('./config.env');
const constructRemoteReply = require('./constructRemoteReply.js');

function getTweets(senderID, username) {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  client.get('search/tweets', { q: `from:${username}` }, (error, tweets, response) => {
    console.log(tweets);
    const time = (tweets.statuses[0].created_at).split(' ', 3).join(' ');
    const time2 = (tweets.statuses[1].created_at).split(' ', 3).join(' ');
    console.log(time);
    const messageOne = `${username} tweeted this on ${time}: ${tweets.statuses[0].text}`;
    constructRemoteReply(senderID, messageOne);
    const messageTwo = `${username} tweeted this on ${time2}: ${tweets.statuses[1].text}`;
    constructRemoteReply(senderID, messageTwo);
  });
}

module.exports = getTweets;
