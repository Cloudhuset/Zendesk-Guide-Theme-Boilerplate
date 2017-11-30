'use strict';

import posthtml from 'gulp-posthtml';
import gulp from 'gulp';
import exp from 'posthtml-expressions';
import include from 'posthtml-include';
import dotenv from 'dotenv';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';
import yargs from 'yargs';

const argv = yargs.argv;
const env = argv.env;

// Config
import config from './config';

gulp.task('package', function() {
    dotenv.config({path: '.production.env'});

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
    dotenv.config({path: env ? '.' + env + '.env' : '.local.env'});

    gulp.watch('./src/templates/*.hbs', ['build-templates']);
});

gulp.task('build-templates', () => {
    dotenv.config({path: env ? '.' + env + '.env' : '.local.env'});
    let conf = config();

    var plugins = [
        exp({
            delimiters: ['{{%', '%}}'],
            unescapedDelimiters: ['{{{%', '%}}}'],
            locals: {
                ...conf.variables
            }
        }),
        include({root: 'src/partials'})
    ];

    return gulp.src('./src/templates/*.hbs')
        .pipe(posthtml(plugins))
        .pipe(gulp.dest('./dist/templates'));
});