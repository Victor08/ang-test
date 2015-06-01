var twitServices = angular.module('twitServices', ['ngResource']);

twitServices.factory('UserTimeline', ['$resource', function($resource) {
    return $resource('/twitterapi/statuses/user_timeline.json?heyman=whatsup&wtf=good', {}, {
        get: {
            method: 'GET'
        }
    });
}]);