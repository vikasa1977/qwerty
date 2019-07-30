(function (angular) {
	'use strict';
	angular
        .module('SMART2')
        .service('routeSvc', ['$log', '$window', '$location', '$state', routeSvcFunc]);

	function routeSvcFunc($log, $window, $location, $state) {
		this.goTo = goTo;
		this.routeTo = routeTo;
		this.stateTo = stateTo;

		//Routing to external URL or Absolute URL
		function goTo(path) {
			$window.location.href = path;
		};

		//Routing to internal URL or relative URL
		function routeTo(path) {
			$location.path(path);
		};

		//Routing based on states defined in routing
		function stateTo(path, params) {
			$state.go(path, params);
		};
	};
})(angular);
