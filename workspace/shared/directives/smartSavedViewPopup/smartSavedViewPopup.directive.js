(function () {
	'use strict';
	angular.module('SMART2')
	  .directive('smartSavedViewPopup', ['notification', smartSavedViewPopupFunc]);



	function smartSavedViewPopupFunc(notification) {
	    return {
	        restrict: 'E',
	        transclude: true,
	        scope: {
	            show: '=',
	            hide: '&',
	            model: '=ngModel',
	            config: '=',
	            isApplyFilter: "=",
	            isSavedFilter: "=",
	            isModified: "=",
	            openPopupSavedView: "="
	        },
	        controller: function ($scope, $element, $attrs) {

	            $scope.showSavedViewPopup = true;
	            $scope.showSaveView = true;
	            $scope.showSavedView = function () {
	                if (!$scope.isSavedFilter) {
	                    $scope.isSavedFilter = true
	                    $scope.isApplyFilter = false;
	                } else {
	                    if ($scope.isModified == true) {
	                        var config = {
	                            type: "warning",
	                            message: "Do you want to save modification in current view?",
	                            buttons: [
                                {
                                    "title": "YES",
                                    "result": "true"
                                },
                                {
                                    "title": "NO",
                                    "result": "false"
                                }
	                            ]
	                        }

	                        notification.notify(config, function (result) {
	                            $scope.isModified = false;
	                        });
	                    }
	                }

	            };

	            $scope.isMarkAsDefualt = { 'check': false };
	            $scope.showSavedViewPopup = false;
	            $scope.showSaveView = false;
	            $scope.focusSearch = false;
	            $scope.isActive = false;
	            $scope.showMe = false;

	            $scope.showSearch = function () {
	                $scope.isActive = true;
	                $scope.focusSearch = true;
	                $scope.showMe = true;
	                $scope.hideClose = true;
	            }

	            $scope.hideSearch = function () {
	                $scope.isActive = false;
	                $scope.focusSearch = false;
	                $scope.hideClose = false;
	            }


	            $scope.isMarkAsDefualtFunc = function (isMarkAsDefualttrue) {
	                if (isMarkAsDefualttrue.check) {
	                    angular.forEach($scope.config, function (value, key) {
	                        if (value.isDefault == true) {
	                            value.isDefault = false;
	                        } else
	                            if (value.name == $scope.model.name) {
	                                value.isDefault = true;
	                                return true;
	                            }
	                    });
	                    isMarkAsDefualttrue.check = false;
	                }
	            };

	            $scope.deleteItem = function (index) {
	                var config = {
	                    type: "warning",
	                    message: "Are you sure you want to delete the view ?",
	                    buttons: [
                        {
                            "title": "YES",
                            "result": "true"
                        },
                        {
                            "title": "NO",
                            "result": "false"
                        }
	                    ]
	                };


	                notification.notify(config, function (result) {
	                    if (result == true) {
	                        $scope.config.splice(index, 1);
	                    }


	                });
	            };

	            $scope.showEditor = false;

	            $scope.editCurrentViewName = function (index) {
	                $scope.config[index].showCurrentItemEditor = true;
	            }

	            $scope.getEditedviewName = { "name": "" }

	            $scope.updateViewName = function (index) {
	                $scope.config[index].name = $scope.getEditedviewName.name;
	                $scope.config[index].showCurrentItemEditor = false;
	            };

	            $scope.closeEditPanel = function (index) {
	                $scope.config[index].showCurrentItemEditor = false;
	            };

	            $scope.SaveViewName = "";
	            $scope.saveCurrentView = function (passData) {
	                if (passData != '') {
	                    if (!$scope.isApplyFilter) {

	                        $scope.isModified = false;

	                    } else {
	                        $scope.isApplyFilter = false;
	                        $scope.config.push({ 'name': passData, 'isDefualt': false, 'showCurrentItemEditor': false });
	                        $scope.model = { 'name': passData, 'isDefualt': false, 'showCurrentItemEditor': false };
	                        $scope.isSavedFilter = true;
	                        $scope.SaveViewName = '';
	                    }

	                }
	            }

	            $scope.$watch('show', function (n, o) {
	                if ($scope.openPopupSavedView == true && n == true) {
	                    $scope.showSavedViewPopup = true;
	                    $scope.showSaveView = false;
	                }
	                else if ($scope.openPopupSavedView != true && n == true) {
	                    $scope.showSavedViewPopup = false;
	                    $scope.showSaveView = true;
	                }
	                else {
	                    $scope.showSavedViewPopup = false;
	                    $scope.showSaveView = false;
	                    $scope.show = false;
	                }

	            });


	        },
	            template: '<smart-popup template-url="shared/popup/views/popupSavedView.html" show="{{showSavedViewPopup}}" on-hide="hide(e)"></smart-popup> <smart-popup template-url="shared/popup/views/popupSaveView.html" type="small" show="{{showSaveView}}" on-hide="hide(e)"></smart-popup>'

	    };

	}


})();