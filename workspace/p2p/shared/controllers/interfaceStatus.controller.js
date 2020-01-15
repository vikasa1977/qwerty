angular.module('SMART2')
    .controller('commonInterfaceStatusCtrlr', ['$scope', '$filter', 'p2pDetailsService', commonInterfaceStatusCtrlr]);

function commonInterfaceStatusCtrlr($scope, $filter, p2pDetailsService) {

    $scope.interfaceComment = "--";
    $scope.formatedInterfaceDate = "--";

    var docData = p2pDetailsService.getDocumentDataModel();
    if (docData != undefined) {
        if (docData.interfaceDate != undefined) {
            $scope.formatedInterfaceDate = $filter('smartDateFormatWorskspace')(docData.interfaceDate, 'MM/dd/yyyy HH:mm:ss a', 'long');
        }
        if (docData.interfaceComment != undefined && docData.interfaceComment != '' && docData.interfaceComment != null) {
            $scope.interfaceComment = docData.interfaceComment;
        }
    }
}