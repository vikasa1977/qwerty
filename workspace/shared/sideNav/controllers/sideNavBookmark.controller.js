angular
    .module('SMART2')
    .controller('addBookmarkCtrl', ['$scope', '$translate', '$rootScope', addBookmarkCtrlFunc]);

    function addBookmarkCtrlFunc($scope, $translate, $rootScope) {
    	$scope.addBookmark = function(e){
    		console.log('addBookmark');
    		console.log(e);
    	};
    	$scope.closePopup = function(e){
    		console.log('closePopup');
    		console.log(e);
    		$rootScope.bookmarkPopup=false;
    	};
    };