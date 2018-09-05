const pkg   = require("./package.json");
const gulp  = require('gulp');

const data    = require('gulp-data'); // Data storage for Twig templates and Sass
const twig    = require('gulp-twig');
const sass    = require('gulp-sass');
const nano    = require('gulp-cssnano'); // Nano for optimising and post-processing CSS
const concat  = require('gulp-concat'); // Join JS file into a single file
const uglify  = require('gulp-uglify'); // Minify that single JS file
const htmlmin = require('gulp-htmlmin'); // Minify and clean up HTML files
const size    = require('gulp-size'); // Report file sizes in the CLI

// const banner = [
//     "/**",
//     " * @project        <%= pkg.name %>",
//     " * @author         <%= pkg.author %>",
//     " * @build          " + $.moment().format("llll") + " ET",
//     " * @release        " + $.gitRevSync.long() + " [" + $.gitRevSync.branch() + "]",
//     " *",
//     " */",
//     ""
// ].join("\n");

// PATHS
// ————————————————————————————————————————————————————————————————————————————————————
const sassSrcPath   = './src/sass';
const twigSrcPath   = './src/twig';
const jsSrcPath     = './src/js';

const publicPath    = './public/';
const htmlDestPath  = publicPath + 'demo';
const cssDestPath   = publicPath + 'assets/css';
const jsDestPath    = publicPath + 'assets/js';


// CACHING
// ————————————————————————————————————————————————————————————————————————————————————
// De-caching so that the data.json file can be watched correctly
// See this https://github.com/colynb/gulp-data/issues/17
function requireUncached($module) {
  delete require.cache[require.resolve($module)];
  return require($module);
}

// SASS/CSS
// ————————————————————————————————————————————————————————————————————————————————————
// Compile Sass (with Nano and Autoprefixer)
gulp.task('sass', function() {
  gulp.src(sassSrcPath + '/basekit.scss')
    .pipe(data(function(file){ return requireUncached('./data.json'); }))
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({
      minifySelectors: false, // This was interfering with the global selector so I've disabled it: http://cssnano.co/optimisations/minifySelectors/
      autoprefixer: {
        add: true, // Enable adding browser prefixes
        browsers: [ '> 0.5% in GB', 'last 3 versions', 'ie >= 9' ] // Browser support: must be 0.5% usage in UK, going back 3 versions, but make sure IE is not dropped off
      }
    }))
    .pipe(gulp.dest(cssDestPath))
    .pipe(size({ showFiles: true })) // Show file size
    .pipe(size({ gzip: true, showFiles: true })); // Show file size after gzip
});


// JAVASCRIPT
// ————————————————————————————————————————————————————————————————————————————————————
// Minify and combine javascript files for production, unless they start with an _
gulp.task('js', function() {
  gulp.src(jsSrcPath + '/[^_]*.js') // ignore underscored files
    .pipe(concat('basekit.min.js')) // Combine all (none _) js files into this file
    .pipe(uglify()) // Minify the file
    .pipe(gulp.dest(jsDestPath)) // Output it here
    .pipe(size({ showFiles: true })) // Show file size before gzip
    .pipe(size({ gzip: true, showFiles: true }) // Show file size after gzip
  );
});


// TWIG/HTML
// ————————————————————————————————————————————————————————————————————————————————————
// Compile Twig templates to an static frontend for demonstration.
// This is quite long-winded and not ideal, but does the job for now
gulp.task('twig', function() {
  return gulp.src(twigSrcPath + '/**/[^_]*.twig') // run the Twig template parser on .twig files that don't start with an _
  .pipe(data(function(file){ return requireUncached('./data.json'); })) // Uncached data for populating Twig files
  .pipe(twig({ base: twigSrcPath, cache: false })) // Let gulp-twig know where the base template directory is
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
  })) // Minify the files for development use
  .pipe(gulp.dest(htmlDestPath)) // Output minified file to public directory
});


// WRAP INTO WATCH TASK
// ————————————————————————————————————————————————————————————————————————————————————
gulp.task('watch', function() {
  // gulp.watch(sassSrcPath + '/**/*.scss', { interval: 500 }, ['sass']);
  gulp.watch(sassSrcPath + '/**/*.scss', ['sass']);
  gulp.watch(jsSrcPath + '/*.js', ['js']);
  gulp.watch([twigSrcPath + '/**/*.twig', twigSrcPath + '/**/*.json'], ['twig']);
});


// SET WATCH AS DEFAULT
// ————————————————————————————————————————————————————————————————————————————————————
gulp.task('default', ['watch']);
