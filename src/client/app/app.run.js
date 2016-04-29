(function() {
  'use strict';
  angular.module('drexler')
    .run(run);

  function run($ionicPlatform,$cordovaGlobalization, drexlerStorage, gettextCatalog){

    // Coding with love :A
    $ionicPlatform.ready(function() {
      // Applying logic for Language from Localstorage > Language from Device > Default Language :A
      if (drexlerStorage.get('language')) { // Checking if local storage varibale for drexler exists :A
        gettextCatalog.setCurrentLanguage(drexlerStorage.get('language').id);
      }
      else { // If the local variable for language doesn't exists check for device language :A
        if ($ionicPlatform.is.name.length > 0) { // This is to just check for platform so that we don't get error on borwser :A
          $cordovaGlobalization.getPreferredLanguage().then(
            function (deviceLang) { // Setting device language :A
              gettextCatalog.setCurrentLanguage(deviceLang.value);
            },
            function (error) { // If We can not get language from device either because shit happens sometimes we go for default :A
              gettextCatalog.setCurrentLanguage('en-EN'); // We will move this drexler constants :A
            });
        }
      }
      // EO - Language selection :A
    });

  }
})();
