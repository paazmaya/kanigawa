/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

'use strict';

import babel from 'rollup-plugin-babel';

export default {
  format: 'es6',
  entry: 'src/index.jsx',
  dest: 'output-from-rollup.js',
  sourceMap: true,
  plugins: [
    babel({
      presets: ['react', 'es2015-rollup'],
      exclude: 'node_modules/**'
    })
  ]
};
