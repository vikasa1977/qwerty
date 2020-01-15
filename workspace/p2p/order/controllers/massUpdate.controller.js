angular.module('SMART2')
	.controller('massUpdateCtrl', ['$scope', '$translate', '$rootScope', 'RuleEngine', '$http', '$filter', 'notification', massUpdateCtrlFunc])


function massUpdateCtrlFunc($scope, $translate, $rootScope, RuleEngine, $http, $filter, notification) {
    $rootScope.isPageWithoutImage = true;

    var orderBy = $filter('orderBy');

/* 
  HEADER SEARCH INTRACTION
  NEED TO CHANGE ITS WORKING
*/
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


    //localization label - normal label, config labels
    $scope.labels = {
        orderLable: $translate.instant("ORDERS"),
        orderLineLable: $translate.instant("ORDER LINES"),
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
        byValueLable: $translate.instant("BY VALUE"),
        ascendingLable: $translate.instant("Ascending"),
        descendingLable: $translate.instant("Descending"),
        notSetLable: $translate.instant("Select Operator"),
        equalsLable: $translate.instant("Equals"),
        doesNotEqualsLable: $translate.instant("Does not equals"),
        beginsWithLable: $translate.instant("Begins with"),
        endsWithLable: $translate.instant("Ends with"),
        orLable: $translate.instant("OR"),
    	titleName: $translate.instant("Order Type Type")
    };

    $scope.applyBtnConfig = { title: $translate.instant("APPLY") };
    $scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };
    $scope.getDataBtnConfig = { title: $translate.instant("Search") };
    $scope.doneBtnConfig = { title: $translate.instant("DONE") };
    

    //tabs
    $scope.masstabsData = [{
        "title": $scope.labels.orderLable,
        "contentUrl": "p2p/order/views/massTabOrders.html",
        "active": true
    }, {
        "title": $scope.labels.orderLineLable,
        "contentUrl": "p2p/order/views/massTabLines.html"
    }];

    


    //date defined
    $scope.date = 1457094173954;


    //order grid Data
    $scope.orderLists = [
        { type: 'New Order', number: '1500007146', name: 'Order 101012', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007147', name: 'Order 101013', partner: 'Dentsply', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007148', name: 'Order 101014', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007149', name: 'Order 101015', partner: 'Dentsply', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007146', name: 'Order 101012', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007147', name: 'Order 101013', partner: 'Dentsply', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007148', name: 'Order 101014', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007149', name: 'Order 101015', partner: 'Dentsply', partnerContract: 'John Doe', status: $scope.labels.draftLable },
        { type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable },
		{ type: 'New Order', number: '1500007150', name: 'Order 101016', partner: 'Maple Leaf', partnerContract: 'John Doe', status: $scope.labels.draftLable }
    ];

    //table column -- sorting 
    $scope.order = function (predicate) {
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.sortIcon = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.orderLists = orderBy($scope.orderLists, predicate, $scope.reverse, $scope.sortIcon);
    };
    $scope.order('partner', true);


    //footer panel action
    $scope.exportActions = [
            { 'key': 'selectAction', 'lable': $scope.labels.selectActionLable },
            { 'key': 'disableAccural', 'lable': $scope.labels.disAccuralLable},
            { 'key': 'enableAccural', 'lable': $scope.labels.enaAccuralLable},
            { 'key': 'closeOrder', 'lable': $scope.labels.closeOrderLable},
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

    // popup for saved view for ordertab

 $scope.popupApi = {
            UpdateSavedViewURL:"",
            viewNameLength: 255,
            savedViewBar: false,
            duplicateErrorMessage: {
                type: "inform",
                message: $translate.instant("duplicate view name"),
                //"A view with the same name already exists. You must enter a different name.",
                buttons: [{
                    "title": "OK",
                    "result": "true"
                }]
            },
            maxCharacterLength: {
                type: "inform",
                message: $translate.instant("CharacterValidation"),
                //"The name must not exceed 255 characters.",
                buttons: [{
                    "title": "OK",
                    "result": "true"
                }]
            },
            selectedSavedview: $scope.selectedSavedview,

            //default view, this needs to be revisited.
            currentViewApplied: {
                'isDefault': false,
                'showCurrentItemEditor': false,
                'IsSystemDefault': true,
                'SortColumn': "NeedByDate",
                'SortOrder': "Ascending",
                'ColumnList': ""
            },
            applyViewOnGrid: function(){}
        };


      $scope.savedViewPopUp = false;
    $scope.showSavedViewList = true;
    $scope.savedViewPopupCallback = function (e) {
        $scope.savedViewPopUp = true;
        $scope.showSavedViewList = true;
    };
    $scope.savedViewPopupHideCallback = function () {
        $scope.savedViewPopUp = false;
 
    };
    $scope.saveViewPopupCallback = function (e) {
        $scope.savedViewPopUp = true;
        $scope.showSavedViewList = false;
    };
    $scope.selectedSavedview = { 'name': 'Requisitions pending since 10 days', 'isDefault': true };
    $scope.getSavedViewsList = [
        { 'name': 'Requisitions pending since 10 days', 'isDefault': true, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions exceeding USD 1000.00', 'isDefault': false, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions for IT/Telecom', 'isDefault': false, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions for Office Supplies less than USD 100.00', 'isDefault': false, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions overdue', 'isDefault': false, 'showCurrentItemEditor': false }
    ];

    $scope.saveViewParameter = {
    'isApplyFilters' : false,
    'isSavedView' : false,
    'isSavedViewModified' : false    
        };
    $scope.closePopover = function () {
        angular.element(document).triggerHandler('click');
    };
    
    $scope.applyFilter = function (checkSavedView) {
        if (checkSavedView == true) {
            $scope.saveViewParameter.isSavedViewModified = true;

        } else {
            $scope.saveViewParameter.isApplyFilters = true;
        }
        angular.element(document).triggerHandler('click');
    }

    $scope.saveOnCurrentFilter = function(){
            var confi = { 
                    "confirmation":
                    {
                    type: "confirm",
                    message: "<p class='left-align'>Do you want to override the changes to existing view ?</p>",

                    buttons: [
                        {
                            "title": "YES",
                            "result": "yes"
                        },
                        {
                            "title": "NO",
                            "result": "no"
                        }
                    ]
                },
                "success":
                    {
                    type: "success",
                    message: "<p class='left-align'>Changes have been saved to the current view</p>",

                    buttons: [
                        {
                            "title": "Ok",
                            "result": "ok"
                        }
                    ]
                },
                "inform":{
                    type: "inform",
                    message: "<p class='left-align'>No: Changes have not been saved. </p>",

                    buttons: [
                        {
                            "title": "Ok",
                            "result": "ok"
                        }
                    ]
                }
                };

                //Notification call
                notification.notify(confi.confirmation, function (responce) {
                    if (responce.result == "yes") {
                         $scope.saveViewParameter.isSavedViewModified = false;    
                         notification.notify(confi.success, function(responce){});
                    } else {
                       $scope.saveViewParameter.isSavedViewModified = false;    
                         notification.notify(confi.inform, function(responce){});
                    }
                });


         

    };

   // popup for saved view for orderLine
 $scope.popupApiForLine = {
          
            viewNameLength: 255,
            savedViewBar: false,
            duplicateErrorMessage: {
                type: "inform",
                message: $translate.instant("duplicate view name"),
                //"A view with the same name already exists. You must enter a different name.",
                buttons: [{
                    "title": "OK",
                    "result": "true"
                }]
            },
            maxCharacterLength: {
                type: "inform",
                message: $translate.instant("CharacterValidation"),
                //"The name must not exceed 255 characters.",
                buttons: [{
                    "title": "OK",
                    "result": "true"
                }]
            },
            selectedSavedview: $scope.selectedSavedview,

            //default view, this needs to be revisited.
            currentViewApplied: {
                'isDefault': false,
                'showCurrentItemEditor': false,
                'IsSystemDefault': true,
                'SortColumn': "NeedByDate",
                'SortOrder': "Ascending",
                'ColumnList': ""
            },
            applyViewOnGrid: function(){}
        };


     $scope.savedViewPopUpForLine = false;
    $scope.showSavedViewListForLine = true;
    $scope.savedViewPopUpOpenForLine = function (e) {
        $scope.savedViewPopUpForLine = true;
        $scope.showSavedViewListForLine = true;
    };
    $scope.savedViewPopupHideCallbackForLine = function () {
        $scope.savedViewPopUpForLine = false;
 
    };
    $scope.saveViewPopupCallbackForLine = function (e) {
        $scope.savedViewPopUpForLine = true;
        $scope.showSavedViewListForLine = false;
    };


 $scope.savedViewPopupCallback = function (e) {
        $scope.savedViewPopUp = true;
        $scope.showSavedViewList = true;
    };
    $scope.savedViewPopupHideCallback = function () {
        $scope.savedViewPopUp = false;
 
    };
    $scope.saveViewPopupCallback = function (e) {
        $scope.savedViewPopUp = true;
        $scope.showSavedViewList = false;
    };



    $scope.selectedSavedviewForLine = { 'name': 'Requisitions pending since 10 days', 'isDefault': true };
    $scope.getSavedViewsListForLine = [
        { 'name': 'Requisitions pending since 10 days', 'isDefault': true, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions exceeding USD 1000.00', 'isDefault': false, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions for IT/Telecom', 'isDefault': false, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions for Office Supplies less than USD 100.00', 'isDefault': false, 'showCurrentItemEditor': false },
        { 'name': 'Requisitions overdue', 'isDefault': false, 'showCurrentItemEditor': false }
    ];

    $scope.forLine = {
    'isApplyFilters' : false,
    'isSavedView' : false,
    'isSavedViewModified' : false        }


     $scope.applyFilterLine = function (checkSavedView) {
        if (checkSavedView == true) {
            $scope.forLine.isSavedViewModified = true;

        } else {
            $scope.forLine.isApplyFilters = true;
        }
        angular.element(document).triggerHandler('click');
    }

  $scope.saveOnCurrentlineFilter = function(){
            var confi = { 
                    "confirmation":
                    {
                    type: "confirm",
                    message: "<p class='left-align'>Do you want save current change in same filter?</p>",

                    buttons: [
                        {
                            "title": "YES",
                            "result": "yes"
                        },
                        {
                            "title": "NO",
                            "result": "no"
                        }
                    ]
                },
                "success":
                    {
                    type: "success",
                    message: "<p class='left-align'>Changes Saved Successfully.</p>",

                    buttons: [
                        {
                            "title": "Ok",
                            "result": "ok"
                        }
                    ]
                },
                "information":{
                    type: "inform",
                    message: "<p class='left-align'>Your changes removed successfully.</p>",

                    buttons: [
                        {
                            "title": "Ok",
                            "result": "ok"
                        }
                    ]
                }
                };

                //Notification call
                notification.notify(confi.confirmation, function (responce) {
                    if (responce.result == "yes") {
                         $scope.forLine.isSavedViewModified = false;    
                         notification.notify(confi.success, function(responce){});
                    } else {
                       $scope.forLine.isSavedViewModified = false;    
                         notification.notify(confi.inform, function(responce){});
                    }
                });


         

    };



    //popupover -- manage filter
    $scope.filterList = [
           { 'label': 'Filter 1' },
           { 'label': 'Filter 2' },
           { 'label': 'Filter 3' },
           { 'label': 'Filter 4' },
           { 'label': 'Filter 5' }
           
    ];
    
    $scope.showEditor = false;
    $scope.editCurrentViewName = function (index) {
        $scope.filterList[index].showCurrentItemEditor = true;
    }

    $scope.getEditedviewName = { "label": "" };

    $scope.updateViewName = function (index) {
        $scope.filterList[index].label = $scope.getEditedviewName.label;
        $scope.filterList[index].showCurrentItemEditor = false;
    };

    $scope.closeEditPanel = function (index) {
        $scope.filterList[index].showCurrentItemEditor = false;
    };

    $scope.deleteItem = function (index) {
        $scope.filterList.splice(index, 1);
    };


    //tabs -- order grid
    $scope.filtertabsData = [{
        "title": $scope.labels.byConditionLable,
        "contentUrl": "byCondition.html",
        "active": true
    }, {
        "title": $scope.labels.byValueLable,
        "contentUrl": "byValue.html"
    }];

    $scope.tableHeaderLines = [{ name: 'Order Type', headerfor: 'type' }, { name: 'Order Number' , headerfor: 'number'  }, { name: 'Order Name' , headerfor: 'name' }, { name: 'Supplier' , headerfor: 'partner' }, { name: 'Supplier Contract', headerfor: 'partnerContract' }, { name: 'Order Status', headerfor: 'status' }];
    $scope.tableHeaderOrder = [{ name: 'Order Type', headerfor: 'type' }, { name: 'Order Number' , headerfor: 'number'  }, { name: 'Order Name' , headerfor: 'name' }, { name: 'Supplier' , headerfor: 'partner' }, { name: 'Supplier Contract', headerfor: 'partnerContract' }, { name: 'Order Status', headerfor: 'status' }];

    //select All
    $scope.selectedAll = false, $scope.fillpartial = false, $scope.isVisible = false;
    $scope.checkAll = function (aug) {
        if (!$scope.ishidden) {
            $scope.ishidden = true;
        }
        angular.forEach($scope.orderLists, function (orderList, key) {
            $scope.orderLists[key].selected = aug;
        });
        if (aug === true) {
            $scope.isVisible = true;
            $scope.fillpartial = false;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
        }
    };
    $scope.onChange = function (obj) {
        if (!$scope.ishidden) {
            $scope.ishidden = true;
        }
        //debugger;
        if (isAtleastOneSelected($scope.orderLists)) {
            $scope.isVisible = true;
            $scope.fillpartial = true;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
            $scope.selectedAll = false;
        }
        if (isAllSelected($scope.orderLists)) {
            $scope.fillpartial = false;
            $scope.selectedAll = true;
        }
    }
    function isAtleastOneSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                return true;
            }
        }
        return false;
    }
    function isAllSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].selected) {
                return false;
            }
        }
        return true;
    }

    //tabs -- order grid - ascending/descending
    $scope.orderType = [{ 'title': $scope.labels.ascendingLable }, { 'title': $scope.labels.descendingLable }];
    $scope.selectedOrderType = { 'title': $scope.labels.ascendingLable };

    $scope.ascfilterListForAll = { 'lable': 'All', 'selected': false };
    $scope.ascfilterLists = [{ 'lable': 'Select Order', 'selected': false }, { 'lable': 'Select Order One', 'selected': false }, { 'lable': 'Select Order Two', 'selected': false }, { 'lable': 'Select Order Three', 'selected': false }];
    $scope.descfilterLists = [{ 'lable': 'Order One' }, { 'lable': 'Order Two' }, { 'lable': 'Order Three' }, { 'lable': 'Order Four' }];

    $scope.selectedAll1 = false;
    $scope.checkAllBox = function (aug, elm) {
        var checkdata = $scope.ascfilterLists
        if(!elm){
            var checkdata = $scope.descfilterLists
        }
        angular.forEach(checkdata, function (element, key) {

            checkdata[key].selected = aug;
        });
    };


    $scope.showTab = true;
    $scope.onChangeFilter = function (selectedOrderType) {
        if (selectedOrderType.title == $scope.labels.ascendingLable) {
            $scope.showTab = !$scope.showTab;
        }
        else if (selectedOrderType.title == $scope.labels.descendingLable) {
            $scope.showTab = !$scope.showTab;
        }
    };
  

    //tabs -- order grid - by condition tab
    $scope.operatorOptions = [{ "label": $scope.labels.notSetLable }, { "label": $scope.labels.equalsLable }, { "label": $scope.labels.doesNotEqualsLable }, { "label": $scope.labels.beginsWithLable }, { "label": $scope.labels.endsWithLable }];
    $scope.selectedOperator = { "label": $scope.labels.equalsLable };
    $scope.selectedOperatorNext = { "label": $scope.labels.notSetLable };
    $scope.showValuefrom = 1500001725;
    $scope.showValueTo = 1500001725;

    $scope.conditionType = [{ 'title': $scope.labels.addLable }, { 'title': $scope.labels.orLable }];
    $scope.selectedcondnType = { 'title': $scope.labels.addLable };


    //manage column popup
    $scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
    $scope.manageColumnData = [
    {
        "name": "Order Attributes",
        "check": false,
        "value": [{ "name": "Order Name", "check": false, },
                  { "name": "Revision Number", "check": false },
                  { "name": "Signatory", "check": false },
                  { "name": "Order Type", "check": false },
                  { "name": "Order Number", "check": false },
                  { "name": "Revision Number", "check": false },
                  { "name": "Order Name", "check": false, },
                  { "name": "Revision Number", "check": false },
                  { "name": "Signatory", "check": false },
                  { "name": "Order Type", "check": false },
                  { "name": "Order Number", "check": false },
                  { "name": "Revision Number", "check": false },
                  { "name": "Order Name", "check": false, },
                  { "name": "Revision Number", "check": false },
                  { "name": "Signatory", "check": false },
                  { "name": "Order Type", "check": false },
                  { "name": "Order Number", "check": false },
                  { "name": "Revision Number", "check": false }
        ]},
    {
        "name": "Line Attributes", "check": false, "value": [{ "name": "Order Name", "check": false, },
				{ "name": "Revision Number", "check": false },
				{ "name": "Signatory", "check": false },
				{ "name": "Order Type", "check": false },
				{ "name": "Order Number", "check": false },
				{ "name": "Revision Number", "check": false }
        ]
    }
    ];
    $scope.manageColumnDatainitialDisplayText = 'Manage Column';

    //mass update -- grid filter
  /*  $scope.dropDownPosition = function (e) {
        setTimeout(function () {
        	var ddCnt = angular.element(e.currentTarget).next('.dropdown-content');

        	ddCnt.css({ 'left': e.clientX - e.offsetX - 2 + 'px', 'top': e.clientY - e.offsetY - 2 + 'px' });
         //   ddCnt.attr('style', function (i, s) { return s + 'display: block !important;' });
            var ddHgt = ddCnt.css('height'),
				winHgt = angular.element(window).height(),
            	winWidth = angular.element(window).width();
				
            if ((parseInt(ddHgt) + e.clientY) > winHgt) {
                var diffHgt = (parseInt(ddHgt) + e.clientY) - winHgt;
                ddCnt.css('top', (e.clientY - e.offsetY - diffHgt - 15) + 'px');
            }

            
			// If the popover goes beyond screen width starts //
            if ((ddCnt.prop('offsetLeft') + ddCnt.width()) > winWidth) {
            	ddCnt.css({ 'left': e.clientX - e.offsetX - 400 + 'px'});
            }
        	// If the popover goes beyond screen width ends //
        });
    };
*/
$scope.dropDownConfig = {
    inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      belowOrigin: false, 
   
}




    //mass update -- grid filter -- by  value search 
    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;

    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    };

    $scope.treeSearchModel = "";

    $scope.orderSortArray = {
        orderSortType : "",
        orderSortReverse : false
    };
    $scope.LineSortArray = {
        orderSortType:"",
        orderSortReverse : false
    };


}