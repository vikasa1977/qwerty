angular.module('SMART2')
    .controller('ruleEngineLandingCtrl', ['$scope', '$rootScope', '$http', 'routeSvc', '$timeout', '$state', 'notification', '$sce', 'storeTempService', ruleEngineLandingCtrlFunc])

function ruleEngineLandingCtrlFunc($scope, $rootScope, $http, routeSvc, $timeout, $state, notification, $sce, storeTempService) {
    $rootScope.isPageWithoutImage = true;
    $scope.getURLPath = 'shared/admin/ruleEngine/models/ruleEngine_data.json';
    $scope.isListView = true;
    $scope.scannedImg = false;

    var getRespond = {
        method: 'GET',
        url: $scope.getURLPath
    };

    //http call to get the rules
    $http(getRespond).then(function (response) {
        $scope.doclists = response.data.datalist;
        $scope.AllReqData = $scope.doclists;
        $scope.dataLength = $scope.doclists.length;
        for (var i = 0; i < $scope.landingFilterList.length; i++) {
            var countStatus = 0;
            if ($scope.isdocGroup) {
                for (var j = 0; j < $scope.doclists.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.doclists[j].docType) {
                        countStatus++;
                    }
                }
            }
            else {
                for (var j = 0; j < $scope.doclists.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.doclists[j].collection) {
                        countStatus++;
                    }
                }
            }
            $scope.landingFilterList[i].itemCount = countStatus;
            if (countStatus > 99) {
                $scope.landingFilterList[i].itemCount = '99+';
            }
        }
        $scope.listViewlists = response.data.listViewlists;
        $scope.hideLoadMore = true;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.showFilterPanel = false;
    //close filter
    $scope.toggleDocumentFilter = function (evt) {
        if ($scope.showFilter == false) {
            $scope.showFilter = true;
            //$rootScope.isFilterVisible = true;
        }
        else {
            $scope.showFilter = false;
            if (evt === 'apply') {
                $scope.showFilterPanel = true;
            }
            //$rootScope.isFilterVisible = false;
        }
    };

    $scope.resetFilter = function () {
        $scope.showFilterPanel = false;
    };
    //filter data
    $scope.emptyText = " ";
    $scope.showAllCheckbox = true;

    //Rule Summary Data
    var properties = [

    {
        "RuleName": "Approvals_Requistion",
        "RuleNumber": "121",
        "status": true,
        "RuleCategory": "Approvals",
        "UpdateDate": "27/10/2016",
        "UpdateBy": "Admin-3",
        "DocumentGroup": "P2P",
        "displayName": "P2P",
        "DocumentType": "Requisitions",
        "CreationMethod": "Approval Matrix",
        "Condition": "3",
        "Action Type": "Approval Group",
        "LastModified": "23/12/2016",
    },
    {
        "RuleName": "Validation_PO_",
        "RuleNumber": "122",
        "status": true,
        "RuleCategory": "Validation",
        "UpdateDate": "1/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "P2P",
        "displayName": "P2P",
        "DocumentType": "PO",
        "CreationMethod": "Standard Rule",
        "Condition": "5",
        "Action Type": "Supervisiory Height",
        "LastModified": "10/12/2016",
    },
    {
        "RuleName": "Assignment_IR_",
        "RuleNumber": "123",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "3/12/2016",
        "UpdateBy": "Admin-4",
        "DocumentGroup": "P2P",
        "displayName": "P2P",
        "DocumentType": "IR",
        "CreationMethod": "Standard Rule",
        "Condition": "5",
        "Action Type": "Auto Approval",
        "LastModified": "14/12/2016",
        "status": true,
    },
    {
        "RuleName": "Automation_P2P_",
        "RuleNumber": "124",
        "status": true,
        "RuleCategory": "Automation",
        "UpdateDate": "16/12/2016",
        "UpdateBy": "Admin-5",
        "DocumentGroup": "P2P",
        "displayName": "P2P",
        "DocumentType": "Requisitions",
        "CreationMethod": "Standard Rule",
        "Condition": "5",
        "Action Type": "Approval Group",
        "LastModified": "14/12/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "125",
        "status": true,
        "RuleCategory": "Defaulting",
        "UpdateDate": "20/12/2016",
        "UpdateBy": "Admin-6",
        "DocumentGroup": "P2P",
        "displayName": "P2P",
        "DocumentType": "PO",
        "CreationMethod": "Standard Rule",
        "Condition": "5",
        "Action Type": "Approval Group",
        "LastModified": "1/12/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "126",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Contract",
        "displayName": "Contracts",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "127",
        "status": true,
        "RuleCategory": "Defaulting",
        "UpdateDate": "20/12/2016",
        "UpdateBy": "Admin-6",
        "DocumentGroup": "P2P",
        "displayName": "P2P",
        "DocumentType": "PO",
        "CreationMethod": "Standard Rule",
        "Condition": "5",
        "Action Type": "Approval Group",
        "LastModified": "1/12/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "128",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Contract",
        "displayName": "Contracts",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "129",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Contract",
        "displayName": "Contracts",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "130",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Contract",
        "displayName": "Contracts",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "131",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Contract",
        "displayName": "Contracts",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "132",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Contract",
        "displayName": "Contracts",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Assignment_Control",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Sourcing",
        "displayName": "Sourcing",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Assignment_Control",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Sourcing",
        "displayName": "Sourcing",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Assignment_Control",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Sourcing",
        "displayName": "Sourcing",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Assignment_Control",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Sourcing",
        "displayName": "Sourcing",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Sourcing",
        "displayName": "Sourcing",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Sourcing",
        "displayName": "Sourcing",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Suppliers",
        "displayName": "Suppliers",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Defaulting_P2P_P",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Suppliers",
        "displayName": "Suppliers",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Assignment_Control",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Suppliers",
        "displayName": "Suppliers",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Assignment_Control",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Suppliers",
        "displayName": "Suppliers",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Validation_PO_",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Suppliers",
        "displayName": "Suppliers",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Validation_PO_",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Projects",
        "displayName": "Projects",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Validation_PO_",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Projects",
        "displayName": "Projects",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Validation_PO_",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Projects",
        "displayName": "Projects",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Validation_PO_",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Projects",
        "displayName": "Projects",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    {
        "RuleName": "Validation_PO_",
        "RuleNumber": "133",
        "status": true,
        "RuleCategory": "Assignment",
        "UpdateDate": "7/12/2016",
        "UpdateBy": "Admin-2",
        "DocumentGroup": "Projects",
        "displayName": "Projects",
        "DocumentType": "PO",
        "CreationMethod": "Approval Matrix",
        "Condition": "5",
        "Action Type": "Auto Reject",
        "LastModified": "30/11/2016",

    },
    ];

    $scope.init = function (s, e) {

        var grid = $scope.grid = s;
        $scope.data = new wijmo.collections.CollectionView(properties);

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

                // cancel default handling
                //e.preventDefault();
                //e.stopPropagation();
                //e.stopImmediatePropagation();
            }
            // toggle footer depending upon the selectedRows values selected



            //var selectedRows = _.filter(grid.rows, function (r) {

            //    if (r.isSelected == true) {
            //        $scope.showAllCheckbox = true;

            //        return r;
            //    } else if (r.isSelected == false) {


            //        $scope.showAllCheckbox = false;


            //        return r;
            //    }
            //});
            //selectedRows.length != 0 ? $scope.showAllCheckbox = true : $scope.showAllCheckbox = false;

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

    $scope.checktext = false;

    function areAllRowsSelected(grid) {
        for (var i = 0; i < grid.rows.length; i++) {
            if (!grid.rows[i].isSelected) return false;
        }
        return true;
    }


    $scope.notificationToggle = true;


    $scope.importDocumentFilterTabData = [
    {
        "title": "Created By",
        "contentUrl": "createdBy.html",
        "htmlmode": true,
        "tabsUrl": "tabHeader1.html"

    }, {
        "title": "Conditions",
        "contentUrl": "documentType.html",
        "active": true,
        "htmlmode": true,
        "tabsUrl": "tabHeader2.html"
    }, {
        "title": "Action Type",
        "contentUrl": "recipientType.html",
        "htmlmode": true,
        "tabsUrl": "tabHeader3.html"
    }, {
        "title": "Creation Date",
        "contentUrl": "dateRange.html",
        "htmlmode": true,

        "tabsUrl": "tabHeader4.html"
    }, {
        "title": "Status",
        "contentUrl": "deliveryStatus.html",
        "htmlmode": true,
        "tabsUrl": "tabHeader5.html"
    }

    ];

    // filter select-field  data

    $scope.ruleCategoryData = [{ "name": "Approvals" }, { "name": "Submission Check" }, { "name": "Template Selection" }, { "name": " Notification" }, { "name": "Request Redirection" }, { "name": "Requisition Order" }];
    $scope.documentGroupData = [{ "name": "P2P" }, { "name": "Contracts" }, { "name": "Sourcing" }, { "name": "Projects" }, { "name": "Supplier" }];
    $scope.documentTypeData = [{ "name": " Catalog Requisitions" }, { "name": "New order" }, { "name": "Change Order" }, { "name": "Release Order" }, { "name": "PO Receipt" }, { "name": "PO Invoice" }, { "name": "IR with PO" }, { "name": " Payment Request" }];
    //$scope.creationMethodData = [{ "name": s"Approvals" }, { "name": "Submission Check" }];

    //LEFT PANEL FILTER JS
    $scope.isAllFilterSelected = true;
    var landingFilterListOfStatus = [
          {
              "filterBy": "P2P",
              "name": "P2P",
              "iconID": "#icon_Draft",
              "itemCount": '99+',
              "isSelected": false
          },
          {
              "filterBy": "Contracts",
              "name": "Contracts",
              "iconID": "#icon_Contract",
              "itemCount": '99+',
              "isSelected": false
          },
         {
             "filterBy": "Sourcing",
             "name": "Sourcing",
             "iconID": "#icon_Sourcing",
             "itemCount": '3',
             "isSelected": false
         },
        {
            "filterBy": "Suppliers",
            "name": "Suppliers",
            "iconID": "#icon_Supplier",
            "itemCount": '4',
            "isSelected": false
        },
        {
            "filterBy": "Projects",
            "name": "Projects",
            "iconID": "#icon_projects",
            "itemCount": '4',
            "isSelected": false
        }
    ];

    var landingFilterListOfCollection = [
          {
              "filterBy": "collection 1",
              "name": "collection 1",
              "iconID": "#icon_Draft",
              "itemCount": '99+',
              "isSelected": false
          },
          {
              "filterBy": "collection 2",
              "name": "collection 2",
              "iconID": "#icon_Contract",
              "itemCount": '99+',
              "isSelected": false
          },
         {
             "filterBy": "collection 3",
             "name": "collection 3",
             "iconID": "#icon_Sourcing",
             "itemCount": '3',
             "isSelected": false
         },
        {
            "filterBy": "collection 4",
            "name": "collection 4",
            "iconID": "#icon_Supplier",
            "itemCount": '4',
            "isSelected": false
        }
    ];
    $scope.isdocGroup = true;
    if ($scope.isdocGroup) {
        $scope.landingFilterList = landingFilterListOfStatus;
    }
    else {
        $scope.landingFilterList = landingFilterListOfCollection;
    }

    //page tabs
    $scope.selectedTab = 1;
    $scope.tabsData = [{
        "title": 'DOCUMENT GROUPS',
        "contentUrl": "shared/admin/ruleEngine/views/documentGroups.html",
        "active": true,
        "id": "docGroup"
    }, {
        "title": 'COLLECTIONS',
        "contentUrl": "shared/admin/ruleEngine/views/collections.html",
        "id": "collection"
    }];

    $scope.tabClick = function (tab) {
        if (tab.id == "docGroup") {
            $scope.isdocGroup = true;
            $scope.landingFilterList = landingFilterListOfStatus;
            $scope.AllReqData = $scope.doclists;
            $scope.dataLength = $scope.doclists.length;
            for (var i = 0; i < $scope.landingFilterList.length; i++) {
                var countStatus = 0;
                for (var j = 0; j < $scope.doclists.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.doclists[j].docType) {
                        countStatus++;
                    }
                }
                $scope.landingFilterList[i].itemCount = countStatus;
                if (countStatus > 99) {
                    $scope.landingFilterList[i].itemCount = '99+';
                }
            }
            $scope.listViewlists = response.data.listViewlists;
            $scope.hideLoadMore = true;
        }
        else {
            $scope.isdocGroup = false;
            $scope.landingFilterList = landingFilterListOfCollection;
            $scope.AllReqData = $scope.doclists;
            $scope.dataLength = $scope.doclists.length;
            for (var i = 0; i < $scope.landingFilterList.length; i++) {
                var countStatus = 0;
                for (var j = 0; j < $scope.doclists.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.doclists[j].collection) {
                        countStatus++;
                    }
                }
                $scope.landingFilterList[i].itemCount = countStatus;
                if (countStatus > 99) {
                    $scope.landingFilterList[i].itemCount = '99+';
                }
            }
            $scope.listViewlists = response.data.listViewlists;
            $scope.hideLoadMore = true;
        }
    };

    //getStatusColor to set the rule status color
    $scope.getStatusColor = function (ele) {
        switch (ele) {
            case 'Active':
                return 'green-text';
                break;
            case 'Inactive':
                return 'red-text';
                break;
            default:
                return 'grey-text';
        }
    }

    //setValue to set icons for rule
    $scope.setValue = function (ele) {
        switch (ele) {
            case 'P2P':
                return '#icon_RFX';
                break;
            case 'Contracts':
                return '#icon_Contract';
                break;
            case 'Sourcing':
                return '#icon_Sourcing';
                break;
            case 'Suppliers':
                return '#icon_Supplier';
                break;
            case 'Projects':
                return '#icon_projects';
                break;
            default:
                return false;
        }
    }


    $scope.filteredData = [];
    $scope.currentFilterApplied = '';

    $scope.allFilterClicked = function () {
        $scope.doclists = [];
        $scope.doclists = $scope.AllReqData;
        for (var i = 0; i < $scope.landingFilterList.length; i++) {
            $scope.landingFilterList[i].isSelected = false;
        }
        $scope.isAllFilterSelected = true;
        $scope.isApplyFilters = false;
        $scope.bandHeight = 0;
        $scope.currentFilterApplied = '';
    }
    $scope.filterResetWarningCall = function () {
        var config = {
            type: "warning",
            message: "<div class='left-align'>All filters applied will be reset.</div>",
            buttons:
                [
                    { "title": "PROCEED", "result": "proceed" },
                    { "title": "CANCEL", "result": "cancel" }
                ]
        }
        notification.notify(config, function (response) {
            if (response.result == 'proceed') {
                $scope.allFilterClicked();
                $scope.isApplyFilters = false;
                $scope.bandHeight = 0;
                $scope.isFilteredFromMain = false;
            }
        });
    }
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
    $scope.showExportPopup = false;
    $scope.showExportPopupCallback = function () {
        $scope.showExportPopup = true;
    }
    $scope.exportPopupOnHideCallback = function (e) {
        $scope.showExportPopup = false;
    }
    $scope.showExportLogPopup = false;
    $scope.exportLogPopupOnHideCallback = function (e) {
        $scope.showExportLogPopup = false;
    }
    $scope.viewExportLogCall = function () {
        $scope.showExportPopup = false;
        $scope.showExportLogPopup = true;
    }

    $scope.listSortWith = $scope.listSortWith = [
                { 'name': 'Last Modified', 'sortas': 'asc_desc' },
                { 'name': 'Name (A-Z)', 'sortas': 'asc_desc' },
                 { 'name': 'Name (Z-A)', 'sortas': 'asc_desc' },
                { 'name': 'Last Created', 'sortas': 'asc_desc' }
    ];

    /*filter type*/
    $scope.showFilter = false;
    $scope.toggleFilter = function (e) {
        if ($scope.showFilter == false)
            $scope.showFilter = true;
        else
            $scope.showFilter = false;
    };

    var setDataType, setDataStatus;

    setDataType = [
            { filterLabel: 'Requisitions', isChecked: false },
            { filterLabel: 'Orders', isChecked: false },
            { filterLabel: 'Programs', isChecked: false },
            { filterLabel: 'Receipts', isChecked: false },
            { filterLabel: 'Return Note', isChecked: false },
            { filterLabel: 'Invoices', isChecked: false },
            { filterLabel: 'Credit Memo', isChecked: false },
            { filterLabel: 'Invoice Reconciliation', isChecked: false }
    ];

    setDataStatus = [
                    { filterLabel: 'Draft', isChecked: false },
                    { filterLabel: 'Approval Pending', isChecked: false },
                    { filterLabel: 'Approved', isChecked: false },
                    { filterLabel: 'Rejected', isChecked: false },
                    { filterLabel: 'Withdrawn', isChecked: false },
                    { filterLabel: 'Supplier Acknowledged', isChecked: false },
                    { filterLabel: 'Sent To supplier', isChecked: false },
                    { filterLabel: ' Sent To Buyer', isChecked: false },
                    { filterLabel: 'Cancelled', isChecked: false },
                    { filterLabel: 'Sending To supplier Failed', isChecked: false },
    ];
    //loader
    $scope.totalDisplayed = 10;

    $scope.loadMore = function () {
        $scope.totalDisplayed += 7;
    }

    $scope.actionSelectedCallback = function (ele, index, item) {
        var buttonType = ele.key;
        switch (buttonType) {
            case 'Edit':
                storeTempService.set($scope.doclists[index]);
                $state.go('admin.createRule', { mode: 'edit' });
                return false;
                break;
            case 'View documents':
                return false;
                break;
            case 'Close':
                return false;
            case 'Activate_Rule':
            case 'Deactivate_Rule':
                return $scope.deleteItem(ele, index, item);
            default:
                return false;
        }
    };

    $scope.deleteItem = function (ele, index, item) {
        var activeteOrDeactive = ele.key == 'Deactivate_Rule' ? 'activate' : 'deactivate';
        var deleteConfig = {
            activeOrInactive: item.docType,
            type: "warning",
            message: 'Are you sure you want to ' + activeteOrDeactive + ' this rule?',
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

        //alertmsg = {
        //    type: "success",
        //    message: "Item Deleted Successfully",
        //    buttons: [
        //    {
        //        "title": "Ok"
        //    }
        //    ]
        //};

        notification.notify(deleteConfig, function (response) {
            if (!response.result) {
                return false;
            } else {
                if ($scope.doclists[index].docStatus === 'Active') {
                    $scope.doclists[index].docStatus = "Inactive";
                } else {
                    $scope.doclists[index].docStatus = "Active";
                }
                //notification.notify(alertmsg);
            }
        });
    };

    //selected current    
    function checkArrayValue() {
        var flag = false;
        for (var i = 0; i < $scope.doclists.length; i++) {
            if ($scope.doclists[i].isdocSelected == true) {
                flag = true;
                break;
            } else {

                flag = false;
            }
            return flag
        }
    };

    function getSelectedCount() {
        return $scope.doclists.filter(function (el) { return el.isdocSelected == true }).length;
    };

    $scope.totalCheckedLists = 0;
    $scope.selectCurrent = function (currentValue) {
        if (currentValue == true && getSelectedCount() != $scope.doclists.length) {
            $scope.ShowCheckboxs = true;
            $scope.isDisabled = false;
            $scope.fillpartial = true;
            $scope.totalCheckedLists = $scope.totalCheckedLists + 1;
        }
        else if (currentValue == false && checkArrayValue() == false) {
            $scope.ShowCheckboxs = false;
            $scope.totalCheckedLists = $scope.totalCheckedLists - 1;
        }
    };

    $scope.toggleAll = function () {
        $scope.ShowCheckboxs = !$scope.ShowCheckboxs;
        if ($scope.isAllSelected) {
            $scope.isAllSelected = false;
        } else {
            $scope.isAllSelected = true;
        }
        angular.forEach($scope.doclists, function (item) {
            item.isdocSelected = $scope.isAllSelected;
        });
    };
    $scope.pageView = 'List View';
    $scope.changeView = function () {
        $scope.isListView = !$scope.isListView;

    };

    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };

    $scope.operatorRange = false;
    $scope.hideDateRow = false;
    $scope.onChangeFilterType = function (conditionOp) {
	    if (conditionOp.name == "Between") {
	        $scope.operatorRange = true;
	        $scope.hideDateRow = true;
    }
    else {
	        $scope.operatorRange = false;
	        $scope.hideDateRow = false;
    }
    };

    $scope.defaultSelectedOperator = '';
    //$scope.operatorValue = "Value";
    $scope.operatorsList = [
        { 'name': 'Greater than' },
        { 'name': 'Greater than equals to' },
        { 'name': 'Less than' },
        { 'name': 'Less than equals to' },
        { 'name': 'Equal' },
        { 'name': 'Not equal to' },
        { 'name': 'Between' },
	    { 'name': 'Is Null' },
	    { 'name': 'Is Not Null' }];
}