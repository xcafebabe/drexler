(function() {
  'use strict';
  angular.module('drexler.core', [
    /* Angular Modules*/

    /* Cross App Modules*/
    'drexler.blocks.logger',
    'drexler.blocks.exception',
    'drexler.blocks.storage',
    'drexler.blocks.locale',

    /* 3rd Party modules */
    'ionic',
    'ngCordova',
    //In Production mode is attached an empty ngCordovaMocks
    //This is intended for browser development purposes
    'ngCordovaMocks',
    'ngMaterial',
    'gettext'

  ]);
})();
