(function (angular) {
    'use strict';
    angular
		.module('SMART2')
		.controller('supplierNewCtrl', ['$scope', '$http', '$timeout', 'routeSvc', 'notification', supplierNewCtrlFunc])
		.controller('supplierCreationController', ['$scope', 'routeSvc', '$http', function ($scope, routeSvc, $http) {

		    /* ADD  POPUP */
		    $scope.sourceData = {
		        "selectedOption": "",
		        "options": [{ "title": "Sole" }, { "title": "Single" }, { "title": "Group" }]
		    }
		    $scope.supplierPopupUrl = "shared/quickAddSupplier/views/similarSupplier.html";
		    $scope.showsupplierPopup = false;
		    $scope.showsupplierPopupCallback = function (e) {
		        $scope.showsupplierPopup = true;
		    };
		    $scope.supplierPopUpOnHideCallback = function () {
		        $scope.showsupplierPopup = false;
		    };

		    $scope.profileLink = function (data) {
		        $scope.showsupplierPopup = false;
		        routeSvc.stateTo('supplier.profile', { "pagefor": data });
		    };

		    $scope.onChange = function (selectedDocType) {
		        console.log(selectedDocType);
		    };

		    /* Cat Popup scope declaration*/
		    $scope.additionalFormData = [{
		        "name": "IT Security Information",
		        "check": false
		    },
			{
			    "name": "Audit Test",
			    "check": false
			},
			{
			    "name": "Contract Request form",
			    "check": false
			},
			{
			    "name": "Certification update",
			    "check": false
			},
			{
			    "name": "Procurement details",
			    "check": false
			},
			{
			    "name": "Financial information",
			    "check": false
			},
			{
			    "name": "FCPA",
			    "check": false
			},
			{
			    "name": "Environmental performance",
			    "check": false
			},
			{
			    "name": "Security Assessment",
			    "check": false
			}];

		    $scope.categorymanagerDisplayText = 'Choose Category Manager';
		    $scope.showCM = false;
		    $scope.categorymanagerOpt = [];
		    $scope.categorymanagerData = [
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
		  }];

			$scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
			$scope.smartCatPopupSingleLevel = "shared/popup/views/smartCatPopupSingleLevel.html";
			$scope.additionalFormPopUpOnHideCallback = function () { }
			$scope.initialDisplayText = 'Additional Forms';
			$scope.showForm = false;
			$scope.supplierminitialDisplayText = 'Supplier Managers';
			$scope.showFormSM = false;
			$scope.suppliermDataRead = [{
				"name": "Carissa Madden",
				"check": true
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
		  },
		  {
		      "name": "Leah Moses",
		      "check": true
		  }]
		    $scope.suppliermData = [
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
		    $scope.categoryDataRead = [{
		        "name": "IT/TELECOM",
		        "check": true,
		        "value": [
				  {
				      "name": "IT HARDWARE",
				      "check": true,
				      "value": [
                        {
                            "name": "COMPUTERS - LAPTOPS",
                            "check": true
                        },
                        {
                            "name": "COMPUTERS - DESKTOPS",
                            "check": true
                        },
                        {
                            "name": "COMPUTERS - PERIPHERALS",
                            "check": true
                        }
				      ]
				  }
		        ]
		    }];
		    $scope.businessUnitDataRead = [{
		        "name": "TECHNOLOGY SOLUTIONS",
		        "check": true,
		        "value": [
				  {
				      "name": "NOVA",
				      "check": true,
				      "value": [
                        {
                            "name": "PRODUCT MANAGEMENT GROUP",
                            "check": true
                        },
                        {
                            "name": "USER EXPERIENCE",
                            "check": true
                        },
                        {
                            "name": "PRODUCT TECHNOLOGY",
                            "check": true
                        }
				      ]
				  }
		        ]
		    }];
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

		    // Start: CBR
		    var tempCategoryNode_PAS = [];
		    var tempBUNode_PAS = [];

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

		    var categoryData = {
		        method: 'GET',
		        url: 'shared/popup/models/category.json'
		    };

		    var buData = {
		        method: 'GET',
		        url: 'shared/popup/models/businessUnit.json'
		    };

		    var currentType = '';
		    $scope.treeOpenCallback = function (type) {





		        $scope.treeComponentConfig.requestParameter = {
		            navigationContext: "PAS"
		        };
		        currentType = type;
		        if (type == 'bu') {
		            $http(buData).then(function (response) {
		                
		                $scope.treeComponentConfig.listIcon = null;
		                $scope.treeComponentConfig.isViewOnly = false;
		                $scope.treeComponentConfig.isReadOnly = false;
		                $scope.treeComponentConfig.data = response.data;
		                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
		                if (tempBUNode_PAS.length) {
		                    $scope.treeComponentConfig.isReadOnly = true;
		                }
		                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
		                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
		            });

		        } else {
		            $http(categoryData).then(function (response) {

		                $scope.treeComponentConfig.listIcon = null;
		                $scope.treeComponentConfig.isViewOnly = false;
		                $scope.treeComponentConfig.isReadOnly = false;
		                $scope.treeComponentConfig.data = response.data;
		                $scope.treeComponentConfig.title = 'CATEGORY';
		                if (tempCategoryNode_PAS.length) {
		                    $scope.treeComponentConfig.isReadOnly = true;
		                }
		                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
		                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
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
		        } else if (currentType == 'region') {
		        }
		        //$scope.treeComponentConfig.getSelections = true;
		    };

		    $scope.selectedCategoriesTxt = ["Choose Category"];
		    $scope.selectedBUTxt = ["Choose Business Unit"];

		    $scope.selectedCategoryNodes = [];
		    $scope.selectedBUNodes = [];

		    $scope.selectedCategoriesValidate = false;
		    $scope.selectedBUValidate = false;

		    $scope.treeComponentCallback = function (e) {

		        if (currentType == 'category') {
		            tempCategoryNode_PAS = [];
		            $scope.selectedCategoriesValidate = true;
		            for (var i = 0; i < e.selections.length; i++) {
		                $scope.selectedCategoryNodes.push(e.selections[i].Name);
		                tempCategoryNode_PAS.push(e.selections[i].ID);
		            }
		            if (e.selectionAllNames.length > 1)
		                $scope.selectedCategoriesTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
		            else if (e.selectionAllNames.length == 1)
		                $scope.selectedCategoriesTxt = [e.selectionAllNames[0]];
		            else
		                $scope.selectedCategoriesTxt = ['Choose Category'];
		        } else if (currentType == 'bu') {
		            tempBUNode_PAS = [];
		            $scope.selectedBUValidate = true;
		            for (var i = 0; i < e.selections.length; i++) {
		                $scope.selectedBUNodes.push(e.selections[i].Name);
		                tempBUNode_PAS.push(e.selections[i].ID);
		            }
		            if (e.selectionAllNames.length > 1)
		                $scope.selectedBUTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
		            else if (e.selectionAllNames.length == 1)
		                $scope.selectedBUTxt = [e.selectionAllNames[0]];
		            else
		                $scope.selectedBUTxt = ['Choose Business Unit'];
		        } 
		        $scope.showTreePopup = false;
		        $scope.treeComponentConfig.data = [];
		        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
		    };
		    //$scope.similarSupplierData = [];
		    $scope.similarSupplierData = [{
		        title: "Globas",
		        show: true,
		        data: [[{
		            control: "textbox",
		            name: "Suppliers Legal Name",
		            value: "Globas"
		        }, {
		            control: "textbox",
		            name: "Status",
		            value: "Invited"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "categoryBtnRead",
		                dataTarget: "categoryRead"
		            },
		            name: "Category",
		            value: "IT/TELECOM +4 More"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "businessUnitBtnRead",
		                dataTarget: "businessUnitRead"
		            },
		            name: "Business Unit",
		            value: "TECHNOLOGY +4 More"
		        }], [{
		            control: "textbox",
		            name: "Contact Names",
		            value: "Jhoe Doe"
		        }, {
		            control: "textbox",
		            name: "Business Phone Number",
		            value: "+91 9988797799"
		        }, {
		            control: "textbox",
		            name: "Contact Email",
		            value: "jdoe@gep.com"
		        }], [{
		            control: "listview",
		            controlConfig: {
		                id: "suppliermBtnRead",
		                dataTarget: "suppliermRead"
		            },
		            name: "Supplier Managers",
		            value: "Carissa Madden +4 More"
		        }]]
		    }, {
		        title: "Global Infotech",
		        show: false,
		        data: [[{
		            control: "textbox",
		            name: "Suppliers Legal Name",
		            value: "Globas"
		        }, {
		            control: "textbox",
		            name: "Status",
		            value: "Invited"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "businessUnitBtnRead",
		                dataTarget: "businessUnitRead"
		            },
		            name: "Business Unit",
		            value: "TECHNOLOGY +4 More"
		        }], [{
		            control: "textbox",
		            name: "Contact Names",
		            value: "Jhoe Doe"
		        }], [{
		            control: "listview",
		            controlConfig: {
		                id: "suppliermBtnRead",
		                dataTarget: "suppliermRead"
		            },
		            name: "Supplier Managers",
		            value: "Carissa Madden +4 More"
		        }]]
		    }, {
		        title: "Globence",
		        show: false,
		        data: [[{
		            control: "textbox",
		            name: "Suppliers Legal Name",
		            value: "Globas"
		        }, {
		            control: "textbox",
		            name: "Status",
		            value: "Invited"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "businessUnitBtnRead",
		                dataTarget: "businessUnitRead"
		            },
		            name: "Business Unit",
		            value: "TECHNOLOGY +4 More"
		        }], [{
		            control: "listview",
		            controlConfig: {
		                id: "suppliermBtnRead",
		                dataTarget: "suppliermRead"
		            },
		            name: "Supplier Managers",
		            value: "Carissa Madden +4 More"
		        }]]
		    }, {
		        title: "Glo Friends",
		        show: false,
		        data: [[{
		            control: "textbox",
		            name: "Suppliers Legal Name",
		            value: "Globas"
		        }, {
		            control: "textbox",
		            name: "Status",
		            value: "Invited"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "categoryBtnRead",
		                dataTarget: "categoryRead"
		            },
		            name: "Category",
		            value: "IT/TELECOM +4 More"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "businessUnitBtnRead",
		                dataTarget: "businessUnitRead"
		            },
		            name: "Business Unit",
		            value: "TECHNOLOGY +4 More"
		        }], [{
		            control: "textbox",
		            name: "Contact Names",
		            value: "Jhoe Doe"
		        }, {
		            control: "textbox",
		            name: "Business Phone Number",
		            value: "+91 9988797799"
		        }, {
		            control: "textbox",
		            name: "Contact Email",
		            value: "jdoe@gep.com"
		        }], [{
		            control: "listview",
		            controlConfig: {
		                id: "suppliermBtnRead",
		                dataTarget: "suppliermRead"
		            },
		            name: "Supplier Managers",
		            value: "Carissa Madden +4 More"
		        }], [{
		            control: "textbox",
		            name: "Suppliers Legal Name",
		            value: "Globas"
		        }, {
		            control: "textbox",
		            name: "Status",
		            value: "Invited"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "categoryBtnRead",
		                dataTarget: "categoryRead"
		            },
		            name: "Category",
		            value: "IT/TELECOM +4 More"
		        }, {
		            control: "listview",
		            controlConfig: {
		                id: "businessUnitBtnRead",
		                dataTarget: "businessUnitRead"
		            },
		            name: "Business Unit",
		            value: "TECHNOLOGY +4 More"
		        }]]
		    }];
		    $scope.showloader = false;
		    $scope.activeTab = function (index) {
		        for (var i = 0; i < $scope.similarSupplierData.length; i++) {
		            if ($scope.similarSupplierData[i].show) {
		                $scope.similarSupplierData[i].show = false;
		                break;
		            }
		        }
		        if ($scope.similarSupplierData.length == 0) {
		            $scope.showloader = true;
		        }
		        else {
		            $scope.showloader = false;
		        }

		        $scope.similarSupplierData[index].show = true;
		    }
		    // End: CBR

           
		}])
		.controller('questionnaireBlockCtrl', ['$scope', '$filter', function ($scope, $filter) {
		    $scope.questionnaireData = false;
		    $scope.disableIcon = true;
		    $scope.emptyText = '';
		    $scope.AutoWeight = 'Auto Weight';
		    $scope.VisibleToSupplier = 'Visible to Supplier';
		    $scope.dataIndex = [];
		    $scope.questionnaireDataSelected = function () {
		        var dataIndex = [];
		        angular.forEach($scope.questionnaireSavedData, function (val, key) {
		            if (val.check) {
		                dataIndex.push(key);
		            }
		        });
		        $scope.dataIndex = dataIndex;
		        if (dataIndex.length) {
		            $scope.disableIcon = false;
		        } else {
		            $scope.disableIcon = true;
		        }
		        dataIndex = [];
		    };
		    $scope.validateNum = function (evt, key) {
		        var evtTemp = evt[key].replace(/[^[\d\.]/ig, "");
		        if (evtTemp.split('.').length > 2) {
		            evtTemp = evtTemp.replace(/\.(?!.*\.)/, '');
		        }
		        evt[key] = evtTemp;
		    }

		    $scope.deletequestionnaireData = function () {
		        var sliceIndex = 0;
		        angular.forEach($scope.dataIndex, function (val, key) {
		            if (sliceIndex) {
		                $scope.questionnaireSavedData.splice(val - 1, 1);
		            } else {
		                $scope.questionnaireSavedData.splice(val, 1);
		                sliceIndex = 1
		            }
		        });
		        $scope.disableIcon = true;
		    };
		    /* 
				HEADER SEARCH INTRACTION
			*/
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
		    $scope.TotalAmount = 0;
		    $scope.onChangeWeight = function (isAutoWeight) {
		        var lockFlag = 0,
					lockFlagVal = 0,
					unLockFlagVal = 0,
					TotalAmount = 0,
					unLockFlag = 0;
		        if (isAutoWeight) {
		            angular.forEach($scope.questionnaireSavedData, function (valQuest, keyQuest) {
		                if (valQuest.lock) {
		                    lockFlag++;
		                    lockFlagVal += parseFloat(valQuest.weight);
		                } else {
		                    unLockFlag++;
		                }
		            });

		            unLockFlagVal = ((100 - lockFlagVal) / unLockFlag);
		            unLockFlagVal = +unLockFlagVal.toFixed(2);
		            TotalAmount += lockFlagVal;

		            angular.forEach($scope.questionnaireSavedData, function (valQuest, keyQuest) {
		                if (!valQuest.lock) {
		                    unLockFlag--;
		                    valQuest.weight = unLockFlag ? unLockFlagVal : +(100 - TotalAmount).toFixed(2);
		                    TotalAmount += valQuest.weight;
		                }
		            })
		            $scope.TotalAmount = TotalAmount;
		            TotalAmount = 0;
		            unLockFlagVal = 0;
		        }
		    };
		    $scope.onChangeSingleWeight = function (val) {
		        var TotalAmount = 0;
		        if (!val.weight && val.weight !== 0) {
		            val.weight = 0;
		        }
		        angular.forEach($scope.questionnaireSavedData, function (valQuest, keyQuest) {
		            TotalAmount += parseFloat(valQuest.weight);
		        });
		        $scope.TotalAmount = +TotalAmount.toFixed(2);
		        TotalAmount = 0;
		    }
		    $scope.questionLock = function (questionItem, str, $event) {
		        $event.stopPropagation();
		        questionItem.lock = !questionItem.lock;
		        angular.element('#' + str + ' input').attr('disabled', questionItem.lock);
		    };
		    $scope.showUploadDocPopup = false;
		    $scope.showUploadDoc = function () {
		        $scope.showUploadDocPopup = true;
		    }
		    $scope.hideUploadDocPopupCallback = function () {
		        $scope.showUploadDocPopup = false;
		    };
		    $scope.attachFlag = false;
		    $scope.uploadFail = false;
		    $scope.attachmentCall = function (e) {
		        $scope.attachFlag = true;
		        $timeout(function () {
		            $scope.uploadFail = true;
		        }, 1500);

		    };
		    $scope.retryCall = function () {
		        $scope.uploadFail = false;
		    }
		    $scope.closeAttachment = function () {
		        $scope.attachFlag = false;
		        $scope.uploadFail = false;
		    }
		    $scope.questionnaireSavedData = [{
		        "title": "Questionnaire 1",
		        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
		        "check": false,
		        "isVisible": false,
		        "weight": 0,
		        "lock": false,
		        "questionCount": 10,
		        "createdby": "Gep Admin",
		        "createdbydate": "Sep 1,2015",
		        "modifiedby": "John Doe",
		        "modifieddate": "Sep 2,2015",

		    },
	   {
	       "title": "Questionnaire 2",
	       "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
	       "check": false,
	       "isVisible": true,
	       "weight": 0,
	       "lock": false,
	       "questionCount": 10,
	       "createdby": "Gep Admin",
	       "createdbydate": "Sep 1,2015",
	       "modifiedby": "John Doe",
	       "modifieddate": "Sep 2,2015",

	   },
	   {
	       "title": "Questionnaire 3",
	       "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
	       "check": false,
	       "isVisible": false,
	       "weight": 0,
	       "lock": false,
	       "questionCount": 10,
	       "createdby": "Gep Admin",
	       "createdbydate": "Sep 1,2015",
	       "modifiedby": "John Doe",
	       "modifieddate": "Sep 2,2015",

	   }];

		    $scope.showLess = function (data) {
		        data.readMore = false;
		    }
		    $scope.showMore = function (data) {
		        data.readMore = true;
		    }

		}])
		.directive('sectionOverlaydynawidth', [function () {
		    return {
		        restrict: 'A',
		        link: function (scope, element, attrs) {
		            var flag = scope.$eval(attrs.openctn),
						str = attrs.openField;

		            scope.sectionOverlayaddFn = function () {
		                var $element = element.closest('.' + str);
		                if ($element.hasClass('overlay--active')) return false;
		                element.closest('.' + str).addClass('overlay--active');
		            };
		            scope.sectionOverlayremoveFn = function () {
		                var $element = element.closest('.' + str);
		                if (!$element.hasClass('overlay--active')) return false;
		                element.closest('.' + str).removeClass('overlay--active');
		            };
		            if (flag) {
		                scope.sectionOverlayaddFn();
		                element.closest('.' + str).addClass('overlayOptionalField');
		            } else {
		                scope.sectionOverlayremoveFn();
		            };

		        }
		    }
		}]);

    function supplierNewCtrlFunc($scope, $http, $timeout, routeSvc, notification) {

        $scope.config = {
            "modelData": {
                "timezone": "",
                "language": ""
            },
            "formConfig": {
                "sections": [
					{
					    "label": "Basic Details",
					    "isMandatory": true,
					    "isCollapsible": true,
					    "isHeader": true,
					    "isDraggable": true,"isVisible": true,
					    "rows": [
							{
							    "properties": [
									{
									    "label": "",
									    "type": "subsection",
									    "isMandatory": true,
									    "templateUrl": "shared/quickAddSupplier/views/BasicDetailSubLegalName.html",
									    "colspan": 1
									},
									{
									    "label": "Source Type",
									    "type": "subsection",
									    "isMandatory": false,
									    "controller": "supplierCreationController",
									    "templateUrl": "shared/quickAddSupplier/views/BasicDetailSubSourceType.html",
									    "colspan": 2
									}
							//{
							//	"label": "Source Type",
							//	"type": "dropdown",
							//	"editable": true,
							//	"isMandatory": false,
							//	"data": "sourceType",
							//	"attributes": {
							//		"options": [
							//			{
							//				"title": "Sole",
							//			},
							//			{
							//				"title": "Single"
							//			},
							//			{
							//				"title": "Group"
							//			}
							//		],
							//		"readonly": false
							//	},
							//	"rules": [
							//		{
							//			"rule": "this.sourceType === \'Source Type\'",
							//			"error": "Please Select an option"
							//		}
							//	]
							//}												
							    ]
							},
					{
					    "properties": [
							{
							    "label": "",
							    "type": "subsection",
							    "isMandatory": true,
							    "templateUrl": "shared/quickAddSupplier/views/BasicDetailSubListPopup.html",
							    "colspan": 2
							},
							{
							    "label": "Send Additional Forms",
							    "type": "subsection",
							    "isMandatory": true,
							    "templateUrl": "shared/quickAddSupplier/views/BasicDetailSubListPopupOptional.html",
							    "colspan": 1
							}
					    ]
					},
					{
					    "properties": [
							{
							    "label": "",
							    "type": "subsection",
							    "isMandatory": true,
							    "templateUrl": "shared/quickAddSupplier/views/BasicDetailSeparator.html",
							    "colspan": 6
							}
					    ]
					},
					{
					    "properties": [
							{
							    "label": "First Name",
							    "type": "textfield",
							    "editable": true,
							    "isMandatory": true,
							    "colspan": 1,
							    "data": "setup.firstName",
							    "attributes": {
							        "readonly": false
							    }
							},
							{
							    "label": "Last Name",
							    "type": "textfield",
							    "colspan": 1,
							    "editable": true,
							    "isMandatory": true,
							    "data": "setup.lastName",
							    "attributes": {
							        "readonly": false
							    }
							}
					    ]
					},
					{
					    "properties": [
							{
							    "label": "Business Phone Number",
							    "colspan": 1,
							    "type": "subsection",
							    "isMandatory": false,
							    "data": "blank",
							    "templateUrl": "shared/quickAddSupplier/views/BusinessPhoneTemplate.html"
							},
							{
							    "label": "Contact Email",
							    "type": "textfield",
							    "colspan": 1,
							    "editable": true,
							    "isMandatory": true,
							    "data": "setup.contactemail",
							    "attributes": {
							        "readonly": false
							    }
							},
							{
							    "label": "Send Invitation",
							    "type": "checkbox",
							    "colspan": 1,
							    "editable": true,
							    "isMandatory": true,
							    "data": "setup.Invitation",
							    "attributes": {
							        "readonly": false
							    }
							}
					    ]
					},
					{
					    "properties": [
							{
							    "label": "Time Zone",
							    "type": "dropdown",
							    "colspan": 1,
							    "editable": true,
							    "isMandatory": false,
							    "data": "timezone",
							    "attributes": {
							        "options": [
										{
										    "code": "India Standard Time",
										    "name": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi"
										}, {
										    "code": "UTC-11",
										    "name": "(UTC-11:00) Coordinated Universal Time-11"
										}, {
										    "code": "Mountain Standard Time (Mexico)",
										    "name": "(UTC-07:00) Chihuahua, La Paz, Mazatlan"
										}, {
										    "code": "E. Europe Standard Time",
										    "name": "(UTC+02:00) E. Europe"
										}, {
										    "code": "Cen. Australia Standard Time",
										    "name": "(UTC+09:30) Adelaide"
										}, {
										    "code": "Tasmania Standard Time",
										    "name": "(UTC+10:00) Hobart"
										}
							        ],
							        "readonly": false,
							        "datakey": "name"
							    },
							    "rules": [
									{
									    "rule": "this.timezone == \"Time Zone\"",
									    "error": "Please select an option"
									}
							    ]
							},
			{
			    "label": "Language",
			    "type": "dropdown",
			    "colspan": 1,
			    "editable": true,
			    "isMandatory": false,
			    "data": "language",
			    "attributes": {
			        "options": [
						{
						    "code": "en-US",
						    "name": "English"
						}, {
						    "code": "fr-FR",
						    "name": "Français"
						}, {
						    "code": "de-DE",
						    "name": "Deutsch"
						}, {
						    "code": "it-IT",
						    "name": "Italiano"
						}, {
						    "code": "pt-PT",
						    "name": "Portuguese"
						}, {
						    "code": "es-ES",
						    "name": "Español"
						}
			        ],
			        "readonly": false,
			        "datakey": "name"
			    },
			    "rules": [
					{
					    "rule": "this.language == \"language\"",
					    "error": "Please select an option"
					}
			    ]
			}
					    ]
					},
					{
					    "properties": [
							{
							    "label": "",
							    "type": "subsection",
							    "isMandatory": true,
							    "templateUrl": "shared/quickAddSupplier/views/BasicDetailSeparator.html",
							    "colspan": 6
							}
					    ]
					},
					{
					    "properties": [
							{
							    "label": "",
							    "type": "subsection",
							    "isMandatory": true,
							    "templateUrl": "shared/quickAddSupplier/views/BasicDetailSubSupplierManager.html",
							    "colspan": 3
							}
					    ]
					}
					    ]
					},
					//{
					//        	"label": "Basic Details",
					//        	"isMandatory": true,
					//        	"isCollapsible": true,
					//        	"isHeader": true,
					//        	"rows": [
					//				{
					//					"properties": [
					//						{
					//							"label": "",
					//							"type": "subsection",
					//							"isMandatory": true,
					//							"templateUrl": "shared/quickAddSupplier/views/BasicDetailSub.html",
					//							"colspan": 6
					//						}
					//					],
					//				}
					//        	]
					//        },
					{
					    "label": "Approvals",
					    "isMandatory": true,
					    "isCollapsible": true,
					    "headerTemplate": "shared/quickAddSupplier/views/approversSecHeader.html",
					    "isHeader": true,
					    "isDraggable": true,"isVisible": true,
					    "isActive": false,
					    "rows": [
						{

						    "properties": [
								{
								    "label": "",
								    "type": "subsection",
								    "isMandatory": true,
								    "templateUrl": "shared/quickAddSupplier/views/approversData.html",
								    "colspan": 6

								}
						    ]
						}
					    ]
					},
					{
					    "label": "Approvals",
					    "isMandatory": true,
					    "isCollapsible": true,
					    "isActive": false,
					    "headerTemplate": "shared/quickAddSupplier/views/approversSecHeaderInfo.html",
					    "isHeader": true,
					    "isDraggable": true,"isVisible": true,
					    "rows": [
							{

							    "properties": [
									{
									    "label": "",
									    "type": "subsection",
									    "isMandatory": true,
									    "templateUrl": "shared/quickAddSupplier/views/approversDataInfo.html",
									    "colspan": 6

									}
							    ]
							}
					    ]
					}
					//, {
					//	"label": "QUESTIONNAIRE",
					//	"isMandatory": true,
					//	"isCollapsible": true,
					//	"isActive": false,
					//	"headerTemplate": "shared/quickAddSupplier/views/questionnaireSecHeader.html",
					//	"isHeader": true,
					//	"isDraggable": true,"isVisible": true,
					//	"rows": [
					//		{

					//			"properties": [
					//				{
					//					"label": "",
					//					"type": "subsection",
					//					"isMandatory": true,
					//					"templateUrl": "shared/quickAddSupplier/views/questionnaireData.html",
					//					"colspan": 6

					//				}
					//			]
					//		}
					//	]
					//}
                ],
            },
        };

        $scope.name = "";
        $scope.supplierLoader = false;
        $scope.SupplierCheck = function ($event) {
            $scope.supplierLoader = true;
            if ($scope.name.length > 2) {
                $scope.supplierListAll = true;
                $scope.supplierLoader = false;
            } else {
                $scope.supplierListAll = false;
            }
        };
        $scope.sourcetypeFn = function (data, addFn, removeFn) {
            if (data.title === 'Group') {
                removeFn();
            } else {
                addFn();
            }
        };
        $scope.sectionAndFieldsDetails = [
		{ 'name': 'Basic Details', 'contentIn': '' },
		{ 'name': 'Supplier\'s Legal Name', 'contentIn': 'In Basic Details' },
		{ 'name': 'Source Type', 'contentIn': 'In Basic Details' },
		{ 'name': 'Category', 'contentIn': 'In Basic Details' },
		{ 'name': 'Business Unit', 'contentIn': 'In Basic Details' },
		{ 'name': 'Send Additional Forms', 'contentIn': 'In Basic Details' },
		{ 'name': 'First Name', 'contentIn': 'In Basic Details' },
		{ 'name': 'Last Name', 'contentIn': 'In Basic Details' },
		{ 'name': 'Business Phone Number', 'contentIn': 'Basic Details' },
		{ 'name': 'Contact Email', 'contentIn': 'In Basic Details' },
		{ 'name': 'Send Invitation', 'contentIn': 'In Basic Details' },
		{ 'name': 'Time Zone', 'contentIn': 'In Basic Details' },
		{ 'name': 'Language', 'contentIn': 'In Basic Details' },
		{ 'name': 'Supplier Manager', 'contentIn': 'In Basic Details' },
		{ 'name': 'Approvals', 'contentIn': '' },
        ];

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

        $scope.selectedApproversFirsttypeSelect = {
            "code": "Pool",
            "name": "Pool"
        };

        $scope.selectedApproversSecondtypeSelect = {
            "code": "Parallel",
            "name": "Parallel"
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
                "placeholderText": "Add Approvers",
                "displaytext": "Add Approvers",
                "approversData": [{ "name": "Jhon Doe", "check": false, "group": true }, { "name": "Dotson Palmer", "check": false }, { "name": "Meyer Lloyd", "check": false }, { "name": "Flossie Ochoa", "check": false }, { "name": "Leah Moses", "check": false }, { "name": "Ferguson Osborn", "check": false }, { "name": "Peck Patterson", "check": false }, { "name": "Gay Payne", "check": false }, { "name": "Katie Hebert", "check": false }, { "name": "Bryan Shannon", "check": false }, { "name": "Skinner Farmer", "check": false }, { "name": "Mckay Mcneil", "check": false }, { "name": "Lila Horne", "check": false }, { "name": "Ethel Powell", "check": false }, { "name": "Spears Lott", "check": false }, { "name": "Nannie Ryan", "check": false }, { "name": "Joy Ware", "check": false }, { "name": "Shaffer Mcfadden", "check": false }, { "name": "Audrey Pena", "check": false }, { "name": "Helga Macdonald", "check": false }],
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
                    "placeholderText": "Add Approvers",
                    "displaytext": "Add Approvers",
                    "approversData": [{ "name": "Jhon Doe", "check": false, "group": true }, { "name": "Dotson Palmer", "check": false }, { "name": "Meyer Lloyd", "check": false }, { "name": "Flossie Ochoa", "check": false }, { "name": "Leah Moses", "check": false }, { "name": "Ferguson Osborn", "check": false }, { "name": "Peck Patterson", "check": false }, { "name": "Gay Payne", "check": false }, { "name": "Katie Hebert", "check": false }, { "name": "Bryan Shannon", "check": false }, { "name": "Skinner Farmer", "check": false }, { "name": "Mckay Mcneil", "check": false }, { "name": "Lila Horne", "check": false }, { "name": "Ethel Powell", "check": false }, { "name": "Spears Lott", "check": false }, { "name": "Nannie Ryan", "check": false }, { "name": "Joy Ware", "check": false }, { "name": "Shaffer Mcfadden", "check": false }, { "name": "Audrey Pena", "check": false }, { "name": "Helga Macdonald", "check": false }],
                    "approversinitialDisplayText": 'Add Approvers',
                    "showFormAs": false
                },
                "check": false
            })
        };
        $scope.supplierReset = function () {
        };

        $scope.supplierConfirm = function () {

            notification.notify({
                type: 'confirm',
                message: '<p class="left-align grey-text text-darken-4">We have identified the following duplicates based on Company Identification Information;<div class="paddingLeft10 paddingTop10 paddingRight0 paddingBtm20"><div><span class="marginRight5">1.</span>Legal Company Name: Evertek</div><div><span class="marginRight5">2.</span>US Federal Tax ID: 223453 </div></div>Are you sure you want to continue?</p>',
                checkMessage: "Don't ask for this supplier again.",
                buttons: [{
                    "title": "yes",
                    "result": "yest"
                },
				{
				    "title": "No",
				    "result": "Not"
				}]
            }, function (result) {
                if (result.result === 'yest') {
                    $timeout(function () {
                        notification.notify({
                            type: 'confirm',
                            message: '<p class="left-align grey-text text-darken-4">The Supplier email provided already exists in the system.<br/>Do you still wish to continue?</p>',
                            buttons: [{
                                "title": "yes",
                                "result": "yest"
                            },
                            {
                                "title": "No",
                                "result": "Not"
                            }]
                        }, function (result) {
                            if (result.result === 'yest') {
                                $timeout(function () {
                                    Materialize.toast('Your invitation has been sent', 2000);
                                }, 2000);
                                routeSvc.stateTo('expandedLandingList', { "pagefor": "manage", "doctype": "supplierSPN-" + $scope.name });
                            }
                        });
                    }, 100);
                }
            });
        };
    };
})(angular);