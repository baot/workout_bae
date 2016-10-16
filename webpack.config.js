const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src', 'client'), // client folder
  build: path.join(__dirname, 'build'),
  styles: [
    path.join(__dirname, 'src', 'client', 'components', 'styles', 'main.css'),
    path.join(__dirname, 'node_modules', 'react-spinkit')
  ],
};

const CommonConfig = {
  entry: {
    style: PATHS.styles,
    index: [path.join(PATHS.src, 'index.jsx')],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: './src',
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
  ],
  devtool: 'eval',
};

let Config;

// Detect how npm is run
switch (process.env.npm_lifecycle_event) {

  case 'build':
    Config = merge(
      CommonConfig,
      {
        devtool: 'source-map',
        plugins: [
          new webpack.optimize.UglifyJsPlugin({ // minify
            compress: {
              warnings: false,
              drop_console: true,
            },
          }),
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
          }),
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
          }),
        ],
        entry: {
          vendor: ['react'],
        },
        module: {
          loaders: [
            // extract css during build
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css' }),
              include: PATHS.src,
            },
          ],
        },
        /*
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js',
          publicPath: '/',
        },
        */
      }
    );
    break;
  default:
    Config = merge(
      CommonConfig,
      {
        devtool: 'eval-source-map',
        entry: {
          index: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3001',
            'webpack/hot/only-dev-server',
          ],
        },
        plugins: [
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin(),
        ],
        module: {
          loaders: [
            {
              test: /\.css$/,
              loaders: ['style', 'css'],
              include: PATHS.styles,
            },
          ],
        },
      }
    );
}

module.exports = validate(Config);
