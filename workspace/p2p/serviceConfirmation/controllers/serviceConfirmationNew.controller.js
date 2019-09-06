angular.module('SMART2')
    .controller('p2pServiceConfNewCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', 'storeService', p2pServiceConfNewCtrlFunc])
    .controller('itemDetailsServConfCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', 'notification', '$state', '$filter', '$timeout', 'storeService', 'ScrollTo', '$window', '$sce', '$translate', 'lookup', 'debouncer', itemDetailsServConfCtrlFunc])
    .controller('notesAndAttachmentCtrl2', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', '$state', notesAndAttachmentCtrlFunc])

    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    });

function p2pServiceConfNewCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, storeService) {
    if ($state.params.statefrom === "buyerLogin" || $state.params.statefrom === "buyerLoginSC") {
        $(".brand-logo").find(".user-name").text("JEFF'S");
    } else {
        $(".brand-logo").find(".user-name").text("EMILY'S");
    };


    $scope.statefrom = $state.params.statefrom;
    $scope.mode = $state.params.mode;
    if ($scope.statefrom == 'buyerLoginSC') {
        $scope.istest11 = true;
        var req = {
            method: 'GET',
            url: 'p2p/serviceConfirmation/models/NewcreateServiceConfirmationBuyer.json'
        };
    } else if ($state.params.mode == 'supplierInvoice') {
        var req = {
            method: 'GET',
            url: 'p2p/serviceConfirmation/models/createInv.json'
        };
    } else {

        $scope.istest11 = false;
        var req = {
            method: 'GET',
            url: 'p2p/serviceConfirmation/models/NewcreateServiceConfirmation.json'
        };
    }
    if ($state.previous.name == "p2p.serviceConfirmation.tasklist") {
        $scope.addTask = true;
    }

    $scope.lifeCycleData = [{
            'docName': 'ORDER',
            'totalAmount': '100,000.00',
            'units': 'USD',
            'otherDetails': [{
                    'fieldName': 'Issue Date',
                    'fieldValue': '03/03/2018'
                },
                {
                    'fieldName': 'Supplier Acknowledged Date',
                    'fieldValue': '03/03/2018'
                }
            ]
        },
        {
            'docName': 'FULFILLMENT',
            'totalAmount': '3,000.00',
            'units': 'USD',
            'otherDetails': [{
                'fieldName': 'Service Confirmation Documents',
                'fieldValue': '01'
            }]
        }

    ];
    //$scope.abc = $state.params.mode;
    //    if (para === 'supplier') {
    //        $scop.istest2 = true;
    //    } else if (para === 'requestor') {
    //        $scop.istest1 = true;
    //    }

    /*$scope.mode = $state.params.stateform;
    if ($scope.mode == 'supplier') {
        $scope.istest1 = true;
    } else {
        $scope.istest1 = false;
    }*/
    $scope.serComStatus = "DRAFT";
    if ($state.params.statefrom == 'buyerLoginSC') {
        $scope.serComStatus = "APPROVAL PENDING";
    }



    $scope.approveCall = function () {
        storeService.set('isSCApproved', true);
        $state.go('expandedLandingList', {
            pagefor: "task",
            doctype: "ApprovalPending",
            statefrom: "buyerLogin"
        });
    }
    $scope.rejectCall = function () {
        var confi = {
            type: "confirm",
            message: "<p class='left-align'>Are you sure you want to reject service confirmation?</p>",

            buttons: [{
                    "title": "Yes",
                    "result": "Yes"
                },
                {
                    "title": "No",
                    "result": "No"
                }
            ]
        };
        notification.notify(confi, function (responce) {
            if (responce.result == "Yes") {
                if ($state.params.statefrom === "buyerLoginSC") {
                    $state.go('expandedLandingList', {
                        doctype: 'ApprovalPending',
                        statefrom: "buyerLogin",
                        pagefor: "task"
                    });
                }
            }
        });

    }
    $scope.trackStatusPopupUrl = "shared/popup/views/popupNewTrackStatus.html";
    $scope.trackStatusPopup = false;
    $scope.trackStatusPopupCallback = function (e) {
        $scope.trackStatusPopup = true;
    };
    $scope.trackStatusOnHideCallback = function (e) {
        $scope.trackStatusPopup = false;
    };
    $scope.abc = $state.params.stateform;
    $scope.myTest1 = true;
    $scope.ChangeStatus = function () {
        if ($scope.abc === 'buyerLogin') {
            $scope.myTest1 = false;

        } else {
            $scope.myTest1 = true;

        }

    };



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

    $scope.submitSC = function () {
        if ($state.params.mode == "supplierInvoice") {
            storeService.set('isinvoiceSubmitted', true);
            $state.go('expandedLandingList', {
                doctype: "invoiceSubmitted"
            });
        } else {
            if ($state.params.mode == 'supplier') {
                storeService.set('isSCSupplier', true);
                $state.go('expandedLandingList', {
                    statefrom: "supLogin",
                    show: "AllSCSubmitted"
                });

            }
        }

    }

    $scope.test = false;
    $scope.acceptReq = function () {
        $scope.test = true;
        $scope.myTest2 = true;
        $scope.myTest1 = false;

        storeService.set('scoreResponseList', $scope.test);
    }

    $scope.xyz = $state.params.stateform;
    $scope.istest1 = false;
    //console.log($scope.xyz);
    if ($scope.xyz === "buyerLogin") {
        $scope.istest1 = true;
    };




    //$scope.submitReq = function () {
    //	var confi = {
    //	    type: "confirm",
    //		message: "<p class='left-align'>Are you sure?</p>",

    //		buttons: [
    //			{
    //				"title": "YES",
    //				"result": "yes"
    //			},
    //			{
    //				"title": "Stay on same page",
    //				"result": "no"
    //			}
    //		]
    //	};

    //	//Notification call
    //	notification.notify(confi, function (responce) {
    //		if (responce.result == "yes") {
    //		//	$state.go('p2p.req.empty');
    //		} else {
    //			return;
    //		}
    //	});
    //}
    var isSequenceToBeMaintained;

    /*
     *  Service call get form-config and data-model
     */



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
        if ($state.params.statefrom == 'buyerLoginSC') {
            $scope.dataModel.objServiceConf.PartnerServiceConfirmationNumber = 'Approval Pending';
        } else {
            if (response.data.formConfig.sections[0].label == "Document fulfillment History") {
                response.data.formConfig.sections.splice(0, 1);
            }

        }
        //if ($state.mode.statefrom == 'supplierInvoice') {
        //    response.data.formConfig.sections[0].isVisible = true;
        //}

        $scope.config = response.data.formConfig;

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

    /********/
}

function itemDetailsServConfCtrlFunc($scope, $rootScope, RuleEngine, $http, notification, $state, $filter, $timeout, storeService, ScrollTo, $window, $sce, $translate, lookup, debouncer) {
    $scope.mode = $state.params.mode;
    if ($state.params.statefrom === "buyerLogin" || $state.params.statefrom === "buyerLoginSC") {
        $(".brand-logo").find(".user-name").text("JEFF'S");
    } else {
        $(".brand-logo").find(".user-name").text("EMILY'S");
    };

    $scope.taskList1 = [{
            'sequence': '1',
            'costelement': 'Labor',
            'name': '',
            'dependent': '',
            'refcostelem': '',
            'perofref': '',
            'scale': '',
            'costsource': '',
            'unitcost': '',
            'inputuom': '',
            'outputuom': '',
            'throughputqty': '',
            'requiredqty': '',
            'stepyeild': '',
            'required': '',
            'cost': '',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            },
            "value": '$0.07'

        },
        {
            'sequence': '2',
            'costelement': 'Process Loss',
            'name': '',
            'dependent': '',
            'refcostelem': '',
            'perofref': '',
            'scale': '',
            'costsource': '',
            'unitcost': '',
            'inputuom': '',
            'outputuom': '',
            'throughputqty': '',
            'requiredqty': '',
            'stepyeild': '',
            'required': '',
            'cost': '',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            },
            "value": '$0.22'
        },
        {
            'sequence': '3',
            'costelement': 'Production',
            'name': '',
            'dependent': '',
            'refcostelem': '',
            'perofref': '',
            'scale': '',
            'costsource': '',
            'unitcost': '',
            'inputuom': '',
            'outputuom': '',
            'throughputqty': '',
            'requiredqty': '',  
            'stepyeild': '',
            'required': '',
            'cost': '',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            },
            "value": '$0.08'
        }
    ];


    $scope.mainSection = true;
    $scope.operationSection = false;
    $scope.labourSection = false;
    $scope.computed3 = true;

    $scope.lineContracted = {
        'status': ""
    }
    $scope.status = 'Contracted line';
    $scope.emptyText = '';



    $scope.statusMode = true;

    $scope.showContracted = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].readonly == false && data[i].isContracted == false) {
                data[i].isContracted = true;
            } else {
                data[i].isContracted = false;
            }
        }
    };

    $scope.statusOptions = [{
        "code": "on",
        "name": "On",
    }, {
        "code": "off",
        "name": "Off"
    }];

    /* Document Lifecycle starts */
    $scope.lifeCycleData = [{
            'docName': 'Requested',
            'totalAmount': "100,000.00",
            'otherDetails': [{
                'fieldName': 'Requisition',
                'fieldValue': '01'
            }]
        },
        {
            'docName': 'Ordered',
            'totalAmount': "100,000.00",
            'otherDetails': [{
                    'fieldName': '05/03/2018',
                    'fieldValue': 'Issue Date'
                },
                {
                    'fieldName': '05/03/2018',
                    'fieldValue': 'Supplier Acknowledged Date'
                }
            ]
        },
        {
            'docName': 'Fulfilled',
            'totalAmount': "20,000.00",
            'otherDetails': [{
                'fieldName': 'Service Confirmation(s)',
                'fieldValue': '02'
            }]
        },
        {
            'docName': 'Invoiced',
            'totalAmount': '20,000.00',
            'otherDetails': [{
                'fieldName': 'Invoice(s)',
                'fieldValue': '09'
            }]
        }

    ];
    $scope.viewAll = function () {
        $state.go('p2p.order.transactionHistory', {
            'id': 0
        });
    }
    /* Document Lifecycle ends */


    //line Details
    $scope.itemDetailReqMaterialTabDataset = [{
            "title": "Tasks",
            "contentUrl": "p2p/serviceConfirmation/views/itemDetail-mat-linesTab.html",
            "active": true
        },
        {
            "title": "Accounting",
            "contentUrl": "p2p/serviceConfirmation/views/itemDetail-mat-accTab.html"
        }
    ];


    $scope.selectedTab = function (name) {
        if (name.title == 'Lines') {
            $scope.isContracted = false;
        } else {
            $scope.isContracted = true;
        }

    }

    //basic detail section

    $scope.isSupervisor = false;
    $scope.iSupplier = false;
    $scope.statefrom = $state.params.statefrom;
    if ($scope.statefrom == 'buyerLoginSC') {
        $scope.isSupervisor = true;
        $scope.iSupplier = true;

    } else {
        $scope.isSupervisor = false;
        $scope.iSupplier = true;
    }



    $scope.isShowSection = false;
    $scope.showSection = function (isShowSection) {
        if (!isShowSection) {
            $scope.isShowSection = true;
        } else {
            $scope.isShowSection = false;
        }
    }

    $scope.popupSupplierIcard = "shared/popup/views/popupSupplierIcard.html";
    $scope.showSupplierIcardPopup = false;
    var typeofClick;
    $scope.showSupplierIcard = function (e, cardType) {
        typeofClick = cardType;
        $scope.showSupplierIcardPopup = true;
        if (typeofClick == "supplier") {
            $scope.supplierIcard = $scope.supplierIcard;
        } else {
            $scope.supplierIcard = $scope.supervisorIcard;
        }
    }
    $scope.hideSupplierIcardPopupCallback = function () {
        $scope.showSupplierIcardPopup = false;
    };



    $scope.supplierIcard = {
        "supplierName": "ADVANCED SEALING LLC LEWIS GOETZ & CO INC",
        "location": "NORWALK, CA 90650-6845 United States ",
        "site": "www.kelloggs.com",
        "emailId": "richard@advseal.com",
        "logoUrl": "",
        "primaryContact": "Richard Holt",
        "code": "0050010574",
        "suppilersourcetype": "General",
        "status": "Approved",
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

        "email": "richard@advseal.com",
        "dunscode": "--",
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

    $scope.supervisorIcard = {
        "supplierName": "Jeff Gruder",
        "location": "Michigan, United States",
        "site": "www.kelloggs.com",
        "emailId": "JGGD@chevron.com",
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



    $scope.purchaseOrg = [{
        "UserId": 28360,
        "UserName": "",
        "FirstName": "CHEV PRODUCTS CO: DPDS",
        "LastName": ""
    }, {
        "UserId": 28977,
        "UserName": "",
        "FirstName": "CHEV PRODUCTS CO: DPDS",
        "LastName": ""
    }, {
        "UserId": 28979,
        "UserName": "",
        "FirstName": "CHEV PRODUCTS CO: DPDS",
        "LastName": ""
    }];

    $scope.purchaseOrder = [{
        "UserId": 28360,
        "UserName": "",
        "FirstName": "DRRI PASSPORT ORDR: PP3",
        "LastName": ""
    }, {
        "UserId": 28977,
        "UserName": "",
        "FirstName": "DRRI PASSPORT ORDR: PP3",
        "LastName": ""
    }, {
        "UserId": 28979,
        "UserName": "",
        "FirstName": "DRRI PASSPORT ORDR: PP3",
        "LastName": ""
    }];




    $scope.typeOptions = [{
        "UserId": 28360,
        "UserName": "",
        "FirstName": "Eurofins Lancaster Laboratories",
        "LastName": ""
    }, {
        "UserId": 28977,
        "UserName": "",
        "FirstName": "Advanced Sealing LLC Lewis Goetz & Co Inc.",
        "LastName": ""
    }, {
        "UserId": 28979,
        "UserName": "Global Edge Solution",
        "FirstName": "Net 10",
        "LastName": ""
    }];
    $scope.selectedOrderContact = $scope.typeOptions[0];
    $scope.selectedSignatoryLookup = $scope.typeOptions[0];
    $scope.selectedProgram = $scope.typeOptions[0];
    $scope.selectedDepartment = $scope.typeOptions[0];
    $scope.selectedSupplierName = $scope.typeOptions[1];
    $scope.selectedSupplierContact = $scope.typeOptions[0];
    $scope.selectedSPaymentTerm = $scope.typeOptions[0];


    $scope.typeOptions2 = [{
        "UserId": 28360,
        "UserName": "",
        "FirstName": "Jeff Gruder",
        "LastName": ""
    }, {
        "UserId": 28977,
        "UserName": "",
        "FirstName": "Sample supervisor",
        "LastName": ""
    }, {
        "UserId": 28979,
        "UserName": "",
        "FirstName": "Sample supervisor",
        "LastName": ""
    }];

    $scope.selectedSupervisorName = $scope.typeOptions2[0];


    //line detail

    $scope.UOMOptions = [{
        "code": "$",
        "name": "HOUR"
    }, {
        "code": "�",
        "name": "EACH"
    }];
    $scope.selectedUOM = {
        "code": "�",
        "name": "EACH"
    };

    $scope.rowsToShowOpts = [{
            'size': '5'
        },
        {
            'size': '10'
        }
    ];

    $scope.selectedOption = {
        'size': '5'
    };
    //dbFactory.all('erpDataBase', 'title_idx').then(
    //	function (erpDataBase) {
    //	    for (var i = 0; i < erpDataBase.length; i++) {
    //	        $scope.erpData.push({
    //	            'div': erpDataBase[i].div,
    //	            'org': erpDataBase[i].org,
    //	            'ecn': erpDataBase[i].ecn,
    //	            'supplierCode': erpDataBase[i].supplierCode
    //	    });
    //	}

    //}
    //);
    $scope.erpFullTableDelete = true;
    $scope.getDataCheckInfo = function (i, e) {
        i > 0 ? $scope.erpFullTableDelete = false : $scope.erpFullTableDelete = true;
    }
    $scope.selectAllErp = {
        checkAll: false
    };
    $scope.erpAllDelete = function () {
        if (!$scope.erpFullTableDelete) {
            notification.notify({
                type: 'confirm',
                message: '<p class="left-align grey-text text-darken-4">Are you sure you want to delete selected record(s) ?</p>',
                buttons: [{
                        "title": "yes",
                        "result": "yes"
                    },
                    {
                        "title": "No",
                        "result": "Not"
                    }
                ]
            }, function (result) {
                if (result.result === 'yes') {
                    if ($scope.selectAllErp.isDataCheck == true) {
                        $scope.erpData = [];
                    } else {
                        for (var j = 0; j < $scope.erpData.length; j++) {
                            if ($scope.erpData[j].isChecked == true) {
                                $scope.erpData.splice(j, 1);
                                j--;
                            }
                        }
                    }
                    Materialize.toast('Selected row(s) deleted', 2000);
                }
            });
        }
    }

    $scope.showForblanket = true;
    if ($scope.mode == "blanket") {
        $scope.showForblanket = false;
    }


    $scope.rowsToShowOpts = [{
            'size': '5'
        },
        {
            'size': '10'
        }
    ];

    $scope.selectedOption = {
        'size': '5'
    };

    $scope.addTaskData = [{
            "description": 'Moisture By SM20 2540G, LLI 111, 121, 2111, 2121, Sample Analysis',
            "div": "NAPES",
            "org": "Plant 1",
            "type": "Fixed Service",
            "uom": "Each",
            "quantityEfforts": "1.00",
            "taskContractNumber": "C798482-V7",
            "readonly": false,
            "isContracted": false,

            "plantcodeerp": {
                "placeholderText": "OOAO",
                "displaytext": "Plant Code",
                "options": [{
                    "name": "OOAO",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "O1BP",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "OOCO",
                    "check": false
                }, {
                    "name": "5004",
                    "check": false
                }, {
                    "name": "4005",
                    "check": false
                }, {
                    "name": "3006",
                    "check": false
                }, {
                    "name": "2007",
                    "check": false
                }, {
                    "name": "1008",
                    "check": false
                }],
                "selectedoption": [],
                "defaultName": "",
                "errorMsg": ""
            },
            "price": '4,400.00',
            "supplierCode": "VN-432652",
            "supplierLocationCode": "VN-LOC-432252",
            "lineValue": "4,400.00",
            "log": "Successful",
            "color": "light-green-text",
            "OrderingLocation": "Mumbai",
            "view": "edit"
        },
        {
            "description": 'Rush Analysis, Mark Up Per Turn Around Time, 1 Day 100%, 2 Day 60%, 3-5 Day 35%, 6-7 Day 8%, Sample Analysis',
            "div": "NAPES",
            "org": "Plant 1",
            "type": "Variable Service",
            "uom": "Each",
            "quantityEfforts": "1.00",
            "taskContractNumber": "C798482-V7",
            "readonly": false,
            "isContracted": false,
            "plantcodeerp": {
                "placeholderText": "OOAO",
                "displaytext": "Plant Code",
                "options": [{
                    "name": "OOAO",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "O1BP",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "OOCO",
                    "check": false
                }, {
                    "name": "5004",
                    "check": false
                }, {
                    "name": "4005",
                    "check": false
                }, {
                    "name": "3006",
                    "check": false
                }, {
                    "name": "2007",
                    "check": false
                }, {
                    "name": "1008",
                    "check": false
                }],
                "selectedoption": [],
                "defaultName": "",
                "errorMsg": ""
            },
            "price": '15,600.00',
            "supplierCode": "VN-432652",
            "supplierLocationCode": "VN-LOC-432252",
            "lineValue": "15,600.00",
            "log": "Successful",
            "color": "light-green-text",
            "OrderingLocation": "Hyderabad",
            "view": "edit"
        },
        {
            "description": 'Ignitability, LLI 542, Sample Analysis',
            "div": "NAPES",
            "org": "Plant 1",
            "type": "Variable Service",
            "uom": "Each",
            "quantityEfforts": "1.00",
            "taskContractNumber": "C798482-V7",
            "readonly": false,
            "isContracted": false,
            "plantcodeerp": {
                "placeholderText": "OOAO",
                "displaytext": "Plant Code",
                "options": [{
                    "name": "OOAO",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "O1BP",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "OOCO",
                    "check": false
                }, {
                    "name": "5004",
                    "check": false
                }, {
                    "name": "4005",
                    "check": false
                }, {
                    "name": "3006",
                    "check": false
                }, {
                    "name": "2007",
                    "check": false
                }, {
                    "name": "1008",
                    "check": false
                }],
                "selectedoption": [],
                "defaultName": "",
                "errorMsg": ""
            },
            "price": '11,000.00',
            "supplierCode": "VN-432652",
            "supplierLocationCode": "VN-LOC-432252",
            "lineValue": "11,000.00",
            "log": "Successful",
            "color": "light-green-text",
            "OrderingLocation": "Hyderabad",
            "view": "edit"
        },
        {
            "description": 'Toxicity Characteristic Leaching Procedure, Acid Base Neutrals, LLI 949, Sample Analysis',
            "div": "NAPES",
            "org": "Plant 1",
            "type": "Material",
            "uom": "Each",
            "quantityEfforts": "1.00",
            "taskContractNumber": "--",
            "readonly": true,
            "isContracted": false,
            "plantcodeerp": {
                "placeholderText": "OOAO",
                "displaytext": "Plant Code",
                "options": [{
                    "name": "OOAO",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "O1BP",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "OOCO",
                    "check": false
                }, {
                    "name": "5004",
                    "check": false
                }, {
                    "name": "4005",
                    "check": false
                }, {
                    "name": "3006",
                    "check": false
                }, {
                    "name": "2007",
                    "check": false
                }, {
                    "name": "1008",
                    "check": false
                }],
                "selectedoption": [],
                "defaultName": "",
                "errorMsg": ""
            },
            "price": '5,200.00',
            "supplierCode": "VN-432652",
            "supplierLocationCode": "VN-LOC-432252",
            "lineValue": "5,200.00",
            "log": "Successful",
            "color": "light-green-text",
            "OrderingLocation": "Hyderabad",
            "view": "edit"
        },
        {
            "description": 'Reactivity, LLI 1121, Sample Analysis',
            "div": "NAPES",
            "org": "Plant 1",
            "type": "Fixed Service",
            "uom": "Each",
            "quantityEfforts": "1.00",
            "taskContractNumber": "--",
            "readonly": true,
            "isContracted": false,
            "plantcodeerp": {
                "placeholderText": "OOAO",
                "displaytext": "Plant Code",
                "options": [{
                    "name": "OOAO",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "O1BP",
                    "check": false,
                    "ischeck": true
                }, {
                    "name": "OOCO",
                    "check": false
                }, {
                    "name": "5004",
                    "check": false
                }, {
                    "name": "4005",
                    "check": false
                }, {
                    "name": "3006",
                    "check": false
                }, {
                    "name": "2007",
                    "check": false
                }, {
                    "name": "1008",
                    "check": false
                }],
                "selectedoption": [],
                "defaultName": "",
                "errorMsg": ""
            },
            "price": '3,800.00',
            "supplierCode": "VN-432652",
            "supplierLocationCode": "VN-LOC-432252",
            "lineValue": "3,800.00",
            "log": "Successful",
            "color": "light-green-text",
            "OrderingLocation": "Hyderabad",
            "view": "edit"
        }
    ];

    if ($state.previous.name == "p2p.serviceConfirmation.tasklist") {
        $scope.addTask = true;
    }

    $scope.addTasks = function () {
        $state.go("p2p.serviceConfirmation.tasklist");
    }

    $scope.adderpData = function () {
        $scope.erpData.push({
            "div": "NAPES",
            "org": "Plant 1",
            "supplierLocationCode": "Select Supplier Location Code",
            "supplierCode": "--",
            "ecn": "--",
            "OrderingLocation": "--",
            "log": "--",
            "color": "materialize-red-text",
            "errorLog": "",
            "view": "preview"
        });
    }

    $scope.erpDetail = function () {
        $state.go("contract.erp", {
            mode: "editErp"
        });
    };
    $scope.erpNewDetail = function () {
        $state.go("contract.erp");
    };
    $scope.deleteerpData = function (index) {
        $scope.erpData.splice(index, 1);
    }


    $scope.erploc = [{
            div: "NAPES",
            org: "Plant 1",
            supplierLocationCode: "VN-LOC-432252",
            supplierName: "Evertek",
            supplierCode: "VN-432652",
            OrderingLocation: "Mumbai",
            color: "light-green-text",
            log: "Successful",
            view: "edit",
            ecn: "CON-NA-540023"
        },
        {
            supplierLocationCode: "VN-LOC-432254",
            supplierName: "Evertek",
            supplierCode: "VN-432651",
            OrderingLocation: "Hyderabad",
            color: "materialize-red-text",
            log: "Failed",
            errorLog: "(Error Log)",
            view: "edit",
            ecn: "CON-NA-540023"
        },
        {
            supplierLocationCode: "VN-LOC-432253",
            supplierName: "Evertek",
            supplierCode: "VN-432652",
            OrderingLocation: "Delhi",
            color: "light-green-text",
            log: "Successful",
            view: "edit",
            ecn: "CON-NA-540023",
        },
        {
            supplierLocationCode: "VN-LOC-432257",
            supplierName: "Evertek",
            supplierCode: "VN-432657",
            OrderingLocation: "Bangalore",
            color: "materialize-red-text",
            log: "Failed",
            errorLog: "(Error Log)",
            view: "edit",
            ecn: "CON-NA-540023"
        }
    ];

    $scope.showERPSupplierLocationPopup = false;
    var getindex = '',
        getNewValue = {};
    $scope.showERPSupplierLocation = function (data, index) {
        $scope.showERPSupplierLocationPopup = true;
        getindex = index
    };

    $scope.getErpLocData = function (getValue) {
        getNewValue = getValue
    }


    $scope.setErpLocData = function () {
        $scope.erpData[getindex] = getNewValue;
    }

    $scope.onERPSupplierLocationHideCallback = function (e) {
        $scope.showERPSupplierLocationPopup = false;
        angular.forEach($scope.erploc, function (value, key) {
            if (value.getValue == true) {
                $scope.erploc.getValue = false;
            }
        })


    };

    $scope.uomOptionstask = [{
        "code": "$",
        "name": "EACH"
    }, {
        "code": "�",
        "name": "HOURS"
    }];
    $scope.uomTask = {
        "code": "$",
        "name": "EACH"
    }

    $scope.divOptions = [{
            "code": "$",
            "name": "Select"
        }, {
            "code": "�",
            "name": "Fixed Service"
        },
        {
            "code": "�",
            "name": "Variable Service"
        },
        {
            "code": "�",
            "name": "Material"
        }
    ];
    $scope.div = {
        "code": "$",
        "name": "Select"
    }

    $scope.erpsuppcodeOptions = [{
        "code": "$",
        "name": "VN-432652"
    }, {
        "code": "�",
        "name": "VN-432653"
    }];
    $scope.erpsuppcode = {
        "code": "�",
        "name": "VN-432653"
    }

    $scope.erpsupploccodeOptions = [{
        "code": "$",
        "name": "VN-LOC-432252"
    }, {
        "code": "�",
        "name": "VN-LOC-432252"
    }];
    $scope.erpsupploccode = {
        "code": "�",
        "name": "VN-LOC-432252"
    }




    $scope.statefrom = $state.params.statefrom;
    $scope.contractLinePopupUrl = 'p2p/serviceConfirmation/views/popupContractedLine.html';
    $scope.contractLinePopup = false;
    $scope.contractedLineCall = function () {
        $scope.contractLinePopup = true;
    }
    $scope.contractLinePopUpOnHideCallback = function (e) {
        $scope.contractLinePopup = false;
    }

    $scope.uomOptions = [{
        "code": "$",
        "type": "EACH"
    }, {
        "code": "�",
        "type": "EACH"
    }];
    $scope.selectedUom = {
        "code": "�",
        "type": "EACH"
    };
    $scope.taskTypeOptions = [{
        "name": "Fixed Service"
    }, {
        "name": "Variable Service"
    }, {
        "name": "Material"
    }];


    $scope.contractedLines = [{
            "contractNumber": "CON3450012",
            "lineDescription": "Elemental Analysis ",
            "lineType": "Fixed Service",
            "Price": "2,000.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Chemical Trace Analysis",
            "lineType": "Variable Service",
            "Price": "200.00 USD",
            "UOM": "Hours"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Benchtop pH Meter",
            "lineType": "Material",
            "Price": "100.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Chemical Synthesizer",
            "lineType": "Material",
            "Price": "50.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Conductivity Meter",
            "lineType": "Material",
            "Price": "50.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Discrete Analyzer",
            "lineType": "Material",
            "Price": "50.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Gas Chromatography Equipment",
            "lineType": "Material",
            "Price": "60.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Infrared Spectroscopy",
            "lineType": "Material",
            "Price": "70.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Gas Chromatography Equipment",
            "lineType": "Material",
            "Price": "65.00 USD",
            "UOM": "Each"
        },
        {
            "contractNumber": "CON3450012",
            "lineDescription": "Infrared Spectroscopy Equipment",
            "lineType": "Material",
            "Price": "45.00 USD",
            "UOM": "Each"
        }

    ];
    $scope.isAddLineFieldVisible = true;
    $scope.updateGrid = true;

    $scope.searchTask = '';
    $scope.keyUpCallback = function () {
        $scope.isEditableTaskTable = false;
        $scope.showSelectedFlag = false;
        $scope.currentTaskTab = "Search Results";
        for (i = 0; i < $scope.taskList.length; i++) {
            $scope.taskList[i].isTaskVisible = false;
            $scope.taskList[i].isSelected = false;

            for (var j = 0; j < $scope.taskList[i].taskGrp.length; j++) {
                $scope.taskList[i].taskGrp[j].isTaskVisible = false;
                $scope.taskList[i].taskGrp[j].isSelected = false;
            }
        }
        for (var i = 0; i < $scope.taskList.length; i++) {
            if ($scope.taskList[i].title == 'Search Results') {
                $scope.taskList[i].isSelected = true;
            }
        }
    }
    $scope.isActive = false;
    $scope.activeButton = function () {
        $scope.isActive = !$scope.isActive;
    }
    $scope.addTaskCall = function () {
        history.go(-1);
    }
    //function shuffle(sourceArray) {
    //    for (var i = 0; i < sourceArray.length - 1; i++) {
    //        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

    //        var temp = sourceArray[j];
    //        sourceArray[j] = sourceArray[i];
    //        sourceArray[i] = temp;
    //    }
    //    return sourceArray;
    //}
    $scope.isEditableTaskTable = false;
    $scope.productionCostSectoin = true;
    $scope.productionFoldingCarton = true;
    $scope.feeAndCattleCostSectoin = true;
    $scope.toolingCostSectoin = true;
    $scope.showParentTaskCall = function (index, isTaskVisible, task) {
        // Service Main
        $scope.computed3 = true;
        $scope.mainSection = true;
        $scope.labourSection = false;
        $scope.operationSection = false;
        $scope.manual3 = false;
        $scope.computed4 = false;
        $scope.computed5 = false;
        $scope.computed6 = false;
        $scope.projectMgmtSec = false;
        $scope.jobSiteSec = false;
        $scope.liftingEquipmentsSec = false;
        $scope.isEditableTaskTable = false;
        if (task.title == "Production Costs" && $state.productNameFoldingCartons) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.computed = true;
            $scope.manual = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = true;
            $scope.marginSectoin = false;

            $scope.taskList1 = [{
                    'sequence': '1',
                    'costelement': 'Labor',
                    'name': '',
                    'dependent': '',
                    'refcostelem': '',
                    'perofref': '',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '',
                    'required': '',
                    'cost': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '$0.07'

                },
                {
                    'sequence': '2',
                    'costelement': 'Process Loss',
                    'name': '',
                    'dependent': '',
                    'refcostelem': '',
                    'perofref': '',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '',
                    'required': '',
                    'cost': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '$0.22'
                },
                {
                    'sequence': '3',
                    'costelement': 'Production',
                    'name': '',
                    'dependent': '',
                    'refcostelem': '',
                    'perofref': '',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '',
                    'required': '',
                    'cost': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '$0.08'
                }
            ];

        }
        if (task.title == "Production Costs" && $state.productNameKetchup) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.computed = true;
            $scope.manual = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = true;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;

            $scope.taskList1 = [
                {
                    'standardPart': '1',
                    'jan08': 'Labor',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '$0.07'

                },
                {
                    'standardPart': '2',
                    'jan08': 'Capital',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '$0.22'
                },
                {
                    'standardPart': '2',
                    'jan08': 'SG&A',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '$0.08'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Packaging',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '$0.18'
                }
            ];

        } else if (task.title == "Shipment Costs" && $state.productNameKetchup) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = true;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.taskList1 = [{
                'standardPart': '1',
                'jan08': 'Freight and WHS',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '$0.12'

            }];
        } else if (task.title == "Margin" && $state.productNameKetchup) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = true;
            $scope.taskList1 = [{
                'standardPart': '1',
                'jan08': 'Supplier Margin',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '$0.15'

            }];
        } else if (task.title == "Operating Costs" && $state.productNameMilk) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = true;
            $scope.overheadCostSection = false;
            $scope.cattleCostSectoin = false;
            $scope.leborCostSection = false;
            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Storage',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.6045'

                },
                {
                    'standardPart': '2',
                    'jan08': 'Transportation',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.6045'

                },
                {
                    'standardPart': '3',
                    'jan08': 'Marketing & Admin',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.806'

                }
            ];
        } else if (task.title == "Feed and Cattle Costs" && $state.productNameMilk) {
            $scope.computed1 = true;
            $scope.computed = true;
            $scope.manual1 = false;
            $scope.manual = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = true;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.cattleCostSectoin = false;
            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Cattle',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '3.038'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Feed',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.759'
                },
                {
                    'standardPart': '3',
                    'jan08': 'Vetinary & Medicines',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '2.278'
                },
                {
                    'standardPart': '4',
                    'jan08': 'Infrastructure-bedding, litter',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '1.52'
                }
            ];
        } else if (task.title == "Overhead Costs" && $state.productNameMilk) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = true;
            $scope.cattleCostSectoin = false;
            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Land costs',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '2.232'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Machine deprecation',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '1.488'
                }
            ];
        } else if (task.title == "Labor Costs" && $state.productNameMilk) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = true;
            $scope.overheadCostSection = false;
            $scope.cattleCostSectoin = false;
            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Farm Labor',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Market Index"
                        }
                    },
                    "value": '0.38',
                    'indexValue': 'www.bls.gov'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Factory Labor',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.705'
                },
            ];
        } else if (task.title == "Margin" && $state.productNameMilk) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = true;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.cattleCostSectoin = false;
            $scope.taskList1 = [{
                'standardPart': '1',
                'jan08': 'Supplier Margin',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '1.085'
            }];
        } else if (task.title == "Tooling Costs" && $state.productNameFuleHouse) {
            $scope.computed1 = true;
            $scope.computed = true;
            $scope.manual1 = false;
            $scope.manual = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.machiningCostSection = false;
            $scope.trimmingCostSection = false;
            $scope.toolingCostSectoin = true;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];

            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Machining',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Computed"
                        }, {
                            "name": "Manual"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '2.75',
                    "indexName": ""
                },
                {
                    'standardPart': '2',
                    'jan08': 'Trimming',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Computed"
                        }, {
                            "name": "Manual"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '1.20',
                    "indexName": ""
                },
                {
                    'standardPart': '3',
                    'jan08': 'Overhead',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.37'
                }
            ];
        } else if (task.title == "Development Costs" && $state.productNameFuleHouse) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.machiningCostSection = false;
            $scope.trimmingCostSection = false;
            $scope.toolingCostSectoin = false;
            $scope.showDevelopmentCostSection = true;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };
            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Engineering',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Computed"
                        }, {
                            "name": "Manual"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '1.05'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Test & Verification',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Computed"
                        }, {
                            "name": "Manual"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.60'
                },
                {
                    'standardPart': '3',
                    'jan08': 'Outside Processing',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.45'
                }
            ];
        } else if (task.title == "Shipping Costs" && $state.productNameFuleHouse) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.machiningCostSection = false;
            $scope.trimmingCostSection = false;
            $scope.toolingCostSectoin = false;
            $scope.showDevelopmentCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = true;
            $scope.packagingCostSection = false;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };
            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Transportation',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Computed"
                        }, {
                            "name": "Manual"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.73'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Custom Duty',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Computed"
                        }, {
                            "name": "Manual"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.55'
                },
                {
                    'standardPart': '3',
                    'jan08': 'Packaging',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency',
                    'jul13': '',
                    "indexName": '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.4'
                }
            ];
        } else if (task.title == "Shipping Cost" && $state.productNamePretzelAnalysis) {

            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.pretzelsShippingCost = true;
            $scope.pretzelsPackagingCost = false;

            $scope.computed1 = false;
            $scope.manual1 = false;
            $scope.manual = true;
            $scope.computed = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.machiningCostSection = false;
            $scope.trimmingCostSection = false;
            $scope.toolingCostSectoin = false;
            $scope.showDevelopmentCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = true;
            $scope.packagingCostSection = false;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }];

            $scope.costSourceDrop[0].selectedoption = {
                "name": "Manual"
            };

            $scope.taskList1 = [{
                'standardPart': '1',
                'jan08': 'Toll/2780850000/PRETZEL (R/W), NO PHO RED 39039H 550LB',
                'jun09': '',
                'apr10': '',
                'dec11': 'EA',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '0.23'

            }];
        } else if (task.title == "Packaging Cost" && $state.productNamePretzelAnalysis) {
            $scope.computed1 = true;
            $scope.manual1 = false;
            $scope.pretzelsShippingCost = false;
            $scope.pretzelsPackagingCost = true;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.machiningCostSection = false;
            $scope.trimmingCostSection = false;
            $scope.toolingCostSectoin = false;
            $scope.showDevelopmentCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = true;
            $scope.packagingCostSection = false;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };
            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'SLIPSHEETS, GMI (GARDETTO) (41X46)',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0000'

                },
                {
                    'standardPart': '2',
                    'jan08': 'GARDETTOS 46.5" BULK TOTE BODY',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0000'

                },
                {
                    'standardPart': '3',
                    'jan08': 'BULK TOTE CAP GREEN 50',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0000'

                },
                {
                    'standardPart': '4',
                    'jan08': 'AIR BAG 48X84 REUSABLE',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0002'

                },
                {
                    'standardPart': '5',
                    'jan08': 'TOTE STRAPPING, CLEAR HD 723 2X1612',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0000'

                },
                {
                    'standardPart': '6',
                    'jan08': 'LINER, 51IN RW CEREAL BLK 3MIL UNPRT',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0000'

                },
                {
                    'standardPart': '7',
                    'jan08': 'LABEL, SU 4X6 W/PEEL OFF LEAD EDGE (ROLL)',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0000'

                },
                {
                    'standardPart': '8',
                    'jan08': 'TAPE, TOTE 24 ROLLS/CASE 1.42x180.45',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'EA',
                    'jul13': '',
                    "approvalType": {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Computed"
                        }
                    },
                    "value": '0.0000'

                }
            ];
        }

        for (i = 0; i < $scope.taskList.length; i++) {
            // $scope.taskList[i].isTaskVisible = false;
            $scope.taskList[i].isSelected = false;

            for (var j = 0; j < $scope.taskList[i].taskGrp.length; j++) {
                // $scope.taskList[i].taskGrp[j].isTaskVisible = false;
                $scope.taskList[i].taskGrp[j].isSelected = false;
            }
        }
        $scope.taskList[index].isSelected = true;
        if (isTaskVisible) {
            $scope.taskList[index].isTaskVisible = false;
        } else {
            $scope.taskList[index].isTaskVisible = true;
        }
        if (task.isTaskFromScratch) {
            $scope.isEditableTaskTable = true;
            $scope.showSelectedFlag = false;
        }
        if ($scope.taskList[index].taskGrp && $scope.taskList[index].taskGrp.length == 0) {
            $scope.currentTaskTab = $scope.taskList[index].title;
        }
        if (!$state.productNamePretzelAnalysis)
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };
    }
    $scope.currentTaskTab = 'All Tasks Lists';
    $scope.showChildTaskCall = function (parentIndex, index, isTaskVisible) {
        for (i = 0; i < $scope.taskList[parentIndex].taskGrp.length; i++) {
            $scope.taskList[parentIndex].taskGrp[i].isTaskVisible = false;
            $scope.taskList[parentIndex].taskGrp[i].isSelected = false;

        }
        $scope.taskList[parentIndex].taskGrp[index].isSelected = true;
        if (!isTaskVisible) {
            $scope.taskList[parentIndex].taskGrp[index].isTaskVisible = true;
        }
        if (!$scope.taskList[parentIndex].taskGrp[index].taskGrp) {
            $scope.showSelectedFlag = false;

        }
        if ($scope.taskList[parentIndex].taskGrp[index].taskGrp == undefined || $scope.taskList[parentIndex].taskGrp[index].taskGrp.length == 0) {
            $scope.currentTaskTab = $scope.taskList[parentIndex].title;
        }



        if ($scope.taskList[parentIndex].taskGrp[index].title == 'Labor costs, Crew shares, Related costs, Crew Travel, Gallery Expenses etc.') {
            $scope.labourSection = true;
            $scope.manual1 = true;
            // $scope.manual2 = false;
            $scope.mainSection = false;
            $scope.operationSection = false;
            $scope.manual = false;
            $scope.manual2 = false;
            $scope.computed2 = false;
            $scope.computed1 = false;
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Manual"
            };
            // if($scope.laborCostItems.length > 1) {
            //     $scope.fillpartialTeamMember11 = false;
            // } else {
            //     $scope.fillpartialTeamMember11 = true;
            // }
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == 'Operations Overheads') {
            $scope.labourSection = false;
            $scope.mainSection = false;
            $scope.operationSection = true;
            $scope.manual2 = true;
            $scope.manual1 = false;
            $scope.manual = false;
            $scope.computed1 = false;
            $scope.computed2 = false;
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Manual"
            };
            $scope.fillpartialTeamMember22 = false;
            // if($scope.operationOverhead.length > 1) {
            //     $scope.fillpartialTeamMember22 = false;
            // } else {
            //     $scope.fillpartialTeamMember22 = true;
            // }
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == 'Operations Overheads') {
            $scope.labourSection = false;
            $scope.mainSection = false;
            $scope.operationSection = true;
            $scope.manual2 = true;
            $scope.manual1 = false;
            $scope.manual = false;
            $scope.computed1 = false;
            $scope.computed2 = false;
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Manual"
            };
            $scope.fillpartialTeamMember22 = false;
            // if($scope.operationOverhead.length > 1) {
            //     $scope.fillpartialTeamMember22 = false;
            // } else {
            //     $scope.fillpartialTeamMember22 = true;
            // }
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Project Management") {
            $scope.mainSection = false;
            $scope.projectMgmtSec = true;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = true;
            $scope.manual4 = false;
            $scope.manual5 = false;
            $scope.manual6 = false;
            $scope.computed4 = true;
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Mics / Jobsite Overhead") {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = true;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual4 = false;
            $scope.manual5 = false;
            $scope.manual6 = false;
            $scope.computed5 = true;

            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Lifting Equipments") {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = true;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            $scope.computed6 = true;
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Machining") {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Number of Hours',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Hours',
                    'jul13': '',
                    approvalType: {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "indexName": '',
                    "value": '0.125'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Labor Rate',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency/Hour',
                    'jul13': '',
                    approvalType: {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Market Index"
                        }
                    },
                    "indexName": 'BLS',
                    "value": '22'
                }
            ];
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Trimming") {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain11 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = false;
            $scope.trimmingCostSection = true;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Number of Hours',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Hours',
                    'jul13': '',
                    approvalType: {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "indexName": '',
                    "value": '0.048'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Labor Rate',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency/Hour',
                    'jul13': '',
                    approvalType: {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Market Index"
                        }
                    },
                    "indexName": 'BLS',
                    "value": '25'
                }
            ];
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Packaging") {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain111 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = false;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = true;

            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'standardPart': '1',
                    'jan08': 'Number of Hours',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Hours',
                    'jul13': '',
                    approvalType: {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Manual"
                        }
                    },
                    "value": '0.020'
                },
                {
                    'standardPart': '2',
                    'jan08': 'Labor Rate',
                    'jun09': '',
                    'apr10': '',
                    'dec11': 'Currency/Hour',
                    'jul13': '',
                    'indexName': 'BLS',
                    approvalType: {
                        "options": [{
                            "name": "Manual"
                        }, {
                            "name": "Market Index"
                        }, {
                            "name": "Historical"
                        }, {
                            "name": "Computed"
                        }],
                        "selectedoption": {
                            "name": "Market Index"
                        }
                    },
                    "value": '20.00'
                }
            ];
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Labor" && $state.productNameFoldingCartons) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    "costelement": "Direct Labor",
                    "name": "Labor Setup Coating A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Labor Index1",
                    "unitcost": 600,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 600
                },
                {
                    'sequence': '2',
                    "costelement": "Direct Labor",
                    "name": "Labor Coating A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index2",
                    "unitcost": 800,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 800
                },
                {
                    'sequence': '3',
                    "costelement": "Direct Labor",
                    "name": "Labor Setup Sheeting Z",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Labor Index3",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '4',
                    "costelement": "Direct Labor",
                    "name": "Labor Sheeting Z",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index4",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '5',
                    "costelement": "Supervisor",
                    "name": "Super1",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index5",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '6',
                    "costelement": "Other",
                    "name": "Manager",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index6",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                }
            ];
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Overhead" && $state.productNameFoldingCartons) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    'costelement': 'Labor Overhead',
                    'name': 'LO1',
                    'refcostelem': 'Labor(Cost Element)',
                    'perofref': '0.15',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '100',
                    'required': '',
                    'cost': '0',
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "Yes"
                        }
                    }

                },
                {
                    'sequence': '2',
                    'costelement': 'Machine Overhead',
                    'name': 'Process Loss',
                    'refcostelem': 'Not Applicable',
                    'perofref': '',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '100',
                    'required': '',
                    'cost': '',
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    }

                }
            ];
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Process Loss" && $state.productNameFoldingCartons) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    "costelement": "Labor Efficiency",
                    "name": "Wastage",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "Yes"
                        }
                    },
                    "refcostelem": "Labor (Cost Element)",
                    "perofref": 0.7,
                    "scale": "Proportional",
                    "costsource": "",
                    "unitcost": "",
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": "",
                    "requiredqty": "",
                    "stepyeild": "",
                    "required": "",
                    "cost": 1260
                },
                {
                    'sequence': '2',
                    "costelement": "Machine Efficiency",
                    "name": "Wastage",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "Yes"
                        }
                    },
                    "refcostelem": "Production",
                    "perofref": 0.7,
                    "scale": "",
                    "costsource": "",
                    "unitcost": "",
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": "",
                    "requiredqty": "",
                    "stepyeild": "",
                    "required": "",
                    "cost": 175
                }
            ]
;
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Production" && $state.productNameFoldingCartons) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    "costelement": "Machine",
                    "name": "Setup Sheeting Machine A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Cost Master",
                    "unitcost": 100,
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '2',
                    "costelement": "Machine",
                    "name": "Sheeting Machine A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Cost Master",
                    "unitcost": 50,
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 50
                },
                {
                    'sequence': '3',
                    "costelement": "Machine",
                    "name": "Setup Coating Machine A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Cost Master",
                    "unitcost": 100,
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                }
            ];
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Transportation" && $state.productNameFoldingCartons) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    'costelement': 'Air',
                    'name': 'Air Leg1',
                    'refcostelem': 'Not Applicable',
                    'perofref': '',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '100',
                    'required': '',
                    'cost': '',
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    }

                },
                {
                    'sequence': '2',
                    'costelement': 'Sea',
                    'name': 'Sea Leg1',
                    'refcostelem': 'Not Applicable',
                    'perofref': '',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '',
                    'required': '',
                    'cost': '',
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    }

                },
                {
                    'sequence': '3',
                    'costelement': 'Land',
                    'name': 'Truck1',
                    'refcostelem': 'Not Applicable',
                    'perofref': '',
                    'scale': '',
                    'costsource': '',
                    'unitcost': '',
                    'inputuom': '',
                    'outputuom': '',
                    'throughputqty': '',
                    'requiredqty': '',
                    'stepyeild': '',
                    'required': '',
                    'cost': '',
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    }

                },
            ];
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Cattle" && $state.productNameMilk) {
            $scope.computed1 = false;
            $scope.computed = false;
            $scope.manual1 = true;
            $scope.manual = false;
            $scope.shipmentCostSection = false;
            $scope.productionCostSectoin = false;
            $scope.productionFoldingCarton = false;
            $scope.marginSectoin = false;
            $scope.feeAndCattleCostSectoin = false;
            $scope.cattleCostSectoin = true;
            $scope.operatingCostSection = false;
            $scope.showMarginSection = false;
            $scope.leborCostSection = false;
            $scope.overheadCostSection = false;
            $scope.taskList1 = [];
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Manual"
            };
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Labor" && $state.productNamepolyviny) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    "costelement": "Direct Labor",
                    "name": "Labor Setup Coating A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Labor Index1",
                    "unitcost": 600,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 600
                },
                {
                    'sequence': '2',
                    "costelement": "Direct Labor",
                    "name": "Labor Coating A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index2",
                    "unitcost": 800,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 800
                },
                {
                    'sequence': '3',
                    "costelement": "Direct Labor",
                    "name": "Labor Setup Sheeting Z",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Labor Index3",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '4',
                    "costelement": "Direct Labor",
                    "name": "Labor Sheeting Z",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index4",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '5',
                    "costelement": "Supervisor",
                    "name": "Super1",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index5",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '6',
                    "costelement": "Other",
                    "name": "Manager",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Labor Index6",
                    "unitcost": 100,
                    "inputuom": "Ton",
                    "outputuom": "Ton",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                }
            ];
        }  else if ($scope.taskList[parentIndex].taskGrp[index].title == "Utilities" && $state.productNamepolyviny) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    "costelement": "Labor Efficiency",
                    "name": "Wastage",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "Yes"
                        }
                    },
                    "refcostelem": "Labor (Cost Element)",
                    "perofref": 0.7,
                    "scale": "Proportional",
                    "costsource": "",
                    "unitcost": "",
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": "",
                    "requiredqty": "",
                    "stepyeild": "",
                    "required": "",
                    "cost": 1260
                },
                {
                    'sequence': '2',
                    "costelement": "Machine Efficiency",
                    "name": "Wastage",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "Yes"
                        }
                    },
                    "refcostelem": "Production",
                    "perofref": 0.7,
                    "scale": "",
                    "costsource": "",
                    "unitcost": "",
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": "",
                    "requiredqty": "",
                    "stepyeild": "",
                    "required": "",
                    "cost": 175
                }
            ]
;
        } else if ($scope.taskList[parentIndex].taskGrp[index].title == "Overheads" && $state.productNamepolyviny) {
            $scope.mainSection = false;
            $scope.projectMgmtSec = false;
            $scope.jobSiteSec = false;
            $scope.liftingEquipmentsSec = false;
            $scope.manual3 = false;
            $scope.manual6 = false;
            $scope.manual5 = false;
            $scope.manual4 = false;
            // $scope.computed6 = true;
            $scope.costSourceDrop = [{
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }];
            $scope.costSourceDrop[0].selectedoption = {
                "name": "Computed"
            };

            $scope.formulaServiceMain1 = 'Number of Hours * Labor Rate';
            $scope.toolingCostSectoin = false;
            $scope.machiningCostSection = true;
            $scope.trimmingCostSection = false;
            $scope.showDevelopmentCostSection = false;
            $scope.shippingCostSection = false;
            $scope.packagingCostSection = false;
            $scope.manual1 = false;
            $scope.computed1 = true;

            $scope.taskList1 = [{
                    'sequence': '1',
                    "costelement": "Machine",
                    "name": "Setup Sheeting Machine A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Cost Master",
                    "unitcost": 100,
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                },
                {
                    'sequence': '2',
                    "costelement": "Machine",
                    "name": "Sheeting Machine A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Proportional",
                    "costsource": "Cost Master",
                    "unitcost": 50,
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 50
                },
                {
                    'sequence': '3',
                    "costelement": "Machine",
                    "name": "Setup Coating Machine A",
                    "dependent": {
                        "options": [{
                            "name": "Yes"
                        }, {
                            "name": "No"
                        }],
                        "selectedoption": {
                            "name": "No"
                        }
                    },
                    "refcostelem": "Not Applicable",
                    "perofref": "",
                    "scale": "Fixed",
                    "costsource": "Cost Master",
                    "unitcost": 100,
                    "inputuom": "",
                    "outputuom": "",
                    "throughputqty": 1,
                    "requiredqty": 1,
                    "stepyeild": 100,
                    "required": 1,
                    "cost": 100
                }
            ];
        }
    }

   
    $scope.showChild2TaskCall = function (parentParenIndex, parentIndex, index, isTaskVisible) {
        for (i = 0; i < $scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp.length; i++) {
            $scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp[i].isTaskVisible = false;
            $scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp[i].isSelected = false;
        }
        $scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp[index].isSelected = true;
        if (!isTaskVisible) {
            $scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp[index].isTaskVisible = true;
        }
        if (!$scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp[index].taskGrp) {
            $scope.showSelectedFlag = false;
        }
        if ($scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp[index].taskGrp == undefined || $scope.taskList[parentParenIndex].taskGrp[parentIndex].taskGrp[index].taskGrp.length == 0) {
            $scope.currentTaskTab = $scope.taskList[parentParenIndex].title;
        }
    }
    $scope.showChild3TaskCall = function (parentparentParenIndex, parentParenIndex, parentIndex, index, isTaskVisible) {
        for (i = 0; i < $scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp.length; i++) {
            $scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp[i].isTaskVisible = false;
            $scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp[i].isSelected = false;
        }
        $scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp[index].isSelected = true;
        if (!isTaskVisible) {
            $scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp[index].isTaskVisible = true;
        }
        if (!$scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp[index].taskGrp) {
            $scope.showSelectedFlag = false;

        }
        if ($scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp[index].taskGrp == undefined || $scope.taskList[parentparentParenIndex].taskGrp[parentParenIndex].taskGrp[parentIndex].taskGrp[index].taskGrp.length == 0) {
            $scope.currentTaskTab = $scope.taskList[parentparentParenIndex].title;
        }
    }

    $scope.uomOptions = [{
        "name": "Hour"
    }, {
        "name": "EACH"
    }, {
        "name": "Box"
    }, {
        "name": "Dozen"
    }, {
        "name": "Kilogram"
    }];
    $scope.taskCheckCount = 0;
    $scope.selectedTaskObj = [];
    $scope.showSelectedFlag = false;
    $scope.checkCountOnChange = function (flag, data) {
        //if (flag) {
        //    $scope.taskCheckCount++;
        //    $scope.selectedTaskObj.push(data);
        //}
        //else {
        //    $scope.taskCheckCount--;
        //    for (var i = 0; i < $scope.selectedTaskObj.length; i++) {
        //        if ($scope.selectedTaskObj[i].description == data.description) {
        //            $scope.selectedTaskObj.splice(i,1);
        //        }
        //    }
        //}
        $scope.selectedTaskObj = [];
        var checkCount = 0;
        for (var i = 0; i < $scope.taskData.length; i++) {
            if ($scope.taskData[i].isChecked) {
                checkCount++;
                $scope.selectedTaskObj.push($scope.taskData[i]);
            }
        }
        for (var i = 0; i < $scope.contractTaskData.length; i++) {
            if ($scope.contractTaskData[i].isChecked) {
                checkCount++;
                $scope.selectedTaskObj.push($scope.contractTaskData[i]);
            }
        }
        for (var i = 0; i < $scope.taskFromScratchData.length; i++) {
            if ($scope.taskFromScratchData[i].isChecked) {
                checkCount++;
                $scope.selectedTaskObj.push($scope.taskFromScratchData[i]);
            }
        }
        $scope.taskCheckCount = checkCount;
    }
    $scope.showSelectedTask = function () {
        $scope.showSelectedFlag = true;
        $scope.isEditableTaskTable = false;
        $scope.currentTaskTab = "";
        for (i = 0; i < $scope.taskList.length; i++) {
            $scope.taskList[i].isTaskVisible = false;
            $scope.taskList[i].isSelected = false;

            for (var j = 0; j < $scope.taskList[i].taskGrp.length; j++) {
                $scope.taskList[i].taskGrp[j].isTaskVisible = false;
                $scope.taskList[i].taskGrp[j].isSelected = false;
            }
        }
    }
    $scope.taskData = [{
            "description": "Moisture By SM20 2540G, LLI 111, 121, 2111, 2121, Sample Analysis",
            "price": "4,400.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "--",
            "isChecked": false
        },
        {
            "description": "Rush Analysis, Mark Up Per Turn Around Time, 1 Day 100%, 2 Day 60%, 3-5 Day 35%, 6-7 Day 8%, Sample Analysis",
            "price": "15,600.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": " C798482-V7",
            "isChecked": false
        },
        {
            "description": "Mercury In Water Or Soil By EPA 245.1, SW-846 7470, Or SW-846 7471, LLI 259, 159, Sample Analysis",
            "price": "11,000.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "C798482-V7",
            "isChecked": false
        },
        {
            "description": "pH Of Solid Samples, LLI 394, Sample Analysis",
            "price": "5,200.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "--",
            "isChecked": false
        },
        {
            "description": "Ignitability, LLI 542, Sample Analysis",
            "price": "3,800.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "--",
            "isChecked": false
        },
        {
            "description": "Toxicity Characteristic Leaching Procedure, NonVolatile Extraction, LLI 947, Sample Analysis",
            "price": "3,784.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "--",
            "isChecked": false
        },
        {
            "description": "Toxicity Characteristic Leaching Procedure, Acid Base Neutrals, LLI 949, Sample Analysis",
            "price": "13,000.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "--",
            "isChecked": false
        },
        {
            "description": "Reactivity, LLI 1121, Sample Analysis",
            "price": "26,062.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "C798482-V7",
            "isChecked": false
        },
        {
            "description": "Sulfide Reactivity, LLI 1122, Sample Analysis",
            "price": "17,570.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "--",
            "isChecked": false
        }

    ]
    $scope.contractTaskData = [{
            "description": "Cyanide Reactivity, LLI 1123, Sample Analysis",
            "price": "17,570.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "C798482-V7",
            "isChecked": false
        },
        {
            "description": "Rush Analysis, Mark Up Per Turn Around Time, 1 Day 100%, 2 Day 60%, 3-5 Day 35%, 6-7 Day 8%, Sample Analysis",
            "price": "15,600.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "C798482-V7",
            "isChecked": false
        },
        {
            "description": "3-6 Metals By Inductively Coupled Plasma Method 200.7 Or 6010B In Water Or Soil, LLI 5930, 5931, 5934, 5764, Sample Analysis",
            "price": "31,440.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "C798482-V7",
            "isChecked": false
        },
        {
            "description": " Arsenic In Water Or Soil By Inductively Coupled Plasma/Mass Spectrometer Method 200.8 Or 6020, LLI 6025, 6125, Sample Analysis",
            "price": "9,000.00",
            "quantity": "1.00",
            "uom": $scope.uomOptions[1],
            "contractNo": "C798482-V7",
            "isChecked": false
        }
    ]

    $scope.taskFromScratchData = [{
            "description": "",
            "price": "",
            "quantity": "",
            "uom": {},
            "category": "",
            "contractNo": "--",
            "isTaskFromScratchData": true,
            "isChecked": false
        },
        {
            "description": "",
            "price": "",
            "quantity": "",
            "uom": {},
            "category": "",
            "contractNo": "--",
            "isTaskFromScratchData": true,
            "isChecked": false
        },
        {
            "description": "",
            "price": "",
            "quantity": "",
            "uom": {},
            "category": "",
            "contractNo": "--",
            "isTaskFromScratchData": true,
            "isChecked": false
        }

    ]
    $scope.addEmptyTask = function () {
        $scope.taskFromScratchData.unshift({
            "description": "",
            "price": "",
            "quantity": "",
            "uom": {},
            "category": "",
            "contractNo": "--",
            "isTaskFromScratchData": true,
            "isChecked": false
        });
    }
    $scope.deleteTask = function (index) {
        $scope.taskFromScratchData.splice(index, 1);
    }
    $scope.deleteFrmSelectedTask = function (index, desp) {
        $scope.selectedTaskObj.splice(index, 1);
        $scope.taskCheckCount--;
        for (var i = 0; i < $scope.taskData.length; i++) {
            if ($scope.taskData[i].description == desp) {
                $scope.taskData[i].isChecked = false;
            }
        }
        for (var i = 0; i < $scope.contractTaskData.length; i++) {
            if ($scope.contractTaskData[i].description == desp) {
                $scope.contractTaskData[i].isChecked = false;
            }
        }
    }
    $scope.showSearchHeader = function () {
        this.isActiveHeader = true;
        this.focusSearchHeader = true;
        this.hideCloseHeader = true;
        this.columnSearchKey = "Search";
    }
    $scope.hideSearchHeader = function () {
        this.isActiveHeader = false;
        this.focusSearchHeader = false;
        this.hideCloseHeader = false;
    }
    $scope.isShowSelectAll = true;
    $scope.selectAllTaskChangeCall = function (flag) {
        if (flag) {
            $scope.taskCheckCount = $scope.taskCheckCount + $scope.taskData.length;
        } else {
            $scope.taskCheckCount = $scope.taskCheckCount - $scope.taskData.length;
        }
    }
    $scope.selectAllTaskFrmScrtchChangeCall = function (flag) {
        if (flag) {
            $scope.taskCheckCount = $scope.taskCheckCount + $scope.taskFromScratchData.length;
        } else {
            $scope.taskCheckCount = $scope.taskCheckCount - $scope.taskFromScratchData.length;
        }

    }
    $scope.selectionCheckCall = function (index) {
        if ($scope.taskFromScratchData[index].description || $scope.taskFromScratchData[index].price || $scope.taskFromScratchData[index].uom || $scope.taskFromScratchData[index].quantity || $scope.taskFromScratchData[index].category) {

            if (!$scope.taskFromScratchData[index].isChecked) {
                $scope.taskCheckCount++;
            }
            $scope.taskFromScratchData[index].isChecked = true;
        }
        $scope.isShowSelectAll = false;

        $timeout(function () {
            $scope.isShowSelectAll = true;
        });
    }

    var tempCategoryNode_PAS = [];
    var tempBUNode_PAS = ['851750000001'];
    var tempRegionNode_PAS = [];

    $scope.treeComponentConfig = {
        isRadio: true,
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

    var currentType = '';
    var currentIndex = 0;
    $scope.treeOpenCallback = function (type, index) {
        currentIndex = index;
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
        } else if (currentType == 'region') {}
        //$scope.treeComponentConfig.getSelections = true;
    };

    $scope.selectedCategoriesTxt = "Choose Category";
    $scope.selectedBUTxt = "Technology Solutions +10 More";
    $scope.selectedRegionTxt = "Choose Region";

    $scope.selectedCategoriesValidate = false;
    $scope.selectedBUValidate = false;
    $scope.selectedRegionValidate = false;

    $scope.selectedCategoryNodes = [];
    $scope.selectedBUNodes = ['Technology Solutions'];
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
            else if (e.selectionNames.length == 1) {
                //$scope.selectedCategoriesTxt = e.selectionAllNames[0];
                $scope.taskFromScratchData[currentIndex].category = e.selectionNames[0];
            } else {
                $scope.selectedCategoriesTxt = 'Select';

            }
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

    if ($state.params.statefrom === "buyerLoginSC") {
        $scope.taskServiceConfirmConfig = [{
                "field": "lineNumber",
                "width": 120,
                "displayName": "Task Number",
                "isTree": true,
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "lineDescription",
                "width": 200,
                "displayName": "Task Description",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "cellTemplate": "<span title=\"{{row.entity.lineDescription}}\" class=\"truncate\">{{row.entity.lineDescription}}<span>",
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable"
            },
            {
                "field": "lineType",
                "width": 150,
                "displayName": "Type",
                "isFixed": "Left",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable"
            },
            {
                "field": "contractNumber",
                "width": 130,
                "displayName": "Contract Number",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable"
            },
            {
                "field": "quantity",
                "width": 100,
                "displayName": "Quantity",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "uom.name",
                "width": 100,
                "displayName": "UOM",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable"
            },
            {
                "field": "price",
                "width": 100,
                "displayName": "Price (USD)",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "lineValue",
                "width": 120,
                "displayName": "Line Value",
                "isVisible": true,
                "isReadOnly": true,
                "filterObject": {
                    "enableFiltering": true
                },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            }
        ];
    }

    $scope.taskServiceConfirmModel = [{
            "isTaxExempt": false,
            "status": 1,
            "id": 21559,
            "lineNumber": 1,
            "subLineNumber": 1,
            "subline": {
                'name': 'Add Subline',
                'isLineHeader': true
            },
            'lineType': 'Fixed Service',
            "lineDescription": 'ADVANCED SEALING/ KAMMPROFILE/ RTJ SPACERSTHIS IS A LUMP SUM CONTRACT FOR ADVANCED SEALING TO MACHINE/KAMMPROFILE A QUANTITY OF 3 - 8" 304SS RTJ TYPE ORIFICE SPACERS AND INSTALL IDENTIFICATION TABS ON EACH. THE WORK WILL HAPPEN ON A EXPEDITED BASIS AND IS REFLECTED IN THE COST ABOVE, AS WELL AS THE ATTACHED QUOTE. OTR REP JEFF GRUDER (510) 242-3120 (707) 332-0967',
            "quantity": '--',
            "price": '--',
            "lineValue": '40,000.00',
            "endDate": null,
            "startDate": null,
            "contractNumber": "C798482-V7",
            "uom": {
                "code": "EA",
                "name": "--"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "id": 21559,
            "lineNumber": 1.1,
            "subline": {
                'name': '',
                'isLineHeader': false
            },
            'lineType': 'Material',
            "lineDescription": 'Moisture By SM20 2540G, LLI 111, 121, 2111, 2121, Sample Analysis',
            "quantity": '1.00',
            "price": '4,400.00',
            "lineValue": '4,400.00',
            "endDate": "11/03/2018",
            "startDate": "11/03/2018",
            "contractNumber": "--",
            "uom": {
                "code": "EA",
                "name": "Each"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "id": 21559,
            "lineNumber": 1.2,
            'lineType': 'Variable Service',
            "lineDescription": 'Rush Analysis, Mark Up Per Turn Around Time, 1 Day 100%, 2 Day 60%, 3-5 Day 35%, 6-7 Day 8%, Sample Analysis',
            "quantity": '1.00',
            "price": '15,600.00',
            "lineValue": '15,600.00',
            "endDate": "13/03/2018",
            "startDate": "12/03/2018",
            "contractNumber": "C798482-V7",
            "uom": {
                "code": "EA",
                "name": "--"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "id": 21559,
            "lineNumber": 1.3,
            "subline": {
                'name': '',
                'isLineHeader': false
            },
            'lineType': 'Fixed service',
            "lineDescription": 'Mercury In Water Or Soil By EPA 245.1, SW-846 7470, Or SW-846 7471, LLI 259, 159, Sample Analysis',
            "quantity": '--',
            "price": '11,000.00',
            "lineValue": '11,000.00',
            "endDate": "",
            "startDate": "12/03/2018",
            "contractNumber": "--",
            "uom": {
                "code": "EA",
                "name": "--"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "id": 21559,
            "lineNumber": 1.4,
            "subline": {
                'name': '',
                'isLineHeader': false
            },
            'lineType': 'Material',
            "lineDescription": 'pH Of Solid Samples, LLI 394, Sample Analysis',
            "quantity": '1.00',
            "price": '5,200.00',
            "lineValue": '5,200.00',
            "endDate": "",
            "startDate": "12/03/2018",
            "contractNumber": "C798482-V7",
            "uom": {
                "code": "EA",
                "name": "Each"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "id": 21559,
            "lineNumber": 1.5,
            "subline": {
                'name': '',
                'isLineHeader': false
            },
            'lineType': 'Variable Service',
            "lineDescription": 'Ignitability, LLI 542, Sample Analysis',
            "quantity": '1.00',
            "price": '3,800.00',
            "lineValue": '3,800.00',
            "endDate": "",
            "startDate": "12/03/2018",
            "contractNumber": "--",
            "uom": {
                "code": "EA",
                "name": "--"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "id": 21559,
            "lineNumber": 1.6,
            "subline": {
                'name': '',
                'isLineHeader': false
            },
            'lineType': 'Fixed Service',
            "lineDescription": 'Toxicity Characteristic Leaching Procedure, NonVolatile Extraction, LLI 947, Sample Analysis',
            "quantity": '--',
            "price": '8,400.00',
            "lineValue": '8,400.00',
            "endDate": "",
            "startDate": "12/03/2018",
            "contractNumber": "C798482-V7",
            "uom": {
                "code": "EA",
                "name": "--"
            },
            "$$hashKey": "uiGrid-0012"
        }
    ];



    $scope.addSubLineCall = function () {
        $scope.updateGrid = false;
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
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [{
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        }

    ];

    $scope.addCurrent = function () {

        if ($scope.taxList.taxCode != '') {

            $scope.taxesDetailLists.push($scope.taxList);

            $scope.taxList = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': false
            };

        }

    }

    $scope.updatedCurrentTax = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };

    $scope.taxfocus = false;

    $scope.delCurrent = function (current) {
        var confi = {
            type: "warning",
            message: "<p class='left-align'>Are you Sure for Delete Current Item</p> ",
            buttons: [{
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
            buttons: [{
                "title": "Ok",
            }]
        };

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                notification.notify(confi_2, function (response) {});
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
            $scope.updatedCurrentTax = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': true
            };
        }
    };


    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax = {
            'taxCode': '',
            'taxDetail': '',
            'taxRate': '',
            'showEdithCurrentPanel': true
        };
    }



    /*current for tax poup end*/

    $scope.selectedtemplate = function (current) {
        $scope.$emit('showTemplate', {
            showTemp: current
        });
    }

    //$scope.ngModel = $scope.ngModel.data;

    $scope.itemDetailServConfMaterialTabDataset = [{
        "title": "Service Entry Sheet",
        "contentUrl": "p2p/serviceConfirmation/views/itemDetail-mat-linesTab.html",
        "active": true
    }];

    $scope.itemDetailServConfServiceTabDataset = [{
            "title": "Lines",
            "contentUrl": "p2p/serviceConfirmation/views/itemDetail-serv-linesTab.html",
            "active": true
        },
        {
            "title": "Accounting",
            "contentUrl": "p2p/serviceConfirmation/views/itemDetail-serv-accTab.html"
        }
    ];

    $scope.importLineItemsTabDataset = [{
            "title": "Requisition",
            "contentUrl": "p2p/serviceConfirmation/views/importLineItemsReqTab.html",
            "active": true
        },
        {
            "title": "Templates",
            "contentUrl": "p2p/serviceConfirmation/views/importLineItemsTemplTab.html"
        }
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
    $scope.templateLists = [{
            'title': 'TEMPLATE 1',
            'isChecked': false
        },
        {
            'title': 'TEMPLATE 2',
            'isChecked': false
        },
        {
            'title': 'TEMPLATE 3',
            'isChecked': false
        }
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

    $scope.$watch('ngModel.selectedOption.key', function (newVal) {});

    //Approver Popup

    $scope.approverPopup = false;
    $scope.approverPopupCallback = function (e) {
        $scope.approverPopup = true;
    };
    $scope.approverOnHideCallback = function () {
        $scope.approverPopup = false;
    };

    $scope.addApprovers = [{
            name: 'John',
            "selected": false
        },
        {
            name: 'Jessie'
        },
        {
            name: 'Johanna'
        },
        {
            name: 'Joy',
            "selected": false
        },
        {
            name: 'Mary'
        },
        {
            name: 'Peter'
        },
        {
            name: 'Sebastian',
        },
        {
            name: 'Erika'
        },
        {
            name: 'Patrick'
        },
        {
            name: 'Samantha'
        }
    ];

    $scope.approvers = [{
            name: 'John'
        },
        {
            name: 'Jessie'
        },
        {
            name: 'Johanna'
        },
        {
            name: 'Joy'
        },
        {
            name: 'Mary'
        },
        {
            name: 'Peter'
        },
        {
            name: 'Sebastian',
        },
        {
            name: 'Erika'
        },
        {
            name: 'Patrick'
        },
        {
            name: 'Samantha'
        }
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

    $scope.expressLists = [{
            itemNumber: 'dell',
            name: '-',
            actionIconDelete: true
        },
        {
            itemNumber: 'Sumsung',
            name: '-',
            actionIconDelete: true
        },
        {
            itemNumber: 'Lenovo',
            name: '-',
            actionIconDelete: true
        },
        {
            itemNumber: 'Sumsung',
            name: '-',
            actionIconDelete: true
        },
        {
            itemNumber: 'dell',
            name: '-',
            actionIconDelete: true
        },
        {
            itemNumber: 'Lenovo',
            name: '-',
            actionIconDelete: true
        },
        {
            itemNumber: 'Sumsung',
            name: '-',
            actionIconDelete: true,
            actionIconAdd: true
        }
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
        $scope.expressLists.push({
            itemNumber: 'Lenovo',
            actionIconAdd: true
        });

        var count = $scope.splitList.length + 1;
        $scope.splitList.push({
            splitNumber: count,
            splitValue: '00',
            actionIconDelete: true
        });
    };


    $scope.splitPopupUrl = "p2p/serviceConfirmation/views/popupSplit.html";
    $scope.splitPopupPopup = false;
    $scope.splitPopupCallback = function (e) {
        $scope.splitPopupPopup = true;
    };
    $scope.splitPopupPopupHideCallback = function (e) {
        $scope.splitPopupPopup = false;
    };
    $scope.splitAmount = [{
            splitValue: '500.00',
            actionIconDelete: true
        },
        {
            splitValue: '300.00',
            actionIconDelete: true
        },
        {
            splitValue: '200.00',
            actionIconDelete: true
        }
    ];
    $scope.addSplitAmountRow = function () {
        $scope.splitAmount.push({
            splitValue: '',
            actionIconDelete: true
        });
        var getContent = angular.element('#splitAmount').height();
        setTimeout(function () {
            angular.element('#splitAmount').find('.scroll-content').scrollTop(getContent + 55);
        }, 100);
    }
    $scope.addSplitPercentageRow = function () {
        $scope.splitPercentage.push({
            splitValue: '',
            actionIconDelete: true
        });
        var getContent = angular.element('#splitPercentage').height();
        setTimeout(function () {
            angular.element('#splitPercentage').find('.scroll-content').scrollTop(getContent + 55);
        }, 100);
    }
    $scope.removeSplitAmountRow = function (index) {
        $scope.splitAmount.splice(index, 1);
    }
    $scope.removeSplitPercentageRow = function (index) {
        $scope.splitPercentage.splice(index, 1);
    }
    $scope.splitPercentage = [{
            splitValue: '25',
            actionIconDelete: true
        },
        {
            splitValue: '25',
            actionIconDelete: true
        },
        {
            splitValue: '50',
            actionIconDelete: true
        }
    ];
    $scope.splitType = [{
        title: 'Amount'
    }, {
        title: 'Percentage'
    }];
    $scope.selectedSplit = {
        title: 'Amount'
    };
    $scope.splitFlag = true;
    $scope.onChangeSplit = function (selectedSplit) {
        if (selectedSplit.title == 'Amount') {
            $scope.splitFlag = true;
        } else if (selectedSplit.title == 'Percentage') {
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
        if (def.col && def.col.field == 'taxes') {
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
        } else if (def.col && def.col.field == 'spLink') {
            $scope.showGridSandPPopup = true;
        }


        // UI Grid -- popup callback -- split number papup
        if (def.col && def.col.field == 'splitType') {
            $scope.splitPopupPopup = true;
            $scope.isIEbrowser = false;
            $scope.lineNumber = def.row.entity.lineNumber;
            $scope.lineDescription = def.row.entity.lineDescription;
            $scope.splitTotal = def.row.entity.splittotal;

            $timeout(function () {
                if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
                    $scope.isIEbrowser = true;
                }
            }, 100);
        }

    }

    $scope.projectCodeObj = {
        "displaytitle": "select project",
        "selectTypeOption": {},
        "selectedoption": ""
    }
    var currentColIndex = '',
        currentRowIndex = '',
        currentOptions = '',
        lookupTitle = '';
    $scope.projetcLookupCallback = function (colName, rowIndex) {
        if (colName == 'pr') {
            currentOptions = [{
                    "name": "PRO-1234"
                },
                {
                    "name": "PRO-8675"
                },
                {
                    "name": "PRO-4536"
                },
                {
                    "name": "PRO-3785"
                },
                {
                    "name": "PRO-9087"
                }
            ];
            lookupTitle = 'Select Project Code';
            $scope.selectPlantModel = {
                "name": $scope.accountingModel[rowIndex].projectCode
            };
        }
        if (colName == 'gl') {
            currentOptions = [{
                    "name": "GL-1234"
                },
                {
                    "name": "GL-8675"
                },
                {
                    "name": "GL-4536"
                },
                {
                    "name": "GL-3785"
                },
                {
                    "name": "GL-9087"
                }
            ];
            lookupTitle = 'Select GL Code';
            $scope.selectPlantModel = {
                "name": $scope.accountingModel[rowIndex].glCode
            };
        }
        if (colName == 'wb') {
            currentOptions = [{
                    "name": "BB-014"
                },
                {
                    "name": "BB-001"
                },
                {
                    "name": "BB-024"
                },
                {
                    "name": "BB-030"
                },
                {
                    "name": "BB-040"
                }
            ];
            lookupTitle = 'Select WBS Number';
            $scope.selectPlantModel = {
                "name": $scope.accountingModel[rowIndex].wbsNumber
            };
        }
        if (colName == 'cc') {
            currentOptions = [{
                    "name": "CC-1234"
                },
                {
                    "name": "CC-8675"
                },
                {
                    "name": "CC-4536"
                },
                {
                    "name": "CC-3785"
                },
                {
                    "name": "CC-9087"
                }
            ];
            lookupTitle = 'Select Cost Center';
            $scope.selectPlantModel = {
                "name": $scope.accountingModel[rowIndex].costCenter
            };
        }
        currentRowIndex = rowIndex;
        plantPoup(colName);

    }
    var plantPoup = function (colName) {
        debouncer.add(function () {
            var lookupConfig = {
                modelData: $scope.selectPlantModel,
                config: {
                    mutliselect: false,
                    displayProperties: ["name"],
                    options: currentOptions,
                    addnew: false,
                    titleOfModel: lookupTitle,
                    selectTypeOption: $scope.selectPlantOption,
                    readonly: false
                }
            };
            $timeout(function () {
                lookup.open(lookupConfig, function (response) {
                    if (colName == 'pr') {
                        $scope.accountingModel[currentRowIndex].projectCode = response.result.name;
                    }
                    if (colName == 'gl') {
                        $scope.accountingModel[currentRowIndex].glCode = response.result.name;
                    }
                    if (colName == 'wb') {
                        $scope.accountingModel[currentRowIndex].wbsNumber = response.result.name;
                    }
                    if (colName == 'cc') {
                        $scope.accountingModel[currentRowIndex].costCenter = response.result.name;
                    }
                    //$scope.accountingModel[currentRowIndex] = response.result;
                    $scope.selectPlantOption = response.selectTypeOption;
                });
            });
        }, 300);
    }
    $scope.selectPlantModel = {
        "name": ""
    };
    $scope.projectCodeOptions = [{
        "name": "PRO-1234",
        "check": false
    }, {
        "name": "PRO-8675",
        "check": false
    }, {
        "name": "PRO-4536",
        "check": false
    }];
    $scope.accountingConfig = [{
            "field": "lineNumber",
            "width": 90,
            "displayName": "Task No.",
            "isTree": true,
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {

            }
        },
        {
            "field": "description",
            "width": 200,
            "displayName": "Task Description",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": true,
            "cellTemplate": "<span class=\"truncate\" title=\"{{row.entity.description}}\">{{row.entity.description}}<span>",
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "splitType",
            "width": 120,
            "displayName": "Split Type",
            "isFixed": "Left",
            "isRegFocusCol": true,
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "attributes": {
                "type": "splitPopupCallback",
                "defaultTitle": ""
            },
            "type": "popup",
        },
        {
            "field": "splitNumber",
            "width": 100,
            "displayName": "Split",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "quantity",
            "width": 90,
            "displayName": "Quantity",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "splitValues",
            "width": 90,
            "displayName": "Split Value",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "splittotal",
            "width": 100,
            "displayName": "Split Total",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "requester",
            "width": 100,
            "displayName": "Requester",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "division",
            "width": 100,
            "displayName": "Division",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "companyCode",
            "width": 100,
            "displayName": "Company Code",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "plant",
            "width": 100,
            "displayName": "Plant",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "purchasingOrg",
            "width": 100,
            "displayName": "Purchasing Org",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "businessunit",
            "width": 100,
            "displayName": "Business Unit",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "purchasingGroup",
            "width": 100,
            "displayName": "Purchasing Group",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "costCenter",
            "width": 100,
            "displayName": "Cost Center",
            "isVisible": true,
            "cellTemplate": "<span>{{row.entity.costCenter}}</span>",
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "wbsNumber",
            "width": 100,
            "displayName": "WBS Number",
            "isVisible": true,
            "autoIncrement": true,
            "cellTemplate": "<span>{{row.entity.wbsNumber}}</span>",
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "glCode",
            "width": 100,
            "displayName": "GL Code",
            "isVisible": true,
            "cellTemplate": "<span>{{row.entity.glCode}}</span>",
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }
    ];
    $scope.accountingModel = [{
            "isTaxExempt": false,
            "status": 1,
            "splitType": '--',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "--",
            "id": 21559,
            "lineNumber": 1,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "--",
            "splittotal": "--",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "--",
            "projectCode": "--",
            "wbsNumber": "--",
            "costCenter": "--",
            "projectName": "2112484.10510301.PLT",
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
            "description": "ADVANCED SEALING/ KAMMPROFILE/ RTJ SPACERSTHIS IS A LUMP SUM CONTRACT FOR ADVANCED SEALING TO MACHINE/KAMMPROFILE A QUANTITY OF 3 - 8' 304SS RTJ TYPE ORIFICE SPACERS AND INSTALL IDENTIFICATION TABS ON EACH.",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "--",
            "companyCode": "--",
            "division": "--",
            "plant": "--",
            "purchasingOrg": "--",
            "purchasingGroup": "--",
            "businessunit": "--",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": '--',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "--",
            "id": 21559,
            "lineNumber": 1.1,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "4,400.00",
            "splittotal": "4,400.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "--",
            "projectCode": "--",
            "wbsNumber": "--",
            "costCenter": "--",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "1.00",
            "unitPrice": 6,
            "description": "Moisture By SM20 2540G, LLI 111, 121, 2111, 2121, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "--",
            "companyCode": "--",
            "division": "--",
            "plant": "--",
            "purchasingOrg": "--",
            "purchasingGroup": "--",
            "businessunit": "--",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 1",
            "id": 21559,
            "lineNumber": 1.1,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "2,200.00",
            "splittotal": "2,200.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-4536",
            "projectCode": "PRO-4536",
            "wbsNumber": "BB-014",
            "costCenter": "CC-4536",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Moisture By SM20 2540G, LLI 111, 121, 2111, 2121, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 2",
            "id": 21559,
            "lineNumber": 1.1,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "2,200.00",
            "splittotal": "2,200.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-4536",
            "projectCode": "PRO-4536",
            "wbsNumber": "BB-014",
            "costCenter": "CC-6354",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Moisture By SM20 2540G, LLI 111, 121, 2111, 2121, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": '--',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "--",
            "id": 21559,
            "lineNumber": 1.2,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "15,600.00",
            "splittotal": "15,600.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "--",
            "projectCode": "--",
            "wbsNumber": "--",
            "costCenter": "--",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "1.00",
            "unitPrice": 6,
            "description": "Rush Analysis, Mark Up Per Turn Around Time, 1 Day 100%, 2 Day 60%, 3-5 Day 35%, 6-7 Day 8%, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "--",
            "companyCode": "--",
            "division": "--",
            "plant": "--",
            "purchasingOrg": "--",
            "purchasingGroup": "--",
            "businessunit": "--",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },

        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 1",
            "id": 21559,
            "lineNumber": 1.2,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "7,800.00",
            "splittotal": "7,800.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-4536",
            "projectCode": "PRO-4536",
            "wbsNumber": "BB-014",
            "costCenter": "CC-4536",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Rush Analysis, Mark Up Per Turn Around Time, 1 Day 100%, 2 Day 60%, 3-5 Day 35%, 6-7 Day 8%, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 2",
            "id": 21559,
            "lineNumber": 1.2,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "7,800.00",
            "splittotal": "7,800.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-4536",
            "projectCode": "PRO-4536",
            "wbsNumber": "BB-014",
            "costCenter": "CC-6354",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Rush Analysis, Mark Up Per Turn Around Time, 1 Day 100%, 2 Day 60%, 3-5 Day 35%, 6-7 Day 8%, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": '--',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "--",
            "id": 21559,
            "lineNumber": 1.3,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "11,000.00",
            "splittotal": "11,000.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "--",
            "projectCode": "--",
            "wbsNumber": "--",
            "costCenter": "--",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "1.00",
            "unitPrice": 6,
            "description": "pH Of Solid Samples, LLI 394, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "--",
            "companyCode": "--",
            "division": "--",
            "plant": "--",
            "purchasingOrg": "--",
            "purchasingGroup": "--",
            "businessunit": "--",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 1",
            "id": 21559,
            "lineNumber": 1.3,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "5,500.00",
            "splittotal": "5,500.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-8675",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "pH Of Solid Samples, LLI 394, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 2",
            "id": 21559,
            "lineNumber": 1.3,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "5,500.00",
            "splittotal": "5,500.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-5768",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "pH Of Solid Samples, LLI 394, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": '--',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "--",
            "id": 21559,
            "lineNumber": 1.4,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "5,200.00",
            "splittotal": "5,200.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "--",
            "projectCode": "--",
            "wbsNumber": "--",
            "costCenter": "--",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "1.00",
            "unitPrice": 6,
            "description": "Ignitability, LLI 542, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "--",
            "companyCode": "--",
            "division": "--",
            "plant": "--",
            "purchasingOrg": "--",
            "purchasingGroup": "--",
            "businessunit": "--",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 1",
            "id": 21559,
            "lineNumber": 1.4,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "2,600.00",
            "splittotal": "2,600.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-8675",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Ignitability, LLI 542, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 2",
            "id": 21559,
            "lineNumber": 1.4,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "2,600.00",
            "splittotal": "2,600.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-5768",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Ignitability, LLI 542, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": '--',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "--",
            "id": 21559,
            "lineNumber": 1.5,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "3,800.00",
            "splittotal": "3,800.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "--",
            "projectCode": "--",
            "wbsNumber": "--",
            "costCenter": "--",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "1.00",
            "unitPrice": 6,
            "description": "Toxicity Characteristic Leaching Procedure, NonVolatile Extraction, LLI 947, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "--",
            "companyCode": "--",
            "division": "--",
            "plant": "--",
            "purchasingOrg": "--",
            "purchasingGroup": "--",
            "businessunit": "--",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 1",
            "id": 21559,
            "lineNumber": 1.5,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "1,900.00",
            "splittotal": "1,900.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-8675",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Toxicity Characteristic Leaching Procedure, NonVolatile Extraction, LLI 947, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 2",
            "id": 21559,
            "lineNumber": 1.5,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "1,900.00",
            "splittotal": "1,900.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-5768",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Toxicity Characteristic Leaching Procedure, NonVolatile Extraction, LLI 947, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": '--',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "--",
            "id": 21559,
            "lineNumber": 1.6,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "3,784.00",
            "splittotal": "3,784.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "--",
            "projectCode": "--",
            "wbsNumber": "--",
            "costCenter": "--",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "1.00",
            "unitPrice": 6,
            "description": "Reactivity, LLI 1121, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "--",
            "companyCode": "--",
            "division": "--",
            "plant": "--",
            "purchasingOrg": "--",
            "purchasingGroup": "--",
            "businessunit": "--",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 1",
            "id": 21559,
            "lineNumber": 1.6,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "1,892.00",
            "splittotal": "1,892.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-8675",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Reactivity, LLI 1121, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        },
        {
            "isTaxExempt": false,
            "status": 1,
            "splitType": 'PERCENTAGE',
            "PercentsplitType": "100.00%",
            "taxCodeChargeName": "--",
            "splitNumber": "SPLIT 2",
            "id": 21559,
            "lineNumber": 1.6,
            "documentCode": 21193,
            "p2PLineItemId": 202239,
            "catalogItemId": 42,
            "taxes": "70,380.00",
            "splitTaxes": "--",
            "splitValues": "1,892.00",
            "splittotal": "1,892.00",
            "legalEntity": "405-APC",
            "companyCode": "4005-U.S.Onshore E&P",
            "glCode": "GL-8675",
            "projectCode": "PRO-8675",
            "wbsNumber": "BB-024",
            "costCenter": "CC-5768",
            "projectName": "2112484.10510301.PLT",
            "account": {
                "code": "19695611",
                "name": "RX SALES-TRADE"
            },
            "project": {
                "code": "0",
                "name": "002"
            },
            "quantity": "0.50",
            "unitPrice": 6,
            "description": "Reactivity, LLI 1121, Sample Analysis",
            "manufacturer": null,
            "contractNumber": "2015.000009",
            "requester": "Jeff Gruder",
            "companyCode": "0061-Chevron Products Company",
            "division": "PC2-PC2",
            "plant": "1004-OAKLAND (N FIELD) CA AIR OAK:1004",
            "purchasingOrg": "CHEV PRODUCTS CO: DPDS",
            "purchasingGroup": "DRRI PASSPORT ORDR: PP3",
            "businessunit": "TerminalsNorthwest-Terminals - Northwest",
            "partnerItemNumber": "sdfsd",
            "manufacturerPartNumber": null,
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
            "$$hashKey": "uiGrid-0012"
        }



    ];


    //Item Details Grid
    $scope.gridOptionsItem = {
        "data": [{
                "isTaxExempt": false,
                "status": 1,
                "splitType": 0,
                "id": 21559,
                "lineNumber": "0001",
                "lineType": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Manifold Trailer (High Pressure Frac Manifold), Each"
                },
                "itemNumber": "$ 3,890.00",
                "description": "3",
                "supplierName": {
                    "id": 6349,
                    "name": "EA",
                    "TotalNew": "Job"
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
                "lineNumber": "0002",
                "lineType": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Computer Van Frac Unit, Real Time Monitoring Unit"
                },
                "itemNumber": "$ 12,000.00",
                "description": "3",
                "supplierName": {
                    "id": 6349,
                    "name": "EA",
                    "TotalNew": "Job"
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
                "lineNumber": "0003",
                "lineType": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Liquid Gel Blender"
                },
                "itemNumber": "$ 3,700.00",
                "description": "10",
                "supplierName": {
                    "id": 6349,
                    "name": "DAY",
                    "TotalNew": "Each"
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
                "lineNumber": "0005",
                "lineType": {
                    "id": 1,
                    "name": "P2P_REQ_Material",
                    "key": "Minimum Pump Charge"
                },
                "itemNumber": "$ 15,000.00",
                "description": "3",
                "supplierName": {
                    "id": 6349,
                    "name": "DAY",
                    "TotalNew": "Each"
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
        ],
        "enableFiltering": true,
        "enablePinning": false,
        "enableCellEditOnFocus": true,
        "showTreeExpandNoChildren": true,
        "rowHeight": 30,
        "columnDefs": [{
                "field": "lineNumber",
                "width": 150,
                "displayName": "Part Number",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": true,
                //"pinnedLeft": true,
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
                "width": 450,
                "displayName": "Description",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": true,
                //"pinnedLeft": true,
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
                "width": 350,
                "displayName": "List Price",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                //"pinnedLeft": true,
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
                "width": 350,
                "displayName": "Qty.",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": true,
                //"pinnedLeft": true,
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
                "width": 350,
                "displayName": "UOM",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                //"pinnedLeft": false,
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
                "field": "supplierName.TotalNew",
                "width": 350,
                "displayName": "UOM",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                //"pinnedLeft": false,
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

    /*Should Cost Analysis*/


    if ($state.newUrl == 'service' && !$state.viewScenario) {
        $scope.services1 = true;
        $scope.product1 = false;
        $scope.taskList = [{
                title: "Labor",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Project Management",
                        isSelected: false,
                    },
                    {
                        title: "Supervision",
                        isSelected: false,
                    },
                    {
                        title: "Foreman",
                        isSelected: false,
                    },
                    {
                        title: "Mob & Demob",
                        isSelected: false,
                    },
                    {
                        title: "Ongoing Clean-up",
                        isSelected: false,
                    },
                    {
                        title: "As Builts & O.M's",
                        isSelected: false,
                    },
                    {
                        title: "Punchlist",
                        isSelected: false,
                    },
                    {
                        title: "Mics / Jobsite Overhead",
                        isSelected: false,
                    },

                ]
            },
            {
                title: "Material",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "As Builts & O.M's ",
                        isSelected: false
                    },
                    {
                        title: "Punchlist",
                        isSelected: false
                    },
                    {
                        title: "Mics / Jobsite Overhead",
                        isSelected: false
                    }
                ]
            },
            {
                title: "Equipment",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Car Rental - PM",
                        isSelected: false
                    },
                    {
                        title: "Fuel & Oil Super",
                        isSelected: false
                    },
                    {
                        title: "Fuel & Oil Foreman",
                        isSelected: false
                    },
                    {
                        title: "Job Site Power",
                        isSelected: false
                    },
                    {
                        title: "Job Site Water",
                        isSelected: false
                    },
                    {
                        title: "Lifting Equipments",
                        isSelected: false
                    },
                ]
            },
            {
                title: "Overheads",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Temporary utilities",
                        isSelected: false
                    },
                    {
                        title: "Onsite trailers",
                        isSelected: false
                    },
                    {
                        title: "Mobilization and demobilization",
                        isSelected: false
                    },
                    {
                        title: "Drainage/erosion controls",
                        isSelected: false
                    },
                    {
                        title: "Dumpsters",
                        isSelected: false
                    },
                    {
                        title: "Drinking water",
                        isSelected: false
                    },
                    {
                        title: "Site cleanup services",
                        isSelected: false
                    },
                    {
                        title: "Temporary site signage",
                        isSelected: false
                    },
                    {
                        title: "Site safety",
                        isSelected: false
                    },
                    {
                        title: "Small tools",
                        isSelected: false
                    },
                    {
                        title: "Jobsite superintendent/supervision (a project-specific salary)",
                        isSelected: false
                    },
                    {
                        title: "Site security",
                        isSelected: false
                    },
                    {
                        title: "Temporary toilets",
                        isSelected: false
                    },
                    {
                        title: "Permits",
                        isSelected: false
                    },

                ]
            },
            {
                title: "Sub-Contractor",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Blue Printing Costs",
                        isSelected: false
                    },
                    {
                        title: "Air fare - PM",
                        isSelected: false
                    },
                    {
                        title: "Car Rental - PM",
                        isSelected: false
                    },
                    {
                        title: "Per Diem",
                        isSelected: false
                    },
                    {
                        title: "Mobile Phone",
                        isSelected: false
                    },
                ]
            }
        ];
    } else if ($state.newUrl == 'service' && $state.viewScenario && !$state.productNameFoldingCartons) {
        $scope.services1 = true;
        $scope.product1 = false;
        $scope.taskList = [{
            title: "Production Costs",
            isTaskVisible: true,
            isSelected: false,
            taskGrp: [{
                    title: "Utilities",
                    isSelected: false,
                },
                {
                    title: "Fixed Costs",
                    isSelected: false,
                },
                {
                    title: "Other Expenses",
                    isSelected: false,
                }

            ]
        }];
    } else if ($state.newUrl !== 'service' && !$state.productNameFoldingCartons && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNamepolyviny) {
        $scope.product1 = true;
        $scope.services1 = false;
        $scope.taskList = [{
            title: "Production Costs",
            isTaskVisible: true,
            isSelected: false,
            taskGrp: [{
                    title: "Utilities",
                    isSelected: false,
                },
                {
                    title: "Fixed Costs",
                    isSelected: false,
                },
                {
                    title: "Other Expenses",
                    isSelected: false,
                }

            ]
        }];
    } else if ($state.newUrl !== 'service' && $state.productNameKetchup && !$state.productNameFoldingCartons && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNamepolyviny) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.productKetchup = true;
        $scope.productFoldingCarton = false;
        $scope.productMilk = false;
        $scope.taskList = [{
                title: "Production Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Labor",
                        isSelected: false,
                    },
                    {
                        title: "Capital",
                        isSelected: false,
                    },
                    {
                        title: "SG&A",
                        isSelected: false,
                    },
                    {
                        title: "Packaging",
                        isSelected: false,
                    }

                ]
            },
            {
                title: "Shipment Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                    title: "Freight and WHS",
                    isSelected: false
                }]
            },
            {
                title: "Margin",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                    title: "Supplier Margin",
                    isSelected: false
                }]
            },
        ];
    } //Samiksha
    else if ($state.newUrl !== 'service' && $state.productNameFoldingCartons && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && !$state.productNamepolyviny) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.productKetchup = false;
        $scope.productFoldingCarton = true;
        $scope.productMilk = false;
        $scope.taskList = [{
                title: "Production Costs",
                isTaskVisible: true,
                isSelected: true,
                taskGrp: [{
                        title: "Labor",
                        isSelected: false,
                    },
                    {
                        title: "Process Loss",
                        isSelected: false,
                    },
                    {
                        title: "Production",
                        isSelected: false,
                    }
                ]
            },
            {
                title: "Shipment Costs",
                isTaskVisible: false,
                isSelected: false,
                taskGrp: [{
                    title: "Freight and WHS",
                    isSelected: false
                }]
            },
            {
                title: "Margin",
                isTaskVisible: false,
                isSelected: false,
                taskGrp: [{
                    title: "Supplier Margin",
                    isSelected: false
                }]
            },
        ];
    }else if ($state.newUrl !== 'service' && !$state.productNameFoldingCartons && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis && $state.productNamepolyviny) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.productKetchup = false;
        $scope.productFoldingCarton = true;
        $scope.productMilk = false;
        $scope.taskList = [{
                title: "Production Costs",
                isTaskVisible: true,
                isSelected: true,
                taskGrp: [{
                        title: "Labor",
                        isSelected: false,
                    },
                    {
                        title: "Utilities",
                        isSelected: false,
                    },
                    {
                        title: "Overheads",
                        isSelected: false,
                    }
                ]
            }
        ];
    }
     else if ($state.newUrl !== 'service' && !$state.productNameKetchup && !$state.productNameFoldingCartons && $state.productNameFuleHouse && !$state.productNamePretzelAnalysis) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.productKetchup = false;
        $scope.productFoldingCarton = false;
        $scope.productMilk = false;
        $scope.productNameFuleHouse = true;
        $scope.taskList = [{
                title: "Tooling Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Machining",
                        isSelected: false,
                    },
                    {
                        title: "Trimming",
                        isSelected: false,
                    },
                    {
                        title: "Overhead",
                        isSelected: false,
                    }
                ]
            },
            {
                title: "Development Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Engineering",
                        isSelected: false
                    },
                    {
                        title: "Test & Verification",
                        isSelected: false
                    },
                    {
                        title: "Outside Processing",
                        isSelected: false
                    }
                ]
            },
            {
                title: "Shipping Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Transportation",
                        isSelected: false
                    },
                    {
                        title: "Custom Duty",
                        isSelected: false
                    },
                    {
                        title: "Packaging",
                        isSelected: false
                    }
                ]
            }
        ];
    } else if ($state.newUrl !== 'service' && !$state.productNameFoldingCartons && !$state.productNameKetchup && $state.productNameMilk && !$state.productNamePretzelAnalysis) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.productKetchup = false;
        $scope.productFoldingCarton = false;
        $scope.productMilk = true;
        $scope.taskList = [{
                title: "Feed and Cattle Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Cattle",
                        isSelected: false,
                    },
                    {
                        title: "Feed",
                        isSelected: false,
                    },
                    {
                        title: "Vertinary & Medicines",
                        isSelected: false,
                    },
                    {
                        title: "Infrastructure-bedding, litter",
                        isSelected: false,
                    }
                ]
            },
            {
                title: "Operating Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Storage",
                        isSelected: false
                    },
                    {
                        title: "Transportation",
                        isSelected: false
                    },
                    {
                        title: "Marketing & Admin",
                        isSelected: false
                    }
                ]
            },
            {
                title: "Overhead Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Land costs",
                        isSelected: false
                    },
                    {
                        title: "Machine deprecation",
                        isSelected: false
                    }
                ]
            },
            {
                title: "Labor Costs",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "Farm Labor",
                        isSelected: false
                    },
                    {
                        title: "Factory Labor",
                        isSelected: false
                    }
                ]
            },
            {
                title: "Margin",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                    title: "Supplier Margin",
                    isSelected: false
                }]
            }
        ];
    } else if ($state.newUrl !== 'service' && !$state.productNameFoldingCartons && !$state.productNameKetchup && $state.productNamePretzelAnalysis && !$state.showPretzelsInnerPage) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.productKetchup = false;
        $scope.productFoldingCarton = false;
        $scope.productMilk = false;
        $scope.productNameFuleHouse = false;
        $scope.productPretzels = true;
        $scope.pretzelsShippingCost = true;
        $scope.costSourceDrop = [{
            "options": [{
                "name": "Computed"
            }, {
                "name": "Manual"
            }],
            "selectedoption": {
                "name": "Manual"
            }
        }];
        $scope.taskList = [{
                title: "Shipping Cost",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                    title: "Toll/2780850000/PRETZEL (R/W), NO PHO RED 39039H 550LB",
                    isSelected: false,
                }]
            },
            {
                title: "Packaging Cost",
                isTaskVisible: true,
                isSelected: false,
                taskGrp: [{
                        title: "SLIPSHEETS, GMI (GARDETTO) (41X46)",
                        isSelected: false
                    },
                    {
                        title: 'GARDETTOS 46.5" BULK TOTE BODY',
                        isSelected: false
                    },
                    {
                        title: "BULK TOTE CAP GREEN 50",
                        isSelected: false
                    },
                    {
                        title: "AIR BAG 48X84 REUSABLE",
                        isSelected: false
                    },
                    {
                        title: "TOTE STRAPPING, CLEAR HD 723 2X1612",
                        isSelected: false
                    },
                    {
                        title: "LINER, 51IN RW CEREAL BLK 3MIL UNPRT",
                        isSelected: false
                    },
                    {
                        title: "LABEL, SU 4X6 W/PEEL OFF LEAD EDGE (ROLL)",
                        isSelected: false
                    },
                    {
                        title: "TAPE, TOTE 24 ROLLS/CASE 1.42x180.45'",
                        isSelected: false
                    },
                ]
            }
        ];

    } else if ($state.newUrl !== 'service' && !$state.productNameFoldingCartons && !$state.productNameKetchup && $state.productNamePretzelAnalysis && $state.showPretzelsInnerPage) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.productKetchup = false;
        $scope.productFoldingCarton = false;
        $scope.productMilk = false;
        $scope.productNameFuleHouse = false;
        $scope.productPretzels = false;
        $scope.pretzelsShippingCost = false;
        $scope.pretZelInnerPage = true;
        $scope.pretZelInnerPageData = true;
        $scope.costSourceDrop = [{
            "options": [{
                "name": "Computed"
            }, {
                "name": "Manual"
            }],
            "selectedoption": {
                "name": "Computed"
            }
        }];
        $scope.taskList = [{
                title: "MALT SYRUP NON-DIASTATIC",
                isTaskVisible: true,
                isSelected: true,
            },
            {
                title: "FLOUR, PATHFINDER ENRICHED SILOS(110100)",
                isTaskVisible: true,
                isSelected: false,
            },
            {
                title: "CANOLA OIL, HIGH OLEIC",
                isTaskVisible: true,
                isSelected: false,
            },
            {
                title: "YEAST(1002-50) FRESH BAKERS 50# BAGS GW",
                isTaskVisible: true,
                isSelected: false,
            },
            {
                title: "CAUSTIC SODA SODIUM 50% HYDROXIDE TOTE",
                isTaskVisible: true,
                isSelected: false,
            },
            {
                title: "SALT, MORTON ROCK /PRETZELS 4133",
                isTaskVisible: true,
                isSelected: false,
            },
            {
                title: "SODIUM BICARBONATE, USP #2 50LB BAG",
                isTaskVisible: true,
                isSelected: false,
            },
            {
                title: "CL WATER TOTAL",
                isTaskVisible: true,
                isSelected: false,
            }
        ];

    }
    //Should Cost Analysis Starts

    $scope.showBorder = $state.showPretzelsInnerPage;

    $scope.value2 = "0.55";
    $scope.value3 = "0.12";
    $scope.value4 = "0.15";
    $scope.value5 = "7.595";
    $scope.value6 = "1.085";
    $scope.value7 = "1.085";
    $scope.toolingCostVal = "4.32";
    $scope.pretzelValue = "0.23";
    $scope.maltSyrupValue = "0.0013";
    $scope.overheadCostValue = '3.720';
    $scope.trimmingCostValue = '1.20';
    $scope.operatingCostValue = '2.015';
    $scope.machiningCostValue = '2.75';
    $scope.develpmntCostValue = '2.10';
    $scope.packagingCostSectionvalue = '0.40';
    $scope.shippingCostSectionvalue = '1.68';
    $scope.packagingCostValue = '0.0002';

    $scope.formulaForPretzel = 'Autosum';

    $scope.currency11 = "EA";
    $scope.currency111 = "USD";
    $scope.cattleValue = '3.038';
    $scope.costSource = "Computed";
    $scope.costSourceLabour = "Manual";
    $scope.value1 = '0.2817';
    $scope.value1service = "63,259";
    $scope.valueLabour = "1,200";
    $scope.valueOper = "500";
    $scope.currency1 = "USD";
    $scope.formulaLabel = "--";
    $scope.formulaServiceMain = "Autosum";
    $scope.formulaServiceProjectMgm = "Number of Hours * Labor Rate";
    $scope.formulaServiceJobSite = "Autosum";
    $scope.formulaServiceMaterial = "AutoMultiply";
    $scope.formula1 = "";
    $scope.valueServPrj = "16,135";
    $scope.valueLifting = "12,500";
    $scope.currencyOptions = [{
        "code": "$",
        "name": "Manual"
    }, {
        "code": "€",
        "name": "Material"
    }];
    $scope.selectedCurrency = {
        "code": "€",
        "name": "EUR"
    };
    $scope.onChange = function (selectedCurrency) {
        console.log(selectedCurrency);
    };

    $scope.computed = true;
    $scope.abc = function (e) {
        if (e == "Manual") {
            $scope.manual = true;
            $scope.computed = false;
            $scope.manual1 = true;
            $scope.computed1 = false;
            $scope.manual2 = true;
            $scope.computed2 = false;
            $scope.manual3 = true;
            $scope.computed3 = false;
            $scope.manual4 = true;
            $scope.computed4 = false;
            $scope.manual5 = true;
            $scope.computed5 = false;
            $scope.manual6 = true;
            $scope.computed6 = false;


        } else if (e == "Computed") {
            $scope.manual = false;
            $scope.computed = true;
            $scope.manual1 = false;
            $scope.computed1 = true;
            $scope.manual2 = false;
            $scope.computed2 = true;
            $scope.manual3 = false;
            $scope.computed3 = true;
            $scope.manual4 = false;
            $scope.computed4 = true;
            $scope.manual5 = false;
            $scope.computed5 = true;
            $scope.manual6 = false;
            $scope.computed6 = true;
        }
    }
    $scope.approvalType = {
        "options": [{
            "name": "Manual"
        }, {
            "name": "Market Index"
        }, {
            "name": "Historical"
        }, {
            "name": "Computed"
        }],
        "selectedoption": {
            "name": "Manual"
        }

    }

    // Product 

    $scope.costSourceDrop = [{
        "options": [{
            "name": "Manual"
        }, {
            "name": "Computed"
        }],
        "selectedoption": {
            "name": "Computed"
        }
    }];


    if ($state.newUrl !== 'service' && !$state.productNameKetchup && $state.productNamePretzelAnalysis && !$state.showPretzelsInnerPage) {
        $scope.product1 = false;
        $scope.services1 = false;
        $scope.computed = false;
        $scope.manual = true;
        $scope.productFoldingCarton = false;
        $scope.productKetchup = false;
        $scope.productMilk = false;
        $scope.productNameFuleHouse = false;
        $scope.productPretzels = true;
        $scope.pretzelsShippingCost = true;
        $scope.costSourceDrop = [{
            "options": [{
                "name": "Computed"
            }, {
                "name": "Manual"
            }],
            "selectedoption": {
                "name": "Manual"
            }
        }];

    }


    $scope.prodCostAddRowCallback = function () {
        $scope.taskList1.push({
            standardPart: $scope.taskList1.length + 1,
            jan08: 'Select Cost Element',
            jun09: '--',
            jul13: '--',
            dec11: 'Select UOM',
            approvalType: {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        });
    }
    if ($state.productNameKetchup && !$state.productNameMilk && !$state.productNameFuleHouse) {
        $scope.taskList1 = [{
                'standardPart': '1',
                'jan08': 'Labor',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '$0.07'

            },
            {
                'standardPart': '2',
                'jan08': 'Capital',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '$0.22'
            },
            {
                'standardPart': '3',
                'jan08': 'SG&A',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '$0.08'
            },
            {
                'standardPart': '4',
                'jan08': 'Packaging',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '$0.18'
            }
        ];
    }

    if (!$state.productNameKetchup && $state.productNameMilk) {
        $scope.taskList1 = [{
                'standardPart': '1',
                'jan08': 'Cattle',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '3.038'
            },
            {
                'standardPart': '2',
                'jan08': 'Feed',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '0.759'
            },
            {
                'standardPart': '3',
                'jan08': 'Vetinary & Medicines',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '2.278'
            },
            {
                'standardPart': '4',
                'jan08': 'Infrastructure-bedding, litter',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '1.52'
            }
        ];
    }

    if ($state.productNameFuleHouse) {
        $scope.taskList1 = [{
                'standardPart': '1',
                'jan08': 'Machining',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Computed"
                    }, {
                        "name": "Manual"
                    }],
                    "selectedoption": {
                        "name": "Computed"
                    }
                },
                "value": '2.75',
                "indexName": ""
            },
            {
                'standardPart': '2',
                'jan08': 'Trimming',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Computed"
                    }, {
                        "name": "Manual"
                    }],
                    "selectedoption": {
                        "name": "Computed"
                    }
                },
                "value": '1.20',
                "indexName": ""
            },
            {
                'standardPart': '3',
                'jan08': 'Overhead',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "value": '0.37'
            }
        ];
    }

    if ($state.productNamePretzelAnalysis && !$state.showPretzelsInnerPage) {
        $scope.taskList1 = [{
            'standardPart': '1',
            'jan08': 'Toll/2780850000/PRETZEL (R/W), NO PHO RED 39039H 550LB',
            'jun09': '',
            'apr10': '',
            'dec11': 'EA',
            'jul13': '',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            },
            "value": '0.23'

        }];
    }

    if ($state.productNamePretzelAnalysis && $state.showPretzelsInnerPage) {
        $scope.taskList1 = [];
    }

    $scope.laborCostAddRowCallback = function () {
        $scope.laborCostItems.push({
            standardPart: $scope.laborCostItems.length + 1,
            jan08: 'Select Cost Element',
            jun09: '--',
            jul13: '--',
            dec11: 'Select UOM',
            approvalType: {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }

        });
        $scope.fillpartialTeamMember11 = false;
    }
    $scope.laborCostItems = [];


    $scope.operOverAddRowCallback = function () {
        $scope.operationOverhead.push({
            standardPart: $scope.operationOverhead.length + 1,
            jan08: 'Select Cost Element',
            jun09: '--',
            jul13: '--',
            dec11: 'Select UOM',
            approvalType: {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        });
        $scope.fillpartialTeamMember22 = false;
    }
    $scope.operationOverhead = [];

    // Services
    $scope.serviceMainAddRowCallback = function () {
        $scope.serviceList.push({
            standardPart: $scope.serviceList.length + 1,
            jan08: 'Select Cost Element',
            jun09: '--',
            jul13: '--',
            dec11: 'Select UOM',
            approvalType: {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        });
    }
    $scope.serviceList = [{
            'standardPart': '1',
            'jan08': 'Temporary utilities',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '16,135',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }

        },
        {
            'standardPart': '2',
            'jan08': 'Onsite trailers',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '29,043',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '3',
            'jan08': 'Mobilization and demobilization',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '8,980',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '4',
            'jan08': 'Drainage/erosion controls',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '640',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '5',
            'jan08': 'Dumpsters',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '6',
            'jan08': "Drinking water",
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '686',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '7',
            'jan08': 'Site cleanup services',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '3,200',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '8',
            'jan08': 'Temporary site signage',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '9',
            'jan08': 'Site safety',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '10',
            'jan08': 'Small tools',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '11',
            'jan08': 'Jobsite superintendent/supervision (a project-specific salary)',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
        {
            'standardPart': '12',
            'jan08': 'Site security',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }

        },

        {
            'standardPart': '13',
            'jan08': 'Temporary toilets',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }

        },
        {
            'standardPart': '14',
            'jan08': 'Permits',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency',
            'valueS': '2,287',
            "approvalType": {
                "options": [{
                    "name": "Computed"
                }, {
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Computed"
                }
            }
        },
    ];

    if ($state.productNameAcrylonitrile && !$state.viewScenario) {
        $scope.serviceList = [{
                'standardPart': '1',
                'jan08': 'Utilities',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "valueS": '0.0421'

            },
            {
                'standardPart': '2',
                'jan08': 'Fixed Costs',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "valueS": '0.2408'
            },
            {
                'standardPart': '3',
                'jan08': 'Other Expenses',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Historical"
                    }
                },
                "valueS": '0.0409'
            }
        ];
    }

    if ($state.productNameAcrylonitrile && $state.viewScenario) {
        $scope.serviceList = [{
                'standardPart': '1',
                'jan08': 'Utilities',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "valueS": '0.0421'

            },
            {
                'standardPart': '2',
                'jan08': 'Fixed Costs',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Manual"
                    }
                },
                "valueS": '0.3210'
            },
            {
                'standardPart': '2',
                'jan08': 'Other Expenses',
                'jun09': '',
                'apr10': '',
                'dec11': 'Currency',
                'jul13': '',
                "approvalType": {
                    "options": [{
                        "name": "Manual"
                    }, {
                        "name": "Market Index"
                    }, {
                        "name": "Historical"
                    }, {
                        "name": "Computed"
                    }],
                    "selectedoption": {
                        "name": "Historical"
                    }
                },
                "valueS": '0.0545'
            }
        ];
    }

    $scope.servicePrjtMgmtAddRowCallback = function () {
        $scope.projectMgmt.push({
            standardPart: $scope.projectMgmt.length + 1,
            jan08: 'Select Cost Element',
            jun09: '--',
            jul13: '--',
            dec11: 'Select UOM',
            approvalType: {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        });
    }
    $scope.projectMgmt = [{
            'standardPart': '1',
            'jan08': 'Number of Hours',
            'jun09': '',
            'apr10': '',
            'dec11': 'Hours',
            'valueS': '10',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }

        },
        {
            'standardPart': '2',
            'jan08': 'Labor Rate',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency/ Hour',
            'valueS': '1,613.50',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        },
    ];


    $scope.serviceLiftEquipAddRowCallback = function () {
        $scope.liftingEquip.push({
            standardPart: $scope.liftingEquip.length + 1,
            jan08: 'Select Cost Element',
            jun09: '--',
            jul13: '--',
            dec11: 'Select UOM',
            approvalType: {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        });
    }
    $scope.liftingEquip = [{
            'standardPart': '1',
            'jan08': 'Number of Units',
            'jun09': '',
            'apr10': '',
            'dec11': 'Count',
            'valueS': '5',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }

        },
        {
            'standardPart': '2',
            'jan08': 'Equipment Rate',
            'jun09': '',
            'apr10': '',
            'dec11': 'Currency/ Unit',
            'valueS': '2,500',
            "approvalType": {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        },
    ];


    $scope.serviceJobsOverheadAddRowCallback = function () {
        $scope.jobsiteOverhead.push({
            standardPart: $scope.jobsiteOverhead.length + 1,
            jan08: 'Select Cost Element',
            jun09: '--',
            jul13: '--',
            dec11: 'Select UOM',
            approvalType: {
                "options": [{
                    "name": "Manual"
                }, {
                    "name": "Market Index"
                }, {
                    "name": "Historical"
                }, {
                    "name": "Computed"
                }],
                "selectedoption": {
                    "name": "Manual"
                }
            }
        });
    }
    $scope.jobsiteOverhead = [{
        'standardPart': '1',
        'jan08': 'Mics / Jobsite Overhead',
        'jun09': '',
        'apr10': '',
        'dec11': 'Currency',
        'valueS': '500',
        "approvalType": {
            "options": [{
                "name": "Manual"
            }, {
                "name": "Market Index"
            }, {
                "name": "Historical"
            }, {
                "name": "Computed"
            }],
            "selectedoption": {
                "name": "Manual"
            }
        }

    }, ];

    $scope.typeddOpts = [{
            "title": "Number"
        },
        {
            "title": "Computed"
        },
        {
            "title": "Currency"
        },
        {
            "title": "Date"
        },
        {
            "title": "Drop Down"
        },
        {
            "title": "Text"
        },
        {
            "title": "Time"
        },
        {
            "title": "Long Text"
        },
        {
            "title": "Percentage"
        }
    ];

    if ($state.productNameAcrylonitrile) {
        $scope.$watch(
            function () {
                return $scope.taskList1;
            },
            function (newValue, oldValue) {
                var total = 0;
                if (!angular.equals(oldValue, newValue)) {

                    angular.forEach(newValue,
                        function (task) {
                            task.value = task.value === '' ? 0 : task.value;
                            total = total + (parseFloat(task.value.replace(/,/g, '')));
                        });
                    $scope.value1 = total;
                    $rootScope.productionCost = total;
                    $rootScope.taskList1 = $scope.taskList1;
                }
                $scope.taskList1 = $rootScope.taskList1 === undefined ? $scope.taskList1 : $rootScope.taskList1;
            },
            true);
    }

    $scope.onProductionValueChange = function (event) {
        $rootScope.productionCost = parseFloat($(event.target).val().replace(',', '')).toFixed(2);
    };
 $scope.showChildTaskCall(0, 0, true);
}

//Should Cost Analysis Ends



function notesAndAttachmentCtrlFunc($scope, $rootScope, RuleEngine, $http, $timeout, $sce, $state) {
    $scope.statefrom = $state.params.statefrom;


    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.showUploadContractPopup = false;
    $scope.adduploadContractCallback = function (e) {
        $scope.showUploadContractPopup = true;
    }
    $scope.hideUploadContractPopupCallback = function (e) {
        $scope.showUploadContractPopup = false;
    }

    $scope.docDiscription = {
        docName: "Upload Document",
        fileSupport: "Supported file formats : Image , PDF, Word , Excel or  PPT Files.",
        fileSize: "Limited to file(s) of 5MB each.",
        fileLimit: "Maximum 5 files can be uploaded."
    }
    $scope.types = {
        fileType: ".jpg, .jpg, .pdf, .docx"
    }
    $scope.rowsToShowOpts = [{
            'size': '5'
        },
        {
            'size': '10'
        }
    ];
    $scope.defaultOption = {
        'size': '5'
    };
    $scope.selectedOption = {
        'size': '5'
    };
    $scope.rowsToShowOpts = {
        availableOptions: [{
                size: '5'
            },
            {
                size: '10'
            }
        ],
        selectedOption: {
            size: '5'
        }
    };
    $scope.attachmentsNotesAndLink = [];

    $scope.attachments = [{
            name: "Product Specification.docx",
            fileSize: "30 KB",
            uploadDate: "11/03/2018",
            uploadBy: "Emily Ross",
            type: "File",
            isChecked: false
        },
        {
            name: "Specification.docx",
            fileSize: "10 KB",
            uploadDate: "11/03/2018",
            uploadBy: "Emily Ross",
            type: "File",
            isChecked: false
        }
    ];
    $scope.attachmentMsg = "Supported file formats: doc, docs,pdf, jpg, jpeg, png, tiff.\
        <br />Limited to file(s) of 10MB each.\
	    <br /> Maximum 5 files can be uploaded.";
    $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
    $scope.attchmentMsg = $scope.attachmentMsg;
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
    $scope.selectAllAttach = {
        checkedAll: false
    };
    $scope.checkedAllAttach = function (check) {
        $scope.fillpartial = false;
        if (check) {
            for (var i = 0; i < $scope.attachments.length; i++) {
                $scope.attachments[i].isChecked = true;
            }
        } else {
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
        } else if (countAttachList === $scope.attachments.length) {
            $scope.fillpartial = false;
            $scope.selectAllAttach.checkedAll = true;
        } else {
            $scope.fillpartial = true;
        }
    }
    $scope.selectedClassification = {
        title: "S & P"
    };
    $scope.classificationOptions = [{
            title: "S & P"
        },
        {
            title: "Process step"
        },
        {
            title: "Reference"
        }
    ];
    // $scope.attachNotesName = "";
    $scope.attachNotesDesp = "";
    $scope.attachLinkDesp = "";
    $scope.attachExternalName = "";
    $scope.attachExternalURL = "";
    $scope.noteName = {
        name: '',
        desp: ''
    };
    $scope.linkName = {
        name: '',
        url: ''
    };
    $scope.showNotesAttach = false;
    $scope.showNotesAttachCall = function () {
        $scope.noteName = {
            name: '',
            desp: ''
        };
        $scope.showNotesAttach = true;
    }
    $scope.hideNotesAttachPopupCallback = function (e) {
        $scope.showNotesAttach = false;

    }
    $scope.showExternalLinkAttach = false;
    $scope.showExternalLinkAttachCall = function () {
        $scope.linkName = {
            name: '',
            url: ''
        };
        $scope.showExternalLinkAttach = true;
    }
    $scope.hideExternalLinkAttachPopupCallback = function (e) {
        $scope.showExternalLinkAttach = false;

    }
    if ($scope.mode == "executedContract" || $scope.mode == "editMode" || $scope.mode == "languageDrafted") {
        $scope.isAttachmentAdded = true;
    }
    if ($scope.mode == 'blanketdata' || $scope.mode == 'contractdata') {
        $scope.isAttachmentAdded = true;
        $scope.attachmentsNotesAndLink = [{
                name: 'Product Specification.docx',
                fileSize: "20 KB",
                uploadDate: "11/03/2018",
                uploadBy: "Emily Ross",
                type: "File",
                isChecked: false
            },
            {
                name: 'Shipping & Handing Insructions',
                desp: 'If you are not sure about the Booking number, click this button adjacent to the field. A Select Booking dialogue box containing all booking numbers created by you in the last 7 days is displayed. You can further narrow down your search by providing additional filter criteria in the fields displayed on clicking Advance Search. Select the required Booking from the list either by double-clicking on the row or clicking Select.',
                fileSize: "18 KB",
                uploadDate: "11/03/2018",
                uploadBy: "Emily Ross",
                type: "Notes",
                isChecked: false
            },
            {
                name: 'Website Link',
                url: 'http://www.laptopmag.com/',
                fileSize: "-",
                uploadDate: "11/03/2018",
                uploadBy: "Emily Ross",
                type: "External Link",
                isChecked: false
            }

        ];
    }

    $scope.attachAction = function () {
        var newFile = {
            name: 'Product Specification.docx',
            fileSize: "20 KB",
            uploadDate: "11/03/2018",
            uploadBy: "Emily Ross",
            type: "File",
            isChecked: false
        };
        $scope.attachmentsNotesAndLink.push(newFile);
        $scope.isAttachmentAdded = true;
    }
    $scope.notesSaveCall = function () {
        var newNotes = {
            name: $scope.noteName.name,
            desp: $scope.noteName.desp,
            fileSize: "18 KB",
            uploadDate: "11/03/2018",
            uploadBy: "Emily Ross",
            type: "Notes",
            isChecked: false
        };
        $scope.attachmentsNotesAndLink.push(newNotes);
        $scope.isAttachmentAdded = true;
    }

    $scope.linkSaveCall = function () {
        var newLink = {
            name: $scope.linkName.name,
            url: $scope.linkName.url,
            fileSize: "-",
            uploadDate: "11/03/2018",
            uploadBy: "Emily Ross",
            type: "External Link",
            isChecked: false
        };
        $scope.attachmentsNotesAndLink.push(newLink);
        $scope.isAttachmentAdded = true;
    }
    $scope.attachmentNameCall = function (attachObj) {
        if (attachObj.type == "Notes") {
            $scope.attachNotesName = attachObj.name;
            $scope.attachNotesDesp = attachObj.desp;
            $scope.showNotesAttach = true;
        }
        if (attachObj.type == "External Link") {
            $scope.attachExternalName = "xyz.com";
            $scope.showExternalLinkAttach = true;
        }
    }

    if ($state.params.mode === "readOnly" || $state.params.statefrom === "buyerLoginSC") {
        $scope.isAttachmentAdded = true;
        $scope.attachmentsNotesAndLink = [{
                name: "Product Specification.docx",
                fileSize: "30 KB",
                uploadDate: "11/03/2018",
                uploadBy: "Emily Ross",
                type: "File",
                isChecked: false
            },
            {
                name: "Specification.docx",
                fileSize: "10 KB",
                uploadDate: "11/03/2018",
                uploadBy: "Emily Ross",
                type: "File",
                isChecked: false
            }
        ];
    } else {
        $scope.attachmentsNotesAndLink = [];
    }
}