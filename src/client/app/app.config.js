(function() {
  'use strict';

  angular.module('drexler').config(drexlerConfig);

  /* @ngInject */
  function drexlerConfig($mdThemingProvider) {
    // Log Level definitions
    // logEnhancerProvider.prefixPattern = '%s::[%s]>';
    // logEnhancerProvider.datetimePattern = 'dddd h:mm:ss a';
    // logEnhancerProvider.logLevels = {
    //     '*': logEnhancerProvider.LEVEL.OFF,
    //     'drexler': logEnhancerProvider.LEVEL.WARN,
    //     'drexler.tabsMaterial': logEnhancerProvider.LEVEL.OFF
    // };

    // $mdIconProvider
    //     .defaultIconSet("./assets/svg/avatars.svg", 128)
    //     .icon("menu"       , "./assets/svg/menu.svg"        , 24)
    //     .icon("share"      , "./assets/svg/share.svg"       , 24)
    //     .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
    //     .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
    //     .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
    //     .icon("phone"      , "./assets/svg/phone.svg"       , 512);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
  }
})();
