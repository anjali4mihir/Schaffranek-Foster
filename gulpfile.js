var gulp = require('gulp'),
  settings = require('./settings'),
  webpack = require('webpack'),
  browserSync = require('browser-sync').create(),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass')(require('sass')),
  rgba = require('postcss-hexrgba'),
  autoprefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins'),
  colorFunctions = require('postcss-color-function');

// gulp.task('styles', function() {
//   return gulp.src(settings.themeLocation + 'assets/scss/style.scss')
//   .pipe(postcss([cssImport, mixins, cssvars, nested, rgba, colorFunctions, autoprefixer]))
//   .on('error', (error) => console.log(error.toString()))
//   .pipe(gulp.dest(settings.themeLocation));
// });

gulp.task('styles', function () {
  return (
    gulp
      .src(settings.themeLocation + 'assets/sass/style.scss')
      //.pipe(plumber({ errorHandler: onError }))
      //.pipe(concat('layout.scss'))
      .pipe(
        sass({
          outputStyle: 'expanded', // compressed | nested | expanded
          precision: 4,
          errLogToConsole: true,
        })
      )
      //.pipe(stripCssComments())
      //.pipe(cleanCSS({ level: { 2: { removeDuplicateRules:true} } }))
      // .pipe(purgecss ({
      //     content: [folder.designHTML + '*.html']
      // }))
      //.pipe(concat('style.css'))
      .pipe(gulp.dest(settings.themeLocation + 'assets/css/'))
      .pipe(browserSync.stream())
  );
});

gulp.task('scripts', function (callback) {
  webpack(require('./webpack.config.js'), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

gulp.task('watch', function () {
  browserSync.init({
    notify: false,
    proxy: settings.urlToPreview,
    ghostMode: true,
  });
  gulp.watch('./**/*.php', function () {
    browserSync.reload();
  });
  gulp.watch(
    settings.themeLocation + 'assets/sass/**/*.scss',
    gulp.parallel('waitForStyles')
  );
  //gulp.watch(settings.themeLocation + 'assets/css/**/*.css', gulp.parallel('waitForStyles'));
  //gulp.watch(settings.themeLocation + 'assets/css/**/*.css', gulp.parallel('waitForStyles'));
  gulp.watch(
    [
      settings.themeLocation + 'js/modules/*.js',
      settings.themeLocation + 'assets/js/custom.js',
    ],
    gulp.parallel('waitForScripts')
  );
});

gulp.task(
  'waitForStyles',
  gulp.series('styles', function () {
    return gulp
      .src(settings.themeLocation + 'style.css')
      .pipe(browserSync.stream());
  })
);

gulp.task(
  'waitForScripts',
  gulp.series('scripts', function (cb) {
    browserSync.reload();
    cb();
  })
);
