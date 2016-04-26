(function() {
  'use strict';
  angular.module('drexler').controller('LanguageCtrl', function($scope, gettextCatalog, drexlerStorage) {
    $scope.data = {
      availableOptions: [
        {id: 'en-US', name: 'English'},
        {id: 'es-ES', name: 'Spanish'}
      ],
      selectedOption: drexlerStorage.get('language') //This sets the default language from the local storage :A
    };
    $scope.changeLang = function () {
      drexlerStorage.set('language',$scope.data.selectedOption);
      location.reload();
    }
  });
})();
