(function(angular) {
    'use strict';

    angular
        .module('SMART2')
        /**
         * @ngdoc service
         * @name SMART2.config
         * @description
         * Config of SMART2 project. Among other configurations, it also contains the routing configuration.
         */
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', 'APPCONSTANTS', routeConfigFunc]);

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
    function routeConfigFunc($stateProvider, $urlRouterProvider, $translateProvider, APPCONSTANTS) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        //PLATFORM ROUTING
            .state('platform', {
            	url: '/',
            	templateUrl: 'shared/home/views/index.html',
            	controller: 'platformCtrl',
            	controllerAs: 'platform',
            	onEnter: function ($state) {
            		APPCONSTANTS.userPreferences.LastURL = "#/";
            		// TODO: Send last page to server on logout
            		// TODO: Update below line so that it points to 'APPCONSTANTS.userPreferences.lastURL' (or any) variable instead of hard-coded URL
            		window.location.href = APPCONSTANTS.userPreferences.LastURL; //"http://127.0.0.1:81/#/workQueue"; //APPCONSTANTS.userPreferences.lastURL
            	}
            })
            .state('user', {
            	url: '/user',
            	templateUrl: 'shared/user/views/index.html',
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
            .state('login', {
            	url: '/login',
            	templateUrl: 'shared/login/views/index.html',
            	controller: 'loginCtrl',
            	controllerAs: 'login'
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
            	controller: "myTaskCtrl"//,
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
            	//resolve: {
            	//    resolveObj: function($q) {
            	//        var promise = $q.defer();
            	//        console.log(APPCONSTANTS.userPreferences.URLs.ContentURL + "smartcontent/distribution/workspace.dist/shared/landingPage/landingPage.js");
            	//        $.getScript(APPCONSTANTS.userPreferences.URLs.ContentURL + "smartcontent/distribution/workspace.dist/shared/landingPage/landingPage.js")
            	//        .done(function(script, textStatus) {
            	//            console.log(textStatus);
            	//            promise.resolve(arguments);
            	//        })
            	//        .fail(function(jqxhr, settings, exception) {
            	//            console.log(arguments);
            	//            promise.reject(arguments);
            	//        });
            	//    }
            	//}
            })
//TODO: check resolve
            .state('landing', {
            	url: '/landing',
            	templateUrl: 'shared/landingPage/views/index.html',
            	controller: 'landingPageCtrl',
            	controllerAs: 'landingPage' //,
            	//resolve: {
            	//    resolveObj: function($q) {
            	//        var promise = $q.defer();
            	//        //http://localhost/MtStorage/smartcontent/distribution/workspace.dist/shared/landingPage/landingPage.js?ver=1.0
            	//        console.log(APPCONSTANTS.userPreferences.URLs.ContentURL + "smartcontent/distribution/workspace.dist/shared/landingPage/landingPage.js");
            	//        $.getScript(APPCONSTANTS.userPreferences.URLs.ContentURL + "smartcontent/distribution/workspace.dist/shared/landingPage/landingPage.js")
            	//        .done(function(script, textStatus) {
            	//            // $.getScript(APPCONSTANTS.userPreferences.URLs.ContentURL + "/smartcontent/distribution/workspace.dist/shared/landingPage/landingPageTemplate.js")
            	//            // .done(function(script, textStatus) {
            	//            //     console.log(textStatus);
            	//            //     promise.resolve(arguments);
            	//            // })
            	//            // .fail(function(jqxhr, settings, exception) {
            	//            //     console.log(arguments);
            	//            //     promise.reject(arguments);
            	//            // });
            	//            console.log(textStatus);
            	//            promise.resolve(arguments);
            	//        })
            	//        .fail(function(jqxhr, settings, exception) {
            	//            console.log(arguments);
            	//            promise.reject(arguments);
            	//        });
            	//    }
            	//}
            })
            .state('expandedlanding', {
            	url: '/landingmax',
            	templateUrl: 'shared/myTask/views/expandedLandingView.html',
            	controller: 'landingPageCtrl',
            	controllerAs: 'landingPage'
            })

        //P2P ROUTING
        .state('p2p', {
        	url: '/p2p',
        	templateUrl: 'p2p/shared/home/views/index.html',
        	//controller: 'p2pCtrl',
        	controllerAs: 'p2p'
        })
            .state('p2p.inv', {
            	url: '/inv',
            	templateUrl: 'p2p/inv/views/index.html',
            	controller: 'p2pInvCtrl',
            	controllerAs: 'p2pInv'
            })
            .state('p2p.inv.excel', {
            	url: '/excel',
            	templateUrl: 'p2p/inv/views/p2pInvoiceExcel.html',
            	controller: 'p2pInvExcelCtrl',
            	controllerAs: 'p2pInvExcelCtrl'
            })
            .state('p2p.inv.create', {
            	url: '/create',
            	templateUrl: 'p2p/inv/views/p2pInvoiceBasicDetails.html',
            	controller: 'p2pInvBasicDetailsCtrl',
            	controllerAs: 'p2pInvBasicDetailsCtrl'
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
            .state('p2p.ir', {
            	url: '/ir',
            	templateUrl: 'p2p/ir/views/index.html',
            	controller: 'p2pIRCtrl',
            	controllerAs: 'p2pIR'
            })
            .state('p2p.ir.templatePrint', {
            	url: '/templatePrint',
            	templateUrl: 'p2p/ir/views/irTemplatePrint.html',
            	controller: 'p2pIRtemplatePrintCtrl',
            	controllerAs: 'p2pIRtemplatePrint'
            })

        .state('p2p.ir.new', {
        	url: '/new',
        	templateUrl: 'p2p/ir/views/IRNew.html',
        	controller: 'p2pIRCtrl',
        	controllerAs: 'p2pIR'
        })

        .state('p2p.ir.basicDetails', {
        	url: '/basicDetails',
        	templateUrl: 'p2p/ir/views/p2pIRBasicDetails.html',
        	controller: 'p2pIRBasicDetailsCtrl',
        	controllerAs: 'p2pIR'
        })

        .state('p2p.order', {
        	url: '/order',
        	templateUrl: 'p2p/order/views/index.html',
        	//controller: 'p2pOrderCtrl',
        	//controllerAs: 'p2pOrder'
        })
            .state('p2p.order.new', {
            	url: '/new',
            	templateUrl: 'p2p/order/views/p2pOrderNew.html',
            	controller: 'p2pOrderNewCtrl',
            	controllerAs: 'p2pOrder'
            })
            .state('p2p.order.view', {
            	url: '/view',
            	templateUrl: 'p2p/order/views/viewChange.html',
            	controller: 'viewChangeCtrl',
            	controllerAs: 'p2pOrder'
            })
            .state('p2p.order.viewPreview', {
            	url: '/viewPreview',
            	templateUrl: 'p2p/order/views/viewChangePreview.html',
            	controller: 'viewChangeCtrl',
            	controllerAs: 'p2pOrder'
            })
            .state('p2p.order.templatePrint', {
            	url: '/templatePrint',
            	templateUrl: 'p2p/order/views/orderTemplatePrint.html',
            	controller: 'viewChangeCtrl',
            	controllerAs: 'p2pOrder'
            })
            .state('p2p.req', {
            	url: '/req',
            	templateUrl: 'p2p/req/views/index.html',
            	controller: 'p2pReqCtrl',
            	controllerAs: 'p2pReq'
            })
            .state('p2p.req.new', {
            	url: '/new',
            	templateUrl: 'p2p/req/views/p2pReqNew.html',
            	controller: 'p2pReqNewCtrl',
            	controllerAs: 'p2pReqNew'
            })
            .state('p2p.req.preview', {
            	url: '/preview',
            	templateUrl: 'p2p/req/views/p2pReqPreview.html',
            	controller: 'p2pReqPreviewCtrl',
            	controllerAs: 'p2pReqPreview'
            })
            .state('p2p.req.landing', {
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
            .state('p2p.creditMemo', {
            	url: '/creditmemo',
            	templateUrl: 'p2p/creditMemo/views/index.html',
            	controller: 'p2pCreditMemoCtrl',
            	controllerAs: 'p2pCreditMemo'
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
        	controller: 'p2pRNoteCtrl',
        	controllerAs: 'p2pRnote'
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
            //Catalog Rounting
            .state('catalog', {
            	url: '/catalog',
            	templateUrl: 'catalog/views/index.html',
            	controller: 'catalogCtrl',
            	controllerAs: 'catalog'
            })
            .state('catalog.search', {
            	url: '/search',
            	templateUrl: 'catalog/views/catalogSearch.html',
            	controller: 'catalogSearchCtrl',
            	controllerAs: 'catalogSearch'
            })
            .state('catalog.landing', {
            	url: '/landing',
            	templateUrl: 'catalog/views/catalogLanding.html',
            	controller: 'catalogLandingCtrl',
            	controllerAs: 'catalogLanding'
            })
            .state('catalog.itemDetail', {
            	url: '/itemDetail',
            	templateUrl: 'catalog/views/catalogItemDetail.html',
            	controller: 'catalogItemDetailCtrl',
            	controllerAs: 'catalogItemDetail'
            })
            .state('catalog.compare', {
            	url: '/compare',
            	templateUrl: 'catalog/views/catalogCompare.html',
            	controller: 'catalogCompareCtrl',
            	controllerAs: 'catalogCompare'
            })
            .state('catalog.cart', {
            	url: '/cart',
            	templateUrl: 'catalog/views/catalogCart.html',
            	controller: 'catalogCartCtrl',
            	controllerAs: 'catalogCart'
            })
            .state('catalog.wishlist', {
            	url: '/wishlist',
            	templateUrl: 'catalog/views/catalogWishlist.html',
            	controller: 'catalogWishlistCtrl',
            	controllerAs: 'catalogWishlist'
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
            });
			


    };
})(angular);
