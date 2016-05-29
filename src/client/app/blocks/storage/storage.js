(function(){
  'use strict';
  angular.module('drexler.blocks.storage')
    .service('drexlerStorage',DrexlerStorage);

  /* @ngInject */
  function DrexlerStorage($localStorage){
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

    this.reset = function () {
      $localStorage.$reset({
        key: null
      });
    };
  }
})();
