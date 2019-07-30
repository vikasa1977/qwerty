angular
	.module('SMART2')
	.controller('addFeatureCtrl', ['$scope', '$timeout', '$state', '$http', '$filter', 'notification', 'storeService', 'dbFactory', '$window', addFeatureCtrlFunc])

function addFeatureCtrlFunc($scope, $timeout, $state, $http, $filter, notification, storeService, dbFactory, $window) {
    //filter data
    $scope.emptyText = " ";
    //$scope.showAllCheckbox = true;

    var featuresData = {
        method: 'GET',
        url: 'shared/admin/setupManager/models/addFeaturesData.json'
    };

    $scope.partialData = [];
    $scope.completeData = [];
    $http(featuresData).then(function (response) {
        for (var i = 0; i < 5; i++) {
            $scope.partialData.push(response.data.addFeatureData[i]);
        }
        $scope.addFeatureData = $scope.partialData;
        $scope.completeData = response.data.addFeatureData;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

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

    $scope.init = function (s, e) {
        $scope.data = new wijmo.collections.CollectionView($scope.addFeatureData);

        $scope.data.pageSize = 30;
        $scope.filter = new wijmo.grid.filter.FlexGridFilter(s);
        $scope.filter.defaultFilterType = wijmo.grid.filter.FilterType.Value;
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

        $scope.allFilterClicked = function () {
            $scope.isAllFilterSelected = true;
            for (var i = 0; i < $scope.landingFilterList.length; i++) {
                $scope.landingFilterList[i].isSelected = false;
            }
            $scope.data._src = $scope.allRulesData;
            $scope.data.refresh();
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

    $scope.addNew = function (ctl) {
        //if (ctl.rows[ctl.selectedRows[0]._idx]._data.isSwitch == true) {
            var item = {
                "ProductName": "",
                "ModuleName": "",
                "Feature": "",
                "Description": "",
                "isSwitch": true,
                "Division": "JDNA",
                "Entity": "JDNA",
                "selectedAction": {
                    "name": "Disable"
                },
                "action": [
                        {
                            "name": "Enable"
                        },
                        {
                            "name": "Disable"
                        }
                ],
                "ParentNode": false,
                "ChildNode": true
            };
            ctl.selectedRows[0]._data.children.push(item);
            $scope.data.refresh();
        //}

        $scope.buttonStatus = false;
    }

    $scope.buttonStatus = true;
    $scope.switchCallback = function ($item) {
        $scope.buttonStatus = false;
        if ($item.children.length) {
            $item.children.forEach(function (a) {
                a.isSwitch = $item.isSwitch;
            });
        }
    }

    var checkIfModified = function () {
        for (var i = 0; i < $scope.completeData.length-1; i++) {
            if ($scope.addFeatureData[i].selectedAction != $scope.completeData[i].selectedAction) {
                return true;
            } 
        }
    }
    
    $scope.ngModelResolveFun = function (ev) {
        if (!ev.isChecked) {
            if (checkIfModified()) {
                var deleteConfig = {
                    type: "confirm",
                    message: "There are some unsaved data that will be lost. <br />Are you sure you want to continue?",
                    buttons: [
                        {
                            "title": "YES",
                            "result": true
                        },
                        {
                            "title": "NO",
                            "result": false
                        }
                    ]
                };
                notification.notify(deleteConfig, function (response) {
                    if (response.result) {
                        $scope.buttonStatus = true;
                        $scope.addFeatureData = angular.copy($scope.partialData);
                        $scope.data = new wijmo.collections.CollectionView($scope.addFeatureData);
                        ev.resolveFun(false);
                    } else {
                        ev.resolveFun(true);
                    }
                });
            } else {
                ev.resolveFun(false);
                $scope.addFeatureData = angular.copy($scope.partialData);
                $scope.data = new wijmo.collections.CollectionView($scope.addFeatureData);
            }
        } else {
            ev.resolveFun(true);
            $scope.addFeatureData = angular.copy($scope.completeData);
            $scope.data = new wijmo.collections.CollectionView($scope.addFeatureData);
        };
    }

    $scope.changeActionCallback = function ($item) {    
        $scope.buttonStatus = false;
        var flex = $scope.flex,
        selectionC = $item.selectedAction == true ? flex.selection.row : flex.selection.row - 1;
        $item.Configure = !$item.Configure;
    }

    $scope.deleteItem = function ($item) {
        var flex = $scope.flex,
        row = getParentNode(flex.rows[flex.selection.row]),
        totalChildren = row._data.children;
        index = totalChildren.indexOf($item) - 1;

        totalChildren.splice(index, 1);
        console.log(totalChildren + " " + index);
        $scope.data.refresh();
    }

    function getParentNode(row) {
        // get row level
        var startLevel = row instanceof (wijmo.grid.GroupRow) ? row.level : -1;
        var startIndex = row.index;

        // travel up to find parent node
        for (var i = startIndex - 1; i >= 0; i--) {
            var thisRow = row.grid.rows[i],
                thisLevel = thisRow instanceof (wijmo.grid.GroupRow) ? thisRow.level : -1;
            if (thisLevel > -1) {
                if (startLevel == -1 || (startLevel > -1 && thisLevel < startLevel)) {
                    return thisRow;
                }
            }
        }
        // not found
        return null;
    };

    //Select Division Popup
    $scope.divisionPopupUrl = "shared/admin/setupManager/views/selectDivisionPopup.html";

    $scope.selectDivision = false;
    $scope.selectDivisionCallback = function () {
        $scope.buttonStatus = false;
        $scope.selectDivision = true;
    };

    $scope.selectDivisionOnHideCallback = function () {
        $scope.selectDivision = false;
    };

    //Select Entity Popup
    $scope.entityPopupUrl = "shared/admin/setupManager/views/selectEntityPopup.html";

    $scope.selectEntity = false;
    $scope.selectEntityCallback = function () {
        $scope.buttonStatus = false;
        $scope.selectEntity = true;
    };

    $scope.selectEntityOnHideCallback = function () {
        $scope.selectEntity = false;
    };

    $scope.selectValues = [
        {
            name: "ABC",
            division: "JD NA",
            entity: "JD Tractor",
            isChecked: true,
        },
        {
            name: "LMN",
            division: "Kellog",
            entity: "Kellog Chips",
            isChecked: true,
        },
        {
            name: "PQR",
            division: "Dell",
            entity: "Dell Laptop",
            isChecked: true,
        },
        {
            name: "XYZ",
            division: "Sony",
            entity: "Smart Phone",
            isChecked: true,
        },
    ];

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
};