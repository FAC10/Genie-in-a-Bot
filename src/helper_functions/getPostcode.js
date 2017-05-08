const request = require('request');

function getPostcode(latitude, longtitude) {
  const url = `https://api.postcodes.io/postcodes?lon=${longtitude}&lat=${latitude}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    console.log(JSON.parse(body));
  });
}

module.exports = getPostcode;
