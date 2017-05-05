const callSendAPI = require('./callSendAPI');

module.exports = (recipientId, messageText) => {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };
  callSendAPI(messageData);
};
