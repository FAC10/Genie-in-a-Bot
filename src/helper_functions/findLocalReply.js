const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');

module.exports = (senderID, intent, contexts) => {
  for (key in answer_objects) {
    console.log('key= ', key);
  if (key === intent) {
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
