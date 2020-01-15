(function () {

    'use strict';
    angular.module('SMART2')
    .directive('accordianProject', function () {
        return {
            'restrict': 'EA',
            templateUrl: 'project/ppst/views/accordianProj.html',
            link: function (scope, elem, attr) {
            }
        }
    })
    // Directive for activity
    .directive('accordianActivity', function ($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'project/ppst/views/accordianActivity.html',
            link: function (scope, element, attr) {
                var init = false;
                scope.$watchCollection('detailedItemData.activities', function (newValue) {
                    if (init) {
                        $timeout(function () {
                            var newAddedAct = element.find('.collapsible-body-ext').filter(function () {
                                return $(this).data('isOpen') === undefined;
                            });
                            newAddedAct.data("isOpen", false).slideUp(0);
                        });
                    }
                    scope.expColAllActivities('collapseAll');
                });
                scope.expandOneAccord = function (e) {
                    //element.find('.collapsible-body-ext').eq(indx).slideToggle();
                    var _this = $(e.currentTarget), op = _this.next(".collapsible-body-ext").data("isOpen");
                    if (op == false) {
                        _this.next(".collapsible-body-ext").data("isOpen", true).slideDown();
                    } else {
                        _this.next(".collapsible-body-ext").data("isOpen", false).slideUp();
                    }

                }
                scope.expColAllActivities = function (expColl) {
                    if (expColl == "collapseAll") {
                        element.find('.collapsible-body-ext').filter(function () {
                            return $(this).data("isOpen") === true;
                        }).data("isOpen", false).slideUp();
                    } else if (expColl == "expandAll") {
                        element.find('.collapsible-body-ext').filter(function () {
                            return $(this).data("isOpen") === false;
                        }).data("isOpen", true).slideDown();
                    }
                }

                $timeout(function () {
                    element.find('.collapsible-body-ext').data("isOpen", false).slideUp(0);
                    init = true;
                });
            }
        }
    })
	.directive('attachmentsDownload', function ($timeout) {
	    return {
	        'restrict': 'EA',
	        scope: {
	            attachments: '=attachments',
	            identifier: '=identifier',
	            index: '=index'
	        },
	        templateUrl: 'project/ppst/views/attachmentsDownload.html',
	        link: function (scope, elem, attr) {
	        }
	    }
	})
    .directive('topslideFilter', function ($timeout) {
        return {
            'restrict': 'EA',
            templateUrl: 'project/ppst/views/topSlideFilter.html',
            link: function (scope, elem, attr) {
                var filterVal;
                scope.isFilterSaved = false;
                scope.hideSidePanelFilter = true;
                scope.callbackFunc = function (e) {
                    scope.applyFilter();
                };


                scope.showMoreChips = false;
                scope.showAllChips = function () {
                    scope.showMoreChips = true;
                }
                scope.filterChipsOnHideCallback = function () {
                    scope.showMoreChips = false;
                }


                scope.filterItems = [
                    { "filterKey": "Milestone Status" },
                    { "filterKey": "Mandatory" },
                    { "filterKey": "Non-Mandatory" },
                    { "filterKey": "Assignee" },
                    { "filterKey": "Approval Status" },
                    { "filterKey": "Ideation" },
                    { "filterKey": "Execution" },
                    { "filterKey": "Realization" },
                    { "filterKey": "Name" }
                ];

                scope.callbackFuncForFilter = function (e) {
                    scope.savedfilterexpanded = true;
                    if (e.currOperation == "edit") {
                        scope.savedFilterPopUp = true;
                    }
                    else if (e.currOperation == "delete") {
                        scope.savedFilterPopUp = true;
                        if (scope.getFilterViewsList.length == 0) {
                            scope.savedFilterPopUp = false;
                        }
                    }
                    else {
                        scope.applyFilter();
                    }
                };
                scope.applyFilter = function (sortEnable) {
                    if (scope.enableSortButton && sortEnable) {
                        return false;
                    } else {
                        //if (scope.filtertypesave) {
                        //    scope.isapplyfilters = true;
                        //}
                        //else {
                        //    scope.isapplyfilters = false;
                        //}
                        scope.slideTopFilter = false;
                        scope.filterAppliedPanel = 1;
                        scope.isFilterSaved = false;
                        scope.isApplyFilters = true;
                        if (scope.savedViewPopUp == true) { scope.isApplyFilters = false; scope.savedViewPopUp = false; scope.isFilterSaved = true; }
                        if (scope.savedFilterPopUp == true) { scope.savedFilterPopUp = false; scope.isFilterSaved = true; }

                        return filterVal;

                    }
                }

                scope.selectedFilterView = {};
                scope.getFilterViewsList = [
                    { 'name': 'filter 1', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 0 },
                    { 'name': 'filter 2', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 1 },
                    { 'name': 'filter 3', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 2 },
                    { 'name': 'filter 4', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 3 },
                    { 'name': 'filter 5', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 4 }
                ];

                scope.isFilters = false;
                scope.isFilterView = false;
                scope.isFilterViewModified = false;

                scope.savedViewPopUp = false;
                scope.savedFilterPopUp = false;
                scope.filterTypeSave = false;

                scope.savedViewPopupCallback = function (e, type) {
                    if (type == "filter") {
                        scope.filterTypeSave = true;
                        scope.savedFilterPopUp = true;
                        //loader for save View popup
                        scope.isloader = true;
                        $timeout(function () {
                            scope.isloader = false;
                        }, 1000);

                        //scope.savedViewPopUp = false;
                        scope.showfilterViewList = true;
                    }
                    else {
                        scope.savedViewPopUp = true;
                        //scope.savedFilterPopUp = false;
                        scope.showSavedViewList = true;
                    }
                    // scope.showSavedViewList = true;
                };
                scope.savedViewPopupHideCallback = function () {
                    scope.savedViewPopUp = false;
                    scope.savedFilterPopUp = false;
                };
                scope.resetFilter = function () {
                    scope.enableSortButton = true;
                    scope.isApplyFilters = false;
                    scope.isFilterSaved = false;
                    var tabparentContainer = angular.element('#gridFixedContainer .tabparent-container');
                    scope.filterPanelHeight = headerWrapper + tabparentContainer.outerHeight();
                    scope.fixedHeaderWithFilters = subHeaderFixedHeight + tabparentContainer.outerHeight();
                    scope.resetSortBy();
                    scope.savedfilterexpanded = false;
                }
            }
        }
    })
    .directive('summaryPanel', function ($rootScope, $compile, $timeout, notification, $window) {
        return {
            restrict: 'EA',
            templateUrl: "project/ppst/views/summaryPanelTemplate.html",
            scope: true,
            link: function (scope, element, attrs) {
                var errorNotificationOb = {
                    type: "error",
                    message: "Please fill out the mandatory fields required for phase change.",
                    buttons: [
                        {
                            title: "OK",
                            result: "ok"
                        }]
                };
                var $win = angular.element($window);
                var lastScrollTop = 0;
                scope.isActiveNSavings = false;
                scope.isActiveRSavings = false;
                scope.projectStatusOptions = [
                            { "code": "AC", "status": "Active" },
                            { "code": "NS", "status": "Not Started" },
                            { "code": "NA", "status": "Not Active" }
                ];
                scope.projectStatus = scope.projectStatusOptions[0];

                scope.currency = "USD";
                
                scope.status = "Pending";
                scope.phasesOptions = [
                    { "code": "ID", "phase": "IDEATION" },
                    { "code": "EX", "phase": "EXECUTION" },
                    { "code": "REL", "phase": "REALIZATION" }
                ];
                scope.selectedPhase = scope.phasesOptions[0];
                scope.phaseChangeCallback = function (selectedPhase) {
                    if (selectedPhase.code === "EX") {
                        scope.$parent.topPanelError();
                    }
                    if (selectedPhase.code === "REL") {
                        notification.notify(errorNotificationOb, function (response) {
                            if (response.result == "ok") {
                                scope.selectedPhase = scope.phasesOptions[0];
                            }
                        });
                    }
                };
                scope.activateNegotiatedSavings = function () {
                    scope.isActiveNSavings = true;
                }
                scope.activateRealizedSavings = function () {
                    scope.isActiveRSavings = true;
                }

                scope.supplierIncoLineLoader = true;
                $timeout(function () {
                    scope.supplierIncoLineLoader = false;
                }, 5000);
                scope.supplierLineLoaderFlag = {
                    plain: true,
                    message: "Loading Summary Panel",
                    center: true
                };

                //$win.bind('scroll', function (e) {
                //    var windowScrollTop = $win[0].scrollY || $win[0].pageYOffset
                //    if (windowScrollTop > lastScrollTop) {
                //        scope.minimizePanel = true;
                //        scope.$parent.summaryPanelState("collapsed");
                        
                //    } else {
                //        scope.minimizePanel = false;
                //        scope.$parent.summaryPanelState("expanded");
                //    }
                //    lastScrollTop = windowScrollTop;
                //});
                scope.collapseView = function (state) {
                    if (!state) {
                        scope.minimizePanel = true;
                        scope.$parent.summaryPanelState("collapsed");
                    }
                    else {
                         scope.minimizePanel = false;
                        scope.$parent.summaryPanelState("expanded");
                    }
                }
            }
        }
    })
    .directive('eventFocus', function ($timeout) {
        return {
            restrict : 'A',
            link: function (scope, elem, attr) {
                console.log("Set focus", scope, elem, attr);
                scope.setFocusOnAssignee = function (id) {
                    console.log("Set focus", id);
                    $timeout(function () {
                        var element = $('[dataid=' + id + ']').children("input");
                        if (element)
                            element.focus();
                    }, 500);
                }
            } 
            //elem.on(attr.eventFocus, function () {
            //    focus(attr.eventFocusId);
            //});

            //// Removes bound events in the element itself
            //// when the scope is destroyed
            //scope.$on('$destroy', function () {
            //    element.off(attr.eventFocus);
            //});
        };
    })
})(angular);