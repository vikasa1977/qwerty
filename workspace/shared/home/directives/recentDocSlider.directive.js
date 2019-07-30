(function (angular, SmartController) {
    'use strict';
    angular.module('SMART2')
    .directive("recentDocSlider", ["$timeout", function ($timeout) {
        return {
            restrict: "EA",
            link: function (scope, element, attr) {
                $timeout(function () {
                    scope.showHideSlider = false;
                    scope.showSlider = function () {
                        scope.showHideSlider = !scope.showHideSlider;
                        element.find($('.recentDocSlider')).slideToggle();
                        if (scope.showHideSlider)
                            element.find($('.recentDocSlider')).slick({
                                dots: false,
                                infinite: false,
                                speed: 300,
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                responsive: [
                                  {
                                      breakpoint: 1024,
                                      settings: {
                                          slidesToShow: 3,
                                          slidesToScroll: 3
                                      }
                                  },
                                  {
                                      breakpoint: 600,
                                      settings: {
                                          slidesToShow: 2,
                                          slidesToScroll: 2
                                      }
                                  },
                                  {
                                      breakpoint: 480,
                                      settings: {
                                          slidesToShow: 1,
                                          slidesToScroll: 1
                                      }
                                  }
                                  // You can unslick at a given breakpoint now by adding:
                                  // settings: "unslick"
                                  // instead of a settings object
                                ]
                            });
                    };
                });

                angular.element(document).on('click', function (event) {
                    if (scope.showHideSlider && $(event.target).parents('.fixedBottom').length == 0) {
                        element.find($('.recentDocSlider')).slideToggle();
                        scope.showHideSlider = false;
                        scope.$apply();
                    }
                });
            }
        }
    }]);
})(angular, SmartController);