const request = require('request');

function getConstituency(postCode, cb) {
  const url = `http://api.postcodes.io/postcodes/${postCode}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const parsedBody = JSON.parse(body);
    const constituency = parsedBody.result.parliamentary_constituency;
    cb(null, constituency);
  });
}

module.exports = getConstituency;
