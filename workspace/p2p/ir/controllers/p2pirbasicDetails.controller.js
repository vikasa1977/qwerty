//'use strict';
angular.module('SMART2')
.controller('p2pIRBasicDetailsCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', p2pIRBasicDetailsCtrlFunc])
.controller('itemDetailIRCtrl', ['$scope', 'notification', '$translate', '$sce', '$http', '$timeout', itemDetailIRCtrlFunc])
.controller('itemDetailCtrl', ['$scope', '$state', itemDetailCtrlFunc])
.controller('p2pIrPreviewCtrl', ['$scope', '$rootScope', '$http', 'notification', '$state', p2pIrPreviewCtrlFunc])
.controller('p2pIRExceptionTypeHederCtrl', ['$scope', '$rootScope', '$translate', '$http', '$state', 'notification', 'shareData', p2pIRExceptionTypeHederCtrlFunc])
.controller('p2pIRExceptionTypeInfoCtrl', ['$scope', '$rootScope', '$translate', '$http', '$state', 'notification', 'shareData', 'lookup', 'debouncer', '$timeout', '$smartModal', 'shareWithCtrl', p2pIRExceptionTypeInfoCtrlFunc])
.controller('p2pIrAdditionalInformationCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$window', '$state', '$timeout', '$sce', p2pIrAdditionalInformationCtrlFunc]);

function p2pIRBasicDetailsCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter) {
    $scope.sendBtnConfig = { title: $translate.instant("Send") };
    $scope.cancelBtnConfig = { title: $translate.instant("Cancel") };
    $scope.topValueSectionTrack = 115;
    var inv = {
        method: 'GET',
        url: 'p2p/ir/models/createIR.json'
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
    $http(inv).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig;

        $scope.$watch('dataModel', function (n, o) {

        }, true);
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.validateForm = function () {
        RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
        RuleEngine.execute(function (e) {
            console.log(e);

        });
    };

    /* Data for supplier name of supplier deatail section start */
    $scope.supplierName = "Global Hinduja Corporation Pvt. Ltd.";

    $scope.showSupplierIcardPopup = false;
    $scope.showSupplierIcard = function () {
        $scope.showSupplierIcardPopup = true;
    }
    $scope.hideSupplierIcardPopupCallback = function () {
        $scope.showSupplierIcardPopup = false;
    };
    $scope.supplierIcard = {
        "supplierName": "kelloggs",
        "location": "Michigan, United States",
        "site": "www.kelloggs.com",
        "emailId": "Allan.Gibson@Kelloggs.com",
        "logoUrl": "",
        "primaryContact": "Allan Gibson",
        "code": "232654BB3C",
        "suppilersourcetype": "General",
        "status": "Invited",
        "businessunit": {
            "displaytext": "Business Unit",
            "selectedoption": [{ "name": "TECHNOLOGY SOLUTIONS", "check": true, "value": [{ "name": "NOVA", "check": true, "value": [{ "name": "PRODUCT MANAGEMENT GROUP", "check": true }, { "name": "USER EXPERIENCE", "check": true }, { "name": "PRODUCT TECHNOLOGY", "check": true }] }] }],
            "options": [{
                "name": "TECHNOLOGY SOLUTIONS", "check": true, "value": [{
                    "name": "NOVA", "check": true, "value": [{
                        "name": "PRODUCT MANAGEMENT GROUP", "check": true
                    }, { "name": "USER EXPERIENCE", "check": true }, { "name": "PRODUCT TECHNOLOGY", "check": true }]
                }]
            }]
        },
        "diversityStatus": {
            "displaytext": "Diversity Status",
            "selectedoption": [{ "name": "Minority Business Enterprise (MBE) - African American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Indian American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Pacific American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Hispanic American", "check": true }],
            "options": [{ "name": "Minority Business Enterprise (MBE) - African American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Indian American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Pacific American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Hispanic American", "check": true }]
        },

        "email": "Allan.Gibson@Kelloggs.com",
        "dunscode": "343-BHH-236-549-BB2",
        "suppilerrisktype": "Moderate",
        "countIndicator": [
            {
                "cardCount": "20",
                "cardTitle": "Contracts"
            },
            {
                "cardCount": "30",
                "cardTitle": "Purchase Order"
            },
            {
                "cardCount": "40",
                "cardTitle": "Requisitions"
            }
        ],

        "phone": "908-720-8526",
        "fax": "9099809988"
    };


    // Start: Tree component
    var tempBUNode_PAS = [];
    var tempPANode_PAS = [];

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

    var buObj;

    var buData = {
        method: 'GET',
        url: 'shared/popup/models/businessUnit.json'
    };

    var currentType = '',
icardPopup = false;
    $scope.showSupplierPopupIcard = function () {
        $scope.showTreePopup = false;
        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        icardPopup = true;
        $scope.showSupplierIcard();
    }
    $scope.treeOpenCallback = function (type) {

        currentType = type;
        if (type == 'bu') {
            $http(buData).then(function (response) {
                buObj = response.data;
                $scope.treeComponentConfig.listIcon = null;
                $scope.treeComponentConfig.isViewOnly = false;
                $scope.treeComponentConfig.isReadOnly = false;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
                if (tempBUNode_PAS.length) {
                    $scope.treeComponentConfig.isReadOnly = true;
                }
                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else if (type == 'PA') {
            $http(buData).then(function (response) {

                $scope.treeComponentConfig.listIcon = { message: 'Supplier Icard', name: '#icon_ContactCard', callback: $scope.showSupplierPopupIcard };
                $scope.treeComponentConfig.isViewOnly = true;
                $scope.treeComponentConfig.isReadOnly = true;
                $scope.treeComponentConfig.data = response.data;
                $scope.treeComponentConfig.title = 'PARENT CHILD HIERARCHY';
                $scope.treeComponentConfig.selectedNodes = '851750000001';
                $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else if (type == 'iCardBU') {
            $scope.showSupplierIcardPopup = false;
            $http(buData).then(function (response) {
                buObj = response.data;
                $scope.treeComponentConfig.listIcon = null;
                $scope.treeComponentConfig.isViewOnly = true;
                $scope.treeComponentConfig.isReadOnly = true;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'BUSINESS UNIT';

                $scope.treeComponentConfig.selectedNodes = '851750000001';

            });


        } else if (type == 'iCardDiversity') {
            $scope.showSupplierIcardPopup = false;
            $http(buData).then(function (response) {
                buObj = response.data;
                $scope.treeComponentConfig.listIcon = null;
                $scope.treeComponentConfig.isViewOnly = true;
                $scope.treeComponentConfig.isReadOnly = true;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'Diversity';
                $scope.treeComponentConfig.selectedNodes = '851750000001';
            });
        }
        $scope.showTreePopup = true;
    };

    $scope.onPopupHideCallback = function () {

        if (currentType == "iCardBU" || currentType == "iCardDiversity") {
            $scope.showSupplierIcardPopup = true;
        }
        $scope.showTreePopup = false;
        if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        }
        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        //$scope.treeComponentConfig.getSelections = true;
    };
    $scope.selectedBUTxt = ["Choose Business Unit"];

    $scope.selectedBUNodes = [];

    $scope.treeComponentCallback = function (e) {
        $scope.showTreePopup = false;
        icardPopup = false;
        if (currentType == 'PA') {
            tempPANode_PAS = [];
            //$scope.selectedCategoriesValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                //$scope.selectedCategoryNodes.push(e.selections[i].Name);
                tempPANode_PAS.push(e.selections[i].ID);
            }
        } else if (currentType == 'bu') {
            tempBUNode_PAS = [];
            $scope.selectedBUValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedBUNodes.push(e.selections[i].Name);
                tempBUNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedBUTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
            else if (e.selectionAllNames.length == 1)
                $scope.selectedBUTxt = [e.selectionAllNames[0]];
            else
                $scope.selectedBUTxt = ['Choose Business Unit'];
        } else
            if (currentType == "iCardBU" || currentType == "iCardDiversity") {
                $scope.showSupplierIcardPopup = true;
            }

        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
    };

    /* Data for supplier name of supplier deatail section end */

    /* Data for order number of basic deatail section start */
    $scope.orderNumOptions = [{
        "number": " PO-80.1004876",
        "name": "GEP India",
        "status": "Pending",
        "OrderDetails":[
              {
                  "LineNo": "15",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              },
              {
                  "LineNo": "15",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              }],
    }, {
        "number": " PO-80.1004985",
        "name": "GEP Hyderabad",
        "status": "Accepted",
        "OrderDetails": [
              {
                  "LineNo": "10",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              },
              {
                  "LineNo": "10",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              }]
    }, {
        "number": " PO-80.1004420",
        "name": "GEP Mumbai",
        "status": "Pending",
        "OrderDetails": [
              {
                  "LineNo": "11",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              },
              {
                  "LineNo": "11",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              }]
    }, {
        "number": " PO-80.1008526",
        "name": "GSPL Inc",
        "status": "Accepted",
        "OrderDetails": [
              {
                  "LineNo": "12",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              },
              {
                  "LineNo": "12",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              }]
    }, {
        "number": " PO-80.1001963",
        "name": "GEP Ventures",
        "status": "Accepted",
        "OrderDetails": [
              {
                  "LineNo": "12",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              },
              {
                  "LineNo": "12",
                  "Description": "Dell Laptop",
                  "ItemNo": "0001",
                  "SupplierItemNo": "98457632",
                  "UnitPrice": "100",
                  "Quantity": "100",
                  "Taxes": "Exempt",
                  "Charges": "5",
                  "ShippingCharges": "10",
                  "OtherCharges": "11",
                  "checked": false
              }]
    }];
    $scope.selectedOrderNumber = $scope.orderNumOptions[0];
    $scope.mSelectedOrder = [];
    $scope.orderDetailsPopupUrl = "p2p/ir/views/popupOrderDetails.html";
    $scope.orderDetailsPopup = false;
    $scope.orderDetailsPopupCallback = function (e) {
        setActive($scope.indexToShow);
        $scope.orderDetailsPopup = true;
    };
    $scope.hideOrderDetailsPopupCallback = function (e) {
        $scope.orderDetailsPopup = false;
    };
    $scope.indexToShow = 0;
    $scope.selectedPO = $scope.mSelectedOrder[$scope.indexToShow];
    $scope.selectedPO = {
        OrderDetails: []
    };
    function setActive(index) {
        var item;
        $scope.indexToShow = index;
        item = $scope.mSelectedOrder[index];

        if (item) {
            $scope.selectedPO.OrderDetails = [];
        };
        $timeout(function () {
            if (item) {
                $scope.selectedPO.orderId = item.orderId;
                $scope.selectedPO.number = item.number;
                $scope.selectedPO.OrderName = item.OrderName;
                $scope.selectedPO.OrderDetails = item.OrderDetails;
                $scope.selectedPO.value = item.value;
                $scope.selectedPO.ischecked = item.ischecked;
                $scope.selectedPO.counterProp1 = item.counterProp1;
            };
        });
    }

    $scope.selectedItem = function (index) {
        setActive(index);
    };


    $scope.orderReadOnlyPopupUrl = "p2p/ir/views/popupOrderReadOnly.html";
    $scope.orderReadOnlyPopup = false;
    $scope.orderReadOnlyPopupCallback = function (e) {

        $scope.orderReadOnlyPopup = true;
    };
    $scope.hideOrderReadOnlyPopupCallback = function (e) {
        $scope.orderReadOnlyPopup = false;
    };

    $scope.deleteCurrentOrder = function (current) {
        $scope.orderDetailsPopup = false;
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item ''" + $scope.selectedPO.number + "''</p>";
        var confi = {
            type: "warning",
            message: msgDetails,
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

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                //$timeout(function () {
                    $scope.mSelectedOrder.splice(current, 1)
                    $scope.mSelectedOrder = angular.copy($scope.mSelectedOrder);
                    Materialize.toast('Order deleted successfully', 2000);
                    $scope.orderDetailsPopup = true;
                    setActive(0);
                //});
            } else {
                $scope.orderDetailsPopup = true;
            }
        });
    }

    $scope.textRules = [{
        "rule": "!(/[a-z0-9._%+-/]$/.test(this))",
        "error": " "

    }];
    
    $scope.orderList = {
        'checked': false,
        'LineNo': '',
        'Description': '',
        'ItemNo': '',
        'SupplierItemNo': '',

        'UnitPrice': '',
        'Quantity': '',
        'Taxes': '',
        'Charges': ''
    };

    $scope.addCurrentOrder = function (current) {




        if ($scope.orderList.LineNo != '' && $scope.orderList.Description != '' && $scope.orderList.ItemNo != '' && $scope.orderList.SupplierItemNo != '' && $scope.orderList.UnitPrice != '' && $scope.orderList.Quantity != '' && $scope.orderList.Taxes != '' && $scope.orderList.Charges != '') {
            $scope.mSelectedOrder[current].OrderDetails.push(angular.copy($scope.orderList));
            $scope.orderList.LineNo = '';
            $scope.orderList.Description = '';
            $scope.orderList.ItemNo = '';

            $scope.orderList.SupplierItemNo = '';
            $scope.orderList.UnitPrice = '';
            $scope.orderList.Quantity = '';
            $scope.orderList.Taxes = '';
            $scope.orderList.Charges = '';


        }


    }





    $scope.addOrderLookupCallback = function (e) {
        $scope.orderDetailsPopup = false;
        orderLookup(e);
    }

    var orderLookup = function (e) {
        $scope.chkBoxObj =
                {
                    filledPartial: false,
                    checkedAll: false
                };
        $scope.filledPartial = false;
        $scope.checkedAll = false;
        var checkCount = 0;
        $scope.checkedAllTemp = function () {

            for (var item = 0; item < $scope.selectedPO.OrderDetails.length; item++) {
                if ($scope.chkBoxObj.checkedAll)
                    $scope.selectedPO.OrderDetails[item].checked = true;
                else
                    $scope.selectedPO.OrderDetails[item].checked = false;
            }
        }
        $scope.onChangePOItem = function (item) {

            //for (var item = 0; item < $scope.selectedPO.OrderDetails.length; item++)
            //{
            if (item.checked)
                checkCount++;
            else
                checkCount--;
            //}
            if (checkCount == $scope.selectedPO.OrderDetails.length) {
                $scope.chkBoxObj.checkedAll = true;
                $scope.chkBoxObj.filledPartial = false;
            }
            else {
                $scope.chkBoxObj.checkedAll = false;
                $scope.chkBoxObj.filledPartial = true;
            }
        }



    }

    /* Data for order number of basic deatail section end */


    $scope.shipToPopupUrl = "p2p/inv/views/shipToPopup.html";

    $scope.shipToPopup = false;
    $scope.shipToPopupCallback = function (e) {
        $scope.shipToPopup = true;
    };
    $scope.shipToOnHideCallback = function () {
        $scope.shipToPopup = false;
    };

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
    }];
    //comment popup.


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


    $scope.attachmentList = [{
        name: "AttachmentOne.xls",
        status: "fail",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: false
    }, {
        name: "AttachmentTwo.xls",
        status: "success",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: true
    }, {
        name: "AttachmentThree.xls",
        status: "success",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: true
    }, {
        name: "AttachmentFour.xls",
        status: "success",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: true
    }, {
        name: "AttachmentFive.xls",
        status: "success",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: true
    }];
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

    $scope.showErrorAlert = false;
    $scope.showErrorAlertMsgCont = false;
    $scope.showErrorAlertFunc = function () {
        if ($scope.showErrorAlert) {
            $scope.showErrorAlert = false;
            $timeout(function () {
                $scope.showErrorAlertMsgCont = false;
            }, 800);
        } else {
            $scope.showErrorAlert = true;
            $scope.showErrorAlertMsgCont = true;

        }
    }
    $scope.mode = $state.params.mode;
    $scope.modules = [{
        id: '0',
        name: 'REQUISITION',
        count: '3',
        number: 'REQ-2016.013110',
        url: 'requisition.html',
        isChecked: false
    }, {
        id: '2',
        name: 'ORDER',
        count: '4',
        number: 'ORD-2015.523209',
        url: 'order.html',
        isChecked: false
    }, {
        id: '3',
        name: 'INVOICE RECONCILIATION',
        count: '8',
        number: 'IR-2016.234829',
        url: 'invoice.html',
        isChecked: false
    }, ]

    $scope.modulecurrentTab = 'requisition.html';
    $scope.moduleactiveListTabs = 0;
    $scope.modulesetActiveListTab = function (menuItema) {
        $scope.moduleactiveListTabs = menuItema;
        $scope.modulecurrentTab = $scope.modules[menuItema].url;
    }


    /*Tax popup Data & Functionality starts here.*/
    $scope.isaccruedtaxes = false;
    $scope.exemptConfirmCall = function () {
        var config = {
            type: "confirm",
            message: "<div class='left-align'>This will result in deleting all the Taxes associated with the Line Item. Do you want to proceed?</div>",
            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "No",
                "result": "no"
            }]
        }
        notification.notify(config, function (response) {
            if (response.result == 'no') {
                $scope.showTaxesPopup = true;
            }
        });
    }

    $scope.addCurrent = function () {
        if ($scope.taxList.taxCode != '') {
            $scope.taxesDetailLists.push($scope.taxList);
            $scope.taxList = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': false
            };
        }
        updatePersentage();
    }

    $scope.taxesPopupUrl = "p2p/ir/views/taxesPopup.html";
    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function (isAccruedTaxes) {
        $scope.showTaxesPopup = true;
        $scope.accruedTaxes = true;
        $scope.normalTaxes = false;
        $scope.isaccruedtaxes = isAccruedTaxes;
    };
    $scope.taxesPopUpOnHideCallback = function (e) {
        $scope.showTaxesPopup = false;
        $scope.isaccruedtaxes = false;
    }

    $scope.taxList = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [{
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 1',
        'taxRate': '10',
        'showEdithCurrentPanel': false
    }, {
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 2',
        'taxRate': '68',
        'showEdithCurrentPanel': false
    }, {
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 3',
        'taxRate': '5',
        'showEdithCurrentPanel': false
    }, {
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 4',
        'taxRate': '79',
        'showEdithCurrentPanel': false
    }];

    function updatePersentage() {
        var sum = 0;
        for (var i = 0; i < $scope.taxesDetailLists.length; i++) {
            sum += parseInt($scope.taxesDetailLists[i].taxRate, 10);
        }
        $scope.totalPercentage = sum / $scope.taxesDetailLists.length;
    }
    updatePersentage();

    $scope.updatedCurrentTax = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };
    $scope.taxfocus = false;

    // popup -- Add Taxes -- grid Data -- delete current row
    $scope.delCurrent = function (current) {
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item</p>";
        var confi = {
            type: "warning",
            message: msgDetails,
            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "NO",
                "result": "no"
            }]
        };

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                Materialize.toast('Tax deleted successfully', 2000);
                updatePersentage();
            }

        });


    };

    // popup -- Add Taxes -- grid Data -- edit current row
    $scope.editCurrent = function (current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        $scope.updatedCurrentTax.taxCode = getcurrentTaxValue.taxCode;
        $scope.updatedCurrentTax.taxDetail = getcurrentTaxValue.taxDetail;
        $scope.updatedCurrentTax.taxRate = getcurrentTaxValue.taxRate;
        updatePersentage();
    };

    // popup -- Add Taxes -- grid Data -- update current row with edited value
    $scope.updatedEdited = function (current) {
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        if ($scope.updatedCurrentTax.taxCode != '') {
            getcurrentTaxValue.taxCode = $scope.updatedCurrentTax.taxCode;
            getcurrentTaxValue.taxDetail = $scope.updatedCurrentTax.taxDetail;
            getcurrentTaxValue.taxRate = $scope.updatedCurrentTax.taxRate;
            $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
            $scope.updatedCurrentTax = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': true
            };
        }
        updatePersentage();
        Materialize.toast('Tax edited Successfully', 2000);
    };

    // popup -- Add Taxes -- grid Data -- cancel editing activity
    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax = {
            'taxCode': '',
            'taxDetail': '',
            'taxRate': '',
            'showEdithCurrentPanel': true
        };
    }

    // popup -- Add Taxes -- grid Data -- apply function
    $scope.applyFn = function () {
        Materialize.toast('Tax Added Successfully', 2000);
    }

    /*Tax popup Data & Functionality ends here.*/

    $scope.sendToBuyerCallback = function () {
        var config = {
            type: "success",
            message: "<div class='left-align'>Document sent to buyer successfully.</div>",
            buttons: [{
                "title": "OK",
                "result": "ok"
            }]
        }
        notification.notify(config, function (response) {
            if (response.result == 'ok') {
                location.href = "#/landinglist?doctype=invoiceReconciliation";
            }
        });
    }

    $scope.sendToRecvCallback = function () {
        var config = {
            type: "success",
            message: "<div class='left-align'>Document sent to receiver successfully.</div>",
            buttons: [{
                "title": "OK",
                "result": "ok"
            }]
        }
        notification.notify(config, function (response) {
            if (response.result == 'ok') {
                location.href = "#/landinglist?doctype=invoiceReconciliation";
            }
        });
    }

    $scope.trackStatusPopup = false;
    $scope.trackStatusPopupCallback = function (e) {
        $scope.trackStatusPopup = true;
    };
    $scope.trackStatusOnHideCallback = function (e) {
        $scope.trackStatusPopup = false;
    };

    $scope.deleteCallback = function () {
        var config = {
            type: "confirm",
            message: "<div class='left-align'>Are you sure, you want to delete this document?</div>",
            buttons: [{
                "title": "Yes",
                "result": "yes"
            }, {
                "title": "No",
                "result": "no"
            }]
        }
        notification.notify(config, function (response) {
            if (response.result == 'yes') {
                location.href = "#/landinglist?doctype=invoiceReconciliation";
            }
        });
    }

    $scope.sendToReq = function () {
        var config = {
            type: "success",
            message: "<div class='left-align'>Document sent to requester successfully.</div>",
            buttons: [{
                "title": "OK",
                "result": "ok"
            }]
        }
        notification.notify(config, function (response) {
            if (response.result == 'ok') {
                location.href = "#/landinglist?doctype=invoiceReconciliation";
            }
        });
    }

    $scope.showPreview = function () {
        $state.go('p2p.ir.preview');
    }

    $scope.selectRequesterPopupUrl = "shared/popup/views/popupSelectRequester.html";
    $scope.selectRequesterPopup = false;
    $scope.selectRequesterPopupCallback = function () {
        $scope.selectRequesterPopup = true;
    };
    $scope.selectRequesterPopupOnHideCallback = function () {
        $scope.selectRequesterPopup = false;
    }

    $scope.optionsRequester = [
		{
		    "reqId": "1165",
		    "reqName": "Requester"
		}, {
		    "reqId": "1194",
		    "reqName": "Requester"
		}, {
		    "reqId": "1692",
		    "reqName": "Requester"
		}, {
		    "reqId": "1750",
		    "reqName": "Requester"
		}, {
		    "reqId": "1761",
		    "reqName": "Requester"
		}, {
		    "reqId": "7056",
		    "reqName": "Requester"
		}
    ];
    $scope.selectedRequester = {
        "reqId": "1165",
        "reqName": "Requester"
    };

    $scope.selectBuyerPopupUrl = "shared/popup/views/popupSelectBuyer.html";
    $scope.selectBuyerPopup = false;
    $scope.selectBuyerPopupCallback = function () {
        
        $scope.selectBuyerPopup = true;
    };
    $scope.selectBuyerPopupOnHideCallback = function () {
        $scope.selectBuyerPopup = false;
    }

    $scope.optionsBuyer = [
		{
		    "reqId": "1165",
		    "reqName": "Buyer"
		}, {
		    "reqId": "1194",
		    "reqName": "Buyer"
		}, {
		    "reqId": "1692",
		    "reqName": "Buyer"
		}, {
		    "reqId": "1750",
		    "reqName": "Buyer"
		}, {
		    "reqId": "1761",
		    "reqName": "Buyer"
		}, {
		    "reqId": "7056",
		    "reqName": "Buyer"
		}
    ];
    $scope.selectedBuyer = {
        "reqId": "1165",
        "reqName": "Buyer"
    };

    $scope.selectReceiverPopupUrl = "shared/popup/views/popupSelectReceiver.html";
    $scope.selectReceiverPopup = false;
    $scope.selectReceiverPopupCallback = function () {
        $scope.selectReceiverPopup = true;
    };
    $scope.selectReceiverPopupOnHideCallback = function () {
        $scope.selectReceiverPopup = false;
    }

    $scope.optionsReceiver = [
		{
		    "reqId": "1165",
		    "reqName": "Receiver"
		}, {
		    "reqId": "1194",
		    "reqName": "Receiver"
		}, {
		    "reqId": "1692",
		    "reqName": "Receiver"
		}, {
		    "reqId": "1750",
		    "reqName": "Receiver"
		}, {
		    "reqId": "1761",
		    "reqName": "Receiver"
		}, {
		    "reqId": "7056",
		    "reqName": "Receiver"
		}
    ];
    $scope.selectedReceiver = {
        "reqId": "1165",
        "reqName": "Receiver"
    };

    $scope.exceptionFlag = false;
    $scope.exceptionHeaderCallback = function () {
        $scope.exceptionFlag = !$scope.exceptionFlag;
    }


    // ad hoc Approvals
    $scope.adhocApprovalsPopupUrl = "shared/popup/views/popupadhocApprovals.html";
    $scope.adhocApprovalsPopup = false;
    $scope.adhocApprovals = function (e) {
        $scope.adhocApprovalsPopup = true;
    };
    $scope.adhocApprovalsOnHideCallback = function (e) {
        $scope.adhocApprovalsPopup = false;
    };

    $scope.suggestedData = [
        {
            "name": "John Doe",
            "type": "user",
            "members": "",
            "reassign": false,
            "reassignedTo": "",
            "edit": false
        },
    {
        "name": "Michael Slater",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    },
    {
        "name": "Jammie Foster",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    },
    {
        "name": "Ozborne Lopez",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    }
    ];


    $scope.autoSuggestPlaceholder = "Type Members Name";

    $scope.getCurrentSelected = {};
    $scope.selectedForApproval = [];

    $scope.deleteCurrent = function (index) {
        $scope.selectedForApproval.splice(index, 1);
        if ($scope.selectedForApproval.length == 0) {
            $scope.isMemberAdd = false;
            $scope.disabled = false;
        }
    };

    $scope.onSmartTypeHeadOpen = function () {
        $scope.adhocApprovalsPopup = false;
    }

    $scope.isMemberAdd = false;
    $scope.getCurrentSelected = [];
    $scope.selectedForApproval = [];
    $scope.pushCurrent = function (getCurrentSelected) {
        if (getCurrentSelected != undefined) {
            var curObj = getCurrentSelected[0],
                copiedObject = $.extend({}, curObj)
            if ($scope.selectedForApproval.indexOf(curObj) === -1)
                $scope.selectedForApproval.push(copiedObject);

            $scope.getCurrentSelected = [];
        }
        $scope.isMemberAdd = true;
        $scope.disabled = true;
    };

    $scope.onSmartTypeHeadClose = function (getCurrentSelected) {
        // function not wokring due to smart typeahead  not working propery

        if ($scope.getCurrentSelected != null) {
            $scope.selectedForApproval = [];
            angular.forEach(getCurrentSelected.result, function (value, key) {
                var foundItem = $filter('filter')($scope.selectedForApproval, value, true)[0];
                //get the index
                if ($scope.selectedForApproval.indexOf(foundItem) === -1)
                    $scope.selectedForApproval.push(value);
            });
        }
        $scope.adhocApprovalsPopup = true;
        $scope.isMemberAdd = true;
        $scope.disabled = true;
    }

    //End adhoc popup

    // popup -- copy req
    $scope.uiGridVisibility = false;
    $scope.showProceed = true;
    $scope.validateAccountUrl = "shared/popup/views/popupValidateBudgetSplitAccount.html";
    $scope.validateAccountPopup = false;
    $scope.validateAccountCallback = function (e) {
        $scope.validateAccountPopup = true;
        $scope.uiGridVisibility = true

    };
    $scope.validateAccountOnHideCallback = function (e) {
        $scope.validateAccountPopup = false;
    };

    $scope.hideSelection = { enableRowSelection: false, enableRowHeaderSelection: false, enablePaginationControls: false, enablePagination: false }

    $scope.validateAccountConfig = [
        {

            "field": "accountAssignment",
            "displayName": "Account Assignment",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable"
        },
        {
            "field": "splitAccount",
            "displayName": "Split Account",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "avlFunds",
            "displayName": "Available Funds (USD)",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "period",
            "displayName": "Period",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable"
        },
        {
            "field": "status",
            "displayName": "Status",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable"
        },
    ];

    $scope.validateAccountModel = [
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed",


        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        }
    ];
    
    $scope.resolutionData = [
        {
            excId: 1,
            excType: "Quantity Exception - Order",
            resolverOpt: [
                {
                    id: 1,
                    name: "Ashish"
                },
                {
                    id: 2,
                    name: "Alex"
                },
                {
                    id: 3,
                    name: "Peter"
                },
                {
                    id: 4,
                    name: "John"
                }
            ],
            selectedResolver: {
                id: 1,
                name: "Ashish"
            }
        },
        {
            excId: 2,
            excType: "Unit Price Exception",
            resolverOpt: [
                {
                    id: 1,
                    name: "Ashish"
                },
                {
                    id: 2,
                    name: "Alex"
                },
                {
                    id: 3,
                    name: "Peter"
                },
                {
                    id: 4,
                    name: "John"
                }
            ],
            selectedResolver: {
                id: 2,
                name: "Alex"
            }
        },
        {
            excId: 3,
            excType: "Item Mismatch Exception",
            resolverOpt: [
                {
                    id: 1,
                    name: "Ashish"
                },
                {
                    id: 2,
                    name: "Alex"
                },
                {
                    id: 3,
                    name: "Peter"
                },
                {
                    id: 4,
                    name: "John"
                }
            ],
            selectedResolver: {
                id: 3,
                name: "Peter"
            }
        }
    ];

    $scope.sendResolutionPopupUrl = "shared/popup/views/popupSentForResolution.html";
    $scope.showSendResolutionPopup = false;
    $scope.showSendResolutionPopupCallback = function () {
        $scope.showSendResolutionPopup = true;
    }

    $scope.hideSendResolutionPopupCallback = function () {
        $scope.showSendResolutionPopup = false;
    }

    $scope.notMineCallback = function(e){
        $scope.$broadcast ('notMineEvent');      
    }
};

function itemDetailCtrlFunc($scope, $state) {

    $scope.currentState = $state.current.name;
    $scope.materials = {
        "lineValue": {
            "itemName": "AAA",
            "itemNum": "IR-2014.000475",
            "uom": "0.00",
            "unitPrice": "0.00",
            "quantity": "0.00",
            "supItemNum": "0.00",
            "total": "0.00",
            "taxes": "Taxes",
            "taxempt": "0.00",
            "otherCharges": "0.00",
            "shippingandFreight": "0.00",
            "orderedQuantity": "0.00",
            "qtunitPrice": "0.00",
            "totalInvAmt": "0.00",
            "remainingAmount": "0.00",
            "accruedTaxes": "Accrued Taxes (USD)"
        },
        "accountTax": {
            "requester": "",
            "legalEntity": "",
            "costCenter": "",
            "projectCode": "",
            "glcode": ""
        },
        "shipping": {
            "shipTo": "London",
            "shipToAdd": "21/7 harrow, kenton, middlesex, Middleton, Alaska, 40061",
            "delivarTo": "London",
            "delivarAddress": "21/7 harrow, kenton, middlesex, Middleton, Alaska, 40061"
        },
        "other": {
            "contract": {
                "contractNum": "40061",
                "contractName": "Alaska",
                "contractExpiry": "10-12-2016",
                "contractVal": "00",
                "paymentTerms": "2"
            },
            "mf": {
                "mfName": "kenton",
                "mfPartNum": "40061"
            },
            "others": {
                "category": "Business Travel",
                "procurable": "Y"
            }
        }
    };

    $scope.services = {

        "servType": {
            "title": "Service Type",
            "selected": true
        },
        "lineValue": {

            "service": "Plumber",
            "itemNum": "0.00",
            "uom": "0.00",
            "unitPrice": "0",
            "quantity": "0",
            "servicetype": "Plumber",
            "supItemNum": "0",
            "startDate": "0",
            "endDate": "0",
            "efforts": "0",
            "total": "30.00",
            "taxes": "Taxes",
            "taxExempt": "0.00",
            "otherCharges": "0.00",
            "qtunitPrice": "0.00",
            "totalInvAmt": "0.00",
            "remainingAmount": "0.00",
            "accruedTaxes": "Accrued Taxes (USD)"
        },
        "accountTax": {
            "requester": "0",
            "legalEntity": "0",
            "businessUnit": "0",
            "costCenter": "0",
            "projectCode": "0",
            "glcode": "0"
        },
        "shipping": {

            "shipTo": "London",
            "shipToAdd": "21/7 harrow, kenton, middlesex, Middleton, Alaska, 40061",
            "delivarTo": "London",
            "delivarAddress": "21/7 harrow, kenton, middlesex, Middleton, Alaska, 40061"

        },
        "other": {
            "contract": {
                "contractNum": "0",
                "agreementName": "0",
                "contractExpiry": "0",
                "contractVal": "0",
                "paymentTerms": "0"
            },
            "service": {
                "serviceTo": "0",
                "address": "0",
                "deliver": "0",
                "deliverAddress": "0"
            },
            "others": {
                "category": "0"
            }
        }
    };

    $scope.itemDetailMaterialTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/ir/views/itemDetail-mat-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/ir/views/itemDetail-mat-accTab.html" },
		{ "title": "Shipping", "contentUrl": "p2p/ir/views/itemDetail-mat-shippingTab.html" },
		{ "title": "Others", "contentUrl": "p2p/ir/views/itemDetail-mat-othersTab.html" }
    ];
    $scope.itemDetailServiceTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/ir/views/itemDetail-serv-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/ir/views/itemDetail-serv-accTab.html" },
		{ "title": "Shipping", "contentUrl": "p2p/ir/views/itemDetail-serv-shippingTab.html" },
		{ "title": "Others", "contentUrl": "p2p/ir/views/itemDetail-serv-othersTab.html" }
    ];

    $scope.taxesPopupUrl = "p2p/ir/views/taxesPopup.html";
    $scope.categoryPopupUrl = "p2p/ir/views/categoryPopup.html";
    $scope.commentsPopupUrl = "p2p/ir/views/commentsPopup.html";
    $scope.copyPopupUrl = "p2p/ir/copyLineDetailsPopup.html";
    $scope.attachmentPopUpUrl = "p2p/ir/views/attachmentPopup.html";


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


    $scope.commentsPopupgUrl = "shared/popup/views/commentsPopup.html";
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

    $scope.$watch('ngModel.selectedOption.key', function (newVal) { });
    $scope.contractExpiry = new Date();
}

function itemDetailIRCtrlFunc($scope, notification, $translate, $sce, $http, $timeout) {
    $scope.addLines = 1;
    /********/
    /* Line Item Tax popup starts */
    $scope.isaccruedtaxes = false;
    $scope.exemptConfirmCall = function () {
        var config = {
            type: "confirm",
            message: "<div class='left-align'>This will result in deleting all the Taxes associated with the Line Item. Do you want to proceed?</div>",
            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "No",
                "result": "no"
            }]
        }
        notification.notify(config, function (response) {
            if (response.result == 'no') {
                $scope.showTaxesPopup = true;
            }
        });
    }

    $scope.addCurrent = function () {
        if ($scope.taxList.taxCode != '') {
            $scope.taxesDetailLists.push($scope.taxList);
            $scope.taxList = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': false
            };
        }
        updatePersentage();
    }

    $scope.taxesPopupUrl1 = "p2p/ir/views/taxesPopup.html";
    $scope.showTaxesPopup1 = false;
    $scope.showTaxesPopupCallback = function (isAccruedTaxes) {
        $scope.showTaxesPopup1 = true;
        $scope.isaccruedtaxes = isAccruedTaxes;
    };
    $scope.taxesPopUpOnHideCallback = function (e) {
        $scope.showTaxesPopup1 = false;
        $scope.isaccruedtaxes = false;
    }

    $scope.taxList = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [{
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 1',
        'taxRate': '10',
        'showEdithCurrentPanel': false
    }, {
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 2',
        'taxRate': '68',
        'showEdithCurrentPanel': false
    }, {
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 3',
        'taxRate': '5',
        'showEdithCurrentPanel': false
    }, {
        'taxCode': 'TAX0006119',
        'taxDetail': 'Sample Tax Description 4',
        'taxRate': '79',
        'showEdithCurrentPanel': false
    }];

    function updatePersentage() {
        var sum = 0;
        for (var i = 0; i < $scope.taxesDetailLists.length; i++) {
            sum += parseInt($scope.taxesDetailLists[i].taxRate, 10);
        }
        $scope.totalPercentage = sum / $scope.taxesDetailLists.length;
    }
    updatePersentage();

    $scope.updatedCurrentTax = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };
    $scope.taxfocus = false;

    // popup -- Add Taxes -- grid Data -- delete current row
    $scope.delCurrent = function (current) {
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item</p>";
        var confi = {
            type: "warning",
            message: msgDetails,
            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "NO",
                "result": "no"
            }]
        };

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                Materialize.toast('Tax deleted successfully', 2000);
                updatePersentage();
            }

        });


    };

    // popup -- Add Taxes -- grid Data -- edit current row
    $scope.editCurrent = function (current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        $scope.updatedCurrentTax.taxCode = getcurrentTaxValue.taxCode;
        $scope.updatedCurrentTax.taxDetail = getcurrentTaxValue.taxDetail;
        $scope.updatedCurrentTax.taxRate = getcurrentTaxValue.taxRate;
        updatePersentage();
    };

    // popup -- Add Taxes -- grid Data -- update current row with edited value
    $scope.updatedEdited = function (current) {
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        if ($scope.updatedCurrentTax.taxCode != '') {
            getcurrentTaxValue.taxCode = $scope.updatedCurrentTax.taxCode;
            getcurrentTaxValue.taxDetail = $scope.updatedCurrentTax.taxDetail;
            getcurrentTaxValue.taxRate = $scope.updatedCurrentTax.taxRate;
            $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
            $scope.updatedCurrentTax = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': true
            };
        }
        updatePersentage();
        Materialize.toast('Tax edited Successfully', 2000);
    };

    // popup -- Add Taxes -- grid Data -- cancel editing activity
    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax = {
            'taxCode': '',
            'taxDetail': '',
            'taxRate': '',
            'showEdithCurrentPanel': true
        };
    }

    // popup -- Add Taxes -- grid Data -- apply function
    $scope.applyFn = function () {
        Materialize.toast('Tax Added Successfully', 2000);
    }
    /*Line Item Tax popup ends */


    $scope.selectedtemplate = function (current) {
        $scope.$emit('showTemplate', { showTemp: current });
    }

    $scope.ngModel = $scope.ngModel.data;

    $scope.itemDetailIRMaterialTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/ir/views/itemDetail-mat-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/ir/views/itemDetail-mat-accTab.html" }
    ];

    $scope.itemDetailReqServiceTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/inv/views/itemDetail-serv-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/inv/views/itemDetail-serv-accTab.html" }
    ];

    $scope.importLineItemsTabDataset = [
		{ "title": "Requisition", "contentUrl": "p2p/inv/views/importLineItemsReqTab.html", "active": true },
		{ "title": "Templates", "contentUrl": "p2p/inv/views/importLineItemsTemplTab.html" }
    ];

    $scope.isTemplateSelected = [];
    $scope.templateLists =
        [{ 'title': 'TEMPLATE 1', 'isChecked': false },
            { 'title': 'TEMPLATE 2', 'isChecked': false },
            { 'title': 'TEMPLATE 3', 'isChecked': false }
        ];


    $scope.categoryPopupUrl = "p2p/req/views/categoryPopup.html";
    $scope.commentsPopupUrl = "p2p/req/views/commentsPopup.html";
    $scope.copyPopupUrl = "p2p/req/views/copyLineDetailsPopup.html";
    $scope.attachmentPopUpUrl = "p2p/req/views/attachmentPopup.html";
    $scope.approverPopupUrl = "shared/popup/views/popupApprover.html";
    $scope.shipToPopupUrl = "p2p/req/views/shipToPopup.html";
    $scope.excTypePopupUrl = "shared/popup/views/popupExcType.html";

    //Exception Type popup callback: start
    $scope.showExcTypePopup = false;
    $scope.showExcTypePopupCallBack = function (e) {
        $scope.showExcTypePopup = true;
    }
    $scope.hideExcTypePopupCallback = function (e) {
        $scope.showExcTypePopup = false;
    }
    //Exception Type popup callback: end


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

    //UI grid -- Line Items Data
    $scope.itemConfig = [
    {
        "field": "lineNumber",
        "width": 110,
        "displayName": "Line Number",
        "isFixed": "Left",
        "isVisible": true,
        "isReadOnly": true,
        "autoIncrement": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
        "attributes": {
            "type": "number"
        }
    },
    {
        "field": "orderNumber",
        "width": 120,
        "displayName": "Order Number",
        "isFixed": "Left",
        "isVisible": true,
        "isReadOnly": false,
        "autoIncrement": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "orderLineNumber",
        "width": 100,
        "displayName": "Order Line Number",
        "isFixed": "Left",
        "isVisible": true,
        "isReadOnly": true,
        "autoIncrement": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
        "attributes": {
            "type": "number"
        }
    }, {
        "field": "lineType.key",
        "width": 120,
        "displayName": "Line Type",
        "isFixed": "Left",
        "isVisible": true,
        "isReadOnly": false,
        "autoIncrement": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "itemNumber",
        "width": 150,
        "displayName": "Item Number",
        "isFixed": "Left",
        "isVisible": true,
        "isReadOnly": true,
        "autoIncrement": false,
        "filterObject": {
            "enableFiltering": true
        },
        "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate'>{{row.entity.itemNumber}}</span><a class='ui-grid-cell-container-icons' href='javascript:void(0)' ng-click='grid.appScope.$parent.$parent.$parent.showExcTypePopupCallBack()'><i class='icon iconSmall blue-text' smart-tooltip message='Exception Type' position='bottom' delay='50'><svg><use xlink:href='#icon_Warning'></use></svg></i></a></div>"
    }, {
        "field": "description",
        "width": 200,
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
        "field": "orderName",
        "width": 160,
        "displayName": "Order Name",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "orderContact",
        "width": 150,
        "displayName": "Order Contact",
        "isVisible": true,
        "isReadOnly": true,
        "autoIncrement": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
    }, {
        "field": "orderLocation",
        "width": 150,
        "displayName": "Order Location",
        "isVisible": true,
        "isReadOnly": true,
        "autoIncrement": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
    },
    {
        "field": "supplierName.name",
        "width": 150,
        "displayName": "Supplier Name",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "supplierItemNumber",
        "width": 190,
        "displayName": "Supplier Item Number",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "category.name",
        "width": 150,
        "displayName": "Category",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "popup",
        "attributes": {
            "type": "category",
            "defaultTitle": "Select"
        }
    }, {
        "field": "qtyEfforts",
        "width": 150,
        "displayName": "Quantity/Efforts",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
        "attributes": {
            "type": "number"
        }
    }, {
        "field": "uom.name",
        "name": "uom.name",
        "width": 150,
        "displayName": "UOM",
        "isVisible": true,
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
    }, {

        "field": "startDate",
        "width": 150,
        "displayName": "Start Date",
        "isMandatory": true,
        "isVisible": true,
        "attributes": {
            "type": "date",
            "format": "dd/MM/yyyy"
        },
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
    },
     {
        "field": "endDate",
        "width": 150,
        "displayName": "End Date",
        "isMandatory": true,
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
        "attributes": {
            "type": "date",
            "format": "dd/MM/yyyy"
        }
    }, {
        "field": "unitPrice",
        "width": 150,
        "filterObject": {
            "enableFiltering": true
        },
        "displayName": "Unit Price (USD)",
        "type": "editable",
        "attributes": {
            "type": "number"
        }
    }, {
        "field": "taxes",
        "width": 150,
        "displayName": "Taxes (USD)",
        "isRegFocusCol": true,
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "attributes": {
            "type": "showTaxesPopupCallback",
            "defaultTitle": "EXEMPT"
        },
        "type": "popup",
    }, {
        "name": "otherCharges",
        "width": 175,
        "displayName": "Other Charges (USD)",
        "isVisible": true,
        "attributes": {
            "rule": "row.entity.unitPrice / 20",
            "type": "number"

        },
        "filterObject": {
            "enableFiltering": true
        },
        "type": "calculated"
    }, {
        "field": "shippingFreight",
        "width": 210,
        "displayName": "Shipping & Freight (USD)",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "accruedtaxes",
        "width": 150,
        "displayName": "Accrued Taxes (USD)",
        "isRegFocusCol": true,
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "attributes": {
            "type": "showTaxesPopupCallback",
            "defaultTitle": "0.00",
            "type": "number"
        },
        "type": "popup",
    }, {
        "field": "total",
        "width": 150,
        "displayName": "Total (USD)",
        "isVisible": true,
        "attributes": {
            "rule": "row.entity.unitPrice * row.entity.qtyEfforts",
            "type": "number"
        },
        "filterObject": {
            "enableFiltering": true
        },
        "type": "calculated"
    }, {
        "field": "requestedDate",
        "width": 160,
        "displayName": "Requested Date",
        "isVisible": false,
        "attributes": {
            "type": "date",
            "format": "dd/MM/yyyy"
        },
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "needByDate",
        "width": 160,
        "displayName": "Need by Date",
        "isVisible": true,
        "attributes": {
            "type": "date",
            "format": "dd/MM/yyyy"
        },
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "shippingMethod",
        "width": 160,
        "displayName": "Shipping Method",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "shipTo.name",
        "width": 210,
        "displayName": "Ship to/Work Location",
        "isVisible": true,
        "isRegFocusCol": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "dropdown",
        "attributes": {
            "model": "type",
            "dataKey": "name",
            "options": [{
                "code": "Mum",
                "name": "Mumbai"
            }, {
                "code": "Hyd",
                "name": "Hyderabad"
            }, {
                "code": "USA",
                "name": "USA"
            }]
        }
    }, {
        "field": "shipTo.address",
        "width": 210,
        "displayName": "Ship to/Work Address",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "deliverTo",
        "width": 160,
        "displayName": "Deliver to",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "deliverLocation",
        "width": 160,
        "displayName": "Deliver Location",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    },

    {
        "field": "procurementOption",
        "width": 210,
        "displayName": "Procurement Option",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "inventoryType",
        "width": 150,
        "displayName": "Inventory Type",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "matching",
        "width": 150,
        "displayName": "Matching",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "supplierCode",
        "width": 150,
        "displayName": "Supplier Code",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "supplierContact",
        "width": 150,
        "displayName": "Supplier Contact",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "manufacturer",
        "width": 180,
        "displayName": "Manufacturer Name",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "manufacturerDetails",
        "width": 230,
        "displayName": "Manufacturer Details",
        "isRegFocusCol": true,
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "attributes": {
            "type": "manufatureDetailsCallback",
            "defaultTitle": "EXEMPT"
        },
        "type": "popup",
    }, {
        "field": "manufacturerPartNumber",
        "width": 230,
        "displayName": "Manufacturer Datails",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "contractNumber",
        "width": 150,
        "displayName": "Contract Number",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "contractName",
        "width": 150,
        "displayName": "Contract Name",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "contractExpiryDate",
        "width": 200,
        "displayName": "Contract Expiry Date",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "contractValue",
        "width": 150,
        "displayName": "Contract Value",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "paymentTerms",
        "width": 160,
        "displayName": "Payment Terms",
        "isVisible": false,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "spLink",
        "width": 230,
        "displayName": "Standards/Procedures",
        "isRegFocusCol": true,
        "attributes": {
            "type": "spLink",
            "defaultTitle": "ADD S&P"
        },
        "filterObject": {
            "enableFiltering": true
        },
        "type": "popup"
    }, {
        "field": "addiInfo",
        "width": 230,
        "displayName": "Additional Information",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": false
        },
        "enableCellEdit": false,
        "cellTemplate": "<a ui-sref='p2p.ir.additionalInfo({id: {{row.entity.lineNumber}} })'> <span ng-if='row.entity.lineNumber == 1'>Add</span>  <span ng-if='row.entity.lineNumber != 1'>Edit </span> ({{row.entity.additionaInformation.length}})</a>"
    }, {
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
        "spLink": "3 S&PS",
        "comment": "3 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 1,
        "lineType": {
            "id": 1,
            "name": "P2P_REQ_Material",
            "key": "Material"
        },
        "itemNumber": "0001",
        "description": "Dell Laptop",
        "supplierName": {
            "id": 6349,
            "name": "CTPG OPERATING LLC"
        },
        "orderNumber": "PO-80.1004867",
        "orderLineNumber": "14",
        "orderName": "Dell Laptop",
        "orderContact": "29467587",
        "orderLocation": "Mumbai",
        "deliverTo": "USA",
        "deliverLocation": "New York",

        "supplierItemNumber": "supplier Item Number",
        "category": {
            "id": 631550000849,
            "name": "BUSINESS TRAVEL"
        },
        "qtyEfforts": 100,
        "uom": {
            "code": "EA",
            "name": "Each"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxes": "26.3",
        "accruedtaxes": "33.23",
        "otherCharges": 0,
        "shippingFreight": "Shipping & Freight",
        "requestedDate": "/Date(1457029800000)/",
        "needByDate": "/Date(1457029800000)/",
        "shippingMethod": "Best Available",
        "shipTo": {
            "id": 1,
            "name": "Mumbai",
            "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
        },
        
        "procurementOption": "Procurement Option",
        "inventoryType": false,
        "matching": false,
        "supplierCode": "09798",
        "supplierContact": "john@gep.com",
        "manufacturer": null,
        "manufacturerPartNumber": null,
        "manufacturerDetails": "Manufacturer Details",
        "contractNumber": "2015.000009",
        "contractName": "conctract for Laptop",
        "contractExpiryDate": "2015-01-16T18:30:00.000Z",
        "contractValue": 0,
        "paymentTerms": "net 30",
        "$$hashKey": "uiGrid-0012",
        "additionaInformation": [{
            "title": "Dell Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "Question 1",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Lenovo Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Asus Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "IBM Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }]
    }, {
        "spLink": "2 S&PS",
        "comment": "4 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 2,
        "lineType": {
            "id": 1,
            "name": "P2P_REQ_Material",
            "key": "Variable Service"
        },
        "itemNumber": "0002",
        "description": "Lenovo Laptop",
        "supplierName": {
            "id": 6349,
            "name": "CTPG OPERATING LLC"
        },
        "orderNumber": "PO-80.1004867",
        "orderLineNumber": "14",
        "orderName": "Dell Laptop",
        "orderContact": "29467587",
        "orderLocation": "Mumbai",
        "deliverTo": "USA",
        "deliverLocation": "New York",
        "supplierItemNumber": "supplier Item Number",
        "category": {
            "id": 631550000849,
            "name": "BUSINESS TRAVEL"
        },
        "qtyEfforts": 100,
        "uom": {
            "code": "EA",
            "name": "Each"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxes": "55.15",
        "accruedtaxes": "18.22",
        "otherCharges": 0,
        "shippingFreight": "Shipping & Freight",
        "requestedDate": "/Date(1457029800000)/",
        "needByDate": "/Date(1457029800000)/",
        "shippingMethod": "Best Available",
        "shipTo": {
            "id": 1,
            "name": "Mumbai",
            "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
        },
        
        "procurementOption": "Procurement Option",
        "inventoryType": false,
        "matching": false,
        "supplierCode": "09798",
        "supplierContact": "john@gep.com",
        "manufacturer": null,
        "manufacturerPartNumber": null,
        "manufacturerDetails": "Manufacturer Details",
        "contractNumber": "2015.000009",
        "contractName": "conctract for Laptop",
        "contractExpiryDate": "2015-01-16T18:30:00.000Z",
        "contractValue": 0,
        "paymentTerms": "net 30",
        "$$hashKey": "uiGrid-0012",
        "additionaInformation": [{
            "title": "Dell Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "Question 1",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Lenovo Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Asus Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "IBM Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }]
    }, {
        "spLink": "5 S&PS",
        "comment": "6 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 3,
        "lineType": {
            "id": 1,
            "name": "P2P_REQ_Material",
            "key": "Fixed Service"
        },
        "itemNumber": "0003",
        "description": "Asus Laptop",
        "supplierName": {
            "id": 6349,
            "name": "CTPG OPERATING LLC"
        },
        "orderNumber": "PO-80.1004867",
        "orderLineNumber": "14",
        "orderName": "Dell Laptop",
        "orderContact": "29467587",
        "orderLocation": "Mumbai",
        "deliverTo": "USA",
        "deliverLocation": "New York",
        "supplierItemNumber": "supplier Item Number",
        "category": {
            "id": 631550000849,
            "name": "BUSINESS TRAVEL"
        },
        "qtyEfforts": 100,
        "uom": {
            "code": "EA",
            "name": "Each"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxes": "62.35",
        "accruedtaxes": "25.75",
        "otherCharges": 0,
        "shippingFreight": "Shipping & Freight",
        "requestedDate": "/Date(1457029800000)/",
        "needByDate": "/Date(1457029800000)/",
        "shippingMethod": "Best Available",
        "shipTo": {
            "id": 1,
            "name": "Mumbai",
            "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
        },
        
        "procurementOption": "Procurement Option",
        "inventoryType": false,
        "matching": false,
        "supplierCode": "09798",
        "supplierContact": "john@gep.com",
        "manufacturer": null,
        "manufacturerPartNumber": null,
        "manufacturerDetails": "Manufacturer Details",
        "contractNumber": "2015.000009",
        "contractName": "conctract for Laptop",
        "contractExpiryDate": "2015-01-16T18:30:00.000Z",
        "contractValue": 0,
        "paymentTerms": "net 30",
        "$$hashKey": "uiGrid-0012",
        "additionaInformation": [{
            "title": "Dell Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "Question 1",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Lenovo Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Asus Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "IBM Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }]
    }, {
        "spLink": "6 S&PS",
        "comment": "2 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 4,
        "lineType": {
            "id": 1,
            "name": "P2P_REQ_Material",
            "key": "Milestone Payment"
        },
        "itemNumber": "0004",
        "description": "Intel Laptop",
        "supplierName": {
            "id": 6349,
            "name": "CTPG OPERATING LLC"
        },
        "orderNumber": "PO-80.1004867",
        "orderLineNumber": "14",
        "orderName": "Dell Laptop",
        "orderContact": "29467587",
        "orderLocation": "Mumbai",
        "deliverTo": "USA",
        "deliverLocation": "New York",
        "supplierItemNumber": "supplier Item Number",
        "category": {
            "id": 631550000849,
            "name": "BUSINESS TRAVEL"
        },
        "qtyEfforts": 100,
        "uom": {
            "code": "EA",
            "name": "Each"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxes": "48.12",
        "accruedtaxes": "38.42",
        "otherCharges": 0,
        "shippingFreight": "Shipping & Freight",
        "requestedDate": "/Date(1457029800000)/",
        "needByDate": "/Date(1457029800000)/",
        "shippingMethod": "Best Available",
        "shipTo": {
            "id": 1,
            "name": "Mumbai",
            "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
        },
        
        "procurementOption": "Procurement Option",
        "inventoryType": false,
        "matching": false,
        "supplierCode": "09798",
        "supplierContact": "john@gep.com",
        "manufacturer": null,
        "manufacturerPartNumber": null,
        "manufacturerDetails": "Manufacturer Details",
        "contractNumber": "2015.000009",
        "contractName": "conctract for Laptop",
        "contractExpiryDate": "2015-01-16T18:30:00.000Z",
        "contractValue": 0,
        "paymentTerms": "net 30",
        "$$hashKey": "uiGrid-0012",
        "additionaInformation": [{
            "title": "Dell Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "Question 1",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Lenovo Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Asus Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "IBM Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }]
    }, {
        "spLink": "ADD S&P",
        "comment": "Add Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 5,
        "lineType": {
            "id": 1,
            "name": "P2P_REQ_Material",
            "key": "Progress Payment"
        },
        "itemNumber": "0005",
        "description": "IBM Laptop",
        "supplierName": {
            "id": 6349,
            "name": "CTPG OPERATING LLC"
        },
        "orderNumber": "PO-80.1004867",
        "orderLineNumber": "14",
        "orderName": "Dell Laptop",
        "orderContact": "29467587",
        "orderLocation": "Mumbai",
        "deliverTo": "USA",
        "deliverLocation": "New York",
        "supplierItemNumber": "supplier Item Number",
        "category": {
            "id": 631550000849,
            "name": "BUSINESS TRAVEL"
        },
        "qtyEfforts": 100,
        "uom": {
            "code": "EA",
            "name": "Each"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxes": "40.44",
        "accruedtaxes": "17.5",
        "otherCharges": 0,
        "shippingFreight": "Shipping & Freight",
        "requestedDate": "/Date(1457029800000)/",
        "needByDate": "/Date(1457029800000)/",
        "shippingMethod": "Best Available",
        "shipTo": {
            "id": 1,
            "name": "Mumbai",
            "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
        },
        
        "procurementOption": "Procurement Option",
        "inventoryType": false,
        "matching": false,
        "supplierCode": "09798",
        "supplierContact": "john@gep.com",
        "manufacturer": null,
        "manufacturerPartNumber": null,
        "manufacturerDetails": "Manufacturer Details",
        "contractNumber": "2015.000009",
        "contractName": "conctract for Laptop",
        "contractExpiryDate": "2015-01-16T18:30:00.000Z",
        "contractValue": 0,
        "paymentTerms": "net 30",
        "$$hashKey": "uiGrid-0012",
        "additionaInformation": [{
            "title": "Dell Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "Question 1",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Lenovo Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "Asus Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }, {
            "title": "IBM Laptop",
            "showContent": false,
            "data": [{
                "id": 1,
                "sectionName": "",
                "questions": [{
                    "question": "Work Order Type",
                    "type": "textfield",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "ERP Order Number ",
                    "type": "radio",
                    "questionResponse": "",
                    "options": [{
                        "code": "A",
                        "name": "Option A"
                    }, {
                        "code": "B",
                        "name": "Option B"
                    }]
                }, {
                    "question": "",
                    "type": "checkbox",
                    "questionResponse": "",
                    "options": [{
                        "label": "Urgent",
                        "data": ""
                    }]
                }, {
                    "question": "Item Description",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }, {
                    "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                    "type": "textarea",
                    "questionResponse": "",
                    "options": []
                }]
            }]
        }]
    }];

    //UI grid -- Accounting Data
    $scope.accountingConfig = [
    {
        "field": "lineNumber",
        "width": 110,
        "displayName": "Line Number",
        "isFixed": "Left",
        "isVisible": true,
        "isReadOnly": true,
        "autoIncrement": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable",
        "attributes": {
            "type": "number"
        }
    }, {
        "field": "buyerItemNumber",
        "width": 112,
        "displayName": "Item Number",
        "isFixed": "Left",
        "isVisible": true,
        "isReadOnly": true,
        "autoIncrement": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "description",
        "width": 200,
        "displayName": "Description",
        "isFixed": "Left",
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "type": "editable"
    }, {
        "field": "splitNumber",
        "width": 110,
        "displayName": "Split Number",
        "isFixed": "Left",
        "isRegFocusCol": true,
        "isVisible": true,
        "filterObject": {
            "enableFiltering": true
        },
        "attributes": {
            "type": "splitNumber",
            "defaultTitle": "SPLITS"
        },
        "type": "popup"
    },

        {
            "field": "quantity",
            "width": 150,
            "displayName": "Quantity",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        }, {
            "field": "uom.name",
            "width": 150,
            "displayName": "UOM",
            "isVisible": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }, {
            "field": "splitTaxes",
            "width": 230,
            "displayName": "Split Taxes & Charges (USD)",
            "isVisible": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        }, {
            "field": "taxes",
            "width": 100,
            "displayName": "Taxes",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        }, {
            "field": "splitValues",
            "width": 150,
            "displayName": "Split Value (USD)",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        }, {
            "field": "splittotal",
            "width": 150,
            "displayName": "Split Total (USD)",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        }, {
            "field": "requester.name",
            "width": 150,
            "displayName": "Requester",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }, {
            "field": "corporation.name",
            "width": 150,
            "displayName": "Corporation",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }, {
            "field": "bu.name",
            "width": 150,
            "displayName": "Cost Center",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }, {
            "field": "account.name",
            "width": 150,
            "displayName": "Account Number",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }, {
            "field": "project.name",
            "width": 170,
            "displayName": "Project Number",
            "isVisible": true,
            "autoIncrement": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }
    ];
    $scope.accountingModel = [
    {
        "splitNumber": "Split 1",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 189,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 2500,
        "splittotal": 2500,
        "quantity": 100,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "001"
        },
        "quantity": 25,
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
        "buyerItemNumber": "001",
        "description": "Dell Laptop",
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
            "lineNumber": 2,
            "type": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "buyerItemNumber": "002",
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 2",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 145,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 3000,
        "splittotal": 3000,
        "quantity": 78,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "001"
        },
        "quantity": 30,
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
        "buyerItemNumber": "001",
        "description": "Dell Laptop",
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
                "name": "001"
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
            "buyerItemNumber": "004",
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 3",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 23,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 2000,
        "splittotal": 2000,
        "quantity": 445,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "001"
        },
        "quantity": 20,
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
        "buyerItemNumber": "001",
        "description": "Dell Laptop",
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
                "name": "001"
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
            "buyerItemNumber": "006",
            "description": "Intel Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 4",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 12,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 2500,
        "splittotal": 2500,
        "quantity": 100,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "001"
        },
        "quantity": 25,
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
        "buyerItemNumber": "001",
        "description": "Dell Laptop",
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
                "name": "001"
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
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 1",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 2,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 5000,
        "splittotal": 5000,
        "quantity": 100,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "002"
        },
        "quantity": 50,
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
        "buyerItemNumber": "002",
        "description": "Lenovo Laptop",
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
            "buyerItemNumber": "009",
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 2",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 2,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 10000,
        "splittotal": 10000,
        "quantity": 100,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "002"
        },
        "quantity": 100,
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
        "buyerItemNumber": "002",
        "description": "Lenovo Laptop",
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
            "buyerItemNumber": "002",
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 1",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 3,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 10000,
        "splittotal": 10000,
        "quantity": 100,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "003"
        },
        "quantity": 100,
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
        "buyerItemNumber": "003",
        "description": "Asus Laptop",
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
            "lineNumber": 2,
            "type": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "buyerItemNumber": "002",
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 1",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 4,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 10000,
        "splittotal": 10000,
        "quantity": 100,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "004"
        },
        "quantity": 100,
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
        "buyerItemNumber": "004",
        "description": "Intel Laptop",
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
            "lineNumber": 2,
            "type": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "buyerItemNumber": "002",
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    },
    {
        "splitNumber": "Split 1",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 5,
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 10000,
        "splittotal": 10000,
        "quantity": 100,
        "requester": {
            "code": "63150040000001",
            "name": "RiteAid Admin"
        },
        "corporation": {
            "code": "19686386",
            "name": "Rite Aid HQ Corporation"
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
            "name": "005"
        },
        "quantity": 100,
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
        "buyerItemNumber": "005",
        "description": "IBM    Laptop",
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
            "lineNumber": 2,
            "type": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "buyerItemNumber": "002",
            "description": "Lenovo Laptop",
            "splitType": 0,
            "itemQuantity": 1,
            "unitPrice": 6,
            "shippingCharges": 0,
            "taxes": 0,
            "otherCharges": 0,
            "$$treeLevel": 0,
            "$$hashKey": "uiGrid-00KJ"
        }],
        "$$hashKey": "uiGrid-0012"
    }];


    /* Line Items manage columns start */
    $scope.manageColumns = function () {
        $scope.fields = [];
        $scope.fields = [{
            'lable': 'Requested Date',
            'selected': true
        }, {
            'lable': 'Shipping Method',
            'selected': true
        }, {
            'lable': 'Procurement Option',
            'selected': true
        }, {
            'lable': 'Inventory Type',
            'selected': true
        }, {
            'lable': 'Matching',
            'selected': true
        }, {
            'lable': 'Supplier Code',
            'selected': true
        }, {
            'lable': 'Supplier Contact',
            'selected': true
        }, {
            'lable': 'Manufacturer Name',
            'selected': true
        }, {
            'lable': 'Manufacturer P...',
            'selected': true
        }, {
            'lable': 'Contract Name',
            'selected': true
        }, {
            'lable': 'Contract Expiry Date',
            'selected': true
        }, {
            'lable': 'Contract Value',
            'selected': true
        }, {
            'lable': 'Payment Terms',
            'selected': true
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
        'selection': true
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
    /* Line Items manage columns end */

    /* Line Item Category column start */
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

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/category.json'
    };

    var buData = {
        method: 'GET',
        url: 'shared/popup/models/businessUnit.json'
    };

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
                $scope.treeComponentConfig.title = 'Region';
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

    $scope.onPopupHideCallback = function () {
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        } else if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        } else if (currentType == 'region') { }
        //$scope.treeComponentConfig.getSelections = true;
    };

    $scope.selectedCategoriesTxt = "Choose Category";
    $scope.selectedBUTxt = "Choose Business Unit";
    $scope.selectedRegionTxt = "Choose Region";

    $scope.selectedCategoriesValidate = false;
    $scope.selectedBUValidate = false;
    $scope.selectedRegionValidate = false;

    $scope.selectedCategoryNodes = [];
    $scope.selectedBUNodes = [];
    $scope.selectedRegionNodes = [];

    $scope.treeComponentCallback = function (e) {

        if (currentType == 'category') {
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
                $scope.selectedCategoriesTxt = 'Choose Category';
        } else if (currentType == 'bu') {
            tempBUNode_PAS = [];
            $scope.selectedBUValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedBUNodes.push(e.selections[i].Name);
                tempBUNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedBUTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.selectedBUTxt = e.selectionAllNames[0];
            else
                $scope.selectedBUTxt = 'Choose Category';
        } else if (currentType == 'region') {
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
    /* Line Item Category column end */

    /* Line Item comments popup start */
    $scope.approverPopupUrl = "shared/popup/views/popupApprover.html";
    $scope.approverPopup = false;
    $scope.approverPopupCallback = function (e) {
        $scope.approverPopup = true;
    };
    $scope.approverOnHideCallback = function () {
        $scope.approverPopup = false;
    };
    $scope.modulecurrentTab = 'requisition.html';
    $scope.withoutTabSelect = true;
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

    $scope.showCommentsGridPopup = false;
    $scope.showCommentsGridPopupCallback = function () {
        $scope.showCommentsGridPopup = true;
    };
    $scope.commentsGridPopUpOnHideCallback = function (e) {
        $scope.showCommentsGridPopup = false;
        $scope.commentIcon = '#icon_Commented'; //icon_Comments
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
    }];
    /* Line Item comments popup end */

    /* Line Item Standards/Procedures popup start */
    $scope.showGridSandPPopup = false;
    $scope.showGridSandPCallback = function () {
        $scope.showGridSandPPopup = true;
    };
    $scope.showGridSandPPopupHideCallback = function (e) {
        $scope.showGridSandPPopup = false;
    };

    $scope.spData = [{
        id: "sp1",
        title: "Purchase Order Terms 1",
        codeRev: "PO TERMS/011",
        fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
        isChecked: false
    }, {
        id: "sp2",
        title: "Purchase Order Terms 2",
        codeRev: "PO TERMS/012",
        fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
        isChecked: false
    }, {
        id: "sp3",
        title: "Purchase Order Terms 3",
        codeRev: "PO TERMS/013",
        fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
        isChecked: false
    }, {
        id: "sp4",
        title: "Purchase Order Terms 4",
        codeRev: "PO TERMS/014",
        fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
        isChecked: false
    }];
    $scope.indexToShow = 0;
    $scope.selectedSandP = $scope.spData[$scope.indexToShow];

    function setActive(index) {
        $scope.indexToShow = index;
        $scope.selectedSandP = $scope.spData[index];
    }

    $scope.selectedItem = function (index) {
        setActive(index);
    };
    $scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
    $scope.showSPPopup = false;
    $scope.showSPPopupCall = function () {
        $scope.showGridSandPPopup = false;
        $scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
        $scope.selectedSP = {};
        $scope.showSPPopup = true;
    }
    $scope.hideSPPopupCall = function (e) {
        $scope.showGridSandPPopup = true;
        $scope.showSPPopup = false;
    }
    $scope.editSandPGridCall = function (spObj) {
        $scope.showGridSandPPopup = false;
        $scope.titleSandPPopup = "EDIT STANDARD AND PROCEDURE";
        $scope.selectedSP = spObj;
        $scope.showSPPopup = true;
        $scope.isEditMode = true;
    }
    // popup -- manufacturer details -- express list -- grid Data

    $scope.expressLists = [{
        itemNumber: 'dell',
        name: '123-342-232',
        modelNo: '123',
        actionIconDelete: true
    }, {
        itemNumber: 'Lenovo',
        name: '345-342-354',
        modelNo: '456',
        actionIconDelete: true
    }, {
        itemNumber: 'dell',
        name: '636-436-236',
        modelNo: '789',
        actionIconDelete: true
    }, {
        itemNumber: 'Lenovo',
        name: '428-472-344',
        modelNo: '912',
        actionIconDelete: true
    }, {
        itemNumber: 'Sumsung',
        name: '288-2898-889',
        modelNo: '345',
        actionIconDelete: true,
        actionIconAdd: true
    }];

    // popup -- manufacturer details -- express list -- grid Data -- remove the row specified in index
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

    // popup -- manufacturer details -- express list -- grid Data -- add a row in the array
    $scope.addRow = function () {
        $scope.expressLists[$scope.expressLists.length - 1].actionIconAdd = false;
        $scope.expressLists.unshift({
            itemNumber: '',
            name: '',
            modelNo: '',
            actionIconAdd: true,
            actionIconDelete: true
        });

        var count = $scope.splitList.length + 1;
        $scope.splitList.unshift({
            splitNumber: count,
            splitValue: '00',
            actionIconDelete: true
        });
    };
    /* Line Item Standards/Procedures popup end */

    /* UI Grid -- popup callback start */
    $scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive

        // UI Grid -- popup callback -- category papup

        if (def.col && def.col.displayName == 'Category') {
            $scope.treeOpenCallback('category');
        }
        // UI Grid -- popup callback -- taxes papup
        if (def.col && def.col.field == 'taxes') {
            $scope.accruedTaxes = false;
            $scope.normalTaxes = true;
            $scope.showTaxesPopup1 = true;
            $scope.$emit('openTaxPopup', {
                showTaxPopup: true,
                isaccruedtaxes: false
            })

        }

        if (def.col && def.col.field == 'accruedtaxes') {
            $scope.accruedTaxes = true;
            $scope.normalTaxes = false;
            $scope.showTaxesPopup1 = true;
            $scope.$emit('openTaxPopup', {
                showTaxPopup: true,
                isaccruedtaxes: false
            })
        }
        // UI Grid -- popup callback -- manufacturer details papup
        if (def.col && def.col.field == 'manufacturerDetails') {

            $scope.manufatureDetailsPopup = true;
        }

        if (def.col && def.col.field == 'AddInfo') {

            $scope.AddChargesinfoPopup = true;
            $scope.forEditColumnObj = def;
            if (def.row.entity.AddInfo != def.col.colDef.attributes.defaultTitle) {
                $scope.addInfoPopupText = def.row.entity.AddInfo;
            } else {
                $scope.addInfoPopupText = "";
            }
        }

        if (def.col && def.col.field == 'AddInfoAttach') {

            $scope.AddChargesAttachPopup = true;
            $scope.forEditColumnObj = def;
            if (def.row.entity.AddInfoAttach != def.col.colDef.attributes.defaultTitle) {
                $scope.AddInfoAttachPopupText = def.row.entity.AddInfoAttach;
            } else {
                $scope.AddInfoAttachPopupText = "";
            }

        }

        // UI Grid -- popup callback -- S&P
        if (def.col && def.col.field == 'spLink' && def.row.entity.spLink == 'ADD S&P') {
            $scope.showSPPopup = true;
        } else if (def.col && def.col.field == 'spLink') {
            $scope.showGridSandPPopup = true;
        } else if (def.col && def.col.field == 'comment') {
            $scope.showCommentsGridPopup = true;
        }

        // UI Grid -- popup callback -- split number papup
        if (def.col && def.col.field == 'splitNumber') {
            $scope.splitPopupPopup = true;
            $scope.isIEbrowser = false;
            $scope.lineNumber = def.row.entity.lineNumber;
            $scope.lineDescription = def.row.entity.lineDescription;
            $scope.splitTotal = def.row.entity.splittotal;
            $scope.quantity = def.row.entity.quantity;

            $timeout(function () {
                if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
                    $scope.isIEbrowser = true;
                }
            }, 100);
        }
    }
    /* UI Grid -- popup callback end */

    /* Accounting manage columns start */
    $scope.accManageColumns = function () {

        $scope.accfields = [];
        $scope.accfields = [{
            'lable': 'UOM'
        }, {
            'lable': 'Split Taxes & Charges (USD)'
        }, {
            'lable': 'Requester'
        }];
        $scope.selectedCount = getSelectedCout($scope.accfields);
        $scope.noOfCol = parseInt(Math.round($scope.accfields.length / 5));
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
            return $scope.accfields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };
    }

    $scope.onChangeAcc = function (obj) {
        if (isAtleastOneSelected($scope.accfields)) {
            $scope.isVisible = true;
            $scope.fillpartial = true;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
            $scope.selectedAll.selection = false;
        }
        if (isAllSelected($scope.accfields)) {
            $scope.fillpartial = false;
            $scope.selectedAll.selection = true;
        }
        $scope.selectedCount = getSelectedCout($scope.accfields);
    }
    /* Accounting manage columns end */


    /*Accounting Edit Multiple Columns start*/

    //localization label - normal label, config labels
    $scope.labels = {
        supplierLable: $translate.instant("Supplier"),
        shippingLable: $translate.instant("Shipping"),
        accountingLable: $translate.instant("Accounting"),
        addDetailsLable: $translate.instant("Additional Details")
    };

    // POPUP -- apply to all 
    $scope.applyToAllUrl = "shared/popup/views/popupLinesBulkEdit.html";

    $scope.applyToAllPopUp = false;
    $scope.applyToAllPopUpCallback = function (e) {
        $scope.applyToAllPopUp = true;
    };
    $scope.applyToAllPopUpClose = function (e) {
        $scope.applyToAllPopUp = false;
    };

    // popup -- apply to all -- sidebar links
    $scope.iteams = [{
        title: $scope.labels.supplierLable,
        lable: 'supplier',
        isChecked: false
    }, {
        title: $scope.labels.shippingLable,
        lable: 'shipping',
        isChecked: false
    }, {
        title: $scope.labels.accountingLable,
        lable: 'accounting',
        isChecked: false
    }, {
        title: $scope.labels.addDetailsLable,
        lable: 'additionalDetails',
        isChecked: false
    }];

    // popup -- apply to all -- vertical tabs
    $scope.tab = 0;
    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    // popup -- apply to all -- lables
    $scope.updateLineData = {
        "suppName": "CTPG OPERATING LLC",
        "suppCode": "CTPG-2014.000000",
        "shipto": "CTPG-2014.000000",
        "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708.",
        "deliverTo": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708.",

        "bu": "101 - GEP, New Jersey",
        "costCenter": "1011 - OutSourcing",
        "glCode": "2034 - Generral Service",
        "projectCode": "2034040 - Project Code",
        "contractNo": "20380 - IT/Hardware",
        "date": "1494786600000",
        "suppContact": "+1-541-854-1010",



        "startDate": "1483986600000",
        "endDate": "1494786600000",
    };

    $scope.updateSplitsData = {
        "requester": "John Doe",
        "costCenter": "A",
        "accountNumber": "-",
        "projectId": "39099-21-25",
    }

    // popup -- apply to all -- checkbox Selection interaction
    $scope.isChecked = {};

    // popup -- apply to all -- select item
    $scope.applyToAllSplitsUrl = "shared/popup/views/popupSplitsBulkEdit.html";

    $scope.applyToAllSplitsPopUp = false;
    $scope.applyToAllSplitsPopUpCallback = function (e) {
        $scope.applyToAllSplitsPopUp = true;
    };
    $scope.applyToAllSplitsPopUpClose = function (e) {
        $scope.applyToAllSplitsPopUp = false;
    };

    // popup -- apply to all -- select item -- item list
    $scope.itemList = [{
        'lable': 'Dell Laptop'
    }, {
        'lable': 'Lenovo Laptop'
    }, {
        'lable': 'Asus Laptop'
    }, {
        'lable': 'Intel Laptop'
    }, {
        'lable': 'IBM Laptop'
    }];

    $scope.spiltsItemList = [{
        'lable': 'Description 1 - Split 1 '
    }, {
        'lable': 'Description 2 - Split 2'
    }, {
        'lable': 'Description 3 - Split 3'
    }, {
        'lable': 'Description 4 - Split 4'
    }, {
        'lable': 'Description 5 - Split 5'
    }, {
        'lable': 'Description 6 - Split 6'
    }, {
        'lable': 'Description 7 - Split 7'
    }, {
        'lable': 'Description 8 - Split 8'
    }, {
        'lable': 'Description 9 - Split 9'
    }, {
        'lable': 'Description 10 - Split 10'
    }];

    //popup -- apply to all-select items -- select All
    $scope.checkAllC = function (aug) {
        angular.forEach($scope.itemList, function (itemList, key) {
            $scope.itemList[key].selected = aug;
        });
    };


    $scope.checkAllSplits = function (aug) {
        angular.forEach($scope.spiltsItemList, function (itemList, key) {
            $scope.spiltsItemList[key].selected = aug;
        });
    };

    $scope.addLines = 1;
    /*Accounting Edit Multiple Columns end*/


    // Start: popup -- split
    $scope.splitPopupUrl = "p2p/req/views/popupSplit.html";
    $scope.splitPopupPopup = false;
    $scope.splitPopupCallback = function (e) {
        $scope.splitPopupPopup = true;
    };
    $scope.splitPopupPopupHideCallback = function (e) {
        $scope.splitPopupPopup = false;
    };
    $scope.splitList = {
        number: [
            {
                "splitValue": "",
                "splitRule": [
                    {
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            }
        ],
        percent: [
            {
                "splitValue": "",
                "splitRule": [
                    {
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            }
        ]
    };
    $scope.splitType = [{
        title: 'Quantity'
    }, {
        title: 'Percentage'
    }];
    $scope.selectedSplit = {
        title: 'Quantity'
    };
    $scope.splitFlag = true;
    $scope.onChangeSplit = function (selectedSplit) {
        if (selectedSplit.title == 'Quantity') {
            $scope.splitFlag = true;
        } else if (selectedSplit.title == 'Percentage') {
            $scope.splitFlag = false;
        }
    }

    $scope.checkPercentTotal = true;
    $scope.addSplitRow = function (e) {
        $scope.checkPercentTotal = false;
        if ($scope.splitFlag) {
            $scope.splitList.number.push(
                {
                    "splitValue": "",
                    "splitRule": [
                        {
                            "rule": "!(/[0-9]/.test(this))",
                            "error": "Need atleast one number"
                        },
                        {
                            "rule": "(/^[0]$/.test(this))",
                            "error": "Number should greater than 0"
                        }
                    ]
                }
            );

            var getContent = angular.element('#numContainerTable').height();
            setTimeout(function () {
                angular.element('#numberContainer').find('.scroll-content').scrollTop(getContent + 55);
            }, 100);


        } else {
            $scope.splitList.percent.push(
                {
                    "splitValue": "",
                    "splitRule": [
                        {
                            "rule": "!(/[0-9]/.test(this))",
                            "error": "Need atleast one number"
                        },
                        {
                            "rule": "(/^[0]$/.test(this))",
                            "error": "Number should greater than 0"
                        }
                    ]
                }
            );

            var getContent = angular.element('#perContainerTable').height();
            setTimeout(function () {
                angular.element('#percentContainer').find('.scroll-content').scrollTop(getContent + 55);
            }, 100);
        }
    }

    $scope.removeSplitRow = function (currIndex) {
        if ($scope.splitFlag) {
            $scope.splitList.number.splice(currIndex, 1);
        } else {
            $scope.splitList.percent.splice(currIndex, 1);
        }
    }

    $scope.totalSplitNumber = 0;
    $scope.totalSplitPercent = 0;

    function fnCalculation() {
        if ($scope.splitFlag) {
            var numberTotal = 0;
            angular.forEach($scope.splitList.number, function (value, i) {
                if ($scope.splitList.number[i].splitValue == '' || $scope.splitList.number[i].splitValue == null) {
                    numberTotal = numberTotal + 0;
                }
                else {
                    numberTotal = numberTotal + $scope.splitList.number[i].splitValue;
                }
            });
            $scope.totalSplitNumber = numberTotal;
        }
        else {
            var percentTotal = 0;
            angular.forEach($scope.splitList.percent, function (value, i) {
                if ($scope.splitList.percent[i].splitValue == '' || $scope.splitList.percent[i].splitValue == null) {
                    percentTotal = percentTotal + 0;
                }
                else {
                    percentTotal = percentTotal + $scope.splitList.percent[i].splitValue;
                }
            });
            $scope.totalSplitPercent = percentTotal;
        }
    }

    $scope.$watch('splitList', function (n, o) {
        fnCalculation();
    }, true);

    // popup -- split -- focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };
    // End: popup -- split

    //localization label - buttons
    $scope.cancelBtnConfig = {
        title: $translate.instant("CANCEL")
    };
    $scope.resetBtnConfig = {
        title: $translate.instant("RESET")
    };
    $scope.selectItemsBtnConfig = {
        title: $translate.instant("SELECT ITEMS")
    };
    $scope.doneBtnConfig = {
        title: $translate.instant("DONE")
    };
    $scope.backBtnConfig = {
        title: $translate.instant("BACK")
    };
    $scope.ApplyBtnConfig = {
        title: $translate.instant("APPLY")
    };

    //line grid functions
    $scope.addBulkRow = function () {
        angular.element(document).triggerHandler('click');
    }
    $scope.cancelBulkRow = function () {

        angular.element(document).triggerHandler('click');
    };

    $scope.applyCurrentFields = function (a, b) {
        console.log(a + '  ' + b);
        angular.element(document).triggerHandler('click');
    };
    $scope.cancelAllFields = function () {
        angular.element(document).triggerHandler('click');

    }

    $scope.resetAllFields = function (a, b) {

        console.log(a + '  ' + b);

    }

    /*Exception Type Popup Data: start*/
    var irWidgetData = {
        method: 'GET',
        url: 'p2p/ir/models/irWidgetsData.json'
    };

    $http(irWidgetData).then(function (response) {
        $scope.exceptionData = response.data.exceptionData;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.popup_excTypeOptions = [
        {
            "name": "Approval Required Exception",
            "datakey": "approvalRequiredExcTbl",
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity. This exception comes when total invoiced quantity is more than ordered quantity."
                },
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "name": "Order Total",
            "datakey": "orderTotalTbl",
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                }
            ]
        },
        {
            "name": "Charges Exception",
            "datakey": "chargesTbl",
            "excHelp": [
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "name": "Item Mismatch Exception",
            "datakey": "itemMismatchTbl",
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                },
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "name": "Quantity Exception",
            "datakey": "quantityTbl",
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                }
            ]
        },
        {
            "name": "Shipping Exception",
            "datakey": "shippingTbl",
            "excHelp": [
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "name": "Unit Price Exception",
            "datakey": "unitPriceTbl",
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                },
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "name": "Tax Exception",
            "datakey": "taxTbl",
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                }
            ]
        },
        {
            "name": "UOM Exception",
            "datakey": "uomTbl",
            "excHelp": [
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        }
    ];
    $scope.popup_selectedExcType = {
        "name": "Approval Required Exception",
        "datakey": "approvalRequiredExcTbl",
        "excHelp": [
            {
                "title": "Definition",
                "desc": "This exception comes when total invoiced quantity is more than ordered quantity. This exception comes when total invoiced quantity is more than ordered quantity."
            },
            {
                "title": "Resolution",
                "desc": "The exception type gets resolved once the requester accepts the changed quantity."
            }
        ]
    };

    $scope.popup_exceptionTypeChange = function (currObj) {
        $scope.popup_selectedExcType = currObj;
    };

    $scope.showResolveException = true;

    $scope.resolvedByData = {
        options: [
            { "name": "Kamlesh Bhalde" },
            { "name": "Joel Almeida" },
            { "name": "Nandini Barve" },
            { "name": "Godwin Anand" }
        ],
        selectedOpts: { "name": "Kamlesh Bhalde" },
        focus: false
    };

    $scope.showActionMessage = false;
    $scope.notMine = false;
    $scope.rejected = false;
    $scope.resolved = false;
    $scope.withdraw = false;

    $scope.actionCallback = function (status) {
        $scope.showActionMessage = true;

        if (status == 'notMine') {
            $scope.notMine = true;
            $scope.rejected = false;
            $scope.resolved = false;
            $scope.withdraw = false;
        }
        else if (status == 'rejected') {
            $scope.notMine = false;
            $scope.rejected = true;
            $scope.resolved = false;
            $scope.withdraw = false;
        }
        else if (status == 'resolved') {
            $scope.notMine = false;
            $scope.rejected = false;
            $scope.resolved = true;
            $scope.withdraw = false;
        }
        else if (status == 'withdraw') {
            $scope.notMine = false;
            $scope.rejected = false;
            $scope.resolved = false;
            $scope.withdraw = true;
        }
    }

    $scope.overrideExcOptions = [
        { "name": "Yes" },
        { "name": "No" }
    ];
    $scope.selectOverrideExc = { "name": "Yes" };

    /*Exception Type Popup Data: end*/
}

function p2pIrPreviewCtrlFunc($scope, $rootScope, $http, notification, $state) {

    var req = {
        method: 'GET',
        url: 'p2p/ir/models/createIR.json'
    };

    $http(req).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig;

    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.sendToReq = function () {
        var config = {
            type: "success",
            message: "<div class='left-align'>Document sent to requester successfully.</div>",
            buttons: [{
                "title": "OK",
                "result": "ok"
            }]
        }
        notification.notify(config, function (response) {
            if (response.result == 'ok') {
                location.href = "#/landinglist?doctype=invoiceReconciliation";
            }
        });
    }

    // edit order
    $scope.edit = function () {
        $state.go('p2p.ir.new');
    }
}

function p2pIRExceptionTypeHederCtrlFunc($scope, $rootScope, $translate, $http, $state, notification, shareData) {
    $scope.excTypeOptions = [
        { "name": "Approval Required Exception", "datakey": "approvalRequiredExcTbl" },
        { "name": "Order Total", "datakey": "orderTotalTbl" },
        { "name": "Charges Exception", "datakey": "chargesTbl" },
        { "name": "Item Mismatch Exception", "datakey": "itemMismatchTbl" },
        { "name": "Quantity Exception", "datakey": "quantityTbl" },
        { "name": "Shipping Exception", "datakey": "shippingTbl" },
        { "name": "Unit Price Exception", "datakey": "unitPriceTbl" },
        { "name": "Tax Exception", "datakey": "taxTbl" },
        { "name": "UOM Exception", "datakey": "uomTbl" }
    ];
    $scope.selectedExcType = { "name": "Approval Required Exception", "datakey": "approvalRequiredExcTbl" };

    $scope.exceptionTypeChange = function (currObj) {
        $scope.selectedExcType.name = currObj.name;
        $scope.selectedExcType.datakey = currObj.datakey;
        shareData.typeChanged(currObj);
    };
}

function p2pIRExceptionTypeInfoCtrlFunc($scope, $rootScope, $translate, $http, $state, notification, shareData, lookup, debouncer, $timeout, $smartModal, shareWithCtrl) {
    var irWidgetData = {
        method: 'GET',
        url: 'p2p/ir/models/irWidgetsData.json'
    };


    $scope.tabView = true;
    $scope.tabFilterSelectCallback = function (tab) {
        $scope.exceptionTypeChange(tab);
    };
    $scope.excTypeOptions = [
        {
            "title": "Approval Required Exception",
            "datakey": "approvalRequiredExcTbl",
            "contentUrl": "exceptionContent",
            "active": true,
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity. This exception comes when total invoiced quantity is more than ordered quantity."
                },
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "title": "Order Total",
            "datakey": "orderTotalTbl",
            "contentUrl": "exceptionContent",
            "active": false,
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                }
            ]
        },
        {
            "title": "Charges Exception",
            "datakey": "chargesTbl",
            "contentUrl": "exceptionContent",
            "active": false,
            "excHelp": [
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "title": "Item Mismatch Exception",
            "datakey": "itemMismatchTbl",
            "contentUrl": "exceptionContent",
            "active": false,
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                },
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "title": "Quantity Exception",
            "datakey": "quantityTbl",
            "contentUrl": "exceptionContent",
            "active": false,
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                }
            ]
        },
        {
            "title": "Shipping Exception",
            "datakey": "shippingTbl",
            "contentUrl": "exceptionContent",
     "active": false,
            "excHelp": [
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "title": "Unit Price Exception",
            "datakey": "unitPriceTbl",
            "contentUrl": "exceptionContent",
            "active": false,
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                },
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        },
        {
            "title": "Tax Exception",
            "datakey": "taxTbl",
            "contentUrl": "exceptionContent",
            "active": false,
            "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity."
                }
            ]
        },
        {
            "title": "UOM Exception",
            "datakey": "uomTbl",
            "contentUrl": "exceptionContent",
            "active": false,
            "excHelp": [
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
            ]
        }
    ];
    $scope.selectedExcType = {
        "title": "Approval Required Exception",
        "datakey": "approvalRequiredExcTbl",
        "excHelp": [
                {
                    "title": "Definition",
                    "desc": "This exception comes when total invoiced quantity is more than ordered quantity. This exception comes when total invoiced quantity is more than ordered quantity."
                },
                {
                    "title": "Resolution",
                    "desc": "The exception type gets resolved once the requester accepts the changed quantity."
                }
        ]
    };

    $scope.exceptionTypeChange = function (currObj) {
        $scope.selectedExcType = currObj;
        if (currObj.datakey == 'orderTotalTbl') {
            initResolverList($scope.exceptionData.orderTotalData);
        }
    };
    /*filter match and update tab title*/
    var updateTabTitle = function(dataValue){
        var getIndex, count, findDataKey;
        switch (dataValue) {
            case "approvalRequiredExcData":
                findDataKey = "approvalRequiredExcTbl"
                break;
            case "chargesData":
                findDataKey = "chargesTbl"
                break;
            case "orderTotalData":
                findDataKey = "orderTotalTbl"
                break;
            case "itemMismatchExcData":
                findDataKey = "itemMismatchTbl"
                break;
            case "quantityData":
                findDataKey = "quantityTbl"
                break;
            case "shippingData":
                findDataKey = "shippingTbl"
                break;
            case "unitPriceData":
                findDataKey = "unitPriceTbl"
                break;
            case "taxData":
                findDataKey = "taxTbl"
                break;
            case "uomData":
                findDataKey = "uomTbl"
                break;
        }
       

        getIndex = $scope.excTypeOptions.findIndex(function(element){ return element.datakey == findDataKey});
        count =  $scope.exceptionData[dataValue].length;
        $scope.excTypeOptions[getIndex].title =  $scope.excTypeOptions[getIndex].title + " (" +  count + ")"

    }
    /*move down to get Scope excTypeOption*/
    $http(irWidgetData).then(function (response) {
        $scope.exceptionData = response.data.exceptionData;
        angular.forEach($scope.exceptionData, function(key,value){
            updateTabTitle(value);
        })

    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.resolvedByData = {
        options: [
            { "name": "Kamlesh Bhalde" },
            { "name": "Joel Almeida" },
            { "name": "Nandini Barve" },
            { "name": "Godwin Anand" }
        ],
        selectedOpts: { "name": "Kamlesh Bhalde" }
    };

    $scope.resolverLookup = function (e) {
        debouncer.add(function () {
            var lookupConfig = {
                modelData: $scope.resolvedByData.selectedOpts,
                config: {
                    mutliselect: false,
                    displayProperties: ["name"],
                    options: $scope.resolvedByData.options,
                    addnew: false,
                    titleOfModel: "Resolver List",
                    selectTypeOption: { "name": "Kamlesh Bhalde" },
                    readonly: false
                }
            };
            $timeout(function () {
                lookup.open(lookupConfig, function (response) {
                    if (!response.result) return false;
                    $scope.resolvedByData.selectedOpts = response.result;

                });
            });
        }, 300);
    };

    $scope.reassignUser = "";
    $scope.withoutTabSelect = true;
    $scope.withSearchUser = true;
    $scope.showCommentsPopup = false;
    $scope.showActionMessage = false;
    $scope.notMine = false;
    $scope.rejected = false;
    $scope.resolved = false;
    $scope.withdraw = false;

    $scope.actionCallback = function (status) {
        if (status == 'notMine') {
            $scope.showCommentsPopup = true;
        }
        else if (status == 'rejected') {
            $scope.showActionMessage = true;
            $scope.notMine = false;
            $scope.rejected = true;
            $scope.resolved = false;
            $scope.withdraw = false;
        }
        else if (status == 'resolved') {
            $scope.showActionMessage = true;
            $scope.notMine = false;
            $scope.rejected = false;
            $scope.resolved = true;
            $scope.withdraw = false;
        }
        else if (status == 'withdraw') {
            $scope.showActionMessage = true;
            $scope.notMine = false;
            $scope.rejected = false;
            $scope.resolved = false;
            $scope.withdraw = true;
        }
    }

    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showCommentsPopup = false;

        if(shareWithCtrl.data.value.reassigned && shareWithCtrl.data.value.reassignedBtnClick){
            $scope.reassignUser = shareWithCtrl.data.value.name;
            $scope.showActionMessage = true;
            $scope.notMine = true;
            shareWithCtrl.data.value.reassignedBtnClick = false;
        }
    }

    $scope.searchUserLookupOpen = function(e){
        $scope.showCommentsPopup = false;
    }

    $scope.searchUserLookupClose = function(e){
        $scope.showCommentsPopup = true;
    }

    $smartModal.initModal({
        templateUrl: "shared/popup/views/commentsPopup.html",
        show: "showCommentsPopup",
        onHide: "commentsPopUpOnHideCallback(e)",
        $scope: $scope
     });

    $scope.reassign = function () {
        _.each($scope.exceptionData.orderTotalData, function (value, key, list) {
                value.resolver.isEdit = true;
        });
     
    }

    $scope.$on('notMineEvent', function(e) {  
        $scope.actionCallback('notMine');
    });

    /*looup for reassign*/
    $scope.reassignException = function (e, $index) {
        debouncer.add(function () {
            var lookupConfig = {
                modelData: $scope.exceptionData.orderTotalData[$index].resolver.user,
                config: {
                    mutliselect: false,
                    displayProperties: ["name"],
                    options: $scope.resolvedByData.options,
                    addnew: false,
                    titleOfModel: "Resolver List",
                    selectTypeOption: $scope.exceptionData.orderTotalData[$index].resolver.user,
                    readonly: false
                }
            };
            $timeout(function () {
                lookup.open(lookupConfig, function (response) {
                    if (!response.result) return false;
                    if (response.btnType == "save") {
                        let currentUser = $scope.exceptionData.orderTotalData[$index].resolver.user;
                        $scope.exceptionData.orderTotalData[$index].resolver.user = response.result;
                        lookupcloseFun(response, currentUser.name);
                    }
                    
                });
            });
        }, 300);
    };

   
   var lookupcloseFun = function (data, currentUser) {
        if (currentUser != data.result.name) {
            var msgDetails = "<p class='left-align'>All Lines of '" + currentUser + "' should be resolved by '" + data.result.name + "''</p>";
        var reassignMsgConfig = {
                type: "confirm",
                message: msgDetails,
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
      
       

        notification.notify(reassignMsgConfig, function (response) {
            if (response.result == 'yes') {
                _.each($scope.exceptionData.orderTotalData, function (value, key, list) {
                    if (value.resolver.user.name == currentUser) {
                        value.resolver.user = data.result;
                        value.resolver.isEdit = false;
                    }
                });
            };
            $scope.resolverList = [];
            initResolverList($scope.exceptionData.orderTotalData);
        });
    
        }
    }


   
    /*resolverList and showing in readOnly*/
    $scope.resolverList = [];
    var initResolverList = function (data) {
        _.each(data, function (value, key, list) {
            if (filterPush(value.resolver.user.name)) {
                $scope.resolverList.push(value.resolver.user);
            }
        });
    },
     filterPush = function (checkValue) {
         var getIndex = _.findIndex($scope.resolverList, {'name': checkValue });
         if (getIndex < 0) {
             return true
         } else {
             return false;
         }
     };

 
    /*read onlyLookup*/
    $scope.showResolveList = function (e) {
        
        plantPoup(e);
    }
    var plantPoup = function (e) {
        debouncer.add(function () {
            var lookupConfig = {
                modelData: $scope.resolverList,
                config: {
                    mutliselect: true,
                    displayProperties: ["name"],
                    options: $scope.resolverList,
                    addnew: false,
                    titleOfModel: "Resolver List",
                    selectTypeOption: $scope.resolverList,
                    readonly: true
                }
            };
            $timeout(function () {
                lookup.open(lookupConfig, function (response) {});
            });
        }, 300);
    }

    /*resolver status list*/

    $scope.resolverUserList = [
           {
               "name": "Godwin Anand",
               "statusChangedOn": "818035920000",
               "status": "Accepted"
           },
         {
             "name": "Sanish Manchalla",
             "statusChangedOn": "818035920000",
             "status": "Rejected"
         },
         {
             "name": "Nandini Barve",
             "statusChangedOn": "818035920000",
             "status": "Withdrawn"
         },
         {
             "name": "Zebin Ayinikat",
             "statusChangedOn": "818035920000",
             "status": "Not Mine"
         },
         {
             "name": "Godwin Anand",
             "statusChangedOn": "818035920000",
             "status": "Accepted"
         },
         {
             "name": "Avishek Jana",
             "statusChangedOn": "818035920000",
             "status": "Rejected"
         }
    ];

    $scope.showStatusPopup = false;

    $smartModal.initModal({
        templateUrl: "p2p/ir/views/popupExecptionStatus.html",
        show: "showStatusPopup",
        onHide: "onPopupHideCallback(e)",
        $scope: $scope
    });

    $scope.resolverUserStatus = function () {
        $scope.showStatusPopup = true;
    }

    $scope.onPopupHideCallback = function () {
        $scope.showStatusPopup = false;
    }

    $scope.getStatusColor = function (ele) {
        switch (ele) {
            case 'Rejected':
            case 'Withdrawn':
                return 'error-status-text';
                break;
                /*status related to success*/
            case 'Accepted':
                return 'success-status-text';
                break;
                /*status related to not available*/
            default:
                return 'notAvailable-status-text';

        }
    };
    /* search field */
    $scope.searchText = { title: "" };
    $scope.isSearchOpen = false;
    $scope.closeSearch = function () {
        if ($scope.searchText.title != "") {
            $scope.searchText.title = "";
        } else {
            $scope.isSearchOpen = false;
            $("#btnSearchTextbox").focus();
        }
    };
    $scope.searchToggle = function () {
        if ($scope.isSearchOpen == false) {
            $scope.isSearchOpen = true;
            $timeout(function () {
                if ($("#expectionSearch").find("input").length) {
                    $("#expectionSearch").find("input").focus();
                } else {
                    $("#expectionSearch").focus();
                }
            });
        }
    };
    /* search field end here */
}

function p2pIrAdditionalInformationCtrlFunc($scope, $rootScope, RuleEngine, $http, $window, $state, $timeout, $sce) {
    /* Additional information  */

    $scope.idIs = $state.params.id;
    var additionalInfo = {
        method: 'GET',
        url: 'p2p/ir/models/createIR.json'
    };

    $http(additionalInfo).then(function (response) {
        $scope.data = response.data.dataModel;
        $scope.dataModel = $scope.data.additionalInfo.data;
        $scope.lineviewData = $scope.data.LineLeveladditionalInfo;
        if ($state.current.name == 'p2p.ir.additionalInfo' && $scope.idIs != undefined) {
            $scope.lineviewData[$scope.idIs].showContent = true;
            $scope.isAdditionalInfoPage = true;
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    });





    $scope.sectionName = "ADDITIONAL INFORMATION"

    $scope.fieldCount = function (paramUse) {

        var count = 0;
        angular.forEach(paramUse, function (k, v) {
            count += paramUse[v].questions.length;
        });
        return count;
    }


    $scope.returnColClass = function (que) {


        var q = que.question;



        if (q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" || q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" && q == "") {
            return "s12 m6 l4 xl4 xxl4";
        }
        else if (q.length >= 21 && q.length <= 40 && que.type != "multi-text" && que.type != "multi-text-with-icon") {
            return "s12 m12 l6 xl6 xxl6";
        }
        else {
            return "s12";
        }
    }




    // side bar -- dynamic scrolling
    $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
    angular.element($window).bind('resize', function (e) {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        $scope.$apply();
    });

    angular.element($window).bind('scroll', function () {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }
        $scope.$apply();
    });


    //left panel selection link
    $scope.currentSelected = $scope.idIs;
    $scope.selectedItem = function (index) {

        angular.forEach($scope.lineviewData, function (value, key) {
            $scope.lineviewData[key].showContent = false;
        });

        $scope.currentSelected = index;
        $scope.lineviewData[index].showContent = true;
    }



    // right side content height
    $scope.contHeight = function (fixedSubHeader) {
        if (fixedSubHeader) {

            return $window.innerHeight - 50
        }
        else {

            return $window.innerHeight - 114
        }

    };

    // sidebar -- show hide button interaction
    $scope.isActive = false;
    $scope.activeButton = function () {
        $scope.isActive = !$scope.isActive;
    }


    // side bar interaction for less than 1200px
    $scope.isActiveSideBar = true;
    angular.element($window).bind('resize', function (e) {
        if ($window.innerWidth >= 1199) {
            $scope.isActiveSideBar = true;
        } else {
            $scope.isActiveSideBar = false;
        }
    });


    /* Additional information  end */

    /*search */
    $scope.focusSearchC = false;
    $scope.isActiveC = false;
    $scope.showMeC = false;
    $scope.showSearchC = function () {
        $scope.isActiveC = true;
        $scope.focusSearchC = true;
        $scope.showMeC = true;
        $scope.hideCloseC = true;
    };
    $scope.hideSearchC = function () {
        $scope.isActiveC = false;
        $scope.focusSearchC = false;
        $scope.hideCloseC = false;
    };

    $scope.getFieldType = function (getFieldType) {
        switch (getFieldType) {
            case 'numeric':
                return 'number'
                break;
            default:
                return 'text'
                break;
        }
    }

    $scope.returnField = function (fieldType) {

        switch (fieldType) {
            case 'single-text':
            case 'numeric':
                return 'single-text.html'
                break;
            case 'multi-text':
                return 'multi-text.html'
                break;
            case 'multi-text-with-icon':
                return 'multi-text-with-icon.html'
                break;
            case 'single-response-radio':
                return 'single-response-radio.html'
                break;
            case 'single-response-drop':
                return 'single-response-drop.html'
                break;
            case 'multi-response':
                return 'multi-response.html'
                break;
            case 'date-time':
                return 'date-time.html'
                break;
            case 'multi-text-format':
                return 'multi-text-format.html'
                break;

            case 'attachment-only':
                return 'attachment-only.html'
                break;
            case 'multi-numeric':
                return 'multi-numeric.html'
                break;
            case "grid-type-text":
            case "grid-type-combination":
            case "grid-type-wrow-combination":
                return 'grid-type-combination.html'
                break;
            case "list-box":
                return 'list-box.html'
        }
    }

    // upload Attachment


    var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
    $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
    // Start: Add guideline popup
    $scope.addDocumentPoupUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.addDocumentPopup = false;

    $scope.addDocumentPopupCallback = function (data) {
        //if (!$scope.supplierView) {

        $scope.uploadTitle = "ADD ATTACHMENT";
        $scope.uploadTitleContent = "Upload Attachments";
        $scope.addDocumentPopup = true;
        //}
        //if ($scope.supplierView) {
        data.isVisible = true;
        //}
    }
    $scope.hideAddDocumentPopupCallback = function () {
        $scope.addDocumentPopup = false;
    };
    // Start: Upload events
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
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentThree.xls",
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentFour.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
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

    };
    $scope.retryCall = function (el) {
        el.status = "success";
    };
    // End: Upload events
}