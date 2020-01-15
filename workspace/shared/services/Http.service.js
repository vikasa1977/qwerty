(function(angular) {
    'use strict';
    angular
        .module('SMART2')
        .service('httpService', ['$http', '$q', 'APPCONSTANTS', httpService]);

    function httpService($http, $q, APPCONSTANTS) {
        this.post = post;
        this.directhttp = directhttp;

        function directhttp(allConfig) {
            var def = $q.defer();
            var allConfigParams = {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "UserExecutionContext": JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails)
                }
            };
            angular.extend(allConfigParams, allConfig);

            $http(allConfigParams)
                .success(function(data, status) {
                    def.resolve(data);
                    // alert('got data');
                })
                .error(function(errorData) {
                    def.reject(errorData);
                });

            return def.promise;

        }

        function post(url, qsData) {
            var def = $q.defer();

            $http.post(url, qsData)
                .success(function(data, status) {
                    def.resolve(data);
                    // alert('got data');
                })
                .error(function (errorData) {
                    def.reject(errorData);
                });

            return def.promise;
        }
    }
})(angular);
