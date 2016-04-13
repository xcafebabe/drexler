module.exports = function(){
  var config = {
    'path': {
      'src': './src/client',
      'temp': '.tmp/',
      'dest': 'src/client/'
    },
    'index': {
      'src': './src/client/index.html',
      'dest': ''
    },
    'views': {
      'src': ['./src/client/app/**/*html'],
      'dest': './.tmp/',
      'filename' : 'templates.js'
    },
    'scripts': {
      'src': ['./src/client/app/templates.js', './src/client/app/app.js', './src/client/app/app.config.js', './src/client/app/**/*.js'],
      'dest': ''
    },
    'css': {
      'src': ['./src/client/css/**/*.css'],
      'dest': ''
    },
    'scss': {
      'src': ['./src/client/content/scss/**/*.scss'],
      'dest': '.tmp/css'
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
        'src': './www/index.html', // support one string if there is only one file
        'dest': '', // empty string if want to replace current file
        'patterns': {
          'match': 'VERSION_NUMER',
          'replacement': '1.1.0'
        }
      },
    ]
  };

  return config;
};
