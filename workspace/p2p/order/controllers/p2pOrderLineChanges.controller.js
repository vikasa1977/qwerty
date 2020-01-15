'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.P2P.controller:p2pOrderCtrl
 * @description
 * Controller of P2P Orders.
 */
   .controller('p2pOrderLineChangesCtrl', ['$rootScope', '$scope', '$window', '$translate', '$timeout', 'storeService', '$state', 'notification', '$filter', p2pOrderLineChangesCtrlFunc]);

/**
 * @ngdoc method
 * @name p2pOrderCtrlFunc
 * @methodOf SMART2.P2P.controller:p2pOrderCtrl
 * @description
 * The method of the p2pOrderCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function p2pOrderLineChangesCtrlFunc($rootScope, $scope, $window, $translate, $timeout,storeService, $state, notification, $filter) {
    $scope.tabMode = $state.params.tab;
    $scope.getScrollToMoreOption = storeService.get('getScrollToMoreOption');
    if ($scope.getScrollToMoreOption != undefined && $scope.getScrollToMoreOption != "") {
        $timeout(function () {
        });
      
    }
    
        
    $scope.templateListHeight = '100%';
    $scope.hideShowMoreLink = true;
    $scope.lineItems = [{
        status:   { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00'
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
        
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    },
    {
        status: { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
        action: 'Added',
        name: 'Lorem ipsum Dollar',
        itemNo: '1234560',
        contractNo: '22-65518',
        price: '12,500.00',
        quantity: '500',
        uom: 'Each',
        total: '235,000.00',
        select: false
    }];
    $scope.lineDetailTHeadData = [{
        "title_1": "Attributes",
        "title_2": "From",
        "title_3": "To"
    }
    ];
    $scope.headers = [
        {
            attributes: 'Payment Term',
            modifiedFrom: 'Net 45',
            modifiedTo: 'Net 30'
        },
        {
            attributes: 'Legal Entity',
            modifiedFrom: 'GEP India',
            modifiedTo: 'GEP China'
        },
        {
            attributes: 'Shipping & Freight',
            modifiedFrom: 'Lorem',
            modifiedTo: 'Ipsum'
        },
        {
            attributes: 'Addtional Info',
            modifiedFrom: '',
            modifiedTo: '',
            isSubHeader: true
        },
        {
            attributes: 'Q1. Payroll tax review done?',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
        {
            attributes: 'Q2. PII/Confidential Proprietary Information',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
        {
            attributes: 'Q3. Tier 2 Indicator',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        }
    ];   
    $scope.splits = [{
        'splitName': "1", "lineDetailTbodyData": [{
            "attributes": "Payment Term",
            "modifiedFrom": "Net 45",
            "modifiedTo": "Net 30"
        }, {
            "attributes": "Legal Entity",
            "modifiedFrom": "GEP India ",
            "modifiedTo": "GEP China"
        }, {
            "attributes": "Shipping & Freight",
            "modifiedFrom": "Lorem",
            "modifiedTo": "Ipsum"
        }, {
            "attributes": "Lorem Ipsum Dolor",
            "modifiedFrom": "suspendisse at dolor",
            "modifiedTo": "duis pretuim tortor sed tempor"
        }, {
            "attributes": "Suspendisse",
            "modifiedFrom": "Nunc vel risus non sapien",
            "modifiedTo": "fusce commondo est sit"
        }, {
            "attributes": "Amount (USD)",
            "modifiedFrom": "100",
            "modifiedTo": "200"
        }, {
            "attributes": "Quantity",
            "modifiedFrom": "1",
            "modifiedTo": "3"
        }]
    }, {
        'splitName': "2", "lineDetailTbodyData": [{
            "attributes": "Payment Term",
            "modifiedFrom": "Net 45",
            "modifiedTo": "Net 30"
        }, {
            "attributes": "Legal Entity",
            "modifiedFrom": "GEP India ",
            "modifiedTo": "GEP China"
        }, {
            "attributes": "Shipping & Freight",
            "modifiedFrom": "Lorem",
            "modifiedTo": "Ipsum"
        }, {
            "attributes": "Lorem Ipsum Dolor",
            "modifiedFrom": "suspendisse at dolor",
            "modifiedTo": "duis pretuim tortor sed tempor"
        }, {
            "attributes": "Suspendisse",
            "modifiedFrom": "Nunc vel risus non sapien",
            "modifiedTo": "fusce commondo est sit"
        }, {
            "attributes": "Amount (USD)",
            "modifiedFrom": "50",
            "modifiedTo": "100"
        }, {
            "attributes": "Quantity",
            "modifiedFrom": "3",
            "modifiedTo": "10"
        },
        {
            attributes: 'Addtional Info',
            modifiedFrom: '',
            modifiedTo: '',
            isSubHeader: true
        },
        {
            attributes: 'Q1. Payroll tax review done?',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
        {
            attributes: 'Q2. PII/Confidential Proprietary Information',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
        {
            attributes: 'Q3. Tier 2 Indicator',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
         {
             attributes: 'Q4. Purchase order total',
             modifiedFrom: 'Less than $250,000',
             modifiedTo: 'Greater than $250,000',
             isSubChild: true
         },
         {
             attributes: 'Q5. Invoice Approver',
             modifiedFrom: 'John Doe',
             modifiedTo: 'Smith Doe',
             isSubChild: true
         },
         {
             attributes: 'Q6. Pricing Method',
             modifiedFrom: 'Lorem ipsum',
             modifiedTo: 'Lorem ipsum',
             isSubChild: true
         },
         {
             attributes: 'Q7. Change Requester Number',
             modifiedFrom: '2543',
             modifiedTo: '2548',
             isSubChild: true
         },
         {
             attributes: 'Q8. Retained Percentage',
             modifiedFrom: '20%',
             modifiedTo: '30%',
             isSubChild: true
         },
         {
             attributes: 'Q9. PE Reference Number',
             modifiedFrom: '3463464',
             modifiedTo: '3734737',
             isSubChild: true
         },
         {
             attributes: 'Q10. Retained Percentage',
             modifiedFrom: '20%',
             modifiedTo: '30%',
             isSubChild: true
         },
         {
             attributes: 'Q11. Contract Type',
             modifiedFrom: 'Direct Contract',
             modifiedTo: 'Indirect Contract',
             isSubChild: true
         },
         {
             attributes: 'Q12. Currency conversion ratio',
             modifiedFrom: '2:5',
             modifiedTo: '3:4',
             isSubChild: true
         },
         {
             attributes: 'Q13. Competitive Bid',
             modifiedFrom: 'Yes',
             modifiedTo: 'No',
             isSubChild: true
         }
        ]
    }];
    $scope.tabsData = [
        {
        "title": "Line Details",
        "contentUrl": "p2p/order/views/itemNamePopupTabLineDetail.html",
        "active": true
    }, {
        "title": "Accounting",
        "contentUrl": "p2p/order/views/itemNamePopupTabAccounting.html",
        "active": false
    }, {
        "title": "Contract",
        "contentUrl": "p2p/order/views/itemNamePopupTabContract.html",
        "active": false
    }, {
        "title": "Manufacturer",
        "contentUrl": "p2p/order/views/itemNamePopupTabManufacturer.html",
        "active": false
    }
    , {
        "title": "Shipping",
        "contentUrl": "p2p/order/views/itemNamePopupTabShipping.html",
        "active": false
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
    $scope.lineDetailTbodyData = [
        {
        "attributes": "Payment Term",
        "modifiedFrom": "Net 45",
        "modifiedTo": "Net 30"
        },
        {
            "attributes": "Legal Entity",
            "modifiedFrom": "GEP India ",
            "modifiedTo": "GEP China"
        },
        {
            "attributes": "Shipping & Freight",
            "modifiedFrom": "Lorem",
            "modifiedTo": "Ipsum"
        },
        {
            "attributes": "Lorem Ipsum Dolor",
            "modifiedFrom": "suspendisse at dolor",
            "modifiedTo": "duis pretuim tortor sed tempor"
        },
        {
            "attributes": "Suspendisse",
            "modifiedFrom": "Nunc vel risus non sapien",
            "modifiedTo": "fusce commondo est sit"
        },
        {
    	    "attributes": "Amount (USD)",
    	    "modifiedFrom": "100",
    	    "modifiedTo": "200"
        },
        {
    	    "attributes": "Quantity",
    	    "modifiedFrom": "1",
    	    "modifiedTo": "3"
        },
        {
            attributes: 'Addtional Info',
            modifiedFrom: '',
            modifiedTo: '',
            isSubHeader: true
        },
        {
            attributes: 'Q1. Payroll tax review done?',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
        {
            attributes: 'Q2. PII/Confidential Proprietary Information',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
        {
            attributes: 'Q3. Tier 2 Indicator',
            modifiedFrom: 'Yes',
            modifiedTo: 'No',
            isSubChild: true
        },
         {
             attributes: 'Q4. Purchase order total',
             modifiedFrom: 'Less than $250,000',
             modifiedTo: 'Greater than $250,000',
             isSubChild: true
         },
         {
            attributes: 'Q5. Invoice Approver',
            modifiedFrom: 'John Doe',
            modifiedTo: 'Smith Doe',
            isSubChild: true
         },
         {
             attributes: 'Q6. Pricing Method',
             modifiedFrom: 'Lorem ipsum',
             modifiedTo: 'Lorem ipsum',
             isSubChild: true
         },
         {
             attributes: 'Q7. Change Requester Number',
             modifiedFrom: '2543',
             modifiedTo: '2548',
             isSubChild: true
         },
         {
             attributes: 'Q8. Retained Percentage',
             modifiedFrom: '20%',
             modifiedTo: '30%',
             isSubChild: true
         },
         {
             attributes: 'Q9. PE Reference Number',
             modifiedFrom: '3463464',
             modifiedTo: '3734737',
             isSubChild: true
         },
         {
             attributes: 'Q10. Retained Percentage',
             modifiedFrom: '20%',
             modifiedTo: '30%',
             isSubChild: true
         },
         {
             attributes: 'Q11. Contract Type',
             modifiedFrom: 'Direct Contract',
             modifiedTo: 'Indirect Contract',
             isSubChild: true
         },
         {
             attributes: 'Q12. Currency conversion ratio',
             modifiedFrom: '2:5',
             modifiedTo: '3:4',
             isSubChild: true
         },
         {
             attributes: 'Q13. Competitive Bid',
             modifiedFrom: 'Yes',
             modifiedTo: 'No',
             isSubChild: true
         }
    ];

    $scope.lineDetailAccoutingTabData = [{
        "attributes": "Requestor",
        "modifiedFrom": "Jane Doe",
        "modifiedTo": "John Doe"
    }, {
        "attributes": "Legal Entity",
        "modifiedFrom": "GEP India-GEP Organization",
        "modifiedTo": "GEP India-GEP Organization"
    }, {
        "attributes": "Business Unit",
        "modifiedFrom": "701, Midnspace, Building No. 3, Thane-Belapur Road, Airoli, Navi Mumbai - 400708, India",
        "modifiedTo": "708, Midnspace, Building No. 3, Thane-Belapur Road, Airoli, Navi Mumbai - 400708, India"
    }
    ];

    $scope.lineDetailContractTabTHeadDataData = [{
        "attributes": "Attribute",
        "modifiedFrom": "From",
        "modifiedTo": "To"
    }];

    $scope.lineDetailContractTabTbodyDataData = [{
        "attributes": "Contract Number",
        "modifiedFrom": "",
        "modifiedTo": ""
    }, {
        "attributes": "Contract Name",
        "modifiedFrom": "",
        "modifiedTo": ""
    }, {
        "attributes": "Contract Value",
        "modifiedFrom": "",
        "modifiedTo": ""
    }, {
        "attributes": "Contract Expiry Date",
        "modifiedFrom": "",
        "modifiedTo": ""
    }, {
        "attributes": "Payment Terms",
        "modifiedFrom": "",
        "modifiedTo": ""
    }];

    $scope.lineDetailManufacturerTabTHeadDataData = [{
        "attributes": "Attribute",
        "modifiedFrom": "From",
        "modifiedTo": "To"
    }];
    $scope.lineDetailManufacturerTabTbodyDataData = [{
        "attributes": "Manufacturer Name",
        "modifiedFrom": "",
        "modifiedTo": ""
    }, {
        "attributes": "Manufacturer Part Number",
        "modifiedFrom": "",
        "modifiedTo": ""
    }];


    $scope.lineDetailShippingTabTHeadDataData = [{
        "attributes": "Attribute",
        "modifiedFrom": "From",
        "modifiedTo": "To"
    }];

    $scope.lineDetailShippingTabTbodyDataData = [{
        "attributes": "Shipping Method",
        "modifiedFrom": "IT/LOGITICS",
        "modifiedTo": "BUSINESS TRAVEL"
    }, {
        "attributes": "Ship to",
        "modifiedFrom": "Mumbai",
        "modifiedTo": "Pune"
    }, {
        "attributes": "Ship To Address",
        "modifiedFrom": "701, Midnspace, Building No. 3, Thane-Belapur Road, Airoli, Navi Mumbai - 400708, India",
        "modifiedTo": "708, Midnspace, Building No. 3, Thane-Belapur Road, Airoli, Navi Mumbai - 400708, India"
    }, {
        "attributes": "Deliver To",
        "modifiedFrom": "Mumbai",
        "modifiedTo": "Pune"
    }, {
        "attributes": "Deliver To Address",
        "modifiedFrom": "701, Midnspace, Building No. 3, Thane-Belapur Road, Airoli, Navi Mumbai - 400708, India",
        "modifiedTo": "708, Midnspace, Building No. 3, Thane-Belapur Road, Airoli, Navi Mumbai - 400708, India"
    }];
    $scope.closeLineChange = function () {
        $state.go('p2p.order.viewChanges',{changeType:'changeHistory',view:'compare'});
    }
  
    /*item popup*/
    $scope.items =
        {
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

        };    

   
}

