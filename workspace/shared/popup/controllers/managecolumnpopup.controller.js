'use strict';

angular
    .module('SMART2')
    .controller('managecolumnpopupCtrl', ['$scope', '$timeout', managecolumnpopupCtrlFunc]);

function managecolumnpopupCtrlFunc($scope, $timeout) {
    $scope.columnLists = [
      {
           name: 'Order Attributes',
           value: [
                        {
                        name: 'Order Name',
                        check: false
                        },
                        {
                        	name: 'Revision Number',
                        	check: false
                        },
                        {
                        	name: 'Signatory',
                        	check: false
                        },
                        {
                        	name: 'Order Type',
                        	check: false
                        },
                        {
                        	name: 'Order Number',
                        	check: false
                        },
                        {
                        	name: 'Revision Number',
                        	check: false
                        }
           ]
       },
        {
            name: 'Line Attributes',
            value: [
                         {
                         	name: 'Order Name',
                         	check: false
                         },
                         {
                         	name: 'Revision Number',
                         	check: false
                         },
                         {
                         	name: 'Signatory',
                         	check: false
                         },
                         {
                         	name: 'Order Type',
                         	check: false
                         },
                         {
                         	name: 'Order Number',
                         	check: false
                         },
                         {
                         	name: 'Revision Number',
                         	check: false
                         }
            ]
        },
         {
             name: 'Status',
             value: [
                          {
                          	name: 'Order Name',
                          	check: false
                          },
                          {
                          	name: 'Revision Number',
                          	check: false
                          },
                          {
                          	name: 'Signatory',
                          	check: false
                          },
                          {
                          	name: 'Order Type',
                          	check: false
                          },
                          {
                          	name: 'Order Number',
                          	check: false
                          },
                          {
                          	name: 'Revision Number',
                          	check: false
                          }
             ]
         },
        {
            name: 'Dates',
            value: [
                         {
                         	name: 'Order Name',
                         	check: false
                         },
                         {
                         	name: 'Revision Number',
                         	check: false
                         },
                         {
                         	name: 'Signatory',
                         	check: false
                         },
                         {
                         	name: 'Order Type',
                         	check: false
                         },
                         {
                         	name: 'Order Number',
                         	check: false
                         },
                         {
                         	name: 'Revision Number',
                         	check: false
                         }
            ]
        }
    ];
    $scope.showChildElement = function (index) {

        if (!$scope.columnLists[index].opened) {
            $scope.columnLists[index].forEach(function (element, index) {
                $scope.columnLists[index].opened = false;
            });
            $scope.columnLists[index].opened = true;
        }
        else {
            $scope.columnLists[index].opened = false;
        }
      
    }
    $scope.toggleCheckbox = function (getSelected, index) {
        if (!getSelected) {
            $scope.columnLists[index].childrens.forEach(function (element, index) {
                $scope.columnLists[index].childrens.isSelected = false;
            });
        }
        else {
            $scope.columnLists[index].childrens.forEach(function (element, index) {
                $scope.columnLists[index].childrens.isSelected = true;
            });
        }
      
    }
    
}