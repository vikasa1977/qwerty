angular.module('SMART2')
    .controller('p2pPaymentReqCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', p2pPaymentReqCtrlFunc])
	.controller('shipToCtrl', ['$scope', '$rootScope', shipToCtrlFunc])
    .controller('billToCtrl', ['$scope', '$rootScope', billToCtrlFunc]);

function p2pPaymentReqCtrlFunc($scope, $rootScope, RuleEngine, $http) {

        	var isSequenceToBeMaintained;

        	/*
             *  Service call get form-config and data-model
             */

        	var req = {
        		method: 'GET',
        		url: 'p2p/req/models/createReq.json'
        	};

        	$http(req).then(function (response) {

        		$scope.dataModel = response.data.dataModel;
        		$scope.config = response.data.formConfig;
        		isSequenceToBeMaintained = response.data.isSequenceToBeMaintained;

        		var widgetItems = [];

        		for (var i = 0; i < $scope.config.sections.length; i++) {
        			$scope.config.sections[i].isVisible = $scope.config.sections[i].isMandatory;
        			if (!$scope.config.sections[i].isMandatory) {
        				widgetItems.push({
        					label: $scope.config.sections[i].label,
        					isSection: true,
        					sectionIndex: i,
        					visible: true,
        					leftIcon: $scope.config.sections[i].icon
        				});
        			}
        			else {
        				for (var j = 0; j < $scope.config.sections[i].rows.length; j++) {
        					for (var k = 0; k < $scope.config.sections[i].rows[j].properties.length; k++) {
        						$scope.config.sections[i].rows[j].properties[k].isVisible = $scope.config.sections[i].rows[j].properties[k].isVisible != undefined ? $scope.config.sections[i].rows[j].properties[k].isVisible : $scope.config.sections[i].rows[j].properties[k].isMandatory;
        						if (!$scope.config.sections[i].rows[j].properties[k].isMandatory) {
        							widgetItems.push({
        								label: $scope.config.sections[i].rows[j].properties[k].label,
        								isSection: false,
        								sectionIndex: i,
        								rowIndex: j,
        								propertyIndex: k,
        								visible: true,
        								leftIcon: $scope.config.sections[i].icon
        							});
        						}
        					}
        				}
        			}
        		}

        		$scope.widgetItems = widgetItems;

        	}, function (error) {
        		console.log(JSON.stringify(error));
        	});


        	/*
             * Get row's visible properties length
             */
        	var getVisiblePropertiesLength = function (sectionIndex, rowIndex) {
        		var visiblePropertiesLength = 0;
        		for (var i = 0; i < $scope.config.sections[sectionIndex].rows[rowIndex].properties.length; i++) {
        			if ($scope.config.sections[sectionIndex].rows[rowIndex].properties[i].isVisible) {
        				visiblePropertiesLength++;
        			}
        		}
        		return visiblePropertiesLength;
        	};


        	/*
             * Sliding menu item click handler
             */
        	$scope.onSlidingMenuClick = function (item) {
        		if (item.isSection) {
        			$scope.config.sections[item.sectionIndex].isVisible = !$scope.config.sections[item.sectionIndex].isVisible;

        			/*
                     *  isSequenceToBeMaintained is set to 'true', form-widget-section would be added 
                     *  where it is positioned in the JSON structure else 
                     *  form-widget-section would be added at the end of row
                     */
        			if (!isSequenceToBeMaintained && $scope.config.sections[item.sectionIndex].isVisible) {
        				var tmpSection = $scope.config.sections[item.sectionIndex];
        				$scope.config.sections.splice(item.sectionIndex, 1);
        				$scope.config.sections.push(tmpSection);
        				for (var i = 0; i < $scope.config.sections.length; i++) {
        					for (var j = 0; j < $scope.widgetItems.length; j++) {
        						if ($scope.config.sections[i].label == $scope.widgetItems[j].label) {
        							$scope.widgetItems[j].sectionIndex = i;
        						}
        					}
        				}
        			}
        		}
        		else {
        			/*
                     *  If row's visible properties length is 0
                     *  then splice the row and push it at the end of section
                     */
        			if (!isSequenceToBeMaintained && getVisiblePropertiesLength(item.sectionIndex, item.rowIndex) == 0) {
        				var tmpRow = $scope.config.sections[item.sectionIndex].rows[item.rowIndex];
        				$scope.config.sections[item.sectionIndex].rows.splice(item.rowIndex, 1);
        				$scope.config.sections[item.sectionIndex].rows.push(tmpRow);
        				item.rowIndex = $scope.config.sections[item.sectionIndex].rows.length - 1;
        			}

        			$scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex].isVisible = !$scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex].isVisible;

        			/*
                     *  isSequenceToBeMaintained is set to 'true', form-widget-property would be added 
                     *  where it is positioned in the JSON structure else 
                     *  form-widget-property would be added at the end of row
                     */
        			if (!isSequenceToBeMaintained && $scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex].isVisible) {
        				var tmpProperty = $scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex];
        				$scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties.splice(item.propertyIndex, 1);
        				$scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties.push(tmpProperty);
        				for (var i = 0; i < $scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties.length; i++) {
        					for (var j = 0; j < $scope.widgetItems.length; j++) {
        						if ($scope.config.sections[item.sectionIndex].rows[item.rowIndex].properties[i].label == $scope.widgetItems[j].label) {
        							$scope.widgetItems[j].propertyIndex = i;
        						}
        					}
        				}
        			}
        		}
        	};


        	/*
             * Widget panel
             */
        	$scope.showWidgetPanel = false;

        	$scope.toggleWidgetPanel = function () {
        		$scope.showWidgetPanel = !$scope.showWidgetPanel;
        	};


        	$scope.validateForm = function () {
        		RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
        		RuleEngine.execute(function (e) {
        			console.log(e);
        			// if() {
        			// }
        		});
        	};
        }

function shipToCtrlFunc($scope, $rootScope) {
    $scope.shipTo = "";

    $scope.getShiptoAddress = function () {
        if ($scope.shipTo != "") {
            $scope.showShiptoAddress = true;
        } else {
            $scope.showShiptoAddress = false;
        }

    }

    $scope.shipToAddress = "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708."
	$scope.ngModel = $scope.ngModel.data;
	$scope.toggleModal = false;

	/*
	 *  Get selected option
	 */
	var getSelectedShipToOption = function () {

		if ($scope.ngModel.shipTo) {
			for (var i = 0; i < $scope.ngModel.shipTo.length; i++) {
				if ($scope.ngModel.shipTo[i].selected == true) {
					return $scope.ngModel.shipTo[i];
				}
			}
		}
		return undefined;
	};


	var locationData = angular.copy($scope.ngModel.location);


	$scope.selectedShipToOption = getSelectedShipToOption();


	/*
	 *  Model data change listener
	 */
	$scope.$watch('ngModel.shipTo', function (newModel, oldModel) {
		if (newModel) {
			$scope.selectedShipToOption = getSelectedShipToOption();
		}
	}, true);

	$scope.showLocationPopup = false;
	$scope.showLocationPopupFn = function () {
		$scope.showLocationPopup = true;
	};
	$scope.showLocationPopupClBack = function () {
		$scope.showLocationPopup = false;
	};
}
function billToCtrlFunc($scope, $rootScope) {

    $scope.billTo = "";
    $scope.showBillAddress = false;
    $scope.billToAddress = "P.O. Box 2648, Airoli, Navi Mumbai, 98452-23458";
    $scope.billEmailId = "billing@gep.com/ 022-6324534";
    $scope.getBillAddress = function () {
        if ($scope.billTo != "") {
            $scope.showBillAddress = true
        } else {
            $scope.showBillAddress = false;
        }
    };
}