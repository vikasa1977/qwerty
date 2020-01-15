angular.module('SMART2')
    .controller('requesterNewCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', '$state', '$timeout', '$sce', 'notification', requesterNewCtrlFunc])
.controller('requesterTeamMemberCtrl', ['$scope', '$http', 'notification', '$notification', '$filter', 'PPSTService', '$timeout', '$state', 'storeService', 'dbFactory', requesterTeamMemberCtrlFunc]);

function requesterNewCtrlFunc($scope, $rootScope, RuleEngine, $http, $state, $timeout, $sce, notification) {

    $scope.mode = $state.params.mode;
    $scope.commentMessage = "";
    $scope.message = "Add Comment"

   

    $scope.getValue = function (m) {
        
        if (m === "") {
            $scope.message = "Add Comment"
        } else {
            $scope.message = m;
        }
    }

    
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
        $scope.checkPrivilege = false;
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

    

    
   
    if ($scope.mode == "drafted") {
        $scope.requesterTitle = "Project request";
        $scope.requesterStatus = "(Draft)";
        var url = 'project/projectRequester/models/draftedRequester.json';
        $scope.submitProcess = function () {
            $state.go("projects.requester", { mode: "supervisorActive" });
        }
       
       
    }
    else if ($scope.mode == "activated") {
        $scope.requesterTitle = "Project request"
        $scope.requesterStatus = "(Active)";
        var url = 'project/projectRequester/models/activatedRequester.json';
        $scope.startProcess = function () {
            $state.go("projects.requester", { mode: "inProgress" });
        }
    }
        else if ($scope.mode == "inProgress") {
            $scope.requesterTitle = ""
            $scope.requesterStatus = "In Progress";
            var url = 'project/projectRequester/models/requesterNew.json';
        }

    else if ($scope.mode == "supervisorActive") {
        $scope.requesterTitle = "Project request"
        $scope.requesterStatus = "(Active)";
        var url = 'project/projectRequester/models/activatedRequester.json';
        $scope.filpToProject = function () {
            $state.go("projects.requester", { mode: "supervisorInProgress" });
        }
    }

    else if ($scope.mode == "supervisorInProgress") {
        $scope.requesterTitle = "Project request"
        $scope.requesterStatus = "(In Progress)";
        var url = 'project/projectRequester/models/supervisorInProgress.json';
        $scope.filpToProject = function () {
            $state.go("projects.requester", { mode: "inProgress" });
        }
        $scope.statusActions = [{ name: "FLIP TO PROJECT" }, { name: "MARK AS COMPLETE" }, { name: "CANCEL REQUEST" }];
        $scope.statusProgress = "MARK AS COMPLETE";
    }

    else if ($scope.mode == "completedRequester") {
        $scope.requesterTitle = "Project request"
        $scope.requesterStatus = "(Completed)";
        var url = 'project/projectRequester/models/complatedRequester.json';
        $scope.statusActions = [{ name: "FLIP TO PROJECT" }, { name: "CANCEL REQUEST" }];
        $scope.statusProgress = "FLIP TO PROJECT";
    }

    else if ($scope.mode == "requestCanceled") {
        $scope.requesterTitle = "Project request"
        $scope.requesterStatus = "(Canceled)";
        var url = 'project/projectRequester/models/canceledRequester.json';
        $scope.statusActions = [{ name: "MARK AS COMPLETE" }, { name: "FLIP TO PROJECT" }];
        $scope.statusProgress = "FLIP TO PROJECT";
    }

    else {
        $scope.requesterTitle = "New project request";
        var url = 'project/projectRequester/models/requesterNew.json';
        $scope.startProcess = function () {
            $state.go("projects.requester", { mode: "drafted" });
            
        }
    }

    

    var requestor =
        {
            method: 'GET',
            url: url
        };

    $http(requestor).then(function (response) {
        $scope.dataModel = response.data.dataModel;
        $scope.config = response.data.formConfig; // response data 
    }, function (error) {
        console.log(JSON.stringify(error));
    });

    $scope.getCurrentSelected = function (e, name) {
        switch (name) {
            case 'CANCEL REQUEST':
                $scope.reasonForStatusPopupShow();
                $scope.progressStatusTitle = "CANCEL REQUEST"
                //$state.go("projects.requester", { mode: "requestCanceled" });
                break;

            case 'FLIP TO PROJECT':
               //$scope.reasonForStatusPopupShow();
                //$scope.progressStatusTitle = "FLIP TO PROJECT"
                $state.go("projects.new");
                break;

            case 'MARK AS COMPLETE':
                $scope.reasonForStatusPopupShow();
                $scope.progressStatusTitle = "MARK AS COMPLETE"
               // $state.go("projects.requester", { mode: "completedRequester" });
                break;
        }
    }

    $scope.projectRequestData = [
        {
            actTaken: "Request Created",
            actTakBy: "Pallav Thakker",
            actTakOn: "16/06/2018",
            reason: "Lorem ipsum dolor Lorem ipsum dolor ",
            comments: "Comment 1 There are comments available in this document. There are comments available in this document.There are comments available in this document."
        },
        {
            actTaken: "Ownership Changed",
            actTakBy: "Pallav Thakker",
            actTakOn: "16/06/2018",
            reason: "Lorem ipsum dolor Lorem ipsum dolor skushhdjs skisjlijss skkjs,jsskjjslsjsljsls slsl ",
            comments: "Comment 2 There are comments available in this document. There are comments available in this document.There are comments available in this document."
        },
        {
            actTaken: "Status changed to Active",
            actTakBy: "Nishant Nayan",
            actTakOn: "16/06/2018",
            reason: "Lorem ipsum dolor",
            comments: "Comment 3 There are comments available in this document. There are comments available in this document.There are comments available in this document."
        },
        {
            actTaken: "Status changed to In-Progress",
            actTakBy: "Nishant Nayan",
            actTakOn: "16/06/2018",
            reason: "Lorem ipsum dolor Lorem ipsum dolor",
            comments: "Comment 4 There are comments available in this document. There are comments available in this document.There are comments available in this document."
        },
        {
            actTaken: "Status changed to Completed",
            actTakBy: "Rahul Nirbhawane",
            actTakOn: "16/06/2018",
            reason: "Lorem ipsum dolor Lorem ipsum",
            comments: "Comment 5 There are comments available in this document. There are comments available in this document.There are comments available in this document."
        },
        {
            actTaken: "Status changed to Cancelled",
            actTakBy: "Rahul Nirbhawane",
            actTakOn: "16/06/2018",
            reason: "Lorem ipsum dolor Lorem ipsum dolor",
            comments: "Comment 6 There are comments available in this document. There are comments available in this document.There are comments available in this document."
        }, {
            actTaken: "Request document reopned",
            actTakBy: "Nishant Nayan",
            actTakOn: "16/06/2018",
            reason: "Lorem ipsum dolor Lorem ipsum dolor",
            comments: "Comment 7 There are comments available in this document. There are comments available in this document.There are comments available in this document."
        }
   ];


 $scope.defaultOption = { 'size': '5' };
$scope.rowsToShowProjOpts = [
    { 'size': '5' },
    { 'size': '10' }];

$scope.selectedProjectOption = $scope.rowsToShowProjOpts[0];

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
    //comments popup----end

    //Reason For Status Pop up Start Here.
    $scope.reasonForStatusPopupUrl = "shared/popup/views/popupReasonForStatus.html";
    $scope.reasonForStatusPopup = false;
    $scope.reasonForStatusPopupShow = function (e) {
        $scope.reasonForStatusPopup = true;
    };

    $scope.reasonForStatusPopupHide = function (e) {
        $scope.reasonForStatusPopup = false;
    };

    $scope.reasonType = [{ "type": "Reason one" }, { "type": "Reason two" }, { "type": "Reason three" }]
    //Reason For Status Pop up End Here.

    
    $scope.closeCommentInfoBar = function () {
        $scope.commentStatusActive = false;
        $scope.topValueSectionTrack = 115;
    }
    $scope.topValueSectionTrack = 115;

    $scope.changeStatus = function (s) {
        if (s == "MARK AS COMPLETE") {
            $state.go("projects.requester", { mode: "completedRequester" })
        }
        if (s == "CANCEL REQUEST") {
            $state.go("projects.requester", { mode: "requestCanceled" })
        }
    }
   
}

//TEAM MEMBERS
function requesterTeamMemberCtrlFunc($scope, $http, notification, $notification, $filter, PPSTService, $timeout, $state, storeService, dbFactory) {
    $scope.teamMemberData = false;

    $scope.mode = $state.params.mode;
    $scope.addTeamMemberFromRepoCall = function () {
        
        $state.go('projects.addTeamMember', { view: "supTeamMember" });
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



   

    // Start: Load more team members
    $scope.totalDisplayed = 10;
    $scope.loadMore = function () {
        $scope.totalDisplayed += 7;
    };
    // End: Load more team members


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
        else if (checkCounter === teamMemberlength)
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
    $scope.teamMemberList = [];

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
        $scope.teamMemberMasterList = response.data.list;
        for (var i = 0; i < $scope.teamMemberMasterList.length; i++) {
            if ($scope.teamMemberMasterList[i].preAdded == true) {
                $scope.teamMemberList.unshift($scope.teamMemberMasterList[i]);
            }
        }

        $scope.teamMemberMasterListCheckedCount = $filter('filter')($scope.teamMemberMasterList, { check: true }).length;

        dbFactory.all('teamMember', 'addedOn_idx').then(function (teamMember) {

            var primaryTeamMember = "";
            for (var i = 0; i < teamMember.length; i++) {
                highlight = false;
                if (addedTeamMembers && addedTeamMembers.indexOf(teamMember[i].title) >= 0)
                    $scope.teamMemberData = true;
                highlight = true;

                if (!teamMember[i].isPrimary) {
                    $scope.teamMemberList.unshift({
                        "title": teamMember[i].title,
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
                    });
                } else {
                    primaryTeamMember = {
                        "title": teamMember[i].title,
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
                        "isPrimary": teamMember[i].isPrimary
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
                    "isPrimary": value.isPrimary
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
