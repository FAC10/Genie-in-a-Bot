const { Pool } = require('pg');
const url = require('url');

const environment = require('env2');
environment('./config.env');


if (!process.env.HEROKU_POSTGRESQL_TEAL_URL) {
  throw new Error('DATABASE_URL missing from .env');
}

const params = url.parse(process.env.HEROKU_POSTGRESQL_TEAL_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 19,
  ssl: (params.hostname !== 'localhost'),
  idleTimeoutMillis: process.env.NODE_ENV === 'test' ? 1000 : 3000,
};

if (username) { options.user = username; }
if (password) { options.password = password; }

module.exports = new Pool(options);
