angular.module('SMART2').directive('smartApproval', ['notification', '$filter', '$timeout', smartApprovalFunc]);


function smartApprovalFunc(notification, $filter, $timeout) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'shared/directives/approval/approvalTemplate.html',
        scope: {
            approvalFlowLists: '=data'
        },
        controller: function ($scope, $element, $attrs) {
            $scope.getCurrentSelected = [];
            // icon Apply with status	
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
                        return 'not-sent-for-approval';
                }
            };

            // icon for icon For team type
            $scope.IconForTeamType = function (ele) {
                switch (ele) {
                    case 'user':
                        return '#icon_User';
                        break;
                    case 'group':
                        return '#icon_AppOne';
                        break;
                }

            };

            // icon for icon inner status

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

                }
            };

            //approval Group type
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


            // check next status
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

            //slideParentFunction
            $scope.slideParentfunc = function (index) {
                $scope.approvalFlowLists[index].isDetailShow = !$scope.approvalFlowLists[index].isDetailShow
            }




            /* popup content */
            $scope.showAddApprovalLevelPopup = false;
            $scope.appendAfterThis = ""
            $scope.showAddApprovalLevelPopupCallback = function (e, index) {

                if ($scope.approvalFlowLists.length > 0 && !$scope.approvalFlowLists[index].offline) {

                    $scope.showAddApprovalLevelPopup = true;
                    if (index != undefined) {
                        $scope.appendAfterThis = index + 1
                    }

                } else if ($scope.approvalFlowLists.length == 0) {
                    $scope.showAddApprovalLevelPopup = true;
                }
            };
            $scope.hideAddApprovalLevelPopupCallback = function (e) {
                $scope.showAddApprovalLevelPopup = false;
            };




            $scope.tabsOptions = [{
                "tabName": "Users"
            }, {
                "tabName": "Groups"
            }];
            $scope.currentlySelected = {
                "tabName": "Users"
            };

            $scope.typeaheadLabel = "Ship To";
            $scope.users = [{
                "name": "John Doe",
                "type": "user",
                "members": "",
                "reassign": false,
                "reassignedTo": "",
                "edit": false
            }, {
                "name": "Michael Slater",
                "type": "user",
                "members": "",
                "reassign": false,
                "reassignedTo": "",
                "edit": false
            }, {
                "name": "Jammie Foster",
                "type": "user",
                "members": "",
                "reassign": false,
                "reassignedTo": "",
                "edit": false
            }, {
                "name": "Ozborne Lopez",
                "type": "user",
                "members": "",
                "reassign": false,
                "reassignedTo": "",
                "edit": false
            }];
            $scope.groups = [{
                "name": "Group1",
                "type": "group",
                "members": [
                   {
                       "name": "Josh W.",
                       "designation": "Manager"
                   },
                   {
                       "name": "Ross G.",
                       "designation": "Designation"
                   },
                   {
                       "name": "Whitney H.",
                       "designation": "Designation"
                   }

                ]
            }, {
                "name": "Group2",
                "type": "group",
                "members": [
                   {
                       "name": "Josh W.",
                       "designation": "Manager"
                   },
                   {
                       "name": "Ross G.",
                       "designation": "Designation"
                   },
                   {
                       "name": "Whitney H.",
                       "designation": "Designation"
                   }

                ]
            }, {
                "name": "Group3",
                "type": "group",
                "members": [
                   {
                       "name": "Josh W.",
                       "designation": "Manager"
                   },
                   {
                       "name": "Ross G.",
                       "designation": "Designation"
                   },
                   {
                       "name": "Whitney H.",
                       "designation": "Designation"
                   }

                ]
            }, {
                "name": "Group4",
                "type": "group",
                "members": [
                  {
                      "name": "Josh W.",
                      "designation": "Manager"
                  },
                  {
                      "name": "Ross G.",
                      "designation": "Designation"
                  },
                  {
                      "name": "Whitney H.",
                      "designation": "Designation"
                  }

                ],

            }];

            $scope.usersAsReassign = [
{
    "name": "John Doe",
    "designation": "Manager",
    "status": ""
}, {
    "name": "Michael Slater",
    "designation": "Manager",
    "status": ""
}, {
    "name": "Jammie Foster",
    "designation": "Manager",
    "status": ""
}, {
    "name": "Ozborne Lopez",
    "designation": "Manager",
    "status": ""
}
            ];
            $scope.groupsAsReassign = [
{
    "name": "Group1"
}, {
    "name": "Group2"
}, {
    "name": "Group3"
}, {
    "name": "Group4"

}
            ];

            $scope.suggestedData = $scope.users;
            $scope.suggestedDataForReassign = $scope.usersAsReassign
            $scope.autoSuggestPlaceholder = "Search & Add Users";
            $scope.changeCurrentType = function (tabName, selectedForApproval) {

                if (tabName == "Users") {
                    $scope.suggestedData = $scope.users;
                    $scope.suggestedDataForReassign = $scope.usersAsReassign;
                    $scope.autoSuggestPlaceholder = "Search & Add Users";
                    /* condition for selectedForApproval length*/
                    if (selectedForApproval.length > 0) {

                        var config = {
                            type: "confirm",
                            message: "<p class='left-align'>Your Selected Group's will get removed. Are you sure you want to proceed?</p>",
                            buttons: [
                            {
                                "title": "YES",
                                "result": "true"
                            },
                            {
                                "title": "NO",
                                "result": "false"
                            }
                            ]
                        }

                        notification.notify(config, function (result) {
                            if (result.result == "true") {
                                $scope.selectedForApproval = [];
                                $scope.getCurrentSelected = [];
                            } else {
                                $scope.currentlySelected = { "tabName": "Groups" }

                            }

                        });
                    }

                } else
                    if (tabName == "Groups") {
                        $scope.suggestedDataForReassign = $scope.groupsAsReassign;
                        $scope.suggestedData = $scope.groups;
                        $scope.autoSuggestPlaceholder = "Search & Add Groups";
                        /* condition for selectedForApproval length*/

                        if (selectedForApproval.length > 0) {

                            var config = {
                                type: "confirm",
                                message: "<p class='left-align'>Your Selected User's will get removed. Are you sure you want to proceed?</p>",
                                buttons: [
                                {
                                    "title": "YES",
                                    "result": "true"
                                },
                                {
                                    "title": "NO",
                                    "result": "false"
                                }
                                ]
                            }

                            notification.notify(config, function (result) {
                                if (result.result == "true") {
                                    $scope.selectedForApproval = [];
                                    $scope.getCurrentSelected = [];

                                } else {
                                    $scope.currentlySelected = { "tabName": "Users" };
                                }
                            });
                        }

                    }
                    else {
                        $scope.suggestedDataForReassign = $scope.usersAsReassign;
                        $scope.suggestedData = $scope.users;
                        $scope.autoSuggestPlaceholder = "Search & Add Users";
                    }
            }

            $scope.getCurrentSelected.length = [];
            $scope.selectedForApproval = [];
            $scope.pushCurrent = function (getCurrentSelected) {
                if (getCurrentSelected != null) {
                    var copiedObject = $.extend({}, getCurrentSelected[0])
                    var foundItem = $filter('filter')($scope.selectedForApproval, getCurrentSelected[0], true)[0];
                    //get the index
                    if ($scope.selectedForApproval.indexOf(foundItem) === -1)
                        $scope.selectedForApproval.push(copiedObject);




                    $timeout(function () {
                        $scope.getCurrentSelected.length = [];

                    }, 50);
                }
            };




            $scope.deleteCurrent = function (index) {
                $scope.selectedForApproval.splice(index, 1);
            };


            $scope.setApprovalLimit = false;

            $scope.setApprovalLimitChange = function (approvalLimit) {
                $scope.setApprovalLimit = approvalLimit;
            }

            $scope.selectLimitTypeOptions = [{
                "dataKey": "inPercent",
                "name": "% of People"
            }, {
                "dataKey": "noOfPeople",
                "name": "No. of People"
            }];
            $scope.selectLimitType = { "dataKey": "inPercent", "name": "% of People" };
            $scope.isPercent = true;

            $scope.changeRangeSlider = function (selectedLimitType, selectedForApproval) {

                if (selectedLimitType.dataKey == "inPercent") {

                    $scope.rangeSliderMax = 100;
                    $scope.isPercent = true;

                }
                else if (selectedLimitType.dataKey == "noOfPeople") {

                    $scope.rangeSliderMax = selectedForApproval.length;
                    $scope.isPercent = false;

                }
            }

            $scope.rangeSliderMin = 0;
            $scope.rangeSliderMax = 100;
            $scope.sliderSetOn = 0;

            $scope.approvalLimitOptions = [{
                "title": 1,
                "name": "Out of " + $scope.users.length + " total users"
            }, {
                "title": 2,
                "name": "% of people"
            }];

            $scope.selectedLimitOption = { "title": 1, "name": "Out of " + $scope.users.length + " total users" };

            $scope.userCount = 0;
            $scope.totalUsers = $scope.users.length;
            $scope.limitRule = [{
                "rule": "this.length <= 0",
                "error": "Please enter the value"
            }, {
                "rule": "this > scope.$parent.totalUsers",
                "error": "The value should be less than total users"
            }];

            $scope.onChange = function (selectedLimitOption) {
                $scope.selectedLimitOption = selectedLimitOption;
                if (selectedLimitOption.title === 1) {
                    $scope.limitRule = [{
                        "rule": "this.length <= 0",
                        "error": "Please enter the value"
                    }, {
                        "rule": "this > scope.$parent.totalUsers",
                        "error": "The value should be less than total users"
                    }];
                }
                else {
                    $scope.limitRule = [{
                        "rule": "this.length <= 0",
                        "error": "Please enter the value"
                    }, {
                        "rule": "this > 100",
                        "error": "The value should be less than 100"
                    }];
                }
            };

            $scope.changeUserCount = function (userCount) {
                $scope.userCount = userCount;
            };

            $scope.addApprovalLevel = function (team, sliderSetOn, appendAfter) {

                angular.forEach(team, function (value, key) {
                    value.status = "NOT SENT FOR APPROVAL"

                });

                var dataforAppend = {
                    "status": "NOT SENT FOR APPROVAL",
                    "approvalLimit": sliderSetOn,
                    "isDetailShow": false,
                    "onDated": "",
                    "type": team[0].type,
                    "team": team,
                    "offline": false
                };

                if (appendAfter == "") {
                    $scope.approvalFlowLists.push(dataforAppend);

                }
                else {

                    $scope.approvalFlowLists.splice(appendAfter, 0, dataforAppend)
                }
                $scope.selectedForApproval = [];

            }


            $scope.deleteCurrentItem = function (index) {
                var apFlList = $scope.approvalFlowLists;
                if (!apFlList[index].offline) {
                    apFlList.splice(index, 1);
                    if (apFlList.length == 1) {
                        apFlList[0].offline = false;
                    }

                }
            }


            $scope.editCurrentItem = function (index) {
                if (!$scope.approvalFlowLists[index].offline) {
                    $scope.showAddApprovalLevelPopup = true;
                }
            }


            $scope.onSmartTypeHeadOpen = function () {
                $scope.showAddApprovalLevelPopup = false;
            }

            $scope.onSmartTypeHeadClose = function (response) {
                //function not wokring due to smart typeahead  not working propery
                $scope.showAddApprovalLevelPopup = true;
                if (response.result != null && response.result.length > 0) {
                    $scope.selectedForApproval = [];
                    angular.forEach(response.result, function (value, key) {
                        var foundItem = $filter('filter')($scope.selectedForApproval, value, true)[0];
                        //get the index
                        if ($scope.selectedForApproval.indexOf(foundItem) === -1)
                            $scope.selectedForApproval.push(value);
                    });
                }
            }


            $scope.appendCurrentArray = function (e) {
                var dataTemp = angular.copy($scope.approvalFlowLists[e.startIndex]),
                        dataTempData = angular.copy($scope.approvalFlowLists);

                dataTempData.splice(e.startIndex, 1);
                dataTempData.splice(e.endIndex, 0, dataTemp);


            }


            $scope.reassignCurrent = function (index) {
                $scope.selectedForApproval[index].reassign = true;
            }


            $scope.editCurrentReassign = function (index) {
                $scope.selectedForApproval[index].edit = true;
            }

            $scope.deleteCurrentReassign = function (index) {
                $scope.selectedForApproval[index].reassign = false;
                $scope.selectedForApproval[index].reassignedTo = "";
            }



            $scope.reassignUpdate = function (index) {

                if ($scope.selectedForApproval[index].edit == true) {
                    $scope.selectedForApproval[index].edit = false;

                }

            }

            // end controller
        }

        //end return
    }
    //end directive

}