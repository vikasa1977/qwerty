angular
	.module('SMART2')
	.controller('configureFeatureCtrl', ['$scope', '$timeout', '$state', '$http', '$filter', 'notification', 'storeService', 'dbFactory', '$window', configureFeatureCtrlFunc])

function configureFeatureCtrlFunc($scope, $timeout, $state, $http, $filter, notification, storeService, dbFactory, $window) {
    //filter data
    //$scope.emptyText = " ";
    $scope.enableLoadDefaultIcon = true;

    //Rule Summary Data
    var addFeatureData = [
        {
            "FeatureId": 1,
            "BasicSettingDetailsId": "1",
            "SettingConfigurationId": "5",
            "ProductName": "P2P",
            "ModuleName": "Requisition",
            "Feature": "Base Functionality",
            "ConfigurationDBName": "BaseFunctionality",
            "ConfigurationName": "Base Functionality",
            "Description": "Prefix to be used for Requisition Name.",
            "Division": "Default",
            "LOBId": "1",
            "Entity": "Default",
            "SettingType": "Prefix",
            "Prefix": "",
            "Id": "1",
            "Options": [],
            "SelectedSetting": {},
            "ParentNode": true,
            "ChildNode": false,
            "isChecked": false,
            "children": [
                {
                    "FeatureId": 1,
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Requisition Prefix",
                    "Description": "Whether or not Partner name is mandatory for Requisitions items.",
                    "Division": "Default",
                    "Entity": "Default",
                    "Prefix": ".xls",
                    "SettingType": "Prefix",
                    "Options": [],
                    "SelectedSetting": {},
                    "Id": 1,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": false
                },
                {
                    "FeatureId": 1,
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Is Partner Mandatory",
                    "Description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    "Division": "Default",
                    "Entity": "Default",
                    "Prefix": "",
                    "SettingType": "Boolean",
                    "Options": [
                        { "name": "Not Selected" },
                        { "name": "Yes" },
                        { "name": "No" }
                    ],
                    "SelectedSetting": { "name": "Not Selected" },
                    "Id": 2,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": false
                },
                {
                    "FeatureId": "1",
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Is Bill To Location Mandatory",
                    "Description": "Whether or not bill to location is mandatory in Requisition.",
                    "Division": "Default",
                    "Entity": "Default",
                    "Prefix": "",
                    "SettingType": "Boolean",
                    "Options": [
                        { "name": "Not Selected" },
                        { "name": "Yes" },
                        { "name": "No" }
                    ],
                    "SelectedSetting": { "name": "Not Selected" },
                    "Id": 3,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": false
                },
                {
                    "FeatureId": 1,
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Allow Edit Partner for Internal Items",
                    "Description": "Allow to edit partner details in requisition for Internal items.",
                    "Division": "Default",
                    "Entity": "Default",
                    "SettingType": "Boolean",
                    "Options": [
                        { "name": "Not Selected" },
                        { "name": "Yes" },
                        { "name": "No" }
                    ],
                    "SelectedSetting": { "name": "No" },
                    "Id": 4,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": true
                },
                {
                    "FeatureId": 1,
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Is Send Back Post Approval",
                    "Description": "This configuration is used to enable the document to be sent back to the current approver who is including a new approver through Adhoc approval process.",
                    "Division": "Default",
                    "Entity": "Default",
                    "Prefix": "",
                    "SettingType": "Boolean",
                    "Options": [
                       { "name": "Not Selected" },
                       { "name": "Yes" },
                       { "name": "No" }
                    ],
                    "SelectedSetting": { "name": "Yes" },
                    "Id": 5,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": false
                },
                {
                    "FeatureId": 1,
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Is Ordering Location Visible",
                    "Description": "This setting will make Ordering Location field visible in Requisition.",
                    "Division": "Default",
                    "Entity": "Default",
                    "Prefix": "",
                    "SettingType": "Boolean",
                    "Options": [
                            { "name": "Not Selected" },
                            { "name": "Yes" },
                            { "name": "No" }
                    ],
                    "SelectedSetting": { "name": "Not Selected" },
                    "Id": 6,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": true
                },
                {
                    "FeatureId": 1,
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Is Partner Contact Visible",
                    "Description": "This setting will make Partner Contact field visible in Requisition.",
                    "Division": "Default",
                    "Entity": "Default",
                    "SettingType": "Boolean",
                    "Options": [
                         { "name": "Not Selected" },
                         { "name": "Yes" },
                         { "name": "No" }
                    ],
                    "SelectedSetting": { "name": "Not Selected" },
                    "Id": 7,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": false
                },
                {
                    "FeatureId": 1,
                    "BasicSettingDetailsId": "1",
                    "SettingConfigurationId": "5",
                    "ProductName": "",
                    "ModuleName": "",
                    "Feature": "",
                    "ConfigurationDBName": "BaseFunctionality",
                    "ConfigurationName": "Is Unit Price Mandatory",
                    "Description": "This setting will make Unit Price a mandatory field in Items chevron in a requisition.",
                    "Division": "Default",
                    "Entity": "Default",
                    "Prefix": "",
                    "SettingType": "Boolean",
                    "Options": [
                          { "name": "Not Selected" },
                          { "name": "Yes" },
                          { "name": "No" }
                    ],
                    "SelectedSetting": { "name": "Not Selected" },
                    "Id": 8,
                    "ParentNode": false,
                    "ChildNode": true,
                    "isChecked": false,
                    "isModified": true
                }
            ]
        },
        {
            "FeatureId": 2,
            "BasicSettingDetailsId": "1",
            "SettingConfigurationId": "5",
            "ProductName": "P2P",
            "ModuleName": "Requisition",
            "Feature": "Enable Accounting",
            "ConfigurationDBName": "AllowEditAccountingStatus",
            "ConfigurationName": "Allow Edit Accounting Status",
            "Description": "This will specify the list of requisition statuses for which accounting information is editable. Multiple statuses can be selected here.",
            "Division": "Default",
            "LOBId": "2",
            "Entity": "Default",
            "Prefix": "",
            "SettingType": "Select Value",
            "Id": 2,
            "Options": [],
            "SelectValueOptions": [
                {
                    name: "Draft",
                    division: "JD NA",
                    entity: "JD Tractor",
                    isChecked: true,
                },
                {
                    name: "Withdrawn",
                    division: "Kellog",
                    entity: "Kellog Chips",
                    isChecked: true,
                },
                {
                    name: "Rejected",
                    division: "Dell",
                    entity: "Dell Laptop",
                    isChecked: true,
                },
                {
                    name: "Pending Approval",
                    division: "Sony",
                    entity: "Smart Phone",
                    isChecked: true,
                },
                {
                    name: "Approved",
                    division: "Cisco",
                    entity: "Phone",
                    isChecked: true,
                }
            ],
            "SelectedSetting": {},
            "ParentNode": true,
            "ChildNode": false,
            "isChecked": false,
            "children": []
        }
    ];

    $scope.selectPrefixCall = function (item, childId, parentId) {
        var parentData = $scope.data._view[parentId - 1];
        for (var i = 0 ; i < parentData.children.length; i++) {
            if (parentData.children[i].Id == childId) {
                parentData.children[i].SelectedSetting = item;
                return;
            }
        }

    }

    $scope.divisions = [{
        "name": "Kellogs Aus"
    }, {
        "name": "Kellogs Eng"
    }, {
        "name": "Kellogs Fra"
    }, {
        "name": "Kellogs Rus"
    }];

    $scope.defaultDivision = { "name": "Kellogs Aus" };

    $scope.toggleExpandCollapseArrow = true;

    $scope.resetSelectValues = function (selectValue) {
        for (var i = 0; i < selectValue.length; i++) {
            selectValue[i].isChecked = false;
        }
    };

    $scope.isTextChanged = function (item) {
        if (item.Prefix != '.xls') {
            $timeout(function () {
                item.isModified = true;
            });
        } else {
            $timeout(function () {
                item.isModified = false;
            });
        }
    };

    $scope.init = function (s, e) {
        $scope.isGridLoaded = false;
        var grid = $scope.grid = s;

        $scope.data = new wijmo.collections.CollectionView(addFeatureData);
        for (var i = 0; i < addFeatureData.length; i++) {
            if (addFeatureData[i].SettingType === 'Select Value') {
                $scope.selectValues = addFeatureData[i].SelectValueOptions;
            }
        }

        $scope.data.pageSize = 30;
        $scope.filter = new wijmo.grid.filter.FlexGridFilter(s);
        $scope.filter.defaultFilterType = wijmo.grid.filter.FilterType.Value;
        $scope.allRulesData = angular.copy($scope.data._src);
        grid.collapseGroupsToLevel(2);
        $scope.filteByStatusClicked = function ($index, item) {
            var toFilter, lcFilter;
            $scope.tempRulesData = [];
            angular.forEach($scope.allRulesData, function (value, ind) {
                if (value.displayName == item.filterBy) {
                    $scope.tempRulesData.push(value);
                };
                $scope.data._src = $scope.tempRulesData;
                $scope.data.refresh();
            });

            for (var i = 0; i < $scope.landingFilterList.length; i++) {
                $scope.landingFilterList[i].isSelected = false;
            }
            $scope.isAllFilterSelected = false;
            $scope.landingFilterList[$index].isSelected = true;
        };

        $scope.allFilterClicked = function () {
            $scope.isAllFilterSelected = true;
            for (var i = 0; i < $scope.landingFilterList.length; i++) {
                $scope.landingFilterList[i].isSelected = false;
            }
            $scope.data._src = $scope.allRulesData;
            $scope.data.refresh();
        }

        grid.selectionMode = wijmo.grid.SelectionMode.Row;
        grid.select(-1, -1);

        grid.formatItem.addHandler(function (s, e) {
            var sel = null;
            var count = 0;

            // apply selected state to row header cells
            if (e.panel == grid.rowHeaders) {
                sel = grid.rows[e.row].isSelected;
                wijmo.toggleClass(e.cell, 'wj-state-multi-selected', sel);

                var selected = [];
                for (var i = 0; i < grid.rows.length; i++) {
                    if (grid.rows[i].isSelected) {
                        selected.push(grid.rows[i].dataItem);
                        count = count + 1;
                    }
                }
                $scope.deleteRowWj = function () {
                    // delete the selected items
                    for (var i = 0; i < selected.length; i++) {
                        $scope.data.remove(selected[i]);
                    }
                }

                if (count == 0 || count < 0) {
                    $scope.enableLoadDefaultIcon = true;
                } else {
                    $scope.enableLoadDefaultIcon = false;
                }
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



            //var selectedRows = _.filter(grid.rows, function (r) {

            //    if (r.isSelected == true) {
            //        $scope.enableLoadDefaultIcon = true;

            //        return r;
            //    } else if (r.isSelected == false) {


            //        $scope.enableLoadDefaultIcon = false;


            //        return r;
            //    }
            //});
            //selectedRows.length != 0 ? $scope.enableLoadDefaultIcon = true : $scope.enableLoadDefaultIcon = false;

        }, true);
    };

    $scope.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wijmo.grid.CellType.Cell) {
            var flex = panel.grid;
            //set height for even rows           
            flex.rows[r].height = 48;
            flex.rows[r].cssClass = "wj-sTable-cell";

            if (flex.rows[r]._level == 1) {
                cell.className += " child-node";
            }
        }
    }

    $scope.checktext = false;

    function areAllRowsSelected(grid) {
        for (var i = 0; i < grid.rows.length; i++) {
            if (!grid.rows[i].isSelected) return false;
        }
        return true;
    }

    $scope.isGridLoaded = false;
    $scope.$watch('isInitialized', function () {
        if ($scope.isGridLoaded) {
            $scope.isGridLoaded = true;
        }
    });

    //Save button enable
    $scope.buttonStatus = true;
    $scope.checkBoxClicked = function (state) {
        $scope.buttonStatus = false;
    }

    //Select Value Popup
    $scope.selectValuePopupUrl = "shared/admin/setupManager/views/selectValuePopup.html";

    $scope.selectValue = false;
    $scope.selectValueCallback = function () {
        $scope.selectValue = true;
        $scope.buttonStatus = false;
    };

    $scope.selectValueOnHideCallback = function () {
        $scope.selectValue = false;
    };

    //Select Prefix callout
    $scope.selectPrefixCallback = function () {
        alert("Hi");
    }

    //Select Division Popup
    $scope.divisionPopupUrl = "shared/admin/setupManager/views/selectDivisionPopup.html";

    $scope.selectDivision = false;
    $scope.selectDivisionCallback = function () {
        $scope.selectDivision = true;
        $scope.buttonStatus = false;
    };

    $scope.selectDivisionOnHideCallback = function () {
        $scope.selectDivision = false;
    };

    //Select Entity Popup
    $scope.entityPopupUrl = "shared/admin/setupManager/views/selectEntityPopup.html";

    $scope.selectEntity = false;
    $scope.selectEntityCallback = function () {
        $scope.selectEntity = true;
        $scope.buttonStatus = false;
    };

    $scope.selectEntityOnHideCallback = function () {
        $scope.selectEntity = false;
    };

    //$scope.selectValues = [
    //    {
    //        name: "Draft",
    //        division: "JD NA",
    //        entity: "JD Tractor",
    //        isChecked: true,
    //    },
    //    {
    //        name: "Withdrawn",
    //        division: "Kellog",
    //        entity: "Kellog Chips",
    //        isChecked: true,
    //    },
    //    {
    //        name: "Rejected",
    //        division: "Dell",
    //        entity: "Dell Laptop",
    //        isChecked: true,
    //    },
    //    {
    //        name: "Pending Approval",
    //        division: "Sony",
    //        entity: "Smart Phone",
    //        isChecked: true,
    //    },
    //    {
    //        name: "Approved",
    //        division: "Cisco",
    //        entity: "Phone",
    //        isChecked: true,
    //    },
    //];

    $scope.cancelClicked = function () {
        $window.history.back();
    }

    $scope.popupOptions = [{
        "division": "JD NA",
        "entity": "JD Tractor"
    }, {
        "division": "Kellog",
        "entity": "Kellog Chips"
    }, {
        "division": "Dell",
        "entity": "Dell Laptop"
    }, {
        "division": "Sony",
        "entity": "Smart Phone"
    }];

    $scope.selectedOption = { "division": "JD NA", "entity": "JD Tractor" };

    $scope.selectedEntityCallBack = function (selectedOpt) {
        console.log(selectedOpt);
    };

    $scope.selectedDivisionCallBack = function (selectedOpt) {
        console.log(selectedOpt);
    };

    $scope.onChangeCallback = function (crrItem) {
        console.log(crrItem);
    };
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

    // Start:  Select Value Popup
    var selectValueNode_PAS = [''];

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
        isReadOnly: true,
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

    var selectValueObj;

    var selectValueData = {
        method: 'GET',
        url: 'shared/admin/setupManager/models/configureFeatureSelectValueData.json'
    };

    $scope.treeOpenCallback = function () {
        $scope.treeComponentConfig.requestParameter = {
            navigationContext: "PAS"
        };
        $http(selectValueData).then(function (response) {
debugger;
            selectValueObj = response.data;
            $scope.treeComponentConfig.data = selectValueObj;
            $scope.treeComponentConfig.title = 'Select Value';
            $scope.treeComponentConfig.selectedNodes = selectValueNode_PAS.join(",");
        });
        $scope.showTreePopup = true;
    };

    $scope.onPopupHideCallback = function () {
        $scope.showTreePopup = false;
        $scope.selectValueValidate = true;
    };

    $scope.selectedValueTxt = "Select Value";

    $scope.selectValueValidate = false;

    $scope.selectValueNodes = [''];

    $scope.treeComponentCallback = function (e) {
        selectValueNode_PAS = [];
        $scope.selectValueValidate = true;
        for (var i = 0; i < e.selections.length; i++) {
            $scope.selectValueNodes.push(e.selections[i].Name);
            selectValueNode_PAS.push(e.selections[i].ID);
        }
        if (e.selectionAllNames.length > 1)
            $scope.selectedValueTxt = e.selectionAllNames[0] + ' +' +(e.selectionAllNames.length - 1) + ' More';
        else if (e.selectionAllNames.length == 1)
            $scope.selectedValueTxt = e.selectionAllNames[0];
        else
            $scope.selectedValueTxt = 'Select Value';
        $scope.showTreePopup = false;
    };
    // End: Select Value Popup
};