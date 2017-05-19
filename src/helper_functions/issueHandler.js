const constructIssueBullets = require('./constructIssueBullets.js');
const get = require('../database/get_data.js');
const post = require('../database/db_post.js');
const findLocalReply = require('./findLocalReply');

function issueHandler(facebookId, resolvedQuery, cb) {
  get.flow(facebookId, (err, res) => {
    if (err) return err;

    console.log('flow is ', res);
    if (res === 'Manifestos') {
      console.log('inside manifestos');
      const rawIntent = resolvedQuery.toLowerCase();
      if (rawIntent.includes('education') || rawIntent.includes('tuition') || rawIntent.includes('school') || rawIntent.includes('universit')) {
        post.issue('education', (error, result) => {
          if (error) console.log(error);
          else {
            findLocalReply(facebookId, 'mani_parties');
          }
        });
        post.counts('education', (err, res) => {
          if (err) console.log(err);
          else {
          }
        });
      }
    }
  });
}

module.exports = issueHandler;
