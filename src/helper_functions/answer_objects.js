/* eslint-disable */

const extractContexts = require('./extractContexts');
const get = require('../database/get_data');

function construct(partyVotesObj, firstName, candidatesObj, senderID, intent, callback) {
  if (candidatesObj != null){
  }
  if (firstName === null) {
    firstName = 'placeholder'
  }
  if (partyVotesObj === { party: null, issue: null, inFavour: null, against: null, turnout: null }) {
    partyVotesObj.party = 'placeholder';
    partyVotesObj.issue = 'placeholder';
    partyVotesObj.inFavour = 'placeholder';
    partyVotesObj.against = 'placeholder';
    partyVotesObj.turnout = 'placeholder';
  }
  // if (candidates === null)  {
  //   candidates = 'placeholder';
  // }

  const answer_objects = {
    Candidates: {
      text: 'Type your postcode or send me your location to get started :)',
      quick_replies: [
      { content_type: 'location' },
      ],
    },

    About_this_bot: {
      text: 'This bot has been created as a study project by students at Founders & Coders. Find us on github!: https://github.com/FAC10/MPBots'
    },

    report_problem: {
      text: 'We are sorry to hear that you have encoutered a problem! You can contact us at GenieInTheBot@outlook.com - we try to answer all queries and address all problems. We welcome your feedback! '
    },

    Election_Info :{
      text: 'The United Kingdom general election of 2017 is scheduled to take place on 8 June 2017.\
 Each of the 650 parliamentary constituencies will elect one Member of Parliament (MP) to the House of Commons, the lower house of Parliament.\
 In line with the Fixed-term Parliaments Act 2011, an election had not been due until 7 May 2020, but a call for a snap election by Prime Minister Theresa May received the necessary two-thirds majority in a 522 to 13 vote in the House of Commons on 19 April 2017.'
    },

    runningCandidates: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: candidatesObj,
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
          title: 'Election info',
          payload: 'Election info',
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

  callback(answer_objects, intent, senderID);
}


module.exports = construct;
