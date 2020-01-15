(function (angular) {
    'use strict';
    angular.module('SMART2').
    directive('platformComposedGrid', ['$timeout', '$rootScope', 'uiGridConstants', 'gridConfigProvider','$compile',composedGridFunc]);

    function composedGridFunc($timeout, $rootScope, uiGridConstants, gridConfigProvider, $compile) {
        return {
            restrict: "E",
            transclude: true,
            scope: {
                config: "=",
                getTabModel: "&",
                apiForGrid: "=",
                instance: "=",
                eventCallback: '&',
                validationService: '@',
                getGridInstanceCallback: '&'
            },
            link: function (scope, element, attrs, controllers) {

                var _getTabModel = scope.$eval(scope.getTabModel);
                var _eventCallback = scope.$eval(scope.eventCallback);
                var _getGridCallback = scope.$eval(scope.getGridInstanceCallback);

                //api for smat ui grid
                scope.smartUiGridApi = {};

                //sending total datamodel to notes & attachmwnts directive
                scope.modelData = scope.instance.dataModel;
                scope.notesAndAttachmentsLineConfig = scope.instance.notesAndAttachmentsLineConfig;
                scope.columnconfig=scope.instance.columnconfig;
                scope.shownotepopup=scope.instance.shownotepopup;
                scope.showattachmentpopup=scope.instance.showattachmentpopup;
                scope.showlinkpopup = scope.instance.showlinkpopup;
                scope.noteformmodel=scope.instance.noteformmodel;
                scope.attachmentformmodel=scope.instance.attachmentformmodel;
                scope.linkformmodel = scope.instance.linkformmodel;
                scope.isLoading = scope.instance.isLoading;
                scope.notesAndAttachmentsService = scope.instance.notesAndAttachmentsService;
                scope.isEditable = scope.instance.isEditable;
                scope.showPopup = scope.instance.showPopup;
                scope.callbackFucn = function (type, obj) {
                    switch (type) {
                        case "gridInstance":
                            gridInstance = obj;
                            scope.instance.gridInstance = gridInstance;
                            var activeTab = _.find(scope.itemDetailTabDataset, function (n) { return n.tabIndex == 0 });
                            setColumnDefsAndData(activeTab);
                            if (angular.isFunction(_getGridCallback)) {
                                _getGridCallback(obj);
                            }
                            break;
                        default:
                             if (type == "composedGridPopupButtonClickDispatcher") {
                                obj={
                                    "rowColObj": { "row": obj.row, "col": obj.col, "model": (scope.modelData == undefined ? null : scope.modelData.items) }
                                }
                            }

                            if (angular.isFunction(_eventCallback)) {
                                _eventCallback(type, obj);
                            }
                            else {
                                $rootScope.$broadcast(type, obj);
                            }


                    }
                };
                //sending data to NA directive
                scope.$watch('instance.dataModel', function (data) {
                    if (data.data != undefined) {
                        scope.modelData = data.data;
                        scope.isLoading = data.loading;
                        if (data.noteOrLinkFormModel != undefined) {
                            scope.noteformmodel = data.noteOrLinkFormModel;
                            scope.linkformmodel = data.noteOrLinkFormModel;
                        }
                    }
                    else if (data != undefined) {
                        scope.modelData = data;
                        scope.isLoading = false;
                    }
                    scope.columnconfig = scope.instance.columnconfig;

            });
                scope.$watch('instance.showPopup', function (flag) {
                    scope.showPopup = flag;
                });
                if (scope.instance.noteformmodel !== undefined && scope.instance.linkformmodel !== undefined) {
                    scope.$watch('instance.noteformmodel', function (data) {
                        if (data.data != undefined && data.data.length > 0) {
                            scope.noteformmodel = data.data
                        }
                        else if (data != undefined) {
                            scope.noteformmodel = data;
                        }
                    });


                  scope.$watch( 'instance.linkformmodel', function (data) {
                        if (data.data != undefined && data.data.length > 0) {
                            scope.linkformmodel = data.data;

                        }
                        else if (data != undefined) {
                            scope.linkformmodel = data;
                        }

                    });
                }
                //Sending callback to composed grid controller
                scope.gridCallback = function (e) {
                    scope.eventCallback({ $event: e });
                   
                    if (!scope.isLoading && !e.type === 'edit')
                            scope.isLoading = true;
                    else
                            if (e.type === 'close' )
                            scope.isLoading = false;
                    
                }
                scope.stickGridContents = false;


                var tabConfig;
                var gridInstance;
                var groupData;
                var activeTabIndex = 0;
                var tabSwitchTimeout;
                var model;
                var onTabSwitchHandler = scope.$eval(scope.onTabSwitch);
                scope.isInitializeGrid = true;
                scope.actionTemplate;
                tabConfig = scope.config.tabConfig;
                initializeTabs();

                if (scope.apiForGrid != undefined) {
                    scope.apiForGrid.updateModel = function (tabIndex) {
                        var _tabIndex = activeTabIndex;
                        if (tabIndex != undefined) {
                            _tabIndex = tabIndex;
                        }
                        _updateModel(_tabIndex);
                    }

                    var selectedRows;
                    scope.apiForGrid.getSelectedRows = function () {
                        selectedRows = gridInstance.selection.getSelectedGridRows();
                        return selectedRows;
                    }

                    scope.apiForGrid.getActiveTabIndex = function () {
                        return activeTabIndex;
                    }
                    scope.apiForGrid.clearRowsSelected = function ()
                    {
                        gridInstance.selection.clearSelectedRows(); //clears selected row
                        gridInstance.core.notifyDataChange('all'); //initiate the cell clss function for all rows.
                    }

                    scope.apiForGrid.getTabStates = function () {
                        scope.itemDetailTabDataset[(scope.activeTabIndex)?scope.activeTabIndex:0].state = gridInstance.saveState.save();
                        return scope.itemDetailTabDataset;
                    }

                    scope.apiForGrid.getActiveColumns = function () {
                        return scope.smartUiGridApi.getActiveColumns();
                    }

                    scope.apiForGrid.notifyDataChange = function () {
                        gridInstance.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                    }
                    
                    if (scope.apiForGrid.rowSelectionCallback) {
                        scope.smartUiGridApi.rowSelectionCallback = scope.apiForGrid.rowSelectionCallback;
                    }   
                }

                $rootScope.$on('notifyDataChange', function () {
                    gridInstance.core.notifyDataChange('all');
                })

                function initializeTabs() {
                    var itemDetailTabDataset = [];
                    _.each(tabConfig, function (config, index) {
                        if (gridConfigProvider.eavluateScopeBindedExpressions(config.isVisible, scope, config)) {
                            itemDetailTabDataset.push({
                                "key": config.title,
                                "title": config.title,
                                "tabIndex": index,
                                "active": (activeTabIndex == index) ? true : false,
                                "state": config.state
                            });
                        }
                    });
                    scope.itemDetailTabDataset = itemDetailTabDataset;
                };

                scope.dataModel;
                function setColumnDefsAndData(e) {
                    activeTabIndex = e.tabIndex;
                    scope.colConfig = null;
                    scope.colConfig = tabConfig[activeTabIndex].cloumnDefs;
                    _updateModel(activeTabIndex);
                    setTimeout(function () {
                        if (e.state) gridInstance.saveState.restore(scope, e.state);
                    })
                    gridInstance.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                };

                function _updateModel(tabIndex) {
                    var tabModel = tabConfig[tabIndex].model;
                    var tabModelKey = tabConfig[tabIndex].modelKey;
                    scope.dataModel = (tabModelKey == undefined) ? (tabModel == undefined ? getModelForTab(tabIndex) : tabModel) : getFlattenedObj(tabModel, tabModelKey);
                   
                }
                scope.itemClickHandler = function (e) {
                    scope.activeTabIndex = e.tabIndex;
                    if (tabSwitchTimeout) {
                        $timeout.cancel(tabSwitchTimeout);
                    }
                    scope.itemDetailTabDataset[e.previousTab.tabIndex].state = gridInstance.saveState.save();
                    scope.itemDetailTabDataset[e.previousTab.tabIndex].active = false;
                    scope.itemDetailTabDataset[e.tabIndex].active = true;
                    tabSwitchTimeout = $timeout(function () {
                        setColumnDefsAndData(e);
                    });
                    $rootScope.$broadcast("composedGridUpdateNotifier", {
                        action: "tabChange",
                        data: e
                    });
                };

                function getModelForTab(index) {
                    if (angular.isFunction(_getTabModel)) {
                        return _getTabModel(index);
                    }
                }

                function getFlattenedObj(model,key)
                {
                    return _.flatten(_.pluck(model, key));
                }

            },
            templateUrl: 'shared/directives/composedGrid/composedGrid.template.html'
        }
    };
})(angular);