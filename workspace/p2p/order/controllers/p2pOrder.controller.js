angular.module('SMART2')

.controller('p2pOrderCtrl', ['$scope', '$rootScope', '$http', 'p2pConfigService', 'APPCONSTANTS', 'P2PConstants', '$timeout', 'document', 'p2pEventsCommunicator', 'P2PControllerConstants', 'p2pDetailsService', 'httpService', 'RESTURLs', 'debouncer', 'notification', 'p2pValidationService', '$translate', 'PLATFORMURLs', 'RuleEngine', 'commonUtilities', '$q', 'p2pCustomAttributesService', '$state', p2pOrderCtrlFunc]);
function p2pOrderCtrlFunc($scope, $rootScope, $http, p2pConfigService, APPCONSTANTS, P2PConstants, $timeout, document, p2pEventsCommunicator, P2PControllerConstants, p2pDetailsService, httpService, RESTURLs, debouncer, notification, p2pValidationService, $translate, PLATFORMURLs, RuleEngine, commonUtilities, $q, p2pCustomAttributesService, $state) {

    var supplierDetailSecRow1;
    var paymnetTermsSecRow1;
    var additionalInformationSecRowOne;
    var previousAutoSuggestRequest;
    var purchaseTypesWithMappings;
    var nonPurchaseTypeItems = [];
    var purchaseType;
    p2pEventsCommunicator.setMainController(P2PControllerConstants.ORDERCONTROLLER);
    var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
    var clientConstants = P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName];
    var configClientConstants = p2pDetailsService.getConfigClientConstants();
    var formActionButtonsConfig = p2pDetailsService.getFormActionButtonsConfig();
    //Checks IsSupplier is true or false.
    $scope.IsSupplier = APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier;
    $scope.lineTypes = [];
    var CommentsFlag = "";
    $scope.orderSource = APPCONSTANTS.orderSource;
    $scope.commonSettings = p2pDetailsService.mapAndGetP2PSettings(APPCONSTANTS.userPreferences.CommonSettings.lstSettings);
    $scope.createInvoice = $scope.IsSupplier ? true : false;
    $scope.changeCancelOrder = true;
    $scope.showAccountingValidation = clientConstants.AllowExtrenalCodeCombinationSync;
    var delArrayLine = [];
    var delArrayAcct = [];
    //var delChargeArrayLine = [];
    // var delChargeArrayAcct = [];
    var previousAutoSaveRequest;
    var autoSaveOrder;
    var isDirty = false;
    var deletedItems;
    var autoSavedData;
    var headerConfig = p2pDetailsService.getHeaderConfig();
    var clientSpecificSettings = p2pDetailsService.getConfigClientConstants();
    var OldOrderData;
    var isSaveTriggered = false;
    var lastSavedName = "";
    $scope.isInternalCOFinalize = false;
    $scope.clearedHeaderEntities = [];
    $scope.isSupplierAcknowledged = false;
    function GetConfigProperties(secLabel) {
        return _.find(headerConfig.sections, { label: secLabel });
    }
    $scope.isTeammember = false;

    // All the form action buttons made configurable in config.
    $scope.formActionButtonsConf = formActionButtonsConfig;

        p2pDetailsService.setFormScope($scope);
     if (typeof document != 'undefined') {
        // document.orderData.Contract = { 'ContractExpiryDate': "\/Date(1458585000000)\/" };
        /* document.orderData.invoicingStatus = { 'id': 1, 'name': '' };
         document.orderData.OrderContactEmail = "Rammaninath.reddy@gep.com";*/
         $scope.dataModel = { "orderData": document.orderData };
         //Hiding the options for supplier issue no TWO-4605
         if ($scope.dataModel.orderData.status != undefined && $scope.dataModel.orderData.status != null) {
             if ($scope.IsSupplier && $scope.dataModel.orderData.status.id == 25 && configClientConstants.isHideKababMenuAtDocumetAcknowledged == true) {
                 $scope.isSupplierAcknowledged = true;
             }
         }

         //get the default order name if the order is new i.e document code is 0. 
         //keeping the logic same as in Requistion and SMART 1.0
         if ($scope.dataModel.orderData.documentCode == 0 || $scope.dataModel.orderData.documentCode == undefined) {
             $scope.dataModel.orderData.name = "Order" + (+new Date());
         };
         lastSavedName = $scope.dataModel.orderData.name;
         applyUserDefaultShipTo();
         $scope.dataModel.orderData.isSupplier = $scope.IsSupplier;

         _.each($scope.dataModel.orderData.items, function (item, index) {
             $scope.dataModel.orderData.items[index].isSupplier = $scope.IsSupplier;
             if (($scope.dataModel.orderData.items[index].description===null || $scope.dataModel.orderData.items[index].buyerItemNumber===null) || typeof $scope.dataModel.orderData.items[index].description !== 'object' || typeof $scope.dataModel.orderData.items[index].buyerItemNumber !== 'object') {
                 $scope.dataModel.orderData.items[index].description = { 'desc': $scope.dataModel.orderData.items[index].description };
                 $scope.dataModel.orderData.items[index].buyerItemNumber = { 'code': $scope.dataModel.orderData.items[index].buyerItemNumber };
             }
         });

        p2pValidationService.saveDatModel(document);
        $scope.dataModel.orderData.ChangeOrderType = { "id": 0, "name": "" };
        if ($scope.dataModel.orderData.isInternalChangeOrderFinalize)
            $scope.isInternalCOFinalize = true
        if (_.find($scope.dataModel.orderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 14 }) == undefined &&
                      _.find($scope.dataModel.orderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 17 }) == undefined &&
                      _.find($scope.dataModel.orderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 5 }) != undefined
                        && APPCONSTANTS.userPreferences.OrderData.orderContact.id != APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
                        && APPCONSTANTS.userPreferences.OrderData.createdBy.id != APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
                  ) {
            $scope.isTeammember = true;
        }
    }

    var purchaseOptionsUIObj = _.find(GetConfigProperties('P2P_PO_BasicDetails').rows[0].properties, { label: "P2P_PO_PurchaseType" });
    getPurchaseTypeOptions(purchaseOptionsUIObj);

    $scope.formConfig = headerConfig;
    $timeout(function () {

        // supplierDetailSecRow1 = $scope.formConfig.sections[1].rows[0].properties;
        supplierDetailSecRow1 = GetConfigProperties('P2P_PO_SupplierDetails');

        if ($scope.dataModel.orderData.trasmission && $scope.dataModel.orderData.trasmission.id == 1) {
            angular.forEach(supplierDetailSecRow1, function (value, key) {
                if (value.label == "Direct Email")
                    value.isVisible = true;
            });

        }
        if ($scope.formConfig) {
            $scope.formConfig = p2pValidationService.getUpdatedFormConfig($scope.formConfig);
            //$scope.formConfig.sections[0].rows[0].properties[1].attributes.disable = true;
            upDateFormConfig($scope.formConfig);
        }
        //paymnetTermsSecRow1 = $scope.formConfig.sections[2].rows[0].properties;
        paymnetTermsSecRow1 = GetConfigProperties('P2P_PO_Terms');

        var additionalInformationSection = GetConfigProperties('P2P_PO_AdditionalInformation');
        if (additionalInformationSection) {
            additionalInformationSecRowOne = additionalInformationSection.rows[0].properties;
            if (additionalInformationSecRowOne[1] != undefined && additionalInformationSecRowOne[1].label == "P2P_PO_ErpOrderType")
                getERPOrderTypeOptions(additionalInformationSecRowOne[1]);
        }
        checkPurchaseTypeForCharge();
    }, 0);
    // }
    $scope.showOrderPreview = function () {
        p2pDetailsService.getCurrentGridState();
        p2pDetailsService.setDataModel($scope.dataModel);
        $state.go("po.preview");
    }

    function ActivityCheck(orgEntityCode, IsLob) {
        //Check for activity in header entity level
        try {
            if (IsLob) {
                $scope.changeCancelOrder = _.contains(LobActivities.ActivityCode, parseInt(APPCONSTANTS.userActivityStatus.CHANGE_CANCEL_ORDER));
                $scope.createInvoice = _.contains(LobActivities.ActivityCode, parseInt(APPCONSTANTS.userActivityStatus.CREATE_INVOICE));
            }
            else {
                $scope.changeCancelOrder = _.contains((_.find(LobActivities.OrgActivities, { OrgEntityCode: orgEntityCode }).ActivityCode), parseInt(APPCONSTANTS.userActivityStatus.CHANGE_CANCEL_ORDER));
                $scope.createInvoice = _.contains((_.find(LobActivities.OrgActivities, { OrgEntityCode: orgEntityCode }).ActivityCode), parseInt(APPCONSTANTS.userActivityStatus.CREATE_INVOICE));
            }
        }
        catch (ex) {
            console.log(ex);
        }


    }
    $scope.$on('composedGridAutoSuggestChange', function (e, data) {
        if (data.col.colDef.isFreeText) {
            var colDefField = data.col.colDef.field;
            colDefField = colDefField.split('.');
            data.row.entity[colDefField[0]][colDefField[1]] = data.val;
        }
    });

    function upDateFormConfig(config) {
        for (var j = 0; j < config.sections.length; j++) {
            for (var k = 0; k < config.sections[j].rows[0].properties.length; k++) {

                if (config.sections[j].rows[0].properties[k].type == 'dropdown') {
                    var label = config.sections[j].rows[0].properties[k].label;

                    switch (label) {
                        case 'P2P_PO_Matchtype':
                            var matchTypeOptions = [{
                                "id": "1",
                                "name": "P2P_CMN_TwoWayMatch",
                                "key": $translate.instant("P2P_CMN_TwoWayMatch")
                            }, {
                                "id": "2",
                                "name": "P2P_CMN_ThreeWayMatch",
                                "key": $translate.instant("P2P_CMN_ThreeWayMatch")
                            }];
                            config.sections[j].rows[0].properties[k].attributes.options = matchTypeOptions;

                            break;
                    }
                }
            }
        }
    }



    $scope.prorateValueLabel = "P2P_PO_OrderValue";
    $scope.prorateTotalLabel = "P2P_PO_OrderTotal";
    var currorderingLocation;
    $scope.p2pValidationService = p2pValidationService;
    // $scope.p2pChargeValidationService = p2pChargeValidationService;   

    $scope.toastNotificationText = "";
    $scope.showToastNotification = false;

    $scope.onSignatoryChange = function (e, uiElementobj) {
        var signatoryValue = e.data[0].value;
        var url = RESTURLs.SM1_Controller_GetUserSignatureDetailsByIdURL + "&bpc=" + bpc + "&term=" + signatoryValue;
        var successFunc = function (obj) {
            uiElementobj.attributes.options = obj.map(function (options) {
                return {
                    "name": options.SignatorsName, "id": options.ContactCode
                };
            });
        }
        var inputObject = {
            "url": url
        };
        getAutoSuggestData(inputObject, successFunc);
    }
    function showLoader() {
        $rootScope.p2ploader = true;
        $rootScope.loaderPosition = true;
    };

    $scope.onSelectDE = function (e, uiElementobj) {
        if (e.trasmission.name == "Direct Email") {
            _.find(supplierDetailSecRow1.optionalFields, { label: "Direct Email" }).isVisible = true;
            updateDEAddress();
        } 
        else {
            $scope.dataModel.orderData.TransmissionValue = "";
            $scope.dataModel.orderData.TransmissionMode = e.trasmission.id;
        }
    };

    $scope.onOrderTypeChange = function () {
        if ($scope.dataModel.orderData.ChangeOrderType.id == 1) {
            $scope.dataModel.orderData.source.id = 5;
            $scope.dataModel.orderData.status.id = 1;
            $scope.dataModel.orderData.status.name = "CMN_Draft";
            if ($scope.dataModel.orderData.isMaintainRevisionNumber) {
                $scope.dataModel.orderData.number = $scope.dataModel.orderData.parentDocumentNumber;
                if ($scope.dataModel.orderData.parentDocumentNumber.split("-").length >= 4) {
                    $scope.dataModel.orderData.revisionNumber = $scope.dataModel.orderData.parentDocumentNumber.split("-")[$scope.dataModel.orderData.parentDocumentNumber.split("-").length - 1]
                }
                else {
                    $scope.dataModel.orderData.revisionNumber = '';
                }

            }
            else {
                $scope.dataModel.orderData.number = revisionNumberGeneration($scope.dataModel.orderData.parentDocumentNumber);
                $scope.dataModel.orderData.revisionNumber = $scope.dataModel.orderData.number.split("-")[$scope.dataModel.orderData.number.split("-").length - 1]
            }


        }
        else {
            $scope.dataModel.orderData.source.id = 10;
            $scope.dataModel.orderData.status.id = OldOrderData.orderData.ParentDocumentStatus.id
            $scope.dataModel.orderData.status.name = OldOrderData.orderData.ParentDocumentStatus.name;
            $scope.dataModel.orderData.number = $scope.dataModel.orderData.parentDocumentNumber;
            if ($scope.dataModel.orderData.parentDocumentNumber.split("-").length >= 4) {
                $scope.dataModel.orderData.revisionNumber = $scope.dataModel.orderData.parentDocumentNumber.split("-")[$scope.dataModel.orderData.parentDocumentNumber.split("-").length - 1]
            }
            else {
                $scope.dataModel.orderData.revisionNumber = '';
            }
        }
        p2pValidationService.setDocumentStatus($scope.dataModel.orderData.status.id);
        p2pValidationService.setDocumentSource($scope.dataModel.orderData.source);
        var shipToReadOnlyData = p2pValidationService.isReadOnly({
            attributes: {
                "isEditable": ["0_1", "0_23", "0_24", "0_59", "0_169", "0_1_4", "0_1_5", "0_25_10", "0_42_10", "0_23_4", "0_24_4"]
            }
        });
        $scope.dataModel.orderData.shipTo.enabled = !shipToReadOnlyData;
        var billToReadOnlyData = p2pValidationService.isReadOnly({
            attributes: {
                "isEditable": ["0_1", "0_23", "0_24", "0_59", "0_169", "0_1_4", "0_23_4", "0_24_4"]
            }
        });
        $scope.dataModel.orderData.billTo.enabled = !billToReadOnlyData;
        var DeliverToReadOnlyData = p2pValidationService.isReadOnly({
            attributes: {
                "isEditable": ["0_1", "0_23", "0_24", "0_59", "0_169", "0_1_4", "0_21", "0_23_4", "0_24_4", "0_1_5"]
            }
        });
        $scope.dataModel.orderData.deliverTo.enabled = !DeliverToReadOnlyData;
        $scope.isProrateDisabled = p2pValidationService.isReadOnly({
            attributes: {
                "isEditable": ["0_1", "0_23", "0_24", "0_1_4", "0_25_10", "0_42_10", "0_23_4", "0_24_4"]
            }
        });
        $scope.formConfig = p2pValidationService.getUpdatedFormConfig(_clientSpecificConfigSettings.header);
        $rootScope.$broadcast("updateEditActivityNA");
        //upDateFormConfig($scope.formConfig);
    }

    if (_clientSpecificConfigSettings.specificSettings.allowCreateReceipt
        && APPCONSTANTS.userPreferences.TypeOfUser == 0
        && (_.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.ACTIVITY_FOR_ISDESTRECEIVER) > -1 || _.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.ACTIVITY_FOR_ISRECEIPT) > -1)
        && APPCONSTANTS.userPreferences.OrderData.isCloseForReceiving === false
        && ($scope.dataModel.orderData.status.id == 25 || $scope.dataModel.orderData.status.id == 41)
        && APPCONSTANTS.userPreferences.OrderData.closingOrderStatus != 124) {
        $scope.showReceiptBtn = true;
    }
 
    if ($scope.dataModel.orderData.status.id == 124) {
        alert(1);
        if (APPCONSTANTS.userPreferences.DocumentSettings.lstSettings[66].FieldValue != true) {
            var message = orderMesssage('warning', 'P2P_Order_I am not called test');
            hideLoader();
            notification.notify(message);

        }
    }

    if (APPCONSTANTS.userPreferences.CommonSettings.lstSettings[79].FieldValue == false) {
        var message = orderMesssage('warning', 'Cannot filp to Meterial');
        hideLoader();
        notification.notify(message);
    }

    function revisionNumberGeneration(docNumber) {
        //var docNumber='PO-06:16-003269';
        var docNumSplit = docNumber.split("-");
        var revisionNumber = '';
        var pad = '000';
        var documentSplitValue = '';
        if (docNumSplit.length >= 4) {
            revisionNumber = docNumber.split("-")[docNumSplit.length - 1];
            revisionNumber = parseInt(revisionNumber) + 1;
            revisionNumber = (pad + revisionNumber.toString()).slice(-pad.length);
            for (var i = 0; i < docNumSplit.length - 1; i++) {
                documentSplitValue = documentSplitValue + docNumSplit[i] + '-';
            }
            return documentValue + revisionNumber;
        }
        else {
            revisionNumber = "001"
            for (var i = 0; i < docNumSplit.length; i++) {
                documentSplitValue = documentSplitValue + docNumSplit[i] + '-';
            }
            return documentSplitValue + revisionNumber;
        }
    }
    $scope.onMaintainRevisionNumberChange = function () {
        if ($scope.dataModel.orderData.isMaintainRevisionNumber) {
            $scope.dataModel.orderData.number = $scope.dataModel.orderData.parentDocumentNumber;
            if ($scope.dataModel.orderData.parentDocumentNumber.split("-").length >= 4) {
                $scope.dataModel.orderData.revisionNumber = $scope.dataModel.orderData.parentDocumentNumber.split("-")[$scope.dataModel.orderData.parentDocumentNumber.split("-").length - 1]
            }
            else {
                $scope.dataModel.orderData.revisionNumber = '';
            }
        }
        else {
            $scope.dataModel.orderData.number = revisionNumberGeneration($scope.dataModel.orderData.parentDocumentNumber);
            $scope.dataModel.orderData.revisionNumber = $scope.dataModel.orderData.number.split("-")[$scope.dataModel.orderData.number.split("-").length - 1]


        }
    }

    $scope.SaveInternalChangeOrder = function (Finalize) {
        showLoader();
        if ($scope.SaveInternalChangeOrderValidation(OldOrderData)) {
            if (Finalize != undefined && Finalize === 'Finalize') {
                $scope.dataModel.orderData.isInternalChangeOrderFinalize = true;
                $scope.saveForm('', Finalize);

            }
            else {
                $scope.saveForm();
                hideLoader();
            }

        }
        else {
            var message = orderMesssage('warning', 'P2P_PO_InternalChangeOrderValidationMessage');
            hideLoader();
            notification.notify(message);
            //orderMesssage('error', $translate.instant("P2P_PO_InternalChangeOrderValidationMessage"));
        }

    }

    $scope.SaveInternalChangeOrderValidation = function (OldOrderData) {

        if ($scope.dataModel.orderData.shipTo.id != OldOrderData.orderData.shipTo.id) {
            return false;
        }
        if ($scope.dataModel.orderData.items.length != OldOrderData.orderData.items.length) {
            return false;
        }
        for (var i = 0; i < OldOrderData.orderData.items.length; i++) {
            if ($scope.dataModel.orderData.items[i].quantity != OldOrderData.orderData.items[i].quantity ||
                 $scope.dataModel.orderData.items[i].unitPrice != OldOrderData.orderData.items[i].unitPrice) {
                return false;
            }
        }
        return true;
    }
    function checkERS() {
        var returnvalue;
        var headerData = angular.copy($scope.formConfig);
        var Invoicedata = _.find(headerData.sections, function (value, key) {
            return value.label === "P2P_PO_InvoicingAndDeliveryDetails";
        });
        if (Invoicedata != undefined) {
            returnvalue = _.find(Invoicedata.rows[0].properties, function (value, key) {
                return value.label === "P2P_PO_ERS";
            });
            if (returnvalue != undefined)
                return true;
            else
                return false;
        }
        else {
            return false;
        }

    }
    function ERSCnfirmation() {
        var myconfig = {
            type: "confirm",
            message: "<p class='left-align'>" + $translate.instant("P2P_PO_ERSConfirmationMessage") + "</p>",
            //checkMessage: "Do not show again",
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
        }

        notification.notify(myconfig, function (response) {
            if (response.result === "yes") {
                $scope.submitForm();
            }
            else {
                return false;
            }
        });
    };
    function validateERS() {
        var itemERS;
        itemERS = _.find($scope.dataModel.orderData.items, function (value, key) {
            return value.ERS === undefined;
        })
        var returnvalue;
        if (itemERS == undefined) {
            returnvalue = _.find($scope.dataModel.orderData.items, function (value, key) {
                return value.ERS === false;
            })
            if (returnvalue != undefined)
                return returnvalue.ERS;
            else
                return true;
        }
        else {
            return false;
        }

    }
    function cancelOrderConfirmation(type) {
        var message = "";
        if (type != undefined && type == "order") {

            message = "<p class='left-align'>" + $translate.instant("P2P_PO_ConfirmCancelOrder") + "</p>";
        }
        else {
            message = "<p class='left-align'>" + $translate.instant("P2P_PO_ConfirmCancelItemAndOrder") + "</p>";
        }
        var myconfig = {
            type: "confirm",
            message: message,
            //checkMessage: "Do not show again",
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
        }

        notification.notify(myconfig, function (response) {
            if (response.result === "yes") {
                cancelOrder();
            }
            else {
                return false;
            }
        });
    };
    function cancelOrder() {
        showLoader();
        var url = RESTURLs.SM1_Controller_CancelOrder + "&DocumentCode=" + $scope.dataModel.orderData.documentCode + "&partnerCode=" + $scope.dataModel.orderData.partner.id + "&LOBEntityDetailCode=" + $scope.dataModel.orderData.documentLOB.entityDetailCode + "&remapOrder=true";
        var cancelOrder = httpService.directhttp({
            "url": url,
            "method": "GET",
            "timeout": 60000
        });
        cancelOrder
            .then(function (response) {
                if (response) {
                    var cancelOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_CancelOrderMessage"));
                    hideLoader();
                    notification.notify(cancelOrderMessage);
                    setTimeout(function () {
                        window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                    }, 2500);
                }
                else {
                    hideLoader();
                    orderMesssage('error', $translate.instant("P2P_PO_CancelOrderError"));

                }
            }).catch(function (error) {
                hideLoader();
                orderMesssage('error', $translate.instant("P2P_PO_cancelOrderError"));

            });
    }
    function getSaverequestObject(data, responseRequired) {
        var req = {};
        req.method = 'POST';
        // req.url = P2PRestSvc + "NewOrderRestService/SaveAllOrderDetails";
        // req.data = angular.toJson({ orderData: data.orderData, responseRequired: true });
        var dd = p2pDetailsService.getQueryStringValue("dd");
        req.url = APPCONSTANTS.userPreferences.URLs.AppURL + 'api/PO/SaveAllOrderDetails' + '?oloc=218' + '&dd=' + dd,        
        req.data = JSON.parse(angular.toJson({ orderData: data.orderData, responseRequired: true }));
        req.timeout = 60000;
        req.method = "POST";
        return req;
    }
    function formatDataModel() {

        if ($scope.dataModel.orderData.DocumentStakeHolderList == null)
            $scope.dataModel.orderData.DocumentStakeHolderList = [];
        if ($scope.dataModel.orderData.ParentDocumentStatus == null)
            $scope.dataModel.orderData.ParentDocumentStatus = { "id": 0, "name": "CMN_Draft" };
        delete $scope.dataModel.orderData.shipTo.enabled;
        delete $scope.dataModel.orderData.billTo.enabled;
        $scope.dataModel.orderData.purchaseType = ($scope.dataModel.orderData.purchaseType != undefined) ? $scope.dataModel.orderData.purchaseType : 0;
        delete $scope.dataModel.purchaseType;
        delete $scope.dataModel.orderData.billTo.selectedHeaderEntityId;
        delete $scope.dataModel.orderData.deliverTo.value;
        if ($scope.dataModel.orderData.currency == null)
            $scope.dataModel.orderData.currency = { "code": "", "name": "" };
        if ($scope.dataModel.orderData.orderingLocation == null)
            $scope.dataModel.orderData.orderingLocation = { "id": 0, "name": "", "address": "" };
        if ($scope.dataModel.orderData.shipTo == null || $scope.dataModel.orderData.shipTo.id == undefined)
            $scope.dataModel.orderData.shipTo = { "id": 0, "name": "", "address": "", "value": "" };
        if ($scope.dataModel.orderData.partner == null)
            $scope.dataModel.orderData.partner = { "name": "", "id": 0, "clientCode": "", "displayName": "", "value": "" };
        if ($scope.dataModel.orderData.items == null)
            $scope.dataModel.orderData.items = [];
        if (nonPurchaseTypeItems != undefined && nonPurchaseTypeItems.length > 0) {
            for (var i = 0; i < nonPurchaseTypeItems.length > 0; i++) {
                $scope.dataModel.orderData.items.push(nonPurchaseTypeItems[i]);
            }
        }
        for (var entityIndex in $scope.clearedHeaderEntities) {
            if ($scope.dataModel.orderData[entityIndex] == null)
                $scope.dataModel.orderData[entityIndex] = $scope.clearedHeaderEntities[entityIndex]
        }
        fillShipTo();

    }

    function isEntityConfiguredForFBU(entityTypeId) {
        if (LobActivities && LobActivities != null) {
            var obj = _.where(LobActivities.OrgActivities, { EntityId: entityTypeId })
            if (obj != null && obj.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }


    $scope.setHeaderEntityAsBU = setHeaderEntityAsBU;
    $scope.headerEntityOnSelect = function (e, uiElementobj) {
        console.log(APPCONSTANTS.defaultSplitValues);
        ShowConfirmationMessage("Do you want to make changes", setSelectedHeaderEntity, $scope.resetHeaderEntity, uiElementobj);
        //validateAslChangeAgain();  // to validate the asl change again on submit.
    };

    function setHeaderEntityAsBU() {
        $scope.dataModel.documentBU = null;
        $scope.dataModel.documentBU = new Array();
        for (var iHE = 0; iHE < APPCONSTANTS.userPreferences.HeaderEntities.length; iHE++) {
            if ($scope.dataModel[$scope.selectedHeaderEntity] && $scope.dataModel[$scope.selectedHeaderEntity] != undefined) {
                $scope.dataModel.documentBU.push({ buCode: $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[APPCONSTANTS.userPreferences.HeaderEntities[iHE].EntityId]].id, documentCode: 0 });
            }
        }
    };

    function ShowConfirmationMessage(mesg, callBack_Yes, callBack_No, uiElementobj) {
        var showConfirmationMessage = {
            type: "warning",
            message: mesg,
            buttons: [{
                "title": "YES",
                "result": "YES"
            }, {
                "title": "NO",
                "result": "NO"
            }]
        }
        notification.notify(showConfirmationMessage, function (response) {
            if (response.result === "YES")
                callBack_Yes(uiElementobj);
            else
                callBack_No(uiElementobj);
        });
    };
    var isComingFromHeader = false;
    function setSelectedHeaderEntity(uiElementobj) {
        $scope.showPopup = false;
        $scope.selectedHeaderEntity = uiElementobj.data.split('.')[1];
        var entityKey = uiElementobj.data.split('.')[1];
        //clientConstants.DEFAULT_HEADER_ENTITIES = { "10": "headerEntity1", "7": "headerEntity2" };
        for (var entityId in P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].DEFAULT_HEADER_ENTITIES) {
            if (P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].DEFAULT_HEADER_ENTITIES[entityId] === entityKey) {
                $scope.HeaderEntityTypeID = entityId;
                break;
            }
        }

        var BillTo_item = { 'id': 0, 'name': '', 'address': '', contact: '',enabled: $scope.dataModel.orderData.billTo.enabled };
        $scope.dataModel.orderData.billTo = BillTo_item;
        if ($scope.dataModel.orderData) {
            //{"entityType":10,"id":15,"headerEntityId":16880,"entityCode":"00046","name":"APDC Pte Ltd"}
            $scope.dataModel.orderData[$scope.selectedHeaderEntity].headerEntityId = $scope.previousHeaderEntity != undefined ? $scope.previousHeaderEntity.headerEntityId : 0;
            var selectedHeaderEntityID = $scope.dataModel.orderData[$scope.selectedHeaderEntity].id;
            $scope.dataModel.orderData[$scope.selectedHeaderEntity].entityType = $scope.HeaderEntityTypeID;

            clearChildEntities();

            var headerEntityObj = $scope.dataModel.orderData[$scope.selectedHeaderEntity] == null ? $scope.clearedHeaderEntities[$scope.selectedHeaderEntity] : $scope.dataModel.orderData[$scope.selectedHeaderEntity];
            $scope.HeaderEntityTypeID = headerEntityObj != null && headerEntityObj != undefined ? headerEntityObj.entityType : 0;
            var headerEntityValue = { 'code': '', 'entityCode': '', 'entityType': 0, 'fieldId': 0, 'name': '', 'splitEntityId': 0 };
            headerEntityValue.code = $scope.dataModel.orderData[$scope.selectedHeaderEntity].id;
            headerEntityValue.entityType = $scope.HeaderEntityTypeID;
            headerEntityValue.entityCode = $scope.dataModel.orderData[$scope.selectedHeaderEntity].entityCode;
            headerEntityValue.name = $scope.dataModel.orderData[$scope.selectedHeaderEntity].name;

            //update split entity at line level which has parent at header level
            if ($scope.dataModel.orderData.items != null && $scope.dataModel.orderData.items.length > 0) {
                for (var iItems = 0; iItems < $scope.dataModel.orderData.items.length; iItems++) {
                    if ($scope.dataModel.orderData.items[iItems].splits != null) {
                        for (var iSplits = 0; iSplits < $scope.dataModel.orderData.items[iItems].splits.length; iSplits++) {
                            if ($scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]] != null) {
                                $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].code = headerEntityValue.code;
                                $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].entityCode = headerEntityValue.entityCode;
                                $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].entityType = headerEntityValue.entityType;
                                $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].name = headerEntityValue.name;
                            }
                            else {
                                $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]] = headerEntityValue;
                            }
                        }
                    }

                    if ($scope.dataModel.orderData.items[iItems].ItemChargesForSubLine) {
                        for (var iSublines = 0; iSublines < $scope.dataModel.orderData.items[iItems].ItemChargesForSubLine.length; iSublines++) {
                            if ($scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits) {
                                for (var iSplits = 0; iSplits < $scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits.length; iSplits++) {
                                    if ($scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]] != null) {
                                        $scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].code = headerEntityValue.code;
                                        $scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].entityCode = headerEntityValue.entityCode;
                                        $scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].entityType = headerEntityValue.entityType;
                                        $scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].name = headerEntityValue.name;
                                    }
                                    else {
                                        $scope.dataModel.orderData.items[iItems].ItemChargesForSubLine[iSublines].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]] = headerEntityValue;
                                    }
                                }
                            }
                        }
                    }

                }
            }
            //update split entity at Charge Fo Header level which has parent at header level
            if ($scope.dataModel.orderData.ItemChargesForHeader) {
                for (var iCharges = 0; iCharges < $scope.dataModel.orderData.ItemChargesForHeader.length; iCharges++) {
                    if ($scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits != null) {
                        for (var iSplits = 0; iSplits < $scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits.length; iSplits++) {
                            if ($scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]] != null) {
                                $scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].code = headerEntityValue.code;
                                $scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].entityCode = headerEntityValue.entityCode;
                                $scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].entityType = headerEntityValue.entityType;
                                $scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]].name = headerEntityValue.name;
                            }
                            else {
                                $scope.dataModel.orderData.ItemChargesForHeader[iCharges].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[$scope.HeaderEntityTypeID]] = headerEntityValue;
                            }
                        }
                    }
                }
            }



            $scope.updateCopyOfHeaderEntityModel();
            var parentEntityCode = 0;

            //update taxes if header entity is taxable entity
            if (clientConstants.ENTITYTYPE_TAX == $scope.HeaderEntityTypeID)
                isComingFromHeader = true;
            if (isComingFromHeader == true) {
                if ($scope.dataModel.orderData[$scope.selectedHeaderEntity].id != null) {
                    var selectedHeaderEntityID = $scope.dataModel.orderData[$scope.selectedHeaderEntity].id;
                    var shipToId = $scope.dataModel.orderData.shipTo ? $scope.dataModel.orderData.shipTo.id || 0 : 0;
                    p2pDetailsService.getTaxItemsByEntityID(shipToId, selectedHeaderEntityID, $scope.HeaderEntityTypeID, applyTaxCalculation, 0);
                }
                isComingFromHeader = false;
            }
            setDefaultBillToLocation(selectedHeaderEntityID);


            if (APPCONSTANTS.userPreferences.IsHeaderLevelEntityBU)
                $scope.setHeaderEntityAsBU();

            $rootScope.$broadcast('composedGridUpdateSaveOrderData', {
                SaveOrderData: $scope.dataModel.orderData.items
            });
            $rootScope.$broadcast('composedChargeGridUpdateSaveOrderData', {
                SaveOrderData: $scope.dataModel.orderData.ItemChargesForHeader
            });

            //if Lob is also editable and selected entity is contact Lob then check activties at lob Level

            if (APPCONSTANTS.userPreferences.contactOrgMappedActivities != null) {

                if (selectedHeaderEntityID == $scope.dataModel.orderData.documentLOB.entityDetailCode && LobActivities && LobActivities != null) {
                    checkFBUActivity(selectedHeaderEntityID, true);
                }
                else
                    checkFBUActivity(selectedHeaderEntityID);
            }
        }
    };

    //clear child header and split entities
    function clearChildEntities() {
        for (var iHE in clientConstants.DEFAULT_HEADER_ENTITIES) {
            var entityDetails = _.find(APPCONSTANTS.defaultHeaderEntityValues, { EntityTypeId: parseInt(iHE) });
            if (entityDetails != undefined) {
                var parentEntityId = entityDetails.ParentSplitAccountingFieldId;
                var parentEntitydetails = clientConstants.DEFAULT_HEADER_ENTITIES[parseInt(iHE)];
                if (parseInt($scope.HeaderEntityTypeID) == parentEntityId && parentEntitydetails != undefined) {
                    if ($scope.dataModel.orderData[parentEntitydetails] != null) {
                        //{"entityType":10,"id":2483,"headerEntityId":13632,"entityCode":"99","name":"Legal Entity - 60"} 
                        var obj = $scope.dataModel.orderData[parentEntitydetails];
                        obj.name = null;
                        obj.entityCode = null;
                        obj.id = 0;
                        obj.value = "";
                        $scope.clearedHeaderEntities[parentEntitydetails] = obj;
                        $scope.dataModel.orderData[parentEntitydetails] = null;
                        var headerEntityValue = { 'code': '', 'entityCode': '', 'entityType': 0, 'fieldId': 0, 'name': '', 'splitEntityId': 0 };
                        for (var iItems = 0; iItems < $scope.dataModel.orderData.items.length; iItems++) {
                            if ($scope.dataModel.orderData.items[iItems].splits != null) {
                                for (var iSplits = 0; iSplits < $scope.dataModel.orderData.items[iItems].splits.length; iSplits++) {
                                    var hEntityTypeId = parseInt(iHE);
                                    if ($scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[hEntityTypeId]] != null) {

                                        $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[hEntityTypeId]].code = headerEntityValue.code;
                                        $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[hEntityTypeId]].entityCode = headerEntityValue.entityCode;
                                        $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[hEntityTypeId]].entityType = headerEntityValue.entityType;
                                        $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[hEntityTypeId]].name = headerEntityValue.name;
                                    }
                                    else {
                                        $scope.dataModel.orderData.items[iItems].splits[iSplits][clientConstants.LINE_ACC_ENTITIES[hEntityTypeId]] = headerEntityValue;
                                    }
                                }
                            }
                        }

                    }
                    else {
                        $scope.dataModel.orderData[parentEntitydetails] = null;
                    }
                }
            }
        }
    }

    function setDefaultBillToLocation(associateEntityID) {
        var BillTo_List = new Array();
        var BillTo_item = {};
        // var urlBillToLocList = "http://127.0.0.2:81/Requisition/Manage/GetListofBillToLocDetails";
        var BillToLocService = httpService.directhttp({ "url": RESTURLs.SM1_Controller_GetListofBillToLocDetails, "data": { "searchText": '', "pageIndex": 0, "pageSize": 0, "entityDetailCode": associateEntityID, "getDefault": true } });
        BillToLocService
            .then(function (data) {
                var objResultBillToLocs = JSON.parse(data);
                if (objResultBillToLocs.length > 0) {
                    for (var i = 0; i < objResultBillToLocs.length; i++) {
                        BillTo_item.id = objResultBillToLocs[i].BilltoLocationID;
                        BillTo_item.name = objResultBillToLocs[i].BillToLocName;
                        BillTo_item.address = objResultBillToLocs[i].BillToAddress;
                        BillTo_item.contact = objResultBillToLocs[i].BillToContact;
                        BillTo_item.selectedHeaderEntityId = associateEntityID;
                        BillTo_item.enabled = $scope.dataModel.orderData.billTo.enabled;
                    }
                } else {
                    BillTo_item.id = 0;
                    BillTo_item.name = '';
                    BillTo_item.address = '';
                    BillTo_item.contact = '';
                    BillTo_item.selectedHeaderEntityId = associateEntityID;
                    BillTo_item.enabled = $scope.dataModel.orderData.billTo.enabled;
                }
                $scope.dataModel.orderData.billTo = BillTo_item;

            })
            .catch(function (errorCallback) {
                logSvc.log(errorCallback);
            });
    }

    $scope.copyOfHeaderEntityModel = { "entityType": 10, "id": 2483, "headerEntityId": 13765, "entityCode": "99", "name": "Legal Entity - 60" };
    $scope.selectedHeaderEntity = "";
    $scope.updateCopyOfHeaderEntityModel = function () {
        if ($scope.dataModel && $scope.dataModel.orderData[$scope.selectedHeaderEntity])
            $scope.copyOfHeaderEntityModel = angular.copy($scope.dataModel.orderData[$scope.selectedHeaderEntity]);
    };
    $scope.updateCopyOfHeaderEntityModel();
    $scope.resetHeaderEntity = function (uiElementobj) {
        var entityKey = uiElementobj.data.split('.')[1];
        $scope.dataModel.orderData[entityKey] = angular.copy($scope.previousHeaderEntity);
        if (APPCONSTANTS.userPreferences.IsHeaderLevelEntityBU)
            $scope.setHeaderEntityAsBU();
    };

    $scope.getDeletedLineItemsAndSplits = function (data) {
        if (delArrayLine != undefined && delArrayLine.length > 0) {
            _.each(delArrayLine, function (value) {
                data.orderData.items.push(value);
            });
        }
        if (delArrayAcct != undefined && delArrayAcct.length > 0) {
            _.each(data.orderData.items, function (value) {
                var item = value;
                _.each(delArrayAcct, function (value) {
                    if (item.id == value.documentItemId) {
                        item.splits.push(value);
                    }
                });

            });
        }


        var deletedCharges = p2pDetailsService.getDeletedCharges(0);
        if (deletedCharges != undefined && deletedCharges.length > 0) {
            _.each(deletedCharges, function (value) {
                if (value.ItemChargeId > 0)
                    data.orderData.ItemChargesForHeader.push(value);
            });
        }
        var deletedChargesSplits = p2pDetailsService.getDeletedCharges(1);
        if (deletedChargesSplits != undefined && deletedChargesSplits.length > 0) {
            _.each(data.orderData.ItemChargesForHeader, function (value) {
                var item = value;
                _.each(deletedChargesSplits, function (value) {
                    if (item.ItemChargeId == value.documentItemId) {
                        item.splits.push(value);
                    }
                });

            });
        }

        var deletedSublineSplits = p2pDetailsService.getDeletedSublineSplits();
        if (deletedSublineSplits && deletedSublineSplits.length > 0) {
            _.each(data.orderData.items, function (x) {
                _.each(x.ItemChargesForSubLine, function (y) {
                    _.each(deletedSublineSplits, function (j) {
                        _
                        if (y.ItemChargeId == j.documentItemId) {
                            y.splits.push(j);
                        }
                    });
                });

            });

        }

        var deletedSublines = p2pDetailsService.getDeletedSublines();
        if (deletedSublines && deletedSublines.length > 0) {
            _.each(data.orderData.items, function (item) {
                _.each(deletedSublines, function (deletedSubline) {
                    if (item.id == deletedSubline.DocumentItemId) {
                        item.ItemChargesForSubLine.push(deletedSubline);
                    }                    
                });
            });
        }

        return data;
    }
    function fillTeamMembers() {
        var teamMembers = p2pDetailsService.getTeamMembers();
        _.each(teamMembers, function (options) {
            if (_.find($scope.dataModel.orderData.DocumentStakeHolderList, { ContactCode: options.ContactCode }) == undefined) {
                var user = { "DocumentStakeholderId": 0, "DocumentCode": 0, "PartnerCode": $scope.dataModel.orderData.partner.id, "ContactCode": options.ContactCode, "StakeholderTypeInfo": 5, "IsDeleted": options.IsDeleted, "PartnerName": null, "ContactName": options.name, "FirstName": null, "LastName": null, "StakeholderDocumentStatus": 0, "EmailId": null, "ProxyContactCode": 0, "ProxyEmailId": null, "ProxyContactName": null, "Designation": null, "ClientContactCode": null, "Address": null, "ClientPartnerCode": null, "PartnerTypeId": 0, "PartnerTypeName": null, "SequenceId": 0, "DoingBusinessAs": null, "GroupSequenceId": 0, "DocumentAddressDetailsList": null }
                $scope.dataModel.orderData.DocumentStakeHolderList.push(user);
            }
            else {
                var i = _.findIndex($scope.dataModel.orderData.DocumentStakeHolderList, { ContactCode: options.ContactCode })
                if (i > -1) {
                    $scope.dataModel.orderData.DocumentStakeHolderList[i].IsDeleted = options.IsDeleted;
                }
            }
        });

    }

    function reFormatItemData(data) {
        _.each(data.orderData.items, function (item, index) {
            if (data.orderData.items[index].description) {
            data.orderData.items[index].description = data.orderData.items[index].description.desc;
            }
            else
            {
                data.orderData.items[index].description = null;
            }
            if (data.orderData.items[index].buyerItemNumber) {
            data.orderData.items[index].buyerItemNumber = data.orderData.items[index].buyerItemNumber.code;
            }
            else
            {
                data.orderData.items[index].buyerItemNumber = null;
            }
            
        });
        return data;
    }
    $scope.saveForm = function (e, Callfrom) {
        isSaveTriggered = true;
        showLoader();
        formatDataModel();
        fillTeamMembers();
        var cancelItemMessage = new Object();
        var data = angular.copy($scope.dataModel);
        data.orderData.locationId = data.orderData.orderingLocation.id;
        data = $scope.getDeletedLineItemsAndSplits(data);
        data = reFormatItemData(data);
        p2pCustomAttributesService.customAttributes
            .init($scope.dataModel.orderData.CustomAttrQuestionSetCodesForHeader,
                $scope.dataModel.orderData.documentCode);
        data.orderData.ListQuestionResponse = p2pCustomAttributesService.customAttributes.getListQuestionResponse();
        p2pCustomAttributesService.customAttributes.validateCustomAttributes();
        saveGridState();
        var req = getSaverequestObject(data, true);
         setInitialName(req);
        var getSaveService = httpService.directhttp({
            "url": req.url, "data": req.data, "timeout": req.timeout, "method": req.method
        });
        getSaveService.then(function (response) {
            var result = response;
            if (result && result.documentCode > 0) {
                _showcopyBtn();
                if (Callfrom != undefined && Callfrom === $scope.orderSource.ChangeRequest) {
                    $scope.SendToBuyer();
                }
                else if (Callfrom === 'Finalize') {
                    $scope.isInternalCOFinalize = true;
                    window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                }
                else {
                    //$scope.dataModel.orderData = response;
                    _.each(response.items, function (item, index) {
                        response.items[index].description = { 'desc': response.items[index].description };
                        response.items[index].buyerItemNumber = { 'code': response.items[index].buyerItemNumber };
                    });
                    $.extend(true, $scope.dataModel.orderData, response);

                    $scope.comment.config.CommentObjectID = result.documentCode; // updating comments config for blank order case. 
                DisplayingDispathMode();
                    lastSavedName = $scope.dataModel.orderData.name;
                    if ($scope.dataModel.orderData.source.id == 10) {
                        OldOrderData = angular.copy($scope.dataModel);
                        $scope.dataModel.orderData.ChangeOrderType = { "id": 2, "name": "Internal" };
                        $scope.dataModel.orderData.ChangeOrderType.id = 2;
                    }
                    else if ($scope.dataModel.orderData.source.id == 5) {
                        $scope.dataModel.orderData.ChangeOrderType = { "id": 1, "name": "External" };
                        $scope.dataModel.orderData.ChangeOrderType.id = 1;

                    }
                    //$rootScope.$broadcast('composedGridUpdateSaveOrderData', {
                    //    SaveOrderData: $scope.dataModel.orderData.items
                    //});
                    //$rootScope.$broadcast('composedChargeGridUpdateSaveOrderData', {
                    //    SaveOrderData: $scope.dataModel.orderData.ItemChargesForHeader
                    //});
                    delArrayLine = [];
                    delArrayAcct = [];
                    p2pDetailsService.resetDeletedSublineSplits();
                    p2pDetailsService.resetDeletedCharges();
                    p2pDetailsService.resetDeletedSublines();
                    dataModelChangesForShipToAndBillTo();
                    checkDefaultValues();
                    hideLoader();
                    console.log(orderMesssage('success'));
                    //notificationPopUp(orderMesssage('success','P2P_PO_OrderSavedSuccess'));
                    if (Callfrom == "cancelLineItem") {
                        p2pDetailsService.onCancelLineItemSuccess();
                        cancelItemMessage.message = $translate.instant("P2P_PO_LineItemCancellationSuccess");
                        cancelItemMessage.type = "success";
                        cancelItemMessage.buttons = [{ "title": "OK", "result": "OK" }];
                        notification.notify(cancelItemMessage, function (response) {
                        });
                        return;
                    }
                    Materialize.toast($translate.instant("P2P_PO_OrderSavedSuccess"), 3000);
                }
            }
            else {
                hideLoader();
                if (Callfrom == "cancelLineItem") {
                    cancelItemMessage.message = $translate.instant("P2P_PO_LineItemCancellationError");
                    cancelItemMessage.type = "error";
                    cancelItemMessage.buttons = [{ "title": "OK", "result": "OK" }];
                    notification.notify(cancelItemMessage, function (response) {
                    });
                    return;
                }
                orderMesssage('error', 'P2P_PO_OrderSavedError');
            }
            isSaveTriggered = false;
        }).catch(function (e) {
            console.log(e);
            hideLoader();
            isSaveTriggered = false;
            if (Callfrom == "cancelLineItem") {
                cancelItemMessage.message = $translate.instant("P2P_PO_LineItemCancellationError");
                cancelItemMessage.type = "error";
                cancelItemMessage.buttons = [{ "title": "OK", "result": "OK" }];
                notification.notify(cancelItemMessage, function (response) {
                });
                return;
            }
        });
    }

    function fillShipTo() {
        var arrayLength = $scope.dataModel.orderData.items.length;
        for (var i = 0; i < arrayLength; i++) {
            if ($scope.dataModel.orderData.items[i].shipTo != null && $scope.dataModel.orderData.items[i].shipTo.id == 0) {
                var shipToObj = {};
                shipToObj.address = $scope.dataModel.orderData.shipTo.address;
                shipToObj.id = $scope.dataModel.orderData.shipTo.id;
                shipToObj.name = $scope.dataModel.orderData.shipTo.name;
                //shipToObj.value = $scope.dataModel.orderData.shipTo.value;
                $scope.dataModel.orderData.items[i].shipTo = shipToObj;

            }
        }
    }
    if (clientSpecificSettings.rulesOnSubmit !== undefined)
        var clientRules = clientSpecificSettings.rulesOnSubmit;
    else
        var clientRules = [];

    $scope.submitForm = function () {
        var rule = [];
        if ($scope.dataModel.orderData.source &&  $scope.dataModel.orderData.source.id == 5) {
            if (configClientConstants.ChangeOrderRule != undefined)
                rule = configClientConstants.ChangeOrderRule;
        }
        $scope.dataModel.orderData.isSupplier = $scope.IsSupplier;
        RuleEngine.setRules('', $scope.dataModel, rule, '', 'header');
        RuleEngine.execute(function (e) {
            if (e.success) {    
                RuleEngine.setRules('', $scope.dataModel, clientRules, '', 'header');
                RuleEngine.execute(function (e) {
                    if (e.success) {
                        RuleEngine.setRules($scope.formConfig.sections, $scope.dataModel, [], '', 'header');
                        RuleEngine.execute(function (e) {
                            console.log(e);
                            if (!e.success) {
                                var showFailureMessage = {
                                    type: "error",
                                    message: e.failedRules[0].error+' : '+$translate.instant(e.failedRules[0].uiConfig.label),
                                    buttons: [{
                                        "title": "OK",
                                        "result": "yes"
                                    }]
                                }
                                notification.notify(showFailureMessage, function (response) {
                                    if (response.result === "yes")
                                        onError();
                                });

                                return;
                            }
                            else if (e.success) {
                                if (p2pDetailsService.getGridErrorCount() <= 0) {
                                    showLoader();
                                    formatDataModel();
                                    fillTeamMembers();
                                    var itemNotExistsflag = true;
                                    var data = angular.copy($scope.dataModel);
                                    data.orderData.locationId = data.orderData.orderingLocation.id;
                                    data = $scope.getDeletedLineItemsAndSplits(data);
                                    data = reFormatItemData(data);
                                    showLoader();
                                    p2pCustomAttributesService.customAttributes
                                        .init($scope.dataModel.orderData.CustomAttrQuestionSetCodesForHeader,
                                            $scope.dataModel.orderData.documentCode);
                                    data.orderData.ListQuestionResponse = p2pCustomAttributesService.customAttributes.getListQuestionResponse();
                                    if (!p2pCustomAttributesService.customAttributes.validateCustomAttributes()) {
                                        hideLoader();
                                        var showFailureMessage = {
                                            type: "error",
                                            message: "Mandatory fields are missing  in Additional Info",
                                            buttons: [{
                                                "title": "OK",
                                                "result": "yes"
                                            }]
                                        }
                                        notification.notify(showFailureMessage);
                                        return false;
                                    }
                                    else {
                                        // all mandatory fields were provided. now look for custom conditions in STG_BasicSettingDetails
                                        var result = p2pCustomAttributesService.customAttributes.validateCustomRowConditions($scope.dataModel.orderData);
                                        if (!result.isValid) {
                                            hideLoader();
                                            var showFailureMessage = {
                                                type: "error",
                                                message: result.errorMsg,
                                                buttons: [{
                                                    "title": "OK",
                                                    "result": "yes"
                                                }]
                                            }
                                            notification.notify(showFailureMessage);
                                            return false;
                                        }
                                    }
                                    var req = getSaverequestObject(data, true);

                                    var returnMsg = "";
                                    saveGridState();
                                    var getSaveService = httpService.directhttp({
                                        "url": req.url, "data": req.data, "timeout": req.timeout, "method": req.method
                                    });
                                    getSaveService.then(function (response) {
                                        isSaveTriggered = true;
                                        var result = response;
                                        if (result) {
                                            //$scope.dataModel.orderData = result;
                                            _.each(result.items, function (item, index) {
                                                result.items[index].description = { 'desc': result.items[index].description };
                                                result.items[index].buyerItemNumber = { 'code': result.items[index].buyerItemNumber };
                                            });
                                            $.extend(true, $scope.dataModel.orderData, result);
                                            $scope.comment.config.CommentObjectID = result.documentCode; // updating comments config for blank order case.              
                                            //$rootScope.$broadcast('composedGridUpdateSaveOrderData', {
                                            //    SaveOrderData: $scope.dataModel.orderData.items
                                            //});
                                            //$rootScope.$broadcast('composedChargeGridUpdateSaveOrderData', {
                                            //    SaveOrderData: $scope.dataModel.orderData.ItemChargesForHeader
                                            //});
                                            delArrayLine = [];
                                            delArrayAcct = [];
                                            p2pDetailsService.resetDeletedSublineSplits();
                                            p2pDetailsService.resetDeletedCharges();
                                            p2pDetailsService.resetDeletedSublines();
                                            dataModelChangesForShipToAndBillTo();
                                            checkDefaultValues();                            
                                            var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
                                            var submissionUrl = RESTURLs.SM1_Controller_GetSubmissionCheck + "&bpc=" + bpc + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&documentTypeId=8";
                                            var getSubmissionService = httpService.directhttp({
                                                "url": submissionUrl, "timeout": 90000, "method": "GET"
                                            })
                                            //clientConstants.validateASL = true;
                                            if (configClientConstants.allowASLValidation) {
                                                ValidateASL().then(function (response) {
                                                    console.log(response);
                                                    if (response != undefined) {
                                                        if (response.TransactionStatus == "Success") {
                                                            if (response.ItemNumberList.length > 0) {
                                                                var orderData = $scope.dataModel.orderData;
                                                                for (var i = 0; i < orderData.items.length; i++) {
                                                                    var obj = _.where(response.ItemNumberList, { OrderItemId: orderData.items[i].id });
                                                                    if (obj != null && obj != undefined && obj.length > 0) {
                                                                        //orderData.items[i].IsItemNumberInValid = true;
                                                                        orderData.items[i].externalError = false;
                                                                        var errorCodes = [];
                                                                        for (var j = 0; j < obj.length; j++) {
                                                                            errorCodes.push(obj[j].ErrorCode);
                                                                        }
                                                                        orderData.items[i].aslErrorCode = errorCodes;
                                                                    }
                                                                    //if (!_.contains(response.ItemNumberList, orderData.items[i].id))

                                                                }
                                                                $.extend(true, $scope.dataModel.orderData, orderData);
                                                                $rootScope.$broadcast("notifyDataChange");
                                                                hideLoader();
                                                            }
                                                            else {
                                                                var errorCodes = [];
                                                                var orderData = $scope.dataModel.orderData;
                                                                for (var i = 0; i < orderData.items.length; i++) {
                                                                      orderData.items[i].externalError = true;
                                                                      orderData.items[i].aslErrorCode = errorCodes;
                                                                }
                                                                $.extend(true, $scope.dataModel.orderData, orderData);
                                                                $rootScope.$broadcast("notifyDataChange");
                                                                GetSubmissionRequest();
                                                            }
                                                        }
                                                        else {
                                                            var aslErrorMessage = orderMesssage("error", "P2P_PO_ValidateASLError");
                                                            notificationPopUp(aslErrorMessage);
                                                            hideLoader();
                                                        }

                                                    }
                                                    else {
                                                        var aslErrorMessage = orderMesssage("error", "P2P_PO_ValidateASLError");
                                                        notificationPopUp(aslErrorMessage);
                                                        hideLoader();
                                                    }
                                                })
                                            }
                                            else {
                                                GetSubmissionRequest();
                                            }
                                        }
                                        else {
                                            var saveOrderMessage = orderMesssage("error", "P2P_PO_OrderSavedError");
                                            notificationPopUp(saveOrderMessage);
                                            hideLoader();
                                        }
                                        isSaveTriggered = false;
                                    }).catch(function (errorCallback) {
                                        hideLoader();
                                        $scope.showPopup = false;
                                        var saveOrderMessage = orderMesssage("error", "P2P_PO_OrderSavedError");
                                        notificationPopUp(saveOrderMessage);
                                        console.log(errorCallback.statusText);
                                        isSaveTriggered = false;
                                    });
                                }
                                else {
                                    var showFailureMessage = {
                                        type: "error",
                                        message: "Mandatory fields are missing in line section",
                                        buttons: [{
                                            "title": "OK",
                                            "result": "yes"
                                        }]
                                    }
                                    notification.notify(showFailureMessage);

                                    return;
                                }
                            }
                            else {

                                var showFailureMessage = {
                                    type: "error",
                                    message: $translate.instant('Mandatory Fields Missing'),
                                    buttons: [{
                                        "title": "OK",
                                        "result": "yes"
                                    }]
                                }
                                notification.notify(showFailureMessage);
                            }
                        }, $scope);
                    }
                    else {
                        var showLineItemMessage = {
                            type: "error",
                            message: e.failedRules[0].error,
                            buttons: [{
                                "title": "OK",
                            }]
                        }
                        notification.notify(showLineItemMessage);
                        return false;
                    }
                }, $scope);
            }
            else {
                var showFailureMessage = {
                    type: "error",
                    message: $translate.instant(e.failedRules[0].error),
                    buttons: [{
                        "title": "OK",
                        "result": "yes"
                    }]
                }
                notification.notify(showFailureMessage, function (response) {
                    if (response.result === "yes")
                        onError();
                });

                return;
            }
        }, $scope);

    }

    $rootScope.$on('composedGridDeleteDispatcher', function (e, data) {
        if (data.data[0].length > 0) {
            _.each(data.data[0], function (value, key) {
                delArrayLine.push(value);
            });
        }

        if (data.data[1].length > 0) {
            _.each(data.data[1], function (value, key) {
                delArrayAcct.push(value);
            });
        }

    });


    //$rootScope.$on('composedChargeGridDeleteDispatcher', function (e, data) {
    //    if (data.data[0].length > 0) {
    //        _.each(data.data[0], function (value, key) {
    //            delChargeArrayLine.push(value);
    //        });
    //    }

    //    if (data.data[1].length > 0) {
    //        _.each(data.data[1], function (value, key) {
    //            delChargeArrayAcct.push(value);
    //        });
    //    }

    //});

    //$rootScope.$on('composedSublineGridDeleteDispatcher', function (e, data) {


    //    if (data.data[1].length > 0) {
    //        _.each(data.data[1], function (value, key) {
    //            delArraySublineAcct.push(value);
    //        });
    //    }

    //});





    var ValidateASL = function () {
        var dd = p2pDetailsService.getQueryStringValue("dd");
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var ACECode = 0;

        var urls = RESTURLs.SM1_Controller_ValidateASL + "&dd=" + dd + "&bpc=" + bpc;
        var ValidateASLService = httpService.directhttp({
            "url": urls,
            "method": "POST",
            "timeout": 60000,
            "data": {
                "oloc": 107,
                "partnerCode": $scope.dataModel.orderData.partner.id,
                "OrderLocationID": $scope.dataModel.orderData.orderingLocation.id,
                "orgEntityDetailCode": ACECode,
                "orderId": $scope.dataModel.orderData.documentCode
            }
        });
        return ValidateASLService;
    }

    function GetSubmissionRequest() {
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var submissionUrl = RESTURLs.SM1_Controller_GetSubmissionCheck + "&bpc=" + bpc + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&documentTypeId=8";
        var getSubmissionService = httpService.directhttp({
            "url": submissionUrl, "timeout": 90000, "method": "GET"
        })
        getSubmissionService.then(function (submissionRes) {
            var resultSubmissionCheck = '';
            if ((submissionRes != undefined || submissionRes != null) && submissionRes != "") {
                if (submissionRes.Action == 13) {
                    if (submissionRes.ValidationMessage != "") {
                        if (submissionRes.ValidationMessage.indexOf("[]") != -1) {
                            submissionRes.ValidationMessage = submissionRes.ValidationMessage.replace("[]", "");
                        }
                        var getSubmissionCheckServiceconfig = orderMesssage("warning", submissionRes.ValidationMessage);
                        notification.notify(getSubmissionCheckServiceconfig, function (response) {
                            if (response.result === "YES") {
                                hideLoader();
                                return;
                            }
                        });
                    }
                } else {
                    onResultSubmissionCheck(submissionRes.ValidationMessage);
                }
            } else {
                var submissionCheckErrorMessage = orderMesssage("error", "P2P_PO_OrderSavedError")
                notificationPopUp(submissionCheckErrorMessage);
                hideLoader();
            }
        }).catch(function (errCallback) {
            $scope.showPopup = false;
            var submissionCheckErrorMessage = orderMesssage("error", "P2P_PO_OrderSavedError");
            notificationPopUp(submissionCheckErrorMessage);
            console.log(errCallback.statusText);
            hideLoader();
        });
    }

    $scope.validateOrderForm = function () {
        var data = angular.copy($scope.dataModel);
        data = $scope.getDeletedLineItemsAndSplits(data);
        if (data.orderData.source.id == 5) {
            var itemCount = _.filter(data.orderData.items, function (item) { return item.ItemStatus!=null &&  item.ItemStatus.id != 121 && !item.isDeleted });
            if (itemCount.length === 0) {
                cancelOrderConfirmation("item");
            }
        }
        if (checkERS()) {
            if (data.orderData.ERS == false && validateERS()) {
                ERSCnfirmation();
            }
            else {
                $scope.submitForm();
            }
        }
        else {
            $scope.submitForm();
        }
    }

    function orderMesssage(types, msg) {
        var saveOrderMessage = {
            type: types,
            message: $translate.instant(msg),
            buttons: [{
                "title": "OK",
                "result": "YES"
            }]
        };
        return saveOrderMessage;

    }
    $scope.CreateInvoice = function () {
        showLoader();
        var data = angular.copy($scope.dataModel);
        if (checkERS()) {
            if (data.orderData.ERS == true) {
                var CreateInvoiceMessage = orderMesssage("warning", $translate.instant("P2P_PO_CreateInvoiceMessage"));
                notification.notify(CreateInvoiceMessage, function (response) {
                    if (response.result === "yes") {
                    }
                });
            }
            else {
                createInvoiceFromOrder();
            }
            hideLoader();
        }
        else {
            createInvoiceFromOrder();
        }
    }

    function onResultSubmissionCheck(resultSubmissionCheck) {
        if (resultSubmissionCheck == undefined || resultSubmissionCheck == null || resultSubmissionCheck == '') {
            showLoader();
            RuleEngine.setRules('', $scope.dataModel, ['codeCombinationReleaseOrder'], '', 'header');
            RuleEngine.execute(function (e) {
                if (e.success) {
                    if (clientConstants.AllowExtrenalCodeCombination) {
                        if (clientConstants.AllowExtrenalCodeCombinationSync) {
                            externalCodeCombinationSync("submit");
                        }
                        else {
                            externalCodeCombination();
                        }
                    }
                    else {
                        SendForApproval();
                    }

                }
                else {
                    SendForApproval();
                }
            });
        } else {
            var sendOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_OrderSavedError"));
            notificationPopUp(sendOrderErrorMessage);
            hideLoader();
        }
    }

    function externalCodeCombination() {

        //"data": { "contactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, "documentCode": documentCode, "documentAmount": documentAmount, "documentTypeId": 7, "fromCurrency": fromCurr, "toCurrency": toCurr, "isOperationalBudgetEnabled": false, "headerOrgEntityCode": 0 }
        var url = RESTURLs.SM1_Controller_ExternalCodeCombinationUrl;
        var request = { "url": url, "timeout": 90000, "method": "POST" }
        var CodeCombinationService = externalCodeCombinationRequest(request);
        CodeCombinationService.then(function (res) {
            if (res != '') {
                var result = res.indexOf('{') >= 0 ? JSON.parse(res) : res;
                if ((result.hasOwnProperty("InvokeWorkFlowResult") && result.SendForApprovalResult != '') || result === "Success") {
                    var saveOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_OrderSubmittedSuccessfully"));
                    notification.notify(saveOrderMessage, function (response) {
                        if (response.result === "yes") {
                        }
                        hideLoader();
                    });
                    setTimeout(function () {
                        window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                    }, 2500);
                }
                else {
                    var showPopupMessage = orderMesssage("error", JSON.stringify(result));
                    notification.notify(showPopupMessage, function (response) {
                        if (response.result === "yes") {

                        };
                    });
                    hideLoader();
                }
            }
            else {
                var sendOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_FrieghtTerms"));
                notificationPopUp(sendOrderErrorMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader(true);
            $scope.showPopup = false;
            console.log(errorCallback.statusText);
        });
        // }
    }

    //function to trigger code combination validation in sync
    $scope.validateCodeCombination = function () {
        showLoader();
        formatDataModel();
        var itemNotExistsflag = true;
        var data = angular.copy($scope.dataModel);
        data = reFormatItemData(data);
        data.orderData.locationId = data.orderData.orderingLocation.id;
        data = $scope.getDeletedLineItemsAndSplits(data);
        showLoader();
        var req = getSaverequestObject(data, true);
        setInitialName(req);
        var returnMsg = "";
        var getSaveService = httpService.directhttp({
            "url": req.url, "data": req.data, "timeout": req.timeout, "method": req.method
        });
        getSaveService.then(function (response) {
            var result = response;
            if (result) {
                $.extend(true, $scope.dataModel.orderData, result);               
                lastSavedName = $scope.dataModel.orderData.name;
                externalCodeCombinationSync("validation");
            }
            else {
                var saveOrderMessage = orderMesssage("error", "P2P_PO_OrderSavedError");
                notificationPopUp(saveOrderMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader();
            $scope.showPopup = false;
            var saveOrderMessage = orderMesssage("error", "P2P_PO_OrderSavedError");
            notificationPopUp(saveOrderMessage);
            console.log(errorCallback.statusText);
        });

    }


    //handle save and update error codes in grid for sync validation
    function externalCodeCombinationSync(callFrom) {
        //clientConstants["AllowCodeCombinationSync"] = true;
        var url = RESTURLs.SM1_Controller_ExternalCodeCombinationUrlSync;
        var request = { "url": url, "timeout": 400000, "method": "POST" }
        var CodeCombinationService = externalCodeCombinationRequest(request);
        CodeCombinationService.then(function (res) {
            if (res != undefined) {
                if (typeof res != "string" && res.TransactionStatus == "Success") {
                    var getReq = {};
                    getReq.method = "POST";
                    getReq.url = APPCONSTANTS.userPreferences.URLs.AppURL + '/api/PO/GetOrderDisplayDetails' + '?oloc=218',
                    getReq.data = JSON.parse(angular.toJson({ "data": { id: $scope.dataModel.orderData.documentCode } }));
                    getReq.dataType = 'json',
                    getReq.headers = {
                        "Content-Type": "application/json",
                    };
                    var getdata = httpService.directhttp(getReq);
                    getdata.then(function successCallback(getresponse) {
                        console.log(getresponse);
                        if (typeof getresponse != 'undefined') {
                            delArrayLine = [];
                            delArrayAcct = [];
                            p2pDetailsService.resetDeletedSublineSplits();
                            p2pDetailsService.resetDeletedCharges();
                            p2pDetailsService.resetDeletedSublines();
                            dataModelChangesForShipToAndBillTo();
                            $.extend(true, $scope.dataModel.orderData.items, getresponse.items);
                            //$scope.dataModel.orderData.items = getresponse.items;
                            //$rootScope.$broadcast('composedGridUpdateSaveOrderData', {
                            //    SaveOrderData: $scope.dataModel.orderData.items
                            //});
                            //$rootScope.$broadcast('composedChargeGridUpdateSaveOrderData', {
                            //    SaveOrderData: $scope.dataModel.orderData.ItemChargesForHeader
                            //});
                            $rootScope.$broadcast('composedGridAccountingErrorUpdateDispatcher', {
                                SaveOrderData: $scope.dataModel.orderData.items
                            });
                            $rootScope.$broadcast('composedGridChargeAccountingErrorUpdateDispatcher', {
                                SaveOrderData: $scope.dataModel.orderData.items
                            });
                            if (checkValidationStaus() && callFrom == "validation") {
                                Materialize.toast($translate.instant("P2P_PO_CodeCombinationSuccess"), 3000);
                            }

                            // to rebind grid - expensive call
                            $rootScope.$broadcast("notifyDataChange");
                            if (checkValidationStaus() && callFrom == "submit") {
                                SendForApproval();
                            }
                            if (!checkValidationStaus()) {
                                var sendOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_CodeCombinationError"));
                                notificationPopUp(sendOrderErrorMessage);
                            }
                            hideLoader();

                        }
                        else {
                            var showConfirmationMessage = {
                                type: "error",
                                message: 'Error in fetching validated data',
                                buttons: [{
                                    "title": $translate.instant('OK'),
                                    "result": "OK"
                                }]
                            }
                            notification.notify(showConfirmationMessage, function (response) {

                            });
                        }
                    }).catch(function (errorCallback) {
                        console.log(errorCallback);
                    });
                    //Materialize.toast($translate.instant("Order saved Sucessfully"), 3000);
                }
                else {
                    var sendOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_CodeCombinationInternalError"));
                    notificationPopUp(sendOrderErrorMessage);
                    hideLoader();
                }
            }
            else {
                var sendOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_CodeCombinationInternalError"));
                notificationPopUp(sendOrderErrorMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader(true);
            $scope.showPopup = false;
            var sendOrderErrorMessage = orderMesssage("error", errorCallback.statusText);
            notificationPopUp(sendOrderErrorMessage);
        });
    }

    function checkValidationStaus() {
        var isValid = true;
        var isHeaderChargesValid = true;
        var isChargesValid = true;
        if ($scope.dataModel.orderData.items != null && $scope.dataModel.orderData.items != undefined) {
            for (var i = 0; i < $scope.dataModel.orderData.items.length; i++) {
                if ($scope.dataModel.orderData.items[i].splits != null && $scope.dataModel.orderData.items[i].splits != undefined) {
                    for (var j = 0; j < $scope.dataModel.orderData.items[i].splits.length; j++) {
                        var split = $scope.dataModel.orderData.items[i].splits[j]
                        if (split["errorCode"] != "" && split["errorCode"] != "null")
                            isValid = false;
                    }
                }
                if ($scope.dataModel.orderData.items[i].ItemChargesForSubLine != null && $scope.dataModel.orderData.items[i].ItemChargesForSubLine != undefined) {
                    for (var j = 0; j < $scope.dataModel.orderData.items[i].ItemChargesForSubLine.length; j++) {
                        if ($scope.dataModel.orderData.items[i].ItemChargesForSubLine[j].splits != null && $scope.dataModel.orderData.items[i].ItemChargesForSubLine[j].splits != undefined) {
                            for (var k = 0; k < $scope.dataModel.orderData.items[i].ItemChargesForSubLine[j].splits.length; k++) {
                                var split = $scope.dataModel.orderData.items[i].ItemChargesForSubLine[j].splits[k]
                                if (split["errorCode"] != "" && split["errorCode"] != "null")
                                    isChargesValid = false;
                            }
                        }
                    }
                }
            }
        }
        if ($scope.dataModel.orderData.ItemChargesForHeader != null && $scope.dataModel.orderData.ItemChargesForHeader != undefined) {
            for (var i = 0; i < $scope.dataModel.orderData.ItemChargesForHeader.length; i++) {
                if ($scope.dataModel.orderData.ItemChargesForHeader[i].splits != null && $scope.dataModel.orderData.ItemChargesForHeader[i].splits != undefined) {
                    for (var j = 0; j < $scope.dataModel.orderData.ItemChargesForHeader[i].splits.length; j++) {
                        var split = $scope.dataModel.orderData.ItemChargesForHeader[i].splits[j]
                        if (split["errorCode"] != "" && split["errorCode"] != "null")
                            isHeaderChargesValid = false;
                    }
                }
            }
        }

        if (isValid && isChargesValid && isHeaderChargesValid) {
            return true;
        }
        else {
            return false;
        }

    }


    function SendForApproval() {
        var approvalOrder = {
        };
        var contactCode = APPCONSTANTS.userPreferences.CommonSettings.ContactCode;
        var buyerPartnerCode = APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode;
        var fromCurrency = $scope.dataModel.orderData.currency.name;
        var toCurrency = $scope.dataModel.orderData.currency.name;
        var orgEntityCode = 0;
        var sourceType = $scope.dataModel.orderData.source.id;
        var documentAmount = parseFloat($scope.dataModel.orderData.itemTotal)//p2pDetailsService.GetTotalPrice();
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var url = RESTURLs.SM1_Controller_SentOrderForApproval + bpc + "&partnerCode=" + buyerPartnerCode + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&documentAmount=" + documentAmount + "&sourceType=" + sourceType + "&fromCurrency=" + fromCurrency + "&toCurrency=" + toCurrency + "&headerOrgEntityCode=" + orgEntityCode
        //"data": { "contactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, "documentCode": documentCode, "documentAmount": documentAmount, "documentTypeId": 7, "fromCurrency": fromCurr, "toCurrency": toCurr, "isOperationalBudgetEnabled": false, "headerOrgEntityCode": 0 }
        var SubmitOrderService = httpService.directhttp({
            "url": url, "timeout": 90000, "method": "GET"
        });
        SubmitOrderService.then(function (res) {
            if (res != '') {
                var result = res.indexOf('{') >= 0 ? JSON.parse(res) : res;
                if ((result.hasOwnProperty("InvokeWorkFlowResult") && result.SendForApprovalResult != '') || result === "Success" || result === "true") {
                    var saveOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_OrderSubmittedSuccessfully"));
                    notification.notify(saveOrderMessage, function (response) {
                        if (response.result === "yes") {
                        }

                    });
                    setTimeout(function () {
                        hideLoader();
                        window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                    }, 2500);
                }
                else {
                    var showPopupMessage = orderMesssage("error", JSON.stringify(result));
                    notification.notify(showPopupMessage, function (response) {
                        if (response.result === "yes") {

                        };
                    });
                    hideLoader();
                }
            }
            else {
                var sendOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_OrderSavedError"));
                notificationPopUp(sendOrderErrorMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader(true);
            $scope.showPopup = false;
            console.log(errorCallback.statusText);
        });
    }

    //form external code combination request object for both sync and async
    function externalCodeCombinationRequest(data) {
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var contactCode = APPCONSTANTS.userPreferences.CommonSettings.ContactCode;
        var buyerPartnerCode = APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode;
        var sourceType = $scope.dataModel.orderData.source.id;
        var items = [];
        if ($scope.dataModel.orderData.items != null && $scope.dataModel.orderData.items.length > 0) {
            for (var i = 0; i < $scope.dataModel.orderData.items.length; i++) {
                items.push($scope.dataModel.orderData.items[i]);
            }
        };

        //reformatting Data
        _.each(items, function (item, index) {
            items[index].description = items[index].description.desc;
            items[index].buyerItemNumber = items[index].buyerItemNumber.code;
        });

        var url = RESTURLs.SM1_Controller_ExternalCodeCombinationUrl;
        if ($scope.dataModel.orderData.ItemChargesForHeader != null && $scope.dataModel.orderData.ItemChargesForHeader.length > 0) {
            var item = {
                id: 0,
                ItemChargesForSubLine: $scope.dataModel.orderData.ItemChargesForHeader
            }
            items.push(item);
        }

        if (clientConstants.AllowExtrenalCodeCombinationSync) {
            url = RESTURLs.SM1_Controller_ExternalCodeCombinationUrlSync;
            //url = "http://127.0.0.2:81/Order/ManageOrder/ExternalCodeCombinationCheckSync?oloc=107";
        }
        //RESTURLs.SM1_Controller_ExternalCodeCombinationSyncUrl;
        var codeCombinationRequest = {
            "partnerCode": buyerPartnerCode,
            "documentCode": $scope.dataModel.orderData.documentCode,
            "sourceType": sourceType,
            "orderItems": JSON.stringify(items)
        }
        return httpService.directhttp({ "url": data.url, "timeout": data.timeout, "method": data.method, "data": JSON.stringify(codeCombinationRequest) });
    }
    var approvalCheckmessgae;
    $scope.getApprovalcheck = function () {
        showLoader();
        formatDataModel();
        var ApproveOrderService = httpService.directhttp({
            "url": RESTURLs.SM1_Controller_SendForApproveOrderCheck + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&documentTypeId=" + $scope.dataModel.orderData.type.id,
            "method": "GET",
            "timeout": 60000
        });

        ApproveOrderService.then(function (responsedata) {
            console.log(responsedata);
            if (responsedata.ValidationMessage === "" || responsedata.ValidationMessage === null || responsedata.ValidationMessage === undefined) {
                var ApproveOrderService = httpService.directhttp({
                    "url": RESTURLs.SM1_Controller_SendForApproveOrder + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&isApproved=true&documentTypeId=" + $scope.dataModel.orderData.type.id + "&LOBId=" + $scope.dataModel.orderData.documentLOB.entityDetailCode,
                    "method": "GET",
                    "timeout": 60000

                });
                ApproveOrderService.then(function (response) {
                    console.log(response);
                    if (JSON.parse(response).ReceiveNotificationResult == "True") {
                        var saveOrderMessage = {
                            type: "success",
                            message: $translate.instant("P2P_Order_OrderApprovedSuccessfully"),
                            buttons: [{
                                "title": "OK",
                                "result": "YES"
                            }]
                        }
                        $scope.IsUsereligibleforApproveReject = false;
                    }
                    else {
                        var saveOrderMessage = {
                            type: "error",
                            message: $translate.instant("P2P_Order_FailedinApprovingOrder"),
                            buttons: [{
                                "title": "OK",
                                "result": "YES"
                            }]
                        }
                    }
                    hideLoader();
                    notificationPopUp(saveOrderMessage);
                    setTimeout(function () { window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl; }, 2500);
                }).catch(function (errorCallback) {
                    var saveOrderMessage = {
                        type: "error",
                        message: errorCallback.statusText,
                        buttons: [{
                            "title": "OK",
                            "result": "YES"
                        }]
                    }
                    hideLoader(true);
                    notificationPopUp(saveOrderMessage);
                });
            }
            else {
                var approvalOrderMessage = {
                    type: "error",
                    message: $translate.instant(responsedata.ValidationMessage),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                hideLoader();
                notificationPopUp(approvalOrderMessage);
            }
        });
    }

    $scope.ApproveOrder = function () {
        showLoader();
        formatDataModel();
        //// var data = angular.copy($scope.dataModel);
        // var req = {};
        // req.method = 'GET';
        // req.url = RESTURLs.SM1_Controller_SendForApproveOrder + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&isApproved=true&documentTypeId=" + $scope.dataModel.orderData.type.id + "&LOBId=" + $scope.dataModel.orderData.documentLOB.entityDetailCode;
        // req.timeout = 60000;
        //// req.data = { "documentCode": $scope.dataModel.orderData.documentCode, "isApproved": true, "documentTypeId": 8, "LOBId": 0 };
        // //req.headers = {
        // //    "Content-Type": "application/json",
        // //    "UserExecutionContext": JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails)
        // //};

        $scope.getApprovalcheck();
        //if (approverMessage === "" || approverMessage === null || approverMessage === undefined) {
        //      var ApproveOrderService = httpService.directhttp({
        //          "url": RESTURLs.SM1_Controller_SendForApproveOrder + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&isApproved=true&documentTypeId=" + $scope.dataModel.orderData.type.id + "&LOBId=" + $scope.dataModel.orderData.documentLOB.entityDetailCode,
        //          "method": "GET",
        //          "timeout": 60000

        //      });
        //      ApproveOrderService.then(function (response) {
        //          console.log(response);
        //          if (JSON.parse(response).ReceiveNotificationResult == "True") {
        //              var saveOrderMessage = {
        //                  type: "success",
        //                  message: $translate.instant("P2P_Order_OrderApprovedSuccessfully"),
        //                  buttons: [{
        //                      "title": "OK",
        //                      "result": "YES"
        //                  }]
        //              }
        //              $scope.IsUsereligibleforApproveReject = false;
        //          }
        //          else {
        //              var saveOrderMessage = {
        //                  type: "error",
        //                  message: $translate.instant("P2P_Order_FailedinApprovingOrder"),
        //                  buttons: [{
        //                      "title": "OK",
        //                      "result": "YES"
        //                  }]
        //              }
        //          }
        //          hideLoader();
        //          notificationPopUp(saveOrderMessage);
        //          setTimeout(function () { window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl; }, 2500);
        //      }).catch(function (errorCallback) {
        //          var saveOrderMessage = {
        //              type: "error",
        //              message: errorCallback.statusText,
        //              buttons: [{
        //                  "title": "OK",
        //                  "result": "YES"
        //              }]
        //          }
        //          hideLoader(true);
        //          notificationPopUp(saveOrderMessage);
        //      });
        //  }
        //  else {
        //      var approvalOrderMessage = {
        //          type: "error",
        //          message: $translate.instant("P2P_Order_FailedinApprovingOrder"),
        //          buttons: [{
        //              "title": "OK",
        //              "result": "YES"
        //          }]
        //      }
        //      hideLoader();
        //      notificationPopUp(approvalOrderMessage);
        //  }
    }
    $scope.ShowCommonCommentPopup = function (KeyValue) {
        CommentsFlag = KeyValue;
        $scope.showComments = true;
    }
    $scope.onPostComment = function () {
        if (CommentsFlag != undefined && CommentsFlag != "" && CommentsFlag === "RejectOrder") {
            RejectOrder();
        }
        else if (CommentsFlag != undefined && CommentsFlag != "" && CommentsFlag === "RejectChangeRequest") {
            $scope.RejectChangeRequest();
        }
        else if (CommentsFlag != undefined && CommentsFlag != "" && CommentsFlag === "CloseOrder") {
            closeOrder();
        }
    }
    var RejectOrder = function () {
        showLoader();
        formatDataModel();
        var ApproverRejectService = httpService.directhttp({
            "url": RESTURLs.SM1_Controller_SendForApproveOrder + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&isApproved=false&documentTypeId=" + $scope.dataModel.orderData.type.id + "&LOBId=" + $scope.dataModel.orderData.documentLOB.entityDetailCode,
            "method": "GET",
            "timeout": 60000
        });
        ApproverRejectService.then(function (response) {
            console.log(response);
            if (JSON.parse(response).ReceiveNotificationResult == "True") {
                var saveOrderMessage = {
                    type: "success",
                    message: $translate.instant("P2P_Order_OrderRejectedSuccessfully"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                $scope.IsUsereligibleforApproveReject = false;
            }
            else {
                var saveOrderMessage = {
                    type: "error",
                    message: $translate.instant("P2P_Order_FailedinRejectingOrder"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
            }
            hideLoader();
            $scope.showComments = true;
            notificationPopUp(saveOrderMessage);
            setTimeout(function () { window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl; }, 2500);
        }).catch(function (errorCallback) {
            var saveOrderMessage = {
                type: "error",
                message: errorCallback.statusText,
                buttons: [{
                    "title": "OK",
                    "result": "YES"
                }]
            }
            hideLoader(true);
            notificationPopUp(saveOrderMessage);
        });
    }
    function checkUserActivity() {
        var flag = false;
        if (_.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.APPROVE_REJECT_ORDER) > -1) {
            var req = {
            };
            // formatDataModel();
            // req.method = 'GET';
            // req.url = RESTURLs.SM1_Controller_IsApprovalPendingForUser + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&wfDocTypeId=" + $scope.dataModel.orderData.type.id;
            // req.data = { "documentCode": $scope.dataModel.orderData.documentCode, "isApproved": true, "documentTypeId": 8, "LOBId": 0 };
            //req.headers = {
            //    "Content-Type": "application/json",
            //    "UserExecutionContext": JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails)
            //};
            var getUserActivity = httpService.directhttp({
                "url": RESTURLs.SM1_Controller_IsApprovalPendingForUser + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&wfDocTypeId=" + $scope.dataModel.orderData.type.id,
                "method": "GET",
                "timeout": 60000
            });
            getUserActivity.then(function (response) {
                console.log(response);
                if (JSON.parse(response).IsApprovalPendingForUserResult == true || JSON.parse(response).IsApprovalPendingForUserResult == false) {
                    flag = JSON.parse(response).IsApprovalPendingForUserResult;
                }
                else {
                    flag = false;
                }
                $scope.IsUsereligibleforApproveReject = flag;
            }).catch(function (errorCallback) {
                console.log(errorCallback.statusText);
            });
        }
        $scope.IsUsereligibleforApproveReject = flag;
    }

    $scope.SendToSupplier = function () {
        showLoader();
        formatDataModel();
        var dd = p2pDetailsService.getQueryStringValue("dd");
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var isFacilitateClient = isFacilitateToClient();
        if (isFacilitateClient != true) {
            var urls = RESTURLs.SM1_Controller_Send_to_Supplier + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&partnerCode=" + $scope.dataModel.orderData.partner.id + "&orderSource=" + $scope.dataModel.orderData.source.id + "&transmissionMode=" + $scope.dataModel.orderData.trasmission.id + "&transmissionValue=" + $scope.dataModel.orderData.trasmission.name + "&sourceSystemId=0&resent=false";
            var SendToSupplierService = httpService.directhttp({
                "url": urls,
                "method": "GET",
                "timeout": 60000
            });
        }
        else {
            var NewitemsArray = [];
            for (var i = 0; i < $scope.dataModel.orderData.items.length; i++) {
                var item = {}
                item["orderItemId"] = $scope.dataModel.orderData.items[i].id;
                item["estimatedDeliveryDate"] = convertDate($scope.dataModel.orderData.items[i].estimatedDeliveryDate);
                item["promisedDate"] = convertDate($scope.dataModel.orderData.items[i].promisedDate);
                NewitemsArray.push(item);
            }
            var urls = RESTURLs.SM1_Controller_Send_to_SupplierEstimatedAndPromiseDate + "?dd=" + dd + "&bpc=" + bpc;
            var SendToSupplierService = httpService.directhttp({
                "url": urls,
                "method": "POST",
                "timeout": 60000,
                "data": {
                    "oloc": 107,
                    "documentCode": $scope.dataModel.orderData.documentCode,
                    "partnerCode": $scope.dataModel.orderData.partner.id,
                    "orderSource": $scope.dataModel.orderData.source.id,
                    "transmissionMode": $scope.dataModel.orderData.trasmission.id,
                    "transmissionValue": $scope.dataModel.orderData.trasmission.name,
                    "sourceSystemId": 0,
                    "resent": false,
                    "estimatedDeliveryDate": NewitemsArray
                }
            });
        }
        SendToSupplierService.then(function (response) {
            console.log(response);
            if (response == true) {
                var responseMessage = {
                    type: "success",
                    message: $translate.instant("P2P_Order_OrderSenttoPartnerSuccessfully"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                notificationPopUp(responseMessage);
                setTimeout(function () {
                    window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                }, 2500);
            }
            else {
                var responseMessage = {
                    type: "error",
                    message: $translate.instant("P2P_Order_ErroroccuredwhileSendingOrdertoPartner"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                notificationPopUp(responseMessage);
            }
            hideLoader();

        }).catch(function (errorCallback) {
            var saveOrderMessage = {
                type: "error",
                message: errorCallback.statusText,
                buttons: [{
                    "title": "OK",
                    "result": "YES"
                }]
            }
            hideLoader(true);
            notificationPopUp(saveOrderMessage);
        });
    }
    
    $scope.ReSendToSupplier = function () {
        showLoader();
        formatDataModel();
        var dd = p2pDetailsService.getQueryStringValue("dd");
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        //var urls = RESTURLs.SM1_Controller_Send_to_Supplier + "&bpc=" + bpc + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&partnerCode=" + $scope.dataModel.orderData.partner.id + "&orderSource=" + $scope.dataModel.orderData.source.id + "&transmissionMode=" + $scope.dataModel.orderData.TransmissionMode + "&transmissionValue=" + $scope.dataModel.orderData.TransmissionValue + "&sourceSystemId=0&resent=" + $scope.IsResendToSupplier;
        var urls = RESTURLs.SM1_Controller_Send_to_Supplier + "&bpc=" + bpc + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&partnerCode=" + $scope.dataModel.orderData.partner.id + "&orderSource=" + $scope.dataModel.orderData.source.id + "&transmissionMode=" + $scope.dataModel.orderData.TransmissionMode + "&transmissionValue=" + $scope.dataModel.orderData.TransmissionValue + "&sourceSystemId=0&resent=" + $scope.IsResendToSupplier;
        var SendToSupplierService = httpService.directhttp({
            "url": urls,
            "method": "GET",
            "timeout": 60000
        });


        SendToSupplierService.then(function (response) {
            console.log(response);           
            if (response == true) {
                var responseMessage = {
                    type: "success",
                    message: $translate.instant("P2P_Order_OrderSenttoPartnerSuccessfully"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                notificationPopUp(responseMessage);
                setTimeout(function () {
                    window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                }, 2500);
            }
            else {
                var responseMessage = {
                    type: "error",
                    message: $translate.instant("P2P_Order_ErroroccuredwhileSendingOrdertoPartner"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                notificationPopUp(responseMessage);
            }
            hideLoader();

        }).catch(function (errorCallback) {
            var saveOrderMessage = {
                type: "error",
                message: errorCallback.statusText,
                buttons: [{
                    "title": "OK",
                    "result": "YES"
                }]
            }
            hideLoader(true);
            notificationPopUp(saveOrderMessage);
        });
    }

    /*  $scope.onProgramchange = function (e, uiElementobj) {
          var programValue = e.data[0].value;
          var entityDetailCodes = $scope.dataModel.orderData.headerEntity1.id;
          var documentCode = $scope.dataModel.orderData.documentCode;
          var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
          var url = RESTURLs.SM1_Controller_GetProgramDetails + "bpc=" + bpc + "&term=" + programValue + "&entitydetailcodes=" + entityDetailCodes + "&documentcode=" + documentCode;
          var successFunc = function (obj) {
              uiElementobj.attributes.options = obj.map(function (program) {
                  return { "name": program.ProgramName, "id": program.ProgramId };
              });
          }
          var inputObject = { "url": url };
          getAutoSuggestData(inputObject, successFunc);
      }*/

    $scope.onDepartmentChange = function (e, uiElementobj) {
        var _IsHeaderLevelEntityBU = APPCONSTANTS.userPreferences.IsHeaderLevelEntityBU;
        var url = RESTURLs.SM1_Controller_HeaderLevelEntity;
        var entityTypeId = $scope.dataModel.orderData.headerEntity1.entityType;
        var parentEntityCode = 0;
        var term = e.data[0].value;
        var preferenceLOBType = APPCONSTANTS.preferenceLOBType.Serve;
        var LOBEntityDetailCode = APPCONSTANTS.lobEntityDetailCode; //DocumentLob
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var headerEntityId = $scope.dataModel.orderData.headerEntity1.headerEntityId;
        if (_IsHeaderLevelEntityBU) {
            url = RESTURLs.SM1_Controller_GetUserMappedEntities;
        }
        url = url + "bpc=" + bpc + "&term=" + term + "&entityTypeId=" + entityTypeId + "&parentEntityCode=" + parentEntityCode + "&preferenceLOBType=" + preferenceLOBType + "&LOBEntityDetailCode=" + LOBEntityDetailCode;
        var successFunc = function (obj) {
            uiElementobj.attributes.options = obj.map(function (options) {
                return {
                    "name": options.Description, "id": options.OrgEntityCode, "entityType": options.EntityId, "headerEntityId": headerEntityId, "entityCode": options.EntityCode
                };
            });
        }
        var inputObject = {
            "url": url
        };
        getAutoSuggestData(inputObject, successFunc);
    }


    //Currency
    $scope.onCurrencyChange = function (e, uiElementobj) {
        var currencyValue = e.data[0].value;
        if (currencyValue.trim().length === 0) {
            $scope.dataModel.orderData.currency = { 'code': '', 'name': '' };
        }
        var url = PLATFORMURLs.getAllCurrency + "?oloc=107" + "&term=" + currencyValue;
        var successFunc = function (obj) {
            uiElementobj.attributes.options = obj.map(function (currency) {
                return {
                    "name": currency.CurrencyCode, "code": currency.CurrencyCode
                };
            });
        }
        var inputObject = {
            "url": url
        };
        getAutoSuggestData(inputObject, successFunc);
    }

    //PaymentTerms
    $scope.onPaymentTermschange = function (e, uiElementobj) {
        var paymentValue = e.data[0].value;
        if (paymentValue.trim().length === 0) {
            $scope.dataModel.orderData.paymentTerms = { 'id': 0, 'name': '' };
        }
        var entityDetailCode = ($scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[$scope.commonSettings.EntityMappedToPaymentTerms]] != undefined) ? $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[$scope.commonSettings.EntityMappedToPaymentTerms]].id : 0;
        var partnerCode =  ($scope.dataModel.orderData.partner != undefined && $scope.dataModel.orderData.partner != null && $scope.dataModel.orderData.partner != "") ?$scope.dataModel.orderData.partner.id: 0;
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var ACECode = $scope.dataModel.orderData.headerEntity1 != null ? $scope.dataModel.orderData.headerEntity1.id : 0;
        var LOBDetailCode = APPCONSTANTS.lobEntityDetailCode;
        var url = RESTURLs.SM1_Controller_GetPaymentTerms + "&bpc=" + bpc + "&term=" + paymentValue + "&entityDetailCode=" + entityDetailCode + "&partnerCode=" + partnerCode + "&pageIndex=0&pageSize=10" + "&ACEEntityDetailCode=" + ACECode + "&LOBEntityDetailCode=" + LOBDetailCode;

        var successFunc = function (obj) {
            uiElementobj.attributes.options = obj.map(function (paymentTerms) {
                return {
                    "name": paymentTerms.PaymentTermName, "id": paymentTerms.PaymentTermId
                };
            });
        }
        var inputObject = {
            "url": url
        };
        getAutoSuggestData(inputObject, successFunc);
    }

    //LOB//GroupCompany//BusinessUnit
    $scope.previousHeaderEntity = {};
    //APPCONSTANTS.userPreferences.contactOrgMappedActivities.ContactCode = 59540040000077;
    //APPCONSTANTS.userPreferences.contactOrgMappedActivities.LobDetails = [{ "LOBId": 2545, "PreferenceLOBType": 2, "PersonaCode": 0, "ISLobLevelActivity": true, "EntityID": 1, "EntityDisplayName": "Legal Entity - 66", "ActivityCode": [10700004], "OrgActivities": [{ "OrgEntityCode": 2308, "PersonaCode": 1233, "EntityDisplayName": "Legal Entity - 66", "EntityID": 10, "ActivityCode": [10700004] }] }, { "LOBId": 2207, "PreferenceLOBType": 2, "PersonaCode": 1233, "ISLobLevelActivity": true, "EntityID": 1, "EntityDisplayName": "Organization - 1", "ActivityCode": [10700004], "OrgActivities": [{ "OrgEntityCode": 2308, "PersonaCode": 1233, "EntityDisplayName": "Legal Entity - 66", "EntityID": 10, "ActivityCode": [10700004] }, { "OrgEntityCode": 2309, "PersonaCode": 1233, "EntityDisplayName": "Legal Entity - 67", "EntityID": 10, "ActivityCode": [10700004] }] }];
    $scope.headerEntityOnChange = function (e, entityId, uiElementobj) {
        // var LobActivities = _.find(APPCONSTANTS.userPreferences.contactOrgMappedActivities.LobDetails, { LOBId: $scope.dataModel.orderData.documentLOB.entityDetailCode })

        //if LOB is also editable then get only LOB details

        var entityValue = e.data[0].value;
        if (entityValue.trim().length === 0 && entityId === 3) {
            $scope.dataModel.orderData.headerEntity1 = { 'entityType': 0, 'name': '', 'id': 0, 'entityCode': '', 'entityTypeId': 0 };
        }
        if (entityValue.trim().length === 0 && entityId === 4) {
            $scope.dataModel.orderData.headerEntity2 = { 'entityType': 0, 'name': '', 'id': 0, 'entityCode': '', 'entityTypeId': 0 };
        }
        if (entityValue.trim().length === 0 && entityId === 7) {
            $scope.dataModel.orderData.headerEntity3 = { 'entityType': 0, 'name': '', 'id': 0, 'entityCode': '', 'entityTypeId': 0 };
        }

        if (APPCONSTANTS.userPreferences.contactOrgMappedActivities != null && APPCONSTANTS.userPreferences.contactOrgMappedActivities != undefined && isEntityConfiguredForFBU(entityId)) {
            if (entityId == $scope.dataModel.orderData.documentLOB.entityId) {
                if (LobActivities && LobActivities != null) {
                    var ParentLobActivties = _.filter((_.where(LobActivities, { EntityId: entityId })), function (entity) { return _.contains(entity.ActivityCode, parseInt(APPCONSTANTS.userActivityStatus.CREATE_ORDER)) && entity.EntityDisplayName.indexOf(e.data[0].value) > -1 });
                    uiElementobj.attributes.options = ParentLobActivties.map(function (option) {
                        return { "entityType": option.EntityID, "name": option.EntityDisplayName, "id": option.LOBId, "entityCode": option.LOBId, "entityTypeId": option.EntityID };
                    });
                }
            }
            else if (LobActivities && LobActivities != null) {
                // && _.find(APPCONSTANTS.userPreferences.contactOrgMappedActivities.LobDetails, { LOBId: $scope.dataModel.orderData.documentLOB.entityDetailCode }).ISLobLevelActivity
                var childActivties = _.filter((_.where(LobActivities.OrgActivities, { EntityId: entityId })), function (entity) { return _.contains(entity.ActivityCode, parseInt(APPCONSTANTS.userActivityStatus.CREATE_ORDER)) && entity.EntityDisplayName.indexOf(e.data[0].value) > -1 });
                uiElementobj.attributes.options = childActivties.map(function (option) {
                    return { "entityType": option.EntityID, "name": option.EntityDisplayName, "id": option.OrgEntityCode, "entityCode": option.EntityCode, "entityTypeId": option.EntityID };
                });
            }
        }
        else {
            var term = e.data ? e.data[0].value : $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[entityId]].name;
            $scope.previousHeaderEntity = $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[entityId]];
            var url = RESTURLs.SM1_Controller_HeaderLevelEntity;
            var headerEntityChangeSuccessFunc = function (data) {
                uiElementobj.attributes.options = data.map(function (option) {
                    return { "entityType": option.EntityId, "name": option.DisplayName, "id": option.OrgEntityCode, "entityCode": option.EntityCode, "entityTypeId": 8 };
                });
            }
            var parentItem = _.find(APPCONSTANTS.defaultSplitValues, { EntityTypeId: entityId });
            var parentEntityCode = 0;
            if (parentItem != undefined) {
                if ($scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[parentItem.ParentSplitAccountingFieldId]])
                    parentEntityCode = $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[parentItem.ParentSplitAccountingFieldId]].id;
            }
            var inputObject = { "url": url };
            inputObject.params = {
                entityTypeId: entityId,
                parentEntityCode: parentEntityCode,
                preferenceLOBType: APPCONSTANTS.preferenceLOBType.Serve,
                oloc: "107",
                term: term,
                LOBEntityDetailCode: getLOBEntityDetailCode()
            };
            getAutoSuggestData(inputObject, headerEntityChangeSuccessFunc);
        }

    }
    //SupplierName
    $scope.onSupplierNameChange = function (e, uiElementobj) {
        if (e.data[0].value.trim().length === 0) {
            $scope.dataModel.orderData.partner = { 'id': 0, 'name': '' };
            $scope.dataModel.orderData.clientPartnerCode = '';
            $scope.dataModel.orderData.partnerContact = {
                "id": 0, "name": "", "email": "", "fax": ""
            };
            $scope.dataModel.orderData.orderingLocation = {
                "id": 0, "name": "", "address": ""
            };
            ResetRemittoLocation();
        }

        var supplierName = e.data ? e.data[0].value : $scope.dataModel.orderData.partner.name;
        var url = RESTURLs.SM1_Controller_GetSupplierDetailsByURL;
        var suppliersuccessFunc = function (partnerNames) {
            var options = [];
            options = partnerNames.map(function (partner) {
                return {
                    "name": partner.value, "id": partner.PartnerCode, "clientCode": partner.ClientPartnerCode, "displayName": partner.PartnerName, "transmissionValue": partner.TransmissionName
                };

            });
            if (typeof uiElementobj === 'function') {
                uiElementobj(options);
            } else {
                uiElementobj.attributes.options = options;
            }
        }
        var inputObject = {
            "url": url
        };
        inputObject.params = {
            partnerStatus: $scope.commonSettings["PartnerStatuses"],
            buList: "",
            partnerDisplayFormat: "1",
            partnerRelationshipTypesToBeRestricted: "",
            oloc: "107",
            term: supplierName,
            LOBEntityDetailCode: getLOBEntityDetailCode()
        };
        getAutoSuggestData(inputObject, suppliersuccessFunc);

    };

    $scope.onSupplierContactChange = function (e, uiElementobj) {
        if (e.data[0].value.trim().length === 0) {
            $scope.dataModel.orderData.partnerContact = { 'address': '', 'email': '', 'fax': null, 'id': 0, 'name': '', 'phone': '' };
        }
    }

    $scope.onPurchaseTypeChange = function (e, uiElementobj) {
        GetCustomAttrFormService(e.purchaseType.id).then(function (response) {
            var questionSetCodesForItem;

            angular.forEach(response, function (el, index) {
                switch (el.Key) {
                    // Header
                    case 1:
                        getTabDetailsByFormId(el.Value).then(function (response) {
                            $scope.dataModel.orderData.CustomAttrQuestionSetCodesForHeader = getQuestionnaires(response);
                        });
                        break;

                        // Item
                    case 2:
                        getTabDetailsByFormId(el.Value).then(function (response) {
                            questionSetCodesForItem = getQuestionnaires(response);
                            $scope.dataModel.orderData.CustomAttrQuestionSetCodesForItem = questionSetCodesForItem;

                            angular.forEach($scope.dataModel.orderData.items, function (item, i) {
                                item.CustomAttrQuestionSetCodesForItem = questionSetCodesForItem;
                                item.ListQuestionResponse = null;
                            });
                        });
                        break;
                }
            });
        });

        var purchaseTypeConfirmConfig = {

            type: "confirm",
            message: "<p class='left-align'>" + $translate.instant("P2P_PO_PurchaseTypeChange") + "</p>",
            //checkMessage: "Do not show again",
            buttons: [
            { "title": "YES", "result": "yes" },
            { "title": "NO", "result": "no" }
            ]
        }
        notification.notify(purchaseTypeConfirmConfig, function (response, uiElementobj) {
            if (response.result === "yes") {
                purchaseTypeActionConfirm();
            }
            else {

                var obj = {};
                obj["id"] = purchaseType.id;
                obj["name"] = purchaseType.name;
                $scope.dataModel.orderData.purchaseType = obj;
                $scope.dataModel.orderData.purchaseType = purchaseType;
                getPurchaseTypeOptions(purchaseOptionsUIObj);
            }
        });
    };

    function GetCustomAttrFormService(purchaseTypeId) {
        var inputObject = {
            "url": RESTURLs.SM1_Controller_GetCustomAttrFormId,
        };
        inputObject.params = {
            "oloc": "107",
            "docType": $scope.dataModel.orderData.type.id,
            "purchaseTypeId": purchaseTypeId,
            "documentCode": $scope.documentData.orderData.documentCode
        };
        var req = {};
        req.method = "GET";
        angular.extend(req, inputObject);
        return httpService.directhttp(req);
    }

    function getTabDetailsByFormId(formId) {
        var inputObject = {
            "url": RESTURLs.SM1_Controller_GetTabDetails,
        };
        inputObject.params = {
            "oloc": "107",
            "formId": formId
        };
        var req = {};
        req.method = "GET";
        angular.extend(req, inputObject);
        return httpService.directhttp(req);
    }

    function getQuestionnaires(tabDetails) {
        var questionSetCodes = [];
        for (var i = 0; i < tabDetails.length; i++) {
            for (var j = 0; j < tabDetails[i].Questionaries.length; j++) {
                questionSetCodes.push({
                    id: tabDetails[i].Questionaries[j].QuestionnaireCode,
                    name: tabDetails[i].Questionaries[j].QuestionnaireTitle
                });
            }
        }

        return questionSetCodes;
    }

    function purchaseTypeActionConfirm() {
        var previousPurchaseItemTypes = [];
        if (purchaseType != undefined) {
            previousPurchaseItemTypes = _.where(purchaseTypesWithMappings.lstpurchaseTypesWithMappings, {
                PurchaseTypeId: purchaseType.id
            });
        }
        purchaseType = $scope.dataModel.orderData.purchaseType;
        $scope.dataModel.orderData.purchaseType = purchaseType;
        var itemTypes = getItemTypes();
        var itemTypeIds = [];
        $scope.lineTypes = itemTypes;
        $rootScope.$broadcast('lineTypes', { lineTypes: $scope.lineTypes });
        for (var index in itemTypes) {
            itemTypeIds.push(itemTypes[index].id);
        }
        for (var j = 0; j < itemTypes.length; j++) {
            var itemsCount = $scope.dataModel.orderData.items.length;
            for (var i = itemsCount - 1; i >= 0; i--) {
                var obj = $scope.dataModel.orderData.items[i];
                if (_.contains(itemTypeIds, obj.type.id)) {
                    $scope.dataModel.orderData.items[i].isDeleted = false;
                }
                else {
                    obj.isDeleted = true;
                    delArrayLine.push(obj)
                    $scope.dataModel.orderData.items.splice(i, 1);
                }
            }
        }

        //Displaying Charge Section
        checkPurchaseTypeForCharge();


        $rootScope.$broadcast('updateGrid', {});
        p2pDetailsService.triggerValidations();
    }

    function intersectArray(array1, array2) {
        var intersectValue = [];
        for (var i = 0; i < array1.length; i++) {
            for (var j = 0; j < array2.length; j++) {
                if (JSON.stringify(array1[i]) == JSON.stringify(array2[j]))
                    intersectValue.push(array1[i]);
            }
        }
        return intersectValue;

    }

    function checkPurchaseTypeForCharge() {
        var purchaseTypeMappingForChargeList = _clientSpecificConfigSettings.header.MappingPurchaseTypeListForCharge;

        if (purchaseTypeMappingForChargeList.indexOf($scope.dataModel.orderData.purchaseType.id) !== -1) {
            appendChargeForHeaderSubSectionToConfiguration();
            p2pDetailsService.toggleSublineChargeTab(true);
        }
        else {
            removeChargeForheaderSubSectionFromConfiguration();
            p2pDetailsService.toggleSublineChargeTab(false);
        }

    }

    function appendChargeForHeaderSubSectionToConfiguration() {

        var chargeSectionExist = false;
        angular.forEach(_clientSpecificConfigSettings.header.sections, function (section, index) {
            if (section.label == "P2P_PO_ChargeForHeader_SectionLabel") {
                chargeSectionExist = true;
            }
        });
        if (chargeSectionExist == false) {


            var chargeForHeaderSubSectionConfigSection = {
                "label": "P2P_PO_ChargeForHeader_SectionLabel",
                "isMandatory": true,
                "isCollapsible": true,
                "isShown": ["0_1", "0_23", "0_22", "0_24", "0_41", "0_142", "0_25", "0_42", "0_59", "0_169", "0_21", "0_121", "1_25", "1_41", "1_142", "0_1_4", "1_42_6", "1_1_6", "0_1_5"],
                "rows": [{
                    "properties": [{
                        "colspan": 6,
                        "type": "subsection",
                        "isMandatory": true,
                        "data": "orderData.ItemChargesForHeader",
                        "templateUrl": "p2p/shared/views/commonComposedGridForChargeForHeader.html"
                    }
                    ]
                }
                ],
                "isDraggable": true
            };
            var chargeForHeaderSubSectionIndex = _clientSpecificConfigSettings.header.sections.length - 1;
            _clientSpecificConfigSettings.header.sections.splice(chargeForHeaderSubSectionIndex, 0, chargeForHeaderSubSectionConfigSection);
        }

    }

    function removeChargeForheaderSubSectionFromConfiguration() {
        angular.forEach(_clientSpecificConfigSettings.header.sections, function (section, index) {
            if (section.label == "P2P_PO_ChargeForHeader_SectionLabel") {
                _clientSpecificConfigSettings.header.sections.splice(index, 1);
            }
        });
    }


    //OrderContact 
    $scope.onOrderContactChange = function (e, uiElementobj) {
        var orderValue = e.data[0].value;
        var entityDetailCodes = $scope.dataModel.orderData.headerEntity1.id;
        var orderSource = $scope.dataModel.orderData.source.id;
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var url = RESTURLs.SM1_Controller_GetAllOrderContact + "&bpc=" + bpc + "&term=" + orderValue + "&entityDetailCode=" + entityDetailCodes + "&orderSource=" + orderSource;
        var successFunc = function (obj) {
            uiElementobj.attributes.options = obj.map(function (options) {
                return {
                    "name": options.FirstName + " " + options.LastName, "id": options.ContactCode, "email": options.FirstName + " " + options.LastName + '<br/>' + options.EmailAddress
                };
            });
        }
        var inputObject = {
            "url": url
        };
        getAutoSuggestData(inputObject, successFunc);
    }
    //Deliver to
    //$scope.onDeliverToChangeCase = function (e, uiElementobj) {
    //    var deliverValue = e.data[0].value;
    //    var shiptoLocId = $scope.dataModel.orderData.shipTo.id;
    //    var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
    //    var url = RESTURLs.SM1_Controller_GetAllDeliverDetails + "&bpc=" + bpc + "&term=" + deliverValue + "&shiptoLocId=" + shiptoLocId;
    //    var successFunc = function (obj) {
    //        uiElementobj.attributes.options = obj.map(function (deliverTo) {
    //            return { "name": deliverTo.Value, "id": deliverTo.Key };
    //        });
    //    }
    //    var inputObject = { "url": url };

    //    getAutoSuggestData(inputObject, successFunc);
    //}
    //FOB
    $scope.onFOBChangeCase = function (e, uiElementobj) {
        var fobValue = e.data[0].value;
        if (fobValue.trim().length === 0) {
            $scope.dataModel.orderData.fobDetails.FOB = { 'code': '', 'desc': '', 'id': 0 };
        }
        var divisionEntityCode = APPCONSTANTS.lobEntityDetailCode;
        var entityId = $scope.dataModel.orderData.headerEntity1.entityType;
        var entityDetailCode = $scope.dataModel.orderData.headerEntity1.id;
        switch (uiElementobj.label) {
            case "P2P_PO_FOB":
                var url = RESTURLs.SM1_Controller_GetAllFOBCodes + "&bpc=" + bpc + "&term=" + fobValue + "&DivisionEntityCode=" + divisionEntityCode + "&EntityId=" + entityId + "&EntityDetailCode=" + entityDetailCode;
                break;
            case "P2P_PO_FrieghtTerms":
                var url = RESTURLs.SM1_Controller_GetAllFreightTerms + "&bpc=" + bpc + "&term=" + fobValue + "&DivisionEntityCode=" + divisionEntityCode + "&EntityId=" + entityId + "&EntityDetailCode=" + entityDetailCode;
                break;
            case "P2P_PO_Carriers":
                var url = RESTURLs.SM1_Controller_GetAllCarriers + "&bpc=" + bpc + "&term=" + fobValue + "&DivisionEntityCode=" + divisionEntityCode + "&EntityId=" + entityId + "&EntityDetailCode=" + entityDetailCode;
                break;
            case "P2P_PO_FOBLocation":
                var url = RESTURLs.SM1_Controller_GetAllFOBLocations + "&bpc=" + bpc + "&term=" + fobValue + "&DivisionEntityCode=" + divisionEntityCode + "&EntityId=" + entityId + "&EntityDetailCode=" + entityDetailCode;
                break;
            case "P2P_PO_TransitType":
                var url = RESTURLs.SM1_Controller_GetAllTransitType + "&bpc=" + bpc + "&term=" + fobValue + "&DivisionEntityCode=" + divisionEntityCode + "&EntityId=" + entityId + "&EntityDetailCode=" + entityDetailCode;
                break;
        }
        var successFunc = function (obj) {
            uiElementobj.attributes.options = obj.map(function (fob) {
                return {
                    "desc": fob.Description, "id": fob.Id
                };
            });
        }
        var inputObject = {
            "url": url
        };
        getAutoSuggestData(inputObject, successFunc);
    }



    $scope.onOrderingLocationChange = function (e, uiElementobj) {
        if (e.data[0].value.trim().length === 0) {
            $scope.dataModel.orderData.orderingLocation = { 'name': '', 'id': 0, 'address': '' };
        }
        //ordering location for autosuggest
        if (currorderingLocation.length > 0) {
            uiElementobj.attributes.options = currorderingLocation;
            uiElementobj.attributes.readonly = false;
        } else {
            uiElementobj.attributes.readonly = false;
        }
    }
    $scope.onOrderingLocationSelected = function (e, uiElementobj) {
        getPartnerContactsByPartnerCodeandOrderingLocation();
        ResetRemittoLocation();
        bindDefaultRemitToLocation();
    }
    $scope.onSupplierNameSelected = function (e, uiElemenetobj) {
        $scope.dataModel.orderData.clientPartnerCode = $scope.dataModel.orderData.partner.clientCode;
        $scope.dataModel.orderData.partnerContact = {
            "id": 0, "name": "", "email": "", "fax": ""
        };
        // Get ordering locations by parner Code
        getOrderingLocationByPartnerCode(true);
        //Get Payment Terms by Partner Code 
        getPaymentTermsById();
        //isIntegratedPartner();
        ResetRemittoLocation();
        isIntegratedPartner();        
    }

    $scope.onSupplierContactSelected = function (e, uiElementobj) {
        console.log($scope.dataModel.orderData);
    }

    if (typeof document != 'undefined') {

        // $scope.dataModel = { "orderData": document.orderData };

        checkDefaultValues();
        
        isIntegratedPartner();        
        if ($scope.dataModel.orderData.status.id == 1 || $scope.dataModel.orderData.status.id == 23 || $scope.dataModel.orderData.status.id == 24) {
            if ($scope.dataModel.orderData.orderSource != 5 && $scope.dataModel.orderData.orderSource != 6 && $scope.dataModel.orderData.orderSource != 10) {
                updatePromiseddDate();
            }
        }
        if ($scope.dataModel.orderData.matchType != null) {
            $scope.dataModel.orderData.matchType['key'] = $translate.instant($scope.dataModel.orderData.matchType.name);
        }
        if ($scope.dataModel.orderData.status.id == 21) {
            checkUserActivity();
        }
        if ($scope.dataModel.orderData.documentLOB) {
            APPCONSTANTS.lobEntityDetailCode = $scope.dataModel.orderData.documentLOB.entityDetailCode;
        }
        else {
            APPCONSTANTS.lobEntityDetailCode = 0;
        }
        DisplayingDispathMode();
      
      
        
        p2pDetailsService.setDataModel($scope.dataModel);
        p2pValidationService.setDocumentSource($scope.dataModel.orderData.source);
        p2pValidationService.setDocumentStatus($scope.dataModel.orderData.status.id);

        if ($scope.dataModel.orderData.items) {
            $scope.dataModel.orderData.items.forEach(function (x, index, array) {
                x.splitIndex = x.lineNumber;
                if (x.ItemChargesForSubLine != undefined && x.ItemChargesForSubLine != null) {
                    x.ItemChargesForSubLine.forEach(function (item, i) {
                        if (item.splits == null || item.splits.length == 0) {
                            item.splits = [];
                            item.splits.push(p2pDetailsService.getSplitItem(0));
                        }
                    });
                    p2pDetailsService.checkAndCorrectChargeLineNumber(x);
                }
            });
        }

        //if ($scope.dataModel.orderData.partner && $scope.dataModel.orderData.partner.id != null && $scope.dataModel.orderData.partner.id != undefined)
        //    isIntegratedPartner();
        if ($scope.dataModel.orderData.headerEntity1 == null) {
            for (var i = 0 ; i < APPCONSTANTS.userPreferences.HeaderEntities.length; i++) {
                if (P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].DEFAULT_HEADER_ENTITIES[APPCONSTANTS.userPreferences.HeaderEntities[i].EntityId]) {
                    var headerEntityNum = P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].DEFAULT_HEADER_ENTITIES[APPCONSTANTS.userPreferences.HeaderEntities[i].EntityId];
                    $scope.dataModel.orderData[headerEntityNum] = {};
                    $scope.dataModel.orderData[headerEntityNum].entityCode = APPCONSTANTS.userPreferences.HeaderEntities[i].EntityCode;
                    $scope.dataModel.orderData[headerEntityNum].entityType = APPCONSTANTS.userPreferences.HeaderEntities[i].EntityId;
                    $scope.dataModel.orderData[headerEntityNum].headerEntityId = 0;
                    $scope.dataModel.orderData[headerEntityNum].id = APPCONSTANTS.userPreferences.HeaderEntities[i].EntityDetailCode;
                    $scope.dataModel.orderData[headerEntityNum].name = APPCONSTANTS.userPreferences.HeaderEntities[i].EntityDisplayName;
                }
            }
        }
        if ($scope.dataModel.orderData.source.id == 10) {
            OldOrderData = angular.copy($scope.dataModel);
            $scope.dataModel.orderData.ChangeOrderType = { "id": 2, "name": "Internal" };
            $scope.dataModel.orderData.ChangeOrderType.id = 2;
        }
        else if ($scope.dataModel.orderData.source.id == 5) {
            OldOrderData = angular.copy($scope.dataModel);
            $scope.dataModel.orderData.ChangeOrderType = { "id": 1, "name": "External" };
            $scope.dataModel.orderData.ChangeOrderType.id = 1;

        }


        // Get ordering locations by parner Code
        var IsDefault = true;
        if ($scope.dataModel.orderData.partner && $scope.dataModel.orderData.partner.id) {        
            if($scope.dataModel.orderData.orderingLocation != undefined && $scope.dataModel.orderData.orderingLocation.id > 0 )    
                IsDefault =  false;          
            else
                IsDefault = true;

            getOrderingLocationByPartnerCode(IsDefault);

            if ($scope.dataModel.orderData.paymentTerms == null || $scope.dataModel.orderData.paymentTerms.id == 0 || $scope.dataModel.orderData.paymentTerms.id == undefined)
            getPaymentTermsById();
        }
        // hide custom attributes if code list is empty or orderSource is 9
        var customAttributesHeaderSection;
        var customAttributesHeaderSectionIndex;
        angular.forEach(_clientSpecificConfigSettings.header.sections, function (section, index) {
            if (section.label == 'P2P_PO_AdditionalInformation') {
                customAttributesHeaderSection = section;
                customAttributesHeaderSectionIndex = index;
            }
        });

        if (customAttributesHeaderSection != undefined) {
            if (!$scope.dataModel.orderData.CustomAttrQuestionSetCodesForHeader ||
                    !$scope.dataModel.orderData.CustomAttrQuestionSetCodesForHeader.length ||
                    $scope.dataModel.orderData.source && $scope.dataModel.orderData.source.id == 9) {
                _clientSpecificConfigSettings.header.sections.splice(customAttributesHeaderSectionIndex, 1);
            }
            else {
                $scope.dataModel.orderData.IsCustomAttributesHeaderReadOnly = p2pValidationService.isReadOnly(customAttributesHeaderSection);
            }
        }

        //angular.forEach(_clientSpecificConfigSettings.header.sections, function (section, index) {
        //    if (section.label == 'P2P_PO_AdditionalInformation') {
        //        _clientSpecificConfigSettings.header.sections.splice(index, 1);

        //activities mapped to a client;
        var userFBUActivities = configClientConstants.activities ? configClientConstants.activities : [10700004, 10700010, 21600004, 10700005];
        $scope.showSubmit = APPCONSTANTS.userPreferences.contactOrgMappedActivities != null ? false : true;
        $scope.showManageApprovalsFBU = APPCONSTANTS.userPreferences.contactOrgMappedActivities != null ? false : true;
        $scope.changeCancelOrder = APPCONSTANTS.userPreferences.contactOrgMappedActivities != null || !$scope.changeCancelOrder ?  false : true;
        //CHANGE_CANCEL_ORDER
        function assignFBUBasedActions(activities) {
            if (!_.contains(activities, parseInt(APPCONSTANTS.userActivityStatus.CREATE_ORDER)) || !_.contains(activities, parseInt(APPCONSTANTS.userActivityStatus.VIEW_ORDER)))
            {
                //redirect user to landing page
                window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
            }


            if (_.contains(activities, parseInt(APPCONSTANTS.userActivityStatus.CHANGE_CANCEL_ORDER)))
                $scope.changeCancelOrder = true;
            else
                $scope.changeCancelOrder = false;
            if (_.contains(activities, parseInt(APPCONSTANTS.userActivityStatus.CREATE_INVOICE)))
                $scope.createInvoice = true;
            else
                $scope.createInvoice = false;
            if (_.contains(activities, parseInt(APPCONSTANTS.userActivityStatus.ACTIVITY_FOR_MANAGE_APPROVALS)))
                $scope.showManageApprovalsFBU = true;
            else
                $scope.showManageApprovalsFBU = false;
            if (_.contains(activities, parseInt(APPCONSTANTS.userActivityStatus.SUBMIT_ORDER_TO_PARTNER)))
                $scope.showSubmit = true;
            else
                $scope.showSubmit = false;            
            var allowResentToPartner=_.find(APPCONSTANTS.userPreferences.DocumentSettings.lstSettings, { "FieldName": "AllowResentToPartner" });
            if(allowResentToPartner!=null && allowResentToPartner.FieldValue=="True")
            {
                if ((_.contains(activities, parseInt(APPCONSTANTS.userActivityStatus.ALLOW_RESEND_ORDER_TO_SUPPLIER)) && !$scope.IsSupplier)
                                  && ($scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.PartnerAcknowledged || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.SubmittedToPartner
                                    || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.SendingInProgress
                                    || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.SendingToPartnerFailed
                                    )) {
                    $scope.IsResendToSupplier = true;
                }
                else {
                    $scope.IsResendToSupplier = false;
                }
}
      }    

        var checkFBUActivity = function (entityTypeId, IsLOB) {
            try{
                var userActivities = userFBUActivities;
                var orgActivities = APPCONSTANTS.userPreferences.contactOrgMappedActivities.ActivityCode;
                var selectedLOB;

                var orgUserActivities = orgActivities.filter(function (obj) { return userActivities.indexOf(obj) > -1; });
                if (orgUserActivities != null && orgUserActivities.length > 0 && userActivities.length == orgUserActivities.length) {
                    //to do user has activity at rootlevel
                    assignFBUBasedActions(orgUserActivities);
                    return true;
                }
                else {
                    selectedLOB = _.find(APPCONSTANTS.userPreferences.contactOrgMappedActivities.LobDetails, { LOBId: $scope.dataModel.orderData.documentLOB.entityDetailCode, PreferenceLOBType :1});
                    if (selectedLOB != null && selectedLOB != undefined) {
                        var lobActivities = selectedLOB.ActivityCode;
                        var lobUserActivities = lobActivities != null ? lobActivities.filter(function (obj) { return userActivities.indexOf(obj) > -1; }) : [];
                        if (lobUserActivities != null && lobUserActivities.length > 0) {
                            //to do user has activity at loblevel
                            if (userActivities.length == lobUserActivities.length) {
                                assignFBUBasedActions(lobUserActivities);
                                return true;
                            }
                            else {
                                lobUserActivities = orgUserActivities != null && orgUserActivities.length > 0 ? _.union(orgUserActivities, lobUserActivities) : lobUserActivities;
                            }

                        }
                        else {
                            if (!IsLOB) {


                                if (entityTypeId == undefined) {
                                    //get activities for all header entities
                                    var headerEntities = clientConstants.DEFAULT_HEADER_ENTITIES;
                                    var headerEntityActivities
                                    if (headerEntities != null) {
                                        for (var ent in headerEntities) {
                                            var headerEnt = $scope.dataModel.orderData[headerEntities[ent]];
                                            var orgMappedEntity = _.find(selectedLOB.OrgActivities, {
                                                OrgEntityCode: headerEnt.id
                                            });
                                            if (orgMappedEntity != undefined && orgMappedEntity != null) {
                                                var orgMappedActivities = orgMappedEntity.ActivityCode;
                                                var orgMappedUserActivities = orgMappedActivities != null ? orgMappedActivities.filter(function (obj) { return userActivities.indexOf(obj) > -1 }) : [];
                                                if (orgMappedUserActivities != null && orgMappedUserActivities.length > 0) {
                                                    headerEntityActivities = _.union(headerEntityActivities, orgMappedUserActivities);
                                                }
                                            }


                                        }
                                    }

                                    if (headerEntityActivities != undefined && headerEntityActivities != null && headerEntityActivities.length > 0) {
                                        if (orgUserActivities != null && lobUserActivities != null && userActivities.length != headerEntityActivities.length) {
                                            headerEntityActivities = _.union(orgUserActivities, lobUserActivities, headerEntityActivities)
                                        }
                                    }
                                    assignFBUBasedActions(headerEntityActivities);
                                    return true;
                                }
                                var currentOrgMappedEntity;
                                currentOrgMappedEntity = _.find(selectedLOB.OrgActivities, {
                                    OrgEntityCode: entityTypeId
                                });
                                var currentOrgActivities = currentOrgMappedEntity.ActivityCode;
                                var currentOrgUserActivities = currentOrgActivities != null ? currentOrgActivities.filter(function (obj) { return userActivities.indexOf(obj) > -1 }) : [];

                                if (currentOrgUserActivities != null && currentOrgUserActivities.length > 0) {
                                    if (orgUserActivities != null && lobUserActivities != null && userActivities.length != currentOrgUserActivities.length) {
                                        currentOrgUserActivities = _.union(orgUserActivities, lobUserActivities, currentOrgUserActivities)
                                    }
                                    assignFBUBasedActions(currentOrgUserActivities);
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }

                        }
                    }
                }
                //LobActivities = _.find(APPCONSTANTS.userPreferences.contactOrgMappedActivities.LobDetails, { LOBId: $scope.dataModel.orderData.documentLOB.entityDetailCode })
            }
            catch (ex) {
                console.log(ex);
            }
           
        }

        var LobActivities;
        if (APPCONSTANTS.userPreferences.contactOrgMappedActivities != null && APPCONSTANTS.userPreferences.contactOrgMappedActivities != undefined) {
            LobActivities = _.find(APPCONSTANTS.userPreferences.contactOrgMappedActivities.LobDetails, { LOBId: $scope.dataModel.orderData.documentLOB.entityDetailCode, PreferenceLOBType :1 })
            //FBU Check While Loading An Order using LOB
            checkFBUActivity();
        }


        // hide custom attributes at line level if code list is empty or orderSource is 9
        if (!$scope.dataModel.orderData.CustomAttrQuestionSetCodesForItem ||
                        !$scope.dataModel.orderData.CustomAttrQuestionSetCodesForItem.length ||
                        $scope.dataModel.orderData.source && $scope.dataModel.orderData.source.id == 9) {
            var lineGrid = _.find(_clientSpecificConfigSettings.grid, { title: "Lines" });
            var customAttributesColumn = _.find(lineGrid.cloumnDefs, { field: "customAttributes" });
            if (customAttributesColumn != undefined) {
                customAttributesColumn.isVisible = false;
            }

        }
    }
    if (typeof document != 'undefined' && document.autoSavedData != undefined && document.autoSavedData != "") {
        autoSavedData = document.autoSavedData
        $timeout(function () {
            if (typeof document != 'undefined' && document.autoSavedData != undefined && document.autoSavedData != "") {
                $scope.showDiscardRetainBtns = true;
                toggleToastNotification($translate.instant("P2P_PO_Autosave_Return_Confirmation"), true);
            }
        }, 3000);
    }
    if (typeof document != 'undefined' && $scope.dataModel != undefined) {
        $scope.IS_SECTION_FIELDS_ENABLED = _.contains([P2PConstants.DOCUMENT_STATUSES.Draft, P2PConstants.DOCUMENT_STATUSES.Rejected, P2PConstants.DOCUMENT_STATUSES.Withdrawn], $scope.dataModel.orderData.status.id);
    }

    function toggleToastNotification(msg, preventAutoHide) {
        if (!$scope.showDiscardRetainBtns) {
            Materialize.toast(msg, 3000);
            return;
        }
        $scope.showToastNotification = true;
        $scope.toastNotificationText = msg; //$translate.instant("P2P_Req_AutoSaveSuccessMessage");
        if (preventAutoHide) { } else {
            $timeout(function () {
                $scope.showToastNotification = false;
            }, 3000);
        }
    };
    $timeout(function () {
        triggerAutoSave();
    }, 3000);
    function startAutoSaveTimer(trigger) {
        if (P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].AUTOSAVE_SETTINGS != undefined && P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].AUTOSAVE_SETTINGS.ALLOW) {
            commonUtilities.documentAutoSave = autoSave;
            commonUtilities.documentAutoSaveSettings = {
                interval: P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].AUTOSAVE_SETTINGS.INTERVAL, // milliseconds 
                //interval:1000,
                stop: false,
                stopExecution: false
            };
            if (trigger) {
                commonUtilities.continuousTrigger();
            }
        }
    };
    function stopAutoSaveTimer() {
        commonUtilities.documentAutoSaveSettings = {
            interval: P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].AUTOSAVE_SETTINGS.INTERVAL, // millisecond
            stop: true,
            stopExecution: true
        };
    };
    $scope.onAutoSaveDiscard = function () {
        $scope.showDiscardRetainBtns = false;
        $scope.showToastNotification = false;
    };
    
    $scope.resendOptionList = [{ title: $translate.instant("P2P_PO_Call"), id: "4", showInfo: true, infoMsg: $translate.instant("P2P_PO_Call&SubmitMessage") }, { title: $translate.instant("P2P_PO_DirectEmail"), id: "3" }, { title: $translate.instant("P2P_PO_Cxml"), id: "2" }, { title: $translate.instant("P2P_PO_Portal"), id: "1" }, {
        title: $translate.instant("P2P_PO_Fax"), id: "5"
}];
    $scope.selectedOption = { id: "1" };
   
    $scope.emailerPopup = false;
    $scope.emailerPopupHideCallback = function (e) {
        $scope.emailerPopup = false;
    };
    $scope.emailerPopupCallback = function () {
        $scope.emailerPopup = true;
    };

    $scope.emailBody = "";
    $scope.GetMailData = function () {
        $scope.emailToOpts = [{ "UserName": "" }];
        $scope.emailCcOpts = [{ "UserName": "" }];
        $scope.emailToPreSelect = [{ "UserName": $scope.dataModel.orderData.TransmissionValue==null?$scope.dataModel.orderData.partnerContact.email: $scope.dataModel.orderData.TransmissionValue }];
        $scope.emailCcPreSelect = [{ "UserName": "" }];
        $scope.emailSubject = "Purchase Order: " + $scope.dataModel.orderData.name + " (" + $scope.dataModel.orderData.number + ") from Mylan for " + $scope.dataModel.orderData.currency.code + " " + $scope.dataModel.orderData.totalNumber;
        $scope.isEmailSubjectDisable = true;
        $scope.isEmailToDisable = true;
        $scope.isEmailCCDisable = true;
        $scope.isBodyDisable = true;
        GetEmailSubjectBodyResponse();//"Dear " + $scope.dataModel.orderData.partner.name + ",<br />This is to notify you that a Purchase Order: " + $scope.dataModel.orderData.name + " (" + $scope.dataModel.orderData.number + ") is sent from Mylan of amount " + $scope.dataModel.orderData.currency.code + " " + $scope.dataModel.orderData.totalNumber + ".<br/>Check the attachment to review the details of the order.";
        
    }   
    function GetEmailSubjectBodyResponse()
    {
        var OrderStatus = $scope.dataModel.orderData.orderSource == 5 ? "CO" : "PO";
        var EventCode = OrderStatus == "CO" ? "P2P167" : "P2P149";
        var urls = PLATFORMURLs.getEmailSubjectBody + "?oloc=107" + "&eventCode=" + EventCode;
        var SendToSupplierService = httpService.directhttp({
            "url": urls,
            "method": "GET",
            "timeout": 60000
        });


        SendToSupplierService.then(function (response)
        {
            console.log(response);
            if (response.EmailBody.length>0)
            {
                $scope.emailBody = response.EmailBody[0];
                $scope.emailSubject = response.EmailBody[1];
                $scope.emailSubject= $scope.emailSubject.replace("[IsResent]", "").replace("[OrderName]", $scope.dataModel.orderData.name).replace("([OrderNumber])", $scope.dataModel.orderData.documentCode).replace("[BuyerCompanyName]", $scope.dataModel.orderData.orderContact.name).replace("[Currency]", $scope.dataModel.orderData.currency.name).replace("[OrderAmount]", p2pDetailsService.getDocumentAmount());
                $scope.emailBody = $scope.emailBody.replace("[UserName]", "<b>" + $scope.dataModel.orderData.partner.name + "</b>").replace("[OrderName]", "<b>" + $scope.dataModel.orderData.name + "</b>").replace("([OrderNumber])", "<b>" + $scope.dataModel.orderData.documentCode + "</b>").replace("[BuyerCompanyName]", "<b>" + $scope.dataModel.orderData.orderContact.name + "</b>").replace("[Currency]", "<b>" + $scope.dataModel.orderData.currency.name + "</b>").replace("[OrderAmount]", "<b>"+p2pDetailsService.getDocumentAmount()+"</b>").replace("[DispatchMode]","<b>"+$scope.dataModel.orderData.trasmission.name+"</b>").replace("[LoginId]", "<b>" + $scope.dataModel.orderData.orderContact.name + "</b>").replace("[BuyerCompanyName]", "<b>" + $scope.dataModel.orderData.orderContact.name + "</b>");
                $scope.emailBody = $sce.trustAsHtml($scope.emailBody);
       
                $scope.emailerPopup = true;
                CKEDITOR.instances['editor1'].setData($scope.emailBody);
            }
            else {
                var responseMessage = {
                    type: "error",
                    message: $translate.instant("P2P_Order_ErroroccureGettingEmailSubjectBody"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                notificationPopUp(responseMessage);
            }
            hideLoader();

        }).catch(function (errorCallback) {
            var saveOrderMessage = {
                type: "error",
                message: errorCallback.statusText,
                buttons: [{
                    "title": "OK",
                    "result": "YES"
                }]
            }
            hideLoader(true);
            notificationPopUp(saveOrderMessage);
        });
}
    var resendOptionId = "";

    $scope.resendOptionChange = function (item) {
        resendOptionId = item.id;
        if (item.title === "Direct Email") {
            $scope.dataModel.orderData.TransmissionMode = item.id;
            $scope.dataModel.orderData.TransmissionValue = $scope.dataModel.orderData.partnerContact.email;
        }
        else {
            $scope.dataModel.orderData.TransmissionMode = item.id;
            $scope.dataModel.orderData.TransmissionValue = "";
        }
    }

    $scope.resendOptionSend = function ()
    {
        if ((resendOptionId == 1) || (resendOptionId == 2) || (resendOptionId == 4) || (resendOptionId == 5))
        {
            $scope.ReSendToSupplier();
        }
    else
    {
            $scope.resendOptionShow = false;             
            $scope.isUploadDocShow = false;             
            $scope.GetMailData();      
      }
           
}
   
    $scope.IsResendToSupplierEmail = function () {
        $scope.ReSendToSupplier();
    }

    $scope.resendOptionShow = false;
    $scope.resendOrderToSuppCall = function () {
        $scope.resendOptionShow = true;
        if ($scope.commonSettings.isIntegratedPartner) {
            $scope.resendOptionList = [{ title: $translate.instant("P2P_PO_Cxml"), id: "2",isCheked:true }];
        } else {

            $scope.resendOptionList = [{ title: $translate.instant("P2P_PO_Call"), id: "4", showInfo: true, infoMsg: $translate.instant("P2P_PO_Call&SubmitMessage") }, { title: $translate.instant("P2P_PO_DirectEmail"), id: "3" }, { title: $translate.instant("P2P_PO_Portal"), id: "1" }, { title: $translate.instant("P2P_PO_Fax"), id: "5" }];
        }
    }

    $scope.resendOptionPopupOnHideCallback = function (e) {
        $scope.resendOptionShow = false;
    }

    $scope.uploadPopupCall = function () {
        $scope.emailerPopup = false;
        $scope.showUploadPopup = true;
    }

    function DisplayingDispathMode()
    {
       if ($scope.dataModel.orderData.trasmission && $scope.dataModel.orderData.trasmission.id == 1)
           $scope.dataModel.orderData.trasmission['name'] = $translate.instant("P2P_PO_Portal");
                    else if ($scope.dataModel.orderData.trasmission && $scope.dataModel.orderData.trasmission.id == 2)
                        $scope.dataModel.orderData.trasmission['name'] = $translate.instant("P2P_PO_Cxml");
                        else if ($scope.dataModel.orderData.trasmission && $scope.dataModel.orderData.trasmission.id == 3)
                            $scope.dataModel.orderData.trasmission['name'] = $translate.instant("P2P_PO_DirectEmail");
                    else if ($scope.dataModel.orderData.trasmission && $scope.dataModel.orderData.trasmission.id == 4)
                        $scope.dataModel.orderData.trasmission['name'] = $translate.instant("P2P_PO_Call");
                    else if ($scope.dataModel.orderData.trasmission && $scope.dataModel.orderData.trasmission.id == 5)
                        $scope.dataModel.orderData.trasmission['name'] = $translate.instant("P2P_PO_Fax");

}

    $scope.onAutoSaveRetain = function () {
        //$scope.dataModel.orderData = autoSavedData;
        var tempModel = $scope.dataModel.orderData;
        angular.merge(tempModel, autoSavedData);

        $scope.dataModel.orderData = autoSavedData;
        $timeout(function () {
            _.each(tempModel.items, function (item, index) {
                if (typeof tempModel.items[index].description !== 'object' && typeof tempModel.items[index].buyerItemNumber !== 'object') {
                    tempModel.items[index].description = { 'desc': tempModel.items[index].description };
                    tempModel.items[index].buyerItemNumber = { 'code': tempModel.items[index].buyerItemNumber };
                }
            });
            $scope.dataModel.orderData = tempModel;
        });
        //$rootScope.$broadcast('composedGridUpdateSaveOrderData', {
        //    SaveOrderData: $scope.dataModel.orderData.items
        //});
        //$rootScope.$broadcast('composedChargeGridUpdateSaveOrderData', {
        //    SaveOrderData: $scope.dataModel.orderData.ItemChargesForHeader
        //});
        checkDefaultValues();
        $scope.showDiscardRetainBtns = false;
        $scope.showToastNotification = false;
        $rootScope.fillTeamMembers();
    };
    var IS_SET_OnIdleConfig = false;
    function setOnIdleConfig() {
        if (!IS_SET_OnIdleConfig) {
            if ($scope.IS_SECTION_FIELDS_ENABLED) {
                startAutoSaveTimer(true);
            } else {
                stopAutoSaveTimer();
            }
            IS_SET_OnIdleConfig = true;
        }
    };
    function triggerAutoSave() {
        if (P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].AUTOSAVE_SETTINGS != undefined && P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].AUTOSAVE_SETTINGS.ALLOW && _.contains([P2PConstants.DOCUMENT_STATUSES.Draft, P2PConstants.DOCUMENT_STATUSES.Rejected, P2PConstants.DOCUMENT_STATUSES.Withdrawn], $scope.dataModel.orderData.status.id) && $scope.dataModel.orderData.documentCode > 0) {
            IS_SET_OnIdleConfig = false;
            setOnIdleConfig();
            // commonUtilities.continuousTrigger();
            IS_SET_OnIdleConfig = false;
        }
    }
    // var autoSaveCanceller = $q.defer();
    function autoSave(IS_EXPLICIT_HARDSAVE, callback) {
        if ($scope.IS_SECTION_FIELDS_ENABLED && !isSaveTriggered) {
            saveGridState();
            $scope.showDiscardRetainBtns = false;
            $scope.showToastNotification = false;
            fillTeamMembers();
            var data = angular.copy($scope.dataModel);
            data = reFormatItemData(data);
            //autoSaveCanceller = $q.defer();
            console.log("Starting auto-save... " + new Date());
            stopAutoSaveTimer();
            autoSaveOrder = {
                type: 'POST',
                //autoSaveOrder.url = P2PRestSvc + 'NewOrderRestService/AutoSaveOrderDocument',
                url: RESTURLs.SM1_Controller_OrderDocumentAutoSave,
                data: {
                    "OderData": JSON.stringify(data.orderData),
                    "DocumentCode": data.orderData.documentCode,
                    "DocumentTypeCode": data.orderData.type.id,
                    "LastModifiedBy": data.orderData.createdBy.id
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                timeout: 60000
            };
            var requestPromise = httpService.directhttp(autoSaveOrder);
            requestPromise.then(function (resp) {
                autoSaveOrder = undefined;
                if (resp != undefined && resp != null && resp.success) {
                    Materialize.toast($translate.instant("P2P_PO_AutoSaveSuccessMessage"), 3000);
                    startAutoSaveTimer(true);
                    console.log(resp);
                    console.log("Auto-save complete and successfull : " + resp.success);
                    _showcopyBtn()
                }
            }, function (error) {
                console.log("Auto-save failed : " + error);
                startAutoSaveTimer(true);
            });
        }
    };
    $scope.onLOBSelect = function (data) {
        APPCONSTANTS.lobEntityDetailCode = 2207;
        var confi = {

            type: "confirm",
            message: "<p class='left-align'>" + $translate.instant("P2P_REQ_TaxChangeError") + "</p>",
            //checkMessage: "Do not show again",
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
        }
        notification.notify(confi, function (response) {
            console.log("Pressed : " + response.result);
            if (response.result === "yes") {
                if ($scope.dataModel.orderData.documentLOB && $scope.dataModel.orderData.documentLOB.entityDetailCode != APPCONSTANTS.lobEntityDetailCode)
                    dataModelChangesForLobChange();
            }
            else {
                //$scope.reset();
            }
        });
    }


    function dataModelChangesForLobChange() {
        $scope.dataModel.orderData.documentLOB.entityDetailCode = APPCONSTANTS.lobEntityDetailCode;
        if ($scope.dataModel.orderData.shipTo == null) {
            $scope.dataModel.orderData.shipTo = {};
        }
        if ($scope.dataModel.orderData.billTo == null) {
            $scope.dataModel.orderData.billTo = {};
        }
        if ($scope.dataModel.orderData.deliverTo == null) {
            $scope.dataModel.orderData.deliverTo = {};
        }
    }
    function dataModelChangesForShipToAndBillTo() {
        if ($scope.dataModel.orderData.shipTo == null) {
            $scope.dataModel.orderData.shipTo = {
            };
        }
        if ($scope.dataModel.orderData.billTo == null) {
            $scope.dataModel.orderData.billTo = {
            };
        }
        if ($scope.dataModel.orderData.deliverTo == null) {
            $scope.dataModel.orderData.deliverTo = {
            };
        }
        var billHeaderEntity = $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[clientConstants.DEFAULT_BILLTO_ENTITY]];
        if (billHeaderEntity != null) {
            $scope.dataModel.orderData.billTo.selectedHeaderEntityId = billHeaderEntity.id;
        }
        if ($scope.dataModel.orderData.status) {
            p2pDetailsService.setDocumentStatus($scope.dataModel.orderData.status.id);
            var shipToReadOnlyData = p2pValidationService.isReadOnly({
                attributes: {
                    "isEditable": ["0_1", "0_23", "0_24", "0_59", "0_169", "0_1_4", "0_1_5", "0_25_10", "0_42_10", "0_23_4", "0_24_4"]
                }
            });
            $scope.dataModel.orderData.shipTo.enabled = !shipToReadOnlyData;
            var billToReadOnlyData = p2pValidationService.isReadOnly({
                attributes: {
                    "isEditable": ["0_1", "0_23", "0_24", "0_59", "0_169", "0_1_4", "0_23_4", "0_24_4"]
                }
            });
            $scope.dataModel.orderData.billTo.enabled = !billToReadOnlyData;
            var DeliverToReadOnlyData = p2pValidationService.isReadOnly({
                attributes: {
                    "isEditable": ["0_1", "0_23", "0_24", "0_59", "0_169", "0_1_4", "0_21", "0_23_4", "0_24_4"]

                }
            });
            $scope.dataModel.orderData.deliverTo.enabled = !DeliverToReadOnlyData;
            $scope.isProrateDisabled = p2pValidationService.isReadOnly({
                attributes: {
                    "isEditable": ["0_1", "0_23", "0_24", "0_1_4", "0_1_5", "0_25_10", "0_41_10", "0_23_4", "0_24_4"]
                }
            });

        }
    }
    dataModelChangesForShipToAndBillTo();
    hideLoader();

    $scope.showComments = false;

    $scope.showCommentsPopup = function () {
        $scope.showComments = true;
    }

    $scope.hideCommentsPopup = function () {
        $scope.showComments = false;
    }

    $scope.updateHandler = function (data) {
        $scope.dataModel.orderData.items.map(function (x, i) {
            if (!x.isDeleted) {
                x.shipTo = data.modelData;
            }
        });
        var shipHeaderEntity = $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[clientConstants.ENTITYTYPE_TAX]];
        var shipHeaderEntityId = null;
        if (shipHeaderEntity != null) {
            shipHeaderEntityId = shipHeaderEntity.id;
        }
        p2pDetailsService.getTaxItemsByEntityID(data.modelData.id, shipHeaderEntityId, clientConstants.ENTITYTYPE_TAX, applyTaxCalculation,0);
    }

    $rootScope.documentData = $scope.dataModel;

    $rootScope.$on('composedGridUpdateColumnDispatcher', function (e, data) {
        if (data.colDef.field && data.colDef.field.toLowerCase() == 'shipto.name') {

            var shipHeaderEntity = $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[clientConstants.ENTITYTYPE_TAX]];
            var shipHeaderEntityId = null;
            if (shipHeaderEntity != null) {
                shipHeaderEntityId = shipHeaderEntity.id;
            }
            p2pDetailsService.getTaxItemsByEntityID(data.rowModel.shipTo.id, shipHeaderEntityId, clientConstants.ENTITYTYPE_TAX, applyTaxCalculation, data.rowModel.lineNumber);
        }     

   });  

    function applyTaxCalculation(lstTaxItems, lineNumber) {
        var totalTaxPercentage = 0;
        lstTaxItems.map(function (x, i) {
            totalTaxPercentage += x.percent;
        });
        if ($scope.dataModel.orderData.items.length > 0 && lineNumber > 0) {
            $scope.dataModel.orderData.items.map(function (x, i) {
                if (!x.isTaxExempt && x.lineNumber == lineNumber) {
                    var totalChargesForTaxes = p2pDetailsService.getChargesForTaxCalculation(x);
                    x.taxPercentage = totalTaxPercentage;
                    x.taxes = parseFloat(p2pDetailsService.parseNumber((totalTaxPercentage * p2pDetailsService.parseNumber(x.quantity) * p2pDetailsService.parseNumber(x.unitPrice)) / 100, 2));
                    x.taxItems = lstTaxItems;
                }
            });
        }
        else if (lineNumber === 0) {
            if ($scope.dataModel.orderData.items.length > 0) {
                $scope.dataModel.orderData.items.map(function (x, i) {
                    if (!x.isDeleted && !x.isTaxExempt) {
                        x.taxPercentage = totalTaxPercentage;
                        x.taxes =parseFloat(p2pDetailsService.parseNumber((totalTaxPercentage * p2pDetailsService.parseNumber(x.quantity) * p2pDetailsService.parseNumber(x.unitPrice)) / 100, 2));
                        x.taxItems = lstTaxItems;
                    }
                    if (x.isTaxExempt) {
                        x.taxPercentage = 0;
                        x.taxes = 0;
                        x.taxItems = null;
                    }
                });
            }
        }
  
    };


    function applyTaxCalculationForLine(lstTaxItems, lineNumber) {
        var totalTaxPercentage = 0;
        lstTaxItems.map(function (x, i) {
            totalTaxPercentage += x.percent;
        });
        if ($scope.dataModel.orderData.items.length > 0 && lineNumber > 0) {
            $scope.dataModel.orderData.items.map(function (x, i) {
                if (!x.isTaxExempt && x.lineNumber == lineNumber) {
                    var totalChargesForTaxes = p2pDetailsService.getChargesForTaxCalculation(x);
                    x.taxPercentage = totalTaxPercentage;
                    x.taxes = p2pDetailsService.parseNumber((totalTaxPercentage * p2pDetailsService.parseNumber(x.quantity) * p2pDetailsService.parseNumber(x.unitPrice)) / 100, 2);
                    x.taxItems = lstTaxItems;
                }
            });
        }       
    }
    function hideLoader() {
        $rootScope.p2ploader = false;
        $rootScope.loaderPosition = false;
    }

    function getPurchaseTypeOptions(purchaseOptionsUIObj) {
        // APPCONSTANTS.userPreferences.purchaseTypeMappings = null;
        purchaseTypesWithMappings = APPCONSTANTS.userPreferences.purchaseTypeMappings != null ? APPCONSTANTS.userPreferences.purchaseTypeMappings : '';
        var purchaseTypes = (purchaseTypesWithMappings != '' && purchaseTypesWithMappings.lstpurchaseTypes != null) ? purchaseTypesWithMappings.lstpurchaseTypes : '';
        if (purchaseTypes != '') {
            var optionData = purchaseTypes.map(function (option) {
                return { "name": option.Description, "id": option.PurchaseTypeId };
            });

            var currentlySelected = _.find(optionData, function (item) {
                if ($scope.dataModel.orderData.purchaseType)
                    return $scope.dataModel.orderData.purchaseType.id == item.id;
            });
            purchaseType = currentlySelected;
            if (currentlySelected == undefined) {
                currentlySelected = _.find(purchaseTypes, { IsDefault: true });
            }
            purchaseType = currentlySelected.PurchaseTypeId ? { "name": currentlySelected.Description, "id": currentlySelected.PurchaseTypeId } : currentlySelected;
            $scope.lineTypes = getItemTypes();
            $rootScope.$broadcast('lineTypes', { lineTypes: $scope.lineTypes });

            $scope.dataModel.orderData.purchaseType = purchaseType;
            purchaseOptionsUIObj.attributes.options = optionData;
            //Added config modification related to changes TWO-6029
            var gridConfig = p2pDetailsService.getGridConfig();
            _.each(gridConfig[0].cloumnDefs, function (config) {
                if (config.displayName == "P2P_PO_LineType") {
                    config.attributes.options = $scope.lineTypes;
                }
            });

            p2pDetailsService.setGridConfig(gridConfig);

        }
        else {
            // $scope.dataModel.orderData.purchaseType = {'name':'','id':0};
            purchaseOptionsUIObj.attributes.options = [];
        }

    }

    function getItemTypes() {
        var itemTypes = _.where(purchaseTypesWithMappings.lstpurchaseTypesWithMappings, { PurchaseTypeId: purchaseType.id });
        p2pDetailsService.setPurchaseTypes(itemTypes);
        itemTypes = itemTypes.map(function (option) {
            return {
                "name": option.ItemType, "id": option.ServiceTypeId
            };
        });
        return itemTypes;
    }


    function getERPOrderTypeOptions(erpOptionsUIObj) {
        var getErpOrderTypeService = httpService.directhttp({
            "url": RESTURLs.SM1_Controller_GetAllERPOrderTypes + "&bpc=" + bpc, "method": "GET"
        });
        getErpOrderTypeService
         .then(function (data) {

             var optionData = data.map(function (option) {
                 return {
                     "name": option.ErpOrderType.trim(), "id": option.ERPOrderTypeId
                 };
             });
             erpOptionsUIObj.attributes.options = optionData;
         });
    }


    function getAutoSuggestData(inputObject, success) {

        if (previousAutoSuggestRequest) {
            try {
                httpService.abort(previousAutoSuggestRequest);
            }
            catch (e) {
                console.log(e);
            }
        }
        var req = {
        };
        req.method = "GET";
        angular.extend(req, inputObject);
        previousAutoSuggestRequest = req;
        debouncer.add(function () {
            httpService.directhttp(previousAutoSuggestRequest).then(function (response) {
                success(response);
                previousAutoSuggestRequest = null;
            }, function () {
                previousAutoSuggestRequest = null;
            });
        }, 500);
    }

    function getLOBEntityDetailCode() {
        var lobcode = 0;
        if (APPCONSTANTS.lobEntityDetailCode != null && APPCONSTANTS.lobEntityDetailCode != undefined) {
            lobcode = APPCONSTANTS.lobEntityDetailCode;
        }
        else {
            if ($rootScope.documentData.documentLOB != null && $rootScope.documentData.documentLOB != undefined)
                lobcode = $rootScope.documentData.documentLOB.entityDetailCode;
        }
        return lobcode;
    }
    Array.prototype.getIndexByValue = function (name, value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i][name] == value) {
                return i;
            }
        }
        return -1;
    }
    function getOrderingLocationByPartnerCode(locationflag) {
        var inputObject = {
            "url": RESTURLs.SM1_Controller_GetOrderingLocationByPartnerCode,
        };
        inputObject.params = {
            "oloc": "107",
            "bpc": APPCONSTANTS.userPreferences.EncryptedBPC,
            "partnerCode": $scope.dataModel.orderData.partner.id,
            "accessControlEntityDetailCode": 0
        }
        var req = {
        };
        req.method = "GET";
        angular.extend(req, inputObject);
        httpService.directhttp(req).then(function (response) {
            currorderingLocation = response.map(function (location) {
                return {
                    "name": location.ClientLocationCode + ' ' + location.LocationName,"fax":location.Address.FaxNo,"id": location.LocationId, "address": CreateAddress(location.Address.Addressline1, location.Address.Addressline2, location.Address.Addressline3, location.Address.City, location.Address.StateInfo.StateName, location.Address.CountryInfo.CountryName, location.Address.ZipCode)
                };
            });
            if (response.length > 0) {
                if (locationflag)
                {
                    $scope.dataModel.orderData.orderingLocation = currorderingLocation[0];
                    bindDefaultRemitToLocation();
                }

                getPartnerContactsByPartnerCodeandOrderingLocation();
                var propInx;
                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_OrderingLocation')) != -1) {
                    //var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_OrderingLocation');
                    supplierDetailSecRow1.rows[0].properties[propInx].attributes.readonly = true;
                }
                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact')) != -1) {
                    //var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact');
                    supplierDetailSecRow1.rows[0].properties[propInx].attributes.readonly = true;
                }
            } else if (response.length == 0) {
                $scope.dataModel.orderData.partnerContact = {
                    "id": 0, "email": "", "fax": "", "name": "", "address": "", "phone": ""
                };
                var objSupplierDetails = GetConfigProperties("P2P_PO_SupplierDetails");
                var objOrderingLocation = _.find(objSupplierDetails.rows[0].properties, { label: "P2P_PO_OrderingLocation" });
                objOrderingLocation.attributes.readonly = false;
                $scope.dataModel.orderData.orderingLocation = {
                    "id": 0, "name": "", "address": ""
                };
                objOrderingLocation.attributes.options = [];
                //}
                getPartnerContactDetails();
            } else {
                if (locationflag)
                $scope.dataModel.orderData.orderingLocation = currorderingLocation[0];
                //getPartnerContactsByPartnerCodeandOrderingLocation();
                var propInx;
                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_OrderingLocation')) != -1) {
                    // var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_OrderingLocation');
                    supplierDetailSecRow1.rows[0].properties[propInx].attributes.readonly = true;
                }
                getPartnerContactDetails();
            }
        }, function () {

        });
    }

    function getPaymentTermsById() {
        var inputObject = {
            "url": RESTURLs.SM1_Controller_GetPaymentTermsById,
        };
        inputObject.params = {
            "oloc": "107",
            "bpc": APPCONSTANTS.userPreferences.EncryptedBPC,
            "partnerCode": $scope.dataModel.orderData.partner.id,
            "paymenttermid": 0
        };
        var req = {
        };
        req.method = "GET";
        angular.extend(req, inputObject);
        httpService.directhttp(req).then(function (response) {
            if (response != undefined) {
                var paymentTerms = {
                    "id": response.PaymentTermId, "name": response.PaymentTermName
                };
                $scope.dataModel.orderData.paymentTerms = paymentTerms;
            }
        }, function () {

        });
    }

    function getPartnerContactsByPartnerCodeandOrderingLocation() {
        var inputObject = {
            "url": RESTURLs.SM1_Controller_GetPartnerContactsByPartnerCodeandOrderingLocation,
        };
        inputObject.params = {
            "oloc": "107",
            "bpc": APPCONSTANTS.userPreferences.EncryptedBPC,
            "partnerCode": $scope.dataModel.orderData.partner.id,
            "orderingLocationId": $scope.dataModel.orderData.orderingLocation.id
        };
        var req = {
        };
        req.method = "GET";
        angular.extend(req, inputObject);
        httpService.directhttp(req).then(function (response) {

            //currorderingLocation = response;
            var contact = response;
            var propInx;
            if (contact.length == 1) {
                $scope.dataModel.orderData.partnerContact = {
                    "id": contact[0].ContactCode, "email": contact[0].EmailID, "fax": $scope.dataModel.orderData.orderingLocation.fax, "name": contact[0].Name, "address": $scope.dataModel.orderData.orderingLocation.address, "phone": contact[0].ContactNumber
                };

                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact')) != -1) {
                    //var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact');
                    var propObj = supplierDetailSecRow1.rows[0].properties[propInx];
                    propObj.attributes.options = [];
                    propObj.attributes.options.push($scope.dataModel.orderData.partnerContact);
                    propObj.attributes.readonly = true;
                }
            } else if (contact.length > 1) {
                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact')) != -1) {
                    var supplierContacts = contact.map(function (cont) {
                        return {
                            "id": cont.ContactCode, "email": cont.EmailID, "fax": "", "name": cont.Name, "address": $scope.dataModel.orderData.orderingLocation.address, "phone": cont.ContactNumber
                        };
                    });
                    //var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact');
                    var propObj = supplierDetailSecRow1.rows[0].properties[propInx];
                    propObj.attributes.readonly = false;
                    propObj.attributes.options = supplierContacts;
                }
            }

            updateDEAddress();

        }, function () {

        });
    }
    $scope.onRemitToLocationChange = function (e, uiElementobj, flag) {
        if (e.data[0].value.trim().length === 0) {
            $scope.dataModel.orderData.remitToLocation = { 'id': 0, 'name': '', 'address': '' };
        }
        if (($scope.dataModel.orderData.orderingLocation.id > 0 && $scope.commonSettings.IsLinkedLocationEnabled) || $scope.commonSettings.IsLinkedLocationEnabled != true) {
            var RemitToLocation = e.data[0].value;
            var dd = p2pDetailsService.getQueryStringValue("dd");
            var ACECode = 0;//($scope.dataModel.orderData.headerEntity1 !=undefined && $scope.dataModel.orderData.headerEntity1 != null) ? $scope.dataModel.orderData.headerEntity1.id : 0;
            var inputObject = {
                "url": RESTURLs.SM1_Controller_GetRemitToLocationsAutoSuggestByOrderID + "?dd=" + dd,
            };
            inputObject.params = {
                "oloc": "107",
                "PartnerCode": $scope.dataModel.orderData.partner.id,
                "OrderLocationID": $scope.dataModel.orderData.orderingLocation.id,
                "accessControlEntityDetailCode": ACECode,
                "RemitToLocationName": RemitToLocation
            };
            var req = {
            };
            req.method = "GET";
            angular.extend(req, inputObject);
            var successFunc = function (obj) {
                if (flag === "defaultLocation" && obj != undefined && obj.length === 1) {
                    var objRemitToLocation = {
                        "name": obj[0].ClientLocationCode + ' ' + obj[0].LocationName, "id": obj[0].LocationId, "address": ""
                    }
                    $scope.dataModel.orderData.remitToLocation = objRemitToLocation;
                }
                else {
                    uiElementobj.attributes.options = obj.map(function (location) {
                        return {
                            "name": location.ClientLocationCode + ' ' + location.LocationName, "id": location.LocationId, "address": ""
                        };
                    });
                }
            }
            getAutoSuggestData(req, successFunc);
        }
    }
    if ($scope.dataModel.orderData.partner != undefined && $scope.dataModel.orderData.partner.id > 0 && (($scope.dataModel.orderData.orderingLocation != undefined && $scope.dataModel.orderData.orderingLocation.id > 0 && $scope.commonSettings.IsLinkedLocationEnabled) || $scope.commonSettings.IsLinkedLocationEnabled != true) && $scope.dataModel.orderData.remitToLocation.id <= 0) {
        bindDefaultRemitToLocation();
    }
    function bindDefaultRemitToLocation() {
        var e = { data: [{ 'value': '' }] };
        var objSupplierDetails = GetConfigProperties("P2P_PO_SupplierDetails");
        var objRemitToLocationUiElement = _.find(objSupplierDetails.rows[0].properties, { label: "P2P_PO_RemitToLocation" });
        $scope.onRemitToLocationChange(e, objRemitToLocationUiElement, "defaultLocation");
    }
    function ResetRemittoLocation() {
        var objRemitToLocation = {
            "name": "", "id": 0, "address": ""
        }
        $scope.dataModel.orderData.remitToLocation = objRemitToLocation;
        var objSupplierDetails = GetConfigProperties("P2P_PO_SupplierDetails");
        var objRemitToLocationUiElement = _.find(objSupplierDetails.rows[0].properties, { label: "P2P_PO_RemitToLocation" });
        objRemitToLocationUiElement.attributes.options = [];
    }
    function updateDEAddress() {
        if (_.find(supplierDetailSecRow1.optionalFields, {
            label: "Direct Email"
        }).isVisible) {
            if ($scope.dataModel.orderData.partnerContact && $scope.dataModel.orderData.partnerContact.email != "")
                $scope.dataModel.orderData.TransmissionValue = $scope.dataModel.orderData.partnerContact.email;
        }
        else
            _.find(supplierDetailSecRow1.optionalFields, { label: "Direct Email" }).isVisible = false;
    }
   
    function getPartnerDetailsById() {
        var inputObject = {
            "url": RESTURLs.SM1_Controller_GetPartnerDetailsById,
        };
        inputObject.params = {
            "oloc": "107",
            "bpc": APPCONSTANTS.userPreferences.EncryptedBPC,
            "partnerCode": $scope.dataModel.orderData.partner.id
        };
        var req = {
        };
        req.method = "GET";
        angular.extend(req, inputObject);
        httpService.directhttp(req).then(function (response) {

            //currorderingLocation = response;
            //$scope.dataModel.orderData.orderingLocation = response;
        }, function () {

        });
    }

    function isIntegratedPartner() {

        if (configClientConstants.isIntegratedPartnerRule) {
            var inputObject = {
                "url": RESTURLs.SM1_Controller_IsIntegratedPartner,
                "timeout": 5000,
            };
            inputObject.params = {
                "oloc": "107",
                "bpc": APPCONSTANTS.userPreferences.EncryptedBPC,
                "PartnerCode": $scope.dataModel.orderData.partner.id,
                "orderSource": $scope.dataModel.orderData.orderSource == null ? "PO" : $scope.dataModel.orderData.orderSource
            };
            var req = {
            };
            req.method = "POST";
            angular.extend(req, inputObject);
            httpService.directhttp(req).then(function (response) {
                $scope.commonSettings.isIntegratedPartner = response;
            }, function () {

            });
        }
        else
            $scope.commonSettings.isIntegratedPartner = false;
    }

    function enableDispatchMode() {
        var SupplierConfigSection = _.find($scope.formConfig.sections, { "label": "P2P_PO_SupplierDetails" });
        if (SupplierConfigSection != 'undefined' && SupplierConfigSection != null) {
            var supplierdata = SupplierConfigSection.rows[0].properties;
            var dispatchmode = _.find(supplierdata, { "label": "P2P_PO_DispatchMode" });
            if (dispatchmode != 'undefined' && dispatchmode != null) {
                var dispatchmode_data = dispatchmode.attributes.options;
                var newdispatchmode_data = [];
                    if ($scope.commonSettings.isIntegratedPartner && ($scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.Draft || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.Withdrawn || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.Rejected)) {

                        angular.forEach(dispatchmode_data, function (element, index, obj) {
                            if (element.name === "Cxml") {
                                newdispatchmode_data.push(obj[index]);
                            }
                        });
                        
                    } else
                        if (!$scope.commonSettings.isIntegratedPartner && ($scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.Draft || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.Withdrawn || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.Rejected || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.PartnerAcknowledged || $scope.dataModel.orderData.status.id == APPCONSTANTS.docStateConstants.SubmittedToPartner)) {

                            angular.forEach(dispatchmode_data, function (element, index, obj) {
                                if (element.name != "Cxml") {
                                    newdispatchmode_data.push(obj[index]);
                                }
                            });

                            angular.forEach(dispatchmode_data, function (element, index, obj) {
                                if (element.name != "Cxml") {
                                    newdispatchmode_data.push(obj[index]);
                                }
                            });
                    dispatchmode.attributes.options = newdispatchmode_data;
                if($scope.dataModel.orderData.partner &&  $scope.dataModel.orderData.partner.transmissionValue!= ""){
                            if ($scope.dataModel.orderData.partner.transmissionValue == "Web"){
                                $scope.dataModel.orderData.trasmission = (_.find(dispatchmode.attributes.options, { name: "Portal" })) ? (_.find(dispatchmode.attributes.options, { name: "Portal"})) : $scope.dataModel.orderData.trasmission;
                        }
                        if($scope.dataModel.orderData.partner.transmissionValue == "cXML") {
                            $scope.dataModel.orderData.trasmission = (_.find(dispatchmode.attributes.options, { name: "Cxml" })) ? (_.find(dispatchmode.attributes.options, { name: "Cxml" })): $scope.dataModel.orderData.trasmission;
                            }
                        if ($scope.dataModel.orderData.partner.transmissionValue == "Email") {
                            $scope.dataModel.orderData.trasmission = (_.find(dispatchmode.attributes.options, { name: "Direct Email" })) ? (_.find(dispatchmode.attributes.options, { name: "Direct Email" })): $scope.dataModel.orderData.trasmission;
                        }
                        if ($scope.dataModel.orderData.partner.transmissionValue == "Call and Submit") {
                            $scope.dataModel.orderData.trasmission = (_.find(dispatchmode.attributes.options, {name: "Call"})) ? (_.find(dispatchmode.attributes.options, { name: "Call" })): $scope.dataModel.orderData.trasmission;
                        }
                    }
            }
        }
    }
    function getPartnerContactDetails() {
        var inputObject = {
            "url": RESTURLs.SM1_Controller_GetPartnerContactDetails,
        };
        inputObject.params = {
            "oloc": "107",
            "bpc": APPCONSTANTS.userPreferences.EncryptedBPC,
            "partnerCode": $scope.dataModel.orderData.partner.id
        };
        var req = {
        };
        req.method = "GET";
        angular.extend(req, inputObject);
        httpService.directhttp(req).then(function (response) {
            var propInx;
            if (response.length == 1) {

                $scope.dataModel.orderData.partnerContact = {
                    "id": response[0].ContactCode, "email": response[0].EmailAddress, "fax": response[0].Address.FaxNo, "name": response[0].FirstName + " " + response[0].LastName, "address": CreateAddress(response[0].Address.Addressline1, response[0].Address.Addressline2, response[0].Address.Addressline3, response[0].Address.City, response[0].Address.StateInfo.StateName, response[0].Address.CountryInfo.CountryName, response[0].Address.ZipCode), "phone": response[0].Address.PhoneNo1
                };
                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact')) != -1) {
                    //var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact');
                    var propObj = supplierDetailSecRow1.rows[0].properties[propInx];
                    propObj.attributes.options = [];
                    propObj.attributes.options.push($scope.dataModel.orderData.partnerContact);
                    propObj.attributes.readonly = false;
                }
                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_OrderingLocation')) != -1) {
                    //var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_OrderingLocation');
                    supplierDetailSecRow1.rows[0].properties[propInx].attributes.readonly = true;
                }
            } else if (currorderingLocation.length > 1) {
                if ((propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact')) != -1) {
                    //var propInx = supplierDetailSecRow1.rows[0].properties.getIndexByValue('label', 'P2P_PO_SupplierContact');
                    var propObj = supplierDetailSecRow1.rows[0].properties[propInx];
                    propObj.attributes.readonly = false;
                    propObj.attributes.options = response.map(function (contact) {
                        return {
                            "id": contact.ContactCode, "email": contact.EmailAddress, "fax": "", "name": contact.FirstName + " " + contact.LastName, "address": CreateAddress(contact.Address.Addressline1, contact.Address.Addressline2, contact.Address.Addressline3, contact.Address.City, contact.Address.StateInfo.StateName, contact.Address.CountryInfo.CountryName, contact.Address.ZipCode), "phone": response[0].Address.PhoneNo1
                        };
                    });
                }
            }

            updateDEAddress();

        }, function () {

        });
    }

    function notificationPopUp(message) {
        notification.notify(message, function (response) {
            if (response.result == "yes") {
                onerror();
            }
        });
    }

    function getDefaultSplitAccountingValues(levelType) {
        if (typeof $scope.dataModel.orderData == 'string')
            $scope.dataModel.orderData = JSON.parse($scope.dataModel.orderData);

        if (typeof $scope.dataModel.orderData.documentLOB != 'undefined' && typeof $scope.dataModel.orderData.documentLOB.entityDetailCode != 'undefined') {

            var po = {
            };
            po.method = "POST",
            po.url = RESTURLs.SM1_Controller_GetAllSplitAccountingFieldsWithDefaultValuesURL,
            // po.url = "https://smartdev.gep.com/Common/ManageCommon/GetAllSplitAccountingFieldsWithDefaultValues?oloc=107",
            po.data = {
                "documentType": 8,
                "documentCode": 0, //$scope.dataModel.id,
                "OnBehalfOfId": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                "level": levelType,
                "documentItemId": 0,
                "lOBEntityDetailCode": $scope.dataModel.orderData.documentLOB.entityDetailCode,
                "lstHeaderEntityDetails": null //$scope.dataModel.headerEntity1
            };
            httpService.directhttp(po).then(function (response) {
                console.log(response);
                if (levelType == 1) {
                    APPCONSTANTS.defaultHeaderEntityValues = response;
                    var billHeaderEntity = $scope.dataModel.orderData[clientConstants.DEFAULT_HEADER_ENTITIES[clientConstants.DEFAULT_BILLTO_ENTITY]];
                    var billHeaderEntityId = 0;
                    if (billHeaderEntity != null) {
                        billHeaderEntityId = billHeaderEntity.id;
                    }
                    applyDefaultBillTo(billHeaderEntityId)
                }
                if (levelType == 2) {
                    APPCONSTANTS.defaultSplitValues = response;
                    AddRulesToAccountingEntities();
                }

            }).catch(function (errorCallback) {
                hideLoader(true);
            });
        }
    };



    // Function to update promise date with leadtime
    function updatePromiseddDate() {
        if ($scope.dataModel.orderData.items != null && $scope.dataModel.orderData.items.length > 0) {
            for (var i = 0; i < $scope.dataModel.orderData.items.length; i++) {
                if ($scope.dataModel.orderData.items[i].type.id == 1) {
                    var newtime = new Date();
                    var leadTime = $scope.dataModel.orderData.items[i].leadTime;
                    if (leadTime > 0) {
                        newtime.setDate(newtime.getDate() + parseInt(leadTime));
                        newtime = "\/Date(" + newtime.getTime() + ")\/";
                        $scope.dataModel.orderData.items[i].promisedDate = newtime;
                    }
                    else {
                        $scope.dataModel.orderData.items[i].promisedDate = null;
                    }
                }
            }
        }
    }
    function isFacilitateToClient() {
        var returnValue = false;
        var getGridConfig = p2pDetailsService.getGridConfig();
        angular.forEach(getGridConfig[0].cloumnDefs, function (value, key) {
            if (value.displayName == "P2P_PO_EstimatedDeliveryDate") {
                returnValue = true;
            }
        });
        return returnValue;
    }

    //Acknowledge Order Button Function.
    //$scope.acknowledgeOrder = function () {
    //    showLoader();
    //    var urls = RESTURLs.SM1_Controller_AcknowledgeOrder + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&partnerCode=" + $scope.dataModel.orderData.partner.id + "&orderSource=" + $scope.dataModel.orderData.source.id;
    //    var getacknowledgeOrder = httpService.directhttp({
    //        "url": urls,
    //        "method": "GET",
    //        "timeout": 60000
    //    });
    //    getacknowledgeOrder
    //        .then(function (response) {
    //            if (response === true) {
    //                acknowledgeResult('success');
    //                setTimeout(function () {
    //                    window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
    //                }, 2500);
    //            }
    //            else {
    //                acknowledgeResult('error');
    //            }
    //        }).catch(function (error) {
    //            acknowledgeResult('error');
    //        });
    //};

    $scope.acknowledgeOrder = function () {
        showLoader();
        if (p2pDetailsService.getGridErrorCount() <= 0) {
            var isFacilitateClient = isFacilitateToClient();
            var dd = p2pDetailsService.getQueryStringValue("dd");
            var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
            if (isFacilitateClient != true) {
                var urls = RESTURLs.SM1_Controller_AcknowledgeOrder + "&dd=" + dd + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&partnerCode=" + $scope.dataModel.orderData.partner.id + "&orderSource=" + $scope.dataModel.orderData.source.id;
                var getacknowledgeOrder = httpService.directhttp({
                    "url": urls,
                    "method": "GET",
                    "timeout": 60000
                });
            }
            else {
                var NewitemsArray = [];
                for (var i = 0; i < $scope.dataModel.orderData.items.length; i++) {
                    var item = {
                    };
                    item["orderItemId"] = $scope.dataModel.orderData.items[i].id;
                    item["estimatedDeliveryDate"] = convertDate($scope.dataModel.orderData.items[i].estimatedDeliveryDate);
                    item["promisedDate"] = convertDate($scope.dataModel.orderData.items[i].promisedDate);
                    NewitemsArray.push(item);
                }
                var urls = RESTURLs.SM1_Controller_AcknowledgeOrderWithEstimatedDeliveryDate + "?dd=" + dd + "&bpc=" + bpc;
                var getacknowledgeOrder = httpService.directhttp({
                    "url": urls,
                    "method": "POST",
                    "timeout": 60000,
                    "data": {
                        "oloc": 107,
                        "documentCode": $scope.dataModel.orderData.documentCode,
                        "partnerCode": $scope.dataModel.orderData.partner.id,
                        "orderSource": $scope.dataModel.orderData.source.id,
                        "estimatedDeliveryDate": NewitemsArray
                    }
                });
            }

            getacknowledgeOrder
                .then(function (response) {
                    if (response === true) {
                        acknowledgeResult('success');
                        setTimeout(function () {
                            window.location.href = APPCONSTANTS.userPreferences.Smart1PortalURL;
                        }, 2500);
                    }
                    else {
                        acknowledgeResult('error');
                    }
                }).catch(function (error) {
                    acknowledgeResult('error');
                });
        } else {
            hideLoader();
            var showFailureMessage = {
                type: "error",
                message: "Mandatory fields are missing",
                buttons: [{
                    "title": "OK",
                    "result": "yes"
                }]
            }
            notification.notify(showFailureMessage);
            return false;
        }
    };

    //Acknowledge Result function will return the message with respect to type passed from acknowledgeOrder function
    function acknowledgeResult(type) {
        if (type == 'success')
            var msg = $translate.instant("P2P_PO_OrderAcknowledgedSuccessfully");
        else
            var msg = $translate.instant("P2P_PO_OrderAcknowledgedError");

        var acknowledgeOrderMessage = {
            type: type,
            message: msg,
            buttons: [{
                "title": "OK",
                "result": "YES"
            }]
        }
        hideLoader();
        notificationPopUp(acknowledgeOrderMessage);
    }
    //Order's module dropdown Congigurations
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };

    //Check's the status of the Document
    $scope.hideOrderTrackStatus = false;
    if (($scope.dataModel.orderData.status.id == 1 && $scope.dataModel.orderData.source.id != 2) || $scope.IsSupplier == true)
        $scope.hideOrderTrackStatus = true;


    //Function to Hide Popup
    $scope.ordPopUpOnHideCallback = function () {
        $scope.showtsPopup = false;
    };

    $scope.tsPopupUrl = getTrackStatusUrl();
    $scope.showtsPopup = false;

    //To get Track Status data
    $scope.ShowTrackStatus = function () {
        $scope.tsPopupUrl = getTrackStatusUrl();
        $scope.showtsPopup = true;
    };

    $scope.showwithdrawOrder = false;
    if (($scope.dataModel.orderData.status.id == 21 || $scope.dataModel.orderData.status.id == 22) && $scope.IsSupplier == false && ($scope.dataModel.orderData.orderContact.id == APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode) && (_.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.CREATE_ORDER) > -1))
        $scope.showwithdrawOrder = true;

    $scope.withdrawOrder = function () {
        showLoader();
        var url = RESTURLs.SM1_Controller_withdrawOrderUrl + "&wfDocTypeId=" + $scope.dataModel.orderData.type.id + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&userId=" + APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode + "&bpc=" + APPCONSTANTS.userPreferences.EncryptedBPC;
        var withdrawOrder = httpService.directhttp({
            "url": url,
            "method": "GET",
            "timeout": 60000
        });
        withdrawOrder
            .then(function (response) {
                if (response == "true") {
                    var withdrawOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_withdrawOrderMessage"));
                    hideLoader();
                    notification.notify(withdrawOrderMessage);
                    setTimeout(function () {
                        window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                    }, 2500);
                }
                else {
                    hideLoader();
                    orderMesssage('error', $translate.instant("P2P_PO_withdrawOrderError"));

                }
            }).catch(function (error) {
                hideLoader();
                orderMesssage('error', $translate.instant("P2P_PO_withdrawOrderError"));

            });
    }
    //Will hit respective service with parameters.
    function getTrackStatusUrl() {
        if ($scope.dataModel != undefined) {
            return RESTURLs.SM1_Controller_TrackStatus + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&documentType=" + $scope.dataModel.orderData.type.id + "&bpc=" + APPCONSTANTS.userPreferences.EncryptedBPC;
        }
    }

    // Comments and attachments popup code
    $scope.showComments = false;
    $scope.showCommentsPopup = function () {
        if ($scope.dataModel.orderData.documentCode == 0) {
            var commentsUnsavedConfig = {
                type: "warning",
                message: "<p class='left-align'>" + $translate.instant("COMMENT_UNSAVED_DOC") + "</p>",
                buttons: [
                { "title": "OK", "result": "OK" }
                ]
            }
            notification.notify(commentsUnsavedConfig, function (response) {
                if (response.result === "OK") {
                    //do nothing.. and dont show comments popup.
                }
            });
        } else {
            $scope.showComments = true;
        }       
    }

    $scope.onCommentsClose = function () {
        $scope.showComments = false;
    }

    $scope.comment = {
        config: {
            "EnableLeftPanel": true,
            "CommentObjectType": "GEP.Cumulus.P2P.Order",
            "AttachmentType": "GEP.Cumulus.P2P.Attachment",
            "IsEditable": true,
            "SubAppCode": 107,
            "CommentLeftPanelTitle": "Order",
            "CommentLeftPanelSubTitle": $scope.dataModel.orderData.number,
            "CommentObjectID": $scope.dataModel.orderData.documentCode,
            "CommentType": 1,
            "HideSharing": false,
            "HideAttachment": false,
            "CommentHeaderTitle": "comment",
        },
        Data: $scope.dataModel.orderData
    };

    //Create Invoice Button Function.

    function createInvoiceFromOrder() {
        confirmCreateInvoiceFromOrder(1);
    };

    function confirmCreateInvoiceFromOrder(invoiceType) {
        var orderId = $scope.dataModel.orderData.documentCode;
        var partnerCode = $scope.dataModel.orderData.partner.id;
        if (invoiceType > 0) {
            createInvoiceOrder(orderId, partnerCode, invoiceType, function (invoiceId) {
                if (invoiceId && invoiceId != '0') {
                    setTimeout(function () {
                        window.location.href = RESTURLs.SM1_Controller_InvoiceRedirectURL + "&dd=" + invoiceId;
                    }, 2500);
                }
                else
                    InvoiceFromOrderResult('UnableToCreateInvoice');
            });
        }
        else {
            InvoiceFromOrderResult('error');
        }
    };

    function createInvoiceOrder(orderId, partnerCode, invoiceType, callBackFunction) {
        var returnVal;
        var dd = p2pDetailsService.getQueryStringValue("dd");
        var urls = RESTURLs.SM1_Controller_CreateInvoiceFromOrder + "&dd=" + dd;
        var getCreateInvoiceFromOrder = httpService.directhttp({
            "url": urls,
            "method": "POST",
            "timeout": 60000,
            "data": {
                "orderId": orderId,
                "partnerCode": partnerCode,
                "invoiceType": invoiceType
            }
        });
        getCreateInvoiceFromOrder
           .then(function (response) {
               returnVal = response;
               if (typeof callBackFunction == 'function') {
                   InvoiceFromOrderResult('success');
                   callBackFunction(response);
               }
               else {
                   InvoiceFromOrderResult('error');
               }
           }).catch(function (error) {
               InvoiceFromOrderResult('error');
           });

        return returnVal;
    };

    function InvoiceFromOrderResult(type) {
        if (type == 'success') {
            var msg = $translate.instant("P2P_Order_CreateInvoiceSuccessfully");
        }
        else if (type == ' UnableToCreateInvoice') {
            var msg = $translate.instant("P2P_PO_UnableToCreateInvoice");
        }
        else
            var msg = $translate.instant("P2P_PO_CreateInvoiceError");

        var InvoiceFromOrderResultMessage = {
            type: type,
            message: msg,
            buttons: [{
                "title": "OK",
                "result": "YES"
            }]
        }
        hideLoader();
        notificationPopUp(InvoiceFromOrderResultMessage);
    }

    //Code for Change Order/Revoke Change Order, Change Request/Revoke Change Request,Sent to Buyer and Accept Change Request/Reject Change Request --Start--Balaji
    $scope.showCreateChangeOrder = false;
    if (($scope.dataModel.orderData.status.id == 25 || $scope.dataModel.orderData.status.id == 41) && !$scope.IsSupplier && ($scope.dataModel.orderData.source.id != 10 || $scope.isInternalCOFinalize == true) && $scope.dataModel.orderData.closingOrderStatus != 124 && $scope.dataModel.orderData.status.id != 121) {
        $scope.showCreateChangeOrder = true;
    }

    $scope.showcancelChangeOrder = false;
    if (($scope.dataModel.orderData.status.id == 1) && ($scope.dataModel.orderData.source.id == 5 || $scope.dataModel.orderData.source.id == 6) && !$scope.IsSupplier) {
        $scope.showcancelChangeOrder = true;
    }

    $scope.showcancelInternalChangeOrder = false;
    if ($scope.dataModel.orderData.source.id == 10 && $scope.isInternalCOFinalize == false && !$scope.IsSupplier) {
        $scope.showcancelInternalChangeOrder = true;
    }

    $scope.showCreateChangeRequest = false;
    if (($scope.dataModel.orderData.status.id == 41 || $scope.dataModel.orderData.status.id == 41) && $scope.IsSupplier && $scope.dataModel.orderData.closingOrderStatus != 124 && $scope.dataModel.orderData.status.id != 121) {
        $scope.showCreateChangeRequest = true;
    }

    $scope.showcancelChangeRequest = false;
    if ($scope.dataModel.orderData.status.id == 1 && $scope.dataModel.orderData.source.id == 6 && $scope.IsSupplier && $scope.dataModel.orderData.closingOrderStatus != 124 && $scope.dataModel.orderData.status.id != 121) {
        $scope.showcancelChangeRequest = true;
    }


    //to show accept changes button.
    $scope.showAcceptChanges = false;
    if ($scope.dataModel.orderData.status.id == 42 && $scope.dataModel.orderData.source.id == 6 && !$scope.IsSupplier && $scope.dataModel.orderData.closingOrderStatus != 124 && $scope.dataModel.orderData.status.id != 121) {
        $scope.showAcceptChanges = true;
    }

    //to show reject changes button.
    $scope.showRejectChanges = false;
    if ($scope.dataModel.orderData.status.id == 42 && $scope.dataModel.orderData.source.id == 6 && !$scope.IsSupplier && $scope.dataModel.orderData.closingOrderStatus != 124 && $scope.dataModel.orderData.status.id != 121) {
        $scope.showRejectChanges = true;
    }

    //to show sento buyer button.
    $scope.showSentToBuyer = false;
    if ($scope.dataModel.orderData.status.id == 1 && $scope.dataModel.orderData.source.id == 6 && $scope.IsSupplier) {
        $scope.showSentToBuyer = true;
    }



    $scope.showChangeOrderSentToSupplier = false;
    if ($scope.dataModel.orderData.status.id == 1 && $scope.dataModel.orderData.source.id == 5 && !$scope.IsSupplier) {
        $scope.showChangeOrderSentToSupplier = true;
    }

    $scope.disableAfterClickExt = false;//use to disable button after button click.
    $scope.createChangeRequestOrder = function (orderSource) {
        var errormsg;
        var rule = [];
        if (orderSource == 5) {
            if (configClientConstants.ChangeOrderRule != undefined)
                rule = configClientConstants.ChangeOrderRule;

        }
        else if (orderSource == 6) {
            if (configClientConstants.ChangeOrderRule != undefined)
                rule = configClientConstants.serviceChangeRequest;
        }
        $scope.dataModel.orderData.isSupplier = $scope.IsSupplier;
        RuleEngine.setRules('', $scope.dataModel, rule, '', 'header');
        RuleEngine.execute(function (e) {
            if (e.success) {
                $scope.disableAfterClickExt = true;
                showLoader();
                var dd = p2pDetailsService.getQueryStringValue("dd");
                var url = RESTURLs.SM1_Controller_createChangeRequestOrderUrl + "&dd=" + dd + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&orderSoruce=" + orderSource + "&documentNumber=" + $scope.dataModel.orderData.number + "&documentName=" + $scope.dataModel.orderData.name + "&BlanketDocumentCode=" + $scope.dataModel.orderData.blanketDocumentCode + "&bpc=" + APPCONSTANTS.userPreferences.EncryptedBPC;
                var createChangeRequestOrder = httpService.directhttp({
                    "url": url,
                    "method": "GET",
                    "timeout": 60000
                });
                createChangeRequestOrder
                    .then(function (response) {
                        if (response.documentCode > 0) {
                            if (orderSource == 5) {
                                var ChangeOrderCreatedSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_ExternalChangeOrderCreatedSuccessfully"));
                                hideLoader();
                                notification.notify(ChangeOrderCreatedSuccessfully);
                            }
                            if (orderSource == 6) {
                                var ChangeRequestCreatedSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_ChangeRequestCreatedSuccessfully"));
                                hideLoader();
                                notification.notify(ChangeRequestCreatedSuccessfully);
                            }
                            if (orderSource == 10) {
                                var InternalChangeOrderCreatedSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_InternalChangeOrderCreatedSuccessfully"));
                                hideLoader();
                                notification.notify(InternalChangeOrderCreatedSuccessfully);
                            }
                            setTimeout(function () {
                                window.location.href = window.top.location.origin + '/P2P/Order?dd=' + response.Url + '&oloc=216#/po';
                            },
                                3000);
                        }
                        else if (response.documentCode == -1) {
                            hideLoader();
                            errormsg= orderMesssage('error', $translate.instant("P2P_PO_ChangeRequestAlreadyExsits"));
                        }
                        else if (response.documentCode == -2) {
                            hideLoader();
                            errormsg= orderMesssage('error', $translate.instant("P2P_PO_ChangeOrderAlreadyExsits"));
                        }
                        else if (response.documentCode == -3) {
                            hideLoader();
                            errormsg= orderMesssage('error', $translate.instant("P2P_PO_InternalChangeOrderAlreadyExsits"));
                        }
                        else {
                            hideLoader();
                            if (orderSource == 5)
                                errormsg=   orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingExternalChangeOrder"));
                            if (orderSource == 10)
                                errormsg=  orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingInternalChangeOrder"));
                            if (orderSource == 6)
                                errormsg= orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingChangeRequest"));
                        }
                        notification.notify(errormsg);
                    }).catch(function (error) {
                        hideLoader();
                        if ($scope.dataModel.orderData.source.id == 5)
                            orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingExternalChangeOrder"));
                        if ($scope.dataModel.orderData.source.id == 10)
                            orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingInternalChangeOrder"));
                        if ($scope.dataModel.orderData.source.id == 6)
                            orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingChangeRequest"));

                    });
            }
            else {
                var showFailureMessage = {
                    type: "error",
                    message: $translate.instant(e.failedRules[0].error),
                    buttons: [{
                        "title": "OK",
                        "result": "yes"
                    }]
                }
                notification.notify(showFailureMessage, function (response) {
                    if (response.result === "yes")
                        onError();
                });

                return;
            }
        });
    }

    $scope.cancelChangeRequestOrder = function (orderSource) {
        var myconfig = {
            type: "confirm",
            message: "<p class='left-align'>" + $translate.instant("P2P_PO_RevokeConfirmation") + "</p>",
            //checkMessage: "Do not show again",
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
        }
        notification.notify(myconfig, function (response) {
            if (response.result === "yes") {
                $scope.confirmCancelChangeRequestOrder(orderSource);
            }
            else {
                return false;
            }
        });
    }
    $scope.confirmCancelChangeRequestOrder = function (orderSource) {
        showLoader();
        var dd = p2pDetailsService.getQueryStringValue("dd");
        var url = RESTURLs.SM1_Controller_cancelChangeRequestOrderUrl + "&dd=" + dd + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&orderSource=" + orderSource;
        var CancelChangeRequestOrder = httpService.directhttp({
            "url": url,
            "method": "GET",
            "timeout": 60000
        });
        CancelChangeRequestOrder
            .then(function (response) {
                if (response.documentCode > 0) {
                    if (orderSource == 5) {
                        var ChangeOrderRevokedSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_ExternalChangeOrderRevokedSuccessfully"));
                        hideLoader();
                        notification.notify(ChangeOrderRevokedSuccessfully);
                    }
                    if (orderSource == 6) {
                        var ChangeRequestRevokedSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_ChangeRequestRevokedSuccessfully"));
                        hideLoader();
                        notification.notify(ChangeRequestRevokedSuccessfully);
                    }
                    if (orderSource == 10) {
                        var InternalChangeOrderRevokedSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_InternalChangeOrderRevokedSuccessfully"));
                        hideLoader();
                        notification.notify(InternalChangeOrderRevokedSuccessfully);
                    }
                    setTimeout(function () {
                        window.location.href = window.top.location.origin + '/P2P/Order?dd=' + response.Url + '&oloc=216#/po';
                    },
                        3000);
                }
                else {
                    hideLoader();
                    if (orderSource == 5)
                        orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileRevokingExternalChangeOrder"));
                    if (orderSource == 10)
                        orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileRevokingInternalChangeOrder"));
                    if (orderSource == 6)
                        orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileRevokingChangeRequest"));

                }
            }).catch(function (error) {
                hideLoader();
                if ($scope.dataModel.orderData.source.id == 5)
                    orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingExternalChangeOrder"));
                if ($scope.dataModel.orderData.source.id == 10)
                    orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingInternalChangeOrder"));
                if ($scope.dataModel.orderData.source.id == 6)
                    orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingChangeRequest"));
            });
    }
    $scope.AcceptChangeRequest = function (orderSource) {
        showLoader();
        var url = RESTURLs.SM1_Controller_createChangeRequestOrderUrl + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&orderSoruce=" + orderSource + "&documentNumber=" + $scope.dataModel.orderData.number + "&documentName=" + $scope.dataModel.orderData.name + "&BlanketDocumentCode=" + $scope.dataModel.orderData.blanketDocumentCode + "&bpc=" + APPCONSTANTS.userPreferences.EncryptedBPC;
        var AcceptChangeRequest = httpService.directhttp({
            "url": url,
            "method": "GET",
            "timeout": 60000
        });
        AcceptChangeRequest
           .then(function (response) {
               if (response.documentCode > 0) {
                   var AcceptChangeRequestSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_AcceptChangeRequestSuccessfully"));
                   hideLoader();
                   notification.notify(AcceptChangeRequestSuccessfully);
                   setTimeout(function () {
                       window.location.href = window.top.location.origin + '/P2P/Order?dd=' + response.Url + '&oloc=216#/po';
                   },
                       3000);
               }
               else {
                   hideLoader();
                   orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileAcceptChangeRequest"));
               }
           }).catch(function (error) {
               hideLoader();
               orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileAcceptChangeRequest"));
           });
    }
    $scope.RejectChangeRequest = function () {
        showLoader();
        var url = RESTURLs.SM1_Controller_RejectChangeRequestUrl + "&documentCode=" + $scope.dataModel.orderData.documentCode;
        var RejectChangeRequest = httpService.directhttp({
            "url": url,
            "method": "GET",
            "timeout": 60000
        });
        RejectChangeRequest
           .then(function (response) {
               if (response.documentCode > 0) {
                   var RejectChangeRequestSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_RejectChangeRequestSuccessfully"));
                   hideLoader();
                   notification.notify(RejectChangeRequestSuccessfully);
                   setTimeout(function () {
                       window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                   }, 2500);
               }
               else {
                   hideLoader();
                   orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileRejectChangeRequest"));
               }
           }).catch(function (error) {
               hideLoader();
               orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileRejectChangeRequest"));
           });
    }
    $scope.SendToBuyer = function () {
        showLoader();
        formatDataModel();
        var dd = p2pDetailsService.getQueryStringValue("dd");
        var bpc = APPCONSTANTS.userPreferences.EncryptedBPC;
        var urls = RESTURLs.SM1_Controller_Send_to_Supplier + "?dd=" + dd + "&bpc=" + bpc + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&partnerCode=" + $scope.dataModel.orderData.partner.id + "&orderSource=" + $scope.dataModel.orderData.source.id + "&transmissionMode=" + $scope.dataModel.orderData.trasmission.id + "&transmissionValue=" + $scope.dataModel.orderData.trasmission.name + "&sourceSystemId=0&resent=false";
        var SendToBuyerService = httpService.directhttp({
            "url": urls,
            "method": "GET",
            "timeout": 60000
        });
        SendToBuyerService.then(function (response) {
            console.log(response);
            if (response == true) {
                var responseMessage = {
                    type: "success",
                    message: $translate.instant("P2P_Order_OrderSenttoBuyerSuccessfully"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                notificationPopUp(responseMessage);
                setTimeout(function () {
                    window.location.href = APPCONSTANTS.userPreferences.Smart1PortalURL;
                }, 2500);
            }
            else {
                var responseMessage = {
                    type: "error",
                    message: $translate.instant("P2P_Order_ErroroccuredwhileSendingOrdertoBuyer"),
                    buttons: [{
                        "title": "OK",
                        "result": "YES"
                    }]
                }
                notificationPopUp(responseMessage);
            }
            hideLoader();

        }).catch(function (errorCallback) {
            var sentToBuyerMessage = {
                type: "error",
                message: errorCallback.statusText,
                buttons: [{
                    "title": "OK",
                    "result": "YES"
                }]
            }
            hideLoader(true);
            notificationPopUp(sentToBuyerMessage);
        });
    }
    //Code for Change Order/Revoke Change Order , Change Request/Revoke Change Request ,Sent to Buyer and Accept Change Request/Reject Change Request --END--Balaji

    function CreateAddress(addressLine1, addressLine2, addressLine3, city, state, country, zipCode) {
        var primaryAddress = addressLine1 == null || addressLine1 == ''
                                         ? ''
                                         : ", " + addressLine1.trim();
        primaryAddress += addressLine2 == null || addressLine2 == ''
                                      ? ''
                                      : ", " + addressLine2.trim();
        primaryAddress += addressLine3 == null || addressLine3 == ''
                                      ? ''
                                      : ", " + addressLine3.trim();
        primaryAddress += city == null || city == ''
                                      ? ''
                                      : ", " + city.trim();
        primaryAddress += state == null || state == ''
                                      ? ''
                                      : ", " + state.trim();
        primaryAddress += country == null || country == ''
                                      ? ''
                                      : ", " + country.trim();
        primaryAddress += zipCode == null || zipCode == ''
                                      ? ''
                                      : ", " + zipCode;
        primaryAddress = primaryAddress.lastIndexOf(',') == primaryAddress.length - 1
                                      ? primaryAddress.substring(0, primaryAddress.length - 1)
                                      : primaryAddress;

        if (primaryAddress != '')
            primaryAddress = primaryAddress.substring(1);

        return primaryAddress;
    }

    function AddRulesToAccountingEntities() {
        var accountingEntites = APPCONSTANTS.defaultSplitValues;
        var gridConfig = p2pDetailsService.getGridConfig();
        _.each(accountingEntites, function (entities) {
            if (entities.IsMandatory) {
                _.each(gridConfig[1].cloumnDefs, function (config) {
                    var transName = $translate.instant("" + config.displayName + "");
                    transName = transName.split(' ');
                    transName = transName[0] + '' + transName[1];
                    if (entities.FieldName == transName) {
                        config.rules = ["emptyCheck"];
                    }
                });
            }

        });
        p2pDetailsService.setGridConfig(gridConfig);
    }

    function convertDate(dateToConvert) {
        if (typeof dateToConvert != 'undefined' && dateToConvert != null && dateToConvert.indexOf('/Date(') > -1) {
            var res = dateToConvert.replace("/Date(", "");
            var datestring = res.replace(")/", "");
            var convertedDate = new Date(parseInt(datestring));
        }
        else {
            return dateToConvert;
        }
        return convertedDate;
    }

      $scope.disableAfterClickInt = false;
      $scope.createInternalChangeRequestOrder = function (orderSource) {
        var errormsg;
        var rule = [];
        if (configClientConstants.ChangeOrderRule != undefined)
            rule = configClientConstants.ChangeOrderRule;

        RuleEngine.setRules('', $scope.dataModel, rule, '', 'header');
        RuleEngine.execute(function (e) {
            if (e.success) {
                $scope.disableAfterClickInt = true;//disable button after initiate the call.
                showLoader();
                OldOrderData = angular.copy($scope.dataModel);
                var dd = p2pDetailsService.getQueryStringValue("dd");
                var url = RESTURLs.SM1_Controller_createChangeRequestOrderUrl + "&dd=" + dd + "&documentCode=" + $scope.dataModel.orderData.documentCode + "&orderSoruce=" + orderSource + "&documentNumber=" + $scope.dataModel.orderData.number + "&documentName=" + $scope.dataModel.orderData.name + "&BlanketDocumentCode=" + $scope.dataModel.orderData.blanketDocumentCode + "&bpc=" + APPCONSTANTS.userPreferences.EncryptedBPC;
                var createInternalChangeRequestOrder = httpService.directhttp({
                    "url": url,
                    "method": "GET",
                    "timeout": 60000
                });
                createInternalChangeRequestOrder
                    .then(function (response) {
                        if (response.documentCode > 0) {

                            var InternalChangeOrderCreatedSuccessfully = orderMesssage("success", $translate.instant("P2P_PO_InternalChangeOrderCreatedSuccessfully"));
                            hideLoader();
                            notification.notify(InternalChangeOrderCreatedSuccessfully);
                            setTimeout(function () {
                                window.location.href = window.top.location.origin + '/P2P/Order?dd=' + response.Url + '&oloc=216#/po';
                            },
                                3000);
                        }

                        else {
                            hideLoader();
                            errormsg= orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingInternalChangeOrder"));
                        }
                        notification.notify(errormsg);
                    }).catch(
                    function (error) {
                        hideLoader();
                        orderMesssage('error', $translate.instant("P2P_PO_ErrorOccuredWhileCreatingInternalChangeOrder"));
                    });
            }
            else {
                var showFailureMessage = {
                    type: "error",
                    message: $translate.instant(e.failedRules[0].error),
                    buttons: [{
                        "title": "OK",
                        "result": "yes"
                    }]
                }
                notification.notify(showFailureMessage);
            }
        });
    }
    // Ad Hoc Manage Approvals click function.
    $scope.manageApprovals = function () {
        // For Redirection to new manage approvals url.
        // stopAutoSaveTimer();
        $state.go('po.approvals');
    }
    $scope.viewChanges = function () {
        // stopAutoSaveTimer();
        $state.go('po.viewChanges', { changeType: 'reviewChange' });
    }
    $scope.changeHistory = function () {
        // stopAutoSaveTimer();
        $state.go('po.changeHistory', { changeType: 'changeHistory' });
    }
    $scope.showViewChanges = false;
    if (($scope.dataModel.orderData.status.id == 1 || $scope.dataModel.orderData.status.id == 21 || $scope.dataModel.orderData.status.id == 22 || $scope.dataModel.orderData.status.id == 23 || $scope.dataModel.orderData.status.id == 24 || $scope.dataModel.orderData.status.id == 25 || $scope.dataModel.orderData.status.id == 41 || $scope.dataModel.orderData.status.id == 42 || $scope.dataModel.orderData.status.id == 169 || $scope.dataModel.orderData.status.id == 121) && ($scope.dataModel.orderData.source.id == 5 || $scope.dataModel.orderData.source.id == 10 || $scope.dataModel.orderData.source.id == 6)) {
        $scope.showViewChanges = true;
    }


    $scope.showDeleteBtn = false;
    if (($scope.dataModel.orderData.status.id == 1 || $scope.dataModel.orderData.status.id == 23 || $scope.dataModel.orderData.status.id == 59 || $scope.dataModel.orderData.status.id == 24 || $scope.dataModel.orderData.status.id == 169) && $scope.dataModel.orderData.createdBy.id == APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode && $scope.dataModel.orderData.source.id != 10 && $scope.dataModel.orderData.source.id != 5 && !$scope.IsSupplier) {
        $scope.showDeleteBtn = true;
    }


    $scope.showManageApprovals = false;
    if (!$scope.IsSupplier && _.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.ACTIVITY_FOR_MANAGE_APPROVALS) > -1) {
        $scope.showManageApprovals = true;
    }

    $scope.deleteOrder = function () {
        ShowConfirmationMessage("Are you sure you want to delete this order?", orderDeleteConfirm, orderDeleteNo)
    }

    var orderDeleteConfirm = function () {
        var documentCode = $scope.dataModel.orderData.documentCode;
        var url = RESTURLs.SM1_Controller_DeleteOrder + "&documentcode=" + documentCode;
        var DeleteOrderService = httpService.directhttp({
            "url": url, "timeout": 10000, "method": "GET"
        });
        DeleteOrderService.then(function (res) {
            if (res != '' && res == true) {

                var saveOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_DeleteOrderSuccess"));
                notification.notify(saveOrderMessage, function (response) {
                    if (response.result === "yes") {
                    }

                });
                setTimeout(function () {
                    hideLoader();
                    window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                }, 2500);
            }
            else {
                var deleteOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_DeleteOrderError"));
                notificationPopUp(deleteOrderErrorMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader(true);
            $scope.showPopup = false;
            console.log(errorCallback.statusText);
        });
    }

    var orderDeleteNo = function () {

    }

    function applyUserDefaultShipTo()
    {
        if ($scope.dataModel.orderData.shipTo == null || $scope.dataModel.orderData.shipTo.id == 0)
        {
            if (APPCONSTANTS.userPreferences.ShipToLocation != null) {
                var defaultShipTo = {};
                var shipAddress;
                if (APPCONSTANTS.userPreferences.ShipToLocation.Address != null)
                    shipAddress = p2pDetailsService.CreateAddress(APPCONSTANTS.userPreferences.ShipToLocation.Address.AddressLine1,
                        APPCONSTANTS.userPreferences.ShipToLocation.Address.AddressLine2, APPCONSTANTS.userPreferences.ShipToLocation.Address.AddressLine3, APPCONSTANTS.userPreferences.ShipToLocation.Address.City, APPCONSTANTS.userPreferences.ShipToLocation.Address.StateCode, APPCONSTANTS.userPreferences.ShipToLocation.Address.CountryCode, APPCONSTANTS.userPreferences.ShipToLocation.Address.Zip);

                defaultShipTo.id = APPCONSTANTS.userPreferences.ShipToLocation.ShiptoLocationId;
                defaultShipTo.name = (APPCONSTANTS.userPreferences.ShipToLocation.ShiptoLocationName);
                defaultShipTo.address = shipAddress;

                $scope.dataModel.orderData.shipTo = defaultShipTo;
            }

        }
    }

    function applyDefaultBillTo(headerEntityId)
    {
        if ($scope.dataModel.orderData.billTo == null || $scope.dataModel.orderData.billTo.id == 0 || $scope.dataModel.orderData.billTo.id == undefined) {

            if (APPCONSTANTS.userPreferences.BillToLocation != null) {
                var defaultBillTo = {};
                defaultBillTo.id = APPCONSTANTS.userPreferences.BillToLocation.BillToLocID;
                defaultBillTo.name = APPCONSTANTS.userPreferences.BillToLocation.BillToLocName;
                defaultBillTo.address = APPCONSTANTS.userPreferences.BillToLocation.BillToLocAddress;
                defaultBillTo.contact = APPCONSTANTS.userPreferences.BillToLocation.BillToLocContact;
                defaultBillTo.selectedHeaderEntityId = headerEntityId;
                defaultBillTo.enabled = $scope.dataModel.orderData.billTo.enabled;
                $scope.dataModel.orderData.billTo = defaultBillTo;
            }
            else {
                setDefaultBillToLocation(headerEntityId);

            }
        }
    }

    function checkDefaultValues() {

        if (!$scope.dataModel.orderData.ItemChargesForHeader) {
            $scope.dataModel.orderData.ItemChargesForHeader = [];
        }

    }
    function _showcopyBtn()
    {
        if ($scope.dataModel.orderData.documentCode == 0)
        {
            $scope.showCopyBtn = false;
         }
         else if (_clientSpecificConfigSettings.specificSettings.allowCopy && _.contains(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.CREATE_ORDER) && $scope.dataModel.orderData.status.id != 121 && $scope.dataModel.orderData.closingOrderStatus != 124 && !$scope.IsSupplier && $scope.dataModel.orderData.source.id != $scope.orderSource.ReleaseOrder && ($scope.dataModel.orderData.status.id == 21 || $scope.dataModel.orderData.status.id == 22 || $scope.dataModel.orderData.status.id == 41 || $scope.dataModel.orderData.status.id == 25 || $scope.dataModel.orderData.status.id == 1 || $scope.dataModel.orderData.status.id == 24 || $scope.dataModel.orderData.status.id == 23 || $scope.dataModel.orderData.status.id==42)) {
             $scope.showCopyBtn = true;
        }
     }
     $scope.showCopyBtn = false;
     _showcopyBtn();
    
  

    $scope.showCloseBtn = false;
    if ( $scope.dataModel.orderData.invoicingStatus != null && $scope.dataModel.orderData.receivingStatus != null && $scope.dataModel.orderData.status.id != 121) {
        if (($scope.dataModel.orderData.createdBy.id == APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode || _.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.CHANGE_CANCEL_ORDER) > -1)
          && ($scope.dataModel.orderData.closingOrderStatus != 124)
          && ((($scope.dataModel.orderData.source.id == 1 || $scope.dataModel.orderData.source.id == 2 || $scope.dataModel.orderData.source.id == 4 || $scope.dataModel.orderData.source.id == 9)
          && (($scope.dataModel.orderData.status.id == 25 || $scope.dataModel.orderData.status.id == 41)
          && (($scope.dataModel.orderData.receivingStatus.id == 0 && ($scope.dataModel.orderData.invoicingStatus.id == 4 || $scope.dataModel.orderData.invoicingStatus.id == 3 || $scope.dataModel.orderData.invoicingStatus.id == 2 ||
               $scope.dataModel.orderData.invoicingStatus.id == 1 || $scope.dataModel.orderData.invoicingStatus.id == 0)) || ($scope.dataModel.orderData.receivingStatus.id == 63 &&
          ($scope.dataModel.orderData.invoicingStatus.id == 4 || $scope.dataModel.orderData.invoicingStatus.id == 0 || $scope.dataModel.orderData.invoicingStatus.id == 2))
          || ($scope.dataModel.orderData.receivingStatus.id == 64 && ($scope.dataModel.orderData.invoicingStatus.id == 4 || $scope.dataModel.orderData.invoicingStatus.id == 0 ||
          $scope.dataModel.orderData.invoicingStatus.id == 2 || $scope.dataModel.orderData.invoicingStatus.id == 1))
          || ($scope.dataModel.orderData.receivingStatus.id == 66))))
          || (($scope.dataModel.orderData.source.id == 5) && ((($scope.dataModel.orderData.status.id == 22 || $scope.dataModel.orderData.status.id == 141
          || $scope.dataModel.orderData.status.id == 52 || $scope.dataModel.orderData.status.id == 41 || $scope.dataModel.orderData.status.id == 142) &&
      $scope.dataModel.orderData.receivingStatus.id != 65))
          || (($scope.dataModel.orderData.status.id == 25 || $scope.dataModel.orderData.status.id == 41) && (($scope.dataModel.orderData.receivingStatus.id == 0 && ($scope.dataModel.orderData.invoicingStatus.id == 4 ||
       $scope.dataModel.orderData.invoicingStatus.id == 3 || $scope.dataModel.orderData.invoicingStatus.id == 2 || $scope.dataModel.orderData.invoicingStatus.id == 1 ||
      $scope.dataModel.orderData.invoicingStatus.id == 0)) || ($scope.dataModel.orderData.receivingStatus.id == 63 && ($scope.dataModel.orderData.invoicingStatus.id == 4 ||
      $scope.dataModel.orderData.invoicingStatus.id == 0 || $scope.dataModel.orderData.invoicingStatus.id == 2))
          || ($scope.dataModel.orderData.receivingStatus.id == 64 && ($scope.dataModel.orderData.invoicingStatus.id == 4 || $scope.dataModel.orderData.invoicingStatus.id == 0 ||
       $scope.dataModel.orderData.invoicingStatus.id == 2 || $scope.dataModel.orderData.invoicingStatus.id == 1))
          || ($scope.dataModel.orderData.receivingStatus.id == 66)))))
          || (($scope.dataModel.orderData.source.id == 6) && (($scope.dataModel.orderData.status.id == 1 || $scope.dataModel.orderData.status.id == 24 ||
       $scope.dataModel.orderData.status.id == 42) && ($scope.dataModel.orderData.receivingStatus.id != 65))))// && (getValidationForClosingOrder()))
        {
            $scope.showCloseBtn = true;
        }

    }


    $scope.showCancelBtn = false;
    if ($scope.dataModel.orderData.source.id != 3
        && _.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.CHANGE_CANCEL_ORDER) > -1
        && !$scope.IsSupplier
        && $scope.dataModel.orderData.status.id != 1
        && $scope.dataModel.orderData.status.id != 21
        && $scope.dataModel.orderData.status.id != 22
        && $scope.dataModel.orderData.status.id != 23
        && $scope.dataModel.orderData.status.id != 24
        && $scope.dataModel.orderData.status.id != 26
        && ($scope.dataModel.orderData.status.id != 141 || $scope.dataModel.orderData.status.id != 142)
        && ($scope.dataModel.orderData.invoicingStatus.id == 0 || $scope.dataModel.orderData.invoicingStatus.id == 4)
        && ($scope.dataModel.orderData.receivingStatus.id == 0)
        && ($scope.dataModel.orderData.status.id != 121 && $scope.dataModel.orderData.status.id != 148 && $scope.dataModel.orderData.status.id != 149)
        && $scope.dataModel.orderData.closingOrderStatus != 124
        && _clientSpecificConfigSettings.specificSettings.allowCancelOrder){
        $scope.showCancelBtn = true;
    }

    $scope.showReopenBtn = false;
    if (!$scope.IsSupplier && ($scope.dataModel.orderData.createdBy.id == APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
              || _.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.CHANGE_CANCEL_ORDER) > -1)
              && ($scope.dataModel.orderData.closingOrderStatus == 124))
        $scope.showReopenBtn = true;

    function getValidationForClosingOrder() {
        var url = RESTURLs.SM1_Controller_getValidationForClosingOrder + "&documentCode=" + $scope.dataModel.orderData.documentCode;
        var getValidationForClosingOrder = httpService.directhttp({
            "url": url,
            "method": "GET",
            "timeout": 60000
        });
        getValidationForClosingOrder
           .then(function (response) {
               if (response) {
                   return response;
               }
               else {
                   hideLoader();
               }
           }).catch(function (error) {
               hideLoader();
           });
    }

    $scope.submiteCloseOrder = function () {
        // showLoader();

        var txtmsg = $scope.dataModel.orderData.matchType == '1' ? $translate.instant("P2P_PO_DoyouwantcloseorderFor2Way") : $translate.instant("P2P_PO_Doyouwantcloseorder");
        ShowConfirmationMessage(txtmsg, aftersubmiteCloseOrder)

        //The following commented code need to implement.
        //var documentCode = $scope.dataModel.orderData.documentCode;
        //var val = getValidationForClosingOrder();
        //if (val == '22')
        //{
        //    ShowConfirmationMessage($translate.instant("P2P_PO_Doyouwantdeletethosereceipt"), aftersubmiteCloseOrder)
        //}
        //else {
        //    var txtmsg = $scope.dataModel.orderData.matchType == '1' ? $translate.instant("P2P_PO_DoyouwantcloseorderFor2Way") : $translate.instant("P2P_PO_Doyouwantcloseorder");
        //    ShowConfirmationMessage(txtmsg, aftersubmiteCloseOrder)
        //    }

    }

    function aftersubmiteCloseOrder() {
        $scope.ShowCommonCommentPopup("CloseOrder");
    }
    function closeOrder() {
        showLoader();
        var documentCode = $scope.dataModel.orderData.documentCode;
        var url = RESTURLs.SM1_Controller_CloseOrder + "&orderId=" + documentCode;
        var closeOrderService = httpService.directhttp({
            "url": url, "timeout": 60000, "method": "GET"
        });
        closeOrderService.then(function (res) {
            if (res) {

                var closeOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_CloseOrderSuccess"));
                notification.notify(closeOrderMessage, function (response) {
                    if (response.result === "YES") {
                        hideLoader();
                        window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                    }
                });
            }
            else {
                var closeOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_CloseOrderError"));
                notificationPopUp(closeOrderErrorMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader(true);
            console.log(errorCallback.statusText);
        });
    }
    $scope.copyOrder = function () {
        showLoader();
        var documentCode = $scope.dataModel.orderData.documentCode;
        var ACECode = $scope.dataModel.orderData.headerEntity1 != null ? $scope.dataModel.orderData.headerEntity1.id : 0;
        var url = RESTURLs.SM1_Controller_CopyOrder + "&SourceOrderId=" + documentCode + "&ACEEntityDetailCode=" + ACECode + "&objOrderUI=" + $scope.dataModel.orderData;
        var copyOrderService = httpService.directhttp({
            "url": url, "timeout": 60000, "method": "GET"
        });
        copyOrderService.then(function (res) {
            if (res != null || res != undefined || res.DestinationOrderId>0) {

                var copyOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_CopyOrderSuccess"));
                notification.notify(copyOrderMessage, function (response) {
                    if (response.result === "YES") {                      
                       window.location.href = APPCONSTANTS.userPreferences.URLs.AppURL + "P2P/Order?dd=" + res.redirectionURL + "&oloc=216#/po";                    
                    }

                });
                setTimeout(function () {
                    hideLoader();
                    window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                }, 2500);
            }
            else {
                var CopyOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_CopyOrderError"));
                notificationPopUp(CopyOrderErrorMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader(true);
            console.log(errorCallback.statusText);
        });
    }
    $scope.submiteCancelOrder = function () {
        cancelOrderConfirmation("order");
    }
    $scope.reOpenOrder = function () {
        var documentCode = $scope.dataModel.orderData.documentCode;
        var url = RESTURLs.SM1_Controller_ReOpenOrder + "&orderId=" + documentCode;
        var ReOpenOrderService = httpService.directhttp({
            "url": url, "timeout": 60000, "method": "GET"
        });
        ReOpenOrderService.then(function (res) {
            showLoader();
            if (res != '' && res == true) {

                var ReOpenOrderMessage = orderMesssage("success", $translate.instant("P2P_PO_ReOpenOrderSuccess"));
                notification.notify(ReOpenOrderMessage, function (response) {
                    if (response.result === "yes") {
                    }

                });
                setTimeout(function () {
                    hideLoader();
                    window.location.href = RESTURLs.SM1_Controller_POLandingPageUrl;
                }, 2500);
            }
            else {
                var ReOpenOrderErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_ReOpenOrderError"));
                notificationPopUp(ReOpenOrderErrorMessage);
                hideLoader();
            }

        }).catch(function (errorCallback) {
            hideLoader(true);
            $scope.showPopup = false;
            console.log(errorCallback.statusText);
        });
    }
    //Create Receipt From Order
    $scope.CreateReceiptFromOrder = function () {

        if ($scope.dataModel.orderData.totalNumber < 0) {
            var TotalAmountNegativeWarningMsg = orderMesssage("error", $translate.instant("P2P_Common_TotalAmountNegativeWarning"));
            hideLoader();
            notificationPopUp(TotalAmountNegativeWarningMsg);
        }
        else if ($scope.dataModel.orderData.id > 0 && $scope.dataModel.orderData.status.id == 124) {

            //setting
            //if ($('#hdnAllowInvoiceOrReceiptForClosedOrder').val() != true) {
            var CreateReceiptFromOrderErrorMsg = orderMesssage("error", $translate.instant("P2P_PO_CreateReceiptFromOrderError"));
            hideLoader();
            notification.notify(CreateReceiptFromOrderErrorMsg);
            return;
            //}
        }
        if ((_.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.ACTIVITY_FOR_ISDESTRECEIVER) > -1 || _.indexOf(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.ACTIVITY_FOR_ISRECEIPT) > -1) && $scope.commonSettings.EnableMaterialReceiving) {
            var createReceipt = httpService.directhttp({
                "url": RESTURLs.SM1_Controller_CreateReceiptFromOrder,
                "method": "POST",
                "timeout": 6000,
                "data": JSON.stringify({ 'orderId': $scope.dataModel.orderData.documentCode, 'itemType': 0, 'objDocumentBU': null })
            });
            createReceipt.then(function (res) {
                if (res.documentCode && res.documentCode != "" && res.documentCode > 0) {
                    setTimeout(function () { window.location.href = RESTURLs.SM1_Controller_CreateReceipt + "&dd=" + res.result }, 3000);
                }
                else if (res.documentCode != "" && res.documentCode == -1) {
                    //alert(Resources.P2P_Order_UnableToCreateReceipt);
                    //createVw.actionInProgress = false;
                    var CreateReceiptFromOrderErrorMsg = orderMesssage("error", $translate.instant("P2P_Order_UnableToCreateReceipt"));
                    hideLoader();
                    notification.notify(CreateReceiptFromOrderErrorMsg);
                }
                else {
                    //alert(Resources.P2P_Order_UnableToCreateReceipt);
                    //createVw.actionInProgress = false;
                    var CreateReceiptFromOrderErrorMsg = orderMesssage("error", $translate.instant("Resources.P2P_Order_UnableToCreateReceipt"));
                    hideLoader();
                    notification.notify(CreateReceiptFromOrderErrorMsg);
                }
            });
        }

        else {
            var CreateReceiptFromOrderErrorMsg = orderMesssage("error", $translate.instant("P2P_Common_CantFlipMaterial"));
            hideLoader();
            notification.notify(CreateReceiptFromOrderErrorMsg);
        }
    }

 

    //Start - For ASN       
    $scope.showCreateASN = false;
    var materialItemsInOrder = false;
    if ($scope.dataModel.orderData.items) {
        for (var itemCounter = 0; itemCounter < $scope.dataModel.orderData.items.length; itemCounter++) {            
            if ($scope.dataModel.orderData.items[itemCounter].type.id == 1) {
                materialItemsInOrder = true;
                break;
            }
        }
    }
    
    if (($scope.dataModel.orderData.status.id == 25 || $scope.dataModel.orderData.status.id == 41) && $scope.IsSupplier && materialItemsInOrder && $scope.dataModel.orderData.isAllowCreateASN) {
        $scope.showCreateASN = true;
    }

    $scope.createASN = function () {
        // validate the order for ASN
        showLoader();
        var dd = p2pDetailsService.getQueryStringValue("dd");
        var validateUrl = RESTURLs.SM1_Controller_ValidateASNCreation + "&dd=" + dd;
        var orderIds = [];
        orderIds.push($scope.dataModel.orderData.id);
        var data = { "orderIds": orderIds };
        var validateOrderForASN = httpService.directhttp({
            "url": validateUrl,
            "method": "POST",
            "timeout": 60000,
            "data": data
        });

        validateOrderForASN.then(function (res) {
            switch (res) {
                case 1:
                    var dd = p2pDetailsService.getQueryStringValue("dd");
                    var createASNUrl = RESTURLs.SM1_Controller_CreateASNFromOrder + "&dd=" + dd;
                    // Create ASN for the order
                    var getCreateASNFromOrder = httpService.directhttp({
                        "url": createASNUrl,
                        "method": "POST",
                        "timeout": 60000,
                        "data": data
                    });

                    getCreateASNFromOrder.then(function (res) {
                        if (res.RedirectionURL) {
                            window.top.location.href = window.top.location.origin
                                    + '/P2P/ASN?dd=' + res.RedirectionURL + '&oloc=216#/asn';
                        }
                    }).catch(function (errorCallback) {
                        $scope.showPopup = false;
                        console.log(errorCallback.statusText);
                    });
                    break;
                case 0:
                    var asnErrorMessage = orderMesssage("error", $translate.instant("P2P_PO_ASNValidation"));
                    notification.notify(asnErrorMessage);
                    break;
            }
            hideLoader();
        }).catch(function (errorCallback) {
            hideLoader();
            $scope.showPopup = false;
            console.log(errorCallback.statusText);
        });
    };
    //End - For ASN
    
    if (!p2pDetailsService.getStateForGrid() && document.orderData.UserConfigurations && document.orderData.UserConfigurations[0] && _clientSpecificConfigSettings.specificSettings.allowGridPersistence) {
        p2pDetailsService.setStateForGrid(JSON.parse(document.orderData.UserConfigurations[0].ConfigDetails));
    }else if(p2pDetailsService.getStateForGrid()){
        p2pDetailsService.setStateForGrid(p2pDetailsService.getStateForGrid());
    }
    
    function saveGridState() {
        var state = p2pDetailsService.getCurrentGridState();
        var dd = p2pDetailsService.getQueryStringValue("dd");
        if (state && _clientSpecificConfigSettings.specificSettings.allowGridPersistence) {
            var userConfigData = {
                "ContactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                "DocumentType": APPCONSTANTS.userPreferences.DocumentTypeId,
                "ConfigType": 1,
                "ConfigDetails": JSON.stringify(state)
            };
            var saveColumnService = httpService.directhttp({
                "url": APPCONSTANTS.userPreferences.URLs.AppURL + "/api/UserConfig/SaveUserConfigurations" + "?oloc=218&dd=" + dd,
                "timeout": 12000,
                "method": "POST",
                "data": userConfigData
            });
            saveColumnService
                .then(function (saveResult) {
                    //p2pDetailsService.setStateForGrid(state);
                })
                .catch(function (errorCallback) { });
        }
    };
    function setInitialName(req)
    {
        if (req.data.orderData.name == "" || req.data.orderData.name == null) {
            req.data.orderData.name = lastSavedName;
        }
    }

    p2pDetailsService.saveOrderAsDraft = function (e,callform) {
        $scope.saveForm(e, callform);
    };

    p2pDetailsService.cancelOrder = function () {
        cancelOrder();
    }
}





