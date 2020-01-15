angular.module('SMART2')

    .controller('workbenchCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', workbenchCtrlFunc])

.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
          '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
})
//.directive('wjInsertSmartCheckbox', function() {
//	return {
//		restrict: 'EA',
//		replace: false,
//		link: function (scope, element) {
//			setTimeout(function(){
//				var filterClickElement = angular.element(element.find(".wj-elem-filter"));
//				for (var i = 0; i < filterClickElement.length; i++) {
//					console.log("test : ", filterClickElement[i]);
//					$(filterClickElement[i]).click(function(){
//						//			alert("filterClickElement[i]");
//						setTimeout(function () {
//							angular.element(".wj-listbox-item input[type='checkbox']").after("<span></sapn>")
//						}, 2000);
//					});
//				}
//			},2000);
//		}
//	}
//})
.directive('gridModalDialog', function () {
	return {
		restrict: 'E',
		scope: {
			show: '=',
			coltype: "=",
			filterops: "=",
			sorting: "=",
			left: "=",
			top: "=",
			colfilter: "=",
			colindex: "=",
			options:"="
		},
		replace: true,
		transclude: true,
		link: function (scope, element, attrs, controllers) {

			scope.hideModal = function () {
				scope.show = false;
			};
			//angular.element('.grid-modal-link').on(
			//	"click",
			//	function () {
			//		scope.top = this.getBoundingClientRect().top + "px";
			//		scope.left = this.getBoundingClientRect().left + "px";
			//		console.log(scope.options.columnDefs[scope.colindex].field);
			//	});
			scope.filterTitle = attrs.title;
			scope.lineSortOptions = [{"name": "Ascending"},{"name": "Descending"}];
			scope.selectedLineSort = { "name": "Ascending" };
			scope.lineTabFilterDataset = [
				{ "title": "Filter by Values", "contentUrl": "workbench/views/lineFilterByValuesTab.html", "active": true },
				{ "title": "Filter by Conditions", "contentUrl": "workbench/views/lineFilterByConditionsTab.html" }
			];
			
			
			scope.columnField = scope.options.columnDefs[scope.colindex].field;
			scope.filterTypeOptions = [
					{ "title": "Text Contains", "type": "txt1" },
					{ "title": "Text Does Not Contain", "type": "txt2" },
					{ "title": "Text Starts with", "type": "txt3" },
					{ "title": "Text Ends with", "type": "txt4" },
					{ "title": "Text is exactly", "type": "txt5" }
				];			
			if (scope.coltype == "text") {
				scope.filterTypeOptions = [
					{ "title": "Text Contains", "type": "txt1" },
					{ "title": "Text Does Not Contain", "type": "txt2" },
					{ "title": "Text Starts with", "type": "txt3" },
					{ "title": "Text Ends with", "type": "txt4" },
					{ "title": "Text is exactly", "type": "txt5" }
				];				
			}
			if (scope.coltype == "number") {
				scope.filterTypeOptions = [
					{ "title": "Is Equal To", "type": "num1" },
					{ "title": "Is Less Than", "type": "num2" },
					{ "title": "Is Greater Than", "type": "num3" },
					{ "title": "Text Ends with", "type": "num4" },
					{ "title": "Is In Between", "type": "num5" }
				];			
			}
			if (scope.coltype == "date") {
				scope.filterTypeOptions = [
					{ "title": "Equals", "type": "date1" },
					{ "title": "After", "type": "date2" },
					{ "title": "Before", "type": "date3" },
					{ "title": "Between", "type": "date4" }
					
				];				
			}
			scope.selectedFilterType = scope.filterTypeOptions[0];
			scope.isActive = false;
			scope.showMe = false;
			scope.hideClose = false;
			scope.showSearch = function () {
				scope.isActive = true;
				scope.showMe = true;
				scope.hideClose = true;
			};

			scope.hideSearch = function () {
				scope.isActive = false;
				scope.hideClose = false;

			};
			
		},
		templateUrl: 'workbench/views/lineFilterModalDialog.html'
	};
});
function workbenchCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce) {
	
    $scope.mode = $state.params.doctype;

    $scope.titleWorkbench = "REQUISITION WORKBENCH"

    if ($scope.mode == 'receiving' || $scope.mode == 'receiptBuilder') {
        $scope.sectionLabel = 'RECEIPT BASIC DETAILS';
    }
    else {
        $scope.sectionLabel = 'PO BASIC DETAILS';
    }

    if ($scope.mode == 'receiving' || $scope.mode == 'receiptBuilder') {
        $scope.titleWorkbench = "RECEIVING WORKBENCH"
    }
    else if ($scope.mode == 'req') {
        $scope.titleWorkbench = "REQUISITION WORKBENCH"
    }

	$scope.toggleModal = function (index, event) {
		
		for (var i = 0; i < $scope.gridOptionsUserInfo.columnDefs.length; i++) {
			$scope.gridOptionsUserInfo.columnDefs[i].modalShown = false;
		}
		$scope.gridOptionsUserInfo.columnDefs[index].modalShown = !$scope.gridOptionsUserInfo.columnDefs[index].modalShown;		
		$scope.gridOptionsUserInfo.columnDefs[index].top = event.currentTarget.getBoundingClientRect().top + "px";
		$scope.gridOptionsUserInfo.columnDefs[index].left = event.currentTarget.getBoundingClientRect().left + "px";
		if (window.innerWidth < (event.currentTarget.getBoundingClientRect().left + 500)) {
			var leftVal = (event.currentTarget.getBoundingClientRect().left + 500) - window.innerWidth;
			$scope.gridOptionsUserInfo.columnDefs[index].left = (event.currentTarget.getBoundingClientRect().left - leftVal) + "px";

		}
	};
	$scope.isActive = false;
	$scope.showMe = false;
	$scope.hideClose = false;
	$scope.showSearch = function () {
		$scope.isActive = true;
		$scope.showMe = true;
		$scope.hideClose = true;
	};

	$scope.hideSearch = function () {
		$scope.isActive = false;
		$scope.hideClose = false;

	};
	$scope.showAllCheckbox = false;
    
	if ($scope.mode == 'receiving' || $scope.mode == 'receiptBuilder') {
	    var dataForAttr = [
                 { "title": "Receipt Number", "value": true },
                 { "title": "Purchase Type", "value": true },
                 { "title": "Item Number", "value": true },
                 { "title": "Item Line Number", "value": true },
                 { "title": "Description", "value": true },
                 { "title": "Item Category", "value": true },
                 { "title": "Requester", "value": true },
                 { "title": "Buyer", "value": true },
                 { "title": "Business Unit", "value": true },
                 { "title": "Gl Code", "value": true },
                 { "title": "Ship to Location", "value": true },
                 { "title": "Supplier Name", "value": true },
                 { "title": "Supplier Code", "value": true },
                 { 
                     "title": "Need by Date", 
                     "value": true,
                     "cellTemplate": "<a ui-sref='mdm.itemDetails'></a>"  
                    },
                 { "title": "Requested Date", "value": true },
                 { "title": "Start Date", "value": true },
                 { "title": "End Date", "value": true },
                 { "title": "Efforts", "value": true },
                 { "title": "Quantity", "value": true },
                 { "title": "UOM", "value": true },
                 { "title": "Value", "value": true },
                 { "title": "Receipt Status", "value": true },
                 { "title": "Receipt Age", "value": true },
                 { "title": "Catalog Description", "value": true }
	    ];
	}
	else {
	    var dataForAttr = [
                { "title": "Requisition Number", "value": true },
                { "title": "Purchase Type", "value": true },
                { "title": "Item Number", "value": true },
                { "title": "Item Line Number", "value": true },
                { "title": "Description", "value": true },
                { "title": "Item Category", "value": true },
                { "title": "Requester", "value": true },
                { "title": "Buyer", "value": true },
                { "title": "Business Unit", "value": true },
                { "title": "Gl Code", "value": true },
                { "title": "Ship to Location", "value": true },
                { "title": "Supplier Name", "value": true },
                { "title": "Supplier Code", "value": true },
                { 
                    "title": "Need by Date", 
                    "value": true,
                    "cellTemplate": "<a ui-sref='mdm.itemDetails'> Yes </a>"  
                   },
                { "title": "Requested Date", "value": true },
                { "title": "Start Date", "value": true },
                { "title": "End Date", "value": true },
                { "title": "Efforts", "value": true },
                { "title": "Quantity", "value": true },
                { "title": "UOM", "value": true },
                { "title": "Value", "value": true },
                { "title": "Requisition Status", "value": true },
                { "title": "Requisition Age", "value": true },
                { "title": "Catalog Description", "value": true }
	    ];
	}

    $scope.attributes = dataForAttr;

    $scope.getDataBtnConfig = { title: $translate.instant("GET DATA") };

    $scope.dataFilterRange = { 'from': '1457094173954', 'to': '1457094173954' }
    var count = 0;

    //accounting details -- manage columns
    $scope.manageColumns = function () {
        $scope.accfields = [];
        $scope.accfields = [
        { 'lable': 'Requested Date' },
        { 'lable': 'Shipping Method' },
        { 'lable': 'Procurement Option' },
        { 'lable': 'Inventory Type' },
        { 'lable': 'Matching' },
        { 'lable': 'Supplier Code' },
        { 'lable': 'Supplier Contact' },
        { 'lable': 'Manufacturer Name' },
        { 'lable': 'Manufacturer P...' },
        { 'lable': 'Contract Name' },
        { 'lable': 'Contract Expiry Date' },
        { 'lable': 'Contract Value' },
        { 'lable': 'Payment Terms' },
        ];

        $scope.noOfCol = parseInt(Math.round($scope.fields.length / 5));
        $scope.colWidth = 200;
        $scope.listHolderWidth = { 'width': $scope.noOfCol * $scope.colWidth + "px" }
        $scope.startVal = 0;


        $scope.getStartFrom = function () {
            $scope.startVal += 1;
        };

        $scope.cloneDiv = function (n) {
            return new Array(n);
        };

        $scope.itemsLimit = 5;
        $scope.itemsColumnized = function (myIndex) {
            var currentPageIndex = myIndex * $scope.itemsLimit;
            return $scope.fields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };
    };

    if ($scope.mode == 'receiving' || $scope.mode == 'receiptBuilder') {
        $scope.exportActions = [

           { 'name': 'ASSIGN', 'key': 'assign' },
           { 'name': 'CREATE RECEIPT', 'key': 'create_recp' },
           { 'name': 'ADD TO RECEIPT BUILDER', 'key': 'create_recp_bulder' },
          ];
        $scope.exportActionSelected = { 'name': 'CREATE RECEIPT', 'key': 'create_recp' }
    }
    else {
        $scope.exportActions = [

           { 'name': 'ASSIGN', 'key': 'assign' },
           { 'name': 'CREATE RFX', 'key': 'create_rfx' },
           { 'name': 'CREATE PO', 'key': 'create_po' },
           { 'name': 'ADD TO BUILDER', 'key': 'create_po_bulder' },
           { 'name': 'ADD TO PO', 'key': 'add_to_po' },

        ];
        $scope.exportActionSelected = { 'name': 'CREATE PO', 'key': 'create_po' }
    }

    $scope.getCurrentSelected = function(e, getkey){
        switch(getkey){
            case 'assign':
                return  $scope.popupOnBehalfOf = true
                break;
            
            case 'create_rfx':
                return  $state.go('sourcing.rfx.new');
                break;
            case 'create_po':
                return $scope.confirmSupplier();
                break;
            case 'add_to_po':
                return $scope.selectPOCall();
                break;
            case 'create_recp':
                return $state.go('p2p.receipt.new');
                break;
            case 'create_recp_bulder':
                return $scope.createRecpBuilder();
                break;

        }

    }

    $scope.createRecpBuilder = function () {
        var config = {
            type: "success",
            message: "5 item added successfully",
            buttons:
				[
				    { "title": "OK", "result": "ok" },

				]
        }
        notification.notify(config, function (response) {
            if (response.result == 'ok') {
                Materialize.toast('Item added successfully', 2000);
            }

        });
    }

     $scope.poConfirmation = function () {
        var config = {
            type: "success",
            message: "<div class='left-align'>5 item added successfully in <a target='_blank' href='#/p2p/order/new' class='marginLeft5 modal-close'>PO.001</a></div>",
            buttons:
				[
				    { "title": "OK", "result": "ok" },
				   
				]
        }
        notification.notify(config, function (response) {
            if (response.result == 'ok') {
                Materialize.toast('Item added successfully', 2000);
            }
            
        });
     }
     $scope.selectPODone = function () {
         $scope.poConfirmation();
     }
    $scope.confirmSupplier = function () {
        var config = {
                type: "confirm",
                message: "<div class='left-align'>Purchase Order will be created with default supplier <strong>Acme Inc</strong></div>",
                buttons:
                    [
					    { "title": "CONTINUE", "result": "continue"
                    },
					    { "title": "CHANGE SUPPLIER", "result": "change" }
        ]
    }
        notification.notify(config, function (response) {
                if (response.result == 'continue') {
                    Materialize.toast('PO created successfully', 2000);
            }
                if (response.result == 'change') {
                    $scope.selectSupplierCall();
            }
        });
    }
    $scope.POItemList = [
        {
            "name": "PO1",
             "showDetails": true,
            "supplierName": "IBM Technology",           
            "BU": "Mumbai",
            "currency": "USD",
            "isSelectPO":true,
            "selectedItem": "25",
            "include": "15",
            "exclude": "10",
            "purchaseType": "Purchase Type- A",
            "program": "Program- A"
        },
        {
            "name": "PO2",
            "supplierName": "IBM Technology",
            "BU": "Mumbai",
            "currency": "USD",
            "isSelectPO": false,
            "selectedItem": "25",
            "include": "15",
            "exclude": "10",
            "purchaseType": "Purchase Type- A",
            "program": "Program- A"
        },
        {
            "name": "PO3",
             "showDetails": false,
             "supplierName": "IBM Technology",
            "BU": "Mumbai",
            "currency": "USD",
            "isSelectPO": false,
            "selectedItem": "25",
            "include": "15",
            "exclude": "10",
            "purchaseType": "Purchase Type- A",
            "program": "Program- A"
        },
        {
            "name": "PO4",
            "showDetails": false,
            "supplierName": "IBM Technology",
            "BU": "Mumbai",
            "currency": "USD",
            "isSelectPO": false,
            "selectedItem": "25",
            "include": "15",
            "exclude": "10",
            "purchaseType": "Purchase Type- A",
            "program": "Program- A"
        },
        {
            "name": "PO5",
            "showDetails": false,
            "supplierName": "IBM Technology",
            "BU": "Mumbai",
            "currency": "USD",
            "isSelectPO": false,
            "selectedItem": "25",
            "include": "15",
            "exclude": "10",
            "purchaseType": "Purchase Type- A",
            "program": "Program- A"
        }
    ];
    $scope.showDetails = function (index) {
        for (var i = 0; i < $scope.POItemList.length; i++) {
            $scope.POItemList[i].isSelectPO = false;
            //$scope.POItemList[i].showDetails = false;
        }
        $scope.POItemList[index].isSelectPO = true;
        //$scope.POItemList[index].showDetails = true;
        //var getPORad = '#poItem-' + index;
        //angular.element(getPORad).triggerHandler('click');
        //angular.forEach($scope.POItemList, function (value, key) {
        //    if (key == index) {               
        //        $scope.POItemList[index].showDetails = !$scope.POItemList[index].showDetails;          
        //    } else {
        //        $scope.POItemList[key].showDetails = false;
               
        //    }
        //});
    }
    $scope.radChangeCall = function (check,index) {
        if (!check) {
            for (var i = 0; i < $scope.POItemList.length; i++) {
                $scope.POItemList[i].isSelectPO = false;
                //$scope.POItemList[i].showDetails = false;
            }
            $scope.POItemList[index].isSelectPO = true;
        }
    }
    $scope.createPOWithSupplier = function () {
        Materialize.toast('PO created successfully', 2000);
     }
    $scope.showPopupSelectPO = false;
    $scope.selectPOCall = function () {
        $scope.showPopupSelectPO = true;
     };
    $scope.onHideselectPOCall = function (e) {
        $scope.showPopupSelectPO = false;
     };
    $scope.showSupplierList = false;
    $scope.selectSupplierCall = function () {
        $scope.showSupplierList = true;
     };
    $scope.onHideSelectSupplierCall = function (e) {
        $scope.showSupplierList = false;
     };
    $scope.poSuppliers =[
            {
                name: "Apple", orderingLocation: "Hyderabad", remitLocation: "Bangalore", checked: true
    },
            {
                "name": "HP", "orderingLocation": "Pune", "remitLocation": "Delhi", checked: false
    },
            {
                "name": "Asus", "orderingLocation": "Gurgoan", "remitLocation": "Mumbai", checked: false
    },
            {
                "name": "Acer", "orderingLocation": "Hyderabad", "remitLocation": "Bangalore", checked: false
    },
            {
                "name": "Microsoft", "orderingLocation": "Pune", "remitLocation": "Delhi", checked: false
    },
            {
                "name": "Dell", "orderingLocation": "Gurgoan", "remitLocation": "Mumbai", checked: false
    },
            {
                "name": "Apple", "orderingLocation": "Hyderabad", "remitLocation": "Bangalore", checked: false
    },
            {
                "name": "HP", "orderingLocation": "Pune", "remitLocation": "Delhi", checked: false
    },
            {
                "name": "Asus", "orderingLocation": "Gurgoan", "remitLocation": "Mumbai", checked: false
    },
            {
                "name": "Acer", "orderingLocation": "Pune", "remitLocation": "Delhi", checked: false
    },
            {
                "name": "Microsoft", "orderingLocation": "Hyderabad", "remitLocation": "Bangalore", checked: false
    },
            { "name": "Dell", "orderingLocation": "Gurgoan", "remitLocation": "Mumbai", checked: false }
     ];
    //$scope.selectedCurrency = {
    //    "name": "Apple", "orderingLocation": "Gurgoan", "remitLocation": "Mumbai"
    // };
         //save view popup
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

         /*filter alert bar*/

    $scope.isApplyFilters = true;
    $scope.isSavedView = false;

         // manage Attributes
    $scope.manageAttributesPopupUrl = "workbench/views/popupManageFields.html";
    $scope.manageAttributesPopUp = false;
    $scope.manageAttributesPopupCallback = function () {
        $scope.manageAttributesPopUp = true;

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






         // On AssignTo functionality
    $scope.showOnBehalf = false;
    $scope.showOnBehalfClick = function () {
        $scope.showOnBehalf = true;
     }
    $scope.currencyOptions =[{ "title": "REQUEST FOR MYSELF", "id": "1" }, { "title": "ORDER FOR MYSELF", "id": "2" }, { "title": "REQUEST FOR OTHERS", "id": "3"
     }];
    $scope.configObj = { "title": "REQUEST FOR MYSELF", "id": "1"
     };

    $scope.selectedItemPopupUrl = "catalog/requesterCatalog/views/popupSelectItem.html";
    $scope.selectedItemPopup = false;
    $scope.selectedItemShowPopup = function (e) {
        $scope.selectedItemPopup = true;
     };
    $scope.OnBehalfOfUrl =[{ "code": "1", "name": "Phil James" }, { "code": "2", "name": "Robin Ross" }, { "code": "3", "name": "Shane Anderson" }, { "code": "4", "name": "Shane Bond" }, { "code": "5", "name": "Phil Huges"
     }];
    $scope.filterDataByCategory =[{ "name": "Laptops" }, { "name": "Laptop Chargers and Adapters" }, { "name": "Laptop Accessories" }, { "name": "Computer Memory" }, { "name": " Laptop Bags" }, { "name": " Laptop Chargers and Adapters" }, { "name": "Laptop Bags"
     }];
    $scope.filterDataBySuppliers =[{ "name": "Office Depot" }, { "name": "Dell" }, { "name": "Wallmart" }, { "name": "Canon" }, { "name": "Staples" }, { "name": "eBay" }, { "name": "Wallmart"
     }];
    $scope.filterDataBycatalogType =[{ "name": "Internal" }, { "name": "Hosted"
     }];
    $scope.selectedPerson = {
     };
    $scope.getVal = function (e) {
        $scope.selectedPerson = e;
     }

         /* OBO DATA */
    $scope.OBOData =[
		     { "name": 'Phil James'
    },
		     { "name": 'Robin Ross'
    },
		     { "name": 'Shane Anderson'
    },
		     { "name": 'Shane Bond'
    },
		     { "name": 'Phil Huges' }
     ];

    $scope.oboSelected = { "name": "EUR"
     };
         /* OBO DATA ENDS */

         //On Assign dropdown
    $scope.popupOnBehalfOfUrl = 'workbench/views/popupAssignTo.html';
    $scope.popupOnBehalfOf = false;
    $scope.changeSavedView = function (indexName) {
        $scope.selectedSavedview = { 'name': indexName
    };
        if (indexName == 'REQUEST FOR OTHERS') {
            $scope.popupOnBehalfOf = true;
    }
     };
    $scope.popupOnBehalfOfCallback = function (e) {
        $scope.popupOnBehalfOf = false;


    var confi = {
            type: "success",
            message: "<p class='left-align'>Selected Lines were assigned succesfully to " + $scope.selectedPerson.name + " </p>",

            buttons: [
                {
                    "title": "OK",
                    "result": "ok"
            }
    ]
    };

        //Notification call
        notification.notify(confi, function (responce) {
            if (responce.result == "ok") {
                return;
        }
    });
     }

    $scope.popupOnBehalfOfCall = function (e) {
        $scope.popupOnBehalfOf = true;
     }
    
    if ($scope.mode == 'receiving' || $scope.mode == 'receiptBuilder') {
        $scope.selectedSavedview = { 'name': 'Receipts pending since 10 days', 'isDefault': true };
        $scope.getSavedViewsList = [
                 {
                     'name': 'Receipts pending since 10 days', 'isDefault': true, 'showCurrentItemEditor': false
                 },
                 {
                     'name': 'Receipts exceeding USD 1000.00', 'isDefault': false, 'showCurrentItemEditor': false
                 },
                 {
                     'name': 'Receipts for IT/Telecom', 'isDefault': false, 'showCurrentItemEditor': false
                 },
                 {
                     'name': 'Receipts for Office Supplies less than USD 100.00', 'isDefault': false, 'showCurrentItemEditor': false
                 },
                 { 'name': 'Receipts overdue', 'isDefault': false, 'showCurrentItemEditor': false }
        ];
    }
    else {
        $scope.selectedSavedview = { 'name': 'Requisitions pending since 10 days', 'isDefault': true };
        $scope.getSavedViewsList = [
                 {
                     'name': 'Requisitions pending since 10 days', 'isDefault': true, 'showCurrentItemEditor': false
                 },
                 {
                     'name': 'Requisitions exceeding USD 1000.00', 'isDefault': false, 'showCurrentItemEditor': false
                 },
                 {
                     'name': 'Requisitions for IT/Telecom', 'isDefault': false, 'showCurrentItemEditor': false
                 },
                 {
                     'name': 'Requisitions for Office Supplies less than USD 100.00', 'isDefault': false, 'showCurrentItemEditor': false
                 },
                 { 'name': 'Requisitions overdue', 'isDefault': false, 'showCurrentItemEditor': false }
        ];
    }


    $scope.savedViews =[
       { 'name': 'REQUEST FOR MYSELF'
    },
       { 'name': 'ORDER FOR MYSELF'
    },
       { 'name': 'REQUEST FOR OTHERS' }
     ];

         /* POPUP SEARCH */
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



         //$scope.documentsOptions = [
         //    { "title": "Group By" },
         //    { "title": "None" },
         //    { "title": "test group one" },
         //    { "title": "test group Two" },
         //    { "title": "Lorem Ipsum" }
         //];
         //$scope.selectedDocument = { "title": "Group By" };

    $scope.currencyOptions =[
                        { "title": "None"
    },
                        {"title": "Item Number"
    },
                    { "title": "Line Number"
    },
                        { "title": "Description"
    },
                        {"title": "Category"
    },
                        {"title": "Requester"
    },
                        {"title": "Buyer"
    },
                        {"title": "Legal Entity"
    },
                        {"title": "Supplie Name"
    },
                        {"title": "Need By Date"
    },
                        {"title": "Start Date"
    },
                        {"title": "End Date"
    },
                        {"title": "Quantity"
    },
                        { "title": "UOM"
    },
                        { "title": "Currency"
    },
                        { "title": "LineValue"
    },
                        { "title": "Age of Requisition"}
     ];
    $scope.grpByOptions = $scope.currencyOptions;

    $scope.numberOptions =[{
    	"number": 10
    }, {
    	"number": 20
    }, {
    	"number": 30
    }, {
    	"number": 40
    }, {
    	"number": 50
     }];
     $scope.currentNumofItem = { "number": 10
     };
     $scope.setTheItemWithNumber = function (currentNumber) {
		$scope.currentNumofItem.number = currentNumber;
     };

     if ($scope.mode == 'receiving' || $scope.mode == 'receiptBuilder') {
         var properties = [

          {
              "ReceiptNumber": "RECEIPT-2017.123213",
              "PurchaseType": "Standard",
              "ItemNumber": "2478371",
              "LineNumber": 1,
              "Description": "Safety Training",
              "Category": "Safety Training",
              "Requester": "Robert Miller",
              "Buyer": "Emily White",
              "LegalEntity": "1001 - New Jersey",
              "SupplierName": "--",
              "NeedByDate": "12/08/2017",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 2,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 2598,
              "ReceiptAge": "2 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "12/08/2017"
          },
          {
              "ReceiptNumber": "RECEIPT-2016.123214",
              "PurchaseType": "Standard",
              "ItemNumber": "53742123",
              "LineNumber": 1,
              "Description": "Professional Training",
              "Category": "Safety Training",
              "Requester": "Clark Kent",
              "Buyer": "Emily White ",
              "LegalEntity": "Philadelphia Ltd.",
              "SupplierName": "--",
              "NeedByDate": "01/11/2017",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 34,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 53502.06,
              "ReceiptAge": "23 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "01/11/2017"
          },
          {
              "ReceiptNumber": "RECEIPT-2016.123215",
              "PurchaseType": "Standard",
              "ItemNumber": "29002204",
              "LineNumber": 12,
              "Description": "Acer One 10 S1002-15XR",
              "Category": "IT Hardware",
              "Requester": "Bruce Wayne",
              "Buyer": "Paul Garcia",
              "LegalEntity": "New Jersey LLC",
              "SupplierName": "Acer",
              "NeedByDate": "25/10/2016",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 45,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 12818.7,
              "ReceiptAge": "42 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "01/11/2017"
          },
          {
              "ReceiptNumber": "RECEIPT-2016.123216",
              "PurchaseType": "Standard",
              "ItemNumber": "46393935",
              "LineNumber": 2,
              "Description": "Apple Mac pro",
              "Category": "IT Hardware",
              "Requester": "Frank Underwood",
              "Buyer": "Linda Perez",
              "LegalEntity": "Oregon LLC",
              "SupplierName": "Apple Inc.",
              "NeedByDate": "10/11/2016",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 23,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 68936.75,
              "ReceiptAge": "8 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "01/11/2017"
          },
          {
              "ReceiptNumber": "RECEIPT-2016.123217",
              "PurchaseType": "Standard",
              "ItemNumber": "4568593",
              "LineNumber": 2,
              "Description": "Apple Mac air",
              "Category": "IT Hardware",
              "Requester": "Bruce Wayne",
              "Buyer": "Maria Harris",
              "LegalEntity": "Philadelphia Ltd.",
              "SupplierName": "Apple Inc.",
              "NeedByDate": "07/11/2016",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 6,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 7277.94,
              "ReceiptAge": "8 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "01/11/2017"
          },
          {
              "ReceiptNumber": "RECEIPT-2016.123218",
              "PurchaseType": "Standard",
              "ItemNumber": "17079491",
              "LineNumber": 32,
              "Description": "Samsung Galaxy S8",
              "Category": "IT Hardware",
              "Requester": "Clark Kent",
              "Buyer": "Ruth Turner",
              "LegalEntity": "New Jersey LLC",
              "SupplierName": "Samsung",
              "NeedByDate": "10/11/2016",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 34,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 92730.24,
              "ReceiptAge": "3 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "01/11/2017"
          },
          {
              "ReceiptNumber": "RECEIPT-2016.123219",
              "PurchaseType": "Standard",
              "ItemNumber": "22885783",
              "LineNumber": 3,
              "Description": "OnePlus 5",
              "Category": "IT Hardware",
              "Requester": "John Davis",
              "Buyer": "Jeff Lee",
              "LegalEntity": "Oregon LLC",
              "SupplierName": "OnePlus",
              "NeedByDate": "07/11/2016",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 5,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 10869.7,
              "ReceiptAge": "83 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "01/11/2017"
          },
          {
              "ReceiptNumber": "RECEIPT-2016.123220",
              "PurchaseType": "Standard",
              "ItemNumber": "46788971",
              "LineNumber": 3,
              "Description": "Apple iPhone 7 Plus",
              "Category": "IT Hardware",
              "Requester": "Robert Miller",
              "Buyer": "Donald Clark",
              "LegalEntity": "Philadelphia Ltd.",
              "SupplierName": "Apple Inc.",
              "NeedByDate": "08/11/2016",
              "StartDate": "--",
              "EndDate": "--",
              "Quantity": 54,
              "UOM": "Each",
              "Currency": "USD",
              "LineValue": 105247.62,
              "ReceiptAge": "7 Days",
              "previouslyAccepted": "12/08/2017",
              "ReceiptQuantity": "40",
              "AcceptedQuantity": "35",
              "ReceiptDate": "01/11/2017"
          }
        ];
     }
     else {
         var properties = [

       {
           "RequisitionNumber": "REQ-2017.123213",
           "PurchaseType": "Standard",
           "ItemNumber": "2478371",
           "LineNumber": 1,
           "Description": "Safety Training",
           "Category": "Safety Training",
           "Requester": "Robert Miller",
           "Buyer": "Emily White",
           "LegalEntity": "1001 - New Jersey",
           "SupplierName": "--",
           "NeedByDate": "YES",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 2,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 2598,
           "RequisitionAge": "2 Days",
           "cellTemplate": "<a ui-sref='reqWorkbenchone'>YES</a>"

           
       },
       {
           "RequisitionNumber": "REQ-2016.123214",
           "PurchaseType": "Standard",
           "ItemNumber": "53742123",
           "LineNumber": 1,
           "Description": "Professional Training",
           "Category": "Safety Training",
           "Requester": "Clark Kent",
           "Buyer": "Emily White ",
           "LegalEntity": "Philadelphia Ltd.",
           "SupplierName": "--",
           "NeedByDate": "01/11/2017",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 34,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 53502.06,
           "RequisitionAge": "23 Days"
       },
       {
           "RequisitionNumber": "REQ-2016.123215",
           "PurchaseType": "Standard",
           "ItemNumber": "29002204",
           "LineNumber": 12,
           "Description": "Acer One 10 S1002-15XR",
           "Category": "IT Hardware",
           "Requester": "Bruce Wayne",
           "Buyer": "Paul Garcia",
           "LegalEntity": "New Jersey LLC",
           "SupplierName": "Acer",
           "NeedByDate": "25/10/2016",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 45,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 12818.7,
           "RequisitionAge": "42 Days"
       },
       {
           "RequisitionNumber": "REQ-2016.123216",
           "PurchaseType": "Standard",
           "ItemNumber": "46393935",
           "LineNumber": 2,
           "Description": "Apple Mac pro",
           "Category": "IT Hardware",
           "Requester": "Frank Underwood",
           "Buyer": "Linda Perez",
           "LegalEntity": "Oregon LLC",
           "SupplierName": "Apple Inc.",
           "NeedByDate": "10/11/2016",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 23,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 68936.75,
           "RequisitionAge": "8 Days"
       },
       {
           "RequisitionNumber": "REQ-2016.123217",
           "PurchaseType": "Standard",
           "ItemNumber": "4568593",
           "LineNumber": 2,
           "Description": "Apple Mac air",
           "Category": "IT Hardware",
           "Requester": "Bruce Wayne",
           "Buyer": "Maria Harris",
           "LegalEntity": "Philadelphia Ltd.",
           "SupplierName": "Apple Inc.",
           "NeedByDate": "07/11/2016",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 6,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 7277.94,
           "RequisitionAge": "8 Days"
       },
       {
           "RequisitionNumber": "REQ-2016.123218",
           "PurchaseType": "Standard",
           "ItemNumber": "17079491",
           "LineNumber": 32,
           "Description": "Samsung Galaxy S8",
           "Category": "IT Hardware",
           "Requester": "Clark Kent",
           "Buyer": "Ruth Turner",
           "LegalEntity": "New Jersey LLC",
           "SupplierName": "Samsung",
           "NeedByDate": "10/11/2016",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 34,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 92730.24,
           "RequisitionAge": "3 Days"
       },
       {
           "RequisitionNumber": "REQ-2016.123219",
           "PurchaseType": "Standard",
           "ItemNumber": "22885783",
           "LineNumber": 3,
           "Description": "OnePlus 5",
           "Category": "IT Hardware",
           "Requester": "John Davis",
           "Buyer": "Jeff Lee",
           "LegalEntity": "Oregon LLC",
           "SupplierName": "OnePlus",
           "NeedByDate": "07/11/2016",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 5,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 10869.7,
           "RequisitionAge": "83 Days"
       },
       {
           "RequisitionNumber": "REQ-2016.123220",
           "PurchaseType": "Standard",
           "ItemNumber": "46788971",
           "LineNumber": 3,
           "Description": "Apple iPhone 7 Plus",
           "Category": "IT Hardware",
           "Requester": "Robert Miller",
           "Buyer": "Donald Clark",
           "LegalEntity": "Philadelphia Ltd.",
           "SupplierName": "Apple Inc.",
           "NeedByDate": "08/11/2016",
           "StartDate": "--",
           "EndDate": "--",
           "Quantity": 54,
           "UOM": "Each",
           "Currency": "USD",
           "LineValue": 105247.62,
           "RequisitionAge": "7 Days"
       }
     
         ];
     }

    $scope.init = function (s, e) {

    	var grid = $scope.grid = s;
    	$scope.data = new wijmo.collections.CollectionView(properties);

    	$scope.data.pageSize = 10;
    	$scope.filter = new wijmo.grid.filter.FlexGridFilter(s);
        // $scope.$apply();

    	grid.selectionMode = wijmo.grid.SelectionMode.Row;
    	grid.select(-1, -1);

    	grid.formatItem.addHandler(function (s, e) {
    		var sel = null;

    	    // apply selected state to row header cells
    		if (e.panel == grid.rowHeaders) {
    			sel = grid.rows[e.row].isSelected;
    			wijmo.toggleClass(e.cell, 'wj-state-multi-selected', sel);
    	}

    	    // apply selected state to top-left cell
    		if (e.panel == grid.topLeftCells) {
    			sel = areAllRowsSelected(grid);
    	}

    	    // show checkboxes on row header and top-left cells
    		if (sel != null && e.col == 0) {
    			e.cell.innerHTML = '<span class="wj-glyph-check" style="opacity:' + (sel ? 1 : .25) + '"></span>';
    	}
    });

        // customize mouse selection
        grid.hostElement.addEventListener('mousedown', function (e) {
            var ht = grid.hitTest(e);
            var headerTitle = e.path["0"].innerText;
            console.log(headerTitle);
    	    // allow sorting/resizing/dragging
    		if ((ht._p == grid.columnHeaders) || (ht._p == grid.rowHeaders) || (ht._p == grid.topLeftCells)) {
    			if (ht._p == grid.columnHeaders) {
    				return;
    		}

    		    // toggle row selection when clicking row headers
    			if (ht._p == grid.rowHeaders) {
    				grid.rows[ht.row].isSelected = !grid.rows[ht.row].isSelected;
    		}

    		    // toggle all rows selection when clicking top-left cell
    			if (ht._p == grid.topLeftCells) {
    				var select = !areAllRowsSelected(grid);
    				for (var i = 0; i < grid.rows.length; i++) {
    					grid.rows[i].isSelected = select;
    			}
    		}

    		    // cancel default handling
    		    //e.preventDefault();
    		    //e.stopPropagation();
    		    //e.stopImmediatePropagation();
    	}
    	    // toggle footer depending upon the selectedRows values selected



    		var selectedRows = _.filter(grid.rows, function (r) {

    			if (r.isSelected == true) {
    				$scope.showAllCheckbox = true;

    				return r;
    			} else if (r.isSelected == false) {


                    $scope.showAllCheckbox = false;


                     return r;
    		}
    	});
    		selectedRows.length != 0 ? $scope.showAllCheckbox = true : $scope.showAllCheckbox = false;

    	}, true);

     };
    $scope.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wijmo.grid.CellType.Cell) {
            var flex = panel.grid;
            //set height for even rows           
            flex.rows[r].height = 48;
            flex.rows[r].cssClass = "wj-sTable-cell";

    }
     }


         function areAllRowsSelected(grid) {
    	for (var i = 0; i < grid.rows.length; i++) {
    		if (!grid.rows[i].isSelected) return false;
         }
    	return true;
     }
    $scope.currencyOptions =["None", "Purchase Type", "Item Number", "Category", "Requester", "Buyer", "Supplier Name", "Need by Date", "Status of Requisition", "Age of Requisition"];
    $scope.newItem = ["Change to Order"];

    if ($scope.mode == 'receiving' || $scope.mode == 'receiptBuilder') {
        $scope.currencyOptions.push($scope.newItem)
    }
    

    $scope.groupBy = 'None';
    $scope.$watch('groupBy', function () {
        if (!$scope.data) return;
    	var cv = $scope.data;
    	cv.groupDescriptions.clear();
    	if ($scope.groupBy) {
    	    var groupNames = $scope.groupBy.replace(/\s+/g, '');
    	    $scope.groupBy = groupNames;//$scope.groupBy.replace(/\s+/g, '');
    		if (groupNames == 'None') {
    			cv.groupDescriptions.clear();
    		}
    		else {
    			var groupDesc = new wijmo.collections.PropertyGroupDescription(groupNames);
    			cv.groupDescriptions.push(groupDesc);
    	}

    }
     });

    $scope.fillpartialColCheck = false;

    $scope.selectAllCol = { checkedAll: true
     };
    $scope.onChangeSelectAllcol = function (check) {
    	$scope.fillpartialColCheck = false;
    	if (check) {
    		for (var i = 0; i < $scope.attributes.length; i++) {
    			$scope.attributes[i].value = true;
    	}
    	}
    	else {
    		for (var i = 0; i < $scope.attributes.length; i++) {
    			$scope.attributes[i].value = false;
    	}
    }
     }
    $scope.fillpartialColCheck = false;
    $scope.onChangeColCheck = function () {

    	var countColCheckList = 0;
    	for (var i = 0; i < $scope.attributes.length; i++) {
    		if ($scope.attributes[i].value == true) {
    			countColCheckList++;
    	}
    }
    	$scope.fillpartialColCheck = true;
    	if (countColCheckList === 0) {
    		$scope.fillpartialColCheck = false;
    		$scope.selectAllCol.checkedAll = false;
    	}
    	else if (countColCheckList === $scope.attributes.length) {
    		$scope.fillpartialColCheck = false;
    		$scope.selectAllCol.checkedAll = true;
    	}
    	else {
    		$scope.fillpartialColCheck = true;
    }

    }

    /* Workbench hide and show */
    $scope.showPODetails = false;
    $scope.showAlertBar = true;
    $scope.toggleWorkbench = function () {
        $scope.showAlertBar = false;
        if ($scope.showPODetails == false) {
            $scope.showPODetails = true;
        }
        else {
            $scope.showPODetails = false;
        }
    };

    if ($scope.mode == 'receiptBuilder') {
        $scope.showPODetails = true;
    }
    $scope.receiptBuild = function () {
        $state.go('workbench.landing', { doctype: 'receiptBuilder' })
    }

    $scope.supplierName = "Supplier ABC";
    $scope.isAutoSuggOpen = false;
    $scope.suppliteInput = function () {
        if ($scope.supplierName.length > 2) {
            $scope.isAutoSuggOpen = true;
        } else {
            $scope.isAutoSuggOpen = false;
        }
    }

    $scope.showAddSupplierPopup = false;
    $scope.addNewSupplier = function (e) {
        $scope.showAddSupplierPopup = true;
        $scope.isAutoSuggOpen = false;
    };
    $scope.showAddSupplierPopupOnHideCallback = function (e) {
        $scope.showAddSupplierPopup = false;
        $scope.isContactCardOpen = true;
    };

    $scope.typeOptions = [
            {
                "UserId": 28360,
                "UserName": "SRUser1@outlook.com",
                "FirstName": "Evertek",
                "LastName": ""
            }, {
                "UserId": 28977,
                "UserName": "SRUser1@outlook.com11",
                "FirstName": "Cap Supplier 2",
                "LastName": ""
            }, {
                "UserId": 28978,
                "UserName": "SRUser1@outlook.com234",
                "FirstName": "APL Supplier 3",
                "LastName": "Chi"
            }, {
                "UserId": 28979,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "WG Supp1",
                "LastName": ""
            }, {
                "UserId": 28980,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Avishek",
                "LastName": "Jana"
            }, {
                "UserId": 28981,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Sachin",
                "LastName": "Kurkute"
            }, {
                "UserId": 28982,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Karthic",
                "LastName": "Muthuraman"
            }, {
                "UserId": 28983,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Rahul",
                "LastName": "Kardekar"
            }, {
                "UserId": 28984,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Sheetal",
                "LastName": "Shah"
            }, {
                "UserId": 28985,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Nandini",
                "LastName": "Shah"
            }, {
                "UserId": 28986,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Poonam",
                "LastName": "Lad"
            }, {
                "UserId": 28987,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Harshit",
                "LastName": "Shah"
            }
    ];
    $scope.userListOptions = [
        {
            "UserId": 28980,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "John",
            "LastName": "Smith"
        }, {
            "UserId": 28981,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Avishek",
            "LastName": "Jana"
        }, {
            "UserId": 28982,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Sachin",
            "LastName": "Kurkute"
        }, {
            "UserId": 28983,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Rahul",
            "LastName": "Kardekar"
        }, {
            "UserId": 28984,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Sheetal",
            "LastName": "Shah"
        }, {
            "UserId": 28985,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Nandini",
            "LastName": "Shah"
        }, {
            "UserId": 28986,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Poonam",
            "LastName": "Lad"
        }, {
            "UserId": 28987,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Harshit",
            "LastName": "Shah"
        }
    ];

    $scope.typeLocationOptions = [
         {
             "UserId": 28360,
             "locationName": "Americas",
             "Location": "americas"
         },
            {
                "UserId": 28360,
                "locationName": "US",
                "Location": "US"
            }, {
                "UserId": 28977,
                "locationName": "India",
                "Location": "India"
            }, {
                "UserId": 28978,
                "locationName": "UK",
                "Location": "UK"
            }, {
                "UserId": 28979,
                "locationName": "Japan",
                "Location": "Japan"
            }, {
                "UserId": 28980,
                "locationName": "China",
                "Location": "China"
            }];
    $scope.selectedLocation = '';
    $scope.selectedSupplierName = '';
    $scope.selectedOrderingLocation = '';
    $scope.selectedRemitToLocation = '';
    $scope.selectedSupplier = '';

    $scope.supplierList = [
		{
		    name: "Supplier - 1",
		    uniqueid: "Sup1"
		},
		{
		    name: "Supplier - 2",
		    uniqueid: "Sup2"
		},
		{
		    name: "Supplier - 3",
		    uniqueid: "Sup3"
		},
		{
		    name: "Supplier - 4",
		    uniqueid: "Sup4"
		},
		{
		    name: "Supplier - 5",
		    uniqueid: "Sup5"
		}
    ]

    $scope.approversData = [
	   { "name": "Jhon Doe", "check": false, "group": true },
	   { "name": "Dotson Palmer", "check": false },
	   { "name": "Meyer Lloyd", "check": false },
	   { "name": "Flossie Ochoa", "check": false },
	   { "name": "Leah Moses", "check": false },
	   { "name": "Ferguson Osborn", "check": false },
	   { "name": "Peck Patterson", "check": false },
	   { "name": "Gay Payne", "check": false },
	   { "name": "Katie Hebert", "check": false },
	   { "name": "Bryan Shannon", "check": false },
	   { "name": "Skinner Farmer", "check": false },
	   { "name": "Mckay Mcneil", "check": false },
	   { "name": "Lila Horne", "check": false },
	   { "name": "Ethel Powell", "check": false },
	   { "name": "Spears Lott", "check": false },
	   { "name": "Nannie Ryan", "check": false },
	   { "name": "Joy Ware", "check": false },
	   { "name": "Shaffer Mcfadden", "check": false },
	   { "name": "Audrey Pena", "check": false },
	   { "name": "Helga Macdonald", "check": false }
    ];
    //add approval
    $scope.approversinitialDisplayText = 'Add Approvers';
    $scope.showFormAs = false;
    $scope.selectedOptionitemType = [{
        "code": "Single",
        "name": "Single Level Approval"
    }, {
        "code": "Multiple",
        "name": "Multiple Level Approval"
    }];

    $scope.selectedOption = {
        "code": "Single",
        "name": "Single Level Approval"
    };
    $scope.typeSelectOption = [{
        "code": "Pool",
        "name": "Pool"
    }, {
        "code": "Parallel",
        "name": "Parallel"
    }];

    $scope.selectedtypeSelect = {
        "code": "Pool",
        "name": "Pool"
    };
    $scope.approversAllLevelList = [
	  {
	      "types": "Pool",
	      "approvers": {
	          "approversData": [
                    {
                        "name": "Jhon Doe",
                        "check": true,
                        "group": true
                    },
                    {
                        "name": "Dotson Palmer",
                        "check": true
                    },
                    {
                        "name": "Meyer Lloyd",
                        "check": true
                    },
                    {
                        "name": "Flossie Ochoa",
                        "check": true
                    }
	          ],
	          "approversinitialDisplayText": "Add Approvers",
	          "showFormAs": false
	      }
	  },
	  {
	      "types": "Parallel",
	      "approvers": {
	          "approversData": [
                {
                    "name": "Jhon Doe",
                    "check": true,
                    "group": true
                },
                {
                    "name": "Dotson Palmer",
                    "check": true
                },
                {
                    "name": "Meyer Lloyd",
                    "check": true
                },
                {
                    "name": "Flossie Ochoa",
                    "check": true
                }
	          ],
	          "approversinitialDisplayText": "Add Approvers",
	          "showFormAs": false
	      }
	  }
    ];
    $scope.approversMultiLevelList = [{
        "types": {
            "options": [{
                "code": "Pool",
                "name": "Pool"
            }, {
                "code": "Parallel",
                "name": "Parallel"
            }]
        },
        "approvers": {
            "approversData": [
			  {
			      "name": "Jhon Doe",
			      "check": false,
			      "group": true
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
            ],
            "approversinitialDisplayText": 'Add Approvers',
            "showFormAs": false
        },
        "check": false
    }];
    $scope.deleteapproversData = function (index) {
        $scope.approversMultiLevelList.splice(index, 1);
    };
    $scope.addapproversData = function () {

        $scope.approversMultiLevelList.push({
            "types": {
                "options": [{
                    "code": "Pool",
                    "name": "Pool"
                }, {
                    "code": "Parallel",
                    "name": "Parallel"
                }]
            },
            "approvers": {
                "approversData": [
	  {
	      "name": "Jhon Doe",
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
                ],
                "approversinitialDisplayText": 'Add Approvers',
                "showFormAs": false


            },
            "check": false
        })
    };
    $scope.closeSupplierPopup = function () {
        $scope.showAddSupplierPopup = false;
    }
    $scope.approverSelectComplete = function () {
        $scope.showAddSupplierPopup = true;
    }
    $scope.categoryPopupCall = function () {
        $scope.showAddSupplierPopup = false;
    }
    $scope.categoryPopupComplete = function () {
        $scope.showAddSupplierPopup = true;
    }
    $scope.buPopupCall = function () {
        $scope.showAddSupplierPopup = false;
    }
    $scope.buPopupComplete = function () {
        $scope.showAddSupplierPopup = true;
    }
    $scope.businessUnitData = [
		  {
		      "name": "Business unit 0",
		      "check": false,
		      "value": [
                {
                    "name": "Business unit child-0",
                    "check": false,
                    "value": [
                      {
                          "name": "Business unit grand-child-0",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-1",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-2",
                          "check": false
                      }
                    ]
                },
                {
                    "name": "Business unit child-1-0",
                    "check": false,
                    "value": [
                      {
                          "name": "Business unit grand-child-1-0",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-1-1",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-1-2",
                          "check": false
                      }
                    ]
                }
		      ]
		  },
		  {
		      "name": "Business unit 1",
		      "check": false,
		      "value": [
                {
                    "name": "Business unit child-0",
                    "check": false,
                    "value": [
                      {
                          "name": "Business unit grand-child-0",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-1",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-2",
                          "check": false
                      }
                    ]
                },
                {
                    "name": "Business unit child-1-0",
                    "check": false,
                    "value": [
                      {
                          "name": "Business unit grand-child-1-0",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-1-1",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-1-2",
                          "check": false
                      }
                    ]
                }
		      ]
		  },
		  {
		      "name": "Business unit 2",
		      "check": false,
		      "value": [
                {
                    "name": "Business unit child-0",
                    "check": false,
                    "value": [
                      {
                          "name": "Business unit grand-child-0",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-1",
                          "check": false
                      },
                      {
                          "name": "Business unit grand-child-2",
                          "check": false
                      }
                    ]
                }
		      ]
		  }
    ];
    $scope.showFormBU = false;
    $scope.businessUnitDatainitialDisplayText = 'Choose Business Unit';
    $scope.categoryData = [
	  {
	      "name": "Category 0",
	      "check": false,
	      "value": [
            {
                "name": "Category child-0",
                "check": false,
                "value": [
                  {
                      "name": "Category grand-child-0",
                      "check": false
                  },
                  {
                      "name": "Category grand-child-1",
                      "check": false
                  },
                  {
                      "name": "Category grand-child-2",
                      "check": false
                  }
                ]
            }
	      ]
	  },
	  {
	      "name": "Category 1",
	      "check": false,
	      "value": [
            {
                "name": "Category child-0",
                "check": false,
                "value": [
                  {
                      "name": "Category grand-child-0",
                      "check": false
                  },
                  {
                      "name": "Category grand-child-1",
                      "check": false
                  },
                  {
                      "name": "Category grand-child-2",
                      "check": false
                  }
                ]
            }
	      ]
	  },
	  {
	      "name": "Category 2",
	      "check": false,
	      "value": [
            {
                "name": "Category child-0",
                "check": false,
                "value": [
                  {
                      "name": "Category grand-child-0",
                      "check": false
                  },
                  {
                      "name": "Category grand-child-1",
                      "check": false
                  },
                  {
                      "name": "Category grand-child-2",
                      "check": false
                  }
                ]
            }
	      ]
	  }
    ];
    $scope.showFormC = false;
    $scope.categoryDatainitialDisplayText = 'Choose Category';
    $scope.locationDatainitialDisplayText = 'Choose Location';

/**********************************GRID DATA******************************** */


    //UI grid -- Items (New) For First Link
    $scope.itemConfig = [
        {
            "field": "RequisitionNumber",
            "width": 150,
            "displayName": "Requisition Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "LineNumber",
            "width": 90,
            "displayName": "Line Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "RequestedItem",
            "width": 150,
            "displayName": "Requested Item Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Description",
            "width": 200,
            "displayName": "Description",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Category",
            "width": 180,
            "displayName": "Category",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
            "type": "editable"
        },
        {
            "field": "Quantity",
            "width": 100,
            "displayName": "Quantity",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
     
        {
            "field": "UOM",
            "width": 100,
            "displayName": "UOM",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
        },

        {
            "field": "Requester",
            "width": 180,
            "displayName": "Requester",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "Plant",
            "width": 170,
            "displayName": "Plant",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable"
        },
        {
            "field": "NeedByDate",
            "width": 140,
            "displayName": "Need By Date",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true }
        },
        {
            "field": "Status",
            "width": 180,
            "displayName": "Status",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },

        },
        {
            "field": "SupplierRecommended",
            "width": 120,
            "displayName": "Recommendation Available",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
            "cellTemplate": "<a ui-sref='reqWorkbenchone'>{{ row.entity.SupplierRecommended }}</a>",
        },
        {
            "field": "RecommendedItemnumber",
            "width": 150,
            "displayName": "Item Number",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Supplier",
            "width": 150,
            "displayName": "Supplier",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Price",
            "width": 150,
            "displayName": "Price",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Currency",
            "width": 150,
            "displayName": "Currency",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
       
        
    ];
    console.log("itemConfig", $scope.itemConfig)
    $scope.itemModel = [
        {
            "RequisitionNumber": "REQ-2017122",
            "LineNumber": "1",
            "RequestedItem":"P678 053 3116",
            "Description": "Fuel Hose and Tube Assy",
            "Category":"Fuel Hose",
            "Quantity":"2",
            "UOM":"EA",
            "Requester":"Robert Miller",
            "Plant":"AB Volvo",
            "NeedByDate":"12/08/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
        },
        {
            "RequisitionNumber": "REQ-2017114",
            "LineNumber": "1",
            "RequestedItem":"P678 053 3117",
            "Description": "Model X Fuel Hose and Tube Assy",
            "Category":"Fuel Hose",
            "Quantity":"34",
            "UOM":"EA",
            "Requester":"Clark Kent",
            "Plant":"Volvo Lastvagnar AB ",
            "NeedByDate":"01/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
           
        },
        {
            "RequisitionNumber": "REQ-2016115",
            "LineNumber": "12",
            "RequestedItem":"P692 425 3173",
            "Description": "Actuator Assy",
            "Category":"Actuator",
            "Quantity":"45",
            "UOM":"EA",
            "Requester":"Bruce Wayne",
            "Plant":"Volvo Powertrain Corporation",
            "NeedByDate":"25/10/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"No",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
        },
     
        {
            "RequisitionNumber": "REQ-2016216",
            "LineNumber": "12",
            "RequestedItem":"P537 925 5356",
            "Description": "Bolt, Flange 14X96",
            "Category":"Flange Bolts",
            "Quantity":"23",
            "UOM":"EA",
            "Requester":"Frank Underwood",
            "Plant":"Volvo Powertrain Corporation",
            "NeedByDate":"10/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016217",
            "LineNumber": "15",
            "RequestedItem":"P544 754 2864",
            "Description": "Eye Bolt M24",
            "Category":"Eye Bolts",
            "Quantity":"6",
            "UOM":"EA",
            "Requester":"Bruce Wayne",
            "Plant":"AB Volvo",
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"No",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016218",
            "LineNumber": "18",
            "RequestedItem":"P608 291 1559",
            "Description": "Clip Assy, Trim 8MM",
            "Category":"Clips",
            "Quantity":"34",
            "UOM":"PK",
            "Requester":"Clark Kent",
            "Plant":"Volvo Polska Sp. z o.o.",
            "NeedByDate":"08/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016219",
            "LineNumber": "13",
            "RequestedItem":"P582 946 2671",
            "Description": "Bolt 7/16 X17.6",
            "Category":"Bolts",
            "Quantity":"5",
            "UOM":"EA",
            "Requester":"John Davis",
            "Plant":"Volvo Lastvagnar AB ",
            "NeedByDate":"10/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016220",
            "LineNumber": "15",
            "RequestedItem":"P517 379 0922",
            "Description": "Cam Plate M14",
            "Category":"Cam Plates",
            "Quantity":"50",
            "UOM":"PK",
            "Requester":"Clark Kent",
            "Plant":"Volvo Polska Sp. z o.o.",          
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016221",
            "LineNumber": "18",
            "RequestedItem":"P525 871 0119",
            "Description": "Band,Hose D70",
            "Category":"Hose Band",
            "Quantity":"54",
            "UOM":"EA",
            "Requester":"Robert Miller",
            "Plant":"Volvo Powertrain Corporation",          
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016222",
            "LineNumber": "17",
            "RequestedItem":"P517 379 0922",
            "Description": "Seal,Hole 45X45",
            "Category":"Hole Seals",
            "Quantity":"42",
            "UOM":"PK",
            "Requester":"Frank Underwood",
            "Plant":"AB Volvo",          
            "NeedByDate":"08/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
      
        
    ];
    //UI grid -- Items (New) For First Link


    //UI grid -- Items (New) For Second Link
    $scope.itemConfigTwo = [
        {
            "field": "RequisitionNumber",
            "width": 150,
            "displayName": "Requisition Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "LineNumber",
            "width": 90,
            "displayName": "Line Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "RequestedItem",
            "width": 150,
            "displayName": "Requested Item Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Description",
            "width": 200,
            "displayName": "Description",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Category",
            "width": 180,
            "displayName": "Category",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
            "type": "editable"
        },
        {
            "field": "Quantity",
            "width": 100,
            "displayName": "Quantity",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
     
        {
            "field": "UOM",
            "width": 100,
            "displayName": "UOM",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
        },

        {
            "field": "Requester",
            "width": 180,
            "displayName": "Requester",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "Plant",
            "width": 170,
            "displayName": "Plant",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable"
        },
        {
            "field": "NeedByDate",
            "width": 140,
            "displayName": "Need By Date",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true }
        },
        {
            "field": "Status",
            "width": 180,
            "displayName": "Status",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },

        },
        {
            "field": "SupplierRecommended",
            "width": 120,
            "displayName": "Recommendation Available",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
            "cellTemplate": "<a ui-sref='reqWorkbenchtwo'>{{ row.entity.SupplierRecommended }}</a>",
        },
        {
            "field": "RecommendedItemnumber",
            "width": 150,
            "displayName": "Item Number",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Supplier",
            "width": 150,
            "displayName": "Supplier",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Price",
            "width": 150,
            "displayName": "Price",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Currency",
            "width": 150,
            "displayName": "Currency",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        
    ];
    console.log("itemConfigTwo", $scope.itemConfig)
    $scope.itemModelTwo = [
        {
            "RequisitionNumber": "REQ-2017982",
            "LineNumber": "1",
            "RequestedItem":"P678 053 3116",
            "Description": "Fuel Hose and Tube Assy",
            "Category":"Fuel Hose",
            "Quantity":"2",
            "UOM":"EA",
            "Requester":"Robert Miller",
            "Plant":"AB Volvo",
            "NeedByDate":"12/08/2018",
            "Status":"Sent to Requester",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"P678 053 3116",
            "Supplier":"Robert Bosch LLC",
            "Price":"55.99",
            "Currency":"SEK",
        },
        {
            "RequisitionNumber": "REQ-2017114",
            "LineNumber": "1",
            "RequestedItem":"P678 053 3117",
            "Description": "Model X Fuel Hose and Tube Assy",
            "Category":"Fuel Hose",
            "Quantity":"34",
            "UOM":"EA",
            "Requester":"Clark Kent",
            "Plant":"Volvo Lastvagnar AB ",
            "NeedByDate":"01/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
        
        },
        {
            "RequisitionNumber": "REQ-2016115",
            "LineNumber": "12",
            "RequestedItem":"P692 425 3173",
            "Description": "Actuator Assy",
            "Category":"Actuator",
            "Quantity":"45",
            "UOM":"EA",
            "Requester":"Bruce Wayne",
            "Plant":"Volvo Powertrain Corporation",
            "NeedByDate":"25/10/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"No",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
        },
    
        {
            "RequisitionNumber": "REQ-2016216",
            "LineNumber": "12",
            "RequestedItem":"P537 925 5356",
            "Description": "Bolt, Flange 14X96",
            "Category":"Flange Bolts",
            "Quantity":"23",
            "UOM":"EA",
            "Requester":"Frank Underwood",
            "Plant":"Volvo Powertrain Corporation",
            "NeedByDate":"10/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016217",
            "LineNumber": "15",
            "RequestedItem":"P544 754 2864",
            "Description": "Eye Bolt M24",
            "Category":"Eye Bolts",
            "Quantity":"6",
            "UOM":"EA",
            "Requester":"Bruce Wayne",
            "Plant":"AB Volvo",
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"No",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016218",
            "LineNumber": "18",
            "RequestedItem":"P608 291 1559",
            "Description": "Clip Assy, Trim 8MM",
            "Category":"Clips",
            "Quantity":"34",
            "UOM":"PK",
            "Requester":"Clark Kent",
            "Plant":"Volvo Polska Sp. z o.o.",
            "NeedByDate":"08/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016219",
            "LineNumber": "13",
            "RequestedItem":"P582 946 2671",
            "Description": "Bolt 7/16 X17.6",
            "Category":"Bolts",
            "Quantity":"5",
            "UOM":"EA",
            "Requester":"John Davis",
            "Plant":"Volvo Lastvagnar AB ",
            "NeedByDate":"10/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016220",
            "LineNumber": "15",
            "RequestedItem":"P517 379 0922",
            "Description": "Cam Plate M14",
            "Category":"Cam Plates",
            "Quantity":"50",
            "UOM":"PK",
            "Requester":"Clark Kent",
            "Plant":"Volvo Polska Sp. z o.o.",          
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016221",
            "LineNumber": "18",
            "RequestedItem":"P525 871 0119",
            "Description": "Band,Hose D70",
            "Category":"Hose Band",
            "Quantity":"54",
            "UOM":"EA",
            "Requester":"Robert Miller",
            "Plant":"Volvo Powertrain Corporation",          
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016222",
            "LineNumber": "17",
            "RequestedItem":"P517 379 0922",
            "Description": "Seal,Hole 45X45",
            "Category":"Hole Seals",
            "Quantity":"42",
            "UOM":"PK",
            "Requester":"Frank Underwood",
            "Plant":"AB Volvo",          
            "NeedByDate":"08/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        
        
    ];
    //UI grid -- Items (New) For Second Link

    //UI grid -- Items (New) For Third Link
    $scope.itemConfigThree = [
        {
            "field": "RequisitionNumber",
            "width": 150,
            "displayName": "Requisition Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "LineNumber",
            "width": 90,
            "displayName": "Line Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "RequestedItem",
            "width": 150,
            "displayName": "Requested Item Number",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Description",
            "width": 200,
            "displayName": "Description",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Category",
            "width": 180,
            "displayName": "Category",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
            "type": "editable"
        },
        {
            "field": "Quantity",
            "width": 100,
            "displayName": "Quantity",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
     
        {
            "field": "UOM",
            "width": 100,
            "displayName": "UOM",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true },
        },

        {
            "field": "Requester",
            "width": 180,
            "displayName": "Requester",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "Plant",
            "width": 170,
            "displayName": "Plant",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable"
        },
        {
            "field": "NeedByDate",
            "width": 140,
            "displayName": "Need By Date",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": { "enableFiltering": true }
        },
        {
            "field": "Status",
            "width": 180,
            "displayName": "Status",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },

        },
        {
            "field": "SupplierRecommended",
            "width": 120,
            "displayName": "Recommendation Available",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
            "cellTemplate": "<a ui-sref='reqWorkbenchone'>{{ row.entity.SupplierRecommended }}</a>",
        },
        {
            "field": "RecommendedItemnumber",
            "width": 150,
            "displayName": "Item Number",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Supplier",
            "width": 150,
            "displayName": "Supplier",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Price",
            "width": 150,
            "displayName": "Price",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        {
            "field": "Currency",
            "width": 150,
            "displayName": "Currency",
            "isVisible": true,
            "filterObject": { "enableFiltering": true },
            "type": "editable",
        },
        
       
        
    ];
    console.log("itemConfigThree", $scope.itemConfig)
    $scope.itemModelThree = [
        {
            "RequisitionNumber": "REQ-2017982",
            "LineNumber": "1",
            "RequestedItem":"P678 053 3116",
            "Description": "Fuel Hose and Tube Assy",
            "Category":"Fuel Hose",
            "Quantity":"2",
            "UOM":"EA",
            "Requester":"Robert Miller",
            "Plant":"AB Volvo",
            "NeedByDate":"12/08/2018",
            "Status":"Sent to Requester",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"P655 045 3435",
            "Supplier":"Robert Bosch LLC",
            "Price":"55.99",
            "Currency":"SEK",
        },
        {
            "RequisitionNumber": "REQ-2017986",
            "LineNumber": "1",
            "RequestedItem":"P678 053 3117",
            "Description": "Model X Fuel Hose and Tube Assy",
            "Category":"Fuel Hose",
            "Quantity":"34",
            "UOM":"EA",
            "Requester":"Clark Kent",
            "Plant":"Volvo Lastvagnar AB ",
            "NeedByDate":"01/11/2018",
            "Status":"Sent for Bidding",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
        
        },
        {
            "RequisitionNumber": "REQ-2016115",
            "LineNumber": "12",
            "RequestedItem":"P692 425 3173",
            "Description": "Actuator Assy",
            "Category":"Actuator",
            "Quantity":"45",
            "UOM":"EA",
            "Requester":"Bruce Wayne",
            "Plant":"Volvo Powertrain Corporation",
            "NeedByDate":"25/10/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"No",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
        },
    
        {
            "RequisitionNumber": "REQ-2016216",
            "LineNumber": "12",
            "RequestedItem":"P537 925 5356",
            "Description": "Bolt, Flange 14X96",
            "Category":"Flange Bolts",
            "Quantity":"23",
            "UOM":"EA",
            "Requester":"Frank Underwood",
            "Plant":"Volvo Powertrain Corporation",
            "NeedByDate":"10/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016217",
            "LineNumber": "15",
            "RequestedItem":"P544 754 2864",
            "Description": "Eye Bolt M24",
            "Category":"Eye Bolts",
            "Quantity":"6",
            "UOM":"EA",
            "Requester":"Bruce Wayne",
            "Plant":"AB Volvo",
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"No",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016218",
            "LineNumber": "18",
            "RequestedItem":"P608 291 1559",
            "Description": "Clip Assy, Trim 8MM",
            "Category":"Clips",
            "Quantity":"34",
            "UOM":"PK",
            "Requester":"Clark Kent",
            "Plant":"Volvo Polska Sp. z o.o.",
            "NeedByDate":"08/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016219",
            "LineNumber": "13",
            "RequestedItem":"P582 946 2671",
            "Description": "Bolt 7/16 X17.6",
            "Category":"Bolts",
            "Quantity":"5",
            "UOM":"EA",
            "Requester":"John Davis",
            "Plant":"Volvo Lastvagnar AB ",
            "NeedByDate":"10/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016220",
            "LineNumber": "15",
            "RequestedItem":"P517 379 0922",
            "Description": "Cam Plate M14",
            "Category":"Cam Plates",
            "Quantity":"50",
            "UOM":"PK",
            "Requester":"Clark Kent",
            "Plant":"Volvo Polska Sp. z o.o.",          
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016221",
            "LineNumber": "18",
            "RequestedItem":"P525 871 0119",
            "Description": "Band,Hose D70",
            "Category":"Hose Band",
            "Quantity":"54",
            "UOM":"EA",
            "Requester":"Robert Miller",
            "Plant":"Volvo Powertrain Corporation",          
            "NeedByDate":"07/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
        {
            "RequisitionNumber": "REQ-2016222",
            "LineNumber": "17",
            "RequestedItem":"P517 379 0922",
            "Description": "Seal,Hole 45X45",
            "Category":"Hole Seals",
            "Quantity":"42",
            "UOM":"PK",
            "Requester":"Frank Underwood",
            "Plant":"AB Volvo",          
            "NeedByDate":"08/11/2018",
            "Status":"Pending Review",
            "SupplierRecommended":"Yes",
            "RecommendedItemnumber":"-",
            "Supplier":"-",
            "Price":"-",
            "Currency":"-",
            
        },
      
    ];
    //UI grid -- Items (New) For Third Link


};
