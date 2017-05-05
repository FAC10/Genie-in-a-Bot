const express = require('express');
const bodyParser = require('body-parser');

const app = express();
require('env2')('./config.env');

const receivedMessage = require('./helper_functions/checkAPIAI');
const callSendAPI = require('./helper_functions/callSendAPI');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* Home */
app.get('/', (req, res) => {
  res.send('I should be working');
  res.status(200);
});

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.FB_SECRET) {
    console.log('Validating webhook');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});


// Listen for messages from user

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
          console.log('inside event.message if statement');
          receivedMessage(event);
        } else if (event.postback && event.postback.payload === 'FACEBOOK_WELCOME') {
          const messageData = {
            recipient: {
              id: event.sender.id,
            },
            message: {
              text: `Hey ${firstName}, I\'m your personal assistant in the run up to the General Elections! I can help you find out about the candidates standing in your area, what the parties are offering you and more!`,
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
});
