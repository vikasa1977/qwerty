//div resizer
angular.module('SMART2').directive('isResizable', function () {
    return {
        restrict: 'A',
        scope: {
            'handle': '@',
            'onresize': '&',
             'onstart': '&',
            'onstop': '&'
        },
        link: function postLink(scope, elem, attrs) {
            elem.resizable({
                handles: scope.handle,
                resize: function (e) {
                    scope.onresize()
                },
                    start: function(){
                        scope.onstart();
                    }
                 ,
            stop: function(e){

                scope.onstop();
            }
            });

            if (attrs.maxheight != undefined) {
                attrs.$observe('maxheight', function () {
                    elem.resizable("option", "maxHeight", attrs.maxheight);
                });
            }
            if (attrs.minheight != undefined) {
                attrs.$observe('minheight', function () {
                    elem.resizable("option", "minheight", attrs.minheight);
                });

            }
        }
    }
});

//window resizer
angular.module('SMART2').directive('smartWindowResizer', ['$window', function ($window) {
    return {
        restrict: 'AE',
        replace:false,
        scope: {
            'pageHeight': '@'
        },
        link: function postLink(scope, elem, attrs) {
            
            scope.pageHeight = ($window.innerHeight - 114) + 'px';
            elem.css('height', scope.pageHeight);

            angular.element($window).bind('resize', function (e) {
                if (scope.fixedSubHeader) {
                    scope.pageHeight = ($window.innerHeight - 50) + 'px';
                }
                else {
                    scope.pageHeight = ($window.innerHeight - 114) + 'px';
                }

                scope.$apply();
                console.log(scope.pageHeight);
                elem.css('height', scope.pageHeight);
            });

        }
    };
}]);