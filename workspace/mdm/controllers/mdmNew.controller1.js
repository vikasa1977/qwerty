angular.module('SMART2')
.service('MDMService', ['$http','$q','$window','$timeout', MDMServiceFn  ])
   .controller('mdmCreateNewCtrl1', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', 'MDMService',mdmCreateNewCtrl1Func])
   .controller('mdmNewItemDetailCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', 'MDMService',mdmNewItemDetailCtrlFunc])
   //.controller('costSummaryGraphCtrl', ['$scope', '$rootScope', '$state', '$http', '$timeout', 'lookup', costSummaryGraphCtrlFunc])


function mdmCreateNewCtrl1Func($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce, $interval, $notification, storeService, $window, MDMService) {
    
    $scope.currencyDataOptions = [{
        "code": "$",
        "name": "USD"
   }, {
       "code": "€",
       "name": "EUR"
   }];

    
    MDMService.getFormConfigData();
	$scope.status = $state.params.status;
	//$state.params.status = "Submit";
	//alert($scope.status);	
	
	      $scope.ExcCriteriaData = [
            {
                "itemNo": "P678 053 3116",
                "supplier": "Robert Bosh LLC",
                "currency": "SEK",
                "price": "55.99",
                "approx": "55.99",
                "level":"High"
            },
            {
                "itemNo": "P678 053 3116",
                "supplier": "Denso Corporation",
                "currency": "JPY",
                "price": "706.80",
                "approx": "56.08",
                "level":"High",

            },         {
                "itemNo": "P678 051 2445",
                "supplier": "UCO Industries",
                "currency": "USD",
                "price": "6.68",
                "approx": "59.70",
                "level":"Medium",
            }
     ];

     $scope.ExcInCretOptions = [{
        "code": "excl1",
        "name": "Exclusion Criteria"
    }, {
        "code": "excl2",
        "name": "Inclusion Criteria"
    }];
	// $scope.status = {
		// "displaytext": "Status",
        // "selectedoption": { "name": "Invited", "isdisabled": false, "description": "This is Invited", "approved": true },
        // "options": [
			// { "name": "Approved", "isdisabled": true, "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines", "approved": true },
			// { "name": "Disqualified", "isdisabled": false, "description": "This is disqualified", "approved": true },
			// { "name": "Approval Pending", "isdisabled": false, "description": "This is approval pending", "approved": true },
			// { "name": "Identified", "isdisabled": false, "description": "This is identified", "approved": false },
			// { "name": "Invited", "isdisabled": false, "description": "This is Invited", "approved": true },
			// { "name": "Registered", "isdisabled": false, "description": "This is disqualified", "approved": true },
			// { "name": "Waitlisted", "isdisabled": false, "description": "This is Waitlisted", "approved": true }
        // ]
    // };
    
    $scope.categoryOptions = [{
        "code": "$",
        "name": "Deep Groove Ball Bearings"
   }, {
       "code": "€",
       "name": "Ball Thrust Bearings"
   }];
   $scope.selectedCurrency = {};
   $scope.onChange = function(selectedCurrency) {
       console.log(selectedCurrency);
   };

    $scope.id = $state.params.id;
    $scope.mode = $state.params.mode;
    $scope.approvalPending;
    //$scope.status = "DRAFT";
    var getURLwithStatus;
	//console.log("Current State = " + $state.$current.name);
	urlJson = "mdm/models/itemDetails.json";
	/* READONLY MODE */
	//alert($state.params.mode);
	if($state.params.status === "readonly"){
		$scope.docName = "Create Item12001";
		$scope.showStatus = true;
		$scope.status = 'Pending review';
		urlJson = "mdm/models/itemDetails.json";
		$scope.boreGeo = 'Cylinder';
		$scope.InsideDiameter = '30 mm';
		$scope.outsideDiameter = '62 mm';
		$scope.width = '16 mm';
		$scope.noOfRows = 'Multiple';
		$scope.material = 'Carbon Steel';
		$scope.clearance = 'C3';
		$scope.noOfSeals = '2 Shield'
	} else if($state.params.status === "withdrawn"){
		$scope.docName = "Create Item12001";
		$scope.showStatus = true;
		$scope.status = 'Draft';
		urlJson = "mdm/models/createMDM1.json";
		$scope.boreGeo = 'Cylinder';
		$scope.InsideDiameter = '30 mm';
		$scope.outsideDiameter = '62 mm';
		$scope.width = '16 mm';
		$scope.noOfRows = 'Multiple';
		$scope.material = 'Carbon Steel';
		$scope.clearance = 'C3';
		$scope.noOfSeals = '2 Shield'
	} else if($state.params.status === "saved"){
		$scope.docName = "Create Item12001";
		$scope.showStatus = true;
		$scope.status = 'Draft';
		urlJson = "mdm/models/createMDM1_readonly.json";
		$scope.boreGeo = 'Cylinder';
		$scope.InsideDiameter = '30 mm';
		$scope.outsideDiameter = '62 mm';
		$scope.width = '16 mm';
		$scope.noOfRows = 'Multiple';
		$scope.material = 'Carbon Steel';
		$scope.clearance = 'C3';
		$scope.noOfSeals = '2 Shield'
	} else {
		$scope.docName = "REQ-2017122 - AB VOLVO - RECOMMENDATION";
		$scope.showStatus = false;
		var urlJson = 'mdm/models/createMDM1.json';
		$scope.boreGeo = '';
		$scope.InsideDiameter = '';
		$scope.outsideDiameter = '';
		$scope.width = '';
		$scope.noOfRows = '';
		$scope.material = '';
		$scope.clearance = '';
		$scope.noOfSeals = ''
	}
	/* READONLY MODE END */
	/* SAVE BUTTON */
	$scope.saveDoc = function(){
		$state.go('mdm.new', { status: 'saved'});
	};
	/* SAVE BUTTON END */
	/* CLOSE BUTTON */
	$scope.closeRequest = function(){		
		$state.go('mdm.new', { status: 'withdrawn'});
	}
	/* SAVE BUTTON END */
	
	$scope.baselineRPOpt = {
            "options": [
                { "opt": "Month" },
                { "opt": "Year" }
            ]
        };
        $scope.baselineRP = {
            value: "",
            unit: $scope.baselineRPOpt.options[0]
        };

        $scope.baselineOptions = [
            { "code": "Ys", "title": "Yes" },
            { "code": "No", "title": "No" },
            { "code": "Na", "title": "N/A" }
        ];
        $scope.baseline = $scope.baselineOptions[0];
	
	//var urlJson = ($state.$current.name == "mdm.new") ? 'mdm/models/createReq.json' : ($state.$current.name == "mdm.new?readonly") ? 'mdm/models/createReq.json';
    if ($scope.id == 1) {
        $scope.approvalPending = true
        $scope.status = "approval Pending";
        getURLwithStatus = urlJson

    }
    else {
        $scope.approvalPending = false;
        //$scope.status = "DRAFT";
        getURLwithStatus = urlJson

    }
	
	/* SUBMIT BUTTON */
	$scope.submitItem01 = function () {
		$state.go('mdm.new', { status: 'success'});
        // var confi = {
            // type: "success",
            // message: "<p class='left-align'>Item Request has been submitted successfully.</p>",

            // buttons: [
				// {
				    // "title": "YES",
				    // "result": "yes"
				// },
				// {
				    // "title": "Stay on same page",
				    // "result": "no"
				// }
            // ]
        // };

        // //Notification call
        // notification.notify(confi, function (responce) {
            // if (responce.result == "yes") {
				// $state.go('mdm.checkDuplicate', { status: 'readonly'});
				
            // } else {
                // return;
            // }
        // });
    }
	/* SUBMIT BUTTON ENDS */
	/* WITHDRAW BUTTON */
	$scope.withdrawRequest = function () {		
        var confi = {
            type: "warning",
            message: "<p class='left-align'>Are you sure you want to withdraw the Item Request ITEM 12001?</p>",

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
				$state.go('mdm.new', { status: 'withdrawn'});
				
            } else {
                return;
            }
        });
    }
	/* WITHDRAW BUTTON ENDS */
	

    $scope.getStatus = $state.params.status;
    if ($scope.getStatus == "sendforapproval") {
        $scope.sendForApproval = true;
    }
    else {
        $scope.sendForApproval = false;
    }

    $scope.typeOptions = [
            {
                "UserId": 28360,
                "UserName": "SRUser1@outlook.com",
                "FirstName": "John",
                "LastName": "Doe"
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
    $scope.selectedLegalEntity = $scope.typeOptions[0];
    $scope.selectedCreateOnBehalf = $scope.typeOptions[0];

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
	
	$scope.categoryList = {
            "displaytext": "Category",
            "selectedoption": { "name": "Choose Category", "isdisabled": false, "description": "This is Invited", "approved": true },
            "options": [
				{ "name": "Deep Groove Ball Bearings", "isdisabled": false, "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines", "approved": true },
				{ "name": "Disqualified", "isdisabled": false, "description": "This is disqualified", "approved": true }
				// ,
				// { "name": "Approval Pending", "isdisabled": false, "description": "This is approval pending", "approved": true },
				// { "name": "Identified", "isdisabled": false, "description": "This is identified", "approved": false },
				// { "name": "Invited", "isdisabled": false, "description": "This is Invited", "approved": true },
				// { "name": "Registered", "isdisabled": false, "description": "This is disqualified", "approved": true },
				// { "name": "Waitlisted", "isdisabled": false, "description": "This is Waitlisted", "approved": true }
            ]
        };
        $scope.selectTypeOption = {
            "name": "status",
            "selectiontext": "Invited"
        };
		
		//console.log($scope.status.selectedoption.name);
		
		$scope.reasonPoup = function(e){			
			//console.log(data);
			
			if (e.btnType == "save"){
				//alert("CLICKED");
				if($scope.categoryList.selectedoption.name === "Deep Groove Ball Bearings"){
					alert("APPROVED");
				} else {
					alert("DISQUALIFIED");
				}
			}
			
			
		}
		
		

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
    
	
	

    $scope.createBlanket = function(){
        $state.go('contract.new', {mode: 'blanket'});
    }
    var isSequenceToBeMaintained;

    /*
	 *  Service call get form-config and data-model
	 */

    var req = {
        method: 'GET',
        url: getURLwithStatus
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
        if (storeService.get('isViewLineItem')) {
            for (var i = 0; i < $scope.config.sections[0].rows[0].properties[0].length; i++) {
                $scope.config.sections[0].rows[0].properties[i].focus = false;
            }
            $scope.config.sections[4].isActive = true;
            $timeout(function () {               
                var lineDetailsOffsetTop = angular.element('.card.cardParent[label="LINES DETAILS"]').offset().top;
                $window.scrollTo(0, lineDetailsOffsetTop);                
            },500);            
        }
        $scope.$watch('dataModel', function (n, o) {
        }, true);
    }, function (error) {
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
        url: 'mdm/models/createReq.json'
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

    $scope.goToTracksatusDetail = function (e) {
        $scope.heightTrackStatus = '100%';
        $scope.isFullscreen = !$scope.isFullscreen;
    }
    $scope.showCommentsPopupexpand = "expandCommentPopupCC";

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
        $scope.showCommentsPopup = false;
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


    // popup -- copy req data
    $scope.copyReqData = [
        {
            label: "Accounting",
            isChecked: true
        },
        {
            label: "Comments",
            isChecked: false
        },
        {
            label: "Notes & Attachments",
            isChecked: false
        }
    ]

    // popup -- copy req
    $scope.copyReqPopupUrl = "p2p/shared/views/popupCopyReq.html";
    $scope.copyReqPopup = false;
    $scope.copyReqPopupCallback = function (e) {
        $scope.copyReqPopup = true;
    };
    $scope.copyReqOnHideCallback = function (e) {
        $scope.copyReqPopup = false;
    };

  
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

    // popup -- Create PO 
    $scope.flipToPoPopupUrl = "p2p/shared/views/popupFlipToPo.html";
    $scope.flipToPoPopup = false;
    $scope.flipToPoCallback = function (e) {
        $scope.flipToPoPopup = true;
    };
    $scope.flipToPoOnHideCallback = function (e) {
        $scope.flipToPoPopup = false;
    };

    $scope.onFlipToPoSupplierLookUpHide = function (currSelected) {
        $scope.flipToPoPopup = true;
        validateField(currSelected.result, "supplier");
    }

    $scope.onFlipToPoSupplierLookUpShow = function () {
        $scope.flipToPoPopup = false;
    }

    $scope.onFlipToPoOrderLocLookUpHide = function (currSelected) {
        $scope.flipToPoPopup = true;
        validateField(currSelected.result, "orderLocation");
    }

    $scope.onFlipToPoOrderLocLookUpShow = function () {
        $scope.flipToPoPopup = false;
    }

    $scope.createPoDisable = true;
    $scope.isSupplierSelected = true;
    var currSupplierName = "";
    var currorderLocName = "";
    function validateField(currObj, currField) {

        if (currField == "supplier") {
            currSupplierName = currObj.supplierName;
        }
        else if (currField == "orderLocation") {
            currorderLocName = currObj.orderLocName;
        }

        if (currSupplierName != "" && currSupplierName != undefined && currorderLocName != "" && currorderLocName != undefined) {
            $scope.createPoDisable = false;
           
        }

        if (currSupplierName != "" && currSupplierName != undefined) {
            $scope.isSupplierSelected = false;
        }
    }

    var redirectToPo = false;
    $scope.createPoCallback = function () {
        if ($scope.createPoDisable == false) {
            redirectToPo = true;
            $scope.flipToPoPopup = false;
        }
    }

    $scope.popupCloseOverlay = function () {
        if (redirectToPo == true) {
            $state.go('p2p.order.new');
        }
    }

    $scope.flipToPoSupplierOptions = [
        {
            "supplierId": 1,
            "supplierName": "Dell",
        },
        {
            "supplierId": 2,
            "supplierName": "Apple",
        },
        {
            "supplierId": 3,
            "supplierName": "Lenovo",
        },
        {
            "supplierId": 4,
            "supplierName": "HP",
        },
        {
            "supplierId": 5,
            "supplierName": "Acer",
        },
        {
            "supplierId": 6,
            "supplierName": "Compaq",
        },
        {
            "supplierId": 7,
            "supplierName": "Asus",
        }
    ];
    $scope.selectedFlipToPoSupplier = "";

    $scope.flipToPoOrderLocOptions = [
        {
            "orderLocId": 1,
            "orderLocName": "Mumbai",
        },
        {
            "orderLocId": 2,
            "orderLocName": "Hyderabad",
        },
        {
            "orderLocId": 3,
            "orderLocName": "Pune",
        },
        {
            "orderLocId": 4,
            "orderLocName": "Bangalore",
        },
        {
            "orderLocId": 5,
            "orderLocName": "Delhi",
        },
        {
            "orderLocId": 6,
            "orderLocName": "Chennai",
        },
        {
            "orderLocId": 7,
            "orderLocName": "Kerla",
        }
    ];
    $scope.selectedFlipToPoOrderLoc = "";

	//Assign - Reassign Pop up
    $scope.assignPopup = false;
    $scope.assignPopupCallback = function (title) {
    	$scope.assignPopup = true;
    	$scope.popupTitle = title;
    };
    $scope.assignPopupOnHideCallback = function (e) {
    	$scope.assignPopup = false;
    };

    $scope.buyerOptions = [
        {
        	"buyerId": 1,
        	"buyerName": "Michael Slater",
        },
        {
        	"buyerId": 2,
        	"buyerName": "Jammie Foster",
        },
        {
        	"buyerId": 3,
        	"buyerName": "John Doe",
        },
        {
        	"buyerId": 4,
        	"buyerName": "Ozborne Lopez"
        }
    ];
    $scope.selectedBuyer = "";
    $scope.buyerSelected = true;

    $scope.assignBuyer = function (e) {
    	$scope.selectedBuyer = e;
    	$scope.buyerSelected = false;
    }

    $scope.onLookupClose = function (response) {
    	if (response.result != null) {
    		$scope.selectedBuyer = response.result;
    		$scope.buyerSelected = false;
    	}
    	$scope.assignPopupCallback($scope.popupTitle);
    }

	$scope.assignCallback = function () {
		if (!$scope.buyerSelected)
		$scope.assignPopup = false;
	}
	//Assign - Reassign Pop up ends
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

    /* FILTER POPOVER in TEMPLATE POPUP STARTS */
    $scope.closePopOver = function () {
        angular.element(document).triggerHandler('click');
    };
    /* FILTER POPOVER in TEMPLATE POPUP ENDS */
   
    //requisition -- cancel link -- wanrning notification
    $scope.cancelLinkFn = function () {
        var confi = {
            type: "warning",
            message: "<p class='left-align'>There are unsaved changes, are you sure you want to cancel the changes?</p>",
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
                window.history.back();
            } else {
                return;
            }
        });
    }

    $notification.init(30000);

    // popup -- copy req
    $scope.uiGridVisibility = false;
    $scope.validateAccountUrl = "shared/popup/views/popupValidateBudgetSplitAccount.html";
    $scope.validateAccountPopup = false;
    $scope.validateAccountCallback = function (e) {
        $scope.validateAccountPopup = true;
        $scope.uiGridVisibility = true
    
    };
    $scope.validateAccountOnHideCallback = function (e) {
        $scope.validateAccountPopup = false;
    };

    $scope.hideSelection = { enableRowSelection: false, enableRowHeaderSelection: false, enablePaginationControls: false, enablePagination:false}

    $scope.validateAccountConfig = [
        {
           
            "field": "accountAssignment",
            "displayName": "Account Assignment",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false  
             },
            "type": "editable"
        },
        {
            "field": "splitAccount",
            "displayName": "Split Account",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "avlFunds",
            "displayName": "Available Funds (USD)",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "period",
            "displayName": "Period",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable"
        },
        {
            "field": "status",
            "displayName": "Status",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable"
        },
    ];

    $scope.validateAccountModel = [
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed",
          

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        }
    ];
}

// itemDetail start

function mdmNewItemDetailCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce, $interval, $notification, storeService, $window, MDMService) {
	MDMService.getFormConfigData();
	$scope.status = $state.params.status;
	//$state.params.status = "Submit";
	//alert($scope.status);	
	
	// $scope.status = {
		// "displaytext": "Status",
        // "selectedoption": { "name": "Invited", "isdisabled": false, "description": "This is Invited", "approved": true },
        // "options": [
			// { "name": "Approved", "isdisabled": true, "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines", "approved": true },
			// { "name": "Disqualified", "isdisabled": false, "description": "This is disqualified", "approved": true },
			// { "name": "Approval Pending", "isdisabled": false, "description": "This is approval pending", "approved": true },
			// { "name": "Identified", "isdisabled": false, "description": "This is identified", "approved": false },
			// { "name": "Invited", "isdisabled": false, "description": "This is Invited", "approved": true },
			// { "name": "Registered", "isdisabled": false, "description": "This is disqualified", "approved": true },
			// { "name": "Waitlisted", "isdisabled": false, "description": "This is Waitlisted", "approved": true }
        // ]
    // };
    
    $scope.categoryOptions = [{
        "code": "$",
        "name": "Deep Groove Ball Bearings"
   }, {
       "code": "€",
       "name": "Ball Thrust Bearings"
   }];
   $scope.selectedCurrency = {};
   $scope.onChange = function(selectedCurrency) {
       console.log(selectedCurrency);
   };

    $scope.id = $state.params.id;
    $scope.mode = $state.params.mode;
    $scope.approvalPending;
    //$scope.status = "DRAFT";
    var getURLwithStatus;
	//console.log("Current State = " + $state.$current.name);
	
	/* READONLY MODE */
	//alert($state.params.mode);
	if($state.params.status === "readonly"){
		$scope.docName = "Create Item12001";
		$scope.showStatus = true;
		$scope.status = 'Pending review';
		urlJson = "mdm/models/createMDM_readonly.json";
		$scope.boreGeo = 'Cylinder';
		$scope.InsideDiameter = '30 mm';
		$scope.outsideDiameter = '62 mm';
		$scope.width = '16 mm';
		$scope.noOfRows = 'Multiple';
		$scope.material = 'Carbon Steel';
		$scope.clearance = 'C3';
		$scope.noOfSeals = '2 Shield'
	} else if($state.params.status === "withdrawn"){
		$scope.docName = "Create Item12001";
		$scope.showStatus = true;
		$scope.status = 'Draft';
		urlJson = "mdm/models/createMDM1.json";
		$scope.boreGeo = 'Cylinder';
		$scope.InsideDiameter = '30 mm';
		$scope.outsideDiameter = '62 mm';
		$scope.width = '16 mm';
		$scope.noOfRows = 'Multiple';
		$scope.material = 'Carbon Steel';
		$scope.clearance = 'C3';
		$scope.noOfSeals = '2 Shield'
	} else if($state.params.status === "saved"){
		$scope.docName = "Create Item12001";
		$scope.showStatus = true;
		$scope.status = 'Draft';
		urlJson = "mdm/models/createMDM_readonly.json";
		$scope.boreGeo = 'Cylinder';
		$scope.InsideDiameter = '30 mm';
		$scope.outsideDiameter = '62 mm';
		$scope.width = '16 mm';
		$scope.noOfRows = 'Multiple';
		$scope.material = 'Carbon Steel';
		$scope.clearance = 'C3';
		$scope.noOfSeals = '2 Shield'
	} else {
		$scope.docName = "REQ-2017122 - AB VOLVO - SUPPLIER RECOMMENDATION";
		$scope.showStatus = false;
		var urlJson = 'mdm/models/itemDetails.json';
		$scope.boreGeo = '';
		$scope.InsideDiameter = '';
		$scope.outsideDiameter = '';
		$scope.width = '';
		$scope.noOfRows = '';
		$scope.material = '';
		$scope.clearance = '';
		$scope.noOfSeals = ''
	}
	/* READONLY MODE END */
	/* SAVE BUTTON */
	$scope.saveDoc = function(){
		$state.go('mdm.new', { status: 'saved'});
	};
	/* SAVE BUTTON END */
	/* CLOSE BUTTON */
	$scope.closeRequest = function(){		
		$state.go('mdm.new', { status: 'withdrawn'});
	}
	/* SAVE BUTTON END */
	
	$scope.baselineRPOpt = {
            "options": [
                { "opt": "Month" },
                { "opt": "Year" }
            ]
        };
        $scope.baselineRP = {
            value: "",
            unit: $scope.baselineRPOpt.options[0]
        };

        $scope.baselineOptions = [
            { "code": "Ys", "title": "Yes" },
            { "code": "No", "title": "No" },
            { "code": "Na", "title": "N/A" }
        ];
        $scope.baseline = $scope.baselineOptions[0];
	
	//var urlJson = ($state.$current.name == "mdm.new") ? 'mdm/models/createReq.json' : ($state.$current.name == "mdm.new?readonly") ? 'mdm/models/createReq.json';
    if ($scope.id == 1) {
        $scope.approvalPending = true
        $scope.status = "approval Pending";
        getURLwithStatus = urlJson

    }
    else {
        $scope.approvalPending = false;
        //$scope.status = "DRAFT";
        getURLwithStatus = urlJson

    }
	
	/* SUBMIT BUTTON */
	$scope.submitItem01 = function () {
		$state.go('mdm.new', { status: 'success'});
        // var confi = {
            // type: "success",
            // message: "<p class='left-align'>Item Request has been submitted successfully.</p>",

            // buttons: [
				// {
				    // "title": "YES",
				    // "result": "yes"
				// },
				// {
				    // "title": "Stay on same page",
				    // "result": "no"
				// }
            // ]
        // };

        // //Notification call
        // notification.notify(confi, function (responce) {
            // if (responce.result == "yes") {
				// $state.go('mdm.checkDuplicate', { status: 'readonly'});
				
            // } else {
                // return;
            // }
        // });
    }
	/* SUBMIT BUTTON ENDS */
	/* WITHDRAW BUTTON */
	$scope.withdrawRequest = function () {		
        var confi = {
            type: "warning",
            message: "<p class='left-align'>Are you sure you want to withdraw the Item Request ITEM 12001?</p>",

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
				$state.go('mdm.new', { status: 'withdrawn'});
				
            } else {
                return;
            }
        });
    }
	/* WITHDRAW BUTTON ENDS */
	

    $scope.getStatus = $state.params.status;
    if ($scope.getStatus == "sendforapproval") {
        $scope.sendForApproval = true;
    }
    else {
        $scope.sendForApproval = false;
    }

    $scope.typeOptions = [
            {
                "UserId": 28360,
                "UserName": "SRUser1@outlook.com",
                "FirstName": "John",
                "LastName": "Doe"
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
    $scope.selectedLegalEntity = $scope.typeOptions[0];
    $scope.selectedCreateOnBehalf = $scope.typeOptions[0];

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
	
	$scope.categoryList = {
            "displaytext": "Category",
            "selectedoption": { "name": "Choose Category", "isdisabled": false, "description": "This is Invited", "approved": true },
            "options": [
				{ "name": "Deep Groove Ball Bearings", "isdisabled": false, "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines", "approved": true },
				{ "name": "Disqualified", "isdisabled": false, "description": "This is disqualified", "approved": true }
				// ,
				// { "name": "Approval Pending", "isdisabled": false, "description": "This is approval pending", "approved": true },
				// { "name": "Identified", "isdisabled": false, "description": "This is identified", "approved": false },
				// { "name": "Invited", "isdisabled": false, "description": "This is Invited", "approved": true },
				// { "name": "Registered", "isdisabled": false, "description": "This is disqualified", "approved": true },
				// { "name": "Waitlisted", "isdisabled": false, "description": "This is Waitlisted", "approved": true }
            ]
        };
        $scope.selectTypeOption = {
            "name": "status",
            "selectiontext": "Invited"
        };
		
		//console.log($scope.status.selectedoption.name);
		
		$scope.reasonPoup = function(e){			
			//console.log(data);
			
			if (e.btnType == "save"){
				//alert("CLICKED");
				if($scope.categoryList.selectedoption.name === "Deep Groove Ball Bearings"){
					alert("APPROVED");
				} else {
					alert("DISQUALIFIED");
				}
			}
			
			
		}
		
		

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
    
	
	

    $scope.createBlanket = function(){
        $state.go('contract.new', {mode: 'blanket'});
    }
    var isSequenceToBeMaintained;

    /*
	 *  Service call get form-config and data-model
	 */

    var req = {
        method: 'GET',
        url: getURLwithStatus
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
        if (storeService.get('isViewLineItem')) {
            for (var i = 0; i < $scope.config.sections[0].rows[0].properties[0].length; i++) {
                $scope.config.sections[0].rows[0].properties[i].focus = false;
            }
            $scope.config.sections[4].isActive = true;
            $timeout(function () {               
                var lineDetailsOffsetTop = angular.element('.card.cardParent[label="LINES DETAILS"]').offset().top;
                $window.scrollTo(0, lineDetailsOffsetTop);                
            },500);            
        }
        $scope.$watch('dataModel', function (n, o) {
        }, true);
    }, function (error) {
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
        url: 'mdm/models/createReq.json'
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

    $scope.goToTracksatusDetail = function (e) {
        $scope.heightTrackStatus = '100%';
        $scope.isFullscreen = !$scope.isFullscreen;
    }
    $scope.showCommentsPopupexpand = "expandCommentPopupCC";

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
        $scope.showCommentsPopup = false;
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


    // popup -- copy req data
    $scope.copyReqData = [
        {
            label: "Accounting",
            isChecked: true
        },
        {
            label: "Comments",
            isChecked: false
        },
        {
            label: "Notes & Attachments",
            isChecked: false
        }
    ]

    // popup -- copy req
    $scope.copyReqPopupUrl = "p2p/shared/views/popupCopyReq.html";
    $scope.copyReqPopup = false;
    $scope.copyReqPopupCallback = function (e) {
        $scope.copyReqPopup = true;
    };
    $scope.copyReqOnHideCallback = function (e) {
        $scope.copyReqPopup = false;
    };

  
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

    // popup -- Create PO 
    $scope.flipToPoPopupUrl = "p2p/shared/views/popupFlipToPo.html";
    $scope.flipToPoPopup = false;
    $scope.flipToPoCallback = function (e) {
        $scope.flipToPoPopup = true;
    };
    $scope.flipToPoOnHideCallback = function (e) {
        $scope.flipToPoPopup = false;
    };

    $scope.onFlipToPoSupplierLookUpHide = function (currSelected) {
        $scope.flipToPoPopup = true;
        validateField(currSelected.result, "supplier");
    }

    $scope.onFlipToPoSupplierLookUpShow = function () {
        $scope.flipToPoPopup = false;
    }

    $scope.onFlipToPoOrderLocLookUpHide = function (currSelected) {
        $scope.flipToPoPopup = true;
        validateField(currSelected.result, "orderLocation");
    }

    $scope.onFlipToPoOrderLocLookUpShow = function () {
        $scope.flipToPoPopup = false;
    }

    $scope.createPoDisable = true;
    $scope.isSupplierSelected = true;
    var currSupplierName = "";
    var currorderLocName = "";
    function validateField(currObj, currField) {

        if (currField == "supplier") {
            currSupplierName = currObj.supplierName;
        }
        else if (currField == "orderLocation") {
            currorderLocName = currObj.orderLocName;
        }

        if (currSupplierName != "" && currSupplierName != undefined && currorderLocName != "" && currorderLocName != undefined) {
            $scope.createPoDisable = false;
           
        }

        if (currSupplierName != "" && currSupplierName != undefined) {
            $scope.isSupplierSelected = false;
        }
    }

    var redirectToPo = false;
    $scope.createPoCallback = function () {
        if ($scope.createPoDisable == false) {
            redirectToPo = true;
            $scope.flipToPoPopup = false;
        }
    }

    $scope.popupCloseOverlay = function () {
        if (redirectToPo == true) {
            $state.go('p2p.order.new');
        }
    }

    $scope.flipToPoSupplierOptions = [
        {
            "supplierId": 1,
            "supplierName": "Dell",
        },
        {
            "supplierId": 2,
            "supplierName": "Apple",
        },
        {
            "supplierId": 3,
            "supplierName": "Lenovo",
        },
        {
            "supplierId": 4,
            "supplierName": "HP",
        },
        {
            "supplierId": 5,
            "supplierName": "Acer",
        },
        {
            "supplierId": 6,
            "supplierName": "Compaq",
        },
        {
            "supplierId": 7,
            "supplierName": "Asus",
        }
    ];
    $scope.selectedFlipToPoSupplier = "";

    $scope.flipToPoOrderLocOptions = [
        {
            "orderLocId": 1,
            "orderLocName": "Mumbai",
        },
        {
            "orderLocId": 2,
            "orderLocName": "Hyderabad",
        },
        {
            "orderLocId": 3,
            "orderLocName": "Pune",
        },
        {
            "orderLocId": 4,
            "orderLocName": "Bangalore",
        },
        {
            "orderLocId": 5,
            "orderLocName": "Delhi",
        },
        {
            "orderLocId": 6,
            "orderLocName": "Chennai",
        },
        {
            "orderLocId": 7,
            "orderLocName": "Kerla",
        }
    ];
    $scope.selectedFlipToPoOrderLoc = "";

	//Assign - Reassign Pop up
    $scope.assignPopup = false;
    $scope.assignPopupCallback = function (title) {
    	$scope.assignPopup = true;
    	$scope.popupTitle = title;
    };
    $scope.assignPopupOnHideCallback = function (e) {
    	$scope.assignPopup = false;
    };

    $scope.buyerOptions = [
        {
        	"buyerId": 1,
        	"buyerName": "Michael Slater",
        },
        {
        	"buyerId": 2,
        	"buyerName": "Jammie Foster",
        },
        {
        	"buyerId": 3,
        	"buyerName": "John Doe",
        },
        {
        	"buyerId": 4,
        	"buyerName": "Ozborne Lopez"
        }
    ];
    $scope.selectedBuyer = "";
    $scope.buyerSelected = true;

    $scope.assignBuyer = function (e) {
    	$scope.selectedBuyer = e;
    	$scope.buyerSelected = false;
    }

    $scope.onLookupClose = function (response) {
    	if (response.result != null) {
    		$scope.selectedBuyer = response.result;
    		$scope.buyerSelected = false;
    	}
    	$scope.assignPopupCallback($scope.popupTitle);
    }

	$scope.assignCallback = function () {
		if (!$scope.buyerSelected)
		$scope.assignPopup = false;
	}
	//Assign - Reassign Pop up ends
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

    /* FILTER POPOVER in TEMPLATE POPUP STARTS */
    $scope.closePopOver = function () {
        angular.element(document).triggerHandler('click');
    };
    /* FILTER POPOVER in TEMPLATE POPUP ENDS */
   
    //requisition -- cancel link -- wanrning notification
    $scope.cancelLinkFn = function () {
        var confi = {
            type: "warning",
            message: "<p class='left-align'>There are unsaved changes, are you sure you want to cancel the changes?</p>",
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
                window.history.back();
            } else {
                return;
            }
        });
    }

    $notification.init(30000);

    // popup -- copy req
    $scope.uiGridVisibility = false;
    $scope.validateAccountUrl = "shared/popup/views/popupValidateBudgetSplitAccount.html";
    $scope.validateAccountPopup = false;
    $scope.validateAccountCallback = function (e) {
        $scope.validateAccountPopup = true;
        $scope.uiGridVisibility = true
    
    };
    $scope.validateAccountOnHideCallback = function (e) {
        $scope.validateAccountPopup = false;
    };

    $scope.hideSelection = { enableRowSelection: false, enableRowHeaderSelection: false, enablePaginationControls: false, enablePagination:false}

    $scope.validateAccountConfig = [
        {
           
            "field": "accountAssignment",
            "displayName": "Account Assignment",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false  
             },
            "type": "editable"
        },
        {
            "field": "splitAccount",
            "displayName": "Split Account",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "avlFunds",
            "displayName": "Available Funds (USD)",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "period",
            "displayName": "Period",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable"
        },
        {
            "field": "status",
            "displayName": "Status",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": false
            },
            "type": "editable"
        },
    ];

    $scope.validateAccountModel = [
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed",
          

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        },
        {
            "accountAssignment": "",
            "splitAccount": 1233000,
            "avlFunds": 6301,
            "period": "Quarter1-2017-Quarter",
            "status": "Failed"

        }
    ];
}


function MDMServiceFn($http, $q, $window, $timeout){ 
	//return function(msg){  alert(msg); }  
	// Function returns the form widget config data for PPST module
        this.getFormConfigData = function () {
            var url = 'mdm/models/itemDetails.json';
             return $http.get(url).then(function (respData) {
                return  respData.data;
				console.log(respData.data);
            }).catch(function (error) {
                return error;
            });
        }
	
	
} 
