/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/view1', {
            templateUrl: 'components/login/login.html',
            controller: 'LoginController'
        })
        .when('/location', {
            templateUrl: 'components/location/location.html',
            controller: 'LocationController'
        })
        .when('/home', {
            templateUrl: 'components/home/home.html',
            controller: 'HomeController'
        })
        .when('/show/:id', {
            templateUrl: 'components/show/show.html',
            controller: 'ShowController'
        })

        .otherwise({redirectTo: '/view1'});

    $locationProvider.html5Mode(true);

}]);