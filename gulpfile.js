var gulp = require('gulp'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    templateCache = require('gulp-angular-templatecache'),
    exec = require('child_process').exec,
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

gulp.task('sass', function(){
  return gulp.src('./src/client/content/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('./src/client/css'))
});

gulp.task('template', function () {
  return gulp.src('./src/client/app/**/*html')
    .pipe(templateCache({
      module: "templates",
      standalone: "true"
    }))
    .pipe(gulp.dest('./src/client/app/'));
});

gulp.task('start-ionic-server', function(){
  exec('ionic serve', function (err, stdout, stderr) {});
});

gulp.task('ionic-build', function(){
  var local = ['./src/client/app/templates.js', './src/client/app/app.js', './src/client/css/**/*.css', './src/client/app/**/*.js'],
      vendor =  mainBowerFiles(),
      paths = vendor.concat(local);

  return gulp.src('src/client/index.html')
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: 'src/client'}))
    .pipe(gulp.dest('./src/client/'))
    .pipe(useref({ searchPath: ['.', './src/client'] }))
    .pipe(gulpIf('*.js', uglify({mangle: false})))
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

gulp.task('serve', ['browserSync', 'sass', 'inject'], function(){

  gulp.watch('src/client/**/*.html', browserSync.reload);
  gulp.watch('src/client/app/**/*.js', browserSync.reload);
  gulp.watch('src/client/css/**/*.css', browserSync.reload);

});

gulp.task('serve-ionic', ['sass', 'ionic-build', 'start-ionic-server']);

