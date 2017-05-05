const receivedMessage = require('./../helper_functions/recievedMessage');
const callSendAPI = require('./../helper_functions/callSendAPI');
const express = require('express');

const app = express.Router();

// Listen for messages from user

module.exports = [
  app.post('/webhook', (req, res) => {
    const data = req.body;

    if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
      data.entry.forEach((entry) => {
        // const pageID = entry.id;
        // const timeOfEvent = entry.time;

      // Iterate over each messaging event
        entry.messaging.forEach((event) => {
          if (event.message) {
            console.log('inside event.message if statement');
            receivedMessage(event);
          } else if (event.postback && event.postback.payload === 'FACEBOOK_WELCOME') {
            const messageData = {
              recipient: {
                id: event.sender.id,
              },
              message: {
                text: 'Hey [name], I\'m your personal assistant in the run up to the General Elections! Type your postcode or send me your location to get started .',
                quick_replies: [
              { content_type: 'location' },
                ],
              },
            };
            callSendAPI(messageData);
          } else {
            console.log('Webhook received unknown event: ', event);
          }
        });
      });


    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
      res.sendStatus(200);
    }
  }),
];
