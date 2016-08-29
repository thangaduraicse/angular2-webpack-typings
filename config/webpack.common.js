/**
 * Webpack default configuration all environment
 * See: http://webpack.github.io/docs/configuration.html
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const helpers = require('./helpers');
const CreateHtmlElements = require("./create-html-elements");

module.exports = {
  metadata: {
    title: "Angular 2 Webpack Typings",
    baseUrl: "/",
    isDevServer: helpers.isWebpackDevServer()
  },

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules']
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
          replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
          flags: 'g'
        },
        include: [helpers.root('src')]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          '@angularclass/hmr-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    /*
     * Generate html tags based on javascript maps.
     *
     * If a publicPath is set in the webpack output configuration, it will be automatically added to
     * href attributes, you can disable that by adding a "=href": false property.
     * You can also enable it to other attribute by settings "=attName": true.
     *
     * The configuration supplied is map between a location (key) and an element definition object (value)
     * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
     *
     *  Means we can use it in the template like this:
     *  <%= webpackConfig.htmlElements.headTags %>
     */
    new CreateHtmlElements({
      headTags: require('./head-config.common')
    })
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
