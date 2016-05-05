module.exports = function(){
  'use strict';
  var config = {
    'path': {
      'src': './src/client',
      'temp': './.tmp/',
      'dest': 'src/client/'
    },
    'index': {
      'src': ['./src/client/index*.html'],
      'dest': ''
    },
    'views': {
      'src': ['./src/client/app/**/*.html'],
      'dest': './.tmp/',
      'filename' : 'templates.js'
    },
    'scripts': {
      'src': [
        './.tmp/templates.js',
        './src/client/app/**/*.module.js',
        './src/mock-cordova/mock-cordava.module.js',
        './src/mock-cordova/mocks/*.js',
        './src/client/app/**/*.js'],
      'buildsrc': ['./src/client/app/core/**/*.js', './.tmp/templates.js', './src/client/app/app.module.js', './src/client/app/app.config.js', './src/client/app/**/*.js'],
      'dest': ''
    },
    'scss': {
      'src': ['./src/client/content/scss/**/*.scss'],
      'dest': './.tmp/css/'
    },
    'fonts' : {
      'src': ['./vendors/ionic/fonts/*'],
      'dest': './.tmp/fonts/'
    },
    'images': {
      'src': ['./src/client/content/images/**/*.+(png|jpg|gif|svg)'],
      'dest': 'www/content/images/'
    },
    'test': {
      'src': ['/karma.conf.js'],
      'frameworks': ['mocha', 'chai'],
      'preprocessors': {
        'src/client/test/*.js': [ 'browserify' ]
      },
      'scripts': ['./src/client/test/**/*.js'],
      'exclude': ['**/*.+(eot|svg|ttf|woff)'],
      'dest': ''
    },
    'dist': 'www',
    'stamps': [ //Only has sense during build time
      {
        'src': '.tmp/template.js', // support one string if there is only one file
        'dest': '', // empty string if want to replace current file
        'patterns': {
          'match': /VERSION_NUMBER/g,
          'replacement': '1.1.0'
        }
      },
    ]
  };

  return config;
};
