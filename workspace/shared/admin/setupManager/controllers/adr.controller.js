angular
    .module('SMART2')
    .controller('adrCtrl', ['$scope', '$http', '$timeout', 'routeSvc', 'notification', 'storeService', '$sce', 'compareVersionLogFactory', '$rootScope', adrCtrlFunc])

function adrCtrlFunc($scope, $http, $timeout, routeSvc, notification, storeService, $sce, compareVersionLogFactory, $rootScope) {

    $scope.nameSortIcon = {
        'icon': 'icon_Sort'
    };

    $scope.config = {
        "modelData": {
            "timezone": "",
            "language": ""
        },
        "formConfig": {
            "sections": [
                {
                    "label": "Basic Details",
                    "isMandatory": true,
                    "isCollapsible": true,
                    "isHeader": true,
                    "isDraggable": true,
                    "isVisible": true,
                    "rows": [{
                        "properties": [{
                            "label": "",
                            "type": "subsection",
                            "isMandatory": true,
                            "templateUrl": "shared/admin/setupManager/views/adrBasicDetails.html",
                            "colspan": 6
                        }]
                    }]
                },
                {
                    "label": "MAPPING DEFINITION",
                    "isMandatory": true,
                    "isCollapsible": true,
                    "isActive": false,
                    "isHeader": true,
                    "isDraggable": true,
                    "isVisible": true,
                    "rows": [{

                        "properties": [{
                            "label": "",
                            "type": "subsection",
                            "isMandatory": true,
                            "templateUrl": "shared/admin/setupManager/views/adrMappingDef.html",
                            "colspan": 6

                        }]
                    }]
                },
                {
                    "label": "Mapping Details",
                    "isMandatory": true,
                    "isCollapsible": true,
                    "isActive": false,
                    "isHeader": true,
                    "isDraggable": true,
                    "isVisible": false,
                    "rows": [{
                        "properties": [{
                            "label": "",
                            "type": "subsection",
                            "isMandatory": true,
                            "templateUrl": "shared/admin/setupManager/views/derivationSets.html",
                            "colspan": 6

                        }]
                    }]
                }
            ],
        },
    };

    $scope.basicDetail = {
        mappingSetName: {
            title: ''
        },
        mappingSetDesc: {
            title: ''
        },
        mappingsetID: {
            title: '00001'
        },
        LOBOptions: [{
            'id': '1',
            'name': 'Cincinnati Bell'
        }, {
            'id': '2',
            'name': 'option 2'
        }, {
            'id': '3',
            'name': 'option 3'
        }],
        selectedLOB: [{
            'id': '3',
            'name': 'option 3'
        }],
        orgEntityOptions: [{
            'id': '1',
            'name': 'CBAD'
        }, {
            'id': '2',
            'name': 'option 2'
        }, {
            'id': '3',
            'name': 'option 3'
        }],
        selectedOrgEntity: [{
            'id': '3',
            'name': 'option 3'
        }],
        targetSegOptions: [{
            'id': '1',
            'name': 'GL Code'
        }, {
            'id': '2',
            'name': 'Cost Center'
        }, {
            'id': '3',
            'name': 'Accounting'
        }],
        selectedTargetSeg: [{
            'id': '3',
            'name': 'Accounting'
        }],
        accSourceOptions: [{
            'id': '1',
            'name': 'option 1'
        }, {
            'id': '2',
            'name': 'option 2'
        }, {
            'id': '3',
            'name': 'option 3'
        }],
        selectedaccSource: [{
            'id': '3',
            'name': 'option 3'
        }],
        precedenceOptions: [{
            'id': '1',
            'name': 'option 1'
        }, {
            'id': '2',
            'name': 'option 2'
        }, {
            'id': '3',
            'name': 'option 3'
        }],
        selectedPrecedence: [{
            'id': '3',
            'name': 'option 3'
        }],
        isDefaultMapping: false
    };

    $scope.basicDetailData = [{
        mappingSetName: {
            title: 'Mapping Set 1'
        },
        mappingSetDiv: {
            title: 'CBT - Purchase'
        },
        mappingsetID: {
            title: ''
        },
        selectedOrgEntity: [{
            'id': '3',
            'name': 'Cost center- technical'
        }],
        selectedTargetSeg: [{
            'id': '3',
            'name': 'GL Code'
        }],
        selectedaccSource: [{
            'id': '3',
            'name': 'RCC'
        }],
        selectedPrecedence: [{
            'id': '3',
            'name': '1'
        }]
    },
        {
            mappingSetName: {
                title: 'Mapping Set 2'
            },
            mappingSetDiv: {
                title: 'CBT - Purchase'
            },
            mappingsetID: {
                title: ''
            },
            selectedOrgEntity: [{
                'id': '3',
                'name': 'Cost center- technical'
            }],
            selectedTargetSeg: [{
                'id': '3',
                'name': 'GL Code'
            }],
            selectedaccSource: [{
                'id': '3',
                'name': 'RCC'
            }],
            selectedPrecedence: [{
                'id': '3',
                'name': '1'
            }]
        },
        {
            mappingSetName: {
                title: 'Mapping Set 3'
            },
            mappingSetDiv: {
                title: 'CBT - Purchase'
            },
            mappingsetID: {
                title: ''
            },
            selectedOrgEntity: [{
                'id': '3',
                'name': 'Cost center- technical'
            }],
            selectedTargetSeg: [{
                'id': '3',
                'name': 'GL Code'
            }],
            selectedaccSource: [{
                'id': '3',
                'name': 'RCC'
            }],
            selectedPrecedence: [{
                'id': '3',
                'name': '1'
            }]
        },
        {
            mappingSetName: {
                title: 'Mapping Set 4'
            },
            mappingSetDiv: {
                title: 'CBT - Purchase'
            },
            mappingsetID: {
                title: ''
            },
            selectedOrgEntity: [{
                'id': '3',
                'name': 'Cost center- technical'
            }],
            selectedTargetSeg: [{
                'id': '3',
                'name': 'GL Code'
            }],
            selectedaccSource: [{
                'id': '3',
                'name': 'RCC'
            }],
            selectedPrecedence: [{
                'id': '3',
                'name': '1'
            }]
        }
    ];

    $scope.ngModelResolveFun = function (ev) {
        var showAlertMsg = "Are you sure you don't want to use default mapping?";
        if (ev.isChecked && storeService.get('isLastSectionVisible')) {
            notification.notify({
                type: 'confirm',
                message: '<p class="left-align grey-text text-darken-4">The mapping you have created will be lost.<br/>Are you sure you want to continue?</p>',
                //checkMessage: "Don't ask for this supplier again.",
                buttons: [{
                    "title": "yes",
                    "result": "yes"
                },
				{
				    "title": "No",
				    "result": "Not"
				}]
            }, function (result) {
                if (result.result === 'yes') {
                    angular.element('.accountDetails').find('li').last().scope().section.isVisible = false;
                    angular.element('.accountDetails').find('li').last().scope().section.isActive = false;
                    $scope.$apply();
                    storeService.set('isLastSectionVisible', false);
                    ev.resolveFun(true);
                } else {
                    //$scope.basicDetail.isDefaultMapping = false;
                    ev.resolveFun(false);
                }
            });
        } else {
            if (!ev.isChecked && !(storeService.get('isLastSectionVisible'))) {
                notification.notify({
                    type: 'confirm',
                    message: "<p class='left-align grey-text text-darken-4'>" + showAlertMsg + "</p>",
                    //checkMessage: "Don't ask for this supplier again.",
                    buttons: [{
                        "title": "yes",
                        "result": "yes"
                    },
                    {
                        "title": "No",
                        "result": "Not"
                    }]
                }, function (result) {
                    if (result.result === 'yes') {
                        angular.element('.accountDetails').find('li').last().scope().section.isVisible = true;
                        angular.element('.accountDetails').find('li').last().scope().section.isActive = true;
                        $scope.$apply();
                        storeService.set('isLastSectionVisible', true);
                        ev.resolveFun(false);
                        $rootScope.showPublishBtn = true;
                        $rootScope.showSaveBtn = false;
                        $scope.targetSegVal = storeService.get('targetSegment');
                        $scope.tableHeaders = storeService.get('tableHeaders');
                        for (var i = 0; i < $scope.tableHeaders.length; i++) {
                            if ($scope.tableHeaders[i].isTree) {
                                $scope.tableInnerData.push({
                                    "checked": false,
                                    'isTree': true,
                                    "selectedCategoriesTxt": 'Choose category',
                                    "identificationno": {
                                        "title": "12345",
                                        "readonly": false,
                                        "actionCode": "",
                                        "leadApproval": "",
                                        "poolValue": ""
                                    },

                                    "idNoShow": true,
                                    "idnoLookup": true,
                                    "isFocus": true,
                                    "actionCodeShow": true,
                                    "leadApprovalShow": true,
                                    "poolValueShow": true,
                                    "approvalType": {
                                        "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                                        "selectedoption": { "name": "Approval matrix" }
                                    },
                                    "group": {
                                        "displaytitle": "Please Enter ",
                                        "displaytext": "",
                                        "options": [{ "name": "RCC 1", "check": false }, { "name": "RCC 22", "check": false }, { "name": "RCC 3", "check": false }],
                                        "selectedoption": []
                                    },
                                    "poolTypeOptions": {
                                        "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                                        "selectedoption": { "name": "Select Pool Type" }
                                    },
                                    "leadApprovalGroup": {
                                        "displaytitle": "Please Enter",
                                        "displaytext": "Lead Approval",
                                        "options": [{ "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Accounting", "check": false }],
                                        "selectedoption": []
                                    },
                                    "leadApprovalGroup1": {
                                        "displaytitle": "Please Enter",
                                        "displaytext": "Lead Approval",
                                        "options": [{ "name": "y.s@gep.com", "check": false }, {
                                            "name": "r.d@gep.com", "check": false
                                        }, {
                                            "name": "s.m@gep.com", "check": false
                                        }],
                                        "selectedoption": []
                                    }
                                });
                            } else {
                                $scope.tableInnerData.push({
                                    "checked": false,
                                    'isTree': false,
                                    "identificationno": {
                                        "title": "12345",
                                        "readonly": false,
                                        "actionCode": "",
                                        "leadApproval": "",
                                        "poolValue": ""
                                    },

                                    "idNoShow": true,
                                    "idnoLookup": true,
                                    "isFocus": true,
                                    "actionCodeShow": true,
                                    "leadApprovalShow": true,
                                    "poolValueShow": true,
                                    "approvalType": {
                                        "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                                        "selectedoption": { "name": "Approval matrix" }
                                    },
                                    "group": {
                                        "displaytitle": "Please Enter",
                                        "displaytext": "",
                                        "lookuptitle": $scope.tableHeaders[i].name,
                                        "options": [{ "name": "RCC 1", "check": false }, { "name": "RCC 2", "check": false }, { "name": "RCC 3", "check": false }],
                                        "selectedoption": []
                                    },
                                    "poolTypeOptions": {
                                        "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                                        "selectedoption": { "name": "Select Pool Type" }
                                    },
                                    "leadApprovalGroup": {
                                        "displaytitle": "Please Enter",
                                        "displaytext": "",
                                        "options": [{ "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Accounting", "check": false }],
                                        "selectedoption": []
                                    },
                                    "leadApprovalGroup1": {
                                        "displaytitle": "Please Enter",
                                        "displaytext": "Lead Approval",
                                        "options": [{ "name": "y.s@gep.com", "check": false }, {
                                            "name": "r.d@gep.com", "check": false
                                        }, {
                                            "name": "s.m@gep.com", "check": false
                                        }],
                                        "selectedoption": []
                                    }
                                })
                            }
                        }
                        storeService.set('tableInnerData', $scope.tableInnerData);
                    } else {
                        ev.resolveFun(true);
                    }
                });
            } else {
                ev.resolveFun(true);
                $rootScope.showPublishBtn = true;
                $rootScope.showSaveBtn = false;
            }
        }
    }

    $scope.viewLogPoupUrl = "catalog/requesterCatalog/views/popupViewLog.html";
    $scope.viewLogPopup = false;
    $scope.viewLogPopupCallback = function (e) {
        $scope.viewLogPopup = true;
    };
    var viewLogData = compareVersionLogFactory.getData();
    $scope.popupData = viewLogData.popupData;
    $scope.showCompareViewLogIcon = viewLogData.showIcon;

    $scope.hideViewLogPopupCallback = function (e) {
        $scope.viewLogPopup = false;
    };

    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };

    $scope.accountingSrcData = [{
        "displaytitle": "Accounting Source",
        "options": [{
            "name": "Category",
            "check": false,
            "isTree": true
        },
            {
                "name": "Any Item RCC",
                "check": false,
                "isTree": false
            },
            {
                "name": "Any Item RCC 2",
                "check": false,
                "isTree": false
            },
            {
                "name": "Any Item RCC 1",
                "check": false,
                "isTree": false
            }
        ],
        "selectedoption": []
    }];

    if ($rootScope.showSaveBtn || $rootScope.showSaveBtn == undefined)
        $rootScope.showSaveBtn = true;

    $scope.makegridFocuse = function (arg1, item) {
        setTimeout(function () {
            $('#' + arg1 + ' input').focus();
        }, 200);
        item.idnoLookup = false;
        item.condtionValue = false;
        item.fromRangeValue = false;
        item.toRangeValue = false;
        item.condtionActionVal = false;
        item.isFocus = true;
    };

    $scope.changeTargetSeg = function (value) {
        storeService.set('targetSegment', value.name);
    }

    $scope.identificationData = [{
        "checked": false,
        "tableInnerData": storeService.get('tableInnerData'),
        "identificationno": {
            "title": "12345",
            "readonly": false,
            "actionCode": "",
            "leadApproval": "",
            "poolValue": ""
        },
        "idNoShow": true,
        "idnoLookup": true,
        "isFocus": true,
        "actionCodeShow": true,
        "leadApprovalShow": true,
        "poolValueShow": true,
        "approvalType": {
            "options": [{
                "name": "Approval matrix"
            }, {
                "name": "Approval group"
            }],
            "selectedoption": {
                "name": "Approval matrix"
            }
        },
        "group": {
            "displaytitle": "Please Enter",
            "displaytext": "",
            "options": [{
                "name": "GL1001",
                "check": false
            }, {
                "name": "GL1002",
                "check": false
            }, {
                "name": "GL1003",
                "check": false
            }],
            "selectedoption": []
        },
        "poolTypeOptions": {
            "options": [{
                "name": "Select Pool Type"
            }, {
                "name": "XYZ"
            }, {
                "name": "ABC"
            }, {
                "name": "KLM"
            }],
            "selectedoption": {
                "name": "Select Pool Type"
            }
        },
        "leadApprovalGroup": {
            "displaytitle": "Please Enter",
            "displaytext": "Lead Approval",
            "options": [{
                "name": "GL Code",
                "check": false
            }, {
                "name": "Cost Center",
                "check": false
            }, {
                "name": "Accounting",
                "check": false
            }],
            "selectedoption": []
        }
    }];

    $scope.accSourceCallback = function (e) {
        storeService.set('tableHeaders', e.result);
    };
    $scope.tableHeaders = [];
    $scope.tableHeaders = storeService.get('tableHeaders');

    $scope.targetSegVal = storeService.get('targetSegment');

    $scope.addidentificationData = function (data) {
        data.unshift({
            "identificationno": {
                "title": "12345",
                "readonly": false,
                "actionCode": "",
                "leadApproval": "Please Enter",
                "poolValue": ""
            },
            tableInnerData: angular.copy($scope.parentScope.tableInnerData),
            "checked": false,
            "idNoShow": true,
            "idnoLookup": true,
            "isFocus": true,
            "actionCodeShow": true,
            "leadApprovalShow": true,
            "poolValueShow": true,
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{
                    "name": "CC-India",
                    "check": false
                }, {
                    "name": "Executive",
                    "check": false
                }, {
                    "name": "CEO office",
                    "check": false
                }],
                "selectedoption": []
            },
            "poolTypeOptions": {
                "options": [{
                    "name": "Select Pool Type"
                }, {
                    "name": "XYZ"
                }, {
                    "name": "ABC"
                }, {
                    "name": "KLM"
                }],
                "selectedoption": {
                    "name": "Select Pool Type"
                }
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{
                    "name": "y.s@gep.com",
                    "check": false
                }, {
                    "name": "r.d@gep.com",
                    "check": false
                }, {
                    "name": "s.m@gep.com",
                    "check": false
                }],
                "selectedoption": []
            },
            "leadApprovalGroup1": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{
                    "name": "y.s@gep.com",
                    "check": false
                }, {
                    "name": "r.d@gep.com",
                    "check": false
                }, {
                    "name": "s.m@gep.com",
                    "check": false
                }],
                "selectedoption": []
            }
        });

    };

    $scope.deleteConditionData = function (data, Ind) {
        data.splice(Ind, 1);
    };

    $scope.tableInnerData = [];

    $scope.publishMappingSet = function () {
        storeService.set('isMappingSetCreated', true);
    };

    $scope.showDerivationSets = function () {
        $scope.targetSegVal = storeService.get('targetSegment');
        $scope.tableHeaders = storeService.get('tableHeaders');
        storeService.set('isLastSectionVisible', true);
        $scope.config.formConfig.sections[2].isVisible = true;
        $scope.config.formConfig.sections[2].isActive = true;
        $rootScope.showPublishBtn = true;
        $rootScope.showSaveBtn = false;

        for (var i = 0; i < $scope.tableHeaders.length; i++) {

            if ($scope.tableHeaders[i].isTree) {
                $scope.tableInnerData.push({
                    "checked": false,
                    'isTree': true,
                    "selectedCategoriesTxt": 'Choose category',
                    "identificationno": {
                        "title": "12345",
                        "readonly": false,
                        "actionCode": "",
                        "leadApproval": "",
                        "poolValue": ""
                    },

                    "idNoShow": true,
                    "idnoLookup": true,
                    "isFocus": true,
                    "actionCodeShow": true,
                    "leadApprovalShow": true,
                    "poolValueShow": true,
                    "approvalType": {
                        "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                        "selectedoption": { "name": "Approval matrix" }
                    },
                    "group": {
                        "displaytitle": "Please Enter ",
                        "displaytext": "",
                        "options": [{ "name": "RCC 1", "check": false }, { "name": "RCC 22", "check": false }, { "name": "RCC 3", "check": false }],
                        "selectedoption": []
                    },
                    "poolTypeOptions": {
                        "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                        "selectedoption": { "name": "Select Pool Type" }
                    },
                    "leadApprovalGroup": {
                        "displaytitle": "Please Enter",
                        "displaytext": "Lead Approval",
                        "options": [{ "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Accounting", "check": false }],
                        "selectedoption": []
                    },
                    "leadApprovalGroup1": {
                        "displaytitle": "Please Enter",
                        "displaytext": "Lead Approval",
                        "options": [{ "name": "y.s@gep.com", "check": false }, {
                            "name": "r.d@gep.com", "check": false
                        }, {
                            "name": "s.m@gep.com", "check": false
                        }],
                        "selectedoption": []
                    }
                });
            } else {
                $scope.tableInnerData.push({
                    "checked": false,
                    'isTree': false,
                    "identificationno": {
                        "title": "12345",
                        "readonly": false,
                        "actionCode": "",
                        "leadApproval": "",
                        "poolValue": ""
                    },

                    "idNoShow": true,
                    "idnoLookup": true,
                    "isFocus": true,
                    "actionCodeShow": true,
                    "leadApprovalShow": true,
                    "poolValueShow": true,
                    "approvalType": {
                        "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                        "selectedoption": { "name": "Approval matrix" }
                    },
                    "group": {
                        "displaytitle": "Please Enter",
                        "displaytext": "",
                        "lookuptitle": $scope.tableHeaders[i].name,
                        "options": [{ "name": "RCC 1", "check": false }, { "name": "RCC 2", "check": false }, { "name": "RCC 3", "check": false }],
                        "selectedoption": []
                    },
                    "poolTypeOptions": {
                        "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                        "selectedoption": { "name": "Select Pool Type" }
                    },
                    "leadApprovalGroup": {
                        "displaytitle": "Please Enter",
                        "displaytext": "",
                        "options": [{ "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Accounting", "check": false }],
                        "selectedoption": []
                    },
                    "leadApprovalGroup1": {
                        "displaytitle": "Please Enter",
                        "displaytext": "Lead Approval",
                        "options": [{ "name": "y.s@gep.com", "check": false }, {
                            "name": "r.d@gep.com", "check": false
                        }, {
                            "name": "s.m@gep.com", "check": false
                        }],
                        "selectedoption": []
                    }
                })
            }
        }
        storeService.set('tableInnerData');
        storeService.set('tableInnerData', $scope.tableInnerData);
        //}
    };

    $scope.emptyText = "";
    $scope.activationToggle = true;
    var properties = [{
        mappingSetName: 'Mapping Set 1',
        mappingSetDiv: 'CBT - Purchase',
        mappingsetID: '',
        selectedOrgEntity: [{
            'id': '3',
            'name': 'Cost center- technical'
        }],
        selectedTargetSeg: [{
            'id': '3',
            'name': 'GL Code'
        }],
        selectedaccSource: [{
            'id': '3',
            'name': 'RCC'
        }],
        precedenceOptions: [{
            'id': '1',
            'name': '1'
        }, {
            'id': '2',
            'name': '2'
        }, {
            'id': '3',
            'name': '3'
        }],
        selectedPrecedence: [{
            'id': '3',
            'name': '1'
        }]
    },
        {
            mappingSetName: 'Mapping Set 2',
            mappingSetDiv: 'CBT - Purchase',
            mappingsetID: '',
            selectedOrgEntity: [{
                'id': '3',
                'name': 'Cost center- technical'
            }],
            selectedTargetSeg: [{
                'id': '3',
                'name': 'GL Code'
            }],
            selectedaccSource: [{
                'id': '3',
                'name': 'RCC'
            }],
            precedenceOptions: [{
                'id': '1',
                'name': '1'
            }, {
                'id': '2',
                'name': '2'
            }, {
                'id': '3',
                'name': '3'
            }],
            selectedPrecedence: [{
                'id': '3',
                'name': '1'
            }]
        },
        {
            mappingSetName: 'Mapping Set 3',
            mappingSetDiv: 'CBT - Purchase',
            mappingsetID: '',
            selectedOrgEntity: [{
                'id': '3',
                'name': 'Cost center- technical'
            }],
            selectedTargetSeg: [{
                'id': '3',
                'name': 'GL Code'
            }],
            selectedaccSource: [{
                'id': '3',
                'name': 'RCC'
            }],
            precedenceOptions: [{
                'id': '1',
                'name': '1'
            }, {
                'id': '2',
                'name': '2'
            }, {
                'id': '3',
                'name': '3'
            }],
            selectedPrecedence: [{
                'id': '3',
                'name': '1'
            }]
        },
        {
            mappingSetName: 'Mapping Set 4',
            mappingSetDiv: 'CBT - Purchase',
            mappingsetID: '',
            selectedOrgEntity: [{
                'id': '3',
                'name': 'Cost center- technical'
            }],
            selectedTargetSeg: [{
                'id': '3',
                'name': 'GL Code'
            }],
            selectedaccSource: [{
                'id': '3',
                'name': 'RCC'
            }],
            precedenceOptions: [{
                'id': '1',
                'name': '1'
            }, {
                'id': '2',
                'name': '2'
            }, {
                'id': '3',
                'name': '3'
            }],
            selectedPrecedence: [{
                'id': '3',
                'name': '1'
            }]
        }
    ];

    $scope.allFilterClicked = function () {
        $scope.isAllFilterSelected = true;
        for (var i = 0; i < $scope.landingFilterList.length; i++) {
            $scope.landingFilterList[i].isSelected = false;
        }
        $scope.data._src = $scope.allRulesData;
        $scope.data.refresh();
    }
    //$scope.isMappingSetCreated = false;

    $scope.init = function (s, e) {
        var grid = $scope.grid = s;
        $scope.data = new wijmo.collections.CollectionView(properties);

        $scope.data.pageSize = 30;
        $scope.filter = new wijmo.grid.filter.FlexGridFilter(s);
        $scope.allRulesData = angular.copy($scope.data._src);
        $scope.filteByStatusClicked = function ($index, item) {
            var toFilter, lcFilter;
            $scope.tempRulesData = [];
            angular.forEach($scope.allRulesData, function (value, ind) {
                if (value.displayName == item.filterBy) {
                    $scope.tempRulesData.push(value);
                };
                $scope.data._src = $scope.tempRulesData;
                $scope.data.refresh();
            });

            for (var i = 0; i < $scope.landingFilterList.length; i++) {
                $scope.landingFilterList[i].isSelected = false;
            }
            $scope.isAllFilterSelected = false;
            $scope.landingFilterList[$index].isSelected = true;
        };

        $scope.allFilterClicked = function () {
            $scope.isAllFilterSelected = true;
            for (var i = 0; i < $scope.landingFilterList.length; i++) {
                $scope.landingFilterList[i].isSelected = false;
            }
            $scope.data._src = $scope.allRulesData;
            $scope.data.refresh();
        }

        grid.selectionMode = wijmo.grid.SelectionMode.Row;
        grid.select(-1, -1);

        grid.formatItem.addHandler(function (s, e) {
            var sel = null;
            var count = 0;

            // apply selected state to row header cells
            if (e.panel == grid.rowHeaders) {
                sel = grid.rows[e.row].isSelected;
                wijmo.toggleClass(e.cell, 'wj-state-multi-selected', sel);

                var selected = [];
                for (var i = 0; i < grid.rows.length; i++) {
                    if (grid.rows[i].isSelected) {
                        selected.push(grid.rows[i].dataItem);
                        count = count + 1;
                    }
                }
                $scope.deleteRowWj = function () {
                    // delete the selected items
                    for (var i = 0; i < selected.length; i++) {
                        $scope.data.remove(selected[i]);
                    }
                }

                if (count == 0 || count < 0) {
                    $scope.showAllCheckbox = true;
                } else {
                    $scope.showAllCheckbox = false;
                }
            }

            // apply selected state to top-left cell
            if (e.panel == grid.topLeftCells) {
                sel = areAllRowsSelected(grid);
            }

            // show checkboxes on row header and top-left cells
            if (sel != null && e.col == 0) {
                e.cell.innerHTML = '<span class="wj-glyph-check" style="opacity:' + (sel ? 1 : .25) + '"></span>';
            }
        });

        // customize mouse selection

        grid.hostElement.addEventListener('mousedown', function (e) {
            var ht = grid.hitTest(e);
            // allow sorting/resizing/dragging
            if ((ht._p == grid.columnHeaders) || (ht._p == grid.rowHeaders) || (ht._p == grid.topLeftCells)) {
                if (ht._p == grid.columnHeaders) {
                    return;
                }

                // toggle row selection when clicking row headers
                if (ht._p == grid.rowHeaders) {
                    grid.rows[ht.row].isSelected = !grid.rows[ht.row].isSelected;
                }

                // toggle all rows selection when clicking top-left cell
                if (ht._p == grid.topLeftCells) {
                    var select = !areAllRowsSelected(grid);
                    for (var i = 0; i < grid.rows.length; i++) {
                        grid.rows[i].isSelected = select;
                    }
                }


            }

        }, true);
        if (storeService.get('isMappingSetCreated') == true) {
            Materialize.toast("Mapping set has been created", 4500);
        }

    };
    $scope.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wijmo.grid.CellType.Cell) {
            var flex = panel.grid;
            //set height for even rows           
            flex.rows[r].height = 48;
            flex.rows[r].cssClass = "wj-sTable-cell";

        }
    }

    $scope.checktext = false;


    function areAllRowsSelected(grid) {
        for (var i = 0; i < grid.rows.length; i++) {
            if (!grid.rows[i].isSelected) return false;
        }
        return true;
    }

    $scope.getDataCheckInfo = function (i, e) {
        i > 0 ? $scope.erpFullTableDelete = false : $scope.erpFullTableDelete = true;
    }
    $scope.selectAllErp = { checkAll: false };

    $scope.selectAllSupplier = { "isCheck": true };

    /* upload popup start */
    $scope.uploadIcon = '#icon_Upload'; //icon_Commented
    $scope.uploadTitle = 'UPLOAD';
    $scope.hideDownloadTemplate = true;
    $scope.attachmentButtonName = "Upload";
    $scope.types = {
        fileType: ".jpg, .jpg, .pdf, .docx"
    }
    var attachmentMsg = "Supported file formats: doc, docs, pdf, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
    $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
    $scope.attachFlag = false;
    $scope.uploadFail = false;
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;
        $timeout(function () {
            $scope.uploadFail = true;
        }, 1500);
    };
    $scope.uploadPopupUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.showuploadPopup = false;
    $scope.showUploadPopupCallback = function (e) {
        $scope.showUploadPopup = true;
    };
    $scope.uploadPopUpOnHideCallback = function (e) {
        $scope.showUploadPopup = false;
    };
    $scope.docFlag = false;
    $scope.uploadDocCall = function (e) {
        $scope.docFlag = true;
    };
    $scope.attachFlag = false;
    $scope.attachmentList = [{
        name: "AttachmentOne.xls",
        status: "fail",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: false
    },
        {
            name: "AttachmentTwo.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        },
        {
            name: "AttachmentThree.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        },
        {
            name: "AttachmentFour.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        },
        {
            name: "AttachmentFive.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        }
    ];
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;

        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function (el) {
        el.isShow = false;
    }

    $scope.retryCall = function (el) {
        el.status = "success";
    }
    $scope.removeRow = function (el) {
        // remove the row specified in index
        if ($scope.attachmentList.length > 1) {
            if ($scope.attachmentList.length == 2) {
                $scope.attachmentList[1].actionIconDelete = false;
            }
            $scope.attachmentList.splice(index, 1);
        }
    };

    // Start: CBR
    var tempCategoryNode_PAS = [],
        categoryObj;

    $scope.treeComponentConfig = {
        isRadio: false,
        getHierarchyOnSelection: true,
        getAllLazyLoadedData: true,
        getUserSelection: true,
        enableLastLevelSelection: false,
        isLazyLoad: false,
        showSelectAll: false,
        showClearSelection: false,
        showSelectionCount: false,
        isReadOnly: false,
        isDisabled: false,
        modalButtonShow: true,
        data: null,
        selectedNodes: "",
        disableLevelSelection: '',
        treeType: 'Generic',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '328px',
        isSearchEnabled: true,
        navigationContext: "PAS",
    };

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/category.json'
    };
    var currentType = '';
    $scope.treeOpenCallback = function (type, ind) {
        $scope.addTimLinePeriod = false;
        currentType = type;
        catInd = ind;
        if (type == 'category') {
            $http(categoryData).then(function (response) {
                categoryObj = response.data;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
            });
        }
        if (type == 'orgEntity') {
            $http(categoryData).then(function (response) {
                categoryObj = response.data;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'ORG ENTITY';
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
            });
        }
        $scope.showTreePopup = true;
    };

    $scope.onPopupHideCallback = function () {

        $scope.showTreePopup = false;
        $scope.addTimLinePeriod = true;
        if (currentType == 'category' || currentType == 'orgEntity') {
            $scope.selectedCategoriesValidate = true;
        }

        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
    };

    $scope.selectedCategoriesTxt = "Choose Org Entity";
    $scope.selectedCategoryNodes = [];
    $scope.treeComponentCallback = function (e) {
        if (currentType == 'category') {
            tempCategoryNode_PAS = [];
            $scope.selectedCategoriesValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedCategoryNodes.push(e.selections[i].Name);
                tempCategoryNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.identificationData[catInd].tableInnerData[0].selectedCategoriesTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.identificationData[catInd].tableInnerData[0].selectedCategoriesTxt = e.selectionAllNames[0];
            else
                $scope.identificationData[catInd].tableInnerData[0].selectedCategoriesTxt = 'Choose Org Entity';
        }
        else if (currentType == 'orgEntity') {
            tempCategoryNode_PAS = [];
            $scope.selectedCategoriesValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedCategoryNodes.push(e.selections[i].Name);
                tempCategoryNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedCategoriesTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.selectedCategoriesTxt = e.selectionAllNames[0];
            else
                $scope.selectedCategoriesTxt = 'CHOOSE ORG ENTITY';
        }
        //if (currentType == 'orgEntity') {
        //    $scope.selectedCategoriesTxt = "CHOOSE ORG ENTITY";
        //}
        $scope.showTreePopup = false;
        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
    };

    //cbr ends
    $scope.toggleDocumentFilter = function (evt) {
        if ($scope.showFilter == false) {
            $scope.showFilter = true;
            //$rootScope.isFilterVisible = true;
        }
        else {
            $scope.showFilter = false;
            if (evt === 'apply') {
                $scope.showFilterPanel = true;
            }
            //$rootScope.isFilterVisible = false;
        }
    };
    /*filter type*/
    $scope.showFilter = false;
    $scope.toggleFilter = function (e) {
        if ($scope.showFilter == false) {
            $scope.showFilter = true;
            //$rootScope.isFilterVisible = true;
        }
        else {
            $scope.showFilter = false;
            //$rootScope.isFilterVisible = false;
        }
    };

    //save view popup
    $scope.savedViewPopUp = false;
    $scope.savedFilterPopUp = false;
    $scope.filterTypeSave = false;

    $scope.savedViewPopupCallback = function (e, type) {
        if (type == "filter") {
            $scope.filterTypeSave = true;
            $scope.savedFilterPopUp = true;
            //loader for save View popup
            $scope.isloader = true;
            $timeout(function () {
                $scope.isloader = false;
            }, 1000);

            //$scope.savedViewPopUp = false;
            $scope.showfilterViewList = true;
        }
        else {
            $scope.savedViewPopUp = true;
            //$scope.savedFilterPopUp = false;
            $scope.showSavedViewList = true;
        }
        // $scope.showSavedViewList = true;
    };
    $scope.savedViewPopupHideCallback = function () {
        $scope.savedViewPopUp = false;
        $scope.savedFilterPopUp = false;
    };

    $scope.importDocumentFilterTabData = [{
        "id": "documentType",
        "title": "Org Entity",
        "htmlmode": true,
        "active": true,
        "tabsUrl": "tabDocument.html"
    }, {
        "id": "recipientType",
        "title": "Target Segment",
        "htmlmode": true,
        "tabsUrl": "tabHeader3.html"
    }, {
        "id": "dateRange",
        "title": "Accounting Source",
        "htmlmode": true,
        "tabsUrl": "tabHeader4.html"
    }, {
        "id": "advanceDateRange",
        "title": "Default Mapping",
        "htmlmode": true,
        "tabsUrl": "tabHeader5.html"
    }
    ];
    $scope.showFilter = false;
    $scope.documentType = true;
    $scope.recipientType = false;
    $scope.dateRange = false;
    $scope.advanceDateRange = false;

    $scope.tabSelectCallback = function (tab) {

        if (tab.id == 'documentType') {
            $scope.documentType = true;
            $scope.recipientType = false;
            $scope.dateRange = false;
            $scope.advanceDateRange = false;
        }
        else if (tab.id == 'recipientType') {
            $scope.recipientType = true;
            //$scope.period = false;
            //$scope.deliveryStatus = false;
            $scope.documentType = false;
            $scope.dateRange = false;
            $scope.advanceDateRange = false;
        }
        else if (tab.id == 'dateRange') {
            //$scope.approver = false;
            $scope.dateRange = true;
            //$scope.period = false;
            //$scope.deliveryStatus = false;
            $scope.documentType = false;
            $scope.recipientType = false;
            $scope.advanceDateRange = false;
        }
        else if (tab.id == 'advanceDateRange') {
            //$scope.approver = false;
            $scope.advanceDateRange = true;
            //$scope.period = false;
            //$scope.deliveryStatus = false;
            $scope.documentType = false;

            $scope.recipientType = false;
            $scope.dateRange = false;
        }
    };

    $scope.isApplyFilters = false;
    $scope.isSavedView = false;
    $scope.repoList = [
           {
               isChecked: false,
               isHide: false,
               title: "Jorge Neal"
           },
           {
               isChecked: false,
               isHide: false,
               title: "Sonia Barnett"
           },
           {
               isChecked: false,
               isHide: false,
               title: "Alberto Banks"
           },
           {
               isChecked: false,
               isHide: false,
               title: "Luke Frazier"
           },
           {
               isChecked: false,
               isHide: false,
               title: "Willie Kuhn"
           },
           {
               isChecked: false,
               isHide: false,
               title: "Tyron White"
           }
    ];

    $scope.conditionsDataTS = [
     {
         "conditionValuestate": true,
         'isDynamicVal': false,
         "showRange": false,
         "identificationno": {
             "title": "12345",
             "readonly": false,
             "value": "Please Enter",
             "toRange": "20",
             "fromRange": "10",
             "action": "select Action",
             "attribute": "Select attribute"
         },

         "idNoShow": true,
         "idnoLookup": true,
         "isFocus": true,
         "conditionVal": true,
         "conditionAction": true,
         "conditionRange1": true,
         "conditionRange2": true,
         "attributeName": {
             "displaytitle": "Attributes",
             "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
             "selectedoption": []
         },
         "accAttributeName": {
             "displaytitle": "Attributes",
             "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
             "selectedoption": []
         },

         "conditionValue": {
             "displaytitle": "Please Enter",
             "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
             "selectedoption": []
         },
     }];

    $scope.conditionsData = [
     {
         "conditionValuestate": true,
         'isDynamicVal': false,
         "showRange": false,
         "identificationno": {
             "title": "12345",
             "readonly": false,
             "value": "Please Enter",
             "toRange": "20",
             "fromRange": "10",
             "action": "select Action",
             "attribute": "Select attribute"
         },

         "idNoShow": true,
         "idnoLookup": true,
         "isFocus": true,
         "conditionVal": true,
         "conditionAction": true,
         "conditionRange1": true,
         "conditionRange2": true,
         "attributeName": {
             "displaytitle": "Attributes",
             "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
             "selectedoption": []
         },
         "accAttributeName": {
             "displaytitle": "Attributes",
             "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
             "selectedoption": []
         },

         "conditionValue": {
             "displaytitle": "Please Enter",
             "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
             "selectedoption": []
         },
     }];
    $scope.addConditionData = function (data) {
        data.push({
            "conditionValuestate": true,
            "showRange": false,
            "identificationno": {
                "title": "",
                "readonly": false,
                "value": "1234",
                "toRange": "20",
                "fromRange": "10",
            },
            "idNoShow": true,
            "idnoLookup": true,
            "isFocus": true,
            "conditionVal": true,
            "conditionAction": true,
            "conditionRange1": true,
            "conditionRange2": true,
            'isDynamicVal': false,
            "attributeName": {
                "displaytitle": "Attributes",
                "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                "selectedoption": []
            },
            "accAttributeName": {
                "displaytitle": "Attributes",
                "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                "selectedoption": []
            },
            "conditionValue": {
                "displaytitle": "Please Enter",
                "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
                "selectedoption": []
            },
        });
    };

    $scope.defaultMapping = { "name": "" };
    $scope.defaultMappingOptions = [
        { "name": "None" },
        { "name": "Item Master Mapping" },
        { "name": "Org Mapping" },
        { "name": "User Mapping" }
    ];

    // Start: CBR
    var tempCategoryNode_PAS = [],
        categoryObj;



    // Start: CBR
    // Start: CBR
    var tempCategoryNode_PAS = [];
    var tempBUNode_PAS = [];
    var tempRegionNode_PAS = [];

    $scope.treeComponentConfig = {
        isRadio: false,
        getHierarchyOnSelection: true,
        getAllLazyLoadedData: true,
        getUserSelection: true,
        enableLastLevelSelection: false,
        isLazyLoad: false,
        showSelectAll: false,
        showClearSelection: false,
        showSelectionCount: false,
        isReadOnly: false,
        isDisabled: false,
        modalButtonShow: true,
        data: null,
        selectedNodes: "",
        disableLevelSelection: '',
        treeType: 'Generic',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '328px',
        isSearchEnabled: true,
        navigationContext: "PAS",
    };

    var categoryObj, buObj, regionObj;

    var regionData = {
        method: 'GET',
        url: 'shared/popup/models/region.json'
    };

    var currentType = '';
    $scope.treeOpenCallback = function (type) {

        $scope.treeComponentConfig.requestParameter = {
            navigationContext: "PAS"
        };
        currentType = type;
        if (type == 'region') {
            $http(regionData).then(function (response) {
                regionObj = response.data;
                $scope.treeComponentConfig.data = regionObj;
                $scope.treeComponentConfig.title = 'Organizational Entity';
                $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else if (type == 'bu') {
            $http(buData).then(function (response) {
                buObj = response.data;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else {
            $http(categoryData).then(function (response) {

                categoryObj = response.data;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        }
        $scope.showTreePopup = true;
    };

    $scope.selectedCategoriesTxt = "Choose Category";
    $scope.selectedBUTxt = "Choose Business Unit";
    $scope.selectedRegionTxt = "Choose Org Entity";

    $scope.selectedCategoriesValidate = false;
    $scope.selectedBUValidate = false;
    $scope.selectedRegionValidate = false;

    $scope.selectedCategoryNodes = [];
    $scope.selectedBUNodes = [];
    $scope.selectedRegionNodes = [];

    $scope.treeComponentCallback = function (e) {
        if (currentType == 'region') {
            tempRegionNode_PAS = [];
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedRegionNodes.push(e.selections[i].Name);
                tempRegionNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedRegionTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.selectedRegionTxt = e.selectionAllNames[0];
            else
                $scope.selectedRegionTxt = 'Choose Category';
        }
        $scope.showTreePopup = false;
    };
}