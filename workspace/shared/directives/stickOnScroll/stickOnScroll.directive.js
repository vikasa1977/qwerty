angular.module('SMART2').directive('stickOnScroll', function ($window, $compile) {
    return {
        restrict: 'A',
        scope: {
            setTop: '@',
            setZindex: '@',
            onScroll:'&',
            setLeft:"@",
            setRight:"@",
        },
        link: function (scope, elem, attrs) {


            if (scope.setTop == '' || scope.setTop == undefined) {
                scope.setTop = '0'
            }
            if (scope.setLeft == '' || scope.setLeft == undefined) {
                scope.setLeft = '0'
            }
            if (scope.setRight == '' || scope.setRight == undefined) {
                scope.setRight = '0'
            }

            if (scope.setZindex == '' || scope.setZindex == undefined) {
                scope.setZindex = '1'
            }
            

            var template = '<div id="fixedtoHeaderheight_' + scope.$id + '" style="display:none"></div>';
            attrs.$observe('stickOnScroll', function (value) {
                if (value == "true") {
                    var newElement = $compile(template)(scope);
                    elem.after(newElement);
                    var scrollTop = elem.offset().top;
                    angular.element($window).bind('scroll', function () {
                        var elemHeight = elem.outerHeight(),
                            winScrollTop = angular.element($window).scrollTop();

                        if (winScrollTop >= scrollTop) {
                            if (attrs.stickLimit != undefined) {
                                var el = $(attrs.stickLimit),
                                    config = {
                                        top: el.offset().top,
                                        height: el.outerHeight()
                                    };
                                if ((winScrollTop + elem.outerHeight()) > (config.top + config.height)) {
                                    elem.removeClass('is-fixed-on-top').css({ 'top': "", "left": "", "right": "", 'z-index': "" });
                                    angular.element('#fixedtoHeaderheight_' + scope.$id).css({ 'height': 0, 'display': 'none' });
                                } else {
                                    elem.addClass('is-fixed-on-top ' + attrs.applyClassOnFixed).css({ 'top': scope.setTop, 'left': scope.setLeft, 'right': scope.setRight, 'z-index': scope.setZindex });
                                    angular.element('#fixedtoHeaderheight_' + scope.$id).css({ 'height': elemHeight, 'display': 'block' });
                                }
                            } else {
                                elem.addClass('is-fixed-on-top ' + attrs.applyClassOnFixed).css({ 'top': scope.setTop, 'left': scope.setLeft, 'right': scope.setRight, 'z-index': scope.setZindex });
                                angular.element('#fixedtoHeaderheight_' + scope.$id).css({ 'height': elemHeight, 'display': 'block' });
                            }
                        } else {
                            elem.removeClass('is-fixed-on-top').css({ 'top': "", "left": "", "right":"", 'z-index': "" });
                            angular.element('#fixedtoHeaderheight_' + scope.$id).css({ 'height': 0, 'display': 'none' });
                        }

                        scope.onScroll();
                    });
                }
                else {
                    angular.element('#fixedtoHeaderheight_' + scope.$id).css({ 'height': 0, 'display': 'none' });
                    elem.next('#fixedtoHeaderheight_' + scope.$id).remove();
                    elem.removeClass('is-fixed-on-top').css({ 'top': "",   "left": "", "right":"",'z-index': "" });
                    
                }
            });

        }

    }
});

