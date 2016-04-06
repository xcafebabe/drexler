var fs = require('fs'),
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


// Getting settings.json configurations
try {
  config = JSON.parse(fs.readFileSync('./gulp.config.json')),
  PATH = config.path
}catch (e){
  console.log("\r\n ### PLEASE PROVIDE A gulp.config.js file \r\n ### YOU CAN RENAME gulp.config-sample.json TO gulp.config.js")
  process.exit();
}
// injects links to index html

gulp.task('inject', function () {
  var script = config.scripts.src,
      local = script.concat(config.css.src),
      vendor =  mainBowerFiles(),
      paths = vendor.concat(local);

  return gulp.src(config.index.src)
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: PATH.dest}))
    .pipe(gulp.dest(PATH.temp))
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
  var test = config.test.scripts,
    local = config.scripts.src.concat(test),
    vendor =  mainBowerFiles(),
    paths = vendor.concat(local);
  karma.start({
    configFile: __dirname + config.test.src,
    files: paths,
    exclude: config.test.exclude
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

  sequence('lint', 'images', 'sass');
  var script = config.scripts.src,
    local = script.concat(config.css.src),
    vendor =  mainBowerFiles(),
    paths = vendor.concat(local);

  return gulp.src(config.index.src)
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: PATH.dest}))
    .pipe(gulp.dest(config.dist))
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
      baseDir: [PATH.temp],
      routes: {
        "/vendors": "vendors",
        "/app": "src/client/app",
        "/content": "src/client/content"
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
gulp.task('ionic-serve', function(){
  sequence('ionic-build', 'start-ionic-server');
});

