(function() {
  'use strict';
  angular.module('drexler.tabsMaterial').controller('TabMaterial2Controller', tabController);

  /* @ngInject */
  function tabController($log){
    var log = $log.getInstance('drexler.tasbMaterial');
    log.debug("tab2 initiated");
  }
})();
