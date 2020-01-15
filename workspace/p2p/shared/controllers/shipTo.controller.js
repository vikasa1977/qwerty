
angular.module('SMART2')
    .controller('shipToCtrlr', ['$scope', shipToCtrlr])
    .controller('billToCtrlr', ['$scope', billToCtrlr])
    .controller('popupCtrl', ['$scope', 'reqDetailsService', 'CONSTANTS', popupCtrl])
    .controller('treePopupCtrl', ['$scope', 'reqDetailsService', treePopupCtrl])


function shipToCtrlr($scope) {
}

function billToCtrlr($scope) {
}

function popupCtrl($scope, reqDetailsService, CONSTANTS) {

    $scope.class = "";
    $scope.icon = "";
    $scope.message = "";
    $scope.successMessage = function () {
        var messageObj = reqDetailsService.getModalMessage();
        if (CONSTANTS.ALERT_TYPES.SUCCESS === messageObj.type) {
            $scope.class = "notify-success";
            $scope.icon = "#icon_CircleCheck";
            $scope.message = "SUCCESS";
        } else if (CONSTANTS.ALERT_TYPES.FAILURE === messageObj.type) {
            $scope.class = "notify-error";
            $scope.icon = "#icon_Exclamation";
            $scope.message = "ERROR";
        } else if (CONSTANTS.ALERT_TYPES.WARNING === messageObj.type) {
            $scope.class = "notify-warning";
            $scope.icon = "#icon_Warning";
            $scope.message = "WARNING";
        };
        $scope.button2 = messageObj.button2;
        $scope.button1 = messageObj.button1;
        return (messageObj.message && messageObj.message.length > 300) ? messageObj.message.substr(0, 300) : messageObj.message;
    };

}

function treePopupCtrl($scope, reqDetailsService) {

    $scope.parScope = null;
    getMyFormScope($scope);
    $scope.showCategory = function () {
        $scope.parScope.item = $scope.ngModel;
        $scope.parScope.showCategoryComponent = true;
    };

    function getMyFormScope(scope) {
        if ($scope.parScope) {
            return $scope.parScope;
        } else if (scope.myForm) {
            $scope.parScope = scope;
            return;
        } else if (!scope)
            return;
        else
            getMyFormScope(scope.$parent);
    };

}

