const sendToFB = require('./sendToFB');
const welcome_message = require('./answer_objects.js');

module.exports = (senderID, responseText) => {
  console.log('responseText in constructRemoteReply is ', responseText);
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
