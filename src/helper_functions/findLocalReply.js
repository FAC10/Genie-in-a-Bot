const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');

module.exports = (senderID, recipientID, timeOfMessage) => {
  const messageData = {
    recipient: {
      id: recipientID,
    },
    message: {
      text: 'we got into our function yay',
    },
  };
  sendToFB(messageData);
};
