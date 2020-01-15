(function () {
    'use strict';
    angular.module('SMART2')
    .controller('MilestonesDetailsCntrl', ['$scope', '$filter', 'PPSTService', 'notification', '$timeout','$sce', 'dbFactory', 'trackStatusService', milestonesDetailFN]);

    // Controller function
    function milestonesDetailFN($scope, $filter, PPSTService, notification, $timeout, $sce , dbFactory, trackStatusService) {
        // Toast message on save and creation
        function showToastMsg(a_msg) {
            Materialize.toast(a_msg, 3500);
        }

        var deleteMsg = "Are you sure you want to delete selected milestones";
        var globalData = {},
            delConfirm = {
                type: "confirm",
                message: '<p class="left-align">' + deleteMsg + '</p>',
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
            },
            mileSeleForBulkEdit = [],
            activitySeleForBulkEdit = [];
        $scope.showAlertBar = true;
        // Open track status
        $scope.trackStatusPopup = false;
        $scope.showTrackStatus = function () {
            $scope.trackStatusPopup = true;
        }
        $scope.trackStatusOnHideCallback = function () {
            $scope.trackStatusPopup = false;
        }
        $scope.fileDownLoad = function (a_data) {
            console.log("File download callback is working", a_data);
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
            }).catch(function (err) {
                console.error("error fecthing tracj status data");
            });
        }
        loadTrackstatusData();
        // Track status ends here
        $scope.addEditActivityAssignee = { // Activities assignee and date model variable
            "assignedTo": {},
            "activityBegins": {},
            "activityDueBy": {}
        };
        // unique ID generator
        var uniqueIDGenerator = function () {
            var d = new Date().getTime();
            var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uniqueID;
        };
        // Edit add popup header
        $scope.popupHeader = "ADD MILESTONE";
        $scope.activityPopupHeader = "ADD ACTIVITY";

        $scope.isActiveTable = true;
        $scope.filtersGroup = [];

        $scope.alertBarMessage = "Milestones are being configured. Please check after some time.";

        $scope.dueByOptions = [{
            "code": "prepone",
            "name": "Prepone"
        }, {
            "code": "postpone",
            "name": "Postpone"
        },
        {
            "code": "date",
            "name": "Date"
        }];
        $scope.selectedDueBy = { "code": "prepone", "name": "Prepone" };

        $scope.dueByChangeCallback = function (selectedValue) {
            $scope.selectedDueBy = selectedValue;
        }

        $scope.dueOptions = [{
            "code": "days",
            "name": "Days"
        }, {
            "code": "months",
            "name": "Months"
        }];
        $scope.selectedDueOption = { "code": "days", "name": "Days" };

        $scope.daysCount = { "daysmonthsCount": "" };

        $scope.onChangeDueOption = function (selectedDueOption) {
            $scope.selectedDueOption = selectedDueOption;
        };
        $scope.statusOptions = [{
            "code": "tobeachieved",
            "name": "To Be Achieved"
        }, {
            "code": "achieved",
            "name": "Achieved"
        }];
        
        
        $scope.statusDropdownConfig = {
            dismissible: false
        };
        $scope.activityProgressOptions = [{
            "code": "notstarted",
            "name": "Not Started"
        }, {
            "code": "inprogress",
            "name": "In Progress"
        },{
            "code": "completed",
            "name": "Completed"
        }];
        $scope.selectedActivityProgress = {};
        $scope.currentActivityProgress = {};
        $scope.currentActivityProgressPerc = "";
        $scope.setActivityStatus = function(actStatus) {
            if(actStatus === "Completed" || actStatus === "100") {
                $scope.currentActivityProgress = { "code": "completed", "name": "Completed" };
            }
            if (actStatus === "Not Started") {
                $scope.currentActivityProgress = { "code": "notstarted", "name": "Not Started" };
            }
            if (parseInt(actStatus) < 100 && parseInt(actStatus) > 0) {
                $scope.currentActivityProgress = { "code": "inprogress", "name": "In Progress" };
                $scope.currentActivityProgressPerc = actStatus;
            }
            $scope.selectedActivityProgress = $scope.currentActivityProgress;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        };

        // $scope.onChangeActivityStatus = function(selectedActivityProgress) {
        //     $scope.selectedActivityProgress1 = selectedActivityProgress;
        // };

        $scope.updateActivityStatus = function(itemId, selectedActivityProgress){
            if(selectedActivityProgress.code === "notstarted"){
                $scope.completionStatus[itemId] = "";
            }
            if(selectedActivityProgress.code === "completed"){
                $scope.completionStatus[itemId] = "100";
            }
        };
        $scope.resetActivityStatus = function(itemId){
            if ($scope.currentActivityProgress.code === "notstarted") {
                $scope.selectedActivityProgress = $scope.currentActivityProgress;
                $scope.completionStatus[itemId] = "";
            }
            if($scope.currentActivityProgress.code === "completed"){
                $scope.selectedActivityProgress = $scope.currentActivityProgress;
                $scope.completionStatus[itemId] = "100";
            }
            else {
                $scope.selectedActivityProgress = $scope.currentActivityProgress;
                $scope.completionStatus[itemId] = $scope.currentActivityProgressPerc;
            }
        };

        $scope.update = function (array,index) {
            if (!$scope.changeModel) {
                $scope.completionStatus[index] = array[index];
                $scope.changeModel = false;
            }
        };
        $scope.setTrue = function () {
            $scope.changeModel = true;
        };

        $scope.dropdownHide = function () {
            console.log("Comes Here");
        };

        $scope.getInitialValue = function (array, index) {
            $scope.changeModel = false;
            $scope.previousElement[index.id] = array[index.id];
        };
        $scope.selectedStatusOption = {};
        $scope.onChangeStatusOption = function (statusOption) {
            $scope.selectedStatusOption = statusOption;
            if (statusOption.code === "achieved")
                $scope.editBulkMilestone.achieved = true;
            else
                $scope.editBulkMilestone.achieved = false;
        };

        // Read milestone data
        function readMilestoneData() {
            var url = [{ method: 'get', url: "project/ppst/models/milestonesData.json" }],
                summaryDataTemp = [];
            PPSTService.getJSONData(url).then(function (response) {
                $scope.filtersGroup = response[0].data;
                detailedDataShow();
            }).catch(function (err) {
            });
        }
        readMilestoneData();
        $scope.expandCollapse = function (state, position) {
            var len = $scope.filtersGroup.length;
            for (var indx = 0; indx < len ; indx++) {
                $scope.filtersGroup[indx].show = false;
            }
            $scope.filtersGroup[position].show = state;

        }

        function genericFilter(a_arr, a_data, a_key) {
            if (Object.keys(a_data).length === 0 && a_data.constructor === Object) {
                return { returnItem: $scope.filtersGroup[0].data[0], position: 0 };
            }
            var returnItem = '',
                foundPos = 0;
            for (var indx = 0; indx < a_arr.length; indx++) {
                a_arr[indx].data.filter(function (item) {
                    if (item[a_key] === a_data[a_key]) {
                        returnItem = item;
                        foundPos = indx;
                        return 0;
                    }
                });
            }
            return { returnItem: returnItem, position: foundPos };
        }
        $scope.activityAssignee = function (a_data, a_id) {
            $scope.setFocusOnAssignee(a_id);
        }
        $scope.selectedMilestoneData = { 'selected': {}, 'dueBy': "" };//[];
        //$scope.milestoneDueBy = { };
        function detailedDataShow() {
            var selectedMilestone = PPSTService.getSelectedMilestone();
            var tData = genericFilter($scope.filtersGroup, selectedMilestone, 'id');
            $scope.detailedItemData = tData.returnItem;
            globalData['phaseName'] = $scope.filtersGroup[0].phaseName;
            globalData['selectedIndex'] = { 'index': 0 };
            showSelectedAct($scope.detailedItemData.activities);
            showMileSelectedModel($scope.detailedItemData); // to update model variables
            $scope.expandCollapse(true, tData.position);
        }

        $scope.filterAccordian = function (a_data) {
            a_data.show = !a_data.show;
        }
        // To show detailed data
        $scope.showDetailedData = function (a_data, phase, index) {
            $scope.detailedItemData = a_data;
            globalData['phaseName'] = phase;
            globalData['selectedIndex'] = { 'index': index };
            if ($scope.detailedItemData.hasOwnProperty('activities') && $scope.detailedItemData.activities.length > 0) {
                showSelectedAct($scope.detailedItemData.activities);
            } else {
                //show empty state activity
                showHideActEmptyState(true);
            }
            showMileSelectedModel($scope.detailedItemData); // to update model variables
            $scope.expColAllActivitiesCnt('collapseAll');
        }


        $scope.status = {
            "displaytext": "Assigned to",
            "selectedoption": { "name": "Pooja Patel", "isdisabled": false, "description": "Assigned to Pooja Patel", "approved": true, "email": "pooja.patel@gep.com" },
            "options": [
				{ "name": "Pallav", "isdisabled": true, "description": "This supplier in disqualified and cannot be included for any future RFP, bidding and other activities. Limit this content to 2 lines", "approved": true },
				{ "name": "Satyendra K", "isdisabled": false, "description": "This is disqualified", "approved": true },
				{ "name": "Rahul Newton", "isdisabled": false, "description": "This is approval pending", "approved": true }
            ]
        };
        $scope.selectTypeOption = {
            "name": "Assigned to",
            "selectiontext": "Pooja Patel"
        };
        // show open close accordian for actiivty
        $scope.togleActivityExpansion = function (actIndx, boolean) {
            var tmpArr = [];
            var boolValue = $scope.detailedItemData.activities[actIndx]['showExpanded'];
            $scope.detailedItemData.activities[actIndx].showExpanded = (boolValue) ? false : true;
            tmpArr = $scope.detailedItemData.activities.filter(function (item) {
                if (item.showExpanded === true) {
                    return item;
                }
            });
            if (tmpArr.length === $scope.detailedItemData.activities.length) {
                $scope.showExpanded = true;
            } else {
                $scope.showExpanded = false;
            }
            return false;
        }

        // Expand collapse all activities
        $scope.expColAllActivitiesCnt = function (a_str) {
            var tmpArr = [],
                isExpanded = (a_str === 'expandAll') ? true : false;
            $scope.showExpanded = isExpanded;
            $scope.detailedItemData.activities.forEach(function (item) {
                item.showExpanded = isExpanded;
                tmpArr.push(item);
            });
            $scope.detailedItemData.activities = tmpArr;
            //$scope.showExpanded = (a_str === 'expandAll') ? true : false;
            //$scope.showExpanded = isExpanded;
            
        }
    
        // Show less show more
        var screenWidth = screen.width;
        $scope.maxLength = 0;
        switch (screenWidth) {
                case (screenWidth == 1920):

                    $scope.maxLength = 184;
                    break;
            
            case (screenWidth >= 1500):
                    $scope.maxLength = 140;
                    break;
            
            case (screenWidth < 1500):
                $scope.maxLength = 127;
                break;
            

        }
        //if (screen.width >= 1800) {
        //    $scope.maxLength = 184;

        //}
        //else if(screen.width >= 1500)
        //{
        //    $scope.maxLength = 140;
        //}
        //else
        //    $scope.maxLength = 127;
        $scope.readMore = false;
        $scope.readMoreActivity = false;
        $scope.showLess = function (data) {
            if (data === 'phaseLevel') {
                $scope.readMore = false;
            }
            if (data === 'activity') {
                $scope.readMoreActivity = false;
            }
        }
        $scope.showMore = function (data) {

            if (data === 'phaseLevel') {
                $scope.readMore = true;
            }
            if (data === 'activity') {
                $scope.readMoreActivity = true;
            }
        }
        $scope.milestoneStatusOptions = [
            {
                "code": "true",
                "name": "Achieved"
            },
            {
                "code": "false",
                "name": "To Be Achieved"
            }
        ];
        // Toggle switch 
        $scope.showAchievedMilePopup = false; // to show hide the achieved pending milestone popup
        $scope.togglePendingStatus = function (a_data) {
            if (a_data.achieved.code === "true") {
                //$scope.achievedCommentData.achievedDate = new Date().getTime();
                resetAttchComment();
                if (!$scope.showBulkEditMilestone)
                    $scope.showAchievedMilePopup = true;
                    a_data.progressStatus.completion = "Yes"
                    $scope.achievedText = "on " + $filter('date')(new Date(), 'dd/MM/yyyy');
            } else {
                // reset the model
                a_data.progressStatus.completion = "No"
                $scope.achievedText = "";
            }

            //return $scope.achievedDate;
        }
        // Data for adding comment and attachment
        $scope.achievedCommentData = {
            "achievedDate": getCurrTimestamp(),
            "achievedComment": "",
            "attachments": [],
            "commentValid": false,
            "dateValid": false
        }

        function validateAchievedData(a_data) {
            console.log('a_data', a_data);
            $scope.achievedCommentData.commentValid = true; // start inline validation
            $scope.achievedCommentData.dateValid = true;
            var returnThis = false;
            if (a_data.achievedComment !== "" && a_data.achievedDate != "") {
                returnThis = true;
            }
            return returnThis;
        }
        // save the added attachment and comments
        $scope.addAttachmentComment = function (a_data, a_attachments) {
            var isValidData = validateAchievedData(a_data);
            if (isValidData) {
                $scope.achievedCommentData["attachments"] = getAttchmentsSelected(a_attachments);
                // update the comment model data in milestone main page
                $scope.achievedCommentDataCopy = a_data;
                $scope.achivedDate = a_data.achievedDate;
                $scope.achievedText = "on " + a_data.achievedDate;
                $scope.detailedItemData.comment.commentMsg = a_data.achievedComment;
                $scope.showAchievedMilePopup = false;
            } else {

            }

        }
        function resetAttchComment() {
            $scope.achievedCommentData = { // reset earlier data
                "achievedDate": getCurrTimestamp(),
                "achievedComment": "",
                "attachments": []
            };
            $scope.attachmentAddedAchieved = false;
            resetAttachmentPopup();
        }
        // On cancel of attachment
        $scope.cancelAttachmentComment = function () {
            $scope.detailedItemData.achieved = false;

            $scope.showAchievedMilePopup = false;
            //resetAttachmentPopup();
            $scope.showAttchPopupAchieved = false; // to show hide attachment popup
            //$scope.attachmentAddedAchieved = false; // show hide attachment table or  text
            //resetAttchComment();
            $scope.achievedText = "";
        }

        $scope.onHideAchievedPopup = function () {
            $scope.cancelAttachmentComment();
        }
        function getCurrTimestamp() {
            return new Date().getTime();
        }
        // To add attachment
        $scope.showAttchPopupAchieved = false; // to show hide attachment popup
        $scope.attachmentAddedAchieved = false; // show hide attachment table or  text
        $scope.addAttachmentsAchieved = function () {
            resetAttachmentPopup(); // reset the popup
            $scope.showAchievedMilePopup = false; // Hide first popup
            $scope.showAttchPopupAchieved = true;
            $scope.attachmentType = "achievedMilestone";
        }
        // hide callback for attachment popup
        $scope.hideAttachPopupAchieved = function () {
            $scope.showAttchPopupAchieved = false;
            $scope.showAchievedMilePopup = true;
            $scope.attachmentAddedAchieved = true; // to show the table for attachments
        }
        //Top level slide filter
        $scope.slideTopFilter = false;
        $scope.toggleDocumentFilter = function () {
            $scope.slideTopFilter = ($scope.slideTopFilter) ? false : true;
        }
        $scope.filterOptions = {
            "phases": [
                { "phaseName": "Ideation", "selected": false },
                { "phaseName": "Execution", "selected": false },
                { "phaseName": "Realization", "selected": false }
            ],
            "status": [
                { "statusName": "Not started", "selected": false },
                { "statusName": "In progress", "selected": false },
                { "statusName": "Achieved", "selected": false }
            ],
            "mandatory": [
                { "mandatory": "Mandatory", "selected": false },
                { "mandatory": "Non-mandatory", "selected": false },
                { "mandatory": "Achieved", "selected": false }
            ],
            "assignee": [
                { "assignee": "Assigned to me", "selected": false },
                { "assignee": "Satyendra Kumar", "selected": false },
                { "assignee": "Rahul Newton", "selected": false },
                { "assignee": "Yogesh B", "selected": false }
            ],
            "approvalStatus": [
                { "approvalStatus": "Approved", "selected": false },
                { "approvalStatus": "Approval pending", "selected": false },
                { "approvalStatus": "Approval Withdrawn", "selected": false }
            ]
        }

        $scope.importDocumentFilterTabData = [
	        {
	            "title": "Phases",
	            "contentUrl": "phases.html",
	            "active": true,
	            "htmlmode": true,
	            "tabsUrl": "phasesHeader.html"
	        },
            {
                "title": "Status",
                "contentUrl": "status.html",
                "active": false,
                "htmlmode": true,
                "tabsUrl": "statusHeader.html"
            },
            {
                "title": "Mandatory",
                "contentUrl": "mandatory.html",
                "active": false,
                "htmlmode": true,
                "tabsUrl": "mandatoryHeader.html"
            },
            {
                "title": "Assignee",
                "contentUrl": "assignee.html",
                "active": false,
                "htmlmode": true,
                "tabsUrl": "assigneeHeader.html"
            },
            {
                "title": "Approval Status",
                "contentUrl": "approvalStatus.html",
                "active": false,
                "htmlmode": true,
                "tabsUrl": "approvalStatusHeader.html"
            }
        ]
        // Filter for phase selection
        $scope.phaseCount = 0;
        $scope.statusCount = 0;
        $scope.mandatoryCount = 0;
        $scope.assigneeCount = 0;
        $scope.aStatusCount = 0;
        $scope.selectFilterItem = function (a_section, a_boolean) {
            switch (a_section) {
                case 'phases':
                    $scope.phaseCount = (a_boolean) ? ($scope.phaseCount + 1) : ($scope.phaseCount - 1);
                    enDisFilterBtn();
                    break;
                case 'status':
                    $scope.statusCount = (a_boolean) ? ($scope.statusCount + 1) : ($scope.statusCount - 1);
                    enDisFilterBtn();
                    enDisFilterBtn();
                    break;
                case 'mandatory':
                    $scope.mandatoryCount = (a_boolean) ? ($scope.mandatoryCount + 1) : ($scope.mandatoryCount - 1);
                    enDisFilterBtn();
                    break;
                case 'assignee':
                    $scope.assigneeCount = (a_boolean) ? ($scope.assigneeCount + 1) : ($scope.assigneeCount - 1);
                    enDisFilterBtn();
                    break;
                case 'approvalStatus':
                    $scope.aStatusCount = (a_boolean) ? ($scope.aStatusCount + 1) : ($scope.aStatusCount - 1);
                    enDisFilterBtn();
                    break;
            }
        }
        $scope.enableApplyBtn = true; // For apply filter

        function enDisFilterBtn(isReset) {
            var isDisabled = true;
            for (var key in $scope.filterOptions) {
                var tArr = $scope.filterOptions[key],
                    len = tArr.length;
                for (var indx = 0; indx < len; indx++) {
                    if (!isReset && tArr[indx].selected === true) {
                        isDisabled = false;
                        break;
                    }
                    if (isReset) {
                        tArr[indx].selected = false;
                    }
                }
                if (isDisabled === false) {
                    break;
                }
            }
            if (isDisabled === false) {
                $scope.enableApplyBtn = false;
            } else {
                $scope.enableApplyBtn = true;
            }
        }
        // Reset header filters
        $scope.filterResetHeader = function () {
            $scope.phaseCount = 0;
            $scope.statusCount = 0;
            $scope.mandatoryCount = 0;
            $scope.assigneeCount = 0;
            $scope.aStatusCount = 0;
            $scope.slideTopFilter = false;
            enDisFilterBtn(true);
        }
        // Select all checkboxes 
        $scope.selectAllPhaseItems = {
            'ischeck': false,
            "checkedAll": false
        };
        

        $scope.toggleAllPhaseItems = function (a_data) {
            var totMilestones = 0;
            var mainCount = $scope.filtersGroup.length;
            for (var indx = 0; indx < mainCount; indx++) {
                changeSelectionHeader(indx, a_data)
                var itemsCount = $scope.filtersGroup[indx].data.length;
                totMilestones += itemsCount;
                for (var counter = 0; counter < itemsCount; counter++) {
                    changeSelection(indx, counter, a_data);
                }
            }

            $scope.selectAllPhaseItems.checkedAll = a_data;
            
            if (a_data === false) {
                $scope.selectedMilestonesCnt = 0;
                mileSeleForBulkEdit = [];
            } else if (a_data === true) {
                $scope.selectedMilestonesCnt = totMilestones;
                bulEditAllMile(true); // Prepare data to be bulk edited
            }
        }

        function changeSelection(indx, count, isTrue) {
            if (isTrue && $scope.filtersGroup[indx].data[count]['isChecked'] == false) {
                $scope.filtersGroup[indx].data[count]['isChecked'] = isTrue;
                $scope.filtersGroup[indx].checkedCount++;
                $scope.selectedMilestonesCnt++;

            }
            else if (!isTrue && $scope.filtersGroup[indx].data[count]['isChecked'] == true) {
                $scope.filtersGroup[indx].checkedCount--;
                $scope.filtersGroup[indx].data[count]['isChecked'] = isTrue;
                $scope.selectedMilestonesCnt--;
            }
        }
        function changeSelectionHeader(indx, isTrue) {
            $scope.filtersGroup[indx]['isChecked'] = isTrue;
        }

        function prepDataBulkEdit(a_bool, a_data) {
            if (a_bool) {
                mileSeleForBulkEdit.push(a_data);
            } else if (a_bool === false) {
                mileSeleForBulkEdit = mileSeleForBulkEdit.filter(function (item) {
                    if (item.id != a_data.id) {
                        return item;
                    }
                });
            }
        }
        //Bulk edit activities
        function prepBulkEditActivity(a_bool, a_data) {
            if (a_bool) {
                activitySeleForBulkEdit.push(a_data);
            } else if (a_bool === false) {
                activitySeleForBulkEdit = activitySeleForBulkEdit.filter(function (item) {
                    if (item.id != a_data.id) {
                        return item;
                    }
                });
            }
        }
       
        // To show enable disable trash icon
        $scope.selectedMilestonesCnt = 0;
        
        $scope.selectedPhaseLevel = true;
        $scope.enableFlag = true;
        $scope.totalMilestones = 0;
        $scope.selectOneMilestone = function (a_boolean, a_allData) {
            
            var mainCount = $scope.filtersGroup.length;
            if ($scope.enableFlag) {
                for (var indx = 0; indx < mainCount; indx++) {
                    var itemsCount = $scope.filtersGroup[indx].data.length;
                    $scope.totalMilestones += itemsCount;
                }
                $scope.enableFlag = false;
            }
            var phaseItem = $filter('filter')($scope.filtersGroup, a_allData.phaseName, true)[0];
            //get the index
            var phaseItemIndex = $scope.filtersGroup.indexOf(phaseItem);
            var phaseLength = phaseItem.data.length;
            if (phaseItem.checkedCount == phaseLength)
                phaseItem.isChecked = true;

            if (a_boolean === false) {
                $scope.selectedMilestonesCnt--;
                phaseItem.checkedCount--;
            }
            else if (a_boolean === true) {
                $scope.selectedMilestonesCnt++;
                phaseItem.checkedCount++;
            }
            
            if ($scope.totalMilestones === $scope.selectedMilestonesCnt) {
                $scope.selectAllPhaseItems.checkedAll = true;
               
            } else if ($scope.selectedMilestonesCnt > 0) {
                $scope.selectAllPhaseItems.checkedAll = false;               
            }
            else
            {
                $scope.selectAllPhaseItems.checkedAll = false;
            }
            if (phaseLength === phaseItem.checkedCount){
                phaseItem.isChecked = true;
        }
            else if (phaseItem.checkedCount > 0 && phaseItem.checkedCount < phaseLength) {
                phaseItem.isChecked = false;
            }
            else {
                phaseItem.isChecked = false;
            }
            if ($scope.selectedMilestonesCnt > 1) {
                $scope.selectedPhaseLevel = false;
            } else {
                $scope.selectedPhaseLevel = true;
            }
        }
        
        $scope.selectAllSubItems = function (item) {
            var mainCount = $scope.filtersGroup.length;
            $scope.headerSelectedCount = 0;
            
            for (var index = 0; index < mainCount; index++) {
                if ($scope.filtersGroup[index].isChecked == true)
                    $scope.headerSelectedCount++;
            }
            if (item.isChecked == true) {
                
                for (var counter = 0; counter < item.data.length; counter++)
                {
                    if (item.data[counter].isChecked == false) {
                        item.data[counter].isChecked = true;
                        item.checkedCount++;
                        $scope.selectedMilestonesCnt++;
                    }
                }
            }
            else {
                
                for (var counter = 0; counter < item.data.length; counter++) {
                    if (item.data[counter].isChecked == true) {
                        item.data[counter].isChecked = false;
                        item.checkedCount--;
                        $scope.selectedMilestonesCnt--;
                    }
                }
                }
            
            if (mainCount === $scope.headerSelectedCount) {
                $scope.selectAllPhaseItems.checkedAll = true;
            }
            else {
                $scope.selectAllPhaseItems.checkedAll = false;
            }
            if ($scope.selectedMilestonesCnt > 1) {
                $scope.selectedPhaseLevel = false;
            } else {
                $scope.selectedPhaseLevel = true;
            }
        }
        // Selection of activities
        $scope.activities = {
            "selectAll": false
        }
        $scope.delActEnabled = true;
        $scope.cntSelActivity = 0;
        $scope.selectActivity = function (a_bool, a_dataSelected) {
            var selectedData = isCheckedItems($scope.detailedItemData.activities),
                len = selectedData.length;
            prepBulkEditActivity(a_bool, a_dataSelected);
            $scope.cntSelActivity = len;
            $scope.delActEnabled = (len > 0) ? false : true;

            //for select all activity checkbox to show selected/partially selectedd
            if (len === $scope.detailedItemData.activities.length) {
                $scope.activities.selectAll = true;
            } else {
                $scope.activities.selectAll = false;
            }

           
           

        }
        $scope.selectAllActivity = function (isAllSelected) {
            $timeout(function () {
                var activitesCount = $scope.detailedItemData.activities.length;
                $scope.cntSelActivity = activitesCount;
                for (var indx = 0; indx < activitesCount; indx++) {
                    $scope.detailedItemData.activities[indx]['isItemChecked'] = isAllSelected;
                }
                $scope.activities.selectAll = isAllSelected; // mocel update for select all activity
                allowActivityDel(isAllSelected);
                if (isAllSelected) {
                    prepDateLocal(true);
                } else {
                    activitySeleForBulkEdit = [];
                }

                if (isAllSelected === false) {
                    $scope.selectedActiveCnt = 0;
                    activitySeleForBulkEdit = [];
                } else if (isAllSelected === true) {
                    $scope.selectedActiveCnt = totMilestones;
                    bulEditAllMile(true); // Prepare data to be bulk edited
                }

            });

            
        }
        //All activity selected for bulk update
        function prepDateLocal(a_bool) {
            if (a_bool) {
                activitySeleForBulkEdit = [];
                activitySeleForBulkEdit = $scope.detailedItemData.activities;
            }

        }
        function allowActivityDel(a_bool) {
            $scope.delActEnabled = !a_bool;
        }
        // Activities filter options callout
        $scope.activityfilterOpt = {
            "status": [
                    {
                        "filterName": "Not started",
                        "modelData": false
                    },
                    {
                        "filterName": "In Progress",
                        "modelData": false
                    },
                    {
                        "filterName": "Achieved",
                        "modelData": false
                    }
            ],
            "mandatory": [

                {
                    "filterName": "Mandatory",
                    "modelData": false
                },
                {
                    "filterName": "Non-mandatory",
                    "modelData": false
                }
            ],
            "assignee": [
                {
                    "filterName": "Assigned to me",
                    "modelData": false
                }
            ],
            "commented": [
                {
                    "filterName": "Commented by me",
                    "modelData": false
                }
            ]
        };
        // Activity filter SelectionS
        $scope.appDisActFilter = true; // disable apply btn 
        $scope.filtered = "Filter";
        $scope.activityFilterChecked = function () {

            var count = 0;
            var isDisabled = true;
            $scope.appDisActFilter = true;
            for (var key in $scope.activityfilterOpt) {

                var len = $scope.activityfilterOpt[key].length;
                for (var indx = 0; indx < len; indx++) {

                    if ($scope.activityfilterOpt[key][indx].modelData === true) {
                        count++;
                        var checked = $scope.activityfilterOpt[key][indx].filterName;
                        isDisabled = false; // disable apply btn
                        break
                    }
                }
            }
            if (count == 1) {
                $scope.appDisActFilter = false;
                $scope.isApplyFilter = true;
                $scope.filtered = "Filtered By " + checked;
            }
            else if (count > 1) {
                $scope.appDisActFilter = false;
                $scope.isApplyFilter = true;
                $scope.filtered = "Multiple filters applied.";
            }
            else {
                $scope.filtered = "Filter";
                $scope.isApplyFilter = false;
                $scope.appDisActFilter = true;
            }
        }
        $scope.applyFiltering = function () {
            $scope.activityFilterChecked();
        }

        // Delete activities
        $scope.deleteActivities = function () {
            var msg = ($scope.activities.selectAll) ? 'all activities' : 'selected activity';
            deleteNotify(deleteActivities, false, 'Are you sure you want to delete ' + msg);
        }
        function deleteActivities() {
            $scope.detailedItemData.activities = filterDeletedActivity($scope.detailedItemData.activities);
            $scope.delActEnabled = true;
            if ($scope.detailedItemData.activities.length <= 0) {
                $scope.isEmptyActivity = true;
            } else {
                $scope.isEmptyActivity = false;
            }
        }

        // Generic delete notify
        function deleteNotify(callBack, param, a_deleteMsg) {
            delConfirm.message = '<p class="left-align">' + a_deleteMsg + '</p>';
            notification.notify(delConfirm, function (result) {
                if (result.result === 'yes') {
                    callBack(param);
                }
            });
        }

        $scope.delSeldMilestone = function (a_data) {

            deleteNotify(delSelMilestone, a_data, 'Are you sure you want to delete this milestone');
        }

        function delSelMilestone(a_data) {
            var len = $scope.filtersGroup.length;
            for (var indx = 0; indx < len; indx++) {
                $scope.filtersGroup[indx].data = filterDeletedActivity($scope.filtersGroup[indx].data, 'selectedActivity', a_data.id);
            }
            updateDetailData();
        }
        // Delete expanded activity one at a time
        $scope.deleteActivity = function (activityID) {
            deleteNotify(deleteActivity, activityID, 'Are you sure you want to delete this activity');
        }

        function deleteActivity(activityID) {
            $scope.detailedItemData.activities = filterDeletedActivity($scope.detailedItemData.activities,
                "expandedActivity", activityID);
        }
        // Delete on left side item selection
        function deleteMilestones() {
            var len = $scope.filtersGroup.length;
            for (var indx = 0; indx < len; indx++) {
                $scope.filtersGroup[indx].data = filterDeletedActivity($scope.filtersGroup[indx].data, "phaseLevelDeletion");
            }
            $scope.filtersGroup = $scope.filtersGroup.filter(function (item) {
                if (item.data.length > 0) {
                    return item;
                }
            });
            updateDetailData();
        }
        $scope.deletePhaseLevel = function () {
            var msg = ($scope.selectAllPhaseItems.checkedAll) ? 'all milestones' : 'selected milestone';
            deleteNotify(deleteMilestones, false, 'Are you sure you want to delete ' + msg);
        }

        function filterDeletedActivity(a_data, a_section, key) {
            var filteredData = '';
            if (a_section === "phaseLevelDeletion") {
                filteredData = a_data.filter(function (items) {
                    if (items.isChecked === false) {
                        return items;
                    }
                });
            } else if (a_section === "expandedActivity") {
                filteredData = a_data.filter(function (items) {
                    if (items.id != key) {
                        return items;
                    }
                });
            } else if (a_section === "selectedActivity") {
                filteredData = a_data.filter(function (items) {
                    if (items.id != key) {
                        return items;
                    }
                });
            } else {
                filteredData = a_data.filter(function (items) {
                    if (items.isItemChecked === false) {
                        return items;
                    }
                });
            }
            return filteredData;
        }

        function isCheckedItems(a_data, a_section) {
            var filteredData = [];
            if (a_section === "phaselevel") {
                filteredData = a_data.filter(function (items) {
                    if (items.isChecked === true) {
                        return items;
                    }
                });
            } else {
                filteredData = a_data.filter(function (items) {
                    if (items.isItemChecked === true) {
                        return items;
                    }
                });
            }

            return filteredData;
        }

        //update detail data i right panel.
        function updateDetailData() {
            var len = $scope.filtersGroup.length,
                hasItem = false;
            for (var indx = 0; indx < len; indx++) {
                var tmpData = $scope.filtersGroup[indx];
                if (tmpData.data.length > 0) {
                    $scope.detailedItemData = tmpData.data[0];
                    hasItem = true;
                    break;
                }
            }
            if (!hasItem) {
                $scope.detailedItemData = {};
                $scope.isEmptyState = true;
                $scope.$evalAsync();
                // Empty state scenario
            }
        }


        // Edit popup
        $scope.editData = { 'enableFormatting': false };//$scope.detailedItemData;

        $scope.editData['milestonePhases'] = [
            { "phaseName": "Ideation" },
            { "phaseName": "Execution" },
            { "phaseName": "Realization" }
        ];
        $scope.editData['assignees'] = [
            { "name": "Pooja Patel", "email": "pooja.patel@gep.com" },
            { 'name': 'Satyendra', "email": "satyendra.kumar@gep.com" },
            { 'name': 'Karthic', "email": "k.m@gep.com" },
            { 'name': 'Yogesh B', "email": "y.b@gep.com" },
            { 'name': "Pallav Thakkar", "email": "p.t@gep.com" }
        ];
        // On Assignee change
        $scope.mAssigneeChng = function () {
            $timeout(function () {
                changeAssignee($scope.editData.assignedTo, 'milestone');
            }, 100)
        }

        function changeAssignee(a_data, a_section) {
            var assignees = [];
            if (a_data) {
                assignees[0] = (a_data.email); // as multiselect false
                //a_data.forEach(function (item) {
                //    assignees.push(item.email);
                //});
                $timeout(function () {
                    if (a_section === 'activity') {
                        $scope.addEditActivityModel.existingData.email = assignees.join(', ');
                    } else if (a_section === 'milestone') {
                        $scope.editData.existingData.email = assignees.join(', ');
                    } else if (a_section === 'bulkEditMilestone') {
                        $scope.editBulkMilestone.email = assignees.join(', ');
                        $scope.disbaleUpdateBtn = false;
                    } else if (a_section === 'bulkEditActivity') {
                        $scope.editBulkActivity.email = assignees.join(', ');
                        $scope.disbaleUpdateBtn = false
                    }
                });
            }
        }
        $scope.mAssigneeChngActivity = function () {
            $timeout(function () {
                changeAssignee($scope.addEditActivityModel.assignedTo, 'activity');
            }, 500);
        }
        $scope.editMilestonePopup = false;
        $scope.toggleEditpopup = function (arg) {
            $scope.editMilestonePopup = true;
            $scope.setFocusOnAssignee(arg);
            return false;
        }
        var isEmptyStateMilestone = false;
        $scope.addEditMilestone = function (a_data, isEmptyState) {
            if (a_data) {
                $scope.popupHeader = "EDIT MILESTONE";
                $scope.editData['phaseModel'] = getRequiredObj($scope.editData.milestonePhases, globalData.phaseName, 'phaseName');
                //$scope.editData['assignedTo'] = [$scope.status.selectedoption];//getRequiredObj($scope.editData.assignees, a_data.assignedTo, 'name');//$scope.status.selectedoption;
                $scope.editData['assignedTo'] = { name: a_data.assignedTo, email: a_data.email };//[{ name: a_data .assignedTo, email : a_data.email}];
                changeAssignee($scope.editData.assignedTo, 'milestone');
            } else {
                $scope.attachmentAdded = false;
                $scope.popupHeader = "ADD MILESTONE";
                $scope.editData['phaseModel'] = {};
                $scope.editData['assignedTo'] = {};//[];
                $scope.editData.existingData.email = {};
                if (isEmptyState) {
                    isEmptyStateMilestone = true;
                } else {
                    isEmptyStateMilestone = false;
                }
            }
            $scope.editData['existingData'] = (a_data) ? a_data : {};
            $scope.editMilestonePopup = true;
            $scope.validateModel = PPSTService.setValidate($scope.validateModel, false);
        }
        $scope.onHideEditMilestone = function () {
            $scope.editMilestonePopup = false;
            $scope.validateModel = PPSTService.setValidate($scope.validateModel, false);
        }
        $scope.getValue = function (m) {
            $scope.editMilestonePopup = true;
        }
        function getRequiredObj(a_data, checkData, key) {
            var returnedData = {};
            returnedData = a_data.filter(function (obj) {
                if (obj[key] == checkData) {
                    return obj;
                }
            });

            return returnedData;
        }
        // Add edit activity popup
        $scope.showAddEditActivity = false;
        $scope.onHideAddEditActivity = function (e) {
            $scope.showAddEditActivity = false;
            $scope.validateActivity = PPSTService.setValidate($scope.validateActivity, false);
        }
        $scope.addEditActivityModel = {
            "assignees": [
                { "name": "Pooja Patel", "email": "pooja.patel@gep.com" },
                { 'name': 'Satyendra', "email": "satyendra.kumar@gep.com" },
                { 'name': 'Pallav', "email": "p.t@gep.com" },
                { 'name': 'Rahul N', "email": "r.n@gep.com" }
            ]
        };
        $scope.addEditActivityModel.assignedTo = {}; // single assignee selection
        var currentEditPosition = '';
        $scope.addEditActivity = function (a_data, index) {
            if (a_data) {
                $scope.activityPopupHeader = "EDIT ACTIVITY";
                $scope.addEditActivityModel.assignees.unshift({ name: a_data.assignedTo });
                $scope.addEditActivityModel.assignedTo = { name: a_data.assignedTo, email: a_data.email };
                //[{ name: a_data.assignedTo, email: a_data.email }];//[$scope.status.selectedoption]; //$scope.addEditActivityModel.assignees[0];//;
                currentEditPosition = index;
                changeAssignee($scope.addEditActivityModel.assignedTo, 'activity');
            } else {
                $scope.activityPopupHeader = "ADD ACTIVITY";
                $scope.addEditActivityModel.assignedTo = {};
                currentEditPosition = '';
                $scope.activityAttachmentAdded = false;
            }
            $scope.addEditActivityModel['existingData'] = (a_data) ? a_data : {};
            $scope.showAddEditActivity = true;
        }

        //Add Attachments
        $scope.attachmentAdded = false;
        $scope.activityAttachmentAdded = false;

        $scope.addAttachmentComplete = function () {
            if ($scope.attachmentType === "activity")
                $scope.activityAttachmentAdded = true;
            else if ($scope.attachmentType === "milestone")
                $scope.attachmentAdded = true;
        }

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
                 name: "Name of the attached file.pdf",
                 fileSize: "18 KB",
                 uploadDate: "12 April 2016",
                 createdBy: "Johnny Walker",
                 sharedWith: "Calvin Shawn",
                 isChecked: false
             },
             {
                 name: "Name of the attached file.docx",
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
            $scope.attachmentType = e;
            $scope.uploadTitle = "ADD ATTACHMENTS";
            $scope.showUploadPopup = true;
            $scope.editMilestonePopup = false;

            // Reset all scope data related to attachment popup
            $scope.fillpartial = false;
            $scope.attachmentSelected = false;
            $scope.selectAllAttach.checkedAll = false;
            countAttachList = 0;
        }
        $scope.addAttachmentsCallback = function (e) {
            $scope.attachmentType = e;
            //$scope.attachmentAdded = false;
            $scope.uploadTitle = "ADD ATTACHMENTS";
            $scope.showUploadAttachmentsPopup = true;
            $scope.showAddEditActivity = false;

            // Reset attchment popup model data
            $scope.fillpartial = false;
            $scope.attachmentSelected = false;
            $scope.selectAllAttach.checkedAll = false;
            countAttachList = 0;
        }
        $scope.hideUploadContractPopupCallback = function (e) {
            $scope.showUploadPopup = false;
            $scope.editMilestonePopup = true;
        }
        $scope.hideAttachmentsCallback = function (e) {
            $scope.showUploadAttachmentsPopup = false;
            $scope.showAddEditActivity = true;
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

            if (check) {
                countAttachList++;
            } else {
                countAttachList--;
            }
            //for (var i = 0; i < attachmentlength; i++) {
            //    if ($scope.attachments[i].isChecked == true) {
            //        countAttachList++;
            //    }
            //}

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
            else if (countAttachList > 0 && countAttachList < attachmentlength) {
                $scope.fillpartial = true;
            }
        };

        function showHideEditpopups(boolean) {
            if ($scope.attachmentType == 'activity') {
                $scope.showAddEditActivity = boolean;
            } else if ($scope.attachmentType == 'achievedMilestone') {
                $scope.showAchievedMilePopup = boolean;
            } else {
                $scope.editMilestonePopup = boolean;
            }
        }
        //DELETE LIST
        $scope.deleteAttachments = function () {

            showHideEditpopups(false); // Hide popup
            $timeout(function () {
                if (countAttachList != 0) {
                    var confi = {
                        type: "confirm",
                        message: "<p class='left-align'>Are you sure you want to delete selected attachments?</p>",
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
                    notification.notify(confi, function (response) {
                        //if (response.result == 'yes') {
                        //    var pricesheetlength = $scope.attachments.length,
                        //        incre, checkCounter = 0,
                        //        deletedPricesheets = [];
                        //    for (incre = 0; incre < pricesheetlength; incre++) {
                        //        if ($scope.attachments[incre].check) {
                        //            dbFactory.removeByIndex('pricesheet', 'title_idx', $scope.attachments[incre].title);
                        //            var deletedPricesheet = $scope.attachments.splice(incre, 1);
                        //            deletedPricesheets.push(deletedPricesheet);
                        //            pricesheetlength--; incre--;
                        //        }
                        //    }
                        //    checkErrorPricesheetCount();
                        //    if ($scope.allErrorPricesheetSelected && $scope.pricesheetHead.check && !$scope.fillpartial) {
                        //        $scope.pricesheetList = pricsheetWithoutError;
                        //    }
                        //    $scope.pricesheetHead.check = false;
                        //    $scope.fillpartial = false;
                        //    $scope.pricesheetSelected = false;
                        //    storeService.set('pricesheetCount', $scope.attachments.length);
                        //    if (deletedPricesheets.length > 1)
                        //        deletedPricesheetsTxt = deletedPricesheets[0][0].title + ' +' + (deletedPricesheets.length - 1) + ' more have';
                        //    else if (deletedPricesheets.length == 1)
                        //        deletedPricesheetsTxt = deletedPricesheets[0][0].title + ' has';
                        //    Materialize.toast(deletedPricesheetsTxt + " been deleted.", 3500);
                        //    //$scope.toggleSelectAll = true;
                        //}
                        var attahLen = $scope.attachments.length;
                        if (response.result == 'yes') {
                            for (var incre = 0; incre < attahLen; incre++) {
                                if ($scope.attachments[incre].isChecked == true) {
                                    //dbFactory.removeByIndex('pricesheet', 'title_idx', $scope.attachments[incre].title);
                                    var deletedPricesheet = $scope.attachments.splice(incre, 1);
                                    //deletedPricesheets.push(deletedPricesheet);
                                    attahLen--; incre--;
                                }
                            }
                            countAttachList = 0;
                            $scope.fillpartial = false;
                            showHideEditpopups(true); // re Open popup
                        } else {
                            showHideEditpopups(true); // re Open popup
                        }
                    });

                };
            }, 200);

        };

        // Bulk edit milestone
        $scope.editBulkMilestone = {
            'achieved': false,
            "assignedTo": {},
        }
        $scope.editBulkMilestone['assignedTo'] = {};
        $scope.bulkEditMilestoneHdr = "BULK EDIT";
        $scope.showBulkEditMilestone = false;
        $scope.editAssignee = false;
        $scope.editDueBy = false;
        $scope.editStatus = false;
        $scope.bulkEditMilestone = function (a_data, field) {
            $scope.editField = field;
            $scope.disbaleUpdateBtn = true;
            switch ($scope.editField) {
                case "assignee":
                    $scope.editAssignee = true;
                    $scope.editDueBy = false;
                    $scope.editStatus = false;
                    $scope.bulkEditMilestoneHdr = "CHANGE ASSIGNEE"
                    break;
                case "due date":
                    $scope.editDueBy = true;
                    $scope.editAssignee = false;
                    $scope.editStatus = false;
                    $scope.bulkEditMilestoneHdr = "CHANGE DUE DATE"
                    break;
                case "status":
                    $scope.editAssignee = false;
                    $scope.editDueBy = false;
                    $scope.editStatus = true;
                    $scope.bulkEditMilestoneHdr = "UPDATE STATUS"
                    break;
            }
            if (a_data === 'bulkEditActivity') {
                $scope.showBulkEditActivity = true;
            } else {
                $scope.showBulkEditMilestone = true;
            }

        }
        $scope.onOpenBlkEdtMile = function (a_data) {
            $scope.showBulkEditMilestone = (a_data === 'open') ? true : false;
        }
        // Hide poppup
        $scope.onHideBulEditMile = function (a_data) {
            if (a_data === 'bulkEditActivity') {
                $scope.showBulkEditActivity = false;
            } else {
                $scope.showBulkEditMilestone = false;
            }

        }
        // Bulk edit change email
        $scope.editBMilestone = function (a_data) {
            if (a_data === 'bulkEdit') {
                $timeout(function () {
                    changeAssignee($scope.editBulkMilestone.assignedTo, "bulkEditMilestone");
                }, 500);
            } else if (a_data === 'bulkEditActivity') {
                $timeout(function () {
                    changeAssignee($scope.editBulkActivity.assignedTo, "bulkEditActivity");
                }, 500);
            }
        }

        // Bulk edit activity
        $scope.editBulkActivity = {
            'achieved': false,
            'assignedTo': {},
            selectedEndDate: { "code": "prepone", "name": "Prepone" },
            selectedEndOption: { "code": "days", "name": "Days" },
            selectedStartOption: { "code": "days", "name": "Days" },
            selectedStartDate: { "code": "prepone", "name": "Prepone" },
            status:{}
        };
        $scope.bulkEditActivityHdr = "BULK EDIT";
        $scope.showBulkEditActivity = false;
        $scope.onOpenBulkEdtAct = function () {
            $scope.showBulkEditActivity = false;
        }
        $scope.switchBlkEditActPopup = function () {
            $scope.showBulkEditActivity = true;
        }
        // Form validation for milestone
        function validateFields() {
            var isEmpty = PPSTService.checkEmpty($scope.editData.assignedTo);
            $scope.editData.assignedTo = (isEmpty) ? "" : $scope.editData.assignedTo;
            $scope.validateModel = PPSTService.setValidate($scope.validateModel, true);
        }
        // Add new milestone
        $scope.validateModel = {
            "milestoneName": false,
            "phaseName": false,
            "dueBy": false,
            "assignedTo": false,
            "description": false
        };

        function getAttchmentsSelected(a_data) {
            var arr = [],
                len = a_data.length;
            for (var indx = 0; indx < len; indx++) {
                var tObj = a_data[indx];
                if (tObj.isChecked === true) {
                    arr.push({
                        "fileName": tObj.name
                    });
                }
            }
            return arr;
        }

        // Add new milestone
        $scope.addNewMilestone = function (a_data, a_attachments) {
            //validateFields();
            
            if (!validateJSON(a_data)) {
                return false;
            }
            $scope.enableFlag = true;
            var objSkeleton = {};
            if ($scope.filtersGroup.length <= 0) {
                objSkeleton.assignedTo = a_data.assignedTo.name;//a_data.assignedTo;
                objSkeleton['milestoneName'] = a_data.existingData.milestoneName;
                objSkeleton['dueBy'] = $filter('date')(a_data.existingData.dueBy, 'dd/MM/yyyy');//new Date(a_data.existingData.dueBy);
                objSkeleton['description'] = a_data.existingData.description;
                objSkeleton['email'] = a_data.existingData.email;
                objSkeleton['attachments'] = getAttchmentsSelected(a_attachments);
                emptyStateMilestone(objSkeleton, a_data.phaseModel[0].phaseName);
                $scope.editMilestonePopup = false;// close the popup
                return false;
            }
            objSkeleton = JSON.parse(JSON.stringify($scope.detailedItemData));
            objSkeleton.assignedTo = a_data.assignedTo.name;
            objSkeleton['milestoneName'] = a_data.existingData.milestoneName;
            objSkeleton['dueBy'] = $filter('date')(a_data.existingData.dueBy, 'dd/MM/yyyy');//new Date(a_data.existingData.dueBy);
            objSkeleton['description'] = a_data.existingData.description;
            objSkeleton['email'] = a_data.existingData.email;
            objSkeleton['attachments'] = getAttchmentsSelected(a_attachments);
            var phaseName = a_data.phaseModel[0].phaseName;
            for (var indx = 0; indx < $scope.filtersGroup.length; indx++) {
                var t = $scope.filtersGroup[indx];
                if (t.phaseName === phaseName) {
                    if ($scope.popupHeader === "EDIT MILESTONE") {
                        var position = getUpdatePosNum($scope.filtersGroup[indx].data, objSkeleton);
                        $scope.filtersGroup[indx].data[position] = objSkeleton;
                        showMileSelectedModel(objSkeleton);
                    } else {
                        objSkeleton['activities'] = [];
                        $scope.filtersGroup[indx].data.push(objSkeleton);
                    }

                }
            }
            $scope.editMilestonePopup = false;
            showToastMsg('Milestone saved');
        }

        function validateJSON(obj) {
            var retunThis = true;

            for (var key in obj) {
                if (key === 'existingData') {
                    if (retunThis && !obj[key].hasOwnProperty('milestoneName') || !obj[key].hasOwnProperty('email') || !obj[key].hasOwnProperty('dueBy')) {
                        retunThis = false;
                    }
                    if (!obj[key].hasOwnProperty('description') || !obj["existingData"].description != "") {
                        retunThis = false;
                    }
                }
                if (retunThis && key === 'phaseModel') {
                    if (!obj.phaseModel[0]) {
                        retunThis = false;
                    }
                }
                if (retunThis && key === 'assignedTo' && !obj[key].hasOwnProperty('name')) {
                    retunThis = false;
                }

            }
            return retunThis;
        }

        // Form validation
        function validateActFields() {
            var isEmpty = PPSTService.checkEmpty($scope.addEditActivityModel.assignedTo);
            $scope.addEditActivityModel.assignedTo = (isEmpty) ? "" : $scope.addEditActivityModel.assignedTo;
            $scope.validateActivity = PPSTService.setValidate($scope.validateActivity, true);
        }
        // Add new milestone
        $scope.validateActivity = {
            "activityName": false,
            "dueBy": false,
            "assignedTo": false,
            "beginsBy": false,
            "description": false
        };
        $scope.addNewActivity = function (a_data, a_attachments) {
            validateActFields();
            var a_data2 = JSON.parse(JSON.stringify(a_data));
            if (!validateNewAct(a_data2)) {
                return false;
            }
            var objSkeleton = {};//PPSTService.newMilestoneSkeleton.activities[0];
            objSkeleton.assignedTo = a_data.assignedTo.name;
            objSkeleton.activityName = a_data.existingData.activityName;
            objSkeleton.dueBy = new Date(a_data.existingData.dueBy);
            objSkeleton.beginDate = new Date(a_data.existingData.beginDate);
            objSkeleton.description = a_data.existingData.description;
            objSkeleton.email = a_data.existingData.email;
            objSkeleton["attachments"] = getAttchmentsSelected(a_attachments);//a_data.existingData.email;
            objSkeleton.completionStatus = 0;
            var len = $scope.filtersGroup.length,
                index = globalData.selectedIndex.index;
            for (var indx = 0; indx < len; indx++) {
                if ($scope.filtersGroup[indx].phaseName === globalData.phaseName) {
                    if ($scope.activityPopupHeader === 'EDIT ACTIVITY') {
                        var positionNum = getUpdatePosNum($scope.filtersGroup[indx].data, $scope.detailedItemData);
                        var dataUpdate = updateActivity($scope.filtersGroup[indx].data[positionNum].activities[index], objSkeleton);
                        $scope.filtersGroup[indx].data[positionNum].activities[index] = dataUpdate;
                        showSelectedAct(false, dataUpdate);
                    } else {
                        objSkeleton.id = uniqueIDGenerator();
                        if (!$scope.filtersGroup[indx].data[index].hasOwnProperty('activities')) {
                            $scope.filtersGroup[indx].data[index].activities = [];
                        }
                        $scope.filtersGroup[indx].data[index].activities.push(objSkeleton);
                        showSelectedAct(false, objSkeleton);
                        showHideActEmptyState(false);
                    }
                }
            }
            $scope.completionStatus[objSkeleton.id] = 0;
            $scope.showAddEditActivity = false;
        }

        // To show hide empty state of activity
        function showHideActEmptyState(a_bool) {
            $scope.isEmptyActivity = a_bool;
        }
        $scope.activityAttachments = {}; // attachments added for activity
        $scope.completionStatus = {}; // Completion status 
        // Show assignee and date selected in activity
        function showSelectedAct(a_dataArr, a_data) {
            if (!a_dataArr) {
                $scope.addEditActivityAssignee.assignedTo[a_data.id] = { name: a_data.assignedTo };//[{ name: a_data.assignedTo }];
                $scope.addEditActivityAssignee.activityBegins[a_data.id] = Date.parse(a_data.beginDate);
                $scope.addEditActivityAssignee.activityDueBy[a_data.id] = Date.parse(a_data.dueBy);
                $scope.completionStatus[a_data.id] = a_data.completionStatus;
                $scope.activityAttachments[a_data.id] = a_data.attachments;
            } else {
                a_dataArr.forEach(function (item) {
                    $scope.addEditActivityAssignee.assignedTo[item.id] = { name: item.assignedTo };//[{ name: item.assignedTo }];
                    $scope.addEditActivityAssignee.activityBegins[item.id] = getTimeStampValue(item.beginDate);
                    $scope.addEditActivityAssignee.activityDueBy[item.id] = getTimeStampValue(item.dueBy);
                    $scope.completionStatus[item.id] = item.completionStatus;
                    $scope.activityAttachments[item.id] = item.attachments;
                });
            }
        }
        //TO toogle popup display
        $scope.toggleActPopup = function (a_agrID) {
            if (a_agrID === "activityAssigneeFocus") {
                $scope.setFocusOnAssignee(a_agrID);
            }
            $scope.showAddEditActivity = true;
        }

        
        $scope.attachmentData = []; // attchments data for the selected milestone
        //Show milestones assignee and date seleted
        function showMileSelectedModel(a_data) {
            $scope.selectedMilestoneData.selected = { name: a_data.assignedTo }; //[{ name: a_data.assignedTo }];
            var dueDate = getTimeStampValue(a_data.dueBy);
            $scope.selectedMilestoneData.dueBy = dueDate;
            //$scope.achivedDate = new Date().getTime();//$filter('date')(new Date().getTime(), 'dd/MM/yyyy');
            $scope.achievedText = a_data.achieved.code === "true" ? "on " + $filter('date')(new Date(), 'dd/MM/yyyy') : "";
            $scope.attachmentData = a_data.attachments;
        }

        function getTimeStampValue(a_dateString) {
            var dateArr = a_dateString.split('/'),
            date = new Date(dateArr[2], parseInt(dateArr[1], 10) - 1, dateArr[0]);
            return date.getTime();
        }

        // Update milestone
        function getUpdatePosNum(a_data, currentData) {
            for (var indx = 0; indx < a_data.length; indx++) {
                if (a_data[indx].id === currentData.id) {
                    return indx;
                }
            }
        }
        // Validate add new activity
        function validateNewAct(obj) {
            var obj = JSON.parse(JSON.stringify(obj));
            var retunThis = true;
            for (var key in obj) {
                if (retunThis && key === 'assignedTo' && !obj[key].hasOwnProperty('name')) {
                    retunThis = false;
                }
                if (key === 'existingData') {
                    if (retunThis && obj['existingData'].hasOwnProperty('activityName') && obj['existingData'].activityName === '' || obj['existingData'].beginDate === '' || obj['existingData'].dueBy === '') {
                        retunThis = false;
                    }
                    if (!obj[key].hasOwnProperty('description') || !obj["existingData"].description != "") {
                        retunThis = false;
                    }
                }
            }
            return retunThis;
        }
        // function update activity
        function updateActivity(a_data, currentData) {
            a_data.activityName = currentData.activityName;
            a_data.beginDate = currentData.beginDate;
            a_data.dueBy = currentData.dueBy;
            a_data.assignedTo = currentData.assignedTo;
            a_data.description = currentData.description;
            a_data.email = currentData.email;
            return a_data;
        }

        // Empty state milestone creation
        function emptyStateMilestone(a_data, phaseName) {
            var tObj = {
                "phaseName": phaseName,
                "type": "listSearch",
                'data': []
            }
            tObj.data.push(a_data);
            $scope.filtersGroup.push(tObj);
            $scope.isEmptyState = false;
            $scope.expandCollapse(true, 0);
            $scope.toggleAllPhaseItems(false);
            $scope.showDetailedData(a_data, phaseName, 0);
        }


        // Bulk edit milestone
        $scope.bulkEditMile = function (a_data) {
            $scope.successUpdateCount = 0;
            var len = $scope.filtersGroup.length;
            for (var indx = 0; indx < len ; indx++) {
                var tObj = $scope.filtersGroup[indx],
                    dataLen = $scope.filtersGroup[indx].data.length,
                    editlen = mileSeleForBulkEdit.length;
                for (var e = 0; e < editlen; e++) {
                    var eTemp = mileSeleForBulkEdit[e];
                    for (var count = 0; count < dataLen; count++) {
                        //var cTemp = $filter('filter')($scope.filtersGroup, eTemp, true)[0];
                        var cTemp = $scope.filtersGroup[indx].data[count];
                        if ($scope.selectAllPhaseItems.checkedAll) {
                            if (eTemp.id === cTemp.id) {
                                switch ($scope.editField) {
                                    case "assignee":
                                        if (!cTemp.achieved) {
                                            cTemp.assignedTo = a_data.assignedTo.name; // Multiple assignee TODO
                                            $scope.successUpdateCount++;
                                            cTemp.isChecked = false;
                                        }
                                        else {
                                            cTemp.isChecked = false;
                                        }
                                        break;
                                    case "due date":
                                        if ($scope.selectedDueBy.code === 'date' && !cTemp.achieved) {
                                            cTemp.dueBy = $filter('date')(a_data.dueBy, 'dd/MM/yyyy');
                                            $scope.successUpdateCount++;
                                            cTemp.isChecked = false;
                                        }
                                        else if ($scope.selectedDueBy.code === 'prepone' && !cTemp.achieved) {
                                            var myDate = cTemp.dueBy.split("/");
                                            var tempDate = myDate[1] + "," + myDate[0] + "," + myDate[2];
                                            var newDate = new Date(tempDate);
                                            if ($scope.selectedDueOption.code === "days") {
                                                newDate = newDate.setDate(newDate.getDate() - parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                            else if ($scope.selectedDueOption.code === "months") {
                                                newDate = newDate.setMonth(newDate.getMonth() - parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                        }
                                        else if ($scope.selectedDueBy.code === 'postpone' && !cTemp.achieved) {
                                            var myDate = cTemp.dueBy.split("/");
                                            var tempDate =  [1] + "," + myDate[0] + "," + myDate[2];
                                            var newDate = new Date(tempDate);
                                            if ($scope.selectedDueOption.code === "days") {
                                                newDate = newDate.setDate(newDate.getDate() + parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                            else if ($scope.selectedDueOption.code === "months") {
                                                newDate = newDate.setMonth(newDate.getMonth() + parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                        }
                                        break;
                                    case "status":
                                        if (!cTemp.achieved) {
                                            cTemp.progressStatus.completion = ($scope.selectedStatusOption.code === 'achieved') ? 'Yes' : 'No';
                                            cTemp.achieved = a_data.achieved;
                                            $scope.successUpdateCount++;
                                            cTemp.isChecked = false;
                                        }
                                        else {
                                            cTemp.isChecked = false;
                                        }
                                        break;
                                }
                                //cTemp.achieved = a_data.achieved;
                                $scope.filtersGroup[indx].data[count] = cTemp;
                            }
                        }
                        else {
                            if (eTemp.id === cTemp.id) {
                                //cTemp.assignedTo = a_data.assignedTo.name; // Multiple assignee TODO
                                //cTemp.achieved = a_data.achieved;
                                //cTemp.dueBy = $filter('date')(a_data.dueBy, 'dd/MM/yyyy');
                                //cTemp.progressStatus.completion = (a_data.achieved) ? 'Yes' : 'No';
                                switch ($scope.editField) {
                                    case "assignee":
                                        if (!cTemp.achieved) {
                                            cTemp.assignedTo = a_data.assignedTo.name; // Multiple assignee TODO
                                            $scope.successUpdateCount++;
                                            cTemp.isChecked = false;
                                        }
                                        else {
                                            cTemp.isChecked = false;
                                        }
                                        break;
                                    case "due date":
                                        //cTemp.achieved = a_data.achieved;
                                        if ($scope.selectedDueBy.code === 'date' && !cTemp.achieved) {
                                            cTemp.dueBy = $filter('date')(a_data.dueBy, 'dd/MM/yyyy');
                                            $scope.successUpdateCount++;
                                            cTemp.isChecked = false;
                                        }
                                        else if ($scope.selectedDueBy.code === 'prepone' && !cTemp.achieved) {
                                            var myDate = cTemp.dueBy.split("/");
                                            var tempDate = myDate[1] + "," + myDate[0] + "," + myDate[2];
                                            var newDate = new Date(tempDate);
                                            if ($scope.selectedDueOption.code === "days") {
                                                newDate = newDate.setDate(newDate.getDate() - parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                            else if ($scope.selectedDueOption.code === "months") {
                                                newDate = newDate.setMonth(newDate.getMonth() - parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                        }
                                        else if ($scope.selectedDueBy.code === 'postpone' && !cTemp.achieved) {
                                            var myDate = cTemp.dueBy.split("/");
                                            var tempDate = myDate[1] + "," + myDate[0] + "," + myDate[2];
                                            var newDate = new Date(tempDate);
                                            if ($scope.selectedDueOption.code === "days") {
                                                newDate = newDate.setDate(newDate.getDate() + parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                            else if ($scope.selectedDueOption.code === "months") {
                                                newDate = newDate.setMonth(newDate.getMonth() + parseInt($scope.daysCount.daysmonthsCount));
                                                cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                                $scope.successUpdateCount++;
                                                cTemp.isChecked = false;
                                            }
                                        }
                                        else {
                                            cTemp.isChecked = false;
                                        }
                                        break;
                                    case "status":
                                        if (!cTemp.achieved) {
                                            cTemp.progressStatus.completion = ($scope.selectedStatusOption.code === 'achieved') ? 'Yes' : 'No';
                                            cTemp.achieved = a_data.achieved;
                                            $scope.successUpdateCount++;
                                            cTemp.isChecked = false;
                                        }
                                        else {
                                            cTemp.isChecked = false;
                                        }
                                        break;
                                }
                                $scope.filtersGroup[indx].data[count] = cTemp;
                                //console.log($scope.filtersGroup);
                            }
                        }
                    }
                }

            }
            updCurrActMilestone(mileSeleForBulkEdit);

            if ($scope.successUpdateCount == 0)
                $scope.alertBarMessage = $scope.selectedMilestonesCnt + " Milestone(s) " + $scope.editField + " could not be updated.";
            else if ($scope.successUpdateCount !== $scope.selectedMilestonesCnt && $scope.successUpdateCount != 0)
                $scope.alertBarMessage = $scope.successUpdateCount + " Milestone(s) " + $scope.editField + " updated successfully and " + ($scope.selectedMilestonesCnt - $scope.successUpdateCount) + " Milestone(s) " + $scope.editField + " could not be updated.";
            else if ($scope.successUpdateCount === $scope.selectedMilestonesCnt)
                $scope.alertBarMessage = $scope.selectedMilestonesCnt + " Milestone(s) " + $scope.editField + " updated successfully.";
        }

        // Update current active milestone
        function updCurrActMilestone(a_data) {
            for (var indx = 0; indx < a_data.length; indx++) {
                if (a_data[indx].id === $scope.detailedItemData.id) {
                    //$scope.detailedItemData = a_data[indx];
                    if ($scope.selectAllPhaseItems.checkedAll) {
                        $scope.showDetailedData(a_data[indx], globalData.phaseName, globalData['selectedIndex'].index);
                    } else {
                        $scope.showDetailedData(a_data[indx].data, a_data[indx].phaseName, globalData['selectedIndex'].index);
                    }

                }
            }
            $scope.selectedPhaseLevel = true;
            $scope.selectAllPhaseItems.checkedAll = false;
        }

        $scope.$watchCollection('[selectedStatusOption, daysCount.daysmonthsCount]', function (newValues, oldValues) {
            if (angular.isDefined(newValues)) {
                $scope.disbaleUpdateBtn = false;
                if (newValues[1] === "")
                    $scope.disbaleUpdateBtn = true;
            }
        });
        // Update all milestones
        function bulEditAllMile(a_bool) {
            var len = $scope.filtersGroup.length;
            if (a_bool) {
                mileSeleForBulkEdit = [];
                for (var indx = 0; indx < len; indx++) {
                    var dataLen = $scope.filtersGroup[indx].data.length;
                    for (var count = 0; count < dataLen; count++) {
                        mileSeleForBulkEdit.push($scope.filtersGroup[indx].data[count]);
                    }
                }
            }
        }



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
        // To reset all the flags on $scope related to attachment popup
        function resetAttachmentPopup() {
            // reset selected items
            var itemLen = $scope.attachments.length;
            for (var indx = 0; indx < itemLen; indx++) {
                $scope.attachments[indx].isChecked = false;
            }
            // Reset select all checkbox
            $scope.selectAllAttach.checkedAll = false;
        }

        $scope.commentsPopupgTabUrl = "shared/popup/views/commentsPopupTab.html";
        $scope.showCommentsPopupTab = false;
        $scope.showCommentsPopupTabCallback = function (e, type, popup) {
            if (popup === "statusPop")
                $scope.showAchievedMilePopup = false;
            else if (popup === "updateStatusPop")
                $scope.showBulkEditMilestone = false;
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
        

    //Attachment popup for comment popup--start
        $scope.showDownloadMasterData = false;
        $scope.hideDownloadTemplate = false;
        $scope.commentsUploadPopupUrl = "shared/popup/views/popupUploadDoc.html";
	    $scope.attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
		    <br />Limited to file(s) of 10MB each.\
		    <br /> Maximum 5 files can be uploaded.";
	    $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
	    $scope.attchmentMsg = $scope.attachmentMsg;

	    $scope.uploadTitle = "ADD ATTACHMENTS";
	    $scope.showUploadPopup = false;
	    $scope.adduploadCallback = function (e) {   
            $scope.showCommentsPopupTab = false;
            $scope.showUploadPopup = true;
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
	    //Attachment popup for comment popup--end

        $scope.hideaddAttachmentPopupUrlCallback = function () {
            $scope.showAddAttachmentPopup = false;
            $scope.showCommentsPopupTab = true;
           // $scope.emailerPopup = true;
        };
        // End: Add attachment popup

        // Set focus for assignee field
        $scope.setFocusOnAssignee = function (a_arg) {
            PPSTService.setFocus(a_arg);
        }

        //Bulk Activity

        $scope.actions = [{ "options": "Change Assignee" }, { "options": "Change Timelines" }, { "options": "Update Status" }];
        $scope.bulkActivities = function (a, b) {
            $scope.editField = b;
            $scope.showBulkEditActivity = true;
            $scope.disbaleUpdateBtn = true;
            switch (b) {
                case 'Change Assignee':
                    $scope.bulkEditActivityHdr = "CHANGE ASSIGNEE";
                    $scope.changeAssignee = true;
                    $scope.changeDueDate = false;
                    $scope.updateStatus = false;
                    break;
                case 'Change Timelines':
                    $scope.bulkEditActivityHdr = "Change Timelines";
                    $scope.changeAssignee = false;
                    $scope.changeDueDate = true;
                    $scope.updateStatus = false;
                    break;
                case 'Update Status':
                    $scope.bulkEditActivityHdr = " Update Status";
                    $scope.changeAssignee = false;
                    $scope.changeDueDate = false;
                    $scope.updateStatus = true;
                    break;

            }
        }

        $scope.startOptions = [{
            "code": "prepone",
            "name": "Prepone"
        }, {
            "code": "postpone",
            "name": "Postpone"
        },
         {
             "code": "date",
             "name": "Date"
         }];


        $scope.startDateChangeCallback = function (selectedStartDate) {
            $scope.selectedStartDate = selectedStartDate
        }


        $scope.endDateOptions = [{
            "code": "prepone",
            "name": "Prepone"
        }, {
            "code": "postpone",
            "name": "Postpone"
        },
        {
            "code": "date",
            "name": "Date"
        }];


        $scope.endDateChangeCallback = function (selectedEndDate) {
            $scope.selectedEndDate = selectedEndDate
        }



        $scope.selectedStartOptions = [{
            "code": "days",
            "name": "Days"
        }, {
            "code": "months",
            "name": "Months"
        }]



        $scope.activeStartDaysCount = { "daysmonthsCount": "" };

        $scope.onChangeStartOption = function (selectedStartOption) {
            $scope.selectedStartOption = selectedStartOption;
        };



        $scope.selectedEndOptions = [{
            "code": "days",
            "name": "Days"
        }, {
            "code": "months",
            "name": "Months"
        }]



        $scope.activeEndDaysCount = { "daysmonthsCount": "" };

        $scope.onChangeEndOption = function (selectedEndOption) {
            $scope.selectedEndOption = selectedEndOption;
        };

        $scope.activeStartDaysCount = { "daysmonthsCount": "" };
        $scope.activeEndDaysCount = { "daysmonthsCount": "" };


        $scope.activityStatus = { "status": "0" };


        // Bulk edit activities
        $scope.bulkEditActivities = function (a_data) {
            $scope.successUpdateCount = 0;
            var actLen = $scope.detailedItemData.activities.length,
                selecLen = activitySeleForBulkEdit.length;
            for (var c = 0; c < selecLen; c++) {
                var cTemp = activitySeleForBulkEdit[c];
                for (var indx = 0; indx < actLen; indx++) {
                    var tmp = $scope.detailedItemData.activities[indx];
                    if ($scope.activities.selectAll) {
                        if (cTemp.id === tmp.id) {
                            switch ($scope.editField) {
                                case "Change Assignee":
                                    if ($scope.completionStatus[cTemp.id] !== "100") {
                                        tmp.assignedTo = a_data.assignedTo.name;
                                        tmp.achieved = a_data.achieved;
                                        $scope.successUpdateCount++;
                                    }
                                    else {
                                        cTemp.isChecked = false;
                                    }
                                    break;
                                case "Change Timelines":
                                    if ($scope.completionStatus[cTemp.id] !== "100" && $scope.selectedStartDate.code === 'date') {
                                        cTemp.startBy = $filter('date')(a_data.startBy, 'dd/MM/yyyy');
                                        $scope.successUpdateCount++;
                                        cTemp.isChecked = false;
                                    }
                                    else {
                                        cTemp.isChecked = false;
                                    }
                                    break;
                                case "Update Status":
                                    if ($scope.completionStatus[cTemp.id] !== "100") {
                                        $scope.completionStatus[item.id] = a_data.activityStatus.status;
                                        tmp.assignedTo = a_data.assignedTo.name;
                                        tmp.achieved = a_data.achieved;
                                        $scope.successUpdateCount++;
                                    }
                                    else {
                                        cTemp.isChecked = false;
                                    }
                                    break;

                            }

                        }
                        //else { }
                    }

                    else {

                        if (cTemp.id === tmp.id) {
                            switch ($scope.editField) {
                                case "Change Assignee":
                                    if ($scope.completionStatus[cTemp.id] !== "100") {
                                        tmp.assignedTo = a_data.assignedTo.name;
                                        tmp.achieved = a_data.achieved;
                                        $scope.successUpdateCount++;

                                    }
                                    else {
                                        cTemp.isChecked = false;
                                        //tmp.assignedTo = a_data.assignedTo.name;
                                    }
                                    break;

                                case "Change Timelines":

                                    if ($scope.completionStatus[cTemp.id] !== "100" && $scope.selectedStartDate.code === 'date') {
                                        tmp.activityBegins = $filter('date')(a_data.startBy, 'dd/MM/yyyy');
                                        tmp.activityDueBy = $filter('date')(a_data.endBy, 'dd/MM/yyyy');
                                        $scope.successUpdateCount++;
                                        cTemp.isChecked = false;
                                    }

                                    else if ($scope.selectedStartDate.code === 'prepone' && $scope.completionStatus[cTemp.id] !== "100") {
                                        var myDate = cTemp.dueBy.split("/");
                                        var tempDate = myDate[1] + "," + myDate[0] + "," + myDate[2];
                                        var newDate = new Date(tempDate);
                                        if ($scope.selectedDueOption.code === "days") {
                                            newDate = newDate.setDate(newDate.getDate() - parseInt($scope.daysCount.daysmonthsCount));
                                            $scope.addEditActivityAssignee.activityBegins[cTemp.id] = $filter('date')(newDate, 'dd/MM/yyyy');
                                            $scope.successUpdateCount++;
                                           
                                        }
                                        else if ($scope.selectedDueOption.code === "months") {
                                            newDate = newDate.setMonth(newDate.getMonth() - parseInt($scope.daysCount.daysmonthsCount));
                                            cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                            $scope.successUpdateCount++;
                                           
                                        }
                                    }
                                    else if ($scope.selectedStartDate.code === 'prepone' && $scope.completionStatus[cTemp.id] !== "100") {
                                        var myDate = cTemp.dueBy.split("/");
                                        var tempDate = [1] + "," + myDate[0] + "," + myDate[2];
                                        var newDate = new Date(tempDate);
                                        if ($scope.selectedDueOption.code === "days") {
                                            newDate = newDate.setDate(newDate.getDate() + parseInt($scope.daysCount.daysmonthsCount));
                                            $scope.addEditActivityAssignee.activityBegins[cTemp.id] = $filter('date')(newDate, 'dd/MM/yyyy');
                                            $scope.successUpdateCount++;

                                        }
                                        else if ($scope.selectedDueOption.code === "months") {
                                            newDate = newDate.setMonth(newDate.getMonth() + parseInt($scope.daysCount.daysmonthsCount));
                                            cTemp.dueBy = $filter('date')(newDate, 'dd/MM/yyyy');
                                            $scope.successUpdateCount++;
                                            cTemp.isChecked = false;
                                        }
                                    }
                                    break;

                                case "Update Status":
                                    if ($scope.completionStatus[cTemp.id] !== "100") {
                                        tmp.completionStatus = a_data.status;
                                    }
                                    
                                    break;

                            }

                        }
                    }

                }
              //if ($scope.activities.selectAll) {
                    showSelectedAct($scope.detailedItemData.activities, false);
               // }

                if ($scope.successUpdateCount == 0)
                    $scope.alertBarMessage = $scope.selectedActiveCnt + " Activity(s) " + $scope.editField + " could not be updated.";
                else if ($scope.successUpdateCount !== $scope.selectedActiveCnt && $scope.successUpdateCount != 0)
                    $scope.alertBarMessage = $scope.successUpdateCount + " Activity(s) " + $scope.editField + " updated successfully and " + ($scope.selectedActiveCnt - $scope.successUpdateCount) + " Activity(s) " + $scope.editField + " could not be updated.";
                else if ($scope.successUpdateCount === $scope.selectedActiveCnt)
                    $scope.alertBarMessage = $scope.selectedActiveCnt + " Activity(s) " + $scope.editField + " updated successfully.";

            }
        }

        $scope.$watchCollection('[selectedStartOption, activeStartDaysCount.daysmonthsCount]', function (newValues, oldValues) {
            if (angular.isDefined(newValues)) {
                $scope.disbaleUpdateBtn = false;
                if (newValues[1] === "")
                    $scope.disbaleUpdateBtn = true;
            }
        });

        $scope.$watchCollection('[selectedEndOption, activeEndDaysCount.daysmonthsCount]', function (newValues, oldValues) {
            if (angular.isDefined(newValues)) {
                $scope.disbaleUpdateBtn = false;
                if (newValues[1] === "")
                    $scope.disbaleUpdateBtn = true;
            }
        });



    }
})(angular);