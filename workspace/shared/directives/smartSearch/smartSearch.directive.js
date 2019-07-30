(function () {
    'use strict';
    angular.module('SMART2').directive('smartSearch', ['httpService', '$timeout', 'APPCONSTANTS', '$translate', function (httpService, $timeout, APPCONSTANTS, $translate) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                type: '@'
            },
            link: function (scope, element, attrs) {
                var scopeValues = { "RFX": { "value": "0", "string": "RFX", "SubAppCodes": 103 }, "RFP": { "value": "1", "string": "RFP", "SubAppCodes": 103 }, "RFQ": { "value": "2", "string": "RFQ", "SubAppCodes": 103 }, "RFI": { "value": "3", "string": "RFI", "SubAppCodes": 103 }, "Auction": { "value": "4", "string": "Auction", "SubAppCodes": 103 }, "Contract": { "value": "5", "string": "Contract", "SubAppCodes": 104 }, "Catalog": { "value": "6", "string": "Catalog", "SubAppCodes": 108 }, "Requisition": { "value": "7", "string": "Requisition", "SubAppCodes": 107 }, "PO": { "value": "8", "string": "PO", "SubAppCodes": 107 }, "Order": { "value": "8", "string": "Order", "SubAppCodes": 107 }, "Invoice": { "value": "9", "string": "Invoice", "SubAppCodes": 107 }, "Receipts": { "value": "10", "string": "Receipt", "SubAppCodes": 107 }, "Forms": { "value": "11", "string": "Forms", "SubAppCodes": 105 }, "Scorecards": { "value": "12", "string": "Scorecards", "SubAppCodes": 105 }, "Workbench": { "value": "13", "string": "Workbench", "SubAppCodes": 110 }, "InvoiceReconciliation": { "value": "14", "string": "InvoiceReconciliation", "SubAppCodes": 107 }, "Items": { "value": "20", "string": "Items" }, "Templates": { "value": "15", "string": "Templates", "SubAppCodes": 111 }, "Partners": { "value": "19", "string": "Partners", "SubAppCodes": 105 }, "ContractRequest": { "value": "16", "string": "ContractRequest" }, "RFxRequest": { "value": "17", "string": "RFxRequest" }, "AuctionRequest": { "value": "18", "string": "AuctionRequest" }, "PaymentRequest": { "value": "27", "string": "PaymentRequest" }, "Project": { "value": "21", "string": "Project", "SubAppCodes": 113 }, "CreditMemo": { "value": "22", "string": "CreditMemo", "SubAppCodes": 107 }, "ReturnNote": { "value": "20", "string": "ReturnNote", "SubAppCodes": 107 }, "ActionPlan": { "value": "23", "string": "ActionPlan", "SubAppCodes": 105 }, "Blanket": { "value": "30", "string": "Blanket", "SubAppCodes": 104 }, "CategoryWorkbench": { "value": "28", "string": "CategoryWorkbench", "SubAppCodes": 116 }, "ProjectDashboard": { "value": "101", "string": "ProjectDashboard", "SubAppCodes": 113 } };

                /*
                 *  Get current module scope
                 */
                var getCurrentModuleScope = function () {
                    var selectedModules = scope.selectedModule.FilterKey.split(',');
                    var moduleScopeString = "";

                    for (var i = 0; i < selectedModules.length; i++) {
                        switch (selectedModules[i]) {
                            case (scopeValues.RFI.value):
                                moduleScopeString += scopeValues.RFI.string + ",";
                                break;
                            case (scopeValues.RFP.value):
                                moduleScopeString += scopeValues.RFP.string + ",";
                                break;
                            case (scopeValues.RFQ.value):
                                moduleScopeString += scopeValues.RFQ.string + ",";
                                break;
                            case (scopeValues.Auction.value):
                                moduleScopeString += scopeValues.Auction.string + ",";
                                break;
                            case scopeValues.Workbench.value:
                                moduleScopeString += scopeValues.Workbench.string + ",";
                                break;
                            case scopeValues.Contract.value:
                                moduleScopeString += scopeValues.Contract.string + ",";
                                break;
                            case scopeValues.Scorecards.value:
                                moduleScopeString += scopeValues.Scorecards.string + ",";
                                break;
                            case scopeValues.Forms.value:
                                moduleScopeString += scopeValues.Forms.string + ",";
                                break;
                            case scopeValues.Requisition.value:
                                moduleScopeString += scopeValues.Requisition.string + ",";
                                break;
                            case scopeValues.Order.value:
                                moduleScopeString += scopeValues.Order.string + ",";
                                break;
                            case scopeValues.Invoice.value:
                                moduleScopeString += scopeValues.Invoice.string + ",";
                                break;
                            case scopeValues.InvoiceReconciliation.value:
                                moduleScopeString += scopeValues.InvoiceReconciliation.string + ",";
                                break;
                            case scopeValues.Receipts.value:
                                moduleScopeString += scopeValues.Receipts.string + ",";
                                break;
                            case scopeValues.AuctionRequest.value:
                                moduleScopeString += scopeValues.AuctionRequest.string + ",";
                                break;
                            case scopeValues.RFxRequest.value:
                                moduleScopeString += scopeValues.RFxRequest.string + ",";
                                break;
                            case scopeValues.ContractRequest.value:
                                moduleScopeString += scopeValues.ContractRequest.string + ",";
                                break;
                            case scopeValues.PaymentRequest.value:
                                moduleScopeString += scopeValues.PaymentRequest.string + ",";
                                break;
                            case scopeValues.Partners.value:
                                moduleScopeString += scopeValues.Partners.string + ",";
                                break;
                            case scopeValues.Templates.value:
                                moduleScopeString += scopeValues.Templates.string + ",";
                                break;
                            case scopeValues.Catalog.value:
                                moduleScopeString += scopeValues.Catalog.string + ",";
                                break;
                                //PPST
                            case scopeValues.Project.value:
                                moduleScopeString += scopeValues.Project.string + ",";
                                break;
                            case scopeValues.CreditMemo.value:
                                moduleScopeString += scopeValues.CreditMemo.string + ",";
                                break;
                            case scopeValues.ReturnNote.value:
                                moduleScopeString += scopeValues.ReturnNote.string + ",";
                                break;
                            case scopeValues.ActionPlan.value:
                                moduleScopeString += scopeValues.ActionPlan.string + ",";
                                break;
                            case scopeValues.Blanket.value:
                                moduleScopeString += scopeValues.Blanket.string + ",";
                                break;
                            case scopeValues.CategoryWorkbench.value:
                                moduleScopeString += scopeValues.CategoryWorkbench.string + ",";
                                break;
                            case scopeValues.ProjectDashboard.value:
                                moduleScopeString += scopeValues.ProjectDashboard.string + ",";
                                break;
                        }
                    }

                    //if ModuleScope is 'RFI,RFQ & RFP' than it should be RFx
                    if ((moduleScopeString.indexOf(scopeValues.RFI.string) !== -1) ||
                        (moduleScopeString.indexOf(scopeValues.RFP.string) !== -1) ||
                        (moduleScopeString.indexOf(scopeValues.RFQ.string) !== -1)) {
                        moduleScopeString = moduleScopeString.replace(scopeValues.RFI.string + ",", '');
                        moduleScopeString = moduleScopeString.replace(scopeValues.RFP.string + ",", '');
                        moduleScopeString = moduleScopeString.replace(scopeValues.RFQ.string + ",", '');
                        moduleScopeString += scopeValues.RFX.string;
                    }

                    // Remove last comma from modulescopestring
                    var lastChar = moduleScopeString.slice(-1);
                    if (lastChar == ',') {
                        moduleScopeString = moduleScopeString.slice(0, -1);
                    }

                    return moduleScopeString;
                };


                /*
                 *  Get search navigation url
                 */
                scope.getSearchNavigateURL = function (moduleScope, fieldKey) {
                    var redirectURL = generateUrl(moduleScope);
                    if (fieldKey) {
                        redirectURL += "&fieldkey=" + fieldKey;
                    }
                    return redirectURL;
                };


                /*
                 *  Get scope from module type
                 */
                var getScopeFromModuleType = function (moduleType) {
                    var scope = '';
                    var array = $.makeArray("16,17,18,27".split(','), moduleType.split(',')[0]);

                    if (moduleType == "1,2,3") {
                        scope = scopeValues.RFX.string.toLowerCase();
                    }
                    else if (array == "16" || array == "17" || array == "18" || array == "27") {
                        scope = "request";
                    }
                    else {
                        for (var key in scopeValues) {
                            if (scopeValues[key].value == moduleType) {
                                scope = scopeValues[key].string.toLowerCase();
                                break;
                            }
                        }
                    }
                    return scope;
                };

                var getModuleTypeFromScope = function (moduleScope) {
                    var type = '';
                    for (var key in scopeValues) {
                        if (scopeValues[key].string.toLowerCase() == moduleScope) {
                            type = scopeValues[key].value;
                            break;
                        }
                    }
                    return type;
                };

                var IsAdvanceSearchEnabled = function (moduleScope) {
                    var productsArray = getAdvanceSearchEnabledProducts();
                    var type = getModuleTypeFromScope(moduleScope);
                    if (productsArray.length > 0) {
                        if (productsArray.indexOf(type) != -1)
                            return true;
                        else
                            return false;
                    }
                };

                var getAdvanceSearchEnabledProducts = function () {
                    var productsArray = scope.advancedSearchDocTypes != null ? scope.advancedSearchDocTypes.split(",") : [];
                    return productsArray;
                };

                /*
                 *  Create redirection url
                 */
                var generateUrl = function (moduleScope) {
                    var searchText = scope.searchText.trim();
                    var url = '';
                    if (IsAdvanceSearchEnabled(moduleScope)) {
                        url = searchConstants.portalURL + 'Portal/Dashboard/Documents?scope=' + moduleScope + '&q=' + searchText + '&oloc=' + searchConstants.documentTypeCodes;
                    }
                    else {
                        url = searchConstants.portalURL + 'Portal/search/searchresults?q=' + searchText + '&scope=' + moduleScope + '&oloc=' + searchConstants.documentTypeCodes;
                    }

                    switch (moduleScope.toLowerCase()) {
                        case scopeValues.Catalog.string.toLowerCase():
                            url = searchConstants.portalURL + '/Catalog/Manage/Navigation?bpc=' + searchConstants.encryptedBPC + '&navTo=1&q=' + searchText + '&scope=' + moduleScope + '&' + searchConstants.catalogQueryString + '&oloc=' + scopeValues.Catalog.SubAppCodes;
                            break;
                        case scopeValues.Order.string.toLowerCase():
                            url += '&' + searchConstants.orderQueryString;
                            break;
                        case scopeValues.Invoice.string.toLowerCase():
                            url += '&' + searchConstants.invoiceQueryString;
                            break;
                        case scopeValues.Receipts.string.toLowerCase():
                            url += '&' + searchConstants.receiptQueryString;
                            break;
                        case scopeValues.Requisition.string.toLowerCase():
                            url += '&' + searchConstants.requisitionQueryString;
                            break;
                        case scopeValues.InvoiceReconciliation.string.toLowerCase():
                            url += '&' + searchConstants.invoiceReconcillationQueryString;
                            break;
                        case scopeValues.CreditMemo.string.toLowerCase():
                            url += '&' + searchConstants.creditMemoQuerystring;
                            break;
                        case scopeValues.Blanket.string.toLowerCase():
                            url += '&' + searchConstants.blanketQueryString;
                            break;
                        case scopeValues.CategoryWorkbench.string.toLowerCase():
                            url += '&' + searchConstants.categoryWorkbenchQueryString;
                            break;
                        case scopeValues.Partners.string.toLowerCase():
                            url = searchConstants.portalURL + 'Portal/search/searchresults?q=' + searchText + '&scope=' + moduleScope + '&' + searchConstants.partnersQueryString + '&oloc=' + searchConstants.documentTypeCodes;
                            break;
                        case scopeValues.Forms.string.toLowerCase():
                            url += '&' + searchConstants.formQueryString;
                            break;
                        case scopeValues.Scorecards.string.toLowerCase():
                            url += '&' + searchConstants.assessmentQueryString;
                            break;
                        case scopeValues.Workbench.string.toLowerCase():
                            url += '&' + searchConstants.workBenchQueryString;
                            break;
                        case scopeValues.RFX.string.toLowerCase():
                        case scopeValues.RFP.string.toLowerCase():
                        case scopeValues.RFQ.string.toLowerCase():
                        case scopeValues.RFI.string.toLowerCase():
                            url += '&' + searchConstants.rfxQueryString;
                            break;
                        case scopeValues.Auction.string.toLowerCase():
                            url += '&' + searchConstants.auctionQueryString;
                            break;
                        case scopeValues.ActionPlan.string.toLowerCase():
                            url += '&' + searchConstants.actionPlanQueryString;
                            break;
                        case scopeValues.Contract.string.toLowerCase():
                            url += '&' + searchConstants.contractQueryString;
                            break;
                        case scopeValues.Templates.string.toLowerCase():
                            url += '&' + searchConstants.catalogQueryString;
                            break;
                        case "request":
                            moduleScope = scopeValues.RFxRequest.string.toLowerCase() + "," + scopeValues.AuctionRequest.string.toLowerCase() + "," + scopeValues.ContractRequest.string.toLowerCase() + "," + scopeValues.PaymentRequest.string.toLowerCase();
                            url = searchConstants.portalURL + 'Portal/search/searchresults?q=' + searchText + '&scope=' + moduleScope + '&oloc=' + searchConstants.documentTypeCodes;
                            break;
                        case "returnnote":
                            url += '&' + searchConstants.returnNoteQuerystring;
                            break;
                        case scopeValues.Project.string.toLowerCase():
                            url = searchConstants.portalURL + 'PPST/Project/ProjectHome?oloc=113&q=' + searchText + '&' + searchConstants.projectQueryString;
                            break;
                        default:
                            if ((moduleScope.toLowerCase().indexOf(scopeValues.AuctionRequest.string.toLowerCase()) !== -1) || (moduleScope.toLowerCase().indexOf(scopeValues.RFxRequest.string.toLowerCase()) !== -1) || (moduleScope.toLowerCase().indexOf(scopeValues.ContractRequest.string.toLowerCase()) !== -1) || (moduleScope.toLowerCase().indexOf(scopeValues.PaymentRequest.string.toLowerCase()) !== -1)) {
                                url += '&' + searchConstants.auctionQueryString;
                            }
                            break;
                    }

                    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier) {
                        url = url + "&dd=" + searchConstants.encryptedBPC;
                    }

                    return url;
                };


                scope.searchText = '';

                var request, searchConstants, lastSearchedText;

                /*
                 *  Get search constants from .net controller
                 */
                if (APPCONSTANTS && APPCONSTANTS.userPreferences && APPCONSTANTS.userPreferences.constantURLAndQueryStringValues)
                    searchConstants = APPCONSTANTS.userPreferences.constantURLAndQueryStringValues;
                else {
                    request = {
                        method: 'GET',
                        url: '/' + APPCONSTANTS.userPreferences.AreaName + '/GetConstantURLAndQueryStringValues'
                    };

                    httpService.directhttp(request).then(function (result) {
                        searchConstants = result;
                    }, function (errorData) {
                        searchConstants = {};
                    });
                }

                request = {
                    method: 'GET',
                    url: '/' + APPCONSTANTS.userPreferences.AreaName + '/GetAllowedModulesList?BuyerPartnerCode=' + APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode
                };

                httpService.directhttp(request).then(function (result) {
                    var modules = result.Output;
                    var orderIndex = -1;
                    for (var i = 0; i < modules.length; i++) {
                        if (modules[i].FilterKey == 8) {
                            orderIndex = i;
                            break;
                        }
                    }
                    if (orderIndex > -1) {
                        var quickSearchItem = modules.splice(orderIndex, 1);
                        modules.splice(1, 0, quickSearchItem[0]);
                    }
                    scope.modules = angular.copy(modules);
                    scope.selectedModule = scope.modules[0];
                    scope.advancedSearchDocTypes = result.AdvancedSearchDocTypes;
                }, function (errorData) { });




                /*
                 *  On module item click handler
                 */
                scope.onModuleClick = function (module) {
                    scope.selectedModule = module;
                    scope.showFilterList = false;
                    scope.recentSearches = null;
                    scope.searchResult = null;
                };


                /*
                 *  Get recent searches
                 */
                var getRecentSearches = function () {
                    if (scope.recentSearches) {
                        scope.recentSearches = scope.recentSearches.splice(0, 5);
                        scope.showRecentSearches = true;
                        return;
                    }

                    scope.recentSearches = null;

                    scope.isRecentSearchesLoading = true;

                    request = {
                        method: 'GET',
                        url: '/Controls/HeaderBar/GetRecentSearches?oloc=101&moduleType=' + (scope.selectedModule.IsAllMenu ? 0 : scope.selectedModule.FilterKey.split(',')[0]) + '&fieldKey=' + (scope.selectedModule.FieldKey != undefined ? scope.selectedModule.FieldKey : 0)
                    };

                    httpService.directhttp(request).then(function (result) {
                        scope.showRecentSearches = true;
                        scope.isRecentSearchesLoading = false;
                        try {
                            scope.recentSearches = JSON.parse(result.RecentSearches).splice(0, 5);
                        }
                        catch (e) {
                            scope.recentSearches = [];
                        }
                    }, function (errorData) {
                        scope.isRecentSearchesLoading = false;
                    });
                };


                /*
                 *  Get search results
                 */
                scope.onSearchTextChange = function (event) {
                    if (event.keyCode === 13 && scope.searchText.trim().length > 2) {
                        if (!scope.selectedModule.IsAllMenu) {
                            window.location.href = scope.getSearchNavigateURL(getScopeFromModuleType(scope.selectedModule.FilterKey), scope.selectedModule.FieldKey);
                            return;
                        }

                        scope.showRecentSearches = false;
                        scope.showFilterList = false;
                        scope.showSearchResult = true;
                        scope.isSearchResultLoading = true;

                        //  If user has recently searched for the text entered, do not hit the service
                        if (lastSearchedText === scope.searchText.trim() && scope.searchResult) {
                            scope.isSearchResultLoading = false;
                            return;
                        }

                        if (!scope.recentSearches) {
                            getSearchResults();
                            return;
                        }

                        var recentSearches = [{ "Sequence": 0, "SearchText": scope.searchText.trim() }];

                        //  Remove duplicate entries from recent searches and generate recent search sequence
                        for (var i = 0; i < scope.recentSearches.length; i++) {
                            if (scope.recentSearches[i].SearchText != scope.searchText.trim()) {
                                recentSearches.push({
                                    "Sequence": recentSearches.length,
                                    "SearchText": scope.recentSearches[i].SearchText
                                });
                            }
                        }

                        scope.recentSearches = angular.copy(recentSearches);

                        request = {
                            method: 'POST',
                            url: '/Controls/HeaderBar/SaveRecentSearches?oloc=101',
                            data: {
                                "recentSearches": JSON.stringify(recentSearches),
                                "moduleType": scope.selectedModule.IsAllMenu ? 0 : scope.selectedModule.FilterKey.split(",")[0],
                                "fieldKey": scope.selectedModule.FieldKey != undefined ? scope.selectedModule.FieldKey : 0
                            }
                        };

                        httpService.directhttp(request).then(function (result) {
                            getSearchResults();
                        }, function (errorData) {
                            getSearchResults();
                        });
                    }
                    else {
                        if (scope.searchText.trim().length == 0) {
                            scope.showSearchResult = false;
                            getRecentSearches();
                        }
                    }
                };


                var getSearchResults = function () {
                    lastSearchedText = angular.copy(scope.searchText.trim());

                    scope.searchResult = null;

                    request = {
                        method: 'POST',
                        url: '/Controls/BaseSearch/GetSearchResultForWeb?oloc=101',
                        data: {
                            "searchKeyword": scope.searchText.trim(),
                            "Filters": ["searchScope:All", "pageNumber:1", "isGlobalSearch:true", "module:all", "moduleScope:" + getCurrentModuleScope(), "noOfRecords:0"]
                        }
                    };

                    if (scope.selectedModule.FieldKey) {
                        request.data.Filters.push("fieldkey:" + scope.selectedModule.FieldKey);
                    }

                    httpService.directhttp(request).then(function (result) {
                        scope.isSearchResultLoading = false;
                        if (result.DataSearchResult.GroupTotal.TotalCount > 0) {
                            scope.searchResult = result.DataSearchResult.GroupTotal;
                        }
                        else {
                            scope.searchResult = [];
                        }
                    }, function (errorData) {
                        scope.isSearchResultLoading = false;
                    });
                };


                /*
                 *  On search-text focus
                 */
                scope.onSearchTextFocus = function (e) {
                    if (scope.searchText.trim().length == 0) {
                        scope.showSearchResult = false;
                        getRecentSearches();
                    }
                };


                /*
                 *  On recent search item click handler
                 */
                scope.onRecentSearchItemClick = function (text) {
                    scope.searchText = text;
                    scope.onSearchTextChange({ keyCode: 13 });
                };


                /*
                 *  Get translated label
                 */
                scope.getTranslatedLabel = function (label) {
                    return $translate.instant(label);
                };


                /*
                 *  On document click handler
                 */
                var onDocumentClick = function () {
                    $timeout(function () {
                        scope.showRecentSearches = false;
                        scope.showFilterList = false;
                        scope.showSearchResult = false;
                        try {
                            httpService.abort(request);
                        }
                        catch (e) { }
                    });
                };

                $(document).on('click', onDocumentClick);

                scope.$on('$destroy', function () {
                    $(document).off('click', onDocumentClick);
                })
            },
            templateUrl: 'shared/directives/smartSearch/smartSearchTemplate.html'
        };
    }]);
})();