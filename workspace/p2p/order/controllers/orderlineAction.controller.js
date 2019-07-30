'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pReqCtrl
 * @description
 * Controller of P2P Request.
 */
    .controller('lineActionController', ['$scope', '$timeout', '$http', '$rootScope', '$filter', 'p2pDetailsService', 'APPCONSTANTS', 'gridHelper', 'p2pValidationService', 'formWidgetUtils', 'RuleEngine', 'notification', '$translate', lineActionControllerFunc])

function lineActionControllerFunc($scope, $timeout, $http, $rootScope, $filter, p2pDetailsService, APPCONSTANTS, gridHelper, p2pValidationService, formWidgetUtils, RuleEngine, notification, $translate) {
    /*icon display*/
    $scope.lineActionIconsDisplayObject = {
        "add": {
            "displayInLine": true,
            "displayInAccounting": false,
        },
        "manageColumns": {
            "displayInLine": true,
            "displayInAccounting": true,
        },
        "delete": {
            "displayInLine": true,
            "displayInAccounting": true,
            "displayInChargeAndAllowance":false
        },
        "duplicate": {
            "displayInLine": true,
            "displayInAccounting": false,
        },
        "edit": {
            "displayInLine": false,
            "displayInAccounting": false,
        },
        "cancel": {
            "displayInLine": false,
            "displayInAccounting": false,
        }
    };


    //setting active tab index 0 on page load.
    p2pDetailsService.setActiveTabIndex(0);
    $scope.chargeTabIndex = p2pDetailsService.getSublineChargeIndex();
    // function to check the visibility of grid actions eg add, delete, manage columns etc.
    var gridConf = $scope.composedGridConfig.tabConfig;
    $scope.createManageColumnPopup = true;

    function checkForButtonsVisibility(gridConf) {
        var isTeammember = false;
        if (_.find(APPCONSTANTS.userPreferences.OrderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 14 }) == undefined &&
                        _.find(APPCONSTANTS.userPreferences.OrderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 17 }) == undefined &&
                        _.find(APPCONSTANTS.userPreferences.OrderData.DocumentStakeHolderList, { ContactCode: APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode, StakeholderTypeInfo: 5 }) != undefined
                          && APPCONSTANTS.userPreferences.OrderData.orderContact.id != APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
                          && APPCONSTANTS.userPreferences.OrderData.createdBy.id != APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
                    ) {
            isTeammember = true;
        }
        for (var j = 0; j < gridConf.length; j++) {
            if (typeof gridConf[j].gridActions != "undefined") {
                for (var k = 0; k < gridConf[j].gridActions.length; k++) {
                    gridConf[j].gridActions[k].isVisible = formWidgetUtils.convertAndGetValue(gridConf[j].gridActions[k].isVisible, $scope, gridConf[j].gridActions[k]);

                    if (gridConf[j].gridActions[k].title == "P2P_PO_AddLineButton") {
                        $scope.lineActionIconsDisplayObject.add.displayInLine = gridConf[j].gridActions[k].isVisible;
                    } else if (gridConf[j].gridActions[k].title == "P2P_PO_DeleteButton") {
                        $scope.lineActionIconsDisplayObject.delete.displayInLine = gridConf[j].gridActions[k].isVisible;
                        $scope.lineActionIconsDisplayObject.delete.displayInChargeAndAllowance = gridConf[j].gridActions[k].isVisible;
                    } else if (gridConf[j].gridActions[k].title == "P2P_PO_ManageColumnButton") {
                        $scope.lineActionIconsDisplayObject.manageColumns.displayInLine = gridConf[j].gridActions[k].isVisible;
                    } else if (gridConf[j].gridActions[k].title == "P2P_PO_DuplicateLineItemButton") {
                        $scope.lineActionIconsDisplayObject.duplicate.displayInLine = gridConf[j].gridActions[k].isVisible;
                    }
                }
            } else if (typeof gridConf[j].gridAccountingActions != "undefined") {
                for (var t = 0; t < gridConf[j].gridAccountingActions.length; t++) {
                    gridConf[j].gridAccountingActions[t].isVisible = formWidgetUtils.convertAndGetValue(gridConf[j].gridAccountingActions[t].isVisible, $scope, gridConf[j].gridAccountingActions[t]);

                    if (gridConf[j].gridAccountingActions[t].title == "P2P_PO_AddLineButton") {
                        $scope.lineActionIconsDisplayObject.add.displayInAccounting = gridConf[j].gridAccountingActions[t].isVisible;
                    } else if (gridConf[j].gridAccountingActions[t].title == "P2P_PO_DeleteButton") {
                        $scope.lineActionIconsDisplayObject.delete.displayInAccounting = gridConf[j].gridAccountingActions[t].isVisible;
                        $scope.lineActionIconsDisplayObject.delete.displayInChargeAndAllowance = gridConf[j].gridAccountingActions[t].isVisible;
                    } else if (gridConf[j].gridAccountingActions[t].title == "P2P_PO_ManageColumnButton") {
                        $scope.lineActionIconsDisplayObject.manageColumns.displayInAccounting = gridConf[j].gridAccountingActions[t].isVisible;
                    } else if (gridConf[j].gridAccountingActions[t].title == "P2P_PO_DuplicateLineItemButton") {
                        $scope.lineActionIconsDisplayObject.duplicate.displayInAccounting = gridConf[j].gridAccountingActions[t].isVisible;
                    }
                }
            }
        }
        if ((APPCONSTANTS.userPreferences.OrderData.source.id === 5 || APPCONSTANTS.userPreferences.OrderData.source.id === 6) && (APPCONSTANTS.userPreferences.OrderData.status.id === 1)) {
            $scope.lineActionIconsDisplayObject.cancel.displayInLine = true;
            $scope.lineActionIconsDisplayObject.delete.displayInLine = true;
        }
        if(isTeammember ==true)
        {
            $scope.lineActionIconsDisplayObject.cancel.displayInLine = false;
            $scope.lineActionIconsDisplayObject.delete.displayInLine = false;
        }
    }
    checkForButtonsVisibility(gridConf);

    /*common*/
    $scope.activeTabIndex = 0;
    $scope.closeDropDown = function () {
        //TODO need to check with UI team for a better solution
        angular.element('.dd-close-off').css('display', 'none');
    }

    /*callback*/
    $rootScope.$on('composedGridUpdateNotifier', function (e, data) {
        switch (data.action) {
            case "tabChange":
                $scope.activeTabIndex = data.data.tabIndex;
                $scope.manageColumnObj = createManageColumns();
                $scope.createManageColumnPopup = false;
                setTimeout(function () {
                    $scope.createManageColumnPopup = true;
                }, 100);
                p2pDetailsService.setActiveTabIndex($scope.activeTabIndex);
                $scope.isErrorTagVisible = true;
                inc = 0;
                break;
        }
    });

    /*checkbox select notifier*/
    $rootScope.$on('composedGridCheckBoxDispatcher', function (e, data) {
        //get the row data from data.row.entity and apply conditions on lineActionIconsDisplayObject
        if ((APPCONSTANTS.userPreferences.OrderData.source.id ===5 || APPCONSTANTS.userPreferences.OrderData.source.id === 6) && (APPCONSTANTS.userPreferences.OrderData.status.id === 1))
        {
            if (data.row.entity.ItemStatus.id === 1) {
                if (data.row.isSelected) {
                    $scope.lineActionIconsDisplayObject.delete.displayInLine = true;
                    $scope.lineActionIconsDisplayObject.cancel.displayInLine = false;
                }
                else
                {
                    $scope.lineActionIconsDisplayObject.delete.displayInLine = true;
                    $scope.lineActionIconsDisplayObject.cancel.displayInLine = true;
                }
            }
            else if(data.row.entity.ItemStatus.id === 25)
            {
                if (data.row.isSelected) {
                    $scope.lineActionIconsDisplayObject.delete.displayInLine = false;
                    $scope.lineActionIconsDisplayObject.cancel.displayInLine = true;
                }
                else {
                    $scope.lineActionIconsDisplayObject.delete.displayInLine = true;
                    $scope.lineActionIconsDisplayObject.cancel.displayInLine = true;
                }
            }
            var gridApi = $scope.gridInstance.gridInstance;
            var selectedRows = gridApi.selection.getSelectedGridRows();
            if (selectedRows.length > 0)
            {
                _.each(selectedRows, function (row) {
                    if(row.entity.ItemStatus.id===1)
                        $scope.lineActionIconsDisplayObject.cancel.displayInLine = false;
                    else if(row.entity.ItemStatus.id===25)
                        $scope.lineActionIconsDisplayObject.delete.displayInLine = false;
                });
            }

        }    
    });

    var dataModel = p2pDetailsService.getDataModel();
    $scope.statusId = dataModel.orderData.status.id;

    $scope.totalItemsCount = dataModel.orderData.items.length;
    /*add item popup LINE TAB*/
    $scope.defaultValueOfData = 1;
    $scope.addItem = function (val,param) {

        if (!val || val <= 0 || val > 50) {
            // show validation popup here 
            val = 1;
            return;
        }
        //var addItems = [];
        var autoIncrementCol = _.find($scope.composedGridConfig.tabConfig[0].cloumnDefs, function (col) {
            return col.autoIncrement;
        });
        for (var i = 0; i < val; i++) {
            var orderItems = p2pDetailsService.getNewOrderItem();
            orderItems.$$treeLevel = 0;
            if (APPCONSTANTS.userPreferences.ShipToLocation != null) {
                var defaultShipTo = {};
                var shipAddress;
                if (APPCONSTANTS.userPreferences.ShipToLocation.Address != null) {
                    orderItems.shipTo = dataModel.orderData.shipTo;
                    orderItems.deliverTo = dataModel.orderData.deliverTo;
                    orderItems.deliverToStr = dataModel.orderData.deliverTo.address;

                }
            }
            else {
                orderItems.shipTo = dataModel.orderData.shipTo;
                orderItems.deliverTo = dataModel.orderData.deliverTo;
                if (dataModel.orderData.deliverTo != null)
                    orderItems.deliverToStr = dataModel.orderData.deliverTo.address;
            }
            orderItems[autoIncrementCol.field] = $scope.ngModel.data.length + 1;
            $scope.ngModel.data.push(orderItems);
            $scope.totalItemsCount++;
        };
        $scope.closeDropDown();
        if(param!='blank')
            p2pDetailsService.triggerValidations();
    };


    var gridConf = p2pDetailsService.getGridConfig();  //getting grid config
    var dataModelRet = {};

    //adding default split for blanket document
    if (dataModel.orderData.documentCode == 0 && dataModel.orderData.items.length == 0) {
        $scope.addItem(1, 'blank');
    }

    $scope.errorCount = 0;
    if (dataModel.orderData.items.length > 0 && dataModel.orderData.status.id != 25) {
        var errorMsg;
        var inc = 0;
        _.each(dataModel.orderData.items, function (items) {
            items.documentStatus = dataModel.orderData.status;
        });
        var datamodelItems = dataModel.orderData.items;
        RuleEngine.setRules(gridConf, datamodelItems, [], '', 'grid');
        RuleEngine.executeNools(
            function (e) {
            console.log(e);
            errorMsg = e.failedRules;
            p2pDetailsService.setGridErrorCount(e.failedRules.length, 'grid', '');
            $scope.errorCount = e.failedRules.length;

        }, gridConf[0]);
    }

    /*delete item LINE TAB*/
    $scope.deleteItem = function () {
        var deleteArrayLine = [];
        var deleteArrayAcct = [];
        //var delArraySubline = [];
        //var delArraySublineAcct = [];
        var isAddButtonDisplayed = $scope.lineActionIconsDisplayObject.add.displayInLine; // exelon specific requirement cannot delete last line item, can delete all items for other clients. this functionality is based on parallel to add item button.
        var selectedRows = $scope.apiForGrid.getSelectedRows();
        var activeTabIndex = $scope.apiForGrid.getActiveTabIndex();
        if (selectedRows.length <= 0) {
            var showFailureMessage = {
                type: "warning",
                message: "Select at least one row",
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
        if (activeTabIndex == 3) {
            p2pDetailsService.deleteMultiItemChargeFromGrid($scope.ngModel.data, selectedRows);
        }
        _.each(selectedRows, function (row) {

            if (activeTabIndex == 0) {
                if (isAddButtonDisplayed || (!isAddButtonDisplayed && $scope.ngModel.data.length > 1))
                {
                    var index = gridHelper.getModelIndexForRow(row, $scope.ngModel.data);
                    $scope.ngModel.data[index].isDeleted = true;
                    deleteArrayLine.push($scope.ngModel.data[index]);
                    $scope.ngModel.data.splice(index, 1);
                    $scope.totalItemsCount = $scope.totalItemsCount - 1;
                }
                else
                {
                    var showFailureMessage = {
                        type: "warning",
                        message: "Cannot delete the last Line Item",
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

            } else if (activeTabIndex == 1) {
                if (row.entity.lineSplitType && row.entity.lineSplitType == 'Charge') {
                    var selectedSubline = _.where(
                      _.without(_.flatten(_.chain($scope.ngModel.data).pluck("ItemChargesForSubLine").unique().value()), undefined)
                      , { ItemChargeId: row.entity.documentItemId });
                    if (selectedSubline.splits > 1) {
                        var selectedSplit = _.where(selectedSubline.splits, { uniqueSplitItemId: row.entity.uniqueSplitItemId });
                        p2pDetailsService.setDeletedSublineSplits(foundSplit);
                        //delArraySublineAcct.push(foundSplit);
                        selectedSubline.isDeleted = true;
                        selectedSubline.splits = _.without(selectedSubline, selectedSplit);
                    }
                    else
                    {
                        var showFailureMessage = {
                            type: "warning",
                            message: "Cannot delete the last split of any Line Item",
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



                }
                else {
                    var index = gridHelper.getModelIndexForSplit(row, $scope.ngModel.data);
                    if ($scope.ngModel.data[index]['splits'].length > 1) {
                        var splitId = row.entity.uniqueSplitItemId;
                        var foundSplit = _.find($scope.ngModel.data[index]['splits'], function (data) {
                            return data.uniqueSplitItemId == splitId;
                        });
                        if (foundSplit) {
                            foundSplit.isDeleted = true;
                            deleteArrayAcct.push(foundSplit);
                            $scope.ngModel.data[index]['splits'] = _.without($scope.ngModel.data[index]['splits'], foundSplit);
                            if ($scope.ngModel.data[index]['splits'].length > 1)
                            {
                                _.find($scope.ngModel.data[index]['splits'], function (data) {
                                    data.percentage = (parseFloat(data.quantity) / parseFloat($scope.ngModel.data[index].quantity - foundSplit.quantity)) * 100;
                                    data.quantity = parseFloat((data.percentage / 100) * $scope.ngModel.data[index].quantity);
                                });
                            }
                            else if($scope.ngModel.data[index]['splits'].length == 1)
                            {
                                $scope.ngModel.data[index]['splits'][0]['percentage'] = 100;
                                $scope.ngModel.data[index]['splits'][0]['quantity'] = $scope.ngModel.data[index].quantity;
                            }
                           
                        }
                    }
                    else {
                        var showFailureMessage = {
                            type: "warning",
                            message: "Cannot delete the last split of any Line Item",
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
                }

            }

        });

        if (activeTabIndex == 1)
            $scope.getModelForTab(1);

        if (activeTabIndex == 0)
            autoIncrementNodes();

        var dataArray=[];
        dataArray.push(deleteArrayLine);
        dataArray.push(deleteArrayAcct);

        //var sublineDataArray = [];
        //sublineDataArray.push(delArraySubline);
        //sublineDataArray.push(delArraySublineAcct);


        if (deleteArrayLine.length > 0 || deleteArrayAcct.length > 0) {
            $rootScope.$broadcast('composedGridDeleteDispatcher', { 'data': dataArray });
        }
        if (activeTabIndex == 1 && accountingErrors.length > 0) {
            accountingErrors = [];
            accountingErrorsUpdate();
        }
        else {
            p2pDetailsService.triggerValidations();
        }
        $scope.apiForGrid.updateModel(); // To update the deleted splits at the end of obove iteration.

    };

    /* cancel item LINE TAB */
    var cancelledItemArray = [];
    $scope.cancelItem = function () {
        var cancelArrayLine = [];
        var selectedRows = $scope.apiForGrid.getSelectedRows();
        var activeTabIndex = $scope.apiForGrid.getActiveTabIndex();
        _.each(selectedRows, function (row,index) {
            if (activeTabIndex == 0) {
                var itemCount
                var message = "";
                var type = "";
                var buttons = [];
                var cancelItemMessage = {
                    type: type,
                    message: message,
                    buttons: buttons
                }
                itemCount = _.filter($scope.ngModel.data, function (item) { return item.ItemStatus.id != 121 });
                if ($scope.ngModel.data[index].ReceiptTotalAcceptedQuantity > 0 || $scope.ngModel.data[index].InvoiceTotalQuantity > 0) {
                    if ($scope.ngModel.data[index].ReceiptTotalAcceptedQuantity > $scope.ngModel.data[index].InvoiceTotalQuantity) {
                        cancelItemMessage.message = $translate.instant("P2P_PO_CannotCancelItemwhichAlreadyReceived");
                        cancelItemMessage.type = "warning";
                        cancelItemMessage.buttons = [{ "title": "OK", "result": "ok" }];
                    }
                    else {
                        cancelItemMessage.message = $translate.instant("P2P_PO_CannotCancelItemwhichAlreadyInvoiced");
                        cancelItemMessage.type = "warning";
                        cancelItemMessage.buttons = [{ "title": "OK", "result": "ok" }];
                    }
                    notification.notify(cancelItemMessage);
                }
                else if (itemCount.length == 1) {
                    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier) {
                        cancelItemMessage.message = $translate.instant("P2P_PO_ChangeRequestContainAtleast1lineItem");
                        cancelItemMessage.type = "warning";
                        cancelItemMessage.buttons = [{ "title": "OK", "result": "ok" }];
                        notification.notify(cancelItemMessage, function (response) {

                        });
                    }
                    else {
                        $scope.ngModel.data[index].ItemStatus.id = 121;
                        $scope.apiForGrid.clearRowsSelected();
                        p2pDetailsService.triggerValidations();
                    }
                }
                else {
                    $scope.ngModel.data[index].ItemStatus.id = 121;
                    $scope.apiForGrid.clearRowsSelected();
                    p2pDetailsService.triggerValidations();
                }

            }
        });
    };

    function autoIncrementNodes() {
        var autoIncrementCol = _.find($scope.composedGridConfig.tabConfig[0].cloumnDefs, function (col) {
            return col.autoIncrement;
        });
        _.each($scope.ngModel.data, function (row, index) {
            if (!$scope.ngModel.data[index].isDeleted)
                row[autoIncrementCol.field] = index + 1;
        });
    }

    /*duplicate item LINE TAB*/
    $scope.duplicateItem = function () {
        var autoIncrementCol = _.find($scope.composedGridConfig.tabConfig[0].cloumnDefs, function (col) {
            return col.autoIncrement;
        });
        var selectedRows = $scope.apiForGrid.getSelectedRows();
        _.each(selectedRows, function (row) {
            var index = gridHelper.getModelIndexForRow(row, $scope.ngModel.data);
            var duplicateRow = angular.copy($scope.ngModel.data[index]);
            duplicateRow.ItemChargesForSubLine = [];
            duplicateRow.id = 0;
            duplicateRow[autoIncrementCol.field] = $scope.ngModel.data.length + 1;
            $scope.ngModel.data.push(duplicateRow);
        });
        $scope.totalItemsCount = $scope.totalItemsCount + selectedRows.length;
    }
    var manageCOlumnObj = [];
    /*manage columns LINE TAB*/
    
   var clientConstantsSpecific= p2pDetailsService.getConfigClientConstants();
    function createManageColumns() {
        manageCOlumnObj = [];
        var state = p2pDetailsService.getStateForGrid();
        var gridStateColumns = (state & $scope.activeTabIndex == 0)? state.columns : null;
        _.each($scope.composedGridConfig.tabConfig[$scope.activeTabIndex].cloumnDefs, function (col,index) {
            var isColVisible = formWidgetUtils.convertAndGetValue(col.isVisible, $scope, col);
            if (clientConstantsSpecific.gridmanagecolumn === true) {
                if ($scope.activeTabIndex == 0) {
                    if (!col.isMandatory) {
                        manageCOlumnObj.push({ "displayName": $filter('translate')(col.displayName), "isVisible": false, "displayKey": col.displayName });
                        $scope.composedGridConfig.tabConfig[$scope.activeTabIndex].cloumnDefs[index].isVisible = false;
                    }
                }
            }
            else {
                if (!col.isMandatory && isColVisible) {
                    var persistentColumn = (gridStateColumns) ? _.find(gridStateColumns,function(n){return n.name == col.field }) : null;
                    manageCOlumnObj.push({ "displayName": $filter('translate')(col.displayName), "isVisible": (persistentColumn) ? persistentColumn.visible : true, "displayKey": col.displayName });
                }
            }
        })
        return manageCOlumnObj;
    };


    $scope.manageColumnObj = createManageColumns();
    var alteredColumns;
    $scope.showHideColApplyChanges = function () {
        var columns = $scope.apiForGrid.getActiveColumns();
        _.each($scope.manageColumnObj, function (manageCol) {
            var colConfig = _.find(columns, function (col) {
                return col.displayKey == manageCol.displayKey
            });
            if (colConfig) {
                colConfig.visible = manageCol.isVisible;
            }
        });
        $scope.apiForGrid.notifyDataChange();
        $scope.closeDropDown();
    }
    $scope.applyButtonConfig = { title: 'Apply' };

    $scope.$on('updatedErrorCountOnGrid', function (e, data) {
        $scope.errorCount = data.length;
        errorMsg = data;
        if ($scope.errorCount <= 0) {
            $scope.isErrorTagVisible = true;
        }
    });

    $rootScope.$on('errorCount', function (e, data) {
        $scope.errorCount = data.errorCount;
        if ($scope.errorCount <= 0) {
            $scope.isErrorTagVisible = true;
        }
        if (typeof data.obj != 'undefined')
        {
            var rowIndex = data.obj.row;
            var colName = data.obj.colName;

            _.find(errorMsg, function (msg, index) {
                if (typeof msg!='undefined' && msg.col.field == colName && rowIndex==msg.row.lineNumber-1)
                {
                    errorMsg.splice(index, 1);
                    var objLength = errorMsg.length;
                    if (objLength <= 0)
                    {
                        $scope.isErrorTagVisible = true;
                        return;
                    }
                    $scope.showError = errorMsg[index-1].error;
                    if (inc < objLength)
                        $scope.getNextExrror();
                    else
                        $scope.getPreviousError();

                    return;
                }
            });
        }
    });

    $scope.extErrorCount = 0;
    $scope.$on('newgridError', function (e, data) {
        if (data.type !== 'external')
            $scope.errorCount = $scope.errorCount + 1;
        else {
            $scope.extErrorCount += 1;
        }

        if(data.type==='external')
            p2pDetailsService.setGridErrorCount($scope.errorCount, 'external', '');
        else
            p2pDetailsService.setGridErrorCount($scope.errorCount, 'grid', '');

        errorMsg.push(data.errorObj);
    });
    $scope.$on('changeGridError', function (e, data) {
        _.each(errorMsg, function (msg, index) {
            if (errorMsg[index].col.field == data.errorObj.col.field && (errorMsg[index].lineNumber===data.errorObj.row.lineNumber))
            {
                errorMsg[index] = data.errorObj;
                $scope.showError = errorMsg[inc].error;
            }
        });
    });

    $scope.isErrorTagVisible = true;
    $scope.showErrorMsg = function () {
        if (!$scope.isErrorTagVisible)
            $scope.isErrorTagVisible = true;
        else
            $scope.isErrorTagVisible = false;


        var msgArray = $scope.activeTabIndex == 0 ? errorMsg : accountingErrors;
        $scope.showError = msgArray[0].error;
        var gridApi = $scope.gridInstance.gridInstance;
        var rowNav = msgArray[0].row;
        var colDefNav = msgArray[0].col;

        gridApi.cellNav.scrollToFocus(rowNav, colDefNav);

    }

    $rootScope.$on("updateGrid", function (e, arg) {
        autoIncrementNodes();
    });

    $scope.toggleisErrorTagVisible = function ()
    {
        if (!$scope.isErrorTagVisible)
            $scope.isErrorTagVisible = true;
        else
            $scope.isErrorTagVisible = false;
    }
    $scope.getNextExrror=function()
    {
        var gridApi = $scope.gridInstance.gridInstance;
        var msgArray = $scope.activeTabIndex == 0 ? errorMsg : accountingErrors;
        if (msgArray.length == 1) {
            inc = 0;
            var rowNav = msgArray[inc].row;
            var colDefNav = msgArray[inc].col ;
            gridApi.cellNav.scrollToFocus(rowNav, colDefNav);
            return;
        }
        if (inc < msgArray.length - 1) {
            inc++;
            var rowNav = msgArray[inc].row;
            var colDefNav = msgArray[inc].col;
            gridApi.cellNav.scrollToFocus(rowNav, colDefNav);
        }
        $scope.showError = msgArray[inc].error;
    }
    $scope.getPreviousError = function () {
        var gridApi = $scope.gridInstance.gridInstance;
        var msgArray = $scope.activeTabIndex == 0 ? errorMsg : accountingErrors;
        if (msgArray.length == 1) {
            inc = 0;
            var rowNav = msgArray[inc].row;
            var colDefNav = msgArray[inc].col;
            gridApi.cellNav.scrollToFocus(rowNav, colDefNav);
            return;
        }
        if (inc > 0) {
            inc--;
            var rowNav = msgArray[inc].row;
            var colDefNav = msgArray[inc].col;
            gridApi.cellNav.scrollToFocus(rowNav, colDefNav);
        }
        $scope.showError = msgArray[inc].error;
    }
    $scope.closePopup = function () {
        $scope.closeDropDown();
        function cancelManageObj() {
            manageCOlumnObj = [];
            _.each($scope.composedGridConfig.tabConfig[$scope.activeTabIndex].cloumnDefs, function (col) {
                var isColumnVisible = formWidgetUtils.convertAndGetValue(col.isVisible, $scope, col);
                if (clientConstantsSpecific.gridmanagecolumn === true) {
                    if (col.isVisible != false) {
                        if (!col.isMandatory) {
                            manageCOlumnObj.push({ "displayName": $filter('translate')(col.displayName), "isVisible": true, "displayKey": col.displayName });
                        }
                    } else {
                        if (!col.isMandatory) {
                            manageCOlumnObj.push({ "displayName": $filter('translate')(col.displayName), "isVisible": false, "displayKey": col.displayName });
                        }
                    }
                }
                else {
                    if (col.isVisible != false ) {
                        if (!col.isMandatory && isColumnVisible) {
                            manageCOlumnObj.push({ "displayName": $filter('translate')(col.displayName), "isVisible": true, "displayKey": col.displayName });
                        }
                    } else {
                        if (!col.isMandatory) {
                            manageCOlumnObj.push({ "displayName": $filter('translate')(col.displayName), "isVisible": false, "displayKey": col.displayName });
                        }
                    }
                }
            })
            return manageCOlumnObj;
        };
        $scope.manageColumnObj = cancelManageObj();
    }
    $scope.applyButtonConfig = { title: 'Apply' };
    $scope.cancelButtonConfig = { title: 'Cancel' };


    var accountingErrors = [];
    //Custom error validation
    function accountingErrorsUpdate() {

        var dataModelItems = dataModel.orderData.items;
        var accountConfig = p2pDetailsService.getGridConfig();
        _.each(dataModelItems, function (ite, index) {
            _.each(ite.splits, function (split,splitIndex) {
                if (split != null && split.errorCode != null && split.errorCode != '') {
                    var errorCode = split.errorCode;
                    errorCode = errorCode.split('|');
                    _.each(errorCode, function (code) {
                        var customErrorMsg = {};
                        var olvmRes = _.find(APPCONSTANTS.olvmObj, function (obj) { return obj.errorCode == code; });
                        if (typeof olvmRes != 'undefined') {
                            customErrorMsg.error = "Line " + (index + 1) + ' ' + 'Split ' + (splitIndex + 1) + " " + olvmRes.errorMsg;
                            customErrorMsg.row = ite;
                            customErrorMsg.col = _.find(accountConfig[1].cloumnDefs, function (colDef) { return colDef.isCustomError == true; });
                            accountingErrors.push(customErrorMsg);
                        }
                    });
                }
            });
        });

        //console.log(accountingErrors);
        $scope.accErrorCount = accountingErrors.length;
    }

    accountingErrorsUpdate();

    $rootScope.$on('composedGridAccountingErrorUpdateDispatcher', function (e, data) {
        accountingErrors = [];
        accountingErrorsUpdate();
        if (accountingErrors.length == 0)
            $scope.isErrorTagVisible = true;
    });

    $rootScope.$on('notifyDataChange', function (e, data) {
        $scope.extErrorCount = 0;
    });

    //on update of quantity caluculating taxes in line level.
    $rootScope.$on('composedGridUpdateColumnDispatcher', function (e, data) {
        if (data.colDef.field == 'quantity')
        {
            data.rowModel.taxes = parseFloat(p2pDetailsService.parseNumber((data.rowModel.taxPercentage * p2pDetailsService.parseNumber(data.rowModel.quantity) * p2pDetailsService.parseNumber(data.rowModel.unitPrice)) / 100, 2));
        }
    });

};