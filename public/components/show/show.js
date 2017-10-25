/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlShow', ['ngStorage','ngMaterial','myModel']).controller('ShowController', function($rootScope, $scope, $localStorage ,$sessionStorage,httpFactory, $routeParams) {
    $scope.date = $localStorage.date;

    var mylong = $localStorage.location.longitude;
    var mylat = $localStorage.location.latitude;
    getEvent($routeParams.id);

    $scope.event = "Events";

    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
    $scope.options = {scrollwheel: false};
    var events = {
        places_changed: function (searchBox) {
            var place = searchBox.getPlaces();
            $scope.location.latitude = place[0].geometry.location.lat();
            $scope.location.longitude = place[0].geometry.location.lng();
        }
    }
    $scope.searchbox = { template:'searchbox.tpl.html', events:events, parentdiv:'searchBoxParent'};

    function getEvent(id) {                       //Alle Events vom Server abfragen
        httpFactory.getEvent(id)
            .then(function (response) {            //Asynchron mit Promise
                $scope.event = response.data;
                console.log(response.data);
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

});