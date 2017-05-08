const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');
const constructAnswers = require('./answer_objects');
const get = require('./../database/get_data');

function findLocalReply(senderID, intent, contexts) {
  const boolean = false;
  console.log('find local reply contexts are', contexts);
  get.firstName(senderID, (err, firstName) => {
    if (err) {
      return err;
    }
    const answer_objects = constructAnswers(firstName);
    for (const key in answer_objects) {
      if (key === intent) {
        const messageData = constructLocal(senderID, key, answer_objects);
        sendToFB(messageData);
        boolean === true;
      }
    }
    cb(boolean, contexts, senderID);
  });
}

function cb(boolean, contexts, senderID) {
  if (boolean === false) {
    buildByContexts(contexts, senderID);
  }
}


function buildByContexts(contexts, senderID) {
  for (const key in answer_objects) {
    console.log('contexts inside else statement are ', contexts);
    contexts.forEach((context) => {
      if (key === context.name) {
        const messageData = constructLocal(senderID, key, answer_objects);
        sendToFB(messageData);
      }
    });
  }
}

function constructLocal(senderID, key, answer_objects) {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: answer_objects[key],
  };

  return messageData;
}

module.exports = {
  findLocalReply,
  constructLocal,
};
