angular.module('SMART2')
    
	.controller('commonPopupCtrl', ['$scope', '$translate', '$rootScope', 'RuleEngine', '$http', '$filter', 'notification', commonPopupCtrlFunc])
    

function commonPopupCtrlFunc($scope, $translate, $rootScope, RuleEngine, $http, $filter, notification) {

    var comingFrom;
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e, popupComingfrom) {
        $scope.showUploadPopup = true;
        comingFrom = popupComingfrom;
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
        if (comingFrom == undefined) {

            return false;
        } else if (comingFrom == "comment") {
            $scope.showCommentsPopup = true;
        }
    }

    $scope.docDiscription = {
        docName: "Upload Document sds",
        fileSupport: "Supported file formats : doc, docs, df, jpg, jpeg, png, tiff.",
        fileSize: "Limited to file(s) of 10MB each.",
        fileLimit: "Maximum 5 files can be uploaded."
    }
    $scope.types = {
        fileType: ".jpg, .jpg, .pdf, .docx"
    }

    
    
}
