(function(){
  'use strict';
  angular.module('drexler').controller('DashCtrl', function($scope, $log, log) {

    var globalLogger = $log.getInstance('Global');
    var dashLogger = $log.getInstance('Dash');

    globalLogger.info('This is a global log');
    dashLogger.info('This is a dash log');

  });

})();
