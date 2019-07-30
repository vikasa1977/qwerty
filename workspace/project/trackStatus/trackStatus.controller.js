'use strict';

angular
.module('SMART2')
.controller('NewTrackStatusCntrl', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$location', '$timeout', 'trackStatusService', 'trackStatusService1', trackStatusCtrlFunc]);

function trackStatusCtrlFunc($scope, $http, $state, $stateParams, $rootScope, $location, $timeout,trackStatusService, trackStatusService1) {

    $scope.trackStatusPopup = false;
    $scope.showTrackStatus = function () {
        $scope.trackStatusPopup = true;
    }
    $scope.trackStatusOnHideCallback = function () {
        $scope.trackStatusPopup = false;
    }
    $scope.heightTrackStatus = '230px';
    $scope.goToTracksatusDetail = function (e) {
        $scope.heightTrackStatus = '100%';
        $scope.isFullscreen = !$scope.isFullscreen;
    }

    // Load track status data
    function loadTrackstatusData() {
        var path = [{ url: 'project/trackStatus/trackStatusData.json' }];
        trackStatusService1.getData(path).then(function (response) {
            $scope.statusListData = response[0].data; // data for track status
        }).catch(function (err) {
            console.error("error fecthing tracj status data");
        });
    }
    loadTrackstatusData();

    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };
    //$scope.approverTypes = [
    //    { icon: '#icon_TSPending', color: 'grey-text', text: 'Add AdHoc Approver' },
    //    { icon: '#icon_AppHoc', color: 'color-add-Hoc', text: 'AdHoc Approver' }
    //];
    //$scope.approvarTypes = [
    //    { icon: '#icon_AppOne', color: 'color-approved-pending', text: 'Pool Approval - At least one needs to approve' },
    //    { icon: '#icon_AppAll', color: 'color-approved-pending', text: 'Parallel Approval - Everyone must approve' },
    //    { icon: '#icon_AppSingle', color: 'color-approved-pending', text: 'Individual needs to approve' },
    //    { icon: '#Icon_AppAuto', color: 'color-approved-pending', text: 'Automatic approval by the system' },
    //     { icon: '#icon_AppHoc', color: 'color-add-Hoc', text: 'AdHoc Approver' }
    //];
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
        console.log('$scope.statusListData', $scope.statusListData);
        trackStatusService.dataChange();
    }
    //$scope.statuss = [
    //    { icon: '#icon_TSAccepted', color: 'color-approved', text: 'Approved/Accepted/Signed' },
    //    { icon: '#icon_TSRejected', color: 'color-rejected', text: 'Rejected' },
    //    { icon: '#icon_TSPartialAc', color: 'color-approved', text: 'Partially Approved/Accepted' },
    //    { icon: '#icon_TSPartialRe', color: 'color-rejected', text: 'Partially Rejected' },
    //    { icon: '#icon_TSPending', color: 'color-approved-pending', text: 'Pending' },
    //    { icon: '#icon_Info_i', color: 'grey-text', text: 'Information' }

    //];
    //$scope.statusListData = [
    //    {
    //        "status": "Approved",
    //        "approvalGroupNameVisible": false,
    //        "approvalGroupName": "",
    //        "actionDate": "1505305780828",
    //        "isDetailShow": true,
    //        "id": 1,
    //        "roles": false,
    //        "roleGroup": "Role Group",
    //        "roleGroupValue": "Cost Center Approval",
    //        "ruleName": "Rule Name",
    //        "ruleNameValue": "Cost Center",
    //        "actionerDetails": [
	//			{
	//			    "Name": "Josh W",
	//			    "userType": "External User",
	//			    "Designation": "Manager",
	//			    "userStatus": "Approval Pending",
	//			    "userModes": false,
	//			    "userMode": "", 
	//			    "StatusDate": "1505305780828",
	//			    "userCommentIcon": false,
	//			    "Comments":
    //                  {
    //                      "comment": "Order exceeded the budget",
    //                      "status": "Rejected/Approved",
    //                      "Designation": "External User",
    //                      "date": "1505220554045"
    //                  },
	//			    "ProxyApproverId": 0,
	//			    "ProxyApproverName": "",
	//			    "ProxyApproverDesignation": "",
	//			    "proxyApproveruserStatus": "",
	//			    "proxyActionDate": "",
	//			    "proxyApproverComments":
    //                    {

    //                    }
	//			},
	//			{
	//			    "Name": "Ross G",
	//			    "userType": "",
	//			    "Designation": "Manager",
	//			    "userStatus": "Approval Pending",
	//			    "userModes": false,
	//			    "userMode": "", 
	//			    "StatusDate": "1505305780828",
	//			    "userCommentIcon": true,
	//			    "Comments":
    //                  {
    //                      "comment": "Order exceeded the budget",
    //                      "status": "Rejected/Approved",
    //                      "Designation": "External User",
    //                      "date": "1505220554045"
    //                  },
	//			    "ProxyApproverId": 1,
	//			    "ProxyApproverName": "Name of delegated user",
	//			    "ProxyApproverDesignation": "Designation",
	//			    "proxyApproveruserStatus": "Approval Pending",
	//			    "proxyActionDate": "1505305780828",
	//			    "proxyApproverComments":
    //                    {
    //                        "comment": "Order exceeded the budget",
    //                        "status": "Rejected/Approved",
    //                        "Designation": "External User",
    //                        "date": "1505220554045"
    //                    },

	//			},
	//			{
	//			    "Name": "Whitney H",
	//			    "userType": "",
	//			    "Designation": "Manager",
	//			    "userStatus": "Approval Pending",
	//			    "userModes": false,
	//			    "userMode": "", 
	//			    "StatusDate": "1505305780828",
	//			    "userCommentIcon": false,
	//			    "Comments": {
    //                      "comment": "Order exceeded the budget",
    //                      "status": "Rejected/Approved",
    //                      "Designation": "External User",
    //                      "date": "1505220554045"
    //                  },
	//			    "ProxyApproverId": 0,
	//			    "ProxyApproverName": "",
	//			    "ProxyApproverDesignation": "",
	//			    "proxyApproveruserStatus": "",
	//			    "proxyActionDate": "",
	//			    "proxyApproverComments": {

    //                    }
	//			}

    //        ]
    //    },
    //    {
    //        "status": "Pending",
    //        "approvalGroupNameVisible": false,
    //        "approvalGroupName": "",
    //        "actionDate": "1505305780828",
    //        "isDetailShow": true,
    //        "id": 1,
    //        "roles": false,
    //        "roleGroup": "Role Group",
    //        "roleGroupValue": "Cost Center Approval",
    //        "ruleName": "Rule Name",
    //        "ruleNameValue": "Cost Center",
    //        "actionerDetails": [
	//			{
	//			    "Name": "Josh W",
	//			    "userType": "External User",
	//			    "Designation": "Manager",
	//			    "userStatus": "Approved",
	//			    "userModes": false,
	//			    "userMode": "", 
	//			    "StatusDate": "1505305780828",
	//			    "userCommentIcon": false,
	//			    "Comments":
    //                  {
    //                      "comment": "Order exceeded the budget",
    //                      "status": "Rejected/Approved",
    //                      "Designation": "External User",
    //                      "date": "1505220554045"
    //                  },
	//			    "ProxyApproverId": 0,
	//			    "ProxyApproverName": "",
	//			    "ProxyApproverDesignation": "",
	//			    "proxyApproveruserStatus": "",
	//			    "proxyActionDate": "",
	//			    "proxyApproverComments":
    //                    {

    //                    }
	//			},
	//			{
	//			    "Name": "Ross G",
	//			    "userType": "",
	//			    "Designation": "Manager",
	//			    "userStatus": "Approval Pending",
	//			    "userModes": false,
	//			    "userMode": "",
	//			    "StatusDate": "1505305780828",
	//			    "userCommentIcon": false,
	//			    "Comments":
    //                  {
    //                      "comment": "Order exceeded the budget",
    //                      "status": "Rejected/Approved",
    //                      "Designation": "External User",
    //                      "date": "1505220554045"
    //                  },				    
	//			    "ProxyApproverId": 1,
	//			    "ProxyApproverName": "Name of delegated user",
	//			    "ProxyApproverDesignation": "Designation",
	//			    "proxyApproveruserStatus": "Approval Pending",
	//			    "proxyActionDate": "1505305780828",
	//			    "proxyApproverComments": 
    //                    {
    //                        "comment": "Order exceeded the budget",
    //                        "status": "Rejected/Approved",
    //                        "Designation": "External User",
    //                        "date": "1505220554045"
    //                    }
	//			}

    //        ]
    //    },
    //    {
    //        "status": "Rejected",
    //        "approvalGroupNameVisible": false,
    //        "approvalGroupName": "",
    //        "actionDate": "1505305780828",
    //        "isDetailShow": true,
    //        "id": 1,
    //        "roles": false,
    //        "roleGroup": "Role Group",
    //        "roleGroupValue": "Cost Center Approval",
    //        "ruleName": "Rule Name",
    //        "ruleNameValue": "Cost Center",
    //        "actionerDetails": [
	//			{
	//			    "Name": "Josh W",
	//			    "userType": "External User",
	//			    "Designation": "Manager",
	//			    "userStatus": "Approved",
	//			    "userModes": true,
	//			    "userMode": "OFFLINE",
	//			    "StatusDate": "1505305780828",
	//			    "userCommentIcon": false,
	//			    "Comments":
    //                  {
    //                      "comment": "Order exceeded the budget",
    //                      "status": "Rejected/Approved",
    //                      "Designation": "External User",
    //                      "date": "1505220554045"
    //                  },
	//			    "ProxyApproverId": 0,
	//			    "ProxyApproverName": "",
	//			    "ProxyApproverDesignation": "",
	//			    "proxyApproveruserStatus": "",
	//			    "proxyActionDate": "",
	//			    "proxyApproverComments":
    //                    {

    //                    }
	//			},
	//			{
	//			    "Name": "Ross G",
	//			    "userType": "",
	//			    "Designation": "Manager",
	//			    "userStatus": "Approval Pending",
	//			    "userModes": false,
	//			    "userMode": "",
	//			    "StatusDate": "",
	//			    "userCommentIcon": false,
	//			    "Comments":
    //                  {
    //                      "comment": "Order exceeded the budget",
    //                      "status": "Rejected/Approved",
    //                      "Designation": "External User",
    //                      "date": "1505220554045"
    //                  },
	//			    "ProxyApproverId": 1,
	//			    "ProxyApproverName": "Name of delegated user",
	//			    "ProxyApproverDesignation": "Designation",
	//			    "proxyApproveruserStatus": "Approval Pending",
	//			    "proxyActionDate": "1505305780828",
	//			    "proxyApproverComments":
    //                    {
    //                        "comment": "Order exceeded the budget",
    //                        "status": "Rejected/Approved",
    //                        "Designation": "External User",
    //                        "date": "1505220554045"
    //                    }
	//			}

    //        ]
    //    }

    //]

    $scope.changeCycle = function (model) {
        console.log("Change cycle controller", model);
    }


    //$scope.IconStatus = function (ele) {
    //    switch (ele.toLowerCase()) {
    //        case 'pending':
    //            return '#icon_TSHexOutlin';
    //            break;
    //        case 'approval':
    //            return '#icon_TSHexOutlin';
    //            break;
    //        case 'rejected':
    //            return '#icon_TSHexOutlin';
    //            break;
    //        case 'accepted':
    //            return '#icon_TSHexOutlin';
    //            break;
    //        case 'approved':
    //            return '#icon_TSHexOutlin';
    //            break;
    //        default:
    //            return '#icon_Info_i';
    //    }
    //};

    //$scope.IconForApproval = function (ele) {
    //    switch (ele) {
    //        case 'Pool':
    //            return '#icon_AppOne';
    //            break;
    //        case 'PARALLEL':
    //            return '#icon_AppAll';
    //            break;
    //        case 'Sign':
    //            return '#icon_AppSingle';
    //            break;
    //        default:
    //            return '';
    //    }
    //};
    //$scope.InnerIconStatus = function (ele) {
    //    switch (ele.toLowerCase()) {
    //        case 'pending':
    //            return '#icon_TSPending';
    //            break;
    //        case 'approval':
    //            return '#icon_TSAccepted';
    //            break;
    //        case 'accepted':
    //            return '#icon_TSAccepted';
    //            break;
    //        case 'approved':
    //            return '#icon_TSAccepted';
    //            break;
    //        case 'rejected':
    //            return '#icon_TSRejected';
    //            break;
    //        default:
    //            return '#icon_Info';
    //    }
    //};
    //$scope.slideParentfunc = function (a, b) {
    //    for (var i = 0; i < b.length; i++) {
    //        if (a.id == b[i].id) {
    //            b[i].isDetailShow = !(a.isDetailShow);
    //        }
    //    }
    //}

    //$scope.slideDetailsTS = function (trackStatusObj, from) {

    //    switch (from) {
    //        case "review":
    //            $scope.slideParentfunc(trackStatusObj, $scope.reviewstatusLists);
    //            break;
    //        case "approval":
    //            $scope.slideParentfunc(trackStatusObj, $scope.statusLists);
    //            break;
    //        case "sign":
    //            $scope.slideParentfunc(trackStatusObj, $scope.signstatusLists);
    //            break;
    //    }
    //}

    //$scope.applyStatusColor = function (ele) {
    //    switch (ele.toLowerCase()) {
    //        case 'approved':
    //            return 'color-approved';
    //            break;
    //        case 'accepted':
    //            return 'color-approved';
    //            break;
    //        case 'approval pending':
    //            return 'color-approved-pending';
    //            break;
    //        case 'rejected':
    //            return 'color-rejected';
    //            break;
    //        case 'delegated':
    //            return 'shades-text text-black';
    //            break;
    //        case 'pending':
    //            return 'color-approved-pending';
    //            break;
    //        case 'approval':
    //            return 'color-approved';
    //            break;
    //        case 'rejected':
    //            return 'color-rejected';
    //        case 'budget overriden':
    //            return 'color-bud-overrid';
    //        default:
    //            return 'grey-text';
    //    }
    //};

    //$scope.approvalGroupType = function (ele) {
    //    switch (ele) {
    //        case 'Pool Approval':
    //            return 'a-g-pool-approval';
    //            break;
    //        case 'Parallel Approval':
    //            return 'a-g-parallel-approval';
    //            break;
    //        case 'HR Approval':
    //            return 'a-g-HR-approval';
    //            break;
    //        case 'Group Approval':
    //            return 'a-g-group-approval';
    //            break;
    //        default:
    //            return false;
    //    }
    //};

    $scope.checkNextStatus = function (ele) {
        switch (ele) {
            case 'notInProgress':
                return ' before-not-in-pro ';
                break;
            case 'pending':
                return 'in-pro';
                break;
            case 'approval':
                return 'green lighten-5';
                break;
            case 'rejected':
                return 'red lighten-5';
                break;
            default:
                return 'grey lighten-5';
        }
    };
    $scope.trackStatus = $scope.trackStatusforSelected;
    $scope.cycle = $scope.cycleSelected;
    //$scope.cycleSelected = 'cycle 2';
    //$scope.cycleObject = [
    //        {
    //            'title': 'Cycle 1', selected: true
    //        },
    //        { 'title': 'Cycle 2', selected: false }
    //];
    
    /*New Track Status Approval*/
    //$scope.trackStatusTabs = [
    //      { "title": "Review", "contentUrl": "project/trackStatus/pendingTrackStatus.html" },
    //      { "title": "Approval", "contentUrl": "project/trackStatus/approvalTrackStatus.html", "active": true },
    //       { "title": "Signature", "contentUrl": "project/trackStatus/signatureTrackStatus.html" }
    //];
    //$scope.newstatusLists = [
    //      {
    //          status: 'SUBMITTED',
    //          approver: $scope.getCreatedByName,
    //          onDated: $scope.getCreatedOn,
    //          process: 'completed',
    //          isGroupApproval: false

    //      },
    //   {
    //       status: 'APPROVAL PENDING',
    //       approver: '',
    //       onDated: '',
    //       process: 'inProgress',
    //       isGroupApproval: true,
    //       approvalGroupName: 'Pool Approval',
    //       approversLists: [
    //       {
    //           approver: 'Josh Write',
    //           onDated: 'Nov 16, 2015',
    //           status: 'Approved'
    //       },
    //      {
    //          approver: 'Allen Kutcher',
    //          onDated: '',
    //          status: 'Approval Pending'
    //      },
    //       {
    //           approver: 'Whitney H',
    //           onDated: 'Nov 20, 2015',
    //           status: 'Rejected'
    //       }
    //       ]
    //   },
    //      {
    //          status: 'APPROVAL PENDING',
    //          approver: 'Mark Mckinskey',
    //          onDated: '',
    //          process: 'notInProgress',
    //          isGroupApproval: false
    //      }
    //];
}