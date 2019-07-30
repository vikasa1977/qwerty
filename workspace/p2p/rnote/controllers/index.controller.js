angular.module('SMART2')
    .controller('p2pRNoteCtrl', ['$scope', '$http', p2pRnoteCtrlFunc])
.controller('shipToRNoteCtrl', ['$scope', '$rootScope', shipToRNoteCtrlFunc]);

function p2pRnoteCtrlFunc($scope, $http) {

	

}

/* SHIP TO LOCATION CONTROLLER */
function shipToRNoteCtrlFunc($scope, $rootScope) {	
	$scope.shipTo = "";

	//$scope.getShiptoAddress = function () {
	//	if ($scope.shipTo != "") {
	//		$scope.showShiptoAddress = true;
	//	} else {
	//		$scope.showShiptoAddress = false;
	//	}

	//}

	$scope.shipToAddress = "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708."
	$scope.ngModel = $scope.ngModel.data;
	$scope.toggleModal = false;

	/*
	 *  Get selected option
	 */
	//var getSelectedShipToOption = function () {

	//	if ($scope.ngModel.shipTo) {
	//		for (var i = 0; i < $scope.ngModel.shipTo.length; i++) {
	//			if ($scope.ngModel.shipTo[i].selected == true) {
	//				return $scope.ngModel.shipTo[i];
	//			}
	//		}
	//	}
	//	return undefined;
	//};


	//var locationData = angular.copy($scope.ngModel.location);


	//$scope.selectedShipToOption = getSelectedShipToOption();


	/*
	 *  Model data change listener
	 */
	$scope.$watch('ngModel.shipTo', function (newModel, oldModel) {
		if (newModel) {
			$scope.selectedShipToOption = getSelectedShipToOption();
		}
	}, true);

	$scope.showLocationPopup = false;
	$scope.showLocationPopupFn = function () {
		$scope.showLocationPopup = true;
	};
	$scope.showLocationPopupClBack = function () {
		$scope.showLocationPopup = false;
	};

}
/* SHIP TO LOCATION CONTROLLER ENDS */


