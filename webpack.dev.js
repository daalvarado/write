const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");


const postcss = {
  loader: "postcss-loader",
  options: {
    sourceMap: true,
    plugins() {
      return [autoprefixer({ browsers: "last 3 versions" })];
    }
  }
};


module.exports = merge(common, {

  devtool: "inline-source-map",
  module: {
    rules: [
{
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract([
          "css-loader?sourceMap",
          postcss,
          "sass-loader?sourceMap"
        ])
      }]}})