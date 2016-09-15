import winston from 'winston';
import { Config } from './config';

winston.cli();

function logApiServerConfig(err) {
  if (err) winston.error(err);

  winston.info('API Server listen on host: ', Config.host);
  winston.info('API Server listen on port: ', Config.apiPort);
}

function logWebpackDevServerConfig(err) {
  if (err) winston.error(err);

  winston.info('WebpackDevServer listen on host: ', Config.host);
  winston.info('WebpackDevServer listen on port: ', Config.webpackPort);
}

export { winston, logApiServerConfig, logWebpackDevServerConfig };
