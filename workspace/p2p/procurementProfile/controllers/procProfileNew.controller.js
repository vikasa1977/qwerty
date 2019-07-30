(function () {
    'use strict';
    angular.module('SMART2')
    .controller('procProfileNewCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', procProfileNewCtrlFunc])
    .controller('accountDetailsCtrl', ['$scope', '$rootScope', '$translate', '$window', '$http', 'lookup', 'debouncer', '$timeout', 'notification', accountDetailsCtrlFunc])
    .controller('lineTypeSpecificDetailCtrl', ['$scope', '$rootScope', '$translate', '$window', '$http', 'lookup', 'debouncer', '$timeout', 'notification', lineTypeSpecificDetailCtrlFunc]);

    function procProfileNewCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce, $interval, $notification, storeService, $window) {
        $scope.status = "DRAFT";
        var getURLwithStatus = 'p2p/procurementProfile/models/createProcProfile.json',
               procurmentProfile = {
                   method: 'GET',
                   url: getURLwithStatus
               };

        $http(procurmentProfile).then(function (response) {

            $scope.dataModel = response.data.dataModel;
            $scope.config = response.data.formConfig;
            if (storeService.get('isViewLineItem')) {
                for (var i = 0; i < $scope.config.sections[0].rows[0].properties[0].length; i++) {
                    $scope.config.sections[0].rows[0].properties[i].focus = false;
                }
                $scope.config.sections[4].isActive = true;
                $timeout(function () {
                    var lineDetailsOffsetTop = angular.element('.card.cardParent[label="LINES DETAILS"]').offset().top;
                    $window.scrollTo(0, lineDetailsOffsetTop);
                }, 500);
            }
            $scope.$watch('dataModel', function (n, o) {
            }, true);
        }, function (error) {
            console.log(JSON.stringify(error));
        });

        /*share popup*/
        $scope.showShareWithPopup = false;
        $scope.showShareWithPopupFunc = function (e) {
            $scope.showShareWithPopup = true;
        }
        $scope.shareWithOnHideCallback = function (e) {
            $scope.showShareWithPopup = false;

        };

        $scope.shareWithConfig = [
        {
            "teamMemberId": 1,
            "title": "John Doe",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": true
        },
        {
            "teamMemberId": 2,
            "title": "Smith Johnson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "smith.johnson@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Team Lead PO",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "teamMemberId": 3,
            "title": "Brown Williams",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "brown.williams@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "teamMemberId": 4,
            "title": "Davis Miller",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "davis.miller@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Chief Category Officer",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "teamMemberId": 5,
            "title": "Wilson Moore",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "wilson.moore@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Resourcing Specialist",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jones Taylor",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jones.taylor@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Thomas Anderson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "thomas.anderson@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Director",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jackson White",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jackson.white@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Procurement Specialist",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Martin Harris",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "martin.harris@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Procurement Operations Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Garcia Thompson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "garcia.thompson@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Martinez Robinson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "martinez.robinson@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Clark Rodriguez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "clark.rodriguez@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Service Delivery Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Lewis Walker",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "lewis.walker@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Allen Lee",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.lee@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Strategic Procurement Lead",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Young Hernandez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "young.hernandez@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Scott Hall",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "scott.hall@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Wright King",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "wright.king@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Corporate Procurement Lead",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Green Lopez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "green.lopez@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Programme Lead",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Adams Hill",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "adams.hill@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Nelson Baker",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "nelson.baker@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Category Sourcing Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Hannah Carter",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "hannah.carter@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Procurement Team Lead",
            "preAdd": false,
            "isPrimary": false

        },
        {
            "title": "Sarah Thompson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "sarah.thompson@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Principal Delivery Consultant",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Michael Steven",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "michael.steven@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jacob Christopher",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jacob.christopher@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "University Purchasing Consultant",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Tyler Jason",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "tyler.jason@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Daniel Moore",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "daniel.moore@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "HR Manager - Procurement",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Matthew Kenneth",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "matthew.kenneth@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Ryan Johnson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "ryan.johnson@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jordan Daniel",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jordan.daniel@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Sourcing Manager",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Jake William",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jake.william@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Courtney Mitchell",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "courtney.mitchell@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Sierra Perez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "sierra.perez@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Nicholas Roberts",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "nicholas.roberts@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Account Records Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Cody Turner",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "cody.turner@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Steven Phillips",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "steven.phillips@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Operations Chief",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Gabriel Campbell",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "gabriel.campbell@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Alexander Parker",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "alexander.parker@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Inventory Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jeremy Evans",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jeremy.evans@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Gavin Edwards",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "gavin.edwards@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Procurement Marketing Manager",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Amy Collins",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "amy.collins@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Administrative Manager",
            "preAdd": true,
            "isPrimary": false
        }

        ];
        /*delete content*/
        $scope.deleteProfile = function (index) {
            var deleteConfig = {
                type: "confirm",
                message: "Do you want to delete current item?",
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
            },

            alertmsg = {
                type: "success",
                message: "Item Deleted Successfully",
                buttons: [
                {
                    "title": "Ok"
                }
                ]
            };


            notification.notify(deleteConfig, function (response) {
                if (response.result) {
                    $state.go("expandedLandingList",{pagefor:'manage',doctype:'procProfile' });
                }
            });
        }
    }
    /*accountDetailsCtrl*/
    function accountDetailsCtrlFunc($scope, $rootScope, $translate, $window, $http, lookup, debouncer, $timeout, notification) {
        // splite view popup
        $scope.listSplits = [];
        $scope.showSplitPopup = false;
        var indexForSplitFor;
        $scope.showSplitePopup = function (index) {
            indexForSplitFor = $scope.accountLists[index].isparentItem ? $scope.accountLists[index].id : $scope.accountLists[index].parentId;
            $scope.showSplitPopup = true;
        }
        $scope.onSplitePopupHideCallback = function (e) {
            $scope.showSplitPopup = false;
        }



        //-- end here 
        //-- manage columns
        $scope.fields = [
                { 'label': 'Account Assignment Category', 'selected': true },
                { 'label': 'Cost Center', 'selected': true },
                { 'label': 'Internal Order', 'selected': true },
                { 'label': 'Project Code', 'selected': true },
                { 'label': 'GL Code', 'selected': true },
                { 'label': 'Splite Type ', 'selected': true },
                { 'label': 'Split', 'selected': true },
                { 'label': 'Split Percentages', 'selected': true }
        ];
        $scope.manageColumns = function () {
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


        }
        $scope.selectedAll = { 'selection': true }, $scope.fillpartial = false, $scope.isVisible = false;
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

        $scope.reset = function () {
            $scope.selectedAll.selection = false;
            $scope.fillpartial = false;
            $scope.isVisible = false;
            $scope.checkAll(false);
            $scope.selectedCount = getSelectedCout($scope.fields);

        };
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

        function getSelectedCout(obj) {
            var count = 0;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].selected === true) {
                    count++;
                }
            }
            return count;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);

        function isAtleastOneSelected(obj) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].selected === true) {
                    return true;
                }
            }
            return false;
        }

        function isAllSelected(obj) {
            for (var i = 0; i < obj.length; i++) {
                if (!obj[i].selected) {
                    return false;
                }
            }
            return true;
        }

        $scope.showSelectedColumn = function () {
            $(document).trigger("click");
        }
        $scope.cancelMangeColumn = function (e, selectAll) {
            if (selectAll == false) {
                $scope.checkAll();
            }
            $(document).trigger("click");
        }
        /*manage columns end here*/
        /*Accouting details Table*/

        $scope.accountTbl = { 'isSelected': false }
        $scope.accountLists = [
            {
                'isSelected': false,
                'id': 0,
                'lineType': {
                    'errorMsg': "",
                    'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                    'selected': ""
                },
                'itemType': {
                    'errorMsg': "",
                    'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                    'selected': ""
                },
                'accountAssignmentCategory': '',
                'costCenter': {
                    'errorMsg': "",
                    'options': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11103 - P Oth Inc/Exp OS", "check": false }, { "name": "1100-11109 - A Oth Inc/Exp OS", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "1100-12101 - H Oth Inc/Exp ID", "check": false }, { "name": "1100-12110 - P Oth Inc/Exp ID NA", "check": false }, { "name": "1100-12111 - P Oth Inc/Exp ID SA", "check": false }],
                    'selected': ""
                },
                'internalOrder': {
                    'errorMsg': "",
                    'options': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }, { "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }, { "name": "105153 - HVAC Repairs", "check": false }, { "name": "105327 - A2 Production Readiness", "check": false }, { "name": "106329 - Industrial Paint System CAR", "check": false }, { "name": "106330 - Steel Paint System CAR", "check": false }, { "name": "106362 - Charlotte Office/PT Design Center Lease", "check": false }],
                    'selected': ""
                },
                'projectCode': {
                    'errorMsg': "",
                    'options': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }, { "name": "Lorem Ipsum2", "check": false, "ischeck": true }, { "name": "Lorem Ipsum3", "check": false }, { "name": "Lorem Ipsum4", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "Lorem Ipsum6", "check": false }, { "name": "Lorem Ipsum7", "check": false }, { "name": "Lorem Ipsum8", "check": false }],
                    'selected': ""
                },
                'glCode': {
                    'errorMsg': "",
                    'options': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }, { "name": "6190000 - Operating Supplies", "check": false, "ischeck": true }, { "name": "6190100 - Operating Equipment", "check": false }, { "name": "6210000 - Perishable Tooling", "check": false }, { "name": "6240030 - Tool Maintenance", "check": false }, { "name": "6190010 - Chemicals", "check": false }, { "name": "6190050 - Lubricants", "check": false }, { "name": "6190090 - Welding Supplies", "check": false }],
                    'selected': ""
                },
                'spliteType': 'Percentage',
                'splite': '',
                'splitePercentages': '',
                'isparentItem': true,
                'spliteCount': 0
            }
        ];


        /* pagination */
        $scope.selectedTab = 1;
        $scope.rowsToShowOpts = {
            availableOptions: [
              { size: '5' },
              { size: '10' }
            ],
            selectedOption: { size: '5' }
        };
        $scope.currPage = { "no": 1 };
        $scope.pageChanged = function (newPage, oldPage) {
            $scope.currPage.no = newPage;
        };

        /*AccountAssignmentCategory*/
        // Start: CBR
        var tempCategoryNode_PAS = [];
        var tempBUNode_PAS = ['851750000001'];
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

            $scope.treeComponentConfig.requestParameter = {
                navigationContext: "PAS"
            };
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

        $scope.selectedCategoriesTxt = "Choose Category";
        $scope.selectedBUTxt = "Technology Solutions +10 More";
        $scope.selectedRegionTxt = "Choose Region";

        $scope.selectedCategoriesValidate = false;
        $scope.selectedBUValidate = false;
        $scope.selectedRegionValidate = false;

        $scope.selectedCategoryNodes = [];
        $scope.selectedBUNodes = ['Technology Solutions'];
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

        /* splitType  */
        $scope.splitTypes = [{
            "code": "amount",
            "name": "Amount",
            "disable": true
        }, {
            "code": "percentage",
            "name": "Percentage",
            "disable": true
        }];
        $scope.selectedSplitType = { "code": "percentage", "name": "Percentage", "disable": true };
        $scope.splitName = "Percentage";

        $scope.listSplits = [{
            "value": "100"
        }];

        $scope.addSplit = function () {
            $scope.listSplits.push(
            {
                "value": "0"
            }
            );

        };

        $scope.deleteSplit = function (index) {
            $scope.listSplits.splice(index, 1);

        }
        $scope.splitsApply = function () {
            var data1 = {
                'isSelected': false,
                'id': 1,
                'lineType': {
                    'errorMsg': "",
                    'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                    'selected': ""
                },
                'itemType': {
                    'errorMsg': "",
                    'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                    'selected': ""
                },
                'accountAssignmentCategory': '',
                'costCenter': {
                    'errorMsg': "",
                    'options': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11103 - P Oth Inc/Exp OS", "check": false }, { "name": "1100-11109 - A Oth Inc/Exp OS", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "1100-12101 - H Oth Inc/Exp ID", "check": false }, { "name": "1100-12110 - P Oth Inc/Exp ID NA", "check": false }, { "name": "1100-12111 - P Oth Inc/Exp ID SA", "check": false }],
                    'selected': ""
                },
                'internalOrder': {
                    'errorMsg': "",
                    'options': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }, { "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }, { "name": "105153 - HVAC Repairs", "check": false }, { "name": "105327 - A2 Production Readiness", "check": false }, { "name": "106329 - Industrial Paint System CAR", "check": false }, { "name": "106330 - Steel Paint System CAR", "check": false }, { "name": "106362 - Charlotte Office/PT Design Center Lease", "check": false }],
                    'selected': ""
                },
                'projectCode': {
                    'errorMsg': "",
                    'options': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }, { "name": "Lorem Ipsum2", "check": false, "ischeck": true }, { "name": "Lorem Ipsum3", "check": false }, { "name": "Lorem Ipsum4", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "Lorem Ipsum6", "check": false }, { "name": "Lorem Ipsum7", "check": false }, { "name": "Lorem Ipsum8", "check": false }],
                    'selected': ""
                },
                'glCode': {
                    'errorMsg': "",
                    'options': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }, { "name": "6190000 - Operating Supplies", "check": false, "ischeck": true }, { "name": "6190100 - Operating Equipment", "check": false }, { "name": "6210000 - Perishable Tooling", "check": false }, { "name": "6240030 - Tool Maintenance", "check": false }, { "name": "6190010 - Chemicals", "check": false }, { "name": "6190050 - Lubricants", "check": false }, { "name": "6190090 - Welding Supplies", "check": false }],
                    'selected': ""
                },
                'spliteType': 'Percentage',
                'splite': 'split 1',
                'splitePercentages': '90',
                'isparentItem': false,
                'parentId': indexForSplitFor
            },
            data2 =  {
                'isSelected': false,
                'id': 2,
                'lineType': {
                    'errorMsg': "",
                    'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                    'selected': ""
                },
                'itemType': {
                    'errorMsg': "",
                    'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                    'selected': ""
                },
                'accountAssignmentCategory': '',
                'costCenter': {
                    'errorMsg': "",
                    'options': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11103 - P Oth Inc/Exp OS", "check": false }, { "name": "1100-11109 - A Oth Inc/Exp OS", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "1100-12101 - H Oth Inc/Exp ID", "check": false }, { "name": "1100-12110 - P Oth Inc/Exp ID NA", "check": false }, { "name": "1100-12111 - P Oth Inc/Exp ID SA", "check": false }],
                    'selected': ""
                },
                'internalOrder': {
                    'errorMsg': "",
                    'options': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }, { "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }, { "name": "105153 - HVAC Repairs", "check": false }, { "name": "105327 - A2 Production Readiness", "check": false }, { "name": "106329 - Industrial Paint System CAR", "check": false }, { "name": "106330 - Steel Paint System CAR", "check": false }, { "name": "106362 - Charlotte Office/PT Design Center Lease", "check": false }],
                    'selected': ""
                },
                'projectCode': {
                    'errorMsg': "",
                    'options': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }, { "name": "Lorem Ipsum2", "check": false, "ischeck": true }, { "name": "Lorem Ipsum3", "check": false }, { "name": "Lorem Ipsum4", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "Lorem Ipsum6", "check": false }, { "name": "Lorem Ipsum7", "check": false }, { "name": "Lorem Ipsum8", "check": false }],
                    'selected': ""
                },
                'glCode': {
                    'errorMsg': "",
                    'options': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }, { "name": "6190000 - Operating Supplies", "check": false, "ischeck": true }, { "name": "6190100 - Operating Equipment", "check": false }, { "name": "6210000 - Perishable Tooling", "check": false }, { "name": "6240030 - Tool Maintenance", "check": false }, { "name": "6190010 - Chemicals", "check": false }, { "name": "6190050 - Lubricants", "check": false }, { "name": "6190090 - Welding Supplies", "check": false }],
                    'selected': ""
                },
                'spliteType': 'Percentage',
                'splite': 'split 2',
                'splitePercentages': '10',
                'isparentItem': false,
                'parentId': indexForSplitFor
            };
            
            angular.forEach($scope.accountLists, function(value, key){
                    if(value.id == indexForSplitFor){
                        if(value.spliteCount > 0){
                            $scope.accountLists.splice(value.spliteCount + 1, 0, data1, data2);
                        }else{
                            $scope.accountLists.splice(key + 1, 0, data1, data2);
                        }
                        $scope.accountLists[key].spliteCount += 2;
                    }   
            });
        }
        /* add lines */
        $scope.addLine = function () {
            var data = {
                'isSelected': false,
                'id': $scope.accountLists.length,
                'lineType': {
                    'errorMsg': "",
                    'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                    'selected': ""
                },
                'itemType': {
                    'errorMsg': "",
                    'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                    'selected': ""
                },
                'accountAssignmentCategory': '',
                'costCenter': {
                    'errorMsg': "",
                    'options': [{ "name": "1100-11100 - S Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11101 - H Other Inc/Exp ItemOutside", "check": false, "ischeck": true }, { "name": "1100-11103 - P Oth Inc/Exp OS", "check": false }, { "name": "1100-11109 - A Oth Inc/Exp OS", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "1100-12101 - H Oth Inc/Exp ID", "check": false }, { "name": "1100-12110 - P Oth Inc/Exp ID NA", "check": false }, { "name": "1100-12111 - P Oth Inc/Exp ID SA", "check": false }],
                    'selected': ""
                },
                'internalOrder': {
                    'errorMsg': "",
                    'options': [{ "name": "102207 - Black Oxide Capability", "check": false, "ischeck": true }, { "name": "102366 - Y-Axis Lathe", "check": false, "ischeck": true }, { "name": "105153 - HVAC Repairs", "check": false }, { "name": "105327 - A2 Production Readiness", "check": false }, { "name": "106329 - Industrial Paint System CAR", "check": false }, { "name": "106330 - Steel Paint System CAR", "check": false }, { "name": "106362 - Charlotte Office/PT Design Center Lease", "check": false }],
                    'selected': ""
                },
                'projectCode': {
                    'errorMsg': "",
                    'options': [{ "name": "Lorem Ipsum1", "check": false, "ischeck": true }, { "name": "Lorem Ipsum2", "check": false, "ischeck": true }, { "name": "Lorem Ipsum3", "check": false }, { "name": "Lorem Ipsum4", "check": false }, { "name": "Lorem Ipsum5", "check": false }, { "name": "Lorem Ipsum6", "check": false }, { "name": "Lorem Ipsum7", "check": false }, { "name": "Lorem Ipsum8", "check": false }],
                    'selected': ""
                },
                'glCode': {
                    'errorMsg': "",
                    'options': [{ "name": "6050000 - Shrinkage Provision", "check": false, "ischeck": true }, { "name": "6190000 - Operating Supplies", "check": false, "ischeck": true }, { "name": "6190100 - Operating Equipment", "check": false }, { "name": "6210000 - Perishable Tooling", "check": false }, { "name": "6240030 - Tool Maintenance", "check": false }, { "name": "6190010 - Chemicals", "check": false }, { "name": "6190050 - Lubricants", "check": false }, { "name": "6190090 - Welding Supplies", "check": false }],
                    'selected': ""
                },
                'spliteType': 'Percentage',
                'splite': '',
                'splitePercentages': '',
                'isparentItem': true,
                'spliteCount': 0
            }
            $scope.accountLists.push(data);
        }
        /* delete lines */
        $scope.delDisabled = true;
        $scope.deleteSelected = function (delDisabled) {
            if (!delDisabled) {
                var confi = {
                    type: "confirm",
                    message: "Are you sure you want to delete this Accounting item?",
                    buttons: [
                    {
                        "title": "YES",
                        "result": "yes"
                    },
                    {
                        "title": "NO",
                        "result": "no"
                    }
                    ]
                };
                notification.notify(confi, function (response) {
                    if (response.result == 'yes') {
                        angular.forEach($scope.accountLists, function (value, key) {
                            var parentIndex;
                            if (value.isSelected == true && value.isparentItem == false) {
                                value.isSelected = false;
                               $scope.accountLists.filter(function(e) {
                                var matchResult = e.id == value.parentId;
                                 if(matchResult){
                                       parentIndex = $scope.accountLists.indexOf(e); 
                                  }
                                });
                                $scope.accountLists[parentIndex].spliteCount -= 1;
                                $scope.accountLists.splice(key, 1);
                            }
                        });
                        Materialize.toast('Accounting Item  deleted successfully', 200);
                    }
                });
            }
        };
        /*delete current*/
        $scope.deleteCurrent = function (index) {
            var confi = {
                type: "confirm",
                message: "Are you sure you want to delete this Accounting item?",
                buttons: [
                {
                    "title": "YES",
                    "result": "yes"
                },
                {
                    "title": "NO",
                    "result": "no"
                }
                ]
            };
            notification.notify(confi, function (response) {
                if (response.result == 'yes') {
                    angular.forEach($scope.accountLists, function(value,key){
                                if(value.id == $scope.accountLists[index].parentId){
                                    value.spliteCount -= 1
                                }
                    });
                    $scope.accountLists.splice(index, 1);
                    Materialize.toast('Accounting Item deleted successfully', 2000);
                }
            });

        };
        /*delete enble*/
        $scope.accountItemChange = function () {
            var count = 0;
            for (var i = 0; i < $scope.accountLists.length; i++) {
                if ($scope.accountLists[i].isSelected == true) {
                    count += 1
                    break;
                }
            }

            if (count > 0) {
                $scope.delDisabled = false;
            } else {
                $scope.delDisabled = true;
            }
        }
        /*set options*/
        var setOptions = function(lineIndex){
            var currentOpt =  $scope.accountLists[lineIndex - 1].lineType.selected,
              nextIndexOpt  = $scope.accountLists[lineIndex].lineType.options;
        if(!$scope.accountLists[lineIndex - 1].isparentItem){
            $scope.accountLists.filter(function(e) {
                var getIndexResult = e.id == $scope.accountLists[lineIndex - 1].parentId;
               if(getIndexResult){
                 var newParentIndex = $scope.accountLists.indexOf(e);
                  currentOpt =  $scope.accountLists[newParentIndex].lineType.selected
               }
          })
        }
            for(var i = 0; i < currentOpt.length; i++){
                var removeIndex;
                nextIndexOpt.filter(function(e) {
                          var matchResult = e.name == currentOpt[i].name;
                         if(matchResult){
                             removeIndex = nextIndexOpt.indexOf(e);
                             nextIndexOpt.splice(removeIndex, 1);
                         }
                    })
                }
                $scope.accountLists[lineIndex].lineType.options = nextIndexOpt;
        };

        /* multiSelectLooup */
        $scope.multiSelectLookupCallback = function (e, index, field) {
            if($scope.accountLists.length > 1 && index !== 0 ){
                setOptions(index)
              };
            plantPoup(e, index, field);
        }
        var plantPoup = function (e, index, field) {
            var currentfield, title;
            switch (field) {
                case "lineType":
                    currentfield = $scope.accountLists[index].lineType;
                    title = "Choose Line Type";
                    break;
                case "itemType":
                    currentfield = $scope.accountLists[index].itemType;
                    title = "Choose Item Type";
                    break;
            }

            debouncer.add(function () {

                var lookupConfig = {
                    modelData: currentfield.selected,
                    config: {
                        mutliselect: true,
                        displayProperties: ["name"],
                        options: currentfield.options,
                        addnew: false,
                        titleOfModel: title,
                        selectTypeOption: currentfield.selected,
                        readonly: false
                    }
                };
                $timeout(function () {
                    lookup.open(lookupConfig, function (response) {
                        if (!response.result) return false;
                        currentfield.selected = response.result;

                        switch (field) {
                            case "lineType":
                                $scope.accountLists[index].lineType = currentfield;
                                break;
                            case "itemType":
                                $scope.accountLists[index].itemType = currentfield;
                                break;
                        }
                    });
                });

            }, 300);
        }

    }

    function lineTypeSpecificDetailCtrlFunc($scope, $rootScope, $translate, $window, $http, lookup, debouncer, $timeout, notification) {
        //-- manage columns
        $scope.fields = [
                { 'label': 'Line Type', 'selected': true },
                { 'label': 'Item Type', 'selected': true },
                { 'label': 'Category', 'selected': true },
                { 'label': 'UOM', 'selected': true },
                { 'label': 'Matching Type ', 'selected': true },
                { 'label': 'Needed in Days', 'selected': true },
                { 'label': 'Service Duration', 'selected': true }
        ];
        $scope.manageColumns = function () {
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


        }
        $scope.selectedAll = { 'selection': true }, $scope.fillpartial = false, $scope.isVisible = false;
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
        $scope.reset = function () {
            $scope.selectedAll.selection = false;
            $scope.fillpartial = false;
            $scope.isVisible = false;
            $scope.checkAll(false);
            $scope.selectedCount = getSelectedCout($scope.fields);

        };
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

        function getSelectedCout(obj) {
            var count = 0;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].selected === true) {
                    count++;
                }
            }
            return count;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);

        function isAtleastOneSelected(obj) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].selected === true) {
                    return true;
                }
            }
            return false;
        }

        function isAllSelected(obj) {
            for (var i = 0; i < obj.length; i++) {
                if (!obj[i].selected) {
                    return false;
                }
            }
            return true;
        }

        $scope.showSelectedColumn = function () {
            $(document).trigger("click");
        }
        $scope.cancelMangeColumn = function (e, selectAll) {
            if (selectAll == false) {
                $scope.checkAll();
            }
            $(document).trigger("click");
        }
        /*manage columns end here*/
        /* add line */
        $scope.addLine = function () {
            $scope.lineTypes.push({
                'isSelected': false,
                'id': '01',
                'lineType': {
                    'errorMsg': "",
                    'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                    'selected': ""
                },
                'itemType': {
                    'errorMsg': "",
                    'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                    'selected': ""
                },
                'category': '',
                'uom': {
                    'errorMsg': "",
                    'options': [{ "name": "each", "check": false, "ischeck": true }, { "name": "Each Int.", "check": false, "ischeck": true }, { "name": "Each Per Month", "check": false }, { "name": "Eight Pack", "check": false }, { "name": "Electronic Mail Box", "check": false },
                        { "name": "Electronvolt", "check": false }, { "name": "Electronvolt Per Meter", "check": false }, { "name": "Electronvolt Square Meter", "check": false }, { "name": "Electronvolt Square Meter Per Kilogram", "check": false }],
                    'selected': ""
                },
                'matchingType': {
                    'options': [{ "name": "2 Way" }, { "name": "3 Way" }],
                    'selected': ""
                },
                'neededInDays': '',
                'serviceDuration': ''
            });
        }
        /* delete lines */
        $scope.delDisabled = true;
        $scope.deleteSelected = function (delDisabled) {
            if (!delDisabled) {
                var confi = {
                    type: "confirm",
                    message: "Are you sure you want to delete this line item?",
                    buttons: [
                    {
                        "title": "YES",
                        "result": "yes"
                    },
                    {
                        "title": "NO",
                        "result": "no"
                    }
                    ]
                };
                notification.notify(confi, function (response) {
                    if (response.result == 'yes') {
                        angular.forEach($scope.lineTypes, function (value, key) {
                            if (value.isSelected == true) {
                                $scope.lineTypes.splice(key, 1);
                            }
                        });
                        Materialize.toast('Lines deleted successfully', 2000);
                    }
                });
            }
        };
        /*delete current*/
        $scope.deleteCurrent = function (index) {
            var confi = {
                type: "confirm",
                message: "Are you sure you want to delete this line item?",
                buttons: [
                {
                    "title": "YES",
                    "result": "yes"
                },
                {
                    "title": "NO",
                    "result": "no"
                }
                ]
            };
            notification.notify(confi, function (response) {
                if (response.result == 'yes') {
                    $scope.lineTypes.splice(index, 1);
                    Materialize.toast('Line deleted successfully', 2000);
                }
            });

        };
        /*Line Detail Table*/
        $scope.listItemChange = function () {
            var count = 0;
            for (var i = 0; i < $scope.lineTypes.length; i++) {
                if ($scope.lineTypes[i].isSelected == true) {
                    count += 1
                    break;
                }
            }

            if (count > 0) {
                $scope.delDisabled = false;
            } else {
                $scope.delDisabled = true;
            }
        }
        $scope.lineTypeTable = { 'isSelected': false }
        $scope.lineTypes = [
            {
                'isSelected': false,
                'id': '01',
                'lineType': {
                    'errorMsg': "",
                    'options': [{ "name": "Material" }, { "name": "Services" }, { "name": "Fixed Variable" }],
                    'selected': ""
                },
                'itemType': {
                    'errorMsg': "",
                    'options': [{ "name": "Catalog" }, { "name": "Non-Catalog" }],
                    'selected': ""
                },
                'category': '',
                'uom': {
                    'errorMsg': "",
                    'options': [{ "name": "each", "check": false, "ischeck": true }, { "name": "Each Int.", "check": false, "ischeck": true }, { "name": "Each Per Month", "check": false }, { "name": "Eight Pack", "check": false }, { "name": "Electronic Mail Box", "check": false },
                        { "name": "Electronvolt", "check": false }, { "name": "Electronvolt Per Meter", "check": false }, { "name": "Electronvolt Square Meter", "check": false }, { "name": "Electronvolt Square Meter Per Kilogram", "check": false }],
                    'selected': ""
                },
                'matchingType': {
                    'options': [{ "name": "2 Way" }, { "name": "3 Way" }],
                    'selected': ""
                },
                'neededInDays': '',
                'serviceDuration': ''
            }


        ];
        /* multiSelectLooup */
        $scope.multiSelectLookupCallback = function (e, index, field) {
            plantPoup(e, index, field);
        }
        var plantPoup = function (e, index, field) {
            var currentfield, title;
            switch (field) {
                case "lineType":
                    currentfield = $scope.lineTypes[index].lineType;
                    title = "Choose Line Type";
                    break;
                case "itemType":
                    currentfield = $scope.lineTypes[index].itemType;
                    title = "Choose Item Type";
                    break;
            }

            debouncer.add(function () {

                var lookupConfig = {
                    modelData: currentfield.selected,
                    config: {
                        mutliselect: true,
                        displayProperties: ["name"],
                        options: currentfield.options,
                        addnew: false,
                        titleOfModel: title,
                        selectTypeOption: currentfield.selected,
                        readonly: false
                    }
                };
                $timeout(function () {
                    lookup.open(lookupConfig, function (response) {
                        if (!response.result) return false;
                        currentfield.selected = response.result;

                        switch (field) {
                            case "lineType":
                                $scope.lineTypes[index].lineType = currentfield;
                                break;
                            case "itemType":
                                $scope.lineTypes[index].itemType = currentfield;
                                break;
                        }
                    });
                });

            }, 300);
        }


        /* pagination */
        $scope.selectedTab = 1;
        $scope.rowsToShowOpts = {
            availableOptions: [
              { size: '5' },
              { size: '10' }
            ],
            selectedOption: { size: '5' }
        };
        $scope.currPage = { "no": 1 };
        $scope.pageChanged = function (newPage, oldPage) {
            $scope.currPage.no = newPage;
        };

        /*AccountAssignmentCategory*/
        // Start: CBR
        var tempCategoryNode_PAS = [];
        var tempBUNode_PAS = ['851750000001'];
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

            $scope.treeComponentConfig.requestParameter = {
                navigationContext: "PAS"
            };
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

        $scope.selectedCategoriesTxt = "Choose Category";
        $scope.selectedBUTxt = "Technology Solutions +10 More";
        $scope.selectedRegionTxt = "Choose Region";

        $scope.selectedCategoriesValidate = false;
        $scope.selectedBUValidate = false;
        $scope.selectedRegionValidate = false;

        $scope.selectedCategoryNodes = [];
        $scope.selectedBUNodes = ['Technology Solutions'];
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

    }
})();