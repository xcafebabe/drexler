(function() {
  'use strict';
   angular.module('drexler',
    [
      //Application Base Modules
      'drexler.core',
      'drexler.translation',
      'drexler.layout',

      //ngCordova Mock for browser You can remove the below module when building your app
      // TODO How can inject this in gulp serve mode?
      /*'drexler.mockCordova',*/

      //Application Features Modules

      //'drexler.tabs',
      //'drexler.tabsMaterial'
    ]);
})();
