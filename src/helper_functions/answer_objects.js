function constructAnswers(firstName) {
  const answer_objects = {
    Candidates: {
      text: 'Type your postcode or send me your location to get started :)',
      quick_replies: [
      { content_type: 'location' },
      ],
    },

    Local_MPs: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Flick through the cards for info on the candidates',
              image_url: 'https://thewondrous.com/wp-content/uploads/2015/05/funny-kitten-rub-my-belly.jpg',
              subtitle: 'MP XYZ, Party XYZ',
              buttons: [
                {
                  type: 'postback',
                  title: 'Recent tweest',
                  payload: 'Recent tweets',
                }, {
                  type: 'postback',
                  title: 'Recent mentions',
                  payload: 'Recent mentions',
                },
                {
                  type: 'postback',
                  title: 'Another area',
                  payload: 'Another area',
                },
              ],
            },
            {
              title: 'Flick through the cards for info on the candidates',
              image_url: 'https://pbs.twimg.com/profile_images/621862866845597696/_JUDMypl.jpg',
              subtitle: 'MP XYZ, Party XYZ',
              buttons: [
                {
                  type: 'postback',
                  title: 'Recent tweest',
                  payload: 'Recent tweets',
                }, {
                  type: 'postback',
                  title: 'Recent mentions',
                  payload: 'Recent mentions',
                },
                {
                  type: 'postback',
                  title: 'Another area',
                  payload: 'Another area',
                },
              ],
            },
          ],
        },
      },
    },

    FACEBOOK_WELCOME: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: `Hey ${firstName}, I\'m your personal assistant in the run up to the General Elections! I can help you find out about the candidates standing in your area, what the parties are offering and more!`,
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
    },


    Parties: {

      text: 'Pick a party you\'re interested in.',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Conservative',
          payload: 'party_votes',
        },
        {
          content_type: 'text',
          title: 'Labour',
          payload: 'party_votes',
        },
        {
          content_type: 'text',
          title: 'Lib Dem',
          payload: 'party_votes',
        },
        {
          content_type: 'text',
          title: 'UKIP',
          payload: 'party_votes',
        },
      ],


    },

    party_votes: {

      text: 'Let\'s see how they voted on:',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Brexit',
          payload: 'Brexit',
        },
        {
          content_type: 'text',
          title: 'Tuition fees',
          payload: 'Tuition fees',
        },
      ],
    },
  };
  return answer_objects;
}


module.exports = constructAnswers;
