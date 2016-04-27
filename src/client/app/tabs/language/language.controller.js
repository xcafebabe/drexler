(function() {
  'use strict';
  angular.module('drexler.tabs').controller('LanguageCtrl', function($scope, gettextCatalog, drexlerStorage, CONST_LANGUAGE) {
    $scope.data = {
      availableOptions: CONST_LANGUAGE,
      selectedOption: drexlerStorage.get('language') //This sets the default language from the local storage :A
    };
    $scope.changeLang = function () {
      drexlerStorage.set('language',$scope.data.selectedOption);
      location.reload();
    }
  });
})();
