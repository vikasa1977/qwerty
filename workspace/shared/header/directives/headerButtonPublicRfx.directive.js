(function() {
    'use strict';
    angular
        .module('SMART2')
        .directive('headerButton', ['$log', '$timeout', '$sce', headerButtonFunc]);

    function headerButtonFunc($log, $timeout, $sce) {
        return {
            scope: {
				showCrossIcon : "=showCrossIcon",
                config: '=',
                resetPanes: '&',
                toggleOverlay: '&',
                clickedOnProfile:'&',
                isLast: '@',
                remainingItems: '=',
				idx: '@'
            },
            templateUrl: 'shared/header/directives/headerButtonPublicRfxTemplate.html',
            replace: true,
            link: function($scope, iElm, iAttrs, controller) {
                $scope.toggle = toggle;
				$scope.isSideMenuOpen = $scope.showCrossIcon;
                // $scope.getConfig = function() {
                //     return JSON.parse($scope.config);
                // };

                $scope.marginRight = "";
                if ($scope.config.isUserProfile) {
                    $scope.config.icon = $sce.getTrustedResourceUrl($sce.trustAsResourceUrl($scope.config.icon));
                }

                var iconWidth = 54,
                    parentPaddingRight = 10,
                    siderWidth = 320; //, margin-right: 148px;;

                $(document).on('click', function ($event) {
                    if ($event) {
                        if ($($event.target).attr('id') == 'sidenav-overlay') {
                            $('.fixed-action-btn').css('display', 'block');
                        }
                    }
                });
				$scope.$watch("showCrossIcon",function(newval){
					$scope.isSideMenuOpen = newval;
				});

                function toggle(config) {
					 var newState = !config.showPane;
					if(newState){
						$scope.isSideMenuOpen = newState;
						if ($scope.isLast) {
							if ((typeof $scope.isLast).toLowerCase() === "string")
								$scope.isLast = $scope.isLast.toLowerCase() === "true" ? true : false
						}
						$scope.resetPanes();
						if (!$scope.isLast) {
							if (newState) {
								//config.marginRight = { 'marginRight': (siderWidth - ((((Object.keys($scope.remainingItems).length - (Number($scope.idx)))) * iconWidth) + parentPaddingRight)) + "px" };
								config.marginRight="";                           
							   $('.fixed-action-btn').css('display', 'none');
								
							} else {
								config.marginRight = "";
								$('.fixed-action-btn').css('display', 'block');
							}
						} else {
							config.marginRight = "";
							if (newState) {
								$('.fixed-action-btn').css('display', 'none');
							} else {
								$('.fixed-action-btn').css('display', 'block');
							}
						}
						config.active = newState;
						angular.element('.nav-right-buttons li a').css('pointer-events','none');
						$scope.toggleOverlay({ val: newState });
						$timeout(function() {
							config.showPane = newState;
							angular.element('.nav-right-buttons li a').css('pointer-events', 'auto');
							if(!$scope.isLast) {
								angular.element('.currentActive > a').css({
									"cursor":"default"
								});
							}
							
						}, 100);
					
					}
				}
            }
        };
    }
})(angular);