'use strict';
var sequence = require('run-sequence'),
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
    browserSync = require('browser-sync').create(),
    gutil = require('gulp-util'),
    del = require('del'),
    file = require('gulp-file'),
    args = require('yargs').argv,
    fs = require('fs'),
    drexlerConfig;



/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --config  : gulp.config.js location in filesystem
 */
try {
  var configFilePath = './gulp.config.js';
  if (args.config && fs.statSync(args.config).isFile()){
    configFilePath = args.config;
  }
  drexlerConfig = require(configFilePath)();
  if (!drexlerConfig.path){
    log('In current config file ' + gutil.colors.bgCyan(configFilePath));
    log('Can not find ' + gutil.colors.bold('config.path') + ' property');
    log('Please provide a valid ' + gutil.colors.bold(configFilePath) + ' file');
    process.exit();
  }
}catch (e){
  log('Please provide ' + gutil.colors.bgCyan('gulp.config.js') + ' file');
  log(gutil.colors.underline('HOW-TO'));
  log('Copy gulp.config-sample.js to ' + gutil.colors.bgCyan('gulp.config.js'));
  log(gutil.colors.bold('cp gulp-config-sample.js gulp.config.js'));
  log(gutil.colors.red('Exception'));
  console.log(e);
  process.exit();
}

/**
 * List the available gulp tasks
 */
gulp.task('help', require('gulp-task-listing'));
//Default Task
gulp.task('default', ['help']);

// injects links to index html
gulp.task('inject', function () {
  var script = drexlerConfig.scripts.src,
      local = script.concat(drexlerConfig.css.src),
      vendor =  mainBowerFiles(['**/*.js', '**/*.css']),
      paths = vendor.concat(local);

  return gulp.src(drexlerConfig.index.src)
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: drexlerConfig.path.dest}))
    .pipe(gulp.dest(drexlerConfig.path.temp));
});

// converts sass to css
gulp.task('sass', function(){
  return gulp.src(drexlerConfig.scss.src)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(drexlerConfig.scss.dest));
});

// minify images
gulp.task('images', function(){
  return gulp.src(drexlerConfig.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(drexlerConfig.images.dest));
});

// gulp jshint
gulp.task('lint', function() {
  return gulp.src(drexlerConfig.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Karma test
gulp.task('test', function(done) {
  var test = drexlerConfig.test.scripts,
    local = drexlerConfig.scripts.src.concat(test),
    vendor =  mainBowerFiles(),
    paths = vendor.concat(local);
  karma.start({
    configFile: __dirname + drexlerConfig.test.src,
    files: paths,
    frameworks: drexlerConfig.test.frameworks,
    preprocessors: drexlerConfig.test.preprocessors,
    exclude: drexlerConfig.test.exclude
  }, function() {
    done();
  });
});

/**
 * Create $templateCache from the html view templates
 * @return {Stream}
 */
gulp.task('templatecache', function () {
  log('Creating an AngularJS $templateCache');
  return gulp.src(drexlerConfig.views.src)
    //  .pipe(plug.minifyHtml({
    //       empty: true
    //   }))
    .pipe(templateCache(drexlerConfig.views.filename, {
      module: 'drexler.core',
      standalone: false,
      root : 'app/'
    }))
    .pipe(gulp.dest(drexlerConfig.views.dest));
});

// runs ionic serve
gulp.task('start-ionic-server', function(){
  exec('ionic serve', function (err, stdout, stderr) {});
});

// runs ionic serve
gulp.task('replace', function(){

  var stamps = drexlerConfig.stamps,
      length = stamps.length;
  for (var i = 0; i < length; i++){
    var item = stamps[i],
        src = item.src,
        patterns = item.patterns,
        destLength = src.length;

    if( Object.prototype.toString.call( src ) === '[object Array]' ) {
      var paternType = patterns.json ?
        { json: patterns.json} : { match: patterns.match, replacement: patterns.replacement };
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
  sequence('images', 'sass', 'lint', 'templatecache', 'replace');
  var script = [].concat(drexlerConfig.scripts.src, drexlerConfig.views.dest + drexlerConfig.views.filename),
    local = script.concat(drexlerConfig.css.src),
    vendor =  mainBowerFiles(),
    paths = vendor.concat(local);

  return gulp.src(drexlerConfig.index.src)
    .pipe(inject(gulp.src(paths, {read: false})))
    .pipe(gulp.dest(drexlerConfig.dist))
    .pipe(useref({ searchPath: ['.', drexlerConfig.src] }))
    .pipe(gulpIf('*.js', ngAnnotate()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(drexlerConfig.dist));
});

//ionic-build task overloaded
gulp.task('build',['ionic-build']);

// starts a server for src
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: [drexlerConfig.path.temp],
      routes: {
        '/vendors': 'vendors',
        '/content': 'src/client/content',
        '/app' : 'src/client/app'
      }
    },
  });
});

// serve all the required files for src
gulp.task('serve', function(){
  sequence('browserSync', 'sass', 'inject');
  gulp.watch(drexlerConfig.views.src, browserSync.reload);
  gulp.watch(drexlerConfig.scripts.src, browserSync.reload);
  gulp.watch(drexlerConfig.css.src, browserSync.reload);
});

// build and serve files in www
gulp.task('ionic-serve', function(){
  sequence('ionic-build', 'start-ionic-server');
});

// gulp clean temp folders
gulp.task('clean', function () {
  sequence('delete', 'fillwww');
});

gulp.task('delete', function () {

  return del(['.tmp', 'www/**/*']);
});

gulp.task('fillwww', function () {
  var str = "<!DOCTYPE html>\n"           +
            "<html lang='en'>\n"          +
            " <head>\n"                   +
            "  <meta charset='UTF-8'>\n"  +
            "  <title></title>\n"         +
            " </head>\n"                  +
            " <body>\n"                   +
            " "                           +
            " </body>\n"                  +
            "</html>\n"


  return file('index.html', str).pipe(gulp.dest('www'));
});

// SOME INTERNAL FUNCTIONS

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        gutil.log(gutil.colors.white(msg[item]));
      }
    }
  } else {
    gutil.log(gutil.colors.white(msg));
  }
}
