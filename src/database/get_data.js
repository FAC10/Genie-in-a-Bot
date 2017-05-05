const connect = require('./db_connect');

const get = {};

get.firstName = (facebookId, callback) => {
  connect.query('SELECT firstname FROM users WHERE facebook_id = $1', [facebookId], (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null, res);
  });
};

module.exports = get;
