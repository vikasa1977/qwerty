(function (angular, SmartController) {
    "use strict";
    SmartController.create("dashboardCard", ["$scope", dashboardCard]);

    function dashboardCard($scope) {
        $scope.modulesData = [[{
            name: 'Projects',
            values: {
                realized: 45,
                projected: 65
            },
            isEnabled:true
        }, {
            name: 'CPO',
            values: {
                spend: 57,
                suppliers: 21,
                contracts: 665
            },
            isEnabled: true
        }], [{
            name: 'Suppliers',
            values: {
                suppliers: 450
            },
            isEnabled: true
        }, {
            name: 'Procurement',
            values: {
                suppliers: 23,
                orders: 456,
                invoice: 74,
                procurement_spend: 466
            },
            isEnabled: true
        }], [{
            name: 'Contract',
            values: {
                suppliers: 485,
                contracts: 78,
                cost :45
            },
            isEnabled: true
        }, {
            name: 'Sourcing',
            values: {
                events: 45,
                savings: 78,
                spends: 123
            },
            isEnabled: true
        }]];
        
        $scope.getModule = function (moduleName) {
            for (var i = 0; i < $scope.modulesData.length; i++) {
                for (var p = 0; p < $scope.modulesData[i].length; p++) {
                    if ($scope.modulesData[i][p].name == moduleName) {
                        return $scope.modulesData[i][p];
                    }
                }
            }
        };
        var projectsModule = $scope.getModule("Projects");
        $scope.chart = {
            options: {
                chart: {
                    backgroundColor : 'transparent',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    spacingBottom: 0,
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                    height: 90,
                    width: 90
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
                                enabled: false,
                                halo: {
                                    size: 0
                                }
                            }
                        }
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
                name: '',
                colorByPoint: true,
                data: [{ y: projectsModule.values.projected, color: '#757575' }, { y: projectsModule.values.realized, color: '#88c442' }]
            }]
        }
        $scope.mapModuleClass = function (moduleName) {
            var cls = {
                Projects: { class: "project-content", disabled_icon: "#icon_Projects" },
                CPO: { class: "cpo-content", disabled_icon: "#icon_CPO" },
                Suppliers: { class: "supplier-content", disabled_icon: "#icon_Supplier" },
                Procurement: { class: "procurement-content", disabled_icon: "#icon_Procurement" },
                Contract: { class: "contract-content", disabled_icon: "#icon_Contract" },
                Sourcing: { class: "sourcing-content", disabled_icon: "#icon_Sourcing" },
            }

            return cls[moduleName];
        }
    }
})(angular, SmartController);