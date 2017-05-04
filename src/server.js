
const routes = require('./routes/home');
const express = require('express');

const app = express();

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.use('/', routes)
