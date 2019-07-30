angular.module('SMART2').directive('animateOnLoad', ['$animateCss', function ($animateCss) {
	return {
		'link': function (scope, element) {
		
			$animateCss(element, {
				'event': 'enter',
				structural: true
			}).start();
		}
	};
}]);
