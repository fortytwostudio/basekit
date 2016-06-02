var gulp          = require('gulp'),
    // Process and compile scss/css files
    sass          = require('gulp-sass'),
    // Optimise css
    nano          = require('gulp-cssnano'),
    // Join js files into one
    concat        = require('gulp-concat'),
    // Minify js
    uglify        = require('gulp-uglify'),
      // Optimise images
      // imagemin      = require('gulp-imagemin'),
      // pngquant      = require('imagemin-pngquant'),
    // Generate svg symbols file
    svgSymbols    = require('gulp-svg-symbols'),
    // Minify HTML
    htmlmin    = require('gulp-htmlmin'),
    // Deploy to gh pages
    deploy        = require('gulp-gh-pages'),
    // Report file sizes
    size          = require('gulp-size'),
    // CSS optimisation report
    parker        = require('gulp-parker');

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
    scriptConcat  = 'basekit.js',

  	imageSrc      = 'imgs/*',
  	imageDest     = 'imgs';

  	svgSrc      = 'imgs/svg/*.svg',
  	svgDest     = 'imgs/svg';


gulp.task('parker', function() {
  return gulp.src('css/basekit.css')
    .pipe(parker({
      file: 'css/style-report.md',
      title: 'CSS analysis'
    }));
});

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

// Easy deploy to the gh-pages branch
gulp.task('deploy', function () {
  return gulp.src('**/*')
    .pipe(deploy());
});

// Minify and concat the js files for use
gulp.task('js', function() {
  gulp.src(scriptSrc)
    .pipe(concat(scriptConcat))
    .pipe(uglify())
    .pipe(gulp.dest(scriptDest))
    .pipe(size({ gzip: true, showFiles: true }));
});

gulp.task('svg', function () {
  return gulp.src(svgSrc)
    .pipe(svgSymbols({
      templates: ['default-svg'],
      title: '%f'
    }))
    .pipe(gulp.dest(svgDest));
});

// Optimise images
// gulp.task('img', function () {
//   return gulp.src(imageSrc)
//     .pipe(imagemin({
//       progressive: true,
//       svgoPlugins: [{removeViewBox: false}],
//       multipass: true,
//       use: [pngquant()]
//     }))
//     .pipe(gulp.dest(imageDest));
// });

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