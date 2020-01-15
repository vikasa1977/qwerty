angular
    .module('SMART2')

    .directive('postRepeatNav', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                // iteration is complete, do whatever post-processing
                // is necessary
                angular.forEach(angular.element('.home-page-bubble-button'), function (ele, index) {
                    setTimeout(function () {
                        angular.element(ele).addClass("animated bounceIn");
                    }, 500 * index);
                });
            }
        };
    });