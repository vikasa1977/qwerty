'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pIRCtrl
 * @description
 * Controller of P2P Invoice reconciliation.
 */
    .controller('commonComponentsCtr', ['$scope', '$timeout', 'notification', '$state', '$sce', commonComponentsFunc])

/**
 * @ngdoc method
 * @name p2pIRCtrlFunc
 * @methodOf SMART2.controller:p2pIRCtrl
 * @description
 * The method of the p2pIRCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function commonComponentsFunc($scope, $timeout, notification, $state, $sce) {


    $scope.supplierList = [
        { "name": "British Gas", "primary": true },
        { "name": "British Gas", "primary": true },
        { "name": "EDF Energy", "primary": true },
        { "name": "EDF Energy", "primary": true },
        { "name": "E-On", "primary": true },
        { "name": "E-On", "primary": true },
        { "name": "N-Power", "primary": true },
        { "name": "N-Power", "primary": true }
    ];

    $scope.changeOnPrimary = function (selectedContact) {
        angular.forEach($scope.supplierList, function (contact) {
            if (selectedContact.name !== contact.name) {
                contact.primary = false;
            }

        });
    }

    $scope.supplierPortal = false;
    $scope.supplierPortalPopupUrl = "shared/popup/views/popupSelectSupplierPortal.html";
    $scope.selectSupplierPortalCall = function () {
        $scope.supplierPortal = true;
    }
    $scope.onHideSelectSupplierPortalCall = function (e) {
        $scope.supplierPortal = false;
    }
        // popup create Order
        $scope.createOrderPopupTemp = "p2p/shared/views/popupCreateOrder.html";

        $scope.createOrderPopup = false;
        $scope.createOrderPopupCallback = function (e) {
            $scope.createOrderPopup = true;
        };

        $scope.createOrderPopupHideCallback = function () {
            $scope.createOrderPopup = false;
        };
       
        $scope.selectedSupplierOptions = [
		{
            "id": "0",
            "name": "PC-2014.000001 :: Evertek"
        },{
            "id": "1",
            "name": "PC-2014.000002 :: Quanta"
        },{
             "id": "2",
             "name": "PC-2014.000003 :: fastenal"
         },{
            "id": "3",
            "name": "PC-2014.000004 :: bestbuy"
        }];
        $scope.selectedSupplier = { "id": "0", "name": "PC-2014.000001 :: Evertek" };
        $scope.onSelectedSupplierChange = function (selectedSupplier) {
            $scope.orderingSupDisable = false;
            $scope.autoOrderingLocCompleteData.orderingLocation = 'Mumbai';
        };
        $scope.orderingSupDisable = true;
        $scope.autoOrderingLocCompleteData = { "orderingLocation": "" };
        $scope.onOrderingSupChange = function (e) {
            //  Textfield's value can be found in e.data[0].value
            //  See console for more
            $scope.OrderingDataOptions = [
                {
                    "orderingLocation": "Mumbai ",
                   
                },
            {
                    "orderingLocation": "Mumbai ",
                   
            },
              {
                  "orderingLocation": "Mumbai ",
                   
              },
            {
                    "orderingLocation": "Mumbai ",
                   
            }
                , {
                    "orderingLocation": "New York"
                }, {
                    "orderingLocation": "SR "
                }
            ];
        };
        $scope.onOrderingSupSelect = function (autoOrderingLocCompleteData) {
            console.log(autoOrderingLocCompleteData);
            //   autoCompleteData will be updated every time a new suggestion is chosen. Passing 'model' in 'onSelect' is optional.
        };
        //end script create order popup


        //send to buyer popup


	//comment popup.

        $scope.modules = [
			{ id: '0', name: 'REQUISITION', count: '3', number: 'REQ-2016.013110', url: 'requisition.html', isChecked: false },
			{ id: '2', name: 'ORDER', count: '4', number: 'ORD-2015.523209', url: 'order.html', isChecked: false },
			{ id: '3', name: 'INVOICE RECONCILIATION', count: '8', number: 'IR-2016.234829', url: 'invoice.html', isChecked: false },
        ]

        $scope.modulecurrentTab = 'requisition.html';
        $scope.moduleactiveListTabs = 0;
        $scope.modulesetActiveListTab = function (menuItema) {
        	$scope.moduleactiveListTabs = menuItema;
        	$scope.modulecurrentTab = $scope.modules[menuItema].url;
        }


        $scope.addAnnouncement = "shared/popup/views/popupAddAnnouncement.html";
        $scope.addAnnouncementPopup = false;
        $scope.isAddAnnouncementClicked = false;
        $scope.addAnnouncementPopupCallback = function (evt) {
            evt.preventDefault();
            $scope.isAddAnnouncementClicked = true;
            setTimeout(function () {
                $scope.isAddAnnouncementClicked = false;
                $scope.$apply();
            }, 2000);
        	$scope.addAnnouncementPopup = true;
        }
        $scope.addAnnouncementOnHideCallback = function (e) {
        	$scope.addAnnouncementPopup = false;
        }

        $scope.docDiscription = {
        	docName: "Upload Document",
        	fileSupport: "Supported file formats : Image , PDF, Word , Excel or  PPT Files.",
        	fileSize: "Limited to file(s) of 5MB each.",
        	fileLimit: "Maximum 5 files can be uploaded."
        }
        $scope.types = {
        	fileType: ".jpg, .jpg, .pdf, .docx"
        }
        $scope.icons = [
			{ name: "#icon_ActionPlan", title: "Action Plan" },
			{ name: "#icon_Invoice", title: "Invoice" },
			{ name: "#icon_Material", title: "Material" },
			{ name: "#icon_MaterialEdi", title: "Material Edit" },
			{ name: "#icon_MaterialPun", title: "Material Punchout" },
			{ name: "#icon_Services", title: "Services" },
			{ name: "#icon_ServicesEdi", title: "Services Edit" },
			{ name: "#icon_ServicesPun", title: "Services Punchout" },
			{ name: "#icon_Reports", title: "Reports" },
			{ name: "#icon_Annoucement", title: "Annoucement" },
			{ name: "#icon_ReqWorkbench", title: "Requisition Workbench" },
			{ name: "#icon_CategoryWor", title: "Category Workbench" },
			{ name: "#icon_Minimize", title: "Minimize" },
        ]

        $scope.goToTracksatusDetail = function (e) {
        	//$scope.$parent.trackStatusPopup = false;
        	//$state.go('trackstatus');
        	$scope.heightTrackStatus = '100%';
        	$scope.isFullscreen = !$scope.isFullscreen;
        }


        $scope.showCommentsPopupexpand = "expandCommentPopupCC";


        //manage column popup
        $scope.smartCatPopupMultiLevel = "shared/popup/views/smartCatPopupMultiLevel.html";
                $scope.manageColumnData = [
                {
                        "name": "Order Attribute",
                        "check": false,
                        "value": [
                                    {
                                    "name": "Order Name",
                                    "check": false,
                                    },
                                    {
                                    "name": "Revision Number",
                                    "check": false
                                    },
                                    {
                                    "name": "Signatory",
                                    "check": false
                                    },
                                    {
                                    "name": "Order Type",
                                    "check": false
                                    },
                                    {
                                    "name": "Order Number",
                                    "check": false
                                    },
                                    {
                                    "name": "Revision Number",
                                    "check": false
                                    }
                        ]
                        },
                        {
                        "name": "Line Attribute",
                        "check": false
                        },
                        {
                        "name": "Status",
                        "check": false
                        },
                        {
                        "name": "Dates",
                        "check": false
                        }
                ];
        $scope.manageColumnDatainitialDisplayText = 'Manage Column';

       // manage column popup end


        //send to buyer popup
        $scope.irSentToBuyer = "p2p/ir/views/popupIRSentToBuyer.html";

        $scope.irSentToBuyerPopup = false;
        $scope.irSentToBuyerCallback = function (e) {
            $scope.irSentToBuyerPopup = true;
        };

        $scope.irSentToBuyeOnHideCallback = function () {
            $scope.irSentToBuyerPopup = false;
        };


        
        //send to Receiver popup
        $scope.irSentToReceiver = "p2p/ir/views/popupIRSentToRcvr.html";

        $scope.irSentToReceiverPopup = false;
        $scope.irSentToReceiverCallback = function (e) {
            $scope.irSentToReceiverPopup = true;
        };

        $scope.irSentToReceiverOnHideCallback = function () {
            $scope.irSentToReceiverPopup = false;
        };

        //send to Requester popup
        $scope.irSentToRequester = "p2p/ir/views/popupIRSentToRequester.html";

        $scope.irSentToRequesterPopup = false;
        $scope.irSentToRequesterCallback = function (e) {
            $scope.irSentToRequesterPopup = true;
        };

        $scope.irSentToRequesterOnHideCallback = function () {
            $scope.irSentToRequesterPopup = false;
        };

        //Select Supplier popup
        $scope.selectSupplier = "p2p/ir/views/popupSelectSupplier.html";

        $scope.selectSupplierPopup = false;
        $scope.selectSupplierCallback = function (e) {
            $scope.selectSupplierPopup = true;
        };

        $scope.selectSupplierOnHideCallback = function () {
            $scope.selectSupplierPopup = false;
        };
	
		//comments popup----start
		//Select comments Popup
        var CommentPopupType;
        $scope.commentsPopupgUrl = "shared/popup/views/commentsPopup.html";
        $scope.showCommentsPopup = false;
        $scope.showCommentsPopupCallback = function (e, popupType) {
        	CommentPopupType = popupType;
        	if (CommentPopupType == "type1") {
        		$scope.popuptype1 = true;
        		$scope.popuptype2 = false;
        	}
        	else if (CommentPopupType == "type2") {
        		$scope.popuptype2 = true;
        		$scope.popuptype1 = false;
        	}
        	$scope.showCommentsPopup = true;
        };
        $scope.commentsPopupOnHideCallback = function (e) {
            $scope.showCommentsPopup = false;
            $scope.attPopUp = true;
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
			},{
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
			},{
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
			},{
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
			},{
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
		//commnets popup----end


		//category popup---start
        $scope.stateBasedTitle = 'SELECT CATEGORIES TO BROWSE';
        $scope.categoryPopupUrl = "p2p/req/views/categoryPopup.html";
        $scope.showCategoryPopup = false;
        $scope.showCategoryPopupCallback = function (e) {
        	$scope.showCategoryPopup = true;
        };
        $scope.categoryPopUpOnHideCallback = function () {
        	$scope.showCategoryPopup = false;
        };
        $scope.recommendedItemsHidePopup = function () {
        	$scope.showCategoryPopup = false;
        };
		//category popup---end
	
	//region popup--start
        $scope.treeComponentConfig = {
        	selectedNodes: "",
        	isRadio: false,
        	getHierarchyOnSelection: true,
        	isLazyLoad: true,
        	data: null,
        	disableLevelSelection: '',
        	title: 'Category',
        	getSelections: false,
        	clearCache: false,
        	height: '328px',
        	isSearchEnabled: true,
        	requestParameter: {
        		navigationContext: "PAS",
        		userExecutionContext: '{"ClientName":"DTCC","UserId":23719,"ContactCode":851704000001,"LoggerCode":"EC101","EntityId":0,"EntityType":"","Product":9,"Culture":"en-US","UserName":"DTCC","Contexts":[],"CompanyName":"BuyerSqlConn","ClientID":8517,"BuyerPartnerCode":8517,"IsAdmin":false,"IsSupplier":false,"IsSuperUser":false,"DefaultCurrencyCode":null}',
        		documentCode: null,
        		contactCode: null,
        	}
        };
		

        

        $scope.clearCache = function () {
        	$scope.treeComponentConfig.clearCache = true;
        };

        $scope.initWithPAS = function () {
        	$scope.treeComponentConfig.title = "Category";
        	$scope.treeComponentConfig.requestParameter = {
        		navigationContext: "PAS",
        		userExecutionContext: '{"ClientName":"DTCC","UserId":23719,"ContactCode":851704000001,"LoggerCode":"EC101","EntityId":0,"EntityType":"","Product":9,"Culture":"en-US","UserName":"DTCC","Contexts":[],"CompanyName":"BuyerSqlConn","ClientID":8517,"BuyerPartnerCode":8517,"IsAdmin":false,"IsSupplier":false,"IsSuperUser":false,"DefaultCurrencyCode":null}',
        		documentCode: null,
        		contactCode: null,
        	};
        };

        $scope.initWithRegion = function () {
        	$scope.treeComponentConfig.title = "Region";
        	$scope.treeComponentConfig.requestParameter = {
        		navigationContext: "REG",
        		userExecutionContext: '{"ClientName":"DTCC","UserId":23719,"ContactCode":851704000001,"LoggerCode":"EC101","EntityId":0,"EntityType":"","Product":9,"Culture":"en-US","UserName":"DTCC","Contexts":[],"CompanyName":"BuyerSqlConn","ClientID":8517,"BuyerPartnerCode":8517,"IsAdmin":false,"IsSupplier":false,"IsSuperUser":false,"DefaultCurrencyCode":null}',
        		documentCode: null,
        		contactCode: null,
        	};
        };

        $scope.treeComponentCallback = function (e) {
        	console.log(e);
        	/*
			 * Un comment the below logic to see admin use case..!!
			 * TODO : getHierarchyOnSelection:true (in tree config)
			 */
        	/*
			var obj = { 'PASList': [] };
			var levelData = _.groupBy(_.flatten(e.selectionHierarchy), "Level");
			_.each(levelData, function (data, key) {
				_.each(data, function (n) {
					n['selection'] = "0";
				});
				obj['PASList'].push({
					"Level": key,
					"PASDetails": data
				});
			});
			$scope.treeComponentConfig.isRadio = true;
			$scope.treeComponentConfig.data = obj;
			$scope.treeComponentConfig.selectedNodes = e.selections[0]['ID'].toString();
			*/
        };

        $scope.getSelections = function (e) {
        	$scope.treeComponentConfig.getSelections = true;
        };

        $scope.toggleBool = false;
        $scope.onPopupHideCallback = function () {
        	$scope.toggleBool = false;
        	$scope.treeComponentConfig.getSelections = true;
        };
        $scope.hierarchyTreeCallback = function () {
        	/* $scope.treeComponentConfig.requestParameter = {
				 navigationContext: "PAS",
				 userExecutionContext: '{"ClientName":"DTCC","UserId":23719,"ContactCode":851704000001,"LoggerCode":"EC101","EntityId":0,"EntityType":"","Product":9,"Culture":"en-US","UserName":"DTCC","Contexts":[],"CompanyName":"BuyerSqlConn","ClientID":8517,"BuyerPartnerCode":8517,"IsAdmin":false,"IsSupplier":false,"IsSuperUser":false,"DefaultCurrencyCode":null}',
				 documentCode: null, //1,
				 contactCode: null//83250040000010,
			 }; */
        	$scope.toggleBool = true;
        };
		//region popup--end


        //poup trackstatus
        $scope.trackStatusPopupUrl = "shared/popup/views/popupTrackStatus.html";

        $scope.trackStatusPopup = false;
        $scope.trackStatusPopupCallback = function (e) {
            $scope.trackStatusPopup = true;
       };

        $scope.trackStatusOnHideCallback = function (e) {
            $scope.trackStatusPopup = false;
        };
       
    //Newpoup trackstatus
        $scope.newtrackStatusPopupUrl = "shared/popup/views/popupNewTrackStatus.html";

        $scope.newtrackStatusPopup = false;
        $scope.newtrackStatusPopupCallback = function (e) {
            $scope.newtrackStatusPopup = true;
        };
        $scope.newtrackStatusOnHideCallback = function (e) {
            $scope.newtrackStatusPopup = false;
        };
		
		//region popup
        $scope.regionPopupUrl = "shared/admin/views/multiOrgPopup.html";

        $scope.regionPopup = false;
        $scope.regionPopupCallback = function (e) {
        	$scope.regionPopup = true;
        	$scope.treeComponentConfig.data = {
        		"PASList": [{
        			"Level": 1,
        			"PASDetails": [{
        				"ID": 1,
        				"Name": "IT & Infra",
        				"ParentID": 851750000001,
        				"Level": 1,
        				"Index": 0,
        				"ChildCount": 5
        			}, {
        				"ID": 2,
        				"Name": "Consulting",
        				"ParentID": 851750000011,
        				"Level": 1,
        				"Index": 0,
        				"ChildCount": 0
        			}, {
        				"ID": 3,
        				"Name": "Travel",
        				"ParentID": 85175000012,
        				"Level": 1,
        				"Index": 0,
        				"ChildCount": 0
        			}, {
        				"ID": 4,
        				"Name": "Outsourcing",
        				"ParentID": 851750000013,
        				"Level": 1,
        				"Index": 0,
        				"ChildCount": 0
        			},

        			]
        		}, {
        			"Level": 2,
        			"PASDetails": [{
        				"ID": 11,
        				"Name": "Category 2",
        				"ParentID": 1,
        				"Level": 2,
        				"Index": 0,
        				"ChildCount": 5
        			}, {
        				"ID": 12,
        				"Name": "Category 3",
        				"ParentID": 1,
        				"Level": 2,
        				"Index": 0,
        				"ChildCount": 0
        			}, {
        				"ID": 13,
        				"Name": "Category 4",
        				"ParentID": 1,
        				"Level": 2,
        				"Index": 0,
        				"ChildCount": 0
        			}, {
        				"ID": 14,
        				"Name": "Category 5",
        				"ParentID": 1,
        				"Level": 2,
        				"Index": 0,
        				"ChildCount": 0
        			}, {
        				"ID": 15,
        				"Name": "Category 6",
        				"ParentID": 1,
        				"Level": 2,
        				"Index": 0,
        				"ChildCount": 0
        			}]
        		},
				{
					"Level": 3,
					"PASDetails": [{
						"ID": 21,
						"Name": "sub-category 2",
						"ParentID": 11,
						"Level": 3,
						"Index": 0,
						"ChildCount": 0
					}, {
						"ID": 22,
						"Name": "sub-category 3",
						"ParentID": 11,
						"Level": 3,
						"Index": 0,
						"ChildCount": 0
					}, {
						"ID": 23,
						"Name": "sub-category 4",
						"ParentID": 11,
						"Level": 3,
						"Index": 0,
						"ChildCount": 0
					}, {
						"ID": 24,
						"Name": "sub-category 5",
						"ParentID": 11,
						"Level": 2,
						"Index": 0,
						"ChildCount": 0
					}, {
						"ID": 25,
						"Name": "sub-category 6",
						"ParentID": 11,
						"Level": 3,
						"Index": 0,
						"ChildCount": 0
					}]
				}
        		]
        	};
        };

        $scope.regionOnHideCallback = function (e) {
        	$scope.regionPopup = false;
        };


        //region popup new
        $scope.regionPopupNewUrl = "shared/admin/views/multiOrgPopupNew.html";

        $scope.regionPopupNew = false;
        $scope.regionPopupNewCallback = function (e) {
            $scope.regionPopupNew = true;
            $scope.treeComponentConfig.data = {
                "PASList": [{
                    "Level": 1,
                    "PASDetails": [{
                        "ID": 1,
                        "Name": "IT & Infra",
                        "ParentID": 851750000001,
                        "Level": 1,
                        "Index": 0,
                        "ChildCount": 5
                    }, {
                        "ID": 2,
                        "Name": "Consulting",
                        "ParentID": 851750000011,
                        "Level": 1,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 3,
                        "Name": "Travel",
                        "ParentID": 85175000012,
                        "Level": 1,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 4,
                        "Name": "Outsourcing",
                        "ParentID": 851750000013,
                        "Level": 1,
                        "Index": 0,
                        "ChildCount": 0
                    },

                    ]
                }, {
                    "Level": 2,
                    "PASDetails": [{
                        "ID": 11,
                        "Name": "Category 2",
                        "ParentID": 1,
                        "Level": 2,
                        "Index": 0,
                        "ChildCount": 5
                    }, {
                        "ID": 12,
                        "Name": "Category 3",
                        "ParentID": 1,
                        "Level": 2,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 13,
                        "Name": "Category 4",
                        "ParentID": 1,
                        "Level": 2,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 14,
                        "Name": "Category 5",
                        "ParentID": 1,
                        "Level": 2,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 15,
                        "Name": "Category 6",
                        "ParentID": 1,
                        "Level": 2,
                        "Index": 0,
                        "ChildCount": 0
                    }]
                },
                {
                    "Level": 3,
                    "PASDetails": [{
                        "ID": 21,
                        "Name": "sub-category 2",
                        "ParentID": 11,
                        "Level": 3,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 22,
                        "Name": "sub-category 3",
                        "ParentID": 11,
                        "Level": 3,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 23,
                        "Name": "sub-category 4",
                        "ParentID": 11,
                        "Level": 3,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 24,
                        "Name": "sub-category 5",
                        "ParentID": 11,
                        "Level": 2,
                        "Index": 0,
                        "ChildCount": 0
                    }, {
                        "ID": 25,
                        "Name": "sub-category 6",
                        "ParentID": 11,
                        "Level": 3,
                        "Index": 0,
                        "ChildCount": 0
                    }]
                }
                ]
            };
        };

        $scope.regionOnHideNewCallback = function (e) {
            $scope.regionPopupNew = false;
        };

        //email notification popup
        $scope.emailNotifyPopupUrl = "shared/admin/views/emailNotificationPopup.html";

        $scope.emailNotify = false;
        $scope.emailNotifyCallback = function (e) {
            $scope.emailNotify = true;
        };

        $scope.emailNotifyOnHideCallback = function (e) {
            $scope.emailNotify = false;
        };
       


        $scope.divisionOptions = [{
        	"code": "1",
        	"name": "Division 1",
        }, {
        	"code": "2",
        	"name": "Division 2"
        }];
        $scope.selectedDivision = {
        	"code": "2",
        	"name": "Division 1"
        };
        $scope.onChange = function (selectedDivision) {
        	//console.log(selectedDivision);
        };


        $scope.selectedDivision = { "code": "1", "name": "Division 1" };
        $scope.treeComponentConfig = {
        	selectedNodes: "",
        	isRadio: false,
        	getHierarchyOnSelection: true,
        	isLazyLoad: true,
        	data: null,
        	disableLevelSelection: '',
        	title: '',
        	getSelections: false,
        	clearCache: false,
        	height: '328px',
        	isSearchEnabled: false,
        	requestParameter: {
        		navigationContext: "PAS",
        		userExecutionContext: '{"ClientName":"DTCC","UserId":23719,"ContactCode":851704000001,"LoggerCode":"EC101","EntityId":0,"EntityType":"","Product":9,"Culture":"en-US","UserName":"DTCC","Contexts":[],"CompanyName":"BuyerSqlConn","ClientID":8517,"BuyerPartnerCode":8517,"IsAdmin":false,"IsSupplier":false,"IsSuperUser":false,"DefaultCurrencyCode":null}',
        		documentCode: null,
        		contactCode: null,
        	}
        };
	
	//Multi-org--end


        //poup trackstatus
        $scope.trackStatusPopupUrl = "shared/popup/views/popupTrackStatus.html";

        $scope.trackStatusPopup = false;
        $scope.trackStatusPopupCallback = function (e) {
            $scope.trackStatusPopup = true;
       };

        $scope.trackStatusOnHideCallback = function (e) {
            $scope.trackStatusPopup = false;
        };
       
    //Newpoup trackstatus
        $scope.NewtrackStatusPopupUrl = "shared/popup/views/popupNewTrackStatus.html";

        $scope.NewtrackStatusPopup = false;
        $scope.NewtrackStatusPopupCallback = function (e) {
            $scope.NewtrackStatusPopup = true;
        };

        $scope.NewtrackStatusOnHideCallback = function (e) {
            $scope.NewtrackStatusPopup = false;
        };
		
       
        $scope.suppliers = [
           { name: 'John',  suggSuppliers: 'Suggested Suppliers' },
           { name: 'Jessie', suggSuppliers: ' ' },
           { name: 'Johanna', suggSuppliers: ' ' },
           { name: 'Joy', suggSuppliers: 'Suggested Suppliers' },
           { name: 'Mary', suggSuppliers: ' ' },
           { name: 'Peter', suggSuppliers: ' ' },
           { name: 'Sebastian', suggSuppliers: 'Suggested Suppliers' },
           { name: 'Erika', suggSuppliers: 'Suggested Suppliers' },
           { name: 'Patrick', suggSuppliers: ' ' },
           { name: 'Samantha', suggSuppliers: ' ' }
        ];
        
        //Reassign Approver popup
        $scope.reassignApprover = "p2p/ir/views/popupReassignApprover.html";

        $scope.reassignApproverPopup = false;
        $scope.reassignApproverCallback = function (e) {
            $scope.reassignApproverPopup = true;
        };

        $scope.reassignApproverOnHideCallback = function () {
            $scope.reassignApproverPopup = false;
        };

        //Send to Partner via popup
        $scope.sendToSuppr = "p2p/ir/views/popupSendToSupplier.html";

        $scope.sendToSupprPopup = false;
        $scope.sendToSupprCallback = function (e) {
            $scope.sendToSupprPopup = true;
        };

        $scope.sendToSupprOnHideCallback = function () {
            $scope.sendToSupprPopup = false;
        };

    	//select corporation popup
        $scope.corporationUrl = "p2p/ir/views/popupAssign.html";

        $scope.corporationPopup = false;
        $scope.corporationPopupCallback = function (e) {
        	$scope.corporationPopup = true;
        };

        $scope.corporationOnHideCallback = function () {
        	$scope.corporationPopup = false;
        };
        //Approver popup
        $scope.approver = "p2p/ir/views/popupApprover.html";

        $scope.approverPopup = false;
        $scope.approverCallback = function (e) {
            $scope.approverPopup = true;
        };
        $scope.approverOnHideCallback = function (e) {
            $scope.approverPopup = false;
        };
        
        //Multi Org popup
        $scope.multiOrg = "shared/popup/views/multiOrgPopup.html";

        $scope.multiOrgPopup = false;
        $scope.multiOrgCallback = function (e) {
            $scope.multiOrgPopup = true;
        };
        $scope.multiOrgOnHideCallback = function (e) {
            $scope.multiOrgPopup = false;
        };


        //emailer popup
        $scope.emailer = "shared/popup/views/popupEmailer.html";
        $scope.emailerPopup = false;
        $scope.emailerPopupCallback = function (e) {
            $scope.emailerPopup = true;
        };

        $scope.emailerPopupHideCallback = function (e) {
            $scope.emailerPopup = false;
        };

        //map popup

        $scope.mapPopupTemp = "shared/popup/views/popupMap.html";
        $scope.mapPopup = false;
        $scope.mapPopupCallback = function (e) {
            $scope.mapPopup = true;
        };

        $scope.mapPopupHideCallback = function (e) {
            $scope.mapPopup = false;
        };
        $scope.addApprovers = [
       { name: 'John', "selected": false },
	   { name: 'Jessie' },
	   { name: 'Johanna' },
	   { name: 'Joy', "selected": false },
	   { name: 'Mary' },
	   { name: 'Peter' },
	   { name: 'Sebastian', },
	   { name: 'Erika' },
	   { name: 'Patrick' },
	   { name: 'Samantha' }
        ];

    	//Approver popup
        $scope.approvalPendingUrl = "shared/popup/views/popupApprovalPending.html";

        $scope.approvalPendingPopup = false;
        $scope.approvalPendingPopupCallback = function (e) {
        	$scope.approvalPendingPopup = true;
        };

        $scope.approvalPendingOnHideCallback = function () {
        	$scope.approvalPendingPopup = false;
        };

        $scope.approvers = [
           { name: 'John',"selected": false },
           { name: 'Jessie'},
           { name: 'Johanna'}          
        ];
        $scope.corporation = [
		 { name: 'Corporation 1', code: '42023'},
		 { name: 'Corporation 2', code: '42023'},
		 { name: 'Corporation 3', code: '42023'},
		 { name: 'Corporation 4', code: '42023'},
		 { name: 'Corporation 5', code: '42023'},
		 { name: 'Corporation 6', code: '42023'},
		 { name: 'Corporation 7', code: '42023'},
		 { name: 'Corporation 8', code: '42023'},
		 { name: 'Corporation 9', code: '42023'},
		 { name: 'Corporation 10', code: '42023'}
        ];
        $scope.addCorporation = [
		{ name: 'Corporation 11', code: '42023' },
		{ name: 'Corporation 12', code: '42023' },
		{ name: 'Corporation 13', code: '42023' },
		{ name: 'Corporation 14', code: '42023' },
		{ name: 'Corporation 15', code: '42023' },
		{ name: 'Corporation 16', code: '42023' },
		{ name: 'Corporation 17', code: '42023' },
		{ name: 'Corporation 18', code: '42023' },
		{ name: 'Corporation 19', code: '42023' },
		{ name: 'Corporation 20', code: '42023' }
        ];

    	// approver select all code
        $scope.onLazyLoadApr = function () {        	
        		$scope.approvers.push(
				   { name: 'Joy',"selected": false },
				   { name: 'Mary'},
				   { name: 'Peter'},
				   { name: 'Sebastian'},
				   { name: 'Erika'},
				   { name: 'Patrick' },
			       { name: 'Mary' },
				   { name: 'Peter' },
				   { name: 'Sebastian' },
				   { name: 'Erika' },
				   { name: 'Patrick' },
				   { name: 'Samantha' });     	        	
        };
        $scope.selectAllApprover = false;
        $scope.checkAllApr = function ($event) {
        	$scope.selectAllApprover = !$scope.selectAllApprover;
            angular.forEach($scope.approvers, function (item) {
            	item.selected = $scope.selectAllApprover;
            });
            $event.preventDefault();
        };
        $scope.shwMoreApr = false;
        $scope.WrapHeightApr = "130px";

        $scope.collapsUserApr = function () {        	
        	$scope.shwMoreApr = !$scope.shwMoreApr;
        	$scope.WrapHeightApr = "350px";
        }

    	// corporation select all code
        $scope.selectAllCorp = false;
        $scope.checkAllCorp = function ($event) {
        	$scope.selectAllCorp = !$scope.selectAllCorp;
        	angular.forEach($scope.corporation, function (item) {
        		item.selected = $scope.selectAllCorp;
        	});
        	$event.preventDefault();
        };
        $scope.shwMoreCorp = false;
        $scope.WrapHeightCorp = '130px';

        $scope.collapsUserCorp = function () {
        	$scope.shwMoreCorp = !$scope.shwMoreCorp;
        	$scope.WrapHeightCorp = '350px';
        }


       // $scope.selectedIt = [];

        $scope.getME = function (item, e,selectedItObj) { 
        	selectedItObj.push(item);
          
      //          e.preventDefault();
        }

    	/* SEARCH IN APPROVAL PENDING POPUP */
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
        	$scope.IsHidden = true;
        	$scope.IsMessage = false;
        }

        /*nofification error*/
        $scope.success = function () {
            var createOb = {
                type: "success",
                message: "Change Order created successfully.",
                buttons: [
                    {
                        title: "OK",
                        result: "ok"
                    }]
            };
            notification.notify(createOb);
        }

        $scope.warning = function () {
            var createOb = {
                type: "warning",
                message: "Change Order created successfully.",
                buttons: [
                    {
                        title: "OK",
                        result: "ok"
                    }]
            };
            notification.notify(createOb);
        }

        $scope.error = function () {
            var createOb = {
                type: "error",
                message: "Change Order created successfully.",
                buttons: [
                    {
                        title: "OK",
                        result: "ok"
                    }]
            };
            notification.notify(createOb);
        }

        $scope.confirm = function () {
            var createOb = {
                type: "confirm",
                message: "Change Order created successfully.",
                buttons: [
                    {
                        title: "OK",
                        result: "ok"
                    }]
            };
            notification.notify(createOb);
        }
        $scope.inform = function () {
            var createOb = {
                type: "inform",
                message: "Change Order created successfully.",
                buttons: [
                    {
                        title: "OK",
                        result: "ok"
                    }]
            };
            notification.notify(createOb);
        }
        
        $scope.sessionTimeOut = function () {
            var createOb = {
                type: "sessionTimeOut",
                message: "Woohoo!! Hope you enjoyed the break. For Single-Sign On, go back to your Corporate Login.",
                buttons: [
                    {
                        title: "RETURN TO LOGIN",
                        result: "RETURN TO LOGIN"
                    }]
            };
            notification.notify(createOb);
        }

        $scope.sessionExpire = function () {
            var createOb = {
                type: "sessionExpire",
                message: "Oho! you will be logged off in 12 seconds. Do you want to continue your session?",
                buttons: [
                    {
                        title: "No, Logoff",
                        result: "No, Logoff"
                    },
                    {
                        title: "Yes, Keep Working",
                        result: "Yes, Keep Working"
                    }
                ]
            };
            notification.notify(createOb);
        }

    //Attachment popup--start

        $scope.attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
        <br />Limited to file(s) of 10MB each.\
	    <br /> Maximum 5 files can be uploaded.";
        $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
        $scope.attchmentMsg = $scope.attachmentMsg;

        var comingFrom;
        $scope.uploadTitle = "ADD ATTACHMENTS";
        $scope.showUploadPopup = false;
        $scope.adduploadCallback = function (e, popupComingfrom) {
        	$scope.showUploadPopup = true;
        	comingFrom = popupComingfrom;
        }
        $scope.hideUploadPopupCallback = function (e) {
        	$scope.showUploadPopup = false;
        	if (comingFrom == undefined) {

        		return false;
        	} else if (comingFrom == "comment") {
        		$scope.showCommentsPopup = true;
        	}
        }
	
	$scope.docFlag = false;
	$scope.uploadDocCall = function (e) {
		$scope.docFlag = true;
	};
	$scope.attachFlag = false;
	

	$scope.attachmentList = [
		{
			name: "AttachmentOne.xls",
			status: "fail",
			referenceName: "Add Name",
			isShow:true,
			actionIconDelete: false
		},
		{
			name: "AttachmentTwo.xls",
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true
		},
		{
			name: "AttachmentThree.xls",
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true
		},
		{
			name: "AttachmentFour.xls",			
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true
		},
		{
			name: "AttachmentFive.xls",
			status: "success",
			referenceName: "Add Name",
			isShow: true,
			actionIconDelete: true			
		}
	];
	$scope.attachmentCall = function (e) {
		$scope.attachFlag = true;
		
		for (var i = 0; i < $scope.attachmentList.length;i++){
			$scope.attachmentList[i].isShow = true;
		}
	};
	$scope.closeAttachment = function (el) {
		el.isShow = false;		
	}

	$scope.retryCall = function (el) {
		el.status = "success";
	}
	$scope.removeRow = function (el) {
	    // remove the row specified in index
		if ($scope.attachmentList.length > 1) {
			if ($scope.attachmentList.length == 2) {
				$scope.attachmentList[1].actionIconDelete = false;
	        }
			$scope.attachmentList.splice(index, 1);
	    }
	};
	//Attachment popup--end
	
	$scope.commentsPopupgTabUrl = "shared/popup/views/commentsPopupTab.html";
	$scope.showCommentsPopupTab = false;
	$scope.showCommentsPopupTabCallback = function (e) {
	    $scope.showCommentsPopupTab = true;
	};
	$scope.commentsPopupOnHideTabCallback = function (e) {
	    $scope.showCommentsPopupTab = false;
	    $scope.attPopUp = true;
	};
	$scope.tooltip = "Attachment 1" + "\n" + "Attachment 2" + "\n" + "Attachment 3" + "\n" + "Attachment 4" + "\n" + "Attachment 5";
	$scope.customStyle = {
	    "textAlign": "left",
	};

    //multi-org popup.

	$scope.createdByList = [
       { id: '0', filterLabel: 'Looooooooooooooong Div-Org Name', isChecked: false, url: 'div-org-1.html', count: '1', isShowSearch: true },
       { id: '2', filterLabel: 'Div-Org 2', isChecked: false, url: 'div-org-2.html', count: '1', isShowSearch: true },
       { id: '3', filterLabel: 'Div-Org 3', isChecked: false, url: 'div-org-3.html', count: '1', isShowSearch: true },
       { id: '1', filterLabel: 'Div-Org 4', isChecked: false, url: 'div-org-4.html', count: '1', isShowSearch: true },
       { id: '4', filterLabel: 'Div-Org 5', isChecked: false, url: 'div-org-5.html', count: '1', isShowSearch: true },

	];
	$scope.currentTab = 'div-org-1.html';
	$scope.activeListTabs = 0;
	$scope.setActiveListTab = function (menuItem) {
	    $scope.activeListTabs = menuItem;
	    $scope.currentTab = $scope.createdByList[menuItem].url;
	}
	


    
     
	$scope.showSearchTab = function (el) {

	    for (var i = 0; i < $scope.createdByList.length; i++) {
	        $scope.createdByList[i].isShowSearch = false;
	    }
        if (el == 0) {
	       
	        $scope.createdByList[0].isShowSearch = true;
	    }
	    else if (el == 1) {
	       
	        $scope.createdByList[1].isShowSearch = true;
	    }
	    else if (el == 2) {
	       
	        $scope.createdByList[2].isShowSearch = true;
	    }
	    else if (el == 3) {
	       
	        $scope.createdByList[3].isShowSearch = true;
	    }
	    else if (el == 4) {
	       
	        $scope.createdByList[4].isShowSearch = true;
	    } else if (el == 5) {
	       
	        $scope.createdByList[5].isShowSearch = true;
	    }
	  }
    

	


	$scope.IsHidden = true;
	$scope.isResult = true;
	$scope.isSaveResult = false;
	$scope.isApplyFilters = true;
	$scope.isInfo = true;

    $scope.searchCat = "";
	$scope.IsMessage = false;
	$scope.showLoader = true;

	$scope.$watch('message', function () {
	   
	});


	$scope.searchPanel = function (searchCat) {
	    if (searchCat == "subcat1") {
	        $scope.IsMessage = $scope.IsMessage ? false : true;
	        $scope.IsHidden = $scope.IsHidden ? false : true;
	        $scope.isApplyFilters = true;
	        $scope.isInfo = false;
	    }
	    else {
	        $scope.IsMessage = $scope.IsMessage ? true : false;
	        $scope.isResult = $scope.isResult ? false : true;
	        $scope.isSaveResult = $scope.isSaveResult ? false : true;
	        
	    }
	}
	$scope.saveResult = function () {
	    $scope.IsHidden = true;
	    $scope.IsMessage = false;
	}

	
	$timeout(function () {
	   
        $scope.dataModel = [
        {
            "Category1": {
                "1111": "Subcat1-1",
                "1114": "Subcat1-2",
                "1110": "Subcat1-3",
                "1109": "Subcat1-4",
                "1108": "Subcat1-5",
                "1107": "Subcat1-6",
                "1106": "Subcat1-7"
            }
        },
        {
            "Category2": {
                "1112": "Subcat2-1",
                "1113": "Subcat2-2"
            }
        },
        {
            "Category3": {
                "1115": "Subcat3-1",
                "1116": "Subcat3-2"
            }
        },
        {
            "Category4": {
                "1117": "Subcat4-1",
                "1118": "Subcat4-2"
            }
        }
        ];
        $scope.showLoader = false;
	},2000);

    //Internal External Change Order notification popup (CHANGE ORDER)
	$scope.OrderChangePopupUrl = "shared/admin/views/popupInternalExternalChangeOrder.html";

	$scope.myOrderChangePopup = false;
	$scope.myOrderChangePopupCallback = function (e) {
	    $scope.myOrderChangePopup = true;
	};

	$scope.myOrderChangePopupOnHideCallback = function (e) {
	    $scope.myOrderChangePopup = false;
	};

	$scope.OrderChange = [
		{
		    modeTitle: 'External Change order',
		    modeDespcription: $sce.trustAsHtml('You want to amend critical attributes (e.g. Quantity) on an order and share with supplier.')
		},
		{
		    modeTitle: 'Internal Change Order',
		    modeDespcription: $sce.trustAsHtml('You want to change administrative attributes (e.g. Accounting Codes) on an order and not share with supplier.')
		},

	];
	$scope.selectedByRadioBtn = {
	    modeTitle: 'External Change order',
	    modeDespcription: $sce.trustAsHtml('You want to amend critical attributes (e.g. Quantity) on an order and share with supplier.')
	};

    //End Internal External Change Order notification popup (CHANGE ORDER)

    // Start: Discussion Forum Popup
	$scope.DiscussionForumPopupUrl = "shared/admin/views/popupDiscussionForum.html";
	$scope.showDiscussionForumPopup = false;
	$scope.showDiscussionForumCallback = function (e) {
	    $scope.showDiscussionForumPopup = true;
	};
	$scope.hideDiscussionForumCallback = function (e) {
	    $scope.showDiscussionForumPopup = false;

	    $scope.verticalTabsContent = true;
	    $scope.addNewTpoicContent = false;
	    $scope.userPostContent = false;

	    $scope.newDiscussion = false;
	    $scope.oldDiscussion = true;
	    $scope.participants = false;
	    $scope.editTopic = false;
	    $scope.resetButton = true;
	    $scope.addNewTopicButton = true;

	    $scope.reply = false;
	    $scope.replyWithQuote = false;
	};

	$scope.topics = [
			{ id: '0', name: 'IT Hardware', url: 'requisition.html' }
	]

	$scope.currentTopic = 'requisition.html';
	$scope.activeTopic = 0;
	$scope.selectTopic = function (menuItems) {
	    $scope.activeTopic = menuItems;
	    $scope.currentTopic = $scope.topics[menuItems].url;
	    console.log(activeTopicFromList);
	}

	$scope.topicName = "IT Hardware"

	$scope.isNotify = true;
	$scope.isDisc = false;

	$scope.teamMembers = [
        { name: 'Rishi Behl', id: '0', forParticipant: false, forEdit: false, forNewTopic: false },
        { name: 'Akshai PM1 Tellis', id: '1', forParticipant: false, forEdit: false, forNewTopic: false },
        { name: 'Imran Shaikh', id: '2', forParticipant: false, forEdit: false, forNewTopic: false },
        { name: 'Sumitabh Bose', id: '3', forParticipant: false, forEdit: false, forNewTopic: false }
	]

	$scope.suppliers = [
        { name: 'bestbuy', id: '0', forParticipant: false, forEdit: false, forNewTopic: false },
        { name: 'Dell Demo', id: '1', forParticipant: false, forEdit: false, forNewTopic: false },
        { name: 'Quanta', id: '2', forParticipant: false, forEdit: false, forNewTopic: false },
        { name: 'Evertek', id: '3', forParticipant: false, forEdit: false, forNewTopic: false }
	]

	$scope.editTopicTeamMemberCount = 0;
	$scope.isEditTopicTeamMember = { chk: false };
	$scope.editTopicParentMemberChecked = function (isEditTopicTeamMember) {
	    if (isEditTopicTeamMember) {
	        $scope.isEditTopicTeamMember.chk = true;
	        $scope.editTopicTeamMemberCount = $scope.teamMembers.length;
	        $scope.teamMembers.forEach(function (m) {
	            m.forEdit = true;
	            if ($scope.editTopicTeamMemberCount > $scope.teamMembers.length) {
	                $scope.editTopicTeamMemberCount = $scope.teamMembers.length;
	            }
	        });
	    }
	    else {
	        $scope.isEditTopicTeamMember.chk = false;
	        $scope.editTopicTeamMemberCount = 0;
	        $scope.teamMembers.forEach(function (m) {
	            m.forEdit = false;
	            if ($scope.editTopicTeamMemberCount < 0) {
	                $scope.editTopicTeamMemberCount = 0;
	            }
	        });
	    }
	};

	$scope.editTopicMemberChecked = function (editTopicTeamMember) {
	    if (editTopicTeamMember.forEdit == true) {
	        $scope.editTopicTeamMemberCount++;
	        if ($scope.editTopicTeamMemberCount == $scope.teamMembers.length) {
	            $scope.isEditTopicTeamMember.chk = true;
	        }
	    }
	    else {
	        $scope.editTopicTeamMemberCount--;
	        if ($scope.editTopicTeamMemberCount < $scope.teamMembers.length) {
	            $scope.isEditTopicTeamMember.chk = false;
	        }
	    }
	}


	$scope.editTopicSupplierCount = 0;
	$scope.isEditTopicSupplier = { chk: false };
	$scope.editTopicParentSupplierChecked = function (isEditTopicSupplier) {
	    if (isEditTopicSupplier) {
	        $scope.isEditTopicSupplier.chk = true;
	        $scope.editTopicSupplierCount = $scope.suppliers.length;
	        $scope.suppliers.forEach(function (s) {
	            s.forEdit = true;
	            if ($scope.editTopicSupplierCount > $scope.suppliers.length) {
	                $scope.editTopicSupplierCount = $scope.suppliers.length;
	            }
	        });
	    }
	    else {
	        $scope.isEditTopicSupplier.chk = false;
	        $scope.editTopicSupplierCount = 0;
	        $scope.suppliers.forEach(function (s) {
	            s.forEdit = false;
	            if ($scope.editTopicSupplierCount < 0) {
	                $scope.editTopicSupplierCount = 0;
	            }
	        });
	    }
	};

	$scope.editTopicSupplierChecked = function (editTopicSupplier) {
	    if (editTopicSupplier.forEdit == true) {
	        $scope.editTopicSupplierCount++;
	        if ($scope.editTopicSupplierCount == $scope.suppliers.length) {
	            $scope.isEditTopicSupplier.chk = true;
	        }
	    }
	    else {
	        $scope.editTopicSupplierCount--;
	        if ($scope.editTopicSupplierCount < $scope.suppliers.length) {
	            $scope.isEditTopicSupplier.chk = false;
	        }
	    }
	}



	$scope.newTopicTeamMemberCount = 0;
	$scope.isNewTopicTeamMember = { chk: false };
	$scope.newTopicParentMemberChecked = function (isNewTopicTeamMember) {
	    if (isNewTopicTeamMember) {
	        $scope.isNewTopicTeamMember.chk = true;
	        $scope.newTopicTeamMemberCount = $scope.teamMembers.length;
	        $scope.teamMembers.forEach(function (nm) {
	            nm.forNewTopic = true;
	            if ($scope.newTopicTeamMemberCount > $scope.teamMembers.length) {
	                $scope.newTopicTeamMemberCount = $scope.teamMembers.length;
	            }
	        });
	    }
	    else {
	        $scope.isNewTopicTeamMember.chk = false;
	        $scope.newTopicTeamMemberCount = 0;
	        $scope.teamMembers.forEach(function (nm) {
	            nm.forNewTopic = false;
	            if ($scope.newTopicTeamMemberCount < 0) {
	                $scope.newTopicTeamMemberCount = 0;
	            }
	        });
	    }
	};

	$scope.newTopicMemberChecked = function (newTopicTeamMember) {
	    if (newTopicTeamMember.forNewTopic == true) {
	        $scope.newTopicTeamMemberCount++;
	        if ($scope.newTopicTeamMemberCount == $scope.teamMembers.length) {
	            $scope.isNewTopicTeamMember.chk = true;
	        }
	    }
	    else {
	        $scope.newTopicTeamMemberCount--;
	        if ($scope.newTopicTeamMemberCount < $scope.teamMembers.length) {
	            $scope.isNewTopicTeamMember.chk = false;
	        }
	    }
	}



	$scope.newTopicSupplierCount = 0;
	$scope.isNewTopicSupplier = { chk: false };
	$scope.newTopicParentSupplierChecked = function (isNewTopicSupplier) {
	    if (isNewTopicSupplier) {
	        $scope.isNewTopicSupplier.chk = true;
	        $scope.newTopicSupplierCount = $scope.suppliers.length;
	        $scope.suppliers.forEach(function (ns) {
	            ns.forNewTopic = true;
	            if ($scope.newTopicSupplierCount > $scope.suppliers.length) {
	                $scope.newTopicSupplierCount = $scope.suppliers.length;
	            }
	        });
	    }
	    else {
	        $scope.isNewTopicSupplier.chk = false;
	        $scope.newTopicSupplierCount = 0;
	        $scope.suppliers.forEach(function (ns) {
	            ns.forNewTopic = false;
	            if ($scope.newTopicSupplierCount < 0) {
	                $scope.newTopicSupplierCount = 0;
	            }
	        });
	    }
	};

	$scope.newTopicSupplierChecked = function (newTopicSupplier) {
	    if (newTopicSupplier.forNewTopic == true) {
	        $scope.newTopicSupplierCount++;
	        if ($scope.newTopicSupplierCount == $scope.suppliers.length) {
	            $scope.isNewTopicSupplier.chk = true;
	        }
	    }
	    else {
	        $scope.newTopicSupplierCount--;
	        if ($scope.newTopicSupplierCount < $scope.suppliers.length) {
	            $scope.isNewTopicSupplier.chk = false;
	        }
	    }
	}


	$scope.participantTeamMemberCount = 0;
	$scope.memberChecked = function (teamMember) {
	    if (teamMember.forParticipant == true) {
	        $scope.participantTeamMemberCount++;
	    }
	    else {
	        $scope.participantTeamMemberCount--;
	    }
	}

	$scope.participantSupplierCount = 0;
	$scope.supplierChecked = function (supplier) {
	    if (supplier.forParticipant == true) {
	        $scope.participantSupplierCount++;
	    }
	    else {
	        $scope.participantSupplierCount--;
	    }
	}


	$scope.verticalTabsContent = true;
	$scope.addNewTpoicContent = false;
	$scope.userPostContent = false;

	$scope.newDiscussion = false;
	$scope.oldDiscussion = true;
	$scope.participants = false;
	$scope.editTopic = false;
	$scope.resetButton = true;
	$scope.addNewTopicButton = true;

	$scope.reply = false;
	$scope.replyWithQuote = false;

	$scope.newDiscussionClicked = function () {
	    $scope.newDiscussion = true;
	    $scope.oldDiscussion = false;
	    $scope.participants = false;
	    $scope.editTopic = false;
	}

	$scope.participantClicked = function () {
	    $scope.newDiscussion = false;
	    $scope.oldDiscussion = false;
	    $scope.participants = true;
	    $scope.editTopic = false;
	}

	$scope.editTopicClicked = function () {
	    $scope.newDiscussion = false;
	    $scope.oldDiscussion = false;
	    $scope.participants = false;
	    $scope.editTopic = true;
	}

	$scope.openNewTopicClicked = function () {
	    $scope.verticalTabsContent = false;
	    $scope.addNewTpoicContent = true;
	    $scope.resetButton = false;
	}

	$scope.closeNewTopicClicked = function () {
	    $scope.verticalTabsContent = true;
	    $scope.addNewTpoicContent = false;
	    $scope.resetButton = true;
	}

	$scope.getIntoPost = function () {
	    $scope.verticalTabsContent = false;
	    $scope.userPostContent = true;
	    $scope.addNewTopicButton = false;
	}

	$scope.backClicked = function () {
	    $scope.verticalTabsContent = true;
	    $scope.userPostContent = false;
	    $scope.addNewTopicButton = true;
	}

	$scope.resetClicked = function () {
	    $scope.verticalTabsContent = true;
	    $scope.addNewTpoicContent = false;
	    $scope.userPostContent = false;
	    $scope.addNewTopicButton = true;

	    $scope.newDiscussion = false;
	    $scope.oldDiscussion = true;
	    $scope.participants = false;
	    $scope.editTopic = false;
	}

	var replyFlag = 0;
	$scope.replyClicked = function () {
	    if (replyFlag == 0) {
	        $scope.reply = true;
	        $scope.replyWithQuote = false;
	        replyFlag = 1;
	    }
	    else {
	        $scope.reply = false;
	        replyFlag = 0;
	    }
	}

	var replyWithQuoteFlag = 0;
	$scope.replyWithQuoteClicked = function () {
	    if (replyWithQuoteFlag == 0) {
	        $scope.reply = false;
	        $scope.replyWithQuote = true;
	        replyWithQuoteFlag = 1;
	    }
	    else {
	        $scope.replyWithQuote = false;
	        replyWithQuoteFlag = 0;
	    }
	}
    // End: Discussion Forum Popup

 };

