'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pReqCtrl
 * @description
 * Controller of P2P Request.
 */
    .controller('invoiceEmptyCtrl', ['$scope', p2pInvEmptyCtrlFunc]);

/**
 * @ngdoc method
 * @name p2pReqCtrlFunc
 * @methodOf SMART2.controller:p2pReqCtrl
 * @description
 * The method of the p2pReqCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function p2pInvEmptyCtrlFunc($scope) {

    

    $scope.invFromExcel = "p2p/inv/views/createInvFromExcel_popup.html";

    $scope.invFromExcelPopup = false;
    $scope.invFromExcelCallback = function (e) {
        $scope.invFromExcelPopup = true;
    };
    $scope.invFromExcelOnHideCallback = function () {
        $scope.invFromExcelPopup = false;
    };

};