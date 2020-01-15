(function (angular) {
    'use strict';
    angular.module('SMART2')
        .service('PPSTService', ['$http','$q','$window','$timeout', PPSTServiceFn]);

    // Service function
    function PPSTServiceFn($http, $q, $window, $timeout) {

        // check if empty object
        this.checkEmpty = function (a_obj) {
            if (Object.keys(a_obj).length === 0 && a_obj.constructor === Object) {
                return true;
            } else {
                return false;
            }
        }
        // set validate true/false
        this.setValidate = function (a_data, a_bool) {
            for (var key in a_data) {
                a_data[key] = a_bool;
            }
            return a_data;
        }
        // IF all items for team members selected
        this.isAllTeamMemSelected;
        this.setTeamMemFlag = function (a_bool) {
            this.isAllTeamMemSelected = a_bool;
        }
        this.isBackFromTeamMem = false;
        this.setAddingTeamMem = function (a_data) {
            this.isBackFromTeamMem = a_data;
        }
        this.getAddingTeamMem = function () {
            return this.isBackFromTeamMem;
        }
        this.getTeamMemFlag = function () {
            return this.isAllTeamMemSelected;
        }
        // IF all items for team suppliers selected
        this.isAllSupplierSelected;
        this.setSupplierFlag = function (a_bool) {
            this.isAllSupplierSelected = a_bool;
        }
        this.isBackFromSupplier = false;
        this.setAddingSupplier = function (a_data) {
            this.isBackFromSupplier = a_data;
        }
        this.getAddingSupplier = function () {
            return this.isBackFromSupplier;
        }
        this.getSupplierFlag = function () {
            return this.isAllSupplierSelected;
        }
        //JSOn to create to new records
        this.newMilestoneSkeleton = {
            "milestoneName": "",
            "assignedTo": "",
            "dueBy": "",
            "type": "",
            "progressStatus": {
                "icon": "url",
                "completion": "Yes"
            },
            "description": "",
            "comment": {
                "commentBy": "",
                "commentDate": "",
                "commentMsg": ""
            },
            "achieved": false,
            "notAchieved": false,
            "attachments": [
              {
                  "fileName": "file name 1",
                  "path": "path"
              },
              {
                  "fileName": "file name 1",
                  "path": "path"
              }
            ],
            "id": "",
            "isChecked": false,
            "isActive": false,
            "activities": [
              {
                  "activityName": "",
                  "description": "",
                  "infoIcon": {
                      "url": "path",
                      "message": "Info Icon message"
                  },
                  "completionStatus": "Not Started",
                  "activityCount": 0,
                  "stageStatus": "Completed",
                  "attachments": [
                    {
                        "fileName": "filename 1"
                    }
                  ],
                  "comments": {
                      "commentBy": "",
                      "commentDate": ""
                  },
                  "assignedTo": "",
                  "beginDate": "",
                  "dueBy": "",
                  "type": "",
                  "isItemChecked": false,
                  "id": "",
                  "showExpanded": false
              }
            ]
        };
        this.newMilestoneSummary = {};
        this.projCreatedOn = new Date(); // Default be current date
        // Function returns the form widget config data for PPST module
        this.getFormConfigData = function () {
            var url = 'project/ppst/models/ppst.json';
             return $http.get(url).then(function (respData) {
                return  respData.data;
            }).catch(function (error) {
                return error;
            });
        }

        this.setProjCreateDate = function (a_date) {
            this.projCreatedOn = a_date;
        }
        this.getProjCreateDate = function () {
            return this.projCreatedOn;
        }

        // Returns the response as promise for all the mentioned URLS
        // Input should be an array of obj having url and method property.
        this.getJSONData = function (a_urls) {
            var allPromises = a_urls.map(function (item) {
                return $http({
                    'method': item.method,
                    'url' : item.url
                });
            });

            return $q.all(allPromises);
        }

        // For Savings type and Impact
        this.savingsImpactData = [{
            "title": "Cost Avoidance",
            "recurringFlag": true,
            "recurringValue": false,
            },
            {
                "title": "Cost Reduction",
                "otfmFlag": true,
                "otfmValue": false,
                "recurringFlag": true,
                "recurringValue": false,
            },
            {
                "title": "Gain Share",
                "otlmFlag": true,
                "otlmValue": false,
            },
            {
                "title": "Rebate",
                "otlmFlag": true,
                "otlmValue": false,
                "recurringLongFlag": true,
                "recurringLongValue": false
            }
        ];
        this.savingsImpactDataColumns = [
                {
                    label: "One Time - First Month"
                },
                {
                    label: "Recurring long Header goes here lorem ipsum"
                },
                {
                    label: "Recurring long Header goes here lorem"
                }
                , {
                    label: "Recurring long Header goes here lorem"
                },
                {
                    label: "Recurring long Header goes here lorem"
                },
                {
                    label: "Recurring long Header goes here lorem"
                }
        ];

        // Set and get data for selected milstone
        this.selectedMilestone = {};
        this.setSelectedMilestone = function (a_data) {
            this.selectedMilestone = a_data;
        }
        this.getSelectedMilestone = function () {
            return this.selectedMilestone;
        }

        // Set new newMilestoneSummary
        this.setNewSumamry = function (a_data) {
            this.newMilestoneSummary = a_data;
        }
        this.getNewSummary = function () {
            return this.newMilestoneSummary;
        }

        // Unique id generator
        this.uniqueIDGenerator = function () {
            var d = new Date().getTime();
            var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uniqueID;
        };

        this.mergeArray = function (arr1, arr2) {
            var arr = [arr1, arr2];
            var finalArra = [];
            for (var indx = 0; indx < arr.length; indx++) {
                var tArr = arr[indx];
                for (var inc = 0; inc < tArr.length; inc++) {
                    finalArra.push(tArr[inc]);
                }
            }
            return finalArra;
        }

        // Applicable for methods
        //Set CBR selection
        this.cbrSelected = {};
        this.setCBRSelection = function (cbrType, data) { // data would be an array of objects
            switch (cbrType) {
                case 'category':
                    this.cbrSelected.category = data;
                    break;
                case 'bu':
                    this.cbrSelected.bu = data;
                    break;
                case 'region':
                    this.cbrSelected.region = data;
                    break;
            }
        }
        this.getCBRSelection = function () {
            return this.cbrSelected;
        }

        // To take scroll to a particular section
        this.scrollToSection = function (formWidgetNumber, sectionIndex, a_top, ev) {
            var $target = $('#form-widget-' + formWidgetNumber + '-section-' + sectionIndex),
                top = (a_top) ? a_top : 0;
            $("body").animate({ scrollTop: $target.offset().top - top }, "slow");
            if (ev) {
                ev.preventDefault();
            }
        }

        this.setFocus = function (id) {
            $timeout(function () {
                var element = $('[dataid=' + id + ']').children("input");
                if (element)
                    element.focus();
            }, 500);
        }
    }


})(angular);