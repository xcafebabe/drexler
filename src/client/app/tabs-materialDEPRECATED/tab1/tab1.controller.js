(function() {
  'use strict';
  angular.module('drexler.tabsMaterial').controller('TabMaterial1Controller', tabController);

  /* @ngInject */
  function tabController($log){
    var log = $log.getInstance('drexler.tasbMaterial');
    log.debug("tab1 initiated");
  }
})();
