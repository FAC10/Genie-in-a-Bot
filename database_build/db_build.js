const fs = require('fs');
const path = require('path');
const connect = require('./../src/database/db_connect');

const buildUsers = fs.readFileSync(path.join(__dirname, 'db_build.sql'), 'utf8');
// const buildVotes = fs.readFileSync(path.join(__dirname, 'db_build_votes.sql'), 'utf8');

connect.query(buildUsers, (err, res) => {
  if (err) throw err;
  console.log('Users table built successfully');
});


// Below to be used when building our MPvotes database

// connect.query(buildVotes, (err, res) => {
//   if (err) console.log(err);
//   console.log('Voting tables built successfully');
// });
