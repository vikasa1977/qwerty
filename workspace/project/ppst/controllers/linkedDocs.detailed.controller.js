(function (angular) {
    'use strict';
    angular.module('SMART2')
    .filter('highlights', function ($sce) {
        return function (text, phrase) {
            if (phrase)
                text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="highlighted">$1</span>');

            return $sce.trustAsHtml(text);
        }
    })
	.controller('LinkedDocDetailCntrl', ['$scope', '$rootScope', '$http', 'routeSvc', '$timeout', '$state', 'notification', '$filter', 'PPSTService', linkedDocDetailFn]);

    // function for linked doc detailed card view
    function linkedDocDetailFn($scope, $rootScope, $http, routeSvc, $timeout, $state, notification, $filter, PPSTService) {
        $scope.search = { text: "" };
        $scope.colFilters = {
            rfx: true,
            auction: true,
            contract: true
        };

        $scope.onSelectoption = function () {
            $scope.isShowLinkendDoc = true;
        }



        //filtering data
        /*for (var i = 0; i < $scope.linkedDocData.length; i++) {
            if ($scope.linkedDocData.documents[i].data.isDisabledLinkDoc = false) {
                console.log("==>" + true);
            }
        }*/

        $scope.linkedDocuments = "LINKED DOCUMENTS";
        function readLinkedDoc() {
            $scope.linkedDocData = [];
            var jsonUrls = [
                    {
                        'method': 'GET',
                        'url': 'project/ppst/models/linkedDocs.json'
                    }
            ];
            PPSTService.getJSONData(jsonUrls)
            .then(function (resp) {
                $scope.linkedDocData = resp[0].data;
            }).catch(function (err) {
                console.error("error fetching model data for linked docs");
            });
        }
        readLinkedDoc();

       

        /*filter type*/


        $scope.val1 = true;
        $scope.val2 = true;
        $scope.val3 = true;

        $scope.hideSidePanelFilter = true;
        $scope.callbackFunc = function (e) {
            $scope.applyFilter();
        };


        $scope.showMoreChips = false;
        $scope.showAllChips = function () {
            $scope.showMoreChips = true;
        }
        $scope.filterChipsOnHideCallback = function () {
            $scope.showMoreChips = false;
        }


        $scope.filterItems = [
            { "filterKey": "Document Type" },
            { "filterKey": "Delivery Status" },
            { "filterKey": "Category" },
            { "filterKey": "Status" },
            { "filterKey": "Organisation Entity" },
            { "filterKey": "Name" },
            { "filterKey": "My Role" },
            { "filterKey": "Date Range" },
            { "filterKey": "Period" },
            { "filterKey": "Recipient Type" }
        ];

        $scope.callbackFuncForFilter = function (e) {
            $scope.savedfilterexpanded = true;
            if (e.currOperation == "edit") {
                $scope.savedFilterPopUp = true;
            }
            else if (e.currOperation == "delete") {
                $scope.savedFilterPopUp = true;
                if ($scope.getFilterViewsList.length == 0) {
                    $scope.savedFilterPopUp = false;
                }
            }
            else {
                $scope.applyFilter();
            }
        };

      

        var filterVal,
        subHeaderFixedHeight = 50,
        headerWrapper = 115;
        $scope.fixedHeaderWithFilters = subHeaderFixedHeight + 48;
        $scope.isFilterSaved = false;
      
        $scope.applyFilter = function (sortEnable) {
            $scope.colFilters.contract = false;
            if ($scope.enableSortButton && sortEnable) {
                return false;
            } else {
                //if ($scope.filtertypesave) {
                //    $scope.isapplyfilters = true;
                //}
                //else {
                //    $scope.isapplyfilters = false;
                //}
                $scope.showFilter = false;
                $scope.filterAppliedPanel = 1;
                $scope.isFilterSaved = false;
                $scope.isApplyFilters = true;
                if ($scope.savedViewPopUp == true) { $scope.isApplyFilters = false; $scope.savedViewPopUp = false; $scope.isFilterSaved = true; }
                if ($scope.savedFilterPopUp == true) { $scope.savedFilterPopUp = false; $scope.isFilterSaved = true; }

                return filterVal;

            }
           
        }



        $scope.closeSavedPopup = function () {
            $scope.filterTypeSave = false;
            $scope.savedFilterPopUp = false;
            $scope.showfilterViewList = false;
            $scope.savedViewPopUp = false;
            $scope.showSavedViewList = false;
        }
        $scope.getDynamicHeight = function (e) {
            $scope.filterAppliedPanel = e.height;
            var tabparentContainer = angular.element('#gridFixedContainer .tabparent-container'),
                uploadStatus = $('#uploadStatus');
            $scope.filterPanelHeight = $scope.filterAppliedPanel + headerWrapper + tabparentContainer.outerHeight() + uploadStatus.outerHeight();
            $scope.fixedHeaderWithFilters = $scope.filterAppliedPanel + subHeaderFixedHeight + tabparentContainer.outerHeight() + uploadStatus.outerHeight();
            $scope.documentViewHeight = $scope.filterAppliedPanel + subHeaderFixedHeight;
        };

        $scope.resetFilter = function () {
            $scope.colFilters.contract = true;
            $scope.enableSortButton = true;
            $scope.isApplyFilters = false;
            $scope.isFilterSaved = false;
            var tabparentContainer = angular.element('#gridFixedContainer .tabparent-container');
            $scope.filterPanelHeight = headerWrapper + tabparentContainer.outerHeight();
            $scope.fixedHeaderWithFilters = subHeaderFixedHeight + tabparentContainer.outerHeight();
            $scope.resetSortBy();
            $scope.savedfilterexpanded = false;
         }

        $scope.resetSortBy = function () {
            for (var i = 0; i < $scope.listSortWith.length; i++) {
                $scope.listSortWith[i].sortas = 'asc_desc';
                $scope.listSortWith[i].tooltip = 'Sort by Ascending';
                $scope.selectedIndex = -1;
            }
        };

        $scope.lastPage = function () {
            history.go(-1);
        }
        $scope.sorts = [
      { 'name': 'Recent First' },
      { 'name': 'Oldest First' }
        ];


        $scope.filterOptions = [{
            "code": "1",
            "name": "RFX"
        }, {
            "code": "2",
            "name": "Auction"
        }, {
            "code": "3",
            "name": "Contract"
        }];
      
        $scope.dateRange = false;
        $scope.onChange = function (selectedFilter) {
            filterVal = selectedFilter.name;
            if (selectedFilter.code === "5") {
                $scope.dateRange = true;
            }
            else {
                $scope.dateRange = false
            }
        };


        $scope.showFilter = false;
        $scope.toggleFilter = function (e) {
            if ($scope.showFilter == false) {
                $scope.showFilter = true;
                //$rootScope.isFilterVisible = true;
            }
            else {
                $scope.showFilter = false;
                //$rootScope.isFilterVisible = false;
            }
        };


        if ($scope.docType != 'recent_documents') {

            $scope.importDocumentFilterTabData = [{
                "id": "documentType",
                "title": "Document Type",
                "active": true,
                "htmlmode": true,
                "tabsUrl": "tabHeader1.html"
            }, {
                "id": "status",
                "title": "Delivery Status",
                "htmlmode": true,
                "tabsUrl": "tabHeader2.html"
            }, {
                "id": "author",
                "title": "Author",
                "htmlmode": true,
                "tabsUrl": "tabHeader3.html"
            }
            ];

            $scope.statusData = [{ "name": "Draft" }, { "name": "Exception" }, { "name": "Approval required" }, { "name": "Pending" }, { "name": "Approval pending" }, { "name": "Execute" }, { "name": "Matched" }, { "name": "Matched" }, { "name": "Approved" }, { "name": "Completed" }]
            $scope.authorData = [{ "name": "Some one" }, { "name": "Some one" }, { "name": "Some one" }]


            $scope.showFilter = false;
            $scope.documentType = true;
            $scope.Status = false;
            $scope.author = false;
           

            $scope.tabSelectCallback = function (tab) {
                if (tab.id == 'documentType') {
                    $scope.documentType = true;
                    $scope.status = false;
                    $scope.author = false;
                }
                else if (tab.id == 'status') {
                    $scope.documentType = false;
                    $scope.status = true;
                    $scope.author = false
                }
                else if (tab.id == 'author') {
                    $scope.documentType = false;
                    $scope.status = false;
                    $scope.author = true
                }
             };

            $scope.isApplyFilters = false;
            $scope.isSavedView = false;

            //End: Filter
        };

        $scope.savedViewPopUp = false;
        $scope.savedFilterPopUp = false;
        $scope.filterTypeSave = false;

        $scope.savedViewPopupCallback = function (e, type) {
            if (type == "filter") {
                $scope.filterTypeSave = true;
                $scope.savedFilterPopUp = true;
                //loader for save View popup
                $scope.isloader = true;
                $timeout(function () {
                    $scope.isloader = false;
                }, 1000);

                //$scope.savedViewPopUp = false;
                $scope.showfilterViewList = true;
            }
            else {
                $scope.savedViewPopUp = true;
                //$scope.savedFilterPopUp = false;
                $scope.showSavedViewList = true;
            }
            // $scope.showSavedViewList = true;
        };
        $scope.savedViewPopupHideCallback = function () {
            $scope.savedViewPopUp = false;
            $scope.savedFilterPopUp = false;
        };

        //$scope.saveViewPopupCallback = function (e) {
        //    $scope.savedViewPopUp = true;
        //    $scope.showSavedViewList = false;
        //};
        $scope.showExportPopup = false;
        $scope.showExportPopupCallback = function () {
            $scope.showExportPopup = true;
        }
        $scope.exportPopupOnHideCallback = function (e) {
            $scope.showExportPopup = false;
        }
        $scope.showExportLogPopup = false;
        $scope.exportLogPopupOnHideCallback = function (e) {
            $scope.showExportLogPopup = false;
        }
        $scope.viewExportLogCall = function () {
            $scope.showExportPopup = false;
            $scope.showExportLogPopup = true;
        }

        $scope.searchfocusOut = function (e) {
            return false;
        };
        $scope.isDisable = true;
        $scope.isbtnSaveDisable = true;
        $scope.isbtnApplyDisable = true;


        $scope.onFilterCheckboxChange = function (isChecked, sectionindex) {

            if (!isChecked) {
                $scope.filters[sectionindex].filterCheckedAll = false;
                $scope.isDisable = true;
                $scope.isbtnSaveDisable = true;
                $scope.isbtnApplyDisable = true;
            }
            else {

                $scope.isDisable = false;
                $scope.isbtnSaveDisable = false;
                $scope.isbtnApplyDisable = false;
            }
        }

        $scope.checkedAll = function (filterCheckedAll, index) {

            var filterCheckboxs = $scope.filters[index].filterLists;
            if (!filterCheckedAll) {
                for (var i = 0; i < filterCheckboxs.length; i++) {
                    filterCheckboxs[i].isChecked = false;
                }
            } else {
                for (var i = 0; i < filterCheckboxs.length; i++) {
                    filterCheckboxs[i].isChecked = true;
                    $scope.isbtnSaveDisable = false;
                    $scope.isbtnApplyDisable = false;
                }
            }

        };


        $scope.savedFilterListOption = [
                { "name": "New Filter" },
                { "name": "Draft Memos 1" },
                { "name": "Draft Memos 2" },
                { "name": "Draft Memos 3" },
                { "name": "Draft Memos 4" },
                { "name": "Draft Memos 5" },
                { "name": "Draft Memos 6" },
                { "name": "Draft Memos 7" }

        ];

        $scope.selectedCurrentFilter = {
            "name": "Draft Memos 1"
        };
        $scope.onChangeSavedFilter = function (selectedFilter) {

            $scope.selectedCurrentFilter.name = selectedFilter;
            $scope.isbtnApplyDisable = false;

        };
        $scope.newfilter = { "name": "" };

        $scope.saveFilter = function () {
            Materialize.toast("Filter has been added", 5000);
            $scope.savedFilterListOption.push($scope.newfilter);
            $scope.newfilter.name = "";
            $scope.saveFilterPopUp = false;

            //$scope.isApplyFilters = true;
            //$scope.showFilter = false;
            $scope.filterAppliedPanel = 1;
            $scope.isFilterSaved = true;
            $timeout(function () {
                $scope.savedfilterexpanded = true;
            }, 500)
            // angular.element(domElement).trigger('click');
        }

        $scope.saveFilterPopupUrl = "shared/popup/views/popupSaveFilter.html";
        $scope.saveFilterPopUp = false;
        $scope.saveFilterPopupCallback = function (e) {
            $scope.saveFilterPopUp = true;

        };
        $scope.saveFilterPopupHideCallback = function () {
            $scope.saveFilterPopUp = false;
        };
        $scope.isFilteredFromMain = false;
        $scope.applyCurrentFilter = function (e, isSavedView) {
            if (isSavedView == true) {
                $scope.isSavedViewModified = true;
            } else {
                $scope.isFilteredFromMain = true;
                $scope.isApplyFilters = true;
                $scope.bandHeight = 40;
            }
            $scope.toggleFilter(e);
        }
        $scope.isApplyFilters = false;
        $scope.isSavedView = false;
        $scope.isSavedViewModified = false;

        $scope.selectedFilterView = {};
        $scope.getFilterViewsList = [
            { 'name': 'filter 1', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 0 },
            { 'name': 'filter 2', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 1 },
            { 'name': 'filter 3', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 2 },
            { 'name': 'filter 4', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 3 },
            { 'name': 'filter 5', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 4 }
        ];

        $scope.isFilters = false;
        $scope.isFilterView = false;
        $scope.isFilterViewModified = false;
        $scope.documents = [{ name: "RFX" }, { name: "Auction" }, { name: "Contract" }];
        
        $scope.actionMenu = [{ name: "Acion 1" }, { name: "Acion 2" }, { name: "Acion 3" }]

        // Blue screen of creation mode
        $scope.documentObj = {};
        $scope.documentObj.callback = function (item) {
            console.log(item);
            Materialize.toast("Document has been successfully created", 2000);
        }
        $scope.addContract = function () {
            var item = {
                docID: 103
            };
            $scope.documentObj.setActiveProduct(item)
        }
        $scope.addDocAuction = function () {
            var item = {
                docID: 102
            };
            $scope.documentObj.setActiveProduct(item)
        };
        $scope.addDocRfx = function () {
            var item = {
                docID: 101
            };
            $scope.documentObj.setActiveProduct(item)
        };


        $scope.adDocs = function(doc){
            switch(doc.name) {
                case "RFX":
                    $scope.addDocRfx();
                    break;
                case "Auction":
                    $scope.addDocAuction();
                    break;
                case "Contract":
                    $scope.addContract();
                    break;
              }
        }

        // Start: Search in subheader
        $scope.showSearchHeader = function () {
            this.isActiveHeader = true;
            this.focusSearchHeader = true;
            this.hideCloseHeader = true;
        };
        $scope.hideSearchHeader = function () {
            this.isActiveHeader = false;
            this.focusSearchHeader = false;
            this.hideCloseHeader = false;
        };
        // End: Search in subheader
    }

})(angular);
