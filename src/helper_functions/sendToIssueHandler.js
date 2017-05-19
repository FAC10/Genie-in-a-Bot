const issueHandler = require('./issueHandler');

function sendToIssueHandler(facebookId, issue) {
  console.log('issue in send to issue handler is ', issue);
  issueHandler(facebookId, issue);
}

module.exports = sendToIssueHandler;
