module.exports = function(){
  'use strict';
  var config = {
    'isBuild' : false,
    'path': {
      'src': './src/client',
      'temp': './.tmp/',
      'dest': 'src/client/'
    },
    'index': {
      'src': ['./src/client/index*.html', './src/client/sample-ionic.html'],
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
