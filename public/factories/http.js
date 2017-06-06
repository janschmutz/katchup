/**
 * Created by janschmutz on 04.04.17.
 */
angular.module('NerdService', []).factory('Nerd', function ($q, $http) {
    return {
        getNerd: function () {
            var deferred = $q.defer(),
                httpPromise = $http.get('/api/test');

            httpPromise.success(function (components) {
                deferred.resolve(components);
            })
                .error(function (error) {
                    console.error('Error: ' + error);
                });

            return deferred.promise;
        }
    };
});