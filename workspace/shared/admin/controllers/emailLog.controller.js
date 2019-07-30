angular.module('SMART2')
	.controller('emailLogCtrl', ['$scope', '$translate', '$rootScope', 'RuleEngine', '$http', '$filter', 'notification', emailLogCtrlFunc])


function emailLogCtrlFunc($scope, $translate, $rootScope, RuleEngine, $http, $filter, notification) {
	
	$scope.isSavedView = false;
    /*filter type*/
	$scope.isApplyFilters = false;
	$scope.showFilter = false;

	$scope.toggleDocumentFilter = function (val) {
	    if ($scope.showFilter == false) {
	        $scope.showFilter = true;
	        //$rootScope.isFilterVisible = true;
	    }
	    else {
	        $scope.showFilter = false;
	        //$rootScope.isFilterVisible = false;
	    }
	    if (val) {
	        $scope.resetFilter();
	        for (var i = 0; i < $scope.importDocumentFilterTabData.length; i++) {
	            $scope.importDocumentFilterTabData[i].active = false;
	            if ($scope.importDocumentFilterTabData[i].title == val) {
	                $scope.importDocumentFilterTabData[i].active = true;
	               // $scope.tabClickCallback($scope.importDocumentFilterTabData[i]);
	            }
	        }
	    }
	    
	};

	$scope.importDocumentFilterTabData = [
	{
	    "title": "Period",
	    "contentUrl": "period.html",
	    "active": true,
	    "htmlmode": true,
	    "tabsUrl": "tabHeader1.html"
	}, {
	    "title": "Delivery Status",
	    "contentUrl": "deliveryStatus.html",
	    "htmlmode": true,
	    "tabsUrl": "tabHeader2.html"
	}, {
	    "title": "Document Type",
	    "contentUrl": "documentType.html",
        "htmlmode": true,
        "tabsUrl": "tabDocument.html"
	}, {
	    "title": "Recipient Type",
	    "contentUrl": "recipientType.html",
	    "htmlmode": true,
	    "tabsUrl": "tabHeader3.html"
	}, {
	    "title": "Date Range",
	    "contentUrl": "dateRange.html",
	    "htmlmode": true,
	    "tabsUrl": "tabHeader4.html"
	}, {
	    "title": "Advance Date Range",
	    "contentUrl": "advanceDateRange.html",
        "htmlmode": true,
	    "tabsUrl": "tabHeader5.html"
	}

	];

	$scope.dropDownConfig = {
	    inDuration: 300,
	    outDuration: 225,
	    constrain_width: false, // Does not change width of dropdown to that of the activator
	    hover: false, // Activate on hover
	    gutter: 0, // Spacing from edge
	    belowOrigin: false, // Displays dropdown below the button
	    alignment: 'left' // Displays dropdown with edge aligned to the left of button
	};

	$scope.operatorRange = false;
    $scope.hideDateRow = false;
    $scope.onChangeFilterType = function (conditionOp) {
	    if (conditionOp.name == "Between") {
	        $scope.operatorRange = true;
	        $scope.hideDateRow = true;
	    }
	    else {
	        $scope.operatorRange = false;
	        $scope.hideDateRow = false;
	    }
	};

    $scope.defaultSelectedOperator = '';
	//$scope.operatorValue = "Value";
	$scope.operatorsList = [
        { 'name': 'Greater than' },
        { 'name': 'Greater than equals to' },
        { 'name': 'Less than' },
        { 'name': 'Less than equals to' },
        { 'name': 'Equal' },
        { 'name': 'Not equal to' },
        { 'name': 'Between' },
	    { 'name': 'Is Null' },
	    { 'name': 'Is Not Null' }];

	$scope.repoList = [
	{	   
	    isChecked: false,
	    isHide: false,
	    title: "Jorge Neal"
	},
    {	   
        isChecked: false,
        isHide: false,
        title: "Sonia Barnett"
    },
    {	   
        isChecked: false,
        isHide: false,
        title: "Alberto Banks"
    },
    {	   
        isChecked: false,
        isHide: false,
        title: "Luke Frazier"
    },
    {	   
        isChecked: false,
        isHide: false,
        title: "Willie Kuhn"
    },
	{	   
	    isChecked: false,
	    isHide: false,
    title: "Tyron White"
    }
	];
    // Start-- check/Uncheck List
	$scope.docAll = { checkedAll: false };
	$scope.countPricesheetList = 0;
	$scope.showSelect = true;
	$scope.showSelectList = false;
	$scope.checkedAllDoc = function (check) {
	    $scope.fillpartial = false;
	    $scope.showSelect = false;
		for (var i = 0; i < $scope.repoList.length; i++) {
			$scope.repoList[i].isChecked = check;
		}
		if (check)
		    $scope.countPricesheetList = $scope.repoList.length;
		else {
		    $scope.countPricesheetList = 0;
		    $scope.showSelect = true;
		}
	};
	
	$scope.documentListChange = function (check) {
		$scope.countPricesheetList = 0;
		for (var i = 0; i < $scope.repoList.length; i++) {
			if ($scope.repoList[i].isChecked == true)
				$scope.countPricesheetList++;
		}
		$scope.fillpartial = true;
		$scope.showSelect = false;
		if ($scope.countPricesheetList === 0) {
		    $scope.fillpartial = false;
		    $scope.showSelect = true;
			$scope.docAll.checkedAll = false;
		}
		else if ($scope.countPricesheetList === $scope.repoList.length) {
		    $scope.fillpartial = false;
		    $scope.showSelect = false;
			$scope.docAll.checkedAll = true;
		}
	};
	$scope.checkElem = {
	    checkElemStatus: false,
	    text: "selected",
	};

	
	$scope.resetData = function () {
	    $scope.fillpartial = false;
	    $scope.docAll.checkedAll=false;
	    $scope.showSelect = true;
	    $scope.countPricesheetList = 0;
	    console.log('sdfdf');
	    for (var i = 0; i < $scope.repoList.length; i++) {
	        $scope.repoList[i].isChecked = false;
	    }       
	}
	$scope.showselected = function (check) {
	    console.log($scope.checkElem.checkElemStatus);
	    $scope.checkElem.checkElemStatus = !$scope.checkElem.checkElemStatus;
	   
	    if ($scope.checkElem.checkElemStatus == false) {
	        $scope.checkElem.text = "selected";
	        for (var i = 0; i < $scope.repoList.length; i++) {
	            $scope.repoList[i].isHide = false;
	        }
	    }
	    else {
	        $scope.checkElem.text = "All";
	        for (var i = 0; i < $scope.repoList.length; i++) {
	            if ($scope.repoList[i].isChecked == true) {
	                $scope.repoList[i].isHide = false;
	            }
	            else {
	                $scope.repoList[i].isHide = true;
	            }
	        }
	    }
	};
    // End-- check/Uncheck List


	var filterVal;
	$scope.applyFilter = function () {
	    $scope.isApplyFilters = true;
	    $scope.showFilter = false;
	
		return filterVal;
	}
	$scope.resetFilter = function () {
	    $scope.isApplyFilters = false;
	   // $scope.showFilter = false;
	}

	

	$scope.lastPage = function () {
		history.go(-1);
	}
	$scope.sorts = [
  { 'name': 'Recent First' },
  { 'name': 'Oldest First' }
	];

   
	$scope.filterOptions = [{
		"code": "1",
		"name": "All"
	}, {
		"code": "2",
		"name": "Today"
	}, {
		"code": "3",
		"name": "Last 7 Days"
	}, {
		"code": "4",
		"name": "Last 30 Days"
	}, {
		"code": "5",
		"name": "Date Range"
	}];
	$scope.selectedFilter = { "code": "1", "name": "All" };
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
	
   
   
   

	/* SEARCH INTRACTION --start*/
	/* SEARCH INTRACTION */
	$scope.focusSearch = false;
	$scope.isActive = false;
	$scope.showMe = false;
	$scope.showSearch = function () {
		//$scope.mysearchHeight = { width: '1000px' };
		$scope.isActive = true;
		$scope.focusSearch = true;
		$scope.showMe = true;
		$scope.hideClose = true;
	}

	$scope.hideSearch = function () {
		//$scope.mysearchHeight = { width: '100%' };
		$scope.isActive = false;
		$scope.focusSearch = false;
		$scope.hideClose = false;
	}
	/* 
	  HEADER SEARCH INTRACTION
	  NEED TO CHANGE ITS WORKING
	*/


	//dynamic search width
	setTimeout(function () {
		var divsize = angular.element(document.getElementById('actionUlWidth')).prop('offsetWidth');
		var searchWidth = angular.element(document.getElementById('seachPosition')).prop('offsetWidth');
		var searchNewWidth = searchWidth + divsize - 100;
		angular.element(document.getElementById('seachPosition')).css({ 'right': divsize + 10 + 'px', 'width': searchNewWidth })
	});

	$scope.showSearchHeader = function () {
		//$scope.mysearchHeight = { width: '1000px' };
		this.isActiveHeader = true;
		this.focusSearchHeader = true;
		this.hideCloseHeader = true;
	}
	$scope.hideSearchHeader = function () {
		//$scope.mysearchHeight = { width: '100%' };
		this.isActiveHeader = false;
		this.focusSearchHeader = false;
		this.hideCloseHeader = false;
	}

	/* SEARCH INTRACTION --end*/

	


	$scope.applyStatusColor = function (ele) {
		switch (ele) {
			case 'Pending':
				return 'orange-text';
				break;
			case 'Failed':
				return 'red-text';
				break;
			case 'Delivered':
				return 'green-text';
				break;
			default:
				return 'grey-text';
		}
	};


	

	var orderBy = $filter('orderBy');
	//localization label - normal label, config labels
	$scope.labels = {
		orderLable: $translate.instant("ORDERS"),
		orderLineLable: $translate.instant("ORDER LINE"),
		allAnyWordsLable: $translate.instant("All Words") + "," + " " + $translate.instant("Any Words"),
		deleteLable: $translate.instant("Delete"),
		addLable: $translate.instant("AND"),
		draftLable: $translate.instant("Draft"),
		selectActionLable: $translate.instant("Select Action"),
		disAccuralLable: $translate.instant("Disable Accural"),
		enaAccuralLable: $translate.instant("Enable Accural"),
		closeOrderLable: $translate.instant("Close Order"),
		reOpenOrderLable: $translate.instant("Re-Open Order"),
		okLable: $translate.instant("OK"),
		byConditionLable: $translate.instant("BY CONDITION"),
		byValueLable: $translate.instant("Document Type"),
		ascendingLable: $translate.instant("Ascending"),
		descendingLable: $translate.instant("Descending"),
		notSetLable: $translate.instant("Not set"),
		equalsLable: $translate.instant("Equals"),
		doesNotEqualsLable: $translate.instant("Does not equals"),
		beginsWithLable: $translate.instant("Begins with"),
		endsWithLable: $translate.instant("Ends with"),
		orLable: $translate.instant("OR")
	};

	$scope.applyBtnConfig = { title: $translate.instant("APPLY") };
	$scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };
	$scope.getDataBtnConfig = { title: $translate.instant("APPLY") };
	$scope.doneBtnConfig = { title: $translate.instant("DONE") };

	//order grid Data
	$scope.emailLogData = [
		{
			status: 'Delivered',
			type: 'RFX',
			name: 'Document Name',
			RecipientType : 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		},

		{
			status: 'Pending',
			type: 'Auction',
			name: 'Document Name',
			RecipientType: 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		},

		{
			status: 'Delivered',
			type: 'Contract',
			name: 'Document Name',
			RecipientType: 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		},
		{
			status: 'Delivered',
			type: 'Invoice',
			name: 'Document Name',
			RecipientType: 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		},
		{
			status: 'Pending',
			type: 'RFX',
			name: 'Document Name',
			RecipientType : 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		},
		{
			status: 'Pending',
			type: 'Auction',
			name: 'Document Name',
			RecipientType: 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		},
		{
			status: 'Delivered',
			type: 'Contract',
			name: 'Document Name',
			RecipientType: 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		},
		{
			status: 'Failed',
			type: 'Invoice',
			name: 'Document Name',
			RecipientType: 'Buyer',
			RecipientCompany: 'GEP - saving is believing',
			RecipientName: 'BuyerPartner1 test',
			emailId: 'BuyerPartner1@gep.com',
			emailName: 'Co-Author 2705 published',
			dateTime: '5/28/2015 12:49:53 AM'
		}
	];
	//table column -- sorting 

	//table column -- sorting 
	$scope.order = function (predicate) {
		$scope.predicate = predicate;
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.sortIcon = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.emailLogData = orderBy($scope.emailLogData, predicate, $scope.reverse, $scope.sortIcon);
	};
	$scope.order('partner', true);

	//footer panel action
	$scope.exportActions = [
			{ 'key': 'selectAction', 'lable': $scope.labels.selectActionLable },
			{ 'key': 'disableAccural', 'lable': $scope.labels.disAccuralLable },
			{ 'key': 'enableAccural', 'lable': $scope.labels.enaAccuralLable },
			{ 'key': 'closeOrder', 'lable': $scope.labels.closeOrderLable },
			{ 'key': 'reOpenOrder', 'lable': $scope.labels.reOpenOrderLable }
	];

	$scope.reOpenOrderdv = false;
	$scope.closeOrder = false;
	$scope.disableAccural = false;

	$scope.selectedAction = $scope.labels.selectActionLable;
	$scope.selectedLink = function (obj) {
		$scope.selectedAction = obj.lable;
		if (obj.key == 'reOpenOrder') {
			$scope.disableAccural = false;
			$scope.closeOrder = false;
			$scope.reOpenOrderdv = true;
		}
		else if (obj.key == 'closeOrder') {
			$scope.reOpenOrderdv = false;
			$scope.disableAccural = false;
			$scope.closeOrder = true;
		}
		else if (obj.key == 'disableAccural') {
			$scope.reOpenOrderdv = false;
			$scope.closeOrder = false;
			$scope.disableAccural = true;
		}
		else {
			$scope.reOpenOrderdv = false;
			$scope.closeOrder = false;
			$scope.disableAccural = false;
		}
	}


	//popup -- save filter
	$scope.saveFilterPopupUrl = "shared/popup/views/popupSaveFilter.html";
	$scope.saveFilterPopUp = false;
	$scope.saveFilterPopupCallback = function (e) {
		$scope.saveFilterPopUp = true;

	};
	$scope.saveFilterPopupHideCallback = function () {
		$scope.saveFilterPopUp = false;
	};

	$scope.newfilter = { 'name': '' }


	//popup -- save filter -- trigger success message
	$scope.saveFilter = function (e) {
		var confi = {
			type: "success",
			message: "<p class='left-align'>Your filters are saved successfully.</p>",
			buttons: [
				{
					"title": $scope.labels.okLable,
					"result": "ok"
				}
			]
		};

		var newFilter = { 'lable': $scope.newfilter.name };
		$scope.filterList.push(newFilter);

		//Notification call
		notification.notify(confi);
	};


	//popupover -- manage filter
	$scope.filterList = [
		   { 'lable': 'Filter 1' },
		   { 'lable': 'Filter 2' },
		   { 'lable': 'Filter 3' },
		   { 'lable': 'Filter 4' },
		   { 'lable': 'Filter 5' }

	];

	$scope.showEditor = false;
	$scope.editCurrentViewName = function (index) {
		$scope.filterList[index].showCurrentItemEditor = true;
	}

	$scope.getEditedviewName = { "lable": "" };

	$scope.updateViewName = function (index) {
		$scope.filterList[index].lable = $scope.getEditedviewName.lable;
		$scope.filterList[index].showCurrentItemEditor = false;
	};

	$scope.closeEditPanel = function (index) {
		$scope.filterList[index].showCurrentItemEditor = false;
	};

	$scope.deleteItem = function (index) {
		$scope.filterList.splice(index, 1);
	};


	//tabs -- order grid
	$scope.filtertabsData = [ {
		"title": $scope.labels.byValueLable,
		"contentUrl": "byValue.html",
		"active": true
	}];

	$scope.advanceDateTypeOptions = [{
	    'title': 'Date Range',
        'code':'dr'
	}, {
	    'title': 'Period',
	    'code': 'p'
	}];
	$scope.advanceDateType = $scope.advanceDateTypeOptions[0];
	$scope.onChangeadvanceDateType = function (type) {
	    $scope.advanceDateType = type;
	}
	$scope.startDate = '';
	$scope.endDate = '';
	$scope.nextDayOptions = [{
        'title':'30'
	}, {
	    'title': '60'
	}, {
	    'title': '90'
	}];
	$scope.nextDays = $scope.nextDayOptions[0];
	$scope.advancestartDate = new Date().getTime();
	$scope.advanceendDate = '';

	//tabs -- order grid - ascending/descending
	$scope.orderType = [{ 'title': $scope.labels.ascendingLable }, { 'title': $scope.labels.descendingLable }];
	$scope.selectedOrderType = { 'title': $scope.labels.ascendingLable };

	//data for delivery status
	$scope.ascfilterListForAll = { 'lable': 'All', 'selected': false };
	$scope.delStatusAscfilterLists = [{ 'lable': 'Delivered', 'selected': false }, { 'lable': 'Failed', 'selected': false }, { 'lable': 'Pending', 'selected': false }];
	$scope.delStatusDescfilterLists = [{ 'lable': 'Pending', 'selected': false }, { 'lable': 'Failed', 'selected': false }, { 'lable': 'Delivered', 'selected': false }];
	$scope.selectedAll1 = false;
	$scope.checkAllBox = function (aug, elm) {
		var checkdata = $scope.delStatusAscfilterLists
		if (!elm) {
			var checkdata = $scope.delStatusDescfilterLists
		}
		angular.forEach(checkdata, function (element, key) {
			checkdata[key].selected = aug;
		});
	};
	
	//data for document type 
	$scope.docTypeAscfilterLists = [{ 'lable': 'Auction', 'selected': false }, { 'lable': 'Contract', 'selected': false }, { 'lable': 'RFX', 'selected': false }, { 'lable': 'Invoice', 'selected': false }];
	$scope.docTypeDescfilterLists = [{ 'lable': 'Invoice', 'selected': false }, { 'lable': 'RFX', 'selected': false }, { 'lable': 'Contract', 'selected': false }, { 'lable': 'Auction', 'selected': false }];
	$scope.selectedAll3 = false;
	$scope.checkAllBox = function (aug, elm) {
		var checkdata = $scope.docTypeAscfilterLists
		if (!elm) {
			var checkdata = $scope.docTypeDescfilterLists
		}
		angular.forEach(checkdata, function (element, key) {

			checkdata[key].selected = aug;
		});
	};
	
	//data for Recipient Type 
	$scope.recptTypeAscfilterLists = [{ 'lable': 'Buyer', 'selected': false }, { 'lable': 'Partner', 'selected': false }];
	$scope.recptTypDescfilterLists = [{ 'lable': 'Partner', 'selected': false }, { 'lable': 'Buyer', 'selected': false }];
	$scope.selectedAll2 = false;
	$scope.checkAllBox = function (aug, elm) {
		var checkdata = $scope.recptTypeAscfilterLists
		if (!elm) {
			var checkdata = $scope.recptTypDescfilterLists
		}
		angular.forEach(checkdata, function (element, key) {

			checkdata[key].selected = aug;
		});
	};
	

	$scope.showTab = false;
	$scope.onChangeFilter = function (selectedOrderType) {
		if (selectedOrderType.title == $scope.labels.ascendingLable) {
			$scope.showTab = !$scope.showTab;
		}
		else if (selectedOrderType.title == $scope.labels.descendingLable) {
			$scope.showTab = !$scope.showTab;
		}
	};


	//tabs -- order grid - by condition tab
	//$scope.operatorOptions = [{ "lable": $scope.labels.notSetLable }, { "lable": $scope.labels.equalsLable }, { "lable": $scope.labels.doesNotEqualsLable }, { "lable": $scope.labels.beginsWithLable }, { "lable": $scope.labels.endsWithLable }];
	//$scope.selectedOperator = { "lable": $scope.labels.equalsLable };
	//$scope.selectedOperatorNext = { "lable": $scope.labels.notSetLable };
	//$scope.showValuefrom = '1500001725';
	//$scope.showValueTo = '1500001725';

	//$scope.conditionType = [{ 'title': $scope.labels.addLable }, { 'title': $scope.labels.orLable }];
	//$scope.selectedcondnType = { 'title': $scope.labels.addLable };


	//manage column popup
	$scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
	$scope.manageColumnData = [
	{
		"name": "Order Attribute",
		"check": false,
		"value": [{ "name": "Order Name", "check": false, },
				  { "name": "Revision Number", "check": false },
				  { "name": "Signatory", "check": false },
				  { "name": "Order Type", "check": false },
				  { "name": "Order Number", "check": false },
				  { "name": "Revision Number", "check": false }
		]
	},
	{
		"name": "Line Attribute", "check": false, "value": [{ "name": "Order Name", "check": false, },
				{ "name": "Revision Number", "check": false },
				{ "name": "Signatory", "check": false },
				{ "name": "Order Type", "check": false },
				{ "name": "Order Number", "check": false },
				{ "name": "Revision Number", "check": false }
		]
	},
	{
		"name": "Status", "check": false, "value": [{ "name": "Order Name", "check": false, },
				{ "name": "Revision Number", "check": false },
				{ "name": "Signatory", "check": false },
				{ "name": "Order Type", "check": false },
				{ "name": "Order Number", "check": false },
				{ "name": "Revision Number", "check": false }
		]
	},
	{
		"name": "Dates", "check": false, "value": [{ "name": "Order Name", "check": false, },
				{ "name": "Revision Number", "check": false },
				{ "name": "Signatory", "check": false },
				{ "name": "Order Type", "check": false },
				{ "name": "Order Number", "check": false },
				{ "name": "Revision Number", "check": false }
		]
	}
	];
	$scope.manageColumnDatainitialDisplayText = 'Manage Column';

	$scope.emailLogScrollObj = {
		'hSource': 'emailLogTbl',
		'horizontal': 'emailLogTblHdrWrap'
	};

	//mass update -- grid filter
	$scope.dropDownPosition = function (e) {
		setTimeout(function () {
		    var ddCnt = angular.element(e.currentTarget).next('.dropdown-content');
			ddCnt.css({ 'left': e.clientX - e.offsetX - 2 + 'px', 'top': e.clientY - e.offsetY - 2 + 'px' });
			ddCnt.attr('style', function (i, s) { return s + 'display: block !important;' });
			var ddHgt = ddCnt.css('height'),
				winHgt = angular.element(window).height();
			if ((parseInt(ddHgt) + e.clientY) > winHgt) {
				var diffHgt = (parseInt(ddHgt) + e.clientY) - winHgt;
				ddCnt.css('top', (e.clientY - e.offsetY - diffHgt - 15) + 'px');
			}
		}, 500);
	};

	$scope.dropDownPositionRight = function (e) {
		setTimeout(function () {
			var ddCnt = angular.element(e.currentTarget).next('.dropdown-content');

			ddCnt.css({ 'left': e.clientX - e.offsetX - 400 + 'px', 'top': e.clientY - e.offsetY - 2 + 'px' });
			ddCnt.attr('style', function (i, s) { return s + 'display: block !important;' });
			var ddHgt = ddCnt.css('height'),
				winHgt = angular.element(window).height();
			if ((parseInt(ddHgt) + e.clientY) > winHgt) {
				var diffHgt = (parseInt(ddHgt) + e.clientY) - winHgt;
				ddCnt.css('top', (e.clientY - e.offsetY - diffHgt - 15) + 'px');
			}
		});
	};

	
}