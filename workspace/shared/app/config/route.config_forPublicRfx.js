(function (angular) {
    'use strict';
    angular
        .module('SMART2')
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$controllerProvider', 'APPCONSTANTS', '$provide', routeConfigFunc])
		.directive("scrolled", function ($window, $document, StickyElements) {
		    var scrollDiff,
			scrollPosi;
		    scrollDiff = $window.innerHeight - 75;
		    scrollDiff = scrollDiff - 871;
		    var stickyElement = [];

		    function scrollerFun(scope, element, attrs, $actionBar, $descriptor, $attachmentcontainer) {

		        if ($('.sidebar--calc').length) {
		            var topVal = 64;
		            var scrollVal = $(this).scrollTop();
		            var winHgt = $window.innerHeight;
		            if (scrollVal >= topVal) {
		                $('.sidebar--calc').css('top', 50);
		                var panelHeight = winHgt - 165;
		                scope.panelHeight = panelHeight + 'px';
		            } else {
		                $('.sidebar--calc').css('top', 114 - scrollVal);
		                var panelHeight = winHgt - 228 + scrollVal;
		                scope.panelHeight = parseInt(panelHeight) + 'px';
		            }
		            scope.$digest();
		        }

		        //sticky questionnaire search show hide on scroll
		        if (attrs.scrollCall && this.pageYOffset <= 65) {
		            scope.pageYOffset = this.pageYOffset;
		            scope.$digest();
		        }

		        if (this.pageYOffset >= 64) {
		            //scope.fixedSubHeader = true;
		            if (!scope.fixedSubHeader) {
		                scope.fixedSubHeader = true;
		                scope.$digest();
		            }
		            if (scope.fixedSubHeader) {
		                if (stickyElement.length === 0 && angular.element(element).height() != 0) {
		                    stickyElement.push(element);
		                }
		                else if (stickyElement.length > 0 && angular.element(element).height() != 0) {
		                    angular.forEach(stickyElement, function (element) {
		                        if (stickyElement.indexOf(element) == -1)
		                            stickyElement.push(element);
		                    });
		                }
		            }
		            StickyElements.set(stickyElement);

		        } else {
		            if (scope.fixedSubHeader) {
		                scope.fixedSubHeader = false;
		                scope.$digest();
		                angular.forEach(stickyElement, function (element) {
		                    stickyElement.splice(stickyElement.indexOf(element), 1);
		                });
		                StickyElements.set(stickyElement);
		            }
		        }


		        if (this.pageYOffset >= 350) {
		            if (!scope.stickyQuestionHead) {
		                scope.stickyQuestionHead = true;
		                scope.$digest();
		                if (angular.element('.questionnaireSectionNavHeader').length) {
		                    stickyElement.push(angular.element('.questionnaireSectionNavHeader'));
		                    StickyElements.set(stickyElement);
		                }
		            }
		            //scope.stickyQuestionHead = true;
		        } else {
		            //scope.stickyQuestionHead = false;

		            if (scope.stickyQuestionHead) {
		                scope.stickyQuestionHead = false;
		                scope.$digest();
		                stickyElement.splice(stickyElement.indexOf(angular.element('.questionnaireSectionNavHeader')[0]), 1);
		                StickyElements.set(stickyElement);
		            }
		        }
		        if (scope.fixedSubHeader) {
		            if (!element.data("fixedBack")) {
		                var elType = element.get(0).nodeName,
                            el = $("<" + elType + ">");
		                el.css("height", element.outerHeight());
		                element.data("fixedBack", el).after(el);
		            }
		        } else {
		            var fbc = element.data("fixedBack");
		            if (fbc) {
		                fbc.remove();
		                element.data("fixedBack", null);
		            }
		        }
		        //clearTimeout(resizeTimer);
		        //if (scope.pageAutoScroll) {
		        if (!$actionBar) {
		            $actionBar = document.getElementById('stickyAddPanel');
		        }
		        if (!$descriptor) {
		            $descriptor = document.getElementById('questionnaire-container');
		        }

		        if (!$attachmentcontainer) {
		            $attachmentcontainer = document.getElementById('questionnaire-Attachment-container');
		        }
		        if ($actionBar) {
		            // debugger
		            scrollPosi = (($window.pageYOffset + scrollDiff));
		            if ($window.pageYOffset > 0) {
		                scrollPosi = scope.questionnaireDataTlength ? scrollPosi - 30 : scrollPosi;
		                scrollPosi = ($($attachmentcontainer).length) ? scrollPosi - $($attachmentcontainer).height() : scrollPosi;
		                scrollPosi = (scrollPosi > $descriptor.offsetHeight) ? (($($attachmentcontainer).length) ? $descriptor.offsetHeight - 100 : ($descriptor.offsetHeight) - 100) : scrollPosi;

		                //scrollPosi = scrollPosi > ($descriptor.offsetHeight + $attachmentcontainer.offsetHeight) ? ($descriptor.offsetHeight + $attachmentcontainer.offsetHeight) - 100 : scrollPosi;
		                (scrollPosi >= 0) ? $actionBar.style.top = scrollPosi + "px" : $actionBar.style.top = "1px";
		            } else {
		                $actionBar.style.top = "1px";
		            }
		        }
		    }

		    return function (scope, element, attrs) {
		        // Need to Improve and Optimize the code

		        var body = document.body,
					resizeTimer,
					$descriptor,
                    $attachmentcontainer,
					$actionBar;
		        scope.scrollDiffpos = scrollDiff,
				scope.pageYOffset = 64;
		        if (element.attr("id") != "stepper-parent-container") {
		            angular.element($window).bind("scroll", function () {
		                scrollerFun.call(this, scope, element, attrs, $actionBar, $descriptor, $attachmentcontainer);
		            });

		            scrollerFun.call($window, scope, element, attrs, $actionBar, $descriptor, $attachmentcontainer);
		        } else if (element.attr("id") == "stepper-parent-container") {
		            //On scroll award-stepper is getting fixed
		            angular.element($window).bind("scroll", function () {
		                var awardStepperCnt = angular.element('#stepper-parent-container');
		                var awardAddSupplierHdrCnt = angular.element('#award-addSupplierHdrTblWrap');
		                if (angular.element(this).scrollTop() > awardStepperCnt.position().top - 20) {
		                    awardStepperCnt.addClass("fixedPos");
		                    awardAddSupplierHdrCnt.addClass("fixedPos extraShadow");
		                } else {
		                    awardStepperCnt.removeClass("fixedPos");
		                    awardAddSupplierHdrCnt.removeClass("fixedPos extraShadow");
		                }
		            });
		        }
		    };
		})

    /**
     * @ngdoc method
     * @name configFunc
     * @methodOf SMART2.config
     * @description
     * The method of the SMART2 config. This config handles routing using Angular UI router.
     *
     * @param {Object} $stateProvider The new $stateProvider works similar to Angular's v1 router, but it focuses purely on state.
     * @param {Object} $urlRouterProvider $urlRouterProvider has the responsibility of watching $location. When $location changes it runs through a list of rules one by one until a match is found. $urlRouterProvider is used behind the scenes anytime you specify a url in a state configuration. All urls are compiled into a UrlMatcher object. <br/><br/> There are several methods on $urlRouterProvider that make it useful to use directly in your module config.
     */
    function routeConfigFunc($stateProvider, $urlRouterProvider, $translateProvider, $controllerProvider, APPCONSTANTS, $provide) {
        angular.module('SMART2').controllerProvider = $controllerProvider;
        angular.module('SMART2').provide = $provide;
        $urlRouterProvider.otherwise('/');
        $stateProvider
        //PLATFORM ROUTING
            .state('publicRfx', {
                url: '/publicRfx',
                templateUrl: 'sourcing/publicRfx/views/publicRfx.html',
                controller: 'publicRfxCtrl'
            })
            .state('landing', {
                url: '/landing',
                templateUrl: 'sourcing/publicRfx/views/landingPublicRfx.html',
                controller: 'landingPageCtrl',
                isPageWithoutImage: true
            })
    };

    //for closing datepicker on scroll
    $(window).scroll(function () {
        $("input.datepicker").each(function (i, el) {
            var dobj = $(el).data("daterangepicker");
            if (dobj && dobj.isShowing) {
                //dobj.hide()
            }
        });
    });

})(angular);
