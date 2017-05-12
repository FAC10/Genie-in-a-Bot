const construct = require('./answer_objects');
const get = require('./../database/get_data');
const extractContexts = require('./extractContexts');
const getVotingData = require('./getVotingData');
const constructCandidates = require('./constructCandidates');
const searchAnsObjects = require('./searchAnsObjects');

function findLocalReply(senderID, intent) {
  if (intent === 'runningCandidates') {
    console.log('in local reply about to check database');
    get.constituency(senderID, (err, res) => {
      if (err) {
        return err;
      }
      const constituency = res;
      console.log(constituency);
      get.candidates(constituency, (error, result) => {
        if (error) {
          return error;
        }
        const candidates = result.rows;
        constructCandidates(candidates, senderID, intent, construct, searchAnsObjects);
      });
    });
  }
  if (intent === 'brexit' || intent === 'tuitionFees' || intent === 'syria') {
    console.log('I am one of the intents we want');
    extractContexts(senderID, intent, getVotingData);
  }
  if (intent === 'partyCompare') {
    get.issue(senderID, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('res in if intent is partyCompare is ', res);
        get.compare(res[0], (error, result) => {
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
