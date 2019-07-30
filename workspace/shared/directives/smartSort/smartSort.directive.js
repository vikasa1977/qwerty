angular.module('SMART2').directive('smartSort', function () {
    return {
        restrict: 'E',
       	transclude: true,
       	template:'<a href=\"javascript:void(0)\" class="waves-circle waves-effect waves-grey" ng-click=\"ascDescToggler()\">\n<i ng-if="currentCell != sortBy" class=\"icon iconSmall grey-text\" smart-tooltip position=\"bottom\" delay=\"50\" message=\"{{ \'Sort By \' | translate }}\">\n<svg>\n<use xlink:href=\"{{ \'#icon_Sort\' }}\"><\/use>\n<\/svg><\/i><i class=\"icon iconSmall grey-text\" ng-if="currentCell == sortBy" ng-class=\" { \'s-dd-icon-wth-color\':  currentCell == sortBy }\"  smart-tooltip position=\"bottom\" delay=\"50\" message=\"{{ iconWithTooltip.tooltip | translate }}\">\n<svg>\n<use xlink:href=\"{{ iconWithTooltip.sortbyIcon }}\"><\/use>\n<\/svg><\/i><\/a>',
       	scope:{
       		sortBy:"=",
       		sortReverse:"=",
			currentCell:"@"
       	},
       	link:function($scope, $element, $attrs){

       		$scope.iconWithTooltip = {
				sortbyIcon : "",
       			tooltip	:	""

       		}

       		
	       		$scope.ascDescToggler = function(){
              
       			$scope.sortBy = $scope.currentCell;
	       			$scope.sortReverse = !$scope.sortReverse;

	       			if($scope.sortBy == $scope.currentCell && $scope.sortReverse == false ){
							$scope.iconWithTooltip.sortbyIcon = "#icon_SortDescending";
	       					$scope.iconWithTooltip.tooltip	=	"Descending";
	       			}
	       			else if($scope.sortBy == $scope.currentCell && $scope.sortReverse == true ){
							$scope.iconWithTooltip.sortbyIcon = "#icon_SortAscending";
	       					$scope.iconWithTooltip.tooltip	=	"Ascending";
	       			}
	       			
       			};
       		
       	}
       
    }
});