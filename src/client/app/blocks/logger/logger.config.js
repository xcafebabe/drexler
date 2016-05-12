(function() {
  'use strict';

  angular
    .module('drexler.blocks.logger')
    .config(loggerConfig);

  /* @ngInject */
  function loggerConfig() {
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
