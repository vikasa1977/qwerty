(function (angular) {
	'use strict';

angular
	.module('SMART2')
	.controller('questionnaireImportRepoCtrl', ['$scope', '$http', '$timeout', '$window', questionnaireImportRepoCtrlFunc])

function questionnaireImportRepoCtrlFunc($scope, $http, $timeout, $window) {

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

	$scope.iteams = [
	{
		title: 'Questionnaire 1',
		type: "Material",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "12-03-16 12.30 PM",
		createdBy: "John Miller",
		id: false,
		isChecked: false 
	},
	{
	    title: 'Questionnaire 2',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Qualification questionnaire",
		createdOn: "18-03-16 11.30 AM",
		createdBy: "Henry L",
		id: "1",
		isChecked: false
	},
	{
	    title: 'Questionnaire 3',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "21-03-16 16.30 PM",
		createdBy: "John Miller",
		id: "2",
		isChecked: false
	}, {
	    title: 'Questionnaire 4',
		type: "Material",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "18-03-16 18.30 PM",
		createdBy: "Stuart Rankins",
		id: "3",
		isChecked: false
	},
	{
	    title: 'Questionnaire 5',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "19-03-16 8.30 AM",
		createdBy: "Ben White",
		id: "4",
		isChecked: false
	},
	{
	    title: 'Questionnaire 6',
		type: "Material",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "19-03-16 22.30 PM",
		createdBy: "John Miller",
		id: "5",
		isChecked: false
	}, {
	    title: 'Questionnaire 7',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "20-03-16 13.45 PM",
		createdBy: "Ben White",
		id: "6",
		isChecked: false
	}, {
	    title: 'Questionnaire 8',
		type: "Material",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "20-03-16 19.00 PM",
		createdBy: "Sarah Willams",
		id: "7",
		isChecked: false
	},
	{
	    title: 'Questionnaire 9',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "21-03-16 17.02 PM",
		createdBy: "Stuart Rankins",
		id: "8",
		isChecked: false
	}, {
	    title: 'Questionnaire 10',
		type: "Material",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "22-03-16 8.10 AM",
		createdBy: "Ben White",
		id: "9",
		isChecked: false
	},
	{
	    title: 'Questionnaire 11',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "22-03-16 20.30 PM",
		createdBy: "John Miller",
		id: "10",
		isChecked: false
	},
	{
	    title: 'Questionnaire 12',
		type: "Material",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "23-03-16 14.22 PM",
		createdBy: "Henry L",
		id: "11",
		isChecked: false
	},
	{
	    title: 'Questionnaire 13',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "24-03-16 18.00 PM",
		createdBy: "Sarah Willams",
		id: "12",
		isChecked: false
	},
	{
	    title: 'Questionnaire 14',
		type: "Service",
		description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
		queType: "Event questionnaire",
		createdOn: "24-03-16 18.00 PM",
		createdBy: "Sarah Willams",
		id: "13",
		isChecked: false
	},
    {
        title: 'Questionnaire 15',
        type: "Service",
        description: "This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.This is some description.",
        queType: "Event questionnaire",
        createdOn: "24-03-16 18.00 PM",
        createdBy: "Sarah Willams",
        id: "14",
        isChecked: false
    }
	];
	$scope.pricesheetAll ={	checkedAll: false};
	$scope.checkedAllPricesheet = function (check) {
		$scope.fillpartial = false;
		if (check) {
			$scope.countPricesheetList = $scope.iteams.length;
			for (var i = 0; i < $scope.iteams.length; i++) {
				$scope.iteams[i].isChecked = true;
			}
		}
		else {
			$scope.countPricesheetList = 0;
			for (var i = 0; i < $scope.iteams.length; i++) {
				$scope.iteams[i].isChecked = false;
			}
		}
	}
	$scope.countPricesheetList = 0;
	$scope.pricesheetListChange = function (check) {
		$scope.countPricesheetList = 0;
		for (var i = 0; i < $scope.iteams.length; i++) {
			if ($scope.iteams[i].isChecked == true)
			{
				$scope.countPricesheetList++;
			}
		}
		$scope.fillpartial = true;
		if ($scope.countPricesheetList === 0) {
			$scope.fillpartial = false;
			$scope.pricesheetAll.checkedAll = false;
		}
		else if ($scope.countPricesheetList === $scope.iteams.length) {
			$scope.fillpartial = false;
			$scope.pricesheetAll.checkedAll = true;
		}
		else {
			$scope.fillpartial = true;
	}

	}

	$scope.isActive = false;
	$scope.activeButton = function () {
		$scope.isActive = !$scope.isActive;
	}
	

	/*filter code starts here*/
	$scope.FilterNumber = 3;
	$scope.isPricesheetFilter = true;
	$scope.showFilter = false;
	$scope.filterContentHeight = 0;
	$scope.toggleFilter = function (e) {
		if ($scope.showFilter == false) {
			$scope.showFilter = true;
			$timeout(function () { 
				$scope.filterContentHeight= (angular.element('.enter-from-top').outerHeight()) +'px';
			}, 1000);

		}
		else
			$scope.showFilter = false;
	};
	$scope.createdByList = [
			   { filterLabel: 'Sonia Barnett', isChecked: false },
			   { filterLabel: 'Jorge Neal', isChecked: false },
			   { filterLabel: 'Willie Kuhn', isChecked: false },
			   { filterLabel: 'Alberto Banks', isChecked: false },
			   { filterLabel: 'Luke Frazier', isChecked: false },
			   { filterLabel: 'Sonia Barnett', isChecked: false },
			   { filterLabel: 'Jorge Neal', isChecked: false },
			   { filterLabel: 'Willie Kuhn', isChecked: false },
			   { filterLabel: 'Alberto Banks', isChecked: false },
			   { filterLabel: 'Luke Frazier', isChecked: false },
			   { filterLabel: 'Sonia Barnett', isChecked: false },
			   { filterLabel: 'Jorge Neal', isChecked: false },
			   { filterLabel: 'Willie Kuhn', isChecked: false },
			   { filterLabel: 'Alberto Banks', isChecked: false },
			   { filterLabel: 'Luke Frazier', isChecked: false },
			   { filterLabel: 'Sonia Barnett', isChecked: false },
			   { filterLabel: 'Jorge Neal', isChecked: false },
			   { filterLabel: 'Willie Kuhn', isChecked: false },
			   { filterLabel: 'Alberto Banks', isChecked: false },
			   { filterLabel: 'Luke Frazier', isChecked: false }
	];

	$scope.filters = [{
		searchType: 'CREATED BY',
		filterAction: true,
		listHeight: '220px',
		filterLists: $scope.createdByList,
		filterCheckedAll: false

	}];
	$scope.pricesheetType = [
		{ title: 'Material' },
		{ title: 'Services' }

	];
	$scope.pricesheetTypeOptions01 = [
		{ title: 'Material' }

	];
	$scope.pricesheetTypeOptions02 = [
		{ title: 'Services' }

	];
	$scope.selectedPricesheetType = { title: 'Material' };

	$scope.pricesheetTypeUrl = "sourcing/rfx/views/popupPricesheetType.html";
	$scope.pricesheetTypePopup = false;
	$scope.pricesheetTypePopupCallback = function (e) {
		$scope.pricesheetTypePopup = true;
	};
	$scope.pricesheetTypePopUpOnHideCallback = function (e) {
		$scope.pricesheetTypePopup = false;
	};

	$scope.onChangeType = function (selected) {
		if (selected.title == 'Material') {
			$scope.selectedPricesheetType = { title: 'Material' };
		} else {
			$scope.selectedPricesheetType = { title: 'Services' };
		}

	}
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
	}

	/*filter code ends here*/

	$scope.indexToShow = 0;
	$scope.selectedRepo = $scope.iteams[$scope.indexToShow];
	$scope.selectClass = '';
	function setActive(index) {
		$scope.indexToShow = index;
		$scope.selectedRepo = $scope.iteams[index];
	}
	$scope.selectedItem = function (index) {
		setActive(index);
	}
	$scope.change = function () {
		if ($scope.indexToShow < $scope.iteams.length - 1) {
			setActive(++$scope.indexToShow);
		} else {
			setActive(0);
		}
	};

	$scope.change1 = function () {
		if ($scope.indexToShow >= 1) {
			setActive(--$scope.indexToShow);
		} else {
			setActive(($scope.iteams.length - 1));
		}
	};
	var myDiv = document.getElementsByClassName('wrapper');

	var pricesheetGetTop = 114 + 'px';
	$scope.pricesheetListTop = {
	    "position": "fixed",
	    "top": pricesheetGetTop
	}

	$scope.contHeight = ($window.innerHeight - 114) + 'px';
	var pricesheetListHeight = ($window.innerHeight - 233) + 'px';
	$scope.pricesheetListScroll = {
		"overflow-y": "scroll",
		"height": pricesheetListHeight
	}
	var setScrollHeight = function () {
	    if ($scope.fixedSubHeader) {
	        if ($scope.isApplyFilters) {
	            pricesheetListHeight = ($window.innerHeight - 209) + 'px';
	            pricesheetGetTop = 90 + 'px';
            }
	        else {
	            pricesheetListHeight = ($window.innerHeight - 169) + 'px';
	            pricesheetGetTop = 50 + 'px';
            }
	    } else {
	        if ($scope.isApplyFilters) {
	            pricesheetListHeight = (($window.innerHeight - 273) + $window.pageYOffset) + 'px';
	            pricesheetGetTop = (154 - $window.pageYOffset) + 'px';
	        }
	        else {
	            pricesheetListHeight = (($window.innerHeight - 233) + $window.pageYOffset) + 'px';
	            pricesheetGetTop = (114 - $window.pageYOffset) + 'px';
            }
		}
		$scope.pricesheetListScroll = {
			"overflow-y": "scroll",
			"height": pricesheetListHeight
		};
		$scope.pricesheetListTop = {
		    "position": "fixed",
		    "top": pricesheetGetTop
		}
	}
	setScrollHeight();
	angular.element($window).bind('resize', function () {
		setScrollHeight();
		$scope.$apply();
	});
	angular.element($window).bind('scroll', function () {
		setScrollHeight();
		$scope.$apply();
	});

	
	
	$scope.manageColumnData = [

	{
		isChecked: true,
		name: "Bid UoM Conversion",
		type: "Computed",
		map: "Unit"
	},
		{
			isChecked : true,
			name: "Units Conversion",
			type: "Currency",
			map: "Price"
		},
		{
			isChecked : true ,
			name: "Historical Price",
			type: "Currency",
			map: "Total Price"
		},
		{
			isChecked: true,
			name: "Unit Price",
			type: "Currency",
			map: "Unit"
		}
	];

	$scope.conditionsData = [
        {
            "questionsNo": true,
            "conditionValuestate": true,
            "showRange": false,
            "isVisibleSwitch": true,
            "fromRange": 0,
            "isValidate": false,
            "selectedQue": { "title": "Questions 1" },
            "selectedComp": { "title": "greater than" }
        },
        {
            "questionsNo": true,
            "conditionValuestate": true,
            "showRange": false,
            "isVisibleSwitch": true,
            "fromRange": 8,
            "isValidate": false,
            "selectedQue": { "title": "Questions 2" },
            "selectedComp": { "title": "less than" }
        },
        {
            "questionsNo": true,
            "conditionValuestate": true,
            "showRange": false,
            "isVisibleSwitch": true,
            "fromRange": 20,
            "isValidate": false,
            "selectedQue": { "title": "Questions 3" },
            "selectedComp": { "title": "less than" }
        },
        {
            "questionsNo": true,
            "conditionValuestate": true,
            "showRange": false,
            "isVisibleSwitch": true,
            "fromRange": 5,
            "isValidate": false,
            "selectedQue": { "title": "Questions 4" },
            "selectedComp": { "title": "greater than" }
        }
	];

	$scope.showQQPopup = false;
	$scope.QQPopupOnShowCallback = function (e) {
	    $scope.showQQPopup = true;
	};
	$scope.QQPopupOnHideCallback = function (e) {
	    $scope.showQQPopup = false;
	};

    // Start: Vertical tabs for filters
	$scope.documentFilterTabData = [{
	    "id": "documentCreatedBy",
	    "title": "Created By",
	    "active": true
	},
    {
        "id": "documentCreationBetween",
        "title": "Creation Date"
    },
    {
	    "id": "documentType",
	    "title": "Type"
	}];

	$scope.showDocumentFilter = false;
	var filterDirty = false;

	$scope.toggleDocumentFilter = function (e) {
	    if (!$scope.showDocumentFilter) {
	        if (filterDirty == false) {
	            $scope.showDocumentFilter = true;
	            $scope.documentType = false;
	            $scope.documentCreationDate = false;
	            $scope.documentCreatedBy = true;
	            filterDirty = true;
	        }
	        else {
	            $scope.showDocumentFilter = true;
            }
	    }
	    else
	        $scope.showDocumentFilter = false;
	};

	$scope.queTypeList = [
        { title: 'Event questionnaire', isChecked: false },
        { title: 'Qualification questionnaire', isChecked: false }
	];
	$scope.createdByList = [
		{ filterLabel: 'Sonia Barnett', isChecked: false },
		{ filterLabel: 'Jorge Neal', isChecked: false },
		{ filterLabel: 'Willie Kuhn', isChecked: false },
		{ filterLabel: 'Alberto Banks', isChecked: false },
		{ filterLabel: 'Luke Frazier', isChecked: false },
		{ filterLabel: 'Sonia Barnett', isChecked: false },
		{ filterLabel: 'Jorge Neal', isChecked: false },
		{ filterLabel: 'Willie Kuhn', isChecked: false },
		{ filterLabel: 'Alberto Banks', isChecked: false },
		{ filterLabel: 'Luke Frazier', isChecked: false },
		{ filterLabel: 'Sonia Barnett', isChecked: false },
		{ filterLabel: 'Jorge Neal', isChecked: false },
		{ filterLabel: 'Willie Kuhn', isChecked: false },
		{ filterLabel: 'Alberto Banks', isChecked: false },
		{ filterLabel: 'Luke Frazier', isChecked: false },
		{ filterLabel: 'Sonia Barnett', isChecked: false },
		{ filterLabel: 'Jorge Neal', isChecked: false },
		{ filterLabel: 'Willie Kuhn', isChecked: false },
		{ filterLabel: 'Alberto Banks', isChecked: false },
		{ filterLabel: 'Luke Frazier', isChecked: false }
	];

	$scope.documentFilterTabSelectCallback = function (tab) {
	    if (tab.id == 'documentType') {
	        $scope.documentType = true;
	        $scope.documentCreationDate = false;
	        $scope.documentCreatedBy = false;
	    }
	    else if (tab.id == 'documentCreationBetween') {
	        $scope.documentType = false;
	        $scope.documentCreationDate = true;
	        $scope.documentCreatedBy = false;
	    }
	    else if (tab.id == 'documentCreatedBy') {
	        $scope.documentType = false;
	        $scope.documentCreationDate = false;
	        $scope.documentCreatedBy = true;
	    }
	};

	var filterVal;
	$scope.applyFilter = function () {
	    $scope.isApplyFilters = true;
	    $scope.showPricesheetFilter = false;
	    $scope.showDocumentFilter = false;
	    $scope.showFilter = false;
	    setScrollHeight();
	    $scope.$apply();
	    //$rootScope.isFilterVisible = false;
	    return filterVal;
	}
	$scope.resetFilter = function () {
	    $scope.isApplyFilters = false;
	    setScrollHeight();
	    $scope.$apply();
	}
    // End: Filters
};
})(angular);