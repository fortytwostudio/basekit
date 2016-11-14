var gulp            = require('gulp'),
    // Process and compile scss/css files
    sass            = require('gulp-sass'),
    // Optimise css
    nano            = require('gulp-cssnano'),
    // Join js files into one
    concat          = require('gulp-concat'),
    // Minify js
    uglify          = require('gulp-uglify'),
    // Minify HTML
    htmlmin         = require('gulp-htmlmin'),
    // Data storage for nunjucks
    data            = require('gulp-data'),
    // HTML static templating
    nunjucksRender  = require('gulp-nunjucks-render'),
    // Report file sizes
    size            = require('gulp-size');

// Compile Sass with autoprefixer, I've removed sourcemaps
gulp.task('scss', function() {
  gulp.src('css/basekit.scss')
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
    .pipe(gulp.dest('css'))
    .pipe(size({ showFiles: true }))
    .pipe(size({ gzip: true, showFiles: true }));
});
// Minify and concat the js files for use
gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(concat('basekit.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/min'))
    .pipe(size({ gzip: true, showFiles: true }));
});

// Compile Nunjucks static templates
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('templates/src/pages/**/*.+(html|njk|nunjucks)')
  // Pull in data for Nunjucks
  .pipe(data(function() {
    return require('./templates/data.json')
  }))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
    path: ['templates/src/partials']
  }))
  // output files in app folder
  .pipe(gulp.dest('templates/dist'))
});

// Minify HTML source and rename the index-dev file
gulp.task('html', function() {
  gulp.src('./html/*.html')
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
    .pipe(gulp.dest('./'));
});

// Only watch Sass and JS files
gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', ['scss']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('./html/*.html', ['html']);
});

gulp.task('default', ['watch']);