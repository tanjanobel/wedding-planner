const plugins = require('gulp-load-plugins');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const stylelint = require('gulp-stylelint');

// Load all Gulp plugins into one variable
const $ = plugins();

gulp.task('scss', () => {
  return gulp.src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./src'],
      outputStyle: 'compressed',
      precision: 6,
    }).on('error', sass.logError))
    .pipe(autoprefixer({ grid: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css/'));
});

function lint(failAfterError = false) {
  return gulp.src([
    'src/**/*.scss',
  ]).pipe(stylelint({
    failAfterError,
    reporters: [{
      formatter: 'string',
      console: true,
    }],
  }));
}

function icons() {
  config = {
    mode: {
      symbol: {
        prefix: '#icon-',
        sprite: 'icon-sprite',
        example: false
      }
    }
  };
  return gulp.src('src/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('public/assets/icons'));
}

gulp.task('scss:lint', () => lint());
gulp.task('scss:lint:fail', () => lint(true));

gulp.task('scss:watch', gulp.series('scss', 'scss:lint', () => {
  gulp.watch([
    'src/scss/**/*.scss',
    'src/icons/*.*', gulp.series(icons)
  ], { interval: 500 }, gulp.series('scss', 'scss:lint'));
}));
