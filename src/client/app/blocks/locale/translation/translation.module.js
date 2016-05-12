(function(){
  'use strict';

  var translation = angular.module('drexler.translation', ['gettext']);

  translation.run(function () {
    //Enable a debugging mode to clearly indicate untranslated strings:
    //gettextCatalog.debug = true;
  });




}());
