(function() {
  'use strict';
  angular.module('drexler.tabs').controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  });
})();
