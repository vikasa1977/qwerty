'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pReqCtrl
 * @description
 * Controller of P2P Request.
 */
    .controller('composedGridController', ['$scope', '$timeout', '$http', '$rootScope', 'p2pConfigService', '$filter', 'gridHelper', '$translate', 'p2pValidationService', 'APPCONSTANTS', 'P2PConstants', 'p2pDetailsService','notesAndAttachmentsService', 'RESTURLs','httpService','formWidgetUtils', composedGridControllerFunc])
    
function composedGridControllerFunc($scope, $timeout, $http, $rootScope, p2pConfigService, $filter, gridHelper, $translate, p2pValidationService, APPCONSTANTS, P2PConstants, p2pDetailsService, notesAndAttachmentsService, RESTURLs, httpService, formWidgetUtils) {

    //  Show PLEASE WAIT text when grid rendering starts
    var firstTime = true;
    $scope.onComposedGridRenderingStart = function () {        
        if (!firstTime)
            formWidgetUtils.showPleaseWait();        
    };


    //  Hide PLEASE WAIT text when grid rendering is done
    $scope.onComposedGridRenderingFinish = function () {
        formWidgetUtils.broadcast('onComposedGridRender');
        formWidgetUtils.hidePleaseWait();
        firstTime = false;
    };


    $scope.p2pValidationService = p2pValidationService;
    $scope.selectiveApply = {};
    var fieldId = 0;
    var splitEntityId = 0;
    $scope.updateHandler = function () {

    };
    var clientConstants = P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName];
    var parsedItems;
    $rootScope.$on("composedGridParseItemMasterData", function (e, arg) {
        var rowobj = arg.rowModel.entity;
        var col = arg.col;
        if (arg["response"]) {
            var response = arg["response"];
            parsedItems = parseItemMasterItems(response, rowobj);
        }
    });

    $rootScope.$on("composedGridSelectItemMasterData", function (e, arg) {
        var row = arg.row;
        var col = arg.col;
        if ((col.displayName == "Item Number *" || col.displayName == "Item Number") || (col.displayName == "Line Description *" || col.displayName == "Line Description")) {
            var index = _.findIndex($scope.ngModel.data, { id: row.entity.id });
            var item = _.find(parsedItems, { buyerItemNumber: arg.data.code });
            $.extend(true, $scope.ngModel.data[index], item)
                if (($scope.ngModel.data[index].description === null || $scope.ngModel.data[index].buyerItemNumber === null) || typeof $scope.ngModel.data[index].description !== 'object' || typeof $scope.ngModel.data[index].buyerItemNumber !== 'object') {
                    $scope.ngModel.data[index].description = { 'desc': $scope.ngModel.data[index].description };
                    $scope.ngModel.data[index].buyerItemNumber = { 'code': $scope.ngModel.data[index].buyerItemNumber };
                }
            //$scope.ngModel.data[index] = item;
        }
        else if(col.displayName.toLowerCase() =="deliver to")
        {
            var index = _.findIndex($scope.ngModel.data, { id: row.entity.id });
            binddeliverToStr($scope.ngModel.data[index], index);
        }
        else if (arg.col.field=='shipTo.name')
        {
            bindShipTo();
        }
       
    });


    var showLoader = function () {
        $rootScope.p2ploader = true;
        $rootScope.loaderPosition = true;
    };

    var hideLoader = function () {
        $rootScope.p2ploader = false;
        $rootScope.loaderPosition = false;
    };

    // showLoader();

    //  Composed grid render callback
    $scope.onComposedGridRender = function () {
        // hideLoader();
    };


    function bindShipTo()
    {
        var allShipToSame = true;
        var shipToFirst = $scope.ngModel.data[0].shipTo;
        for (var i = 1; i < $scope.ngModel.data.length; i++) {
            if (shipToFirst.id != $scope.ngModel.data[i].shipTo.id) {
                allShipToSame = false;
            }
            delete $scope.ngModel.data[i].shipTo.value;

        }
        var documentDataModel = p2pDetailsService.getDataModel().orderData;
        if (!allShipToSame) {
            var blankShipTo = {
                id: 0,
                name: '',
                address: '',
                enabled: documentDataModel.shipTo.enabled
            }
            documentDataModel.shipTo = blankShipTo;
        }
        else {
            var newHeaderLevelShipto = {
                id: shipToFirst.id,
                name: shipToFirst.name,
                address: shipToFirst.address,
                enabled: documentDataModel.shipTo.enabled
            }

            documentDataModel.shipTo = newHeaderLevelShipto;
        }
    }
    function binddeliverToStr(item, index)
    {
        var req = {};
        req.method = "GET";
        req.url = RESTURLs.SM1_Controller_GetDeliverToLocationById + "&delivertoLocId=" + item.deliverTo.id;
        // req.url = "https://smartdev.gep.com/common/ManageCommon/GetDeliverToLocationById?&oloc=107&delivertoLocId=" + $scope.ngModel.data.id;
        httpService.directhttp(req).then(function (response) {
            item.deliverToStr=getDeliverToAddressString(response);
            $.extend(true, $scope.ngModel.data[index], item)          
        },
        function () {
        });
    }
    function getDeliverToAddressString(deliverTo) {
        return deliverTo.Address.AddressLine1 + "," + deliverTo.Address.AddressLine2 + "," + deliverTo.Address.AddressLine3 + "," + deliverTo.Address.City + "," + deliverTo.Address.State + "," + deliverTo.Address.Country + "," + deliverTo.Address.Zip;
    }

    var gridConfig = p2pDetailsService.getGridConfig();

   

    gridConfig[0].state = p2pDetailsService.getStateForGrid();

    p2pDetailsService.getCurrentGridState = function () {
        var tabsWithStates = $scope.apiForGrid.getTabStates();
        var lineSate = _.find(tabsWithStates, function (n) { return n.title == "Lines" }).state;
        if (!_.isEqual(p2pDetailsService.getStateForGrid(), lineSate)) {
            p2pDetailsService.setStateForGrid(lineSate);
            return lineSate;
        } else {
            return null;
        }
        
    };
    
    var basicSettingsObject = p2pDetailsService.getBasicSettings();
    _.find(gridConfig, function (item) {
        _.find(item.cloumnDefs, function (def) {
            switch (def.field.toLowerCase()) {
                case "quantity":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                case "unitprice":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                case "shippingcharges":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                case "othercharges":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                case "taxes":
                    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier && (basicSettingsObject.TaxesVisibleToSupplier.toLowerCase() == 'false'))
                        def.isVisible = false;
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                case "tax":
                    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier && (basicSettingsObject.TaxesVisibleToSupplier.toLowerCase() == 'false'))
                        def.isVisible = false;
                    break;
                case "total":
                    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier && (basicSettingsObject.TaxesVisibleToSupplier.toLowerCase() == 'false'))
                        def.attributes.rule = "(row.entity.unitPrice * row.entity.quantity) + row.entity.otherCharges + row.entity.shippingCharges";
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                case "linetotal":
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision("totalfilter");
                    break;
                case "subtotal":
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision("totalfilter");
                    break;
                case "splitvalue":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision("total");
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision("totalfilter");
                    break;
                case "splititemtotal":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision("total");
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision("totalfilter");
                    break;
                case "calculationvalue":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                case "chargeamount":
                    def.attributes.minmaxprecision = p2pDetailsService.getMinMaxPrecision(def.field);
                    def.attributes.minmaxprecisionfilter = p2pDetailsService.getMinMaxPrecision(def.field + "filter");
                    break;
                default:

            }
        })
    });

    $scope.composedGridConfig = {
        'tabConfig': gridConfig
    };
    //data for NA directive
    var dataModel = p2pDetailsService.getDataModel().orderData;
    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier)
        var isSupplier = true;
    else
        var isSupplier = false;

    var datamodelNA = angular.copy($scope.ngModel.data);
    _.each(datamodelNA, function (item, index) {
        datamodelNA[index].type = '';
        datamodelNA[index].name = '';
        datamodelNA[index].isSupplier = isSupplier;
    })

    var isTeammember = false;
    var isEditable = false;
    if (_.find(APPCONSTANTS.userPreferences.OrderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 14 }) == undefined &&
                    _.find(APPCONSTANTS.userPreferences.OrderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 17 }) == undefined &&
                    _.find(APPCONSTANTS.userPreferences.OrderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 5 }) != undefined
                      && APPCONSTANTS.userPreferences.OrderData.orderContact.id != APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
                      && APPCONSTANTS.userPreferences.OrderData.createdBy.id != APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
                ) {
        isTeammember = true;
    }
    function checkEditActivity() {
        if ((_.contains([1, 23, 24], dataModel.status.id) || (dataModel.source.id == 10 && dataModel.closingOrderStatus != 124 && dataModel.closingOrderStatus != 121 && !dataModel.isInternalChangeOrderFinalize)) && !$scope.isSupplier)
            isEditable = true;
        if (isTeammember == true)
            isEditable = false;
    }
    checkEditActivity();
    $scope.gridInstance = {
        'dataModel': datamodelNA,
        'columnconfig': p2pDetailsService.getNotesAndAttachmentsLineConfig(),
        'shownotepopup': $rootScope.showNotePopupObj,
        'showattachmentpopup': $rootScope.showAttachmentPopup,
        'showlinkpopup': $rootScope.showLinkPopupObj,
        'noteformmodel': $rootScope.noteOrLinkFormModelObj,
        'attachmentformmodel': $rootScope.attachmentFormModelObj,
        'linkformmodel': $rootScope.noteOrLinkFormModelObj,
        'isLoading': true,
        'notesAndAttachmentsService': notesAndAttachmentsService,
        'isEditable': isEditable,
        'showPopup':(dataModel.documentCode > 0) ? true : false
    };
    $scope.$on('updateShowPopupStatus', function () {
        $scope.gridInstance.showPopup = (dataModel.documentCode > 0) ? true : false;
    });    
    //listen data from notes and attachments controller
    $scope.$on('updateNA', function (e, data) {
        if (data.data != undefined && data.data.length > 0)
            $scope.gridInstance.dataModel = data;
        else
            $scope.gridInstance.dataModel = { 'data': datamodelNA, 'loading': false };
    });
    $scope.$on('editNA', function (e, data) {
        $scope.gridInstance.noteformmodel = data.data;
        $scope.gridInstance.linkformmodel = data.data;
    });
    $scope.controllerCallback = function (e) {
        var headerConfig = p2pDetailsService.getHeaderConfig();
        var notesAndAttachmentsSelected = _.find(headerConfig.sections, function (item) {
            return item.label == "Notes & Attachments";
        });
        if(notesAndAttachmentsSelected)
            notesAndAttachmentsSelected.isActive = true;

        setTimeout(function () {
            if (e != undefined) {
                e.gridType = 'line';
                $rootScope.notesAndAttachmentCallbackObj(e);
            }
        },100);

    }

    formWidgetUtils.on('composedGridUpdateNotifier', function (e, data) {
        if (data.data.action === 'tabChange')
        {
            $scope.gridInstance.dataModel = $scope.ngModel.data;            
        }
    });
    $scope.comment = {
        config: {
            "EnableLeftPanel": true,
            "CommentObjectType": "GEP.Cumulus.P2P.Order.LineItem",
            "AttachmentType": "GEP.Cumulus.P2P.Attachment",
            "IsEditable": true,
            "SubAppCode": 107,
            "CommentLeftPanelTitle": "Order",
            "CommentType": 1,
            "HideSharing": false,
            "CommentLeftPanelSubTitle": p2pDetailsService.getSubTitle(),
            "CommentObjectID": null,
            "HideAttachment": false,
            "CommentHeaderTitle": "comment"
        }
    };

    $scope.composedGridConfig.tabConfig[0].model = $scope.ngModel.data;
    $scope.composedGridConfig.tabConfig[1].modelKey = undefined;
    $scope.apiForGrid = {};


    //Category component done click handler
    $scope.selectionCallbackForCategory = function (e) {
        $scope.row.category = { 'name': e[0].PASName, 'id': e[0].PASCode };
        //closing popup
        $scope.hideCallbackForCategory();
    };

    $scope.taxApply = function (_taxItems, taxPercentage) {
        gridHelper.onTaxApply($scope.ngModel.data, $scope.row, _taxItems, taxPercentage);
    }

    $scope.taxExempt = function (_taxItems, taxPercentage) {
        gridHelper.onTaxExempt($scope.ngModel.data, $scope.row, _taxItems, taxPercentage);
    }

    $rootScope.$on("lineTypes", function (e, arg) {
        console.log($scope.composedGridConfig.tabConfig);
        $scope.composedGridConfig.tabConfig[0].cloumnDefs[1].attributes.options = arg.lineTypes;
    });

    $rootScope.$on("composedGridUpdateSaveOrderData", function (e, arg) {
        $scope.ngModel.data = arg.SaveOrderData;
        $scope.composedGridConfig.tabConfig[0].model = arg.SaveOrderData;
        $scope.apiForGrid.updateModel();
    });

    $rootScope.$on("UpdatingGridConfig", function (e,arg) {

        var gridconfig = p2pDetailsService.getGridConfig();
        $scope.ngModel.data = arg.SaveOrderData;
        $scope.composedGridConfig.tabConfig[1] = gridconfig[1];
        $scope.apiForGrid.notifyDataChange();
    });

    $scope.$on('composedGridAutoSuggestChange', function (e, data) {
        if (data.col.colDef.isFreeText) {
            var colDefField = data.col.colDef.field;
            colDefField = colDefField.split('.');
            data.row.entity[colDefField[0]][colDefField[1]] = data.val;
            if (data.col.colDef.isMandatory) {
                $scope.apiForGrid.notifyDataChange();
            }
        }
        if (data.col.colDef.displayKey == 'P2P_PO_ContractNumber') {
            var obj = { 'ContractNumber': data.val, 'ContractName': null, 'ContractExpiryDate': null, 'ContractValue': null };
            data.row.entity.Contract = obj;
        }
    });

    /*$scope.$on('composedGridTextKeyUp', function (e, data) {
           data.row.entity[data.col.colDef.field] = (data.col.colDef.attributes.type === 'number' ? parseFloat(data.val) : data.val);
            //$scope.apiForGrid.notifyDataChange();
    });
    */
    formWidgetUtils.on('composedGridTextKeyUp', function (e,data) {
        var fields = data.data.col.colDef.field.split('.');
        if (fields.length > 1) {
            if (data.data.row.entity[fields[0]] != undefined) {
                data.data.row.entity[fields[0]][fields[1]] = (data.data.col.colDef.type === 'number' ? parseFloat(data.data.val) : data.data.val);
            }
        }
        else {
            data.data.row.entity[fields[0]] = (data.data.col.colDef.type === 'number' ? parseFloat(data.data.val) : data.data.val);
        }
    });

    //GL Details, Requester & Account Number
    formWidgetUtils.on("composedGridFocusColumnDispatcher", function (e, arg) {
        arg = arg.data;
        var columnDefinition = arg.focusedRowColObj.col.colDef;
        var colName = 'Undefined';
        if (columnDefinition.treatAsRequester) {
            if (columnDefinition.treatAsRequester == true) {
                colName = columnDefinition.displayName;
            }
        }
        if (columnDefinition.isRegFocusCol) {
            switch (columnDefinition.displayName) {
                case $translate.instant('P2P_PO_Requester'):
                    columnDefinition.attributes.serviceObj = gridHelper.getRequesterAutoSuggestObject(gridHelper.getParentItemOfSplit(arg.focusedRowColObj.row.entity.documentItemId, $scope.ngModel.data), arg.focusedRowColObj.row.entity.splitNumber, 0, arg.focusedRowColObj.row.entity.requester.fieldId, arg.focusedRowColObj.row.entity.requester.splitEntityId);
                    break;
                case $translate.instant('P2P_PO_GLCode'):
                    columnDefinition.attributes.serviceObj = gridHelper.getGLCodeAutoSuggestObject();
                    break;
                case $translate.instant('P2P_PO_UOM') + " *":
                case $translate.instant('P2P_PO_UOM'):
                    columnDefinition.attributes.serviceObj = gridHelper.getAllUOMAutoSuggestObject(arg.focusedRowColObj.row.entity);
                    break;
                case $translate.instant("P2P_PO_ShippingMethod") + " *":
                case $translate.instant("P2P_PO_ShippingMethod"):
                    columnDefinition.attributes.serviceObj = gridHelper.getShippingMethodsServiceObject();
                    break;
                case $translate.instant("P2P_PO_PartnerItemName") + " *":
                case $translate.instant("P2P_PO_PartnerItemName"):
                    columnDefinition.attributes.serviceObj = gridHelper.getItemNumberServiceObject(arg.focusedRowColObj.row.entity);
                    break;
                case $translate.instant("P2P_PO_ItemNumber") + " *":
                case $translate.instant("P2P_PO_ItemNumber") :
                    columnDefinition.attributes.serviceObj = gridHelper.getItemNumberServiceObject(arg.focusedRowColObj.row.entity);
                    break;
                case $translate.instant("P2P_CMN_ShipTo") + " *":
                case $translate.instant("P2P_PO_ShipTo") + " *":
                    columnDefinition.attributes.serviceObj = gridHelper.getShipToLocationsServiceObject();
                    break;
                case $translate.instant('P2P_PO_ChargeForHeader_ChargeName') + ' *':
                    columnDefinition.attributes.serviceObj = gridHelper.getChargeNameServiceObject();
                    break;
                case $translate.instant('P2P_PO_ContractNumber'):
                    columnDefinition.attributes.serviceObj = gridHelper.getContractNumberServiceObject(gridHelper.getParentItemOfSplit(arg.focusedRowColObj.row.entity.id, $scope.ngModel.data), p2pDetailsService.mapAndGetP2PSettings(APPCONSTANTS.userPreferences.CommonSettings.lstSettings).ContractDocumentStatuses, _clientSpecificConfigSettings.specificSettings.utilazationDocumentType);
                    break;
                case $translate.instant('P2P_PO_DeliverTo'):
                    columnDefinition.attributes.serviceObj = gridHelper.getDeliverToServiceObject(gridHelper.getParentItemOfSplit(arg.focusedRowColObj.row.entity.id, $scope.ngModel.data));
                    break;                    
                case colName:
                    columnDefinition.attributes.serviceObj = gridHelper.getRequesterAutoSuggestObject(gridHelper.getParentItemOfSplit(arg.focusedRowColObj.row.entity.documentItemId, $scope.ngModel.data), arg.focusedRowColObj.row.entity.splitNumber, 0, arg.focusedRowColObj.row.entity[arg.focusedRowColObj.col.colDef.attributes.model].fieldId, arg.focusedRowColObj.row.entity[arg.focusedRowColObj.col.colDef.attributes.model].splitEntityId);
                    break;
                case $translate.instant('P2P_PO_InvoiceApprover'):
                    columnDefinition.attributes.serviceObj = gridHelper.getInvoiceApproverObject(arg.focusedRowColObj.row.entity);
                    break;
                default:
                    if (arg.focusedRowColObj.row.entity[columnDefinition.attributes.model] && arg.focusedRowColObj.row.entity[columnDefinition.attributes.model].fieldId)
                        fieldId = arg.focusedRowColObj.row.entity[columnDefinition.attributes.model].fieldId;
                    if (arg.focusedRowColObj.row.entity[columnDefinition.attributes.model] && arg.focusedRowColObj.row.entity[columnDefinition.attributes.model].splitEntityId)
                        splitEntityId = arg.focusedRowColObj.row.entity[columnDefinition.attributes.model].splitEntityId
                    columnDefinition.attributes.serviceObj = gridHelper.getSplitAccountingAutoSuggest(gridHelper.getParentItemOfSplit(arg.focusedRowColObj.row.entity.documentItemId, $scope.ngModel.data), arg.focusedRowColObj.row.entity.splitNumber, getSplitEntityId(arg), fieldId, splitEntityId);
                    break;
            }
        }
    });
   
    setTimeout(function () {
       
        var uiGridHeaderEle = angular.element(".ui-grid-header");
        uiGridHeaderEle.addClass('ui-grid-header-fixed');
    }, 1000);

    function getSplitEntityId(arg)
    {
        
        for (var index in clientConstants.LINE_ACC_ENTITIES) {
            //eg : "splitEntity1"
            var entityName = arg.focusedRowColObj.col.colDef.field.split(".")[0];
            if (entityName == clientConstants.LINE_ACC_ENTITIES[index]) {
                var entityTypeId = index;
                return entityTypeId;
            }
        }
    }
    ///-------------------------------------------------*Category component Configration*----------------------------------------------------
    var selectionLevels = _.filter(APPCONSTANTS.userPreferences.CommonSettings.lstSettings, { FieldName: "CategorySelectionLevel" });
    $scope.LevelSelection = "";
    if (selectionLevels[0].FieldValue !== "1"){
        for (var i = 1; i < parseInt(selectionLevels[0].FieldValue) ; i++) {
            $scope.LevelSelection = $scope.LevelSelection + i.toString()+ ","
        }
    }
    var lastChar = $scope.LevelSelection.slice(-1);
    if (lastChar == ',') {
        $scope.LevelSelection = $scope.LevelSelection.slice(0, -1);
    }
    $scope.treeComponentConfig = {
        selectedNodes: "",
        isRadio: true,
        getHierarchyOnSelection: true,
        getAllLazyLoadedData: true,
        isLazyLoad: false,
        data: null,
        disableLevelSelection: $scope.LevelSelection,
        title: 'Category',
        getSelections: true,
        clearCache: false,
        height: '328px',
        isSearchEnabled: true,
        getParentForNodeUrl:P2PRestSvc + "/PortalRestService/GetPASLevelDetailsByPASCodes",
        requestParameter: {
            navigationContext: "PAS",
            userExecutionContext:JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails),
            documentCode: null,
            contactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
        }
    };
    $scope.treeComponentCallback = function (e) {
        if (e.selections[0] != "undefined")
            $scope.row.category = { 'name': e.selections[0].Name, 'id': e.selections[0].ID };
    };


    function parseItemMasterItems(itemMasterItems, itemModel) {
        var items = [];

        if ((!itemMasterItems || itemMasterItems.length <= 0) && !Array.isArray(itemMasterItems))
            return items;
        var time = new Date();
        var newtime = new Date(time);
        newtime.setDate(newtime.getDate() + 15);
        time = time.toDateString();
        newtime = newtime.toDateString();
        items = itemMasterItems.map(function (x) {
            var editedItemNo = 0;
            var item = angular.copy(itemModel);
            var notes = x.EntityDetail[0].ItemNotesList;
            var supplierDetails = x.EntityDetail[0].ItemSupplierDetailsList[0];
            var manDetails = x.ItemManufacturerDetailsList[0];
            item.name = x.ItemName;
            item.imageURL = x.Images;
            item.buyerItemNumber = x.ItemNumber;// { 'code': x.ItemNumber };
            item.description = x.ItemDescription; //{ 'desc': x.ItemDescription };
            item.uom = {
                code: x.UOM != null || x.UOM != undefined ? x.UOM.Code : "",
                name: x.UOM != null || x.UOM != undefined ? x.UOM.Name : ""
            };
            item.source = {
                id: x.SourceType,
                name: "P2P_REQ_Catalog"
            };
            item.partner = {
                id: supplierDetails != undefined || supplierDetails != null ? supplierDetails.PartnerCode : 0,
                name: supplierDetails != undefined || supplierDetails != null ? supplierDetails.PartnerName : ""
            };
            item.category = {
                id: x.CategoryId > 0 ? x.CategoryId : item.category.id,
                name: x.CategoryName != null ? x.CategoryName : item.category.name
            };
            //item.currencyCode = x.ItemStandardFieldDetails.DefaultCurrencyCode;
            //item.contractNumber = x.ContractNumber;
            //item.partnerItemNumber = x.SupplierPartNumber;
            //item.supplierPartAuxiliaryId = x.SupplierPartAuxiliaryId;
            item.quantity = 1;
            if (x.SearchField == "1")
            {          
                item.unitPrice = x.UOM != null || x.UOM != undefined ? x.UOM.UnitPrice : ""           
                item.isTaxExempt =0;
                item.catalogItemId = 0;
                item.leadTime = 0;
            }
            else
            {                
                item.unitPrice = x.ItemStandardFieldDetails.StandardPrice;
                //item.p2PLineItemId = editedItemNo;
                item.isTaxExempt = x.ItemStandardFieldDetails.IsTaxExempt;
                item.catalogItemId = x.ItemStandardFieldDetails.CatalogItemId;
                item.leadTime = x.ItemStandardFieldDetails.LeadTime != null && x.ItemStandardFieldDetails.LeadTime != undefined ? x.ItemStandardFieldDetails.LeadTime : 0;
            }
            item.id = item.id > 0 ? item.id : editedItemNo;
            item.manufacturer = manDetails.ManufacturerName;
            item.manufacturerPartNumber = manDetails.ManufacturerPartNumber;
            item.ManufacturerModel = manDetails.ManufacturerModelNumber
                //item.isContracted = x.IsContracted;
                //item.taxes = x.TaxAmount;

                item.createdBy = {
                    id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                    name: APPCONSTANTS.userPreferences.FullName
                };
                item.lastModifiedBy = {
                    id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                    name: APPCONSTANTS.userPreferences.FullName
                }; 
                item.partnerItemNumber = x.UOM != null || x.UOM != undefined ? x.UOM.PartnerItemNumber: ""
            item.promisedDate = getPromisedDate(item.leadTime);
            //item.estimatedDeliveryDate = getEstimatedDate(x.leadTime);
            return item;
        })
        return items;
    }

    function getPromisedDate(leadTime) {
        var newtime = new Date();
        if (leadTime > 0) {
            newtime.setDate(newtime.getDate() + parseInt(leadTime));
            newtime = "\/Date(" + newtime.getTime() + ")\/";
            return newtime;
        }
        else {
            return null;
        }
    }

    function _isReadOnly(colObj) {
        return $scope.p2pValidationService.isReadOnly(colObj.colDef);
    };
    function _focusCell(row,col) {
        row.grid.api.cellNav.scrollToFocus(row.entity, col.colDef);
    }

    function getSplitValue(item) {
        //if (item.splitType > 0) {
        //    //return reqDetailsService.parseNumber(item.unitPrice * item.itemQuantity * item.percentage / 100);
        //    return parseFloat((item.type.id == 2 ? item.itemQuantity : item.quantity) * (item.type.id == 2 ? item.quantity : item.unitPrice));
        //}
        //else {
        //    return parseFloat((item.type.id == 2 ? item.itemQuantity : item.quantity) * (item.type.id == 2 ? item.quantity : item.unitPrice))
        //    //return item.type.id === 2 ? reqDetailsService.parseNumber(item.quantity) : reqDetailsService.parseNumber(item.unitPrice * item.quantity);
        //}
        return parseFloat(item.quantity * item.unitPrice);
            
    }
    var editedItemNo;
    function parseCatalogstoItems(catalogs, itemModel) {
        var items = [];
        if ((!catalogs || catalogs.length <= 0) && !Array.isArray(catalogs))
            return items;
        var time = new Date();
        var newtime = new Date(time);
        newtime.setDate(newtime.getDate() + 15);
        time = time.toDateString();
        newtime = newtime.toDateString();
        items = catalogs.map(function (x) {
            var item = angular.copy(itemModel);
            item.name = x.ItemName;
            item.imageURL = x.Iamges;
            item.buyerItemNumber = x.ItemAbbrevationCode;
            item.description = x.ItemDescription;
            item.uom = {
                code: x.UOMCode,
                name: x.UOMDescription
            };
            item.source = {
                id: x.SourceType,
                name: "P2P_REQ_Catalog"
            };
            item.partner = {
                id: x.PartnerCode,
                name: x.PartnerName
            };
            item.category = {
                id: x.PASCode,
                name: x.PASName
            };
            item.currencyCode = x.CurrencyCode;
            item.contractNumber = x.ContractNumber;
            item.partnerItemNumber = x.SupplierPartNumber;
            //item.supplierPartAuxiliaryId = x.SupplierPartAuxiliaryId;
            item.quantity = 1;
            item.unitPrice = x.UnitPrice;
            item.id = item.id;
            item.p2PLineItemId = item.id;
            item.isTaxExempt = x.IsTaxExempt;
            item.catalogItemId = x.CatalogItemId;
            item.manufacturer = x.ManufacturerName;
            item.manufacturerPartNumber = x.ManufacturerPartNumber;
            item.isContracted = x.IsContracted;
            item.taxes = x.TaxAmount;
            item.createdBy = {
                id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                name: APPCONSTANTS.userPreferences.FullName
            };
            item.lastModifiedBy = {
                id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                name: APPCONSTANTS.userPreferences.FullName
            };
            return item;
        })
        return items;
    }
    $scope.canEditField = function (lineNumber, fieldName) {
        var disabledArray = p2pValidationService.getDisabledArray();
        var isDisabled = _.find(disabledArray, function (item) {
            return typeof item=="string"&&item.split(".")[0] == lineNumber + "_" + fieldName;
        });
        return isDisabled == undefined;

    }
    $scope.selectiveApply.changeHeaderFromSelectiveApply = function (field) {
        if (field === 'shipTo')
            bindShipTo();
    }
    $scope.apiForGrid.rowSelectionCallback = function (row) {
        if (row.entity.ItemStatus != undefined && row.entity.ItemStatus.id != undefined && row.entity.ItemStatus.id === 121) {
            return false;
        }
        else if (row.entity.ItemStatus === undefined) {
            var result = _.find(row.grid.rows, function (gridrow) {
                if (row.entity.documentitemid !== undefined)
                    return gridrow.entity.id === row.entity.documentitemid; //accounting
                else if (row.entity.documentitemid !== undefined)
                    return gridrow.entity.id === row.entity.documentitemid;  //charges grid
                else if (row.entity.lineitemid !== undefined)
                    return gridrow.entity.id === row.entity.lineitemid;  //notes & attachments grid
            });
            if (result !== undefined && result.entity.ItemStatus != undefined && result.entity.ItemStatus.id === 121) {
                return false;
            } else {
                return true;
            }
        }
        else {
            return true;
        }
        return true;
    };
    $scope.isEditableForStatusFunc=function(isEditable)
    {
        var isFieldReadForStatus = p2pValidationService.isReadOnly({
            attributes: {
                "isEditable": isEditable
            }
        });
        return !isFieldReadForStatus;
    }
    $scope.getModelForTab = function (index) {
        var chargeTabIndex = p2pDetailsService.getSublineChargeIndex();
        var accountingSplitMode = p2pDetailsService.accountCalculation.getAccountSplitMode();
        switch (index) {
            case chargeTabIndex:
                var modelArray = [];
                var uniqueSublineNumbering = 0;
                $scope.ngModel.data.forEach(function (x, index, array) {
                    if (typeof x.ItemChargesForSubLine == "undefined" || x.ItemChargesForSubLine == null) {
                        x.ItemChargesForSubLine = [];
                    }
                    var ChargeAmount = 0;
                    modelArray.push(x);
                    x.isHeader = true;
                    x.addNewCharge = function (row) {
                        p2pDetailsService.getNewLineItemCharge(row.entity);
                        $scope.apiForGrid.updateModel();
                        $scope.gridInstance.gridInstance.treeBase.expandRow(row);
                    };
                    x._focusCell = _focusCell;
                    x._isReadOnly = _isReadOnly;
                    x.ChargeDetails = {
                        ChargeName: ""
                    };
                    x.lineNumber = parseFloat(x.lineNumber);
                    x.splitIndex =x.lineNumber;
                    x.CalculationValue = "-";
                    x.ItemChargesForSubLine.forEach(function (repItem, i) {
                        repItem.DocumentItemId = x.id;
                        repItem.lineNumber = parseFloat(repItem.LineNumber);
                        repItem.splitIndex = parseFloat(x.lineNumber + '.' + repItem.LineNumber);
                        repItem.uniqueSublineId = uniqueSublineNumbering + 999009;
                        uniqueSublineNumbering++;
                        repItem.buyerItemNumber = "";
                        repItem.description = "";
                        if (repItem.ChargeName == undefined) {
                            repItem.ChargeName = {};
                        };
                        if (repItem.splits == null || repItem.splits.length == 0) {
                            repItem.splits = [];
                            repItem.splits.push(p2pDetailsService.getSplitItem(0));
                        }
                        repItem.ChargeName.ChargeName = repItem.ChargeDetails.ChargeName;
                        
                        repItem.CalculationBasis = {
                            id: repItem.ChargeDetails.CalculationBasisId,
                            name: repItem.ChargeDetails.CalculationBasis
                        };
                        repItem.isHeader = false;
                        repItem._TempChargeLineNumber = i+1;
                        repItem.deleteCurrentCharge = function (chargeObj) {                            
                            p2pDetailsService.processDeleteLineItemCharge($scope.ngModel.data, chargeObj.uniqueSublineId);                            
                            $scope.apiForGrid.updateModel();
                        };
                        repItem._focusCell = _focusCell;
                        repItem._isReadOnly = _isReadOnly;
                        ChargeAmount = ChargeAmount + repItem.ChargeAmount;
                        if (!repItem.IsDeleted) {
                            modelArray.push(repItem);
                        };
                    }); 
                    x.ChargeAmount = ChargeAmount;                  
                    var chargeCount = 0;
                    x.ItemChargesForSubLine.forEach(function (chargeItem, i) {
                        if (chargeItem.IsDeleted != true) {
                            chargeCount++;
                        }                       
                    });
                    x.ChargeCount = chargeCount;
                    x._TempChargeLineNumber = 0;
                });
                
                return modelArray;
            case 1:
                $timeout(function () {
                    updateAccountingValidations();
                },100);
                   
                var uniqueSplitNumbering = 0;
                $scope.ngModel.data.forEach(function (x, index, array) {
                    if (!x.splits)
                        return;
                    
                    x.lineNumber = parseFloat(x.lineNumber);
                    x.splitIndex = x.lineNumber;
                    x.uniqueSplitItemId = uniqueSplitNumbering + 999009;
                    x.splitTypeName = '--';
                    x.SplitunitPrice = '--';
                    x.Splitquantity = x.quantity;
                    uniqueSplitNumbering++;
                    x.lineSplitType = 'header';
                    x.splitNumber = '--';
                    x.isHeader = true;
                    x.splitValue = x.quantity * x.unitPrice;
                    x.Splittax = x.taxes;
                    x.splitItemTotal = x.splitValue + x.Splittax + x.otherCharges;
                    x.splits.forEach(function (repItem, i) {
                        repItem.ItemStatus = (x.ItemStatus) ? x.ItemStatus : {};
                        repItem.lineNumber = parseFloat(x.lineNumber);
                        repItem.splitIndex = parseFloat(x.lineNumber + '.1');
                        repItem.type = x.type;
                        repItem.uniqueSplitItemId = uniqueSplitNumbering + 999009;
                        repItem.buyerItemNumber = x.buyerItemNumber;
                        repItem.description = x.description;
                        repItem.splitType = x.splitType;
                        repItem.itemQuantity = x.quantity;
                        repItem.unitPrice = repItem.percentage === 100 ? x.unitPrice : repItem.unitPrice == undefined ? x.unitPrice : repItem.unitPrice;
                        repItem.quantity = repItem.percentage === 100 ?  x.quantity : parseFloat(((x.quantity * repItem.percentage) / 100).toFixed(4));
                        repItem.splitValue = getSplitValue(repItem);
                        repItem.tax = parseFloat(((x.taxes * repItem.percentage) / 100).toFixed(4));
                        repItem.SplitunitPrice = repItem.unitPrice;
                        repItem.Splitquantity =  repItem.quantity;
                        repItem.Splittax =repItem.tax;
                        repItem.otherCharges = p2pDetailsService.accountCalculation.getLineItemAdditionalChargeValue(x.otherCharges * repItem.percentage * 0.01);

                        if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier && (basicSettingsObject.TaxesVisibleToSupplier.toLowerCase() == 'false'))
                            repItem.splitItemTotal = p2pDetailsService.accountCalculation.getLineItemSplitsTotalValue(repItem.Splitquantity, repItem.SplitunitPrice, 0, repItem.otherCharges);
                        else
                            repItem.splitItemTotal = p2pDetailsService.accountCalculation.getLineItemSplitsTotalValue(repItem.Splitquantity, repItem.SplitunitPrice, repItem.Splittax, repItem.otherCharges);

                        //if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier && (basicSettingsObject.TaxesVisibleToSupplier.toLowerCase() == 'false'))
                        //    repItem.splitItemTotal = parseFloat((x.type.id == 2 ? repItem.itemQuantity : repItem.Splitquantity) * (x.type.id == 2 ? repItem.Splitquantity : x.unitPrice));
                        //else
                        //    repItem.splitItemTotal = parseFloat((x.type.id == 2 ? repItem.itemQuantity : repItem.Splitquantity) * (x.type.id == 2 ? repItem.Splitquantity : x.unitPrice)) + parseFloat(repItem.Splittax);

                        uniqueSplitNumbering++;
                        repItem.splitNumber = 'Split ' + (i + 1);

                        repItem.lineSplitType = 'Line Item';
                        repItem.splitTypeName = 'Line Value + Tax';
                        //x.splitItemTotal += parseFloat(repItem.splitItemTotal);
                        repItem.isHeader = false;
                    });

                    if (x.ItemChargesForSubLine && accountingSplitMode != 1) {
                        var ChargeIndex = 1;
                        x.ItemChargesForSubLine.forEach(function (z, i, arr) {
                            if (z.IsDeleted == true) {
                                return;
                            }
                            ChargeIndex++;
                            z.splits.forEach(function (repItem, ii) {
                                // repItem.id = x.id;                                
                                // repItem.lineNumber = parseFloat(x.lineNumber + '.' + ChargeIndex);
                                repItem.splitIndex = parseFloat(x.lineNumber + '.' + ChargeIndex);
                                repItem.type = z.type;
                                repItem.uniqueSplitItemId = uniqueSplitNumbering + 955009;
                                //repItem.ChargeDetails = z.ChargeDetails;
                                repItem.splitType = z.splitType;
                                repItem.ChargeAmount = repItem.percentage === 100 ? z.ChargeAmount : repItem.ChargeAmount;
                                repItem.itemQuantity = 0;// x.quantity;
                                repItem.lineSplitType = 'Charge';
                                repItem.splitTypeName = 'Charge';
                                repItem.SplitunitPrice = 0;// repItem.percentage === 100 ? x.unitPrice : repItem.unitPrice;
                                repItem.Splitquantity = '--';// repItem.percentage === 100 ? repItem.type.id === 2 ? x.unitPrice : x.quantity : x.type.id == 2 ? repItem.unitPrice : (x.quantity * repItem.percentage) / 100;
                                repItem.splitValue = z.ChargeAmount * repItem.percentage / 100;// parseFloat();//parseFloat((x.type.id == 2 ? repItem.itemQuantity : repItem.quantity) * (x.type.id == 2 ? repItem.quantity : x.unitPrice));
                                repItem.splitItemTotal = p2pDetailsService.accountCalculation.getChargeSplitsTotalValue(z.ChargeAmount * repItem.percentage * 0.01);
                                repItem.otherCharges = p2pDetailsService.accountCalculation.getChargeItemAdditionalChargeValue(z.ChargeAmount * repItem.percentage *0.01);
                                repItem.description = z.ChargeDetails.ChargeName;

                                uniqueSplitNumbering++;
                                repItem.splitNumber = 'Split ' + (ii + 1);
                                //x.splitItemTotal += parseFloat(repItem.splitItemTotal);
                                repItem.isHeader = false;

                            });
                        });
                    }
                    //x.splitValue = x.splitItemTotal;
                });
                
                //return _.without(_.union(_.flatten($scope.ngModel.data)
                //                    , _.flatten(_.pluck($scope.ngModel.data, "splits")),
                //                    accountingSplitMode ==1? _.flatten(_.chain($scope.ngModel.data)
                //.pluck("ItemChargesForSubLine")
                //.flatten()
                //.pluck("splits")
                //.unique()
                //.value()) : undefined), undefined);
                if (accountingSplitMode != 1) {
                     return _.without(_.union(_.flatten($scope.ngModel.data)
                                        , _.flatten(_.pluck($scope.ngModel.data, "splits")),
                    _.flatten(_.chain(_.difference(_.chain($scope.ngModel.data)
                    .pluck("ItemChargesForSubLine")
                    .flatten()
                    .unique()
                    .value(), _.where(_.chain($scope.ngModel.data)
                    .pluck("ItemChargesForSubLine")
                    .flatten()
                    .unique()
                    .value(), { IsDeleted: true }))).pluck("splits")
                    .unique()
                    .value())), undefined);                    
                }
                else {
                    return _.union(_.flatten($scope.ngModel.data), _.flatten(_.pluck($scope.ngModel.data, "splits")));
                }

               // return _.flatten(_.pluck($scope.ngModel.data, "splits"));

        }
    }

    function updateAccountingValidations()
    {
        var gridApi = $scope.gridInstance.gridInstance;
        if (gridApi) {
            p2pValidationService.updateAccountingErrors($scope.ngModel.data, gridApi.grid.columns);
        }
    }
    $scope.splitsPopupCloseHandler =function()
    {
        updateAccountingValidations();
    }

    $scope.api = {};
    $scope.ChildLinker = {};
    $scope.api.UpdateAccountingErrors = function (lineNumbers, deletedSplitsNumbers) {
        $scope.ChildLinker.removeAccountingErrorsObject(lineNumbers, deletedSplitsNumbers);
    }
};
