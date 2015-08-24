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
