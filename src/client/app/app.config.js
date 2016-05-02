(function(){
  'use strict';

  angular.module('drexler').config(drexlerConfig);

  /* @ngInject */
  function drexlerConfig(){
    // Log Level definitions
    // logEnhancerProvider.prefixPattern = '%s::[%s]>';
    // logEnhancerProvider.datetimePattern = 'dddd h:mm:ss a';
    // logEnhancerProvider.logLevels = {
    //     '*': logEnhancerProvider.LEVEL.OFF,
    //     'drexler': logEnhancerProvider.LEVEL.WARN,
    //     'drexler.tabsMaterial': logEnhancerProvider.LEVEL.OFF
    // };
  }
})();
