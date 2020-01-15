/**
 * @memberof SMART2
 * @ngdoc directive
 * @name Popup
 * @description This directive is useful for creating a popup.
 * 
 * @attr {String} template-url
 *    Template url that is expected to appear as popup contents
 * @attr {Boolean} show
 *    Popup will toggle as soon as value of this attribute changes
 * @attr {String} modal-type
 *    Modal type. Possible values are 'large' or 'small'.
 * @attr {Boolean} dismissible
 *   If set to true, popup will not hide when clicked outside. Default value is true.
 * @attr {Function} on-hide
 *    Callback function when popup hides
 * 
 * @example
 Controller:
$scope.categoryData = [
	  {
	  	"name": "Category 0",
	  	"check": false,
	  	"value": [
		  {
		  	"name": "Category child-0",
		  	"check": false,
		  	"value": [
			  {
			  	"name": "Category grand-child-0",
			  	"check": false
			  },
			  {
			  	"name": "Category grand-child-1",
			  	"check": false
			  },
			  {
			  	"name": "Category grand-child-2",
			  	"check": false
			  }
		  	]
		  }
	  	]
	  },
	  {
	  	"name": "Category 1",
	  	"check": false,
	  	"value": [
		  {
		  	"name": "Category child-0",
		  	"check": false,
		  	"value": [
			  {
			  	"name": "Category grand-child-0",
			  	"check": false
			  },
			  {
			  	"name": "Category grand-child-1",
			  	"check": false
			  },
			  {
			  	"name": "Category grand-child-2",
			  	"check": false
			  }
		  	]
		  }
	  	]
	  },
	  {
	  	"name": "Category 2",
	  	"check": false,
	  	"value": [
		  {
		  	"name": "Category child-0",
		  	"check": false,
		  	"value": [
			  {
			  	"name": "Category grand-child-0",
			  	"check": false
			  },
			  {
			  	"name": "Category grand-child-1",
			  	"check": false
			  },
			  {
			  	"name": "Category grand-child-2",
			  	"check": false
			  }
		  	]
		  }
	  	]
	  }
	];
	
	$scope.categoryPopupUrl = 'shared/popup/views/smartCatPopupMultiLevel.html';
	$scope.showFormC = false;
	$scope.categoryDatainitialDisplayText = 'Category';
	$scope.categoryPopUpOnHideCallback = function() {}
Usage:
	<div class="col s4 input-field">
		<div class="grey-text fontSize12" ng-show="showFormC">Category</div>
		<span id="categoryBtn" data-target="category" class="catpopup-title" ng-class="{'marginTop16' : !showFormC}">{{ categoryDatainitialDisplayText }}</span>
	</div>
	
	<smart-list-popup template-url="{{categoryPopupUrl}}" type="small" default-text="Category" show="showFormC" mode="true" selected-value="categoryData" modal-content="category" modal-button="categoryBtn" initial-display-text="categoryDatainitialDisplayText" callback="categoryPopUpOnHideCallback(e)"></smart-list-popup>

 */
(function () {
	'use strict';
	angular.module('SMART2')
	  .directive('smartListPopup', ['$filter', '$timeout', function ($filter, $timeout) {
	  	return {
	  		restrict: 'E',
	  		replace: true,
	  		scope: {
	  			selectedValue: "=",
	  			initialDisplayText: "=",
	  			show: "=",
	  			readMode: "=",
	  			openpopup: "&",
	  			onSubmitcallback: "&",
	  			callback: "&"
	  		},
	  		link: function (scope, element, attrs) {
	  			scope.modalContent = attrs.modalContent;
	  			scope.modalButton = attrs.modalButton;
	  			scope.modalType = attrs.type;
	  			scope.templateUrl = attrs.templateUrl;
	  			scope.readModeText = attrs.readModeText;
	  			scope.defaultText = attrs.defaultText;
	  			scope.TotalList = 0;
	  			scope.selectedValueTrue = 0;
	  			if (angular.fromJson(attrs.mode)) {
	  				scope.writemode = {
	  					'state': !scope.show
	  				};
	  			}

	  			var selectedDataTemp = [];
	  			function selfLooping(selectedData, arg, ind) {
	  				angular.forEach(selectedData, function (value, key) {
	  					value.check = arg;
	  					value.fillpartial = arg;
	  					if (value.hasOwnProperty('value')) {
	  						selfLooping(value.value, arg)
	  					}
	  				});
	  			}

	  			function selfLoopingCheckReturn(selectedData) {
	  				angular.forEach(selectedData, function (value, key) {
	  					if (value.check === true) {
	  						selectedDataTemp.push(value)
	  					}
	  					if (value.hasOwnProperty('value')) {
	  						selfLoopingCheckReturn(value.value)
	  					}
	  				});
	  				return selectedDataTemp;
	  			}

				// Need to optimize th code
	  			//if (angular.fromJson(attrs.mode)) {
	  				var selectedValueTrueCount = 0;
	  				var Counter = 0;
	  				(function selfLoopingLengthReturn(selectedValue) {
	  					angular.forEach(selectedValue, function (value, key) {
	  						if (value.check) {
	  							selectedValueTrueCount++;
	  						}
	  						Counter++;
	  						if (value.hasOwnProperty('value')) {
	  							selfLoopingLengthReturn(value.value)
	  						}
	  					});
	  				})(scope.selectedValue);

	  				scope.TotalList = Counter;
	  				scope.selectedValueTrue = selectedValueTrueCount;	  				
	  				scope.onChangeChild = function (arg, ind, parentsind) {
					
	  					selfLooping([scope.selectedValue[parentsind].value[ind]], arg, ind);

	  					
	  					scope.selectedValue[parentsind].value[ind].check = arg;

	  					scope.selectedValue[parentsind].value[ind].fillpartial = false;
	  				

	  					var cartlength = scope.selectedValue[parentsind]['value'].length,
							cartincre,
							checkCounter = 0;
	  					for (cartincre = 0; cartincre < cartlength; cartincre++) {
	  						if (scope.selectedValue[parentsind]['value'][cartincre].check) {
	  							checkCounter++;
	  						}
	  					}
	  					
	  					scope.selectedValue[parentsind].check = false;
	  					scope.selectedValue[parentsind].fillpartial = true;

	  					if (checkCounter === 0) {
	  						scope.selectedValue[parentsind].fillpartial = false;
	  						scope.selectedValue[parentsind].check = false;
	  					}
	  					else if (checkCounter === cartlength) {
	  						scope.selectedValue[parentsind].check = true;
	  						scope.selectedValue[parentsind].fillpartial = false;
	  					}

	  					selectedDataTemp = [];
	  					selfLoopingCheckReturn(scope.selectedValue);

	  					var initialDisplayTextTemp = selectedDataTemp;
	  					if (initialDisplayTextTemp.length > 1) {
	  						scope.initialDisplayText = initialDisplayTextTemp[0].name + " +" + (initialDisplayTextTemp.length - 1) + " More";
	  						scope.show = true;
	  					} else if (initialDisplayTextTemp.length === 1) {
	  						scope.initialDisplayText = initialDisplayTextTemp[0].name;
	  						scope.show = true;
	  					} else {
	  						scope.initialDisplayText = attrs.defaultText;
	  						scope.show = false;
	  					}
	  					scope.selectedValueTrue = initialDisplayTextTemp.length;
	  				}
	  				scope.onChangeGrandChild = function (arg, ind, parentind, parentsind) {
						
	  					var cartlength = scope.selectedValue[parentsind]['value'][parentind]['value'].length,
							cartincre,
							checkCounter = 0;
	  					for (cartincre = 0; cartincre < cartlength; cartincre++) {
	  						if (scope.selectedValue[parentsind]['value'][parentind]['value'][cartincre].check) {
	  							checkCounter++;
	  						}
	  					}

	  					scope.selectedValue[parentsind]['value'][parentind].fillpartial = true;
	  					scope.selectedValue[parentsind]['value'][parentind].check = false;

	  					if (checkCounter === 0) {
	  						scope.selectedValue[parentsind]['value'][parentind].fillpartial = false;
	  						scope.selectedValue[parentsind]['value'][parentind].check = false;
	  					}
	  					else if (checkCounter === cartlength) {
	  						scope.selectedValue[parentsind]['value'][parentind].fillpartial = false;
	  						scope.selectedValue[parentsind]['value'][parentind].check = true;
	  					}

	  					var cartlengthChild = scope.selectedValue[parentsind]['value'].length,
							cartincre,
							checkCounterChild = 0;
	  					for (cartincre = 0; cartincre < cartlengthChild; cartincre++) {
	  						if (scope.selectedValue[parentsind]['value'][cartincre].check) {
	  							checkCounterChild++;
	  						}
	  					}

	  					scope.selectedValue[parentsind].check = false;
	  					scope.selectedValue[parentsind].fillpartial = true;
	  				
	  				
	  					if (checkCounterChild === 0 && checkCounter === 0) {
	  						scope.selectedValue[parentsind].fillpartial = false;
	  						scope.selectedValue[parentsind].check = false;
	  					}
	  					else if (checkCounterChild === cartlengthChild && checkCounter === cartlength) {
	  						scope.selectedValue[parentsind].check = true;
	  						scope.selectedValue[parentsind].fillpartial = false;
	  					}
						
	  				

	  					selectedDataTemp = [];
	  					selfLoopingCheckReturn(scope.selectedValue)
	  					var initialDisplayTextTemp = selectedDataTemp;

	  					if (initialDisplayTextTemp.length > 1) {
	  						scope.initialDisplayText = initialDisplayTextTemp[0].name + " +" + (initialDisplayTextTemp.length - 1) + " More";
	  						scope.show = true;
	  					} else if (initialDisplayTextTemp.length === 1) {
	  						scope.initialDisplayText = initialDisplayTextTemp[0].name;
	  						scope.show = true;
	  					} else {
	  						scope.initialDisplayText = attrs.defaultText;
	  						scope.show = false;
	  					}
	  					scope.selectedValueTrue = initialDisplayTextTemp.length;
	  				}
	  			//}
	  			scope.onChange = function (arg, ind) {
	  			
	  				var initialDisplayTextTemp = $filter('filter')(scope.selectedValue, { check: true });
	  				if (angular.fromJson(attrs.mode)) {
	  					selfLooping([scope.selectedValue[ind]], arg, ind);
	  					selectedDataTemp = [];
	  					selfLoopingCheckReturn(scope.selectedValue);
	  				
	  					var initialDisplayTextTemp = selectedDataTemp;
	  					scope.selectedValue[ind].fillpartial = false;
	  				}

	  				if (initialDisplayTextTemp.length > 1) {
	  					scope.initialDisplayText = initialDisplayTextTemp[0].name + " +" + (initialDisplayTextTemp.length - 1) + " More";
	  					scope.show = true;
	  				} else if (initialDisplayTextTemp.length === 1) {
	  					scope.initialDisplayText = initialDisplayTextTemp[0].name;
	  					scope.show = true;
	  				} else {
	  					scope.initialDisplayText = attrs.defaultText;
	  					scope.show = false;
	  				}

	  				scope.selectedValueTrue = initialDisplayTextTemp.length;

	  			}

	  			scope.additionalFormPopUpReset = function () {
	  				selfLooping(scope.selectedValue, false);
	  				scope.initialDisplayText = attrs.defaultText;
	  				scope.selectedValueTrue = 0;
	  				scope.show = false;
	  			};
	  			scope.additionalFormPopUpOnHideCallback = function () {
	  				if (angular.isFunction(scope.onSubmitcallback)) {
	  			
	  					scope.onSubmitcallback(scope, { e: "" })
	  					
	  				}
	  			};
	  			scope.$on('$includeContentLoaded', function (event) {
	  				$timeout(function () {
	  					angular.element('#' + scope.modalButton).leanModal({
	  						dismissible: scope.$eval(attrs.dismissible),
	  						ready: function () {
								
	  							if (angular.isFunction(scope.openpopup)) {
	  						
	  								scope.$apply(function () {
	  									scope.openpopup(scope, { e: "" })
	  								});
	  							}
	  						},
	  						complete: function () {
	  							if (angular.isFunction(scope.callback)) {
	  								scope.$apply(function () {
	  									scope.callback(scope, { e: "" })
	  								});
	  							}
	  							if (angular.fromJson(attrs.mode)) {
	  								scope.writemode = {
	  									'state': !scope.show
	  								};
	  							} else {
	  								scope.selectedValue = $filter('orderBy')(scope.selectedValue, '-check');

	  							}
	  						}
	  					});
	  				}, 10);

	  			});

	  			/* 
				  HEADER SEARCH INTRACTION
				*/
	  			scope.showSearchHeader = function () {
	  				this.isActiveHeader = true;
	  				this.focusSearchHeader = true;
	  				this.hideCloseHeader = true;
	  			}
	  			scope.hideSearchHeader = function () {
	  				this.isActiveHeader = false;
	  				this.focusSearchHeader = false;
	  				this.hideCloseHeader = false;
	  			}
	  		},
	  		template: '<div id="{{ modalContent }}" ng-class="{\'modal\': true, \'modal-lg\': modalType == \'large\', \'modal-sm\': modalType == \'small\'}"><div ng-include="templateUrl"></div></div>'
	  	};

	  }]);
})();