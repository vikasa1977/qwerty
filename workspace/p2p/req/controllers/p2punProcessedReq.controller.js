angular.module('SMART2')

    .controller('unProcessedReqCtrl', ['$scope', '$rootScope', '$translate', 'RuleEngine', '$http', '$state', 'notification', '$timeout', '$filter', '$sce', unProcessedReqCtrlFunc])

.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
          '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
});

function unProcessedReqCtrlFunc($scope, $rootScope, $translate, RuleEngine, $http, $state, notification, $timeout, $filter, $sce) {

    $scope.getDataBtnConfig = { title: $translate.instant("GET DATA") };

    $scope.dataFilterRange = { 'from': '1457094173954', 'to': '1457094173954' }
    var count = 0;
    /*grid option*/
    $scope.gridOptionsUserInfo = {
        "paginationPageSizes": [10, 20, 30, 40, 50],
        "paginationPageSize": 30,
        "data": [
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189273",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10268",
             //    "ItemLineNumber": 15,
             //    "Description": "Laptop Dell",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Technology",
             //    "GlCode": "228282",
             //    "SupplierName": "Beijing",
             //    "SupplierName": "Lenovo",
             //    "SupplierCode": "SUP112791",
             //    "NeedbyDate": "15/5/2016",
             //    "RequestedDate": "13/4/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 150,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189273",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10268",
             //    "ItemLineNumber": 15,
             //    "Description": "Laptop Dell",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Technology",
             //    "GlCode": "228282",
             //    "SupplierName": "Beijing",
             //    "SupplierName": "Lenovo",
             //    "SupplierCode": "SUP112791",
             //    "NeedbyDate": "15/5/2016",
             //    "RequestedDate": "13/4/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 150,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189274",
             //    "PurchaseType": "Service-Variable",
             //    "ItemNumber": "111-10269",
             //    "ItemLineNumber": 12,
             //    "Description": "System Maintenance",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Technology",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierName": "Fujitsu",
             //    "SupplierCode": "SUP112790",
             //    "NeedbyDate": "28/6/2016",
             //    "RequestedDate": "19/5/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 28,
             //    "UOM": "EA:Each",
             //    "Value": "INR 1,465.02",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},
             //{
             //    "RequisitionNumber": "REQ-2016-189272",
             //    "PurchaseType": "Standard",
             //    "ItemNumber": "111-10267",
             //    "ItemLineNumber": 14,
             //    "Description": "Sample Product",
             //    "ItemCategory": "IT/Telecom",
             //    "Requester": "Nikhil Gulhane",
             //    "Buyer": "John Doe",
             //    "BusinessUnit": "Outsourcing",
             //    "GlCode": "228282",
             //    "SupplierName": "Mumbai",
             //    "SupplierCode": "SUP112792",
             //    "NeedbyDate": "9/4/2016",
             //    "RequestedDate": "10/3/2016",
             //    "StartDate": "--",
             //    "EndDate": "--",
             //    "Efforts": "--",
             //    "Quantity": 30,
             //    "UOM": "EA:Each",
             //    "Value": "GBP 1,465.01",
             //    "RequisitionStatus": "Approved",
             //    "RequisitionAge": "12 Days",
             //    "CatalogDescription": "Catalog Based"
             //},,
             {
                  "RequisitionNumber": "REQ-2016-189273",
                  "PurchaseType": "Standard",
                  "ItemNumber": "111-10268",
                  "ItemLineNumber": 15,
                  "Description": "Laptop Dell",
                  "ItemCategory": "IT/Telecom",
                  "Requester": "Nikhil Gulhane",
                  "Buyer": "John Doe",
                  "BusinessUnit": "Technology",
                  "GlCode": "228282",
                  "SupplierName": "Beijing",
                  "SupplierName": "Lenovo",
                  "SupplierCode": "SUP112791",
                  "NeedbyDate": "15/5/2016",
                  "RequestedDate": "13/4/2016",
                  "StartDate": "--",
                  "EndDate": "--",
                  "Efforts": "--",
                  "Quantity": 150,
                  "UOM": "EA:Each",
                  "Value": "GBP 1,465.01",
                  "RequisitionStatus": "Approved",
                  "RequisitionAge": "12 Days",
                  "CatalogDescription": "Catalog Based"
              },
             {
                 "RequisitionNumber": "REQ-2016-189273",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10268",
                 "ItemLineNumber": 15,
                 "Description": "Laptop Dell",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Technology",
                 "GlCode": "228282",
                 "SupplierName": "Beijing",
                 "SupplierName": "Lenovo",
                 "SupplierCode": "SUP112791",
                 "NeedbyDate": "15/5/2016",
                 "RequestedDate": "13/4/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 150,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189274",
                 "PurchaseType": "Service-Variable",
                 "ItemNumber": "111-10269",
                 "ItemLineNumber": 12,
                 "Description": "System Maintenance",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Technology",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierName": "Fujitsu",
                 "SupplierCode": "SUP112790",
                 "NeedbyDate": "28/6/2016",
                 "RequestedDate": "19/5/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 28,
                 "UOM": "EA:Each",
                 "Value": "INR 1,465.02",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189272",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10267",
                 "ItemLineNumber": 14,
                 "Description": "Sample Product",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Outsourcing",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierCode": "SUP112792",
                 "NeedbyDate": "9/4/2016",
                 "RequestedDate": "10/3/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 30,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189272",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10267",
                 "ItemLineNumber": 14,
                 "Description": "Sample Product",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Outsourcing",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierCode": "SUP112792",
                 "NeedbyDate": "9/4/2016",
                 "RequestedDate": "10/3/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 30,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189273",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10268",
                 "ItemLineNumber": 15,
                 "Description": "Laptop Dell",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Technology",
                 "GlCode": "228282",
                 "SupplierName": "Beijing",
                 "SupplierName": "Lenovo",
                 "SupplierCode": "SUP112791",
                 "NeedbyDate": "15/5/2016",
                 "RequestedDate": "13/4/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 150,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                  "RequisitionNumber": "REQ-2016-189272",
                  "PurchaseType": "Standard",
                  "ItemNumber": "111-10267",
                  "ItemLineNumber": 14,
                  "Description": "Sample Product",
                  "ItemCategory": "IT/Telecom",
                  "Requester": "Nikhil Gulhane",
                  "Buyer": "John Doe",
                  "BusinessUnit": "Outsourcing",
                  "GlCode": "228282",
                  "SupplierName": "Mumbai",
                  "SupplierCode": "SUP112792",
                  "NeedbyDate": "9/4/2016",
                  "RequestedDate": "10/3/2016",
                  "StartDate": "--",
                  "EndDate": "--",
                  "Efforts": "--",
                  "Quantity": 30,
                  "UOM": "EA:Each",
                  "Value": "GBP 1,465.01",
                  "RequisitionStatus": "Approved",
                  "RequisitionAge": "12 Days",
                  "CatalogDescription": "Catalog Based"
              },
             {
                 "RequisitionNumber": "REQ-2016-189272",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10267",
                 "ItemLineNumber":14,
                 "Description": "Sample Product",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Outsourcing",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierCode": "SUP112792",
                 "NeedbyDate": "9/4/2016",
                 "RequestedDate": "10/3/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 30,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189273",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10268",
                 "ItemLineNumber": 15,
                 "Description": "Laptop Dell",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Technology",
                 "GlCode": "228282",
                 "SupplierName": "Beijing",
                 "SupplierName": "Lenovo",
                 "SupplierCode": "SUP112791",
                 "NeedbyDate": "15/5/2016",
                 "RequestedDate": "13/4/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 150,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189274",
                 "PurchaseType": "Service-Variable",
                 "ItemNumber": "111-10269",
                 "ItemLineNumber": 12,
                 "Description": "System Maintenance",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Technology",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierName": "Fujitsu",
                 "SupplierCode": "SUP112790",
                 "NeedbyDate": "28/6/2016",
                 "RequestedDate": "19/5/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 28,
                 "UOM": "EA:Each",
                 "Value": "INR 1,465.02",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189275",
                 "PurchaseType": "Service-Variable",
                 "ItemNumber": "111-10270",
                 "ItemLineNumber": 24,
                 "Description": "HR Management System installation",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Outsourcing",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierName": "Fujitsu",
                 "SupplierCode": "SUP112789",
                 "NeedbyDate": "28/8/2016",
                 "RequestedDate": "29/6/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 20,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Order Created",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"

             },
             {
                 "RequisitionNumber": "REQ-2016-189276",
                 "PurchaseType": "Service-Fixed",
                 "ItemNumber": "111-10271",
                 "ItemLineNumber": 9,
                 "Description": "HR Management System installation",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Outsourcing",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierName": "Fujitsu",
                 "SupplierCode": "SUP112788",
                 "NeedbyDate": "20/8/2016",
                 "RequestedDate": "19/7/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 57,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Order Created",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                 "RequisitionNumber": "REQ-2016-189277",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10272",
                 "ItemLineNumber": 12,
                 "Description": "IP Phone",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Kamlesh Bhalade",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Outsourcing",
                 "GlCode": "228282",
                 "SupplierName": "New Jersey",
                 "SupplierName": "Fujitsu",
                 "SupplierCode": "SUP112787",
                 "NeedbyDate": "28/10/2016",
                 "RequestedDate": "27/8/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 56,
                 "UOM": "EA:Each",
                 "Value": "GBP 1,465.01",
                 "RequisitionStatus": "Order Created",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"

             },
             {
                  "RequisitionNumber": "REQ-2016-189278",
                  "PurchaseType": "Standard",
                  "ItemNumber": "111-10273",
                  "ItemLineNumber": 10,
                  "Description": "IP Phone",
                  "ItemCategory": "IT/Telecom",
                  "Requester": "Naushad",
                  "Buyer": "John Doe",
                  "BusinessUnit": "Outsourcing",
                  "GlCode": "228282",
                  "SupplierName": "New Jersey",
                  "SupplierName": "Polycom",
                  "SupplierCode": "SUP112786",
                  "NeedbyDate": "18/11/2016",
                 "RequestedDate": "13/9/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 12,
                 "UOM": "EA:Each",
                 "Value": "USD 1,465.03",
                 "RequisitionStatus": "Order Created",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"

             },
             {
                 "RequisitionNumber": "REQ-2016-189279",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10274",
                 "ItemLineNumber": 19,
                 "Description": "IP Phone",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Satyajeet Dhere",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Technology",
                 "GlCode": "228282",
                 "SupplierName": "Beijing",
                 "SupplierName": "Polycom",
                 "SupplierCode": "SUP112785",
                 "NeedbyDate": "28/11/2016",
                 "RequestedDate": "24/10/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 110,
                 "UOM": "EA:Each",
                 "Value": "INR 1,465.02",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"
             },
             {
                  "RequisitionNumber": "REQ-2016-189280",
                  "PurchaseType": "Standard",
                  "ItemNumber": "111-10275",
                  "ItemLineNumber": 14,
                  "Description": "Router",
                  "ItemCategory": "IT/Telecom",
                  "Requester": "Nikhil Gulhane",
                  "Buyer": "John Doe",
                  "BusinessUnit": "Technology",
                  "GlCode": "228282",
                  "SupplierName": "New Jersey",
                  "SupplierName": "HRIS",
                  "SupplierCode": "SUP112784",
                  "NeedbyDate": "28/12/2016",
                  "RequestedDate": "25/11/2016",
                  "StartDate": "--",
                  "EndDate": "--",
                  "Efforts": "--",
                  "Quantity": 104,
                  "UOM": "EA:Each",
                  "Value": "GBP 1,465.01",
                  "RequisitionStatus": "Approved",
                  "RequisitionAge": "12 Days",
                  "CatalogDescription": "Catalog Based"
              },
             {
                 "RequisitionNumber": "REQ-2016-189281",
                 "PurchaseType": "Standard",
                 "ItemNumber": "111-10276",
                 "ItemLineNumber": 14,
                 "Description": "Laptop Dell",
                 "ItemCategory": "IT/Telecom",
                 "Requester": "Nikhil Gulhane",
                 "Buyer": "John Doe",
                 "BusinessUnit": "Technology",
                 "GlCode": "228282",
                 "SupplierName": "Mumbai",
                 "SupplierName": "HRIS",
                 "SupplierCode": "SUP112783",
                 "NeedbyDate": "28/11/2016",
                 "RequestedDate": "28/10/2016",
                 "StartDate": "--",
                 "EndDate": "--",
                 "Efforts": "--",
                 "Quantity": 107,
                 "UOM": "EA:Each",
                 "Value": "USD 1,465.00",
                 "RequisitionStatus": "Approved",
                 "RequisitionAge": "12 Days",
                 "CatalogDescription": "Catalog Based"

             }
        ],
        onRegisterApi: function (gridApi) {
            //set gridApi on scope
            $scope.showAllCheckbox = false;
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
              
                if (row.isSelected) {
                    count += 1;
                }
                else {
                    count -= 1
                }
                
                if (count === 0) {
                    $scope.showAllCheckbox = false

                }else{
                
                    $scope.showAllCheckbox = true
                }


                
            });
 
            gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
                
                $scope.showAllCheckbox = !$scope.showAllCheckbox;
                
            });
        },

        "enableFiltering": true,
        "enablePinning": false,
        "enableCellEditOnFocus": true,
        "showTreeExpandNoChildren": true,
        "rowHeight": 30,
        "columnDefs": [
            {
                "field": "RequisitionNumber",
                "width": 180,
                "displayName": "Requisition Number",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "cellTooltip": true,
                "name": "Requisition Number",
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": true,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "string",
                "cellClass": 'left-align'

            },
            {
                 "field": "PurchaseType",
                 "width": 180,
                 "displayName": "Purchase Type",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "PurchaseType",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": true,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "string",
                 "cellClass": 'left-align'

             },
            {
                "field": "ItemNumber",
                "width": 180,
                "displayName": "Item Number",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "cellTooltip": true,
                "name": "ItemNumber",
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": true,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'left-align'

            },
            {
                   "field": "ItemLineNumber",
                   "width": 180,
                   "displayName": "Item Line Number",
                   "enableHiding": false,
                   "suppressRemoveSort": true,
                   "enableCellEdit": false,
                   "enableFiltering": true,
                   "cellTooltip": true,
                   "name": "ItemLineNumber",
                   "cellEditableCondition": true,
                   "enableCellEditOnFocus": true,
                   "enableColumnMoving": true,
                   "enablePinning": false,
                   "enableColumnResizing": true,
                   "allowCellFocus": true,
                   "type": "number",
                   "cellClass": 'left-align'

               },
            {
                 "field": "Description",
                 "width": 180,
                 "displayName": "Description",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "Description",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": false,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "string",
                 "cellClass": 'left-align'

             },
            {
                 "field": "ItemCategory",
                 "width": 180,
                 "displayName": "Item Category",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "ItemCategory",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": false,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "string",
                 "cellClass": 'left-align'

             },
            {
                "field": "Requester",
                "width": 180,
                "displayName": "Requester",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "cellTooltip": true,
                "name": "Requester",
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "string",
                "cellClass": 'left-align'

            },  
            {
                "field": "Buyer",
                "width": 180,
                "displayName": "Buyer",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "cellTooltip": true,
                "name": "Buyer",
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "string",
                "cellClass": 'left-align'

            },
            {
                 "field": "BusinessUnit",
                 "width": 180,
                 "displayName": "Business Unit",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "BusinessUnit",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": false,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "number",
                 "cellClass": 'left-align'

             },
            {
                 "field": "GlCode",
                 "width": 180,
                 "displayName": "Gl Code",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "GlCode",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": false,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "number",
                 "cellClass": 'left-align'

             },
            {
                 "field": "ShiptoLocation",
                 "width": 180,
                 "displayName": "Ship to Location",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "ShiptoLocation",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": false,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "string",
                 "cellClass": 'left-align'

             },
            {
                 "field": "SupplierName",
                 "width": 180,
                 "displayName": "Supplier Name",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "SupplierName",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": false,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "string",
                 "cellClass": 'left-align'

             },
            {
                 "field": "SupplierCode",
                 "width": 180,
                 "displayName": "Supplier Code",
                 "enableHiding": false,
                 "suppressRemoveSort": true,
                 "enableCellEdit": false,
                 "enableFiltering": true,
                 "cellTooltip": true,
                 "name": "SupplierCode",
                 "cellEditableCondition": true,
                 "enableCellEditOnFocus": true,
                 "enableColumnMoving": true,
                 "enablePinning": false,
                 "enableColumnResizing": true,
                 "allowCellFocus": true,
                 "type": "number",
                 "cellClass": 'left-align'

             },
            {
                "field": "NeedbyDate",
                "width": 180,
                "displayName": "Need by Date",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "cellTooltip": true,
                "name": "NeedbyDate",
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'right-align'

            },
            {
                "field": "RequestedDate",
                "width": 180,
                "displayName": "Requested Date",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "cellTooltip": true,
                "name": "RequestedDate",
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'left-align'
            },
            {
               "field": "StartDate",
               "width": 180,
               "displayName": "Start Date",
               "enableHiding": false,
               "suppressRemoveSort": true,
               "enableCellEdit": false,
               "enableFiltering": true,
               "cellTooltip": true,
               "name": "StartDate",
               "cellEditableCondition": true,
               "enableCellEditOnFocus": true,
               "enableColumnMoving": true,
               "enablePinning": false,
               "enableColumnResizing": true,
               "allowCellFocus": true,
               "type": "number",
               "cellClass": 'left-align'
           },
            {
                  "field": "EndDate",
                  "width": 180,
                  "displayName": "End Date",
                  "enableHiding": false,
                  "suppressRemoveSort": true,
                  "enableCellEdit": false,
                  "enableFiltering": true,
                  "cellTooltip": true,
                  "name": "EndDate",
                  "cellEditableCondition": true,
                  "enableCellEditOnFocus": true,
                  "enableColumnMoving": true,
                  "enablePinning": false,
                  "enableColumnResizing": true,
                  "allowCellFocus": true,
                  "type": "number",
                  "cellClass": 'left-align'
              },
            {
                "field": "Efforts",
                "width": 180,
                "displayName": "Efforts",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "cellTooltip": true,
                "name": "Efforts",
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'left-align'
            },
            {
                "field": "Quantity",
                "width": 180,
                "displayName": "Quantity",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "name": "Quantity",
                "cellTooltip": true,
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'left-align'

            },
            {
                "field": "UOM",
                "width": 230,
                "displayName": "UOM",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "name": "UOM",
                "cellTooltip": true,
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'left-align'
            },
            {
                "field": "Value",
                "width": 230,
                "displayName": "Value",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "name": "Value",
                "cellTooltip": true,
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'right-align'
            },
            {
                "field": "RequisitionStatus",
                "width": 230,
                "displayName": "Requisition Status",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "name": "RequisitionStatus",
                "cellTooltip": true,
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "string",
                "cellClass": 'left-align'
            },
            {
                "field": "RequisitionAge",
                "width": 230,
                "displayName": "Requisition Age",
                "enableHiding": false,
                "suppressRemoveSort": true,
                "enableCellEdit": false,
                "enableFiltering": true,
                "name": "RequisitionAge",
                "cellTooltip": true,
                "cellEditableCondition": true,
                "enableCellEditOnFocus": true,
                "enableColumnMoving": true,
                "enablePinning": false,
                "enableColumnResizing": true,
                "allowCellFocus": true,
                "type": "number",
                "cellClass": 'left-align'
        },
            {
             "field": "CatalogDescription",
             "width": 230,
             "displayName": "Catalog Description",
             "enableHiding": false,
             "suppressRemoveSort": true,
             "enableCellEdit": false,
             "enableFiltering": true,
             "name": "CatalogDescription",
             "cellTooltip": true,
             "cellEditableCondition": true,
             "enableCellEditOnFocus": true,
             "enableColumnMoving": true,
             "enablePinning": false,
             "enableColumnResizing": true,
             "allowCellFocus": true,
             "type": "string",
             "cellClass": 'left-align'
         }
        ],
        "excludeProperties": ["$$hashKey"],
        "enableRowHashing": true,
        "flatEntityAccess": false,
        "showHeader": true,
        "headerRowHeight": 30,
        "minRowsToShow": 10,
        "showGridFooter": false,
        "showColumnFooter": false,
        "columnFooterHeight": 30,
        "gridFooterHeight": 30,
        "columnWidth": 50,
        "maxVisibleColumnCount": 200,
        "virtualizationThreshold": 20,
        "columnVirtualizationThreshold": 10,
        "excessRows": 4,
        "scrollThreshold": 4,
        "excessColumns": 4,
        "horizontalScrollThreshold": 2,
        "aggregationCalcThrottle": 500,
        "wheelScrollThrottle": 70,
        "scrollDebounce": 300,
        "enableSorting": true,
        "enableColumnMenus": true,
        "enableVerticalScrollbar": 1,
        "enableHorizontalScrollbar": 1,
        "enableMinHeightCheck": true,
        "minimumColumnSize": 10,
        "headerTemplate": null,
        "footerTemplate": "ui-grid/ui-grid-footer",
        "gridFooterTemplate": "ui-grid/ui-grid-grid-footer",
        "rowTemplate": "ui-grid/ui-grid-row",
        "appScopeProvider": null,
        "cellEditableCondition": true,
        "enableColumnMoving": true,
        "enableColumnResizing": true,
        "enableRowSelection": true,
        "multiSelect": true,
        "noUnselect": false,
        "modifierKeysToMultiSelect": false,
        "enableRowHeaderSelection": true,
        "enableFullRowSelection": false,
        "enableSelectAll": true,
        "enableSelectionBatchEvent": true,
        "selectionRowHeaderWidth": 30,
        "enableFooterTotalSelected": true,
        "modifierKeysToMultiSelectCells": false
    };
    /*grid option end*/

    //$scope.showAllCheckbox = false;

    console.log('sdf');
    console.log($scope.gridOptionsUserInfo.headerButtonClick);
    $scope.gridOptionsUserInfo.headerButtonClick = function () {
        console.log('sdfdsfsd');
    };
    //accounting details -- manage columns
    $scope.manageColumns = function () {
        $scope.accfields = [];
        $scope.accfields = [
        { 'lable': 'Requested Date' },
        { 'lable': 'Shipping Method' },
        { 'lable': 'Procurement Option' },
        { 'lable': 'Inventory Type' },
        { 'lable': 'Matching' },
        { 'lable': 'Supplier Code' },
        { 'lable': 'Supplier Contact' },
        { 'lable': 'Manufacturer Name' },
        { 'lable': 'Manufacturer P...' },
        { 'lable': 'Contract Name' },
        { 'lable': 'Contract Expiry Date' },
        { 'lable': 'Contract Value' },
        { 'lable': 'Payment Terms' },
        ];

        $scope.noOfCol = parseInt(Math.round($scope.fields.length / 5));
        $scope.colWidth = 200;
        $scope.listHolderWidth = { 'width': $scope.noOfCol * $scope.colWidth + "px" }
        $scope.startVal = 0;


        $scope.getStartFrom = function () {
            $scope.startVal += 1;
        };

        $scope.cloneDiv = function (n) {
            return new Array(n);
        };

        $scope.itemsLimit = 5;
        $scope.itemsColumnized = function (myIndex) {
            var currentPageIndex = myIndex * $scope.itemsLimit;
            return $scope.fields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };
    };

    $scope.exportActions = [
            { 'key': 'ADD TO SPACE' },
            { 'key': 'CREATE BID AND BUY' },
            { 'key': 'CREATE RFX' },
            { 'key': 'CREATE PO' },
            { 'key': 'ASSIGN'}
    ];

    //save view popup
    $scope.savedViewPopupUrl = "shared/popup/views/popupSavedView.html";
    $scope.savedViewPopUp = false;
    $scope.savedViewPopupFor = '';
    $scope.saveNewView = false;
    $scope.savedViewPopupCallback = function (e) {
        $scope.savedViewPopUp = true;

    };
    $scope.savedViewPopupHideCallback = function () {
        $scope.savedViewPopUp = false;
        $scope.savedViewPopupFor = '';
    };


    //save view popup
    $scope.saveViewPopupUrl = "shared/popup/views/popupSaveView.html";
    $scope.saveViewPopUp = false;
    $scope.saveViewPopupFor = '';
    $scope.saveNewView = false;
    $scope.saveViewPopupCallback = function (e) {
        $scope.saveViewPopUp = true;
    };
    $scope.saveViewPopupHideCallback = function () {
        $scope.saveViewPopUp = false;
        $scope.saveViewPopupFor = '';
    };


    // manage Attributes
    $scope.manageAttributesPopupUrl = "shared/popup/views/popupManageFields.html";
    $scope.manageAttributesPopUp = false;
    $scope.manageAttributesPopupCallback = function () {
        $scope.manageAttributesPopUp = true;

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


    /*filter alert bar*/

    $scope.isApplyFilters = true;
    $scope.isSavedView = false;



    // On AssignTo functionality
    $scope.showOnBehalf = false;
    $scope.showOnBehalfClick = function () {
        $scope.showOnBehalf = true;
    }
    $scope.currencyOptions = [{ "title": "REQUEST FOR MYSELF", "id": "1" }, { "title": "ORDER FOR MYSELF", "id": "2" }, { "title": "REQUEST FOR OTHERS", "id": "3" }];
    $scope.configObj = { "title": "REQUEST FOR MYSELF", "id": "1" };

    $scope.selectedItemPopupUrl = "catalog/requesterCatalog/views/popupSelectItem.html";
    $scope.selectedItemPopup = false;
    $scope.selectedItemShowPopup = function (e) {
        $scope.selectedItemPopup = true;
    };
    $scope.OnBehalfOfUrl = [{ "code": "1", "name": "Phil James" }, { "code": "2", "name": "Robin Ross" }, { "code": "3", "name": "Shane Anderson" }, { "code": "4", "name": "Shane Bond" }, { "code": "5", "name": "Phil Huges" }];
    $scope.filterDataByCategory = [{ "name": "Laptops" }, { "name": "Laptop Chargers and Adapters" }, { "name": "Laptop Accessories" }, { "name": "Computer Memory" }, { "name": " Laptop Bags" }, { "name": " Laptop Chargers and Adapters" }, { "name": "Laptop Bags" }];
    $scope.filterDataBySuppliers = [{ "name": "Office Depot" }, { "name": "Dell" }, { "name": "Wallmart" }, { "name": "Canon" }, { "name": "Staples" }, { "name": "eBay" }, { "name": "Wallmart" }];
    $scope.filterDataBycatalogType = [{ "name": "Internal" }, { "name": "Hosted" }];
    $scope.selectedPerson = {};
    $scope.getVal = function (e) {
        $scope.selectedPerson = e;
    }

    /* OBO DATA */
    $scope.OBOData = [
		 { "name": 'Phil James' },
		 { "name": 'Robin Ross' },
		 { "name": 'Shane Anderson' },
		 { "name": 'Shane Bond' },
		 { "name": 'Phil Huges' }
    ];

    $scope.oboSelected = { "name": "EUR" };
    /* OBO DATA ENDS */

    //On Assign dropdown
    $scope.popupOnBehalfOfUrl = 'p2p/req/views/popupAssignTo.html';
    $scope.popupOnBehalfOf = false;
    $scope.changeSavedView = function (indexName) {
        $scope.selectedSavedview = { 'name': indexName };
        if (indexName == 'REQUEST FOR OTHERS') {
            $scope.popupOnBehalfOf = true;
        }
    };
    $scope.popupOnBehalfOfCallback = function (e) {
        $scope.popupOnBehalfOf = false;
    }

    $scope.popupOnBehalfOfCall = function (e) {
        $scope.popupOnBehalfOf = true;
    }

    $scope.selectedSavedview = { 'name': 'REQUEST FOR MYSELF' };
    $scope.savedViews = [
   { 'name': 'REQUEST FOR MYSELF' },
   { 'name': 'ORDER FOR MYSELF' },
   { 'name': 'REQUEST FOR OTHERS' }
    ];

    /* POPUP SEARCH */
    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };
    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    };


    
    //$scope.documentsOptions = [
    //    { "title": "Group By" },
    //    { "title": "None" },
    //    { "title": "test group one" },
    //    { "title": "test group Two" },
    //    { "title": "Lorem Ipsum" }
    //];
    //$scope.selectedDocument = { "title": "Group By" };

    $scope.currencyOptions = [
        { "title": "None" },
        { "title": "Purchase Type" },
        { "title": "Item" },
        { "title": "Item Category" },
        { "title": "Requester" },
        { "title": "Ship to Location" },
        { "title": "Supplier Name" },
        { "title": "Need by Date" },
        { "title": "Status of Requisition" },
        { "title": "Age of Requisition" }
    ];
    //$scope.selectedCurrency =  { "title": "Group By" };
    //$scope.onChange = function (selectedCurrency) {
    //    console.log(selectedCurrency);
    //};


    //$scope.gridOptions = {
    //    enableRowSelection: true,
    //    enableSelectAll: true,
    //};

    //$scope.gridOptions.onRegisterApi = function (gridApi) {
    //    //set gridApi on scope
    //    $scope.gridApi = gridApi;
    //    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
    //        var msg = 'row selected ' + row.isSelected;
    //        $log.log(msg);
    //    });

    //    gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
    //        var msg = 'rows changed ' + rows.length;
    //        $log.log(msg);
    //    });
    //};
    //$scope.headerButtonClick = function () { console.log('rttr') }



   
};
