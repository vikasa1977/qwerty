(function (angular) {
    'use strict';
    angular.module('SMART2')
        /**
         * @ngdoc controller
         * @name SMART2.controller:platformCtrl
         * @description
         * Controller of P2P Request.
         */

        .controller('searchBoxAutoSuggestedCtrl', ['$scope', 'routeSvc', 'requestClicked', '$translate', '$timeout', '$state', 'redirectState', searchBoxAutoSuggestedFunc])
        .controller('platformCtrl', ['$scope', '$rootScope', '$q', 'routeSvc', '$translate', '$timeout', '$sce', '$state', 'storeService', 'notification', 'ngIntroService', platformCtrlFunc]) // '$analytics', 'logSvc', platformCtrlFunc]);
        .service('redirectState', [function () {
            var timer = null;
            return {
                setState: function (a) {
                    this.state = a;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        this.state = '';
                    }.bind(this), 2000);
                }
            };
        }]);

    function searchBoxAutoSuggestedFunc($scope, routeSvc, requestClicked, $translate, $timeout, $state, redirectState) {
        var isRequestClicked = false;


        $scope.clearSearch = function (e) {
            //$scope.clearSearchField = '';
            angular.element('.clearSearchField input').val('');
            console.log('dxf');
        }


        //autocomplete
        //$scope.autoCompleteData = { "ItemId": 28360, "ItemName": "Laptop in Catalog"}; //default data set in auto suggest
        $scope.onChangeAutoSuggest = function (e) {
            if (e.type == 'focus') {
                $scope.options = [
                    {
                        "ItemId": "",
                        "ItemName": "Requisitions"
                    }, {
                        "ItemId": "",
                        "ItemName": "RFX"
                    }, {
                        "ItemId": "",
                        "ItemName": "Contract"
                    },
                    {
                        "ItemId": "",
                        "ItemName": "Supplier"
                    },
                    {
                        "ItemId": "",
                        "ItemName": "Invoice"
                    },
                    {
                        "ItemId": "",
                        "ItemName": "Catalog"
                    }
                ];
            }
            else {
                $scope.options = [];
                if (e.data[0].value.trim().length > 2) {
                    $scope.options = [
                        {
                            "ItemId": "109 in Contracts (22 results found)",
                            "ItemName": "Contract",

                        }, {
                            "ItemId": "1 in Invoice (81 results found)",
                            "ItemName": "Contract"
                        }, {
                            "ItemId": "11 in Supplier (2 results found)",
                            "ItemName": "Cont"
                        }, {
                            "ItemId": "10 in Order (1 results found)",
                            "ItemName": "Cont"
                        }, {
                            "ItemId": "in Catalog",
                            "ItemName": "Cont"
                        },
                        {
                            "ItemId": "in Contracts (22 results found)",
                            "ItemName": "Laptop",
                            "ItemLandingPage" : "Contracts"
                        },
                        {
                            "ItemId": "in Invoice (81 results found)",
                            "ItemName": "Laptop",
                            "ItemLandingPage": "Invoice"
                        },
                         {
                             "ItemId": "in Supplier (2 results found)",
                             "ItemName": "Laptop",
                             "ItemLandingPage": "Supplier"
                         },
                        {
                            "ItemId": "in Order (1 results found)",
                            "ItemName": "Laptop",
                            "ItemLandingPage": "Order"
                        },
                        {
                            "ItemId": "in Catalog",
                            "ItemName": "Laptop",
                            "ItemLandingPage": "inCatalog"
                        },
                        {
                            "ItemId": "in Reports",
                            "ItemName": "Laptop",
                            "ItemLandingPage": "inReports"
                        },
                        {
                            "ItemId": "",
                            "ItemName": "Notebook"
                        },
                        {
                            "ItemId": "in IT/Telecom",
                            "ItemName": "Desktop "
                        },
                        {
                            "ItemId": "109 in Requisitions (22 results found)",
                            "ItemName": "Requisitions",

                        }, {
                            "ItemId": "1 in Invoice (81 results found)",
                            "ItemName": "Requisition"
                        }, {
                            "ItemId": "11 in Supplier (2 results found)",
                            "ItemName": "Req"
                        },
                        {
                            "ItemId": "10 in Catalog (1 results found)",
                            "ItemName": "Catalog"
                        },
                          {
                            "ItemId": "1 in Invoice (81 results found)",
                            "ItemName": "Catalogs"
                }, {
                            "ItemId": "11 in Supplier (2 results found)",
                            "ItemName": "Cat"
        },

                    ];
                    $scope.isClear = !$scope.isClear;
                }
            }
        };


        $scope.clearfunction = function () {
            console.log($scope.isClear);
            $scope.autoCompleteData = "";
            $scope.isClear = false;
        }

        $scope.showSearch = false;
        $scope.showSearchFixed = false;

        if (redirectState.state != 'home') {
            if (requestClicked.getProperty()) {
                $scope.showSearch = true;
                $scope.showSearchFixed = true;
            }
        }
        $scope.$watch(function () {
            return requestClicked.getProperty();
        }, function (newVal, oldVal) {

            if (newVal !== oldVal) {
                $scope.showSearch = newVal;
                $scope.showSearchFixed = newVal;
                if (newVal) {
                    $scope.showSearch = newVal;
                    $scope.showSearchFixed = newVal;
                }
            }
        });

        $scope.onSelect = function (autoCompleteData) {
                
            if (autoCompleteData.ItemName == "Requisitions") {
                $state.go('expandedLandingList', { doctype: 'requisition' });
            }
            else if (autoCompleteData.ItemName == "RFX") {
                $state.go('expandedLandingList', { doctype: 'RFX' });
            }
            else if (autoCompleteData.ItemName == "Supplier") {
                $state.go('expandedLandingList', { doctype: 'supplier' });
            }
            else if (autoCompleteData.ItemName == "Contract") {
                $state.go('expandedLandingList', { doctype: 'contract' });
            }

            else if (autoCompleteData.ItemName == "Invoice") {
                $state.go('expandedLandingList', { doctype: 'invoiceReconciliation' });
            }
            else if (autoCompleteData.ItemName == "Contract 109 in Contracts (22 results found)") {
                $state.go('expandedLandingList', { doctype: 'contract' });
            }
            else if (autoCompleteData.ItemName == "Catalog") {
                $state.go('catalog.requestercatalog.landing');
            }
            else if (autoCompleteData.ItemName == "Cont") {
                $state.go('catalog.requestercatalog.search');
            }
            else if (autoCompleteData.ItemName == "Laptop" && autoCompleteData.ItemLandingPage == "Supplier") {
                $state.go('expandedLandingList', { doctype: 'supplier' });
            }
            else if (autoCompleteData.ItemName == "Laptop" && autoCompleteData.ItemLandingPage == "Contracts") {
                $state.go('expandedLandingList', { doctype: 'contract' });
            }
            else if (autoCompleteData.ItemName == "Laptop" && autoCompleteData.ItemLandingPage == "Invoice") {
                $state.go('expandedLandingList', { doctype: 'invoiceReconciliation' });
            }
            else if (autoCompleteData.ItemName == "Laptop" && autoCompleteData.ItemLandingPage == "inCatalog") {
                $state.go('catalog.requestercatalog.search');
            }
            else if (autoCompleteData.ItemName == "Laptop" && autoCompleteData.ItemLandingPage == "Order") {
                $state.go('expandedLandingList', { doctype: 'order' });
            }
            else if (autoCompleteData.ItemName == "Laptop" && autoCompleteData.ItemLandingPage == "inReports") {
                return false;
            }
            else
                $state.go('searchCard');
        }

        /* SORT BY - HEADER SEARCH INTRACTION NEED TO CHANGE ITS WORKING */
        $scope.showSearchHeader = function () {
            //$scope.mysearchHeight = { width: '1000px' };
            this.isActiveHeader = true;
            this.focusSearchHeader = true;
            this.hideCloseHeader = true;
        }
        $scope.hideSearchHeader = function () {
            //$scope.mysearchHeight = { width: '100%' };
            this.isActiveHeader = false;
            this.focusSearchHeader = false;
            this.hideCloseHeader = false;
        }
        /* SORT BY - HEADER SEARCH INTRACTION ENDS HERE */


        //searchfield
        $scope.searchField = function () {
            $scope.inputFocused = true;
        }

        //on enter press
        $scope.onEnter = function (autoCompleteData) {
            $state.go('searchCard');
            //   routeSvc.goTo('#searchCard');
        }

        /* on load focus on search field */
        $timeout(callAtTimeout, 1000);
        function callAtTimeout() {
            $scope.focusSearch = true;
        }
    }

  
    /**
     * @ngdoc method
     * @name platformCtrlFunc
     * @methodOf SMART2.controller:platformCtrl
     * @description
     * The method of the platformCtrl controller.
     *
     * @param {Object} $scope Scope of the controller
     */
    function platformCtrlFunc($scope, $rootScope, $q, routeSvc, $translate, $timeout, $sce, $state, storeService, notification, ngIntroService) {
        $scope.fabbclicked = function (e) {
            $scope.isAciveFab = !$scope.isAciveFab;
            e.stopPropagation();
        }

        $scope.showProceedBtn = true;
        $scope.hideConcentPopUp = true;

        $scope.onChange = function (isAgreed) {
            if (isAgreed == true) {
                $scope.showProceedBtn = false;
                $scope.hideConcentPopUp = true;
            } else {
                $scope.showProceedBtn = true;
            }
        };

        $scope.goToLogin = function (isAgreed) {
            $state.go('login');
        };

        // if ($scope.hideConcentPopUp) {
        //     $scope.userConcentPopUp = true;
        // }
        $scope.hideFabButton = function () {
            $scope.isAciveFab = false;
        }
        $scope.isAciveFab = false;
        var statef = $state.params.statefrom;
        // if (statef == 'login' && $rootScope.showWelcomeScreen) {
        //     $timeout(function () {
        //         $rootScope.$broadcast('callOverlayWithParapater', "login");
        //     });
        //     $rootScope.showWelcomeScreen = false;
        // }

        $scope.isCreationActive = false;
        $scope.animateDelayFlag = false;
        $scope.animationRemoved = false;
        $scope.isCubeActive = false;
        
        $scope.callCreationPhase = function (configuration, callback) {
           
            $scope.creationPhaseConfiguration = configuration.options;
            $scope.creationPhaseConfiguration[0].focus = true;
            $scope.isCreationActive = true;
            $scope.creationMsg = configuration.msg;
            $scope.animationRemoved = true;
            $scope.animateDelayFlag = true;
            $timeout(function () {
                $scope.animationRemoved = false;
            });
            $scope.closeCreationPhase = function (result, isDisable, e) {
                e.stopPropagation();
                if (isDisable === true) {
                    return;
                }
                result != "cancel" ? callback(result) : "";
                $scope.animateDelayFlag = false;
                $timeout(function () {
                    $scope.isCreationActive = false;
                }, 500);
            }
            $scope.onFocusOutOverlay = function (e) {
                //$scope.creationPhaseConfiguration[0].focus = true;
                //console.log(e.target)
            }
        }

        $scope.callCubeCreationPhase = function (callback) {
            // $scope.creationPhaseConfiguration = configuration.options;
            $scope.cubeletList = [{
                    'name': 'Spend',
                    'id': 1
                },
                {
                    'name': 'Sourcing',
                    'id': 2
                },
                {
                    'name': 'Contracts',
                    'id': 3
                },
                {
                    'name': 'Suppliers',
                    'id': 4
                },
                {
                    'name': 'Projects',
                    'id': 5
                },
                {
                    'name': 'P2P/Procurement',
                    'id': 6
                }];
            $scope.selectedCube = {};
            $scope.isCubeActive = true;
            $scope.isCubeProceedEnabled = false
            // $scope.creationMsg = configuration.msg;
            $scope.animationRemoved = true;
            $scope.animateDelayFlag = true;
            $timeout(function () {
                $scope.animationRemoved = false;
            });
            $scope.closeCubeCreationPhase = function (result, isDisable, e) {
                e.stopPropagation();
                if (isDisable === true) {
                    return;
                }
                result != "cancel" ? callback(result) : "";
                $scope.animateDelayFlag = false;
                $timeout(function () {
                    $scope.isCubeActive = false;
                }, 500);
            }
            $scope.enableCubeProceed = function () {
                $scope.isCubeProceedEnabled = true;
                $scope.$digest();
            }
            $scope.routeToReport = function () {
                location.href = 'index_reports.html#/analytics/new';
            }
        }

        $scope.uploadTitle = 'UPLOAD';
        $scope.attachFlag = false;
        $scope.uploadFail = false;
        $scope.attachmentCall = function (e) {
            $scope.attachFlag = true;
            $timeout(function () {
                $scope.uploadFail = true;
            }, 1500);

        };
        $scope.retryCall = function () {
            $scope.uploadFail = false;
        }
        $scope.closeAttachment = function () {
            $scope.attachFlag = false;
            $scope.uploadFail = false;
        }
        $scope.uploadTitle = "ADD ATTACHMENTS"
        $scope.attachmentMsg = "Supported file formats: doc, docs,pdf, jpg, jpeg, png, tiff.\
        <br />Limited to file(s) of 10MB each.\
	    <br /> Maximum 5 files can be uploaded.";
        $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
        $scope.attchmentMsg = $scope.attachmentMsg;
        $scope.attachFlag = false;
        $scope.attachmentList = [
			{
			    name: "AttachmentOne.xls",
			    status: "fail",
			    referenceName: "Add Name",
			    isShow: true,
			    actionIconDelete: false
			},
			{
			    name: "AttachmentTwo.xls",
			    status: "fail",
			    referenceName: "Add Name",
			    isShow: true,
			    actionIconDelete: false
			},
			{
			    name: "AttachmentThree.xls",
			    status: "fail",
			    referenceName: "Add Name",
			    isShow: true,
			    actionIconDelete: false
			},
			{
			    name: "AttachmentFive.xls",
			    status: "success",
			    referenceName: "Add Name",
			    isShow: true,
			    actionIconDelete: true
			}
        ];
        $scope.attachmentCall = function (e) {
            $scope.attachFlag = true;
            for (var i = 0; i < $scope.attachmentList.length; i++) {
                $scope.attachmentList[i].isShow = true;
            }
        };
        $scope.closeAttachment = function (el) {
            el.isShow = false;
        }

        $scope.retryCall = function (el) {
            el.status = "success";
        }
        $scope.removeRow = function (el) {
            // remove the row specified in index
            if ($scope.attachmentList.length > 1) {
                if ($scope.attachmentList.length == 2) {
                    $scope.attachmentList[1].actionIconDelete = false;
                }
                $scope.attachmentList.splice(index, 1);
            }
        };
        $rootScope.showUploadlogpopuprootCall = false; //ONLY FOR DEMO
        $rootScope.onUploadlogpopupHideRootCall = function (e) {
            $rootScope.showUploadlogpopuprootCall = false; //ONLY FOR DEMO
            $rootScope.smartNavCallback({ name: "rfx" });
        }
        $rootScope.expressReqPopupRootCall = false; //ONLY FOR DEMO
        $rootScope.expressReqPopupHideRootCall = function (e) {
            $rootScope.expressReqPopupRootCall = false; //ONLY FOR DEMO
            $rootScope.smartNavCallback({ name: "purchaseOrder" });
        }
        $rootScope.contractQuickCreateRootCall = false; //ONLY FOR DEMO
        $rootScope.contractQuickCreateHideRootCall = function (e) {
            $rootScope.contractQuickCreateRootCall = false; //ONLY FOR DEMO
            $rootScope.smartNavCallback({ name: "contract" });
        }
        $rootScope.showUploadExcelrootCall = false;//ONLY FOR DEMO
        $rootScope.onUploadlExcelHideRootCall = function (e) { //ONLY FOR DEMO
            $rootScope.showUploadExcelrootCall = false;
            if ($rootScope.onPage == "platformInvoiceNav") {
                $rootScope.smartNavCallback({ name: "invoice" });
            }
            else if ($rootScope.onPage == "platformContractNav") {
                $rootScope.smartNavCallback({ name: "contract" });
            }
        };
        var getScrollTo = 0;
        $rootScope.showAddAttachmentPopup = false;
        $scope.callAddAttachmentPopup = function () {
            getScrollTo = angular.element('#addAttachmentLink').children()[0].offsetTop;
            $rootScope.showAddAttachmentPopup = true;
            $rootScope.contractQuickCreateRootCall = false;
        };
        $rootScope.showAddAttachmentPopup = false;//ONLY FOR DEMO
        $rootScope.showAddAttachmentPopupHideCall = function (e) {
            $rootScope.showAddAttachmentPopup = false;
            $rootScope.contractQuickCreateRootCall = true;
            $timeout(function () {
                angular.element(angular.element('.quick-create-modal-wrapper').find('.scroll-content')[0]).scrollTop(getScrollTo);
            }, 1000)

        }
        $scope.showCongratulationAlert = false;
        $scope.popupshowFunction = function (count) {
            // debugger;
            if (count == 0) {
                $scope.showCongratulationAlert = true;
            } else {
                // alert("it is false")

            }
        };
        $scope.popupHideFunction = function (e) {
            $scope.showCongratulationAlert = false;
        };
        $scope.popupMessageURL = "shared/home/views/popupMessage.html";
        $scope.popupMessage = "all_tasks_completed_message";
        $scope.$on('$viewContentLoaded', viewContentLoadedFunc);

        $rootScope.pageName = 'home';

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // do something
            $rootScope.pageName = toState.name;
        });

        $scope.showSubHeader = false;
        $scope.setSubHeader = function (val) {
            $scope.showSubHeader = val;
        };
        $scope.getSubHeader = function (val) {
            return $scope.showSubHeader;
        };
        $scope.setPageName = function (name) {
            if ($scope.getSubHeader()) {
                $rootScope.pageName = name;
            } else {
                $rootScope.pageName = "";
            }
        };

        // TODO: remove label references
        // $rootScope.$label = labels;
        // var lowerCased = {};
        // $.each(labels, function(i, v) {
        // 	lowerCased[i] = v.toLowerCase();
        // });

        // $rootScope.$label_L = lowerCased;
        // var upperCased = {};
        // $.each(labels, function(i, v) {
        // 	upperCased[i] = v.toUpperCase();
        // });
        // $rootScope.$label_U = upperCased;

        // function capitalizeFirstLetter(string) {
        // 	return string.charAt(0).toUpperCase() + string.slice(1);
        // }

        // var firstUpperCased = {};
        // $.each(labels, function(i, v) {
        // 	firstUpperCased[i] = capitalizeFirstLetter(v);
        // });
        // $rootScope.$label_FU = firstUpperCased;
        // $scope.label = labels;

        /*
        	logSvc.log("testing error log");

        	// TESTING REST SERVICE CALL ***
        	var userData1 = userDataRESTSvc.get(RESTURLs.userData, {
        		userId : '1'
        	}, true, false);
        	userData1.result.$promise.then(function() {
        	}).catch(function(errorCallback) {
        	}).finally(function(callback, notifyCallback) {
        	});
        	// TESTING REST SERVICE CALL ***
        	var userData2 = userDataRESTSvc.get(RESTURLs.userData, {
        		userId : '2'
        	}, true, false);
        	userData2.result.$promise.then(function() {
        	}).catch(function(errorCallback) {
        	}).finally(function(callback, notifyCallback) {
        	});

        	// TESTING REST SERVICE CALL ***
        	var userData6 = userDataRESTSvc.post(RESTURLs.testPost, {
        		title : 'foo',
        		body : 'bar',
        		userId : 1
        	}, true, false);
        	userData6.result.$promise.then(function() {
        	}).catch(function(errorCallback) {
        	}).finally(function(callback, notifyCallback) {
        	});

        	// TESTING REST SERVICE CALL ***
        	var userData3 = userDataRESTSvc.get(RESTURLs.userData, {
        		userId : '3'
        	}, false, false);
        	userData3.result.$promise.then(function() {
        	}).catch(function(errorCallback) {
        	}).finally(function(callback, notifyCallback) {
        	});
        	// TESTING REST SERVICE CALL ***
        	var userData4 = userDataRESTSvc.get(RESTURLs.userData, {
        		userId : '4'
        	}, true, false);
        	userData4.result.$promise.then(function() {
        	}).catch(function(errorCallback) {
        	}).finally(function(callback, notifyCallback) {
        	});
        	// TESTING REST SERVICE CALL ***
        	var userData5 = userDataRESTSvc.get(RESTURLs.userData, {
        		userId : '5'
        	}, true, false);
        	userData5.result.$promise.then(function() {
        	}).catch(function(errorCallback) {
        	}).finally(function(callback, notifyCallback) {
        	});
        	//ABORT
        	RESTSvc.abort(userData6.id);
        	// RESTSvc.abortAll();
        	// $q.all([userData1.result.$promise,userData2.result.$promise]).then(function(){
        	//     console.log("***all");
        	//     console.log(arguments);
        	// })
        	*/

        function viewContentLoadedFunc(event) {
            setTimeout(function () {
                $('#overlayTrigger').trigger('click');
                // CKEDITOR.replace('editor1');
                $('.regularSearch .search-icon').click(function () {
                    $(this).parents('.regularSearch').addClass('open');
                });
                $('.regularSearch .cancel-icon').click(function () {
                    $(this).parents('.regularSearch').removeClass('open');
                });
                $('.coachmark-cotainer').show();
            }, 2000);
        }

        // Round button code starts here

        /*	$scope.label = {
         'rfx' : 'RFX',
         'nonCatalogItem' : 'NON-CATALOG ITEMS',
         'catalogItem' : 'CATALOG ITEMS',
         'requisition' : 'REQUISITION',
         'receipt' : 'RECEIPT',
         'auction' : 'AUCTION',
         'contract' : 'CONTRACT',
         'paymentRequest' : 'PAYMENT REQUEST',
         'task' : 'TASK',
         'request' : 'REQUEST',
         'order' : 'ORDER'
         };

         $scope.navObj = [{
         id : 'task',
         label : 'TASK',
         icon : '#icon_LpWorkQ',
         classes : '',
         bubble : true,
         hasRequestNav : false,
         href : '#workQueue',
         params : ''
         }, {
         id : 'view',
         label : 'VIEW',
         icon : '#icon_Preview',
         classes : '',
         bubble : false,
         hasRequestNav : false,
         href : 'viewLandingPage.html',
         params : ''
         }, {
         id : 'request',
         label : 'REQUEST',
         icon : '#icon_LpAdd',
         classes : 'scrollingNav',
         bubble : false,
         hasRequestNav : true,
         href : '#',
         params : ['requestClick', 'nav']
         }];

         $scope.scrollNavObj = [{
         classes : 'scrollVBar topSide',
         arrow : 'topArrow',
         arrowsvg : '#icon_DownChevron',
         target : 'bottomSide',
         items : [{
         name : 'RFX',
         href : 'empty_createRfx.html',
         icon : '#icon_RFX'
         }, {
         name : 'RFX REQUEST',
         href : 'empty_createRfx.html',
         icon : '#icon_RFX'
         }]
         }, {
         classes : 'scrollVBar bottomSide',
         arrow : 'btmArrow',
         arrowsvg : '#icon_DownChevron',
         target : 'topSide',
         items : [{
         name : 'AUCTION',
         href : '#',
         icon : '#icon_Auction'
         }, {
         name : 'CONTRACT',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'CONTRACT TEMPLATE',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'BLANKET',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'CLAUSES',
         href : '#',
         icon : '#icon_Contract'
         }]
         }, {
         classes : 'scrollHBar leftSide',
         arrow : 'leftArrow',
         arrowsvg : '#icon_DownChevron',
         target : 'rightSide',
         items : [{
         name : 'NON-CATALOG ITEM',
         href : 'empty_createRfx.html',
         icon : '#icon_Catalog'
         }, {
         name : 'CATALOG ITEM',
         href : 'catalogSearchPage.html',
         icon : '#icon_Catalog'
         }, {
         name : 'REQUISITION REQUEST',
         href : 'empty_createRequisition.html',
         icon : '#icon_Requisition'
         }, {
         name : 'FORMS',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'INVOICES',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'LANGUAGE TEMPLATE',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'ORDER',
         href : '#',
         icon : '#icon_Contract'
         }]
         }, {
         classes : 'scrollHBar rightSide',
         arrow : 'rightArrow',
         arrowsvg : '#icon_DownChevron',
         target : 'leftSide',
         items : [{
         name : 'RECEIPT',
         href : '#',
         icon : '#icon_Requisition'
         }, {
         name : 'PAYMENT REQUEST',
         href : '#',
         icon : '#icon_PaymentReq'
         }, {
         name : 'PROJECTS',
         href : 'empty_createRequisition.html',
         icon : '#icon_PaymentReq'
         }, {
         name : 'RETURN NOTE',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'SCORECARDS',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'CATALOG',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'CREDIT MEMO',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'PROGRAMS',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'RECEIPTS',
         href : '#',
         icon : '#icon_Contract'
         }, {
         name : 'SUPPLIERS',
         href : '#',
         icon : '#icon_Contract'
         }]
         }];

         $scope.isRequestClicked = true;

         $scope.isSelected = function(navId) {
         if ($scope.isRequestClicked == false)
         return true;
         return $scope.selected === navId;
         };

         window.requestClick = function(navId) {

         requestClicked.setProperty(!$scope.isRequestClicked);

         $scope.selected = navId;
         $scope.isRequestClicked = requestClicked.getProperty();

         initializeNav();
         sortCollection();
         };

         $scope.circleNavClick = function() {
         window[arguments[0][0]](arguments[1]);
         };

         angular.element($(window)).bind('resize', function() {
         initializeNav();
         });

         $scope.navArrClick = function($event) {

         var elem = $event.currentTarget,
         sender = elem.nextElementSibling,
         arrowName = elem.dataset.arrow,
         target = document.getElementsByClassName(elem.dataset.target)[0].lastElementChild.lastElementChild;

         if (arrowName == 'topArrow' || arrowName == 'leftArrow') {
         var elToMove = sender.lastElementChild;
         target.insertBefore(elToMove, target.firstChild);
         } else {
         var elToMove = sender.firstElementChild;
         target.appendChild(elToMove);
         }
         initializeNav();
         };

         function sortCollection() {
         $(".scrollHBar .collection, .scrollVBar .collection").sortable({
         connectWith : ".scrollHBar .collection, .scrollVBar .collection",
         placeholder : 'placeholder',
         appendTo : '.navMenuContainer',
         "cursor" : "move",
         helper : "clone",
         revert : true,
         start : function(event, ui) {
         $('.floatingDropbox').hide();
         },
         stop : function(event, ui) {
         },
         receive : function(event, ui) {
         if ($(this).parents('.navScrollBar').hasClass('leftSide')) {
         ui.item.removeClass('bounceInLeft bounceInRight bounceInUp bounceInDown');
         ui.item.addClass('bounceInRight');
         }
         if ($(this).parents('.navScrollBar').hasClass('rightSide')) {
         ui.item.removeClass('bounceInLeft bounceInRight bounceInUp bounceInDown');
         ui.item.addClass('bounceInLeft');
         }
         if ($(this).parents('.navScrollBar').hasClass('topSide')) {
         ui.item.removeClass('bounceInLeft bounceInRight bounceInUp bounceInDown');
         ui.item.addClass('bounceInUp');
         }
         if ($(this).parents('.navScrollBar').hasClass('bottomSide')) {
         ui.item.removeClass('bounceInLeft bounceInRight bounceInUp bounceInDown');
         ui.item.addClass('bounceInDown');
         }
         ui.item.css({
         display : "inline-block"
         });
         initializeNav();
         }
         }).disableSelection();
         }

         function initializeNav() {

         $('body').css({
         'overflow' : 'hidden'
         });
         var offSL = $('.scrollingNav .navMenuContainer').offset().left;
         var offST = $('.scrollingNav .navMenuContainer').offset().top;
         var windowWidth = $(window).width();
         var windowHeight = $(window).height();
         var rightSi = (windowWidth - offSL) - $('.scrollingNav .navMenuContainer').width();
         var bottomSi = (windowHeight - offST) - $('.scrollingNav .navMenuContainer').height();
         $('.scrollHBar.leftSide').width(offSL - 3);
         $('.scrollHBar.rightSide').width(rightSi - 3);
         $('.scrollVBar.topSide').height(offST - 96);
         $('.scrollVBar.bottomSide').height(bottomSi + 17);

         var totalWidth = 0;
         $('.scrollHBar.leftSide .collection a').each(function() {
         totalWidth = totalWidth + $(this).outerWidth() + 5;
         });

         if ((offSL - 100) < totalWidth) {
         $('.scrollHBar.leftSide .collection').width(totalWidth);
         var lMarg = '-' + (totalWidth - (offSL - 100));
         $('.scrollHBar.leftSide .collection').css({
         "margin-left" : parseInt(lMarg)
         });
         $('.scrollHBar.leftSide .reqNavArrow').show();
         } else {
         $('.scrollHBar.leftSide .collection').width("100%");
         $('.scrollHBar.leftSide .collection').css({
         "margin-left" : ""
         });
         $('.scrollHBar.leftSide .reqNavArrow').hide();
         }

         totalWidth = 0;
         $('.scrollHBar.rightSide .collection a').each(function() {
         totalWidth = totalWidth + $(this).outerWidth() + 5;
         });
         if ((rightSi - 100) < totalWidth) {
         $('.scrollHBar.rightSide .collection').width(totalWidth);
         $('.scrollHBar.rightSide .reqNavArrow').show();
         } else {
         $('.scrollHBar.rightSide .collection').width("100%");
         $('.scrollHBar.rightSide .reqNavArrow').hide();
         }

         var totalheight = $('.scrollVBar.topSide .collection').height();

         if ((offST - 140) < totalheight) {
         var tMag = '-' + ((totalheight + 210) - offST);
         $('.scrollVBar.topSide .collection').css({
         "margin-top" : parseInt(tMag)
         });
         $('.scrollVBar.topSide .reqNavArrow').show();
         } else {
         var tMag = (offST - (totalheight + 200));
         $('.scrollVBar.topSide .collection').css({
         "margin-top" : parseInt(tMag)
         });
         $('.scrollVBar.topSide .reqNavArrow').hide();
         }

         totalheight = 0;
         $('.scrollVBar.bottomSide .collection a').each(function() {
         totalheight = totalheight + $(this).outerHeight();
         });

         if ((bottomSi - 70) < totalheight) {
         $('.scrollVBar.bottomSide .reqNavArrow').show();
         } else {
         $('.scrollVBar.bottomSide .reqNavArrow').hide();
         }
         }
         */

        $scope.parentScope = $scope.$parent.$parent && $scope.$parent.$parent.$parent;
        $scope.showMessageBanner = true;

        $scope.hideMessageBanner = function () {
            $scope.showMessageBanner = false;
        };

        $scope.bannerData = [
            {
                "title": "Confidentiality notice 1",
                "message": 'Please read this End-User License Agreement carefully before clicking the "Ok, Got it!" button and using the web portal. By clicking the "Ok, Got it!" button, using the web portal, you are agreeing to be bound by the terms and conditions of this Agreement. This End-User License Agreement is a legal contract between you, as either an individual or as a business entity, and ExxonMobil, which has its principal place of business at...',
                "isClicked": true
            },
             {
                 "title": "Confidentiality notice 2",
                 "message": 'Please read this End-User License Agreement carefully before clicking the "Ok, Got it!" button and using the web portal. By clicking the "Ok, Got it!" button, using the web portal, you are agreeing to be bound by the terms and conditions of this Agreement. This End-User License Agreement is a legal contract between you, as either an individual or as a business entity, and ExxonMobil, which has its principal place of business at...',
                 "isClicked": false
             },
            {
                "title": "Confidentiality notice 3",
                "message": 'Please read this End-User License Agreement carefully before clicking the "Ok, Got it!" button and using the web portal. By clicking the "Ok, Got it!" button, using the web portal, you are agreeing to be bound by the terms and conditions of this Agreement. This End-User License Agreement is a legal contract between you, as either an individual or as a business entity, and ExxonMobil, which has its principal place of business at...',
                "isClicked": false
            },
             {
                 "title": "Confidentiality notice 4",
                 "message": 'Please read this End-User License Agreement carefully before clicking the "Ok, Got it!" button and using the web portal. By clicking the "Ok, Got it!" button, using the web portal, you are agreeing to be bound by the terms and conditions of this Agreement. This End-User License Agreement is a legal contract between you, as either an individual or as a business entity, and ExxonMobil, which has its principal place of business at...',
                 "isClicked": false
             },
            {
                "title": "Confidentiality notice 5",
                "message": 'Please read this End-User License Agreement carefully before clicking the "Ok, Got it!" button and using the web portal. By clicking the "Ok, Got it!" button, using the web portal, you are agreeing to be bound by the terms and conditions of this Agreement. This End-User License Agreement is a legal contract between you, as either an individual or as a business entity, and ExxonMobil, which has its principal place of business at...',
                "isClicked": false
            },
            {
                "title": "Confidentiality notice 6",
                "message": 'Please read this End-User License Agreement carefully before clicking the "Ok, Got it!" button and using the web portal. By clicking the "Ok, Got it!" button, using the web portal, you are agreeing to be bound by the terms and conditions of this Agreement. This End-User License Agreement is a legal contract between you, as either an individual or as a business entity, and ExxonMobil, which has its principal place of business at...',
                "isClicked": false
            }
        ]

        $scope.headerTitle = $scope.bannerData[0].title;

        $scope.showReadMore = false;

        $scope.showConfidentialityPopUp = false;

        $scope.showPopUp = function (e) {
            $scope.showConfidentialityPopUp = true;
        }

        $scope.closeConfidentialityPopUp = function (e) {
            if ($scope.dontShowChecked) {
                $scope.parentScope.showMessageBanner = false;
            } else {
                $scope.parentScope.allButtonsClicked = true;
            }
            $scope.parentScope.showConfidentialityPopUp = false;
        };

        $scope.onHideConfidentialityPopUp = function (e) {
            $scope.showConfidentialityPopUp = false;
        }


        $scope.selectedOption = { 'size': '1' };

        $scope.disableDoneButton = $scope.bannerData.length == 1 ? false : true;

        $scope.allButtonsClicked = false;

        $scope.pageChanged = function (newPageNumber, oldPageNumber, bannerData) {
            bannerData[newPageNumber].isClicked = true;
            $scope.headerTitle = bannerData[newPageNumber].title;
            var isAllClicked = _.find($scope.bannerData, { "isClicked": false });
            if (isAllClicked == undefined) {
                $scope.disableDoneButton = false;
            }
        };
        $scope.dontShowMessage = function (isChecked) {
            if (isChecked) {
                $scope.dontShowChecked = true;
            } else {
                $scope.dontShowChecked = false;
            }
        };

        //recent doc data
        $scope.recentDocData = [
            {
                "docName": "Ketchup Production",
                "docStatus": "Draft",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "10/05/2017 12:30 AM"
            },
            {
                "docName": "RFx for Conference Communications",
                "docStatus": "Awarding",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "15/03/2017 11:30 AM"
            },
            {
                "docName": "RFx for ATL Marketing - North America",
                "docStatus": "Draft",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "5/01/2018 11:30 AM"
            },
            {
                "docName": "RFx for Conference Communications",
                "docStatus": "Awarding",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "12/04/2018 8:30 AM"
            },
            {
                "docName": "RFx for ATL Marketing - North America",
                "docStatus": "Draft",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "18/04/2018 5:30 AM"
            },
            {
                "docName": "RFx for ATL Marketing - North America",
                "docStatus": "Draft",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "25/09/2017 3:30 AM"
            },
            {
                "docName": "RFx for Conference Communications",
                "docStatus": "Awarding",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "08/02/2018 3:18 AM"
            },
            {
                "docName": "RFx for ATL Marketing - North America",
                "docStatus": "Draft",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "23/02/2018 1:45 AM"
            },
            {
                "docName": "RFx for Conference Communications",
                "docStatus": "Awarding",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "18/02/2018 3:18 AM"
            },
            {
                "docName": "RFx for ATL Marketing - North America",
                "docStatus": "Draft",
                "docType": "RFX",
                "docLink": "sourcing.rfx.new",
                "lastSeen": "14/08/2018 3:47 AM"
            }
        ]

        $scope.setValue = function (ele) {
            switch (ele) {
                case 'RFX':
                    return '#icon_RFX';
                    break;
                case 'requisition':
                    return '#icon_Requisition';
                    break;
                case 'Ideation':
                    return '#icon_Ideation';
                    break;
                case 'Execution':
                    return '#icon_Execution';
                    break;
                case 'Realization':
                    return '#icon_Realisation';
                    break;
                case 'contract':
                    return '#icon_Contract';
                    break;
                case 'order':
                    return '#icon_Order';
                    break;
                case 'supplier':
                    return '#icon_Supplier';
                    break;
                case 'invoiceReconciliation':
                    return '#icon_invRecon';
                    break;
                case 'scanned_image':
                    return '{{item.itemImage}}';
                    //return '#icon_invRecon';
                    break;
                case 'Catalog':
                    return '#icon_Catalog';
                    break;
                case 'project':
                    return '#icon_projects';
                    break;
                case 'punchout':
                    return '#icon_PunchOut';
                    break;
                case 'Draft':
                    return '#icon_Draft';
                    break;
                case 'Exception':
                    return '#icon_Exception';
                    break;
                case 'Approval Required':
                    return '#icon_ApprovalRequired';
                    break;
                case 'Pending':
                    return '#icon_Pending';
                    break;
                case 'Live':
                    return '#icon_Live';
                    break;
                case 'Approval Pending':
                    return '#icon_ApprovalPending';
                    break;
                case 'Execute':
                    return '#icon_Execute';
                    break;
                case 'Matched':
                    return '#icon_Matched';
                    break;
                case 'Approved':
                    return '#icon_Approved';
                    break;
                case 'Supplier Invited':
                    return '#icon_SupplierInvited';
                    break;
                case 'Completed':
                    return '#icon_Completed';
                    break;
                case 'OnHold':
                    return '#icon_OnHold';
                    break;
                case 'Cancelled':
                    return '#icon_Cancelled';
                    break;
                case 'Awarding':
                    return '#icon_Awarding';
                    break;
                case 'Awarded':
                    return '#icon_Awarded';
                    break;
                case 'Closed':
                    return '#icon_Closed';
                    break;
                case 'Scoring In Progress':
                    return '#icon_ScoringInProgress';
                    break;
                case 'Response In Progress':
                    return '#icon_ResponseInProgress';
                    break;
                case 'Draft Withdrawn':
                    return '#icon_DraftWithdrawn';
                    break;
                case 'Draft Co-Authoring':
                    return '#icon_DraftCoAuthoring';
                    break;
                case 'Invoice Paid With Remittance':
                    return '#icon_InvoicePaidWithRemittance';
                    break;
                case 'Rejected':
                    return '#icon_ApprovalRejected';
                    break;
                case 'Submitted':
                    return '#icon_Draft';
                    break;
                default:
                    return false;
            }
        };

        $scope.onIntroOkGotIt = function(){
            angular.element(".introjsButtonOverlay").hide();
            angular.element('body').css({"overflow" : "auto"});
            angular.element(".fixed-action-btn").addClass("homePageFixedActionBtn").css({"transition" : "all .5s !important"});
            angular.element(".circleContainer").addClass("marginTop215");
            ngIntroService.intro.exit();
        };
        
        $scope.showIntro = storeService.get("SmartCoachSwitch");
        $scope.onDontShowIntro = function(){
        $scope.showIntro = !$scope.showIntro;
        if(!$scope.showIntro)
        {
            storeService.set("SmartCoachSwitch", false);
            var infoConfig = {
                type: "inform",
                message: "You can still access Smart Coach from Help Section.",
                buttons: [
                    {
                        "title": "CLOSE",
                        "result": true
                    }
                ]
            };

            notification.notify(infoConfig, function (response) {
                if (response.result) {}
            });
        }
        else
        {
            storeService.set("SmartCoachSwitch", true);
        }
        $rootScope.$broadcast("updateSmartCoachSwitch");

        angular.element(".lean-overlay").css({"z-index": 100000000});
        $timeout(function(){
            angular.element(".notify-information").css({"z-index": 1000000001});
        },500);
    };

    $rootScope.$on("startHomeIntroEvent", startHomeIntro);

    function startHomeIntro() {
        var introSteps = [
                {
                    element: document.getElementsByClassName('introStep_1')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeIntroNavHelper',
                    linePosition : "positionTop",
                    tooltipClass : "tooltipTopRight tooltipHomeLeft65Prec"
                },
                {
                    element: document.getElementsByClassName('introStep_2')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeIntroNavHelper',
                    linePosition : "positionTop",
                    tooltipClass : "tooltipTopRight tooltipHomeLeft65Prec"
                },
                {
                    element: document.getElementsByClassName('introStep_3')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeIntroNavHelper',
                    linePosition : "positionTop",
                    tooltipClass : "tooltipTopRight tooltipHomeLeft65Prec"
                },
                {
                    element: document.getElementsByClassName('introStep_4')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeIntroNavHelper',
                    linePosition : "positionTop",
                    tooltipClass : "tooltipTopRight tooltipHomeLeft65Prec homeSecondLastCircle"
                },
                {
                    element: document.getElementsByClassName('introStep_5')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeIntroNavHelper',
                    linePosition : "positionTop",
                    tooltipClass : "tooltipTopLeft tooltipHomeLeft65Prec homeLastCircle"
                },
                {
                    element: document.getElementsByClassName('fixed-action-btn')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeIntroHelper',
                    linePosition : "positionTop",
                    tooltipClass : "tooltipTopLeft"
                },
                {
                    element: document.getElementsByClassName('sliderTitle')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeStepSeven',
                    linePosition : "positionTop",
                    tooltipClass : "tooltipTopRight tooltipHomeLeft65Prec"
                },
                {
                    //element: document.getElementById('uniqueIdForHeaderProfile'),
                    element: document.getElementsByClassName('headerIcon_1')[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'marginTop0 marginLeft0 homeStepEight',
                    linePosition : "positionBottom",
                    tooltipClass : "tooltipBottomLeft"
                },
                {
                    element: document.getElementsByClassName('headerIcon_2')[0],//.children[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeStepNineToTwelve',
                    linePosition : "positionBottom",
                    tooltipClass : "tooltipBottomLeft"
                },
                {
                    element: document.getElementsByClassName('headerIcon_3')[0],//.children[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeStepNineToTwelve',
                    linePosition : "positionBottom",
                    tooltipClass : "tooltipBottomLeft"
                },
                {
                    element: document.getElementsByClassName('headerIcon_4')[0],//.children[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeStepNineToTwelve',
                    linePosition : "positionBottom",
                    tooltipClass : "tooltipBottomLeft"
                },
                {
                    element: document.getElementsByClassName('headerIcon_5')[0],//.children[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeStepNineToTwelve',
                    linePosition : "positionBottom",
                    tooltipClass : "tooltipBottomLeft"
                },
                {
                    //element: document.getElementById('Div1'),
                    element: document.getElementsByClassName("searchWrapper")[0],
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    highlightClass: 'homeStepThirteen',
                    linePosition : "positionBottom",
                    tooltipClass : "tooltipBottomLeft tooltipHomeRight53Prec"
                },
        ];

        ngIntroService.clear();
        ngIntroService.setOptions({
            steps: introSteps,
            disableInteraction : true,
            nextLabel : ">",
            prevLabel : "<",
            scrollToElement : false,
            showBullets : false,
            showStepNumbers : true,
            keyboardNavigation : true,
            exitOnOverlayClick : false,
            exitOnEsc : false
        });

        var dotElem = document.createElement("div"),
            lineElem = document.createElement("div"),
            helperNumber = document.createElement("span"),
            body = document.getElementsByTagName("body")[0],
            introjsButtonOverlay = document.getElementsByClassName("introjsButtonOverlay")[0];

        lineElem.appendChild(dotElem);
        dotElem.className = "introjs-helperLayer-dot";

        ngIntroService.onAfterChange(function(targetElement) {
                if(ngIntroService.intro._currentStep == 5 || ngIntroService.intro._currentStep == 6)
                {
                    introjsButtonOverlay.style.right = "unset";
                    introjsButtonOverlay.style.left = "0px";
                    document.getElementsByClassName("fixedBottom")[0].style['z-index'] = 'unset';
                    document.getElementsByClassName("sliderTitle")[0].style.background = "rgba(255, 255, 255, 0.5)";
                    if(ngIntroService.intro._currentStep == 6)
                    {
                            document.getElementsByClassName("fixedBottom")[0].style['z-index'] = 9999999;
                            document.getElementsByClassName("sliderTitle")[0].style.background = "rgba(255, 255, 255, 1)";
                    }
                }
                else
                {
                    introjsButtonOverlay.style.left = "unset";
                    introjsButtonOverlay.style.right = "0px";
                    document.getElementsByClassName("fixedBottom")[0].style['z-index'] = 'unset';
                    document.getElementsByClassName("sliderTitle")[0].style.background = "rgba(255, 255, 255, 0.5)";
                }
                document.getElementsByClassName("introjs-helperLayer")[0].appendChild(lineElem);
                document.getElementsByClassName("introjs-tooltipbuttons")[0].insertBefore(helperNumber, document.getElementsByClassName("introjs-nextbutton")[0]);
                helperNumber.innerHTML = ngIntroService.intro._currentStep+1 + " / " + introSteps.length;
                document.getElementsByClassName("introjs-helperNumberLayer")[0].style.display = "none";
        });

        ngIntroService.onChange(function(){
            lineElem.className = "introjs-helperLayer-line " + introSteps[ngIntroService.intro._currentStep].linePosition;
            if(ngIntroService.intro._currentStep > 4){
                angular.element(".circleContainer").addClass("marginTop215");
            }
            else
            {
                angular.element(".circleContainer").removeClass("marginTop215");
            }
        }); 

        ngIntroService.onExit(function() {
            body.style.overflow = "auto";
            introjsButtonOverlay.classList.add("hide");
            lineElem = null;
            angular.element(".fixed-action-btn").addClass("homePageFixedActionBtn").css({"transition" : "all .5s !important"});
            angular.element(".circleContainer").addClass("marginTop215");
            helperNumber = null;
        });


        body.style.overflow = "hidden";
        introjsButtonOverlay.classList.remove("hide");
        angular.element(".fixed-action-btn").removeClass("homePageFixedActionBtn").css({"transition" : "unset"});
        ngIntroService.start();
    }
        ngIntroService.clear();
        ngIntroService.intro.exit();
    };
})(angular);

