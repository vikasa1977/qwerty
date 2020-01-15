(function () {
    'use strict';
    angular.module('SMART2').directive('searchHeader', ['$timeout', '$window', function ($timeout, $window) {
        return {
            restrict: 'AEC',

            scope: {
                searchValue: '=ngModel',
                widthAdjust: '@',
                isActiveHeader: '=isActiveHeader',
                searchId: '@',
                widthManage: '=widthManage',
                onKeyDown: '&'
            },
            link: function (scope, element, attrs) {

                //Custom Placeholder
                scope.placeholder = angular.isDefined(attrs.placeholder) ? attrs.placeholder : "";

                //Search functionality  
                if (scope.isActiveHeader) {
                    scope.hideCloseHeader = true;
                }
                scope.showSearchHeader = function () {
                    if (!scope.isActiveHeader) {
                        scope.isActiveHeader = true;
                        scope.hideCloseHeader = true;
                        searchFun();
                    }        
                }
                scope.hideSearchHeader = function () {
                    scope.isActiveHeader = false;
                    scope.hideCloseHeader = false;
                }
                scope.onKeyDownCalled = function (e) {
                    scope.onKeyDown({
                        $event:e
                    });
                }
           
                var searchFun = function () {
                   
                  if(scope.isActiveHeader){
                    scope.widthManage = angular.isDefined(scope.widthManage) ? scope.widthManage : 0;
                    scope.offSets = angular.element("#" + scope.searchId).offset().left - scope.widthManage;
                    angular.element("#" + scope.searchId).css({ 'width': scope.offSets + 'px' }).find("input, .search-icon").click(function (e) {
                        e.stopPropagation();
                    });
                   }
                   else{
                     angular.element("#" + scope.searchId).css({ 'width': ''})
                   }
                    
                };
                attrs.$observe('searchId', function (value) {
                    $timeout(function () {
                        scope.searchId = value;
                        $("#" + scope.searchId).on("click", searchFun);
                       
                        if (scope.isActiveHeader) {
                            searchFun();
                        };
                     }, 500);
                })
                //angular.element("#" + scope.searchId).click(function () {
                //    searchFun();
                //});
            },
            templateUrl: 'shared/directives/searchHeader/searchHeaderTemplate.html'
        };
    }]);
})();