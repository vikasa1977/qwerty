(function (angular, SmartController) {
	"use strict";
	SmartController.create("reportsCard", ["$scope", "$state", reportsCard]);

	function reportsCard($scope,$state) {
		//$scope.actions = [{
		//	"key": "Create Dashboard",
		//	"value": ""
		//}];

		$scope.gotoReportsPage = function() {
			$state.go('expandedLandingList',({pagefor: 'analyze', doctype: 'spend_reports'}));
		};

		$scope.reportsTabConfig = [{
			"title": "MY REPORTS",
			"contentUrl": "myReportsTab.html",
			"active": true

		}, {
			"title": "SHARED REPORTS",
			"contentUrl": "sharedReportsTab.html"
		}];

		$scope.smartDate = "1454521239279";

		$scope.myReportsData = [

            {
                title: "Ketchup Production",
                reportType: '',
                createdBy: 'Matt Daemon',
                createdOn: "10 Jun 2018",
                modifiedDate: "NOV 20 2017",
                type:'Product',
                ownerName: 'Sara Williams',
                supplierName: 'Heinz',
                shouldCost: 'USD 1.35',
                actions: [{
                    "key": "Export to Excel",
                    "value": ""
                }, {
                    "key": "Export to PDF",
                    "value": ""
                }, {
                    "key": "Share via email",
                    "value": ""
                }, {
                    "key": "Rename",
                    "value": ""
                }, {
                    "key": "Duplicate",
                    "value": ""
                }, {
                    "key": "Delete",
                    "value": ""
                }]
            },
            {
                title: "SF Fillet Blocks",
                reportType: '',
                createdBy: 'David Williams',
                createdOn: "12 Jun 2018",
                modifiedDate: "NOV 20 2017",
                type:'Product',
                ownerName: 'Jackson Poll',
                supplierName: 'SF Foods',
                shouldCost: 'USD 3800',
                actions: [{
                    "key": "Export to Excel",
                    "value": ""
                }, {
                    "key": "Export to PDF",
                    "value": ""
                }, {
                    "key": "Share via email",
                    "value": ""
                }, {
                    "key": "Rename",
                    "value": ""
                }, {
                    "key": "Duplicate",
                    "value": ""
                }, {
                    "key": "Delete",
                    "value": ""
                }]
            },
            {
                title: "4,795 SQ FT Restaurant",
                reportType: '',
                createdBy: 'Matthew Perry',
                createdOn: "16 Jun 2018",
                modifiedDate: "NOV 20 2017",
                type:'Service',
                ownerName: 'Arnold S',
                supplierName: 'Catalyst Constructions',
                shouldCost: 'USD 154,669.00',
                actions: [{
                    "key": "Export to Excel",
                    "value": ""
                }, {
                    "key": "Export to PDF",
                    "value": ""
                }, {
                    "key": "Share via email",
                    "value": ""
                }, {
                    "key": "Rename",
                    "value": ""
                }, {
                    "key": "Duplicate",
                    "value": ""
                }, {
                   "key": "Delete",
                    "value": ""
                }]
            },
            {
                title: "Milk",
                reportType: '',
                createdBy: 'George Clooney',
                createdOn: "5 Jul 2018",
                modifiedDate: "NOV 20 2017",
                type:'Product',
                ownerName: 'Sara Williams',
                supplierName: 'Dairy Farmers of America',
                shouldCost: '15.50 $/cwt',
                actions: [{
                    "key": "Export to Excel",
                    "value": ""
                }, {
                    "key": "Export to PDF",
                    "value": ""
                }, {
                    "key": "Share via email",
                    "value": ""
                }, {
                    "key": "Rename",
                    "value": ""
                }, {
                    "key": "Duplicate",
                    "value": ""
                }, {
                    "key": "Delete",
                    "value": ""
                }]
            },
             {
                title: "Pretzel Analysis",
                reportType: '',
                createdBy: 'John Lee',
                createdOn: "14 Nov 18",
                modifiedDate: "NOV 20 2017",
                type:'Product',
                ownerName: 'Samantha Lewis',
                supplierName: 'Hearthside Food Solutions',
                shouldCost: 'USD 1.59',
                 actions: [{
                     "key": "Export to Excel",
                     "value": ""
                 }, {
                     "key": "Export to PDF",
                     "value": ""
                 }, {
                     "key": "Share via email",
                     "value": ""
                 }, {
                     "key": "Rename",
                     "value": ""
                 }, {
                     "key": "Duplicate",
                     "value": ""
                 }, {
                     "key": "Delete",
                     "value": ""
                 }]
             },
            {
                title: "Poultry",
                reportType: '',
                createdBy: 'Noah Centineo',
                createdOn: "18 Aug 2018",
                modifiedDate: "NOV 20 2017",
                type:'Product',
                ownerName: 'Sara Williams',
                supplierName: 'Heinz',
                shouldCost: '$USD 4.85',
                actions: [{
                    "key": "Export to Excel",
                    "value": ""
                }, {
                    "key": "Export to PDF",
                   "value": ""
                }, {
                    "key": "Share via email",
                    "value": ""
                }, {
                    "key": "Rename",
                    "value": ""
                }, {
                    "key": "Duplicate",
                    "value": ""
                }, {
                    "key": "Delete",
                    "value": ""
                }]
            }
        ];


		$scope.sharedReportsData = [
            {
            	title: "IT/Telecom Regular Supplier Bid",
            	createdDate: "03/04/2017 12:32:00 PM",
            	reportId: "824359",
            	actions: [{
            		"key": "Export to Excel",
            		"value": ""
            	}, {
            		"key": "Export to PDF",
            		"value": ""
            	}, {
            		"key": "Add to My Reports",
            		"value": ""
            	}, {
            		"key": "Remove",
            		"value": ""
            	}]
            },
            {
            	title: "Network Hub Regular Supplier",
            	createdDate: "03/04/2017 03:32:00 PM",
            	reportId: "824359",
            	actions: [{
            		"key": "Export to Excel",
            		"value": ""
            	}, {
            		"key": "Export to PDF",
            		"value": ""
            	}, {
            		"key": "Add to My Reports",
            		"value": ""
            	}, {
            		"key": "Remove",
            		"value": ""
            	}]
            },
            {
            	title: "Oil Drilling Services",
            	createdDate: "03/04/2017 04:45:00 PM",
            	reportId: "824359",
            	actions: [{
            		"key": "Export to Excel",
            		"value": ""
            	}, {
            		"key": "Export to PDF",
            		"value": ""
            	}, {
            		"key": "Add to My Reports",
            		"value": ""
            	}, {
            		"key": "Remove",
            		"value": ""
            	}]
            },
            {
            	title: "Cave Robots",
            	createdDate: "03/04/2017 08:15:00 AM",
            	reportId: "824359",
            	actions: [{
            		"key": "Export to Excel",
            		"value": ""
            	}, {
            		"key": "Export to PDF",
            		"value": ""
            	}, {
            		"key": "Add to My Reports",
            		"value": ""
            	}, {
            		"key": "Remove",
            		"value": ""
            	}]
            },
            {
            	title: "VI Dashboard",
            	createdDate: "03/04/2017 09:21:00 PM",
            	reportId: "824359",
            	actions: [{
            		"key": "Export to Excel",
            		"value": ""
            	}, {
            		"key": "Export to PDF",
            		"value": ""
            	}, {
            		"key": "Add to My Reports",
            		"value": ""
            	}, {
            		"key": "Remove",
            		"value": ""
            	}]
            }
		];
	};
})(angular, SmartController);