(function() {
  'use strict';

  angular.module('drexler.layout').config(layoutState);

  /* @ngInject */
  function layoutState(DRX_DEFAULT_URL, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise(DRX_DEFAULT_URL);

    $stateProvider
      .state('drexler', {
        abstract: true,
        views: {
          header: {
            templateUrl: 'app/layout/header.html'
          },
          sidebar: {
            templateUrl: 'app/layout/sidebar.html'
          }
        }
      })
      .state('drexler.default', {
        url: DRX_DEFAULT_URL,
        views: {
          'content@': {
            templateUrl: 'app/layout/defaultContent.html'
          }
        }
      });
  }
})();
