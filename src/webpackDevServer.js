const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

module.exports = function initWebpackDevServer() {
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

  server.listen(3001, 'localhost', function cb(err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('WebpackDevServer listening at http://localhost:3001');
  });
};
