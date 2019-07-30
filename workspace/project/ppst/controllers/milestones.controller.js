(function () {
    angular.module('SMART2')
    .controller('milestonesCntrl', ['$scope', '$state', 'PPSTService', '$timeout', '$filter', '$rootScope', milestonesFn])
    .controller('milestonesHeaderCntrl', ['$scope','$state','PPSTService','$timeout','$filter','$rootScope', milestoneHeaderFn]);

    // Controller function
    function milestonesFn($scope, $state, PPSTService, $timeout, $filter, $rootScope) {
        $scope.milestonesSummary = [];
        $scope.noMilestonesFound =  false; // Empty state scenario.
        // Read milestone data
        function readMilestoneData() {
            var url = [{ method: 'get', url: "project/ppst/models/milestonesData.json" }],
                summaryDataTemp = [];
            PPSTService.getJSONData(url).then(function (response) {
                if (response[0].data.length === 0) {
                    $scope.noMilestonesFound = true; // Empty state scenario.
                    $rootScope.$broadcast('noMilestoneFound', $scope.noMilestonesFound);
                    return false;
                } else {
                    $rootScope.$broadcast('noMilestoneFound', $scope.noMilestonesFound);
                }
                var len = response[0].data.length;
                for (var indx = 0; indx < len; indx++) {
                    var tmp = response[0].data[indx];
                    var obj = {
                        'phaseName': tmp.phaseName,
                        "achieved": filterAchieved(tmp.data, "true"),
                        "notAchieved": filterAchieved(tmp.data, "false"),
                        "id": tmp.phaseName
                    };
                    //Add achieved not achieved all
                    obj.achievedNotAchieved = PPSTService.mergeArray(obj.achieved, obj.notAchieved);//[...obj.achieved, ...obj.notAchieved];
                    summaryDataTemp.push(obj);
                    obj = {};
                }
                
                summaryDataTemp.unshift(getAllPhases(summaryDataTemp));
                $scope.milestonesSummary = JSON.parse(JSON.stringify(summaryDataTemp));
                summaryDataTemp = [];
                $scope.projectSummaryData = $scope.milestonesSummary[0].achievedNotAchieved; // To show all achieved and not achieved data
            }).catch(function (error) {

            });
        }

        // Prepare all phase items
        function getAllPhasesData(a_data) {
            var achieved = [],
                notAchieved = [],
                len =  a_data.length;
            for (var indx = 0; indx < len; indx++) {
                if (a_data[indx].id != 'allPhases') {
                    var aLen = a_data[indx].achieved.length,
                        naLen = a_data[indx].notAchieved.length;
                    for (var a = 0; a < aLen; a++) {
                        achieved.push(a_data[indx].achieved[a]);
                    }
                    for (var n = 0; n < naLen; n++) {
                        notAchieved.push(a_data[indx].notAchieved[n]);
                    }
                }
                
            }
            return {
                "phaseName": 'All Phases',
                "id": "allPhases",
                "achieved": achieved,
                "notAchieved": notAchieved,
                "achievedNotAchieved": PPSTService.mergeArray(achieved, notAchieved)
            }
            //[...achieved, ...notAchieved]
        }

        readMilestoneData();
        $scope.attachmentAdded = false; // attachment 
        // Add new milestone
        $rootScope.$on('newSummaryData', function (e, data) {
            var len = $scope.milestonesSummary.length,
                isExistingPhase = false;
            for (var indx = 0; indx < len; indx++) {
                var t = $scope.milestonesSummary[indx];
                if (t.phaseName === data.phaseName) {
                    $scope.milestonesSummary[indx].achievedNotAchieved.push(data);
                    $scope.milestonesSummary[indx].notAchieved.push(data);
                    isExistingPhase = true;
                    var allPhases = getAllPhasesData($scope.milestonesSummary);
                    allPhases.showArrowPointer = ($scope.milestonesSummary[0].showArrowPointer === "triangleUp") ? 'triangleUp' : '';
                    $scope.milestonesSummary[0] = allPhases;
                    break;
                    return;
                }
            }
            if (!isExistingPhase) {
                var obj = {
                    'phaseName': data.phaseName,
                    "achieved": [],
                    "notAchieved": [],
                    "id": PPSTService.uniqueIDGenerator(),
                    "showArrowPointer": ($scope.milestonesSummary[0].showArrowPointer === "triangleUp") ? '' : 'triangleUp',
                    "achievedNotAchieved" : []
                };

                obj.notAchieved.push(data);
                $scope.milestonesSummary.push(obj);
                var allPhases = getAllPhasesData($scope.milestonesSummary);
                allPhases.showArrowPointer = ($scope.milestonesSummary[0].showArrowPointer === "triangleUp") ? 'triangleUp' : '';
                $scope.milestonesSummary[0] = allPhases;
                
            }
            // check which is current active tab
            var data = getaActiveTabData($scope.milestonesSummary);
            $scope.showPhaseWiseTable(data);
        });

        function getaActiveTabData(a_data) {
            // return complete obj of current active tab
            var len = a_data.length;
            for (var indx = 0; indx < len; indx++) {
                var tObj = a_data[indx];
                if (tObj.showArrowPointer == "triangleUp") {
                    return tObj;
                }
            }
        }

        // On Assignee change
        $scope.mAssigneeChng = function () {
            $timeout(function () {
                changeAssignee($scope.editData.assignedTo, 'milestone');
            }, 100)
        }

        function changeAssignee(a_data, a_section) {
            var assignees = [];
            if (a_data) {
                a_data.forEach(function (item) {
                    assignees.push(item.email);
                });
                $timeout(function () {
                    if (a_section === 'milestone') {
                        $scope.editData.existingData.email = assignees.join(', ');
                    }
                });
            }
        }

        function validateJSON(obj) {
            var retunThis = true;
            for (var key in obj) {
                if (key === 'existingData') {
                    if (retunThis && !obj[key].hasOwnProperty('milestoneName') || !obj[key].hasOwnProperty('email') || !obj[key].hasOwnProperty('dueBy')) {
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

        $scope.addEditMilestone = function (a_data, isEmptyState) {
            $scope.attachmentAdded = false;
            $scope.editData['existingData'] = (a_data) ? a_data : {};
            $scope.popupHeader = "ADD MILESTONE";
            $scope.editData['phaseModel'] = {};
            $scope.editData['assignedTo'] = {};
            if (isEmptyState) {
                isEmptyStateMilestone = true;
            } else {
                isEmptyStateMilestone = false;
            }
           
            $scope.editMilestonePopup = true;
        }
        
        $scope.addNewMilestone = function (a_data) {
            if (!validateJSON(a_data)) {
                return false;
            }
            
            $scope.editMilestonePopup = false; // close the popup
            var objSkeleton = {};
            var len = $scope.milestonesSummary.length;
            objSkeleton.assignedTo = a_data.assignedTo.name;
            objSkeleton['milestoneName'] = a_data.existingData.milestoneName;
            objSkeleton['dueBy'] = $filter('date')(a_data.existingData.dueBy, 'dd/MM/yyyy');//new Date(a_data.existingData.dueBy);
            objSkeleton['description'] = a_data.existingData.description;
            objSkeleton['email'] = a_data.existingData.email;
            objSkeleton['type'] = a_data.existingData.type;
            var phaseName = a_data.phaseModel[0].phaseName;
            var obj = {
                'phaseName': phaseName,
                "achieved": [],
                "notAchieved": [],
                "id": PPSTService.uniqueIDGenerator()
            };

            obj.notAchieved.push(objSkeleton);
            
            $scope.milestonesSummary.push(obj);
            var allPhases = getAllPhasesData($scope.milestonesSummary);
            allPhases.showArrowPointer = "triangleUp";
            $scope.milestonesSummary.unshift(allPhases);
            $scope.projectSummaryData = $scope.milestonesSummary[0].notAchieved;
            $scope.noMilestonesFound = false;
            $rootScope.$broadcast('noMilestoneFound', $scope.noMilestonesFound);

        }
        // Attachemnt START
        $scope.addAttachmentComplete = function () {
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
                name: "Name_of_the_attached_file.pdf",
                fileSize: "18 KB",
                uploadDate: "12 April 2016",
                createdBy: "Johnny Walker",
                sharedWith: "Calvin Shawn",
                isChecked: false
            },
            {
                name: "Name_of_theattached_file.docx",
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
        }
        $scope.addAttachmentsCallback = function (e) {
            $scope.attachmentType = e;
            //$scope.attachmentAdded = false;
            $scope.uploadTitle = "ADD ATTACHMENTS";
            $scope.showUploadAttachmentsPopup = true;
            $scope.showAddEditActivity = false;
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

        // Attachment END
        // FIlter data based on phase and not achieved
        function filterAchieved(a_data, boolean) {
            var filteredData = [];
            for (var indx = 0; indx < a_data.length; indx++) {
                var item = a_data[indx];
                if (item['achieved']['code'] === boolean) {
                    var tObj = {
                        "milestoneName": item.milestoneName,
                        "assignedTo": item.assignedTo,
                        "id": item.id,
                        "dueBy": item.dueBy,
                        "type": item.type,
                        "achieved": boolean,
                        "approvalStatus":  item.approvalStatus
                    }
                    filteredData.push(tObj);
                    tObj = {};
                }                
            };
            return filteredData;
        }

        // Data for all phases summary
        function getAllPhases(a_data) {
            var len = a_data.length,
                notAcheived = [],
                achieved = [],
                type = [],
                returnThis = {};
            for(var indx=0; indx< len; indx++) {
                var tItem = a_data[indx];
                achieved = PPSTService.mergeArray(achieved, tItem['achieved']);//[...achieved, ...tItem['achieved']];
                notAcheived = PPSTService.mergeArray(notAcheived, tItem['notAchieved']);//[...notAcheived, ...tItem['notAchieved']];
            }
            return {
                "phaseName" : "All Phases",
                "achieved" : achieved,
                "notAchieved": notAcheived,
                "type": type,
                "achievedNotAchieved": PPSTService.mergeArray(achieved, notAcheived),//[...achieved, ...notAcheived],
                "showArrowPointer": "triangleUp",
                "id" : "allPhases"
            }
        }
        
        // To manage the pointer arrow
        $scope.showPhaseWiseTable = function (a_data) {
            var len = $scope.milestonesSummary.length,
                idSelected = a_data.id;
            for (var indx = 0; indx < len; indx++) {
                var tmpObj = $scope.milestonesSummary[indx];
                if (idSelected === tmpObj.id) {
                    tmpObj['showArrowPointer'] = 'triangleUp';
                    $scope.projectSummaryData = a_data.achievedNotAchieved;
                } else {
                    tmpObj['showArrowPointer'] = false;
                }
                $scope.milestonesSummary[indx] = tmpObj;
            }
        }

        // Milestones section add popup
        // Edit popup
        $scope.popupHeader = 'ADD MILESTONE';
        $scope.editData = {};//$scope.detailedItemData;
        $scope.editData['milestonePhases'] = [
            { "phaseName": "Ideation" },
            { "phaseName": "Execution" },
            { "phaseName": "Realization" }
        ];
        $scope.editData['assignees'] = [
            { 'name': 'Satyendra' , "email" : "sat.kum$gep.com"},
            { 'name': 'Karthic', "email": "kartic.ram@gep.com" },
            { 'name': 'Yogesh B', "email": "yo.b@gep.com" },
            { 'name': "Pallav Thakkar", "email": "P.t@gep.com" }
        ];

        $scope.editMilestonePopup = false;
        $scope.addEditMilestone = function () {
            $scope.popupHeader = 'ADD MILESTONE';
            $scope.editData['phaseModel'] = {};
            $scope.editData['assignedTo'] = {};
            $scope.editData['existingData'] = {};
            $scope.editMilestonePopup = true;
        }
        $scope.onHideEditMilestone = function () {
            $scope.editMilestonePopup = false;
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

        $scope.rowsToShowOpts = [
            { 'size': '5' },
            { 'size': '10' }];

        $scope.selectedOption = $scope.rowsToShowOpts[0];
        
    }

    // Milestone Header controller
    function milestoneHeaderFn($scope, $state, PPSTService, $timeout, $filter, $rootScope) {
        $scope.attachmentAdded = false;
        $scope.editMilestonePopup = false;
        $scope.noMilestonesFound = false; // Empty state scenario.
        $scope.editData = {};//$scope.detailedItemData;
        $rootScope.$on('noMilestoneFound', function (e, val) {
            $scope.noMilestonesFound = val;
        });

        function validateFields(a_data) {
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
            "description" : false
        };
        $scope.addNewMilestone = function (a_data, validateModel) {
            validateFields(validateModel);
            if (!validateJSON(a_data)) {
                return false;
            }
            var objSkeleton = {};
            objSkeleton.assignedTo = a_data.assignedTo.name;
            objSkeleton['milestoneName'] = a_data.existingData.milestoneName;
            objSkeleton['dueBy'] = $filter('date')(a_data.existingData.dueBy, 'dd/MM/yyyy');//new Date(a_data.existingData.dueBy);
            objSkeleton['description'] = a_data.existingData.description;
            objSkeleton['email'] = a_data.existingData.email;
            objSkeleton['approvalStatus'] = a_data.existingData.approvalStatus;
            objSkeleton.phaseName = a_data.phaseModel[0].phaseName;
            PPSTService.setNewSumamry(objSkeleton);
            $scope.editMilestonePopup = false; // close the popup
            $rootScope.$broadcast('newSummaryData', objSkeleton);
        }

        $scope.editData['milestonePhases'] = [
            { "phaseName": "Ideation" },
            { "phaseName": "Execution" },
            { "phaseName": "Realization" }
        ];
        $scope.editData['assignees'] = [
            { 'name': 'Satyendra', "email": "sat.kum@gep.com" },
            { 'name': 'Karthic', "email": "kartic.ram@gep.com" },
            { 'name': 'Yogesh B', "email": "yo.b@gep.com" },
            { 'name': "Pallav Thakkar", "email": "P.t@gep.com" }
        ];
        $scope.toggleEditpopup = function () {
            $scope.editMilestonePopup = true;
            return false;
        }
        $scope.addEditMilestone = function (event, a_data, isEmptyState) {
            if (event) {
                event.stopPropagation();
            }
            $scope.attachmentAdded = false;
            $scope.editData['existingData'] = (a_data) ? a_data : {};
            $scope.popupHeader = "ADD MILESTONE";
            $scope.editData['phaseModel'] = {};
            $scope.editData['assignedTo'] = {};
           // $scope.editData.existingData.email = '';
            if (isEmptyState) {
                isEmptyStateMilestone = true;
            } else {
                isEmptyStateMilestone = false;
            }
            $scope.editMilestonePopup = true;
            return false;
        }
        $scope.onHideEditMilestone = function () {
            $scope.editMilestonePopup = false;
            $scope.validateModel = PPSTService.setValidate($scope.validateModel, false);
            return false;
        }
        // On Assignee change
        $scope.mAssigneeChng = function () {
            $timeout(function () {
                changeAssignee($scope.editData.assignedTo, 'milestone');
            }, 100)
        }

        function changeAssignee(a_data, a_section) {
            var assignees = [];
            if (a_data) {
                assignees[0] = a_data.email;
                //a_data.forEach(function (item) {
                //    assignees.push(item.email);
                //});

                $timeout(function () {
                    if (a_section === 'milestone') {
                        $scope.editData.existingData.email = assignees.join(', ');
                    }
                });
            }
        }

        function validateJSON(obj) {
            var retunThis = true;

            for (var key in obj) {
                if (key === 'existingData') {
                    if (retunThis && !obj[key].hasOwnProperty('milestoneName') || !obj[key].hasOwnProperty('email') || !obj[key].hasOwnProperty('dueBy')) {
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
        // go to new page
        $scope.openMilestonePage = function (a_data) {
            if (a_data) {
                PPSTService.setSelectedMilestone(a_data);
            }
            $state.go("projects.milestones");
        }

        // Attachemnt START
        $scope.addAttachmentComplete = function () {
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
                name: "Name_of_the_attached_file.pdf",
                fileSize: "18 KB",
                uploadDate: "12 April 2016",
                createdBy: "Johnny Walker",
                sharedWith: "Calvin Shawn",
                isChecked: false
            },
            {
                name: "Name_of_theattached_file.docx",
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
        }
        $scope.addAttachmentsCallback = function (e) {
            $scope.attachmentType = e;
            //$scope.attachmentAdded = false;
            $scope.uploadTitle = "ADD ATTACHMENTS";
            $scope.showUploadAttachmentsPopup = true;
            $scope.showAddEditActivity = false;
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
    }
})(angular);