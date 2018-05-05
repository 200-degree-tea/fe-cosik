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
const deploy = require('gulp-gh-pages');
const inject = require('gulp-inject');
const webp = require('gulp-webp');

var paths = {
	src: './src/**/*',
  srcHTML: './src/*.html',
  srcSASS: './src/sass/**/*.scss',
  srcJS: './src/js/*.js',
  srcIMG: './src/img/**',

	tmp: './tmp',
  tmpHTML: './tmp/**/*.html',
  tmpCSS: './tmp/**/*.css',
  tmpCSSdest: './tmp/css',
  tmpJS: './tmp/**/*.js',
  tmpJSdest: './tmp/js',
  tmpIMG: './tmp/img',

  dist: './dist',
  distHTML: './dist/**/*.html',
  distCSS: './dist/**/*.css',
  distCSSdest: './dist/css',
  distJS: './dist/**/*.js',
  distJSdest: './dist/js',
  distIMG: './dist/img',
};


/**
 * DEVELOPMENT
 */

 /*
 * Copy HTML
 */
gulp.task('devHTML', function(){
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
});


/*
* Copy and minify images
*/
gulp.task('devIMG', function() {
  return gulp.src(paths.srcIMG)
    .pipe(plumber())
    .pipe(imagemin({ progressive: true, svgoPlugins: [{ removeViewBox: false }]}))
    .pipe(gulp.dest(paths.tmpIMG));
});


/*
* Copy, compile and minify CSS
*/
gulp.task('devCSS', function() {
  return gulp.src(paths.srcSASS)
    .pipe(plumber())
    .pipe(sass({ includePaths: path.join(__dirname, '/node_modules/normalize.scss/' )})
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: 'last 2 versions' })]))
    .pipe(cleanCSS({ compatibility: 'ie10' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.tmpCSSdest))
    .pipe(browserSync.stream());
});


/*
* Copy and minify JS
*/
gulp.task('devJS', function() {
  return gulp.src([
      'node_modules/picturefill/dist/picturefill.js',
      'node_modules/mustache/mustache.js',
      './src/js/mobile-menu.js',
      './src/js/google-map.js',
      './src/js/counter.js',
      './src/js/date-counter.js',
      './src/js/people-counter.js',
      './src/js/photo-selector.js',
      './src/js/send-form.js',
      './src/js/main.js'
    ]).pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.tmpJSdest))
    .pipe(browserSync.stream());
});


/*
* Creates development copy
*/
gulp.task('devCopy',['devHTML', 'devIMG', 'devCSS', 'devJS']);


/*
* Injects CSS and JS paths into HTML
*/
gulp.task('devInject', ['devCopy'], function(){
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);

  return gulp.src(paths.tmpHTML)
  .pipe(inject(css, {relative: true}))
  .pipe(inject(js, {relative: true}))
  .pipe(gulp.dest(paths.tmp));
});


/*
*  Sets local development server
*/
gulp.task('devServer', ['devInject'], function() {
    browserSync.init({
      server: paths.tmp
    });
});


/*
* Do the devInject and reloads files on change (imgs and HTML)
*/
gulp.task('reloadOnChange', ['devInject'], function(){
  browserSync.reload();
})


/*
* listens for the file change in the SRC Location and
* Reloads local server
*/
gulp.task('watch', ['devServer'], function(){
  gulp.watch(paths.srcSASS, ['devCSS']);
  gulp.watch(paths.srcJS, ['devJS']);
  gulp.watch(paths.srcHTML, ['reloadOnChange']);
  gulp.watch(paths.srcIMG, ['reloadOnChange']);
});


/*
* Conver images to WEBP
*/
gulp.task('imgWEBP', function(){
  return gulp.src('./src/img/**')
  .pipe(plumber())
  .pipe(webp())
  .pipe(gulp.dest('./src/img'));
});
/**
 * DEVELOPMENT ENDS
 */



 /*
 * PRODUCTION
 */

 /*
 * Copy HTML
 */
gulp.task('distHTML', function(){
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.dist));
});


/*
* Copy and minify images
*/
gulp.task('distIMG', function() {
  return gulp.src(paths.srcIMG)
    .pipe(plumber())
    .pipe(imagemin({ progressive: true, svgoPlugins: [{ removeViewBox: false }]}))
    .pipe(gulp.dest(paths.distIMG));
});


/*
* Copy, compile and minify CSS
*/
gulp.task('distCSS', function() {
  return gulp.src(paths.srcSASS)
    .pipe(plumber())
    .pipe(sass({ includePaths: path.join(__dirname, '/node_modules/normalize.scss/' )})
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: 'last 2 versions' })]))
    .pipe(cleanCSS({ compatibility: 'ie10' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.distCSSdest));
});


/*
* Copy and minify JS
*/
gulp.task('distJS', function() {
  return gulp.src([
      'node_modules/picturefill/dist/picturefill.js',
      'node_modules/mustache/mustache.js',
      './src/js/mobile-menu.js',
      './src/js/google-map.js',
      './src/js/counter.js',
      './src/js/date-counter.js',
      './src/js/people-counter.js',
      './src/js/photo-selector.js',
      './src/js/send-form.js',
      './src/js/main.js'
    ]).pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.distJSdest));
});


/*
* Create distribution copy
*/
gulp.task('distCopy',['distHTML', 'distIMG', 'distCSS', 'distJS']);


/*
* Injects CSS and JS paths into HTML
*/
gulp.task('distInject', ['distCopy'], function(){
  var css = gulp.src(paths.distCSS);
  var js = gulp.src(paths.distJS);

  return gulp.src(paths.distHTML)
  .pipe(inject(css, {relative: true}))
  .pipe(inject(js, {relative: true}))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('buildDist', ['distInject']);
