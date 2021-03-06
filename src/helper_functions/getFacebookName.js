const request = require('request');
require('env2')('./config.env');
const post = require('./../database/db_post');

function getFacebookName(facebookId, cb) {
  const url = `https://graph.facebook.com/v2.6/${facebookId}?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const parsedBody = JSON.parse(body);
    // note, this also returns location and gender, in case we need these in the future

    const userDetails = {};
    userDetails.firstname = parsedBody.first_name;
    userDetails.lastname = parsedBody.last_name;
    userDetails.facebook_id = Number(facebookId);

    // pushes to the database
    post.userDetails(userDetails, (error) => {
      if (error) {
        console.log(error);
      }
      cb();
    });
  });
}

module.exports = getFacebookName;
