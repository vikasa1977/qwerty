angular.module('SMART2').directive('smartToast', ['notification', '$translate', '$timeout', '$sce', function (notification, $translate, $timeout, $sce) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            showN: "@"
        },
        link: function (scope, element, attrs) {

        },
        templateUrl: 'shared/directives/toast/toastTemplate.html',
    }
}]);
