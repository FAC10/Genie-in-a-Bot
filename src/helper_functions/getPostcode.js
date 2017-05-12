const request = require('request');

function getPostcode(latitude, longtitude, senderID, callback, cb) {
  const url = `https://api.postcodes.io/postcodes?lon=${longtitude}&lat=${latitude}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const parsedBody = JSON.parse(body);
    const overseasCode = parsedBody.result;
    if (overseasCode === null) {
      const messageData = {
        recipient: {
          id: senderID,
        },
        message: { text: 'I\'m here to give you information on the UK general election. To continue, please enter a UK postcode' },
      };

      callback(messageData);
    } else {
      const postCode = parsedBody.result[0].postcode;
      const constituency = parsedBody.result[0].parliamentary_constituency;
      cb(postCode, constituency);
    }
  });
}

module.exports = getPostcode;
