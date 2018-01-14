var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEV = path.resolve(__dirname, "src");
var OUTPUT = path.resolve(__dirname, "dist");

var config = {
  entry: [DEV + "/scripts/app.jsx"],
  output: {
    path: OUTPUT,
    filename: "myCode.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: DEV,
      loader: "babel-loader",
      query: {
        presets: ['react', 'es2015', 'stage-3']
      }
    },
    {
      test: /\.scss$/,
      include: DEV,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      //loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    inline: true,
    port: 8080
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
};

module.exports = config;