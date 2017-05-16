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
      if (intent === 'register' || intent === 'registerDone') {
        post.persistingCtxts('registerDone', senderID, (err, result) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }

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
        console.log('resolvedQuery going into party is ', resolvedQuery);
        if (resolvedQuery.toLowerCase().includes('conservative') || resolvedQuery.toLowerCase().includes('tory') || resolvedQuery.toLowerCase().includes('tories')) {
          console.log('adding Conservative to database');
          post.party('Conservative', senderID, (err, res) => {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
        if (resolvedQuery.toLowerCase().includes('labour')) {
          console.log('adding Labour to database');
          post.party('Labour', senderID, (err, res) => {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
        if (resolvedQuery.toLowerCase().includes('lib dem') || resolvedQuery.toLowerCase().includes('liberal democrats')) {
          console.log('adding Lib Dem to database');
          post.party('Lib Dem', senderID, (err, res) => {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
        if (resolvedQuery.toLowerCase().includes('snp') || resolvedQuery.toLowerCase().includes('scottish national party')) {
          console.log('adding SNP to database');
          post.party('SNP', senderID, (err, res) => {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
        if (resolvedQuery.toLowerCase().includes('green') || resolvedQuery.toLowerCase().includes('green party')) {
          console.log('adding Green to database');
          post.party('Green', senderID, (err, res) => {
            if (err) {
              console.log(err);
            } else {
            }
          });
        }
      }

      if (intent === 'runningCandidates') {
        console.log('inside running candidates');
        const userPostcode = { postcode: messageText, facebook_id: senderID };
        // const constit = getConstituency(messageText);
        // const constit = 'Poplar and Limehouse';
        getConstituency(messageText, senderID, (err, result) => {
          if (err) {
            console.log(err);
          }
          const userConstituency = { constituency: result, facebook_id: senderID };
          console.log(userConstituency);
          post.userConstituency(userConstituency, (error, res) => {
            if (err) {
              console.log(err);
            }
            console.log('posting to database');
            findLocalReply.findLocalReply(senderID, intent);
          });
        });
      }

      //   post.userPostcode(userPostcode, (err, result) => {
      //     if (err) {
      //       return err;
      //     }
      //   });
      // }


      if (intent === 'Joke') {
        get.randomJoke((err, result) => {
          if (err) {
            console.log(err);
          }
          console.log('image url is ', result.rows[0].image_url);
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
        get.persistingCtxts(senderID, (err, res) => {
          if (err) {
            console.log(err);
          } if (res === null) {
            intent = 'fallbackRegister';
            findLocalReply.findLocalReply(senderID, intent);
          } else {
            intent = 'fallbackGeneral';
            findLocalReply.findLocalReply(senderID, intent);
          }
        });
      }


      if (responseText) {
        constructRemoteReply(senderID, responseText);
      } else if (!responseText && intent !== 'runningCandidates') {
        findLocalReply.findLocalReply(senderID, intent);
      }
    });

    apiai_request.on('error', (error) => {
      console.log(error);
    });

    apiai_request.end();
  }
};
