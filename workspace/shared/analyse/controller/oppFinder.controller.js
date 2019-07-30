(function (angular, SmartController) {
    "use strict";
    SmartController.create("oppFinder", ["$scope", oppFinderCard]);

    function oppFinderCard($scope) {
        $scope.actions = [];
        $scope.saving = {
            with_suppliers: {
                cost: 798456,
                opportunities : 10
            },
            with_payment: {
                cost: 698456,
                opportunities: 12
            }
        }
    }
})(angular, SmartController);