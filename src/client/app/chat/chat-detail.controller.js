(function() {
  'use strict';
  angular.module('drexler').controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  });
})();
