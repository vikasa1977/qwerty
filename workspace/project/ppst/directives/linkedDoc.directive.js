(function () {

    'use strict';
    angular.module('SMART2')
    .directive('linkeddocDetail', function ($state, $window) {
        return {
            restrict: 'EA',
            scope: {
                linkedDocData: '=data',
                rfxFilter: "=",
                auctionFilter: "=",
                contractFilter: "=",
                onOptionSelect: "&",
                searchfilter: "="
            },
            templateUrl: 'project/ppst/views/linkedDocDetail.html',
            link: function (scope, elem, attr) {
                scope.middleAlign = { marginTop: ($window.innerHeight / 2 - 180) + 'px' };
                scope.documents = [{ name: "RFX", icon: "#icon_RFX" }, { name: "Auction", icon: "#icon_Auction" }, { name: "Contract", icon: "#icon_Contract" }];
               // Blue screen of creation mode
                scope.documentObj = {};
               
                scope.addContract = function () {
                    var item = {
                        docID: 103
                    };
                    scope.documentObj.setActiveProduct(item)
                }
                scope.addDocAuction = function () {
                    var item = {
                        docID: 102
                    };
                    scope.documentObj.setActiveProduct(item)
                };
                scope.addDocRfx = function () {
                    var item = {
                        docID: 101
                    };
                    scope.documentObj.setActiveProduct(item)
                };
                scope.documentObj.callback = function (item) {
                    if (item.id == "template" || item.id == "cblank" || item.id == "template_rfx" || item.id == "template_contract") {
                        scope.isShowLinkendDoc = true;
                    }
                    scope.onOptionSelect();
                }

                scope.adDocs = function (doc) {
                    switch (doc.name) {
                        case "RFX":
                            scope.addDocRfx();
                            break;
                        case "Auction":
                            scope.addDocAuction();
                            break;
                        case "Contract":
                            scope.addContract();
                            break;
                    }
                }

               //extra card show/hide
                scope.showCards = function (subDoc) {
                    if (!subDoc.isShowCard) {
                        subDoc.isShowCard = true;
                        subDoc.isExpand = true;
                        scope.showBubble = false;
                    }
                    else {
                        subDoc.isShowCard = false;
                        subDoc.isExpand = false;
                        scope.showBubble = true;
                    }
                };

                
                //Page linking
                var windowLoc = window.location.href.split('#')[0];
                scope.linkedDocCall = function (data) {
                    if (data.DocumentTypeInfo) {
                        var routing = data.DocumentTypeInfo.toLowerCase();
                        switch (routing) {
                            case 'rfx':
                                windowLoc = windowLoc + '#/sourcing/rfx/new';
                                $window.open(windowLoc, '_blank');
                                break;
                            case 'auction':
                                windowLoc = windowLoc + '#/sourcing/rfx/new';
                                $window.open(windowLoc, '_blank');
                                break;
                            case 'contract':
                                windowLoc = windowLoc + '#/contract/new';
                                $window.open(windowLoc, '_blank');
                                break;
                            default:
                                return false;
                        }
                    }
                };

                //Icon as per status
                scope.setValue = function (ele) {
                    if (ele) {
                        var elem = ele.toLowerCase();
                        switch (elem) {
                            case 'draft':
                                return '#icon_Draft';
                                break;
                            case 'exception':
                                return '#icon_Exception';
                                break;
                            case 'error':
                                return '#icon_error';
                                break;
                            case 'approval required':
                                return '#icon_ApprovalRequired';
                                break;
                            case 'pending':
                                return '#icon_Pending';
                                break;
                            case 'live':
                                return '#icon_Live';
                                break;
                            case 'approval pending':
                                return '#icon_ApprovalPending';
                                break;
                            case 'execute':
                                return '#icon_Execute';
                                break;
                            case 'matched':
                                return '#icon_Matched';
                                break;
                            case 'approved':
                                return '#icon_Approved';
                                break;
                            case 'supplier invited':
                                return '#icon_SupplierInvited';
                                break;
                            case 'completed':
                                return '#icon_Completed';
                                break;
                            case 'onhold':
                                return '#icon_OnHold';
                                break;
                            case 'cancelled':
                                return '#icon_Cancelled';
                                break;
                            case 'awarding':
                                return '#icon_Awarding';
                                break;
                            case 'awarded':
                                return '#icon_Awarded';
                                break;
                            case 'closed':
                                return '#icon_Closed';
                                break;
                            case 'scoring in progress':
                                return '#icon_ScoringInProgress';
                                break;
                            case 'response in progress':
                                return '#icon_ResponseInProgress';
                                break;
                            case 'draft withdrawn':
                                return '#icon_DraftWithdrawn';
                                break;
                            case 'draft co-authoring':
                                return '#icon_DraftCoAuthoring';
                                break;
                            case 'invoice paid with remittance':
                                return '#icon_InvoicePaidWithRemittance';
                                break;
                            case 'rejected':
                                return '#icon_ApprovalRejected';
                                break;
                            case 'submitted':
                                return '#icon_Draft';
                                break;
                            case 'disqualified':
                                return '#icon_Disqualified';
                                break;
                            case 'identified':
                                return '#icon_Identified';
                                break;
                            case 'invited':
                                return '#icon_Invited';
                                break;
                            case 'registered':
                                return '#icon_Registered';
                                break;
                            case 'waitlisted':
                                return '#icon_Waitlisted';
                                break;
                            case 'success':
                                return '#icon_ApprovedStatus';
                                break;
                            case 'in progress':
                                return '#icon_InProgress';
                                break;
                            case 'failed':
                                return '#icon_ApprovalRejected';
                                break;
                            default:
                                return false;

                        }
                    };
                  };

            }
        }
    })
})(angular);