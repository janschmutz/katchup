/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlHome', ['ngStorage','ngMaterial','myModel']).controller('HomeController', function($rootScope, $scope, $localStorage ,$sessionStorage,httpFactory) {

    $scope.date = $localStorage.date;
    console.log($scope.date);
    var mylong = $localStorage.location.longitude;
    var mylat = $localStorage.location.latitude;
    getLocation(mylong.toString(),mylat.toString());

    $scope.myevents = "Events";

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

    function getLocation(lat,long) {
        httpFactory.getLocation(lat,long)
            .then(function (response) {
                $scope.myevents = response.data;
            }, function (error) {
                console.log(error.message);
            });
    }
    function getEvents() {                       //Alle Events vom Server abfragen
        httpFactory.getEvents()
            .then(function (response) {            //Asynchron mit Promise
                $scope.events = response.data;
                console.log(response.data);
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    function updateEvents(event) {                 //update Event -> falls Event nicht existiert, wird per upsert neues Event erstellt
        httpFactory.updateEvent(event)
            .then(function (response) {
                $scope.status = 'Event successfully updated';
            }, function (error) {
                $scope.status = 'Unable to update customer data: ' + error.message;
            });
    }
    function insertEvent(event) {      //Event an den Server schicken (manuell-> besser update, Doppelte Events möglich)
        httpFactory.insertEvent(event)
            .then(function (response) {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
            }, function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
    }

});