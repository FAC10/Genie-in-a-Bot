const connect = require('./db_connect');
const candidateConnect = require('./db_connect_candidate');

const get = {};

get.firstName = (facebookId, callback) => connect.query('SELECT firstname FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  const rows = res.rows;
  const rowsZero = rows[0];
  const rowsName = rowsZero.firstname;
  return callback(null, rowsName);
});

get.partyVotes = (partyKey, callback) =>
connect.query('SELECT party, issue, inFavour, against, turnout FROM partyVotes WHERE partyKey = $1;', [partyKey], (err, res) => {
  if (err) {
    return callback(err);
  }
  return callback(null, res);
});

get.candidates = (constituency, callback) => candidateConnect.query('SELECT name, party_name, twitter_username, image_url FROM candidates4 WHERE post_label = $1;', [constituency], (err, res) => {
  if (err) {
    return callback(err);
  }
  return callback(null, res);
});

module.exports = get;
