'use strict';



angular.module('SMART2')
.controller('mapCtrl', ['$scope', '$timeout', mapCtrlFunc])
    .controller('uploadAttachmentPop', ['$scope', '$timeout', uploadAttachmentFunc])
.controller('commentPopupCtrl', ['$scope', '$timeout', 'notification', 'shareWithCtrl', commentPopupCtrlFunc])

.directive('smartCommentClassTemp', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).closest('.modal').addClass('modalCommentpopup');
        }
    };
}])

function commentPopupCtrlFunc($scope, $timeout, notification, shareWithCtrl) {
    $scope.shareWithOpts = { selectedOption: { "title": "Internal users and suppliers", "selected": true }, options: [{ "title": "Internal users and suppliers", "selected": true }, { "title": "Suppliers", "selected": false }, { "title": "Approvers Only", "selected": false }, { "title": "Buyers Only", "selected": false }, { "title": "Requesters Only", "selected": false }, { "title": "Payable Users Only", "selected": false }] };
    $scope.sendData = { flag: false };
    $scope.postCommentCall = function () {
        $scope.sendData.flag = true;
        $timeout(function () {
            $scope.sendData.flag = false;
        }, 200);
    };
    $scope.moduleactiveListTabs = 0;
    $scope.isPostVisible = true;
    $scope.modulesetActiveListTab = function(i) {
        $scope.moduleactiveListTabs = i;
    }
    $scope.onScrollEndFn = function () {     
        $timeout(function () {
            angular.forEach($scope.modules[$scope.moduleactiveListTabs].commentData, function (v, k) {
                v.status = "read";
            })
        })
    };
    $scope.callback = function (data) {
        console.log(data, " HI")
    };
    $scope.modules = [
        {
            "id": "0", "name": "REQUISITION", "count": "3", "number": "REQ-2016.013110", "url": "requisition.html", "isChecked": false, "commentData": [
              { "commenttype": "receiver", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Items in this order are needed to fulfill IT requirements for new employees.", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc","fileName": "document","extn": "doc",  "status": "fail" }] },

              { "commenttype": "receiver", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Please ensure proper receipt done for this supplier, as there were certain items missing in their last order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "fail" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "loading" }] },

              { "commenttype": "sender", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users and Suppliers", "commenttext": "As communicated with supplier's representative, the additional documents around product specifications have been attached to this order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }] },

              { "commenttype": "sender", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users and Suppliers", "commenttext": "As communicated with supplier's representative, the additional documents around product specifications have been attached to this order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "fail" }] },

              { "commenttype": "sender", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users and Suppliers", "commenttext": "As communicated with supplier's representative, the additional documents around product specifications have been attached to this order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "loading" }] },

            { "commenttype": "sender", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users and Suppliers", "commenttext": "As communicated with supplier's representative, the additional documents around product specifications have been attached to this order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }] }

            ]
        },
        {
            "id": "2", "name": "ORDER", "count": "4", "number": "ORD-2015.523209", "url": "order.html", "isChecked": false, "commentData": [
                { "commenttype": "receiver", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Items in this order are needed to fulfill IT requirements for new employees.", "date": "10/12/2015", "time": "03:54 PM", "attachment": [] },

                { "commenttype": "receiver", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Please ensure proper receipt done for this supplier, as there were certain items missing in their last order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "fail" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "loading" }] },

              { "commenttype": "sender", "status": "read", "name": "Joseph Powell", "usertype": "Internal Users and Suppliers", "commenttext": "As communicated with supplier's representative, the additional documents around product specifications have been attached to this order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "fail" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "loading" }] },

              { "commenttype": "receiver", "status": "unread", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Items in this order are needed to fulfill IT requirements for new employees.", "date": "10/12/2015", "time": "03:54 PM", "attachment": [] },

                { "commenttype": "receiver", "status": "unread", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Please ensure proper receipt done for this supplier, as there were certain items missing in their last order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [{ "title": "document.doc", "status": "fail" }, { "title": "document.doc", "status": "success" }, { "title": "document.doc", "status": "loading" }] },
                { "commenttype": "receiver", "status": "unread", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Items in this order are needed to fulfill IT requirements for new employees.", "date": "10/12/2015", "time": "03:54 PM", "attachment": [] },

                { "commenttype": "receiver", "status": "unread", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Please ensure proper receipt done for this supplier, as there were certain items missing in their last order", "date": "10/12/2015", "time": "03:54 PM", "attachment": [] },

                { "commenttype": "receiver", "status": "unread", "name": "Joseph Powell", "usertype": "Internal Users", "commenttext": "Items in this order are needed to fulfill IT requirements for new employees.", "date": "10/12/2015", "time": "03:54 PM", "attachment": [] }
            ]
        }
    ]
    // upload status -> 0: fail, 1: uploaded, 2: inprogress
    //[{ "title": "document.doc", "status": "fail" }, { "title": "document.doc", "status": "success" }, { "title": "document.doc", "status": "success" }]
    $scope.downloadList = [{ "title": "document.doc", "fileName": "document", "extn": "doc", "status": "fail" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "success" }, { "title": "document.doc", "fileName": "document", "extn": "doc", "status": "loading" }];
    $scope.attachmentStatus = function (d) {
        var d = d || $scope.downloadList;
        if (!d.length) return false;

        //console.log("IM in")
        var i,
            Leng = d.length;
        for (i = 0; i < Leng; i++){
            if (d[i].status === 'fail') {
                return 'fail';
            } else if (d[i].status === 'loading') {
                return 'loading';
            }
        }
        return 'success';
    };
    $scope.scrollToElem = {"content" : '.comment-notification-container', "status":true};
    $scope.deletemsgFn = function (t) {
       
            notification.notify({
                type: "confirm",
                message: "Are you sure you want to delete the message?",
                buttons: [
                    { "title": "YES", "result": "yes" },
                    { "title": "NO", "result": "no" }
                ]
            }, function (response) {
                if (response.result == 'yes') {

                }
            });
        
    }

    

    $scope.commentFieldkeyupFn = function () {

    }

    $scope.deleteattchmentFn = function (t) {
    
            notification.notify({
                type: "confirm",
                message: "Are you sure you want to delete all the attachments?",
                buttons: [
                    { "title": "YES", "result": "yes" },
                    { "title": "NO", "result": "no" }
                ]
            }, function (response) {
                if (response.result == 'yes') {

                }
            });
        
    }

    $scope.shareSelectFn = function (shareWithOpts,list) {
        $scope.shareWithOpts.selectedOption = "";
        $timeout(function () {
            $scope.shareWithOpts.selectedOption = list;
        },10)
    }

    $scope.selectUser = {
        options: [
            { "name": "Tred Joshua" },
            { "name": "Brad Thomos" },
            { "name": "Peter Brook" },
            { "name": "John Doe" }
        ],
        selectedUser: { "name": "Tred Joshua" }
    };

    $scope.reassignCallback = function(){
        shareWithCtrl.data.value = {
            "name": $scope.selectUser.selectedUser.name,
            "reassigned": true,
            "reassignedBtnClick": true
        };
    }

    $scope.userTypeOptions = [
        {
            "name": "Requester"
        },
        {
            "name": "Buyer"
        },
        {
            "name": "Entity Owner"
        },
        {
            "name": "Receiver"
        }
    ];
    $scope.selectedUserType = { "name": "Requester" };
};
function uploadAttachmentFunc($scope, $timeout) {
    $scope.newFile = [];
    $scope.docDiscription = {
        fileSupport: "Supported file formats: doc, docx, pdf, jpg, jpeg, png, tiff."
    }
    $scope.emptyNewFile = function () {
        $scope.newFile = [];
        
        
    }

};
function mapCtrlFunc($scope, $timeout) {
    var locations = [
            {
                location: 'Europ',
                address: 'London',
                lat: 51.5081,
                long: -.128
            },
            {
                location: 'Asia',
                address: '701, Mindspace, Building No.3, Thane-Belapur Road, Airoli, Navi Mumbai - 400708',
                lat: 19.076,
                long: 72.8777
            },
            {
                location: 'USA',
                address: 'Los Angeles',
                lat: 34.0522,
                long: -118.2437
            },
             {
                 location: 'BU',
                 address: 'Extra Address',
                 lat: 17.4132,
                 long: 78.5267
             }];



    var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(40.06883, 1.28604),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();
    /*create the marker*/
    var createMarker = function (info) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.location
        });
        marker.content = '<div class="infoWindowContent">' + info.address + '</div>';

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<div style="width:200px;"><h6>' + marker.title + '</h6><div>' + marker.content + '</div> <button onclick="" class="btn hoverable waves-effect wave-light">Get Address</button></div>');
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }
    var i = 0;
    for (i = 0; i < locations.length; i++) {
        createMarker(locations[i]);
    }

    /*end the marker*/

    $scope.openInfoWindow = function (e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

    $scope.$parent.$watch('mapPopup', function () {
         $timeout(function () {
             google.maps.event.trigger($scope.map, 'resize');
         }, 100);
     });

    /*search box*/
   
};

angular.module('SMART2')
.controller('expressPopupCtrl', ['$scope', '$timeout', '$translate', expressPopupCtrlFunc])
.controller('expressOrderPopupCtrl', ['$scope', '$timeout', '$translate', expressOrderPopupCtrlFunc]);

function expressPopupCtrlFunc($scope, $timeout, $translate) {
	$scope.expressLists = [
	  { itemNumber: '713510715', name: 'Apple MacBook MF865HN/A 12-inch Retina Display Laptop.', supplier: 'Apple', unitPrice: '1299', qty: '10', uom: 'each', operator: '*', total: '1000', actionIconDelete: true },
	  { itemNumber: '498593952', name: 'HP Spectre 13-V039TU 13.3-inch Laptop (i5-6200U/8GB/256GB/Windows 10 Pro)', supplier: 'HP', unitPrice: 1573.59, qty: '10', uom: 'each', operator: '*', total: '15000', actionIconDelete: true, actionIconAdd: true }
	];

    //express list grid Data -- clear property on focus
	$scope.clearField = function (e, obj, data) {
	    obj[data] = '';
	}

	$scope.addBtnConfig = { title: $translate.instant("ADD") };
	$scope.createOrderBtnConfig = { title: $translate.instant("CREATE ORDER") };
	$scope.okBtnConfig = { title: $translate.instant("OK") };
	$scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };
	$scope.removeRow = removeRowFunc;
	$scope.createOrder = createOrderFunc;
	$scope.addRow = addRowFunc;
	$scope.removeRow = removeRowFunc; 

	// express list grid Data -- remove the row specified in index
	function removeRowFunc(index) {
		$scope.expressLists.splice(index, 1);
		if ($scope.expressLists.length() === 0) {
			$scope.expressLists = [];
		}
	};
	function createOrderFunc(e) {
		routeSvc.goTo('#p2p/order/new');
	}
	function addRowFunc(obj, data) {
		$scope.expressLists[$scope.expressLists.length - 1].actionIconAdd = false;
		$scope.expressLists.push({ itemNumber: '', name: '', supplier: 'Supplier', unitPrice: '100', qty: '', uom: '', total: 'Total', actionIconDelete: true, actionIconAdd: true });
		$scope.expressLists[0].actionIconDelete = true;

		/* AFTER ADDING THE ITEM SCROLL STAYS AT BOTTOM */
		$timeout(function () {
			var targetElement = angular.element('.isLast'),
                targetElementTop = targetElement.offset().top;
			$('html,body').find(".scrollToEnd .scrollbar-outer").animate({ scrollTop: targetElement.offset().top }, "slow");
			console.log(targetElement.height());
			targetElement.addClass('highlight');
			setTimeout(function () {
				targetElement.removeClass('highlight');
			}, 3000);
		}, 500, false);
		/* AFTER ADDING THE ITEM SCROLL STAYS AT BOTTOM ENDS */
	};
	function removeRowFunc(index) {
	    if ($scope.expressLists.length > 1) {
	        if ($scope.expressLists.length == 2) {
	            $scope.expressLists[1].actionIconDelete = false;
	        }
	        $scope.expressLists.splice(index, 1);
	    }
	};

}


function expressOrderPopupCtrlFunc($scope, $timeout, $translate) {
    $scope.expressLists = [
	  { itemNumber: '713510715', name: 'Apple MacBook MF865HN/A 12-inch Retina Display Laptop.', supplier: 'Apple', unitPrice: '1299', qty: '10', uom: 'each', operator: '*', total: '1000', actionIconDelete: true, actionIconAdd: false }
    ];

    //express list grid Data -- clear property on focus
    $scope.clearField = function (e, obj, data) {
        obj[data] = '';
    }

    $scope.addBtnConfig = { title: $translate.instant("ADD") };
    $scope.createOrderBtnConfig = { title: $translate.instant("CREATE ORDER") };
    $scope.okBtnConfig = { title: $translate.instant("OK") };
    $scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };

    $scope.removeRow = function () {
        $scope.expressLists.splice(0, 1);
    }
}