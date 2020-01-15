(function (angular, SmartController) {
    'use strict';
    angular.module('SMART2')
    .directive("messageBanner", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                $timeout(function () {
                    if (element.find('ul.adminMessageContainer').outerWidth() < element.find('li.adminMessage:first-child')[0].scrollWidth) {
                        scope.showReadMore = true;
                    }
                });
            }
        }
    }]);
})(angular, SmartController);