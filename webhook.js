const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
require('env2')('./config.env');
const apiai = require('apiai');
const apiai_app = apiai(process.env.APIAI_CLIENT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* Home */
app.get('/', function(req, res) {
res.send('I should be working');
});

/* For Facebook Validation */
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.FB_SECRET) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});


//Listen for messages from user

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
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

//APIAI integration






//
//
function receivedMessage(event) {
  var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
      senderID, recipientID, timeOfMessage);
    // console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {

      var apiai_request = apiai_app.textRequest(messageText, {
          sessionId: 'mp-bot'
      });

      apiai_request.on('response', function(response) {
        var responseText = response.fulfillment.speech;
        console.log('response is ', response);
        console.log('responseText is ', response);
        sendTextMessage(senderID, responseText);
      });

      apiai_request.on('error', function(error) {
          console.log(error);
      });

      apiai_request.end();

    }
}


function sendTextMessage(recipientId, messageText) {


  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}
