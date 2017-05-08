const answer_objects = require('./answer_objects');
const sendToFB = require('./sendToFB');
const constructAnswers = require('./answer_objects');
const get = require('./../database/get_data');

const localContext = '';

module.exports = (senderID, intent, contexts) => {
  console.log(contexts);
  get.firstName(senderID, (err, firstName) => {
    if (err) {
      return err;
    }
    const answer_objects = constructAnswers(firstName);
    for (const key in answer_objects) {
      if (key === intent) {
          // console.log(key);
          // console.log('found intent=', intent);
        console.log(answer_objects[key].quick_replies.title);
        localContext.push = answer_objects[key].quick_replies.title;
        const messageData = {
          recipient: {
            id: senderID,
          },
          message: answer_objects[key],
        };
        sendToFB(messageData);
      }
    }
  });
};
