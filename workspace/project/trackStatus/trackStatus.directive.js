(function (angular) {
    'use strict';
    angular.module('SMART2').directive('trackStatus1', function (trackStatusService, $filter) {
        
        return {
            restrict: 'E',
            replace : true,
            templateUrl: 'project/trackStatus/popupNewTrackStatus.html',
            link: function (scope, elem, attr) {
                scope.trackStatusService = trackStatusService;
                // HTML page map for tabs
                var htmlForDetail = 'project/trackStatus/trackStatusDetail.html';
                var data = scope[attr['trackstatusData']];

                function statusListData(a_data) {
                    scope.statusLists = a_data.datailedData;
                }
                statusListData(data);
                // To update cycles
                scope.cycleObject = [];
                function selectCycle(a_data) {
                    var cycles = a_data.cycles,
                        len = cycles.length;
                    scope.cycleObject = cycles;
                    for(var indx = 0; indx < len; indx++) {
                        if (cycles[indx].selected === true) {
                            scope.selectedCycle = cycles[indx];
                        }
                    }
                }
                selectCycle(data);

                // update tabs
                scope.trackStatusTabs = [];
                function updateTabs(a_data) {
                    var tabs = a_data.trackStatusTabs,
                        len = tabs.length;
                    for (var t = 0; t < len; t++) {
                        var tobj = tabs[t];
                        if (tobj.active === true) {
                            tobj.contentUrl = htmlForDetail;
                        }
                    }
                    scope.trackStatusTabs = tabs;
                }
                updateTabs(data);
                
                // update doc name, created on and by, doc curr status
                function updateHeaderData(a_data) {
                    scope.headerSecData = a_data;
                    scope.docCreatedOn = a_data.createdOn;
                }
                updateHeaderData(data.projectStatus);

                // check if comment exists
                scope.hasComments = function (a_comment) {
                    var flag = (a_comment !== "" && a_comment) ? true : false;
                    return flag;
                }
                // show more less comments
                //scope.showMore = true; // show more by default
                scope.showLess = {};
                scope.showMore = {};
                scope.showMoreLess = function (id, arg) {
                    if(arg === "less") {
                        scope.showMore[id] = true;
                        scope.showLess[id] = false;
                    } else if (arg === "more") {
                        scope.showLess[id] = true;
                        scope.showMore[id] = false;
                    }
                }
                // init show more
                scope.showMoreComment = {};
                scope.initShowModel = function (id) {
                    console.log('parent, index', id);
                    scope.showMore[id] = true;
                    scope.showLess[id] = false;
                }
                // Watch for any update in data change
                scope.$watch('trackStatusService.getChange()', function (newVal, oldVal) {
                    if (newVal !== oldVal && newVal) {
                        // Data changed
                        data = scope[attr['trackstatusData']];
                        statusListData(data);
                        selectCycle(data);
                        updateTabs(data);
                    }

                });

                // Utility methods
                scope.getDate = function (date) {
                   return $filter('date')(date, 'dd/MM/yyyy');
                }
                scope.applyStatusColor = function (ele) {
                    switch (ele.toLowerCase()) {
                        case 'approved':
                            return 'color-approved';
                            break;
                        case 'accepted':
                            return 'color-approved';
                            break;
                        case 'approval pending':
                            return 'color-approved-pending';
                            break;
                        case 'rejected':
                            return 'color-rejected';
                            break;
                        case 'delegated':
                            return 'shades-text text-black';
                            break;
                        case 'pending':
                            return 'color-approved-pending';
                            break;
                        case 'approval':
                            return 'color-approved';
                            break;
                        case 'rejected':
                            return 'color-rejected';
                        case 'budget overriden':
                            return 'color-bud-overrid';
                        default:
                            return 'grey-text';
                    }
                };
                scope.IconStatus = function (ele) {
                    switch (ele.toLowerCase()) {
                        case 'pending':
                            return '#icon_TSHexOutlin';
                            break;
                        case 'approval':
                            return '#icon_TSHexOutlin';
                            break;
                        case 'rejected':
                            return '#icon_TSHexOutlin';
                            break;
                        case 'accepted':
                            return '#icon_TSHexOutlin';
                            break;
                        case 'approved':
                            return '#icon_TSHexOutlin';
                            break;
                        default:
                            return '#icon_Info_i';
                    }
                };
                scope.InnerIconStatus = function (ele) {
                    switch (ele.toLowerCase()) {
                        case 'pending':
                            return '#icon_TSPending';
                            break;
                        case 'approval':
                            return '#icon_TSAccepted';
                            break;
                        case 'accepted':
                            return '#icon_TSAccepted';
                            break;
                        case 'approved':
                            return '#icon_TSAccepted';
                            break;
                        case 'rejected':
                            return '#icon_TSRejected';
                            break;
                        default:
                            return '#icon_Info';
                    }
                };
                scope.approvalGroupType = function (ele) {
                    switch (ele.toLowerCase()) {
                        case 'pool approval':
                            return 'a-g-pool-approval';
                            break;
                        case 'parallel approval':
                            return 'a-g-parallel-approval';
                            break;
                        case 'hr approval':
                            return 'a-g-HR-approval';
                            break;
                        case 'group approval':
                            return 'a-g-group-approval';
                            break;
                        default:
                            return false;
                    }
                };
                scope.slideDetailsTS = function (id) {
                    var detailDataCopy = data.datailedData,
                        len = detailDataCopy.length;
                    for (var indx = 0; indx < len; indx++) {
                        if (detailDataCopy[indx].uniqueId === id) {
                            detailDataCopy[indx].isDetailShow = !detailDataCopy[indx].isDetailShow;
                        }
                    }
                }

                // add unique id to each actioner items
                function addUniqueId() {
                    var pItems = data.datailedData,
                        pLen = pItems.length;
                    for (var indx = 0 ; indx < pLen; indx++) {
                        var cArr = pItems[indx].actionerDetails,
                            cLen = cArr.length;
                        for (var c = 0; c < cLen; c++) {
                            cArr[c].uniqueId = uniqueIDGenerator();
                        }
                        pItems[indx].uniqueId = "details" + uniqueIDGenerator();
                    }
                }
                addUniqueId();
                // Unique id generator
                function uniqueIDGenerator() {
                    var d = new Date().getTime();
                    var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                    return uniqueID;
                };

                // Approver legend
                scope.approverTypes = [
        	        {
        	            "icon": "#icon_AppOne", 
        	            "color" : "color-approved-pending", 
        	            "text" : "Pool Approval - At least one needs to approve"
        	        },
	                { 
	                    "icon": "#icon_AppAll", 
	                    "color" : "color-approved-pending", 
	                    "text" : "Parallel Approval - Everyone must approve" 
	                },
	                { 
	                    "icon": "#icon_AppSingle", 
	                    "color" : "color-approved-pending", 
	                    "text" : "Individual needs to approve" 
	                },
	                { 
	                    "icon": "#Icon_AppAuto", 
	                    "color" : "color-approved-pending", 
	                    "text" : "Automatic approval by the system" 
	                },
	                { 
	                    "icon": "#icon_AppHoc", 
	                    "color" : "color-add-Hoc", 
	                    "text" : "AdHoc Approver" 
	                }
                ]
                scope.legend2 = [
	                {
	                    "icon": "#icon_TSAccepted",
	                    "color": "color-approved",
	                    "text": "Approved/Accepted/Signed"
	                },
	                {
	                    "icon": "#icon_TSRejected",
	                    "color": "color-rejected",
	                    "text": "Rejected"
	                },
	                {
	                    "icon": "#icon_TSPartialAc",
	                    "color": "color-approved",
	                    "text": "Partially Approved/Accepted"
	                },
	                {
	                    "icon": "#icon_TSPartialRe",
	                    "color": "color-rejected",
	                    "text": "Partially Rejected"
	                },
	                {
	                    "icon": "#icon_TSPending",
	                    "color": "color-approved-pending",
	                    "text": "Pending"
	                },
	                {
	                    "icon": "#icon_Info_i",
	                    "color": "grey-text",
	                    "text": "Information"
	                }

                ]
            }
        }
    });
})(angular);