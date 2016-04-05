# Drexler

## Synopsis

Drexler is designed to make life easy by providing a basic framework  to kick start Ionic projects. It contains best-practice directory structure to ensure code re-usability and maximum scalability (based on John Papa [Lift](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#lift) Principle), it uses the best components from developer community to accomplish most standard requirements as Localization, Preferences, Database, Theme handling and also it contains a sophisticated Gulp-based build system to ensure maximum productivity.

All you have to do is clone it, install it and start coding!! :)

Have Fun!

## Installation

This guide is considering that you are going to deploy for **Android Devices**

### Android SDK

* Download [Android SDK Tools](http://developer.android.com/sdk/index.html#Other)
* Unpack the .tgz you have download in your preferred folder
* Navigate to `tools/` directory and then execute `android sdk`.
* Install Android Packages according to http://developer.android.com/sdk/installing/adding-packages.html
* Add to your profile ANDROID_HOME variable.

### Node.js

Make sure you have the la test Node.js (^5.7.1) and npm (^3.8.0)

Best approach to install from Source node and npm

```bash
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step probably takes more than 30 seconds...
curl https://www.npmjs.com/install.sh | sh
```

### Global dependencies

```
npm install -g ionic cordova bower gulp
```

### Source code
```
git clone git clone git@bitbucket.org:bytesauce/drexler.git
```

### Setup environment

```
cd drexler && ionic state reset && npm install && bower install
```

## Usage

Copy file `gulp.config-sample.json` to `gulp.config.json` .

In this file you can save/read sensitive information about Drexler configuration.

After this copy you can run  Drexler in development mode

```
gulp serve
```




FOR REVIEW
-----





### LAUNCH THE DEVELOPER APP
gulp serve

### BUILD DISTRIBUTION PACKAGE AND LAUNCH

gulp ionic-serve

  NOTE:
  ionic serve will launch the server, but will not build the required files
  you can use ionic serve after you builded the files with gulp serve-ionic

### Build Android Package
```
ionic platform add android
ionic build android            -> creates a android-debug apk
ionic build --release android  -> creates a android-release-unsigned apk
```


### installing karma and setting file for testing
npm install -g karma-cli

cd src/client/test/     -> cd to the location defined in gulp.config for testing
karma init my.conf.js

### start testing

gulp karma-test

## Usage

WIP


## Tests

WIP

## Contributors


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
