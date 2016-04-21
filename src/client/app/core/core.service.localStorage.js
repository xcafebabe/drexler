(function(){
  'use strict';
  angular.module('drexler.core')
    .service('drexlerStorage',drexlerStorage);

  drexlerStorage.$inject = ['$localStorage']; // Currenlty doing Manual DI for function , later we will be using ngInject
  function drexlerStorage($localStorage){

    this.set = function (key,value) {
      $localStorage[key] = value;
    };

    this.get = function (key) {
      console.log($localStorage[key]);
      return $localStorage[key];

    };
  }
})();
