angular.module('SMART2')
    .service('MDMService', ['$http', '$q', '$window', '$timeout', MDMServiceFn])
    .controller('mdmCreateNewCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', 'MDMService', mdmCreateNewCtrlFunc])
    .controller('mdmNewItemDetailCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', 'MDMService', 'storeService', mdmNewItemDetailCtrlFunc])
    .controller('historicalCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', 'MDMService', historicalCtrlFunc])
    // .controller('MDMBasicDetailsCtrl', ['$scope', '$rootScope', '$state', '$http', '$timeout', 'lookup', MDMBasicDetailsCtrlFunc])
    .controller('costSummaryGraphCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', 'MDMService', costSummaryGraphCtrlFunc])



function mdmCreateNewCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce, $interval, $notification, storeService, $window, MDMService, storeService) {
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
    $scope.onChange = function (selectedCurrency) {
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
    if ($state.params.status === "readonly") {
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
    } else if ($state.params.status === "withdrawn") {
        $scope.docName = "Create Item12001";
        $scope.showStatus = true;
        $scope.status = 'Draft';
        urlJson = "mdm/models/createMDM.json";
        $scope.boreGeo = 'Cylinder';
        $scope.InsideDiameter = '30 mm';
        $scope.outsideDiameter = '62 mm';
        $scope.width = '16 mm';
        $scope.noOfRows = 'Multiple';
        $scope.material = 'Carbon Steel';
        $scope.clearance = 'C3';
        $scope.noOfSeals = '2 Shield'
    } else if ($state.params.status === "saved") {
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
        $scope.docName = "P678 053 3116 - Part Details";
        $scope.showStatus = false;
        var urlJson = 'mdm/models/createMDM.json';
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
    $scope.saveDoc = function () {
        $state.go('mdm.new', {
            status: 'saved'
        });
    };
    /* SAVE BUTTON END */
    /* CLOSE BUTTON */
    $scope.closeRequest = function () {
        $state.go('mdm.new', {
            status: 'withdrawn'
        });
    }
    /* SAVE BUTTON END */

    $scope.baselineRPOpt = {
        "options": [{
                "opt": "Month"
            },
            {
                "opt": "Year"
            }
        ]
    };
    $scope.baselineRP = {
        value: "",
        unit: $scope.baselineRPOpt.options[0]
    };

    $scope.baselineOptions = [{
            "code": "Ys",
            "title": "Yes"
        },
        {
            "code": "No",
            "title": "No"
        },
        {
            "code": "Na",
            "title": "N/A"
        }
    ];
    $scope.baseline = $scope.baselineOptions[0];

    //var urlJson = ($state.$current.name == "mdm.new") ? 'mdm/models/createReq.json' : ($state.$current.name == "mdm.new?readonly") ? 'mdmmodels/createReq.json';
    if ($scope.id == 1) {
        $scope.approvalPending = true
        $scope.status = "approval Pending";
        getURLwithStatus = urlJson

    } else {
        $scope.approvalPending = false;
        //$scope.status = "DRAFT";
        getURLwithStatus = urlJson

    }

    /* SUBMIT BUTTON */
    $scope.submitItem01 = function () {
        $state.go('mdm.new', {
            status: 'success'
        });
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

            buttons: [{
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
                $state.go('mdm.new', {
                    status: 'withdrawn'
                });

            } else {
                return;
            }
        });
    }
    /* WITHDRAW BUTTON ENDS */


    $scope.getStatus = $state.params.status;
    if ($scope.getStatus == "sendforapproval") {
        $scope.sendForApproval = true;
    } else {
        $scope.sendForApproval = false;
    }

    $scope.typeOptions = [{
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
    }];
    $scope.selectedLegalEntity = $scope.typeOptions[0];
    $scope.selectedCreateOnBehalf = $scope.typeOptions[0];

    $scope.contractNumOptions = [{
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
        "selectedoption": {
            "name": "Choose Category",
            "isdisabled": false,
            "description": "This is Invited",
            "approved": true
        },
        "options": [{
                "name": "Deep Groove Ball Bearings",
                "isdisabled": false,
                "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines",
                "approved": true
            },
            {
                "name": "Disqualified",
                "isdisabled": false,
                "description": "This is disqualified",
                "approved": true
            }
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

    $scope.reasonPoup = function (e) {
        //console.log(data);

        if (e.btnType == "save") {
            //alert("CLICKED");
            if ($scope.categoryList.selectedoption.name === "Deep Groove Ball Bearings") {
                alert("APPROVED");
            } else {
                alert("DISQUALIFIED");
            }
        }


    }



    /*section search content start*/
    $scope.sectionAndFieldsDetails = [{
            'name': 'Section One',
            'contentIn': ''
        },
        {
            'name': 'Section Two',
            'contentIn': ''
        },
        {
            'name': 'Section Three',
            'contentIn': ''
        },
        {
            'name': 'Section Four',
            'contentIn': ''
        },
        {
            'name': 'Section Five',
            'contentIn': ''
        },
        {
            'name': 'Section Six',
            'contentIn': ''
        },
        {
            'name': 'Section Seven',
            'contentIn': ''
        },
        {
            'name': 'Shipping',
            'contentIn': ''
        },
        {
            'name': 'Shipping to',
            'contentIn': 'In Shipping'
        },
        {
            'name': 'Ship to Address',
            'contentIn': 'In Shipping'
        }
    ]
    /*section search content end*/

    $scope.showPreview = function () {

        $state.go('p2p.req.preview');
    }
    $scope.topValueSectionTrack = 115;




    $scope.createBlanket = function () {
        $state.go('contract.new', {
            mode: 'blanket'
        });
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
            }, 500);
        }
        $scope.$watch('dataModel', function (n, o) {}, true);
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
        } else if (checkindex == 2) {
            return $scope.slideDataIndexTemp.second
        } else if (checkindex == 3) {
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
        } else {
            $scope.slideHide1 = false;
        }

        if ($scope.slide2 == 'slide-prev' || $scope.slide2 == 'slide-next') {
            $scope.slideHide2 = true;
        } else {
            $scope.slideHide2 = false;
        }

        if ($scope.slide3 == 'slide-prev' || $scope.slide3 == 'slide-next') {
            $scope.slideHide3 = true;
        } else {
            $scope.slideHide3 = false;
        }
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
        } else if ($scope.slide2 == 'slide-current') {
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
        } else if ($scope.slide3 == 'slide-current') {
            $scope.slide3 = 'slide-prev';
        } else {
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
        $scope.commentIcon = '#icon_Commented'; //icon_Comments
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
    }];
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


    $scope.attachmentList = [{
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

    $scope.modules = [{
            id: '0',
            name: 'REQUISITION',
            count: '3',
            number: 'REQ-2016.013110',
            url: 'requisition.html',
            isChecked: false
        },
        {
            id: '2',
            name: 'ORDER',
            count: '4',
            number: 'ORD-2015.523209',
            url: 'order.html',
            isChecked: false
        },
        {
            id: '3',
            name: 'INVOICE RECONCILIATION',
            count: '8',
            number: 'IR-2016.234829',
            url: 'invoice.html',
            isChecked: false
        },
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
    $scope.copyReqData = [{
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

    $scope.suggestedData = [{
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
        } else if (currField == "orderLocation") {
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

    $scope.flipToPoSupplierOptions = [{
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

    $scope.flipToPoOrderLocOptions = [{
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

    $scope.buyerOptions = [{
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
    $scope.taxConfig = [{
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
            buttons: [{
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

    $scope.hideSelection = {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enablePaginationControls: false,
        enablePagination: false
    }

    $scope.validateAccountConfig = [{

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

    $scope.validateAccountModel = [{
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
    $scope.onChange = function (selectedCurrency) {
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
    if ($state.params.status === "readonly") {
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
    } else if ($state.params.status === "withdrawn") {
        $scope.docName = "Create Item12001";
        $scope.showStatus = true;
        $scope.status = 'Draft';
        urlJson = "mdm/models/createMDM.json";
        $scope.boreGeo = 'Cylinder';
        $scope.InsideDiameter = '30 mm';
        $scope.outsideDiameter = '62 mm';
        $scope.width = '16 mm';
        $scope.noOfRows = 'Multiple';
        $scope.material = 'Carbon Steel';
        $scope.clearance = 'C3';
        $scope.noOfSeals = '2 Shield'
    } else if ($state.params.status === "saved") {
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
        $scope.docName = "Parts - Supplier Association";
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
    $scope.saveDoc = function () {
        $state.go('mdm.new', {
            status: 'saved'
        });
    };
    /* SAVE BUTTON END */
    /* CLOSE BUTTON */
    $scope.closeRequest = function () {
        $state.go('mdm.new', {
            status: 'withdrawn'
        });
    }
    /* SAVE BUTTON END */

    $scope.baselineRPOpt = {
        "options": [{
                "opt": "Month"
            },
            {
                "opt": "Year"
            }
        ]
    };
    $scope.baselineRP = {
        value: "",
        unit: $scope.baselineRPOpt.options[0]
    };

    $scope.baselineOptions = [{
            "code": "Ys",
            "title": "Yes"
        },
        {
            "code": "No",
            "title": "No"
        },
        {
            "code": "Na",
            "title": "N/A"
        }
    ];
    $scope.baseline = $scope.baselineOptions[0];

    //var urlJson = ($state.$current.name == "mdm.new") ? 'mdm/models/createReq.json' : ($state.$current.name == "mdm.new?readonly") ? 'mdm/models/createReq.json';
    if ($scope.id == 1) {
        $scope.approvalPending = true
        $scope.status = "approval Pending";
        getURLwithStatus = urlJson

    } else {
        $scope.approvalPending = false;
        //$scope.status = "DRAFT";
        getURLwithStatus = urlJson

    }

    /* SUBMIT BUTTON */
    $scope.submitItem01 = function () {
        $state.go('mdm.new', {
            status: 'success'
        });
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

            buttons: [{
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
                $state.go('mdm.new', {
                    status: 'withdrawn'
                });

            } else {
                return;
            }
        });
    }
    /* WITHDRAW BUTTON ENDS */


    $scope.getStatus = $state.params.status;
    if ($scope.getStatus == "sendforapproval") {
        $scope.sendForApproval = true;
    } else {
        $scope.sendForApproval = false;
    }

    $scope.typeOptions = [{
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
    }];
    $scope.selectedLegalEntity = $scope.typeOptions[0];
    $scope.selectedCreateOnBehalf = $scope.typeOptions[0];

    $scope.contractNumOptions = [{
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
        "selectedoption": {
            "name": "Choose Category",
            "isdisabled": false,
            "description": "This is Invited",
            "approved": true
        },
        "options": [{
                "name": "Deep Groove Ball Bearings",
                "isdisabled": false,
                "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines",
                "approved": true
            },
            {
                "name": "Disqualified",
                "isdisabled": false,
                "description": "This is disqualified",
                "approved": true
            }
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

    $scope.reasonPoup = function (e) {
        //console.log(data);

        if (e.btnType == "save") {
            //alert("CLICKED");
            if ($scope.categoryList.selectedoption.name === "Deep Groove Ball Bearings") {
                alert("APPROVED");
            } else {
                alert("DISQUALIFIED");
            }
        }


    }



    /*section search content start*/
    $scope.sectionAndFieldsDetails = [{
            'name': 'Section One',
            'contentIn': ''
        },
        {
            'name': 'Section Two',
            'contentIn': ''
        },
        {
            'name': 'Section Three',
            'contentIn': ''
        },
        {
            'name': 'Section Four',
            'contentIn': ''
        },
        {
            'name': 'Section Five',
            'contentIn': ''
        },
        {
            'name': 'Section Six',
            'contentIn': ''
        },
        {
            'name': 'Section Seven',
            'contentIn': ''
        },
        {
            'name': 'Shipping',
            'contentIn': ''
        },
        {
            'name': 'Shipping to',
            'contentIn': 'In Shipping'
        },
        {
            'name': 'Ship to Address',
            'contentIn': 'In Shipping'
        }
    ]
    /*section search content end*/

    $scope.showPreview = function () {

        $state.go('p2p.req.preview');
    }
    $scope.topValueSectionTrack = 115;




    $scope.createBlanket = function () {
        $state.go('contract.new', {
            mode: 'blanket'
        });
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
            }, 500);
        }
        $scope.$watch('dataModel', function (n, o) {}, true);
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
        } else if (checkindex == 2) {
            return $scope.slideDataIndexTemp.second
        } else if (checkindex == 3) {
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
        } else {
            $scope.slideHide1 = false;
        }

        if ($scope.slide2 == 'slide-prev' || $scope.slide2 == 'slide-next') {
            $scope.slideHide2 = true;
        } else {
            $scope.slideHide2 = false;
        }

        if ($scope.slide3 == 'slide-prev' || $scope.slide3 == 'slide-next') {
            $scope.slideHide3 = true;
        } else {
            $scope.slideHide3 = false;
        }
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
        } else if ($scope.slide2 == 'slide-current') {
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
        } else if ($scope.slide3 == 'slide-current') {
            $scope.slide3 = 'slide-prev';
        } else {
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
        $scope.commentIcon = '#icon_Commented'; //icon_Comments
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
    }];
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


    $scope.attachmentList = [{
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

    $scope.modules = [{
            id: '0',
            name: 'REQUISITION',
            count: '3',
            number: 'REQ-2016.013110',
            url: 'requisition.html',
            isChecked: false
        },
        {
            id: '2',
            name: 'ORDER',
            count: '4',
            number: 'ORD-2015.523209',
            url: 'order.html',
            isChecked: false
        },
        {
            id: '3',
            name: 'INVOICE RECONCILIATION',
            count: '8',
            number: 'IR-2016.234829',
            url: 'invoice.html',
            isChecked: false
        },
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
    $scope.copyReqData = [{
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

    $scope.suggestedData = [{
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
        } else if (currField == "orderLocation") {
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

    $scope.flipToPoSupplierOptions = [{
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

    $scope.flipToPoOrderLocOptions = [{
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

    $scope.buyerOptions = [{
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
    $scope.taxConfig = [{
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
            buttons: [{
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

    $scope.hideSelection = {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enablePaginationControls: false,
        enablePagination: false
    }

    $scope.validateAccountConfig = [{

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

    $scope.validateAccountModel = [{
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

function historicalCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce, $interval, $notification, storeService, $window, MDMService) {

    //Table below the highcharts


    $scope.goToPage = function (e, ind) {
        if (ind == 0) {
            $state.go('p2p.serviceConfirmation.tasklist');
            $state.newUrl = 'service';
        }
    }


    $scope.onChangeTeamMember = function (check) {

    }

    $scope.costSourceOptions = [{
            "name": "Market Index"
        }, {
            "name": "Manual"
        },
        {
            "name": "Historical"
        },
        {
            "name": "Computed"
        },
    ];

    $scope.selectedCostSource1 = {
        "name": "Manual"
    };

    $scope.dataSourceOptions2 = [{
        "name": "None"
    },
    {
        "name": "GEP FTL NA Price Database"
    }
];

    if ($state.current.name == 'mdm.itemDetailsOne' && !$state.viewScenario) {
        
        $scope.historyList = [{
                'sequence': '1',
                'Product': 'Labor',
                'costelem': 'LBS',
                'value': '11.25',
                'currency': 'SEK',
                'questval': '63,258.51',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '2',
                'Product': 'Material',
                'costelem': 'OZ',
                'value': '0.90',
                'currency': 'SEK',
                'questval': '1,050.00',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '3',
                'Product': 'Equipment',
                'costelem': 'LBS',
                'value': '28.80',
                'currency': 'SEK',
                'questval': '36,160.00',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '4',
                'Product': 'Overheads',
                'costelem': 'OZ',
                'value': '10.89',
                'currency': 'SEK',
                'questval': '6,500.00',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '5',
                'Product': 'Sub-contractor',
                'costelem': 'OZ',
                'value': '10.89',
                'currency': 'SEK',
                'questval': '47,700.00',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            }
        ];
    } else if (!$state.productNameKetchup && !$state.productNameFuleHouse && !$state.productNameAcrylonitrile && !$state.productNamePretzelAnalysis && !$state.productNameMilk && !$state.productNameFoldingCartons) {
        $scope.dataSourceOptions2 = [{
            "name": "None"
        },
        {
            "name": "GEP FTL NA Price Database"
        }
    ];
        $scope.historyList = [
            {
                'sequence': '1',
                'Product': 'Production Cost',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '820' : '3485',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "None"
                }
            },
            {
                'sequence': '2',
                'Product': 'Shipping Cost',
                'costelem': 'OZ',
                'value': $state.showNewGraph ? '615' : '1000',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "GEP FTL NA Price Database"
                }
            },
            {
                'sequence': '3',
                'Product': 'Margin',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '410' : '500',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "None"
                }
            }
        ];
    } else if ($state.productNameMilk) {
        $scope.historyList = [{
                'sequence': '1',
                'Product': 'Feed and Cattle Costs',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '820' : '7.595',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '2',
                'Product': 'Operating Costs',
                'costelem': 'OZ',
                'value': $state.showNewGraph ? '615' : '2.015',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '3',
                'Product': 'Overhead Costs',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '410' : '3.72',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '4',
                'Product': 'Labor Costs',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '410' : '1.085',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '5',
                'Product': 'Margin',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '410' : '1.085',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            }
        ];
    }
    else if ($state.productNameFoldingCartons) {
        $scope.dataSourceOptions = [{
            "name": "None"
        },
        {
            "name": "GEP FTL NA Price Database"
        }];

        $scope.historyList = [
            {
                'sequence': '1',
                'Product': 'Production Cost',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '820' : '3485',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "None"
                }
            },
            {
                'sequence': '2',
                'Product': 'Shipping Cost',
                'costelem': 'OZ',
                'value': $state.showNewGraph ? '615' : '1000',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "GEP FTL NA Price Database"
                }
            },
            {
                'sequence': '3',
                'Product': 'Margin',
                'costelem': 'LBS',
                'value': $state.showNewGraph ? '410' : '500',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "None"
                }
            }
        ];
    } else if ($state.productNameKetchup) {
        $scope.historyList = [{
                'sequence': '1',
                'Product': 'Production Cost',
                'costelem': 'LBS',
                'value': '$0.55',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '2',
                'Product': 'Shipment Cost',
                'costelem': 'OZ',
                'value': '$0.12',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '3',
                'Product': 'Margin',
                'costelem': 'LBS',
                'value': '$0.15',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            }
        ];
    } else if ($state.productNameFuleHouse) {
        $scope.historyList = [{
                'sequence': '1',
                'Product': 'Tooling Cost',
                'costelem': 'LBS',
                'value': '4.32',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '2',
                'Product': 'Development Cost',
                'costelem': 'OZ',
                'value': '2.1',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            },
            {
                'sequence': '3',
                'Product': 'Shipping Cost',
                'costelem': 'LBS',
                'value': '1.68',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false
            }
        ];
    } else if ($state.productNamePretzelAnalysis) {
        $scope.historyList = [{
                'sequence': '1',
                'Product': 'Shipping Cost',
                'costelem': 'LBS',
                'value': '0.23',
                'Yeild': '0%',
                'UMO': 'EA',
                'quntity': '1',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Manual"
                },
                'isChecked': false,
                'type': 'TOLL',
                'unitPrize': ''
            },
            {
                'sequence': '2',
                'Product': 'Packaging Cost',
                'costelem': 'LBS',
                'value': '0.0002',
                'Yeild': '',
                'UMO': 'EA',
                'quntity': '',
                'currency': 'SEK',
                'isChecked': false,
                selectedCostSource1: {
                    "name": "Computed"
                },
                'type': 'PACKAGING',
                'unitPrize': ''
            }
        ];
    } else if ($state.productNameAcrylonitrile && !$state.viewScenario) {
        $scope.costSourceOptions = [{
                "name": "Market Index"
            }, {
                "name": "Computed"
            },
            {
                "name": "Subscription Feed"
            },
            {
                "name": "Manual"
            },
        ];
        $scope.selectedCostSource = {
            "name": "Subscription Feed"
        };
        $scope.dataSourceOptions = [{
                "name": "Freight OS (Subscription)"
            },
            {
                "name": "GEP FTL NA Price Database"
            },
            {
                "name": "GEP LTL EU Price Database"
            }

        ];
        $scope.selectedDataSource = {
            "name": "GEP FTL NA Price Database"
        };
        $scope.historyList = [{
                'sequence': '1',
                'Product': 'Production Cost',
                'costelem': 'LBS',
                'value': '0.3238',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": ""
                },
            },
            {
                'sequence': '2',
                'Product': 'Shipping Cost',
                'costelem': 'OZ',
                'value': '0.0300',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "GEP FTL NA Price Database"
                },
            },
            {
                'sequence': '3',
                'Product': 'Margin',
                'costelem': 'LBS',
                'value': '0.0864',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": ""
                },
            }
        ];
    } else if ($state.current.name == 'mdm.itemDetailsOne' && $state.viewScenario) {

        $scope.costSourceOptions = [{
                "name": "Market Index"
            },
            {
                "name": "Computed"
            },
            {
                "name": "Subscription Feed"
            },
            {
                "name": "Manual"
            },
        ];
        $scope.selectedCostSource = {
            "name": "Subscription Feed"
        };

        $scope.dataSourceOptions = [{
                "name": "Freight OS (Subscription)"
            }, {
                "name": "GEP FTL NA Price Database"
            },
            {
                "name": "GEP LTL EU Price Database"
            }

        ];
        $scope.selectedDataSource = {
            "name": "GEP FTL NA Price Database"
        };

        $scope.historyList = [{
                'sequence': '1',
                'Product': 'Production Cost',
                'costelem': 'LBS',
                'questval': '0.4177',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": ""
                },
            },
            {
                'sequence': '2',
                'Product': 'Shipping Cost',
                'costelem': 'OZ',
                'questval': '0.0300',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": "GEP FTL NA Price Database"
                },
            },
            {
                'sequence': '3',
                'Product': 'Margin',
                'costelem': 'LBS',
                'questval': '0.1001',
                'currency': 'SEK',
                selectedCostSource1: {
                    "name": "Computed"
                },
                'isChecked': false,
                selectedDataSource: {
                    "name": ""
                },
            }
        ];
    }






    $scope.addConversionRow = function () {
        $scope.historyList.push({
            sequence: $scope.historyList.length + 1,
            Product: 'Select Product',
            costelem: '--',
            value: '--',
            currency: '--',
            selectedCostSource1: {
                "name": "--"
            }

        });
    }
    var tempCategoryNode_PAS = ['851750000001'];
    var tempBUNode_PAS = [];
    var tempRegionNode_PAS = [];

    $scope.treeComponentConfig = {
        isRadio: true,
        getHierarchyOnSelection: true,
        getAllLazyLoadedData: true,
        getUserSelection: true,
        enableLastLevelSelection: false,
        isLazyLoad: false,
        showSelectAll: true,
        showClearSelection: false,
        showSelectionCount: false,
        isReadOnly: true,
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
        modalButtonShow: true
    };

    var categoryObj, buObj, regionObj;

    var categoryData = {
        method: 'GET',
        url: 'shared/popup/models/region.json'
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

    $('#pollock, #pollock1').click(function () {

        $('#pollock').hide();
        $('#pollock1').hide();
    });
    $scope.treeOpenCallback = function (type, ind, evt, showTree) {
        if ($state.params.name = "mdm.itemDetailsOne") {
            categoryData.url = 'shared/popup/models/category1.json';
        }

        if (!showTree) {
            $('#pollock1').show();
            $('#pollock').show();
        }
        $scope.treeIndex = ind;
        // if ('a' != "buyerPreview") {
        //     $scope.treeComponentConfig.requestParameter = {
        //         navigationContext: "PAS"
        //     };
        //     currentType = type;
        //     if (type == 'region') {
        //         $http(regionData).then(function (response) {
        //             regionObj = response.data;
        //             $scope.treeComponentConfig.data = regionObj;
        //             $scope.treeComponentConfig.title = 'Region';
        //             $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
        //             $scope.treeComponentConfig.from = 2;
        //             $scope.treeComponentConfig.to = 2;
        //             //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        //         });

        //     } else if (type == 'bu') {
        //         $http(buData).then(function (response) {
        //             buObj = response.data;
        //             $scope.treeComponentConfig.data = buObj;
        //             $scope.treeComponentConfig.title = 'BUSINESS UNIT';
        //             $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
        //             $scope.treeComponentConfig.from = 2;
        //             $scope.treeComponentConfig.to = 0;
        //             //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        //         });

        //     } else {
        //         $http(categoryData).then(function (response) {

        //             categoryObj = response.data;
        //             $scope.treeComponentConfig.data = categoryObj;
        //             $scope.treeComponentConfig.title = 'Other Costs';
        //             $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
        //             //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        //         });

        //     }
        //     $scope.showTreePopup = true;
        // }
    };

    $scope.onPopupHideCallback = function () {
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        } else if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        } else if (currentType == 'region') {
            $scope.selectedRegionValidate = true;
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
                $scope.historyList[$scope.treeIndex].Product = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.historyList[$scope.treeIndex].Product = e.selectionAllNames[0];
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
            $scope.selectedRegionValidate = true;
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

    // if ($state.productNameAcrylonitrile) {
    //     $scope.$watch(
    //         function () {
    //             return $scope.historyList;
    //         },
    //         function (newValue, oldValue) {
    //             var total = 0;
    //             if (!angular.equals(oldValue, newValue)) {

    //                 angular.forEach(newValue,
    //                     function (task) {
    //                         if (task.sequence == '1') {
    //                             $rootScope.productionCost = task.value;
    //                         }
    //                         task.value = task.value === '' ? 0 : task.value;
    //                         total = total + (parseFloat(task.value));
    //                     });
    //                 $rootScope.AcrylonitrileConversionAndOtherCostTotal = total;

    //             } else {
    //                 angular.forEach(oldValue,
    //                     function (task) {
    //                         if (task.sequence == '1') {
    //                             $rootScope.productionCost = task.value;
    //                         }
    //                         task.value = task.value === '' ? 0 : task.value;
    //                         total = total + (parseFloat(task.value));
    //                     });
    //                 $rootScope.AcrylonitrileConversionAndOtherCostTotal = total;

    //             };
    //             $rootScope.AcrylonitrileTotalShouldCost = $rootScope.AcrylonitrileConversionAndOtherCostTotal + $rootScope.AcrylonitrileProductDetailTotal;
    //             $(".elements-include")[13].childNodes[0].value = ($rootScope.AcrylonitrileTotalShouldCost).toFixed(2);

    //         },
    //         true);
    // }

}

function costSummaryGraphCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce, $interval, $notification, storeService, $window, MDMService) {

    if ($state.current.name == "mdm.itemDetailsOne" && !$state.showNewGraph && !$state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {

        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'LABOR',
                            y: 63259,
                            color: Highcharts.getOptions().colors[4]
                        }, {
                            name: 'MATERIAL',
                            y: 1050,
                            color: Highcharts.getOptions().colors[2]
                        }, {
                            name: 'EQUIPMENT',
                            y: 36160,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'OVERHEAD',
                            y: 6500,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'SUB-CONTRACTOR',
                            y: 47700,
                            color: Highcharts.getOptions().colors[7]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);

    } 
    else if ($state.current.name == "mdm.itemDetails" && !$state.showNewGraph && !$state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'POLLOCK',
                            y: 550,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'PRODUCTION COST',
                            y: 1750,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'SHIPMENT COST',
                            y: 630,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'MARGIN',
                            y: 870,
                            color: Highcharts.getOptions().colors[6]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    }
    //Geographic
    else if ($state.current.name == "mdm.itemDetails" && !$state.showNewGraph && !$state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && $state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                        name: 'BOARD-RAW',
                        y: 9000,
                        color: Highcharts.getOptions().colors[4]
                    },
                    {
                        name: 'BOARD WASTE',
                        y: 1000,
                        color: Highcharts.getOptions().colors[3]
                    },
                    {
                        name: 'COATING WASTE',
                        y: 1000,
                        color: Highcharts.getOptions().colors[5]
                    },
                    {
                        name: 'PRODUCTION COST',
                        y: 3485,
                        color: Highcharts.getOptions().colors[6]
                    },
                    {
                        name: 'SHIPPING COST',
                        y: 1000,
                        color: Highcharts.getOptions().colors[7]
                    },
                    {
                        name: 'MARGIN',
                        y: 500,
                        color: Highcharts.getOptions().colors[8]
                    },
                    {
                        name: 'TOTAL',
                        isIntermediateSum: true,
                        color: Highcharts.getOptions().colors[1]
                    }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
            Highcharts.setOptions({
                lang: {                  
                  thousandsSep: ','
                }
              });
        }, 500);
    }
     else if ($state.current.name == "mdm.itemDetails" && $state.showNewGraph && !$state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'POLLOCK',
                            y: 2255,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'PRODUCTION COST',
                            y: 820,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'SHIPMENT COST',
                            y: 615,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'MARGIN',
                            y: 410,
                            color: Highcharts.getOptions().colors[6]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    } else if ($state.current.name == "mdm.itemDetails" && !$state.showNewGraph && !$state.productNameAcrylonitrile && $state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'TOMATO PASTE',
                            y: 0.68,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'PRODUCTION COST',
                            y: 0.55,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'SHIPMENT COST',
                            y: 0.12,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'MARGIN',
                            y: 0.15,
                            color: Highcharts.getOptions().colors[6]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    } else if ($state.current.name == "mdm.itemDetails" && !$state.showNewGraph && !$state.productNameAcrylonitrile && !$state.productNameKetchup && $state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'MILK',
                            y: 15.50,
                            color: Highcharts.getOptions().colors[2]
                        },
                        {
                            name: 'FEED AND CATTLE COSTS',
                            y: 7.595,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'OPERATING COSTS',
                            y: 2.015,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'OVERHEAD COSTS',
                            y: 3.72,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'LABOR COSTS',
                            y: 1.085,
                            color: Highcharts.getOptions().colors[6]
                        },
                        {
                            name: 'MARGIN',
                            y: 1.085,
                            color: Highcharts.getOptions().colors[6]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    } else if ($state.current.name == "mdm.itemDetails" && !$state.showNewGraph && !$state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && $state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'FUEL HOSE & TUBE ASSY',
                            y: 2.50,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'TOOLING COST',
                            y: 4.32,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'DEVELOPMENT COST',
                            y: 2.1,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'SHIPPING COST',
                            y: 1.68,
                            color: Highcharts.getOptions().colors[6]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    } else if ($state.current.name == "mdm.itemDetails" && !$state.showNewGraph && !$state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && $state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'PRETZEL (R/W)',
                            y: 1.35,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'SHIPPING COST',
                            y: 0.23,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'PACKAGING COST',
                            y: 0.0002,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    } else if ($state.current.name == "mdm.itemDetails" && !$state.showNewGraph && $state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'AMMONIA',
                            y: 0.124,
                            color: Highcharts.getOptions().colors[0]
                        },
                        {
                            name: 'PROPYLENE, CHEM GRADE',
                            y: 0.4046,
                            color: Highcharts.getOptions().colors[2]
                        },
                        {
                            name: 'CHEMICALS',
                            y: 0.0340,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'HYDROGEN CYANIDE',
                            y: -0.0523,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'PRODUCTION COST',
                            y: 0.3238,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'SHIPPING',
                            y: 0.05,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'MARGIN',
                            y: 0.0864,
                            color: Highcharts.getOptions().colors[7]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    } else if ($state.current.name == "mdm.itemDetailsOne" && !$state.showNewGraph && $state.viewScenario && $state.productNameAcrylonitrile && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNameFoldingCartons) {
        $timeout(function () {
            Highcharts.chart('container-2', {
                chart: {
                    type: 'waterfall'
                },

                title: {
                    // text: 'Highcharts Waterfall'
                },

                xAxis: {
                    type: 'category'
                },

                yAxis: {
                    title: {
                        // text: 'USD'
                    }
                },

                legend: {
                    enabled: false
                },

                tooltip: {
                    // pointFormat: '<b>${point.y:,.2f}</b> USD'
                },

                series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            name: 'AMMONIA',
                            y: 0.132,
                            color: Highcharts.getOptions().colors[0]
                        },
                        {
                            name: 'PROPYLENE, CHEM GRADE',
                            y: 0.4046,
                            color: Highcharts.getOptions().colors[2]
                        },
                        {
                            name: 'CHEMICALS',
                            y: 0.0340,
                            color: Highcharts.getOptions().colors[3]
                        },
                        {
                            name: 'HYDROGEN CYANIDE',
                            y: -0.0523,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'PRODUCTION COST',
                            y: 0.4177,
                            color: Highcharts.getOptions().colors[5]
                        },
                        {
                            name: 'SHIPPING',
                            y: 0.0300,
                            color: Highcharts.getOptions().colors[4]
                        },
                        {
                            name: 'MARGIN',
                            y: 0.1009,
                            color: Highcharts.getOptions().colors[7]
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y);
                        },
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    // pointPadding: 0
                }]
            });
        }, 500);
    }

    // Product Attribues Table
    $scope.length = 10;
    $scope.breadth = 20;
    $scope.height = 30;
    $scope.volumeOverride = 5000;
}

function MDMServiceFn($http, $q, $window, $timeout) {
    //return function(msg){  alert(msg); }  
    // Function returns the form widget config data for PPST module
    this.getFormConfigData = function () {
        var url = 'mdm/models/itemDetails.json';
        return $http.get(url).then(function (respData) {
            return respData.data;
            console.log(respData.data);
        }).catch(function (error) {
            return error;
        });
    }


}

function MDMBasicDetailsCtrlFunc($scope, $rootScope, $state, $http, $timeout, lookup) {
    $scope.typeOptions = [{
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
    }];
    $scope.selectedSignatoryLookup = $scope.typeOptions[0];


    $scope.Pagefor = $state.params;

    //$scope.selectedOwnedByoption = '';
    ////$scope.onChangeCompany = function (data) {
    ////	$scope.companyName.displaytext = data.name;
    ////};
    $scope.typeSelectOwnedBy = [{
        "name": "Company Name"
    }, {
        "name": "Partner Code"
    }, {
        "name": "D-U-N-S No."
    }, {
        "name": "US Federal Tax ID"
    }, {
        "name": "Social Security No."
    }, {
        "name": "VAT Reg. No."
    }, {
        "name": "GST/ QST No."
    }, {
        "name": "LEI"
    }, {
        "name": "SIC Code"
    }, {
        "name": "NASIC Code"
    }, {
        "name": "TIN No."
    }];

    /* Tabs */


    /* Location Details Tab*/
    $scope.locationDetails = {
        "address": "Trans Thane Creek Industrial area,\n MICD, Airoli, Navi Mumbai - 400 708",
        "primaryno": "+91 92 18 345678",
        "fax": "+91 92 18 345678",
        "code": "MINDIND"
    };

    /* Roles and contact Tab */
    //$scope.locationTableData = [
    //	{ "ischeck": false, "type": "Headquarter", "locname": "Mindspace Airoli", "defaultloc": { "check": false }, "loccode": "", "addressline1": "", "addressline2": "", "city": "", "state": "", "zipcode": "", "country": { "selectedOption": "" }, "primarybusinessno": { "phoneno": "3245678", "extn": "234" }, "secondarybusinessno": { "phoneno": "232323", "extn": "123455" }, "faxno": "", "identificationinfo": [{ "identificationtype": { "selectedOption": "", "selectedmsg": "" }, "identificationcode": "" }], "linkedlocation": [{ "locationtype": { "selectedOption": "" }, "location": { "selectedOption": "" }, "syssourcename": { "selectedOption": "" } }], "rolescontact": { "relationship": { "displaytext": "Relationship Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" }, "buyer": { "displaytext": "Buyer Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" }, "contract": { "displaytext": "Contract Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" }, "purchase": { "displaytext": "Purchase Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" } } },
    //	{ "ischeck": false, "type": "Order to", "locname": "Mindspace Malad", "defaultloc": { "check": true }, "loccode": "", "addressline1": "", "addressline2": "", "city": "", "state": "", "zipcode": "", "country": { "selectedOption": "" }, "primarybusinessno": { "phoneno": "3245678", "extn": "234" }, "secondarybusinessno": { "phoneno": "232323", "extn": "123455" }, "faxno": "", "identificationinfo": [{ "identificationtype": { "selectedOption": "", "selectedmsg": "" }, "identificationcode": "" }], "linkedlocation": [{ "locationtype": { "selectedOption": "" }, "location": { "selectedOption": "" }, "syssourcename": { "selectedOption": "" } }], "rolescontact": { "relationship": { "displaytext": "Relationship Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" }, "buyer": { "displaytext": "Buyer Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" }, "contract": { "displaytext": "Contract Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" }, "purchase": { "displaytext": "Purchase Manager", "options": [{ "name": "Carissa Madden", "check": true }, { "name": "Dotson Palmer", "check": true }, { "name": "Meyer Lloyd", "check": true }, { "name": "Flossie Ochoa", "check": true }, { "name": "Leah Moses", "check": true }], "selectedoption": "" } } }
    //];

    /* supplier spend card */
    $scope.supplierSpendCard = {
        "reportingmonth": "March 2016",
        "salestobuyer": "$2000",
        "salesallocation": "20",
        "mbe": "African - American",
        "mbecountry": "Asian - Indian - American"
    };

    /* Location Card */
    $scope.locationCard = {
        "locationName": "Mindspace, Airoli.",
        "orderTo": "Order to Location",
        "linkedLocation": "Linked Location"
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
            "selectedoption": [{
                "name": "TECHNOLOGY SOLUTIONS",
                "check": true,
                "value": [{
                    "name": "NOVA",
                    "check": true,
                    "value": [{
                        "name": "PRODUCT MANAGEMENT GROUP",
                        "check": true
                    }, {
                        "name": "USER EXPERIENCE",
                        "check": true
                    }, {
                        "name": "PRODUCT TECHNOLOGY",
                        "check": true
                    }]
                }]
            }],
            "options": [{
                "name": "TECHNOLOGY SOLUTIONS",
                "check": true,
                "value": [{
                    "name": "NOVA",
                    "check": true,
                    "value": [{
                        "name": "PRODUCT MANAGEMENT GROUP",
                        "check": true
                    }, {
                        "name": "USER EXPERIENCE",
                        "check": true
                    }, {
                        "name": "PRODUCT TECHNOLOGY",
                        "check": true
                    }]
                }]
            }]
        },
        "diversityStatus": {
            "displaytext": "Diversity Status",
            "selectedoption": [{
                "name": "Minority Business Enterprise (MBE) - African American",
                "check": true
            }, {
                "name": "Minority Business Enterprise (MBE) - Asian-Indian American",
                "check": true
            }, {
                "name": "Minority Business Enterprise (MBE) - Asian-Pacific American",
                "check": true
            }, {
                "name": "Minority Business Enterprise (MBE) - Hispanic American",
                "check": true
            }],
            "options": [{
                "name": "Minority Business Enterprise (MBE) - African American",
                "check": true
            }, {
                "name": "Minority Business Enterprise (MBE) - Asian-Indian American",
                "check": true
            }, {
                "name": "Minority Business Enterprise (MBE) - Asian-Pacific American",
                "check": true
            }, {
                "name": "Minority Business Enterprise (MBE) - Hispanic American",
                "check": true
            }]
        },

        "email": "Allan.Gibson@Kelloggs.com",
        "dunscode": "343-BHH-236-549-BB2",
        "suppilerrisktype": "Moderate",
        "countIndicator": [{
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
    $scope.dupSupData = {
        "legalName": "Quanta Inc",
        "doBusiness": "GlobalOp",
        "supCode": "Simon D'Costa",
        "dunsNo": "Los Angeles",
        "socSecuityno": "Moderate",
        "vatRegNo": "23654BB3",
        "gstQstNo": "343-BHH-236-549-BB3",
        "fedralTaxDataRead": [{
            "name": "Region 0",
            "check": true,
            "value": [{
                "name": "Region child-0",
                "check": true,
                "value": [{
                    "name": "Region grand-child-0",
                    "check": true
                }, {
                    "name": "Region grand-child-1",
                    "check": true
                }, {
                    "name": "Region grand-child-2",
                    "check": true
                }]
            }]
        }]
    };
    $scope.showInfoIcon = false;
    $scope.companyName = {
        "displaytext": "Company Name",
        "selectedoption": "",
        "options": [{
            "name": "Quanta Inc",
            "check": false
        }, {
            "name": "kellogg's",
            "check": false
        }, {
            "name": "Evertek Inc",
            "check": false
        }, {
            "name": "GEP",
            "check": false
        }, {
            "name": "Rackspace Inc",
            "check": false
        }, {
            "name": "Globulent Travels",
            "check": false
        }, {
            "name": "Datamatic Ltd",
            "check": false
        }, {
            "name": "CDW",
            "check": false
        }, {
            "name": "Staples Inc",
            "check": false
        }, {
            "name": "IT Micro System Corporation",
            "check": false
        }, {
            "name": "Grainger Ltd",
            "check": false
        }, {
            "name": "Relix Inc",
            "check": false
        }, {
            "name": "Home Depot Co.",
            "check": false
        }]
    }
    $scope.status = {
        "displaytext": "Category",
        "selectedoption": {
            "name": "Choose Category",
            "isdisabled": false,
            "description": "This is Invited",
            "approved": true
        },
        "options": [{
                "name": "Approved",
                "isdisabled": false,
                "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines",
                "approved": true
            },
            {
                "name": "Disqualified",
                "isdisabled": false,
                "description": "This is disqualified",
                "approved": true
            }
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

    $scope.supplierIcardlink = function () {
        $scope.hideSupplierIcardPopupCallback();
        $state.go('supplier.profile', {
            pagefor: $scope.supplierIcard.supplierName
        });
    };
    $scope.showSupplierIcardPopup = false;
    $scope.LoaderFlagController = false;
    $scope.LineLoaderFlag = {
        message: "Loading",
        center: true,
        plain: true
    };

    $scope.subLineLoaderFlag = {
        plain: true,
        message: "",
        center: true
    };
    $scope.subLoaderFlagController = false;

    $scope.showSupplierIcard = function (e) {

        $scope.supplierIcard.supplierName = $scope.companyName.selectedoption.name;

        if ($scope.supplierIcard.supplierName === 'kellogg\'s') {
            $scope.supplierIcard.logoUrl = "shared/resources/images/kelloggs_logo.png";
        } else {
            $scope.supplierIcard.logoUrl = "";
        }
        $scope.supplierIcard.status = $scope.selectTypeOption.selectiontext;
        $scope.supplierIcard.site =
            'www.' + $scope.companyName.selectedoption.name.toLowerCase().replace(/[^a-z0-9]/gmi, "") + '.com';
        $scope.supplierIcard.emailId = 'Allan.Gibson@' +
            $scope.companyName.selectedoption.name.toLowerCase().replace(/[^a-z0-9]/gmi, "") +
            '.com';
        $timeout(function () {
                $scope.showSupplierIcardPopup = true;
                $scope.LoaderFlagController = true;
                $timeout(function () {
                        $scope.LoaderFlagController = false;
                    },
                    2000);
            },
            2000);
        $timeout(function () {
                $scope.subLoaderFlagController = true;
                $timeout(function () {
                        $scope.subLoaderFlagController = false;
                    },
                    2500);
            },
            2000);
    }
    $scope.hideSupplierIcardPopupCallback = function () {
        $scope.showSupplierIcardPopup = false;
        if (icardPopup) {
            $scope.showTreePopup = true;
        }
    };


    // POPUP -- comments
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";
    $scope.showCommentsPopupCallback = function (e) {
        icardPopup = false;
        $scope.hideSupplierIcardPopupCallback();
        $scope.showCommentsPopup = true;

    };
    $scope.modulecurrentTab = 'requisition.html';
    $scope.modules = [{
            id: '0',
            name: 'REQUISITION',
            count: '3',
            number: 'REQ-2016.013110',
            url: 'requisition.html',
            isChecked: false
        },
        {
            id: '2',
            name: 'ORDER',
            count: '4',
            number: 'ORD-2015.523209',
            url: 'order.html',
            isChecked: false
        },
        {
            id: '3',
            name: 'INVOICE RECONCILIATION',
            count: '8',
            number: 'IR-2016.234829',
            url: 'invoice.html',
            isChecked: false
        },
    ]

    $scope.modulecurrentTab = 'requisition.html';
    $scope.moduleactiveListTabs = 0;
    $scope.modulesetActiveListTab = function (menuItema) {
        $scope.moduleactiveListTabs = menuItema;
        $scope.modulecurrentTab = $scope.modules[menuItema].url;
    }


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


    $scope.attachmentList = [{
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


    $scope.tooltip = "Attachment 1" +
        "\n" +
        "Attachment 2" +
        "\n" +
        "Attachment 3" +
        "\n" +
        "Attachment 4" +
        "\n" +
        "Attachment 5";
    $scope.customStyle = {
        "textAlign": "left",
    };

    //Attachment popup--end
    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showCommentsPopup = false;
        ////$scope.showSupplierIcardPopup = true;
        $scope.commentIcon = '#icon_Commented'; //icon_Comments
        // Materialize.toast('Status changed', 2000);
    };
    $scope.showCommentsFromStatusPopupCallback = function (e) {
        $scope.showCommentsPopup = true;
        $scope.commentIcon = '#icon_Commented'; //icon_Comments
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
    }];


    // popup reason 
    // $scope.reasonPoup = function (e) {
    // if (e.btnType == "save") {
    // //$scope.status.options[3].isdisabled = true;
    // $scope.selectReasonOption = { "reason": "Neque porro quisquam est qui dolorem ipsum quia dolor." };
    // $scope.selectReasonModel = { "reason": "Neque porro quisquam est qui dolorem ipsum quia dolor." };
    // var lookupConfig = {
    // modelData: $scope.selectReasonModel,
    // config: {
    // mutliselect: false,
    // displayProperties: ["reason"],
    // options: [
    // { "reason": "Sed ut perspiciatis unde omnis iste natus error sit voluptate." },
    // { "reason": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium" },
    // { "reason": "At ver eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium" },
    // { "reason": "Se ut perspiciatis unde omnis iste natus error sit voluptate." },
    // { "reason": "Neque porro quisquam est qui dolorem ipsum quia dolor." }
    // ],
    // addnew: false,
    // titleOfModel: "Choose Reason",
    // selectTypeOption: $scope.selectReasonOption,
    // readonly: false
    // }
    // };
    // $timeout(function () { lookup.open(lookupConfig); }, 1000);

    // }

    // else {
    // return false;
    // }

    // }


    // POPUP -- attachment
    $scope.attachmentPopUpUrl = "shared/popup/views/popupUploadDoc.html";

    //Attachment popup--start
    var comingFrom;
    $rootScope.showDoneBtn = false;
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e, popupComingfrom) {
        $scope.showCommentsPopup = false;
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


    $scope.attachmentList = [{
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
    //Attachment popup--end

    $scope.suppliermselectedData = [];
    $scope.supplierminitialDisplayText = 'Supplier Managers';
    $scope.showFormSM = false;
    $scope.showFormBU = false;
    $scope.businessUnitDatainitialDisplayText = 'Choose Business Unit';

    // region
    $scope.region = [{
        "name": "Asia",
        "value": [{
            "name": "India"
        }, {
            "name": "Japan"
        }, {
            "name": "Nepal"
        }]
    }];

    $scope.showRegion = false;
    $scope.RegionDatainitialDisplayText = 'Choose Region';

    // Parent-child hierarchy
    $scope.showFormParentChild = true;
    $scope.parentChildHierarchyData = 'View parent-child hierarchy';

    $scope.showFormC = false;
    $scope.categoryDatainitialDisplayText = 'Choose Category';


    $scope.suppliermDataRead = [{
        "name": "Carissa Madden",
        "check": true
    }, {
        "name": "Dotson Palmer",
        "check": true
    }, {
        "name": "Meyer Lloyd",
        "check": true
    }, {
        "name": "Flossie Ochoa",
        "check": true
    }, {
        "name": "Leah Moses",
        "check": true
    }];
    $scope.suppliermData = [{
        "name": "Carissa Madden",
        "check": false
    }, {
        "name": "Dotson Palmer",
        "check": false
    }, {
        "name": "Meyer Lloyd",
        "check": false
    }, {
        "name": "Flossie Ochoa",
        "check": false
    }, {
        "name": "Leah Moses",
        "check": false
    }, {
        "name": "Ferguson Osborn",
        "check": false
    }, {
        "name": "Peck Patterson",
        "check": false
    }, {
        "name": "Gay Payne",
        "check": false
    }, {
        "name": "Katie Hebert",
        "check": false
    }, {
        "name": "Bryan Shannon",
        "check": false
    }, {
        "name": "Skinner Farmer",
        "check": false
    }, {
        "name": "Mckay Mcneil",
        "check": false
    }, {
        "name": "Lila Horne",
        "check": false
    }, {
        "name": "Ethel Powell",
        "check": false
    }, {
        "name": "Spears Lott",
        "check": false
    }, {
        "name": "Nannie Ryan",
        "check": false
    }, {
        "name": "Joy Ware",
        "check": false
    }, {
        "name": "Shaffer Mcfadden",
        "check": false
    }, {
        "name": "Audrey Pena",
        "check": false
    }, {
        "name": "Helga Macdonald",
        "check": false
    }];
    $scope.businessUnitData = [{
        "name": "Business unit 0",
        "check": false,
        "value": [{
            "name": "Business unit child-0",
            "check": false,
            "value": [{
                "name": "Business unit grand-child-0",
                "check": false
            }, {
                "name": "Business unit grand-child-1",
                "check": false
            }, {
                "name": "Business unit grand-child-2",
                "check": false
            }]
        }, {
            "name": "Business unit child-1-0",
            "check": false,
            "value": [{
                "name": "Business unit grand-child-1-0",
                "check": false
            }, {
                "name": "Business unit grand-child-1-1",
                "check": false
            }, {
                "name": "Business unit grand-child-1-2",
                "check": false
            }]
        }]
    }, {
        "name": "Business unit 1",
        "check": false,
        "value": [{
            "name": "Business unit child-0",
            "check": false,
            "value": [{
                "name": "Business unit grand-child-0",
                "check": false
            }, {
                "name": "Business unit grand-child-1",
                "check": false
            }, {
                "name": "Business unit grand-child-2",
                "check": false
            }]
        }, {
            "name": "Business unit child-1-0",
            "check": false,
            "value": [{
                "name": "Business unit grand-child-1-0",
                "check": false
            }, {
                "name": "Business unit grand-child-1-1",
                "check": false
            }, {
                "name": "Business unit grand-child-1-2",
                "check": false
            }]
        }]
    }, {
        "name": "Business unit 2",
        "check": false,
        "value": [{
            "name": "Business unit child-0",
            "check": false,
            "value": [{
                "name": "Business unit grand-child-0",
                "check": false
            }, {
                "name": "Business unit grand-child-1",
                "check": false
            }, {
                "name": "Business unit grand-child-2",
                "check": false
            }]
        }]
    }];
    $scope.categoryDataRead = [{
        "name": "IT/TELECOM",
        "check": true,
        "value": [{
            "name": "IT HARDWARE",
            "check": true,
            "value": [{
                    "name": "COMPUTERS - LAPTOPS",
                    "check": true
                },
                {
                    "name": "COMPUTERS - DESKTOPS",
                    "check": true
                },
                {
                    "name": "COMPUTERS - PERIPHERALS",
                    "check": true
                }
            ]
        }]
    }];
    $scope.businessUnitDataRead = [{
        "name": "TECHNOLOGY SOLUTIONS",
        "check": true,
        "value": [{
            "name": "NOVA",
            "check": true,
            "value": [{
                    "name": "PRODUCT MANAGEMENT GROUP",
                    "check": true
                },
                {
                    "name": "USER EXPERIENCE",
                    "check": true
                },
                {
                    "name": "PRODUCT TECHNOLOGY",
                    "check": true
                }
            ]
        }]
    }];
    $scope.categoryData = [{
        "name": "TECHNOLOGY SOLUTIONS",
        "check": false,
        "value": [{
            "name": "NOVA",
            "check": false,
            "value": [{
                    "name": "PRODUCT MANAGEMENT GROUP",
                    "check": false
                },
                {
                    "name": "USER EXPERIENCE",
                    "check": false
                },
                {
                    "name": "PRODUCT TECHNOLOGY",
                    "check": false
                }
            ]
        }]
    }];
    if ($scope.Pagefor.pagefor === "kellogg's") {
        $scope.dummyimg = false;

    } else {
        $scope.dummyimg = true;
    }
    if ($scope.Pagefor.pagefor) {
        //$scope.doingbusiness = "Evertek Inc";
        //$scope.normalisedname = "Evertek";
        //$scope.companyName.selectedoption = { check : false, name: "Evertek Inc", value: "Evertek Inc" };

        if ($scope.Pagefor.type) {
            $scope.status.selectedoption = {
                description: "This is approval pending",
                name: "Approval Pending"
            };
            $scope.selectTypeOption = {
                "name": "status",
                "selectiontext": " Approval Pending"
            };
        } else {
            $scope.status.selectedoption = {
                description: "This is invited",
                name: "Invited"
            };
            $scope.selectTypeOption = {
                "name": "status",
                "selectiontext": "Invited"
            };
        }

        if ($scope.Pagefor.pagefor === "Quanta" ||
            $scope.Pagefor.pagefor === "Fastenal V-Tech" ||
            $scope.Pagefor.pagefor === "kellogg's" ||
            $scope.Pagefor.pagefor === "Home Depot") {
            $scope.status.selectedoption = {
                "name": "Approved",
                "isdisabled": true,
                "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines"
            };
            $scope.selectedOwnedByoption = {
                name: "Partner Code"
            };
            $scope.companyName.selectedoption = {
                name: "Globulent Travels",
                check: false,
                value: "Globulent Travels"
            };
            $scope.selectTypeOption = {
                "name": "status",
                "selectiontext": "Approved"
            };

            $timeout(function () {
                    if ($scope.parentScope) {
                        $scope.parentScope.readOnlyPage = true;
                    }
                },
                10);
        }

        //$scope.suppliermselectedData = [{ "name": "Carissa Madden", "value": "Carissa Madden", "check": true, "ischecked": true }];
    };


    // Start: CBR
    var tempCategoryNode_PAS = [];
    var tempBUNode_PAS = [];
    var tempRegionNode_PAS = [];
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
        if (type == 'region') {
            $http(regionData).then(function (response) {
                regionObj = response.data;
                $scope.treeComponentConfig.listIcon = null;
                $scope.treeComponentConfig.isViewOnly = false;
                $scope.treeComponentConfig.isReadOnly = false;
                $scope.treeComponentConfig.data = regionObj;
                $scope.treeComponentConfig.title = 'REGION';
                if (tempRegionNode_PAS.length) {
                    $scope.treeComponentConfig.isReadOnly = true;
                }
                $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        } else if (type == 'bu') {
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

                $scope.treeComponentConfig.listIcon = {
                    message: 'Supplier Icard',
                    name: '#icon_ContactCard',
                    callback: $scope.showSupplierPopupIcard
                };
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


        } else {
            $http(categoryData).then(function (response) {

                categoryObj = response.data;
                $scope.treeComponentConfig.listIcon = null;
                $scope.treeComponentConfig.isViewOnly = false;
                $scope.treeComponentConfig.isReadOnly = false;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'CATEGORY';
                if (tempCategoryNode_PAS.length) {
                    $scope.treeComponentConfig.isReadOnly = true;
                }
                $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                //$scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
            });

        }
        $scope.showTreePopup = true;
    };

    $scope.onPopupHideCallback = function () {
        if (currentType == "iCardBU") {
            $scope.showSupplierIcardPopup = true;
        }
        $scope.showTreePopup = false;
        if (currentType == 'category') {
            $scope.selectedCategoriesValidate = true;
        } else if (currentType == 'bu') {
            $scope.selectedBUValidate = true;
        } else if (currentType == 'region') {
            $scope.selectedRegionValidate = true;
        }

        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
        //$scope.treeComponentConfig.getSelections = true;
    };

    $scope.selectedCategoriesTxt = ["Choose Category"];
    $scope.selectedBUTxt = ["Choose Business Unit"];
    $scope.selectedRegionTxt = ["Choose Region"];

    $scope.selectedCategoryNodes = [];
    $scope.selectedBUNodes = [];
    $scope.selectedRegionNodes = [];

    $scope.treeComponentCallback = function (e) {
        console.log(e);
        if (currentType == 'category') {
            tempCategoryNode_PAS = [];
            $scope.selectedCategoriesValidate = true;
            for (var i = 0; i < e.selectionAllNames.length; i++) {
                $scope.selectedCategoryNodes.push(e.selectionAllNames[i]);
                tempCategoryNode_PAS.push(e.selectionAllIds[i]);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedCategoriesTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
            else if (e.selectionNames.length == 1)
                $scope.selectedCategoriesTxt = [e.selectionAllNames[0]];
            else
                $scope.selectedCategoriesTxt = ['Choose Category'];
        } else if (currentType == 'PA') {
            tempPANode_PAS = [];
            //$scope.selectedCategoriesValidate = true;
            for (var i = 0; i < e.selectionAllNames.length; i++) {
                //$scope.selectedCategoryNodes.push(e.selections[i].Name);
                tempPANode_PAS.push(e.selectionAllIds[i]);
            }
        } else if (currentType == 'bu') {
            tempBUNode_PAS = [];
            $scope.selectedBUValidate = true;
            for (var i = 0; i < e.selectionAllNames.length; i++) {
                $scope.selectedBUNodes.push(e.selectionAllNames[i]);
                tempBUNode_PAS.push(e.selectionAllIds[i]);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedBUTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
            else if (e.selectionNames.length == 1)
                $scope.selectedBUTxt = [e.selectionAllNames[0]];
            else
                $scope.selectedBUTxt = ['Choose Business Unit'];
        } else if (currentType == 'region') {
            tempRegionNode_PAS = [];
            $scope.selectedRegionValidate = true;
            for (var i = 0; i < e.selectionAllNames.length; i++) {
                $scope.selectedRegionNodes.push(e.selectionAllNames[i]);
                tempRegionNode_PAS.push(e.selectionAllIds[i]);
            }
            if (e.selectionAllNames.length > 1)
                $scope.selectedRegionTxt = [e.selectionAllNames[0], ' +' + (e.selectionAllNames.length - 1) + ' More'];
            else if (e.selectionNames.length == 1)
                $scope.selectedRegionTxt = [e.selectionAllNames[0]];
            else
                $scope.selectedRegionTxt = ['Choose Region'];
        }
        $scope.showTreePopup = false;
        icardPopup = false;
        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
    };

    // End: CBR


};