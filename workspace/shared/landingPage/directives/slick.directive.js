'use strict';
angular.module('SMART2').directive('slick', [
  '$timeout',
  function ($timeout) {
    return {
        restrict: 'AEC',
        transclude: true,
        scope: {
        data: '=',
        currentIndex: '=',
        responsive: '&'
      },
        link: function (scope, element, attrs) {
        var initializeSlick, isInitialized;
        initializeSlick = function () {
          return $timeout(function () {
            var currentIndex, slider;
            slider = $(element);
            if (scope.currentIndex != null) {
              currentIndex = scope.currentIndex;
            }
            slider.slick({
              accessibility: attrs.accessibility !== 'false',
              arrows: attrs.arrows !== 'false',
              autoplay: attrs.autoplay === 'true',
              autoplaySpeed: attrs.autoplaySpeed != null ? parseInt(attrs.autoplaySpeed, 10) : 3000,
              centerMode: attrs.centerMode === 'true',
              centerPadding: attrs.centerPadding || '50px',
              cssEase: attrs.cssEase || 'ease',
              dots: attrs.dots === 'true',
              draggable: attrs.draggable !== 'false',
              easing: attrs.easing || 'linear',
              fade: attrs.fade === 'true',
              infinite: attrs.infinite !== 'false',
              lazyLoad: attrs.lazyLoad || 'ondemand',
              onBeforeChange: attrs.onBeforeChange || null,
              onAfterChange: function (sl, index) {
                if (attrs.onAfterChange) {
                  scope.onAfterChange();
                }
                if (currentIndex != null) {
                  return scope.$apply(function () {
                    currentIndex = index;
                    return scope.currentIndex = index;
                  });
                }
              },
              onInit: function (sl) {
                if (attrs.onInit) {
                  attrs.onInit();
                }
                if (currentIndex != null) {
                  return sl.slideHandler(currentIndex);
                }
              },
              onReInit: attrs.onReInit || null,
              pauseOnHover: attrs.pauseOnHover !== 'false',
              responsive: scope.responsive() || null,
              slide: attrs.slide || 'div',
              slidesToShow: attrs.slidesToShow != null ? parseInt(attrs.slidesToShow, 10) : 1,
              slidesToScroll: attrs.slidesToScroll != null ? parseInt(attrs.slidesToScroll, 10) : 1,
              speed: attrs.speed != null ? parseInt(attrs.speed, 10) : 300,
              swipe: attrs.swipe !== 'false',
              touchMove: attrs.touchMove !== 'false',
              touchThreshold: attrs.touchThreshold ? parseInt(attrs.touchThreshold, 10) : 5,
              vertical: attrs.vertical === 'true'
            });
            return scope.$watch('currentIndex', function (newVal, oldVal) {
              if (currentIndex != null && newVal != null && newVal !== currentIndex) {
                return slider.slickGoTo(newVal);
              }
            });
          });
        };
        if (attrs.initOnload) {
          isInitialized = false;
          return scope.$watch('data', function (newVal, oldVal) {
            if (newVal != null && !isInitialized) {
              initializeSlick();
              return isInitialized = true;
            }
          });
        } else {
          return initializeSlick();
        }
      }
    };
      templateUrl: 'shared/directives/cardsView/cardsViewTemplate.html'
  }
 ]);