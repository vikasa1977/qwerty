(function (angular, SmartController) {
    "use strict";
    SmartController.create("spendDashboard", ["$scope", "$timeout", "$compile", spendDashboardCard]);

    function spendDashboardCard($scope, $timeout, $compile) {
        
            //$scope.smartDate = '1 000 000,00';

            //en-US, en-AU, zh-CHS, zh-CN, ja-JP, ko-KR, th-TH -------------- 1,000,000.00
            //nl-NL, de-DE, it-IT, pt-PT, es-ES ---------------- 1.000.000,00
            //fr-FR, ru-RU ------------------- 1 000 000,00
        
            //$scope.cultureCode = "ru-RU";
        
        $scope.data = {
            region: {
                cost: "$2596.65 MM",
                count: 5,
                for : "region",
                init : false,
                records: [{
                    title: "North America",
                    spend: "1986289"
                }, {
                    title: "Europe",
                    spend: "1291765"
                }, {
                    title: "Asia",
                    spend: "750324"
                }, {
                    title: "South America",
                    spend: "508201.91"
                }, {
                    title: "Australia",
                    spend: "26934"
                }]
            },
            supplier: {
                cost: "$259 MM",
                count: 5,
                for: "supplier",
                init : false,
                records: [{
                    title: "Thomson Reuters LLC",
                    spend: "1982"
                }, {
                    title: "Lenovo India",
                    spend: "26934"
                }, {
                    title: "IBM Ltd",
                    spend: "1291"
                }, {
                    title: "Hitachi Automobile",
                    spend: "7032"
                }, {
                    title: "Abens Vending LLC",
                    spend: "50820"
                }]
            }
        };
        $scope.buildTooltip = function (data) {
            var Obj = toScope($scope, data);
            Obj.cost = function (records) {
                var cost = 0;
                for (var i = 0; i < records.length; i++) {
                    cost += Number(records[i].spend);
                }
                return cost;
            }(Obj.records);
            $compile("<spend-showinfo tooltip-data='" + data + "'></spend-showinfo>")($scope);
        };
        $scope.buildTooltip("data.region");
        $scope.buildTooltip("data.supplier");
        
        function toScope(scope, findScope) {
            var scopeSplit = findScope.split("."),
                scope ;
            for (var i = 0; i < scopeSplit.length; i++) {
                if (scope[scopeSplit[i]] !== undefined) {
                    scope = scope[scopeSplit[i]];
                } else {
                    break;
                }
            };
            return scope;
        };

        $scope.seriesData = [300, 100, 400, 500, 200];
        $scope.highchartConfig = {
            barGraph: {
                options: {
                    chart: {
                        backgroundColor: 'transparent',
                        spacingBottom: 0,
                        spacingTop: 0,
                        spacingLeft: 0,
                        spacingRight: 0,
                        height: 150
                    },
                    xAxis: {
                        lineWidth: 0,
                        tickLength: 0,
                        gridLineWidth: 0,
                        offset: 0,
                        tickInterval: 1,
                        labels: {
                            enabled: true,
                            rotation: -45,
                        },
                        categories: ['Direct', 'inDirect', 'Logistics', 'Travel', 'MRO']
                    },
                    yAxis: {
                        visible: false
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        scatter: {
                            lineWidth:0,
                            marker: {
                                enabled: true,
                                symbol: 'circle',
                                fillColor: "#e67300",
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        },
                        series: {
                            pointWidth: 1
                        },
                        column: {
                            borderWidth: 0
                        }
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        borderColor: '#bbb',
                        shadow: false,
                        borderRadius: 5,
                        formatter: function () {
                            console.log(this);
                            if (this.point.series.userOptions.type == 'column') {
                                return false;
                            } else {
                                return "$" + this.y +" M";
                            }
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
                    type: 'column',
                    data: $scope.seriesData,
                    color: "#e67300"
                }, {
                    type: 'scatter',
                    data: $scope.seriesData,
                    marker: {
                        radius: 4
                    },
                    color: "#e67300"
                }]
            }
        }
    }
})(angular, SmartController);