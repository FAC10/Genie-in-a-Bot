const apiai = require('apiai');
require('env2')('./config.env');
const post = require('../database/db_post.js');
const getPostcode = require('../helper_functions/getPostcode.js');
const get = require('../database/get_data.js');
const apiai_app = apiai(process.env.APIAI_CLIENT);
const constructRemoteReply = require('./constructRemoteReply');
const findLocalReply = require('./findLocalReply');
const getConstituency = require('./getConstituency');
const sendToFB = require('./sendToFB.js');
const getTweets = require('./getTweets.js');
const issueHandler = require('./issueHandler.js');
const partyHandler = require('./partyHandler');
const constructIssueBullets = require('./constructIssueBullets');

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
      let intent = response.result.metadata.intentName;
      console.log('intent is ', intent);
      const contexts = response.result.contexts;
      const resolvedQuery = response.result.resolvedQuery;

      // NO LONGER RELEVANT - DEADLINE HAS PASSED
      // if (intent === 'register' || intent === 'registerDone') {
      //   post.persistingCtxts('registerDone', senderID, (err, result) => {
      //     if (err) {
      //       console.log('error adding registerDone to database');
      //     } else {
      //     }
      //   });
      // }

      if (event.message && event.message.attachments && event.message.attachments[0].payload.coordinates) {
        const lat = JSON.stringify(event.message.attachments[0].payload.coordinates.lat);
        const long = JSON.stringify(event.message.attachments[0].payload.coordinates.long);

        getPostcode(lat, long, senderID, sendToFB, (postCode, constituency) => {
          const userPostcode = { postcode: postCode, facebook_id: senderID };
          const userConstituency = { constituency, facebook_id: senderID };
          post.userPostcode(userPostcode, (err, result) => {
            if (err) {
              return err;
            }
          });
          post.userConstituency(userConstituency, (err) => {
            if (err) {
              return err;
            }
            findLocalReply.findLocalReply(senderID, 'runningCandidates');
          });
        });
      }

      if (intent === 'party_votes') {
        partyHandler(senderID, resolvedQuery);
      }

      if (intent === 'issues') {
        issueHandler(senderID, resolvedQuery);
      }

      if (intent === 'anotherPoint') {
        get.issue(senderID, (err, issue) => {
          if (err) return err;

          get.party(senderID, (error, party) => {
            if (error) return err;

            constructIssueBullets(senderID, issue, party);
          });
        });
      }

      if (intent === 'Manifesto') {
        post.issue(null, senderID, (err, res) => {
          if (err) return err;
        });
      }

      if (intent === 'runningCandidates') {
        const userPostcode = { postcode: messageText, facebook_id: senderID };
        // const constit = getConstituency(messageText);
        // const constit = 'Poplar and Limehouse';
        getConstituency(messageText, senderID, (err, result) => {
          if (err) {
            console.log('error getting constituency in checkAPIAI');
          }
          const userConstituency = { constituency: result, facebook_id: senderID };
          post.userConstituency(userConstituency, (error, res) => {
            if (err) {
              console.log('error posting constituency in checkAPIAI');
            }
            findLocalReply.findLocalReply(senderID, intent);
          });
        });
      }


      if (intent === 'Joke') {
        get.randomJoke((err, result) => {
          if (err) {
            console.log('error getting joke');
          }
          const messageData = {
            recipient: {
              id: senderID,
            },
            message: { text: result.rows[0].joke },
          };
          sendToFB(messageData);
          const image = {
            recipient: {
              id: senderID,
            },
            message: { attachment: {
              type: 'image',
              payload: {
                url: result.rows[0].image_url },
            } },

          };
          sendToFB(image);
        });
      }


      if (!intent) {
        intent = 'fallbackGeneral';
        findLocalReply.findLocalReply(senderID, intent);
      }


      if (responseText) {
        constructRemoteReply(senderID, responseText);
      } else if (!responseText && intent !== 'runningCandidates' && intent !== 'party_votes' && intent !== 'anotherPoint') {
        findLocalReply.findLocalReply(senderID, intent);
      }
    });
    apiai_request.on('error', (error) => {
      console.log('api ai error');
    });

    apiai_request.end();
  }
};
