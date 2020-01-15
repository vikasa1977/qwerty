(function () {
    'use strict';
angular.module('SMART2')
    .controller('procProfileTemplateLandingCtrl', ['$scope', '$rootScope', 'routeSvc', '$window', '$timeout', '$state', '$sce', '$http', 'storeService', procProfileTemplateLandingCtrlFunc])
.controller('procProfileTempAccountingDetails', ['$scope', '$rootScope', '$translate', '$window', '$http', 'lookup', 'debouncer', '$timeout', 'notification', '$smartModal', procProfileTempAccountingDetailsFunc])
.controller('procProfileTempLineDetails', ['$scope', '$rootScope', '$translate', '$window', '$http', 'lookup', 'debouncer', '$timeout', 'notification', '$smartModal', procProfileTempLineDetailsFunc])
    ;
function procProfileTemplateLandingCtrlFunc($scope, $rootScope, routeSvc, $window, $timeout, $state, $sce, $http, storeService) {
    /*read only template preview*/
    var getURLwithStatus = 'p2p/procurementProfile/models/createProcProfile_readOnly.json',
            procurmentProfile = {
                method: 'GET',
                url: getURLwithStatus
            };
    $http(procurmentProfile).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig;
        if (storeService.get('isViewLineItem')) {
            for (var i = 0; i < $scope.config.sections[0].rows[0].properties[0].length; i++) {
                $scope.config.sections[0].rows[0].properties[i].focus = false;
            }
            $scope.config.sections[4].isActive = true;
            $timeout(function () {
                var lineDetailsOffsetTop = angular.element('.card.cardParent[label="LINES DETAILS"]').offset().top;
                $window.scrollTo(0, lineDetailsOffsetTop);
            }, 500);
        }
        $scope.$watch('dataModel', function (n, o) {
        }, true);
    }, function (error) {
        console.log(JSON.stringify(error));
    });
    /* read only template preview down */
    var backTo = $state.params.from;

    // Start: CBR config and data
    $scope.treeComponentConfig = {
    	isRadio: false,
    	getHierarchyOnSelection: true,
    	data: null,
    	selectedNodes: "",
    	disableLevelSelection: '',
    	title: 'Category',
    	isLazyLoad: false,
    	getSelections: false,
    	clearCache: false,
    	height: '220px',
    	isSearchEnabled: true,
    	requestParameter: {
    		navigationContext: "PAS"
    	}
    };

    var categoryObj, buObj, regionObj;

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/category.json'
    };
    $http(categoryData).then(function (response) {
        categoryObj = response.data;
    });

    var buData = {
        method: 'GET',
        url: 'shared/popup/models/businessUnit.json'
    };
    $http(buData).then(function (response) {
        buObj = response.data;
    });

    var regionData = {
        method: 'GET',
        url: 'shared/popup/models/region.json'
    };
    $http(regionData).then(function (response) {
        regionObj = response.data;
    });
    // End: CBR config and data


    // Start: Vertical tabs for filters
    $scope.supplierFilterTabData = [{
        "id": "templateDetails",
        "title": "Template Details",
        "active": true
    }, {
        "id": "createdBy",
        "title": "Created By"
    }, {
        "id": "category",
        "title": "Category"
    }, {
        "id": "businessUnit",
        "title": "Business Unit"
    }, {
        "id": "region",
        "title": "Region"
    }, {
        "id": "createdBetween",
        "title": "Created Between"
    }
    ];
    $scope.showFilter = false;

    $scope.toggleFilter = function () {
    	if (!$scope.showFilter) {
    		$scope.showFilter = true;
    		$timeout(function () {
    			$scope.treeComponentConfig.requestParameter = {
    				navigationContext: "PAS",
    			};
    			$scope.treeComponentConfig.data = categoryObj;
    		}, 1000);
    	}
    	else
    		$scope.showFilter = false;
    };
    $scope.tempDetails = true;
    $scope.createdBy = false;
    $scope.createdBetween = false;

    $scope.tabSelectCallback = function (tab) {
    	$scope.treeComponentConfig.getSelections = true;
        $timeout(function () {
            $scope.treeComponentConfig.requestParameter = {
                navigationContext: "PAS",
            };
            if (tab.id == 'templateDetails') {
                $scope.tempDetails = true;
                $scope.createdBy = false;
                $scope.createdBetween = false;
            }
            else if (tab.id == 'createdBy') {
                $scope.createdBy = true;
                $scope.tempDetails = false;
                $scope.createdBetween = false;
            }
            else if (tab.id == 'category') {
                $scope.tempDetails = false;
                $scope.createdBy = false;
                $scope.createdBetween = false;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
            }
            else if (tab.id == 'businessUnit') {
                $scope.tempDetails = false;
                $scope.createdBy = false;
                $scope.createdBetween = false;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'Business Unit';
            }
            else if (tab.id == 'region') {
                $scope.tempDetails = false;
                $scope.createdBy = false;
                $scope.createdBetween = false;
                $scope.treeComponentConfig.data = regionObj;
                $scope.treeComponentConfig.title = 'Region';
            }
            else if (tab.id == 'createdBetween') {
                $scope.createdBetween = true;
                $scope.createdBy = false;
                $scope.tempDetails = false;
            }
        }, 1000);
    };
    // End: Filters
    //************************


    $scope.isApplyFilters = false;
    $scope.isSavedView = false;

    $scope.alertBarFilter = false;

    $scope.resetFilter = function () {
    	$scope.alertBarFilter = false;
    }

    /*filter type*/
    $scope.showFilter = false;

    $scope.toggleDocumentFilter = function () {
        if ($scope.showFilter == false) {
            $scope.showFilter = true;
        }
        else {
            $scope.showFilter = false;
        }
    };
  

    $scope.lastPage = function () {
        history.go(-1);
    }
    $scope.sorts = [
  { 'name': 'Recent First' },
  { 'name': 'Oldest First' }
    ];


    $scope.templateTypeOptions = [{
        "code": "1",
        "name": "RFP"
    }, {
        "code": "2",
        "name": "RFQ"
    }, {
        "code": "3",
        "name": "RFI"
    }];

    $scope.selectedTemplateType = {
        "code": "1",
        "name": "RFP"
    };

    $scope.templateCreatedBy = [{
        "code": "1",
        "name": "All"
    }, {
        "code": "2",
        "name": "Me"
    }, {
        "code": "3",
        "name": "Other"
    }];

    $scope.selectedCreatedBy = {
        "code": "1",
        "name": "All"
    };

    $scope.userName = false;
    $scope.onChange = function (selectedFilter) {
        filterVal = selectedFilter.name;
        if (selectedFilter.code === "3") {
            $scope.userName = true;
        }
        else {
            $scope.userName = false
        }
    };

    $scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
    $scope.smartCatPopupSingleLevel = "shared/popup/views/smartCatPopupSingleLevel.html";
    $scope.userinitialDisplayText = 'Users';
    $scope.showFormSM = false;
    $scope.userData = [
  {
      "name": "Carissa Madden",
      "check": false
  },
  {
      "name": "Dotson Palmer",
      "check": false
  },
  {
      "name": "Meyer Lloyd",
      "check": false
  },
  {
      "name": "Flossie Ochoa",
      "check": false
  },
  {
      "name": "Leah Moses",
      "check": false
  },
  {
      "name": "Ferguson Osborn",
      "check": false
  },
  {
      "name": "Peck Patterson",
      "check": false
  },
  {
      "name": "Gay Payne",
      "check": false
  },
  {
      "name": "Katie Hebert",
      "check": false
  },
  {
      "name": "Bryan Shannon",
      "check": false
  },
  {
      "name": "Skinner Farmer",
      "check": false
  },
  {
      "name": "Mckay Mcneil",
      "check": false
  },
  {
      "name": "Lila Horne",
      "check": false
  },
  {
      "name": "Ethel Powell",
      "check": false
  },
  {
      "name": "Spears Lott",
      "check": false
  },
  {
      "name": "Nannie Ryan",
      "check": false
  },
  {
      "name": "Joy Ware",
      "check": false
  },
  {
      "name": "Shaffer Mcfadden",
      "check": false
  },
  {
      "name": "Audrey Pena",
      "check": false
  },
  {
      "name": "Helga Macdonald",
      "check": false
  }
    ];


    /* SEARCH INTRACTION */
    $scope.showSearchHeader = function () {
    	this.isActiveHeader = true;
    	this.focusSearchHeader = true;
    	this.hideCloseHeader = true;
    }
    $scope.hideSearchHeader = function () {
    	this.isActiveHeader = false;
    	this.focusSearchHeader = false;
    	this.hideCloseHeader = false;
    }



    $scope.mode = $state.params.mode;
    $scope.isExisting = false;
    if ($scope.mode == "existing") {
        $scope.isExisting = true;
    }
    var setURL = 'p2p/procurementProfile/models/procProfileTemplate.json';
	var getRespond = {
		method: 'GET',
		url: setURL
	};

	$http(getRespond).then(function (response) {
	    $scope.setTemplateData = response.data.datalist;
	
	}, function (error) {
		console.log(JSON.stringify(error));
	});	
	$scope.listSortWith = [
                    { 'name': 'Modified Date', 'sortas': 'asc_desc', 'tooltip': 'Sort by Ascending' },
                    { 'name': 'Creation Date', 'sortas': 'asc_desc', 'tooltip': 'Sort by Ascending' },
                    { 'name': 'Name', 'sortas': 'asc_desc', 'tooltip': 'Sort By Ascending' }
	];
	$scope.ascDescToggler = function (getCount) {
		var checkcurrentSortas = $scope.listSortWith[getCount].sortas;
		if (checkcurrentSortas == 'asc_desc') {
			$scope.listSortWith[getCount].sortas = 'asc';
		}
		else if (checkcurrentSortas == 'asc') {
			$scope.listSortWith[getCount].sortas = 'desc';
		}
		else if (checkcurrentSortas == 'desc') {
			$scope.listSortWith[getCount].sortas = 'asc_desc';
		}

	};

	$scope.onChangeselectedSortBy = function (selectedSortBy) {
		$scope.selectedSortBy = selectedSortBy
	};

	$scope.selectedSavedview = {
	};
	$scope.getSavedViewsList = {
	}

	$scope.isApplyFilters = false;
	$scope.isSavedView = false;

    /*filter type*/
	$scope.showFilter = false;

	$scope.toggleDocumentFilter = function () {
	    if ($scope.showFilter == false) {
	        $scope.showFilter = true;
	    }
	    else {
	        $scope.showFilter = false;
	    }
	};

	$scope.useTempCall = function () {
	    if (backTo == 'catalog') {
	        $state.go("catalog.requestercatalog.landing");
	    } else {
	        $state.go("p2p.req.new");
	    }
	
	}
	$scope.applySort = function () {

		if ($scope.isSavedView == true) {
			$scope.isSavedViewModified = true;
		} else {
			$scope.isApplyFilters = true;
		}
		angular.element('body').trigger('click');


	}

	$scope.focusSearch = false;
	$scope.isActive = false;
	$scope.showMe = false;
	$scope.showSearch = function () {
		$scope.isActive = true;
		$scope.focusSearch = true;
		$scope.showMe = true;
		$scope.hideClose = true;
	}

	$scope.hideSearch = function () {
		$scope.isActive = false;
		$scope.focusSearch = false;
		$scope.hideClose = false;
	}

	//contract data starts here
	$scope.sourcingDocType = [
		  { filterLabel: 'Requisitions', isChecked: false },
		  { filterLabel: 'Orders', isChecked: false },
		  { filterLabel: 'Programs', isChecked: false },
		  { filterLabel: 'Receipts', isChecked: false },
		  { filterLabel: 'Return Note', isChecked: false },
		  { filterLabel: 'Invoices', isChecked: false },
		  { filterLabel: 'Credit Memo', isChecked: false },
		  { filterLabel: 'Invoice Reconciliation', isChecked: false }
	];
	/*filter status*/
	$scope.sourcingStatus = [
                { filterLabel: 'Execution Pending', isChecked: false },
                { filterLabel: 'Team Reviewed', isChecked: false },
                { filterLabel: 'Terminated', isChecked: false },
                { filterLabel: 'Buyer Signature Pending', isChecked: false },
                { filterLabel: 'Draft Amendment', isChecked: false },
                { filterLabel: 'Supplier Signature Pending', isChecked: false },
                { filterLabel: 'Draft', isChecked: false },
				{ filterLabel: 'Closed', isChecked: false },
                { filterLabel: 'Expired', isChecked: false },
                { filterLabel: 'Approved', isChecked: false },
                { filterLabel: 'Rejected', isChecked: false },
				{ filterLabel: 'Executed', isChecked: false },
                { filterLabel: 'Declined', isChecked: false },
                { filterLabel: 'Live', isChecked: false },
                { filterLabel: 'Team Rejected', isChecked: false }
	];
	/*filter Category*/
	$scope.sourcingCategoryType = [
                { filterLabel: 'Addendum', isChecked: false },
                { filterLabel: 'Team Reviewed', isChecked: false },
                { filterLabel: 'Terminated', isChecked: false },
                { filterLabel: 'Addendum (ADD)', isChecked: false },
                { filterLabel: 'Supplier Signatory Rejected', isChecked: false },
                { filterLabel: 'Amendment (AMN)', isChecked: false },
                { filterLabel: 'Addendum', isChecked: false },
                { filterLabel: 'Team Reviewed', isChecked: false },
                { filterLabel: 'Terminated', isChecked: false },
                { filterLabel: 'Addendum (ADD)', isChecked: false },
                { filterLabel: 'Supplier Signatory Rejected', isChecked: false },
                { filterLabel: 'Amendment (AMN)', isChecked: false },
                { filterLabel: 'Buyer Signatory Rejected', isChecked: false }
	];
	/*filter author*/
	$scope.sourcingAuthor = [
                { filterLabel: 'Mariana Mckinsey', isChecked: false },
                { filterLabel: 'Yolando Zullo', isChecked: false },
                { filterLabel: 'Sherril Cisneros', isChecked: false },
                { filterLabel: 'Delia Metayer', isChecked: false },
                { filterLabel: 'Guadalupe Kearley', isChecked: false },
                { filterLabel: 'Carman Pennypacker', isChecked: false },
                { filterLabel: 'Phil Kirwan', isChecked: false },
                { filterLabel: 'Mariana Mckinsey', isChecked: false },
                { filterLabel: 'Yolando Zullo', isChecked: false },
                { filterLabel: 'Sherril Cisneros', isChecked: false },
                { filterLabel: 'Delia Metayer', isChecked: false },
                { filterLabel: 'Guadalupe Kearley', isChecked: false },
                { filterLabel: 'Carman Pennypacker', isChecked: false },
                { filterLabel: 'Phil Kirwan', isChecked: false }
	];
	/*filter author*/
	$scope.sourcingSupplier = [
                { filterLabel: 'Quadlane', isChecked: false },
                { filterLabel: 'Ranksuntam', isChecked: false },
                { filterLabel: 'Linetrans', isChecked: false },
                { filterLabel: 'Bluedax', isChecked: false },
                { filterLabel: 'Rancan', isChecked: false },
                { filterLabel: 'Single-holding', isChecked: false },
                { filterLabel: 'Sumjob', isChecked: false },
                { filterLabel: 'Transfase', isChecked: false },
                { filterLabel: 'Tripplecom', isChecked: false },
                { filterLabel: 'Quadlane', isChecked: false },
                { filterLabel: 'Ranksuntam', isChecked: false },
                { filterLabel: 'Linetrans', isChecked: false },
                { filterLabel: 'Bluedax', isChecked: false },
                { filterLabel: 'Rancan', isChecked: false }
	];
	$scope.filters = [{
		searchType: 'STATUS',
		filterAction: true,
		listHeight: '180px',
		filterLists: $scope.sourcingStatus,
		filterCheckedAll: false

	},
{
	searchType: 'DOCUMENT TYPE',
	filterAction: true,
	listHeight: '180px',
	filterLists: $scope.sourcingDocType,
	filterCheckedAll: false
},
{
	searchType: 'CONTRACT TYPE',
	filterAction: true,
	listHeight: '180px',
	filterLists: $scope.sourcingCategoryType,
	filterCheckedAll: false
},
{
	searchType: 'AUTHOR',
	filterAction: true,
	listHeight: '180px',
	filterLists: $scope.sourcingAuthor,
	filterCheckedAll: false
},
{
	searchType: 'OWNER',
	filterAction: true,
	listHeight: '180px',
	filterLists: $scope.sourcingAuthor,
	filterCheckedAll: false
},
{
	searchType: 'SUPPLIER',
	filterAction: true,
	listHeight: '180px',
	filterLists: $scope.sourcingSupplier,
	filterCheckedAll: false
}];
	$scope.FilterNumber = 3;
	$scope.isContract = true;
	$scope.showFilter = false;
	$scope.toggleFilter = function (e) {
		if ($scope.showFilter == false)
			$scope.showFilter = true;
		else
			$scope.showFilter = false;
	};
	
	$scope.alertBarFilter = false;
	$scope.applyCurrentFilter = function (e) {
	    $scope.isApplyFilters = true;
	    $scope.alertBarFilter = true;
	    $scope.toggleFilter(e);
	}

	$scope.hideFilters = function () {
	    $scope.alertBarFilter = false;
	}


	$scope.showCheckbox = false;
	$scope.showAllCheckbox = false;
	var listCount = [];

	$scope.showAllCheckboxFunc = function (ele) {
	    if (ele == true) {
	        $scope.showAllCheckbox = true;
	        listCount.push('0');
	    } else {
	        listCount.pop();
	        if (listCount.length == 0) {
	            $scope.showAllCheckbox = false;
	        }
	    }

	}
	
	$scope.getStatusColor = function (ele) {
	    switch (ele) {
	        /*status related to pending*/
	        case 'Draft':
	        case 'waitlisted':
	        case 'Invited':
	        case 'Partial Receipt':
	        case 'Pending':
	        case 'Approval Required':
	        case 'Amendment in progress':
	        case 'In Progress':
	        case 'Approval Pending':
	        case 'INACTIVE':
	            return 'pending-status-text';
	            break;

	            /*status related to error*/
	        case 'Disqualified':
	        case 'Exception':
	        case 'Error':
	        case 'Failed':
	        case 'Draft Withdrawn':
	        case 'Rejected':
	            return 'error-status-text';
	            break;

	            /*status related to success*/
	        case 'Submitted':
	        case 'Approved':
	        case 'Identified':
	        case 'Matched':
	        case 'Published':
	        case 'Live':
	        case 'Invoice Paid With Remittance':
	        case 'Draft Co-Authoring':
	        case 'Success':
	        case 'Proccessed with Errors':
	        case 'Sent to Partner':
	        case 'Registered':
	        case 'Executed':
	        case 'ACTIVE':
	            return 'success-status-text';
	            break;

	            /*status related to not available*/
	        default:
	            return 'notAvailable-status-text';

	    }
	};
    /* Tempate preview  */
	$scope.showTemplate = function (index) {
	    $scope.profileTempFlag = true;
	    $scope.slideObj = {
	        list: $scope.setTemplateData,
	        index: index,
	        src: 'p2p/procurementProfile/views/popupProcProfileTemplate.html'
	    };
	};

	$scope.closePreviewPopup = function () {
	    $scope.profileTempFlag = false;
	}
  
	$scope.useTempCall = function () {
	    if (backTo == 'catalog') {
	        $state.go("catalog.requestercatalog.landing");
	    } else {
	        $state.go("p2p.req.new");
	    }
	}
    /*mark this Defualt function*/
	$scope.markThisDefualt = function (index) {
	    angular.forEach($scope.setTemplateData, function (value, key) {
	        if (key == index && value.isDefualt == false)
	            value.isDefualt = true;
	        else 
	            value.isDefualt = false;
	    });
    
	}

    //save view popup
	$scope.setSortAsicon = function (checkSortByicon) {
	    switch (checkSortByicon) {
	        case "asc":
	            return "#icon_SortAscending"
	            break;
	        case "desc":
	            return "#icon_SortDescending"
	            break;
	        case "asc_desc":
	            return "#icon_Sort"
	            break;
	    }
	};

	$scope.ascDescToggler = function (getCount, currentItem) {
	    $scope.enableSortButton = false;
	    var checkcurrentSortas = currentItem.sortas;
	    if (checkcurrentSortas == 'asc_desc') {
	        currentItem.sortas = 'asc';
	        currentItem.tooltip = 'Sort by Descending';
	    }
	    else if (checkcurrentSortas == 'asc') {
	        currentItem.sortas = 'desc';
	        currentItem.tooltip = 'Sort by Ascending';
	    }
	    else if (checkcurrentSortas == 'desc') {
	        currentItem.sortas = 'asc';
	        currentItem.tooltip = 'Sort by Descending';
	    }

	    for (var i = 0; i < $scope.listSortWith.length; i++) {
	        if (i != getCount) {
	            $scope.listSortWith[i].sortas = 'asc_desc';
	            $scope.listSortWith[i].tooltip = 'Sort by Ascending';
	        }
	    }
	};
	$scope.itemClicked = function ($index) {
	    $scope.enableSortButton = false;
	    $scope.selectedIndex = $index;
	}
    //for single sort icon
	$scope.sortSingleCurrent = '#icon_Sort';
	$scope.sortMessage = "Sort";
	$scope.sortToggle = function () {
	    if ($scope.sortSingleCurrent == '#icon_Sort') {
	        $scope.sortMessage = "Ascending";
	        $scope.sortSingleCurrent = '#icon_SortAscending';
	    }
	    else if ($scope.sortSingleCurrent == '#icon_SortAscending') {
	        $scope.sortSingleCurrent = '#icon_SortDescending';
	        $scope.sortMessage = "Descending";
	    }
	    else if ($scope.sortSingleCurrent == '#icon_SortDescending') {
	        $scope.sortSingleCurrent = '#icon_Sort';
	        $scope.sortMessage = "Sort";
	    }
	};
	$scope.onChangeselectedSortBy = function (selectedSortBy) {
	    $scope.selectedSortBy = selectedSortBy
	};

	$scope.selectedSavedview = { 'name': 'Requisitions pending since 10 days', 'isDefault': true };
	$scope.getSavedViewsList = [
        { 'name': 'Requisitions pending since 10 days', 'isDefault': true, 'showCurrentItemEditor': false, 'index': 0 },
        { 'name': 'Requisitions exceeding USD 1000.00', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 1 },
        { 'name': 'Requisitions for IT/Telecom', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 2 },
        { 'name': 'Requisitions for Office Supplies less than USD 100.00', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 3 },
        { 'name': 'Requisitions overdue', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 4 }
	];
	$scope.isApplyFilters = false;
	$scope.isSavedView = false;
	$scope.isSavedViewModified = false;
	$scope.selectedFilterView = {};

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

    // manage Attributes
	$scope.manageAttributesPopupUrl = "shared/popup/views/popupManageFields.html";
	$scope.manageAttributesPopUp = false;
	$scope.manageAttributesPopupCallback = function (e, getValuCheck) {
	    $scope.manageAttributesPopUp = true;
	    $scope.$broadcast('checkApplyFilter', { 'checkfilter': getValuCheck });
	    //dragable sort list
	    $('.dragList').sortable({
	        containment: "parent",
	        axis: "y",
	        handle: ".manageCol-tbl--type-nameTd .icon",
	        tolerance: "pointer"
	    });

	};
	$scope.manageAttributesPopupHideCallback = function () {
	    $scope.manageAttributesPopUp = false;
	};

    // custom attribute.
	$scope.addInfoContent = [
	    {
	        "id": 1,
	        "sectionName": "",
	        "levels": [
	    {
	        "levelName": "Header Level",
	        "levelType": "headerlevel",
	        "questions": [
      {
          "mandatory": true,
          "question": "Work Order Type",
          "type": "single-text",
          "questionResponse": "Lorem ipsum",
          "readonly": true,
          "options": []
      },
      {
          "mandatory": true,
          "question": "ERP Order Number",
          "type": "single-response-radio",
          "readonly": true,
          "questionResponse": {
              "code": "A",
              "name": "Option A",
              "disable": true
          },
          "options": [
         {
                "code": "A",
                "name": "Option A",
                 "disable": true
            }]
      },
          {
              "mandatory": true,
              "readonly": true,
              "question": "Urgent",
              "type": "multi-response",
              "questionResponse": true,
              "options": [
        {
            "label": "Urgent",
            "data": ""
        }
              ]
          }
	        ]
	    },
	    {
	        "levelName": "Line Level",
	        "levelType": "linelevel",
	        "questions": [
                      {
                          "mandatory": true,
                          "readonly": true,
                          "question": "Item Description",
                          "type": "multi-text",
                          "questionResponse": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras urna massa, tristique porta risus quis, tempor gravida ante. Nulla vitae risus id purus consectetur luctus. Etiam vulputate aliquet augue in interdum.",
                          "options": []
                      },
                      {
                          "mandatory": true,
                          "readonly": true,
                          "question": "Enter Order Number",
                          "type": "multi-text-with-icon",
                          "questionResponse": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras urna massa, tristique porta risus quis, tempor gravida ante. Nulla vitae risus id purus consectetur luctus. Etiam vulputate aliquet augue in interdum.",
                          "icon": "#icon_Info",
                          "toolTip": "Please provide us your Order numbers associated with the current document. (separated by comma)",
                          "options": []

                      }
                      
	          ]
	                    }]
	    }
	];



	var dataAlreadyLoad = false
	$scope.btnText = 'Show more';
	$scope.moreFieldsClick = function (dataLevel) {
	    var getIndex = _.findIndex($scope.addInfoContent[0].levels, { levelType: dataLevel });
	    if (!dataAlreadyLoad) {
	        var dataForAdditionalInfoLineLevel = [
           {
               "mandatory": true,
               "readonly": true,
               "question": "Asset Type",
               "type": "single-response-drop",
               "questionResponse": "",
               "options": [{ "name": "Assent 1" }, { "name": "Assent 2" }, { "name": "Assent 3" }]

           },
           {
               "mandatory": true,
               "readonly": true,
               "question": "Store Location",
               "type": "single-text",
               "questionResponse": "Mumbai",
               "options": []
           },
           {
               "mandatory": true,
               "readonly": true,
               "question": "Inventory Type",
               "type": "single-response-radio",
               "questionResponse": {
                   "code": "stock",
                   "name": "Stock",
                   "disable": true
               },
               "options": [
                         {
                             "code": "stock",
                             "name": "Stock",
                             "disable": true
                         }
               ]
           }];

	        for (var i = 0; i < dataForAdditionalInfoLineLevel.length; i++) {
	            $scope.addInfoContent[0].levels[getIndex].questions.push(dataForAdditionalInfoLineLevel[i]);
	        };
	        $scope.btnText = 'Less more';
	        dataAlreadyLoad = true;
	    }
	    else {
	        $scope.btnText = 'Show more';
	        var getvalu = $scope.addInfoContent[0].levels[getIndex].questions.length - 3;
	        $scope.addInfoContent[0].levels[getIndex].questions.splice(getvalu, 3);
	        dataAlreadyLoad = false;
	    }
	}
}

function procProfileTempAccountingDetailsFunc($scope, $rootScope, $translate, $window, $http, lookup, debouncer, $timeout, notification, $smartModal) {

    /*account table details*/
    $scope.accountLists = [
          {
              'id': 0,
              'lineType': {
                  'errorMsg': "",
                  'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                  'selected': [{ "name": "Material" }]
              },
              'itemType': {
                  'errorMsg': "",
                  'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                  'selected': [{ "name": "Catalog" }, { "name": "Non-Catalog" }]
              },
              'accountAssignmentCategory': '',
              'costCenter': {
                  'errorMsg': "",
                  'options': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11103 - P Oth Inc/Exp OS", "check": false }, { "name": "1100-11109 - A Oth Inc/Exp OS", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "1100-12101 - H Oth Inc/Exp ID", "check": false }, { "name": "1100-12110 - P Oth Inc/Exp ID NA", "check": false }, { "name": "1100-12111 - P Oth Inc/Exp ID SA", "check": false }],
                  'selected': ""
              },
              'internalOrder': {
                  'errorMsg': "",
                  'options': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }, { "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }, { "name": "105153 - HVAC Repairs", "check": false }, { "name": "105327 - A2 Production Readiness", "check": false }, { "name": "106329 - Industrial Paint System CAR", "check": false }, { "name": "106330 - Steel Paint System CAR", "check": false }, { "name": "106362 - Charlotte Office/PT Design Center Lease", "check": false }],
                  'selected': ""
              },
              'projectCode': {
                  'errorMsg': "",
                  'options': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }, { "name": "Lorem Ipsum2", "check": false, "ischeck": true }, { "name": "Lorem Ipsum3", "check": false }, { "name": "Lorem Ipsum4", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "Lorem Ipsum6", "check": false }, { "name": "Lorem Ipsum7", "check": false }, { "name": "Lorem Ipsum8", "check": false }],
                  'selected': ""
              },
              'glCode': {
                  'errorMsg': "",
                  'options': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }, { "name": "6190000 - Operating Supplies", "check": false, "ischeck": true }, { "name": "6190100 - Operating Equipment", "check": false }, { "name": "6210000 - Perishable Tooling", "check": false }, { "name": "6240030 - Tool Maintenance", "check": false }, { "name": "6190010 - Chemicals", "check": false }, { "name": "6190050 - Lubricants", "check": false }, { "name": "6190090 - Welding Supplies", "check": false }],
                  'selected': ""
              },
              'spliteType': 'Percentage',
              'splite': '',
              'splitePercentages': '',
              'isparentItem': true,
              'spliteCount': 2
          },
          {
              'isSelected': false,
              'id': 1,
              'lineType': {
                  'errorMsg': "",
                  'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                  'selected': ""
              },
              'itemType': {
                  'errorMsg': "",
                  'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                  'selected': ""
              },
              'accountAssignmentCategory': [{
                  "ID": 851750000001,
                  "Name": "IT/Telecom",
                  "ParentID": 851750000001,
                  "Level": 1,
                  "Index": 0,
                  "ChildCount": 5
              }],
              'costCenter': {
                  'errorMsg': "",
                  'options': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11103 - P Oth Inc/Exp OS", "check": false }, { "name": "1100-11109 - A Oth Inc/Exp OS", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "1100-12101 - H Oth Inc/Exp ID", "check": false }, { "name": "1100-12110 - P Oth Inc/Exp ID NA", "check": false }, { "name": "1100-12111 - P Oth Inc/Exp ID SA", "check": false }],
                  'selected': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }]
              },
              'internalOrder': {
                  'errorMsg': "",
                  'options': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }, { "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }, { "name": "105153 - HVAC Repairs", "check": false }, { "name": "105327 - A2 Production Readiness", "check": false }, { "name": "106329 - Industrial Paint System CAR", "check": false }, { "name": "106330 - Steel Paint System CAR", "check": false }, { "name": "106362 - Charlotte Office/PT Design Center Lease", "check": false }],
                  'selected': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }]
              },
              'projectCode': {
                  'errorMsg': "",
                  'options': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }, { "name": "Lorem Ipsum2", "check": false, "ischeck": true }, { "name": "Lorem Ipsum3", "check": false }, { "name": "Lorem Ipsum4", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "Lorem Ipsum6", "check": false }, { "name": "Lorem Ipsum7", "check": false }, { "name": "Lorem Ipsum8", "check": false }],
                  'selected': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }]
              },
              'glCode': {
                  'errorMsg': "",
                  'options': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }, { "name": "6190000 - Operating Supplies", "check": false, "ischeck": true }, { "name": "6190100 - Operating Equipment", "check": false }, { "name": "6210000 - Perishable Tooling", "check": false }, { "name": "6240030 - Tool Maintenance", "check": false }, { "name": "6190010 - Chemicals", "check": false }, { "name": "6190050 - Lubricants", "check": false }, { "name": "6190090 - Welding Supplies", "check": false }],
                  'selected': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }]
              },
              'spliteType': 'Percentage',
              'splite': 'split 1',
              'splitePercentages': '90',
              'isparentItem': false,
              'parentId': 0
          },
            {
                'isSelected': false,
                'id': 2,
                'lineType': {
                    'errorMsg': "",
                    'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                    'selected': ""
                },
                'itemType': {
                    'errorMsg': "",
                    'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                    'selected': ""
                },
                'accountAssignmentCategory': [{
                    "ID": 851750000001,
                    "Name": "IT/Telecom",
                    "ParentID": 851750000001,
                    "Level": 1,
                    "Index": 0,
                    "ChildCount": 5
                }],
                'costCenter': {
                    'errorMsg': "",
                    'options': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11103 - P Oth Inc/Exp OS", "check": false }, { "name": "1100-11109 - A Oth Inc/Exp OS", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "1100-12101 - H Oth Inc/Exp ID", "check": false }, { "name": "1100-12110 - P Oth Inc/Exp ID NA", "check": false }, { "name": "1100-12111 - P Oth Inc/Exp ID SA", "check": false }],
                    'selected': [{ "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }]
                },
                'internalOrder': {
                    'errorMsg': "",
                    'options': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }, { "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }, { "name": "105153 - HVAC Repairs", "check": false }, { "name": "105327 - A2 Production Readiness", "check": false }, { "name": "106329 - Industrial Paint System CAR", "check": false }, { "name": "106330 - Steel Paint System CAR", "check": false }, { "name": "106362 - Charlotte Office/PT Design Center Lease", "check": false }],
                    'selected': [{ "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }]
                },
                'projectCode': {
                    'errorMsg': "",
                    'options': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }, { "name": "Lorem Ipsum2", "check": false, "ischeck": true }, { "name": "Lorem Ipsum3", "check": false }, { "name": "Lorem Ipsum4", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "Lorem Ipsum6", "check": false }, { "name": "Lorem Ipsum7", "check": false }, { "name": "Lorem Ipsum8", "check": false }],
                    'selected': [{ "name": "Lorem Ipsum2", "check": false, "ischeck": true }]
                },
                'glCode': {
                    'errorMsg': "",
                    'options': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }, { "name": "6190000 - Operating Supplies", "check": false, "ischeck": true }, { "name": "6190100 - Operating Equipment", "check": false }, { "name": "6210000 - Perishable Tooling", "check": false }, { "name": "6240030 - Tool Maintenance", "check": false }, { "name": "6190010 - Chemicals", "check": false }, { "name": "6190050 - Lubricants", "check": false }, { "name": "6190090 - Welding Supplies", "check": false }],
                    'selected': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }]
                },
                'spliteType': 'Percentage',
                'splite': 'split 1',
                'splitePercentages': '90',
                'isparentItem': false,
                'parentId': 0
            }
    ];
    /* pagination */
    $scope.selectedTab = 1;
    $scope.rowsToShowOpts = {
        availableOptions: [
          { size: '5' },
          { size: '10' }
        ],
        selectedOption: { size: '5' }
    };
    $scope.currPage = { "no": 1 };
    $scope.pageChanged = function (newPage, oldPage) {
        $scope.currPage.no = newPage;
    };


    /* multiSelectLooup */
    $scope.multiSelectLookupCallback = function (e, index, field) {
        if ($scope.accountLists.length > 1 && index !== 0) {
            setOptions(index)
        };
        plantPoup(e, index, field);
    }
    var plantPoup = function (e, index, field) {
        var currentfield, title;
        switch (field) {
            case "lineType":
                currentfield = $scope.accountLists[index].lineType;
                title = "Choose Line Type";
                break;
            case "itemType":
                currentfield = $scope.accountLists[index].itemType;
                title = "Choose Item Type";
                break;
        }

        debouncer.add(function () {

            var lookupConfig = {
                modelData: currentfield.selected,
                config: {
                    mutliselect: true,
                    displayProperties: ["name"],
                    options: currentfield.options,
                    addnew: false,
                    titleOfModel: title,
                    selectTypeOption: currentfield.selected,
                    readonly: true
                }
            };
            $timeout(function () {
                lookup.open(lookupConfig, function (response) {
                    if (!response.result) return false;
                    currentfield.selected = response.result;

                    switch (field) {
                        case "lineType":
                            $scope.accountLists[index].lineType = currentfield;
                            break;
                        case "itemType":
                            $scope.accountLists[index].itemType = currentfield;
                            break;
                    }
                });
            });

        }, 300);
    }
    /* accounting */

    /*category*/
    // Start: CBR
    $smartModal.initModal({
        templateUrl: "shared/popup/views/smartHierarchyTreeTemplate.html",
        show: "showTreePopup",
        onHide: "onPopupHideCallback(e)",
        $scope: $scope
    });
    var tempCategoryNode_PAS = [];
    /*account type catalog*/
    $scope.treeComponentConfig = {
        isRadio: false,
        getHierarchyOnSelection: true,
        getAllLazyLoadedData: true,
        getUserSelection: true,
        enableLastLevelSelection: true,
        isLazyLoad: false,
        showSelectAll: false,
        showClearSelection: false,
        showSelectionCount: false,
        isReadOnly: true,
        isDisabled: true,
        modalButtonShow: true,
        data: null,
        selectedNodes: "",
        disableLevelSelection: '',
        treeType: 'Generic',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '328px',
        isSearchEnabled: true,
        navigationContext: "PAS",
        isViewOnly:true
    };

    var categoryObj, buObj, regionObj;

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/category.json'
    };
    var currentType = '', PASList;
    $scope.treeOpenCallback = function (type, index) {
      

        $scope.treeComponentConfig.requestParameter = {
            navigationContext: "PAS"
        };
        currentType = type;
            $http(categoryData).then(function (response) {
                categoryObj = response.data;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
                $scope.treeComponentConfig.selectedNodes = '851750000001';
               $scope.treeComponentConfig.isReadOnly = true;
               $scope.treeComponentConfig.isViewOnly = true;
            });

        $scope.showTreePopup = true;
    };

    $scope.onPopupHideCallback = function () {
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        }
    };

    $scope.selectedCategoriesTxt = "Choose Category";
    $scope.selectedCategoriesValidate = false;
    $scope.selectedCategoryNodes = [];


    $scope.treeComponentCallback = function (e) {
        $scope.showTreePopup = false;
    };
    // End: CBR
    // splite view popup
    $scope.listSplits = [];
    $scope.showSplitPopup = false;
    var indexForSplitFor;
    $scope.showSplitePopup = function (index) {
        indexForSplitFor = $scope.accountLists[index].isparentItem ? $scope.accountLists[index].id : $scope.accountLists[index].parentId;
    
        $smartModal.open({
            templateUrl: "p2p/shared/views/popupSplitDev.html",
            show: "showSplitPopup",
            onHide: "onSplitePopupHideCallback()",
            $scope: $scope
        })

        $scope.showSplitPopup = true;
    }
    $scope.onSplitePopupHideCallback = function (e) {
        $scope.showSplitPopup = false;
    }



}

function procProfileTempLineDetailsFunc($scope, $rootScope, $translate, $window, $http, lookup, debouncer, $timeout, notification, $smartModal) {
    /*line data*/
    $scope.lineTypes = [
           {
               'isSelected': false,
               'id': '01',
               'lineType': {
                   'errorMsg': "",
                   'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                   'selected': [{ "name": "Material" }]
               },
               'itemType': {
                   'errorMsg': "",
                   'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                   'selected': [{ "name": "Catalog" }]
               },
               'category': [
                   {
                       "ID": 851750000001,
                       "Name": "IT/Telecom",
                       "ParentID": 851750000001,
                       "Level": 1,
                       "Index": 0,
                       "ChildCount": 5
                   }
               ],
               'uom': {
                   'errorMsg': "",
                   'options': [{ "name": "each", "check": false, "ischeck": true }, { "name": "Each Int.", "check": false, "ischeck": true }, { "name": "Each Per Month", "check": false }, { "name": "Eight Pack", "check": false }, { "name": "Electronic Mail Box", "check": false },
                       { "name": "Electronvolt", "check": false }, { "name": "Electronvolt Per Meter", "check": false }, { "name": "Electronvolt Square Meter", "check": false }, { "name": "Electronvolt Square Meter Per Kilogram", "check": false }],
                   'selected': [{ "name": "each", "check": false, "ischeck": true }]
               },
               'matchingType': {
                   'options': [{ "name": "2 Way" }, { "name": "3 Way" }],
                   'selected': { "name": "2 Way" }
               },
               'neededInDays': '3',
               'serviceDuration': '4'
           }


    ];


    /* multiSelectLooup */
    $scope.multiSelectLookupCallback = function (e, index, field) {
        plantPoup(e, index, field);
    }
    var plantPoup = function (e, index, field) {
        var currentfield, title;
        switch (field) {
            case "lineType":
                currentfield = $scope.lineTypes[index].lineType;
                title = "Choose Line Type";
                break;
            case "itemType":
                currentfield = $scope.lineTypes[index].itemType;
                title = "Choose Item Type";
                break;
        }

        debouncer.add(function () {

            var lookupConfig = {
                modelData: currentfield.selected,
                config: {
                    mutliselect: true,
                    displayProperties: ["name"],
                    options: currentfield.options,
                    addnew: false,
                    titleOfModel: title,
                    selectTypeOption: currentfield.selected,
                    readonly: true
                }
            };
            $timeout(function () {
                lookup.open(lookupConfig, function (response) {
                    if (!response.result) return false;
                    currentfield.selected = response.result;

                    switch (field) {
                        case "lineType":
                            $scope.lineTypes[index].lineType = currentfield;
                            break;
                        case "itemType":
                            $scope.lineTypes[index].itemType = currentfield;
                            break;
                    }
                });
            });

        }, 300);
    }


    /* pagination */
    $scope.selectedTab = 1;
    $scope.rowsToShowOpts = {
        availableOptions: [
          { size: '5' },
          { size: '10' }
        ],
        selectedOption: { size: '5' }
    };
    $scope.currPage = { "no": 1 };
    $scope.pageChanged = function (newPage, oldPage) {
        $scope.currPage.no = newPage;
    };

    /*category*/
    $smartModal.initModal({
        templateUrl: "shared/popup/views/smartHierarchyTreeTemplate.html",
        show: "showTreePopup",
        onHide: "onPopupHideCallback(e)",
        $scope: $scope
    });


    // Start: CBR
    var tempCategoryNode_PAS = [];
    var tempBUNode_PAS = ['851750000001'];
    var tempRegionNode_PAS = [];

      $scope.treeComponentConfig = {
              isRadio: false,
              getHierarchyOnSelection: true,
              getAllLazyLoadedData: true,
              getUserSelection: true,
              enableLastLevelSelection: true,
              isLazyLoad: false,
              showSelectAll: false,
              showClearSelection: false,
              showSelectionCount: false,
              isReadOnly: true,
              isDisabled: true,
          modalButtonShow: true,
          data: null,
          selectedNodes: "",
          disableLevelSelection: '',
          treeType: 'Generic',
          title: 'Category',
          getSelections: false,
          clearCache: false,
          height: '328px',
          isSearchEnabled: true,
          navigationContext: "PAS",
    isViewOnly: true
    };

    var categoryObj, buObj, regionObj;

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/category.json'
    };
    var currentType = '', categoryRowId, PASList;
    $scope.treeOpenCallback = function (type, index) {
        $scope.treeComponentConfig.requestParameter = {
            navigationContext: "PAS"
        };
        currentType = type;
        $http(categoryData).then(function (response) {
            categoryObj = response.data;
            $scope.treeComponentConfig.data = categoryObj;
            $scope.treeComponentConfig.title = 'Category';
            $scope.treeComponentConfig.selectedNodes = '851750000001';
            $scope.treeComponentConfig.isReadOnly = true;
            $scope.treeComponentConfig.isViewOnly = true;
        });

        $scope.showTreePopup = true;
    };


    $scope.onPopupHideCallback = function () {
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        }
    };

    $scope.selectedCategoriesTxt = "Choose Category";
    $scope.selectedCategoriesValidate = false;
    $scope.selectedCategoryNodes = [];


    $scope.treeComponentCallback = function (e) {
        $scope.showTreePopup = false;
    };
    // End: CBR

}


})();