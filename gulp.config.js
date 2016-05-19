module.exports = function(){
  'use strict';
  var config = {
    'packageFile' : './package.json',
    'bowerFile' :  './bower.json',
    'jshintFile' : './.jshintrc',
    'jscsFile' : './.jscsrc',
    'rootPath' : './',
    'path': {
      'src': './src/client',
      'temp': './.tmp/',
      'dest': 'src/client/'
    },
    'index': {
      'src': ['./src/client/index*.html'],
    },
    'views': {
      'src': ['./src/client/app/**/*.html'],
      'build': './.tmp/',
      'filename' : 'templates.js'
    },
    'scripts': {
      'src': [
        './src/client/app/**/*.module.js',
        './.tmp/templates.js',
        './src/client/app/**/*.js'],
    },
    'vendors' : {
      'js' : [
        './vendors/**/*.js'
      ],
      'css' : [
        './vendors/**/*.css'
      ]
    },
    'locale': {
      'module' : 'drexler.translation',
      'template' : 'template.pot',
      'src' : ['po/**/*.po'],
      'build' : './po',
      'buildFile' : 'translation.run.js',
      'buildFolder' : './src/client/app/translation'
    },
    'scss': {
      'src': ['./src/client/content/scss/**/*.scss'],
      'build': './.tmp/css/'
    },
    'fonts' : {
      'src': [
        './vendors/ionic/fonts/*',
        './vendors/material-design-icons/iconfont/*.+(eot|svg|woff|woff2|ttf)'
      ],
      'build': './.tmp/fonts/'
    },
    'images': {
      'src': ['./src/client/content/images/**/*.+(png|jpg|gif|svg)'],
      'build': 'www/images/'
    },
    'assets' : {
      'src' : [
        './src/client/content/images/**/*'
      ]
    },
    'test': {
      'src': ['/karma.conf.js'],
      'frameworks': ['mocha', 'chai', 'sinon', 'chai-sinon' ],
      'preprocessors': {
          'src/client/app/**/*.js': 'coverage'
      },
      'scripts': ['./src/client/test/**/*.js'],
      'exclude': ['**/*.+(eot|svg|ttf|woff)'],
    },
    'build': 'www',
    'stamps': [ //Only has sense during building time
      //More info https://www.npmjs.com/package/gulp-replace
      {
        'src': './.tmp/templates.js', // support one string if there is only one file
        'dest': './.tmp/', // if not dest we use src as destination
        'match' : 'VERSION_NUMBER', //Could be string or regex
        'replacement' : '1.1.0' //Could be string or function
      },
    ]
  };

  return config;
};
