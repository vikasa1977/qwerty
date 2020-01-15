angular.module('SMART2')
    .controller('addNewSupplierCtrl', ['$scope', '$rootScope', 'RuleEngine', '$http', addNewSupplierCtrlFunc]);

function addNewSupplierCtrlFunc($scope, $rootScope, RuleEngine, $http) {


        $scope.emailRules = [{
        "rule": "!(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this))",
        "error": "Enter valid email id"
        }
       
    ];

	
	$scope.supplierSourceType = [
		{			
			"title": "Supplier Source Type1"
		},
		{
			"title": "Supplier Source Type2"
		},
		{
		    "title": "Supplier Source Type3"
		}
	];
	$scope.selectLanguage = [
		{
			"title": "English"
		},
		{
			"title": "Russian"
		}
	];
	$scope.selectTimeZone = [
		{
			"title": "(UTC-11:0) International Date 1"
		},
		{
		    "title": "(UTC-11:30) International Date 2"
		},
		{
			"title": "(UTC-12:00) International Date 3"
		}
	];
	$scope.selectApprovalType = [
		{
			"title": "Pool"
		},
		{
			"title": "Pool"
		}
	];
	$scope.onChangeApproverDD = function () {
		this.options = [
			{
				"ColumnId": 1,
				"approver": "Simon Baron"
			}, {
				"ColumnId": 2,
				"approver": "Leslie Bolton"
			}, {
				"ColumnId": 3,
				"approver": "Amy Wilson"
			}, {
				"ColumnId": 4,
				"approver": "Kristen Bell"
			}, {
				"ColumnId": 5,
				"approver": "Billy Renolds"
			}
		];
	};

	$scope.optionsSupp = [
		{
			"UserId": 28360,
			"UserName": "SRUser1@outlook.com",
			"FirstName": "SR ",
			"LastName": "User1"
		}, {
			"UserId": 28977,
			"UserName": "test1",
			"FirstName": "Test",
			"LastName": ""
		}, {
			"UserId": 57950,
			"UserName": "HShah",
			"FirstName": "Harshit",
			"LastName": "Shah"
		}
	];

	$scope.selectedSupp = [{
		"UserId": 28360,
		"UserName": "SRUser1@outlook.com",
		"FirstName": "SR ",
		"LastName": "User1"
	}, {
		"UserId": 28977,
		"UserName": "test1",
		"FirstName": "Test",
		"LastName": ""
	}];	
}
