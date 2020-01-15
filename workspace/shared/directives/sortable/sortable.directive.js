angular.module('SMART2').directive('sortable', function () {
    return {
        restrict: 'A',
       
        link: function postLink(scope, elem, attrs) {
            elem.sortable();
        }
    };
});