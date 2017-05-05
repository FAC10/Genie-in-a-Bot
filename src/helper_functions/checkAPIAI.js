const apiai = require('apiai');

const apiai_app = apiai(process.env.APIAI_CLIENT);
const sendTextMessage = require('./sendTextMessage');

module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log('Received message for user %d and page %d at %d with message:',
      senderID, recipientID, timeOfMessage);

  // console.log(JSON.stringify(message));

  const messageId = message.mid;

  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageText) {
    const apiai_request = apiai_app.textRequest(messageText, {
      sessionId: 'mp-bot',
    });

    apiai_request.on('response', (response) => {
      const responseText = response.result.fulfillment.speech;
      const intent = response.result.metadata.intentName;
      const context = response.result.contexts;
      console.log('intent is ', intent);
      console.log('context is ', context);
        // console.log('response is ', response);
      console.log('responseText is ', responseText);
      if (responseText) {
        console.log('responseText exists');
      }
      sendTextMessage(senderID, responseText);
    });

    apiai_request.on('error', (error) => {
      console.log(error);
    });

    apiai_request.end();
  }
};
