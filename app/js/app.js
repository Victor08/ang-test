
var tweetApp = angular.module('twitty',['ngResource', 'ngRoute', 'twitControllers', 'twitDirectives' ]);

tweetApp.config([$routeProvider, function($routeProvider){
    $routeProvider
        .when('/tweets', {
            templateUrl: 'list/main.html',
            controller:
        })
}])
