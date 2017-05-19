const get = require('../database/get_data');
const issueHandler = require('./issueHandler');
const findLocalReply = require('./findLocalReply');
const post = require('../database/db_post.js');
const constructRemoteReply = require('./constructRemoteReply');

function posting(party, senderID) {
  console.log(`posting ${party} to database`);
  post.party(party, senderID, (err, res) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const countName = party.toLowerCase();
  post.counts(countName, (err, res) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

function partyHandler(senderID, resolvedQuery) {
  get.flow(senderID, (err, res) => {
    console.log('flow in partyHandler is ', res);
    if (res === 'Manifestos') {
      issueHandler(senderID, resolvedQuery, 'party');
    } else if (res === 'Parties') {
      console.log('resolvedQuery going into party is ', resolvedQuery);
      if (resolvedQuery.toLowerCase().includes('conservative') || resolvedQuery.toLowerCase().includes('tory') || resolvedQuery.toLowerCase().includes('tories')) {
        posting('Conservative', senderID);
      }
      if (resolvedQuery.toLowerCase().includes('labour')) {
        posting('Labour', senderID);
      }
      if (resolvedQuery.toLowerCase().includes('lib dem') || resolvedQuery.toLowerCase().includes('liberal democrats')) {
        posting('Lib Dem', senderID);
      }
      if (resolvedQuery.toLowerCase().includes('snp') || resolvedQuery.toLowerCase().includes('scottish national party')) {
        posting('SNP', senderID);
      }
      if (resolvedQuery.toLowerCase().includes('green') || resolvedQuery.toLowerCase().includes('green party')) {
        posting('Green', senderID);
      }
      findLocalReply.findLocalReply(senderID, 'party_votes');
    } else {
      const responseText = { text: 'Would you like to know about party manifestos or parties more generally?',
        quick_replies: [
          {
            content_type: 'text',
            title: 'Manifestos',
            payload: 'Manifestos',
          },
          {
            content_type: 'text',
            title: 'Parties',
            payload: 'Parties',
          },
        ] };
      console.log('responseText2 is ', responseText);
      constructRemoteReply(senderID, responseText);
    }
  });
}

module.exports = partyHandler;
