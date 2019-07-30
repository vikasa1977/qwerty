'use strict';

angular.module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.P2P.controller:p2pOrderCtrl
 * @description
 * Controller of P2P Orders.
 */
.controller('p2pReqLineChangesCtrl', ['$rootScope', '$scope', '$window', '$translate', '$timeout', 'storeService', '$state', 'notification', '$filter', '$http', p2pReqLineChangesCtrlFunc]);

/**
 * @ngdoc method
 * @name p2pOrderCtrlFunc
 * @methodOf SMART2.P2P.controller:p2pOrderCtrl
 * @description
 * The method of the p2pOrderCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function p2pReqLineChangesCtrlFunc($rootScope, $scope, $window, $translate, $timeout, storeService, $state, notification, $filter, $http) {
    var changeHistory = {
        method: 'GET',
        url: 'p2p/req/models/changeHistory.json'
    };

    $http(changeHistory).then(function (response) {
        $scope.lineItems = response.data.lineItems;
        $scope.headers = response.data.headers;
        $scope.splits = response.data.splits;
        $scope.lineDetailTHeadData = response.data.lineDetailTHeadData;
        $scope.lineDetailTbodyData = response.data.lineDetailTbodyData;
        $scope.lineDetailAccoutingTabData = response.data.lineDetailAccoutingTabData;
        $scope.lineDetailContractTabTHeadDataData = response.data.lineDetailContractTabTHeadDataData;
        $scope.lineDetailContractTabTbodyDataData = response.data.lineDetailContractTabTbodyDataData;
        $scope.lineDetailManufacturerTabTHeadDataData = response.data.lineDetailManufacturerTabTHeadDataData;
        $scope.lineDetailManufacturerTabTbodyDataData = response.data.lineDetailManufacturerTabTbodyDataData;
        $scope.lineDetailShippingTabTHeadDataData = response.data.lineDetailShippingTabTHeadDataData;
        $scope.lineDetailShippingTabTbodyDataData = response.data.lineDetailShippingTabTbodyDataData;
        $scope.supplierTHeadData = response.data.supplierTHeadData;
        $scope.supplierTbodyData = response.data.supplierTbodyData;
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.tabMode = $state.params.tab;
    $scope.getScrollToMoreOption = storeService.get('getScrollToMoreOption');
    if ($scope.getScrollToMoreOption != undefined && $scope.getScrollToMoreOption != "") {
        $timeout(function () {
        });
    }

    $scope.templateListHeight = '100%';
    $scope.hideShowMoreLink = true;
    $scope.tabsData = [
        {
            "title": "Line Details",
            "contentUrl": "p2p/order/views/itemNamePopupTabLineDetail.html",
            "active": true
        },
        {
            "title": "Accounting",
            "contentUrl": "p2p/order/views/itemNamePopupTabAccounting.html",
            "active": false
        },
        {
            "title": "Contract",
            "contentUrl": "p2p/order/views/itemNamePopupTabContract.html",
            "active": false
        },
        {
            "title": "Manufacturer",
            "contentUrl": "p2p/order/views/itemNamePopupTabManufacturer.html",
            "active": false
        },
        {
            "title": "Shipping",
            "contentUrl": "p2p/order/views/itemNamePopupTabShipping.html",
            "active": false
        },
        {
            "title": "Supplier",
            "contentUrl": "p2p/req/views/itemNamePopupTabSupplier.html"
        }
    ];

    for (var i = 0; i < $scope.tabsData.length; i++) {
        $scope.tabsData[i].active = false;
        if ($scope.tabsData[i].title == $scope.tabMode) {
            $scope.tabsData[i].active = true;
        }       
    }
    if ($scope.tabMode == undefined) {
        $scope.tabsData[0].active = true;
    }

    $scope.closeLineChange = function () {
        $state.go('p2p.req.viewChanges',{changeType:'changeHistory',view:'compare'});
    }

    /*item popup*/
    $scope.items = {
        'itemName': 'Polycom',
        'action': 'Added',
        'ItemNo': '1234560',
        'ContractNo': '22-65518',
        'itemAttrs': [
            {
                'dataKey': 'Unit Price(USD)',
                'dataValue': '12,500.00'
            },
            {
                'dataKey': 'Quantity',
                'dataValue': '500'

            },
            {
                'dataKey': 'UOM',
                'dataValue': 'Each'

            },
            {
                'dataKey': 'Total(USD)',
                'dataValue': '23,45,000.00'

            }
        ]
    }
}