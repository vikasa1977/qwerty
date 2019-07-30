angular.module('SMART2').directive('smartApprovalWithTrackStatus', ['notification', '$filter', '$timeout', 'lookup', '$window', 'trackStatusService', smartApprovalWithTrackStatusFunc]);


function smartApprovalWithTrackStatusFunc(notification, $filter, $timeout, lookup, $window, trackStatusService) {
			return {
				restrict: 'AE',
				transclude: true,
				templateUrl: 'shared/directives/approval/approvalTrackStatusTabsTemplate.html',
				scope: {
				    onTabChange: "=",
				    approvalFlowLists:'=data'
				},
				controller: function ($scope, $element, $attrs) {
				    var htmlForDetail = 'shared/directives/approval/approvalWithTrackStatusTemplate.html';
				    $scope.tabLoaderConfig = { bgwhite: true, plain: true, center: true, message: "Loading..." };
				    $scope.getCurrentSelected = [];
					// icon Apply with status	
					$scope.applyStatusColor = function(ele) {
						switch (ele) {
						    case 'Approved':
						    case 'APPROVED':
						    case 'ACCEPTED':
						    case 'APPROVAL':
								return 'color-approved';
								break;
						    case 'Pending Approval':
						    case 'Skipped':
						    case 'Marked Offline':
						    case 'PENDING':
						    case 'Pool Approval':
						    case 'Parallel Approval':
						    case 'Individual Approval':
						    case 'Automatic Approval':
								return 'color-approved-pending';
								break;
						    case 'Rejected':
						    case 'REJECTED':
								return 'color-rejected';
								break;
							case 'Delegated':
								return 'shades-text text-black';
								break;
							case 'Budget Overriden':
							    return 'color-bud-overrid';
							    break;
						    case 'AdHoc Approval':
						        return 'color-add-Hoc';
						        break;
						    case 'Assigned On':
						    case 'Withdraw':
						        return 'color-assigned-on';
						        break;
							default:
								return 'not-sent-for-approval';
						}
					};

					// icon for icon For team type
					$scope.IconForTeamType = function(ele) {
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
					$scope.InnerIconStatus = function(ele) {
					    switch (ele) {
					        case 'Not Sent For Approval':
					        case 'NOT SENT FOR APPROVAL':
					            return '#icon_NotSendApproval';
					            break;
					        case 'Pending Approval':
					        case 'Skipped':
					        case 'Marked Offline':
					        case 'PENDING':
								return '#icon_TSPending';
								break;
					        case 'Approved':
					        case 'APPROVAL':
					        case 'APPROVED':
					        case 'ACCEPTED':
					        case 'Assigned On':
								return '#icon_TSAccepted';
								break;
					        case 'Rejected':
							case 'REJECTED':
							    return '#icon_TSRejected';
					        case 'Withdraw':
					            return '#icon_TSWidthdrawal';
								break;

						}
					};

				    // icon for icon inner status
					$scope.IconForApproval = function (ele) {
					    switch (ele) {
					        case 'Pool Approval':
					            return '#icon_AppOne';
					            break;
					        case 'Parallel Approval':
					            return '#icon_AppAll';
					            break;
					        case 'Individual Approval':
					            return '#icon_AppSingle';
					            break;
					        case 'Automatic Approval':
					            return '#Icon_AppAuto';
					            break;
					        case 'AdHoc Approval':
					            return '#icon_AppHoc';
					            break;
					    }
					};

					//approval Group type
					$scope.approvalGroupType = function(ele) {
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
					$scope.checkNextStatus = function(ele) {
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

					//Calculating window height on load and on resize
				    var w = angular.element($window),
				        pageBody = angular.element('body');
					$scope.getWindowDimensions = function () {
					    return {
					        'h': w.innerHeight()
					    };
					};
					$scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
					    var newHeight = newValue.h + 'px';
					    pageBody.css({ 'height': newHeight, 'overflow': 'hidden' });
					    $scope.totalWindowHeight = newValue.h - 230;
					}, true);
					

					//slideParentFunction
					$scope.slideParentfunc = function(item) {
					    //$scope.approvalFlowLists[index].isDetailShow = !$scope.approvalFlowLists[index].isDetailShow
					    item.isDetailShow = !item.isDetailShow
				    }
				  
					


					/* popup content */
					$scope.showAddApprovalLevelPopup = false;
					$scope.appendAfterThis = ""
					$scope.showAddApprovalLevelPopupCallback = function (arr, levelType) {
					    $scope.action = "addApproval";
					    $scope.selectedForApproval = [];
					    var item, groupIndex, ccIndex, itemIndex;

					    if (levelType == 'addNewCc') {
					        $scope.groupIndex = arr[1];
					        $scope.ccIndex = arr[2] + 1;
					        $scope.levelType = levelType;
					        $scope.showAddApprovalLevelPopup = true;
					        return;
					    }
					    else if (levelType == 'addFirstLevel') {
					        groupIndex = arr[1];
					        ccIndex = arr[2];
                        }
					    else if (levelType == 'addNewLevel') {
					        item = arr[1];
					        groupIndex = arr[2];
					        ccIndex = arr[3];
					        itemIndex = arr[4];
					    }
					    
					    //if($scope.approvalFlowLists.length > 0 && !$scope.approvalFlowLists[index].offline){
					    if ($scope.approvalFlowLists.data[groupIndex].ccList[ccIndex].levelList.length > 0) {

					        $scope.showAddApprovalLevelPopup = true;
					        if (itemIndex != undefined) {
					            $scope.appendAfterThis = itemIndex + 1
					        }

					    } else if ($scope.approvalFlowLists.data[groupIndex].ccList[ccIndex].levelList.length == 0) {
					        $scope.showAddApprovalLevelPopup = true;
					    }

					    $scope.groupIndex = groupIndex;
					    $scope.ccIndex = ccIndex;
					    $scope.levelType = levelType;
					};
					$scope.hideAddApprovalLevelPopupCallback = function(e) {
						$scope.showAddApprovalLevelPopup = false;
					};
                    
					$scope.showUploadPopup = false;
					$scope.showUploadPopupCallback = function () {
					    $scope.showUploadPopup = true;
					}

					$scope.hideUploadPopupCallback = function () {
					    $scope.showUploadPopup = false;
                    }




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
						"members":"",
						"reassign": false,
						"reassignedTo":"",
						 "edit":false
					}, {
						"name": "Michael Slater",
						 "type": "user",
						 "members":"",
						"reassign": false,
						"reassignedTo":"",
						 "edit":false
					}, {
						"name": "Jammie Foster",
						 "type": "user",
						 "members":"",
						"reassign": false,
						"reassignedTo":"",
						 "edit":false
					}, {
						"name": "Ozborne Lopez",
						 "type": "user",
						 "members":"",
						"reassign": false,
						"reassignedTo":"",
						 "edit":false
					}];
					$scope.groups = [{
						"name": "Group1",
						 "type": "group",
						 "members":[
							{	
								"name":"Josh W.",
								"designation":"Manager"
							},
							{	
								"name":"Ross G.",
								"designation":"Designation"
							},
							{	
								"name":"Whitney H.",
								"designation":"Designation"
							}	

						 ]
					}, {
						"name": "Group2",
						 "type": "group",
						 "members":[
							{	
								"name":"Josh W.",
								"designation":"Manager"
							},
							{	
								"name":"Ross G.",
								"designation":"Designation"
							},
							{	
								"name":"Whitney H.",
								"designation":"Designation"
							}	

						 ]
					}, {
						"name": "Group3",
						 "type": "group",
						 "members":[
							{	
								"name":"Josh W.",
								"designation":"Manager"
							},
							{	
								"name":"Ross G.",
								"designation":"Designation"
							},
							{	
								"name":"Whitney H.",
								"designation":"Designation"
							}	

						 ]
					}, {
						"name": "Group4",
						 "type": "group",
						  "members":[
							{	
								"name":"Josh W.",
								"designation":"Manager"
							},
							{	
								"name":"Ross G.",
								"designation":"Designation"
							},
							{	
								"name":"Whitney H.",
								"designation":"Designation"
							}	

						 ],

					}];

					$scope.usersAsReassign = [
                    {
                        "name": "John Doe",
                        "designation": "Manager",
                        "status": "Pending Approval"
                    }, {
                        "name": "Michael Slater",
                        "designation": "Manager",
                        "status": "Pending Approval"
                    }, {
                        "name": "Jammie Foster",
                        "designation": "Manager",
                        "status": "Pending Approval"
                    }, {
                        "name": "Ozborne Lopez",
                        "designation": "Manager",
                        "status": "Pending Approval"
                    }
					];
					$scope.groupsAsReassign  = [
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

					$scope.suggestedData =  $scope.users;
					$scope.suggestedDataForReassign =  $scope.usersAsReassign   
					$scope.autoSuggestPlaceholder =	"Search & Add Users";
					$scope.changeCurrentType = function(tabName, selectedForApproval){

						if(tabName == "Users"){
							$scope.suggestedData =  $scope.users;
							 $scope.suggestedDataForReassign =  $scope.usersAsReassign;
							$scope.autoSuggestPlaceholder =	"Search & Add Users";
								/* condition for selectedForApproval length*/
								if(selectedForApproval.length > 0){
									
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
										if(result.result == "true"){
										    $scope.selectedForApproval = [];
										    $scope.getCurrentSelected = [];
										}else{
											$scope.currentlySelected  = {"tabName": "Groups"}

										}
									});
								}

						}else 
						if(tabName == "Groups"){
							  $scope.suggestedDataForReassign =  $scope.groupsAsReassign;
							$scope.suggestedData =  $scope.groups;
							$scope.autoSuggestPlaceholder =	"Search & Add Groups";
								/* condition for selectedForApproval length*/
								
								if(selectedForApproval.length > 0){
									
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
										if(result.result == "true"){
										    $scope.selectedForApproval = [];
										    $scope.getCurrentSelected = [];

										  }else{
											$scope.currentlySelected  = {"tabName": "Users"};								                            	
										}
									});
								}

						}
						else{
						   $scope.suggestedDataForReassign =  $scope.usersAsReassign;
							$scope.suggestedData =  $scope.users;
							$scope.autoSuggestPlaceholder =	"Search & Add Users";
						}
					}

					$scope.getCurrentSelected.length = [];
					$scope.selectedForApproval = [];
					$scope.pushCurrent = function (getCurrentSelected) {
						if (getCurrentSelected != null) {
							var copiedObject = $.extend({}, getCurrentSelected[0])
							var foundItem = $filter('filter')($scope.selectedForApproval, getCurrentSelected[0], true)[0];
							//get the index
							if($scope.selectedForApproval.indexOf(foundItem) === -1)
								$scope.selectedForApproval.push(copiedObject);
							

					

						 $timeout(function(){
						     $scope.getCurrentSelected.length = [];

							},50);
						}
					};




					$scope.deleteCurrent = function(index) {
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

					$scope.changeRangeSlider = function(selectedLimitType, selectedForApproval){

						if(selectedLimitType.dataKey == "inPercent" ) {

								$scope.rangeSliderMax = 100;
								$scope.isPercent = true;

						}
						else if(selectedLimitType.dataKey == "noOfPeople" ){

								$scope.rangeSliderMax = selectedForApproval.length;
								$scope.isPercent = false;

						}
					}		

					$scope.rangeSliderMin = 0;
					$scope.rangeSliderMax = 100;
					$scope.sliderSetOn = 0;
					
					$scope.approvalLimitOptions = [{
						"title" : 1,
						"name": "Out of "+ $scope.users.length + " total users"
					},{
						"title": 2,
						"name": "% of people"
					}];

					$scope.selectedLimitOption = { "title": 1, "name": "Out of " + $scope.users.length + " total users" };
					
					$scope.userCount = 0;
					$scope.totalUsers = $scope.users.length;
					$scope.limitRule =[{
							"rule": "this.length <= 0",
							"error": "Please enter the value"
							}, {
							"rule": "this > scope.$parent.totalUsers",
							"error": "The value should be less than total users"
							}];

					$scope.onChange = function (selectedLimitOption) {
						$scope.selectedLimitOption = selectedLimitOption;
						if (selectedLimitOption.title === 1) {
							$scope.limitRule =[{
								"rule": "this.length <= 0",
								"error": "Please enter the value"
								}, {
								"rule": "this > scope.$parent.totalUsers",
								"error": "The value should be less than total users"
							}];
						}
						else {
							$scope.limitRule =[{
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
					    if ($scope.action == "addApproval") {
					        var dataforAppend, newCc;

					        angular.forEach(team, function (value, key) {
					            value.status = "NOT SENT FOR APPROVAL"
					        });

					        dataforAppend = {
					            "status": "NOT SENT FOR APPROVAL",
					            "approvalLimit": sliderSetOn,
					            "isDetailShow": false,
					            "onDated": "",
					            "type": team[0].type,
					            "team": team,
					            "bypass": {
					                "type": "Offline",
					                "status": false
					            }
					        };

					        if ($scope.levelType == 'addNewCc') {
					            newCc = {
					                "ccName": "New Cost Center",
					                "ccNamefocus": false,
					                "isEditable": true,
					                "levelList": []
					            };
					            $scope.approvalFlowLists.data[$scope.groupIndex].ccList.push(newCc);
					        }

					        if (appendAfter == "") {
					            $scope.approvalFlowLists.data[$scope.groupIndex].ccList[$scope.ccIndex].levelList.push(dataforAppend);
					        }
					        else {
					            $scope.approvalFlowLists.data[$scope.groupIndex].ccList[$scope.ccIndex].levelList.splice(appendAfter, 0, dataforAppend)
					        }
					        $scope.selectedForApproval = [];

					        $timeout(function () {
					            updateHeightWidth($scope.groupIndex);
					        }, 300);
					    }
					    else {
					        $scope.approvalFlowLists.data[$scope.groupIndex].ccList[$scope.ccIndex].levelList[$scope.itemIndex].team = team;
                        }

					}


					$scope.deleteCurrentItem = function (item, groupIndex, ccIndex, index) {
					    var apFlList = $scope.approvalFlowLists.data[groupIndex].ccList[ccIndex].levelList;
					    
					    apFlList.splice(index, 1);
					    if (apFlList.length == 1) {
					        apFlList[0].offline = false;
					    }
					    

					    if (apFlList.length == 0 && $scope.approvalFlowLists.data[groupIndex].ccList.length > 1) {
					        $scope.approvalFlowLists.data[groupIndex].ccList.splice(ccIndex, 1);
					    }

					    $timeout(function () {
					        updateHeightWidth(groupIndex);
					    }, 300);
					}


					$scope.editCurrentItem = function (item, groupIndex, ccIndex, index) {
					    $scope.action = "editApproval";
					    $scope.groupIndex = groupIndex;
					    $scope.ccIndex = ccIndex;
					    $scope.itemIndex = index;
					    $scope.selectedForApproval = item.team;
					    $scope.catType = item.type;
					    $scope.showAddApprovalLevelPopup = true;
				    }

					function updateHeightWidth(groupIndex) {
					    var groupId, totalCcCount, maxGroupWidth, maxBorderBottomWidth, extraBorder;
				        groupId = 'buyerGroup_' + groupIndex;
				        totalCcCount = $scope.approvalFlowLists.data[groupIndex].ccList.length;
				        maxGroupWidth = (550 * totalCcCount) + 100;

				        if (totalCcCount > 1) {
				            maxBorderBottomWidth = 550 * (totalCcCount - 1 );
				            extraBorder = 29 * (totalCcCount - 1);

				        }
				        else {
				            maxBorderBottomWidth = 550 * totalCcCount;
				            extraBorder = 29 * totalCcCount;
				        }
                    
				        $element.find('#' + groupId).width(maxGroupWidth);
				        $element.find('#' + groupId + ' .bottom-gray-border').width(maxBorderBottomWidth - extraBorder);
				    }


				    $scope.onSmartTypeHeadOpen = function () {
				        var filteredItem, compareWithData, selectedItem = [];
				        $scope.showAddApprovalLevelPopup = false;

				        if ($scope.catType == "user") {
				            compareWithData = $scope.users;
				        }
				        else {
				            compareWithData = $scope.groups;
				            
				        }
				        angular.forEach($scope.selectedForApproval, function (value, key) {
				            var filteredItem = $filter('filter')(compareWithData, value.name, true)[0];
				            selectedItem.push(filteredItem);
				        });
				       lookup.setTempModel(selectedItem);
				   }

				   $scope.onSmartTypeHeadClose = function (response) {
				        //function not wokring due to smart typeahead  not working propery
                        $scope.getCurrentSelected = [];
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
						    //logic on callback   
						}


					  $scope.reassignCurrent = function(index){
							   $scope.selectedForApproval[index].reassign = true;
					  }


					  $scope.editCurrentReassign = function(index){
							$scope.selectedForApproval[index].edit = true;
					  }

					  $scope.deleteCurrentReassign = function(index){
						$scope.selectedForApproval[index].reassign = false;
						$scope.selectedForApproval[index].reassignedTo = "";
					  }



					  $scope.reassignUpdate = function(index){

							if($scope.selectedForApproval[index].edit == true){
								$scope.selectedForApproval[index].edit = false;

							}

					  }

					  var isApprovalPageLoaded = true;
					  $scope.$on('LastRepeaterElement', function (attrs, element) {
					      if (element.is('div') && isApprovalPageLoaded) {
					          $timeout(function () {
					              angular.forEach($scope.approvalFlowLists.data, function (value, key) {
					                  updateHeightWidth(key);
					              })
					              $scope.showTabLoader = false;
					              scrollToLatestStatus();
					          }, 300);
					          isApprovalPageLoaded = false;
					      }
					  });

					$scope.addFocuse = function (cc) {
					    cc.ccNamefocus = true;
                    }

                    var prevCcName;
                    $scope.getCcValue = function (cc) {
                        prevCcName = cc.ccName;
                    }

                    $scope.setCcValue = function (cc) {
	                    $timeout(function () {
		                    if (cc.ccName == "") {
		                        cc.ccName = prevCcName;
		                    }
	                    }, 100);
                    }

                    function scrollToLatestStatus() {
                        $targetedElem = $('.approval-group .latest-approved');
                        var scrollTopPosition = $targetedElem.parents('.approval-group').position().top + $targetedElem.position().top;
                        var scrollLeftPosition = $targetedElem.position().left;
                        $('.scrollbar-outer').animate({ scrollTop: scrollTopPosition, scrollLeft: scrollLeftPosition }, "slow", 'swing');
                    }

                    $scope.trackStatusTabs = [];
                    function updateTabs(a_data) {
                        $scope.showTabLoader = true;
                        var tabs = a_data.trackStatusTabs,
                            len = tabs.length;
                        for (var t = 0; t < len; t++) {
                            var tobj = tabs[t];
                            if (tobj.active === true) {
                                a_data.data = a_data.allCycleData[t].cycleData;
                                tobj.contentUrl = htmlForDetail;
                            }
                        }
                        $scope.trackStatusTabs = tabs;
                    }
                    updateTabs($scope.approvalFlowLists);

				    
                    var prevVal;
                    $scope.tabClicked = function (e) {
                        $scope.onTabChange(e);
                        if (trackStatusService.getChange() !== prevVal) {
                            updateTabs($scope.approvalFlowLists);
                            isApprovalPageLoaded = true;
                            prevVal = trackStatusService.getChange();
                        }
                    }

				    // end controller
				}

				//end return
			}
			//end directive

		}