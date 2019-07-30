(function () {
    angular.module('SMART2')
    .controller('linkedDocsCntrl', ['$scope', '$state', 'PPSTService', '$timeout', '$filter', '$rootScope', linkedDocsFn])
    .controller('linkedDocsHeaderCntrl', ['$scope', '$state', 'PPSTService', '$timeout', '$filter', '$rootScope', linkedDocsHeaderFn])
   
    // linked Docs Controller function
    function linkedDocsFn($scope, $state, PPSTService, $timeout, $filter, $rootScope) {

        
      
        $scope.linkedDocsSummary = [];
        $scope.noLinkedDocsFound =  false; // Empty state scenario.
        // Read milestone data
        function readlinkedDocsData() {
            var url = [{ method: 'get', url: "project/ppst/models/linkedDocs.json" }],
                summaryDataTemp = [];
                PPSTService.getJSONData(url).then(function (response) {
                    console.log('response', response);
                if (response[0].data.length === 0) {
                    $scope.noLinkedDocsFound = true; // Empty state scenario.
                    $rootScope.$broadcast('noLinkedDocsFound', $scope.noLinkedDocsFound);
                    return false;
                } else {
                    getTypeOfDocs(response[0].data);
                    //$rootScope.$broadcast('noLinkedDocsFound', $scope.noLinkedDocsFound);
                }
            }).catch(function (error) {

            });
        }
        
        // Prepare diffrent type doc array
        function getTypeOfDocs(a_data) {
            var rfx = [],
                auction = [],
                contracts = [],
                len = a_data.length;
            console.log("a_data", a_data);
            for (var indx = 0; indx < len; indx++) {
                var tDocs = a_data[indx].documents,
                    docLen = tDocs.length;
                for (var doc = 0; doc < docLen; doc++) {
                    var docData = tDocs[doc].Data,
                        docDataLen = docData.length;
                    for (var c = 0; c < docDataLen; c++) {
                        var tObj = docData[c];
                        if (tObj.hasOwnProperty('linkedTo')) {// For contrcts type
                            contracts = PPSTService.mergeArray(contracts, tObj.data);
                        } else if (tObj.DocumentTypeInfo === 'rfx') {
                            rfx.push(tObj);
                        } else if (tObj.DocumentTypeInfo === "auction") {
                            auction.push(tObj);
                        }
                    }
                }
            }
            getAllDocs({
                rfx: rfx, auction: auction, contracts: contracts
            });
        }

        // get All docs data 
        function getAllDocs(a_data) {
            var rfx = a_data.rfx,
                auction = a_data.auction,
                contracts = a_data.contracts,
                allDocs = [];
            // Merge rfx
            allDocs = PPSTService.mergeArray(allDocs, rfx);
            //merge auction
            allDocs = PPSTService.mergeArray(allDocs, auction);
            // merge contracts
            allDocs = PPSTService.mergeArray(allDocs, contracts);
            prepareSummaryObj({
                'allDocs': allDocs,
                "rfx": rfx,
                "auction": auction,
                "contracts" : contracts
            });
        }

        function prepareSummaryObj(a_data) {
            $scope.summaryData = [
                {
                    'id' : "allDocs",
                    'label' : 'Documents',
                    'isActive' : true,
                    'data' : a_data.allDocs
                },
                 {
                     'id' : "rfx",
                    'label' : 'RFx',
                    'isActive' : false,
                    'data' : a_data.rfx,
                },
                 {
                     'id' : "auction",
                    'label' : 'Auctions',
                    'isActive': false,
                    'data': a_data.auction
                },
                 {
                     'id' : "contracts",
                    'label': 'Contracts',
                    'isActive': false,
                    'data': a_data.contracts
                }

            ]
            $scope.getLinkSummaryData({ data: a_data.allDocs , id : 'allDocs'}, 0);
        }
        
        // Linked doc summary data
        $scope.summaryDetailedData = [];
        $scope.summaryData = {};
        $scope.showDocType = false; // to show hide doc type column
        $scope.getLinkSummaryData = function (a_data, position) {
            // Make active
            var len = $scope.summaryData.length;
            for (var indx = 0; indx < len; indx++) {
                $scope.summaryData[indx].isActive = false;
            }
            $scope.summaryData[position].isActive = true;
            $scope.summaryDetailedData = a_data.data;
            if(a_data.id === 'allDocs') {
                $scope.showDocType = true;
            } else {
                $scope.showDocType = false; // dont show doc type column
            }
        }

        // get date parsed
        $scope.getDate = function (a_date) {
            return $filter('date')(new Date(a_date), 'dd/MM/yyyy');
        }

        // Sort the data by date
        $scope.sortIcon = 'both_Sort';
        $scope.sortToolTip = "Sort";
        $scope.sortByDate = function (a_data) {
            if ($scope.sortIcon == 'both_Sort') {
                $scope.sortIcon = 'icon_SortAscending';
            }
            $scope.sortIcon = ($scope.sortIcon == 'icon_SortAscending') ? 'icon_SortDescending' : 'icon_SortAscending';
            switch($scope.sortIcon) {
                case 'both_Sort':
                    //Default is no order
                    break;
                case 'icon_SortDescending':
                    //sortDate('descending');
                    $scope.summaryDetailedData.sort(function (a, b) {
                        return new Date(a.lastModified) - new Date(b.lastModified);
                    });
                    $scope.sortToolTip = "Descending";
                    break;
                case 'icon_SortAscending':
                    $scope.summaryDetailedData.sort(function (a, b) {
                        return new Date(b.lastModified) - new Date(a.lastModified);
                    });
                    $scope.sortToolTip = "Ascending";
                    break;
            }
        }

        readlinkedDocsData();

        $scope.rowsToShowOpts = [
            { 'size': '5' },
            { 'size': '10' }];

        $scope.selectedOption = $scope.rowsToShowOpts[0];

        // Blue screen of creation mode
        $scope.documentObj = {};
        $scope.documentObj.callback = function (item) {
            console.log(item);
            Materialize.toast("Document has been successfully created", 2000);
        }
        $scope.addContract = function () {
            var item = {
                docID: 103
            };
            $scope.documentObj.setActiveProduct(item)
        }
        $scope.addDocRfx = function () {
            var item = {
                docID: 102
            };
            $scope.documentObj.setActiveProduct(item)
        }
        if ($state.params.referpage == 'fromContract') {
            Materialize.toast("Contract has been successfully created", 5000);
        }
        $scope.documentObj.callback = function (item) {
            if (item.id == "template_rfx") {
                $state.go('sourcing.rfx.templateList', { pagefor: 'projects' });
            }
            if (item.id == "template_contract") {
                $state.go('contract.templateList', { pagefor: 'projects' });
            }
            if (item.id == "cblank_contract") {
                $state.go('contract.new', { pagefor: 'projects' });
            }
            
            if (item.id == "cblank") {
                $state.go('projects.new');
                Materialize.toast("Document has been successfully created", 5000);
            }
            console.log(item);
        }
        
    }

    // linked Docs Header controller
    function linkedDocsHeaderFn($scope, $state, PPSTService, $timeout, $filter, $rootScope) {
        
        $scope.attachmentAdded = false;
        $scope.editMilestonePopup = false;
        $scope.noLinkedDocsFound = false; // Empty state scenario.
        $scope.editData = {};//$scope.detailedItemData;
        $rootScope.$on('noLinkedDocsFound', function (e, val) {
            $scope.noLinkedDocsFound = val;
        });
        //$scope.noLinkedDocsFound = false; // Empty state scenario.
        // Read milestone data
        function readlinkedDocsData() {
            var url = [{ method: 'get', url: "project/ppst/models/milestonesData.json" }],
                summaryDataTemp = [];
            PPSTService.getJSONData(url).then(function (response) {
                if (response[0].data.length === 0) {
                    $scope.noLinkedDocsFound = true; // Empty state scenario.
                    $rootScope.$on('noLinkedDocsFound', function (e, val) {
                        $scope.noLinkedDocsFound = val;
                    });
                    return false;
                } else {
                    $scope.noLinkedDocsFound = false; // Empty state scenario.
                }
            }).catch(function (error) {

            });
        }
        //readlinkedDocsData();
        function validateJSON(obj) {
            var retunThis = true;

            for (var key in obj) {
                if (key === 'existingData') {
                    if (retunThis && !obj[key].hasOwnProperty('milestoneName') || !obj[key].hasOwnProperty('email') || !obj[key].hasOwnProperty('dueBy')) {
                        retunThis = false;
                    }
                }
                if (retunThis && key === 'phaseModel') {
                    if (!obj.phaseModel[0]) {
                        retunThis = false;
                    }
                }
                if (retunThis && key === 'assignedTo' && !obj[key][0].hasOwnProperty('name')) {
                    retunThis = false;
                }

            }
            return retunThis;
        }
        // go to new page
        $scope.openDetailsPage = function () {
            $state.go("projects.linkedDocLanding");
        }


        //linked document.
        $scope.linkedDocs = [{ name: "RFX", icon: "#icon_RFX" }, { name: "Auction", icon: "#icon_Auction" }, { name: "Contract", icon: "#icon_Contract" }];

        // Blue screen of creation mode
        $scope.documentObj = {};
        $scope.documentObj.callback = function (item) {
            console.log(item);
            Materialize.toast("Document has been successfully created", 2000);
        }
        $scope.addContract = function () {
            var item = {
                docID: 103
            };
            $scope.documentObj.setActiveProduct(item)
        }
        $scope.addDocAuction = function () {
            var item = {
                docID: 102
            };
            $scope.documentObj.setActiveProduct(item)
        };
        $scope.addDocRfx = function () {
            var item = {
                docID: 101
            };
            $scope.documentObj.setActiveProduct(item)
        };
       

        $scope.documentObj.callback = function (item) {
            if (item.id == "template" || item.id == "cblank" || item.id == "template_rfx" || item.id == "template_contract") {
                $scope.linkDocments = true;
            }
        }

        $scope.adDocs = function (doc) {
            switch (doc.name) {
                case "RFX":
                    $scope.addDocRfx();
                    break;
                case "Auction":
                    $scope.addDocAuction();
                    break;
                case "Contract":
                    $scope.addContract();
                    break;
            }
        }


    }
})(angular);