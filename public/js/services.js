var twitServices = angular.module('twitServices', ['ngResource']);

twitServices.factory('UserTimeline', ['$resource', function($resource) {

    return $resource('/twitterapi/statuses/user_timeline.json', {}, {
        get: {
            method: 'GET'
        }
    });
}]);

twitServices.factory('SearchTweets', ['$resource', function($resource) {
    return $resource('/twitterapi/search/tweets.json?:query', {}, {
        get: {
            method: 'GET'
        }
    })
}]);

