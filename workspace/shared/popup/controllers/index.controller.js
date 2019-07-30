'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pIRCtrl
 * @description
 * Controller of P2P Invoice reconciliation.
 */
    .controller('attachement', ['$scope', '$timeout', 'notification', attachementsFunc])

/**
 * @ngdoc method
 * @name p2pIRCtrlFunc
 * @methodOf SMART2.controller:p2pIRCtrl
 * @description
 * The method of the p2pIRCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function attachementsFunc($scope, $timeout, notification){
//Attachment popup--start
	$scope.uploadTitle = "ADD ATTACHMENTS";
	$scope.showUploadPopup = false;
	$scope.adduploadCallback = function (e) {
		$scope.showUploadPopup = true;
	}
	$scope.hideUploadPopupCallback = function (e) {
		$scope.showUploadPopup = false;
	}
	$scope.docFlag = false;
	$scope.uploadDocCall = function (e) {
		$scope.docFlag = true;
	};
	$scope.attachFlag = false;

	$scope.attachmentList = [
		{
			name: "AttachmentOne.xls",
			status: "fail",
			referenceName: "Add Name",
			isShow:true,
			actionIconDelete: false
		},
		{
			name: "AttachmentTwo.xls",
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true
		},
		{
			name: "AttachmentThree.xls",
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true
		},
		{
			name: "AttachmentFour.xls",			
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true
		},
		{
			name: "AttachmentFive.xls",
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true			
		}
	];
    
     $scope.attachmentStatus = function () {
        var d = $scope.attachmentList;
        if (!d.length) return false;

        //console.log("IM in")
        var i,
            Leng = d.length;
        for (i = 0; i < Leng; i++){
            if (d[i].status === 'fail') {
                return 'fail';
            } else if (d[i].status === 'success') {
                return 'success';
            }
        }
        return 'loading';
    };

	$scope.attachmentCall = function (e) {
		$scope.attachFlag = true;
		
		for (var i = 0; i < $scope.attachmentList.length;i++){
			$scope.attachmentList[i].isShow = true;
		}
	};
	$scope.closeAttachment = function (el) {
		el.isShow = false;		
	}

	$scope.retryCall = function (el) {
		el.status = "success";
	}
	$scope.removeRow = function (el) {
	    // remove the row specified in index
		if ($scope.attachmentList.length > 1) {
			if ($scope.attachmentList.length == 2) {
				$scope.attachmentList[1].actionIconDelete = false;
	        }
			$scope.attachmentList.splice(index, 1);
	    }
	};
	//Attachment popup--end
}