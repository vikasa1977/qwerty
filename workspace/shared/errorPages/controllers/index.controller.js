'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pOrderCtrl
 * @description
 * Controller of P2P Orders.
 */
    .controller('errorPagesCtrl', ['$scope', errorPagesCtrlFunc])
    .controller('acceptCtrl', ['$scope', '$state', '$rootScope', acceptCtrlFunc]);

/**
 * @ngdoc method
 * @name p2pOrderCtrlFunc
 * @methodOf SMART2.controller:p2pOrderCtrl
 * @description
 * The method of the p2pOrderCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function errorPagesCtrlFunc($scope) {
  
    	
};

function acceptCtrlFunc($scope, $state, $rootScope) {
    if ($state.current.name == 'error.accepted' || $state.current.name == 'error.rejected') {
        $rootScope.showHeader = true;
        $rootScope.applyFullHeight = true;
    }
};