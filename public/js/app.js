
var tweetApp = angular.module('twitty',['ngResource', 'ngRoute', 'twitControllers', 'twitDirectives', 'twitServices' ]);

tweetApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tweets', {
            templateUrl: '/template/list/main.html',
            controller: 'userTimelineCtrl'
        })
        .when('/', {
            templateUrl: '/template/list/index.html',
            controller: 'userTimelineCtrl'
        })
}]);
