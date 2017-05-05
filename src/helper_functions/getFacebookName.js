const request = require('request');
require('env2')('./config.env');

function getFacebookName(facebookId) {
  const url = `https://graph.facebook.com/v2.6/${facebookId}?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
  request(url, (err, res, body) => {
    if (err) {
      return err;
    }
    JSON.parse(body);
    console.log(body);
  });
}

module.exports = getFacebookName;
