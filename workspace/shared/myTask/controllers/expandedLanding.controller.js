(function (angular, SmartController) {
    'use strict';

    SmartController.create('expandedLandingCtrl', ['$scope', '$stateParams', 'myTaskOps', expandedLandingCtrlFunc]);


    function expandedLandingCtrlFunc($scope, $stateParams, myTaskOps) {

        switch ($stateParams.entrymode) {
            case "fromMiniFilter":
                myTaskOps.initCallForMiniFilter(renderListContent, renderListErrorHandler);
                break;
            case "fromShowAll":
                myTaskOps.initCallForWholeBucket(renderListContent, renderListErrorHandler);
                break;
            case "fromMegaFilter":
                break;
            case "fromSavedFilter":
                break;
            default: console.log("Which mode is this");
        };

        function renderListContent(listData) {
            if (listData) {
                if (listData.GetSearchRestResult) {
                    if (listData.GetSearchRestResult.Value && listData.GetSearchRestResult.Value.length > 0) {
                        _displayPrerequisites(listData.GetSearchRestResult.Value[0]);
                    }
                }
            }
        }

        function renderListErrorHandler(errorData) {

        }

        function _displayPrerequisites(allGroups) {
            $scope.listDisplayConfig = {
                "showIcon": true,
                "showAction": true,
                "importantAttribLimit": 5
            };
            $scope.incrementalSpeed = false;
            $scope.eachCardContent = allGroups;
        }

    }
})(angular, SmartController);