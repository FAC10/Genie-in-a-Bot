/* eslint-disable */

// const extractContexts = require('./extractContexts');
const get = require('../database/get_data');

function construct(partyVotesObj, firstName, candidatesObj, compareObj, senderID, intent, callback) {
  console.log('partyVotes is ', partyVotesObj);
  if (firstName === null) {
    firstName = 'placeholder';
  }
  if (partyVotesObj === { party: null, issue: null, inFavour: null, against: null, extra: null, turnout: null }) {
    partyVotesObj.party = 'placeholder';
    partyVotesObj.issue = 'placeholder';
    partyVotesObj.inFavour = 'placeholder';
    partyVotesObj.against = 'placeholder';
    partyVotesObj.extra = 'placeholder';
    partyVotesObj.turnout = 'placeholder';
  }
  if (compareObj === null) {
    compareObj = [{swing: 'placeholder', majority: 'placeholder'},{swing: 'placeholder', majority: 'placeholder'},{swing: 'placeholder', majority: 'placeholder'},{swing: 'placeholder', majority: 'placeholder'},{swing: 'placeholder', majority: 'placeholder'}];
  }

  const answer_objects = {
    Candidates: {
      text: 'Type your postcode or send me your location and I guess you\'ll have someone to talk to for a little longer.',
      quick_replies: [
      { content_type: 'location' },
      ],
    },

    About_this_bot: {
      text: 'This bot was captured by students at Founders & Coders and tamed with support from Filament (http://filament.uk.com/). Find us on github: https://github.com/FAC10/MPBots. No genies were harmed in the making. Tap more or type a question.',
      quick_replies: [
      {
        content_type: 'text',
        title: 'More',
        payload: 'fallbackGeneral',
      },
    ],
    },

    report_problem: {
      text: 'Sometimes our genie gets a little lazy. Let us know what he\'s done this time: HelpAGenieOut@gmail.com then tap more or type a question.',
      quick_replies: [
      {
        content_type: 'text',
        title: 'More',
        payload: 'fallbackGeneral',
      },
    ],
    },

    Election_Info :{
      text: 'The General Election this year will take place on 8th June. The deadline to register to vote is on 22nd May (https://www.gov.uk/register-to-vote). This will be the 57th UK General Election, and the third time the UK population has been asked to vote on an issue in the last three years. It\'s been tough for a genie in a bot. Each of the 650 parliamentary constituencies will elect one Member of Parliament (MP) to the House of Commons. Tap more or type a question.',
      quick_replies: [
      {
        content_type: 'text',
        title: 'More',
        payload: 'fallbackGeneral',
      },
    ],
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
          text: `You summoned me, ${firstName}? I\'m your personal assistant in the run up to the General Election. I can tell you about the candidates standing, how parties have voted on key issues and how a genie came to be stuck in a bot. Tap a button or type a question.`,
          buttons: [
            {
              type: 'postback',
              title: 'Candidates',
              payload: 'Candidates',
            },
            {
              type: 'postback',
              title: 'Manifestos',
              payload: 'Manifestos',
            },
            {
              type: 'postback',
              title: 'Parties',
              payload: 'Parties'
            },
          ],
        },
      },
    },


    Parties: {

      text: 'Which party do you want to know more about?',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Conservative',
          payload: 'party_votes',
          image_url:'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Conservative_logo_2006.svg/1280px-Conservative_logo_2006.svg.png',
        },
        {
          content_type: 'text',
          title: 'Labour',
          payload: 'party_votes',
          image_url: 'https://pbs.twimg.com/profile_images/683632825434771456/n4NaU8Ku.png',
        },
        {
          content_type: 'text',
          title: 'Lib Dem',
          payload: 'party_votes',
          image_url: 'https://d3n8a8pro7vhmx.cloudfront.net/simonhughes/sites/35/meta_images/original/Libdem_Bird.jpg?1389204968',
        },
        {
          content_type: 'text',
          title: 'Green',
          payload: 'party_votes',
          image_url: 'http://www.symbols.com/gi.php?type=1&id=3308',
        },
        {
          content_type: 'text',
          title: 'SNP',
          payload: 'party_votes',
          image_url: 'https://static1.squarespace.com/static/551f3665e4b0bf9fbff0752d/t/58541c079f7456e64f2ba1df/1481907207624/snp.png',
        },
      ],
    },
    Manifestos: {

      text: 'Pick an issue you\'d like to know more about:',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Education',
          payload: 'party_votes',
          image_url:'http://www.steveschuh.com/sites/all/themes/schuh/images/education-icon.png',
        },
        {
          content_type: 'text',
          title: 'Health',
          payload: 'party_votes',
          image_url: 'https://cdn3.iconfinder.com/data/icons/medical-icons-4/100/first-aid-512.png',
        },
        {
          content_type: 'text',
          title: 'Economy',
          payload: 'party_votes',
          image_url: 'https://cdn2.iconfinder.com/data/icons/hicons/600/receber.png',
        },
        {
          content_type: 'text',
          title: 'Immigration',
          payload: 'party_votes',
          image_url: 'https://cdn4.iconfinder.com/data/icons/tourism-and-travel-objects/512/passport_document_identification_citizen_travel_tourism_flat_icon_symbol-256.png',
        },
        {
          content_type: 'text',
          title: 'Housing',
          payload: 'party_votes',
          image_url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/house-icon.png',
        },
        {
          content_type: 'text',
          title: 'Environment',
          payload: 'party_votes',
          image_url: 'http://aci-na.org/sites/default/files/2016airportswork-environmenticon.png',
        },
        {
          content_type: 'text',
          title: 'Tax',
          payload: 'party_votes',
          image_url: 'https://www.theaccountingroom.co.nz/assets/frameworks/wf/images/tax-icon.png',
        },
        {
          content_type: 'text',
          title: 'Brexit',
          payload: 'party_votes',
          image_url: 'https://www.plesner.com/~/media/plesnerbilleder/test/brexit-icon-3.ashx',
        },
        {
          content_type: 'text',
          title: 'Transport',
          payload: 'party_votes',
          image_url: 'https://cdn0.iconfinder.com/data/icons/transport-14/512/Train_Blue.png',
        },
        {
          content_type: 'text',
          title: 'Foreign',
          payload: 'party_votes',
          image_url: 'https://openclipart.org/image/2400px/svg_to_png/211386/globe-eurafrica.png',
        },
        {
          content_type: 'text',
          title: 'Defence',
          payload: 'party_votes',
          image_url: 'http://ti-defence.org/wp-content/themes/tids/img/logos/defence-integrity-icon.png',
        },
      ],
    },

    mani_parties : {
      text: 'mani_parties',
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
        {
          content_type: 'text',
          title: 'More options',
          payload: 'fallbackGeneral',
        },
      ],
    },

    brexit_votes: {

      text: `On 1st February 2017, ${partyVotesObj.infavour} voted in favour of leaving the EU. ${partyVotesObj.against} voted against. ${partyVotesObj.extra}`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Compare',
          payload: 'partyCompare',
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
        {
          content_type: 'text',
          title: 'Other options',
          payload: 'fallbackGeneral',
        },
      ],
    },

    fallbackRegister: {

      text: 'Register to vote?',
      quick_replies: [
        {
          content_type: 'text',
          title: 'I already have!',
          image_url: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=100180979',
          payload: 'registerDone',
        },
        {
          content_type: 'text',
          title: 'How do I register?',
          image_url: 'https://cdn0.iconfinder.com/data/icons/web-development-2/512/clipboard_report_form_checklist_business_plan_sheet_file_note_pad_paper_page_document_planning_check_list_survey_questionnaire_flat_design_icon-512.png',
          payload: 'register',
        },
        {
          content_type: 'text',
          title: 'Other options',
          payload: 'fallbackGeneral',
        },
      ],
    },

    fallbackGeneral: {

      text: 'Here are some of the things you can ask me about. Tap a button or type a question:',
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
        ]
    },

    tuition_fees: {

      text: `On 9th December 2010, ${partyVotesObj.infavour} voted in favour of raising the UK tuition fee cap to £9,000 a year. ${partyVotesObj.against} voted against.`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Compare',
          payload: 'partyCompare',
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
        {
          content_type: 'text',
          title: 'More',
          payload: 'fallbackGeneral',
        },
      ],
    },

    syria: {

      text: `On 2nd December 2015, ${partyVotesObj.infavour} voted in favour of airstrikes against ISIL in Syria. ${partyVotesObj.against} voted against.`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Compare',
          payload: 'partyCompare',
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
        {
          content_type: 'text',
          title: 'More',
          payload: 'fallbackGeneral',
        },
      ],
    },
    partyCompare: {

      text: `${compareObj[0].majority} of Conservative MPs voted ${compareObj[0].swing} of ${compareObj[0].issueTitle}, ${compareObj[1].majority} of Labour MPs voted ${compareObj[1].swing}, ${compareObj[2].majority} of Liberal Democrat MPs voted ${compareObj[2].swing}, ${compareObj[3].majority} of Green Party MPs voted ${compareObj[3].swing} and ${compareObj[4].majority} of SNP MPs voted ${compareObj[4].swing}.`,
      quick_replies: [
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
        {
          content_type: 'text',
          title: 'More',
          payload: 'fallbackGeneral',
        },
      ],
    },

  };
  callback(answer_objects, intent, senderID);
}


module.exports = construct;
