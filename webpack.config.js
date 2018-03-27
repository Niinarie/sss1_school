/* eslint-disable */
function getEntrySources(sources) {
  sources.push('webpack-dev-server/client?http://localhost:8080');
  sources.push('webpack/hot/only-dev-server');
  return sources;
}

module.exports = {
  entry: {
    helloWorld: getEntrySources([
      './src/main.js'
    ])
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'public/main.js',
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
  },
  node: {
    fs: 'empty'
  }
};