angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('es', {"Hello World":"Hola Mundo","HI":"﻿Hola.","Test":"Prueba"});
/* jshint +W100 */
}]);