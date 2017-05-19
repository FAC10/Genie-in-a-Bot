const construct = require('./answer_objects');
const get = require('./../database/get_data');
const extractContexts = require('./extractContexts');
const getVotingData = require('./getVotingData');
const constructCandidates = require('./constructCandidates');
const searchAnsObjects = require('./searchAnsObjects');
const post = require('../database/db_post.js');
const sendToIssueHandler = require('./sendToIssueHandler');

function findLocalReply(senderID, intent) {
  if (intent === 'Candidates') {
    post.flow('Candidates', senderID, (err, res) => {
      if (err) return err;
    });
  }
  if (intent === 'Parties') {
    post.flow('Parties', senderID, (err, res) => {
      if (err) return err;
    });
  }
  if (intent === 'Manifestos') {
    post.flow('Manifestos', senderID, (err, res) => {
      if (err) return err;
    });
  }
  if (intent === 'runningCandidates') {
    console.log('in local reply about to check database');
    get.constituency(senderID, (err, res) => {
      if (err) {
        return err;
      }
      const constituency = res;
      console.log('constituency passed into get.candidates is', constituency);
      get.candidates(constituency, (err, res) => {
        if (err) {
          return err;
        }
        const candidates = res.rows;
        console.log('candidates from get.candidates are ', candidates);
        constructCandidates(candidates, senderID, intent, construct, searchAnsObjects);
      });
    });
  }
  // if (intent === 'brexit' || intent === 'tuitionFees' || intent === 'syria') {
  //   console.log('I am one of the intents we want');
  //   extractContexts(senderID, intent, getVotingData);
  // }
  if (intent === 'partyCompare') {
    get.flow(senderID, (error, flow) => {
      if (error) return error;
      if (flow === 'Manifestos') {
        get.issue(senderID, (err, issue) => {
          if (err) return err;
          post.party(null, senderID, (err, issue) => {
            if (err) return err;
            sendToIssueHandler(senderID, issue);
          });
        });
      } else if (flow === 'Parties') {
        get.issue(senderID, (err, res) => {
          if (err) {
            console.log(err);
          }
          if (!res) {
            const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
            construct(placeholderVotingObj, null, null, null, senderID, 'Parties', searchAnsObjects);
          } else {
            console.log('res in if intent is partyCompare is ', res);
            get.compare(res, (error, result) => {
              if (error) {
                console.log(err);
              } else {
                console.log('result is ', result);
                const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
                construct(placeholderVotingObj, null, null, result.rows, senderID, intent, searchAnsObjects);
              }
            });
          }
        });
      }
    });
  } else if (intent !== 'runningCandidates' && intent !== 'partyCompare' && intent !== 'brexit' && intent !== 'tuitionFees' && intent !== 'syria') {
    get.firstName(senderID, (err, firstName) => {
      if (err) {
        return err;
      }
      const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
      construct(placeholderVotingObj, firstName, null, null, senderID, intent, searchAnsObjects);
    });
  }
}


module.exports = {
  findLocalReply,
};
