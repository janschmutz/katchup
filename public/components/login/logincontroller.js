/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('LoginController', ['myModel']).controller('LoginController', function($rootScope, $scope, $location, test) {

    $scope.tagline = 'Facebook Login';
    $scope.test = test.getUsers();
    console.log($scope.test);
    $scope.testFunc = $rootScope.rootFunc;

});