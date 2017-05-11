const checkAPIAI = require('../helper_functions/checkAPIAI');
const sendToFB = require('../helper_functions/sendToFB');
const answer_objects = require('../helper_functions/answer_objects.js');
const express = require('express');
const findLocalReply = require('../helper_functions/findLocalReply.js');
const getFacebookName = require('./../helper_functions/getFacebookName');
const getPostcode = require('../helper_functions/getPostcode.js');
const post = require('../database/db_post.js');


const app = express.Router();

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
            if (event.message.attachments) {
              if (event.message.attachments[0].payload.coordinates) {
                const lat = JSON.stringify(event.message.attachments[0].payload.coordinates.lat);
                const long = JSON.stringify(event.message.attachments[0].payload.coordinates.long);

                getPostcode(lat, long, (postCode, constituency) => {
                  const userConstituency = { constituency, facebook_id: event.sender.id };
                  const userPostcode = { postcode: postCode, facebook_id: event.sender.id };
                  post.userPostcode(userPostcode, (err, result) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                  post.userConstituency(userConstituency, (err, result) => {
                    if (err) {
                      return err;
                    }
                  });
                  findLocalReply.findLocalReply(event.sender.id, 'runningCandidates');
                });
              }
            }
          }

          if (event.message) {
            checkAPIAI(event);
          } else if (event.postback && event.postback.payload) {
            getFacebookName(event.sender.id, () => {
              findLocalReply.findLocalReply(event.sender.id, event.postback.payload);
            });
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
