'use strict';

const { createTransformer } = require('babel-jest');

const babelOptions = {
  presets: [
    ['env', {
      targets: {
        node: 'current',
      },
    }],
    'react',
  ],
};

module.exports = createTransformer(babelOptions);
