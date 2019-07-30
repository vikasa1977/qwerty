angular.module('SMART2')

    .controller('p2pPaymentReqNewCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', p2pPaymentReqNewCtrlFunc])
	.controller('itemDetailPayemntReqCtrl', ['$scope', 'notification', itemDetailPayemntReqCtrlFunc])
.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
          '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
});


function p2pPaymentReqNewCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter) {

    


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
		url: 'p2p/paymentReq/models/createPaymentReq.json'
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

    /* tax popover */
	$scope.taxConfig =
        [
        {
            "dataName": "Requisition Value",
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
}

function itemDetailPayemntReqCtrlFunc($scope, notification) {

    $scope.resetAllFields = function () {
        $scope.checkAllTemp.check = false;
        $scope.checkAllReq.check = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
    }


    $scope.applyCurrentFields = function (a, b) {
        angular.element(document).triggerHandler('click');
    };
    $scope.cancelAllFields = function () {
        angular.element(document).triggerHandler('click');
    }

    $scope.fields = [];
    $scope.accfields = [];
    //line -- manage columns
    $scope.manageColumns = function () {
        $scope.fields = [{ // [TODO - PERFORMANCE - is it needed on scope???]
            'lable': 'Requested Date Requested Date Requested Date Requested Date Requested Date',
            'selected': true
        }, {
            'lable': 'Shipping Method',
            'selected': true
        }, {
            'lable': 'Procurement Option',
            'selected': true
        }, {
            'lable': 'Inventory Type',
            'selected': true
        }, {
            'lable': 'Matching',
            'selected': true
        }, {
            'lable': 'Supplier Code',
            'selected': true
        }, {
            'lable': 'Supplier Contact',
            'selected': true
        }, {
            'lable': 'Manufacturer Name',
            'selected': true
        }, {
            'lable': 'Manufacturer Part Number',
            'selected': true
        }, {
            'lable': 'Contract Name',
            'selected': true
        }, {
            'lable': 'Contract Expiry Date',
            'selected': true
        }, {
            'lable': 'Contract Value',
            'selected': true
        }, {
            'lable': 'Payment Terms',
            'selected': true
        }];

        $scope.noOfCol = parseInt(Math.round($scope.fields.length / 5));
        $scope.colWidth = 200;
        $scope.listHolderWidth = {
            'width': $scope.noOfCol * $scope.colWidth + "px"
        }
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
        $scope.selectedCount = getSelectedCout($scope.fields);
    }

    //line -- manage columns -- check all
    $scope.selectedAll = {
        'selection': true
    }, $scope.splitsSelectedAll = {
        'selection': false
    }, $scope.fillpartial = false, $scope.isVisible = false;
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
    $scope.resetAllFields = function () {
        $scope.selectedAll.selection = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
        $scope.selectedCount = getSelectedCout($scope.fields);
    }

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
        var count = 0,
            len = obj.length;
        for (var i = 0; i < len; i++) {
            if (obj[i].selected === true) {
                count++;
            }
        }
        return count;
    }
    $scope.selectedCount = getSelectedCout($scope.fields);

    //line -- manage columns -- global fn for at least on checkbox selection in list
    function isAtleastOneSelected(obj) {
        var len = obj.length;
        for (var i = 0; i < len; i++) {
            if (obj[i].selected === true) {
                return true;
            }
        }
        return false;
    }

    //line -- manage columns -- global fn for all checkboxes selection
    function isAllSelected(obj) {
        var len = obj.length;
        for (var i = 0; i < len; i++) {
            if (!obj[i].selected) {
                return false;
            }
        }
        return true;
    }

    //accounting details -- manage columns
    $scope.accManageColumns = function () {
        $scope.accfields = [];
        $scope.accfields = [{
            'lable': 'UOM'
        }, {
            'lable': 'Split Taxes & Charges (USD)'
        }, {
            'lable': 'Requester'
        }];
        $scope.selectedCount = getSelectedCout($scope.accfields);
        $scope.noOfCol = parseInt(Math.round($scope.accfields.length / 5));
        $scope.colWidth = 200;
        $scope.listHolderWidth = {
            'width': $scope.noOfCol * $scope.colWidth + "px"
        }
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
            return $scope.accfields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };
    }
   
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
            message: "<p class='left-align'>Item deleted Successfully</p> ",
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
		{ "title": "Lines", "contentUrl": "p2p/paymentReq/views/itemDetail-mat-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/paymentReq/views/itemDetail-mat-accTab.html" }
	];

	$scope.itemDetailReqServiceTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/paymentReq/views/itemDetail-serv-linesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/paymentReq/views/itemDetail-serv-accTab.html" }
	];

	$scope.importLineItemsTabDataset = [
		{ "title": "Requisition", "contentUrl": "p2p/paymentReq/views/importLineItemsReqTab.html", "active": true },
		{ "title": "Templates", "contentUrl": "p2p/paymentReq/views/importLineItemsTemplTab.html" }
    ];

	//$scope.importLineItemsTabDataset = [
	//	{ "title": "REQUISITION", "contentUrl": "p2p/req/views/importLineItemsReqTab.html", "active": true, "id": 1 },
	//	{ "title": "TEMPLATES", "contentUrl": "p2p/req/views/importLineItemsTemplTab.html", "id": 2 }
	//];

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

    //select All -- add lines from -- requisition tab
	$scope.fillpartial = false;
	$scope.tempCheckedAll = { 'check': false };
	$scope.checkAllTemp = function (aug) {
	    angular.forEach($scope.importFromTemp, function (importFromTemp, key) {
	        $scope.importFromTemp[key].isSelected = aug;
	    });
	    $scope.fillpartial = false;
	    $scope.tempCheckedAll.check = aug;
	};
	$scope.tempChange = function (arg) {
	    var importFromTemplength = $scope.importFromTemp.length,
			incre,
			checkCounter = 0;
	    for (incre = 0; incre < importFromTemplength; incre++) {
	        if ($scope.importFromTemp[incre].isSelected)
	            checkCounter++;
	    }
	    $scope.fillpartial = true;
	    if (checkCounter === 0) {
	        $scope.fillpartial = false;
	        $scope.tempCheckedAll.check = false;
	    }
	    else if (checkCounter === importFromTemplength) {
	        $scope.fillpartial = false;
	        $scope.tempCheckedAll.check = true;
	    }
	};

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
		"data": [
            {
            	"isTaxExempt": false,
            	"status": 1,
            	"splitType": 0,
            	"id": 21559,
            	"lineNumber": 01,
            	"documentCode": 21193,
            	"p2PLineItemId": 202239,
            	"catalogItemId": 42,
            	"taxes": 0,
            	"splitTaxes": 0,
            	"splitValues": 12000,
            	"splittotal": 1,
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
            	"lineNumber": 02,
            	"documentCode": 21193,
            	"p2PLineItemId": 202239,
            	"catalogItemId": 42,
            	"taxes": 0,
            	"splitTaxes": 0,
            	"splitValues": 13000,
            	"splittotal": 1,
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
            },
            {
            	"isTaxExempt": false,
            	"status": 1,
            	"splitType": 0,
            	"id": 21559,
            	"lineNumber": 03,
            	"documentCode": 21193,
            	"p2PLineItemId": 202239,
            	"catalogItemId": 42,
            	"taxes": 0,
            	"splitTaxes": 0,
            	"splitValues": 14000,
            	"splittotal": 1,
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
            	"buyerItemNumber": "003",
            	"description": "Lenovo Laptop",
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
            	"lineNumber": 04,
            	"documentCode": 21193,
            	"p2PLineItemId": 202239,
            	"catalogItemId": 42,
            	"taxes": 0,
            	"splitTaxes": 0,
            	"splitValues": 15000,
            	"splittotal": 1,
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
            	"buyerItemNumber": "004",
            	"description": "IBM Laptop",
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
            	"lineNumber": 05,
            	"documentCode": 21193,
            	"p2PLineItemId": 202239,
            	"catalogItemId": 42,
            	"taxes": 0,
            	"splitTaxes": 0,
            	"splitValues": 16000,
            	"splittotal": 1,
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
            	"buyerItemNumber": "005",
            	"description": "Intel Laptop",
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
            }
		],
		"enableFiltering": true,
		"enablePinning": false,
		"enableCellEditOnFocus": true,
		"showTreeExpandNoChildren": true,
		"rowHeight": 30,
		"columnDefs": [
            {
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
            },
            {
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
            },
            {
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
            },
            {
            	"field": "splitNumber",
            	"width": 150,
            	"displayName": "Split Number",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"pinnedLeft": true,
            	"enableFiltering": true,
            	"cellTemplate": "<smart-button config=\"{'title':'Splits','allignRight':'false'}\" flat='true'></smart-button>",
            	"cellTooltip": true,
            	"name": "splitNumber",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"field": "quantity",
            	"width": 150,
            	"displayName": "Quantity",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "quantity",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"name": "uom.name",
            	"width": 150,
            	"displayName": "UOM",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	//"cellTemplate": "<div title=\"{{COL_FIELD}}\"><smart-button flat=\"true\" config='{\"title\":row.entity.taxes}' callback-params=\"row.entity\"} callback=\"grid.appScope.openTaxPopup\"></smart-button><div>",
            	"cellTooltip": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "string",
            	"visible": false
            },
            {
            	"name": "splitTaxes",
            	"width": 230,
            	"displayName": "Split Taxes & Charges (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	//"cellTemplate": "<div title=\"{{COL_FIELD}}\">{{grid.appScope.getSplitValue(row.entity)}}</div>",
            	"cellTooltip": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "object",
            	"visible": false
            },
            {
            	"name": "splitValues",
            	"width": 230,
            	"displayName": "Split Value (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	//"cellTemplate": "<div title=\"{{COL_FIELD}}\">{{grid.appScope.getSplitValue(row.entity)}}</div>",
            	"cellTooltip": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "object"
            },
            {
            	"name": "splittotal",
            	"width": 150,
            	"displayName": "Split Total (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	//"cellTemplate": "<div title=\"{{grid.appScope.getTotal(row.entity)}}\">{{grid.appScope.getTotal(row.entity)}}</div>",
            	"cellTooltip": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"width": 150,
            	"displayName": "Requester",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	//"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={name} filterkeys=name options=\"grid.appScope.undefined\" on-change=\"grid.appScope.undefined\" on-select=\"grid.appScope.undefined\" ng-model=\"row.entity.requester\" uigrid-compatible></smart-textfield></div></div>",
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
            	"type": "object",
            	"visible": false
            },
            {
            	"width": 150,
            	"displayName": "Corporation",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 10)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.department)\" ng-model=\"row.entity.department\" uigrid-compatible></smart-textfield></div></div>",
            	"name": "corporation.name",
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
            },
            {
            	"width": 150,
            	"displayName": "Cost Center",
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
            },
            {
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
            },
            {
            	"width": 170,
            	"displayName": "Project Number",
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
	$scope.gridOptionsItem = {
		"data": [
            {
            	"isTaxExempt": false,
            	"status": 1,
            	"splitType": 0,
            	"id": 21559,
            	"lineNumber": 1,
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
            	"deliverTo": null,
            	"procurementOption": "Procurement Option",
            	"procurementOption": "Procurement Option",
            	"inventoryType": false,
            	"matching": false,
            	"supplierCode": "09798",
            	"supplierContact": "john@gep.com",
            	"manufacturer": null,
            	"manufacturerPartNumber": null,
            	"contractNumber": "2015.000009",
            	"contractName": "conctract for Laptop",
            	"contractExpiryDate": "2015-01-16T18:30:00.000Z",
            	"contractValue": 0,
            	"paymentTerms": "net 30",
            	"$$hashKey": "uiGrid-0012"
            },
            {
            	"isTaxExempt": false,
            	"status": 1,
            	"splitType": 0,
            	"id": 21559,
            	"lineNumber": 2,
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
            	"deliverTo": null,
            	"procurementOption": "Procurement Option",
            	"procurementOption": "Procurement Option",
            	"inventoryType": false,
            	"matching": false,
            	"supplierCode": "09798",
            	"supplierContact": "john@gep.com",
            	"manufacturer": null,
            	"manufacturerPartNumber": null,
            	"contractNumber": "2015.000009",
            	"contractName": "conctract for Laptop",
            	"contractExpiryDate": "2015-01-16T18:30:00.000Z",
            	"contractValue": 0,
            	"paymentTerms": "net 30",
            	"$$hashKey": "uiGrid-0012"
            },
            {
            	"isTaxExempt": false,
            	"status": 1,
            	"splitType": 0,
            	"id": 21559,
            	"lineNumber": 3,
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
            	"deliverTo": null,
            	"procurementOption": "Procurement Option",
            	"procurementOption": "Procurement Option",
            	"inventoryType": false,
            	"matching": false,
            	"supplierCode": "09798",
            	"supplierContact": "john@gep.com",
            	"manufacturer": null,
            	"manufacturerPartNumber": null,
            	"contractNumber": "2015.000009",
            	"contractName": "conctract for Laptop",
            	"contractExpiryDate": "2015-01-16T18:30:00.000Z",
            	"contractValue": 0,
            	"paymentTerms": "net 30",
            	"$$hashKey": "uiGrid-0012"
            },
            {
            	"isTaxExempt": false,
            	"status": 1,
            	"splitType": 0,
            	"id": 21559,
            	"lineNumber": 4,
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
            	"deliverTo": null,
            	"procurementOption": "Procurement Option",
            	"procurementOption": "Procurement Option",
            	"inventoryType": false,
            	"matching": false,
            	"supplierCode": "09798",
            	"supplierContact": "john@gep.com",
            	"manufacturer": null,
            	"manufacturerPartNumber": null,
            	"contractNumber": "2015.000009",
            	"contractName": "conctract for Laptop",
            	"contractExpiryDate": "2015-01-16T18:30:00.000Z",
            	"contractValue": 0,
            	"paymentTerms": "net 30",
            	"$$hashKey": "uiGrid-0012"
            },
            {
            	"isTaxExempt": false,
            	"status": 1,
            	"splitType": 0,
            	"id": 21559,
            	"lineNumber": 5,
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
            	"deliverTo": null,
            	"procurementOption": "Procurement Option",
            	"procurementOption": "Procurement Option",
            	"inventoryType": false,
            	"matching": false,
            	"supplierCode": "09798",
            	"supplierContact": "john@gep.com",
            	"manufacturer": null,
            	"manufacturerPartNumber": null,
            	"contractNumber": "2015.000009",
            	"contractName": "conctract for Laptop",
            	"contractExpiryDate": "2015-01-16T18:30:00.000Z",
            	"contractValue": 0,
            	"paymentTerms": "net 30",
            	"$$hashKey": "uiGrid-0012"
            }
		],
		"enableFiltering": true,
		"enablePinning": false,
		"enableCellEditOnFocus": true,
		"showTreeExpandNoChildren": true,
		"rowHeight": 30,
		"columnDefs": [
            {
            	"field": "lineNumber",
            	"width": 150,
            	"displayName": "Line Number",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
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
            },
            {
            	"field": "lineType.key",
            	"width": 150,
            	"displayName": "Line Type",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"pinnedLeft": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "lineType.key",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "string"
            },
            {
            	"field": "itemNumber",
            	"width": 150,
            	"displayName": "Item Number",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"pinnedLeft": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "itemNumber",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "string"
            },
	        {
	        	"field": "description",
	        	"width": 150,
	        	"displayName": "Description",
	        	"enableHiding": false,
	        	"suppressRemoveSort": true,
	        	"enableCellEdit": true,
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
	        },
		    {
		    	"field": "supplierName.name",
		    	"width": 150,
		    	"displayName": "Supplier Name",
		    	"enableHiding": false,
		    	"suppressRemoveSort": true,
		    	"enableCellEdit": false,
		    	"pinnedLeft": false,
		    	"enableFiltering": true,
		    	"cellTooltip": true,
		    	"name": "supplierName.name",
		    	"cellEditableCondition": true,
		    	"enableCellEditOnFocus": true,
		    	"enableColumnMoving": true,
		    	"enablePinning": false,
		    	"enableColumnResizing": true,
		    	"allowCellFocus": true,
		    	"type": "string"
		    },
            {
            	"field": "supplierItemNumber",
            	"width": 190,
            	"displayName": "Supplier Item Number",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "supplierItemNumber",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "object"
            },
            {
            	"field": "category.name",
            	"width": 150,
            	"displayName": "Category",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "category.name",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"field": "qtyEfforts",
            	"name": "qtyEfforts",
            	"width": 150,
            	"displayName": "Quantity/Efforts",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "object"
            },
            {
            	"field": "uom.name",
            	"name": "uom.name",
            	"width": 150,
            	"displayName": "UOM",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"name": "startDate",
            	"width": 150,
            	"displayName": "Start Date",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "object"
            },
            {
            	"width": 150,
            	"displayName": "End Date",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	//"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=true displayformat={name} optionformat={name} filterkeys=name options=\"grid.appScope.undefined\" on-change=\"grid.appScope.undefined\" on-select=\"grid.appScope.undefined\" ng-model=\"row.entity.requester\" uigrid-compatible></smart-textfield></div></div>",
            	"name": "endDate",
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
            },
            {
            	"name": "unitPrice",
            	"width": 150,
            	"displayName": "Unit Price (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"enableCellEdit": true,
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"name": "total",
            	"width": 150,
            	"displayName": "Total (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
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
            	"type": "number"
            },
            {
            	"name": "taxes",
            	"width": 150,
            	"displayName": "Taxes (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	//"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 8)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.account)\" ng-model=\"row.entity.account\" uigrid-compatible></smart-textfield></div></div>",
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
            	"type": "number"
            },
            {
            	"name": "otherCharges",
            	"width": 175,
            	"displayName": "Other Charges (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	//"editableCellTemplate": "<div title=\"{{COL_FIELD}}\"><div><smart-textfield class=\"ui-grid-cell-contents\" type=\"autocomplete\" readonly=false displayformat={name} optionformat={code}-{name} filterkeys=name options=\"grid.appScope.itemCatalog[row.entity.lineId].accountingOptions\" on-change=\"grid.appScope.changeSplitAccounting($event, grid.appScope.itemCatalog[row.entity.lineId], 9)\" on-select=\"grid.appScope.onSelectDelValueAttr(row.entity.project)\" ng-model=\"row.entity.project\" uigrid-compatible></smart-textfield></div></div>",
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
            	"type": "number"
            },
            {
            	"field": "shippingFreight",
            	"width": 210,
            	"displayName": "Shipping & Freight (USD)",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "shippingFreight",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "string"
            },
            {
            	"field": "requestedDate",
            	"width": 160,
            	"displayName": "Requested Date",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "requestedDate",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "needByDate",
            	"width": 160,
            	"displayName": "Need by Date",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "needByDate",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"field": "shippingMethod",
            	"width": 160,
            	"displayName": "Shipping Method",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "shippingMethod",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "shipTo.name",
            	"width": 210,
            	"displayName": "Ship to/Work Location",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "shipTo.name",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"field": "shipTo.address",
            	"width": 210,
            	"displayName": "Ship to/Work Address",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "shipTo.address",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"field": "deliverTo",
            	"width": 160,
            	"displayName": "Deliver to",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "deliverTo",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number"
            },
            {
            	"field": "procurementOption",
            	"width": 210,
            	"displayName": "Procurement Option",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "procurementOption",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "inventoryType",
            	"width": 150,
            	"displayName": "Inventory Type",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "inventoryType",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "matching",
            	"width": 150,
            	"displayName": "Matching",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "matching",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "boolean",
            	"visible": false
            },
            {
            	"field": "supplierCode",
            	"width": 150,
            	"displayName": "Supplier Code",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "supplierCode",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "supplierContact",
            	"width": 150,
            	"displayName": "Supplier Contact",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "supplierContact",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "manufacturer",
            	"width": 180,
            	"displayName": "Manufacturer Name",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "manufacturer",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "string",
            	"visible": false
            },
            {
            	"field": "manufacturerPartNumber",
            	"width": 230,
            	"displayName": "Manufacturer Part Number",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": true,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "manufacturerPartNumber",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "contractNumber",
            	"width": 150,
            	"displayName": "Contract Number",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "contractNumber",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": true
            },
            {
            	"field": "contractName",
            	"width": 150,
            	"displayName": "Contract Name",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "contractName",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "string",
            	"visible": false
            },
            {
            	"field": "contractExpiryDate",
            	"width": 200,
            	"displayName": "Contract Expiry Date",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "contractExpiryDate",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "contractValue",
            	"width": 150,
            	"displayName": "Contract Value",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "contractValue",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            },
            {
            	"field": "paymentTerms",
            	"width": 160,
            	"displayName": "Payment Terms",
            	"enableHiding": false,
            	"suppressRemoveSort": true,
            	"enableCellEdit": false,
            	"enableFiltering": true,
            	"cellTooltip": true,
            	"name": "paymentTerms",
            	"cellEditableCondition": true,
            	"enableCellEditOnFocus": true,
            	"enableColumnMoving": true,
            	"enablePinning": false,
            	"enableColumnResizing": true,
            	"allowCellFocus": true,
            	"type": "number",
            	"visible": false
            }

		],
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
	$scope.addLines = 1;
}
