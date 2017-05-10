const sendToFB = require('./sendToFB');
const construct = require('./answer_objects');
const get = require('./../database/get_data');
const extractContexts = require('./extractContexts');
const getVotingData = require('./getVotingData');
const constructLocal = require('./constructLocal');

function findLocalReply(senderID, intent) {
  // let boolean = false;
  // console.log('intent is', intent);

  if (intent === 'brexit' || intent === 'tuitionFees' || intent === 'syria') {
    extractContexts(senderID, intent, getVotingData);
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
};
