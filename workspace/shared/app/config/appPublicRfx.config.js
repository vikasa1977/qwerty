(function(angular) {
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
		
            'ngAnimate',
            // 'angularGrid',
            'pascalprecht.translate',
			// 'angularGrid',
            'pascalprecht.translate',          
            'ngFileUpload',
			'angularUtils.directives.dirPagination',
		    'smartHierarchyComponent',
            'angular-gestures'
            // 'angulartics',
            // 'angulartics.newrelic.insights'

        ])
        .config(['$translateProvider', '$compileProvider','APPCONSTANTS', 'hammerDefaultOptsProvider', appConfigFunc])
        .run(['$rootScope', '$sce', '$window', '$state', 'APPCONSTANTS', '$notification', runFunc]);


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
    function appConfigFunc($translateProvider, $compileProvider,APPCONSTANTS, hammerDefaultOptsProvider) {
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
        APPCONSTANTS.userPreferences = userInfo;
        userInfo = undefined;
       
        $translateProvider.translations(APPCONSTANTS.userPreferences.UserBasicDetails.Culture, Resources);
        $translateProvider.preferredLanguage(APPCONSTANTS.userPreferences.UserBasicDetails.Culture); 
       
    }

    function runFunc($rootScope, $sce, $window, $state, APPCONSTANTS,$notification) {
        
    	$rootScope.$on('$stateChangeSuccess',
			function (event, toState, toParams, fromState, fromParams) {
			    var notifyController = ["p2pReqNewCtrl"],
			        controller = toState.controller;

				$window.scrollTo(0, 0);
				$state.previous = fromState;
				$rootScope.isPageWithoutImage = toState.isPageWithoutImage;
				if (notifyController.indexOf(controller) == -1) {
				    $notification.kill();
				}
			}
		);
      
        //$rootScope.BGImage = {
        //    "background-image": "url(" + APPCONSTANTS.userPreferences.BGImageURL + ")"
        //};

        //FOR DEMO/UX BRANCH THE BACKGROUND IMAGE MAKE HARDCODED
        $rootScope.BGImage = { 
            "background-image": "url('shared/resources/images/pageBg.jpg')"
        };

        $rootScope.bookmarkPopup = false;
        $rootScope.showWelcomeScreen = false;
        $rootScope.closePopup = function() {
            $rootScope.bookmarkPopup = false;
        };
      
        //add for check mac-pc
        $rootScope.isMac = false;
        if(navigator.userAgent.indexOf('Mac') > 0){
             $rootScope.isMac = true;
        }

    }
})(angular);
