(function() {
  'use strict';
  angular.module('drexler.tabsMaterial').controller('TabMaterialController', TabController);

  /* @ngInject */
  function TabController($log, $mdSidenav){
    var log = $log.getInstance('drexler.tasbMaterial'),
    vm = this;
    log.debug("tab initiated");

    vm.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  }
})();
