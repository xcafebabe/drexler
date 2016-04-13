(function(){
  'use strict';
  angular.module('drexler').factory('log', function($log){

    var log = {
      globalLogger: $log.getInstance('Global'),
      dashLogger: $log.getInstance('Dash')
    };

    $log.logLevels['Global'] = $log.LEVEL['ON'];
    $log.logLevels['Dash'] = $log.LEVEL['OFF'];

    return log;
  });
})();
