const path = require('path')

module.exports = {
  entry: {
    createDb: './app/createDb/main.js',
    retrieveData: './app/retrieveData/main.js',
    storeData: './app/storeData/main.js'
  },
  output: {
    filename: '[name]/main.js',
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/',
  },
  module: {
    rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
    port: 9000
  },
}
