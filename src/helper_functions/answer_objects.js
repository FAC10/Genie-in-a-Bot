const old_welcome_message = {
  recipient: {
    id: event.sender.id,
  },
  message: {
    text: 'Hey [name], I\'m your personal assistant in the run up to the General Elections! Type your postcode or send me your location to get started .',
    quick_replies: [
    { content_type: 'location' },
    ],
  },
};


  const welcome_message = {
    recipient: {
    id: event.sender.id,
  },
  message:{
    attachment:{
      type:template,
      payload: {
        template_type:button,
        text:'Hey [name], I\'m your personal assistant in the run up to the General Elections! Type your postcode or send me your location to get started .',
        buttons:[
          {
            type:postback,
            title:'Candidates',
            payload:'Candidates'
          },
          {
            type:postback,
            title:'Parties',
            payload:'Parties'
          }
        ]
      }
    }
  }
}

  module.exports = welcome_message;
