var gulp            = require('gulp'),
    // Sass for writing and pre-processing CSS
    sass            = require('gulp-sass'),
    // Nano for optimising and post-processing CSS
    nano            = require('gulp-cssnano'),
    // Join JS file into a single file
    concat          = require('gulp-concat'),
    // Minify that single JS file
    uglify          = require('gulp-uglify'),
    // Minify and clean up HTML files
    htmlmin         = require('gulp-htmlmin'),
    // Data storage for Twig templates
    data            = require('gulp-data'),
    // Templating
    twig            = require('gulp-twig'),
    // Report file sizes in the CLI
    size            = require('gulp-size'),
    // Stops stream from ending on error
    plumber         = require('gulp-plumber'),
    // Send noficitations to the system and CLI
    notify         = require('gulp-notify');

///
/// Setup an error notification for gulp-plumber to handle
///
var hasError = notify.onError({
  title: 'Error',
  message: '<%= error.message %>',
  sound: "Basso"
});

///
/// Compile Sass (with Nano and Autoprefixer)
///
gulp.task('scss', function() {
  gulp.src('css/basekit.scss')
    .pipe(plumber({errorHandler: hasError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({
      // http://cssnano.co/optimisations/minifySelectors/
      // This was interfering with the global selector so I've disabled it
      minifySelectors: false,
      // Enable adding prefixes
      autoprefixer: {
        add: true,
        // Browser support level
        // Must be over 0.5% usage, going back 2 versions, but IE is from 9 to 11
        browsers: [ '> 0.5%', 'last 2 versions', 'ie >= 9' ]
      }
    }))
    //
    .pipe(gulp.dest('css'))
    // Show file size before gzip
    .pipe(size({ showFiles: true }))
    // Show file size after gzip
    .pipe(size({ gzip: true, showFiles: true }));
});

///
/// Minify and combine javascript files for production, unless they start with an _
/// gulp.src('js/[^_]*.js')
///
gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(plumber({errorHandler: hasError}))
    // Combine all (none _) js files into this file
    .pipe(concat('basekit.js'))
    // Minify the file
    .pipe(uglify())
    // Output it here
    .pipe(gulp.dest('js/min'))
    // Report the gzipped file size
    .pipe(size({
      gzip: true,
      showFiles: true
    })
  );
});

///
/// Minify, clean and output HTML files
/// NOTE: I'm likely to deprecate this soon in favour of using Twig
///
// gulp.task('html', function() {
//   gulp.src('./html/*.html')
//     .pipe(plumber({errorHandler: hasError}))
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//       removeComments: true,
//       removeAttributeQuotes: true,
//       // removeRedundantAttributes: true,
//       removeEmptyAttributes: true,
//       removeScriptTypeAttributes: true,
//       removeStyleLinkTypeAttributes: true,
//       collapseBooleanAttributes: true,
//       quoteCharacter: '\'',
//       minifyJS: true,
//       minifyCSS: true
//     }))
//     .pipe(gulp.dest('./'))
//     .pipe(notify({
//       title: 'Created',
//       message: '<%= file.relative %>'
//     }));
// });

///
/// Compile Twig templates to an HTML frontend
/// NOTE: At the time of writing March 2017 we use Craft CMS. Writing frontend templates in Twig makes sense since Craft uses twig, these files are also output as HTML for demonstration and testing.
///
gulp.task('twig', function() {
  // De-caching so that the data.json file can be watched correctly
  // See this https://github.com/colynb/gulp-data/issues/17
  function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
  }

  // run the Twig template parser on .twig files that don't start with an _
  return gulp.src('./templates/**/[^_]*.twig')
  .pipe(plumber({errorHandler: hasError}))
  // Uncached data for populating Twig files
  .pipe( data(function(file){ return requireUncached('./templates/data.json'); }))
  // Let gulp-twig know where the base template directory is
  .pipe(twig({ base: 'templates' }))
  // Minify the files for development use
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
  // Return default behaviour
  .pipe(plumber.stop())
  // Output minified file
  .pipe(gulp.dest('demo'))
});

// Combine various functions into watch
gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', { interval: 500 }, ['scss']);
  // gulp.watch('js/*.js', ['js']);
  gulp.watch(['templates/**/*.twig', 'templates/**/*.json'], { interval: 500 }, ['twig']);
});

gulp.task('default', ['watch']);