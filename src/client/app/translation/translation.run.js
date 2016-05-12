angular.module('drexler.translation').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('de_DE', {"About app":"Über app","HI":"HALLO","Hello World":"Hallo Welt","Settings":"Konfiguration","Share app":"Share app","Test":"Test"});
    gettextCatalog.setStrings('en_US', {"About app":"About app","HI":"HI","Hello World":"Hello World","Settings":"Settings","Share app":"Share app","Test":"Test"});
    gettextCatalog.setStrings('es_ES', {"About app":"Sobre app","HI":"HOLA","Hello World":"Hola Mundo","Settings":"Preferencias","Share app":"Compartir app","Test":"Prueba"});
/* jshint +W100 */
}]);