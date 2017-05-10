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

function findLocalReply(senderID, intent) {
  // let boolean = false;
  // console.log('intent is', intent);

  if (intent === 'brexit' || intent === 'tuitionFees' || intent === 'syria') {
    const partyKey = extractContexts(senderID, intent);
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
