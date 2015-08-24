angular.module('Jarvis.Users')
    .controller('UsersController', ['$scope', 'User', function ($scope, User) {
        User.query().$promise.then(function(data){
            console.log(data);
            $scope.users = data;
        });
    }]);