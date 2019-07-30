(function (angular) {
    'use strict';
    angular.module('SMART2')
   
	.controller('approvalProjectCtrl', ['$scope', '$http', '$state', '$filter', 'shareWithCtrl', 'notification', 'notificationService', approvalProjectFn]);

    function approvalProjectFn($scope, $http, $state, $filter, shareWithCtrl, notification, notificationService) {
        //Saving Project start here.

        $scope.mode = $state.params.mode;

        $scope.projectApproval = {
            "name": "MANAGE APPROVAL - MSA PROJECT FOR IT CATEGORY",
            "status": "DRAFT"
        };

        $scope.projectApprovalTabsData = [
            {

                "title": "Realized Savings",
                "contentUrl": "project/ppst/views/realizedSavingsApproval.html",
                "active": true,

            },
             {
                 "title": "Negotiated Savings",
                 "contentUrl": "project/ppst/views/negotiatedSavingsApproval.html",
                 "active": false,

             },
             {
                 "title": "Estimated Saving",
                 "contentUrl": "project/ppst/views/estimatedSavingApproval.html",
                 "active": false,
             }];


        $scope.approvalPathList = shareWithCtrl.data.value ? shareWithCtrl.data.value : [];

        $scope.selfApproval = function () {
            var config = {
                type: "confirm",
                message: "<p class='left-align'>Your all levels will get removed & document will get self approved. Are you sure you want to proceed?</p>",
                buttons: [
                {
                    "title": "YES",
                    "result": "true"
                },
                {
                    "title": "NO",
                    "result": "false"
                }
                ]
            }

            notification.notify(config, function (result) {
                if (result.result == "true") {
                    $scope.selectedForApproval = [];
                } else {
                    $scope.currentlySelected = { "tabName": "Users" };
                }
            });
        }
        $scope.sendForApprovalCall = function () {
            var config = {
                type: "success",
                message: "<p class='center-align'>The Banket BPO-2016.000001 has been sent for approval</p>",
                buttons: [
                    {
                        "title": "OK",
                        "result": "ok"
                    }
                ]
            }

            notification.notify(config, function (result) {
                if (result.result == "ok") {
                    $state.go("contract.new", { mode: "blanketdata" });
                }
            });
        }


        $scope.levelApproval = function () {
            //console.log($scope.approvalPathList);
            //$scope.approvalPathList = [];
            /*var list = notificationService.list();
            while (list.length) { list.pop(); }
            var approvalData = [], a, b = {
                1: "st",
                2: "nd",
                3: "rd"
            };
            for (var i = 0; i < $scope.approvalPathList.length; i++) {
                var obj = $scope.approvalPathList[i];
                a = {};
                a.ApprovalLevel = (i + 1) + (b[i + 1] ? b[i + 1] : 'th') + ' Level';
                a.typee = obj.team.length > 1 ? "Parallel" : "Pool";
                a.Approvers = obj.team.length > 1 ? (obj.team[0].name + " + " + (obj.team.length - 1) + " More") : obj.team[0].name;
                notificationService.save(a);
            };*/
            //$state.go('catalog.admincatalog.new');

            if ($scope.mode == 'AdminCatalogApproval') {
                shareWithCtrl.data.value = $scope.approvalPathList;
                $state.go('catalog.admincatalog.new');
            }
            else if ($scope.mode == 'AdminContractApproval') {
                shareWithCtrl.data.value = $scope.approvalPathList;
                $state.go('contract.manageLine');
            }
        };
    }
})(angular);
