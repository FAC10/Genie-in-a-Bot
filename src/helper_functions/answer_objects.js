// const old_welcome_message = {
//   // recipient: {
//   //   id: event.sender.id,
//   // },
//   message: {
//     text: 'Hey [name], I\'m your personal assistant in the run up to the General Elections! I can help you find out about the candidates standing in your area, what the parties are offering and more!',
//     quick_replies: [
//     { content_type: 'location' },
//     ],
//   },
// };

  const welcome_message = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Hey [name], I\'m your personal assistant in the run up to the General Elections! I can help you find out about the candidates standing in your area, what the parties are offering and more!',
        buttons: [
          {
            type: 'postback',
            title: 'Candidates',
            payload: 'Candidates',
          },
          {
            type: 'postback',
            title: 'Parties',
            payload: 'Parties',
          },
        ],
      },
    },
  };


  module.exports = welcome_message;
