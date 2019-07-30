'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.P2P.controller:p2pOrderCtrl
 * @description
 * Controller of P2P Orders.
 */
   .controller('p2pReqViewChangesCtrl', ['$rootScope', '$scope', '$window', '$translate', '$timeout', 'storeService', '$state', 'notification', '$filter', '$http', p2pReqViewChangesCtrlFunc]);
/**
 * @ngdoc method
 * @name p2pOrderCtrlFunc
 * @methodOf SMART2.P2P.controller:p2pOrderCtrl
 * @description
 * The method of the p2pOrderCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function p2pReqViewChangesCtrlFunc($rootScope, $scope, $window, $translate, $timeout, storeService, $state, notification, $filter, $http) {
    //  $rootScope.isPageWithoutImage = true;
    var changeHistory = {
        method: 'GET',
        url: 'p2p/req/models/changeHistory.json'
    };

    $http(changeHistory).then(function (response) {

        //$scope.getDocObj = response.data.docObj;
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

        $scope.info = $scope.lineItems;
        lineItemsCallback();

    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.lineChangesFilter = true;
    $scope.lineChangesFilterShow = function () {
        $scope.lineChangesFilter = !$scope.lineChangesFilter;
    };

    $scope.templateListHeight = '308px';
    /*pagination*/
    $scope.numberOptions = [{
        "number": 10
    }, {
        "number": 20
    }, {
        "number": 30
    }, {
        "number": 40
    }, {
        "number": 50
    }];
    $scope.currentNumofItem = { "number": 10 };
    $scope.setTheItemWithNumber = function (currentNumber) {
        $scope.currentNumofItem.number = currentNumber;
    };

    /*pagination*/
    var changeType = $state.params.changeType;

    if (changeType == "reviewChange") {
        $scope.isCompared = true;
        $scope.stsList = true;
        $scope.showBtn = false;
     }
    if (changeType == "changeHistory") {
        $scope.isCompared = false; 
        $scope.stsList = false;
        $scope.showBtn = true; 
    }
    
    
    $scope.createChangeOrder = function () {
        var createOb = {
            type: "success",
            message: "<p class='left-align'>Change Order created successfully.</p>",
            buttons: [
                {
                    title: "OK",
                    result: "ok"
                }]
        };
        notification.notify(createOb);
    }

    $scope.docSelectClick = function () {
        docSelection();
    }
    $scope.hideFooter = false;
    $scope.compareDisable = true;

    $scope.docCheckOnChange = function () {
        var docSelectedCounter = $filter('filter')($scope.docObj, { isChecked: true }).length;
        if (docSelectedCounter < 2) {
            $scope.compareDisable = true;
        }
        else {
            $scope.compareDisable = false;
        }
    }
    $scope.compareDocs = function () {
    	var selectedCount = $filter('filter')($scope.docObj, { isChecked: true }).length;
    	if (selectedCount < 2) {
    		var selectTwoObj = {
    			type: "warning",
    			message: "<p class='left-align'>You must select at least 2 documents for comparison.</p>",
    			buttons: [
                    {
                    	title: "OK",
                    	result: "ok"
                    }
    			]
    		};
    		notification.notify(selectTwoObj, function () {
    			return false;
    		});
    		return;
    	}
    	else if (selectedCount > 2) {
    		var selectTwoObj = {
    			type: "inform",
    			message: "<p class='left-align'>You can select only 2 documents for comparison.</p>",
    			buttons: [
                    {
                    	title: "OK",
                    	result: "ok"
                    }
    			]
    		};
    		notification.notify(selectTwoObj, function () {
    			return false;
    		});
    		return;
    	}
    	else {
    		angular.forEach($scope.docObj, function (value, key) {
    			console.log(value.isChecked);
    			if (value.isChecked == true) {
    				value.isDisabled = true;

    			} else {
    				value.isVisible = false;
    			}
    		});

    		$scope.hideFooter = true;

    	}

    	$scope.isCompared = true;
     
    }

    var $docListWrap = $('.docListWrap'),
        stickyTop = $('.docListWrap').offset().top;

    $scope.changeDocs = function () {
    	$scope.isCompared = false;
    	$scope.hideFooter = false;
    	angular.forEach($scope.docObj, function (value, key) {
    		value.isVisible = true;
    		value.isDisabled = false;
    	});
    }

    function docSelection() {

        var checkedCount = 0,
            selectedChk = [],
            docChk = $('.docList-hdr-chk');

        $(docChk).each(function (index) {
            var $this = $(this);

            if ($this.is(':checked')) {
                checkedCount++;
                selectedChk.push($this);

                if (checkedCount >= 2) {
                    $(docChk).prop('disabled', true);
                    for (var i = 0; i < selectedChk.length ; i++)
                        selectedChk[i].prop('disabled', false);
                }
                else {
                    $(docChk).prop('disabled', false);
                }
            }
        });
    }

    if ($scope.isCompared) {
        $scope.docObj = [{
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true

        },
	{
	    number: '2014.090910-05',
	    status: 'Processed',
	    amountChanged: '19,000.00',
	    orderAmountChanged: '24,500',
	    createdBy: 'William Cooper',
	    role: 'Buyer',
	    createdOn: '10/10/2015',
	    isChecked: false,
	    isDisabled: false,
	    isPublished: false,
	    isVisible: true
	}];
        $('.viewChangePg').addClass('viewChangePg--compared');
    }
    else {
        $scope.docObj = [{
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        },
        {
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        },
        {
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        },
        {
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        },
        {
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        },
        {
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        },
        {
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        },
        {
            number: '2014.090910-05',
            status: 'Processed',
            amountChanged: '19,000.00',
            orderAmountChanged: '24,500',
            createdBy: 'William Cooper',
            role: 'Buyer',
            createdOn: '10/10/2015',
            isChecked: false,
            isDisabled: false,
            isPublished: false,
            isVisible: true
        }];

    }

    //line item popup
    $scope.lineItemPop = "p2p/order/views/popupLineItem.html";

    $scope.lineItemPopup = false;
    $scope.lineItemPopCallback = function (e) {
        $scope.lineItemPopup = true;
    };

    $scope.lineItemPopOnHideCallback = function () {
        $scope.lineItemPopup = false;
    };   

    $scope.tabsData = [
    {
        "title": "Line Details",
        "contentUrl": "p2p/order/views/itemNamePopupTabLineDetail.html",
        "active": true
    },
    {
        "title": "Accounting",
        "contentUrl": "p2p/order/views/itemNamePopupTabAccounting.html"
    },
    {
        "title": "Contract",
        "contentUrl": "p2p/order/views/itemNamePopupTabContract.html"
    },
    {
        "title": "Manufacturer",
        "contentUrl": "p2p/order/views/itemNamePopupTabManufacturer.html"
    },
    {
        "title": "Shipping",
        "contentUrl": "p2p/order/views/itemNamePopupTabShipping.html"
    },
    {
        "title": "Supplier",
        "contentUrl": "p2p/req/views/itemNamePopupTabSupplier.html"
    }
    ];
    var currentActiveTabName = $scope.tabsData[0].title;
    $scope.getActiveTab = function (e) {
        currentActiveTabName = e.title;
    }
    $scope.getScrollToMoreOption = '';
    $scope.showMoreChangesCall = function (e) {       
        $scope.closeSlideView();
        $scope.getScrollToMoreOption = angular.element(e.currentTarget).children()[0].offsetTop;
        storeService.set('getScrollToMoreOption', $scope.getScrollToMoreOption);
        $state.go('p2p.req.lineChanges', { 'tab': currentActiveTabName });
    }

    
    /*slider*/
    $scope.openPopuFlag = false;
    $scope.tempPreview = '',
    $scope.tempCurrent = '',
    $scope.tempNext = '';
    $scope.opentempPopup = function (current) {
    	angular.element('body').addClass('is-overflowHidden');
        $scope.openPopuFlag = true;
        $scope.tempPreview = current - 1,
        $scope.tempCurrent = current,
         $scope.tempNext = current + 1;

        $scope.previewFlag = true;
        $scope.openSlideModal = 'slide-view-modal--open';

        $scope.slideDataIndex = $scope.tempCurrent || 0;
        $scope.slideDataIndexTemp = {
            'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
            'second': $scope.slideDataIndex,
            'third': $scope.slideDataIndex + 1
        }
    }

    $scope.slideHide1 = false;
    $scope.slideHide2 = false;
    $scope.slideHide3 = false;

    $scope.slide1 = 'slide-prev';
    $scope.slide2 = 'slide-current';
    $scope.slide3 = 'slide-next';

    $scope.slideDataIndex = $scope.tempCurrent || 0;
    $scope.slideDataIndexTemp = {
        'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
        'second': $scope.slideDataIndex,
        'third': $scope.slideDataIndex + 1
    }

    $scope.getIndexforContent = function (index) {
        switch (index) {
            case '0':
                return slideDataIndexTemp.first;
                break;
            case '1':
                return slideDataIndexTemp.second;
                break;
            case '2':
                return slideDateIndexTemp.third;
        }

    }

    var hideCall = function () {
        if ($scope.slide1 == 'slide-prev' || $scope.slide1 == 'slide-next') {
            $scope.slideHide1 = true;
        } else { $scope.slideHide1 = false; }

        if ($scope.slide2 == 'slide-prev' || $scope.slide2 == 'slide-next') {
            $scope.slideHide2 = true;
        } else { $scope.slideHide2 = false; }

        if ($scope.slide3 == 'slide-prev' || $scope.slide3 == 'slide-next') {
            $scope.slideHide3 = true;
        } else { $scope.slideHide3 = false; }
    };
    hideCall();
    var setCurrentTitle = function () {
        $timeout(function () {
            // $scope.selectedDoc = { title: ($scope.info[$scope.slideDataIndex].title) };
        }, 500);
    };

    $scope.next = function () {
        if ($scope.slideDataIndex == ($scope.info.length - 1)) {
            return;
        }
        $scope.slideDataIndex = $scope.slideDataIndex + 1;
        // $scope.nextSlideTitle = $scope.info[$scope.slideDataIndex].title;
        $scope.selectedItems = '0';

        if (($scope.slide1 == 'slide-prev')) {
            $scope.slide1 = 'slide-next';
        } else if ($scope.slide1 == 'slide-current') {
            $scope.slide1 = 'slide-prev';
        } else {
            $scope.slide1 = 'slide-current';
            $scope.slideDataIndexTemp = {
                'first': $scope.slideDataIndex,
                'second': $scope.slideDataIndex + 1,
                'third': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1)
            }


            setCurrentTitle();
        }
        if (($scope.slide2 == 'slide-prev')) {
            $scope.slide2 = 'slide-next';
        }
        else if ($scope.slide2 == 'slide-current') {
            $scope.slide2 = 'slide-prev';
        } else {
            $scope.slide2 = 'slide-current';
            $scope.slideDataIndexTemp = {
                'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
                'second': $scope.slideDataIndex,
                'third': $scope.slideDataIndex + 1
            }
            setCurrentTitle();
        }
        if (($scope.slide3 == 'slide-prev')) {
            $scope.slide3 = 'slide-next';
        }
        else if ($scope.slide3 == 'slide-current') {
            $scope.slide3 = 'slide-prev';
        }
        else {
            $scope.slide3 = 'slide-current';
            $scope.slideDataIndexTemp = {
                'first': $scope.slideDataIndex + 1,
                'second': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
                'third': $scope.slideDataIndex
            }
            setCurrentTitle();
        }
        hideCall();
        $scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
        $scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
        $scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;
    };
    $scope.prev = function () {
        $scope.selectedItems = '0';
        if ($scope.slideDataIndex == 0) {
            return;
        }
        $scope.slideDataIndex = $scope.slideDataIndex - 1;
        //$scope.prevSlideTitle = $scope.info[$scope.slideDataIndex].title;
        if (($scope.slide1 == 'slide-prev')) {

            $scope.slide1 = 'slide-current';
            $scope.slideDataIndexTemp = {
                'first': $scope.slideDataIndex,
                'second': $scope.slideDataIndex + 1,
                'third': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1)
            }
            setCurrentTitle();
        } else if ($scope.slide1 == 'slide-current') {
            $scope.slide1 = 'slide-next';
        } else {
            $scope.slide1 = 'slide-prev';
        }
        if (($scope.slide2 == 'slide-prev')) {

            $scope.slide2 = 'slide-current';
            $scope.slideDataIndexTemp = {
                'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
                'second': $scope.slideDataIndex,
                'third': $scope.slideDataIndex + 1
            }
            setCurrentTitle();
        } else if ($scope.slide2 == 'slide-current') {
            $scope.slide2 = 'slide-next';
        } else {
            $scope.slide2 = 'slide-prev';
        }
        if (($scope.slide3 == 'slide-prev')) {

            $scope.slide3 = 'slide-current';
            $scope.slideDataIndexTemp = {
                'first': $scope.slideDataIndex + 1,
                'second': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
                'third': $scope.slideDataIndex
            }
            setCurrentTitle();
        } else if ($scope.slide3 == 'slide-current') {
            $scope.slide3 = 'slide-next';
        } else {
            $scope.slide3 = 'slide-prev';
        }
        hideCall();
        $scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
        $scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
        $scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;
    };

    $scope.closeSlideView = function () {
        //angular.element('body').css('overflow', '');
    	angular.element('body').removeClass('is-overflowHidden');
    	$scope.openSlideModal = '';
        $scope.openPopuFlag = false;
    }

    /*item popup*/
    function lineItemsCallback() {
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


        $scope.setAllStatus = { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' }
        $scope.setCurrentItemStatus = { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' }

        $scope.setAllList = function (index) {

            var statusCount = $scope.statusConfig[index];


            $scope.setAllStatus.statusId = statusCount.statusId;
            $scope.setAllStatus.name = statusCount.name;
            $scope.setAllStatus.statusSummary = statusCount.statusSummary;
            $scope.setAllStatus.statusIcon = statusCount.statusIcon;
            for (var i = 0; i < $scope.lineItems.length; i++) {
                var setInList = $scope.lineItems[i].status;
                setInList.statusId = statusCount.statusId;
                setInList.name = statusCount.name;
                setInList.statusSummary = statusCount.statusSummary;
                setInList.statusIcon = statusCount.statusIcon;
            }
        };

        $scope.setStatus = function (index, parentIndex) {

            var currentListItem = $scope.lineItems[parentIndex].status;
            var statusCount = $scope.statusConfig[index];
            currentListItem.statusId = statusCount.statusId;
            currentListItem.name = statusCount.name;
            currentListItem.statusSummary = statusCount.statusSummary;
            currentListItem.statusIcon = statusCount.statusIcon;
        }

        $scope.setCurrentStatus = function (index) {

            var statusCount = $scope.statusConfig[index];


            $scope.setCurrentItemStatus.statusId = statusCount.statusId;
            $scope.setCurrentItemStatus.name = statusCount.name;
            $scope.setCurrentItemStatus.statusSummary = statusCount.statusSummary;
            $scope.setCurrentItemStatus.statusIcon = statusCount.statusIcon;

        }

        $scope.statusConfig = [
          { 'statusId': '1', 'name': 'ACCEPT', 'statusSummary': 'The item is accepted.', 'statusIcon': 'stsCir--approved' },
            { 'statusId': '2', 'name': 'REJECT', 'statusSummary': 'The changes of item are rejected in change order.', 'statusIcon': 'stsCir--rejected' },
            { 'statusId': '3', 'name': 'NEED TO MODIFY', 'statusSummary': 'Item is marked for modification in change order.', 'statusIcon': 'stsCir--modified' },
            { 'statusId': '4', 'name': 'CANCEL', 'statusSummary': 'Item is marked for cancellation in change order.', 'statusIcon': 'stsCir--cancelled' }
        ];

        $scope.selectAllLineList = false;

        $scope.onSelAllLineListChange = function () {
            for (var i = 0; i < $scope.lineItems.length; i++) {
                $scope.lineItems[i].select = $scope.selectAllLineList;
            }
        };
        function selecteAllcheck() {
            var flag = true;
            for (var i = 0; i < $scope.lineItems.length; i++) {
                if ($scope.lineItems[i].select == false) {
                    flag = false;
                    break;
                }
            }
            $scope.selectAllLineList = flag;
        }

        $scope.changeItemSelect = function (currentSelectStatus) {
            selecteAllcheck();
        };

        $scope.closePopOver = function () {
            angular.element(document).triggerHandler('click');
        }
    }

    if ($state.params.view == 'compare') {
        $scope.docObj[0].isChecked = true;
        $scope.docObj[1].isChecked = true;
        angular.forEach($scope.docObj, function (value, key) {
            if (value.isChecked == true) {
                value.isDisabled = true;

            } else {
                value.isVisible = false;
            }
        });
        $scope.hideFooter = true;
        $scope.isCompared = true

    }
}