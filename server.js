const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./src/api/routes/users');
const webpackDevServer = require('./src/webpackDevServer');

const app = express();

mongoose.Promise = global.Promise;  // change mongoose promise lib
mongoose.connect('mongodb://localhost/workout');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoute);

webpackDevServer();
const server = http.createServer(app);
server.listen(3000, 'localhost', function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('API server listening at http://localhost:3000');
});
