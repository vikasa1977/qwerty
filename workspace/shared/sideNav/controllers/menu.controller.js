angular
    .module('SMART2')
    .controller('menuCtrl', ['$scope', '$translate', 'routeSvc', '$state', menuCtrlFunc]);

function menuCtrlFunc($scope, $translate,routeSvc, $state) {
    $scope.logout = $translate.instant('logOut');
    $scope.configure = $translate.instant('configure');
    $scope.reachUs = $translate.instant('REACH US');
    $scope.placeholderText = $translate.instant('search').toUpperCase();
    $scope.placeholderTextCopy = $translate.instant('search').toUpperCase();
    $scope.accordianshow = false;
    $scope.onAccordianChange = function (a) {
       
         $scope.accordianshow = a.isOpen;
       
    };
    // angular.element("#searchBox").bind("keydown keypress", function (event) {
        
    //     //Route to Search result page on Enter Key press
    //     if (event.which === 13) {
    //         routeSvc.goTo('#searchResult?search=' + event.target.value);
    //         }
    // });

    $scope.closeSideBar = function () {
        //$scope.showUserProfileOverlay = false;
        $scope.$parent.$parent.$parent.$parent.hideProfileOverlayCall();
        $state.go('p2p.req.spendDashboard');
        $scope.$parent.$parent.$parent.$parent.resetPanes();        
    };

    $scope.menulist = [
        {
            'type': 'input'
        }]

    $scope.onKeyDown = function(event) {
        if (event.which === 13) {
            $state.go('searchResult', {search:event.target.value});
        }
    }

    $scope.closeNav = function (goto) {
        $state.go(goto);
     
        $scope.$parent.$parent.$parent.$parent.resetPanes()
    }
   
};
