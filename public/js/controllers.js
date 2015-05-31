'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',[]);

twitControllers.controller('resourceCtrl', function($scope, Tweet) {

});

twitControllers.controller('userTimelineCtrl', ['$scope', '$http', 'UserTimeline', function($scope, $http, resource){
    console.log('user timeline ctrl');
    $scope.list = resource.get();
    $scope.test = 'ololo';
    $scope.cool = 123123;

}]);

twitControllers.controller('deleteCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);