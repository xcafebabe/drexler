# Drexler

## Synopsis

Drexler is designed to make life easy by providing a basic framework with which to kickstart Ionice projects. It contains a best-practice directory structure to ensure code reusability and maximum scalability  (based on John Papa [Lift](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#lift) Principle). Drexler come with most popular frameworks around: Twitter Bootstrap, Angular UI, Angular Bootstrap, Font Awesome, and LESS. Lastly, it contains a sophisticated Gulp-based build system to ensure maximum productivity. All you have to do is clone it, install it and start coding!

## Installation

If you want to test your apps in Android you need to setup in your enviroment the Android SDK Tool.
* Download [Android SDK Tools](http://developer.android.com/sdk/index.html#Other)
* Unpack the .tgz you have download in your prefered folder
* Navigate to the `tools/` directory and then execute `android sdk`.
* Install Android Packages according to http://developer.android.com/sdk/installing/adding-packages.html
* Add in your profile ANDROID_HOME

If you don’t have the Ionic command line tool installed, make sure you have the latest Node.js and NPM installed. From there,
```
npm install -g ionic cordova bower gulp
```

### CLONE THE PROJECT
```
git clone git@github.com:ganlub/drexler.git
```

### INSTALL NODE, IONIC AND BOWER DEPENDENCIES
```
cd drexler; npm install ; ionic state reset ; bower install
```

### LAUNCH THE DEVELOPER APP
gulp serve

### BUILD DISTRIBUTION PACKAGE AND LAUNCH

gulp serve-ionic

  NOTE:
  ionic serve will launch the server, but will not build the required files
  you can use ionic serve after you builded the files with gulp serve-ionic

### Build Android Package
```
ionic platform add android
ionic build android            -> creates a android-debug apk
ionic build --release android  -> creates a android-release-unsigned apk
```

## Usage

WIP


## Tests

WIP

## Contributors

Luis Toubes - @toubes

## Folder structure
/src
--/client

----/app
------/app.js 
------/template.js              -> needed to compile views
------/dashboard                -> as an example
-------- shell.html
-------- shell.controller.js
-------- shell.directive.js
-------- shell.directive.html
               
----/content
------/fonts
------/images
------/locales
------/scss
------/sounds

----/test

/www
--/content
--/css
--/js

## License

Drexler is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
