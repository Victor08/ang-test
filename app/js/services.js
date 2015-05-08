var twitServices = angular.module('twitServices', ['ngResource']);

twitServices.factory('Tweet', ['$resource', function($resource) {
    return $resource('/api/tweets/:id');
}]);