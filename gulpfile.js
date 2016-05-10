'use strict';
var plug = require('gulp-load-plugins')(),
  args = require('yargs').argv,
  browser = require('browser-sync'),
  gulp = require('gulp'),
  karma = require('karma').server,
  sequence = require('run-sequence'),
  fs = require('fs'),
  del = require('del'),
  gutil = require('gulp-util'),
  _ = require('lodash'),
  mainBowerFiles = require('main-bower-files'),
  exec = require('child_process').exec,
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
    if (fs.statSync(configCustomPath).isFile()) {
      drexlerCustoms = require(configCustomPath)();
    }
  } catch (e) {
    log('Not founded custom configuration ' + gutil.colors.bgCyan(configCustomPath));
    log('If you want to extend configuration options please add ' + gutil.colors.bold('gulp.custom.js'));
  }

  drexlerConfig = _.extend(require(configDefaultPath)(), drexlerCustoms);

  if (!drexlerConfig.path) {
    log('In current config file ' + gutil.colors.bgCyan(configDefaultPath));
    log('Can not find ' + gutil.colors.bold('config.path') + ' property');
    log('Please provide a valid ' + gutil.colors.bold(configDefaultPath) + ' file');
    process.exit();
  }
} catch (e) {
  log(gutil.colors.red('Exception'));
  log('Please provide ' + gutil.colors.bgCyan('gulp.config.js') + ' file');
  console.log(e);

  process.exit();
}

/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);

/**
 * Default Task
 */
gulp.task('default', ['help']);

/**
 * Serve all required files in a desktop browser
 * @return {Stream}
 */
gulp.task('serve', function() {
  function logWatch(event) {
    log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
  }

  //Add ngCordovaMocks during browser development
  addCordovaMocks();

  if (args.templates || args.template) {
    gulp
      .start('ngTemplateCache')
      .watch(drexlerConfig.views.src, ['ngTemplateCache', browser.reload])
      .on('change', logWatch);
  } else {
      del('./.tmp/' + drexlerConfig.views.filename);
      gulp
        .watch(drexlerConfig.views.src, browser.reload)
        .on('change', logWatch);
  }

  //Watch SCSS
  gulp
    .watch(drexlerConfig.scss.src, ['sass', browser.reload])
    .on('change', logWatch);

  //Watch Fonts
  gulp
    .watch(drexlerConfig.fonts.src, ['fonts', browser.reload])
    .on('change', logWatch);

  //Watch changes on content
  gulp
    .watch(drexlerConfig.assets.src, [browser.reload])
    .on('change', logWatch);

  //Watch app js changes
  gulp
    .watch(drexlerConfig.path.src + '/app/**/*.js', ['inject', browser.reload])
    .on('change', logWatch);

  // Watch vendors folder is not well performant... Disable it...
  // gulp
  //   .watch('./vendors/**/*.{js,css}', ['inject', browser.reload])
  //   .on('change', logWatch);

  //Build css, inject js/css in index and copy fonts
  sequence('sass', 'fonts', 'inject', 'browserSync');
});

/**
 * Alias for gulp serve
 */
gulp.task('server', ['serve']);

/**
 *  Converts sass to css
 *  @return {Stream}
 */
gulp.task('sass', function() {
  return gulp.src(drexlerConfig.scss.src)
    .pipe(plug.sass().on('error', plug.sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(plug.autoprefixer('last 2 version', '> 5%'))
    .pipe(gulp.dest(drexlerConfig.scss.build));
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', function() {
  log('Copying fonts');
  return gulp
    .src(drexlerConfig.fonts.src)
    .pipe(gulp.dest(drexlerConfig.fonts.build));
});

// Just found this way to change destination folder between serve & build
gulp.task('fonts-build', function() {
  log('Copying fonts');
  return gulp
    .src(drexlerConfig.fonts.src)
    .pipe(gulp.dest(drexlerConfig.build+'/fonts'));
});

/**
* Injects required files into index html
*/
gulp.task('inject', function () {
  var assets = [].concat(drexlerConfig.scripts.src, [drexlerConfig.scss.build + '**/*.css']),
      vendors =  mainBowerFiles();

  return gulp.src(drexlerConfig.index.src)
    .pipe(plug.inject(gulp.src(assets, {read: false}), {name: 'app', ignorePath: drexlerConfig.path.dest}))
    .pipe(plug.inject(gulp.src(vendors, {read: false}), {name: 'vendors',ignorePath: drexlerConfig.path.dest}))
    .pipe(gulp.dest(drexlerConfig.path.temp));
});

/**
 * Starts a server for `gulp serve` task
 */
gulp.task('browserSync', function() {
  browser.init({
    server: {
      baseDir: [
        drexlerConfig.path.temp,
        drexlerConfig.path.src + '/content'
      ],
      routes: {
        '/vendors': './vendors',
        '/app': './src/client/app',
        '/.tmp': './.tmp'
      }
    },
  });
});

/**
 * Create templates cache useful for angular views
 * @return {Stream}
 */
gulp.task('ngTemplateCache', function() {
  log('Creating template.js');
  return gulp.src(drexlerConfig.views.src)
    .pipe(plug.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(plug.angularTemplatecache(drexlerConfig.views.filename, {
      module: 'drexler.core',
      standalone: false,
      root: 'app/'
    }))
    .pipe(gulp.dest(drexlerConfig.views.build));
});

gulp.task('pot', function() {
  return gulp.src([].concat(drexlerConfig.views.src, [drexlerConfig.path.src + '/app/**/*.js']))
    .pipe(plug.angularGettext.extract(drexlerConfig.locale.template, {
      // options to pass to angular-gettext-tools...

    }))
    .pipe(gulp.dest(drexlerConfig.locale.build));
});

gulp.task('po-compile', function() {
  return gulp.src(drexlerConfig.locale.src)
    .pipe(plug.angularGettext.compile('translation.run.js',{
      module: drexlerConfig.locale.module,
      format: 'javascript'
    }))
    .pipe(gulp.dest('./src/client/app/translation'));
});

/**
* Bundling, uglifying, minifying Css, Html, Javascript.
*/
// Build into www. Ready to use by ionic cli.
gulp.task('build', function() {
  log('Packaging Drexler App');
  sequence('clean', 'copy', 'fonts-build', 'images', 'sass', 'ngTemplateCache', 'replace', callback);

  function callback(){
    var assets = [].concat(drexlerConfig.scripts.src, [drexlerConfig.scss.build + '**/*.css']),
        vendors =  mainBowerFiles();
    return gulp.src(drexlerConfig.index.src)
      .pipe(plug.inject(gulp.src(assets, {read: false}), {name: 'app'}))
      .pipe(plug.inject(gulp.src(vendors, {read: false}), {name: 'vendors'}))
      .pipe(plug.useref({
        searchPath: ['.']
      }))
      .pipe(plug.if('js/app.min.js', plug.ngAnnotate({
        add: true,
        single_quotes: true
      })))
      .pipe(plug.if('js/*.js', plug.uglify({
        mangle : true
      })))
      .pipe(plug.if('css/*.css', plug.csso()))
      .pipe(plug.if('*.html',plug.htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })))
      .pipe(gulp.dest(drexlerConfig.build));
  }
});


/**
 * Copy content to www
 */
gulp.task('copy', function() {
  gulp.src([
      './src/client/content/**/*',
      '!./src/client/content/scss',
      '!./src/client/content/scss/**/*',
      '!./src/client/content/images',
      '!./src/client/content/images/**/*',
    ])
    .pipe(gulp.dest(drexlerConfig.build));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', function() {
  log('Compressing, caching, and copying images');
  return gulp.src(drexlerConfig.images.src)
    .pipe(plug.imagemin({
      optimizationLevel: 3
    }))
    .pipe(gulp.dest(drexlerConfig.images.build));
});


/**
* Clean development environment
* @return {Stream}
*/
gulp.task('clean', function() {
  return del(['.tmp/**/*', 'www/**/*']);
});

/**
 * JsHint mode used during build time
 */
// gulp.task('lint', function() {
//   return gulp.src(drexlerConfig.scripts.src)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(jshint.reporter('fail'));
// });


/**
 * Karma Test Environments
 */
gulp.task('test', function(done) {
  var test = drexlerConfig.test.scripts,
    local = drexlerConfig.scripts.src.concat(test),
    vendor = mainBowerFiles(),
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

// runs ionic serve
gulp.task('replace', function() {

  var stamps = drexlerConfig.stamps,
    length = stamps.length;
  for (var i = 0; i < length; i++) {
    var item = stamps[i],
      src = item.src,
      patterns = item.patterns,
      destLength = src.length;

    if (Object.prototype.toString.call(src) === '[object Array]') {
      var paternType = patterns.json ? {
        json: patterns.json
      } : {
        match: patterns.match,
        replacement: patterns.replacement
      };
      for (var e = 0; e < destLength; e++) {
        gulp.src(src[e])
          .pipe(plug.replaceTask({
            patterns: [
              paternType
            ]
          }))
          .pipe(gulp.dest(item.dest));
      }
    } else {
      gulp.src(src)
        .pipe(plug.replaceTask({
          patterns: [{
            match: patterns.match,
            replacement: patterns.replacement
          }]
        }))
        .pipe(gulp.dest(item.dest));
    }
  }
});

//////
// Some Ionic Helpers
/////
// runs ionic serve
gulp.task('start-ionic-server', function() {
  exec('ionic serve', function(err) {
    log('Oopsi!');
    log(err);
  });
});

// build and serve files in www
gulp.task('ionic-serve', function() {
  sequence('move-fonts', 'move-contents', 'images', 'sass', 'templatecache', 'replace', 'build', 'start-ionic-server');
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

function addCordovaMocks() {
  if (drexlerConfig.scripts.src instanceof Array) {
    log('ngCordovaMocks module added');
    drexlerConfig.scripts.src.push('!./src/client/app/core/ng-cordova-mocks.js');
    drexlerConfig.scripts.src.push('./vendors/ngCordova/dist/ng-cordova-mocks.js');
  }
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
  var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
  return data.fileName + ' went from ' +
    (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
    ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted percentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}
