const request = require('request');

function getPostcode(latitude, longtitude, cb) {
  const url = `https://api.postcodes.io/postcodes?lon=${longtitude}&lat=${latitude}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const parsedBody = JSON.parse(body);
    const overseasCode = parsedBody.result;
    console.log('overseasCode is', overseasCode);
    const postCode = parsedBody.result[0].postcode;
    const constituency = parsedBody.result[0].parliamentary_constituency;
    cb(postCode, constituency);
  });
}

module.exports = getPostcode;
