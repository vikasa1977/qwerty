angular.module('SMART2')
    .controller('p2pInvBasicDetailsCtrl', ['$scope', '$window', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$sce', '$filter', 'shareWithCtrl', p2pInvBasicDetailsCtrlFunc])
    .controller('p2pInvBasicDetailsNonPoInvoiceCtrl', ['$scope', '$window', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$sce', '$filter', 'shareWithCtrl','lookup', p2pInvBasicDetailsNonPoInvoiceCtrlFunc])
    .controller('p2pInvScannedDocSecCtrl', ['$scope', '$rootScope',  '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$sce','storeService', p2pInvScannedDocSecCtrlFunc])
    .controller('p2pInvScannedDocSecHeaderCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$sce', 'storeService', p2pInvScannedDocSecHeaderCtrlFunc])
    .controller('p2pInvPreviewCtrl', ['$scope', '$rootScope', '$http', 'notification', '$state', p2pInvPreviewCtrlFunc])
    .controller('itemDetailInvCtrl', ['$scope', 'notification', '$translate', '$sce', '$http', 'scannedInvServices', 'shareWithCtrl', '$timeout', itemDetailInvCtrlFunc])
    .controller('additionalInformationCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$window', '$state', '$timeout', '$sce', additionalInformationCtrlFunc])
    .controller('supplierFieldCtrl', ['$scope', supplierFieldCtrlFunc])
    .controller('p2pInvExceptionTypeHederCtrl', ['$scope', '$rootScope', '$translate', '$http', '$state', 'notification', 'shareData', p2pInvExceptionTypeHederCtrlFunc])
    .controller('p2pInvExceptionTypeInfoCtrl', ['$scope', '$rootScope', '$translate', '$http', '$state', 'notification', 'shareData', 'scannedInvServices', 'shareWithCtrl', p2pInvExceptionTypeInfoCtrlFunc])
    .controller('p2pErrorCtrl', ['$scope', '$rootScope', '$translate', '$http', '$state', 'notification', 'shareData', 'scannedInvServices', 'shareWithCtrl', p2pErrorCtrlFunc])

   .controller('popupInvShipToCtrl', ['$scope', popupInvShipToCtrlFunc])
    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    });

/*basic details  controller*/
function p2pInvScannedDocSecCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $sce, storeService) {
      $scope.loaderConfig = { bgwhite: true, plain: true, center : true, message: "" };

    $scope.showpopupoption = true;
    $scope.popupout = false;
    $scope.docURL = 'shared/resources/images/TATA invoice.pdf';
    $scope.pdfScale = 1.6;
    $scope.pagesDetails = {
        "currentPage":"",
        "totalPages":""
    };

   var rootscopePageLoader =  $rootScope.$watch('pageLoaderFlagController', function (newvalue, oldvalue) {
        if (!newvalue) {
            $scope.pdfLoader = true;

            rootscopePageLoader();
        }
    });

   
    $scope.onpageLoaded = function (curPage, total) {
        $scope.pagesDetails.currentPage = curPage;
        $scope.pagesDetails.totalPages = total;
        if (curPage == total) {
            $scope.pdfLoader = false;
        }
    };
    $scope.scrollBreakPoints = {
        "canvas": {
            top: .5,
            reverse: true
        }
    };
    $scope.currentPage = { pageNo: 1 };
    $scope.onBreakPoints = function (e) {
        $scope.currentPage.pageNo = e.index + 1;
    }

   
}
function p2pInvScannedDocSecHeaderCtrlFunc($scope, $rootScope,  $translate, RuleEngine, $http, $state, notification, $timeout, $sce, storeService) {
 
 
    $scope.ScannedInvoiceImg = true;
 
    $scope.selectedImage = function (current) {
        $scope.$emit('showImages', { showTemp: current });
    }

   
    

}
function p2pInvBasicDetailsCtrlFunc($scope, $window, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $sce, $filter, shareWithCtrl) {
    
    
    //ship to location poup
     $scope.showLocationPopup = false;
    $scope.showLocationPopupFn = function () {
        $scope.showLocationPopup = true;
    };
    $scope.showLocationPopupClBack = function () {
        $scope.showLocationPopup = false;
    };
    $scope.preprocessing = function (e) {
        $state.go('expandedLandingList', {
            doctype: 'invoice'
        });
    }
    // scannedInv popupout 
    $scope.fixHeaderHeight = { "height": "310px" };
    $scope.popOut = false;
    $scope.$on('openScannedInvInPopup', function (event, args) {
        $scope.popOut = !$scope.popOut;
        $scope.isScannedDocCollaps = !args.message;
        if (!$scope.isScannedDocCollaps) {
            $scope.fixHeaderHeight = { "height": "42px" };
        } else {
            var getHeight = angular.element('#scannedInvDiv').height()
            $scope.fixHeaderHeight = { "height": getHeight };
        }

    });


 //resizableLimits
       $scope.resizableMaxHeight = function(checkSubheader){
           var getmaxHeight = $window.innerHeight - 325;
           if(checkSubheader){
                getmaxHeight = $window.innerHeight - 295;
           }
           return getmaxHeight;
       }
    $scope.onStopResizing = function(){
        var getHeight =  angular.element('#scannedInvDiv').height()
        angular.element('#fixHeaderDiv').height(getHeight);
    }
  
    // icard popup
    //supplier i card popup
    $scope.$on('showSupIcard', function (evt, data) {
    $scope.showSupplierIcardPopup = data.flag
    });
    /*Card popup data start*/
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

    $scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
    $scope.smartCatPopupSingleLevel = "shared/popup/views/smartCatPopupSingleLevel.html";
    /*Card popup data end*/


    // popup -- Add Taxes -- grid Data -- add new row
 
  $scope.isaccruedtaxes = false;
  $scope.isLineaccrudtaxes = false;
    $scope.exemptConfirmCall = function() {
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
        $scope.showTaxesPopup = false;
        notification.notify(config, function(response) {
            if (response.result == 'no') {
                $scope.showTaxesPopup = true;
            }
        });
    }

    $scope.makeProrateEditable = false;
    $scope.addCurrent = function () {
        $scope.makeProrateEditable = true;
    }

    $scope.taxCodeCancelProrate = function (e) {
        $scope.makeProrateEditable = false;
    }

    $scope.taxCodeUpdateProrate = function (e) {
        $scope.makeProrateEditable = false;
    }


    /* tax popover */
    $scope.taxConfig =
        [{
            "dataName": "Invoice Value",
            "dataValue": 678.00,
            "taxEditable": true,
            "makeEdit": false,
            "viewDetails": false
        }, {
            "dataName": "Shipping",
            "dataValue": 109.00,
            "taxEditable": true,
            "makeEdit": false,
            "viewDetails": false
        }, {
            "dataName": "Taxes",
            "dataValue": 0,
            "taxEditable": false,
            "makeEdit": false,
            "viewDetails": true
        }, {
            "dataName": "Invoice Charges",
            "dataValue": 678,
            "taxEditable": false,
            "makeEdit": false,
            "viewDetails": false
        }];

    $scope.getTotalTax = function() {
        var count = 0;
        angular.forEach($scope.taxConfig, function(taxValue) {

            count += parseInt(taxValue.dataValue)

        });

        return count;

    };

    $scope.makeEditCurrent = function(elem) {
        $scope.taxConfig.forEach(function(element, index, array) {
            $scope.taxConfig[index].makeEdit = false;

        });
        $scope.taxConfig[elem].makeEdit = true;

    };
    var getHeight = '';
    $scope.hideWidget = function () {
        if (!$scope.popOut) { 
        if ($scope.isScannedDocCollaps) {
            $scope.fixHeaderHeight = { "height": "42px" };
            getHeight = angular.element('#scannedInvDiv').height();
        } else {
            $scope.fixHeaderHeight = { "height": getHeight };
        }
        $scope.isScannedDocCollaps = !$scope.isScannedDocCollaps;
        }
    };


    $scope.newTaxValue = $filter('number')("0", 2);


    $scope.updateTaxValue = function(index, data) {
        $scope.taxConfig[index].dataValue = $filter('number')(data, 2);
        $scope.newTaxValu = $filter('number')("0", 2);;
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }

    $scope.cancelupdateTaxValue = function(index) {
        $scope.newTaxValu = $filter('number')("0", 2);
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }

    // View Details Popup starts

    $scope.textRules = [{
        "rule": "!(/[a-z0-9._%+-/]$/.test(this))",
        "error": " "

    }];

    $scope.viewDetailsPopupCallback = function (e) {
        $scope.viewDetailsPopup = true;
    };
    $scope.viewDetailsPopupOnHideCallback = function () {
        $scope.viewDetailsPopup = false;
    };

    $scope.viewTaxOptions = [{
        "name": "Tax Amount"
    }, {

        "name": "Tax Code"
    }];
    $scope.viewable = true;
    $scope.selectedViewTax = { "name": "Tax Amount" };
    $scope.onChange = function (selectedViewTax) {
        console.log(selectedViewTax);
        $scope.viewable = !$scope.viewable;

    };
    $scope.viewTaxConfig =
        [{
            "dataName": "Taxes",
            "dataValue": 40,
            "taxEditable": true,
            "makeEdit": false
        }, {
            "dataName": "Shipping & Freight",
            "dataValue": 0,
            "taxEditable": false,
            "makeEdit": false
        }, {
            "dataName": "Other Charges",
            "dataValue": 60,
            "taxEditable": false,
            "makeEdit": false
        }];
    $scope.addDisable = false;
    $scope.viewList = {
        'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false
    };
    
    if ($scope.viewList.taxCode != '' || $scope.viewList.taxDetail != '' || $scope.viewList.taxRate != '')
    {

        $scope.addDisable = true;
    }

    $scope.viewDetailLists = [];

    $scope.addCurrentView = function () {
        if ($scope.viewList.taxCode != '' && $scope.viewList.taxDetail != '' && $scope.viewList.taxRate != '') {
            $scope.viewDetailLists.unshift(angular.copy($scope.viewList));
            $scope.viewList.taxCode = '';
            $scope.viewList.taxDetail = '';
            $scope.viewList.taxRate = '';
            $scope.viewList.showEdithCurrentPanel = false;
        }
    };

    $scope.deleteCurrentView = function (current) {
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item with TaxCode''" + $scope.viewDetailLists[current].taxCode + "''</p>";
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
                $scope.viewDetailLists.splice(current, 1);
                Materialize.toast('View deleted successfully', 2000);
            }

        });


    };


    $scope.tempViewList = {};
    // popup -- Add Taxes -- grid Data -- edit current row
    $scope.editCurrentView = function (element) {
        $scope.deliveryfocus = true;
        element.showEdithCurrentPanel = true;
        $scope.tempViewList = angular.copy(element);


    };

    $scope.updatedEditedView = function (element, viewDetailList) {


        if (element.taxCode != '' && element.taxDetail != '' && element.taxRate != '') {
            viewDetailList.taxCode = element.taxCode;
            viewDetailList.taxDetail = element.taxDetail;
            viewDetailList.taxRate = element.taxRate;
            viewDetailList.showEdithCurrentPanel = false;
        }

        Materialize.toast('View edited Successfully', 2000);
    };

    $scope.cancelUpdatedEditedView = function (element, viewDetailList) {

        viewDetailList.showEdithCurrentPanel = false;
        element = {};

    }
    $scope.makeEditView = function (elem) {
        $scope.viewTaxConfig.forEach(function (element, index, array) {
            $scope.viewTaxConfig[index].makeEdit = false;

        });
        $scope.viewTaxConfig[elem].makeEdit = true;

    };

    $scope.cancelupdateViewValue = function (index) {
        $scope.newTaxValu = $filter('number')("0", 2);
        $scope.viewTaxConfig[index].makeEdit = false;
        $scope.viewTaxConfig[index].focus = false;
    }

    $scope.updateViewValue = function (index, data) {
        $scope.viewTaxConfig[index].dataValue = $filter('number')(data, 2);
        $scope.newTaxValu = $filter('number')("0", 2);;
        $scope.viewTaxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }

    $scope.applyFnView = function () {
        Materialize.toast('View Added Successfully', 2000);
        $scope.viewDetailsPopup = false;


    }

    $scope.CloseFnView = function () {
        $scope.viewDetailsPopup = false;
    }
    // View Details Popup ends


    // popup -- Add Taxes -- grid Data -- add a row in the array
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





    // popup -- Add Taxes -- grid Data -- iffy function for percentage



    $scope.$on('openTaxPopup', function(event, args) {
        if (args.showTaxPopup == true) {
            $scope.isaccruedtaxes = args.isaccruedtaxes;
            $scope.showTaxesPopup = true;
            $scope.isLineaccrudtaxes = args.isLineaccrudtaxes;
            $scope.taxList = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': false
            };
        }
    });


    // other popup
    // popup -- taxes -- select item -- item list
   
    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function(isAccruedTaxes) {
        $scope.showTaxesPopup = true;
        $scope.isaccruedtaxes = isAccruedTaxes;
        $timeout(function () {
            angular.element('.lean-overlay').on('click', function (e) {
                event.stopPropagation();
            });
        }, 200)
     
    };
    $scope.taxesPopUpOnHideCallback = function(e) {
        $scope.showTaxesPopup = false;
        $scope.isaccruedtaxes = false;
         $scope.isLineaccrudtaxes = false;
    }

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
        $scope.showTaxesPopup = false;
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item ''" + $scope.taxesDetailLists[current].taxDetail + "''</p>";
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

        notification.notify(confi, function(response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
              
                    updatePersentage();
            }
            $scope.showTaxesPopup = true;
        });


    };

    // popup -- Add Taxes -- grid Data -- edit current row
    $scope.editCurrent = function(current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        $scope.updatedCurrentTax.taxCode = getcurrentTaxValue.taxCode;
        $scope.updatedCurrentTax.taxDetail = getcurrentTaxValue.taxDetail;
        $scope.updatedCurrentTax.taxRate = getcurrentTaxValue.taxRate;
        updatePersentage();
    };

    // popup -- Add Taxes -- grid Data -- update current row with edited value
    $scope.updatedEdited = function(current) {
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
    $scope.cancelUpdatedEdited = function(current) {
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
        $scope.taxesPopUpOnHideCallback();
        $scope.$broadcast('taxPopupClose', {
            taxPopupGetClose: true
        });
        Materialize.toast('Tax Added Successfully', 2000);
  
    }
    $scope.CloseFn = function () {
        $scope.taxesPopUpOnHideCallback();
    }


    $scope.applyProrate = function () {
        var config = {
            type: "confirm",
            message: "<div class='left-align'>There are taxes already accrued at line item level. Prorating from header will over write those values. Do you want to proceed?'</div>",
            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "No",
                "result": "no"
            }]
        }
        $scope.showTaxesPopup = false;
        notification.notify(config, function (response) {

            if (response.result == 'yes') {
                $scope.taxesPopUpOnHideCallback();
                Materialize.toast('Tax Added Successfully', 2000);
            } else {
                $scope.showTaxesPopup = true;
            }
        });

    }
        /*tax popup end*/

    $scope.isScannedDocCollaps = true;
    $scope.showUploadScannedPopup = false;
    $scope.hideDownloadTemplate = true;
    $scope.adduploadScannedCallback = function() {
        $scope.uploadTitle = "Upload Scanned Document";
        $scope.uploadIcon = "#icon_Upload";
        $scope.showUploadScannedPopup = true;
    }
    $scope.hideUploadScannedPopupCallback = function(e) {
        $scope.showUploadScannedPopup = false;
    }
    $scope.attachmentMsg = "Supported file formats: doc, docs,pdf, jpg, jpeg, png.\
        <br />Limited to file(s) of 10MB each.\
        <br /> Maximum 5 files can be uploaded.";
    $scope.attchmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
    var scannedDocAttached = false;
    $scope.attachAction = function() {
        scannedDocAttached = true;
    }
    $scope.attachCompleteCall = function() {
        if (scannedDocAttached) {
            $state.go('p2p.inv.create', {
                'scannedDoc': true,
                'mode': 'blank'
            });
        } else {
            scannedDocAttached = false;
            return;
        }
    }
  


   

    // scannedDocument
    $scope.scannedDocument = false;

    if ($state.params.scannedDoc == "true" && $state.params.mode != "blank") {
        $scope.scannedDocument = true;
    }

    $scope.isTemplateSelected = [];
    $scope.templateLists =
        [{
            'title': 'TEMPLATE 1',
            'isChecked': false
        }, {
            'title': 'TEMPLATE 2',
            'isChecked': false
        }, {
            'title': 'TEMPLATE 3',
            'isChecked': false
        }];
   
    /*slider*/
   $scope.changeImageScale = 1.0;
    $scope.scannnedImagesList = [{
        "title": "Outbound From SAP",
        "imageName": "IMG2016 - 000182",
        "imageUploadedBy": "Masco Admin",
        "imageUploadedDate": "2015-04-01",
        "pdfURL": 'shared/resources/images/TATA invoice.pdf'
    }, {
        "title": "Outbound From SAP1",
        "imageName": "IMG2016 - 000182",
        "imageUploadedBy": "Masco Admin",
        "imageUploadedDate": "2015-04-01",
        "pdfURL": 'shared/resources/images/TATA invoice.pdf'
    }, {
        "title": "Outbound From SAP2",
        "imageName": "IMG2016 - 000182",
        "imageUploadedBy": "Masco Admin",
        "imageUploadedDate": "2015-04-01",
          "pdfURL": 'shared/resources/images/TATA invoice.pdf'
    }, {
        "title": "Outbound From SAP3",
        "imageName": "IMG2016 - 000182",
        "imageUploadedBy": "Masco Admin",
        "imageUploadedDate": "2015-04-01",
          "pdfURL": 'shared/resources/images/TATA invoice.pdf'
    }]
   
     $scope.openPopuFlag = false;
     $scope.changeImagePopOutFalse = false;
     $scope.$on('showImages', function(event, args) {
           $scope.openPopuFlag = true;
          $scope.slideObj = {
            list: $scope.scannnedImagesList,
            index: 0,
            src: 'p2p/inv/views/templateInvoiceScreenshot.html'
        };
      
    });
      $scope.closeSlideView = function() {
        $scope.openPopuFlag = false;
       
    }
    //Slider ends


    /*sccaned document end*/
    // POPUP -- comments 
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

    $scope.showCommentsPopup = false;
    $scope.checkicardPopup = false;
    var currentOpenPopup;
    var CP_ActiveTabIndex = 0, RTS_ActiveTabIndex = 2;
    $scope.showCommentsPopupCallback = function (e) {
        currentOpenPopup = 1;
        $scope.returnToSupplierFlag = false;
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
        }];

        $scope.modulecurrentTab = $scope.modules[CP_ActiveTabIndex].url;
        $scope.moduleactiveListTabs = CP_ActiveTabIndex;

        openCommentsPopup();
    };

    $scope.returnToSupplier = function () {
        currentOpenPopup = 2;
        $scope.returnToSupplierFlag = true;
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
            name: 'INVOICE',
            count: '8',
            number: 'INV-2016.234829',
            url: 'invoice.html',
            isChecked: false
        }];

        $scope.modulecurrentTab = $scope.modules[RTS_ActiveTabIndex].url;
        $scope.moduleactiveListTabs = RTS_ActiveTabIndex;

        openCommentsPopup();
    }

    function openCommentsPopup() {
        $scope.showCommentsPopup = true;
        if ($scope.showSupplierIcardPopup == true) {
            $scope.checkicardPopup = true;
            $scope.showSupplierIcardPopup = false;
        }
    }

    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showCommentsPopup = false;
        if (currentOpenPopup == 1) {
            $scope.commentIcon = '#icon_Commented'; //icon_Comments
        }
        if ($scope.checkicardPopup == true) {
            $scope.showSupplierIcardPopup = true;
            $scope.checkicardPopup = false;
        }
    };
    
    $scope.modulesetActiveListTab = function (menuItema) {
        if (currentOpenPopup == 1) {
            CP_ActiveTabIndex = menuItema;
        }
        else {
            RTS_ActiveTabIndex = menuItema;
        }
        $scope.moduleactiveListTabs = menuItema;
        $scope.modulecurrentTab = $scope.modules[menuItema].url;
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
    }];
    //comment popup.


    // POPUP -- attachment 
    $scope.attachmentPopUpUrl = "shared/popup/views/popupUploadDoc.html";

    //Attachment popup--start
    var comingFrom;
    $rootScope.showDoneBtn = false;
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function(e, popupComingfrom) {
        $scope.showCommentsPopup = false;
        $scope.showUploadPopup = true;
        comingFrom = popupComingfrom;
        if (comingFrom != undefined) {
            $rootScope.showDoneBtn = true
        }
    }
    $scope.hideUploadPopupCallback = function(e) {
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
    $scope.uploadDocCall = function(e) {
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
    $scope.attachmentCall = function(e) {
        $scope.attachFlag = true;

        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function(el) {
        el.isShow = false;
    }

    $scope.retryCall = function(el) {
        el.status = "success";
    }
    $scope.removeRow = function(el) {
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
    $scope.showCommentsPopupTabCallback = function(e) {
        $scope.showCommentsPopupTab = true;
    };
    $scope.commentsPopupOnHideTabCallback = function(e) {
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
    $scope.showErrorAlertFunc = function() {
        if ($scope.showErrorAlert) {
            $scope.showErrorAlert = false;
            $timeout(function() {
                $scope.showErrorAlertMsgCont = false;
            }, 800);
        } else {
            $scope.showErrorAlert = true;
            $scope.showErrorAlertMsgCont = true;

        }
    }
    $scope.mode = $state.params.mode;


    /*current for tax poup start*/
    // PRINT PRVIEW 
    $scope.showPreview = function() {
            $state.go('p2p.inv.preview');
        }
        /*tax popup*/
    $scope.taxList = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [{
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        }, {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        }, {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        }, {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        }

    ];



    /*current for tax poup end*/

    /*section search content start*/
    $scope.sectionAndFieldsDetails = [{
            'name': 'Section One',
            'contentIn': ''
        }, {
            'name': 'Section Two',
            'contentIn': ''
        }, {
            'name': 'Section Three',
            'contentIn': ''
        }, {
            'name': 'Section Four',
            'contentIn': ''
        }, {
            'name': 'Section Five',
            'contentIn': ''
        }, {
            'name': 'Section Six',
            'contentIn': ''
        }, {
            'name': 'Section Seven',
            'contentIn': ''
        }, {
            'name': 'Shipping',
            'contentIn': ''
        }, {
            'name': 'Shipping to',
            'contentIn': 'In Shipping'
        }, {
            'name': 'Ship to Address',
            'contentIn': 'In Shipping'
        }]
        /*section search content end*/

    $scope.topValueSectionTrack = 115;
    $scope.submitReq = function() {
        var confi_2 = {
            type: "success",
            message: "<p class='left-align'>Invoice created successfully.</br> Would you like to create another Invoice? </p> ",
            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "NO, THANKS",
                "result": "no"
            }]
        };

        notification.notify(confi_2, function(response) {

            if (response.result == 'yes') {
                $state.go('p2p.inv.create', {
                    doctype: 'invoice'
                });

            } else if (response.result == 'no') {

                $state.go('expandedLandingList', {
                    doctype: 'invoice'
                });

            }

        });
    }


    var isSequenceToBeMaintained;

    /*
     *  Service call get form-config and data-model
     */

    var inv = {
        method: 'GET',
        url: 'p2p/inv/models/createInv.json'
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

    $http(inv).then(function(response) {

        $scope.dataModel = response.data.dataModel;
        $scope.formConfig = response.data.formConfig;
        if ($state.params.mode == 'blank') {
            $scope.formConfig.sections[0].isVisible = true;
        }

        $scope.$watch('dataModel', function(n, o) {

        }, true);
    }, function(error) {
        console.log(JSON.stringify(error));
    });

    $scope.$watch(function () { return shareWithCtrl.data.value }, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined' && newVal != '') {
            var foundSupDetails = $filter('filter')($scope.formConfig.sections, { label: 'Supplier Details' }, true),
                foundStakeDetails = $filter('filter')($scope.formConfig.sections, { label: 'Stakeholder Details' }, true);
            if (shareWithCtrl.data.value.name == "Multi PO invoice") {
                hideConfigField(foundSupDetails);
                hideConfigField(foundStakeDetails);
            }
            else {
                showConfigField(foundSupDetails);
                showConfigField(foundStakeDetails);
            }
        }
    });

    function hideConfigField(foundItem) {
        angular.forEach(foundItem[0].rows, function (value, rIdx) {
            angular.forEach(foundItem[0].rows[rIdx].properties, function (value, pIdx) {
                if (foundItem[0].rows[rIdx].properties[pIdx].label == "Order Location" || foundItem[0].rows[rIdx].properties[pIdx].label == "Order Contact") {
                    foundItem[0].rows[rIdx].properties[pIdx].isVisible = false;
                }
            });
        });
    }

    function showConfigField(foundItem) {
        angular.forEach(foundItem[0].rows, function (value, rIdx) {
            angular.forEach(foundItem[0].rows[rIdx].properties, function (value, pIdx) {
                if (foundItem[0].rows[rIdx].properties[pIdx].label == "Order Location" || foundItem[0].rows[rIdx].properties[pIdx].label == "Order Contact") {
                    foundItem[0].rows[rIdx].properties[pIdx].isVisible = true;
                }
            });
        });
    }

    $scope.validateForm = function() {
        RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
        RuleEngine.execute(function(e) {
            console.log(e);
            // if() {
            // }
        });
    };

    /* 
  HEADER SEARCH INTRACTION
  NEED TO CHANGE ITS WORKING
*/
    $scope.showSearchHeader = function() {
        //$scope.mysearchHeight = { width: '1000px' };
        this.isActiveHeader = true;
        this.focusSearchHeader = true;
        this.hideCloseHeader = true;
    }
    $scope.hideSearchHeader = function() {
        //$scope.mysearchHeight = { width: '100%' };
        this.isActiveHeader = false;
        this.focusSearchHeader = false;
        this.hideCloseHeader = false;
    }

    /**** 
                template Content
   ****/
    var getRespond = {
        method: 'GET',
        url: 'p2p/req/models/tempateData.json'
    };

    $scope.setTemplateData = [];



    $http(getRespond).then(function(response) {
        $scope.setTemplateData = response.data;
    }, function(error) {
        console.log(JSON.stringify(error));
    });


    $scope.getItemNum = [];

    /*showing footer on checkbox true*/

    $scope.checkboxIsTrue = false;
    var listCount = [];

    $scope.useSelectedTemplatefunc = function(ele) {

        if (ele == true) {
            $scope.checkboxIsTrue = true;
            listCount.push('0');

        } else {
            listCount.pop();
            if (listCount.length == 0) {
                $scope.checkboxIsTrue = false;

            }
        }

    }

    $scope.goToPage = function() {
        $state.go(templateLink);
    }

    /* poup command*/
    $scope.userthisTemplate = function(e) {
        $state.go(templateLink);
        $scope.tempPopup = false;
    }

    $scope.isActive = false;
    $scope.showMe = false;
    $scope.hideClose = false;
    $scope.showSearch = function() {
        $scope.isActive = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function() {
        $scope.isActive = false;
        $scope.hideClose = false;

    };

    $scope.selectedItems = 6;
    $scope.addItem = function(elem, index) {
        var itemallSelect = $scope.setTemplateData[index].isCheckedAll;
        if (elem == true) {

            $scope.selectedItems = ($scope.selectedItems + 1);

        } else {

            $scope.setTemplateData[index].isCheckedAll = false;
            $scope.selectedItems = ($scope.selectedItems - 1);
        }

    };



    $scope.selectAllTemple = function(selectedTemplateallitem, index) {

        var tempAttr = $scope.setTemplateData[index].tempAttr;
        if (selectedTemplateallitem != true) {

            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = false;
            }
        } else {

            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = true;
            }
        }

    };

  

    /* NON PO INVOICE - CHECKBOX */
    $scope.showOrderTemp = false;
    $scope.onChangeNonPO = function() {
        $scope.showOrderTemp = !$scope.showOrderTemp;
    }

    // popup -- trackstatus
    $scope.trackStatusPopupUrl = "shared/popup/views/popupNewTrackStatus.html";
    $scope.trackStatusPopup = false;
    $scope.trackStatusPopupCallback = function(e) {
        $scope.trackStatusPopup = true;
    };
    $scope.trackStatusOnHideCallback = function(e) {
        $scope.trackStatusPopup = false;
    };

    var deleteInvoiceObj = {
        type: "warning",
        message: "<p class='left-align'>Do you want to delete this Invoice?</p>",
        buttons: [{
            title: "Yes",
            result: "yes"
        }, {
            title: "No",
            result: "no"
        }]
    }

    $scope.deleteInvoice = function() {
        notification.notify(deleteInvoiceObj, function(responce) {
            var result = responce.result;

            if (result == 'yes') {
                //history.go(-1);
                //$rootScope.$broadcast('itemDelet', { itemFrom: 'Invoice' });
                $state.go('expandedLandingList', {
                    doctype: 'invoice'
                });
            }
        });
    }


    $scope.exceptionFlag = false;
    $scope.exceptionHeaderCallback = function () {
        $scope.exceptionFlag = !$scope.exceptionFlag;
    }
    //cbr
    // Start: CBR
    var tempCategoryNode_PAS = [];
    var tempBUNode_PAS = [];
    var tempRegionNode_PAS = [];
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
        if (type == 'region') {
            $http(regionData).then(function (response) {
                regionObj = response.data;
                $scope.treeComponentConfig.listIcon = null;
                $scope.treeComponentConfig.isViewOnly = false;
                $scope.treeComponentConfig.isReadOnly = false;
                $scope.treeComponentConfig.data = regionObj;
                $scope.treeComponentConfig.title = 'REGION';
                if (tempRegionNode_PAS.length) {
                    $scope.treeComponentConfig.isReadOnly = true;
                }
                $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else if (type == 'bu') {
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


        } else {
            $http(categoryData).then(function (response) {

                categoryObj = response.data;
                $scope.treeComponentConfig.listIcon = null;
                $scope.treeComponentConfig.isViewOnly = false;
                $scope.treeComponentConfig.isReadOnly = false;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'CATEGORY';
                if (tempCategoryNode_PAS.length) {
                    $scope.treeComponentConfig.isReadOnly = true;
                }
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        }
        $scope.showTreePopup = true;
    };

    $scope.onPopupHideCallback = function () {

        if (currentType == "iCardBU" || currentType == "iCardDiversity") {
            $scope.showSupplierIcardPopup = true;
        }
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        } else if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        } else if (currentType == 'region') {
        }

        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        //$scope.treeComponentConfig.getSelections = true;
    };

    $scope.selectedCategoriesTxt = ["Choose Category"];
    $scope.selectedBUTxt = ["Choose Business Unit"];
    $scope.selectedRegionTxt = ["Choose Region"];

    $scope.selectedCategoryNodes = [];
    $scope.selectedBUNodes = [];
    $scope.selectedRegionNodes = [];

    $scope.treeComponentCallback = function (e) {
        $scope.showTreePopup = false;
        icardPopup = false;
        if (currentType == 'category') {
            tempCategoryNode_PAS = [];
            $scope.selectedCategoriesValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedCategoryNodes.push(e.selections[i].Name);
                tempCategoryNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedCategoriesTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
            else if (e.selectionAllNames.length == 1)
                $scope.selectedCategoriesTxt = [e.selectionAllNames[0]];
            else
                $scope.selectedCategoriesTxt = ['Choose Category'];
        } else if (currentType == 'PA') {
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
        } else if (currentType == 'region') {
            tempRegionNode_PAS = [];
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedRegionNodes.push(e.selections[i].Name);
                tempRegionNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedRegionTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
            else if (e.selectionAllNames.length == 1)
                $scope.selectedRegionTxt = [e.selectionAllNames[0]];
            else
                $scope.selectedRegionTxt = ['Choose Region'];
        } else
            if (currentType == "iCardBU" || currentType == "iCardDiversity") {
                $scope.showSupplierIcardPopup = true;
            }

        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
    };


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

    $scope.contractNumOptions = [
        {
            "UserId": 28360,
            "ContractNum": "CON-234908 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-879056 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-456321 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-456378 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-098567 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-109567 :: Test Blanket AVI",
        }
    ];

    $scope.selectedContractNum = $scope.contractNumOptions[0];
}

function p2pInvBasicDetailsNonPoInvoiceCtrlFunc($scope, $window, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $sce, $filter, shareWithCtrl, lookup) {
    
    /* POPUP Order DETails start */
    $scope.orderDetailsPopupUrl = "p2p/inv/views/popupOrderDetails.html";
    $scope.orderDetailsPopup = false;
    $scope.orderDetailsPopupCallback = function (e) {
        setActive($scope.indexToShow);
        $scope.orderDetailsPopup = true;
    };
    $scope.hideOrderDetailsPopupCallback = function (e) {
        $scope.orderDetailsPopup = false;
    };
    $scope.indexToShow = 0;
    $scope.selectedPO = $scope.modelData.mSelectedOrder[$scope.indexToShow];
    $scope.selectedPO = {
        OrderDetails : []
    };
    function setActive(index) {
        var item;
        $scope.indexToShow = index;
        item = $scope.modelData.mSelectedOrder[index];
        //"orderId", "OrderNumber", "OrderName", "OrderDetails", "value", "$$hashKey", "ischecked", "counterProp1"
        if (item) {
            $scope.selectedPO.OrderDetails = [];
        };
        $timeout(function () {
            if (item) {
                $scope.selectedPO.orderId = item.orderId;
                $scope.selectedPO.OrderNumber = item.OrderNumber;
                $scope.selectedPO.OrderName = item.OrderName;
                $scope.selectedPO.OrderDetails = item.OrderDetails;
                $scope.selectedPO.value = item.value;
                $scope.selectedPO.ischecked = item.ischecked;
                $scope.selectedPO.counterProp1 = item.counterProp1;
                $scope.totalChecked = $filter('filter')($scope.selectedPO.OrderDetails, { checked: true }).length;
            };
        });
    }

    $scope.selectedItem = function (index) {
        setActive(index);
    };

    //$scope.selectPlantModel = { "name": "Delhi (North) - India" };
    //$scope.selectPlantOption = { "name": "Delhi (North) - India" };
    $scope.orderReadOnlyPopupUrl = "p2p/inv/views/popupOrderReadOnly.html";
    $scope.orderReadOnlyPopup = false;
    $scope.orderReadOnlyPopupCallback = function (e) {
        
        $scope.orderReadOnlyPopup = true;
    };
    $scope.hideOrderReadOnlyPopupCallback = function (e) {
        $scope.orderReadOnlyPopup = false;
    };

    $scope.deleteCurrentOrder = function (current) {
        $scope.orderDetailsPopup = false;
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item ''" + $scope.selectedPO.OrderNumber + "''</p>";
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
                $scope.modelData.mSelectedOrder.splice(current, 1);
                $scope.modelData.mSelectedOrder = angular.copy($scope.modelData.mSelectedOrder);
                
                Materialize.toast('Order deleted successfully', 2000);
                $scope.orderDetailsPopup = true;
                setActive(0);

            }
            else {
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
            $scope.modelData.mSelectedOrder[current].OrderDetails.push(angular.copy($scope.orderList));
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
            $scope.checkedAllTemp = function()
            {
                
                for (var item = 0; item < $scope.selectedPO.OrderDetails.length; item++)
                {
                    if ($scope.chkBoxObj.checkedAll)
                        $scope.selectedPO.OrderDetails[item].checked = true;
                    else
                        $scope.selectedPO.OrderDetails[item].checked = false;
                }
            }
    }

    function fnTotalChecked(items) {
        $scope.totalChecked = $filter('filter')(items, { checked: true }).length;
    }

    $scope.onChangePOItem = function (items) {
        fnTotalChecked(items)
    }

    $scope.onChangeCheckAll = function (items) {
        fnTotalChecked(items)
    }

    /* POPUP Order DETails end */


    $scope.singlePOInvoice = true;
    $scope.invoiceTypeChange = function (selectedInvoiceType, modelData) {
        //var confi = {
        //    type: "confirm",
        //    message: "<p class='left-align'>Are you sure you want change invoice type?</p>",

        //    buttons: [
		//		{
		//		    "title": "YES",
		//		    "result": "yes"
		//		},
		//		{
		//		    "title": "No",
		//		    "result": "no"
		//		}
        //    ]
        //};

        //Notification call
        //notification.notify(confi, function (responce) {
        //if (responce.result == "yes") {
        if (selectedInvoiceType) {
            $scope.singlePOInvoice = false;
            modelData.selectedInvoiceType = {
                "name": "Multi PO invoice",
                "invoiceType": "Multi"
            };
            //modelData.selectedInvoiceType.name = "Multi PO invoice";
            //modelData.selectedInvoiceType.invoiceType = "Multi";
        }
        else {
            $scope.singlePOInvoice = true;
            modelData.selectedInvoiceType = {
                "name": "Single PO invoice",
                "invoiceType": "Single"
            };
            //modelData.selectedInvoiceType.name = "Single PO invoice";
            //modelData.selectedInvoiceType.invoiceType = "Single";
        };
        shareWithCtrl.data.value = modelData.selectedInvoiceType;
        /*} else {
            if (selectedInvoiceType.name == "Multi PO invoice") {
                modelData.selectedInvoiceType = {
                    "name": "Single PO invoice",
                    "invoiceType": "Single"
                };
            }
            else {
                modelData.selectedInvoiceType = {
                    "name": "Multi PO invoice",
                    "invoiceType": "Multi"
                };
            }
            return;
        };*/
        //});
    };
    
}

/*print controller*/
function p2pInvPreviewCtrlFunc($scope, $rootScope, $http, notification, $state) {


    // edit order
    $scope.edit = function() {
        $state.go('p2p.inv.create');
    }

    //Notification
    $scope.submitReq = function() {
        var confi = {
            type: "success",
            message: "<p class='left-align'>Invoice has been submitted successfully.</p>",

            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "Stay on same page",
                "result": "no"
            }]
        };

        //Notification call
        notification.notify(confi, function(responce) {
            if (responce.result == "yes") {
                $state.go('expandedLandingList', {
                    pagefor: 'manage',
                    doctype: 'invoice'
                });
            } else {
                return;
            }
        });
    }
}


function itemDetailInvCtrlFunc($scope, notification, $translate, $sce, $http, scannedInvServices, shareWithCtrl, $timeout) {


    $scope.withoutChk = true;
    // popup -- search
    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.showSearch = function() {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function() {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    };

    //select All -- add lines from -- requisition tab
    $scope.checkAll = function(aug) {
        angular.forEach($scope.importFromReq, function(importFromReq, key) {
            $scope.importFromReq[key].selected = aug;
        });
    };
    //select All -- add lines from -- template tab
    $scope.checkAllTemp = function(aug) {
        angular.forEach($scope.importFromTemp, function(importFromTemp, key) {
            $scope.importFromTemp[key].selected = aug;
        });
    };

    $scope.selectedtemplate = function(current) {
        $scope.$emit('showTemplate', {
            showTemp: current
        });
    }

    //$scope.ngModel = $scope.ngModel.data;

    $scope.itemDetailReqMaterialTabDataset = [{
        "title": "Lines",
        "contentUrl": "p2p/inv/views/itemDetail-mat-linesTab.html",
        "active": true
    }, {
        "title": "Accounting",
        "contentUrl": "p2p/inv/views/itemDetail-mat-accTab.html"
    }];

    $scope.itemDetailReqServiceTabDataset = [{
        "title": "Lines",
        "contentUrl": "p2p/inv/views/itemDetail-serv-linesTab.html",
        "active": true
    }, {
        "title": "Accounting",
        "contentUrl": "p2p/inv/views/itemDetail-serv-accTab.html"
    }];

    $scope.importLineItemsTabDataset = [{
        "title": "Requisition",
        "contentUrl": "p2p/inv/views/importLineItemsReqTab.html",
        "active": true
    }, {
        "title": "Templates",
        "contentUrl": "p2p/inv/views/importLineItemsTemplTab.html"
    }];


    $scope.isTemplateSelected = [];
    $scope.templateLists =
        [{
            'title': 'TEMPLATE 1',
            'isChecked': false
        }, {
            'title': 'TEMPLATE 2',
            'isChecked': false
        }, {
            'title': 'TEMPLATE 3',
            'isChecked': false
        }];


    //Approver Popup
    $scope.approverPopupUrl = "shared/popup/views/popupApprover.html";
    $scope.approverPopup = false;
    $scope.approverPopupCallback = function(e) {
        $scope.approverPopup = true;
    };
    $scope.approverOnHideCallback = function() {
        $scope.approverPopup = false;
    };
    $scope.modulecurrentTab = 'requisition.html';
    $scope.withoutTabSelect = true;
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

    $scope.showCommentsGridPopup = false;
    $scope.showCommentsGridPopupCallback = function() {
        $scope.showCommentsGridPopup = true;
    };
    $scope.commentsGridPopUpOnHideCallback = function(e) {
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
    //comment popup.
    $scope.$watch('ngModel.selectedOption.key', function(newVal) {});

    $scope.addApprovers = [{
        name: 'John',
        "selected": false
    }, {
        name: 'Jessie'
    }, {
        name: 'Johanna'
    }, {
        name: 'Joy',
        "selected": false
    }, {
        name: 'Mary'
    }, {
        name: 'Peter'
    }, {
        name: 'Sebastian',
    }, {
        name: 'Erika'
    }, {
        name: 'Patrick'
    }, {
        name: 'Samantha'
    }];

    $scope.approvers = [{
        name: 'John'
    }, {
        name: 'Jessie'
    }, {
        name: 'Johanna'
    }, {
        name: 'Joy'
    }, {
        name: 'Mary'
    }, {
        name: 'Peter'
    }, {
        name: 'Sebastian',
    }, {
        name: 'Erika'
    }, {
        name: 'Patrick'
    }, {
        name: 'Samantha'
    }];
    $scope.shwMore = false;
    $scope.WrapHeight = '130px';

    $scope.collapsUser = function() {
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
    $scope.showSearch = function() {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    }

    $scope.hideSearch = function() {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    }

    $scope.treeSearchModel = "";
    $scope.stateBasedTitle = "ADD CATEGORY";

    $scope.manufatureDetails = "p2p/req/views/popupManufacturerDetails.html";
    $scope.manufatureDetailsPopup = false;
    $scope.manufatureDetailsCallback = function(e) {
        $scope.manufatureDetailsPopup = true;
    };
    $scope.manufatureDetailsPopupHideCallback = function(e) {
        $scope.manufatureDetailsPopup = false;
    };

    //express list grid Data

    $scope.expressLists = [{
        itemNumber: 'dell',
        name: '-',
        actionIconDelete: true
    }, {
        itemNumber: 'Sumsung',
        name: '-',
        actionIconDelete: true
    }, {
        itemNumber: 'Lenovo',
        name: '-',
        actionIconDelete: true
    }, {
        itemNumber: 'Sumsung',
        name: '-',
        actionIconDelete: true
    }, {
        itemNumber: 'dell',
        name: '-',
        actionIconDelete: true
    }, {
        itemNumber: 'Lenovo',
        name: '-',
        actionIconDelete: true
    }, {
        itemNumber: 'Sumsung',
        name: '-',
        actionIconDelete: true,
        actionIconAdd: true
    }];

    // express list grid Data -- remove the row specified in index
    $scope.removeRow = function(index) {
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


    $scope.addLines = 1;
    //import from requisition
    $scope.importFromReq = [{
        'lable': 'Payment Term',
        'reqNo': 'REQ-2016.000313',
        'showFlag': true
    }, {
        'lable': 'Legal Entity',
        'reqNo': 'REQ-2016.000313',
        'showFlag': false
    }, {
        'lable': 'shipping & freight',
        'reqNo': 'REQ-2016.000313',
        'showFlag': true
    }, {
        'lable': 'Payment Term',
        'reqNo': 'REQ-2016.000313',
        'showFlag': true
    }, {
        'lable': 'Legal Entity',
        'reqNo': 'REQ-2016.000313',
        'showFlag': false
    }, {
        'lable': 'shipping & freight',
        'reqNo': 'REQ-2016.000313',
        'showFlag': true
    }, {
        'lable': 'Payment Term',
        'reqNo': 'REQ-2016.000313',
        'showFlag': false
    }, {
        'lable': 'Legal Entity',
        'reqNo': 'REQ-2016.000313',
        'showFlag': false
    }, {
        'lable': 'shipping & freight',
        'reqNo': 'REQ-2016.000313',
        'showFlag': true
    }, {
        'lable': 'Payment Term',
        'reqNo': 'REQ-2016.000313',
        'showFlag': true
    }, {
        'lable': 'Legal Entity',
        'reqNo': 'REQ-2016.000313',
        'showFlag': true
    }, {
        'lable': 'shipping & freight',
        'reqNo': 'REQ-2016.000313',
        'showFlag': false
    }];
    $scope.importFromTemp = [{
        'lable': 'Payment Term Template',
        'tmptNo': 'TEMP-2016.000313'
    }, {
        'lable': 'Legal Entity Template',
        'tmptNo': 'TEMP-2016.000313'
    }, {
        'lable': 'Shipping & freight Template',
        'tmptNo': 'TEMP-2016.000313'
    }];
    $scope.fields = [];
    $scope.accfields = [];

    //line -- manage columns
    $scope.manageColumns = function() {
        $scope.fields = [];
        $scope.fields = [{
            'lable': 'Requested Date Requested Date Requested Date Requested Date Requested Date',
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


        $scope.getStartFrom = function() {
            $scope.startVal += 1;
        };

        $scope.cloneDiv = function(n) {
            return new Array(n);
        };

        $scope.itemsLimit = 5;
        $scope.itemsColumnized = function(myIndex) {
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
    $scope.checkAll = function(aug) {
        angular.forEach($scope.fields, function(field, key) {
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
    $scope.reset = function() {
        $scope.selectedAll.selection = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
        $scope.selectedCount = getSelectedCout($scope.fields);

    };

    //line -- manage columns -- on change in list checkboxes
    $scope.onChange = function(obj) {
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

    //accounting details -- manage columns
    $scope.accManageColumns = function() {

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


        $scope.getStartFrom = function() {
            $scope.startVal += 1;
        };

        $scope.cloneDiv = function(n) {
            return new Array(n);
        };

        $scope.itemsLimit = 5;
        $scope.itemsColumnized = function(myIndex) {
            var currentPageIndex = myIndex * $scope.itemsLimit;
            return $scope.accfields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };
    }

    $scope.onChangeAcc = function(obj) {
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

    //localization label - normal label, config labels
    $scope.labels = {
        supplierLable: $translate.instant("Supplier"),
        shippingLable: $translate.instant("Shipping"),
        accountingLable: $translate.instant("Accounting"),
        addDetailsLable: $translate.instant("Additional Details")
    };

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

    // POPUP -- Edit Multiple lines.

    $scope.contractNumber = [{
        "UserId": 28360,
        "UserName": "IT/Hardware",
       }, {
        "UserId": 28977,
        "UserName": "IT/Hardware",
    }, {
        "UserId": 28978,
        "UserName": "IT/Hardware",
    }, {
        "UserId": 28979,
        "UserName": "IT/Hardware",
    }, {
        "UserId": 28980,
        "UserName": "IT/Hardware",
    }];

    $scope.taxCode = [{
        "UserId": "Cod",
        "UserName": "-0009812",
    }, {
        "UserId": "Cod",
        "UserName": "- 0009432",
    }, {
        "UserId": "Cod",
        "UserName": "- 0009542",
    }, {
        "UserId": "Cod",
        "UserName": "- 0009322",
    }, {
        "UserId": "Cod",
        "UserName": "- 0009552",
    }];
   
    

    $scope.applyToAllPopUp = false;
    $scope.applyToAllPopUpCallback = function(e) {
        $scope.applyToAllPopUp = true;
        $scope.selectedAll = true;
        for (i = 0; i < $scope.itemList.length; i++) {
            $scope.itemList[i].selected = true;
        }
        
    };
    $scope.applyToAllPopUpClose = function(e) {
        $scope.applyToAllPopUp = false;
    };

    $scope.onSmartTypeHeadOpen = function () {
        $scope.applyToAllPopUp = false;
    }

    $scope.onSmartTypeHeadClose = function () {
        $scope.applyToAllPopUp = true;
    }


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

    /*$scope.treeComponentConfig = {
        selectedNodes: "",
        isRadio: false,
        getHierarchyOnSelection: true,
        isLazyLoad: false,
        data: null,
        disableLevelSelection: '',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '270px',
        isSearchEnabled: true
    };*/

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
                //$scope.treeComponentConfig.isViewOnly = true;
                //$scope.treeComponentConfig.isReadOnly = true;
                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            
            });

        }

        else {
            $http(categoryData).then(function (response) {

                categoryObj = response.data;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        }
        $scope.showTreePopup = true;
        $scope.applyToAllPopUp = false;
    };

    $scope.onPopupHideCallback = function () {
        $scope.showTreePopup = false;
        $scope.applyToAllPopUp = true;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        } else if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        } else if (currentType == 'region') {
        }
        //$scope.treeComponentConfig.getSelections = true;
    };

    $scope.selectedCategoriesTxt = "Category";
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
    // End: CBR




    $scope.addLinesFormUrl = "p2p/order/views/popupAddLinesForm.html";

    $scope.addLinesFormPopUp = false;
    $scope.addLinesFormPopUpCallback = function(e) {
        $scope.addLinesFormPopUp = true;
    };
    $scope.addLinesFormPopUpClose = function(e) {
        $scope.addLinesFormPopUp = false;
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
    $scope.setTab = function(newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
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
        "selectedcontractNumber" : $scope.contractNumber[0],
        "selectedtaxCode" : $scope.taxCode[0],
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
    $scope.applyToAllSplitsPopUpCallback = function(e) {
        $scope.applyToAllSplitsPopUp = true;
    };
    $scope.applyToAllSplitsPopUpClose = function(e) {
        $scope.applyToAllSplitsPopUp = false;
    };

    // popup -- apply to all -- select item -- item list
    $scope.itemList = [{
        'label': 'Dell Laptop',
        'selected': true,
        'isDisabled':false
    }, {
        'label': 'Lenovo Laptop',
        'selected': true
    }, {
        'label': 'Asus Laptop',
        'selected': true
    }, {
        'label': 'Intel Laptop',
        'selected': true
    }, {
        'label': 'IBM Laptop',
        'selected': true
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

    /*select all edit*/
    $scope.selectAllEditBulk = { checkedAll: false };
    $scope.fillpartialBulkEdit = true;
    $scope.editbulkItemSelectAll = function (arg) {
        var itemlength = $scope.itemList.length,
            item;
        $scope.fillpartialBulkEdit = false;
        for (item = 0; item < itemlength; item++) {
            $scope.itemList[item].selected = arg;
        }
    };
    function getSelectedCount(data) {
        return data.filter(function (el) { return el.selected == true }).length;
    }

    function checkArrayValue(data) {
        var flag = false;
        for (var i = 0; i < data.length; i++) {

            if (data[i].selected == true) {
                flag = true;
                break;
            } else {

                flag = false;
            }
            return flag
        }


    };

    $scope.selectCurrent = function (currentValue, data ) {
        if (currentValue == true && getSelectedCount(data) != data.length) {
            $scope.fillpartialBulkEdit = true;
        }
        else if (currentValue == true && getSelectedCount(data) == data.length) {
            $scope.fillpartialBulkEdit = false;
            $scope.selectAllEditBulk.checkedAll = true;
        }
        else if (currentValue == false && getSelectedCount(data) > 0) {
            $scope.fillpartialBulkEdit = true;
            $scope.selectAllEditBulk.checkedAll = false;
        }
        else if (currentValue == false && checkArrayValue(data) == false) {
            $scope.selectAllEditBulk.checkedAll = false;
            $scope.fillpartialBulkEdit = false;
        }
    };


    //popup -- apply to all-select items -- select All
    $scope.checkAllC = function (aug) {
        angular.forEach($scope.itemList, function(itemList, key) {
            $scope.itemList[key].selected = aug;
        });
    };

    $scope.checkAllSplits = function(aug) {
        angular.forEach($scope.spiltsItemList, function(itemList, key) {
            $scope.spiltsItemList[key].selected = aug;
        });
    };

    $scope.addLines = 1;


     //popup -- manufacturer details -- select item -- item list
    $scope.manufatureDetails = "shared/popup/views/popupManufacturerDetails.html";
    $scope.manufatureDetailsPopup = false;
    $scope.manufatureDetailsCallback = function(e) {
        $scope.manufatureDetailsPopup = true;
    };
    $scope.manufatureDetailsPopupHideCallback = function(e) {
        $scope.manufatureDetailsPopup = false;
    };

    // popup -- Add Info
    $scope.AddChargesinfo = "shared/popup/views/popupEditStandardAndProcedure.html";
    $scope.AddChargesinfoPopup = false;
    $scope.AddChargesinfoCallback = function(e) {
        $scope.AddChargesinfoPopup = true;
    };
    $scope.AddChargesinfoPopupHideCallback = function(e) {
        $scope.AddChargesinfoPopup = false;
    };


    // popup -- Add Info
    $scope.AddChargesAttach = "shared/popup/views/popupEditStandardAttacment.html";
    $scope.AddChargesAttachPopup = false;
    $scope.AddChargesAttachCallback = function(e) {
        $scope.AddChargesAttachPopup = true;
    };
    $scope.AddChargesAttachPopupHideCallback = function(e) {
        $scope.AddChargesAttachPopup = false;
    };

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

    /*$scope.treeComponentConfig = {
        selectedNodes: "",
        isRadio: false,
        getHierarchyOnSelection: true,
        isLazyLoad: false,
        data: null,
        disableLevelSelection: '',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '270px',
        isSearchEnabled: true
    };*/

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
            $http(regionData).then(function(response) {
                regionObj = response.data;
                $scope.treeComponentConfig.data = regionObj;
                $scope.treeComponentConfig.title = 'Region';
                $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else if (type == 'bu') {
            $http(buData).then(function(response) {
                buObj = response.data;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else {
            $http(categoryData).then(function(response) {

                categoryObj = response.data;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        }
        $scope.showTreePopup = true;
        $scope.applyToAllPopUp = false;
    };

    $scope.onPopupHideCallback = function() {
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        } else if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        } else if (currentType == 'region') {}
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

    $scope.treeComponentCallback = function(e) {

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
        $scope.applyToAllPopUp = true;
    };
    // End: CBR


    //UI grid -- Items for Lines Item
    $scope.itemConfig = [{
            "field": "lineNumber",
            "width": 120,
            "displayName": "Line Number",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": true
            },
            "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate'>{{row.entity.lineNumber}}</span><a class='ui-grid-cell-container-icons has-received-value' href='javascript:void(0)' ng-if='row.entity.lineNumberWarning'><i class='icon iconSmall grey-text' smart-infotip position='right' message='{{row.entity.lineNumberWarning}}'><svg><use xlink:href='#icon_Info'></use></svg></i></a></div>"
        }, {
            "field": "orderNumber",
            "width": 120,
            "displayName": "Order Number",
            "isFixed": "Left",
            "isVisible": false,
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
            "isVisible": false,
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
            "width": 150,
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
        }, {
            "field": "orderName",
            "width": 160,
            "displayName": "Order Name",
            "isVisible": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }, {
            "field": "orderContact",
            "width": 150,
            "displayName": "Order Contact",
            "isVisible": false,
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
            "isVisible": false,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
        },

{
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
},
{
    "field": "supplierShipFrom.location",
    "width": 200,
    "displayName": "Supplier Ship From",
    "isVisible": true,
    "isReadOnly": false,
    "isRegFocusCol": true,
    "filterObject": {
        "enableFiltering": true
    },
    "type": "dropdown",
    "attributes": {
        "model": "supplierShipFrom",
        "dataKey": "location",
        "options": [{
            "id": 1,
            "location": "Mumbai"
        }, {
            "id": 2,
            "location": "Delhi"
        }, {
            "id": 3,
            "location": "Chennai"
        }]
    }
},
 {
     "field": "supplierShipFromAddress",
     "width": 210,
     "displayName": "Supplier Ship From Address",
     "isVisible": true,
     "filterObject": { "enableFiltering": true },
     "type": "editable"
 },
{
    "field": "delieverTo",
    "width": 160,
    "displayName": "Deliver to",
    "isVisible": true,
    "filterObject": {
        "enableFiltering": true
    },
    "type": "editable"
},
{
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
            "field": "supplierName.name",
            "width": 150,
            "displayName": "Supplier Name",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate' smart-tooltip potition='bottom' message='{{row.entity.supplierName.name}}'>{{row.entity.supplierName.name}}</span><a class='ui-grid-cell-container-icons has-received-value' href='javascript:void(0)' ng-if='row.entity.supplierNameWarning'><i class='icon iconSmall grey-text' smart-infotip position='right' message='{{row.entity.supplierNameWarning}}'><svg><use xlink:href='#icon_Info'></use></svg></i></a></div>"
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
            "field": "po.number",
            "width": 200,
            "displayName": "PO Line Number",
            "isVisible": true,
            "isReadOnly": false,
            "isRegFocusCol": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "dropdown",
            "attributes": {
                "model": "po",
                "dataKey": "number",
                "options": [{
                    "id": 1,
                    "number": "Mark As New Item"
                }, {
                    "id": 2,
                    "number": "Omeprazole DR Pellers 80 mg/g 1"
                }]
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
        }, {
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
        },
        {
            "field": "taxCode",
            "width": 150,
            "displayName": "Tax Code",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "enableSorting": true,
            "enableCellEdit": false,
            "isReadOnly": true,
            "isRegFocusCol": true,
            "cellTemplate": "<div ng-include='\"taxCellTemp.html\"'></div>"
        },
        {
            "field": "taxRate",
            "width": 150,
            "displayName": "Tax Rate(%)",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "enableSorting": true,
            "enableCellEdit": false,
            "isReadOnly": true,
            "isRegFocusCol": true,
            "cellTemplate": "<div ng-include='\"taxCellTemp.html\"'></div>"
        },
         {
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
         },
        {
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
            "isReadOnly": true,
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate'>{{row.entity.total}}</span><a class='ui-grid-cell-container-icons' href='javascript:void(0)' ng-if='row.entity.totalWarning'><i class='icon iconSmall red-text' smart-infotip position='right' message='{{row.entity.totalWarning}}'><svg><use xlink:href='#icon_Warning'></use></svg></i></a></div>"
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
        },  {
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
        },  {
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
            "cellTemplate": "<a ui-sref='p2p.inv.additionalInfo({id: {{row.entity.lineNumber}} })'> <span ng-if='row.entity.lineNumber == 1'>Add</span>  <span ng-if='row.entity.lineNumber != 1'>Edit </span> ({{row.entity.additionaInformation.length}})</a>"
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
    $scope.itemModel = [{
        "orderNumber": "PO-80.1004867",
        "orderLineNumber": "5",
        "orderContact": "286290040000001",
        "orderLocation": "Mumbai",
        "orderName": "Dell Laptop",
        "delieverTo": "USA",
        "deliverLocation": "New York",
        
        "spLink": "3 S&PS",
        "comment": "3 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 1,
        "lineNumberWarning": "Received Value: 500.00",
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
        "po": {
            "id": 1,
            "number": "Mark As New Item"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxCode": {
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": false,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
        "taxRate": {
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": true,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
        "taxes": 0,
        "accruedtaxes": 0,
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
        "supplierShipFrom": { "id": 1, "location": "Mumbai" },
        "supplierShipFromAddress": "Mumbai",
        "deliverTo": null,
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
        "orderNumber": "PO-80.1004880",
        "orderLineNumber": "14",
        "orderContact": "286290041585080",
        "orderName": "Dell Laptop",
        "delieverTo": "USA",
        "deliverLocation": "New York",
        "orderLocation": "Bangalore",
        "spLink": "2 S&PS",
        "comment": "4 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 2,
        "lineNumberWarning": "Received Value: 500.00",
        "totalWarning": "Received Value: 500.00",
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
        "po": {
            "id": 1,
            "number": "Mark As New Item"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxCode": {
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": false,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
        "taxRate":  {
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": true,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
        "taxes": 0,
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
        "supplierShipFrom": { "id": 1, "location": "Mumbai" },
        "supplierShipFromAddress": "Mumbai",
        "deliverTo": null,
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
        "orderNumber": "PO-80.1004891",
        "orderLineNumber": "56",
        "orderContact": "286290048956234",
        "orderName": "Dell Laptop",
        "delieverTo": "USA",
        "deliverLocation": "New York",
        "orderLocation": "Hyderabad",
        "spLink": "5 S&PS",
        "comment": "6 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 3,
        "supplierNameWarning": "Received Value: 500.00",
        "totalWarning": "Received Value: 500.00",
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
        "po": {
            "id": 1,
            "number": "Mark As New Item"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
       "taxCode": {
           "selected": {
               "name": "Vat 8"
           },
            "isMultiselect": false,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
       },
        "taxRate":{
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": true,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
        "taxes": 0,
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
        "supplierShipFrom": { "id": 1, "location": "Mumbai" },
        "supplierShipFromAddress": "Mumbai",
        "deliverTo": null,
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
        "orderNumber": "PO-80.1004852",
        "orderLineNumber": "24",
        "orderContact": "286290047852456",
        "orderName": "Dell Laptop",
        "delieverTo": "USA",
        "deliverLocation": "New York",
        "orderLocation": "Chennai",
        "spLink": "6 S&PS",
        "comment": "2 Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 4,
        "totalWarning": "Received Value: 500.00",
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
        "po": {
            "id": 1,
            "number": "Mark As New Item"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
        "taxCode": {
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": false,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
        "taxRate": {
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": true,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
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
        "supplierShipFrom": { "id": 1, "location": "Mumbai" },
        "supplierShipFromAddress": "Mumbai",
        "deliverTo": null,
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
        "orderNumber": "PO-80.1004839",
        "orderLineNumber": "16",
        "orderContact": "286290041155882",
        "orderName": "Dell Laptop",
        "delieverTo": "USA",
        "deliverLocation": "New York",
        "orderLocation": "Delhi",
        "spLink": "ADD S&P",
        "comment": "Add Comments",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 5,
        "lineNumberWarning": "Received Value: 500.00",
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
        "po": {
            "id": 1,
            "number": "Mark As New Item"
        },
        "startDate": "/Date(1456165800000)/",
        "endDate": "/Date(1456597800000)/",
        "unitPrice": 100,
        "total": 10000,
       "taxCode": {
           "selected": {
               "name": "Vat 8"
           },
            "isMultiselect": false,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
       },
        "taxRate": {
            "selected": {
                "name": "Vat 8"
            },
            "isMultiselect": true,
            "options": [
              {
                  "name": "Vat 8"
              },
              {
                  "name": "Vat 10"
              },
               {
                   "name": "Vat 25"
               },
                {
                    "name": "Vat 30"
                },
            ]
        },
        "taxes": 0,
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
        "supplierShipFrom": { "id": 1, "location": "Mumbai" },
        "supplierShipFromAddress": "Mumbai",
        "deliverTo": null,
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


    // ui grid for accounting

    //UI grid -- accounting
    $scope.accountingConfig = [{
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
    $scope.accountingModel = [{
        "splitNumber": "Split 1",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 1,
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
    }, {
        "splitNumber": "Split 2",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 1,
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 3000,
        "splittotal": 3000,
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
    }, {
        "splitNumber": "Split 3",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 1,
        "documentCode": 21193,
        "p2PLineItemId": 202239,
        "catalogItemId": 42,
        "taxes": 0,
        "splitTaxes": 0,
        "splitValues": 2000,
        "splittotal": 2000,
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
    }, {
        "splitNumber": "Split 4",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 1,
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
    }, {
        "splitNumber": "Split 1",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 2,
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
    }, {
        "splitNumber": "Split 2",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 2,
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
    }, {
        "splitNumber": "Split 1",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 3,
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
    }, {
        "splitNumber": "Split 1",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 4,
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
    }, {
        "splitNumber": "Split 1",
        "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        "isTaxExempt": false,
        "status": 1,
        "splitType": 0,
        "id": 21559,
        "lineNumber": 5,
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





    // UI Grid -- popup callback 
    $scope.callbackFucn = function(obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive

        // UI Grid -- popup callback -- category papup

        if (def.col && def.col.displayName == 'Category') {
            $scope.treeOpenCallback('category');
        }
        // UI Grid -- popup callback -- taxes papup
        if (def.col && def.col.field == 'taxes') {
            $scope.$emit('openTaxPopup', {
                showTaxPopup: true,
                isaccruedtaxes: false,
                  isLineaccrudtaxes: false
            })

        }

        if(def.col && def.col.field == 'accruedtaxes'){

              $scope.$emit('openTaxPopup', {
                  showTaxPopup: true,
                  isaccruedtaxes: true,
                  isLineaccrudtaxes: true
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

    // UI grid callback end here
    $scope.selectCurrentTax = function (rowRenderIndex, field, opt) {
        var row = $scope.itemModel[rowRenderIndex];
        row[field].selected = opt;
    };
    var getRowindex, getColField;
    $scope.openPopupTax = function (e, rowRenderIndex, field) {
        getRowindex = rowRenderIndex;
        getColField = field;
        $scope.$emit('openTaxPopup', {
            showTaxPopup: true,
            isaccruedtaxes: false,
            isLineaccrudtaxes: false
        })
    };
    $scope.$on('taxPopupClose', function(event, args) {
        if(getRowindex && getColField){
        let getRow = $scope.itemModel[getRowindex];
        if (args.taxPopupGetClose) {
            if(!getRow[getColField].isMultiselect){
                getRow[getColField].isMultiselect = true;
            };
            getRowindex == null
            getColField == null;
        }
        }
    });
    $scope.showGridSandPPopup = false;
    $scope.showGridSandPCallback = function() {
        $scope.showGridSandPPopup = true;
    };
    $scope.showGridSandPPopupHideCallback = function(e) {
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
    $scope.selectedItem = function(index) {
        setActive(index);
    };
    $scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
    $scope.showSPPopup = false;
    $scope.showSPPopupCall = function() {
        $scope.showGridSandPPopup = false;
        $scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
        $scope.selectedSP = {};
        $scope.showSPPopup = true;
    }
    $scope.hideSPPopupCall = function(e) {
        $scope.showGridSandPPopup = true;
        $scope.showSPPopup = false;
    }
    $scope.editSandPGridCall = function(spObj) {
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
    $scope.removeRow = function(index) {
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
    $scope.addRow = function() {
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

    // Start: popup -- split
    $scope.splitPopupUrl = "p2p/req/views/popupSplit.html";
    $scope.splitPopupPopup = false;
    $scope.splitPopupCallback = function(e) {
        $scope.splitPopupPopup = true;
    };
    $scope.splitPopupPopupHideCallback = function(e) {
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
    $scope.onChangeSplit = function(selectedSplit) {
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
                angular.element('#numberContainer').find('.scroll-content').scrollTop(getContent +55);
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
                angular.element('#percentContainer').find('.scroll-content').scrollTop(getContent +55);
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

    //line grid functions
    $scope.addBulkRow = function () {
        angular.element(document).triggerHandler('click');
    }
    $scope.cancelBulkRow = function () {
        angular.element(document).triggerHandler('click');
    };

    $scope.applyCurrentFields = function (a, b) {
        console.log(a + '  ' +b);
        angular.element(document).triggerHandler('click');
    };
    $scope.cancelAllFields = function () {
        angular.element(document).triggerHandler('click');
    }

    $scope.resetAllFields = function (a, b) {
        console.log(a + '  ' +b);
    }

    /*Exception Type popup callback: start*/
    $scope.excTypePopupUrl = "shared/popup/views/popupExcType.html";
    $scope.showExcTypePopup = false;
    $scope.showExcTypePopupCallBack = function (e) {
        $scope.showExcTypePopup = true;
    }
    $scope.hideExcTypePopupCallback = function (e) {
        $scope.showExcTypePopup = false;
    }
    /*Exception Type popup callback: end*/

    /*Exception Type Popup Data: start*/
    function getExceptionData() {
        var invWidgetData = {
            method: 'GET',
            url: 'p2p/inv/models/invWidgetsData.json'
        };

        scannedInvServices.getJSONData(invWidgetData).then(function (response) {
            $scope.exceptionData = response.exceptionData;
            $scope.changeLineMappingData = response.changeLineMappingData;
        });
    }
    getExceptionData();

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

    $scope.overrideExcOptions =[
        {"name": "Yes"},
        {"name": "No"}
    ];
    $scope.selectOverrideExc = {"name": "Yes"};
    /*Exception Type Popup Data: end*/

    $scope.$watch(function () { return shareWithCtrl.data.value }, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            if (shareWithCtrl.data.value.name == "Multi PO invoice") {
                angular.forEach($scope.itemConfig, function (value, itemIndex) {
                    if ($scope.itemConfig[itemIndex].displayName == "Order Number" || $scope.itemConfig[itemIndex].displayName == "Order Line Number" || $scope.itemConfig[itemIndex].displayName == "Order Name" || $scope.itemConfig[itemIndex].displayName == "Order Contact" || $scope.itemConfig[itemIndex].displayName == "Order Location") {
                        $scope.itemConfig[itemIndex].isVisible = true;
                    }
                });
            }
            else {
                angular.forEach($scope.itemConfig, function (value, itemIndex) {
                    if ($scope.itemConfig[itemIndex].displayName == "Order Number" || $scope.itemConfig[itemIndex].displayName == "Order Line Number" || $scope.itemConfig[itemIndex].displayName == "Order Contact" || $scope.itemConfig[itemIndex].displayName == "Order Location") {
                        $scope.itemConfig[itemIndex].isVisible = false;
                    }
                });
            }
        }
    });
    $scope.calculateTaxCalled = function () {
        var confi = {
            type: "confirm",
            message: "<p class='left-align'>This may take a while. You can re-visit the page once taxes are calculated</p>",
            checkMessage: "Notify over Email",
            buttons: [
                {
                    "title": "OK",
                    "result": "yes"
                },
                {
                    "title": "CANCEL",
                    "result": "no"
                }
            ]
        };

        //Notification call
        notification.notify(confi, function (responce) { });
    }
    $scope.changeLineMappingPopupUrl = "shared/popup/views/popupChangeLineMapping.html";
    $scope.showChangeLineMappingPopup = false;
    $scope.showChangeLineMapping = function (e) {
        $scope.showChangeLineMappingPopup = true;
    }

    $scope.hideChangeLineMapping = function (e) {
        $scope.showChangeLineMappingPopup = false;
    }
}


function additionalInformationCtrlFunc($scope, $rootScope, RuleEngine, $http, $window, $state, $timeout, $sce) {
    /* Additional information  */

    $scope.idIs = $state.params.id;
    var additionalInfo = {
        method: 'GET',
        url: 'p2p/inv/models/createInv.json'
    };

    $http(additionalInfo).then(function(response) {
        $scope.data = response.data.dataModel;
        $scope.dataModel = $scope.data.additionalInfo.data;
        $scope.lineviewData = $scope.data.LineLeveladditionalInfo;
        if ($state.current.name == 'p2p.inv.additionalInfo' && $scope.idIs != undefined) {
            $scope.lineviewData[$scope.idIs].showContent = true;
            $scope.isAdditionalInfoPage = true;
        }
    }, function(error) {
        console.log(JSON.stringify(error));
    });





    $scope.sectionName = "ADDITIONAL INFORMATION"

    $scope.fieldCount = function(paramUse) {

        var count = 0;
        angular.forEach(paramUse, function(k, v) {
            count += paramUse[v].questions.length;
        });
        return count;
    }


    $scope.returnColClass = function(que) {
        var q = que.question;
        if (q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" || q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" && q == "") {
            return "s12 m6 l4 xl4 xxl4";
        } else if (q.length >= 21 && q.length <= 40 && que.type != "multi-text" && que.type != "multi-text-with-icon") {
            return "s12 m12 l6 xl6 xxl6";
        } else {
            return "s12";
        }
    }




    // side bar -- dynamic scrolling
    $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
    angular.element($window).bind('resize', function(e) {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        } else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        $scope.$apply();
    });

    angular.element($window).bind('scroll', function() {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        } else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }
        $scope.$apply();
    });


    //left panel selection link
    $scope.currentSelected = $scope.idIs;
    $scope.selectedItem = function(index) {

        angular.forEach($scope.lineviewData, function(value, key) {
            $scope.lineviewData[key].showContent = false;
        });

        $scope.currentSelected = index;
        $scope.lineviewData[index].showContent = true;
    }



    // right side content height
    $scope.contHeight = function(fixedSubHeader) {
        if (fixedSubHeader) {

            return $window.innerHeight - 50
        } else {

            return $window.innerHeight - 114
        }

    };

    // sidebar -- show hide button interaction
    $scope.isActive = false;
    $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
    }


    // side bar interaction for less than 1200px
    $scope.isActiveSideBar = true;
    angular.element($window).bind('resize', function(e) {
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
    $scope.showSearchC = function() {
        $scope.isActiveC = true;
        $scope.focusSearchC = true;
        $scope.showMeC = true;
        $scope.hideCloseC = true;
    };
    $scope.hideSearchC = function() {
        $scope.isActiveC = false;
        $scope.focusSearchC = false;
        $scope.hideCloseC = false;
    };

    $scope.getFieldType = function(getFieldType) {
        switch (getFieldType) {
            case 'numeric':
                return 'number'
                break;
            default:
                return 'text'
                break;
        }
    }

    $scope.returnField = function(fieldType) {

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

    $scope.addDocumentPopupCallback = function(data) {
        //if (!$scope.supplierView) {

        $scope.uploadTitle = "ADD ATTACHMENT";
        $scope.uploadTitleContent = "Upload Attachments";
        $scope.addDocumentPopup = true;
        //}
        //if ($scope.supplierView) {
        data.isVisible = true;
        //}
    }
    $scope.hideAddDocumentPopupCallback = function() {
        $scope.addDocumentPopup = false;
    };
    // Start: Upload events
    $scope.attachFlag = false;
    $scope.attachmentList = [{
        name: "AttachmentOne.xls",
        status: "fail",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: false
    }, {
        name: "AttachmentTwo.xls",
        status: "fail",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: false
    }, {
        name: "AttachmentThree.xls",
        status: "fail",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: false
    }, {
        name: "AttachmentFour.xls",
        status: "success",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: false
    }, {
        name: "AttachmentFive.xls",
        status: "success",
        referenceName: "Add Name",
        isShow: true,
        actionIconDelete: true
    }];
    $scope.attachmentCall = function(e) {
        $scope.attachFlag = true;

        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function(el) {
        el.isShow = false;

    };
    $scope.retryCall = function(el) {
        el.status = "success";
    };
    // End: Upload events

    $scope.moreFieldsClick = function () {
        $state.go('p2p.inv.additionalInfo', { 'id': 0 });
    }

}

function supplierFieldCtrlFunc($scope){
    $scope.showSupplierIcard = function () {
         $scope.$emit('showSupIcard', {"flag" : true})
    }
   
   

}

function p2pInvExceptionTypeHederCtrlFunc($scope, $rootScope, $translate, $http, $state, notification, shareData) {
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

function p2pInvExceptionTypeInfoCtrlFunc($scope, $rootScope, $translate, $http, $state, notification, shareData, scannedInvServices, shareWithCtrl) {
    function getExceptionData() {
        var invWidgetData = {
            method: 'GET',
            url: 'p2p/inv/models/invWidgetsData.json'
        };

        scannedInvServices.getJSONData(invWidgetData).then(function (response) {
            $scope.exceptionData = response.exceptionData;
        });
    }
    getExceptionData();

    $scope.excTypeShowColumn = false;
    $scope.$watch(function () { return shareWithCtrl.data.value }, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            if (shareWithCtrl.data.value.name == "Multi PO invoice") {
                $scope.excTypeShowColumn = true;
            }
            else {
                $scope.excTypeShowColumn = false;
            }
        }
    });

    $scope.excTypeOptions = [
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
    $scope.selectedExcType = {
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

    $scope.exceptionTypeChange = function (currObj) {
        $scope.selectedExcType = currObj;
    };
}

function popupInvShipToCtrlFunc($scope) {
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
    $scope.selectedBillTo = $scope.options[0];
    $scope.selectedDeliverTo = $scope.options[0];

    $scope.showLocationPopupFn = function () {
        $scope.$emit('openshipToPoup',{data:true} );
    }
   
}

function p2pErrorCtrlFunc($scope, $rootScope, $translate, $http, $state, notification, shareData, scannedInvServices, shareWithCtrl) {
    $scope.supplierError = [
        { name: "Unclear Structure" },
        { name: "Unclear Image" },
        { name: "Total Calculation Error" },
        { name: "Line Total Error" },
        { name: "No Invoice Total" },
        { name: "No Vendor ID" },
        { name: "No Vendor Address" },
        { name: "No Vendor Name" },
        { name: "No Vendor City" },
        { name: "Invalid PO" },
        { name: "PO Vendor Mismatch" },
        { name: "Duplicate Invoice Number" },
        { name: "Disconnect" },
        { name: "Zero Dollar Invoice Total" },
        { name: "Out of Date Range" },
        { name: "Past Due" }
    ]
}