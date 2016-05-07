(function() {
  'use strict';
  angular.module('drexler.core').run(run);

  /* @ngInject */
  function run($ionicPlatform, $cordovaGlobalization, drexlerStorage, gettextCatalog, $log, DRX_DEFAULT_LANGUAGE){
    var log = $log.getInstance('drexler');

    $ionicPlatform.ready(function() {
      // Applying logic for Language from Localstorage > Language from Device > Default Language
      var languageSelected = drexlerStorage.get('language') || DRX_DEFAULT_LANGUAGE;
      if (angular.isObject(languageSelected)) { // Checking if local storage varibale for drexler exists
        log.debug('%s language from localstorage', languageSelected.id);
        gettextCatalog.setCurrentLanguage(languageSelected.id);
      } else { // If the local variable for language doesn't exists check for device language
        if ($ionicPlatform.is.name.length > 0) { // This is to just check for platform so that we don't get error on browser
          $cordovaGlobalization.getPreferredLanguage().then(
            function (deviceLang) { // Setting device language
              log.debug('%s language from device', deviceLang.value);
              languageSelected = deviceLang.value;
              gettextCatalog.setCurrentLanguage(deviceLang.value);
            },
            function (error) { // If We can not get language from device either because shit happens sometimes we go for default
              log.error('Can not detect language in device, selecting default', error);
              gettextCatalog.setCurrentLanguage(DRX_DEFAULT_LANGUAGE);
            });
        }else {
          gettextCatalog.setCurrentLanguage(DRX_DEFAULT_LANGUAGE);
        }
      }
    });
  }
})();
