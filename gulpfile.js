'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const path = require('path');

gulp.task("sass", function() {
  return gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: path.join(__dirname, '/node_modules/normalize.scss/')
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: 'last 2 versions'
      })
    ]))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', ['sass', 'browserSync'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
});
