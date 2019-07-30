angular.module('SMART2')
	.controller('p2pApprovalPageCtrl', ['$scope', '$http', '$state', '$filter', 'shareWithCtrl', 'notification', 'notificationService', 'trackStatusService', p2pApprovalPageCtrlFunc]);

function p2pApprovalPageCtrlFunc($scope, $http, $state, $filter, shareWithCtrl, notification, notificationService, trackStatusService) {
	$scope.mode = $state.params.mode;
	/*sub header script*/
	$scope.isBlanketMode = false;
	if ($scope.mode == "blanket") {
		$scope.isBlanketMode = true;
	}
	 var currentState = $state.current.name;
	 $scope.currPage = currentState;
	if (currentState === "p2p.order.approval" || currentState === "contract.approval") {
		var getRespond = {
			method: 'GET',
			url: 'p2p/order/models/createOrder.json'
		};
	}
	else if (currentState === "p2p.req.approval" || currentState === "contract.approval") {
		var getRespond = {
			method: 'GET',
			url: 'p2p/req/models/createReq.json'
		};
	}
	else if (currentState === "p2p.ir.approval" || currentState === "contract.approval") {
	    var getRespond = {
	        method: 'GET',
	        url: 'p2p/ir/models/createIR.json'
	    };
	}

    $http(getRespond).then(function (response) {
        if ($scope.mode == "blanket") {
            $scope.dataModel = response.data.dataBlanketModel;
        }else
        $scope.dataModel = response.data.dataModel;
        if ($scope.dataModel.orderData) {
        	$scope.documentName = $scope.dataModel.orderData.DocumentName;
        	$scope.documentNumber = $scope.dataModel.orderData.DocumentNumber;
        }
        else if ($scope.dataModel.setup) {
        	$scope.documentName = $scope.dataModel.setup.reqName;
        	$scope.documentNumber = $scope.dataModel.setup.reqNo;
        }
        else if ($scope.dataModel.objIR) {
            $scope.documentName = $scope.dataModel.objIR.DocumentName;
            $scope.documentNumber = $scope.dataModel.objIR.InvoiceNumber;
        }
        $scope.config = response.data.formConfig;
    }, function (error) {
        console.log(JSON.stringify(error));
    });
    $scope.getTotalTax = function () {
        var count = 0;
        angular.forEach($scope.taxConfig, function (taxValue) {

            count += parseInt(taxValue.dataValue)

        });

        return count;

    };

    /* tax popover */
    $scope.taxConfig =
        [
        {
            "dataName": "Order Value",
            "dataValue": 678.00,
            "taxEditable": true,
            "makeEdit": false,
            "editableFieldFocus": false
        },
        {
            "dataName": "Shipping",
            "dataValue": 109.00,
            "taxEditable": true,
            "makeEdit": false,
            "editableFieldFocus": false
        },
        {
            "dataName": "Taxes",
            "dataValue": 0,
            "taxEditable": false,
            "makeEdit": false,
            "editableFieldFocus": false
        }
        ,
        {
            "dataName": "Other Charges",
            "dataValue": 678,
            "taxEditable": false,
            "makeEdit": false,
            "editableFieldFocus": false
        }
        ];

    $scope.cancelLink = function () {
        window.history.go(-1);
    }

    $scope.makeEditCurrent = function (elem) {
        $scope.taxConfig.forEach(function (element, index, array) {
            $scope.taxConfig[index].makeEdit = false;
            $scope.taxConfig[index].editableFieldFocus = false;
        });
        $scope.taxConfig[elem].makeEdit = true;
        $scope.taxConfig[elem].editableFieldFocus = true;
    };



    $scope.newTaxValue = $filter('number')("0", 2);


    $scope.updateTaxValue = function (index, data) {
        $scope.taxConfig[index].dataValue = $filter('number')(data, 2);
        $scope.newTaxValu = $filter('number')("0", 2);;
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }

    $scope.cancelupdateTaxValue = function (index) {
        $scope.newTaxValu = $filter('number')("0", 2);
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }    


    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";
    $scope.attachmentPopUpUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.showCommentsPopup = false;
    $scope.showCommentsPopupCallback = function (e) {
        $scope.showCommentsPopup = true;
    };
    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showCommentsPopup = false;
        $scope.commentIcon = '#icon_Commented';//icon_Comments
    };


    $scope.commentList = [{
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "rutrum eu dui rutrum eu dui  rutrum eu dui rutrum eu dui.",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: true,
        attachments: [{
            filename: "lorem.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "rutrum eu dui rutrum eu dui. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: false,
        attachments: [{
            filename: "reprehenderit.xls"
        }, {
            filename: "velit.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: true,
        attachments: [{
            filename: "rutrum.xls"
        }, {
            filename: "dui.xls"
        }, {
            filename: "eu.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim .",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: false,
        attachments: [{
            filename: "consectetur.xls"
        }, {
            filename: "amet.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui.",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: false,
        attachments: [{
            filename: "lorem.xls"
        }]
    }
    ];



    //Attachment popup--start

    var comingFrom;
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadPopup = false;

    $scope.adduploadCallback = function (e, popupComingfrom) {
        $scope.showUploadPopup = true;
        comingFrom = popupComingfrom;
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
        if (comingFrom == undefined) {

            return false;
        } else if (comingFrom == "comment") {

            $scope.showCommentsPopup = true;

        } else if (comingFrom == "manageApproval") {
            $scope.mngAppShow = true;
        }
    }
    $scope.docFlag = false;
    $scope.uploadDocCall = function (e) {
        $scope.docFlag = true;
    };
    $scope.attachFlag = false;


    $scope.attachmentList = [
		{
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
    //Attachment popup--end


    /* POPUP SEARCH */
    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    };

    /*sub header script*/
    $scope.documentDetail = {};
    if ($scope.mode == "blanket") {
        $scope.documentDetail =	
        {
            "DocumentName": "BPO-2016.000007",
            "createdOn": "1476316800000",
            "createdBy":"Avishek Jana",
            "currentStatus": "NOT SENT FOR APPROVAL"
        };
    }
    if(currentState === "p2p.order.approval"){
            $scope.documentDetail =	
	        {
	            "DocumentName": "PO - 766599722",
	            "createdOn":"1474624984000",
	            "createdBy":"John H",
	            "currentStatus": "NOT SENT FOR APPROVAL"
	        };
	}
    else if (currentState === "p2p.req.approval") {
		$scope.documentDetail =	
		{
			"DocumentName": "REQ - 766599722",
			"createdOn":"1474624984000",
			"createdBy":"John H",
			"currentStatus": "NOT SENT FOR APPROVAL"
		};
    }
    else if (currentState === "p2p.ir.approval") {
        $scope.documentDetail =
		{
		    "DocumentName": "IR - 766599722",
		    "createdOn": "1474624984000",
		    "createdBy": "John H",
		    "currentStatus": "NOT SENT FOR APPROVAL"
		};
    }
    else if (currentState === "contract.approval") {
        $scope.documentDetail =
		{
		    "DocumentName": "CON - 766599722",
		    "createdOn": "1474624984000",
		    "createdBy": "John H",
		    "currentStatus": "NOT SENT FOR APPROVAL"
		};
    }


    /*sub header script For AdminCatalogApproval*/
    $scope.isAdminCatalogApproval = false;
    $scope.isAdminContractApproval = false;
    if ($scope.mode == "AdminCatalogApproval") {
        $scope.isAdminCatalogApproval = true;
    }
    if ($scope.mode == "AdminContractApproval") {
        $scope.isAdminContractApproval = false;
        $scope.isAdminCatalogApproval = true;

       
    }
    $scope.catdocumentDetail = {};
    if ($scope.mode == "AdminCatalogApproval") {
        $scope.catdocumentDetail =
        {
            "DocumentName": "12345 - NEW CATALOG (DRAFT) ",
        };
    }
    else {
        $scope.catdocumentDetail =
        {
            "DocumentName": "12345 - NEW CATALOG (DRAFT)",
            "createdOn": "1474624984000",
            "createdBy": "John H",
            "currentStatus": "NOT SENT FOR APPROVAL"
        };
    }

    if ($scope.mode == "AdminContractApproval") {
        $scope.catdocumentDetail =
        {
            "DocumentName": " ",
        };
    }
    else {
        $scope.catdocumentDetail =
        {
            "DocumentName": " ",
            "createdOn": "1474624984000",
            "createdBy": "John H",
            "currentStatus": "NOT SENT FOR APPROVAL"
        };
    }

    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'right' // Displays dropdown with edge aligned to the left of button
    };

    $scope.splitActions = [
        { key: "SAVE" },
        { key: "SAVE AND CLOSE" }
    ];

    $scope.approvarTypes = [
        { icon: '#icon_AppOne', color: 'color-approved-pending', text: 'Pool Approval - At least one needs to approve' },
        { icon: '#icon_AppAll', color: 'color-approved-pending', text: 'Parallel Approval - Everyone must approve' },
        { icon: '#icon_AppSingle', color: 'color-approved-pending', text: 'Individual needs to approve' },
        { icon: '#Icon_AppAuto', color: 'color-approved-pending', text: 'Automatic approval by the system' },
        { icon: '#icon_AppHoc', color: 'color-add-Hoc', text: 'AdHoc Approver' }
    ];
    $scope.statuss = [
        { icon: '#icon_TSAccepted', color: 'color-approved', text: 'Approved/Accepted' },
        { icon: '#icon_TSRejected', color: 'color-rejected', text: 'Rejected' },
        { icon: '#icon_TSPending', color: 'color-approved-pending', text: 'Pending' },
        { icon: '#icon_TSPartialAc', color: 'color-approved', text: 'Partially Approved/Accepted' },
        { icon: '#icon_TSPartialRe', color: 'color-rejected', text: 'Partially Rejected' },
        { icon: '#icon_TSAccepted', color: 'color-assigned-on', text: 'Assigned On' },
        { icon: '#icon_Info_i', color: 'grey-text', text: 'Information' }

    ];

    $scope.trackStatusTabs = [
        { "title": "Cycle 1", "contentUrl": "shared/approval/views/cycle1.html", "active": true },
        { "title": "Cycle 2", "contentUrl": "shared/approval/views/cycle2.html" },
        { "title": "Cycle 3", "contentUrl": "shared/approval/views/cycle3.html" },
        { "title": "Cycle 4", "contentUrl": "shared/approval/views/cycle1.html" },
        { "title": "Cycle 5", "contentUrl": "shared/approval/views/cycle2.html" },
        { "title": "Cycle 6", "contentUrl": "shared/approval/views/cycle3.html" },
        { "title": "Cycle 7", "contentUrl": "shared/approval/views/cycle1.html" },
        { "title": "Cycle 8", "contentUrl": "shared/approval/views/cycle2.html" },
        { "title": "Cycle 9", "contentUrl": "shared/approval/views/cycle3.html" }
    ];

    if (currentState === "contract.approval") {
        $scope.approvalPathList = shareWithCtrl.data.value ? shareWithCtrl.data.value : [];
    }
    else {
        $scope.approvalPathList = {
            "approvarTypes": [
                { icon: '#icon_AppOne', color: 'color-approved-pending', text: 'Pool Approval - At least one needs to approve' },
                { icon: '#icon_AppAll', color: 'color-approved-pending', text: 'Parallel Approval - Everyone must approve' },
                { icon: '#icon_AppSingle', color: 'color-approved-pending', text: 'Individual needs to approve' },
                { icon: '#Icon_AppAuto', color: 'color-approved-pending', text: 'Automatic approval by the system' },
                { icon: '#icon_AppHoc', color: 'color-add-Hoc', text: 'AdHoc Approver' }
            ],
            "legendStatus": [
                { icon: '#icon_TSAccepted', color: 'color-approved', text: 'Approved/Accepted' },
                { icon: '#icon_TSRejected', color: 'color-rejected', text: 'Rejected' },
                { icon: '#icon_TSPending', color: 'color-approved-pending', text: 'Pending' },
                { icon: '#icon_TSWidthdrawal', color: 'color-assigned-on', text: 'Withdraw' },
                { icon: '#icon_TSPartialAc', color: 'color-approved', text: 'Partially Approved/Accepted' },
                { icon: '#icon_TSPartialRe', color: 'color-rejected', text: 'Partially Rejected' },
                { icon: '#icon_TSAccepted', color: 'color-assigned-on', text: 'Assigned On' },
                { icon: '#icon_Info_i', color: 'grey-text', text: 'Information' }
            ],
            "trackStatusTabs": [
                { "title": "Cycle 1", "contentUrl": "", "active": true },
                { "title": "Cycle 2", "contentUrl": "" },
                { "title": "Cycle 3", "contentUrl": "" }
            ],
            "summary": {
                "top": [
                    {
                        "title": "ORDER CREATED",
                        "user": "John H",
                        "createdOn": "1474624984000",
                        "userType": "External User",
                        "orderStatus": "Order Exceed the budget",
                        "onDate": "Nov 20,2015 03:54 PM"
                    },
                    {
                        "title": "ORDER SUBMITTED",
                        "user": "John H",
                        "createdOn": "1474624984000",
                        "userType": "External User",
                        "orderStatus": "Order Exceed the budget",
                        "onDate": "Nov 20,2015 03:54 PM"
                    }
                ],
                "bottom": [
                    {
                        "title": "SENT TO SUPPLIER",
                        "user": "John H",
                        "createdOn": "1474624984000",
                        "userType": "External User",
                        "orderStatus": "Order Exceed the budget",
                        "onDate": "Nov 20,2015 03:54 PM",
                        "sumType": "info"
                    },
                    {
                        "title": "WITHDRAW",
                        "user": "John Doe",
                        "createdOn": "1474624984000",
                        "userType": "External User",
                        "orderStatus": "Order Exceed the budget",
                        "onDate": "Nov 20,2016 03:54 PM",
                        "sumType": "withdraw"
                    }
                ]
            },
            "data": "",
            "allCycleData": [
                {
                    "cycleData": [
                        {
                            "groupName": "Buyer Group Name",
                            "nonParallelFlow": true,
                            "offline": false,
                            "ccList": [
                                {
                                    "ccName": "Cost Center 1",
                                    "levelList": [
                                        {
                                            "status": "Withdraw",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Pool Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "userType": "External User",
                                                    "designation": "Manager",
                                                    "delegatedDate": "on Nov 16, 2015",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "approverType": "Individual Approval",
                                                    "status": "Approved",
                                                    "statusDate": "Nov 16, 2015"
                                                },
                                                {
                                                    "name": "John Doe",
                                                    "userType": "",
                                                    "designation": "Manager",
                                                    "delegatedDate": "",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "approverType": "Automatic Approval",
                                                    "status": "Pending Approval",
                                                    "statusDate": "Nov 16, 2015"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Marked Offline",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Individual Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Bypass",
                                                "status": true,
                                                "subCatOptions": [
                                                    {
                                                        "name": "Offline"
                                                    },
                                                    {
                                                        "name": "Skip"
                                                    }
                                                ],
                                                "selectedCat": {
                                                    "name": "Offline"
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "groupName": "Category Group Name",
                            "offline": false,
                            "ccList": [
                                {
                                    "ccName": "Cost Center 1",
                                    "levelList": [
                                        {
                                            "status": "Pending Approval",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Individual Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Approved",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Pool Approval",
                                            "deligatedBy": "Jaydeo Jantre",
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        }
                                    ]
                                },
                                {
                                    "ccName": "Cost Center 2",
                                    "levelList": [
                                        {
                                            "status": "Skipped",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Parallel Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Bypass",
                                                "status": true,
                                                "subCatOptions": [
                                                    {
                                                        "name": "Offline"
                                                    },
                                                    {
                                                        "name": "Skip"
                                                    }
                                                ],
                                                "selectedCat": {
                                                    "name": "Skip"
                                                }
                                            }
                                        },
                                        {
                                            "status": "Approved",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Automatic Approval",
                                            "latestApproved": true,
                                            "reassignedFrom": "Jaydeo Jantre",
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Skip",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Rejected",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "AdHoc Approval",
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Skip",
                                                "status": false
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "cycleData": [
                        {
                            "groupName": "Buyer Group Name",
                            "nonParallelFlow": true,
                            "offline": false,
                            "ccList": [
                                {
                                    "ccName": "Cost Center 1",
                                    "levelList": [
                                        {
                                            "status": "Withdraw",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Pool Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "userType": "External User",
                                                    "designation": "Manager",
                                                    "delegatedDate": "on Nov 16, 2015",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "approverType": "Individual Approval",
                                                    "status": "Approved",
                                                    "statusDate": "Nov 16, 2015"
                                                },
                                                {
                                                    "name": "John Doe",
                                                    "userType": "",
                                                    "designation": "Manager",
                                                    "delegatedDate": "",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "approverType": "Automatic Approval",
                                                    "status": "Pending Approval",
                                                    "statusDate": "Nov 16, 2015"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Marked Offline",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Individual Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Bypass",
                                                "status": true,
                                                "subCatOptions": [
                                                    {
                                                        "name": "Offline"
                                                    },
                                                    {
                                                        "name": "Skip"
                                                    }
                                                ],
                                                "selectedCat": {
                                                    "name": "Offline"
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "groupName": "Category Group Name",
                            "offline": false,
                            "ccList": [
                                {
                                    "ccName": "Cost Center 1",
                                    "levelList": [
                                        {
                                            "status": "Pending Approval",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Individual Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Approved",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Pool Approval",
                                            "latestApproved": true,
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ] 
                },
                {
                    "cycleData": [
                        {
                            "groupName": "Buyer Group Name",
                            "nonParallelFlow": true,
                            "offline": false,
                            "ccList": [
                                {
                                    "ccName": "Cost Center 1",
                                    "levelList": [
                                        {
                                            "status": "Withdraw",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Pool Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "userType": "External User",
                                                    "designation": "Manager",
                                                    "delegatedDate": "on Nov 16, 2015",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "approverType": "Individual Approval",
                                                    "status": "Approved",
                                                    "statusDate": "Nov 16, 2015"
                                                },
                                                {
                                                    "name": "John Doe",
                                                    "userType": "",
                                                    "designation": "Manager",
                                                    "delegatedDate": "",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "approverType": "Automatic Approval",
                                                    "status": "Pending Approval",
                                                    "statusDate": "Nov 16, 2015"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Marked Offline",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Individual Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Bypass",
                                                "status": true,
                                                "subCatOptions": [
                                                    {
                                                        "name": "Offline"
                                                    },
                                                    {
                                                        "name": "Skip"
                                                    }
                                                ],
                                                "selectedCat": {
                                                    "name": "Offline"
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "groupName": "Category Group Name",
                            "offline": false,
                            "ccList": [
                                {
                                    "ccName": "Cost Center 1",
                                    "levelList": [
                                        {
                                            "status": "Pending Approval",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Individual Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Approved",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Pool Approval",
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Offline",
                                                "status": false
                                            }
                                        }
                                    ]
                                },
                                {
                                    "ccName": "Cost Center 2",
                                    "levelList": [
                                        {
                                            "status": "Skipped",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Parallel Approval",
                                            "team": [
                                                {
                                                    "name": "Jammie Foster",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "Jammie Foster",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Bypass",
                                                "status": true,
                                                "subCatOptions": [
                                                    {
                                                        "name": "Offline"
                                                    },
                                                    {
                                                        "name": "Skip"
                                                    }
                                                ],
                                                "selectedCat": {
                                                    "name": "Skip"
                                                }
                                            }
                                        },
                                        {
                                            "status": "Approved",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "Automatic Approval",
                                            "latestApproved": true,
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Skip",
                                                "status": false
                                            }
                                        },
                                        {
                                            "status": "Rejected",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "AdHoc Approval",
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Skip",
                                                "status": false
                                            }
                                        }
                                    ]
                                },
                                {
                                    "ccName": "Cost Center 3",
                                    "levelList": [
                                        {
                                            "status": "Rejected",
                                            "approvalLimit": 0,
                                            "isDetailShow": false,
                                            "onDated": "09/23/2016",
                                            "type": "user",
                                            "approvalGroupName": "AdHoc Approval",
                                            "team": [
                                                {
                                                    "name": "John Doe",
                                                    "type": "user",
                                                    "members": "",
                                                    "reassign": false,
                                                    "reassignedTo": "",
                                                    "edit": false,
                                                    "value": "John Doe",
                                                    "isdisable": false,
                                                    "status": "NOT SENT FOR APPROVAL"
                                                }
                                            ],
                                            "bypass": {
                                                "type": "Skip",
                                                "status": false
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    
	$scope.selfApproval = function () {
	    var config = {
	        type: "confirm",
	        message: "<p class='left-align'>Your all levels will get removed & document will get self approved. Are you sure you want to proceed?</p>",
	        buttons: [
            {
                "title": "YES",
                "result": "true"
            },
            {
                "title": "NO",
                "result": "false"
            }
	        ]
	    }

	    notification.notify(config, function (result) {
	        if (result.result == "true") {
	            $scope.selectedForApproval = [];
	        } else {
	            $scope.currentlySelected = { "tabName": "Users" };
	        }
	    });
	}
	$scope.sendForApprovalCall = function () {
	    var config = {
	        type: "success",
	        message: "<p class='center-align'>The Banket BPO-2016.000001 has been sent for approval</p>",
	        buttons: [
                {
                    "title": "OK",
                    "result": "ok"
                }
	        ]
	    }

	    notification.notify(config, function (result) {
	        if (result.result == "ok") {
	            $state.go("contract.new", { mode: "blanketdata" });
	        } 
	    });
	}


	$scope.levelApproval = function () {
	    //console.log($scope.approvalPathList);
	    //$scope.approvalPathList = [];
	    /*var list = notificationService.list();
	    while (list.length) { list.pop(); }
	    var approvalData = [], a, b = {
	        1: "st",
	        2: "nd",
	        3: "rd"
	    };
	    for (var i = 0; i < $scope.approvalPathList.length; i++) {
	        var obj = $scope.approvalPathList[i];
	        a = {};
	        a.ApprovalLevel = (i + 1) + (b[i + 1] ? b[i + 1] : 'th') + ' Level';
	        a.typee = obj.team.length > 1 ? "Parallel" : "Pool";
	        a.Approvers = obj.team.length > 1 ? (obj.team[0].name + " + " + (obj.team.length - 1) + " More") : obj.team[0].name;
	        notificationService.save(a);
	    };*/
	    //$state.go('catalog.admincatalog.new');

	    if ($scope.mode == 'AdminCatalogApproval') {
	        shareWithCtrl.data.value = $scope.approvalPathList;
	        $state.go('catalog.admincatalog.new');
	    }
	    else if ($scope.mode == 'AdminContractApproval') {
	        shareWithCtrl.data.value = $scope.approvalPathList;
	        $state.go('contract.manageLine');
	    }
	};

	$scope.tabClickedCallback = function (tab) {
	    var tabs = $scope.approvalPathList.trackStatusTabs;
	    $scope.approvalPathList.data = "";
	    for (var i = 0; i < tabs.length; i++) {
	        var tData = tabs[i];
	        tData.contentUrl = "";
	        if (tab.title == tData.title) {
	            tData.active = true;
	        } else {
	            tData.active = false;
	        }
	    }
	    trackStatusService.dataChange();
	}

}