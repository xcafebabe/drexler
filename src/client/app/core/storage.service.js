(function(){
  'use strict';
  angular.module('drexler.core')
    .service('drexlerStorage',drexlerStorage);

  drexlerStorage.$inject = ['$localStorage']; // Currenlty doing Manual DI for function , later we will be using ngInject
  function drexlerStorage($localStorage){

    // Set local Variable
    this.set = function (key,value) {
      $localStorage[key] = value;
    };

    // Get local Variable
    this.get = function (key) {
      return $localStorage[key];
    };

    this.resetAll = function (){
      $localStorage.$reset();
    };

    this.reset = function (key) {
      $localStorage.$reset({
        key: null
      });
    }
  }
})();
