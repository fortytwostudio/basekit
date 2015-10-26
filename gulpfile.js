var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    nano        = require('gulp-cssnano'),
    deploy      = require('gulp-gh-pages'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');

// Compile Sass with autoprefixer, I've removed sourcemaps
gulp.task('scss', function() {
  gulp.src('css/basekit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({autoprefixer: {browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}}))
    .pipe(gulp.dest('css'));
});

// Easy deploy to gh-pages branch
gulp.task('deploy', function () {
  return gulp.src('**/*')
    .pipe(deploy());
});

// Minify and concat the js files for use
gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(concat('basekit.js'))
    .pipe(gulp.dest('js/min'));
});

gulp.task('watch', ['scss', 'js'], function() {
  gulp.watch('css/**/*.scss', ['scss']);
});

gulp.task('default', ['watch']);