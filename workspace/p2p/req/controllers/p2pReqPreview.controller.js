'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pReqCtrl
 * @description
 * Controller of P2P Request.
 */
    .controller('p2pReqPreviewCtrl', ['$scope', '$state', 'notification', p2pReqPreviewCtrlFunc]);

/**
 * @ngdoc method
 * @name p2pReqCtrlFunc
 * @methodOf SMART2.controller:p2pReqCtrl
 * @description
 * The method of the p2pReqCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function p2pReqPreviewCtrlFunc($scope, $state, notification) {
	$scope.editReq = function () {
		$state.go('p2p.req.new');
	}
	$scope.pageType = {};
	$scope.pageType.type = $state.params.type;

	$scope.field = { "name": "Requisition Name", "value": "Requisition 70726844877" }

    //emailer popup
    $scope.emailer = "shared/popup/views/popupEmailer.html";
    $scope.emailerPopup = false;
    $scope.emailerPopupCallback = function (e) {
        $scope.emailerPopup = true;
    };

    $scope.emailerPopupHideCallback = function (e) {
        $scope.emailerPopup = false;
    };

    //Notification
    $scope.submitReq = function () {
        var confi = {
            type: "success",
            message: "<p class='left-align'>Requisition has been submitted successfully.</p>",
    
            buttons: [
				{
				    "title": "YES",
				    "result": "yes"
				},
				{
				    "title": "Stay on same page",
				    "result": "no"
				}
            ]
        };

        //Notification call
        notification.notify(confi, function (responce) {
            if (responce.result == "yes") {
                $state.go('expandedLandingList', { pagefor: 'manage', doctype: 'requisition' });
            } else {
                return;
            }
        });
    }

    $scope.createNote = function () {
        $state.go('p2p.rnote.empty');
    }
};