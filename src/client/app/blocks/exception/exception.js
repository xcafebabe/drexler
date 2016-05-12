(function() {
  'use strict';

  angular
    .module('drexler.blocks.exception')
    .factory('drexlerException', exception);

  /* @ngInject */
  function exception(logger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message) {
      return function(reason) {
        logger.error(message, reason);
      };
    }
  }
})();
