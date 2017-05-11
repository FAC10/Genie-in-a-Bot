const construct = require('./answer_objects');
const get = require('./../database/get_data');
const extractContexts = require('./extractContexts');
const getVotingData = require('./getVotingData');
const constructCandidates = require('./constructCandidates');
const searchAnsObjects = require('./searchAnsObjects');

function findLocalReply(senderID, intent) {
  if (intent === 'runningCandidates') {
    get.constituency(senderID, (err, res) => {
      if (err) {
        return err;
      }
      const constituency = res;
      get.candidates(constituency, (err, res) => {
        if (err) {
          return err;
        }
        const candidates = res.rows;
        console.log('candidates are ', candidates);
        constructCandidates(candidates, senderID, intent, construct, searchAnsObjects);
      });
    });
  }
  if (intent === 'brexit' || intent === 'tuitionFees' || intent === 'syria') {
    extractContexts(senderID, intent, getVotingData);
  } else if (intent !== 'runningCandidates') {
    get.firstName(senderID, (err, firstName) => {
      if (err) {
        return err;
      }
      const placeholderVotingObj = { party: null, issue: null, inFavour: null, against: null, turnout: null };
      construct(placeholderVotingObj, firstName, null, senderID, intent, searchAnsObjects);
    });
  }
}


module.exports = {
  findLocalReply,
};
