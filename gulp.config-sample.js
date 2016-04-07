config = {
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
    'dest': './src/client/app/'
  },
  'scripts': {
    'src': ['./src/client/app/templates.js', './src/client/app/app.js', './src/client/app/**/*.js'],
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
    'scripts': ['./src/client/test/**/*.js'],
    'exclude': ['**/*.+(eot|svg|ttf|woff)'],
    'dest': ''
  },
  'dist': 'www'
};
