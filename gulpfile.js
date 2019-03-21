// package vars
const pkg   = require("./package.json");
const gulp  = require('gulp');
const nano  = require('gulp-cssnano');
const sass  = require('gulp-sass');

// SASS/CSS
// ————————————————————————————————————————————————————————————————————————————————————
// Compile Sass (with Nano and Autoprefixer)
gulp.task("sass", () => {
  return gulp.src("./src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(nano({
      minifySelectors: false, // This was interfering with the global selector so I've disabled it: http://cssnano.co/optimisations/minifySelectors/
      autoprefixer: {
        add: true, // Enable adding browser prefixes
        browsers: [ '> 0.5% in GB', 'last 3 versions', 'not ie 9' ] // Browser support: must be 0.5% usage in UK, going back 3 versions, but make sure IE is not dropped off
        // http://browserl.ist/?q=%3E+0.5%25+in+GB%2C+last+3+major+versions%2C+not+ie+9&chrome_dont_add_custom_search_engines_srsly=
      }
    }))
    .pipe(gulp.dest("./public/assets/css/")
  );
});

gulp.task("default", () => {
  gulp.watch("./src/sass/**/*.scss", gulp.series("sass"));
});
