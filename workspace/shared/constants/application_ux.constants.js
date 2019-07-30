(function (angular) {
    'use strict';

    angular
        .module('SMART2')
        .constant('APPCONSTANTS', allApplicationConstants());

    function allApplicationConstants() {
        var docStateConstants = {
            "Draft": 1010,
            "DraftWithdrawn": 2,
            "DraftCoAuthoring": 3,
            "DraftOnHold": 4,
            "PendingContractCreation": 5,
            "DraftAmendment": 6,
            "ContractCreationInProgress": 7,
            "ApprovalPending": 21,
            "Approved": 1007,
            "Rejected": 23,
            "Withdrawn": 24,
            "SupplierAcknowledged": 25,
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
            "itemmaster": 98,
            "asl": 99,
            "blanket": 100,
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
            "PendingReceivings": 175,
            "Ideation": 1003,
            "Execution": 1004,
            "Realization": 1005,
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
            "ApprovalPending": 21,
            "CreditMemo": 22,
            "ActionPlan": 23,
            "Program": 24,
            "ApprovalFormPartner": 25,
            "ApprovalUpdatePartnerProfile": 26,
            "PaymentRequest": 27,
            "CategoryWorkbench": 28,
            "ApprovalRuleBasedStatusChange": 29,
            "Blanket": 30,
            "Project": 31,
			"Report": 32,
            "ServiceConfirmation": 90,
            "InvoiceAPUser": 91,
            "InvoiceSupplier": 92,
            "CreditMemoAPUser": 93,
            "CreditMemoSupplier": 94,
            "Supplier": 95,
            "creditnote": 96,
            "punchout": 97,
            "itemmaster": 98,
            "asl": 99,
            "blanket": 100,
            "Awarded": 107,
            "Closed": 124,
            "Live": 71,
            "Draft": 1010,
            "ScoringInProgress": 106,
            "Awarding": 108,
            "Ideation": 1003,
            "Execution": 1004,
            "Realization": 1005,
            "asn": 1011,
            "invoice":1012

    };

        var smartNavTileConfig = {
            "0": {
                "name": "None",
                "icon": "",
                "href": ""
            },
            "1": {
                "name": "rfx",
                "icon": "#icon_RFX",
                "href": "",
                "fullname": "RFX",
            },
            "2": {
                "name": "rfq",
                "icon": "#icon_RFX",
                "href": "",
                "fullname": "Request for Quotation",
            },
            "3": {
                "name": "rfi",
                "icon": "#icon_RFX",
                "href": ""
            },
            "4": {
                "name": "auction",
                "icon": "#icon_Auction",
                "href": "",
                "fullname": "Auction",
            },
            "5": {
                "name": "contract",
                "icon": "#icon_Contract",
                "href": "",
                "fullname": "Contract",
            },
            "6": {
                "name": "catalog",
                "icon": "#icon_Catalog",
                "href": "#/catalog/requestercatalog/search"
            },
            "7": {
                "name": "requisition",
                "icon": "#icon_Requisition",
                "href": "#/p2p/req/empty",
                "fullname": "Requisition",
            },
            "8": {
                "name": "purchaseOrder",
                "icon": "#icon_shouldCost",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0xNg2",
                "fullname": "Should Cost",
            },
            "9": {
                "name": "invoice",
                "icon": "#icon_Invoice",
                "href": "#/p2p/inv/empty",
                "fullname": "Invoice",
            },
            "10": {
                "name": "receipts",
                "icon": "#icon_Receipt",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0xNw2",
                "fullname": "Receipts",
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
                "icon": "#icon_InvRecon",
                "href": "Portal/Dashboard/Documents?oloc=101&md=bT0xMyZzbT0zMA2",
                "fullname": "Invoice Reconciliation",
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
                "icon": "#icon_Receipt",
                "href": "#/p2p/rnote/empty",
                "fullname": "Return Note",
            },
            "21": {
                "name": "project",
                "icon": "",
                "href": ""
            },
            "22": {
                "name": "Credit Memo",
                "icon": "#icon_CredMemo",
                "href": "#/p2p/creditmemo/new",
                "fullname": "Credit Memo",
            },
            "23": {
                "name": "actionPlan",
                "icon": "",
                "href": ""
            },
            "24": {
                "name": "program",
                "icon": "#icon_Program",
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
                "href": "#/p2p/paymentReq/new"
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
			"31": {
                "name": "project",
                "icon": "#icon_projects", // icon for projects will come here.
                "href": "#/projects/new",
                "fullname": "Project",
            },
			"32": {
				"name": "report",
				"icon": "#icon_Report", // icon for projects will come here.
				"href": "index_reports.html#/analytics/new",
				"fullname": "Report",
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
            "95": {
            	"name": "Supplier",
            	"icon": "#icon_Supplier",
            	"href": "#/supplier/new",
            	"fullname": "Supplier",
            },
            "98": {
                "name": "itemmaster",
                "icon": "#icon_InvRecon",
                "href": "#/admin/itemMaster/new",
                "fullname": "Item Master",
            },
            "99": {
                "name": "asl",
                "icon": "#icon_InvRecon",
                "href": ""
            },
            "100": {
                "name": "blanket",
                "icon": "#icon_Order",
                "href": ""
            },            
            "101": {
                "name": "blanket_po",
                "icon": "#icon_Order",
                "href": "",
                "fullname": "Blanket Purchase Order",
            },
            "105": {
                "name": "form",
                "icon": "#icon_Form",
                "href": "",
                "fullname": "Form",
            },
            "106": {
                "name": "scorecard",
                "icon": "#icon_Scorecard",
                "href": "",
                "fullname": "Score card",
            },
            "1003": {
                "name": "ideation",
                "icon": "#icon_ideation",
                "href": ""
            },
            "1004": {
                "name": "Execution",
                "icon": "#icon_Execution",
                "href": ""
            },
            "1005": {
                "name": "Realisation",
                "icon": "#icon_Realisation",
                "href": ""
            },
            "1011":{
                "name": "ASN",
                "fullname": "Advance Shipping Notice",
                "icon": "#icon_asn",
                "href": ""
            }
        };

        var documentPriority = [31, 7, 1, 8, 101, 1011, 32, 105, 106, 5, 9, 14, 95, 10, 22, 24, 0, 2, 3, 4, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 29, 30, 90, 98, 99, 100];

        function setDocumentPriority(newPriorty) {
            documentPriority = newPriorty;
        }

        var globalSearchConstant = {
            "Items": 3
        };

        //card page list icon icons
        var doctypeImages = {
            1: "RFX",
            2: "RFX",
            3: "RFX",
            4: "Auction",
            5: "Contract",
            6: "Catalog",
            7: "Requisition",
			31: "Requisition", // [TODO] need to be specific to project
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
            //22: "Approved", //CreditMemo image not found
            23: "ActPlan", //ActionPlan image not found
            24: "Program", //Program image not found
            25: "AppFormPart", //ApprovalFormPartner image not found
            26: "AppUpPartProf", //ApprovalUpdatePartnerProfile image not found
            27: "PaymentReq",
            28: "CatWrkBnch", //CategoryWorkbench image not found
            29: "AppRuleBsdStatChng", //ApprovalRuleBasedStatusChange image not found
            30: "Blanket", //Blanket image not found
			32: "Report",
            67: "Exception",
			68: "Matched",
            71:"Live",
            90: "SvcConf", //ServiceConfirmation image not found
            91: "InvAPUsr", //InvoiceApUser image not found
            92: "InvSup", //InvoiceSupplier image not found
            93: "CrdMemoAPUsr", //CreditMemoAPUser image not found
            94: "CrdMemoSup", //CreditMemoSupplier image not found
            95: "Supplier",
            96: "Createnote",
            97: "punchout",
            98: "itemmaster",
            99: "asl",
            100: "blanket",
            1001: "RfxDraft",
            1002: "Lock",
            1006: "Receipt",
            1010: "Draft",
            1003: "Ideation",
            1004: "Execution",
            1005: "Realisation",
            1007: "Approved",
            1008: "ApprovalPending",
            107: "Awarded",
            108: "Awarding",
            124: "Closed",
            106: "ScoringInProgress",
            1011: "asn",
            1012:"Invoice"
            
            //1013: "Live",
            //1014: "Awarding",
            //1015: "Execute",
         
        };

        //card page list icon background as per module color
        var doctypeColors = {
            1: "p2p-module",
            2: "contract-module",
            3: "project-module",
            4: "sourcing-module",
            5: "supplier-module",
            6: "project-module",
            7: "p2p-module",
            8: "supplier-module",
            95: "supplier-module",
            71: "contract-module",
            107: "contract-module",
            108: "project-module",
            106: "sourcing-module",
            124: "project-module",
            1001: "project-module",
            1002: "supplier-module",
            1003: "project-module",
            1004: "sourcing-module",
            1005: "supplier-module",
            1006: "supplier-module",
            1007: "p2p-module",
            1008: "supplier-module",
            1010: "p2p-module",
            1011: "p2p-module"
        }

        //card header Images
        var docStateImages = {
            "drafts": "Draft",
            "pendingapprovals": "PendingApprovals",
            "followup": "RfxReqPendi",
            "pendingacceptance": "RfxDraft",
            "pendingreceivings": "RfxReqPendi",
            "requisition": "Requisition",
			"project" : "Requisition", //[TODO] need to be of project type
            "order": "Order",
            "invoicereconciliation": "RfxDraft",
            "creditnote": "CredMemo",
            "receipt": "Receipt",
            "returnNote": "RfxReqPendi",
            "catalog": "Catalog",
            "supplier": "Supplier",
            "rfx": "RFX",
            "contract": "Contract",
            "punchout": "POPartner",
            "unprocessed requisitions": "RfxReqPendi",
          //  "project": "projects",
            "itemmaster": "RfxDraft",
            "asl": "RfxDraft",
            "blanket": "blanket",
            "awarding": "Awarding",
            "approvalpending": "ApprovalPending",
            "closed": "Closed",
            "approved": "Approved",
            "awarded": "Awarded",
            "scoringinprogress": "ScoringInProgress",
            "asn": "asn",
            "invoice": "Invoice"
        };

        //card header color
        var docStateColors = {
            "drafts": "koromiko",
            "pendingapprovals": "asparagus",
            "followup": "cornflower-blue",
            "pendingacceptance": "slate-blue",
            "requisition": "red-orange",
			//"project": "red-orange", // [TODO] Need to be project type
            "order": "summer-sky",
            "invoicereconciliation": "koromiko",
            "creditnote": "asparagus",
            "receipt": "cornflower-blue",
            "returnNote": "slate-blue",
            "catalog": "red-orange",
            "supplier": "summer-sky",
            "rfx": "koromiko",
            "contract": "asparagus",
            "punchout": "cornflower-blue",
            "unprocessed requisitions": "slate-blue",
            "project": "red-orange",
            "itemmaster": "summer-sky",
            "asl": "asparagus",
            "blanket": "cornflower-blue",
            "awarding": "slate-blue",
            "approvalpending": "red-orange",
            "closed": "summer-sky",
            "approved": "asparagus",
            "awarded": "asparagus",
            "scoringinprogress": "slate-blue",
            "asn": "summer-sky",
            "invoice": "koromiko"

        };

        var cardsBucketIdentifierConstants = {
            "drafts": "getDraftsData",
            "pendingapprovals": "getPendingApprovalData",
            "followup": "getFollowUpData",
            "pendingacceptance": "getPendingAcceptanceData",
            "pendingreceivings": "getPendingReceivingsData",
            //"unprocessed requisitions": "getPendingAcceptanceData"
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
