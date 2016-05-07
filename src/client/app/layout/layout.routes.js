(function() {
    'use strict';

    angular.module('drexler.layout').run(coreRun);

    /* @ngInject */
    function coreRun(routerHelper) {
      routerHelper.configureStates(getStates(),'/dashboard');
    }

    ///////

    function getStates(){
      return [
        {
          state: 'drexler',
          config : {
            abstract: true,
            views :  {
              header : {
                templateUrl : 'app/layout/header.html'
              },
              sidebar : {
                templateUrl : 'app/layout/sidebar.html'
              }
            }
          }
        },
        {
          state : 'drexler.dashboard',
          config : {
            url : '/dashboard',
            views : {
              content : {
                templateUrl : 'app/layout/defaultContent.html'
              }
            }
          }
        }
      ];
    }
})();
