(function (angular) {
    'use strict';

    angular
        .module('SMART2')
        .controller('headerPublicRfxCtrl', ['$scope', '$rootScope', '$translate', '$sce', '$compile', 'APPCONSTANTS', '$state', 'notification', '$timeout','$window', headerPublicRfxCtrlFunc]);

    function headerPublicRfxCtrlFunc($scope, $rootScope, $translate, $sce, $compile, APPCONSTANTS, $state, notification, $timeout, $window) {
        $scope.showMenu = true;
		$scope.showCrossIcon=false;
        $scope.showUserProfileOverlay = false;
        $scope.showProfileOverlayCall = function () {
            $scope.showUserProfileOverlay = true;
        };

        //$scope.bookmark = "test";

        $scope.$on('callOverlayWithParapater', function (event, para) {
            $scope.showUserProfileOverlay = true;
        });
   
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
     
        $scope.showAddBppkmarkPopupHideCall = function (item) {
            $scope.bookmarkPopupFlag = false;
        }
        $scope.addAnnouncementOnHideCallback = function (item) {
            $rootScope.addAnnouncementPopup = false;
        }
        $scope.addBookmarkOnHideCallback = function (item) {
            $rootScope.bookmarkPopupFlag1 = false;
        }   

        /***/
        $scope.subHeader = false;

        $scope.isShow = true;
        $scope.searchbox = function () {
            $scope.isShow = $scope.isShow ? false : true;
        }

        var navigationNum = 0;
        $scope.stateOfSideBar = true; // True mean open
        $scope.applyActiveClass = [false, false, false]; // Length of array in Bool values as per number of tabs

        function activateClassArray(tabIndex) {
            var emptyArr = [];
            for (var i = 0; i < $scope.applyActiveClass.length; i++) {
                if (tabIndex == i + 1)
                    emptyArr.push(true);
                else
                    emptyArr.push(false);
            }
            $scope.applyActiveClass = emptyArr;
        }

        function deactivateClassArray() {
            var emptyArr = [];
            for (var i = 0; i < $scope.applyActiveClass.length; i++) {
                emptyArr.push(false);
            }
            $scope.applyActiveClass = emptyArr;
        }


        $scope.sideNavComp = [];

        /*navigation js*/
        $('.right-side-nav').sideNav({
            menuWidth: 320,
            edge: 'right',
            closeOnClick: false
        });

        $scope.test = true;
        $rootScope.$on('itemDelet', function (event, args) {

            $rootScope.itemFromDelete = args.itemFrom;

            if ($rootScope.itemFromDelete != undefined) {

                var mssage;

                switch ($rootScope.itemFromDelete) {
                    case 'req':
                        mssage = "Requsition document deleted successfully."
                        break;
                    case 'Order':
                        mssage = "Order document deleted successfully."
                        break;

                }


                var successMsg = {
                    type: "success",
                    message: mssage,
                    buttons: [
                        {
                            title: "OK",
                            result: "ok"
                        }
                    ]
                }


                $timeout(function () {
                    notification.notify(successMsg, function (responce) {
                        var result = responce.result;
                        return false;
                    });
                }, 1000)

            };
        });



        //CONFIGURATION TO GENERATE HEADER BUTTONS AND ITS SIDE PANES
        // TODO: remove notification Count variable with value from service
        $scope.buttonsObjects = {
            userProfile: {
                name: 'userProfile',
                class: 'ng-hide',
                icon: "https://gepmtstorage.blob.core.windows.net/smartcontent/workspace/shared/theme/images/dummyImage.jpg",  // "https://gepmtstorage.blob.core.windows.net/smartcontent/workspace/shared/theme/images/user_default_SMALL.PNG", 
                tooltip: $translate.instant('Profile'),
                active: false,
                isUserProfile: true,
                href: "#/user/profile"
            },
            help: {
                name: 'Help',
                class: '',
                icon: "#icon_Help",
                tooltip: $translate.instant('Support'),
                position: "bottom",
                active: false,
                templateURL: 'shared/sideNav/views/helpCenterPublicRfx.html',
                href: "https://smartqc.gep.com/HelpCenter/HelpCenter?oloc=101"
            },           
            login: {
                name: 'Login',
                class: '',
                icon: "#icon_Login",
                tooltip: $translate.instant('Login'),
                position: "bottom",
                active: false,
                isExternalLink:true,
                href: "index_launcher.html#/"
            },
            register: {
                name: 'Register',
                class: '',
                icon: "#icon_Registration",
                tooltip: $translate.instant('Register'),
                position: "bottom",
                active: false,
                isExternalLink: true,
                href: "index_launcher.html#/supplier/prf"
            }
        };

        if (APPCONSTANTS.userPreferences.UserBasicDetails.IsAdmin) {
            $scope.buttonsObjects.navigation.data.push({
                'navTitle': 'Configure',
                'navIcon': '#icon_Settings',
                'type': 'label',
                'href': "https://smartdev.gep.com/UserSettings?oloc=101"
            });
        }
        if ($scope.buttonsObjects.notification) {
            $scope.buttonsObjects.notification.notification = $scope.buttonsObjects.notification.data.internal.length + $scope.buttonsObjects.notification.data.external.length;
        }
       
        $scope.logout = $translate.instant('logOut');
        $scope.buttonLabel = $translate.instant("add") + ' ' + $translate.instant("as") + ' ' + $translate.instant("bookmark");

        $scope.lastHeaderBtnClicked = false;

        $scope.resetPanes = function (isLast) {
           
            var rginRight = "";
            console.log("deactivateButtons...");
			
            _.each($scope.buttonsObjects, function (item, key, collection) {
                item.active = false;
                item.showPane = false;
            });
            if ($scope.lastHeaderBtnClicked) {
                $scope.lastHeaderBtnClicked = false;
                if ($('.fixed-action-btn').length && $('#sidenav-overlay').length) {
                    $('.fixed-action-btn').removeAttr('style');
                }
            } else {
                $scope.lastHeaderBtnClicked = isLast;
                //console.log("open")
                if ($('.fixed-action-btn').length) {
                    $('.fixed-action-btn').css('z-index', '-1');
                }
            }
            $scope.toggleOverlay(false);

            // if(val===!0){
            _.each($scope.buttonsObjects, function (value, key, list) {
                value.marginRight = "";
                
            });
            // }
            if ($('.fixed-action-btn').length  && $('#sidenav-overlay').length) {
               $('.fixed-action-btn').removeAttr('style');
            }
        };

        $scope.toggleOverlay = function (val) {
            //if (typeof config != "undefined" && config.isExternalLink ) {
            //    $window.location.href = config.href;
            //    return;
            //}
			
            $scope.sidePaneVisible = val;
			$scope.isSideMenuOpen=val;
			if(!val){
				
				angular.element('.nav-right-buttons li a').css({
								"cursor":"pointer"
							});
			}
        };
        $scope.navOpen = function (navigationNum, thisEvent) {
            var $this = angular.element(thisEvent.currentTarget).parent();
            if ($('#overlay1').css('display') == 'block') {
                setTimeout(function () {
                    $('.overlayOkayButton').trigger('click');
                }, 200);
            }
            if ($this.hasClass('currentActive')) {
                if ($this.is(':last-child')) {
                    $this.parent().removeClass('nav-slide-active');
                }
                $this.removeClass('currentActive');
                for (var i = 0; i < $scope.sideNavComp.length; i++) {
                    $scope.sideNavComp[i] = false;
                }
                return false;
            } else {
                var $that = angular.element('.currentActive > a').parent();

                if ($that.is(':last-child')) {
                    $that.parent().removeClass('nav-slide-active');
                }
                $that.removeClass('currentActive');
                for (var i = 0; i < $scope.sideNavComp.length; i++) {
                    $scope.sideNavComp[i] = false;
                }

                $scope.sideNavComp[Number(angular.element(thisEvent.currentTarget).attr("idx"))] = true;
                if ($this.is(':last-child')) {
                    $this.parent().addClass('nav-slide-active');
                }
                $this.addClass('currentActive');
                return false;
            }
        };

        $scope.onKeyDown = function (event) {
            if (event.which === 13) {
                $state.go('searchResult', {
                    search: event.target.value
                });
            }
        };
              
        $scope.hideHeader = false;

        $rootScope.$on('hideheader',function (e, a) {
                    $scope.hideHeader = a.condition;
            });
    };


 

})(angular);
