(function (angular) {
    "use strict";
    angular.module("SMART2")
        .controller("gReport", ["$scope", "$compile", gReportCard]);
    
    function gReportCard($scope, $compile) {
        var chartObj;
        $scope.modules = [{
            name: 'PROJECTS',
            value: 60,
            color:'#9577db',
            data: [
                { title: "Comparative View - Estimated Timings" },
                { title: "Milestone & Activity Tracking..." }
            ]
        }, {
            name: 'SOURCING',
            value: 90,
            color: "#667985",
            data: [
                { title: "Comparative View - Estimated Timings" },
                { title: "Milestone & Activity Tracking" },
                { title: "Savings Target Progress" },
                { title: "Estimated vs. Negotiated Savings..." }
            ]
        }, {
            name: 'SUPPLIER',
            value: 35,
            color: "#5a68c8",
            data: [
                { title: "Comparative View - Estimated Timings" },
                { title: "Milestone & Activity Tracking" },
                { title: "Savings Target Progress" },
                { title: "Estimated vs. Negotiated Savings..." }
            ]
        }, {
            name: 'PROCUREMENT',
            value: 47,
            color: "#71a044",
            data: [
                { title: "Comparative View - Estimated Timings" },
                { title: "Savings Target Progress" },
                { title: "Estimated vs. Negotiated Savings..." }
            ]
        }, {
            name: 'PLATFORM',
            value: 50,
            color: "#da7800",
            data: [
                { title: "Comparative View - Estimated Timings" },
                { title: "Milestone & Activity Tracking" },
                { title: "Savings Target Progress" },
                { title: "Estimated vs. Negotiated Savings" },
                { title: "Savings Target Progress..." }
            ]
        }, {
            name: 'CONTRACT',
            value: 100,
            color: "#0097a7",
            data: [
                { title: "Comparative View - Estimated Timings" },
                { title: "Milestone & Activity Tracking" },
                { title: "Savings Target Progress" },
                { title: "Estimated vs. Negotiated Savings..." }
            ]
        }, {
            name: 'REQUEST',
            value: 120,
            color: "#e53935",
            data: [
                { title: "Comparative View - Estimated Timings" },
                { title: "Milestone & Activity Tracking" },
                { title: "Savings Target Progress" },
                { title: "Estimated vs. Negotiated Savings..." }
            ]
        }];
        $scope.getTotal = function () {
            var t = 0;
            for (var i = 0; i < $scope.modules.length; i++) {
                t += $scope.modules[i].value;
            }
            return t;
        }();
        $scope.getPercent = function (val) {
            var percent = (val / $scope.getTotal) * 100;
            return percent;
        }

        $scope.chartSeriesData = function () {
            var data = [];
            for (var i = 0; i < $scope.modules.length; i++) {
                var module = $scope.modules[i];
                data.push({
                    y: $scope.getPercent(module.value),
                    name: module.name,
                    value: module.value,
                    color: module.color,
                    reportData : module.data
                });
            }

            return data;
        }
        
        $scope.chart = {
            options: {
                chart: {
                    renderTo: '.analyse-card.gReoprt',
                    backgroundColor: 'transparent',
                    type: 'pie',
                    spacingBottom: 0,
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                    height: 220,
                    events: {
                        load: function () {
                            chartObj = this;
                        }
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false
                        }
                    },
                    series: {
                        states: {
                            hover: {
                                enabled: true,
                                halo: {
                                    size: 6
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    useHTML: true,
                    formatter: function () {
                        $scope.gReport = this;
                        var html = $compile("<div><ul class='grpt-tip' g-report-tooltip></ul></div>")($scope);
                        return html.html();
                    },
                    positioner: function (labelWidth, labelHeight, point) {
                        var tooltipX, tooltipY, el = $(".report-card-chart .highcharts-tooltip");
                        labelWidth = el.outerWidth();
                        labelHeight = el.outerHeight();
                        if (point.plotX + labelWidth > chartObj.plotWidth) {
                            tooltipX = point.plotX + chartObj.plotLeft - labelWidth - 20;
                        } else {
                            tooltipX = point.plotX + chartObj.plotLeft + 20;
                        }

                        tooltipY = point.plotY + chartObj.plotTop - 20;
                        if (tooltipX < 0) {
                            tooltipY += 50;
                            tooltipX = 10;
                            if (point.plotY > labelHeight + 20) tooltipY -= labelHeight + 50;
                            if (point.plotX > labelWidth) tooltipX = point.plotX - (labelWidth - 10);
                        }
                        return {
                            x: tooltipX,
                            y: tooltipY
                        };
                    }
                },
                credits: {
                    enabled: false
                }
            },
            title: {
                text: ""
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: $scope.chartSeriesData()
            }]
        };

        $scope.hoverPieChart = function (e, index) {
            //chartObj.series[0] is nessesory 
            if (e.type == 'mouseenter') {
                //chartObj.series[0].data[index].onMouseOver();
            } else {
                //chartObj.series[0].data[index].onMouseOut()
            }
        }
    }
})(angular);

//.series["0"].data["0"].onMouseOver