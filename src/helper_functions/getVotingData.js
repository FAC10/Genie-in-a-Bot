const get = require('../database/get_data');
const construct = require('./answer_objects');
const sendToFB = require('./sendToFB');
const constructLocal = require('./constructLocal');

function getVotingData(senderID, intent, partyKey) {
  get.partyVotes(partyKey, (err, res) => {
    if (err) {
      return err;
    }
    const partyVotesObj = res.rows[0];

    const answerObjects = construct(partyVotesObj, null, null);
    for (const key in answerObjects) {
      if (key === intent) {
        const messageData = constructLocal(senderID, key, answerObjects);
        sendToFB(messageData);
      // boolean = true;
      }
    }
  });
}

module.exports = getVotingData;
