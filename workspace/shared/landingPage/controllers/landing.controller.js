angular.module('SMART2')
    .controller('landingPageCtrl', ['$scope', '$rootScope', '$http', 'routeSvc', '$timeout', '$state', 'notification', '$sce', '$filter', 'storeService', 'ngIntroService', '$interval', landingPageCtrlFunc])
    .controller('popupManageFieldCtrl', ['$scope', '$rootScope', '$filter', popupManageFieldCtrlFunc]);

function landingPageCtrlFunc($scope, $rootScope, $http, routeSvc, $timeout, $state, notification, $sce, $filter, storeService, ngIntroService, $interval) {
    //current object
    $scope.vm = this;
    $scope.showOnlyIcons = false;
    $scope.showCount = false;
    $scope.vm.isLoading = false;
    $scope.showShareReportPopup = false;
    //search icon functionality
    this.isActiveSearch = false;
    this.isActiveSearchData = false;
    this.focusSearch = false;
    this.hideClose = false;
    this.focusSearchData = false;
    this.hideCloseData = false;
    this.showMeData = false;
    $scope.addNewShareReportPopup = false;
    $scope.vm.disableShareButton = true;
    $scope.vm.checkedArrayLength = 0;
    $scope.vm.isPartiallySelected = false; 
    this.selectAllCheckbox = false;
    $scope.vm.isShareReportPartiallySelected = false; 
    $scope.vm.checkedShareReportArrayLength = 0;
    $scope.vm.selectAllShareReportCheckbox = false;
    $scope.vm.disableUnShareIcon = true;



    $scope.linkedDocs = [{ name: "RFX", icon: "#icon_RFX" }, { name: "Auction", icon: "#icon_Auction" }, { name: "Contract", icon: "#icon_Contract" }];


        // Blue screen of creation mode
        $scope.documentObj = {};
        $scope.documentObj.callback = function (item) {
            console.log(item);
            Materialize.toast("Document has been successfully created", 2000);
        }
        $scope.addContract = function () {
            var item = {
                docID: 103
            };
            $scope.documentObj.setActiveProduct(item);
        }
        $scope.addDocRfx = function () {
            var item = {
                docID: 104
            };
            $scope.documentObj.setActiveProduct(item);
        }
        if ($state.params.referpage == 'fromContract') {
            Materialize.toast("Contract has been successfully created", 5000);
        }
        $scope.documentObj.callback = function (item) {
            if (item.id == "template_rfx") {
                $state.go('p2p.template', { templatefor: 'order' });
                // $state.go('expandedLandingList', { doctype: 'spend_reports' });
            }
             
        }


    //share report popup data
    this.shareReportData = [
                    {
                        name: 'Kevin Peterson',
                        email: "kevin@gep.com",
                        isChecked: false
                    },
 {
                        name: 'Rahul Dravid',
                        email: "RahulD@gep.com",
                        isChecked: false
                    },
                    {
                        name: 'Virat Kohli',
                        email: "Virat@gep.com",
                        isChecked: false
                    }
                ];   
            //add new share report popup data
   $scope.vm.shareNewData = [
                    {
                        name: 'Suresh Raina',
                        email: "suresh@gep.com",
                        isChecked: false
                    },
                    {
                        name: 'Malinga',
                        email: "malinga@gep.com",
                        isChecked: false
                    },
                    {
                        name: 'Dravid',
                        email: "dravid@gep.com",
                        isChecked: false
                    },
                    {
                        name: 'Rahul Yadav',
                        email: "yadav@gep.com",
                        isChecked: false
                    },
                    {
                        name: 'Mayur Gadaker',
                        email: "gadaker@gep.com",
                        isChecked: false
                    },
                    {
                        name: 'Gaurav Jather',
                        email: "jather@gep.com",
                        isChecked: false,
                        records: 15000
                    },
                    {
                        name: 'Laxmi',
                        email: "laxmi@gep.com",
                        isChecked: false
                    }
                ];
    // fab button start

    $scope.fabbclicked = function (e) {
        $scope.isAciveFab = !$scope.isAciveFab;
        e.stopPropagation();
    }
    $scope.hideFabButton = function () {
        $scope.isAciveFab = false;
    }
    $scope.isAciveFab = false;

    // fab button end

    $scope.val1 = true;
    $scope.val2 = true;
    $scope.val3 = true;

    $scope.hideSidePanelFilter = true;
    $scope.callbackFunc = function (e) {
        $scope.applyFilter();
    };


    $scope.showMoreChips = false;
    $scope.showAllChips = function () {
        $scope.showMoreChips = true;
    }
    $scope.filterChipsOnHideCallback = function () {
        $scope.showMoreChips = false;
    }


    $scope.filterItems = [
        { "filterKey": "Document Type" },
        { "filterKey": "Delivery Status" },
        { "filterKey": "Category" },
        { "filterKey": "Status" },
        { "filterKey": "Organisation Entity" },
        { "filterKey": "Name" },
        { "filterKey": "My Role" },
        { "filterKey": "Date Range" },
        { "filterKey": "Period" },
        { "filterKey": "Recipient Type" }
    ];
   

    $scope.callbackFuncForFilter = function (e) {
        $scope.savedfilterexpanded = true;
        if (e.currOperation == "edit") {
            $scope.savedFilterPopUp = true;
        }
        else if (e.currOperation == "delete") {
            $scope.savedFilterPopUp = true;
            if ($scope.getFilterViewsList.length == 0) {
                $scope.savedFilterPopUp = false;
            }
        }
        else {
            $scope.applyFilter();
        }
    };
    $scope.focusSearchC = false;
    $scope.isActiveC = false;
    $scope.showMeC = false;
    $scope.showSearchC = function () {
        $scope.isActiveC = true;
        $scope.focusSearchC = true;
        $scope.showMeC = true;
        $scope.hideCloseC = true;
    };
    $scope.hideSearchC = function () {
        $scope.isActiveC = false;
        $scope.focusSearchC = false;
        $scope.hideCloseC = false;
    };
    $scope.exportActions = [
			{
			    'key': 'Export to Excel'
			},
           {
               'key': 'Export PDF'
           },
            {
                'key': 'Print'
            },
            { 'key': 'Share' }
    ];
    $scope.scrollBreakPoints = {
        "canvas": {
            top: .5,
            reverse: true
        }
    };
    $scope.onBreakPoints = function (e) {
       // console.log(e);
    }
    $scope.broadcastActions = [
			{
			    'key': 'Broadcast'
			},
           {
               'key': 'Send PRF'
           },
            {
                'key': 'Send Additional Forms'
            },
            { 'key': 'Request for profile update' }
    ];


    $scope.bandHeight = 0;
    $scope.enableSortButton = true;
    $scope.itemClicked = function ($index) {
        $scope.enableSortButton = false;
        $scope.selectedIndex = $index;
    }
    $scope.showFormC = false;
    $scope.categoryDatainitialDisplayText = 'Choose Category';
    $scope.uploadPoupUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.showUploadlogpopup = false;
    $scope.showUploadlogpopupCallback = function () {
        $scope.showUploadlogpopup = true;
    }
    $scope.onUploadlogpopupHide = function (e) {
        $scope.showUploadlogpopup = false;
    }
    $scope.docFlag = false;
    $scope.uploadDocCall = function (e) {
        $scope.docFlag = true;
    };
    $scope.attachFlag = false;
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;
    };

    $scope.setModalIcon = '#icon_RfxReq';
    $scope.Pagefor = $state.params.pagefor;
    $scope.docType = $state.params.doctype;
    $scope.referrer = $state.params.referrer;

    $scope.createDocumentCallback = function (doc) {
        $state.go('p2p.' + doc + '.new');
    }

    $scope.isContract = false;
    if ($scope.docType == "contract") {
        $scope.isContract = true;
    }
    $scope.isViewLineItem = false;
    $scope.onselectTabCall = function (tabObj) {
        $scope.filterByReportType(tabObj);
        setFilterList();
        if (tabObj.tabId == 1) {
            $scope.isViewLineItem = true;
        } else $scope.isViewLineItem = false;
        storeService.set('isViewLineItem', $scope.isViewLineItem);
    }
    $scope.onselectTabCallApproval = function (tabObj) {
        if (tabObj.tabId == 1) {
            $scope.isViewLineItem = true;
        } else $scope.isViewLineItem = true;
        storeService.set('isViewLineItem', $scope.isViewLineItem);
    }
    $scope.showCardsData = function (cardObj) {
        if (cardObj.docType === 'supplier' && cardObj.docStatus) {
            $scope.supplierIcard.supplierName = cardObj.docName;
            $scope.supplierIcard.status = !cardObj.docStatus ? 'Approval Pending' : cardObj.docStatus;
            $scope.supplierIcard.site = 'www.' + cardObj.docName.toLowerCase().replace(/[^a-z0-9]/gmi, "") + '.com';
            $scope.supplierIcard.emailId = 'Allan.Gibson@' + cardObj.docName.toLowerCase().replace(/[^a-z0-9]/gmi, "") + '.com';

            if ($scope.supplierIcard.supplierName === 'kellogg\'s') {
                $scope.supplierIcard.logoUrl = "shared/resources/images/kelloggs_logo.png";
            } else {
                $scope.supplierIcard.logoUrl = "";
            }
            $scope.showSupplierIcard();
        }
    }

    $scope.docLinkCall = function (itemObj) {
    	if ($scope.docType == "spend_reports") {
    		// window.location.href = 'index_reports.html#/analytics/new';
    	}
        if ($scope.isContract) {
            if ($scope.docType == "blanket") {
                $state.go("contract.new", { mode: "blanketLive" });
            }
            else if (itemObj.docType == "executedExelonAuthering") {
                $state.go("contract.new", { authoring: "contractAuthoring" });

            }
            else if (itemObj.docStatus == "Live" && itemObj.title == "exelon") {
                $state.go("contract.new", { mode: "executedExelonContract" });
            }

            else if (itemObj.docStatus == "Live") {
                $state.go("contract.new", { mode: "contractDemo", amendmentStatus: "live" });
            }
           
            else {
                if (itemObj.docStatus == "Executed") {
                    $state.go("contract.new", { mode: "executedContract" });
                }
                else {
                    $state.go("contract.new");
                }
            }
        }
        if (itemObj.docType == "receipt") {
            if (itemObj.changeInReceipt) {
                $state.go("p2p.receipt.new", { mode: "changeInReceipt" });
            }
            else {
                $state.go("p2p.receipt.new", { status: itemObj.docStatus, secStatus: itemObj.secDocStatus });
            }
        }
        else {
            if (itemObj.docType === 'supplier' && itemObj.docStatus) {

                if (itemObj.docLink === 'supplier.profile') {
                    $state.go(itemObj.docLink, { pagefor: itemObj.docName, status: itemObj.docStatus });
                } else {
                    $state.go(itemObj.docLink);
                }

            } else {
                if (itemObj.docType === 'supplier' && !itemObj.docStatus) {
                    $state.go('supplier.profile', {
                        type: 'task',
                        pagefor: itemObj.docName,
                        status: itemObj.docStatus
                    });
                }
                else if (itemObj.docType == "Catalog") {
                    $state.go('catalog.admincatalog.new', {
                        id: 1
                    });
                }

                else if (itemObj.docType == "createdContract") {
                    $state.go('catalog.admincatalog.new', { mode: "createdContractDone" });
                    $scope.catalogDone = true;
                }
                else if (itemObj.docType == "asn") {
                    $state.go(itemObj.docLink, {
                        status: itemObj.docStatus
                    });

                }
                else if (itemObj.docType == "RFX") {
                    $state.go(itemObj.docLink, { referpage: 'eventAdmin' });
                }
                else {
                    $state.go(itemObj.docLink);
                }
            }



        }




    }

    $scope.secDocLinkCall = function (itemObj) {
        if (itemObj.docType == "receipt") {
            $state.go("p2p.receipt.new", { status: itemObj.secDocStatus, secStatus: itemObj.docStatus });
        }
    }

    $scope.changeReceiptCall = function (itemObj) {
        $state.go("p2p.receipt.new", { mode: "changeInReceipt", section: "lineDetail" });
    }

    $scope.supplierIcardlink = function () {
        $scope.hideSupplierIcardPopupCallback();
        if ($scope.supplierIcard.status !== 'Approval Pending') {
            $state.go('supplier.profile', {
                pagefor: $scope.supplierIcard.supplierName,
                status: $scope.supplierIcard.status
            });
        } else {
            $state.go('supplier.profile', {
                type: 'task',
                pagefor: $scope.supplierIcard.supplierName,
                status: $scope.supplierIcard.status
            });

        }
    };

    // POPUP -- comments
    $scope.commentIcon = '#icon_Comments'; //icon_Commented
    $scope.commentsPopupUrl = "shared/popup/views/commentsPopup.html";

    $scope.showCommentsPopup = false;
    $scope.showCommentsPopupCallback = function (e) {
        $scope.hideSupplierIcardPopupCallback();
        $scope.showCommentsPopup = true;
    };
    $scope.commentsPopUpOnHideCallback = function (e) {
        $scope.showCommentsPopup = false;
        $scope.showSupplierIcardPopup = true;
        $scope.commentIcon = '#icon_Commented';//icon_Comments
    };

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


    //popup -- Company Icard
    $scope.showSupplierIcardPopup = false;
    $scope.showSupplierIcard = function () {
        $scope.showSupplierIcardPopup = true;

    }
    $scope.hideSupplierIcardPopupCallback = function () {
        $scope.showSupplierIcardPopup = false;
    };
    //"logoUrl": "shared/resources/images/kelloggs_logo.png",
    $scope.supplierIcard = {
        "supplierName": "kelloggs",
        "location": "Michigan, United States",
        "site": "www.kelloggs.com",
        "emailId": "Allan.Gibson@Kelloggs.com",
        "logoUrl": "",
        "primaryContact": "Allan Gibson",
        "code": "232654BB3C",
        "suppilersourcetype": "General",
        "status": "Invited",
        "businessunit": {
            "displaytext": "Business Unit",
            "selectedoption": [{ "name": "TECHNOLOGY SOLUTIONS", "check": true, "value": [{ "name": "NOVA", "check": true, "value": [{ "name": "PRODUCT MANAGEMENT GROUP", "check": true }, { "name": "USER EXPERIENCE", "check": true }, { "name": "PRODUCT TECHNOLOGY", "check": true }] }] }],
            "options": [{
                "name": "TECHNOLOGY SOLUTIONS", "check": true, "value": [{
                    "name": "NOVA", "check": true, "value": [{
                        "name": "PRODUCT MANAGEMENT GROUP", "check": true
                    }, { "name": "USER EXPERIENCE", "check": true }, { "name": "PRODUCT TECHNOLOGY", "check": true }]
                }]
            }]
        },
        "diversityStatus": {
            "displaytext": "Diversity Status",
            "selectedoption": [{ "name": "Minority Business Enterprise (MBE) - African American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Indian American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Pacific American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Hispanic American", "check": true }],
            "options": [{ "name": "Minority Business Enterprise (MBE) - African American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Indian American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Asian-Pacific American", "check": true }, { "name": "Minority Business Enterprise (MBE) - Hispanic American", "check": true }]
        },

        "email": "Allan.Gibson@Kelloggs.com",
        "dunscode": "343-BHH-236-549-BB2",
        "suppilerrisktype": "Moderate",
        "countIndicator": [
            {
                "cardCount": "20",
                "cardTitle": "Contracts"
            },
            {
                "cardCount": "30",
                "cardTitle": "Purchase Order"
            },
            {
                "cardCount": "40",
                "cardTitle": "Requisitions"
            }
        ],

        "phone": "908-720-8526",
        "fax": "9099809988"
    };
    $scope.isListView = false;
    $scope.approval = false;
    var setLinkforTemplate = '', blankpagelink = '';

    var docTypSup = $scope.docType;
    if (!docTypSup) {
        docTypSup = 'landing';
    }
    docTypSup = docTypSup.split('SPN-');

    $scope.docTypeChange =
    [{
        "name": "Drafts",
        "displayName": "Draft"
    },
    {
        "name": "unprocessedrequisitions",
        "displayName": "unprocessed requisitions"
    },
    {
        "name": "FollowUp",
        "displayName": "Follow Up",
    },
    {
        "name": "pendingacceptance",
        "displayName": "pending acceptance",
    },
    {
        "name": "blanket",
        "displayName": "blanket",
    },
    {
        "name": "contractUploading",
        "displayName": "Manage - Contracts",
    },
    {
        "name": "contract",
        "displayName": "contract",
    },
    {
        "name": "project",
        "displayName": "project",
    },
    {
        "name": "supplier",
        "displayName": "supplier",
    },
    {
        "name": "order",
        "displayName": "order",
    },
    {
        "name": "manage",
        "displayName": "manage",
    },
    {
        "name": "requisition",
        "displayName": "requisition",
    },
    {
        "name": "Awarding",
        "displayName": "Awarding",
    },
    {
        "name": "Approved",
        "displayName": "Approved",
    },
    {
        "name": "Awarded",
        "displayName": "Awarded",
    },
    {
        "name": "ApprovalPending",
        "displayName": "Approval Pending",
    },
    {
        "name": "Closed",
        "displayName": "Closed",
    },
    {
        "name": "ScoringInProgress",
        "displayName": "Scoring In Progress",
    },
    {
        "name": "search",
        "displayName": "search",
    },
    {
        "name": "myrequisitions",
        "displayName": "my requisitions",
    },
    {
        "name": "supplierprofile",
        "displayName": "supplier profile",
    },
    {
        "name": "invoiceReconciliation",
        "displayName": "invoice Reconciliation",
    },
    {
        "name": "catalog",
        "displayName": "catalog",
    },
    {
        "name": "invoiceExcel",
        "displayName": "Invoice Excel",
    },
    {
        "name": "RFX",
        "displayName": "RFX",
    },
    {
        "name": "scannedInvoice",
        "displayName": "scanned Invoice",
    },
    {
        "name": "creditnote",
        "displayName": "credit note",
    },
    {
        "name": "asn",
        "displayName": "ASN"
    },
    {
        "name": "invoice",
        "displayName": "Invoice"
    },
    {
        "name": "receipt",
        "displayName": "Receipt"
    },
    {
        "name": "selectInvoice",
        "displayName": "Select Invoice"
    },
    {
     "name": "procProfile",
     "displayName": "Procurement Profiles",
     }
    ];


    $scope.docTypeChange.forEach(function (item) {
        if (item.name == $scope.docType) {
            $scope.docTypeText = item.displayName;
        }
    });
    $scope.sourcingCopyEvent = function () {
        $state.go("sourcing.rfx.new");
    }

    var referrer = $state.params.referrer;
    if (referrer == 'manageRfx') {
        $scope.rfxCopyEvent = true;
    }

    $scope.scannedImg = false;
    $scope.rfxView = false;
    
    /*set data file from here*/
    if ($scope.docType === "requisition" || $scope.Pagefor === "manage" && $scope.docType === "requisition") {
        $scope.getURLPath = 'shared/landingPage/models/requsition_data.json';
        blankpagelink = 'p2p.req.new';
        setLinkforTemplate = 'requisition';
        $scope.scannedImg = false;
        $scope.exportActions.push({ 'key': 'Assign' });
        //Assign - Reassign Pop up
        $scope.assignPopup = false;
        $scope.assignPopupCallback = function (title) {
            $scope.assignPopup = true;
            $scope.popupTitle = title;
        };
        $scope.assignPopupOnHideCallback = function (e) {
            $scope.assignPopup = false;
        };

        $scope.buyerOptions = [
			{
			    "buyerId": 1,
			    "buyerName": "Michael Slater",
			},
			{
			    "buyerId": 2,
			    "buyerName": "Jammie Foster",
			},
			{
			    "buyerId": 3,
			    "buyerName": "John Doe",
			},
			{
			    "buyerId": 4,
			    "buyerName": "Ozborne Lopez",
			}
        ];
        $scope.selectedBuyer = "";
        $scope.buyerSelected = true;

        $scope.assignBuyer = function (e) {
            $scope.selectedBuyer = e;
            $scope.buyerSelected = false;
        }

        $scope.onLookupClose = function (response) {
            if (response.result != null) {
                $scope.selectedBuyer = response.result;
                $scope.buyerSelected = false;
            }
            $scope.assignPopupCallback($scope.popupTitle);
        }

        $scope.assignCallback = function () {
            if (!$scope.buyerSelected)
                $scope.assignPopup = false;
        }
        //Assign - Reassign Pop up ends
    }
    else if ($scope.docType === "order" || $scope.Pagefor === "manage" && $scope.docType === "order") {
        $scope.getURLPath = 'p2p/order/models/order_data.json';
        blankpagelink = 'p2p.order.new';
        setLinkforTemplate = 'order';
        $scope.scannedImg = false;
    } else if (($scope.Pagefor === "manage" || $scope.Pagefor === "task") && docTypSup[0] === "supplier") {
        $scope.getURLPath = 'shared/landingPage/models/supplier_data.json';
        $scope.docType = "supplier";
        $scope.isListView = true;
        $scope.scannedImg = false;

        //actions popup
        $scope.actionPopup = false;
        $scope.actionPopupCallback = function (title) {
            $scope.actionPopup = true;
            $scope.popupTitle = title;
        };
        $scope.actionPopupOnHideCallback = function (e) {
            $scope.actionPopup = false;
        };

        //attachment popup
        $scope.actionAttachementPopup = false;
        $scope.ActAttachementPopupCallback = function (e) {
            $scope.actionAttachementPopup = true;
            $scope.actionPopup = false;
        };
        $scope.hideActAttachementPopupCallback = function (e) {
            $scope.actionAttachementPopup = false;
            $scope.actionPopup = true;
        };


    } else if ($scope.docType === "project" || $scope.Pagefor === "manage" && $scope.docType === "project") {
        $scope.getURLPath = 'shared/landingPage/models/project_data.json';
        $scope.setModalIcon = '#icon_LpWorkQ';
        $scope.isListView = true;
        $scope.scannedImg = false;
    } else if ($scope.docType === "invoice" || $scope.Pagefor === "manage" && $scope.docType === "invoice") {
        $scope.getURLPath = 'shared/landingPage/models/invoice_data.json';
        blankpagelink = 'p2p.inv.create';
        setLinkforTemplate = 'invoice';
        $scope.scannedImg = false;
        $scope.isListView = true;
    } else if ($scope.docType === "selectInvoice") {
        $scope.getURLPath = 'shared/landingPage/models/selectInvoice_data.json';
        blankpagelink = 'p2p.ir.basicDetails';
        setLinkforTemplate = 'selectInvoice';
        $scope.scannedImg = false;
        $scope.isListView = true;
    } else if ($scope.docType === "contract" || $scope.docType === "contractUploading" || $scope.docType === "blanket") {
        if ($scope.docType === "blanket") {
            $scope.getURLPath = 'contract/models/blanket_task_data.json ';
        }
        else { $scope.getURLPath = 'contract/models/contract_task_data.json'; }
        $scope.isContract = true;
        $scope.isListView = true;
        if ($scope.docType === "contractUploading") {
            $scope.isUploadStatus = true;
            $scope.docType = "contract"
            $scope.scannedImg = false;
            $scope.isUploadStatus = true;
            $scope.isApplyFilters = true;
            $scope.isContractUploading = true;
        }
    } else if ($scope.Pagefor === "task") {
        if ($scope.docType == "Drafts") {
            $scope.getURLPath = 'shared/landingPage/models/FollowUp.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "pendingacceptance") {
            $scope.getURLPath = 'shared/landingPage/models/pendingacceptance.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "FollowUp") {
            $scope.getURLPath = 'shared/landingPage/models/FollowUp.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "unprocessed requisitions") {
            $scope.getURLPath = 'shared/landingPage/models/FollowUp.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "Awarding") {
            $scope.getURLPath = 'shared/landingPage/models/Awarding.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "Approved") {
            $scope.getURLPath = 'shared/landingPage/models/FollowUp.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "Awarded") {
            $scope.getURLPath = 'shared/landingPage/models/Awarding.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "ApprovalPending") {
            $scope.getURLPath = 'shared/landingPage/models/pendingApproval.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            
            $scope.approval = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "Closed") {
            $scope.getURLPath = 'shared/landingPage/models/FollowUp.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
        else if ($scope.docType == "ScoringInProgress") {
            $scope.getURLPath = 'shared/landingPage/models/FollowUp.json';
            $scope.setModalIcon = '#icon_LpWorkQ';
            $scope.isListView = true;
            $scope.scannedImg = false;
        }
    } else if ($scope.Pagefor === "search") {
        $scope.getURLPath = 'shared/landingPage/models/task_data.json';
        $scope.isListView = true;
        $scope.scannedImg = false;
    } else if ($scope.docType === "myrequisitions") {
        $scope.getURLPath = 'shared/landingPage/models/requsition_data.json';
        $scope.docType = 'MY REQUISITIONS';
        $scope.scannedImg = false;
    } else if (docTypSup[0] === "supplierprofile") {
        $scope.getURLPath = 'shared/landingPage/models/requsition_data.json';
        $scope.docType = docTypSup[1] + " documents";
        $scope.setModalIcon = '#icon_Supplier';
        $scope.scannedImg = false;
    } else if ($scope.docType === "invoiceReconciliation") {
        $scope.isIR = true;
        $scope.getURLPath = 'p2p/ir/models/ir_data.json';
        $scope.isListView = true;
        $scope.docType = "INVOICE RECONCILIATION";
        $scope.scannedImg = false;
    } else if ($scope.docType === "catalog") {
        $scope.getURLPath = 'catalog/adminCatalog/models/sup_catalog_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_Catalog';
        $scope.scannedImg = false;
    } else if ($scope.docType === "invoiceExcel") {
        $scope.getURLPath = 'shared/landingPage/models/invoice_excel_data.json';
        $scope.isListView = true;
        $scope.scannedImg = false;
        $rootScope.onPage = "manageInvoiceExcel";
    } else if ($scope.docType === "RFX") {
        $scope.getURLPath = 'shared/landingPage/models/rfx_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_RFX';
        $scope.scannedImg = false;
        $scope.rfxView = true;
    } else if ($scope.docType === "scannedInvoice") {
        $scope.isIR = true;
        $scope.getURLPath = 'p2p/inv/models/scannedInv.json';
        $scope.isListView = true;
        $scope.docType = "SCANNED INVOICE";
        $scope.scannedImg = true;
        $scope.hideSidePanelFilter = false;
    } else if ($scope.docType === "asn" || $scope.Pagefor === "manage" && $scope.docType === "asn") {
        $scope.getURLPath = 'p2p/asn/models/asn_data.json';
        blankpagelink = 'p2p.asn.new';
        setLinkforTemplate = 'asn';
        $scope.scannedImg = false;
    } else if ($scope.docType === "recent_documents") {
        $scope.getURLPath = 'shared/landingPage/models/recent_docuements_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_Recent_Documents';
        $scope.scannedImg = false;
    } else if ($scope.docType === "recentdocuments_documents") {
        $scope.getURLPath = 'shared/landingPage/models/recentdocuments_documents_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_Recent_Documents';
        $scope.scannedImg = false;
    } else if ($scope.docType === "SHOULD COST ANALYSIS") {
        $scope.getURLPath = 'shared/landingPage/models/rfx_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_RFX';
        $scope.scannedImg = false;
        $scope.rfxView = true;
    } else if ($scope.docType === "recentdocuments_templates") {
        $scope.getURLPath = 'shared/landingPage/models/recentdocuments_templates_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_Recent_Documents';
        $scope.scannedImg = false;
    } else if ($scope.docType === "asn_documents") {
        $scope.getURLPath = 'shared/landingPage/models/asn_documents_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_RfxReq';
        $scope.scannedImg = false;
    } else if ($scope.docType === "asn_templates") {
        $scope.getURLPath = 'shared/landingPage/models/asn_templates_data.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_RfxReq';
        $scope.scannedImg = false;
    }
    else if ($scope.docType === "spend_reports" && $scope.Pagefor === "analyze") {
    	$scope.getURLPath = 'shared/landingPage/models/spend_reports_data.json';
    	$scope.isListView = false;
    	$scope.setModalIcon = '#icon_Report';
    	$scope.scannedImg = false;
        $scope.showCheckBox = true;
        $scope.showOnlyIcons = true;
    	$scope.exportActions = [
		{
			'key': 'Export to Excel'
		},
        {
        	'key': 'Export to PDF'
        },
        {
        	'key': 'Share via email'
        }
    	];
    }
    else if ($scope.Pagefor === "manage" && $scope.docType === "procProfile") {
        $scope.getURLPath = 'p2p/procurementProfile/models/procProfileTemplate.json';
        $scope.isListView = true;
        $scope.setModalIcon = '#icon_RfxReq';
        $scope.scannedImg = false;
    }
    else if ($scope.docType === "receipt" || $scope.Pagefor === "manage" && $scope.docType === "receipt") {
        $scope.getURLPath = 'shared/landingPage/models/receipt_data.json';
        $scope.scannedImg = false;
    }
    else {
        // defualt link
        $scope.getURLPath = 'shared/landingPage/models/requsition_data.json';
        $scope.scannedImg = false;
    }

    $scope.createFromBlank = function () {
        switch ($state.params.doctype) {
            case "invoiceReconciliation":
                $state.go('p2p.ir.new');
                break;
            case "invoice":
                $state.go('p2p.inv.create');
                break;
            default:
                return false;
                break;
        }
    };

    $scope.isUploadinginProgess = true;

    $timeout(function () {
        $scope.isUploadinginProgess = false;
        $scope.isUploadingDone = true;
    }, 6000)



    $scope.getTemplateLink = setLinkforTemplate;
    $scope.blankPagelink = blankpagelink;

    var getRespond = {
        method: 'GET',
        url: $scope.getURLPath
    };



    $http(getRespond).then(function (response) {
        $scope.doclists = response.data.datalist;
        $scope.AllReqData = $scope.doclists;
        $scope.dataLength = $scope.doclists.length;

        if ($scope.docType === "spend_reports") {
        	$scope.filteredData = [];
            $scope.filteredMyReportData = [];
        	for (var i = 0; i < $scope.doclists.length; i++) {
        	
                if ($scope.doclists[i].reportType == 'sharedReports') {
        			$scope.filteredData.push($scope.doclists[i]);
        		}
                if ($scope.doclists[i].reportType == 'myReports') {
        			$scope.filteredMyReportData.push($scope.doclists[i]);
        		}
        	}
            $scope.myReportdataLength = $scope.filteredMyReportData.length;
        	$scope.doclists = $scope.filteredData;
        	$scope.dataLength = $scope.doclists.length;
        }

        setFilterList();
        $scope.listViewlists = response.data.listViewlists;
        if (docTypSup[0] === "supplier" && docTypSup[1]) {
            $scope.doclists[0].docName = docTypSup[1];
            $scope.doclists[0].docStatus = 'Invited';
            Materialize.toast('Your invitation has been sent', 2000);
        }

        $scope.tabsData = [];
        if (!$scope.approval && $scope.docType !== "spend_reports") {
            $scope.tabsData = [{
                "title": 'DOCUMENT VIEW',
                "contentUrl": "shared/landingPage/views/documentViewTemp.html",
                "active": true,
                "tabId": 0,     
            }, {
                "title": 'LINE VIEW',
                "contentUrl": "shared/landingPage/views/documentViewTemp.html",
                "tabId": 1,
            }]
        } else if(!$scope.isListView){
            $scope.showCount = true;
            $scope.tabsData = [{
                "title": 'SHARED REPORTS',
                "contentUrl": "shared/landingPage/views/documentViewTemp.html",
                "tabId": 1,
                "active": true,
                "type":'sharedReports',
                "dataLength": $scope.dataLength 
            },{
                "title": 'MY REPORTS',
                "contentUrl": "shared/landingPage/views/documentViewTemp.html",
                "tabId": 0,
                "type":'myReports',
                "dataLength":$scope.myReportdataLength
            }]
        } else {
            $scope.tabsData = [{
                "title": 'MY TASKS',
                "contentUrl": "shared/landingPage/views/documentViewTemp.html",
                "active": true,
                "tabId": 0
            }, {
                "title": 'BACK-UP TASKS',
                "contentUrl": "shared/landingPage/views/documentViewTemp.html",
                "tabId": 1
            }];
        };

        }, function (error) {
            // console.log(JSON.stringify(error));
        });

    function setFilterList() {
        for (var i = 0; i < $scope.landingFilterList.length; i++) {
            var countStatus = 0;
            if ($scope.Pagefor === "task") {
                for (var j = 0; j < $scope.doclists.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.doclists[j].docType) {
                        countStatus++;
                    }
                }
            } else if ($scope.docType === "recent_documents") {
                for (var j = 0; j < $scope.doclists.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.doclists[j].docType) {
                        countStatus++;
                    }
                }
            }
            else if ($scope.docType === "spend_reports") {
                for (var j = 0; j < $scope.filteredData.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.filteredData[j].group) {
                        countStatus++;
                    }
                }
            }
            else {
                for (var j = 0; j < $scope.doclists.length; j++) {
                    if ($scope.landingFilterList[i].filterBy == $scope.doclists[j].docStatus) {
                        countStatus++;
                    }
                }
            }
            $scope.landingFilterList[i].itemCount = countStatus;
            $scope.landingFilterList[i].isSelected = false;
            $scope.isAllFilterSelected = true;
            if (countStatus > 99) {
                $scope.landingFilterList[i].itemCount = '99+';
            }
        }
    }

    if (docTypSup[0] == 'supplier') {
        $scope.docTypeText = "SUPPLIER";
    }
    // popup -- trackstatus
    $scope.trackStatusPopup = false;
    $scope.trackStatusPopupCallback = function (e) {
        $scope.trackStatusPopup = true;
    };
    $scope.trackStatusOnHideCallback = function (e) {
        $scope.trackStatusPopup = false;
    };
    
    // popup -- show errors
    $scope.showErrorPopup = false;
    $scope.showErrorPopupCallback = function () {
        $scope.showErrorPopup = true;
    }

    $scope.hideErrorPopupCallback = function () {
        $scope.showErrorPopup = false;
    }

    $scope.actionSelectedCallback = function (ele, index, item) {
        var buttonType = ele.key;
        switch (buttonType) {
            case 'Edit':
                if ($scope.doclists[index].docLink === 'supplier.profile') {
                    $state.go($scope.doclists[index].docLink, { pagefor: $scope.doclists[index].docName, status: $scope.doclists[index].docStatus });
                } else {
                    $state.go($scope.doclists[index].docLink);
                }
                break;
            case 'View documents':
                if ($scope.doclists[index].docLink === 'supplier.profile') {
                    $state.go('expandedLandingList', { doctype: 'supplierprofileSPN-' + $scope.doclists[index].docName, pagefor: '', status: $scope.doclists[index].docStatus })
                } else {
                    $state.go($scope.doclists[index].docLink);
                }
                break;
            case 'Close':
                return false;
                break;
            case 'Delete':
                return $scope.deleteItem(index);
                break;
            case 'Buy Against Blanket':
                return $state.go("catalog.requestercatalog.landing", {blanket: item.docName});
                break;
            case 'View Summary':
                return $state.go("contract.summary");
                break;
            case 'Export':
                return $scope.showExportPopupCallback();
                break;
            case 'Create Receipt':
                $state.go('p2p.receipt.new');
                break;
            case 'Create Invoice':
                $state.go('p2p.inv.create');
                break;
            case 'Track Status':
                return $scope.trackStatusPopup = true;
                break;
            case 'Create Asn':
                $state.go('p2p.asn.new');
                break;
            case 'Upload Scanned Documents':
                uploadPopupCallback('uploadDoc');
                break;
            case 'Upload Updated Excel':
                uploadPopupCallback('uploadExcel');
                break;
            case 'Share':
                if (($scope.docType == 'spend_reports') && ($scope.Pagefor == 'analyze')) {
                   return $scope.showShareReportPopupCallback();
                }
				if($scope.docType == 'procProfile')
					return $scope.showShareWithPopupFunc();
                break;
            case 'Duplicate', 'Copy':
                    $state.go($scope.doclists[index].docLink);
                break;
        }
    }

        //start search icon functionality on share report popup
        this.showSearch = function () {
            this.isActiveSearch = true;
            this.focusSearch = true;
            this.showMe = true;
            this.hideClose = true;
        };
        $scope.vm.hideSearch = function () {
            this.isActiveSearch = false;
            this.focusSearch = false;
            this.showMe = false;
            this.hideClose = false;
        };
        this.showSearchData = function () {
            this.isActiveSearchData = true;
            this.focusSearchData = true;
            this.showMeData = true;
            this.hideCloseData = true;
        };
        this.hideSearchData = function () {
            this.isActiveSearchData = false;
            this.focusSearchData = false;
            this.showMeData = false;
            this.hideCloseData = false;
        };
       //end search icon functionality on share report popup

      //open share via email popup
        $scope.showShareReportPopupCallback = function () {
            $scope.showShareReportPopup = true;
            $scope.vm.isLoading = true;
            $timeout(function(){
                $scope.vm.isLoading = false;
            }, 1500);
            $scope.vm.selectAllShareReportCheckbox = false;
            $scope.vm.isShareReportPartiallySelected = false; 
            $scope.vm.searchinList = ''; 
            $scope.vm.hideSearch();
        }

        $scope.hideShareReportPopupCallback = function () { 
            $scope.showShareReportPopup = false;
        }
        //end share via email popup

         //add new share report popup
        this.addNewShareReport = function () {
            $scope.showShareReportPopup = false;
            this.searchinList = ''; 
            this.hideSearch();
            $scope.addNewShareReportPopup = true;
            this.selectAllCheckbox = false;
            $scope.vm.isPartiallySelected = false; 
            $scope.vm.shareNewData = _.filter($scope.vm.shareNewData, function(data){ 
                if(data.isChecked == false){
                    return data;
                }
            }); 
            $scope.vm.isLoadingData = true;
            $timeout(function(){
                $scope.vm.isLoadingData = false;
            }, 1500);
        }
    
        //delete share popup data 
        this.deleteshareData = function (data,index) {
             var checkedIndex = _.findIndex(function (x) {
                return x.name == data.name;
             });
            data.isChecked = false;
            this.shareNewData.push(data);
            this.shareReportData.splice(index,1);  
        }
 
        //on change of checkbox for enable/disable share button
        this.checkReportData = function(value,key){
            $scope.checkedArray = [];
            $scope.checkedArray  = _.filter(this.shareNewData, function(data){ 
                if(data.isChecked == true){
                    $scope.vm.isPartiallySelected = true; 
                    return data;
                }
             }); 
            $scope.vm.checkedArrayLength = $scope.checkedArray.length;
            if($scope.vm.checkedArrayLength == 0){
                $scope.vm.disableShareButton = true;
                $scope.vm.isPartiallySelected = false;
                $scope.vm.checkedArrayLength = 0;
                this.selectAllCheckbox = false;   
            } else {
                if($scope.vm.checkedArrayLength == this.shareNewData.length){
                  $scope.vm.isPartiallySelected = false;               
                  this.selectAllCheckbox = true;
                  this.selectAll(this.selectAllCheckbox);  
                }
                $scope.vm.disableShareButton = false;
            }
        }

       //hide add new share report popup
        $scope.vm.hideAddNewShareReportPopupCallback = function(checkedData){
            _.filter(checkedData, function(data){ 
             if(data.isChecked == true){
                data.isChecked = false;
                return data; 
              }
            });
            $scope.vm.checkedArrayLength = 0;
            $scope.vm.disableShareButton = true;
            this.selectAllCheckbox = false;     
            $scope.addNewShareReportPopup = false;
            $timeout(function(){
               $scope.showShareReportPopup = true;
            }, 0);
            $scope.vm.isLoading = true;
            $timeout(function(){
                $scope.vm.isLoading = false;
            }, 1500);
        }

        //preventing shareable link to redirect
        this.clickShareableLink = function(e){
            e.preventDefault();
        }

         //share button functionality share report popup
         this.shareData = function (checkedData) {
            var checkedArray = _.filter(checkedData, function(data){ 
                if(data.isChecked == true){
                    return data;
                }
            });
             _.filter(checkedData, function(item){ 
                for (ind = 0; ind < checkedData.length; ind++) {
                    if(checkedData[ind].isChecked){
                        checkedData[ind].isChecked = false;
                        checkedData.splice(ind,1);
                    }  
                }    
            });
            
            var checkedArrayLength = checkedArray.length;
            this.shareReportData = this.shareReportData.concat(checkedArray);
            $scope.vm.checkedArrayLength = 0;
            $scope.vm.disableShareButton = true;       
            $scope.addNewShareReportPopup = false;
            if(checkedArrayLength > 0){
                Materialize.toast("Report shared with selected members", 3000);
            }
            $timeout(function(){
                 $scope.showShareReportPopup = true;
            }, 0);
            $scope.vm.isLoading = true;
            $timeout(function(){
                $scope.vm.isLoading = false;
            }, 1500);
         };
           
           //if select all is checked
           this.selectAll = function(selectAllCheckboxData){
                if(selectAllCheckboxData || $scope.vm.isPartiallySelected) {
                    $scope.vm.isPartiallySelected = false;
                    this.selectAllCheckbox = true;
                    this.selectedData = _.filter(this.shareNewData, function(data){ 
                        data.isChecked = true;
                        $scope.vm.disableShareButton = false;
                        return data;     
                    });
                    $scope.vm.checkedArrayLength = this.selectedData.length;
                } else {
                    $scope.vm.isPartiallySelected = false;
                     _.filter(this.shareNewData, function(data){
                        data.isChecked = false;
                        $scope.vm.disableShareButton = true; 
                        return data;  
                    });
                    $scope.vm.checkedArrayLength = 0;
                }              
           }

         //go back from add new share popup if report is shared with all members
         this.backAddNewShareReportPopupCallback = function(){
            $scope.addNewShareReportPopup = false;
            $timeout(function(){
               $scope.showShareReportPopup = true;
            }, 0);
            $scope.vm.isLoading = true;
            $timeout(function(){
                $scope.vm.isLoading = false;
            }, 1500);
          }
        

        //on change of checkbox for enable/disable share report popup
        this.checkShareReportData = function(value,key){
            $scope.checkedShareReportArray = [];
            $scope.checkedShareReportArray  = _.filter(this.shareReportData, function(data){ 
                if(data.isChecked == true){
                    $scope.vm.isShareReportPartiallySelected = true; 
                    return data;
                }
             }); 
            $scope.vm.checkedShareReportArrayLength = $scope.checkedShareReportArray.length;
            if($scope.vm.checkedShareReportArrayLength == 0){
                $scope.vm.disableUnShareIcon = true;
                $scope.vm.isShareReportPartiallySelected = false;
                $scope.vm.checkedShareReportArrayLength = 0;
                $scope.vm.selectAllShareReportCheckbox = false;   
            } else {
                if($scope.vm.checkedShareReportArrayLength == this.shareReportData.length){
                  $scope.vm.isShareReportPartiallySelected = false;               
                  $scope.vm.selectAllShareReportCheckbox = true;
                  this.selectShareReportAll($scope.vm.selectAllShareReportCheckbox);  
                }
                $scope.vm.disableUnShareIcon = false;
            }
        }

         //if select all share report is checked
          this.selectShareReportAll = function(selectAllShareReportCheckbox){
                if(selectAllShareReportCheckbox || $scope.vm.isShareReportPartiallySelected) {
                    $scope.vm.isShareReportPartiallySelected = false;
                    this.selectAllShareReportCheckbox = true;
                    this.selectedShareReportData = _.filter(this.shareReportData, function(data){ 
                        data.isChecked = true;
                        $scope.vm.disableUnShareIcon = false;
                        return data;     
                    });
                    $scope.vm.checkedShareReportArrayLength = this.selectedShareReportData.length;
                } else {
                    $scope.vm.isShareReportPartiallySelected = false;
                    _.filter(this.shareReportData, function(data){
                        data.isChecked = false;
                        $scope.vm.disableUnShareIcon = true;
                        return data;  
                    });
                    
                    $scope.vm.checkedShareReportArrayLength = 0;
                }              
           }

           
         //delete unshare popup data 
           this.unShareReportData = function (checkedShareReportData,index,isDisabledUnshare) {   
            if(!isDisabledUnshare){
             $scope.showShareReportPopup = false;
             var unShareReportDeleteConfirmation = {
                type: "confirm",
                message: "Selected members will no longer have access to this report. Do you want to proceed?",
                buttons: [
                        { "title": "YES", "result": "yes" },
                        { "title": "NO", "result": "no" }
                ]
               };
               notification.notify(unShareReportDeleteConfirmation, function (response) {
                   $scope.showShareReportPopup = true;
                   $scope.vm.isLoading = true;
                   $timeout(function(){
                        $scope.vm.isLoading = false;
                    }, 1500);
                   if (response.result == 'yes') {
                     var checkedUnShareArray = _.filter(checkedShareReportData, function(data,index){ 
                        if(data.isChecked == true){
                            return data;
                        }
                    });
                     _.filter(checkedShareReportData, function(item,index){                       
                        for (ind = 0; ind < checkedShareReportData.length; ind++) {
                            if(checkedShareReportData[ind].isChecked){
                                checkedShareReportData[ind].isChecked = false;
                                checkedShareReportData.splice(ind,1);
                            }
                        }    
                     });
                    $scope.vm.checkedShareReportArrayLength = checkedUnShareArray.length;
                    $scope.vm.shareNewData = $scope.vm.shareNewData.concat(checkedUnShareArray);                   
                    $scope.vm.isShareReportPartiallySelected = false; 
                    $scope.vm.selectAllShareReportCheckbox = false;
                    $scope.vm.disableUnShareIcon = true; 
                    if($scope.vm.checkedShareReportArrayLength > 0){
                        Materialize.toast("Report is no more shared with selected </br> members", 3000);
                    }
                    $scope.vm.checkedShareReportArrayLength  = 0;
                }});
             }                  
        }


    $scope.PoNumberConfPopup = false;
    $scope.createInvoiceFromScan = false;
    $scope.isPoNumberPopupOpen = false;

    $scope.createInvFromScanned = function (parentIndex) {
        $scope.createInvoiceFromScan = true
        $scope.previewCurrentScannedInvoice(parentIndex);
        $scope.PoNumberConfCallback();

    }

    $scope.PoNumberConfCallback = function (e) {

        $scope.PoNumberConfPopup = true;
        $scope.isPoNumberPopupOpen = true

        $scope.$emit('hideheader', { condition: true });

    };
    $scope.PoNumberConfPopupHideCallback = function (e) {
        if ($scope.createInvoiceFromScan) {
            $scope.gotoBackscannedInvoiceList();
            $scope.createInvoiceFromScan = false;
        };

        $scope.isPoNumberPopupOpen = false;
        $scope.PoNumberConfPopup = false;

        $rootScope.$emit('hideheader', { condition: false });

    };

    $scope.$on('model.close', function (event, args) {
        if (args.goToNext == true) {
            $scope.createInvoiceFromScan = false;
            $scope.isPoNumberPopupOpen = false;
        } else if (args.goToNext == false && $scope.createInvoiceFromScan == true) {
            $scope.gotoBackscannedInvoiceList();
            $scope.createInvoiceFromScan = false;
            $scope.isPoNumberPopupOpen = false;
        };

        $scope.PoNumberConfPopup = args.model;

    });

    $scope.applyAction = function (index, item, parentIndex) {
        if (item.UserRight) {
            switch (item.key) {
                case 'delete':
                    $scope.deleteItem(index);
                    break;
                case 'create':
                    $scope.createInvFromScanned(parentIndex);
                    break;
                default:
                    // statements_def
                    break;
            }
        }

    };


    $scope.getActionIcon = function (item) {

        switch (item) {
            case 'delete':
                return '#icon_TrashCan';
                break;
            case 'create':
                return '#icon_CreateBlank';
                break;
            default:
                // statements_def
                break;
        }
    };




    $scope.deleteItem = function (index) {
        var deleteConfig = {
            type: "confirm",
            message: "Do you want to delete current item?",
            buttons: [
            {
                "title": "YES",
                "result": true
            },
            {
                "title": "NO",
                "result": false
            }
            ]
        },

        alertmsg = {
            type: "success",
            message: "Item Deleted Successfully",
            buttons: [
            {
                "title": "Ok"
            }
            ]
        };


        notification.notify(deleteConfig, function (response) {
            if (response.result) {
                $scope.doclists.splice(index, 1);
                $timeout(function () {
                    notification.notify(alertmsg);
                })
               
            }
        });
    };

    $scope.getStatusColor = function (ele) {
        switch (ele) {
            /*status related to pending*/
            case 'Draft':
            case 'waitlisted':
            case 'Invited':
            case 'Partial Receipt':
            case 'Pending':
            case 'Approval Required':
            case 'Amendment in progress':
            case 'In Progress':
            case 'Approval Pending':
            case 'INACTIVE':
                return 'pending-status-text';
                break;

            /*status related to error*/ 
            case 'Disqualified':
            case 'Exception':
            case 'Error':
            case 'Failed':
            case 'Draft Withdrawn':
            case 'Rejected':
                return 'error-status-text';
                break;
            
            /*status related to success*/ 
            case 'Submitted':
            case 'Approved':
            case 'Identified':
            case 'Matched':
            case 'Published':
            case 'Live':
            case 'Invoice Paid With Remittance':
            case 'Draft Co-Authoring':
            case 'Success':
            case 'Proccessed with Errors':
            case 'Sent to Partner':
            case 'Registered':
            case 'Executed':
            case 'ACTIVE':
                return 'success-status-text';
                break;

           /*status related to not available*/      
            default:
                return 'notAvailable-status-text';

        }
    };

    $scope.setValue = function (ele) {
        var elem = ele.toLowerCase();
        switch (elem) {
            case 'rfx':
                return '#icon_RFX';
                break;
            case 'requisition':
                return '#icon_Requisition';
                break;
            case 'ideation':
                return '#icon_Ideation';
                break;
            case 'executed':
            case 'execution':
                return '#icon_Execution';
                break;
            case 'realization':
                return '#icon_Realisation';
                break;
            case 'contract':
                return '#icon_Contract';
                break;
            case 'order':
                return '#icon_Order';
                break;
            case 'supplier':
                return '#icon_Supplier';
                break;
            case 'invoiceReconciliation':
                return '#icon_invRecon';
                break;
            case 'select invoice':
                return '#icon_invRecon';
                break;
            case 'scanned_image':
                return '{{item.itemImage}}';
                //return '#icon_invRecon';
                break;
            case 'catalog':
                return '#icon_Catalog';
                break;
            case 'project':
                return '#icon_projects';
                break;
            case 'punchout':
                return '#icon_PunchOut';
                break;
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
            case 'active':
                return '#icon_Active';
            case 'inactive':
                return '#icon_Inactive';
            default:
                return false;

        }

    };

    $scope.listDisplayConfig = {
        "showIcon": true, "showAction": true, "importantAttribLimit": 2
    };
    $scope.selectedTab = 1;
        
    $scope.gotoCreateBlanket = function () {
        $state.go("contract.new", { mode: 'blanket' });
    }


    $scope.ShowCheckboxs = false;

    //selected current    
    function checkArrayValue() {
        var flag = false;
        for (var i = 0; i < $scope.doclists.length; i++) {

            if ($scope.doclists[i].isdocSelected == true) {
                flag = true;
                break;
            } else {

                flag = false;
            }
            return flag
        }


    };

    function getSelectedCount() {

        return $scope.doclists.filter(function (el) { return el.isdocSelected == true }).length;

    }
    $scope.docCheck = function (selected, total) {
        if (selected > 0) {
            $scope.ShowCheckboxs = true;
        }
        else {
            $scope.ShowCheckboxs = false;
        }
    }

    $scope.compareGraph =function() {
        $state.go('compare');
    }

    $scope.ifMoreThanFive = false;
    $scope.selectCurrent = function (currentValue, getCurrentIndex) {
        $scope.doclists[getCurrentIndex].isdocSelected = currentValue;
        if (getSelectedCount() > 0) {
            $scope.ShowCheckboxs = true;
            $scope.isDisabled = false;
            $scope.fillpartial = true;
        }
        else {
            $scope.ShowCheckboxs = false;
        }

        if (getSelectedCount() >= 2) {
            $scope.ifMoreThanFive = false;
        } else {
            $scope.ifMoreThanFive = true;
        }

        //else if (currentValue == false && checkArrayValue() == false) {
        //    $scope.ShowCheckboxs = false;

        //}
    };
    $scope.languageOptions = [{ "code": "zh-CHS", "name": "Chinese(Simplified)" }, { "code": "cs-CZ", "name": "Czech" }, { "code": "da-DK", "name": "Danish" }, { "code": "en-US", "name": "English" }, { "code": "fr-FR", "name": "French" }, { "code": "de-DE", "name": "German" }, { "code": "it-IT", "name": "Italian" }, { "code": "ja-JP", "name": "Japanese" }, { "code": "ko-KR", "name": "Korean" }, { "code": "pl-PL", "name": "Polish" }, { "code": "pt-BR", "name": "Portuguese(Brazilian)" }, { "code": "ru-RU", "name": "Russian" }, { "code": "es-ES", "name": "Spanish" }, { "code": "sv-SE", "name": "Swedish" }, { "code": "th-TH", "name": "Thai" }];
    $scope.languageSelected = { "code": "en-US", "name": "English" };
   
    $scope.emailToOpts = [
        { "UserName": "renju.mathew@gep.com" },
        { "UserName": "ayyappakumar.thevar@gep.com" },
        { "UserName": "shailesh.sawant@gep.com" },
        { "UserName": "sachin.kurkute@gep.com" },
        { "UserName": "kabir.roy@gep.com" },
        { "UserName": "joel.almeida@gep.com" },
        { "UserName": "abhishek.kadam@gep.com" },
        { "UserName": "naushad.shaikh@gep.com" }
    ];
    $scope.emailCcOpts = [
		{ "UserName": "rahul.yadav@gep.com" },
		{ "UserName": "gaurav.jathar@gep.com" },
		{ "UserName": "godwin.anand@gep.com" },
		{ "UserName": "manish.vishwakarma@gep.com" },
		{ "UserName": "mayur.dalal@gep.com" },
		{ "UserName": "mayur.gadekar@gep.com" },
		{ "UserName": "muthu.vijaiyan@gep.com" },
		{ "UserName": "nandini.barve@gep.com" },
		{ "UserName": "prajakta.vadgaonkar@gep.com" },
		{ "UserName": "rahul.nirbhawane@gep.com" },
		{ "UserName": "reshma.kautkar@gep.com" }
    ];
    $scope.emailToPreSelect = [
        { "UserName": "renju.mathew@gep.com" },
		{ "UserName": "ayyappakumar.thevar@gep.com" },
        { "UserName": "renju.mathew@gep.com" },
        { "UserName": "ayyappakumar.thevar@gep.com" },
        { "UserName": "shailesh.sawant@gep.com" },
        { "UserName": "sachin.kurkute@gep.com" },
        { "UserName": "kabir.roy@gep.com" },
        { "UserName": "joel.almeida@gep.com" },
        { "UserName": "abhishek.kadam@gep.com" },
        { "UserName": "naushad.shaikh@gep.com" }
    ];
    $scope.emailCcPreSelect = [
        { "UserName": "mayur.dalal@gep.com" },
		{ "UserName": "mayur.gadekar@gep.com" },
        { "UserName": "mayur.dalal@gep.com" },
		{ "UserName": "mayur.gadekar@gep.com" },
		{ "UserName": "muthu.vijaiyan@gep.com" },
		{ "UserName": "nandini.barve@gep.com" },
		{ "UserName": "prajakta.vadgaonkar@gep.com" },
		{ "UserName": "rahul.nirbhawane@gep.com" },
		{ "UserName": "reshma.kautkar@gep.com" },
        { "UserName": "godwin.anand@gep.com" }
    ];

    /*Supplier email popup start*/
    $scope.notificationNew1 = { "notifyTo": "abc.admin@gep.com" }
    $scope.showSupplierEmail = false;
    $scope.supEmailPopup = false;
    $scope.showSupplierEmailPopup = function (title) {
        $scope.supEmailPopup = true;
        $scope.showSupplierEmail = true;
        $scope.resetSupEMailPopupData();
        if (title == 'broadcast') {
            $scope.popupTitle = "EMAIL BROADCAST";
            $scope.hideCCField = true;
            $scope.showInvSecContact = true;
            $scope.showLanguageDD = false;
        }
        else if (title == 'prf') {
            $scope.popupTitle = "SEND PRIMARY REGISTRATION FORM";
            $scope.showInvSecContact = false;
            $scope.showLanguageDD = true;
            $scope.hideCCField = false;
        }
        else if (title = 'profileUpdate') {
            $scope.popupTitle = "PROFILE UPDATE REQUEST";
            $scope.showInvSecContact = false;
            $scope.showLanguageDD = true;
            $scope.hideCCField = false;
        }
    };
    $scope.supplierEmailPopupOnHideCallback = function (e) {
        $scope.supEmailPopup = false;
        $scope.resetSupEMailPopupData();
        $scope.showSupplierEmail = false;
    };

    $scope.supplierAttachementPopup = false;
    $scope.showSupAttachmentPopup = function (e) {
        $scope.supplierAttachementPopup = true;
        $scope.showSupplierEmail = false;
    };
    $scope.hideSupAttachmentPopup = function (e) {
        $scope.supplierAttachementPopup = false;
        $scope.showSupplierEmail = true;
    };

    $scope.sendSupEMail = function(){
        if($scope.notificationNew1.notifySub == ""){
            var config = {
                type: "warning",
                message: "<div class='left-align'>Do you want to send this message without a subject?</div>",
                buttons:
                    [
                        { "title": "Don't send", "result": "no" },
                        { "title": "Send anyway", "result": "yes" }

                    ]
            }
            notification.notify(config, function (response) {
                if (response.result == 'yes') {
                    $scope.supplierEmailPopupOnHideCallback();
                    Materialize.toast('Message has been sent successfully', 2000);
                }
                else{
                    return false;
                }
            });
        }
        else{
            $scope.supplierEmailPopupOnHideCallback();
            Materialize.toast('Message has been sent successfully', 2000);
        }
    }
    $scope.languageSelected = { "code": "en-US", "name": "English" };
    $scope.resetSupEMailPopupData = function(){
        $scope.emailToPreSelect = [
           { "UserName": "renju.mathew@gep.com" },
           { "UserName": "ayyappakumar.thevar@gep.com" },
           { "UserName": "renju.mathew@gep.com" },
           { "UserName": "ayyappakumar.thevar@gep.com" },
           { "UserName": "shailesh.sawant@gep.com" },
           { "UserName": "sachin.kurkute@gep.com" },
           { "UserName": "kabir.roy@gep.com" },
           { "UserName": "joel.almeida@gep.com" },
           { "UserName": "abhishek.kadam@gep.com" },
           { "UserName": "naushad.shaikh@gep.com" }
           ];
           $scope.emailCcPreSelect = [
               { "UserName": "mayur.dalal@gep.com" },
               { "UserName": "mayur.gadekar@gep.com" },
               { "UserName": "mayur.dalal@gep.com" },
               { "UserName": "mayur.gadekar@gep.com" },
               { "UserName": "muthu.vijaiyan@gep.com" },
               { "UserName": "nandini.barve@gep.com" },
               { "UserName": "prajakta.vadgaonkar@gep.com" },
               { "UserName": "rahul.nirbhawane@gep.com" },
               { "UserName": "reshma.kautkar@gep.com" },
               { "UserName": "godwin.anand@gep.com" }
           ];
           $scope.languageSelected = { "code": "en-US", "name": "English" };
           $scope.notificationNew1 = { "notifySub": "" }
   }
    /*Supplier email popup end*/

    $scope.triggerAction = function (getkeyName) {
        // console.log(getkeyName);
        switch (getkeyName) {
            case 'Create ASN':
                $state.go('p2p.asn.new');
                break;
            case 'Assign':
                $scope.assignPopupCallback('Assign');
                break;
            case 'Broadcast':
                $scope.actionPopupCallback('EMAIL BROADCAST');
                break;
            case 'Send PRF':
                $scope.actionPopupCallback('INVITE SUPPLIER');
                break;
            case 'Send Additional Forms':
                $scope.showAdditionalForm();
                break;
            case 'Request for profile update':
                $scope.actionPopupCallback('REQUEST FOR PROFILE UPDATE');
                break;
            default:
                break;
        }
    }
    $scope.emailPopupAction = function (getkeyName) {
        switch (getkeyName) {
            case 'Broadcast':
                $scope.showSupplierEmailPopup('broadcast');
                $scope.hideCCField = true;
                $scope.showInvSecContact = true;
                $scope.showLanguageDD = false;
                break;
            case 'Send PRF':
                $scope.showSupplierEmailPopup('prf');
                $scope.showInvSecContact = false;
                $scope.showLanguageDD = true;
                $scope.hideCCField = false;
                break;
            case 'Send Additional Forms':
                $scope.showAdditionalForm();
                break;
            case 'Request for profile update':
                $scope.showSupplierEmailPopup('profileUpdate');
                $scope.showInvSecContact = false;
                $scope.showLanguageDD = true;
                $scope.hideCCField = false;
                break;
            default:
                break;
        }
    }
    //save view popup
    $scope.savedViewPopUp = false;
    $scope.savedFilterPopUp = false;
    $scope.filterTypeSave = false;

    /* Start: Add Attachment */
	var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.<br />Limited to file(s) of 10MB each.\<br /> Maximum 5 files can be uploaded.";
	$scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
	$scope.shareAddAttachmentUrl = "shared/popup/views/popupUploadDoc.html";
	$scope.attachementAdded = true;
	$scope.shareAddAttachmentPopup = false;
	$scope.questAttachement = false;
	var mode = '';
	$scope.addAttachmentCallback = function (e) {
		$scope.supplierAttachementPopup = true;
        $scope.showSupplierEmail = false;


	};
	$scope.addAttachmentPopUpOnHideCallback = function (e) {
		$scope.supplierAttachementPopup = false;
        $scope.showSupplierEmail = true;
	};
	$scope.attachmentData = [
		{ fileName: "Attachment01Attachment01Attachment01", 'extn': 'xls', "status": "success" },
		{ fileName: "Attachment02", 'extn': 'pdf', "status": "success" },
		{ fileName: "Attachment03", 'extn': 'doc', "status": "success" }
	];
	var attachmentDataList = angular.copy($scope.attachmentData);

	$scope.attachementAdded = false;
	$scope.attachAction = function () {
		$scope.attachementAdded = true;
		if (mode == 'preview') {
			$scope.attachementAdded1 = false;
		}
		//if (e === 'que') {
		$scope.questAttachement = true;
		//} else {
		//$scope.questAttachement = false;
		//}
		Materialize.toast(" Attachment added successfully.", 2000);
		$scope.attachmentData = angular.copy(attachmentDataList);
	}

	$scope.deleteAttachment = function (index) {
		$scope.attachmentData.splice(index, 1);
		Materialize.toast(" Attachment deleted successfully.", 1500);
	}

	$scope.deleteAllAttachment = function () {

		var deleteAllAttach = {
			type: "confirm",
			message: "Are you sure you want to delete all attachments?",
			buttons: [
				{
					"title": "Yes",
					"result": "yes"
				},
				{
					"title": "No",
					"result": "no"
				}
			]
		};
		notification.notify(deleteAllAttach, function (response) {
			if (response.result == "yes") {
				$scope.attachmentData = [];
				$scope.questAttachement = false;
				Materialize.toast(" All attachments deleted successfully.", 2000);
				if (mode == 'preview') {
					$scope.attachementAdded1 = true;
				} else {
					$scope.attachementAdded = false;
				}

			}
		});
	}

	/* End: Add Attachment */
    $scope.savedViewPopupCallback = function (e, type) {
        if (type == "filter") {
            $scope.filterTypeSave = true;
            $scope.savedFilterPopUp = true;
            //loader for save View popup
            $scope.isloader = true;
            $timeout(function () {
                $scope.isloader = false;
            }, 1000);

            //$scope.savedViewPopUp = false;
            $scope.showfilterViewList = true;
        }
        else {
            $scope.savedViewPopUp = true;
            //$scope.savedFilterPopUp = false;
            $scope.showSavedViewList = true;
        }
        // $scope.showSavedViewList = true;
    };
    $scope.savedViewPopupHideCallback = function () {
        $scope.savedViewPopUp = false;
        $scope.savedFilterPopUp = false;
    };

    //$scope.saveViewPopupCallback = function (e) {
    //    $scope.savedViewPopUp = true;
    //    $scope.showSavedViewList = false;
    //};
    $scope.showExportPopup = false;
    $scope.showExportPopupCallback = function () {
        $scope.showExportPopup = true;
    }
    $scope.exportPopupOnHideCallback = function (e) {
        $scope.showExportPopup = false;
    }
    $scope.showExportLogPopup = false;
    $scope.exportLogPopupOnHideCallback = function (e) {
        $scope.showExportLogPopup = false;
    }
    $scope.viewExportLogCall = function () {
        $scope.showExportPopup = false;
        $scope.showExportLogPopup = true;
    }


    // manage Attributes
    $scope.manageAttributesPopupUrl = "shared/popup/views/popupManageFields.html";
    $scope.manageAttributesPopUp = false;
    $scope.manageAttributesPopupCallback = function (e, getValuCheck) {
        $scope.manageAttributesPopUp = true;
        $scope.$broadcast('checkApplyFilter', { 'checkfilter': getValuCheck });
        //dragable sort list
        $('.dragList').sortable({
            containment: "parent",
            axis: "y",
            handle: ".manageCol-tbl--type-nameTd .icon",
            tolerance: "pointer"
        });

    };
    $scope.manageAttributesPopupHideCallback = function () {
        $scope.manageAttributesPopUp = false;
    };

    /* Additional form popup */
    $scope.showAdditionalFormPopup = false;
    $scope.showAdditionalForm = function (e) {
        $scope.additionalFormData = angular.copy(additionalFormData);
        $scope.showAdditionalFormPopup = true;
        $timeout(function () {
            $scope.isSearchOpen = true;
        }, 500);

    };

    $scope.hideAdditionalFormPopupCallback = function (e) {
        $scope.showAdditionalFormPopup = false;

        $scope.isSearchOpen = false;
        $scope.searchText.title = '';

    };

    var additionalFormData = [{ "name": "IT Security Information", "check": false }, { "name": "Audit Test", "check": false }, { "name": "Contract Request form", "check": false }, { "name": "Certification update", "check": false }, { "name": "Procurement details", "check": false }, { "name": "Financial information", "check": false }, { "name": "FCPA", "check": false }, { "name": "Environmental performance", "check": false }, { "name": "Security Assessment", "check": false }];
    $scope.itemSelectedCounted = 0;
    $scope.isSearchOpen = false;
    $scope.searchText = { title: '' };

    $scope.onChangeItem = function (obj) {
        if (obj.check) {
            $scope.itemSelectedCounted++;
        } else {
            $scope.itemSelectedCounted--;
        }
    };
    $scope.searchToggle = function () {
        $scope.isSearchOpen = !$scope.isSearchOpen;

    };
    $scope.closeSearch = function () {
        if ($scope.searchText.title != "") {
            $scope.searchText.title = "";
        } else {
            $scope.isSearchOpen = false;
        }
    };
    $scope.additionalAssignFn = function () {

        $scope.hideAdditionalFormPopupCallback();
        $scope.itemSelectedCounted = 0;
        Materialize.toast('Selected forms assigned to the supplier', 2000);
    };
    $scope.additionalInviteFn = function () {

        $scope.hideAdditionalFormPopupCallback();
        $scope.itemSelectedCounted = 0;
        Materialize.toast('Supplier invited to the selected forms', 2000);
    };



    $scope.languageOptions = [{ "code": "zh-CHS", "name": "Chinese(Simplified)" }, { "code": "cs-CZ", "name": "Czech" }, { "code": "da-DK", "name": "Danish" }, { "code": "en-US", "name": "English" }, { "code": "fr-FR", "name": "French" }, { "code": "de-DE", "name": "German" }, { "code": "it-IT", "name": "Italian" }, { "code": "ja-JP", "name": "Japanese" }, { "code": "ko-KR", "name": "Korean" }, { "code": "pl-PL", "name": "Polish" }, { "code": "pt-BR", "name": "Portuguese(Brazilian)" }, { "code": "ru-RU", "name": "Russian" }, { "code": "es-ES", "name": "Spanish" }, { "code": "sv-SE", "name": "Swedish" }, { "code": "th-TH", "name": "Thai" }];



    // Start: Event Admin Confirmation Popup
    $scope.eventAdminMode = false;
    $scope.fabBtn = true;
    $scope.eventAdmin = function () {
        var eventAdmin = {
            type: "confirm",
            message: "Are you sure you want to view the event in the Event Admin mode?",
            buttons: [
				{
				    title: "YES",
				    result: "yes"
				},
				{
				    title: "NO",
				    result: "no"
				},
            ]
        };
        notification.notify(eventAdmin, function (response) {
            if (response.result == 'yes') {
                $scope.eventAdminMode = true;
                $scope.fabBtn = false;
            }
        });
    }
    // End: Event Admin Confirmation Popup

    $scope.onChangeEventAdmin = function () {
        var eventAdminToggle = {
            type: "confirm",
            message: "Are you sure you want to Exit Event Admin mode?",
            buttons: [
				{
				    title: "YES",
				    result: "yes"
				},
				{
				    title: "NO",
				    result: "no"
				},
            ]
        };
        notification.notify(eventAdminToggle, function (response) {
            if (response.result == 'yes') {
                $scope.eventAdminMode = false;
            }
        });
    }



    $scope.$on('applyModification', function (e, d) {

        if (d.makeIsSaveViewModified == true) {
            $scope.isSavedViewModified = true;
        }
        else {
            $scope.isApplyFilters = true;
        }
    });


    $scope.listSortWith = [
                  { 'name': 'Modified Date', 'sortas': 'asc_desc', 'tooltip': 'Sort by Ascending' },
                  { 'name': 'Creation Date', 'sortas': 'asc_desc', 'tooltip': 'Sort by Ascending' },
                  { 'name': 'Name', 'sortas': 'asc_desc', 'tooltip': 'Sort By Ascending' }
    ];

    //if ($scope.docType == "order" && $scope.selectedTab == 1) {
    //    $scope.listSortWith = [
    //                            { 'name': 'Order Name', 'sortas': 'asc_desc' },
    //                            { 'name': 'Order Number', 'sortas': 'asc_desc' },
    //                            { 'name': 'Req No', 'sortas': 'asc_desc' },
    //                            { 'name': 'Line Item Quantity', 'sortas': 'asc_desc' },
    //                            { 'name': 'Line Item Unit Price', 'sortas': 'asc_desc' },
    //                            { 'name': 'Line Item Total', 'sortas': 'asc_desc' },
    //                            { 'name': 'Start Date', 'sortas': 'asc_desc' },
    //                            { 'name': 'End Date', 'sortas': 'asc_desc' },
    //                            { 'name': 'Total', 'sortas': 'asc_desc' },
    //                            { 'name': 'Contract No', 'sortas': 'asc_desc' },
    //                            { 'name': 'Requested Date', 'sortas': 'asc_desc' },
    //                            { 'name': 'Need by Date', 'sortas': 'asc_desc' },
    //                            { 'name': 'Contract No', 'sortas': 'asc_desc' },
    //                            { 'name': 'Contract No', 'sortas': 'asc_desc' },
    //                            { 'name': 'Value Based Tolerance', 'sortas': 'asc_desc' },
    //                            { 'name': 'Range Based Tolerance', 'sortas': 'asc_desc' },
    //                            { 'name': 'Percentage Based Tolerance', 'sortas': 'asc_desc' }
    //    ];
    //    $scope.isSortBy = { 'name': 'Order Name', 'sortas': 'asc_desc' }
    //      $scope.exportActions.unshift({
    //            'key': 'Create ASN'
    //        });
    //}
    //else if ($scope.docType == "order" && $scope.selectedTab == 2) {
    //    $scope.listSortWith = [
    //                                { 'name': 'Latest Need by Date', 'sortas': 'asc_desc' },
    //                                { 'name': 'Name (A-Z)', 'sortas': 'asc_desc' },
    //                                { 'name': 'Name (Z-A)', 'sortas': 'asc_desc' },
    //                                { 'name': 'Last Created', 'sortas': 'asc_desc' }

    //    ];
    //    $scope.isSortBy = { 'name': 'Latest Need by Date', 'sortas': 'asc_desc' }
    //}
    //else if ($scope.docType == 'requisition') {
    //    $scope.listSortWith = [
    //               { 'name': 'Requisition Name', 'sortas': 'asc_desc' },
    //               { 'name': 'Tax', 'sortas': 'asc_desc' },
    //               { 'name': 'Shipping Charges', 'sortas': 'asc_desc' },
    //               { 'name': 'Unit Price', 'sortas': 'asc_desc' },
    //               { 'name': 'Amount', 'sortas': 'asc_desc' }
    //    ];
    //    $scope.isSortBy = { 'name': 'Requisition Name', 'sortas': 'asc_desc' }
    //} else if ($scope.docType == 'supplier') {
    //	$scope.listSortWith = [
    //               { 'name': 'Last modified', 'sortas': 'asc_desc' },
    //               { 'name': 'Created by', 'sortas': 'asc_desc' },
    //               { 'name': 'Name', 'sortas': 'asc_desc' }
    //	];
    //	$scope.isSortBy = { 'name': 'Requisition Name', 'sortas': 'asc_desc' }
    //};

    $scope.setSortAsicon = function (checkSortByicon) {
        switch (checkSortByicon) {
            case "asc":
                return "#icon_SortAscending"
                break;
            case "desc":
                return "#icon_SortDescending"
                break;
            case "asc_desc":
                return "#icon_Sort"
                break;
        }
    };

    $scope.ascDescToggler = function (getCount, currentItem) {
        $scope.enableSortButton = false;
        var checkcurrentSortas = currentItem.sortas;
        if (checkcurrentSortas == 'asc_desc') {
            currentItem.sortas = 'asc';
            currentItem.tooltip = 'Sort by Descending';
        }
        else if (checkcurrentSortas == 'asc') {
            currentItem.sortas = 'desc';
            currentItem.tooltip = 'Sort by Ascending';
        }
        else if (checkcurrentSortas == 'desc') {
            currentItem.sortas = 'asc';
            currentItem.tooltip = 'Sort by Descending';
        }

        for (var i = 0; i < $scope.listSortWith.length; i++) {
            if (i != getCount) {
                $scope.listSortWith[i].sortas = 'asc_desc';
                $scope.listSortWith[i].tooltip = 'Sort by Ascending';
            }
        }
    };

    //for single sort icon
    $scope.sortSingleCurrent = '#icon_Sort';
    $scope.sortMessage = "Sort";
    $scope.sortToggle = function () {
        if ($scope.sortSingleCurrent == '#icon_Sort') {
            $scope.sortMessage = "Ascending";
            $scope.sortSingleCurrent = '#icon_SortAscending';
        }
        else if ($scope.sortSingleCurrent == '#icon_SortAscending') {
            $scope.sortSingleCurrent = '#icon_SortDescending';
            $scope.sortMessage = "Descending";
        }
        else if ($scope.sortSingleCurrent == '#icon_SortDescending') {
            $scope.sortSingleCurrent = '#icon_Sort';
            $scope.sortMessage = "Sort";
        }
    };
    $scope.onChangeselectedSortBy = function (selectedSortBy) {
        $scope.selectedSortBy = selectedSortBy
    };

    $scope.selectedSavedview = { 'name': 'Requisitions pending since 10 days', 'isDefault': true };
    $scope.getSavedViewsList = [
        { 'name': 'Requisitions pending since 10 days', 'isDefault': true, 'showCurrentItemEditor': false, 'index': 0 },
        { 'name': 'Requisitions exceeding USD 1000.00', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 1 },
        { 'name': 'Requisitions for IT/Telecom', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 2 },
        { 'name': 'Requisitions for Office Supplies less than USD 100.00', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 3 },
        { 'name': 'Requisitions overdue', 'isDefault': false, 'showCurrentItemEditor': false, 'index': 4 }
    ];
    $scope.isApplyFilters = false;
    $scope.isSavedView = false;
    $scope.isSavedViewModified = false;

    $scope.selectedFilterView = {};
    $scope.getFilterViewsList = [
        { 'name': 'filter 1', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 0 },
        { 'name': 'filter 2', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 1 },
        { 'name': 'filter 3', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 2 },
        { 'name': 'filter 4', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 3 },
        { 'name': 'filter 5', 'isDefault': false, 'showCurrentItemEditor': false, 'isDefaultTxt': false, 'index': 4 }
    ];

    $scope.isFilters = false;
    $scope.isFilterView = false;
    $scope.isFilterViewModified = false;

    $scope.applySort = function (checkSavedView) {
        if ($scope.enableSortButton) {
            return false;
        } else {
            if (checkSavedView == true) {
                $scope.isSavedViewModified = true;
            } else {
                $scope.isApplyFilters = true;
            }
            angular.element('body').trigger('click');
        }
    }


    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    }

    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    }


    $scope.isnotPageEnd = false;

    //loader
    $scope.totalDisplayed = 10;

    $scope.loadMore = function () {
        $scope.totalDisplayed += 7;
    }

    /*filter content*/
    $scope.FilterNumber = 3;

    $scope.isbtnApplyDisable = false;
    $scope.urgentRequisition = false;
    $scope.setUrgentRequisition = function (isUrgentRequisition) {
        $scope.urgentRequisition = true;
    };

    /*filter type*/
    $scope.showFilter = false;
    $scope.toggleFilter = function (e) {
        if ($scope.showFilter == false) {
            $scope.showFilter = true;
            $rootScope.showScrollBar = true;
        }
        else {
            $scope.showFilter = false;
            $rootScope.showScrollBar = false;
        }
    };


    if ($scope.docType != 'recent_documents') {

        $scope.importDocumentFilterTabData = [
            {
            "id": "approver",
            "title": "Approver",
            "active": true,
            "htmlmode": true,
            "tabsUrl": "tabHeaderApprover.html"
        }, {
            "id": "period",
            "title": "Period",
            
            "htmlmode": true,
            "tabsUrl": "tabHeader1.html"
        }, {
            "id": "deliveryStatus",
            "title": "Delivery Status",
            "htmlmode": true,
            "tabsUrl": "tabHeader2.html"
        }, {
            "id": "documentType",
            "title": "Document Type",
            "htmlmode": true,
            "tabsUrl": "tabDocument.html"
        }, {
            "id": "status",
            "title": "Status",
            "htmlmode": true,
            "tabsUrl": "filterStatus.html"
        }, {
            "id": "dateRange",
            "title": "Date Range",
            "htmlmode": true,
            "tabsUrl": "tabHeader4.html"
        }
        ];
        $scope.showFilter = false;
        $scope.period = false;
        $scope.approver = true;
        $scope.deliveryStatus = false;
        $scope.documentType = false;
        $scope.recipientType = false;
        $scope.dateRange = false;
        $scope.advanceDateRange = false;

        $scope.tabSelectCallback = function (tab) {
            if (tab.id == 'approver') {
                $scope.approver = true;
                $scope.period = false;
                $scope.deliveryStatus = false;
                $scope.documentType = false;
                $scope.filterStatus = false;
                $scope.recipientType = false;
                $scope.dateRange = false;
                $scope.advanceDateRange = false;
            }
           else if (tab.id == 'period') {
                $scope.approver = false;
                $scope.period = true;
                $scope.deliveryStatus = false;
                $scope.documentType = false;
                $scope.filterStatus = false;
                $scope.recipientType = false;
                $scope.dateRange = false;
                $scope.advanceDateRange = false;
            }
            else if (tab.id == 'deliveryStatus') {
                $scope.approver = false;
                $scope.deliveryStatus = true;
                $scope.period = false;
                $scope.documentType = false;
                $scope.filterStatus = false;
                $scope.recipientType = false;
                $scope.dateRange = false;
                $scope.advanceDateRange = false;
            }
            else if (tab.id == 'documentType') {
                $scope.approver = false;
                $scope.documentType = true;
                $scope.period = false;
                $scope.deliveryStatus = false;
                $scope.recipientType = false;
                $scope.filterStatus = false;
                $scope.dateRange = false;
                $scope.advanceDateRange = false;
            }
            else if (tab.id == 'status') {
                $scope.approver = false;
                $scope.documentType = false;
                $scope.filterStatus = true;
                $scope.period = false;
                $scope.deliveryStatus = false;
                $scope.recipientType = false;
                $scope.dateRange = false;
                $scope.advanceDateRange = false;
            }
            else if (tab.id == 'recipientType') {
                $scope.approver = false;
                $scope.recipientType = true;
                $scope.period = false;
                $scope.deliveryStatus = false;
                $scope.documentType = false;
                $scope.filterStatus = false;
                $scope.dateRange = false;
                $scope.advanceDateRange = false;
            }
            else if (tab.id == 'dateRange') {
                $scope.approver = false;
                $scope.dateRange = true;
                $scope.period = false;
                $scope.deliveryStatus = false;
                $scope.documentType = false;
                $scope.filterStatus = false;
                $scope.recipientType = false;
                $scope.advanceDateRange = false;
            }
            else if (tab.id == 'advanceDateRange') {
                $scope.approver = false;
                $scope.advanceDateRange = true;
                $scope.period = false;
                $scope.deliveryStatus = false;
                $scope.documentType = false;
                $scope.filterStatus = false;
                $scope.recipientType = false;
                $scope.dateRange = false;
            }
        };

        $scope.isApplyFilters = false;
        $scope.isSavedView = false;
        //End: Filter
        $scope.repoList = {
            docType: {
                countPricesheetList: 0,
                fillpartial: false,
                checkedAll: false,
                showSelect: true,
                checkElem: {
                    checkElemStatus: false,
                    text: "Selected",
                },
                list: [
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Jorge Neal"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Sonia Barnett"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Alberto Banks"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Luke Frazier"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Willie Kuhn"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Tyron White"
                    }
                ]
            },
            status: {
                countPricesheetList: 0,
                fillpartial: false,
                checkedAll: false,
                showSelect: true,
                checkElem: {
                    checkElemStatus: false,
                    text: "Selected",
                },
                list: [
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Draft"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Closed"
                    }
                ]
            }
        };

    } else {
        $scope.importDocumentFilterTabData = [
            {
                "id": "documentType",
                "title": "Document Type",
                "active": true,
                "htmlmode": true,
                "tabsUrl": "tabDocument.html"
            }
        ];
        $scope.repoList = {
            docType: {
                countPricesheetList: 0,
                fillpartial: false,
                checkedAll: false,
                showSelect: true,
                checkElem: {
                    checkElemStatus: false,
                    text: "Selected",
                },
                list: [
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Requisition"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Purchase Order"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Catalog"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Supplier"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Contract"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Project"
                    },
                    {
                        isChecked: false,
                        isHide: false,
                        title: "Rfx"
                    }
                ]
            }
        };
    }

    // Start-- check/Uncheck List
    $scope.checkedAllDoc = function (check, item) {
        item.fillpartial = false;
        item.showSelect = false;
        for (var i = 0; i < item.list.length; i++) {
            item.list[i].isChecked = check;
        }
        if (check)
            $scope.countPricesheetList = item.list.length;
        else {
            item.countPricesheetList = 0;
            item.showSelect = true;
        }
    };

    $scope.documentListChange = function (item) {
        item.countPricesheetList = 0;
        for (var i = 0; i < item.list.length; i++) {
            if (item.list[i].isChecked == true)
                item.countPricesheetList++;
        }
        item.fillpartial = true;
        item.showSelect = false;
        if (item.countPricesheetList === 0) {
            item.fillpartial = false;
            item.showSelect = true;
            item.checkedAll = false;
        }
        else if (item.countPricesheetList === item.list.length) {
            item.fillpartial = false;
            item.showSelect = false;
            item.checkedAll = true;
        }
    };

    $scope.resetData = function (item) {
        item.fillpartial = false;
        item.checkedAll = false;
        item.showSelect = true;
        item.countPricesheetList = 0;
        for (var i = 0; i < item.list.length; i++) {
            item.list[i].isChecked = false;
        }
    }
    $scope.showselected = function (item) {
        item.checkElem.checkElemStatus = !item.checkElem.checkElemStatus;

        if (item.checkElem.checkElemStatus == false) {
            item.checkElem.text = "selected";
            for (var i = 0; i < item.list.length; i++) {
                item.list[i].isHide = false;
            }
        }
        else {
            item.checkElem.text = "All";
            for (var i = 0; i < item.list.length; i++) {
                if (item.list[i].isChecked == true) {
                    item.list[i].isHide = false;
                }
                else {
                    item.list[i].isHide = true;
                }
            }
        }
    };
    // End-- check/Uncheck List

    var filterVal,
        subHeaderFixedHeight = 50,
        headerWrapper = 115;
    $scope.fixedHeaderWithFilters = subHeaderFixedHeight + 48;
    $scope.isFilterSaved = false;
    $scope.applyFilter = function (sortEnable) {
        $rootScope.showScrollBar = false;
        if ($scope.enableSortButton && sortEnable) {
            return false;
        } else {
            //if ($scope.filtertypesave) {
            //    $scope.isapplyfilters = true;
            //}
            //else {
            //    $scope.isapplyfilters = false;
            //}
            $scope.showFilter = false;
            $scope.filterAppliedPanel = 1;
            $scope.isFilterSaved = false;
            $scope.isApplyFilters = true;
            if ($scope.savedViewPopUp == true) { $scope.isApplyFilters = false; $scope.savedViewPopUp = false; $scope.isFilterSaved = true; }
            if ($scope.savedFilterPopUp == true) { $scope.savedFilterPopUp = false; $scope.isFilterSaved = true; }

            return filterVal;

        }
    }



    $scope.closeSavedPopup = function () {
        $scope.filterTypeSave = false;
        $scope.savedFilterPopUp = false;
        $scope.showfilterViewList = false;
        $scope.savedViewPopUp = false;
        $scope.showSavedViewList = false;
    }
    $scope.getDynamicHeight = function (e) {
        $scope.filterAppliedPanel = e.height;
        var tabparentContainer = angular.element('#gridFixedContainer .tabparent-container'),
            uploadStatus = $('#uploadStatus');
        $scope.filterPanelHeight = $scope.filterAppliedPanel + headerWrapper + tabparentContainer.outerHeight() + uploadStatus.outerHeight();
        $scope.fixedHeaderWithFilters = $scope.filterAppliedPanel + subHeaderFixedHeight + tabparentContainer.outerHeight() + uploadStatus.outerHeight();
        $scope.documentViewHeight = $scope.filterAppliedPanel + subHeaderFixedHeight;
    };

    $scope.resetFilter = function () {
        $scope.enableSortButton = true;
        $scope.isApplyFilters = false;
        $scope.isFilterSaved = false;
        var tabparentContainer = angular.element('#gridFixedContainer .tabparent-container');
        $scope.filterPanelHeight = headerWrapper + tabparentContainer.outerHeight();
        $scope.fixedHeaderWithFilters = subHeaderFixedHeight + tabparentContainer.outerHeight();
        $scope.resetSortBy();
        $scope.savedfilterexpanded = false;
    }

    $scope.resetSortBy = function () {
        for (var i = 0; i < $scope.listSortWith.length; i++) {
            $scope.listSortWith[i].sortas = 'asc_desc';
            $scope.listSortWith[i].tooltip = 'Sort by Ascending';
            $scope.selectedIndex = -1;
        }
    };

    $scope.lastPage = function () {
        history.go(-1);
    }
    $scope.sorts = [
  { 'name': 'Recent First' },
  { 'name': 'Oldest First' }
    ];

    $scope.users = [
        {
            "name": "John Doe",
            "type": "user",
            "members": "",
            "reassign": false,
            "reassignedTo": "",
            "edit": false
        },
    {
        "name": "Michael Slater",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    },
    {
        "name": "Jammie Foster",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    },
    {
        "name": "Ozborne Lopez",
        "type": "user",
        "members": "",
        "reassign": false,
        "reassignedTo": "",
        "edit": false
    }
    ];
    
    $scope.selectedApprover = [];
    $scope.filterOptions = [{
        "code": "1",
        "name": "All"
    }, {
        "code": "2",
        "name": "Today"
    }, {
        "code": "3",
        "name": "Last 7 Days"
    }, {
        "code": "4",
        "name": "Last 30 Days"
    }, {
        "code": "5",
        "name": "Date Range"
    }];
    $scope.selectedFilter = { "code": "1", "name": "All" };
    $scope.dateRange = false;
    $scope.onChange = function (selectedFilter) {
        filterVal = selectedFilter.name;
        if (selectedFilter.code === "5") {
            $scope.dateRange = true;
        }
        else {
            $scope.dateRange = false
        }
    };

    $scope.advanceDateTypeOptions = [{
        'title': 'Date Range',
        'code': 'dr'
    }, {
        'title': 'Period',
        'code': 'p'
    }];
    $scope.advanceDateType = $scope.advanceDateTypeOptions[0];
    $scope.onChangeadvanceDateType = function (type) {
        $scope.advanceDateType = type;
    }
    $scope.startDate = '';
    $scope.endDate = '';
    $scope.nextDayOptions = [{
        'title': '30'
    }, {
        'title': '60'
    }, {
        'title': '90'
    }];
    $scope.nextDays = $scope.nextDayOptions[0];
    $scope.advancestartDate = new Date().getTime();
    $scope.advanceendDate = '';




    var setDataType, setDataStatus;


    if ($scope.docType == 'catalog') {

        setDataType = [
                { filterLabel: 'Hosted Catalogs', isChecked: false },
                { filterLabel: 'Punchout/ Commercial Catalogs', isChecked: false },
                { filterLabel: 'Internal Catalogs', isChecked: false },
                { filterLabel: 'Kits', isChecked: false }
        ];

        setDataStatus = [
                        { filterLabel: 'Draft', isChecked: false },
                        { filterLabel: 'Published', isChecked: false },
                        { filterLabel: 'Approved', isChecked: false },
                        { filterLabel: 'Rejected', isChecked: false },
                        { filterLabel: 'Approval Required', isChecked: false }
        ];

    }
    else {
        setDataType = [
                    { filterLabel: 'Requisitions', isChecked: false },
                    { filterLabel: 'Orders', isChecked: false },
                    { filterLabel: 'Programs', isChecked: false },
                    { filterLabel: 'Receipts', isChecked: false },
                    { filterLabel: 'Return Note', isChecked: false },
                    { filterLabel: 'Invoices', isChecked: false },
                    { filterLabel: 'Credit Memo', isChecked: false },
                    { filterLabel: 'Invoice Reconciliation', isChecked: false }
        ];

        setDataStatus = [
                        { filterLabel: 'Draft', isChecked: false },
                        { filterLabel: 'Approval Pending', isChecked: false },
                        { filterLabel: 'Approved', isChecked: false },
                        { filterLabel: 'Rejected', isChecked: false },
                        { filterLabel: 'Withdrawn', isChecked: false },
                        { filterLabel: 'Supplier Acknowledged', isChecked: false },
                        { filterLabel: 'Sent To supplier', isChecked: false },
                        { filterLabel: ' Sent To Buyer', isChecked: false },
                        { filterLabel: 'Cancelled', isChecked: false },
                        { filterLabel: 'Sending To supplier Failed', isChecked: false },
        ];

    }


    $scope.Types = setDataType;
    /*filter status*/
    $scope.Status = setDataStatus;
    /*filter Category*/
    $scope.categories = [
                { filterLabel: 'Business Travel', isChecked: false },
                { filterLabel: 'General Services', isChecked: false },
                { filterLabel: 'Human Resources', isChecked: false },
                { filterLabel: 'IT / Telecom', isChecked: false },
                { filterLabel: 'Logistic', isChecked: false },
                { filterLabel: 'Packaging', isChecked: false },
                { filterLabel: 'Human Resources', isChecked: false },
                { filterLabel: 'Business Travel', isChecked: false },
                { filterLabel: 'General Services', isChecked: false },
                { filterLabel: 'Business Travel', isChecked: false },
                { filterLabel: 'General Services', isChecked: false },
                { filterLabel: 'Human Resources', isChecked: false },
                { filterLabel: 'IT / Telecom', isChecked: false },
                { filterLabel: 'Logistic', isChecked: false },
                { filterLabel: 'Packaging', isChecked: false },
                { filterLabel: 'Human Resources', isChecked: false },
                { filterLabel: 'Business Travel', isChecked: false },
                { filterLabel: 'General Services', isChecked: false }
    ];
    //filter repeat
    //contract data starts here

    $scope.contractDocType = [
		  { filterLabel: 'Requisitions', isChecked: false },
		  { filterLabel: 'Orders', isChecked: false },
		  { filterLabel: 'Programs', isChecked: false },
		  { filterLabel: 'Receipts', isChecked: false },
		  { filterLabel: 'Return Note', isChecked: false },
		  { filterLabel: 'Invoices', isChecked: false },
		  { filterLabel: 'Credit Memo', isChecked: false },
		  { filterLabel: 'Invoice Reconciliation', isChecked: false }
    ];
    /*filter status*/
    $scope.contractStatus = [
                { filterLabel: 'Execution Pending', isChecked: false },
                { filterLabel: 'Team Reviewed', isChecked: false },
                { filterLabel: 'Terminated', isChecked: false },
                { filterLabel: 'Buyer Signature Pending', isChecked: false },
                { filterLabel: 'Draft Amendment', isChecked: false },
                { filterLabel: 'Supplier Signature Pending', isChecked: false },
                { filterLabel: 'Draft', isChecked: false },
				{ filterLabel: 'Closed', isChecked: false },
                { filterLabel: 'Expired', isChecked: false },
                { filterLabel: 'Approved', isChecked: false },
                { filterLabel: 'Rejected', isChecked: false },
				{ filterLabel: 'Executed', isChecked: false },
                { filterLabel: 'Declined', isChecked: false },
                { filterLabel: 'Live', isChecked: false },
                { filterLabel: 'Team Rejected', isChecked: false }
    ];
    /*filter Category*/
    $scope.contractCategoryType = [
                { filterLabel: 'Addendum', isChecked: false },
                { filterLabel: 'Team Reviewed', isChecked: false },
                { filterLabel: 'Terminated', isChecked: false },
                { filterLabel: 'Addendum (ADD)', isChecked: false },
                { filterLabel: 'Supplier Signatory Rejected', isChecked: false },
                { filterLabel: 'Amendment (AMN)', isChecked: false },
                { filterLabel: 'Addendum', isChecked: false },
                { filterLabel: 'Team Reviewed', isChecked: false },
                { filterLabel: 'Terminated', isChecked: false },
                { filterLabel: 'Addendum (ADD)', isChecked: false },
                { filterLabel: 'Supplier Signatory Rejected', isChecked: false },
                { filterLabel: 'Amendment (AMN)', isChecked: false },
                { filterLabel: 'Buyer Signatory Rejected', isChecked: false }
    ];
    /*filter author*/
    $scope.contractAuthor = [
                { filterLabel: 'Mariana Mckinsey', isChecked: false },
                { filterLabel: 'Yolando Zullo', isChecked: false },
                { filterLabel: 'Sherril Cisneros', isChecked: false },
                { filterLabel: 'Delia Metayer', isChecked: false },
                { filterLabel: 'Guadalupe Kearley', isChecked: false },
                { filterLabel: 'Carman Pennypacker', isChecked: false },
                { filterLabel: 'Phil Kirwan', isChecked: false },
                { filterLabel: 'Mariana Mckinsey', isChecked: false },
                { filterLabel: 'Yolando Zullo', isChecked: false },
                { filterLabel: 'Sherril Cisneros', isChecked: false },
                { filterLabel: 'Delia Metayer', isChecked: false },
                { filterLabel: 'Guadalupe Kearley', isChecked: false },
                { filterLabel: 'Carman Pennypacker', isChecked: false },
                { filterLabel: 'Phil Kirwan', isChecked: false }
    ];
    /*filter author*/
    $scope.contractSupplier = [
                { filterLabel: 'Quadlane', isChecked: false },
                { filterLabel: 'Ranksuntam', isChecked: false },
                { filterLabel: 'Linetrans', isChecked: false },
                { filterLabel: 'Bluedax', isChecked: false },
                { filterLabel: 'Rancan', isChecked: false },
                { filterLabel: 'Single-holding', isChecked: false },
                { filterLabel: 'Sumjob', isChecked: false },
                { filterLabel: 'Transfase', isChecked: false },
                { filterLabel: 'Tripplecom', isChecked: false },
                { filterLabel: 'Quadlane', isChecked: false },
                { filterLabel: 'Ranksuntam', isChecked: false },
                { filterLabel: 'Linetrans', isChecked: false },
                { filterLabel: 'Bluedax', isChecked: false },
                { filterLabel: 'Rancan', isChecked: false }
    ];
    /*my role*/
    $scope.myRoleOptions = [
            { "name": "Approver" },
            { "name": "Author" },
            { "name": " Order Contact" },
            { "name": "Requester" }
    ];

    $scope.selectedmyRole = { "name": "Approver" };
    $scope.onChangeRole = function (selectedmyRole) {

    };

    /*order contact*/
    $scope.orderContact = [
               { filterLabel: 'Gabriella Genia', isChecked: false },
               { filterLabel: 'Mathew D', isChecked: false },
               { filterLabel: 'Elizabeth Ayala', isChecked: false },
               { filterLabel: 'Maria Cabayaran', isChecked: false },
               { filterLabel: 'DTCC QA', isChecked: false },
               { filterLabel: 'DTCC User', isChecked: false }
    ];

    /* order type */
    $scope.orderTypeOptions = [
            { "name": "Manual Order" },
            { "name": "Requisition Order" },
            { "name": "Confirming Order" },
            { "name": "Catalog Order" },
            { "name": "Change Order" },
            { "name": "Change Request" },
            { "name": "Blanket Order" },
            { "name": "Release Order" }


    ];

    $scope.selectedOrderType = { "name": "Manual Order" };
    $scope.onChangeorderType = function (selectedOrderType) {

    };

    /* Requested By */
    $scope.requestedBy = [
               { filterLabel: 'DTCC Support', isChecked: false },
               { filterLabel: 'Gabriella Genia', isChecked: false },
               { filterLabel: 'Omar Kareem', isChecked: false },
               { filterLabel: 'Alessandra Tassini-Negri', isChecked: false },
               { filterLabel: 'Anant Bapat', isChecked: false },
               { filterLabel: 'Anand Rau', isChecked: false },
               { filterLabel: 'Patrick Meyer(GEP)', isChecked: false },
               { filterLabel: 'Alessandra req', isChecked: false },
               { filterLabel: 'Elizabeth Ayala', isChecked: false }
    ];


    /* order type */
    $scope.orderInvStatusOptions = [
            { "name": "Fully Invoiced" },
            { "name": " Partially Invoiced" },
            { "name": "Over Invoiced" },
            { "name": "Not Invoiced" }
    ];

    $scope.selectedorderInvStatus = { "name": "Fully Invoiced" };
    $scope.onChangeorderInvStatus = function (selectedorderInvStatus) {

    };

    /* Matching Type */
    $scope.matchingTypeOptions = [
            { "name": "Fully Invoiced" },
            { "name": " Partially Invoiced" },
            { "name": "Over Invoiced" },
            { "name": "Not Invoiced" }
    ];

    $scope.selectedMatchingType = { "name": "Fully Invoiced" };
    $scope.onChangeMatchingType = function (selectedMatchingType) {

    };
    /* sourcing Sys Name */
    $scope.sourcingSysName = [
            { filterLabel: 'SMART', isChecked: false }

    ];
    /* ship To Locaction */
    $scope.shipToLoc = [
            { filterLabel: 'Australia - Sydney', isChecked: false },
            { filterLabel: 'Avox', isChecked: false },
            { filterLabel: 'Boston', isChecked: false },
              { filterLabel: 'Brooklyn', isChecked: false },
            { filterLabel: 'Canada - Toronto', isChecked: false },
              { filterLabel: 'Chennai', isChecked: false },
            { filterLabel: 'Czech Republic - Brno', isChecked: false },
              { filterLabel: 'Dallas', isChecked: false },
            { filterLabel: 'Dallas (Business Center)', isChecked: false }

    ];
    /* Include Closed Orders */

    $scope.incClosedOrder = false;
    $scope.onChangeincClosedOrder = function (incClosedOrder) {

    };
    /*Orders with Urgent Requisition*/
    $scope.orderswithUrgentReq = false;
    $scope.onChangeOrderswithUrgentReq = function (orderswithUrgentReq) {

    };
    /* Order Receiving Status */
    $scope.selOrdRecStsOptions = [
          { "name": "Excess Receipt" },
          { "name": "Full Receipt" },
          { "name": "Partial Receipt" },
          { "name": "Return Receipt" }
    ];

    $scope.selOrdRecSts = { "name": "Excess Receipt" };
    $scope.onChangeselOrdRecSts = function (selOrdRecSts) {

    };


    $scope.filters = '';
    var setFilter = function () {
        if ($scope.isContract) {
            //   $scope.FilterNumber = 4;
            $scope.filters = [{
                searchType: 'STATUS',
                filterAction: true,
                listHeight: '180px',
                filterVal: "",
                filterLists: $scope.contractStatus,
                filterCheckedAll: false

            }, {
                searchType: 'DOCUMENT TYPE',
                filterAction: true,
                listHeight: '180px',
                filterVal: "",
                filterLists: $scope.contractDocType,
                filterCheckedAll: false
            }, {
                searchType: 'CONTRACT TYPE',
                filterAction: true,
                listHeight: '180px',
                filterVal: "",
                filterLists: $scope.contractCategoryType,
                filterCheckedAll: false
            }, {
                searchType: 'AUTHOR',
                filterAction: true,
                listHeight: '180px',
                filterVal: "",
                filterLists: $scope.contractAuthor,
                filterCheckedAll: false
            }, {
                searchType: 'OWNER',
                filterAction: true,
                listHeight: '180px',
                filterVal: "",
                filterLists: $scope.contractAuthor,
                filterCheckedAll: false
            }, {
                searchType: 'SUPPLIER',
                filterAction: true,
                listHeight: '180px',
                filterVal: "",
                filterLists: $scope.contractSupplier,
                filterCheckedAll: false
            }];

        }
        else if ($scope.isIR) {
            $scope.filters = [{
                searchType: 'AUTHOR IS',
                filterAction: true,
                listHeight: '230px',
                filterVal: "",
                filterLists: $scope.contractStatus,
                filterCheckedAll: false

            }, {
                searchType: 'ORDER CONTACT IS',
                filterAction: true,
                listHeight: '230px',
                filterVal: "",
                filterLists: $scope.contractDocType,
                filterCheckedAll: false
            }, {
                searchType: 'CATEGORY',
                filterAction: true,
                listHeight: '230px',
                filterVal: "",
                filterLists: $scope.contractCategoryType,
                filterCheckedAll: false
            }, {
                searchType: 'BUSINESS UNIT',
                filterAction: true,
                listHeight: '230px',
                filterVal: "",
                filterLists: $scope.contractAuthor,
                filterCheckedAll: false
            }, {
                searchType: 'SUPPLIERS',
                filterAction: true,
                listHeight: '230px',
                filterVal: "",
                filterLists: $scope.contractSupplier,
                filterCheckedAll: false
            }, {
                searchType: 'GL CODE',
                filterAction: true,
                listHeight: '230px',
                filterVal: "",
                filterLists: $scope.contractAuthor,
                filterCheckedAll: false
            }];
        }
        else {
            $scope.filters = [{
                searchType: 'By Type',
                filterAction: true,
                listHeight: '250px',
                filterVal: "",
                filterLists: $scope.Types,
                filterCheckedAll: false
            }, {
                searchType: 'By Status',
                filterAction: true,
                listHeight: '250px',
                filterVal: "",
                filterLists: $scope.Status,
                filterCheckedAll: false
            }, {
                searchType: 'By Category',
                filterAction: true,
                listHeight: '250px',
                filterVal: "",
                filterLists: $scope.categories,
                filterCheckedAll: false
            }];
        }
    }

    setFilter();

    $scope.searchfocusOut = function (e) {
        return false;
    };
    $scope.isDisable = true;
    $scope.isbtnSaveDisable = true;
    $scope.isbtnApplyDisable = true;


    $scope.onFilterCheckboxChange = function (isChecked, sectionindex) {

        if (!isChecked) {
            $scope.filters[sectionindex].filterCheckedAll = false;
            $scope.isDisable = true;
            $scope.isbtnSaveDisable = true;
            $scope.isbtnApplyDisable = true;
        }
        else {

            $scope.isDisable = false;
            $scope.isbtnSaveDisable = false;
            $scope.isbtnApplyDisable = false;
        }
    }

    $scope.checkedAll = function (filterCheckedAll, index) {

        var filterCheckboxs = $scope.filters[index].filterLists;
        if (!filterCheckedAll) {
            for (var i = 0; i < filterCheckboxs.length; i++) {
                filterCheckboxs[i].isChecked = false;
            }
        } else {
            for (var i = 0; i < filterCheckboxs.length; i++) {
                filterCheckboxs[i].isChecked = true;
                $scope.isbtnSaveDisable = false;
                $scope.isbtnApplyDisable = false;
            }
        }

    };


    $scope.savedFilterListOption = [
            { "name": "New Filter" },
            { "name": "Draft Memos 1" },
            { "name": "Draft Memos 2" },
            { "name": "Draft Memos 3" },
            { "name": "Draft Memos 4" },
            { "name": "Draft Memos 5" },
            { "name": "Draft Memos 6" },
            { "name": "Draft Memos 7" }

    ];

    $scope.selectedCurrentFilter = {
        "name": "Draft Memos 1"
    };
    $scope.onChangeSavedFilter = function (selectedFilter) {

        $scope.selectedCurrentFilter.name = selectedFilter;
        $scope.isbtnApplyDisable = false;

    };
    $scope.newfilter = { "name": "" };

    $scope.saveFilter = function () {
        Materialize.toast("Filter has been added", 5000);
        $scope.savedFilterListOption.push($scope.newfilter);
        $scope.newfilter.name = "";
        $scope.saveFilterPopUp = false;

        //$scope.isApplyFilters = true;
        //$scope.showFilter = false;
        $scope.filterAppliedPanel = 1;
        $scope.isFilterSaved = true;
        $timeout(function () {
            $scope.savedfilterexpanded = true;
        }, 500)
        // angular.element(domElement).trigger('click');
    }

    $scope.saveFilterPopupUrl = "shared/popup/views/popupSaveFilter.html";
    $scope.saveFilterPopUp = false;
    $scope.saveFilterPopupCallback = function (e) {
        $scope.saveFilterPopUp = true;

    };
    $scope.saveFilterPopupHideCallback = function () {
        $scope.saveFilterPopUp = false;
    };
    $scope.isFilteredFromMain = false;
    $scope.applyCurrentFilter = function (e, isSavedView) {
        if (isSavedView == true) {
            $scope.isSavedViewModified = true;
        } else {
            $scope.isFilteredFromMain = true;
            $scope.isApplyFilters = true;
            $scope.bandHeight = 40;
        }
        $scope.toggleFilter(e);
    }

    /* 
	  HEADER SEARCH INTRACTION
	  NEED TO CHANGE ITS WORKING
	*/
    $scope.showSearchHeader = function () {
        //$scope.mysearchHeight = { width: '1000px' };
        this.isActiveHeader = true;
        this.focusSearchHeader = true;
        this.hideCloseHeader = true;
    }
    $scope.hideSearchHeader = function () {
        //$scope.mysearchHeight = { width: '100%' };
        this.isActiveHeader = false;
        this.focusSearchHeader = false;
        this.hideCloseHeader = false;
    }
    /* end here*/

    $scope.uploadSFilter = true;
    $scope.uploadFFilter = true;
    $scope.downloadSFilter = true;
    $scope.downloadFFilter = true;
    $scope.user1 = true;
    $scope.user2 = true;
    $scope.user3 = true;
    $scope.uploadData = [
        { log: 'download', logText: 'Download', statusText: 'In progress', failed: "35", total: "663", documentName: '-', level: 'Pricesheet', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
        { log: 'upload', logText: 'Uploaded', statusText: 'In progress', failed: "3", total: "365", documentName: '-', level: 'Questionnaire', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
        { log: 'upload', logText: 'Uploaded', statusText: 'In progress', failed: "0", total: "43", documentName: '-', level: 'Event', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'In progress' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Success', failed: "0", total: "34", documentName: 'Product Specification.docx', level: 'Document', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Failed', failed: "6", total: "658", documentName: 'Specification.docx', level: 'Document', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'failed' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Failed', failed: "65", total: "636", documentName: 'Attachment.docx', level: 'Pricesheet', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'failed' },
		{ log: 'upload', logText: 'Uploaded', statusText: 'Success', failed: "0", total: "3673", documentName: 'Document.docx', level: 'Event', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
		{ log: 'download', logText: 'Downloaded', statusText: 'Success', failed: "0", total: "758", documentName: 'Product.docx', level: 'Questionnaire', date: '13 Oct 2016 12:30 PM', createdUploadedby: 'Avishek Jana', status: 'success' },
    ];


    //for (var i = 0; i < $scope.uploadData.length; i++) { 
    //    if ($scope.uploadData[i].statusText === 'In progress') {
    //        return true;
    //    }
    //}
    //return false;

    $scope.uploadCount = "3";
    $scope.uploadSuccessCount = "1";
    $scope.uploadFailedCount = "1";
    $scope.uploadInprogressCount = "1";

    $scope.closeFilter = function () {
        $scope.isApplyFilters = false;
        $scope.isUploadStatus = false;
    }


    $scope.uploadDownloadLogPopup = false;
    $scope.viewUploadLog = function (e) {
        $scope.uploadDownloadLogPopup = true;
    }
    $scope.uploadDownloadLogPopupHide = function (e) {
        $scope.uploadDownloadLogPopup = false;
    }
    $rootScope.contractQuickCreateRootCall = false;
    $scope.contractQuickCreate = function (e) {
        $rootScope.contractQuickCreateRootCall = true;
    };
    $rootScope.showAddAttachmentPopup = false;
    $scope.callAddAttachmentPopup = function () {
        $rootScope.showAddAttachmentPopup = true;
    }
    $rootScope.showAddAttachmentPopup = false;//ONLY FOR DEMO
    $rootScope.showAddAttachmentPopupHideCall = function (e) {
        $rootScope.contractQuickCreateRootCall = true;
    }
    $rootScope.showUploadExcelrootCall = false;//ONLY FOR DEMO
    $rootScope.onUploadlExcelHideRootCall = function (e) { //ONLY FOR DEMO
        $rootScope.showUploadExcelrootCall = false;
    };
    $scope.onUploadExcelShowRootCall = function (e) {
        $rootScope.showUploadExcelrootCall = true;
    };
    $scope.catPopUpShowRootCallback = function () {
        $rootScope.contractQuickCreateRootCall = false;
    }
    $scope.showFormBU = false;
    $scope.showFormBU2 = false;
    $scope.showFormC2 = false;

    // B-C-R Data

    $rootScope.businessUnitRootData = [
			  {
			      "name": "Business unit 0",
			      "check": false,
			      "value": [
                    {
                        "name": "Business unit child-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-2",
                              "check": false
                          }
                        ]
                    },
                    {
                        "name": "Business unit child-1-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-1-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-2",
                              "check": false
                          }
                        ]
                    }
			      ]
			  },
			  {
			      "name": "Business unit 1",
			      "check": false,
			      "value": [
                    {
                        "name": "Business unit child-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-2",
                              "check": false
                          }
                        ]
                    },
                    {
                        "name": "Business unit child-1-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-1-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1-2",
                              "check": false
                          }
                        ]
                    }
			      ]
			  },
			  {
			      "name": "Business unit 2",
			      "check": false,
			      "value": [
                    {
                        "name": "Business unit child-0",
                        "check": false,
                        "value": [
                          {
                              "name": "Business unit grand-child-0",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-1",
                              "check": false
                          },
                          {
                              "name": "Business unit grand-child-2",
                              "check": false
                          }
                        ]
                    }
			      ]
			  }
    ];
    $rootScope.showFormRootBU = false;
    $rootScope.businessUnitDatainitialDisplayRootText = 'Choose Business Unit';
    $rootScope.categoryRootData = [
      {
          "name": "Category 0",
          "check": false,
          "value": [
            {
                "name": "Category child-0",
                "check": false,
                "value": [
				  {
				      "name": "Category grand-child-0",
				      "check": false
				  },
				  {
				      "name": "Category grand-child-1",
				      "check": false
				  },
				  {
				      "name": "Category grand-child-2",
				      "check": false
				  }
                ]
            }
          ]
      },
      {
          "name": "Category 1",
          "check": false,
          "value": [
            {
                "name": "Category child-0",
                "check": false,
                "value": [
				  {
				      "name": "Category grand-child-0",
				      "check": false
				  },
				  {
				      "name": "Category grand-child-1",
				      "check": false
				  },
				  {
				      "name": "Category grand-child-2",
				      "check": false
				  }
                ]
            }
          ]
      },
      {
          "name": "Category 2",
          "check": false,
          "value": [
            {
                "name": "Category child-0",
                "check": false,
                "value": [
				  {
				      "name": "Category grand-child-0",
				      "check": false
				  },
				  {
				      "name": "Category grand-child-1",
				      "check": false
				  },
				  {
				      "name": "Category grand-child-2",
				      "check": false
				  }
                ]
            }
          ]
      }
    ];
    $rootScope.showFormRootC = false;
    $rootScope.categoryDatainitialDisplayRootText = 'Choose Category';
    $rootScope.showRegionRoot = false;
    $rootScope.RegionDatainitialDisplayRootText = 'Choose Region';
    $rootScope.regionRootData = [{
        "name": "Asia",
        "value": [
                {
                    "name": "India",
                },
                {
                    "name": "Japan",
                },
                {
                    "name": "Nepal",
                }

        ]
    }];

    // Start: Upload popup
    $scope.addDocumentPoupUrl = "shared/popup/views/popupUploadDoc.html";
    $scope.addDocumentPopup = false;
    $scope.attachFlag = false;
    $scope.hideDownloadTemplate = false;
    $scope.showDownloadMasterData = false;

    $scope.addDocumentPopupCallback = function (e) {
        uploadPopupCallback('scannedImg');
    }
    $scope.attachmentList = [];
    function uploadPopupCallback(obj) {
        if (obj == 'scannedImg') {
            $scope.attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
		    <br />Limited to file(s) of 5MB each.\
		    <br /> Maximum 5 files can be uploaded.";
            $scope.attchmentMsg = $sce.trustAsHtml($scope.attachmentMsg);

            $scope.uploadTitleContent = "Upload Files";
            $scope.uploadTitle = "UPLOAD INVOICES";
            $scope.attachmentButtonName = "Upload";
            $scope.hideDownloadTemplate = false;
            $scope.showDownloadMasterData = false;

            $scope.attachmentList = [{
                name: "AttachmentOne.xls",
                status: "fail",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
            }, {
                name: "AttachmentTwo.xls",
                status: "fail",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
            }, {
                name: "AttachmentThree.xls",
                status: "fail",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
            }, {
                name: "AttachmentFour.xls",
                status: "success",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
            }, {
                name: "AttachmentFive.xls",
                status: "success",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: true
            }];

            $timeout(function () {
                $scope.addDocumentPopup = true;
            });
        }
        else if (obj == 'uploadDoc') {
            $scope.attachmentMsg = "Make sure that the image name is same as the invoice's supplier invoice number.\
            <br />Supported file formats: zip, rar (containing .pdf, .jpg, .jpeg, .png, .tiff, .bmp, .gif).\
		    <br />Limited to 1 file of 100MB.";
            $scope.attchmentMsg = $sce.trustAsHtml($scope.attachmentMsg);

            $scope.uploadTitleContent = "Upload Document";
            $scope.uploadTitle = "UPLOAD SCANNED DOCUMENTS";
            $scope.attachmentButtonName = "Done";
            $scope.hideDownloadTemplate = true;
            $scope.showDownloadMasterData = false;

            $scope.attachmentList = [{
                name: "Attachment.zip",
                status: "success",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: true
            }];

            $timeout(function () {
                $scope.addDocumentPopup = true;
            });
        }
        else if (obj == 'uploadExcel') {
            $scope.attachmentMsg = "The file should be in the template provided.\
            <br />Supported file formats: .xls, .xlsx.\
		    <br />Limited to 1 file of 2MB.";
            $scope.attchmentMsg = $sce.trustAsHtml($scope.attachmentMsg);

            $scope.uploadTitleContent = "Upload Document";
            $scope.uploadTitle = "UPLOAD UPDATED EXCEL";
            $scope.attachmentButtonName = "Done";
            $scope.hideDownloadTemplate = true;
            $scope.showDownloadMasterData = true;

            $scope.attachmentList = [{
                name: "Attachment.xls",
                status: "success",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: true
            }];

            $timeout(function () {
                $scope.addDocumentPopup = true;
            });
        }
    }

    $scope.hideAddDocumentPopupCallback = function (e) {
        $scope.addDocumentPopup = false;
        $scope.attachFlag = false;
    };

    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;

        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function (el) {
        el.isShow = false;

    };
    $scope.retryCall = function (el) {
        el.status = "success";
    };
    
    
    /*----------------------------------------------------------------------------------------------------------*/
    $scope.newNode = {
        "docName": "Buyer_198798_Master Data Template",
        "docStatus": "Success",
        "isdocSelected": false,
        "catalogType": "1 Invoices Processed",
        "docType": "invoiceExcel",
        "docLink": "p2p.inv.excel",
        "actions": [
          {
              "key": "Upload Scanned Documents",
              "value": ""
          },
          {
              "key": "Download Result File",
              "value": ""
          }
        ],
        "attributes": [
          {
              "datakey": "Buyer Name",
              "value": "John Cena"
          },
          {
              "datakey": "Request Time",
              "value": "Feb 9 2017, 12:30 PM"
          },

          {
              "datakey": "Completion Time",
              "value": "Feb 9 2017, 12:45 PM"

          }
        ]
    };

    $scope.onUploadlExcelShowCall = function (e) {
        $rootScope.showUploadExcelrootCall = true;
    };
    $scope.onUploadlExcelHideCall = function (e) {
        $rootScope.showUploadExcelrootCall = false;
    };

    /*----------------------------------------------------------------------------------------------------------*/
    // End: Add guideline popup	

    /* FILTER POPOVER in TEMPLATE POPUP STARTS */
    $scope.closePopOver = function () {
        angular.element(document).triggerHandler('click');
    };
    /* FILTER POPOVER in TEMPLATE POPUP ENDS */

    /* scanned invoice landing page */

    /*scanned invoice */
    $scope.pdfScale = 1.0;


    $scope.pageLoaded = function (curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };

    $scope.loadProgress = function (loaded, total, state) {

    };
    /*scanned invoice */

    $scope.scannedInviocePreview = null;
    $scope.previewCurrentScannedInvoice = function (index) {
        $scope.scannedInviocePreview = index;

    };

    $scope.gotoBackscannedInvoiceList = function () {
        $scope.scannedInviocePreview = null;

    };

    $scope.previous = function (getCurrent) {
        if (0 < getCurrent) {
            $scope.scannedInviocePreview = getCurrent - 1;
        }
    };

    $scope.next = function (getCurrent, totalArray) {
        var totalArr = totalArray.length - 1;
        if (totalArr > getCurrent) {
            $scope.scannedInviocePreview = getCurrent + 1;

        }
    };

    $scope.createInvoice = function () {
        $state.go('p2p.inv.scanned');
    };

    $scope.spendSubFilterOpts = [
		{ "title": "Shared Reports", "type": "sharedReports" },
		{ "title": "My Reports", "type": "myReports" },
    ];
    $scope.spendSubFilterSelected = { "title": "Shared Reports", "type": "sharedReports" };
    //LEFT PANEL FILTER JS
    $scope.isAllFilterSelected = true;
    var landingFilterListOfStatus = [
        {
            "filterBy": "Draft",
            "name": "Draft",
            "iconID": "#icon_Draft",
            "itemCount": '99+',
            "isSelected": false
        },
        {
            "filterBy": "Draft Withdrawn",
            "name": "Draft Withdrawn",
            "iconID": "#icon_DraftWithdrawn",
            "itemCount": '3',
            "isSelected": false
        },
        {
            "filterBy": "Approval Pending",
            "name": "Approval Pending",
            "iconID": "#icon_ApprovalPending",
            "itemCount": '4',
            "isSelected": false
        },
        {
            "filterBy": "Rejected",
            "name": "Rejected",
            "iconID": "#icon_ApprovalRejected",
            "itemCount": '5',
            "isSelected": false
        },
        {
            "filterBy": "Closed",
            "name": "Closed",
            "iconID": "#icon_Close",
            "itemCount": '8',
            "isSelected": false
        }
    ];

    if ($scope.docType === "invoice") {

        var landingFilterListOfStatus = [
        {
            "filterBy": "MATCHED",
            "name": "MATCHED",
            "iconID": "#icon_Draft",
            "itemCount": '99+',
            "isSelected": false
        },
        {
            "filterBy": "EXCEPTION",
            "name": "EXCEPTION",
            "iconID": "#icon_DraftWithdrawn",
            "itemCount": '3',
            "isSelected": false
        },

        ];
    }

    if ($scope.docType === "spend_reports" || $scope.docType === "SHOULD COST ANALYSIS") {

    	var landingFilterListOfStatus = [
        {
        	"filterBy": "product",
        	"name": "Product",
        	"iconID": "#icon_product",
        	"itemCount": '2',
        	"isSelected": false
        }, 
        {
            "filterBy": "services",
            "name": "Services",
            "iconID": "#icon_services",
            "itemCount": '3',
            "isSelected": false
        } 
        // {
        // 	"filterBy": "services",
        // 	"name": "Services",
        // 	"iconID": "#icon_supplier",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "product",
        // 	"name": "Product",
        // 	"iconID": "#icon_Projects",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "product",
        // 	"name": "Product",
        // 	"iconID": "#icon_P2P",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "services",
        // 	"name": "Services",
        // 	"iconID": "#icon_Spend",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "product",
        // 	"name": "Product",
        // 	"iconID": "#icon_CrossCube",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // }
    	];
    }


    if ($scope.docType === "spend_reports") {

    	var landingFilterListOfStatus = [
        {
        	"filterBy": "product",
        	"name": "Product",
        	"iconID": "#icon_product",
        	"itemCount": '2',
        	"isSelected": false
        }, 
        {
            "filterBy": "services",
            "name": "Services",
            "iconID": "#icon_services",
            "itemCount": '3',
            "isSelected": false
        } 
        // {
        // 	"filterBy": "services",
        // 	"name": "Services",
        // 	"iconID": "#icon_supplier",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "product",
        // 	"name": "Product",
        // 	"iconID": "#icon_Projects",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "product",
        // 	"name": "Product",
        // 	"iconID": "#icon_P2P",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "services",
        // 	"name": "Services",
        // 	"iconID": "#icon_Spend",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // },
        // {
        // 	"filterBy": "product",
        // 	"name": "Product",
        // 	"iconID": "#icon_CrossCube",
        // 	"itemCount": '3',
        // 	"isSelected": false
        // }
    	];
    }

    if ($scope.docType === "supplier") {

        var landingFilterListOfStatus = [
        {
            "filterBy": "Approved",
            "name": "Approved",
            "iconID": "#icon_Approved",
            "itemCount": '99',
            "isSelected": false
        },
        {
            "filterBy": "Disqualified",
            "name": "Disqualified",
            "iconID": "#icon_Disqualified",
            "itemCount": '3',
            "isSelected": false
        },
        {
            "filterBy": "Identified",
            "name": "Identified",
            "iconID": "#icon_Identified",
            "itemCount": '3',
            "isSelected": false
        },
        {
            "filterBy": "Invited",
            "name": "Invited",
            "iconID": "#icon_Invited",
            "itemCount": '3',
            "isSelected": false
        },
         {
             "filterBy": "Registered",
             "name": "Registered",
             "iconID": "#icon_Registered",
             "itemCount": '3',
             "isSelected": false
         },
          {
              "filterBy": "Waitlisted",
              "name": "Waitlisted",
              "iconID": "#icon_Waitlisted",
              "itemCount": '3',
              "isSelected": false
          }
        ];
    }

    if ($scope.docType === "procProfile") {
        var landingFilterListOfStatus = [
             {
                 "filterBy": "ACTIVE",
                 "name": "ACTIVE",
                 "iconID": "#icon_Active",
                 "itemCount": '99+',
                 "isSelected": false
             },
        {
            "filterBy": "INACTIVE",
            "name": "INACTIVE",
            "iconID": "#icon_Inactive",
            "itemCount": '3',
            "isSelected": false
        }
        ]
    }

    var landingFilterListOfDocType = [
          {
              "filterBy": "requisition",
              "name": "Requisition",
              "iconID": "#icon_Requisition",
              "itemCount": '4',
              "isSelected": false
          },
        {
            "filterBy": "order",
            "name": "Purchase Order",
            "iconID": "#icon_Order",
            "itemCount": '1',
            "isSelected": false
        },
        {
            "filterBy": "Catalog",
            "name": "Catalog",
            "iconID": "#icon_Catalog",
            "itemCount": '4',
            "isSelected": false
        },
        {
            "filterBy": "punchout",
            "name": "Punchout",
            "iconID": "#icon_PunchOut",
            "itemCount": '1',
            "isSelected": false
        },
        {
            "filterBy": "supplier",
            "name": "Supplier",
            "iconID": "#icon_Supplier",
            "itemCount": '3',
            "isSelected": false
        },
        {
            "filterBy": "contract",
            "name": "Contract",
            "iconID": "#icon_Contract",
            "itemCount": '2',
            "isSelected": false
        },
        {
            "filterBy": "project",
            "name": "Project",
            "iconID": "#icon_projects",
            "itemCount": '5',
            "isSelected": false
        },
        {
            "filterBy": "RFX",
            "name": "RFX",
            "iconID": "#icon_RFX",
            "itemCount": '4',
            "isSelected": false
        }
    ];
    if ($scope.Pagefor === 'task' || $scope.docType === 'recent_documents') {
        $scope.landingFilterList = landingFilterListOfDocType;
    }
    else {
        $scope.landingFilterList = landingFilterListOfStatus;
    }

    $scope.isActive = false;
    $scope.activeButton = function () {
        $scope.isActive = !$scope.isActive;
    }


    $scope.filteredData = [];
    $scope.currentFilterApplied = '';
    $scope.filteByStatusClicked = function (index, obj) {
        //$scope.isApplyFilters = true;
        $scope.currentFilterApplied = obj.name;
        $scope.bandHeight = 0;
        $scope.filteredData = [];
        $scope.doclists = $scope.AllReqData;
        for (var i = 0; i < $scope.landingFilterList.length; i++) {
            $scope.landingFilterList[i].isSelected = false;
        }
        $scope.isAllFilterSelected = false;
        $scope.ShowCheckboxs = false;
        $scope.landingFilterList[index].isSelected = true;


        if ($scope.Pagefor === 'task' || $scope.docType === 'recent_documents') {
            for (var i = 0; i < $scope.doclists.length; i++) {
                if ($scope.doclists[i].docType == obj.filterBy) {
                    $scope.filteredData.push($scope.doclists[i]);
                }
            }
        }
        else if ($scope.docType === 'spend_reports') {
        	var temp = [];
        	for (var i = 0; i < $scope.doclists.length; i++) {
        		if ($scope.doclists[i].reportType == $scope.spendSubFilterSelected.type) {
        			temp.push($scope.doclists[i]);
        		}
        	}

        	for (var i = 0; i < temp.length; i++) {
        		if (temp[i].group == obj.filterBy) {
        			$scope.filteredData.push(temp[i]);
        		}
        	}
        }
        else {
            for (var i = 0; i < $scope.doclists.length; i++) {
                if ($scope.doclists[i].docStatus == obj.filterBy) {
                    $scope.filteredData.push($scope.doclists[i]);
                }
            }
        }


        $scope.doclists = $scope.filteredData;
    }
    $scope.filterByReportType = function (obj) { 
    	$scope.spendSubFilterSelected = obj;
    	$scope.filteredData = [];
    	$scope.doclists = $scope.AllReqData;
    
    	for (var i = 0; i < $scope.doclists.length; i++) {
    		if ($scope.doclists[i].reportType == obj.type) {
    			$scope.filteredData.push($scope.doclists[i]);
    		}
    	}

    	for (var i = 0; i < $scope.landingFilterList.length; i++) {
            var countStatus = 0;
            for (var j = 0; j < $scope.filteredData.length; j++) {
            	if ($scope.landingFilterList[i].filterBy == $scope.filteredData[j].group) {
            		countStatus++;
            	}
            }

			$scope.landingFilterList[i].itemCount = countStatus;
            if (countStatus > 99) {
                $scope.landingFilterList[i].itemCount = '99+';
            }
		}

    	$scope.doclists = $scope.filteredData;
		$scope.dataLength = $scope.doclists.length;
        //$scope.tabsData[obj.tabId].dataLength =  $scope.doclists.length;
    }

    $scope.allFilterClicked = function () {
        $scope.doclists = [];
        $scope.doclists = $scope.AllReqData;
        for (var i = 0; i < $scope.landingFilterList.length; i++) {
            $scope.landingFilterList[i].isSelected = false;
        }
        $scope.isAllFilterSelected = true;
        $scope.bandHeight = 0;
        $scope.currentFilterApplied = '';
    }
    $scope.filterResetWarningCall = function () {
        var config = {
            type: "warning",
            message: "<div class='left-align'>All filters applied will be reset.</div>",
            buttons:
				[
					{ "title": "PROCEED", "result": "proceed" },
					{ "title": "CANCEL", "result": "cancel" }
				]
        }
        notification.notify(config, function (response) {
            if (response.result == 'proceed') {
                $scope.allFilterClicked();
                $scope.isApplyFilters = false;
                $scope.bandHeight = 0;
                $scope.isFilteredFromMain = false;
            }
        });
    }

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
    $scope.hideDateRow = false;
    $scope.onChangeFilterType = function (conditionOp) {
        if (conditionOp.name == "Between") {
            $scope.operatorRange = true;
            $scope.hideDateRow = true;
        }
        else {
            $scope.operatorRange = false;
            $scope.hideDateRow = false;
        }
    };

    $scope.defaultSelectedOperator = '';
    //$scope.operatorValue = "Value";
    $scope.operatorsList = [
        { 'name': 'Greater than' },
        { 'name': 'Greater than equals to' },
        { 'name': 'Less than' },
        { 'name': 'Less than equals to' },
        { 'name': 'Equal' },
        { 'name': 'Not equal to' },
        { 'name': 'Between' },
	    { 'name': 'Is Null' },
	    { 'name': 'Is Not Null' }];
    
    $scope.errors = [
        {
            "numOfErrors": 33443,
            "supCode": 0,
            "contact": "cincinnatibell.admin@gep.com"
        },
        {
            "numOfErrors": 33444,
            "supCode": 0,
            "contact": "cincinnatibell.admin@gep.com"
        },
        {
            "numOfErrors": 33445,
            "supCode": 0,
            "contact": "cincinnatibell.admin@gep.com"
        },
        {
            "numOfErrors": 33446,
            "supCode": 0,
            "contact": "cincinnatibell.admin@gep.com"
        },
        {
            "numOfErrors": 33447,
            "supCode": 0,
            "contact": "cincinnatibell.admin@gep.com"
        }
    ];

/*share popup for procurementProfile*/
	    /*share popup*/
        $scope.showShareWithPopup = false;
        $scope.showShareWithPopupFunc = function (e) {
            $scope.showShareWithPopup = true;
        }
        $scope.shareWithOnHideCallback = function (e) {
            $scope.showShareWithPopup = false;

        };

        $scope.shareWithConfig = [
        {
            "teamMemberId": 1,
            "title": "John Doe",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.young@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": true
        },
        {
            "teamMemberId": 2,
            "title": "Smith Johnson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "smith.johnson@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Team Lead PO",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "teamMemberId": 3,
            "title": "Brown Williams",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "brown.williams@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "teamMemberId": 4,
            "title": "Davis Miller",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "davis.miller@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Chief Category Officer",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "teamMemberId": 5,
            "title": "Wilson Moore",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "wilson.moore@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Resourcing Specialist",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jones Taylor",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jones.taylor@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Thomas Anderson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "thomas.anderson@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Director",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jackson White",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jackson.white@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Procurement Specialist",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Martin Harris",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "martin.harris@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Procurement Operations Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Garcia Thompson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "garcia.thompson@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Martinez Robinson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "martinez.robinson@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Clark Rodriguez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "clark.rodriguez@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Service Delivery Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Lewis Walker",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "lewis.walker@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Allen Lee",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "allen.lee@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Strategic Procurement Lead",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Young Hernandez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "young.hernandez@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Scott Hall",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "scott.hall@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Wright King",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "wright.king@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Corporate Procurement Lead",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Green Lopez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "green.lopez@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Programme Lead",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Adams Hill",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "adams.hill@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Nelson Baker",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "nelson.baker@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Category Sourcing Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Hannah Carter",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "hannah.carter@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Procurement Team Lead",
            "preAdd": false,
            "isPrimary": false

        },
        {
            "title": "Sarah Thompson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "sarah.thompson@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Principal Delivery Consultant",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Michael Steven",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "michael.steven@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jacob Christopher",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jacob.christopher@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "University Purchasing Consultant",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Tyler Jason",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "tyler.jason@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Daniel Moore",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "daniel.moore@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "HR Manager - Procurement",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Matthew Kenneth",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "matthew.kenneth@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Ryan Johnson",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "ryan.johnson@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jordan Daniel",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jordan.daniel@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Sourcing Manager",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Jake William",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jake.william@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Courtney Mitchell",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "courtney.mitchell@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Assistant Manager",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Sierra Perez",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "sierra.perez@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Nicholas Roberts",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "nicholas.roberts@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Account Records Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Cody Turner",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "cody.turner@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Steven Phillips",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "steven.phillips@gep.com",
            "phone": "+1-202-555-0151",
            "designation": "Operations Chief",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Gabriel Campbell",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "gabriel.campbell@gep.com",
            "phone": "+1-202-555-0137",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Alexander Parker",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "alexander.parker@gep.com",
            "phone": "+1-202-555-0147",
            "designation": "Inventory Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Jeremy Evans",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "jeremy.evans@gep.com",
            "phone": "+1-202-555-0191",
            "designation": "Assistant Manager",
            "preAdd": false,
            "isPrimary": false
        },
        {
            "title": "Gavin Edwards",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "gavin.edwards@gep.com",
            "phone": "+1-202-555-0109",
            "designation": "Procurement Marketing Manager",
            "preAdd": true,
            "isPrimary": false
        },
        {
            "title": "Amy Collins",
            "check": false,
            "highlight": false,
            "coAuthor": false,
            "evaluator": false,
            "email": "amy.collins@gep.com",
            "phone": "+1-202-555-0114",
            "designation": "Administrative Manager",
            "preAdd": true,
            "isPrimary": false
        }

        ];

    /*mark this Defualt function*/
        $scope.markThisDefualt = function (index) {
            angular.forEach($scope.doclists, function (value, key) {
                if (key == index && value.isDefualt == false)
                    value.isDefualt = true;
                else
                    value.isDefualt = false;
            });

        }

    /*procurment link*/
        $scope.docCreationlink ='';
        if ($scope.docType == 'catalog') {
            $scope.docCreationlink = 'catalog.admincatalog.new'
        }
        else {
            $scope.docCreationlink = 'p2p.procProfile.new'
        }

        var tempZindex = angular.element(".lean-overlay").css("z-index");
        $scope.onIntroOkGotIt = function(){
            angular.element(".introjsButtonOverlay").hide();
            angular.element('body').css({"overflow" : "auto"});
            angular.element(".lean-overlay").css({"z-index": tempZindex});
            $(".searchbox-li .searchWithHiddenTextField").css({"background-color": "#0067b0"});
            ngIntroService.intro.exit();
        }

        function startIntro(){
            
            var dotElem = document.createElement("div"),
            lineElem = document.createElement("div"),
            helperNumber = document.createElement("span"),
            body = document.getElementsByTagName("body")[0],
            introjsButtonOverlay = document.getElementsByClassName("introjsButtonOverlay")[0];

            lineElem.appendChild(dotElem);
            dotElem.className = "introjs-helperLayer-dot";

            //console.log("startIntro");
            //console.log(document.querySelectorAll('.collection-item.avatar.collection-item--animate')[0]);

            $scope.introSteps = [
                  {
                      element: document.querySelector('.extra-nav-title--back'),
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      linePosition : "positionBottom",
                      highlightClass: 'firstStep',
                      tooltipClass : "tooltipBottomRight"
                  },
                  {
                      //element: document.querySelector('.searchWithHiddenTextField a'),
                      element : $(".searchbox-li")[0],
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      linePosition : "positionBottom",
                      highlightClass: 'secondStep',
                      tooltipClass : "tooltipBottomLeft"
                  },
                  {
                      element: document.querySelector('.waves-circle.waves-effect.waves-light.dropdown-button'),
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      linePosition : "positionBottom",
                      highlightClass: 'firstStep',
                      tooltipClass : "tooltipBottomLeft"
                  },
                  {
                      element: document.querySelector('.waves-circle.white-text.waves-effect.waves-light'),
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      linePosition : "positionBottom",
                      highlightClass: 'firstStep',
                      tooltipClass : "tooltipBottomLeft"
                  },
                  {
                      element: document.querySelector('.landingPageAction'),
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      linePosition : "positionBottom",
                      highlightClass: 'firstStep',
                      tooltipClass : "tooltipBottomLeft"
                  },
                  {
                      element: document.querySelectorAll('.collection-item.avatar.collection-item--animate')[0],
                      //element : $(".collection-item.avatar.collection-item--animate")[0],
                      //element : ".collection-item.avatar.collection-item--animate",
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      highlightClass: 'sixthStep',
                      linePosition : "positionBottom",
                      tooltipClass : "tooltipStepSix",
                      showElementAfterAnimation : true,
                  },
                  {
                      element: document.querySelectorAll('.collection-item.avatar.collection-item--animate > .secondary-content')[0],
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      highlightClass: 'seventhStep',
                      linePosition : "positionBottom",
                      tooltipClass : "tooltipBottomLeft",
                  },
                  {
                      element: document.querySelector('.sidebar-btn.white-text'),
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      highlightClass: 'eightStep',
                      linePosition : "positionTop",
                      tooltipClass : "tooltipTopRight",
                      showElementAfterAnimation : true,
                      callback : function(){
                            angular.element(".landingPageSidebar").css({opacity : 1});
                        }
                  },
                  {
                      element: document.querySelectorAll('.home-page.hide-on-down.fixed-action-btn')[0],
                      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      highlightClass: 'ninethStep',
                      linePosition : "positionTop",
                      tooltipClass : "tooltipTopLeft"
                  },

            ];
            
            ngIntroService.clear();
            ngIntroService.setOptions({
                steps: $scope.introSteps,
                disableInteraction : true,
                nextLabel : ">",
                prevLabel : "<",
                scrollToElement : false,
                showBullets : false,
                showStepNumbers : true,
                keyboardNavigation : true,
                exitOnOverlayClick : false,
                exitOnEsc : false
            });

            ngIntroService.onAfterChange(function(targetElement) {
                if(ngIntroService.intro._currentStep+1 == 8)
                {
                    angular.element(".introjs-helperLayer")[0].innerHTML = angular.element(".sidebar-btn.white-text")[0].innerHTML;
                    angular.element(".introjs-helperLayer")[0].children[0].className += " landingPageSidebar white-text";
                    angular.element(".landingPageSidebar").css({opacity : 0});
                }
                else
                    angular.element(".introjs-helperLayer")[0].innerHTML = '';
                  if(ngIntroService.intro._currentStep == 8)
                  {
                        introjsButtonOverlay.style.right = "unset";
                        introjsButtonOverlay.style.left = "0px";
                  }
                  else
                  {
                        introjsButtonOverlay.style.left = "unset";
                        introjsButtonOverlay.style.right = "0px";
                  }
                  /*if(ngIntroService.intro._currentStep == 1)
                  {
                        $(".searchbox-li .searchWithHiddenTextField").css({"background-color": "transparent"});
                  }
                  else
                  {
                        $(".searchbox-li .searchWithHiddenTextField").css({"background-color": "#0067b0"});
                  }*/
                  document.getElementsByClassName("introjs-helperLayer")[0].appendChild(lineElem);
                  document.getElementsByClassName("introjs-tooltipbuttons")[0].insertBefore(helperNumber, document.getElementsByClassName("introjs-nextbutton")[0]);
                  helperNumber.innerHTML = ngIntroService.intro._currentStep+1 + " / " + $scope.introSteps.length;
                  document.getElementsByClassName("introjs-helperNumberLayer")[0].style.display = "none";
            });

            ngIntroService.onChange(function(){
                lineElem.className = "introjs-helperLayer-line " + $scope.introSteps[ngIntroService.intro._currentStep].linePosition;
                if(ngIntroService.intro._currentStep == 8)
                  {
                        angular.element(".fixed-action-btn, .goTop .fixed-action-btn").css({"transition" : "unset"});
                  }
                  else
                  {
                        angular.element(".fixed-action-btn, .goTop .fixed-action-btn").css({"transition" : "1s all"});
                  }
            });

            ngIntroService.onExit(function() {
              body.style.overflow = "auto";
              introjsButtonOverlay.style.display = "none";
              lineElem = null;
              helperNumber = null;
              angular.element(".lean-overlay").css({"z-index": tempZindex});
              $(".searchbox-li .searchWithHiddenTextField").css({"background-color": "#0067b0"});
            });
            body.style.overflow = "hidden";
            
            $(".searchbox-li .searchWithHiddenTextField").css({"background-color": "transparent"});
            introjsButtonOverlay.style.display = "block";
            ngIntroService.start();
        };

        $scope.showIntro = true;
        $scope.onDontShowIntro = function(){
            $scope.showIntro = !$scope.showIntro;
            if(!$scope.showIntro)
            {
                storeService.set("SmartCoachSwitch", false);
                var infoConfig = {
                    type: "inform",
                    message: "You can still access Smart Coach from Help Section.",
                    buttons: [
                        {
                            "title": "CLOSE",
                            "result": true
                        }
                    ]
                };

                notification.notify(infoConfig, function (response) {
                    if (response.result) {
                        console.log("here")
                    }
                });
            }
            else
            {
                storeService.set("SmartCoachSwitch", true);
            }
            $rootScope.$broadcast("updateSmartCoachSwitch");

            angular.element(".lean-overlay").css({"z-index": 100000000});
            $timeout(function(){
                angular.element(".notify-information").css({"z-index": 1000000001});
            },500);
        }

        console.log(storeService.get("SmartCoachSwitch"))
        // if(storeService.get("SmartCoachSwitch"))
        // {
        //     var intrvl = $interval(function(){
        //         if(document.querySelectorAll('.collection-item.avatar.collection-item--animate')[0])
        //         {
        //             startIntro();
        //             $interval.cancel(intrvl);
        //         }
        //     }, 1000);
        // }
};

function popupManageFieldCtrlFunc($scope, $rootScope, $filter) {
    var dataForAttr = [
                { "title": "No. of Items", 'value': true },
                { "title": "Amount(USD)", 'value': true },
                { "title": "Created By", 'value': true },
                { "title": "Created On", 'value': true }
    ];

    if ($scope.Pagefor === "manage" && $scope.docType === "order" && $scope.selectedTab == 1) {
        dataForAttr = [
                { "title": "Order Number", 'value': true },
                { "title": "Status", 'value': true },
                { "title": "Supplier", 'value': true },
                { "title": "Order Total", 'value': true },
                { "title": "Created On", 'value': true },
                { "title": "Sent On", 'value': true },
                { "title": "Purchase Type", 'value': true },
                { "title": "Order Contact", 'value': true }
        ];
    }
    else if ($scope.Pagefor === "manage" && $scope.docType === "order" && $scope.selectedTab == 2) {
        dataForAttr = [
                  { "title": "Supplier Item Number", 'value': true },
                  { "title": "Line Receiving Status", 'value': true },
                  { "title": "Line Invoicing Status", 'value': true },
                  { "title": "Order Number", 'value': true },
                  { "title": "Line Number", 'value': true },
                  { "title": "Order Status", 'value': true },
                  { "title": "Supplier", 'value': true },
                  { "title": "Category", 'value': true },
                  { "title": "Unit Price", 'value': false },
                  { "title": "Line Total USD", 'value': false },
                  { "title": "Need by Date", 'value': false }
        ];

    }
    else if ($scope.Pagefor === "task") {
        dataForAttr = [
                 { "title": "Supplier Item Number", 'value': true },
                 { "title": "Line Receiving Status", 'value': true },
                 { "title": "Line Invoicing Status", 'value': true },
                 { "title": "Order Number", 'value': true },
                 { "title": "Line Number", 'value': true },
                 { "title": "Order Status", 'value': true },
                 { "title": "Supplier", 'value': true },
                 { "title": "Category", 'value': true },
                 { "title": "Unit Price", 'value': false },
                 { "title": "Line Total USD", 'value': false },
                 { "title": "Need by Date", 'value': false }
        ];
    };


    $scope.attributes = dataForAttr;
    $scope.isSelectAll = true;


    $scope.selectedAttributes = [];
    $scope.scrolled = false;
    $scope.getScroll = function (e) {

        $scope.scrolled = true;

    };


    $scope.onChange = function (selectedAttributes) {
        $scope.selectedAttributes.push({ "title": selectedAttributes });
        var foundItem = $filter('filter')(dataForAttr, { title: selectedAttributes }, true)[0];
        dataForAttr[dataForAttr.indexOf(foundItem)].value = !dataForAttr[dataForAttr.indexOf(foundItem)].value;
    };

    var makeIsSaveViewModifiedValue;
    $scope.$on('checkApplyFilter', function (event, data) {

        if (data.checkfilter == true) {
            makeIsSaveViewModifiedValue = true
        }
    });

    $scope.applyChanges = function () {
        $scope.$emit('applyModification', { 'makeIsSaveViewModified': makeIsSaveViewModifiedValue });

    };

    $scope.resetChanges = function () {
        for (incre = 0; incre < dataForAttr.length; incre++) {
            if (dataForAttr[incre].value)
                dataForAttr[incre].value = false;
        }
        $scope.isSelectAll = false;
    };
    ngIntroService.clear();
    ngIntroService.intro.exit();
};

