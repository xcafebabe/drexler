var fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./gulp.config-sample.json')),
    PATH = config.path,
    sequence = require('run-sequence'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    templateCache = require('gulp-angular-templatecache'),
    exec = require('child_process').exec,
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    ngAnnotate = require('gulp-ng-annotate'),
    karma = require('karma').Server,
    browserSync = require('browser-sync').create();

// injects links to index html

gulp.task('inject', function () {
  var script = config.scripts.src,
      local = script.concat(config.css.src),
      vendor =  mainBowerFiles(),
      paths = vendor.concat(local);

  return gulp.src(config.index.src)
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: PATH.dest}))
    .pipe(gulp.dest(PATH.src))
});

// converts sass to css
gulp.task('sass', function(){
  return gulp.src(config.scss.src)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(config.scss.dest))
});

// minify images
gulp.task('images', function(){
  return gulp.src(config.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.dest))
});

// gulp jshint
gulp.task('lint', function() {
  return gulp.src(config.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Karma test
gulp.task('karma-test', function(done) {
  karma.start({
    configFile: __dirname + config.test.src,
    singleRun: true
  }, function() {
    done();
  });
});

// converts angular templates to js cache
gulp.task('template', function () {
  return gulp.src(config.views.src)
    .pipe(templateCache({
      module: "templates",
      standalone: "true"
    }))
    .pipe(gulp.dest(config.views.dest));
});

// runs ionic serve
gulp.task('start-ionic-server', function(){
  exec('ionic serve', function (err, stdout, stderr) {});
});

// build files from src to www
gulp.task('ionic-build', function(){
  var script = config.scripts.src,
    local = script.concat(config.css.src),
    vendor =  mainBowerFiles(),
    paths = vendor.concat(local);

  return gulp.src(config.index.src)
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: PATH.dest}))
    .pipe(gulp.dest(PATH.src))
    .pipe(useref({ searchPath: ['.', PATH.src] }))
    .pipe(gulpIf('*.js', ngAnnotate()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(config.dist));
});

// starts a server for src
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: [PATH.dest],
      routes: {
        "/vendors": "vendors"
      }
    },
  })
});

// serve all the required files for src
gulp.task('serve', function(){
  sequence('browserSync', 'template', 'sass', 'inject');
  gulp.watch(config.views.src, browserSync.reload);
  gulp.watch(config.scripts.src, browserSync.reload);
  gulp.watch(config.css.src, browserSync.reload);

});

// build and serve files in www
gulp.task('ionic-serve', ['lint', 'images', 'sass', 'ionic-build', 'start-ionic-server']);

