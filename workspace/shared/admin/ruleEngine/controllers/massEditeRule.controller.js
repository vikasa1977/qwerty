angular
	.module('SMART2')

	.controller('massEditeRuleCtrl', ['$scope', '$http', '$timeout', 'storeTempService', 'notification', '$state', '$window', '$filter', massEditeRuleCtrlFunc])
    .controller('massRuleEditMethodCtrl', ['$scope', 'shareWithCtrl', '$filter', massRuleEditMethodCtrlFunc])
    .controller('massEditRuleBasicDetailsCtrl', ['$scope', '$http', '$timeout', 'notification', '$state', 'shareWithCtrl', '$filter', massEditRuleBasicDetailsCtrlFunc])

function massEditeRuleCtrlFunc($scope, $http, $timeout, storeTempService, notification, $state, $window, $filter) {

    var massEditRuleConfig = {
        method: 'GET',
        url: 'shared/admin/ruleEngine/models/massEditRule.json'
    };

    $http(massEditRuleConfig).then(function (response) {
        $scope.config = response.data;
        $scope.massEditRuleFormData = response.data.formConfig;
        $scope.basicDetail = {
            ruleSelected: { title: 200 },
            selectedBusinessCase: { 'name': 'Business Case' },
            docGroup: { "name": "P2P" },
            docType: { "name": "Requisitions" },
            costCenter: {
                selectedOpt: [
					{
					    "name": "Cost Center 1"
					},
					{
					    "name": "Cost Center 2"
					},
					{
					    "name": "Cost Center 3"
					}
                ]
            },
            actionType: {
                selectedOpt: [
					{
					    "name": "Approval Group"
					},
					{
					    "name": "Auto Approve"
					},
					{
					    "name": "Auto Reject"
					}
                ]
            }
        };

    });

    $scope.updateRules = function (e) {
        var createOb = {
            type: "inform",
            message: "<p class=''>100 Rules have been updated.</p><p class=''>10 Duplicates have been discarded</p>",
            buttons: [{
                title: "OK",
                result: "ok"
            }]
        };

        notification.notify(createOb, function (response) {
            if (response.result === 'ok') {
                $state.go('admin.ruleEngine');
            };
        });
    };

    $scope.CancelRules = function (e) {
        var createOb = {
            type: 'confirm',
            message: "Are you sure you want to cancel mass edit?",
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
};

function massRuleEditMethodCtrlFunc($scope, shareWithCtrl, $filter) {
    $scope.actionTypeUpdateData = [
		{
		    selectedOption: { "name": "Auto Approve" },
		    toselectedOption: "",
		    todata: [
                {
                    "name": "Cost Center Approval"
                },
                {
                    "name": "Executive Approval"
                },
                {
                    "name": "CEO Office"
                },
                {
                    "name": "Auto Approve"
                },
                {
                    "name": "Auto Reject"
                }
		    ],
		    identificationData: {
		        "identificationtype": {
		            "title": "SIC Code",
		            "isMandatory": true,
		            "selectedoption": ""
		        },
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
		        "group": {
		            "displaytitle": "Please Enter",
		            "displaytext": "Group",
		            "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "EntityCEO office", "check": false }],
		            "selectedoption": []
		        },
		        "leadApprovalGroup": {
		            "displaytitle": "Please Enter",
		            "displaytext": "Lead Approval",
		            "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
		            "selectedoption": []
		        }
		    }
		}
    ];
    $scope.actionTypeUpdateFn = function () {
        $scope.actionTypeUpdateData.push({
            selectedOption: { "name": "Approval Group" },
            toselectedOption: "",
            todata: [
                {
                    "name": "Cost Center Approval"
                },
                {
                    "name": "Executive Approval"
                },
                {
                    "name": "CEO Office"
                },
                {
                    "name": "Auto Approve"
                },
                {
                    "name": "Auto Reject"
                }
            ],
            identificationData: {
                "identificationtype": {
                    "title": "SIC Code",
                    "isMandatory": true,
                    "selectedoption": ""
                },
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
                "group": {
                    "displaytitle": "Please Enter",
                    "displaytext": "Group",
                    "options": [{ "name": "CC-India", "check": false }, { "name": "Executive", "check": false }, { "name": "EntityCEO office", "check": false }],
                    "selectedoption": []
                },
                "leadApprovalGroup": {
                    "displaytitle": "Please Enter",
                    "displaytext": "Lead Approval",
                    "options": [{ "name": "y.s@gep.com", "check": false }, { "name": "r.d@gep.com", "check": false }, { "name": "s.m@gep.com", "check": false }],
                    "selectedoption": []
                }
            }
        });
    };

    $scope.actionTypeData = {
        data: [         
                {
                    "name": "Cost Center Approval"
                },
                {
                    "name": "Executive Approval"
                },
                {
                    "name": "CEO Office"
                },
                {
                    "name": "Auto Approve"
                },
                {
                    "name": "Auto Reject"
                }
            //{
            //    "name": "Approval Group"
            //},

            //{
            //    "name": "Notify"
            //},
            //{
            //    "name": "Supervisory Hierarchy"
            //},
            //{
            //    "name": "Financial Review"
            //},
            //{
            //    "name": "Category Approvals"
            //}
        ]
    }

    $scope.onChang = function (data, index) {
        var temp = angular.copy($scope.actionTypeData.data),
		tempLength = temp.length,
		indexArr;

        for (i = 0; i < tempLength; i++) {
            if (data.name === temp[i].name) {
                indexArr = i;
            }
        }
        temp.splice(indexArr, 1);
        $scope.actionTypeUpdateData[index].todata = temp;

    };

    $scope.selectedoption = { 'name': 'Percentage' };

    $scope.identificationsourcetype = [{
        "name": "Percentage"
    }, {
        "name": "Number"
    }];

    $scope.actionTypeParameterUpdateFn = function () {
        $scope.actionParameterData.push([
         {
             selectedActionOpt: {
                 "name": "Approval Group",
                 "data": [
                {
                    name: 'Group',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Lead Approver',
                    fromData: [{ "name": "y.s@gep.com" }, { "name": "r.d@gep.com" }, { "name": "s.m@gep.com" }]
                },
                {
                    name: 'Self approval',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Pool type',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Enable auto approval',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Pool value',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                }
                 ]
             },
             selectedParameterOpt: [],
             from: "",
             to: ""
         }
        ]);
    };


    $scope.actionParameterFn = function (data,type) {
        data[type] = "";
    };

    $scope.actionSelectedType = [
        {
            "name": "Approval Group",
            "data": [
                {
                    name: 'Group',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Lead Approver',
                    fromData: [{ "name": "y.s@gep.com" }, { "name": "r.d@gep.com" }, { "name": "s.m@gep.com" }]
                },
                {
                    name: 'Self approval',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Pool type',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Enable auto approval',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Pool value',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                }
            ]
        },
        {
            "name": "Supervisory Hierarchy",
            "data": [
                { name: 'Hierarchy Enity Type Id',fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Force SOX Compliance', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Lead Approver', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Self approval', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Minimum approvals required', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'DPA type', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Requires Self Approval', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] }
            ]
        },
        {
            "name": "Financial Review",
            "data": [
                { name: 'Enable auto approval', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Lead Approver', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Pool Entity Type Id', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Pool type', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Pool value', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] }
            ]
        },
        {
            "name": "Category Approvals",
            "data": [
                { name: 'Is single level approval', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Lead Approver', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Self approval', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] },
                { name: 'Enable auto approval', fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }] }
            ]
        }
    ];
    $scope.actionParameterData = [
        {
            selectedActionOpt: {
                "name": "Approval Group",
                "data": [
                {
                    name: 'Group',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Lead Approver',
                    fromData: [{ "name": "y.s@gep.com" }, { "name": "r.d@gep.com" }, { "name": "s.m@gep.com" }]
                },
                {
                    name: 'Self approval',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Pool type',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Enable auto approval',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                },
                {
                    name: 'Pool value',
                    fromData: [{ "name": "CC-India" }, { "name": "Executive" }, { "name": "EntityCEO office" }]
                }
                ]
            },
            selectedParameterOpt: "",
            from: "",
            to: ""
        }
    ];


    $scope.massEditRuleconditionsData = [
        {
            selectedTypeOption: { 'name': 'Add Attribute' },
            selectedAttrOption: "",
            selectedPoratorOption: "",
            selectedPoratorOptionFrom: "",
            selectedPoratorOptionTo: "",
            selectedValueOption : []
        }
    ];
    $scope.actionconditionalFn = function (data, type) {
       
        data.push({
            selectedTypeOption: { 'name': type },
            selectedAttrOption: "",
            selectedPoratorOption: "",
            selectedPoratorOptionFrom: "",
            selectedPoratorOptionTo: "",
            selectedValueOption: []
        });
    };
    $scope.conditionOpOption = [
        { 
			"name": "Equal to",
			value : [
				{ title : "" }
			]
		},
        { 
			"name": "Less than",
			value : [
				{ title : "" }
			]
		},
        { 
			"name": "Greater than",
			value : [
				{ title : "" }
			]
		},
        { 
			"name": "Not equal to",
			value : [
				{ title : "" }
			]
		},
        { 
			"name": "In between",
			value : [
				{ title : "" },
				{ title : "" }
			]
		}
    ];
    $scope.conditionSelectOption = [
        { 'name': 'Add Attribute' },
        { 'name': 'Update Attribute' },
        { 'name': 'Remove Attribute' }
    ];
    $scope.typeOptionsAttrName = [{ "name": "List option", data: [{ "name": "List option 1"}, {"name": "List option 2"}, {"name": "List option 3" }] }, { "name": "GL code", data: [{ "name": "GL code 1" }, { "name": "GL code 2" }] },{ "name": "Cost Center", data: [{ "name": "CC Mumbai" }, { "name": "CC Hyderabad" }] }, { "name": "Category", data: [{ "name": "Category 1" }, { "name": "Category 2" }] }, { "name": "Entity code", data: [{ "name": "Entity code 1" }, { "name": "Entity code 2" }] }, { "name": "Business unit", data: [{ "name": "Business unit 1" }, { "name": "Business unit 2" }] }, { "name": "Amount", data: [{ "name": "Amount 1" }, { "name": "Amount 2" }] }, { "name": "Date", data: [{ "name": "Date 1" }, { "name": "Date 2" }] }];

};

function massEditRuleBasicDetailsCtrlFunc($scope, $http, $timeout, notification, $state, shareWithCtrl, $filter) {
    $scope.showDoucmentType = true;
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };

    $scope.businessCaseOption = [
       { 'name': 'Approvals' },
       { 'name': 'Submission Check' },
       { 'name': 'Template Selection' },
       { 'name': 'Notification' },
       { 'name': 'Request Redirection' },
        { 'name': 'Requisition Order' }
    ];
    $scope.summaryactionType = [
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
    ];

    $scope.costCenterOpt = [
		{
		    "name": "Cost Center 1"
		},
		{
		    "name": "Cost Center 2"
		},
		{
		    "name": "Cost Center 3"
		},
		{
		    "name": "Cost Center 4"
		},
		{
		    "name": "Cost Center 5"
		},
		{
		    "name": "Cost Center 6"
		},
		{
		    "name": "Cost Center 7"
		}
    ];

    $scope.changeBusinessCase = function (indexName) {
        $scope.selectedBusinessCase = { 'name': indexName };
    };

    $scope.selectedDocumentGroup = { 'name': 'Document Group' };
    $scope.docGroupOption = [
       { 'name': 'P2P' },
       { 'name': 'Contracts' },
       { 'name': 'Sourcing' },
       { 'name': 'Projects' },
       { 'name': 'Supplier' }
    ];

    $scope.changeDocumentGroup = function (indexName) {
        $scope.showDoucmentType = false;
        $scope.selectedDocumentGroup = { 'name': indexName };
        $scope.documentType = documentTypeData[indexName];
    };

    $scope.docTypeOptions = [
        { "name": "Requisitions" },
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
        { "name": "Projects" }
    ];



};

