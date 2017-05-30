const sendToFB = require('./sendToFB');

module.exports = (senderID, responseText, quickReply) => {
  if (typeof responseText === 'object') {
    const messageData = {
      recipient: {
        id: senderID,
      },
      message: {
        text: responseText.text,
        quick_replies: responseText.quick_replies,
      },
    };
    sendToFB(messageData);
  }
  if (quickReply) {
    console.log('quick reply');
    const reply = {
      recipient: {
        id: senderID,
      },
      message: {
        text: responseText,
        quick_replies: [
          {
            content_type: 'text',
            title: 'Election info',
            payload: 'Election info',
          },
          {
            content_type: 'text',
            title: 'Joke',
            payload: 'Joke',
            image_url: 'https://image.ibb.co/g2Q7kk/smug.png',
          },
          {
            content_type: 'text',
            title: 'Candidates',
            payload: 'Candidates',
          },
          {
            content_type: 'text',
            title: 'Parties',
            payload: 'Parties',
          },
          {
            content_type: 'text',
            title: 'New postcode',
            image_url: 'http://anbgroup.com/images/cloudlocater/AssetLocater.png',
            payload: 'Candidates',
          },
        ],
      },
    };
    sendToFB(reply);
  } else {
    const messageData = {
      recipient: {
        id: senderID,
      },
      message: {
        text: responseText,
      },
    };
    sendToFB(messageData);
  }
  // } if (image) {
  //   const messageData = {
  //     recipient: {
  //       id: senderID,
  //     },
  //     message: {
  //       text: responseText,
  //       attachment: {
  //         type: 'image',
  //         payload: {
  //           url: image,
  //         },
  //       },
  //     },
  //   };
  //   sendToFB(messageData);
  // }
};
