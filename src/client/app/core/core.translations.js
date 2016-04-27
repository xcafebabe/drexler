angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {

    gettextCatalog.setStrings('es', {"Hello World":"Hola Mundo"});

}]);
