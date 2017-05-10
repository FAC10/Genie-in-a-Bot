const apiai = require('apiai');
require('env2')('./config.env');
const post = require('../database/db_post.js');
const getPostcode = require('../helper_functions/getPostcode.js');

const apiai_app = apiai(process.env.APIAI_CLIENT);
const constructRemoteReply = require('./constructRemoteReply');
const findLocalReply = require('./findLocalReply');
const getConstituency = require('./getConstituency');

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

      console.log('contexts are ', contexts);
      console.log('responseText is ', responseText);

      if (contexts === 'party_votes') {
        contexts = resolvedQuery;
      }
      if (event.message) {
        if (event.message.attachments) {
          if (event.message.attachments[0].payload.coordinates) {
            const lat = JSON.stringify(event.message.attachments[0].payload.coordinates.lat);
            const long = JSON.stringify(event.message.attachments[0].payload.coordinates.long);

            getPostcode(lat, long, (postCode, constituency) => {
              const userPostcode = { postcode: postCode, facebook_id: senderID };
              const userConstituency = { constituency, facebook_id: senderID };
              post.userPostcode(userPostcode, (err, result) => {
                if (err) {
                  console.log(err);
                }
              });
              post.userConstituency(userConstituency, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            });
          }
        }
      }

      if (intent === 'Local_MPs') {
        const userPostcode = { postcode: messageText, facebook_id: senderID };
        const constit = getConstituency(messageText);
        const userConstituency = { constituency: constit, facebook_id: senderID };
        post.userConstituency(userConstituency, (err) => {
          if (err) {
            console.log(err);
          }
        });
        post.userPostcode(userPostcode, (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result);
        });
      }

      if (responseText) {
        console.log('getting into responseText if statement');
        constructRemoteReply(senderID, responseText);
      } else {
        findLocalReply.findLocalReply(senderID, intent, contexts);
      }
    });

    apiai_request.on('error', (error) => {
      console.log(error);
    });

    apiai_request.end();
  }
};
