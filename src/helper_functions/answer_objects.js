/* eslint-disable */

const extractContexts = require('./extractContexts');
const get = require('../database/get_data');
// let partyVotesObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
// let firstName = null;

// function constructAnswers(firstName, contexts, intent) {
//   if (intent === 'brexit') {
//     const partyKey = extractContexts(contexts, intent);
//     get.partyVotes(partyKey, (err, res) => {
//       if (err) {
//         return err;
//       }
//       let partyVotesObj = res.rows[0];
//       console.log('partyVotesObj is ', partyVotesObj);
//       construct(partyVotesObj, firstName);
//     });
//   }
//   else {
//     construct(firstName);
//   }
// }

  // console.log('partyVotesObj outside of if statement is ', partyVotesObj);

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

  console.log('partyObj in answer_objects is ', partyVotesObj);

  const answer_objects = {
    location_message: {
      text: 'Type your postcode or send me your location to get started :)',
      quick_replies: [
      { content_type: 'location' },
      ],
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
      ],
    },

    brexit: {

      text: `On 1st February 2017, ${partyVotesObj.inFavour} voteed in favour of leaving the EU. ${partyVotesObj.against} voted against.`,
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
