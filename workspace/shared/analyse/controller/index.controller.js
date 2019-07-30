(function (angular, SmartController) {
    'use strict';

    SmartController.create("analyseCtrl", ["$scope", "$rootScope", '$timeout', analyseController]);

    function analyseController($scope, $rootScope, $timeout) {
        // for demo code starts
        $scope.emailNotifyPopupUrl = "shared/admin/views/emailNotificationPopup.html";
        $scope.emailNotify = false;
        $scope.emailRootNotifyCallback = function (e) {
            $scope.emailNotify = true;
        };
        $scope.emailRootNotifyOnHideCallback = function (e) {
            $scope.emailNotify = false;
        };
        // for demo code ends
        $scope.HC = { init: false };
        $scope.listDisplayConfig = { "showIcon": true, "showAction": true, "importantAttribLimit": 2 };
        $scope.incrementalSpeed = true;
        $scope.allCardsContentInitial = "";
        $scope.analyseReport = true;
        $scope.cardSearchSubheader = false;
        $scope.cardManageDraftSubheader = true;
        $scope.cardAnalyzeBack = true;
        $scope.dropDownConfig = {
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'right' // Displays dropdown with edge aligned to the left of button
        };
        $scope.changeSavedView = function (title, obj) {
            $scope.selectedSavedview = { name: title };
            $timeout(function () {
                $scope.allCardsContent[obj.index].isSelected = true;
            },10);
            $timeout(function () {
                $scope.allCardsContent[obj.index].isSelected = false;
            },3000);
        };
        $scope.customGoto = function (index) {
            $rootScope.$broadcast('cardCallTheMethodOutside', index);
        }
        $scope.contentTemplate = "";
        $scope.selectedSavedview = { name: 'Analytic report' };
        $scope.allCardsContent = [{
        	name: "Spend Reports",
        	isDraggable: true,
            isSelected: false,
            index: 0,
        },{
        	name: "vision card",
        	isDraggable: true,
            isSelected: false,
            index: 0,
        },{
            name: "Spend Dashboard",
            isDraggable: true,
            isSelected: false,
            index: 1,
        }, {
            name: "Business Insight",
            isDraggable: true,
            isSelected: false,
            index: 2,
        }, {
            name: "Opportunity Finder",
            isDraggable: true,
            isSelected: false,
            index: 3,
        }, {
            name: "Feedback",
            isDraggable: true,
            isSelected: false,
            index: 4,
        }, {
            name: "Spend Analytical Report",
            isDraggable: true,
            isSelected: false,
            index: 5,
        }, {
            name: "Export Log",
            isDraggable: true,
            isSelected: false,
            index: 6,
        }, {
            name: "Dashboard",
            isDraggable: true,
            isSelected: false,
            index: 7,
        }, {
            name: "Spend Alert",
            isDraggable: true,
            isSelected: false,
            index: 8,
        }, {
            name: "Report",
            isDraggable: true,
            isSelected: false,
            index: 9,
        }, {
            name: "Spend DCC",
            isDraggable: true,
            isSelected: false,
            index: 10,
        },
		{
			name: "VI Dashboard",
			isDraggable: true,
			isSelected: false,
			index: 11,
		}/*,{
            name: "Cards",
            isDraggable: true
        }*/];
        $scope.savedViews = function () {
            var cards = $scope.allCardsContent,
                sviews = [];
            for (var i = 0; i < cards.length; i++) {
                var sv = {
                    name: cards[i].name,
                    animationClass: cards[i].animationClass,
                    isSelectedValue:cards[i].isSelected,
                    index:cards[i].index 
                };
                sviews.push(sv);
            }
            return sviews;
        }();
        $scope.onSort = function (args) {
            $scope.savedViews = linearSwap($scope.savedViews, args.startIndex, args.endIndex);
        };
        $scope.jumpTovisibleFun = function (e) {
            if (e.$slides.length > e.options.slidesToShow) {
                $scope.jumpTovisible = true;
            }
            else {
                $scope.jumpTovisible = false;
            }
        };
        $scope.responsiveSettings = [{
            method: {},
            breakpoint: 1700,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                //infinite: true,
                dots: true
            }
        }, {
            breakpoint: 1640,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        }, {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        }, {
            breakpoint: 1231,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true
            }
        }, {
            breakpoint: 830,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            }
        }];
        function linearSwap(data, sind, tind) {
            var a = data, b, c, d;
            if (sind < tind) {
                b = a.splice(sind, 1);
                c = a.splice(tind);
                a.push(b[0]);

                for (var i = 0; i < c.length; i++) {
                    a.push(c[i])
                }
                d = a;
            } else if (sind > tind) {
                b = a.splice(sind, 1);
                c = a.splice(0, tind);
                c.push(b[0]);

                for (var i = 0; i < a.length; i++) {
                    c.push(a[i])
                }
                d = c;
            }
            return d;
        }
    }
})(angular, SmartController)