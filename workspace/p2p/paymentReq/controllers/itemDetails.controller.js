'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pReqCtrl
 * @description
 * Controller of P2P Request.
 */
    .controller('itemDetailsCtrl', ['$scope', 'CONSTANTS', '$state', '$timeout', 'configService', 'reqDetailsService', '$location', '$anchorScroll', itemDetailsCtrlFunc])

function itemDetailsCtrlFunc($scope, CONSTANTS, $state, $timeout, configService, reqDetailsService, $location, $anchorScroll) {
    var othersConfig = configService.getUIConfig('item');
    var lineConfig = angular.copy(othersConfig);
    lineConfig.sections.splice(1, 3);
    var shippingConfig = angular.copy(othersConfig);
    shippingConfig.sections.splice(0, 2);
    shippingConfig.sections.splice(1, 1);
    othersConfig.sections.splice(0, 3);
    var accountingConfig = angular.copy(configService.getUIConfig('split'));
    accountingConfig.sections.splice(0, 1);
    var mainConf = {
        lineConfig: lineConfig,
        accountingConfig: accountingConfig,
        shippingConfig: shippingConfig,
        othersConfig: othersConfig
    };

    $scope.bkEdit = reqDetailsService.getBlkEdit();
    $scope.itemDetailTabDataset = reqDetailsService.getItemDetailSet();
    $scope.dropDownConfig = reqDetailsService.getDropDownConfig();
    $scope.itemType = reqDetailsService.getItemTypes();
    $scope.hide = false;
    $scope.cbxSet = [];
    $scope.scopedItems;
    $scope.rItem = {};
    $scope.tabId = 1;
    $scope.typeId = 1;
    $scope.items = [];
    $scope.rItem.title = $scope.itemType[parseInt($scope.typeId) - 1].title;
    $scope.itemDetailTabDataset[parseInt($scope.tabId) - 1].active = true;    
    $scope.conf = mainConf[CONSTANTS.TABS[$scope.tabId] + 'Config'];
    $scope.selectTab = selectTab; 
    $scope.selectedItemType = getSelectedItemType();
    $scope.$watch('rItem', rItemWatch, true);
    $scope.isVisible = isVisible;
    $scope.splitType = splitType;
    $scope.splitValue = splitValue;
    $scope.isSelected = isSelected;
    $scope.toggleSeln = toggleSeln;
    $scope.isSelectAll = isSelectAll;
    $scope.toggleAll = toggleAll;
    $scope.parScope;
    $scope.deleteItems = deleteItems;
    $scope.addItem = addItem;
    $scope.bulkEdit = bulkEdit;
    $scope.getLineValue = getLineValue;
    $scope.itemsToAdd = { no: 1 };
    $scope.closeDialog = closeDropDown;
    
    reqDetailsService.setItemNoIndex($scope.ngModel);

    filterItems();
    
    setblkProperties();

    function setblkProperties() {
        var properties;
        properties = accountingConfig.sections[0].rows[0].properties.filter(function (p) {
            return !p.attributes.readonly;
        });
        properties = properties.concat(lineConfig.sections[0].rows[0].properties.filter(function (p) {
            return p.label == 'P2P_Req_NeedByDate' || p.label == 'P2P_CMN_Category';
        }));
        $scope.bkEdit.config.sections[0].rows[0].properties = properties;
    }

    function getLineValue(item) {
        var amount = 0;
        amount = (reqDetailsService.parseNumber(item.unitPrice) * reqDetailsService.parseNumber(item.quantity)) + reqDetailsService.parseNumber(item.taxes) + reqDetailsService.parseNumber(item.shippingCharges) + reqDetailsService.parseNumber(item.otherChangers);
        return reqDetailsService.parseNumber(amount);
    }

    function splitValue(item, split) {
        var amount = 0;
        if (item.splitType > 0) {
            amount = (reqDetailsService.parseNumber(item.unitPrice) * reqDetailsService.parseNumber(item.quantity) + reqDetailsService.parseNumber(item.taxes) + reqDetailsService.parseNumber(item.shippingCharges) + reqDetailsService.parseNumber(item.otherChangers)) * reqDetailsService.parseNumber(split.quantity) / reqDetailsService.parseNumber(item.quantity);
        } else {
            amount = (reqDetailsService.parseNumber(item.unitPrice) * reqDetailsService.parseNumber(item.quantity) + reqDetailsService.parseNumber(item.taxes) + reqDetailsService.parseNumber(item.shippingCharges) + reqDetailsService.parseNumber(item.otherChangers)) * reqDetailsService.parseNumber(split.quantity) / 100;
        }
        return reqDetailsService.parseNumber(amount);
    }

    function isSelected(idx) {
        return $scope.cbxSet.indexOf(idx) >= 0;
    };

    function toggleSeln(idx, $event) {
        if ($scope.cbxSet.indexOf(idx)>=0)
            $scope.cbxSet.splice($scope.cbxSet.indexOf(idx), 1);
        else
            $scope.cbxSet.push(idx);
        $event.stopPropagation();
    };

    function isSelectAll() {
        return $scope.cbxSet.length && ($scope.cbxSet.length == $scope.items.length);
    };

    function splitType(item) {
        if (item.splitType > 0)
            return "Percentage";
        return "Quantity";
    };

    function toggleAll() {
        if ($scope.cbxSet.length == $scope.items.length) {
            $scope.items.map(function (x) {
                $scope.cbxSet.splice($scope.cbxSet.indexOf(x.id), 1);
            });
        } else {
            $scope.items.map(function (x, ix) {
                if ($scope.cbxSet.indexOf(x.id) < 0)
                    $scope.cbxSet.push(x.id);
            });
        }
    };

    function isVisible(val) {
        if (val > 0 && $scope.tabId == 2)
            return true;
        else if (val == 0 && $scope.tabId != 2)
            return true;
        return false;
    };

    function rItemWatch(newModel, oldModel) {
        if (newModel) {
            $scope.selectedItemType = getSelectedItemType();
            filterItems();
        }
    };

    function deleteItems() {
        for (var i = $scope.ngModel.length - 1; i >= 0; i--) {
            if ($scope.cbxSet.indexOf($scope.ngModel[i].id)>=0) {
                $scope.cbxSet.splice($scope.cbxSet.indexOf($scope.ngModel[i].id), 1);
                $scope.ngModel[i].isDeleted = true;
            }
        }
        filterItems();
    };

    function addItem() {
        closeDropDown();
        if (!$scope.itemsToAdd || $scope.itemsToAdd.no < 0) {
            return;
        }
        var lastItem;
        for (var i = 0; i < $scope.itemsToAdd.no; i++) {
            var dummyItem = reqDetailsService.getNewReqItem();
            var exists = $scope.ngModel.some(function (it) {
                return it.id == dummyItem.id;
            })
            if (!exists) {
                $scope.ngModel.push(dummyItem);
                lastItem = dummyItem.id
            };
        }
        filterItems();
        $location.hash('itemId_' + lastItem);
        $timeout(function () { $anchorScroll() }, 0);
    };

    function bulkEdit() {
        $scope.ngModel.map(function (im) {
            if ($scope.scopedItems.indexOf(im.id) >= 0 && $scope.cbxSet.indexOf(im.id) >= 0) {
                for (var key in $scope.bkEdit.data) {
                    if (key.indexOf('needByDate') > -1 || key.indexOf('category') > -1) {
                        im[key] = $scope.bkEdit.data[key];
                    } else {
                        im.splits.map(function (x) {
                            x[key] = $scope.bkEdit.data[key];
                        });
                    }
                }
            }
        });
        filterItems();
        closeDropDown();
    };

    function closeDropDown() {
            //TODO need to check with UI team for a better solution
        angular.element('.dd-close-off').css('display', 'none');
    }

    function filterItems() {
        $scope.scopedItems = [];
        $scope.items = $scope.ngModel.filter(function (x) {
            var flag = x.type.id == $scope.typeId && !x.isDeleted;
            if (flag)
                $scope.scopedItems.push(x.id);
            return flag;
        });
    };

    function selectTab(elem) {
        $scope.tabId = 1;
        for (var i = 1; i <= $scope.itemDetailTabDataset.length; i++) {
            if (elem.selectedTabContentUrl == 'tabs' + i + '.html') {
                $scope.tabId = i;
                break;
            }
        };
        $scope.conf = mainConf[CONSTANTS.TABS[$scope.tabId] + 'Config'];
    };

    function getSelectedItemType() {
        for (var i = 0; i < $scope.itemType.length; i++) {
            if ($scope.itemType[i].title == $scope.rItem.title) {
                $scope.typeId = i + 1;
                return $scope.itemType[i];
            }
        }
        return undefined;
    };

    $scope.contractNameRO = "Dummy Text";

    
};

