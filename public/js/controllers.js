'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',[]);

twitControllers.controller('resourceCtrl', function($scope, Tweet) {

});

twitControllers.controller('userTimelineCtrl', ['$scope', '$http', 'UserTimeline', 'SearchTweets', function($scope, $http, resource, search){
    console.log('user timeline ctrl');

    $scope.twitterSearch = '';
    $scope.tweets = {};

    var getTwitterSearch = function(query){
        return search.get({query: 'q=' + query});
    };

    var renderTwitterSearch = function(response) {
        console.log(response);
    };

    $scope.launchSearch = function(){
        var response = search.get({query: 'q=' + $scope.twitterSearch})
        renderTwitterSearch(response);
    };



}]);

twitControllers.controller('deleteCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);