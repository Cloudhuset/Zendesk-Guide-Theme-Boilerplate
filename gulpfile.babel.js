'use strict';


import posthtml from 'gulp-posthtml';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sassVars from 'gulp-sass-vars';
import exp from 'posthtml-expressions';
import include from 'posthtml-include';
import postCss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';
import yargs from 'yargs';
import webpackDevConfig from './webpack.dev';
import webpackProdConfig from './webpack.prod';
import webpack from 'webpack';

// Load environment config file
const argv = yargs.argv;
const env = argv.env;
dotenv.config({path: env ? '.' + env + '.env' : '.local.env'});

// Configoad configuration
const config = require('./config');

// Webpack configuration
var webpackConf = null;
if (env === 'production') {
    webpackConf = webpackProdConfig; // Object.create(webpackProdConfig);
    webpackConf.plugins = webpackConf.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(env)
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

gulp.task('package', function(cb) {
    runSequence(
        'build',
        'zip',
        cb
    );
});

gulp.task('zip', function() {
    return gulp.src('dist/**')
        .pipe(zip('theme.zip'))
        .pipe(gulp.dest('tmp'));
});

gulp.task('watch', () => {
    gulp.watch('./src/templates/*.hbs', ['build-templates']);
    gulp.watch('./src/sass/**/*.scss', ['build-sass']);
    gulp.watch('./src/js/**', ['build-js'])
});

gulp.task('build-sass', () => {
    const plugins = [
        autoprefixer(),
    ];

    return gulp.src('./src/sass/style.scss')
        .pipe(sassVars(config, { verbose: false }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postCss(plugins))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-templates', () => {
    var plugins = [
        exp({
            delimiters: ['{{%', '%}}'],
            unescapedDelimiters: ['{{{%', '%}}}'],
            locals: config
        }),
        include({root: 'src/partials'})
    ];

    return gulp.src('./src/templates/*.hbs')
        .pipe(posthtml(plugins, {template: false}))
        .pipe(gulp.dest('./dist/templates'));
});

gulp.task("build-js", function(callback) {
	// run webpack
	webpackCompiler.run(function(err, stats) {
        if (err) {
            console.err(err);
        }
		callback();
	});
});

gulp.task('build', gulp.parallel('build-sass', 'build-templates', 'build-js'));