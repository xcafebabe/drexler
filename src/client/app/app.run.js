(function() {
  'use strict';
  angular.module('drexler')
    .run(run);

  function run($ionicPlatform,$cordovaGlobalization){

    // Set Application Default Language :A
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


  }
})();
