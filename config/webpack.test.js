/**
 * Webpack configuration for testing
 * See: http://webpack.github.io/docs/configuration.html
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

const webpack = require('webpack');
const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src')
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [helpers.root('node_modules')]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        query: {
          compilerOptions: {
            removeComments: true
          }
        },
        exclude: [/\.e2e\.ts$/]
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src/index.html')]
      }
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false,
      }
    })
  ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
