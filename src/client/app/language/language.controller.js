(function() {
  'use strict';
  angular.module('drexler').controller('LanguageCtrl', function($scope, gettextCatalog, $localStorage) {
    $scope.data = {
      availableOptions: [
        {id: 'en', name: 'English'},
        {id: 'es', name: 'Spanish'}
      ],
      selectedOption: $localStorage.language //This sets the default value of the select in the ui
    };
    $scope.changeLang = function () {
      $localStorage.language = $scope.data.selectedOption;
      location.reload();
    }
  });
})();
