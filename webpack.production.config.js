/* eslint-disable */
const { resolve }  = require('path');

module.exports = {
    entry:  [
            './src/main.js'
        ]
    ,
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
        ],
      },
    ],
  }
};