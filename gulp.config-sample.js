module.exports = function(){
  var config = {
    "path": {
      "src": "./src/client",
      "temp": ".tmp/",
      "dest": "src/client/"
    },
    "index": {
      "src": "./src/client/index.html",
      "dest": ""
    },
    "views": {
      "src": ["./src/client/app/**/*html"],
      "dest": "./src/client/app/"
    },
    "scripts": {
      "src": ["./vendors/angular-logger/dist/angular-logger.min.js"  // angular logger need to be added manually here
        ,"./src/client/app/templates.js", "./src/client/app/app.js", "./src/client/app/app.config.js", "./src/client/app/**/*.js"],
      "dest": ""
    },
    "css": {
      "src": ["./src/client/css/**/*.css"],
      "dest": ""
    },
    "scss": {
      "src": ["./src/client/content/scss/**/*.scss"],
      "dest": ".tmp/css"
    },
    "images": {
      "src": ["./src/client/content/images/**/*.+(png|jpg|gif|svg)"],
      "dest": "www/content/images/"
    },
    "test": {
      "src": ["/karma.conf.js"],
      "frameworks": ['jasmine', 'mocha', 'chai', 'sinon'],
      "scripts": ["./src/client/test/**/*.js"],
      "exclude": ["**/*.+(eot|svg|ttf|woff)"],
      "dest": ""
    },
    "dist": "www",
    "stamps": [
    ]
  }

  return config;
};
