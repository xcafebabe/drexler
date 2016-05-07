(function(){
  'use strict';
  angular.module('drexler.core')
    .constant('DRX_LANGUAGE',[
      {id: 'en-US', name: 'English'},
      {id: 'es-ES', name: 'Spanish'}
    ])
    .constant('DRX_DEFAULT_LANGUAGE','en-US');
})();
