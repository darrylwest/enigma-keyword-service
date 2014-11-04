/**
 * standard gulp build file
 */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    mochaReporter = process.env.reporter || 'nyan'; // dot, spec, progress, tap

var paths = {
    src: 'app/*/*.js',
    tests: 'test/*/*.js',
    bin: 'bin/*.js'
};

var errorHandler = function(err) {
    gutil.beep();
    console.log( err );
};

gulp.task('jshint', function() {
    gulp.src([ paths.src, paths.tests, paths.bin ] )
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('mocha', function() {
    gulp.src( paths.tests )
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( mocha({ reporter:mochaReporter }) );
});

gulp.task('test', [ 'jshint', 'mocha' ]);

gulp.task('watch', [ 'test' ], function() {
    gulp.watch( [ paths.src, paths.tests, paths.bin ], [ 'jshint', 'mocha' ] );
});

gulp.task('default', [ 'watch' ]);

