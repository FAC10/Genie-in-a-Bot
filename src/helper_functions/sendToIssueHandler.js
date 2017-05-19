const issueHandler = require('./issueHandler');

function sendToIssueHandler(facebookId, issue) {
  issueHandler(facebookId, issue);
}

module.exports = sendToIssueHandler;
