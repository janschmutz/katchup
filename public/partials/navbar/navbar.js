/**
 * Created by janschmutz on 12.10.17.
 */
angular.module("navbar", []).component("nav", {
    controller: function () {
        console.log("component loaded");
    },
    templateUrl: "navbar.html"
});