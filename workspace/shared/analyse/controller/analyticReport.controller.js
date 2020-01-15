(function (angular, SmartController) {
    "use strict";
    SmartController.create("analyticReport", ["$scope", analyticReportCard]);
    
    function analyticReportCard($scope) {
        $scope.actions = [{
            "key": "Create a Report",
            "value": ""
        }, {
            "key": "View all Reports",
            "value": ""
        }, {
            "key": "View Shared Reports",
            "value": ""
        }, {
            "key": "View History List",
            "value": ""
        }, {
            "key": "View Subscriptions",
            "value": ""
        }];

        $scope.timeTaskList = [
            {
                "date": "24 JUN,2016",
                "time": "16:17:24",
                "title": "RFX - Event by Supplier"
            },
            {
                "date": "13 MAY,2016",
                "time": "08:42:00",
                "title": "Contract by Supplier"
            },
            {
                "date": "01 MAY,2016",
                "time": "10:00:53",
                "title": "P2P Receipt Adhoc"
            },
            {
                "date": "30 FEB,2016",
                "time": "02:15:36",
                "title": "P2P Invoice Adhoc"
            }
        ];
    }

})(angular, SmartController);