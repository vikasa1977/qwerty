angular.module('SMART2')
	.controller('p2pOrderNewCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', 'notification', '$state', '$filter', '$timeout', 'storeService', 'ScrollTo', '$window', '$sce', p2pOrderNewCtrlFunc])
	.controller('itemDetailPOCtrl', ['$scope', '$translate', 'notification', '$state', 'ScrollTo', '$sce', '$http', '$timeout', itemDetailPOCtrlFunc])
	.controller('attachmentSectionCtrl', ['$scope', attachmentSectionCtrlFunc])
    .controller('p2pOrderPreviewCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', 'notification', '$state', p2pOrderPreviewCtrlFunc])
    .controller('p2pOrderTnCCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', 'notification', '$state', '$window', '$anchorScroll', '$location', '$filter', p2pOrderTnCCtrlFunc])
    .controller('popupMngAppCtrl', ['$scope', '$timeout', popupMngAppCtrlFunc])
	.controller('p2pOrderTeamMemberCtrl', ['$scope', 'notification', '$rootScope', 'RuleEngine', '$http', p2pOrderTeamMemberCtrlFunc])
    .controller('notesAndAttachmentCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', notesAndAttachmentCtrlFunc])
    .controller('p2pSandardAndProcedureSectionCtrl', ['$scope', 'notification', '$rootScope', 'RuleEngine', '$http', p2pSandardAndProcedureSectionCtrlFunc])
    .controller('p2pOrderNotificationCtrl', ['$scope', 'notification', '$rootScope', 'RuleEngine', '$http', 'notificationService', '$location', '$state', 'previousState', p2pOrderNotificationCtrlFunc])
    .controller('popupShipToLocCtrl', ['$scope', popupShipToLocCtrlFunc])
    .controller('p2pOrderThCtrl', ['$scope', '$rootScope', '$http', '$window', '$state', '$timeout', '$sce', p2pOrderThCtrlFunc])
    .controller('additionalInfoCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$window', '$state', '$timeout', '$sce', additionalInfoCtrlFunc])
	.controller('p2pOrderPdfCtrl', ['$scope', '$rootScope', p2pOrderPdfCtrlFunc])
    .controller('cancelOrderPdfCtrl', ['$scope', '$rootScope', '$state', cancelOrderPdfCtrlFunc]);

function attachmentSectionCtrlFunc($scope) {
    $scope.attachments = [
         {
             name: "File_ABC.pdf",
             fileSize: "18 KB",
             uploadDate: "12 April 2016",
             createdBy: "Johnny Walker",
             sharedWith: "Calvin Shawn",
             isChecked: false
         },
         {
             name: "xyz.xls",
             fileSize: "18 KB",
             uploadDate: "12 April 2016",
             createdBy: "Johnny Walker",
             sharedWith: "Calvin Shawn",
             isChecked: false
         },
         {
             name: "Name_of_the_attached_file.pdf",
             fileSize: "18 KB",
             uploadDate: "12 April 2016",
             createdBy: "Johnny Walker",
             sharedWith: "Calvin Shawn",
             isChecked: false
         },
         {
             name: "Name_of_theattached_file.docx",
             fileSize: "18 KB",
             uploadDate: "12 April 2016",
             createdBy: "Johnny Walker",
             sharedWith: "Calvin Shawn",
             isChecked: false
         },
         {
             name: "Name of the attachments file",
             fileSize: "18 KB",
             uploadDate: "12 April 2016",
             createdBy: "Johnny Walker",
             sharedWith: "Calvin Shawn",
             isChecked: false
         }
    ];
    $scope.hideDownloadTemplate = true;
    $scope.showUploadPopup = false;
    $scope.adduploadContractCallback = function (e) {
        $scope.uploadTitle = "ADD ATTACHMENTS";
        $scope.showUploadPopup = true;
    }
    $scope.hideUploadContractPopupCallback = function (e) {
        $scope.showUploadPopup = false;
    }
    $scope.attachFlag = false;
    $scope.uploadFail = false;
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;
        $timeout(function () {
            $scope.uploadFail = true;
        }, 1500);
    };
    $scope.retryCall = function () {
        $scope.uploadFail = false;
    }
    $scope.closeAttachment = function () {
        $scope.attachFlag = false;
        $scope.uploadFail = false;
    }
    $scope.selectAllAttach = { checkedAll: false };
    $scope.checkedAllAttach = function (check) {
        $scope.fillpartial = false;
        if (check) {
            for (var i = 0; i < $scope.attachments.length; i++) {
                $scope.attachments[i].isChecked = true;
            }
        }
        else {
            for (var i = 0; i < $scope.attachments.length; i++) {
                $scope.attachments[i].isChecked = false;
            }
        }
    }
    $scope.fillpartial = false;
    $scope.attachListChange = function (check) {
        var countAttachList = 0;
        for (var i = 0; i < $scope.attachments.length; i++) {
            if ($scope.attachments[i].isChecked == true) {
                countAttachList++;
            }
        }
        $scope.fillpartial = true;
        if (countAttachList === 0) {
            $scope.fillpartial = false;
            $scope.selectAllAttach.checkedAll = false;
        }
        else if (countAttachList === $scope.attachments.length) {
            $scope.fillpartial = false;
            $scope.selectAllAttach.checkedAll = true;
        }
        else {
            $scope.fillpartial = true;
        }
    };
}
function notesAndAttachmentCtrlFunc($scope, $rootScope, RuleEngine, $http, $timeout, $sce) {
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e) {
        $scope.showUploadPopup = true;
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
        $scope.isAttachmentAdded = true;
    }
    $scope.notesSaveCall = function () {
        $scope.isAttachmentAdded = true;
    }
    $scope.linkSaveCall = function () {
        $scope.isAttachmentAdded = true;
    }
    $scope.rowsToShowOpts = [
{ 'size': '5' },
{ 'size': '10' }];
    $scope.defaultOption = { 'size': '5' };
    $scope.selectedOption = { 'size': '5' };
   
    $scope.isSharedWithRequired = true;
    $scope.isClassificationWithRequired = true;
    $scope.sharedWithText = "Shared with External Users";
    $scope.emptyText = '';
    $scope.attachments = [
         {
             name: "File_ABC.pdf",
             fileSize: "18 KB",
             uploadDate: "12 April 2016",
             uploadBy: "John Doe",
             type: "File",
             sharedWith: 'Yes',
             isChecked: false
         },
         {
             name: "ABC",
             fileSize: "-",
             uploadDate: "12 April 2016",
             uploadBy: "John Doe",
             type: "Notes",
             sharedWith: 'No',
             isChecked: false
         },
         {
             name: "XYZ URL",
             fileSize: "-",
             uploadDate: "12 April 2016",
             uploadBy: "John Doe",
             type: "External Link",
             sharedWith: 'Yes',
             isChecked: false
         },
         {
             name: "Name_of_theattached_file.docx",
             fileSize: "18 KB",
             uploadDate: "12 April 2016",
             sharedWith: 'Yes',
             uploadBy: "John Doe",
             type: "File",
             isChecked: false
         },
         {
             name: "ABC",
             fileSize: "-",
             uploadDate: "12 April 2016",
             uploadBy: "John Doe",
             sharedWith: 'No',
             type: "Notes",
             isChecked: false
         },
		 {
		 	name: "ABC URL",
		 	fileSize: "-",
		 	uploadDate: "12 April 2016",
		 	uploadBy: "John Doe",
		 	type: "External Link",
		 	sharedWith: 'Yes',
		 	isChecked: false
		 }
    ];
    $scope.attachmentMsg = "Supported file formats: doc, docs, pdf, jpg, jpeg, png, tiff.\
        <br />Limited to file(s) of 10MB each.\
	    <br /> Maximum 5 files can be uploaded.";
    $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
    $scope.attchmentMsg = $scope.attachmentMsg;
    $scope.attachFlag = false;
    $scope.attachmentList = [
		{
		    name: "AttachmentOne.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentTwo.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentThree.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentFive.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		}
    ];
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;
        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function (el) {
        el.isShow = false;
    }

    $scope.retryCall = function (el) {
        el.status = "success";
    }
    $scope.removeRow = function (index) {
        // remove the row specified in index
        if ($scope.attachmentList.length > 1) {
            if ($scope.attachmentList.length == 2) {
                $scope.attachmentList[1].actionIconDelete = false;
            }
            $scope.attachmentList.splice(index, 1);
        }
    };
    $scope.selectAllAttach = { checkedAll: false };
    $scope.checkedAllAttach = function (check) {
        $scope.fillpartial = false;
        if (check) {
            for (var i = 0; i < $scope.attachments.length; i++) {
                $scope.attachments[i].isChecked = true;
            }
        }
        else {
            for (var i = 0; i < $scope.attachments.length; i++) {
                $scope.attachments[i].isChecked = false;
            }
        }
    }
    $scope.fillpartial = false;
    $scope.attachListChange = function (check) {
        var countAttachList = 0;
        for (var i = 0; i < $scope.attachments.length; i++) {
            if ($scope.attachments[i].isChecked == true) {
                countAttachList++;
            }
        }
        $scope.fillpartial = true;
        if (countAttachList === 0) {
            $scope.fillpartial = false;
            $scope.selectAllAttach.checkedAll = false;
        }
        else if (countAttachList === $scope.attachments.length) {
            $scope.fillpartial = false;
            $scope.selectAllAttach.checkedAll = true;
        }
        else {
            $scope.fillpartial = true;
        }
    }
    $scope.selectedClassification = { title: "S & P" };
    $scope.classificationOptions = [
		{ title: "S & P" },
		{ title: "Process step" },
		{ title: "Reference" }
    ];
    $scope.attachNotesName = "";
    $scope.attachNotesDesp = "";
    $scope.attachExternalL = "";
    $scope.attachmentNameCall = function (attachObj) {
        if (attachObj.type == "Notes") {
            $scope.attachNotesName = attachObj.name;
            $scope.attachNotesDesp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
            $scope.showNotesAttach = true;
        }
        if (attachObj.type == "External Link") {
            $scope.attachExternalL = "xyz.com";
            $scope.showExternalLinkAttach = true;
        }
    }
    $scope.showNotesAttach = false;
    $scope.showNotesAttachCall = function () {
        $scope.attachNotesName = "";
        $scope.attachNotesDesp = "";
        $scope.showNotesAttach = true;
    }
    $scope.hideNotesAttachPopupCallback = function (e) {
        $scope.showNotesAttach = false;
    }
    $scope.showExternalLinkAttach = false;
    $scope.showExternalLinkAttachCall = function () {
        $scope.attachExternalL = "";
        $scope.showExternalLinkAttach = true;
    }
    $scope.hideExternalLinkAttachPopupCallback = function (e) {
        $scope.showExternalLinkAttach = false;
    }
}
function p2pOrderThCtrlFunc($scope, $rootScope, $http, $window, $state, $timeout, $sce) {
    $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
    angular.element($window).bind('resize', function (e) {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        $scope.$apply();
    });

    angular.element($window).bind('scroll', function () {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }
        $scope.$apply();
    });

    var order = {
        method: 'GET',
        url: 'p2p/order/models/createOrder.json'
    };

    $http(order).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig;

    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.transactionHistoryPOTabDataset = [
        { "title": "All", "contentUrl": "p2p/order/views/allTransactionHistory.html", "active": true },
		{ "title": "Requested", "contentUrl": "p2p/order/views/requisitionTransactionHistory.html" },
        { "title": "Ordered", "contentUrl": "p2p/order/views/purchaseOrderTransactionHistory.html" },
        { "title": "Fulfilled", "contentUrl": "p2p/order/views/fulfillmentTransactionHistory.html" },
        { "title": "Invoiced", "contentUrl": "p2p/order/views/invoicingTransactionHistory.html" }
    ];
    $scope.transHistory = [
        {
            "type": "REQUESTED",
            "showDetails": true,
            "historyData": [
                {
                    "docType": "Requisition",
                    "docNo": "REQ-NA-2017.00001",
                    "status": "Partially Ordered",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 120,
                    "lineTotal": 140,
                    "supplier": "ABC Supplier",
                    "docValue": 120,
                    "docTotal": 140,
                    "lineDesc": "Acer Laptop",
                }
            ]
        },
        {
            "type": "ORDERED",
            "showDetails": true,
            "historyData": [
                {
                    "docType": "PO",
                    "docNo": "PO-NA-2017.00001",
                    "status": "Supplier Acknowledged",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 120,
                    "lineTotal": 120,
                    "supplier": "ABC Supplier",
                    "docValue": 120,
                    "docTotal": 120,
                    "lineDesc": "Acer Laptop",
                }
            ]
        },
        {
            "type": "INVOICED",
            "showDetails": true,
            "historyData": [
                {
                    "docType": "Invoice",
                    "docNo": "INV-NA-2017.00001",
                    "status": "Finalized",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 60,
                    "lineTotal": 80,
                    "supplier": "ABC Supplier",
                    "docValue": 60,
                    "docTotal": 80,
                    "lineDesc": "Acer Laptop",
                },
                {
                    "docType": "Invoice",
                    "docNo": "INV-NA-2017.00002",
                    "status": "Finalized",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 30,
                    "lineTotal": 60,
                    "supplier": "ABC Supplier",
                    "docValue": 30,
                    "docTotal": 60,
                    "lineDesc": "Acer Laptop",
                }
            ]
        },
        {
            "type": "FULFILLED",
            "showDetails": true,
            "historyData": [
                {
                    "docType": "ASN",
                    "docNo": "ASN-NA-2017.00001",
                    "status": "Draft",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 100,
                    "lineTotal": 120,
                    "supplier": "ABC Supplier",
                    "docValue": 100,
                    "docTotal": 120,
                    "lineDesc": "Acer Laptop",
                },
                {
                    "docType": "ASN",
                    "docNo": "ASN-NA-2017.00002",
                    "status": "In Process",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 40,
                    "lineTotal": 80,
                    "supplier": "ABC Supplier",
                    "docValue": 40,
                    "docTotal": 80,
                    "lineDesc": "Acer Laptop",
                },
                {
                    "docType": "ASN",
                    "docNo": "ASN-NA-2017.00003",
                    "status": "Draft",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 80,
                    "lineTotal": 90,
                    "supplier": "ABC Supplier",
                    "docValue": 80,
                    "docTotal": 90,
                    "lineDesc": "Acer Laptop",
                },
                {
                    "docType": "ASN",
                    "docNo": "ASN-NA-2017.00004",
                    "status": "In Process",
                    "subDate": "03/04/2018",
                    "quantity": 12,
                    "uom": "EACH",
                    "price": 10,
                    "currency": "USD",
                    "lineValue": 30,
                    "lineTotal": 60,
                    "supplier": "ABC Supplier",
                    "docValue": 30,
                    "docTotal": 60,
                    "lineDesc": "Acer Laptop",
                }
                
            ]
        }
    ];

    $scope.allTransHistory = [];
    angular.forEach($scope.transHistory, function (value, key) {
        $scope.allTransHistory = $scope.allTransHistory.concat($scope.transHistory[key].historyData);
    });

    $scope.lineOptions = [
        { "id": "0", "lineNumber": "All" },
        { "id": "1", "lineNumber": "001" },
        { "id": "2", "lineNumber": "002" },
        { "id": "3", "lineNumber": "003" },
        { "id": "4", "lineNumber": "004" },
        { "id": "5", "lineNumber": "005" }
    ];
    $scope.selectedLineOption = $scope.lineOptions[$state.params.id];
    
    $scope.itemNoOptions = [
        { 'itemNumber': '0000' },
        { 'itemNumber': '0001' },
        { 'itemNumber': '0002' },
        { 'itemNumber': '0003' },
        { 'itemNumber': '0004' },
        { 'itemNumber': '0005' }
    ];

    $scope.selectedItemNo = $scope.itemNoOptions[$state.params.id];

    $scope.itemDescriptionOptions = [
        { 'description': 'Acer Laptop' },
        { 'description': 'Dell Laptop' },
        { 'description': 'Lenovo Laptop' },
        { 'description': 'Asus Laptop' },
        { 'description': 'Intel Laptop' },
        { 'description': 'IBM Laptop' }
    ];

    $scope.selectedItemDescription = $scope.itemDescriptionOptions[$state.params.id];

    $scope.commonModel = {
        'ts_division': 'Technology',
        'ts_purchasingOrg': 'US-Tech',
        'ts_companyCode': 'NJ-001029',
        'ts_supplier': 'ABC Supplier',
        'ts_lineType': 'Service',
        'ts_lineSource': 'Catalog',
        'ts_payTerm': 'Net 30',
        'ts_needByDate': 1525286700526
    }

    $scope.highchartConfig = {
        barGraph: {
            options: {
                chart: {
                    type: 'column',
                    backgroundColor: '#ffffff',
                    spacingBottom: 0,
                    spacingTop: 15,
                    spacingLeft: 0,
                    spacingRight: 0,
                    height: 300
                },
                colors: ['#da7800', '#689f38'],
                xAxis: {
                    lineWidth: 2,
                    tickLength: 0,
                    gridLineWidth: 0,
                    offset: 0,
                    tickInterval: 1,
                    labels: {
                        enabled: true,

                    },
                    categories: ['Requested', 'Ordered', 'Fulfilled', 'Invoiced']
                },
                yAxis: {
                    visible: true,
                    title: {
                        text: 'Line Value (USD)'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'Normal',
                            color: '#000'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0,
                    floating: true,
                    backgroundColor: 'white',
                    borderColor: 'white',
                    borderWidth: 0,
                    shadow: false,
                    symbolHeight: 12,
                    symbolWidth: 12,
                    symbolRadius: 6,
                    itemStyle: {
                        color: '#000',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    scatter: {
                        lineWidth: 0,
                        marker: {
                            enabled: true,
                            symbol: 'circle',
                            fillColor: "#e67300",
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    },
                    series: {
                        pointWidth: 40
                    },
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: 'black',
                            style: {
                                fontWeight: 'Normal',
                                textShadow: false
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                }
            },
            title: {
                text: "Stacked column chart"
            },
            series: [{
                name: 'Quantity',
                data: [40, 25, 10, 15]
            }, {
                name: 'Value',
                data: [60, 25, 20, 60]
            }]
        }
    }
        

}
function p2pOrderNewCtrlFunc($scope, $rootScope, RuleEngine, $http, notification, $state, $filter, $timeout, storeService, ScrollTo, $window, $sce) {
   
    /* Document Lifecycle starts */
    $scope.lifeCycleData = [
        {
            'docName': 'Requested',
            'data': {
                'details': [
                    {
                        'name': 'Requested Value',
                        'currency': 'USD',
                        'value': 123
                    },
                    {
                        'name': 'Requested Total',
                        'currency': 'USD',
                        'value': 140
                    },
                    {
                        'name': 'Requested Quantity',
                        'currency': 'EA',
                        'value': 110
                    }
                ],
                'otherDetails': [
                    {
                        'name': 'Requisition Count',
                        'value': 10
                    }
                ]
            }
        },
        {
            'docName': 'Ordered',
            'data': {
                'details': [
                    {
                        'name': 'Ordered Value',
                        'currency': 'USD',
                        'value': 123
                    },
                    {
                        'name': 'Ordered Total',
                        'currency': 'USD',
                        'value': 140
                    },
                    {
                        'name': 'Ordered Quantity',
                        'currency': 'EA',
                        'value': 110
                    }
                ]
            }
        },
        {
            'docName': 'Fulfilled',
            'legends': [
                {
                    'name': 'Draft'
                },
                {
                    'name': 'Finalized'
                }
            ],
            'chartValue': 33,
            'data': {
                'details': [
                    {
                        'name': 'Net Fulfilled Value',
                        'currency': 'USD',
                        'finalizedValue': 123,
                        'draftValue': 123
                    },
                    {
                        'name': 'Net Fulfilled Total',
                        'currency': 'USD',
                        'finalizedValue': 140,
                        'draftValue': 45
                    },
                    {
                        'name': 'Net Fulfilled Quantity',
                        'currency': 'EA',
                        'finalizedValue': 110,
                        'draftValue': 25
                    }
                ],
                'otherDetails': [
                    {
                        'name': 'Receipt Count',
                        'value': 10
                    },
                    {
                        'name': 'Service Confirmation Count',
                        'value': 01
                    },
                    {
                        'name': 'Return Note Count',
                        'value': 01
                    }
                ]
            }
        },
        {
            'docName': 'Invoiced',
            'legends': [
                {
                    'name': 'In Process'
                },
                {
                    'name': 'Paid'
                }
            ],
            'chartValue': 33,
            'data': {
                'details': [
                    {
                        'name': 'Net Invoiced Value',
                        'currency': 'USD',
                        'paidValue': 123,
                        'inProcessValue': 123
                    },
                    {
                        'name': 'Net Invoiced Total',
                        'currency': 'USD',
                        'paidValue': 140,
                        'inProcessValue': 45
                    },
                    {
                        'name': 'Net Invoiced Quantity',
                        'currency': 'EA',
                        'paidValue': 110,
                        'inProcessValue': 25
                    }
                ],
                'otherDetails': [
                    {
                        'name': 'Invoice Count',
                        'value': 10
                    },
                    {
                        'name': 'Credit Memo Count',
                        'value': 01
                    }
                ]
            }
        }
    ];
    $scope.viewAll = function () {
        $state.go('p2p.order.transactionHistory', { 'id': 0 });
    }
    /* Document Lifecycle ends */


    $scope.showErrorAlert = false;
	$scope.printPdf = function () {
		alert("HH");
	}
    $scope.showErrorAlertMsgCont = false;
    $scope.showErrorAlertFunc = function () {
        if ($scope.showErrorAlert) {
            $scope.showErrorAlert = false;
            $timeout(function () {
                $scope.showErrorAlertMsgCont = false;
            },800);
        } else {
            $scope.showErrorAlert = true;
            $scope.showErrorAlertMsgCont = true;
        }
    }
    $scope.erpRefShow = false;
    $scope.erpReferenceLocationCall = function () {
        $scope.erpRefShow = true;
    }
    $scope.erpRefPopupOnHideCallback = function (e) {
        $scope.erpRefShow = false;
    }
    $scope.erpRef = [
        {
            supplierName: "Dell",
            sourceSystem: "3463",
            LocationReferenceCode: "7373",
            OrderingLocation: "Mumbai",
            RemitToLocation: "Delhi",
            SafetyIndicator: "Yes",
            EDIType: "PO/850"
        },
        {
            supplierName: "Dell",
            sourceSystem: "3463",
            LocationReferenceCode: "7373",
            OrderingLocation: "Mumbai",
            RemitToLocation: "Delhi",
            SafetyIndicator: "No",
            EDIType: "PO Ack/855"
        },
        {
            supplierName: "Dell",
            sourceSystem: "3463",
            LocationReferenceCode: "7373",
            OrderingLocation: "Mumbai",
            RemitToLocation: "Delhi",
            SafetyIndicator: "Yes",
            EDIType: "Invoice/810"
        },
        {
            supplierName: "Dell",
            sourceSystem: "3463",
            LocationReferenceCode: "7373",
            OrderingLocation: "Mumbai",
            RemitToLocation: "Delhi",
            SafetyIndicator: "No",
            EDIType: "PO Revision/860"
        },
        {
             supplierName: "Dell",
             sourceSystem: "3463",
             LocationReferenceCode: "7373",
             OrderingLocation: "Mumbai",
             RemitToLocation: "Delhi",
             SafetyIndicator: "Yes",
             EDIType: "ASN/856"
         }
    ];
    $scope.heading = "RESEND ORDER TO SUPPLIER via";
    $scope.emailBody="Dear Marvin,<br />Order details.<br/>43753746652465- <b>Lion bridge Technology</b><br/>5 Oct 2015 |<i> Approval Pending</i><br/>24.242 USD<br/>"
    $scope.emailBody = $sce.trustAsHtml($scope.emailBody);
    $scope.mode = $state.params.mode;
    $scope.emailerPopup = false;
    $scope.openPopupEmailer = false;
    $scope.emailerPopupCallback = function () {
        $scope.emailerPopup = true;
        $scope.openPopupEmailer = true;
    };
    $scope.emailerPopupHideCallback = function (e) {
        $scope.emailerPopup = false;
        $scope.openPopupEmailer = false;
    };
    $scope.resendOptionList = [{ title: "Call & Submit", id: "1", showInfo: true, infoMsg: "You will have to submit the order details offline & order will be marked as Acknowledged.", showControls: false },
        { title: "Direct Email", id: "2", showControls: false },
        { title: "EDI/cXML", id: "3", showControls: false },
        { title: "Portal", id: "4", showControls: false },
        { title: "Fax", id: "5", showControls: true },
        { title: "Print PDF", id: "6", showControls: true }];
    $scope.selectedOption = { id: "1" };
    var resendOptionId = "";
    $scope.isFaxActive = false;
    $scope.printPdf = false;
    $scope.resendOptionChange = function (item) {
        resendOptionId = item.id;
        if (item.title == "Fax") {
            $scope.isFaxActive = true;
            $scope.printPdf = false;
        }
        else if(item.title == "Print PDF") {
            $scope.isFaxActive = false;
            $scope.printPdf = true;
        }
        else {
            $scope.isFaxActive = false;
            $scope.printPdf = false;
        }
    }
    $scope.resendOptionSend = function () {
        switch (resendOptionId) {
            case '1': 
               break;
            case '2':  
                $scope.resendOptionShow = false;
                $scope.emailerPopup = true;
                $scope.openPopupEmailer = true;
                break;
            case '3':  
                console.log('3');
                break;
            case '4':
                console.log('4');
                break;
         }
    }
    $scope.orderStatus = "DRAFT";
    $scope.cancelOrder = function () {
        $scope.orderStatus = "CANCELLED";
    }
    $scope.restoreOrder = function () {
        $scope.orderStatus = "DRAFT";
    }
    $scope.resendOptionShow = false;
    $scope.resendOrderToSuppCall = function () {
        $scope.resendOptionShow = true;
    }
    $scope.resendOptionPopupOnHideCallback = function (e) {
        $scope.resendOptionShow = false;
    }
    $scope.emailToOpts = [
        { "UserName": "John.Doe@gep.com" },
		{ "UserName": "renju.mathew@gep.com" },
		{ "UserName": "ayyappakumar.thevar@gep.com" },
		{ "UserName": "shailesh.sawant@gep.com" },
		{ "UserName": "sachin.kurkute@gep.com" },
		{ "UserName": "kabir.roy@gep.com" },
		{ "UserName": "joel.almeida@gep.com" },
		{ "UserName": "abhishek.kadam@gep.com" },
		{ "UserName": "naushad.shaikh@gep.com" },
		{ "UserName": "karthic.muthuraman@gep.com" },
		{ "UserName": "kamlesh.bhalde@gep.com" },
		{ "UserName": "poonam.lad@gep.com" },
		{ "UserName": "rahul.kardekar@gep.com" },
		{ "UserName": "sheetal.bellare@gep.com" },
		{ "UserName": "kailas.mahajan@gep.com" },
		{ "UserName": "deepak.khanna@gep.com" },
		{ "UserName": "rahul.yadav@gep.com" },
		{ "UserName": "gaurav.jathar@gep.com" },
		{ "UserName": "godwin.anand@gep.com" },
		{ "UserName": "manish.vishwakarma@gep.com" },
		{ "UserName": "mayur.dalal@gep.com" },
		{ "UserName": "mayur.gadekar@gep.com" },
		{ "UserName": "muthu.vijaiyan@gep.com" },
		{ "UserName": "nandini.barve@gep.com" },
		{ "UserName": "prajakta.vadgaonkar@gep.com" },
		{ "UserName": "rahul.nirbhawane@gep.com" },
		{ "UserName": "reshma.kautkar@gep.com" }
    ];
    $scope.emailCcOpts = [
        { "UserName": "nandini.barve@gep.com" },
		{ "UserName": "renju.mathew@gep.com" },
		{ "UserName": "ayyappakumar.thevar@gep.com" },
		{ "UserName": "shailesh.sawant@gep.com" },
		{ "UserName": "sachin.kurkute@gep.com" },
		{ "UserName": "kabir.roy@gep.com" },
		{ "UserName": "joel.almeida@gep.com" },
		{ "UserName": "abhishek.kadam@gep.com" },
		{ "UserName": "naushad.shaikh@gep.com" },
		{ "UserName": "karthic.muthuraman@gep.com" },
		{ "UserName": "kamlesh.bhalde@gep.com" },
		{ "UserName": "poonam.lad@gep.com" },
		{ "UserName": "rahul.kardekar@gep.com" },
		{ "UserName": "sheetal.bellare@gep.com" },
		{ "UserName": "kailas.mahajan@gep.com" },
		{ "UserName": "deepak.khanna@gep.com" },
		{ "UserName": "rahul.yadav@gep.com" },
		{ "UserName": "gaurav.jathar@gep.com" },
		{ "UserName": "godwin.anand@gep.com" },
		{ "UserName": "manish.vishwakarma@gep.com" },
		{ "UserName": "mayur.dalal@gep.com" },
		{ "UserName": "mayur.gadekar@gep.com" },
		{ "UserName": "muthu.vijaiyan@gep.com" },
		{ "UserName": "nandini.barve@gep.com" },
		{ "UserName": "prajakta.vadgaonkar@gep.com" },
		{ "UserName": "rahul.nirbhawane@gep.com" },
		{ "UserName": "reshma.kautkar@gep.com" }
    ];
    $scope.emailToPreSelect = [{ "UserName": "John.Doe@gep.com" }];
    $scope.emailCcPreSelect = [{ "UserName": "nandini.barve@gep.com" }];
    $scope.errModel = {
        emailTo: "",
        emailCc: ""
    }
    $scope.emailSubject = "Lorem ipsum";
    $scope.isEmailSubjectDisable = true;
    $scope.isEmailToDisable = false;
    $scope.isEmailCCDisable = false;
	$scope.showSupplierIcardPopup = false;
	$scope.showSupplierIcard = function () {
		$scope.showSupplierIcardPopup = true;
	}
	$scope.hideSupplierIcardPopupCallback = function () {
		$scope.showSupplierIcardPopup = false;
	};

	$scope.hidePopupEmailer = function () {
	    $scope.emailToPreSelect = [];
	    $scope.emailerPopup = false;
	    $scope.openPopupEmailer = false;
	};

	$scope.sendMail = function () {
	    if ($scope.emailToPreSelect == '' || ($scope.errModel.emailTo || $scope.errModel.emailCc)) {
	        return;
	    } else {
	        $scope.emailerPopup = false;
	        $scope.openPopupEmailer = false;
	    }
	};
	$scope.supplierIcard = {
	    "supplierName": "kelloggs",
	    "location": "Michigan, United States",
	    "site": "www.kelloggs.com",
	    "emailId": "Allan.Gibson@Kelloggs.com",
	    "logoUrl": "",
	    "primaryContact": "Allan Gibson",
	    "code": "232654BB3C",
	    "suppilersourcetype": "General",
	    "status": "Invited",
	    "businessunit": {
	        "displaytext": "Business Unit",
	        "selectedoption": [{ "name": "TECHNOLOGY SOLUTIONS", "check": true, "value": [{ "name": "NOVA", "check": true, "value": [{ "name": "PRODUCT MANAGEMENT GROUP", "check": true }, { "name": "USER EXPERIENCE", "check": true }, { "name": "PRODUCT TECHNOLOGY", "check": true }] }] }],
	        "options": [{
	            "name": "TECHNOLOGY SOLUTIONS", "check": true, "value": [{
	                "name": "NOVA", "check": true, "value": [{
	                    "name": "PRODUCT MANAGEMENT GROUP", "check": true
	                }, { "name": "USER EXPERIENCE", "check": true }, { "name": "PRODUCT TECHNOLOGY", "check": true }]
	            }]
	        }]
	    },
	    "diversityStatus": {
	        "displaytext": "Diversity Status",
	        "selectedoption": [{ "name": "Minority Business Enterprise (MBE) - African American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Indian American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Pacific American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Hispanic American", "check": true }],
	        "options": [{ "name": "Minority Business Enterprise (MBE) - African American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Indian American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Pacific American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Hispanic American", "check": true }]
	    },

	    "email": "Allan.Gibson@Kelloggs.com",
	    "dunscode": "343-BHH-236-549-BB2",
	    "suppilerrisktype": "Moderate",
	    "countIndicator": [
            {
                "cardCount": "20",
                "cardTitle": "Contracts"
            },
            {
                "cardCount": "30",
                "cardTitle": "Purchase Order"
            },
            {
                "cardCount": "40",
                "cardTitle": "Requisitions"
            }
	    ],

	    "phone": "908-720-8526",
	    "fax": "9099809988"
	};

    // Start: Tree component
	var tempBUNode_PAS = [];
	var tempPANode_PAS = [];

	$scope.treeComponentConfig = {
	    isRadio: false,
	    getHierarchyOnSelection: true,
	    getAllLazyLoadedData: true,
	    getUserSelection: true,
	    enableLastLevelSelection: false,
	    isLazyLoad: false,
	    showSelectAll: false,
	    showClearSelection: false,
	    showSelectionCount: false,
	    isReadOnly: false,
	    isDisabled: false,
	    modalButtonShow: true,
	    data: null,
	    selectedNodes: "",
	    disableLevelSelection: '',
	    treeType: 'Generic',
	    title: 'Category',
	    getSelections: false,
	    clearCache: false,
	    height: '328px',
	    isSearchEnabled: true,
	    navigationContext: "PAS",
	};

	var buObj;

	var buData = {
	    method: 'GET',
	    url: 'shared/popup/models/businessUnit.json'
	};

	var currentType = '',
icardPopup = false;
	$scope.showSupplierPopupIcard = function () {
	    $scope.showTreePopup = false;
	    $scope.treeComponentConfig.data = [];
	    $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	    icardPopup = true;
	    $scope.showSupplierIcard();
	}
	$scope.treeOpenCallback = function (type) {

	    currentType = type;
	    if (type == 'bu') {
	        $http(buData).then(function (response) {
	            buObj = response.data;
	            $scope.treeComponentConfig.listIcon = null;
	            $scope.treeComponentConfig.isViewOnly = false;
	            $scope.treeComponentConfig.isReadOnly = false;
	            $scope.treeComponentConfig.data = buObj;
	            $scope.treeComponentConfig.title = 'BUSINESS UNIT';
	            if (tempBUNode_PAS.length) {
	                $scope.treeComponentConfig.isReadOnly = true;
	            }
	            $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
	            //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	        });

	    } else if (type == 'PA') {
	        $http(buData).then(function (response) {

	            $scope.treeComponentConfig.listIcon = { message: 'Supplier Icard', name: '#icon_ContactCard', callback: $scope.showSupplierPopupIcard };
	            $scope.treeComponentConfig.isViewOnly = true;
	            $scope.treeComponentConfig.isReadOnly = true;
	            $scope.treeComponentConfig.data = response.data;
	            $scope.treeComponentConfig.title = 'PARENT CHILD HIERARCHY';
	            $scope.treeComponentConfig.selectedNodes = '851750000001';
	            $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	        });

	    } else if (type == 'iCardBU') {
	        $scope.showSupplierIcardPopup = false;
	        $http(buData).then(function (response) {
	            buObj = response.data;
	            $scope.treeComponentConfig.listIcon = null;
	            $scope.treeComponentConfig.isViewOnly = true;
	            $scope.treeComponentConfig.isReadOnly = true;
	            $scope.treeComponentConfig.data = buObj;
	            $scope.treeComponentConfig.title = 'BUSINESS UNIT';

	            $scope.treeComponentConfig.selectedNodes = '851750000001';

	        });


	    } else if (type == 'iCardDiversity') {
	        $scope.showSupplierIcardPopup = false;
	        $http(buData).then(function (response) {
	            buObj = response.data;
	            $scope.treeComponentConfig.listIcon = null;
	            $scope.treeComponentConfig.isViewOnly = true;
	            $scope.treeComponentConfig.isReadOnly = true;
	            $scope.treeComponentConfig.data = buObj;
	            $scope.treeComponentConfig.title = 'Diversity';
	            $scope.treeComponentConfig.selectedNodes = '851750000001';
	        });
	    }
	    $scope.showTreePopup = true;
	};

	$scope.onPopupHideCallback = function () {

	    if (currentType == "iCardBU" || currentType == "iCardDiversity") {
	        $scope.showSupplierIcardPopup = true;
	    }
	    $scope.showTreePopup = false;
	    if (currentType == 'bu') {
	        $scope.selectedBUValidate = true;
	    }
	    $scope.treeComponentConfig.data = [];
	    $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	    //$scope.treeComponentConfig.getSelections = true;
	};
	$scope.selectedBUTxt = ["Choose Business Unit"];

	$scope.selectedBUNodes = [];

	$scope.treeComponentCallback = function (e) {
	    $scope.showTreePopup = false;
	    icardPopup = false;
	    if (currentType == 'PA') {
	        tempPANode_PAS = [];
	        //$scope.selectedCategoriesValidate = true;
	        for (var i = 0; i < e.selections.length; i++) {
	            //$scope.selectedCategoryNodes.push(e.selections[i].Name);
	            tempPANode_PAS.push(e.selections[i].ID);
	        }
	    } else if (currentType == 'bu') {
	        tempBUNode_PAS = [];
	        $scope.selectedBUValidate = true;
	        for (var i = 0; i < e.selections.length; i++) {
	            $scope.selectedBUNodes.push(e.selections[i].Name);
	            tempBUNode_PAS.push(e.selections[i].ID);
	        }
	        if (e.selectionAllNames.length > 1)
	            $scope.selectedBUTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
	        else if (e.selectionAllNames.length == 1)
	            $scope.selectedBUTxt = [e.selectionAllNames[0]];
	        else
	            $scope.selectedBUTxt = ['Choose Business Unit'];
	    } else
	        if (currentType == "iCardBU" || currentType == "iCardDiversity") {
	            $scope.showSupplierIcardPopup = true;
	        }

	    $scope.treeComponentConfig.data = [];
	    $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
	};
    // POPUP -- Export Internal Copy
	$scope.exportPopupCallBack = function (e) {
	    $scope.showExportInternalCopy = true;

	}
	$scope.hideExportInternalCopyCallback = function (e) {
	    $scope.showExportInternalCopy = false;
	}
	$scope.languageOptions = [
            { "name": "English", "set": 1 },
            { "name": "Spanish", "set": 2 },
            { "name": "German", "set": 3 },
            { "name": "French", "set": 4 },
            
	];
    $scope.selectedLanguage = { "name": "English", "set": 1 },

    // POPUP -- comments
	$scope.commentIcon = '#icon_Comments'; //icon_Commented
	$scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

	$scope.showCommentsPopup = false;
	$scope.showCommentsPopupCallback = function (e) {
	    $scope.hideSupplierIcardPopupCallback();
	    $scope.showCommentsPopup = true;
	};
	$scope.commentsPopUpOnHideCallback = function (e) {
	    $scope.showCommentsPopup = false;
	    //$scope.showSupplierIcardPopup = true;
	    $scope.commentIcon = '#icon_Commented';//icon_Comments
	    Materialize.toast('Status changed', 2000);
	};
	$scope.showCommentsFromStatusPopupCallback = function (e) {
	    $scope.showCommentsPopup = true;
	    $scope.commentIcon = '#icon_Commented';//icon_Comments
	};
	$scope.commentList = [{
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "rutrum eu dui rutrum eu dui  rutrum eu dui rutrum eu dui.",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: true,
	    attachments: [{
	        filename: "lorem.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "rutrum eu dui rutrum eu dui. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: false,
	    attachments: [{
	        filename: "reprehenderit.xls"
	    }, {
	        filename: "velit.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: true,
	    attachments: [{
	        filename: "rutrum.xls"
	    }, {
	        filename: "dui.xls"
	    }, {
	        filename: "eu.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim .",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: false,
	    attachments: [{
	        filename: "consectetur.xls"
	    }, {
	        filename: "amet.xls"
	    }]
	}, {
	    UserName: "Joseph Powell",
	    UserType: "Internal Users and Suppliers",
	    commentTxt: "rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui.",
	    commentDateTime: "10/12/2015 03:54 PM",
	    isOtherUser: false,
	    attachments: [{
	        filename: "lorem.xls"
	    }]
	}
	];

    // POPUP -- attachment
	$scope.attachmentPopUpUrl = "shared/popup/views/popupUploadDoc.html";

    //Attachment popup--start
	var comingFrom;
	$rootScope.showDoneBtn = false;
	$scope.uploadTitle = "ADD ATTACHMENTS";
	var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
	$scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
	$scope.hideDownloadTemplate = true;
	$scope.showUploadPopup = false;
	$scope.showUploadPopupfrmEmail = false;
	$scope.uploadCallFrmEmail = function () {
	    $scope.emailerPopup = false;
	    $scope.showUploadPopupfrmEmail = true;
	}
	$scope.hideUploadPopupfrmEmailCallback = function (e) {
	    $scope.showUploadPopup = false;
	    $scope.emailerPopup = true;
	}
	$scope.adduploadCallback = function (e, popupComingfrom) {
	    $scope.showUploadPopup = true;
	    comingFrom = popupComingfrom;
	    if (comingFrom != undefined) {
	        $rootScope.showDoneBtn = true
	    }
	}
	$scope.uploadPopupCall = function () {
	    $scope.emailerPopup = false;
	    $scope.showUploadPopup = true;
	}
	$scope.hideUploadPopupCallback = function (e) {
	    $scope.showUploadPopup = false;
	    if (comingFrom == undefined) {

	        return false;
	    } else if (comingFrom == "comment") {
	        $scope.showCommentsPopup = true;
	        $rootScope.showDoneBtn = false;
	    } else if (comingFrom == "manageApproval") {
	        $scope.mngAppShow = true;
	        $rootScope.showDoneBtn = false;
	    }

	}
	$scope.docFlag = false;
	$scope.uploadDocCall = function (e) {
	    $scope.docFlag = true;
	};
	$scope.attachFlag = false;


	$scope.attachmentList = [
        {
            name: "AttachmentOne.xls",
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentTwo.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        },
        {
            name: "AttachmentThree.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        },
        {
            name: "AttachmentFour.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        },
        {
            name: "AttachmentFive.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        }
	];
	$scope.attachmentCall = function (e) {
	    $scope.attachFlag = true;

	    for (var i = 0; i < $scope.attachmentList.length; i++) {
	        $scope.attachmentList[i].isShow = true;
	    }
	};
	$scope.closeAttachment = function (el) {
	    el.isShow = false;
	}

	$scope.retryCall = function (el) {
	    el.status = "success";
	}
	$scope.removeRow = function (el) {
	    // remove the row specified in index
	    if ($scope.attachmentList.length > 1) {
	        if ($scope.attachmentList.length == 2) {
	            $scope.attachmentList[1].actionIconDelete = false;
	        }
	        $scope.attachmentList.splice(index, 1);
	    }
	};

	$scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
	$scope.smartCatPopupSingleLevel = "shared/popup/views/smartCatPopupSingleLevel.html";
    //Attachment popup--end
 $scope.smartTableOption = [{
        "fieldName": "FirstName",
        "columnTitle": "First Name",
        "width": 25,
        "maxWidth": 20
    },
    {
        "fieldName": "LastName",
        "columnTitle": "Last Name",
        "width": 25,
        "maxWidth": 20
    },
    {
        "fieldName": "email",
        "columnTitle": "Email",
        "width": 50,
        "maxWidth": 50
    }];

    $scope.supplierData = [
        {
            	"UserId": 28360,
            	"email": "SRUser1@outlook.com",
            	"FirstName": "Avishek",
            	"LastName": "Jana"
            }, {
            	"UserId": 28977,
            	"email": "SRUser1@outlook.com11",
            	"FirstName": "Pawan",
            	"LastName": "Singh"
            }, {
            	"UserId": 28978,
            	"email": "SRUser1@outlook.com234",
            	"FirstName": "Apurva",
            	"LastName": "Chi"
            }, {
            	"UserId": 28979,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Mayur",
            	"LastName": "Gadekar"
            }, {
            	"UserId": 28981,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Sachin",
            	"LastName": "Kurkute"
            }, {
            	"UserId": 28982,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Karthic",
            	"LastName": "Muthuraman"
            }, {
            	"UserId": 28983,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Rahul",
            	"LastName": "Kardekar"
            }, {
            	"UserId": 28984,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Sheetal",
            	"LastName": "Shah"
            }, {
            	"UserId": 28985,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Nandini",
            	"LastName": "Shah"
            }, {
            	"UserId": 28986,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Poonam",
            	"LastName": "Lad"
            }, {
            	"UserId": 28987,
            	"email": "SRUser1@outlook.com342",
            	"FirstName": "Harshit",
            	"LastName": "Shah"
            }
    ]



	$scope.typeOptions = [
            {
            	"UserId": 28360,
            	"UserName": "SRUser1@outlook.com",
            	"FirstName": "Avishek",
            	"LastName": "Jana"
            }, {
            	"UserId": 28977,
            	"UserName": "SRUser1@outlook.com11",
            	"FirstName": "Pawan",
            	"LastName": "Singh"
            }, {
            	"UserId": 28978,
            	"UserName": "SRUser1@outlook.com234",
            	"FirstName": "Apurva",
            	"LastName": "Chi"
            }, {
            	"UserId": 28979,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Mayur",
            	"LastName": "Gadekar"
            }, {
            	"UserId": 28980,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Avishek",
            	"LastName": "Jana"
            }, {
            	"UserId": 28981,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Sachin",
            	"LastName": "Kurkute"
            }, {
            	"UserId": 28982,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Karthic",
            	"LastName": "Muthuraman"
            }, {
            	"UserId": 28983,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Rahul",
            	"LastName": "Kardekar"
            }, {
            	"UserId": 28984,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Sheetal",
            	"LastName": "Shah"
            }, {
            	"UserId": 28985,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Nandini",
            	"LastName": "Shah"
            }, {
            	"UserId": 28986,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Poonam",
            	"LastName": "Lad"
            }, {
            	"UserId": 28987,
            	"UserName": "SRUser1@outlook.com342",
            	"FirstName": "Harshit",
            	"LastName": "Shah"
            }
	];
	$scope.selectedOrderContact = $scope.typeOptions[0];
	$scope.selectedSignatoryLookup = $scope.typeOptions[0];
	$scope.selectedProgram = $scope.typeOptions[0];
	$scope.selectedDepartment = $scope.typeOptions[0];
	$scope.selectedSupplierName = $scope.typeOptions[0];
	$scope.selectedSupplierContact = $scope.typeOptions[0];
	$scope.selectedSPaymentTerm = $scope.typeOptions[0];


    var isSequenceToBeMaintained;
    /*
	 *  Service call get form-config and data-model
	 */
    var order = {
        method: 'GET',
        url: 'p2p/order/models/createOrder.json'
    };
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };
    $scope.isBlanketMode = false;
    var foundTolerance;
    $http(order).then(function (response) {
        if ($scope.mode == 'blanket') {
            $scope.dataModel = response.data.dataBlanketModel;
            $scope.isBlanketMode = true;
        } else {
            $scope.dataModel = response.data.dataModel;
        }
        $scope.config = response.data.formConfig;
        if (storeService.get('isViewLineItem')) {
            $scope.config.sections[0].rows[0].properties[2].focus = false;
            $scope.config.sections[14].isActive = true; 
            $timeout(function () {
                var lineDetailsOffsetTop = angular.element('.card.cardParent[label="Lines Details"]').offset().top;
                $window.scrollTo(0, lineDetailsOffsetTop);
            });
                          
        }
        if ($state.params.erpstatus == "rejected") {
            $scope.config.sections[1].rows[0].properties[9].isVisible = true;
        }
        foundTolerance = $filter('filter')($scope.config.sections, { label: 'Receiving Tolerances' }, true)
    }, function (error) {
        console.log(JSON.stringify(error));
    });
    $scope.validateForm = function () {
        RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
        RuleEngine.execute(function (e) {
            // if() {
            // }
        });
    };
    $scope.erpRefCall = function () {
        $scope.config.sections[2].rows[0].properties[2].isVisible = true;
        $scope.config.sections[2].rows[0].properties[3].isVisible = true;
        $scope.config.sections[2].rows[0].properties[4].isVisible = true;
        $scope.config.sections[2].rows[0].properties[5].isVisible = true;
    }
    $scope.sectionAndFieldsDetails = [
		{ 'name': 'Section One', 'contentIn': '' },
        { 'name': 'Section Two', 'contentIn': '' },
        { 'name': 'Section Three', 'contentIn': '' },
        { 'name': 'Section Four', 'contentIn': '' },
        { 'name': 'Section Five', 'contentIn': '' },
        { 'name': 'Section Six', 'contentIn': '' },
        { 'name': 'Section Seven', 'contentIn': '' },
        { 'name': 'Shipping', 'contentIn': '' },
        { 'name': 'Shipping to', 'contentIn': 'In Shipping' },
        { 'name': 'Ship to Address', 'contentIn': 'In Shipping' }
    ]

    var revokeChObj = {
        type: "warning",
        message: "<p class='left-align'>Do you want to revoke changes?</p>",
        buttons: [
			{
			    title: "Yes",
			    result: "yes"
			},
			{
			    title: "No",
			    result: "no"
			}
        ]
    }
    var revokeChSuccObj = {
        type: "success",
        message: "<p class='left-align'>Changes revoked succesfully</p>",
        buttons: [
			{
			    title: "Ok",
			    result: "ok"
			}
        ]
    }

    var copyOrderObj = {
        type: "success",
        message: "<p class='left-align'>Order copy was created succesfully, you will be re-directed to the new order now</p>",
        buttons: [
			{
			    title: "Ok",
			    result: "ok"
			}
        ]
    }

    var deleteOrderObj = {
        type: "warning",
        message: "<p class='left-align'>Do you want to delete this Order?</p>",
        buttons: [
			{
			    title: "Yes",
			    result: "yes"
			},
			{
			    title: "No",
			    result: "no"
			}
        ]
    }

    $scope.submitReq = function () {
        var confi = {
            type: "success",
            message: "<p class='left-align'>Order has been submitted successfully.</p>",
           
            buttons: [
				{
				    "title": "YES",
				    "result": "yes"
				},
				{
				    "title": "Stay on same page",
				    "result": "no"
				}
            ]
        };

        //Notification call
        notification.notify(confi, function (responce) {
            if (responce.result == "yes") {
                $state.go('expandedLandingList', { pagefor: 'manage', doctype: 'order' });
            } else {
                return;
            }
        });
    }

    $scope.revokeChangeOrder = function () {
        notification.notify(revokeChObj, function (resp) {
            if (resp.result == "yes") {
                notification.notify(revokeChSuccObj);
            }
        });
    }

    $scope.copyOrder = function () {
        notification.notify(copyOrderObj);
    }
    $scope.deleteOrder = function () {
        notification.notify(deleteOrderObj, function (responce) {
            var result = responce.result;

            if (result == 'yes') {
                history.go(-1);
                $rootScope.$broadcast('itemDelet', { itemFrom: 'Order' });

            }

        });
    }

    $scope.showOrderPreview = function () {
        $state.go('p2p.order.preview');
    }

    

    // POPUP -- comments 
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

    $scope.showCommentsPopup = false;
    $scope.showCommentsPopupCallback = function (e) {
        $scope.showCommentsPopup = true;
    };
    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showCommentsPopup = false;
        $scope.commentIcon = '#icon_Commented';//icon_Comments
    };

    $scope.commentList = [{
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "rutrum eu dui rutrum eu dui  rutrum eu dui rutrum eu dui.",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: true,
        attachments: [{
            filename: "lorem.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "rutrum eu dui rutrum eu dui. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: false,
        attachments: [{
            filename: "reprehenderit.xls"
        }, {
            filename: "velit.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: true,
        attachments: [{
            filename: "rutrum.xls"
        }, {
            filename: "dui.xls"
        }, {
            filename: "eu.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim .",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: false,
        attachments: [{
            filename: "consectetur.xls"
        }, {
            filename: "amet.xls"
        }]
    }, {
        UserName: "Joseph Powell",
        UserType: "Internal Users and Suppliers",
        commentTxt: "rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui.",
        commentDateTime: "10/12/2015 03:54 PM",
        isOtherUser: false,
        attachments: [{
            filename: "lorem.xls"
        }]
    }
    ];
    //comment popup.


    // POPUP -- attachment 
    $scope.attachmentPopUpUrl = "shared/popup/views/popupUploadDoc.html";

    //Attachment popup--start
    var comingFrom;
    $rootScope.showDoneBtn = false;
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e, popupComingfrom) {
        $scope.showUploadPopup = true;
        comingFrom = popupComingfrom;
        if (comingFrom != undefined) {
            $rootScope.showDoneBtn = true
        }
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
        if (comingFrom == undefined) {

            return false;
        } else if (comingFrom == "comment") {
            $scope.showCommentsPopup = true;
            $rootScope.showDoneBtn = false;
        } else if (comingFrom == "manageApproval") {
            $scope.mngAppShow = true;
            $rootScope.showDoneBtn = false;
        }

    }
    $scope.docFlag = false;
    $scope.uploadDocCall = function (e) {
        $scope.docFlag = true;
    };
    $scope.attachFlag = false;


    $scope.attachmentList = [
		{
		    name: "AttachmentOne.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentTwo.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		},
		{
		    name: "AttachmentThree.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		},
		{
		    name: "AttachmentFour.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		},
		{
		    name: "AttachmentFive.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		}
    ];
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;

        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function (el) {
        el.isShow = false;
    }

    $scope.retryCall = function (el) {
        el.status = "success";
    }
    $scope.removeRow = function (el) {
        // remove the row specified in index
        if ($scope.attachmentList.length > 1) {
            if ($scope.attachmentList.length == 2) {
                $scope.attachmentList[1].actionIconDelete = false;
            }
            $scope.attachmentList.splice(index, 1);
        }
    };

    $scope.commentsPopupgTabUrl = "shared/popup/views/commentsPopupTab.html";
    $scope.showCommentsPopupTab = false;
    $scope.showCommentsPopupTabCallback = function (e) {
        $scope.showCommentsPopupTab = true;
    };
    $scope.commentsPopupOnHideTabCallback = function (e) {
        $scope.showCommentsPopupTab = false;
        $scope.attPopUp = true;
    };
    $scope.tooltip = "Attachment 1" + "\n" + "Attachment 2" + "\n" + "Attachment 3" + "\n" + "Attachment 4" + "\n" + "Attachment 5";
    $scope.customStyle = {
        "textAlign": "left",
    };

    //Attachment popup--end


    $scope.modules = [
        { id: '0', name: 'REQUISITION', count: '3', number: 'REQ-2016.013110', url: 'requisition.html', isChecked: false },
        { id: '2', name: 'ORDER', count: '4', number: 'ORD-2015.523209', url: 'order.html', isChecked: false },
        { id: '3', name: 'INVOICE RECONCILIATION', count: '8', number: 'IR-2016.234829', url: 'invoice.html', isChecked: false },
    ]

    $scope.modulecurrentTab = 'requisition.html';
    $scope.moduleactiveListTabs = 0;
    $scope.modulesetActiveListTab = function (menuItema) {
        $scope.moduleactiveListTabs = menuItema;
        $scope.modulecurrentTab = $scope.modules[menuItema].url;
    }


    /* POPUP SEARCH */
    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    };





    $scope.onChange = function (config) {
        config.attributes.options = [{

            "pTerms": "Net 30"

        }, {

            "pTerms": "Net 31"

        }];
    }

    //send to buyer popup
    $scope.manageApprovalPopupPath = "p2p/shared/views/popupManageApproval.html";

    $scope.mngAppShow = false;
    $scope.mngAppPopupCallback = function (e) {
        $scope.mngAppShow = true;
    };

    $scope.mngAppPopupOnHideCallback = function () {
        $scope.mngAppShow = false;
    };

    // popup -- trackstatus
    $scope.trackStatusPopupUrl = "shared/popup/views/popupNewTrackStatus.html";
    $scope.trackStatusPopup = false;
    $scope.trackStatusPopupCallback = function (e) {
        $scope.trackStatusPopup = true;
    };
    $scope.trackStatusOnHideCallback = function (e) {
        $scope.trackStatusPopup = false;
    };


    /* tax popover */
    $scope.taxConfig =
        [
        {
            "dataName": "Order Value",
            "dataValue": 678.00,
            "taxEditable": true,
            "makeEdit": false,
            "editableFieldFocus": false
        },
        {
            "dataName": "Shipping",
            "dataValue": 109.00,
            "taxEditable": true,
            "makeEdit": false,
            "editableFieldFocus": false
        },
        {
            "dataName": "Taxes",
            "dataValue": 0,
            "taxEditable": false,
            "makeEdit": false,
            "editableFieldFocus": false
        }
        ,
        {
            "dataName": "Other Charges",
            "dataValue": 678,
            "taxEditable": false,
            "makeEdit": false,
            "editableFieldFocus": false
        }
        ];

    $scope.getTotalTax = function () {
        var count = 0;
        angular.forEach($scope.taxConfig, function (taxValue) {

            count += parseInt(taxValue.dataValue)

        });

        return count;

    };

    $scope.makeEditCurrent = function (elem) {
        $scope.taxConfig.forEach(function (element, index, array) {
            $scope.taxConfig[index].makeEdit = false;
            $scope.taxConfig[index].editableFieldFocus = false;
        });
        $scope.taxConfig[elem].makeEdit = true;
        $scope.taxConfig[elem].editableFieldFocus = true;
    };



    $scope.newTaxValue = $filter('number')("0", 2);


    $scope.updateTaxValue = function (index, data) {
        $scope.taxConfig[index].dataValue = $filter('number')(data, 2);
        $scope.newTaxValu = $filter('number')("0", 2);;
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }

    $scope.cancelupdateTaxValue = function (index) {
        $scope.newTaxValu = $filter('number')("0", 2);
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }


    // ad hoc Approvals
    $scope.adhocApprovalsPopupUrl = "shared/popup/views/popupadhocApprovals.html";
    $scope.adhocApprovalsPopup = false;
    $scope.adhocApprovals = function (e) {
        $scope.adhocApprovalsPopup = true;
    };
    $scope.adhocApprovalsOnHideCallback = function (e) {
        $scope.adhocApprovalsPopup = false;
    };

    $scope.suggestedData = [
        {
            "name": "John Doe",
            "type": "user",
            "members": "",
            "reassign": false,
            "reassignedTo": "",
            "edit": false
        },
    {
        "name": "Michael Slater",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    },
    {
        "name": "Jammie Foster",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    },
    {
        "name": "Ozborne Lopez",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    }
    ];


    $scope.autoSuggestPlaceholder = "Type Members Name";

    $scope.getCurrentSelected = {};
    $scope.selectedForApproval = [];

    $scope.deleteCurrent = function (index) {
        $scope.selectedForApproval.splice(index, 1);
        if ($scope.selectedForApproval.length == 0) {
            $scope.isMemberAdd = false;
            $scope.disabled = false;
        }
    };

    $scope.onSmartTypeHeadOpen = function () {
        $scope.adhocApprovalsPopup = false;
    }

    $scope.isMemberAdd = false;
    $scope.getCurrentSelected = [];
    $scope.selectedForApproval = [];
    $scope.pushCurrent = function (getCurrentSelected) {
        if (getCurrentSelected != undefined) {
            var curObj = getCurrentSelected[0],
                copiedObject = $.extend({}, curObj)
            if ($scope.selectedForApproval.indexOf(curObj) === -1)
                $scope.selectedForApproval.push(copiedObject);

            $scope.getCurrentSelected = [];
        }
        $scope.isMemberAdd = true;
        $scope.disabled = true;
    };

    $scope.onSmartTypeHeadClose = function (getCurrentSelected) {
        // function not wokring due to smart typeahead  not working propery

        if ($scope.getCurrentSelected != null) {
            $scope.selectedForApproval = [];
            angular.forEach(getCurrentSelected.result, function (value, key) {
                var foundItem = $filter('filter')($scope.selectedForApproval, value, true)[0];
                //get the index
                if ($scope.selectedForApproval.indexOf(foundItem) === -1)
                    $scope.selectedForApproval.push(value);
            });
        }
        $scope.adhocApprovalsPopup = true;
        $scope.isMemberAdd = true;
        $scope.disabled = true;
    }

    //End adhoc popup

    $scope.materialItemsOnChange = function () {
        toleranceFieldStateChanged("materialItem", $scope.dataModel.defaultMaterialItem.name);
    }

    $scope.serviceItemsOnChange = function () {
        toleranceFieldStateChanged("serviceItem", $scope.dataModel.defaultServiceItem.name);
    }

    function toleranceFieldStateChanged(toleranceType, selectedItem) {
        if (selectedItem == "No Limit") {
            angular.forEach(foundTolerance[0].rows, function (value, rIdx) {
                angular.forEach(foundTolerance[0].rows[rIdx].properties, function (value, pIdx) {
                    if (toleranceType == "materialItem" && foundTolerance[0].rows[rIdx].properties[pIdx].label == "Percentage (%)") {
                        foundTolerance[0].rows[rIdx].properties[pIdx].isVisible = false;
                    }
                    else if (toleranceType == "serviceItem" && foundTolerance[0].rows[rIdx].properties[pIdx].label == "USD") {
                        foundTolerance[0].rows[rIdx].properties[pIdx].isVisible = false;
                    }
                });
            });
        }
        else {
            angular.forEach(foundTolerance[0].rows, function (value, rIdx) {
                angular.forEach(foundTolerance[0].rows[rIdx].properties, function (value, pIdx) {
                    if (toleranceType == "materialItem" && foundTolerance[0].rows[rIdx].properties[pIdx].label == "Percentage (%)") {
                        foundTolerance[0].rows[rIdx].properties[pIdx].isVisible = true;
                    }
                    else if (toleranceType == "serviceItem" && foundTolerance[0].rows[rIdx].properties[pIdx].label == "USD") {
                        foundTolerance[0].rows[rIdx].properties[pIdx].isVisible = true;
                    }
                });
            });
        }
    }

    $scope.contractNumOptions = [
        {
            "UserId": 28360,
            "ContractNum": "CON-234908 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-879056 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-456321 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-456378 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-098567 :: Test Blanket AVI",
        },
        {
            "UserId": 28360,
            "ContractNum": "CON-109567 :: Test Blanket AVI",
        }
    ];

    $scope.selectedContractNum = $scope.contractNumOptions[0];
}

function itemDetailPOCtrlFunc($scope, $translate, notification, $state, ScrollTo, $sce, $http, $timeout) {
    $scope.blinktext = false
    $scope.checkBlinking = function () {
        $scope.blinktext = true;
        $timeout(function () {
            $scope.blinktext = false;
        }, 3000)
    }
    $scope.exemptConfirmCall = function () {

        var config = {
            type: "confirm",
            message: "<div class='left-align'>This will result in deleting all the Taxes associated with the Line Item. Do you want to proceed?</div>",
            buttons:
				[
					{ "title": "YES", "result": "yes" },
					{ "title": "No", "result": "no" }
				]
        }
        notification.notify(config, function (response) {
            if (response.result == 'no') {
                $scope.showTaxesPopup = true;
            }
        });
    }

    // popup -- search
    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    };

   
    //select All -- add lines from -- requisition tab
    $scope.selectedReq = { checkedAll: false };
    $scope.checkAllReq = function (check) {
        $scope.fillpartial = false;
        $scope.isDisabled = false;
        if (check) {
            for (var i = 0; i < $scope.importFromReq.length; i++) {
                $scope.importFromReq[i].isSelected = true;
                $scope.isDisabled = true;
            }
            if ($scope.isDisabled = true) {
                $scope.resetisSelected = function () {
                    for (var i = 0; i < $scope.importFromReq.length; i++) {
                        $scope.importFromReq[i].isSelected = false;
                        $scope.isDisabled = false;
                        $scope.selectedReq = { checkedAll: false };
                        
                    }
                }
               }
        }
        else {
            for (var i = 0; i < $scope.importFromReq.length; i++) {
                $scope.importFromReq[i].isSelected = false;
                $scope.isDisabled = false;
            }
        }
       
    }
    $scope.checkReqChange = function (check) {
        $scope.countPricesheetList = 0;
        for (var i = 0; i < $scope.importFromReq.length; i++) {
            if ($scope.importFromReq[i].isSelected == true) {
                $scope.countPricesheetList++;
                $scope.isDisabled = true;

                if ($scope.isDisabled = true) {
                    $scope.resetisSelected = function () {
                        for (var i = 0; i < $scope.importFromReq.length; i++) {
                            $scope.importFromReq[i].isSelected = false;
                            $scope.isDisabled = false;
                            $scope.fillpartial = false;
                            $scope.selectedReq = { checkedAll: false };
                        }
                    }
                }
            }
        }
        $scope.isDisabled = true;
        $scope.fillpartial = true;
        if ($scope.countPricesheetList === 0) {
            $scope.fillpartial = false;
            $scope.selectedReq.checkedAll = false;
            $scope.isDisabled = false;
           
        }
        else if ($scope.countPricesheetList === $scope.importFromReq.length) {
            $scope.fillpartial = false;
            $scope.selectedReq.checkedAll = true;
            $scope.isDisabled = true;
            if ($scope.isDisabled = true) {
                $scope.resetisSelected = function () {
                    for (var i = 0; i < $scope.importFromReq.length; i++) {
                        $scope.importFromReq[i].isSelected = false;
                        $scope.isDisabled = false;
                        $scope.fillpartial = false;
                        $scope.selectedReq = { checkedAll: false };
                    }
                }
            }
        }
        else {
            $scope.fillpartial = true;
            $scope.isDisabled = true;
        }

    }

    //select All -- add lines from -- template tab

    $scope.focusSearchT = false;
    $scope.isActiveT = false;
    $scope.showMeT = false;
    $scope.showSearchT = function () {
        $scope.isActiveT = true;
        $scope.focusSearchT = true;
        $scope.showMeT = true;
        $scope.hideCloseT = true;
    };

    $scope.hideSearchT = function () {
        $scope.isActiveT = false;
        $scope.focusSearchT = false;
        $scope.hideCloseT = false;
    };

    $scope.selectedTemp = { checkedAll: false };
    $scope.checkAllTemp = function (check) {
        $scope.fillpartial = false;
        if (check) {
            for (var i = 0; i < $scope.importFromTemp.length; i++) {
                $scope.importFromTemp[i].isSelected = true;
            }
        }
        else {
            for (var i = 0; i < $scope.importFromTemp.length; i++) {
                $scope.importFromTemp[i].isSelected = false;
            }
        }
    }
    $scope.checkTempChange = function (check) {
        $scope.countPricesheetList = 0;
        for (var i = 0; i < $scope.importFromTemp.length; i++) {
            if ($scope.importFromTemp[i].isSelected == true) {
                $scope.countPricesheetList++;
            }
        }
        $scope.fillpartial = true;
        if ($scope.countPricesheetList === 0) {
            $scope.fillpartial = false;
            $scope.selectedTemp.checkedAll = false;
        }
        else if ($scope.countPricesheetList === $scope.importFromTemp.length) {
            $scope.fillpartial = false;
            $scope.selectedTemp.checkedAll = true;
        }
        else {
            $scope.fillpartial = true;
        }

    }


    $scope.itemDetailPOTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/order/views/itemDetailMatLinesTab.html", "active": true },
        { "title": "Charges And Allowances", "contentUrl": "p2p/order/views/chargesAndAllowances.html", },
		{ "title": "Accounting", "contentUrl": "p2p/order/views/itemDetailMatAccTab.html" },
        { "title": "Notes and Attachments", "contentUrl": "p2p/order/views/itemDetail-notes-attachments.html" }
    ];

    $scope.flexibleDetailPOTabDataset = [
		{ "title": "Charges", "contentUrl": "p2p/order/views/chargesandAllowChargesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/order/views/chargesandAllowAccTab.html" },
    ];

    $scope.importLineItemsTabDataset = [
		{ "title": "Requisition", "contentUrl": "p2p/order/views/importLineItemsReqTab.html", "active": true },
		{ "title": "Templates", "contentUrl": "p2p/order/views/importLineItemsTemplTab.html" }
    ];


    $scope.spExternalLinks = ['3 S&Ps', '2 S&Ps', '5 S&PS', '6 S&PS', '4 S&PS'];

    $scope.getspLink = function (rowIndex) {
    		
    		return $scope.spExternalLinks[rowIndex];
    	}



    //import from requisition
   
    $scope.importFromReq = [
        {
            "Name": "Payment Term",
            "Number": "REQ-2016.000313",
            "showFlag": true,
            "isSelected": false,
            "countItem": "10",
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Legal Entity",
            "Number": "REQ-2016.000313",
            "countItem": "10",
            "showFlag": false,
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            }
            ]
        },
        {
            "Name": "shipping & freight",
            "Number": "REQ-2016.000313",
            "countItem": "10",
            "showFlag": true,
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            }
            ]

        }
    ];
 
    $scope.importFromTemp = [
        {
            "Name": "Payment Term Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Legal Entity Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Shipping & freight Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]

        }
    ];



    $scope.selectedTemplateData = [];
    //$scope.showReqTempCall = function (index) {
    //    $scope.selectedTemplateData = [];
    //    $scope.showReqTemp = true;
    //    $scope.slideObj = {
    //        list: $scope.selectedTemplateData,
    //        index: index,
    //        src: 'p2p/req/views/reqTemplatePopupContent.html'
    //    };
    //};
    //$scope.closeReqTempPopup = function () {
    //    $scope.showReqTemp = false;
    //}
    var currentTempList = $scope.importFromReq;
    $scope.tabChangeCall = function (obj) {
        if (obj.id == 1) {
            currentTempList = $scope.importFromReq;
        } else {
            currentTempList = $scope.importFromTemp;
        }
    }
    $scope.reqTemplateNextCall = function () {
        $scope.reqTempCount = 0;
        $scope.selectedTemplateData = [];      
        for (var i = 0; i < currentTempList.length; i++) {
            if (currentTempList[i].isSelected == true) {
                $scope.selectedTemplateData.push(currentTempList[i]);
            }
        }       
        if ($scope.selectedTemplateData.length > 0) {           
                $scope.addLinesFormPopUp = false;
                $scope.showReqTempCall();           
                     
        }       
    }
    $scope.showReqTemp = false;
    $scope.showReqTempCall = function () {
        $scope.showReqTemp = true;
        $scope.currentTemplateData = $scope.selectedTemplateData[0];
    }
    $scope.hideReqTempCallback = function (e) {
        $scope.showReqTemp = false;
    }
    $scope.reqTempCount = 0;    
    $scope.prevReqTemp = function () {        
        $scope.currentTemplateData = [];
        if ($scope.reqTempCount > 0) {
            $scope.reqTempCount--;
        }
        $scope.currentTemplateData = $scope.selectedTemplateData[$scope.reqTempCount];
    }
    $scope.nextReqTemp = function () {
        $scope.currentTemplateData = [];
        if ($scope.reqTempCount < $scope.selectedTemplateData.length) {
            $scope.reqTempCount++;
        }
        $scope.currentTemplateData = $scope.selectedTemplateData[$scope.reqTempCount];
    }
    $scope.selectAllTemple = function (selectedTemplateallitem) {        
        var tempAttr = $scope.currentTemplateData.tempAttr;
        if (selectedTemplateallitem.isCheckedAll != true) {
            $scope.selectedItems = 0;
            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = false;
            }
        } else {
            $scope.selectedItems = tempAttr.length;
            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = true;
            }
        }

    };
    $scope.selectedItems = 6;
    $scope.addItem = function (elem, index) {
        var selectedItemCount = 0;
        if (elem == true) {
            $scope.selectedItems = ($scope.selectedItems + 1);
        } else {           
            $scope.selectedItems = ($scope.selectedItems - 1);
        }
        if ($scope.selectedItems == $scope.currentTemplateData.tempAttr.length) {
            $scope.currentTemplateData.isCheckedAll = true;
        } else
            $scope.currentTemplateData.isCheckedAll = false;
    };

    $scope.closeDropDialogs = function () {
        angular.element(document).click();
    }

    $scope.fields = [];
    $scope.accfields = [];

    //line -- manage columns
    $scope.manageColumns = function () {
     
        $scope.fields = angular.copy($scope.itemConfig);
        $scope.noOfCol = parseInt(Math.round($scope.fields.length / 5));
        $scope.colWidth = 200;
        $scope.listHolderWidth = { 'width': $scope.noOfCol * $scope.colWidth + "px" }
        $scope.startVal = 0;


        $scope.getStartFrom = function () {
            $scope.startVal += 1;
        };

        $scope.cloneDiv = function (n) {
            return new Array(n);
        };

        $scope.itemsLimit = 5;
        $scope.itemsColumnized = function (myIndex) {
            var currentPageIndex = myIndex * $scope.itemsLimit;
            return $scope.fields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };


    }

	//line -- manage columns -- check all
    $scope.selectedAll = { 'selection': false }, $scope.splitsSelectedAll = { 'selection': false }, $scope.fillpartial = false, $scope.isVisible = false;
    $scope.checkAll = function (aug) {
        angular.forEach($scope.fields, function (field, key) {
            $scope.fields[key].selected = aug;
        });
        if (aug === true) {
            $scope.isVisible = true;
            $scope.fillpartial = false;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);
    };

    //line -- manage columns -- reset
    $scope.reset = function () {
        $scope.selectedAll.selection = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
        $scope.selectedCount = getSelectedCout($scope.fields);
    };

    //apply current selected
    $scope.applyCurrentfield = function () {
        angular.forEach($scope.fields, function (value, key) {
            if (value.isVisible != $scope.itemConfig[key].isVisible) {
                $scope.itemConfig[key].isVisible = value.isVisible
            }
        });
    };
    $scope.cancelManageField = function() {
     angular.forEach($scope.itemConfig, function (value, key) {
         if (value.isVisible != $scope.fields[key].isVisible) {
             $scope.fields[key].isVisible = value.isVisible
         }
     });
    };


    //line -- manage columns -- on change in list checkboxes
    $scope.onChange = function (obj) {
        if (isAtleastOneSelected($scope.fields)) {
            $scope.isVisible = true;
            $scope.fillpartial = true;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
            $scope.selectedAll.selection = false;
        }
        if (isAllSelected($scope.fields)) {
            $scope.fillpartial = false;
            $scope.selectedAll.selection = true;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);
    }

    //line -- manage columns -- global fn for get count
    function getSelectedCout(obj) {
        var count = 0;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].isVisible === true) {
                count++;
            }
        }
        return count;
    }
    $scope.selectedCount = getSelectedCout($scope.fields);

    //line -- manage columns -- global fn for at least on checkbox selection in list
    function isAtleastOneSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].isVisible === true) {
                return true;
            }
        }
        return false;
    }

    //line -- manage columns -- global fn for all checkboxes selection
    function isAllSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].isVisible) {
                return false;
            }
        }
        return true;
    }

    //accounting details -- manage columns
    $scope.accManageColumns = function () {
        $scope.accfields = [];
        $scope.accfields = [
        { 'lable': 'UOM' },
        { 'lable': 'Split Taxes & Charges (USD)' },
        { 'lable': 'Requester' }
        ];
    }

    //localization label - normal label, config labels
    $scope.labels = {
        supplierLable: $translate.instant("Supplier"),
        shippingLable: $translate.instant("Shipping"),
        accountingLable: $translate.instant("Accounting"),
        addDetailsLable: $translate.instant("Additional Details")
    };

    //localization label - buttons
    $scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };
    $scope.resetBtnConfig = { title: $translate.instant("RESET") };
    $scope.selectItemsBtnConfig = { title: $translate.instant("SELECT ITEMS") };
    $scope.doneBtnConfig = { title: $translate.instant("DONE") };
    $scope.backBtnConfig = { title: $translate.instant("BACK") };
    $scope.ApplyBtnConfig = { title: $translate.instant("APPLY") };

    // POPUP -- apply to all 
    $scope.applyToAllUrl = "shared/popup/views/popupLinesBulkEdit.html";

    $scope.applyToAllPopUp = false;
    $scope.applyToAllPopUpCallback = function (e) {
        $scope.applyToAllPopUp = true;
    };
    $scope.applyToAllPopUpClose = function (e) {
        $scope.applyToAllPopUp = false;
    };


    $scope.addLinesFormUrl = "p2p/order/views/popupAddLinesForm.html";

    $scope.addLinesFormPopUp = false;
    $scope.addLinesFormPopUpCallback = function (e) {
        $scope.addLinesFormPopUp = true;
    };
    $scope.addLinesFormPopUpClose = function (e) {
        $scope.addLinesFormPopUp = false;
    };

    // popup -- apply to all -- sidebar links
    $scope.iteams = [
	{ title: $scope.labels.supplierLable, lable: 'supplier', isChecked: false },
	{ title: $scope.labels.shippingLable, lable: 'shipping', isChecked: false },
	{ title: $scope.labels.accountingLable, lable: 'accounting', isChecked: false },
    { title: $scope.labels.addDetailsLable, lable: 'additionalDetails', isChecked: false }
    ];

    // popup -- apply to all -- vertical tabs
    $scope.tab = 0;
    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    // popup -- apply to all -- lables
    $scope.updateLineData = {
        "suppName": "CTPG OPERATING LLC",
        "suppCode": "CTPG-2014.000000",
        "shipto": "CTPG-2014.000000",
        "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708.",
        "deliverTo": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708.",

        "bu": "101 - GEP, New Jersey",
        "costCenter": "1011 - OutSourcing",
        "glCode": "2034 - Generral Service",
        "projectCode": "2034040 - Project Code",
        "contractNo": "20380 - IT/Hardware",
        "date": "1494786600000",
        "suppContact": "+1-541-854-1010",
        "startDate": "1483986600000",
        "endDate": "1494786600000",
        "reciept_Confirmation": {
            "options" : [ {
                "code": "yes",
                "name": "Yes"
            },
             {
                 "code": "no",
                 "name": "No"
             }],
            "selected" : {
                "code": "yes",
                "name": "Yes"
            }
   }
    };

    $scope.updateSplitsData = {
        "requester": "John Doe",
        "costCenter": "A",
        "accountNumber": "-",
        "projectId": "39099-21-25",
    }

    // popup -- apply to all -- checkbox Selection interaction
    $scope.isChecked = {};

    // popup -- apply to all -- select item
    $scope.applyToAllSplitsUrl = "shared/popup/views/popupSplitsBulkEdit.html";

    $scope.applyToAllSplitsPopUp = false;
    $scope.applyToAllSplitsPopUpCallback = function (e) {
    	$scope.applyToAllSplitsPopUp = true;
    };
    $scope.applyToAllSplitsPopUpClose = function (e) {
    	$scope.applyToAllSplitsPopUp = false;
    };

    // popup -- apply to all -- select item -- item list
    $scope.itemList = [{ 'lable': 'Description 1' }, { 'lable': 'Description 2' }, { 'lable': 'Description 3' }, { 'lable': 'Description 4' }, { 'lable': 'Description 5' }, { 'lable': 'Description 6' }, { 'lable': 'Description 7' }, { 'lable': 'Description 8' }, { 'lable': 'Description 9' }, { 'lable': 'Description 10' }];

    $scope.spiltsItemList = [{ 'lable': 'Description 1 - Split 1 ' }, { 'lable': 'Description 2 - Split 2' }, { 'lable': 'Description 3 - Split 3' }, { 'lable': 'Description 4 - Split 4' }, { 'lable': 'Description 5 - Split 5' }, { 'lable': 'Description 6 - Split 6' }, { 'lable': 'Description 7 - Split 7' }, { 'lable': 'Description 8 - Split 8' }, { 'lable': 'Description 9 - Split 9' }, { 'lable': 'Description 10 - Split 10' }];

    //popup -- apply to all-select items -- select All
    $scope.checkAllC = function (aug) {
        angular.forEach($scope.itemList, function (itemList, key) {
        	$scope.itemList[key].selected = aug;
        });
    };

    $scope.checkAllSplits = function (aug) {
    	angular.forEach($scope.spiltsItemList, function (itemList, key) {
    		$scope.spiltsItemList[key].selected = aug;
    	});
    };

    $scope.addLines = 1;


    // popup -- manufacturer details -- select item -- item list
    $scope.manufatureDetails = "shared/popup/views/popupManufacturerDetails.html";
    $scope.manufatureDetailsPopup = false;
    $scope.manufatureDetailsCallback = function (e) {
        $scope.manufatureDetailsPopup = true;
    };
    $scope.manufatureDetailsPopupHideCallback = function (e) {
        $scope.manufatureDetailsPopup = false;
    };

    // popup -- Add Info
    $scope.AddChargesinfo = "shared/popup/views/popupEditStandardAndProcedure.html";
    $scope.AddChargesinfoPopup = false;
    $scope.AddChargesinfoCallback = function (e) {
        $scope.AddChargesinfoPopup = true;
    };
    $scope.AddChargesinfoPopupHideCallback = function (e) {
        $scope.AddChargesinfoPopup = false;
    };


    // popup -- Add Info
    $scope.AddChargesAttach = "shared/popup/views/popupEditStandardAttacment.html";
    $scope.AddChargesAttachPopup = false;
    $scope.AddChargesAttachCallback = function (e) {
        $scope.AddChargesAttachPopup = true;
    };
    $scope.AddChargesAttachPopupHideCallback = function (e) {
        $scope.AddChargesAttachPopup = false;
    };

    // popup -- Supplier Location -- list
    $scope.supLocationUrl = "shared/popup/views/popupSupplierLocation.html";
    $scope.supLocationPopup = false;
    $scope.supLocationCallback = function (e) {
        $scope.supLocationPopup = true;
    };
    $scope.supLocationPopupOnHideCallback = function (e) {
        $scope.supLocationPopup = false;
    };

    // popup -- Contract Number -- list
    $scope.contractNumberUrl = "shared/popup/views/popupContractNumber.html";
    $scope.contractNumberPopup = false;
    $scope.contractNumCallback = function (e) {
        $scope.contractNumberPopup = true;
    };
    $scope.contractNumberPopupOnHideCallback = function (e) {
        $scope.contractNumberPopup = false;
    };

    // UI Grid -- popup callback 
    $scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive

        // UI Grid -- popup callback -- category papup

        if (def.col && def.col.displayName == 'Category') {
            $scope.treeOpenCallback('category');
        }
        // UI Grid -- popup callback -- supplier location papup
        if (def.col && def.col.field == 'supplierLocation') {
            $scope.supLocationPopup = true;
        }
        // UI Grid -- popup callback -- supplier location papup
        if (def.col && def.col.field == 'contractNum') {
            $scope.contractNumberPopup = true;
        }
        // UI Grid -- popup callback -- taxes papup
        if (def.col &&  def.col.field == 'taxes') {
            $scope.showTaxesPopup = true;
        }
        // UI Grid -- popup callback -- manufacturer details papup
        if (def.col && def.col.field == 'manufacturerDetails') {

            $scope.manufatureDetailsPopup = true;
        }

        if (def.col && def.col.field == 'AddInfo') {

            $scope.AddChargesinfoPopup = true;
            $scope.forEditColumnObj = def;
            if (def.row.entity.AddInfo != def.col.colDef.attributes.defaultTitle) {
                $scope.addInfoPopupText = def.row.entity.AddInfo;
            } else {
                $scope.addInfoPopupText = "";
            }
        }

        if (def.col && def.col.field == 'AddInfoAttach') {

            $scope.AddChargesAttachPopup = true;
            $scope.forEditColumnObj = def;
            if (def.row.entity.AddInfoAttach != def.col.colDef.attributes.defaultTitle) {
                $scope.AddInfoAttachPopupText = def.row.entity.AddInfoAttach;
            } else {
                $scope.AddInfoAttachPopupText = "";
            }

        }

        // UI Grid -- popup callback -- S&P
        if (def.col && def.col.field == 'spLink' && def.row.entity.spLink == 'ADD S&P') {
            $scope.showSPPopup = true;
        }
        else if (def.col && def.col.field == 'spLink') {
            $scope.showGridSandPPopup = true;
        }


        // UI Grid -- popup callback -- split number papup
        if (def.col && def.col.field == 'splitNumber') {
            $scope.splitPopupPopup = true;
            $scope.isIEbrowser = false;
            $scope.lineNumber = def.row.entity.lineNumber;
            $scope.lineDescription = def.row.entity.lineDescription;
            $scope.splitTotal = def.row.entity.splittotal;
            $scope.quantity = def.row.entity.quantity;

            $timeout(function () {
                if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
                    $scope.isIEbrowser = true;
                }
            }, 100);
        }

    };

    $scope.addInfoPopupText = "";
    
    $scope.addInfoSaved = function (val) {
        $scope.addInfoPopupText = val;
        $scope.forEditColumnObj.row.entity.AddInfo = $scope.addInfoPopupText;
        //console.log(val);
    };


    $scope.addInfoPopupAttachment = "";
    $scope.hideDownloadTemplate = true;

    $scope.addInfoSavedClick = function (val) {
        $scope.addInfoPopupAttachment = val;
        $scope.forEditColumnObj.row.entity.AddInfoAttach = $scope.addInfoPopupAttachment;
        //console.log(val);
    };

    $scope.defaultSelectedSupplierLocation = { locationName: "Mumbai" };

    $scope.supplierLocationOptions = [
        {
            locationName: "Mumbai"
        },
        {
            locationName: "Pune"
        },
        {
            locationName: "Goa"
        },
        {
            locationName: "Sikkim"
        },
        {
            locationName: "Gujrat"
        },
        {
            locationName: "Delhi"
        },
        {
            locationName: "Manipur"
        },
        {
            locationName: "Hyderabad"
        },
        {
            locationName: "Bangalore"
        },
        {
            locationName: "Kerla"
        }
    ];

    $scope.defaultSelectedContractNumber = { conNumber: "CON.256236" };

    $scope.contractNumberOptions = [
        {
            conNumber: "CON.256236"
        },
        {
            conNumber: "CON.852369"
        },
        {
            conNumber: "CON.963147"
        },
        {
            conNumber: "CON.145789"
        },
        {
            conNumber: "CON.120420"
        },
        {
            conNumber: "CON.559860"
        }
    ];

    //UI grid -- Items
	$scope.skip = false;
    $scope.itemConfig = [
			{
                "field": "Skip",
                "width": 70,
                "displayName": "Skip",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                "cellTemplate": "<div class='ui-grid-cell-container-with-icons marginTop4' ng-if='row.entity.skip'><a href='javascript:void(0)' class='left dropdown-button' data-constrainwidth='false' data-alignment='right'><span class='partiallyReceived marginTop2 left'></span></a></div>"
            },
            {
                "field": "lineNumber",
                "width": 120,
                "displayName": "Line Number",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate'>{{row.entity.lineNumber}}</span><a ui-sref='p2p.order.transactionHistory({id: {{row.entity.lineNumber - 1}} })' class='ui-grid-cell-container-icons'><i class='icon iconSmall' ng-class=\"{'green-text': row.entity.receivedAllItems == true, 'red-text': row.entity.receivedAllItems == false}\"><svg><use xlink:href='#icon_itemHistory'></use></svg></i></a></div>"
            },
            {
                "field": "lineType.key",
                "width": 150,
                "displayName": "Line Type",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "itemNumber",
                "width": 150,
                "displayName": "Item Number",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
	        {
	            "field": "description",
	            "width": 200,
	            "displayName": "Description",
	            "isFixed": "Left",
	            "isVisible": true,
	            "isReadOnly": false,
	            "autoIncrement": false,
	            "filterObject": { "enableFiltering": true },
	            "type": "editable"
	        },
		    {
		        "field": "supplierName.name",
		        "width": 150,
		        "displayName": "Supplier Name",
		        "isVisible": true,
		        "filterObject": { "enableFiltering": true },
		        "type": "editable"
		    },
            {
                "field": "supplierLocation",
                "width": 150,
                "displayName": "Supplier Location",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                /*"attributes": {
                    "type": "supLocationCallback",
                    "defaultTitle": "Select Location"
                }*/
            },
            {
                "field": "supplierItemNumber",
                "width": 190,
                "displayName": "Supplier Item Number",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "category.name",
                "width": 150,
                "displayName": "Category",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "popup",
                "attributes": {
                    "type": "category",
                    "defaultTitle": "Select"
                }
            },
            {
                "field": "qtyEfforts",
                "width": 150,
                "displayName": "Quantity/Efforts",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "totalInvQty",
                "width": 150,
                "displayName": "Total Invoiced Quantity",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "number"
                },
                "type": "editable"
            },
            {
                "field": "totalRecvQty",
                "width": 150,
                "displayName": "Total Received Quantity",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "number"
                },
                "type": "editable"
            },
            {
                "field": "totalRetQty",
                "width": 150,
                "displayName": "Total Returned Quantity",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "number"
                },
                "type": "editable"
            },
            {
                "field": "totalInvAmt",
                "width": 150,
                "displayName": "Total Invoiced Amount (USD)",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "number"
                },
                "type": "editable"
            },
            {
                "field": "uom.name",
                "name": "uom.name",
                "width": 150,
                "displayName": "UOM",
                "isVisible": true,
                "isRegFocusCol": true,
                "filterObject": { "enableFiltering": true },
                "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "name",
                    "options": [
                      {
                          "code": "EA",
                          "name": "Each"
                      },
                      {
                          "code": "ALL",
                          "name": "All"
                      },
                      {
                          "code": "Testing",
                          "name": "TE"
                      }
                    ]
                }
            },
            {
                "field": "contractNum",
                "width": 150,
                "displayName": "Contract Number",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "popup",
                "attributes": {
                    "type": "contractNumberCallback",
                    "defaultTitle": "Select Number"
                }
            },
            {

                "field": "startDate",
                "width": 150,
                "displayName": "Start Date",
                "isMandatory": true,
                "isVisible": true,
                "attributes": {
                    "type": "date",
                    "format": "dd/MM/yyyy"
                },
                "filterObject": { "enableFiltering": true },
                "type": "editable",
            },
            {
                "field": "endDate",
                "width": 150,
                "displayName": "End Date",
                "isMandatory": true,
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "date",
                    "format": "dd/MM/yyyy"
                }
            },
            {
                "field": "unitPrice",
                "width": 150,
                "filterObject": { "enableFiltering": true },
                "displayName": "Unit Price (USD)",
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "total",
                "width": 150,
                "displayName": "Total (USD)",
                "isVisible": true,
                "attributes": {
                    "rule": "row.entity.unitPrice * row.entity.qtyEfforts",
                    "type":"number"
                },
                "filterObject": { "enableFiltering": true },
                "type": "calculated"
            },
            {
                 "field": "taxes",
                 "width": 150,
                 "displayName": "Taxes (USD)",
                 "isRegFocusCol": true,
                 "isVisible": true,
                 "filterObject": { "enableFiltering": true },
                 "attributes": {
                     "type": "showTaxesPopupCallback",
                     "defaultTitle": "EXEMPT"
                 },
                 "type": "popup",
            },
            {
                "field": "taxRate",
                "width": 150,
                "displayName": "Tax Rate",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "name": "otherCharges",
                "width": 175,
                "displayName": "Other Charges (USD)",
                "isVisible": true,
                "attributes": {
                    "rule": "row.entity.unitPrice / 20",
                    "type": "number"

                },
                "filterObject": { "enableFiltering": true },
                "type": "calculated"
            },
            {
                "field": "shippingFreight",
                "width": 210,
                "displayName": "Shipping & Freight (USD)",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "requestedDate",
                "width": 160,
                "displayName": "Requested Date",
                "isVisible": false,
                "attributes": {
                    "type": "date",
                    "format": "dd/MM/yyyy"
                },
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "needByDate",
                "width": 160,
                "displayName": "Need by Date",
                "isVisible": true,
                "attributes": {
                    "type": "date",
                    "format": "dd/MM/yyyy"
                },
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "shippingMethod",
                "width": 160,
                "displayName": "Shipping Method",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "shipTo.name",
                "width": 210,
                "displayName": "Ship to/Work Location",
                "isVisible": true,
                "isRegFocusCol": true,
                "filterObject": { "enableFiltering": true },
                "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "name",
                    "options": [
                      {
                          "code": "Mum",
                          "name": "Mumbai"
                      },
                      {
                          "code": "Hyd",
                          "name": "Hyderabad"
                      },
                      {
                          "code": "USA",
                          "name": "USA"
                      }
                    ]
                }
            },
            {
                "field": "shipTo.address",
                "width": 210,
                "displayName": "Ship to/Work Address",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "supplierShipFrom.location",
                "width": 200,
                "displayName": "Supplier Ship From",
                "isVisible": true,
                "isReadOnly": false,
                "isRegFocusCol": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "dropdown",
                "attributes": {
                    "model": "supplierShipFrom",
                    "dataKey": "location",
                    "options": [{
                        "id": 1,
                        "location": "Mumbai"
                    }, {
                        "id": 2,
                        "location": "Delhi"
                    }, {
                        "id": 3,
                        "location": "Chennai"
                    }]
                }
            },
            {
                "field": "supplierShipFromAddress",
                "width": 210,
                "displayName": "Supplier Ship From Address",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "deliverTo",
                "width": 160,
                "displayName": "Deliver to",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "procurementOption",
                "width": 210,
                "displayName": "Procurement Option",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "inventoryType",
                "width": 150,
                "displayName": "Inventory Type",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "matching",
                "width": 150,
                "displayName": "Matching",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "supplierCode",
                "width": 150,
                "displayName": "Supplier Code",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "supplierContact",
                "width": 150,
                "displayName": "Supplier Contact",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "manufacturer",
                "width": 180,
                "displayName": "Manufacturer Name",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "manufacturerDetails",
                "width": 230,
                "displayName": "Manufacturer Details",
                "isRegFocusCol": true,
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "manufatureDetailsCallback",
                    "defaultTitle": "EXEMPT"
                },
                "type": "popup",
            },
            {
                "field": "manufacturerPartNumber",
                "width": 230,
                "displayName": "Manufacturer Datails",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "contractNumber",
                "width": 150,
                "displayName": "Contract Number",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "contractName",
                "width": 150,
                "displayName": "Contract Name",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "contractExpiryDate",
                "width": 200,
                "displayName": "Contract Expiry Date",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "contractValue",
                "width": 150,
                "displayName": "Contract Value",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "paymentTerms",
                "width": 160,
                "displayName": "Payment Terms",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "spLink",
                "width": 230,
                "displayName": "Standards/Procedures",
                "isRegFocusCol": true,
                "attributes": {
                    "type": "spLink",
                    "defaultTitle": "ADD S&P"
                },
                "filterObject": { "enableFiltering": true },
                "type": "popup"
            },
            {
                "field": "addiInfo",
                "width": 230,
                "displayName": "Additional Information",
                "isVisible": true,
                "filterObject": { "enableFiltering": false },
                "enableCellEdit": false,
                "cellTemplate": "<a ui-sref='p2p.order.additionalInfo({id: {{row.entity.lineNumber}} })'> <span ng-if='row.entity.lineNumber == 1'>Add</span>  <span ng-if='row.entity.lineNumber != 1'>Edit </span> ({{row.entity.additionaInformation.length}})</a>"
            },
             {
                 "field": "receiptsConfirmaion.name",
                 "width": 210,
                 "displayName": "Allow Receipts/ Confirmation",
                 "isVisible": true,
                 "isRegFocusCol": true,
                 "filterObject": { "enableFiltering": true },
                 "type": "dropdown",
                 "attributes": {
                     "model": "type",
                     "dataKey": "name",
                     "options": [
                       {
                           "code": "yes",
                           "name": "Yes"
                       },
                       {
                           "code": "no",
                           "name": "No"
                       }
                     ]
                 }
             },

    ];
    $scope.itemModel =  [
  {
    "spLink": "3 S&PS",
    "isTaxExempt": false,
    "status": 1,
    "splitType": 0,
    "id": 21559,
    "taxRate": "6.00%",
    "lineNumber": 1,
    "receivedAllItems": true,
    "totalInvQty": 6,
    "totalRecvQty": 10,
    "totalRetQty": 0,
    "totalInvAmt": "30.00",
	"skip": true,
    "lineType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "0001",
    "description": "Dell Laptop",
    "supplierName": {
      "id": 6349,
      "name": "CTPG OPERATING LLC"
    },
    "supplierLocation": "Mumbai",
    "supplierItemNumber": "supplier Item Number",
    "category": {
      "id": 631550000849,
      "name": "BUSINESS TRAVEL"
    },
    "qtyEfforts": 100,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "startDate": "2016-04-22T08:38:51.073Z",
    "endDate": "2016-04-22T08:38:51.073Z",
    "unitPrice": 100,
    "total": 10000,
    "taxes": "Exempt",
    "otherCharges": 0,
    "shippingFreight": "Shipping & Freight",
    "requestedDate": "2016-04-21T18:30:00.000Z",
    "needByDate": "2016-04-29T18:30:00.000Z",
    "shippingMethod": "Best Available",
    "shipTo": {
      "id": 1,
      "name": "Mumbai",
      "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
    },
    "supplierShipFrom": { "id": 1, "location": "Mumbai" },
    "supplierShipFromAddress": "Mumbai",
    "deliverTo": null,
    "procurementOption": "Procurement Option",
    "inventoryType": false,
    "matching": false,
    "supplierCode": "09798",
    "supplierContact": "john@gep.com",
    "manufacturer": null,
    "manufacturerPartNumber": null,
    "manufacturerDetails": "Manufacturer Details",
    "contractNumber": "2015.000009",
    "contractName": "conctract for Laptop",
    "contractExpiryDate": "2015-01-16T18:30:00.000Z",
    "contractValue": 0,
    "paymentTerms": "net 30",
    "$$hashKey": "uiGrid-0012",
     "additionaInformation" : [
                {
            "title":"Dell Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "Question 1",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
                ]
                },
                {
            "title":"Lenovo Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                 },
                {
            "title":"Asus Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                },
                {
            "title":"IBM Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                }],
     "receiptsConfirmaion": {
         "code": "yes",
         "name": "Yes"
     }
  },
  {
    "spLink": "2 S&PS",
    "isTaxExempt": false,
    "status": 1,
    "splitType": 0,
    "id": 21559,
    "taxRate": "4.00%",
    "lineNumber": 2,
    "receivedAllItems": false,
    "totalInvQty": 15,
    "totalRecvQty": 20,
    "totalRetQty": 3,
    "totalInvAmt": "58.00",
	"skip": false,
    "lineType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Variable Service"
    },
    "itemNumber": "0002",
    "description": "Lenovo Laptop",
    "supplierName": {
      "id": 6349,
      "name": "CTPG OPERATING LLC"
    },
    "supplierLocation": "Hyderabad",
    "supplierItemNumber": "supplier Item Number",
    "category": {
      "id": 631550000849,
      "name": "BUSINESS TRAVEL"
    },
    "qtyEfforts": 100,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "startDate": "2016-04-22T08:38:51.073Z",
    "endDate": "2016-04-22T08:38:51.073Z",
    "unitPrice": 100,
    "total": 10000,
    "taxes": 0,
    "otherCharges": 0,
    "shippingFreight": "Shipping & Freight",
    "requestedDate": "2016-04-21T18:30:00.000Z",
    "needByDate": "2016-04-29T18:30:00.000Z",
    "shippingMethod": "Best Available",
    "shipTo": {
      "id": 1,
      "name": "Mumbai",
      "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
    },
    "supplierShipFrom": { "id": 1, "location": "Mumbai" },
    "supplierShipFromAddress": "Mumbai",
    "deliverTo": null,
    "procurementOption": "Procurement Option",
    "inventoryType": false,
    "matching": false,
    "supplierCode": "09798",
    "supplierContact": "john@gep.com",
    "manufacturer": null,
    "manufacturerPartNumber": null,
    "manufacturerDetails": "Manufacturer Details",
    "contractNumber": "2015.000009",
    "contractName": "conctract for Laptop",
    "contractExpiryDate": "2015-01-16T18:30:00.000Z",
    "contractValue": 0,
    "paymentTerms": "net 30",
    "$$hashKey": "uiGrid-0012",
     "additionaInformation" : [
                {
            "title":"Dell Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "Question 1",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
                ]
                },
                {
            "title":"Lenovo Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                 },
                {
            "title":"Asus Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                },
                {
            "title":"IBM Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                }],
     "receiptsConfirmaion": {
         "code": "yes",
         "name": "Yes"
     }
  },
  {
    "spLink": "5 S&PS",
    "isTaxExempt": false,
    "status": 1,
    "splitType": 0,
    "id": 21559,
    "taxRate": "8.56%",
    "lineNumber": 3,
    "receivedAllItems": true,
    "totalInvQty": 12,
    "totalRecvQty": 15,
    "totalRetQty": 2,
    "totalInvAmt": "44.00",
	"skip": true,
    "lineType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Fixed Service"
    },
    "itemNumber": "0003",
    "description": "Asus Laptop",
    "supplierName": {
      "id": 6349,
      "name": "CTPG OPERATING LLC"
    },
    "supplierLocation": "Bangalore",
    "supplierItemNumber": "supplier Item Number",
    "category": {
      "id": 631550000849,
      "name": "BUSINESS TRAVEL"
    },
    "qtyEfforts": 100,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "startDate": "2016-04-22T08:38:51.073Z",
    "endDate": "2016-04-22T08:38:51.073Z",
    "unitPrice": 100,
    "total": 10000,
    "taxes": 0,
    "otherCharges": 0,
    "shippingFreight": "Shipping & Freight",
    "requestedDate": "2016-04-21T18:30:00.000Z",
    "needByDate": "2016-04-29T18:30:00.000Z",
    "shippingMethod": "Best Available",
    "shipTo": {
      "id": 1,
      "name": "Mumbai",
      "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
    },
    "supplierShipFrom": { "id": 1, "location": "Mumbai" },
    "supplierShipFromAddress": "Mumbai",
    "deliverTo": null,
    "procurementOption": "Procurement Option",
    "inventoryType": false,
    "matching": false,
    "supplierCode": "09798",
    "supplierContact": "john@gep.com",
    "manufacturer": null,
    "manufacturerPartNumber": null,
    "manufacturerDetails": "Manufacturer Details",
    "contractNumber": "2015.000009",
    "contractName": "conctract for Laptop",
    "contractExpiryDate": "2015-01-16T18:30:00.000Z",
    "contractValue": 0,
    "paymentTerms": "net 30",
    "$$hashKey": "uiGrid-0012",
     "additionaInformation" : [
                {
            "title":"Dell Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "Question 1",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
                ]
                },
                {
            "title":"Lenovo Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                 },
                {
            "title":"Asus Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                },
                {
            "title":"IBM Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                }],
     "receiptsConfirmaion": {
         "code": "yes",
         "name": "Yes"
     }
  },
  {
    "spLink": "6 S&PS",
    "isTaxExempt": false,
    "status": 1,
    "splitType": 0,
    "id": 21559,
    "taxRate": "6.35%",
    "lineNumber": 4,
    "receivedAllItems": true,
    "totalInvQty": 23,
    "totalRecvQty": 25,
    "totalRetQty": 5,
    "totalInvAmt": "60.00",
	"skip": true,
    "lineType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Milestone Payment"
    },
    "itemNumber": "0004",
    "description": "Intel Laptop",
    "supplierName": {
      "id": 6349,
      "name": "CTPG OPERATING LLC"
    },
    "supplierLocation": "Chennai",
    "supplierItemNumber": "supplier Item Number",
    "category": {
      "id": 631550000849,
      "name": "BUSINESS TRAVEL"
    },
    "qtyEfforts": 100,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "startDate": "2016-04-22T08:38:51.073Z",
    "endDate": "2016-04-22T08:38:51.073Z",
    "unitPrice": 100,
    "total": 10000,
    "taxes": 0,
    "otherCharges": 0,
    "shippingFreight": "Shipping & Freight",
    "requestedDate": "2016-04-21T18:30:00.000Z",
    "needByDate": "2016-04-29T18:30:00.000Z",
    "shippingMethod": "Best Available",
    "shipTo": {
      "id": 1,
      "name": "Mumbai",
      "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
    },
    "supplierShipFrom": { "id": 1, "location": "Mumbai" },
    "supplierShipFromAddress": "Mumbai",
    "deliverTo": null,
    "procurementOption": "Procurement Option",
    "inventoryType": false,
    "matching": false,
    "supplierCode": "09798",
    "supplierContact": "john@gep.com",
    "manufacturer": null,
    "manufacturerPartNumber": null,
    "manufacturerDetails": "Manufacturer Details",
    "contractNumber": "2015.000009",
    "contractName": "conctract for Laptop",
    "contractExpiryDate": "2015-01-16T18:30:00.000Z",
    "contractValue": 0,
    "paymentTerms": "net 30",
    "$$hashKey": "uiGrid-0012",
     "additionaInformation" : [
                {
            "title":"Dell Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "Question 1",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
                ]
                },
                {
            "title":"Lenovo Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                 },
                {
            "title":"Asus Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                },
                {
            "title":"IBM Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                }],
     "receiptsConfirmaion": {
         "code": "yes",
         "name": "Yes"
     }
  },
  {
    "spLink": "ADD S&P",
    "isTaxExempt": false,
    "status": 1,
    "splitType": 0,
    "id": 21559,
    "taxRate": "5.55%",
    "lineNumber": 5,
    "receivedAllItems": false,
    "totalInvQty": 10,
    "totalRecvQty": 10,
    "totalRetQty": 0,
    "totalInvAmt": "50.00",
	"skip": true,
    "lineType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Progress Payment"
    },
    "itemNumber": "0005",
    "description": "IBM Laptop",
    "supplierName": {
      "id": 6349,
      "name": "CTPG OPERATING LLC"
    },
    "supplierLocation": "Delhi",
    "supplierItemNumber": "supplier Item Number",
    "category": {
      "id": 631550000849,
      "name": "BUSINESS TRAVEL"
    },
    "qtyEfforts": 100,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "startDate": "2016-04-22T08:38:51.073Z",
    "endDate": "2016-04-22T08:38:51.073Z",
    "unitPrice": 100,
    "total": 10000,
    "taxes": 0,
    "otherCharges": 0,
    "shippingFreight": "Shipping & Freight",
    "requestedDate": "2016-04-21T18:30:00.000Z",
    "needByDate": "2016-04-29T18:30:00.000Z",
    "shippingMethod": "Best Available",
    "shipTo": {
      "id": 1,
      "name": "Mumbai",
      "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
    },
    "supplierShipFrom": { "id": 1, "location": "Mumbai" },
    "supplierShipFromAddress": "Mumbai",
    "deliverTo": null,
    "procurementOption": "Procurement Option",
    "inventoryType": false,
    "matching": false,
    "supplierCode": "09798",
    "supplierContact": "john@gep.com",
    "manufacturer": null,
    "manufacturerPartNumber": null,
    "manufacturerDetails": "Manufacturer Details",
    "contractNumber": "2015.000009",
    "contractName": "conctract for Laptop",
    "contractExpiryDate": "2015-01-16T18:30:00.000Z",
    "contractValue": 0,
    "paymentTerms": "net 30",
    "$$hashKey": "uiGrid-0012",
     "additionaInformation" : [
                {
            "title":"Dell Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "Question 1",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
                ]
                },
                {
            "title":"Lenovo Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                 },
                {
            "title":"Asus Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                },
                {
            "title":"IBM Laptop",
            "showContent":false,
            "data": [{
                    "id": 1,
                    "sectionName": "",
                    "questions": [{
                        "question": "Work Order Type",
                        "type": "textfield",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "ERP Order Number ",
                        "type": "radio",
                        "questionResponse": "",
                        "options": [{
                            "code": "A",
                            "name": "Option A"
                        }, {
                            "code": "B",
                            "name": "Option B"
                        }]
                    }, {
                        "question": "",
                        "type": "checkbox",
                        "questionResponse": "",
                        "options": [{
                            "label": "Urgent",
                            "data": ""
                        }]
                    }, {
                        "question": "Item Description",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }, {
                        "question": "Please provide us your Order numbers associated with the current document.(separated by comma)",
                        "type": "textarea",
                        "questionResponse": "",
                        "options": []
                    }]
                }
            ]
                }],
     "receiptsConfirmaion": {
         "code": "yes",
         "name": "Yes"
     }
  }
];




    //UI grid -- accounting
    $scope.accountingConfig = [
            {
                "field": "lineNumber",
                "width": 120,
                "displayName": "Line Number",
                "isTree":true,
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,                
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "description",
                "width": 200,
                "displayName": "Description",
                "isFixed": "Left",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },         
            {
                "field": "splitType",
                "width": 150,
                "displayName": "Split Type",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,               
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },          
            {
                "field": "taxCodeChargeName",
                "width": 150,
                "displayName": "Tax Code/Charge Name",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,               
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "splitNumber",
                "width": 150,
                "displayName": "Split Number",
                "isFixed": "Left",
                "isRegFocusCol": true,
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "splitPopupCallback",
                    "defaultTitle": ""
                },
                "type": "popup",
            },
            {
                "field": "quantity",
                "width": 150,
                "displayName": "Quantity",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "uom.name",
                "width": 150,
                "displayName": "UOM",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "splitTaxes",
                "width": 230,
                "displayName": "Split Taxes & Charges (USD)",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "splitValues",
                "width": 150,
                "displayName": "Split Value (USD)",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            //{
            //    "field": "splittotal",
            //    "width": 150,
            //    "displayName": "Split Total (USD)",
            //    "isVisible": true,
            //    "attributes": {
            //        "rule": "row.entity.quantity * row.entity.splitValues"
            //    },
            //    "filterObject": { "enableFiltering": true },
            //    "type": "calculated"
            //}
            {
                "field": "splittotal",
                "width": 150,
                "displayName": "Split Total (USD)",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "requester.name",
                "width": 150,
                "displayName": "Requester",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "corporation.name",
                "width": 150,
                "displayName": "Corporation",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "bu.name",
                "width": 150,
                "displayName": "Cost Center",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "account.name",
                "width": 150,
                "displayName": "Account Number",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "project.name",
                "width": 170,
                "displayName": "Project Number",
                "isVisible": true,
                "autoIncrement": true,
                "isReadOnly": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            }
    ];
    $scope.accountingModel = [
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": "--",
                "taxCodeChargeName": "--",
                "splitNumber":"",
                "id": 21559,
                "lineNumber": 1,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": "--",
                "splitValues": "--",
                "splittotal": 18000,
                "quantity": 100,
                "requester": {
                    "code": "63150040000001",
                    "name": "--"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "--"
                },
                "bu": {
                    "code": "19686403",
                    "name": "--"
                },
                "account": {
                    "code": "19695611",
                    "name": "--"
                },
                "project": {
                    "code": "0",
                    "name": "--"
                },
                "quantity": 1,
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "001",
                "description": "Dell Laptop",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "--"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "--"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "--"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "--"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "--"
                    },
                    "lineId": 21559,
                    "lineNumber": 2,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "002",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 'Line Value',               
                "taxCodeChargeName": "--",
                "splitNumber": "Split 1",
                "id": 21559,
                "lineNumber": 1,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 13000,
                "splitValues": 13000,
                "splittotal": 13000,
                "quantity": 100,
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "002"
                },
                "quantity": "--",
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "002",
                "description": "Dell Laptop",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "004",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 'Line Value',
                "taxCodeChargeName": "--",
                "splitNumber": "Split 2",
                "id": 21559,
                "lineNumber": 1,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 14000,
                "splitValues": 14000,
                "splittotal": 14000,
                "quantity": 100,
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "003"
                },
                "quantity": "--",
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "003",
                "description": "Dell Laptop",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "006",
                    "description": "Intel Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
          },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 'Tax',
                "taxCodeChargeName": "Service Tax - 123",
                "splitNumber": "Split 1",
                "id": 21559,
                "lineNumber": 1,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 15000,
                "splitValues": 15000,
                "splittotal": 15000,
                "quantity": 100,
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "004"
                },
                "quantity": "--",
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "004",
                "description": "Dell Laptop",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "008",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 'Tax',
                "taxCodeChargeName": "Service Tax - 123",
                "splitNumber": "Split 2",
                "id": 21559,
                "lineNumber": 1,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 16000,
                "splitValues": 16000,
                "splittotal": 16000,
                "quantity": 100,
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "005"
                },
                "quantity": "--",
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "005",
                "description": "Dell Laptop",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "009",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                 "isTaxExempt": false,
                 "status": 1,
                 "splitType": 'Tax',
                 "taxCodeChargeName": "Vat - 658",
                 "splitNumber": "Split 1",
                 "id": 21559,
                 "lineNumber": 1,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                 "documentCode": 21193,
                 "p2PLineItemId": 202239,
                 "catalogItemId": 42,
                 "taxes": 0,
                 "splitTaxes": 16000,
                 "splitValues": 16000,
                 "splittotal": 16000,
                 "quantity": 100,
                 "requester": {
                     "code": "63150040000001",
                     "name": "RiteAid Admin"
                 },
                 "corporation": {
                     "code": "19686386",
                     "name": "Rite Aid HQ Corporation"
                 },
                 "bu": {
                     "code": "19686403",
                     "name": "RITE AID MID-ATLANTIC CSC"
                 },
                 "account": {
                     "code": "19695611",
                     "name": "RX SALES-TRADE"
                 },
                 "project": {
                     "code": "0",
                     "name": "005"
                 },
                 "quantity": "--",
                 "unitPrice": 6,
                 "otherCharges": 0,
                 "shippingCharges": 0,
                 "contractValue": 0,
                 "endDate": null,
                 "startDate": null,
                 "createdOn": "2016-04-22T08:38:51.073Z",
                 "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                 "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                 "name": "dfg",
                 "imageURL": null,
                 "buyerItemNumber": "005",
                 "description": "Dell Laptop",
                 "manufacturer": null,
                 "contractNumber": "2015.000009",
                 "partnerItemNumber": "sdfsd",
                 "manufacturerPartNumber": null,
                 "supplierPartAuxiliaryId": null,
                 "type": {
                     "id": 1,
                     "name": "P2P_REQ_Material",
                     "key": "Material"
                 },
                 "uom": {
                     "code": "EA",
                     "name": "Each"
                 },
                 "source": {
                     "id": 5,
                     "name": "PFM_CMN_None"
                 },
                 "partner": {
                     "id": 6349,
                     "name": "CTPG OPERATING LLC            "
                 },
                 "category": {
                     "id": 631550000849,
                     "name": "BUSINESS TRAVEL"
                 },
                 "contract": null,
                 "createdBy": {
                     "id": 63150040000001,
                     "name": "RiteAid Admin"
                 },
                 "lastModifiedBy": {
                     "id": 63150040000001,
                     "name": "RiteAid Admin"
                 },
                 "notes": null,
                 "taxItems": [{
                     "taxId": 2,
                     "id": 2596,
                     "percent": 8.213,
                     "code": "TAX00001",
                     "description": "Octroi tax",
                     "type": {
                         "id": 4,
                         "name": "CMN_City"
                     }
                 }],
                 "isProcurable": 0,
                 "orderedQuantity": null,
                 "needByDate": "2016-04-29T18:30:00.000Z",
                 "requestedDate": "2016-04-21T18:30:00.000Z",
                 "shippingMethod": "Best Available",
                 "shipTo": {
                     "id": 1,
                     "name": "Mumbai",
                     "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                 },
                 "inventoryType": false,
                 "deliverTo": null,
                 "partnerCode": "09798",
                 "splits": [{
                     "id": 23575,
                     "documentCode": 21193,
                     "documentItemId": 21559,
                     "quantity": 1,
                     "createdOn": "2016-04-22T08:38:54.167Z",
                     "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                     "createdBy": {
                         "id": 63150040000001,
                         "name": "RiteAid Admin"
                     },
                     "lastModifiedBy": {
                         "id": 63150040000001,
                         "name": "RiteAid Admin"
                     },
                     "requester": {
                         "code": "63150040000001",
                         "name": "RiteAid Admin"
                     },
                     "bu": {
                         "code": "19686403",
                         "name": "RITE AID MID-ATLANTIC CSC"
                     },
                     "account": {
                         "code": "19695611",
                         "name": "RX SALES-TRADE"
                     },
                     "project": {
                         "code": "0",
                         "name": ""
                     },
                     "department": {
                         "code": "19686386",
                         "name": "Rite Aid HQ Corporation"
                     },
                     "lineId": 21559,
                     "lineNumber": 1,
                     "type": {
                         "id": 1,
                         "name": "P2P_REQ_Material",
                         "key": "Material"
                     },
                     "buyerItemNumber": "009",
                     "description": "Lenovo Laptop",
                     "splitType": 0,
                     "itemQuantity": 1,
                     "unitPrice": 6,
                     "shippingCharges": 0,
                     "taxes": 0,
                     "otherCharges": 0,
                     "$$treeLevel": 0,
                     "splitNumber": "Split 1",
                     "$$hashKey": "uiGrid-00KJ"
                 }],
                 "$$hashKey": "uiGrid-0012"
             },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 'Charge',
                "taxCodeChargeName": "Shipping",
                "splitNumber": "Split 1",
                "id": 21559,
                "lineNumber": 1,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 16000,
                "splitValues": 16000,
                "splittotal": 16000,
                "quantity": 100,
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                            "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                            "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                            "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                            "project": {
                    "code": "0",
                    "name": "005"
                },
                "quantity": "--",
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "005",
                "description": "Dell Laptop",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
        "id": 1,
        "name": "P2P_REQ_Material",
        "key": "Material"
    },
                "uom": {
        "code": "EA",
        "name": "Each"
    },
                "source": {
        "id": 5,
        "name": "PFM_CMN_None"
    },
                "partner": {
        "id": 6349,
        "name": "CTPG OPERATING LLC            "
    },
                "category": {
        "id": 631550000849,
        "name": "BUSINESS TRAVEL"
    },
                "contract": null,
                "createdBy": {
        "id": 63150040000001,
        "name": "RiteAid Admin"
    },
                "lastModifiedBy": {
        "id": 63150040000001,
        "name": "RiteAid Admin"
    },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
        "id": 1,
        "name": "Mumbai",
        "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
    },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "009",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                 "isTaxExempt": false,
                 "status": 1,
                 "splitType": 'Charge',
                 "taxCodeChargeName": "Handling",
                 "splitNumber": "Split 1",
                 "id": 21559,
                 "lineNumber": 1,
                 "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                 "documentCode": 21193,
                 "p2PLineItemId": 202239,
                 "catalogItemId": 42,
                 "taxes": 0,
                 "splitTaxes": 16000,
                 "splitValues": 16000,
                 "splittotal": 16000,
                 "quantity": 100,
                 "requester": {
                     "code": "63150040000001",
                     "name": "RiteAid Admin"
                 },
                 "corporation": {
                     "code": "19686386",
                     "name": "Rite Aid HQ Corporation"
                 },
                 "bu": {
                     "code": "19686403",
                     "name": "RITE AID MID-ATLANTIC CSC"
                 },
                 "account": {
                     "code": "19695611",
                     "name": "RX SALES-TRADE"
                 },
                 "project": {
                     "code": "0",
                     "name": "005"
                 },
                 "quantity": "--",
                 "unitPrice": 6,
                 "otherCharges": 0,
                 "shippingCharges": 0,
                 "contractValue": 0,
                 "endDate": null,
                 "startDate": null,
                 "createdOn": "2016-04-22T08:38:51.073Z",
                 "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                 "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                 "name": "dfg",
                 "imageURL": null,
                 "buyerItemNumber": "005",
                 "description": "Dell Laptop",
                 "manufacturer": null,
                 "contractNumber": "2015.000009",
                 "partnerItemNumber": "sdfsd",
                 "manufacturerPartNumber": null,
                 "supplierPartAuxiliaryId": null,
                 "type": {
                     "id": 1,
                     "name": "P2P_REQ_Material",
                     "key": "Material"
                 },
                 "uom": {
                     "code": "EA",
                     "name": "Each"
                 },
                 "source": {
                     "id": 5,
                     "name": "PFM_CMN_None"
                 },
                 "partner": {
                     "id": 6349,
                     "name": "CTPG OPERATING LLC            "
                 },
                 "category": {
                     "id": 631550000849,
                     "name": "BUSINESS TRAVEL"
                 },
                 "contract": null,
                 "createdBy": {
                     "id": 63150040000001,
                     "name": "RiteAid Admin"
                 },
                 "lastModifiedBy": {
                     "id": 63150040000001,
                     "name": "RiteAid Admin"
                 },
                 "notes": null,
                 "taxItems": [{
                     "taxId": 2,
                     "id": 2596,
                     "percent": 8.213,
                     "code": "TAX00001",
                     "description": "Octroi tax",
                     "type": {
                         "id": 4,
                         "name": "CMN_City"
                     }
                 }],
                 "isProcurable": 0,
                 "orderedQuantity": null,
                 "needByDate": "2016-04-29T18:30:00.000Z",
                 "requestedDate": "2016-04-21T18:30:00.000Z",
                 "shippingMethod": "Best Available",
                 "shipTo": {
                     "id": 1,
                     "name": "Mumbai",
                     "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                 },
                 "inventoryType": false,
                 "deliverTo": null,
                 "partnerCode": "09798",
                 "splits": [{
                     "id": 23575,
                     "documentCode": 21193,
                     "documentItemId": 21559,
                     "quantity": 1,
                     "createdOn": "2016-04-22T08:38:54.167Z",
                     "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                     "createdBy": {
                         "id": 63150040000001,
                         "name": "RiteAid Admin"
                     },
                     "lastModifiedBy": {
                         "id": 63150040000001,
                         "name": "RiteAid Admin"
                     },
                     "requester": {
                         "code": "63150040000001",
                         "name": "RiteAid Admin"
                     },
                     "bu": {
                         "code": "19686403",
                         "name": "RITE AID MID-ATLANTIC CSC"
                     },
                     "account": {
                         "code": "19695611",
                         "name": "RX SALES-TRADE"
                     },
                     "project": {
                         "code": "0",
                         "name": ""
                     },
                     "department": {
                         "code": "19686386",
                         "name": "Rite Aid HQ Corporation"
                     },
                     "lineId": 21559,
                     "lineNumber": 1,
                     "type": {
                         "id": 1,
                         "name": "P2P_REQ_Material",
                         "key": "Material"
                     },
                     "buyerItemNumber": "009",
                     "description": "Lenovo Laptop",
                     "splitType": 0,
                     "itemQuantity": 1,
                     "unitPrice": 6,
                     "shippingCharges": 0,
                     "taxes": 0,
                     "otherCharges": 0,
                     "$$treeLevel": 0,
                     "splitNumber": "Split 1",
                     "$$hashKey": "uiGrid-00KJ"
                 }],
                 "$$hashKey": "uiGrid-0012"
            },
            {
                 "isTaxExempt": false,
                 "status": 1,
                 "splitType": "--",
                 "taxCodeChargeName": "--",
                 "splitNumber": "",
                 "id": 21559,
                 "lineNumber": 2,
                 "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                 "documentCode": 21193,
                 "p2PLineItemId": 202239,
                 "catalogItemId": 42,
                 "taxes": 0,
                 "splitTaxes": 0,
                 "splitValues": "--",
                 "splittotal": 18000,
                 "quantity": 100,
                 "requester": {
                     "code": "63150040000001",
                     "name": "--"
                 },
                 "corporation": {
                     "code": "19686386",
                     "name": "--"
                 },
                 "bu": {
                     "code": "19686403",
                     "name": "--"
                 },
                 "account": {
                     "code": "19695611",
                     "name": "--"
                 },
                 "project": {
                     "code": "0",
                     "name": "--"
                 },
                 "quantity": 1,
                 "unitPrice": 6,
                 "otherCharges": 0,
                 "shippingCharges": 0,
                 "contractValue": 0,
                 "endDate": null,
                 "startDate": null,
                 "createdOn": "2016-04-22T08:38:51.073Z",
                 "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                 "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                 "name": "dfg",
                 "imageURL": null,
                 "buyerItemNumber": "001",
                 "description": "Asus Laptop",
                 "manufacturer": null,
                 "contractNumber": "2015.000009",
                 "partnerItemNumber": "sdfsd",
                 "manufacturerPartNumber": null,
                 "supplierPartAuxiliaryId": null,
                 "type": {
                     "id": 1,
                     "name": "P2P_REQ_Material",
                     "key": "Material"
                 },
                 "uom": {
                     "code": "EA",
                     "name": "Each"
                 },
                 "source": {
                     "id": 5,
                     "name": "PFM_CMN_None"
                 },
                 "partner": {
                     "id": 6349,
                     "name": "CTPG OPERATING LLC            "
                 },
                 "category": {
                     "id": 631550000849,
                     "name": "BUSINESS TRAVEL"
                 },
                 "contract": null,
                 "createdBy": {
                     "id": 63150040000001,
                     "name": "RiteAid Admin"
                 },
                 "lastModifiedBy": {
                     "id": 63150040000001,
                     "name": "RiteAid Admin"
                 },
                 "notes": null,
                 "taxItems": [{
                     "taxId": 2,
                     "id": 2596,
                     "percent": 8.213,
                     "code": "TAX00001",
                     "description": "Octroi tax",
                     "type": {
                         "id": 4,
                         "name": "CMN_City"
                     }
                 }],
                 "isProcurable": 0,
                 "orderedQuantity": null,
                 "needByDate": "2016-04-29T18:30:00.000Z",
                 "requestedDate": "2016-04-21T18:30:00.000Z",
                 "shippingMethod": "Best Available",
                 "shipTo": {
                     "id": 1,
                     "name": "Mumbai",
                     "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                 },
                 "inventoryType": false,
                 "deliverTo": null,
                 "partnerCode": "09798",
                 "splits": [{
                     "id": 23575,
                     "documentCode": 21193,
                     "documentItemId": 21559,
                     "quantity": 1,
                     "createdOn": "2016-04-22T08:38:54.167Z",
                     "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                     "createdBy": {
                         "id": 63150040000001,
                         "name": "RiteAid Admin"
                     },
                     "lastModifiedBy": {
                         "id": 63150040000001,
                         "name": "RiteAid Admin"
                     },
                     "requester": {
                         "code": "63150040000001",
                         "name": "RiteAid Admin"
                     },
                     "bu": {
                         "code": "19686403",
                         "name": "RITE AID MID-ATLANTIC CSC"
                     },
                     "account": {
                         "code": "19695611",
                         "name": "RX SALES-TRADE"
                     },
                     "project": {
                         "code": "0",
                         "name": ""
                     },
                     "department": {
                         "code": "19686386",
                         "name": "Rite Aid HQ Corporation"
                     },
                     "lineId": 21559,
                     "lineNumber": 2,
                     "type": {
                         "id": 1,
                         "name": "P2P_REQ_Material",
                         "key": "Material"
                     },
                     "buyerItemNumber": "002",
                     "description": "Lenovo Laptop",
                     "splitType": 0,
                     "itemQuantity": 1,
                     "unitPrice": 6,
                     "shippingCharges": 0,
                     "taxes": 0,
                     "otherCharges": 0,
                     "$$treeLevel": 0,
                     "splitNumber": "Split 1",
                     "$$hashKey": "uiGrid-00KJ"
                 }],
                 "$$hashKey": "uiGrid-0012"
             },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 'Line Value',
                "taxCodeChargeName": "--",
                "splitNumber": "Split 1",
                "id": 21559,
                "lineNumber": 2,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 13000,
                "splitValues": 13000,
                "splittotal": 13000,
                "quantity": 100,
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "002"
                },
                "quantity": "--",
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "002",
                "description": "Asus Laptop",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "004",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            }
    ];


   // UI grid --- flexibleCharges
    $scope.flexibleCharges = [
            {
                "field": "lineNumber",
                "width": 120,
                "displayName": "Number",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                 "type": "editable",
                  "attributes": {
                    "type": "number"
                    }
            },
            {
                 "field": "supplierName",
                 "width": 150,
                 "displayName": "Name",
                 "isFixed": "Left",
                 "isVisible": true,
                 "filterObject": { "enableFiltering": true },
                 "type": "editable"
             },
	        {
	            "field": "description",
	            "width": 150,
	            "displayName": "Description",
	            "isFixed": "Left",
	            "isVisible": true,
	            "isReadOnly": false,
	            "autoIncrement": false,
	            "filterObject": { "enableFiltering": true },
	            "type": "editable"
	        },
		    {
		        "field": "amount",
		        "width": 140,
		        "displayName": "Amount (USD)",
		        "isVisible": true,
		        "isFixed": "Left",
		        "isReadOnly": true,
		        "autoIncrement": false,
		        "filterObject": { "enableFiltering": true },
		        "type": "editable",
		        "attributes": {
		            "type": "number"
		        }
		    },
            {
                "field": "tolerancepercent",
                "width": 220,
                "displayName": "Tolerance Percent",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": true },
                 "type": "editable",
                  "attributes": {
                    "type": "number"
                    }
            },
            {
               "field": "isExternal.name",
               "width": 130,
               "displayName": "Type",
               "isVisible": true,
               "isRegFocusCol": true,
               "filterObject": { "enableFiltering": true },
               "type": "dropdown",
               "attributes": {
                   "model": "type",
                   "dataKey": "name",
                   "options": [
                     {
                         "name": "Charge"
                     },
                     {
                         "name": "Allowance"
                     }
                   ]
               }
           },
            {
                  "field": "editableoninvoice",
                  "width": 210,
                  "displayName": "Editable on Invoice",
                  "isVisible": true,
                  "isReadOnly": true,
                  "filterObject": { "enableFiltering": true },
                  "cellTemplate": "<smart-checkbox class='aCenter' ng-model='isUrgent' on-change='onChange(isUrgent)'></smart-checkbox>"
              },
            {
                 "field": "AddInfo",
                 "width": 380,
                 "displayName": "Additional Information",
                 "isRegFocusCol": true,
                 "isVisible": true,
                 "filterObject": { "enableFiltering": true },
                 "attributes": {
                     "type": "AddChargesinfoCallback",
                     "defaultTitle": "Add Info"
                 },
                 "type": "popup",
             },
    ];
    $scope.flexibleChargesModel = [
            {
                "lineNumber": 1,
                "supplierName": "Shipping",
                "description": "Shipping charges",
                "amount": 500,
                "tolerancepercent": 10,
                "isExternal": { "name": "Charge" },
                "AddInfo": "Add",
            },

            {
                "lineNumber": 2,
                "supplierName": "Import Duties",
                "description": "Airport custom duties",
                "amount": 250,
                "tolerancepercent": 5,
                "isExternal": { "name": "Allowance" },
                "AddInfo": "Add",
            },

            {
                "lineNumber": 3,
                "supplierName": "Handling",
                "description": "Charges for fragile item",
                "amount": 300,
                "tolerancepercent": 5,
                "isExternal": { "name": "Charge" },
                "AddInfo": "Add",
            },

            {
                 "lineNumber": 4,
                 "supplierName": "Shipping",
                 "description": "Shipping charges",
                 "amount": 500,
                 "tolerancepercent": 10,
                 "isExternal": { "name": "Allowance" },
                 "AddInfo": "Add",
             },

            {
                "lineNumber": 5,
                "supplierName": "Import Duties",
                "description": "Airport custom duties",
                "amount": 250,
                "tolerancepercent": 5,
                "isExternal": { "name": "Allowance" },
                "AddInfo": "Add",
            },

            //{
            //    "lineNumber": 6,
            //    "supplierName": "Handling",
            //    "description": "Charges for fragile item",
            //    "amount": 300,
            //    "tolerancepercent": 5,
            //    "type": 5,
            //    "Addinfoo": "Add Info",
            //},
    ];

    //UI grid --- flexibleAccounting
    $scope.flexibleAccounting = [
            //{
            //    "field": "number",
            //    "width": 150,
            //    "displayName": "Number",
            //    "isFixed": "Left",
            //    "isVisible": true,
            //    "isReadOnly": true,
            //    "autoIncrement": true,
            //    "filterObject": { "enableFiltering": true },
            //    "type": "editable"
            //},
            {
                "field": "buyerItemNumber",
                "width": 150,
                "displayName": "Number",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                 "type": "editable",
                  "attributes": {
                    "type": "number"
                    }
            },
            {
                 "field": "chargeName",
                 "width": 150,
                 "displayName": "Name",
                 "isFixed": "Left",
                 "isVisible": true,
                 "filterObject": { "enableFiltering": true },
                 "type": "editable"
             },
            {
                "field": "description",
                "width": 150,
                "displayName": "Description",
                "isFixed": "Left",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "splitNumber",
                "width": 150,
                "displayName": "Split Number",
                "isFixed": "Left",
                "isRegFocusCol": true,
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "splitPopupCallback",
                    "defaultTitle": "SPLITS"
                },
                "type": "popup",
            },
            {
                "field": "uom.name",
                "width": 150,
                "displayName": "UOM",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "splitTaxes",
                "width": 230,
                "displayName": "Split Taxes & Charges (USD)",
                "isVisible": false,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "splitValues",
                "width": 230,
                "displayName": "Split Value (USD)",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "requester.name",
                "width": 180,
                "displayName": "Requester",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "corporation.name",
                "width": 200,
                "displayName": "Corporation",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "bu.name",
                "width": 180,
                "displayName": "Cost Center",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "account.name",
                "width": 180,
                "displayName": "Account Number",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "project.name",
                "width": 170,
                "displayName": "Project Number",
                "isVisible": true,
                "autoIncrement": true,
                "isReadOnly": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            }
    ];
    $scope.flexibleAccountingModel = [
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 0,
                "id": 21559,
                "lineNumber": 1,
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 0,
                "splitValues": 12000,
                "splittotal": 12000,
                "quantity": 100,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "001"
                },
                "quantity": 1,
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "1",
                "chargeName":"Shipping",
                "description": "Shipping Charges",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 2,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "002",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 0,
                "id": 21559,
                "lineNumber": 2,
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 0,
                "splitValues": 13000,
                "splittotal": 13000,
                "quantity": 100,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "002"
                },
                "quantity": 1,
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "2",
                "chargeName":"Freight",
                "description": "Freight Charges",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "004",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 0,
                "id": 21559,
                "lineNumber": 3,
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 0,
                "splitValues": 14000,
                "splittotal": 14000,
                "quantity": 100,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "003"
                },
                "quantity": 1,
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "3",
                "chargeName": "Import",
                "description": "Import Duties",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "006",
                    "description": "Intel Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 0,
                "id": 21559,
                "lineNumber": 4,
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 0,
                "splitValues": 15000,
                "splittotal": 15000,
                "quantity": 100,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "004"
                },
                "quantity": 1,
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "4",
                "chargeName": "Import",
                "description": "Import Duties",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    "quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "008",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            },
            {
                "isTaxExempt": false,
                "status": 1,
                "splitType": 0,
                "id": 21559,
                "lineNumber": 5,
                "documentCode": 21193,
                "p2PLineItemId": 202239,
                "catalogItemId": 42,
                "taxes": 0,
                "splitTaxes": 0,
                "splitValues": 16000,
                "splittotal": 16000,
                "quantity": 100,
                "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard, Lorem Ipsum has been the industry's standard",
                "requester": {
                    "code": "63150040000001",
                    "name": "RiteAid Admin"
                },
                "corporation": {
                    "code": "19686386",
                    "name": "Rite Aid HQ Corporation"
                },
                "bu": {
                    "code": "19686403",
                    "name": "RITE AID MID-ATLANTIC CSC"
                },
                "account": {
                    "code": "19695611",
                    "name": "RX SALES-TRADE"
                },
                "project": {
                    "code": "0",
                    "name": "005"
                },
                "quantity": 1,
                "unitPrice": 6,
                "otherCharges": 0,
                "shippingCharges": 0,
                "contractValue": 0,
                "endDate": null,
                "startDate": null,
                "createdOn": "2016-04-22T08:38:51.073Z",
                "lastModifiedOn": "2016-04-26T03:24:21.370Z",
                "contractExpiryDate": "2015-01-16T18:30:00.000Z",
                "name": "dfg",
                "imageURL": null,
                "buyerItemNumber": "5",
                "chargeName": "Shipping",
                "description": "Shipping Charges",
                "manufacturer": null,
                "contractNumber": "2015.000009",
                "partnerItemNumber": "sdfsd",
                "manufacturerPartNumber": null,
                "supplierPartAuxiliaryId": null,
                "type": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Material"
                },
                "uom": {
                    "code": "EA",
                    "name": "Each"
                },
                "source": {
                    "id": 5,
                    "name": "PFM_CMN_None"
                },
                "partner": {
                    "id": 6349,
                    "name": "CTPG OPERATING LLC            "
                },
                "category": {
                    "id": 631550000849,
                    "name": "BUSINESS TRAVEL"
                },
                "contract": null,
                "createdBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "lastModifiedBy": {
                    "id": 63150040000001,
                    "name": "RiteAid Admin"
                },
                "notes": null,
                "taxItems": [{
                    "taxId": 2,
                    "id": 2596,
                    "percent": 8.213,
                    "code": "TAX00001",
                    "description": "Octroi tax",
                    "type": {
                        "id": 4,
                        "name": "CMN_City"
                    }
                }],
                "isProcurable": 0,
                "orderedQuantity": null,
                "needByDate": "2016-04-29T18:30:00.000Z",
                "requestedDate": "2016-04-21T18:30:00.000Z",
                "shippingMethod": "Best Available",
                "shipTo": {
                    "id": 1,
                    "name": "Mumbai",
                    "address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
                },
                "inventoryType": false,
                "deliverTo": null,
                "partnerCode": "09798",
                "splits": [{
                    "id": 23575,
                    "documentCode": 21193,
                    "documentItemId": 21559,
                    //"quantity": 1,
                    "createdOn": "2016-04-22T08:38:54.167Z",
                    "lastModifiedOn": "2016-04-26T03:20:42.250Z",
                    "createdBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "lastModifiedBy": {
                        "id": 63150040000001,
                        "name": "RiteAid Admin"
                    },
                    "requester": {
                        "code": "63150040000001",
                        "name": "RiteAid Admin"
                    },
                    "bu": {
                        "code": "19686403",
                        "name": "RITE AID MID-ATLANTIC CSC"
                    },
                    "account": {
                        "code": "19695611",
                        "name": "RX SALES-TRADE"
                    },
                    "project": {
                        "code": "0",
                        "name": ""
                    },
                    "department": {
                        "code": "19686386",
                        "name": "Rite Aid HQ Corporation"
                    },
                    "lineId": 21559,
                    "lineNumber": 1,
                    "type": {
                        "id": 1,
                        "name": "P2P_REQ_Material",
                        "key": "Material"
                    },
                    "buyerItemNumber": "009",
                    "description": "Lenovo Laptop",
                    "splitType": 0,
                    "itemQuantity": 1,
                    "unitPrice": 6,
                    "shippingCharges": 0,
                    "taxes": 0,
                    "otherCharges": 0,
                    "$$treeLevel": 0,
                    "splitNumber": "Split 1",
                    "$$hashKey": "uiGrid-00KJ"
                }],
                "$$hashKey": "uiGrid-0012"
            }
    ];

    $scope.chargesAndAllowancesConfig = [
           {
               "field": "lineNumber",
               "width": 100,
               "displayName": "Number",
               "isFixed": "Left",
               "isTree": true,
               "isVisible": true,
               "isReadOnly": true,
               "autoIncrement": true,
               "filterObject": { "enableFiltering": true },
               "type": "editable",
               "attributes": {
                   "type": "number"
               }
           },
           {
               "field": "itemNumber",
               "width": 150,
               "displayName": "Item Number",
               "isFixed": "Left",
               "isVisible": true,
               "isReadOnly": true,
               "autoIncrement": true,
               "filterObject": { "enableFiltering": true },
               "type": "editable"
           },
           {
               "field": "description",
               "width": 250,
               "displayName": "Item Description",
               "isFixed": "Left",
               "isVisible": true,
               "filterObject": { "enableFiltering": true },
               "type": "editable"
           },
           {
               "field": "attachment",
               "width": 200,
               "displayName": "Name",
               "isFixed": "Left",
               "isVisible": true,
               "isReadOnly": true,
               "isRegFocusCol": true,
               "filterObject": { "enableFiltering": true },
               "enableCellEdit": false,
               "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate'>{{row.entity.attachment.name}}</span><div class='ui-grid-cell-container-icons'><a href='javascript:void(0)' class='marginLeft10' message='Add Charge' position='bottom' smart-tooltip ng-if='row.entity.attachment.isAdd'><i class='icon blue-text'><svg><use xlink:href='#icon_CirclePlus'></use></svg></i></a></div></div>"
           },
           {
               "field": "Chargedescription",
               "width": 230,
               "displayName": "Charge Description",
               //"isFixed": "Left",
               "isReadOnly": true,
               "isVisible": true,
               "filterObject": { "enableFiltering": true },
               "type": "editable"
           },

           //{
           //    "field": "attachmentName",
           //    "width": 150,
           //    "displayName": "Name",
           //    "isVisible": true,
           //    "filterObject": { "enableFiltering": true },
           //    "type": "editable"
           //},
           //{
           //    "field": "attachment.type",
           //    "width": 250,
           //    "displayName": "Calculation Basis",
           //    "isVisible": true,
           //    "filterObject": { "enableFiltering": true },
           //    "type": "editable",

           //},


            {
                "field": "Calculation.name",
                "width": 230,
                "displayName": "Calculation Basis",
                "isVisible": true,
                "isRegFocusCol": true,
                "filterObject": { "enableFiltering": true },
                "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "name",
                    "options": [
                      {
                          "name": "Amount"
                      },
                      {
                          "name": "Percentage"
                      },
                    {
                        "name": "Per Unit"
                    },
                    ]
                }
            },


           {
               "field": "attachment.valueUSD",
               "width": 130,
               "displayName": "Value",
               "isVisible": true,
               "isRegFocusCol": true,
               "filterObject": { "enableFiltering": true },
               "type": "editable",
               "attributes": {
                   "type": "number"
               }
           },
           {
               "field": "attachment.AmountUSD",
               "width": 130,
               "displayName": "Amount (USD)",
               "isVisible": true,
               "isReadOnly": true,
               "isRegFocusCol": true,
               "filterObject": { "enableFiltering": true },
               "type": "editable",
               "attributes": {
                   "type": "number"
               }
           },
           {
               "field": "includeForTax",
               "width": 210,
               "displayName": "Include For Tax",
               "isVisible": true,
               "isReadOnly": true,
               "filterObject": { "enableFiltering": true },
               "cellTemplate": "<div ng-if='row.entity.attachment.isHeader' class='center'>--</div><smart-checkbox ng-if='!row.entity.attachment.isHeader' class='aCenter paddingTop5' ng-model='isUrgent' on-change='onChange(isUrgent)'></smart-checkbox>"
           },

           {
               "field": "isType.name",
               "width": 230,
               "displayName": "Type",
               "isVisible": true,
               "isReadonly": true,
               "isRegFocusCol": true,
               "filterObject": { "enableFiltering": true },
               "type": "dropdown",
               "attributes": {
                   "model": "type",
                   "dataKey": "name",
                   "options": [
                     {
                         "name": "Charge"
                     },
                     {
                         "name": "Allowance"
                     }
                   ]
               }
           },

           {
               "field": "editableoninvoice",
               "width": 210,
               "displayName": "Editable on Invoice",
               "isVisible": true,
               "isReadOnly": true,
               "filterObject": { "enableFiltering": true },
               "cellTemplate": "<div ng-if='row.entity.attachment.isHeader' class='center'>--</div><smart-checkbox ng-if='!row.entity.attachment.isHeader' class='aCenter paddingTop5' ng-model='isUrgent' on-change='onChange(isUrgent)'></smart-checkbox>"
           },

              {
                  "field": "AddInfoAttach",
                  "width": 330,
                  "displayName": "Additional Information",
                  "isRegFocusCol": true,
                  "isVisible": true,
                  "filterObject": { "enableFiltering": true },
                  "attributes": {
                      "type": "AddChargesAttachCallback",
                      "defaultTitle": ""
                  },
                  "type": "popup",
              }
    ];
    $scope.chargesAndAllowancesModel = [
              {
                  "lineNumber": 1,
                  "itemNumber": 11110666,
                  "description": "Laptop Dell",
                  //  "Calculation": { "name": "Amount" },
                  "Chargedescription": "--",
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "isType": { "name": "" },
                  "attachment": { "name": "3 Charges", "valueUSD": "--", "AmountUSD": "84", "isAdd": true, "isHeader": true },
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": ""
              },
              {
                  "lineNumber": 1,
                  "itemNumber": "",
                  "description": "",
                  "classification": { "name": "S & P" },
                  "Calculation": { "name": "Percentage" },
                  "isType": { "name": "Allowance" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": { "name": "Shipping", "type": "Amount", "valueUSD": "5", "AmountUSD": "34" },
                  "Chargedescription": "Shipping Charges",
                  //"attachmentName": "xyz notes",
                  //"attachmentType": "Notes",
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": "Add"
              },
              {
                  "lineNumber": 1,
                  "itemNumber": "",
                  "description": "",
                  "Calculation": { "name": "Percentage" },
                  "classification": { "name": "S & P" },
                  "isType": { "name": "Charge" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": {
                      "name": "Handaling", "type": "Percentage", "valueUSD": "20", "AmountUSD": "16"
                  },
                  "Chargedescription": "Charges for fragile item",
                  //"attachmentName": "Google",
                  //"attachmentType": "external Link",
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": "Add"
              },
              {
                  "lineNumber": 1,
                  "itemNumber": "",
                  "description": "",
                  "Calculation": { "name": "Amount" },
                  "classification": { "name": "S & P" },
                  "isType": { "name": "Charge" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": { "name": "Shipping", "type": "Amount", "valueUSD": "34", "AmountUSD": "34" },
                  "Chargedescription": "Shipping Charges",
                  //"attachmentName": "xyz notes",
                  //"attachmentType": "Notes",
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": "Add"
              },

              {
                  "lineNumber": 2,
                  "itemNumber": 11110667,
                  //"isAdd": true,
                  "description": "HR management System",
                  //"Calculation": { "name": "Percentage" },
                  "Chargedescription": "--",
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "classification": { "name": "S & P" },
                  "isType": { "name": "" },
                  "attachment": {
                      "name": "2 Charges", "type": "", "valueUSD": "--", "AmountUSD": "84", "isAdd": true, "isHeader": true
                  },
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": ""
              },
              {
                  "lineNumber": 2,
                  "itemNumber": "",
                  "description": "",
                  "Calculation": { "name": "Percentage" },
                  "classification": { "name": "S & P" },
                  "isType": { "name": "Allowance" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": { "name": "Shipping", "type": "Amount", "valueUSD": "34", "AmountUSD": "34" },
                  "Chargedescription": "Shipping Charges",
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": "Add"
              },
              {
                  "lineNumber": 2,
                  "itemNumber": "",
                  "description": "",
                  "Calculation": { "name": "Percentage" },
                  "classification": { "name": "S & P" },
                  "isType": { "name": "Allowance" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": { "name": "Handaling", "type": "Percentage", "valueUSD": "20", "AmountUSD": "16" },
                  "Chargedescription": "Charges for fragile item",
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": "Add"
              },

              {
                  "lineNumber": 3,
                  // "isAdd": true,
                  "itemNumber": 11110668,
                  "description": "IP Phone",
                  // "Calculation": { "name": "Percentage" },
                  "classification": { "name": "S & P" },
                  "Chargedescription": "--",
                  "isType": { "name": "" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": {
                      "name": "2 Charges", "type": "", "valueUSD": "--", "AmountUSD": "84", "isAdd": true, "isHeader": true
                  },
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": ""
              },
              {
                  "lineNumber": 3,
                  "itemNumber": "",
                  "description": "",
                  "Calculation": { "name": "Amount" },
                  "classification": { "name": "S & P" },
                  "isType": { "name": "Allowance" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": { "name": "Shipping", "type": "Amount", "valueUSD": "34", "AmountUSD": "34" },
                  "Chargedescription": "Shipping Charges",
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": "Add"
              },
              {
                  "lineNumber": 3,
                  "itemNumber": "",
                  "description": "",
                  "Calculation": { "name": "Amount" },
                  "classification": { "name": "S & P" },
                  "isType": { "name": "Charge" },
                  "addedOn": "12/4/2016",
                  "addedBy": "John Doe",
                  "attachment": { "name": "Hnadling", "type": "Percentage", "valueUSD": "20", "AmountUSD": "16" },
                  "Chargedescription": "Charges for fragile item",
                  "$$hashKey": "uiGrid-0012",
                  "AddInfoAttach": "Add"
              }


    ];



      // Start: CBR
    var tempCategoryNode_PAS = [];
    var tempBUNode_PAS = [];
    var tempRegionNode_PAS = [];

    $scope.treeComponentConfig = {
        isRadio: false,
        getHierarchyOnSelection: true,
        getAllLazyLoadedData: true,
        getUserSelection: true,
        enableLastLevelSelection: false,
        isLazyLoad: false,
        showSelectAll: false,
        showClearSelection: false,
        showSelectionCount: false,
        isReadOnly: false,
        isDisabled: false,
        modalButtonShow: true,
        data: null,
        selectedNodes: "",
        disableLevelSelection: '',
        treeType: 'Generic',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '328px',
        isSearchEnabled: true,
        navigationContext: "PAS",
    };

    /*$scope.treeComponentConfig = {
        selectedNodes: "",
        isRadio: false,
        getHierarchyOnSelection: true,
        isLazyLoad: false,
        data: null,
        disableLevelSelection: '',
        title: 'Category',
        getSelections: false,
        clearCache: false,
        height: '270px',
        isSearchEnabled: true
    };*/

    var categoryObj, buObj, regionObj;

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/category.json'
    };

    var buData = {
        method: 'GET',
        url: 'shared/popup/models/businessUnit.json'
    };

    var regionData = {
        method: 'GET',
        url: 'shared/popup/models/region.json'
    };

    var currentType = '';
    $scope.treeOpenCallback = function (type) {

        $scope.treeComponentConfig.requestParameter = {
            navigationContext: "PAS"
        };
        currentType = type;
        if (type == 'region') {
            $http(regionData).then(function (response) {
                regionObj = response.data;
                $scope.treeComponentConfig.data = regionObj;
                $scope.treeComponentConfig.title = 'Region';
                $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else if (type == 'bu') {
            $http(buData).then(function (response) {
                buObj = response.data;
                $scope.treeComponentConfig.data = buObj;
                $scope.treeComponentConfig.title = 'BUSINESS UNIT';
                $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else {
            $http(categoryData).then(function (response) {

                categoryObj = response.data;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        }
        $scope.showTreePopup = true;
    };

    $scope.onPopupHideCallback = function () {
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        } else if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        } else if (currentType == 'region') {
        }
        //$scope.treeComponentConfig.getSelections = true;
    };

    $scope.selectedCategoriesTxt = "Choose Category";
    $scope.selectedBUTxt = "Choose Business Unit";
    $scope.selectedRegionTxt = "Choose Region";

    $scope.selectedCategoriesValidate = false;
    $scope.selectedBUValidate = false;
    $scope.selectedRegionValidate = false;

    $scope.selectedCategoryNodes = [];
    $scope.selectedBUNodes = [];
    $scope.selectedRegionNodes = [];

    $scope.treeComponentCallback = function (e) {

        if (currentType == 'category') {
            tempCategoryNode_PAS = [];
            $scope.selectedCategoriesValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedCategoryNodes.push(e.selections[i].Name);
                tempCategoryNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedCategoriesTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.selectedCategoriesTxt = e.selectionAllNames[0];
            else
                $scope.selectedCategoriesTxt = 'Choose Category';
        } else if (currentType == 'bu') {
            tempBUNode_PAS = [];
            $scope.selectedBUValidate = true;
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedBUNodes.push(e.selections[i].Name);
                tempBUNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedBUTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.selectedBUTxt = e.selectionAllNames[0];
            else
                $scope.selectedBUTxt = 'Choose Category';
        } else if (currentType == 'region') {
            tempRegionNode_PAS = [];
            for (var i = 0; i < e.selections.length; i++) {
                $scope.selectedRegionNodes.push(e.selections[i].Name);
                tempRegionNode_PAS.push(e.selections[i].ID);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedRegionTxt = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.selectedRegionTxt = e.selectionAllNames[0];
            else
                $scope.selectedRegionTxt = 'Choose Category';
        }
        $scope.showTreePopup = false;
    };
    // End: CBR

    // popup -- taxes -- select item -- item list
    $scope.taxesPopupUrl = "p2p/shared/views/taxesPopup.html";
    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function (e) {
        $scope.showTaxesPopup = true;
    };
    $scope.taxesPopUpOnHideCallback = function () {
        $scope.showTaxesPopup = false;
    }

    $scope.showGridSandPPopup = false;
    $scope.showGridSandPCallback = function () {
    	$scope.showGridSandPPopup = true;
    };
    $scope.showGridSandPPopupHideCallback = function (e) {
    	$scope.showGridSandPPopup = false;
    };
	
    $scope.spData = [
		{
			id:"sp1",
			title: "Purchase Order Terms 1",
			codeRev: "PO TERMS/011",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			id: "sp2",
			title: "Purchase Order Terms 2",
			codeRev: "PO TERMS/012",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			id: "sp3",
			title: "Purchase Order Terms 3",
			codeRev: "PO TERMS/013",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			id: "sp4",
			title: "Purchase Order Terms 4",
			codeRev: "PO TERMS/014",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		}
    ];    
    $scope.indexToShow = 0;
    $scope.selectedSandP = $scope.spData[$scope.indexToShow];

	function setActive(index) {
		$scope.indexToShow = index;
		$scope.selectedSandP = $scope.spData[index];
	}

	$scope.selectedItem = function (index) {
		setActive(index);
	};
	$scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
	$scope.showSPPopup = false;
	$scope.showSPPopupCall = function () {
		$scope.showGridSandPPopup = false;
		$scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
		$scope.selectedSP = {};
		$scope.showSPPopup = true;
	}
	$scope.hideSPPopupCall = function (e) {
		$scope.showGridSandPPopup = true;
		$scope.showSPPopup = false;
	}
	$scope.editSandPGridCall = function (spObj) {
		$scope.showGridSandPPopup = false;
		$scope.titleSandPPopup = "EDIT STANDARD AND PROCEDURE";
		$scope.selectedSP = spObj;
		$scope.showSPPopup = true;
		$scope.isEditMode = true;
	}
    // popup -- UploadLine
	$scope.openUploadPopup = function () {
	    $scope.uploadIcon = "#icon_Upload";
	    $scope.uploadTitle = "Upload";
	    var attachmentMsg = "Supported file formats: .xls, .csv.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
	    $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
	    $scope.showUploadLinePopup = true;
	}
	$scope.hideUploadPopupLineCallback = function () {
	    $scope.showUploadLinePopup = false;
	}
   
    $scope.expressLists = [
       { itemNumber: 'dell', name: '123-342-232', modelNo: '123', actionIconDelete: true },
       { itemNumber: 'Lenovo', name: '345-342-354', modelNo: '456', actionIconDelete: true },
       { itemNumber: 'dell', name: '636-436-236', modelNo: '789', actionIconDelete: true },
       { itemNumber: 'Lenovo', name: '428-472-344', modelNo: '912', actionIconDelete: true },
       { itemNumber: 'Sumsung', name: '288-2898-889', modelNo: '345', actionIconDelete: true, actionIconAdd: true }
    ];

    // popup -- manufacturer details -- express list -- grid Data -- remove the row specified in index
    $scope.removeSplitRow = function (index) {
        // remove the row specified in index
        $scope.expressLists.splice(index, 1);
        // if no rows left in the array create a blank array
        if ($scope.expressLists.length === 0) {
            $scope.expressLists = [];
        }

        // remove the row specified in index
        $scope.newSplitList.splice(index, 1);
        // if no rows left in the array create a blank array
        if ($scope.newSplitList.length === 0) {
            $scope.newSplitList = [];
        }
    };

    // popup -- manufacturer details -- express list -- grid Data -- add a row in the array
    $scope.addRow = function (numberOfRecord,e) {
        $scope.expressLists[$scope.expressLists.length - 1].actionIconAdd = false;
        $scope.expressLists.push({ itemNumber: '', name: '', modelNo: '', actionIconAdd: true, actionIconDelete:true});

        var count = $scope.newSplitList.length + 1;
        for (var i = 0; i < parseInt(numberOfRecord) ; i++) {
            $scope.newSplitList.push({
                splitNumber: count++,
                splitValue: '1300',
                actionIconDelete: true,
                splitValueper: '10'
            });
        }
        $('#tabMatAccoTBulkAddSlipt').slideUp();
    };
    $scope.cancelLookup = function () {
        $('#tabMatAccoTBulkAddSlipt').slideUp();
    }

    // Start: popup -- split
    $scope.splitPopupUrl = "p2p/req/views/popupSplit.html";
    $scope.splitPopupPopup = false;
    $scope.splitPopupCallback = function (e) {
        $scope.splitPopupPopup = true;
    };
    $scope.splitPopupPopupHideCallback = function (e) {
        $scope.splitPopupPopup = false;
    };
    $scope.splitList = {
        number: [
            {
                "splitValue": "",
                "splitRule": [
                    {
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            }
        ],
        percent: [
            {
                "splitValue": "",
                "splitRule": [
                    {
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            }
        ]
    };
    $scope.splitType = [{
        title: 'Quantity'
    }, {
        title: 'Percentage'
    }];
    $scope.selectedSplit = {
        title: 'Quantity'
    };
    $scope.splitFlag = true;
    $scope.onChangeSplit = function (selectedSplit) {
        if (selectedSplit.title == 'Quantity') {
            $scope.splitFlag = true;
        } else if (selectedSplit.title == 'Percentage') {
            $scope.splitFlag = false;
        }
    }

    $scope.checkPercentTotal = true;
    $scope.addSplitRow = function (e) {
        $scope.checkPercentTotal = false;
        if ($scope.splitFlag) {
            $scope.splitList.number.push(
                {
                    "splitValue": "",
                    "splitRule": [
                        {
                            "rule": "!(/[0-9]/.test(this))",
                            "error": "Need atleast one number"
                        },
                        {
                            "rule": "(/^[0]$/.test(this))",
                            "error": "Number should greater than 0"
                        }
                    ]
                }
            );

            var getContent = angular.element('#numContainerTable').height();
            setTimeout(function () {
                angular.element('#numberContainer').find('.scroll-content').scrollTop(getContent + 55);
            }, 100);


        } else {
            $scope.splitList.percent.push(
                {
                    "splitValue": "",
                    "splitRule": [
                        {
                            "rule": "!(/[0-9]/.test(this))",
                            "error": "Need atleast one number"
                        },
                        {
                            "rule": "(/^[0]$/.test(this))",
                            "error": "Number should greater than 0"
                        }
                    ]
                }
            );

            var getContent = angular.element('#perContainerTable').height();
            setTimeout(function () {
                angular.element('#percentContainer').find('.scroll-content').scrollTop(getContent + 55);
            }, 100);
        }
    }

    $scope.removeSplitRow = function (currIndex) {
        if ($scope.splitFlag) {
            $scope.splitList.number.splice(currIndex, 1);
        } else {
            $scope.splitList.percent.splice(currIndex, 1);
        }
    }

    $scope.totalSplitNumber = 0;
    $scope.totalSplitPercent = 0;

    function fnCalculation() {
        if ($scope.splitFlag) {
            var numberTotal = 0;
            angular.forEach($scope.splitList.number, function (value, i) {
                if ($scope.splitList.number[i].splitValue == '' || $scope.splitList.number[i].splitValue == null) {
                    numberTotal = numberTotal + 0;
                }
                else {
                    numberTotal = numberTotal + $scope.splitList.number[i].splitValue;
                }
            });
            $scope.totalSplitNumber = numberTotal;
        }
        else {
            var percentTotal = 0;
            angular.forEach($scope.splitList.percent, function (value, i) {
                if ($scope.splitList.percent[i].splitValue == '' || $scope.splitList.percent[i].splitValue == null) {
                    percentTotal = percentTotal + 0;
                }
                else {
                    percentTotal = percentTotal + $scope.splitList.percent[i].splitValue;
                }
            });
            $scope.totalSplitPercent = percentTotal;
        }
    }

    $scope.$watch('splitList', function (n, o) {
        fnCalculation();
    }, true);

    // popup -- split -- focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };
    // End: popup -- split

    // popup -- Add Taxes -- grid Data -- add a row in the array
    $scope.taxList = {
        'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [
                { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 1', 'taxRate': '10', 'showEdithCurrentPanel': false },
               { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 2', 'taxRate': '68', 'showEdithCurrentPanel': false },
                { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 3', 'taxRate': '5', 'showEdithCurrentPanel': false },
               { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 4', 'taxRate': '79', 'showEdithCurrentPanel': false }
    ];

    // popup -- Add Taxes -- grid Data -- add new row
    $scope.addCurrent = function () {
        if ($scope.taxList.taxCode != '') {
            $scope.taxesDetailLists.push($scope.taxList);
            $scope.taxList = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };
        }
        updatePersentage();
    }

    // popup -- Add Taxes -- grid Data -- iffy function for percentage
    function updatePersentage() {
        var sum = 0;
        for (var i = 0; i < $scope.taxesDetailLists.length; i++) {
            sum += parseInt($scope.taxesDetailLists[i].taxRate, 10);
        }
        $scope.totalPercentage = sum / $scope.taxesDetailLists.length;
    }
    updatePersentage();
    $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };
    $scope.taxfocus = false;

    // popup -- Add Taxes -- grid Data -- delete current row
    $scope.delCurrent = function (current) {
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item ''" + $scope.taxesDetailLists[current].taxDetail + "''</p>";
        var confi = {
            type: "warning",
            message: msgDetails,
            buttons: [
            {
                "title": "YES",
                "result": "yes"
            },
            {
                "title": "NO",
                "result": "no"
            }
            ]
        };

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                Materialize.toast('Tax deleted successfully', 2000);
            }
            updatePersentage();
        });

        
    };

    // popup -- Add Taxes -- grid Data -- edit current row
    $scope.editCurrent = function (current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        $scope.updatedCurrentTax.taxCode = getcurrentTaxValue.taxCode;
        $scope.updatedCurrentTax.taxDetail = getcurrentTaxValue.taxDetail;
        $scope.updatedCurrentTax.taxRate = getcurrentTaxValue.taxRate;
        updatePersentage();
    };

    // popup -- Add Taxes -- grid Data -- update current row with edited value
    $scope.updatedEdited = function (current) {
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        if ($scope.updatedCurrentTax.taxCode != '') {
            getcurrentTaxValue.taxCode = $scope.updatedCurrentTax.taxCode;
            getcurrentTaxValue.taxDetail = $scope.updatedCurrentTax.taxDetail;
            getcurrentTaxValue.taxRate = $scope.updatedCurrentTax.taxRate;
            $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
            $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
        }
        updatePersentage();
        Materialize.toast('Tax edited Successfully', 2000);
    };

    // popup -- Add Taxes -- grid Data -- cancel editing activity
    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
    }

    // popup -- Add Taxes -- grid Data -- apply function
    $scope.applyFn = function () {
        Materialize.toast('Tax Added Successfully', 2000);
    }

    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.attachmentMsg = "Supported file formats: doc, docs, pdf, jpg, jpeg, png, tiff.\
        <br />Limited to file(s) of 10MB each.\
	    <br /> Maximum 5 files can be uploaded.";
    $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
    $scope.attchmentMsg = $scope.attachmentMsg;
    $scope.attachFlag = false;
    $scope.attachmentList = [
		{
		    name: "AttachmentOne.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentTwo.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentThree.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentFive.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		}
    ];
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;
        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function (el) {
        el.isShow = false;
    }

    $scope.retryCall = function (el) {
        el.status = "success";
    }
    $scope.removeRow = function (el) {
        // remove the row specified in index
        if ($scope.attachmentList.length > 1) {
            if ($scope.attachmentList.length == 2) {
                $scope.attachmentList[1].actionIconDelete = false;
            }
            $scope.attachmentList.splice(index, 1);
        }
    };
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e) {
        $scope.showUploadPopup = true;
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
    }
    $scope.showNotesAttach = false;
    $scope.showNotesAttachCall = function () {
        $scope.attachNotesName = "";
        $scope.attachNotesDesp = "";
        $scope.showNotesAttach = true;
    }
    $scope.hideNotesAttachPopupCallback = function (e) {
        $scope.showNotesAttach = false;
    }
    $scope.showExternalLinkAttach = false;
    $scope.showExternalLinkAttachCall = function () {
        $scope.attachExternalL = "";
        $scope.showExternalLinkAttach = true;
    }
    $scope.hideExternalLinkAttachPopupCallback = function (e) {
        $scope.showExternalLinkAttach = false;
    }
        $scope.notesAndAttachmentsConfig = [

              {
                  "field": "lineNumber",
                  "width": 150,
                  "displayName": "Line Number",
                  "isFixed": "Left",
                  "isTree": true,
                  "isVisible": true,
                  "isReadOnly": true,
                  "autoIncrement": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "editable",
                  "attributes": {
                      "type": "number"
                  }
              },
              {
                  "field": "itemNumber",
                  "width": 150,
                  "displayName": "Item Number",
                  "isFixed": "Left",
                  "isVisible": true,
                  "isReadOnly": true,
                  "autoIncrement": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "editable"
              },
              {
                  "field": "description",
                  "width": 200,
                  "displayName": "Description",
                  "isReadOnly": true,
                  "isFixed": "Left",
                  "isVisible": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "editable"
              },
              {
                  "field": "attachment",
                  "width": 200,
                  "displayName": "Name",
                  "isFixed": "Left",
                  "isVisible": true,
                  "isReadOnly": true,
                  "isRegFocusCol": true,
                  "filterObject": { "enableFiltering": true },
                  "enableCellEdit": false,
                  "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate' ng-if='row.entity.attachment.isLineHeader'>{{row.entity.attachment.name}}</span><a href='javascript:void(0)' class='ui-grid-cell-container-name truncate' onclick='' ng-if='!row.entity.attachment.isLineHeader'>{{row.entity.attachment.name}}</a><smart-dropdown config='{{dropDownConfig}}' class='ui-grid-cell-container-icons' ng-if='row.entity.attachment.isLineHeader'><a href='javascript:void(0)' class='dropdown-button' data-activates='addLineAttachOptions{{rowRenderIndex}}'  data-constrainwidth='false'><i class='icon iconSmall tooltipped' delay='50' message='Add' position='bottom' smart-tooltip><svg><use xlink:href='#icon_CirclePlus'></use></svg></i></a><ul class='dropdown-content' id='addLineAttachOptions{{rowRenderIndex}}'><li><a href='javascript:void(0);' ng-click='grid.appScope.$parent.$parent.adduploadCallback();'>{{'Upload File'|| translate}}</a></li><li><a href='javascript:void(0)' ng-click='grid.appScope.$parent.$parent.showNotesAttachCall()'>{{'Notes'|| translate}}</a><li><a href='javascript:void(0)' ng-click='grid.appScope.$parent.$parent.showExternalLinkAttachCall()'>{{'External Link'|| translate}}</a></li></ul></smart-dropdown><smart-dropdown config='{{dropDownConfig}}' class='ui-grid-cell-container-icons' ng-if='!row.entity.attachment.isLineHeader'><a href='javascript:void(0)' class='dropdown-button' data-activates='addAttachOptions{{rowRenderIndex}}'  data-constrainwidth='false'><i class='icon iconSmall tooltipped' delay='50' message='Action' position='bottom' smart-tooltip><svg><use xlink:href='#icon_MenuKebab'></use></svg></i></a><ul class='dropdown-content' id='addAttachOptions{{rowRenderIndex}}'><li><a href='javascript:void(0);' ng-if='row.entity.attachment.type == \"File\"'>{{'Replace'|| translate}}</a><a href='javascript:void(0);' ng-if='row.entity.attachment.type != \"File\"'>{{'Edit'|| translate}}</a></li><li><a href='javascript:void(0)' >{{'Delete'|| translate}}</a></li></ul></smart-dropdown></div>"
              },
              //{
              //    "field": "actions",
              //    "width": 32,
              //    "displayName": "",
              //    "isFixed": "Left",
              //    "isVisible": true,
              //    "enableColumnMenu": false,
              //    "isReadOnly": true,
              //    "isRegFocusCol": true,
              //    "enableCellEdit": false,
              //    "cellTemplate": "<div><smart-dropdown config='{{dropDownConfig}}'><a href='javascript:void(0)' class='dropdown-button' data-activates='addLineAttachOptions'  data-constrainwidth='false'><i class='icon iconSmall tooltipped' delay='50' message='ADD ' position='bottom' smart-tooltip><svg><use xlink:href='#icon_MenuKebab'></use></svg></i></a><ul class='dropdown-content dropdown-with-grp' id='addLineAttachOptions'><li class='dropdown-content-grp'><div class='dropdown-content-grp-title'><strong>Add</strong><i class='icon right'><svg><use xlink:href='#icon_DownChevron'></use></svg> </i></div><ul class='dropdown-content-grp-list'><li><a href='javascript:void(0);' ng-click='adduploadCallback();'>{{'Upload File'|| translate}}</a></li><li><a href='javascript:void(0)' ng-click='grid.appScope.showNotesAttachCall()'>{{'Notes'|| translate}}</a><li><a href='javascript:void(0)' ng-click='grid.appScope.showExternalLinkAttachCall()'>{{'External Link'|| translate}}</a></li></ul></li><li><a href='javascript:void(0)' ng-click='grid.appScope.showExternalLinkAttachCall()'><strong>{{'Edit'|| translate}}</strong></a></li><li><a href='javascript:void(0)' ng-click='grid.appScope.showExternalLinkAttachCall()'><strong>{{'Delete'|| translate}}</strong></a></li></ul></smart-dropdown>"
              //},
              {
                  "field": "attachment.type",
                  "width": 150,
                  "displayName": "Type",
                  "isVisible": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "editable"
              },
              {
                  "field": "classification.name",
                  "width": 230,
                  "displayName": "Classification",
                  "isVisible": true,
                  "isRegFocusCol": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "dropdown",
                  "attributes": {
                      "model": "type",
                      "dataKey": "name",
                      "options": [
                        {
                            "name": "S & P"
                        },
                        {
                            "name": "Prcoess step"
                        },
                        {
                            "name": "Reference"
                        }
                      ]
                  }
              },
              {
                  "field": "isExternal.name",
                  "width": 230,
                  "displayName": "Is External",
                  "isVisible": true,
                  "isRegFocusCol": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "dropdown",
                  "attributes": {
                      "model": "type",
                      "dataKey": "name",
                      "options": [
                        {
                            "name": "Yes"
                        },
                        {
                            "name": "No"
                        }
                      ]
                  }
              },
              {
                  "field": "addedOn",
                  "width": 230,
                  "displayName": "Added On",
                  "isVisible": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "editable"
              },
              {
                  "field": "addedBy",
                  "width": 150,
                  "displayName": "Added By",
                  "isVisible": true,
                  "filterObject": { "enableFiltering": true },
                  "type": "editable"
              }
        ];
        $scope.notesAndAttachmentsModel = [
                    {
                        "lineNumber": 1,
                        "itemNumber": 11110666,
                        "description": "Apple Phone",
                        "classification": { "name": "" },
                        "isExternal": { "name": "" },
                        "addedOn": "--",
                        "addedBy": "--",
                        "attachment": { "name": "0 Notes and Attachments", "isLineHeader": "true" },
                        "$$hashKey": "uiGrid-0012"
                    },
                    {
                        "lineNumber": 2,
                        "itemNumber": 11110276,
                        "description": "Laptop Dell",
                        "addedOn": "--",
                        "addedBy": "--",
                        "classification": { "name": "" },
                        "isExternal": { "name": "" },
                        "attachment": { "name": "3 Notes and Attachments", "isLineHeader": "true" },
                        "$$hashKey": "uiGrid-0012"
                    },
                  {
                      "lineNumber": 2,
                      "itemNumber": "",
                      "description": "",
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "attachment": { "name": "Filename.pdf", "type": "File" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 2,
                      "itemNumber": "",
                      "description": "",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "attachment": { "name": "xyz notes", "type": "Notes" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 2,
                      "itemNumber": "",
                      "description": "",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "attachment": { "name": "Google", "type": "external Link" },
                      "$$hashKey": "uiGrid-0012"
                  },
                    {
                        "lineNumber": 3,
                        "itemNumber": 11110657,
                        "description": "HR management System",
                        "addedOn": "--",
                        "addedBy": "--",
                        "classification": { "name": "--" },
                        "isExternal": { "name": "--" },
                        "attachment": { "name": "3 Notes and Attachments", "isLineHeader": "true" },
                        "$$hashKey": "uiGrid-0012"
                    },
                  {
                      "lineNumber": 3,
                      "itemNumber": "",
                      "description": "",
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "attachment": { "name": "Filename.pdf", "type": "File" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 3,
                      "itemNumber": "",
                      "description": "",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "attachment": { "name": "xyz notes", "type": "Notes" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 3,
                      "itemNumber": "",
                      "description": "",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "attachment": { "name": "Google", "type": "external Link" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 4,
                      "itemNumber": 11110653,
                      "description": "IP Phone",
                      "classification": { "name": "" },
                      "isExternal": { "name": "" },
                      "addedOn": "--",
                      "addedBy": "--",
                      "attachment": { "name": "3 Notes and Attachments", "isLineHeader": "true" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 4,
                      "itemNumber": "",
                      "description": "",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "attachment": { "name": "Filename.pdf", "type": "File" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 4,
                      "itemNumber": "",
                      "description": "",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "attachment": { "name": "xyz notes", "type": "Notes" },
                      "$$hashKey": "uiGrid-0012"
                  },
                  {
                      "lineNumber": 4,
                      "itemNumber": "",
                      "description": "",
                      "classification": { "name": "S & P" },
                      "isExternal": { "name": "Yes" },
                      "addedOn": "12/4/2016",
                      "addedBy": "John Doe",
                      "attachment": { "name": "Google", "type": "external Link" },
                      "$$hashKey": "uiGrid-0012"
                  }


        ];

        $scope.calculateTaxCalled = function () {
            var confi = {
                type: "confirm",
                message: "<p class='left-align'>This may take a while. You can re-visit the page once taxes are calculated</p>",
                checkMessage: "Notify over Email",
                buttons: [
                    {
                        "title": "OK",
                        "result": "yes"
                    },
                    {
                        "title": "CANCEL",
                        "result": "no"
                    }
                ]
            };

            //Notification call
            notification.notify(confi, function (responce) {});
        }

        $scope.addLinesPopupUrl = "shared/popup/views/addLinesFromContractPopup.html";
        $scope.showAddLinesPopup = false;
        $scope.showAddLinesCallback = function (e) {
            $scope.showAddLinesPopup = true;
        };
        $scope.hideAddLinesCallback = function (e) {
            $scope.showAddLinesPopup = false;
        };
    
}

function p2pOrderPreviewCtrlFunc($scope, $rootScope, RuleEngine, $http, notification, $state) {
    /*
	 *  Service call get form-config and data-model
	 */
    var req = {
        method: 'GET',
        url: 'p2p/order/models/createOrder.json'
    };

    $http(req).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig;
      
    }, function (error) {
        console.log(JSON.stringify(error));
    });


    // edit order
    $scope.editOrder = function () {
        $state.go('p2p.order.new');
    }

    //Notification
    $scope.submitReq = function () {
        var confi = {
            type: "success",
            message: "<p class='left-align'>Requisition has been submitted successfully.</p>",
        
            buttons: [
				{
				    "title": "YES",
				    "result": "yes"
				},
				{
				    "title": "Stay on same page",
				    "result": "no"
				}
            ]
        };

        //Notification call
        notification.notify(confi, function (responce) {
            if (responce.result == "yes") {
                $state.go('expandedLandingList', { pagefor: 'manage', doctype: 'order' });
            } else {
                return;
            }
        });
    }
}

function p2pOrderTnCCtrlFunc($scope, $rootScope, RuleEngine, $http, notification, $state, $window, $anchorScroll, $location, $filter) {
    /*
	 *  Service call get form-config and data-model
	 */
    var req = {
        method: 'GET',
        url: 'p2p/order/models/createOrder.json'
    };

    $http(req).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig;
      
    }, function (error) {
        console.log(JSON.stringify(error));
    });


    // side bar list
    $scope.iteams = [
	    { title: 'Definitions', lable: 'definitions', isChecked: false },
	    { title: 'Application of Terms', lable: 'application', isChecked: false },
	    { title: 'Cancellation or Change of Purchase Orders', lable: 'cancellation', isChecked: false },
        { title: 'Prices and Taxes', lable: 'prices', isChecked: false },
	    { title: 'Payment Terms and Invoices', lable: 'payment', isChecked: false },
        { title: 'Shipping, Delivery and Acceptance', lable: 'shipping', isChecked: false },
	    { title: 'Representations and Warranties', lable: 'representations', isChecked: false },
        { title: 'Termination', lable: 'termination', isChecked: false },
        { title: 'Independent contractor services', lable: 'independent', isChecked: false },
	    { title: 'Ownership', lable: 'ownership', isChecked: false },
        { title: 'Indemnity', lable: 'indemnity', isChecked: false },
	    { title: 'Insurance', lable: 'insurance', isChecked: false },
	    { title: 'Force Majeure', lable: 'force', isChecked: false },
	    { title: 'Confidentiality', lable: 'confidentiality', isChecked: false },
	    { title: 'Limitation of Liability', lable: 'limitation', isChecked: false },
        { title: 'Compliance with Laws', lable: 'compliance', isChecked: false },
	    { title: 'General', lable: 'general', isChecked: false },
        { title: 'Governing Law and Jurisdiction', lable: 'governing', isChecked: false }
    ];



    // side bar -- dynamic scrolling
    $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
    angular.element($window).bind('resize', function (e) {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        if ($scope.isVisible) {
            if ($scope.fixedSubHeader) {
                $scope.dynamicScroll = ($window.innerHeight - 113) + 'px';
            }
            else {
                $scope.dynamicScroll = ($window.innerHeight - 177) + 'px';
            }
        }
        $scope.$apply();
    });

    angular.element($window).bind('scroll', function () {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        if ($scope.isVisible) {
            if ($scope.fixedSubHeader) {
                $scope.dynamicScroll = ($window.innerHeight - 113) + 'px';
            }
            else {
                $scope.dynamicScroll = ($window.innerHeight - 177) + 'px';
            }
        }
        $scope.$apply();
    });


    $scope.indexToShow = 0;
    $scope.selectedRepo = $scope.iteams[$scope.indexToShow];
    $scope.selectClass = '';
    function setActive(index) {
        $scope.indexToShow = index;
        $scope.selectedRepo = $scope.iteams[index];
    }



    //left panel selection link
    $scope.clickCount = -1;
    $scope.selectedItem = function (index, lable) {
        setActive(index);

        var newHash = lable;

        if ($location.hash() !== newHash) {
            $location.hash(lable);
        } else {
            $anchorScroll();
        }
        $scope.clickCount--;
    }

    //page back link
    $scope.backToHistory = function () {
        history.go($scope.clickCount);
    }

    $scope.change = function () {
        if ($scope.indexToShow < $scope.iteams.length - 1) {
            setActive(++$scope.indexToShow);
        } else {
            setActive(0);
        }
    };

    $scope.change1 = function () {
        if ($scope.indexToShow >= 1) {
            setActive(--$scope.indexToShow);
        } else {
            setActive(($scope.iteams.length - 1));
        }
    };



    // right side content height
    $scope.contHeight = $window.innerHeight + 'px';

    // sidebar -- show hide button interaction
    $scope.isBtnActive = false;
    $scope.activeButton = function () {
        $scope.isBtnActive = !$scope.isBtnActive;
    }


    // side bar interaction for less than 1200px
    $scope.isActiveSideBar = true;
    angular.element($window).bind('resize', function (e) {
        if ($window.innerWidth >= 1199) {
            $scope.isActiveSideBar = true;
        } else {
            $scope.isActiveSideBar = false;
        }
    });

    function setScroll() {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        if ($scope.isVisible) {
            if ($scope.fixedSubHeader) {
                $scope.dynamicScroll = ($window.innerHeight - 113) + 'px';
            }
            else {
                $scope.dynamicScroll = ($window.innerHeight - 177) + 'px';
            }
        }
        $scope.$apply();
    }

    $scope.selectTNC = false;

    $scope.mode = $state.params.mode;
    $scope.from = $state.params.from;
    if ($scope.mode == "select") {
        $scope.selectTNC = true;
    }
    else {
        $scope.selectTNC = false;
    }

    $scope.headerChangeTNC = function () {
        var selectedCount = $filter('filter')($scope.iteams, { isChecked: true }).length;
        if ($scope.selectTNC) {
            if (selectedCount > 0) {
                $scope.isVisible = true;
            } else {
                $scope.isVisible = false;
            }
        } else {
            $scope.isVisible = false;
        }
        
        setScroll();
    }
    
    $scope.isVisible = false;
    $scope.fillpartial = false;
    $scope.changeCallback = function () {
        var selectedCount = $filter('filter')($scope.iteams, { isChecked: true }).length;
        if (selectedCount > 0) {
            $scope.isVisible = true;
            $scope.fillpartial = true;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
            $scope.selectAllChecked = false;
        }

        if (selectedCount == $scope.iteams.length) {
            $scope.fillpartial = false;
            $scope.selectAllChecked = true;
        }

        setScroll();
    }

    $scope.selectAllChecked = false;
    $scope.selectAllChangeCallback = function () {
        $scope.selectAllChecked = !$scope.selectAllChecked;
        $scope.fillpartial = false;

        if ($scope.selectAllChecked) {
            angular.forEach($scope.iteams, function (k, i) {
                k.isChecked = true;
            });
            $scope.isVisible = true;
        }
        else {
            angular.forEach($scope.iteams, function (k, i) {
                k.isChecked = false;
            });
            $scope.isVisible = false;
        }

        setScroll();
    }

    $scope.doneCallback = function () {
        if ($scope.from == "req") {
            $state.go('p2p.req.new');
        } else {
            $state.go('p2p.order.new');
        }
    }

}

function popupMngAppCtrlFunc($scope, $timeout) {


    /*dropdownConfig - comment*/
    $scope.commentDropdownConfig = { "inDuration": 300, "outDuration": 225, "constrain_width": false, "hover": false, "gutter": 0, "belowOrigin": false, "alignment": "left" };

    $scope.approvalProccess = [
       {
           "name": "HR",
           "rule": "CC Category Rule 1.1",
           "statusLebal": "Offline",
           "status": false,
           "isFocus": false,
           "iconComment": "#icon_Comments",
           "comment": "",
           "attachments": [
               { 'attachmentFileName': 'Attachment.xls' },
                { 'attachmentFileName': 'Attachment 1.xls' },
                { 'attachmentFileName': 'Attachment 2.xls' },
                { 'attachmentFileName': 'Attachment 3.xls' }
           ],
           "showAllAttachment": false,
           "isAttached": false
       },
         {
             "name": "GROUP",
             "rule": "Lead Approver",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         },
         {
             "name": "HR",
             "rule": "CC Category Rule 1.1",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         },
         {
             "name": "GROUP",
             "rule": "Lead Approver",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         },
         {
             "name": "HR",
             "rule": "CC Category Rule 1.1",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         },
         {
             "name": "GROUP",
             "rule": "Lead Approver",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         }, {
             "name": "HR",
             "rule": "CC Category Rule 1.1",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         },
         {
             "name": "GROUP",
             "rule": "Lead Approver",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         }, {
             "name": "HR",
             "rule": "CC Category Rule 1.1",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         },
         {
             "name": "GROUP",
             "rule": "Lead Approver",
             "statusLebal": "Offline",
             "status": false,
             "isFocus": false,
             "iconComment": "#icon_Comments",
             "comment": "",
             "attachments": [
                 { 'attachmentFileName': 'Attachment.xls' },
                  { 'attachmentFileName': 'Attachment 1.xls' },
                  { 'attachmentFileName': 'Attachment 2.xls' },
                  { 'attachmentFileName': 'Attachment 3.xls' }
             ],
             "showAllAttachment": false,
             "isAttached": false
         }


    ];

    $scope.makeCommentfocus = function (index) {

        angular.forEach($scope.approvalProccess, function (approval, key) {
            approval.isFocus = false
        });
        $scope.approvalProccess[index].isFocus = true;
    }

    var closeDropDown = function () {
        angular.element(document).triggerHandler('click');
    }

    $scope.addAttachment = function (index) {
        var attachmentPopup = $scope.$parent.$parent.$parent;
        attachmentPopup.adduploadCallback(event, 'manageApproval');
        $scope.approvalProccess[index].isAttached = true;
        closeDropDown();
    }



    $scope.cancelnClose = function () {
        closeDropDown();
    }

    $scope.saveComment = function (index) {
        var checkComment = $scope.approvalProccess[index].comment;
        if (checkComment) {

            $scope.approvalProccess[index].iconComment = "#icon_Commented"
        } else {
            $scope.approvalProccess[index].iconComment = "#icon_Comments"
        }

        closeDropDown();
    }
    $scope.showFunc = function (index) {
        $scope.approvalProccess[index].showAllAttachment = $scope.approvalProccess[index].showAllAttachment == false ? true : false;
    }

    $scope.isScrolled = false;

    $scope.smartScrollConfig = {
        'onScroll': function (e) {
            $timeout(function () {
                if (0 < e.scroll) {
                    $scope.isScrolled = true;
                } else {
                    $scope.isScrolled = false;
                }
            });
        }

    }


};

function popupShipToLocCtrlFunc($scope) {
    $scope.typeaheadLabel = "Deliver To";
    $scope.options = [
                        { "deliverTo": "Mumbai", "deliverToAdd": "7th Floor, Building 3 Plot # 3 TTC Industrial Area MIDC Thane Belapur Road Airoli Navi Mumbai 400 708" },
                        { "deliverTo": "Hyderabad", "deliverToAdd": "Western Pearl, 8th Floor Next to Google Building, Kondapur, Hitech-city Hyderabad 500084" },
                        { "deliverTo": "Shanghai", "deliverToAdd": "Cross Tower, #318 Fu Zhou Road,HuangPu District, Shanghai" },
                        { "deliverTo": "Singapore", "deliverToAdd": "89 Short Street, #B1-11 Golden Wall Centre, Singapore-188216" },
                        { "deliverTo": "Sydney", "deliverToAdd": "Australia Square 2000 NSW, Australia" },
                        { "deliverTo": "London", "deliverToAdd": "GEP, 22 Tudor Street, London, EC4Y 0AY" },
                        { "deliverTo": "Prague", "deliverToAdd": "Hradcansk� Office Center Milady Hor�kov� 116/109, Prague 6, 160 00 Czech Republic" },
    ];
    $scope.selected = $scope.options[0];
    $scope.selectedSupplierLocation = $scope.options[0];
    $scope.selectedShipToLocation = $scope.options[0];
    $scope.selectedBillToLocation = $scope.options[0];
    $scope.showLocationPopup = false;
    $scope.showLocationPopupFn = function () {
        $scope.showLocationPopup = true;
    };
    $scope.showLocationPopupClBack = function () {
        $scope.showLocationPopup = false;
    };
}
function p2pOrderTeamMemberCtrlFunc($scope, notification, $rootScope, RuleEngine, $http) {
	$scope.teamMemberAdded = false;
	$scope.addTeamMemberComplete = function () {
		$scope.teamMemberAdded = true;
	}
	$scope.selectAllTeamMember = { checkAll: false };
	$scope.addedTeamMembers = [{ name: "John Doe", isChecked: true, isDisabled: true }];
	$scope.showTeamMemberPopup = false;
	$scope.showTeamMemberPopupCall = function () {
		$scope.showTeamMemberPopup = true;
	}
	$scope.hideTeamMemberPopupCall = function (e) {
		$scope.showTeamMemberPopup = false;
	}
	$scope.teamMemberList = [
		{ name: "Paul Henning", isChecked: false },
        { name: "Paul Hen123", isChecked: false },
        { name: "Paul 456", isChecked: false },
		{ name: "Robin Alter", isChecked: false },
		{ name: "Spike Seldin", isChecked: false },
		{
		    name: "Group 1",
		    isGroup: true,
		    group: [{ name: "Spike Seldin", isChecked: false }, { name: "Robin Alter", isChecked: false }, { name: "Spike Seldin", isChecked: false }],
		    isChecked: false
		},
		{ name: "Jules Daly", isGroup: false, isChecked: false },
        { name: "Jules 123", isGroup: false, isChecked: false },
        { name: "Jules D123", isGroup: false, isChecked: false },

		{ name: "Sachin K", isGroup: false, isChecked: false },
		{ name: "Mayur G", isGroup: false, isChecked: false },
		{
		    name: "Group 2",
		    isGroup: true,
		    group: [{ name: "Spike Seldin", isChecked: false }, { name: "Robin Alter", isChecked: false }, { name: "Spike Seldin", isChecked: false }],
		    isChecked: false
		},
		{ name: "Gaurav J", isGroup: false, isChecked: false },
		{ name: "Rahul Y", isGroup: false, isChecked: false },
		{
		    name: "Group 3",
		    isGroup: true,
		    group: [{ name: "Spike Seldin", isChecked: false }, { name: "Robin Alter", isChecked: false }, { name: "Spike Seldin", isChecked: false }],
		    isChecked: false
		},
		{ name: "Abhishek K", isGroup: false, isChecked: false },
		{ name: "Kamlesh B", isGroup: false, isChecked: false },
		{ name: "Renju M", isGroup: false, isChecked: false },
		{ name: "Joel A", isGroup: false, isChecked: false },
		{ name: "Naushad S", isGroup: false, isChecked: false },
		{ name: "Kailas M", isGroup: false, isChecked: false },
		{ name: "Yogesh B", isGroup: false, isChecked: false },

	];

	$scope.addedTeamMember = [
		{ memberid: "mem1", name: "Paul Henning", isChecked: false },
		{ memberid: "mem2", name: "Robin Alter", isChecked: false },
		{ memberid: "mem3", name: "Spike Seldin", isChecked: false },
	];
	$scope.selectAllMembers = { checkedAll: false };
	$scope.checkedAllMembers = function (check) {
		$scope.fillpartial = false;
		if (check) {

			for (var i = 0; i < $scope.addedTeamMember.length; i++) {
				$scope.addedTeamMember[i].isChecked = true;
			}
		}
		else {
			for (var i = 0; i < $scope.addedTeamMember.length; i++) {
				$scope.addedTeamMember[i].isChecked = false;
			}
		}
	}
	$scope.fillpartial = false;
	$scope.membersListChange = function (check) {
		var countMembersList = 0;
		for (var i = 0; i < $scope.addedTeamMember.length; i++) {
			if ($scope.addedTeamMember[i].isChecked == true) {
				countMembersList++;
			}
		}
		$scope.fillpartial = true;
		if (countMembersList === 0) {
			$scope.fillpartial = false;
			$scope.selectAllMembers.checkedAll = false;
		}
		else if (countMembersList === $scope.addedTeamMember.length) {
			$scope.fillpartial = false;
			$scope.selectAllMembers.checkedAll = true;
		}
		else {
			$scope.fillpartial = true;
		}
	}	

	$scope.deletedMember = function (el, index) {
		$scope.addedTeamMember.splice(index, 1);
		for (i = 0; i < $scope.teamMemberList.length; i++) {
			if (el.memberid == $scope.teamMemberList[i].memberid) {
				$scope.teamMemberList[i].isChecked = false;
				return;
			}
	    }
	}
}

function p2pOrderNotificationCtrlFunc($scope, notification, $rootScope, RuleEngine, $http, notificationService, $location, $state, previousState) {
	$scope.addNoti = function () {
		$location.path(previousState.lastHref);
	
	};

	$scope.notificationList = notificationService.list();
	
    
	$scope.delete = function (id) {
		$scope.notificationList.splice(id, 1);
		var notlength = $scope.notificationList.length;

		for (i = 0; i < $scope.notificationList.length; i++) {
			if (el.id == $scope.notificationList[i].id) {
				$scope.notificationList[i].isChecked = false;
				return;
			}
			$scope.notificationCount = $scope.notificationList.length;
		}
        	
		notificationService.delete(id);
		if ($scope.notificationNew.id == id) $scope.notificationNew = {};

		
		//$scope.notificationCount = $scope.notificationList.length;
	}

	$scope.edit = function (notification) {
		//$scope.notificationList = notification;
		$state.go('admin.notificationView', { mode: 'edit', name: name });
	
	}
    
	/* NOTIFICATION COUNT */
	//$scope.notificationCount = 0;
	//if ($scope.notificationList.length == 0) {
	//	$scope.notificationCount = 0;
	//} else {
	//	$scope.notificationCount = $scope.notificationList.length
	//}
	/* NOTIFICATION COUNT ENDS */

	/* CHECK BOX */
	//$scope.selectAllNotifications = { checkAll: false };
        
    $scope.selectAllNotifications = { checkedAll: false };
    $scope.checkedAllMembers = function (check) {
        $scope.fillpartial = false;
        if (check) {
			for (var i = 0; i < $scope.notificationList.length; i++) {
				$scope.notificationList[i].isChecked = true;
            }
        }
        else {
			for (var i = 0; i < $scope.notificationList.length; i++) {
				$scope.notificationList[i].isChecked = false;
            }
        }
    }
    $scope.fillpartial = false;
    $scope.membersListChange = function (check) {
        var countMembersList = 0;
		for (var i = 0; i < $scope.notificationList.length; i++) {
			if ($scope.notificationList[i].isChecked == true) {
                countMembersList++;
		}
        }

	$scope.showSandPPreview = function (index) {		
		$scope.previewSanPFlag = true;
		$scope.slideObj = {
			list: $scope.spList,
			index: index,
			src: 'p2p/order/views/popupPreviewSandP.html'
		};
	};
	$scope.closeSandPPreviewPopup = function () {
		$scope.previewSanPFlag = false;
	}
        $scope.fillpartial = true;
        if (countMembersList === 0) {
            $scope.fillpartial = false;
			$scope.selectAllNotifications.checkedAll = false;
        }
		else if (countMembersList === $scope.notificationList.length) {
            $scope.fillpartial = false;
			$scope.selectAllNotifications.checkedAll = true;
        }
        else {
            $scope.fillpartial = true;
        }
    }

    $scope.deletedMember = function (el, index) {
        $scope.addedNotification.splice(index, 1);
        /*for (i = 0; i < $scope.teamMemberList.length; i++) {
            if (el.memberid == $scope.teamMemberList[i].memberid) {
                $scope.teamMemberList[i].isChecked = false;
                return;
            }
        }*/
    };

	/* 
		HEADER SEARCH INTRACTION
	*/
	$scope.showSearchHeader = function () {
		this.isActiveHeader = true;
		this.focusSearchHeader = true;
		this.hideCloseHeader = true;
	}
	$scope.hideSearchHeader = function () {
		this.isActiveHeader = false;
		this.focusSearchHeader = false;
		this.hideCloseHeader = false;
	}
	
}
function p2pSandardAndProcedureSectionCtrlFunc($scope, notification, $rootScope, RuleEngine, $http) {
	$scope.spAdded = false;
	$scope.addSPComplete = function () {
		$scope.spAdded = true;
	}
	$scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
	$scope.showSPPopup = false;
	$scope.showSPPopupCall = function () {sdsdsdsd
		$scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
		$scope.selectedSP = {};
		$scope.showSPPopup = true;
	}
	$scope.hideSPPopupCall = function (e) {
		$scope.showSPPopup = false;
	}
	$scope.spList = [
		{
			title: "Purchase Order Terms 1",
			codeRev: "PO TERMS/011",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			title: "Purchase Order Terms 2",
			codeRev: "PO TERMS/012",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			title: "Purchase Order Terms 3",
			codeRev: "PO TERMS/013",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			title: "Purchase Order Terms 4",
			codeRev: "PO TERMS/014",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		}

	];
	$scope.isSandPSelected = false;
	$scope.isEditMode = false;
	$scope.selectedSP = {};
	$scope.editSandP = function (spObj) {
		$scope.previewSanPFlag = false;
		$scope.titleSandPPopup = "EDIT STANDARD AND PROCEDURE";
		$scope.selectedSP = spObj;
		$scope.showSPPopup = true;
		$scope.isEditMode = true;
	}
	$scope.sandpListCheckCall = function () {
		var countSandPChecked = 0;
		for (var i = 0; i < $scope.spList.length; i++) {
			if ($scope.spList[i].isChecked) {
				countSandPChecked++;
			}
		}
		if (countSandPChecked > 0) {
			$scope.isSandPSelected = true;
		} else $scope.isSandPSelected = false;
	}

	$scope.showSandPPreview = function (index) {
		$scope.previewSanPFlag = true;
		$scope.slideObj = {
			list: $scope.spList,
			index: index,
			src: 'p2p/order/views/popupPreviewSandP.html'
		};
	};
	$scope.closeSandPPreviewPopup = function () {
		$scope.previewSanPFlag = false;
	}

	/* 
		HEADER SEARCH INTRACTION
	*/
	$scope.showSearchHeader = function () {
		this.isActiveHeader = true;
		this.focusSearchHeader = true;
		this.hideCloseHeader = true;
	}
	$scope.hideSearchHeader = function () {
		this.isActiveHeader = false;
		this.focusSearchHeader = false;
		this.hideCloseHeader = false;
	}

}

function additionalInfoCtrlFunc($scope, $rootScope, RuleEngine, $http, $window, $state, $timeout, $sce) {
    /* Additional information  */

    $scope.idIs = $state.params.id;
    var additionalInfo = {
        method: 'GET',
        url: 'p2p/order/models/createOrder.json'
    };

    $http(additionalInfo).then(function(response) {
        $scope.data = response.data.dataModel;
        $scope.dataModel = $scope.data.additionalInfo.data;
        $scope.lineviewData = $scope.data.LineLeveladditionalInfo;
        if($state.current.name == 'p2p.order.additionalInfo' &&  $scope.idIs != undefined ){
            $scope.lineviewData[$scope.idIs].showContent = true;
            $scope.isAdditionalInfoPage = true;
        }
    }, function(error) {
        console.log(JSON.stringify(error));
    });





$scope.sectionName = "ADDITIONAL INFORMATION"

$scope.fieldCount = function(paramUse){

    var count = 0;
        angular.forEach(paramUse, function(k,v){
                count += paramUse[v].questions.length;
        });
        return count;
}


    $scope.returnColClass = function(que) {


        var q = que.question;



        if (q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" || q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" && q == "")
            {
                    return "s12 m6 l4 xl4 xxl4";
            }
        else if (q.length >= 21 && q.length <= 40 && que.type != "multi-text" && que.type != "multi-text-with-icon")
            {
                 return "s12 m12 l6 xl6 xxl6";
            }
            else{
                return "s12";
            }
    }




    // side bar -- dynamic scrolling
    $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
    angular.element($window).bind('resize', function (e) {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        $scope.$apply();
    });

    angular.element($window).bind('scroll', function () {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        }
        else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }
        $scope.$apply();
    });


    //left panel selection link
    $scope.currentSelected = $scope.idIs;
    $scope.selectedItem = function (index) {

        angular.forEach($scope.lineviewData, function(value,key){
            $scope.lineviewData[key].showContent = false;
        });

        $scope.currentSelected = index;
      $scope.lineviewData[index].showContent = true;
    }

   

    // right side content height
    $scope.contHeight = function(fixedSubHeader){
        if(fixedSubHeader){

            return $window.innerHeight - 50
        }
        else{

            return $window.innerHeight - 114
        }

    };

    // sidebar -- show hide button interaction
    $scope.isActive = false;
    $scope.activeButton = function () {
        $scope.isActive = !$scope.isActive;
    }


    // side bar interaction for less than 1200px
    $scope.isActiveSideBar = true;
    angular.element($window).bind('resize', function (e) {
        if ($window.innerWidth >= 1199) {
            $scope.isActiveSideBar = true;
        } else {
            $scope.isActiveSideBar = false;
        }
    });


    /* Additional information  end */

    /*search */
      $scope.focusSearchC = false;
    $scope.isActiveC = false;
    $scope.showMeC = false;
    $scope.showSearchC = function () {
        $scope.isActiveC = true;
        $scope.focusSearchC = true;
        $scope.showMeC = true;
        $scope.hideCloseC = true;
    };
    $scope.hideSearchC = function () {
        $scope.isActiveC = false;
        $scope.focusSearchC = false;
        $scope.hideCloseC = false;
    };

    $scope.getFieldType = function(getFieldType){
        switch (getFieldType) {
            case 'numeric':
                 return 'number'
                break;
            default:
               return 'text'
                break;
        }
    }

    $scope.returnField = function(fieldType){

        switch (fieldType) {
             case 'single-text':
             case 'numeric':
                 return 'single-text.html'
                break;
             case 'multi-text':
                 return 'multi-text.html'
                 break;
            case 'multi-text-with-icon':
                return 'multi-text-with-icon.html'
                break;
            case 'single-response-radio':
                 return 'single-response-radio.html'
                break;
                  case 'single-response-drop':
                 return 'single-response-drop.html'
                break;
                  case 'multi-response':
                 return 'multi-response.html'
                break;
                  case 'date-time':
                 return 'date-time.html'
                break;
                  case 'multi-text-format':
                 return 'multi-text-format.html'
                break;
          
                  case 'attachment-only':
                 return 'attachment-only.html'
                break;
                  case 'multi-numeric':
                 return 'multi-numeric.html'
                break;
                case "grid-type-text":
            case "grid-type-combination":
            case "grid-type-wrow-combination":
                return 'grid-type-combination.html'
                  break;
                case "list-box":
                return 'list-box.html'
               }
    }

// upload Attachment


    var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
    $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
        // Start: Add guideline popup
    $scope.addDocumentPoupUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.addDocumentPopup = false;

    $scope.addDocumentPopupCallback = function (data) {
        //if (!$scope.supplierView) {

        $scope.uploadTitle = "ADD ATTACHMENT";
        $scope.uploadTitleContent = "Upload Attachments";
        $scope.addDocumentPopup = true;
        //}
        //if ($scope.supplierView) {
        data.isVisible = true;
        //}
    }
    $scope.hideAddDocumentPopupCallback = function () {
        $scope.addDocumentPopup = false;
    };
    // Start: Upload events
    $scope.attachFlag = false;
    $scope.attachmentList = [
        {
            name: "AttachmentOne.xls",
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentTwo.xls",
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentThree.xls",
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentFour.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        },
        {
            name: "AttachmentFive.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        }
    ];
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;

        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function (el) {
        el.isShow = false;

    };
    $scope.retryCall = function (el) {
        el.status = "success";
    };
    // End: Upload events

    $scope.moreFieldsClick = function () {
        $state.go('p2p.order.additionalInfo', { 'id': 0 });
    }
}

function p2pOrderPdfCtrlFunc($scope, $rootScope, RuleEngine, $http, notification, $state) {
	
}

function cancelOrderPdfCtrlFunc($scope, $rootScope, $state) {
    $scope.submitTrigger = function () {
        $state.go('p2p.order.new');
    }
}
