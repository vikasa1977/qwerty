(function (angular, SmartController) {
    'use strict';
    angular.module('SMART2')
    .directive("filterChips", ["$timeout","$window", function ($timeout,$window) {
        return {
            restrict: "A",
        
            link: function (scope, element, attr) {
                $timeout(function () {
                    scope.detectChipHeight();
                    angular.element('.chip .material-icons').bind('click', function (e) {
                        $(this).parent().remove();
                        scope.detectChipHeight();
                     });
                     scope.$watch(
                        function () { return element.find('.chip').length; },
                        function (newValue, oldValue) {
                          if (newValue !== oldValue) {
                            scope.detectChipHeight();
                          }
                        }
                      );
                })
                scope.detectChipHeight = function() {
                    var chipHeight = $('.chipDataCont .chipWrapLeft').height();
                    if (chipHeight > 40) {
                        scope.showMoreChips = true;
                    }
                    else {
                        scope.showMoreChips = false;
                    }
                }
                
                angular.element($window).bind('resize',function(){
                    scope.detectChipHeight();
                })
            }
        }
    }]);
})(angular, SmartController);