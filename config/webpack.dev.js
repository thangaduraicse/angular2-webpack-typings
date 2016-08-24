/**
 * Webpack configuration for development
 * See: http://webpack.github.io/docs/configuration.html
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const METADATA = webpackMerge(commonConfig.metadata, {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  ENV: process.env.ENV = process.env.NODE_ENV = 'development',
  HMR: helpers.hasProcessFlag('hot')
});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root("dist"),
    filename: "[name].js",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id].js",
    library: 'ac_[name]',
    libraryTarget: 'var'
  },

  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    })
  ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  devServer: {
    host: METADATA.host,
    port: METADATA.port,
    historyApiFallback: true,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist')
  }
});
