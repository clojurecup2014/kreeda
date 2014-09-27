var gulp = require('gulp');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
  gulp.src('client/js/main.js')
  .pipe(browserify({transform: 'reactify'}))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('resources/js'));
});

gulp.task('less', function () {
  gulp.src('client/less/styles.less')
  .pipe(less())
  .pipe(gulp.dest('resources/css'));
});


gulp.task('default',['browserify','less']);

gulp.task('watch', function() {
  gulp.watch('client/**/*', ['default']);
});

