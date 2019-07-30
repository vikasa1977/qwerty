var M = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    M = M[2]?[M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
//if ((M[0]=== 'MSIE' || M[0]=== 'IE') && M[1] < 11) {
 //   alert('Unsupported Browser. Contact System Administrator.');
//}
function closeModal() {
       document.getElementById('closeModalID').style.display = 'none';
    }
if ((M[0]=== 'MSIE' || M[0]=== 'IE') && M[1] < 11) {
    $('html').append('<div class="modal modal-sm notify-warning animated bounceIn ng-scope" id="closeModalID" style="z-index: 9999;opacity: 1;width: 464px;top: 50%;margin-top: -134px;display: block;overflow: visible;width: 500px;"><div style="height: 121px;background: black;position: relative;"><span style="background: url(../workspace/shared/resources/images/browser-sniff/Exclamation-Red.png) no-repeat;width: 156px;height: 156px;position: absolute;top: -18px;z-index: 1;left: 20px;overflow: auto;"></span><span style="position: absolute;left: 33%;color: #d63d3d;top: 40%;FONT-SIZE: 22PX;">Old browser detected</span></div><div class="modal-content padding0"><div class="cart"><div class="card-header notify-header"></div><div class="card-content padding25">This browser is too old to run SMART by GEP. <br>Please contact your system administrator.</div></div></div><div class="modal-footer" tabindex="1"><a class="waves-effect waves-light btn-flat right paddingLeft10 paddingRight10" onclick="closeModal()" href="#">OKAY</a></div></div>');
}

var timeZoneOffset = 20; // that means time Offset is not configured
(function (angular) {
    'use strict';

    

    /**
     * @ngdoc object
     * @name SMART2
     * @description
     * {@link https://angularjs.org/ AngularJS} project module of SMART 2.0 product
     * by {@link http://www.gep.com/ GEP} 
     */
    angular.module('SMART2', [
            'ui.router',
			'smartHierarchyComponent',
            // 'ngResource',
            'ngAnimate',
            // 'angularGrid',
            'pascalprecht.translate',
			// 'angularGrid',
            'pascalprecht.translate',

            'ui.grid',
            'ui.grid.selection',
            'ui.grid.cellNav',
            'ui.grid.pinning',
            'ui.grid.resizeColumns',
            'ui.grid.moveColumns',
            'ui.grid.grouping',
            'ui.grid.validate',
            'ui.grid.treeView',
            'ui.grid.edit',
            'ui.grid.pagination',
            'ngFileUpload',
			'angularUtils.directives.dirPagination',
            'highcharts-ng',
			'wj',
			'ngCkeditor',
            'angular-gestures',
            'oc.lazyLoad',
            'angular-intro'
            // 'angulartics',
            // 'angulartics.newrelic.insights'

        ])
        .config(['$translateProvider', '$compileProvider', 'APPCONSTANTS', 'hammerDefaultOptsProvider', appConfigFunc])
        .run(['$rootScope', '$sce', 'favoriteOps', 'APPCONSTANTS', '$window', '$state', '$notification', runFunc]);


    // angular.element(document).ready(function() {
    //     angular.bootstrap(document, ['SMART2']);
    // });


    /**
     * @ngdoc method
     * @name configFunc
     * @methodOf SMART2.config
     * @description
     * The method of the SMART2 config. This config handles any other configurations of the application other than routing.
     *
     * @param {Object} $animateProvider Default implementation of $animate that doesn't perform any animations, instead just synchronously performs DOM updates and resolves the returned runner promise. 
     */
    function appConfigFunc($translateProvider, $compileProvider, APPCONSTANTS, hammerDefaultOptsProvider) {
        /*
        hmDoubleTap : 'doubletap',
        hmDragstart : 'dragstart',
        hmDrag : 'drag',
        hmDragUp : 'dragup',
        hmDragDown : 'dragdown',
        hmDragLeft : 'dragleft',
        hmDragRight : 'dragright',
        hmDragend : 'dragend',
        hmHold : 'hold',
        hmPinch : 'pinch',
        hmPinchIn : 'pinchin',
        hmPinchOut : 'pinchout',
        hmRelease : 'release',
        hmRotate : 'rotate',
        hmSwipe : 'swipe',
        hmSwipeUp : 'swipeup',
        hmSwipeDown : 'swipedown',
        hmSwipeLeft : 'swipeleft',
        hmSwipeRight : 'swiperight',
        hmTap : 'tap',
        hmTouch : 'touch',
        hmTransformstart : 'transformstart',
        hmTransform : 'transform',
        hmTransformend : 'transformend'
        */
        hammerDefaultOptsProvider.set({
        /*
        hmDoubleTap: [Hammer.Tap, 'Hammer.Tap'],
        hmDragstart: [Hammer.Pan, 'Hammer.Pan'],
        hmDrag: [Hammer.Pan, 'Hammer.Pan'],
        hmDragUp: [Hammer.Pan, 'Hammer.Pan'],
        hmDragDown: [Hammer.Pan, 'Hammer.Pan'],
        hmDragLeft: [Hammer.Pan, 'Hammer.Pan'],
        hmDragRight: [Hammer.Pan, 'Hammer.Pan'],
        hmDragend: [Hammer.Pan, 'Hammer.Pan'],
        hmPanstart: [Hammer.Pan, 'Hammer.Pan'],
        hmPan: [Hammer.Pan, 'Hammer.Pan'],
        hmPanUp: [Hammer.Pan, 'Hammer.Pan'],
        hmPanDown: [Hammer.Pan, 'Hammer.Pan'],
        hmPanLeft: [Hammer.Pan, 'Hammer.Pan'],
        hmPanRight: [Hammer.Pan, 'Hammer.Pan'],
        hmPanend: [Hammer.Pan, 'Hammer.Pan'],
        hmHold: [Hammer.Press, 'Hammer.Press'],
        hmPinch: [Hammer.Pinch, 'Hammer.Pinch'],
        hmPinchstart: [Hammer.Pinch, 'Hammer.Pinch'],
        hmPinchend: [Hammer.Pinch, 'Hammer.Pinch'],
        hmPinchIn: [Hammer.Pinch, 'Hammer.Pinch'],
        hmPinchOut: [Hammer.Pinch, 'Hammer.Pinch'],
        hmPress: [Hammer.Press, 'Hammer.Press'],
        hmPressUp: [Hammer.Press, 'Hammer.Press'],
        hmRelease: [Hammer.Press, 'Hammer.Press'],
        hmRotate: [Hammer.Rotate, 'Hammer.Rotate'],
        hmSwipe: [Hammer.Swipe, 'Hammer.Swipe'],
        hmSwipeUp: [Hammer.Swipe, 'Hammer.Swipe'],
        hmSwipeDown: [Hammer.Swipe, 'Hammer.Swipe'],
        hmSwipeLeft: [Hammer.Swipe, 'Hammer.Swipe'],
        hmSwipeRight: [Hammer.Swipe, 'Hammer.Swipe'],
        hmTap: [Hammer.Tap, 'Hammer.Tap']
        */
            recognizers: [[Hammer.Tap, { time: 250 }], [Hammer.Pan, { time: 250 }], [Hammer.Press, { time: 250 }], [Hammer.Rotate, { time: 250 }], [Hammer.Pinch, { time: 250 }], [Hammer.Swipe, { time: 250 }]]
        });

//        $compileProvider.debugInfoEnabled(false);
        APPCONSTANTS.userPreferences = userInfo;
        userInfo = undefined;

        $translateProvider.translations(APPCONSTANTS.userPreferences.UserBasicDetails.Culture, Resources);
        $translateProvider.preferredLanguage(APPCONSTANTS.userPreferences.UserBasicDetails.Culture);
    }

    function runFunc($rootScope, $sce, favoriteOps, APPCONSTANTS, $window, $state,$notification) {
        
    	$rootScope.$on('$stateChangeSuccess',
			function (event, toState, toParams, fromState, fromParams) {
			    var notifyController = ["p2pReqNewCtrl"],
			        controller = toState.controller;

				$window.scrollTo(0, 0);
				$state.previous = fromState;
				$rootScope.isPageWithoutImage = toState.isPageWithoutImage;
				$rootScope.isPageWithgray = toState.isPageWithgray;
				$rootScope.IEcustomWheel = false;
				if (notifyController.indexOf(controller) == -1) {
				    $notification.kill();
				}
				$rootScope.showScrollBar = false;
			}
		);
        //TODO: update Domain name in URL
        // APPCONSTANTS.userPreferences.LogoImageURL = 'https://gepmtstorage.blob.core.windows.net/smartcontent/workspace/shared/theme/user/logo/' + APPCONSTANTS.userPreferences.UserBasicDetails.ClientID + '_logo.png';
        // APPCONSTANTS.userPreferences.BGImageURL = 'https://gepmtstorage.blob.core.windows.net/smartcontent/workspace/shared/theme/user/background/' + APPCONSTANTS.userPreferences.UserBasicDetails.ClientID + '_bg.png';
        APPCONSTANTS.userPreferences.LogoImagePartialPath = APPCONSTANTS.userPreferences.URLs.ContentURL + "cumuluscontent/logo/";
        APPCONSTANTS.userPreferences.BGImagePartialPath = APPCONSTANTS.userPreferences.URLs.ContentURL + 'smartcontent/workspace/shared/theme/user/background/';
        APPCONSTANTS.userPreferences.LogoImageURL = APPCONSTANTS.userPreferences.LogoImagePartialPath + APPCONSTANTS.userPreferences.UserBasicDetails.ClientID + '_logo.png';
        APPCONSTANTS.userPreferences.BGImageURL = APPCONSTANTS.userPreferences.BGImagePartialPath + APPCONSTANTS.userPreferences.UserBasicDetails.ClientID + '_bg.png';

        //$rootScope.BGImage = {
        //    "background-image": "url(" + APPCONSTANTS.userPreferences.BGImageURL + ")"
        //};

        //FOR DEMO/UX BRANCH THE BACKGROUND IMAGE MAKE HARDCODED
        $rootScope.BGImage = { 
            "background-image": "url('shared/resources/images/pageBg.jpg')"
        };

        $rootScope.logoImage = $sce.getTrustedResourceUrl($sce.trustAsResourceUrl(APPCONSTANTS.userPreferences.LogoImageURL));
        $rootScope.bookmarkPopup = false;
        $rootScope.showWelcomeScreen = false;
        $rootScope.closePopup = function() {
            $rootScope.bookmarkPopup = false;
        };

        // Making Initial loading - One time service calls 
        favoriteOps.fetchServerFavorites();

        //add for check mac-pc
        $rootScope.isMac = false;
        if(navigator.userAgent.indexOf('Mac') > 0){
             $rootScope.isMac = true;
        }
        angular.element('body').append('<div class="sniffingContainer" smart-browser-sniffing show-sniffing="true"></div>');
    }
})(angular);
