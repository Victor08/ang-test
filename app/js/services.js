angular.module('twitServices').factory('Tweet', function($resource) {
    return $resource('/api/tweets/:id');
});