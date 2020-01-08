const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/js/index.js",
    article_page: "./src/js/template-js/article_page.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "./template/article_page.hbs",
      template: "src/templates/article_page.hbs",
      chunks: ["article_page"]
    }),
    function() {
      this.plugin("done", function(stats) {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log(stats.compilation.errors);
          process.exit(1);
        }
      });
    }
  ]
};
