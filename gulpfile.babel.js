'use strict';


import posthtml from 'gulp-posthtml';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sassVars from 'gulp-sass-vars';
import exp from 'posthtml-expressions';
import include from 'posthtml-include';
import dotenv from 'dotenv';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';
import yargs from 'yargs';
import webpackConfig from './webpack.config';
import webpack from 'webpack';

// Load environment config file
const argv = yargs.argv;
const env = argv.env;
dotenv.config({path: env ? '.' + env + '.env' : '.local.env'});

// Configoad configuration
const config = require('./config');

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
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**', ['build-js-dev'])
});

gulp.task('build', ['build-sass', 'build-templates', 'build-js']);

gulp.task('build-sass', () => {
    return gulp.src('./src/sass/style.scss')
        .pipe(sassVars(config, { verbose: false }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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



var myDevConfig = Object.create(webpackConfig);
// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("build-js-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		callback();
	});
});

gulp.task("build-js", function(callback) {
	var config = Object.create(webpackConfig);
	config.plugins = config.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(config, function(err, stats) {
		callback();
	});
});