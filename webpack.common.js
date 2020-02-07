const path = require("path");

module.exports = {
  entry: {
    index: "./src/js/index.js",
    article_page: "./src/js/template-js/article_page.js",
    category_page: "./src/js/template-js/category_page.js",
    community_post_list_page: "./src/js/template-js/community_post_list_page.js",
    community_post_page: "./src/js/template-js/community_post_page.js",
    community_topic_list_page: "./src/js/template-js/community_topic_list_page.js",
    community_topic_page: "./src/js/template-js/community_topic_page.js",
    error_page: "./src/js/template-js/error_page.js",
    footer: "./src/js/template-js/footer.js",
    header: "./src/js/template-js/header.js",
    home_page: "./src/js/template-js/home_page.js",
    new_community_post_page: "./src/js/template-js/new_community_post_page.js",
    new_request_page: "./src/js/template-js/new_request_page.js",
    request_page: "./src/js/template-js/request_page.js",
    search_results: "./src/js/template-js/search_results.js",
    section_page: "./src/js/template-js/section_page.js",
    subscriptions_page: "./src/js/template-js/subscriptions_page.js",
    user_profile_page: "./src/js/template-js/user_profile_page.js"
  
  },
  output: {
    path: path.resolve(__dirname, "./dist/template-js"),
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
