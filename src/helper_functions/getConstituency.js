const request = require('request');

function getConstituency(postCode, cb) {
  const url = `http://api.postcodes.io/postcodes/${postCode}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const parsedBody = JSON.parse(body);
    const constituency = parsedBody.result[0].parliamentary_constituency;
    cb(constituency);
  });
}

module.exports = getConstituency;
