const answer_objects = require('answer_objects');

module.exports = (senderID, recipientID, timeOfMessage) => {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };
  sendToFB(messageData);
};
