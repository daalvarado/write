const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const moment = require("moment");



module.exports = {
  entry: ["babel-polyfill", path.join(__dirname, "src", "index.js")],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: path.join(__dirname, "node_modules")
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          "file-loader?name=[name].[ext]&useRelativePath=true",
          "image-webpack-loader"
        ]
      },
      
      {
        test: /assets.[^img]/,
        use: "file-loader?name=[name].[ext]&useRelativePath=true"
      }
    ]
  },
  devServer: {
    open: true,
    port: 3000,
    overlay: true,
    contentBase: [
      path.join(__dirname, "src"),
      path.join(__dirname, "src/includes")
    ],
    watchContentBase: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "underscore",
      moment: "moment"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      minify: {
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "article1.html"),
      filename: "article1.html",
      minify: {
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "article2.html"),
      filename: "article2.html",
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};
