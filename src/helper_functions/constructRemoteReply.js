const sendToFB = require('./sendToFB');
const welcome_message = require('./answer_objects.js');

module.exports = (senderID, responseText) => {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: {
      text: responseText,
    },
  };
  sendToFB(messageData);
};
