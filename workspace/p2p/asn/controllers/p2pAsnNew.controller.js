'use strict';
angular.module('SMART2')
.controller('p2pAsnNewCtrl', ['$scope', '$state','notification','$filter','$rootScope', '$http', p2pAsnNewCtrlFunc])
.controller('p2pAsnPreviewCtrl', ['$scope', '$state', 'notification', p2pAsnPreviewCtrlFunc])
.controller('asnItemDetailCtrl', ['$scope', '$state', '$notification', asnItemDetailCtrlFunc])
/*function for asn*/
function p2pAsnNewCtrlFunc($scope, $state, notification, $filter, $rootScope, $http){
/* header actions  */
	$scope.pagetitle = "Advance Shipping Notice";

 	/* tax popover */
    $scope.taxConfig =
        [
        {
            "dataName": "Item Total",
            "dataValue": 800.00,
        },
        {
            "dataName": "Taxes & Charges",
            "dataValue": 80,
            
        }
        ];
 	 $scope.getTotalTax = function () {
        var count = 0;
        angular.forEach($scope.taxConfig, function (taxValue) {

            count += parseInt(taxValue.dataValue)

        });

        return count;

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

//actions
     var deleteOrderObj = {
        type: "warning",
        message: "<p class='left-align'>Do you want to delete this Order?</p>",
        buttons: [
			{
			    title: "Yes",
			    result: "yes"
			},
			{
			    title: "No",
			    result: "no"
			}
        ]
    };

 	 $scope.deleteOrder = function () {
        notification.notify(deleteOrderObj, function (responce) {
            var result = responce.result;

            if (result == 'yes') {
                history.go(-1);
                $rootScope.$broadcast('itemDelet', { itemFrom: 'Order' });

            }

        });
    }


    //poup for comment popup
  // POPUP -- comments 
  // inside popup search 
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
  // inside popup search  end
 //popup tab script
   $scope.modules = [
        { id: '0', name: 'REQUISITION', count: '3', number: 'REQ-2016.013110', url: 'requisition.html', isChecked: false },
        { id: '2', name: 'ORDER', count: '4', number: 'ORD-2015.523209', url: 'order.html', isChecked: false },
        { id: '3', name: 'INVOICE RECONCILIATION', count: '8', number: 'IR-2016.234829', url: 'invoice.html', isChecked: false },
    ];

    $scope.modulecurrentTab = 'requisition.html';
    $scope.moduleactiveListTabs = 0;
    $scope.modulesetActiveListTab = function (menuItema) {
        $scope.moduleactiveListTabs = menuItema;
        $scope.modulecurrentTab = $scope.modules[menuItema].url;
    };

 //popup tab script end
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
    $scope.goToTracksatusDetail = function (e) {
        $scope.heightTrackStatus = '100%';
        $scope.isFullscreen = !$scope.isFullscreen;
    }

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
    //comment popup script 
    // POPUP -- attachment 
    $scope.attachmentPopUpUrl = "shared/popup/views/popupUploadDoc.html";

    //Attachment popup--start
    var comingFrom;
    $rootScope.showDoneBtn = false;
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e, popupComingfrom) {
           $scope.showCommentsPopup = false;
        $scope.showUploadPopup = true;
        comingFrom = popupComingfrom;
        if (comingFrom != undefined) {
            $rootScope.showDoneBtn = true
        }
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
        if (comingFrom == undefined) {

            return false;
        } else if (comingFrom == "comment") {
            $scope.showCommentsPopup = true;
            $rootScope.showDoneBtn = false;
        } else if (comingFrom == "manageApproval") {
            $scope.mngAppShow = true;
            $rootScope.showDoneBtn = false;
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
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentTwo.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
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

    $scope.tooltipText = "AttachmentOne.xls" + "\n" + "AttachmentTwo.xls" + "\n" + "AttachmentThre.xls" + "\n" + "AttachmentFour.xls" + "\n" + "AttachmentFive.xls";
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

    $scope.commentsPopupgTabUrl = "shared/popup/views/commentsPopupTab.html";
    $scope.showCommentsPopupTab = false;
    $scope.showCommentsPopupTabCallback = function (e) {
        $scope.showCommentsPopupTab = true;
    };
    $scope.commentsPopupOnHideTabCallback = function (e) {
        $scope.showCommentsPopupTab = false;
        $scope.attPopUp = true;
    };
    $scope.tooltip = "Attachment 1" + "\n" + "Attachment 2" + "\n" + "Attachment 3" + "\n" + "Attachment 4" + "\n" + "Attachment 5";
    $scope.customStyle = {
        "textAlign": "left",
    };

    //Attachment popup--end



  $scope.$on('addLineComment', function(event, data) {
  		if(data[0].commentPopup == true){
				 $scope.showCommentsPopup = true;
  		}

   });

/* formConfig */
$scope.statuscheck = $state.params.status
var linkCallJson = 'p2p/asn/models/createAsnReadOnly.json';
 if($scope.statuscheck == 'Draft'){
         linkCallJson = 'p2p/asn/models/createAsn.json'
 }
 var asn = {
        method: 'GET',
        url: linkCallJson
    };

    $http(asn).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig;



      
    }, function (error) {
        console.log(JSON.stringify(error));
    });


   $scope.showLocationPopup = false;
    $scope.showLocationPopupFn = function () {
        $scope.showLocationPopup = true;
    };
    $scope.showLocationPopupClBack = function () {
        $scope.showLocationPopup = false;
    };

/* formConfig end */
/*  footer actions */

	// show preview
    $scope.showOrderPreview = function () {
        $state.go('p2p.asn.preview');
    }

   // on submit
    $scope.submitReq = function () {
        var confi = {
            type: "success",
            message: "<p class='left-align'>Requisition has been submitted successfully.</p>",
        
            buttons: [
				{
				    "title": "YES",
				    "result": "yes"
				},
				{
				    "title": "Stay on same page",
				    "result": "no"
				}
            ]
        };

        //Notification call
        notification.notify(confi, function (responce) {
            if (responce.result == "yes") {
                $state.go('expandedLandingList', { pagefor: 'manage', doctype: 'asn' });
            } else {
                return;
            }
        });
    }


/*  footer actions end */



};
/*function for asn preview*/
function p2pAsnPreviewCtrlFunc($scope, $state, notification){
	$scope.pagetitle = "Advance Shipping Notice";
 //Notification
    $scope.submitReq = function () {
        var confi = {
            type: "success",
            message: "<p class='left-align'>Requisition has been submitted successfully.</p>",
        
            buttons: [
				{
				    "title": "YES",
				    "result": "yes"
				},
				{
				    "title": "Stay on same page",
				    "result": "no"
				}
            ]
        };

        //Notification call
       notification.notify(confi, function (responce) {
            if (responce.result == "yes") {
                $state.go('expandedLandingList', { pagefor: 'manage', doctype: 'asn' });
            } else {
                return;
            }
        });

        // popup -- trackstatus
    $scope.trackStatusPopup = false;
    $scope.trackStatusPopupCallback = function (e) {
        $scope.trackStatusPopup = true;
    };
    $scope.trackStatusOnHideCallback = function (e) {
        $scope.trackStatusPopup = false;
    };
    }
};
/* function for asn item details */
function asnItemDetailCtrlFunc($scope, $state, notification){
  $scope.itemDetailTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/asn/views/itemDetailMatLinesTab.html", "active": true }
    ];
  //function written for force to reintialize ui grid
angular.element('.collapsible-header').on('click', function(e){
    if( e.target.innerText  == 'LINES DETAILS'){
      
    }
});
 
    //UI grid -- Items
    $scope.itemConfig = [
            {
                "field": "lineNumber",
                "width": 100,
                "displayName": "Line Number",
                "isVisible": true,
                "isReadOnly": true,
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes":{"type": "number"}
            },
            {
                "field": "poNumber",
                "width": 150,
                "displayName": "PO Number",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "itemNumber",
                "width": 175,
                "displayName": "Item Number",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
	        {
	            "field": "itemName",
	            "width": 175,
	            "displayName": "Item Name",
	            "isVisible": true,
	            "isReadOnly": true,
	            "filterObject": { "enableFiltering": true },
	            "type": "editable"
	        },
            {
                "field": "orderQuantity",
                "width": 150,
                "displayName": "Order Quantity",
                "isVisible": true,
                   "isReadOnly": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                   "attributes":{"type": "number"}
            },
            {
                "field": "uom.name",
                "name": "uom.name",
                "width": 150,
                "displayName": "UOM",
                "isVisible": true,
                "isRegFocusCol": true,
                   "isReadOnly": true,
                "filterObject": { "enableFiltering": true },
                "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "name",
                    "options": [
                      {
                          "code": "EA",
                          "name": "Each"
                      },
                      {
                          "code": "ALL",
                          "name": "All"
                      },
                      {
                          "code": "Testing",
                          "name": "TE"
                      }
                    ]
                }
            },

            {
                "field": "shippingQty",
                "width": 150,
                "displayName": "Shipping Quantity",
                "isVisible": true,
                   "isReadOnly": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                   "attributes":{"type": "number"}
            },
            {
                "field": "needByDate",
                "width": 150,
                "displayName": "Need by Date",
                "isVisible": true,
                   "isReadOnly": true,
                "attributes": {
                    "type": "date",
                    "format": "dd/MM/yyyy"
                },
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "preAcceptedQty",
                "width": 150,
                "displayName": "Previously Accepted Quantity",
                "isVisible": true,
                   "isReadOnly": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                 "attributes":{"type": "number"}
            },
            {
                "field": "comments",
                    "width": 150,
                "displayName": "Comments",
                "isVisible": true,
                "filterObject": { "enableFiltering": false},
                "enableSorting": false ,
                "type": "popup",
                "attributes": {
                    "type": "openCommentPopup",
                    "defaultTitle": "ADD"
                }
             
            }
            

    ];


        $scope.itemModel = [
            {
                "id": 1,
                "lineNumber": 1,
                "poNumber": "PO.526892",
                "itemNumber": "30EC83",
                "itemName": "Missing Nozzle",
                "orderQuantity":2,
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "shippingQty": 2,
                  "needByDate": Date(1455474600000),
                "preAcceptedQty": 4,
                "comments":  ""
            },
            {
                "id": 2,
                "lineNumber": 2,
                "poNumber": "PO.240891",
                "itemNumber": "5JKZ0",
                "itemName": "Drop-In Anchor",
                "orderQuantity":2,
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "shippingQty": 2,
                  "needByDate": Date(1455474600000),
                "preAcceptedQty": 2,
                "comments": ""
            },
            {
                "id": 3,
                "lineNumber": 3,
                "poNumber": "PO.128901",
                "itemNumber": "5GLD1",
                "itemName": "Steel Toggle Bolt",
                "orderQuantity":2,
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "shippingQty": 2,
                  "needByDate": Date(1455474600000),
                "preAcceptedQty": 1,
                "comments": ""
            },
            {
                "id": 4,
                "lineNumber": 4,
                "poNumber": "PO.623771",
                "itemNumber": "3XYU7",
                "itemName": "Retaining Spacers",
                "orderQuantity":2,
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "shippingQty": 2,
                  "needByDate": Date(1455474600000),
                "preAcceptedQty": 5,
                "comments": ""
            }
    ];

var statuscheck = $state.params.status;
 if(statuscheck == 'Draft'){
         angular.forEach($scope.itemConfig, function(value, key){
            if(value.field == 'shippingQty'){

                    value.isReadOnly = false;
            }

         });
 }
   

    // UI Grid -- popup callback 
    $scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive


        // UI Grid -- popup callback -- comment
        if (def.col && def.col.field == 'comments') {
            
        	    	 $scope.$emit('addLineComment', [{'commentPopup': true}]);
        }
        
        
    }
}