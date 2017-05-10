const get = require('../database/get_data');

function extractContexts(senderID, intent, cb) {
  get.party(senderID, (err, res) => {
    if (err) {
      return err;
    }
    console.log(res + intent);
    const partyKey = res + intent;
    cb(senderID, intent, partyKey);
  });
}

module.exports = extractContexts;
