const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const postcss = {
  loader: "postcss-loader",
  options: {
    sourceMap: false,
    plugins() {
      return [autoprefixer({ browsers: "last 3 versions" })];
    }
  }
};

module.exports = merge(common, {
    plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')})
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract([
          "css-loader?sourceMap=false&minimize=true",
          postcss,
          "sass-loader?sourceMap=false"
        ])
      }
    ]
  }
});