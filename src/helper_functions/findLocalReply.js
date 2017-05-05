const welcome_message = require('./answer_objects');
const sendToFB = require('./sendToFB');

module.exports = (senderID, intent, contexts) => {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: welcome_message,
  };
  sendToFB(messageData);
};
