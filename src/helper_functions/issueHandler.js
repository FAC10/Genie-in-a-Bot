const findLocalReply = require('./findLocalReply.js');
const get = require('../database/get_data.js');
const post = require('../database/db_post.js');

function issueHandler(facebookId, resolvedQuery, cb) {
  get.flow(facebookId, (err, res) => {
    if (err) return err;

    console.log('flow is ', res);
    if (res === 'Manifestos') {
      console.log('inside manifestos');
      const rawIntent = resolvedQuery.toLowerCase();
      if (rawIntent.includes('education') || rawIntent.includes('tuition') || rawIntent.includes('school') || rawIntent.includes('universit')) {
        findLocalReply(facebookId, 'mani_education');
        counts.post('education', (err, res) => {
          if (err) console.log(err);
          else {
          }
        });
      }
    }
  });
}

module.exports = issueHandler;
