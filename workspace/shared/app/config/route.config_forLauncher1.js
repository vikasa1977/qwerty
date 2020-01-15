(function (angular) {
    'use strict';

    SmartController.type = "launcher";

    angular
        .module('SMART2')

        /**
         * @ngdoc service
         * @name SMART2.config
         * @description
         * Config of SMART2 project. Among other configurations, it also contains the routing configuration.
         */
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$controllerProvider', 'APPCONSTANTS', '$provide', routeConfigFunc])
		.directive("scrolled", function ($window, $document, StickyElements) {
		    var scrollDiff,
			scrollPosi,
		    $scorecardsidebar = {},
		    scrollDiff = $window.innerHeight - 75,
            msgCtnHgt = 0;

		    scrollDiff = scrollDiff - 871;
		    
		    var stickyElement = [],
		        windowHgt = $window.innerHeight - 68;

		    function scrollerFun(scope, element, attrs, $actionBar, $descriptor, $attachmentcontainer, $stepper) {
		        if ($('.sidebar--calc').length) {
		            var topVal = 64;
		            var alertBar = 40;
		            var scrollVal = $(this).scrollTop();
		            var winHgt = $window.innerHeight;
		            if (scrollVal >= topVal) {
		                if (scope.isApplyFilters) {
		                    $('.sidebar--calc').css('top', 90);
		                    var panelHeight = winHgt - 165 - alertBar;
		                }
		                else {
		                    $('.sidebar--calc').css('top', 50);
		                    var panelHeight = winHgt - 165;
		                }
		                scope.panelHeight = panelHeight + 'px';
		            } else {
		                if (scope.isApplyFilters) {
		                    $('.sidebar--calc').css('top', 154 - scrollVal);
		                    var panelHeight = winHgt - 228 + scrollVal - alertBar;
		                }
		                else {
		                    $('.sidebar--calc').css('top', 114 - scrollVal);
		                    var panelHeight = winHgt - 228 + scrollVal;
		                }
		                scope.panelHeight = parseInt(panelHeight) + 'px';
		            }
		            scope.$digest();
		        };		        
		        if (!$scorecardsidebar.length) {
		            $scorecardsidebar = $('#scorecardsidebar');
		        }
		        
		            msgCtnHgt = $('.alert-bar--fixed').height();

		        //sticky questionnaire search show hide on scroll
		        if (attrs.scrollCall && this.pageYOffset <= 65) {
		            scope.pageYOffset = this.pageYOffset;		            
		            if ($scorecardsidebar.length) {
		                $scorecardsidebar.css({
		                    'top': (187 + msgCtnHgt) - this.pageYOffset,
		                    'height': windowHgt - ((187 + msgCtnHgt) - this.pageYOffset)
		                })
		            }
		            scope.$digest();
		        }

		        if (this.pageYOffset >= 64) {
		            if ($scorecardsidebar.height() !== (449 + msgCtnHgt)) {
		                $scorecardsidebar.css({
		                    'top': 122 + msgCtnHgt,
		                    'height': windowHgt - (122 + msgCtnHgt)
		                });
		            }
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
		        if (!$stepper) {
		            $stepper = document.getElementById('stepper-parent-container');
		        }

		        if ($stepper) {
                    //On scroll award-stepper is getting fixed
                    var awardStepperCnt = angular.element('#stepper-parent-container');
                    var awardAddSupplierHdrCnt = angular.element('#award-addSupplierHdrTblWrap');
		            if (angular.element(this).scrollTop() > awardStepperCnt.position().top - 20) {
		                awardStepperCnt.addClass("fixedPos");
		                awardAddSupplierHdrCnt.addClass("fixedPos extraShadow");
		                } else {
		                awardStepperCnt.removeClass("fixedPos");
		                awardAddSupplierHdrCnt.removeClass("fixedPos extraShadow");
                    }
                }
		    }

		    return function (scope, element, attrs) {
		        // Need to Improve and Optimize the code

		        var body = document.body,
					resizeTimer,
					$descriptor,
                    $attachmentcontainer,
                    $stepper,
					$actionBar;
		        scope.scrollDiffpos = scrollDiff,
				scope.pageYOffset = 64;

                angular.element($window).bind("scroll", function () {
                    scrollerFun.call($window, scope, element, attrs, $actionBar, $descriptor, $attachmentcontainer, $stepper);
		             
		        });
		    };
		})
        //.factory("newsControllerInitialData", function (messageService, greetingService, $q) {
        //    return function () {
        //        var message = messageService.getMessage();
        //        var greeting = greetingService.getGreeting();

        //        return $q.all([message, greeting]).then(function (results) {
        //            return {
        //                message: results[0],
        //                greeting: results[1]
        //            };
        //        });
        //    }
        //});

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
        // angular.module('SMART2').compileProvider    = $compileProvider;
        // angular.module('SMART2').routeProvider      = $routeProvider;
        // angular.module('SMART2').filterProvider     = $filterProvider;
        angular.module('SMART2').provide = $provide;

        $urlRouterProvider.otherwise('/');
        $stateProvider
        //LOGIN ROUTING
         .state('login', {
             url: '/',
             templateUrl: 'shared/login/views/index.html',
             controller: 'loginCtrl',
             controllerAs: 'login',
             onEnter: function ($state, $window) {
                 APPCONSTANTS.userPreferences.LastURL = "#/";
                 //$window.document.title="Login";
                 // TODO: Send last page to server on logout
                 // TODO: Update below line so that it points to 'APPCONSTANTS.userPreferences.lastURL' (or any) variable instead of hard-coded URL
                 window.location.href = APPCONSTANTS.userPreferences.LastURL; //"http://127.0.0.1:81/#/workQueue"; //APPCONSTANTS.userPreferences.lastURL
             }
         })

        //PLATFORM ROUTING
            .state('platform', {
                url: '/platform?statefrom',
                templateUrl: 'shared/home/views/index.html',
                controller: 'platformCtrl',
                controllerAs: 'platform'
                //onEnter: function ($window) { $window.document.title = "WORKSPACE"; }

            })
			// Project 2.0 routing
            .state('projects', {
                url: '/projects',
                templateUrl: 'project/ppst/views/index.html',
                controller: '',
                resolve: {
                            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('shared/resources/svg1/Projects-icons-svg.js'); // Resolve promise and load before view 
                            }]
                        }
            })
            .state('projects.new', {
                url: '/new',
                templateUrl: 'project/ppst/views/ppstLP.html',
                controller: 'PPSTCtrl',
                controllerAs: 'ppst'
            })
            .state('projects.milestones', {
                url: '/milestones',
                templateUrl: 'project/ppst/views/mileStonesNew.html',
                controller: 'MilestonesDetailsCntrl',
                controllerAs: 'milestone',
                isPageWithoutImage: true
            })
            .state('projects.addTeamMember', {
                url: '/addTeamMember?view',
                templateUrl: 'project/ppst/views/teamMemberAdd.html',
                controller: 'teamMemberCtrlProj'
            })
            .state('projects.addSupplier', {
                url: '/addSupplier',
                templateUrl: 'project/ppst/views/supplierAdd.html',
                controller: 'supplierCtrlProj'
            })
            .state('projects.linkedDocLanding', {
                url: '/linkedDocLanding',
                templateUrl: 'project/ppst/views/linkedDocLanding.html',
                controller: 'LinkedDocDetailCntrl',
                controllerAs: 'linkedDocs'
            })
       
             .state('projects.requester', {
                 url: '/requester',
                 templateUrl: 'project/projectRequester/views/requesterNew.html',
                 controller: 'requesterNewCtrl',
                 controllerAs: 'requester'
             })

            .state('trackStatus', {
                url: '/trackstatus',
                templateUrl: 'project/trackStatus/trackStatusNew.html',
                controller: 'NewTrackStatusCntrl',
                controllerAs: 'trackstatus',
                isPageWithoutImage: true
            })
			// Project 2.0 routing end
            .state('user', {
                url: '/user',
                templateUrl: 'shared/user/views/index.html'
                //controller: 'userCtrl',
                //controllerAs: 'user'
            })
            .state('user.profile', {
                url: '/profile',
                templateUrl: 'shared/user/views/userProfile.html',
                controller: 'userProfileCtrl',
                controllerAs: 'userprofile'
            })
            .state('components', {
                url: '/components',
                templateUrl: 'shared/components/views/index.html',
                controller: 'componentCtrl',
                controllerAs: 'components'
            })
            .state('formWidgetTest', {
                url: '/formWidget',
                templateUrl: 'shared/formWidgetTest/views/index.html',
                controller: 'formWidgetCtrl',
                controllerAs: 'platform'
            })
            .state('smartUIRepo', {
                url: '/smartUIRepo',
                templateUrl: 'shared/smartUIRepo/views/index.html',
                controller: 'smartUIRepoCtrl',
                controllerAs: 'smartUIRepo'
            })
            .state('uiRepo', {
                url: '/uiRepo',
                templateUrl: 'shared/uiRepo/views/index.html',
                controller: 'uiRepoCtrl',
                controllerAs: 'uiRepo'
            })
            .state('workQueue', {
                url: '/workQueue',
                templateUrl: 'shared/myTask/views/index.html',
                controller: 'myTaskCtrl'
            })
            .state('analyseReport', {
                url: "/analyseReport",
                templateUrl: "shared/analyse/views/index.html",
                controller: "analyseCtrl",
                resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('shared/resources/svg1/Analyse-icons-svg.js'); // Resolve promise and load before view 
                        }]
                    }
            })
            //.state('view', {
            //    url: '/view',
            //    templateUrl: 'shared/view/views/index.html',
            //    controller: 'viewCtrl',
            //    controllerAs: 'view'
            //})
            // .state('searchResult', {
            //     url: '/searchResult',
            //     templateUrl: 'shared/landingPage/views/index.html',
            //     controller: 'landingPageCtrl',
            //     controllerAs: 'landingPage'
            // })
            .state('searchResult', {
                url: '/searchResult?search',
                templateUrl: 'shared/landingPage/views/index.html',
                controller: 'landingPageCtrl',
                controllerAs: 'landingPage'
            })
//TODO: check resolve
            .state('landing', {
                url: '/landing',
                templateUrl: 'shared/landingPage/views/index.html',
                controller: 'landingCardPageCtrl',
                controllerAs: 'landingPage',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('shared/resources/svg1/Document_icons-icons-svg.js'); // Resolve promise and load before view 
                    }]
                }
            })
            .state('slickTesting', {
                url: '/slickTesting',
                templateUrl: 'shared/landingPage/views/slickTest.html',
                controller: 'SlickController',
                controllerAs: 'slickTesting'
            })
             .state('searchCard', {
                 url: '/searchCard',
                 templateUrl: 'shared/landingPage/views/searchBox.html',
                 controllerAs: 'landingPage',
                 controller: 'searchCardCtrl'
             })
            .state('expandedlanding', {
                url: '/landingmax',
                templateUrl: 'shared/myTask/views/expandedLandingView.html',
                controller: 'landingPageCtrl',
                controllerAs: 'landingPage'
            })
             .state('expandedLandingList', {
                 url: '/landinglist?pagefor?doctype?referrer',
                 templateUrl: 'shared/landingPage/views/expandedLandingList.html',
                 controller: 'landingPageCtrl',
                 controllerAs: 'landingPage',
                 isPageWithoutImage: true,
                 resolve: {
                     loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                         return $ocLazyLoad.load('shared/resources/svg1/Document_icons-icons-svg.js'); // Resolve promise and load before view 
                     }]
                 }
             })

        //P2P ROUTING
        .state('p2p', {
            url: '/p2p',
            templateUrl: 'p2p/shared/home/views/index.html',
            //controller: 'p2pCtrl',
            //controllerAs: 'p2p'
        })
            .state('p2p.inv', {
                url: '/inv',
                templateUrl: 'p2p/inv/views/index.html',
                controller: 'p2pInvCtrl',
                controllerAs: 'p2pInv',
                resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('shared/resources/svg1/Invoice-icons-svg.js'); // Resolve promise and load before view 
                        }]
                    }
            })
            .state('p2p.inv.excel', {
                url: '/excel',
                templateUrl: 'p2p/inv/views/p2pInvoiceExcel.html',
                controller: 'p2pInvExcelCtrl',
                controllerAs: 'p2pInvExcelCtrl',
                isPageWithoutImage: true
            })
            .state('p2p.inv.create', {
                url: '/create?scannedDoc?mode',
                templateUrl: 'p2p/inv/views/p2pInvoiceBasicDetails.html',
                controller: 'p2pInvBasicDetailsCtrl',
                controllerAs: 'p2pInvBasicDetailsCtrl'
            })
            .state('p2p.inv.nonpoinv', {
                url: '/nonpoinv',
                templateUrl: 'p2p/inv/views/p2pnonPoInvoiceBasicDetails.html',
                controller: 'p2pInvnonPoBasicDetailsCtrl'
            })
             .state('p2p.inv.linesDetails', {
                 url: '/linesDetails?popOut',
                 templateUrl: 'p2p/inv/views/linesDetailsPopoutTemp.html',
                 //controller: 'p2pInvnonPoBasicDetailsCtrl'
                 isPageWithoutImage: true
             })
			.state('p2p.inv.additionalInfo', {
			    url: '/additionalInfo?id',
			    templateUrl: 'p2p/inv/views/additionalInfo.html',
			    controller: 'additionalInformationCtrl',
			    controllerAs: 'additionalInfo',
			    isPageWithoutImage: true
			})
			.state('p2p.inv.create01', {
			    url: '/create01',
			    templateUrl: 'p2p/inv/views/p2pInvNew.html',
			    controller: 'p2pInvNewCtrl'
			})
			.state('p2p.inv.scanned', {
			    url: '/scanned',
			    templateUrl: 'p2p/inv/views/splitView.html',
			    controller: 'p2pInvScannedCtrl',
			    controllerAs: 'p2pInvScannedCtrl',
			    isPageWithoutImage: true
			})
            .state('p2p.inv.pdfViewer', {
                url: '/pdfViewer',
                templateUrl: 'p2p/inv/views/pdfViewer.html',
                controller: 'p2pPdfViewerCtrl',
                controllerAs: 'p2pPdfViewerCtrl',
                isPageWithoutImage: true
            })
            .state('p2p.inv.supCreate', {
                url: '/supCreate',
                templateUrl: 'p2p/inv/views/p2pInvoiceBasicDetails.html',
                controller: 'p2pInvBasicDetailsCtrl',
                controllerAs: 'p2pInvBasicDetailsCtrl'
            })
            .state('p2p.inv.dynamicDis', {
                url: '/dynamicDis',
                templateUrl: 'p2p/inv/views/dynamicDiscounting_buyer.html',
                controller: 'tableDataCtrl',
                controllerAs: 'InvdynamicDis'
            })
            .state('p2p.inv.dynamicDisSupplier', {
                url: '/dynamicDisSupplier',
                templateUrl: 'p2p/inv/views/dynamicDiscountingSupplier.html',
                controller: 'tableDataCtrl',
                controllerAs: 'InvdynamicDisSupplier'
            })
            .state('p2p.inv.empty', {
                url: '/empty',
                templateUrl: 'p2p/inv/views/empty.html',
                controller: 'invoiceEmptyCtrl',
                controllerAs: 'p2pInvEmpty'
            })

             .state('p2p.inv.preview', {
                 url: '/preview',
                 templateUrl: 'p2p/inv/views/p2pInvPreview.html',
                 controller: 'p2pInvPreviewCtrl',
                 controllerAs: 'p2pInvPreview'
             })
            .state('p2p.ir', {
                url: '/ir',
                templateUrl: 'p2p/ir/views/index.html',
                controller: 'p2pIRCtrl',
                controllerAs: 'p2pIR',
                resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('shared/resources/svg1/IR-icons-svg.js'); // Resolve promise and load before view 
                        }]
                    }
            })
            .state('p2p.ir.templatePrint', {
                url: '/templatePrint',
                templateUrl: 'p2p/ir/views/irTemplatePrint.html',
                controller: 'p2pIRtemplatePrintCtrl',
                controllerAs: 'p2pIRtemplatePrint'
            })

        .state('p2p.ir.cc', {
            url: '/cc',
            templateUrl: 'p2p/ir/views/IRNew.html',
            controller: 'p2pIRCtrl',
            controllerAs: 'p2pIR'
        })

        .state('p2p.ir.new', {
            url: '/new',
            templateUrl: 'p2p/ir/views/p2pIRBasicDetails.html',
            controller: 'p2pIRBasicDetailsCtrl',
            controllerAs: 'p2pIR'
        })

        .state('p2p.ir.preview', {
            url: '/preview',
            templateUrl: 'p2p/ir/views/p2pIrPreview.html',
            controller: 'p2pIrPreviewCtrl',
            controllerAs: 'p2pIrPreview'
        })
        .state('p2p.ir.cbtPreview', {
            url: '/cbtPreview',
            templateUrl: 'p2p/ir/views/p2pCBTPreview.html',
            controller: 'p2pIrPreviewCtrl',
            controllerAs: 'p2pIrPreview'
        })
        .state('p2p.ir.additionalInfo', {
            url: '/additionalInfo?id',
            templateUrl: 'p2p/ir/views/additionalInfo.html',
            controller: 'p2pIrAdditionalInformationCtrl',
            controllerAs: 'additionalInfo',
            isPageWithoutImage: true
        })
        .state('p2p.ir.approval', {
            url: '/approval',
            templateUrl: 'shared/approval/views/approvalPage.html',
            controller: 'p2pApprovalPageCtrl',
            controllerAs: 'p2pApprovalPage',
            isPageWithoutImage: true
        })

		.state('p2p.order', {
		    url: '/order',
		    templateUrl: 'p2p/order/views/index.html',
		    //controller: 'p2pOrderCtrl',
		    //controllerAs: 'p2pOrder'
		    resolve: {
		            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
		                return $ocLazyLoad.load('shared/resources/svg1/PO-icons-svg.js'); // Resolve promise and load before view 
		            }]
		        }
		})
        .state('p2p.order.new', {
            url: '/new?mode',
            templateUrl: 'p2p/order/views/p2pOrderNew.html',
            controller: 'p2pOrderNewCtrl',
            controllerAs: 'p2pOrder'
        })
        .state('p2p.order.viewChanges', {
            url: '/viewChanges?changeType?view',
            templateUrl: 'p2p/order/views/p2pOrderViewChanges.html',
            controller: 'p2pOrderViewChangesCtrl',
            controllerAs: 'p2pOrder'
        })
         .state('p2p.order.vChangePreview', {
             url: '/vChangePreview',
             templateUrl: 'p2p/order/views/viewChangePreview.html',
             controller: 'p2pVChangePreviewCtrl',
             controllerAs: 'p2pVChangePreview'
         })
		.state('p2p.order.preview', {
		    url: '/preview',
		    templateUrl: 'p2p/order/views/p2pOrderPreview.html',
		    controller: 'p2pOrderPreviewCtrl',
		    controllerAs: 'p2pOrderPreview'
		})
       .state('p2p.order.viewPdf', {
           url: '/viewPdf',
           templateUrl: 'p2p/order/views/p2pOrderPdf.html',
           controller: 'p2pOrderPdfCtrl',
           controllerAs: 'p2pOrderPdf'
       })
		.state('p2p.order.tnc', {
		    url: '/tnc',
		    templateUrl: 'p2p/order/views/p2pt&c.html',
		    controller: 'p2pOrderTnCCtrl',
		    controllerAs: 'p2pOrderTnC'
		})
        .state('p2p.order.mass', {
            url: '/mass',
            templateUrl: 'p2p/order/views/massUpdate.html',
            controller: 'massUpdateCtrl',
            controllerAs: 'p2pOrder'
        })
        .state('p2p.order.approval', {
            url: '/approval?mode',
            templateUrl: 'shared/approval/views/approvalPage.html',
            controller: 'p2pApprovalPageCtrl',
            controllerAs: 'p2pApprovalPage',
            isPageWithoutImage: true
        })
        .state('p2p.order.additionalInfo', {
            url: '/additionalInfo?id',
            templateUrl: 'p2p/order/views/additionalInfo.html',
            controller: 'additionalInfoCtrl',
            controllerAs: 'additionalInfo',
            isPageWithoutImage: true
        })
         .state('p2p.order.lineChanges', {
             url: '/lineChanges?tab',
             templateUrl: 'p2p/order/views/p2pOrderLineChanges.html',
             controller: 'p2pOrderLineChangesCtrl',
             isPageWithoutImage: true
         })
        .state('p2p.req', {
            url: '/req',
            templateUrl: 'p2p/req/views/index.html',
            controller: 'p2pReqCtrl',
            controllerAs: 'p2pReq',
            resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('shared/resources/svg1/Requisition-icons-svg.js'); // Resolve promise and load before view 
                    }]
                }
        })
        .state('p2p.req.new', {
            url: '/new?id?status',
            templateUrl: 'p2p/req/views/p2pReqNew.html',
            controller: 'p2pReqNewCtrl',
            controllerAs: 'p2pReqNew'
        })
        .state('p2p.req.reqDemo', {
            url: '/reqDemo',
            templateUrl: 'p2p/req/views/reqDemo.html',
            controller: 'p2pReqNewCtrl',
            controllerAs: 'p2pReqNew'
        })
        .state('p2p.req.previewDemo', {
            url: '/previewDemo?type',
            templateUrl: 'p2p/req/views/previewDemo.html',
            controller: 'p2pReqPreviewCtrl',
            controllerAs: 'p2pReqPreview'
        })
        .state('p2p.req.bussinessInsight', {
            url: '/bussinessInsight',
            templateUrl: 'p2p/req/views/bussinessInsight.html',
            controller: 'p2pReqNewCtrl',
            controllerAs: 'p2pReqNew'
        })
        .state('p2p.req.spendDashboard', {
            url: '/spendDashboard',
            templateUrl: 'p2p/req/views/spendDashboard.html',
            controllerAs: 'p2pReqNew'
        })
		.state('p2p.req.newv', {
		    url: '/newv',
		    templateUrl: 'p2p/req/views/p2pReqNewV.html',
		    controller: 'p2pReqNewVCtrl',
		    controllerAs: 'p2pReqNewV'
		})
        .state('p2p.req.preview', {
            url: '/preview',
            templateUrl: 'p2p/req/views/p2pReqPreview.html',
            controller: 'p2pReqPreviewCtrl',
            controllerAs: 'p2pReqPreview'
        })
        .state('p2p.req.approval', {
            url: '/approval',
            templateUrl: 'shared/approval/views/approvalPage.html',
            controller: 'p2pApprovalPageCtrl',
            controllerAs: 'p2pApprovalPage',
            isPageWithoutImage: true
        })
        .state('p2p.req.additionalInfo', {
            url: '/additionalInfo?id',
            templateUrl: 'p2p/req/views/additionalInfo.html',
            controller: 'p2pReqAdditionalInformationCtrl',
            controllerAs: 'additionalInfo',
            isPageWithoutImage: true
        })
        .state('p2p.req.viewChanges', {
            url: '/viewChanges?changeType?view',
            templateUrl: 'p2p/req/views/p2pReqViewChanges.html',
            controller: 'p2pReqViewChangesCtrl',
            controllerAs: 'p2pReqViewChanges'
        })
        .state('p2p.req.lineChanges', {
            url: '/lineChanges?tab',
            templateUrl: 'p2p/req/views/p2pReqLineChanges.html',
            controller: 'p2pReqLineChangesCtrl',
            isPageWithoutImage: true
        })
      /*  .state('p2p.req.landing', {
        	url: '/landing',
        	templateUrl: 'p2p/req/views/p2pReqLanding.html',
        	controller: 'p2pReqLandingCtrl',
        	controllerAs: 'p2pReqLanding'
        })
       
        .state('p2p.req.empty', {
        	url: '/empty',
        	templateUrl: 'p2p/req/views/p2pReqEmpty.html',
        	controller: 'p2pReqEmptyCtrl',
        	controllerAs: 'p2pReqEmpty'
        })
 */

        .state('p2p.template', {
            url: '/template?templatefor',
            templateUrl: 'p2p/shared/views/templateLanding.html',
            controller: 'p2pReqTemplateCtrl'
        })

		/* RECEIPTS */
		 .state('p2p.receipt', {
		     url: '/receipt',
		     templateUrl: 'p2p/receipts/views/index.html',
		     controller: 'p2pReceiptCtrl',
		     resolve: {
		            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
		                return $ocLazyLoad.load('shared/resources/svg1/Receipt-icons-svg.js'); // Resolve promise and load before view 
		            }]
		        }
		 })

		.state('p2p.receipt.new', {
		    url: '/new',
		    templateUrl: 'p2p/receipts/views/p2pReceiptNew.html',
		    controller: 'p2pReceiptNewCtrl'
		})
		/* RECEIPTS ENDS */
		.state('p2p.paymentReq', {
		    url: '/paymentReq',
		    templateUrl: 'p2p/paymentReq/views/index.html',
		    controller: 'p2pPaymentReqCtrl',
		    resolve: {
		        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
		            return $ocLazyLoad.load('shared/resources/svg1/Payment_Request-icons-svg.js'); // Resolve promise and load before view 
		        }]
		    }
		})
		.state('p2p.paymentReq.new', {
		    url: '/new',
		    templateUrl: 'p2p/paymentReq/views/paymentReqNew.html',
		    controller: 'p2pPaymentReqNewCtrl'
		})
		.state('p2p.serviceConfirmation', {
		    url: '/serviceConfirmation',
		    templateUrl: 'p2p/serviceConfirmation/views/index.html',
		    controller: 'p2pServiceConfCtrl',
		    resolve: {
		        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
		            return $ocLazyLoad.load('shared/resources/svg1/Service_Confirmation-icons-svg.js'); // Resolve promise and load before view 
		        }]
		    }
		})
		.state('p2p.serviceConfirmation.new', {
		    url: '/new',
		    templateUrl: 'p2p/serviceConfirmation/views/serviceConfirmationNew.html',
		    controller: 'p2pServiceConfNewCtrl'
		})
        .state('p2p.creditMemo', {
            url: '/creditmemo',
            templateUrl: 'p2p/creditMemo/views/index.html',
            controller: 'p2pCreditMemoCtrl',
            controllerAs: 'p2pCreditMemo',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('shared/resources/svg1/Credit_Memo-icons-svg.js'); // Resolve promise and load before view 
                }]
            }

        })
        .state('p2p.creditMemo.new', {
            url: '/new',
            templateUrl: 'p2p/creditMemo/views/p2pCreditMemoNew.html',
            //controller: 'p2pCreditMemoCtrl',
            controllerAs: 'p2pCreditMemo'
        })
        .state('p2p.creditMemo.preview', {
            url: '/preview',
            templateUrl: 'p2p/creditMemo/views/p2pCreditMemoPreview.html',
            controller: 'p2pCreditMemoCtrl',
            controllerAs: 'p2pCreditMemo'
        })

        .state('p2p.rnote', {
            url: '/rnote',
            templateUrl: 'p2p/rnote/views/index.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('shared/resources/svg1/Return_Note-icons-svg.js'); // Resolve promise and load before view 
                }]
            }
        })

        .state('p2p.rnote.new', {
            url: '/new',
            templateUrl: 'p2p/rnote/views/rnote.html',
            controller: 'p2pRNoteCtrl',
            controllerAs: 'p2pRnote'
        })

        .state('p2p.rnote.preview', {
            url: '/preview',
            templateUrl: 'p2p/rnote/views/rnotePreview.html',
            controller: 'p2pRNoteCtrl',
            controllerAs: 'p2pRnote'
        })

        .state('p2p.rnote.empty', {
            url: '/empty',
            templateUrl: 'p2p/rnote/views/empty.html',
            controller: 'p2pRNoteCtrl',
            controllerAs: 'p2pRnote'
        })
         .state('p2p.asn', {
             url: '/asn',
             templateUrl: 'p2p/asn/views/index.html',
             resolve: {
                 loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load('shared/resources/svg1/ASN-icons-svg.js'); // Resolve promise and load before view 
                 }]
             }
         })
           .state('p2p.asn.new', {
               url: '/new?status',
               templateUrl: 'p2p/asn/views/p2pAsnNew.html',
               controller: 'p2pAsnNewCtrl',
               controllerAs: 'p2pAsnNew'
           })

        .state('p2p.asn.preview', {
            url: '/preview',
            templateUrl: 'p2p/asn/views/p2pAsnPreview.html',
            controller: 'p2pAsnPreviewCtrl',
            controllerAs: 'p2pAsnPreview'
        })
         //req workbench
            .state('reqWorkbench', {
                url: '/reqWorkbench',
                templateUrl: 'reqWorkbench/views/index.html'
            })
            .state('reqWorkbench.landing', {
                url: '/landing',
                templateUrl: 'reqWorkbench/views/landing.html',
                controller: 'reqWorkbenchCtrl',
                controllerAs: 'reqWorkbench',
                isPageWithoutImage: true

            })

            .state('reqWorkbench.space', {
                url: '/space',
                templateUrl: 'reqWorkbench/views/space.html',
                controller: 'reqWorkbenchCtrl',
                controllerAs: 'reqWorkbench',
                isPageWithoutImage: true
            })
            //Catalog Rounting for requestercatalog
            .state('catalog', {
                url: '/catalog',
                templateUrl: 'catalog/views/index.html',
                resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('shared/resources/svg1/Catalog-icons-svg.js'); // Resolve promise and load before view 
                        }]
                    }
            })
             .state('catalog.requestercatalog', {
                 url: '/requestercatalog',
                 templateUrl: 'catalog/requesterCatalog/views/index.html',
                 controller: 'catalogCtrl',
                 controllerAs: 'catalog'
             })
            .state('catalog.requestercatalog.search', {
                url: '/search',
                templateUrl: 'catalog/requesterCatalog/views/searchResults.html',
                controller: 'catalogSearchCtrl',
                controllerAs: 'catalogSearch'
            })
			.state('catalog.requestercatalog.noresults', {
			    url: '/noresults',
			    templateUrl: 'catalog/requesterCatalog/views/noResults.html',
			    controller: 'catalogSearchCtrl',
			    controllerAs: 'catalogSearch',
			    isPageWithoutImage: true
			})
            .state('catalog.requestercatalog.punchout', {
                url: '/punchout',
                templateUrl: 'catalog/requesterCatalog/views/punchouts.html',
                controller: 'catalogPunchoutCtrl',
                controllerAs: 'catalogPunchout'
            })
            .state('catalog.requestercatalog.contracted', {
                url: '/contracted',
                templateUrl: 'catalog/requesterCatalog/views/contractedPartners.html',
                controller: 'catalogContractedCtrl',
                controllerAs: 'catalogContracted'
            })
            .state('catalog.requestercatalog.landing', {
                url: '/landing',
                templateUrl: 'catalog/requesterCatalog/views/catalogLanding.html',
                controller: 'catalogLandingCtrl',
                controllerAs: 'catalogLanding'
            })
            .state('catalog.requestercatalog.itemDetail', {
                url: '/itemDetail?itemFrom?id',
                templateUrl: 'catalog/requesterCatalog/views/catalogItem.html',
                controller: 'catalogItemDetailCtrl',
                controllerAs: 'catalogItemDetail'
            })
            .state('catalog.requestercatalog.additionalInfo', {
                url: '/additionalInfo?id',
                templateUrl: 'catalog/requesterCatalog/views/additionalInfo.html',
                controller: 'catalogAdditionalInformationCtrl',
                controllerAs: 'additionalInfo',
                isPageWithoutImage: true
            })
            .state('catalog.requestercatalog.compare', {
                url: '/compare',
                templateUrl: 'catalog/requesterCatalog/views/catalogCompare.html',
                controller: 'catalogCompareCtrl',
                controllerAs: 'catalogCompare'
            })
            .state('catalog.requestercatalog.cart', {
                url: '/cart',
                templateUrl: 'catalog/requesterCatalog/views/catalogCart.html',
                controller: 'catalogCartCtrl',
                controllerAs: 'catalogCart',
                isPageWithoutImage: true
            })
            .state('catalog.requestercatalog.wishlist', {
                url: '/wishlist?selected',
                templateUrl: 'catalog/requesterCatalog/views/wishList.html',
                controller: 'catalogWishlistCtrl',
                controllerAs: 'catalogWishlist',
                isPageWithoutImage: true
            })

            .state('catalog.requestercatalog.advancedSearch', {
                url: '/advancedSearch',
                templateUrl: 'catalog/requesterCatalog/views/advancedSearch.html',
                controller: 'catalogadvancedSearchCtrl',
                controllerAs: 'catalogadvancedSearch',
                isPageWithoutImage: true
            })

            //Catalog Rounting for admincatalog
             .state('catalog.admincatalog', {
                 url: '/admincatalog',
                 templateUrl: 'catalog/adminCatalog/views/index.html',
             })
            .state('catalog.admincatalog.new', {
                url: '/new?mode',
                templateUrl: 'catalog/adminCatalog/views/catalogNew.html',
                controller: 'catalogNewCtrl',
                controllerAs: 'catalogNew'
            })
            .state('catalog.admincatalog.usageInfo', {
                url: '/usageInfo',
                templateUrl: 'catalog/adminCatalog/views/usageInfo.html',
                controller: 'adminCatusageInfoCtrl',
                controllerAs: 'usageInfo'
            })
              .state('catalog.admincatalog.versionHistory', {
                  url: '/versionHistory',
                  templateUrl: 'catalog/adminCatalog/views/versionHistory.html',
                  controller: 'adminCatVerHistoryCtrl',
                  controllerAs: 'versionHistory'
              })
              .state('catalog.admincatalog.reviewChanges', {
                  url: '/reviewChanges',
                  templateUrl: 'catalog/adminCatalog/views/versionHistory.html',
                  controller: 'adminCatVerHistoryCtrl',
                  controllerAs: 'versionHistory'
              })

            .state('catalog.admincatalog.itemMaster', {
                url: '/itemMaster',
                templateUrl: 'catalog/adminCatalog/views/itemMaster.html',
                controller: 'itemMasterCtrl',
                controllerAs: 'itemMaster',
                isPageWithoutImage: true
            })

            .state('catalog.admincatalog.viewLog', {
                url: '/viewLog',
                templateUrl: 'catalog/adminCatalog/views/viewLog.html',
                controller: 'viewLogCtrl',
                controllerAs: 'viewLog',
                isPageWithoutImage: true
            })

            .state('admin', {
                url: '/admin',
                templateUrl: 'shared/admin/views/index.html',
            })
             .state('cc', {
                 url: '/cc',
                 templateUrl: 'shared/admin/views/commonComponents.html',
                 controller: 'commonComponentsCtr',
                 controllerAs: 'commonComponents'
             })
            .state('test', {
                url: '/test',
                templateUrl: 'shared/admin/views/testPopup.html',
            })
             .state('admin.emaillog', {
                 url: '/emailLog',
                 templateUrl: 'shared/admin/views/emaillog.html',
                 controller: 'emailLogCtrl',
                 controllerAs: 'emailLog'
             })
            .state('admin.notificationTab', {
                url: '/notificationTab?notificationView',
                templateUrl: 'shared/admin/views/notification.html',
                controller: 'adminCommonCtrl',
                controllerAs: 'adminCommon'
            })
            .state('admin.notificationView', {
                url: '/notificationView?mode',
                templateUrl: 'shared/admin/views/notificationView.html',
                controller: 'adminCommonCtrl',
                controllerAs: 'adminCommon'
            })
            .state('admin.commonpopup', {
                url: '/uploadDoc',
                templateUrl: 'shared/admin/views/commonpopup.html',
                controller: 'commonPopupCtrl',
                controllerAs: 'commonPopup'
            })
            .state('admin.administration', {
                url: '/administration',
                templateUrl: 'shared/admin/views/administration.html',
            })

            .state('admin.itemMaster', {
                url: '/itemMaster',
                templateUrl: 'shared/admin/itemMaster/views/index.html'
            })

            .state('admin.itemMaster.landing', {
                url: '/landing',
                templateUrl: 'shared/admin/itemMaster/views/landing.html',
                controller: 'adminItemMasterLandingCtrl',
                controllerAs: 'adminItemMasterLanding',

            })

            .state('admin.itemMaster.new', {
                url: '/new',
                templateUrl: 'shared/admin/itemMaster/views/NewItemMaster.html',
                controller: 'adminItemMasterNewCtrl',
                controllerAs: 'adminItemMasterNew'
            })
            .state('admin.itemMaster.additionalInfo', {
                url: '/additionalInfo',
                templateUrl: 'shared/admin/itemMaster/views/additionalInfo.html',
                controller: 'adminItemMasterAdditionalInformationCtrl',
                controllerAs: 'adminItemMasterAdditionalInfo',
                isPageWithoutImage: true
            })
            .state('admin.setupManager', {
                url: '/setupManager',
                templateUrl: 'shared/admin/setupManager/views/index.html'
            })
             .state('admin.setupManager.task', {
                 url: '/task',
                 templateUrl: 'shared/admin/setupManager/views/SetupMgrTask.html',
                 controller: 'setupmgrCtrl',
                 controllerAs: 'setupmgr',
                 isPageWithoutImage: true
             })
            .state('admin.setupManager.approvalMatrix', {
                url: '/approvalMatrix',
                templateUrl: 'shared/admin/setupManager/views/approvalMatrix.html',
                controller: 'approvalMatrixCtrl',
                controllerAs: 'approvalMatrixCtrl',
                isPageWithoutImage: true
            })
            .state('admin.setupManager.new', {
                url: '/new',
                templateUrl: 'shared/admin/setupManager/views/SetupMgrNew.html',
                controller: 'setupmgrCtrl',
                controllerAs: 'setupmgr',
                isPageWithoutImage: true
            })
            .state('admin.setupManager.viewProject', {
                url: '/viewProject?id',
                templateUrl: 'shared/admin/setupManager/views/viewProject.html',
                controller: 'setupmgrCtrl',
                controllerAs: 'setupmgr',
                isPageWithoutImage: true
            })
            .state('admin.setupManager.addFeature', {
                url: '/addFeature?id',
                templateUrl: 'shared/admin/setupManager/views/AddFeature.html',
                controller: 'addFeatureCtrl',
                controllerAs: 'addFeature',
                isPageWithoutImage: true
            })
            .state('admin.setupManager.configureFeature', {
                url: '/configureFeature?id',
                templateUrl: 'shared/admin/setupManager/views/ConfigureFeature.html',
                controller: 'configureFeatureCtrl',
                controllerAs: 'aconfigureFeature',
                isPageWithoutImage: true
            })
            .state('admin.setupManager.implementationProject', {
                url: '/implementationProject',
                templateUrl: 'shared/admin/setupManager/views/implementationProject.html',
                controller: 'implementationProjectCtrl',
                controllerAs: 'implementationProject',
                isPageWithoutImage: true
            })
            .state('admin.ruleEngine', {
                url: '/ruleEngine',
                templateUrl: 'shared/admin/ruleEngine/views/ruleEngine.html',
                controller: 'ruleEngineLandingCtrl',
                controllerAs: 'ruleEngineLanding'//,
                //isPageWithoutImage: true
            })
            .state('admin.ruleSummary', {
                url: '/ruleSummary',
                templateUrl: 'shared/admin/ruleEngine/views/ruleSummary.html',
                controller: 'ruleEngineLandingCtrl',
                controllerAs: 'ruleEngineLanding'//,
                //isPageWithoutImage: true
            })
            .state('admin.massEditeRule', {
                url: '/massEditeRule',
                templateUrl: 'shared/admin/ruleEngine/views/massEditeRule.html',
                controller: 'massEditeRuleCtrl'
            })
             .state('admin.createRule', {
                 url: '/createRule?mode&type',
                 templateUrl: 'shared/admin/ruleEngine/views/createRule.html',
                 controller: 'createNewRuleCtrl',
                 controllerAs: 'createNewRule'
             })
            .state('admin.rulegraph', {
                url: '/rulegraph',
                templateUrl: 'shared/admin/ruleEngine/views/rulegraph.html',
                controller: 'rulegraphCtrl'
            })

            .state('admin.previewRule', {
                url: '/previewRule?type',
                templateUrl: 'shared/admin/ruleEngine/views/previewRule.html',
                controller: 'previewRuleCtrl'
            })

            .state('trackstatus', {
                url: '/trackStatus',
                templateUrl: 'shared/trackStatus/views/index.html',
                controller: 'trackStatusCtrl'
                //controllerAs: ''
            })
            .state('error', {
                url: '/error',
                templateUrl: 'shared/errorPages/views/index.html',
                controller: 'errorPagesCtrl',
                controllerAs: 'erro'
            })
            .state('error.notfound', {
                url: '/404',
                templateUrl: 'shared/errorPages/views/error404.html'
            })
            .state('error.servererror', {
                url: '/servererror',
                templateUrl: 'shared/errorPages/views/serverError.html'
            })
            .state('error.badgateway', {
                url: '/badgateway',
                templateUrl: 'shared/errorPages/views/badGateway.html'
            })
            .state('error.accessdenied', {
                url: '/accessdenied',
                templateUrl: 'shared/errorPages/views/accessDenied.html'
            })

			// Sourcing Starts
			.state('sourcing', {
			    url: '/sourcing',
			    templateUrl: 'sourcing/views/index.html'
			})
			.state('sourcing.rfx', {
			    url: '/rfx',
			    templateUrl: 'sourcing/rfx/views/index.html',
			    controller: 'sourcingRfxCtrl',
			    resolve: {
			                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			                    return $ocLazyLoad.load('shared/resources/svg1/RFx-icons-svg.js'); // Resolve promise and load before view 
			                }]
			           }
			})
			.state('sourcing.rfx.new', {
			    url: '/new?view?referpage',
			    templateUrl: 'sourcing/rfx/views/createRfx.html',
			    controller: 'sourcingRfxNewCtrl'
			})
            .state('sourcing.rfx.supplierEventDownload', {
                url: '/supplierEventDownload',
                templateUrl: 'sourcing/rfx/views/supplierEventDownload.html',
                controller: 'sourcingEventDownloadCtrl'
            })
            .state('sourcing.rfx.buyerEventDownload', {
                url: '/buyerEventDownload',
                templateUrl: 'sourcing/rfx/views/buyerEventDownload.html',
                controller: 'sourcingEventDownloadCtrl'
            })
            .state('sourcing.rfx.eventLog', {
                url: '/eventLog',
                templateUrl: 'sourcing/rfx/views/eventLog.html',
                controller: 'sourcingEventLogCtrl'
            })
            .state('sourcing.rfx.nonAwardSupplier', {
                url: '/nonAwardSupplier',
                templateUrl: 'sourcing/rfx/views/nonAwardSupplier.html',
                controller: 'sourcingNonAwardSupplierCtrl'
            })
			.state('sourcing.rfx.supplierResponseStatus', {
			    url: '/supplierResponseStatus',
			    templateUrl: 'sourcing/rfx/views/supplierResponseStatus.html',
			    controller: 'sourcingContractingTermCtrl'
			})
            .state('sourcing.rfx.qualificationResults', {
                url: '/qualificationResults',
                templateUrl: 'sourcing/rfx/views/qualificationResults.html',
                controller: 'sourcingQualificationResultsCtrl'
            })
            .state('sourcing.rfx.supplierAttachments', {
                url: '/supplierAttachments',
                templateUrl: 'sourcing/rfx/views/supplierAttachmentDownload.html',
                controller: 'sourcingAttachmentCtrl'
            })
            .state('sourcing.rfx.templateList', {
                url: '/templateList?mode',
                templateUrl: 'sourcing/rfx/views/sourcingTemplateLanding.html',
                controller: 'sourcingTemplateLandingCtrl'
            })
			.state('sourcing.rfx.importRepo', {
			    url: '/importRepo',
			    templateUrl: 'sourcing/rfx/views/pricesheetImport.html',
			    controller: 'importRepoCtrl'
			})
			.state('sourcing.rfx.pricesheet', {
			    url: '/pricesheet?mode?title?view',
			    templateUrl: 'sourcing/rfx/views/pricesheet.html',
			    controller: 'priceSheetCtrl'
			})
			.state('sourcing.rfx.importDoc', {
			    url: '/importDoc',
			    templateUrl: 'sourcing/rfx/views/documentImport.html',
			    controller: 'importRepoCtrl'
			})
			.state('sourcing.rfx.document', {
			    url: '/document?mode?title?view',
			    templateUrl: 'sourcing/rfx/views/document.html',
			    controller: 'documentCtrl'
			})
			.state('sourcing.rfx.responseWorkbench', {
			    url: '/responseWorkbench',
			    templateUrl: 'sourcing/rfx/views/responseWorkbench.html',
			    controller: 'responseWorkbenchCtrl'
			})
			.state('sourcing.rfx.responses', {
			    url: '/responses?mode',
			    templateUrl: 'sourcing/rfx/views/responses.html',
			    controller: 'responseCtrl'
			})
			.state('sourcing.rfx.addSupplier', {
			    url: '/addSupplier',
			    templateUrl: 'sourcing/rfx/views/supplierAdd.html',
			    controller: 'sourcingSupplierCtrl'
			})
			.state('sourcing.rfx.addTeamMember', {
			    url: '/addTeamMember?view',
			    templateUrl: 'sourcing/rfx/views/teamMemberAdd.html',
			    controller: 'teamMemberCtrl'
			})
			.state('sourcing.rfx.configureTeamMember', {
			    url: '/configureTeamMember?mode?view',
			    templateUrl: 'sourcing/rfx/views/teamMemberConfigure.html',
			    controller: 'teamMemberCtrl'
			})
			.state('sourcing.rfx.configureSupplier', {
			    url: '/configureSupplier?view',
			    templateUrl: 'sourcing/rfx/views/supplierConfigure.html',
			    controller: 'sourcingSupplierCtrl'
			})
			.state('sourcing.rfx.questionnaireResponses', {
			    url: '/questionnaireResponses',
			    templateUrl: 'sourcing/rfx/views/questionnaireResponses.html',
			    controller: 'questionnaireResponseCtrl'
			})
			.state('sourcing.rfx.scoringAnalysis', {
			    url: '/scoringAnalysis',
			    templateUrl: 'sourcing/rfx/views/scoringAnalysis.html',
			    controller: 'scoringAnalysisCtrl'
			})
			.state('sourcing.rfx.scoreCardSupplierDetails', {
			    url: '/scoreCardSupplierDetails',
			    templateUrl: 'sourcing/rfx/views/scoreCardSupplierDetails.html',
			    controller: 'scoringAnalysisCtrl'
			})
			.state('sourcing.rfx.manageScorecard', {
			    url: '/manageScorecard',
			    templateUrl: 'sourcing/rfx/views/manageScorecard.html',
			    controller: 'scoringAnalysisCtrl'
			})
			.state('sourcing.rfx.awardScenario', {
			    url: '/awardScenario',
			    templateUrl: 'sourcing/rfx/views/scoringAnalysisAwardScenario.html',
			    controller: 'awardScenarioCtrl'
			})
			.state('sourcing.rfx.awardScenarioDetails', {
			    url: '/awardScenarioDetails',
			    templateUrl: 'sourcing/rfx/views/scoringAnalysisAwardScenarioDetails.html',
			    controller: 'awardScenarioCtrl'
			})
			.state('sourcing.rfx.awarding', {
			    url: '/awarding',
			    templateUrl: 'sourcing/rfx/views/awarding.html',
			    controller: 'awardingCtrl'
			})
			.state('sourcing.rfx.awardSummaryDetails', {
			    url: '/awardSummaryDetails',
			    templateUrl: 'sourcing/rfx/views/awardSummaryDetails.html',
			    controller: 'rfxAwardSummaryCtrl'
			})
            .state('sourcing.rfx.setting', {
                url: '/setting',
                templateUrl: 'sourcing/rfx/views/rfxSetting.html',
                controller: 'rfxSettingCtrl'
            })
			// Sourcing Ends

			// Spend
			.state('spend', {
			    url: '/spend',
			    templateUrl: 'spend/views/index.html',
			    resolve: {
			        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			            return $ocLazyLoad.load('shared/resources/svg1/Spend-icons-svg.js'); // Resolve promise and load before view 
			        }]
			    }
			})
			.state('spend.dcc', {
			    url: '/dcc',
			    templateUrl: 'spend/dcc/views/index.html',
			})
            .state('spend.dataProcessing', {
                url: '/dataProcessing',
                templateUrl: 'spend/dataProcessing/views/index.html',
                controller: 'dataProcessingCtrl'
            })
			.state('spend.dcc.admin', {
			    url: '/admin',
			    templateUrl: 'spend/dcc/views/userInterface.html',
			    controller: 'userInterfaceCtrl'
			})
			.state('spend.mapping', {
			    url: '/mapping',
			    templateUrl: 'spend/mapping/views/index.html',
			})
			.state('spend.mapping.index', {
			    url: '/index',
			    templateUrl: 'spend/mapping/views/mapping.html',
			    controller: 'spendMappingCtrl'
			})
            .state('spend.mapping.integration', {
                url: '/integration',
                templateUrl: 'spend/mapping/views/integration.html',
                controller: 'spendIntegrationCtrl'
            })
            .state('spend.mapping.regionMap', {
                url: '/regionMap',
                templateUrl: 'spend/mapping/views/regionMap.html',
                controller: 'spendRegionMapCtrl'
            })
            .state('spend.profile', {
                url: '/profile',
                templateUrl: 'spend/profile/views/index.html',
                controller: 'spendProfileCtrl',
                isPageWithoutImage: true
            })

			.state('contract', {
			    url: '/contract',
			    templateUrl: 'contract/views/index.html',
			    resolve: {
			        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			            return $ocLazyLoad.load('shared/resources/svg1/Contract-icons-svg.js'); // Resolve promise and load before view 
			        }]
			    }
			})
			.state('contract.new', {
			    url: '/new?mode?amendmentStatus',
			    templateUrl: 'contract/views/contractNew.html',
			    controller: 'contractNewCtrl',
			    resolve: {
			        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
			            return $ocLazyLoad.load('shared/resources/svg1/Projects-icons-svg.js'); // Resolve promise and load before view 
			        }]
			    }
			})

            .state('contract.auditTrail', {
                url: '/auditTrail',
                templateUrl: 'contract/views/auditTrail.html',
                controller: 'auditTrailCtrl'
            })

             .state('contract.viewHistory', {
                 url: '/viewHistory',
                 templateUrl: 'contract/views/viewHistory.html',
                 controller: 'viewHistoryCtrl',
                 isPageWithoutImage: true
             })

            .state('contract.clientinfo', {
                url: '/clientinfo?mode',
                templateUrl: 'contract/views/contractClientInfo.html',
                controller: 'contractNewCtrl'
            })


            .state('contract.mutual', {
                url: '/mutual',
                templateUrl: 'contract/views/contractRequestmutual.html',
                controller: 'contractRequestCtrl'
            })

            .state('contract.outgoing', {
                url: '/outgoing',
                templateUrl: 'contract/views/contractRequestOutgoing.html',
                controller: 'contractRequestCtrl'
            })

            .state('contract.receiving', {
                url: '/receiving',
                templateUrl: 'contract/views/contractRequestReceiving.html',
                controller: 'contractRequestCtrl'
            })


            .state('contract.request', {
                url: '/request',
                templateUrl: 'contract/views/contractRequest.html',
                controller: 'contractRequestCtrl'
            })
			.state('contract.upload', {
			    url: '/upload',
			    templateUrl: 'contract/views/upload.html',
			    controller: 'uploadCtrl'
			})
			.state('contract.language', {
			    url: '/language?mode?type?pagefor',
			    templateUrl: 'contract/views/draftContractLanguage.html',
			    controller: 'contractLanguageCtrl'
			})
			.state('contract.compare', {
			    url: '/compare?mode',
			    templateUrl: 'contract/views/contractCompareVersion.html',
			    controller: 'contracCompareVersionCtrl'
			})
			.state('contract.template', {
			    url: '/template',
			    templateUrl: 'contract/views/contractLanguageTemplate.html',
			    controller: 'contractLanguageTemplateCtrl'
			})
			.state('contract.previewPDF', {
			    url: '/previewPDF',
			    templateUrl: 'contract/views/contractPreviewPDF.html',
			    controller: 'contractLanguagePreviewPdfCtrl'
			})
			.state('contract.templateList', {
			    url: '/templateList?mode?pagefor',
			    templateUrl: 'contract/views/contractTemplateLanding.html',
			    controller: 'contractTemplateLandingCtrl'
			})
			.state('contract.summary', {
			    url: '/summary',
			    templateUrl: 'contract/views/contractSummaryPageNew.html',
			    controller: 'contractSummaryCtrl'
			})
            .state('contract.signedLanguagePreview', {
                url: '/signedLanguagePreview',
                templateUrl: 'contract/views/contractLanguageSignedPreview.html',
                controller: 'signedContractLangCtrl'
            })
            .state('contract.wizard', {
                url: '/wizard',
                templateUrl: 'contract/views/contractWizard.html',
                controller: 'contractWizardCtrl'
            })

            .state('contract.manageLine', {
                url: '/manageLine?mode',
                templateUrl: 'contract/views/manageLine.html',
                controller: 'manageLineCtrl'

            })

                .state('contract.approval', {
                    url: '/approval?mode',
                    templateUrl: 'shared/approval/views/approvalPage.html',
                    controller: 'p2pApprovalPageCtrl',
                    controllerAs: 'p2pApprovalPage',
                    isPageWithoutImage: true
                })

    	//supplier Routing
        .state('supplier', {
            url: '/supplier',
            templateUrl: 'supplierManagement/views/index.html',
            controller: 'supplierCtrl',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('shared/resources/svg1/Supplier-icons-svg.js'); // Resolve promise and load before view 
                }]
            }
        })
		.state('supplier.new', {
		    url: '/new',
		    templateUrl: 'shared/quickAddSupplier/views/supplierNew.html',
		    controller: 'supplierNewCtrl'
		})
        .state('supplier.profile', {
            url: '/profile?pagefor?type?status',
            templateUrl: 'supplierManagement/profile/views/index.html',
            controller: 'supplierProfileCtrl'
        })
		.state('supplier.prf', {
		    url: '/prf',
		    templateUrl: 'supplierManagement/prf/views/index.html',
		    controller: 'supplierPrfCtrl'
		})
		.state('supplier.erpMapping', {
		    url: '/erpMapping',
		    templateUrl: 'supplierManagement/erpmapping/views/index.html',
		    controller: 'supplierErpmappingCtrl'
		})
        .state('supplier.form', {
            url: '/form?mode',
            templateUrl: 'supplierManagement/form/views/form.html',
            controller: 'supplierFormCtrl'
        })
        .state('supplier.addSupplier', {
            url: '/addSupplier?pageFor',
            templateUrl: 'supplierManagement/shared/views/addSupplier.html',
            controller: 'addSupplierCtrl'
        })
        .state('supplier.prfResponses', {
            url: '/prfResponses?pageFor?name',
            templateUrl: 'supplierManagement/form/views/prfResponses.html',
            controller: 'supplierPRFResponseCtrl',
            isPageWithoutImage: true
        })
		.state('supplier.secondtiersupplier', {
		    url: '/secondtiersupplier',
		    templateUrl: 'supplierManagement/secondTierSupplier/views/index.html',
		    controller: 'supplierSecondtiersuppCtrl'
		})
        //.state('certificate', {
        //    url: '/certificate',
        //    templateUrl: 'shared/certificate/views/index.html',
        //    controller: 'certificateCtrl'
        //})
        //.state('diversity', {
        //    url: '/diversitystatus',
        //    templateUrl: 'shared/certificate/views/index.html',
        //    controller: 'certificateCtrl'
        //})
        .state('changeHistory', {
            url: '/changeHistory',
            template: "<div ui-view class='fullHeight'></div>"
        })
        .state('changeHistory.supplier', {
            url: '/supplier',
            templateUrl: 'supplierManagement/changeHistory/views/index.html',
            controller: 'supplierChangeHistoryCtrl'
        })
        // change history questionnaire
        .state('changeHistory.questionnaire', {
            url: '/questionnaire',
            templateUrl: 'supplierManagement/changeHistory/questionnaire/views/index.html'
        })
        .state('changeHistory.questionnaire.create', {
            url: '/create?mode?id?type',
            templateUrl: 'supplierManagement/changeHistory/questionnaire/views/questionnaire.html',
            controller: 'questionnaireCtrlCH'
        })
        .state('changeHistory.questionnaire.importRepo', {
            url: '/importRepo',
            templateUrl: 'supplierManagement/changeHistory/questionnaire/views/questionnaireImportRepo.html',
            controller: 'questionnaireImportRepoCtrlCH'
        })

    	//Questionnaire Routing
        .state('questionnaire', {
            url: '/questionnaire?pageFor?view',
            templateUrl: 'shared/questionnaire/views/index.html'
        })
        .state('questionnaire.create', {
            url: '/create?mode?id',
            templateUrl: 'shared/questionnaire/views/questionnaire.html',
            controller: 'questionnaireCtrl'
        })
        .state('questionnaire.importRepo', {
            url: '/importRepo',
            templateUrl: 'shared/questionnaire/views/questionnaireImportRepo.html',
            controller: 'questionnaireImportRepoCtrl'
        })
        .state('questionnaire.compareResponse', {
            url: '/compareResponse',
            templateUrl: 'shared/questionnaire/views/questionnaireCompareResponses.html',
            controller: 'questionnairecompareResponseCtrl'
        })

        //supplier scorecard
        .state('supplier.scorecard', {
            url: '/scorecard?mode?finalized',
            templateUrl: 'supplierManagement/scorecard/views/index.html',
            controller: 'supplierScorecardCtrl',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('shared/resources/svg1/Scorecard-icons-svg.js'); // Resolve promise and load before view 
                }]
            }
        })
        .state('supplier.scorecardResponse', {
            url: '/scorecardResponse?mode?for?pageFor',
            templateUrl: 'supplierManagement/scorecard/views/scorecardViewResponse.html',
            controller: 'scorecardResponseCtrl',
            isPageWithoutImage: true,
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('shared/resources/svg1/Scorecard-icons-svg.js'); // Resolve promise and load before view 
                }]
            }
        })
        .state('supplier.scorecardSummary', {
            url: '/scorecardSummary',
            templateUrl: 'supplierManagement/scorecard/views/scorecardSummary.html',
            controller: 'scorecardSummaryCtrl',
            isPageWithoutImage: true,
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('shared/resources/svg1/Scorecard-icons-svg.js'); // Resolve promise and load before view 
                }]
            }
        })
        .state('supplier.kpisheet', {
            url: '/kpisheet',
            templateUrl: 'supplierManagement/scorecard/views/kpiSheet.html',
            controller: 'kpisheetCtrl'
        })
        //STATE FOR TREE CATEGORY COMPONANT
        .state('smartHierarchyTest', {
            url: '/smartHierarchy',
            templateUrl: 'shared/smartHierarchyRoute/views/index.html',
            controller: 'smartHierarchyController',
            controllerAs: 'platform'
        })

	    //POC
        .state('poc', {
            url: '/poc',
            templateUrl: 'poc/views/index.html'
        })
        .state('poc.datetimeformat', {
            url: '/datetimeformat',
            templateUrl: 'poc/datetimeformat/views/datetimeformat.html',
            controller: 'datetimeformatCtrl',
        })

        // SMARTBUY <ui-view></ui-view>
        .state('smartbuy', {
            url: '/smartbuy',
            templateUrl: 'smartBuy/index.html',
            controller: 'smartBuyController',
            resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('shared/resources/svg1/Smart_Buy-icons-svg.js'); // Resolve promise and load before view 
                        }]
                    }
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
