const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');
const constructAnswers = require('./answer_objects');
const get = require('./../database/get_data');

function findLocalReply(senderID, intent, contexts){
  get.firstName(senderID, (err, firstName) => {
    if (err) {
      return err;
    }
    console.log('firstname is ', firstName);
    const answer_objects = constructAnswers(firstName);
    for (const key in answer_objects) {
      if (key === intent) {
          // console.log(key);
          // console.log('found intent=', intent);
    constructLocal(senderID, key);
        sendToFB(messageData);
      }
    }
  });
};

function constructLocal(senderID, key) {
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
  constructLocal
}
