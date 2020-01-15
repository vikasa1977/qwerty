angular.module('SMART2')
    .controller('p2pRNoteCtrl', ['$scope', 'jsonToGrid', '$rootScope', 'RuleEngine', '$http', '$filter', '$state', 'notification', '$timeout', 'shareWithCtrl', 'lookup', p2pRNoteCtrlFunc])
	.controller('rNoteItemDetailCtrl', ['$scope', '$translate', 'notification', '$state', 'ScrollTo', '$sce', '$http', '$timeout', itemDetailRNoteCtrlFunc]);


function p2pRNoteCtrlFunc($scope, jsonToGrid, $rootScope, RuleEngine, $http, $filter, $state, notification, $timeout, shareWithCtrl, lookup) {
	$scope.topValueSectionTrack = 115;
	$scope.mode = $state.params.mode;
	if ($scope.mode == "createReceiptCorrection") {
	    $scope.title = "Receipt Correction";
	}
    else{
    $scope.title = "NEW RETURN NOTE";
    }


	
	var isSequenceToBeMaintained;
	$scope.typeaheadLabel = "Ship To";
	$scope.options = [
                        { "shipTo": "Mumbai", "shipToAdd": "7th Floor, Building 3 Plot # 3 TTC Industrial Area MIDC Thane Belapur Road Airoli Navi Mumbai 400 708" },
                        { "shipTo": "Hyderabad", "shipToAdd": "Western Pearl, 8th Floor Next to Google Building, Kondapur, Hitech-city Hyderabad 500084" },
                        { "shipTo": "Shanghai", "shipToAdd": "Cross Tower, #318 Fu Zhou Road,HuangPu District, Shanghai" },
                        { "shipTo": "Singapore", "shipToAdd": "89 Short Street, #B1-11 Golden Wall Centre, Singapore-188216" },
                        { "shipTo": "Sydney", "shipToAdd": "Australia Square 2000 NSW, Australia" },
                        { "shipTo": "London", "shipToAdd": "GEP, 22 Tudor Street, London, EC4Y 0AY" },
                        { "shipTo": "Prague", "shipToAdd": "Hradcanská Office Center Milady Horákové 116/109, Prague 6, 160 00 Czech Republic" },
	];
	$scope.selected = $scope.options[0];
	

	$scope.showLocationPopup = false;
	$scope.showLocationPopupFn = function () {
	    $scope.showLocationPopup = true;
	};
	$scope.showLocationPopupClBack = function () {
	    $scope.showLocationPopup = false;
	};

	$scope.taxConfig =
        [
        {
            "dataName": "Requisition Value",
            "dataValue": 678.00,
            "taxEditable": false,
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
            "taxEditable": true,
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

	/*
	 *  Service call get form-config and data-model
	 */

	var rnote = {
		method: 'GET',
		url: 'p2p/rnote/models/createRnote.json'
	};

	

	$http(rnote).then(function (response) {
		$scope.dataModel = response.data.dataModel;
		$scope.config = response.data.formConfig;

		$scope.RCorrectionData = $scope.config.sections[0].rows[0].properties;
		if ($scope.mode == 'createReceiptCorrection') {
		    $scope.RCorrectionData[0].label = 'Receipt Correction Name';
		    $scope.RCorrectionData[1].label = 'Receipt Correction Number';
		    $scope.RCorrectionData[2].label = 'Receipt Correction Status';
		}
		
		
		$scope.$watch('dataModel', function (n, o) {
			//console.log(n);
		}, true);
	}, function(error) {
		console.log(JSON.stringify(error));
	});

	

    // popup -- trackstatus
	$scope.trackStatusPopupUrl = "shared/popup/views/popupNewTrackStatus.html";
	$scope.trackStatusPopup = false;
	$scope.trackStatusPopupCallback = function (e) {
	    $scope.trackStatusPopup = true;
	};
	$scope.trackStatusOnHideCallback = function (e) {
	    $scope.trackStatusPopup = false;
	};
	$scope.showPreview = function (e) {
	    $state.go('p2p.rnote.preview');
	};

	$scope.isFinalize = false;
	$scope.finalizeCallback = function () {
	    $scope.isFinalize = true;
	}
	
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
	
	$scope.returnNoteOpts = [
                    {
                        "title": "Visible to Supplier"
                    },
                    {
                        "title": "Internal"
                    }
	];
	$scope.selectedNoteOption = {};

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
	$scope.heightTrackStatus = '230px';
	$scope.goToTracksatusDetail = function (e) {
	    $scope.heightTrackStatus = '100%';
	    $scope.isFullscreen = !$scope.isFullscreen;
	}
	$scope.showCommentsPopupexpand = "expandCommentPopupCC";
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
}

function itemDetailRNoteCtrlFunc($scope, $translate, notification, $state, ScrollTo, $sce, $http, $timeout) {


    /********/

    $scope.addLinesFormUrl = "p2p/rnote/views/popupAddLinesForm.html";

    $scope.addLinesFormPopUp = false;
    $scope.addLinesFormPopUpCallback = function (e) {
        $scope.addLinesFormPopUp = true;
    };
    $scope.addLinesFormPopUpClose = function (e) {
        $scope.addLinesFormPopUp = false;
    };

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

    //select All -- add lines from -- requisition tab
    $scope.fillpartial = false;
    $scope.reqCheckedAll = { 'check': false };
    $scope.checkAllReq = function (aug) {
        angular.forEach($scope.importFromReq, function (importFromReq, key) {
            $scope.importFromReq[key].isSelected = aug;
        });
        $scope.fillpartial = false;
        $scope.reqCheckedAll.check = aug;
    };
    $scope.reqChange = function (arg) {
        var importFromReqlength = $scope.importFromReq.length,
			incre,
			checkCounter = 0;
        for (incre = 0; incre < importFromReqlength; incre++) {
            if ($scope.importFromReq[incre].isSelected)
                checkCounter++;
        }
        $scope.fillpartial = true;
        if (checkCounter === 0) {
            $scope.fillpartial = false;
            $scope.reqCheckedAll.check = false;
        }
        else if (checkCounter === importFromReqlength) {
            $scope.fillpartial = false;
            $scope.reqCheckedAll.check = true;
        }
    };
    //select All -- add lines from -- template tab
    $scope.checkAllTemp = function (aug) {
        angular.forEach($scope.importFromTemp, function (importFromTemp, key) {
            $scope.importFromTemp[key].selected = aug;
        });
    };

    $scope.focusSearchT = false;
    $scope.isActiveT = false;
    $scope.showMeT = false;
    $scope.showSearchT = function () {
        $scope.isActiveT = true;
        $scope.focusSearchT = true;
        $scope.showMeT = true;
        $scope.hideCloseT = true;
    };

    $scope.hideSearchT = function () {
        $scope.isActiveT = false;
        $scope.focusSearchT = false;
        $scope.hideCloseT = false;
    };

    $scope.selectedTemp = { checkedAll: false };
    $scope.checkAllTemp = function (check) {
        $scope.fillpartial = false;
        if (check) {
            for (var i = 0; i < $scope.importFromTemp.length; i++) {
                $scope.importFromTemp[i].isSelected = true;
            }
        }
        else {
            for (var i = 0; i < $scope.importFromTemp.length; i++) {
                $scope.importFromTemp[i].isSelected = false;
            }
        }
    }
    $scope.checkTempChange = function (check) {
        $scope.countPricesheetList = 0;
        for (var i = 0; i < $scope.importFromTemp.length; i++) {
            if ($scope.importFromTemp[i].isSelected == true) {
                $scope.countPricesheetList++;
            }
        }
        $scope.fillpartial = true;
        if ($scope.countPricesheetList === 0) {
            $scope.fillpartial = false;
            $scope.selectedTemp.checkedAll = false;
        }
        else if ($scope.countPricesheetList === $scope.importFromTemp.length) {
            $scope.fillpartial = false;
            $scope.selectedTemp.checkedAll = true;
        }
        else {
            $scope.fillpartial = true;
        }

    }

    $scope.importLineItemsTabDataset = [
		{ "title": "REQUISITION", "contentUrl": "p2p/rnote/views/importLineItemsReqTab.html", "active": true, "id": 1 },
		{ "title": "TEMPLATES", "contentUrl": "p2p/rnote/views/importLineItemsTemplTab.html", "id": 2 }
    ];

    $scope.importFromReq = [
        {
            "Name": "Payment Term",
            "Number": "REQ-2016.000313",
            "showFlag": true,
            "isSelected": false,
            "countItem": "10",
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Legal Entity",
            "Number": "REQ-2016.000313",
            "countItem": "10",
            "showFlag": false,
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            }
            ]
        },
        {
            "Name": "shipping & freight",
            "Number": "REQ-2016.000313",
            "countItem": "10",
            "showFlag": true,
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            }
            ]

        }
    ];

    $scope.importFromTemp = [
        {
            "Name": "Payment Term Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Legal Entity Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Shipping & freight Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]

        }
    ];


    $scope.selectedTemplateData = [];
    //$scope.showReqTempCall = function (index) {
    //    $scope.selectedTemplateData = [];
    //    $scope.showReqTemp = true;
    //    $scope.slideObj = {
    //        list: $scope.selectedTemplateData,
    //        index: index,
    //        src: 'p2p/req/views/reqTemplatePopupContent.html'
    //    };
    //};
    //$scope.closeReqTempPopup = function () {
    //    $scope.showReqTemp = false;
    //}
    var currentTempList = $scope.importFromReq;
    $scope.tabChangeCall = function (obj) {
        if (obj.id == 1) {
            currentTempList = $scope.importFromReq;
        } else {
            currentTempList = $scope.importFromTemp;
        }
    }
    $scope.reqTemplateNextCall = function () {
        $scope.reqTempCount = 0;
        $scope.selectedTemplateData = [];
        for (var i = 0; i < currentTempList.length; i++) {
            if (currentTempList[i].isSelected == true) {
                $scope.selectedTemplateData.push(currentTempList[i]);
            }
        }
        if ($scope.selectedTemplateData.length > 0) {
            $scope.addLinesFormPopUp = false;
            $scope.showReqTempCall();

        }
    }
    $scope.showReqTemp = false;
    $scope.showReqTempCall = function () {
        $scope.showReqTemp = true;
        $scope.currentTemplateData = $scope.selectedTemplateData[0];
    }
    $scope.hideReqTempCallback = function (e) {
        $scope.showReqTemp = false;
    }
    $scope.reqTempCount = 0;
    $scope.prevReqTemp = function () {
        $scope.currentTemplateData = [];
        if ($scope.reqTempCount > 0) {
            $scope.reqTempCount--;
        }
        $scope.currentTemplateData = $scope.selectedTemplateData[$scope.reqTempCount];
    }
    $scope.nextReqTemp = function () {
        $scope.currentTemplateData = [];
        if ($scope.reqTempCount < $scope.selectedTemplateData.length) {
            $scope.reqTempCount++;
        }
        $scope.currentTemplateData = $scope.selectedTemplateData[$scope.reqTempCount];
    }
    $scope.selectAllTemple = function (selectedTemplateallitem) {
        var tempAttr = $scope.currentTemplateData.tempAttr;
        if (selectedTemplateallitem.isCheckedAll != true) {
            $scope.selectedItems = 0;
            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = false;
            }
        } else {
            $scope.selectedItems = tempAttr.length;
            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = true;
            }
        }

    };
    $scope.selectedItems = 6;
    $scope.addItem = function (elem, index) {
        var selectedItemCount = 0;
        if (elem == true) {
            $scope.selectedItems = ($scope.selectedItems + 1);
        } else {
            $scope.selectedItems = ($scope.selectedItems - 1);
        }
        if ($scope.selectedItems == $scope.currentTemplateData.tempAttr.length) {
            $scope.currentTemplateData.isCheckedAll = true;
        } else
            $scope.currentTemplateData.isCheckedAll = false;
    };

    /*current for tax poup start*/
    //line -- manage columns

    $scope.fields = [];
    $scope.manageColumns = function () {
        
        $scope.fields = [{
            'lable': 'Requested Date',
            'selected': false
        }, {
            'lable': 'Shipping Method',
            'selected': false
        }, {
            'lable': 'Procurement Option',
            'selected': false
        }, {
            'lable': 'Inventory Type',
            'selected': false
        }, {
            'lable': 'Matching',
            'selected': false
        }, {
            'lable': 'Supplier Code',
            'selected': false
        }, {
            'lable': 'Supplier Contact',
            'selected': false
        }, {
            'lable': 'Manufacturer Name',
            'selected': false
        }, {
            'lable': 'Manufacturer P...',
            'selected': false
        }, {
            'lable': 'Contract Name',
            'selected': false
        }, {
            'lable': 'Contract Expiry Date',
            'selected': false
        }, {
            'lable': 'Contract Value',
            'selected': false
        }, {
            'lable': 'Payment Terms',
            'selected': false
        }, ];


        $scope.noOfCol = parseInt(Math.round($scope.fields.length / 5));
        $scope.colWidth = 200;
        $scope.listHolderWidth = {
            'width': $scope.noOfCol * $scope.colWidth + "px"
        }
        $scope.startVal = 0;


        $scope.getStartFrom = function () {
            $scope.startVal += 1;
        };

        $scope.cloneDiv = function (n) {
            return new Array(n);
        };

        $scope.itemsLimit = 5;
        $scope.itemsColumnized = function (myIndex) {
            var currentPageIndex = myIndex * $scope.itemsLimit;
            return $scope.fields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };

        $scope.selectedCount = getSelectedCout($scope.fields);

    }

    //line -- manage columns -- check all
    $scope.selectedAll = {
        'selection': false
    }, $scope.splitsSelectedAll = {
        'selection': false
    }, $scope.fillpartial = false, $scope.isVisible = false;
    $scope.checkAll = function (aug) {
        angular.forEach($scope.fields, function (field, key) {
            $scope.fields[key].selected = aug;
        });
        if (aug === true) {
            $scope.isVisible = true;
            $scope.fillpartial = false;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);
    };

    //line -- manage columns -- reset
    $scope.reset = function () {
        $scope.selectedAll.selection = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
        $scope.selectedCount = getSelectedCout($scope.fields);

    };

    //line -- manage columns -- on change in list checkboxes
    $scope.onChange = function (obj) {
        if (isAtleastOneSelected($scope.fields)) {
            $scope.isVisible = true;
            $scope.fillpartial = true;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
            $scope.selectedAll.selection = false;
        }
        if (isAllSelected($scope.fields)) {
            $scope.fillpartial = false;
            $scope.selectedAll.selection = true;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);
    }

    //line -- manage columns -- global fn for get count
    function getSelectedCout(obj) {
        var count = 0;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                count++;
            }
        }
        return count;
    }
    $scope.selectedCount = getSelectedCout($scope.fields);

    //line -- manage columns -- global fn for at least on checkbox selection in list
    function isAtleastOneSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                return true;
            }
        }
        return false;
    }

    //line -- manage columns -- global fn for all checkboxes selection
    function isAllSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].selected) {
                return false;
            }
        }
        return true;
    }

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

	//$scope.itemDetailMaterialTabDataset = [
	//	{ "title": "Lines", "contentUrl": "p2p/rnote/views/itemDetail-mat-linesTab.html", "active": true },
	//	{ "title": "Asset Management", "contentUrl": "p2p/rnote/views/itemDetail-mat-assetTab.html" }
	//];

	$scope.itemDetailMaterialTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/rnote/views/itemDetail-mat-linesTab.html", "active": true },
		//{ "title": "Accounting", "contentUrl": "p2p/rnote/views/itemDetail-mat-accTab.html" }
        { "title": "Asset Management", "contentUrl": "p2p/rnote/views/itemDetail-mat-assetTab1.html" }
	];

	$scope.importLineItemsTabDataset = [
		{ "title": "Requisition", "contentUrl": "p2p/rnote/views/importLineItemsReqTab.html", "active": true },
		{ "title": "Templates", "contentUrl": "p2p/rnote/views/importLineItemsTemplTab.html" }
	];
	//$scope.itemDetailServiceTabDataset = [
	//	{ "title": "Lines", "contentUrl": "p2p/req/views/itemDetail-serv-linesTab.html", "active": true },
	//	{ "title": "Accounting", "contentUrl": "p2p/req/views/itemDetail-serv-accTab.html" },
	//	{ "title": "Shipping", "contentUrl": "p2p/req/views/itemDetail-serv-shippingTab.html" },
	//	{ "title": "Others", "contentUrl": "p2p/req/views/itemDetail-serv-othersTab.html" }
    //];

    //defined Values
	$scope.categoryName = "MRO";
	$scope.srNo = "01";
	$scope.assetKey = "A01";
	$scope.assetLoc = "Asset Location";


	$scope.taxesPopupUrl = "p2p/shared/views/taxesPopup.html";
	$scope.categoryPopupUrl = "p2p/req/views/categoryPopup.html";
	$scope.commentsPopupUrl = "p2p/req/views/commentsPopup.html";
	$scope.copyPopupUrl = "p2p/req/views/copyLineDetailsPopup.html";
	$scope.attachmentPopUpUrl = "p2p/req/views/attachmentPopup.html";

	$scope.showTaxesPopup = false;
	$scope.showTaxesPopupCallback = function (e) {
		$scope.showTaxesPopup = true;
	};
	$scope.taxesPopUpOnHideCallback = function () {
		$scope.showTaxesPopup = false;
	};

	$scope.approverPopupUrl = "shared/popup/views/popupApprover.html";

	$scope.approverPopup = false;
	$scope.approverPopupCallback = function (e) {
		$scope.approverPopup = true;
	};
	$scope.approverOnHideCallback = function () {
		$scope.approverPopup = false;
	};
	$scope.showCategoryPopup = false;
	$scope.showCategoryPopupCallback = function (e) {
		$scope.showCategoryPopup = true;
	};
	$scope.categoryPopUpOnHideCallback = function () {
		$scope.showCategoryPopup = false;
	};

	$scope.showCommentsPopup = false;
	$scope.showCommentsPopupCallback = function (e) {
		$scope.showCommentsPopup = true;
	};
	$scope.commentsPopupOnHideCallback = function (e) {		
		$scope.showCommentsPopup = false;
		$scope.attPopUp = true;
	};

	$scope.attPopUp = false;
	$scope.attachmentPopUp = function () {
		$scope.attPopUp = true;
	};
	$scope.attachmentPopUpClose = function () {
		$scope.attPopUp = false;
	};

	$scope.showCopyPopup = false;
	$scope.showCopyPopupCallback = function (e) {
		$scope.showCopyPopup = true;
	};
	$scope.copyPopupOnHideCallback = function (e) {
		$scope.showCopyPopup = false;
	};


	var getSelectedItemType = function () {
		if ($scope.ngModel.itemType) {
			for (var i = 0; i < $scope.ngModel.itemType.length; i++) {
				if ($scope.ngModel.itemType[i].selected == true) {
					return $scope.ngModel.itemType[i];
				}
			}
		}
		return undefined;
	};

	$scope.selectedItemType = getSelectedItemType();

	$scope.$watch('ngModel.itemType', function (newModel, oldModel) {
		if (newModel) {
			$scope.selectedItemType = getSelectedItemType();
		}
	}, true);
	$scope.contractExpiry = new Date();


    //asset tab
	$scope.assetConfig = [
                {
                    "field": "lineNumber",
                    "width": 120,
                    "displayName": "Line Number",
                    "isTree": true,
                    "isFixed": "Left",
                    "isVisible": true,
                    "isReadOnly": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable",
                    "attributes": {
                        "type": "number"
                    }
                },
                {
                    "field": "itemNo",
                    "width": 120,
                    "displayName": "Item No.",
                    "isFixed": "Left",
                    "isVisible": true,
                    "isReadOnly": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable"
                },
                {
                    "field": "description",
                    "width": 120,
                    "displayName": "Item Description",
                    "isFixed": "Left",
                    "isVisible": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable"
                },
                {
                    "field": "manfName",
                    "width": 150,
                    "displayName": "Manufacturer Name",
                    "isVisible": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable"
                },
                {
                    "field": "partNo",
                    "width": 150,
                    "displayName": "Manufacturer Part No.",
                    "isVisible": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable"
                },
                {
                    "field": "serialNo",
                    "width": 150,
                    "displayName": "Serial No.",
                    "isVisible": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable"
                },
                {
                    "field": "assetKey",
                    "width": 150,
                    "displayName": "Asset Key",
                    "isRegFocusCol": true,
                    "isVisible": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "popup",
                    "attributes": {
                        "type": "tagPopupShowCallback",
                        "defaultTitle": ""
                    },
                },
                {
                    "field": "assetLoc",
                    "width": 150,
                    "displayName": "Asset Location",
                    "isVisible": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable"
                },
                {
                    "field": "assetReturn",
                    "width": 150,
                    "displayName": "Asset Return",
                    "isVisible": true,
                    "filterObject": { "enableFiltering": true },
                    "type": "editable"
                }
	];
	$scope.assetModel = [
            {
                "lineNumber": 1,
                "itemNo": "Inspiron-2178",
                "description": "Dell Laptop",
                "manfName": "Dell",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "Tag",
                "assetLoc": "Mumbai",
                "assetReturn": ""
            },
            {
                "lineNumber": 1,
                "itemNo": "Inspiron-2188",
                "description": "Dell Laptop",
                "manfName": "Dell",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "",
                "assetLoc": "Navi Mumbai",
                "assetReturn": ""
            },
            {
                "lineNumber": 1,
                "itemNo": "Inspiron-2198",
                "description": "Dell Laptop",
                "manfName": "Dell",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "",
                "assetLoc": "Thane",
                "assetReturn": ""
            },
            {
                "lineNumber": 2,
                "itemNo": "Asus-2244",
                "description": "Asus Laptop",
                "manfName": "Asus",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "Tag",
                "assetLoc": "Bangalore",
                "assetReturn": ""
            },
            {
                "lineNumber": 2,
                "itemNo": "Asus-2244",
                "description": "Asus Laptop",
                "manfName": "Asus",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "",
                "assetLoc": "Bangalore",
                "assetReturn": ""
            }
	];

	$scope.tagPopupUrl = "p2p/receipts/views/popupTag.html";
	$scope.tagPopup = false;



	$scope.tagPopupHideCallback = function (e) {
	    $scope.tagPopup = false;
	};

	$scope.mode = $state.params.mode;
	//Item Details Grid
	$scope.addLines = 1;
	if ($scope.mode == 'createReceiptCorrection') {
	    $scope.itemConfig = [{
	        "field": "lineNumber",
	        "width": 150,
	        "displayName": "Line Number",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": true,
	        "autoIncrement": true,
	        "filterObject": { "enableFiltering": true },
	        "type": "editable",
	        "attributes": {
	            "type": "number"
	        }
	    }, {
	        "field": "lineType.key",
	        "width": 150,
	        "displayName": "Line Type",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": false,
	        "autoIncrement": false,
	        "filterObject": { "enableFiltering": true },
	        "type": "editable"
	    }, {
	        "field": "itemNumber",
	        "width": 150,
	        "displayName": "Item Number",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": false,
	        "autoIncrement": false,
	        "filterObject": { "enableFiltering": true },
	        "type": "editable"
	    }, {
	        "field": "description",
	        "width": 150,
	        "displayName": "Description",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": false,
	        "autoIncrement": false,
	        "filterObject": {
	            "enableFiltering": true
	        },
	        "type": "editable"
	    },
                        {
                            "field": "orderQuantity.qty",
                            "width": 150,
                            "displayName": "Order Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                        {
                            "field": "recievedQuantity.qty",
                            "width": 150,
                            "displayName": "Recieved Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                        {
                            "field": "acceptedQuantity.qty",
                            "width": 150,
                            "displayName": "Accepted Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                        {
                            "field": "returnQuantity.qty",
                            "width": 150,
                            "displayName": "Return Quantity",
                            "isVisible": true,
                            "isReadOnly": false,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                          {
                              "field": "uom.name",
                              "name": "uom.name",
                              "width": 150,
                              "displayName": "UOM",
                              "isVisible": true,
                              "isReadOnly": true,
                              "isRegFocusCol": true,
                              "filterObject": {
                                  "enableFiltering": true
                              },
                              "type": "dropdown",
                              "attributes": {
                                  "model": "type",
                                  "dataKey": "name",
                                  "options": [{
                                      "code": "EA",
                                      "name": "Each"
                                  }, {
                                      "code": "ALL",
                                      "name": "All"
                                  }, {
                                      "code": "Testing",
                                      "name": "TE"
                                  }]
                              }
                          },
                        {
                            "field": "reasonforCorrection.reason",
                            "name": "reasonforCorrection.reason",
                            "width": 210,
                            "displayName": "Reason for Correction",
                            "isVisible": true,
                            "isRegFocusCol": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "dropdown",
                            "attributes": {
                                "model": "type",
                                "dataKey": "reason",
                                "options": [{
                                    "id": 1,
                                    "reason": "Data Entry Error"
                                }, {
                                    "id": 2,
                                    "reason": "Data Entry Error"
                                }, {
                                    "id": 3,
                                    "reason": "Data Entry Error"
                                }]
                            }
                        },
                        {
                            "field": "prevReturnedQty.qty",
                            "width": 150,
                            "displayName": "Previously Returned Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },

                        {
                            "field": "comment",
                            "width": 230,
                            "displayName": "Comments",
                            "isRegFocusCol": true,
                            "attributes": {
                                "type": "comment",
                                "defaultTitle": "Add Comments"
                            },
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "popup"
                        }
	    ];
	    $scope.itemModel = [
            {
                "lineNumber": 1,
                "lineType": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "itemNumber": "0001",
                "description": "Dell Laptop",
                "orderQuantity": { "qty": 20 },
                "recievedQuantity": { "qty": 15 },
                "acceptedQuantity": { "qty": 13 },
                "returnQuantity": { "qty": 10 },
                "reasonforCorrection": {
                    "id": 1,
                    "reason": "Data Entry Error"
                },
                "prevReturnedQty": { "qty": 100 },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "comment": "1 Comments",

                "$$hashKey": "uiGrid-0012",

            },
              {
                  "lineNumber": 2,
                  "lineType": {
                      "id": 1,
                      "name": "P2P_REQ_Variable_Service",
                      "key": "Variable Service"
                  },
                  "itemNumber": "0002",
                  "description": "Lenovo Laptop",
                  "orderQuantity": { "qty": 20 },
                  "recievedQuantity": { "qty": 15 },
                  "acceptedQuantity": { "qty": 13 },
                  "returnQuantity": { "qty": 10 },
                  "reasonforCorrection": {
                      "id": 1,
                      "reason": "Data Entry Error"
                  },
                  "prevReturnedQty": { "qty": 100 },
                  "uom": {
                      "code": "EA",
                      "name": "Each"
                  },
                  "comment": "2 Comments",

                  "$$hashKey": "uiGrid-0013",

              },
               {
                   "lineNumber": 3,
                   "lineType": {
                       "id": 1,
                       "name": "P2P_REQ_Variable_Service",
                       "key": "Variable Service"
                   },
                   "itemNumber": "0003",
                   "description": "Lenovo Laptop",
                   "orderQuantity": { "qty": 20 },
                   "recievedQuantity": { "qty": 15 },
                   "acceptedQuantity": { "qty": 13 },
                   "returnQuantity": { "qty": 10 },
                   "reasonforCorrection": {
                       "id": 1,
                       "reason": "Data Entry Error"
                   },
                   "prevReturnedQty": { "qty": 100 },
                   "uom": {
                       "code": "EA",
                       "name": "Each"
                   },
                   "comment": "3 Comments",

                   "$$hashKey": "uiGrid-0014",

               },
                {
                    "lineNumber": 4,
                    "lineType": {
                        "id": 1,
                        "name": "P2P_REQ_Milestone_Payment",
                        "key": "Fixed Service"
                    },
                    "itemNumber": "0004",
                    "description": "Intel Laptop",
                    "orderQuantity": { "qty": 20 },
                    "recievedQuantity": { "qty": 15 },
                    "acceptedQuantity": { "qty": 13 },
                    "returnQuantity": { "qty": 10 },
                    "reasonforCorrection": {
                        "id": 1,
                        "reason": "Data Entry Error"
                    },
                    "prevReturnedQty": { "qty": 100 },
                    "uom": {
                        "code": "EA",
                        "name": "Each"
                    },
                    "comment": "4 Comments",
                    "$$hashKey": "uiGrid-0015",
                },
                {
                    "lineNumber": 5,
                    "lineType": {
                        "id": 1,
                        "name": "P2P_REQ_Progress_Payment",
                        "key": "Progress Payment"
                    },
                    "itemNumber": "0005",
                    "description": "IBM Laptop",
                    "orderQuantity": { "qty": 20 },
                    "recievedQuantity": { "qty": 15 },
                    "acceptedQuantity": { "qty": 13 },
                    "returnQuantity": { "qty": 10 },
                    "reasonforCorrection": {
                        "id": 1,
                        "reason": "Data Entry Error"
                    },
                    "prevReturnedQty": { "qty": 100 },
                    "uom": {
                        "code": "EA",
                        "name": "Each"
                    },
                    "comment": "5 Comments",
                    "$$hashKey": "uiGrid-0016",
                }

	    ];
	} else {
	    $scope.itemConfig = [{
	        "field": "lineNumber",
	        "width": 150,
	        "displayName": "Line Number",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": true,
	        "autoIncrement": true,
	        "filterObject": { "enableFiltering": true },
	        "type": "editable",
	        "attributes": {
	            "type": "number"
	        }
	    }, {
	        "field": "lineType.key",
	        "width": 150,
	        "displayName": "Line Type",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": false,
	        "autoIncrement": false,
	        "filterObject": { "enableFiltering": true },
	        "type": "editable"
	    }, {
	        "field": "itemNumber",
	        "width": 150,
	        "displayName": "Item Number",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": false,
	        "autoIncrement": false,
	        "filterObject": { "enableFiltering": true },
	        "type": "editable"
	    }, {
	        "field": "description",
	        "width": 150,
	        "displayName": "Description",
	        "isFixed": "Left",
	        "isVisible": true,
	        "isReadOnly": false,
	        "autoIncrement": false,
	        "filterObject": {
	            "enableFiltering": true
	        },
	        "type": "editable"
	    },
                        {
                            "field": "orderQuantity.qty",
                            "width": 150,
                            "displayName": "Order Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                        {
                            "field": "recievedQuantity.qty",
                            "width": 150,
                            "displayName": "Recieved Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                        {
                            "field": "acceptedQuantity.qty",
                            "width": 150,
                            "displayName": "Accepted Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                        {
                            "field": "returnQuantity.qty",
                            "width": 150,
                            "displayName": "Return Quantity",
                            "isVisible": true,
                            "isReadOnly": false,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },
                          {
                              "field": "uom.name",
                              "name": "uom.name",
                              "width": 150,
                              "displayName": "UOM",
                              "isVisible": true,
                              "isReadOnly": true,
                              "isRegFocusCol": true,
                              "filterObject": {
                                  "enableFiltering": true
                              },
                              "type": "dropdown",
                              "attributes": {
                                  "model": "type",
                                  "dataKey": "name",
                                  "options": [{
                                      "code": "EA",
                                      "name": "Each"
                                  }, {
                                      "code": "ALL",
                                      "name": "All"
                                  }, {
                                      "code": "Testing",
                                      "name": "TE"
                                  }]
                              }
                          },
                        {
                            "field": "reasonForReturn.reason",
                            "name": "reasonForReturn.reason",
                            "width": 210,
                            "displayName": "Reason For Return",
                            "isVisible": true,
                            "isRegFocusCol": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "dropdown",
                            "attributes": {
                                "model": "type",
                                "dataKey": "reason",
                                "options": [{
                                    "id": 1,
                                    "reason": "Defective"
                                }, {
                                    "id": 2,
                                    "reason": "Needs replacement"
                                }, {
                                    "id": 3,
                                    "reason": "Needs Credit"
                                }]
                            }
                        },
                        {
                            "field": "prevReturnedQty.qty",
                            "width": 150,
                            "displayName": "Previously Returned Quantity",
                            "isVisible": true,
                            "isReadOnly": true,
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "editable",
                            "attributes": {
                                "type": "number"
                            }
                        },

                        {
                            "field": "comment",
                            "width": 230,
                            "displayName": "Comments",
                            "isRegFocusCol": true,
                            "attributes": {
                                "type": "comment",
                                "defaultTitle": "Add Comments"
                            },
                            "filterObject": {
                                "enableFiltering": true
                            },
                            "type": "popup"
                        }
	    ];
	    $scope.itemModel = [
            {
                "lineNumber": 1,
                "lineType": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "itemNumber": "0001",
                "description": "Dell Laptop",
                "orderQuantity": { "qty": 20 },
                "recievedQuantity": { "qty": 15 },
                "acceptedQuantity": { "qty": 13 },
                "returnQuantity": { "qty": 10 },
                "reasonForReturn": {
                    "id": 1,
                    "reason": "Defective"
                },
                "prevReturnedQty": { "qty": 100 },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "comment": "1 Comments",

                "$$hashKey": "uiGrid-0012",

            },
              {
                  "lineNumber": 2,
                  "lineType": {
                      "id": 1,
                      "name": "P2P_REQ_Variable_Service",
                      "key": "Variable Service"
                  },
                  "itemNumber": "0002",
                  "description": "Lenovo Laptop",
                  "orderQuantity": { "qty": 20 },
                  "recievedQuantity": { "qty": 15 },
                  "acceptedQuantity": { "qty": 13 },
                  "returnQuantity": { "qty": 10 },
                  "reasonForReturn": {
                      "id": 1,
                      "reason": "Defective"
                  },
                  "prevReturnedQty": { "qty": 100 },
                  "uom": {
                      "code": "EA",
                      "name": "Each"
                  },
                  "comment": "2 Comments",

                  "$$hashKey": "uiGrid-0013",

              },
               {
                   "lineNumber": 3,
                   "lineType": {
                       "id": 1,
                       "name": "P2P_REQ_Variable_Service",
                       "key": "Variable Service"
                   },
                   "itemNumber": "0003",
                   "description": "Lenovo Laptop",
                   "orderQuantity": { "qty": 20 },
                   "recievedQuantity": { "qty": 15 },
                   "acceptedQuantity": { "qty": 13 },
                   "returnQuantity": { "qty": 10 },
                   "reasonForReturn": {
                       "id": 1,
                       "reason": "Defective"
                   },
                   "prevReturnedQty": { "qty": 100 },
                   "uom": {
                       "code": "EA",
                       "name": "Each"
                   },
                   "comment": "3 Comments",

                   "$$hashKey": "uiGrid-0014",

               },
                {
                    "lineNumber": 4,
                    "lineType": {
                        "id": 1,
                        "name": "P2P_REQ_Milestone_Payment",
                        "key": "Fixed Service"
                    },
                    "itemNumber": "0004",
                    "description": "Intel Laptop",
                    "orderQuantity": { "qty": 20 },
                    "recievedQuantity": { "qty": 15 },
                    "acceptedQuantity": { "qty": 13 },
                    "returnQuantity": { "qty": 10 },
                    "reasonForReturn": {
                        "id": 1,
                        "reason": "Defective"
                    },
                    "prevReturnedQty": { "qty": 100 },
                    "uom": {
                        "code": "EA",
                        "name": "Each"
                    },
                    "comment": "4 Comments",
                    "$$hashKey": "uiGrid-0015",
                },
                {
                    "lineNumber": 5,
                    "lineType": {
                        "id": 1,
                        "name": "P2P_REQ_Progress_Payment",
                        "key": "Progress Payment"
                    },
                    "itemNumber": "0005",
                    "description": "IBM Laptop",
                    "orderQuantity": { "qty": 20 },
                    "recievedQuantity": { "qty": 15 },
                    "acceptedQuantity": { "qty": 13 },
                    "returnQuantity": { "qty": 10 },
                    "reasonForReturn": {
                        "id": 1,
                        "reason": "Defective"
                    },
                    "prevReturnedQty": { "qty": 100 },
                    "uom": {
                        "code": "EA",
                        "name": "Each"
                    },
                    "comment": "5 Comments",
                    "$$hashKey": "uiGrid-0016",
                }

	    ];
	}


    /*comment popup*/
	$scope.commentIcon = '#icon_Comments'; //icon_Commented
	$scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

	$scope.showCommentsPopup = false;
	$scope.showCommentsGridPopupCallback = function () {
	    $scope.showCommentsPopup = true;
	};
	$scope.commentsGridPopUpOnHideCallback = function (e) {
	    $scope.showCommentsPopup = false;
	    $scope.commentIcon = '#icon_Commented'; //icon_Comments
	};


    // UI Grid -- popup callback 
	$scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive
     if (def.col && def.col.field == 'comment') {
         $scope.showCommentsPopup = true;
	    }
	    // assetKey
	    if (def.col && def.col.field == 'assetKey' && def.row.entity.assetKey != "") {
	        $scope.tagPopup = true;
	    }
	 }
	
    // UI grid callback end here

	

}
