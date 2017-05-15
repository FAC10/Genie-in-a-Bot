const connect = require('./db_connect');
const candidateConnect = require('./db_connect_candidate');

const get = {};

get.firstName = (facebookId, callback) => connect.query('SELECT firstname FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  const rows = res.rows;
  const rowsZero = rows[0];
  if (rowsZero) {
    const rowsName = rowsZero.firstname;
    return callback(null, rowsName);
  }
  return callback(null, null);
});

get.partyVotes = (partyKey, callback) =>
connect.query('SELECT party, issue, inFavour, against, extra, turnout FROM partyVotes WHERE partyKey = $1;', [partyKey], (err, res) => {
  if (err) {
    return callback(err);
  }
  return callback(null, res);
});

get.constituency = (facebookId, callback) =>
connect.query('SELECT constituency FROM users WHERE facebook_id = $1;', [facebookId], (err, res) => {
  if (err) {
    return err;
  }
  const rows = res.rows;
  const rowsZero = rows[0];
  if (rowsZero) {
    const constituency = rowsZero.constituency;
    return callback(null, constituency);
  }
  return callback(null, null);
});


get.candidates = (constituency, callback) => candidateConnect.query('SELECT name, party_name, twitter_username, image_url FROM temps2 WHERE post_label = $1;', [constituency], (err, res) => {
  if (err) {
    return callback(err);
  }
  return callback(null, res);
});

get.randomJoke = callback =>
connect.query('SELECT joke, image_url FROM jokes ORDER BY RANDOM() LIMIT 1 ', (err, res) => {
  if (err) {
    return callback(err);
  }
  return callback(null, res);
});


get.persistingCtxts = (facebookId, callback) => connect.query('SELECT persistingCtxts FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  const rows = res.rows;
  const rowsZero = rows[0];
  if (rowsZero) {
    const persistingCtxts = rowsZero.persistingctxts;
    if (persistingCtxts !== null) {
      return callback(null, persistingCtxts[0]);
    }
    return callback(null, null);
  }
  return callback(null, null);
});

get.party = (facebookId, callback) => connect.query('SELECT party FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  const rows = res.rows;
  const rowsZero = rows[0];
  // console.log('rowsZero is ', rowsZero);
  if (rowsZero) {
    const party = rowsZero.party;
    if (party !== null) {
      return callback(null, party[0]);
    }
    return callback(null, null);
  }

  return callback(null, null);
});

get.issue = (facebookId, callback) => connect.query('SELECT issue FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  const rows = res.rows;
  const rowsZero = rows[0];
  if (rowsZero) {
    const issue = rowsZero.issue;
    if (issue !== null) {
      return callback(null, issue[0]);
    }
    return callback(null, null);
  }
  return callback(null, null);
});

get.compare = (issue, callback) => connect.query('SELECT swing, majority FROM partyVotes WHERE issue = $1', [issue], (err, res) => {
  if (err) {
    return callback(err);
  }
  const rows = res.rows;
  console.log('res.rows is ', rows);

  return callback(null, res);
});


module.exports = get;
