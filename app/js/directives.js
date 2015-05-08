var twitDirectives = angular.module('twitDirectives',[]);

twitDirectives.directive('mainHeader', function(){
    return {
        templateUrl: 'templates/layout/main-header.html',
        transclude: true,
        restrict: 'E'
    };
});