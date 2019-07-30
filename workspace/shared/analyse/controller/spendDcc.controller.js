(function (angular, SmartController) {
    "use strict";
    SmartController.create("spendDcc", ["$scope", spendDccCard]);

    function spendDccCard($scope) {
        var process = {
            FTP: "FTP",
            DCC: "DCC",
            AI: "AI",
            SP: "SP",
            QA: "QA",
            RF: "RF"
        };
        var myProcess = process.SP; // selected process
        $scope.currentSpendProcess = process.SP;
        $scope.actions = [{
            "key": "Execute New",
            "value": ""
        }];
        $scope.jobTitle = "Job Title";
        $scope.getStatus = function (a) {
            var config;
            //  if (myProcess == process.DCC) {
            config = {
                0: { class: "dcc-complete", color: "#268406", icon: "#icon_Process_Complete", title: "COMPLETED" },
                1: { class: "dcc-inProgress", color: "#ea983e", icon: "#icon_Process_InProgress", title: "In Progress" },
                2: { class: "dcc-incomplete", color: "#eee", icon: "", title: "Incomplete" },
                3: { class: "dcc-error", color: "#d63d3d", icon: "#icon_Close", title: "ERROR" }
            }
            // }
            return config[a];
        }

        $scope.processes = [{
            name: process.FTP,
            status: 0
        }, {
            name: process.DCC,
            status: 0,
            data: {
                progress: 75,
                spend: 1000,
                transactionCount: 2.5,
                fileCount: 34
            }
        }, {
            name: process.SP,
            status: 1,
            data: {}
        }, {
            name: process.AI,
            status: 2
        }, {
            name: process.QA,
            status: 2
        }, {
            name: process.RF,
            status: 2
        }];

        $scope.mainProcess = function (allProcesss) {
            var a;
            for (var i = 0; i < allProcesss.length; i++) {
                if (allProcesss[i].name == myProcess) {
                    a = allProcesss[i];
                    a.config = $scope.getStatus(a.status);
                    break;
                }
            }
            return a;
        }($scope.processes);
        $scope.ErrorStage = 4;
        $scope.stagesMax = 5;
        $scope.stages = 3;
        if ($scope.processes[1].status === 3) {
            $scope.stages = $scope.stagesMax;
        }
        var chartData = function () {
            var process = $scope.mainProcess,
                processCompleted = process.status == 0 ? process.data.progress = 100 : process.data.progress,
                dt = [{
                    y: ($scope.stages / $scope.stagesMax * 100), color: process.config.color
                }, {
                    y: 100 - ($scope.stages / $scope.stagesMax * 100), color: "#ccc"
                }];
            if ($scope.currentSpendProcess == "SP") {
                  if ($scope.processes[2].status === 0) {
                    dt = [{
                        y: 100, color: process.config.color
                    }];
                } else if ($scope.processes[2].status === 3) {
                    dt = [{
                        y: 100, color: process.config.color
                    }];
                } else if ($scope.processes[2].status === 1) {
                    dt = [{
                        y: 50, color: process.config.color
                    }, {
                        y: 50, color: "#ccc"
                    }];
                }
             }

            return dt;
        };
        $scope.chart = {
            options: {
                chart: {
                    renderTo: '.file-guage',
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    spacingBottom: 0,
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                    plotShadow: false,
                    height: 135,
                    backgroundColor: "transparent"
                },
                plotOptions: {
                    pie: {
                        size: 135,
                        dataLabels: {
                            enabled: false
                        },
                        states: {
                            hover: false
                        },
                        borderWidth: 0,
                        startAngle: 180
                    }
                },
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }
            },
            title: {
                text: ""
            },
            series: [{
                type: 'pie',
                innerSize: '92%',
                data: chartData()
            }]
        };
    }
})(angular, SmartController);
