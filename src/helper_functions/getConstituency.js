const request = require('request');
const constructRemoteReply = require('./constructRemoteReply');

function getConstituency(postCode, senderID, cb) {
  const url = `http://api.postcodes.io/postcodes/${postCode}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const parsedBody = JSON.parse(body);
    if (parsedBody.error) {
      console.log('error is ', parsedBody.error);
      constructRemoteReply(senderID, 'Oops that doesn\'t seem like a UK postcode. Please try again!');
    }
    const constituency = parsedBody.result.parliamentary_constituency;
    cb(null, constituency);
  });
}

module.exports = getConstituency;
