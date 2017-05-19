const get = require('../database/get_data.js');
const findLocalReply = require('./findLocalReply');

let lastIntent = null;
const count = 0;

function constructIssueBullets(facebookId, intent) {
  console.log('inside construct bullets');
  if (lastIntent === null) {
    console.log('lastIntent is null so party options');
    console.log('lastIntent is ', lastIntent);
    console.log('count is ', count);
    lastIntent = intent;
    findLocalReply(facebookId, 'Parties');
  } else if (lastIntent === intent) {
    console.log('lastIntent = intent so info');
  }
}

module.exports = constructIssueBullets;
