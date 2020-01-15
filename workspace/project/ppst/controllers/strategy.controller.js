(function () {
    'use strict';
    angular.module('SMART2')
    .controller('StrategyCntrl', ['$scope', strategyFn]);

    // Controller function
    function strategyFn($scope) {
        var vm = this;

        // Strategy options

        vm.strategyOptions = [
            {
                "strategyId": "strategy1",
                "title": "Project strategy 1"
            },
            {
                "strategyId": "strategy2",
                "title": "Project strategy 2"
            },
            {
                "strategyId": "strategy3",
                "title": "Project strategy 3"
            },
            {
                "strategyId": "strategy4",
                "title": "Project strategy 4"
            }
        ];
        vm.selectedStrategy = [vm.strategyOptions[0]];
    }
})(angular);