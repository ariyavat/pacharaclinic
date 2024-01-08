module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: "app/main.js"
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/     
    }
    ]
  },
  devServer: {
    inline: true,
  }
}