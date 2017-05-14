const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
require('env2')('./config.env');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 4000, () => {
  setInterval(() => {
    http.get('http://genie-in-a-bot.herokuapp.com');
    console.log('pinging');
  }, 300000); // every 5 minutes (300000)
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.use('/', routes);
