// eslint-disable-next-line import/no-extraneous-dependencies
import WebpackDevServer from 'webpack-dev-server';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
import webpackConfig from '../webpack.config.babel';
import { Config } from './config';
import { logWebpackDevServerConfig } from './logger';

webpackConfig.entry.unshift(
  `webpack-dev-server/client?http://${Config.host}:${Config.webpackPort}/`
);
const compiler = webpack(webpackConfig);

export default () => {
  const server = new WebpackDevServer(compiler, {
    contentBase: 'build/',
    publicPath: webpackConfig.output.publicPath,
    // hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': `http://${Config.host}:${Config.apiPort}`,
    },
  });

  server.listen(Config.webpackPort, Config.host, logWebpackDevServerConfig);
};
