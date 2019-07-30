'use strict';

angular.module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pInvCtrl
 * @description
 * Controller of P2P Invoice.
 */
    .controller('p2pInvCtrl', ['$scope','jsonToGrid', p2pInvCtrlFunc])
    .controller('shipToCtrl', ['$scope', '$rootScope', shipToCtrlFunc])
    .controller('popupShipToCtrl', ['$scope', '$rootScope', popupShipToCtrlFunc]); 
/**
 * @ngdoc method
 * @name p2pInvCtrlFunc
 * @methodOf SMART2.controller:p2pInvCtrl
 * @description
 * The method of the p2pInvCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function p2pInvCtrlFunc($scope, jsonToGrid) {


	$scope.invoiceExceptionPopupUrl = "p2p/inv/views/popupInvoiceException.html";


	$scope.invoiceExceptionPopup = false;
	$scope.invoiceExceptionPopupCall = function () {
		$scope.invoiceExceptionPopup = true;
	};
	$scope.invoiceExceptionPopupOnHideCallback = function () {
		$scope.invoiceExceptionPopup = false;
	};

	$scope.buyInvoiceExceptionPopupUrl = "p2p/inv/views/popupBuyInvoiceException.html";


	$scope.buyInvoiceExceptionPopup = false;
	$scope.buyInvoiceExceptionPopupCall = function () {
		$scope.buyInvoiceExceptionPopup = true;
	};
	$scope.buyInvoiceExceptionPopupOnHideCallback = function () {
		$scope.buyInvoiceExceptionPopup = false;
	};
	$scope.invoiceExceptionGridData =
	   {
	   	"headerData": [{
	   		"dataType": "string",
	   		"visible": true,
	   		"title": "Items",
	   		"align": "left",
	   		"sortable": true,
	   		"sortType": "desc",
	   		"datamappingkey": "item"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Ordered Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "ordered_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Received Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "received_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Invoice Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "invoice_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Total Invoice Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "total_invoice_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Tolerance(- +)",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "tolerance"
	   	}],
	   	"rowData": [
			{
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}, {
				"item": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5"

			}]
	   };

	$scope.invoiceExceptionGridConfig = {
		headerData: jsonToGrid.obtainHeaderData($scope.invoiceExceptionGridData.headerData, ['']),
		rowData: $scope.invoiceExceptionGridData.rowData,
		dimension: {
			width: '100%',
			height: '100%'
		}

	};

	$scope.buyInvoiceExceptionGridData =
	   {
	   	"headerData": [{
	   		"dataType": "string",
	   		"visible": true,
	   		"title": "Description",
	   		"align": "left",
	   		"sortable": true,
	   		"sortType": "desc",
	   		"datamappingkey": "description"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Ordered Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "ordered_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Received Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "received_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Invoice Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "invoice_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Total Invoice Quantity",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "total_invoice_quantity"
	   	}, {
	   		"dataType": "decimal",
	   		"visible": true,
	   		"title": "Tolerance(- +)",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "tolerance"
	   	}, {
	   		"dataType": "string",
	   		"visible": true,
	   		"title": "Match Status",
	   		"align": "right",
	   		"sortable": true,
	   		"sortType": "asc",
	   		"datamappingkey": "match_status"
	   	}],
	   	"rowData": [
			{
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status":"-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}, {
				"description": "Error description comes here",
				"ordered_quantity": "10",
				"received_quantity": "8",
				"invoice_quantity": "10",
				"total_invoice_quantity": "2.0",
				"tolerance": "5",
				"match_status": "-"

			}]
	   };

	$scope.buyInvoiceExceptionGridConfig = {
		headerData: jsonToGrid.obtainHeaderData($scope.buyInvoiceExceptionGridData.headerData, ['']),
		rowData: $scope.buyInvoiceExceptionGridData.rowData,
		dimension: {
			width: '100%',
			height: '100%'
		}

	};

    	
};

function shipToCtrlFunc($scope, $rootScope) {

    


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

function popupShipToCtrlFunc($scope) {
    $scope.typeaheadLabel = "Ship To";
    $scope.options = [
                        { "shipTo": "Mumbai", "shipToAdd": "7th Floor, Building 3 Plot # 3 TTC Industrial Area MIDC Thane Belapur Road Airoli Navi Mumbai 400 708" },
                        { "shipTo": "Hyderabad", "shipToAdd": "Western Pearl, 8th Floor Next to Google Building, Kondapur, Hitech-city Hyderabad 500084" },
                        { "shipTo": "Shanghai", "shipToAdd": "Cross Tower, #318 Fu Zhou Road,HuangPu District, Shanghai" },
                        { "shipTo": "Singapore", "shipToAdd": "89 Short Street, #B1-11 Golden Wall Centre, Singapore-188216" },
                        { "shipTo": "Sydney", "shipToAdd": "Australia Square 2000 NSW, Australia" },
                        { "shipTo": "London", "shipToAdd": "GEP, 22 Tudor Street, London, EC4Y 0AY" },
                        { "shipTo": "Prague", "shipToAdd": "Hradcanská Office Center Milady Horákové 116/109, Prague 6, 160 00 Czech Republic" },
    ];
    $scope.selected = $scope.options[0];
    $scope.selectedBillTo = $scope.options[0];
    $scope.selectedDeliverTo = $scope.options[0];
    $scope.showLocationPopup = false;
    $scope.showLocationPopupFn = function () {
        $scope.showLocationPopup = true;
    };
    $scope.showLocationPopupClBack = function () {
        $scope.showLocationPopup = false;
    };
}