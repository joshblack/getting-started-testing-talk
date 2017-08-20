'use strict';

const { createTransformer } = require('babel-jest');

const babelOptions = {
  presets: [
    'es2015',
    'stage-2',
    'react',
  ],
};

module.exports = createTransformer(babelOptions);
