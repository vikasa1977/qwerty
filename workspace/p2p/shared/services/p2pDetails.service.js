'use strict';

angular.module('SMART2').
        factory('p2pDetailsService', ['$filter', '$rootScope', 'APPCONSTANTS', 'P2PConstants', 'httpService', 'RESTURLs', '$translate', 'p2pConfigService', 'RuleEngine', p2pDetailsService]);

function p2pDetailsService($filter, $rootScope, APPCONSTANTS, P2PConstants, httpService, RESTURLs, $translate, p2pConfigService, RuleEngine) {
    var _message = {};
    var _maxNumber = 0;
    var _selectedItem = {};
    var _note = {};
    var _parScope;
    var _baseObject;
    var _manufacturerDetails = [];
    var _accountingProps = [];
    var _setPurchaseTypeItemTypes = [];
    var dataModel;
    var cellInvalidIndex = [];
    var cellIndex = [];
    var cellInvalidIndexForCharge = [];
    var cellIndexForCharge = [];
    var gridInstance;
    var _sublineShownArray = [];
    var _clientConstants = {};
    var _clientConfigForActionButtons = {};
    var deletedSublineSplits = [];
    var deletedCharges = [];
    var deletedChargesSplits = [];
    var deletedSublines = [];
    var _documentData = null;

    function _setDataModel(_dataModel) {
        dataModel = _dataModel;
        if ( dataModel[Object.keys(dataModel)[0]] != undefined) {
            _documentData = dataModel[Object.keys(dataModel)[0]];
        }
        else if (dataModel.InvoiceData != undefined) {
            _documentData = dataModel.InvoiceData;
        }
        else if (dataModel.asnData != undefined) {
            _documentData = dataModel.asnData;
        }
    }

    function setPurchaseTypes(purchaseTypeItemTypes) {
        _setPurchaseTypeItemTypes = purchaseTypeItemTypes;
    }

    function _getDataModel() {
        if (typeof dataModel != undefined) {
            return dataModel;
        }
    }
    function _getDocumentDataModel() {
        if (typeof _documentData != null) {
            return _documentData;
        }
    }

    function _getLineTotal(model)
    {

        var basicSettingsObject = getBasicSettings();
        var price = 0;
        var flag = false;
        if (model.items) {
            model.items.map(function (x) {
                if (!x.isDeleted) {
                    if (x.taxes == null) {
                        x.taxes = 0;
                    }
                    if (x.type.id != P2PConstants.LINE_ITEM_TYPES.MATERIALS)
                        x.shippingCharges = 0;
                    x.shippingCharges = (x.shippingCharges == undefined || x.shippingCharges == null ? 0 : x.shippingCharges);
                    x.otherCharges = (x.otherCharges == undefined || x.otherCharges == null ? 0 : x.otherCharges);

                    price = price + ((x.unitPrice) * (x.quantity));
                    price = price + parseFloat(x.shippingCharges);
                    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier && (basicSettingsObject.TaxesVisibleToSupplier.toLowerCase() == 'false'))
                        price = parseFloat(price) + parseFloat(x.otherCharges);
                    else
                        price = parseFloat(price) + parseFloat(x.otherCharges) + parseFloat(x.taxes);
                    if (x.source.id == 2 || x.source.id == 3 || x.source.id == 5)
                        flag = true;

                    if (x.splits) {
                        x.splits.map(function (j) {
                            j.otherCharges = accountCalculation.getLineItemAdditionalChargeValue(x.otherCharges * j.percentage * 0.01);
                            j.quantity = (x.quantity * j.percentage) / 100;
                            j.tax = parseFloat(((x.taxes * j.percentage) / 100).toFixed(4));

                            if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier && (basicSettingsObject.TaxesVisibleToSupplier.toLowerCase() == 'false'))
                                j.splitItemTotal = accountCalculation.getLineItemSplitsTotalValue(j.quantity, x.unitPrice, 0, j.otherCharges);
                            else
                                j.splitItemTotal = accountCalculation.getLineItemSplitsTotalValue(j.quantity, x.unitPrice, j.tax, j.otherCharges);

                        });
                    }


                }
            });
        }
        var purchaseTypeMappingForChargeList = _clientSpecificConfigSettings.header.MappingPurchaseTypeListForCharge;
        if (purchaseTypeMappingForChargeList.indexOf(model.purchaseType.id) !== -1) {
            model.ItemChargesForHeader.map(function (x) {
                if (parseFloat(x.ChargeAmount) != NaN) {
                    if (!x.ChargeDetails.IsAllowance) {
                        price = parseFloat(price) + parseFloat(x.ChargeAmount);
                    }
                    else {
                        price = parseFloat(price) - parseFloat(x.ChargeAmount);
                    }
                }
                else {
                    x.ChargeAmount = 0;
                }


            });
            if (model.items) {
                model.items.map(function (x) {
                    x.ChargeAmount = 0;
                    if (x.ItemChargesForSubLine == null || typeof x.ItemChargesForSubLine == "undefined" || getSublineChargeIndex() == -1) {
                        return
                    }
                    x.taxes = parseFloat(x.unitPrice) * parseFloat(x.quantity) * parseFloat(x.taxPercentage) * 0.01;
                    x.ItemChargesForSubLine.map(function (y) {
                        if (y.IsDeleted == true) {
                            return;
                        }
                        if (typeof y.CalculationBasis == "undefined" || typeof y.ChargeName == "undefined") {

                        }
                        else {
                            y.ChargeDetails.CalculationBasis = y.CalculationBasis.name;
                            y.ChargeDetails.CalculationBasisId = y.CalculationBasis.id;

                            if (y.ChargeName.ChargeName != y.ChargeDetails.ChargeName) {
                                angular.forEach(y.ChargeName, function (value, key) {
                                    y.ChargeDetails[key] = value;
                                });
                                setChargeTabSelectById("CalculationBasis", 'id', y.ChargeName.CalculationBasisId, y.CalculationBasis);
                            }
                        }

                        if (y.ChargeDetails.CalculationBasisId == 1) {
                            y.ChargeAmount = y.CalculationValue * x.quantity;
                        }
                        else if (y.ChargeDetails.CalculationBasisId == 2) {
                            y.ChargeAmount = y.CalculationValue * x.unitPrice * x.quantity / 100;
                        } else if (y.ChargeDetails.CalculationBasisId == 3) {
                            y.ChargeAmount = y.CalculationValue;
                        }

                        if (!y.ChargeDetails.IsAllowance) {
                            x.ChargeAmount = parseFloat(x.ChargeAmount) + parseFloat(y.ChargeAmount);
                            if (y.ChargeDetails.IsIncludeForTax == true) {
                                x.taxes = parseFloat(x.taxes) + y.ChargeAmount * x.taxPercentage * 0.01;
                            }
                        }
                        else {
                            x.ChargeAmount = parseFloat(x.ChargeAmount) - parseFloat(y.ChargeAmount);
                        }


                        if (y.splits) {
                            y.splits.map(function (j) {

                                j.splitItemTotal = accountCalculation.getChargeSplitsTotalValue(y.ChargeAmount * j.percentage * 0.01);
                                j.otherCharges = accountCalculation.getChargeItemAdditionalChargeValue(y.ChargeAmount * j.percentage * 0.01);



                            });
                        }



                    });
                    x.otherCharges = x.ChargeAmount;
                });
            }
        }
        return $filter('minPrecisionHandler')(price, parseInt(getMinMaxPrecision("totalfilter").split(':')[0]), parseInt(getMinMaxPrecision("totalfilter").split(':')[1]));
    }

    var gridState;
    function _setStateForGrid(state) {
        gridState = state;
    }

    function _getStateForGrid() {
        return gridState;
    }


    var accountCalculation = {
        getLineItemSplitsTotalValue: _getLineItemSplitsTotalValue,
        getChargeSplitsTotalValue: _getChargeSplitsTotalValue,
        getLineItemAdditionalChargeValue: _getLineItemAdditionalChargeValue,
        getChargeItemAdditionalChargeValue: _getChargeItemAdditionalChargeValue,
        getAccountSplitMode: _getAccountSplitMode
    };

    var service = {      
        getDocumentDataModel: _getDocumentDataModel,
        getNewReqItem: getNewReqItem,
        getNewInvoiceItem:getNewInvoiceItem,
        getNewOrderItem: getNewOrderItem,
        getSplitItem: getSplitItem,
        getSplitOpts: getSplitOpts,
        getSelectedItem: getSelectedItem,
        setSelectedItem: setSelectedItem,
        setAccountingProps: setAccountingProps,
        getNote: getNote,
        setNote: setNote,
        getMyFormScope: getMyFormScope,
        getDropDownConfig: getDropDownConfig,
        applyLocalizationFilter: applyLocalizationFilter,
        getItemTypes: getItemTypes,
        getItemDetailSet: getItemDetailSet,
        getBlkEdit: getBlkEdit,
        getModalMessage: getModalMessage,
        setAlertMsg: setAlertMsg,
        setItemNoIndex: setItemNoIndex,
        parseNumber: parseNumber,
        getButtonConfig: getButtonConfig,
        setDocumentData: setDocumentData,
        getDocumentData: getDocumentData,
        GetDocVal: GetDocVal,
        GetOtherCharges: GetOtherCharges,
        GetTaxes: GetTaxes,
        GetShipping: GetShipping,
        GetTotalPrice: GetTotalPrice,
        CreateAddress: CreateAddress,
        getTaxItemsByEntityID: getTaxItemsByEntityID,
        getChargesForTaxCalculation:getChargesForTaxCalculation,
        getManufacturerDetails: getManufacturerDetails,
        setManufacturerDetails: setManufacturerDetails,
        getSplitTypes: getSplitTypes,
        calculateAccSplitValuesOnChange: calculateAccSplitValuesOnChange,
        setDocumentStatus: setDocumentStatus,
        getDocumentStatus: getDocumentStatus,
        getDecimalPrecision: getDecimalPrecision,
        getDataModel: _getDataModel,
        setDataModel: _setDataModel,
        setPurchaseTypes: setPurchaseTypes,
        getTotalRowsCount: getTotalRowsCount,
        setTotalRowsCount: setTotalRowsCount,
        getGridConfig: getGridConfig,
        setGridConfig: setGridConfig,
        getHeaderConfig: getHeaderConfig,
        setHeaderConfig: setHeaderConfig,
        getModeForNotification: getModeForNotification,
        setModeForNotification: setModeForNotification,
        getNotificationId: getNotificationId,
        setNotificationId: setNotificationId,
        setNotesAndAttachmentsHeaderConfig: setNotesAndAttachmentsHeaderConfig,
        setNotesAndAttachmentsLineConfig: setNotesAndAttachmentsLineConfig,
        getNotesAndAttachmentsHeaderConfig: getNotesAndAttachmentsHeaderConfig,
        getNotesAndAttachmentsLineConfig: getNotesAndAttachmentsLineConfig,
        getHeaderEntity: _getHeaderEntity,
        mapAndGetP2PSettings: mapAndGetP2PSettings,
        getQueryStringValue: getQueryStringValue,
        getCellInvalidIndex: getCellInvalidIndex,
        setCellInvalidIndex: setCellInvalidIndex,
        getCellIndex: getCellIndex,
        setCellIndex: setCellIndex,
        setGridErrorCount: setGridErrorCount,
        getGridErrorCount: getGridErrorCount,
        setGridInstance: setGridInstance,
        getGridInstance: getGridInstance,
        triggerValidations: triggerValidations,
        removeIndexFromArray: removeIndexFromArray,
        getMinMaxPrecision: getMinMaxPrecision,
        getSubTitle: _getSubTitle,
        setActiveTabIndex: setActiveTabIndex,
        getActiveTabIndex: getActiveTabIndex,
        getChargeForHeaderConfig: getChargeForHeaderConfig,
        setChargeForHeaderConfig: setChargeForHeaderConfig,
        setChargeForHeaderErrorCount: setChargeForHeaderErrorCount,
        getChargeForHeaderErrorCount: getChargeForHeaderErrorCount,
        getNewChargeForHeaderlineItem: getNewChargeForHeaderlineItem,
        getNewLineItemCharge: getNewLineItemCharge,
        checkAndCorrectChargeLineNumber: checkAndCorrectChargeLineNumber,
        toggleSublineChargeTab: toggleSublineChargeTab,
        deleteMultiItemChargeFromGrid: deleteMultiItemChargeFromGrid,
        deleteLineItemCharge: deleteLineItemCharge,
        setChargeTabSelectById: setChargeTabSelectById,
        getSublineChargeIndex: getSublineChargeIndex,
        isEnableCharges: isEnableCharges,
        CheckDecimalIsAllowedForUom: CheckDecimalIsAllowedForUom,
        getBasicSettings: getBasicSettings,
        triggerChargeForHeaderValidations: triggerChargeForHeaderValidations,
        compareObject: compareObject,
        setItemsComparedData: setItemsComparedData,
        compareObjectHeader: compareObjectHeader,
        compareObjectSupplier: compareObjectSupplier,
        compareHeaderObj: compareHeaderObj,
        setSplitsComparedData: setSplitsComparedData,
        compareSupplierObj: compareSupplierObj,
        getCellInvalidIndexForCharge: getCellInvalidIndexForCharge,
        setCellInvalidIndexForCharge: setCellInvalidIndexForCharge,
        getCellIndexForCharge: getCellIndexForCharge,
        setCellIndexForCharge: setCellIndexForCharge,
        deleteIndexFromArrayForCharge: deleteIndexFromArrayForCharge,
        getTeamMembers: _getTeamMembers,
        setTeamMembers: _setTeamMembers,
        accountCalculation: accountCalculation,
        setConfigClientConstants: setConfigClientConstants,
        getConfigClientConstants: getConfigClientConstants,
        setFormActionButtonsConfig: setFormActionButtonsConfig,
        getFormActionButtonsConfig: getFormActionButtonsConfig,
        getDeletedSublineSplits: getDeletedSublineSplits,
        setDeletedSublineSplits: setDeletedSublineSplits,
        resetDeletedSublineSplits: resetDeletedSublineSplits,
        getDeletedCharges: getDeletedCharges,
        setDeletedCharges: setDeletedCharges,
        resetDeletedCharges: resetDeletedCharges,
        getDeletedSublines: getDeletedSublines,
        setDeletedSublines: setDeletedSublines,
        resetDeletedSublines: resetDeletedSublines,
        triggerLineItemDeletBroadcast: triggerLineItemDeletBroadcast,
        getLineTotal: _getLineTotal,
        getGridExtErrorCount: getGridExtErrorCount,
        getFormScope: _getFormScope,
        setFormScope: _setFormScope,
        setStateForGrid: _setStateForGrid,
        getStateForGrid: _getStateForGrid,
        getCurrentGridState: null,
        setErrorCount: setErrorCount,
        saveOrderAsDraft: null,
        cancelOrder: null,
        getModelIndexForSubline: _getModelIndexForSubline,
        processDeleteLineItemCharge: _processDeleteLineItemCharge,
        onCancelLineItemSuccess : null
    };

    return service;

    function getConfigClientConstants() {
        return _clientConstants;
    }
    function setConfigClientConstants(clientConstants) {
        _clientConstants = clientConstants;
    }

    function getFormActionButtonsConfig() {
        return _clientConfigForActionButtons;
    }
    function setFormActionButtonsConfig(clientConfigForActionButtons) {
        _clientConfigForActionButtons = clientConfigForActionButtons;
    }

    var _parentScope;
    function _setFormScope(parentScope) {
        _parentScope = parentScope;
    }

    function _getFormScope() {
        return _parentScope;
    }

    function CheckDecimalIsAllowedForUom(uomCode) {
        return (uomCode == 'GGR' || uomCode == 'PR' || uomCode == 'PA' || uomCode == 'CT' || uomCode == 'DR' || uomCode == 'tanker' || uomCode == 'EA') ? false : true;
    }

    function _getHeaderEntity(dataModel) {
        var acEntityId = APPCONSTANTS.userPreferences.ACEntityId;
        var continueLoopingHeaderEntityIds = true;
        var indexOfHeaderEntity = 0;
        while (continueLoopingHeaderEntityIds) {
            indexOfHeaderEntity = indexOfHeaderEntity + 1;
            if (dataModel["headerEntity" + indexOfHeaderEntity] != null) {
                if (dataModel["headerEntity" + indexOfHeaderEntity].entityType == acEntityId) {
                    continueLoopingHeaderEntityIds = false;
                }
            }
            else {
                continueLoopingHeaderEntityIds = false;
            }
        }
        if (dataModel["headerEntity" + indexOfHeaderEntity] != null)
            return dataModel["headerEntity" + indexOfHeaderEntity];
        return null;
    }

    function getBasicSettings() {
        var k = _.pluck(APPCONSTANTS.userPreferences.CommonSettings.lstSettings, "FieldName"), v = _.pluck(APPCONSTANTS.userPreferences.CommonSettings.lstSettings, "FieldValue")
        var basicSettingsObject = {};
        _.each(k, function (val, idx, list) {
            basicSettingsObject[val] = v[idx];
            //arr.push(o);
        });
        return basicSettingsObject;
    }


    function getMinMaxPrecision(fieldValue) {

        var basicSettingsObject = getBasicSettings();
        var decimalPrecision = basicSettingsObject.MinPrecessionValue;
        var maxDecimalPrecision = basicSettingsObject.MaxPrecessionValue;
        var totalDecimalPrecision = basicSettingsObject.MaxPrecessionValueforTotal;
        var taxesAndChargesTotalDecimalPrecision = basicSettingsObject.MaxPrecessionValueForTaxesAndCharges;

        var minMaxPrecisionForQuantity = "[" + basicSettingsObject.Decimal_MinPrecessionForQuantity + "," + basicSettingsObject.Decimal_MaxPrecessionForQuantity + "]";
        var minMaxPrecisionForUnitPrice = "[" + basicSettingsObject.Decimal_MinPrecessionForUnitPrice + "," + basicSettingsObject.Decimal_MaxPrecessionForUnitPrice + "]";
        var minMaxPrecisionForTotal = "[" + basicSettingsObject.Decimal_MinPrecessionForTotalField + "," + basicSettingsObject.MaxPrecessionValueforTotal + "]";
        var minMaxPrecisionForShippingCharges = "[" + basicSettingsObject.Decimal_MinPrecessionForShippingOrFreight + "," + basicSettingsObject.Decimal_MaxPrecessionForShippingOrFreight + "]";
        var minMaxPrecisionForOtherCharges = "[" + basicSettingsObject.Decimal_MinPrecessionForOtherCharges + "," + basicSettingsObject.Decimal_MaxPrecessionForOtherCharges + "]";
        var minMaxPrecisionForContactValue = "[" + basicSettingsObject.Decimal_MinPrecessionForContractValue + "," + basicSettingsObject.Decimal_MaxPrecessionForContractValue + "]";




        var minMaxPrecisionForFilterQuantity = "" + basicSettingsObject.Decimal_MinPrecessionForQuantity + ":" + basicSettingsObject.Decimal_MaxPrecessionForQuantity + "";
        var minMaxPrecisionForFilterUnitPrice = "" + basicSettingsObject.Decimal_MinPrecessionForUnitPrice + ":" + basicSettingsObject.Decimal_MaxPrecessionForUnitPrice + "";
        var minMaxPrecisionFilterForTotal = "" + basicSettingsObject.Decimal_MinPrecessionForTotalField + ":" + basicSettingsObject.MaxPrecessionValueforTotal + "";
        var minMaxPrecisionForFilterShippingCharges = "" + basicSettingsObject.Decimal_MinPrecessionForShippingOrFreight + ":" + basicSettingsObject.Decimal_MaxPrecessionForShippingOrFreight + "";
        var minMaxPrecisionFilterForOtherCharges = "" + basicSettingsObject.Decimal_MinPrecessionForOtherCharges + ":" + basicSettingsObject.Decimal_MaxPrecessionForOtherCharges + "";
        var minMaxPrecisionFilterForContactValue = "" + basicSettingsObject.Decimal_MinPrecessionForContractValue + ":" + basicSettingsObject.Decimal_MaxPrecessionForContractValue + "";
        var minMaxPrecisionFilterForTaxesandCharges = "" + basicSettingsObject.Decimal_MinPrecessionForTaxesAndCharges + ":" + basicSettingsObject.MaxPrecessionValueForTaxesAndCharges + "";



        if (fieldValue != undefined && fieldValue != "" && fieldValue) {
            switch (fieldValue.toLowerCase()) {
                case "quantity":
                    return minMaxPrecisionForQuantity;
                case "unitprice":
                    return minMaxPrecisionForUnitPrice;
                case "shippingcharges":
                    return minMaxPrecisionForShippingCharges;
                case "othercharges":
                    return minMaxPrecisionForOtherCharges;
                case "total":
                    return minMaxPrecisionForTotal;
                case "taxesandchargestotal":
                    return minMaxPrecisionFilterForTaxesandCharges;
                case "quantityfilter":
                    return minMaxPrecisionForFilterQuantity;
                case "unitpricefilter":
                    return minMaxPrecisionForFilterUnitPrice;
                case "shippingchargesfilter":
                    return minMaxPrecisionForFilterShippingCharges;
                case "otherchargesfilter":
                    return minMaxPrecisionFilterForOtherCharges;
                case "totalfilter":
                    return minMaxPrecisionFilterForTotal;
                case "taxesandchargestotalfilter":
                    return minMaxPrecisionFilterForTaxesandCharges;
                case "calculationvalue":
                    return minMaxPrecisionForOtherCharges;
                case "calculationvaluefilter":
                    return minMaxPrecisionFilterForOtherCharges;
                case "chargeamount":
                    return minMaxPrecisionForTotal;
                case "chargeamountfilter":
                    return minMaxPrecisionFilterForTotal;
                default:
                    return maxDecimalPrecision;
            }
        }
        else
            return decimalPrecision;
    }



    function getDecimalPrecision(rowData) {
        var basicSettingsObject = getBasicSettings();
        if (rowData != undefined) {

            switch (rowData.toLowerCase()) {
                case "quantity":
                    return basicSettingsObject.Decimal_MinPrecessionForQuantity;
                case "unitprice":
                    return basicSettingsObject.Decimal_MinPrecessionForUnitPrice;
                case "shippingcharges":
                    return basicSettingsObject.Decimal_MinPrecessionForShippingOrFreight;
                case "othercharges":
                    return basicSettingsObject.Decimal_MinPrecessionForOtherCharges;
                case "contractvalue":
                    return basicSettingsObject.Decimal_MinPrecessionForContractValue;
                case "taxesandchargestotal":
                    return basicSettingsObject.MaxPrecessionValueForTaxesAndCharges;
                case "total":
                    return basicSettingsObject.Decimal_MinPrecessionForTotalField;
                case "total":
                    return basicSettingsObject.Decimal_MinPrecessionForTaxesAndCharges;
                default:
                    return basicSettingsObject.MinPrecessionValue;
            }
        }
        else
            return basicSettingsObject.MinPrecessionValue;
    }

    function setAccountingProps(probs) {
        _accountingProps = probs;
    };

    var noOfRowsCount = 0;
    function getTotalRowsCount() {
        return noOfRowsCount;
    };

    function setTotalRowsCount(totalrows) {
        noOfRowsCount = totalrows;
    };

    var gridConfiguration;
    function getGridConfig() {
        return gridConfiguration;
    };

    function setGridConfig(gridConfig) {
        gridConfiguration = gridConfig;
    };

    var headerConfiguration;
    function getHeaderConfig() {
        return headerConfiguration;
    };

    function setHeaderConfig(headerConfig) {
        headerConfiguration = headerConfig;
    };

    var notificationId;
    function getNotificationId() {
        return notificationId;
    };

    function setNotificationId(notificationUniqueId) {
        notificationId = notificationUniqueId;
    };

    var modeForNotificationView;
    function getModeForNotification() {
        return modeForNotificationView;
    };

    function setModeForNotification(notificationMode) {
        modeForNotificationView = notificationMode;
    };


    var notesAndAttachmentsHeaderConfig;
    function setNotesAndAttachmentsHeaderConfig(data) {
        notesAndAttachmentsHeaderConfig = data;
    };

    var notesAndAttachmentsLineConfig;
    function setNotesAndAttachmentsLineConfig(data) {
        notesAndAttachmentsLineConfig = data;
    };

    function getNotesAndAttachmentsLineConfig() {
        return notesAndAttachmentsLineConfig;
    };

    function getNotesAndAttachmentsHeaderConfig() {
        return notesAndAttachmentsHeaderConfig;
    };



    function getCellInvalidIndex() {

        return cellInvalidIndex;
    }
    function removeIndexFromArray(data, type) {
        if (type == 'invalidCell')
            cellInvalidIndex = _.without(cellInvalidIndex, data);
        else if (type == 'invalid')
            cellIndex = _.without(cellIndex, data);
    }

    function setCellInvalidIndex(data) {
        var result = _.find(cellInvalidIndex, function (result) {
            return result == data;
        });

        if (typeof result == 'undefined')
            cellInvalidIndex.push(data);
    }
    function setCellIndex(data) {
        var result = _.find(cellIndex, function (result) {
            return result == data;
        });

        if (typeof result == 'undefined')
            cellIndex.push(data);
    }
    function getCellIndex() {

        return cellIndex;
    }

    var errorCount = 0;
    var externalErrorCount = 0;
    function setGridErrorCount(data, type, colObj) {

        if (type == 'grid')
            errorCount = data;
        else if (type == 'cell')
            errorCount = errorCount - data;
        else if (type == 'external')
            externalErrorCount = externalErrorCount + 1;

        obj = { "errorCount": errorCount, 'obj': colObj };
        $rootScope.$broadcast('errorCount', obj);
    }

    function setErrorCount(data,type)
    {
        if (type !== 'delete')
            errorCount += data;
        else
            errorCount -= data;
    }

    function getGridErrorCount() {

        return (errorCount !== undefined ? errorCount : 0);
    }

    function getGridExtErrorCount() {

        return externalErrorCount;
    }



    var teamMembersList;
    function _setTeamMembers(data) {
        if (data != null)
            teamMembersList = data;
    }

    function _getTeamMembers() {
        return teamMembersList;
    }



    function setGridInstance(data) {
        gridInstance = data;
    }
    function getGridInstance() {

        return gridInstance;
    }

    function triggerValidations(type,val,Item)
    {
        var dataModelItems = (_documentData != undefined ? _documentData.items : dataModel.items);

        var copyItems = angular.copy(dataModelItems);
        if (type !== 'add') {
            _.each(copyItems, function (items, index) {
                if (copyItems[index] != undefined && copyItems[index].ItemStatus !== undefined && copyItems[index].ItemStatus.id === 121)
                    copyItems.splice(index, 1);
            });
        }
        if (type === 'add') {
            copyItems = [Item]
        }

        RuleEngine.setRules(gridConfiguration, copyItems, [], '', 'grid');
        RuleEngine.executeNools(function (e) {
            if (type === 'add') {
                errorCount += (val) * (e.failedRules[2].length);
                invalidArray = getAllinvalidOrDisableItems(e.failedRules[0], val);
                disableArray = getAllinvalidOrDisableItems(e.failedRules[1], val);
                var errorObjs = getAllErrorObj(e.failedRules[2], val);
                console.log(errorObjs);
                var obj = { 'invalidArray': invalidArray, 'disableArray': disableArray };
                $rootScope.$broadcast('updateInvalidDisableArray', obj);
                $rootScope.$broadcast('updatedErrorCountOnGrid', { 'invalidObj': errorObjs });
            }
            else {
                console.log(e.failedRules[2]);
                errorCount = e.failedRules[2].length;
                $rootScope.$broadcast('updatedErrorCountOnGrid', { 'invalidObj': e.failedRules[2] });
            }
        }, '');   
    }

    function getAllErrorObj(errorObjs,val)
    {
        var errorArray = [];
        if (errorObjs.length > 0) {
            for (var e = 0; e < errorObjs.length; e++) {
                var errIndex = errorObjs[e].rowColIndex;
                errIndex = errIndex.split('_');
                for (var x = parseInt(errIndex[0]) + 1 ; x < val + parseInt(errIndex[0]) ; x++) {
                    var errorMsg = errorObjs[e].error;
                    errorMsg=errorMsg.split(':');
                    errorMsg[0] = "Line " + x + ' : ';
                    var rowObj = angular.copy(errorObjs[e].row);
                    rowObj.lineNumber = x;
                    errorArray.push({ 'col': errorObjs[e].col, row: rowObj, 'rowColIndex': x + '_' + errIndex[1], 'state': 'invalid', 'error': errorMsg[0] + errorMsg[1] });
                }
            }
        }
        return errorObjs.concat(errorArray);
    }

    function getAllinvalidOrDisableItems(array, val)
    {
        var phyArray = [];
        if (array.length > 0)
        {
            for (var l = 0; l < array.length; l++)
            {
                var splitted=array[l].split('_');
                for (var v = parseInt(splitted[0]) + 1; v < ((val) + parseInt(splitted[0])) ; v++)
                {
                    phyArray.push((v) + '_' + splitted[1]);
                }
            }
            return array.concat(phyArray);
        }
    }


    var chargeForHeaderErrorCount;
    function triggerChargeForHeaderValidations() {
        RuleEngine.setRules(ChargeForHeaderConfig, _documentData.ItemChargesForHeader, [], '', 'grid');
        RuleEngine.executeNools(function (e) {
            console.log(e)
            chargeForHeaderErrorCount = e.failedRules.length;
            $rootScope.$broadcast('updatedErrorCountOnChargeForHeaderGrid', e.failedRules);
        }, '');
    }

    function setChargeForHeaderErrorCount(data, type, colObj) {

        errorCount = data;

        obj = { "errorCount": errorCount, 'obj': colObj };
        $rootScope.$broadcast('chargeForHeaderErrorCount', obj);
    }


    var tabIndex;
    function setActiveTabIndex(data) {
        tabIndex = data;
    }
    function getActiveTabIndex() {
        return tabIndex;
    }


    function setDocumentData(scope) {
        _baseObject = scope;
    };
    function getDocumentData() {
        return _baseObject;
    };
    function getMyFormScope(scope) {
        if (!scope)
            return undefined;
        else if (_parScope)
            return _parScope;
        else if (scope.myForm) {
            _parScope = scope;
            return _parScope;
        }
    };

    function getNote() {
        return _note;
    }

    function setNote(note) {
        _note = note;
    }

    function getSelectedItem() {
        return _selectedItem;
    }

    function setSelectedItem(item) {
        _selectedItem = item;
    }

    function setManufacturerDetails(manufacturerName, manufacturerPartNumber, callback) {
        // add actionIconDelete:true to set the delete button and actionIconAdd:true to set the add button
        //if (manufacturerName !== null && manufacturerPartNumber!== null)
        _manufacturerDetails = { items: [{ itemNumber: manufacturerPartNumber, name: manufacturerName, actionIconAdd: false }], callback: callback, guid: new Date().getTime() };
    }

    function getManufacturerDetails() {
        return _manufacturerDetails;
    }

    function getButtonConfig(text) {
        return { title: applyLocalizationFilter(text), flat: true };
    }

    function applyLocalizationFilter(text) {
        return $filter('translate')(text);
    }

    function GetDocVal() {
        var price = 0;
        _baseObject.items.map(function (x) {
            price = price + (this.parseNumber(x.unitPrice) * this.parseNumber(x.quantity));
        }.bind(this));
        return this.parseNumber(price, this.getDecimalPrecision("total"));
    };

    function GetOtherCharges() {
        var price = 0;
        _baseObject.items.map(function (x) {
            if (!x.isDeleted)
                price = price + this.parseNumber(x.otherCharges);
        }.bind(this));
        return this.parseNumber(price);
        //return this.parseNumber(price, this.getDecimalPrecision("taxesAndChargesTotal"));
    };

    function GetTaxes() {
        var price = 0;
        _baseObject.items.map(function (x) {
            if (!x.isDeleted)
                price = price + this.parseNumber(x.taxes);
        }.bind(this));
        return this.parseNumber(price);
        //return this.parseNumber(price, this.getDecimalPrecision("taxesAndChargesTotal"));
    };

    function GetShipping() {
        var price = 0;
        _baseObject.items.map(function (x) {
            price = price + this.parseNumber(x.shippingCharges);
        }.bind(this));
        return price;
        //return this.parseNumber(price, this.getDecimalPrecision("total"));
    };

    function GetTotalPrice() {
        var price = 0;
        _baseObject.items.map(function (x) {
            price = price + (this.parseNumber(x.unitPrice) * this.parseNumber(x.quantity));
            price = price + this.parseNumber(x.shippingCharges);
            price = price + this.parseNumber(x.otherCharges) + this.parseNumber(x.taxes);
        }.bind(this));
        return this.parseNumber(price);
        // return this.parseNumber(price, this.getDecimalPrecision("total"));
    };

    function parseNumber(num, dp) {
        var returnValue = 0;
        if (isNaN(dp))
            dp = getDecimalPrecision();
        try {
            if (num)
                returnValue = parseFloat(num).toFixed(dp);

        } catch (e) {
            console.log("number parsing failed for %s %s", num, dp);
        }
        return parseFloat(returnValue).toFixed(dp);
    };

    function setItemNoIndex(items) {
        if (items) {
            items.map(function (item) {
                if (_maxNumber < item.id)
                    _maxNumber = item.id;
            });
        }
    };

    function setAlertMsg(msg) {
        _message = msg;
    }

    function getChargesForTaxCalculation(item) {
        var totalChargeForTaxes = 0;
        if (item != undefined && item.ItemChargesForSubLine != undefined && item.ItemChargesForSubLine.length > 0) {
            _.each(item.ItemChargesForSubLine, function (itemCharge) {
                if (itemCharge.ChargeDetails.IsIncludeForTax === true) {
                    totalChargeForTaxes += itemCharge.ChargeAmount;
                };
            });
        };
        return totalChargeForTaxes;
    };
    function getModalMessage() {
        return _message;
    };

    function getBlkEdit() {
        return {
            data: {
                category: {
                }
            },
            config: {
                isSequenceToBeMaintained: false,
                sections: [{
                    isMandatory: true,
                    plain: true,
                    rows: [{
                        properties: [
                        ]
                    }
                    ]
                }]
            }
        };
    };

    function getItemDetailSet() {
        return [
            { key: "Lines", "title": $filter('translate')("P2P_Req_Lines"), "contentUrl": "tabs1.html", "tabIndex": P2PConstants.TAB_TYPES.Lines },
            { key: "Accounting", "title": $filter('translate')("P2P_Req_Accounting"), "contentUrl": "tabs2.html", "tabIndex": P2PConstants.TAB_TYPES.Accounting }
        ];
    };

    function getItemTypes() {
        return [
          {
              key: "MATERIALS",
              title: $filter('translate')("P2P_Req_Materials")
          },
          {
              key: "SERVICES",
              title: $filter('translate')("P2P_Req_Services")
          }
        ];
    };
    var comparedItemsData;
    function setItemsComparedData(data) {
        comparedItemsData = data;
    }    

    var headerSupplierData;
    function compareObjectSupplier(data) {
        headerSupplierData = data;
    }

    var comparedSplitsData;
    function setSplitsComparedData(data) {
        comparedSplitsData = data;
    }

    function getSplitTypes(item) {
        return [
            {
                key: 0,
                title: $filter('translate')(item == undefined ? 'P2P_Req_NumberField' : (item.type.id === 1 ? 'P2P_Req_Quantity' : (item.type.id === 2 ? 'Amount' : 'P2P_Req_NumberField')))
            }, {
                key: 1,
                title: $filter('translate')('P2P_Req_PercentageField')
            }
        ];
    }

    function getDropDownConfig() {
        return {
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        };
    };

    function getSplitOpts() {
        return [{
            title: 'Quantity',
            key: $filter('translate')('P2P_Req_AmountField')
        }, {
            title: 'Percentage',
            key: $filter('translate')('P2P_Req_PercentageField')
        }];
    }
    var comparedItemsData;
    function setItemsComparedData(data) {
        comparedItemsData = data;
    }
    var comparedHeaderData;
    function compareObjectHeader(data) {
        comparedHeaderData = data;
    }   

    function getSplitItem(itemid) {
        var time = new Date();
        //time = time.toDateString();
        time = "\/Date(" + time.getTime() + ")\/";
        var split = {
            randvar: Date.parse(new Date()),
            id: 0,
            documentCode: _documentData != undefined ? _documentData.id : dataModel.id,
            documentItemId: itemid,
            quantity: 1,
            percentage: 100,
            createdOn: time,
            lastModifiedOn: time,
            splitItemTotal: 0,
            tax: 0,
            createdBy: {
                id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                name: APPCONSTANTS.userPreferences.UserBasicDetails.UserName
            },
            lastModifiedBy: {
                id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                name: APPCONSTANTS.userPreferences.UserBasicDetails.UserName
            },
            requester: null,
            type: {
                id: 1,
                name: "P2P_REQ_Material"

            },
            lineId: itemid
        };

        //Getting grid configurations
        var accountpropone = gridConfiguration;
        var accountproptwo = accountpropone[1].cloumnDefs;
        accountproptwo.map(function (x) {
            if (typeof x.attributes != 'undefined' && x.attributes.model !== 'requester' && typeof x.attributes.model != 'undefined') {
                var headerEntity = getHeaderEntityName(x.attributes.model);
                var heaenname;
                if (typeof headerEntity != 'undefined') {
                    heaenname = headerEntity.name;
                }
                if (typeof headerEntity != 'undefined' && _documentData !== undefined && _documentData[heaenname] !== undefined)
                    split[x.attributes.model] = getEntityFromHeader(null, _documentData[heaenname]);
                else
                    split[x.attributes.model] = getEntityFromHeader(headerEntity);
            }
        });
        var splitAccountingExtraFields = undefined;
        if (headerConfiguration && headerConfiguration.SplitaccountingExtraFields) {
            splitAccountingExtraFields = headerConfiguration.SplitaccountingExtraFields;
        }
        _.each(APPCONSTANTS.userPreferences.splitAccountingFields, function (obj) {
            if (obj.FieldName == 'Requester') {
                obj.EntityDetailCode = APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode;
                obj.DisplayName = APPCONSTANTS.userPreferences.FullName;
                split['requester'] = requesterglmethod(obj);
            }
            else if (obj.FieldName == "GLCode") {
                split['gLCode'] = requesterglmethod(obj);
            }
            else if (splitAccountingExtraFields) {
                if (splitAccountingExtraFields[obj.FieldName]) {
                    split[splitAccountingExtraFields[obj.FieldName]] = requesterglmethod(obj);
                }
            }

        });
        return split;
    }

    function requesterglmethod(obj) {
        var newobj = {};
        newobj.code = (obj.EntityDetailCode != undefined && obj.EntityDetailCode != null) ? obj.EntityDetailCode.toString() : "";
        newobj.name = obj.DisplayName;
        newobj.entityCode = (obj.EntityCode != undefined && obj.EntityCode != null) ? obj.EntityCode.toString() : "";
        newobj.entityType = obj.EntityTypeId;
        newobj.fieldId = obj.SplitAccountingFieldId;
        newobj.splitEntityId = 0;

        return newobj;
    }

    function getHeaderEntityName(entity) {
        var tempEnt;
        for (var splitEnt in P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].LINE_ACC_ENTITIES) {
            if (P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].LINE_ACC_ENTITIES[splitEnt] === entity) {
                tempEnt = splitEnt;
                break;
            }
        }
        if (!tempEnt)
            return
        return { code: tempEnt, name: P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].DEFAULT_HEADER_ENTITIES[tempEnt] };
    };

    function getEntityFromHeader(headerEnt, headerVal) {
        var obj = { code: "0", name: "", entityCode: null, entityType: headerEnt == null ? null : headerEnt.code, fieldId: 0, splitEntityId: 0 };
        if (headerVal) {
            var defaultSplitobj = _.find(APPCONSTANTS.userPreferences.splitAccountingFields, { EntityTypeId: headerVal.entityType });
            obj.name = headerVal.name;
            obj.code = headerVal.id;
            obj.entityCode = headerVal.entityCode;
            obj.entityType = headerVal.entityType;
            obj.fieldId = defaultSplitobj != undefined ? defaultSplitobj.SplitAccountingFieldId : 0;
            return obj;
        }
        if (!headerEnt)
            return null;
        var id = headerEnt.code;
        if (APPCONSTANTS.userPreferences.splitAccountingFields != undefined && APPCONSTANTS.userPreferences.splitAccountingFields != null && APPCONSTANTS.userPreferences.splitAccountingFields.length > 0)
            for (var i in APPCONSTANTS.userPreferences.splitAccountingFields) {
                if (APPCONSTANTS.userPreferences.splitAccountingFields[i].EntityTypeId == id) {
                    obj = requesterglmethod(APPCONSTANTS.userPreferences.splitAccountingFields[i]);
                    break;
                }
            }
        return obj;
    }

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
    };

    function getDefaultItemTypeForSelectedPurchaseType() {
        var defaultItemType;
        _.filter(_setPurchaseTypeItemTypes, function (item) {
            if (item.IsDefault && item.PurchaseTypeId == _documentData.purchaseType.id) {
                defaultItemType = item
                return defaultItemType;
            }
        });

        var itemTypeName = "";
        //return { id: defaultItemType.ServiceTypeId , name: defaultItemType.ItemType };
        return { id: defaultItemType != undefined ? defaultItemType.ServiceTypeId : 0, name: defaultItemType != undefined ? defaultItemType.ItemType : '' };

    }
    function getNewInvoiceItem() {
        var item = getNewReqItem();
        item.Contract = {
            "ContractExpiryDate": null,
            "ContractNumber": "",
            "ContractName": "",
            "ContractValue": "",
            "PaymentTerms": ""
        };
        item.pOLineItemNumber = "";
        item.matching = { "id": 1, "name": "two way matching" };
        item.orderedQuantity = 0;
        item.orderUnitPrice = 0;
        item.remainingInvoiceAmount = 0;
        item.invoiceAmount = 0;
        item.orderItemId = 0;
        return item;
    };

    function getNewReqItem() {
        var time = new Date();
        var newtime = new Date(time);
        var needByDateByDays = P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].DEFAULT_NEEDBYDATEBYDAYS;
        var populateDefaultNeedByDate = P2PConstants.CLIENT_CONSTANTS[APPCONSTANTS.userPreferences.TenantName].ALLOW_DEFAULT_NEEDBYDATE;
        newtime.setDate(newtime.getDate() + parseInt(needByDateByDays));
        //  DATE FORMAT "\/Date(1463060837290+0000)\/"
        time = "\/Date(" + time.getTime() + ")\/";
        newtime = "\/Date(" + newtime.getTime() + ")\/";
        _maxNumber++;
        var item = {};
        item.status = 0;
        item.splitType = 0;
        item.id = 0;
        item.lineNumber = 0;
        item.documentCode = _documentData.id;
        item.documentStatus = _documentData.status;
        item.p2PLineItemId = 0;
        item.catalogItemId = 0;
        item.taxes = parseInt(0);
        item.taxPercentage = 0;
        item.taxItems = null;
        item.quantity = parseInt(1);
        item.unitPrice = parseInt(0);
        item.otherCharges = parseInt(0);
        item.shippingCharges = parseInt(0);
        item.contractValue = 0;
        item.endDate = null;
        item.startDate = null;
        item.createdOn = time;
        item.lastModifiedOn = time;
        item.contractExpiryDate = null;
        item.name = "";
        item.buyerItemNumber = { 'code': '' };
        item.description = { 'desc': '' };
        item.manufacturer = null;
        item.contractNumber = 0;
        item.partnerItemNumber = "";
        item.manufacturerPartNumber = null;
        item.ManufacturerModel = "";
        item.orderedQuantity = 0;
        item.type = getDefaultItemTypeForSelectedPurchaseType();
        item.needByDate = populateDefaultNeedByDate ? newtime : null;
        item.requestedDate = (item.type.id == 2 || item.type.id == 3) ? null : time;
        item.shippingMethod = "";
        item.inventoryType = false;
        item.deliverTo = null;
        item.deliverToStr = "";
        item.isDeleted = false;
        item.shipTo = null;
        item.matching = {'id':0,'name':'None'};
        item.uom = {
            code: "EA",
            name: "Each"
        };
        item.source = {
            id: 1,
            name: ""
        };
        item.partner = {
            id: 0,
            name: ""
        };
        item.category = {
            id: APPCONSTANTS.userPreferences.ContactPASDefault !== null ? APPCONSTANTS.userPreferences.ContactPASDefault.PASCode !== null ? APPCONSTANTS.userPreferences.ContactPASDefault.PASCode : "0" : "0",
            name: APPCONSTANTS.userPreferences.ContactPASDefault !== null ? APPCONSTANTS.userPreferences.ContactPASDefault.PASName !== null ? APPCONSTANTS.userPreferences.ContactPASDefault.PASName : "Select" : "Select"
        };
        item.createdBy = {
            id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
            name: APPCONSTANTS.userPreferences.UserBasicDetails.UserName
        };
        item.lastModifiedBy = {
            id: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
            name: APPCONSTANTS.userPreferences.UserBasicDetails.UserName
        };
        item.splits = [getSplitItem(item.id)];
        item.ItemStatus = { 'id': 1, 'name': '' };
        item.CustomAttrQuestionSetCodesForItem = angular.copy(_documentData.CustomAttrQuestionSetCodesForItem);
        return item;
    };

    function getNewOrderItem() {
        return getNewReqItem();
    };


    function getTaxItemsByEntityID(shipToID, headerEntityID, headerEntityTypeID, applyTaxCalculation,linenumber) {
        var lstShipToBasedTaxItems = new Array();
        var lstHeaderEntityBasedTaxItems = new Array();
        var HeaderEntityService = httpService.directhttp({ "url": RESTURLs.SM1_Controller_GetTaxItemsByEntityID, "method": "GET", "timeout": 5500, "params": { "shipToID": shipToID, "headerEntityID": headerEntityID, "headerEntityTypeID": headerEntityTypeID } });
        HeaderEntityService
        .then(function (data) {
            var objTaxItemCollection = JSON.parse(data);
            objTaxItemCollection.map(function (x, i) {
                var tax_item = {};
                tax_item.taxId = x.TaxId;
                tax_item.description = x.TaxDescription;
                tax_item.code = x.TaxCode;
                tax_item.percent = x.TaxPercentage;
                tax_item.taxType = {};
                tax_item.taxType.id = x.TaxTypeId;
                tax_item.taxType.name = x.TaxType;
                //ToDo: 97 will be moved to APPCONTANTS, which is meant to SHIPTO
                if (x.EntityTypeId == 97)
                    lstShipToBasedTaxItems.push(tax_item);
                else
                    lstHeaderEntityBasedTaxItems.push(tax_item);
            });
            applyTaxCalculation(((lstShipToBasedTaxItems.length > 0) ? lstShipToBasedTaxItems : lstHeaderEntityBasedTaxItems), linenumber);
            // return (lstShipToBasedTaxItems.length > 0) ? lstShipToBasedTaxItems : lstHeaderEntityBasedTaxItems;

        })
        .catch(function (errorCallback) {
        });
    };
    function getChargesForTaxCalculation(item) {
        var totalChargeForTaxes = 0;
        if (item != undefined && item.ItemChargesForSubLine != undefined && item.ItemChargesForSubLine.length > 0) {
            _.each(item.ItemChargesForSubLine, function (itemCharge) {
                if (itemCharge.ChargeDetails.IsIncludeForTax === true) {
                    totalChargeForTaxes += itemCharge.ChargeAmount;
                };
            });
        };
        return totalChargeForTaxes;
    };

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
    };

    function calculateAccSplitValuesOnChange(rowData, splitValue, getSplitTaxes) {
        var totalSplitsQuantity = 0;
        _.each(_.pluck(rowData.splits, 'quantity'), function (item, idx, arr) {
            totalSplitsQuantity = totalSplitsQuantity + item;
        });

        _.each(rowData.splits, function (split, idx, splits) {
            var quantity = split.type.id === 2 ? rowData.unitPrice : rowData.quantity;
            if (quantity > totalSplitsQuantity) {
                split.quantity = split.quantity + ((split.quantity / totalSplitsQuantity) * (quantity - totalSplitsQuantity));
            } else if (quantity < totalSplitsQuantity) {
                split.quantity = split.quantity - ((split.quantity / totalSplitsQuantity) * (totalSplitsQuantity - quantity));
            }
            split.itemQuantity = rowData.quantity;
            split.unitPrice = rowData.unitPrice;
            split.splitItemTotal = splitValue(split);
            if (rowData.isTaxExempt)
                split.taxes = "Exempt";
            else
                split.taxes = getSplitTaxes(split);
        });
    };

    var DOCUMENT_STATUS_ID;
    function setDocumentStatus(status) {
        DOCUMENT_STATUS_ID = status;
    };

    function getDocumentStatus() {
        return DOCUMENT_STATUS_ID;
    };

    //function getDecimalPrecision(rowDetails, minPrecision, maxPrecision) {
    //    if (rowDetails === "quantity" || rowDetails === "unitPrice" || rowDetails === "otherCharges" || rowDetails === "shippingCharges" || rowDetails === "taxes")
    //        return maxPrecision;
    //    else
    //        return minPrecision;
    //}

    function mapAndGetP2PSettings(lstSettings) {
        var k = _.pluck(lstSettings, "FieldName");
        var v = _.pluck(lstSettings, "FieldValue")
        var basicSettingsObject = {};
        _.each(k, function (val, idx, list) {
            if ((v[idx] + '').toLowerCase() == 'true') {
                v[idx] = true;
            }
            else if ((v[idx] + '').toLowerCase() == 'false') {
                v[idx] = false;
            }
            basicSettingsObject[val] = v[idx];
            //arr.push(o);
        });
        return basicSettingsObject;
    };
    function _getSubTitle() {
        return _documentData.number;
    }
    function getQueryStringValue(key) {
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }
    function getSublineChargeConfig() {
        var chargeConfig = null;
        angular.forEach(gridConfiguration, function (obj, index) {
            if (obj._internalName == "sublineCharge") {
                chargeConfig = obj;
            }
        });
        return chargeConfig;
    }
    function setChargeTabSelectById(modelName, idKey, idValue, model) {
        var chargeConfig = getSublineChargeConfig();
        if (chargeConfig == null) {
            return;
        }

        angular.forEach(chargeConfig.cloumnDefs, function (value, key) {
            if (value.attributes != undefined && value.attributes.model == modelName) {
                angular.forEach(value.attributes.options, function (optionsValue, optionsKey) {
                    if (optionsValue[idKey] == idValue) {
                        model[idKey] = idValue;
                        model[value.attributes.dataKey] = optionsValue[value.attributes.dataKey];
                    }
                });
            }
        });
    }
    function toggleSublineChargeTab(enableTab) {
        var chargeConfig = getSublineChargeConfig();
        if (chargeConfig == null) {
            return;
        }
        if (chargeConfig.isShown.length != 0) {
            _sublineShownArray = chargeConfig.isShown;
        }
        if (enableTab) {
            chargeConfig.isShown = _sublineShownArray.slice();
        } else {
            chargeConfig.isShown = [];
        }
    }
    function isEnableCharges() {
        var purchaseTypeMappingForChargeList = headerConfiguration.MappingPurchaseTypeListForCharge;
        if (typeof purchaseTypeMappingForChargeList == 'undefined')
            return false;
        if (purchaseTypeMappingForChargeList.indexOf(_documentData.purchaseType.id) !== -1) {
            return true;
        }
        return false;
    }
    function getSublineChargeIndex() {
        var i = -1;
        angular.forEach(gridConfiguration, function (obj, index) {
            if (obj._internalName == "sublineCharge") {
                i = index;
            }
        });
        return i;
    }

    var _defaultChargeMaster;

    function _setDefaultChargeName() {

        if (_defaultChargeMaster != undefined && _defaultChargeMaster != null) {
            return angular.copy(_defaultChargeMaster);
        }

        var obj = {
            "ChargeMasterId": 3,
            "ChargeName": "",
            "ChargeDescription": "",
            "ChargeTypeCode": 0,
            "EDICode": null,
            "IsAllowance": false,
            "CalculationBasisId": 1,
            "CalculationBasis": "Per Unit",
            "EntityDetailCode": 0,
            "GLDetailId": 0,
            "IsIncludeForTax": false,
            "IsEditableOnInvoice": false,
            "IsIncludeForRetainage": false,
            "TolerancePercentage": 0,
            "IsEditableOnOrder": false,
            "ChargeTypeName": ""
        }

        if (typeof _documentData == "undefined" || typeof _documentData.DefaultChargeMasterDetails == "undefined") {
            _defaultChargeMaster = obj;
            return angular.copy(obj);
        }

        var defaultChargeMasterDetail = _documentData.DefaultChargeMasterDetails;
        obj.ChargeMasterId = defaultChargeMasterDetail.ChargeMasterId;
        obj.ChargeName = defaultChargeMasterDetail.ChargeName;
        obj.ChargeDescription = defaultChargeMasterDetail.ChargeDescription;
        obj.ChargeTypeCode = defaultChargeMasterDetail.ChargeTypeCode;
        obj.EDICode = defaultChargeMasterDetail.EDICode;
        obj.IsAllowance = defaultChargeMasterDetail.IsAllowance;
        obj.CalculationBasisId = defaultChargeMasterDetail.CalculationBasisId;
        obj.CalculationBasis = defaultChargeMasterDetail.CalculationBasis;
        obj.EntityDetailCode = defaultChargeMasterDetail.EntityDetailCode;
        obj.GLDetailId = defaultChargeMasterDetail.GLDetailId;
        obj.IsIncludeForTax = defaultChargeMasterDetail.IsIncludeForTax;
        obj.IsEditableOnInvoice = defaultChargeMasterDetail.IsEditableOnInvoice;
        obj.IsIncludeForRetainage = defaultChargeMasterDetail.IsIncludeForRetainage;
        obj.TolerancePercentage = defaultChargeMasterDetail.TolerancePercentage;
        obj.IsEditableOnOrder = defaultChargeMasterDetail.IsEditableOnOrder;
        obj.ChargeTypeName = defaultChargeMasterDetail.ChargeTypeName;

        // get calculationbasis name based on Id
        var chargeConfig = getSublineChargeConfig();

        angular.forEach(chargeConfig.cloumnDefs, function (value, key) {
            if (value.attributes != undefined && value.attributes.model == "CalculationBasis") {
                angular.forEach(value.attributes.options, function (optionsValue, optionsKey) {
                    if (optionsValue.id == obj.CalculationBasisId) {
                        obj.CalculationBasis = optionsValue.name;
                    }
                });
            }
        });
        _defaultChargeMaster = obj;
        return angular.copy(_defaultChargeMaster);
    }
    function checkAndCorrectChargeLineNumber(itemObj) {
        if (itemObj.ItemChargesForSubLine == null || itemObj.ItemChargesForSubLine.length == 0 || itemObj.ItemChargesForSubLine.length == 1) {
            return;
        }
        var check = false;
        for (var i = 0 ; i < itemObj.ItemChargesForSubLine.length - 1; i++) {
            if (itemObj.ItemChargesForSubLine[i].LineNumber == itemObj.ItemChargesForSubLine[i + 1].LineNumber) {
                check = true;
                break;
            }
        }

        var index = 1;
        if (check) {
            for (var i = 0 ; i < itemObj.ItemChargesForSubLine.length ; i++) {
                itemObj.ItemChargesForSubLine[i].LineNumber = index;
                index++;
            }
        }
    }

    function getNewLineItemCharge(itemObj) {
        var newCharge =
        {
            "splits": [],
            "splitType": 0,
            "ItemChargeId": 0,
            "DocumentItemId": itemObj.id,
            "DocumentCode": itemObj.documentCode,
            "P2PLineItemID": itemObj.p2PLineItemId,
            "LineNumber": 1,
            "ItemTypeID": 4,
            "CalculationValue": 0,
            "ChargeAmount": 0,
            "AdditionInfo": "",
            "CreatedBy": 0,
            "UpdatedBy": 0,
            "IsDeleted": false,
            "_TempChargeLineNumber": itemObj.ItemChargesForSubLine.length + 1,
            "ChargeDetails": _setDefaultChargeName(),
            "IsHeaderLevelCharge": false,
            "TotalAmount": 0,
            "Tax": 0,
            "AdditionalCharges": 0,
            "TotalAllowance": 0,
            "TotalCharge": 0,
            "IsChecked": false,
            "ChargeItemCount": 0,
            "DocumentAdditionalCharges": 0,
            "DocumentTax": 0,
            "DocumentTotal": 0,
            "MatchStatus": 0,
        };
        if (itemObj.ItemChargesForSubLine.length > 0) {
            newCharge.LineNumber = _.max(itemObj.ItemChargesForSubLine, function (charge) { return charge.LineNumber; }).LineNumber + 1;
        }
        newCharge.splits.push(getSplitItem(0));
        itemObj.ItemChargesForSubLine.push(newCharge);
    }
    function deleteMultiItemChargeFromGrid(gridLines, selectedChargeRows) {

        angular.forEach(selectedChargeRows, function (selectedChargeRow, index) {
            angular.forEach(gridLines, function (lineObj, key) {
                if (lineObj.id == selectedChargeRow.entity.DocumentItemId) {
                    deleteLineItemCharge(lineObj, selectedChargeRow.entity);
                }
            });
        });

    }
    function deleteLineItemCharge(itemObj, currentCharge) {
        if (currentCharge.ItemChargeId != 0) {
            currentCharge.IsDeleted = true;
        } else {
            var index = -1;
            itemObj.ItemChargesForSubLine.forEach(function (chargeItem, i) {
                if (chargeItem._TempChargeLineNumber == currentCharge._TempChargeLineNumber) {
                    index = i;
                }
            });
            itemObj.ItemChargesForSubLine.splice(index, 1);
        }
    }

    function _getModelIndexForSubline(items, uniqueSublineId) {
        var itemIndex = -1;
        var sublineIndex = -1;
        var sublineFound = false;

        for (var i = 0; i < items.length && !sublineFound; i++) {
            if (items[i].ItemChargesForSubLine != undefined) {
                for (var j = 0; j < items[i].ItemChargesForSubLine.length; j++) {
                    if (items[i].ItemChargesForSubLine[j].uniqueSublineId == uniqueSublineId) {
                        itemIndex = i;
                        sublineIndex = j;
                        sublineFound = true;
                        break;
                    }
                }
            }
        }

        return { 'itemIndex': itemIndex, 'sublineIndex': sublineIndex };
    }

    function _processDeleteLineItemCharge(items, uniqueSublineId) {
        var sublineInfo = _getModelIndexForSubline(items, uniqueSublineId);
        var subline = items[sublineInfo.itemIndex].ItemChargesForSubLine[sublineInfo.sublineIndex];
        subline.IsDeleted = true;

        if (subline.ItemChargeId > 0) {
            setDeletedSublines(subline);
        }

        items[sublineInfo.itemIndex].ItemChargesForSubLine.splice(sublineInfo.sublineIndex, 1);
    }


    function _getLineItemSplitsTotalValue(qty,price,tax,charge){
        var accountingSplitMode = _getAccountSplitMode();
        var total = 0;
        if (accountingSplitMode == 1) {
            total = qty * price + tax + charge;
        } else if (accountingSplitMode == 2) {
            total = qty * price + tax;
        }
        return total;
    }

    function _getChargeSplitsTotalValue(charge) {
        var accountingSplitMode = _getAccountSplitMode();
        var total = 0;
        if (accountingSplitMode == 1) {
            total = 0;
        } else if (accountingSplitMode == 2) {
            total = charge;
        }
        return total;
    }


    function _getLineItemAdditionalChargeValue(charge) {
        var accountingSplitMode = _getAccountSplitMode();
        var additionVal = 0;
        if (accountingSplitMode == 1) {
            additionVal = charge;
        } else if (accountingSplitMode == 2) {
            additionVal = 0;
        }
        return additionVal;
    }

    function _getChargeItemAdditionalChargeValue(charge) {
        var accountingSplitMode = _getAccountSplitMode();
        var additionVal = 0;
        if (accountingSplitMode == 1) {
            additionVal = 0;
        } else if (accountingSplitMode == 2) {
            additionVal = 0;
        }
        return additionVal;
    }


    function _getAccountSplitMode() {
        var accountingSplitMode = 1;

        if (headerConfiguration.accountingSplitMode != undefined) {
            accountingSplitMode = headerConfiguration.accountingSplitMode;
        }
        return accountingSplitMode
    }

    function getNewChargeForHeaderlineItem() {
        var item = {};

        item = {
            "splits": [getSplitItem(0)],
            "ItemChargeId": 0,
            "DocumentCode": 0,
            "P2PLineItemID": 0,
            "LineNumber": 0,
            "splitType": 0,
            "ItemTypeID": 4,
            "CalculationValue": 0.000000,
            "ChargeAmount": 0.000000,
            "AdditionInfo": "",
            "CreatedBy": 0,
            "UpdatedBy": 0,
            "ChargeDetails": _setDefaultChargeName(),
            "IsHeaderLevelCharge": false,
            "TotalAmount": 0.0,
            "Tax": 0.0,
            "AdditionalCharges": 0.0,
            "TotalAllowance": 0.0,
            "TotalCharge": 0.0,
            "IsChecked": false,
            "ChargeItemCount": 0,
            "DocumentAdditionalCharges": 0.0,
            "DocumentTax": 0.0,
            "DocumentTotal": 0.0,
            "MatchStatus": 0
        };

        return item;
    };

    var ChargeForHeaderConfig;
    function getChargeForHeaderConfig() {
        return ChargeForHeaderConfig;
    };

    function setChargeForHeaderConfig(chargeForHeaderConfig) {
        ChargeForHeaderConfig = chargeForHeaderConfig;
    };

    var chargeForHeaderErrorCount;
    function setChargeForHeaderErrorCount(data, type, colObj) {

        if (type == 'grid')
            chargeForHeaderErrorCount = data;
        else if (type == 'cell')
            chargeForHeaderErrorCount = chargeForHeaderErrorCount - data;

        obj = { "chargeForHeaderErrorCount": chargeForHeaderErrorCount, 'obj': colObj };
        $rootScope.$broadcast('chargeForHeaderErrorCount', obj);
    }

    function getChargeForHeaderErrorCount() {

        return chargeForHeaderErrorCount;
    }


    function compareObject(objOld, objNew) {
        var ComparedDataAarray = [];
        var oldobjItems = objOld.items;
        var newObjItems = objNew.items;
        var oldobjItemsLength = oldobjItems.length;
        var newobjItemsLength = newObjItems.length;
        if (oldobjItemsLength >= newobjItemsLength) {
            _.each(oldobjItems, function (old, index) {
                var lineObj = {};
                var checkSplits = false;
                if (newObjItems[index] != undefined && oldobjItems[index].p2PLineItemId == newObjItems[index].p2PLineItemId) {
                    lineObj.items = [];
                    lineObj.supplier = [];
                    _.each(comparedItemsData, function (field) {
                        var varField = field[0].split('.');

                        if (newObjItems[index].ItemStatus.id == 121 && newObjItems[index].ItemStatus.id != oldobjItems[index].ItemStatus.id) {
                            lineObj.action = "Cancelled";
                            lineObj.items.push({ 'field': field[1], 'old': eval('oldobjItems[index].' + field[0]), 'new': eval('newObjItems[index].' + field[0]) });
                            lineObj.lineObj = newObjItems[index];
                            lineObj.lineObjOld = oldobjItems[index];
                        }
                        else {

                            if (eval('oldobjItems[index].' + varField[0]) != null && eval('newObjItems[index].' + varField[0]) != null && eval('oldobjItems[index].' + field[0]) != eval('newObjItems[index].' + field[0])) {
                                if (field[2] == 'date' && eval('newObjItems[index].' + field[0]) != null && eval('oldobjItems[index].' + field[0]) != null) {
                                    if (!compareAndReturnDate(eval('newObjItems[index].' + field[0]), eval('oldobjItems[index].' + field[0]))) {
                                        lineObj.action = "Modified";
                                        lineObj.items.push({ 'field': field[1], 'old': eval('oldobjItems[index].' + field[0]), 'new': eval('newObjItems[index].' + field[0]) });
                                        lineObj.lineObj = newObjItems[index];
                                        lineObj.lineObjOld = oldobjItems[index];
                                    }
                                }
                                else {
                                    lineObj.action = "Modified";
                                    lineObj.items.push({ 'field': field[1], 'old': eval('oldobjItems[index].' + field[0]), 'new': eval('newObjItems[index].' + field[0]) });
                                    lineObj.lineObj = newObjItems[index];
                                    lineObj.lineObjOld = oldobjItems[index];
                                }

                            }
                    }
                    });
                    _.each(newObjItems[index].splits, function (split, indexSplit) {
                        //var splits = [];
                        var splitsMain = [];
                        _.each(comparedSplitsData, function (field) {
                            var varField = field[0].split('.');
                            if (eval('newObjItems[index].splits[indexSplit].' + varField[0]) != null && eval('oldobjItems[index].splits[indexSplit].' + varField[0]) != null && eval('newObjItems[index].splits[indexSplit]') != undefined && eval('newObjItems[index].splits[indexSplit]') != null && eval('oldobjItems[index].splits[indexSplit]') != undefined && eval('oldobjItems[index].splits[indexSplit]') != null && eval('newObjItems[index].splits[indexSplit].' + field[0]) != eval('oldobjItems[index].splits[indexSplit].' + field[0])) {
                                splitsMain.push({ 'number': indexSplit + 1, 'quantity': split.quantity, 'amount': split.splitItemTotal, 'obj': [] });
                                lineObj.action = "Modified";
                                splitsMain[indexSplit].obj.push({ 'field': field[1], 'old': eval('oldobjItems[index].splits[indexSplit].' + field[0]), 'new': eval('newObjItems[index].splits[indexSplit].' + field[0]) });
                            }
                        });
                        lineObj['splits'] = splitsMain;
                    });
                    _.each(headerSupplierData, function (field) {
                        if (eval('oldobjItems[index].' + field[0]) != eval('newObjItems[index].' + field[0])) {
                            lineObj.action = "Modified";
                            lineObj.supplier.push({ 'field': field[1], 'old': eval('oldobjItems[index].' + field[0]), 'new': eval('newObjItems[index].' + field[0]) });
                            lineObj.lineObj = newObjItems[index];
                            lineObj.lineObjOld = oldobjItems[index];
                        }
                    });
                }
                else {
                    lineObj.action = "Removed";
                    lineObj.lineObj = oldobjItems[index];
                    if (newObjItems[index] != undefined) {
                        var newTempObj = { 'action': 'Added', 'lineObj': newObjItems[index] };
                        newTempObj.items = [];
                        newTempObj.supplier = [];
                        _.each(comparedItemsData, function (field) {
                            newTempObj.items.push({ 'field': field[1], 'old': '', 'new': eval('newObjItems[index].' + field[0]) });
                        });
                        _.each(newObjItems[index].splits, function (split, indexSplit) {
                            //var splits = [];
                            var splitsMain = [];
                            splitsMain.push({ 'number': indexSplit + 1, 'quantity': split.quantity, 'amount': split.splitItemTotal, 'obj': [] });
                            _.each(comparedSplitsData, function (field) {
                                var splittedField = field[0].split('.');
                                if (eval('newObjItems[index].splits[indexSplit].' + splittedField[0]) != null)
                                    splitsMain[indexSplit].obj.push({ 'field': field[1], 'old': '', 'new': eval('newObjItems[index].splits[indexSplit].' + field[0]) });
                            });
                            newTempObj['splits'] = splitsMain;
                        });
                        _.each(headerSupplierData, function (field) {
                            newTempObj.supplier.push({ 'field': field[1], 'old': '', 'new': eval('newObjItems[index].' + field[0]) });
                        });
                    }
                }
                ComparedDataAarray.push(lineObj);
                if (newTempObj != undefined) {
                    ComparedDataAarray.push(newTempObj);
                }
            });
        }
        else if (oldobjItemsLength < newobjItemsLength) {
            _.each(newObjItems, function (old, index) {
                var lineObj = {};
                var checkSplits = false;
                if (oldobjItems[index] != undefined && newObjItems[index].p2PLineItemId == oldobjItems[index].p2PLineItemId) {
                    lineObj.items = [];
                    lineObj.supplier = [];
                    _.each(comparedItemsData, function (field) {
                        var varField = field[0].split('.');
                        if (eval('oldobjItems[index].' + varField[0]) != null && eval('newObjItems[index].' + varField[0]) != null && eval('newObjItems[index].' + field[0]) != eval('oldobjItems[index].' + field[0])) {
                            if (field[2] == 'date') {
                                if (!compareAndReturnDate(eval('newObjItems[index].' + field[0]), eval('oldobjItems[index].' + field[0]))) {
                                    lineObj.action = "Modified";
                                    lineObj.items.push({ 'field': field[1], 'old': eval('oldobjItems[index].' + field[0]), 'new': eval('newObjItems[index].' + field[0]) });
                                    lineObj.lineObj = newObjItems[index];
                                    lineObj.lineObjOld = oldobjItems[index];
                                }
                            }
                            else {
                                lineObj.action = "Modified";
                                lineObj.items.push({ 'field': field[1], 'old': eval('oldobjItems[index].' + field[0]), 'new': eval('newObjItems[index].' + field[0]) });
                                lineObj.lineObj = newObjItems[index];
                                lineObj.lineObjOld = oldobjItems[index];
                            }


                        }
                    });
                    _.each(newObjItems[index].splits, function (split, indexSplit) {
                        //var splits = [];
                        var splitsMain = [];
                        //splits['split' + indexSplit] = [];
                        _.each(comparedSplitsData, function (field) {
                            var varField = field[0].split('.');
                            if (eval('newObjItems[index].splits[indexSplit].' + varField[0]) != null && eval('oldobjItems[index].splits[indexSplit].' + varField[0]) != null && eval('newObjItems[index].splits[indexSplit]') != undefined && eval('newObjItems[index].splits[indexSplit]') != null && eval('oldobjItems[index].splits[indexSplit]') != undefined && eval('oldobjItems[index].splits[indexSplit]') != null && eval('newObjItems[index].splits[indexSplit].' + field[0]) != eval('oldobjItems[index].splits[indexSplit].' + field[0])) {
                                splitsMain.push({ 'number': indexSplit + 1, 'quantity': split.quantity, 'amount': split.splitItemTotal, 'obj': [] });
                                lineObj.action = "Modified";
                                splitsMain[indexSplit].obj.push({ 'field': field[1], 'old': eval('oldobjItems[index].splits[indexSplit].' + field[0]), 'new': eval('newObjItems[index].splits[indexSplit].' + field[0]) });
                            }
                        });
                        lineObj['splits'] = splitsMain;
                    });
                    _.each(headerSupplierData, function (field) {
                        if (eval('newObjItems[index].' + field[0]) != eval('oldobjItems[index].' + field[0])) {
                            lineObj.action = "Modified";
                            lineObj.supplier.push({ 'field': field[1], 'old': eval('oldobjItems[index].' + field[0]), 'new': eval('newObjItems[index].' + field[0]) });
                            lineObj.lineObj = newObjItems[index];
                            lineObj.lineObjOld = oldobjItems[index];
                        }
                    });
                }
                else {
                    var lineObj = { 'action': 'Added', 'lineObj': newObjItems[index] };
                    lineObj.items = [];
                    lineObj.supplier = [];
                    _.each(comparedItemsData, function (field) {
                        lineObj.items.push({ 'field': field[1], 'old': '', 'new': eval('newObjItems[index].' + field[0]) });
                    });
                    _.each(newObjItems[index].splits, function (split, indexSplit) {
                        //var splits = [];
                        var splitsMain = [];
                        _.each(comparedSplitsData, function (field) {
                            splitsMain.push({ 'number': indexSplit + 1, 'quantity': split.quantity, 'amount': split.splitItemTotal, 'obj': [] });
                            if (splitsMain[indexSplit] !== undefined && field[1] !== undefined) {
                                var evalObj = eval('newObjItems[index].splits[indexSplit]');
                                if (evalObj !== undefined && evalObj !== null) {
                                    if (evalObj[field[0]] !== undefined) {
                                        splitsMain[indexSplit].obj.push({ 'field': field[1], 'old': '', 'new': eval('newObjItems[index].splits[indexSplit].' + field[0]) });
                                    }
                                }
                            }
                        });
                        lineObj['splits'] = splitsMain;
                    });
                    _.each(headerSupplierData, function (field) {
                        lineObj.supplier.push({ 'field': field[1], 'old': '', 'new': eval('newObjItems[index].' + field[0]) });
                    });
                    if (oldobjItems[index] != undefined) {
                        var newTempObj = {};
                        newTempObj.action = "Removed";
                        newTempObj.lineObj = oldobjItems[index];
                    }
                }
                ComparedDataAarray.push(lineObj);
                if (newTempObj != undefined) {
                    ComparedDataAarray.push(newTempObj);
                }
            });
        }
        return ComparedDataAarray;
    }

    function compareAndReturnDate() {
        var datesArray = [];
        for (i = 0; i < arguments.length; i++) {
            var res = arguments[i].replace("/Date(", "");
            var datestring = res.replace(")/", "");
            var newdate = new Date(parseInt(datestring));
            datesArray[i] = newdate.getMonth() + '/' + newdate.getDate() + '/' + newdate.getFullYear();
        }
        if (datesArray[0] == datesArray[1])
            return true;
        else
            return false;

    }

    function compareHeaderObj(oldObj, newObj) {
        oldObj[Object.keys(oldObj)[0]] = oldObj;
        newObj[Object.keys(newObj)[0]] = newObj;
        var resultheader = [];
        _.each(comparedHeaderData, function (header) {
            if (typeof eval('oldObj.' + header[0]) != 'object' || eval('oldObj.' + header[0]) == null) {
                if ((eval('oldObj.' + header[0])) != (eval('newObj.' + header[0]))) {
                    var headerobj = {};
                    headerobj['Attribute'] = header[1];
                    headerobj['obj'] = { "old": eval('oldObj.' + header[0]), "new": eval('newObj.' + header[0]) };
                    resultheader.push(headerobj);
                }
            }
            else {
                if ((eval('oldObj.' + header[0]) != null) && (eval('oldObj.' + header[0] + '.id')) != (eval('newObj.' + header[0] + '.id'))) {
                    var headerobj = {};
                    // var splitHeader = header.split('.');
                    headerobj['Attribute'] = header[1];
                    headerobj['obj'] = { "old": eval('oldObj.' + header[0] + '.name'), "new": eval('newObj.' + header[0] + '.name') };

                    resultheader.push(headerobj);
                }
            }
        });

        return resultheader;
    }
    function compareSupplierObj(oldObj, newObj) {
        oldObj[Object.keys(oldObj)[0]] = oldObj;
        newObj[Object.keys(oldObj)[0]] = newObj;
        var resultSupplier = [];
        _.each(headerSupplierData, function (header) {
            if (typeof eval('oldObj.' + header[0]) != 'object' && eval('oldObj.' + header[0]) != null && eval('oldObj.' + header[0]) != undefined) {
                if ((eval('oldObj.' + header[0])) != (eval('newObj.' + header[0]))) {
                    var headerobj = { 'field': header[1], "old": eval('oldObj.' + header[0]), "new": eval('newObj.' + header[0]) };
                    resultSupplier.push(headerobj);
                }
            }
            else {
                if ((eval('oldObj.' + header[0]) != null) && (eval('oldObj.' + header[0]) != undefined) && (eval('oldObj.' + header[0] + '.id')) != (eval('newObj.' + header[0] + '.id'))) {
                    var headerobj = { 'field': header[1], "old": eval('oldObj.' + header[0] + '.name'), "new": eval('newObj.' + header[0] + '.name') };

                    resultSupplier.push(headerobj);
                }
            }
        });

        return resultSupplier;
    }


    function getCellInvalidIndexForCharge() {
        return cellInvalidIndexForCharge;
    }
    function setCellInvalidIndexForCharge(data) {
        var result = _.find(cellInvalidIndexForCharge, function (result) {
            return result == data;
        });

        if (typeof result == 'undefined')
            cellInvalidIndexForCharge.push(data);
    }
    function deleteIndexFromArrayForCharge(data, type) {
        if (type == 'invalidCell')
            cellInvalidIndexForCharge = _.without(cellInvalidIndexForCharge, data);
        else if (type == 'invalid')
            cellIndexForCharge = _.without(cellIndexForCharge, data);
    }
    function getCellIndexForCharge() {

        return cellIndexForCharge;
    }
    function setCellIndexForCharge(data) {
        var result = _.find(cellIndexForCharge, function (result) {
            return result == data;
        });

        if (typeof result == 'undefined')
            cellIndexForCharge.push(data);
    }



    function getDeletedSublineSplits() {
        return deletedSublineSplits;
    }

    function setDeletedSublineSplits(arr) {
        deletedSublineSplits.push(arr);
    }

    function resetDeletedSublineSplits() {
        deletedSublineSplits = [];
    }

    function getDeletedCharges(arrType) {
        if (arrType == 0) {
            return deletedCharges;
        }
        else {
            return deletedChargesSplits;
        }
    }

    function setDeletedCharges(arr, arrType) {

        if (arrType == 0) {
            deletedCharges.push(arr);
        }
        else {
            deletedChargesSplits.push(arr);
        }
    }
    function resetDeletedCharges() {
        deletedCharges = [];
        deletedChargesSplits = [];
    }

    function getDeletedSublines() {
        return deletedSublines;
    }

    function setDeletedSublines(arr) {
        deletedSublines.push(arr);
    }

    function resetDeletedSublines() {
        deletedSublines = [];
    }


    function triggerLineItemDeletBroadcast(SplitArr) {
        var lineDataArray = [];
        lineDataArray.push([]);
        lineDataArray.push(SplitArr);
        $rootScope.$broadcast('composedGridDeleteDispatcher', { 'data': lineDataArray });
    }


}

