const sendToFB = require('./sendToFB');
const welcome_message = require('./answer_objects.js');

module.exports = (senderID, intent, contexts) => {
  if (intent === 'welcome_message') {
    const messageData = {
      recipient: {
        id: senderID,
      },
      message: welcome_message,
    };
    sendToFB(messageData);
  }
};
