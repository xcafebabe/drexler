(function(){
  'use strict';
  angular.module('drexler').controller('DashCtrl', function($scope, $log, log,$cordovaGlobalization, $ionicPlatform ) {

    var globalLogger = $log.getInstance('Global');
    var dashLogger = $log.getInstance('Dash');

    globalLogger.info('This is a global log');
    dashLogger.info('This is a dash log');
    $scope.lang = "NA";
    $ionicPlatform.ready(function () {
      if($ionicPlatform.is.name.length > 0) {
        console.log($cordovaGlobalization);
        $cordovaGlobalization.getPreferredLanguage().then(
          function (result) {
            $scope.lang = result;
          },
          function (error) {
            // error
          });
      }
    });



  });

})();
