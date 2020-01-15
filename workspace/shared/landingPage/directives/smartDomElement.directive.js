'use strict';
angular.module('SMART2').directive('smartDomElement', ['$timeout', function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
            getElementStats: "&",
            config: "@",
            refresh: "@"
        },
        link: function (scope, element, attrs) {
            attrs.$observe("refresh", function (value) {
                $timeout(function () {
                    scope.getElementStats({ e: calculateDomConfig() });
                });
            });

            function calculateDomConfig() {
                var configObj = {},
                    getProperties = scope.config.split(',');

                for (var i = 0; i < getProperties.length; i++) {
                    if (getProperties[i] === 'height') {
                        configObj[getProperties[i]] = element.outerHeight() < 5 ? 0 : element.outerHeight();
                    } else if (getProperties[i] === 'width') {
                        configObj[getProperties[i]] = element.outerWidth();
                    }
                }
                return configObj;
            }
        }
    }
}]);