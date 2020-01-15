(function (angular) {
    'use strict';
    angular.module('SMART2')
	.controller('PPSTCtrl', ['$scope', '$state', '$http', '$rootScope', 'routeSvc', 'scrollPosition', 'PPSTService', '$timeout', '$parse', 'trackStatusService', 'notification', '$filter', ppstFn])
    .controller('SavingsImpCtrl', ['$scope', '$http', '$filter', 'PPSTService', savingsImpCtrlFn])
	.controller('multiChoiceCtrl', ['$scope', '$http', 'PPSTService', 'notification', 'notificationService', multiChoiceCtrlFn])
    .controller('groupFieldCtrl', ['$scope', '$timeout', groupFieldCtrlFunc])
    .controller('attachmentSectionCtrl', ['$scope', '$http', 'notification', '$notification', 'PPSTService', '$timeout', attachmentSectionCtrlFunc])
    .controller('teamMemberCtrlProj', ['$scope', '$http', 'notification', '$notification', '$filter', 'PPSTService', '$timeout', '$state', 'storeService', 'dbFactory', teamMemberCtrlProjFunc])
    .controller('supplierCtrlProj', ['$scope', '$timeout', '$http', '$state', 'notification', 'storeService', 'dbFactory', '$sce', '$filter', 'PPSTService', supplierCtrlProjFunc])
    .controller('auditLogsCtrl', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$location', '$timeout', auditLogsCtrlFunc]);


    // Controller function
    function ppstFn($scope, $state, $http, $rootScope, routeSvc, scrollPosition, PPSTService, $timeout, $parse, trackStatusService, notification, $filter) {

        $scope.mode = $state.params.mode;

        $scope.goTO = function (phase) {
            
            if (phase == "estimated") {
                $state.go('projects.savingProject', { mode: "estimated" });
            }
            else if (phase == "negotiated") {
                $state.go('projects.savingProject', { mode: "negotiated" });
            }
            else if (phase == "realized") {
                $state.go('projects.savingProject', { mode: "realized" });
            }
        }
        
        $scope.gotoSection = function (a_section, sectionIndex, ev) {
            // 300 is the top value which I want to subtract from scrolltop
            vm.formConfigData.sections.forEach(function (section) {
                if (section.id === a_section) {
                    section.isActive = true;
                }
            });
            PPSTService.scrollToSection(1, sectionIndex, 300, ev); // scroll to a particular section, 1 is formwidget num
        };
        $scope.CopiedFrom = "Project ABC";
        $scope.copiesData = [
            { "projectName": "Lorem Ipsum 1", "projectUrl": "" },
            { "projectName": "Lorem Ipsum 2", "projectUrl": "" },
            { "projectName": "Lorem Ipsum 3", "projectUrl": "" }
        ];
        
        $scope.projectSearchData = {
            "searchProjectKey": "",
            "isActive": false,
            "focusSearchProjects": false
        };
        $scope.viewCopies = function () {
            $scope.copiesPopup = true;
        };
        
        $scope.showSearch = function () {
            $scope.projectSearchData.isActive = true;
            $scope.projectSearchData.focusSearchProjects = true;
            $scope.showMe = true;
            $scope.hideClose = true;
        };

        $scope.hideSearch = function () {
            $scope.projectSearchData.isActive = false;
            $scope.projectSearchData.focusSearchProjects = false;
            $scope.hideClose = false;
            $scope.IsHidden = true;
            $scope.IsMessage = false;
        };

        $scope.copiesPopupOnHideCallback = function (e) {
            $scope.copiesPopup = false;
            $scope.hideSearch();
        };
        
        $scope.openProject = function () {
            var url = $state.href('projects.new', { parameter: "parameter" });
            window.open(url, '_blank');
        };

        //Change Ownership
        $scope.changeOwnerText = { "attachNotesDesp": "" };

        $scope.oldHide = function () {
            $scope.showChangeHistory = false;
        }

        $scope.oldShow = function (e) {
            if (e.btnType == "save") {
                $scope.showChangeHistory = true;
            }
            if (e.result.name) {
                $scope.appDisAddOwner = true;
            }
            else {
                $scope.appDisAddOwner = false;
            }
        }

        $scope.changeHistoryUrl = "shared/popup/views/popupChangeOwnerHistory.html";
        $scope.changHistoryPopup = function (e) {
            $scope.checkPrivilege = true;
            $scope.readMore = true;
            $scope.appDisAddOwner = false;
            $scope.showChangeHistory = true;
            $scope.changeOwnerText = { "attachNotesDesp": "" };
            $scope.changeOwnerText.selectedchangeHistory = "";

        };
        $scope.changeHistoryCallback = function (e) {
            $scope.showChangeHistory = false;
            $scope.changeOwnerText = { "attachNotesDesp": "" };
            $scope.readMore = true;
        };

        $scope.changeHistoryOptions = [
            {
                "name": "Carissa Madden",
                "check": false
            },
                  {
                      "name": "Dotson Palmer",
                      "check": false
                  },
                  {
                      "name": "Meyer Lloyd",
                      "check": false
                  },
                  {
                      "name": "Flossie Ochoa",
                      "check": false
                  },
                  {
                      "name": "Leah Moses",
                      "check": false
                  },
                  {
                      "name": "Ferguson Osborn",
                      "check": false
                  },
                  {
                      "name": "Peck Patterson",
                      "check": false
                  },
                  {
                      "name": "Gay Payne",
                      "check": false
                  },
                  {
                      "name": "Katie Hebert",
                      "check": false
                  },
                  {
                      "name": "Bryan Shannon",
                      "check": false
                  },
                  {
                      "name": "Skinner Farmer",
                      "check": false
                  },
                  {
                      "name": "Mckay Mcneil",
                      "check": false
                  },
                  {
                      "name": "Lila Horne",
                      "check": false
                  },
                  {
                      "name": "Ethel Powell",
                      "check": false
                  },
                  {
                      "name": "Spears Lott",
                      "check": false
                  },
                  {
                      "name": "Nannie Ryan",
                      "check": false
                  },
                  {
                      "name": "Joy Ware",
                      "check": false
                  },
                  {
                      "name": "Shaffer Mcfadden",
                      "check": false
                  },
                  {
                      "name": "Audrey Pena",
                      "check": false
                  },
                  {
                      "name": "Helga Macdonald",
                      "check": false
                  }
        ];

        // Show less show more
        $scope.readMore = false;

        $scope.showLess = function (item) {

            item.readMore = false;

        }
        $scope.showMore = function (item) {
            item.readMore = true;
        }





        $scope.changeOwnerText = {
            selectedchangeHistory: {},
            attachNotesDesp: ""
        };
        $scope.changingOwnership = function () {
            Materialize.toast("Owner changed Successfully.", 3500);
            if ($scope.changeownership !== "") {
                $scope.isOwershipHistoryData = true;
            }
            else {
                $scope.isOwershipHistoryData = false;
            }

            $scope.addownerChangeHistoryData($scope.changeOwnerText.attachNotesDesp, $scope.changeOwnerText.selectedchangeHistory);
            $scope.changeOwnerText.attachNotesDesp = '';
            $scope.changeOwnerText.selectedchangeHistory = {};

        }
        $scope.addownerChangeHistoryData = function (description, changeHistoryObj) {
            var d = new Date,
                dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':');
            var changingData = { "owner": "Gep User", "changedBy": changeHistoryObj.name, "changedOn": dformat, "comment": description };
            $scope.changeownership.push(changingData);
        }
        $scope.changeownership = [];
        //scrollPosition.setEnableScroll(true);
        //Set the opt fields to mandatory while changing phase

        $scope.summaryPanelState = function (state) {
            if (state == "collapsed")
                $scope.panelState = "collapsed";
            else
                $scope.panelState = "expanded";
        }

        $scope.topPanelError = function () {
            makeMandatory();
            onPhaseChange();
        }

        //Copy Project Start Here.
        $scope.showCopyProject = false;
        $scope.copyProjectUrl = "project/ppst/views/popupCopyProject.html";
        $scope.copyProject = function (e) {
            $scope.showCopyProject = true;
           
        };
        $scope.changeCopyProject = function (e) {
            $scope.showCopyProject = false;
        };

        $scope.showViewLog = function () {
            $scope.showLogPopup = true;
            $scope.logsLoader = true;
            $timeout(function () {
                $scope.logsLoader = false;
            }, 2000);
        };
        $scope.logOnHideCallback = function (e) {
            $scope.showLogPopup = false;
        }
        $scope.logsLoaderConfig = {
            plain: true,
            message: "Loading",
            center: true,
            left: "50%"
        };
        
        $scope.getTabChange = function() {
            $scope.logsLoader = true;
            $timeout(function () {
                $scope.logsLoader = false;
            }, 2000);
        };
        $scope.projectLogsTabData = [
	        {
	            "title": "Copies Created",
	            "contentUrl": "copies.html",
	            "active": true
	        },
            {
                "title": "Pricelist Import/Export",
                "contentUrl": "pricelist.html"
            },
            {
                "title": "Compliance Report",
                "contentUrl": "compliance.html"
            }
        ];
        $scope.uploadData = [
            { log: 'download', logText: 'Download', statusText: 'In progress', failed: "35", total: "663", documentName: '-', level: 'Pricesheet', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
            { log: 'upload', logText: 'Uploaded', statusText: 'In progress', failed: "3", total: "365", documentName: '-', level: 'Questionnaire', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
            { log: 'upload', logText: 'Uploaded', statusText: 'In progress', failed: "0", total: "43", documentName: '-', level: 'Event', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
		    { log: 'upload', logText: 'Uploaded', statusText: 'Success', failed: "0", total: "34", documentName: 'Product Specification.docx', level: 'Document', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
		    { log: 'upload', logText: 'Uploaded', statusText: 'Failed', failed: "6", total: "658", documentName: 'Specification.docx', level: 'Document', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'failed' },
		    { log: 'upload', logText: 'Uploaded', statusText: 'Failed', failed: "65", total: "636", documentName: 'Attachment.docx', level: 'Pricesheet', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'failed' },
		    { log: 'upload', logText: 'Uploaded', statusText: 'Success', failed: "0", total: "3673", documentName: 'Document.docx', level: 'Event', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
		    { log: 'download', logText: 'Downloaded', statusText: 'Success', failed: "0", total: "758", documentName: 'Product.docx', level: 'Questionnaire', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
        ];

        $scope.projectOptions = [{ "name": "Ideation" }, { "name": "Execution" }, { "name": "Realization" }]
        $scope.po = { "projectOptions": false };
        $scope.project = {};

        $scope.project.name = "PPST NEW";
        $scope.project.projectOption = "Ideation";
        $scope.project.date = "/Date(1507852800000)/";

        var getPOData = { "name": "", "date": "", "projectOption": ""};
        $scope.isDisabled = true;
        
        $scope.projectDone = function (data) {
            if ($scope.project.name == "" || $scope.project.date == "" || $scope.project.projectOption == "") {
                $scope.name = false;
                $scope.date = false;
                $scope.po.projectOption = false;
            }

            else {
                $scope.showCopyProject = false;
                var createOb = {
                    type: "inform",
                    message: "A copy of this project is being created and might take a while. You may click View Logs later for more information on this.",
                    buttons: [
                        {
                            title: "OK",
                            result: "ok"
                        }]
                };
                notification.notify(createOb);
            }
         }
       
        // Show team members section expanded when coming back after adding mem
        function teamMemExp() {
            var isFromTeamMem = PPSTService.getAddingTeamMem();
            if (isFromTeamMem) {
                // Expand 
                $scope.expandASection('team-members-section', 7);
                PPSTService.setAddingTeamMem(false);
            }
        }

        // Show suppliers section expanded when coming back after adding mem
        function supplierExpanded() {
            var isFromSupplier = PPSTService.getAddingSupplier();
            if (isFromSupplier) {
                // Expand 
                $scope.expandASection('suppliers-section', 8);
                PPSTService.setAddingSupplier(false);
            }
        }

        function onPhaseChange() {
            //$scope.primaryBtnConfig = { "title": "Withdraw Approval", "allignRight": "false", "click" : "withdrawAppr()"};
            $scope.showInfoBarProject = true;
            $scope.isPrjStatusChange = false;
            $scope.projectCurrentStatus = "Approval Pending";
        }
        $scope.withdrawAppr = function () {
            console.log("Withdraw approval");
        }
        // project current status
        $scope.projectCurrentStatus = "Draft";
        $scope.onErrorFound = {
            "error": false,
            "isWarningHeader": false,
            "isSavedClicked": false,
            "noMoreErrors": false
        };
        $scope.showSummaryPanel = false;
        $scope.commentStatusActive = false;
        // Focus and expand a specific section
        $scope.expandASection = function (a_section, sectionIndex) {
            vm.formConfigData.sections.forEach(function (section) {
                if (section.id === a_section) {
                    section.isActive = true;
                }
            });
            $scope.$broadcast("sectionFocus", { "id": a_section });

        }
        //comments popup----start
        //Select comments Popup
        var CommentPopupType;
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
        $scope.commentsPopupgTabUrl = "shared/popup/views/commentsPopupTab.html";
        $scope.showCommentsPopupTab = false;
        $scope.showCommentsPopupTabCallback = function (e) {
            $scope.showCommentsPopupTab = true;
        };
        $scope.commentsPopupOnHideTabCallback = function (e) {
            $scope.showCommentsPopupTab = false;
            $scope.attPopUp = true;
            $scope.commentStatusActive = true;
        };
        $scope.tooltip = "Attachment 1" + "\n" + "Attachment 2" + "\n" + "Attachment 3" + "\n" + "Attachment 4" + "\n" + "Attachment 5";
        $scope.customStyle = {
            "textAlign": "left",
        };
        //commnets popup----end
        // Start: Pagination handler
        $scope.currentPage = 1;

        $scope.pageChangeHandler = function (num) {
            $scope.currentPage = num;
        };
        $scope.rowsToShowOpts = {
            availableOptions: [
              {
                  size: 2
              },
              { size: 4 }
            ],
            selectedOption: {
                size: 2
            }
        };
        // End:

        var vm = this;
        // Get form widget config data and bind on model
        PPSTService.getFormConfigData()
        .then(function (respData) {
            vm.formConfigData = respData.formConfig;
            $scope.formConfigData = respData.formConfig;
            vm.frmModelData = respData.modelData;
            setTimeout(function () {
                teamMemExp();
                supplierExpanded();
            }, 3000);
        })
        .catch(function (errResp) { });
        $scope.selectedProjectCurrency = "";
        $scope.onChangeCurrency = function () {
            $scope.selectedProjectCurrency = vm.frmModelData.ProjectCurrency.code + " ";
        }

        //SHOW HIDE ADDITIONAL FIELDS
        $scope.showFields = function () {
            var showFields = vm.formConfigData.sections[4].rows[0].properties[4];

            if (vm.frmModelData.prSegRiskScore == "2") {
                //alert("THIS IS IT");
                showFields.isVisible = true;
            } else {
                showFields.isVisible = false;
            };
        };
        //ENDS SHOW HIDE ADDITIONAL FIELDS

        //Is error counter available[TODO - Uncomment]

        //$scope.$watch('onErrorFound.isSavedClicked', function (newValue, oldValue) {
        //    if (newValue !== oldValue) {
        //        // Red the sec nav
        //        if($scope.onErrorFound.noMoreErrors) {
        //            chngStatusNBtn();
        //            Materialize.toast("Project created.", 3500);
        //            $scope.showSummaryPanel = true;
        //        }
        //        checkSecNavError(newValue);
        //    }
        //}, true);

        // If no error change the project status and add new buttons
        function chngStatusNBtn() {
            $scope.projectCurrentStatus = "Approval Required";
            $scope.showInfoBarProject = true;
            makeMandatory();
        }
        // To make optional fields mandatory
        var ideationMandat = [ // Fields id , which are to be converted to mandatory in ideation phase
	            'timelines-executionEndDate',
                'applicable_for-region',
                'timelines-relizationStartMonth',
                'timelines-relizationPeriod'
        ];

        function makeMandatory() {
            var tmpFrmData = vm.formConfigData.sections,
                len = tmpFrmData.length;
            for (var indx = 0; indx < len; indx++) {
                var tmpObj = tmpFrmData[indx];
                if (tmpObj.hasOwnProperty('rows')) {
                    for (var count = 0; count < tmpObj.rows.length; count++) {
                        // Loop to get all properties with isMandatory
                        for (var pC = 0; pC < tmpObj.rows[count].properties.length; pC++) {
                            var tObj = tmpObj.rows[count].properties[pC];
                            if (ideationMandat.indexOf(tObj.id) >= 0) {
                                tObj.isMandatory = true;
                            }
                        }
                    }
                }
            }
        }

        $scope.isSentForAppr = false; // To show hide send for approval btn.
        $scope.dynamicNgClick = function (fnExp) {
            $parse(fnExp)($scope);
        }
        $scope.primaryBtnConfig = { "title": "Send For Approval", "allignRight": "false", "click": "sendForApproval()" };
        $scope.isPrjStatusChange = false;
        $scope.showInfoBarProject = false;
        $scope.sendForApproval = function () {
            $scope.isPrjStatusChange = true;
            $scope.showInfoBarProject = false;
            //$scope.primaryBtnConfig = { "title": "Withdraw Approval", "allignRight": "false", "click": "withdrawAppr()" };
            $scope.projectCurrentStatus = "Approval Pending";
            $scope.isSentForAppr = true;
        }
        $scope.closeInfoBar = function () {
            $scope.showInfoBarProject = false;
        }

        $scope.closeErrorHeader = function () {
            $scope.isPrjStatusChange = false;
            //$scope.showInfoBarProject = false;
        }
        // To check sec nav error
        function checkSecNavError(isTrue) {
            var tmpFrmData = vm.formConfigData.sections,
                len = tmpFrmData.length,
                isActiveLocal = false,
                array = [];
            for (var indx = 0; indx < len; indx++) {
                var tmpObj = tmpFrmData[indx];
                if (tmpObj.hasOwnProperty('rows')) {
                    isActiveLocal = false;
                    for (var count = 0; count < tmpObj.rows.length; count++) {
                        // Loop to get all properties with isMandatory
                        for (var pC = 0; pC < tmpObj.rows[count].properties.length; pC++) {
                            var tObj = tmpObj.rows[count].properties[pC];
                            if (tObj.isMandatory === true) {
                                if (tObj.validate === true && !isActiveLocal) {
                                    isActiveLocal = true;
                                    tmpObj['isActive'] = true;
                                    if (tmpObj.hasOwnProperty('mandatoryFieldStatus')) {
                                        tmpObj.mandatoryFieldStatus['isvalidate'] = isTrue;
                                    }
                                    //$scope.formConfigData.sections[indx] = tmpObj;
                                    break;
                                }
                                if (isActiveLocal === true)
                                    break;
                            }
                        }
                    }
                }
                //array.push(tmpObj);
            }
            //$timeout(function () {
            //    vm.formConfigData.sections = JSON.parse(JSON.stringify(array));
            //    console.log('vm.formConfigData.sections', vm.formConfigData.sections);
            //}, 2000);

        }

    //Save project
        $scope.isSaved = false; // Project is saved or not
        vm.saveProject = function () {
            saveShowHiddenSec();
            chngStatusNBtn();
            Materialize.toast("Project created.", 3500);
            $scope.showSummaryPanel = true;
            $scope.isSaved = true;
            
            $scope.onErrorFound.isWarningHeader = true;
            $scope.onErrorFound.error = true;
        }
        // TO show hide the hidden sections
        function saveShowHiddenSec() {
            //$scope.showSummaryPanel = true;
            var tmpFrmData = vm.formConfigData.sections,
                len = tmpFrmData.length,
                showHideSections = ["milestones", "linked_documents", "attachments", "suppliers-section", "team-members-section"];
            for (var indx = 0; indx < len; indx++) {
                var tmpObj = tmpFrmData[indx];
                if (tmpObj.id === "timelines") { // To show project created on in timeline section
                    tmpObj = showCreatedOn(tmpObj);
                }
                if (showHideSections.indexOf(tmpObj.id) >= 0) {
                    tmpObj["isVisible"] = true;
                    vm.formConfigData.sections[indx] = tmpObj;
                }
                chkValidate(tmpObj, false);

            }
            // For error count on top yellow band[TODO - Uncomment]
            //$timeout(function () {
            //    $scope.onErrorFound.error = !$scope.onErrorFound.error;
            //}, 200);

        }

        function chkValidate(tmpObj, checkErrSecNav, isTrue) {
            // get the rows
            if (tmpObj.hasOwnProperty('rows')) {
                for (var count = 0; count < tmpObj.rows.length; count++) {
                    // Loop to get all properties with isMandatory
                    for (var pC = 0; pC < tmpObj.rows[count].properties.length; pC++) {
                        var tObj = tmpObj.rows[count].properties[pC];
                        if (tObj.isMandatory === true) {
                            if (tObj.hasOwnProperty('attributes') && tObj.hasOwnProperty('readonly') || tObj.type === 'subsection') {
                                tObj.validate = false;
                            } else {
                                tObj.validate = true;
                            }
                        }
                    }
                }
            }
        }

        function showCreatedOn(a_timelineData) {
            var originalData = a_timelineData,
	            properties = originalData.rows[0].properties,
	            elemIdToShow = ["projCreatedOn"],
                len = properties.length,
                returnItem = false;
            for (var indx = 0; indx < len; indx++) {
                var tmpObj2 = properties[indx];
                if (tmpObj2.id === "projCreatedOn") {
                    tmpObj2["isVisible"] = true;
                    properties[indx] = tmpObj2;
                    returnItem = properties;
                    break;
                }
            }
            vm.frmModelData.prCreatedOn = new Date();
            return returnItem;
        }
        // Add milestone section
        // Track status code
        // Open track status
        $scope.trackStatusPopup = false;
        $scope.showTrackStatus = function () {
            $scope.trackStatusPopup = true;
            loadTrackstatusData();
        }
        $scope.trackStatusOnHideCallback = function () {
            $scope.trackStatusPopup = false;
        }        
        $scope.tabClickCallback1 = function (tab) {
            var tabs = $scope.statusListData.trackStatusTabs;
            for (var indx = 0; indx < tabs.length; indx++) {
                var tData = tabs[indx];
                if (tab.id == tData.id) {
                    tData.active = true;
                } else {
                    tData.active = false;
                }
            }
            trackStatusService.dataChange();
        }      
        // Load track status data
        function loadTrackstatusData() {
            var path = [{ url: 'project/trackStatus/trackStatusData.json', method: "GET" }];
            PPSTService.getJSONData(path).then(function (response) {
                $scope.statusListData = response[0].data; // data for track status
                //$scope.loaderFlag = false;
                trackStatusService.dataChange();
                //trackStatusService.getChange();
            }).catch(function (err) {
                console.error("error fecthing tracj status data");
            });
        }
        //loadTrackstatusData();
}

    // Savings and Impact controller
    function savingsImpCtrlFn($scope, $http, $filter, PPSTService) {
        $scope.savingsPopup = false;
        $scope.selectedSavingsFlag = false;
        $scope.savingsSubtype = "";
        $scope.selectSavings = function () {
            $scope.savingsPopup = true;
        }
        $scope.savingsPopupOnHideCallback = function (e) {
            $scope.savingsPopup = false;
        };
        $scope.savingsImpactData = PPSTService.savingsImpactData;
        $scope.savingsImpactDataColumns = PPSTService.savingsImpactDataColumns;
        var selectedSavings = 0, selectedSavingsType;
        $scope.selectedSavings = $scope.selectedSavingsCount = selectedSavings;
        $scope.selectedSavingsList = [];
        $scope.updateOtfm = function (index, value) {
            $scope.savingsImpactData[index].otfmValue = value;
            selectedSavingsType = $scope.savingsImpactData[index].title;
            var foundItem = $filter('filter')($scope.selectedSavingsList, { title: $scope.savingsImpactData[index].title }, true)[0];

            if (value) {
                if ($scope.selectedSavingsList.indexOf(foundItem) < 0)
                    $scope.selectedSavingsList.push($scope.savingsImpactData[index]);
                selectedSavings++;
                if ($scope.savingsImpactData[index].recurringValue) {
                    selectedSavings--;
                    $scope.savingsImpactData[index].recurringValue = false;
                }
            }
            else {
                $scope.itemIndex = $scope.selectedSavingsList.indexOf(foundItem);
                $scope.selectedSavingsList.splice($scope.itemIndex, 1);
                selectedSavings--;
            }
            if (selectedSavings == 1)
                $scope.savingsSubtype = " (One Time - First Month)";
            else
                $scope.savingsSubtype = "";
            $scope.selectedSavingsCount = selectedSavings;
        }
        $scope.updateOtlm = function (index, value) {
            $scope.savingsImpactData[index].otlmValue = value;
            selectedSavingsType = $scope.savingsImpactData[index].title;
            var foundItem = $filter('filter')($scope.selectedSavingsList, { title: $scope.savingsImpactData[index].title }, true)[0];
            if (value) {
                if ($scope.selectedSavingsList.indexOf(foundItem) < 0)
                    $scope.selectedSavingsList.push($scope.savingsImpactData[index]);
                selectedSavings++;
            }
            else {
                $scope.itemIndex = $scope.selectedSavingsList.indexOf(foundItem);
                $scope.selectedSavingsList.splice($scope.itemIndex, 1);
                selectedSavings--;
            }
            if (selectedSavings == 1)
                $scope.savingsSubtype = " (One Time - Last Month)";
            else
                $scope.savingsSubtype = "";
            $scope.selectedSavingsCount = selectedSavings;
        }
        $scope.updateRecurring = function (index, value) {
            $scope.savingsImpactData[index].recurringValue = value;
            selectedSavingsType = $scope.savingsImpactData[index].title;
            var foundItem = $filter('filter')($scope.selectedSavingsList, { title: $scope.savingsImpactData[index].title }, true)[0];
            if (value) {
                if ($scope.selectedSavingsList.indexOf(foundItem) < 0)
                    $scope.selectedSavingsList.push($scope.savingsImpactData[index]);
                selectedSavings++;
                if ($scope.savingsImpactData[index].otfmValue) {
                    $scope.savingsImpactData[index].otfmValue = false;
                    selectedSavings--;
                }
            }
            else {
                $scope.itemIndex = $scope.selectedSavingsList.indexOf(foundItem);
                $scope.selectedSavingsList.splice($scope.itemIndex, 1);
                selectedSavings--;
            }
            if (selectedSavings == 1)
                $scope.savingsSubtype = " (Recurring)";
            else
                $scope.savingsSubtype = "";
            $scope.selectedSavingsCount = selectedSavings;
        }
        $scope.doneCallBack = function () {
            if (selectedSavings > 0) {
                $scope.selectedSavingsFlag = true;
                $scope.selectedSavings = selectedSavings;
                $scope.selectedSavingsType = selectedSavingsType;
            }
            $scope.savingsPopup = false;
        }
    }

    //MULTICHOICE FIELDS - ADDITIONAL FIELDS
    function multiChoiceCtrlFn($scope, $http, PPSTService, notification, notificationService) {
        $scope.typeOptions = [
            {
                "UserId": 28360,
                "UserName": "SRUser1@outlook.com",
                "FirstName": "GEP Pvt.Ltd.",
                "LastName": ""
            }, {
                "UserId": 28978,
                "UserName": "SRUser1@outlook.com234",
                "FirstName": "NB Ventures Inc",
                "LastName": ""
            }, {
                "UserId": 28979,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Novasera Ltd",
                "LastName": ""
            }, {
                "UserId": 28980,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "GEP Pvt.Ltd.",
                "LastName": ""
            }, {
                "UserId": 28981,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "NB Ventures Inc",
                "LastName": ""
            }, {
                "UserId": 28982,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Novasera Ltd",
                "LastName": ""
            }, {
                "UserId": 28983,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "GEP Pvt.Ltd.",
                "LastName": ""
            }, {
                "UserId": 28984,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "NB Ventures Inc",
                "LastName": ""
            }, {
                "UserId": 28985,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Novasera Ltd",
                "LastName": ""
            }
        ];


        $scope.typeOptions1 = [
            {
                "UserId": 28360,
                "UserName": "SRUser1@outlook.com",
                "FirstName": "Evertek",
                "LastName": ""
            }, {
                "UserId": 28977,
                "UserName": "SRUser1@outlook.com11",
                "FirstName": "Cap Supplier 2",
                "LastName": ""
            }, {
                "UserId": 28978,
                "UserName": "SRUser1@outlook.com234",
                "FirstName": "APL Supplier 3",
                "LastName": "Chi"
            }, {
                "UserId": 28979,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "WG Supp1",
                "LastName": ""
            }, {
                "UserId": 28980,
                "UserName": "SRUser1@outlook.com342",
                "FirstName": "Abhishek",
                "LastName": "Kadam"
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

        //SAVINGS TYPE AND IMPACT
        $scope.savingsPopup = false;
        $scope.selectedSavingsFlag = false;
        $scope.selectSavings_AF = function () {
            $scope.savingsPopup = true;
        }
        $scope.savingsPopupOnHideCallback = function (e) {
            $scope.savingsPopup = false;
        };
        $scope.savingsImpactData_AF = PPSTService.savingsImpactData_AF;
        $scope.selectedSavings = 0;
        $scope.updateOtfm = function (index, value) {
            $scope.savingsImpactData_AF[index].otfmValue = value;
            if (value) {
                $scope.selectedSavings++;
                if ($scope.savingsImpactData_AF[index].recurringValue) {
                    $scope.selectedSavings--;
                    $scope.savingsImpactData_AF[index].recurringValue = false;
                }
            }
            else {
                $scope.selectedSavings--;
            }
        }
        $scope.updateOtlm = function (index, value) {
            $scope.savingsImpactData_AF[index].otlmValue = value;
            if (value)
                $scope.selectedSavings++;
            else
                $scope.selectedSavings--;
        }
        $scope.updateRecurring = function (index, value) {
            $scope.savingsImpactData_AF[index].recurringValue = value;
            if (value) {
                $scope.selectedSavings++;
                if ($scope.savingsImpactData_AF[index].otfmValue) {
                    $scope.savingsImpactData_AF[index].otfmValue = false;
                    $scope.selectedSavings--;
                }
            }
            else {
                $scope.selectedSavings--;
            }
        }
        $scope.doneCallBack = function () {
            if ($scope.selectedSavings > 0) {
                $scope.selectedSavingsFlag = true;
            }
            $scope.savingsPopup = false;
        }


        /* Supplier Business Info */
        $scope.typeSelectCurrency = [{ "name": "US Dollar (USD)" }, { "name": "Euro (EUR)" }, { "name": "British Pound (GBP)" }, { "name": "Andorran Franc (ADF)" }, { "name": "Utd. Arab Emir.Dirham. (AED)" }, { "name": "NL Antillian Guilder (ANG)" }, { "name": "Chinese Yuan Renminbi (CNY)" }, { "name": "Indian Rupee (INR)" }];


    }

    //GROUP FIELDS - OPEX/CAPEX - ADDITIONAL FIELDS
    function groupFieldCtrlFunc($scope, $timeout) {
        $scope.opexCapexValues = {
            "opexVal" : { "value" : null, "validateFlag": false},
            "capexVal": { "value" : null, "validateFlag": false}
        };

        $scope.opexValidTestVal = "100";
        $scope.capexValidTestVal = "100";

        $scope.opexcapexRules = {
            "opexRule" :[{
                            "rule": "this == null",
                            "error": "You must enter a value for the attribute"
                        }],
            "capexRule" :[{
                            "rule": "this == null",
                            "error": "You must enter a value for the attribute"
                        }]
        };

        $scope.onChangeOpexCallback = function(){
            $scope.opexCapexValues.opexVal.validateFlag = false;
            $timeout(function(){
                if($scope.opexCapexValues.opexVal.value == null) {
                    $scope.opexCapexValues.opexVal.validateFlag = true;
                }
                else if($scope.opexCapexValues.opexVal.value == 100){
                    $scope.opexCapexValues.capexVal.value = 0;
                    $scope.opexCapexValues.opexVal.validateFlag = false;
                    $scope.opexCapexValues.capexVal.validateFlag = false;
                }
                else {
                    $scope.opexCapexValues.opexVal.validateFlag = false;
                    $scope.capexValidTestVal = 100 - parseInt($scope.opexCapexValues.opexVal.value);
                    $scope.capexValidTestVal = $scope.capexValidTestVal.toString();
                    $scope.opexValidTestVal = $scope.opexCapexValues.opexVal.value;
                    if($scope.opexcapexRules.capexRule.length === 1)
                        $scope.opexcapexRules.capexRule.push({rule: "this && this != " + $scope.capexValidTestVal, error: " "});
                    else
                        $scope.opexcapexRules.capexRule[1] = {rule: "this && this != " + $scope.capexValidTestVal, error: " "};
                }
            });
        }

        $scope.onChangeCapexCallback = function(){
            $scope.opexCapexValues.capexVal.validateFlag = false;
            $timeout(function(){
                if($scope.opexCapexValues.capexVal.value == null) {
                    $scope.opexCapexValues.capexVal.validateFlag = true;
                }
                else if($scope.opexCapexValues.capexVal.value == 100){
                    $scope.opexCapexValues.opexVal.value = 0;
                    $scope.opexCapexValues.opexVal.validateFlag = false;
                    $scope.opexCapexValues.capexVal.validateFlag = false;
                }
                else {
                    $scope.opexCapexValues.capexVal.validateFlag = false;
                    $scope.opexValidTestVal = 100 - parseInt($scope.opexCapexValues.capexVal.value);
                    $scope.opexValidTestVal = $scope.opexValidTestVal.toString();
                    $scope.capexValidTestVal = $scope.opexCapexValues.capexVal.value;
                    if($scope.opexcapexRules.opexRule.length === 1)
                        $scope.opexcapexRules.opexRule.push({rule: "this && this != " + $scope.opexValidTestVal, error: " "});
                    else
                        $scope.opexcapexRules.opexRule[1] = {rule: "this && this != " + $scope.opexValidTestVal, error: " "};
                }
            });
        }
    }
    //END OF GROUP FIELDS - OPEX/CAPEX - ADDITIONAL FIELDS

    //ATTACHMENTS
    function attachmentSectionCtrlFunc($scope, $http, notification, $notification, PPSTService, $timeout, $state) {
        //Pagination
        $scope.rowsToShowOpts = [
        { 'size': '5' },
        { 'size': '10' }];

        $scope.parentScope.attachments = 0;

        $scope.selectedOption = $scope.rowsToShowOpts[0];

        $scope.attachmentAdded = false;

        $scope.addAttachmentComplete = function () {
            $scope.attachmentAdded = true;
        }
        $scope.attachAction = function(){
            $scope.attachmentAdded = true;
            $scope.parentScope.documentCount = 5;


        }

        $scope.attachments = [
             {
                 name: "File_ABC.pdf",
                 fileSize: "18 KB",
                 uploadDate: "12 April 2016",
                 uploadTime: "10:45:57 PM",
                 createdBy: "Johnny Walker",
                 sharedWith: "Calvin Shawn",
                 isChecked: false
             },
             {
                 name: "xyz.xls",
                 fileSize: "18 KB",
                 uploadDate: "12 April 2016",
                 uploadTime: "10:45:57 PM",
                 createdBy: "Johnny Walker",
                 sharedWith: "Calvin Shawn",
                 isChecked: false
             },
             {
                 name: "Name_of_the_attached_file.pdf",
                 fileSize: "18 KB",
                 uploadDate: "12 April 2016",
                 uploadTime: "10:45:57 PM",
                 createdBy: "Johnny Walker",
                 sharedWith: "Calvin Shawn",
                 isChecked: false
             },
             {
                 name: "Name_of_theattached_file.docx",
                 fileSize: "18 KB",
                 uploadDate: "12 April 2016",
                 uploadTime: "10:45:57 PM",
                 createdBy: "Johnny Walker",
                 sharedWith: "Calvin Shawn",
                 isChecked: false
             },
             {
                 name: "Name of the attachments file",
                 fileSize: "18 KB",
                 uploadDate: "12 April 2016",
                 uploadTime: "10:45:57 PM",
                 createdBy: "Johnny Walker",
                 sharedWith: "Calvin Shawn",
                 isChecked: false
             }
        ];

        $scope.parentScope.documentCount = 0;
        //$scope.poonam = 'a';
        $scope.totalAttachments = $scope.attachments.length;
        //setTimeout(function () { $scope.poonam = 'b' }, 1000);
        $scope.hideDownloadTemplate = true;
        $scope.showUploadPopup = false;
        $scope.adduploadContractCallback = function () {
            $scope.uploadTitle = "ADD ATTACHMENTS";
            $scope.showUploadPopup = true;


        }
        $scope.hideUploadContractPopupCallback = function () {
            //alert($scope.totalAttachments);	        
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
        $scope.attachmentSelected = false;
        var countAttachList = 0;
        $scope.attachListChange = function (check) {
            var attachmentlength = $scope.attachments.length,
			    incre;
            //countAttachList = 0;

            for (var i = 0; i < attachmentlength; i++) {
                if ($scope.attachments[i].isChecked == true) {
                    countAttachList++;
                }
            }

            $scope.fillpartial = true;
            if (countAttachList === 0) {
                $scope.fillpartial = false;
                $scope.selectAllAttach.checkedAll = false;
                $scope.attachmentSelected = false;
            }
            else if (countAttachList === attachmentlength) {
                $scope.fillpartial = false;
                $scope.selectAllAttach.checkedAll = true;
                $scope.attachmentSelected = true;
            }
            else {
                $scope.fillpartial = true;
            }
        };

        //DELETE LIST
        $scope.deleteAttachments = function () {


            if (countAttachList != 0) {
                //alert("YES - " + countAttachList);

                var confi = {
                    type: "confirm",
                    message: "<p class='left-align'>Are you sure you want to delete selected attachments?</p>",
                    //checkMessage: "Notify over Email",
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
                notification.notify(confi, function (responce) {
                    if (response.result == 'yes') {
                        var pricesheetlength = $scope.attachments.length,
                            incre, checkCounter = 0,
                            deletedPricesheets = [];
                        for (incre = 0; incre < pricesheetlength; incre++) {
                            if ($scope.attachments[incre].check) {
                                dbFactory.removeByIndex('pricesheet', 'title_idx', $scope.attachments[incre].title);
                                var deletedPricesheet = $scope.attachments.splice(incre, 1);
                                deletedPricesheets.push(deletedPricesheet);
                                pricesheetlength--; incre--;
                            }
                        }
                        checkErrorPricesheetCount();
                        if ($scope.allErrorPricesheetSelected && $scope.pricesheetHead.check && !$scope.fillpartial) {
                            $scope.pricesheetList = pricsheetWithoutError;

                        }
                        $scope.pricesheetHead.check = false;
                        $scope.fillpartial = false;
                        $scope.pricesheetSelected = false;
                        storeService.set('pricesheetCount', $scope.attachments.length);
                        if (deletedPricesheets.length > 1)
                            deletedPricesheetsTxt = deletedPricesheets[0][0].title + ' +' + (deletedPricesheets.length - 1) + ' more have';
                        else if (deletedPricesheets.length == 1)
                            deletedPricesheetsTxt = deletedPricesheets[0][0].title + ' has';
                        Materialize.toast(deletedPricesheetsTxt + " been deleted.", 3500);
                        $scope.toggleSelectAll = true;

                    }
                });

            };




            /*alert("HI");
	        if ($scope.attachmentSelected) {

	            notification.notify(pricesheetDeleteConfirmation, function (response) {
	                if (response.result == 'yes') {
	                    var pricesheetlength = $scope.attachments.length,
                            incre, checkCounter = 0,
                            deletedPricesheets = [];
	                    for (incre = 0; incre < pricesheetlength; incre++) {
	                        if ($scope.attachments[incre].check) {
	                            dbFactory.removeByIndex('pricesheet', 'title_idx', $scope.attachments[incre].title);
	                            var deletedPricesheet = $scope.attachments.splice(incre, 1);
	                            deletedPricesheets.push(deletedPricesheet);
	                            pricesheetlength--; incre--;
	                        }
	                    }
	                    checkErrorPricesheetCount();
	                    if ($scope.allErrorPricesheetSelected && $scope.pricesheetHead.check && !$scope.fillpartial) {
	                        $scope.pricesheetList = pricsheetWithoutError;

	                    }
	                    $scope.pricesheetHead.check = false;
	                    $scope.fillpartial = false;
	                    $scope.pricesheetSelected = false;
	                    storeService.set('pricesheetCount', $scope.attachments.length);
	                    if (deletedPricesheets.length > 1)
	                        deletedPricesheetsTxt = deletedPricesheets[0][0].title + ' +' + (deletedPricesheets.length - 1) + ' more have';
	                    else if (deletedPricesheets.length == 1)
	                        deletedPricesheetsTxt = deletedPricesheets[0][0].title + ' has';
	                    Materialize.toast(deletedPricesheetsTxt + " been deleted.", 3500);
	                    $scope.toggleSelectAll = true;

	                }
	            });
	        }


	        if ($scope.attachments[i].isChecked == true) {
	            var index = $scope.attachments[i].indexOf(item)
	            $scope.attachments.splice(index, 1);
	        }*/

        };
    }

    //TEAM MEMBERS
    function teamMemberCtrlProjFunc($scope, $http, notification, $notification, $filter, PPSTService, $timeout, $state, storeService, dbFactory) {
        $scope.teamMemberData = false;

        $scope.mode = $state.params.mode;
        $scope.addTeamMemberFromRepoCall = function () {
            //$state.go('sourcing.rfx.addTeamMember');
            if ($state.params.view == 'supplier') {
                $state.go('projects.addTeamMember', { view: "supplier" });
            }
            else if ($scope.mode == "supervisorActive") {
                $state.go('projects.addTeamMember', { view: "supTeamMember" });
            }
            else if ($scope.mode == "supervisorInProgress") {
                $state.go('projects.addTeamMember', { view: "supProgressTeamMember" });
            }
            else {
                $state.go('projects.addTeamMember');
            }
        }
        $scope.comeBackCallToRfx = function () {
            if ($state.params.view == 'supplier') {
                $state.go('projects.new', { view: "supplier" });
            }
            else {
                $scope.expandASection('team-members-section', 7);
                $state.go('projects.new');
            }
        };
        $scope.changeSupplierLookupCall = function () {
            $scope.changePrimaryContactPopup = false;
        }
        $scope.changeSupplierLookupHideCall = function () {
            $scope.changePrimaryContactPopup = true;
        }
        $scope.selectedChangedSupplier = [];
        $scope.typeOptions = [
                {
                    "UserId": 28360,
                    "UserName": "SRUser1@outlook.com",
                    "FirstName": "Evertek",
                    "LastName": ""
                }, {
                    "UserId": 28977,
                    "UserName": "SRUser1@outlook.com11",
                    "FirstName": "Cap Supplier 2",
                    "LastName": ""
                }, {
                    "UserId": 28978,
                    "UserName": "SRUser1@outlook.com234",
                    "FirstName": "APL Supplier 3",
                    "LastName": "Chi"
                }, {
                    "UserId": 28979,
                    "UserName": "SRUser1@outlook.com342",
                    "FirstName": "WG Supp1",
                    "LastName": ""
                }, {
                    "UserId": 28980,
                    "UserName": "SRUser1@outlook.com342",
                    "FirstName": "Abhishek",
                    "LastName": "Kadam"
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

        // Start: Data initselectedSupplierName
        $scope.selectedTab = 1;
        $scope.rowsToShowOpts = [
                { 'size': '5' },
                { 'size': '10' }];

        $scope.selectedOption = { 'size': '5' };

        $scope.eventData = [
		{
		    "id": "pricesheets",
		    "name": "Price Sheets",
		    "list": ['IT Hardware', 'IT Services', 'IT Software']
		},
		{
		    "id": "questionnaires",
		    "name": "Questionnaires",
		    "list": ['Company Information', 'Quality and Security Certification', 'Training', 'Management of Health, Safety and Environment']
		},
		{
		    "id": "guidelines",
		    "name": "Guidelines",
		    "list": ['About the Company', 'General Information', 'Payment Terms', 'Submission Instruction', 'Non Disclosure Aggrement']
		}
        ];
        $scope.eventOpts = [{ "title": "Events (All)" }, { "title": "Pricesheet" }, { "title": "Guidelines" }, {
            "title": "Questionnaire"
        }];
        $scope.selectedEventOpt = {
            title: "Events (All)"
        };
        // End: Data init

        // Start: Load more team members
        $scope.totalDisplayed = 10;
        $scope.loadMore = function () {
            $scope.totalDisplayed += 7;
        };
        // End: Load more team members

        // Start: Tabs config
        $scope.configureTabsData = [{
            "id": "coauthoring",
            "title": 'CO-AUTHORING',
            "active": true
        }, {
            "id": "scoring",
            "title": 'SCORING',
        }];

        $scope.configureTabsCallback = function (tab) {
            if (tab.id == "coauthoring")
                $scope.configureList = coAuthorList;
            else
                $scope.configureList = evaluatorList;
        };

        var supplierTabsData = [{
            "title": 'COLLABORATION STATUS',
            "active": true
        }];

        $scope.teamMemberFilterTabData = [
            {
                "id": "category", "title": "Category", "active": true
            },
            {
                "id": "businessUnit", "title": "Business Unit"
            },
            {
                "id": "region", "title": "Region"
            }
        ];

        // Start: Scroll config
        $scope.configureTeamMemberScrollRight = {
            'vSource': 'configure-chkTbl',
            'hSource': 'configure-chkTbl',
            'vertical': 'configure-eventTbl',
            'horizontal': 'configure-chkHdrTblWrap'
        };
        $scope.configureTeamMemberScrollLeft = {
            'vSource': 'configure-eventTbl',
            'hSource': 'configure-chkTbl',
            'vertical': 'configure-chkTbl',
            'horizontal': 'configure-chkHdrTblWrap'
        };
        // End: Scroll config

        // Start: Search in subheader
        $scope.showSearchHeader = function () {
            this.isActiveHeader = true;
            this.focusSearchHeader = true;
            this.hideCloseHeader = true;
        };
        $scope.hideSearchHeader = function () {
            this.isActiveHeader = false;
            this.focusSearchHeader = false;
            this.hideCloseHeader = false;
        };
        // End: Search in subheader

        // Start: Configure Modes
        var mode = $state.params.mode,
            viewMode = $state.params.view;

        $scope.configureScrollOffset = "350px";
        $scope.configureTeamMemberHdr = "CONFIGURE TEAM MEMBER";

        if (viewMode == "supplier") {
            $scope.supplierView = true;
            $scope.tabsData = supplierTabsData;
            $scope.configureScrollOffset = "302px";
            $scope.eventData = [
                {
                    'id': 'pricesheets', 'name': 'Price Sheet'
                },
                { 'id': 'questionnaires', 'name': 'Questionnaire' }
            ];
            if (mode == "status") {
                $scope.configureTeamMemberHdr = "VIEW COLLABORATION STATUS";
            }
        }
        else if (viewMode == "buyerPreview")
            $scope.buyerPreview = true;
        else if (viewMode == "supplierPreview") {
            $scope.supplierView = true;
            $scope.supplierPreview = true;
        }

        if (mode == "configure") {
            $scope.configureMode = true;
        }
        else {
            $scope.statusMode = true;
            $scope.configureTeamMemberHdr = "VIEW TEAM MEMBER STATUS";
        }
        // End: Configure Modes


        // Start: Expand/Collapse on configure page
        $scope.collapsed = false;
        $scope.expandCollapseSections = function (id) {
            if (id == 'pricesheets')
                $scope.pricesheets = !$scope.pricesheets;
            else if (id == 'questionnaires')
                $scope.questionnaires = !$scope.questionnaires;
            else if (id == 'guidelines')
                $scope.guidelines = !$scope.guidelines;
        };
        // End: Expand/Collapse on configure page


        // Start: Save view popup
        $scope.saveViewPopup = false;
        $scope.saveViewPopupCallback = function () {
            $scope.saveViewPopup = true
        };
        $scope.saveViewPopupHideCallback = function () {
            $scope.saveViewPopup = false
        };
        $scope.applyCurrentFilter = function (e) {
            if ($scope.isSavedView == true)
                $scope.isSavedViewModified = true;
            else
                $scope.isApplyFilters = true;
            $scope.toggleFilter(e);
        };

        $scope.roleOptions = [];
        $scope.roleOptions = [
            { "name": "LASEC", "isChecked": false, "disable": false },
            { "name": "Components Engineer", "isChecked": false, "disable": false },
            { "name": "Reliability/SQE", "isChecked": false },
            { "name": "Platform Engineer", "isChecked": false },
            { "name": "PMO", "isChecked": false }
        ];

        //Sheet Popup Open ng-click function
        $scope.currentIndex = "";
        $scope.listIndex = "";
        $scope.roleSelectedPopup = false;
        $scope.showteamRolePopup = function (index, teamMemberID ) {
            $scope.allSheetSlct = true;
            $scope.currentIndex = index;
           // $scope.currentMemberId = teamMemberID;
            var currentObj = _.find($scope.teamMemberList, { 'teamMemberId' : teamMemberID});
            $scope.listIndex = $scope.teamMemberList.indexOf(currentObj);
            $scope.roleSelectedPopup = true;
            for (var i = 0; i < $scope.teamMemberList[$scope.listIndex].finalselectedRole.length; i++) {
                for (var j = 0; j < $scope.roleOptions.length; j++) {
                    if ($scope.roleOptions[j].name == $scope.teamMemberList[$scope.listIndex].finalselectedRole[i].name) {
                        $scope.roleOptions[j].isChecked = true;
                        break;
                    } 
                }
            }
            // if($scope.teamMemberList[$scope.listIndex].finalselectedRole.length == 0){
               
            // }
        }

        $scope.projectRolePopuponHide = function () {
            $scope.roleSelectedPopup = false;
            for (var k = 0; k < $scope.roleOptions.length; k++){
                $scope.roleOptions[k].isChecked = false;
            }
        };

   //Role Popup on-change function start
   $scope.roleSelectedPop = [];
   $scope.allSheetSlct = true;
   $scope.sheetVariancePop = [];
   $scope.sheetChecked = function (arg) { 
       var checkSheetCount = 0;
       for (var i = 0; i < $scope.roleOptions.length; i++) {
           if ($scope.roleOptions[i].isChecked) {
               checkSheetCount++;
           }
       }
       if (checkSheetCount > 0) {
           $scope.allSheetSlct = false;
       } else {
           $scope.allSheetSlct = true;
       }
       if ($scope.roleOptions[arg].isChecked) {
        $scope.teamMemberList[$scope.listIndex].selectedTableRole.push($scope.roleOptions[arg]);
       }
       else if (!$scope.roleOptions[arg].isChecked){                
           for (var i = 0; i < $scope.teamMemberList[$scope.listIndex].selectedTableRole.length; i++) {
               if ($scope.roleOptions[arg].name == $scope.teamMemberList[$scope.listIndex].selectedTableRole[i].name) {
                $scope.teamMemberList[$scope.listIndex].selectedTableRole.splice(i, 1);
               }
           }
       }
      // $scope.roleSelectedData = $scope.teamMemberList[$scope.listIndex].selectedTableRole;

   };

   // Role Popup done function
   $scope.roleDoneCallBack = function () {
    $scope.roleSelectedPopup = false;
    var roleValueSelected = '';
   $scope.sheetvariPopData = true;
   $scope.teamMemberList[$scope.listIndex].finalselectedRole = Object.assign([],$scope.teamMemberList[$scope.listIndex].selectedTableRole);

   if (  $scope.teamMemberList[$scope.listIndex].finalselectedRole.length > 1) {
    roleValueSelected = $scope.teamMemberList[$scope.listIndex].finalselectedRole[0].name + " "+ "+" + ($scope.teamMemberList[$scope.listIndex].finalselectedRole.length - 1) + ' More';
   }
   else if ( $scope.teamMemberList[$scope.listIndex].finalselectedRole.length == 1) {
    roleValueSelected = $scope.teamMemberList[$scope.listIndex].finalselectedRole[0].name;
   }

   $scope.teamMemberList[$scope.listIndex].roletitle = roleValueSelected;

  // $scope.sheetVariancePop = angular.copy($scope.roleSelectedData);
  for (var k = 0; k < $scope.roleOptions.length; k++){
    $scope.roleOptions[k].isChecked = false;
}

};

   $scope.sheetvariPopData = false;
   //Role Popup Cancel
   $scope.roleCancelBack = function () {
       
       if (!$scope.sheetvariPopData) {
           $scope.sheetVariancePop = [];
           $scope.sheetSelectedPop = [];
       }
  
    //    for (var i = 0; i < $scope.teamMemberList[$scope.listIndex].finalselectedRole.length; i++) {
    //        for (var j = 0; j < $scope.roleOptions.length; j++) {
    //            if ($scope.roleOptions[j].name == $scope.teamMemberList[$scope.listIndex].finalselectedRole[i].name) {
    //                $scope.roleOptions[j].isChecked = true;
    //                break;
    //            }
    //        }
    //    }
    for (var k = 0; k < $scope.roleOptions.length; k++){
        $scope.roleOptions[k].isChecked = false;
    }
       $scope.teamMemberList[$scope.listIndex].selectedTableRole = $scope.teamMemberList[$scope.listIndex].finalselectedRole;
   
       $scope.roleSelectedPopup = false;
   }


        // Start: Multiselect for team members list
        $scope.teamMemberHead = {
            'check': false
        };

        $scope.onChangeTeamMember = function (arg) {
            var teamMemberlength = $scope.teamMemberList.length,
                incre;
            $scope.fillpartialTeamMember = false;
            $scope.teamMemberSelected = false;
            for (incre = 0; incre < teamMemberlength; incre++) {
                $scope.teamMemberList[incre].check = arg;
            }
            if (arg)
                $scope.teamMemberSelected = true;
            //alert($scope.teamMemberMasterList);
        };

        $scope.teamMemberListChange = function (arg) {

            var teamMemberlength = $scope.teamMemberList.length,
                incre,
                checkCounter = 0;
            for (incre = 0; incre < teamMemberlength; incre++) {
                if ($scope.teamMemberList[incre].check)
                    checkCounter++;
            }
            $scope.fillpartialTeamMember = false;
            $scope.teamMemberSelected = true;
            if (checkCounter === 0) {
                $scope.teamMemberHead.check = false;
                $scope.teamMemberSelected = false;
            }
            else if (checkCounter === teamMemberlength -1)
                $scope.teamMemberHead.check = true;
            else
                $scope.fillpartialTeamMember = true;
        };

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


        $scope.sortIcon = {
            'icon': 'icon_Sort'
        };
        $scope.sortIcon1 = {
            'icon': 'icon_Sort'
        };
        $scope.typeSortIcon = {
            'icon': 'icon_Sort'
        };
        $scope.typeSortIconTooltip = "Sort"
        $scope.ascDescToggler = function (data) {
            if (data.icon == 'icon_Sort') {
                data.icon = 'icon_SortAscending';
                $scope.typeSortIconTooltip = "Ascending"
            }
            else if (data.icon == 'icon_SortAscending') {
                data.icon = 'icon_SortDescending';
                $scope.typeSortIconTooltip = "Descending";
            }
            else {
                $scope.typeSortIconTooltip = "Sort";
                data.icon = 'icon_Sort';
            }

        };
        // End: Sort events

        // Start: Filter - Invitation Status
        $scope.invitationStatusFilter = {
            'invited': false, 'notInvited': false
        };
        $scope.invitationStatusFilterCallback = function () {
            if ($scope.invitationStatusFilter.invited && !$scope.invitationStatusFilter.notInvited)
                $scope.teamMemberList = $filter('filter')($scope.teamMemberList, {
                    'invitedOn': true
                });
            else if (!$scope.invitationStatusFilter.invited && $scope.invitationStatusFilter.notInvited)
                $scope.teamMemberList = $filter('filter')($scope.teamMemberList, {
                    'invitedOn': false
                });
            else
                $scope.teamMemberList = teamMemberListReset;
        };
        // End: Filter - Invitation Status

        // Start: Primary contact popup
        $scope.changePrimaryContactPopup = false;
        $scope.changePrimaryContactPopupCallback = function () {
            $scope.changePrimaryContactPopup = true;
        };
        $scope.changePrimaryContactPopupHideCallback = function () {
            $scope.changePrimaryContactPopup = false;
        };
        // Start: Primary contact popup


        // Start: Saved view popup
        $scope.savedViewPopup = false;
        $scope.savedViewPopupCallback = function () {
            $scope.savedViewPopup = true
        };
        $scope.savedViewPopupHideCallback = function () {
            $scope.savedViewPopup = false
        };
        // End: Saved view popup

        // Start: Vertical tabs for filters
        $scope.tabFilterSelectCallback = function (tab) {
            $scope.treeComponentConfig.getSelections = true;
            $timeout(function () {
                $scope.treeComponentConfig.requestParameter = {
                    navigationContext: "PAS",
                };
                if (tab.id == 'category') {
                    if ($scope.mode) {
                        tempCategoryNode_PAS = [851750000001];
                    }
                    $scope.treeComponentConfig.selectedNodes = tempCategoryNode_PAS.join(",");
                    $scope.treeComponentConfig.data = categoryObj;
                    $scope.treeComponentConfig.title = 'Category';
                }
                else if (tab.id == 'businessUnit') {
                    $scope.treeComponentConfig.data = buObj;
                    $scope.treeComponentConfig.title = 'Business Unit';
                    $scope.treeComponentConfig.selectedNodes = tempBUNode_PAS.join(",");
                }
                else if (tab.id == 'region') {
                    if ($scope.mode) {
                        tempRegionNode_PAS = [851750000001];
                    }
                    $scope.treeComponentConfig.selectedNodes = tempRegionNode_PAS.join(",");
                    $scope.treeComponentConfig.data = regionObj;
                    $scope.treeComponentConfig.title = 'Region';
                }
            }, 1000);
        };

        $scope.showFilter = false;

        $scope.toggleFilter = function () {
            if ($scope.showFilter == false) {
                $scope.showFilter = true;
                $timeout(function () {
                    $scope.treeComponentConfig.requestParameter = {
                        navigationContext: "PAS",
                    };
                    $scope.treeComponentConfig.data = categoryObj;
                }, 1000);
            }
            else
                $scope.showFilter = false;
        };
        // End: Vertical tabs for filters

        // Start: Multiselect for team members master list
        $scope.disableCheckAllMember = false; // to disable if all members added
        $scope.teamMemberMasterHead = {
            'check': false
        };
        $scope.teamMemberMasterSelected = false;
        $scope.listCount = [];
        $scope.teamMemberList = [{
            "teamMemberId": 1,
            "title": "Allen Young",
            "roletitle": "",
            "selectedTableRole": [],
            "finalselectedRole": [],
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false,
            "viewer": true,
            "disable": true,
            

        }, {
            "teamMemberId": 60,
            "title": "Nishant Nayan",
            "roletitle": "",
            "selectedTableRole": [],
            "finalselectedRole": [],
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false,
            "viewer": true,
            "disable": true,
            

        },{
            "teamMemberId": 65,
            "title": "Nishant Nayan",
            "roletitle": "",
            "selectedTableRole": [],
            "finalselectedRole": [],
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false,
            "viewer": true,
            "disable": true,
            

        },{
            "teamMemberId": 64,
            "title": "Nishant Nayan",
            "roletitle": "",
            "selectedTableRole": [],
            "finalselectedRole": [],
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false,
            "viewer": true,
            "disable": true,
            

        },{
            "teamMemberId": 63,
            "title": "Nishant Nayan",
            "roletitle": "",
            "selectedTableRole": [],
            "finalselectedRole": [],
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false,
            "viewer": true,
            "disable": true,
            

        },{
            "teamMemberId": 62,
            "title": "Nishant Nayan",
            "roletitle": "",
            "selectedTableRole": [],
            "finalselectedRole": [],
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false,
            "viewer": true,
            "disable": true,
            

        },{
            "teamMemberId": 61,
            "title": "Nishant Nayan",
            "roletitle": "",
            "selectedTableRole": [],
            "finalselectedRole": [],
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false,
            "viewer": true,
            "disable": true,
            

        }];

        $scope.onChangeMasterTeamMember = function (arg) {
            var teamMemberlength = $scope.teamMemberMasterList.length;
            PPSTService.setTeamMemFlag(arg);
            $scope.listCount = [];
            $scope.fillpartialMasterTeamMember = false;
            if (arg === true) {
                $scope.listCount.length = teamMemberlength;
                $scope.teamMemberMasterSelected = true;
                $scope.teamMember.check = true;
            }

            if (arg) {
                $scope.teamMemberMasterSelected = true;
            }
            else {
                $scope.listCount = [];
                $scope.teamMemberMasterSelected = false;
            }

            $scope.teamMemberMasterListCheckedCount = $filter('filter')($scope.teamMemberMasterList, { check: true }).length;
        };

        function isAllMemSelected() {
            var isAllSelected = PPSTService.getTeamMemFlag();
            if (isAllSelected === true) {
                $scope.fillpartialMasterTeamMember = false;
                $scope.teamMemberMasterHead.check = true;
                $scope.disableCheckAllMember = true;
            } else {
                //$scope.fillpartialMasterTeamMember = true;
                $scope.teamMemberMasterHead.check = false;
                $scope.disableCheckAllMember = false;
            }

        }

        $scope.teamMemberMasterListChange = function (arg, index) {

            var teamMemberlength = $scope.teamMemberMasterList.length;

            $scope.teamMemberMasterList[index].check = arg;
            if (arg == true) {
                $scope.fillpartialMasterTeamMember = true;
                $scope.teamMemberMasterSelected = true;
                $scope.listCount.push('0');
                if ($scope.listCount.length === teamMemberlength) {
                    $scope.fillpartialMasterTeamMember = false;
                    $scope.teamMemberMasterHead.check = true;
                }
            } else {
                $scope.listCount.pop();
                if ($scope.listCount.length == 0) {
                    $scope.teamMemberMasterSelected = false;
                    $scope.teamMemberMasterHead.check = false;
                    $scope.fillpartialMasterTeamMember = false;
                }
                else
                    $scope.fillpartialMasterTeamMember = true;
            }

            $scope.teamMemberMasterListCheckedCount = $filter('filter')($scope.teamMemberMasterList, { check: true }).length;
        };

        // End: Multiselect for team members master list

        //Show Selected
        $scope.showSelectedMasterList = false;
        $scope.isEnterPressed = false;
        $scope.filteredData = {
            "tml": []
        }
        $scope.showSelected = {
            "check": false
        };
        $scope.showSelectedCallback = function (isChecked) {
            $scope.selectedTeamMemberMasterList = $filter('filter')($scope.teamMemberMasterList, { check: true });

            if (isChecked)
                $scope.showSelectedMasterList = true;
            else
                $scope.showSelectedMasterList = false;
        }

        $scope.keyDownCallback = function (e) {
            console.log(e.keyCode);
            if (e.keyCode == 13) {
                if ($scope.addTeamMemberSearch.length >= 3) {
                    $scope.filteredDataCount = $scope.filteredData.tml.length;
                    $scope.isEnterPressed = true;
                }
            }
            else if (e.keyCode == 27 || e.keyCode == 112 || e.keyCode == 113 || e.keyCode == 114 | e.keyCode == 115 || e.keyCode == 116 || e.keyCode == 117 || e.keyCode == 118 || e.keyCode == 119 || e.keyCode == 120 || e.keyCode == 121 || e.keyCode == 122 || e.keyCode == 123 || e.keyCode == 45 || e.keyCode == 9 || e.keyCode == 20 || e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 91 || e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                if ($scope.isEnterPressed == true) {
                    $scope.isEnterPressed = true;
                }
            }
            else {
                $scope.isEnterPressed = false;
            }
        };

        // Start: Add new team member popup
        $scope.contactInfoPopupUrl = 'shared/popup/views/popupContactInfo.html';
        $scope.contactInfoPopup = false;
        $scope.openContactInfoPopup = function (e) {
            $scope.contactInfoPopup = true;
        };
        $scope.contactInfoPopupOnHideCallback = function () {
            $scope.contactInfoPopup = false;
        };
        // End: Add new team member popup

        $scope.typeSelectDefaultRole = [{ "name": "Contract Manager" }, { "name": "Catalog Manager" }, { "name": "Customer Care Manager" }, { "name": "Sales Executive" }, { "name": "Build/RFP Manager" }, { "name": "Account Payable Manager" }, { "name": "Account Receivable Manager" }, { "name": "Ordering Manager" }, {
            "name": "Safety Contact"
        }];
        $scope.timezoneOptions = [{ "code": "India Standard Time", "name": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi" }, { "code": "UTC-11", "name": "(UTC-11:00) Coordinated Universal Time-11" }, { "code": "Mountain Standard Time (Mexico)", "name": "(UTC-07:00) Chihuahua, La Paz, Mazatlan" }, { "code": "E. Europe Standard Time", "name": "(UTC+02:00) E. Europe" }, { "code": "Cen. Australia Standard Time", "name": "(UTC+09:30) Adelaide" }, {
            "code": "Tasmania Standard Time", "name": "(UTC+10:00) Hobart"
        }];
        $scope.languageOptions = [{ "code": "en-CH", "name": "Chinese(Simplified)" }, { "code": "fr-FR", "name": "Czech" }, { "code": "de-DE", "name": "Danish" }, { "code": "en-US", "name": "English" }, { "code": "pt-PT", "name": "French" }, { "code": "es-ES", "name": "German" }, { "code": "es-ES", "name": "Italian" }, { "code": "es-ES", "name": "Japanese" }, { "code": "es-ES", "name": "Korean" }, { "code": "es-ES", "name": "Polish" }, { "code": "es-ES", "name": "Portuguese(Brazilian)" }, { "code": "es-ES", "name": "Russian" }, { "code": "es-ES", "name": "Spanish" }, { "code": "es-ES", "name": "Swedish" }, {
            "code": "es-ES", "name": "Thai"
        }];

        // Start: Change Primary Contact
        $scope.typeaheadLabel = "Change To";
        $scope.options = [
            {
                "UserId": 28360, "UserName": "SRUser1@outlook.com", "FirstName": "SR", "LastName": "User1"
            },
            {
                "UserId": 28977, "UserName": "SRUser1@outlook.com11", "FirstName": "Test", "LastName": "TestLastName"
            },
            {
                "UserId": 57900, "UserName": "SRUser1@outlook.com234", "FirstName": "Harshit", "LastName": "Bhau"
            }
        ];

        $scope.selected = {
            "UserId": 28360, "UserName": "SRUser1@outlook.com", "FirstName": "SR", "LastName": "User1"
        };

        $scope.changePrimarySupplier = function (supObj) {
            for (var i = 0; i < $scope.teamMemberList.length; i++) {
                if ($scope.teamMemberList[i].title == supObj.title) {
                    $scope.teamMemberList[i].isPrimary = true;
                } else {
                    $scope.teamMemberList[i].isPrimary = false;
                }

            }
            console.log(supObj);
            Materialize.toast("Primary Supplier has been changed.", 3500);
        };
        // Start: Change Primary Contact



        //console.log($scope.ngModel, "TEAMMEMBER")


        var highlight = false,
		addedTeamMembers = storeService.get('addedTeamMembers'),
		coAuthorList = [],
		evaluatorList = [],
		teamMemberListReset;

        var teamMemberMaster = {
            method: 'GET',
            url: 'sourcing/rfx/models/teamMemberMaster.json'
        };
        $scope.teamMemberMasterList = [];
        $http(teamMemberMaster).then(function (response) {

            dbFactory.all('teamMember', 'addedOn_idx').then(function (teamMember) {

            $scope.teamMemberMasterList = response.data.list;
            for (var i = 0; i < $scope.teamMemberMasterList.length; i++) {
                if ($scope.teamMemberMasterList[i].preAdded == true) {
                    $scope.teamMemberList.unshift($scope.teamMemberMasterList[i]);
                }
            }
            $scope.teamMemberMasterListCheckedCount = $filter('filter') ($scope.teamMemberMasterList, { check: true
            }).length;

                var primaryTeamMember = "";
                for (var i = 0; i < teamMember.length; i++) {
                    highlight = false;
                    if (addedTeamMembers && addedTeamMembers.indexOf(teamMember[i].title) >= 0)
                        $scope.teamMemberData = true;
                    highlight = true;

                    if (!teamMember[i].isPrimary) {
                        $scope.teamMemberList.unshift({
                            "title": teamMember[i].title,
                            "roletitle": teamMember[i].roletitle,
                            "selectedTableRole": teamMember[i].selectedTableRole,
                            "finalselectedRole": teamMember[i].finalselectedRole,
                            "highlight": highlight,
                            "check": false,
                            "viewer": true,
                            "coAuthor": teamMember[i].coAuthor,
                            "evaluator": teamMember[i].evaluator,
                            "email": teamMember[i].email,
                            "phone": teamMember[i].phone,
                            "designation": teamMember[i].designation,
                            "addedOn": teamMember[i].addedOn,
                            "invitedOn": teamMember[i].invitedOn,
                            "isPrimary": teamMember[i].isPrimary,
                            "teamMemberId": teamMember[i].teamMemberId
                        });
                    } else {
                        primaryTeamMember = {
                            "title": teamMember[i].title,
                            "roletitle": teamMember[i].roletitle,
                            "selectedTableRole": teamMember[i].selectedTableRole,
                            "finalselectedRole": teamMember[i].finalselectedRole,
                            "highlight": highlight,
                            "check": false,
                            "viewer": true,
                            "coAuthor": teamMember[i].coAuthor,
                            "evaluator": teamMember[i].evaluator,
                            "email": teamMember[i].email,
                            "phone": teamMember[i].phone,
                            "designation": teamMember[i].designation,
                            "addedOn": teamMember[i].addedOn,
                            "invitedOn": teamMember[i].invitedOn,
                            "isPrimary": teamMember[i].isPrimary,
                            "teamMemberId": teamMember[i].teamMemberId
                        };
                    }
                }
                if (primaryTeamMember != "") {
                    $scope.teamMemberList.unshift(primaryTeamMember);
                }
                var tmml_indexing = [];
                for (var j = 0; j < $scope.teamMemberList.length; j++) {
                    //alert($scope.teamMemberList.length);
                    for (var i = 0; i < $scope.teamMemberMasterList.length; i++) {
                        if ($scope.teamMemberMasterList[i].title.indexOf($scope.teamMemberList[j].title) >= 0) {
                            //$scope.teamMemberMasterList[i].added = true;
                            //$scope.teamMemberMasterList[i].check = true;
                            tmml_indexing.push(i);
                        }
                    }
                    if ($scope.teamMemberList[j].coAuthor) {
                        coAuthorList.push($scope.teamMemberList[j]);
                    }
                    if ($scope.teamMemberList[j].evaluator) {
                        evaluatorList.push($scope.teamMemberList[j]);
                    }
                }

                tmml_indexing.sort(function (a, b) { return a - b; });
                for (var tmInd = 0; tmInd < tmml_indexing.length; tmInd++) {
                    $scope.teamMemberMasterList.splice(tmml_indexing[tmInd] - tmInd, 1);
                }
                $scope.configureList = coAuthorList;
                teamMemberListReset = $scope.teamMemberList;

                storeService.set('teamMemberCount', $scope.teamMemberList.length);

                if ($scope.teamMemberList.length > 0)
                    $scope.teamMemberData = true;
                $timeout(function () {
                    for (var j = 0; j < $scope.teamMemberList.length; j++) {
                        $scope.teamMemberList[j].highlight = false;
                    }
                    isAllMemSelected();
                }, 500);
            });
        });

        $scope.inviteMultiTeamMember = function () {
            if ($scope.teamMemberSelected) {
                var teamMemberlength = $scope.teamMemberList.length,
                    incre,
                    checkCounter = 0,
                    selectedTeamMembers = [];
                for (incre = 0; incre < teamMemberlength; incre++) {
                    if ($scope.teamMemberList[incre].check) {
                        var today = new Date(),
                            dd = today.getDate(),
                            mm = today.getMonth() + 1,
                            yyyy = today.getFullYear(),
                            hours = today.getHours(),
                            minutes = today.getMinutes(),
                            ampm = hours >= 12 ? 'pm' : 'am';
                        if (dd < 10) dd = '0' + dd;
                        if (mm < 10) mm = '0' + mm;

                        hours = hours % 12;
                        hours = hours ? hours : 12;
                        minutes = minutes < 10 ? '0' + minutes : minutes;

                        today = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes + ' ' + ampm;
                        selectedTeamMembers.push($scope.teamMemberList[incre]);
                        $scope.teamMemberList[incre].invitedOn = today;

                        var tempList = $scope.teamMemberList[incre];

                        dbFactory.removeByIndex('teamMember', 'title_idx', $scope.teamMemberList[incre].title);
                        dbFactory.add('teamMember', tempList).then(function (total) {
                            $state.go('sourcing.rfx.new');
                        });
                    }
                }
                if (selectedTeamMembers.length > 1) {
                    inviteTeamMembersTxt = selectedTeamMembers[0].title + ' +' + (selectedTeamMembers.length - 1) + ' more have';
                }
                else if (selectedTeamMembers.length == 1) {
                    inviteTeamMembersTxt = selectedTeamMembers[0].title + ' has';
                }
                Materialize.toast(inviteTeamMembersTxt + " been invited.", 3500);
            }
        };
        $scope.backToPrevPage = function () {
            PPSTService.setAddingTeamMem(true);
            window.history.go(-1);
        }
        $scope.addTeamMemberCallback = function () {
            //$scope.teamMemberData = true;
            //alert($scope.teamMemberData);	       
            var addedTeamMemberList = [];
            var n = 0;
            angular.forEach($scope.teamMemberMasterList, function (value, index) {
                if (value.check && !value.added) {
                    var teamMemberObj = {
                        "title": value.title,
                        "roletitle": value.roletitle,
                        "selectedTableRole": value.selectedTableRole,
                        "finalselectedRole": value.finalselectedRole,
                        "highlight": false,
                        "check": false,
                        "viewer": true,
                        "coAuthor": value.coAuthor,
                        "evaluator": value.evaluator,
                        "email": value.email,
                        "phone": value.phone,
                        "designation": value.designation,
                        "addedOn": Date.now() + n,
                        "invitedOn": false,
                        "isPrimary": value.isPrimary,
                        "teamMemberId": value.teamMemberId
                    };
                    dbFactory.add('teamMember', teamMemberObj).then(function (total) {
                        PPSTService.setAddingTeamMem(true);
                        if ($state.params.view == 'supplier') {
                            $state.go('projects.new', {
                                view: "supplier"
                            });
                        }
                        else if ($state.params.view == 'supTeamMember') {
                            $state.go('projects.requester', { mode: "supervisorActive" });
                        }
                        else if ($state.params.view == 'supProgressTeamMember') {
                            $state.go('projects.requester', { mode: "supervisorInProgress" });
                        }
                        else {
                            $state.go('projects.new');
                        }
                    });
                    addedTeamMemberList.push(teamMemberObj.title);
                    n++;
                }
            });
            storeService.set('addedTeamMembers', addedTeamMemberList);
        };

        //Delete Team Members
        $scope.deleteMultiTeamMember = function (e) {

            if ($scope.teamMemberSelected) {
                var teamMemberDeleteConfirmation = {
                    type: "confirm",
                    message: "Are you sure you want to delete the selected Team member(s)?",
                    buttons: [
                            {
                                "title": "YES", "result": "yes"
                            },
                            { "title": "NO", "result": "no" }
                    ]
                };
                notification.notify(teamMemberDeleteConfirmation, function (response) {
                    if (response.result == 'yes') {
                        var teamMemberlength = $scope.teamMemberList.length,
                            incre, checkCounter = 0,
                            deletedTeamMembers = [];
                        for (incre = 0; incre < teamMemberlength; incre++) {
                            if ($scope.teamMemberList[incre].check) {
                                dbFactory.removeByIndex('teamMember', 'title_idx', $scope.teamMemberList[incre].title).then(
                                    function () {
                                        if ($scope.teamMemberList.length <= 0)
                                            $scope.teamMemberData = false;
                                    });
                                if ($scope.teamMemberList[incre].disable != true)
                                var deletedTeamMember = $scope.teamMemberList.splice(incre, 1);
                                deletedTeamMembers.push(deletedTeamMember);
                                teamMemberlength--; incre--;
                                PPSTService.setTeamMemFlag(false);
                            }
                        }
                        $scope.fillpartialTeamMember = false;
                        $scope.teamMemberSelected = false;
                        storeService.set('teamMemberCount', $scope.teamMemberList.length);
                        if (deletedTeamMembers.length > 1)
                            deletedTeamMembersTxt = deletedTeamMembers[0][0].title + ' +' + (deletedTeamMembers.length - 1) + ' more have';
                        else if (deletedTeamMembers.length == 1)
                            deletedTeamMembersTxt = deletedTeamMembers[0][0].title + ' has';
                        Materialize.toast(deletedTeamMembersTxt + " been deleted.", 3500);
                    }
                });
            }
        };

        $scope.coAuthorCallback = function (arg, title) {
            for (var i = 0; i < $scope.teamMemberList.length; i++) {
                if ($scope.teamMemberList[i].title === title) {
                    $scope.teamMemberList[i].coAuthor = arg;
                    var tempList = $scope.teamMemberList[i];

                    dbFactory.removeByIndex('teamMember', 'title_idx', $scope.teamMemberList[i].title);
                    dbFactory.add('teamMember', tempList).then(function (total) {
                        $state.go('sourcing.rfx.new');
                    });
                    break;
                }
            }
        };

        $scope.evaluatorCallback = function (arg, title) {
            for (var i = 0; i < $scope.teamMemberList.length; i++) {
                if ($scope.teamMemberList[i].title === title) {
                    $scope.teamMemberList[i].evaluator = arg;
                    var tempList = $scope.teamMemberList[i];

                    dbFactory.removeByIndex('teamMember', 'title_idx', $scope.teamMemberList[i].title);
                    dbFactory.add('teamMember', tempList).then(function (total) {
                        $state.go('sourcing.rfx.new');
                    });
                    break;
                }
            }
        };
        // End: Data Storage and retreival

        $scope.dropDownConfig = {
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        };

        $scope.operatorRange = false;
        $scope.onChangeFilterType = function (conditionOp) {
            if (conditionOp.name == "Between") {
                $scope.operatorRange = true;
            }
            else {
                $scope.operatorRange = false;
            }
        };

        $scope.defaultSelectedOperator = {
            'name': 'Greater than'
        };
        $scope.operatorValue = "Value";
        $scope.operatorsList = [
                    {
                        'name': 'Greater than'
                    },
                    {
                        'name': 'Greater than equals to'
                    },
                    {
                        'name': 'Less than'
                    },
                    {
                        'name': 'Less than equals to'
                    },
                    {
                        'name': 'Equal'
                    },
                    {
                        'name': 'Not equal to'
                    },
                    {
                        'name': 'Between'
                    },
                    {
                        'name': 'Is Null'
                    },
                    {
                        'name': 'Is Not Null'
                    }];

        /*$scope.onLoadCount = function () {
	        $scope.listCount.length = $scope.teamMemberCount;
	    }*/

      


    }


    //SUPPLIERS
    function supplierCtrlProjFunc($scope, $timeout, $http, $state, notification, storeService, dbFactory, $sce, $filter, PPSTService) {
        // Start: Pagination handler
        $scope.currentPage = 1;

        $scope.pageChangeHandler = function (num) {
            $scope.currentPage = num;
        };

        $scope.supplierIncoLineLoader = true;
        $timeout(function () {
            $scope.supplierIncoLineLoader = false;
        }, 750);
        $scope.supplierLineLoaderFlag = {
            plain: true,
            message: "Loading",
            center: true
        };
        $scope.backToPrevPage = function () {
            PPSTService.setAddingSupplier(true);
            window.history.go(-1);
        }

        $scope.rowsToShowOpts = {
            availableOptions: [
              {
                  size: '5'
              },
              { size: '10' }
            ],
            selectedOption: {
                size: '5'
            }
        };

        // End:

        $scope.currencyOptions = [
            { "title": "INR (Indian Rupee)", "exchangeRate": "68.72" },
            { "title": "GBP (British Pound)", "exchangeRate": "0.76" },
            { "title": "EUR (Euro)", "exchangeRate": "0.91" },
            { "title": "CAD (Canadian Dollar)", "exchangeRate": "1.30" },
            { "title": "AUD (Australian Dollar)", "exchangeRate": "1.75" },
            { "title": "CUP (Cuban Peso)", "exchangeRate": "1" },
            { "title": "DKK (Danish Krone)", "exchangeRate": "6.77" }
        ];
        $scope.selectedCurrency = { "title": "INR (Indian Rupee)", "exchangeRate": "68.72" };

        $scope.supplierList = [];

        $scope.contactChecked = [];

        var supplierMaster = {
            method: 'GET',
            url: 'project/ppst/models/supplierMaster.json'
        };

        // Start: Multiselect for supplier members master list
        $scope.supplierMasterHead = {
            'check': false
        };
        
        $scope.supplierMasterSelected = false;
        $scope.listCount = [];
        $scope.supplierMasterList = [];
        $http(supplierMaster).then(function (response) {
           
            
            dbFactory.all('supplier', 'addedOn_idx').then(
                       function (supplier) {
                           //$scope.supplierList = []; // add a fresh list.
                           $scope.supplierMasterList = response.data.list;
                           var temp = [];
                           for (var i = 0; i < $scope.supplierMasterList.length; i++) {
                               if ($scope.supplierMasterList[i].preAdded) {
                                   $scope.supplierList.unshift($scope.supplierMasterList[i]);
                                   
                               }
                           }
                           $scope.supplierMasterListCheckedCount = $filter('filter')($scope.supplierMasterList, { check: true }).length;

                           for (var i = 0; i < supplier.length; i++) {
                               highlight = false;
                               if (addedSuppliers && addedSuppliers.indexOf(supplier[i].title) >= 0)
                                   highlight = true;
                               $scope.supplierList.unshift({
                                   "title": supplier[i].title,
                                   "highlight": highlight,
                                   "check": false,
                                   "addedOn": supplier[i].addedOn,
                                   "addedBy": supplier[i].addedBy,
                                   "contact": supplier[i].contact,
                                   "phone": supplier[i].phone,
                                   "email": supplier[i].email,
                                   "secondaryContact": supplier[i].secondaryContact,
                                   "diversity": supplier[i].diversity,
                                   "diversityToolTip": supplier[i].diversityToolTip,
                                   "invitedOn": supplier[i].invitedOn,
                                   "participationStatus": false
                               });
                           }
                           
                           for (var j = 0; j < $scope.supplierList.length; j++) {
                               for (var i = 0; i < $scope.supplierMasterList.length; i++) {
                                   if ($scope.supplierMasterList[i].title.indexOf($scope.supplierList[j].title) >= 0) {
                                       $scope.supplierMasterList[i].added = true;
                                       $scope.supplierMasterList[i].check = true;
                                   }
                               }
                           }
                           //$scope.configureSupplierList = storeService.get('configureSupplierList');
                           var tmml_indexing = [];
                           for (var j = 0; j < $scope.supplierList.length; j++) {
                               //alert($scope.teamMemberList.length);
                               for (var i = 0; i < $scope.supplierMasterList.length; i++) {
                                   if ($scope.supplierMasterList[i].title.indexOf($scope.supplierList[j].title) >= 0) {
                                       //$scope.teamMemberMasterList[i].added = true;
                                       //$scope.teamMemberMasterList[i].check = true;
                                       tmml_indexing.push(i);
                                   }
                               }
                               if ($scope.supplierList[j].coAuthor) {
                                   coAuthorList.push($scope.supplierList[j]);
                               }
                               if ($scope.supplierList[j].evaluator) {
                                   evaluatorList.push($scope.supplierList[j]);
                               }
                           }

                           tmml_indexing.sort(function (a, b) { return a - b; });
                           for (var tmInd = 0; tmInd < tmml_indexing.length; tmInd++) {
                               $scope.supplierMasterList.splice(tmml_indexing[tmInd] - tmInd, 1);
                           }
                           
                           supplierListReset = $scope.supplierList;
                           storeService.set('supplierCount', $scope.supplierList.length);
                           if ($scope.supplierList.length > 0)
                               $scope.supplierData = true;

                           $timeout(function () {
                               for (var j = 0; j < $scope.supplierList.length; j++) {
                                   $scope.supplierList[j].highlight = false;
                               }
                           }, 2000);
                           configureSupplierList = [];
                           var sdata = storeService.get('configureSupplierList');
                           if (sdata) {
                               $scope.configureSupplierList = sdata;
                           } else {
                               //configureSupplierList.push($scope.supplierList);
                               $scope.configureSupplierList = $scope.supplierList;
                           }
                           storeService.set('configureSupplierList', configureSupplierList);
                           isAllSupplierSelected();
                       }
                   );

            
        });
        // End: Data init

        //Start: Supplier Decline Comment popup strats
        $scope.addDeclineCommentPeriod = false;
        $scope.addDeclineCommentPopup = function (e) {
            $scope.addDeclineCommentPeriod = true;
        };
        $scope.addDeclineCommentPopupHide = function (e) {
            $scope.addDeclineCommentPeriod = false;
        };
        //End: Supplier Decline Comment popup Ends

        // Start: Configure Tabs
        $scope.configureTabsData = [{
            "id": "pricesheet",
            "title": "PRICE SHEETS",
            "active": true
        }, {
            "id": "currency",
            "title": 'CURRENCY',
        }];
        $scope.pricesheetConfigure = true;

        $scope.configureTabsCallback = function (tab) {
            if (tab.id == "pricesheet")
                $scope.pricesheetConfigure = true;
            else
                $scope.pricesheetConfigure = false;
        };

        // Start: Exchange rate popup
        $scope.showExchangeRatePopup = false;
        $scope.showExchangeRatePopupCallback = function (e) {
            $scope.showExchangeRatePopup = true;
        };
        $scope.exchangeRatePopupOnHideCallback = function () {
            $scope.showExchangeRatePopup = false;
        };

        $scope.currencyOptions = [
            { "title": "INR (Indian Rupee)", "exchangeRate": "68.72" },
            { "title": "GBP (British Pound)", "exchangeRate": "0.76" },
            { "title": "EUR (Euro)", "exchangeRate": "0.91" },
            { "title": "CAD (Canadian Dollar)", "exchangeRate": "1.30" },
            { "title": "AUD (Australian Dollar)", "exchangeRate": "1.75" },
            { "title": "CUP (Cuban Peso)", "exchangeRate": "1" },
            { "title": "DKK (Danish Krone)", "exchangeRate": "6.77" }
        ];
        $scope.selectedCurrency = { "title": "INR (Indian Rupee)", "exchangeRate": "68.72" };

        $scope.exchangeRateOptions = [
        { "title": "INR (Indian Rupee)", "exchangeRate": "68.72" },
        { "title": "GBP (British Pound)", "exchangeRate": "0.76" },
        { "title": "EUR (Euro)", "exchangeRate": "0.91" },
        { "title": "CAD (Canadian Dollar)", "exchangeRate": "1.30" },
        { "title": "AUD (Australian Dollar)", "exchangeRate": "1.75" },
        { "title": "CUP (Cuban Peso)", "exchangeRate": "1" },
        { "title": "DKK (Danish Krone)", "exchangeRate": "6.77" }
        ];
        $scope.exchangeRateCurrency = { "title": "INR (Indian Rupee)", "exchangeRate": "68.72" };

        $scope.rateDisable = true;
        $scope.editCurrencyRate = function () {
            $scope.rateDisable = false;
        };
        $scope.saveCurrencyRate = function () {
            $scope.rateDisable = true;
        };

        $scope.addedCurrencyRate = [];
        $scope.addCurrencyRate = function () {
            $scope.addedCurrencyRate.push({});
        };
        $scope.deleteExchangeRate = function (data, Ind) {
            data.splice(Ind, 1);
        };
        // End: Exchange rate popup


        // End: Configure tabs


        // Start: Load more team members
        $scope.totalDisplayed = 10;
        $scope.loadMore = function () {
            $scope.totalDisplayed += 7;
        };
        // End: Load more team members

        //if all suppliers are added
        $scope.allSuppliersSelected = false;

        if ($scope.supplierList.length == 18) {
            $scope.allSuppliersSelected = true;
        }


        // Start: Scroll config
        $scope.configureSupplierScrollRight = {
            'vSource': 'configure-chkTbl',
            'hSource': 'configure-chkTbl',
            'vertical': 'configure-eventTbl',
            'horizontal': 'configure-chkHdrTblWrap'
        };
        $scope.configureSupplierScrollLeft = {
            'vSource': 'configure-eventTbl',
            'hSource': 'configure-chkTbl',
            'vertical': 'configure-chkTbl',
            'horizontal': 'configure-chkHdrTblWrap'
        };
        // End: Scroll config


        // Start: CBR config and data
        $scope.treeComponentConfig = {
            selectedNodes: "",
            isRadio: false,
            getHierarchyOnSelection: true,
            isLazyLoad: true,
            data: null,
            disableLevelSelection: '',
            title: 'Category',
            getSelections: false,
            clearCache: false,
            height: '220px',
            isSearchEnabled: true,
            requestParameter: {
                navigationContext: "PAS"
            }
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
        var callData = function () {
            $http(buData).then(function (response) {
                buObj = response.data;
            });

            $http(categoryData).then(function (response) {
                categoryObj = response.data;
            });

            $http(regionData).then(function (response) {
                regionObj = response.data;
            });
        }
        callData();
        $scope.filterResetCall = function () {
            callData();
            $scope.selectAllSupplierType.val = false;
            $scope.selectAllSupplierDiversity.val = false;
            $scope.selectAllSupplierStatus.val = false;
            $scope.selectAllSupplierType.isShow = false;
            $scope.selectAllSupplierDiversity.isShow = false;
            $scope.selectAllSupplierStatus.isShow = false;
            $timeout(function () {
                $scope.selectAllSupplierType.isShow = true;
                $scope.selectAllSupplierDiversity.isShow = true;
                $scope.selectAllSupplierStatus.isShow = true;
                $scope.supplierFilterTabData[0].active = true;
            }, 100);
            $scope.treeComponentConfig.getSelections = true;
            $timeout(function () {
                $scope.treeComponentConfig.requestParameter = {
                    navigationContext: "PAS",
                };
                $scope.supplierType = false;
                $scope.supplierStatus = false;
                $scope.supplierDiversity = false;
                $scope.treeComponentConfig.data = categoryObj;
                $scope.treeComponentConfig.title = 'Category';
            });
            for (var i = 0; i < $scope.supplierFilterTabData.length; i++) {
                $scope.supplierFilterTabData[i].active = false;
            }
            for (var i = 0; i < $scope.supplierTypeList.length; i++) {
                $scope.supplierTypeList[i].checked = false;
            }
            for (var i = 0; i < $scope.supplierStatusList.length; i++) {
                $scope.supplierStatusList[i].checked = false;
            }
            for (var i = 0; i < $scope.supplierDiversityList.length; i++) {
                $scope.supplierDiversityList[i].checked = false;
            }

        }
        // End: CBR config and data


        // Start: Vertical tabs for filters
        $scope.supplierFilterTabData = [{
            "id": "category",
            "title": "Category",
            "active": true
        }, {
            "id": "businessUnit",
            "title": "Business Unit"
        }, {
            "id": "region",
            "title": "Region"
        }, {
            "id": "Status",
            "title": "Supplier Status"
        }, {
            "id": "Type",
            "title": "Supplier Type"
        }, {
            "id": "Diversity",
            "title": "Supplier Diversity"
        }
        ];
        
        $scope.showFilter = false;
        $scope.initialFlag = false;

        $scope.toggleFilter = function () {
            $scope.initialFlag = true;
            if ($scope.showFilter == false) {
                $scope.showFilter = true;

                $timeout(function () {
                    $scope.treeComponentConfig.requestParameter = {
                        navigationContext: "PAS",
                    };
                    $scope.treeComponentConfig.data = categoryObj;
                }, 1000);
            }
            else
                $scope.showFilter = false;

        };
        $scope.treeComponentCallback = function (e) {

        };

        $scope.tabSelectCallback = function (tab) {
            $scope.treeComponentConfig.getSelections = true;
            $timeout(function () {
                $scope.treeComponentConfig.requestParameter = {
                    navigationContext: "PAS",
                };
                if (tab.id == 'category') {
                    $scope.supplierType = false;
                    $scope.supplierStatus = false;
                    $scope.supplierDiversity = false;
                    $scope.treeComponentConfig.data = categoryObj;
                    $scope.treeComponentConfig.title = 'Category';

                }
                else if (tab.id == 'businessUnit') {
                    $scope.supplierType = false;
                    $scope.supplierStatus = false;
                    $scope.supplierDiversity = false;
                    $scope.treeComponentConfig.data = buObj;
                    $scope.treeComponentConfig.title = 'Business Unit';
                }
                else if (tab.id == 'region') {
                    $scope.supplierType = false;
                    $scope.supplierStatus = false;
                    $scope.supplierDiversity = false;
                    $scope.treeComponentConfig.data = regionObj;
                    $scope.treeComponentConfig.title = 'Region';
                }
                else if (tab.id == 'Status') {
                    $scope.supplierStatus = true;
                    $scope.supplierType = false;
                    $scope.supplierDiversity = false;
                }
                else if (tab.id == 'Type') {
                    $scope.supplierType = true;
                    $scope.supplierStatus = false;
                    $scope.supplierDiversity = false;

                }
                else if (tab.id == 'Diversity') {
                    $scope.supplierDiversity = true;
                    $scope.supplierStatus = false;
                    $scope.supplierType = false;

                }
            }, 1000);
        };
        // End: Filters


        // Start: Supplier icard data and popup

        $scope.supplierIcard = {
            "supplierName": "Global Operations Inc",
            "location": "Michigan, United States",
            "site": "www.kelloggs.com",
            "primaryContact": "Allan Gibson",
            "code": "232654BB3C",
            "suppilersourcetype": "General",
            "status": "Invited",
            "businessunit": {
                "displaytext": "Business Unit",
                "selectedoption": [{ "name": "Category 0", "check": true, "value": [{ "name": "Category child-0", "check": false, "value": [{ "name": "Category grand-child-0", "check": false }, { "name": "Category grand-child-1", "check": false }, { "name": "Category grand-child-2", "check": false }] }] }],
                "options": [{ "name": "Category 0", "check": false, "value": [{ "name": "Category child-0", "check": false, "value": [{ "name": "Category grand-child-0", "check": false }, { "name": "Category grand-child-1", "check": false }, { "name": "Category grand-child-2", "check": false }] }] }, { "name": "Category 1", "check": false, "value": [{ "name": "Category child-0", "check": false, "value": [{ "name": "Category grand-child-0", "check": false }, { "name": "Category grand-child-1", "check": false }, { "name": "Category grand-child-2", "check": false }] }] }, { "name": "Category 2", "check": false, "value": [{ "name": "Category child-0", "check": false, "value": [{ "name": "Category grand-child-0", "check": false }, { "name": "Category grand-child-1", "check": false }, { "name": "Category grand-child-2", "check": false }] }] }]
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

        $scope.showSupplierIcardPopup = false;
        $scope.showSupplierIcard = function () {
            $scope.showSupplierIcardPopup = true;
        }
        $scope.hideSupplierIcardPopupCallback = function () {
            $scope.showSupplierIcardPopup = false;
        };
        // End: Supplier icard data and popup


        // Start: Sorting lookup data 
        $scope.listSortWith = [
           { 'name': 'Category', 'sortas': 'asc_desc' },
           { 'name': 'Region', 'sortas': 'asc_desc' },
           { 'name': 'Business Unit', 'sortas': 'asc_desc' },
           { 'name': 'Primary Contact', 'sortas': 'asc_desc' }
        ];

        $scope.setSortAsicon = function (checkSortByicon) {
            switch (checkSortByicon) {
                case "asc":
                    return "#icon_SortAscending"
                    break;
                case "desc":
                    return "#icon_SortDescending"
                    break;
                case "asc_desc":
                    return "#icon_Sort"
                    break;
            }
        };

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


        $scope.sortIcon = {
            'icon': 'icon_Sort'
        };
        $scope.sortIcon1 = {
            'icon': 'icon_Sort'
        };
        $scope.typeSortIcon = {
            'icon': 'icon_Sort'
        };
        $scope.typeSortIconTooltip = "Sort"
        $scope.ascDescToggler = function (data) {
            if (data.icon == 'icon_Sort') {
                data.icon = 'icon_SortAscending';
                $scope.typeSortIconTooltip = "Ascending"
            }
            else if (data.icon == 'icon_SortAscending') {
                data.icon = 'icon_SortDescending';
                $scope.typeSortIconTooltip = "Descending";
            }
            else {
                $scope.typeSortIconTooltip = "Sort";
                data.icon = 'icon_Sort';
            }

        };
        // End: Sort events

        $scope.itemClicked = function ($index) {
            $scope.selectedIndex = $index;
        };
        // End: Sorting lookup data


        // Start: Lookup search 
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
        // End: Lookup search


        // Start: Search animation in subheader
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
        // End: Search animation in subheader

        // Start: Multiselect for Supplier list
        $scope.diversitySupplierAlert = true;
        $scope.listCount = [];
        var diversitySupplierCount = [];
        $scope.supplierMasterList = [];
        $scope.disableCheckAllSupplier = false; // To enable disable check all supplier
        function isAllSupplierSelected() {
            var isAllSelected = PPSTService.getSupplierFlag();
            if (isAllSelected === true) {
                $scope.fillpartialMasterSupplier = false;
                $scope.supplierMasterHead.check = true;
                $scope.disableCheckAllSupplier = true;
            } else {
                //$scope.fillpartialMasterSupplier = true;
                $scope.supplierMasterHead.check = false;
                $scope.disableCheckAllSupplier = false;
            }

        }
        $scope.onChangeMasterSupplier = function (arg) {
            PPSTService.setSupplierFlag(arg);
            var supplierlength = $scope.supplierMasterList.length;
            $scope.listCount = [];
            $scope.fillpartialMasterSupplier = false;
            $scope.diversitySupplierAlert = true;

            $scope.supplierMasterSelected = true;

            for (var incre = 0; incre < supplierlength; incre++) {
                $scope.supplierMasterList[incre].check = arg;
                $scope.listCount.push('0');
            }
            if (arg) {
                $scope.supplierMasterSelected = true;
                $scope.diversitySupplierAlert = false;
            }
            else {
                $scope.listCount = [];
                $scope.supplierMasterSelected = false;
            }

            $scope.supplierMasterListCheckedCount = $filter('filter')($scope.supplierMasterList, { check: true }).length;
        };

        $scope.supplierMasterListChange = function (arg, index, diversity) {
            var supplierlength = $scope.supplierMasterList.length;
            $scope.supplierMasterList[index].check = arg;
            if (arg) {
                $scope.fillpartialMasterSupplier = true;
                $scope.supplierMasterSelected = true;
                $scope.listCount.push('0');
                if ($scope.listCount.length === supplierlength) {
                    $scope.fillpartialMasterSupplier = false;
                    $scope.supplierMasterHead.check = true;
                }
                if (diversity) {
                    $scope.diversitySupplierAlert = false;
                    diversitySupplierCount.push('0');
                }
            }
            else {
                $scope.listCount.pop();
                if ($scope.listCount.length == 0) {
                    $scope.supplierMasterSelected = false;
                    $scope.supplierMasterHead.check = false;
                    $scope.fillpartialMasterSupplier = false;
                }
                else
                    $scope.fillpartialMasterSupplier = true;
                if (diversity) {
                    diversitySupplierCount.pop();
                    if (diversitySupplierCount.length == 0) {
                        $scope.diversitySupplierAlert = true;
                    }
                }
            }

            $scope.supplierMasterListCheckedCount = $filter('filter')($scope.supplierMasterList, { check: true }).length;
        };
        // End: Multiselect for Supplier list

        //Show Selected
        $scope.showSelectedMasterList = false;
        $scope.isEnterPressed = false;
        $scope.filteredData = {
            "tml": []
        }
        $scope.showSelected = {
            "check": false
        };
        $scope.showSelectedCallback = function (isChecked) {
            $scope.selectedSupplierMasterList = $filter('filter')($scope.supplierMasterList, { check: true });

            if (isChecked)
                $scope.showSelectedMasterList = true;
            else
                $scope.showSelectedMasterList = false;
        }

        $scope.selectAllSupplierType = { val: false, isShow: true };
        $scope.supplierTypeList = [
            {
                "name": "Partnership",
                "checked": false
            },
            {
                "name": "Strategic",
                "checked": false
            },
            {
                "name": "Standard",
                "checked": false
            },
            {
                "name": "Commodity",
                "checked": false
            },
            {
                "name": "General",
                "checked": false
            },
            {
                "name": "Sole",
                "checked": false
            },
            {
                "name": "Single",
                "checked": false
            }
        ];
        $scope.selectAllSupplierDiversity = { val: false, isShow: true };
        $scope.supplierDiversityList = [
                {
                    "name": "Minority Business Enterprise (MBE) - African American",
                    "checked": false
                },
                {
                    "name": "Minority Business Enterprise (MBE) - Asian-Indian American",
                    "checked": false
                },
                {
                    "name": "Minority Business Enterprise (MBE) - Hispanic American",
                    "checked": false
                },
                {
                    "name": "Minority Business Enterprise (MBE) - Native American",
                    "checked": false
                },
                {
                    "name": "Minority Business Enterprise (MBE) - Alaskan Native",
                    "checked": false
                },
                {
                    "name": "Minority Institutions or Historically Black College",
                    "checked": false
                },
                {
                    "name": "Lesbian, Gay, Bisexual, Transgender (LGBT)",
                    "checked": false
                },
                {
                    "name": "Historically Underutilized Business Zone Small Business (HUBZone)",
                    "checked": false
                },
                {
                    "name": "Minority Business Enterprise (MBE) - Asian-Pacific American",
                    "checked": false
                }
        ];
        $scope.selectAllSupplierStatus = { val: false, isShow: true };
        $scope.supplierStatusList = [
            {
                "name": "Invited",
                "checked": false
            },
            {
                "name": "Registered",
                "checked": false
            },
            {
                "name": "Approved",
                "checked": false
            }
        ];

        // Start: Multiselect for suppliers list
        $scope.supplierHead = { 'check': false };
        $scope.supplierSelected = false;

        $scope.onChangeSupplier = function (arg) {
            var supplierlength = $scope.supplierList.length,
                incre;
            $scope.fillpartialSupplier = false;
            for (incre = 0; incre < supplierlength; incre++) {
                $scope.supplierList[incre].check = arg;
            }
            if (arg)
                $scope.supplierSelected = true;
            else
                $scope.supplierSelected = false;
        };

        $scope.supplierListChange = function (arg) {
            var supplierlength = $scope.supplierList.length,
                incre,
                checkCounter = 0;
            for (incre = 0; incre < supplierlength; incre++) {
                if ($scope.supplierList[incre].check)
                    checkCounter++;
            }
            $scope.fillpartialSupplier = true;
            if (checkCounter === 0) {
                $scope.fillpartialSupplier = false;
                $scope.supplierHead.check = false;
                $scope.supplierSelected = false;
            }
            else if (checkCounter === supplierlength) {
                $scope.fillpartialSupplier = false;
                $scope.supplierHead.check = true;
                $scope.supplierSelected = true;
            }
            else {
                $scope.supplierSelected = true;
            }
        };
        // End: Multiselect for suppliers list

        // Start: Add new supplier popup
        $scope.addNewSuppliersPopup = false;
        $scope.addNewSuppliersPopupCallback = function () { $scope.addNewSuppliersPopup = true; };
        $scope.addNewSuppliersPopupHideCallback = function () { $scope.addNewSuppliersPopup = false; };
        // End: Add new supplier popup


        // Start: Supplier info (icard) popup
        $scope.suppliersInfoPopup = false;
        $scope.suppliersInfoPopupCallback = function () { $scope.suppliersInfoPopup = true; };
        $scope.suppliersInfoPopupHideCallback = function () { $scope.suppliersInfoPopup = false; };
        // End: Supplier info (icard) popup


        // Start: Filter application

        $scope.alertBarFilter = false;


        $scope.applyCurrentFilter = function (e) {
            $scope.isApplyFilters = true;
            $scope.alertBarFilter = true;
            $scope.toggleFilter(e);
        }


        $scope.hideFilters = function () {
            $scope.alertBarFilter = false;
        }


        // Start: Search bar
        setTimeout(function () {
            $scope.isActive = false;
        });
        $scope.showMe = true;
        $scope.showSearchM = function () {
            this.isActiveM = true;
            this.showMeM = true;
            this.hideCloseM = true;
            this.focusSearchM = true;
            this.columnSearchKey = "Search";
        };
        $scope.hideSearchM = function () {
            this.isActiveM = false;
            this.hideCloseM = false;

        };
        // End: Search bar


        // Start: Saved view popup
        $scope.savedViewPopup = false;
        $scope.savedViewPopupCallback = function () { $scope.savedViewPopup = true };
        $scope.savedViewPopupHideCallback = function () { $scope.savedViewPopup = false };
        // End: Saved view popup


        // Start: manage fields popup
        $scope.manageFieldsPopup = false;
        $scope.manageFieldsPopupCallback = function () {
            $scope.manageFieldsPopup = true
        };
        $scope.manageFieldsPopupHideCallback = function () {
            $scope.manageFieldsPopup = false;
        };

        $scope.$on('applyModification', function (e, d) {

            if (d.makeIsSaveViewModified == true) {
                $scope.isSavedViewModified = true;
            }
            else {
                $scope.isApplyFilters = true;
            }
        });
        // Start: manage fields popup


        // Start: Configure supplier
        var configureSupplierList = [];
        $scope.configureSupplier = function () {
            //configureSupplierList = [];
            //if ($scope.supplierSelected) { 
            //	for (var j = 0; j < $scope.supplierList.length; j++) {
            //		if ($scope.supplierList[j].check) {
            //			configureSupplierList.push($scope.supplierList[j]);
            //		}
            //	}
            //	storeService.set('configureSupplierList', configureSupplierList);
            //	$state.go('sourcing.rfx.configureSupplier');
            //	$scope.configureSupplierList = configureSupplierList;
            //}
            storeService.set('configureSupplierList', $scope.supplierList);
            $state.go('projects.configureSupplier');
            $scope.configureSupplierList = angular.copy($scope.supplierList);
        };
        $scope.configureSupplierOptions = [
            { "title": "None" },
            { "title": "USD" },
            { "title": "EUR" },
            { "title": "INR" },
            { "title": "GBP" },
            { "title": "CAD" },
            { "title": "AUD" },
            { "title": "CUP" },
            { "title": "DKK" }
        ];
        $scope.configureSelectedOptions = { "title": "USD" };

        // End: Configure supplier


        // Start: Pagination handler
        $scope.currentPage = 1;

        $scope.pageChangeHandler = function (num) {
            $scope.currentPage = num;
        };
        // End: Pagination handler
        var viewMode = $state.params.view;

        if (viewMode == "buyerPreview")
            $scope.buyerPreview = true;


        var supplierDeleteConfirmation = {
            type: "confirm",
            message: "Are you sure you want to delete suppliers?",
            buttons: [
                { "title": "YES", "result": "yes" },
                { "title": "NO", "result": "no" }
            ]
        };

        // Start: Data Storage and retreival
        $scope.supplierData = false;

        var highlight = false,
            addedSuppliers = storeService.get('addedSuppliers'),
            supplierListReset;



        
        $scope.addSupplierCallback = function () {
            var addedSupplierList = [];
            var n = 0;
            //var d = new Date();
            //var dFormat = [("0" + (d.getDate())).slice(-2),
            //    ("0" + (d.getMonth() + 1)).slice(-2),
            //   d.getFullYear()].join('/') + ' ' +
            //  [("0" + (d.getHours())).slice(-2),
            //   ("0" + (d.getMinutes())).slice(-2)].join(':');
            angular.forEach($scope.supplierMasterList, function (value, index) {
                if (value.check && !value.hasOwnProperty('added')) {
                    var supplierObj = {
                        "title": value.title,
                        "highlight": false,
                        "check": false,
                        "addedOn": new Date(),
                        "addedBy": value.addedBy,
                        "secondaryContact": value.secondaryContact,
                        "contact": value.contact,
                        "phone": value.phone,
                        "email": value.email,
                        "diversity": value.diversity,
                        "diversityToolTip": value.diversityToolTip,
                        "invitedOn": false,
                        "reInvitedOn": false
                    };
                    dbFactory.add('supplier', supplierObj).then(function (total) {
                        PPSTService.setAddingSupplier(true);
                        $state.go('projects.new');
                    });
                    addedSupplierList.push(value.title);
                    n++;
                }
            });
            storeService.set('addedSuppliers', addedSupplierList);
        };

        $scope.notificationNew1 = { "notifyTo": "", "notifyCc": "", "notifySub": "" }

        $scope.inviteSupplier = function (supplier, index) {
            if ($scope.notificationNew1.notifyTo && $scope.notificationNew1.notifySub)
                $scope.$emit('inviteSent', { supplier: supplier, index: index });
        };

        $scope.$on('inviteSent', function (event, args) {
            $scope.emailNotifyOnHideCallback();
            var today = new Date(),
                        dd = today.getDate(),
                        mm = today.getMonth() + 1,
                        yyyy = today.getFullYear(),
                        hours = today.getHours(),
                        minutes = today.getMinutes(),
                        ampm = hours >= 12 ? 'pm' : 'am';
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            today = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes + ' ' + ampm;

            var incre = args.index + ($scope.currentPage - 1) * $scope.rowsToShowOpts.selectedOption.size;
            $scope.supplierList[incre].invitedOn = today;
            $scope.supplierList[incre].reInvitedOn = false;
            $scope.supplierList[incre].revoked = false;
            $scope.supplierList[incre].extraFlag = true;

            var tempList = $scope.supplierList[incre];
            dbFactory.removeByIndex('supplier', 'title_idx', $scope.supplierList[incre].title);
            dbFactory.add('supplier', tempList).then(function (total) {
                $state.go('projects.new');
            });

            Materialize.toast(supplier + " has been invited.", 3500);
        });

        $scope.reInviteSupplier = function (supplier, index) {
            var today = new Date(),
                        dd = today.getDate(),
                        mm = today.getMonth() + 1,
                        yyyy = today.getFullYear(),
                        hours = today.getHours(),
                        minutes = today.getMinutes(),
                        ampm = hours >= 12 ? 'pm' : 'am';
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            today = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes + ' ' + ampm;

            var incre = index + ($scope.currentPage - 1) * $scope.rowsToShowOpts.selectedOption.size;
            $scope.supplierList[incre].reInvitedOn = today;
            $scope.supplierList[incre].revoked = false;
            $scope.supplierList[incre].extraFlag = false;

            var tempList = $scope.supplierList[incre];

            dbFactory.removeByIndex('supplier', 'title_idx', $scope.supplierList[incre].title);
            dbFactory.add('supplier', tempList).then(function (total) {
                $state.go('projects.new');
            });

            Materialize.toast(supplier + " has been Re-Invited.", 3500);
        };

        //Attachment popup--start 

        $scope.attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
        <br />Limited to file(s) of 10MB each.\
	    <br /> Maximum 5 files can be uploaded.";
        $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
        $scope.attchmentMsg = $scope.attachmentMsg;

        var comingFrom;
        $scope.uploadTitle = "ADD ATTACHMENTS";
        $scope.showUploadPopup = false;
        $scope.adduploadCallback = function (e, popupComingfrom) {
            $scope.showUploadPopup = true;
            comingFrom = popupComingfrom;
        }
        $scope.hideUploadPopupCallback = function (e) {
            $scope.showUploadPopup = false;
            $scope.showCommentsPopupTab = true;
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
        //Attachment popup--end

        $scope.commentsPopupgTabUrl = "sourcing/rfx/views/sourcingCommentsPopupTab.html";
        $scope.showCommentsPopupTab = false;
        $scope.showCommentsPopupTabCallback = function (e) {
            $scope.showCommentsPopupTab = true;
        };
        $scope.commentsPopupOnHideTabCallback = function (e) {
            $scope.showCommentsPopupTab = false;

        };
        //$scope.tooltip = "Attachment 1" + "\n" + "Attachment 2" + "\n" + "Attachment 3" + "\n" + "Attachment 4" + "\n" + "Attachment 5";
        $scope.customStyle = {
            "textAlign": "left",
        };


        //Select comments Popup
        $scope.commentList = [{
            UserName: "Joseph Powell",
            UserType: "Internal Users and Suppliers",
            commentTxt: "rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui.",
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
        //commnets popup----end

        $scope.revokeSupplier = function (supplier, index) {
            $scope.sourcingCommentReadonly = true;
            var incre = index + ($scope.currentPage - 1) * $scope.rowsToShowOpts.selectedOption.size;
            $scope.supplierList[incre].invitedOn = false;
            $scope.supplierList[incre].reInvitedOn = false;
            $scope.supplierList[incre].revoked = true;

            var tempList = $scope.supplierList[incre];

            dbFactory.removeByIndex('supplier', 'title_idx', $scope.supplierList[incre].title);
            dbFactory.add('supplier', tempList).then(function (total) {
                $state.go('projects.new');
            });

            $scope.showCommentsPopupTab = true;
        };

        $scope.revokeSupplierReadonly = function () {
            $scope.showCommentsPopupTab = true;
            $scope.sourcingCommentReadonly = false;
        };
        // Start: Supplier Decline Event popup

        $scope.supplierDeclineCommentsPopup = false;
        $scope.declineCommentsPopupCallback = function () {
            $scope.supplierDeclineCommentsPopup = true;
        };
        $scope.declineCommentsPopupHideCallback = function (e) {
            $scope.supplierDeclineCommentsPopup = false;
        };
        // End: Supplier Decline Event popup

        $scope.deleteSupplier = function (supplier, index) {
            notification.notify(supplierDeleteConfirmation, function (response) {
                if (response.result == 'yes') {
                    var incre = index + ($scope.currentPage - 1) * $scope.rowsToShowOpts.selectedOption.size;

                    dbFactory.removeByIndex('supplier', 'title_idx', $scope.supplierList[incre].title).then(
                        function () {
                            if ($scope.supplierList.length <= 0)
                                $scope.supplierData = false;
                        });
                    $scope.supplierList.splice(incre, 1)
                    Materialize.toast(supplier + " has been deleted.", 3500);
                    storeService.set('supplierCount', $scope.supplierList.length);
                    PPSTService.setSupplierFlag(false);
                }
            });
        };

        $scope.pricesheetList = [
            {
                "title": "Price sheet 01",
                "createdOn": "20/07/2016 13:40",
                "type": "Material"
            },
            {
                "title": "Price sheet 02",
                "createdOn": "14/05/2016 08:45",
                "type": "Material"
            },
            {
                "title": "Price sheet 03",
                "createdOn": "06/10/2016 12:30",
                "type": "Material"
            },
            {
                "title": "Price sheet 04",
                "createdOn": "14/05/2016 08:45",
                "type": "Material"
            },
            {
                "title": "Price sheet 05",
                "createdOn": "06/10/2016 12:30",
                "type": "Material"
            },
            {
                "title": "Price sheet 06",
                "createdOn": "06/10/2016 12:30",
                "type": "Material"
            },
            {
                "title": "Price sheet 07",
                "createdOn": "06/10/2016 12:30",
                "type": "Material"
            }
        ];
        $scope.pricesheetListForPreview = [];

        dbFactory.all('pricesheet', 'title_idx').then(
            function (pricesheet) {
                for (var i = 0; i < pricesheet.length; i++) {
                    $scope.pricesheetList.push({
                        "title": pricesheet[i].title,
                        "description": pricesheet[i].description,
                        "id": pricesheet[i].id,
                        "createdOn": "12 Jan 2016 15:40",
                        "type": pricesheet[i].type,
                        "multiLineBidding": pricesheet[i].multiLineBidding
                    });
                }
            }
        );
        // End: Data Storage and retreival

        //email notification popup
        $scope.emailNotifyPopupUrl = "project/ppst/views/popupSupplierInvite.html";

        $scope.emailNotifyCallback = function (e, index) {
            $scope.supplierTitle = e;
            $scope.supplierInvitedIndex = index;
            $scope.emailNotify = true;
        };

        $scope.emailNotifyOnHideCallback = function () {
            $scope.emailNotify = false;
        };

        $scope.showpreviewPopup = false;
        $scope.popupPreviewInPopup = function (e) {
            $scope.showpreviewPopup = true;
            $scope.emailNotify = false;
        };

        $scope.previewPopupOnHideCallback = function () {
            $scope.showpreviewPopup = false;
            $scope.emailNotify = true;
        };

        //Secondary Contacts Pop up
        $scope.secondaryContactsRole = [
            { "title": "Primary Responder" },
            { "title": "Collaborator 1" },
            { "title": "Viewer 1" }
        ];

        $scope.showSecondaryContactsPopup = false;

        $scope.showSecondaryContactsPopupCallback = function (index) {
            var foundItem = $filter('filter')($scope.supplierList, { title: $scope.supplierList[index].title }, true)[0];

            //get the index
            $scope.index = $scope.supplierList.indexOf(foundItem);

            for (var i = 0; i < $scope.supplierList[$scope.index].secondaryContact.length; i++) {
                $scope.contactChecked.push({ "isChecked": $scope.supplierList[$scope.index].secondaryContact[i].check });
            }

            $scope.checkedStatus = $scope.contactChecked;

            $scope.showSecondaryContactsPopup = true;
        };

        $scope.onSecondaryContactsPopupHide = function () {
            $scope.showSecondaryContactsPopup = false;
            $scope.contactChecked = [];
        };
        //End of Secondary contacts pop up

        //emailer popup
        $scope.emailer = "shared/popup/views/popupEmailer.html";
        $scope.emailerPopup = false;
        $scope.emailerPopupCallback = function (e) {
            $scope.showSecondaryContactsPopup = false;
            $scope.emailerPopup = true;
        };
        $scope.emailerPopupHideCallback = function (e) {
            $scope.emailerPopup = false;
            $scope.showSecondaryContactsPopup = true;
        };

        $scope.uploadCallFrmEmail = function () {
            $scope.emailerPopup = false;
            $scope.showSecondaryContactsPopup = false;
            $scope.showAddAttachmentPopup = true;
        }

        // Start: Add Attachment popup
        var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.<br />Limited to file(s) of 10MB each.\<br /> Maximum 5 files can be uploaded.";
        $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);

        $scope.addAttachmentPopupUrl = "shared/popup/views/popupUploadDoc.html";
        $scope.showAddAttachmentPopup = false;
        $scope.addAttachmentPopupCallback = function () {
            $scope.uploadTitle = "ADD ATTACHMENT";
            $scope.uploadTitleContent = "Upload Attachment";
            $scope.showAddAttachmentPopup = true;
        };
        $scope.hideaddAttachmentPopupUrlCallback = function () {
            $scope.showAddAttachmentPopup = false;
            $scope.emailerPopup = true;
        };
        // End: Add attachment popup

    };

    //Audit Logs
    function auditLogsCtrlFunc($scope, $http, $state, $stateParams, $rootScope, $location, $timeout) {


        $scope.returnToPage = function () {
            $state.go('projects.new');
        }

        $scope.totalDisplayed = 10;
        $scope.loadMore = function () {
            $scope.showLineLoader = true;
            $timeout(function () {
                $scope.showLineLoader = false;
                $scope.totalDisplayed += 7;
            }, 2000);
        }
        $scope.lineLoaderFlag = {
            message: "",
            center: true,
            plain: true
        };
        $scope.showLineLoader = false;
        $scope.$on('showContractLinesLoader', function () {

        });




        $scope.events = [{ "name": "Updation", "isSelect": true }, { "name": "Notification", "isSelect": false }, { "name": "Workflow Events", "isSelect": false }, { "name": "Attachments", "isSelect": false }, { "name": "Milestones", "isSelect": false }];
        $scope.userTypes = [{ "name": "Author", "isSelect": false }, { "name": "Co-Author", "isSelect": false }, { "name": "Team Member", "isSelect": false }, { "name": "System", "isSelect": false }, { "name": "Supplier", "isSelect": false }];
        $scope.users = [{ "name": "Gaurav", "isSelect": false }, { "name": "Buyer User 2", "isSelect": false }, { "name": "Supplier User 1", "isSelect": false }, { "name": "Supplier User 2", "isSelect": false }, { "name": "System", "isSelect": false }, { "name": "Gaurav Paneri", "isSelect": false }, { "name": "John Doe", "isSelect": false }];





        $scope.auditTrail = [
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Project Owner", "username": "Pallav Thakker", "projectPhase": "Ideation", "actionPerformed": "Project Creation", "oldValue": "--", "newValue": "Project Name", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Co-Author", "username": "Dilip Yadav", "projectPhase": "Ideation", "actionPerformed": "Document Status Changed", "oldValue": "Approval Required", "newValue": "Approval Pending", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Full Control User", "username": "Pooja Patel", "projectPhase": "Execution", "actionPerformed": "Project Status Changed", "oldValue": "Active", "newValue": "On Hold", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Administrator", "username": "Suraj Singh", "projectPhase": "Ideation", "actionPerformed": "Forward Phase Change", "oldValue": "Ideation", "newValue": "Execution", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Project Owner", "username": "Pallav Thakker", "projectPhase": "Realization", "actionPerformed": "Change Ownership", "oldValue": "Pallav Thakker", "newValue": "Suraj Singh", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Administrator", "username": "Suraj Singh", "projectPhase": "Execution", "actionPerformed": "Savings Type (Impact) Changed", "oldValue": "Rebate (One Time First Month) | Signing Bonus (One Time Last Month)", "newValue": "Cost Avoidance (Recurring) | Cost Reduction (Recurring)", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Project Owner", "username": "Pallav Thakker", "projectPhase": "Ideation", "actionPerformed": "Project Creation", "oldValue": "--", "newValue": "Project Name", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Co-Author", "username": "Dilip Yadav", "projectPhase": "Ideation", "actionPerformed": "Document Status Changed", "oldValue": "Approval Required", "newValue": "Approval Pending", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Full Control User", "username": "Pooja Patel", "projectPhase": "Execution", "actionPerformed": "Project Status Changed", "oldValue": "Active", "newValue": "On Hold", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Administrator", "username": "Suraj Singh", "projectPhase": "Ideation", "actionPerformed": "Forward Phase Change", "oldValue": "Ideation", "newValue": "Execution", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Project Owner", "username": "Pallav Thakker", "projectPhase": "Realization", "actionPerformed": "Change Ownership", "oldValue": "Pallav Thakker", "newValue": "Suraj Singh", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { "date": "5/28/2015  12:49:53 AM", "timeZone": "EST", "userRole": "Administrator", "username": "Suraj Singh", "projectPhase": "Execution", "actionPerformed": "Savings Type (Impact) Changed", "oldValue": "Rebate (One Time First Month) | Signing Bonus (One Time Last Month)", "newValue": "Cost Avoidance (Recurring) | Cost Reduction (Recurring)", "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },

        ]

        $scope.auditLog = [
               {
                   title: "Date",
                   filter: true,
                   showFilterText: "Filter"
               },
               {
                   title: "Time Zone"
               },
               {
                   title: "User Role",
                   filter: true,
                   showFilterText: "Filter",
                   data: [
                       {
                           "label": "Project Owner",
                           "isSelected": false
                       },
                       {
                           "label": "Co-Author",
                           "isSelected": false
                       },
                       {
                           "label": "Administrator",
                           "isSelected": false
                       },
                       {
                           "label": "Full Control User",
                           "isSelected": false
                       },
                       {
                           "label": "System",
                           "isSelected": false
                       }
                   ],
               },
               {
                   title: "Username",
                   filter: true
               },
               {
                   title: "Project Phase",
                   filter: true,
                   showFilterText: "Filter",
                   data: [
                      {
                          'label': 'Ideation',
                          "isSelected": false
                      },
                      {
                          'label': 'Execution',
                          "isSelected": false
                      },
                      {
                          'label': 'Realization',
                          "isSelected": false
                      }
                   ],
               },
               {
                   title: "Action Performed"
               },
               {
                   title: "Old Value"
               },
               {
                   title: "New Value"
               },
               {
                   title: "Notes"
               }
        ]


        $scope.showFilterText = "Filter";

        $scope.applyFilterFn = function (item) {
            if (item.title == "Date") {
                if (item.fromDate == "" && item.toDate == "") {
                    item.showFilterText = "Filter";
                    item.isApplyFilter = false;
                }
                else {
                    item.showFilterText = "Filtered between " + item.fromDate + " and " + item.toDate;
                    item.isApplyFilter = true;
                }
            }

            else {
                var count = 0;
                for (var i = 0; i < item.data.length; i++) {
                    if (item.data[i].isSelected == true) {
                        item.isApplyFilter = true;
                        count++;
                        if (count == 1) {
                            item.showFilterText = "Filtered By " + item.data[i].label;
                        }
                        else if (count >= 2) {
                            item.showFilterText = "Multiple filters applied.";
                            break;
                        }
                    }
                    else if (count == 0) {
                        item.showFilterText = "Filter";
                        item.isApplyFilter = false;
                    }

                }

            }



        }
    }

})(angular);

