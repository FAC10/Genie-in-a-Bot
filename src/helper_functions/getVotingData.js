const get = require('../database/get_data');
const construct = require('./answer_objects');
const searchAnsObjects = require('./searchAnsObjects');

function getVotingData(senderID, intent, partyKey) {
  console.log('I am in getVotingData');
  get.partyVotes(partyKey, (err, res) => {
    if (err) {
      return err;
    }
    const partyVotesObj = res.rows[0];
    console.log('sending a partyVotesObj of ', partyVotesObj);
    construct(partyVotesObj, null, null, null, senderID, intent, searchAnsObjects);
  });
}

module.exports = getVotingData;
