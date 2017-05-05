const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');

module.exports = (senderID, intent, contexts) => {
  for (let key in answer_objects) {

  if (key === intent) {
    console.log(key);
    console.log('found intent=', intent);
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: answer_objects[key],
  };
  sendToFB(messageData);
}
}
};
