angular.module('SMART2')
    .controller('p2pInvnonPoBasicDetailsCtrl', ['$scope', '$window', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$sce', '$filter', 'scannedInvServices', p2pInvnonPoBasicDetailsCtrlFunc])
    .controller('itemDetailnonPoInvCtrl', ['$scope', 'notification', '$translate', '$sce', '$http', '$state', 'scannedInvServices', '$timeout', itemDetailnonPoInvCtrlFunc])
    .controller('p2pInvNonPoExceptionTypeHederCtrl', ['$scope', '$rootScope', '$translate', '$http', '$state', 'notification', 'shareData', 'scannedInvServices', p2pInvNonPoExceptionTypeHederCtrlFunc])
    .controller('p2pInvNonPoExceptionTypeInfoCtrl', ['$scope', '$rootScope', '$translate', '$http', '$state', 'notification', 'shareData', 'scannedInvServices', p2pInvNonPoExceptionTypeInfoCtrlFunc])
    .controller('linesDetailsHeaderCtrl', ['$scope', '$rootScope', '$translate', linesDetailsHeaderCtrlFunc])
    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>')
            return $sce.trustAsHtml(text)
        }
    });

/* page Contoller */
function p2pInvnonPoBasicDetailsCtrlFunc($scope, $window, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $sce, $filter, scannedInvServices) {
    $scope.singlePOInvoice = true;
    $scope.invoiceTypeChange = function (selectedInvoiceType, modelData) {
        var confi = {
            type: "confirm",
            message: "<p class='left-align'>Are you sure you want change invoice type?</p>",

            buttons: [
				{
				    "title": "YES",
				    "result": "yes"
				},
				{
				    "title": "No",
				    "result": "no"
				}
            ]
        };

        //Notification call
        notification.notify(confi, function (responce) {
            if (responce.result == "yes") {
                if (selectedInvoiceType.name == "Multi PO invoice") {
                    $scope.singlePOInvoice = false;
                }
                else {
                    $scope.singlePOInvoice = true;
                }
                shareWithCtrl.data.value = selectedInvoiceType;
            } else {
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
            }
        });
    }
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
    var sectionContent = document.getElementById('sectionsContent'),
        scannedInvoiceSection = document.getElementById('scannedInvoiceSection'),
        subFromWidget = document.getElementById('subFromWidget'),
            getWindowWidth = $window.innerWidth,
             getWindowHeight = $window.innerHeight;

    $scope.isSmallSize = true;// flag for apply the width col
    $scope.pdfCtrsmallScreenView = false; // flag for hide the pagination;
    // function reset the col fields
    $scope.onRightSideResizable = function (event, ui) {
        var getCurrentSize = ui.size.width,
            checkWidthInPercent = parseFloat(subFromWidget.style.width) / (getWindowWidth / 100);
        if (checkWidthInPercent > 45) {
            $scope.pdfCtrsmallScreenView = true;
        } else {
            $scope.pdfCtrsmallScreenView = false;
        };

        if (775 < getCurrentSize) {
            $scope.isSmallSize = false;
        } else {
            $scope.isSmallSize = true;
        }
    }
    // function reset Right Resizable
    var resetRightResizable = function () {
            sectionContent.style.width = '';
           scannedInvoiceSection.style.width = '';
           subFromWidget.style.width = '';
           $scope.isSmallSize = true;
           $scope.pdfCtrsmallScreenView = false;
    }

    $scope.islinedetailspopout = false;
    $scope.$on('islineDetailsPopOut', function (event, args) {
        var getLabel = args.sectionLabel;
        getSectionIndex = _.findIndex($scope.formConfig.sections, {
            label: getLabel
        });
        
       $scope.islinedetailspopout = args.islineDetailsPopOut
       if ($scope.islinedetailspopout == true) {
            $scope.formConfig.sections[getSectionIndex].isActive = false;
            $scope.formConfig.sections[getSectionIndex].isSectionDisable = true;
        } else {
            $scope.formConfig.sections[getSectionIndex].isSectionDisable = false;
            $scope.formConfig.sections[getSectionIndex].isActive = true;
        }
    });


    //ship to location poup
    $scope.showLocationPopup = false;
    $scope.showLocationPopupFn = function () {
        $scope.showLocationPopup = true;
    };
    $scope.showLocationPopupClBack = function () {
        $scope.showLocationPopup = false;
    };

    $scope.$on('openshipToPoup', function (event, args) {
        $scope.showLocationPopup = args.data;

    });
    // scannedInv popupout
    $scope.fixHeaderHeight = {
        "height": "310px"
    };
    $scope.popOut = false;
    //define the current width
    var sectionContentWidth, scannedInvSectionWidth,
     subFromWidgetWidth, currentisSmallsize, checkRightPanelVisible, currentpdfCtrsmallScreenView;

    $scope.$on('openScannedInvInPopup', function (event, args) {
        $scope.popOut = !$scope.popOut;
        $scope.isScannedDocCollaps = !args.message;
       
        if (!$scope.isScannedDocCollaps) {
            sectionContentWidth = sectionContent.offsetWidth,
             scannedInvSectionWidth = scannedInvoiceSection.offsetWidth,
             subFromWidgetWidth = subFromWidget.offsetWidth,
             currentisSmallsize = $scope.isSmallSize;
            currentpdfCtrsmallScreenView = $scope.pdfCtrsmallScreenView;
            $scope.fixHeaderHeight = {
                "height": "42px"
            };
            // shift the content and hide all the right side content
            if ($scope.isRightVisible) {
                checkRightPanelVisible = $scope.isRightVisible;
                $scope.isRightVisible = false;
            }
            angular.forEach($scope.formConfig.sections, function (value, key) {
                if (value.isSwitchable == true) {
                    $scope.formConfig.sections[key].isShift = false;
                }
            });
            $scope.leftToRightDisabled = false;
               resetRightResizable()
        } else {
            var getHeight = angular.element('#scannedInvDiv').height();
            if (checkRightPanelVisible){ 
            $scope.secContentPrevWidth = { "width": sectionContentWidth };
            $scope.ScanInvPrevWidth = { "width": scannedInvSectionWidth };
            $scope.subFromWidgetPrevWidth = { "width": subFromWidgetWidth };
            $scope.isSmallSize = currentisSmallsize;
            checkRightPanelVisible = null;
            $scope.pdfCtrsmallScreenView = currentpdfCtrsmallScreenView;
            }
            $scope.fixHeaderHeight = {
                "height": getHeight
            };
            getHeight = null;
            // reset the right side widget on click.
            if ($scope.shiftedList) {
                angular.forEach($scope.shiftedList, function (value) {
                    var findArray = $filter('filter')($scope.formConfig.sections, {
                        'label': value
                    }, true)[0],
                        getIndex = $scope.formConfig.sections.indexOf(findArray);
                    $scope.formConfig.sections[getIndex].isShift = true;
                    $scope.leftToRightDisabled = true;
                    if (!$scope.isRightVisible) {
                        $scope.isRightVisible = true;
                    }
                });
                
            }
        }
    });


  
    //max width
    $scope.applyMaxWidth = function () {
        var returnTheMaxwidth =  getWindowWidth/ 100 * 60;
        return returnTheMaxwidth;
    }
    //min width
    $scope.applyMinWidth = function () {
        var returnTheMinwidth = getWindowWidth/ 100 * 25;
        return returnTheMinwidth;
    }

    //resizableLimits
    $scope.resizableMaxHeight = function (checkSubheader) {
        var getmaxHeight = getWindowHeight - 325;
        if (checkSubheader && (!$scope.islinedetailspopout || undefined )) {
            getmaxHeight = getWindowHeight -295;
        } else if (!checkSubheader && $scope.islinedetailspopout)
        {
            getmaxHeight = getWindowHeight - 225
        
        }
        else if (checkSubheader && $scope.islinedetailspopout) {
            getmaxHeight = getWindowHeight - 195
        }
        return getmaxHeight;
    }
    $scope.onStopResizing = function () {
        var getHeight = angular.element('#scannedInvDiv').height()
        $scope.fixHeaderHeight = { "height": getHeight };
        getHeight = null;
    }

    // icard popup
    //supplier i card popup


    $scope.$on('showSupIcard', function (evt, data) {
        $scope.showSupplierIcardPopup = data.flag
    });
    $scope.showSupplierIcardPopup = false;
    $scope.showSupplierIcard = function () {
        $scope.showSupplierIcardPopup = true;
    }
    $scope.hideSupplierIcardPopupCallback = function () {
        $scope.showSupplierIcardPopup = false;
    };

    /*Card popup data start*/
    $scope.supplierIcard = scannedInvServices.SUPPLIER_ID_CARD;
    $scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";//[TODO]
    $scope.smartCatPopupSingleLevel = "shared/popup/views/smartCatPopupSingleLevel.html";//[TODO]
    /*Card popup data end*/
    // popup -- Add Taxes -- grid Data -- add new row
    $scope.hideSecNav = false;
    $scope.isaccruedtaxes = false;
    $scope.isLineaccrudtaxes = false;
    $scope.exemptConfirmCall = function () {
        var config = scannedInvServices.NOTIFICATION_CONFIG;
        $scope.showTaxesPopup = false;
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

    /* tax popover */
    $scope.taxConfig = scannedInvServices.TAX_CONFIG;
    $scope.getTotalTax = function () {
        var count = 0;
        angular.forEach($scope.taxConfig, function (taxValue) {
            count += parseInt(taxValue.dataValue);
        });
        return count;
    };

    $scope.makeEditCurrent = function (elem) {
        $scope.taxConfig.forEach(function (element, index, array) {
            $scope.taxConfig[index].makeEdit = false;
        });
        $scope.taxConfig[elem].makeEdit = true;
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

    // popup -- Add Taxes -- grid Data -- add a row in the array
    $scope.taxList = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = scannedInvServices.TAXES_DETAIL_LIST;
    // popup -- Add Taxes -- grid Data -- iffy function for percentage
    $scope.$on('openTaxPopup', function (event, args) {
        if (args.showTaxPopup == true) {
            $scope.isaccruedtaxes = args.isaccruedtaxes;
            $scope.showTaxesPopup = true;
            $scope.isLineaccrudtaxes = args.isLineaccrudtaxes;
        }
    });
    // other popup
    // popup -- taxes -- select item -- item list
    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function (isAccruedTaxes) {
        $scope.showTaxesPopup = true;
        $scope.isaccruedtaxes = isAccruedTaxes;
    };

    $scope.taxesPopUpOnHideCallback = function (e) {
        $scope.showTaxesPopup = false;
        $scope.isaccruedtaxes = false;
        $scope.isLineaccrudtaxes = false;
    }

    function updatePersentage() {
        var sum = 0,
            len = $scope.taxesDetailLists.length;
        for (var i = 0; i < len; i++) {
            sum += parseInt($scope.taxesDetailLists[i].taxRate, 10);
        }
        $scope.totalPercentage = sum / len;
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
        var confi = scannedInvServices.NOTIFICATION_CONFIG;
        confi['type'] = "warning";
        confi['message'] = msgDetails;
        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                updatePersentage();
            }
            $scope.showTaxesPopup = true;
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

    $scope.CloseFn = function () {
        $scope.showTaxesPopup = false;
    }
    
    $scope.applyProrate = function () {
        var config = scannedInvServices.NOTIFICATION_CONFIG;
        config['type'] = "confirm";
        config['message'] = "<div class='left-align'>There are taxes already accrued at line item level. Prorating from header will over write those values. Do you want to proceed?'</div>";
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
    $scope.hideWidget = function () {
        var getHeight = '';
        if (!$scope.popOut) {
            if ($scope.isScannedDocCollaps) {
                $scope.fixHeaderHeight = {
                    "height": "42px"
                };
                getHeight = angular.element('#scannedInvDiv').height();
            } else {
                $scope.fixHeaderHeight = {
                    "height": getHeight
                };
            }
            $scope.isScannedDocCollaps = !$scope.isScannedDocCollaps;
        }
        getHeight = null;
    }
    $scope.showUploadScannedPopup = false;
    $scope.hideDownloadTemplate = true;
    $scope.adduploadScannedCallback = function () {
        $scope.uploadTitle = "Upload Scanned Document";
        $scope.uploadIcon = "#icon_Upload";
        $scope.showUploadScannedPopup = true;
    }
    $scope.hideUploadScannedPopupCallback = function (e) {
        $scope.showUploadScannedPopup = false;
    }
    // [Performance in progress] $scope.attachmentMsg --> msg
    // $scope.attachmentMsg = "Supported file formats: doc, docs,pdf, jpg, jpeg, png.\
    //     <br />Limited to file(s) of 10MB each.\
    //     <br /> Maximum 5 files can be uploaded.";
    var msg = "Supported file formats: doc, docs,pdf, jpg, jpeg, png.\
    //     <br />Limited to file(s) of 10MB each.\
    //     <br /> Maximum 5 files can be uploaded.";
    $scope.attchmentMsg = $sce.trustAsHtml(msg);
    var scannedDocAttached = false;
    $scope.attachAction = function () {
        scannedDocAttached = true;
    }
    $scope.attachCompleteCall = function () {
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
    $scope.orgOptions = scannedInvServices.ORG_OPTIONS;
    $scope.selectedOrganization = $scope.orgOptions[0];
    $scope.typeOptions = scannedInvServices.TYPE_OPTIONS;
    $scope.selectedSupplier = $scope.typeOptions[0];
    /*slider*/
    $scope.changeImageScale = 1.0;
    $scope.scannnedImagesList = scannedInvServices.SCANNED_IMAGE_LIST;
    $scope.openPopuFlag = false;
    $scope.changeImagePopOutFalse = false;
    $scope.$on('showImages', function (event, args) {
        $scope.openPopuFlag = true;
        $scope.slideObj = {
            list: $scope.scannnedImagesList,
            index: 0,
            src: 'p2p/inv/views/templateInvoiceScreenshot.html'
        };

    });
    $scope.closeSlideView = function () {
        $scope.openPopuFlag = false;
    }
    //Slider ends
    /*sccaned document end*/
    // POPUP -- comments
    $scope.commentIcon = '#icon_Comments'; //icon_Commented

    $scope.showCommentsPopup = false;
    $scope.checkicardPopup = false;
    $scope.showCommentsPopupCallback = function (e) {
        $timeout(function () {
            $scope.showCommentsPopup = true;
        }, 500);
        if ($scope.showSupplierIcardPopup == true) {
            $scope.checkicardPopup = true;
            $scope.showSupplierIcardPopup = false;
        }
    };
    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showCommentsPopup = false;
        $scope.commentIcon = '#icon_Commented'; //icon_Comments
        if ($scope.checkicardPopup == true) {
            $scope.showSupplierIcardPopup = true;
            $scope.checkicardPopup = false;
        }
    };

    $scope.commentList = scannedInvServices.COMMENT_LIST;
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
        $timeout(function () {
            $scope.showUploadPopup = true;
        }, 500);
        comingFrom = popupComingfrom;[TODO]
        if (popupComingfrom != undefined) {
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
    $scope.attachmentList = scannedInvServices.ATTACHMENT_LIST;
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;
        var len = $scope.attachmentList.length;
        for (var i = 0; i < len; i++) {
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
        var len = $scope.attachmentList.length;
        if (len > 1) {
            if (len == 2) {
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
            }, 0); // Earlier 800 [PERFORMANCE in Progress]
        } else {
            $scope.showErrorAlert = true;
            $scope.showErrorAlertMsgCont = true;
        }
    }

    $scope.modules = scannedInvServices.MODULES;
    $scope.modulecurrentTab = 'requisition.html';
    $scope.moduleactiveListTabs = 0;
    $scope.modulesetActiveListTab = function (menuItema) {
        $scope.moduleactiveListTabs = menuItema;
        $scope.modulecurrentTab = $scope.modules[menuItema].url;
    }
    /*current for tax poup start*/
    // PRINT PRVIEW
    $scope.showPreview = function () {
        $state.go('p2p.inv.preview');
    }
    /*tax popup*/
    $scope.taxList = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };
    $scope.taxesDetailLists = scannedInvServices.TAXES_DETAIL_LIST; //[PERFORMANCE in Progress]
    /*current for tax poup end*/
    /*section search content start*/
    $scope.sectionAndFieldsDetails = scannedInvServices.SEC_FIELDS_DETAILS;
    /*section search content end*/
    $scope.topValueSectionTrack = 115;
    $scope.submitReq = function () {
        var confi_2 = scannedInvServices.NOTIFICATION_CONFIG,
            msg = "<p class='left-align'>Invoice created successfully.</br> Would you like to create another Invoice? </p>";
        confi_2['type'] = "success";
        confi_2['message'] = msg; //[PERFORMANCE In Progress] title no thanks - > no
        notification.notify(confi_2, function (response) {
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
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };
    nonPoInv();

    function nonPoInv() {
        var reqData = {
            method: 'GET',
            url: 'p2p/inv/models/createNonPoInv.json'
        };
        scannedInvServices.getJSONData(reqData)
            .then(function (response) {
                $scope.dataModel = response.dataModel;
                $scope.formConfig = response.formConfig;
                if ($state.params.mode == 'blank') {
                    $scope.formConfig.sections[0].isVisible = true;
                }
            }).catch(function (err) {
                // Handle the error
            });
    }
    // [PERFORMANCE IN Progress]
    // $http(inv).then(function(response) {
    //
    //     $scope.dataModel = response.data.dataModel;
    //     $scope.formConfig = response.data.formConfig;
    //     if ($state.params.mode == 'blank') {
    //         $scope.formConfig.sections[0].isVisible = true;
    //     }
    //     // [PERFORMANCE IN PPROGRESS]
    //     // $scope.$watch('dataModel', function(n, o) {
    //     //
    //     // }, true);
    // }, function(error) {
    //     console.log(JSON.stringify(error));
    // });
    // [TODO IS below function needed on scope?]
    $scope.validateForm = function () {
        RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
        // RuleEngine.execute(function(e) {
        //     console.log(e);
        // });
    };
    $scope.showSearchHeader = function () {
        this.isActiveHeader = true;
        this.focusSearchHeader = true;
        this.hideCloseHeader = true;
    }
    $scope.hideSearchHeader = function () {
        this.isActiveHeader = false;
        this.focusSearchHeader = false;
        this.hideCloseHeader = false;
    }
    $scope.setTemplateData = [];
    getTemplateData();

    function getTemplateData() {
        var reqData = {
            method: 'GET',
            url: 'p2p/req/models/tempateData.json'
        };
        scannedInvServices.getJSONData(reqData)
            .then(function (response) {
                $scope.setTemplateData = response;
            }).catch(function (error) {
                //Handle error
            });
    }
    $scope.getItemNum = [];
    /*showing footer on checkbox true*/
    $scope.checkboxIsTrue = false;
    var listCount = [];
    $scope.useSelectedTemplatefunc = function (ele) {
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

    $scope.goToPage = function () {
        $state.go(templateLink);
    }
    /* poup command*/
    $scope.userthisTemplate = function (e) {
        $state.go(templateLink);
        $scope.tempPopup = false;
    }
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.hideClose = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };
    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.hideClose = false;
    };

    $scope.selectedItems = 6;
    $scope.addItem = function (elem, index) {
        var itemallSelect = $scope.setTemplateData[index].isCheckedAll;
        if (elem == true) {
            $scope.selectedItems = ($scope.selectedItems + 1);
        } else {
            $scope.setTemplateData[index].isCheckedAll = false;
            $scope.selectedItems = ($scope.selectedItems - 1);
        }
    };
    $scope.selectAllTemple = function (selectedTemplateallitem, index) {
        var tempAttr = $scope.setTemplateData[index].tempAttr,
            len = tempAttr.length;
        if (selectedTemplateallitem != true) {
            for (var i = 0; i < len; i++) {
                tempAttr[i].isChecked = false;
            }
        } else {
            for (var i = 0; i < len; i++) {
                tempAttr[i].isChecked = true;
            }
        }
    };
    $scope.companyOptions = scannedInvServices.COMPANY_OPTIONS;
    $scope.selectedCompany = $scope.companyOptions[0];
    /* OEDER NUMBER - AUTO SUGGEST */
    $scope.orderOptions = scannedInvServices.ORDER_OPTIONS;
    $scope.selectedOrder = $scope.orderOptions[0];
    /* OEDER NUMBER - AUTO SUGGEST ENDS */
    /* NON PO INVOICE - CHECKBOX */


    // popup -- trackstatus

    $scope.trackStatusPopup = false;
    $scope.trackStatusPopupCallback = function (e) {
        $scope.trackStatusPopup = true;
    };
    $scope.trackStatusOnHideCallback = function (e) {
        $scope.trackStatusPopup = false;
    };

    $scope.deleteInvoice = function () {
        var deleteInvoiceObj = scannedInvServices.NOTIFICATION_CONFIG;
        deleteInvoiceObj['type'] = "warning";
        deleteInvoiceObj['message'] = "<p class='left-align'>Do you want to delete this Invoice?</p>";
        notification.notify(deleteInvoiceObj, function (responce) {
            var result = responce.result;
            if (result == 'yes') {
                $state.go('expandedLandingList', {
                    doctype: 'invoice'
                });
            }
        });
    }

    $scope.paymentTermOptions = scannedInvServices.PAYMENT_TERM_OPTIONS;
    $scope.selectedPaymentTerm = $scope.paymentTermOptions[3];
    /*switch the config*/
    $scope.leftToRightDisabled = false;
    $scope.shiftedList = [];
    // function for group move left to right
    $scope.moveLeftToRight = function () {
        if (!$scope.popOut) {
            if (!$scope.isRightVisible) {
                $scope.isRightVisible = true;
            }
            angular.forEach($scope.formConfig.sections, function (value, key) {
                if (value.isSwitchable == true) {
                    $scope.formConfig.sections[key].isShift = true;
                    $scope.shiftedList.push($scope.formConfig.sections[key].label);
                }
            });
            $scope.leftToRightDisabled = true;
        }
    };
    // function for group move right to left
    $scope.moveRightToLeft = function () {
        if ($scope.isRightVisible) {
            resetRightResizable(); // function call for Reset the right
            $scope.isRightVisible = false;
     
        }
        angular.forEach($scope.formConfig.sections, function (value, key) {
            if (value.isSwitchable == true) {
                $scope.formConfig.sections[key].isShift = false;
                var indexCurrentShifted = $scope.shiftedList.indexOf($scope.formConfig.sections[key].label);
                $scope.shiftedList.splice(indexCurrentShifted, 1);
            }
        });
        $scope.leftToRightDisabled = false;
    };

    var getShiftedLegth = function () {
        var filter = $filter('filter')($scope.formConfig.sections, {
            'isShift': true,
            'isSwitchable': true
        });
        return filter.length;
    };
    //[PERFORMANCE IN PROGRESS] added var before fn
    var getNotShiftedLegth = function () {
        var filter = $filter('filter')($scope.formConfig.sections, {
            'isShift': false,
            'isSwitchable': true
        });
        return filter.length;
    }

    $scope.switchSection = function (section) {
        if (!$scope.popOut) {
            var getLabel = section.label;
            getSectionIndex = _.findIndex($scope.formConfig.sections, {
                label: getLabel
            });
            $scope.formConfig.sections[getSectionIndex].isShift = !$scope.formConfig.sections[getSectionIndex].isShift;
            if ($scope.formConfig.sections[getSectionIndex].isShift == true) {
                if (0 < getShiftedLegth()) {
                    $scope.isRightVisible = true;
                }
             
                if (0 >= getNotShiftedLegth()) {
                    $scope.leftToRightDisabled = true;
                }
                $scope.formConfig.sections[getSectionIndex].isActive = false;
                $scope.shiftedList.push(getLabel);
                $scope.formConfig.sections[getSectionIndex].isActive = true;

            } else {
                if (0 >= getShiftedLegth()) {
                    resetRightResizable(); // function call for Reset the right
                    $scope.isRightVisible = false;
                }
                $scope.formConfig.sections[getSectionIndex].isActive = true;
                $scope.leftToRightDisabled = false;
                var indexCurrentShifted = $scope.shiftedList.indexOf(getLabel);
                $scope.shiftedList.splice(indexCurrentShifted, 1);
            }
        }
    };

    $scope.switchSectionformConfig = {
        "sections": [],
        "isSequenceToBeMaintained": true
    };

    // $scope.switchSectionformConfig.sections = $scope.formConfig.sections;
    $scope.formWidgetFilter = {
        "setFilter": { isShift: false },
        "setSubFilter": { isShift: true }
    }
    $scope.isRightVisible = false;
    $scope.checkShift = function (arrayName) {
        var item = false
        angular.forEach(arrayName, function (value, key) {
            if (value.isShift) {
                return item = true
            }
        });
        return item;
    }
    // [PERFORMANCE - Removed comented code]
    $scope.customGoto = function (getLabel) {
        var getSectionIndex = _.findIndex($scope.formConfig.sections, {
            label: getLabel
        });
        var checkisActive = $scope.formConfig.sections[getSectionIndex].isActive = true;
        if (checkisActive) {
            setTimeout(function () { // replaced $timeout with setTimeout
                index = getSectionIndex - 1;
                var scrollto = angular.element('#form-widget-2-sortable').children()[index].offsetTop,
                    selector = angular.element('.subFormWidgetWrapper').find('.scroll-content')[0];
                angular.element(selector).scrollTop(scrollto);
                scrollto = null; // [PERFORMANCE set to null]
                selector = null; // [PERFORMANCE set to null]
            }, 100)
        }
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
            $scope.showSupplierIcardPopup  = true;
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
        }else
          if (currentType == "iCardBU" || currentType == "iCardDiversity") {
            $scope.showSupplierIcardPopup  = true;
        }
     
        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
    };

    angular.element($window).bind('scroll', function () {
        $scope.$apply();
    });
}
/* items Contoller */
function itemDetailnonPoInvCtrlFunc($scope, notification, $translate, $sce, $http, $state, scannedInvServices, $timeout) {
  if($state.params.popOut){
    angular.element('header').hide();
  }

    $scope.withoutChk = true;
    // popup -- search
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
    $scope.checkAll = function (aug) {
        angular.forEach($scope.importFromReq, function (importFromReq, key) {
            $scope.importFromReq[key].selected = aug;
        });
    };
    //select All -- add lines from -- template tab
    $scope.checkAllTemp = function (aug) {
        angular.forEach($scope.importFromTemp, function (importFromTemp, key) {
            $scope.importFromTemp[key].selected = aug;
        });
    };

    $scope.selectedtemplate = function (current) {
        // [TODO - PERFORMANCE use service]
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


    $scope.isTemplateSelected = [];
    $scope.templateLists = [{
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
    $scope.commentList = scannedInvServices.COMMENT_LIST;
    //comment popup.
    // [PERFORMANCE - $watch is commented,]
    //$scope.$watch('ngModel.selectedOption.key', function(newVal) {});

    $scope.addApprovers = scannedInvServices.APPROVERS;
    $scope.approvers = scannedInvServices.APPROVERS;
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
    $scope.expressLists = scannedInvServices.EXPRESS_LIST2;
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
    $scope.addLines = 1;
    //import from requisition
    importFrmReq();
    function importFrmReq() {
        var reqData = {
            'url': "p2p/inv/models/importFrmReq.json",
            'method': "GET"
        }
        scannedInvServices.getJSONData(reqData)
        .then(function (resp) {
            $scope.importFromReq = reqData.data;
        })
        .catch(function (err) {
            //Handle the error if any
        });
    }

    $scope.importFromTemp = scannedInvServices.IMPORT_FRM_TEMP;
    $scope.fields = [];
    $scope.accfields = [];
    //line -- manage columns
    $scope.manageColumns = function () {
        $scope.fields = [{ // [TODO - PERFORMANCE - is it needed on scope???]
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
            'lable': 'Manufacturer Part Number',
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
        }];

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
    $scope.resetAllFields = function () {
            $scope.selectedAll.selection = false;
            $scope.fillpartial = false;
            $scope.isVisible = false;
            $scope.checkAll(false);
            $scope.selectedCount = getSelectedCout($scope.fields);
    }

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
        var count = 0,
            len = obj.length;
        for (var i = 0; i < len; i++) {
            if (obj[i].selected === true) {
                count++;
            }
        }
        return count;
    }
    $scope.selectedCount = getSelectedCout($scope.fields);

    //line -- manage columns -- global fn for at least on checkbox selection in list
    function isAtleastOneSelected(obj) {
        var len = obj.length;
        for (var i = 0; i < len; i++) {
            if (obj[i].selected === true) {
                return true;
            }
        }
        return false;
    }

    //line -- manage columns -- global fn for all checkboxes selection
    function isAllSelected(obj) {
        var len = obj.length;
        for (var i = 0; i < len; i++) {
            if (!obj[i].selected) {
                return false;
            }
        }
        return true;
    }

    //accounting details -- manage columns
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

    // POPUP -- apply to all
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
    $scope.applyToAllPopUpCallback = function (e) {
        $scope.applyToAllPopUp = true;
    };
    $scope.applyToAllPopUpClose = function (e) {
        $scope.applyToAllPopUp = false;
    };


    $scope.addLinesFormUrl = "p2p/order/views/popupAddLinesForm.html";
    $scope.addLinesFormPopUp = false;
    $scope.addLinesFormPopUpCallback = function (e) {
        $scope.addLinesFormPopUp = true;
    };
    $scope.addLinesFormPopUpClose = function (e) {
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
    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    // popup -- apply to all -- lables
    // [PERFORMANCE - are these variables needed to be in scope?]
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
        "selectedcontractNumber": $scope.contractNumber[0],
        "selectedtaxCode": $scope.taxCode[0],
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
        'label': 'Dell Laptop',
        'selected': true
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
    $scope.selectAllEditBulk = {
    checkedAll: true };
    $scope.fillpartialBulkEdit = false;
    $scope.editbulkItemSelectAll = function (arg) {
        var itemlength = $scope.itemList.length,
            item;
        $scope.fillpartialBulkEdit = false;
        for (item = 0; item < itemlength; item++) {
            $scope.itemList[item].selected = arg;
            }
            };
        function getSelectedCount(data) {
            return data.filter(function (el) {
    return el.selected == true
    }).length;
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

$scope.selectCurrent = function (currentValue, data) {
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
    // popup -- manufacturer details -- select item -- item list
    $scope.manufatureDetails = "shared/popup/views/popupManufacturerDetails.html";
    $scope.manufatureDetailsPopup = false;
    $scope.manufatureDetailsCallback = function (e) {
        $scope.manufatureDetailsPopup = true;
    };
    $scope.manufatureDetailsPopupHideCallback = function (e) {
        $scope.manufatureDetailsPopup = false;
    };


    // popup -- Add Info
    $scope.AddChargesinfo = "shared/popup/views/popupEditStandardAndProcedure.html";
    $scope.AddChargesinfoPopup = false;
    $scope.AddChargesinfoCallback = function (e) {
        $scope.AddChargesinfoPopup = true;
    };
    $scope.AddChargesinfoPopupHideCallback = function (e) {
        $scope.AddChargesinfoPopup = false;
    };


    // popup -- Add Info
    $scope.AddChargesAttach = "shared/popup/views/popupEditStandardAttacment.html";
    $scope.AddChargesAttachPopup = false;
    $scope.AddChargesAttachCallback = function (e) {
        $scope.AddChargesAttachPopup = true;
    };
    $scope.AddChargesAttachPopupHideCallback = function (e) {
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
    // [PERFORMANCE removed commented code from here]
    var categoryObj, buObj, regionObj;
    var currentType = '';
    $scope.treeOpenCallback = function (type) {

        $scope.treeComponentConfig.requestParameter = {
            navigationContext: "PAS"
        };
        currentType = type;
        if (type == 'region') {
            var regionData = {
                method: 'GET',
                url: 'shared/popup/models/region.json'
            };
            scannedInvServices.getJSONData(regionData).then(function (response) {
                regionObj = response;
                $scope.treeComponentConfig.data = regionObj;
                $scope.treeComponentConfig.title = 'Region';
                $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });
        } else if (type == 'bu') {
            var buData = {
                method: 'GET',
                url: 'shared/popup/models/businessUnit.json'
            };
            scannedInvServices.getJSONData(buData)
            .then(function (response) {
                buObj = response;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else {
            var categoryData = {
                method: 'GET',
                url: 'shared/popup/models/category.json'
            };
            scannedInvServices.getJSONData(categoryData)
            .then(function (response) {
                categoryObj = response;
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
        } 
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
        var selectionsLen = e.selections.length;
        if (currentType == 'category') {
            tempCategoryNode_PAS = [];
            $scope.selectedCategoriesValidate = true;
            for (var i = 0; i < selectionsLen; i++) {
                var obj = e.selections[i];
                $scope.selectedCategoryNodes.push(obj.Name);
                tempCategoryNode_PAS.push(obj.ID);
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
            for (var i = 0; i < selectionsLen; i++) {
                var obj = e.selections[i];
                $scope.selectedBUNodes.push(obj.Name);
                tempBUNode_PAS.push(obj.ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedBUTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.selectedBUTxt = e.selectionAllNames[0];
            else
                $scope.selectedBUTxt = 'Choose Category';
        } else if (currentType == 'region') {
            tempRegionNode_PAS = [];
            for (var i = 0; i < selectionsLen; i++) {
                var tObj = e.selections[i];
                $scope.selectedRegionNodes.push(tObj.Name);
                tempRegionNode_PAS.push(tObj.ID);
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
    //UI grid -- Items for Lines Item
    //[PERFORMANCE]
    getItemConfig();

    function getItemConfig() {
        var reqData = {
            'url': "p2p/inv/models/itemConfig.json",
            'method': "GET"
        }
        scannedInvServices.getJSONData(reqData)
            .then(function (respData) {
                $scope.itemConfig = respData.data;
            })
            .catch(function (err) {
                // Handle error if any
            });
    }

    //$scope.itemModel = scannedInvServices.ITEM_MODEL;
    getItemModel();

    function getItemModel() {
        var reqData = {
            'url': "p2p/inv/models/itemModel.json",
            'method': "GET"
        }
        scannedInvServices.getJSONData(reqData)
            .then(function (respData) {
                $scope.itemModel = respData.data;
            })
            .catch(function (err) {
                // Handle the error if any
            });
    }

    // ui grid for accounting
    //UI grid -- accounting
    //$scope.accountingConfig = respData.data;
    setAccConfig();

    function setAccConfig() {
        var reqData = {
            'url': "p2p/inv/models/accountingConfig.json",
            'method': "GET"
        };
        scannedInvServices.getJSONData(reqData).then(function (respData) {
            $scope.accountingConfig = respData.data;
        }).catch(function (err) {
            //Handle the error if any
        });
    }

    //$scope.accountingModel = getAccountingModel
    // get accounting model
    setAccountingModel();
    function setAccountingModel() {
        var reqData = {
            'url': "p2p/inv/models/accountingModel.json",
            'method': "GET"
        }
        scannedInvServices.getJSONData(reqData).then(function (respData) {
            $scope.accountingModel = respData.data;
        }).catch(function (err) {
            //Handle the error if any
        });
    }
    // UI Grid -- popup callback
    $scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive
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
        if (def.col && def.col.field == 'accruedtaxes') {
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

    $scope.showGridSandPPopup = false;
    $scope.showGridSandPCallback = function () {
        $scope.showGridSandPPopup = true;
    };
    $scope.showGridSandPPopupHideCallback = function (e) {
        $scope.showGridSandPPopup = false;
    };

    $scope.spData = scannedInvServices.SP_DATA;
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

    $scope.mode = {
        edit: true
    }

    $scope.editSandPGridCall = function (spObj) {


        $scope.selectedSP = spObj;
        $scope.showSPPopup = false;
        $scope.isEditMode = true;
        $scope.mode.edit = false;
    }

    // popup -- manufacturer details -- express list -- grid Data
    $scope.expressLists = scannedInvServices.EXPRESS_LIST;
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

    //line grid functions
    // [PERFORMANCE - All 4 methods doing same job. is it required? can we call same function for multiple purpose.]
    $scope.addBulkRow = function () {
        angular.element(document).triggerHandler('click');
    }
    $scope.cancelBulkRow = function () {
        angular.element(document).triggerHandler('click');
    };

    $scope.applyCurrentFields = function (a, b) {
        angular.element(document).triggerHandler('click');
    };
    $scope.cancelAllFields = function () {
        angular.element(document).triggerHandler('click');
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
    $scope.popup_selectedExcType = { "name": "Approval Required Exception", "datakey": "approvalRequiredExcTbl" };

    $scope.popup_selectedExceptionType = "approvalRequiredExcTbl";

    $scope.popup_exceptionTypeChange = function (currObj) {
        $scope.popup_selectedExcType = currObj;
        $scope.popup_selectedExceptionType = currObj.datakey;
    };

    $scope.overrideExcOptions = [{
        "name": "Yes"
    },
        {
            "name": "No"
        }
    ];
    $scope.selectOverrideExc = {
        "name": "Yes"
    };

    $scope.changeLineMappingPopupUrl = "shared/popup/views/popupChangeLineMapping.html";
    $scope.showChangeLineMappingPopup = false;
    $scope.showChangeLineMapping = function (e) {
        $scope.showChangeLineMappingPopup = true;
    }

    $scope.hideChangeLineMapping = function (e) {
        $scope.showChangeLineMappingPopup = false;
    }
}

function p2pInvNonPoExceptionTypeHederCtrlFunc($scope, $rootScope, $translate, $http, $state, notification, shareData, scannedInvServices) {
    $scope.excTypeOptions = scannedInvServices.EXC_TYPE_OPTIONS;
    $scope.uniqueIDGenerator = function () {
        var d = new Date().getTime();
        var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uniqueID;
    };

    $scope.selectedExcType = { "name": "Approval Required Exception", "datakey": "approvalRequiredExcTbl" };
    $scope.exceptionTypeChange = function (currObj) {
        $scope.selectedExcType.name = currObj.name;
        $scope.selectedExcType.datakey = currObj.datakey;
        shareData.typeChanged(currObj);
    };
}

function p2pInvNonPoExceptionTypeInfoCtrlFunc($scope, $rootScope, $translate, $http, $state, notification, shareData, scannedInvServices) {

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


    $scope.selectedExceptionType = "approvalRequiredExcTbl";

    shareData.getType = function (value) {
        $scope.selectedExceptionType = value.datakey;
    }
}

function linesDetailsHeaderCtrlFunc($scope, $rootScope, $translate) {
    $scope.islineDetailsPopOut = false;
    $scope.openPopout = function () {
       
        $scope.islineDetailsPopOut = !$scope.islineDetailsPopOut;
        $scope.$emit('islineDetailsPopOut', {
            islineDetailsPopOut: $scope.islineDetailsPopOut,
            sectionLabel: "LINES DETAILS"
        });
        if ($scope.islineDetailsPopOut == true) {

            var strgWindowFeature = 'directories=no,titlebar=no, toolbar=no, location=no, status=no, menubar=no,addressbar=0, top=0, left=20, height=703 ,width=978',
                    newwindow = window.open('index_launcher.html#/p2p/inv/linesDetails?popOut=true', 'name', strgWindowFeature);
            newwindow;
            
        }
     
    };
}