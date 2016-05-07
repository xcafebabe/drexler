'use strict';
var sequence = require('run-sequence'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    watch = require('gulp-watch'),
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
    args = require('yargs').argv,
    fs = require('fs'),
    lodash = require('lodash'),
    drexlerConfig;

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * i.e.: gulp serve --config /opt/production/gulp.custom.50.122.js
 */
try {
  var configDefaultPath = './gulp.config.js',
  configCustomPath = args.config || './gulp.custom.js',
  drexlerCustoms = {};

  try {
    if (fs.statSync(configCustomPath).isFile()){
      drexlerCustoms = require(configCustomPath)();
    }
  }catch (e){
    log('Not founded custom configuration ' + gutil.colors.bgCyan(configCustomPath));
    log('If you want to extend configuration options please add ' + gutil.colors.bold('gulp.custom.js'));
  }

  drexlerConfig = lodash.extend(require(configDefaultPath)(), drexlerCustoms);

  if (!drexlerConfig.path){
    log('In current config file ' + gutil.colors.bgCyan(configDefaultPath));
    log('Can not find ' + gutil.colors.bold('config.path') + ' property');
    log('Please provide a valid ' + gutil.colors.bold(configDefaultPath) + ' file');
    process.exit();
  }
}catch (e){
  log(gutil.colors.red('Exception'));
  log('Please provide ' + gutil.colors.bgCyan('gulp.config.js') + ' file');
  console.log(e);

  process.exit();
}

/**
 * List the available gulp tasks
 */
gulp.task('help', require('gulp-task-listing'));

/**
* Default Task
*/
gulp.task('default', ['help']);

/**
* Serve all the required files in a browser
*/
gulp.task('serve', function(){
  addCordovaMocks();
  sequence('sass', 'inject', 'fonts', 'browserSync');
  watch(drexlerConfig.views.src,browserSync.reload);
  watch(drexlerConfig.scss.src, function(){sequence('sass', browserSync.reload);});
  watch(drexlerConfig.scripts.src, function(){sequence('inject', browserSync.reload);});
  watch(drexlerConfig.fonts.src, function(){sequence('fonts', browserSync.reload);});
});

/**
* Alias for gulp serve
*/
gulp.task('server',['serve']);

/**
* Injects links to index html
*/
gulp.task('inject', function () {
  var assets = [].concat(drexlerConfig.scripts.src, [drexlerConfig.scss.dest + '**/*.css']),
      vendors =  mainBowerFiles(),
      paths = vendors.concat(assets);

  return gulp.src(drexlerConfig.index.src)
    .pipe(inject(gulp.src(paths, {read: false}), {ignorePath: drexlerConfig.path.dest}))
    .pipe(gulp.dest(drexlerConfig.path.temp));
});

/**
*  Converts sass to css
*  @return {Stream}
*/
gulp.task('sass', function(){
  return gulp.src(drexlerConfig.scss.src)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(drexlerConfig.scss.dest));
});

/**
* Starts a server for `gulp serve` task
*/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: [drexlerConfig.path.temp],
      routes: {
        '/vendors': './vendors',
        '/content': './src/client/content',
        '/app' : './src/client/app',
        '/src/mock-cordova' : './src/mock-cordova', //remove this crap from here
        '/.tmp' : './.tmp'
      }
    },
  });
});

/**
/**
* Minify images
*/
gulp.task('images', function(){
  return gulp.src(drexlerConfig.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(drexlerConfig.images.dest));
});

/**
* JsHint mode used during build time
*/
gulp.task('lint', function() {
  return gulp.src(drexlerConfig.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', function() {
  log('Copying fonts');
  return gulp
    .src(drexlerConfig.fonts.src)
    .pipe(gulp.dest(drexlerConfig.fonts.dest));
});

/**
* Karma Test Environments
*/
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


//
gulp.task('build', function(){
  var script = [].concat(drexlerConfig.scripts.buildsrc, drexlerConfig.views.dest + drexlerConfig.views.filename),
    vendor =  mainBowerFiles(),
    paths = vendor.concat(script);
  return gulp.src(drexlerConfig.index.src)
    .pipe(inject(gulp.src(paths, {read: false})))
    .pipe(gulp.dest(drexlerConfig.dist))
    .pipe(useref({ searchPath: ['.'] }))
    .pipe(gulpIf('*.js', ngAnnotate()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(drexlerConfig.dist));
});

// app packaging into www. Ready to use by ionic cli.
gulp.task('ionic-build', function(){
  sequence('move-contents', 'images', 'sass', 'templatecache', 'replace', 'build');
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

// build and serve files in www
gulp.task('ionic-serve', function(){
  sequence('move-fonts', 'move-contents', 'images', 'sass', 'templatecache', 'replace', 'build', 'start-ionic-server');
});

// gulp clean temp folders
gulp.task('clean', function () {
  return del(['.tmp','www/**/*']);
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

function addCordovaMocks(){
  if (drexlerConfig.scripts.src instanceof Array){
    drexlerConfig.scripts.src.push('!./src/client/app/core/ng-cordova-mocks.js');
    drexlerConfig.scripts.src.push('./vendors/ngCordova/dist/ng-cordova-mocks.js');
  }
}


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


gulp.task('move-contents', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./src/client/content/**', '!./src/client/content/scss/**', '!./src/client/content/scss/',
    '!./src/client/content/fonts/**', '!./src/client/content/fonts/'])
    .pipe(gulp.dest('www/content/'));
});

gulp.task('move-fonts', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./src/client/content/fonts/**/*'])
    .pipe(gulp.dest('www/fonts/'));
});
