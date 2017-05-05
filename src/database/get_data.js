const connect = require('./db_connect');

const get = {};

get.firstName = (facebookId, callback) => connect.query('SELECT firstname FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  // console.log('resname is ', res.Result.rows.firstname);
  // console.log('res.Result.rows ', res.Result.rows);
  const rows = res.rows;
  const rowsZero = rows[0] || 'Did not work';
  const rowsName = rowsZero.firstname || 'Also did not work';
  console.log(rows);
  console.log(rowsZero);
  console.log(rowsName);
  return callback(null, JSON.parse(res.rows[0]).firstname);
});

module.exports = get;
