(function (angular) {
    'use strict';
    angular.module('SMART2')
	/**
	 * @ngdoc controller
	 * @name SMART2.controller:componentCtrl
	 * @description
	 * Controller of ALL separate Components.
	 */.controller('navCircleCtrl', ['$scope', '$window', 'requestClicked', '$timeout', '$translate', 'APPCONSTANTS', '$rootScope', '$state', 'routeSvc', 'redirectState', navCircleCtrlFunc]).service('requestClicked', requestClickedFunc);

    function requestClickedFunc() {
        var isRequestClicked = false;
        return {
            getProperty: function () {
                return isRequestClicked;
            },
            setProperty: function (value) {
                isRequestClicked = value;
            }
        };
    };

    function navCircleCtrlFunc($scope, $window, requestClicked, $timeout, $translate, APPCONSTANTS, $rootScope, $state, routeSvc, redirectState) {
        var count = 0;
        var intervalOfAnimation = 400;
        var documentPriorityConstants = [];
        $scope.onLoadFunc = function () {
            angular.forEach(angular.element('.home-page-bubble-button'), function (ele, index) {
                $timeout(function () {
                    angular.element(ele).addClass("animated bounceIn");
                }, intervalOfAnimation * index);
                count = count + 1;
            });
            $timeout(function () {
                angular.element('.small-notification-bubble').addClass("fade-in-small-bubble");
            }, count * intervalOfAnimation);

        };

        $scope.openTasksScreen = function () {
            $window.location.href = bubbleConfig["Task"]["href"];
        };

        var initialDocumentPriorityConstants = APPCONSTANTS.documentPriority;
        var availableDocumentTypes = APPCONSTANTS.userPreferences.NAVButtonsAccessRights.Create;
        for (var i = 0; i < initialDocumentPriorityConstants.length; i++) {
            if (availableDocumentTypes.indexOf(initialDocumentPriorityConstants[i]) >= 0) {
                documentPriorityConstants.push(initialDocumentPriorityConstants[i]);
            }
        }

        var bubbleConfig = {
            "Analyze": {
                id: 'analyze',
                label: $translate.instant('analyze'),
                icon: '#icon_Analyze',
                classes: '',
                bubbleClass: 'bubble--Analyse',
                bubble: true,
                hasRequestNav: false,
                href: 'analyseReport',
                params: '',
                tooltipLabel: 'View Analytic Reports'
            },
            "Task": {
                id: 'task',
                label: $translate.instant('task'),
                icon: '#icon_LpWorkQ',
                classes: '',
                bubbleClass: 'bubble--task',
                bubble: true,
                hasRequestNav: false,
                href: 'workQueue',
                params: '',
                tooltipLabel: 'View Pending Tasks'
            },
            "Manage": {
                id: 'view',
                label: $translate.instant('Manage'),
                icon: '#icon_RfxReq',
                classes: '',
                bubbleClass: 'bubble--view',
                bubble: false,
                hasRequestNav: false,
                href: 'landing',
                params: '',
                tooltipLabel: 'Manage Documents'
            },
            "Create": {
                id: 'request',
                label: $translate.instant('create'),
                icon: '#icon_LpAdd',
                classes: 'scrollingNav',
                bubbleClass: 'bubble--request',
                bubble: false,
                hasRequestNav: true,
                href: '#',
                params: ['requestClick', 'nav'],
                tooltipLabel: 'Create New Document'
            },
            "Shop": {
                id: 'shop',
                label: $translate.instant('shop'),
                icon: '#icon_shoppingBag',
                classes: '',
                bubbleClass: 'bubble--shop',
                bubble: true,
                hasRequestNav: false,
                href: 'catalog.requestercatalog.landing',
                params: '',
                tooltipLabel: 'Access Catalog'
            }

        };

        $scope.selectBubbles = function (userInfo) {
            $scope.navObj = [];
            var navButtonKeys = Object.keys(APPCONSTANTS.userPreferences.NAVButtonsAccessRights);
            for (i = 0; i < navButtonKeys.length; i++) {
                if (navButtonKeys[i] == "Task") {
                    bubbleConfig[navButtonKeys[i]].count = parseInt(APPCONSTANTS.userPreferences.NAVButtonsAccessRights[navButtonKeys[i]]);
                    if (bubbleConfig[navButtonKeys[i]].count >= 0) {
                        $scope.navObj.push(bubbleConfig[navButtonKeys[i]]);
                    }
                } else {
                    if (APPCONSTANTS.userPreferences.NAVButtonsAccessRights[navButtonKeys[i]].length > 0)
                        $scope.navObj.push(bubbleConfig[navButtonKeys[i]]);
                }
            }
        };
        $scope.selectBubbles();
        $scope.selected = "";
        if (redirectState.state != 'home') {
            $scope.isRequestClicked = requestClicked.getProperty();
        } else {
            $scope.isRequestClicked = false;
            requestClicked.setProperty(false);
        }
        $scope.isSelected = function (navId) {
            if ($scope.isRequestClicked == false)
                return true;
            else {
                if (navId == "request")
                    return true;
            }
            return $scope.selected === navId;
        };

        $scope.navCircleClick = function (id, href, _docPriorityConstants) {
            if (id == 'request') {
                if (_docPriorityConstants == null) {
                    requestClicked.setProperty(!$scope.isRequestClicked);
                    $scope.selected = id;
                    $scope.isRequestClicked = requestClicked.getProperty();
                    _docPriorityConstants = documentPriorityConstants;
                }
                if (_docPriorityConstants.length > 1) {
                    initializeScrollNav();
                    // sortCollection();
                } else {
                    //$window.location.href = APPCONSTANTS.smartNavTileConfig[_docPriorityConstants[0]].href;
                    routeSvc.stateTo(APPCONSTANTS.smartNavTileConfig[_docPriorityConstants[0]].href);
                }
                setTimeout(function () {
                    setDragNDrop();
                }, 100);
            } else if ((id == 'task') && (bubbleConfig["Task"].count == 0)) {
                $scope.popupshowFunction(0);
                $scope.selected = "";
            } else {
                //$window.location.href = href;
                routeSvc.stateTo(href);
                $scope.selected = "";
            }
        };

        requestClicked.navCircle = $scope.navCircleClick;

        angular.element($window).bind('resize', function () {
            if ($scope.isRequestClicked) {
                $timeout(function () {
                    initializeScrollNav();
                }, 1);
            }

        });

        $scope.topObject = {
            classes: 'scrollVBar topSide',
            arrow: 'topArrow',
            arrowsvg: '#icon_UpChevron',
            //target : 'bottomSide',
            showBackArrow: true,
            showForwardArrow: false,
            type: "vertical",
            id: "topBar",
            eachItemClass: "topSide .collection a",
            items: []
        };

        $scope.bottomObject = {
            classes: 'scrollVBar bottomSide',
            arrow: 'btmArrow',
            arrowsvg: '#icon_DownChevron',
            //target : 'topSide',
            showBackArrow: false,
            showForwardArrow: true,
            type: "vertical",
            id: "bottomBar",
            eachItemClass: "bottomSide .collection a",
            items: []
        };

        $scope.leftObject = {
            classes: 'scrollHBar leftSide',
            arrow: 'leftArrow',
            arrowsvg: '#icon_LeftChevron',
            //target : 'rightSide',
            type: 'horizontal',
            showBackArrow: false,
            showForwardArrow: true,
            id: "leftBar",
            items: []
        };

        $scope.rightObject = {
            classes: 'scrollHBar rightSide',
            arrow: 'rightArrow',
            arrowsvg: '#icon_RightChevro',
            //target : 'leftSide',
            type: 'horizontal',
            showBackArrow: true,
            showForwardArrow: false,
            id: "rightBar",
            items: []
        };

        $scope.topObject.nextBar = "rightObject";
        $scope.bottomObject.nextBar = "leftObject";
        $scope.leftObject.nextBar = "topObject";
        $scope.rightObject.nextBar = "bottomObject";

        $scope.topObject.oppositeBar = "bottomObject";
        $scope.bottomObject.oppositeBar = "topObject";
        $scope.leftObject.oppositeBar = "rightObject";
        $scope.rightObject.oppositeBar = "leftObject";

        // Will contain APIs to specific directives
        $scope.topAPIObject = {

        };

        $scope.bottomAPIObject = {

        };

        $scope.leftAPIObject = {

        };

        $scope.rightAPIObject = {

        };

        $scope.topBackClick = function () {
            var _item = $scope.topObject.items.pop();
            $scope.topAPIObject.resetUI(getTopBarAvailableHeight(), true);
            $scope.bottomBackClick(_item);
        };

        $scope.topForwardClick = function (item) {
            $scope.topObject.items.push(item);
            $scope.topAPIObject.resetUI(getTopBarAvailableHeight(), true);
        };

        $scope.bottomBackClick = function (item) {
            $scope.bottomObject.items.unshift(item);
            $scope.bottomAPIObject.resetUI(getBottomBarAvailableHeight(), true);
        };

        $scope.bottomForwardClick = function () {
            var _item = $scope.bottomObject.items.shift();
            $scope.bottomAPIObject.resetUI(getBottomBarAvailableHeight(), true);
            $scope.topForwardClick(_item);
        };

        $scope.leftBackClick = function () {
            var _item = $scope.leftObject.items.shift();
            $scope.leftAPIObject.resetUI(getLeftBarAvailableWidth(), true);
            $scope.rigthBackClick(_item);
        };

        $scope.leftForwardClick = function (item) {
            $scope.leftObject.items.unshift(item);
            $scope.leftAPIObject.resetUI(getLeftBarAvailableWidth(), true);
        };

        $scope.rigthBackClick = function (item) {
            $scope.rightObject.items.unshift(item);
            $scope.rightAPIObject.resetUI(getRightBarAvailableWidth(), true);
        };

        $scope.rightForwardClick = function () {
            var _item = $scope.rightObject.items.shift();
            $scope.rightAPIObject.resetUI(getRightBarAvailableWidth(), true);
            $scope.leftForwardClick(_item);

        };

        function getLeftBarAvailableWidth() {
            var offSL = $('.scrollingNav .navMenuContainer').offset().left;
            return offSL - 20;
        }

        function getRightBarAvailableWidth() {
            var offSL = $('.scrollingNav .navMenuContainer').offset().left;
            var windowWidth = $(window).width();
            var rightSi = (windowWidth - offSL) - $('.scrollingNav .navMenuContainer').width();
            return rightSi - 19;
        }

        function getTopBarAvailableHeight() {
            var offST = $('.scrollingNav .navMenuContainer').offset().top;
            return offST - 134;
        }

        function getBottomBarAvailableHeight() {
            var offST = $('.scrollingNav .navMenuContainer').offset().top;
            var windowHeight = $(window).height();
            var bottomSi = (windowHeight - offST) - $('.scrollingNav .navMenuContainer').height();
            return bottomSi - 19;
        }

        function initializeScrollNav() {
            var tileWidth = 94;
            var tileHeight = 94;
            if ($('.scrollingNav .navMenuContainer').length) {
                //$('body').css({
                //    'overflow': 'hidden'
                //});
            } else {
                return;
            }

            var leftBarWidth = getLeftBarAvailableWidth();
            var rightBarWidth = getRightBarAvailableWidth();
            var topBarHeight = getTopBarAvailableHeight();
            var bottomBarHeight = getBottomBarAvailableHeight();

            $scope.leftObject.items = [];
            $scope.rightObject.items = [];
            $scope.topObject.items = [];
            $scope.bottomObject.items = [];

            var counter = 0;
            var noOfDocTypes = documentPriorityConstants.length;

            var noOfElementsToPush = Math.floor(leftBarWidth / tileWidth);
            for (var j = 0; ((j < noOfElementsToPush) && (counter <= (noOfDocTypes - 1))) ; j++) {
                $scope.leftObject.items.push(APPCONSTANTS.smartNavTileConfig[documentPriorityConstants[counter] + ""]);
                counter = counter + 1;
            }

            noOfElementsToPush = Math.floor(rightBarWidth / tileWidth);
            for (var j = 0; ((j < noOfElementsToPush) && (counter <= (noOfDocTypes - 1))) ; j++) {
                $scope.rightObject.items.push(APPCONSTANTS.smartNavTileConfig[documentPriorityConstants[counter] + ""]);
                counter = counter + 1;
            }

            var noOfElementsToPushInTop = Math.floor(topBarHeight / tileHeight);
            var noOfElementsToPushInBottom = Math.floor(bottomBarHeight / tileHeight);
            noOfElementsToPush = noOfElementsToPushInTop + noOfElementsToPushInBottom;
            for (var j = 0; ((j < noOfElementsToPush) && (counter <= (noOfDocTypes - 1))) ; j++) {
                if (noOfElementsToPushInTop > 0) {
                    $scope.topObject.items.push(APPCONSTANTS.smartNavTileConfig[documentPriorityConstants[counter] + ""]);
                    noOfElementsToPushInTop--;
                    counter = counter + 1;
                }
                if (noOfElementsToPushInBottom > 0 && (counter <= (noOfDocTypes - 1))) {
                    $scope.bottomObject.items.push(APPCONSTANTS.smartNavTileConfig[documentPriorityConstants[counter] + ""]);
                    noOfElementsToPushInBottom--;
                    counter = counter + 1;
                }
            }
            var noOfHiddenItems = 3;
            var defaultArray = "rightObject";
            while (counter < documentPriorityConstants.length) {
                var iterator = (((documentPriorityConstants.length) - counter) < noOfHiddenItems) ? (documentPriorityConstants.length) - counter : noOfHiddenItems;
                if (iterator <= 0) {
                    break;
                }

                for (var i = 0; i < iterator; i++) {
                    if ($scope[defaultArray]["arrow"] == "leftArrow" || $scope[defaultArray]["arrow"] == "topArrow") {
                        $scope[defaultArray].items.unshift(APPCONSTANTS.smartNavTileConfig[documentPriorityConstants[counter] + ""]);
                    } else {
                        $scope[defaultArray].items.push(APPCONSTANTS.smartNavTileConfig[documentPriorityConstants[counter] + ""]);
                    }
                    counter = counter + 1;
                }
                defaultArray = $scope[defaultArray].nextBar;
            }

            // TO DO: need to rethink about the timout
            $timeout(function () {
                if ($scope.leftAPIObject.resetUI)
                    $scope.leftAPIObject.resetUI(leftBarWidth, false);
                if ($scope.rightAPIObject.resetUI)
                    $scope.rightAPIObject.resetUI(rightBarWidth, false);
                if ($scope.topAPIObject.resetUI)
                    $scope.topAPIObject.resetUI(topBarHeight, false);
                if ($scope.bottomAPIObject.resetUI)
                    $scope.bottomAPIObject.resetUI(bottomBarHeight, false);
                $('.scrollHBar.leftSide').width(leftBarWidth);
                $('.scrollHBar.rightSide').width(rightBarWidth);
                $('.scrollVBar.topSide').height(topBarHeight);
                $('.scrollVBar.bottomSide').height(bottomBarHeight);
            }, 200);

        }

        $scope.dragStart = false;
        $scope.showBar = function (object) {
            if (!$scope.dragStart) {
                if (object.items.length > 0 || $scope[object.oppositeBar].items.length > 0) {
                    return true;
                }
                return false;
            } else {
                return true;
            }
        };

        var startFunc = function (event, ui) {
            ui.item.data('start_pos', ui.item.index());
            ui.item.data('start_parent', ui.item.parent().data('barid'));
            if ($scope.topObject.items.length == 0 || $scope.leftObject.items.length == 0) {
                $(".scrollHBar .collection, .scrollVBar .collection").sortable("refresh");
                $scope.dragStart = true;
                $scope.$apply();
            }
        }

        var stopFunc = function (event, ui) {
            var stop_pos = ui.item.index();
            var stop_parent = ui.item.parent().data('barid');
            var start_pos = ui.item.data('start_pos');
            var start_parent = ui.item.data('start_parent');
            var currentItemDragged = ui.item.find('svg > use');
            if (stop_parent == start_parent) {
                if (start_pos == stop_pos) {
                    //IE 11 specific issue :: to re-paint in IE browser we need to explicitly apply 'zoom' property on element 
                    $timeout(function () {
                        ui.item.css('zoom', '1').css('zoom', '0');
                        var currentItem = currentItemDragged.attr("xlink:href");
                        currentItemDragged.attr("xlink:href", "").attr("xlink:href", currentItem);
                    });
                    $scope.dragStart = false;
                    $scope.$digest();
                    return;
                }
            }

            var startObject = start_parent.replace("Bar", "Object"),
                stopObject = stop_parent.replace("Bar", "Object");
            var _item = $scope[startObject].items[start_pos];
            $scope[startObject].items.splice(start_pos, 1);
            $scope[stopObject].items.splice(stop_pos, 0, _item);
            function getAvailableSpace(obje) {
                switch (obje) {
                    case "topAPIObject": return getTopBarAvailableHeight(); break;
                    case "bottomAPIObject": return getBottomBarAvailableHeight(); break;
                    case "leftAPIObject": return getLeftBarAvailableWidth(); break;
                    case "rightAPIObject": return getRightBarAvailableWidth(); break;
                };
            }
            var startAPIObject = start_parent.replace("Bar", "APIObject");

            $scope[startAPIObject].resetUI(getAvailableSpace(startAPIObject), false);
            if (typeof stopObject != 'undefined') {
                var stopAPIObject = stop_parent.replace("Bar", "APIObject");
                var flagparam = (stopAPIObject == "topAPIObject" || stopAPIObject == "leftAPIObject");
                $scope[stopAPIObject].resetUI(getAvailableSpace(stopAPIObject), false);
            };
            ui.item.remove();
            $scope.dragStart = false;
            $scope.$digest();
        }

        function setDragNDrop() {
            $(".leftSide .collection").sortable({
                connectWith: ".rightSide .collection, .topSide .collection, .bottomSide .collection",
                placeholder: 'placeholder',
                appendTo: '.navMenuContainer',
                cursor: "move",
                helper: "clone",
                revert: true,
                tolerance: "pointer",
                start: function (event, ui) { //show original when hiding clone
                    startFunc(event, ui);
                },
                stop: function (event, ui) {
                    stopFunc(event, ui);
                },
                //receive: function (event, ui) {
                //    var parentElement = ui.item.parent(),
                //        originalPosition = ui.sender;
                //    ui.item.css({ display: "inline-block" });
                //    if (parentElement.attr('id') === "topBar") {
                //        parentElement.css({
                //            'margin-top': parseInt(parentElement.css('margin-top')) - ui.item.height() - 25,
                //            'height': parseInt(parentElement.css('height')) + ui.item.height()
                //        });
                //    } else if (ui.sender.attr('id') === "topBar") {
                //        originalPosition.css({
                //            'margin-top': parseInt(originalPosition.css('margin-top')) + ui.item.height() + 10,
                //            'height': parseInt(originalPosition.css('height')) - ui.item.height()
                //        });
                //    }
                //    $(event.target).data("isset", "unset");
                //},
                //update: function (event, ui) {
                //              console.log("update call", ui.item.index());
                //},
                //over: function (event, ui) {
                //    var _e = $(event.target);
                //    var _bar = _e.data('barid');
                //    var _isset = _e.data('isset');
                //    if (ui.item.parent().data('barid') == _bar || _isset == 'set') {
                //        return;
                //    };
                //    var _ewidth = _e.width();
                //    var _eheight = _e.height();
                //    var sizeConst = 110;
                //    switch (_bar) {
                //        case "bottomBar": _e.height(_eheight + sizeConst); break;
                //        case "rightBar": _e.width(_ewidth + sizeConst); break;
                //        case "topBar":
                //            var topMargin = _e.css('margin-top');
                //            _e.height(_eheight + sizeConst);
                //            _e.css({ "margin-top": parseInt(topMargin) - sizeConst + 'px' });
                //            console.log("Add extra : " + parseInt(topMargin));
                //            break;
                //        case "leftBar":
                //            _e.css({ "margin-left": parseInt(_e.css('margin-left')) - sizeConst + 'px', "width": (_ewidth + sizeConst) + "px" });
                //            break;
                //    }
                //    _e.data("isset", "set");
                //},
                //out: function (event, ui) {
                //    var _e = $(event.target);
                //    var _bar = _e.data('barid');
                //    var _isset = _e.data('isset');
                //    if (ui.item.parent().data('barid') == _bar || _isset == 'unset') {
                //        return;
                //    };
                //    var _ewidth = _e.width();
                //    var _eheight = _e.height();
                //    var sizeConst = 110;
                //    switch (_bar) {
                //        case "bottomBar": _e.height(_eheight - sizeConst); break;
                //        case "rightBar": _e.width(_ewidth - sizeConst); break;
                //        case "topBar":
                //            var topMargin = _e.css('margin-top');
                //            _e.height(_eheight - sizeConst);
                //            _e.css({ "margin-top": parseInt(topMargin) + sizeConst + 'px' });
                //            console.log("remove extra : " + topMargin);
                //            break;
                //        case "leftBar":
                //            _e.css({ "margin-left": parseInt(_e.css('margin-left')) + sizeConst + 'px', "width": (_ewidth - sizeConst) + "px" });
                //    }
                //    _e.data("isset", "unset");
                //}
            }).disableSelection();

            $(".rightSide .collection").sortable({
                connectWith: ".leftSide .collection, .topSide .collection, .bottomSide .collection",
                placeholder: 'placeholder',
                appendTo: '.navMenuContainer',
                cursor: "move",
                helper: "clone",
                revert: true,
                tolerance: "pointer",
                start: function (event, ui) { //show original when hiding clone
                    startFunc(event, ui);
                },
                stop: function (event, ui) {
                    stopFunc(event, ui);
                },
            }).disableSelection();

            $(".topSide .collection").sortable({
                connectWith: ".leftSide .collection, .rightSide .collection, .bottomSide .collection",
                placeholder: 'placeholder',
                appendTo: '.navMenuContainer',
                cursor: "move",
                helper: "clone",
                revert: true,
                tolerance: "pointer",
                start: function (event, ui) { //show original when hiding clone
                    startFunc(event, ui);
                },
                stop: function (event, ui) {
                    stopFunc(event, ui);
                },
            }).disableSelection();

            $(".bottomSide .collection").sortable({
                connectWith: ".leftSide .collection, .rightSide .collection, .topSide .collection",
                placeholder: 'placeholder',
                appendTo: '.navMenuContainer',
                cursor: "move",
                helper: "clone",
                revert: true,
                tolerance: "pointer",
                start: function (event, ui) { //show original when hiding clone
                    startFunc(event, ui);
                },
                stop: function (event, ui) {
                    stopFunc(event, ui);
                },
            }).disableSelection();

            if ($('.sliderTitle').css('display') == 'inline-block') {
                $('.sliderTitle,.fixedBottom').hide();
                $('.recentDocSlider').hide();
                $scope.$parent.$parent.showHideSlider = false;
                $scope.$apply();
            } else {
                $('.sliderTitle, .fixedBottom').show();
                $('.recentDocSlider').hide();
            }
        };
        if ($scope.isRequestClicked) {
            $('.sliderTitle,.fixedBottom').hide();
            $('.recentDocSlider').hide();
            $scope.$parent.$parent.showHideSlider = false;
            $timeout(function () {
                initializeScrollNav();
                setTimeout(function () {
                })
            }, 1200);
        }
        //Navigation Configuration END

        $rootScope.showUploadlogpopuprootCall = false;
        $scope.onUploadlogpopupShowRootCall = function (e) {
            $rootScope.showUploadlogpopuprootCall = true;
        };
        $rootScope.showUploadExcelrootCall = false;
        $scope.onUploadExcelShowRootCall = function (selectedItem) {
            if (selectedItem == "invoice") {
                $rootScope.onPage = "platformInvoiceNav";
            }
            else if (selectedItem == "contract") {
                $rootScope.onPage = "platformContractNav";
            }
            $rootScope.showUploadExcelrootCall = true;
        };
        $rootScope.expressReqPopupRootCall = false;
        $scope.expressReqPopupRootCallFunc = function (e) {
            $rootScope.expressReqPopupRootCall = true;
            $rootScope.popupTitle = 'EXPRESS ORDER';
            $rootScope.popupType = "order";
            $scope.req = false;
        };

        $rootScope.contractQuickCreateRootCall = false;
        $scope.contractQuickCreate = function (e) {
            $rootScope.contractQuickCreateRootCall = true;
        };
        $rootScope.currencyRootOptions = [{
            "title": "USD"
        }, {
            "title": "EUR"
        }];
        $rootScope.selectedRootCurrency = { "title": "USD" };

        /*Callback for each item Click*/
        var creation = {
            msg: "How would you like to create your Requisition?",
            options: [
				{
				    "title": "Using Non-Catalog",
				    "icon": "#icon_CreateBlank",
				    "result": "create"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "createfromtemplate",
				},
				{
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "createfromexisting",
				},
				{
				    "title": "Using Catalog",
				    "icon": "#icon_Catalog",
				    "result": "fromcatalog",
				},
				{
				    "title": "Using Procurement Profile",
				    "icon": "#icon_ProcProfile",
				    "result": "procurementProfile",
				}
            ]
        };

        var RFxcreation = {
            msg: "How would you like to create your RFX?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template",
				},
				{
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "createfromexisting",
				},
				{
				    "title": "Upload Document",
				    "icon": "#icon_Upload",
				    "result": "upload"
				}
            ]
        };

        var auctionCreation = {
            msg: "How would you like to create your Auction?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template",
				},
				{
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "createfromexisting",
				}
            ]
        };

        var POcreation = {
            msg: "How would you like to create your Should Cost Analysis?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
                {
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "editexisting"
				},
				{
				    "title": "Upload Document",
				    "icon": "#icon_Upload",
				    "result": "expressorder"
                },
                {
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template"
				}, 
            ]
        };

        var contractCreation = {
            msg: "How would you like to create your Contract?",
            options: [
				{
				    "title": "Quick Create",
				    "icon": "#icon_QuickCreate",
				    "result": "quickcreate"
				},
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "editexisting"
				},
				{
				    "title": "Upload Document",
				    "icon": "#icon_Upload",
				    "result": "excel"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template"
				}
            ]
        };
        var contractCreation = {
            msg: "How would you like to create your Contract?",
            options: [
				//{
				//    "title": "Quick Create",
				//    "icon": "#icon_QuickCreate",
				//    "result": "quickcreate"
				//},
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "editexisting"
				},
				{
				    "title": "Upload Document",
				    "icon": "#icon_Upload",
				    "result": "excel"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template"
				},

                	{
                	    "title": "Using Wizard",
                	    "icon": "#icon_wizard",
                	    "result": "template"
                	}
            ]
        };

        //var actionBoxCount = contractCreation.options.length;
       
        //for (var i = 0; i < actionBoxCount; i++) {
        //    if (actionBoxCount <= 5) {
               
        //    }
        //};

        //console.log("testCount", actionBoxCount);

        var formCreation = {
            msg: "How would you like to create your Form?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "editexisting"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template"
				}
            ]
        };
        var scorecardCreation = {
            msg: "How would you like to create your Scorecard?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Copy Existing",
				    "icon": "#icon_RfxDraft",
				    "result": "editexisting"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template"
				}
            ]
        };
        var blanketPOCreation = {
            msg: "How would you like to create your Blanket PO?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Using Template",
				    "icon": "#icon_Template",
				    "result": "template"
				}
            ]
        };
        var InvoiceCreation = {
            msg: "How would you like to create your Invoice?",
            options: [
                {
                    "title": "From PO",
                    "icon": "#icon_RfxDraft",
                    "result": "scannedInv",
                    "isDisable": true
                },
                {
                    "title": "Using Scanned Image",
                    "icon": "#icon_RfxDraft",
                    "result": "scannedInv"
                },
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Upload Document",
				    "icon": "#icon_RfxDraft",
				    "result": "excel"
				},
				{
				    "title": "Using Payment Request",
				    "icon": "#icon_Upload",
				    "result": "excel",
				    "isDisable": true
				}
            ]
        };
        var IRCreation = {
            msg: "How would you like to create your IR?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Using Scanned Invoice",
				    "icon": "#icon_RfxDraft",
				    "result": "scannedInv",
				    "isDisable": true
				},
				{
				    "title": "Upload Document",
				    "icon": "#icon_Upload",
				    "result": "excel"
				}
            ]
        };

        var ReceiptCreation = {
            msg: "How would you like to create your Receipt?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "Using Scanned Image",
				    "icon": "#icon_RfxDraft",
				    "result": "scannedInv",
				    "isDisable": true
				}
            ]
        };

        var ASNCreation = {
            msg: "How would you like to create your ASN?",
            options: [
				{
				    "title": "Using Blank Form",
				    "icon": "#icon_CreateBlank",
				    "result": "blank"
				},
				{
				    "title": "From PO",
				    "icon": "#icon_RfxDraft",
				    "result": "fromPO"
				}
            ]
        };

        $rootScope.smartNavCallback = function (item) {
            switch (item.name) {
                case "requisition":
                    $scope.callCreationPhase(creation, function (result) {
                        if (result == "fromcatalog") {
                            $state.go('catalog.requestercatalog.landing');
                        }
                        if (result == "createfromtemplate") {
                            $state.go('p2p.template', { templatefor: 'requisition' });
                        }
                        if (result == "createfromexisting") {
                            $state.go('expandedLandingList', { doctype: 'requisition' });
                        }
                        if (result == "create") {
                            $state.go('p2p.req.new');
                        }
                        if (result == "procurementProfile") {
                            $state.go('p2p.procProfile.templateList');
                       
                        }

                    });
                    return;
                    break;

                case "rfx":
                    $scope.callCreationPhase(RFxcreation, function (result) {
                        if (result == "blank") {
                            $state.go('sourcing.rfx.new');
                        }
                        if (result == "template") {
                            $state.go('sourcing.rfx.templateList', { mode: "existing" });
                        }
                        if (result == "createfromexisting") {
                            $state.go('expandedLandingList', { doctype: 'RFX', pagefor: 'manage', referrer: 'manageRfx' });
                        }
                        if (result == "upload") {
                            $scope.onUploadlogpopupShowRootCall();
                        }
                    });
                    return;
                    break;

                case "auction":
                    $scope.callCreationPhase(auctionCreation, function (result) {
                        if (result == "blank") { }
                        if (result == "template") { }
                        if (result == "createfromexisting") { }
                    });
                    return;
                    break;

                case "purchaseOrder":
                    $scope.callCreationPhase(POcreation, function (result) {
                        if (result == "template") {
                            $state.go('p2p.template', { templatefor: 'order' });
                        }
                        // if (result == "blank") {
                        //     $state.go('p2p.order.new');
                        // }
                        // if (result == "expressorder") {
                        //     $scope.expressReqPopupRootCallFunc();
                        //     //$scope.popupTitle = 'EXPRESS ORDER';
                        //     //$scope.req = true;
                        // }
                        // if (result == "editexisting") {
                        //     $state.go('expandedLandingList', { doctype: 'order' });
                        // }
                    });
                    return;
                    break;

                case "contract":
                    $scope.callCreationPhase(contractCreation, function (result) {
                        if (result == "quickcreate") {
                            $scope.contractQuickCreate();
                        }
                        if (result == "blank") {
                            $state.go('contract.new');
                        }
                        if (result == "template") {
                            $state.go('contract.templateList');
                        }
                        if (result == "blank") {
                            $state.go('contract.new');
                        }
                        if (result == "excel") {
                            //	location.href = "#/contract/upload";
                            $scope.onUploadExcelShowRootCall("contract");

                        }
                        if (result == "editexisting") {
                            $state.go('contract.templateList', { mode: "existing" });
                            //location.href = "#/landinglist?doctype=contract";
                        }
                    });
                    return;
                    break;
                case "form":
                    $scope.callCreationPhase(formCreation, function (result) {

                        if (result == "blank") {
                            $state.go('supplier.form');
                        }
                        if (result == "template") {
                            $state.go('contract.templateList');
                        }

                        if (result == "editexisting") {

                        }
                    });
                    return;
                    break;
                case "scorecard":
                    $scope.callCreationPhase(scorecardCreation, function (result) {

                        if (result == "blank") {
                            $state.go('supplier.scorecard');
                        }
                        if (result == "template") {

                        }

                        if (result == "editexisting") {

                        }
                    });
                    return;
                    break;

                case "blanket_po":
                    $scope.callCreationPhase(blanketPOCreation, function (result) {
                        if (result == "blank") {
                            $state.go('contract.new', { mode: "blanket" });
                        }
                        if (result == "template") {
                            return;
                        }

                    });
                    return;
                    break;

                case "invoice":
                    $scope.callCreationPhase(InvoiceCreation, function (result) {
                        if (result == "blank") {
                            $state.go('p2p.inv.create');
                        }
                        if (result == "scannedInv") {
                            location.href = "#/landinglist?doctype=scannedInvoice";
                        }
                        if (result == "excel") {
                            $scope.onUploadExcelShowRootCall("invoice");
                        }
                    });
                    return;
                    break;

                case "ASN":
                    $scope.callCreationPhase(ASNCreation, function (result) {
                        if (result == "blank") {
                            location.href = "#/p2p/asn/new?status=Draft";
                        }
                        if (result == "fromPO") {
                            location.href = "#/landinglist?pagefor=manage&doctype=order";
                        }

                    });
                    return;
                    break;

                case "invoiceReconciliation":
                    //location.href = "#/landinglist?doctype=invoiceReconciliation";
                    location.href = "#/landinglist?doctype=selectInvoice";
                    return;
                    break;

                case "receipts":
                    $scope.callCreationPhase(ReceiptCreation, function (result) {
                        if (result == "blank") {
                            $state.go('p2p.receipt.new');
                        }
                    });
                    return;
                    break;

                case "report":
                    $scope.callCubeCreationPhase(function (result) {
                        if (result == "blank") {
                            debugger;
                            $state.go('p2p.receipt.new');
                        }
                    });
                    return;
                    break;

                default: location.href = item.href;
                    break;
            }
        }


        //C-B-R data

        $rootScope.businessUnitRootData = [
			  {
			      "name": "Business unit 0",
			      "check": false,
			      "value": [
                    {
                        "name": "Business unit child-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-2",
                              "check": false
                          }
                        ]
                    },
                    {
                        "name": "Business unit child-1-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-1-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-2",
                              "check": false
                          }
                        ]
                    }
			      ]
			  },
			  {
			      "name": "Business unit 1",
			      "check": false,
			      "value": [
                    {
                        "name": "Business unit child-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-2",
                              "check": false
                          }
                        ]
                    },
                    {
                        "name": "Business unit child-1-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-1-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-2",
                              "check": false
                          }
                        ]
                    }
			      ]
			  },
			  {
			      "name": "Business unit 2",
			      "check": false,
			      "value": [
                    {
                        "name": "Business unit child-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-2",
                              "check": false
                          }
                        ]
                    }
			      ]
			  }
        ];
        $rootScope.showFormRootBU = false;
        $rootScope.businessUnitDatainitialDisplayRootText = 'Choose Business Unit';
        $rootScope.categoryRootData = [
         {
             "name": "BUSINESS TRAVEL",
             "check": false,
             "value": [
               {
                   "name": "BUSINESS TRAVEL",
                   "check": false,
                   "value": [
                     {
                         "name": "AIR TRAVEL",
                         "check": false
                     },
                     {
                         "name": "CAR RENTAL",
                         "check": false
                     },
                     {
                         "name": "CONCIERGE SERVICES",
                         "check": false
                     },
                     {
                         "name": "HOTEL",
                         "check": false
                     },
                     {
                         "name": "PARKING AND TOLLS",
                         "check": false
                     },
                     {
                         "name": "OTHER TRAVEL & ENTERTAINMENT",
                         "check": false
                     },
                     {
                         "name": "GROUND TRANSPORTATION",
                         "check": false
                     }
                   ]
               }
             ]
         },
      {
          "name": "IT/ TELECOM",
          "check": false,
          "value": [
                {
                    "name": "IT HARDWARE",
                    "check": false
                },
                {
                    "name": "IT SERVICES",
                    "check": false
                },
                {
                    "name": "IT SOFTWARE & SUPPORT",
                    "check": false
                },
                {
                    "name": "OTHER IT/TELECOM",
                    "check": false
                },
                {
                    "name": "TELECOM EQUIPMENT",
                    "check": false
                }
          ]
      },
         {
             "name": "CAPITAL",
             "check": false,
             "value": [
               {
                   "name": "CAPITAL EQUIPMENT",
                   "check": false,
                   "value": [
                     {
                         "name": "CONSTRUCTION EQUIPMENT",
                         "check": false
                     },
                     {
                         "name": "ELECTRICAL MACHINERY",
                         "check": false
                     },
                     {
                         "name": "ENVIRONMENT & ENERGY EQUIPMENT",
                         "check": false
                     },
                     {
                         "name": "MATERIAL HANDLING EQUIPMENT",
                         "check": false
                     },
                     {
                         "name": "PROCESSING EQUIPMENT",
                         "check": false
                     }
                   ]
               }
             ]
         },
         {
             "name": "ENERGY & UTILITIES",
             "check": false,
             "value": [
               {
                   "name": "ENERGY",
                   "check": false,
                   "value": [
                     {
                         "name": "OTHER ENERGY & UTILITIES",
                         "check": false
                     },
                     {
                         "name": "WASTE MANAGEMENT",
                         "check": false
                     },
                     {
                         "name": "WATER/SEWAGE",
                         "check": false
                     }
                   ]
               }
             ]
         }
        ];

        $rootScope.showFormRootC = false;
        $rootScope.categoryDatainitialDisplayRootText = 'Choose Category';
        $rootScope.showRegionRoot = false;
        $rootScope.RegionDatainitialDisplayRootText = 'Choose Region';
        $rootScope.regionRootData = [{
            "name": "Asia",
            "value": [
					{
					    "name": "India",
					},
					{
					    "name": "Japan",
					},
					{
					    "name": "Nepal",
					}

            ]
        }];
        //$rootScope.regionRootData = [{
        //    "name": "Asia"
        //},
        //{
        //    "name": "Asia1"
        //},
        //{
        //    "name": "Asia2"
        //},
        //{
        //    "name": "Asia3"
        //}, {
        //    "name": "Asia4"
        //}];
        $rootScope.catPopUpShowRootCallback = function () {
            $rootScope.contractQuickCreateRootCall = false;
        }
        $rootScope.catPopUpOnHideRootCallback = function (e) {
            $rootScope.contractQuickCreateRootCall = true;
        }
    }

})(angular);

