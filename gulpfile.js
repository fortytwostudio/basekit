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
    .pipe(nano({
      // http://cssnano.co/optimisations/minifySelectors/
      minifySelectors: false,

      autoprefixer: {
        // Add prefixes
        add: true,
        // Browser support level
        browsers: [
          '> 0.5%',
          'last 2 versions',
          'ie >= 9'
        ]
      }
    }))
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
      // removeRedundantAttributes: true,
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

  // De-caching for Data files
  function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
  }

  // run the Twig template parser on .twig files that don't start with an _
  return gulp.src('./templates/**/[^_]*.twig')
  // Uncached data for populating Twig files
  .pipe( data(function(file){ return requireUncached('./templates/data.json'); }))
  .pipe(twig({
    // Let gulp-twig know where the base template directory is
    base: 'templates'
  }))
  // Minify the files for development usage
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    collapseBooleanAttributes: true,
    quoteCharacter: '\'',
    minifyJS: true,
    minifyCSS: true
  }))
  // Output minified file
  .pipe(gulp.dest('demo'));
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
  gulp.watch('html/*.html', ['html']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch(['templates/**/*.twig', 'templates/**/*.json'], ['twig']);
});

gulp.task('default', ['watch']);