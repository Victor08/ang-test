var twitServices = angular.module('twitServices', ['ngResource']);

twitServices.factory('Tweet', ['$resource', function($resource) {
    return $resource('/api/tweets/:id');
}]);

twitServices.factory('TweetAuth', ['$resource', function($resource) {
    return $resource('https://api.twitter.com/oauth2/token', {}, {
        get: {
            method: 'POST',
            params: {
                grant_type: 'client_credentials',
                headers: {
                    Authorization: ''
                }
            }
        }
    })
}]);