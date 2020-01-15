'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pInvCtrl
 * @description
 * Controller of P2P Invoice.
 */
    .controller('p2pInvExcelCtrl', ['$scope', 'jsonToGrid', '$state', '$timeout', '$sce', '$filter', p2pInvExcelCtrlFunc]);

/**
 * @ngdoc method
 * @name p2pInvCtrlFunc
 * @methodOf SMART2.controller:p2pInvCtrl
 * @description
 * The method of the p2pInvCtrl controller.
 *
 * @param {Object} $scope Scope of the controller

  '$translate',
   $translate
    $translate.use('en_US');
 */
function p2pInvExcelCtrlFunc($scope, jsonToGrid, $state, $timeout, $sce, $filter) {
   
    $scope.gridData =
        {
        "headerData": [{
            "dataType": "string",
            "visible": true,
            "title": "Invoice Number",
            "align": "left",
            "sortable": true,
            "sortType": "desc",
            "datamappingkey": "invoice_Number"
        }, {
            "dataType": "string",
            "visible": true,
            "title": "Partner Name",
            "align": "left",
            "sortable": true,
            "sortType": "asc",
            "datamappingkey": "partner_name"
        }, {
            "dataType": "string",
            "visible": true,
            "title": "PO Number",
            "align": "left",
            "sortable": true,
            "sortType": "asc",
            "datamappingkey": "PO_Number"
        }, {
            "dataType": "string",
            "visible": true,
            "title": "Status",
            "align": "left",
            "sortable": true,
            "sortType": "asc",
            "datamappingkey": "Status"
        }, {
            "dataType": "string",
            "visible": true,
            "title": "Exception",
            "align": "left",
            "sortable": true,
            "sortType": "asc",
            "datamappingkey": "Exception"
        }, {
            "dataType": "decimal",
            "visible": true,
            "title": "Total(USD)",
            "align": "right",
            "sortable": true,
            "sortType": "asc",
            "datamappingkey": "total"
        }],
        "rowData": [
            {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Matched",
            "Exception": "-",
            "total": "5000"
             
        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Exception",
            "Exception": "Non PO Exception",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Matched",
            "Exception": "-",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Exception",
            "Exception": "Non PO Exception",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Matched",
            "Exception": "-",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Exception",
            "Exception": "Non PO Exception",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Matched",
            "Exception": "-",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Exception",
            "Exception": "Non PO Exception",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Matched",
            "Exception": "-",
            "total": "5000"

        }, {
            "invoice_Number": "INV221-3218",
            "partner_name": "Staples",
            "PO_Number": "PO12-1245",
            "Status": "Exception",
            "Exception": "Non PO Exception",
            "total": "5000"

        }]
    };

    $scope.gridConfig = {
        headerData: jsonToGrid.obtainHeaderData($scope.gridData.headerData, ['']),
        rowData: $scope.gridData.rowData,
        dimension: {
            width:'100%' ,
            height: '100%'
        },
        cellRenderer: function (e) {
            if (e.colDef.field == "Status") {
                /* get e.value */
                switch(e.value){
                    case 'Matched': return '<span class="red-text">' + e.value + '</span>'; break;
                    case 'Exception': return '<span  class="green-text">' + e.value + '</span>'; break;
                }
            }
            else if (e.colDef.field == "Exception") {
                return '<span class="red-text">' + e.value + '</span>';
            }
            else {
              return  '<span>' + e.value + '</span>'
            }
        },
       
        onClick: function (e) {
            if (e.clickable && e.dataMappingKey == 'invoice_Number') {
            }
        },
       
    };

	/* CREATE FROM EXCEL LANDING */
    $scope.items = [{
    	status: 'Success',
    	docName: 'Staples',
    	uploadedBy: 'John Miller',
    	requestedTime: '12:30 PM',
    	completionTime: '15:30 PM',
		link: 'View Invoices',
		details:'sdflh kfhskfd hskjfhsk jfskljhfs jkfhkjsldfh skdfhs f;k ghg dgkjdhg dgkdh gkdhgk dhfgkhd gk dkghdg'
    },
	{
		status: 'Success',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: 'Non PO Exception',
		total: '5000.00',
		details: 'sdflh kfhskfd hskjfhsk jfskljhfs jkfhkjsldfh skdfhs f;k ghg dgkjdhg dgkdh gkdhgk dhfgkhd gk dkghdg sdflh kfhskfd hskjfhsk jfskljhfs jkfhkjsldfh skdfhs f;k ghg dgkjdhg dgkdh gkdhgk dhfgkhd gk dkghdg'
	},
	{
		status: 'Success',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: '-',
		total: '5000.00',
		details: 'sdflh kfhskfd hskjfhsk jfskljhfs jkfhkjsldfh skdfhs f;k ghg dgkjdhg'
	},
	{
		status: 'Failed',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: '-',
		total: '5000.00',
		details: 'sdflh kfhskfd hskjfhsk jfskljhfs jkfhkjsldfh skdfhs f;k ghg dgkjdhg dgkdh gkdhgk dhfgkhd gk dkghdg sdflh kfhskfd hskjfhsk jfskljhfs jkfhkjsldfh'
	},
	{
		status: 'Success',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: 'Tax Exception',
		total: '5000.00',
		details: 'sdflh'
	},
	{
		status: 'Failed',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: 'Non PO Exception',
		total: '5000.00',
		details: 'sdflh dkghdg sdflh kfhskfd hskjfhsk jfskljhfs jkfhkjsldfh skdfhs f;k ghg dgkjdhg dgkdh gkdhgk dhfgkhd gk dkghdg'
	},
	{
		status: 'Failed',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: '-',
		total: '5000.00'
	},
	{
		status: 'Success',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: '-',
		total: '5000.00'
	},
	{
		status: 'Success',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: '-',
		total: '5000.00'
	},
	{
		status: 'Success',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: 'Unit Price Exception + 2more',
		total: '5000.00'
	},
	{
		status: 'Success',
		docName: 'Staples',
		PONo: 'PO12-1245',
		exception: 'Supplier not present in ERP',
		total: '5000.00'
	}];
	/* CREATE FROM EXCEL LANDING ENDS  */
    /* CREATE FROM EXCEL - VIEW INVOICES */
    $scope.items = [{
    	InvNo: 'INV - 020',
    	partnerName: 'Staples',
    	PONo: 'PO12-1245',
    	status: 'Matched',
    	exception: '-',
    	total: '5000.00',
    	link: 'View Invoices',
        transmission: '-'
    },
	{
		InvNo: 'INV - 021',
		partnerName: 'Staples',
		PONo: 'PO15-1245',
		status: 'Success',
		exception: 'Non PO Exception',
		total: '8000.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 022',
		partnerName: 'Staples',
		PONo: 'PO16-1250',
		status: 'Matched',
		exception: '-',
		total: '9000.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 023',
		partnerName: 'Staples',
		PONo: 'PO17-1245',
		status: 'Matched',
		exception: '-',
		total: '4000.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 028',
		partnerName: 'Staples',
		PONo: 'PO14-1245',
		status: 'Failed',
		exception: 'Tax Exception',
		total: '2000.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 029',
		partnerName: 'Staples',
		PONo: 'PO11-1245',
		status: 'Matched',
		exception: 'Non PO Exception',
		total: '1000.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 024',
		partnerName: 'Staples',
		PONo: 'PO10-1245',
		status: 'Matched',
		exception: '-',
		total: '3000.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 025',
		partnerName: 'Matched',
		PONo: 'PO19-1245',
		status: 'Success',
		exception: '-',
		total: '5500.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 027',
		partnerName: 'Matched',
		PONo: 'PO12-1223',
		status: 'Success',
		exception: 'Unit Price Exception + 2more',
		total: '7600.00',
		transmission: '-'
	},
	{
		InvNo: 'INV - 026',
		partnerName: 'Matched',
		PONo: 'PO12-1555',
		status: 'Matched',
		exception: 'Supplier not present in ERP',
		total: '4500.00',
		transmission: '-'
	}];
    /* CREATE FROM EXCEL - VIEW INVOICES */

    $scope.orderSortArray = {
        orderSortType: "",
        orderSortReverse: false
    };

    $scope.closePopOver = function () {
        angular.element(document).triggerHandler('click');
    }

    $scope.supList = [
        {
            name: "Staples",
            isChecked: true
        },
        {
            name: "Matched",
            isChecked: true
        }
    ];

    $scope.supCheckedCount = $filter('filter')($scope.supList, { isChecked: true }).length;

    $scope.onChangeSupName = function (obj) {
        $scope.supCheckedCount = $filter('filter')($scope.supList, { isChecked: true }).length;
    };

    $scope.status = [
        {
            name: "Success",
            isChecked: true
        },
        {
            name: "Matched",
            isChecked: true
        }
    ];

    $scope.statusCheckedCount = $filter('filter')($scope.status, { isChecked: true }).length;

    $scope.onChangeStatus = function (obj) {
        $scope.statusCheckedCount = $filter('filter')($scope.status, { isChecked: true }).length;
    };

    $scope.exception = [
        {
            name: "Non PO Exception",
            isChecked: true
        },
        {
            name: "Tax Exception",
            isChecked: true
        },
        {
            name: "Unit Price Exception + 2more",
            isChecked: true
        },
        {
            name: "Supplier not present in ERP",
            isChecked: true
        }
    ];

    $scope.exceptionCheckedCount = $filter('filter')($scope.exception, { isChecked: true }).length;

    $scope.onChangeException = function (obj) {
        $scope.exceptionCheckedCount = $filter('filter')($scope.exception, { isChecked: true }).length;
    };

    $scope.colorText = function (status) {
    	if (status == "Matched") {
    		return 'green-text'
    	}
    	else {
    		return 'red-text'
    	}
    };

	$scope.colorText01 = function (status) {
    	if (status == "Success") {
    		return 'green-text'
    	}
    	else {
    		return 'red-text'
    	}
    }
    

	$scope.closeClicked = function () {
	    $state.go('expandedLandingList', { pagefor: 'manage', doctype: 'invoiceExcel' });
	}

	$scope.addDocumentPoupUrl = "shared/popup/views/popupUploadDoc.html";
	$scope.addDocumentPopup = false;

	$scope.uploadPopupCallback = function(e) {
	    $scope.attachmentMsg = "Make sure that the image name is same as the invoice's supplier invoice number.\
            <br />Supported file formats: zip, rar (containing .pdf, .jpg, .jpeg, .png, .tiff, .bmp, .gif).\
		    <br />Limited to 1 file of 100MB.";
	    $scope.attchmentMsg = $sce.trustAsHtml($scope.attachmentMsg);

	    $scope.uploadTitleContent = "Upload Document";
	    $scope.uploadTitle = "UPLOAD SCANNED DOCUMENTS";
	    $scope.attachmentButtonName = "Done";
	    $scope.hideDownloadTemplate = false;
	    $scope.showDownloadMasterData = false;

	    $scope.attachmentList = [{
	        name: "Attachment.zip",
	        status: "success",
	        referenceName: "Add Name",
	        isShow: true,
	        actionIconDelete: true
	    }];

	    $timeout(function () {
	        $scope.addDocumentPopup = true;
	    });
	}

	$scope.hideAddDocumentPopupCallback = function (e) {
	    $scope.addDocumentPopup = false;
	};

	$scope.attachmentCall = function (e) {
	    $scope.attachFlag = true;

	    for (var i = 0; i < $scope.attachmentList.length; i++) {
	        $scope.attachmentList[i].isShow = true;
	    }
	};

	$scope.closeAttachment = function (el) {
	    el.isShow = false;

	};

	$scope.retryCall = function (el) {
	    el.status = "success";
	};
};