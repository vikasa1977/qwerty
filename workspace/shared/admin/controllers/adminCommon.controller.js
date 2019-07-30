angular.module('SMART2')
	.controller('adminCommonCtrl', ['$scope', '$state', '$translate', '$timeout', '$rootScope', 'RuleEngine', '$http', '$filter', 'notification', '$sce', 'notificationService', '$location', 'previousState', adminCommonCtrlFunc])


function adminCommonCtrlFunc($scope, $state, $translate, $timeout, $rootScope, RuleEngine, $http, $filter, notification, $sce, notificationService, $location, previousState) {
    var orderBy = $filter('orderBy');    
    $scope.mode = $state.params.mode;
    var req = {
        method: 'GET',
        url: 'shared/admin/models/notificationTab.json'
    };

    $http(req).then(function (response) {

        $scope.dataModel = response.data.dataModel;

        $scope.config = response.data.formConfig;

        var widgetItems = [];

        for (var i = 0; i < $scope.config.sections.length; i++) {
            $scope.config.sections[i].isVisible = $scope.config.sections[i].isMandatory;
            if (!$scope.config.sections[i].isMandatory) {
                widgetItems.push({
                    label: $scope.config.sections[i].label,
                    isSection: true,
                    sectionIndex: i,
                    visible: true,
                    leftIcon: $scope.config.sections[i].icon
                });
            }
            else {
                for (var j = 0; j < $scope.config.sections[i].rows.length; j++) {
                    for (var k = 0; k < $scope.config.sections[i].rows[j].properties.length; k++) {
                        $scope.config.sections[i].rows[j].properties[k].isVisible = $scope.config.sections[i].rows[j].properties[k].isMandatory;
                        if (!$scope.config.sections[i].rows[j].properties[k].isMandatory) {
                            widgetItems.push({
                                label: $scope.config.sections[i].rows[j].properties[k].label,
                                isSection: false,
                                sectionIndex: i,
                                rowIndex: j,
                                propertyIndex: k,
                                visible: true,
                                leftIcon: $scope.config.sections[i].icon
                            });
                        }
                    }
                }
            }
        }

        $scope.widgetItems = widgetItems;

    }, function (error) {
        console.log(JSON.stringify(error));
    });

    

     $scope.notificatonSelectFromOptions = [{
            "key": "new", 
            "name": "New"
       }, {
           "key": "using_template",
           "name": "Using Template"
       }];

       $scope.selectNotificationOtion = { "key": "new", "name": "New" };

      

    //on select alert
    $scope.isAlertOn = true;
    $scope.isAlertBeforeAfter = false;
    $scope.isSetRecurrence = false;
    $scope.isCustomDate = false;

    $scope.status = 'Status';
    $scope.emptyText = '';

    $scope.changeSavedView = { 'name': 'On' };
    $scope.savedViews = [
   { 'name': 'On' },
   { 'name': 'Before' },
   { 'name': 'After' }
    ];

    $scope.dateOption = [{ 'name': 'Select Alert' },
   { 'name': 'Effective Date' },
   { 'name': 'Expiry Date' },
    { 'name': 'Custom Date' }];

    $scope.onselect = function (changeSavedView) {
       if (changeSavedView.name == 'On') {
            $scope.isAlertOn = true;
            $scope.isAlertBeforeAfter = false;
            $scope.isCustomDate = false;

        }
        else {
            $scope.isAlertOn = false;
            $scope.isAlertBeforeAfter = true;
            $scope.isCustomDate = false;
        }
       
    };

    $scope.changeDate = function (changeDateOption) {
        console.log(changeDateOption.name);
        if (changeDateOption.name == 'Custom Date') {
            $scope.isCustomDate = true;
        }
        else {
            $scope.isCustomDate = false;
        }
    }

    $scope.changeDate2 = function (changeDateOption) {
        console.log(changeDateOption.name);
        if (changeDateOption.name == 'Custom Date') {
            $scope.isCustomDate2 = true;
        }
        else {
            $scope.isCustomDate2 = false;
        }
    }

    $scope.isUrgent = true;
    $scope.onChange = function (isUrgent) {
        console.log(isUrgent);
    };

    $scope.setRecurrence = false;
    $scope.setToChange = function (setRecurrence) {
        if (setRecurrence == true) {
            $scope.isSetRecurrence = true;
        } else {
            $scope.isSetRecurrence = false;
        }
    };


    //Notification Content

   

    $scope.variableList = [
		{
		    title: "Subject Variable",
			variableGrp: [
				{ name: "Event name", content: "[Eventname]" },
				{ name: "Event Number", content: "[EventNumber]" },
			],

		

		},
		{
		    title: "Body Variable",
			variableGrp: [
				{ name: "Name", content: "[Name]" },
				{ name: "Number", content: "[Number]" },
				{ name: "Supplier Name", content: "[SupplierName]" },
				{ name: "Awarding Date", content: "[AwardingDate]" },
				{ name: "Name of Awardee", content: "[NameofAwardee]" },
				{ name: "Buyer Org Name", content: "[BuyerOrgName]" }
			],
			
		}];

    $scope.showVariableCall = function (index, isShowVariable) {
        for (var i = 0; i < $scope.variableList.length; i++) {
            $scope.variableList[i].isVariableVisible = false;
        }
        if (!isShowVariable) {
            $scope.variableList[index].isVariableVisible = true;
        }
    }

    $scope.sendToSuppr = "shared/popup/views/popupPreview.html";

    $scope.showpreviewPopup = false;



    $scope.fillpartial = false;
    $scope.showSubjectPreview = false;
    
    $scope.getDeclarationText = function (el) {
        CKEDITOR.instances['editor1'].insertHtml(el.content);
        $scope.fillpartial = true;
        $scope.showSubjectPreview = true;
        $scope.popupPreview = function (e) {
            $scope.showpreviewPopup = true;
        };

        $scope.previewPopupOnHideCallback = function () {
            $scope.showpreviewPopup = false;
        };
    }
    

    $scope.getEmailToData = function () {
        $scope.fillpartial = true;
        $scope.showSubjectPreview = true;
        $scope.popupPreview = function (e) {
            $scope.showpreviewPopup = true;
        };

        $scope.previewPopupOnHideCallback = function () {
            $scope.showpreviewPopup = false;
        };
    }

    $scope.getEmailCcData = function () {
        $scope.fillpartial = true;
        $scope.showSubjectPreview = true;
        $scope.popupPreview = function (e) {
            $scope.showpreviewPopup = true;
        };

        $scope.previewPopupOnHideCallback = function () {
            $scope.showpreviewPopup = false;
        };
    }
    $scope.notifySub = "";
    $scope.notificationtext = function () {
        if ($scope.notifySub.trim() == "")
        $scope.fillpartial = false;
    }

    $scope.activePreview = function () {
        $scope.fillpartial = true;
        $scope.showSubjectPreview = true;
        $scope.popupPreview = function (e) {
            $scope.showpreviewPopup = true;
        };

        $scope.previewPopupOnHideCallback = function () {
            $scope.showpreviewPopup = false;
        };
    }

 

    var ckeditor = CKEDITOR.instances['editor1'];
    if (ckeditor) { 
    ckeditor.on('key', function (event) {
        var x = event.data.keyCode;
            $scope.fillpartial = true;
            $scope.showSubjectPreview = true;
            $scope.popupPreview = function (e) {
                $scope.showpreviewPopup = true;
            };

            $scope.previewPopupOnHideCallback = function () {
                $scope.showpreviewPopup = false;
            };
           
        
            $scope.$apply(function () {
                $scope.editorData = ckeditor.getData().replace(/<[^>]*?>/g, ' ') ;
            });
    });
    }

	$scope.contractLangaugeVersion = [
		{ title: "Version 1" },
		{title : "Version 2"}
	];
	$scope.selectedLangaugeVersion = { title: "Version 1" };
	$scope.removeItem = function (index) {
	    $scope.emailLogData.splice(index, 1);
	}

	$scope.commentInpt = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500";



    // Start notification Tab.

    $scope.notificationData = [
        {
        
            name: 'Contract Expiry : 30 days to go',
            status: 'ng-hide',
        	event: 'Expiry Date',
        	notifyTo: 'support@gep.com',
        	addedBy: 'Gep1 admin1',
        	nextDueOn: '-',
        	nextDueOnDate: [{'dateVal': '-'} ],
        	Selected:true
        	
        	
        },

        {
            name: 'Contract Expiry : 30 days to go',
            status: 'partiallyReceived',
            event: 'Expiry Date',
            notifyTo: 'Attorney',
            addedBy: 'Gep1 admin1',
            nextDueOn: '-',
            Selected: false
        },

        {
            name: 'Contract Expiry : 30 days to go',
            status: 'partiallyReceived',
            event: 'Expiry Date',
            notifyTo: 'support@gep.com',
            addedBy: 'Gep1 admin1',
            nextDueOn: '-',
            Selected: false
        },
        {
            name: 'Contract Expiry : 30 days to go',
            status: 'partiallyReceived',
            event: 'Expiry Date',
            notifyTo: 'support@gep.com',
            addedBy: 'Gep1 admin1',
            nextDueOn: '-',
            Selected: false
        },
		{
		    name: 'Contract Expiry : 30 days to go',
		    status: 'partiallyReceived',
		    event: 'Expiry Date',
		    notifyTo: 'Attorney',
		    addedBy: 'Gep1 admin1',
		    nextDueOn: '-',
		    Selected: false
		},
		{
		    name: 'Contract Expiry : 30 days to go',
		    status: 'ng-hide',
		    event: 'Expiry Date',
		    notifyTo: 'Attorney',
		    addedBy: 'Gep1 admin1',
		    nextDueOn: '-',
		    Selected: false
		}
    ];

    $scope.selectAll = function () {
        angular.forEach($scope.notificationData, function (entry) {
            entry.checked = $scope.checkedAll;
        });
    }


    $scope.checkIfAllSelected = function () {
        $scope.checkedAll = $scope.notificationData.every(function (entry) {
            return entry.checked == true
        })
    };

    $scope.removeNotification = function () {
        $scope.notificationData = $scope.notificationData.filter(function (entry) {
            return !entry.checked
        })

    }

	$scope.previewLanguageText = "<b>1.1 &nbsp;&nbsp;&nbsp; Proposal Overview <br><br></b>\
	As part of an effort to enhance its competitive position and better understand the supplier market dynamics, {Enter Client Organization Name} is seeking proposals from competitive and quality Suppliers through this Request for Proposal (RFP) for its IT Hardware requirements.\
	The aim of this initiative is to establish long-term Supplier relationships with best-in-class IT Hardware providers measured on total cost, quality, and service.\
	<b><br><br>1.2  &nbsp;&nbsp;&nbsp;  Client Overview<br><br></b>\
	{Please provide introductory overview of the Client Organization, to include: Primary line of business, Key Product Lines/Service offerings, Headquarters, Sales/Revenues, Operation (Regional/Global), web site}<br><br>\
	All suppliers interested in participating in this process should ensure that they address all their issues / concerns / queries with regard to this RFP only to the team members mentioned in this section 1.4 (RFP Contacts).\
	<br><br>An e-mail is the most preferred mode of communication. All communications, as far as possible, should be made through e-mails. All e-mails should have their subject as {Enter Client Organization Name} -IT Hardware (Supplier Name).\
	Ensure that all e-mails are addressed to the primary contacts and the secondary contact(s) is/are copied on them.<br><br>";

	$scope.previewLanguageConvertedText = $sce.trustAsHtml($scope.previewLanguageText);

	//$scope.saveContractLanguage = function () {
	//	$state.go('contract.new', { mode: 'languageDrafted' });
	//}
	//$scope.checkOutCall = function () {
	//	$scope.isPreviewMode = false;
	//	$scope.checkOutMode = false;
	//	$scope.isActive = false;
	//	CKEDITOR.instances['editor1'].insertHtml($scope.previewLanguageText);
	//}
	//$scope.checkInCall = function () {
	//	$scope.isPreviewMode = true;
	//	$scope.checkOutMode = true;
	//	$scope.isActive = true;
	//	CKEDITOR.instances['editor1'].setData('');

    //}


	$scope.statusOptions = [{
	    "code": "on",
	    "name": "On",
	}, {
	    "code": "off",
	    "name": "Off"
	}];

	//$scope.selectedStatus = { "code": "on", "name": "On" };




// End notification Tab.


	$scope.createdByList = [
           { id: '0', filterLabel: 'Category', isChecked: false, url: 'category.html' },
           { id: '2', filterLabel: 'Business Unit', isChecked: false, url: 'businessUnit.html' },
           { id: '3', filterLabel: 'Region', isChecked: false, url: 'region.html' },
           { id: '1', filterLabel: 'Supplier Status', isChecked: false, url: 'supplierStatus.html' },
           { id: '4', filterLabel: 'Source Type', isChecked: false, url: 'sourceType.html' },

	];
	$scope.currentTab = 'category.html';
	$scope.activeListTabs = 0;
	$scope.setActiveListTab = function (menuItem) {
	    $scope.activeListTabs = menuItem;
	    $scope.currentTab = $scope.createdByList[menuItem].url;
	}
	

    //sub header

	$scope.abhi = "Laptop(100)";
	$scope.test = "testing";
	$scope.subjectDetail = "subject";

	/*ADD NEW NOTIFICATION */
	//$scope.path = previousState.lastHref;
	$scope.addNoti = function () {
		$location.path(previousState.lastHref);
	
	};


	$scope.notificationNew = { 'status': "" }
	$scope.notificationNew.status = true;
	//console.log("ON LOAD STATUS " + notificationService.selectedStatus);
	$scope.showChange = function () {
		notificationService.showChange($scope.notificationNew.status.name);
		
	};

	$scope.showSelectedOptionFn = function () {
		notificationService.showChangedEvent($scope.notificationNew.event.title);
		
	}
	
	$scope.notificationList = notificationService.list();	
	//$scope.notificationNew = [
	//	{"name": $scope.name},
	//	{"event": ""},
	//	{ "status": $scope.selectedStatus.name },
	//	{"notifyTo": ""},
	//	{"addedBy": ""},
	//	{"nextDueOn":""}
	//	];
	$scope.saveNotification = function (arr) {
	    if ($scope.notificationNew.name == "" || $scope.notificationNew.name == undefined) { return; }
		console.log("On Save Status = " + $scope.notificationNew.status.name);
		notificationService.save($scope.notificationNew);
		$scope.notificationNew = {};
		$location.path(previousState.lastHref);
		
	}

	$scope.emailToOpts = [
		{ "UserName": "renju.mathew@gep.com" },
		{ "UserName": "ayyappakumar.thevar@gep.com" },
		{ "UserName": "shailesh.sawant@gep.com" },
		{ "UserName": "sachin.kurkute@gep.com" },
		{ "UserName": "kabir.roy@gep.com" },
		{ "UserName": "joel.almeida@gep.com" },
		{ "UserName": "abhishek.kadam@gep.com" },
		{ "UserName": "naushad.shaikh@gep.com" },
		{ "UserName": "karthic.muthuraman@gep.com" },
		{ "UserName": "kamlesh.bhalde@gep.com" },
		{ "UserName": "poonam.lad@gep.com" },
		{ "UserName": "rahul.kardekar@gep.com" },
		{ "UserName": "sheetal.bellare@gep.com" },
		{ "UserName": "kailas.mahajan@gep.com" },
		{ "UserName": "deepak.khanna@gep.com" },
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
	$scope.emailCcOpts = [
		{ "UserName": "renju.mathew@gep.com" },
		{ "UserName": "ayyappakumar.thevar@gep.com" },
		{ "UserName": "shailesh.sawant@gep.com" },
		{ "UserName": "sachin.kurkute@gep.com" },
		{ "UserName": "kabir.roy@gep.com" },
		{ "UserName": "joel.almeida@gep.com" },
		{ "UserName": "abhishek.kadam@gep.com" },
		{ "UserName": "naushad.shaikh@gep.com" },
		{ "UserName": "karthic.muthuraman@gep.com" },
		{ "UserName": "kamlesh.bhalde@gep.com" },
		{ "UserName": "poonam.lad@gep.com" },
		{ "UserName": "rahul.kardekar@gep.com" },
		{ "UserName": "sheetal.bellare@gep.com" },
		{ "UserName": "kailas.mahajan@gep.com" },
		{ "UserName": "deepak.khanna@gep.com" },
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
	$scope.emailToPreSelect = [];
	$scope.emailCcPreSelect = [];

	$scope.getEmailData = function (e) {
	};

	$scope.onSelectEmail = function (e) {
	};
	/* ADD NEW NOTIFICATION END */

	/* EMAIL LOG - CLOSE FILTER */
	$scope.closePopover = function () {
		angular.element(document).triggerHandler('click');
	};
    /* EMAIL LOG - CLOSE FILTER ENDS */

	
	
}

/* SERVICES */
angular.module('SMART2').service('notificationService', function ($rootScope, $location) {	
	var uid = 0; //to create unique contact id
	var selectedStatus = true;
	var selectedEvent = "Select";

	//Notification array to hold list of all notifications
	var notificationList = [];
	//{ id: 0, 'name': 'akdha dhad ', isChecked: false }, { id: 1, 'name': 'asdj adjld khfkj shfkjfshjk shfksfsf ', isChecked: false }

	//Radio Button Functionality
	//console.log(selectedStatus);
	this.showChange = function (selectedStatus) {
		console.log(selectedStatus);
	};

	//Event Dropdown Functionality
	//console.log(selectedEvent);
	this.showChangedEvent = function (selectedEvent) {
		console.log(selectedEvent);
	};

	var today = new Date()
	var nextDueDate = new Date().setDate(today.getDate() + 30);


	//save method create a new notification if not already exists else update the existing object
	this.save = function (notification) {
		if (notification.id == null) {
			//if this is new notification, add it in notificationList
			notification.id = uid++;
			notification.isChecked = false;
			notification.addedBy = "Gep1 admin1";
		    //notification.nextDueOn = nextDueDate;
			notification.nextDueOn = '7/5/2017';

			notification.nextDueOnDate = [{ 'dateVal': '7/5/2017' }, { 'dateVal': '11/2/2017' }, { 'dateVal': '17/5/2017' }, { 'dateVal': '27/5/2017' }, { 'dateVal': '27/6/2017' }, { 'dateVal': '20/5/2017' }, { 'dateVal': '7/7/2017' }, { 'dateVal': '15/9/2017' }];
			notificationList.push(notification);
		} else {
			//for existing notification, find this notification using id and update it.
			for (i in notificationList) {
				if (notificationList[i].id == notification.id) {
					notificationList[i] = notification;
				}
			}
		}
		//$location.path(previousState.lastHref);
		//var prevUrl = prevPath
	};

	//simply search notification list for given id and returns the notification object if found
	this.get = function (id) {
		for (i in notificationList) {
			if (notificationList[i].id == id) {
				return notificationList[i];
			}
		}
	};

	//iterate through notifications list and delete notification if found
	this.delete = function (id) {
		for (i in notificationList) {
			if (notificationList[i].id == id) {
				notificationList.splice(i, 1);
			}
		}
	};

	//simply returns the notifications list
	this.list = function () {
		return notificationList;
		return selectedStatus;
	};


});

angular.module('SMART2').service('previousState', ['$location', '$rootScope', '$state', function ($location, $rootScope, $state) {
	return {
		lastHref: $location.$$path
		//lastHref
	}
	//var lastHref = [];
	
	//$rootScope.$on('$locationChangeSuccess', function () {
	//	this.lastHref.push($location.$$path);	//});
	

	//return lastHref
	
}]);

//angular.module('SMART2').factory('previousState', ['$rootscope', '$state', function ($rootscope, $state) {
//	var lastHref = "index_launcher.html#/",
//        lastStateName = "index_launcher.html#/",
//        lastParams = {};

//	$rootscope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
//		lastStateName = fromState.name;
//		lastParams = fromParams;
//		lastHref = $state.href(lastStateName, lastParams)
//	});

//	return {
//		getLastHref: function () { return lastHref; },
//		goToLastState: function () { return $state.go(lastStateName, lastParams); },
//	}
//}]);

//angular.module('SMART2').run(['$rootScope', 'previousState',
//  function ($rootScope, previousState) {
//  	$rootScope.previousState = previousState;
// }])