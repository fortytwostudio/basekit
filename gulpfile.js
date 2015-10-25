var gulp    = require('gulp');
var sass    = require('gulp-sass');
var nano    = require('gulp-cssnano');
var sourcemaps  = require('gulp-sourcemaps');

gulp.task('scss', function() {
  gulp.src('css/basekit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(nano({autoprefixer: {browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', ['scss'], function() {
  gulp.watch('css/**/*.scss', ['scss']);
});

gulp.task('default', ['watch']);