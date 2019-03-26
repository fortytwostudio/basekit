// const pkg   = require("./package.json");
const gulp      = require('gulp'),
      nano      = require('gulp-cssnano'),
      sass      = require('gulp-sass'),
      uglify    = require('gulp-uglify'),
      concat    = require('gulp-concat'),
      order     = require('gulp-order'),
      imagemin  = require('gulp-imagemin');

// CSS: the main task used for Basekit, this will compile and optimise your sass
// into the public css directory as a single file.
gulp.task("css", () => {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(nano({
      cssDeclarationSorter: {
        order: 'alphabetically'
      },
      minifySelectors: false, // This was interfering with the global selector so I've disabled it: http://cssnano.co/optimisations/minifySelectors/
      autoprefixer: {
        browsers: [ '> 0.5% in GB', 'last 3 versions', 'not ie 9' ]
        // http://browserl.ist/?q=%3E+0.5%25+in+GB%2C+last+3+major+versions%2C+not+ie+9&chrome_dont_add_custom_search_engines_srsly=
      }
    }))
    .pipe(gulp.dest("./public/assets/css/")
  );
});

// JS: Optional JS minification and file concat task, put all your third party
// scripts and JS files in the js/plugins directory so basekit.js comes last.
// Order your plugin JS files by renaming them with a number (01, 02, 03, etc)
// to have them concat into that specific order.
gulp.task("js", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(order([
        'plugins/*.js',
        'basekit.js'
      ]))
    .pipe(concat('basekit.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./public/assets/js/")
  );
});

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
  gulp.watch("./src/sass/**/*.scss", gulp.series("css"));
  gulp.watch("./src/js/**/*.js", gulp.series("js"));
  gulp.watch("./src/imgs/**/*", gulp.series("images"));
});
