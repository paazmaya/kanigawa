/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

'use strict';

'use strict';

const path = require('path'),
  webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname),
  APP_PATH = path.resolve(ROOT_PATH, 'js/src'),
  BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: APP_PATH,
  // devtool: 'source-map',
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8899/assets',
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new webpack.ProvidePlugin({
      moment: 'moment',
      ASC: 'ACS',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [
      {
        //tell webpack to use jsx-loader for all *.jsx files
        test: /\.jsx$/,
        loader: 'jsx-loader?harmony'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
