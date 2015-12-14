var gulp          = require('gulp'),
<<<<<<< HEAD
    sass          = require('gulp-sass'),
    nano          = require('gulp-cssnano'),
    deploy        = require('gulp-gh-pages'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    minifyHTML    = require('gulp-minify-html'),
    minifyInline  = require('gulp-minify-inline'),
    size          = require('gulp-size');

// Compile Sass with autoprefixer, I've removed sourcemaps
gulp.task('scss', function() {
  gulp.src('css/basekit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({autoprefixer: {browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}}))
    .pipe(gulp.dest('css'))
=======
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
    minifyHTML    = require('gulp-minify-html'),
    // Minify css and js within html files
    minifyInline  = require('gulp-minify-inline'),
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
    .pipe(nano({autoprefixer: {browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}}))
    .pipe(gulp.dest(styleDest))
>>>>>>> master
    .pipe(size({ gzip: true, showFiles: true }));
});

// Easy deploy to the gh-pages branch
gulp.task('deploy', function () {
  return gulp.src('**/*')
    .pipe(deploy());
});

// Minify and concat the js files for use
gulp.task('js', function() {
<<<<<<< HEAD
  gulp.src('js/*.js')
    .pipe(concat('basekit.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/min'))
    .pipe(size({ gzip: true, showFiles: true }));
});

// Optimise images
gulp.task('img', function () {
  return gulp.src('imgs/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      multipass: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('imgs'));
});

// Minify HTML source and rename the index-dev file
gulp.task('html', function() {
  gulp.src('./html/*.html')
    .pipe(minifyHTML({cdata: true}))
    .pipe(minifyInline())
    .pipe(gulp.dest('./'));
=======
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
    .pipe(minifyHTML({cdata: true}))
    .pipe(minifyInline())
    .pipe(gulp.dest(htmlDest));
>>>>>>> master
});

// Only watch Sass and JS files
gulp.task('watch', function() {
<<<<<<< HEAD
  gulp.watch('css/**/*.scss', ['scss']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('./html/*.html', ['html']);
=======
  gulp.watch(styleWatch, ['scss']);
  gulp.watch(scriptWatch, ['js']);
  gulp.watch(htmlWatch, ['html']);
>>>>>>> master
});

gulp.task('default', ['watch']);