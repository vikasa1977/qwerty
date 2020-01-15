(function (angular, SmartController) {
    "use strict";
    SmartController.create("dataExport", ["$scope", "$smartModal", dataExportCard]);

    function dataExportCard($scope, $smartModal) {
        //$scope.actions = [{
        //    "key": "View Templates",
        //    "value": ""
        //}, {
        //    "key": "Select & Filter",
        //    "value": ""
    	//}];

    	$scope.showExportLogPopup = false;

    	$smartModal.initModal({
    		templateUrl: "shared/analyse/views/popupExportLog.html",
    		show: "showExportLogPopup",
    		onHide: "onHideExportLogPopup()",
			type: "large",
    		$scope: $scope
    	});

    	$scope.onHideExportLogPopup = function () {
    		$scope.showExportLogPopup = false;
    	}

    	
    	$scope.vm = {
    	    focusSearch: false,
    	    isActiveSearch: false,
    	    showMe: false,
    	    exportData: [
            {
                name: 'Supplier List Export',
                time: "03/01/2016 12:32:00 PM",
                records: 15000,
                id: 12345678901234567890,
                status: 0,
                requestType: 'Transaction Data',
                size: '5.50 MB'
            }, {
                name: 'MRO category FY 2014-15',
                time: "03/01/2016 12:32:00 PM",
                records: 18080,
                id: 1234,
                status: 1,
                requestType: 'Transaction Data',
                size: '5.50 MB'
            }, {
                name: 'Manufacturing BU data export 2014',
                time: "03/01/2016 12:32:00 PM",
                records: 28080,
                id: 1234,
                status: 1,
                requestType: 'Transaction Data',
                size: '5.50 MB'
            }, {
                name: 'MRO Spend',
                time: "03/01/2016 12:32:00 PM",
                records: 8080,
                id: 1234,
                status: 0,
                requestType: 'Transaction Data',
                size: '5.50 MB'
            }, {
                name: 'Qtr Spend for MRO category',
                time: "03/01/2016 12:32:00 PM",
                records: 74080,
                id: 1234,
                status: 2,
                requestType: 'Transaction Data',
                size: '5.50 MB'
            },
             {
                 name: 'Supplier List Export',
                 time: "03/01/2016 12:32:00 PM",
                 records: 15000,
                 id: 1234567890,
                 status: 0,
                 requestType: 'Transaction Data',
                 size: '5.50 MB'
             }, {
                 name: 'MRO category FY 2014-15',
                 time: "03/01/2016 12:32:00 PM",
                 records: 18080,
                 id: 1234,
                 status: 1,
                 requestType: 'Transaction Data',
                 size: '5.50 MB'
             }, {
                 name: 'Manufacturing BU data export 2014',
                 time: "03/01/2016 12:32:00 PM",
                 records: 28080,
                 id: 1234567890,
                 status: 1,
                 requestType: 'Transaction Data',
                 size: '5.50 MB'
             }, {
                 name: 'MRO Spend',
                 time: "03/01/2016 12:32:00 PM",
                 records: 8080,
                 id: 1234567890,
                 status: 0,
                 requestType: 'Transaction Data',
                 size: '5.50 MB'
             }, {
                 name: 'Qtr Spend for MRO category',
                 time: "03/01/2016 12:32:00 PM",
                 records: 74080,
                 id: 12341234,
                 status: 2,
                 requestType: 'Transaction Data',
                 size: '5.50 MB'
             }
    	    ]
    	};

    	$scope.vm.showSearch = function () {
    	    $scope.vm.isActiveSearch = true;
    	    $scope.vm.focusSearch = true;
    	    $scope.vm.showMe = true;
    	    $scope.vm.hideClose = true;
    	}

    	$scope.vm.hideSearch = function () {
    	    $scope.vm.isActiveSearch = false;
    	    $scope.vm.focusSearch = false;
    	    $scope.vm.hideClose = false;
    	}
        $scope.mapStatusClass = function (status) {
            var cls = {
                0: { class: 'active-state', icon: '#icon_Download', tooltip: "Download" },
                1: { class: 'partial-state', icon: '#icon_Download', tooltip: "In Progress" },
                2: { class: 'error-state', icon: '#icon_Warning', tooltip: "Error" },
                3: { class: 'not-started-state', icon: '#icon_Download', tooltip: "Not Started" }
            };
            return cls[status];
        }
    }
})(angular, SmartController);