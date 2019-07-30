(function (angular) {
    angular.module("SMART2").directive("gReportTooltip", ["$timeout", gTooltip]);
    function gTooltip($timeout) {
        return {
            restrict: "A",
            link: function ($scope, $el, attrs) {
                var a = $('.report-card-chart div.highcharts-tooltip').get(0);
                if ($(a).data("data-insert") != "1") {
                    $(a).insertBefore($(a).parent());
                    $(a).data("data-insert", "1");
                };
                for (var i = 0; i < $scope.gReport.point.reportData.length; i++) {
                    var dlist;
                    if (i == 0) {
                        var rcount = $scope.gReport.point.value,
                            moduleName = $scope.gReport.point.name;
                        dlist = $("<li>").html(moduleName + ' Reports (' + rcount + ') :');
                        $el.append(dlist);
                        dlist = $("<li>").html($scope.gReport.point.reportData[i].title);
                    } else {
                        dlist = $("<li>").html($scope.gReport.point.reportData[i].title);
                    }
                    
                    $el.append(dlist);
                }
            }
        }
    }
})(angular);