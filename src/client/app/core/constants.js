(function(){
  'use strict';
  angular.module('drexler.core')
    .constant('DRX_LANGUAGE',[
      {id: 'en_US', name: 'English'},
      {id: 'es_ES', name: 'Spanish'},
      {id: 'de_DE', name: 'German'}
    ])
    .constant('DRX_DEFAULT_LANGUAGE','en_US')
    .constant('DRX_DEFAULT_URL', '/dashboard');
})();
