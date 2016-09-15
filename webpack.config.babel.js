// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'webpack-merge';
import path from 'path';
import isDev from 'isdev';
import { Dir } from './src/config';

let Config = {
  entry: [
    'babel-polyfill',
    path.join(Dir.src, 'app.jsx'),
  ],
  output: {
    path: path.join(Dir.public, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  resolve: {
    root: Dir.src,
    extensions: ['', '.jsx', '.js', '.json'],
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: Dir.src,
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

const TARGET = process.env.npm_lifecycle_event;
if (TARGET === 'build:prod' && !isDev) {
  Config = merge(Config, {
    bail: true,
    devtool: 'source-map',
    output: { publicPath: '/build/' },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        dropDebugger: true,
        dropConsole: true,
        compressor: {
          warnings: false,
        },
      }),
    ],
  });
}

if (TARGET === 'server:dev' && isDev) {
  Config = merge(Config, {
    devtool: 'eval',
  });
}

const WebpackConfig = Config;
export default WebpackConfig;
