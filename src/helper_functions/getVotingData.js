const get = require('../database/get_data');
const construct = require('./answer_objects');
const searchAnsObjects = require('./searchAnsObjects');

function getVotingData(senderID, intent, partyKey) {
  get.partyVotes(partyKey, (err, res) => {
    if (err) {
      return err;
    }
    const partyVotesObj = res.rows[0];

    construct(partyVotesObj, null, null, null, senderID, intent, searchAnsObjects);
  });
}

module.exports = getVotingData;
