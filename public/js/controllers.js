'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',[]);

twitControllers.controller('resourceCtrl', function($scope, Tweet) {

});

twitControllers.controller('userTimelineCtrl', ['$scope', 'ApplicationRequestTweets', function($scope, Search){
    console.log('user timeline ctrl');

    $scope.twitterSearch = '';
    //$scope.tweets = {};

    var getTwitterSearch = function(query){
        return Search.get({query: 'q=' + query});
    };

    $scope.launchSearch = function(){
        var response = Search.get({query: 'q=' + $scope.twitterSearch});
        $scope.tweets = response;
        console.log('scope tweets', $scope.tweets, '\n', response);
    };



}]);

twitControllers.controller('userRequestCtrl', ['$scope', 'UserRequestTweets', function($scope, UserRequestTweets) {
    var getUserRequest = function(query) {
        return UserRequestTweets.get({query: 'q=' + query});
    };

    $scope.launchSearch = function(){
        var response = UserRequestTweets.get({query: 'screen_name=' + $scope.twitterSearch});
        $scope.tweets = response;
        console.log('scope tweets', $scope.tweets, '\n', response);
    };
}]);

twitControllers.controller('deleteCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);


//twitControllers ('twtterNPMCtrl', ['$scope', ''])

twitControllers.controller('horizontalMenuCtrl', ['$scope', '$location', 'myConfig', function ($scope, $location, Config) {
    var location = $location.path();
    $scope.menuItems = Config.menu;
    _.each($scope.menuItems, function(item, key){
         if (location.indexOf(item.route) > -1) {
             $scope.menuItems.active = true;
         }
    });

    console.log('scope menu items', $scope.menuItems);


} ]);