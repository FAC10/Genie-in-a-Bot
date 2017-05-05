const request = require('request');
require('env2')('./config.env');

function getFacebookName(facebookId) {
  const url = `https://graph.facebook.com/v2.6/${facebookId}?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
  request(url, (err, res, body) => {
    if (err) {
      return err;
    }
    JSON.parse(body);
    // note, this also returns location and gender, in case we need these in the future
    console.log(body.first_name);
    const userDetails = {};
    userDetails.firstname = body.first_name;
    userDetails.lastname = body.last_name;
    userDetails.facebook_id = facebookId;
    console.log(userDetails);
  });
}

module.exports = getFacebookName;
