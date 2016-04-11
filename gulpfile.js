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
    replace = require('gulp-replace-task'),
    karma = require('karma').Server,
    browserSync = require('browser-sync').create();

// Getting settings.json configurations

try {
  require('./gulp.config.js');
  //config = JSON.parse(fs.readFileSync('./gulp.config.json')),
  PATH = config.path
}catch (e){
  console.log("\r\n ### PLEASE PROVIDE A gulp.config.js file \r\n ### YOU CAN RENAME gulp.config-sample.json TO gulp.config.js");
  console.log("\r\n ### IF YOU PROVIDED A gulp.config.js MAKE SURE THERE IS NO SYNTAX ERROR IN THAT FILE");
  process.exit();
}

gulp.task('c', function(){
  var vendor =  mainBowerFiles(['**/*.js', '**/*.css']);

  console.log(vendor);
});
// injects links to index html

gulp.task('inject', function () {
  var script = config.scripts.src,
      local = script.concat(config.css.src),
      vendor =  mainBowerFiles(['**/*.js', '**/*.css']),
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
gulp.task('test', function(done) {
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

// runs ionic serve
gulp.task('replace', function(){

  var stamps = config.stamps,
      length = stamps.length;
  for (var i = 0; i < length; i++){
    var item = stamps[i],
        src = item.src,
        patterns = item.patterns,
        destLength = src.length;

    if( Object.prototype.toString.call( src ) === '[object Array]' ) {
      var paternType = patterns.json ? { json: patterns.json} : { match: patterns.match, replacement: patterns.replacement };
      for (var e = 0; e < destLength; e++){
        gulp.src(src[e])
          .pipe(replace({
            patterns: [
              paternType
            ]
          }))
          .pipe(gulp.dest(item.dest));
      }
    }
    else {
      gulp.src(src)
        .pipe(replace({
          patterns: [
            {
              match: patterns.match,
              replacement: patterns.replacement
            }
          ]
        }))
        .pipe(gulp.dest(item.dest));
    }


  }
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

