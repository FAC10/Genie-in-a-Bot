const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');

module.exports = (senderID, intent, contexts) => {
  for (key in answer_objects) {
  if (key === intent) {
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
