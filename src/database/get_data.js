const connect = require('./db_connect');

const get = {};

get.firstName = (facebookId, callback) => connect.query('SELECT firstname FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
  if (err) {
    return callback(err);
  }
  // console.log('resname is ', res.Result.rows.firstname);
  // console.log('res.Result.rows ', res.Result.rows);
  console.log('res.rows is ', res.rows);
  console.log(typeof res.rows);
  console.log('res is ' res);

  return callback(null, res.rows[1].firstname);
});

module.exports = get;
