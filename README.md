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

Clone the project
```
git clone git@github.com:ganlub/drexler.git
```

Install node and bower dependencies
```
cd drexler; npm install ; bower install
```

Build distribution Package
```
gulp build
```

Build Android Package
```
ionic build android
```

## Usage

WIP


## Tests

WIP

## Contributors

Luis Toubes - @toubes


## License

Drexler is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
