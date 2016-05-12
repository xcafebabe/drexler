(function() {
  'use strict';

  angular.module('drexler.core').controller('LanguageCtrl', Controller);

  /* @ngInject */
  function Controller(drexlerStorage, DRX_LANGUAGE) {
    var vm = this;
    vm.data = {
      availableOptions: DRX_LANGUAGE,
      selectedOption: drexlerStorage.get('language') //This sets the default language from the local storage :A
    };
    vm.changeLang = function () {
      drexlerStorage.set('language',vm.data.selectedOption);
      location.reload();
    };
  }
})();
