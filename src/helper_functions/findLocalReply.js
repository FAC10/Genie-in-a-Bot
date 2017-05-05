const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');

module.exports = (senderID, intent, contexts) => {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: {
      text: 'we got into our function yay',
    },
  };
  sendToFB(messageData);
};
