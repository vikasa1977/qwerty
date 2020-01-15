angular.module('SMART2')

	.controller('errApprovalCtrl', ['$scope', '$sce', '$timeout', '$state', '$stateParams', '$http', '$filter','$translate' ,'notification', 'storeService', 'dbFactory', 'compareVersionLogFactory', setupmgrCtrlFunc])

    function setupmgrCtrlFunc($scope, $sce, $timeout, $state, $stateParams, $http, $filter, $translate, notification, storeService, dbFactory, compareVersionLogFactory) {
        $scope.isEmptyState = false;
        $scope.grid;
        $scope.data;
        $scope.filter;
        $scope.allRulesData;
        $scope.tempRulesData = [];
        $scope.landingFilterList;
        $scope.isAllFilterSelected = false;
        $scope.showAllCheckbox = false;
        $scope.activationToggle = true;
        
        var storedProperties = [];
        var properties = [
            {
                srNo : "1",
                exceptionType: 'Quantity Exception (Default)',
                ruleName:"Rule 1",
                division: 'All',
                category: "All",
                supplier: "All",
                resolution: "All",
                resolver: "Requestor",
                status : false,
                removeable : false
            },
            {
                srNo : "2",
                exceptionType: 'Missing receipt Exception',
                ruleName:"Rule 2",
                division: 'All',
                category: "All",
                supplier: "All",
                resolution: "All",
                resolver: "Requestor, Entity Owner",
                status : false,
                removeable : false
            },
            {
                srNo : "3",
                exceptionType: 'Tax Exception',
                ruleName:"Rule 3",
                division: 'All',
                category: "All",
                supplier: "All",
                resolution: "All",
                resolver: "Requestor, Order Contact",
                status : false,
                removeable : false
            },
            {
                srNo : "4",
                exceptionType: 'Unit price exception',
                ruleName:"Rule 4",
                division: 'Mylan',
                category: "Cat. Level 1",
                supplier: "All",
                resolution: "On IR",
                resolver: "Order Contact",
                status : true,
                removeable : true
            }
        ];
        
        storedProperties = storeService.get("ExceptionRoutingData");
        if(storedProperties != undefined)
        {
            var srCounter = properties[properties.length-1].srNo;
            for(var i in storedProperties)
            {
                srCounter++;
                storedProperties[i].srNo = srCounter;
            }
            properties = properties.concat(storedProperties.slice(0));
        }

        $scope.init = function (s, e) {
            var grid = $scope.grid = s;
            $scope.data = new wijmo.collections.CollectionView(properties);
            $scope.isEmptyState = $scope.data._src.length == 0;
            $scope.data.pageSize = 30;
            $scope.filter = new wijmo.grid.filter.FlexGridFilter(s);
            $scope.allRulesData = angular.copy($scope.data._src);
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
                        $scope.isEmptyState = $scope.data._src.length == 0;
                    }

                    if (count == 0 || count < 0) {
                        $scope.showAllCheckbox = true;
                    } else {
                        $scope.showAllCheckbox = false;
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
                }

            }, true);

            if (storeService.get('isMappingSetCreated') == true) 
            {
                Materialize.toast("Mapping set has been created", 4500);
            }

        };

        $scope.onDeleteClick = function (_srNo) {
            // delete the selected items
            $scope.data.remove($scope.data._src[Number(_srNo)-1]);
            for(var i=0; i<$scope.data._view.length; i++){
                $scope.data._view[i].srNo = (i+1).toString();
            }
            $scope.isEmptyState = $scope.data._src.length == 0;
        }

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
                if (!grid.rows[i].isSelected) 
                    return false;
            }
            return true;
        }

        // ============================= create page =======================================
    
        $scope.config = {
            "modelData": {"timezone": "", "language": ""},
            "formConfig": {
                "sections": [
                    {
                        "label": "Basic Details",
                        "isMandatory": true,
                        "isCollapsible": true,
                        "isActive": true,
                        "isHeader": true,
                        "isDraggable": true,
                        "isVisible": true,
                        "rows": [{
                            "properties": [{
                                "label": "",
                                "type": "subsection",
                                "isMandatory": true,
                                "templateUrl": "shared/admin/setupManager/views/errBasicDetails.html",
                                "colspan": 6
                            },{
                                    "label": "Description",
                                    "type": "textfield",
                                    "isMandatory": false,
                                    "data": "basicDetail.ExceptionTypeDescription",
                                    "isVisible": true,
                                    "colspan": 6,
                                    "onChange": "onChange",
                                    "attributes": {
                                      "charactercounter": "false",
                                      "maxlength": 4000,
                                      "type": "area"
                                    }
                            }]
                        }]
                    },
                    {
                        "label": "Routing Conditions",
                        "isMandatory": true,
                        "isCollapsible": true,
                        "isActive": false,
                        "isHeader": true,
                        "isDraggable": true,
                        "isVisible": true,
                        "rows": [{

                            "properties": [{
                                "label": "",
                                "type": "subsection",
                                "isMandatory": true,
                                "templateUrl": "shared/admin/setupManager/views/errRoutingConditions.html",
                                "colspan": 6

                            }]
                        }]
                    },
                    {
                        "label": "Resolution Mechanism",
                        "isMandatory": true,
                        "isCollapsible": true,
                        "isActive": false,
                        "isHeader": true,
                        "isDraggable": true,
                        "isVisible": true,
                        "rows": [{

                            "properties": [{
                                "label": "",
                                "type": "subsection",
                                "isMandatory": true,
                                "templateUrl": "shared/admin/setupManager/views/errResolutionMechanism.html",
                                "colspan": 6

                            }]
                        }]
                    },
                ],
            },
        };


        $scope.basicDetail = {
            ExceptionTypeOption: [
                {'id': '1', 'name': 'Missing receipt exception'}, 
                {'id': '2', 'name': 'Unit price exception'}, 
                {'id': '3', 'name': 'Total amount exception'}
            ],
            selectedExceptionType: {'id': '1', 'name': 'Missing receipt exception'},
            ExceptionTypeDescription:"",
            RuleName : "",
        };

        $scope.resolutionMechanism = {
            ResolveByOptions : [
                {'id': '1', 'name': 'IR Flow'}, 
                {'id': '2', 'name': 'Invoice'}
            ],
            selectedResolveBy : {'id': '1', 'name': 'IR Flow'},
            'Missing receipt exception' : {
                'IR Flow' : [
                    {id : '1', label : "Auto-create IR only after need by date", checked : false},
                    {id : '2', label: "Auto-create receipt on IR approval", checked : false},
                ],
                'Invoice' : [
                    {id : '1', label : "Receipt hold", checked : false},
                    {id : '2', label: "Override", checked : false},
                ],
            },
            'Unit price exception' : {
                'IR Flow' : [
                    {id : '1', label : "Auto-create change order on IR approval", checked : false},
                ],
                'Invoice' : [
                    {id : '1', label: "Override", checked : false},
                    {id : '2', label : "Notify buyer", checked : false},
                ],
            },
            'Total amount exception' : {
                'Invoice' : [
                    {id : '1', label: "Override (where exception is not auto resolved)", checked : false},
                ],
            },


             ResolverActivityOptions : [{
                "displaytitle": "Activity Type",
                "options": [
                    {
                        "name": "Activity 1",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Activity 2",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Activity 3",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Activity 4",
                        "check": false,
                        "isTree": false
                    }
                ],
                "selectedoption": []
            }],
            ResolverEntityOptions : [{
                "displaytitle": "Entity Type",
                "options": [
                    {
                        "name": "Entity 1",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Entity 2",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Entity 3",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Entity 4",
                        "check": false,
                        "isTree": false
                    }
                ],
                "selectedoption": []
            }],
            
            resolverCheckbox1 : false,
            resolverCheckbox2 : false
        };

        $scope.routingConditions = {
            routingLOBData : [{
                "displaytitle": "Select LOB",
                "options": [
                    {
                        "name": "LOB 1",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "LOB 2",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "LOB 3",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "LOB 4",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "LOB 5",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "LOB 6",
                        "check": false,
                        "isTree": false
                    }
                ],
                "selectedoption": []
            }],

            routingSupplierData : [{
                "displaytitle": "Supplier",
                "options": [
                    {
                        "name": "Supplier 1",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Supplier 2",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Supplier 3",
                        "check": false,
                        "isTree": false
                    }
                ],
                "selectedoption": []
            }],

            routingPurchaseData : [{
                "displaytitle": "Purchase Type",
                "options": [
                    {
                        "name": "Type 1",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Type 2",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Type 3",
                        "check": false,
                        "isTree": false
                    }
                ],
                "selectedoption": []
            }],
            routingLineData : [{
                "displaytitle": "Line Type",
                "options": [
                    {
                        "name": "Type 1",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Type 2",
                        "check": false,
                        "isTree": false
                    },
                    {
                        "name": "Type 3",
                        "check": false,
                        "isTree": false
                    }
                ],
                "selectedoption": []
            }]
        };

        $scope.resolutionMechanismCheckBox = $scope.resolutionMechanism[$scope.basicDetail.selectedExceptionType.name][$scope.resolutionMechanism.selectedResolveBy.name];

        storeService.set("basicDetail", $scope.basicDetail);

        $scope.onNameChange = function(e){
            $scope.basicDetail.RuleName = e.target.value;
        }

        $scope.onExceptionTypeChange = function(_item){
            $scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox1 = false;
            $scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox2 = false;
            $scope.resolutionMechanism.selectedResolveBy = {'id': '1', 'name': 'IR Flow'};
            $scope.resolutionMechanismCheckBox = $scope.resolutionMechanism[$scope.basicDetail.selectedExceptionType.name][$scope.resolutionMechanism.selectedResolveBy.name];
            storeService.set("basicDetail", $scope.basicDetail);
            $scope.$emit("onExceptionTypeChangeEvent", {basic : $scope.basicDetail, mechanism: $scope.resolutionMechanism, routing:$scope.routingConditions});
        };

        var previousResolveBy = 1;
        $scope.onResolveByChange = function(){
            if(previousResolveBy != Number(arguments[0].id))
            {
                previousResolveBy = Number(arguments[0].id);
                $scope.basicDetail = storeService.get("basicDetail");
                $scope.resolutionMechanism.selectedResolveBy = arguments[0];
                $scope.resolutionMechanismCheckBox = $scope.resolutionMechanism[$scope.basicDetail.selectedExceptionType.name][$scope.resolutionMechanism.selectedResolveBy.name];
                $scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox1 = false;
                $scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox2 = false;
                $scope.$emit("onExceptionTypeChangeEvent", {basic : $scope.basicDetail, mechanism: $scope.resolutionMechanism, routing:$scope.routingConditions});
            }
        };

        $scope.onResolveByCheckboxChange = function(_item)
        {

        }

        $scope.LOBCallback = function (e) {
            storeService.set("LOBData", e.result);
        };

        $scope.supplierCallback = function(e){
            storeService.set("supplierData", e.result);
        }

        // Start: CBR
        var tempCategoryNode_PAS = [],categoryObj;
        $scope.selectedCategoryNodes = [];

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

        var categoryData = {
            method: 'GET',
            url: 'shared/popup/models/category.json'
        };
        var currentType = '';
        $scope.treeOpenCallback = function (type, ind) {
            $scope.addTimLinePeriod = false;
            currentType = type;
            catInd = ind;
            if (type == 'category') {
                $http(categoryData).then(function (response) {
                    categoryObj = response.data;
                    $scope.treeComponentConfig.data = categoryObj;
                    $scope.treeComponentConfig.title = 'Category';
                    $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                });
            }
            $scope.showTreePopup = true;
        };

        $scope.onPopupHideCallback = function () {

            $scope.showTreePopup = false;
            $scope.addTimLinePeriod = true;
            if (currentType == 'category') {
                $scope.selectedCategoriesValidate = true;
            }

            $scope.treeComponentConfig.data = [];
            $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        };

        $scope.selectedCategoriesTxt = "Choose Category";
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
            $scope.treeComponentConfig.data = [];
            $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            storeService.set("selectedCategoryNodes", $scope.selectedCategoryNodes);
        };

        //cbr ends
        $scope.purchaseCallback = function(e){

        }

        $scope.lineCallback = function(e){

        }

        $scope.onResolverChangeMRE = function(_item){

        }

        $scope.onActivityTypeChange = function(_item){

        }

        $scope.onEntityTypeChange = function(_item){

        }

        $scope.publishRules = function(){
            $scope.$emit("onExceptionTypeChangeEvent", {basic : $scope.basicDetail, mechanism: $scope.resolutionMechanism, routing:$scope.routingConditions});
            var resolverStr = categoryStr = "";
            var LOBData = storeService.get("LOBData");
            var supplierData = storeService.get("supplierData");
            if($scope.basicDetail.selectedExceptionType.id == "1")
            {
                if($scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox1)
                    resolverStr+="Requester";
                if($scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox2)
                    resolverStr+=", Entity Owner";

                if(!$scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox1 && !$scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox2)
                    resolverStr="User with override exception activity";
            }
            else if($scope.basicDetail.selectedExceptionType.id == "2")
            {
                if($scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox1)
                    resolverStr+="Order Contact";
                if($scope.resolutionMechanism.ResolverEntityOptions.resolverCheckbox2)
                    resolverStr+=", Entity Owner";
            }
            else
            {
                resolverStr = "User with override exception activity";
            }

             $scope.selectedCategoryNodes = storeService.get("selectedCategoryNodes");
            var tempObj = {
                exceptionType : $scope.basicDetail.selectedExceptionType.name,
                ruleName : $scope.basicDetail.RuleName,
                division : LOBData.value,
                category : $scope.selectedCategoryNodes.length>0 ? $scope.selectedCategoryNodes.join(",") : "",
                supplier : supplierData.value,
                resolution : $scope.resolutionMechanism.selectedResolveBy.name,
                resolver: resolverStr,
                status : true,
                removeable : true
            }
            var tableData = storeService.get("ExceptionRoutingData");
            if(tableData){
                tableData.push(tempObj);
            }
            else
            {
                tableData = [];
                tableData.push(tempObj);
            }
            storeService.set("ExceptionRoutingData", tableData);
        }

        $scope.$on("onExceptionTypeChangeEvent", function(_event, _data){
            $scope.basicDetail = _data.basic;
            $scope.resolutionMechanism = _data.mechanism;
            $scope.routingConditions = _data.routing;
            if($scope.basicDetail.selectedExceptionType.id == "3")
            {
                $scope.resolutionMechanism.selectedResolveBy = {'id': '2', 'name': 'Invoice'};
            }
            $scope.resolutionMechanismCheckBox = $scope.resolutionMechanism[$scope.basicDetail.selectedExceptionType.name][$scope.resolutionMechanism.selectedResolveBy.name];
        });
    }