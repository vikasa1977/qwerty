angular.module('SMART2')
    .controller('adminItemMasterNewCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$state', '$timeout', '$sce', '$smartModal', adminItemMasterNewCtrlFunc])
    .controller('adminItemMasterAttachmentCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', adminItemMasterAttachmentCtrlFunc])
    .controller('adminItemMasterSupplierCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', adminItemMasterSupplierCtrlFunc])
    .controller('adminItemMasterManufacturerCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', adminItemMasterManufacturerCtrlFunc])
    .controller('adminItemMasterNotesCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', '$smartModal', adminItemMasterNotesCtrlFunc])
    .controller('adminItemMasterUOMCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', adminItemMasterUOMCtrlFunc])
    .controller('adminItemMasterBuCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', adminItemMasterBuCtrlFunc])
    .controller('adminItemMasterCatagoryCtrl', ['$scope', '$timeout', '$state', '$http', 'notification', adminItemMasterCatagoryCtrlFunc])
    .controller('adminItemMasterAdditionalInformationCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$window', '$state', '$timeout', '$sce', adminItemMasterAdditionalInformationCtrlFunc])

    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    });


function adminItemMasterAttachmentCtrlFunc($scope, $rootScope, RuleEngine, $http, $timeout, $sce) {
    
    $scope.attachments = [
         {
             name: "Dell",
             location: "All",
             status: "Active",
             ContractNumber: "000434154354674",
             BlanketNumber:"",
             BusinessUnit: "BU 1",
             Facility: "All"

         },
         {
             name: "Apple",
             location: "All",
             status: "Inactive",
             ContractNumber: "000435262354524",
             BlanketNumber: "000435262354674",
             BusinessUnit: "BU 2",
             Facility: "BER"
         },
         {
             name: "Microsoft",
             location: "All",
             status: "Active",
             ContractNumber: "000435262354674",
             BlanketNumber: "000435262354674",
             BusinessUnit: "BU 3",
             Facility: "SUN"
         },
         {
             name: "Apple",
             location: "All",
             status: "Inactive",
             ContractNumber: "",
             BlanketNumber: "000435262354674",
             BusinessUnit: "BU 4",
             Facility: "BER"
         }
    ];

    $scope.manufacturers = [
         {
             name: "Dell",
             ModelNumber: "000434154354674",
             PartNumber: "000435262354674",
             status: "Active",

         },
         {
             name: "Apple",
             ModelNumber: "000434154354674",
             PartNumber: "000435262354674",
             status: "Inactive",
         },
         {
             name: "Microsoft",
             ModelNumber: "000434154354674",
             PartNumber: "000435262354674",
             status: "Active",
         },
         {
             name: "Dell",
             ModelNumber: "000434154354674",
             PartNumber: "000435262354674",
             status: "Inactive",
         }
    ];

    $scope.relaedItems = [
         {
             Itemsname: "Parent",
             itemRelNumber: "000434154354674",
             itemDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
             status: "Active",

         },
         {
             Itemsname: "Component",
             itemRelNumber: "000434154354674",
             itemDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
             status: "Active",
         },
         {
             Itemsname: "Substitute",
             itemRelNumber: "000434154354674",
             itemDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
             status: "Inactive",
         },
         {
             Itemsname: "Parent",
             itemRelNumber: "000434154354674",
             itemDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
             status: "Active",
         }
    ];

    $scope.supportedUOM = [
         {
             UOMName: "Each",
             UOMCode: "000434154354674",
             Quantity: "15",
         },
         {
             UOMName: "Boxes",
             UOMCode: "000434154354674",
             Quantity: "25",
         },
         {
             UOMName: "kilo",
             UOMCode: "000434154354674",
             Quantity: "35",

         },
         {
             UOMName: "Meter",
             UOMCode: "000434154354674",
             Quantity: "45",
         }
    ];
}

function adminItemMasterNewCtrlFunc($scope, $rootScope, RuleEngine, $http, $state, $timeout, $sce, $smartModal) {
    
    $scope.itemDetailPOTabDataset = [
		{ "title": "Organization Business Unit", "contentUrl": "shared/admin/itemMaster/views/BusinessUnit.html", "active": true },
		{ "title": "Organization Plant", "contentUrl": "shared/admin/itemMaster/views/Facility.html" }
    ];

    $scope.typeOptions = [
          {
              "UserId": 28360,
              "UserName": "SRUser1@outlook.com",
              "FirstName": "John",
              "LastName": "Doe"
          }, {
              "UserId": 28977,
              "UserName": "SRUser1@outlook.com11",
              "FirstName": "Pawan",
              "LastName": "Singh"
          }, {
              "UserId": 28978,
              "UserName": "SRUser1@outlook.com234",
              "FirstName": "Apurva",
              "LastName": "Chi"
          }, {
              "UserId": 28979,
              "UserName": "SRUser1@outlook.com342",
              "FirstName": "Mayur",
              "LastName": "Gadekar"
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
    $scope.selectedLegalEntity = $scope.typeOptions[0];
    $scope.selectedCreateOnBehalf = $scope.typeOptions[0];

    var adminItemMaster = {
		method: 'GET',
		url: 'shared/admin/itemMaster/models/admin_Item_Master_data.json'
	};
	$http(adminItemMaster).then(function (response) {

		$scope.dataModel = response.data.dataModel;
		$scope.config = response.data.formConfig;

		$scope.orgBuConfig = response.data.orgBuConfig;
		$scope.orgBuModel = response.data.orgBuModel;

		$scope.orgPlantConfig = response.data.orgPlantConfig;
		$scope.orgPlantModel = response.data.orgPlantModel;

		$scope.$watch('dataModel', function (n, o) {
			console.log(n);
		}, true);
	},

    function (error) {
		console.log(JSON.stringify(error));
    });

    /* Line Items manage columns start */
	$scope.closeDropDialogs = function () {
	    angular.element(document).click();
	}
    
	$scope.fields = [];
	$scope.manageColumns = function (activeTab) {
	    $scope.fields = [];
	    if (activeTab == 'bu') {
            $scope.fields = [{
	            'lable': 'Business Unit'
	        }, {
	            'lable': 'Currency'
	        }, {
	            'lable': 'Standard Price'
	        }, {
	            'lable': 'Moving Average price'
	        }, {
	            'lable': 'Maximum Order Quantity'
	        }, {
	            'lable': 'Maximum Order Quantity'
	        }, {
	            'lable': 'Branding Quantity'
	        }, {
	            'lable': 'Account Code 1'
	        }, {
	            'lable': 'Account Code 2'
	        } ];
	    } else {
	        $scope.fields = [{
	            'lable': 'Plant'
	        }, {
	            'lable': 'Facility'
	        }, {
	            'lable': 'Repairable Type'
	        }, {
	            'lable': 'Quarter Level'
	        }, {
	            'lable': 'Related Item Keywords'
	        }, {
	            'lable': 'Stockable'
	        }, {
	            'lable': 'Branding Quantity'
	        }, {
	            'lable': 'Account Code 1'
	        }, {
	            'lable': 'Account Code 2'
	        }];
	    }



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

    //line -- manage columns -- check all
	$scope.selectedAll = { 'selection': false }, $scope.splitsSelectedAll = { 'selection': false }, $scope.fillpartial = false, $scope.isVisible = false;
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

    //line -- manage columns -- reset
	$scope.reset = function () {
	    $scope.selectedAll.selection = false;
	    $scope.fillpartial = false;
	    $scope.isVisible = false;
	    $scope.checkAll(false);
	    $scope.selectedCount = getSelectedCout($scope.fields);

	};

    //line -- manage columns -- on change in list checkboxes
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

    //line -- manage columns -- global fn for get count
	function getSelectedCout(obj) {
	    var count = 0;
	    for (var i = 0; i < obj.length; i++) {
	        if (obj[i].selected === true) {
	            count++;
	        }
	    }
	    return count;
	}


    //line -- manage columns -- global fn for at least on checkbox selection in list
	function isAtleastOneSelected(obj) {
	    for (var i = 0; i < obj.length; i++) {
	        if (obj[i].selected === true) {
	            return true;
	        }
	    }
	    return false;
	}

    //line -- manage columns -- global fn for all checkboxes selection
	function isAllSelected(obj) {
	    for (var i = 0; i < obj.length; i++) {
	        if (!obj[i].selected) {
	            return false;
	        }
	    }
	    return true;
	}
    /* Line Items manage columns end */

	$scope.showUploadContractPopup = false;
	$scope.adduploadContractCallback = function (e) {
	    $scope.showUploadContractPopup = true;
	}
	$scope.hideUploadContractPopupCallback = function (e) {
	    $scope.showUploadContractPopup = false;
	}

    // Start: Upload events
	$scope.attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
		<br />Limited to file(s) of 10MB each.\
		<br /> Maximum 5 files can be uploaded.";
	$scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
	$scope.attchmentMsg = $scope.attachmentMsg;
	$scope.uploadTitle = "ADD ATTACHMENTS";
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
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentThree.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentFour.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
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
	};

	$scope.retryCall = function (el) {
	    el.status = "success";
	};
	$scope.removeRow = function (el) {
	    // remove the row specified in index
	    if ($scope.attachmentList.length > 1) {
	        if ($scope.attachmentList.length == 2) {
	            $scope.attachmentList[1].actionIconDelete = false;
	        }
	        $scope.attachmentList.splice(index, 1);
	    }
	};
    // End: Upload events

	$smartModal.initModal({
	    templateUrl: "shared/popup/views/popupUploadDoc.html",
	    show: "showUploadContractPopup",
	    onHide: "hideUploadContractPopupCallback()",
	    $scope: $scope
	});


	//$scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive

	    // UI Grid -- popup callback -- category papup

	//    if (def.col && def.col.displayName == 'Category') {
	//        $scope.treeOpenCallback('category');
	//    }
	//}

	//$scope.gridOptions.onRegisterApi = function (gridApi) {
	//    $scope.gridApi = gridApi;
	//    gridApi.selection.on.rowSelectionChanged($scope, callbackFunction);
	//    gridApi.selection.on.rowSelectionChangedBatch($scope, callbackFunction);
	//}

}

function adminItemMasterBuCtrlFunc($scope) {

    $scope.BusinessUnit =
         [
		  {
		      "name": "Business unit 0",
		      "check": true,
		      "value": [
                {
                    "name": "Business unit child-0",
                    "check": true,
                    "value": [
                      {
                          "name": "Business unit grand-child-0",
                          "check": true
                      },
                      {
                          "name": "Business unit grand-child-1",
                          "check": true
                      },
                      {
                          "name": "Business unit grand-child-2",
                          "check": true
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

    $scope.showFormC = false;


    $scope.getCheckedCount = function () {

        var count = 0,
            getValues = $scope.BusinessUnit[0].value;
        angular.forEach(getValues, function (getValue) {
            count += getValue.check ? 1 : 0;
        });
        return count;

    };

    $scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
    $scope.showFormBU = true;
    $scope.BUDatainitialDisplayText = 'IT & Infra' + ' +' + $scope.getCheckedCount() + ' More';

};

function adminItemMasterCatagoryCtrlFunc($scope, $timeout, $state, $http, notification) {
    // Start: CBR
    var tempCategoryNode_PAS = [];

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

    var categoryObj;

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/category.json'
    };

    var currentType = '';
    $scope.treeOpenCallback = function (type) {

        $scope.treeComponentConfig.requestParameter = {
            navigationContext: "PAS"
        };
        currentType = type;
        $http(categoryData).then(function (response) {

            categoryObj = response.data;
            $scope.treeComponentConfig.data = categoryObj;
            $scope.treeComponentConfig.title = 'Category';
            $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
        });
        $scope.showTreePopup = true;
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

    $scope.selectedCategoriesValidate = false;

    $scope.selectedCategoryNodes = [];

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
        }
        $scope.showTreePopup = false;
    };
    // End: CBR
}

function adminItemMasterAdditionalInformationCtrlFunc($scope, $rootScope, RuleEngine, $http, $window, $state, $timeout, $sce) {
    /* Additional information  */

    $scope.idIs = $state.params.id;
    var additionalInfo = {
        method: 'GET',
        url: 'shared/admin/itemMaster/models/admin_Item_Master_data.json'
    };

    $http(additionalInfo).then(function (response) {
        $scope.data = response.data;
        $scope.dataModel = $scope.data.additionalInfo.data;
        $scope.lineviewData = $scope.data.LineLeveladditionalInfo;
        if ($state.current.name == 'admin.itemMaster.additionalInfo') {
            $scope.lineviewData[0].showContent = true;
            $scope.isAdditionalInfoPage = true;
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    });





    $scope.sectionName = "ADDITIONAL INFORMATION"

    $scope.fieldCount = function (paramUse) {

        var count = 0;
        angular.forEach(paramUse, function (k, v) {
            count += paramUse[v].questions.length;
        });
        return count;
    }


    $scope.returnColClass = function (que) {


        var q = que.question;



        if (q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" || q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" && q == "") {
            return "s12 m6 l4 xl4 xxl4";
        }
        else if (q.length >= 21 && q.length <= 40 && que.type != "multi-text" && que.type != "multi-text-with-icon") {
            return "s12 m12 l6 xl6 xxl6";
        }
        else {
            return "s12";
        }
    }




    // side bar -- dynamic scrolling
    $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
    angular.element($window).bind('resize', function (e) {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        $scope.$apply();
    });

    angular.element($window).bind('scroll', function () {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }
        $scope.$apply();
    });


    //left panel selection link
    $scope.currentSelected = 0;
    $scope.selectedItem = function (index) {

        angular.forEach($scope.lineviewData, function (value, key) {
            $scope.lineviewData[key].showContent = false;
        });

        $scope.currentSelected = index;
        $scope.lineviewData[index].showContent = true;
    }



    // right side content height
    $scope.contHeight = function (fixedSubHeader) {
        if (fixedSubHeader) {

            return $window.innerHeight - 50
        }
        else {

            return $window.innerHeight - 114
        }

    };

    // sidebar -- show hide button interaction
    $scope.isActive = false;
    $scope.activeButton = function () {
        $scope.isActive = !$scope.isActive;
    }


    // side bar interaction for less than 1200px
    $scope.isActiveSideBar = true;
    angular.element($window).bind('resize', function (e) {
        if ($window.innerWidth >= 1199) {
            $scope.isActiveSideBar = true;
        } else {
            $scope.isActiveSideBar = false;
        }
    });


    /* Additional information  end */

    /*search */
    $scope.focusSearchC = false;
    $scope.isActiveC = false;
    $scope.showMeC = false;
    $scope.showSearchC = function () {
        $scope.isActiveC = true;
        $scope.focusSearchC = true;
        $scope.showMeC = true;
        $scope.hideCloseC = true;
    };
    $scope.hideSearchC = function () {
        $scope.isActiveC = false;
        $scope.focusSearchC = false;
        $scope.hideCloseC = false;
    };

    $scope.getFieldType = function (getFieldType) {
        switch (getFieldType) {
            case 'numeric':
                return 'number'
                break;
            default:
                return 'text'
                break;
        }
    }

    $scope.returnField = function (fieldType) {

        switch (fieldType) {
            case 'single-text':
            case 'numeric':
                return 'single-text.html'
                break;
            case 'multi-text':
                return 'multi-text.html'
                break;
            case 'multi-text-with-icon':
                return 'multi-text-with-icon.html'
                break;
            case 'single-response-radio':
                return 'single-response-radio.html'
                break;
            case 'single-response-drop':
                return 'single-response-drop.html'
                break;
            case 'multi-response':
                return 'multi-response.html'
                break;
            case 'date-time':
                return 'date-time.html'
                break;
            case 'multi-text-format':
                return 'multi-text-format.html'
                break;

            case 'attachment-only':
                return 'attachment-only.html'
                break;
            case 'multi-numeric':
                return 'multi-numeric.html'
                break;
            case "grid-type-text":
            case "grid-type-combination":
            case "grid-type-wrow-combination":
                return 'grid-type-combination.html'
                break;
            case "list-box":
                return 'list-box.html'
        }
    }

    // upload Attachment


    var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
    $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
    // Start: Add guideline popup
    $scope.addDocumentPoupUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.addDocumentPopup = false;

    $scope.addDocumentPopupCallback = function (data) {
        //if (!$scope.supplierView) {

        $scope.uploadTitle = "ADD ATTACHMENT";
        $scope.uploadTitleContent = "Upload Attachments";
        $scope.addDocumentPopup = true;
        //}
        //if ($scope.supplierView) {
        data.isVisible = true;
        //}
    }
    $scope.hideAddDocumentPopupCallback = function () {
        $scope.addDocumentPopup = false;
    };
    // Start: Upload events
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
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentThree.xls",
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentFour.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
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

    };
    $scope.retryCall = function (el) {
        el.status = "success";
    };
    // End: Upload events
};

function adminItemMasterSupplierCtrlFunc($scope, $rootScope, RuleEngine, $http, $timeout, $sce) {
    var itemMasterSupplierData = {
        method: 'GET',
        url: 'shared/admin/itemMaster/models/supplier_data.json'
    };

    $scope.supplierData = [];

    $http(itemMasterSupplierData).then(function (response) {
        $scope.supplierData = response.data.supplierData;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    //Start: Callout text field focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };
    //End: Callout text field focus

    //Start: Pagination
    $scope.supplierCurrentPage = 1;
    //End: Pagination

    //Start: Add Row
    var supplierNewElement = {
        "highlight": true,
        "bu": {
            "selectedOption": {
                "name": "BU1"
            },
            "options": [
              {
                  "name": "BU1"
              },
              {
                  "name": "BU2"
              },
              {
                  "name": "BU3"
              }
            ],
            "selectTypeOption": {
                "selectiontext": "BU1"
            }
        },
        "facility": {
            "selectedOption": {
                "name": "ALL"
            },
            "options": [
              {
                  "name": "ALL"
              },
              {
                  "name": "BER"
              },
              {
                  "name": "SUN"
              }
            ],
            "selectTypeOption": {
                "selectiontext": "ALL"
            }
        },
        "supplier": {
            "selectedOption": {
                "name": "Evertek Inc"
            },
            "options": [
              {
                  "name": "Evertek Inc"
              },
              {
                  "name": "General Electrical"
              },
              {
                  "name": "Crompton Greaves"
              }
            ],
            "selectTypeOption": {
                "selectiontext": "Evertek Inc"
            }
        },
        "supLocation": {
            "id": 0,
            "name": "All"
        },
        "supLocationOpt": [
          {
              "id": 0,
              "name": "All"
          },
          {
              "id": 1,
              "name": "Mumbai"
          },
          {
              "id": 2,
              "name": "Hyderabad"
          },
          {
              "id": 3,
              "name": "Pune"
          },
          {
              "id": 4,
              "name": "Bangalore"
          }
        ],
        "status": {
            "id": 0,
            "name": "Preferred"
        },
        "statusOpt": [
          {
              "id": 0,
              "name": "Preferred"
          },
          {
              "id": 1,
              "name": "Contracted"
          },
          {
              "id": 2,
              "name": "Soul Sourced"
          }
        ],
        "conNum": {
            "number": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "this.length.toString() < 1",
                  "error": "Enter some value"
              },
              {
                  "rule": "this.length.toString() < 2",
                  "error": "Length should greater than 2"
              }
            ]
        },
        "blanketNum": {
            "number": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "!(/[0-9]/.test(this))",
                  "error": "Need atleast a number"
              },
              {
                  "rule": "(/^[0]$/.test(this))",
                  "error": "Number should greater than 0"
              }
            ]
        }
    };
    var storeNewSupItem;
    $scope.supplierAddRowCallback = function () {
        storeNewSupItem = angular.copy(supplierNewElement);
        $scope.supplierData.unshift(storeNewSupItem);
        (function (storeNewSupItem) {
            $timeout(function () {
                storeNewSupItem.highlight = false;
            }, 5000)
        })(storeNewSupItem);
    }
    //End: Add Row
}

function adminItemMasterManufacturerCtrlFunc($scope, $rootScope, RuleEngine, $http, $timeout, $sce) {
    var itemMasterManufacturerData = {
        method: 'GET',
        url: 'shared/admin/itemMaster/models/manufacturer_data.json'
    };

    $scope.manufacturerData = [];

    $http(itemMasterManufacturerData).then(function (response) {
        $scope.manufacturerData = response.data.manufacturerData;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    //Start: Callout text field focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };
    //End: Callout text field focus

    //Start: Pagination
    $scope.mfrCurrentPage = 1;
    //End: Pagination

    //Start: Select All or Partial
    $scope.mfrSelectAll = false;
    $scope.mfrPartiallyFill = false;
    var mfrListCounter;

    function mfrSelectAllPartialFunc() {
        mfrListCounter = 0;
        angular.forEach($scope.manufacturerData, function (value, key) {
            if ($scope.manufacturerData[key].isChecked) {
                mfrListCounter++;
            }
        });

        if ($scope.manufacturerData.length == mfrListCounter) {
            $scope.mfrSelectAll = true;
            $scope.mfrPartiallyFill = false;
        }
        else if (mfrListCounter > 0) {
            $scope.mfrSelectAll = false;
            $scope.mfrPartiallyFill = true;
        }
        else {
            $scope.mfrSelectAll = false;
            $scope.mfrPartiallyFill = false;
        }
    }

    $scope.mfrListChanged = function (changedObj) {
        mfrSelectAllPartialFunc();
    }

    $scope.mfrSelectAllChanged = function (selectAllStatus) {
        $scope.mfrPartiallyFill = false;
        if (selectAllStatus) {
            angular.forEach($scope.manufacturerData, function (value, key) {
                $scope.manufacturerData[key].isChecked = true;
            });
        }
        else {
            angular.forEach($scope.manufacturerData, function (value, key) {
                $scope.manufacturerData[key].isChecked = false;
            });
        }
    }
    //End: Select All or Partial

    //Start: Add Row
    var manufacturerNewElement = {
        "highlight": true,
        "isChecked": false,
        "isActive": false,
        "mfrName": {
            "name": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "this.length.toString() < 1",
                  "error": "Enter some value"
              },
              {
                  "rule": "this.length.toString() < 2",
                  "error": "Length should greater than 2"
              }
            ]
        },
        "modelNum": {
            "number": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "this.length.toString() < 1",
                  "error": "Enter some value"
              },
              {
                  "rule": "this.length.toString() < 2",
                  "error": "Length should greater than 2"
              }
            ]
        },
        "partNum": {
            "number": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "!(/[0-9]/.test(this))",
                  "error": "Need atleast a number"
              },
              {
                  "rule": "(/^[0]$/.test(this))",
                  "error": "Number should greater than 0"
              }
            ]
        }
    };
    var storeNewMFRItem;
    $scope.mfrAddRowCallback = function () {
        storeNewMFRItem = angular.copy(manufacturerNewElement);
        $scope.manufacturerData.unshift(storeNewMFRItem);
        (function (storeNewMFRItem) {
            $timeout(function () {
                storeNewMFRItem.highlight = false;
            }, 5000)
        })(storeNewMFRItem);
    }
    //End: Add Row

    //Start: Delete Row
    $scope.mfrDeleteRowCallback = function (currSection) {
        if ($scope.mfrPartiallyFill == true || $scope.mfrSelectAll == true) {
            for (var m = 0; m < $scope.manufacturerData.length; m++) {
                if ($scope.manufacturerData[m].isChecked) {
                    $scope.manufacturerData.splice(m, 1);
                    m--;
                }
            }
        }
    }
    //End: Delete Row

    $scope.$watch('manufacturerData', function (newValue, oldValue) {
        mfrSelectAllPartialFunc();
    }, true);
}

function adminItemMasterNotesCtrlFunc($scope, $rootScope, RuleEngine, $http, $timeout, $sce, $smartModal) {
    var itemMasterNotesData = {
        method: 'GET',
        url: 'shared/admin/itemMaster/models/notes_data.json'
    };

    $scope.notesData = [];

    $http(itemMasterNotesData).then(function (response) {
        $scope.notesData = response.data.notesData;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    /*Start upload popup*/
    $scope.showUploadContractPopup = false;
    $scope.attchUploadPopupCallback = function (iconObj) {
        $scope.showUploadContractPopup = true;
        iconObj.uploadIcon = "icon_Attachment";
        iconObj.uploadTooltip = $scope.attachmentList.length + " Attachments"
    }
    $scope.hideUploadContractPopupCallback = function (e) {
        $scope.showUploadContractPopup = false;
    }

    $smartModal.initModal({
        templateUrl: "shared/popup/views/popupUploadDoc.html",
        show: "showUploadContractPopup",
        onHide: "hideUploadContractPopupCallback()",
        $scope: $scope
    });

    // Start: Upload events
    $scope.attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
		<br />Limited to file(s) of 10MB each.\
		<br /> Maximum 5 files can be uploaded.";
    $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
    $scope.attchmentMsg = $scope.attachmentMsg;

    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.attachFlag = false;
    $scope.rowsToShowOpts = [
{ 'size': '5' },
{ 'size': '10' }];
    $scope.defaultOption = { 'size': '5' };

    $scope.selectedOption = { 'size': '5' };
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
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentThree.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentFour.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
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
    };

    $scope.retryCall = function (el) {
        el.status = "success";
    };
    $scope.removeRow = function (el) {
        // remove the row specified in index
        if ($scope.attachmentList.length > 1) {
            if ($scope.attachmentList.length == 2) {
                $scope.attachmentList[1].actionIconDelete = false;
            }
            $scope.attachmentList.splice(index, 1);
        }
    };
    // End: Upload events
    /*End upload popup*/

    //Start: Callout text field focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };
    //End: Callout text field focus

    //Start: Pagination
    $scope.notesCurrentPage = 1;
    //End: Pagination

    //Start: Select All or Partial
    $scope.notesSelectAll = false;
    $scope.notesPartiallyFill = false;
    var notesListCounter;

    function notesSelectAllPartialFunc() {
        notesListCounter = 0;
        angular.forEach($scope.notesData, function (value, key) {
            if ($scope.notesData[key].isChecked) {
                notesListCounter++;
            }
        });

        if ($scope.notesData.length == notesListCounter) {
            $scope.notesSelectAll = true;
            $scope.notesPartiallyFill = false;
        }
        else if (notesListCounter > 0) {
            $scope.notesSelectAll = false;
            $scope.notesPartiallyFill = true;
        }
        else {
            $scope.notesSelectAll = false;
            $scope.notesPartiallyFill = false;
        }
    }

    $scope.notesListChanged = function (changedObj) {
        notesSelectAllPartialFunc();
    }

    $scope.notesSelectAllChanged = function (selectAllStatus) {
        $scope.notesPartiallyFill = false;
        if (selectAllStatus) {
            angular.forEach($scope.notesData, function (value, key) {
                $scope.notesData[key].isChecked = true;
            });
        }
        else {
            angular.forEach($scope.notesData, function (value, key) {
                $scope.notesData[key].isChecked = false;
            });
        }
    }
    //End: Select All or Partial

    //Start: Add Row
    var notesNewElement = {
        "highlight": true,
        "isChecked": false,
        "uploadIcon": "icon_Upload",
        "uploadTooltip": "Upload",
        "notesName": {
            "name": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "this.length.toString() < 1",
                  "error": "Enter some value"
              },
              {
                  "rule": "this.length.toString() < 2",
                  "error": "Length should greater than 2"
              }
            ]
        },
        "bu": {
            "selectedOption": {
                "name": "ALL"
            },
            "options": [
              {
                  "name": "ALL"
              },
              {
                  "name": "BU1"
              },
              {
                  "name": "BU2"
              },
              {
                  "name": "BU3"
              }
            ],
            "selectTypeOption": {
                "selectiontext": "ALL"
            }
        },
        "classification": {
            "id": 0,
            "name": "S&P"
        },
        "classificationOpt": [
          {
              "id": 0,
              "name": "S&P"
          },
          {
              "id": 1,
              "name": "D&G"
          },
          {
              "id": 2,
              "name": "Q&C"
          },
          {
              "id": 3,
              "name": "P&T"
          }
        ],
        "internalChk": false,
        "editableChk": false,
        "includeOn": {
            "id": 0,
            "name": "PO"
        },
        "includeOnOpt": [
          {
              "id": 0,
              "name": "PO"
          },
          {
              "id": 1,
              "name": "BPO"
          },
          {
              "id": 2,
              "name": "KPO"
          },
          {
              "id": 3,
              "name": "TPO"
          }
        ]
    };
    var storeNewNotesItem;
    $scope.notesAddRowCallback = function () {
        storeNewNotesItem = angular.copy(notesNewElement);
        $scope.notesData.unshift(storeNewNotesItem);
        (function (storeNewNotesItem) {
            $timeout(function () {
                storeNewNotesItem.highlight = false;
            }, 5000)
        })(storeNewNotesItem);
    }
    //End: Add Row

    //Start: Delete Row
    $scope.notesDeleteRowCallback = function (currSection) {
        if ($scope.notesPartiallyFill == true || $scope.notesSelectAll == true) {
            for (var n = 0; n < $scope.notesData.length; n++) {
                if ($scope.notesData[n].isChecked) {
                    $scope.notesData.splice(n, 1);
                    n--;
                }
            }
        }
    }
    //End: Delete Row

    $scope.$watch('notesData', function (newValue, oldValue) {
        notesSelectAllPartialFunc();
    }, true);
}

function adminItemMasterUOMCtrlFunc($scope, $rootScope, RuleEngine, $http, $timeout, $sce) {
    var itemMasterUOMData = {
        method: 'GET',
        url: 'shared/admin/itemMaster/models/uom_data.json'
    };

    $scope.uomData = [];

    $http(itemMasterUOMData).then(function (response) {
        $scope.uomData = response.data.uomData;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    //Start: Callout text field focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };
    //End: Callout text field focus

    //Start: Pagination
    $scope.uomCurrentPage = 1;
    //End: Pagination

    //Start: Select All or Partial
    $scope.uomSelectAll = false;
    $scope.uomPartiallyFill = false;
    var uomListCounter;

    function uomSelectAllPartialFunc() {
        uomListCounter = 0;
        angular.forEach($scope.uomData, function (value, key) {
            if ($scope.uomData[key].isChecked) {
                uomListCounter++;
            }
        });

        if ($scope.uomData.length == uomListCounter) {
            $scope.uomSelectAll = true;
            $scope.uomPartiallyFill = false;
        }
        else if (uomListCounter > 0) {
            $scope.uomSelectAll = false;
            $scope.uomPartiallyFill = true;
        }
        else {
            $scope.uomSelectAll = false;
            $scope.uomPartiallyFill = false;
        }
    }

    $scope.uomListChanged = function (changedObj) {
        uomSelectAllPartialFunc();
    }

    $scope.uomSelectAllChanged = function (selectAllStatus) {
        $scope.uomPartiallyFill = false;
        if (selectAllStatus) {
            angular.forEach($scope.uomData, function (value, key) {
                $scope.uomData[key].isChecked = true;
            });
        }
        else {
            angular.forEach($scope.uomData, function (value, key) {
                $scope.uomData[key].isChecked = false;
            });
        }
    }
    //End: Select All or Partial

    //Start: Add Row
    var uomNewElement = {
        "highlight": true,
        "isChecked": false,
        "convRate": {
            "number": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "!(/[0-9]/.test(this))",
                  "error": "Need atleast a number"
              },
              {
                  "rule": "(/^[0]$/.test(this))",
                  "error": "Number should greater than 0"
              }
            ]
        },
        "measure": {
            "id": 0,
            "name": "Each"
        },
        "measureOpt": [
          {
              "id": 0,
              "name": "Each"
          },
          {
              "id": 1,
              "name": "Pack"
          },
          {
              "id": 2,
              "name": "Pieces"
          },
          {
              "id": 3,
              "name": "Unit"
          }
        ],
        "bestMeasure": {
            "id": 0,
            "name": "Each"
        },
        "bestMeasureOpt": [
          {
              "id": 0,
              "name": "Each"
          },
          {
              "id": 1,
              "name": "Pack"
          },
          {
              "id": 2,
              "name": "Pieces"
          },
          {
              "id": 3,
              "name": "Unit"
          }
        ],
        "unitPrice": {
            "number": "",
            "errorMsg": "",
            "validateRule": [
              {
                  "rule": "!(/[0-9]/.test(this))",
                  "error": "Need atleast a number"
              },
              {
                  "rule": "(/^[0]$/.test(this))",
                  "error": "Number should greater than 0"
              }
            ]
        }
    };
    var storeNewUOMItem;
    $scope.uomAddRowCallback = function () {
        storeNewUOMItem = angular.copy(uomNewElement)
        $scope.uomData.unshift(storeNewUOMItem);
        (function (storeNewUOMItem) {
            $timeout(function () {
                storeNewUOMItem.highlight = false;
            }, 5000)
        })(storeNewUOMItem);
    }
    //End: Add Row

    //Start: Delete Row
    $scope.uomDeleteRowCallback = function (currSection) {
        if ($scope.uomPartiallyFill == true || $scope.uomSelectAll == true) {
            for (var u = 0; u < $scope.uomData.length; u++) {
                if ($scope.uomData[u].isChecked) {
                    $scope.uomData.splice(u, 1);
                    u--;
                }
            }
        }
    }
    //End: Delete Row

    $scope.$watch('uomData', function (newValue, oldValue) {
        uomSelectAllPartialFunc();
    }, true);
}