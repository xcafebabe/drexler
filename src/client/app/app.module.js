(function() {
  'use strict';
   angular.module('drexler',
    [
      //Application Base Modules
      'drexler.core',
      'drexler.common',
      'drexler.translation',

      //ngCordova Mock for browser You can remove the below module when building your app
      /*'drexler.mockCordova',*/

      //Application Features Modules
      'drexler.tabs'
    ])
})();
