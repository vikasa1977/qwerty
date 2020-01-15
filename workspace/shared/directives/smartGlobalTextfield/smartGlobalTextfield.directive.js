angular.module('SMART2').controller('globalSearch', ['$scope', '$rootScope', 'routeSvc', '$location',
function($scope, $rootScope, routeSvc, $location) {

	$scope.searchValue = $location.$$search.search;

	$scope.onKeyDown = function(event) {

		$scope.searchValue = event.target.value;
		//call controller function to trigger search on Enter key press
		if (event.which === 13) {
			$rootScope.$broadcast('searchText', {
				data : event.target.value
			});
		}
	}

	$scope.searchBox = function() {
		//call controller function to trigger search on click of Anchor tag
		routeSvc.goTo('#searchResult?search=' + $scope.searchValue);
		$rootScope.$broadcast('searchText', {
			data : $scope.searchValue
		});
	}

	$scope.clearSearch = function() {
		$scope.searchValue = '';
	}
}]);

angular.module('SMART2').directive('smartGlobalTextfield', ['routeSvc',
function(routeSvc) {
	return {
		restrict : 'E',
		replace : true,
		scope : false,
		link : function(scope, element, attrs) {

			element.bind("keydown keypress", function(event) {

				//Route to Search result page on Enter Key press
				if (event.which === 13) {
					routeSvc.goTo('#searchResult?search=' + event.target.value);
				}
			});
		},
		controller : 'globalSearch',
		templateUrl : 'shared/directives/smartGlobalTextfield/smartGlobalTextfieldTemplate.html'
	};
}]);

angular.module('SMART2').controller('searchBoxCtrl', ['$scope', '$window', 'requestClicked', searchBoxCtrlFunc]);

function searchBoxCtrlFunc($scope, $window, requestClicked) {

	angular.element('.searchWrapper').css({
		opacity : 1
	});

	$scope.$watch(function() {
		return requestClicked.getProperty();
	}, function(newVal, oldVal) {

		if (newVal !== oldVal) {
			$scope.isRequestClicked = newVal;
			if (newVal)
				angular.element('.searchWrapper').addClass("searchWrapper--hide");
			else
				angular.element('.searchWrapper').removeClass("searchWrapper--hide");

		}
	});
}



