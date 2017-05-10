const connect = require('./db_connect');

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
  const rows = res.rows;
  const rowsZero = rows[0];
  const rowsPCtxts = rowsZero.persistingctxts;
  return callback(null, rowsPCtxts);
});

get.persistingCtxts = (facebookId, callback) => connect.query('SELECT persistingCtxts FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  console.log('initial res is ', res);
  const rows = res.rows;
  const rowsZero = rows[0];
  // console.log('rowsZero is ', rowsZero);
  const persistingCtxts = rowsZero.persistingctxts;
  console.log('persistingCtxts', persistingCtxts);
  if (persistingCtxts[0]) {
    return callback(null, persistingCtxts[0]);
  }

  return callback(null, persistingCtxts);
});

get.fleetingCtxts = (facebookId, callback) => connect.query('SELECT fleetingCtxts FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  const rows = res.rows;
  const rowsZero = rows[0];
  const rowsContexts = rowsZero.contexts;
  return callback(null, rowsContexts);
});

module.exports = get;
