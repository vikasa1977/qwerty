 else if ($scope.taskList[parentIndex].taskGrp[index].title == "Secondary Packaging" && $state.productNameFoldingCartons) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    "costelement": "Secondary Packaging",
                    "name": "Labor Setup Coating A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Labor Index1",
                    "unitcost": 6,
                    "inputuom": "Case",
                    "outputuom": "Case",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": '$0.10'
                }
            ];
        }