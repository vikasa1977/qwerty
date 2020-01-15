(function (angular) { 
angular
	.module('SMART2')
	.controller('questionnairecompareResponseCtrl', ['$scope', '$http', '$timeout', '$state', 'notification', 'lookup', '$filter', questionnairecompareResponseCtrlFunc])
    .service('questionnairecompareResponseScrollTo', ['ScrollTo', '$window', function (ScrollTo, $window) {

        var accordianObjval = [];
        this.accordianObj = function (data) {
            accordianObjval = data;
            ScrollTo.setScrollingTopMargin(data.scrollOffset);
        }
        this.perform = function (element, elementObj, onComplete) {

            var connect = accordianObjval,
                disHei = 0,
                $currentElement = element.find('.' + connect.displayCtn),
                $currentElementCtn = $currentElement.closest('.' + connect.currentObjCtn);

            if ($currentElementCtn.hasClass('active')) {
                if (connect.closeCnt) {
                    ScrollTo.perform(element, angular.element('#questionnairecontainer'), function (e) { });
                    return false;
                }
                $currentElementCtn.removeClass('active fixedContain absoluteContain');
                $currentElement.slideUp();
                angular.element($window).off("scroll.smartAccordianlist");
            } else {
                var elementHeight = element.find('.collapse-header-ctn').outerHeight(true),
                    activeFlag;

                angular.element('.' + connect.currentObjCtn).each(function (index) {
                    var $this = angular.element(this);
                    activeFlag = $this.hasClass('active');
                    if (activeFlag) {
                        $this.find('.' + connect.displayCtn).slideUp(function () {

                            $this.removeClass('active fixedContain absoluteContain');

                            element.find('.collapse-header').css('minHeight', elementHeight);
                            $currentElement.slideDown(function () {
                                ScrollTo.perform(element, angular.element('#questionnairecontainer'), function (e) {
                                    $currentElementCtn.addClass('active ');//fixedContain
                                    var currentElementHeight = $currentElement.outerHeight();
                                    //currentElementCtnHeight = $currentElementCtn.find('.question-details-loadmore').outerHeight(true),
                                    ReqHeiht = ((currentElementHeight) + $window.pageYOffset);

                                    var accordianlistObj = [$window.pageYOffset, ReqHeiht];
                                    angular.element($window).off("scroll.smartAccordianlist").on("scroll.smartAccordianlist", function () {

                                        if (this.pageYOffset < accordianlistObj[0]) {
                                            $currentElementCtn.removeClass('fixedContain absoluteContain');
                                        } else if (this.pageYOffset > accordianlistObj[1]) {
                                            $currentElementCtn.removeClass('fixedContain');
                                            $currentElementCtn.addClass('absoluteContain');
                                        } else {
                                            $currentElementCtn.addClass('fixedContain');
                                            $currentElementCtn.removeClass('absoluteContain');
                                        }
                                    });
                                });
                            });

                        });
                    }
                });
                if (!activeFlag) {
                    element.find('.collapse-header').css('minHeight', elementHeight);
                    $currentElement.slideDown(function () {
                        ScrollTo.perform(element, angular.element('#questionnairecontainer'), function (e) {
                            $currentElementCtn.addClass('active ');//fixedContain
                            var currentElementHeight = $currentElement.outerHeight();
                            //currentElementCtnHeight = $currentElementCtn.find('.question-details-loadmore').outerHeight(true),
                            ReqHeiht = ((currentElementHeight) + $window.pageYOffset);

                            var accordianlistObj = [$window.pageYOffset, ReqHeiht];
                            angular.element($window).off("scroll.smartAccordianlist").on("scroll.smartAccordianlist", function () {

                                if (this.pageYOffset < accordianlistObj[0]) {
                                    $currentElementCtn.removeClass('fixedContain absoluteContain');
                                } else if (this.pageYOffset > accordianlistObj[1]) {
                                    $currentElementCtn.removeClass('fixedContain');
                                    $currentElementCtn.addClass('absoluteContain');
                                } else {
                                    $currentElementCtn.addClass('fixedContain');
                                    $currentElementCtn.removeClass('absoluteContain');
                                }
                            });
                        });
                    });
                }
                //setTimeout(function () {


                //}, 10);
            }
        };
    }])
	.directive('smartQuestioncomparerespAccordian', ['questionnairecompareResponseScrollTo', '$window', function (questionnairecompareResponseScrollTo, $window) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            var connect = JSON.parse(attrs.connect);
	            scope.questionGoToAcc = function (e) {
	                questionnairecompareResponseScrollTo.accordianObj(connect);
	                questionnairecompareResponseScrollTo.perform(angular.element(e.currentTarget).closest('.' + connect.currentObjCtn));
	            };
	        }
	    }
	}])
	.directive('smartQuestioncomparerespNav', ['questionnairecompareResponseScrollTo', '$window', function (questionnairecompareResponseScrollTo, $window) {
	    return {
	        restrict: 'AE',
	        link: function (scope, element, attrs) {
	            scope.questionnairesSectionData = scope.questionnairesSection;
	            var connect = JSON.parse(attrs.connect),
	                $dropBtn;
	            scope.questionGoTo = function (e, item) {
	                questionnairecompareResponseScrollTo.accordianObj(connect);
	                questionnairecompareResponseScrollTo.perform(angular.element('#' + item));
	            };

	            var lastScrollPosition = 0,
					newScrollPosition = 0,
	                $searchElement = angular.element('#questioncomparerespHeaderContainer'),
	                $fixedSubHeader = $('#fixedSubHeader'),
	                $questionnairecontainer = $('#questionnairecontainer');
	                $scorecardsidebar = $('#scorecardsidebar');
	                $msgCtnHgt = $('.alert-bar--fixed').height();
	                windowHgt = $window.innerHeight - 68;
	            angular.element($window).on("scroll.smartQuestionrespNav", function () {
	                newScrollPosition = this.pageYOffset;
	                if (this.pageYOffset >= 64) {
	                    if (!$fixedSubHeader.hasClass('extra-nav-wrap-fixed')) {
	                        $fixedSubHeader.addClass('extra-nav-wrap-fixed');
	                        $searchElement.addClass('questionnaire-search-header--fixed');
	                        $questionnairecontainer.css('marginTop' , '172px');
	                    }
	                    if ($scorecardsidebar.length) {
	                        $scorecardsidebar.css({
	                            'top': 50,
	                            'height': windowHgt - 50 
	                        });
	                    }
	                  
	                     
	                    
	                } else {
	                    if ($scorecardsidebar.length) {
	                        $scorecardsidebar.css({
	                            'top': 114 - this.pageYOffset,
	                            'height': windowHgt - (114 - this.pageYOffset)
	                        })
	                    }
	                    if ($fixedSubHeader.hasClass('extra-nav-wrap-fixed')) {
	                        $fixedSubHeader.removeClass('extra-nav-wrap-fixed');
	                        $searchElement.removeClass('questionnaire-search-header--fixed');

	                        $questionnairecontainer.css('marginTop', '0');
	                    }
	                }

	                //sticky questionnaire search show hide on scroll
	                //if (newScrollPosition < lastScrollPosition || newScrollPosition <= 110) {
	                //    if (newScrollPosition <= 50) {
	                //        $searchElement.removeClass('questionnaire-search-header--fixed');
	                //    }
	                //    //element.show();

	                //    //if (!scope.gotoFlag.check) {
	                //    //	scope.gotoFlag.check = true;
	                //    //}

	                //} else {

	                //    //if (scope.gotoFlag.check) {
	                //    //	scope.gotoFlag.check = false;
	                //    //}
	                //    //element.hide();
	                //    if (newScrollPosition > 50) {
	                //        $searchElement.addClass('questionnaire-search-header--fixed');
	                //    }
	                //}
	                lastScrollPosition = newScrollPosition;
	            });
	            scope.treeSearchModel = { title: '' };
	            scope.onHide = function () {
	                scope.isActiveHeaderNav = false;
	                scope.hideSearchHeaderNav();
	            }
	            element.on('focus', 'input', function () {
	                scope.isActiveHeaderNav = true;
	                scope.$digest();
	                if (!$dropBtn) {
	                    $dropBtn = angular.element('#' + connect.focusSearchObj);
	                }
	                if (!$dropBtn.hasClass('active')) {
	                    setTimeout(function () {
	                        $dropBtn.triggerHandler('click');
	                    }, 10);
	                }
	            });
	            scope.$on('$destroy', function () {
	                angular.element($window).off("scroll.smartQuestionrespNav");
	                element.off('focus', 'input');
	                element.remove();
	            });

	            /* 
				  HEADER SEARCH INTRACTION
				*/
	            scope.showSearchHeaderNav = function (str) {
	                angular.element('#' + connect.focusSearchContainer).addClass('questioncomparesearch--active');
	                //this.isActiveHeaderNav = true;
	                //this.focusSearchHeaderNav = true;
	                //this.hideCloseHeaderNav = true;


	            }
	            scope.showSearchHeaderNav('questionnaireresponseNav-dropdown-button');

	            scope.hideSearchHeaderNav = function (str) {
	                scope.treeSearchModel.title = '';
	                angular.element('#' + connect.focusSearchContainer).removeClass('questioncomparesearch--active');
	                if (str) {
	                    if (!$dropBtn) {
	                        $dropBtn = angular.element('#' + str);
	                    }
	                    if ($dropBtn.hasClass('active')) {
	                        //setTimeout(function () {
	                        $dropBtn.triggerHandler('click');
	                        //}, 10);
	                    }
	                }
	                //this.isActiveHeaderNav = false;
	                //this.focusSearchHeaderNav = false;
	                //this.hideCloseHeaderNav = false;

	            }
	        },
	        templateUrl: 'shared/questionnaire/views/questionnaireResponsesNav.html'
	    }
	}])
    .filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

function questionnairecompareResponseCtrlFunc($scope, $http, $timeout, $state, notification, lookup, $filter) {
    $scope.compareForm = false;
    $scope.isPageWithoutImage = true;
   

    //$scope.typeSortIcon = { 'icon': 'icon_Sort' };
    //$scope.ascDescToggler = function (data) {
    //    if (data.icon == 'icon_Sort') {
    //        data.icon = 'icon_SortAscending';
            
    //    }
    //    else if (data.icon == 'icon_SortAscending')
    //        data.icon = 'icon_SortDescending';
    //    else
    //        data.icon = 'icon_Sort';
    //};



    // Start: Sort events
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
        if ($scope.sortIcon === 'icon_SortDescending') {
            $scope.typeSortIconTooltip = "Ascending";
            $scope.sortIcon = 'icon_SortAscending';
        }
        else {
            $scope.sortIcon = 'icon_SortDescending';
            $scope.typeSortIconTooltip = "Descending";
        }
    };

    $scope.typeSortIcon = { 'icon': 'icon_Sort' };
    $scope.typeSortIconTooltip = "Sort"
    $scope.ascDescToggler = function (data) {
        if (data.icon === 'icon_Sort') {
            data.icon = 'icon_SortAscending';
            $scope.typeSortIconTooltip = "Ascending"
        }
        else if (data.icon === 'icon_SortAscending') {
            data.icon = 'icon_SortDescending';
            $scope.typeSortIconTooltip = "Descending";
        }
        else {
            data.icon = 'icon_Sort';
            $scope.typeSortIconTooltip = "Sort"
        }
    };
    // End: Sort events



    $scope.popupExport = {
        selectedOption: [],
        respondBy: {
            selectedOption: { name: "Both", key: "both" },
            options: [
                { name: "Both", key: "both" },
                { name: "Supplier Contact", key: "supplierCont" },
                { name: "Evaluators", key: "evaluators" }
            ]
        },
        options: [                
                { isCheck: false, name: 'IBM' },
                { isCheck: false, name: 'Dell' },
                { isCheck: false, name: 'Lenovo' },
                { isCheck: false, name: 'HP' },
                { isCheck: false, name: 'Acer' }
        ],
        count: 0
    }

    $scope.selectSupplierDataFiter = [
            { name: 'Both', ischeck: true },
            { name: 'Supplier', ischeck: true },
            { name: 'Evaluator', ischeck: true }
    ];
    $scope.enableFilterText = "#icon_Filter";
    $scope.enableFilteText = "Both"
    $scope.enableFilterFn = function (data) {
        $scope.enableFilteText = data;
        if (data === 'Supplier') {
            $scope.enableFilterText = "#icon_FilterAppli";
            $scope.selectSupplierDataFiter[2].ischeck = false;
            $scope.selectSupplierDataFiter[1].ischeck = true;
        } else if (data === 'Evaluator') {
            $scope.enableFilterText = "#icon_FilterAppli";

            $scope.selectSupplierDataFiter[1].ischeck = false;
            $scope.selectSupplierDataFiter[2].ischeck = true;
        } else {
            $scope.enableFilterText = "#icon_Filter";
            $scope.selectSupplierDataFiter[1].ischeck = true;
            $scope.selectSupplierDataFiter[2].ischeck = true;

        }
    };



    $scope.actionsExport = [
            { "export": "EXPORT PDF" },
            { "export": "EXPORT WORD" },
            { "export": "EXPORT EXCEL" },
            { "export": "IMPORT RESPONSE" },
            { "export": "VIEW LOG" },
    ];

    $scope.exportclick = function (i) {
        switch (i) {
            case 4:
                $scope.showUploadDownloadPopup();
                break;
            case 2:
                $scope.showImportResponse();
        }
    };

    $scope.uploadData = [
    { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'John Miller', status: 'success' },
    { log: 'download', logText: 'Download', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'Franko Miles', status: 'failed' },
    { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'David Chills', status: 'success' },
    { log: 'upload', logText: 'Upload', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'John Miller', status: 'failed' },
    { log: 'download', logText: 'Download', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'Franko Miles', status: 'failed' },
    { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'David Chills', status: 'success' }
    ];
    $scope.uploadDOwnloadLog = false;
    $scope.showUploadDownloadPopup = function () {
        $scope.uploadDOwnloadLog = true;
    }
    $scope.hideUploadDownloadPopup = function () {
        $scope.uploadDOwnloadLog = false;
    }


    $scope.scoreResponseChangeItem = function (ind) {
        recurrenceTempIndex = ind;
    }
    $scope.filterOption = [
        { data: 'Both' },
        { data: 'Success' },
        { data: 'Failed' },
    ];
    $scope.filterOptionSelText = "Both";
    $scope.filterSelected = function (INDEX, data) {
        $scope.filterOptionSelText = data;
        if (INDEX == 1) {
            $scope.uploadData = [
                { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'John Miller', status: 'success' },
                { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'David Chills', status: 'success' },
                { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'David Chills', status: 'success' }
            ];
        }
        else if (INDEX == 2) {
            $scope.uploadData = [
               { log: 'download', logText: 'Download', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'Franko Miles', status: 'failed' },
               { log: 'upload', logText: 'Upload', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'John Miller', status: 'failed' },
               { log: 'download', logText: 'Download', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'Franko Miles', status: 'failed' },
            ];
        }
        else if (INDEX == 0) {
            $scope.uploadData = [
              { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'John Miller', status: 'success' },
   { log: 'download', logText: 'Download', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'Franko Miles', status: 'failed' },
   { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'David Chills', status: 'success' },
   { log: 'upload', logText: 'Upload', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'John Miller', status: 'failed' },
   { log: 'download', logText: 'Download', statusText: 'Failed', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'Franko Miles', status: 'failed' },
   { log: 'upload', logText: 'Uploaded', statusText: 'Success', requestFor: 'Export Scorecard Responses', requestTime: '12 Feb 2016 12:30 PM', date: '12 Mar 2016 12:30 PM', createdUploadedby: 'David Chills', status: 'success' }
            ];
        }
    }
    $scope.recurrencepopupData = {
        "selectedrecurOption": {},
        'options': [
        {
            name: "April 2017", "end": 1493490600000, "start": 1490985000000, startdate: 1491762600000, enddate: 1492972200000
        },
        {
            name: "May 2017", "end": 1496082600000, "start": 1493577000000, startdate: 1494354600000, enddate: 1495564200000
        },
        {
            name: "June 2017", "end": 1498761000000, "start": 1496255400000, startdate: 1497033000000, enddate: 1498242600000
        },
        {
            name: "July 2017", "end": 1501353000000, "start": 1498847400000, startdate: 1499625000000, enddate: 1500834600000
        }
        ]
    };


    var recurrenceIndex = 0,
        recurrenceTempIndex = 0;
    $scope.recurrencepopupData.selectedOption = $scope.recurrencepopupData.options[recurrenceIndex];
    $scope.recurrencepopupData.selectedrecurOption = $scope.recurrencepopupData.options[recurrenceIndex];

    $scope.reccurenceCyclePopup = false;
    $scope.selectReccureceCycle = function () {
        $scope.reccurenceCyclePopup = true;
        $scope.recurrencepopupData.selectedOption = $scope.recurrencepopupData.options[recurrenceIndex];

    }

    $scope.saveSelectReccurence = function () {
        recurrenceIndex = recurrenceTempIndex;
        $scope.recurrencepopupData.selectedrecurOption = $scope.recurrencepopupData.options[recurrenceIndex];
        //$scope.recurrencepopupData.selectedOption = $scope.recurrencepopupData.options[recurrenceIndex];

    }


    $scope.hideReccurenceCyclePopup = function () {
        $scope.reccurenceCyclePopup = false;
    }

    $scope.importResponse = false;
    $scope.showImportResponse = function () {
        $scope.importResponse = true;
    }
    $scope.hideImportResponse = function () {
        $scope.importResponse = false;
    };

    $scope.uploadFn = function (data) {
        $scope.hideImportResponse();
    };
    $scope.comment = '';

    $scope.responseTitle = 'COMPARE RESPONSE';

    $scope.connectArr = { 'currentObj': 'question', 'displayCtn': 'questionnaire-section-question-details', 'currentObjCtn': 'questionnaire-section-question', 'scrollOffset': 52, 'closeCnt': false };

    $scope.connectArrNav = { 'currentObj': 'question', 'displayCtn': 'questionnaire-section-question-details', 'currentObjCtn': 'questionnaire-section-question', 'scrollOffset': 52, 'closeCnt': true, 'focusSearchObj': 'questionnaireresponseNav-dropdown-button', 'focusSearchContainer': 'questioncomparerespNavContainer' };


    //popup view repetability 
    $scope.showRepeatabilityPopup = false;
    $scope.rfpopupData = {};
    var rfpopupDataIndex = 0,
        rfpopupDataTempIndex = 0;
    $scope.respondChangeFn = function () {
        rfpopupDataIndex = 0;
    }
    $scope.showRepeatabilityPopupCallback = function (data) {
        $scope.showRepeatabilityPopup = true;

        $scope.rfpopupData.option = angular.copy(data.options);
        $scope.rfpopupData.selectedOption = $scope.rfpopupData.option[rfpopupDataIndex];

    }
    $scope.repeatabilityonChangeItem = function (e) {
        rfpopupDataTempIndex = e;
    }
    $scope.rfpopupDataSave = function (data) {

        $scope.questionnaireDataList.repeatabilityFactortData.selectedOption = data.selectedOption;
        rfpopupDataIndex = rfpopupDataTempIndex;
    }
    $scope.onRepetabilityHideCallback = function () {
        $scope.showRepeatabilityPopup = false;
        $scope.rfpopupData = {};
    }

    $scope.kpiDataTypeOption = {
        "selectiontext": "IT Systems RFP - Site Service Requirements"
    };
    $scope.kpiDataonHidePoup = function (data) {
        console.log(data);
    };
    $scope.loadmoreFn = function (data) {
        data.currentCount = data.respondedDataCount;
    }
    $scope.isArrayCheck = function (data) {
        return angular.isArray(data);
    }
    $scope.supplierDatacount = { count: 0 };
    //left panel accordian
    $scope.showVaribableCall = function (index, isShowVariable) {
        for (var i = 0; i < $scope.questionnaireDataList.kpicomparePanelData.options.length; i++) {
            $scope.questionnaireDataList.kpicomparePanelData.options[i].quesionnaireIsVisible = false;
        }
        $timeout(function () {
            if (!isShowVariable) {
                $scope.questionnaireDataList.kpicomparePanelData.options[index].quesionnaireIsVisible = true;
            }
        })
       
    }
    $scope.indexToShow = { 'child': 0, 'parent': 0 };
    $scope.selectedKPIItem = function (child, parent) {
        setKPIActive(child, parent);
    }
    function setKPIActive(child, parent) {
        $scope.indexToShow.child = child;
        $scope.indexToShow.parent = parent;
    }
    $scope.supplierLineLoaderFlag = {
        message: "Loading",
        center: false,
        plain: true
    };
    $scope.groupLoaderFlag = false;
    $scope.groupLoaderCall = function (child, parent) {
        $scope.selectedKPIItem(child, parent)
        $scope.groupLoaderFlag = true;
        $timeout(function () {
            $scope.groupLoaderFlag = false;
        }, 2000);
    };
    $scope.questionnaireDataList = {
        respondBy: {
            selectedOption: { name: "Both", key: "both" },
            options: [
                { name: "Both", key: "both" },
                { name: "Supplier Contact", key: "supplierCont" },
                { name: "Evaluators", key: "evaluators" }
            ]
        },
        supplierData: {
            selectedOption: [],
            options: [
                { name: 'IBM' },
                { name: 'Dell' },
                { name: 'Lenovo' },
                { name: 'HP' },
                { name: 'Acer' }
            ]
        },
        repeatabilityFactortData: {
            selectedOption: {
                "businessunit": "Consulting",
                "region": "Africa",
                "category": "Logistics"
            },
            options: [
                {
                    "businessunit": "Consulting",
                    "region": "Africa",
                    "category": "Logistics"
                },
                {
                    "businessunit": "Consulting",
                    "region": "Asia",
                    "category": "Logistics"
                },
                {
                    "businessunit": "Architecture",
                    "region": "Africa",
                    "category": "Logistics"
                },
                {
                    "businessunit": "Architecture",
                    "region": "Asia",
                    "category": "Logistics"
                }
            ]
        },
        kpiData: {
            selectedOption: { "name": "IT Systems RFP - Site Service Requirements" },
            options: [
                { "name": "IT Systems RFP - Site Service Requirements" },
                { "name": "IT Systems RFP - Site Service Requirements 2" }
            ]
        },
        kpicomparePanelData: {} ,
        kpicompareData : [] 
    };
   

    $scope.supplierSelectionFn = function (currObj, data) {
        data.options = currObj;
        data.selectedOption = $filter('filter')(currObj, { ischeck: true });
        $scope.hideSelectSupplierQuestionnaire();
        $scope.questionnaireDataList.kpicompareData = [
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Customer Information",
                "description": "",
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "How many customers do you currently supply to?",

                "weight": 3.33,

                "questionResponse": {
                    "config": [{
                        "title": "> 1000",
                        "score": "",
                        "isvalidate": false,
                        "isfocus": false
                    }, {
                        "title": "<= 1000",
                        "score": "",
                        "isvalidate": false,
                        "isfocus": false
                    }],
                    "selected": ""
                },
                "questionType": {
                    name: "Single Response (Drop Down)",
                    type: "single-response-drop",
                    template: "single-response-drop"
                },
                "attachment": {
                    "fileUploadVal": [{
                        "name": "attachment1.xls"
                    },
                    {
                        "name": "attachment2.xls"
                    },
                    {
                        "name": "attachment3.xls"
                    },
                    {
                        "name": "attachment4.xls"
                    }]
                },
                "mandatory": true,
                "nonScoring": true,
                "respondedData": [
                {
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "Den",
                        score: 4.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "MARVIN LEWIS",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "YOGESH",
                        score: 4.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "Dell",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "Den",
                        score: 4.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "MARVIN LEWIS",
                        score: 4,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    },
                    {
                        name: "YOGESH",
                        score: 4.5,
                        questionResponse: {
                            "config": [{
                                "title": "> 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "selected": {
                                "title": "<= 1000",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            }
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "name": "Q1",
                "questionSerialNo": 1
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Company Information",
                "description": "",
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "Please describe any past and planned changes to your business operations including expansions and facility closings.",
                "weight": 3.33,
                "questionType": {
                    "name": "Multiple Lines Text (Formatted)",
                    "type": "multi-text-format",
                    "template": "multi-text-format"
                },
                "questionResponse": {
                    "FormatText": null
                },
                "respondedData": [
                {
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "Dell",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,

                "name": "Q2",
                "questionSerialNo": 2
            },
            {
                "title": "Information required about any and all lawsuits, liens, restraining orders, consent decrees, foreclosures, or other legal/financial actions either now pending, in progress, or which have been brought against the company or any of its officers/principals in the past three years.",

                "weight": 3.33,
                "questionType": {
                    "name": "Multiple Lines Text",
                    "type": "multi-text",
                    "template": "multi-text"
                },
                "questionResponse": {
                    multiText: ""
                },

                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q3",
                "questionSerialNo": 3
            },
            {
                "title": "What are your capabilities for electronic payment and ordering?",

                "weight": 3.33,

                "questionType": {
                    "name": "Multiple Lines Text",
                    "type": "multi-text",
                    "template": "multi-text"
                },
                "questionResponse": {},
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },

                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,

                "name": "Q4",
                "questionSerialNo": 4
            },
            {
                "title": "Do you have any volume limitations? Please specify if any.",
                "weight": 3.33,
                "questionType": {
                    "name": "Multiple Lines Text",
                    "type": "multi-text",
                    "template": "multi-text"
                },
                "questionResponse": {},
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },

                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,

                "name": "Q5",
                "questionSerialNo": 5
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Financial Basics",
                "description": "",
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "What is your D & B Registration #:",
                "weight": 3.33,
                "questionType": {
                    "name": "Single Line Text",
                    "type": "single-text",
                    "template": "single-text"
                },
                "questionResponse": {
                    "singleText": ""
                },
                "respondedData": [{

                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {

                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q6",
                "questionSerialNo": 6
            },
            {
                "title": "Please attach a D&B Report on your Company?",
                "weight": 3.33,
                "questionType": {
                    "name": "Attachment Only",
                    "type": "attachment-only",
                    "template": "attachment-only"
                },
                "questionResponse": {
                    "disable": false,
                    "check": false,
                    "fileUploadVal": []
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "disable": false,
                            "check": false,
                            "fileUploadVal": [
                            {
                                name: "document.pdf"
                            },
                            {
                                name: "document1.pdf"
                            },
                            {
                                name: "document2.pdf"
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,

                "name": "Q7",
                "questionSerialNo": 7
            },
            {
                "title": "What is your approach to managing price volatility?",
                "weight": 3.33,
                "questionType": {
                    "name": "Multiple Lines Text",
                    "type": "multi-text",
                    "template": "multi-text"
                },
                "questionResponse": {},
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,

                "name": "Q8",
                "questionSerialNo": 8
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Delivery",
                "description": "",
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "Can you provide delivery to the following location: Hamilton, MS - 39746 and Green River, WY - 82935?",
                "weight": 3.33,

                "questionType": {
                    "name": "Single Response (Radio Buttons)",
                    "type": "single-response-radio",
                    "template": "single-response-radio"
                },
                "questionResponse": {
                    "selected": "",
                    "config": [{
                        "options": [{
                            "title": "Yes",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }]
                    },
                    {
                        "options": [{
                            "title": "No",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }]
                    }],
                    "radioModel": {
                        "config": [{
                            "title": 0,
                            "disable": true
                        }]
                    }
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }, {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q9",
                "questionSerialNo": 9
            },
            {
                "title": "Which is the nearest Distribution Center to above locations?",
                "weight": 3.33,
                "questionType": {
                    "name": "Multiple Responses (Check Boxes)",
                    "type": "multi-response",
                    "template": "multi-response"
                },
                "questionResponse": [{
                    "check": false,
                    "title": "Hamilton",
                    "score": "",
                    "isvalidate": false,
                    "isfocus": false
                },
                {
                    "check": false,
                    "title": "New York",
                    "score": "",
                    "isvalidate": false,
                    "isfocus": false
                }],
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        "questionResponse": [{
                            "check": true,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": true,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        "questionResponse": [{
                            "check": false,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": true,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        "questionResponse": [{
                            "check": false,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": true,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        "questionResponse": [{
                            "check": false,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": false,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        "questionResponse": [{
                            "check": true,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": true,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        "questionResponse": [{
                            "check": false,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": true,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        "questionResponse": [{
                            "check": false,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": true,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        "questionResponse": [{
                            "check": false,
                            "title": "Hamilton",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "check": false,
                            "title": "New York",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }],
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q10",
                "questionSerialNo": 10
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Company Information",
                "description": "",
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "Company Name",
                "weight": 3.33,
                "questionType": {
                    "name": "Single Line Text",
                    "type": "single-text",
                    "template": "single-text"
                },
                "questionResponse": {},
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q11",
                "questionSerialNo": 11
            },
            {
                "title": "Web Address",
                "weight": 3.33,
                "questionType": {
                    "name": "Single Line Text",
                    "type": "single-text",
                    "template": "single-text"
                },
                "questionResponse": {},
                "respondedData": [{

                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {

                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "singleText": "DB87R122",
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q12",
                "questionSerialNo": 12
            },
            {
                "title": "Company Public or Privately held?",
                "weight": 3.33,
                "questionType": {
                    "name": "Single Response (Radio Buttons)",
                    "type": "single-response-radio",
                    "template": "single-response-radio"
                },
                "questionResponse": {
                    "selected": {},
                    "config": [{
                        "options": [{
                            "title": "Public",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }]
                    },
                    {
                        "options": [{
                            "title": "Private",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }]
                    }],
                    "radioModel": {
                        "config": [{
                            "title": 0,
                            "disable": true
                        }]
                    }
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Public",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Private",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Private",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Private",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Public",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Private",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Private",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Private",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Public",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "Private",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q13",
                "questionSerialNo": 13
            },
            {
                "title": "Year Established?",
                "weight": 3.33,
                "questionType": {
                    "name": "Numeric",
                    "type": "numeric",
                    "template": "numeric"
                },
                "questionResponse": {
                    "formula": "",
                    "value": "",
                    "score": ""
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "value": 400
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "value": 4000
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "value": 300
                        }
                    },
                    {
                        name: "Dell",
                        score: 4.5,
                        questionResponse: {
                            "value": 40000
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "value": 1400
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "value": 14000
                        }
                    },
                    {
                        name: "MARVIN LEWIS",
                        score: 4,
                        questionResponse: {
                            "value": 1300
                        }
                    },
                    {
                        name: "YOGESH",
                        score: 4.5,
                        questionResponse: {
                            "value": 140000
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "value": 400
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "value": 4000
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "value": 300
                        }
                    },
                    {
                        name: "Dell",
                        score: 4.5,
                        questionResponse: {
                            "value": 40000
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "value": 1400
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "value": 14000
                        }
                    },
                    {
                        name: "MARVIN LEWIS",
                        score: 4,
                        questionResponse: {
                            "value": 1300
                        }
                    },
                    {
                        name: "YOGESH",
                        score: 4.5,
                        questionResponse: {
                            "value": 140000
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q14",
                "questionSerialNo": 14
            },
            {
                "title": "Number of Employees?",
                "weight": 3.33,
                "questionType": {
                    "name": "Multi-numeric",
                    "type": "multi-numeric",
                    "template": "multi-numeric"
                },
                "questionResponse": {
                    "formula": "",
                    "value": [{
                        "question": "Employee's age older than 50",
                        "value": "",
                        "isvalidate": false,
                        "isfocus": false
                    }, {
                        "question": "Employee's age less than 50",
                        "value": "",
                        "isvalidate": false,
                        "isfocus": false
                    }],
                    "score": ""
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "90",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "600",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "Dell",
                        score: 4.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "5000",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "MARVIN LEWIS",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "YOGESH",
                        score: 4.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "90",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "600",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "Dell",
                        score: 4.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "5000",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "MARVIN LEWIS",
                        score: 4,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    },
                    {
                        name: "YOGESH",
                        score: 4.5,
                        questionResponse: {
                            "formula": "",
                            "value": [{
                                "question": "Employee's age older than 50",
                                "value": "100",
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "question": "Employee's age less than 50",
                                "value": "500",
                                "isvalidate": false,
                                "isfocus": false
                            }],
                            "score": ""
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q15",
                "questionSerialNo": 15
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Financial Information",
                "description": "",
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "Please provide with your financial Information?",
                "weight": 3.33,
                "questionType": {
                    "name": "Combination Matrix",
                    "type": "grid-type-combination",
                    "template": "grid-type-combination"
                },
                "questionResponse": {
                    "rows": [{
                        "title": "Revenue ($ million)",
                        "isvalidate": false,
                        "isfocus": false,
                        "cols": [{
                            "title": "2012",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "dropdownApplied": false,
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "name": "",
                                    "score": ""
                                }]
                            }
                        },
                        {
                            "title": "2013",
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "score": ""
                                }]
                            },
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "title": "2014",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "score": ""
                                }]
                            }
                        }]
                    },
                    {
                        "title": "Net Income ($ million)",
                        "isvalidate": false,
                        "isfocus": false,
                        "cols": [{
                            "title": "2012",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "dropdownApplied": false,
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "name": "",
                                    "score": ""
                                }]
                            }
                        },
                        {
                            "title": "2013",
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "score": ""
                                }]
                            },
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "title": "2014",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "score": ""
                                }]
                            }
                        }]
                    },
                    {
                        "title": "Total Cash ($ million)",
                        "isvalidate": false,
                        "isfocus": false,
                        "cols": [{
                            "title": "2012",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "dropdownApplied": false,
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "name": "",
                                    "score": ""
                                }]
                            }
                        },
                        {
                            "title": "2013",
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "score": ""
                                }]
                            },
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "title": "2014",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "score": ""
                                }]
                            }
                        }]
                    },
                    {
                        "title": "Total Debt ($ million)",
                        "isvalidate": false,
                        "isfocus": false,
                        "cols": [{
                            "title": "2012",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "dropdownApplied": false,
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "name": "",
                                    "score": ""
                                }]
                            }
                        },
                        {
                            "title": "2013",
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "score": ""
                                }]
                            },
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "title": "2014",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "score": ""
                                }]
                            }
                        }]
                    }],
                    "optionsType": [{
                        "name": "Text field"
                    },
                    {
                        "name": "Radio"
                    },
                    {
                        "name": "Checkbox"
                    },
                    {
                        "name": "Dropdown"
                    }],
                    "cols": [{
                        "title": "2012",
                        "isvalidate": false,
                        "isfocus": false,
                        "type": {
                            "dropdownApplied": false,
                            "SelectedType": {
                                "name": "Text field"
                            },
                            "Textfield": "",
                            "radioOption": {
                                "selectedradioOption": {},
                                "config": [{
                                    "name": ""
                                }]
                            },
                            "config": [{
                                "isvalidate": false,
                                "isfocus": true,
                                "name": "",
                                "score": ""
                            }]
                        }
                    },
                    {
                        "title": "2013",
                        "type": {
                            "SelectedType": {
                                "name": "Text field"
                            },
                            "Textfield": "",
                            "radioOption": {
                                "selectedradioOption": {},
                                "config": [{
                                    "name": ""
                                }]
                            },
                            "config": [{
                                "name": "",
                                "score": ""
                            }]
                        },
                        "isvalidate": false,
                        "isfocus": false
                    },
                    {
                        "title": "2014",
                        "isvalidate": false,
                        "isfocus": false,
                        "type": {
                            "SelectedType": {
                                "name": "Text field"
                            },
                            "Textfield": "",
                            "radioOption": {
                                "selectedradioOption": {},
                                "config": [{
                                    "name": ""
                                }]
                            },
                            "config": [{
                                "name": "",
                                "isvalidate": false,
                                "isfocus": true,
                                "score": ""
                            }]
                        }
                    }]
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "rows": [{
                                "title": "Revenue ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "50000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Net Income ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "2300000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "300000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Cash ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "6000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Debt ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "10000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "75000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }],
                            "optionsType": [{
                                "name": "Text field"
                            }, {
                                "name": "Radio"
                            }, {
                                "name": "Checkbox"
                            }, {
                                "name": "Dropdown"
                            }],
                            "cols": [{
                                "title": "2012",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "dropdownApplied": false,
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "name": "",
                                        "score": ""
                                    }]
                                }
                            }, {
                                "title": "2013",
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "score": ""
                                    }]
                                },
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "2014",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "score": ""
                                    }]
                                }
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "rows": [{
                                "title": "Revenue ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "50000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Net Income ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "2300000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "300000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Cash ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "6000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Debt ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "10000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "75000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }],
                            "optionsType": [{
                                "name": "Text field"
                            }, {
                                "name": "Radio"
                            }, {
                                "name": "Checkbox"
                            }, {
                                "name": "Dropdown"
                            }],
                            "cols": [{
                                "title": "2012",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "dropdownApplied": false,
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "name": "",
                                        "score": ""
                                    }]
                                }
                            }, {
                                "title": "2013",
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "score": ""
                                    }]
                                },
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "2014",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "score": ""
                                    }]
                                }
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "rows": [{
                                "title": "Revenue ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "50000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Net Income ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "2300000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "300000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Cash ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "6000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Debt ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "10000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "75000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }],
                            "optionsType": [{
                                "name": "Text field"
                            }, {
                                "name": "Radio"
                            }, {
                                "name": "Checkbox"
                            }, {
                                "name": "Dropdown"
                            }],
                            "cols": [{
                                "title": "2012",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "dropdownApplied": false,
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "name": "",
                                        "score": ""
                                    }]
                                }
                            }, {
                                "title": "2013",
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "score": ""
                                    }]
                                },
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "2014",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "score": ""
                                    }]
                                }
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "rows": [{
                                "title": "Revenue ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "50000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Net Income ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "2300000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "300000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Cash ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "6000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "400000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Total Debt ($ million)",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "2012",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "1000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2013",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "10000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "2014",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "75000000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }],
                            "optionsType": [{
                                "name": "Text field"
                            }, {
                                "name": "Radio"
                            }, {
                                "name": "Checkbox"
                            }, {
                                "name": "Dropdown"
                            }],
                            "cols": [{
                                "title": "2012",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "dropdownApplied": false,
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "name": "",
                                        "score": ""
                                    }]
                                }
                            }, {
                                "title": "2013",
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "score": ""
                                    }]
                                },
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "2014",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "score": ""
                                    }]
                                }
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q16",
                "questionSerialNo": 16
            },
            {
                "title": "Has your company ever filed for bankruptcy? If yes, explain",
                "weight": 3.33,
                "questionType": {
                    "name": "Multiple Lines Text",
                    "type": "multi-text",
                    "template": "multi-text"
                },
                "questionResponse": {},
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Jonny",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "Bell",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            multiText: "None"
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            multiText: "None"
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q17",
                "questionSerialNo": 17
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Quality",
                "description": "",
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "Please list your company's quality certifications (ISO-9000, ISO-14000, etc.)",
                "weight": 3.33,
                "questionType": {
                    "name": "Combination Matrix",
                    "type": "grid-type-combination",
                    "template": "grid-type-combination"
                },
                "questionResponse": {
                    "rows": [{
                        "title": "Certifications and Awards",
                        "isvalidate": false,
                        "isfocus": false,
                        "cols": [{
                            "title": "1",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "dropdownApplied": false,
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "name": "",
                                    "score": ""
                                }]
                            }
                        },
                        {
                            "title": "2",
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "score": ""
                                }]
                            },
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "title": "3",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "score": ""
                                }]
                            }
                        }]
                    },
                    {
                        "title": "Organization",
                        "isvalidate": false,
                        "isfocus": false,
                        "cols": [{
                            "title": "1",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "dropdownApplied": false,
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "name": "",
                                    "score": ""
                                }]
                            }
                        },
                        {
                            "title": "2",
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "score": ""
                                }]
                            },
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "title": "3",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "score": ""
                                }]
                            }
                        }]
                    },
                    {
                        "title": "Date",
                        "isvalidate": false,
                        "isfocus": false,
                        "cols": [{
                            "title": "1",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "dropdownApplied": false,
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "name": "",
                                    "score": ""
                                }]
                            }
                        },
                        {
                            "title": "2",
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "score": ""
                                }]
                            },
                            "isvalidate": false,
                            "isfocus": false
                        },
                        {
                            "title": "3",
                            "isvalidate": false,
                            "isfocus": false,
                            "type": {
                                "SelectedType": {
                                    "name": "Text field"
                                },
                                "Textfield": "",
                                "radioOption": {
                                    "selectedradioOption": {},
                                    "config": [{
                                        "name": ""
                                    }]
                                },
                                "config": [{
                                    "name": "",
                                    "isvalidate": false,
                                    "isfocus": true,
                                    "score": ""
                                }]
                            }
                        }]
                    }],
                    "optionsType": [{
                        "name": "Text field"
                    },
                    {
                        "name": "Radio"
                    },
                    {
                        "name": "Checkbox"
                    },
                    {
                        "name": "Dropdown"
                    }],
                    "cols": [{
                        "title": "1",
                        "isvalidate": false,
                        "isfocus": false,
                        "type": {
                            "dropdownApplied": false,
                            "SelectedType": {
                                "name": "Text field"
                            },
                            "Textfield": "",
                            "radioOption": {
                                "selectedradioOption": {},
                                "config": [{
                                    "name": ""
                                }]
                            },
                            "config": [{
                                "isvalidate": false,
                                "isfocus": true,
                                "name": "",
                                "score": ""
                            }]
                        }
                    },
                    {
                        "title": "2",
                        "type": {
                            "SelectedType": {
                                "name": "Text field"
                            },
                            "Textfield": "",
                            "radioOption": {
                                "selectedradioOption": {},
                                "config": [{
                                    "name": ""
                                }]
                            },
                            "config": [{
                                "name": "",
                                "score": ""
                            }]
                        },
                        "isvalidate": false,
                        "isfocus": false
                    },
                    {
                        "title": "3",
                        "isvalidate": false,
                        "isfocus": false,
                        "type": {
                            "SelectedType": {
                                "name": "Text field"
                            },
                            "Textfield": "",
                            "radioOption": {
                                "selectedradioOption": {},
                                "config": [{
                                    "name": ""
                                }]
                            },
                            "config": [{
                                "name": "",
                                "isvalidate": false,
                                "isfocus": true,
                                "score": ""
                            }]
                        }
                    }]
                },
                "respondedData": [
                    {
                        supplierName: "IBM",
                        supplierCont: [
                        {
                            name: "Joel",
                            score: 4,
                            questionResponse: {
                                "rows": [{ "title": "a", "isvalidate": false, "isfocus": false, "cols": [{ "title": "zz", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "vvv", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "p", "type": { "SelectedType": { "name": "Radio" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isfocus": false, "isvalidate": false }, { "title": "f", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Dropdown" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "hhh", "isvalidate": false, "isfocus": false, "score": "" }, { "name": "ggg", "score": "", "isfocus": false, "isvalidate": false }], "dropdownApplied": true, "configSelect": { "name": "ggg", "score": "", "isfocus": false, "isvalidate": false } } }, { "title": "c", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Checkbox" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "zz", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "p", "type": { "SelectedType": { "name": "Radio" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isfocus": false, "isvalidate": false }, { "title": "f", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Dropdown" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "hhh", "isvalidate": false, "isfocus": false, "score": "" }, { "name": "ggg", "score": "", "isfocus": false, "isvalidate": false }], "dropdownApplied": true } }, { "title": "c", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Checkbox" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }]
                            }
                        }],
                        evaluators: [
                        {
                            name: "RAHUL YADAV",
                            score: 4,
                            questionResponse: {
                                "rows": [{
                                    "title": "Certifications and Awards",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "cols": [{
                                        "title": "1",
                                        "isvalidate": false,
                                        "isfocus": false,
                                        "type": {
                                            "dropdownApplied": false,
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "ISO-9000",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "isvalidate": false,
                                                "isfocus": true,
                                                "name": "",
                                                "score": ""
                                            }]
                                        }
                                    }, {
                                        "title": "2",
                                        "type": {
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "ISO-14000",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "name": "",
                                                "score": ""
                                            }]
                                        },
                                        "isvalidate": false,
                                        "isfocus": false
                                    }, {
                                        "title": "3",
                                        "isvalidate": false,
                                        "isfocus": false,
                                        "type": {
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "ISO-500",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "name": "",
                                                "isvalidate": false,
                                                "isfocus": true,
                                                "score": ""
                                            }]
                                        }
                                    }]
                                }, {
                                    "title": "Organization",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "cols": [{
                                        "title": "1",
                                        "isvalidate": false,
                                        "isfocus": false,
                                        "type": {
                                            "dropdownApplied": false,
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "Norton",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "isvalidate": false,
                                                "isfocus": true,
                                                "name": "",
                                                "score": ""
                                            }]
                                        }
                                    }, {
                                        "title": "2",
                                        "type": {
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "Horizon",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "name": "",
                                                "score": ""
                                            }]
                                        },
                                        "isvalidate": false,
                                        "isfocus": false
                                    }, {
                                        "title": "3",
                                        "isvalidate": false,
                                        "isfocus": false,
                                        "type": {
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "Sementec",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "name": "",
                                                "isvalidate": false,
                                                "isfocus": true,
                                                "score": ""
                                            }]
                                        }
                                    }]
                                }, {
                                    "title": "Date",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "cols": [{
                                        "title": "1",
                                        "isvalidate": false,
                                        "isfocus": false,
                                        "type": {
                                            "dropdownApplied": false,
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "06-30-2017",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "isvalidate": false,
                                                "isfocus": true,
                                                "name": "",
                                                "score": ""
                                            }]
                                        }
                                    }, {
                                        "title": "2",
                                        "type": {
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "04-23-1999",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "name": "",
                                                "score": ""
                                            }]
                                        },
                                        "isvalidate": false,
                                        "isfocus": false
                                    }, {
                                        "title": "3",
                                        "isvalidate": false,
                                        "isfocus": false,
                                        "type": {
                                            "SelectedType": {
                                                "name": "Text field"
                                            },
                                            "Textfield": "01-22-2002",
                                            "radioOption": {
                                                "selectedradioOption": {},
                                                "config": [{
                                                    "name": ""
                                                }]
                                            },
                                            "config": [{
                                                "name": "",
                                                "isvalidate": false,
                                                "isfocus": true,
                                                "score": ""
                                            }]
                                        }
                                    }]
                                }],
                                "optionsType": [{
                                    "name": "Text field"
                                }, {
                                    "name": "Radio"
                                }, {
                                    "name": "Checkbox"
                                }, {
                                    "name": "Dropdown"
                                }],
                                "cols": [{
                                    "title": "1",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "3",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }
                        }],
                        currentCount: 4,
                        get respondedDataCount() {
                            return countingFn(this);
                        }
                    },
                {
                    supplierName: "DELL",
                    supplierCont: [
                    {
                        name: "Joel",
                        score: 4,
                        questionResponse: {
                            "rows": [{
                                "title": "Certifications and Awards",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "1",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "ISO-9000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "ISO-14000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "3",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "ISO-500",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Organization",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "1",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "Norton",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "Horizon",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "3",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "Sementec",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Date",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "1",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "06-30-2017",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "04-23-1999",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "3",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "01-22-2002",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }],
                            "optionsType": [{
                                "name": "Text field"
                            }, {
                                "name": "Radio"
                            }, {
                                "name": "Checkbox"
                            }, {
                                "name": "Dropdown"
                            }],
                            "cols": [{
                                "title": "1",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "dropdownApplied": false,
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "name": "",
                                        "score": ""
                                    }]
                                }
                            }, {
                                "title": "2",
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "score": ""
                                    }]
                                },
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "3",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "score": ""
                                    }]
                                }
                            }]
                        }
                    }],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "rows": [{
                                "title": "Certifications and Awards",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "1",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "ISO-9000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "ISO-14000",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "3",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "ISO-500",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Organization",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "1",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "Norton",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "Horizon",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "3",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "Sementec",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }, {
                                "title": "Date",
                                "isvalidate": false,
                                "isfocus": false,
                                "cols": [{
                                    "title": "1",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "dropdownApplied": false,
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "06-30-2017",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "name": "",
                                            "score": ""
                                        }]
                                    }
                                }, {
                                    "title": "2",
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "04-23-1999",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "score": ""
                                        }]
                                    },
                                    "isvalidate": false,
                                    "isfocus": false
                                }, {
                                    "title": "3",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "type": {
                                        "SelectedType": {
                                            "name": "Text field"
                                        },
                                        "Textfield": "01-22-2002",
                                        "radioOption": {
                                            "selectedradioOption": {},
                                            "config": [{
                                                "name": ""
                                            }]
                                        },
                                        "config": [{
                                            "name": "",
                                            "isvalidate": false,
                                            "isfocus": true,
                                            "score": ""
                                        }]
                                    }
                                }]
                            }],
                            "optionsType": [{
                                "name": "Text field"
                            }, {
                                "name": "Radio"
                            }, {
                                "name": "Checkbox"
                            }, {
                                "name": "Dropdown"
                            }],
                            "cols": [{
                                "title": "1",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "dropdownApplied": false,
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "name": "",
                                        "score": ""
                                    }]
                                }
                            }, {
                                "title": "2",
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "score": ""
                                    }]
                                },
                                "isvalidate": false,
                                "isfocus": false
                            }, {
                                "title": "3",
                                "isvalidate": false,
                                "isfocus": false,
                                "type": {
                                    "SelectedType": {
                                        "name": "Text field"
                                    },
                                    "Textfield": "",
                                    "radioOption": {
                                        "selectedradioOption": {},
                                        "config": [{
                                            "name": ""
                                        }]
                                    },
                                    "config": [{
                                        "name": "",
                                        "isvalidate": false,
                                        "isfocus": true,
                                        "score": ""
                                    }]
                                }
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q18",
                "questionSerialNo": 18
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Payment Terms",
                "description": "",
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "Payment terms are Net 45 days. Do you comply?",
                "weight": 3.33,
                "questionType": {
                    "name": "Single Response (Radio Buttons)",
                    "type": "single-response-radio",
                    "template": "single-response-radio"
                },
                "questionResponse": {
                    "selected": {},
                    "config": [{
                        "options": [{
                            "title": "Yes",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }]
                    },
                    {
                        "options": [{
                            "title": "No",
                            "score": "",
                            "isvalidate": false,
                            "isfocus": false
                        }]
                    }],
                    "radioModel": {
                        "config": [{
                            "title": 0,
                            "disable": true
                        }]
                    }
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                        {
                            name: "Joel",
                            score: 4,
                            questionResponse: {
                                "selected": {
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                },
                                "config": [{
                                    "options": [{
                                        "title": "Yes",
                                        "score": "",
                                        "isvalidate": false,
                                        "isfocus": false
                                    }]
                                },
                                {
                                    "options": [{
                                        "title": "No",
                                        "score": "",
                                        "isvalidate": false,
                                        "isfocus": false
                                    }]
                                }],
                                "radioModel": {
                                    "config": [{
                                        "title": 0,
                                        "disable": true
                                    }]
                                }
                            }
                        }

                    ],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }],
                            "radioModel": {
                                "config": [{
                                    "title": 0,
                                    "disable": true
                                }]
                            }
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }],
                            "radioModel": {
                                "config": [{
                                    "title": 0,
                                    "disable": true
                                }]
                            }
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                        {
                            name: "Joel",
                            score: 4,
                            questionResponse: {
                                "selected": {
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                },
                                "config": [{
                                    "options": [{
                                        "title": "Yes",
                                        "score": "",
                                        "isvalidate": false,
                                        "isfocus": false
                                    }]
                                },
                                {
                                    "options": [{
                                        "title": "No",
                                        "score": "",
                                        "isvalidate": false,
                                        "isfocus": false
                                    }]
                                }],
                                "radioModel": {
                                    "config": [{
                                        "title": 0,
                                        "disable": true
                                    }]
                                }
                            }
                        }

                    ],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }],
                            "radioModel": {
                                "config": [{
                                    "title": 0,
                                    "disable": true
                                }]
                            }
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        questionResponse: {
                            "selected": {
                                "title": "Yes",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false
                            },
                            "config": [{
                                "options": [{
                                    "title": "Yes",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            },
                            {
                                "options": [{
                                    "title": "No",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false
                                }]
                            }],
                            "radioModel": {
                                "config": [{
                                    "title": 0,
                                    "disable": true
                                }]
                            }
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q19",
                "questionSerialNo": 19
            },
            {
                "questionType": {
                    "name": "label-type",
                    "type": "label-type",
                    "template": "label-type"
                },
                "title": "Additional details",
                "description": "",
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "name": "Label",
                "weight": 3.33,
                "questionSerialNo": "Label"
            },
            {
                "title": "Date and time when your company was incorporated",
                "weight": 3.33,
                "questionType": {
                    "name": "Date/Time",
                    "type": "date-time",
                    "template": "date-time"
                },
                "questionResponse": {
                    "checkdate": true,
                    "date": "",
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                        {
                            name: "Joel",
                            score: 4,
                            "questionResponse": {
                                "checkdate": true,
                                "date": 1497896999000,
                            }
                        }

                    ],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        "questionResponse": {
                            "checkdate": true,
                            "date": 1197826979000,
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        "questionResponse": {
                            "checkdate": true,
                            "date": 1407866999000,
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                        {
                            name: "Joel",
                            score: 4,
                            "questionResponse": {
                                "checkdate": true,
                                "date": 1497896999000,
                            }
                        }

                    ],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        "questionResponse": {
                            "checkdate": true,
                            "date": 1197826979000,
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        "questionResponse": {
                            "checkdate": true,
                            "date": 1407866999000,
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": false,
                "nonScoring": false,
                "name": "Q20",

                "questionSerialNo": 20
            },
            {
                "title": "List the Bank, that you have account",
                "isfocus": false,
                "isvalidate": false,
                "weight": 0,
                "lock": false,
                "questionType": {
                    "name": "Multiple Responses (List Box)",
                    "type": "list-box",
                    "template": "list-box"
                },
                "questionResponse": {
                    "selected": [],
                    "config": [{
                        "title": "HDFC",
                        "score": "",
                        "isvalidate": false,
                        "isfocus": false,
                        "isChecked": false,
                        "optionKey": " HDFC"
                    }, {
                        "title": "AXIS",
                        "score": "",
                        "isvalidate": false,
                        "isfocus": false,
                        "isChecked": false,
                        "optionKey": " AXIS"
                    }, {
                        "title": "YES",
                        "score": "",
                        "isvalidate": false,
                        "isfocus": false,
                        "isChecked": false,
                        "optionKey": " YES"
                    }, {
                        "title": "ICICI",
                        "score": "",
                        "isvalidate": false,
                        "isfocus": false,
                        "isChecked": false,
                        "optionKey": " ICICI"
                    }]
                },
                "respondedData": [{
                    supplierName: "IBM",
                    supplierCont: [
                        {
                            name: "Joel",
                            score: 4,
                            "questionResponse": {
                                "selected": [{
                                    "title": "HDFC",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": true,
                                    "isDisabled": true,
                                    "optionKey": " HDFC"
                                }, {
                                    "title": "AXIS",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": true,
                                    "isDisabled": true,
                                    "optionKey": " AXIS"
                                }],
                                "config": [{
                                    "title": "YES",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": false,
                                    "isDisabled": true,
                                    "optionKey": " YES"
                                }, {
                                    "title": "ICICI",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": false,
                                    "isDisabled": true,
                                    "optionKey": " ICICI"
                                }]
                            }
                        }

                    ],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        "questionResponse": {
                            "selected": [{
                                "title": "HDFC",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " HDFC"
                            }, {
                                "title": "AXIS",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " AXIS"
                            }],
                            "config": [{
                                "title": "YES",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " YES"
                            }, {
                                "title": "ICICI",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " ICICI"
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        "questionResponse": {
                            "selected": [{
                                "title": "HDFC",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " HDFC"
                            }, {
                                "title": "AXIS",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " AXIS"
                            }],
                            "config": [{
                                "title": "YES",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " YES"
                            }, {
                                "title": "ICICI",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " ICICI"
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                },
                {
                    supplierName: "DELL",
                    supplierCont: [
                        {
                            name: "Joel",
                            score: 4,
                            "questionResponse": {
                                "selected": [{
                                    "title": "HDFC",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": true,
                                    "isDisabled": true,
                                    "optionKey": " HDFC"
                                }, {
                                    "title": "AXIS",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": true,
                                    "isDisabled": true,
                                    "optionKey": " AXIS"
                                }],
                                "config": [{
                                    "title": "YES",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": false,
                                    "isDisabled": true,
                                    "optionKey": " YES"
                                }, {
                                    "title": "ICICI",
                                    "score": "",
                                    "isvalidate": false,
                                    "isfocus": false,
                                    "isChecked": false,
                                    "isDisabled": true,
                                    "optionKey": " ICICI"
                                }]
                            }
                        }

                    ],
                    evaluators: [
                    {
                        name: "RAHUL YADAV",
                        score: 4,
                        "questionResponse": {
                            "selected": [{
                                "title": "HDFC",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " HDFC"
                            }, {
                                "title": "AXIS",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " AXIS"
                            }],
                            "config": [{
                                "title": "YES",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " YES"
                            }, {
                                "title": "ICICI",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " ICICI"
                            }]
                        }
                    },
                    {
                        name: "KUENZANG",
                        score: 3.5,
                        "questionResponse": {
                            "selected": [{
                                "title": "HDFC",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " HDFC"
                            }, {
                                "title": "AXIS",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": true,
                                "isDisabled": true,
                                "optionKey": " AXIS"
                            }],
                            "config": [{
                                "title": "YES",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " YES"
                            }, {
                                "title": "ICICI",
                                "score": "",
                                "isvalidate": false,
                                "isfocus": false,
                                "isChecked": false,
                                "isDisabled": true,
                                "optionKey": " ICICI"
                            }]
                        }
                    }],
                    currentCount: 4,
                    get respondedDataCount() {
                        return countingFn(this);
                    }
                }],
                "conditional": {
                    "check": false,
                    "conditionalData": [],
                    "questionattachedTo": -2
                },
                "conditionalQuestion": {
                    "selectedquestionResponse": null,
                    "selectedquestionType": null
                },
                "attachment": {},
                "mandatory": true,
                "nonScoring": false,
                "name": "Q21"
            }]
        if ($state.params.pageFor == 'form') {
            $scope.compareForm = true;
            $scope.questionnaireDataList.kpicomparePanelData = {
                selectedOption: {},
                options: [{
                    'name': 'GROUP 1',
                    'quesionnaireIsVisible': true,
                    'options': [{ 'name': 'Questionnaire 1', 'questionnaireData': '' }, { 'name': 'Questionnaire 2', 'questionnaireData': '' }, { 'name': 'Questionnaire 3', 'questionnaireData': '' }, { 'name': 'Questionnaire 4', 'questionnaireData': '' }, { 'name': 'Questionnaire 5', 'questionnaireData': '' }]
                }, {
                    'name': 'GROUP 2',
                    'quesionnaireIsVisible': false,
                    'options': [{ 'name': 'Questionnaire 1', 'questionnaireData': '' }, { 'name': 'Questionnaire 2', 'questionnaireData': '' }, { 'name': 'Questionnaire 3', 'questionnaireData': '' }, { 'name': 'Questionnaire 4', 'questionnaireData': '' }, { 'name': 'Questionnaire 5', 'questionnaireData': '' }]
                }, {
                    'name': 'GROUP 3',
                    'quesionnaireIsVisible': false,
                    'options': [{ 'name': 'Questionnaire 1', 'questionnaireData': '' }, { 'name': 'Questionnaire 2', 'questionnaireData': '' }, { 'name': 'Questionnaire 3', 'questionnaireData': '' }, { 'name': 'Questionnaire 4', 'questionnaireData': '' }, { 'name': 'Questionnaire 5', 'questionnaireData': '' }]
                }, {
                    'name': 'GROUP 4',
                    'quesionnaireIsVisible': false,
                    'options': [{ 'name': 'Questionnaire 1', 'questionnaireData': '' }, { 'name': 'Questionnaire 2', 'questionnaireData': '' }, { 'name': 'Questionnaire 3', 'questionnaireData': '' }, { 'name': 'Questionnaire 4', 'questionnaireData': '' }, { 'name': 'Questionnaire 5', 'questionnaireData': '' }]
                }]
            }

        }
        $scope.groupLoaderFlag = true;
        $timeout(function () {
            $scope.groupLoaderFlag = false;
        }, 2000);
    };

    //$scope.descriptionToggle = true;
    function countingFn(d) {
        if ($scope.questionnaireDataList.respondBy.selectedOption.key === 'both') return d.supplierCont.length + d.evaluators.length;
        if ($scope.questionnaireDataList.respondBy.selectedOption.key === 'supplier') return d.supplierCont.length;
        if ($scope.questionnaireDataList.respondBy.selectedOption.key === 'evaluators') return d.evaluators.length;
    }
    $scope.descriptionToggleFn = function (data) {
        data.descriptionToggle = !data.descriptionToggle;
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

    // Start: Select supplier popup starts
    $scope.columnSearchKey = { title: "" };
    $scope.showMe = false;
    $scope.showSearchM = function () {
        $scope.isActiveM = true;
        $scope.showMeM = true;
        $scope.hideCloseM = true;
        $scope.focusSearchM = true;
    };
    $scope.hideSearchM = function () {
        $scope.isActiveM = false;
        $scope.focusSearchM = false;
        $scope.hideCloseM = false;
    };

    $timeout(function () {
        $scope.showSelectSupplierQ = true;
    });

    $scope.selectSupplierData = angular.copy($scope.questionnaireDataList.supplierData.options);
    $scope.activeBtnFlag = false;

    $scope.showSelectSupplierQuestionnaire = function (e) {
        $scope.selectSupplierData = angular.copy($scope.questionnaireDataList.supplierData.options);
        $scope.showSelectSupplierQ = true;
        $timeout(function () {
            $scope.showSearchM();
        }, 500);
    };
    $scope.hideSelectSupplierQuestionnaire = function (e) {

        $scope.columnSearchKey.title = "";
        $scope.hideSearchM();
        $scope.showSelectSupplierQ = false;
    };

    $scope.checkedAllCheck = function (checkdata, data, fillpartial, count) {

        fillpartial.ischeck = false;
        for (var i = 0; i < data.length; i++) {
            data[i].ischeck = checkdata;
        }
        $scope.activeBtnFlag = checkdata;

        if (count) {
            count.count = checkdata ? (data.length) : 0;
        }
    };
    $scope.onChangecontentList = function (checkHead, data, fillpartial, count) {
        var counter = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].ischeck == true) {
                counter++;
            }
        }
        fillpartial.ischeck = true;
        if (counter === 0) {
            fillpartial.ischeck = false;
            checkHead.ischeck = false;
        } else if (counter === data.length) {
            fillpartial.ischeck = false;
            checkHead.ischeck = true;
        } else {
            fillpartial.ischeck = true;
            checkHead.ischeck = true;
        }
        if (counter > 1) {
            $scope.activeBtnFlag = true;
        } else {
            $scope.activeBtnFlag = false;
        }
        if (count) {
            count.count = counter;
        }
    };
    $scope.backToScoreard = function () {
        $state.go('supplier.scorecard', { mode: 'savedDraft', finalized: 'true' });
    }
    $scope.fillpartialcontentList = { "ischeck": false };
    $scope.fillpartialcontentListCR = { "ischeck": false };
    $scope.selectSupplierDataHeadCR = { "check": false };
    $scope.selectSupplierDataHead = { "check": false };


    $timeout(function () {
        $scope.showSearchM();
    }, 500);

    $scope.showPreviewPopupFlag = false;
    $scope.questionItem = {}
    $scope.showQuestionPreview = function (que, index) {

        $scope.questionItem = angular.copy(que);
        $scope.questionItem.preview = true;

        $scope.showPreviewPopupFlag = true;
    }
    $scope.showPreviewOnHideCallback = function (e) {
        $scope.showPreviewPopupFlag = false;
    }

    // Start: Select scorer search
    //$scope.focusSearch = false;
    //$scope.isActive = false;
    //$scope.showMe = false;
    //$scope.showSearch = function () {
    //    $scope.isActive = true;
    //    $scope.focusSearch = true;
    //    $scope.showMe = true;
    //    $scope.hideClose = true;
    //}

    //$scope.hideSearch = function () {
    //    $scope.isActive = false;
    //    $scope.focusSearch = false;
    //    $scope.hideClose = false;
    //}
    // Start: Select scorer search
};
})(angular);