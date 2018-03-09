const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const postcss = {
  loader: "postcss-loader",
  options: {
    sourceMap:true,
    plugins() {
      return [autoprefixer({ browsers: "last 3 versions" })];
    }
  }
};

const uglify = new webpack.optimize.UglifyJsPlugin({
  // eslint-disable-line
  compress: { warnings: false }
});

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract([
          "css-loader?sourceMap",
          postcss,
          "sass-loader?sourceMap"
        ])
      },
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
      },
     
      // {
      //   test: /\.(html|ejs)$/,
      //   use: ["html-loader", "ejs-html-loader"]
      // }
    ]
  },
  devServer: {
    open: true, //para abrir el navegador
    port: 3000, //puerto a usar
    overlay: true, //mostrar pagina de error en el navegador
    contentBase: [
      path.join(__dirname, "src"),
      path.join(__dirname, "src/includes")
    ], //usa contenidos en la carpeta src
    watchContentBase: true //recarga la pagina cuando hay cambios en los archivos
    // hot: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "underscore"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin("style.css"), //creamos archivo css en el output final
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




// const isProduction = process.env.ENTORNO == "produccion";
// let scssLoaders = [];
// if (isProduction) {
//   scssLoaders = ExtractTextPlugin.extract({
//     fallback: "style-loader",
//     use: ["css-loader?url=false&sourceMap=true", 'sass-loader?sourceMap=true']
//   });
// } else {
//   scssLoaders = [
//     'style-loader',
//     'css-loader?url=false&sourceMap=true',
//     'sass-loader?sourceMap=true'
//   ];
// }