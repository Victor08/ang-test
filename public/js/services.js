var twitServices = angular.module('twitServices', ['ngResource']);

twitServices.factory('ApplicationRequestTweets', ['$resource', function($resource) {
    return $resource('/twitterapi/search/tweets.json?:query', {}, {
        get: {
            method: 'GET'
        }
    })
}]);

twitServices.factory('UserRequestTweets', ['$resource', function($resource){
    return $resource('/twitterapi/statuses/user_timeline.json?:query', {}, {
        get: {
            method: 'GET',
            isArray: true
        }
    })
}]);

