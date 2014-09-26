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
    scripts: 'src/*/*.js',
    tests: 'test/*/*.js'
};

gulp.task('test', function () {
    gulp.src(paths.scripts)
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
      
    gulp.src( paths.tests )
        .pipe( mocha({ reporter:'spec' }) );
});

/**
gulp.task('build', function () {
  gulp.src('src/fake-identity.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
*/

gulp.task('watch', [ 'test' ], function () {
    gulp.watch([ paths.scripts, paths.tests ], [ 'test' ]);
});

gulp.task('default', ['test', 'watch']);
