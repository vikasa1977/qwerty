(function (angular) {
    'use strict';

    angular
        .module('SMART2')
        .constant('APPCONSTANTS', allApplicationConstants());

    function allApplicationConstants() {
        var docStateConstants = {
            "Draft": 1,
            "DraftWithdrawn": 2,
            "DraftCoAuthoring": 3,
            "DraftOnHold": 4,
            "PendingContractCreation": 5,
            "DraftAmendment": 6,
            "ContractCreationInProgress": 7,
            "ApprovalPending": 21,
            "Approved": 22,
            "Rejected": 23,
            "Withdrawn": 24,
            "PartnerAcknowledged": 25,
            "AcknowledgementPending": 26,
            "PartiallyAccepted": 27,
            "Accepted": 28,
            "ExecutionPending": 29,
            "TeamReviewPending": 30,
            "SupplierReviewPending": 31,
            "TeamReviewed": 32,
            "TeamRejected": 33,
            "SupplierReviewed": 34,
            "SendForSignature": 35,
            "SignedBySignatory": 36,
            "RejectedBySignatory": 37,
            "SendForSupplierSignature": 38,
            "SupplierSigned": 39,
            "SupplierSignatoryRejected": 40,
            "SubmittedToPartner": 41,
            "SubmittedToBuyer": 42,
            "SentForAcceptance": 43,
            "Published": 44,
            "NotInvited": 45,
            "SupplierInvited": 46,
            "SupplierAccepted": 47,
            "SupplierRejected": 48,
            "ResponseActive": 49,
            "PartnerParticipating": 50,
            "ResponsePending": 51,
            "SentByBuyer": 52,
            "SentToRequester": 53,
            "SentToReceiver": 54,
            "SentBack": 55,
            "SentForBidding": 56,
            "Uploaded": 57,
            "PartnerRevoked": 58,
            "ApprovalRejected": 59,
            "PartiallyOrdered": 61,
            "Ordered": 62,
            "PartialReceipt": 63,
            "FullReceipt": 64,
            "ReturnReceipt": 65,
            "ExcessReceipt": 66,
            "Exception": 67,
            "Matched": 68,
            "NonProcurable": 69,
            "InvoicedStatus": 70,
            "Live": 71,
            "NotYetOpen": 72,
            "Paused": 73,
            "LivePrebid": 74,
            "NotYetOpenForInitialBid": 75,
            "LiveForInitialBid": 76,
            "MatchedWithTolerance": 77,
            "InProgress": 78,
            "Verification": 81,
            "Completed": 82,
            "Execute": 83,
            "ReadyForPayment": 101,
            "SentForPayment": 102,
            "PaymentFailure": 103,
            "InvoicePaid": 104,
            "InvoicePaidWithRemittance": 105,
            "ScoringInProgress": 106,
            "Awarded": 107,
            "Awarding": 108,
            "BiddingCompleted": 109,
            "Cancel": 120,
            "Cancelled": 121,
            "Deleted": 122,
            "Unpublished": 123,
            "Closed": 124,
            "Expired": 125,
            "Terminate": 126,
            "Amended": 127,
            "SendingInProgress": 141,
            "SendingToPartnerFailed": 142,
            "RequestPending": 143,
            "RequestAccepted": 144,
            "RequestRejected": 145,
            "RequestApproved": 146,
            "RequestRejectedOnApproval": 147,
            "CancellationInProgress": 148,
            "CancellationFailed": 149,
            "OnHold": 150,
            "SentForProcessing": 151,
            "SentToERP": 152,
            "InvoicePaymentCancelled": 153,
            "Active": 154,
            "Inactive": 155,
            "CreditMemoPaidWithRemittance": 156,
            "CreditMemoPaymentCancelled": 157,
            "Incomplete": 158,
            "ClosedForInvoicing": 159,
            "ClosedForReceiving": 160,
            "ApprovalRequired": 161,
            "ApprovalWithdrawn": 162,
            "AutoAccepted": 163,
            "Blocked": 164,
            "ResponseInProgress": 165,
            "ResponseClosed": 166,
            "Error": 167,
            "SendForApprovalFailed": 169,
            "SendForProcessingFailed": 170,
            "InternallyCancelled": 171,
            "BudgetOverridePending": 172,
            "FollowUp": 173,
            "PendingAcceptance": 174,
            "PendingReceivings": 175
        };

        var doctypeConstants = {
            "None": 0,
            "RFP": 1,
            "RFQ": 2,
            "RFI": 3,
            "Auction": 4,
            "Contract": 5,
            "Catelog": 6,
            "Requisition": 7,
            "PO": 8,
            "Invoice": 9,
            "Receipts": 10,
            "Forms": 11,
            "Assessment": 12,
            "Item": 13,
            "InvoiceReconcillation": 14,
            "ScannedImage": 15,
            "ContractRequest": 16,
            "RFxRequest": 17,
            "AuctionRequest": 18,
            "PartnerProfile": 19,
            "ReturnNote": 20,
            "Project": 21,
            "CreditMemo": 22,
            "ActionPlan": 23,
            "Program": 24,
            "ApprovalFormPartner": 25,
            "ApprovalUpdatePartnerProfile": 26,
            "PaymentRequest": 27,
            "CategoryWorkbench": 28,
            "ApprovalRuleBasedStatusChange": 29,
            "Blanket": 30,
            "ServiceConfirmation": 90,
            "InvoiceAPUser": 91,
            "InvoiceSupplier": 92,
            "CreditMemoAPUser": 93,
            "CreditMemoSupplier": 94
        };

        var smartNavTileConfig = {
            "0": {
                "name": "None",
                "icon": "",
                "href": ""
            },
            "1": {
                "name": "rfp",
                "icon": "#icon_RFX",
                "href": ""
            },
            "2": {
                "name": "rfq",
                "icon": "#icon_RFX",
                "href": ""
            },
            "3": {
                "name": "rfi",
                "icon": "#icon_RFX",
                "href": ""
            },
            "4": {
                "name": "auction",
                "icon": "#icon_Auction",
                "href": ""
            },
            "5": {
                "name": "contract",
                "icon": "#icon_Contract",
                "href": ""
            },
            "6": {
                "name": "catalog",
                "icon": "#icon_Catalog",
                "href": ""
            },
            "7": {
                "name": "requisition",
                "icon": "#icon_Requisition",
                "href": "P2P#/requisitions/1"
            },
            "8": {
                "name": "po",
                "icon": "",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0xNg2"
            },
            "9": {
                "name": "invoice",
                "icon": "",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0xOA2"
            },
            "10": {
                "name": "receipts",
                "icon": "#icon_Requisition",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0xNw2"
            },
            "11": {
                "name": "forms",
                "icon": "#icon_Contract",
                "href": ""
            },
            "12": {
                "name": "assessment",
                "icon": "#icon_Contract",
                "href": ""
            },
            "13": {
                "name": "item",
                "icon": "",
                "href": ""
            },
            "14": {
                "name": "invoiceReconciliation",
                "icon": "",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0zMA2"
            },
            "15": {
                "name": "scanned_image",
                "icon": "",
                "href": ""
            },
            "16": {
                "name": "contract_request",
                "icon": "",
                "href": ""
            },
            "17": {
                "name": "rfxrequest",
                "icon": "",
                "href": ""
            },
            "18": {
                "name": "auction_request",
                "icon": "",
                "href": ""
            },
            "19": {
                "name": "partner_profile",
                "icon": "",
                "href": ""
            },
            "20": {
                "name": "return_note",
                "icon": "",
                "href": ""
            },
            "21": {
                "name": "project",
                "icon": "",
                "href": ""
            },
            "22": {
                "name": "Credit Memo",
                "icon": "",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0zNw2"
            },
            "23": {
                "name": "actionPlan",
                "icon": "",
                "href": ""
            },
            "24": {
                "name": "program",
                "icon": "",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT00NA2"
            },
            "25": {
                "name": "approval_form_partner",
                "icon": "",
                "href": ""
            },
            "26": {
                "name": "approval_update_partner_profile", // Its a rule
                "icon": "",
                "href": ""
            },
            "27": {
                "name": "paymentRequest",
                "icon": "#icon_PaymentReq",
                "href": "PaymentRequest/ManagePaymentRequest/Create?dd=ZGM9MCZicGM9NDg2Nw2&md=bT0zMSZzbT00Nw2&rdt=27&oloc=107"
            },
            "28": {
                "name": "category_workbench",
                "icon": "",
                "href": ""
            },
            "29": {
                "name": "Approval Rule Based Status Change", // rule
                "icon": "",
                "href": ""
            },
            "30": {
                "name": "blanket",
                "icon": "#icon_Contract",
                "href": ""
            },
            "90": {
                "name": "service_confirmation", // new doc type
                "icon": "",
                "href": ""
            },
            "91": {
                "name": "Invoice APUser",
                "icon": "",
                "href": ""
            },
            "92": {
                "name": "Invoice Supplier",
                "icon": "",
                "href": ""
            },
            "93": {
                "name": "Credit Memo AP User",
                "icon": "",
                "href": ""
            },
            "94": {
                "name": "Credit Memo Supplier",
                "icon": "",
                "href": ""
            },
        };

        var documentPriority = [7, 8, 10, 27, 9, 14, 22, 24, 0, 1, 2, 3, 4, 5, 6, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 29, 30, 90];

        function setDocumentPriority(newPriorty) {
            documentPriority = newPriorty;
        }

        var globalSearchConstant = {
            "Items": 3
        };

        var doctypeImages = {
            1: "RFX",
            2: "RFX",
            3: "RFX",
            4: "Auction",
            5: "Contract",
            6: "Catalog",
            7: "Requisition",
            8: "Order",
            9: "Invoice", //Invoice image not found
            10: "ReceiptData", //Receipt image not found
            11: "Form", //Forms image not found
            12: "Assessment", //Assessment image not found
            13: "Item", //Item image not found
            14: "InvRecon",
            15: "ScnImg", //ScannedImage image not found
            16: "ConReq", //ContractRequest image not found
            17: "RfxReq",
            18: "AucReq", //AuctionRequest image not found
            19: "ParPro", //PartnerProfile image not found
            20: "RetNote", //ReturnNote image not found
            21: "Project", //Project image not found
            22: "CrdMemo", //CreditMemo image not found
            23: "ActPlan", //ActionPlan image not found
            24: "Program", //Program image not found
            25: "AppFormPart", //ApprovalFormPartner image not found
            26: "AppUpPartProf", //ApprovalUpdatePartnerProfile image not found
            27: "PaymentReq",
            28: "CatWrkBnch", //CategoryWorkbench image not found
            29: "AppRuleBsdStatChng", //ApprovalRuleBasedStatusChange image not found
            30: "Blanket", //Blanket image not found
            90: "SvcConf", //ServiceConfirmation image not found
            91: "InvAPUsr", //InvoiceApUser image not found
            92: "InvSup", //InvoiceSupplier image not found
            93: "CrdMemoAPUsr", //CreditMemoAPUser image not found
            94: "CrdMemoSup" //CreditMemoSupplier image not found
        };

        var doctypeColors = {
            1: "rfx",
            2: "rfx",
            3: "rfx",
            4: "auction",
            5: "contract",
            6: "catalog",
            7: "requisition",
            8: "order",
            9: "invoice",
            10: "receipt-data",
            11: "form",
            12: "assessment",
            13: "item",
            14: "invoice-reconciliation",
            15: "scanned-image",
            16: "contract-request",
            17: "rfx-request",
            18: "auction-request",
            19: "partner-profile",
            20: "return-note",
            21: "project",
            22: "credit-memo",
            23: "action-plan",
            24: "program",
            25: "approval-from-partner",
            26: "approval-update-partner-profile",
            27: "payment-request",
            28: "category-workbench",
            29: "approval-rule-based-staus-change",
            30: "blanket",
            90: "service-confirmation",
            91: "invoice-APUser",
            92: "invoice-supplier",
            93: "credit-memo-APUser",
            94: "credit-memo-supplier"
        };

        var docStateImages = {
            "drafts": "RfxDraft",
            "pendingapprovals": "RfxReqPendi",
            "followup": "RfxReqPendi",
            "pendingacceptance": "Receipt",
            "pendingreceivings": "Receipt"
        };

        var docStateColors = {
            "drafts": "draft",
            "pendingapprovals": "pending-approval",
            "followup": "pending-approval",
            "pendingacceptance": "receipts",
            "pendingreceivings": "receipts"
        };
        var cardsBucketIdentifierConstants = {
            "drafts": "getDraftsData",
            "pendingapprovals": "getPendingApprovalData",
            "followup": "getFollowUpData",
            "pendingacceptance": "getPendingAcceptanceData",
            "pendingreceivings": "getPendingReceivingsData"
        };

        var formWidgetItemClasses = {
            //  P2P
            "P2P_CMN_BillTo": "icon_BillTo",
            "P2P_CMN_DeliverTo": "icon_DeliverTo",
            "P2P_REQ_ERPOrderType": "icon_OrderERP",
            "P2P_Req_OnBehalfOf": "icon_OnBehalf",
            "P2P_Req_Requester": "",
            "P2P_Currency": "",
            "P2P_REQ_Department": "",
            "P2P_Req_Urgent": "",
            "P2P_Req_Name": "",
            "P2P_Req_Number": "",
            "P2P_CMN_ShipTo": "",
            "P2P_REQ_WorkOrder": "icon_Order"
        };

        var userPreferences = {};

        return {
            "doctypeConstants": doctypeConstants,
            "docStateConstants": docStateConstants,
            "smartNavTileConfig": smartNavTileConfig,
            "documentPriority": documentPriority,
            "setDocumentPriority": setDocumentPriority,
            "cardsBucketIdentifierConstants": cardsBucketIdentifierConstants,
            "doctypeImages": doctypeImages,
            "docStateImages": docStateImages,
            "doctypeColors": doctypeColors,
            "docStateColors": docStateColors,
            "formWidgetItemClasses": formWidgetItemClasses,
            "globalSearchConstant": globalSearchConstant,
            "userPreferences": userPreferences
        };
    };
})(angular);
