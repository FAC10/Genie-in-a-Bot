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
    constructRemoteReply(senderID, `The last three tweets from ${username}:`);
    const time = (tweets.statuses[0].created_at).split(' ', 3).join(' ');
    const time2 = (tweets.statuses[1].created_at).split(' ', 3).join(' ');
    const time3 = (tweets.statuses[2].created_at).split(' ', 3).join(' ');
    const messageOne = `${username} tweeted this on ${time}: ${tweets.statuses[0].text}`;
    constructRemoteReply(senderID, messageOne);
    const messageTwo = `${username} tweeted this on ${time2}: ${tweets.statuses[1].text}`;
    constructRemoteReply(senderID, messageTwo);
    const messageThree = `${username} tweeted this on ${time3}: ${tweets.statuses[2].text}`;
    constructRemoteReply(senderID, messageThree);
  });
}

function getMentions(senderID, username) {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  client.get('search/tweets', { q: `${username} -RT` }, (error, tweets, response) => {
    constructRemoteReply(senderID, `The last three tweets about ${username}:`);
    const time = (tweets.statuses[0].created_at).split(' ', 3).join(' ');
    const time2 = (tweets.statuses[1].created_at).split(' ', 3).join(' ');
    const time3 = (tweets.statuses[2].created_at).split(' ', 3).join(' ');
    console.log('users are ', tweets.statuses[0].user);
    const messageOne = `@${tweets.statuses[0].user.screen_name} (${tweets.statuses[0].user.description}) tweeted this on ${time}: ${tweets.statuses[0].text}`;
    constructRemoteReply(senderID, messageOne);
    const messageTwo = `@${tweets.statuses[1].user.screen_name} (${tweets.statuses[1].user.description}) tweeted this on ${time}: ${tweets.statuses[1].text}`;
    constructRemoteReply(senderID, messageTwo);
    const messageThree = `@${tweets.statuses[2].user.screen_name} (${tweets.statuses[2].user.description}) tweeted this on ${time}: ${tweets.statuses[2].text}`;
    constructRemoteReply(senderID, messageThree);
  });
}

// screen_name
// location
// description
// profile_image_url

module.exports = { getTweets, getMentions };
