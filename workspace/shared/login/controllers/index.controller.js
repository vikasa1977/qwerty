angular
    .module('SMART2')
    .controller('loginCtrl', ['$scope', '$state', '$rootScope', loginCtrlFunc])
   
function loginCtrlFunc($scope, $state,$rootScope) {
	$scope.langDropDownConfig = {
		inDuration: 300,
		outDuration: 225,
		constrain_width: false, // Does not change width of dropdown to that of the activator
		hover: false, // Activate on hover
		gutter: 0, // Spacing from edge
		belowOrigin: false, // Displays dropdown below the button
		alignment: 'left' // Displays dropdown with edge aligned to the left of button
	};

	$rootScope.showWelcomeScreen = true;

	$scope.loginInfo = { "userEmail": "emily.ross@gep.com", "password": "Password123" };

	$scope.clickCallback = function () {
	    $state.go('platform', {"statefrom":"login"})
	}
};

 