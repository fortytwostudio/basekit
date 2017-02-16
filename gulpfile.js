var gulp            = require('gulp'),
    // Sass for writing and pre-processing the CSS
    sass            = require('gulp-sass'),
    // Nano for optimising and post-processing the CSS
    nano            = require('gulp-cssnano'),
    // Join JS into one file
    concat          = require('gulp-concat'),
    // Minify the one JS file
    uglify          = require('gulp-uglify'),
    // Minify and clean up HTML files
    htmlmin         = require('gulp-htmlmin'),
    // Data storage for Nunjucks, and anything else
    data            = require('gulp-data'),
    // HTML static templating
    twig            = require('gulp-twig'),
    // Report file sizes in the CLI
    size            = require('gulp-size'),
    // Fancy documentation
    sassdoc         = require('sassdoc');

// Compile Sass (with Autoprefixer)
gulp.task('scss', function() {
  gulp.src('css/basekit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({autoprefixer: {
      // Add prefixes
      add: true,
      // Browser support level
      browsers: [
        '> 0.5%',
        'last 2 versions',
        'ie >= 9'
      ]
    }}))
    .pipe(gulp.dest('css'))
    // Show file size before gzip
    .pipe(size({ showFiles: true }))
    // Show file size after gzip
    .pipe(size({ gzip: true, showFiles: true }));
});

// Minify and Concat JS files for production
gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(concat('basekit.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/min'))
    .pipe(size({ gzip: true, showFiles: true }));
});

// Minify and clean HTML
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

// Compile Twig templates to HTML
gulp.task('twig', function() {
  // run the Twig template parser on all .html files in the "src" directory
  return gulp.src(['templates/dev/**/*.twig', '!templates/dev/layouts/**/*.twig', '!templates/dev/includes/**/*.twig'])
  // Data for populating Nunjucks files
  .pipe(data(function() { return require('./templates/data.json') }))
  .pipe(twig())
  // output the rendered HTML files to the "dist" directory —— disabled for now as we don't need non-compressed html files
  // .pipe(gulp.dest('templates/dist'))
  // Minify the files for development usage
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
  // Output minified files —— add /_min to the end if you enable uncompressed html output above
  .pipe(gulp.dest('templates/html'));
});


gulp.task('sassdoc', function () {
  return gulp.src(['css/**/*.scss', '!css/core/third-party/**/*.scss'])
  .pipe(sassdoc({
    dest: 'docs',
    verbose: true,
  }));
});

// Combine various functions into watch
gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', ['scss']);
  // gulp.watch('html/*.html', ['html']);
  gulp.watch('js/*.js', ['js']);
  // gulp.watch('./templates/src/**/*', ['nunjucks']);
});

gulp.task('default', ['watch']);