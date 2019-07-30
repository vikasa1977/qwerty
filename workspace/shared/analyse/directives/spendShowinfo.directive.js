(function (angular) {
    "use strict";
    angular.module("SMART2").directive("spendShowinfo", ["$timeout", spendShowinfo]);
    var html = '<table class="tip-table">' +
      	            '<tr class="tip-row">' +
          	            '<td class="tip-col-th">{{tooltipData.for == "region" ? "Region" : "Supplier Name"}}</td>' +
          	            '<td class="tip-col-th">Cost</td>' +
      	            '</tr>' +
      	            '<tr class="tip-row" ng-repeat="data in tooltipData.records">' +
          	            '<td class="tip-col-td">{{data.title}}</td>' +
          	            '<td class="tip-col-td">{{data.spend | currency }}</td>' +
      	            '</tr>' +
  	            '</table>';
    function spendShowinfo($timeout) {
        return {
            restrict: "E",
            scope: {
                tooltipData : "="
            },
            link: function ($scope, $el, $attrs) {
                $timeout(function () {
                    $scope.tooltipData.init = true;
                    $scope.tooltipData.tooltip = $el.html();
                });
            },
            template: html
        }
    }
})(angular);