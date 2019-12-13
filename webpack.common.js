const path = require("path");

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

// Next steps: Look into HTMLWEbpack plugin to create multiple outputs
