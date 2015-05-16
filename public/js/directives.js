var twitDirectives = angular.module('twitDirectives',[]);

twitDirectives.directive('mainHeader', function(){
    return {
        templateUrl: 'template/elements/main-header.html',
        transclude: true,
        restrict: 'E'
    };
});