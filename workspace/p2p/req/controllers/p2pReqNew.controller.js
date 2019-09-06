angular.module('SMART2')

    .controller('p2pReqNewCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', '$interval', '$notification', 'storeService', '$window', p2pReqNewCtrlFunc])
    .controller('itemDetailReqCtrl', ['$scope', 'notification', '$translate', '$timeout', '$sce', '$http', '$timeout', '$rootScope', '$state', 'lookup', '$smartModal', itemDetailReqCtrlFunc])
    .controller('addLinesCtrl', ['$scope', addLinesCtrlFunc])
    .controller('attachmentSectionCtrl', ['$scope', attachmentSectionCtrlFunc])
    .controller('notesAndAttachmentCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$timeout', '$sce', notesAndAttachmentCtrlFunc])
    .controller('chargesAndAllowancesCtrl', ['$scope', 'notification', '$translate', '$timeout', chargesAndAllowancesCtrlFunc])
    .controller('additionalInfoSectionCtrl', ['$scope', additionalInfoSectionCtrlFunc])
    .controller('p2pBuCtrl', ['$scope', '$http', '$sce', p2pBuCtrlFunc])
    .controller('popupShipToCtrl', ['$scope', popupShipToCtrlFunc])
    .controller('p2pReqAdditionalInformationCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$window', '$state', '$timeout', '$sce', '$filter', p2pReqAdditionalInformationCtrlFunc])
    .controller('plantSupAssoCtrl', ['$scope', plantSupplierAssociationFunc])
    .controller('plantBuyAssoCtrl', ['$scope', plantBuyerAssociationFunc])
    .controller('notesAttachCtrl', ['$scope', notesAttachmentFunc])
    .controller('costElementCtrl', ['$scope', '$rootScope', '$http', '$state', costElementFunc])
    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    });

function p2pReqNewCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce, $interval, $notification, storeService, $window) {



    $scope.emailNotifyPopupUrl = "shared/admin/views/emailNotificationPopup.html";

    $scope.emailNotify = false;
    $scope.emailNotifyCallback = function (e) {
        $scope.emailNotify = true;
    };

    $scope.emailNotifyOnHideCallback = function (e) {
        $scope.emailNotify = false;
    };
    $scope.isActualVisible = false;
    $timeout(function () {
        $scope.isActualVisible = true;
    }, 2000);
    //demo Js
    //$scope.emailNotify = false;
    //$scope.emailNotifyCallback = function (e) {
    //    $scope.emailNotify = true;
    //};
    //$scope.popupPreviewInPopup = function (e) {
    //    $scope.showpreviewPopup = true;
    //    $scope.emailNotify = false;
    //};
    $scope.test = [{
            "name": 'test1',
        },
        {
            "name": 'test2',
        },
    ];
    $scope.listCardsData = [{
            "name": 'test1',
            // "orangeBorder": true,
            "options": [{
                    "optName": "Name"
                },
                {
                    "optName": "View",
                    "id": 1,
                }
            ],
        },
        {
            "name": 'test2',
            "orangeBorder": false,
            "options": [{
                    "optName": "Name"
                },
                {
                    "optName": "View",
                    "id": 1,
                }
            ],
        },
        {
            "name": 'test3',
            "redBorder": true,
            "options": [{
                    "optName": "Name",
                },
                {
                    "optName": "View",
                    "id": 1,
                },
                {
                    "optName": "Investigate",
                },
                {
                    "optName": "Email",
                }
            ],
        },
        {
            "name": 'test4',
            "redBorder": false,
            "orangeBorder": true,
            "options": [{
                    "optName": "Name",
                },
                {
                    "optName": "View",
                    "id": 1,
                },
                {
                    "optName": "Investigate",
                },
                {
                    "optName": "Email",
                }
            ],
        },
        {
            "name": 'test5',
            "redBorder": false,
            "options": [{
                    "optName": "Name"
                },
                {
                    "optName": "View",
                    "id": 1,
                }
            ],
        },

    ];

    $scope.cardDropdown = function (id) {
        if (id == "1") {
            $state.go('p2p.req.previewDemo');
        }
    }

    $scope.viewCard = false;

    $scope.clickOnButton = function () {
        $scope.viewCard = !$scope.viewCard;
    };

    //End Demo Js


    $scope.id = $state.params.id;
    $scope.mode = $state.params.mode;
    $scope.approvalPending;
    $scope.status = "DRAFT";
    var getURLwithStatus;
    if ($scope.id == 1) {
        $scope.approvalPending = true
        $scope.status = "approval Pending";
        getURLwithStatus = 'p2p/req/models/ApprovalPending.json'

    } else {
        $scope.approvalPending = false;
        $scope.status = "DRAFT";
        getURLwithStatus = 'p2p/req/models/createReq.json'

    }

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
    $scope.submitReq = function () {
        var confi = {
            type: "success",
            message: "<p class='left-align'>Requisition has been submitted successfully.</p>",

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
                $state.go('expandedLandingList', {
                    pagefor: 'manage',
                    doctype: 'requisition'
                });
            } else {
                return;
            }
        });
    }

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

function itemDetailReqCtrlFunc($scope, notification, $translate, $timeout, $sce, $http, $timeout, $rootScope, $state, lookup, $smartModal) {

    $scope.exemptConfirmCall = function () {

        var config = {
            type: "confirm",
            message: "<div class='left-align'>This will result in deleting all the Taxes associated with the Line Item. Do you want to proceed?</div>",
            buttons: [{
                    "title": "YES",
                    "result": "yes"
                },
                {
                    "title": "No",
                    "result": "no"
                }
            ]
        }
        notification.notify(config, function (response) {
            if (response.result == 'no') {
                $scope.showTaxesPopup = true;
            }
        });
    }

    $scope.calculateTaxCalled = function () {
        var confi = {
            type: "confirm",
            message: "<p class='left-align'>This may take a while. You can re-visit the page once taxes are calculated</p>",
            checkMessage: "Notify over Email",
            buttons: [{
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
    // Start: Line Items upload popup
    $scope.reqLineItemUploadPopupUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.reqLineItemUploadPopup = false;
    $scope.reqLineItemUploadPopupCallback = function (e) {
        $scope.uploadTitle = "UPLOAD LINES";
        $scope.uploadTitleContent = "Upload Documents";
        $scope.reqLineItemUploadPopup = true;
    };
    $scope.reqLineItemUploadPopupHideCallback = function (e) {
        $scope.reqLineItemUploadPopup = false;
    };
    // End: Line Items upload popup


    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e) {
        $scope.uploadTitle = "ADD ATTACHMENTS";
        $scope.uploadTitleContent = "Upload Documents";
        $scope.showUploadPopup = true;
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
    }

    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.attachmentMsg = "Supported file formats: doc, docs, pdf, jpg, jpeg, png, tiff.\
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

    $scope.attachAction = function () {
        if ($scope.reqLineItemUploadPopup == true) {
            //console.log("Action call");
            $timeout(function () {
                var confi = {
                    type: "success",
                    message: "<p class='left-align'>Your request to import the contract lines is being processed. Check the import logs which will be available after some time under the link 'Download error log'.</p>",

                    buttons: [{
                        "title": "OK",
                        "result": "ok"
                    }]
                };

                //Notification call
                notification.notify(confi, function (responce) {
                    if (responce.result == "ok") {
                        //$state.go('expandedLandingList', { pagefor: 'manage', doctype: 'requisition' });
                        return;
                    }
                });
            }, 300);
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
    /********/

    $scope.addLinesFormUrl = "p2p/req/views/popupAddLinesForm.html";

    $scope.addLinesFormPopUp = false;
    $scope.addLinesFormPopUpCallback = function (e) {
        $scope.addLinesFormPopUp = true;
    };
    $scope.addLinesFormPopUpClose = function (e) {
        $scope.addLinesFormPopUp = false;
    };

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
    $scope.fillpartial = false;
    $scope.reqCheckedAll = {
        'check': false
    };
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
        } else if (checkCounter === importFromReqlength) {
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

    // popup -- Add Info
    $scope.AddChargesAttach = "shared/popup/views/popupEditStandardAttacment.html";
    $scope.AddChargesAttachPopup = false;
    $scope.AddChargesAttachCallback = function (e) {
        $scope.AddChargesAttachPopup = true;
    };
    $scope.AddChargesAttachPopupHideCallback = function (e) {
        $scope.AddChargesAttachPopup = false;
    };
    //select All
    //$scope.checkAll = function (aug) {
    //    angular.forEach($scope.importFromReq, function (importFromReq, key) {
    //        $scope.importFromReq[key].selected = aug;
    //    });
    //};
    //$scope.fillpartial = function () {
    //	if ($scope.importFromTemp.item.selected < $scope.importFromTemp.length) {
    //		alert("TRUE");
    //	}
    //}
    //$scope.checkAllTemp = function (aug) {
    //    angular.forEach($scope.importFromTemp, function (importFromTemp, key) {
    //    	$scope.importFromTemp[key].selected = aug;        	
    //    	//$scope.fillpartial = true;
    //    });
    //};

    /* ADD LINES FROM - TEMPLATE - CHECKBOX SELECTION */
    //$scope.modal = {
    //	selectedItems: []
    //};

    //$scope.onChangeTemp = function () {
    //	$scope.modal.selectedItems = [];
    //	//alert("SELECT ALL - " + $scope.masterSelect);
    //	if ($scope.masterSelect) {
    //		$scope.masterSelect = false;    		

    //		for (i = 0; i < $scope.importFromTemp.length; i++) {
    //			$scope.modal.selectedItems.push($scope.importFromTemp[i].lable);
    //		};    		
    //		//alert("CHECKED - " + $scope.modal.selectedItems);
    //		$scope.modal.selectedItems = [];
    //	} else {
    //		//alert();    		
    //		$scope.masterSelect = true;
    //		//alert("UNCHECKED - " + $scope.modal.selectedItems);
    //	};    	

    //	angular.forEach($scope.importFromTemp, function (item) {
    //		item.selected = $scope.masterSelect;
    //    });

    //};
    //$scope.fillpartial = true;
    //$scope.tempListChange = function () {
    //	var itemLabel = this.item.lable;
    //	//alert($scope.fillpartial);
    //	//$scope.masterSelect = true;
    //	//$scope.masterSelect.fillpartial = true;

    //	if (this.item.selected) {
    //		//alert("ON CLICK - " + $scope.masterSelect);
    //		$scope.modal.selectedItems.push(itemLabel);
    //		$scope.fillpartial = true;
    //		if ($scope.modal.selectedItems.length == $scope.importFromTemp.length) {
    //			$scope.masterSelect = true;
    //			$scope.fillpartial = false;
    //		} else {
    //			$scope.masterSelect = true;
    //			$scope.fillpartial = true;
    //			//alert("ON CHANGE - " + $scope.masterSelect);
    //};
    //	} else {
    //		//alert("UNCHECKED - " + $scope.modal.selectedItems);
    //		var index = $scope.modal.selectedItems.indexOf(itemLabel);
    //		$scope.modal.selectedItems.splice(index, 1);

    //		if ($scope.modal.selectedItems.length === 0) {
    //			$scope.masterSelect = false;
    //		}
    //};

    //}
    /* ADD LINES FROM - TEMPLATE - CHECKBOX SELECTION ENDS */
    $scope.importLineItemsTabDataset = [{
            "title": "REQUISITION",
            "contentUrl": "p2p/req/views/importLineItemsReqTab.html",
            "active": true,
            "id": 1
        },
        {
            "title": "TEMPLATES",
            "contentUrl": "p2p/req/views/importLineItemsTemplTab.html",
            "id": 2
        }
    ];
    // popup -- taxes -- select item -- item list
    $scope.taxesPopupUrl = "p2p/shared/views/taxesPopup.html";
    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function (e) {
        $scope.showTaxesPopup = true;
    };
    $scope.taxesPopUpOnHideCallback = function () {
        $scope.showTaxesPopup = false;
    }

    // popup -- Add Taxes -- grid Data -- add a row in the array
    $scope.taxList = {
        'taxCode': '',
        'taxDetail': '',
        'taxRate': '',
        'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [{
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 1',
            'taxRate': '10',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 2',
            'taxRate': '68',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 3',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 4',
            'taxRate': '79',
            'showEdithCurrentPanel': false
        }
    ];

    // popup -- Add Taxes -- grid Data -- add new row
    $scope.updatedCurrentTax = [{
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 1',
            'taxRate': '10',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 2',
            'taxRate': '68',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 3',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        },
        {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 4',
            'taxRate': '79',
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
        $scope.updatedCurrentTax.splice($scope.taxesDetailLists.length - 1, 0, {
            'taxCode': taxesDetailLists[taxesDetailLists.length - 1].taxCode,
            'taxDetail': taxesDetailLists[taxesDetailLists.length - 1].taxDetail,
            'taxRate': taxesDetailLists[taxesDetailLists.length - 1].taxRate,
            'showEdithCurrentPanel': true
        })
        updatePersentage();
    }

    //$scope.feildFocus = true;

    $scope.textRules = [{
        "rule": "!(/[a-z0-9._%+-/]$/.test(this))",
        "error": " "

    }];

    var d = new Date();
    var e = d.getTime();

    $scope.currentDate = e;
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
    $scope.selectedOption1 = {
        'size': '5'
    };
    $scope.deliveryPopupUrl = "p2p/req/views/deliveryPopup.html";
    $scope.showDeliveryPopup = false;
    $scope.showDeliveryPopupCallback = function (e) {
        $scope.showDeliveryPopup = true;
    };
    $scope.deliveryPopUpOnHideCallback = function () {
        $scope.showDeliveryPopup = false;
    }


    // popup -- Add Delivery -- grid Data -- add a row in the array

    $scope.deliveryList = {
        'serialNo': '',
        'deliveryQuantity': '',
        'deliveryDate': '',
        'uomOptions': [{
                "name": "EA-Each",
                "set": 1
            },
            {
                "name": "MPM-Milligram Per Millilitre",
                "set": 1
            },
            {
                "name": "MPCM-Milligram Per Cubic Meter",
                "set": 20
            },
            {
                "name": "CM-Cubic Millilitre",
                "set": 4
            },
            {
                "name": "DZ-Dozen",
                "set": 12
            }
        ],
        "selectedUOM": {
            "name": "EA-Each",
            "set": 1
        },
        'sequenceNo': '',
        'showEdithCurrentPanel': false
    };

    $scope.deliveryDetailLists = [];
    //$scope.uomOptions = [
    //    { "name": "EA-Each", "set": 1 },
    //    { "name": "MPM-Milligram Per Millilitre", "set": 1 },
    //    { "name": "MPCM-Milligram Per Cubic Meter", "set": 20 },
    //    { "name": "CM-Cubic Millilitre", "set": 4 },
    //    { "name": "DZ-Dozen", "set": 12 }
    //];



    // popup -- Add Delivery -- grid Data -- add new row
    $scope.updatedCurrentDelivery = [];

    $scope.addCurrentDelivery = function () {
        $scope.feildFocus1 = false;
        $scope.feildFocus2 = false;
        $scope.feildFocus3 = false;
        $scope.feildFocus4 = false;



        if ($scope.deliveryList.serialNo != '' && $scope.deliveryList.deliveryQuantity != '' && $scope.deliveryList.deliveryQuantity != '' && $scope.deliveryList.deliveryDate != '' && $scope.deliveryList.sequenceNo != '') {
            $scope.deliveryDetailLists.unshift(angular.copy($scope.deliveryList));
            $scope.deliveryList.serialNo = '';
            $scope.deliveryList.deliveryQuantity = '';
            $scope.deliveryList.deliveryDate = '';
            //$scope.deliveryList.uomOptions = [
            //{ "name": "EA-Each", "set": 1 },
            //{ "name": "MPM-Milligram Per Millilitre", "set": 1 },
            //{ "name": "MPCM-Milligram Per Cubic Meter", "set": 20 },
            //{ "name": "CM-Cubic Millilitre", "set": 4 },
            //{ "name": "DZ-Dozen", "set": 12 }
            //];
            //console.log($scope.deliveryList);

            $scope.deliveryList.sequenceNo = '';

            $scope.deliveryList.showEdithCurrentPanel = false;
        }



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
    $scope.taxfocus = false;

    // popup -- Add Taxes -- grid Data -- delete current row
    $scope.delCurrent = function (current) {
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item ''" + $scope.taxesDetailLists[current].taxDetail + "''</p>";
        var confi = {
            type: "warning",
            message: msgDetails,
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

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                // Materialize.toast('Tax deleted successfully', 2000);
            }
            updatePersentage();
        });


    };

    $scope.deleteCurrent = function (current) {
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item with SerialNo''" + $scope.deliveryDetailLists[current].serialNo + "''</p>";
        var confi = {
            type: "warning",
            message: msgDetails,
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

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.deliveryDetailLists.splice(current, 1);
                // Materialize.toast('Delivery deleted successfully', 2000);
            }

        });


    };
    $scope.tempDeliveryList = {};
    // popup -- Add Taxes -- grid Data -- edit current row
    $scope.editCurrentDelivery = function (element) {
        $scope.deliveryfocus = true
        element.showEdithCurrentPanel = true;
        $scope.tempDeliveryList = angular.copy(element);


    };
    $scope.editCurrent = function (current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        var currentTaxItem = {
            'taxCode': getcurrentTaxValue.taxCode,
            'taxDetail': getcurrentTaxValue.taxDetail,
            'taxRate': parseInt(getcurrentTaxValue.taxRate),
            'showEdithCurrentPanel': true
        };
        $scope.updatedCurrentTax.splice(current, 0, currentTaxItem);
        updatePersentage();
    };


    // popup -- Add Taxes -- grid Data -- update current row with edited value
    $scope.updatedEdited = function (current) {
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        if ($scope.updatedCurrentTax[current].taxCode != '') {
            getcurrentTaxValue.taxCode = $scope.updatedCurrentTax[current].taxCode;
            getcurrentTaxValue.taxDetail = $scope.updatedCurrentTax[current].taxDetail;
            getcurrentTaxValue.taxRate = $scope.updatedCurrentTax[current].taxRate;
            $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
            $scope.updatedCurrentTax[current] = {
                'taxCode': '',
                'taxDetail': '',
                'taxRate': '',
                'showEdithCurrentPanel': true
            };
        }
        updatePersentage();
        // Materialize.toast('Tax edited Successfully', 2000);
    };

    $scope.updatedEditedDelivery = function (element, deliveryDetailList) {


        if (element.serialNo != '') {
            deliveryDetailList.serialNo = element.serialNo;
            deliveryDetailList.deliveryQuantity = element.deliveryQuantity;
            deliveryDetailList.deliveryDate = element.deliveryDate;
            deliveryDetailList.uomOptions = element.uomOptions;
            deliveryDetailList.selectedUOM = element.selectedUOM;
            deliveryDetailList.sequenceNo = element.sequenceNo;
            deliveryDetailList.showEdithCurrentPanel = false;
        }

        Materialize.toast('Delivery edited Successfully', 2000);
    };
    // popup -- Add Taxes -- grid Data -- cancel editing activity
    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax[current] = {
            'taxCode': '',
            'taxDetail': '',
            'taxRate': '',
            'showEdithCurrentPanel': true
        };
    }

    $scope.cancelUpdatedEditedDelivery = function (element, deliveryDetailList) {

        deliveryDetailList.showEdithCurrentPanel = false;
        element = {};

    }
    // popup -- Add Taxes -- grid Data -- apply function
    $scope.applyFn = function () {
        // Materialize.toast('Tax Added Successfully', 2000);
    }

    $scope.applyFnDelivery = function () {
        //Materialize.toast('Delivery Added Successfully', 2000);
        $scope.showDeliveryPopup = false;


    }

    $scope.CloseFnDelivery = function () {
        $scope.showDeliveryPopup = false;
    }

    //dispatch mode popup starts 
    $scope.emailRules = [{
            "rule": "!(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this))",
            "error": "Enter valid email id"
        }

    ];
    $scope.heading = "DISPATCH MODE";
    $scope.emailBody = "Dear Marvin,<br />Order details.<br/>43753746652465- <b>Lion bridge Technology</b><br/>5 Oct 2015 |<i> Approval Pending</i><br/>24.242 USD<br/>"
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
    $scope.resendOptionList = [{
        title: "Call & Submit",
        id: "1",
        showInfo: true,
        infoMsg: "You will have to submit the order details offline & order will be marked as Acknowledged."
    }, {
        title: "Direct Email",
        id: "2"
    }, {
        title: "EDI/cXML",
        id: "3"
    }, {
        title: "Portal",
        id: "4"
    }, {
        title: "Fax",
        id: "5"
    }];
    $scope.selectedOption = {
        id: "1"
    };
    var resendOptionId = "";

    $scope.isFaxActive = false;
    $scope.isEmailActive = false;

    $scope.resendOptionChange = function (item) {
        resendOptionId = item.id;
        if (item.title == "Fax") {
            $scope.isFaxActive = true;
        } else {
            $scope.isFaxActive = false;
        }
        if (item.title == "Direct Email") {
            item.showEmail = true;
            $scope.isEmailActive = true;
        } else {
            item.showEmail = false;
            $scope.isEmailActive = false;
        }
        if (item.title != "Direct Email") {
            $scope.isEmailActive = false;
        }
    }
    $scope.resendOptionSend = function () {
        switch (resendOptionId) {
            case '1':
                break;
            case '2':
                //$scope.resendOptionShow = false;
                //$scope.emailerPopup = true;
                //$scope.openPopupEmailer = true;

                console.log('2');
                break;


            case '3':
                console.log('3');
                break;
            case '4':
                console.log('4');
                break;
        }
    }
    $scope.resendOptionCancel = function () {
        $scope.resendOptionShow = false;

    }
    $scope.resendOptionShow = false;
    $scope.resendOrderToSuppCall = function () {
        $scope.resendOptionShow = true;
    }
    $scope.resendOptionPopupOnHideCallback = function (e) {
        $scope.resendOptionShow = false;
    }
    $scope.emailToOpts = [{
            "UserName": "John.Doe@gep.com"
        },
        {
            "UserName": "renju.mathew@gep.com"
        },
        {
            "UserName": "ayyappakumar.thevar@gep.com"
        },
        {
            "UserName": "shailesh.sawant@gep.com"
        },
        {
            "UserName": "sachin.kurkute@gep.com"
        },
        {
            "UserName": "kabir.roy@gep.com"
        },
        {
            "UserName": "joel.almeida@gep.com"
        },
        {
            "UserName": "abhishek.kadam@gep.com"
        },
        {
            "UserName": "naushad.shaikh@gep.com"
        },
        {
            "UserName": "karthic.muthuraman@gep.com"
        },
        {
            "UserName": "kamlesh.bhalde@gep.com"
        },
        {
            "UserName": "poonam.lad@gep.com"
        },
        {
            "UserName": "rahul.kardekar@gep.com"
        },
        {
            "UserName": "sheetal.bellare@gep.com"
        },
        {
            "UserName": "kailas.mahajan@gep.com"
        },
        {
            "UserName": "deepak.khanna@gep.com"
        },
        {
            "UserName": "rahul.yadav@gep.com"
        },
        {
            "UserName": "gaurav.jathar@gep.com"
        },
        {
            "UserName": "godwin.anand@gep.com"
        },
        {
            "UserName": "manish.vishwakarma@gep.com"
        },
        {
            "UserName": "mayur.dalal@gep.com"
        },
        {
            "UserName": "mayur.gadekar@gep.com"
        },
        {
            "UserName": "muthu.vijaiyan@gep.com"
        },
        {
            "UserName": "nandini.barve@gep.com"
        },
        {
            "UserName": "prajakta.vadgaonkar@gep.com"
        },
        {
            "UserName": "rahul.nirbhawane@gep.com"
        },
        {
            "UserName": "reshma.kautkar@gep.com"
        }
    ];
    $scope.emailCcOpts = [{
            "UserName": "nandini.barve@gep.com"
        },
        {
            "UserName": "renju.mathew@gep.com"
        },
        {
            "UserName": "ayyappakumar.thevar@gep.com"
        },
        {
            "UserName": "shailesh.sawant@gep.com"
        },
        {
            "UserName": "sachin.kurkute@gep.com"
        },
        {
            "UserName": "kabir.roy@gep.com"
        },
        {
            "UserName": "joel.almeida@gep.com"
        },
        {
            "UserName": "abhishek.kadam@gep.com"
        },
        {
            "UserName": "naushad.shaikh@gep.com"
        },
        {
            "UserName": "karthic.muthuraman@gep.com"
        },
        {
            "UserName": "kamlesh.bhalde@gep.com"
        },
        {
            "UserName": "poonam.lad@gep.com"
        },
        {
            "UserName": "rahul.kardekar@gep.com"
        },
        {
            "UserName": "sheetal.bellare@gep.com"
        },
        {
            "UserName": "kailas.mahajan@gep.com"
        },
        {
            "UserName": "deepak.khanna@gep.com"
        },
        {
            "UserName": "rahul.yadav@gep.com"
        },
        {
            "UserName": "gaurav.jathar@gep.com"
        },
        {
            "UserName": "godwin.anand@gep.com"
        },
        {
            "UserName": "manish.vishwakarma@gep.com"
        },
        {
            "UserName": "mayur.dalal@gep.com"
        },
        {
            "UserName": "mayur.gadekar@gep.com"
        },
        {
            "UserName": "muthu.vijaiyan@gep.com"
        },
        {
            "UserName": "nandini.barve@gep.com"
        },
        {
            "UserName": "prajakta.vadgaonkar@gep.com"
        },
        {
            "UserName": "rahul.nirbhawane@gep.com"
        },
        {
            "UserName": "reshma.kautkar@gep.com"
        }
    ];
    $scope.emailToPreSelect = [{
        "UserName": "John.Doe@gep.com"
    }];
    $scope.emailCcPreSelect = [{
        "UserName": "nandini.barve@gep.com"
    }];
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
        if ($scope.emailToPreSelect == '') {
            return;
        } else {
            $scope.emailerPopup = false;
            $scope.openPopupEmailer = false;
        }
    };
    //dispatch mode popup ends
    $scope.selectedtemplate = function (current) {
        $scope.$emit('showTemplate', {
            showTemp: current
        });
    }

    $scope.ngModel = $scope.ngModel.data;

    $scope.itemDetailReqMaterialTabDataset = [{
            "title": "Lines",
            "contentUrl": "p2p/req/views/itemDetail-mat-linesTab.html",
            "active": true
        },
        {
            "title": "Charges And Allowances",
            "contentUrl": "p2p/req/views/chargesAndAllowances.html",
        },
        {
            "title": "Accounting",
            "contentUrl": "p2p/req/views/itemDetail-mat-accTab.html"
        },
        {
            "title": "Notes and Attachments",
            "contentUrl": "p2p/req/views/itemDetail-notes-attachments.html"
        }
    ];

    /*
        $scope.itemDetailReqServiceTabDataset = [
            { "title": "Lines", "contentUrl": "p2p/req/views/itemDetail-serv-linesTab.html" , "active": true},
            { "title": "Accounting", "contentUrl": "p2p/req/views/itemDetail-serv-accTab.html" }
        ];
    
        $scope.importLineItemsTabDataset = [
            { "title": "Requisition", "contentUrl": "p2p/req/views/importLineItemsReqTab.html" , "active": true},
            { "title": "Templates", "contentUrl": "p2p/req/views/importLineItemsTemplTab.html" }
        ];
    
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
    $scope.copyPopupUrl = "p2p/req/views/copyLineDetailsPopup.html";
    $scope.approverPopupUrl = "shared/popup/views/popupApprover.html";
    $scope.shipToPopupUrl = "p2p/req/views/shipToPopup.html";





    $scope.showCategoryPopup = false;
    $scope.showCategoryPopupCallback = function (e) {
        $scope.showCategoryPopup = true;
    };
    $scope.categoryPopUpOnHideCallback = function () {
        $scope.showCategoryPopup = false;
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

    $scope.manufatureDetails = "shared/popup/views/popupManufacturerDetails.html";
    $scope.manufatureDetailsPopup = false;
    $scope.manufatureDetailsCallback = function (e) {
        $scope.manufatureDetailsPopup = true;
    };
    $scope.manufatureDetailsPopupHideCallback = function (e) {
        $scope.manufatureDetailsPopup = false;
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
        // UI Grid -- popup callback -- contract number papup
        if (def.col && def.col.field == 'contractNum') {
            $scope.contractNumberPopup = true;
        }
        // UI Grid -- popup callback -- taxes papup
        if (def.col && def.col.field == 'taxes') {
            $scope.showTaxesPopup = true;
        }

        if (def.col && def.col.field == 'delsch') {
            $scope.showDeliveryPopup = true;
        }

        if (def.col && def.col.field == 'dispatch') {
            $scope.resendOptionShow = true;
        }

        // UI Grid -- popup callback -- manufacturer details papup
        if (def.col && def.col.field == 'manufacturerDetails') {

            $scope.manufatureDetailsPopup = true;
        }

        // UI Grid -- popup callback -- S&P
        if (def.col && def.col.field == 'spLink' && def.row.entity.spLink == 'ADD S&P') {
            $scope.showSPPopup = true;
        } else if (def.col && def.col.field == 'spLink') {
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

    }
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

    $scope.defaultSelectedSupplierLocation = {
        locationName: "Mumbai"
    };
    $scope.supplierLocationOptions = [{
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

    $scope.defaultSelectedContractNumber = {
        conNumber: "CON.256236"
    };
    $scope.contractNumberOptions = [{
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
    $scope.itemConfig = [{
            "field": "lineNumber",
            "width": 150,
            "displayName": "Sequence",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            // "attributes": {
            //     "type": "link"
            // }
        },
        {
            "field": "lineType.key",
            "width": 150,
            "displayName": "Plant",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "itemNumber",
            "width": 150,
            "displayName": "Supplier Name",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "description",
            "width": 200,
            "displayName": "Part Cost",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "supplierName.name",
            "width": 180,
            "displayName": "Tooling Cost",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            },
            "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate'>{{row.entity.supplierName.name}}</span><a class='ui-grid-cell-container-icons' href='javascript:void(0)' ng-click='grid.appScope.$parent.$parent.$parent.showSupplierIcard(row.entity)'><i class='icon iconSmall blue-text' smart-tooltip message='Card' position='bottom' delay='50'><svg><use xlink:href='#icon_ContactCard'></use></svg></i></a></div>"
        },
        {
            "field": "supplierLocation",
            "width": 150,
            "displayName": "Development Cost",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            /*"attributes": {
                "type": "supLocationCallback",
                "defaultTitle": "Select Location"
            }*/
        },
        {
            "field": "blanketLineRef",
            "width": 180,
            "displayName": "Total Cost",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "supplierItemNumber",
            "width": 190,
            "displayName": "Default Buyer",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "itemSource",
            "width": 150,
            "displayName": "Status",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            }
        }


        // {
        //     "field": "category.name",
        //     "width": 150,
        //     "displayName": "Category",
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "popup",
        //     "attributes": {
        //         "type": "categoryPopup",
        //         "defaultTitle": "Select"
        //     }
        // },
        // {
        //     "field": "qtyEfforts",
        //     "width": 150,
        //     "displayName": "Quantity/Efforts",
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable",
        //     "attributes": {
        //         "type": "number"
        //     }
        // },
        // {
        //     "field": "uom.name",
        //     "name": "uom.name",
        //     "width": 150,
        //     "displayName": "UOM",
        //     "isVisible": true,
        //     "isRegFocusCol": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "dropdown",
        //     "attributes": {
        //         "model": "type",
        //         "dataKey": "name",
        //         "options": [
        //           {
        //               "code": "EA",
        //               "name": "Each"
        //           },
        //           {
        //               "code": "ALL",
        //               "name": "All"
        //           },
        //           {
        //               "code": "Testing",
        //               "name": "TE"
        //           }
        //         ]
        //     }
        // },
        // {
        //     "field": "contractNum",
        //     "width": 150,
        //     "displayName": "Contract Number",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "popup",
        //     "attributes": {
        //         "type": "contractNumberCallback",
        //         "defaultTitle": "Select Number"
        //     }
        // },
        // {

        //     "field": "startDate",
        //     "width": 150,
        //     "displayName": "Start Date",
        //     "isMandatory": true,
        //     "isVisible": true,
        //     "attributes": {
        //         "type": "date",
        //         "format": "dd/MM/yyyy"
        //     },
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable",
        // },
        // {
        //     "field": "endDate",
        //     "width": 150,
        //     "displayName": "End Date",
        //     "isMandatory": true,
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable",
        //     "attributes": {
        //         "type": "date",
        //         "format": "dd/MM/yyyy"
        //     }
        // },
        // {
        //     "field": "unitPrice",
        //     "width": 150,
        //     "filterObject": { "enableFiltering": true },
        //     "displayName": "Unit Price (USD)",
        //     "type": "editable",
        //     "attributes": {
        //         "type": "number"
        //     }
        // },
        // {
        //     "field": "total",
        //     "width": 150,
        //     "displayName": "Total (USD)",
        //     "isVisible": true,
        //     "attributes": {
        //         "rule": "row.entity.unitPrice * row.entity.qtyEfforts",
        //         "type": "number"
        //     },
        //     "filterObject": { "enableFiltering": true },
        //     "type": "calculated"
        // },
        // {
        //     "field": "taxes",
        //     "width": 150,
        //     "displayName": "Taxes (USD)",
        //     "isRegFocusCol": true,
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "attributes": {
        //         "type": "showTaxesPopupCallback",
        //         "defaultTitle": "EXEMPT"
        //     },
        //     "type": "popup",
        // },
        //  // after 14
        // {
        //     "name": "otherCharges",
        //     "width": 175,
        //     "displayName": "Other Charges (USD)",
        //     "isVisible": true,
        //     "attributes": {
        //         "rule": "row.entity.unitPrice / 20",
        //         "type": "number"
        //     },
        //     "filterObject": { "enableFiltering": true },
        //     "type": "calculated"
        // },
        // {
        //     "field": "shippingFreight",
        //     "width": 210,
        //     "displayName": "Shipping & Freight (USD)",
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable",
        //     "attributes": {
        //         "type": "number"
        //     }
        // },
        // {
        //     "field": "requestedDate",
        //     "width": 160,
        //     "displayName": "Requested Date",
        //     "isVisible": false,
        //     "attributes": {
        //         "type": "date",
        //         "format": "dd/MM/yyyy"
        //     },
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "needByDate",
        //     "width": 160,
        //     "displayName": "Need by Date",
        //     "isVisible": true,
        //     "attributes": {
        //         "type": "date",
        //         "format": "dd/MM/yyyy"
        //     },
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "shippingMethod",
        //     "width": 160,
        //     "displayName": "Shipping Method",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "orderLocation",
        //     "width": 150,
        //     "displayName": "Order Location",
        //     "isVisible": true,
        //     "isReadOnly": true,
        //     "autoIncrement": false,
        //     "filterObject": { "enableFiltering": true },
        //     "cellTemplate": "<div class='ui-grid-cell-container-with-icons'><span class='ui-grid-cell-container-name truncate'>{{row.entity.orderLocation}}</span><a class='ui-grid-cell-container-icons' href='javascript:void(0)' ng-click='grid.appScope.$parent.$parent.$parent.showTaxIdfNumberPopupCallback(row.entity.regDetail)'><i class='icon iconSmall blue-text' smart-tooltip message='Tax Identification Number' position='bottom' delay='50'><svg><use xlink:href='#icon_tinCard'></use></svg></i></a></div>"
        // },
        // {
        //     "field": "shipTo.name",
        //     "width": 210,
        //     "displayName": "Ship to/Work Location",
        //     "isVisible": true,
        //     "isRegFocusCol": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "dropdown",
        //     "attributes": {
        //         "model": "type",
        //         "dataKey": "name",
        //         "options": [
        //           {
        //               "code": "Mum",
        //               "name": "Mumbai"
        //           },
        //           {
        //               "code": "Hyd",
        //               "name": "Hyderabad"
        //           },
        //           {
        //               "code": "USA",
        //               "name": "USA"
        //           }
        //         ]
        //     }
        // },
        // {
        //     "field": "shipTo.address",
        //     "width": 210,
        //     "displayName": "Ship to/Work Address",
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "supplierShipFrom.location",
        //     "width": 200,
        //     "displayName": "Supplier Ship From",
        //     "isVisible": true,
        //     "isReadOnly": false,
        //     "isRegFocusCol": true,
        //     "filterObject": {
        //         "enableFiltering": true
        //     },
        //     "type": "dropdown",
        //     "attributes": {
        //         "model": "supplierShipFrom",
        //         "dataKey": "location",
        //         "options": [{
        //             "id": 1,
        //             "location": "Mumbai"
        //         }, {
        //             "id": 2,
        //             "location": "Delhi"
        //         }, {
        //             "id": 3,
        //             "location": "Chennai"
        //         }]
        //     }
        // },
        // {
        //     "field": "supplierShipFromAddress",
        //     "width": 210,
        //     "displayName": "Supplier Ship From Address",
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "deliverTo",
        //     "width": 160,
        //     "displayName": "Deliver to",
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "procurementOption",
        //     "width": 210,
        //     "displayName": "Procurement Option",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "inventoryType",
        //     "width": 150,
        //     "displayName": "Inventory Type",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "matching",
        //     "width": 150,
        //     "displayName": "Matching",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "supplierCode",
        //     "width": 150,
        //     "displayName": "Supplier Code",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "supplierContact",
        //     "width": 150,
        //     "displayName": "Supplier Contact",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "manufacturer",
        //     "width": 180,
        //     "displayName": "Manufacturer Name",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "manufacturerDetails",
        //     "width": 230,
        //     "displayName": "Manufacturer Details",
        //     "isRegFocusCol": true,
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "attributes": {
        //         "type": "manufatureDetailsCallback",
        //         "defaultTitle": "EXEMPT"
        //     },
        //     "type": "popup",
        // },
        // {
        //     "field": "manufacturerPartNumber",
        //     "width": 230,
        //     "displayName": "Manufacturer Datails",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "contractNumber",
        //     "width": 150,
        //     "displayName": "Contract Number",
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "contractName",
        //     "width": 150,
        //     "displayName": "Contract Name",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "contractExpiryDate",
        //     "width": 200,
        //     "displayName": "Contract Expiry Date",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "contractValue",
        //     "width": 150,
        //     "displayName": "Contract Value",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable",
        //     "attributes": {
        //         "type": "number"
        //     }
        // },
        // {
        //     "field": "paymentTerms",
        //     "width": 160,
        //     "displayName": "Payment Terms",
        //     "isVisible": false,
        //     "filterObject": { "enableFiltering": true },
        //     "type": "editable"
        // },
        // {
        //     "field": "addiInfo",
        //     "width": 200,
        //     "displayName": "Additional Information",
        //     "isVisible": true,
        //     "filterObject": {
        //         "enableFiltering": false
        //     },
        //     "enableCellEdit": false,
        //     "cellTemplate": "<a ui-sref='p2p.req.additionalInfo({id: {{row.entity.lineNumber}} })'> <span ng-if='row.entity.lineNumber == 1'>Add</span>  <span ng-if='row.entity.lineNumber != 1'>Edit </span> ({{row.entity.additionaInformation.length}})</a>"
        // },
        // {
        //     "field": "delsch",
        //     "width": 150,
        //     "displayName": "Delivery Schedule",
        //     "isRegFocusCol": true,
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "attributes": {
        //         "type": "showDeliveryPopupCallback",
        //         "defaultTitle": "Delivery Schedule"
        //     },
        //     "type": "popup",
        // },
        // {
        //     "field": "dispatch",
        //     "width": 150,
        //     "displayName": "Dispatch Mode",
        //     "isRegFocusCol": true,
        //     "isVisible": true,
        //     "filterObject": { "enableFiltering": true },
        //     "attributes": {
        //         "type": "resendOrderToSuppCall",
        //         "defaultTitle": "Dispatch Mode"
        //     },
        //     "type": "popup",
        // },
        // {
        //     "field": "matchType.number",
        //     "width": 200,
        //     "displayName": "Match Type",
        //     "isVisible": true,
        //     "isReadOnly": false,
        //     "isRegFocusCol": true,
        //     "filterObject": {
        //         "enableFiltering": true
        //     },
        //     "type": "dropdown",
        //     "attributes": {
        //         "model": "matchType",
        //         "dataKey": "number",
        //         "options": [{
        //             "id": 1,
        //             "number": "2 Way"
        //         }, {
        //             "id": 2,
        //             "number": "3 Way"
        //         }]
        //     }
        // },
        // {
        //     "field": "receiptsConfirmaion.name",
        //     "width": 200,
        //     "displayName": "Allow Receipts/Confirmation",
        //     "isVisible": true,
        //     "isReadOnly": false,
        //     "isRegFocusCol": true,
        //     "filterObject": {
        //         "enableFiltering": true
        //     },
        //     "type": "dropdown",
        //     "attributes": {
        //         "model": "supplierShipFrom",
        //         "dataKey": "name",
        //         "options": [{
        //             "id": 1,
        //             "name": "Yes"
        //         }, {
        //             "id": 2,
        //             "name": "No"
        //         }]
        //     }
        // }
    ];
    console.log("itemConfig", $scope.itemConfig)
    $scope.itemModel = [{
            "receiptsConfirmaion": {
                "id": 1,
                "name": "Yes"
            },
            "spLink": "3 S&PS",
            "isTaxExempt": false,
            "status": 1,
            "splitType": 0,
            "id": 21559,
            "lineNumber": 1,
            "blanketLineRef": "Material for Plant",
            "supCards": "card",
            "lineType": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "itemNumber": "713510715",
            "description": "Apple MacBook MF865HN/A 12-inch Retina Display Laptop (Intel Core M/8GB/512GB/OS X El Capitan/ Intel HD Graphics 515), Silver",
            "supplierName": {
                "id": 6349,
                "name": "Quanta",
                "check": false,
                "status": "Approved"
            },
            "supplierLocation": "Mumbai",
            "supplierShipFromAddress": "Mumbai",
            "supplierItemNumber": "MF855HN/A",
            "itemSource": "Catalog",
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
            "orderLocation": "Mumbai",
            "regDetail": [{
                "regType": "TIN Number",
                "regNumber": 789
            }],
            "unitPrice": 1299,
            "total": 10000,
            "taxes": "Exempt",
            "delsch": "Delivery Schedule",
            "dispatch": "Dispatch Mode",
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
            "supplierShipFrom": {
                "id": 1,
                "location": "Mumbai"
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
            "manufacturerDetails": "Manufacturer Details",
            "contractNumber": "CON-2015.423343",
            "contractName": "conctract for Laptop",
            "contractExpiryDate": "2015-01-16T18:30:00.000Z",
            "contractValue": 0,
            "paymentTerms": "net 30",
            "$$hashKey": "uiGrid-0012",
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
            }],
            "matchType": {
                id: 1,
                number: "2 Way"
            }
        },
        {
            "receiptsConfirmaion": {
                "id": 1,
                "name": "Yes"
            },
            "spLink": "2 S&PS",
            "isTaxExempt": false,
            "status": 1,
            "splitType": 0,
            "id": 21559,
            "lineNumber": 2,
            "blanketLineRef": "Material for Plant",
            "supCards": "card",
            "lineType": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "itemNumber": "498593952",
            "description": "HP Spectre 13-V039TU 13.3-inch Laptop (i5-6200U/8GB/256GB/Windows 10 Pro/Integrated Graphics), Dark Ash Silver",
            "supplierName": {
                "id": 6349,
                "name": "kellogg's",
                "check": false,
                "status": "Approved"
            },
            "supplierLocation": "Hyderabad",
            "supplierShipFromAddress": "Mumbai",
            "supplierItemNumber": "B01K1TTZKU",
            "itemSource": "Non-Catalog",
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
            "orderLocation": "Bangalore",
            "regDetail": [{
                "regType": "TIN Number",
                "regNumber": 188
            }],
            "unitPrice": 1573.59,
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
            "supplierShipFrom": {
                "id": 1,
                "location": "Mumbai"
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
            "manufacturerDetails": "Manufacturer Details",
            "contractNumber": "CON-2015.423344",
            "contractName": "conctract for Laptop",
            "contractExpiryDate": "2015-01-16T18:30:00.000Z",
            "contractValue": 0,
            "paymentTerms": "net 30",
            "$$hashKey": "uiGrid-0012",
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
            }],
            "matchType": {
                id: 1,
                number: "2 Way"
            }
        },
        {
            "receiptsConfirmaion": {
                "id": 1,
                "name": "Yes"
            },
            "spLink": "5 S&PS",
            "isTaxExempt": false,
            "status": 1,
            "splitType": 0,
            "id": 21559,
            "lineNumber": 3,
            "blanketLineRef": "Material for Plant",
            "supCards": "card",
            "lineType": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "itemNumber": "281033990",
            "description": "Acer One 10 S1002-15XR 10.1-inch Laptop (Atom Z3735F/2GB/32GB/Windows 10/Intel HD Graphics), Dark Silver",
            "supplierName": {
                "id": 6349,
                "name": "Fastenal V-Tech",
                "check": false,
                "status": "Registered"
            },
            "supplierLocation": "Bangalore",
            "supplierShipFromAddress": "Mumbai",
            "supplierItemNumber": "B01ABTQD3W",
            "itemSource": "Quote",
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
            "orderLocation": "Hyderabad",
            "regDetail": [{
                "regType": "TIN Number",
                "regNumber": 744
            }],
            "unitPrice": 284.86,
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
            "supplierShipFrom": {
                "id": 1,
                "location": "Mumbai"
            },
            "deliverTo": null,
            "procurementOption": "Procurement Option",
            "procurementOption": "Procurement Option",
            "inventoryType": false,
            "matching": false,
            "supplierCode": "09798",
            "supplierContact": "john@gep.com",
            "manufacturer": null,
            "manufacturerPartNumber": "S1002-15XR",
            "manufacturerDetails": "Manufacturer Details",
            "contractNumber": "CON-2015.423345",
            "contractName": "conctract for Laptop",
            "contractExpiryDate": "2015-01-16T18:30:00.000Z",
            "contractValue": 0,
            "paymentTerms": "net 30",
            "$$hashKey": "uiGrid-0012",
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
            }],
            "matchType": {
                id: 1,
                number: "2 Way"
            }
        },
        {
            "receiptsConfirmaion": {
                "id": 1,
                "name": "Yes"
            },
            "spLink": "6 S&PS",
            "isTaxExempt": false,
            "status": 1,
            "splitType": 0,
            "id": 21559,
            "lineNumber": 4,
            "blanketLineRef": "Material for Plant",
            "supCards": "card",
            "lineType": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "itemNumber": "597289288",
            "description": "Apple MacBook Pro MJLT2HN/A 15-inch Laptop (Core i7/16GB/512GB/AMD Radeon R9 M370X with 2GB)",
            "supplierName": {
                "id": 6349,
                "name": "CDW",
                "check": false,
                "status": "Approved"
            },
            "supplierLocation": "Chennai",
            "supplierShipFromAddress": "Mumbai",
            "supplierItemNumber": "B00YN5FXMI",
            "itemSource": "Catalog",
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
            "orderLocation": "Delhi",
            "regDetail": [{
                "regType": "TIN Number",
                "regNumber": 980
            }],
            "unitPrice": 2997.25,
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
            "supplierShipFrom": {
                "id": 1,
                "location": "Mumbai"
            },
            "deliverTo": null,
            "procurementOption": "Procurement Option",
            "procurementOption": "Procurement Option",
            "inventoryType": false,
            "matching": false,
            "supplierCode": "09798",
            "supplierContact": "john@gep.com",
            "manufacturer": null,
            "manufacturerPartNumber": "MJLT2HN/A",
            "manufacturerDetails": "Manufacturer Details",
            "contractNumber": "CON-2015.423346",
            "contractName": "conctract for Laptop",
            "contractExpiryDate": "2015-01-16T18:30:00.000Z",
            "contractValue": 0,
            "paymentTerms": "net 30",
            "$$hashKey": "uiGrid-0012",
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
            }],
            "matchType": {
                id: 1,
                number: "2 Way"
            }
        },
        {
            "receiptsConfirmaion": {
                "id": 1,
                "name": "Yes"
            },
            "spLink": "ADD S&P",
            "isTaxExempt": false,
            "status": 1,
            "splitType": 0,
            "id": 21559,
            "lineNumber": 5,
            "blanketLineRef": "Material for Plant",
            "supCards": "card",
            "lineType": {
                "id": 1,
                "name": "P2P_REQ_Material",
                "key": "Material"
            },
            "itemNumber": "373116319",
            "description": "Apple MacBook Air MJVE2HN/A 13-inch Laptop (Core i5/4GB/128GB/OS X Yosemite/Intel HD 6000)",
            "supplierName": {
                "id": 6349,
                "name": "Home Depot",
                "check": false,
                "status": "Approved"
            },
            "supplierLocation": "Delhi",
            "supplierShipFromAddress": "Mumbai",
            "supplierItemNumber": "B00VBHQU78",
            "itemSource": "Non-Catalog",
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
            "orderLocation": "Chennai",
            "regDetail": [{
                "regType": "TIN Number",
                "regNumber": 736
            }],
            "unitPrice": 2997.25,
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
            "supplierShipFrom": {
                "id": 1,
                "location": "Mumbai"
            },
            "deliverTo": null,
            "procurementOption": "Procurement Option",
            "procurementOption": "Procurement Option",
            "inventoryType": false,
            "matching": false,
            "supplierCode": "09798",
            "supplierContact": "john@gep.com",
            "manufacturer": null,
            "manufacturerPartNumber": "MJLT2HN/A",
            "manufacturerDetails": "Manufacturer Details",
            "contractNumber": "CON-2015.423346",
            "contractName": "conctract for Laptop",
            "contractExpiryDate": "2015-01-16T18:30:00.000Z",
            "contractValue": 0,
            "paymentTerms": "net 30",
            "$$hashKey": "uiGrid-0012",
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
            }],
            "matchType": {
                id: 1,
                number: "2 Way"
            }
        }
    ];

    //UI grid -- accounting
    $scope.accountingConfig = [{
            "field": "lineNumber",
            "width": 120,
            "displayName": "Line Number",
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
            "field": "description",
            "width": 200,
            "displayName": "Description",
            "isFixed": "Left",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "splitType",
            "width": 150,
            "displayName": "Split Type",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "taxCodeChargeName",
            "width": 150,
            "displayName": "Tax Code/Charge Name",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "splitNumber",
            "width": 150,
            "displayName": "Split Number",
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
            "field": "quantity",
            "width": 150,
            "displayName": "Quantity",
            "isVisible": true,
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
            "width": 150,
            "displayName": "UOM",
            "isVisible": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "splitTaxes",
            "width": 230,
            "displayName": "Split Taxes & Charges (USD)",
            "isVisible": false,
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
            "width": 230,
            "displayName": "Split Value (USD)",
            "isVisible": true,
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
            "width": 150,
            "displayName": "Split Total (USD)",
            "isVisible": true,
            "attributes": {
                "rule": "row.entity.quantity * row.entity.splitValues",
                "type": "number"
            },
            "filterObject": {
                "enableFiltering": true
            },
            "type": "calculated"
        },
        {
            "field": "requester.name",
            "width": 150,
            "displayName": "Requester",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "corporation.name",
            "width": 150,
            "displayName": "Corporation",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "bu.name",
            "width": 150,
            "displayName": "Cost Center",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "account.name",
            "width": 150,
            "displayName": "Account Number",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "project.name",
            "width": 170,
            "displayName": "Project Number",
            "isVisible": true,
            "autoIncrement": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }
    ];
    $scope.accountingModel = [{
            "isTaxExempt": false,
            "status": 1,
            "splitType": "--",
            "taxCodeChargeName": "--",
            "splitNumber": "",
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
            "splitType": 'Charge',
            "taxCodeChargeName": "Handling",
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
            "splitType": "--",
            "taxCodeChargeName": "--",
            "splitNumber": "",
            "id": 21559,
            "lineNumber": 2,
            "lineDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
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

    $scope.chargesAndAllowancesConfig = [{
            "field": "lineNumber",
            "width": 100,
            "displayName": "Number",
            "isFixed": "Left",
            "isTree": true,
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "description",
            "width": 250,
            "displayName": "Item Description",
            "isFixed": "Left",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "dropdown",
            "attributes": {
                "model": "type",
                "dataKey": "name",
                "options": [{
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
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "cellTemplate": "<div ng-if='row.entity.attachment.isHeader' class='center'>--</div><smart-checkbox ng-if='!row.entity.attachment.isHeader' class='aCenter paddingTop5' ng-model='isUrgent' on-change='onChange(isUrgent)'></smart-checkbox>"
        },

        {
            "field": "isType.name",
            "width": 230,
            "displayName": "Type",
            "isVisible": true,
            "isReadonly": true,
            "isRegFocusCol": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "dropdown",
            "attributes": {
                "model": "type",
                "dataKey": "name",
                "options": [{
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
            "filterObject": {
                "enableFiltering": true
            },
            "cellTemplate": "<div ng-if='row.entity.attachment.isHeader' class='center'>--</div><smart-checkbox ng-if='!row.entity.attachment.isHeader' class='aCenter paddingTop5' ng-model='isUrgent' on-change='onChange(isUrgent)'></smart-checkbox>"
        },

        {
            "field": "AddInfoAttach",
            "width": 330,
            "displayName": "Additional Information",
            "isRegFocusCol": true,
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "attributes": {
                "type": "AddChargesAttachCallback",
                "defaultTitle": ""
            },
            "type": "popup",
        }
    ];
    $scope.chargesAndAllowancesModel = [{
            "lineNumber": 1,
            "itemNumber": 11110666,
            "description": "Laptop Dell",
            //  "Calculation": { "name": "Amount" },
            "Chargedescription": "--",
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "isType": {
                "name": ""
            },
            "attachment": {
                "name": "3 Charges",
                "valueUSD": "--",
                "AmountUSD": "84",
                "isAdd": true,
                "isHeader": true
            },
            "$$hashKey": "uiGrid-0012",
            "AddInfoAttach": ""
        },
        {
            "lineNumber": 1,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "Calculation": {
                "name": "Percentage"
            },
            "isType": {
                "name": "Allowance"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Shipping",
                "type": "Amount",
                "valueUSD": "5",
                "AmountUSD": "34"
            },
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
            "Calculation": {
                "name": "Percentage"
            },
            "classification": {
                "name": "S & P"
            },
            "isType": {
                "name": "Charge"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Handaling",
                "type": "Percentage",
                "valueUSD": "20",
                "AmountUSD": "16"
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
            "Calculation": {
                "name": "Amount"
            },
            "classification": {
                "name": "S & P"
            },
            "isType": {
                "name": "Charge"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Shipping",
                "type": "Amount",
                "valueUSD": "34",
                "AmountUSD": "34"
            },
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
            "classification": {
                "name": "S & P"
            },
            "isType": {
                "name": ""
            },
            "attachment": {
                "name": "2 Charges",
                "type": "",
                "valueUSD": "--",
                "AmountUSD": "84",
                "isAdd": true,
                "isHeader": true
            },
            "$$hashKey": "uiGrid-0012",
            "AddInfoAttach": ""
        },
        {
            "lineNumber": 2,
            "itemNumber": "",
            "description": "",
            "Calculation": {
                "name": "Percentage"
            },
            "classification": {
                "name": "S & P"
            },
            "isType": {
                "name": "Allowance"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Shipping",
                "type": "Amount",
                "valueUSD": "34",
                "AmountUSD": "34"
            },
            "Chargedescription": "Shipping Charges",
            "$$hashKey": "uiGrid-0012",
            "AddInfoAttach": "Add"
        },
        {
            "lineNumber": 2,
            "itemNumber": "",
            "description": "",
            "Calculation": {
                "name": "Percentage"
            },
            "classification": {
                "name": "S & P"
            },
            "isType": {
                "name": "Allowance"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Handaling",
                "type": "Percentage",
                "valueUSD": "20",
                "AmountUSD": "16"
            },
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
            "classification": {
                "name": "S & P"
            },
            "Chargedescription": "--",
            "isType": {
                "name": ""
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "2 Charges",
                "type": "",
                "valueUSD": "--",
                "AmountUSD": "84",
                "isAdd": true,
                "isHeader": true
            },
            "$$hashKey": "uiGrid-0012",
            "AddInfoAttach": ""
        },
        {
            "lineNumber": 3,
            "itemNumber": "",
            "description": "",
            "Calculation": {
                "name": "Amount"
            },
            "classification": {
                "name": "S & P"
            },
            "isType": {
                "name": "Allowance"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Shipping",
                "type": "Amount",
                "valueUSD": "34",
                "AmountUSD": "34"
            },
            "Chargedescription": "Shipping Charges",
            "$$hashKey": "uiGrid-0012",
            "AddInfoAttach": "Add"
        },
        {
            "lineNumber": 3,
            "itemNumber": "",
            "description": "",
            "Calculation": {
                "name": "Amount"
            },
            "classification": {
                "name": "S & P"
            },
            "isType": {
                "name": "Charge"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Hnadling",
                "type": "Percentage",
                "valueUSD": "20",
                "AmountUSD": "16"
            },
            "Chargedescription": "Charges for fragile item",
            "$$hashKey": "uiGrid-0012",
            "AddInfoAttach": "Add"
        }


    ];
    //UI grid -- accounting
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
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "description",
            "width": 150,
            "displayName": "Description",
            "isReadOnly": true,
            "isFixed": "Left",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "classification.name",
            "width": 230,
            "displayName": "Classification",
            "isVisible": true,
            "isRegFocusCol": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "dropdown",
            "attributes": {
                "model": "type",
                "dataKey": "name",
                "options": [{
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "dropdown",
            "attributes": {
                "model": "type",
                "dataKey": "name",
                "options": [{
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "addedBy",
            "width": 150,
            "displayName": "Added By",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }
    ];
    $scope.notesAndAttachmentsModel = [{
            "lineNumber": 1,
            "itemNumber": 11110666,
            "description": "Apple Phone",
            "classification": {
                "name": ""
            },
            "isExternal": {
                "name": ""
            },
            "addedOn": "--",
            "addedBy": "--",
            "attachment": {
                "name": "0 Notes and Attachments",
                "isLineHeader": "true"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 2,
            "itemNumber": 11110276,
            "description": "Laptop Dell",
            "addedOn": "--",
            "addedBy": "--",
            "classification": {
                "name": ""
            },
            "isExternal": {
                "name": ""
            },
            "attachment": {
                "name": "3 Notes and Attachments",
                "isLineHeader": "true"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 2,
            "itemNumber": "",
            "description": "",
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "attachment": {
                "name": "Filename.pdf",
                "type": "File"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 2,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "xyz notes",
                "type": "Notes"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 2,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Google",
                "type": "external Link"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 3,
            "itemNumber": 11110657,
            "description": "HR management System",
            "addedOn": "--",
            "addedBy": "--",
            "classification": {
                "name": "--"
            },
            "isExternal": {
                "name": "--"
            },
            "attachment": {
                "name": "3 Notes and Attachments",
                "isLineHeader": "true"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 3,
            "itemNumber": "",
            "description": "",
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "attachment": {
                "name": "Filename.pdf",
                "type": "File"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 3,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "xyz notes",
                "type": "Notes"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 3,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Google",
                "type": "external Link"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 4,
            "itemNumber": 11110653,
            "description": "IP Phone",
            "classification": {
                "name": ""
            },
            "isExternal": {
                "name": ""
            },
            "addedOn": "--",
            "addedBy": "--",
            "attachment": {
                "name": "3 Notes and Attachments",
                "isLineHeader": "true"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 4,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Filename.pdf",
                "type": "File"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 4,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "xyz notes",
                "type": "Notes"
            },
            "$$hashKey": "uiGrid-0012"
        },
        {
            "lineNumber": 4,
            "itemNumber": "",
            "description": "",
            "classification": {
                "name": "S & P"
            },
            "isExternal": {
                "name": "Yes"
            },
            "addedOn": "12/4/2016",
            "addedBy": "John Doe",
            "attachment": {
                "name": "Google",
                "type": "external Link"
            },
            "$$hashKey": "uiGrid-0012"
        }


    ];


    //express list grid Data
    $scope.expressLists = [{
            itemNumber: 'dell',
            name: '123-342-232',
            modelNo: '123',
            actionIconDelete: true
        },
        {
            itemNumber: 'Lenovo',
            name: '345-342-354',
            modelNo: '456',
            actionIconDelete: true
        },
        {
            itemNumber: 'dell',
            name: '636-436-236',
            modelNo: '789',
            actionIconDelete: true
        },
        {
            itemNumber: 'Lenovo',
            name: '428-472-344',
            modelNo: '912',
            actionIconDelete: true
        },
        {
            itemNumber: 'Sumsung',
            name: '288-2898-889',
            modelNo: '345',
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
        number: [{
            "splitValue": "",
            "splitRule": [{
                    "rule": "!(/[0-9]/.test(this))",
                    "error": "Need atleast one number"
                },
                {
                    "rule": "(/^[0]$/.test(this))",
                    "error": "Number should greater than 0"
                }
            ]
        }],
        percent: [{
            "splitValue": "",
            "splitRule": [{
                    "rule": "!(/[0-9]/.test(this))",
                    "error": "Need atleast one number"
                },
                {
                    "rule": "(/^[0]$/.test(this))",
                    "error": "Number should greater than 0"
                }
            ]
        }]
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
            $scope.splitList.number.push({
                "splitValue": "",
                "splitRule": [{
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            });

            var getContent = angular.element('#numContainerTable').height();
            setTimeout(function () {
                angular.element('#numberContainer').find('.scroll-content').scrollTop(getContent + 55);
            }, 100);


        } else {
            $scope.splitList.percent.push({
                "splitValue": "",
                "splitRule": [{
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            });

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
                } else {
                    numberTotal = numberTotal + $scope.splitList.number[i].splitValue;
                }
            });
            $scope.totalSplitNumber = numberTotal;
        } else {
            var percentTotal = 0;
            angular.forEach($scope.splitList.percent, function (value, i) {
                if ($scope.splitList.percent[i].splitValue == '' || $scope.splitList.percent[i].splitValue == null) {
                    percentTotal = percentTotal + 0;
                } else {
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

    //localization label - normal label, config labels
    $scope.labels = {
        supplierLable: $translate.instant("Supplier"),
        shippingLable: $translate.instant("Shipping"),
        accountingLable: $translate.instant("Accounting"),
        addDetailsLable: $translate.instant("Additional Details")
    };

    //localization label - buttons
    $scope.cancelBtnConfig = {
        title: $translate.instant("CANCEL")
    };
    $scope.closeBtnConfig = {
        title: $translate.instant("CLOSE")
    };
    $scope.resetBtnConfig = {
        title: $translate.instant("RESET")
    };
    $scope.selectItemsBtnConfig = {
        title: $translate.instant("SELECT ITEMS")
    };
    $scope.doneBtnConfig = {
        title: $translate.instant("DONE")
    };
    $scope.backBtnConfig = {
        title: $translate.instant("BACK")
    };
    $scope.ApplyBtnConfig = {
        title: $translate.instant("APPLY")
    };

    $scope.importFromReq = [{
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
            "tempAttr": [{
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
            "tempAttr": [{
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
            "tempAttr": [{
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

    $scope.importFromTemp = [{
            "Name": "Payment Term Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [{
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
            "tempAttr": [{
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
            "tempAttr": [{
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

    $scope.fields = [];
    $scope.accfields = [];

    //line -- manage columns
    $scope.manageColumns = function (tab) {
        $scope.fields = [];
        if (tab === 'accounting') {
            $scope.fields = [{
                    'lable': 'UOM'
                },
                {
                    'lable': 'Split Taxes & Charges (USD)'
                },
                {
                    'lable': 'Requester'
                }
            ];
        } else {
            $scope.fields = [{
                    'lable': 'Requested Date'
                },
                {
                    'lable': 'Shipping Method'
                },
                {
                    'lable': 'Procurement Option'
                },
                {
                    'lable': 'Inventory Type'
                },
                {
                    'lable': 'Item Source'
                },
                {
                    'lable': 'Blanket Line Reference'
                },
                {
                    'lable': 'Match Type'
                },
                {
                    'lable': 'Supplier Code'
                },
                {
                    'lable': 'Supplier Contact'
                },
                {
                    'lable': 'Manufacturer Name'
                },
                {
                    'lable': 'Manufacturer Part Number'
                },
                {
                    'lable': 'Contract Name'
                },
                {
                    'lable': 'Contract Expiry Date'
                },
                {
                    'lable': 'Contract Value'
                },
                {
                    'lable': 'Payment Terms'
                },
                {
                    'lable': 'Allow Receipts/Confirmation'
                }
            ];
        }

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


    }

    //line -- manage columns -- check all
    $scope.selectedAll = {
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
    $scope.reset = function () {
        $scope.selectedAll.selection = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
        $scope.selectedCount = getSelectedCout($scope.fields);

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
            if (obj[i].selected === true) {
                count++;
            }
        }
        return count;
    }
    $scope.selectedCount = getSelectedCout($scope.fields);

    //line -- manage columns -- global fn for at least on checkbox selection in list
    function isAtleastOneSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                return true;
            }
        }
        return false;
    }

    //line -- manage columns -- global fn for all checkboxes selection
    function isAllSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].selected) {
                return false;
            }
        }
        return true;
    }

    //accounting details -- manage columns
    //$scope.accManageColumns = function () {
    //    $scope.accfields = [];
    //    $scope.accfields = [
    //    { 'lable': 'UOM' },
    //    { 'lable': 'Split Taxes & Charges (USD)' },
    //    { 'lable': 'Requester' }
    //    ];
    //}

    // POPUP -- apply to all 
    $scope.applyToAllUrl = "shared/popup/views/popupLinesBulkEdit.html";

    $scope.applyToAllPopUp = false;
    $scope.applyToAllPopUpCallback = function (e) {
        $scope.applyToAllPopUp = true;
    };
    $scope.applyToAllPopUpClose = function (e) {
        $scope.applyToAllPopUp = false;
    };

    // popup -- apply to all -- sidebar links
    $scope.iteams = [{
            title: $scope.labels.supplierLable,
            lable: 'supplier',
            isChecked: false
        },
        {
            title: $scope.labels.shippingLable,
            lable: 'shipping',
            isChecked: false
        },
        {
            title: $scope.labels.accountingLable,
            lable: 'accounting',
            isChecked: false
        },
        {
            title: $scope.labels.addDetailsLable,
            lable: 'additionalDetails',
            isChecked: false
        }
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
            "options": [{
                    "code": "yes",
                    "name": "Yes"
                },
                {
                    "code": "no",
                    "name": "No"
                }
            ],
            "selected": {
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
    $scope.itemList = [{
        'lable': 'Description 1'
    }, {
        'lable': 'Description 2'
    }, {
        'lable': 'Description 3'
    }, {
        'lable': 'Description 4'
    }, {
        'lable': 'Description 5'
    }, {
        'lable': 'Description 6'
    }, {
        'lable': 'Description 7'
    }, {
        'lable': 'Description 8'
    }, {
        'lable': 'Description 9'
    }, {
        'lable': 'Description 10'
    }];

    $scope.spiltsItemList = [{
        'lable': 'Description 1 - Split 1 '
    }, {
        'lable': 'Description 2 - Split 2'
    }, {
        'lable': 'Description 3 - Split 3'
    }, {
        'lable': 'Description 4 - Split 4'
    }, {
        'lable': 'Description 5 - Split 5'
    }, {
        'lable': 'Description 6 - Split 6'
    }, {
        'lable': 'Description 7 - Split 7'
    }, {
        'lable': 'Description 8 - Split 8'
    }, {
        'lable': 'Description 9 - Split 9'
    }, {
        'lable': 'Description 10 - Split 10'
    }];

    //popup -- apply to all-select items -- select All
    $scope.checkAllC = function (aug) {
        angular.forEach($scope.itemList, function (itemList, key) {
            $scope.itemList[key].selected = aug;
        });
    };

    $scope.checkAllSplits = function (aug) {
        angular.forEach($scope.splitsItemList, function (itemList, key) {
            $scope.splitsItemList[key].selected = aug;
        });
    };

    $scope.addLines = 1;
    /*delete selected grid*/
    //$scope.deleteSelected = function () {

    //    //var ErrorConfi = {
    //    //    type: "error",
    //    //    message: "",
    //    //    buttons: [
    //    //    {
    //    //        "title": "YES",
    //    //        "result": "yes"
    //    //    },
    //    //    {
    //    //        "title": "NO",
    //    //        "result": "no"
    //    //    }
    //    //    ]
    //    //},
    //    //    confirmationConfi = {
    //    //    type: "confirm",
    //    //    message: " Are you Sure for Delete selected Line Item ",
    //    //    buttons: [
    //    //    {
    //    //        "title": "YES",
    //    //        "result": "yes"
    //    //    },
    //    //    {
    //    //        "title": "NO",
    //    //        "result": "no"
    //    //    }
    //    //    ]
    //    //},
    //    //alertSuccess = {
    //    //    type: "success",
    //    //    message: " Selected Line Item Deleted Successfully ",
    //    //    buttons: [
    //    //    {
    //    //        "title": "YES",
    //    //        "result": "yes"
    //    //    },
    //    //    {
    //    //        "title": "NO",
    //    //        "result": "no"
    //    //    }
    //    //    ]
    //    //};

    //    //notification.notify(alertSuccess, function (response) {
    //    //    alert("Pressed : " + response.result);
    //    //});

    //    var ages = $scope.gridApi.selection.getSelectedRows();



    //}

    /* FILTER POPOVER in TEMPLATE POPUP STARTS */
    $scope.closePopOver = function () {
        angular.element(document).triggerHandler('click');
    };
    /* FILTER POPOVER in TEMPLATE POPUP ENDS */

    /* Start: Supplier Icard*/
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



    $scope.showInfoIcon = false;

    $scope.supplierIcardlink = function () {
        $scope.hideSupplierIcardPopupCallback();
        $state.go('supplier.profile', {
            pagefor: $scope.companyName.selectedoption.name,
            status: $scope.companyName.selectedoption.status
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

    $scope.showSupplierIcard = function (crrentObj) {
        $scope.companyName = {
            "displaytext": "Company Name",
            "selectedoption": crrentObj.supplierName
        }
        $scope.selectTypeOption = {
            "name": "status",
            "selectiontext": "Invited"
        };

        $scope.supplierIcard.supplierName = $scope.companyName.selectedoption.name;

        if ($scope.supplierIcard.supplierName === 'kellogg\'s') {
            $scope.supplierIcard.logoUrl = "shared/resources/images/kelloggs_logo.png";
        } else {
            $scope.supplierIcard.logoUrl = "";
        }
        $scope.supplierIcard.status = $scope.selectTypeOption.selectiontext;
        $scope.supplierIcard.site = 'www.' + $scope.companyName.selectedoption.name.toLowerCase().replace(/[^a-z0-9]/gmi, "") + '.com';
        $scope.supplierIcard.emailId = 'Allan.Gibson@' + $scope.companyName.selectedoption.name.toLowerCase().replace(/[^a-z0-9]/gmi, "") + '.com';
        $timeout(function () {
            $scope.showSupplierIcardPopup = true;
            $scope.LoaderFlagController = true;
            $timeout(function () {
                $scope.LoaderFlagController = false;
            }, 2000);
        }, 500);
        $timeout(function () {
            $scope.subLoaderFlagController = true;
            $timeout(function () {
                $scope.subLoaderFlagController = false;
            }, 2500);
        }, 500);
    }
    $scope.hideSupplierIcardPopupCallback = function () {
        $scope.showSupplierIcardPopup = false;
    };

    // Start: Tree Popup

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

    $scope.showTreePopup = false;
    var buObj;

    var buData = {
        method: 'GET',
        url: 'shared/popup/models/businessUnit.json'
    };

    $scope.treeOpenCallback = function () {
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
        $scope.showTreePopup = true;
    }

    $scope.onPopupHideCallback = function () {
        $scope.showSupplierIcardPopup = true;
        $scope.showTreePopup = false;

        $scope.treeComponentConfig.data = [];
        $scope.treeComponentConfig.refreshConfig($scope.treeComponentConfig);
    };
    // End: Tree Popup


    // Start: Comments Popup
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";
    $scope.showCommentsPopupCallback = function (e) {
        $scope.showSupplierIcardPopup = false;
        $scope.showItemDetailsCommentsPopup = true;


    };

    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showItemDetailsCommentsPopup = false;
        $scope.showSupplierIcardPopup = true;
        ////$scope.showSupplierIcardPopup = true;
        $scope.commentIcon = '#icon_Commented'; //icon_Comments
        //Materialize.toast('Status changed', 2000);
    };
    $scope.showCommentsFromStatusPopupCallback = function (e) {
        $scope.showItemDetailsCommentsPopup = true;
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
    // End: Comments Popup
    /* End: Supplier Icard*/

    $scope.showTaxIdfNumberPopup = false;
    $scope.showTaxIdfNumberPopupCallback = function (currRegDetails) {
        $scope.regData = currRegDetails;
        $scope.showTaxIdfNumberPopup = true;
    }

    $scope.hideTaxIdfNumberPopupCallback = function () {
        $scope.showTaxIdfNumberPopup = false;
    }

    $smartModal.initModal({
        templateUrl: "shared/popup/views/popupTaxIdentificationNumber.html",
        show: "showTaxIdfNumberPopup",
        onHide: "hideTaxIdfNumberPopupCallback()",
        type: "small",
        $scope: $scope
    });

    $scope.addLinesPopupUrl = "shared/popup/views/addLinesFromContractPopup.html";
    $scope.showAddLinesPopup = false;
    $scope.showAddLinesCallback = function (e) {
        $scope.showAddLinesPopup = true;
    };
    $scope.hideAddLinesCallback = function (e) {
        $scope.showAddLinesPopup = false;
    };
}

function plantSupplierAssociationFunc($scope) {
    $scope.plantSupplierList = [{
            'sequence': '1',
            'plant': 'AB Volvo',
            'supName': 'Robert Bosch LLC',
            'currency': 'SEK',
            'partCost': '55.99',
            'toolingCost': '1,986.83',
            'devCost': '5,960.79',
            'totalCost': '8,003.71'
        },
        {
            'sequence': '2',
            'plant': 'AB Volvo',
            'supName': 'Denso Corporation',
            'currency': 'JPY',
            'partCost': '706.80',
            'toolingCost': '24,838.72',
            'devCost': '74,516.16',
            'totalCost': '1,00,061.68'
        },
        {
            'sequence': '3',
            'plant': 'Volvo Lastvagnar AB',
            'supName': 'Hidaka USA',
            'currency': 'USD',
            'partCost': '6.25',
            'toolingCost': '221.87',
            'devCost': '665.62',
            'totalCost': '893.75'
        },
        {
            'sequence': '4',
            'plant': 'Volvo Lastvagnar AB',
            'supName': 'UCO Industries',
            'currency': 'USD',
            'partCost': '6.37',
            'toolingCost': '226.06',
            'devCost': '678.06',
            'totalCost': '910.45'
        },
    ];
}

function plantBuyerAssociationFunc($scope) {
    $scope.plantBuyerList = [{
            'plant': 'AB Volvo',
            'buyer': 'Scott Park',
            'defaultBuyer': 'Yes'
        },
        {
            'plant': 'AB Volvo',
            'buyer': 'Jason Tam',
            'defaultBuyer': '-'
        },
        {
            'plant': 'AB Volvo',
            'buyer': 'Mandy Lee',
            'defaultBuyer': '-'
        },
        {
            'plant': 'Volvo Lastvagnar AB',
            'buyer': 'Andersson M',
            'defaultBuyer': 'Yes'
        },
        {
            'plant': 'Volvo Lastvagnar AB',
            'buyer': 'Teresa S',
            'defaultBuyer': '-'
        },
        {
            'plant': 'Volvo Lastvagnar AB',
            'buyer': 'Karlsson J',
            'defaultBuyer': '-'
        },
    ];
}

function notesAttachmentFunc($scope) {
    $scope.notesAttachmentList = [{
            'name': 'Design',
            'type': 'Link',
            'classification': 'Specification',
            'description': 'http://smart.gep.com',
            'sharedExt': 'False',
            'addedOn': '9/11/2018 12:36 PM',
            'addedBy': 'Admin',
            'fileSize': '-'
        },
        {
            'name': 'P-90353',
            'type': 'Attachment',
            'classification': 'Reference',
            'description': 'P-90553.zip',
            'sharedExt': 'False',
            'addedOn': '9/11/2018 12:37 PM',
            'addedBy': 'Admin',
            'fileSize': '499 KB'
        },
        {
            'name': 'Report.pdf',
            'type': 'Attachment',
            'classification': 'Market Intelligence',
            'description': 'Report.pdf',
            'sharedExt': 'False',
            'addedOn': '9/11/2018 12:38 PM',
            'addedBy': 'Admin',
            'fileSize': '1127 KB'
        },
    ];
}

function costElementFunc($scope, $rootScope, $http, $state) {
    $scope.addNewColumn = $state.productNamePretzelAnalysis;
    $scope.showIndeName = $state.productNameMilk;
    $state.showPretzelsInnerPage = false;
    //$scope.showDataSrc = $state.productNameAcrylonitrile;
    $scope.showDataSrc = $state.productNameFoldingCartons;

    $scope.goToPage = function () {
        $state.go('p2p.serviceConfirmation.tasklist');
    }

    $scope.goToServiceConfirm = function () {
        $state.showPretzelsInnerPage = $state.productNamePretzelAnalysis;;
        $state.go('p2p.serviceConfirmation.tasklist');
    }

    $scope.costSourceOptions = [{
            "name": "Market Index"
        }, {
            "name": "Computed"
        },
        {
            "name": "Historical"
        },
        {
            "name": "Manual"
        },
    ];

    $scope.selectedCostSource = {
        "name": "Market Index"
    };
    if (!$state.productNameFoldingCartons && !$state.productNameKetchup && !$state.productNameMilk && !$state.productNameAcrylonitrile && !$state.productNameFuleHouse && !$state.productNamePretzelAnalysis) {
        $scope.costElementsList = [{
                'questval1': $state.showNewGraph ? '2,255' : '550',
                'questval': $state.showNewGraph ? '2,255' : '550',
                'sequence': '1',
                'Product': 'Pollock',
                'costelem': '1',
                'value': 'Metric Ton',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Manual"
                },
                'currency': ''
            }

        ];
    } else if ($state.productNameFoldingCartons) {
        $scope.costSourceOptions = [
            {
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
        
        $scope.dataSourceOptions = [
            {
                "name": "GEP Chemicals Price Database"
            }, {
                "name": "ICIS"
            },
            {
                "name": " "
            } 
        ];
       

        $scope.costElementsList = [
            {
                'questval1': '9000',
                'questval': '9000',
                'sequence': '1',
                'Product': 'Board-Raw',
                'costelem': '1',
                'value': 'Ton',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Manual"
                },
                selectedDataSource: {
                    "name": " "
                },
                'currency': ''
            },
            {
                'questval1': '1000',
                'questval': '1000',
                'sequence': '2',
                'Product': 'Board Waste',
                'costelem': '0.4430',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                selectedDataSource: {
                    "name": "ICIS"
                },
                'currency': ''
            },
            {
                'questval1': '1000',
                'questval': '1000',
                'sequence': '3',
                'Product': 'Coating Waste',
                'costelem': '1',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                selectedDataSource: {
                    "name": "GEP Chemicals Price Database"
                },
                'currency': ''
            }

        ];
    } else if ($state.productNamepolyviny) {
        $scope.costSourceOptions = [
            {
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
        
        $scope.dataSourceOptions = [
            {
                "name": "GEP Chemicals Price Database"
            }, {
                "name": "ICIS"
            },
            {
                "name": " "
            } 
        ];
       

        $scope.costElementsList = [
            {
                'questval1': '9000',
                'questval': '9000',
                'sequence': '1',
                'Product': 'Board-Raw',
                'costelem': '1',
                'value': 'Ton',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Manual"
                },
                selectedDataSource: {
                    "name": " "
                },
                'currency': ''
            },
            {
                'questval1': '1000',
                'questval': '1000',
                'sequence': '2',
                'Product': 'Board Waste',
                'costelem': '0.4430',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                selectedDataSource: {
                    "name": "ICIS"
                },
                'currency': ''
            },
            {
                'questval1': '1000',
                'questval': '1000',
                'sequence': '3',
                'Product': 'Coating Waste',
                'costelem': '1',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                selectedDataSource: {
                    "name": "GEP Chemicals Price Database"
                },
                'currency': ''
            },
            {
                'questval1': '100a0',
                'questval': '1000',
                'sequence': '3',
                'Product': 'Coating Wastae',
                'costelem': '1',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                selectedDataSource: {
                    "name": "GEP Chemicals Price Database"
                },
                'currency': ''
            }

        ];
    }else if ($state.productNameKetchup) {
        $scope.costElementsList = [{
                'questval1': '0.68',
                'questval': '0.68',
                'sequence': '1',
                'Product': 'Tomato paste',
                'costelem': '1',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Manual"
                },
                'currency': ''
            }

        ];
    } else if ($state.productNameMilk) {
        $scope.costElementsList = [{
                'questval1': '15.50',
                'questval': '15.50',
                'sequence': '1',
                'Product': 'Milk',
                'costelem': '1',
                'value': 'cwt',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Manual"
                },
                'currency': ''
            }

        ];
    } else if ($state.productNameFuleHouse) {
        $scope.costElementsList = [{
                'questval1': '2.50',
                'questval': '2.50',
                'sequence': '1',
                'Product': 'Fuel Hose & Tube Assembly Raw Materials',
                'costelem': '1',
                'value': 'EA',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Manual"
                },
                'currency': ''
            }

        ];
    } else if ($state.productNamePretzelAnalysis) {
        $scope.costElementsList = [{
                'questval1': '0.0013',
                'questval': '1.03',
                'sequence': '1',
                'Product': 'MALT SYRUP NON-DIASTATIC',
                'costelem': '0.0012',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '10%',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            },
            {
                'questval1': '1.3110',
                'questval': '0.15',
                'sequence': '2',
                'Product': 'FLOUR, PATHFINDER ENRICHED SILOS(110100)',
                'costelem': '1.0935',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '10%',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            },
            {
                'questval1': '0.0236',
                'questval': '0.73',
                'sequence': '3',
                'Product': 'CANOLA OIL, HIGH OLEIC',
                'costelem': '0.0292',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '10%',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            },
            {
                'questval1': '0.0035',
                'questval': '0.42',
                'sequence': '4',
                'Product': 'YEAST(1002-50)  FRESH BAKERS 50# BAGS GW',
                'costelem': '0.0097',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '10%',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            },
            {
                'questval1': '0.0063',
                'questval': '0.45',
                'sequence': '5',
                'Product': 'CAUSTIC SODA SODIUM 50% HYDROXIDE TOTE',
                'costelem': '0.0129',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '10%',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            },
            {
                'questval1': '0.0038',
                'questval': '0.39',
                'sequence': '6',
                'Product': 'SALT, MORTON ROCK /PRETZELS 4133',
                'costelem': '0.0089',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '10%',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            },
            {
                'questval1': '0.0005',
                'questval': '0.28',
                'sequence': '7',
                'Product': 'SODIUM BICARBONATE, USP #2 50LB BAG',
                'costelem': '0.0018',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '10%',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            },
            {
                'questval1': '0.0000',
                'questval': '0.00',
                'sequence': '8',
                'Product': 'CL WATER TOTAL',
                'costelem': '0.4904',
                'value': 'LB',
                'currency': 'SEK',
                'yeild': '0',
                selectedCostSource: {
                    "name": "Computed"
                },
                'currency': '',
                'type': 'INGREDIENTS'
            }
            // {
            //     'questval1': '0.00',
            //     'questval': '0.00',
            //     'sequence': '9',
            //     'Product': 'SLIPSHEETS, GMI (GARDETTO) (41X46)',
            //     'costelem': '0.0020',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'2',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // }
            // {
            //     'questval1': '0.00',
            //     'questval': '0.00',
            //     'sequence': '10',
            //     'Product': 'GARDETTOS 46.5" BULK TOTE BODY',
            //     'costelem': '0.0020',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'0',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // },
            // {
            //     'questval1': '0.00',
            //     'questval': '0.00',
            //     'sequence': '11',
            //     'Product': 'BULK TOTE CAP GREEN 50',
            //     'costelem': '0.0020',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'0',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // },
            // {
            //     'questval1': '0.00',
            //     'questval': '5.92',
            //     'sequence': '12',
            //     'Product': 'AIR BAG 48X84 REUSABLE',
            //     'costelem': '0.0000',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'0',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // },
            // {
            //     'questval1': '0.00',
            //     'questval': '0.00',
            //     'sequence': '13',
            //     'Product': 'TOTE STRAPPING, CLEAR HD 723 2X1612',
            //     'costelem': '0.0310',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'0',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // },
            // {
            //     'questval1': '0.00',
            //     'questval': '0.00',
            //     'sequence': '14',
            //     'Product': 'LINER, 51IN RW CEREAL BLK 3MIL UNPRT',
            //     'costelem': '0.0020',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'0',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // },

            // {
            //     'questval1': '0.00',
            //     'questval': '0.02',
            //     'sequence': '15',
            //     'Product': 'LABEL, SU 4X6 W/PEEL OFF LEAD EDGE (ROLL)',
            //     'costelem': '0.0020',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'0',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // },

            // {
            //     'questval1': '0.00',
            //     'questval': '0.00',
            //     'sequence': '16',
            //     'Product': 'TAPE, TOTE 24 ROLLS/CASE 1.42x180.45',
            //     'costelem': '0.1200',
            //     'value': 'EA',
            //     'currency': 'SEK',
            //     'yeild':'0',
            //     selectedCostSource: {
            //         "name": "Computed"
            //     },
            //     'currency': ''
            // },


        ];
    } else if ($state.productNameAcrylonitrile && !$state.viewScenario) {
        $scope.costSourceOptions = [
            {
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

        $scope.dataSourceOptions = [
            {
                "name": "GEP Chemicals Price Database"
            }, {
                "name": "ICIS"
            } 
        ];
        $scope.selectedDataSource = {
            "name": "GEP Chemicals Price Database"
        };


        $scope.costElementsList = [
            {
                'questval1': '0.4046',
                'questval': '0.37',
                'sequence': '1',
                'Product': 'Propylene, Chem Grade',
                'costelem': '1.0936',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                selectedDataSource: {
                    "name": "ICIS"
                },
            },
            {
                'questval1': '0.1240',
                'questval': '0.28',
                'sequence': '2',
                'Product': 'Ammonia',
                'costelem': '0.4430',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                selectedDataSource: {
                    "name": "ICIS"
                },
            },
            {
                'questval1': '0.0340',
                'questval': '0.0340',
                'sequence': '3',
                'Product': 'Chemicals',
                'costelem': '1',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                selectedDataSource: {
                    "name": "GEP Chemicals Price Database"
                },
            },
            {
                'questval1': -0.0523,
                'questval': 0.53,
                'sequence': '4',
                'Product': 'Hydrogen Cyanide',
                'costelem': '0.09871',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                selectedDataSource: {
                    "name": "GEP Chemicals Price Database"
                },
            }
        ];
    } else if ($state.productNameAcrylonitrile && $state.viewScenario) {
        $scope.costSourceOptions = [
            {
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

        $scope.dataSourceOptions = [
            {
                "name": "GEP Chemicals Price Database"
            }, {
                "name": "ICIS"
            } 
        ];
        $scope.selectedDataSource = {
            "name": "GEP Chemicals Price Database"
        };

        $scope.costElementsList = [
            {
                'questval1': '0.4046',
                'questval': '0.37',
                'sequence': '1',
                'Product': 'Propylene, Chem Grade',
                'costelem': '1.0936',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                 selectedDataSource: {
                    "name": "ICIS"
                },
            },
            {
                'questval1': '0.1329',
                'questval': '0.30',
                'sequence': '2',
                'Product': 'Ammonia',
                'costelem': '0.4430',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                selectedDataSource: {
                    "name": "ICIS"
                },
            },
            {
                'questval1': '0.0340',
                'questval': '0.034',
                'sequence': '3',
                'Product': 'Chemicals',
                'costelem': '1',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                selectedDataSource: {
                    "name": "GEP Chemicals Price Database"
                },
            },
            {
                'questval1': -0.0523,
                'questval': 0.53,
                'sequence': '4',
                'Product': 'Hydrogen Cyanide',
                'costelem': '0.09871',
                'value': 'Lbs',
                'currency': 'SEK',
                selectedCostSource: {
                    "name": "Subscription Feed"
                },
                'currency': '',
                selectedDataSource: {
                    "name": "GEP Chemicals Price Database"
                },
            },

        ];
    }

    $scope.notesAddRowCallback = function () {
        $scope.costElementsList.push({
            sequence: $scope.costElementsList.length + 1,
            Product: 'New Product',
            costelem: '--',
            value: '--',
            currency: '--',
            selectedCostSource: {
                "name": "--"
            }

        });
    }

    // if ($state.productNameAcrylonitrile) {
    //     $scope.$watch(
    //         function () {
    //             return $scope.costElementsList;
    //         },
    //         function (newValue, oldValue) {
    //             var total = 0;
    //             if (!angular.equals(oldValue, newValue)) {

    //                 angular.forEach(newValue,
    //                     function (task) {
    //                         task.costelem = task.costelem === '' ? 0 : (parseFloat(task.costelem));
    //                         task.questval = task.questval === '' ? 0 : (parseFloat(task.questval))
    //                         task.questval1 = (task.costelem * task.questval).toFixed(2);
    //                         total = total + parseFloat(task.questval1);
    //                     });
    //                 $rootScope.AcrylonitrileProductDetailTotal = total;

    //             } else {
    //                 angular.forEach(oldValue,
    //                     function (task) {
    //                         task.costelem = task.costelem === '' ? 0 : (parseFloat(task.costelem));
    //                         task.questval = task.questval === '' ? 0 : (parseFloat(task.questval))
    //                         task.questval1 = (task.costelem * task.questval).toFixed(2);
    //                         total = total + parseFloat(task.questval1);
    //                     });
    //                 $rootScope.AcrylonitrileProductDetailTotal = total;
    //             }

    //             $rootScope.AcrylonitrileTotalShouldCost = $rootScope.AcrylonitrileConversionAndOtherCostTotal + $rootScope.AcrylonitrileProductDetailTotal;
    //             $(".elements-include")[13].childNodes[0].value = ($rootScope.AcrylonitrileTotalShouldCost).toFixed(2);
    //         },
    //         true);
    // }

    // Start: CBR
    var tempCategoryNode_PAS = ['851750000001'];
    var tempBUNode_PAS = [];
    var tempRegionNode_PAS = [];

    $scope.treeComponentConfig = {
        isRadio: false,
        getHierarchyOnSelection: true,
        getAllLazyLoadedData: true,
        getUserSelection: true,
        enableLastLevelSelection: false,
        isLazyLoad: false,
        showSelectAll: true,
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
        modalButtonShow: true
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

    $('#pollock, #milk').click(function () {

        $('#pollock').hide();
        $('#milk').hide();
    });
    $scope.treeOpenCallback = function (type, ind, evt, showTree) {

        if (evt.target.text !== "Milk" && evt.target.text !== 'Fuel Hose & Tube Assembly Raw Materials' && !showTree) {
            $('#pollock').show();
        } else {
            $('#milk').show();
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
        //             $scope.treeComponentConfig.title = 'Product';
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
                $scope.costElementsList[$scope.treeIndex].Product = e.selectionAllNames[0] + ' +' + (e.selectionAllNames.length - 1) + ' More';
            else if (e.selectionAllNames.length == 1)
                $scope.costElementsList[$scope.treeIndex].Product = e.selectionAllNames[0];
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
    // End: CBR



}

function addLinesCtrlFunc($scope) {
    $scope.goToTracksatusDetail = function (e) {
        $scope.isFullscreen = !$scope.isFullscreen;
    }

    $scope.contractList = [{
        "title": "CON-123567",
        "contentUrl": "contractTab1.html",
        "htmlmode": true,
        "active": true,
        "tabsUrl": "tabHeader1.html"
    }];

    var columnDef = [{
            "field": "lineNumber",
            "displayName": "Line Number",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "lineDes",
            "displayName": "Line Description",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "category",
            "displayName": "Category",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "itemNumber",
            "displayName": "Item Number",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "supItemNum",
            "displayName": "Supplier Item Number",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "unitPrice",
            "displayName": "Unit Price (Currency)",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "uom",
            "displayName": "UOM",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "manufacturer",
            "displayName": "Manufacturer",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "partNum",
            "displayName": "Manufacturer Part Number",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        },
        {
            "field": "modelNum",
            "displayName": "Manufacturer Model Number",
            "width": 150,
            "maxWidth": 250,
            "visible": true,
            "enableCellEdit": false,
            "enableFiltering": true,
            "autoIncrement": false,
        }
    ];

    var data = [{
            "lineNumber": 1,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 245,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 2,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 656,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 3,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 712,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 4,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 347,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 5,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 985,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 6,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 366,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 7,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 190,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 8,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 226,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 9,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 868,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 10,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 945,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 1,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 245,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 2,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 656,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 3,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 712,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 4,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 347,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 5,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 985,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 6,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 366,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 7,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 190,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 8,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 226,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 9,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 868,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        },
        {
            "lineNumber": 10,
            "lineDes": "Dell Laptop",
            "category": "Laptop",
            "itemNumber": 945,
            "supItemNum": 98457632,
            "unitPrice": 100,
            "uom": 500,
            "manufacturer": "Dell",
            "partNum": 4567,
            "modelNum": 12121
        }
    ];

    $scope.smartTableOptions = {
        "enableRowSelection": true,
        "columnDefs": columnDef,
        "data": data,
    };

    $scope.columnOptions = [{
            "id": 1,
            "name": "Line Number"
        },
        {
            "id": 2,
            "name": "Line Description"
        },
        {
            "id": 3,
            "name": "Category"
        },
        {
            "id": 4,
            "name": "Item Number"
        },
        {
            "id": 5,
            "name": "Supplier Item Number"
        },
        {
            "id": 6,
            "name": "Unit Price (Currency)"
        },
        {
            "id": 7,
            "name": "UOM"
        },
        {
            "id": 8,
            "name": "Manufacturer"
        },
        {
            "id": 9,
            "name": "Manufacturer Part Number"
        },
        {
            "id": 10,
            "name": "Manufacturer Model Number"
        }
    ];

    $scope.selectedColumn = {
        "id": 1,
        "name": "Line Number"
    };
}

function chargesAndAllowancesCtrlFunc($scope, notification, $translate, $timeout) {

    $scope.fields = [];

    // Charges and Allowance -- manage columns
    $scope.manageColumns = function () {
        $scope.fields = [];
        $scope.fields = [{
                'lable': 'Requested Date'
            },
            {
                'lable': 'Shipping Method'
            },
            {
                'lable': 'Procurement Option'
            },
            {
                'lable': 'Inventory Type'
            },
            {
                'lable': 'Matching'
            },
            {
                'lable': 'Supplier Code'
            },
            {
                'lable': 'Supplier Contact'
            },
            {
                'lable': 'Manufacturer Name'
            },
            {
                'lable': 'Manufacturer P...'
            },
            {
                'lable': 'Contract Name'
            },
            {
                'lable': 'Contract Expiry Date'
            },
            {
                'lable': 'Contract Value'
            },
            {
                'lable': 'Payment Terms'
            },
        ];


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


    }

    //Charges and Allowance -- manage columns -- check all
    $scope.selectedAll = {
        'selection': false
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

    //Charges and Allowance -- manage columns -- reset
    $scope.reset = function () {
        $scope.selectedAll.selection = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
        $scope.selectedCount = getSelectedCout($scope.fields);

    };

    //Charges and Allowance -- manage columns -- on change in list checkboxes
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

    //Charges and Allowance -- manage columns -- global fn for get count
    function getSelectedCout(obj) {
        var count = 0;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                count++;
            }
        }
        return count;
    }
    $scope.selectedCount = getSelectedCout($scope.fields);

    //Charges and Allowance -- manage columns -- global fn for at least on checkbox selection in list
    function isAtleastOneSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                return true;
            }
        }
        return false;
    }

    //Charges and Allowance -- manage columns -- global fn for all checkboxes selection
    function isAllSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].selected) {
                return false;
            }
        }
        return true;
    }


    // popup -- Add Info
    $scope.AddChargesinfo = "shared/popup/views/popupEditStandardAttacment.html";
    $scope.AddChargesinfoPopup = false;
    $scope.AddChargesAttachCallback = function (e) {
        $scope.AddChargesinfoPopup = true;
    };
    $scope.AddChargesinfoPopupHideCallback = function (e) {
        $scope.AddChargesinfoPopup = false;
    };
    $scope.labels = {
        supplierLable: $translate.instant("Supplier"),
        shippingLable: $translate.instant("Shipping"),
        accountingLable: $translate.instant("Accounting"),
        addDetailsLable: $translate.instant("Additional Details")
    };

    //localization label - buttons
    $scope.cancelBtnConfig = {
        title: $translate.instant("CANCEL")
    };
    $scope.resetBtnConfig = {
        title: $translate.instant("RESET")
    };
    $scope.selectItemsBtnConfig = {
        title: $translate.instant("SELECT ITEMS")
    };
    $scope.backBtnConfig = {
        title: $translate.instant("BACK")
    };
    $scope.ApplyBtnConfig = {
        title: $translate.instant("APPLY")
    };

    // POPUP -- apply to all 


    $scope.mainApplyToAllPopUp = false;
    $scope.mainApplyToAllPopUpCallback = function (e) {
        $scope.mainApplyToAllPopUp = true;
    };
    $scope.mainApplyToAllPopUpClose = function (e) {
        $scope.mainApplyToAllPopUp = false;
    };

    // popup -- apply to all -- sidebar links
    $scope.iteams = [{
            title: $scope.labels.supplierLable,
            lable: 'supplier',
            isChecked: false
        },
        {
            title: $scope.labels.shippingLable,
            lable: 'shipping',
            isChecked: false
        },
        {
            title: $scope.labels.accountingLable,
            lable: 'accounting',
            isChecked: false
        },
        {
            title: $scope.labels.addDetailsLable,
            lable: 'additionalDetails',
            isChecked: false
        }
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
        "requester": "John Doe",
        "bu": "101 - GEP, New Jersey",
        "costCenter": "1011 - OutSourcing",
        "glCode": "2034 - Generral Service",
        "projectCode": "2034040 - Project Code",
        "contractNo": "20380 - IT/Hardware",
        "date": "2016-12-27T14:08:43.543Z",
        "suppContact": "+1-541-854-1010",
        "costCenter": "A",
        "accountNumber": "07-20-2016",
        "projectId": "39099-21-25",
        "startDate": "2016-12-27T14:08:43.543Z",
        "endDate": "2016-12-27T14:08:43.543Z",
    };

    // popup -- apply to all -- checkbox Selection interaction
    $scope.isChecked = {};

    // popup -- apply to all -- select item
    $scope.applyToAllItemsUrl = "shared/popup/views/popupApplyToAllItems.html";

    $scope.applyToAllItemPopUp = false;
    $scope.applyToAllItemPopUpCallback = function (e) {
        //$scope.applyToAllItemPopUp = true;
    };
    $scope.applyToAllItemPopUpClose = function (e) {
        $scope.applyToAllItemPopUp = false;
    };

    // popup -- apply to all -- select item -- item list
    $scope.itemList = [{
            'lable': 'Payment Term'
        },
        {
            'lable': 'Legal Entity'
        },
        {
            'lable': 'shipping & freight'
        }, {
            'lable': 'Payment Term'
        }, {
            'lable': 'Legal Entity'
        }, {
            'lable': 'shipping & freight'
        }, {
            'lable': 'Payment Term'
        }, {
            'lable': 'Legal Entity'
        }, {
            'lable': 'shipping & freight'
        }, {
            'lable': 'Payment Term'
        }, {
            'lable': 'Legal Entity'
        }, {
            'lable': 'shipping & freight'
        }
    ];

    //popup -- apply to all-select items -- select All
    $scope.checkAllC = function (aug) {
        angular.forEach($scope.itemList, function (itemList, key) {
            $scope.itemList[key].selected = aug;
        });
    };
    $scope.addLines = 1;
    // UI Grid -- popup callback 
    $scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive
        // UI Grid -- popup callback -- taxes papup
        if (def.col && def.col.field == 'taxes') {
            $scope.showTaxesPopup = true;
        }
        // UI Grid -- popup callback -- manufacturer details papup
        if (def.col && def.col.field == 'manufacturerDetails') {

            $scope.manufatureDetailsPopup = true;
        }

        // UI Grid -- popup callback -- S&P
        if (def.col && def.col.field == 'spLink' && def.row.entity.spLink == 'ADD S&P') {
            $scope.showSPPopup = true;
        } else if (def.col && def.col.field == 'spLink') {
            $scope.showGridSandPPopup = true;
        }

        // UI Grid -- popup callback -- split number papup
        if (def.col && def.col.field == 'splitNumber') {
            $scope.splitPopupPopup = true;
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

    }
    $scope.addInfoPopupText = "";

    $scope.addInfoSaved = function (val) {
        $scope.addInfoPopupText = val;
        $scope.forEditColumnObj.row.entity.AddInfo = $scope.addInfoPopupText;
        //console.log(val);
    };


    $scope.addInfoPopupAttachment = "";

    $scope.addInfoSavedClick = function (val) {
        $scope.addInfoPopupAttachment = val;
        $scope.forEditColumnObj.row.entity.AddInfoAttach = $scope.addInfoPopupAttachment;
        //console.log(val);
    };

    $scope.flexibleDetailPOTabDataset = [{
            "title": "Charges",
            "contentUrl": "p2p/req/views/chargesandAllowChargesTab.html",
            "active": true
        },
        {
            "title": "Accounting",
            "contentUrl": "p2p/req/views/chargesandAllowAccTab.html"
        },
    ];

    $scope.flexibleCharges = [{
            "field": "lineNumber",
            "width": 120,
            "displayName": "Number",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": true,
            "autoIncrement": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "supplierName",
            "width": 220,
            "displayName": "Name",
            "isFixed": "Left",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "description",
            "width": 320,
            "displayName": "Description",
            "isFixed": "Left",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable",
            "attributes": {
                "type": "number"
            }
        },
        {
            "field": "tolerancepercent",
            "width": 140,
            "displayName": "Tolerance Percent",
            "isVisible": true,
            "isReadOnly": false,
            "autoIncrement": false,
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "dropdown",
            "attributes": {
                "model": "type",
                "dataKey": "name",
                "options": [{
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
            "filterObject": {
                "enableFiltering": true
            },
            "cellTemplate": "<smart-checkbox class='aCenter' ng-model='isUrgent' on-change='onChange(isUrgent)'></smart-checkbox>"
        },
        {
            "field": "AddInfo",
            "width": 380,
            "displayName": "Additional Information",
            "isRegFocusCol": true,
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "attributes": {
                "type": "AddChargesinfoCallback",
                "defaultTitle": "Add Info"
            },
            "type": "popup",
        },
    ];
    $scope.flexibleChargesModel = [{
            "lineNumber": 1,
            "supplierName": "Shipping",
            "description": "Shipping charges",
            "amount": 500,
            "tolerancepercent": 10,
            "isExternal": {
                "name": "Charge"
            },
            "AddInfo": "Add",
        },

        {
            "lineNumber": 2,
            "supplierName": "Import Duties",
            "description": "Airport custom duties",
            "amount": 250,
            "tolerancepercent": 5,
            "isExternal": {
                "name": "Allowance"
            },
            "AddInfo": "Add",
        },

        {
            "lineNumber": 3,
            "supplierName": "Handling",
            "description": "Charges for fragile item",
            "amount": 300,
            "tolerancepercent": 5,
            "isExternal": {
                "name": "Charge"
            },
            "AddInfo": "Add",
        },

        {
            "lineNumber": 4,
            "supplierName": "Shipping",
            "description": "Shipping charges",
            "amount": 500,
            "tolerancepercent": 10,
            "isExternal": {
                "name": "Allowance"
            },
            "AddInfo": "Add",
        },

        {
            "lineNumber": 5,
            "supplierName": "Import Duties",
            "description": "Airport custom duties",
            "amount": 250,
            "tolerancepercent": 5,
            "isExternal": {
                "name": "Allowance"
            },
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
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "description",
            "width": 150,
            "displayName": "Description",
            "isFixed": "Left",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "splitNumber",
            "width": 150,
            "displayName": "Split Number",
            "isFixed": "Left",
            "isRegFocusCol": true,
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "splitTaxes",
            "width": 230,
            "displayName": "Split Taxes & Charges (USD)",
            "isVisible": false,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "splitValues",
            "width": 230,
            "displayName": "Split Value (USD)",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
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
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "corporation.name",
            "width": 200,
            "displayName": "Corporation",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "bu.name",
            "width": 180,
            "displayName": "Cost Center",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "account.name",
            "width": 180,
            "displayName": "Account Number",
            "isVisible": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        },
        {
            "field": "project.name",
            "width": 170,
            "displayName": "Project Number",
            "isVisible": true,
            "autoIncrement": true,
            "isReadOnly": true,
            "filterObject": {
                "enableFiltering": true
            },
            "type": "editable"
        }
    ];
    $scope.flexibleAccountingModel = [{
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
            "buyerItemNumber": "1",
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
            "chargeName": "Freight",
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

    // popup -- split 
    $scope.splitPopupUrl = "p2p/req/views/popupSplit.html";
    $scope.splitPopupPopup = false;
    $scope.splitPopupCallback = function (e) {
        $scope.splitPopupPopup = true;
    };
    $scope.splitPopupPopupHideCallback = function (e) {
        $scope.splitPopupPopup = false;
    };
    //$scope.splitList = [
    //    { splitNumber: '1', splitValue: '20', actionIconDelete: true },
    //    { splitNumber: '2', splitValue: '20', actionIconDelete: true },
    //    { splitNumber: '3', splitValue: '20', actionIconDelete: true },
    //    { splitNumber: '4', splitValue: '20', actionIconDelete: true },
    //    { splitNumber: '5', splitValue: '20', actionIconDelete: true }
    //];
    $scope.addSplitRow = function (e) {
        $scope.checkPercentTotal = false;
        if ($scope.splitFlag) {
            $scope.splitList.number.push({
                "splitValue": "",
                "splitRule": [{
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            });

            var getContent = angular.element('#numContainerTable').height();
            setTimeout(function () {
                angular.element('#numberContainer').find('.scroll-content').scrollTop(getContent + 55);
            }, 100);


        } else {
            $scope.splitList.percent.push({
                "splitValue": "",
                "splitRule": [{
                        "rule": "!(/[0-9]/.test(this))",
                        "error": "Need atleast one number"
                    },
                    {
                        "rule": "(/^[0]$/.test(this))",
                        "error": "Number should greater than 0"
                    }
                ]
            });

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
        fnCalculation();
    }
    $scope.splitList = {
        number: [{
            "splitValue": "",
            "splitRule": [{
                    "rule": "!(/[0-9]/.test(this))",
                    "error": "Need atleast one number"
                },
                {
                    "rule": "(/^[0]$/.test(this))",
                    "error": "Number should greater than 0"
                }
            ]
        }],
        percent: [{
            "splitValue": "",
            "splitRule": [{
                    "rule": "!(/[0-9]/.test(this))",
                    "error": "Need atleast one number"
                },
                {
                    "rule": "(/^[0]$/.test(this))",
                    "error": "Number should greater than 0"
                }
            ]
        }]
    };
    $scope.splitType = [{
        title: 'Number'
    }, {
        title: 'Percentage'
    }];
    $scope.selectedSplit = {
        title: 'Number'
    };
    $scope.splitFlag = true;
    $scope.onChangeSplit = function (selectedSplit) {
        if (selectedSplit.title == 'Number') {
            $scope.splitFlag = true;
        } else if (selectedSplit.title == 'Percentage') {
            $scope.splitFlag = false;
        }
    }

    // popup -- split -- focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };
}

function p2pBuCtrlFunc($scope, $http, $sce) {



    // Start: CBR
    var tempCategoryNode_PAS = ['851750000001'];
    var tempBUNode_PAS = ['851750000001'];
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
};

function attachmentSectionCtrlFunc($scope) {
    $scope.attachments = [{
            name: "File_ABC.pdf",
            fileSize: "18 KB",
            uploadDate: "12 April 2016",
            createdBy: "Johnny Walker",
            isChecked: false
        },
        {
            name: "xyz.xls",
            fileSize: "18 KB",
            uploadDate: "12 April 2016",
            createdBy: "Johnny Walker",
            isChecked: false
        },
        {
            name: "Name_of_the_attached_file.pdf",
            fileSize: "18 KB",
            uploadDate: "12 April 2016",
            createdBy: "Johnny Walker",
            isChecked: false
        },
        {
            name: "Name_of_theattached_file.docx",
            fileSize: "18 KB",
            uploadDate: "12 April 2016",
            createdBy: "Johnny Walker",
            isChecked: false
        },
        {
            name: "Name of the attachments file",
            fileSize: "18 KB",
            uploadDate: "12 April 2016",
            createdBy: "Johnny Walker",
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
    };
};

function popupShipToCtrlFunc($scope) {
    $scope.typeaheadLabel = "Ship To";
    $scope.options = [{
            "shipTo": "Mumbai",
            "shipToAdd": "7th Floor, Building 3 Plot # 3 TTC Industrial Area MIDC Thane Belapur Road Airoli Navi Mumbai 400 708"
        },
        {
            "shipTo": "Hyderabad",
            "shipToAdd": "Western Pearl, 8th Floor Next to Google Building, Kondapur, Hitech-city Hyderabad 500084"
        },
        {
            "shipTo": "Shanghai",
            "shipToAdd": "Cross Tower, #318 Fu Zhou Road,HuangPu District, Shanghai"
        },
        {
            "shipTo": "Singapore",
            "shipToAdd": "89 Short Street, #B1-11 Golden Wall Centre, Singapore-188216"
        },
        {
            "shipTo": "Sydney",
            "shipToAdd": "Australia Square 2000 NSW, Australia"
        },
        {
            "shipTo": "London",
            "shipToAdd": "GEP, 22 Tudor Street, London, EC4Y 0AY"
        },
        {
            "shipTo": "Prague",
            "shipToAdd": "Hradcansk� Office Center Milady Hor�kov� 116/109, Prague 6, 160 00 Czech Republic"
        },
    ];
    $scope.selected = $scope.options[0];
    $scope.selectedBillTo = $scope.options[0];
    $scope.selectedDeliverTo = $scope.options[0];
    $scope.showLocationPopup = false;
    $scope.showLocationPopupFn = function () {
        $scope.showLocationPopup = true;
    };
    $scope.showLocationPopupClBack = function () {
        $scope.showLocationPopup = false;
    };
}

function additionalInfoSectionCtrlFunc($scope) {


    $scope.questionnaireData = [{
            "title": "Questionnaire 1",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
            "rank": 0,
            "question": [{
                    "title": "What is Lorem Ipsum?",
                    "rating": {
                        "applied": false,
                        "title": "Add Rating",
                        "value": [{
                            "from": 0,
                            "to": 0,
                            "color": "#ef5350",
                            "description": ""
                        }]
                    },
                    "weight": 0,
                    "lock": false,
                    "questionType": {
                        "name": "Multiple response (Check boxes)",
                        "type": "multi-response",
                        "template": "multi-response"
                    },
                    "questionResponse": [{
                            "check": false,
                            "title": "DUMMY",
                            "score": ""
                        },
                        {
                            "check": false,
                            "title": "ACTUAL",
                            "score": ""
                        }
                    ],
                    "conditional": {
                        "check": false,
                        "conditionalData": [],
                        "questionattachedTo": -2
                    },
                    "conditionalQuestion": {
                        "selectedquestionResponse": [],
                        "selectedquestionType": []
                    },
                    "attachment": {
                        "attachmentLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "mandatory": false,
                    "nonScoring": false,
                    "addAttachment": {
                        "disable": false,
                        "check": false,
                        "isVisible": false,
                        "attachmentListLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "preview": false,
                    "name": "Q1"
                },
                {
                    "title": "What is Dummy Text?",
                    "rating": {
                        "applied": false,
                        "title": "Add Rating",
                        "value": [{
                            "from": 0,
                            "to": 0,
                            "color": "#ef5350",
                            "description": ""
                        }]
                    },
                    "weight": 0,
                    "lock": false,
                    "questionType": {
                        "name": "Single Response (Radio Buttons)",
                        "type": "single-response-radio",
                        "template": "single-response-radio"
                    },
                    "questionResponse": {
                        "selected": {},
                        "config": [{
                            "options": [{
                                "title": "Dummy Text",
                                "score": ""
                            }]
                        }, {
                            "options": [{
                                "title": "Actual Text",
                                "score": ""
                            }]
                        }],
                        "radioModel": {
                            "config": [{
                                "title": 0,
                                "disable": true
                            }]
                        }
                    },
                    "conditional": {
                        "check": false,
                        "conditionalData": [],
                        "questionattachedTo": -2
                    },
                    "conditionalQuestion": {
                        "selectedquestionResponse": [],
                        "selectedquestionType": []
                    },
                    "attachment": {
                        "attachmentLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "mandatory": true,
                    "nonScoring": false,
                    "addAttachment": {
                        "disable": false,
                        "check": true,
                        "isVisible": false,
                        "attachmentListLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "preview": false,
                    "name": "Q2"
                }
            ],
            "name": "Section 1"
        },
        {
            "title": "Questionnaire 2",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
            "rank": 0,
            "question": [{
                    "title": "What is Lorem Ipsum?",
                    "rating": {
                        "applied": false,
                        "title": "Add Rating",
                        "value": [{
                            "from": 0,
                            "to": 0,
                            "color": "#ef5350",
                            "description": ""
                        }]
                    },
                    "weight": 0,
                    "lock": false,
                    "questionType": {
                        "name": "Multiple response (Check boxes)",
                        "type": "multi-response",
                        "template": "multi-response"
                    },
                    "questionResponse": [{
                            "check": false,
                            "title": "DUMMY",
                            "score": ""
                        },
                        {
                            "check": false,
                            "title": "ACTUAL",
                            "score": ""
                        }
                    ],
                    "conditional": {
                        "check": false,
                        "conditionalData": [],
                        "questionattachedTo": -2
                    },
                    "conditionalQuestion": {
                        "selectedquestionResponse": [],
                        "selectedquestionType": []
                    },
                    "attachment": {
                        "attachmentLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "mandatory": false,
                    "nonScoring": false,
                    "addAttachment": {
                        "disable": false,
                        "check": true,
                        "isVisible": false,
                        "attachmentListLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "preview": false,
                    "name": "Q1"
                },
                {
                    "title": "What is Dummy Text?",
                    "rating": {
                        "applied": false,
                        "title": "Add Rating",
                        "value": [{
                            "from": 0,
                            "to": 0,
                            "color": "#ef5350",
                            "description": ""
                        }]
                    },
                    "weight": 0,
                    "lock": false,
                    "questionType": {
                        "name": "Single Response (Radio Buttons)",
                        "type": "single-response-radio",
                        "template": "single-response-radio"
                    },
                    "questionResponse": {
                        "selected": {},
                        "config": [{
                            "options": [{
                                "title": "Dummy Text",
                                "score": ""
                            }]
                        }, {
                            "options": [{
                                "title": "Actual Text",
                                "score": ""
                            }]
                        }],
                        "radioModel": {
                            "config": [{
                                "title": 0,
                                "disable": true
                            }]
                        }
                    },
                    "conditional": {
                        "check": false,
                        "conditionalData": [],
                        "questionattachedTo": -2
                    },
                    "conditionalQuestion": {
                        "selectedquestionResponse": [],
                        "selectedquestionType": []
                    },
                    "attachment": {
                        "attachmentLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "mandatory": true,
                    "nonScoring": false,
                    "addAttachment": {
                        "disable": false,
                        "check": true,
                        "isVisible": false,
                        "attachmentListLimit": "2",
                        "attachmentList": [{
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            },
                            {
                                "fileUploadVal": "Attachment_1",
                                "link": ""
                            }
                        ]
                    },
                    "preview": false,
                    "name": "Q2"
                }
            ],
            "name": "Section 1"
        }
    ];

};

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
    $scope.selectedTab = 1;



    $scope.isSharedWithRequired = true;
    $scope.isClassificationWithRequired = true;
    $scope.sharedWithText = "Shared with External Users";
    $scope.emptyText = '';
    $scope.attachments = [{
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
            name: "ABC123",
            fileSize: "-",
            uploadDate: "12 April 2016",
            uploadBy: "John Doe",
            sharedWith: 'No',
            type: "Notes",
            isChecked: false
        }
    ];
    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.attachmentMsg = "Supported file formats: doc, docs, pdf, jpg, jpeg, png, tiff.\
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

function p2pReqAdditionalInformationCtrlFunc($scope, $rootScope, RuleEngine, $http, $window, $state, $timeout, $sce, $filter) {
    //page back link
    $scope.backToHistory = function () {
        history.go(-1);
    }
    /* Additional information  */
    var getUrlData = function () {
        if ($state.current.name == 'p2p.procProfile.templateList')
            $scope.dataUrlLink = 'p2p/procurementProfile/models/createProcProfile_readOnly.json'
    }
    $scope.pageFor = ($state.params.from === 'p2p.procProfile.new' || $state.current.name === "p2p.procProfile.new") ? 'proc' : '';
    $scope.idIs = $state.params.id;
    $scope.dataUrlLink = ($scope.pageFor == 'proc') ? 'p2p/procurementProfile/models/createProcProfile.json' : 'p2p/req/models/createReq.json';
    getUrlData();
    var additionalInfo = {
        method: 'GET',
        url: $scope.dataUrlLink
    };

    $http(additionalInfo).then(function (response) {
        $scope.data = response.data.dataModel;
        $scope.dataModel = $scope.data.additionalInfo.data;
        $scope.lineviewData = $scope.data.LineLeveladditionalInfo;
        if ($state.current.name == 'p2p.req.additionalInfo' && $scope.idIs != undefined) {
            $scope.lineviewData[$scope.idIs].showContent = true;
            $scope.isAdditionalInfoPage = true;
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.sectionName = "ADDITIONAL INFORMATION"

    $scope.fieldCount = function (customAttrList) {
        var count = 0;
        var findinarray = checkArray(customAttrList);

        if (findinarray) {
            angular.forEach(customAttrList, function (v, k) {
                angular.forEach(v.levels, function (v, k) {
                    count += v.questions.length;
                });
            });
        } else {
            angular.forEach(customAttrList, function (v, k) {
                count += customAttrList[k].questions.length;
            });
        }


        return count;
    }
    var checkArray = function (customAttrList) {
        if (customAttrList !== undefined) {
            var i = 0,
                returnValue;
            for (i; i < customAttrList.length; i++) {
                if (customAttrList[i].levels !== undefined) {
                    returnValue = true;
                    break;
                } else {
                    returnValue = false;
                    break;
                }
            }
            return returnValue;
        }
    }

    // side bar -- dynamic scrolling
    $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
    angular.element($window).bind('resize', function (e) {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        } else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }

        $scope.$apply();
    });

    angular.element($window).bind('scroll', function () {
        if ($scope.fixedSubHeader) {
            $scope.dynamicScroll = ($window.innerHeight - 50) + 'px';
        } else {
            $scope.dynamicScroll = ($window.innerHeight - 114) + 'px';
        }
        $scope.$apply();
    });


    //left panel selection link
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
        } else {

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

    $scope.moreFieldsClick = function () {
        $state.go('p2p.req.additionalInfo', {
            'from': $state.current.name,
            'id': 0
        });
    }
}