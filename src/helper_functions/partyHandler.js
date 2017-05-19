const get = require('../database/get_data');
const issueHandler = require('./issueHandler');
const findLocalReply = require('./findLocalReply');

function partyHandler(senderID, resolvedQuery) {
  get.flow(senderID, (err, res) => {
    if (res === 'manifestos') {
      issueHandler(senderID, resolvedQuery);
    } else {
      console.log('resolvedQuery going into party is ', resolvedQuery);
      if (resolvedQuery.toLowerCase().includes('conservative') || resolvedQuery.toLowerCase().includes('tory') || resolvedQuery.toLowerCase().includes('tories')) {
        console.log('adding Conservative to database');
        post.party('Conservative', senderID, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        post.counts('conservative', (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
      if (resolvedQuery.toLowerCase().includes('labour')) {
        console.log('adding Labour to database');
        post.party('Labour', senderID, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        post.counts('labour', (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
      if (resolvedQuery.toLowerCase().includes('lib dem') || resolvedQuery.toLowerCase().includes('liberal democrats')) {
        console.log('adding Lib Dem to database');
        post.party('Lib Dem', senderID, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        post.counts('libdem', (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
      if (resolvedQuery.toLowerCase().includes('snp') || resolvedQuery.toLowerCase().includes('scottish national party')) {
        console.log('adding SNP to database');
        post.party('SNP', senderID, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        post.counts('snp', (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
      if (resolvedQuery.toLowerCase().includes('green') || resolvedQuery.toLowerCase().includes('green party')) {
        console.log('adding Green to database');
        post.party('Green', senderID, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        post.counts('green', (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
      findLocalReply(senderID, 'party_votes');
    }
  });
}

module.exports = partyHandler;
