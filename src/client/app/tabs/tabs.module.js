(function(){

  angular.module('drexler.tabs', [])
    .config(configuration)
    .run(run);


  function configuration($stateProvider, $urlRouterProvider){

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/tabs/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'app/tabs/dash/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'app/tabs/chat/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'app/tabs/chat/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'app/tabs/account/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.lang', {
        url: '/lang',
        views: {
          'tab-lang': {
            templateUrl: 'app/tabs/language/tab-lang.html',
            controller: 'LanguageCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');
  }

  function run($ionicPlatform, gettextCatalog, drexlerStorage, $cordovaGlobalization) {

    //This is just an example for agnular get text translation , in futre we will move this in a separate module :A
    gettextCatalog.setStrings('es-ES', {"Hello World":"Hola Mundo"});



    $ionicPlatform.ready(function() {

      

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

}());
