// Set the path to compile assets to or leave blank to compile to same folder
// var publicPath = '../public/';
var publicPath = 'public/';

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
    // Data storage for Twig templates and Sass
    data            = require('gulp-data'),
    // Templating
    twig            = require('gulp-twig'),
    // Report file sizes in the CLI
    size            = require('gulp-size'),
    // Stops stream from ending on error
    plumber         = require('gulp-plumber'),
    // Send noficitations to the system and CLI
    notify          = require('gulp-notify');

// De-caching so that the data.json file can be watched correctly
// See this https://github.com/colynb/gulp-data/issues/17
function requireUncached($module) {
  delete require.cache[require.resolve($module)];
  return require($module);
}


// Compile Sass (with Nano and Autoprefixer)
gulp.task('scss', function() {
  gulp.src('css/*.scss')
    .pipe(data(function(file){ return requireUncached('./data.json'); }))
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({
      minifySelectors: false, // This was interfering with the global selector so I've disabled it: http://cssnano.co/optimisations/minifySelectors/
      autoprefixer: {
        add: true, // Enable adding browser prefixes
        // Browser support: must be 0.5% usage in UK, going back 3 versions, but make sure IE is not dropped off
        browsers: [ '> 0.5% in GB', 'last 3 versions', 'ie >= 9' ]
      }
    }))
    .pipe(gulp.dest(publicPath + 'css'))
    .pipe(size({ showFiles: true })) // Show file size before gzip
    .pipe(size({ gzip: true, showFiles: true })); // Show file size after gzip
});


// Minify and combine javascript files for production, unless they start with an _
gulp.task('js', function() {
  gulp.src('js/[^_]*.js')
    .pipe(concat('basekit.js')) // Combine all (none _) js files into this file
    .pipe(uglify()) // Minify the file
    .pipe(gulp.dest(publicPath + 'js/min')) // Output it here
    .pipe(size({ gzip: true, showFiles: true }) // Show file size after gzip
  );
});


// Compile Twig templates to an static frontend for demonstration.
// This is quite long-winded and not ideal, but does the job for now
gulp.task('twig', function() {
  // run the Twig template parser on .twig files that don't start with an _
  return gulp.src('./templates/**/[^_]*.twig')
  // Uncached data for populating Twig files
  .pipe(data(function(file){ return requireUncached('./data.json'); }))
  // Let gulp-twig know where the base template directory is
  .pipe(twig({
    base: 'templates',
    cache: false
  }))
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
  .pipe(gulp.dest(publicPath + 'demo'))
});



gulp.task('reference', function() {
  return gulp.src('./reference/**/[^_]*.twig')
  .pipe(data(function(file){ return requireUncached('./reference/data.json'); }))
  .pipe(twig({
    base: 'reference',
    cache: false
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(publicPath + 'demo/reference'))
});



gulp.task('refbuild', function() {
  gulp.watch(['reference/**/*.twig', 'reference/**/*.json'], { interval: 500 }, ['reference']);
});

gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', { interval: 500 }, ['scss']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch(['templates/**/*.twig', 'templates/**/*.json'], { interval: 500 }, ['twig']);
});

gulp.task('ref', ['refbuild']);
gulp.task('default', ['watch']);
