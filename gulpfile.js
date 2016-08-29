var gulp          = require('gulp'),
    // Process and compile scss/css files
    sass          = require('gulp-sass'),
    // Optimise css
    nano          = require('gulp-cssnano'),
    // Join js files into one
    concat        = require('gulp-concat'),
    // Minify js
    uglify        = require('gulp-uglify'),
    // Minify HTML
    htmlmin    = require('gulp-htmlmin'),
    // Report file sizes
    size          = require('gulp-size');

// Locations
var styleSrc      = 'css/basekit.scss',
  	styleDest     = 'css',
	  styleWatch    = 'css/**/*.scss',

  	htmlSrc       = './html/*.html',
  	htmlDest      = './',
  	htmlWatch     = './html/*.html',

  	scriptSrc     = 'js/*.js',
  	scriptDest    = 'js/min',
  	scriptWatch   = 'js/*.js',
    scriptConcat  = 'basekit.js';

// Compile Sass with autoprefixer, I've removed sourcemaps
gulp.task('scss', function() {
  gulp.src(styleSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({autoprefixer: {
      add: true,
      remove: false,
      browsers: [
        '> 0.5%',
        'last 2 versions',
        'ie >= 9'
      ]
    }}))
    .pipe(gulp.dest(styleDest))
    .pipe(size({ showFiles: true }))
    .pipe(size({ gzip: true, showFiles: true }));
});
// Minify and concat the js files for use
gulp.task('js', function() {
  gulp.src(scriptSrc)
    .pipe(concat(scriptConcat))
    .pipe(uglify())
    .pipe(gulp.dest(scriptDest))
    .pipe(size({ gzip: true, showFiles: true }));
});

// Minify HTML source and rename the index-dev file
gulp.task('html', function() {
  gulp.src(htmlSrc)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      collapseBooleanAttributes: true,
      quoteCharacter: '\'',
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest(htmlDest));
});

// Only watch Sass and JS files
gulp.task('watch', function() {
  gulp.watch(styleWatch, ['scss']);
  gulp.watch(scriptWatch, ['js']);
  gulp.watch(htmlWatch, ['html']);
});

gulp.task('default', ['watch']);