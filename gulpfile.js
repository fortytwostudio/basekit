// package vars
const pkg   = require("./package.json");

// gulp
const gulp  = require('gulp');

// load all plugins in "devDependencies" into the variable $
const $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

// function to uncache modules/data
function requireUncached($module) {
  delete require.cache[require.resolve($module)];
  return require($module);
}

// HEADER BANNER
// ————————————————————————————————————————————————————————————————————————————————————
// A timestamped info comment that get's added to the top of CSS and JS files.
const banner = [
    "/**",
    " * @project        <%= pkg.name %>",
    " * @author         <%= pkg.author %>",
    " * @version        <%= pkg.version %>",
    " * @build          " + $.moment().format("llll") + " ET",
    " * @release        " + $.gitRevSync.long() + " [" + $.gitRevSync.branch() + "]",
    " *",
    " */",
    ""
].join("\n");

// SASS/CSS
// ————————————————————————————————————————————————————————————————————————————————————
// Compile Sass (with Nano and Autoprefixer)
gulp.task("sass", () => {
  return gulp.src(pkg.paths.src.sass + '*.scss')
    .pipe($.data(function(file){ return requireUncached('./data.json'); }))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.cssnano({
      minifySelectors: false, // This was interfering with the global selector so I've disabled it: http://cssnano.co/optimisations/minifySelectors/
      autoprefixer: {
        add: true, // Enable adding browser prefixes
        browsers: [ '> 0.5% in GB', 'last 3 versions', 'ie >= 9' ] // Browser support: must be 0.5% usage in UK, going back 3 versions, but make sure IE is not dropped off
      }
    }))
    .pipe($.header(banner, {pkg: pkg}))

    .pipe($.gulp.dest(pkg.paths.dist.css))
    .pipe($.size({ showFiles: true })) // Show file size
    .pipe($.size({ gzip: true, showFiles: true })); // Show file size after gzip
});

// TWIG/HTML
// ————————————————————————————————————————————————————————————————————————————————————
// Compile Twig templates to an static frontend for demonstration.
// This is quite long-winded and not ideal, but does the job for now
gulp.task('twig', () => {
  return gulp.src(pkg.paths.src.twig + '**/[^_]*.twig') // run the Twig template parser on .twig files that don't start with an _
  .pipe($.data(function(file){ return requireUncached('./data.json'); })) // Uncached data for populating Twig files
  .pipe($.twig({ base: pkg.paths.src.twig, cache: false })) // Let gulp-twig know where the base template directory is
  .pipe($.htmlmin({
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
  .pipe($.gulp.dest(pkg.paths.dist.html)) // Output minified file to public directory
});

// JAVASCRIPT
// ————————————————————————————————————————————————————————————————————————————————————
// Minify and combine javascript files for production, unless they start with an _
gulp.task('js', () => {
  return gulp.src(pkg.paths.src.js + '[^_]*.js') // ignore underscored files
    .pipe($.concat(pkg.vars.jsName)) // Combine all (none _) js files into this file
    .pipe($.uglify()) // Minify the file
    .pipe($.header(banner, {pkg: pkg}))

    .pipe($.gulp.dest(pkg.paths.dist.js)) // Output it here
    .pipe($.size({ showFiles: true })) // Show file size before gzip
    .pipe($.size({ gzip: true, showFiles: true }) // Show file size after gzip
  );
});

// CLEANUP
// ————————————————————————————————————————————————————————————————————————————————————
// Remove the compiled twig destination content.
gulp.task('cleanup', () => {
    return gulp.src(pkg.paths.dist.html, {read: false})
      .pipe($.clean());
});

// WRAP INTO WATCH TASK
// ————————————————————————————————————————————————————————————————————————————————————
gulp.task("default", () => {
  gulp.watch(pkg.paths.src.sass + '**/*.scss', ['sass']);
  gulp.watch(pkg.paths.src.js + '*.js', ['js']);
  gulp.watch([pkg.paths.src.twig + '**/*.twig', pkg.paths.src.twig + '**/*.json'], ['twig']);
});

// WATCH ONLY SASS CHANGES
// ————————————————————————————————————————————————————————————————————————————————————
gulp.task('watch-sass', () => {
  gulp.watch(pkg.paths.src.sass + '**/*.scss', ['sass']);
});
