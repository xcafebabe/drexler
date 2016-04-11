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
make install # this step probably takes more than 30 seconds ...
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

Copy file `gulp.config-sample.js` to `gulp.config.js` .

In this file you can save/read sensitive information about Drexler configuration.

After this copy you can run  Drexler in development mode

```
gulp serve
```

## Running Tests

In folder `src/client/test` you can code your tests.

To execute all unit tests, use:

```
gulp test
```



### BUILD DISTRIBUTION

gulp ionic-build

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




## Folder structure

Following John Papa style [Y141](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y141)

Create folders named for the feature they represent. When a folder grows to contain more than 7 files, start to consider creating a folder for them. Your threshold may be different, so adjust as needed.

Note: Do not structure your app using folders-by-type. This requires moving to multiple folders when working on a feature and gets unwieldy quickly as the app grows to 5, 10 or 25+ views and controllers (and other features), which makes it more difficult than folder-by-feature to locate files.

```
src/
  client/
    app/
      app.js         -> Standard angular app module boot
      template.js    -> Needed to compile views
      dashboard/     -> Dashboard Feature
        shell.html
        shell.controller.js
        shell.directive.js
        shell.directive.html
    content/         -> Assets like images,fonts, locales,css, sounds
      fonts/
      images/
      locales/
      scss/
      sounds/
    test/            -> Location of my tests
www/                 -> Distribution folder used as well by ionic tasks
  content/
  images/
  css/
  js/
hooks/               -> Node.js scripts provided by ionic.
platforms/           -> Device code and binaries
plugins/             -> Plugins used in cordova
config.xml           -> Cordova configuration file
```
Keep in mind also Styles [142](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y142), [143](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y143), [144](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y144)

Together is the [LIFT](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y140) principle

**L** ocating our code is easy

**I** dentify code at a glance

**F** lat structure as long as we can

**T** ry to stay DRY (Don’t Repeat Yourself) or T-DRY



### SETTINGS STAMPS
"stamps": [
    {
      "src": ["file.txt", "file1.txt"],    // files to edit
      "dest": ".tmp/",                     // folder to store or empty string if wnat to replace current file
      "patterns": {
        "match": /foo/g,                   // word to find
        "replacement": "bar"               // replace with
      }
    },
    {
      "src": "file2.txt",                 // support one string if there is only one file
      "dest": "",                         // empty string if want to replace current file
      "patterns": {
        "match": /der/g,
        "replacement": "ferfer"
      }
    },
    {
      "src": ["file3.json"],
      "dest": ".tmp/",
      "patterns": {
        "json": {
        "123": "value"                    // finds @123 and replaces it to "value". ie: {"@@123": "any"} -> {"value": "any"} or {"val": "@@123"} -> {"val": "value"}
        }
      }         
    }     
  ]

## License

Drexler is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
