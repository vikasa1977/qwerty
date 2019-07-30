(function (angular, SmartController) {
	"use strict";
	SmartController.create("spendViDashboard", ["$scope", spendViDashboardCard]);

	function spendViDashboardCard($scope) {
		$scope.actions = [{
			"key": "Create Dashboard",
			"value": ""
		}];

		$scope.alertData = [
            {
            	title: "VI Dashboard",
            	createdDate: "2 Sep 2016 02:22",
            	status: 0,
            	actions: [{
            		"key": "Option1",
            		"value": ""
            	},{
					"key": "Option2",
					"value": ""
				}]
            },
            {
            	title: "VI Dashboard",
            	createdDate: "20 Aug 2016 03:32",
            	status: 0,
            	actions: [{
            		"key": "Option1",
            		"value": ""
            	}, {
            		"key": "Option2",
            		"value": ""
            	}]
            },
            {
            	title: "VI Dashboard",
            	createdDate: "14 Aug 2016 04:45",
            	status: 0,
            	actions: [{
            		"key": "Option1",
            		"value": ""
            	}, {
            		"key": "Option2",
            		"value": ""
            	}]
            },
            {
            	title: "VI Dashboard",
            	createdDate: "25 Jun 2016 08:15",
            	status: 1,
            	actions: [{
            		"key": "Option1",
            		"value": ""
            	}, {
            		"key": "Option2",
            		"value": ""
            	}]
            },
            {
            	title: "VI Dashboard",
            	createdDate: "21 Jun 2016 09:21",
            	status: 1,
            	actions: [{
            		"key": "Option1",
            		"value": ""
            	}, {
            		"key": "Option2",
            		"value": ""
            	}]
            },
            {
                title: "VI Dashboard",
                createdDate: "21 Jun 2016 09:21",
                status: 1,
                actions: [{
                    "key": "Option1",
                    "value": ""
                }, {
                    "key": "Option2",
                    "value": ""
                }]
            }
		];
	};
})(angular, SmartController);