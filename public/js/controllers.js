'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',[]);

twitControllers.controller('resourceCtrl', function($scope, Tweet) {

});

twitControllers.controller('userTimelineCtrl', ['$scope', '$http', 'UserTimeline', 'SearchTweets', function($scope, $http, resource, search){
    console.log('user timeline ctrl');
    //$scope.list = resource.get() || 'error';
    $scope.search = search.get();
    console.log('scope search', $scope.search);
    $scope.test = 'ololo';
    $scope.cool = 123123;

}]);

twitControllers.controller('deleteCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);