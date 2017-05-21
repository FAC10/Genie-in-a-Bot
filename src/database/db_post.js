const connect = require('./db_connect');

const post = {};

post.userDetails = (userDetails, callback) => {
  const checkIfUserExists = 'SELECT facebook_id FROM users WHERE facebook_id = $1;';
  connect.query(checkIfUserExists, [userDetails.facebook_id], (err, user) => {
    if (err) { return callback(err); }

    if (!user.rows[0]) {
      connect.query('INSERT INTO users (firstname, lastname, facebook_id) VALUES ($1, $2, $3)', [userDetails.firstname, userDetails.lastname, userDetails.facebook_id],
      (err, res) => {
        if (err) {
          return callback(err);
        }
        callback(null, res);
      });
    } else {
      callback(null, user);
    }
  });
};

post.userPostcode = (userPostcode, callback) => {
  connect.query(`UPDATE users SET postcode = '${userPostcode.postcode}' WHERE facebook_id = ${userPostcode.facebook_id}`, (err, res) => {
    if (err) return callback(err);

    callback(null, res);
  });
};


post.persistingCtxts = (contexts, facebook_id, callback) => {
  connect.query(`UPDATE users SET persistingCtxts = '{${contexts}}' WHERE facebook_id = ${facebook_id}`, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};

post.startContext = (context, facebook_id, callback) => {
  console.log('facebook_id is ', facebook_id);
  console.log('in posting context function');
  connect.query(`UPDATE users SET startContext = '{${context}}' WHERE facebook_id = ${facebook_id}`, (err, res) => {
    if (err) console.log('error is ', err);
    console.log('res in post.startContext is ', res);
    callback(null, res);
  });
};

post.party = (contexts, facebook_id, callback) => {
  if (contexts !== 'Back to votes' && contexts !== 'Back to parties') {
    console.log('party in post party is ', contexts);
    connect.query(`UPDATE users SET party = '{${contexts}}' WHERE facebook_id = ${facebook_id}`, (err, res) => {
      if (err) return err;
      return callback(null, res);
    });
  }
};

post.issue = (contexts, facebook_id, callback) => {
  connect.query(`UPDATE users SET issue = '{${contexts}}' WHERE facebook_id = ${facebook_id}`, (err, res) => {
    if (err) return err;
    return (null, res);
  });
};

post.userConstituency = (userConstituency, callback) => {
  connect.query(`UPDATE users SET constituency = '${userConstituency.constituency}' WHERE facebook_id = ${userConstituency.facebook_id}`, (err) => {
    if (err) return callback(err);
    return callback();
  });
};

post.counts = (value, callback) => {
  connect.query(`UPDATE counts SET ${value} = ${value} + 1 WHERE id = 1`, (err) => {
    if (err) return callback(err);
    return callback();
  });
};

post.flow = (contexts, facebook_id, callback) => {
  connect.query(`UPDATE users SET flow = '{${contexts}}' WHERE facebook_id = ${facebook_id}`, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};

module.exports = post;
