(function() {
  'use strict';
  var tabsMaterialModule = angular.module('drexler.tabsMaterial', ['ui.router', 'ionic', 'ngMaterial', 'drexler.core', 'angular-logger']);

  /* @ngInject */
  tabsMaterialModule.config(function($stateProvider) {
    // setup an abstract state for the tabs directive
    $stateProvider
    .state('tabMaterial', {
      url: '/tabMaterial',
      abstract: true,
      templateUrl: 'app/tabs-material/tabs/tabs.html',
      controller: 'TabMaterialController',
      controllerAs : 'vm'
    })

    // Each tab has its own nav history stack
    .state('tabMaterial.tab1', {
      url: '/1',
      templateUrl: 'app/tabs-material/tab1/tab1.html',
      controller: 'TabMaterial1Controller',
      controllerAs : 'vm'
    })
    .state('tabMaterial.tab2', {
      url: '/2',
      templateUrl: 'app/tabs-material/tab2/tab2.html',
      controller: 'TabMaterial2Controller',
      controllerAs : 'vm'
    })
    .state('tabMaterial.tab3', {
      url: '/3',
      templateUrl: 'app/tabs-material/tab3/tab3.html',
      controller: 'TabMaterial3Controller',
      controllerAs : 'vm'
    });
  });
})();
