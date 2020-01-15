(function (angular, SmartController) {
    "use strict";
    SmartController.create("feedback", ["$scope", feedbackCard]);
    function feedbackCard($scope) {
        $scope.actions = [];//[{ "key": "", "value": "" }];
        $scope.feedData = [{
            title: 'Supplier Normalization',
            count: 105,
            status: 5,
            date : '28 FEB 2016'
        }, {
            title: 'Supplier Normalization',
            count: 104,
            status: 6,
            date: '28 FEB 2016'
        }, {
            title: 'Category Classification',
            count: 103,
            status: 7,
            date: '28 FEB 2016'
        }, {
            title: 'Category Classification',
            count: 102,
            status: 0,
            date: '28 FEB 2016'
        }, {
            title: 'Supplier Normalization',
            count: 101,
            status: 4,
            date: '28 FEB 2016'
        }];

        $scope.mapStatus = function (status) {
            var cls = {
                0: { class: 'inprogress', title: 'IN PROGRESS', icon: "#icon_Progress" },
                1: { class: 'feedback-approved', title: 'FEEDBACK APPROVED', icon: "#icon_Approved" },
                2: { class: 'review-rejected', title: 'REVIEW REJECTED', icon: "#icon_Rejected" },
                3: { class: 'review-pending', title: 'REVIEW PENDING', icon: "#icon_Pending" },
                4: { class: 'on-hold', title: 'FEEDBACK ON HOLD', icon: "#icon_OnHold" },

                5: { class: 'error-out', title: 'ERROR', icon: "#icon_Error" },
                6: { class: 'feed-completed', title: 'COMPLETED', icon: "#icon_Completed" },
                7: { class: 'feed-withdraw', title: 'WITHDRAW', icon: "#icon_Withdraw" },
                8: { class: 'feed-retained', title: 'RETAINED', icon: "#icon_Retained" }
            };
            return cls[status];
        }
    }
})(angular, SmartController);