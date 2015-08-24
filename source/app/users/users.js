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
