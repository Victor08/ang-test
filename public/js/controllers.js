'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',[]);

twitControllers.controller('resourceCtrl', function($scope, Tweet) {

});

twitControllers.controller('listCtrl', ['$scope', '$http', function($scope, $http){
    console.log('list ctrl');
    $scope.cool = 'follow the white rabbit';
}]);

twitControllers.controller('deleteCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);