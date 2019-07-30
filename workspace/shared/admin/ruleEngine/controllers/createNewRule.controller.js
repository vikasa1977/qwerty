angular
	.module('SMART2')

	.controller('createNewRuleCtrl', ['$scope', '$http', '$timeout', 'storeTempService', 'notification', '$state', '$window', '$filter', createNewRuleCtrlFunc])
    .controller('ruleCreationMethodCtrl', ['$scope', 'shareWithCtrl', '$filter', '$state', ruleCreationMethodCtrlFunc])
    .controller('ruleCreationBasicDetailsCtrl', ['$scope', '$http', '$timeout', 'notification', '$state', 'shareWithCtrl', '$filter', ruleCreationBasicDetailsCtrlFunc])
.controller('superHierarchyCtrl', ['$scope', 'ScrollTo', '$filter', '$sce', '$timeout', '$rootScope', '$state', 'notification', superHierarchyCtrlFunc])
 .controller('addActionTypesCtrl', ['$scope', 'ScrollTo', '$filter', '$sce', '$timeout', '$rootScope', '$state', 'notification', 'conditionScrollTo', addActionTypesCtrlFunc])
    .controller('previewRuleCtrl', ['$scope', '$http', '$timeout', 'notification', '$state', 'shareWithCtrl', '$filter', previewRuleCtrlFunc])
	.filter('highlights', function ($sce) {
	    return function (text, phrase) {
	        if (phrase)
	            text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="highlighted">$1</span>');

	        return $sce.trustAsHtml(text);
	    }
	})
    .service('conditionScrollTo', [function () {
        this.perform = function (aSpeed, onComplete) {
            try {
                aSpeed = typeof aSpeed !== 'undefined' ? aSpeed : 300;

                angular.element('.actionTypeParams .scrollbar-outer').animate({
                    scrollTop: 1000
                }, aSpeed, function () {
                    if (typeof onComplete != "undefined") {
                        onComplete();
                    }
                });
            } catch (e) { }
        };
    }]);

function createNewRuleCtrlFunc($scope, $http, $timeout, storeTempService, notification, $state, $window, $filter) {

    var rfxConfig = {
        method: 'GET',
        url: 'shared/admin/ruleEngine/models/createRule.json'
    };
    $scope.selectedDocumentGroup = "";
    $scope.showDoucmentType = true;
    $scope.changeDocumentGroup = function (indexName) {
        $scope.showDoucmentType = false;
        $scope.selectedDocumentGroup = { 'name': indexName.name };
        $scope.documentType = documentTypeData[indexName.name];
    };

    $scope.actionType = [
            { "name": "Contracts" },
            { "name": "Blanket Approvals" },
    ];
    $scope.changeActionTypeData = function (indexName) {
        $scope.actionType = actionTypeObject[indexName.name];
    };
    var showVisual = false;
    function arrangeFormSectionForVisual() {
        $scope.createRuleFormData.sections[1].isHidden = showVisual;
        $scope.createRuleFormData.sections[2].isHidden = showVisual;
        $scope.createRuleFormData.sections[3].isHidden = !showVisual;
    }
    $scope.showVisualFlowSection = function () {
        showVisual = !showVisual;
        arrangeFormSectionForVisual();
       // $scope.createRuleFormData.sections[0].isActive = !showVisual;
    };
    
    var actionTypeObject = {
        "Template Selection": [
            { "name": "Catalog Requisitions" },
            { "name": "Non Catalog Requisitions" },
            { "name": "New Order" },
            { "name": "Blanket Order" },
            { "name": "Invoice" },
            { "name": "Change Order" },
            { "name": "IR" },
        ],
        "Approvals": [
            { "name": "Contracts" },
            { "name": "Blanket Approvals" },
        ],
        "Submission Check": [
            { "name": "RFX" },
            { "name": "Auction" },
        ],
        "Notification": [
            { "name": "Projects" },
        ],
        "Request Redirection": [
            { "name": "Supplier profile" }
        ],
        "Requisition Order": [
            { "name": "Projects" },
        ],
        "User Defined Exception": [
            { "name": "Raise Exception" },
        ]
    }

    var documentTypeData = {
        "P2P": [
            { "name": "Catalog Requisitions" },
            { "name": "Non Catalog Requisitions" },
            { "name": "New Order" },
            { "name": "Blanket Order" },
            { "name": "Invoice" },
            { "name": "Change Order" },
            { "name": "IR" },
        ],
        "Contracts": [
            { "name": "Contracts" },
            { "name": "Blanket Approvals" },
        ],
        "Sourcing": [
            { "name": "RFX" },
            { "name": "Auction" },
        ],
        "Projects": [
            { "name": "Projects" },
        ],
        "Supplier": [
            { "name": "Supplier profile" }
        ]
    }

    $scope.documentType = [];

    $scope.updateRulesMat = function () {
        Materialize.toast('Rule Updated Successfully', 2000);
    };

    $scope.basicDetail = {
        ruleName: { title: '' },
        ruleNumber: { title: 121 },
        description: { title: '' },
        selectedBusinessCase: { 'name': 'Business Case' },
        docGroup: { "name": "Catalog Requisitions" },
        selectedRuleCreationOption: {
            "id": "1",
            "name": "Standard Creation"
        },
        manufName: []
    };
    $scope.pageType = {};
    $scope.pageType.type = $state.params.type;

    var TempData = {};
    $http(rfxConfig).then(function (response) {
        $scope.config = response.data;
        TempData = storeTempService.get();

        if (!TempData.hasOwnProperty('collection')) {
            TempData = { collection: "collection 1", docName: "Rule 1" };
        }

        $scope.createRuleFormData = response.data.formConfig;
        arrangeFormSectionForVisual();
        if ($state.params.mode == 'edit') {
            $scope.selectedDocumentGroup = { 'name': 'P2P' };

            $scope.changeDocumentGroup({ 'name': 'P2P' })

            $scope.documentType[0].ischeck = true;
            $scope.documentType[1].ischeck = true;
            $scope.documentType[2].ischeck = true;
            $scope.documentType[4].ischeck = true;
            $scope.documentType[6].ischeck = true;
            $scope.basicDetail = {
                ruleName: { title: TempData.docName },

                ruleNumber: { title: 200 },
                description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
                selectedBusinessCase: { 'name': 'Business Case', preview: true },
                docGroup: { "name": "Catalog Requisitions", preview: true },
                selectedRuleCreationOption: {
                    "id": "1",
                    "name": "Standard Creation"
                },
                manufName: [{ "mfgName": TempData.collection }],
                businessCase: { 'name': 'Approvals' }
            }

            $scope.pageTypetitle = TempData.docName + ' - ' + $scope.pageType.type;

            $scope.pageType.mode = 'edit';
            $scope.historyData = [
                {
                    updatedOn: "28/01/2017 08:45 am",
                    updatedBy: "Yogesh B",
                    data: {
                        ruleName: { title: TempData.docName },
                        description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
                        selectedBusinessCase: { 'name': 'Business Case', preview: true },
                        docGroup: { "name": "Catalog Requisitions", preview: true },
                        selectedRuleCreationOption: {
                            "name": "Approval Matrix"
                        },
                        manufName: [{ "mfgName": 'collection 2' }],
                        businessCase: { 'name': 'Approvals' }
                    }
                },
                {
                    updatedOn: "28/01/2017 10:45 am",
                    updatedBy: "Yogesh B",
                    data: {
                        ruleName: { title: 'Rule 2' },
                        description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
                        selectedBusinessCase: { 'name': 'Business Case', preview: true },
                        docGroup: { "name": "Catalog Requisitions", preview: true },
                        selectedRuleCreationOption: {
                            "name": "Approval Matrix"
                        },
                        manufName: [{ "mfgName": 'collection 2' }],
                        businessCase: { 'name': 'Approvals' }
                    }
                },
                {
                    updatedOn: "28/01/2017 11:45 am",
                    updatedBy: "Yogesh B",
                    data: {
                        ruleName: { title: TempData.docName },
                        description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
                        selectedBusinessCase: { 'name': 'Business Case', preview: true },
                        docGroup: { "name": "Catalog Requisitions", preview: true },
                        selectedRuleCreationOption: {
                            "id": "1",
                            "name": "Standard Creation"
                        },
                        manufName: [{ "mfgName": TempData.collection }],
                        businessCase: { 'name': 'Approvals' }
                    }
                },
                {
                    updatedOn: "28/01/2017 10:45 pm",
                    updatedBy: "Yogesh B",
                    data: {
                        ruleName: { title: TempData.docName },
                        description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
                        selectedBusinessCase: { 'name': 'Business Case', preview: true },
                        docGroup: { "name": "Catalog Requisitions", preview: true },
                        selectedRuleCreationOption: {
                            "id": "1",
                            "name": "Standard Creation"
                        },
                        manufName: [{ "mfgName": TempData.collection }],
                        businessCase: { 'name': 'Approvals' }
                    }
                },
                {
                    updatedOn: "29/01/2017 10:45 am",
                    updatedBy: "Yogesh B",
                    data: {
                        ruleName: { title: TempData.docName },
                        description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
                        selectedBusinessCase: { 'name': 'Business Case', preview: true },
                        docGroup: { "name": "Catalog Requisitions", preview: true },
                        selectedRuleCreationOption: {
                            "id": "1",
                            "name": "Standard Creation"
                        },
                        manufName: [{ "mfgName": TempData.collection }],
                        businessCase: { 'name': 'Approvals' }
                    }
                },
                {
                    updatedOn: "30/01/2017 10:45 am",
                    updatedBy: "Yogesh B",
                    data: {
                        ruleName: { title: 'Rule 2' },
                        description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
                        selectedBusinessCase: { 'name': 'Business Case', preview: true },
                        docGroup: { "name": "Catalog Requisitions", preview: true },
                        selectedRuleCreationOption: {
                            "name": "Approval Matrix"
                        },
                        manufName: [{ "mfgName": 'collection 2' }],
                        businessCase: { 'name': 'Approvals' }
                    }
                },
            ]
        }
    });
    // End: GET createRule form config data
    // history popup data start

    $scope.viewhistoryFn = function (data, index) {
        $scope.basicDetail = data.data;
        $scope.basicDetail.ruleName = $scope.basicDetail.ruleName + ' - version ' + index;
        $scope.showviewhistoryPopup = false;
        $scope.pageType.historymode = true;
    };
    $scope.hidehistoryPageCallback = function () {
        $scope.pageType.historymode = false;
        $scope.basicDetail = {
            ruleName: { title: TempData.docName },
            description: { title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry essentially' },
            selectedBusinessCase: { 'name': 'Business Case', preview: true },
            docGroup: { "name": "Catalog Requisitions", preview: true },
            selectedRuleCreationOption: {
                "id": "1",
                "name": "Standard Creation"
            },
            manufName: [{ "mfgName": TempData.collection }],
            businessCase: { 'name': 'Approvals' }
        };
    };
    $scope.showviewhistoryPopup = false;
    $scope.showhistoryPopupCallback = function () {
        $scope.showviewhistoryPopup = true;
    };
    $scope.hidehistoryPopupCallback = function () {
        $scope.showviewhistoryPopup = false;
    };

    // Start: Data init
    
    $scope.typeOptionsmfgName = [{ "mfgName": "collection 1" }, { "mfgName": "collection 2", }, { "mfgName": "collection 3", }, { "mfgName": "collection 4", }, { "mfgName": "Dell", }, { "mfgName": "Asus", }, { "mfgName": "Dummy", }, { "mfgName": "Neva", }, { "mfgName": "Norel", }, { "mfgName": "Jakson", }, { "mfgName": "Vivaa", }, { "mfgName": "Dutch", }, ];


    $scope.conditionAttr = { "name": "Catalog Requisitions" };

    $scope.conditionAttrOption = [
        { "name": "Catalog Requisitions" },
        { "name": "New order" },
        { "name": "Change Order" },
        { "name": "Release Order" },
        { "name": "PO Receipt" },
        { "name": "PO Invoice" },
        { "name": "IR with PO" },
        { "name": "Payment Request" },
        { "name": "Contracts" },
        { "name": "Blanket Approvals" },
        { "name": "RFX" },
        { "name": "Auction" },
        { "name": "Projects" },
        { "name": "Supplier profile" }
    ];

    $scope.conditionAttr = { "name": "Catalog Requisitions" };

    $scope.conditionAttrOption = [
        { "name": "Catalog Requisitions" },
        { "name": "New order" },
        { "name": "Change Order" },
        { "name": "Release Order" },
        { "name": "PO Receipt" },
        { "name": "PO Invoice" },
        { "name": "IR with PO" },
        { "name": "Payment Request" },
        { "name": "Contracts" },
        { "name": "Blanket Approvals" },
        { "name": "RFX" },
        { "name": "Auction" },
        { "name": "Projects" },
        { "name": "Supplier profile" }
    ];

    $scope.disablePreview = true;
    $scope.CancelUpdateRules = function (e) {
        var createOb = {
            type: 'confirm',
            message: "<p>Closing this will not save the updated data.</p><p>Are you sure you want to close?</p>",
            buttons: [{
                title: "Yes",
                result: "ok"
            }, {
                title: "No",
                result: "no"
            }]
        };

        notification.notify(createOb, function (response) {
            if (response.result === 'ok') {
                $state.go('admin.ruleSummary')
            }
        });
    }
    $scope.CancelRules = function (e) {
        var createOb = {
            type: 'confirm',
            message: "Are you sure you want to cancel the rule creation?",
            buttons: [{
                title: "OK",
                result: "ok"
            }]
        };

        notification.notify(createOb, function (response) {
            if (response.result === 'ok') {
                $state.go('admin.ruleSummary')
            }
        });
    }
    $scope.publistMat = false
    $scope.validateRules = function (e) {
        var createOb = {
            type: "inform",
            message: "<p>100 rules generated with 10 conflicts.</p><p>Please resolve all the conflicts to publish rule.</p>",
            buttons: [{
                title: "OK",
                result: "ok"
            }]
        };

        notification.notify(createOb, function (response) {
            if (response.result === 'ok') {
                $scope.publistMat = true;
            }
        });
    }

    $scope.publishRules = function () {
        Materialize.toast('Rule created successfully', 2000);
    };
    $scope.publishRulesMat = function () {
        Materialize.toast('100 Rules created successfully', 2000);
    };
};

function ruleCreationMethodCtrlFunc($scope, shareWithCtrl, $filter, $state) {
    $scope.actionTypeData = {
        selectedOption: { "name": "Approval Group", data: [] },
        data: [
            {
                "name": "Approval Group"
            },
            {
                "name": "Auto Approve"
            },
            {
                "name": "Auto Reject"
            },
            {
                "name": "Notify"
            },
            {
                "name": "Supervisory Hierarchy"
            },
            {
                "name": "Financial Review"
            },
            {
                "name": "Category Approvals"
            }
        ]
    }

    //popup starts
    $scope.qualificationCheckContent = false;
    $scope.questionnaireTypeOptions01 = [{ title: 'STATIC' }];
    $scope.questionnaireTypeOptions02 = [{ title: 'DYNAMIC' }];
    $scope.selectedQType = { title: 'DYNAMIC' };
    $scope.selectedquestionnaireType = { title: 'STATIC' };
    $scope.qualificationCheck = function () {
        $scope.qualificationCheckContent = true;
        $scope.questionnaireCheckContent = false;
    };
    $scope.questionnaireCheckContent = true;
    $scope.questionnaireCheck = function () {
        $scope.qualificationCheckContent = false;
        $scope.questionnaireCheckContent = true;
    };
    $scope.questionnaireTypeAdded = { title: 'STATIC' };
    $scope.dynamicValuePopup = false;
    $scope.dynamicValuePopupCallback = function (e, val) {
        $scope.index = e;
        if (val == 1) {
            $scope.commonCondition = true;
            $scope.otherCondition = false;
        } else{ 
            $scope.otherCondition = true;
            $scope.commonCondition = false;
        }
        $scope.dynamicValuePopup = true;
    };

    $scope.showEnableRuleGroup = false;

  

    $scope.showEnableGroupCallback = function () {
        $scope.showEnableRuleGroup = true;
    };

    $scope.hideEnableGroupPopupCallback = function (event) {
        $scope.showEnableRuleGroup = false;

    };

    $scope.onChangeAction = function (data, Ind) {
        data.previewIcon = true;
    };

    $scope.document = {
        'isEnableLevel':false,
        'isEnableRuleGroup':false
    };
    $scope.enableGrp = function (isEnableRuleGroup) {
     if (isEnableRuleGroup) {
            $('.commmonCondtionData').scope().$parent.document.isEnableLevel = true;
        } else {
            $('.commmonCondtionData').scope().$parent.document.isEnableLevel = false;
        }
       
    };

    $scope.enableRule = function (isEnableLevel) {
     
        if (isEnableLevel) {
            $('.commmonCondtionData').scope().$parent.document.isEnableLevel = true;
            $('.commmonCondtionData').scope().$parent.document.isEnableRuleGroup = false;
        } else {
            $('.commmonCondtionData').scope().$parent.document.isEnableLevel = false;
            $('.commmonCondtionData').scope().$parent.document.isEnableRuleGroup = false;
        }
    };

    $scope.addRuleGrp = function (document) {
     switch (document) {
            case document.isEnableLevel:
                $('.commmonCondtionData').scope().$parent.document.isEnableLevel = true;
                break;
               
            case document.isEnableRuleGroup:
                $('.commmonCondtionData').scope().$parent.document.isEnableRuleGroup = true;
                break;
        }

    };
    $scope.hideAddLinkedDocumentPopupCallback = function () {
        $('.commmonCondtionData').scope().$parent.document.isEnableLevel = false;
        $('.commmonCondtionData').scope().$parent.document.isEnableRuleGroup = false;

    };

    $scope.resetToLink = false;
    $scope.isDynamicVal = false;
    $scope.isDynamicVal1 = false;
    $scope.setDynamicVal = function () {
        $scope.dynamicValuePopup = false;
        if ($scope.commonCondition) {
            $('.commmonCondtionData').scope().$parent.conditionsData[$scope.index].resetToLink = true;
            $('.commmonCondtionData').scope().$parent.conditionsData[$scope.index].isDynamicVal = true;
            $('.commmonCondtionData').scope().$parent.conditionsData[$scope.index].amountValue = $scope.selectedOptionValue1 + ' ' + $scope.selectedOptionValue2 + ' ' + $scope.selectedOptionValue3;
            $('.commmonCondtionData').scope().$parent.conditionsData[$scope.index].amtVal = $scope.selectedOptionValue1 + ' ' + $scope.selectedOptionValue2 + ' ' + $scope.selectedOptionValue3;
        } else {
            $('.otherConditionsTable').scope().$parent.otherConditionsData[$scope.index].resetToLink = true;
            $('.otherConditionsTable').scope().$parent.otherConditionsData[$scope.index].isDynamicVal1 = true;
            $('.otherConditionsTable').scope().$parent.otherConditionsData[$scope.index].amountValue = $scope.selectedOptionValue1 + ' ' + $scope.selectedOptionValue2 + ' ' + $scope.selectedOptionValue3;
            $('.otherConditionsTable').scope().$parent.otherConditionsData[$scope.index].amtVal = $scope.selectedOptionValue1 + ' ' + $scope.selectedOptionValue2 + ' ' + $scope.selectedOptionValue3;
        }
    }

    $scope.resetValue = function (indx) {
        if ($scope.commonCondition) {
            $('.commmonCondtionData').scope().$parent.conditionsData[indx].amtVal = '';
            $('.commmonCondtionData').scope().$parent.conditionsData[indx].resetToLink = false;
            $('.commmonCondtionData').scope().$parent.conditionsData[indx].isDynamicVal = false;
        } else {
            $('.otherConditionsTable').scope().$parent.otherConditionsData[indx].amtVal = '';
            $('.otherConditionsTable').scope().$parent.otherConditionsData[indx].resetToLink = false;
            $('.otherConditionsTable').scope().$parent.otherConditionsData[indx].isDynamicVal1 = false;
        }
    };

    $scope.dynamicValuePopupOnHideCallback = function (e) {
        $scope.dynamicValuePopup = false;
    };

    $scope.selectedOption1 = function (option) {
        $scope.selectedOptionValue1 = option.title;
    };
    $scope.selectedOption2 = function (option) {
        $scope.selectedOptionValue2 = option.title;
    };
    $scope.onChangeTexValue = function (value) {
        $scope.selectedOptionValue3 = value;
    }
    

    $scope.questionsNo = [{ title: 'Option1' }, { title: 'Option2' }, { title: 'Option3' }, { title: 'Option4' }, { title: 'Option5' }, { title: 'Option6' }, { title: 'Option7' }, { title: 'Option8' }, { title: 'Option9' }, { title: 'Option10' }, { title: 'Option11' }, { title: 'Option12' }];
    $scope.selectedServicesInfo1 = { title: 'Option1' };
    $scope.questionsNo2 = [{ title: '%' }, { title: '+' }, { title: '-' }, { title: '*' }, { title: '/' }];
    $scope.selectedServicesInfo2 = { title: '%' };
    $scope.fromRange = "";
    $scope.emptyRule = [
            {
                "rule": "this === '' || this === null",
                "error": "Enter value"
            }
    ];

    $scope.selectedOptionValue1 = $scope.selectedServicesInfo1.title;
    $scope.selectedOptionValue2 = $scope.selectedServicesInfo2.title;
    $scope.selectedOptionValue3 = $scope.fromRange;

    $scope.conditionsData =
       [
           {
               "questionsNo": true,
               "conditionValuestate": true,
               "showRange": false,
               "isVisibleSwitch": true,
               "fromRange": 0,
               "isValidate": false
           }
       ];

    $scope.addConditionData = function (data) {
        data.push({
            "questionsNo": true,
            "conditionValuestate": true,
            "showRange": false,
            "isVisibleSwitch": true,
            "fromRange": 0
        });
        conditionScrollTo.perform();
    };

    $scope.copyData = function (fullData, currentData, Index) {
        angular.forEach(currentData, function (value, ind) {
          currentData[ind].approvalType.selectedoption = { "name": value.approvalType.selectedoption.name };
        });
        var datacopyItm = angular.copy(fullData);
        datacopyItm.identificationno.actionCode = '';
        currentData.splice((Index + 1), 0, datacopyItm);
    };

    $scope.deleteConditionData = function (data, Ind) {
        data.splice(Ind, 1);
    };
    //popup ends

    $scope.addidentificationData = function (data) {
        data.push({
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
            "poolValueShow": data[0].configName === 'RFX' ? true : false,
            "poolTypeShow": data[0].configName === 'RFX' ? true : false,
            "approvalType": {
                "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                "selectedoption": { "name": "Approval matrix" }
            },
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                "selectedoption": []
            },
            
            "poolTypeOptions": {
                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                "selectedoption": { "name": "Select Pool Type" }
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": []
            }
        });
    };

    $scope.deleteConditionData = function (data, Ind) {
        data.splice(Ind, 1);
    };

    $scope.addMatchStatusData = function (data) {
        data.push({
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
            "poolValueShow": data[0].configName === 'RFX' ? true : false,
            "poolTypeShow": data[0].configName === 'RFX' ? true : false,
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Please Enter",
                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                "selectedoption": []
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Please Enter",
                "options": $scope.matchStatusData[0].leadApprovalGroup.options,
                "selectedoption": []
            }
        });
    };

    $scope.onConfigureGroupLookUpHide = function () {
        if (!$scope.showAddExceptionPopUp) {
            $scope.showConfigureApprovalGroupPopup = true;
        }
    };
  $scope.onConfigureGroupLookUpShow = function () {
        $scope.configureApprovalGroupPopupHideCallback();
    };
     
    // Start: Configure Approval Group Popup
    $scope.showConfigureApprovalGroupPopup = false;
    $scope.showConfigureSuperHierarchyPopup = false;
    $scope.showConfigureApprovalGroupPopupCallback = function (e) {
        $scope.showConfigureApprovalGroupPopup = true;

        if (!(e.name == "Raise Exception")) {
            $scope.showRaiseException = true;
            $scope.configurationName = e.name;
            $scope.helpText = "This rule category enables users to assign order contract/buyers to approved requisitions. This rule is triggered after a requisition is approved.";
            if (e.name === 'RFX') {
                $scope.tableHeaderData = [
                       {
                           "Name": "Action Code",
                           "leftAlign": true
                       },
                        {
                            "Name": "Approval Type",
                            "Country": "Approval Type",
                            "leftAlign": true
                        },
                       {
                           "Name": "Group",
                           "Country": "Group",
                           "leftAlign": true
                       }, {
                           "Name": "Lead Approval",
                           "Country": "Lead Approval",
                           "leftAlign": true
                       }, {
                           "Name": "Auto Approval",
                           "Country": "Auto Approval",
                           "centerAlign": true
                       }, {
                           "Name": "Self Approval",
                           "Country": "Self Approval",
                           "centerAlign": true
                       }, {
                           "Name": "Pool Type",
                           "Country": "Pool Type",
                           "leftAlign": true
                       }, {
                           "Name": "Pool Type",
                           "Country": "Auto Approval",
                           "leftAlign": true
                       }, {
                           "Name": "",
                           "Country": "Auto Approval",
                           "rightAlign": true
                       }, {
                           "Name": "",
                           "Country": "Auto Approval",
                           "rightAlign": true
                       }
                ]

                $scope.identificationData = [
                        {
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
                            "poolTypeShow": true,
                            "approvalType": {
                                "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                                "selectedoption": { "name": "Approval matrix" }
                            },
                            "group": {
                                "displaytitle": "Please Enter",
                                "displaytext": "Group",
                                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                                "selectedoption": []
                            },

                            "poolTypeOptions": {
                                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                                "selectedoption": { "name": "Select Pool Type" }
                            },
                            "leadApprovalGroup": {
                                "displaytitle": "Please Enter",
                                "displaytext": "Lead Approval",
                                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                                "selectedoption": []
                            },
                            "configName" : e.name
                        }];
            } else {

                $scope.tableHeaderData = [
                                   {
                                       "Name": "Action Code",
                                       "Country": "Germany",
                                       "Filter": "Neque porro quisquam est qui"
                                   },
                                   {
                                       "Name": "Approval Type",
                                       "Country": "Approval Type",
                                       "Filter": "Neque porro quisquam est qui"
                                   },
                                   {
                                       "Name": "Group",
                                       "Country": "Group",
                                       "Filter": "Neque porro quisquam est qui"
                                   }, {
                                       "Name": "Lead Approval",
                                       "Country": "Lead Approval",
                                       "Filter": "Neque porro quisquam est qui"
                                   }, {
                                       "Name": "Auto Approval",
                                       "Country": "Auto Approval",
                                       "centerAlign": true,
                                       "Filter": "Neque porro quisquam est qui"
                                   }, {
                                       "Name": "Self Approval",
                                       "Country": "Self Approval",
                                       "centerAlign": true,
                                       "Filter": "Neque porro quisquam est qui"
                                   }, {
                                       "Name": "",
                                       "Country": "Auto Approval"

                                   }, {
                                       "Name": "",
                                       "Country": "Auto Approval"
                                   }
                ]

                $scope.identificationData = [
                        {
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
                            "poolValueShow": false,
                            "poolTypeShow": false,
                            "group": {
                                "displaytitle": "Please Enter",
                                "displaytext": "Group",
                                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                                "selectedoption": []
                            },
                            "approvalType": {
                                "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                                "selectedoption": { "name": "Approval matrix" }
                            },
                            "poolTypeOptions": {
                                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                                "selectedoption": { "name": "Select Pool Type" }
                            },
                            "leadApprovalGroup": {
                                "displaytitle": "Please Enter",
                                "displaytext": "Lead Approval",
                                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                                "selectedoption": []
                            },
                            "configName": e.name
                        }];
            }
        } else {
            $scope.showRaiseException = false;
            $scope.configurationName = e.name;
            $scope.helpText = "This enable user to create  user defined exception on invoice matching. You can either raise exception for a document. Additionally, you can also supress a specific exception for a matching status.";
            $scope.tableHeaderData = [
                       {
                           "Name": "Action Code",
                           "leftAlign": true
                       }, {
                           "Name": "Approval Required Exception",
                           "leftAlign": true
                       }, {
                           "Name": "Match Status",
                           "centerAlign": true
                       } 
            ]
            $scope.matchStatusData = [
                       {
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
                           "poolTypeShow": true,
                           "group": {
                               "displaytitle": "Please Enter",
                               "displaytext": "Please Enter",
                               "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                               "selectedoption": []
                           },
                           "leadApprovalGroup": {
                               "displaytitle": "Please Enter",
                               "displaytext": "Exceptions",
                               "options": [{ "name": "System Exception 1", "check": false }, { "name": "System Exception 2", "check": false }, {
                                   "name": "System Exception 3", "check": false
                           }],
                               "selectedoption": []
                           },
                           "configName": e.name
                       }];
        }
    };

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

    $scope.showAddExceptionPopUp = false;
    $scope.addNewException = function (indx) {
        $scope.showConfigureApprovalGroupPopup = false;
        $scope.showAddExceptionPopUp = true;
        $scope.indexValue = indx;
        $scope.exceptionName = {'name':''};
        //return "kiran";
    };
    $scope.exceptionName = { 'name': '' };
    $scope.AddException = function () {
        if ($scope.exceptionName.name != '') {
            $scope.matchStatusData[$scope.indexValue].leadApprovalGroup.options.unshift({ 'check': true, 'name': $scope.exceptionName.name, 'value': $scope.exceptionName.name });
            $scope.matchStatusData[$scope.indexValue].leadApprovalGroup.selectedoption = { "name": $scope.exceptionName.name, "check": true }
        }
    };
 
    $scope.configureApprovalGroupPopupHideCallback = function (e) {
        $scope.showConfigureApprovalGroupPopup = false;
    };
    
    $scope.showAddExceptionPopUpHideCallback = function (e) {
        $scope.showConfigureApprovalGroupPopup = true;
        $scope.showAddExceptionPopUp = false;
    };

     $scope.showConfigureSuperHierarchyPopupCallback = function (e) {
         $scope.showConfigureSuperHierarchyPopup = true;
     };

    $scope.configureSuperHierarchyPopupHideCallback = function () {
        $scope.showConfigureSuperHierarchyPopup = false;
    };

    if ($state.params.mode == 'edit' && $state.params.type == "Standard Creation") {
        $scope.isApproval = true;
        $scope.autoApprove = true;
        $scope.autoReject = true;
    }
    if ($state.params.mode == 'edit' && $state.params.type == "Approval Matrix") {
        $scope.isApproval = true;
        $scope.isSuperHierarchy = true;
    }
    $scope.ruleCreationOptions = [{
        "id": "1",
        "name": "Standard Creation"
    }, {
        "id": "2",
        "name": "Approval Matrix"
    }];

    $scope.selectedonoffOptions = {
        "id": "1",
        "name": "Standard Creation"
    };

    $scope.changeRule = function (currentSelected) { };


};

function ruleCreationBasicDetailsCtrlFunc($scope, $http, $timeout, notification, $state, shareWithCtrl, $filter) {

    $scope.documentGroup = [
      { 'name': 'P2P' },
      { 'name': 'Contracts' },
      { 'name': 'Sourcing' },
      { 'name': 'Projects' },
      { 'name': 'Supplier' }
    ];

    $scope.ruleNumber = "121";
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };
 
    $scope.businessCase = { "name": "Approvals" };

    $scope.businessCaseOption = [
        { 'name': 'Approvals' },
        { 'name': 'Submission Check' },
        { 'name': 'Template Selection' },
        { 'name': 'Notification' },
        { 'name': 'Request Redirection' },
        { 'name': 'Requisition Order' },
        { 'name': 'User Defined Exception' }];

    $scope.selectedRuleCreationOption = { 'name': 'Standard Creation' };

    $scope.ruleCreationOptions = [{
        "id": "1",
        "name": "Standard Creation"
    }, {
        "id": "2",
        "name": "Approval Matrix"
    }];

    $scope.changeRule = function (currentSelected) { };

    $scope.docGroupOption = [
        { "name": "Catalog Requisitions" },
        { "name": "New order" },
        { "name": "Change Order" },
        { "name": "Release Order" },
        { "name": "PO Receipt" },
        { "name": "PO Invoice" },
        { "name": "IR with PO" },
        { "name": "Payment Request" },
        { "name": "Contracts" },
        { "name": "Blanket Approvals" },
        { "name": "RFX" },
        { "name": "Auction" },
        { "name": "Projects" },
        { "name": "Supplier profile" }
    ];
};

function superHierarchyCtrlFunc($scope, ScrollTo, $filter, $sce, $timeout, $rootScope, $state, notification) {
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };

    $scope.superHierachy = [
       {
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
           "dpaTypeOptions": {
               "options": [{ "name": "Select DPA Type" }, { "name": "Double" }, { "name": "Single" }],
               "selectedoption": { "name": "Select DPA Type" }
           },
           "usehierarchy": {
               "options": [{ "name": "Requester" }, { "name": "Order contact" }, { "name": "Manager" }],
               "selectedoption": { "name": "Order contact" }
           },
           "minApproval": "Please Enter",
           "enityType": {
               "displaytitle": "Please Enter",
               "displaytext": "enityType",
               "options": [{ "name": "123ABC", "check": false }, { "name": "190XYZ", "check": false }, { "name": "178KLM", "check": false }],
               "selectedoption": []
           },
           "forceSox": {
               "displaytitle": "Please Enter",
               "displaytext": "enityType",
               "options": [{ "name": "XYZ", "check": false }, { "name": "ABC", "check": false }, { "name": "KLM", "check": false }],
               "selectedoption": []
           },
           "leadApprovalGroup": {
               "displaytitle": "Please Enter",
               "displaytext": "Lead Approval",
               "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
               "selectedoption": []
           },
           "selfApprovalGroup": {
               "displaytitle": "Please Enter",
               "displaytext": "Self Approval",
               "options": [{ "name": "a.d@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "n.g@gep.com", "check": false }],
               "selectedoption": []
           }
       }];
    $scope.addsuperHierachy = function (data) {
        data.push({
            "identificationno": {
                "title": "12345",
                "readonly": false,
                "actionCode": "",
                "leadApproval": "Please Enter",
                "poolValue": ""
            },
            "idNoShow": true,
            "idnoLookup": true,
            "isFocus": true,
            "actionCodeShow": true,
            "leadApprovalShow": true,
            "poolValueShow": true,
            "dpaTypeOptions": {
                "options": [{ "name": "Select DPA Type" }, { "name": "Double" }, { "name": "Single" }],
                "selectedoption": { "name": "Select DPA Type" }
            },
            "usehierarchy": {
                "options": [{ "name": "Requester" }, { "name": "Order contact" }, { "name": "Manager" }],
                "selectedoption": { "name": "Order contact" }
            },
            "minApproval": "Please Enter",
            "enityType": {
                "displaytitle": "Please Enter",
                "displaytext": "enityType",
                "options": [{ "name": "123ABC", "check": false }, { "name": "190XYZ", "check": false }, { "name": "178KLM", "check": false }],
                "selectedoption": []
            },
            "forceSox": {
                "displaytitle": "Please Enter",
                "displaytext": "enityType",
                "options": [{ "name": "XYZ", "check": false }, { "name": "ABC", "check": false }, { "name": "KLM", "check": false }],
                "selectedoption": []
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": []
            },
            "selfApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Self Approval",
                "options": [{ "name": "a.d@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "n.g@gep.com", "check": false }],
                "selectedoption": []
            }
        });
    };


    if ($state.params.mode == 'edit' && $state.params.type == "Approval Matrix") {
        $scope.superHierachy = [{
            "actionCodeShow": true,
            "poolValueShow": true,

            "identificationno": { "actionCode": "SUP.CC1", "poolValue": '124' },
            "usehierarchy": {
                "options": [{ "name": "Requester" }, { "name": "Order contact" }, { "name": "Manager" }],
                "selectedoption": { "name": "Requester" }
            },
            "selfApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Self Approval",
                "options": [{ "name": "a.d@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "n.g@gep.com", "check": false }],
                "selectedoption": [{ "name": "a.d@gep.com", "check": false }]
            },
            "minApproval": "3",
            "dpaTypeOptions": {
                "options": [{ "name": "Select DPA Type" }, { "name": "Double" }, { "name": "Single" }],
                "selectedoption": { "name": "Double" }
            },
            "enityType": {
                "displaytitle": "Please Enter",
                "displaytext": "enityType",
                "options": [{ "name": "123ABC", "check": false }, { "name": "190XYZ", "check": false }, { "name": "178KLM", "check": false }],
                "selectedoption": [{ "name": "123ABC", "check": false }]
            },
            "forceSox": {
                "displaytitle": "Please Enter",
                "displaytext": "enityType",
                "options": [{ "name": "XYZ", "check": false }, { "name": "ABC", "check": false }, { "name": "KLM", "check": false }],
                "selectedoption": [{ "name": "XYZ", "check": false }]
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": [{ "name": "y.s@gep.com", "check": false }]
            }
        },
        {
            "actionCodeShow": true,
            "poolValueShow": true,
            "identificationno": { "actionCode": "SUP.CC2", "poolValue": '156' },
            "usehierarchy": {
                "options": [{ "name": "Requester" }, { "name": "Order contact" }, { "name": "Manager" }],
                "selectedoption": { "name": "Order contact" }
            },
            "selfApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Self Approval",
                "options": [{ "name": "a.d@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "n.g@gep.com", "check": false }],
                "selectedoption": [{ "name": "r.d@gep.com", "check": false }]
            },
            "minApproval": "4",
            "dpaTypeOptions": {
                "options": [{ "name": "Select DPA Type" }, { "name": "Double" }, { "name": "Single" }],
                "selectedoption": { "name": "Single" }
            },
            "enityType": {
                "displaytitle": "Please Enter",
                "displaytext": "enityType",
                "options": [{ "name": "123ABC", "check": false }, { "name": "190XYZ", "check": false }, { "name": "178KLM", "check": false }],
                "selectedoption": [{ "name": "190XYZ", "check": false }]
            },
            "forceSox": {
                "displaytitle": "Please Enter",
                "displaytext": "enityType",
                "options": [{ "name": "XYZ", "check": false }, { "name": "ABC", "check": false }, { "name": "KLM", "check": false }],
                "selectedoption": [{ "name": "ABC", "check": false }]
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": [{ "name": "r.d@gep.com", "check": false }]
            }
        },
         {
             "actionCodeShow": true,
             "poolValueShow": true,
             "identificationno": { "actionCode": "SUP.CC3", "poolValue": '190' },
             "usehierarchy": {
                 "options": [{ "name": "Requester" }, { "name": "Order contact" }, { "name": "Manager" }],
                 "selectedoption": { "name": "Manager" }
             },
             "enityType": {
                 "displaytitle": "Please Enter",
                 "displaytext": "enityType",
                 "options": [{ "name": "123ABC", "check": false }, { "name": "190XYZ", "check": false }, { "name": "178KLM", "check": false }],
                 "selectedoption": [{ "name": "178KLM", "check": false }]
             },
             "selfApprovalGroup": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Self Approval",
                 "options": [{ "name": "a.d@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "n.g@gep.com", "check": false }],
                 "selectedoption": [{ "name": "n.g@gep.com", "check": false }]
             },
             "forceSox": {
                 "displaytitle": "Please Enter",
                 "displaytext": "enityType",
                 "options": [{ "name": "XYZ", "check": false }, { "name": "ABC", "check": false }, { "name": "KLM", "check": false }],
                 "selectedoption": [{ "name": "KLM", "check": false }]
             },
             "minApproval": "2",
             "dpaTypeOptions": {
                 "options": [{ "name": "Select DPA Type" }, { "name": "Double" }, { "name": "Single" }],
                 "selectedoption": { "name": "Double" }
             },
             "leadApprovalGroup": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Lead Approval",
                 "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                 "selectedoption": [{ "name": "s.m@gep.com", "check": false }]
             }
         },
        ]
    }

    $scope.onforceSoxHide = function () {
        $scope.showConfigureSuperHierarchyPopupCallback();
    };
    $scope.onforceSoxShow = function () {
        $scope.configureSuperHierarchyPopupHideCallback();
    };
    $scope.onenityTypeHide = function () {
        $scope.showConfigureSuperHierarchyPopupCallback();
    };
    $scope.onenityTypeShow = function () {
        $scope.configureSuperHierarchyPopupHideCallback();
    };
    $scope.onselfApprovalGroupHide = function () {
        $scope.showConfigureSuperHierarchyPopupCallback();
    };
    $scope.onselfApprovalGroupShow = function () {
        $scope.configureSuperHierarchyPopupHideCallback();
    };
    $scope.onleadApprovalGroupHide = function () {
        $scope.showConfigureSuperHierarchyPopupCallback();
    };
    $scope.onleadApprovalGroupShow = function () {
        $scope.configureSuperHierarchyPopupHideCallback();
    };


    $scope.selectedoption = { 'name': 'Percentage' };

    $scope.identificationsourcetype = [{
        "name": "Percentage"
    }, {
        "name": "Number"
    }];
    $scope.showAppMatrixPopup = false;
    $scope.addAttributesData = [];
    $scope.addMatrixPopupCallback = function (flag) {
        $scope.showAppMatrixPopup = true;
        $scope.martix.data = angular.copy($scope.addAttributesData);
        $scope.shallowCopyData = [];
        if ($scope.martix.data.length === 0) {
            $scope.shallowCopyData = [
                            {
                                "actions": {
                                    "displaytitle": "Select Action",
                                    "displaytext": "Action",
                                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                                    "selectedoption": []
                                }
                            }];
        };
    }

    $scope.hideaddMatrixPopupCallback = function () {
        $scope.showAppMatrixPopup = false;
        $scope.shallowCopyData = [];
    };

    $scope.onConfigureGroupLookUpHide = function () {
        $scope.showConfigureApprovalGroupPopupCallback();
    };
    $scope.onConfigureGroupLookUpShow = function () {
        $scope.configureApprovalGroupPopupHideCallback();
    };

    $scope.configureAttr = false;
    $scope.showConfig = function (configVal) {
        if (configVal != "undefined" || configVal != "") {
            $scope.configureAttr = true;
        }
        $scope.addMatrixPopupCallback();
    }

    $scope.hideConfig = function (configVal) {
        $scope.addMatrixPopupCallback();
    }

    $scope.hideMatrixPopUpCallBack = function () {
        $scope.hideaddMatrixPopupCallback();
    };
    $scope.addidentificationData = function (data) {
        data.push({
            "identificationno": {
                "title": "12345",
                "readonly": false,
                "actionCode": "",
                "leadApproval": "Please Enter",
                "poolValue": ""
            },
            "idNoShow": true,
            "idnoLookup": true,
            "isFocus": true,
            "actionCodeShow": true,
            "leadApprovalShow": true,
            "poolValueShow": true,
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, {
                    "name": "Executive", "check": false
                }, {
                    "name": "CEO office", "check": false
                }],
                "selectedoption": []
            },
            "leadApprovalGroup": {
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
    };
    //for conditions 
    $scope.conditionAttr = { "name": "List Item" };
    $scope.conditionAttrOption = [
    { "name": "List Item" },
    {
        "name": "GL Code"
    },
    {
        "name": "Entity Code"
    },
    {
        "name": "Business Unit"
    },
    {
        "name": "Amount"
    },
    {
        "name": "Date"
    }
    ];

    $scope.conditionOp = { "name": "Equal to" };
    $scope.conditionOpOption = [
        { "name": "Equal to" },
        { "name": "Less than" },
        { "name": "Greater than" },
        { "name": "Not equal to" },
        { "name": "In between" }
    ];
    $scope.selectedOperator = { "name": "Equal to" };
    $scope.onChange = function (conditionOp, index) {
        if (conditionOp.name == "In between" || conditionOp == "In between") {
            $scope.otherConditionsData[index].showRange = true;
            $scope.otherConditionsData[index].conditionValuestate = false;
        }
        else {
            $scope.otherConditionsData[index].showRange = false;
            $scope.otherConditionsData[index].conditionValuestate = true;
        }
    };
    $scope.onChangeOperator = function (conditionOp, index) {
        if (conditionOp.name == "In between" || conditionOp == "In between") {
            $scope.conditionsData[index].showRange = true;
            $scope.conditionsData[index].conditionValuestate = false;
        }
        else {
            $scope.conditionsData[index].showRange = false;
            $scope.conditionsData[index].conditionValuestate = true;
        }
    };
    //$scope.popUpShow = function ()
    //{
    //    $scope.conditionsData.attributeName.options.name=
    //    }
    
    $scope.conditionsData = [
    {
        "conditionValuestate": true,
        'isDynamicVal':false,
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
            'isDynamicVal':false,
            "attributeName": {
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

    //conditions end

    $scope.otherConditionsData = [
    {
        "ischeck": false,
        "conditionValuestate": true,
        "showRange": false,
        "identificationtype": {
            "title": "SIC Code",
            "isMandatory": true,
            "selectedoption": ""
        },
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
        "actions": {
            "displaytitle": "Please Enter",
            "displaytext": "Action",
            "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
            "selectedoption": []
        },
        "attributeOptions": {
            "displaytitle": "Attributes",
            "displaytext": "Attributes",
            "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
            "selectedoption": []
        },
        "rulegrOptions": {
            // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
            "displaytitle": "Please Enter",
            "selectedoption": []
        },
        "valgrpOptions": {
            // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
            "displaytitle": "Please Enter",
            "selectedoption": []
        },
        "sequenceOptions": {
            "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
            "selectedoption": { "name": "Select Sequence" }
        },
        "opratorValues": {
            "options": [{ "name": "Select Operator" }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
            "selectedoption": { "name": "Select Operator" }
        }
    }];

    $scope.copyData = function (fullData, currentData, Index) {
        angular.forEach($scope.otherConditionsData, function (value, ind) {
            $scope.otherConditionsData[ind].opratorValues.selectedoption = { "name": value.opratorValues.selectedoption.name };
        });
        var datacopyItm = angular.copy(fullData);
        currentData.splice((Index + 1), 0, datacopyItm);
    }

    $scope.addOtherConditionsData = function (data) {
        data.push({
            "ischeck": false,
            "conditionValuestate": true,
            "showRange": false,
            "identificationtype": {
                "title": "SIC Code",
                "isMandatory": true,
                "selectedoption": ""
            },
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
            "actions": {
                "displaytitle": "Please Enter",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": []
            },
            "attributeOptions": {
                "displaytitle": "Attributes",
                "displaytext": "Attributes",
                "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                "selectedoption": []
            },
            "opratorValues": {
                "options": [{ "name": "Select Operator" }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
                "selectedoption": { "name": "Select Operator" }
            },
            "rulegrOptions": {
                "displaytitle": "Please Enter",
                //"options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                "selectedoption": []
            },
            "valgrpOptions": {
                // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                "displaytitle": "Please Enter",
                "selectedoption": []
            },
            "sequenceOptions": {
                "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                "selectedoption": { "name": "Select Sequence" }
            }
        });
    };

    $scope.showGridView = function () {
        return;
    };

    $scope.locationFlag = false;
    $scope.locationHeaderCallback = function () {
        $scope.locationFlag = !$scope.locationFlag;
    }

    /* Certificate */
    $scope.sliderCertificateFlag = false;
    $scope.certificateHeaderCallback = function () {
        $scope.sliderCertificateFlag = true;
    }

    /* Diversity Status */
    $scope.sliderDiversityFlag = false;
    $scope.diversityHeaderCallback = function () {
        $scope.sliderDiversityFlag = true;
    };



    /* Supplier Source Info */

    $scope.onChangeSourceInfoType = function (item) {
        item.supplierSourceInfo = true;
    };

    $scope.smartByGep = "Monarch Ltd";

    $scope.deletesuppliersourceinfodata = function (data, arg) {
        data.splice(arg, 1);
    };
    $scope.addsuppliersourceinfodata = function (data) {
        data.push({
            "sourcesystemselect": "",
            "identificationno": {
                "title": "",
                "readonly": false
            },
            "suppliername": {
                "title": "Monarch Ltd",
                "readonly": true
            },
            "businessunit": {
                "budisplaytext": "Mindspace + 3 More",
                "businessunitdata": [{
                    "name": "Mindspace",
                    "check": true,
                    "value": [{
                        "name": "Business Unit child-0",
                        "check": true,
                        "value": [{
                            "name": "Business Unit grand-child-0",
                            "check": true
                        }, {
                            "name": "Business Unit grand-child-1",
                            "check": true
                        }, {
                            "name": "Business Unit grand-child-2",
                            "check": true
                        }]
                    }]
                }]
            }
        });
    };
    $scope.sourcesystem = [{
        "name": "Ariba"
    }, {
        "name": "SAP"
    }, {
        "name": "Coupa"
    }, {
        "name": "SAP Plus"
    }, {
        "name": "SalesForce"
    }]
    $scope.suppliersourceinfo = [{
        "sourcesystemselect": {
            "name": "Choose your option"
        },
        "identificationno": {
            "title": 98,
            "readonly": false
        },
        "suppliername": {
            "title": "Monarch Ltd",
            "readonly": true
        },
        "businessunit": {
            "budisplaytext": "Airoli + 3 More",
            "businessunitdata": [{
                "name": "Airoli",
                "check": true,
                "value": [{
                    "name": "Business Unit child-0",
                    "check": true,
                    "value": [{
                        "name": "Business Unit grand-child-0",
                        "check": true
                    }, {
                        "name": "Business Unit grand-child-1",
                        "check": true
                    }, {
                        "name": "Business Unit grand-child-2",
                        "check": true
                    }]
                }]
            }]
        },
        "supplierSourceInfo": false
    }];

    $scope.suppliersourceinfo_SupName = [{
        "identificationno_Sup": {
            "title": "Monarch Ltd",
            "readonly": false
        },
        "supplierSourceInfo_Update": true
    }];


    $scope.locationSortIcon = { 'icon': 'icon_Sort' };
    $scope.ascDescToggler = function (data) {
        if (data.icon === 'icon_Sort') {
            data.icon = 'icon_SortAscending';
        } else if (data.icon === 'icon_SortAscending') {
            data.icon = 'icon_SortDescending';
        } else {
            data.icon = 'icon_Sort';
        }
    };

    /* Supplier Business Info */
    $scope.typeSelectCurrency = [{ "name": "US Dollar (USD)" }, { "name": "Euro (EUR)" }, { "name": "British Pound (GBP)" }, { "name": "Andorran Franc (ADF)" }, { "name": "Utd. Arab Emir.Dirham. (AED)" }, { "name": "NL Antillian Guilder (ANG)" }, { "name": "Chinese Yuan Renminbi (CNY)" }, { "name": "Indian Rupee (INR)" }];

    /* Marketing Info */
    $scope.showFormC = false;
    $scope.showFormL = false;
    $scope.marketinginfodata = {
        "description": { "title": "" },
        "currencies": {
            "displaytext": "Supported Currencies",
            "options": [{ "name": "Currencies 1", "check": false }, { "name": "Currencies 2", "check": false }, { "name": "Currencies 3", "check": false }, { "name": "Currencies 4", "check": false }, { "name": "Currencies 5", "check": false }, { "name": "Currencies 6", "check": false }, { "name": "Currencies 7", "check": false }, { "name": "Currencies 8", "check": false }, { "name": "Currencies 9", "check": false }, { "name": "Currencies 10", "check": false }],
            "selectedoption": ""
        },
        "languages": {
            "displaytext": "Supported Languages",
            "options": [{ "code": "en-CH", "name": "Chinese(Simplified)" }, { "code": "fr-FR", "name": "Czech" }, { "code": "de-DE", "name": "Danish" }, { "code": "en-US", "name": "English" }, { "code": "pt-PT", "name": "French" }, { "code": "es-ES", "name": "German" }, { "code": "es-ES", "name": "Italian" }, { "code": "es-ES", "name": "Japanese" }, { "code": "es-ES", "name": "Korean" }, { "code": "es-ES", "name": "Polish" }, { "code": "es-ES", "name": "Portuguese(Brazilian)" }, { "code": "es-ES", "name": "Russian" }, { "code": "es-ES", "name": "Spanish" }, { "code": "es-ES", "name": "Swedish" }, { "code": "es-ES", "name": "Thai" }],
            "selectedoption": ""
        },
        "customers": {
            "displayfield": { "title": "" },
            "options": []
        },
        "websiteurl": {
            "displayfield": { "url": "https://" },
        },
        "facebookurl": {
            "displayfield": { "url": "" },
        },
        "linkedinurl": {
            "displayfield": { "url": "" },
        },
        "twitterurl": {
            "displayfield": { "url": "" },
        }
    }

    $scope.websiteDisplayLink = false;
    $scope.facebookDisplayLink = false;
    $scope.linkedinDisplayLink = false;
    $scope.twitterDisplayLink = false;
    //$scope.websiteRegex = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
    $scope.websiteRules = [
    {
        "rule": "this.length < 0",
        "error": "You must enter a value for the attribute"
    },
    {
        "rule": "!(/^(http:\\/\\/www\.|https:\\/\\/www\.|http:\\/\\/|https:\\/\\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$/.test(this))",
        "error": "Please enter valid url"
    }
    ]

    $scope.websiteBlur = function (websiteData) {
        if (websiteData.length > 0 && eval("/^(http:\\/\\/www\.|https:\\/\\/www\.|http:\\/\\/|https:\\/\\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$/.test(websiteData)") == true) {
            $scope.websiteDisplayLink = true;
        }
        else {
            $scope.websiteDisplayLink = false;
        }
    }

    $scope.websiteFocus = function () {
        $scope.websiteDisplayLink = false;
    }

    $scope.commonRules = [
    {
        "rule": "this.length < 2",
        "error": "You must enter a value for the attribute"
    },
    {
        "rule": "!(/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(this))",
        "error": "Please enter valid value"
    }
    ]

    $scope.facebookBlur = function (facebookData) {
        if (facebookData.length > 1 && eval("/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(facebookData)") == true) {
            $scope.facebookDisplayLink = true;
        }
        else {
            $scope.facebookDisplayLink = false;
        }
    }

    $scope.facebookFocus = function () {
        $scope.facebookDisplayLink = false;
    }

    $scope.linkedinBlur = function (linkedinData) {
        if (linkedinData.length > 1 && eval("/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(linkedinData)") == true) {
            $scope.linkedinDisplayLink = true;
        }
        else {
            $scope.linkedinDisplayLink = false;
        }
    }

    $scope.linkedinFocus = function () {
        $scope.linkedinDisplayLink = false;
    }

    $scope.twitterBlur = function (twitterData) {
        if (twitterData.length > 1 && eval("/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(twitterData)") == true) {
            $scope.twitterDisplayLink = true;
        }
        else {
            $scope.twitterDisplayLink = false;
        }
    }

    $scope.twitterFocus = function () {
        $scope.twitterDisplayLink = false;
    }

    /* Engagement Model  */
    $scope.engagementmodelcheck = { 'check': false };
    $scope.engagementmodelData = [
    {
        "locations": {
            "selectedLoc": "",
            "options": [{ "name": "All Location" }, { "name": "Mumbai" }, { "name": "Kolkatta" }, { "name": "Chennai" }]
        },
        "organisationentity": {
            "placeholderText": "Choose Organisation Entity",
            "displaytext": "Organisation Entity",
            "options": [{ "name": "Amul 1", "check": false }, { "name": "Amul 2", "check": false }, { "name": "Amul 3", "check": false }, { "name": "Currencies 4", "check": false }, { "name": "Currencies 5", "check": false }, { "name": "Currencies 6", "check": false }, { "name": "Currencies 7", "check": false }, { "name": "Currencies 8", "check": false }, { "name": "Currencies 9", "check": false }, { "name": "Currencies 10", "check": false }]
        },
        "engagementmodels": {
            "placeholderText": "Choose Engagement Entity",
            "displaytext": "Engagement Models",
            "options": [{ "name": "Location - BU alignment", "check": false }, { "name": "HT location - GEP Mumbai, GEP NJ", "check": false }, { "name": "Warehouse location - GEP Berlin, GEP Prague", "check": false }]
        }
    }
    ];

    $scope.deleteData = function (data, Ind) {
        data.splice(Ind, 1);
    };

    $scope.addData = function (data, Ind) {
        data.push({ "locations": { "selectedLoc": "", "options": [{ "name": "All Location" }, { "name": "Mumbai" }, { "name": "Kolkatta" }, { "name": "Chennai" }] }, "organisationentity": { "placeholderText": "Choose Organisation Entity", "displaytext": "Organisation Entity", "options": [{ "name": "Amul 1", "check": false }, { "name": "Amul 2", "check": false }, { "name": "Amul 3", "check": false }, { "name": "Currencies 4", "check": false }, { "name": "Currencies 5", "check": false }, { "name": "Currencies 6", "check": false }, { "name": "Currencies 7", "check": false }, { "name": "Currencies 8", "check": false }, { "name": "Currencies 9", "check": false }, { "name": "Currencies 10", "check": false }] }, "engagementmodels": { "placeholderText": "Choose Engagement Entity", "displaytext": "Engagement Models", "options": [{ "name": "Location - BU alignment", "check": false }, { "name": "HT location - GEP Mumbai, GEP NJ", "check": false }, { "name": "Warehouse location - GEP Berlin, GEP Prague", "check": false }] } });
    };

    $scope.tabs = [{
        title: 'Global Operation Inc',
        url: 'one.tpl.html'
    }, {
        title: 'Globus',
        url: 'two.tpl.html'
    }, {
        title: 'Globiant University',
        url: 'three.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.typeOptions = [
    {
        "UserId": 28360,
        "UserName": "abc",
        "FirstName": "Evertek",
        "LastName": ""
    }, {
        "UserId": 28977,
        "UserName": "xyz",
        "FirstName": "Supplier 2",
        "LastName": ""
    }, {
        "UserId": 28978,
        "UserName": "lmn",
        "FirstName": "Supplier 2",
        "LastName": "Chi"
    }
    ];
    $scope.selectedSignatoryLookup = $scope.typeOptions;

    $scope.typeOptionsActName = [{ "actName": "Auto Approve", }, { "actName": "Cost Center Approval", }, { "actName": "Executive Approval", }, { "actName": "CEO Office", }, ];
    $scope.manufName = $scope.typeOptionsActName;

    //$scope.typeOptionsAttrName = [{ "attrName": "List Option" }, { "attrName": "GL Code", }, { "attrName": "Cost Center", }, { "attrName": "Category", }, { "attrName": "Entity Code", }, { "attrName": "Business Unit", }, { "attrName": "Amount", }, { "attrName": "Date", }];
    //$scope.attributeName = $scope.typeOptionsAttrName;

    // approval matrix
    $scope.typeOptionsAttrName1 = [{ "attrName1": "List Option" }, { "attrName1": "GL Code", }, { "attrName1": "Cost Center", }, { "attrName1": "Category", }, { "attrName1": "Entity Code", }, { "attrName1": "Business Unit", }, { "attrName1": "Amount", }, { "attrName1": "Date", }];
    $scope.attributeName1 = $scope.typeOptionsAttrName1;

    $scope.typeOptionsAttrName2 = [{ "attrName2": "List Option" }, { "attrName2": "GL Code", }, { "attrName2": "Cost Center", }, { "attrName2": "Category", }, { "attrName2": "Entity Code", }, { "attrName2": "Business Unit", }, { "attrName2": "Amount", }, { "attrName2": "Date", }];
    $scope.attributeName2 = $scope.typeOptionsAttrName2;

    $scope.addShallowCopyData = function (data, newData) {
        $scope.shallowCopyData.push({
            "fromVal": {
                "value": parseInt($scope.shallowCopyData[$scope.shallowCopyData.length - 1].toVal.value) + 1
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": []
            }
        });
        $scope.addAttributesData = $scope.shallowCopyData;
    };
    $scope.showAddRemoveIcon = false;
    $scope.addmatrixData = function (data, curData, index) {
        if (index === 0 || data.length - 1 === index) {
            $scope.showAddRemoveIcon = true;
        }

        $scope.shallowCopyData.push({
            "fromVal": {
                "value": curData.toVal.value
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": []
            }
        });
    };

    $scope.matrixTableData = [
    {
        "data": [
        {
            "actions": {
                "displaytitle": "Please Select",
                "displaytext": "Action",
                "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                "selectedoption": []
            }
        }
        ]
    }
    ];

    $scope.addMatrixTableData = function (data) {
        var newData = { data: [] };
        angular.forEach(data[0].data, function (value, key) {
            var costCenterData = {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": []
                }
            };
            if (key === 0) {
                newData.data.push({
                    "actions": {
                        "displaytitle": "Please Select",
                        "displaytext": "Action",
                        "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                        "selectedoption": []
                    }
                });
            } else {
                newData.data.push(costCenterData);
            }
        });
        data.push(newData);
    };


    $scope.showMatrixData = false;
    $scope.martix = {
        data: []
    };
    $scope.showMatrix = function () {
        $scope.showAddRemoveIcon = false;
        $scope.addAttributesData = angular.copy($scope.martix.data);
        $scope.martix.data = [];
        angular.forEach($scope.shallowCopyData, function (value, key) {
            $scope.addAttributesData.push(value);
        });

        $scope.showMatrixData = true;
        if ($scope.approvalMatrixPopUpOpen) {
            angular.forEach($scope.addAttributesData, function (value, key) {
                $scope.matrixTableData[0].data.push(value);
            });
        }
        else {
            angular.forEach($scope.matrixTableData, function (value, ind) {
                value.data.splice(1);
            });
            for (i = 0; i < $scope.matrixTableData.length; i++) {
                angular.forEach($scope.addAttributesData, function (value, key) {
                    $scope.matrixTableData[i].data.push(value);
                });
            }
        }
        $scope.approvalMatrixPopUpOpen = false;
        $scope.shallowCopyData = [];
        $scope.getColSpan = $scope.addAttributesData.length + 1;
        $scope.getWidth = (parseInt(85 + '%') / ($scope.addAttributesData.length)) + '%';
    }

    $scope.deleteApprovalMatrixData = function (data, Ind, deleteShallowOrMatrix) {
        if (deleteShallowOrMatrix) {
            $scope.shallowCopyData.splice(Ind, 1);
        } else {
            $scope.martix.data.splice(Ind, 1);
        }
    };

    $scope.deleteConditionData = function (data, Ind) {
        data.splice(Ind, 1);
    };

    if ($state.params.mode == 'edit') {
        //$scope.operatorValue = "10";      
        // $scope.attributeName = { "attrName": "Entity Code" };
        //$scope.conditionsData = [{ "identificationtype": { "title": "SIC Code", "isMandatory": true, "selectedoption": "" }, "identificationno": { "title": "12345", "readonly": false }, "attributeOptions": { "displaytitle": "Please Enter", "displaytext": "Action", "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }], "selectedoption": [] }, "idNoShow": true, "idnoLookup": true, "isFocus": true, "attributeName": { "attrName": "Cost Center", "value": "Cost Center" }, "title": "CC Mumbai" }, { "identificationtype": { "title": "", "isMandatory": false, "selectedoption": "" }, "identificationno": { "title": "", "readonly": false }, "attributeOptions": { "displaytitle": "Please Enter", "displaytext": "Action", "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }], "selectedoption": [] }, "attributeName": { "attrName": "Cost Center", "value": "Cost Center" }, "title": "CC Hyderabad" }];
        $scope.showMatrixData = true;
        $scope.otherConditionsData = [
         {
             "ischeck": false,
             "conditionValuestate": true,
             "showRange": false,
             "identificationtype": {
                 "title": "SIC Code",
                 "isMandatory": true,
                 "selectedoption": ""
             },
             "identificationno": {
                 "title": "12345",
                 "readonly": false,
                 "value": "10,000$",
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
             "actions": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Action",
                 "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                 "selectedoption": [{ "name": "Auto Approve", "check": false }]
             },
             "attributeOptions": {
                 "displaytitle": "Attributes",
                 "displaytext": "Attributes",
                 "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                 "selectedoption": { "name": "Amount", "check": false }
             },
             "rulegrOptions": {
                 "displaytitle": "Please Enter",
                 //"options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "selectedoption": []
             },
             "valgrpOptions": {
                 // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "displaytitle": "Please Enter",
                 "selectedoption": []
             },
             "sequenceOptions": {
                 "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                 "selectedoption": { "name": "Select Sequence" }
             },
             "opratorValues": {
                 "options": [{ "name": "Select operator" }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
                 "selectedoption": { "name": "Less than" }
             }
         },
         {
             "ischeck": false,
             "conditionValuestate": true,
             "showRange": false,
             "identificationtype": {
                 "title": "SIC Code",
                 "isMandatory": true,
                 "selectedoption": ""
             },
             "identificationno": {
                 "title": "12345",
                 "readonly": false,
                 "value": "10,000$",
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
             "actions": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Action",
                 "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                 "selectedoption": [{ "name": "Cost Center Approval", "check": false }]
             },
             "attributeOptions": {
                 "displaytitle": "Attributes",
                 "displaytext": "Attributes",
                 "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                 "selectedoption": { "name": "Amount", "check": false }
             },
             "rulegrOptions": {
                 "displaytitle": "Please Enter",
                 //"options": [{ "name": "Select Rule Group" },{ "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "selectedoption": { "name": "RG1" }
             },
             "valgrpOptions": {
                 // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "displaytitle": "Please Enter",
                 "selectedoption": []
             },
             "sequenceOptions": {
                 "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                 "selectedoption": { "name": "1" }
             },
             "opratorValues": {
                 "options": [{
                     "name": "Select Operator"
                 }, {
                     "name": "Equal to"
                 }, {
                     "name": "Less than"
                 }, {
                     "name": "Greater than"
                 }, {
                     "name": "Not equal to"
                 }, {
                     "name": "In between"
                 }],
                 "selectedoption": { "name": "Greater than" }
             }
         },
          {
              "ischeck": false,
              "conditionValuestate": true,
              "showRange": false,
              "identificationtype": {
                  "title": "SIC Code",
                  "isMandatory": true,
                  "selectedoption": ""
              },
              "identificationno": {
                  "title": "12345",
                  "readonly": false,
                  "value": "Bussiness Travel",
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
              "actions": {
                  "displaytitle": "Please Enter",
                  "displaytext": "Action",
                  "options": [{ "name": "Auto Approve", "check": false }, { "name": "Category Approval Group", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                  "selectedoption": [{ "name": "Category Approval Group", "check": false }]
              },
              "attributeOptions": {
                  "displaytitle": "Attributes",
                  "displaytext": "Attributes",
                  "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                  "selectedoption": { "name": "Category", "check": false }
              },
              "rulegrOptions": {
                  "displaytitle": "Please Enter",
                  // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                  "selectedoption": { "name": "RG1" }
              },
              "valgrpOptions": {
                  // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                  "displaytitle": "Please Enter",
                  "selectedoption": []
              },
              "sequenceOptions": {
                  "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                  "selectedoption": { "name": "2" }
              },
              "opratorValues": {
                  "options": [{
                      "name": "Select Operator"
                  }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
                  "selectedoption": { "name": "Equal to" }
              }
          },
            {
                "ischeck": false,
                "conditionValuestate": true,
                "showRange": false,
                "identificationtype": {
                    "title": "SIC Code",
                    "isMandatory": true,
                    "selectedoption": ""
                },
                "identificationno": {
                    "title": "12345",
                    "readonly": false,
                    "value": "100,000$",
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
                "actions": {
                    "displaytitle": "Please Enter",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }]
                },
                "attributeOptions": {
                    "displaytitle": "Attributes",
                    "displaytext": "Attributes",
                    "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Amount", "check": false }
                },
                "rulegrOptions": {
                    "displaytitle": "Please Enter",
                    //"options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                    "selectedoption": []
                },
                "valgrpOptions": {
                    // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                    "displaytitle": "Please Enter",
                    "selectedoption": []
                },
                "sequenceOptions": {
                    "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                    "selectedoption": { "name": "Select Sequence" }
                },
                "opratorValues": {
                    "options": [{
                        "name": "Select Operator"
                    }, {
                        "name": "Equal to"
                    }, {
                        "name": "Less than"
                    }, {
                        "name": "Greater than"
                    }, {
                        "name": "Not equal to"
                    }, {
                        "name": "In between"
                    }],
                    "selectedoption": { "name": "Greater than" }
                }
            },
              {
                  "ischeck": false,
                  "conditionValuestate": true,
                  "showRange": false,
                  "identificationtype": {
                      "title": "SIC Code",
                      "isMandatory": true,
                      "selectedoption": ""
                  },
                  "identificationno": {
                      "title": "12345",
                      "readonly": false,
                      "value": "100,000$",
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
                  "actions": {
                      "displaytitle": "Please Enter",
                      "displaytext": "Action",
                      "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                      "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Auto Approve", "check": false }]
                  },
                  "attributeOptions": {
                      "displaytitle": "Attributes",
                      "displaytext": "Attributes",
                      "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                      "selectedoption": { "name": "Amount", "check": false }
                  },
                  "rulegrOptions": {
                      "displaytitle": "Please Enter",
                      //"options": [{ "name": "Select Rule Group" } ,{ "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                      "selectedoption": []
                  },
                  "valgrpOptions": {
                      // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                      "displaytitle": "Please Enter",
                      "selectedoption": []
                  },
                  "sequenceOptions": {
                      "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                      "selectedoption": { "name": "Select Sequence" }
                  },
                  "opratorValues": {
                      "options": [{
                          "name": "Select Operator"
                      }, {
                          "name": "Equal To"
                      }, {
                          "name": "Less than"
                      }, {
                          "name": "Greater than"
                      }, {
                          "name": "Not equal to"
                      }, {
                          "name": "In between"
                      }],
                      "selectedoption": { "name": "Greater than" }
                  }
              },
        ];
        $scope.matrixTableData = [
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                    "selectedoption": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Cost Center Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "CEO Office", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "CEO Office", "check": false }]
                }
            }
            ]
        },
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                    "selectedoption": [{ "name": "CC4", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "CEO Office", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            }
            ]
        },
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{ "name": "CC1", "check": false }, {
                        "name": "CC2", "check": false
                    }, {
                        "name": "CC3", "check": false
                    }, {
                        "name": "CC4", "check": false
                    }, {
                        "name": "CC5", "check": false
                    }, {
                        "name": "CC6", "check": false
                    }],
                    "selectedoption": [{
                        "name": "CC1", "check": false
                    }, {
                        "name": "CC2", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Cost Center Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Executive Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "CEO Office", "check": false }]
                }
            }
            ]
        },
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{
                        "name": "CC1", "check": false
                    }, {
                        "name": "CC2", "check": false
                    }, {
                        "name": "CC3", "check": false
                    }, {
                        "name": "CC4", "check": false
                    }, {
                        "name": "CC5", "check": false
                    }, {
                        "name": "CC6", "check": false
                    }],
                    "selectedoption": [{ "name": "CC4", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, {
                        "name": "Cost Center Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            }
            ]
        }
        ];
        $scope.shallowCopyData = [];
        $scope.shallowCopyData.push(
        {

            "fromVal": {
                "value": "$200000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Cost Center Approval", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$500000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Executive Approval", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$1000000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "CEO Office", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$2500000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$5000000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "CEO Office", "check": false }]
            }
        }
        );
        $scope.configureAttr = true;
        $scope.addAttributesData = $scope.shallowCopyData;
        $scope.getColSpan = $scope.addAttributesData.length + 1;
        $scope.getWidth = (parseInt(85 + '%') / ($scope.addAttributesData.length)) + '%';
        if ($state.params.type == 'Standard Creation') {
            $scope.conditionsData = [
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "10",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    //"displaytext": "Attributes",
                    "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Cost Center", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    // "displaytext": "Value",
                    "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
                    "selectedoption": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }]
                },
            },
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "",
                "fromRange": "10",
                "toRange": "20",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    // "displaytext": "Attributes",
                    "options": [{ "name": "List Option", "check": false }, { "name": "Entity Code", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Entity Code", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    //"displaytext": "Value",
                    "options": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }, { "name": "EC3", "check": false }, { "name": "EC4", "check": false }, { "name": "EC5", "check": false }, { "name": "EC6", "check": false }, { "name": "EC7", "check": false }],
                    "selectedoption": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }]
                },
            }];
        }
        if ($state.params.type == 'Approval Matrix') {
            $scope.conditionsData = [
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "10",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Category", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "ABC", "check": false }, { "name": "XYZ", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
                    "selectedoption": [{ "name": "ABC", "check": false }, { "name": "XYZ", "check": false }, { "name": "CC3", "check": false }]
                },
            },
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "",
                "fromRange": "10",
                "toRange": "20",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "List Option", "check": false }, { "name": "Entity Code", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Entity Code", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }, { "name": "EC3", "check": false }, { "name": "EC4", "check": false }, { "name": "EC5", "check": false }, { "name": "EC6", "check": false }, { "name": "EC7", "check": false }],
                    "selectedoption": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }]
                },
            }];
        }
    }

};

function addActionTypesCtrlFunc($scope, ScrollTo, $filter, $sce, $timeout, $rootScope, $state, notification, conditionScrollTo) {
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };

   

   

    //$scope.addRuleGrp = function (document) {
       
    //    if (document.isEnableLevel) {
    //        $scope.isEnableLevel = true;
    //        console.log('level', $scope.isEnableLevel);
    //    } else {
    //        $scope.isEnableLevel = false;
    //        console.log('level', $scope.isEnableLevel);
    //    }
        
    //   // console.log(ruleGrp,enableLevel);
    //};

    $scope.identificationData = [
        {
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
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                "selectedoption": []
            },
            "poolTypeOptions": {
                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                "selectedoption": { "name": "Select Pool Type" }
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": []
            }
        }];

    if ($state.params.mode == 'edit' && $state.params.type == "Approval Matrix") {
        $scope.identificationData = [{
            "actionCodeShow": true,
            "poolValueShow": true,

            "identificationno": { "actionCode": "Cost Center Approval", "poolValue": '124' },
            "approvalType": {
                "options": [{ "name": "Approval matrix" }, { "name": "Approval group" }],
                "selectedoption": { "name": "Approval matrix" }
            },
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                "selectedoption": [{ "name": "CC-India", "check": false }]
            },
            
            "poolTypeOptions": {
                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                "selectedoption": { "name": "XYZ" }
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": [{ "name": "y.s@gep.com", "check": false }]
            }
        },
        {
            "actionCodeShow": true,
            "poolValueShow": true,
            "identificationno": { "actionCode": "Executive Approval", "poolValue": '156' },
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                "selectedoption": [{ "name": "Executive", "check": false }]
            },
            "poolTypeOptions": {
                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                "selectedoption": { "name": "ABC" }
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": [{ "name": "r.d@gep.com", "check": false }]
            }
        },
         {
             "actionCodeShow": true,
             "poolValueShow": true,
             "identificationno": { "actionCode": "CEO Office", "poolValue": '190' },
             "group": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Group",
                 "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                 "selectedoption": [{ "name": "CEO office", "check": false }]
             },
             "poolTypeOptions": {
                 "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                 "selectedoption": { "name": "Select Pool Type" }
             },
             "leadApprovalGroup": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Lead Approval",
                 "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                 "selectedoption": [{ "name": "s.m@gep.com", "check": false }]
             }
         },
        ]
    }

    if ($state.params.mode == 'edit' && $state.params.type == "Standard Creation") {
        $scope.identificationData = [{
            "actionCodeShow": true,
            "poolValueShow": true,

            "identificationno": { "actionCode": "Cost Center Approval", "poolValue": '124' },
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                "selectedoption": [{ "name": "CC-India", "check": false }]
            },
            "poolTypeOptions": {
                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                "selectedoption": { "name": "XYZ" }
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": [{ "name": "y.s@gep.com", "check": false }]
            }
        },
        {
            "actionCodeShow": true,
            "poolValueShow": true,
            "identificationno": { "actionCode": "Executive Approval", "poolValue": '156' },
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                "selectedoption": [{ "name": "Executive", "check": false }]
            },
            "poolTypeOptions": {
                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                "selectedoption": { "name": "ABC" }
            },
            "leadApprovalGroup": {
                "displaytitle": "Please Enter",
                "displaytext": "Lead Approval",
                "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                "selectedoption": [{ "name": "r.d@gep.com", "check": false }]
            }
        },
         {
             "actionCodeShow": true,
             "poolValueShow": true,
             "identificationno": { "actionCode": "CEO Office", "poolValue": '190' },
             "group": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Group",
                 "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }],
                 "selectedoption": [{ "name": "CEO office", "check": false }]
             },
             "poolTypeOptions": {
                 "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                 "selectedoption": { "name": "KLM" }
             },
             "leadApprovalGroup": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Lead Approval",
                 "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                 "selectedoption": [{ "name": "s.m@gep.com", "check": false }]
             }
         },
        ]
    }
    $scope.selectedoption = { 'name': 'Percentage' };

    $scope.identificationsourcetype = [{
        "name": "Percentage"
    }, {
        "name": "Number"
    }];
    $scope.showAppMatrixPopup = false;
    $scope.addAttributesData = [];

   
    $scope.addMatrixPopupCallback = function (flag) {
        $scope.showAppMatrixPopup = true;
        $scope.martix.data = angular.copy($scope.addAttributesData);
        $scope.shallowCopyData = [];
        if ($scope.martix.data.length === 0) {
            $scope.shallowCopyData = [
                            {
                                "actions": {
                                    "displaytitle": "Select Action",
                                    "displaytext": "Action",
                                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                                    "selectedoption": []
                                }
                            }];
        };
    }

    $scope.hideaddMatrixPopupCallback = function () {
        $scope.showAppMatrixPopup = false;
        $scope.shallowCopyData = [];
    };

    $scope.onConfigureGroupLookUpHide = function () {
        $scope.showConfigureApprovalGroupPopupCallback();
    };
    $scope.onConfigureGroupLookUpShow = function () {
        $scope.configureApprovalGroupPopupHideCallback();
    };

    $scope.configureAttr = false;
    $scope.showConfig = function (configVal) {
        if (configVal != "undefined" || configVal != "") {
            $scope.configureAttr = true;
        }
        $scope.addMatrixPopupCallback();
    }

    $scope.hideConfig = function (configVal) {
        $scope.addMatrixPopupCallback();
    }

    $scope.hideMatrixPopUpCallBack = function () {
        $scope.hideaddMatrixPopupCallback();
    };

   

    $scope.showApprovalGroup = false;
    
    $scope.showApprovalGroupCallback = function () {
        $scope.showApprovalGroup = true;
    }
   
    $scope.hideApprovalGroupCallback = function () {
        $scope.showApprovalGroup = false;
    }

  

    $scope.addidentificationData = function (data) {
        data.push({
            "identificationno": {
                "title": "12345",
                "readonly": false,
                "actionCode": "",
                "leadApproval": "Please Enter",
                "poolValue": ""
            },
            "idNoShow": true,
            "idnoLookup": true,
            "isFocus": true,
            "actionCodeShow": true,
            "leadApprovalShow": true,
            "poolValueShow": true,
            "group": {
                "displaytitle": "Please Enter",
                "displaytext": "Group",
                "options": [{ "name": "CC-India", "check": false }, {
                    "name": "Executive", "check": false
                }, {
                    "name": "CEO office", "check": false
                }],
                "selectedoption": []
            },
            "poolTypeOptions": {
                "options": [{ "name": "Select Pool Type" }, { "name": "XYZ" }, { "name": "ABC" }, { "name": "KLM" }],
                "selectedoption": { "name": "Select Pool Type" }
            },
            "leadApprovalGroup": {
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
    };
    //for conditions 
    $scope.conditionAttr = { "name": "List Item" };
    $scope.conditionAttrOption = [
    { "name": "List Item" },
    {
        "name": "GL Code"
    },
    {
        "name": "Entity Code"
    },
    {
        "name": "Business Unit"
    },
    {
        "name": "Amount"
    },
    {
        "name": "Date"
    }
    ];

    $scope.conditionOp = { "name": "Equal to" };
    $scope.conditionOpOption = [
        { "name": "Equal to" },
        { "name": "Less than" },
        { "name": "Greater than" },
        { "name": "Not equal to" },
        { "name": "In between" }
    ];

    $scope.actionTypeParameters = [
            { "name": "Group" },
            { "name": "Lead Approval" },
            { "name": "Pool Type" },
            { "name": "Pool Value" },
            { "name": "Workflow Selection" }
    ];

    $scope.actionType = { "name": "Lead Approval" };

    $scope.selectedOperator = { "name": "Equal to" };
    $scope.onChange = function (conditionOp, index) {
        if (conditionOp.name == "In between" || conditionOp == "In between") {
            $scope.otherConditionsData[index].showRange = true;
            $scope.otherConditionsData[index].conditionValuestate = false;
        }
        else {
            $scope.otherConditionsData[index].showRange = false;
            $scope.otherConditionsData[index].conditionValuestate = true;
        }
    };
    $scope.onChangeOperator = function (conditionOp, index) {
        if (conditionOp.name == "In between" || conditionOp == "In between") {
            $scope.conditionsData[index].showRange = true;
            $scope.conditionsData[index].conditionValuestate = false;
        }
        else {
            $scope.conditionsData[index].showRange = false;
            $scope.conditionsData[index].conditionValuestate = true;
        }
    };
    $scope.showActionTypeParams = false;
    $scope.onChangeActionType = function () {
        $scope.showActionTypeParams = true;
    };

    //$scope.actionType = [{ "name": "Auto Approve" }];

 $scope.createdByData = [
     {
        "conditionValuestate": true,
        "showRange": false,
        
        "idNoShow": true,
        "idnoLookup": true,
        "isFocus": true,
                "conditionVal": true,
        "conditionAction": true,
        "conditionRange1": true,
        "conditionRange2": true,
        "conditionValue": {
            "displaytitle": "Please Enter",
            "options": [{ "name": "CC1", "check": false },
                        { "name": "CC2", "check": false },
                        { "name": "CC3", "check": false },
                        {"name": "CC4", "check": false
                        }, {
                    "name": "CC5", "check": false
                    }, {
                    "name": "CC6", "check": false }, {
                    "name": "CC7", "check": false }],
            "selectedoption": []
        },
                        }];

    $scope.actionTypeParams = [{ "name": "Auto Approve" },
       { "name": "Auto Reject" }, { "name": "Notify" },
       { "name": " Supervisory Hierarchy" }, { "name": "Financial Review" }, { "name": "Category Approvals" }];

    $scope.filterActionTypeData = [
    {
        "conditionValuestate": true,
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

        "conditionValue": {
            "displaytitle": "Please Enter",
            "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
            "selectedoption": []
        },
    }];
    $scope.addFilterActionTypeData = function (data) {
        data.push({
            "conditionValuestate": true,
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
            "conditionValue": {
                "displaytitle": "Please Enter",
                "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
                "selectedoption": []
            },
        });
        conditionScrollTo.perform();
    };


    $scope.onActionTypeChangeOperator = function (conditionOp, index) {
        if (conditionOp.name == "In between" || conditionOp == "In between") {
            $scope.filterActionTypeData[index].showRange = true;
            $scope.filterActionTypeData[index].conditionValuestate = false;
        }
        else {
            $scope.filterActionTypeData[index].showRange = false;
            $scope.filterActionTypeData[index].conditionValuestate = true;
        }
    };

    $scope.deleteConditionData = function (data, Ind) {
        data.splice(Ind, 1);
    };

    $scope.conditionsData = [
    {
        "conditionValuestate": true,
        "showRange": false,
        'isDynamicVal':false,
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
            "attributeName": {
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
        conditionScrollTo.perform();
    };

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

    //conditions end

    $scope.otherConditionsData = [
    {
        "ischeck": false,
        "conditionValuestate": true,
        "showRange": false,
        "identificationtype": {
            "title": "SIC Code",
            "isMandatory": true,
            "selectedoption": ""
        },
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
        "actions": {
            "displaytitle": "Please Enter",
            "displaytext": "Action",
            "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
            "selectedoption": []
        },
        "attributeOptions": {
            "displaytitle": "Attributes",
            "displaytext": "Attributes",
            "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
            "selectedoption": []
        },
        "rangeValue": {
            "displaytitle": "Value",
            "displaytext": "Value",
            "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
            "selectedoption": []
        },
        "amtVal": '',
        'isDynamicVal1':false,
        "rulegrOptions": {
            // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
            "displaytitle": "Please Enter",
            "selectedoption": []
        },
        "valgrpOptions": {
            // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
            "displaytitle": "Please Enter",
            "selectedoption": []
        },
        "sequenceOptions": {
            "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
            "selectedoption": { "name": "Select Sequence" }
        },
        "opratorValues": {
            "options": [{ "name": "Select Operator" }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
            "selectedoption": { "name": "Select Operator" }
        },
        "conditionValue": {
            "displaytitle": "Value",
            "displaytext": "Value",
            "options": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }, { "name": "EC3", "check": false }, { "name": "EC4", "check": false }, { "name": "EC5", "check": false }, { "name": "EC6", "check": false }, { "name": "EC7", "check": false }],
            "selectedoption": []
        }
    }];

    $scope.copyData = function (fullData, currentData, Index) {
        angular.forEach($scope.otherConditionsData, function (value, ind) {
            $scope.otherConditionsData[ind].opratorValues.selectedoption = { "name": value.opratorValues.selectedoption.name };
        });
        var datacopyItm = angular.copy(fullData);
        currentData.splice((Index + 1), 0, datacopyItm);
    }

    $scope.addOtherConditionsData = function (data) {
        data.push({
            "ischeck": false,
            "conditionValuestate": true,
            "showRange": false,
            "identificationtype": {
                "title": "SIC Code",
                "isMandatory": true,
                "selectedoption": ""
            },
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
            'isDynamicVal1': false,
            "actions": {
                "displaytitle": "Please Enter",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": []
            },
            "previewIcon" : false,
            "attributeOptions": {
                "displaytitle": "Attributes",
                "displaytext": "Attributes",
                "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                "selectedoption": []
            },
            "rangeValue": {
                "displaytitle": "Value",
                "displaytext": "Value",
                "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                "selectedoption": []
            },
            "opratorValues": {
                "options": [{ "name": "Select Operator" }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
                "selectedoption": { "name": "Select Operator" }
            },
            "rulegrOptions": {
                "displaytitle": "Please Enter",
                //"options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                "selectedoption": []
            },
            "valgrpOptions": {
                // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                "displaytitle": "Please Enter",
                "selectedoption": []
            },
            "sequenceOptions": {
                "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                "selectedoption": { "name": "Select Sequence" }
            },
            "conditionValue": {
                "displaytitle": "Value",
                "displaytext": "Value",
                "options": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }, { "name": "EC3", "check": false }, { "name": "EC4", "check": false }, { "name": "EC5", "check": false }, { "name": "EC6", "check": false }, { "name": "EC7", "check": false }],
                "selectedoption": []
            }
        });
    };

    $scope.showGridView = function () {
        return;
    };

    $scope.locationFlag = false;
    $scope.locationHeaderCallback = function () {
        $scope.locationFlag = !$scope.locationFlag;
    }

    /* Certificate */
    $scope.sliderCertificateFlag = false;
    $scope.certificateHeaderCallback = function () {
        $scope.sliderCertificateFlag = true;
    }

    /* Diversity Status */
    $scope.sliderDiversityFlag = false;
    $scope.diversityHeaderCallback = function () {
        $scope.sliderDiversityFlag = true;
    };



    /* Supplier Source Info */

    $scope.onChangeSourceInfoType = function (item) {
        item.supplierSourceInfo = true;
    };

    $scope.smartByGep = "Monarch Ltd";

    $scope.deletesuppliersourceinfodata = function (data, arg) {
        data.splice(arg, 1);
    };
    $scope.addsuppliersourceinfodata = function (data) {
        data.push({
            "sourcesystemselect": "",
            "identificationno": {
                "title": "",
                "readonly": false
            },
            "suppliername": {
                "title": "Monarch Ltd",
                "readonly": true
            },
            "businessunit": {
                "budisplaytext": "Mindspace + 3 More",
                "businessunitdata": [{
                    "name": "Mindspace",
                    "check": true,
                    "value": [{
                        "name": "Business Unit child-0",
                        "check": true,
                        "value": [{
                            "name": "Business Unit grand-child-0",
                            "check": true
                        }, {
                            "name": "Business Unit grand-child-1",
                            "check": true
                        }, {
                            "name": "Business Unit grand-child-2",
                            "check": true
                        }]
                    }]
                }]
            }
        });
    };
    $scope.sourcesystem = [{
        "name": "Ariba"
    }, {
        "name": "SAP"
    }, {
        "name": "Coupa"
    }, {
        "name": "SAP Plus"
    }, {
        "name": "SalesForce"
    }]
    $scope.suppliersourceinfo = [{
        "sourcesystemselect": {
            "name": "Choose your option"
        },
        "identificationno": {
            "title": 98,
            "readonly": false
        },
        "suppliername": {
            "title": "Monarch Ltd",
            "readonly": true
        },
        "businessunit": {
            "budisplaytext": "Airoli + 3 More",
            "businessunitdata": [{
                "name": "Airoli",
                "check": true,
                "value": [{
                    "name": "Business Unit child-0",
                    "check": true,
                    "value": [{
                        "name": "Business Unit grand-child-0",
                        "check": true
                    }, {
                        "name": "Business Unit grand-child-1",
                        "check": true
                    }, {
                        "name": "Business Unit grand-child-2",
                        "check": true
                    }]
                }]
            }]
        },
        "supplierSourceInfo": false
    }];

    $scope.suppliersourceinfo_SupName = [{
        "identificationno_Sup": {
            "title": "Monarch Ltd",
            "readonly": false
        },
        "supplierSourceInfo_Update": true
    }];


    $scope.locationSortIcon = { 'icon': 'icon_Sort' };
    $scope.ascDescToggler = function (data) {
        if (data.icon === 'icon_Sort') {
            data.icon = 'icon_SortAscending';
        } else if (data.icon === 'icon_SortAscending') {
            data.icon = 'icon_SortDescending';
        } else {
            data.icon = 'icon_Sort';
        }
    };

    /* Supplier Business Info */
    $scope.typeSelectCurrency = [{ "name": "US Dollar (USD)" }, { "name": "Euro (EUR)" }, { "name": "British Pound (GBP)" }, { "name": "Andorran Franc (ADF)" }, { "name": "Utd. Arab Emir.Dirham. (AED)" }, { "name": "NL Antillian Guilder (ANG)" }, { "name": "Chinese Yuan Renminbi (CNY)" }, { "name": "Indian Rupee (INR)" }];

    /* Marketing Info */
    $scope.showFormC = false;
    $scope.showFormL = false;
    $scope.marketinginfodata = {
        "description": { "title": "" },
        "currencies": {
            "displaytext": "Supported Currencies",
            "options": [{ "name": "Currencies 1", "check": false }, { "name": "Currencies 2", "check": false }, { "name": "Currencies 3", "check": false }, { "name": "Currencies 4", "check": false }, { "name": "Currencies 5", "check": false }, { "name": "Currencies 6", "check": false }, { "name": "Currencies 7", "check": false }, { "name": "Currencies 8", "check": false }, { "name": "Currencies 9", "check": false }, { "name": "Currencies 10", "check": false }],
            "selectedoption": ""
        },
        "languages": {
            "displaytext": "Supported Languages",
            "options": [{ "code": "en-CH", "name": "Chinese(Simplified)" }, { "code": "fr-FR", "name": "Czech" }, { "code": "de-DE", "name": "Danish" }, { "code": "en-US", "name": "English" }, { "code": "pt-PT", "name": "French" }, { "code": "es-ES", "name": "German" }, { "code": "es-ES", "name": "Italian" }, { "code": "es-ES", "name": "Japanese" }, { "code": "es-ES", "name": "Korean" }, { "code": "es-ES", "name": "Polish" }, { "code": "es-ES", "name": "Portuguese(Brazilian)" }, { "code": "es-ES", "name": "Russian" }, { "code": "es-ES", "name": "Spanish" }, { "code": "es-ES", "name": "Swedish" }, { "code": "es-ES", "name": "Thai" }],
            "selectedoption": ""
        },
        "customers": {
            "displayfield": { "title": "" },
            "options": []
        },
        "websiteurl": {
            "displayfield": { "url": "https://" },
        },
        "facebookurl": {
            "displayfield": { "url": "" },
        },
        "linkedinurl": {
            "displayfield": { "url": "" },
        },
        "twitterurl": {
            "displayfield": { "url": "" },
        }
    }

    $scope.websiteDisplayLink = false;
    $scope.facebookDisplayLink = false;
    $scope.linkedinDisplayLink = false;
    $scope.twitterDisplayLink = false;
    //$scope.websiteRegex = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
    $scope.websiteRules = [
    {
        "rule": "this.length < 0",
        "error": "You must enter a value for the attribute"
    },
    {
        "rule": "!(/^(http:\\/\\/www\.|https:\\/\\/www\.|http:\\/\\/|https:\\/\\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$/.test(this))",
        "error": "Please enter valid url"
    }
    ]

    $scope.websiteBlur = function (websiteData) {
        if (websiteData.length > 0 && eval("/^(http:\\/\\/www\.|https:\\/\\/www\.|http:\\/\\/|https:\\/\\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$/.test(websiteData)") == true) {
            $scope.websiteDisplayLink = true;
        }
        else {
            $scope.websiteDisplayLink = false;
        }
    }

    $scope.websiteFocus = function () {
        $scope.websiteDisplayLink = false;
    }

    $scope.commonRules = [
    {
        "rule": "this.length < 2",
        "error": "You must enter a value for the attribute"
    },
    {
        "rule": "!(/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(this))",
        "error": "Please enter valid value"
    }
    ]

    $scope.facebookBlur = function (facebookData) {
        if (facebookData.length > 1 && eval("/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(facebookData)") == true) {
            $scope.facebookDisplayLink = true;
        }
        else {
            $scope.facebookDisplayLink = false;
        }
    }

    $scope.facebookFocus = function () {
        $scope.facebookDisplayLink = false;
    }

    $scope.linkedinBlur = function (linkedinData) {
        if (linkedinData.length > 1 && eval("/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(linkedinData)") == true) {
            $scope.linkedinDisplayLink = true;
        }
        else {
            $scope.linkedinDisplayLink = false;
        }
    }

    $scope.linkedinFocus = function () {
        $scope.linkedinDisplayLink = false;
    }

    $scope.twitterBlur = function (twitterData) {
        if (twitterData.length > 1 && eval("/^[a-z0-9]+(([\.\_\-]{1}[a-z0-9]+)+)?$/.test(twitterData)") == true) {
            $scope.twitterDisplayLink = true;
        }
        else {
            $scope.twitterDisplayLink = false;
        }
    }

    $scope.twitterFocus = function () {
        $scope.twitterDisplayLink = false;
    }

    /* Engagement Model  */
    $scope.engagementmodelcheck = { 'check': false };
    $scope.engagementmodelData = [
    {
        "locations": {
            "selectedLoc": "",
            "options": [{ "name": "All Location" }, { "name": "Mumbai" }, { "name": "Kolkatta" }, { "name": "Chennai" }]
        },
        "organisationentity": {
            "placeholderText": "Choose Organisation Entity",
            "displaytext": "Organisation Entity",
            "options": [{ "name": "Amul 1", "check": false }, { "name": "Amul 2", "check": false }, { "name": "Amul 3", "check": false }, { "name": "Currencies 4", "check": false }, { "name": "Currencies 5", "check": false }, { "name": "Currencies 6", "check": false }, { "name": "Currencies 7", "check": false }, { "name": "Currencies 8", "check": false }, { "name": "Currencies 9", "check": false }, { "name": "Currencies 10", "check": false }]
        },
        "engagementmodels": {
            "placeholderText": "Choose Engagement Entity",
            "displaytext": "Engagement Models",
            "options": [{ "name": "Location - BU alignment", "check": false }, { "name": "HT location - GEP Mumbai, GEP NJ", "check": false }, { "name": "Warehouse location - GEP Berlin, GEP Prague", "check": false }]
        }
    }
    ];

    $scope.deleteData = function (data, Ind) {
        data.splice(Ind, 1);
    };

    $scope.addData = function (data, Ind) {
        data.push({ "locations": { "selectedLoc": "", "options": [{ "name": "All Location" }, { "name": "Mumbai" }, { "name": "Kolkatta" }, { "name": "Chennai" }] }, "organisationentity": { "placeholderText": "Choose Organisation Entity", "displaytext": "Organisation Entity", "options": [{ "name": "Amul 1", "check": false }, { "name": "Amul 2", "check": false }, { "name": "Amul 3", "check": false }, { "name": "Currencies 4", "check": false }, { "name": "Currencies 5", "check": false }, { "name": "Currencies 6", "check": false }, { "name": "Currencies 7", "check": false }, { "name": "Currencies 8", "check": false }, { "name": "Currencies 9", "check": false }, { "name": "Currencies 10", "check": false }] }, "engagementmodels": { "placeholderText": "Choose Engagement Entity", "displaytext": "Engagement Models", "options": [{ "name": "Location - BU alignment", "check": false }, { "name": "HT location - GEP Mumbai, GEP NJ", "check": false }, { "name": "Warehouse location - GEP Berlin, GEP Prague", "check": false }] } });
    };

    $scope.tabs = [{
        title: 'Global Operation Inc',
        url: 'one.tpl.html'
    }, {
        title: 'Globus',
        url: 'two.tpl.html'
    }, {
        title: 'Globiant University',
        url: 'three.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.typeOptions = [
    {
        "UserId": 28360,
        "UserName": "abc",
        "FirstName": "Evertek",
        "LastName": ""
    }, {
        "UserId": 28977,
        "UserName": "xyz",
        "FirstName": "Supplier 2",
        "LastName": ""
    }, {
        "UserId": 28978,
        "UserName": "lmn",
        "FirstName": "Supplier 2",
        "LastName": "Chi"
    }
    ];
    $scope.selectedSignatoryLookup = $scope.typeOptions;

    $scope.typeOptionsActName = [{ "actName": "Auto Approve", }, { "actName": "Cost Center Approval", }, { "actName": "Executive Approval", }, { "actName": "CEO Office", }, ];
    $scope.manufName = $scope.typeOptionsActName;

    //$scope.typeOptionsAttrName = [{ "attrName": "List Option" }, { "attrName": "GL Code", }, { "attrName": "Cost Center", }, { "attrName": "Category", }, { "attrName": "Entity Code", }, { "attrName": "Business Unit", }, { "attrName": "Amount", }, { "attrName": "Date", }];
    //$scope.attributeName = $scope.typeOptionsAttrName;

    // approval matrix
    $scope.typeOptionsAttrName1 = [{ "attrName1": "List Option" }, { "attrName1": "GL Code", }, { "attrName1": "Cost Center", }, { "attrName1": "Category", }, { "attrName1": "Entity Code", }, { "attrName1": "Business Unit", }, { "attrName1": "Amount", }, { "attrName1": "Date", }];
    $scope.attributeName1 = $scope.typeOptionsAttrName1;

    $scope.typeOptionsAttrName2 = [{ "attrName2": "List Option" }, { "attrName2": "GL Code", }, { "attrName2": "Cost Center", }, { "attrName2": "Category", }, { "attrName2": "Entity Code", }, { "attrName2": "Business Unit", }, { "attrName2": "Amount", }, { "attrName2": "Date", }];
    $scope.attributeName2 = $scope.typeOptionsAttrName2;

    $scope.addShallowCopyData = function (data, newData) {
        $scope.shallowCopyData.push({
            "fromVal": {
                "value": parseInt($scope.shallowCopyData[$scope.shallowCopyData.length - 1].toVal.value) + 1
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": []
            }
        });
        $scope.addAttributesData = $scope.shallowCopyData;
    };
    $scope.showAddRemoveIcon = false;
    $scope.addmatrixData = function (data, curData, index) {
        if (index === 0 || data.length - 1 === index) {
            $scope.showAddRemoveIcon = true;
        }

        $scope.shallowCopyData.push({
            "fromVal": {
                "value": curData.toVal.value
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": []
            }
        });
    };

    $scope.matrixTableData = [
    {
        "data": [
        {
            "actions": {
                "displaytitle": "Please Select",
                "displaytext": "Action",
                "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                "selectedoption": []
            }
        }
        ]
    }
    ];

    $scope.addMatrixTableData = function (data) {
        var newData = { data: [] };
        angular.forEach(data[0].data, function (value, key) {
            var costCenterData = {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": []
                }
            };
            if (key === 0) {
                newData.data.push({
                    "actions": {
                        "displaytitle": "Please Select",
                        "displaytext": "Action",
                        "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                        "selectedoption": []
                    }
                });
            } else {
                newData.data.push(costCenterData);
            }
        });
        data.push(newData);
    };


    $scope.showMatrixData = false;
    $scope.martix = {
        data: []
    };
    $scope.showMatrix = function () {
        $scope.showAddRemoveIcon = false;
        $scope.addAttributesData = angular.copy($scope.martix.data);
        $scope.martix.data = [];
        angular.forEach($scope.shallowCopyData, function (value, key) {
            $scope.addAttributesData.push(value);
        });

        $scope.showMatrixData = true;
        if ($scope.approvalMatrixPopUpOpen) {
            angular.forEach($scope.addAttributesData, function (value, key) {
                $scope.matrixTableData[0].data.push(value);
            });
        }
        else {
            angular.forEach($scope.matrixTableData, function (value, ind) {
                value.data.splice(1);
            });
            for (i = 0; i < $scope.matrixTableData.length; i++) {
                angular.forEach($scope.addAttributesData, function (value, key) {
                    $scope.matrixTableData[i].data.push(value);
                });
            }
        }
        $scope.approvalMatrixPopUpOpen = false;
        $scope.shallowCopyData = [];
        $scope.getColSpan = $scope.addAttributesData.length + 1;
        $scope.getWidth = (parseInt(77 + '%') / ($scope.addAttributesData.length)) + '%';
    }

    $scope.deleteApprovalMatrixData = function (data, Ind, deleteShallowOrMatrix) {
        if (deleteShallowOrMatrix) {
            $scope.shallowCopyData.splice(Ind, 1);
        } else {
            $scope.martix.data.splice(Ind, 1);
        }
    };

    $scope.deleteConditionData = function (data, Ind) {
        data.splice(Ind, 1);
    };


    if ($state.params.mode == 'edit') {
        //$scope.operatorValue = "10";      
        // $scope.attributeName = { "attrName": "Entity Code" };
        //$scope.conditionsData = [{ "identificationtype": { "title": "SIC Code", "isMandatory": true, "selectedoption": "" }, "identificationno": { "title": "12345", "readonly": false }, "attributeOptions": { "displaytitle": "Please Enter", "displaytext": "Action", "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }], "selectedoption": [] }, "idNoShow": true, "idnoLookup": true, "isFocus": true, "attributeName": { "attrName": "Cost Center", "value": "Cost Center" }, "title": "CC Mumbai" }, { "identificationtype": { "title": "", "isMandatory": false, "selectedoption": "" }, "identificationno": { "title": "", "readonly": false }, "attributeOptions": { "displaytitle": "Please Enter", "displaytext": "Action", "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "CEO office", "check": false }], "selectedoption": [] }, "attributeName": { "attrName": "Cost Center", "value": "Cost Center" }, "title": "CC Hyderabad" }];
        $scope.showMatrixData = true;
        $scope.otherConditionsData = [
         {
             "ischeck": false,
             "conditionValuestate": true,
             "showRange": false,
             "identificationtype": {
                 "title": "SIC Code",
                 "isMandatory": true,
                 "selectedoption": ""
             },
             "identificationno": {
                 "title": "12345",
                 "readonly": false,
                 "value": "10,000$",
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
             "actions": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Action",
                 "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                 "selectedoption": [{ "name": "Auto Approve", "check": false }]
             },
             "previewIcon": false,
             "attributeOptions": {
                 "displaytitle": "Attributes",
                 "displaytext": "Attributes",
                 "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                 "selectedoption": { "name": "Amount", "check": false }
             },
             "rulegrOptions": {
                 "displaytitle": "Please Enter",
                 //"options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "selectedoption": []
             },
             "valgrpOptions": {
                 // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "displaytitle": "Please Enter",
                 "selectedoption": []
             },
             "sequenceOptions": {
                 "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                 "selectedoption": { "name": "Select Sequence" }
             },
             "opratorValues": {
                 "options": [{ "name": "Select operator" }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
                 "selectedoption": { "name": "Less than" }
             }
         },
         {
             "ischeck": false,
             "conditionValuestate": true,
             "showRange": false,
             "identificationtype": {
                 "title": "SIC Code",
                 "isMandatory": true,
                 "selectedoption": ""
             },
             "identificationno": {
                 "title": "12345",
                 "readonly": false,
                 "value": "10,000$",
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
             "actions": {
                 "displaytitle": "Please Enter",
                 "displaytext": "Action",
                 "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                 "selectedoption": [{ "name": "Cost Center Approval", "check": false }]
             },
             "previewIcon": false,
             "attributeOptions": {
                 "displaytitle": "Attributes",
                 "displaytext": "Attributes",
                 "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                 "selectedoption": { "name": "Amount", "check": false }
             },
             "rulegrOptions": {
                 "displaytitle": "Please Enter",
                 //"options": [{ "name": "Select Rule Group" },{ "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "selectedoption": { "name": "RG1" }
             },
             "valgrpOptions": {
                 // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                 "displaytitle": "Please Enter",
                 "selectedoption": []
             },
             "sequenceOptions": {
                 "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                 "selectedoption": { "name": "1" }
             },
             "opratorValues": {
                 "options": [{
                     "name": "Select Operator"
                 }, {
                     "name": "Equal to"
                 }, {
                     "name": "Less than"
                 }, {
                     "name": "Greater than"
                 }, {
                     "name": "Not equal to"
                 }, {
                     "name": "In between"
                 }],
                 "selectedoption": { "name": "Greater than" }
             }
         },
          {
              "ischeck": false,
              "conditionValuestate": true,
              "showRange": false,
              "identificationtype": {
                  "title": "SIC Code",
                  "isMandatory": true,
                  "selectedoption": ""
              },
              "identificationno": {
                  "title": "12345",
                  "readonly": false,
                  "value": "Bussiness Travel",
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
              "actions": {
                  "displaytitle": "Please Enter",
                  "displaytext": "Action",
                  "options": [{ "name": "Auto Approve", "check": false }, { "name": "Category Approval Group", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                  "selectedoption": [{ "name": "Category Approval Group", "check": false }]
              },
              "previewIcon": false,
              "attributeOptions": {
                  "displaytitle": "Attributes",
                  "displaytext": "Attributes",
                  "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                  "selectedoption": { "name": "Category", "check": false }
              },
              "rulegrOptions": {
                  "displaytitle": "Please Enter",
                  // "options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                  "selectedoption": { "name": "RG1" }
              },
              "sequenceOptions": {
                  "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                  "selectedoption": { "name": "2" }
              },
              "opratorValues": {
                  "options": [{
                      "name": "Select Operator"
                  }, { "name": "Equal to" }, { "name": "Less than" }, { "name": "Greater than" }, { "name": "Not equal to" }, { "name": "In between" }],
                  "selectedoption": { "name": "Equal to" }
              }
          },
            {
                "ischeck": false,
                "conditionValuestate": true,
                "showRange": false,
                "identificationtype": {
                    "title": "SIC Code",
                    "isMandatory": true,
                    "selectedoption": ""
                },
                "identificationno": {
                    "title": "12345",
                    "readonly": false,
                    "value": "100,000$",
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
                "actions": {
                    "displaytitle": "Please Enter",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }]
                },
                "previewIcon": false,
                "attributeOptions": {
                    "displaytitle": "Attributes",
                    "displaytext": "Attributes",
                    "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Amount", "check": false }
                },
                "rulegrOptions": {
                    "displaytitle": "Please Enter",
                    //"options": [{ "name": "Select Rule Group" }, { "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                    "selectedoption": []
                },
                "sequenceOptions": {
                    "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                    "selectedoption": { "name": "Select Sequence" }
                },
                "opratorValues": {
                    "options": [{
                        "name": "Select Operator"
                    }, {
                        "name": "Equal to"
                    }, {
                        "name": "Less than"
                    }, {
                        "name": "Greater than"
                    }, {
                        "name": "Not equal to"
                    }, {
                        "name": "In between"
                    }],
                    "selectedoption": { "name": "Greater than" }
                }
            },
              {
                  "ischeck": false,
                  "conditionValuestate": true,
                  "showRange": false,
                  "identificationtype": {
                      "title": "SIC Code",
                      "isMandatory": true,
                      "selectedoption": ""
                  },
                  "identificationno": {
                      "title": "12345",
                      "readonly": false,
                      "value": "100,000$",
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
                  "actions": {
                      "displaytitle": "Please Enter",
                      "displaytext": "Action",
                      "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                      "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Auto Approve", "check": false }]
                  },
                  "previewIcon": false,
                  "attributeOptions": {
                      "displaytitle": "Attributes",
                      "displaytext": "Attributes",
                      "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                      "selectedoption": { "name": "Amount", "check": false }
                  },
                  "rulegrOptions": {
                      "displaytitle": "Please Enter",
                      //"options": [{ "name": "Select Rule Group" } ,{ "name": "RG1" }, { "name": "RG2" }, { "name": "RG3" }, { "name": "RG4" }, { "name": "RG5" }],
                      "selectedoption": []
                  },
                  "sequenceOptions": {
                      "options": [{ "name": "Select Sequence" }, { "name": "1" }, { "name": "2" }, { "name": "3" }, { "name": "4" }, { "name": "5" }, { "name": "6" }, { "name": "7" }, { "name": "8" }, { "name": "9" }, { "name": "10" }],
                      "selectedoption": { "name": "Select Sequence" }
                  },
                  "opratorValues": {
                      "options": [{
                          "name": "Select Operator"
                      }, {
                          "name": "Equal To"
                      }, {
                          "name": "Less than"
                      }, {
                          "name": "Greater than"
                      }, {
                          "name": "Not equal to"
                      }, {
                          "name": "In between"
                      }],
                      "selectedoption": { "name": "Greater than" }
                  }
              },
        ];

     

        $scope.matrixTableData = [
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                    "selectedoption": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Cost Center Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "CEO Office", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "CEO Office", "check": false }]
                }
            }
            ]
        },
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }],
                    "selectedoption": [{ "name": "CC4", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "CEO Office", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            }
            ]
        },
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{ "name": "CC1", "check": false }, {
                        "name": "CC2", "check": false
                    }, {
                        "name": "CC3", "check": false
                    }, {
                        "name": "CC4", "check": false
                    }, {
                        "name": "CC5", "check": false
                    }, {
                        "name": "CC6", "check": false
                    }],
                    "selectedoption": [{
                        "name": "CC1", "check": false
                    }, {
                        "name": "CC2", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Cost Center Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Executive Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "CEO Office", "check": false }]
                }
            }
            ]
        },
        {
            "data": [
            {
                "actions": {
                    "displaytitle": "Please Select",
                    "displaytext": "Action",
                    "options": [{
                        "name": "CC1", "check": false
                    }, {
                        "name": "CC2", "check": false
                    }, {
                        "name": "CC3", "check": false
                    }, {
                        "name": "CC4", "check": false
                    }, {
                        "name": "CC5", "check": false
                    }, {
                        "name": "CC6", "check": false
                    }],
                    "selectedoption": [{ "name": "CC4", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Auto Approve", "check": false }, {
                        "name": "Cost Center Approval", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{
                        "name": "Auto Approve", "check": false
                    }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            },
            {
                "actions": {
                    "displaytitle": "Select Action",
                    "displaytext": "Action",
                    "options": [{ "name": "Auto Approve", "check": false }, {
                        "name": "Cost Center Approval", "check": false
                    }, {
                        "name": "Executive Approval", "check": false
                    }, {
                        "name": "CEO Office", "check": false
                    }],
                    "selectedoption": [{ "name": "Executive Approval", "check": false }]
                }
            }
            ]
        }
        ];
        $scope.shallowCopyData = [];
        $scope.shallowCopyData.push(
        {

            "fromVal": {
                "value": "$200000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Cost Center Approval", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$500000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Executive Approval", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$1000000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Auto Approve", "check": false }, { "name": "CEO Office", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$2500000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }]
            }
        },
        {

            "fromVal": {
                "value": "$5000000"
            },
            "toVal": {
                "value": ""
            },
            "actions": {
                "displaytitle": "Select Action",
                "displaytext": "Action",
                "options": [{ "name": "Auto Approve", "check": false }, { "name": "Cost Center Approval", "check": false }, { "name": "Executive Approval", "check": false }, { "name": "CEO Office", "check": false }],
                "selectedoption": [{ "name": "CEO Office", "check": false }]
            }
        }
        );
        $scope.configureAttr = true;
        $scope.addAttributesData = $scope.shallowCopyData;
        $scope.getColSpan = $scope.addAttributesData.length + 1;
        $scope.getWidth = (parseInt(85 + '%') / ($scope.addAttributesData.length)) + '%';
        if ($state.params.type == 'Standard Creation') {
            $scope.conditionsData = [
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "10",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    //"displaytext": "Attributes",
                    "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Cost Center", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    // "displaytext": "Value",
                    "options": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
                    "selectedoption": [{ "name": "CC1", "check": false }, { "name": "CC2", "check": false }, { "name": "CC3", "check": false }]
                },
            },
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "",
                "fromRange": "10",
                "toRange": "20",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    // "displaytext": "Attributes",
                    "options": [{ "name": "List Option", "check": false }, { "name": "Entity Code", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Entity Code", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    //"displaytext": "Value",
                    "options": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }, { "name": "EC3", "check": false }, { "name": "EC4", "check": false }, { "name": "EC5", "check": false }, { "name": "EC6", "check": false }, { "name": "EC7", "check": false }],
                    "selectedoption": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }]
                },
            }];
        }
        if ($state.params.type == 'Approval Matrix') {
            $scope.conditionsData = [
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "10",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "List Option", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Category", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "ABC", "check": false }, { "name": "XYZ", "check": false }, { "name": "CC3", "check": false }, { "name": "CC4", "check": false }, { "name": "CC5", "check": false }, { "name": "CC6", "check": false }, { "name": "CC7", "check": false }],
                    "selectedoption": [{ "name": "ABC", "check": false }, { "name": "XYZ", "check": false }, { "name": "CC3", "check": false }]
                },
            },
            {
                "conditionValuestate": true,
                "showRange": false,
                "conditionValueFirst": "",
                "fromRange": "10",
                "toRange": "20",
                "attributeName": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "List Option", "check": false }, { "name": "Entity Code", "check": false }, { "name": "GL Code", "check": false }, { "name": "Cost Center", "check": false }, { "name": "Category", "check": false }, { "name": "Business Unit", "check": false }, { "name": "Amount", "check": false }, { "name": "Date", "check": false }],
                    "selectedoption": { "name": "Entity Code", "check": false }
                },
                "conditionValue": {
                    "displaytitle": "Please Enter",
                    "options": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }, { "name": "EC3", "check": false }, { "name": "EC4", "check": false }, { "name": "EC5", "check": false }, { "name": "EC6", "check": false }, { "name": "EC7", "check": false }],
                    "selectedoption": [{ "name": "EC1", "check": false }, { "name": "EC2", "check": false }]
                },
            }];
        }
    }

};

function previewRuleCtrlFunc($scope, $http, $timeout, notification, $state, shareWithCtrl, $filter) {
    $scope.isPageWithoutImage = true;
    $scope.previewpageType = {}
    $scope.previewpageType.type = $state.params.type;
    $scope.showPreviewSummary = false;
    $scope.updateRulesMat = function () {
        Materialize.toast('100 Rules Updated', 2000);
    };
    $scope.publishRulesMat = function () {
        Materialize.toast('100 Rules created successfully', 2000);
    };

    $scope.actionTypeUpdateData = [
    {
        selectedOption: { "name": "Auto Approve" },
        toselectedOption: { "name": "Cost Center Approval" }
    }
    ];
    $scope.actionParameterData = [
    {
        selectedActionOpt: { "name": "Approval Group" },
        selectedParameterOpt: { name: 'Group' },
        from: { "name": "CC-India" },
        to: { "name": "Executive" }
    }
    ];
    $scope.massEditRuleconditionsData = [
	//{
	//    "selectedTypeOption": {
	//        "name": "Add Attribute"
	//    },
	//    "selectedAttrOption": {
	//        "name": "Amount",
	//        "data": [
	//			{
	//			    "name": "Amount 1"
	//			},
	//			{
	//			    "name": "Amount 2"
	//			}
	//        ],
	//        "value": "Amount"
	//    },
	//    "selectedPoratorOption": {
	//        "name": "Equal to",
	//        "value": [
	//			{
	//			    "title": "10000"
	//			}
	//        ]
	//    },
	//    "selectedPoratorOptionFrom": "",
	//    "selectedPoratorOptionTo": "",
	//    "selectedValueOption": []
	//},
    {
        "selectedTypeOption": {
            "name": "Update Attribute"
        },
        "selectedAttrOption": {
            "name": "Amount",
            "data": [
            {
                "name": "Amount 1"
            },
            {
                "name": "Amount 2"
            }
            ],
            "value": "Amount"
        },
        "selectedPoratorOption": "",
        "selectedPoratorOptionFrom": {
            "name": "In between",
            "value": [
            {
                "title": "1000"
            },
            {
                "title": "5000"
            }
            ]
        },
        "selectedPoratorOptionTo": {
            "name": "In between",
            "value": [
            {
                "title": "1000"
            },
            {
                "title": "5000"
            }
            ]
        },
        "selectedValueOption": []
    }
	//{
	//    "selectedTypeOption": {
	//        "name": "Remove Attribute"
	//    },
	//    "selectedAttrOption": {
	//        "name": "List option",
	//        "data": [
	//			{
	//			    "name": "List option 1",
	//			    "value": "List option 1"
	//			},
	//			{
	//			    "name": "List option 2",
	//			    "value": "List option 2"
	//			},
	//			{
	//			    "name": "List option 3",
	//			    "value": "List option 3"
	//			}
	//        ],
	//        "value": "List option"
	//    },
	//    "selectedPoratorOption": "",
	//    "selectedPoratorOptionFrom": "",
	//    "selectedPoratorOptionTo": "",
	//    "selectedValueOption": [
	//		{
	//		    "name": "List option 1",
	//		    "value": "List option 1"
	//		}
	//    ]
	//}
    ]
}