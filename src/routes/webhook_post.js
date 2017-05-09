const checkAPIAI = require('../helper_functions/checkAPIAI');
const sendToFB = require('../helper_functions/sendToFB');
const answer_objects = require('../helper_functions/answer_objects.js');
const express = require('express');
const findLocalReply = require('../helper_functions/findLocalReply.js');
const getFacebookName = require('./../helper_functions/getFacebookName');
const getPostcode = require('../helper_functions/getPostcode.js');
const post = require('../database/db_post.js');
const connect = require('../database/db_connect');

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
              const lat = JSON.stringify(event.message.attachments[0].payload.coordinates.lat);
              const long = JSON.stringify(event.message.attachments[0].payload.coordinates.long);

              getPostcode(lat, long, (postCode, constituency) => {
                console.log('postcode is ', postCode, 'constituency is ', constituency);
                const userPostcode = { postcode: postCode, facebook_id: event.sender.id };
                console.log(userPostcode);
                connect.query(`UPDATE users SET postcode = ${userPostcode.postcode} WHERE facebook_id = ${userPostcode.facebook_id}`);
                // post.userPostcode(userPostcode, (err, result) => {
                //   if (err) {
                //     console.log(err);
                //   }
                //   console.log(result);
                // });
                console.log('success?');
              });
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

// {"mid":"mid.$cAACVbcqAv_NiBdGE4Vb1Iw7jHE0k",
// "seq":134094,
// "attachments":[
//   {"title":"Philippa'sLocation",
//   "url":"https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.bing.com%2Fmaps%2Fdefault.aspx%3Fv%3D2%26pc%3DFACEBK%26mid%3D8100%26where1%3D51.529487%252C%2B-0.0423492%26FORM%3DFBKPL1%26mkt%3Den-US&h=ATPxu2eGlhkGKN7JvEQd1uCytjsk51-1aNqgfcnYK8i4YKYjQAVeZDuOoWBy_3UR4Sk5tlRFPxRIXC_b-E4ZiJtesVdkFpAhJKX3SF3Hx9Nn&s=1&enc=AZPAtqERgyPy0EE4XaJe9MV09jtmognjLxPBdLfvQo9W4_mciUnWbnkNBNDwtY-bRbgy03K5tMSkqYwyjq9LGdP2",
//   "type":"location",
//   "payload":{
//     "coordinates":{
//       "lat":51.529487,"long":-0.0423492}
//     }}]}

 // {"coordinates":{"lat":51.5295082,"long":-0.0423689}}
