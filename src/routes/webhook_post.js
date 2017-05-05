const checkAPIAI = require('../helper_functions/checkAPIAI');
const sendToFB = require('../helper_functions/sendToFB');
const answer_objects = require('../helper_functions/answer_objects.js');
const express = require('express');
const findLocalReply = require('../helper_functions/findLocalReply.js');
const getFacebookName = require('./../helper_functions/getFacebookName');
const request = require('request');

const app = express.Router();
require('env2')('./config.env');

// Listen for messages from user

module.exports = [
  app.post('/webhook', (req, res) => {
    const data = req.body;

    if (data.object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      data.entry.forEach((entry) => {
        const pageID = entry.id;
        const timeOfEvent = entry.time;

        // Iterate over each messaging event
        entry.messaging.forEach((event) => {
          if (event.message) {
            checkAPIAI(event);
          } else if (event.postback && event.postback.payload) {
            console.log('payload is ', event.postback.payload);

            const url = `https://graph.facebook.com/v2.6/${event.sender.id}?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
            request(url, (err, res, body) => {
              console.log('Im inside request');
              if (err) {
                console.log(err);
              }
              const parsedBody = JSON.parse(body);
              console.log(parsedBody);
            });
            getFacebookName(event.sender.id);
            findLocalReply(event.sender.id, event.postback.payload);
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
