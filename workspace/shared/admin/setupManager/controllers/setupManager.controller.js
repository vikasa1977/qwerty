angular
	.module('SMART2')
	.controller('setupmgrCtrl', ['$scope', '$sce', '$timeout', '$state', '$stateParams', '$http', '$filter','$translate' ,'notification', 'storeService', 'dbFactory', 'compareVersionLogFactory', setupmgrCtrlFunc])

function setupmgrCtrlFunc($scope, $sce, $timeout, $state, $stateParams, $http, $filter, $translate, notification, storeService, dbFactory, compareVersionLogFactory) {
        
    var inv = {
        method: 'GET',
        url: 'shared/admin/setupManager/models/createTask.json'
    };
    $scope.isModifiedUser = false;
  
  //  $scope.isApplyFilters = false;
    $scope.initialUserData = [];
    $scope.configurationData = [];
    $scope.userConfigData = [];
    $scope.isModified = [];
    $scope.search = 'Search by users or e-mail ID';
    $scope.checkPreviousRouteName = $state.previous.name;
    $scope.checkCurrentRouteName = $state.current.name;
    if(($scope.checkPreviousRouteName == 'admin.setupManager.configuration') && ($scope.checkCurrentRouteName == 'admin.setupManager.configureUser') && ($stateParams.iconData == 'Both')) {
        $scope.isApplyFilters = true;
        $scope.checkCurrentRoute = true;
    } else {
        $scope.isApplyFilters = false;
        $scope.checkCurrentRoute = false;
    }

    $scope.configureUserIconBtnCallback = function (iconClickedvalue) {
        var iconClickedData = { iconValue: iconClickedvalue };
        $state.go('admin.setupManager.configureUser', { iconData: iconClickedData.iconValue });
    }
 
         
    $scope.filterItems = [
        { "filterKey": "1.0 Portal" },
        { "filterKey": "1.0 Invoice" },
    ];
    
    //localization label - normal label, config labels
    $scope.labels = {
        enableActionLable: $translate.instant("ENABLE"),
        smartv1: $translate.instant("SMART 1.0"),
        smartv2: $translate.instant("SMART 2.0"),
        closeLabel: $translate.instant("CLOSE"),
    };
   
    $scope.showMoreChips = false;
    $scope.showAllChips = function () {
        $scope.showMoreChips = true;
    }
    $scope.filterChipsOnHideCallback = function () {
        $scope.showMoreChips = false;
    }
  
    $scope.enableAction = $scope.labels.enableActionLable;
    $scope.cancelAction = $scope.labels.closeLabel;
    //footer panel action
    $scope.enableButtonActions = [
            { 'key': 'smartv1', 'lable': $scope.labels.smartv1 },
            { 'key': 'smartv2', 'lable': $scope.labels.smartv2 },
    ];

    $http(inv).then(function (response) {
        $scope.massData = response.data.taskConfig.massData;
        $scope.mainData = response.data.taskConfig.mainData;
        $scope.taskListData = response.data.taskConfig.taskListData;   
        $scope.mainTaskData = response.data.taskConfig.mainData;
        $scope.configurationData = response.data.commonConfig.mainData;
        $scope.userConfigData = response.data.userConfig.mainData;
        getUniqueData($scope.mainData);
    }, function (error) {
        console.log(JSON.stringify(error));
    });
    

    $timeout(function () {
        for (var i = 0; i < $scope.userConfigData.length; i++) {
            if (i < 20) {
                $scope.initialUserData.push($scope.userConfigData[i]);
            }
        }
    });

    $scope.enableDisableLinks = true;
    $scope.isVisible = false;
    $scope.showLoadMore = true;
    $scope.loadMore = function () {
        for (var i = 0; i < $scope.userConfigData.length; i++) {
            if (i >= 20) {
                $scope.initialUserData.push($scope.userConfigData[i]);
                $scope.showLoadMore = false;
            }
        }
    }
    $scope.checkall = false;
   
    //select all check code 
 
    $scope.getCheckInfo = function (selected, length) {
        $scope.totalSelectValue = selected
        if (selected == 0) {
            $scope.enableDisableLinks = true;
            $scope.isVisible = false;
        } else {
            $scope.enableDisableLinks = false;
            $scope.isVisible = true;
        }
    };

    $scope.__selectallExoprt = {};
    $scope.enableOne = function () {
        $timeout(function () {
            angular.forEach($scope.initialUserData, function (currItm, indx) {
                if($scope.initialUserData[indx].checked == true) {
                    $scope.isModified[indx] = true;
                    $scope.isModifiedUser = true;
                }
                $scope.initialUserData[indx].checked = false;
                $scope.totalSelectValue = 0;
            });
            $scope.__selectallExoprt.selectall(false);
        },300);
      Materialize.toast($scope.totalSelectValue + ' Users enabled on 1.0', 2000, undefined, function () {   
      });
    }
    
    $scope.enableTwo = function () {
        $timeout(function () {
            angular.forEach($scope.initialUserData, function (currItm, indx) {
                if ($scope.initialUserData[indx].checked == true) {
                    $scope.isModified[indx] = true;
                    $scope.isModifiedUser = true;
                }
                $scope.initialUserData[indx].checked = false;
                $scope.totalSelectValue = 0;
            });
            $scope.__selectallExoprt.selectall(false);
        },300);
        Materialize.toast($scope.totalSelectValue + ' Users enabled on 2.0', 2000, undefined, function () {            
        });
    }

    $scope.showFilter = false;
    $scope.hideFilter = true;
    $scope.toggleFilter = function (e) {
        if ($scope.showFilter == false) {
            $scope.showFilter = true;
            $scope.hideFilter = false;
            //$rootScope.isFilterVisible = true;
        }
        else {
            $scope.showFilter = false;
            $scope.hideFilter = true;
            //$rootScope.isFilterVisible = false;
        }
    };
    //if ($scope.docType != 'recent_documents') {
        $scope.importDocumentFilterTabData = [{
            "id": "lob",
            "title": "LOB",
            "active": true,
            "htmlmode": true,
            "tabsUrl": "tabHeader1.html"
        }, {
            "id": "bu",
            "title": "Business Unit",
            "htmlmode": true,
            "tabsUrl": "tabHeader2.html"
        }, {
            "id": "category",
            "title": "Category",
            "htmlmode": true,
            "tabsUrl": "tabHeader3.html"
        }, {
            "id": "username",
            "title": "Username",
            "htmlmode": true,
            "tabsUrl": "tabHeader4.html"
        }, {
            "id": "enabledOn",
            "title": "Enabled On",
            "htmlmode": true,
            "tabsUrl": "tabHeader5.html"
        }, {
            "id": "functionalArea",
            "title": "Functional Area",
            "htmlmode": true,
            "tabsUrl": "tabHeader6.html"
        }
        ];
        $scope.showFilter = false;
        $scope.lob = true;
        $scope.bu = false;
        $scope.category = false;
        $scope.username = false;
        $scope.enabledOn = false;
        $scope.functionalArea = false;

        $scope.tabSelectCallback = function (tab) {
            if (tab.id == 'lob') {
                $scope.lob = true;
                $scope.bu = false;
                $scope.category = false;
                $scope.username = false;
                $scope.enabledOn = false;
                $scope.functionalArea = false;
            }
            else if (tab.id == 'bu') {
                $scope.bu = true;
                $scope.lob = false;
                $scope.category = false;
                $scope.username = false;
                $scope.enabledOn = false;
                $scope.functionalArea = false;
            }
            else if (tab.id == 'category') {
                $scope.category = true;
                $scope.bu = false;
                $scope.lob = false;
                $scope.username = false;
                $scope.enabledOn = false;
                $scope.functionalArea = false;
            }
            else if (tab.id == 'username') {
                $scope.username = true;
                $scope.category = false;
                $scope.bu = false;
                $scope.lob = false;
                $scope.enabledOn = false;
                $scope.functionalArea = false;
            }
            else if (tab.id == 'enabledOn') {
                $scope.enabledOn = true;
                $scope.username = false;
                $scope.category = false;
                $scope.bu = false;
                $scope.lob = false;
                $scope.functionalArea = false;
            }
            else if (tab.id == 'functionalArea') {
                $scope.functionalArea = true;
                $scope.enabledOn = false;
                $scope.username = false;
                $scope.category = false;
                $scope.bu = false;
                $scope.lob = false;
            }
        };

       // $scope.isApplyFilters = false;
        $scope.isSavedView = false;
    // Start: CBR
    // Start: CBR
        var tempCategoryNode_PAS = [];
        var tempBUNode_PAS = [];
        var tempRegionNode_PAS = [];

        $scope.treeComponentConfig = {
            isRadio: false,
            getHierarchyOnSelection: true,
            getAllLazyLoadedData: true,
            getUserSelection: true,
            enableLastLevelSelection: false,
            isLazyLoad: false,
            showSelectAll: true,
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

    /*$scope.treeComponentConfig = {
        selectedNodes: "",
        isRadio: false,
        getHierarchyOnSelection: true,
        isLazyLoad: false,
        data: null,
        disableLevelSelection: '',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '270px',
        isSearchEnabled: true
    };*/

        var categoryObj, buObj, regionObj;

        var categoryData = {
            method: 'GET',
            url: 'shared/popup/models/category.json'
        };

        var buData = {
            method: 'GET',
            url: 'shared/popup/models/businessUnit.json'
        };

        var regionData = {
            method: 'GET',
            url: 'shared/popup/models/region.json'
        };

        var currentType = '';
        $scope.treeOpenCallback = function (type) {
            //if (viewMode != "buyerPreview") {
                //$scope.treeComponentConfig.requestParameter = {
                //    navigationContext: "PAS"
                //};
                currentType = type;
                if (type == 'region') {
                    $http(regionData).then(function (response) {
                        regionObj = response.data;
                        $scope.treeComponentConfig.data = regionObj;
                        $scope.treeComponentConfig.title = 'Region';
                        $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                        //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
                    });

                } else if (type == 'bu') {
                    $http(buData).then(function (response) {
                        buObj = response.data;
                        $scope.treeComponentConfig.data = buObj;
                        $scope.treeComponentConfig.title = 'BUSINESS UNIT';
                        $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                        //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
                    });

                } else {
                    $http(categoryData).then(function (response) {

                        categoryObj = response.data;
                        $scope.treeComponentConfig.data = categoryObj;
                        $scope.treeComponentConfig.title = 'Category';
                        $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                        //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
                    });

                }
                $scope.showTreePopup = true;
            //}
        };

        $scope.onPopupHideCallback = function () {
            $scope.showTreePopup = false;
            if (currentType == 'category') {
                $scope.selectedCategoriesValidate = true;
            } else if (currentType == 'bu') {
                $scope.selectedBUValidate = true;
            } else if (currentType == 'region') {
                $scope.selectedRegionValidate = true;
            }
            //$scope.treeComponentConfig.getSelections = true;
        };

        $scope.selectedCategoriesTxt = "Choose Category";
        $scope.selectedBUTxt = "Choose Business Unit";
        $scope.selectedRegionTxt = "Choose Region";

        $scope.selectedCategoriesValidate = false;
        $scope.selectedBUValidate = false;
        $scope.selectedRegionValidate = false;

        $scope.selectedCategoryNodes = [];
        $scope.selectedBUNodes = [];
        $scope.selectedRegionNodes = [];

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
                for (var i = 0; i < e.selections.length; i++) {
                    $scope.selectedBUNodes.push(e.selections[i].Name);
                    tempBUNode_PAS.push(e.selections[i].ID);
                }
                if (e.selectionAllNames.length > 1)
                    $scope.selectedBUTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
                else if (e.selectionAllNames.length == 1)
                    $scope.selectedBUTxt = e.selectionAllNames[0];
                else
                    $scope.selectedBUTxt = 'Choose Category';
            } else if (currentType == 'region') {
                tempRegionNode_PAS = [];
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
                    $scope.selectedRegionTxt = 'Choose Category';
            }
            $scope.showTreePopup = false;
        };
    // End: CBR

        $scope.enabledOnRdo = [{ 'title': 'SMART 1.0' }, { 'title': 'SMART 2.0' }, { 'title': 'Both' }];
        $scope.selectedenabledOnRdo = { 'title': 'SMART 1.0' };

    // Start: Data init
    $scope.selectedTab = 1;
    $scope.rowsToShowOpts = {
        availableOptions: [
		  { size: '5' },
		  { size: '10' }
        ],
        selectedOption: { size: '5' }
    };

    // Start: Header dropdown
    $scope.listViews = [
        { title: 'PRODUCT VIEW' },
        { title: 'IMPLEMENTATION VIEW' },
    ];

    $scope.selectedListView = {
        title: 'PRODUCT VIEW'		
    }

    $scope.selectedLink = function(item){
        if(item.key =="smartv1"){
            $scope.enableOne();
        } else{
            $scope.enableTwo();
        }
    }

    $scope.changeListView = function (selectedView) {
        $scope.selectedListView.title = selectedView;
		$scope.IV = false; // table to be viewed on load
		
		if($scope.selectedListView.title == 'PRODUCT VIEW'){
			//alert("PRODUCT VIEW");
			$scope.IV = false; // Product View Table
		} else {
			//alert("IMPLEMENTATION VIEW")
			$scope.IV = true; // IMPLEMENTATION View Table
		}
    }
    // End: Header dropdown


    // Start: Task List popup
    $scope.taskListPopupShow = false;
    $scope.taskListPopupUrl = "shared/admin/setupManager/views/popupTaskList.html"
    $scope.taskListPopupShowCallBack = function (e) {
        $scope.taskListPopupShow = true;
    }

    $scope.taskListPopupUrlHideCallBack = function (e) {
        $scope.taskListPopupShow = false;
    }
    // End: Task List popup


    // Start: Mass Edit popup
    $scope.massEditPopupShow = false;
    $scope.massEditPopupUrl = "shared/admin/setupManager/views/popupMassEdit.html"
    $scope.massEditPopupShowCallBack = function (e) {
        $scope.massEditPopupShow = true;
    }

    $scope.massEditPopupHideCallBack = function (e) {
        $scope.massEditPopupShow = false;
    }
    // End: Mass Edit popup

    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };

    $scope.statusChange = function (currSelectedStatus, currSelectedObj) {
        currSelectedObj.name = currSelectedStatus;
        $scope.statusChanged = true;
    };

    $scope.clientName = { name: "J.Davis" };

    $scope.idIs = $state.params.id;
    $scope.currentProject = null;

    $scope.projectDetail = [{
        name: "Kellogs Asia Pacific",
        operatorName: "Apply Contract Package",
        id: 1,
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
        name: "Kellogs North America",
        id: 2,
        operatorName: "Greater than equals to",
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, {
        name: "Kellogs Europe",
        id: 3,
        operatorName: "Less than",
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    }, {
        name: "Kellogs India",
        id: 4,
        operatorName: "Less than equals to",
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }, {
        name: "Kellogs South America",
        id: 5,
        operatorName: "Equal",
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
        name: "Kellogs Africa",
        id: 6,
        operatorName: "Not equal to",
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, {
        name: "Kellogs Singapore",
        id: 7,
        operatorName: "Between",
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    }, {
        name: "Kellogs Denmark",
        id: 8,
        operatorName: "Is Null",
        startDate: "1494095400000",
        endDate: "1514658600000",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }];

    $scope.currentProject = $scope.projectDetail[$scope.idIs - 1];


    $scope.defaultSelectedOperator1 = { operatorName: 'Apply Contract Package' };
    //$scope.operatorValue = "Value";
    /*$scope.operatorsList1 = [
        { 'name': 'Apply Contract Package' },
        { 'name': 'Greater than equals to' },
        { 'name': 'Less than' },
        { 'name': 'Less than equals to' },
        { 'name': 'Equal' },
        { 'name': 'Not equal to' },
        { 'name': 'Between' },
	    { 'name': 'Is Null' },
	    { 'name': 'Is Not Null' }];*/

    $scope.currencyOptions1 = [{
        "code": "$",
        "name": "Custom"
    }, {
        "code": "€",
        "name": "All"
    }, {
        "code": "€",
        "name": "Upstream"
    }];
    $scope.selectedCurrency1 = { "code": "€", "name": "Custom" };

    $scope.contractToggle = false;
    $scope.projectToggle = false;
    $scope.sourcingToggle = false;
    $scope.p2pToggle = false;
    $scope.supplierToggle = false;
    $scope.saveDisable = true;

    $scope.selectOn = function (modName) {
       
        if (modName.name == "All")
        {
            $scope.contractToggle = true;
            $scope.projectToggle = true;
            $scope.sourcingToggle = true;
            $scope.p2pToggle = true;
            $scope.supplierToggle = true;
        }

    }
    $scope.onChangeProduct = function (ch,ch1,ch2,ch3,ch4) {
        if (ch == false) {
            $scope.selectedCurrency1 = { "code": "€", "name": "Custom" };
        }
        else if (ch == true && ch1 == true && ch2 == true && ch3 == true && ch4 == true) {
            $scope.selectedCurrency1 = { "code": "€", "name": "All" };
        }
        else {
            $scope.selectedCurrency1 = { "code": "€", "name": "Custom" };
        }

        $scope.saveDisable = false;

    }

    $scope.addFeature = function (e) {
        if ($scope.stateChange == false) {
            $state.go('admin.setupManager.addFeature');
        }
    }
    $scope.addConfig = function (e) {
        if( $scope.stateChange == false){
            $state.go('admin.setupManager.configureFeature');
        }
        
    }
    $scope.addTask = function (e) {
        if ($scope.stateChange == false) {
            $state.go('admin.setupManager.task');
        }
    }
    
    $scope.emptyText = ""

    $scope.projectText = "Project";
    $scope.contractText = "Contract";
    $scope.sourcingText = "Sourcing";
    $scope.p2pText = "P2P";
    $scope.supplierText = "Supplier";

    //Disabled buttons
    $scope.stateChange = true;
    $scope.createSetup = function () {
        $scope.stateChange = !$scope.stateChange;
    };

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

	// Start: Expand/Collapse on configure page
	$scope.collapsed = false;

	$scope.expandCollapseSections = function (taskObj) {
	    taskObj.isShowTask = !taskObj.isShowTask;
	}
	// End: Expand/Collapse on configure page
	
	$scope.applyCurrentFilter = function (e) {
		if ($scope.isSavedView == true)
			$scope.isSavedViewModified = true;
		else
			$scope.isApplyFilters = true;
		$scope.toggleFilter(e);
	};
    // End: Save view popup
	var filterVal,
        subHeaderFixedHeight = 50,
        headerWrapper = 115;
	$scope.fixedHeaderWithFilters = subHeaderFixedHeight + 48;
	$scope.isFilterSaved = false;

	$scope.applyFilter = function (sortEnable) {
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

	$scope.success = function () {
	    var createOb = {
	        type: "success",
	        message: "Project created successfully.",
	        buttons: [
                {
                    title: "OK",
                    result: "ok"
                }]
	    };
	    notification.notify(createOb, function (r) {
	        if (r.result == "ok") {
	            $scope.stateChange = !$scope.stateChange;
	        }
	    });
	}

    /* upload popup start */
	$scope.uploadIcon = '#icon_Upload'; //icon_Commented
	$scope.uploadTitle = 'UPLOAD';
	$scope.hideDownloadTemplate = true;
	$scope.attachmentButtonName = "Upload";
	$scope.types = {
	    fileType: ".jpg, .jpg, .pdf, .docx"
	}
	var attachmentMsg = "Supported file formats: doc, docs, pdf, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
        $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
        $scope.attachFlag = false;
        $scope.uploadFail = false;
        $scope.attachmentCall = function (e) {
            $scope.attachFlag = true;
            $timeout(function () {
                $scope.uploadFail = true;
            }, 1500);
        };
	$scope.uploadPopupUrl = "shared/popup/views/popupUploadDoc.html";
	$scope.showuploadPopup = false;
	$scope.showUploadPopupCallback = function (e) {
	    $scope.showUploadPopup = true;
	};
	$scope.uploadPopUpOnHideCallback = function (e) {
	    $scope.showUploadPopup = false;
	};
	$scope.docFlag = false;
	$scope.uploadDocCall = function (e) {
	    $scope.docFlag = true;
	};
	$scope.attachFlag = false;
	$scope.attachmentList = [
		{
		    name: "AttachmentOne.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentTwo.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		},
		{
		    name: "AttachmentThree.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		},
		{
		    name: "AttachmentFour.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		},
		{
		    name: "AttachmentFive.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		}
	];
	$scope.attachmentCall = function (e) {
	    $scope.attachFlag = true;

	    for (var i = 0; i < $scope.attachmentList.length; i++) {
	        $scope.attachmentList[i].isShow = true;
	    }
	};
	$scope.closeAttachment = function (el) {
	    el.isShow = false;
	}

	$scope.retryCall = function (el) {
	    el.status = "success";
	}
	$scope.removeRow = function (el) {
	    // remove the row specified in index
	    if ($scope.attachmentList.length > 1) {
	        if ($scope.attachmentList.length == 2) {
	            $scope.attachmentList[1].actionIconDelete = false;
	        }
	        $scope.attachmentList.splice(index, 1);
	    }
	};

    /*View log popup start*/
	var viewLogData = compareVersionLogFactory.getData();
	$scope.popupData = viewLogData.popupData;
	$scope.showCompareViewLogIcon = viewLogData.showIcon;

	var uniqueUploadedByVal = $scope.popupData.map(function (obj) { return obj; });
	uniqueUploadedByVal = uniqueUploadedByVal.filter(function (v, i) { return uniqueUploadedByVal.indexOf(v) == i; });
	$scope.uniqueUploadedByData = uniqueUploadedByVal;

	var uniqueStatus = $scope.popupData.map(function (obj) { return obj; });

	
	uniqueStatus = uniqueStatus.filter(function (v, i) { return uniqueStatus.indexOf(v) == i; });
	$scope.uniqueStatusData = uniqueStatus;

	$scope.viewLogPopupUrl = "shared/admin/setupManager/views/popupViewLog.html";
	$scope.showViewLogPopup = false;
	$scope.viewLogPopupShowCallback = function (e) {
	    $scope.showViewLogPopup = true;
	}

	$scope.selectStatusChange = function (selectStatus,index) {
	    $scope.uniqueStatusData[index].isChecked = selectStatus;
	}

	$scope.closeStatus = function () {
	 angular.element(document).triggerHandler('click');
	}

	$scope.applyStatus = function () {
	    angular.element(document).triggerHandler('click');
	}

	$scope.selectUploadChange = function (selectUpload, index) {
	    $scope.uniqueUploadedByData[index].isChecked = selectUpload;
	  
	}
	$scope.closeUpload = function () {
	    angular.element(document).triggerHandler('click');
	}

	$scope.applyUpload = function () {
	    angular.element(document).triggerHandler('click');
	}

	$scope.viewLogPopupHideCallback = function (e) {
	    $scope.showViewLogPopup = false;
	}

    /* Comments popup start */
	$scope.modulecurrentTab = 'requisition.html';
	$scope.withoutTabSelect = true;
	$scope.commentIcon = '#icon_Comments'; //icon_Commented
	$scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

	$scope.resetFilter = function (e) {
	   $scope.isApplyFilters = false;
       $scope.checkCurrentRoute = false;
	};

	
    
	$scope.showCommentsGridPopup = false;
	$scope.showCommentsGridPopupCallback = function (e) {
	    $scope.showCommentsGridPopup = true;
	};
	$scope.commentsGridPopUpOnHideCallback = function (e) {
	    $scope.showCommentsGridPopup = false;
	    $scope.commentIcon = '#icon_Commented'; //icon_Comments
	};
	$scope.commentList = [{
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "rutrum eu dui rutrum eu dui  rutrum eu dui rutrum eu dui.",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: true,
	    attachments: [{
	        filename: "lorem.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "rutrum eu dui rutrum eu dui. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: false,
	    attachments: [{
	        filename: "reprehenderit.xls"
	    }, {
	        filename: "velit.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: true,
	    attachments: [{
	        filename: "rutrum.xls"
	    }, {
	        filename: "dui.xls"
	    }, {
	        filename: "eu.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim .",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: false,
	    attachments: [{
	        filename: "consectetur.xls"
	    }, {
	        filename: "amet.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui.",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: false,
	    attachments: [{
	        filename: "lorem.xls"
	    }]
	}];
    /* Comments popup end */

    /* Manage columns start */
	$scope.manageColumns = function () {
	    $scope.fields = [];
	    $scope.fields = [{
	        'lable': 'Mandatory',
	        'selected': true
	    }, {
	        'lable': 'Dependent On',
	        'selected': true
	    }, {
	        'lable': 'Scheduled Start Date',
	        'selected': true
	    }, {
	        'lable': 'Scheduled End Date',
	        'selected': true
	    }, {
	        'lable': 'Assign To',
	        'selected': true
	    }, {
	        'lable': 'Status',
	        'selected': true
	    }, {
	        'lable': 'Last Worked By',
	        'selected': true
	    }];

	    $scope.noOfCol = parseInt(Math.round($scope.fields.length / 5));
	    $scope.colWidth = 200;
	    $scope.listHolderWidth = {
	        'width': $scope.noOfCol * $scope.colWidth + "px"
	    }
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

	    $scope.selectedCount = getSelectedCout($scope.fields);

	}
    //manage columns -- check all
	$scope.selectedAll = {
	    'selection': true
	}, $scope.splitsSelectedAll = {
	    'selection': false
	}, $scope.fillpartial = false, //$scope.isVisible = false;
	$scope.checkAll = function (aug) {
	    angular.forEach($scope.fields, function (field, key) {
	        $scope.fields[key].selected = aug;
	    });
	    if (aug === true) {
	        $scope.isVisible = true;
	        $scope.fillpartial = false;
	    } else {
	        $scope.isVisible = false;
	        $scope.fillpartial = false;
	    }
	    $scope.selectedCount = getSelectedCout($scope.fields);
	};

    //manage columns -- reset
	$scope.reset = function () {
	    $scope.selectedAll.selection = false;
	    $scope.fillpartial = false;
	    $scope.isVisible = false;
	    $scope.checkAll(false);
	    $scope.selectedCount = getSelectedCout($scope.fields);
	};

    //manage columns -- on change in list checkboxes
	$scope.onChange = function (obj) {
	    if (isAtleastOneSelected($scope.fields)) {
	        $scope.isVisible = true;
	        $scope.fillpartial = true;
	    } else {
	        $scope.isVisible = false;
	        $scope.fillpartial = false;
	        $scope.selectedAll.selection = false;
	    }
	    if (isAllSelected($scope.fields)) {
	        $scope.fillpartial = false;
	        $scope.selectedAll.selection = true;
	    }
	    $scope.selectedCount = getSelectedCout($scope.fields);
	}

    //manage columns -- global fn for get count
	function getSelectedCout(obj) {
	    var count = 0;
	    for (var i = 0; i < obj.length; i++) {
	        if (obj[i].selected === true) {
	            count++;
	        }
	    }
	    return count;
	}


    //manage columns -- global fn for at least on checkbox selection in list
	function isAtleastOneSelected(obj) {
	    for (var i = 0; i < obj.length; i++) {
	        if (obj[i].selected === true) {
	            return true;
	        }
	    }
	    return false;
	}

    //manage columns -- global fn for all checkboxes selection
	function isAllSelected(obj) {
	    for (var i = 0; i < obj.length; i++) {
	        if (!obj[i].selected) {
	            return false;
	        }
	    }
	    return true;
	}
    /* Manage columns end */

    /*Start: Sorting*/
	$scope.typeSortTaskNameIconTooltip = "Sort";

	$scope.sortTaskName = function (keyname) {
	    $scope.sortKey = keyname;
	    $scope.reverse = !$scope.reverse;
	    if ($scope.sortTaskNameIcon === 'icon_SortDescending') {
	        $scope.typeSortTaskNameIconTooltip = "Ascending";
	        $scope.sortTaskNameIcon = 'icon_SortAscending';
	    }
	    else {
	        $scope.sortTaskNameIcon = 'icon_SortDescending';
	        $scope.typeSortTaskNameIconTooltip = "Descending";
	    }
	};
    /*End: Sorting*/

    /*Start: Filter*/
	function getUniqueData(mainData) {
	    var colMandatory = [], colAssignTo = [], colStatus = [], uniqueMandatory = [], uniqueAssignTo = [], uniqueStatus = [];
        
	    getFilterData(mainData);
	    function getFilterData(mainData) {
	        angular.forEach(mainData, function (value, i) {
	            if (mainData[i].hasOwnProperty('data')) {
	                var data = mainData[i].data;
	                getFilterData(data);
	            }

	            if (mainData[i].hasOwnProperty('list')) {
	                var data = mainData[i].list;
	                getFilterData(data);
	            }

	            if (mainData[i].isListView) {
	                colMandatory.push(mainData[i].mandatory);

	                angular.forEach(mainData[i].assignTo.options, function (value, assignToInd) {
	                    colAssignTo.push(mainData[i].assignTo.options[assignToInd].name);
	                });

	                angular.forEach(mainData[i].status, function (value, statusInd) {
	                    colStatus.push(mainData[i].status[statusInd].name);
	                });
	            }
	        });
        }

	    $.each(colMandatory, function (i, el) {
	        if ($.inArray(el, uniqueMandatory) === -1) uniqueMandatory.push(el);
	    });

	    $.each(colAssignTo, function (i, el) {
	        if ($.inArray(el, uniqueAssignTo) === -1) uniqueAssignTo.push(el);
	    });

	    $.each(colStatus, function (i, el) {
	        if ($.inArray(el, uniqueStatus) === -1) uniqueStatus.push(el);
	    });

	    $scope.arrMandatory = uniqueMandatory;
	    $scope.arrAssignTo = uniqueAssignTo;
	    $scope.arrStatus = uniqueStatus;
	}
    /*End: Filter*/
    
    /*Start: Select All*/
	$scope.allCheck = {
	    isChecked: false,
	    partialFill: false
	};

	$scope.allChkOnChange = function (modelArg, dataArg) {
	    if (modelArg == true) {
	        angular.forEach(dataArg, function (value, i) {
	            if (dataArg[i].hasOwnProperty('isChecked')) {
	                dataArg[i].isChecked = true;
	            }

	            if (dataArg[i].hasOwnProperty('data')) {
	                var data = dataArg[i].data;
	                $scope.allChkOnChange(modelArg, data);
	            }

	            if (dataArg[i].hasOwnProperty('list')) {
	                var data = dataArg[i].list;
	                $scope.allChkOnChange(modelArg, data);
	            }
	        });
	    }
	    else {
	        angular.forEach(dataArg, function (value, i) {
	            if (dataArg[i].hasOwnProperty('isChecked')) {
	                dataArg[i].isChecked = false;
	            }
                
	            if (dataArg[i].hasOwnProperty('data')) {
	                var data = dataArg[i].data;
	                $scope.allChkOnChange(modelArg, data);
	            }

	            if (dataArg[i].hasOwnProperty('list')) {
	                var data = dataArg[i].list;
	                $scope.allChkOnChange(modelArg, data);
	            }
	        });
        }
	}

	$scope.dataLevelOnChange = function (modelArg, dataArg, levelArg, mainTaskDataArg) {
	    dataLevelSelectAll(modelArg, dataArg);
	    function dataLevelSelectAll(modelArg, dataArg){
	        if (modelArg == true) {
	            if (dataArg.hasOwnProperty('data')) {
	                angular.forEach(dataArg.data, function (value, i) {
	                    if (dataArg.data[i].hasOwnProperty('isChecked')) {
	                        dataArg.data[i].isChecked = true;
	                    }

	                    if (dataArg.data[i].hasOwnProperty('data')) {
	                        var data = dataArg.data[i].data;
	                        dataLevelSelectAll(modelArg, data);
	                    }

	                    if (dataArg.data[i].hasOwnProperty('list')) {
	                        angular.forEach(dataArg.data[i].list, function (value, l) {
	                            if (dataArg.data[i].list[l].hasOwnProperty('isChecked')) {
	                                dataArg.data[i].list[l].isChecked = true;
	                            }
	                        });
	                    }
	                });
	            }

	            if (dataArg.hasOwnProperty('list')) {
	                angular.forEach(dataArg.list, function (value, i) {
	                    if (dataArg.list[i].hasOwnProperty('isChecked')) {
	                        dataArg.list[i].isChecked = true;
	                    }
	                });
	            }
	        }
	        else {
	            if (dataArg.hasOwnProperty('data')) {
	                angular.forEach(dataArg.data, function (value, i) {
	                    if (dataArg.data[i].hasOwnProperty('isChecked')) {
	                        dataArg.data[i].isChecked = false;
	                    }

	                    if (dataArg.data[i].hasOwnProperty('data')) {
	                        var data = dataArg.data[i].data;
	                        dataLevelSelectAll(modelArg, data);
	                    }

	                    if (dataArg.data[i].hasOwnProperty('list')) {
	                        angular.forEach(dataArg.data[i].list, function (value, l) {
	                            if (dataArg.data[i].list[l].hasOwnProperty('isChecked')) {
	                                dataArg.data[i].list[l].isChecked = false;
	                            }
	                        });
	                    }
	                });
	            }

	            if (dataArg.hasOwnProperty('list')) {
	                angular.forEach(dataArg.list, function (value, i) {
	                    if (dataArg.list[i].hasOwnProperty('isChecked')) {
	                        dataArg.list[i].isChecked = false;
	                    }
	                });
	            }
	        }
	    }
	}
    /*End: Select All*/
};