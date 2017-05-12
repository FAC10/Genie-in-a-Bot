const checkAPIAI = require('../helper_functions/checkAPIAI');
const sendToFB = require('../helper_functions/sendToFB');
const answer_objects = require('../helper_functions/answer_objects.js');
const express = require('express');
const findLocalReply = require('../helper_functions/findLocalReply.js');
const getFacebookName = require('./../helper_functions/getFacebookName');
const getPostcode = require('../helper_functions/getPostcode.js');
const post = require('../database/db_post.js');
const getTweets = require('../helper_functions/getTweets.js');


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
          console.log(event);
          if (event.message) {
            console.log('theres an event.message');
            if (event.message.attachments) {
              if (event.message.attachments[0].payload.coordinates) {
                const lat = JSON.stringify(event.message.attachments[0].payload.coordinates.lat);
                const long = JSON.stringify(event.message.attachments[0].payload.coordinates.long);

                getPostcode(lat, long, event.sender.id, sendToFB, (postCode, constituency) => {
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
            console.log('theres a message so sending to apiai');
            checkAPIAI(event);
          } else if (event.postback && event.postback.payload) {
            console.log('postback is ', event.postback.payload);
            if (event.postback.payload.includes('Recent tweets')) {
              console.log('includes recent tweets');
              const splitted = (event.postback.payload).split(' ', 3);
              const username = splitted[2];
              console.log('username is ', username);
              if (username === 'noTwitter') {
                console.log('user has no twitter');
                constructRemoteReply(event.sender.id, 'This candidate has no Twitter account :(');
              } else {
                getTweets.getTweets(event.sender.id, `@${username}`);
              }
            }
            if (event.postback.payload.includes('Recent mentions')) {
              console.log('includes recent mentions');
              const splitted = (event.postback.payload).split(' ', 3);
              const username = splitted[2];
              console.log('username is ', username);
              if (username === 'noTwitter') {
                console.log('user has no twitter');
                constructRemoteReply(event.sender.id, 'This candidate has no Twitter account :(');
              } else {
                getTweets.getMentions(event.sender.id, `@${username}`);
              }
            }
            if (event.postback.payload === 'About this bot') {
              const messageData = {
                recipient: {
                  id: event.sender.id,
                },
                message: {
                  text: 'This bot has been created as a study project by students at Founders & Coders. Find us on github!: https://github.com/FAC10/MPBots',
                },
              };
              sendToFB(messageData);
            } else if (event.postback.payload === 'Report the problem') {
              const messageData = {
                recipient: {
                  id: event.sender.id,
                },
                message: {
                  text: 'We are sorry to hear that you have encoutered a problem! You can contact us at GenieInTheBot@outlook.com - we try to answer all queries and address all problems. We welcome your feedback! ',
                },
              };
              sendToFB(messageData);
            } else {
              console.log('getting into the generic send');
              getFacebookName(event.sender.id, () => {
                findLocalReply.findLocalReply(event.sender.id, event.postback.payload);
              });
            }
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
