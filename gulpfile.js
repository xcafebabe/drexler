var gulp = require('gulp'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync').create();

gulp.task('inject', function () {
  var local = ['./src/client/app/app.js', './src/client/css/**/*.css', './src/client/app/**/*.js'],
      vendor =  mainBowerFiles(),
      paths = vendor.concat(local);

  return gulp.src('./src/client/index.html')
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: 'src/client'}))
    .pipe(gulp.dest('./src/client/'))
    .pipe(gulp.dest('./src/client/'));
});

gulp.task('test-inject', function () {
  return gulp.src('./src/client/index.html')
    .pipe(inject(gulp.src(['./src/client/css/**/*.css', './src/client/app/**/*.js'], {read: false})))
    .pipe(gulp.dest('./src/client/'));
});

gulp.task('ionic-build', function(){
  var local = ['./src/client/app/app.js', './src/client/css/**/*.css', './src/client/app/**/*.js'],
      vendor =  mainBowerFiles(),
      paths = vendor.concat(local);

  return gulp.src('src/client/index.html')
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: 'src/client'}))
    .pipe(gulp.dest('./src/client/'))
    .pipe(useref({ searchPath: ['.', './src/client'] }))
    //.pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('www/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ['src/client'],
      routes: {
        "/vendors": "vendors"
      }
    },
  })
});

gulp.task('serve', ['browserSync', 'inject'], function(){

  gulp.watch('src/client/**/*.html', browserSync.reload);
  gulp.watch('src/client/js/**/*.js', browserSync.reload);

});

