const checkAPIAI = require('../helper_functions/checkAPIAI');
const sendToFB = require('../helper_functions/sendToFB');
const construct = require('../helper_functions/answer_objects.js');
const express = require('express');
const findLocalReply = require('../helper_functions/findLocalReply.js');
const getFacebookName = require('./../helper_functions/getFacebookName');
const getPostcode = require('../helper_functions/getPostcode.js');
const post = require('../database/db_post.js');
const getTweets = require('../helper_functions/getTweets.js');
const constructRemoteReply = require('../helper_functions/constructRemoteReply');
const searchAnsObjects = require('../helper_functions/searchAnsObjects');
const get = require('../database/get_data.js');


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
            get.startContext(event.sender.id, (error, user) => {
              if (user === 'new user') {
                console.log('newUser');
                findLocalReply.findLocalReply(event.sender.id, 'FACEBOOK_WELCOME');
              } else {
                getFacebookName(event.sender.id, () => {
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
                });
                checkAPIAI(event);
              }
            });
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
              const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
              construct(placeholderVotingObj, null, null, null, event.sender.id, 'About_this_bot', searchAnsObjects);
            } else if (event.postback.payload === 'Report the problem') {
              const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
              construct(placeholderVotingObj, null, null, null, event.sender.id, 'report_problem', searchAnsObjects);
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
