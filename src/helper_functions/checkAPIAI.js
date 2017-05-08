const apiai = require('apiai');
require('env2')('./config.env');

const apiai_app = apiai(process.env.APIAI_CLIENT);
const constructRemoteReply = require('./constructRemoteReply');
const findLocalReply = require('./findLocalReply');

module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log('Received message for user %d and page %d at %d with message:',
      senderID, recipientID, timeOfMessage);

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
      const contexts = response.result.contexts;
      const resolvedQuery = response.result.resolvedQuery;
      console.log('intent is ', intent);
      console.log('contexts are ', contexts);
      // if (intent === 'party_votes') {
      //   contexts = `${resolvedQuery}1`;
      //   console.log('contexts2 are ', contexts);
      // }
      // if (contexts.name === 'conservative') {
      //   // console.log('RS is ', resolvedQuery);
      //   // console.log('contexts are', contexts);
      //   console.log('got in here');
      //   contexts = contexts.name + resolvedQuery.name;
      //   // console.log(contexts);
      // }
      if (responseText) {
        constructRemoteReply(senderID, responseText);
      } else {
        findLocalReply(senderID, intent, contexts);
      }
    });

    apiai_request.on('error', (error) => {
      console.log(error);
    });

    apiai_request.end();
  }
};
