const get = require('../database/get_data');
const construct = require('./answer_objects');
const sendToFB = require('./sendToFB');
const constructLocal = require('./findLocalReply');

function getVotingData(senderID, intent, partyKey) {
  console.log('partyKey is ', partyKey);
  get.partyVotes(partyKey, (err, res) => {
    if (err) {
      return err;
    }
    const partyVotesObj = res.rows[0];
    console.log('partyVotesObj is ', partyVotesObj);
    const answerObjects = construct(partyVotesObj, null);
    console.log('answerObjects are ', answerObjects);
    for (const key in answerObjects) {
      if (key === intent) {
        console.log(constructLocal.constructLocal(senderID, key, answerObjects));
        sendToFB(messageData);
      // boolean = true;
      }
    }
  });
}

module.exports = getVotingData;
