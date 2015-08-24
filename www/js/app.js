'use strict';
// Ionic Jarvis App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'Jarvis' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Jarvis', ['ionic', 'ngResource', 'Jarvis.config', 'Jarvis.Main', 'Jarvis.Users'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'menu.html',
                controller: 'AppController'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/users');
    })
    .controller('AppController', ['$scope', function ($scope) {

    }]);

angular.module('Jarvis.Main', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.main', {
                url: '/main',
                views: {
                    'menuContent': {
                        templateUrl: 'app/main/templates/main.html',
                        controller: 'MainController'
                    }
                }
            });
    });

angular.module('Jarvis.Main')
    .controller('MainController', ['$scope', function ($scope) {
        $scope.name = "Jarvis";
    }]);
angular.module('Jarvis.Users', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.users', {
                url: '/users',
                views: {
                    'menuContent': {
                        templateUrl: 'app/users/templates/users.html',
                        controller: 'UsersController'
                    }
                }
            }).state('app.user', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'app/users/templates/profile.html',
                        controller: 'ProfileController'
                    }
                }
            })
            .state('app.register', {
                url: '/register',
                views: {
                    'menuContent': {
                        templateUrl: 'app/users/templates/register.html',
                        controller: 'RegisterController'
                    }
                }
            });
    });

angular.module('Jarvis.Users')
    .controller('UsersController', ['$scope', 'User', function ($scope, User) {
        User.query().$promise.then(function(data){
            console.log(data);
            $scope.users = data;
        });
    }]);
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
angular.module('Jarvis.Users')
    .controller('RegisterController', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
        $scope.user = {}
        $scope.errors = {}

        $scope.create = function(form){
            $scope.submitted = true
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
        }
    }]);
angular.module('Jarvis.Users')
    .factory('User', ['$resource', '$rootScope', 'Config', function($resource, $rootScope, Config){
        var service = $resource(Config.endpoint + '/users/:id');

        return service;
    }]);