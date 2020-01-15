angular
	.module('SMART2')
	.controller('approvalMatrixCtrl', ['$scope', '$timeout', '$state', '$http', '$filter', 'notification', 'storeService', 'dbFactory', approvalMatrixCtrlFunc])
    .controller('uploadAttachment', ['$scope', uploadAttachment])
    

function approvalMatrixCtrlFunc($scope, $timeout, $state, $http, $filter, notification, storeService, dbFactory) {
    $scope.isUploadStatus = true;
    //$scope.docType = "contract"
    $scope.scannedImg = false;
    $scope.isUploadStatus = true;
    $scope.isApplyFilters = true;
    $scope.isContractUploading = true;

    $scope.isUploadinginProgess = true;

    $scope.newFile = [];

    $timeout(function () {
        $scope.isUploadinginProgess = false;
        $scope.isUploadingDone = true;
    }, 6000)

    $scope.uploadCount = "3";
    $scope.uploadSuccessCount = "1";
    $scope.uploadFailedCount = "1";
    $scope.uploadInprogressCount = "1";
    $scope.uploadAppMatrix = { show: false };
    $scope.updateAppMatrix = { show: false };
    $scope.downloadTemplatePopup = { show: false };
    $scope.popupLink = false;
    $scope.downloadTemplate = function (type) {
        if (type == "popuplink") {
            $scope.$parent.$parent.$parent.uploadAppMatrix.show = false;
            $scope.$parent.$parent.$parent.downloadTemplatePopup.show = true;
        }
        else {
            $scope.downloadTemplatePopup.show = true;
            $scope.popupLink = true;
        }
    }
    $scope.uploadAppMatrixCallback = function () {
        $scope.uploadAppMatrix.show = true;
    }
    $scope.hideUploadAppMatrixCallback = function (e) {
        $scope.uploadAppMatrix.show = false;
    }

    $scope.updateAppMatrixCallback = function(){
        $scope.updateAppMatrix.show = true;
    }

    $scope.emptyNewFile = function(){
        $scope.newFile = [];
    }

    $scope.hideUpdateAppMatrixCallback = function(){
        $scope.updateAppMatrix.show = false;
    }

    $scope.uploadDownloadLogPopup = false;
    $scope.viewUploadLog = function (e) {
        $scope.uploadDownloadLogPopup = true;
    }
    $scope.uploadDownloadLogPopupHide = function (e) {
        $scope.uploadDownloadLogPopup = false;
    }

    //$scope.downloadTemplatePopup.show = false;
    
    $scope.downloadTemplatePopupHide = function (e) {
        $scope.downloadTemplatePopup.show = false;
        if($scope.popupLink != true){
            $scope.uploadAppMatrix.show = true;
        }

    }

    $scope.tableHeaderData = [
            {
                "Name": "Sr No.",
                "Country": "Germany"
            }, {
                "Name": "Name",
                "Country": "Group"
            }, {
                "Name": "Attribute",
                "Country": "Lead Approval"
            }, {
                "Name": "Approver Type",
                "Country": "Auto Approval"
            }, {
                "Name": "",
                "Country": "Auto Approval"
            }
    ]

    $scope.uploadData = [
        { log: 'download', logText: 'Download', statusText: 'In progress', failed: "35", total: "663", documentName: '-', level: 'Pricesheet', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
        { log: 'upload', logText: 'Uploaded', statusText: 'In progress', failed: "3", total: "365", documentName: '-', level: 'Questionnaire', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
        { log: 'upload', logText: 'Uploaded', statusText: 'In progress', failed: "0", total: "43", documentName: '-', level: 'Event', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Success', failed: "0", total: "34", documentName: 'Product Specification.docx', level: 'Document', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Failed', failed: "6", total: "658", documentName: 'Specification.docx', level: 'Document', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'failed' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Failed', failed: "65", total: "636", documentName: 'Attachment.docx', level: 'Pricesheet', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'failed' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Success', failed: "0", total: "3673", documentName: 'Document.docx', level: 'Event', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
		{ log: 'download', logText: 'Downloaded', statusText: 'Success', failed: "0", total: "758", documentName: 'Product.docx', level: 'Questionnaire', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
    ];

    $scope.templateData = [
        { templateName: 'Attribute 1' },
        { templateName: 'Attribute 2' },
        { templateName: 'Attribute 3' },
        { templateName: 'Attribute 4' },
        { templateName: 'Attribute 5' },
        { templateName: 'Attribute 6' },
        { templateName: 'Attribute 7' },
        { templateName: 'Attribute 8' },
        { templateName: 'Attribute 9' }
    ];

    $scope.uploadApprovalMatrix = { show: false};
    $scope.uploadAppMatrixFile = function (e) {
        $scope.$parent.uploadApprovalMatrix.show = true;
    }

    $scope.updateAppMatrixFile = function (e) {
        $scope.newFile = [];
        $scope.updateAppMatrix.show = false;
        Materialize.toast("Approval Matrix updated", 1500, "_updateFeedbackToast");
    }

    $scope.approvalMatrixData = [
       {
           "fileDetails": {
               "title": "lorem.xls",
               "attribute": 'abc',
               "approverType": "xyz"
           }
       }, {
           "fileDetails": {
               "title": "lorem.xls",
               "attribute": 'abc',
               "approverType": "xyz"
           }
       }, {
           "fileDetails": {
               "title": "lorem.xls",
               "attribute": 'abc',
               "approverType": "xyz"
           }
       }, {
           "fileDetails": {
               "title": "lorem.xls",
               "attribute": 'abc',
               "approverType": "xyz"
           }
       }, {
           "fileDetails": {
               "title": "lorem.xls",
               "attribute": 'abc',
               "approverType": "xyz"
           }
       }];
};

function uploadAttachment($scope, $state) {
    $scope.link = function () {
        //$state.go('p2p.inv.excel');
    }
}