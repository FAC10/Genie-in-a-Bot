/* eslint-disable */

const extractContexts = require('./extractContexts');
const get = require('../database/get_data');

function construct(partyVotesObj, firstName) {
  if (firstName === null) {
    firstName = 'placeholder'
  } else if (partyVotesObj === { party: null, issue: null, inFavour: null, against: null, turnout: null }) {
    partyVotesObj.party = 'placeholder';
    partyVotesObj.issue = 'placeholder';
    partyVotesObj.inFavour = 'placeholder';
    partyVotesObj.against = 'placeholder';
    partyVotesObj.turnout = 'placeholder';
  }

  const answer_objects = {
    Candidates: {
      text: 'Type your postcode or send me your location to get started :)',
      quick_replies: [
      { content_type: 'location' },
      ],
    },

    Candidates: {
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
          title: 'Green',
          payload: 'party_votes',
        },
        {
          content_type: 'text',
          title: 'SNP',
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
        {
          content_type: 'text',
          title: 'Airstrikes in Syria',
          payload: 'syria',
        },
      ],
    },

    brexit: {

      text: `On 1st February 2017, ${partyVotesObj.infavour} voted in favour of leaving the EU. ${partyVotesObj.against} voted against.`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'How do other parties compare?',
          payload: 'partyBrexitCompare',
        },
        {
          content_type: 'text',
          title: 'Back to votes',
          payload: 'party_votes',
        },
        {
          content_type: 'text',
          title: 'Choose another party',
          payload: 'Parties',
        },
      ],
    },

    fallbackRegister: {

      text: 'Register to vote?',
      quick_replies: [
        {
          content_type: 'text',
          title: 'I already have!',
          payload: 'registerDone',
        },
        {
          content_type: 'text',
          title: 'How do I register?',
          payload: 'register',
        },
      ],
    },

    fallbackGeneral: {

      text: 'Here are some of the things you can ask me about:',
      quick_replies: [
        {
          content_type: 'text',
          title: 'General Election info',
          payload: 'General Election info',
        },
        {
          content_type: 'text',
          title: 'Joke',
          payload: 'Joke',
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
          payload: 'Candidates',
        },
        ]
    },

    tuitionFees: {

      text: `On 9th December 2010, ${partyVotesObj.infavour} voted in favour of raising the UK tuition fee cap to £9,000 a year. ${partyVotesObj.against} voted against.`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'How do other parties compare?',
          payload: 'partyBrexitCompare',
        },
        {
          content_type: 'text',
          title: 'Back to votes',
          payload: 'party_votes',
        },
        {
          content_type: 'text',
          title: 'Choose another party',
          payload: 'Parties',
        },
      ],
    },

    syria: {

      text: `On 2nd December 2015, ${partyVotesObj.infavour} voted in favour of airstrikes against ISIL in Syria. ${partyVotesObj.against} voted against.`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'How do other parties compare?',
          payload: 'partyBrexitCompare',
        },
        {
          content_type: 'text',
          title: 'Back to votes',
          payload: 'party_votes',
        },
        {
          content_type: 'text',
          title: 'Choose another party',
          payload: 'Parties',
        },
      ],
    },

  };
  return answer_objects;
}


module.exports = construct;
