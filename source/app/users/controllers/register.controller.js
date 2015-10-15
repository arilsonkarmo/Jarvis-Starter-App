angular.module('Jarvis.Users')
    .controller('RegisterController', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
        $scope.user = {};
        $scope.errors = {};

        $scope.create = function(form){
            $scope.submitted = true;
            if(form.$valid){
                $ionicPopup.alert({
                    title: 'Register',
                    template: 'Register ok, thanks.',
                    buttons: [
                        {
                            text: 'close',
                            type: 'btn-positive'
                        }
                    ]
                });
            }
        };
    }]);
