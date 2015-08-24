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
