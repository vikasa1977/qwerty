(function (angular) {
    'use strict';
    angular.module('SMART2')
	.controller('BaseLineCntrl', ['$scope', baseLineFn]);

    function baseLineFn($scope) {
        $scope.rsmOptions = {
            "months": [
                { "month": "Month" },
                { month: "Jan" },
                { month: "Feb" },
                { month: "Mar" },
                { month: "Apr" },
                { month: "May" },
                { month: "Jun" },
                { month: "Jul" },
                { month: "Aug" },
                { month: "Sep" },
                { month: "Oct" },
                { month: "Nov" },
                { month: "Dec" }

            ],
            "years": [
                { "year": "Year" }, { "year": "2007" }, { "year": "2009" }, { "year": "2010" }, { "year": "2011" }, { "year": "2012" }, { "year": "2013" }, { "year": "2014" }, { "year": "2015" }, { "year": "2016" }, { "year": "2017" }, { "year": "2018" }, { "year": "2019" }, { "year": "2020" }, { "year": "2021" }, { "year": "2022" }, { "year": "2023" }, { "year": "2024" }, { "year": "2025" }
            ]
        };
        $scope.rsmModel = {
            month: $scope.rsmOptions.months[0],
            lmonth: $scope.rsmOptions.months[0],
            year: $scope.rsmOptions.years[0],
            lyear: $scope.rsmOptions.years[0]
        };
        $scope.monthChange = function (d) { }
        $scope.yearChange = function (d) { }
        // Baseline RP settings	    
        $scope.baselineRPOpt = {
            "options": [
                { "opt": "Month" },
                { "opt": "Year" }
            ]
        };
        $scope.baselineRP = {
            value: "",
            unit: $scope.baselineRPOpt.options[0]
        };

        $scope.baselineOptions = [
            { "code": "Ys", "title": "Yes" },
            { "code": "No", "title": "No" },
            { "code": "Na", "title": "N/A" }
        ];
        $scope.baseline = $scope.baselineOptions[0];

    }
})(angular);
