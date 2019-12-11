const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  target: "web",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "script.js"
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
