/**
 * standard gulp build file
 */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');

var paths = {
    src: 'src/*/*.js',
    tests: 'test/*/*.js',
    bin: 'bin/*.js'
};

gulp.task('test', function () {
    gulp.src([ paths.src, paths.tests, paths.bin ] )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
      
    gulp.src( paths.tests )
        .pipe( mocha({ reporter:'spec' }) );
});

/**
gulp.task('build', function () {
    gulp.src( [ paths.src ] )
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
*/

gulp.task('watch', [ 'test' ], function () {
    gulp.watch([ paths.src, paths.tests ], [ 'test' ]);
});

gulp.task('default', ['test', 'watch']);
