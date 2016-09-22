import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './src/api/routes/users';
import webpackDevServer from './src/webpackDevServer';

const app = express();

mongoose.Promise = global.Promise;  // change mongoose promise lib
mongoose.connect('mongodb://localhost/workout');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoute);

webpackDevServer();
const server = http.createServer(app);
server.listen(3000, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log('API server listening at http://localhost:3000');
});
