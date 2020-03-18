import posthtml from "gulp-posthtml"
import gulp from "gulp"
import sass from "gulp-sass"
import sassVars from "gulp-sass-vars"
import exp from "posthtml-expressions"
import include from "posthtml-include"
import postCss from "gulp-postcss"
import autoprefixer from "autoprefixer"
import dotenv from "dotenv"
import ziptool from "gulp-zip"
import yargs from "yargs"
import webpackDevConfig from "./webpack.dev"
import webpackProdConfig from "./webpack.prod"
import webpack from "webpack"

// Load environment config file
const argv = yargs.argv
const env = argv.env
dotenv.config({ path: env ? "." + env + ".env" : ".local.env" })

// Configoad configuration
const config = require("./config")

// Webpack configuration
var webpackConf = null
if (env === "production") {
  webpackConf = webpackProdConfig
  webpackConf.plugins = webpackConf.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      },
      _config: config
    })
  )
} else {
  webpackConf = webpackDevConfig
  webpackConf.plugins = webpackConf.plugins.concat(
    new webpack.DefinePlugin({
      _config: config
    })
  )
}

// create a single instance of the compiler to allow caching
const webpackCompiler = webpack(webpackConf)

const zip = () => {
  return gulp
    .src("dist/**")
    .pipe(ziptool("theme.zip"))
    .pipe(gulp.dest("tmp"))
}

const build_sass = () => {
  const plugins = [autoprefixer()]

  return gulp
    .src("./src/sass/style.scss")
    .pipe(sassVars(config, { verbose: false }))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postCss(plugins))
    .pipe(gulp.dest("./dist"))
}

const build_templates = () => {
  var plugins = [
    exp({
      delimiters: ["{{%", "%}}"],
      unescapedDelimiters: ["{{{%", "%}}}"],
      locals: config
    }),
    include({ root: "src/partials" })
  ]
  return gulp
    .src("./src/templates/*.hbs")
    .pipe(posthtml(plugins, { template: false }))
    .pipe(gulp.dest("./dist/templates"))
}

const build_js = () => {
  return new Promise((resolve, reject) => {
    webpackCompiler.run(function(err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

const watch = () => {
  gulp.watch(["./src/templates/*.hbs", "./src/partials/*.hbs"], build_templates)
  gulp.watch("./src/sass/**/*.scss", build_sass)
  gulp.watch("./src/js/**", build_js)
}

const build = gulp.parallel(build_sass, build_js, build_templates)
const packageTheme = gulp.series(build, zip)

exports.watch   = gulp.series(build, watch)
exports.build   = build
exports.package = packageTheme