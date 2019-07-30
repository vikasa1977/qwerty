(function (angular) {
    angular.module("SMART2").directive("analyseItem", analyseItem);

    function analyseItem() {
        return {
            restrict: "E",
            replace: true,
            link: function (scope, element, attrs) {},
            templateUrl: "shared/analyse/views/analyseItem.html"
        }
    }
})(angular);