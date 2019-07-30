'use strict';

angular
.module('SMART2')
.controller('trackStatusCtrl', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$location', '$timeout', trackStatusCtrlFunc]);

function trackStatusCtrlFunc($scope, $http, $state, $stateParams, $rootScope, $location, $timeout) {

    $scope.selectedDoc = "Requisition";
    //$scope.heightTrackStatus = function () {
    //    if ($state.current.name == 'trackstatus') {
    //        return '100%';
    //    }
    //    else {
    //        return '230px'
    //    }
    //};
    //if ($state.current.name == 'trackstatus') {
    //    $scope.heightTrackStatus = '100%';
    //}
    //else {
        $scope.heightTrackStatus = '230px';
       // }
        $scope.goToTracksatusDetail = function (e) {
        //$scope.$parent.trackStatusPopup = false;
        //$state.go('trackstatus');
        $scope.heightTrackStatus = '100%';
        $scope.isFullscreen = !$scope.isFullscreen;
    }

    $scope.selectedDoc = { "title": "Requisition"};
    $scope.selectDocOpt = [
            { "title": "Requisition", "selected": true },
            { "title": "Order", "selected": false },
            { "title": "Invoice", "selected": false },
            { "title": "Invoice Reconciliation", "selected": false },
            { "title": "Credit Note", "selected": false },
            { "title": "Receipt", "selected": false }
    ];
    $scope.DocumentName = "REQUISITION 1477239843210";
    $scope.DocumentNumber = "REQ2015 - 001552";
    $scope.getAmount = "544.74";
    $scope.getCurrencyCode = "USD";
    $scope.getdocumentStatus = "Approval Pending";
    $scope.getCreatedOn = "Nov 12, 2015";
    $scope.getCreatedByName = "Emily Ross";

   
    $scope.dropDownConfig = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    };
    $scope.approverTypes = [
        { icon: '#icon_TSPending', color: 'grey-text', text: 'Add AdHoc Approver' },
        { icon: '#icon_AppHoc', color: 'color-add-Hoc', text: 'AdHoc Approver' }
    ];
    $scope.approvarTypes = [
        { icon: '#icon_AppOne', color: 'color-approved-pending', text: 'Pool Approval - At least one needs to approve' },
        { icon: '#icon_AppAll', color: 'color-approved-pending', text: 'Parallel Approval - Everyone must approve' },
        { icon: '#icon_AppSingle', color: 'color-approved-pending', text: 'Individual needs to approve' },
        { icon: '#Icon_AppAuto', color: 'color-approved-pending', text: 'Automatic approval by the system' },
         { icon: '#icon_AppHoc', color: 'color-add-Hoc', text: 'AdHoc Approver' }
    ];
    $scope.statuss = [
        { icon: '#icon_TSAccepted', color: 'color-approved', text: 'Approved/Accepted/Signed' },
        { icon: '#icon_TSRejected', color: 'color-rejected', text: 'Rejected' },
        { icon: '#icon_TSPartialAc', color: 'color-approved', text: 'Partially Approved/Accepted' },
        { icon: '#icon_TSPartialRe', color: 'color-rejected', text: 'Partially Rejected' },
        { icon: '#icon_TSPending', color: 'color-approved-pending', text: 'Pending' },
        { icon: '#icon_Info_i', color: 'grey-text', text: 'Information' }
       
    ];
    $scope.statusLists = [
          {
              status: 'CREATED ORDER',
              approvalGroupNameVisible: false,
              getCreatedBy: 'by Buyer',
              getCreatedByUser: 'John H',
              iconComment: true,
              onDated: 'on 01/06/2016',
              process: 'completed',
              isDetailShow: false,
              id: 1,
          },
          {
              status: 'SENT FOR APPROVAL',
              approvalGroupNameVisible: false,
              getCreatedBy: 'by System',
              iconComment: false,
              onDated: 'on 01/06/2016',
              process: 'inProgress',
              isDetailShow: false,
              id: 2,
          },
          {
              status: 'APPROVED',
              approvalGroupNameVisible: true,
              approvalGroupName: 'POOL APPROVAL',
              ForApproval: 'Pool',
              onDated: 'on 01/06/2016',
              roles: true,
              id: 3,
              roleGroup: 'Role Group',
              roleGroupValue: 'Cost Center Approval',
              ruleName: 'Rule Name',
              ruleNameValue: 'Cost Center',
              process: 'inProgress',
              isDetailShow: false,
              userInfo: [
           {
               name: 'Josh W',
               userType: 'External User',
               userCommentIcon: false,
               designation: 'Manager',
               userStatus: 'Delegated',

               userModes: false,
               userMode: '',
               onDated: 'on Nov 16, 2015',
           },
          {
              name: 'Ross G',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userDelegate: true,
              userModes: false,
              userMode: '',
              onDated: '',
          },
           {
               name: 'Whitney H',
               userType: '',
               userCommentIcon: false,
               designation: 'Manager',
               userStatus: 'Approval Pending',
               userModes: false,
               userMode: '',
               onDated: '',
           }
              ]
          },
          {
              status: 'APPROVED',
              approvalGroupNameVisible: true,
              approvalGroupName: 'POOL APPROVAL',
              ForApproval: 'Pool',
              onDated: 'on 01/06/2016',
              roles: true,
              id: 4,
              roleGroup: 'Role Group',
              roleGroupValue: 'Cost Center Approval',
              ruleName: 'Rule Name',
              ruleNameValue: 'Cost Center',
              process: 'inProgress',
              isDetailShow: false,
              userInfo: [
           {
               name: 'Josh W',
               userType: 'External User',
               userCommentIcon: false,
               designation: 'Manager',
               userStatus: 'Delegated',

               userModes: false,
               userMode: '',
               onDated: 'on Nov 16, 2015',
           },
          {
              name: 'Ross G',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userDelegate: true,
              userModes: false,
              userMode: '',
              onDated: '',
          },
           {
               name: 'Whitney H',
               userType: '',
               userCommentIcon: false,
               designation: 'Manager',
               userStatus: 'Approval Pending',
               userModes: false,
               userMode: '',
               onDated: '',
           }
              ]
          },
          {
              status: 'APPROVED',
              approvalGroupNameVisible: true,
              approvalGroupName: 'POOL APPROVAL',
              ForApproval: 'Pool',
              onDated: 'on 01/06/2016',
              roles: true,
              id: 5,
              roleGroup: 'Role Group',
              roleGroupValue: 'Cost Center Approval',
              ruleName: 'Rule Name',
              ruleNameValue: 'Cost Center',
              process: 'inProgress',
              isDetailShow: false,
              userInfo: [
           {
               name: 'Josh W',
               userType: 'External User',
               userCommentIcon: false,
               designation: 'Manager',
               userStatus: 'Delegated',

               userModes: false,
               userMode: '',
               onDated: 'on Nov 16, 2015',
           },
          {
              name: 'Ross G',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userDelegate: true,
              userModes: false,
              userMode: '',
              onDated: '',
          },
           {
               name: 'Whitney H',
               userType: '',
               userCommentIcon: false,
               designation: 'Manager',
               userStatus: 'Approval Pending',
               userModes: false,
               userMode: '',
               onDated: '',
           }
              ]
          },
          {
           status: 'PENDING',
           approvalGroupNameVisible: true,
           approvalGroupName: 'POOL APPROVAL',
           ForApproval: 'Pool',
           onDated: 'on 01/06/2016',
           roles: true,
           id: 6,
           roleGroup : 'Role Group',
           roleGroupValue: 'Cost Center Approval',
           ruleName: 'Rule Name',
           ruleNameValue: 'Cost Center',
           process: 'inProgress',
           isDetailShow:false,
           userInfo: [
           {
               name: 'Josh W',
               userType: '- External User',
               userCommentIcon: false,               
               designation: 'Manager',
               userStatus: 'Approved',
               userModes: false,
               userMode: '',
               onDated: 'on Nov 16, 2015',               
           },
          {
              name: 'Ross G',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userModes: false,
              userMode: '',
              onDated: '',
          },
           {
               name: 'Whitney H',
               userType: '',
               userCommentIcon: false,
               designation: 'Manager',
               userStatus: 'Approval Pending',
               userModes: false,
               userMode: '',
               onDated: '',
           }
           ]
       },       
          {
             status: 'REJECTED',
             approvalGroupNameVisible: true,
             approvalGroupName: 'PARALLEL APPROVAL',
             ForApproval: 'PARALLEL',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 7,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: '',
             isDetailShow: false,
             userInfo: [
              {
                  name: 'Josh W',
                  userType: 'External User',
                  userCommentIcon: false,
                  designation: 'Manager',
                  userStatus: 'Approved',
                  userModes: true,
                  userMode: 'OFFLINE',
                  onDated: 'Nov 16, 2015',
              },
             {
                 name: 'Ross G',
                 userType: '',
                 userCommentIcon: false,
                 designation: 'Manager',
                 userStatus: 'Approval Pending',
                 userModes: false,
                 userMode: '',
                 onDated: '',
             },
              {
                  name: 'Whitney H',
                  userType: '',
                  userCommentIcon: false,
                  designation: 'Manager',
                  userStatus: 'Rejected',
                  userModes: false,
                  userMode: '',
                  onDated: '',
              }
             ]
         },
    ];

    /*Review Tab Data*/
    $scope.reviewstatusLists = [
         {
             status: 'CREATED ORDER',
             approvalGroupNameVisible: false,
             getCreatedBy: 'by Buyer',
             getCreatedByUser: 'John H',
             iconComment: true,
             onDated: 'on 01/06/2016',
             process: 'completed',
             isDetailShow: false,
             id: 1,
         },
         {
             status: 'SENT FOR REVIEW',
             approvalGroupNameVisible: false,
             getCreatedBy: 'by System',
             iconComment: false,
             onDated: 'on 01/06/2016',
             process: 'inProgress',
             isDetailShow: false,
             id: 2,
         },
         {
             status: 'ACCEPTED',
             approvalGroupNameVisible: true,
             approvalGroupName: 'POOL REVIEW',
             ForApproval: 'Pool',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 3,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: 'inProgress',
             isDetailShow: false,
             userInfo: [
          {
              name: 'Josh W',
              userType: 'External User',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Delegated',

              userModes: false,
              userMode: '',
              onDated: 'on Nov 16, 2015',
          },
         {
             name: 'Ross G',
             userType: '',
             userCommentIcon: false,
             designation: 'Manager',
             userStatus: 'Approval Pending',
             userDelegate: true,
             userModes: false,
             userMode: '',
             onDated: '',
         },
          {
              name: 'Whitney H',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userModes: false,
              userMode: '',
              onDated: '',
          }
             ]
         },
         {
             status: 'ACCEPTED',
             approvalGroupNameVisible: true,
             approvalGroupName: 'POOL REVIEW',
             ForApproval: 'Pool',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 4,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: 'inProgress',
             isDetailShow: false,
             userInfo: [
          {
              name: 'Josh W',
              userType: 'External User',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Delegated',

              userModes: false,
              userMode: '',
              onDated: 'on Nov 16, 2015',
          },
         {
             name: 'Ross G',
             userType: '',
             userCommentIcon: false,
             designation: 'Manager',
             userStatus: 'Approval Pending',
             userDelegate: true,
             userModes: false,
             userMode: '',
             onDated: '',
         },
          {
              name: 'Whitney H',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userModes: false,
              userMode: '',
              onDated: '',
          }
             ]
         },
         {
             status: 'ACCEPTED',
             approvalGroupNameVisible: true,
             approvalGroupName: 'POOL REVIEW',
             ForApproval: 'Pool',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 5,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: 'inProgress',
             isDetailShow: false,
             userInfo: [
          {
              name: 'Josh W',
              userType: 'External User',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Delegated',

              userModes: false,
              userMode: '',
              onDated: 'on Nov 16, 2015',
          },
         {
             name: 'Ross G',
             userType: '',
             userCommentIcon: false,
             designation: 'Manager',
             userStatus: 'Approval Pending',
             userDelegate: true,
             userModes: false,
             userMode: '',
             onDated: '',
         },
          {
              name: 'Whitney H',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userModes: false,
              userMode: '',
              onDated: '',
          }
             ]
         },
         //{
         //    status: 'PENDING',
         //    approvalGroupNameVisible: true,
         //    approvalGroupName: 'POOL REVIEW',
         //    onDated: 'on 01/06/2016',
         //    roles: true,
         //    id: 6,
         //    roleGroup: 'Role Group',
         //    roleGroupValue: 'Cost Center Approval',
         //    ruleName: 'Rule Name',
         //    ruleNameValue: 'Cost Center',
         //    process: 'inProgress',
         //    isDetailShow: false,
         //    userInfo: [
         //    {
         //        name: 'Josh W',
         //        userType: '- External User',
         //        userCommentIcon: false,
         //        designation: 'Manager',
         //        userStatus: 'Approved',
         //        userModes: false,
         //        userMode: '',
         //        onDated: 'on Nov 16, 2015',
         //    },
         //   {
         //       name: 'Ross G',
         //       userType: '',
         //       userCommentIcon: false,
         //       designation: 'Manager',
         //       userStatus: 'Approval Pending',
         //       userModes: false,
         //       userMode: '',
         //       onDated: '',
         //   },
         //    {
         //        name: 'Whitney H',
         //        userType: '',
         //        userCommentIcon: false,
         //        designation: 'Manager',
         //        userStatus: 'Approval Pending',
         //        userModes: false,
         //        userMode: '',
         //        onDated: '',
         //    }
         //    ]
         //},
         //{
         //    status: 'REJECTED',
         //    approvalGroupNameVisible: true,
         //    approvalGroupName: 'PARALLEL REVIEW',
         //    onDated: 'on 01/06/2016',
         //    roles: true,
         //    id: 7,
         //    roleGroup: 'Role Group',
         //    roleGroupValue: 'Cost Center Approval',
         //    ruleName: 'Rule Name',
         //    ruleNameValue: 'Cost Center',
         //    process: '',
         //    isDetailShow: false,
         //    userInfo: [
         //     {
         //         name: 'Josh W',
         //         userType: 'External User',
         //         userCommentIcon: false,
         //         designation: 'Manager',
         //         userStatus: 'Approved',
         //         userModes: true,
         //         userMode: 'OFFLINE',
         //         onDated: 'Nov 16, 2015',
         //     },
         //    {
         //        name: 'Ross G',
         //        userType: '',
         //        userCommentIcon: false,
         //        designation: 'Manager',
         //        userStatus: 'Approval Pending',
         //        userModes: false,
         //        userMode: '',
         //        onDated: '',
         //    },
         //     {
         //         name: 'Whitney H',
         //         userType: '',
         //         userCommentIcon: false,
         //         designation: 'Manager',
         //         userStatus: 'Rejected',
         //         userModes: false,
         //         userMode: '',
         //         onDated: '',
         //     }
         //    ]
         //},
    ]; 

    /*Signature Tab Data*/
    $scope.signstatusLists = [
         {
             status: 'PO CLOSED',
             approvalGroupNameVisible: false,
             getCreatedBy: 'by Buyer',
             getCreatedByUser: 'John H',
             iconComment: true,
             onDated: 'on 01/06/2016',
             process: 'completed',
             isDetailShow: false,
             id: 1,
         },
         {
             status: 'SENT FOR SIGNATURE',
             approvalGroupNameVisible: false,
             getCreatedBy: 'by System',
             iconComment: false,
             onDated: 'on 01/06/2016',
             process: 'inProgress',
             isDetailShow: false,
             id: 2,
         },
         {
             status: 'APPROVAL',
             approvalGroupNameVisible: true,
             approvalGroupName: 'POOL SIGNATURE',
             ForApproval: 'Pool',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 3,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: 'inProgress',
             isDetailShow: false,
             userInfo: [
          {
              name: 'Josh W',
              userType: 'External User',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Delegated',

              userModes: false,
              userMode: '',
              onDated: 'on Nov 16, 2015',
          },
         {
             name: 'Ross G',
             userType: '',
             userCommentIcon: false,
             designation: 'Manager',
             userStatus: 'Approval Pending',
             userDelegate: true,
             userModes: false,
             userMode: '',
             onDated: '',
         },
          {
              name: 'Whitney H',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userModes: false,
              userMode: '',
              onDated: '',
          }
             ]
         },
         {
             status: 'APPROVAL',
             approvalGroupNameVisible: true,
             approvalGroupName: 'POOL SIGNATURE',
             ForApproval: 'Pool',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 4,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: 'inProgress',
             isDetailShow: false,
             userInfo: [
          {
              name: 'Josh W',
              userType: 'External User',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Delegated',

              userModes: false,
              userMode: '',
              onDated: 'on Nov 16, 2015',
          },
         {
             name: 'Ross G',
             userType: '',
             userCommentIcon: false,
             designation: 'Manager',
             userStatus: 'Approval Pending',
             userDelegate: true,
             userModes: false,
             userMode: '',
             onDated: '',
         },
          {
              name: 'Whitney H',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userModes: false,
              userMode: '',
              onDated: '',
          }
             ]
         },
         {
             status: 'APPROVAL',
             approvalGroupNameVisible: true,
             approvalGroupName: 'POOL SIGNATURE',
             ForApproval: 'Pool',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 5,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: 'inProgress',
             isDetailShow: false,
             userInfo: [
          {
              name: 'Josh W',
              userType: 'External User',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Delegated',

              userModes: false,
              userMode: '',
              onDated: 'on Nov 16, 2015',
          },
         {
             name: 'Ross G',
             userType: '',
             userCommentIcon: false,
             designation: 'Manager',
             userStatus: 'Approval Pending',
             userDelegate: true,
             userModes: false,
             userMode: '',
             onDated: '',
         },
          {
              name: 'Whitney H',
              userType: '',
              userCommentIcon: false,
              designation: 'Manager',
              userStatus: 'Approval Pending',
              userModes: false,
              userMode: '',
              onDated: '',
          }
             ]
         },
         {
             status: 'SIGNED',
             approvalGroupNameVisible: false,
             getCreatedBy: 'by Buyer',
             getCreatedByUser: 'John H',
             iconComment: false,
             onDated: 'on 01/06/2016',
             process: 'completed',
             isDetailShow: false,
             id: 1,
         },
         {
             status: 'PENDING',
             approvalGroupNameVisible: true,
             approvalGroupName: 'POOL SIGNATURE',
             
             ForApproval: 'Sign',
             onDated: 'on 01/06/2016',
             roles: true,
             id: 6,
             roleGroup: 'Role Group',
             roleGroupValue: 'Cost Center Approval',
             ruleName: 'Rule Name',
             ruleNameValue: 'Cost Center',
             process: 'inProgress',
             isDetailShow: false,
             userInfo: [
             {
                 name: 'Josh W',
                 userType: '- External User',
                 userCommentIcon: false,
                 designation: 'Manager',
                 userStatus: 'Approved',
                 userModes: false,
                 userMode: '',
                 onDated: 'on Nov 16, 2015',
             },
            {
                name: 'Ross G',
                userType: '',
                userCommentIcon: false,
                designation: 'Manager',
                userStatus: 'Approval Pending',
                userModes: false,
                userMode: '',
                onDated: '',
            },
             {
                 name: 'Whitney H',
                 userType: '',
                 userCommentIcon: false,
                 designation: 'Manager',
                 userStatus: 'Approval Pending',
                 userModes: false,
                 userMode: '',
                 onDated: '',
             }
             ]
         },
         //{
         //    status: 'REJECTED',
         //    approvalGroupNameVisible: true,
         //    approvalGroupName: 'PARALLEL REVIEW',
         //    onDated: 'on 01/06/2016',
         //    roles: true,
         //    id: 7,
         //    roleGroup: 'Role Group',
         //    roleGroupValue: 'Cost Center Approval',
         //    ruleName: 'Rule Name',
         //    ruleNameValue: 'Cost Center',
         //    process: '',
         //    isDetailShow: false,
         //    userInfo: [
         //     {
         //         name: 'Josh W',
         //         userType: 'External User',
         //         userCommentIcon: false,
         //         designation: 'Manager',
         //         userStatus: 'Approved',
         //         userModes: true,
         //         userMode: 'OFFLINE',
         //         onDated: 'Nov 16, 2015',
         //     },
         //    {
         //        name: 'Ross G',
         //        userType: '',
         //        userCommentIcon: false,
         //        designation: 'Manager',
         //        userStatus: 'Approval Pending',
         //        userModes: false,
         //        userMode: '',
         //        onDated: '',
         //    },
         //     {
         //         name: 'Whitney H',
         //         userType: '',
         //         userCommentIcon: false,
         //         designation: 'Manager',
         //         userStatus: 'Rejected',
         //         userModes: false,
         //         userMode: '',
         //         onDated: '',
         //     }
         //    ]
         //},
    ];

    $scope.IconStatus = function (ele) {
        switch (ele) {
            case 'PENDING':
                return '#icon_TSHexOutlin';
                break;
            case 'APPROVAL':
                return '#icon_TSHexOutlin';
                break;
            case 'REJECTED':
                return '#icon_TSHexOutlin';
                break;
            case 'ACCEPTED':
                return '#icon_TSHexOutlin';
                break;
            case 'APPROVED':
                return '#icon_TSHexOutlin';
                break;
            default:
                return '#icon_Info_i';
        }
    };
    
    $scope.IconForApproval = function (ele) {
        switch (ele) {
            case 'Pool':
                return '#icon_AppOne';
                break;
            case 'PARALLEL':               
                return '#icon_AppAll';
                break;
            case 'Sign':
                return '#icon_AppSingle';
                break;            
            default:
                return '';
        } 
    };
     $scope.InnerIconStatus = function (ele) {
        switch (ele) {
            case 'PENDING':
                return '#icon_TSPending';
                break;
            case 'APPROVAL':
                return '#icon_TSAccepted';
                break;
            case 'ACCEPTED':
                return '#icon_TSAccepted';
                break;
            case 'APPROVED':
                return '#icon_TSAccepted';
                break;
            case 'REJECTED':
                return '#icon_TSRejected';
                break;            
            default:
                return '#icon_Info';
    }
    };    
     $scope.slideParentfunc = function (a, b) {
         for (var i = 0; i < b.length; i++) {
             if (a.id == b[i].id) {
                 b[i].isDetailShow = !(a.isDetailShow);                                 
             }
         }
     }
    
     $scope.slideDetailsTS = function (trackStatusObj, from) {
        
         switch (from) {
             case "review":
                 $scope.slideParentfunc(trackStatusObj, $scope.reviewstatusLists);
                 break;
             case "approval":
                 $scope.slideParentfunc(trackStatusObj, $scope.statusLists);
                 break;
             case "sign":
                 $scope.slideParentfunc(trackStatusObj, $scope.signstatusLists);
                 break;
         }
     }
   
    $scope.applyStatusColor = function (ele) {
        switch (ele) {
            case 'Approved':
                return 'color-approved';
                break;
            case 'ACCEPTED':
                return 'color-approved';
                break;
            case 'APPROVED':
                return 'color-approved';
                break;
            case 'Approval Pending':
                return 'color-approved-pending';
                break;
            case 'Rejected':
                return 'color-rejected';
                break;
            case 'Delegated':
                return 'shades-text text-black';
                break;
            case 'PENDING':
                return 'color-approved-pending';
                break;
            case 'APPROVAL':
                return 'color-approved';
                break;
            case 'REJECTED':
                return 'color-rejected';
            case 'Budget Overriden':
                return 'color-bud-overrid';
            default:
                return 'grey-text';
        }
    };

    $scope.approvalGroupType = function (ele) {
        switch (ele) {
            case 'Pool Approval':
                return 'a-g-pool-approval';
                break;
            case 'Parallel Approval':
                return 'a-g-parallel-approval';
                break;
            case 'HR Approval':
                return 'a-g-HR-approval';
                break;
            case 'Group Approval':
                return 'a-g-group-approval';
                break;
            default:
                return false;
        }
    };

    $scope.joinWordwith = function (ele) {
        if (ele == '') {
            return 'with';
        }
        else {
            return 'by';
        }
    };

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
    $scope.cycleSelected = 'cycle 2';
    $scope.cycleObject = [
            {
                'title': 'Cycle 1', selected: true
            },
            { 'title': 'Cycle 2', selected: false }
    ];
   
    //$scope.heightTrackStatus = function () {
        //if ($state.current.name == 'trackstatus') {
        //    return false;
        //}
        //else {
        //    return '230px'
        //}
    //};  
    //for 'trackstatus' state it removes 'modal-close' class & else add 'modal-close' class
    $scope.showEmailPopup = false;
    var loc = $location.path();
    $scope.locationFn = function () {
        if (loc == '/trackStatus') {
            $scope.ispopup = false;
            $scope.showEmailPopup = true;
            

            //emailer popup
            $scope.emailer = "shared/popup/views/popupEmailer.html";
            $scope.emailerPopup = false;
            $scope.emailerPopupCallback = function (e) {
                $scope.emailerPopup = true;
            };

            $scope.emailerPopupHideCallback = function (e) {
                $scope.emailerPopup = false;
            };

        }
        else {
            $scope.ispopup = true;
            $scope.showEmailPopup = false;
        }
    };
    /*New Track Status Approval*/
    $scope.trackStatusTabs = [
          { "title": "Review", "contentUrl": "shared/trackStatus/views/pendingTrackStatus.html" },
          { "title": "Approval", "contentUrl": "shared/trackStatus/views/approvalTrackStatus.html", "active": true },
           { "title": "Signature", "contentUrl": "shared/trackStatus/views/signatureTrackStatus.html" }
    ];
    $scope.newstatusLists = [
          {
              status: 'SUBMITTED',
              approver: $scope.getCreatedByName,
              onDated: $scope.getCreatedOn,
              process: 'completed',
              isGroupApproval: false

          },
       {
           status: 'APPROVAL PENDING',
           approver: '',
           onDated: '',
           process: 'inProgress',
           isGroupApproval: true,
           approvalGroupName: 'Pool Approval',
           approversLists: [
           {
               approver: 'Josh Write',
               onDated: 'Nov 16, 2015',
               status: 'Approved'
           },
          {
              approver: 'Allen Kutcher',
              onDated: '',
              status: 'Approval Pending'
          },
           {
               approver: 'Whitney H',
               onDated: 'Nov 20, 2015',
               status: 'Rejected'
           }
           ]
       },
          {
              status: 'APPROVAL PENDING',
              approver: 'Mark Mckinskey',
              onDated: '',
              process: 'notInProgress',
              isGroupApproval: false
          }
    ];
}
