(function (angular, SmartController) {
    "use strict";
    SmartController.create("spendAlerts", ["$scope", spendAlertsCard]);

    function spendAlertsCard($scope) {
        $scope.actions = [{
            "key": "Create Alert",
            "value": ""
        }];

        $scope.alertData = [
            {
                title: "IBM Threshold for Africa",
                date: "5 Oct 2016",
                createdDate: "2 Sep 2016 02:22",
                status: 0
            },
            {
                title: "Alert on region Asia",
                date: "3 Sep 2016",
                createdDate: "20 Aug 2016 03:32",
                status: 0
            },
            {
                title: "Non Contract Spend Alert",
                date: "30 Aug 2016",
                createdDate: "14 Aug 2016 04:45",
                status: 0
            },
            {
                title: "Category IT Spend Alert",
                date: "NA",
                createdDate: "25 Jun 2016 08:15",
                status: 1
            },
            {
                title: "Transaction Count Alert for Dell",
                date: "NA",
                createdDate: "21 Jun 2016 09:21",
                status: 1
            },
            {
                title: "Category IT Spend Alert",
                date: "NA",
                createdDate: "25 Jun 2016 08:15",
                status: 1
            }
        ];

        $scope.mapStatus = function (status) {
            var cls = {
                0: { class: 'success-alrt', icon: '#iconAlert_Tirggered', tooltip: 'Alert Triggered' },
                1: { class: 'NA-alrt', icon: '#iconAlert_NotTirggered', tooltip: 'Not Triggered' }
            };
            return cls[status];
        }
    };
})(angular, SmartController);