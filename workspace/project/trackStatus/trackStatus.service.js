(function (angular) {
    'use strict';
    angular.module('SMART2').service('trackStatusService1', function ($http, $q) {
        var self = this;
        self.getData = function (a_data) {
           var promise = a_data.map(function (item) {
                return $http({
                    'method': 'GET',
                    'url' : item.url
                })
           });
           return $q.all(promise);
        }

        // Watch the change of main object
        self.statusDataChange = { 'dataChange': '' };
        self.dataChange = function () {
            self.statusDataChange['dataChange'] = new Date().getTime();
        }
        self.getChange = function () {
            return self.statusDataChange['dataChange'];
        }
    });
})(angular);