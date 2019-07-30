(function (angular, SmartController) {
	"use strict";
	SmartController.create("visionCard", ["$scope", visionCardFunc]);

	function visionCardFunc($scope) {
		$scope.actions = [{
			"key": "Create Dashboard",
			"value": ""
		}];

		$scope.visionData = [
            {
            	title: "Spend by Category",
            	lastModified: "2 Sep 2018 02:22",
            	viewType: "Shared View",
            	actions: [{
            		"key": "Edit",
            		"value": ""
            	},{
					"key": "Delete",
					"value": ""
				}]
            },
            {
            	title: "Supplier 360 View",
            	lastModified: "2 Sep 2018 02:22",
            	viewType: "My View",
				actions: [{
            		"key": "Edit",
            		"value": ""
            	},{
					"key": "Delete",
					"value": ""
				}]
            },
            {
            	title: "Contracts View",
            	lastModified: "2 Sep 2018 02:22",
            	viewType: "Shared View",
				actions: [{
            		"key": "Edit",
            		"value": ""
            	},{
					"key": "Delete",
					"value": ""
				}]
            },
            {
            	title: "Spend by Category",
            	lastModified: "2 Sep 2018 02:22",
            	viewType: "Shared View",
            	actions: [{
            		"key": "Edit",
            		"value": ""
            	},{
					"key": "Delete",
					"value": ""
				}]
            },
            {
            	title: "Spend by Category",
            	lastModified: "2 Sep 2018 02:22",
            	viewType: "Shared View",
            	actions: [{
            		"key": "Edit",
            		"value": ""
            	},{
					"key": "Delete",
					"value": ""
				}]
            },
            {
            	title: "Supplier 360 View",
            	lastModified: "2 Sep 2018 02:22",
            	viewType: "My View",
				actions: [{
            		"key": "Edit",
            		"value": ""
            	},{
					"key": "Delete",
					"value": ""
				}]
            }
          
		];
	};
})(angular, SmartController);