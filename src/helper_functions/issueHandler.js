const constructIssueBullets = require('./constructIssueBullets.js');
const get = require('../database/get_data.js');
const post = require('../database/db_post.js');
const extractContexts = require('./extractContexts');
const getVotingData = require('./getVotingData');

function trackIssue(issue, facebookId) {
  post.issue(issue, facebookId, (error, result) => {
    if (error) console.log(error);
    else {
    }
  });
  post.counts(issue, (err, res) => {
    if (err) console.log(err);
    else {
    }
  });
}

function issueConstructor(issue, facebookId, party) {
  console.log(`inside ${issue}`);
  if (party) {
    constructIssueBullets(facebookId, issue, party);
    trackIssue(issue, facebookId);
    trackIssue(party, facebookId);
  } else {
    constructIssueBullets(facebookId, issue);
    trackIssue(issue, facebookId);
  }
}

function findParty(resolvedQuery) {
  if (resolvedQuery.toLowerCase().includes('conservative') || resolvedQuery.toLowerCase().includes('tory') || resolvedQuery.toLowerCase().includes('tories')) {
    return 'Conservative';
  } else if (resolvedQuery.toLowerCase().includes('labour')) {
    return 'Labour';
  } else if (resolvedQuery.toLowerCase().includes('lib dem') || resolvedQuery.toLowerCase().includes('liberal democrats')) {
    return 'Lib Dem';
  } else if (resolvedQuery.toLowerCase().includes('snp') || resolvedQuery.toLowerCase().includes('scottish national party')) {
    return 'SNP';
  } else if (resolvedQuery.toLowerCase().includes('green') || resolvedQuery.toLowerCase().includes('green party')) {
    return 'Green';
  }
}

function issueHandler(facebookId, resolvedQuery, partyTag) {
  const rawIntent = resolvedQuery.toLowerCase();
  if (partyTag) {
    get.issue(facebookId, (err, issue) => {
      if (err) return err;
      const party = findParty(resolvedQuery);
      console.log('party is ', party);
      issueConstructor(issue, facebookId, party);
    });
  } else {
    get.flow(facebookId, (err, flow) => {
      if (err) return err;
      console.log('flow is ', flow);
      if (flow === 'Manifestos') {
        console.log('inside manifestos');
        console.log('rawIntent is ', rawIntent);
        if (rawIntent.includes('education') || rawIntent.includes('tuition') || rawIntent.includes('school') || rawIntent.includes('universit')) {
          issueConstructor('education', facebookId);
        } else if (rawIntent.includes('health') || rawIntent.includes('nhs') || rawIntent.includes('doctor') || rawIntent.includes('nurse')) {
          issueConstructor('health', facebookId);
        } else if (rawIntent.includes('economy') || rawIntent.includes('economy') || rawIntent.includes('money')) {
          issueConstructor('economy', facebookId);
        } else if (rawIntent.includes('immigration') || rawIntent.includes('migrant') || rawIntent.includes('refugee')) {
          issueConstructor('immigration', facebookId);
        } else if (rawIntent.includes('housing') || rawIntent.includes('house') || rawIntent.includes('homeless') || rawIntent.includes('home')) {
          issueConstructor('housing', facebookId);
        } else if (rawIntent.includes('environment') || rawIntent.includes('warming') || rawIntent.includes('pollution') || rawIntent.includes('trees') || rawIntent.includes('animal') || rawIntent.includes('wildlife') || rawIntent.includes('fossil') || rawIntent.includes('renewable')) {
          issueConstructor('environment', facebookId);
        } else if (rawIntent.includes('tax') || rawIntent.includes('entrepreneur') || rawIntent.includes('rich') || rawIntent.includes('wealth')) {
          issueConstructor('tax', facebookId);
        } else if (rawIntent.includes('brexit') || rawIntent.includes('eu') || rawIntent.includes('europe')) {
          issueConstructor('brexit_mani', facebookId);
        } else if (rawIntent.includes('transport') || rawIntent.includes('bus') || rawIntent.includes('train') || rawIntent.includes('taxi')) {
          issueConstructor('transport', facebookId);
        } else if (rawIntent.includes('foreign') || rawIntent.includes('affairs') || rawIntent.includes('abroad') || rawIntent.includes('trump') || rawIntent.includes('syria')) {
          issueConstructor('faffairs', facebookId);
        } else if (rawIntent.includes('defence') || rawIntent.includes('weapon') || rawIntent.includes('trident') || rawIntent.includes('army') || rawIntent.includes('navy') || rawIntent.includes('marines')) {
          issueConstructor('defence', facebookId);
        }
      }
      if (flow === 'Parties') {
        console.log('parties flow');
        console.log('rawIntent is ', rawIntent);
        if (rawIntent.includes('education') || rawIntent.includes('tuition') || rawIntent.includes('school') || rawIntent.includes('universit')) {
          trackIssue('tuition_fees', facebookId);
          extractContexts(facebookId, 'tuition_fees', getVotingData);
        } else if (rawIntent.includes('syria') || rawIntent.includes('strike') || rawIntent.includes('isis') || rawIntent.includes('daesh') || rawIntent.includes('islamic state')) {
          trackIssue('syria', facebookId);
          extractContexts(facebookId, 'syria', getVotingData);
        } else if (rawIntent.includes('brexit') || rawIntent.includes('eu') || rawIntent.includes('europe')) {
          trackIssue('brexit_votes', facebookId);
          extractContexts(facebookId, 'brexit_votes', getVotingData);
        }
      }
    });
  }
}

module.exports = issueHandler;
