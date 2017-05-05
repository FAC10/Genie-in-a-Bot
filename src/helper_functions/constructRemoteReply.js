const sendToFB = require('./sendToFB');

module.exports = (senderID, intent, contexts) => {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: {
      text: 'YAY IT IS WORKING',
    },
  };
  sendToFB(messageData);
};
