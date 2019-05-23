// const pkg   = require("./package.json");
const gulp          = require('gulp'),
      nano          = require('gulp-cssnano'),
      sass          = require('gulp-sass'),
      uglify        = require('gulp-uglify'),
      concat        = require('gulp-concat'),
      order         = require('gulp-order'),
      imagemin      = require('gulp-imagemin'),
      replace       = require('gulp-replace'),
      cleanCSS      = require('gulp-clean-css'),
      autoprefixer  = require('gulp-autoprefixer');

// This is an older task that uses the slowe CSSNano
gulp.task("css", () => {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(nano({
      cssDeclarationSorter: {
        order: 'alphabetically'
      },
      minifySelectors: false
    }))
    .pipe(autoprefixer({
      // https://browserl.ist/?q=%3E+0.5%25+in+GB%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead
      browsers: [ '> 0.5% in GB', 'last 2 versions', 'Firefox ESR' ]
    }))
    .pipe(gulp.dest("./public/assets/css/")
  );
});

// And this is the newer one that uses Clean-CSS
gulp.task("cleancss", () => {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({
      compatibility: '*',
      format: 'beautify',
      level: 2
    }))
    .pipe(autoprefixer({
      // https://browserl.ist/?q=%3E+0.5%25+in+GB%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead
      browsers: [ '> 0.5% in GB', 'last 2 versions', 'Firefox ESR' ]
    }))
    .pipe(gulp.dest("./public/assets/css/")
  );
});

// JS: Optional JS minification and file concat task, put all your third party
// scripts and JS files in the js/plugins directory so basekit.js comes last.
// Order your plugin JS files by renaming them with a number (01, 02, 03, etc)
// to have them concat into that specific order.
// gulp.task("js", () => {
//   return gulp
//     .src("./src/js/**/*.js")
//     .pipe(order([
//         'plugins/*.js',
//         'basekit.js'
//       ]))
//     .pipe(concat('basekit.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest("./public/assets/js/")
//   );
// });

// IMAGES: Optimisation of various image file types.
gulp.task("images", () => {
  return gulp
    .src("./src/imgs/**/*")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest("./public/assets/imgs", { allowEmpty: true })
  );
});

// Watch CSS, JS and Images for changes and run their related task.
gulp.task("default", () => {
  gulp.watch("./src/sass/**/*.scss", gulp.series("cleancss"));
  // gulp.watch("./src/js/**/*.js", gulp.series("js"));
  gulp.watch("./src/imgs/**/*", gulp.series("images"));
});
