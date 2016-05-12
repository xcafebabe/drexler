(function() {
  'use strict';

  angular.module('drexler.core').config(coreStates);

  /* @ngInject */
  function coreStates($stateProvider) {
    $stateProvider
      .state('drexler.language', {
        views: {
          'content@': {
            templateUrl: 'app/language/language.html',
            controller: 'LanguageCtrl'
          },
        }
      })
      .state('drexler.testing', {
        url: '/testing',
        views: {
          'content@': {
            template: '<h1>HI??</h1>',
          }
        }
      });
  }
})();
