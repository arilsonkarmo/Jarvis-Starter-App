angular.module('Jarvis.Users')
    .factory('User', ['$resource', '$rootScope', 'Config', function($resource, $rootScope, Config){
        var service = $resource(Config.endpoint + '/users/:id');

        return service;
    }]);