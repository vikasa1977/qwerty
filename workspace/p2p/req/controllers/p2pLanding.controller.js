'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pReqCtrl
 * @description
 * Controller of P2P Request.
 */
    .controller('p2pLandingCtrl', ['$scope', '$rootScope', 'requisitions', '$state', p2pLandingCtrlFunc]);

function p2pLandingCtrlFunc($scope, $rootScope, requisitions, $state) {
    
    $rootScope.pageName = 'base';
    $scope.listData = requisitions.data.result;    

    $scope.clickHandler = function (e) {
        $state.go('p2p.req', { id: e.id });
    };

    $scope.lazyLoadCallback = function (e) {

    }
}
