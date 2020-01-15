(function () {
    'use strict';
    angular.module('SMART2').directive('searchProductSetting', function () {
        return {
            restrict: 'AE',
            scope: true,
            link: function ($scope, $elem, $attrs) {
                $scope.searchVisible = false;
                $scope.searchText = "";
                $scope.onSearchClick = function(){
                    if(!$scope.searchVisible)
                    {
                        // Open searchbox here
                        var parentElement = angular.element(".selectDivisionWrapper");
                        var offSetWidth = parentElement[0].offsetWidth - (parentElement[0].children[0].offsetWidth + parentElement[0].children[1].offsetWidth);
                        angular.element("#searchFieldContainer").css({ 'width': (offSetWidth*0.75 + 'px') });
                        angular.element("#cancelSearch").css({"display":"inline-block"});
                        $scope.searchVisible = true;
                        angular.element("#searchIconContainer").css({"cursor":"default"}).removeClass("blue-text").addClass("grey-text");
                    }
                    else
                    {
                        //console.log($scope.searchText);
                        // Perform search here
                    }
                }

                $scope.onCancelClick = function(e){
                    angular.element("#searchFieldContainer").css({ 'width': (0 + 'px') });
                    $scope.searchVisible = false;
                    $scope.searchText = "";
                }

                angular.element("#searchFieldContainer").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
                    if(!$scope.searchVisible)
                    {
                        angular.element("#cancelSearch").css({"display":"none"});
                        angular.element("#searchIconContainer").css({"cursor":"pointer"}).removeClass("grey-text").addClass("blue-text");
                        angular.element("#searchButton").removeClass("disabled");
                    }
                    else
                    {
                        angular.element("#searchButton").addClass("disabled");
                    }
                });
            }
        }
    });       
}) ();