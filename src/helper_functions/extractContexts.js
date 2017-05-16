const get = require('../database/get_data');

function extractContexts(senderID, intent, cb) {
  console.log('I am in extractContexts');
  get.party(senderID, (err, res) => {
    if (err) {
      return err;
    }
    if (!res) {
      cb(senderID, intent, 'noContext');
    } else if (res !== 'Conservative' && res !== 'Labour' && res !== 'Lib Dem' && res !== 'Green' && res !== 'SNP') {
      cb(senderID, intent, 'noContext');
    } else {
      const partyKey = res + intent;
      console.log('I am sending partyKey of ', partyKey);
      cb(senderID, intent, partyKey);
    }
  });
}

module.exports = extractContexts;
