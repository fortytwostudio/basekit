var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    nano        = require('gulp-cssnano'),
    deploy      = require('gulp-gh-pages');

gulp.task('scss', function() {
  gulp.src('css/basekit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({autoprefixer: {browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}}))
    .pipe(gulp.dest('css'));
});

gulp.task('deploy', function () {
  return gulp.src('**/*')
    .pipe(deploy());
});

gulp.task('watch', ['scss'], function() {
  gulp.watch('css/**/*.scss', ['scss']);
});

gulp.task('default', ['watch']);