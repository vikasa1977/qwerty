'use strict';

angular
    .module('SMART2')

    .controller('userProfileCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', 'notification', '$state', userProfileCtrlFunc])
    .controller('compareGraphCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', 'notification', '$state', compareGraphCtrlFunc]);




function userProfileCtrlFunc($scope, $rootScope, RuleEngine, $http, notification, $state) {

    $scope.valuone = "02";
    $scope.valutwo = "03";

    $scope.userName = "Emily";
    $scope.oldPassword = "";
    $scope.newPassword = "";
    $scope.retypePassword = "";
    $scope.showShippingPopup = false;

    $scope.themeArray = [{
            name: "Green",
            path: 'shared/resources/css/themes/JohnDeere.css',
            client: "JohnDeere",
            toolTip: "John Deere"
        },
        {
            name: "default",
            path: null,
            client: "All",
            toolTip: "Default"
        }
    ];

    $scope.onThemeSelect = function (_item) {
        localStorage.selectedTheme = JSON.stringify(_item);
        if (_item.path == null) {
            angular.element("#theme")[0].disabled = true;
            document.querySelector('#theme').setAttribute('href', "");
            localStorage.selectedTheme = null;
        } else {
            document.querySelector('#theme').setAttribute('href', _item.path);
            angular.element("#theme")[0].disabled = false;
        }
    }

    $scope.onLocationModalHide = function () {
        showShippingPopup = false;
    };

    $scope.openPopup = function () {
        $scope.showShippingPopup = true;
    };

    //to show -hide delegation data
    $scope.delegationData = false;
    //$scope.addDelegation = function () {
    //	console.log("del");
    //	$scope.delegationData = true;
    //};

    //password show/hide function
    $scope.inputType = 'password';
    $scope.iconChange = {
        icon: "#icon_Preview",
        hoverText: "Show Password"
    }

    $scope.hideShowPassword = function () {
        if ($scope.inputType == 'password') {
            $scope.inputType = 'text';
            $scope.iconChange = {
                icon: "#icon_HidePreview",
                hoverText: "Hide Password"
            }
        } else {
            $scope.inputType = 'password';
            $scope.iconChange = {
                icon: "#icon_Preview",
                hoverText: "Show Password"
            }
        }
    };


    /* var req = {
         method: 'GET',
         url: 'shared/user/models/formWidget.json'
     };*/
    var req = {
        method: 'GET',
        url: 'shared/user/models/cofigureProfile.json'
    };

    $http(req).then(function (response) {
        $scope.dataModel = response.data.modelData;
        $scope.config = response.data.formConfig;

        var widgetItems = [];

        for (var i = 0; i < $scope.config.sections.length; i++) {
            $scope.config.sections[i].isVisible = $scope.config.sections[i].isMandatory;
            if (!$scope.config.sections[i].isMandatory) {
                widgetItems.push({
                    label: $scope.config.sections[i].label,
                    isSection: true,
                    sectionIndex: i,
                    visible: true,
                    leftIcon: $scope.config.sections[i].icon
                });
            } else {
                for (var j = 0; j < $scope.config.sections[i].rows.length; j++) {
                    for (var k = 0; k < $scope.config.sections[i].rows[j].properties.length; k++) {
                        $scope.config.sections[i].rows[j].properties[k].isVisible = $scope.config.sections[i].rows[j].properties[k].isMandatory;
                        if (!$scope.config.sections[i].rows[j].properties[k].isMandatory) {
                            widgetItems.push({
                                label: $scope.config.sections[i].rows[j].properties[k].label,
                                isSection: false,
                                sectionIndex: i,
                                rowIndex: j,
                                propertyIndex: k,
                                visible: true,
                                leftIcon: $scope.config.sections[i].icon
                            });
                        }
                    }
                }
            }
        }

        $scope.widgetItems = widgetItems;

    }, function (error) {
        console.log(JSON.stringify(error));
    });


    /*
     * Sliding menu item click handler
     */
    $scope.onSlidingMenuClick = function (item) {


        if (item.label == "Shipping Location") {
            $scope.openPopup();
        }

        if (item.isSection) {
            $scope.config.sections[item.sectionIndex].isVisible = !$scope.config.sections[item.sectionIndex].isVisible;
        } else {
            $scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex].isVisible = !$scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex].isVisible;
        }


    };


    /*
     * Widget panel
     */
    $scope.showWidgetPanel = false;

    $scope.toggleWidgetPanel = function () {

        $scope.showWidgetPanel = !$scope.showWidgetPanel;
    };

    $scope.uploadData = [{
            documentType: 'Contract',
            activity: 'Approval',
            delegateTo: 'TestUser',
            from: "Jan 1,1753",
            to: "Jan 1,1753",
            setUpBy: 'GEP Admin',
            setUpOn: 'Jun 2, 2016',
            revokedBy: 'GEP Admin',
            revokedOn: 'Apr 2, 2016',
            status: 'On'
        },
        {
            documentType: 'Contract',
            activity: 'Approval',
            delegateTo: 'TestUser',
            from: "Jan 1,1753",
            to: "Jan 1,1753",
            setUpBy: 'GEP Admin',
            setUpOn: 'Jun 2, 2016',
            revokedBy: 'GEP Admin',
            revokedOn: 'Apr 2, 2016',
            status: 'On'
        },
        {
            documentType: 'Contract',
            activity: 'Approval',
            delegateTo: 'TestUser',
            from: "Jan 1,1753",
            to: "Jan 1,1753",
            setUpBy: 'GEP Admin',
            setUpOn: 'Jun 2, 2016',
            revokedBy: 'GEP Admin',
            revokedOn: 'Apr 2, 2016',
            status: 'On'
        },
        {
            documentType: 'Contract',
            activity: 'Approval',
            delegateTo: 'TestUser',
            from: "Jan 1,1753",
            to: "Jan 1,1753",
            setUpBy: 'GEP Admin',
            setUpOn: 'Jun 2, 2016',
            revokedBy: 'GEP Admin',
            revokedOn: 'Apr 2, 2016',
            status: 'On'
        },
        {
            documentType: 'Contract',
            activity: 'Approval',
            delegateTo: 'TestUser',
            from: "Jan 1,1753",
            to: "Jan 1,1753",
            setUpBy: 'GEP Admin',
            setUpOn: 'Jun 2, 2016',
            revokedBy: 'GEP Admin',
            revokedOn: 'Apr 2, 2016',
            status: 'On'
        },
        {
            documentType: 'Contract',
            activity: 'Approval',
            delegateTo: 'TestUser',
            from: "Jan 1,1753",
            to: "Jan 1,1753",
            setUpBy: 'GEP Admin',
            setUpOn: 'Jun 2, 2016',
            revokedBy: 'GEP Admin',
            revokedOn: 'Apr 2, 2016',
            status: 'On'
        },
    ];

    /*CheckBox checked data hide function*/
    $scope.isBoxChecked = false;

    /*radio checked data hide function*/

    /*radio checked data hide function*/

    $scope.onoffOptions = [{
        "id": "1",
        "name": "on"
    }, {
        "id": "2",
        "name": "off"
    }];

    $scope.selectedonoffOptions = {
        "id": "2",
        "name": "off"
    };
    $scope.onChange = function (selectedonoffOptions) {
        // console.log(selectedonoffOptions.id);
        if (selectedonoffOptions.id == 1) {
            // angular.element('.disabledF').parent().addClass('grey lighten-4 padding10');
            angular.element('.disabledF input').attr('disabled', 'disabled');
            angular.element('.disabledF input').addClass('disabled');
        } else {
            angular.element('.disabledF input').removeAttr('disabled', 'disabled');
            angular.element('.disabledF input').removeClass('disabled');
            //angular.element('.disabledF').parent().removeClass('grey lighten-4 padding10');
        }
    };

    //signature radio --start
    $scope.createUploadOptions = [{
        "id": "1",
        "name": "Create Signature"
    }, {
        "id": "2",
        "name": "Upload Signature"
    }];

    $scope.selectedcreateUploadOptions = {
        "id": "1",
        "name": "Create Signature"
    };
    $scope.onChange1 = function (selectedcreateUploadOptions) {
        if (selectedcreateUploadOptions.id == 1) {
            angular.element('.createSignature').removeClass('ng-hide');
            //angular.element('.uploadSignature').addClass('ng-hide');
        } else if (selectedcreateUploadOptions.id == 2) {
            angular.element('.uploadSignature').removeClass('ng-hide');
            angular.element('.createSignature').addClass('ng-hide');
            angular.element('.file-field  input').click();
        }
    };


    //signature radio --End

    /* SELECT REQUISITION POPUP */
    $scope.addNewDelegationPopup = "shared/user/views/addNewDelegationTable.html";
    $scope.addNewDelegation = false;
    $scope.addNewDelegationCallback = function (e) {
        $scope.addNewDelegation = true;
    }
    $scope.delegationData = false;
    $scope.hideSelectaddNewDelegation = function (e) {
        $scope.addNewDelegation = false;
        $scope.delegationData = true;
    }


    /*pagination*/
    $scope.numberOptions = [{
        "number": 10
    }, {
        "number": 20
    }, {
        "number": 30
    }, {
        "number": 40
    }, {
        "number": 50
    }];
    $scope.currentNumofItem = {
        "number": 10
    };
    $scope.setTheItemWithNumber = function (currentNumber) {
        $scope.currentNumofItem.number = currentNumber;
    };


    /*pagination*/
    $scope.validateForm = function () {
        RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
        RuleEngine.execute(function (e) {

        });
    };

    //font options
    $scope.fontOptions = [{
        "code": "8",
        "name": "8"
    }, {
        "code": "9",
        "name": "9"
    }, {
        "code": "10",
        "name": "10	"
    }, {
        "code": "11",
        "name": "11"
    }, {
        "code": "12",
        "name": "12"
    }, {
        "code": "13",
        "name": "13"
    }, {
        "code": "14",
        "name": "14"
    }, {
        "code": "15",
        "name": "15"
    }, {
        "code": "16",
        "name": "16"
    }, {
        "code": "17",
        "name": "17"
    }, {
        "code": "18",
        "name": "18"
    }, {
        "code": "19",
        "name": "19"
    }, {
        "code": "20",
        "name": "20"
    }];
    $scope.selectedFont = $scope.fontOptions[0];



    $scope.confirm = function () {
        //console.log("confirm");
        var createOb = {
            type: "confirm",
            message: "Change Order created successfully.",
            buttons: [{
                title: "OK",
                result: "ok"
            }]
        };
        notification.notify(createOb);
    }

    $scope.saveProfileConfirm = function () {
        Materialize.toast('Profile Updated Successfully', 2000, "", function () {
            $state.go('platform');
        });
    }
    $scope.cancelProfileEdit = function () {
        var notifyonCancel = {
            "type": "confirm",
            "message": "You have unsaved changes, save the changes?",
            "buttons": [{
                    "title": "YES",
                    "result": "yes"
                },
                {
                    "title": "NO",
                    "result": "no"
                }
            ]

        };
        notification.notify(notifyonCancel, function (response) {
            if (response.result == 'yes') {
                Materialize.toast('Profile Updated Successfully', 2000, "", function () {
                    $state.go('platform');
                })
            }
            if (response.result == 'no') {
                $state.go('platform');
            }
        });
    }
}

function compareGraphCtrlFunc($scope, $rootScope, RuleEngine, $http, notification, $state) {

    $scope.goToBackPage = function () {
        history.go(-1);
    };

    // if (!$state.productNameAcrylonitrile) {
    //     Highcharts.chart('container-2', {
    //         chart: {
    //             type: 'waterfall'
    //         },

    //         title: {
    //             text: 'SF Fillet Blocks'
    //         },

    //         xAxis: {
    //             type: 'category'
    //         },

    //         yAxis: {
    //             title: {
    //                 // text: 'USD'
    //             }
    //         },

    //         legend: {
    //             enabled: false
    //         },

    //         tooltip: {
    //             // pointFormat: '<b>${point.y:,.2f}</b> USD'
    //         },

    //         series: [{
    //             upColor: Highcharts.getOptions().colors[2],
    //             color: Highcharts.getOptions().colors[3],
    //             data: [{
    //                     name: 'POLLOCK',
    //                     y: 550,
    //                     color: Highcharts.getOptions().colors[4]
    //                 },
    //                 {
    //                     name: 'PRODUCTION COST',
    //                     y: 1750,
    //                     color: Highcharts.getOptions().colors[3]
    //                 },
    //                 {
    //                     name: 'SHIPMENT COST',
    //                     y: 630,
    //                     color: Highcharts.getOptions().colors[5]
    //                 },
    //                 {
    //                     name: 'MARGIN',
    //                     y: 870,
    //                     color: Highcharts.getOptions().colors[6]
    //                 },
    //                 {
    //                     name: 'TOTAL',
    //                     isIntermediateSum: true,
    //                     color: Highcharts.getOptions().colors[1]
    //                 }
    //             ],
    //             dataLabels: {
    //                 enabled: true,
    //                 formatter: function () {
    //                     return Highcharts.numberFormat(this.y);
    //                 },
    //                 style: {
    //                     fontWeight: 'bold'
    //                 }
    //             },
    //             // pointPadding: 0
    //         }]
    //     });
    //     Highcharts.chart('container-3', {
    //         chart: {
    //             type: 'waterfall'
    //         },

    //         title: {
    //             text: 'DF Fillet Blocks'
    //         },

    //         xAxis: {
    //             type: 'category'
    //         },

    //         yAxis: {
    //             title: {
    //                 // text: 'USD'
    //             }
    //         },

    //         legend: {
    //             enabled: false
    //         },

    //         tooltip: {
    //             // pointFormat: '<b>${point.y:,.2f}</b> USD'
    //         },

    //         series: [{
    //             upColor: Highcharts.getOptions().colors[2],
    //             color: Highcharts.getOptions().colors[3],
    //             data: [{
    //                     name: 'POLLOCK',
    //                     y: 2555,
    //                     color: Highcharts.getOptions().colors[4]
    //                 }, {
    //                     name: 'PRODUCTION COST',
    //                     y: 820,
    //                     color: Highcharts.getOptions().colors[2]
    //                 }, {
    //                     name: 'SHIPMENT COST',
    //                     y: 615,
    //                     color: Highcharts.getOptions().colors[3]
    //                 },
    //                 {
    //                     name: 'MARGIN',
    //                     y: 410,
    //                     color: Highcharts.getOptions().colors[5]
    //                 },
    //                 {
    //                     name: 'TOTAL',
    //                     isIntermediateSum: true,
    //                     color: Highcharts.getOptions().colors[1]
    //                 }
    //             ],
    //             dataLabels: {
    //                 enabled: true,
    //                 formatter: function () {
    //                     return Highcharts.numberFormat(this.y);
    //                 },
    //                 style: {
    //                     fontWeight: 'bold'
    //                 }
    //             },
    //             // pointPadding: 0
    //         }]
    //     });
    //     Highcharts.chart('container-4', {
    //         chart: {
    //             type: 'waterfall'
    //         },

    //         title: {
    //             text: 'Ketchup Production'
    //         },

    //         xAxis: {
    //             type: 'category'
    //         },

    //         yAxis: {
    //             title: {
    //                 // text: 'USD'
    //             }
    //         },

    //         legend: {
    //             enabled: false
    //         },

    //         tooltip: {
    //             // pointFormat: '<b>${point.y:,.2f}</b> USD'
    //         },

    //         series: [{
    //             upColor: Highcharts.getOptions().colors[2],
    //             color: Highcharts.getOptions().colors[3],
    //             data: [{
    //                     name: 'POLLOCK',
    //                     y: 70,
    //                     color: Highcharts.getOptions().colors[4]
    //                 }, {
    //                     name: 'CONVO',
    //                     y: 17,
    //                     color: Highcharts.getOptions().colors[2]
    //                 }, {
    //                     name: 'OVERHEAD',
    //                     y: 2,
    //                     color: Highcharts.getOptions().colors[3]
    //                 },
    //                 {
    //                     name: 'FINANCE',
    //                     y: 1,
    //                     color: Highcharts.getOptions().colors[5]
    //                 },
    //                 {
    //                     name: 'TRANSPORT',
    //                     y: 7,
    //                     color: Highcharts.getOptions().colors[6]
    //                 },
    //                 {
    //                     name: 'PROFIT',
    //                     y: 3,
    //                     color: Highcharts.getOptions().colors[7]
    //                 },
    //                 {
    //                     name: 'TOTAL',
    //                     isIntermediateSum: true,
    //                     color: Highcharts.getOptions().colors[1]
    //                 }
    //             ],
    //             dataLabels: {
    //                 enabled: true,
    //                 formatter: function () {
    //                     return Highcharts.numberFormat(this.y) + '%';
    //                 },
    //                 style: {
    //                     fontWeight: 'bold'
    //                 }
    //             },
    //             // pointPadding: 0
    //         }]
    //     });
    //     Highcharts.chart('container-5', {
    //         chart: {
    //             type: 'waterfall'
    //         },

    //         title: {
    //             text: 'Milk'
    //         },

    //         xAxis: {
    //             type: 'category'
    //         },

    //         yAxis: {
    //             title: {
    //                 // text: 'USD'
    //             }
    //         },

    //         legend: {
    //             enabled: false
    //         },

    //         tooltip: {
    //             // pointFormat: '<b>${point.y:,.2f}</b> USD'
    //         },

    //         series: [{
    //             upColor: Highcharts.getOptions().colors[2],
    //             color: Highcharts.getOptions().colors[3],
    //             data: [{
    //                     name: 'POLLOCK',
    //                     y: 70,
    //                     color: Highcharts.getOptions().colors[4]
    //                 }, {
    //                     name: 'CONVO',
    //                     y: 17,
    //                     color: Highcharts.getOptions().colors[2]
    //                 }, {
    //                     name: 'OVERHEAD',
    //                     y: 2,
    //                     color: Highcharts.getOptions().colors[3]
    //                 },
    //                 {
    //                     name: 'FINANCE',
    //                     y: 1,
    //                     color: Highcharts.getOptions().colors[5]
    //                 },
    //                 {
    //                     name: 'TRANSPORT',
    //                     y: 7,
    //                     color: Highcharts.getOptions().colors[6]
    //                 },
    //                 {
    //                     name: 'PROFIT',
    //                     y: 3,
    //                     color: Highcharts.getOptions().colors[7]
    //                 },
    //                 {
    //                     name: 'TOTAL',
    //                     isIntermediateSum: true,
    //                     color: Highcharts.getOptions().colors[1]
    //                 }
    //             ],
    //             dataLabels: {
    //                 enabled: true,
    //                 formatter: function () {
    //                     return Highcharts.numberFormat(this.y) + '%';
    //                 },
    //                 style: {
    //                     fontWeight: 'bold'
    //                 }
    //             },
    //             // pointPadding: 0
    //         }]
    //     });
    // }
        setTimeout(function(){
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },
    
                title: {
                    text: '1234-ACRYLONITRILE'
                },
    
                xAxis: {
                    type: 'category'
                },
    
                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },
    
                legend: {
                    enabled: false
                },
    
                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },
    
                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [
                        {
                            name: 'AMMONIA',
                            y: 0.124,
                            color: Highcharts.getOptions().colors[0]
                        },
                        {
                            name: 'PROPYLENE, CHEM GRADE',
                            y: 0.4046,
                            color: Highcharts.getOptions().colors[2]
                        },
                        {
                            name: 'CHEMICALS',
                            y: 0.0340,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'HYDROGEN CYANIDE',
                            y: -0.0523,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'PRODUCTION COST',
                            y: 0.3238,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'SHIPPING',
                            y: 0.05,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'MARGIN',
                            y: 0.0864,
                            color: Highcharts.getOptions().colors[7]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
    
            Highcharts.chart('container-3', {
                chart: {
                    type: 'waterfall'
                },
    
                title: {
                    text: '1234-ACRYLONITRILE-SCENARIO 1'
                },
    
                xAxis: {
                    type: 'category'
                },
    
                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },
    
                legend: {
                    enabled: false
                },
    
                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },
    
                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [
                        {
                            name: 'AMMONIA',
                            y: 0.132,
                            color: Highcharts.getOptions().colors[0]
                        },
                        {
                            name: 'PROPYLENE, CHEM GRADE',
                            y: 0.4046,
                            color: Highcharts.getOptions().colors[2]
                        },
                        {
                            name: 'CHEMICALS',
                            y: 0.0340,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'HYDROGEN CYANIDE',
                            y: -0.0523,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'PRODUCTION COST',
                            y: 0.4177,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'SHIPPING',
                            y: 0.0300,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'MARGIN',
                            y: 0.1009,
                            color: Highcharts.getOptions().colors[7]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        },100)
}