"use strict";

import posthtml from "gulp-posthtml";
import gulp from "gulp";
import sass from "gulp-sass";
import sassVars from "gulp-sass-vars";
import exp from "posthtml-expressions";
import include from "posthtml-include";
import postCss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import dotenv from "dotenv";
import ziptool from "gulp-zip";
import runSequence from "gulp4-run-sequence";
import yargs from "yargs";
import webpackDevConfig from "./webpack.dev";
import webpackProdConfig from "./webpack.prod";
import webpack from "webpack";

// Load environment config file
const argv = yargs.argv;
const env = argv.env;
dotenv.config({ path: env ? "." + env + ".env" : ".local.env" });

// Configoad configuration
const config = require("./config");

// Webpack configuration
var webpackConf = null;
if (env === "production") {
  webpackConf = webpackProdConfig; // Object.create(webpackProdConfig);
  webpackConf.plugins = webpackConf.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      },
      _config: config
    })
  );
} else {
  webpackConf = webpackDevConfig; //Object.create(webpackDevConfig);
  webpackConf.plugins = webpackConf.plugins.concat(
    new webpack.DefinePlugin({
      _config: config
    })
  );
}

// create a single instance of the compiler to allow caching
var webpackCompiler = webpack(webpackConf);

const packageZip = async cb => {
  runSequence("build", "zip", cb);
};

const zip = () => {
  return gulp
    .src("dist/**")
    .pipe(ziptool("theme.zip"))
    .pipe(gulp.dest("tmp"));
};

const watch = () => {
  gulp.watch("./src/templates/*.hbs", gulp.series("build_templates"));
  gulp.watch("./src/sass/**/*.scss", gulp.series("build_sass"));
  gulp.watch("./src/js/**", gulp.series("build_js"));
  gulp.watch("./src/partials/*.hbs", gulp.series("build_partials"));
};

const build_partials = () => {
  var plugins = [
    exp({
      delimiters: ["{{%", "%}}"],
      unescapedDelimiters: ["{{{%", "%}}}"],
      locals: config
    }),
    include({ root: "src/partials" })
  ];

  return gulp
    .src("./src/partials/*.hbs")
    .pipe(posthtml(plugins, { template: false }))
    .pipe(gulp.dest("./dist/templates"));
};

const build_sass = () => {
  const plugins = [autoprefixer()];

  return gulp
    .src("./src/sass/style.scss")
    .pipe(sassVars(config, { verbose: false }))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postCss(plugins))
    .pipe(gulp.dest("./dist"));
};

const build_templates = () => {
  var plugins = [
    exp({
      delimiters: ["{{%", "%}}"],
      unescapedDelimiters: ["{{{%", "%}}}"],
      locals: config
    }),
    include({ root: "src/partials" })
  ];

  return gulp
    .src("./src/templates/*.hbs")
    .pipe(posthtml(plugins, { template: false }))
    .pipe(gulp.dest("./dist/templates"));
};

const build_js = () => {
  // run webpack
  webpackCompiler.run(function(err, stats) {
    if (err) {
      console.err(err);
    }
    callback();
  });
};

const build = async () => {
  gulp.parallel("build_sass", "build_templates", "build_js");
};

exports.package = packageZip;
exports.zip = zip;
exports.watch = watch;
exports.build_partials = build_partials;
exports.build_sass = build_sass;
exports.build_templates = build_templates;
exports.build_js = build_js;
exports.build = build;
