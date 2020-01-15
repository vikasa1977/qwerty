(function () {
    'use strict';
    angular.module('SMART2').directive('stickyHeaderTable', ['$window', function ($window) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, $elem, $attrs) {
                var $win = angular.element($window);
                var elem = $elem[0];

                // set widths of columns
                $win.on('scroll', function() {
                    angular.forEach(elem.querySelectorAll('tr:first-child th'), function (thElem, i) {
                        var tdElems = elem.querySelector('tbody:nth-child(2) tr:nth-child(2) td:nth-child(' +(i +1) + ')');
                        var columnWidth = tdElems ? tdElems.offsetWidth: thElem.offsetWidth;

                        if (tdElems) {
                            tdElems.style.width = columnWidth + 'px';
                            }
                        if (thElem) {
                            thElem.style.width = columnWidth + 'px';
                    }
                });
                });

                }
             }
     }]);
}) ();