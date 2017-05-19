const constructIssueBullets = require('./constructIssueBullets.js');
const get = require('../database/get_data.js');
const post = require('../database/db_post.js');

function issueHandler(facebookId, resolvedQuery, cb) {
  get.flow(facebookId, (err, res) => {
    if (err) return err;

    console.log('flow is ', res);
    if (res === 'Manifestos') {
      console.log('inside manifestos');
      const rawIntent = resolvedQuery.toLowerCase();
      console.log('rawIntent is ', rawIntent);
      if (rawIntent.includes('education') || rawIntent.includes('tuition') || rawIntent.includes('school') || rawIntent.includes('universit')) {
        console.log('inside education');
        constructIssueBullets(facebookId, 'education');
        post.issue('education', facebookId, (error, result) => {
          if (error) console.log(error);
          else {
          }
        });
        post.counts('education', (err, res) => {
          if (err) console.log(err);
          else {
          }
        });
      }
    }
    if (res === Parties) {
      console.log('parties flow');
    }
  });
}

module.exports = issueHandler;
