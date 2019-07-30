angular.module('SMART2').directive('smartZoom', function () {
	return {
		restrict: 'ACE',
		scope: {
			'currentZoom': '=',
			'imgSize': '=',
			'zoomObjAttr': '='
		},
		link: function (scope, elem, attrs) {
			//console.log(scope.zoomObjD);
			elem.bind('click', function () {
				if (scope.zoomObjAttr == true) {
					scope.currentZoom += 20;
					scope.imgSize = scope.currentZoom + "%";
				} else {
					scope.currentZoom -= 20;
					scope.imgSize = scope.currentZoom + "%";
				};
			});
		}
	}
});