const path = require("path");

module.exports = {
  entry: {
    "script": "./src/js/script.js",
    "assets/article_page": "./src/js/template-js/article_page.js",
    "assets/category_page": "./src/js/template-js/category_page.js",
    "assets/community_post_list_page": "./src/js/template-js/community_post_list_page.js",
    "assets/community_post_page": "./src/js/template-js/community_post_page.js",
    "assets/community_topic_list_page": "./src/js/template-js/community_topic_list_page.js",
    "assets/community_topic_page": "./src/js/template-js/community_topic_page.js",
    "assets/contributions_page": "./src/js/template-js/contributions_page.js",
    "assets/error_page": "./src/js/template-js/error_page.js",
    "assets/footer": "./src/js/template-js/footer.js",
    "assets/header": "./src/js/template-js/header.js",
    "assets/home_page": "./src/js/template-js/home_page.js",
    "assets/new_community_post_page": "./src/js/template-js/new_community_post_page.js",
    "assets/new_request_page": "./src/js/template-js/new_request_page.js",
    "assets/request_page": "./src/js/template-js/request_page.js",
    "assets/requests_page": "./src/js/template-js/requests_page.js",
    "assets/search_results": "./src/js/template-js/search_results.js",
    "assets/section_page": "./src/js/template-js/section_page.js",
    "assets/subscriptions_page": "./src/js/template-js/subscriptions_page.js",
    "assets/user_profile_page": "./src/js/template-js/user_profile_page.js"
  
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
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
  plugins: [],
};
