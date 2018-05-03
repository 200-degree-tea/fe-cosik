'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const path = require('path');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Test Sass compliler
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

// Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Background Task runner
gulp.task('watch', ['sass', 'browserSync'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
});


//Release build scripts
// Copy html
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('./build'));
});

// Optimise images
gulp.task('images', function() {
  return gulp.src('img/**')
    .pipe(plumber())
    .pipe(gulp.dest('build/img'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('build/img'));
});

// compress and build CSS
gulp.task("css-build", function() {
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
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/css'))
});

// compress and build JS
gulp.task('js-build', function() {
  return gulp.src([
      'node_modules/picturefill/dist/picturefill.js',
      'node_modules/mustache/mustache.js',
      'js/mobile-menu.js',
      'js/google-map.js',
      'js/counter.js',
      'js/date-counter.js',
      'js/people-counter.js',
      'js/photo-selector.js',
      'js/send-form.js',
      'js/main.js'
    ]).pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('release', ['css-build', 'js-build', 'images', 'html'], function(){
});
