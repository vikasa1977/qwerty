'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.catalog.controller:catalogCtrl
 * @description
 * Controller of catalog Request.
 */
    .controller('catalogCompareCtrl', ['$scope', '$rootScope', '$translate','$state', catalogCompareCtrlFunc]);

/**
 * @ngdoc method
 * @name catalogCtrlFunc
 * @methodOf SMART2.catalog.controller:catalogCtrl
 * @description
 * The method of the catalogCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function catalogCompareCtrlFunc($scope, $rootScope, $translate, $state) {
    $rootScope.IEcustomWheel = true;
    $scope.budgetEntityOptionList = [
       {
           title: "STORE 1",
           USD: "250,000"
       },
       {
           title: "STORE 2",
           USD: "450,000"

       },
       {
           title: "STORE 3",
           USD: "850,000"
       },
       {
           title: "STORE 4",
           USD: "750,000"
       },
       {
           title: "STORE 5",
           USD: "250,000"
       },
       {
           title: "STORE 6",
           USD: "950,000"
       },
       {
           title: "STORE 7",
           USD: "250,000"
       },
       {
           title: "STORE 8",
           USD: "250,000"
       },
       {
           title: "STORE 9",
           USD: "250,000"
       },
       {
           title: "STORE 10",
           USD: "250,000"
       }
    ];
    $scope.showBudgetEntityPopup = false;
    $scope.showBudgetEntityPopupCall = function (e) {
        e.stopPropagation();
        $scope.showBudgetEntityPopup = true;
    }
    $scope.selectedBudgetOption = { title: "STORE 1" };
    $scope.popupBudgetEntityPopupHide = function (e) {
        $scope.showBudgetEntityPopup = false;
    }
    $scope.itemShow1 = true;
	$scope.itemShow2 = true;
	$scope.itemShow3 = false;
	$scope.itemShow4 = false;

    //localization label - normal label, config labels
	$scope.labels = {
	    allWordsLable: $translate.instant("All Words")
	};
	$scope.okBtnConfig = { title: $translate.instant("OK") };
	$scope.cancelBtnConfig = { title: $translate.instant("Cancel") };

	$scope.add2CartBtnConfig = { title: $translate.instant("ADD TO CART") };
	
	$scope.cartItemCount = 1;
	//$scope.onFocusQty = function () {
	//	if ($scope.cartItemCount == 0) {
	//		$scope.cartItemCount = "";
	//	}
	//}

	//$scope.qtyTxt = 0;
	$scope.addToCart = function (e, flag, cartItemCount) {
	    //$scope.cartItemCount++;
	    $scope.isShowQty = true;
	    Materialize.toast(cartItemCount ? cartItemCount + ' ' + "items added to cart." : 1 + ' ' + "items added to cart.", 3500);
	}


	/* ADD ITEMS TO COMPARE */
	$scope.itemList = [
		{ img: 'shared/resources/images/grid-view-1.png', info: 'Lorem ipsum dolor sit ame Lorem ipsum dolor sit ame Lorem ipsum dolor sit ame' },
		{ img: 'shared/resources/images/grid-view-1.png', info: 'Lorem ipsum dolor sit ame Lorem ipsum dolor' },
		{ img: 'shared/resources/images/grid-view-1.png', info: 'Lorem ipsum dolor sit ame Lorem ipsum dolor sit ame' },
		{ img: 'shared/resources/images/grid-view-1.png', info: 'Lorem ipsum dolor sit ame Lorem ipsum dolor sit ame Lorem ipsum dolor sit ame' },
		{ img: 'shared/resources/images/grid-view-1.png', info: 'Lorem ipsum dolor sit ame' },
	];

	/* NOTIFICATION BUTTONS */
	$scope.submitCallback = function () {
		console.log('submitted');
	}
	$scope.okCallback = function () {
		console.log('oked');
	}
	$scope.btnConfig = [
		{
		'title': 'Submit',
		'callback': $scope.submitCallback
	}, {
		'title': 'Ok',
		'callback': $scope.okCallback
	}
	];

	$scope.autoCompleteData = { img: 'shared/resources/images/grid-view-1.png', "itemName": "COMPARE WITH" };
	$scope.onChange = function () {
	    //  this will be current scope
	    this.compareOptions = [
            { "img": 'shared/resources/images/macbook_pro.png', "itemName": "Apple Macbook", "product1": "Apple Macbook", "product2": "Apple Macbook", "product3": "Apple Macbook", "product4": "Apple Macbook" },
            { "img": 'shared/resources/images/grid-view-1.png', "itemName": "Dell laptop", "product1": "Dell laptop1", "product2": "Dell laptop2", "product3": "Dell laptop3", "product4": "Dell laptop4" },
            { "img": 'shared/resources/images/grid-view-1.png', "itemName": "IBM laptop", "product1": "Dell laptop1", "product2": "Dell laptop2", "product3": "Dell laptop3", "product4": "Dell laptop4" },
            { "img": 'shared/resources/images/grid-view-1.png', "itemName": "Lenovo laptop", "product1": "Dozen Pack", "product2": "Dell laptop2", "product3": "Dell laptop3", "product4": "Dell laptop4" },
            { "img": 'shared/resources/images/grid-view-1.png', "itemName": "Iball laptop", "product1": "Fine Tip Marker", "product2": "Dell laptop2", "product3": "Dell laptop3", "product4": "Dell laptop4" },
            { "img": 'shared/resources/images/grid-view-1.png', "itemName": "IBM laptop", "product1": "Yes", "product2": "Dell laptop2", "product3": "Dell laptop3", "product4": "Dell laptop4" }
	    ];
	};

	$scope.showSearch = false;
	$scope.clearSearch = function () {
	    $scope.showSearch = true;
	}

	$scope.clearSearchVal = function () {
	    $scope.autoCompleteData = { "itemName": "COMPARE WITH" };
	}

	

	$scope.specs = [

    {
        "headingTxt": "Buyer Item Number",
        "headingLable": "BuyerItemNumber",
        "isNum": false,
        "product1": "8827828",
        "product2": "112782",
        "product3": "4507828",
        "product4": false,
        'productData': "8827828"
          
     },

 {
        "headingTxt": "Supplier",
        "headingLable": "supplier",
        "isNum": false,
        "product1": "Office Depot",
        "product2": "CDW",
        "product3": "Staples Inc.",
        "product4": false,
        'productData': "Office Depot"
    },

    {
        "headingTxt": "Supplier Item Number",
        "headingLable": "USD",
        "isNum": false,
        "product1": "8827828",
        "product2": "112782",
        "product3": "4507828",
        "product4": false,
        'productData': "8827828"
    },
    
    {
          "headingTxt": "Lead Time",
          "headingLable": "LeadTime",
          "isNum": false,
          "product1": "9 Days",
          "product2": "9 Days",
          "product3": "9 Days",
          "product4": false,
          'productData': "9 Days"
      },

    {
        "headingTxt": "Description",
        "headingLable": "Desn",
        "isNum": false,
        "product1": "Apple MacBook MF865HN/A 12-inch Retina Display Laptop (Intel Core M/8GB/512GB/OS X El Capitan/ Intel HD Graphics 515), Silver",
        "product2": "HP Spectre 13-V039TU 13.3-inch Laptop (i5-6200U/8GB/256GB/Windows 10 Pro/Integrated Graphics), Dark Ash Silver",
        "product3": "Acer One 10 S1002-15XR 10.1-inch Laptop (Atom Z3735F/2GB/32GB/Windows 10/Intel HD Graphics), Dark Silver",
        "product4": false,
        'productData': "Apple MacBook MF865HN/A 12-inch Retina Display Laptop (Intel Core M/8GB/512GB/OS X El Capitan/ Intel HD Graphics 515), Silver"
    },

    {
          "headingTxt": "Item Type",
          "headingLable": "ItemType",
          "isNum": false,
          "product1": "MOH",
          "product2": "MOH",
          "product3": "MOH",
          "product4": false,
          'productData': "MOH"
     },

    {
              "headingTxt": "Type",
              "headingLable": "TypeMaterial/Services",
              "isNum": false,
              "product1": "Material",
              "product2": "Material",
              "product3": "Material",
              "product4": false,
              'productData': "Material"
      },

   


    {
        "headingTxt": "Currency",
        "headingLable": "USD",
        "isNum": false,
        "product1": "USD",
        "product2": "USD",
        "product3": "USD",
        "product4": false,
        'productData': "USD"

    },
   

    {
            "headingTxt": "Current Stock",
            "headingLable": "CurrentStock",
            "isNum": true,
            "product1": "45",
            "product2": "26",
            "product3": "78",
            "product4": false,
            'productData': "45"
        },
         {
            "headingTxt": "Rating",
            "headingLable": "Rating",
            "isNum": false,
            "product1": "4.5",
            "product2": "2.6",
            "product3": "4.3",
            "product4": false,
            'productData': "4.5"
        },

    {
            "headingTxt": "Minimum Order Quantity",
            "headingLable": "MinimumOrderQuantity",
            "isNum": true,
            "product1": "1",
            "product2": "1",
            "product3": "1",
            "product4": false,
            'productData': "1"
        },

    {
          "headingTxt": "Maximum Order Quantity",
          "headingLable": "MaximumOrderQuantity",
          "isNum": true,
          "product1": "1000",
          "product2": "1000",
          "product3": "-",
          "product4": false,
          'productData': "1000"
      },

    {
          "headingTxt": "Banding",
          "headingLable": "Banding",
          "isNum": true,
          "product1": "6",
          "product2": "5",
          "product3": "9",
          "product4": false,
          'productData': "6"
      },

    {
        "headingTxt": "Manufacturer",
        "headingLable": "manufacturer",
        "isNum": false,
        "product1": "Apple",
        "product2": "HP",
        "product3": "Acer",
        "product4": false,
        'productData': "Apple"
    },

    {
        "headingTxt": "Manufacturer Model Number",
        "headingLable": "ManufacturerModelNumber",
        "isNum": false,
        "product1": "MF855HN/A",
        "product2": "B01K1TTZKU",
        "product3": "S1002-15XR",
        "product4": false,
        'productData': "MF855HN/A"
    },

    {
        "headingTxt": "Manufacturer Part Number",
        "headingLable": "ManufacturerPNumber",
        "isNum": false,
        "product1": "PST10422",
        "product2": "PST10454",
        "product3": "PST10489",
        "product4": false,
        'productData': "PST10422"
    },

    {
        "headingTxt": "Contract Number",
        "headingLable": "ContractNumber",
        "isNum": false,
        "product1": "CON-2015.423343",
        "product2": "CON-2015.423344",
        "product3": "CON-2015.423345",
        "product4": false,
        'productData': "CON-2015.423343"
    },

    {
        "headingTxt": "Blanket Number",
        "headingLable": "BlanketNumber",
        "isNum": false,
        "product1": "Need Values",
        "product2": "Need Values",
        "product3": "Need Values",
        "product4": false,
        'productData': "Need Values"
    },

    {
         "headingTxt": "Supported UOM",
         "headingLable": "SupportedUOM",
         "isNum": false,
         "product1": "Box",
         "product2": "Crate",
         "product3": "Dozen",
         "product4": false,
         'productData': "Box"
     },

    {
         "headingTxt": "Conversion Factor",
         "headingLable": "Conversionfactor",
         "isNum": true,
         "product1": "10",
         "product2": "50",
         "product3": "12",
         "product4": false,
         'productData': "10"

     },

     //{
     //    "headingTxt": "UOM",
     //    "headingLable": "uom",
     //    "isNum": false,
     //    "product1": "Each",
     //    "product2": "Each",
     //    "product3": "Each",
     //    "product4": false
     //},
    // {
    //     "headingTxt": "Price",
    //     "headingLable": "unitPrice",
    //   "isNum": true,
    //  "product1": "USD 12990.00",
    //   "product2": "USD 78679.5",
    //  "product3": "USD 3418.32",
    //  "product4": false
      // },
     
     {
         "headingTxt": "Tax Exempted",
         "headingLable": "TaxExempted",
         "isNum": false,
         "product1": "Yes",
         "product2": "Yes",
         "product3": "No",
         "product4": false,
         'productData': "Yes"
     },
     {
         "headingTxt": "Keywords/Tags",
         "headingLable": "keywordsTags",
         "isNum": false,
         "product1": [
           { "title" : "Laptop"},
           { "title" : "HP"},
            { "title" : "6GB"},
            { "title" : "intel i7"}
          ],
         "product2": [
           { "title" : "Laptop"},
           { "title" : "HP"},
            { "title" : "6GB"},
            { "title" : "intel i7"}
          ],
         "product3": [
           { "title" : "Laptop"},
           { "title" : "HP"},
            { "title" : "6GB"},
            { "title" : "intel i7"}
          ],
         "product4": false,
         'productData': [
           { "title": "Laptop" },
           { "title": "HP" },
            { "title": "6GB" },
            { "title": "intel i7" }
         ]
     },

	];

	$scope.products = [{
	    id: 1,
	    "itemFrom": "contracted",
      "price": "",
      "selectedUnit":{ "name": "MPCM-Milligram Per Cubic Meter"},
      "itemCount" : 1,
      "forItem": true,
      "efforts": 1
	}, {
	    id: 2,
	    "itemFrom": "maretrial",
        "price": 1099,
      "selectedUnit":{ "name": "MPCM-Milligram Per Cubic Meter"},
      "itemCount" : 1,
      "forItem": true,
      "efforts": 1
	}, {
	    id: 3,
	    "itemFrom": "maretrial",
        "price":699.99,
      "selectedUnit":{ "name": "MPCM-Milligram Per Cubic Meter"},
      "itemCount" : 1,
      "forItem": false,
      "efforts": 1
	},
    {
	    id: 4,
	    "itemFrom": "maretrial",
        "price": "",
      "selectedUnit":{ "name": "MPCM-Milligram Per Cubic Meter"},
      "itemCount" : 1,
      "forItem": false,
      "efforts": 1,
       "hide": true
	}
	];

	

    // empty column

	$scope.getProductImage = function (id) {
	    switch (id) {
	        case 1:
	            return "macbook_pro.png"
	            break;
	        case 2:
	            return "hp_specter.png"
	            break;
	        case 3:
	            return "acer_one_10.png"
	            break;
	        case 4:
	            return "apple_mac_pro.png"
	            break;
	        default:
	            return "blank.png"
	            break;

	    }
	};


	$scope.getProductConf = function (id) {
	    switch (id) {
	        case 1:
	            return "Macbook"
	            break;
	        case 2:
	            return "HP specter"
	            break;
	        case 3:
	            return "Acer One 10 S1002-15XR"
	            break;
	        case 4:
	            return "Apple Mac pro"
	            break;
	        default:
	            return "satya"
	            break;

	    }
	};

	//$scope.getProductRating = function (id) {
	//    switch (id) {
	//        case 1:
	//            return "#icon_StarFill"
	//            break;
	//        case 2:
	//            return "#icon_StarFill"
	//            break;
	//        case 3:
	//            return "#icon_StarFill"
	//            break;
	//        case 4:
	//            return "#icon_StarFill"
	//            break;
	//        default:
	//            return "#icon_StarFill"
	//            break;

	//    }
	//};



	$scope.showProduct = true;

	$scope.removeCol = function (product, index) {

	    var currentIndex = index;
	    //var currentProduct = index;

	    for (var i = 0 ; i < $scope.specs.length; i++){
	        $scope.specs[i]['product' + currentIndex] = "";
	    }
	    product.hide = !product.hide;
	};

	$scope.onSelect = function (data, product, index) {
	    var currentIndex = index;
	    var tempdata = ["Apple MacBook Pro MJLT2HN/A 15-inch Laptop (Core i7/16GB/512GB/AMD Radeon R9 M370X with 2GB)", "MOH", "Material", "Office Depot", "9 Days", "35", "1", "1000", "7", "Apple", "MF755HN/A", "PST10444", "CON-2015.423345", "Need Value", "Box", "10","USD 4280.8", "Yes", "713510845", "Need Value", "Need Value", "Need Value"];
	    for (var i = 0 ; i < $scope.specs.length; i++) {
	        $scope.specs[i]['product' + currentIndex] = data['product' + currentIndex];
	        if (currentIndex == 1) {
	         $scope.specs[i]['product1'] = tempdata[i];
	        }
	        else if (currentIndex == 2) {
	            $scope.specs[i]['product2'] = tempdata[i];
	        }
	        else if (currentIndex == 3) {
	            $scope.specs[i]['product3'] = tempdata[i];
	        }
	        else if (currentIndex == 4) {
	            $scope.specs[i]['product4'] = tempdata[i];
	        }
	       
	    }
	    product.hide = !product.hide;
	};

    // On behalf functionality
	$scope.showOnBehalf = false;
	$scope.showOnBehalfClick = function () {
	    $scope.showOnBehalf = true;
	}
	$scope.currencyOptions = [{ "title": "REQUEST FOR MYSELF", "id": "1" }, { "title": "ORDER FOR OTHERS", "id": "2" }, { "title": "REQUEST FOR OTHERS", "id": "3" }];
	$scope.configObj = { "title": "REQUEST FOR MYSELF", "id": "1" };

	$scope.selectedItemPopupUrl = "catalog/requesterCatalog/views/popupSelectItem.html";
	$scope.selectedItemPopup = false;
	$scope.selectedItemShowPopup = function (e) {
	    $scope.selectedItemPopup = true;
	};
	$scope.OnBehalfOfUrl = [{ "code": "1", "name": "Phil James" }, { "code": "2", "name": "Robin Ross" }, { "code": "3", "name": "Shane Anderson" }, { "code": "4", "name": "Shane Bond" }, { "code": "5", "name": "Phil Huges" }];
	$scope.filterDataByCategory = [{ "name": "Laptops" }, { "name": "Laptop Chargers and Adapters" }, { "name": "Laptop Accessories" }, { "name": "Computer Memory" }, { "name": " Laptop Bags" }, { "name": " Laptop Chargers and Adapters" }, { "name": "Laptop Bags" }];
	$scope.filterDataBySuppliers = [{ "name": "Office Depot" }, { "name": "Dell" }, { "name": "Wallmart" }, { "name": "Canon" }, { "name": "Staples" }, { "name": "eBay" }, { "name": "Wallmart" }];
	$scope.filterDataBycatalogType = [{ "name": "Internal" }, { "name": "Hosted" }];
	$scope.selectedPerson = {};
	$scope.getVal = function (e) {
	    $scope.selectedPerson = e;
	}

    //On behalf dropdown
	$scope.popupOnBehalfOfUrl = 'catalog/requesterCatalog/views/popupOnBehalfOf.html';
	$scope.popupOnBehalfOf = false;
	 $scope.changeSavedView = function (indexName) {
        $scope.selectedSavedview = { 'name': indexName };
        if (indexName == 'REQUEST FOR OTHERS') {
            $scope.popupOnBehalfOf = true;
        }
        else{

              $scope.showOnBehalf = false;
        }
    };
    $scope.popupOnBehalfOfCallback = function (e) {

        $scope.popupOnBehalfOf = false;
      
        if ($scope.showOnBehalf == false) { 

        $scope.selectedSavedview = { 'name': 'REQUEST FOR MYSELF' };
        }
    }
	$scope.popupOnBehalfOfCall = function (e) {
	    $scope.popupOnBehalfOf = true;
	}

	$scope.selectedSavedview = { 'name': 'REQUEST FOR MYSELF' };
	$scope.savedViews = [
   { 'name': 'REQUEST FOR MYSELF' },
   { 'name': 'ORDER FOR OTHERS' },
   { 'name': 'REQUEST FOR OTHERS' },
   { 'name': 'LOREM IPSUM' }
	];
	

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

    //common Header
	         $scope.currentState = $state.$current.name;
	        $scope.isAllIconVisible = true;
	        $scope.isSearchVisible = true;
	        $scope.isCategoryVisible = false;
	        $scope.isRequesterVisible = true;
	        $scope.isWishlistVisible = true;
	        $scope.isManageCatalogVisible = false;
	        $scope.isCartVisible = true;
	        $scope.islistGridVisible = false;
	        $scope.isSortVisible = false;
	        $scope.isDeviderVisible = false;
	        $scope.isTotalVisible = false;
	        $scope.stateTitle = 'COMPARE';
	        $scope.searchPlaceholderTxt = 'Laptops (8981 ITEMS)';
	        $scope.isSearchOpen = false;


  // for Cart changes.
  
  $scope.unitTypeOption = [
        { "name": "EA-Each","set" :  1},
        { "name": "MPM-Milligram Per Millilitre" ,"set" :  1},
        { "name": "MPCM-Milligram Per Cubic Meter" ,"set" :  20},
        { "name": "CM-Cubic Millilitre" ,"set" :  4},
        { "name": "DZ-Dozen", "set": 12}
      ];

    $scope.changeUnit = function (unit, index) {
        if ($scope.catalogList[index].price != '') {
        $scope.catalogList[index].price = $scope.catalogList[index].unitPrice / unit.set;
      $scope.catalogList[index].itemCount = unit.set;
       }
    };    
};