const connect = require('./db_connect');

const post = {};

post.userDetails = (userDetails, callback) => {
  console.log('reaching userDetails function');
  console.log(userDetails);
  connect.query('INSERT INTO users (firstname, lastname, facebook_id) VALUES ($1, $2, $3)', [userDetails.firstname, userDetails.lastname, userDetails.facebook_id],
  (err, res) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(null, res);
  });
};

post.userPostcode = (userPostcode, callback) => {
  connect.query(`UPDATE users SET postcode = ${userPostcode.postcode} WHERE facebook_id = ${userPostcode.facebook_id}`, (err, res) => {
    if (err) return callback(err);

    callback(null, res);
  });
};

module.exports = post;
