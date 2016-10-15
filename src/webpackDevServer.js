/* eslint no-console: 0 */

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import webpackConfig from '../webpack.config';

const compiler = webpack(webpackConfig);

export default function initWebpackDevServer() {
  const server = new WebpackDevServer(compiler, {
    contentBase: './build',
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:3000',
    },
    stats: {
      colors: true,
      chunks: false,
    },
  });

  server.listen(3001, 'localhost', (err) => {
    if (err) {
      return console.log(err);
    }

    return console.log('WebpackDevServer listening at http://localhost:3001');
  });
}
