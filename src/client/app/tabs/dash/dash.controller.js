(function(){
  'use strict';
  angular.module('drexler.tabs').controller('DashCtrl', function($scope, $log,logger,$cordovaGlobalization, $ionicPlatform , $cordovaGeolocation, $cordovaDeviceMotion, gettextCatalog) {

    var globalLogger = $log.getInstance('Global');
    var dashLogger = $log.getInstance('Dash');


    // Geo location Test
    $cordovaGeolocation.getCurrentPosition().then(function (value) {
      console.log("Geolocation Test:",value);
    },function (err) {
      console.log(err);
    });


    // Device motion Test
    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
      console.log("Device Motion Test:",result);
    }, function(err) {
      // An error occurred. Show a message to the user
    });


    globalLogger.info('This is a global log');
    dashLogger.info('This is a dash log');
    $scope.lang = gettextCatalog.getCurrentLanguage()



  });

})();
