const connect = require('./../src/database/db_connect');

const post = {};

post.userDetails = (userDetails, callback) => {
  connect.query('INSERT INTO users (firstname, lastname, facebook_id) VALUES ($1, $2, $3) RETURNING id', [userDetails.firstname, userDetails.lastname, userDetails.facebook_id],
  (err, res) => {
    if (err) return callback(err);

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
