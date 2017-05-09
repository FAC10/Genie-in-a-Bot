const sendToFB = require('./sendToFB');
const construct = require('./answer_objects');
const get = require('./../database/get_data');
const extractContexts = require('./extractContexts');

function constructLocal(senderID, key, answerObjects) {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: answerObjects[key],
  };

  return messageData;
}

function findLocalReply(senderID, intent, contexts) {
  // let boolean = false;
  // console.log('intent is', intent);
  if (intent === 'brexit' || intent === 'tuitionFees' || intent === 'syria') {
    const partyKey = extractContexts(contexts, intent);
    get.partyVotes(partyKey, (err, res) => {
      if (err) {
        return err;
      }
      const partyVotesObj = res.rows[0];
      const answerObjects = construct(partyVotesObj, null);
      for (const key in answerObjects) {
        if (key === intent) {
          const messageData = constructLocal(senderID, key, answerObjects);
          sendToFB(messageData);
          // boolean = true;
        }
      }
    });
  } else {
    get.firstName(senderID, (err, firstName) => {
      if (err) {
        return err;
      }
      const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
      const answerObjects = construct(placeholderVotingObj, firstName);
      for (const key in answerObjects) {
        if (key === intent) {
          const messageData = constructLocal(senderID, key, answerObjects);
          sendToFB(messageData);
        }
      }
    });
  }
}


module.exports = {
  findLocalReply,
  constructLocal,
};
