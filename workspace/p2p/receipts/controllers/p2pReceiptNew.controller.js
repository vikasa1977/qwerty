angular.module('SMART2')

    .controller('p2pReceiptNewCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', 'shareWithCtrl', 'lookup', '$filter', p2pReceiptNewCtrlFunc])
	.controller('itemDetailReceiptCtrl', ['$scope', '$state', 'notification', itemDetailReceiptCtrlFunc])
    .controller('receiptAdditionalInfoCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$window', '$state', '$timeout', '$sce', receiptAdditionalInfoCtrlFunc])
.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
          '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
});

function p2pReceiptNewCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, shareWithCtrl, lookup, $filter) {
    var priStatus = $state.params.status,
    secStatus = $state.params.secStatus,
    mode = $state.params.mode,
    section = $state.params.section;
    $scope.primaryStatus = priStatus;
    $scope.secondaryStatus = secStatus;
    var temp = true;
    if (priStatus && !secStatus) {
        $scope.pageStatus = priStatus;
        $scope.btnStatusVal = "";
    }
    else if (!priStatus && secStatus) {
        $scope.pageStatus = secStatus;
        $scope.btnStatusVal = "";
    }
    else if (priStatus && secStatus) {
        $scope.pageStatus = priStatus;
        $scope.btnStatusVal = secStatus;
    }
    else {
        $scope.pageStatus = "Draft";
        $scope.btnStatusVal = "";
    }

    $scope.changeStatusCall = function(){
        if (temp) {
            $scope.pageStatus = secStatus;
            $scope.btnStatusVal = priStatus;
            temp = !temp;
        }
        else {
            $scope.pageStatus = priStatus;
            $scope.btnStatusVal = secStatus;
            temp = !temp;
        }
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
    /*section search content start*/
    $scope.sectionAndFieldsDetails = [{ 'name': 'Section One', 'contentIn': '' },
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
    /*section search content end*/

    $scope.showPreview = function () {      
		$state.go('p2p.req.preview');
	}
	$scope.topValueSectionTrack = 115;
	$scope.submitReq = function () {
		var confi = {
			type: "error",
			message: "<p class='left-align'>Are you sure?</p>",

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
			//	$state.go('p2p.req.empty');
			} else {
				return;
			}
		});
	}
	var isSequenceToBeMaintained;

	/*
	 *  Service call get form-config and data-model
	 */

	var req = {
		method: 'GET',
		url: 'p2p/receipts/models/createReceipt.json'
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

	$http(req).then(function (response) {

		$scope.dataModel = response.data.dataModel;
		$scope.config = response.data.formConfig;

		if (mode == "changeInReceipt" && section == "lineDetail") {
		    angular.forEach($scope.config.sections, function (item) {
		        item.isActive = false;

		        if (item.label == "LINES DETAILS") {
		            item.isActive = true;
		        }
		    });
		}

		$scope.$watch('dataModel', function (n, o) {
			
		}, true);
	}, function(error) {
		console.log(JSON.stringify(error));
	});

	$scope.validateForm = function () {
		RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
		RuleEngine.execute(function (e) {
			console.log(e);
			// if() {
			// }
		});
	};
	$scope.orderDetailsPopupUrl = "p2p/receipts/views/popupOrderDetails.html";

    $scope.orderDetailsPopup = false;
    $scope.orderDetailsPopupCallback = function (e) {
        setActive($scope.indexToShow);
        $scope.orderDetailsPopup = true;
    };
    $scope.hideOrderDetailsPopupCallback = function (e) {
        $scope.orderDetailsPopup = false;
    };
    $scope.indexToShow = 0;
    //$scope.selectedPO = $scope.modelData.mSelectedOrder[$scope.indexToShow];
    $scope.selectedPO = {
        OrderDetails: []
    };
    function setActive(index) {
        var item;
        $scope.indexToShow = index;
        item = $scope.modelData.mSelectedOrder[index];
        //"orderId", "OrderNumber", "OrderName", "OrderDetails", "value", "$$hashKey", "ischecked", "counterProp1"
        if (item) {
            $scope.selectedPO.OrderDetails = [];
        };
        $timeout(function () {
            if (item) {
                $scope.selectedPO.orderId = item.orderId;
                $scope.selectedPO.OrderNumber = item.OrderNumber;
                $scope.selectedPO.OrderName = item.OrderName;
                $scope.selectedPO.OrderDetails = item.OrderDetails;
                $scope.selectedPO.value = item.value;
                $scope.selectedPO.ischecked = item.ischecked;
                $scope.selectedPO.counterProp1 = item.counterProp1;
                $scope.totalChecked = $filter('filter')($scope.selectedPO.OrderDetails, { checked: true }).length;
            };
        });
    }

    $scope.selectedItem = function (index) {
        setActive(index);
    };

    //$scope.selectPlantModel = { "name": "Delhi (North) - India" };
    //$scope.selectPlantOption = { "name": "Delhi (North) - India" };
    $scope.orderReadOnlyPopupUrl = "p2p/receipts/views/popupOrderReadOnly.html";
    $scope.orderReadOnlyPopup = false;
    $scope.orderReadOnlyPopupCallback = function (e) {

        $scope.orderReadOnlyPopup = true;
    };
    $scope.hideOrderReadOnlyPopupCallback = function (e) {
        $scope.orderReadOnlyPopup = false;
    };

    $scope.deleteCurrentOrder = function (current) {
        $scope.orderDetailsPopup = false;
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item ''" + $scope.selectedPO.OrderNumber + "''</p>";
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
                $scope.modelData.mSelectedOrder.splice(current, 1);
                $scope.modelData.mSelectedOrder = angular.copy($scope.modelData.mSelectedOrder);

                Materialize.toast('Order deleted successfully', 2000);
                $scope.orderDetailsPopup = true;
                setActive(0);

            }
            else {
                $scope.orderDetailsPopup = true;
            }
        });
    }

    $scope.textRules = [{
        "rule": "!(/[a-z0-9._%+-/]$/.test(this))",
        "error": " "

    }];
    $scope.orderList = {
        'checked': false,
        'LineNo': '',
        'Description': '',
        'ItemNo': '',
        'SupplierItemNo': '',

        'UnitPrice': '',
        'Quantity': '',
        
        'Charges': '',
        'ShippingCharges': '',
        'OtherCharges': '',
    };

    $scope.addCurrentOrder = function (current) {
        if ($scope.orderList.LineNo != '' && $scope.orderList.Description != '' && $scope.orderList.ItemNo != '' && $scope.orderList.SupplierItemNo != '' && $scope.orderList.UnitPrice != '' && $scope.orderList.Quantity != '' && $scope.orderList.ShippingCharges != '' && $scope.orderList.Charges != '' && $scope.orderList.OtherCharges != '') {
            $scope.modelData.mSelectedOrder[current].OrderDetails.push(angular.copy($scope.orderList));
            $scope.orderList.LineNo = '';
            $scope.orderList.Description = '';
            $scope.orderList.ItemNo = '';

            $scope.orderList.SupplierItemNo = '';
            $scope.orderList.UnitPrice = '';
            $scope.orderList.Quantity = '';
            $scope.orderList.Taxes = '';
            $scope.orderList.Charges = '';
        }
    }

    $scope.addOrderLookupCallback = function (e) {
        $scope.orderDetailsPopup = false;
        orderLookup(e);
    }

    var orderLookup = function (e) {
        $scope.chkBoxObj =
                {
                    filledPartial: false,
                    checkedAll: false
                };
        $scope.filledPartial = false;
        $scope.checkedAll = false;
        var checkCount = 0;
        $scope.checkedAllTemp = function () {

            for (var item = 0; item < $scope.selectedPO.OrderDetails.length; item++) {
                if ($scope.chkBoxObj.checkedAll)
                    $scope.selectedPO.OrderDetails[item].checked = true;
                else
                    $scope.selectedPO.OrderDetails[item].checked = false;
            }
        }

    };

    function fnTotalChecked(items) {
        $scope.totalChecked = $filter('filter')(items, { checked: true }).length;
    }
    
    $scope.onChangePOItem = function (items) {
        fnTotalChecked(items)
    }

    $scope.onChangeCheckAll = function (items) {
        fnTotalChecked(items)
    }

    

    /* POPUP Order DETails end */


    $scope.singlePOInvoice = true;
    $scope.invoiceTypeChange = function (selectedInvoiceType, modelData) {
        //var confi = {
        //    type: "confirm",
        //    message: "<p class='left-align'>Are you sure you want change invoice type?</p>",

        //    buttons: [
        //		{
        //		    "title": "YES",
        //		    "result": "yes"
        //		},
        //		{
        //		    "title": "No",
        //		    "result": "no"
        //		}
        //    ]
        //};

        //Notification call
        //notification.notify(confi, function (responce) {
        //if (responce.result == "yes") {
        if (selectedInvoiceType) {
            $scope.singlePOInvoice = false;
            modelData.selectedInvoiceType = {
                "name": "Multi PO invoice",
                "invoiceType": "Multi"
            };
            //modelData.selectedInvoiceType.name = "Multi PO invoice";
            //modelData.selectedInvoiceType.invoiceType = "Multi";
        }
        else {
            $scope.singlePOInvoice = true;
            modelData.selectedInvoiceType = {
                "name": "Single PO invoice",
                "invoiceType": "Single"
            };
            //modelData.selectedInvoiceType.name = "Single PO invoice";
            //modelData.selectedInvoiceType.invoiceType = "Single";
        };
        shareWithCtrl.data.value = modelData.selectedInvoiceType;
        /*} else {
            if (selectedInvoiceType.name == "Multi PO invoice") {
                modelData.selectedInvoiceType = {
                    "name": "Single PO invoice",
                    "invoiceType": "Single"
                };
            }
            else {
                modelData.selectedInvoiceType = {
                    "name": "Multi PO invoice",
                    "invoiceType": "Multi"
                };
            }
            return;
        };*/
        //});

    };
	/* 
  HEADER SEARCH INTRACTION
  NEED TO CHANGE ITS WORKING
*/
	$scope.showSearchHeader = function () {
		//$scope.mysearchHeight = { width: '1000px' };
		this.isActiveHeader = true;
		this.focusSearchHeader = true;
		this.hideCloseHeader = true;
	}
	$scope.hideSearchHeader = function () {
		//$scope.mysearchHeight = { width: '100%' };
		this.isActiveHeader = false;
		this.focusSearchHeader = false;
		this.hideCloseHeader = false;
	}

    /**** 
                template Content
   ****/
	var getRespond = {
	    method: 'GET',
	    url: 'p2p/req/models/tempateData.json'
	};

	$scope.setTemplateData = [];



	$http(getRespond).then(function (response) {
	    $scope.setTemplateData = response.data;
	}, function (error) {
	    console.log(JSON.stringify(error));
	});

	
	


	$scope.getItemNum = [];

    /*showing footer on checkbox true*/

	$scope.checkboxIsTrue = false;
	var listCount = [];

	$scope.useSelectedTemplatefunc = function (ele) {

	    if (ele == true) {
	        $scope.checkboxIsTrue = true;
	        listCount.push('0');

	    } else {
	        listCount.pop();
	        if (listCount.length == 0) {
	            $scope.checkboxIsTrue = false;

	        }
	    }

	}

	$scope.goToPage = function () {
	    $state.go(templateLink);
	}

	$scope.getTemplateIndex = function (index) {
	    var checkindex = index + 1;
	    if (checkindex == 1) {
	        return $scope.slideDataIndexTemp.first
	    }
	    else if (checkindex == 2) {
	        return $scope.slideDataIndexTemp.second
	    }
	    else if (checkindex == 3) {
	        return $scope.slideDataIndexTemp.third
	    }

	}
    /* poup command*/
	$scope.userthisTemplate = function (e) {
	    $state.go(templateLink);
	    $scope.tempPopup = false;
	}

	$scope.isActive = false;
	$scope.showMe = false;
	$scope.hideClose = false;
	$scope.showSearch = function () {
	    $scope.isActive = true;
	    $scope.showMe = true;
	    $scope.hideClose = true;
	};

	$scope.hideSearch = function () {
	    $scope.isActive = false;
	    $scope.hideClose = false;

	};

	$scope.selectedItems = 6;
	$scope.addItem = function (elem, index) {
	    var itemallSelect = $scope.setTemplateData[index].isCheckedAll;
	    if (elem == true) {

	        $scope.selectedItems = ($scope.selectedItems + 1);

	    } else {

	        $scope.setTemplateData[index].isCheckedAll = false;
	        $scope.selectedItems = ($scope.selectedItems - 1);
	    }

	};

    /*slider*/
	$scope.openPopuFlag = false;
	$scope.tempPreview = '',
   $scope.tempCurrent = '',
        $scope.tempNext = '';

	$scope.$on('showTemplate', function (event, args) {
	   /*  var getValuefromChild = args.showTemp;
	     if ( 0 >= getValuefromChild) {
	         return false;
	     } else {
	         $scope.opentempPopup(getValuefromChild);
	     }  commented due to some issue.*/
	});

	$scope.opentempPopup = function (current) {
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



	$scope.info = $scope.setTemplateData;




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

    /* MODIFY RFX SETTINGS POPUP */
	$scope.showModifyRFXPopup = false;
	$scope.onPopupHide = function () {
	    $scope.showModifyRFXPopup = false;
	};
    /* MODIFY RFX SETTINGS POPUP ENDS */

	$scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
	$scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
	$scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;
/*
	$scope.showPreview = function () {
	    angular.element('body').css('overflow', 'hidden');
	    $scope.openPopuFlag = true;
	    $scope.openSlideModal = 'slide-view-modal--open';
	};
    */
	$scope.closeSlideView = function () {
	    angular.element('body').css('overflow', '');
	    $scope.openSlideModal = '';
	    $scope.openPopuFlag = false;
	}



	$scope.selectAllTemple = function (selectedTemplateallitem, index) {

	    var tempAttr = $scope.setTemplateData[index].tempAttr;
	    if (selectedTemplateallitem != true) {

	        for (var i = 0; i < tempAttr.length; i++) {
	            tempAttr[i].isChecked = false;
	        }
	    } else {

	        for (var i = 0; i < tempAttr.length; i++) {
	            tempAttr[i].isChecked = true;
	        }
	    }

	};
	

    /********/
    // popup -- trackstatus
	$scope.trackStatusPopupUrl = "shared/popup/views/popupNewTrackStatus.html";
	$scope.trackStatusPopup = false;
	$scope.trackStatusPopupCallback = function (e) {
	    $scope.trackStatusPopup = true;
	};
	$scope.trackStatusOnHideCallback = function (e) {
	    $scope.trackStatusPopup = false;
	};


	$scope.isFinalize = false;
	$scope.finalizeCallback = function () {
	    $scope.isFinalize = true;
	}

	$scope.createReturnNote = function () {
	    $state.go('p2p.rnote.new')
	}

	$scope.createReceiptCorrection = function () {
	    $state.go('p2p.rnote.new', { mode: 'createReceiptCorrection' })
	}
}

function itemDetailReceiptCtrlFunc($scope, $state, notification) {
    var mode = $state.params.mode;
    $scope.mode = mode;
    // POPUP -- apply to all 
    $scope.applyToAllUrl = "shared/popup/views/popupLinesBulkEditReciept.html";

    $scope.applyToAllPopUp = false;
    $scope.applyToAllPopUpCallback = function (e) {
        $scope.applyToAllPopUp = true;
    };
    $scope.applyToAllPopUpClose = function (e) {
        $scope.applyToAllPopUp = false;
    };

   
    
    $scope.itemList = [{ 'lable': 'Description 1' }, { 'lable': 'Description 2' }, { 'lable': 'Description 3' }, { 'lable': 'Description 4' }, { 'lable': 'Description 5' }, { 'lable': 'Description 6' }, { 'lable': 'Description 7' }, { 'lable': 'Description 8' }, { 'lable': 'Description 9' }, { 'lable': 'Description 10' }];

   
    /********/
    /*current for tax poup start*/

    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function (e) {
        $scope.showTaxesPopup = true;
    };
    $scope.taxesPopUpOnHideCallback = function () {
        $scope.showTaxesPopup = false;
    };


    $scope.taxList = {
        'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [
            { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false },
            { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false },
            { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false },
            { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description', 'taxRate': '5', 'showEdithCurrentPanel': false }
        ];

    $scope.addCurrent = function () {

        if ($scope.taxList.taxCode != '') {

            $scope.taxesDetailLists.push($scope.taxList);

            $scope.taxList = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };

        }

    }

    $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };

    $scope.taxfocus = false;

    $scope.delCurrent = function (current) {
        var confi = {
            type: "warning",
            message: "<p class='left-align'>Are you Sure for Delete Current Item </p>",
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

        var confi_2 = {
            type: "success",
            message: "<p class='left-align'>Item deleted Successfully </p>",
            buttons: [
            {
                "title": "Ok",
            }
            ]
        };

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                notification.notify(confi_2, function (response) {
                });
            }
        });
    };




    $scope.editCurrent = function (current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        $scope.updatedCurrentTax.taxCode = getcurrentTaxValue.taxCode;
        $scope.updatedCurrentTax.taxDetail = getcurrentTaxValue.taxDetail;
        $scope.updatedCurrentTax.taxRate = getcurrentTaxValue.taxRate;


    };

    $scope.updatedEdited = function (current) {
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        if ($scope.updatedCurrentTax.taxCode != '') {
            getcurrentTaxValue.taxCode = $scope.updatedCurrentTax.taxCode;
            getcurrentTaxValue.taxDetail = $scope.updatedCurrentTax.taxDetail;
            getcurrentTaxValue.taxRate = $scope.updatedCurrentTax.taxRate;
            $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
            $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
        }
    };


    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
    }


    /*current for tax poup end*/

    $scope.selectedtemplate = function (current) {
        $scope.$emit('showTemplate', { showTemp : current });
    }

	$scope.ngModel = $scope.ngModel.data;

	$scope.itemDetailReqMaterialTabDataset = [
		{ "title": "LINES", "contentUrl": "p2p/receipts/views/itemDetail-mat-linesTab.html", "active": true },
		//{ "title": "Accounting", "contentUrl": "p2p/receipts/views/itemDetail-mat-accTab.html" }
        { "title": "ASSET MANAGEMENT", "contentUrl": "p2p/receipts/views/itemDetail-mat-assetTab.html" }
	];

	$scope.importLineItemsTabDataset = [
		{ "title": "Requisition", "contentUrl": "p2p/req/views/importLineItemsReqTab.html", "active": true },
		{ "title": "Templates", "contentUrl": "p2p/req/views/importLineItemsTemplTab.html" }
	];


	/*
	$scope.onChange = function (isChecked) {
	    if (isChecked == true) {
	       
	    }
	    else {

	    }
	};
    */

	$scope.isTemplateSelected = [];
	$scope.templateLists =
        [{ 'title': 'TEMPLATE 1', 'isChecked': false },
            { 'title': 'TEMPLATE 2', 'isChecked': false },
            { 'title': 'TEMPLATE 3', 'isChecked': false }
       ];


	$scope.taxesPopupUrl = "p2p/shared/views/taxesPopup.html";
	$scope.categoryPopupUrl = "p2p/req/views/categoryPopup.html";
	$scope.commentsPopupUrl = "p2p/req/views/commentsPopup.html";
	$scope.copyPopupUrl = "p2p/req/views/copyLineDetailsPopup.html";
	$scope.attachmentPopUpUrl = "p2p/req/views/attachmentPopup.html";
	$scope.approverPopupUrl = "shared/popup/views/popupApprover.html";
	$scope.shipToPopupUrl = "p2p/req/views/shipToPopup.html";

	$scope.showTaxesPopup = false;
	$scope.showTaxesPopupCallback = function (e) {
	    $scope.showTaxesPopup = true;
	};
	$scope.taxesPopUpOnHideCallback = function () {
		$scope.showTaxesPopup = false;
	};

	
	$scope.showCategoryPopup = false;
	$scope.showCategoryPopupCallback = function (e) {
		$scope.showCategoryPopup = true;
	};
	$scope.categoryPopUpOnHideCallback = function () {
		$scope.showCategoryPopup = false;
	};

	$scope.showCommentsPopup = false;
	$scope.attPopUp = false;
	$scope.showCommentsPopupCallback = function (e) {
	    $scope.showCommentsPopup = true;
	};
	$scope.commentsPopUpOnHideCallback = function (e) {
	    $scope.showCommentsPopup = false;
	};

	
	$scope.attachmentPopUp = function (e) {
	    $scope.attPopUp = true;
	};
	$scope.attachmentPopUpClose = function (e) {
	    $scope.attPopUp = false;
	    $scope.attPopUp = false;
	    $scope.showCommentsPopup = true;
	};

	$scope.showCopyPopup = false;
	$scope.showCopyPopupCallback = function (e) {
		$scope.showCopyPopup = true;
	};
	$scope.copyPopupOnHideCallback = function (e) {
		$scope.showCopyPopup = false;
	};

	$scope.showLocationPopup = false;
	$scope.showLocationPopupFn = function () {
		$scope.showLocationPopup = true;
	};
	$scope.showLocationPopupClBack = function () {
		$scope.showLocationPopup = false;
	};

	$scope.$watch('ngModel.selectedOption.key', function (newVal) { });

	//Approver Popup

	$scope.approverPopup = false;
	$scope.approverPopupCallback = function (e) {
		$scope.approverPopup = true;
	};
	$scope.approverOnHideCallback = function () {
		$scope.approverPopup = false;
	};

	$scope.addApprovers = [
       { name: 'John', "selected": false },
	   { name: 'Jessie' },
	   { name: 'Johanna' },
	   { name: 'Joy', "selected": false },
	   { name: 'Mary' },
	   { name: 'Peter' },
	   { name: 'Sebastian', },
	   { name: 'Erika' },
	   { name: 'Patrick' },
	   { name: 'Samantha' }
	];

	$scope.approvers = [
	   { name: 'John'},
	   { name: 'Jessie'},
	   { name: 'Johanna'},
	   { name: 'Joy'},
	   { name: 'Mary'},
	   { name: 'Peter'},
	   { name: 'Sebastian', },
	   { name: 'Erika'},
	   { name: 'Patrick'},
	   { name: 'Samantha'}
	];
	$scope.shwMore = false;
	$scope.WrapHeight = '130px';

	$scope.collapsUser = function () {
		$scope.shwMore = !$scope.shwMore;
		$scope.WrapHeight = '300px';
	}
	$scope.selectedAll = false;
	$scope.checkAll1 = function ($event) {
		$scope.selectedAll = !$scope.selectedAll;
		angular.forEach($scope.approvers, function (item) {
			item.selected = $scope.selectedAll;
		});
		$event.preventDefault();
	};
	$scope.contractExpiry = new Date();
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

	$scope.treeSearchModel = "";
	$scope.stateBasedTitle = "ADD CATEGORY";

	$scope.manufatureDetails = "p2p/req/views/popupManufacturerDetails.html";
	$scope.manufatureDetailsPopup = false;
	$scope.manufatureDetailsCallback = function (e) {
	    $scope.manufatureDetailsPopup = true;
	};
	$scope.manufatureDetailsPopupHideCallback = function (e) {
	    $scope.manufatureDetailsPopup = false;
	};
    
    //express list grid Data

	$scope.expressLists = [
        { itemNumber: 'dell', name:'-', actionIconDelete: true },
        { itemNumber: 'Sumsung', name: '-', actionIconDelete: true },
        { itemNumber: 'Lenovo', name: '-', actionIconDelete: true },
        { itemNumber: 'Sumsung', name: '-', actionIconDelete: true },
        { itemNumber: 'dell', name: '-', actionIconDelete: true },
        { itemNumber: 'Lenovo', name: '-', actionIconDelete: true },
        { itemNumber: 'Sumsung', name: '-', actionIconDelete: true, actionIconAdd: true }
	];

    // express list grid Data -- remove the row specified in index
	$scope.removeRow = function (index) {
	    // remove the row specified in index
	    $scope.expressLists.splice(index, 1);
	    // if no rows left in the array create a blank array
	    if ($scope.expressLists.length === 0) {
	        $scope.expressLists = [];
	    }

		// remove the row specified in index
	    $scope.splitList.splice(index, 1);
		// if no rows left in the array create a blank array
	    if ($scope.splitList.length === 0) {
	    	$scope.splitList = [];
	    }
	};

    //add a row in the array
	$scope.addRow = function () {
	    $scope.expressLists[$scope.expressLists.length - 1].actionIconAdd = false;
	    $scope.expressLists.push({ itemNumber: 'Lenovo', actionIconAdd: true });

	    var count = $scope.splitList.length + 1;
	    $scope.splitList.push({ splitNumber: count, splitValue: '00', actionIconDelete: true });
	};


	$scope.splitPopupUrl = "p2p/req/views/popupSplit.html";
	$scope.splitPopupPopup = false;
	$scope.splitPopupCallback = function (e) {
		$scope.splitPopupPopup = true;
	};
	$scope.splitPopupPopupHideCallback = function (e) {
		$scope.splitPopupPopup = false;
	};
	$scope.splitList = [
        { splitNumber: '1', splitValue: '20', actionIconDelete: true },
        { splitNumber: '2', splitValue: '20', actionIconDelete: true },
        { splitNumber: '3', splitValue: '20', actionIconDelete: true },
        { splitNumber: '4', splitValue: '20', actionIconDelete: true },
        { splitNumber: '5', splitValue: '20', actionIconDelete: true}
	];
	$scope.splitType = [{ title: 'Number' }, { title: 'Percentage' }];
	$scope.selectedSplit = { title: 'Number' };
	$scope.splitFlag = true;
	$scope.onChangeSplit = function (selectedSplit) {
		if (selectedSplit.title == 'Number') {
			$scope.splitFlag = true;
		}
		else if(selectedSplit.title == 'Percentage') {
			$scope.splitFlag = false;
		}
		}
    //translate
	//$scope.okBtnConfig = { title: $translate.instant("OK") };
	//$scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };
	//$scope.compareBtnConfig = { title: $translate.instant("COMPARE") };
	//$scope.applyBtnConfig = { title: $translate.instant("APPLY") };
	//$scope.addBtnConfig = { title: $translate.instant("ADD") };
	//$scope.createReqBtnConfig = { title: $translate.instant("CREATE REQUISITION") };
	//$scope.createOrderBtnConfig = { title: $translate.instant("CREATE ORDER") };
	//$scope.addToCartBtnConfig = { title: $translate.instant("ADD TO CART") };
	//$scope.contitueShoppingBtnConfig = { title: $translate.instant("CONTINUE SHOPPING") };

	$scope.gridOptionsAccounting = {
		"data": [{
			"isTaxExempt": false,
			"status": 1,
			"splitType": 0,
			"id": 21559,
			"lineNumber": 11,
			"documentCode": 21193,
			"p2PLineItemId": 202239,
			"catalogItemId": 42,
			"taxes": 0,
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
			"buyerItemNumber": "BIN-000023",
			"description": "dfg",
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
				"buyerItemNumber": "BIN-000023",
				"description": "dfg",
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
		}, {
			"isTaxExempt": false,
			"status": 1,
			"splitType": 0,
			"id": 21560,
			"lineNumber": 2,
			"documentCode": 21193,
			"p2PLineItemId": 202240,
			"catalogItemId": 41,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 234,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": 0,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-22T08:38:51.107Z",
			"lastModifiedOn": "2016-04-26T03:22:41.207Z",
			"contractExpiryDate": "2015-01-16T18:30:00.000Z",
			"name": "Dell Laptop",
			"imageURL": null,
			"buyerItemNumber": "BIN-000001",
			"description": "Dell Laptop",
			"manufacturer": null,
			"contractNumber": "2015.000009",
			"partnerItemNumber": "sdf",
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
				"id": 2597,
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
				"id": 23576,
				"documentCode": 21193,
				"documentItemId": 21560,
				"quantity": 1,
				"createdOn": "2016-04-22T08:38:54.167Z",
				"lastModifiedOn": "2016-04-22T08:38:54.167Z",
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
				"lineId": 21560,
				"lineNumber": 2,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "BIN-000001",
				"description": "Dell Laptop",
				"splitType": 0,
				"itemQuantity": 1,
				"unitPrice": 234,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KL"
			}],
			"$$hashKey": "uiGrid-0014"
		}, {
			"isTaxExempt": false,
			"status": 0,
			"splitType": 0,
			"id": 21571,
			"lineNumber": 3,
			"documentCode": 21193,
			"p2PLineItemId": 202253,
			"catalogItemId": 0,
			"taxes": 0,
			"quantity": 1,
			"unitPrice": 111,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": null,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-26T03:19:48.983Z",
			"lastModifiedOn": "2016-04-26T03:21:01.790Z",
			"contractExpiryDate": null,
			"name": "1",
			"imageURL": null,
			"buyerItemNumber": "1",
			"description": "1",
			"manufacturer": null,
			"contractNumber": null,
			"partnerItemNumber": null,
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
				"id": 1,
				"name": "P2P_REQ_Manual"
			},
			"partner": {
				"id": 6347,
				"name": "OFFICEMAX NORTH AMERICA INC   "
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
				"id": 2607,
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
			"requestedDate": "2016-04-25T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": null,
			"deliverTo": null,
			"partnerCode": "00703",
			"splits": [{
				"id": 23587,
				"documentCode": 21193,
				"documentItemId": 21571,
				"quantity": 1,
				"createdOn": "2016-04-26T03:19:51.777Z",
				"lastModifiedOn": "2016-04-26T03:19:51.777Z",
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
				"lineId": 21571,
				"lineNumber": 3,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "1",
				"description": "1",
				"splitType": 0,
				"itemQuantity": 1,
				"unitPrice": 111,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KN"
			}],
			"$$hashKey": "uiGrid-0016"
		}, {
			"isTaxExempt": false,
			"status": 0,
			"splitType": 0,
			"id": 21572,
			"lineNumber": 4,
			"documentCode": 21193,
			"p2PLineItemId": 202254,
			"catalogItemId": 0,
			"taxes": 0,
			"quantity": 10,
			"unitPrice": 100,
			"otherCharges": 0,
			"shippingCharges": 0,
			"contractValue": null,
			"endDate": null,
			"startDate": null,
			"createdOn": "2016-04-26T03:21:21.390Z",
			"lastModifiedOn": "2016-04-26T03:22:08.147Z",
			"contractExpiryDate": null,
			"name": "11",
			"imageURL": null,
			"buyerItemNumber": "11",
			"description": "11",
			"manufacturer": null,
			"contractNumber": null,
			"partnerItemNumber": "456",
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
				"id": 1,
				"name": "P2P_REQ_Manual"
			},
			"partner": {
				"id": 6348,
				"name": "RUUD LIGHTING INC             "
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
				"id": 2608,
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
			"requestedDate": "2016-04-25T18:30:00.000Z",
			"shippingMethod": "Best Available",
			"shipTo": {
				"id": 1,
				"name": "Mumbai",
				"address": "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, Pennsylvania, United States, 400708."
			},
			"inventoryType": null,
			"deliverTo": null,
			"partnerCode": "09282",
			"splits": [{
				"id": 23588,
				"documentCode": 21193,
				"documentItemId": 21572,
				"quantity": 10,
				"createdOn": "2016-04-26T03:21:24.260Z",
				"lastModifiedOn": "2016-04-26T03:21:56.773Z",
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
				"lineId": 21572,
				"lineNumber": 4,
				"type": {
					"id": 1,
					"name": "P2P_REQ_Material",
					"key": "Material"
				},
				"buyerItemNumber": "11",
				"description": "11",
				"splitType": 0,
				"itemQuantity": 10,
				"unitPrice": 100,
				"shippingCharges": 0,
				"taxes": 0,
				"otherCharges": 0,
				"$$treeLevel": 0,
				"splitNumber": "Split 1",
				"$$hashKey": "uiGrid-00KP"
			}],
			"$$hashKey": "uiGrid-0018"
		}],
		"enableFiltering": true,
		"enablePinning": false,
		"enableCellEditOnFocus": true,
		"showTreeExpandNoChildren": true,
		"rowHeight": 30,
		"columnDefs": [{
			"field": "lineNumber",
			"width": 150,
			"displayName": "Line Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "lineNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"field": "buyerItemNumber",
			"width": 150,
			"displayName": "Item Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "buyerItemNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		}, {
			"field": "description",
			"width": 150,
			"displayName": "Description",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"name": "description",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "string"
		}, {
			"field": "splitType",
			"width": 150,
			"displayName": "Split",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"pinnedLeft": true,
			"enableFiltering": true,
//			"cellTemplate": "<div title=\"{{COL_FIELD}}\" ng-click=\"grid.appScope.showSplitsPopup(row.entity)\"><a class=\"dropdown-button\">{{grid.appScope.splitType(row.entity.splitType)}}</a></div>",
			"cellTemplate": "<smart-button config=\"{'title':'Splits','allignRight':'false'}\" flat='true'></smart-button>",
			"cellTooltip": true,
			"name": "splitType",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"field": "splitNumber",
			"width": 150,
			"displayName": "Split Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTooltip": true,
			"name": "splitNumber",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"field": "quantity",
			"width": 150,
			"displayName": "Quantity",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTooltip": true,
			"name": "quantity",
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"name": "splitValue",
			"width": 150,
			"displayName": "Split Value",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{COL_FIELD}}\">{{grid.appScope.getSplitValue(row.entity)}}</div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"name": "taxes",
			"width": 150,
			"displayName": "Taxes",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{COL_FIELD}}\"><smart-button flat=\"true\" config='{\"title\":row.entity.taxes}' callback-params=\"row.entity\"} callback=\"grid.appScope.openTaxPopup\"></smart-button><div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "number"
		}, {
			"name": "total",
			"width": 150,
			"displayName": "Total Split Value",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableCellEdit": false,
			"enableFiltering": false,
			"cellTemplate": "<div title=\"{{grid.appScope.getTotal(row.entity)}}\">{{grid.appScope.getTotal(row.entity)}}</div>",
			"cellTooltip": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Requester",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={name} filterkeys=name options=\"grid.appScope.undefined\" on-change=\"grid.appScope.undefined\" on-select=\"grid.appScope.undefined\" ng-model=\"row.entity.requester\" uigrid-compatible></smart-textfield></div></div>",
			"name": "requester.name",
			"serverConfig": {
				"label": "P2P_REQ_Requester",
				"type": "textfield",
				"sort": 1,
				"isMandatory": true,
				"data": "requester",
				"colspan": 1,
				"attributes": {
					"readonly": true,
					"filterkeys": ["name"],
					"optionformat": "{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Department",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 10)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.department)\" ng-model=\"row.entity.department\" uigrid-compatible></smart-textfield></div></div>",
			"name": "department.name",
			"serverConfig": {
				"label": "P2P_REQ_Department",
				"type": "textfield",
				"sort": 2,
				"isMandatory": true,
				"data": "department",
				"onSelect": "onSelectDelValueAttr(row.entity.department)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 10)",
				"attributes": {
					"readonly": true,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Business Unit",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 7)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.bu)\" ng-model=\"row.entity.bu\" uigrid-compatible></smart-textfield></div></div>",
			"name": "bu.name",
			"serverConfig": {
				"label": "P2P_Req_BU",
				"type": "textfield",
				"sort": 3,
				"isMandatory": false,
				"data": "bu",
				"onSelect": "onSelectDelValueAttr(row.entity.bu)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 7)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Account Number",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 8)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.account)\" ng-model=\"row.entity.account\" uigrid-compatible></smart-textfield></div></div>",
			"name": "account.name",
			"serverConfig": {
				"label": "P2P_Req_Account",
				"type": "textfield",
				"sort": 4,
				"isMandatory": false,
				"data": "account",
				"onSelect": "onSelectDelValueAttr(row.entity.account)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 8)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}, {
			"width": 150,
			"displayName": "Project ID",
			"enableHiding": false,
			"suppressRemoveSort": true,
			"enableFiltering": true,
			"cellTooltip": true,
			"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 9)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.project)\" ng-model=\"row.entity.project\" uigrid-compatible></smart-textfield></div></div>",
			"name": "project.name",
			"serverConfig": {
				"label": "P2P_Req_Project",
				"type": "textfield",
				"sort": 5,
				"isMandatory": false,
				"data": "project",
				"onSelect": "onSelectDelValueAttr(row.entity.project)",
				"onChange": "changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 9)",
				"attributes": {
					"readonly": false,
					"options": "itemCatalog[row.entity.lineId].accountingOptions",
					"filterkeys": ["name"],
					"optionformat": "{code}-{name}",
					"displayformat": "{name}",
					"enableFiltering": true,
					"removable": false,
					"type": "autocomplete"
				},
				"isVisible": true
			},
			"visible": true,
			"enableCellEdit": true,
			"cellEditableCondition": true,
			"enableCellEditOnFocus": true,
			"enableColumnMoving": true,
			"enablePinning": false,
			"enableColumnResizing": true,
			"allowCellFocus": true,
			"type": "object"
		}],
		"excludeProperties": ["$$hashKey"],
		"enableRowHashing": true,
		"flatEntityAccess": false,
		"showHeader": true,
		"headerRowHeight": 30,
		"minRowsToShow": 10,
		"showGridFooter": false,
		"showColumnFooter": false,
		"columnFooterHeight": 30,
		"gridFooterHeight": 30,
		"columnWidth": 50,
		"maxVisibleColumnCount": 200,
		"virtualizationThreshold": 20,
		"columnVirtualizationThreshold": 10,
		"excessRows": 4,
		"scrollThreshold": 4,
		"excessColumns": 4,
		"horizontalScrollThreshold": 2,
		"aggregationCalcThrottle": 500,
		"wheelScrollThrottle": 70,
		"scrollDebounce": 300,
		"enableSorting": true,
		"enableColumnMenus": true,
		"enableVerticalScrollbar": 1,
		"enableHorizontalScrollbar": 1,
		"enableMinHeightCheck": true,
		"minimumColumnSize": 10,
		"headerTemplate": null,
		"footerTemplate": "ui-grid/ui-grid-footer",
		"gridFooterTemplate": "ui-grid/ui-grid-grid-footer",
		"rowTemplate": "ui-grid/ui-grid-row",
		"appScopeProvider": null,
		"cellEditableCondition": true,
		"enableColumnMoving": true,
		"enableColumnResizing": true,
		"enableRowSelection": true,
		"multiSelect": true,
		"noUnselect": false,
		"modifierKeysToMultiSelect": false,
		"enableRowHeaderSelection": true,
		"enableFullRowSelection": false,
		"enableSelectAll": true,
		"enableSelectionBatchEvent": true,
		"selectionRowHeaderWidth": 30,
		"enableFooterTotalSelected": true,
		"modifierKeysToMultiSelectCells": false
	};

	//Item Details Grid
	$scope.itemConfig = [
            {
                "field": "lineNumber",
                "width": 50,
                "displayName": "Line Number",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "itemNumber",
                "width": 50,
                "displayName": "Item No.",
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
                "field": "supplierItemNumber",
                "width": 100,
                "displayName": "Supplier Item No.",
                "isFixed": "Left",
                "isVisible": true,
                "type": "editable",
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
               
            },
            {
                "field": "description",
                "width": 100,
                "displayName": "Description",
                "isFixed": "Left",
                "isVisible": true,
                "type": "editable",
                "autoIncrement": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"

            },
             {
                 "field": "order.number",
                 "width": 100,
                 "displayName": "Order No.",
                 "isFixed": "Left",
                 "isVisible": true,
                 "type": "editable",
                 "autoIncrement": false,
                 "filterObject": { "enableFiltering": true },
                 
             },
              {
                  "field": "orderLineNo",
                  "width": 100,
                  "displayName": "Order Line No.",
                  "isFixed": "Left",
                  "isVisible": true,
                  "type": "editable",
                  "autoIncrement": false,
                  "filterObject": { "enableFiltering": true },
                  
              },
              {
                  "field": "orderQuantity",
                  "width": 100,
                  "displayName": "Order Quantity",
                   "isVisible": true,
                   "type": "editable",
                  "autoIncrement": false,
                  "filterObject": { "enableFiltering": true },
                  "attributes": {
                      "type": "number"
                  }
              },
               {
                   "field": "receivedQuantity",
                   "width": 150,
                   "displayName": "Received Quantity",
                   "isVisible": true,
                   "type": "editable",
                   "autoIncrement": false,
                   "filterObject": { "enableFiltering": true },
                   "attributes": {
                       "type": "number"
                   }
               },
                {
                    "field": "acceptedQuantity",
                    "width": 150,
                    "displayName": "Accepted Quantity",
                    "isVisible": true,
                    "autoIncrement": false,
                    "type": "editable",
                    "filterObject": { "enableFiltering": true },
                    "attributes": {
                        "type": "number"
                    }
                },
                {
                    "field": "deliveryComplete",
                    "width": 150,
                    "displayName": "Delivery Complete",
                    "isVisible": true,
                    "isReadOnly": true,
                    "filterObject": { "enableFiltering": true },
                    "cellTemplate": "<smart-checkbox class='aCenter' ng-model='delComplete' on-change='onChange(delComplete)'></smart-checkbox>"
                },
                {
                    "field": "uom",
                    "width": 150,
                    "displayName": "UOM",
                    "isVisible": true,
                    "isReadOnly": true,
                    "autoIncrement": false,
                    "filterObject": { "enableFiltering": true },
                },
                {
                    "field": "previouslyAcceptedQuantity",
                    "width": 150,
                    "displayName": "Previously Accepted Quantity",
                    "isVisible": true,
                    "isReadOnly": true,
                    "autoIncrement": false,
                    "filterObject": { "enableFiltering": true },
                    "attributes": {
                        "type": "number"
                    }
                },
                {
                    "field": "receivedDate",
                    "width": 150,
                    "displayName": "Received Date",
                    "isVisible": true,
                    "autoIncrement": false,
                    "type": "editable",
                    "filterObject": { "enableFiltering": true },
                    "attributes": {
                        "type": "number"
                    }
                },
                {
                    "field": "addiInfo",
                    "width": 230,
                    "displayName": "Additional Information",
                    "isVisible": true,
                    "filterObject": {
                        "enableFiltering": false
                    },
                    "enableCellEdit": false,
                    "cellTemplate": "<a ui-sref='p2p.receipt.receiptAddInfo({id: {{row.entity.lineNumber}} })'> <span ng-if='row.entity.lineNumber == 1'>Add</span>  <span ng-if='row.entity.lineNumber != 1'>Edit </span> ({{row.entity.additionaInformation.length}})</a>"
                    },
            ];
	$scope.itemModel = [
            {
               
                "lineNumber": 1,
                "itemNumber": "0001",
                "supplierItemNumber": "SI-77665",
                "description": "Dell Laptop",
                "order": {
                    "id": 6349,
                    "number": "PO-34523",
                    "check": false,
                    "status": "Approved"
                },
                "orderLineNo": "PO.65745",
                "orderQuantity": 4,
                "receivedQuantity": 4,
                "acceptedQuantity": 4,
                "uom": "Each",
                "previouslyAcceptedQuantity": 0,
                "receivedDate": "2016-04-22",
                "additionaInformation": [{
                    "title": "Dell Laptop",
                    "showContent": false,
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
                    }]
                }, {
                    "title": "Lenovo Laptop",
                    "showContent": false,
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
                    }]
                }, {
                    "title": "Asus Laptop",
                    "showContent": false,
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
                    }]
                }, {
                    "title": "IBM Laptop",
                    "showContent": false,
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
                    }]
                }]
            },
            {

                "lineNumber": 2,
                "itemNumber": "0002",
                "supplierItemNumber": "SI-23478",
                "description": "Lenovo Laptop",
                "order": {
                    "id": 6349,
                    "number": "PO-19878",
                    "check": false,
                    "status": "Approved"
                },
                "orderLineNo": "PO.82312",
                "orderQuantity": 10,
                "receivedQuantity": 10,
                "acceptedQuantity": 10,
                "uom": "Each",
                "previouslyAcceptedQuantity": 0,
                "receivedDate": "2017-06-18",
                "additionaInformation": [{
                    "title": "Dell Laptop",
                    "showContent": false,
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
                    }]
                }, {
                    "title": "Lenovo Laptop",
                    "showContent": false,
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
                    }]
                }, {
                    "title": "Asus Laptop",
                    "showContent": false,
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
                    }]
                }, {
                    "title": "IBM Laptop",
                    "showContent": false,
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
                    }]
                }]
            },
             {

                 "lineNumber": 3,
                 "lastCanceled": true,
                 "itemNumber": "0003",
                 "supplierItemNumber": "SI-85678",
                 "description": "Asus Laptop",
                 "order": {
                     "id": 6349,
                     "number": "PO-98745",
                     "check": false,
                     "status": "Approved"
                 },
                 "orderLineNo": "PO.23879",
                 "orderQuantity": 35,
                 "receivedQuantity": 35,
                 "acceptedQuantity": 35,
                 "uom": "Each",
                 "previouslyAcceptedQuantity": 0,
                 "receivedDate": "2017-08-13",
                 "additionaInformation": [{
                     "title": "Dell Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "Lenovo Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "Asus Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "IBM Laptop",
                     "showContent": false,
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
                     }]
                 }]
             },
             {

                 "lineNumber": 4,
                 "itemNumber": "0004",
                 "supplierItemNumber": "SI-98753",
                 "description": "Intel Laptop",
                 "order": {
                     "id": 6349,
                     "number": "PO-45353",
                     "check": false,
                     "status": "Approved"
                 },
                 "orderLineNo": "PO.78676",
                 "orderQuantity": 12,
                 "receivedQuantity": 12,
                 "acceptedQuantity": 12,
                 "uom": "Each",
                 "previouslyAcceptedQuantity": 0,
                 "receivedDate": "2017-09-22",
                 "additionaInformation": [{
                     "title": "Dell Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "Lenovo Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "Asus Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "IBM Laptop",
                     "showContent": false,
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
                     }]
                 }]
             },
             {

                 "lineNumber": 5,
                 "itemNumber": "0005",
                 "supplierItemNumber": "SI-12160",
                 "description": "IBM Laptop",
                 "order": {
                     "id": 6349,
                     "number": "PO-12345",
                     "check": false,
                     "status": "Approved"
                 },
                 "orderLineNo": "PO.67890",
                 "orderQuantity": 15,
                 "receivedQuantity": 15,
                 "acceptedQuantity": 15,
                 "uom": "Each",
                 "previouslyAcceptedQuantity": 0,
                 "receivedDate": "2017-12-29",
                 "additionaInformation": [{
                     "title": "Dell Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "Lenovo Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "Asus Laptop",
                     "showContent": false,
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
                     }]
                 }, {
                     "title": "IBM Laptop",
                     "showContent": false,
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
                     }]
                 }]
             }
           
	];

	if (mode == "changeInReceipt") {
	    $scope.itemConfig[0].isVisible = true;
	}



    //UI grid -- accounting
	$scope.assetConfig = [
            {
                "field": "lineNumber",
                "width": 120,
                "displayName": "Line Number",
                "isTree": true,
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
                "field": "itemNo",
                "width": 120,
                "displayName": "Item No.",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "description",
                "width": 120,
                "displayName": "Item Description",
                "isFixed": "Left",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "manfName",
                "width": 150,
                "displayName": "Manufacturer Name",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "partNo",
                "width": 150,
                "displayName": "Manufacturer Part No.",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "serialNo",
                "width": 150,
                "displayName": "Serial No.",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "assetKey",
                "width": 150,
                "displayName": "Asset Key",
                "isRegFocusCol": true,
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "popup",
                "attributes": {
                    "type": "tagPopupShowCallback",
                    "defaultTitle": ""
                },
            },
            {
                "field": "assetLoc",
                "width": 150,
                "displayName": "Asset Location",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            },
            {
                "field": "assetReturn",
                "width": 150,
                "displayName": "Asset Return",
                "isVisible": true,
                "filterObject": { "enableFiltering": true },
                "type": "editable"
            }
	];
	$scope.assetModel = [
            {
                "lineNumber": 1,
                "itemNo": "Inspiron-2178",
                "description": "Dell Laptop",
                "manfName": "Dell",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "Tag",
                "assetLoc": "Mumbai",
                "assetReturn": ""
            },
            {
                "lineNumber": 1,
                "itemNo": "Inspiron-2188",
                "description": "Dell Laptop",
                "manfName": "Dell",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "",
                "assetLoc": "Navi Mumbai",
                "assetReturn": ""
            },
            {
                "lineNumber": 1,
                "itemNo": "Inspiron-2198",
                "description": "Dell Laptop",
                "manfName": "Dell",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "",
                "assetLoc": "Thane",
                "assetReturn": ""
            },
            {
                "lineNumber": 2,
                "itemNo": "Ass-2244",
                "description": "Asus Laptop",
                "manfName": "Asus",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "Tag",
                "assetLoc": "Bangalore",
                "assetReturn": ""
            },
            {
                "lineNumber": 2,
                "itemNo": "Ass-2244",
                "description": "Asus Laptop",
                "manfName": "Asus",
                "partNo": "uti-345678",
                "serialNo": "5432467",
                "assetKey": "",
                "assetLoc": "Bangalore",
                "assetReturn": ""
            }
	];

	$scope.tagPopupUrl = "p2p/receipts/views/popupTag.html";
	$scope.tagPopup = false;

    // UI Grid -- popup callback 
	$scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive
	    if (def.col && def.col.field == 'assetKey' && def.row.entity.assetKey != "") {
	        $scope.tagPopup = true;
	    }
	}

	$scope.tagPopupHideCallback = function (e) {
	    $scope.tagPopup = false;
	};

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


    //select All -- add lines from -- requisition tab
	$scope.fillpartial = false;
	$scope.reqCheckedAll = { 'check': false };
	$scope.checkAllReq = function (aug) {
	    angular.forEach($scope.importFromReq, function (importFromReq, key) {
	        $scope.importFromReq[key].isSelected = aug;
	    });
	    $scope.fillpartial = false;
	    $scope.reqCheckedAll.check = aug;
	};
	$scope.reqChange = function (arg) {
	    var importFromReqlength = $scope.importFromReq.length,
			incre,
			checkCounter = 0;
	    for (incre = 0; incre < importFromReqlength; incre++) {
	        if ($scope.importFromReq[incre].isSelected)
	            checkCounter++;
	    }
	    $scope.fillpartial = true;
	    if (checkCounter === 0) {
	        $scope.fillpartial = false;
	        $scope.reqCheckedAll.check = false;
	    }
	    else if (checkCounter === importFromReqlength) {
	        $scope.fillpartial = false;
	        $scope.reqCheckedAll.check = true;
	    }
	};
    //select All -- add lines from -- template tab
	$scope.checkAllTemp = function (aug) {
	    angular.forEach($scope.importFromTemp, function (importFromTemp, key) {
	        $scope.importFromTemp[key].selected = aug;
	    });
	};

    //line -- manage columns
	$scope.manageColumns = function () {
	    $scope.fields = [];
	    $scope.fields = [
            { 'lable': 'Order Quantity', 'selected': false },
            { 'lable': 'Received Quantity', 'selected': false },
            { 'lable': 'Accepted Quantity', 'selected': false },
            { 'lable': 'Delivery Complete', 'selected': false },
            { 'lable': 'UOM', 'selected': false },
            { 'lable': 'Previously Accepted Quantity', 'selected': false },
            { 'lable': 'Received Date', 'selected': false },
            { 'lable': 'Additional Information', 'selected': false },
	    ];


	    $scope.noOfCol = parseInt(Math.round($scope.fields.length / 4));
	    $scope.colWidth = 200;
	    $scope.listHolderWidth = { 'width': $scope.noOfCol * $scope.colWidth + "px" }
	    $scope.startVal = 0;


	    $scope.getStartFrom = function () {
	        $scope.startVal += 1;
	    };

	    $scope.cloneDiv = function (n) {
	        return new Array(n);
	    };

	    $scope.itemsLimit = 4;
	    $scope.itemsColumnized = function (myIndex) {
	        var currentPageIndex = myIndex * $scope.itemsLimit;
	        return $scope.fields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
	    };
	}

    //line -- manage columns -- check all
	$scope.selectedAll = {
	    'selection': false
	}, $scope.splitsSelectedAll = {
	    'selection': false
	}, $scope.fillpartial = false, $scope.isVisible = false;
	$scope.checkAll = function (aug) {
	    angular.forEach($scope.fields, function (field, key) {
	        $scope.fields[key].selected = aug;
            
	    });
	    count = $scope.fields.length;
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
	$scope.resetAllFields = function () {
	    $scope.selectedAll.selection = false;
	    $scope.fillpartial = false;
	    $scope.isVisible = false;
	    $scope.checkAll(false);
	    $scope.selectedCount = getSelectedCout($scope.fields);
	}

    //line -- manage columns -- on change in list checkboxes
	var count = 0;
	$scope.onChange = function (obj) {
	    obj ? count++ : count--;
	    
	    if (count == $scope.fields.length) {
	        $scope.selectedAll = true;
	        $scope.fillpartial = false;
	    }
	    else if (count > 0) {
	        $scope.fillpartial = true;
	        $scope.selectedAll = false;
	    }
	    else {
	        $scope.fillpartial = false;
	        $scope.selectedAll = false;
	    }
	}


}

function receiptAdditionalInfoCtrlFunc($scope, $rootScope, RuleEngine, $http, $window, $state, $timeout, $sce) {
    /* Additional information  */

    $scope.idIs = $state.params.id;
    var additionalInfo = {
        method: 'GET',
        url: 'p2p/receipts/models/createReceipt.json'
    };

    $http(additionalInfo).then(function (response) {
        $scope.data = response.data.dataModel;
        $scope.dataModel = $scope.data.additionalInfo.data;
        $scope.lineviewData = $scope.data.LineLeveladditionalInfo;
        if ($state.current.name == 'p2p.receipt.receiptAddInfo' && $scope.idIs != undefined) {
            $scope.lineviewData[$scope.idIs].showContent = true;
            $scope.isAdditionalInfoPage = true;
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    });





    $scope.sectionName = "ADDITIONAL INFORMATION"

    $scope.fieldCount = function (paramUse) {

        var count = 0;
        angular.forEach(paramUse, function (k, v) {
            count += paramUse[v].questions.length;
        });
        return count;
    }


    $scope.returnColClass = function (que) {


        var q = que.question;



        if (q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" || q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" && q == "") {
            return "s12 m6 l4 xl4 xxl4";
        }
        else if (q.length >= 21 && q.length <= 40 && que.type != "multi-text" && que.type != "multi-text-with-icon") {
            return "s12 m12 l6 xl6 xxl6";
        }
        else {
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

        angular.forEach($scope.lineviewData, function (value, key) {
            $scope.lineviewData[key].showContent = false;
        });

        $scope.currentSelected = index;
        $scope.lineviewData[index].showContent = true;
    }



    // right side content height
    $scope.contHeight = function (fixedSubHeader) {
        if (fixedSubHeader) {

            return $window.innerHeight - 50
        }
        else {

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

    $scope.getFieldType = function (getFieldType) {
        switch (getFieldType) {
            case 'numeric':
                return 'number'
                break;
            default:
                return 'text'
                break;
        }
    }

    $scope.returnField = function (fieldType) {

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
}
