const request = require('request');

function getConstituency(postCode, cb) {
  const url = `http://api.postcodes.io/postcodes/${postCode}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const constituency = parsedBody.result[0].parliamentary_constituency;
    console.log('constituency in get cons is', constituency);
    return constituency;
  });
}

module.exports = getConstituency;
