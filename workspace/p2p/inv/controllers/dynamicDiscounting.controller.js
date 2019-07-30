'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pInvCtrl
 * @description
 * Controller of P2P Invoice.
 */
    .controller('tableDataCtrl', ['$scope', 'jsonToGrid', '$http', '$rootScope', '$timeout', tableDataCtrlFunc])
    .controller('editbuttonCtr', ['$scope', '$rootScope', editbuttonCtrFunc]);

function editbuttonCtrFunc($scope, $rootScope) {
			$scope.editing = true;
			$scope.toggleEditing = function () {
				$scope.editing = !$scope.editing;
				$rootScope.$broadcast("toggleTextfield", { state: $scope.editing });
			};

		};

/**
 * @ngdoc method
 * @name p2pInvCtrlFunc
 * @methodOf SMART2.controller:p2pInvCtrl
 * @description
 * The method of the p2pInvCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function tableDataCtrlFunc($scope, jsonToGrid, $http, $rootScope, $timeout) {

	

	

    $scope.createReceiptPopupUrl = "p2p/inv/views/createReceiptPopup.html";

    $scope.createReceiptPopup = false;
    $scope.createReceiptPopupCallback = function (e) {
        $scope.createReceiptPopup = true;
    };
    $scope.createReceiptOnHideCallback = function () {
        $scope.createReceiptPopup = false;
    };

 
    $scope.gridData =
        {
            "headerData": [
                {
                    "dataType": "string",
                    "visible": true,
                    "title": "",
                    "align": "left",
                    "sortable": false,
                    "sortType": "desc",
                    "checkbox": "true",
                    "datamappingkey": "checkbox"
                },
                {
                    "dataType": "string",
                    "visible": true,
                    "title": "Sr.No.",
                    "align": "left",
                    "sortable": false,
                    "sortType": "desc",
                    "checkbox": "true",
                    "datamappingkey": "srNo"
                },
                {
                "dataType": "string",
                "visible": true,
                "title": "Item No.",
                "align": "left",
                "sortable": false,
                "sortType": "desc",
                "datamappingkey": "itemNo"
            }, {
                "dataType": "string",
                "visible": true,
                "title": "Items",
                "align": "left",
                "sortable": true,
                "sortType": "asc",
                "datamappingkey": "items"
            }, {
                "dataType": "Number",
                "visible": true,
                "title": "Ordered Quantity",
                "align": "right",
                "sortable": true,
                "sortType": "asc",
                "datamappingkey": "orderedQuantity"
            }, {
                "dataType": "string",
                "visible": true,
                "title": "UOM",
                "align": "right",
                "sortable": true,
                "sortType": "asc",
                "datamappingkey": "uom"
            }, {
                "dataType": "Number",
                "visible": true,
                "title": "Received Quantity",
                "align": "right",
                "sortable": true,
                "sortType": "asc",
                "datamappingkey": "receivedQuantity"
            }, {
                "dataType": "Number",
                "visible": true,
                "title": "Accepted Quantity",
                "align": "right",
                "sortable": true,
                "sortType": "asc",
                "datamappingkey": "acceptedQuantity"
            },
            {
            	"dataType": "string",
                "visible": true,
                "title": " ",
                "align": "right",
                "sortable": true,
                "sortType": "asc",
                "datamappingkey": "status"
            }],
            "rowData": [
                {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Over Received"
            

                }, {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Fully Received"

                }, {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Partially Received"

                }, {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Not Received"

                }, {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Over Received"

                }, {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Fully Received"

                }, {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Not Received"

                }, {
                	"checkbox": "",
                    "srNo": "1",
                    "itemNo": "ADBC - 9870",
                    "items": "Apple",
                    "orderedQuantity": "2",
                    "uom": "Each",
                    "receivedQuantity": "10",
                    "acceptedQuantity": "2",
                    "status": "Partially Received"

                }]
        };

    $scope.gridConfig = {
        headerData: jsonToGrid.obtainHeaderData($scope.gridData.headerData, ['']),
        rowData: $scope.gridData.rowData,
        dimension: {
            width: '100%',
            height: '100%'
        },
        headerCellRenderer: function (e) {
        	var headerCellContent;

        	switch (e.colDef.field) {
        		case 'checkbox':
        			headerCellContent = '<smart-checkbox class="input-chk" fill="true" ></smart-checkbox>'; break;
        		default:
        			headerCellContent = '<span>' + e.value + '</span>'; break;
        	}

        	return headerCellContent;
        },
        angularCompileHeaders: true,
        cellRenderer: function (e) {
            if (e.colDef.field == "status") {
                /* get e.value */
                switch (e.value) {
                    case 'Not Received': return '<span class="notReceived">' + e.value + '</span>'; break;
                    case 'Partially Received': return '<span  class="partiallyReceived">' + e.value + '</span>'; break;
                    case 'Fully Received': return '<span  class="fullyReceived">' + e.value + '</span>'; break;
                    case 'Over Received': return '<span  class="overReceived">' + e.value + '</span>'; break;
                }
            }
            else if (e.colDef.field == "checkbox") {
            	return '<smart-checkbox class="input-chk" fill="true" ></smart-checkbox>'
            }
            
            else {
                return '<span>' + e.value + '</span>'
            }
        },

   

    };



    var invDiscouting = {
        method: 'GET',
        url: 'p2p/inv/models/dynamicDiscounting.json'
    };


    $rootScope.$on('toggleTextfield', function (e, args) {
    	//toggleTextfieldStates(args.state);
    	   
    	$scope.$apply(function () {
    		$scope.config.sections[0].rows[0].properties[0].attributes.disable = true;
    		$scope.config.sections[0].rows[0].properties[1].attributes.readonly = true;
    		$scope.config.sections[0].rows[0].properties[4].attributes.readonly = true;
    	});
    	
    });

    var toggleTextfieldStates = function (args) {
    		
    	
    };


    $http(invDiscouting).then(function (response) {

        $scope.dataModel = response.data.dataModel;
        
        $scope.config = response.data.formConfig;

        var propertiesArray = response.data.formConfig.sections[0].rows[0].properties;
        //propertiesArray[0].attributes.disable = true;
        //propertiesArray[1].attributes.readonly = true;
        //propertiesArray[4].attributes.readonly = true;

    }, function (error) {
        console.log(JSON.stringify(error));
    });



};



