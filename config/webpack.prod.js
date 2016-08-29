/**
 * Webpack configuration for production
 * See: http://webpack.github.io/docs/configuration.html
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const METADATA = webpackMerge(commonConfig.metadata, {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  ENV: process.env.ENV = process.env.NODE_ENV = 'production',
  HMR: false
});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,

  debug: false,

  devtool: 'source-map',

  output: {
    path: helpers.root("dist"),
    filename: "[name].js",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id].chunk.js"
  },

  htmlLoader: {
    minimize: false, // workaround for ng2
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8 : true, keep_fnames: true },
      compress: { screw_ie8: true },
      comments: false
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),
    new webpack.NormalModuleReplacementPlugin(
      /angular2-hmr/,
      helpers.root('config/modules/angular2-hmr-prod.js')
    ),
  ],

  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  },

  node: {
    process: false
  }
});
