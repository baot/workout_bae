import express from 'express';
import http from 'http';
import webpackDevServer from './webpackDevServer';
import { Config } from './config';
import { logApiServerConfig } from './logger';

const app = express();
const server = http.createServer(app);

app.get('/api/test', (req, res) => {
  res.send('Hello World!');
});

webpackDevServer();
server.listen(Config.apiPort, Config.host, logApiServerConfig);
