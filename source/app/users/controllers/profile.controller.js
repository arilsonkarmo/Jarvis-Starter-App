angular.module('Jarvis.Users')
    .controller('ProfileController', ['$scope', '$ionicTabsDelegate', function ($scope, $ionicTabsDelegate) {
        $scope.profile = {
            name: "Jarvis",
            email: 'imnotabot@starkcorp.io'
        };

        $scope.selectTabWithIndex = function(index) {
            $ionicTabsDelegate.select(index);
        }
    }]);