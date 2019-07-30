'use strict';
angular.module('SMART2')

.controller('p2pCreditMemoCtrl', ['$scope', '$http', '$filter', p2pCreditMemoCtrlFunc])
.controller('itemDetailCreditMemoCtrl', 'notification', ['$scope', itemDetailCreditMemoCtrlFunc])

function p2pCreditMemoCtrlFunc($scope, $http, $filter) {

	$scope.commentsPopupUrl = "p2p/creditMemo/views/commentsPopup.html";
	$scope.showCommentsPopup = false;
	$scope.showCommentsPopupCallback = function () {
		$scope.showCommentsPopup = true;
	};
	$scope.commentsPopupOnHideCallback = function () {
		$scope.showCommentsPopup = false;
	};
	
	$scope.topValueSectionTrack = 115;
	var creditMemo = {
		method: 'GET',
		url: 'p2p/creditMemo/models/createCreditMemo.json'
	};

	$http(creditMemo).then(function (response) {
		$scope.dataModel = response.data.dataModel;
		$scope.config = response.data.formConfig;
		$scope.$watch('dataModel', function (n, o) {
		}, true);
	}, function (error) {
		console.log(JSON.stringify(error));
	});

	$scope.dropDownConfig = {
		inDuration: 300,
		outDuration: 225,
		constrain_width: false, // Does not change width of dropdown to that of the activator
		hover: false, // Activate on hover
		gutter: 0, // Spacing from edge
		belowOrigin: false, // Displays dropdown below the button
		alignment: 'left' // Displays dropdown with edge aligned to the left of button
	};

    /* tax popover */
	$scope.taxConfig =
        [
        {
            "dataName": "Requisition Value",
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
        ];

	$scope.getTotalTax = function () {
	    var count = 0;
	    angular.forEach($scope.taxConfig, function (taxValue) {

	        count += parseInt(taxValue.dataValue)

	    });

	    return count;

	};

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

    // POPUP -- comments 
	$scope.commentIcon = '#icon_Comments'; //icon_Commented
	$scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

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


    //comment popup.
};

function itemDetailCreditMemoCtrlFunc($scope, notification) {

    /********/
    /*current for tax poup start*/

    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function (e) {
        $scope.showTaxesPopup = true;
    };
    $scope.taxesPopUpOnHideCallback = function () {
        $scope.showTaxesPopup = false;
    };


    $scope.taxList = {
        'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [
                { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false },
               { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false },
                { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false },
               { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false }

    ];

    $scope.addCurrent = function () {

        if ($scope.taxList.taxCode != '') {

            $scope.taxesDetailLists.push($scope.taxList);

            $scope.taxList = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };

        }

    }

    $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };

    $scope.taxfocus = false;

    $scope.delCurrent = function (current) {
        var confi = {
            type: "warning",
            message: "<p class='left-align'>Are you Sure for Delete Current Item </p>",
            buttons: [
            {
                "title": "YES",
                "result": "yes"
            },
            {
                "title": "NO",
                "result": "no"
            }
            ]
        };

        var confi_2 = {
            type: "success",
            message: "<p class='left-align'>Item deleted Successfully </p>",
            buttons: [
            {
                "title": "Ok",
            }
            ]
        };

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                notification.notify(confi_2, function (response) {
                });
            }
        });
    };




    $scope.editCurrent = function (current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        $scope.updatedCurrentTax.taxCode = getcurrentTaxValue.taxCode;
        $scope.updatedCurrentTax.taxDetail = getcurrentTaxValue.taxDetail;
        $scope.updatedCurrentTax.taxRate = getcurrentTaxValue.taxRate;


    };

    $scope.updatedEdited = function (current) {
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        if ($scope.updatedCurrentTax.taxCode != '') {
            getcurrentTaxValue.taxCode = $scope.updatedCurrentTax.taxCode;
            getcurrentTaxValue.taxDetail = $scope.updatedCurrentTax.taxDetail;
            getcurrentTaxValue.taxRate = $scope.updatedCurrentTax.taxRate;
            $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
            $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
        }
    };


    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
    }



    /*current for tax poup end*/

	$scope.selectedtemplate = function (current) {
		$scope.$emit('showTemplate', { showTemp: current });
	}

	$scope.ngModel = $scope.ngModel.data;

	$scope.itemDetailCreditMemoMaterialTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/creditMemo/views/itemDetail-mat-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/creditMemo/views/itemDetail-mat-accTab.html" }
	];

	$scope.itemDetailCreditMemoServiceTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/inv/views/itemDetail-serv-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/inv/views/itemDetail-serv-accTab.html" }
	];

	$scope.importLineItemsTabDataset = [
		{ "title": "Requisition", "contentUrl": "p2p/inv/views/importLineItemsReqTab.html", "active": true },
		{ "title": "Templates", "contentUrl": "p2p/inv/views/importLineItemsTemplTab.html" }
	];


	/*
	$scope.onChange = function (isChecked) {
	    if (isChecked == true) {
	       
	    }
	    else {

	    }
	};
    */

	$scope.isTemplateSelected = [];
	$scope.templateLists =
        [{ 'title': 'TEMPLATE 1', 'isChecked': false },
            { 'title': 'TEMPLATE 2', 'isChecked': false },
            { 'title': 'TEMPLATE 3', 'isChecked': false }
        ];


	$scope.taxesPopupUrl = "p2p/shared/views/taxesPopup.html";
	$scope.categoryPopupUrl = "p2p/req/views/categoryPopup.html";
	$scope.commentsPopupUrl = "p2p/req/views/commentsPopup.html";
	$scope.copyPopupUrl = "p2p/req/views/copyLineDetailsPopup.html";
	$scope.attachmentPopUpUrl = "p2p/req/views/attachmentPopup.html";
	$scope.approverPopupUrl = "shared/popup/views/popupApprover.html";
	$scope.shipToPopupUrl = "p2p/req/views/shipToPopup.html";

	$scope.showTaxesPopup = false;
	$scope.showTaxesPopupCallback = function (e) {
		$scope.showTaxesPopup = true;
	};
	$scope.taxesPopUpOnHideCallback = function () {
		$scope.showTaxesPopup = false;
	};


	$scope.showCategoryPopup = false;
	$scope.showCategoryPopupCallback = function (e) {
		$scope.showCategoryPopup = true;
	};
	$scope.categoryPopUpOnHideCallback = function () {
		$scope.showCategoryPopup = false;
	};

	$scope.showCommentsPopup = false;
	$scope.attPopUp = false;
	$scope.showCommentsPopupCallback = function (e) {
		$scope.showCommentsPopup = true;
	};
	$scope.commentsPopUpOnHideCallback = function (e) {
		$scope.showCommentsPopup = false;
	};


	$scope.attachmentPopUp = function (e) {
		$scope.attPopUp = true;
	};
	$scope.attachmentPopUpClose = function (e) {
		$scope.attPopUp = false;
		$scope.attPopUp = false;
		$scope.showCommentsPopup = true;
	};

	$scope.showCopyPopup = false;
	$scope.showCopyPopupCallback = function (e) {
		$scope.showCopyPopup = true;
	};
	$scope.copyPopupOnHideCallback = function (e) {
		$scope.showCopyPopup = false;
	};

	$scope.showLocationPopup = false;
	$scope.showLocationPopupFn = function () {
		$scope.showLocationPopup = true;
	};
	$scope.showLocationPopupClBack = function () {
		$scope.showLocationPopup = false;
	};

	$scope.$watch('ngModel.selectedOption.key', function (newVal) { });

	//Approver Popup

	$scope.approverPopup = false;
	$scope.approverPopupCallback = function (e) {
		$scope.approverPopup = true;
	};
	$scope.approverOnHideCallback = function () {
		$scope.approverPopup = false;
	};

	$scope.addApprovers = [
       { name: 'John', "selected": false },
	   { name: 'Jessie' },
	   { name: 'Johanna' },
	   { name: 'Joy', "selected": false },
	   { name: 'Mary' },
	   { name: 'Peter' },
	   { name: 'Sebastian', },
	   { name: 'Erika' },
	   { name: 'Patrick' },
	   { name: 'Samantha' }
	];

	$scope.approvers = [
	   { name: 'John' },
	   { name: 'Jessie' },
	   { name: 'Johanna' },
	   { name: 'Joy' },
	   { name: 'Mary' },
	   { name: 'Peter' },
	   { name: 'Sebastian', },
	   { name: 'Erika' },
	   { name: 'Patrick' },
	   { name: 'Samantha' }
	];
	$scope.shwMore = false;
	$scope.WrapHeight = '130px';

	$scope.collapsUser = function () {
		$scope.shwMore = !$scope.shwMore;
		$scope.WrapHeight = '300px';
	}
	$scope.selectedAll = false;
	$scope.checkAll1 = function ($event) {
		$scope.selectedAll = !$scope.selectedAll;
		angular.forEach($scope.approvers, function (item) {
			item.selected = $scope.selectedAll;
		});
		$event.preventDefault();
	};
	$scope.contractExpiry = new Date();
	$scope.focusSearch = false;
	$scope.isActive = false;
	$scope.showMe = false;
	$scope.showSearch = function () {
		$scope.isActive = true;
		$scope.focusSearch = true;
		$scope.showMe = true;
		$scope.hideClose = true;
	}

	$scope.hideSearch = function () {
		$scope.isActive = false;
		$scope.focusSearch = false;
		$scope.hideClose = false;
	}

	$scope.treeSearchModel = "";
	$scope.stateBasedTitle = "ADD CATEGORY";

	$scope.manufatureDetails = "p2p/req/views/popupManufacturerDetails.html";
	$scope.manufatureDetailsPopup = false;
	$scope.manufatureDetailsCallback = function (e) {
		$scope.manufatureDetailsPopup = true;
	};
	$scope.manufatureDetailsPopupHideCallback = function (e) {
		$scope.manufatureDetailsPopup = false;
	};

	//express list grid Data

	$scope.expressLists = [
        { itemNumber: 'dell', name: '-', actionIconDelete: true },
        { itemNumber: 'Sumsung', name: '-', actionIconDelete: true },
        { itemNumber: 'Lenovo', name: '-', actionIconDelete: true },
        { itemNumber: 'Sumsung', name: '-', actionIconDelete: true },
        { itemNumber: 'dell', name: '-', actionIconDelete: true },
        { itemNumber: 'Lenovo', name: '-', actionIconDelete: true },
        { itemNumber: 'Sumsung', name: '-', actionIconDelete: true, actionIconAdd: true }
	];

	// express list grid Data -- remove the row specified in index
	$scope.removeRow = function (index) {
		// remove the row specified in index
		$scope.expressLists.splice(index, 1);
		// if no rows left in the array create a blank array
		if ($scope.expressLists.length === 0) {
			$scope.expressLists = [];
		}

		// remove the row specified in index
		$scope.splitList.splice(index, 1);
		// if no rows left in the array create a blank array
		if ($scope.splitList.length === 0) {
			$scope.splitList = [];
		}
	};

	//add a row in the array
	$scope.addRow = function () {
		$scope.expressLists[$scope.expressLists.length - 1].actionIconAdd = false;
		$scope.expressLists.push({ itemNumber: 'Lenovo', actionIconAdd: true });

		var count = $scope.splitList.length + 1;
		$scope.splitList.push({ splitNumber: count, splitValue: '00', actionIconDelete: true });
	};


	$scope.splitPopupUrl = "p2p/req/views/popupSplit.html";
	$scope.splitPopupPopup = false;
	$scope.splitPopupCallback = function (e) {
		$scope.splitPopupPopup = true;
	};
	$scope.splitPopupPopupHideCallback = function (e) {
		$scope.splitPopupPopup = false;
	};
	$scope.splitList = [
        { splitNumber: '1', splitValue: '20', actionIconDelete: true },
        { splitNumber: '2', splitValue: '20', actionIconDelete: true },
        { splitNumber: '3', splitValue: '20', actionIconDelete: true },
        { splitNumber: '4', splitValue: '20', actionIconDelete: true },
        { splitNumber: '5', splitValue: '20', actionIconDelete: true }
	];
	$scope.splitType = [{ title: 'Number' }, { title: 'Percentage' }];
	$scope.selectedSplit = { title: 'Number' };
	$scope.splitFlag = true;
	$scope.onChangeSplit = function (selectedSplit) {
		if (selectedSplit.title == 'Number') {
			$scope.splitFlag = true;
		}
		else if (selectedSplit.title == 'Percentage') {
			$scope.splitFlag = false;
		}
	}
	//translate
	//$scope.okBtnConfig = { title: $translate.instant("OK") };
	//$scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };
	//$scope.compareBtnConfig = { title: $translate.instant("COMPARE") };
	//$scope.applyBtnConfig = { title: $translate.instant("APPLY") };
	//$scope.addBtnConfig = { title: $translate.instant("ADD") };
	//$scope.createReqBtnConfig = { title: $translate.instant("CREATE REQUISITION") };
	//$scope.createOrderBtnConfig = { title: $translate.instant("CREATE ORDER") };
	//$scope.addToCartBtnConfig = { title: $translate.instant("ADD TO CART") };
	//$scope.contitueShoppingBtnConfig = { title: $translate.instant("CONTINUE SHOPPING") };

	$scope.gridOptionsAccounting = {
		"data": [{
			"isTaxExempt": false,
			"status": 1,
			"splitType": 0,
			"id": 21559,
			"lineNumber": 11,
			"documentCode": 21193,
			"p2PLineItemId": 202239,
			"catalogItemId": 42,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 6,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": 0,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-22T08:38:51.073Z",
			"lastModifiedOn": "2016-04-26T03:24:21.370Z",
			"contractExpiryDate": "2015-01-16T18:30:00.000Z",
			"name": "dfg",
			"imageURL": null,
			"buyerItemNumber": "BIN-000023",
			"description": "dfg",
			"manufacturer": null,
			"contractNumber": "2015.000009",
			"partnerItemNumber": "sdfsd",
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 5,
				"name": "PFM_CMN_None"
			},
			"partner": {
				"id": 6349,
				"name": "CTPG OPERATING LLC            "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2596,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-21T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": false,
			"deliverTo": null,
			"partnerCode": "09798",
			"splits": [{
				"id": 23575,
				"documentCode": 21193,
				"documentItemId": 21559,
				"quantity": 1,
				"createdOn": "2016-04-22T08:38:54.167Z",
				"lastModifiedOn": "2016-04-26T03:20:42.250Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21559,
				"lineNumber": 1,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "BIN-000023",
				"description": "dfg",
				"splitType": 0,
				"itemQuantity": 1,
				"unitPrice": 6,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KJ"
			}],
			"$$hashKey": "uiGrid-0012"
		}, {
			"isTaxExempt": false,
			"status": 1,
			"splitType": 0,
			"id": 21560,
			"lineNumber": 2,
			"documentCode": 21193,
			"p2PLineItemId": 202240,
			"catalogItemId": 41,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 234,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": 0,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-22T08:38:51.107Z",
			"lastModifiedOn": "2016-04-26T03:22:41.207Z",
			"contractExpiryDate": "2015-01-16T18:30:00.000Z",
			"name": "Dell Laptop",
			"imageURL": null,
			"buyerItemNumber": "BIN-000001",
			"description": "Dell Laptop",
			"manufacturer": null,
			"contractNumber": "2015.000009",
			"partnerItemNumber": "sdf",
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 5,
				"name": "PFM_CMN_None"
			},
			"partner": {
				"id": 6349,
				"name": "CTPG OPERATING LLC            "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2597,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-21T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": false,
			"deliverTo": null,
			"partnerCode": "09798",
			"splits": [{
				"id": 23576,
				"documentCode": 21193,
				"documentItemId": 21560,
				"quantity": 1,
				"createdOn": "2016-04-22T08:38:54.167Z",
				"lastModifiedOn": "2016-04-22T08:38:54.167Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21560,
				"lineNumber": 2,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "BIN-000001",
				"description": "Dell Laptop",
				"splitType": 0,
				"itemQuantity": 1,
				"unitPrice": 234,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KL"
			}],
			"$$hashKey": "uiGrid-0014"
		}, {
			"isTaxExempt": false,
			"status": 0,
			"splitType": 0,
			"id": 21571,
			"lineNumber": 3,
			"documentCode": 21193,
			"p2PLineItemId": 202253,
			"catalogItemId": 0,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 111,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": null,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-26T03:19:48.983Z",
			"lastModifiedOn": "2016-04-26T03:21:01.790Z",
			"contractExpiryDate": null,
			"name": "1",
			"imageURL": null,
			"buyerItemNumber": "1",
			"description": "1",
			"manufacturer": null,
			"contractNumber": null,
			"partnerItemNumber": null,
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 1,
				"name": "P2P_REQ_Manual"
			},
			"partner": {
				"id": 6347,
				"name": "OFFICEMAX NORTH AMERICA INC   "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2607,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-25T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": null,
			"deliverTo": null,
			"partnerCode": "00703",
			"splits": [{
				"id": 23587,
				"documentCode": 21193,
				"documentItemId": 21571,
				"quantity": 1,
				"createdOn": "2016-04-26T03:19:51.777Z",
				"lastModifiedOn": "2016-04-26T03:19:51.777Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21571,
				"lineNumber": 3,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "1",
				"description": "1",
				"splitType": 0,
				"itemQuantity": 1,
				"unitPrice": 111,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KN"
			}],
			"$$hashKey": "uiGrid-0016"
		}, {
			"isTaxExempt": false,
			"status": 0,
			"splitType": 0,
			"id": 21572,
			"lineNumber": 4,
			"documentCode": 21193,
			"p2PLineItemId": 202254,
			"catalogItemId": 0,
			"taxes": 0,
			"quantity": 10,
			"unitPrice": 100,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": null,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-26T03:21:21.390Z",
			"lastModifiedOn": "2016-04-26T03:22:08.147Z",
			"contractExpiryDate": null,
			"name": "11",
			"imageURL": null,
			"buyerItemNumber": "11",
			"description": "11",
			"manufacturer": null,
			"contractNumber": null,
			"partnerItemNumber": "456",
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 1,
				"name": "P2P_REQ_Manual"
			},
			"partner": {
				"id": 6348,
				"name": "RUUD LIGHTING INC             "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2608,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-25T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": null,
			"deliverTo": null,
			"partnerCode": "09282",
			"splits": [{
				"id": 23588,
				"documentCode": 21193,
				"documentItemId": 21572,
				"quantity": 10,
				"createdOn": "2016-04-26T03:21:24.260Z",
				"lastModifiedOn": "2016-04-26T03:21:56.773Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21572,
				"lineNumber": 4,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "11",
				"description": "11",
				"splitType": 0,
				"itemQuantity": 10,
				"unitPrice": 100,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KP"
			}],
			"$$hashKey": "uiGrid-0018"
		}],
		"enableFiltering": true,
		"enablePinning": false,
		"enableCellEditOnFocus": true,
		"showTreeExpandNoChildren": true,
		"rowHeight": 50,
		"columnDefs": [{
			"field": "lineNumber",
			"width": 150,
			"displayName": "Line Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "lineNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"field": "buyerItemNumber",
			"width": 150,
			"displayName": "Item Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "buyerItemNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		}, {
			"field": "description",
			"width": 150,
			"displayName": "Description",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "description",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		}, {
			"field": "splitType",
			"width": 150,
			"displayName": "Split",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			//			"cellTemplate": "<div title=\"{{COL_FIELD}}\" ng-click=\"grid.appScope.showSplitsPopup(row.entity)\"><a class=\"dropdown-button\">{{grid.appScope.splitType(row.entity.splitType)}}</a></div>",
			"cellTemplate": "<smart-button config=\"{'title':'Splits','allignRight':'false'}\" flat='true'></smart-button>",
			"cellTooltip": true,
			"name": "splitType",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"field": "splitNumber",
			"width": 150,
			"displayName": "Split Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTooltip": true,
			"name": "splitNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"field": "quantity",
			"width": 150,
			"displayName": "Quantity",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTooltip": true,
			"name": "quantity",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"name": "splitValue",
			"width": 150,
			"displayName": "Split Value",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{COL_FIELD}}\">{{grid.appScope.getSplitValue(row.entity)}}</div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"name": "taxes",
			"width": 150,
			"displayName": "Taxes",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{COL_FIELD}}\"><smart-button flat=\"true\" config='{\"title\":row.entity.taxes}' callback-params=\"row.entity\"} callback=\"grid.appScope.openTaxPopup\"></smart-button><div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"name": "total",
			"width": 150,
			"displayName": "Total Split Value",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{grid.appScope.getTotal(row.entity)}}\">{{grid.appScope.getTotal(row.entity)}}</div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Requester",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={name} filterkeys=name options=\"grid.appScope.undefined\" on-change=\"grid.appScope.undefined\" on-select=\"grid.appScope.undefined\" ng-model=\"row.entity.requester\" uigrid-compatible></smart-textfield></div></div>",
			"name": "requester.name",
			"serverConfig": {
				"label": "P2P_REQ_Requester",
				"type": "textfield",
				"sort": 1,
				"isMandatory": true,
				"data": "requester",
				"colspan": 1,
				"attributes": {
					"readonly": true,
					"filterkeys": ["name"],
					"optionformat": "{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Department",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 10)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.department)\" ng-model=\"row.entity.department\" uigrid-compatible></smart-textfield></div></div>",
			"name": "department.name",
			"serverConfig": {
				"label": "P2P_REQ_Department",
				"type": "textfield",
				"sort": 2,
				"isMandatory": true,
				"data": "department",
				"onSelect": "onSelectDelValueAttr(row.entity.department)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 10)",
				"attributes": {
					"readonly": true,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Business Unit",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 7)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.bu)\" ng-model=\"row.entity.bu\" uigrid-compatible></smart-textfield></div></div>",
			"name": "bu.name",
			"serverConfig": {
				"label": "P2P_Req_BU",
				"type": "textfield",
				"sort": 3,
				"isMandatory": false,
				"data": "bu",
				"onSelect": "onSelectDelValueAttr(row.entity.bu)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 7)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Account Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 8)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.account)\" ng-model=\"row.entity.account\" uigrid-compatible></smart-textfield></div></div>",
			"name": "account.name",
			"serverConfig": {
				"label": "P2P_Req_Account",
				"type": "textfield",
				"sort": 4,
				"isMandatory": false,
				"data": "account",
				"onSelect": "onSelectDelValueAttr(row.entity.account)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 8)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Project ID",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 9)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.project)\" ng-model=\"row.entity.project\" uigrid-compatible></smart-textfield></div></div>",
			"name": "project.name",
			"serverConfig": {
				"label": "P2P_Req_Project",
				"type": "textfield",
				"sort": 5,
				"isMandatory": false,
				"data": "project",
				"onSelect": "onSelectDelValueAttr(row.entity.project)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 9)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}],
		"excludeProperties": ["$$hashKey"],
		"enableRowHashing": true,
		"flatEntityAccess": false,
		"showHeader": true,
		"headerRowHeight": 30,
		"minRowsToShow": 10,
		"showGridFooter": false,
		"showColumnFooter": false,
		"columnFooterHeight": 30,
		"gridFooterHeight": 30,
		"columnWidth": 50,
		"maxVisibleColumnCount": 200,
		"virtualizationThreshold": 20,
		"columnVirtualizationThreshold": 10,
		"excessRows": 4,
		"scrollThreshold": 4,
		"excessColumns": 4,
		"horizontalScrollThreshold": 2,
		"aggregationCalcThrottle": 500,
		"wheelScrollThrottle": 70,
		"scrollDebounce": 300,
		"enableSorting": true,
		"enableColumnMenus": true,
		"enableVerticalScrollbar": 1,
		"enableHorizontalScrollbar": 1,
		"enableMinHeightCheck": true,
		"minimumColumnSize": 10,
		"headerTemplate": null,
		"footerTemplate": "ui-grid/ui-grid-footer",
		"gridFooterTemplate": "ui-grid/ui-grid-grid-footer",
		"rowTemplate": "ui-grid/ui-grid-row",
		"appScopeProvider": null,
		"cellEditableCondition": true,
		"enableColumnMoving": true,
		"enableColumnResizing": true,
		"enableRowSelection": true,
		"multiSelect": true,
		"noUnselect": false,
		"modifierKeysToMultiSelect": false,
		"enableRowHeaderSelection": true,
		"enableFullRowSelection": false,
		"enableSelectAll": true,
		"enableSelectionBatchEvent": true,
		"selectionRowHeaderWidth": 30,
		"enableFooterTotalSelected": true,
		"modifierKeysToMultiSelectCells": false
	};

	//Item Details Grid
	$scope.gridOptionsItem = {
		"data": [{
			"isTaxExempt": false,
			"status": 1,
			"splitType": 0,
			"id": 21559,
			"lineNumber": 11,
			"documentCode": 21193,
			"p2PLineItemId": 202239,
			"catalogItemId": 42,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 6,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": 0,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-22T08:38:51.073Z",
			"lastModifiedOn": "2016-04-26T03:24:21.370Z",
			"contractExpiryDate": "2015-01-16T18:30:00.000Z",
			"name": "dfg",
			"imageURL": null,
			"buyerItemNumber": "BIN-000023",
			"description": "dfg",
			"manufacturer": null,
			"contractNumber": "2015.000009",
			"partnerItemNumber": "sdfsd",
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 5,
				"name": "PFM_CMN_None"
			},
			"partner": {
				"id": 6349,
				"name": "CTPG OPERATING LLC            "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2596,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-21T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": false,
			"deliverTo": null,
			"partnerCode": "09798",
			"splits": [{
				"id": 23575,
				"documentCode": 21193,
				"documentItemId": 21559,
				"quantity": 1,
				"createdOn": "2016-04-22T08:38:54.167Z",
				"lastModifiedOn": "2016-04-26T03:20:42.250Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21559,
				"lineNumber": 1,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "BIN-000023",
				"description": "dfg",
				"supplierName": "Supplier Name",
				"itemQuantity": 1,
				"unitPrice": 6,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KJ"
			}],
			"$$hashKey": "uiGrid-0012"
		}, {
			"isTaxExempt": false,
			"status": 1,
			"splitType": 0,
			"id": 21560,
			"lineNumber": 2,
			"documentCode": 21193,
			"p2PLineItemId": 202240,
			"catalogItemId": 41,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 234,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": 0,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-22T08:38:51.107Z",
			"lastModifiedOn": "2016-04-26T03:22:41.207Z",
			"contractExpiryDate": "2015-01-16T18:30:00.000Z",
			"name": "Dell Laptop",
			"imageURL": null,
			"buyerItemNumber": "BIN-000001",
			"description": "Dell Laptop",
			"manufacturer": null,
			"contractNumber": "2015.000009",
			"partnerItemNumber": "sdf",
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 5,
				"name": "PFM_CMN_None"
			},
			"partner": {
				"id": 6349,
				"name": "CTPG OPERATING LLC            "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2597,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-21T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": false,
			"deliverTo": null,
			"partnerCode": "09798",
			"splits": [{
				"id": 23576,
				"documentCode": 21193,
				"documentItemId": 21560,
				"quantity": 1,
				"createdOn": "2016-04-22T08:38:54.167Z",
				"lastModifiedOn": "2016-04-22T08:38:54.167Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21560,
				"lineNumber": 2,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "BIN-000001",
				"description": "Dell Laptop",
				"supplierName": "Supplier Name",
				"itemQuantity": 1,
				"unitPrice": 234,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KL"
			}],
			"$$hashKey": "uiGrid-0014"
		}, {
			"isTaxExempt": false,
			"status": 0,
			"splitType": 0,
			"id": 21571,
			"lineNumber": 3,
			"documentCode": 21193,
			"p2PLineItemId": 202253,
			"catalogItemId": 0,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 111,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": null,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-26T03:19:48.983Z",
			"lastModifiedOn": "2016-04-26T03:21:01.790Z",
			"contractExpiryDate": null,
			"name": "1",
			"imageURL": null,
			"buyerItemNumber": "1",
			"description": "1",
			"manufacturer": null,
			"contractNumber": null,
			"partnerItemNumber": null,
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 1,
				"name": "P2P_REQ_Manual"
			},
			"partner": {
				"id": 6347,
				"name": "OFFICEMAX NORTH AMERICA INC   "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2607,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-25T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": null,
			"deliverTo": null,
			"partnerCode": "00703",
			"splits": [{
				"id": 23587,
				"documentCode": 21193,
				"documentItemId": 21571,
				"quantity": 1,
				"createdOn": "2016-04-26T03:19:51.777Z",
				"lastModifiedOn": "2016-04-26T03:19:51.777Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21571,
				"lineNumber": 3,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "1",
				"description": "1",
				"supplierName": "Supplier Name",
				"itemQuantity": 1,
				"unitPrice": 111,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KN"
			}],
			"$$hashKey": "uiGrid-0016"
		}, {
			"isTaxExempt": false,
			"status": 0,
			"splitType": 0,
			"id": 21572,
			"lineNumber": 4,
			"documentCode": 21193,
			"p2PLineItemId": 202254,
			"catalogItemId": 0,
			"taxes": 0,
			"quantity": 10,
			"unitPrice": 100,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": null,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-26T03:21:21.390Z",
			"lastModifiedOn": "2016-04-26T03:22:08.147Z",
			"contractExpiryDate": null,
			"name": "11",
			"imageURL": null,
			"buyerItemNumber": "11",
			"description": "11",
			"manufacturer": null,
			"contractNumber": null,
			"partnerItemNumber": "456",
			"manufacturerPartNumber": null,
			"supplierPartAuxiliaryId": null,
			"type": {
				"id": 1,
				"name": "P2P_REQ_Material",
				"key": "Material"
			},
			"uom": {
				"code": "EA",
				"name": "Each"
			},
			"source": {
				"id": 1,
				"name": "P2P_REQ_Manual"
			},
			"partner": {
				"id": 6348,
				"name": "RUUD LIGHTING INC             "
			},
			"category": {
				"id": 631550000849,
				"name": "BUSINESS TRAVEL"
			},
			"contract": null,
			"createdBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"lastModifiedBy": {
				"id": 63150040000001,
				"name": "RiteAid Admin"
			},
			"notes": null,
			"taxItems": [{
				"taxId": 2,
				"id": 2608,
				"percent": 8.213,
				"code": "TAX00001",
				"description": "Octroi tax",
				"type": {
					"id": 4,
					"name": "CMN_City"
				}
			}],
			"isProcurable": 0,
			"orderedQuantity": null,
			"needByDate": "2016-04-29T18:30:00.000Z",
			"requestedDate": "2016-04-25T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": null,
			"deliverTo": null,
			"partnerCode": "09282",
			"splits": [{
				"id": 23588,
				"documentCode": 21193,
				"documentItemId": 21572,
				"quantity": 10,
				"createdOn": "2016-04-26T03:21:24.260Z",
				"lastModifiedOn": "2016-04-26T03:21:56.773Z",
				"createdBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"lastModifiedBy": {
					"id": 63150040000001,
					"name": "RiteAid Admin"
				},
				"requester": {
					"code": "63150040000001",
					"name": "RiteAid Admin"
				},
				"bu": {
					"code": "19686403",
					"name": "RITE AID MID-ATLANTIC CSC"
				},
				"account": {
					"code": "19695611",
					"name": "RX SALES-TRADE"
				},
				"project": {
					"code": "0",
					"name": ""
				},
				"department": {
					"code": "19686386",
					"name": "Rite Aid HQ Corporation"
				},
				"lineId": 21572,
				"lineNumber": 4,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "11",
				"description": "11",
				"supplierName": "Supplier Name",
				"itemQuantity": 10,
				"unitPrice": 100,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KP"
			}],
			"$$hashKey": "uiGrid-0018"
		}],
		"enableFiltering": true,
		"enablePinning": false,
		"enableCellEditOnFocus": true,
		"showTreeExpandNoChildren": true,
		"rowHeight": 50,
		"columnDefs": [{
			"field": "lineNumber",
			"width": 150,
			"displayName": "Line Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "lineNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"field": "buyerItemNumber",
			"width": 150,
			"displayName": "Line Type",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "buyerItemNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		}, {
			"field": "description",
			"width": 150,
			"displayName": "Item Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "description",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		},
		, {
			"field": "description",
			"width": 150,
			"displayName": "Description",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "description",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		},
		{
			"field": "supplierName",
			"width": 150,
			"displayName": "Supplier Name",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			//			"cellTemplate": "<div title=\"{{COL_FIELD}}\" ng-click=\"grid.appScope.showSplitsPopup(row.entity)\"><a class=\"dropdown-button\">{{grid.appScope.splitType(row.entity.splitType)}}</a></div>",
			"cellTooltip": true,
			"name": "splitType",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		}, {
			"field": "splitNumber",
			"width": 150,
			"displayName": "Supplier Item Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTooltip": true,
			"name": "splitNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"field": "quantity",
			"width": 150,
			"displayName": "Category",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTooltip": true,
			"name": "quantity",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"name": "splitValue",
			"width": 150,
			"displayName": "Quantity",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{COL_FIELD}}\">{{grid.appScope.getSplitValue(row.entity)}}</div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"name": "taxes",
			"width": 150,
			"displayName": "UOM",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{COL_FIELD}}\"><smart-button flat=\"true\" config='{\"title\":row.entity.taxes}' callback-params=\"row.entity\"} callback=\"grid.appScope.openTaxPopup\"></smart-button><div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"name": "total",
			"width": 150,
			"displayName": "Start Date",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{grid.appScope.getTotal(row.entity)}}\">{{grid.appScope.getTotal(row.entity)}}</div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "End Date",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={name} filterkeys=name options=\"grid.appScope.undefined\" on-change=\"grid.appScope.undefined\" on-select=\"grid.appScope.undefined\" ng-model=\"row.entity.requester\" uigrid-compatible></smart-textfield></div></div>",
			"name": "requester.name",
			"serverConfig": {
				"label": "P2P_REQ_Requester",
				"type": "textfield",
				"sort": 1,
				"isMandatory": true,
				"data": "requester",
				"colspan": 1,
				"attributes": {
					"readonly": true,
					"filterkeys": ["name"],
					"optionformat": "{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Unit Price",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 10)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.department)\" ng-model=\"row.entity.department\" uigrid-compatible></smart-textfield></div></div>",
			"name": "department.name",
			"serverConfig": {
				"label": "P2P_REQ_Department",
				"type": "textfield",
				"sort": 2,
				"isMandatory": true,
				"data": "department",
				"onSelect": "onSelectDelValueAttr(row.entity.department)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 10)",
				"attributes": {
					"readonly": true,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Line Total",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 7)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.bu)\" ng-model=\"row.entity.bu\" uigrid-compatible></smart-textfield></div></div>",
			"name": "bu.name",
			"serverConfig": {
				"label": "P2P_Req_BU",
				"type": "textfield",
				"sort": 3,
				"isMandatory": false,
				"data": "bu",
				"onSelect": "onSelectDelValueAttr(row.entity.bu)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 7)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Taxes",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 8)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.account)\" ng-model=\"row.entity.account\" uigrid-compatible></smart-textfield></div></div>",
			"name": "account.name",
			"serverConfig": {
				"label": "P2P_Req_Account",
				"type": "textfield",
				"sort": 4,
				"isMandatory": false,
				"data": "account",
				"onSelect": "onSelectDelValueAttr(row.entity.account)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 8)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Other Charges",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 9)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.project)\" ng-model=\"row.entity.project\" uigrid-compatible></smart-textfield></div></div>",
			"name": "project.name",
			"serverConfig": {
				"label": "P2P_Req_Project",
				"type": "textfield",
				"sort": 5,
				"isMandatory": false,
				"data": "project",
				"onSelect": "onSelectDelValueAttr(row.entity.project)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 9)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}],
		"excludeProperties": ["$$hashKey"],
		"enableRowHashing": true,
		"flatEntityAccess": false,
		"showHeader": true,
		"headerRowHeight": 30,
		"minRowsToShow": 10,
		"showGridFooter": false,
		"showColumnFooter": false,
		"columnFooterHeight": 30,
		"gridFooterHeight": 30,
		"columnWidth": 50,
		"maxVisibleColumnCount": 200,
		"virtualizationThreshold": 20,
		"columnVirtualizationThreshold": 10,
		"excessRows": 4,
		"scrollThreshold": 4,
		"excessColumns": 4,
		"horizontalScrollThreshold": 2,
		"aggregationCalcThrottle": 500,
		"wheelScrollThrottle": 70,
		"scrollDebounce": 300,
		"enableSorting": true,
		"enableColumnMenus": true,
		"enableVerticalScrollbar": 1,
		"enableHorizontalScrollbar": 1,
		"enableMinHeightCheck": true,
		"minimumColumnSize": 10,
		"headerTemplate": null,
		"footerTemplate": "ui-grid/ui-grid-footer",
		"gridFooterTemplate": "ui-grid/ui-grid-grid-footer",
		"rowTemplate": "ui-grid/ui-grid-row",
		"appScopeProvider": null,
		"cellEditableCondition": true,
		"enableColumnMoving": true,
		"enableColumnResizing": true,
		"enableRowSelection": true,
		"multiSelect": true,
		"noUnselect": false,
		"modifierKeysToMultiSelect": false,
		"enableRowHeaderSelection": true,
		"enableFullRowSelection": false,
		"enableSelectAll": true,
		"enableSelectionBatchEvent": true,
		"selectionRowHeaderWidth": 30,
		"enableFooterTotalSelected": true,
		"modifierKeysToMultiSelectCells": false
	};
}