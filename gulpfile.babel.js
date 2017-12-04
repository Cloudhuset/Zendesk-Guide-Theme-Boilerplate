'use strict';

// Load environment config file
dotenv.config({path: env ? '.' + env + '.env' : '.local.env'});

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

const argv = yargs.argv;
const env = argv.env;

// Configoad configuration
const config = require('./config');

gulp.task('package', function() {
    runSequence([
        'build-templates',
        'zip'
    ]);
});

gulp.task('zip', function() {
    return gulp.src('dist/*')
        .pipe(zip('theme.zip'))
        .pipe(gulp.dest('tmp'));
});

gulp.task('watch', () => {
    gulp.watch('./src/templates/*.hbs', ['build-templates']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('build', ['build-sass', 'build-templates']);

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
        .pipe(posthtml(plugins))
        .pipe(gulp.dest('./dist/templates'));
});