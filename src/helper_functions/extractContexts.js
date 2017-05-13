const get = require('../database/get_data');
const construct = require('./answer_objects');
const searchAnsObjects = require('./searchAnsObjects');

function extractContexts(senderID, intent, cb) {
  console.log('I am in extractContexts');
  get.party(senderID, (err, res) => {
    if (err) {
      return err;
    }
    if (!res) {
      const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
      construct(placeholderVotingObj, null, null, null, senderID, 'Parties', searchAnsObjects);
    }
    const partyKey = res + intent;
    console.log('I am sending partyKey of ', partyKey);
    cb(senderID, intent, partyKey);
  });
}

module.exports = extractContexts;
