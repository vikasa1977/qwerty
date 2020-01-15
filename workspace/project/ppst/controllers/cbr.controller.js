(function(angular) {
	'use strict';
	angular.module('SMART2')
	.controller('buCntrl', ['$scope', '$http', 'PPSTService', buCtrlFn])
    .controller('regionCtrl', ['$scope', '$http', 'PPSTService', regionCtrlFn])
    .controller('catagoryCtrl', ['$scope', '$http', 'PPSTService', '$state', catagoryCtrlCtrlFn])
    .controller('scorecardRepeatabilityProjCtrl', ['$scope', '$http', 'ScrollTo', '$filter', '$state', 'notification', 'storeService', '$timeout', '$window', 'kpiService', 'PPSTService', scorecardRepeatabilityProjCtrlFunc])
    .controller('catagorySingleCtrl', ['$scope', '$http', 'PPSTService', catagorySingleCtrlFn]);

	 
	 // Controller function
	function buCtrlFn($scope, $http, PPSTService) {
	    // Tree structure 
	    // Start: CBR	    
	    var tempBUNode_PAS = [];
	    $scope.treeComponentConfig = {
	        isRadio: false,
	        getHierarchyOnSelection: true,
	        getAllLazyLoadedData: true,
	        getUserSelection: true,
	        enableLastLevelSelection: false,
	        isLazyLoad: false,
	        showSelectAll: false,
	        showClearSelection: false,
	        showSelectionCount: false,
	        isReadOnly: false,
	        isDisabled: false,
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
	    };
	    var currentType = '';
	    $scope.treeOpenCallback = function (type) {
	        $scope.treeComponentConfig.requestParameter = {
	            navigationContext: "PAS"
	        };
	        currentType = type;
	        if (type == 'bu') {
	            var url = [
                    {
                        method: 'GET',
                        url: 'shared/popup/models/businessUnit.json'
                    }
	            ];
	            PPSTService.getJSONData(url).then(function (response) {
	                $scope.treeComponentConfig.data = response[0].data;
	                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
	                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
	                if ($scope.treeComponentConfig.selectedNodes.length) {
	                    $scope.treeComponentConfig.isReadOnly = true;
	                }
	            });
	        }	        
	        $scope.showTreePopup = true;
	    };

	    $scope.onPopupHideCallback = function () {
	        $scope.showTreePopup = false;
	        if (currentType == 'category') {
	            $scope.selectedCategoriesValidate = true;
	        } else if (currentType == 'bu') {
	            $scope.selectedBUValidate = true;
	        }
	        //$scope.treeComponentConfig.getSelections = true;
	    };	    
	    $scope.selectedBUTxt = "Choose Business Unit";	    
	    $scope.selectedBUValidate = false;	    
	    $scope.selectedBUNodes = [];

	    $scope.treeComponentCallback = function (e) {
	        if (currentType == 'category') {
	            tempCategoryNode_PAS = [];
	            $scope.selectedCategoriesValidate = true;
	            for (var i = 0; i < e.selections.length; i++) {
	                $scope.selectedCategoryNodes.push(e.selections[i].Name);
	                tempCategoryNode_PAS.push(e.selections[i].ID);
	            }
	            if (e.selectionAllNames.length > 1)
	                $scope.selectedCategoriesTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
	            else if (e.selectionAllNames.length == 1)
	                $scope.selectedCategoriesTxt = e.selectionAllNames[0];
	            else
	                $scope.selectedCategoriesTxt = 'Choose Category';
	        } else if (currentType == 'bu') {
	            tempBUNode_PAS = [];
	            $scope.selectedBUValidate = true;
	            PPSTService.setCBRSelection('bu', e.selections);// Set data in service for repeatability factor
	            for (var i = 0; i < e.selections.length; i++) {
	                $scope.selectedBUNodes.push(e.selections[i].Name);
	                tempBUNode_PAS.push(e.selections[i].ID);
	            }
	            if (e.selectionAllNames.length > 1)
	                $scope.selectedBUTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
	            else if (e.selectionAllNames.length == 1)
	                $scope.selectedBUTxt = e.selectionAllNames[0];
	            else
	                $scope.selectedBUTxt = 'Choose Business';
	        }
	        $scope.showTreePopup = false;
	        $scope.treeComponentConfig.data = [];
	        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	    };
	    // End: CBR
	}
    
    //Catagory controller
	function catagoryCtrlCtrlFn($scope, $http, PPSTService, $state) {
	    $scope.mode = $state.params.mode;
	    var tempCategoryNode_PAS = [];
	    if ($scope.mode == "supervisorActive") {
	        tempCategoryNode_PAS = [851750000001];
	        $scope.selectedCategoriesTxt = "IT/Telecom +10 More"
	    }
	       
	    $scope.treeComponentConfig = {
	        isRadio: false,
	        getHierarchyOnSelection: true,
	        getAllLazyLoadedData: true,
	        getUserSelection: true,
	        enableLastLevelSelection: false,
	        isLazyLoad: false,
	        showSelectAll: false,
	        showClearSelection: false,
	        showSelectionCount: false,
	        isReadOnly: false,
	        isDisabled: false,
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
	    };
	    var catagData = [];
	    $scope.treeOpenCallback = function (type) {
	        $scope.treeComponentConfig.requestParameter = {
	            navigationContext: "PAS"
	        };
	        var url = [
                    {
                        method: 'GET',
                        url: 'shared/popup/models/category.json'
                    }
	        ];
	        PPSTService.getJSONData(url).then(function (response) {
	            $scope.treeComponentConfig.data = response[0].data;
	            $scope.treeComponentConfig.title = 'CATEGORY';
	            $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
	            if ($scope.treeComponentConfig.selectedNodes.length) {
	                $scope.treeComponentConfig.isReadOnly = true;
	            }
	        });
	        //$scope.treeComponentConfig.data = catagData.data;
	        //$scope.treeComponentConfig.title = 'CATEGORY';
	        //$scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
	        //if ($scope.treeComponentConfig.selectedNodes.length) {
	        //    $scope.treeComponentConfig.isReadOnly = true;
	        //}
	        $scope.showTreePopup = true;
	    }
	    $scope.onPopupHideCallback = function () {
	        $scope.showTreePopup = false;
	        $scope.selectedCategoriesValidate = true;	       
	    };
	    $scope.treeComponentCallback = function (e) {
	        tempCategoryNode_PAS = [];
	        //Set the current selection in service
	        PPSTService.setCBRSelection('category', e.selections);// Set data in service for repeatability factor
	        $scope.selectedCategoriesValidate = true;
	        for (var i = 0; i < e.selections.length; i++) {
	            $scope.selectedCategoryNodes.push(e.selections[i].Name);
	            tempCategoryNode_PAS.push(e.selections[i].ID);
	        }
	        if (e.selectionAllNames.length > 1) {
	            $scope.selectedCategoriesTxt = e.selectionAllNames[0];
	            $scope.moreText = ' +' + (e.selectionAllNames.length - 1) + ' More';
	        }
	        else if (e.selectionAllNames.length == 1)
	            $scope.selectedCategoriesTxt = e.selectionAllNames[0];
	        else
	            $scope.selectedCategoriesTxt = 'Choose Category';
	        $scope.showTreePopup = false;
	        $scope.treeComponentConfig.data = [];
	        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	    };
	    $scope.selectedCategoryNodes = [];
	    $scope.selectedCategoriesValidate = false;
	    $scope.selectedCategoriesTxt = "Choose Category";
    }

    //Repeatability Controller
	function scorecardRepeatabilityProjCtrlFunc($scope, $http, ScrollTo, $filter, $state, notification, storeService, $timeout, $window, kpiService, PPSTService) {
	    //popup view repetability 
	    $scope.showRepeatabilityPopup = false;
	    $scope.showRepeatabilityPopupCallback = function () {
	        console.log("Data for repeatability factor--", PPSTService.getCBRSelection());// get data in service for repeatability factor
	        //if ($scope.parentScope.repeatabilityFactortData.length) {
	        //    $scope.showRepeatabilityPopup = true;
	        //    $scope.rfpopupData = angular.copy($scope.parentScope.repeatabilityFactortData);
	        //}
	        $scope.showRepeatabilityPopup = true;
	    }
	    $scope.onRepetabilityHideCallback = function () {
	        $scope.showRepeatabilityPopup = false;
	        //$scope.rfpopupData = [];
	    }
}

    //Categroy Single Select controller
	function catagorySingleCtrlFn($scope, $http, PPSTService) {
	    var tempCategoryNode_PAS = [];
	    $scope.treeComponentConfig = {
	        isRadio: true,
	        getHierarchyOnSelection: true,
	        getAllLazyLoadedData: true,
	        getUserSelection: true,
	        enableLastLevelSelection: false,
	        isLazyLoad: false,
	        showSelectAll: false,
	        showClearSelection: false,
	        showSelectionCount: false,
	        isReadOnly: false,
	        isDisabled: false,
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
	    };
	    var catagData = [];
	    //function loadCatagData() {
	    //    var URLs = [
        //       {
        //           method: 'GET',
        //           url: 'shared/popup/models/category.json'
        //       }
	    //    ];
	    //    PPSTService.getJSONData(URLs).then(function (respData) {
	    //        catagData = respData[0];
	    //    }).catch(function (err) {
	    //        // Handle the exception if any
	    //    });
	    //}
	    //loadCatagData();
	    $scope.treeOpenCallback = function (type) {
	        $scope.treeComponentConfig.requestParameter = {
	            navigationContext: "PAS"
	        };
	        var url = [
                    {
                        method: 'GET',
                        url: 'shared/popup/models/category.json'
                    }
	        ];
	        PPSTService.getJSONData(url).then(function (response) {
	            $scope.treeComponentConfig.data = response[0].data;
	            $scope.treeComponentConfig.title = 'CATEGORY';
	            $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
	            if ($scope.treeComponentConfig.selectedNodes.length) {
	                $scope.treeComponentConfig.isReadOnly = true;
	            }
	        });
	        //$scope.treeComponentConfig.data = catagData.data;
	        //$scope.treeComponentConfig.title = 'CATEGORY';
	        //$scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
	        //if ($scope.treeComponentConfig.selectedNodes.length) {
	        //    $scope.treeComponentConfig.isReadOnly = true;
	        //}
	        $scope.showTreePopup = true;
	    }
	    $scope.onPopupHideCallback = function () {
	        $scope.showTreePopup = false;
	        $scope.selectedCategoriesValidate = true;
	    };
	    $scope.treeComponentCallback = function (e) {
	        tempCategoryNode_PAS = [];
	        $scope.selectedCategoriesValidate = true;
	        for (var i = 0; i < e.selections.length; i++) {
	            $scope.selectedCategoryNodes.push(e.selections[i].Name);
	            tempCategoryNode_PAS.push(e.selections[i].ID);
	        }
	        if (e.selectionNames.length > 0)
	            $scope.selectedCategoriesText = e.selectionNames[0];
	        else
	            $scope.selectedCategoriesText = 'Lorem Ipsum';
	        $scope.showTreePopup = false;
	        $scope.treeComponentConfig.data = [];
	        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	    };
	    $scope.selectedCategoryNodes = [];
	    $scope.selectedCategoriesValidate = false;
	    $scope.selectedCategoriesText = "Lorem Ipsum";
	}

    // Region controller
	function regionCtrlFn($scope, $http, PPSTService) {
	    var tempRegionNode_PAS = [];
	    $scope.treeComponentConfig = {
	        isRadio: false,
	        getHierarchyOnSelection: true,
	        getAllLazyLoadedData: true,
	        getUserSelection: true,
	        enableLastLevelSelection: false,
	        isLazyLoad: false,
	        showSelectAll: false,
	        showClearSelection: false,
	        showSelectionCount: false,
	        isReadOnly: false,
	        isDisabled: false,
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
	    };
	    var regionData = [];
	    //function loadRegionData() {
	    //    var URLs = [
        //       {
        //           method: 'GET',
        //           url: 'shared/popup/models/region.json'
        //       }
	    //    ];
	    //    PPSTService.getJSONData(URLs).then(function (respData) {
	    //        regionData = respData[0];
	    //    }).catch(function (err) {
	    //        // Handle the exception if any
	    //    });
	    //}
	    //loadRegionData();
	    $scope.treeOpenCallback = function (type) {
	        $scope.treeComponentConfig.requestParameter = {
	            navigationContext: "PAS"
	        };
	        var url = [
                    {
                        method: 'GET',
                        url: 'shared/popup/models/region.json'
                    }
	        ];
	        PPSTService.getJSONData(url).then(function (response) {
	            $scope.treeComponentConfig.data = response[0].data;
	            $scope.treeComponentConfig.title = 'REGION';
	            $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
	            if ($scope.treeComponentConfig.selectedNodes.length) {
	                $scope.treeComponentConfig.isReadOnly = true;
	            }
	        });
	        //$scope.treeComponentConfig.data = regionData.data;
	        //$scope.treeComponentConfig.title = 'REGION';
	        //$scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
	        //if ($scope.treeComponentConfig.selectedNodes.length) {
	        //    $scope.treeComponentConfig.isReadOnly = true;
	        //}
	        $scope.showTreePopup = true;
	    }
	    $scope.onPopupHideCallback = function () {
	        $scope.showTreePopup = false;
	        $scope.selectedRegionValidate = true;
	    };
	    $scope.selectedRegionTxt = "Choose Region";
	    $scope.selectedRegionValidate = false;
	    $scope.selectedRegionNodes = [];
	    $scope.treeComponentCallback = function (e) {
	        tempRegionNode_PAS = [];
	        //Set the current selection in service
	        PPSTService.setCBRSelection('region', e.selections);// Set data in service for repeatability factor
	        $scope.selectedRegionValidate = true;
	        for (var i = 0; i < e.selections.length; i++) {
	            $scope.selectedRegionNodes.push(e.selections[i].Name);
	            tempRegionNode_PAS.push(e.selections[i].ID);
	        }
	        if (e.selectionAllNames.length > 1)
	            $scope.selectedRegionTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
	        else if (e.selectionAllNames.length == 1)
	            $scope.selectedRegionTxt = e.selectionAllNames[0];
	        else
	            $scope.selectedRegionTxt = 'Choose Region123';

	        $scope.showTreePopup = false;
	        $scope.treeComponentConfig.data = [];
	        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	    };
	}
    
})(angular);