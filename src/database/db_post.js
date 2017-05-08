const connect = require('./db_connect');

const post = {};

post.userDetails = (userDetails, callback) => {
  const checkIfUserExists = 'SELECT facebook_id FROM users WHERE facebook_id = $1;';
  connect.query(checkIfUserExists, [userDetails.facebook_id], (err, user) => {
    if (err) { return callback(err); }

    console.log('user.rows', user.rows);
    console.log('user.rows[0]', user.rows[0]);
    console.log('user.rows[0].facebook_id', user.rows[0].facebook_id);

    const rows = user.rows;
    const rowsZero = rows[0];
    const rowsId = rowsZero.facebook_id;
    console.log('rowsId is ', rowsId);
  });


  // connect.query('INSERT INTO users (firstname, lastname, facebook_id) VALUES ($1, $2, $3)', [userDetails.firstname, userDetails.lastname, userDetails.facebook_id],
  // (err, res) => {
  //   if (err) {
  //     console.log(err);
  //     return callback(err);
  //   }
  //   callback(null, res);
  // });
};

post.userPostcode = (userPostcode, callback) => {
  connect.query(`UPDATE users SET postcode = ${userPostcode.postcode} WHERE facebook_id = ${userPostcode.facebook_id}`, (err, res) => {
    if (err) return callback(err);

    callback(null, res);
  });
};

module.exports = post;
