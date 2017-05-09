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
  if (intent === 'brexit') {
    const partyKey = extractContexts(contexts, intent);
    get.partyVotes(partyKey, (err, res) => {
      if (err) {
        return err;
      }
      const partyVotesObj = res.rows[0];
      console.log('partyVotesObj is ', partyVotesObj);
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
          // boolean = true;
        }
      }
      // cb(boolean, contexts, senderID);
    });
  }
}

// function cb(boolean, contexts, senderID) {
//   console.log('boolean is ', boolean);
//   if (boolean === false) {
//     buildByContexts(contexts, senderID);
//   }
// }


// function buildByContexts(contexts, senderID) {
//   for (const key in answer_objects) {
//     console.log('contexts inside else statement are ', contexts);
//     contexts.forEach((context) => {
//       if (key === context.name) {
//         const messageData = constructLocal(senderID, key, answer_objects);
//         sendToFB(messageData);
//       }
//     });
//   }
// }

module.exports = {
  findLocalReply,
  constructLocal,
};
