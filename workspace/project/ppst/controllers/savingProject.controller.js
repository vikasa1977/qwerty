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
	.controller('saveProjectCtrl', ['$scope', '$state', '$http', '$rootScope', 'routeSvc', 'scrollPosition', 'PPSTService', '$timeout', '$parse', 'trackStatusService', 'notification', '$filter', saveProjectFn]);

    function saveProjectFn($scope, $state, $http, $rootScope, routeSvc, scrollPosition, PPSTService, $timeout, $parse, trackStatusService, notification, $filter) {
        //Saving Project start here.

        $scope.mode = $state.params.mode;

        $scope.savingProjectTabsData = [
            {
                "htmlmode": true,
                "tabsUrl": "tabRealizedSavings.html",
                "title": "Realized Savings",
                "contentUrl": "project/ppst/views/realizedSavings.html",
                "active": true,
               
            },
             {
                 "htmlmode": true,
                 "tabsUrl": "tabNegotiatedSavings.html",
                 "title": "Negotiated Savings",
                 "contentUrl": "project/ppst/views/negotiatedSavings.html",
                 "active": false,
                
             },
             {
                 "htmlmode": true,
                 "tabsUrl": "tabEstimatedSaving.html",
                 "title": "Estimated Saving",
                 "contentUrl": "project/ppst/views/estimatedSaving.html",
                 "active": false,
                 

             }];
        switch ($scope.mode) {

            case 'estimated':
                $scope.savingProjectTabsData = [
            
             {
                 "htmlmode": true,
                 "tabsUrl": "tabEstimatedSaving.html",
                 "title": "Estimated Saving",
                 "contentUrl": "project/ppst/views/estimatedSaving.html",
                 "active": true,
              }];
                break;
            case 'negotiated':
                $scope.savingProjectTabsData = [
           
             {
                 "htmlmode": true,
                 "tabsUrl": "tabNegotiatedSavings.html",
                 "title": "Negotiated Savings",
                 "contentUrl": "project/ppst/views/negotiatedSavings.html",
                 "active": true,
                
             },
             {
                 "htmlmode": true,
                 "tabsUrl": "tabEstimatedSaving.html",
                 "title": "Estimated Saving",
                 "contentUrl": "project/ppst/views/estimatedSaving.html",
                 "active": false,
                 

             }];
                break;
            case 'realized':
                $scope.savingProjectTabsData = [
            {
                "htmlmode": true,
                "tabsUrl": "tabRealizedSavings.html",
                "title": "Realized Savings",
                "contentUrl": "project/ppst/views/realizedSavings.html",
                "active": true,
               
            },
             {
                 "htmlmode": true,
                 "tabsUrl": "tabNegotiatedSavings.html",
                 "title": "Negotiated Savings",
                 "contentUrl": "project/ppst/views/negotiatedSavings.html",
                 "active": false,
                
             },
             {
                 "htmlmode": true,
                 "tabsUrl": "tabEstimatedSaving.html",
                 "title": "Estimated Saving",
                 "contentUrl": "project/ppst/views/estimatedSaving.html",
                 "active": false,
                 

             }];
        }

        

        $scope.savingTitle = { "name": "Saving Project" };
       



        /*Start: Base filter*/

        $scope.showMoreChips = false;
        $scope.showAllChips = function () {
            $scope.showMoreChips = true;
        }
        $scope.filterChipsOnHideCallback = function () {
            $scope.showMoreChips = false;
        }


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
            if ($scope.enableSortButton && sortEnable) {
                return false;
            } else {
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
            $scope.enableSortButton = true;
            $scope.isApplyFilters = false;
            $scope.isFilterSaved = false;
            var tabparentContainer = angular.element('#gridFixedContainer .tabparent-container');
            $scope.filterPanelHeight = headerWrapper + tabparentContainer.outerHeight();
            $scope.fixedHeaderWithFilters = subHeaderFixedHeight + tabparentContainer.outerHeight();
            $scope.resetSortBy();
            $scope.savedfilterexpanded = false;
        }


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
                "title": "category",
                "active": true,
                "htmlmode": true,
                "contentUrl": "content1.html",
                "tabsUrl": "tabHeader1.html"
            }, {
                "title": "Region",
                "htmlmode": true,
                "contentUrl": "content2.html",
                "tabsUrl": "tabHeader2.html"
            }, {
                "title": "Business Unit",
                "htmlmode": true,
                "contentUrl": "content3.html",
                "tabsUrl": "tabHeader3.html"
            }, {
                "title": "Supplier",
                "htmlmode": true,
                "contentUrl": "content4.html",
                "tabsUrl": "tabHeader4.html"
            }, {
                "title": "Saving type",
                "htmlmode": true,
                "contentUrl": "content5.html",
                "tabsUrl": "tabHeader5.html"
            }, {
                "title": "Saving Value",
                "htmlmode": true,
                "contentUrl": "content6.html",
                "tabsUrl": "tabHeader6.html"
            }
            ];


            $scope.isApplyFilters = false;
            $scope.isSavedView = false;
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

        $scope.searchfocusOut = function (e) {
            return false;
        };
        $scope.isDisable = true;
        $scope.isbtnSaveDisable = true;
        $scope.isbtnApplyDisable = true;


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

        //End:Base Filter


        //filter Data

        $scope.category = {
            selectAll: false,
            selected: 0,
            data: [{
                name: "IT Hardware",
                isChecked: false,
                //isVisible:true
            }, {
                name: "Logistics",
                isChecked: false,
                //isVisible: true
            }, {
                name: "Marketing",
                isChecked: false,
                //isVisible: true
            }, {
                name: "MRO",
                isChecked: false,
                //isVisible: true
            }]
        };

        $scope.region = {
            selectAll: false,
            selected: 0,
            data: [
                 {
                     name: "Americas",
                     isChecked: false
                 },
                {
                    name: "Africa",
                    isChecked: false
                },
                {
                    name: "Asia",
                    isChecked: false
                },
                {
                    name: "Europe",
                    isChecked: false
                }
            ]
        };

        $scope.bu = {
            selectAll: false,
            selected: 0,
            data: [{
                name: "Technology Solutions",
                isChecked: false
            },
           {
               name: "Consulting",
               isChecked: false
           },
           {
               name: "Architecture",
               isChecked: false
           },
            {
                name: "Shared Services",
                isChecked: false
            }]
        };

        $scope.savingType = {
            selectAll: false,
            selected: 0,
            data: [{
                name: "Saving Type 1",
                isChecked: false
            },
       {
           name: "Saving Type 1",
           isChecked: false
       },
       {
           name: "Saving Type 1",
           isChecked: false
       },
        {
            name: "Saving Type 1",
            isChecked: false
        }]
        };

        $scope.supplier = {
            selectAll: false,
            selected: 0,
            data: [{
                name: "supplier 1",
                isChecked: false
            },
       {
           name: "supplier 1",
           isChecked: false
       },
       {
           name: "supplier 1",
           isChecked: false
       },
        {
            name: "supplier 1",
            isChecked: false
        }]
        };

        $scope.callbackFunc = function (a) {
            switch (a.title) {
                case "category":
                    $scope.filterData = $scope.category.data;
                    break;
                case "Region":
                    $scope.filterData = $scope.region.data;
                    break;
                case "Business Unit":
                    $scope.filterData = $scope.bu.data;
                    break;
                case "Supplier":
                    $scope.filterData = $scope.supplier.data;
                    break;
                case "Saving type":
                    $scope.filterData = $scope.savingType.data;
                    break;
            }

        }

        $scope.selectAllfilterData = { checkedAll: false };
        $scope.checkedAllfilterData = function (check, Filterdata) {
            if (check) {
                $scope.isDisabledLink = true;
                Filterdata.selected = Filterdata.data.length;
                for (var i = 0; i < $scope.filterData.length; i++) {
                    $scope.filterData[i].isChecked = true;
                }
            }
            else {
                Filterdata.selected = 0;
                for (var i = 0; i < $scope.filterData.length; i++) {
                    $scope.filterData[i].isChecked = false;
                }
                $scope.isDisabledLink = false;
            }
        };




        $scope.fillpartial = false;
        $scope.filterDataListChange = function (check, FilterData) {

            $scope.isDisabledLink = check;
            check ? FilterData.selected++ : FilterData.selected--;
            if (FilterData.selected == FilterData.data.length) {
                FilterData.selectAll = true;
                $scope.isDisabledLink = true;
            } else {
                FilterData.selectAll = false;
            }
        };

        $scope.showSelected = function (filterData) {
            filterData.showIsSelected = !filterData.showIsSelected;
            for (var i = 0; i < filterData.data.length; i++) {
                if (!filterData.data[i].isChecked) {
                    filterData.data[i].isHide = filterData.showIsSelected;
                }
            }
        }

        $scope.filterReset = function (check, Filterdata) {

        }


        $scope.pricesheetTabData = [
	{
	    id: 1,
	    SupplierName: 'IBM',
	    MyScore: 3.00,
	    Currency: 'USD',
	    BaselineSpend: '1,00,000',
	    BaselineSpendCoverage: '60,000',
	    'BaselineSpendCoverage %': '40%',
	    SupplierSpend: '1,23,000',
	    Savings: '20,000',
	    'Savings %': '23%',
	    'Total Items/Lines': '11',
	    'Item/Line Coverage': '1,21,000',
	    'Item/Line Coverage %': '90%',

	},
    {
        id: 2,
        SupplierName: 'Dell',
        MyScore: 3.12,
        Currency: 'USD',
        BaselineSpend: '12,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '75%',
        SupplierSpend: '15,000',
        Savings: '32,000',
        'Savings %': '10%',
        'Total Items/Lines': '15',
        'Item/Line Coverage': '56,000',
        'Item/Line Coverage %': '95%',
    },
    {
        id: 3,
        SupplierName: 'Lenovo',
        MyScore: 3.14,
        Currency: 'USD',
        BaselineSpend: '23,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '80%',
        SupplierSpend: '1,12,000',
        Savings: '12,000',
        'Savings %': '43%',
        'Total Items/Lines': '22',
        'Item/Line Coverage': '1,23,000',
        'Item/Line Coverage %': '87%',
    },
    {
        id: 4,
        SupplierName: 'HP',
        MyScore: 3.30,
        Currency: 'USD',
        BaselineSpend: '42,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '62%',
        SupplierSpend: '43,000',
        Savings: '21,000',
        'Savings %': '32%',
        'Total Items/Lines': '8',
        'Item/Line Coverage': '45,000',
        'Item/Line Coverage %': '85%',
    },
    {
        id: 5,
        SupplierName: 'HP',
        MyScore: 3.30,
        Currency: 'USD',
        BaselineSpend: '42,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '62%',
        SupplierSpend: '43,000',
        Savings: '21,000',
        'Savings %': '32%',
        'Total Items/Lines': '8',
        'Item/Line Coverage': '45,000',
        'Item/Line Coverage %': '85%',
    },
    {
        id: 6,
        SupplierName: 'HP',
        MyScore: 3.30,
        Currency: 'USD',
        BaselineSpend: '42,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '62%',
        SupplierSpend: '43,000',
        Savings: '21,000',
        'Savings %': '32%',
        'Total Items/Lines': '8',
        'Item/Line Coverage': '45,000',
        'Item/Line Coverage %': '85%',
    },
    {
        id: 7,
        SupplierName: 'HP',
        MyScore: 3.30,
        Currency: 'USD',
        BaselineSpend: '42,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '62%',
        SupplierSpend: '43,000',
        Savings: '21,000',
        'Savings %': '32%',
        'Total Items/Lines': '8',
        'Item/Line Coverage': '45,000',
        'Item/Line Coverage %': '85%',
    },
    {
        id: 8,
        SupplierName: 'HP',
        MyScore: 3.30,
        Currency: 'USD',
        BaselineSpend: '42,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '62%',
        SupplierSpend: '43,000',
        Savings: '21,000',
        'Savings %': '32%',
        'Total Items/Lines': '8',
        'Item/Line Coverage': '45,000',
        'Item/Line Coverage %': '85%',
    },
    {
        id: 9,
        SupplierName: 'HP',
        MyScore: 3.30,
        Currency: 'USD',
        BaselineSpend: '42,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '62%',
        SupplierSpend: '43,000',
        Savings: '21,000',
        'Savings %': '32%',
        'Total Items/Lines': '8',
        'Item/Line Coverage': '45,000',
        'Item/Line Coverage %': '85%',
    },
    {
        id: 10,
        SupplierName: 'HP',
        MyScore: 3.30,
        Currency: 'USD',
        BaselineSpend: '42,000',
        BaselineSpendCoverage: '30,000',
        'BaselineSpendCoverage %': '62%',
        SupplierSpend: '43,000',
        Savings: '21,000',
        'Savings %': '32%',
        'Total Items/Lines': '8',
        'Item/Line Coverage': '45,000',
        'Item/Line Coverage %': '85%',
    },
        {
            id: 11,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 12,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 13,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 14,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 15,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 16,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 17,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 18,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 19,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        },
        {
            id: 20,
            SupplierName: 'HP',
            MyScore: 3.30,
            Currency: 'USD',
            BaselineSpend: '42,000',
            BaselineSpendCoverage: '30,000',
            'BaselineSpendCoverage %': '62%',
            SupplierSpend: '43,000',
            Savings: '21,000',
            'Savings %': '32%',
            'Total Items/Lines': '8',
            'Item/Line Coverage': '45,000',
            'Item/Line Coverage %': '85%',
        }];
        $scope.cvPaging1 = new wijmo.collections.CollectionView($scope.pricesheetTabData);

        $scope.itemFormatterPricesheetData = function (panel, r, c, cell) {
            if (panel.cellType == wijmo.grid.CellType.Cell) {
                var flex = panel.grid;
                switch (flex.columns[c].name) {
                    case 'BaselineSpend':
                    case 'BaselineSpendCoverage':
                    case 'SupplierSpend':
                    case 'Savings':
                    case 'BaselineSpendCoverage %':
                    case 'Savings %':
                    case 'Total Items/Lines':
                    case 'Item/Line Coverage':
                    case 'Item/Line Coverage %':
                        flex.columns[c].align = 'right';
                }
            }
        }



        $scope.confirmSaving = function () {
            var createOb = {
                type: "confirm",
                message: "CAUTION! You have selected a different currency than the earlier one. Existing values, if any, must be updated to reflect selected currency.",
                checkMessage: "Do not show this message again for now.",
                buttons: [

                    {
                        title: "Yes",
                        result: "Yes"
                    },
                {
                    "title": "No",
                    "result": "no"
                }],

            };
            notification.notify(createOb);
        }
        //Saving Project end here.
        $scope.isInscope = false;
        $scope.moveToScope = function () {
            if (!$scope.isInscope) {
                $scope.isInscope = true;
            }
            else {
                $scope.isInscope = false;
            }
        }

        //Manage Timelines Popup
        $scope.showManageTimelines = false;
        $scope.manageTimelines = function () {
            $scope.showManageTimelines = true;
        }
        $scope.onHideManageTimeLines = function () {
            $scope.showManageTimelines = false;
        }
        $scope.rsmOptions = {
            "months": [
                { "month": "Month" },
                { month: "Jan" },
                { month: "Feb" },
                { month: "Mar" },
                { month: "Apr" },
                { month: "May" },
                { month: "Jun" },
                { month: "Jul" },
                { month: "Aug" },
                { month: "Sep" },
                { month: "Oct" },
                { month: "Nov" },
                { month: "Dec" }

            ],
            "years": [
                { "year": "Year" }, { "year": "2007" }, { "year": "2009" }, { "year": "2010" }, { "year": "2011" }, { "year": "2012" }
            ]
        };
        $scope.rsmModel = {
            month: $scope.rsmOptions.months[0],
            lmonth: $scope.rsmOptions.months[0],
            year: $scope.rsmOptions.years[0],
            lyear: $scope.rsmOptions.years[0]
        };
        $scope.monthChange = function (d) { }
        $scope.yearChange = function (d) { }
        // Baseline RP settings	    
        $scope.baselineRPOpt = {
            "options": [
                { "opt": "Month" },
                { "opt": "Year" }
            ]
        };
        $scope.baselineRP = {
            value: "",
            unit: $scope.baselineRPOpt.options[0]
        };
        //Manage Timelines Popup End Here
    }
})(angular);
