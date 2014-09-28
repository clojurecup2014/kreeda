var gulp = require('gulp'),
    less = require('gulp-less'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('browserify', function() {
  gulp.src('client/js/main.js')
  .pipe(browserify({transform: 'reactify'}))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('resources/public/js'))
  .pipe(notify('Browserification Completed'));
});

gulp.task('build_sdk', function() {
  gulp.src('client/js/sdk.js')
  .pipe(browserify({transform: 'reactify'}))
  .pipe(concat('sdk.js'))
  .pipe(gulp.dest('resources/public/js'))
  .pipe(notify('Built SDK'));
});

gulp.task('less', function () {
  gulp.src('client/less/styles.less')
  .pipe(less())
  .pipe(gulp.dest('resources/public/css'))
  .pipe(notify('Less files converted'));
});

gulp.task('default', ['browserify', 'build_sdk', 'less']);

gulp.task('watch', function() {
  gulp.watch('client/**/*', ['default']);
});
