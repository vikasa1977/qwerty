(function (angular) {
    'use strict';
    angular
	.module('SMART2')
	.controller('questionnaireCtrl', ['$scope', '$http', '$timeout', 'routeSvc', '$state', 'notification', '$document', '$window', '$filter', 'questionScrollTo', '$sce', 'conditionScrollTo', '$focusOnField', questionnaireCtrlFunc])
	// Need to merge questionScrollTo with ScrollTo service
	.service('questionScrollTo', [function () {
	    this.perform = function (source, staticValue, aSpeed, onComplete) {
	        try {
	            staticValue = typeof staticValue !== 'undefined' ? staticValue : 0;
	            aSpeed = typeof aSpeed !== 'undefined' ? aSpeed : 300;

	            angular.element('body,html').animate({
	                scrollTop: source.offsetTop + staticValue,

	            }, aSpeed, function () {
	                if (typeof onComplete != "undefined") {
	                    onComplete();
	                }
	            });
	        } catch (e) { }
	    };
	}])
	.service('conditionScrollTo', [function () {
	    this.perform = function (aSpeed, onComplete) {
	        try {
	            aSpeed = typeof aSpeed !== 'undefined' ? aSpeed : 300;

	            angular.element('#conditionDataWrap').animate({
	                scrollTop: 1000
	            }, aSpeed, function () {
	                if (typeof onComplete != "undefined") {
	                    onComplete();
	                }
	            });
	        } catch (e) { }
	    };
	}]);



    function testQuest($scope) {
        $scope.questionnaireData = [{ "question": [{ "title": "asdasdasdsads1", "isfocus": false, "isvalidate": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 0, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "asdasdas2", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "asdasd4", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q1", "$$hashKey": "object:422" }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "saffasf", "description": "sfasfsf", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "$$hashKey": "object:739", "preview": false }, { "title": "asdasdasdsads12", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 0, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "asdasdasdsads12Opt", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "asdasdasdsads12Opt2", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q2", "$$hashKey": "object:783" }, { "title": "", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 0, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": true, "name": "Q3" }] }];
        $scope.questionnaireGoto = { "option": [{ "name": '1' }, { "name": '2' }, { "name": '3' }], "questSelectedOption": "" };
    }
    function conditionalNumber(scope) {
        var questionnaireTempData = scope.questionnaireData[0].question;
        var counter,
	        counterWoLable = 0;
        scope.questionnaireGoto.option = [];
        for (counter = 0; counter < questionnaireTempData.length; counter++) {
            if (angular.isDefined(scope.questionnaireData[0].question[counter].questionType.type) && scope.questionnaireData[0].question[counter].questionType.type !== 'label-type') {
                counterWoLable++;
                scope.questionnaireData[0].question[counter].name = 'Q' + counterWoLable;
                scope.questionnaireGoto.option.push({ name: counterWoLable + '', questionSectionIndex: counter + 1 });
                //console.log(counterWoLable, "counterWoLable", scope.questionnaireData[0].question[counter].name)
            } else {
                scope.questionnaireData[0].question[counter].name = 'Label';
                //console.log('La', scope.questionnaireData[0].question[counter].name)

            }
        }
        scope.questionnaireData[0].question.length === 1 ? scope.isFirstQuestion = true : scope.isFirstQuestion = false;
        questionnaireTempData = [];
        console.log(JSON.stringify(scope.questionnaireData), JSON.stringify(scope.questionnaireGoto))
    }

    function questionnaireCtrlFunc($scope, $http, $timeout, routeSvc, $state, notification, $document, $window, $filter, questionScrollTo, $sce, conditionScrollTo, $focusOnField) {
        $scope.questionItemShow = function (conditionalCheck, pagePreview) {
            if (pagePreview && conditionalCheck) {
                return false;
            } else {
                return true;
            }
        }
        $scope.saveResponseScorecard = function () {

            Materialize.toast('Response Has Been Saved Sucessfully', 2000);
        }
        $scope.submitResponseScorecard = function () {
            var submitScorecardResponse = {
                type: "confirm",
                message: "Are you sure you want to submit your response?",
                buttons: [{
                    "title": "yes",
                    "result": 1
                },
				{
				    "title": "No",
				    "result": 0
				}]
            };
            notification.notify(submitScorecardResponse, function (response) {

                if (response.result) {
                    Materialize.toast('Response Has Been Submitted Sucessfully', 2000);
                }

            });
        }
        //popup view repetability 
        $scope.showRepeatabilityPopup = false;
        $scope.rfpopupData = {};
        var rfpopupDataIndex = 0,
        rfpopupDataTempIndex = 0;

        $scope.showRepeatabilityPopupCallback = function (data) {
            $scope.showRepeatabilityPopup = true;

            $scope.rfpopupData.option = angular.copy(data.options);
            $scope.rfpopupData.selectedOption = $scope.rfpopupData.option[rfpopupDataIndex];

        }
        $scope.repeatabilityonChangeItem = function (e) {
            rfpopupDataTempIndex = e;
        }
        $scope.rfpopupDataSave = function (data) {
            $scope.questionnaireDataList.supplierList.selectedOption.respondBy.selectedOption.repeatabilityFactortData.selectedOption = data.selectedOption;
            rfpopupDataIndex = rfpopupDataTempIndex;
        }
        $scope.onRepetabilityHideCallback = function () {
            $scope.showRepeatabilityPopup = false;
            $scope.rfpopupData = {};
        }

        $scope.kpiDataTypeOption = {
            "selectiontext": "KPI 1"
        }
        $scope.questionnaireDataList = {

            supplierList: {
                selectTypeOption: {
                    "selectiontext": "Jake 1"
                },
                selectedOption: {
                    name: "Jake 1",
                    respondBy: {
                        selectedOption: {
                            name: "AyyappaKumar",
                            infochip: "Supplier",
                            repeatabilityFactortData: {
                                selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                options: [
                                    { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 5" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 6" }] } }
                                ]
                            }
                        },
                        options: [
                                {
                                    name: "AyyappaKumar",
                                    infochip: "Supplier",
                                    repeatabilityFactortData: {
                                        selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                        options: [
                                            { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                        ]
                                    }
                                },
                                {
                                    name: "Yogesh Bhagchandani",
                                    infochip: "Evaluator",
                                    repeatabilityFactortData: {
                                        selectedOption: { "businessunit": "IT Hardware", "region": "America", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 4" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                        options: [
                                            { "businessunit": "Consulting", "region": "America", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                        ]
                                    }
                                },
                                {
                                    name: "Yogesh B",
                                    infochip: "Supplier",
                                    repeatabilityFactortData: {
                                        selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                        options: [
                                            { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                        ]
                                    }
                                },
                                {
                                    name: "Rahul Y",
                                    infochip: "Evaluator",
                                    repeatabilityFactortData: {
                                        selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                        options: [
                                            { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                        ]
                                    }
                                }
                        ]
                    }
                },
                options: [
                    {
                        name: "Jake 1",
                        respondBy: {
                            selectedOption: {
                                name: "AyyappaKumar",
                                infochip: "Supplier",
                                repeatabilityFactortData: {
                                    selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                    options: [
                                        { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 5" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 6" }] } }
                                    ]
                                }
                            },
                            options: [
                                    {
                                        name: "AyyappaKumar",
                                        infochip: "Supplier",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Yogesh Bhagchandani",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "IT Hardware", "region": "America", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 4" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "America", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Yogesh B",
                                        infochip: "Supplier",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Rahul Y",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    }
                            ]
                        }
                    },
                    {
                        name: "Jake 2",
                        respondBy: {
                            selectedOption: {
                                name: "Sachin Mule",
                                role: "Supplier",
                                repeatabilityFactortData: {
                                    selectedOption: { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                    options: [
                                        { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 5" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 6" }] } }
                                    ]
                                }
                            },
                            options: [
                                    {
                                        name: "Sachin Mule",
                                        infochip: "Supplier",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 5" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 6" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Sneha Tiwari",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Yogesh B",
                                        infochip: "Supplier",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Rahul Y",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    }
                            ]
                        }
                    },
                    {
                        name: "Jake 3",
                        respondBy: {
                            selectedOption: {
                                name: "Kamlesh B",
                                infochip: "Evaluator",
                                repeatabilityFactortData: {
                                    selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                    options: [
                                        { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 5" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 6" }] } }
                                    ]
                                }
                            },
                            options: [
                                    {
                                        name: "Kamlesh B",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Sneha Tiwari",
                                        infochip: "Supplier",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Yogesh B",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Rahul Y",
                                        infochip: "Supplier",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    }
                            ]
                        }
                    },
                    {
                        name: "Jake 4",
                        respondBy: {
                            selectedOption: {
                                name: "Renju M",
                                infochip: "Supplier",
                                repeatabilityFactortData: {
                                    selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                    options: [
                                        { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 5" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 6" }] } }
                                    ]
                                }
                            },
                            options: [
                                    {
                                        name: "Renju M",
                                        infochip: "Supplier",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Sneha Tiwari",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Yogesh B",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    },
                                    {
                                        name: "Rahul Y",
                                        infochip: "Evaluator",
                                        repeatabilityFactortData: {
                                            selectedOption: { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } },
                                            options: [
                                                { "businessunit": "Consulting", "region": "Africa", "category": "Logistics", "kpiData": {} }, { "businessunit": "Consulting", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Africa", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }, { "businessunit": "Architecture", "region": "Asia", "category": "Logistics", "kpiData": { selectedOption: { "name": "KPI 1" }, options: [{ "name": "KPI 1" }, { "name": "KPI 2" }, { "name": "KPI 3" }, { "name": "KPI 4" }] } }
                                            ]
                                        }
                                    }
                            ]
                        }
                    }
                ]
            }
        };

        $scope.questionnaireForm = false;
        $scope.supplierCancel = function () {
            $state.go('supplier.scorecard', { mode: 'savedDraft' });
        }
        $scope.scoreCardCancelBtn = false;
        $scope.questionnaireScorecard = false;
        $scope.readonlyFormData = false;
        if ($state.params.pageFor == 'form') {
            $scope.questionnaireForm = true;
        }
        //if ($state.params.pageFor !== 'scorecard') {
        //    $scope.questionnaireData = [
        //   { "question": [{ "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Customer Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "How many customers do you currently supply to?", "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "", "score": "" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": { "fileUploadVal": "", "link": "", "list": [{ "name": "attachment1.xls" }, { "name": "attachment2.xls" }, { "name": "attachment3.xls" }, { "name": "attachment4.xls" }] }, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "isvalidate": false, "preview": false, "name": "Q1", "questionSerialNo": 1 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Company Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please describe any past and planned changes to your business operations including expansions and facility closings.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text (Formatted)", "type": "multi-text-format", "template": "multi-text-format" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q2", "questionSerialNo": 2 }, { "title": "Information required about any and all lawsuits, liens, restraining orders, consent decrees, foreclosures, or other legal/financial actions either now pending, in progress, or which have been brought against the company or any of its officers/principals in the past three years.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q3", "questionSerialNo": 3 }, { "title": "What are your capabilities for electronic payment and ordering?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q4", "questionSerialNo": 4 }, { "title": "Do you have any volume limitations? Please specify if any.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q5", "questionSerialNo": 5 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Financial Basics", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "What is your D & B Registration #:", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q6", "questionSerialNo": 6 }, { "title": "Please attach a D&B Report on your Company?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Attachment Only", "type": "attachment-only", "template": "attachment-only" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": true, "check": true, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q7", "questionSerialNo": 7 }, { "title": "What is your approach to managing price volatility?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q8", "questionSerialNo": 8 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Delivery", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Can you provide delivery to the following location: Hamilton, MS - 39746 and Green River, WY - 82935?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": {}, "config": [{ "options": [{ "title": "Yes", "score": "", "isvalidate": false, "isfocus": false }] }, { "options": [{ "title": "No", "score": "", "isvalidate": false, "isfocus": false }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] } }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q9", "questionSerialNo": 9 }, { "title": "Which is the nearest Distribution Center to above locations?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "Hamilton", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "New York", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q10", "questionSerialNo": 10 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Company Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Company Name", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q11", "questionSerialNo": 11 }, { "title": "Web Address", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q12", "questionSerialNo": 12 }, { "title": "Company Public or Privately held?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": {}, "config": [{ "options": [{ "title": "Public", "score": "", "isvalidate": false, "isfocus": false }] }, { "options": [{ "title": "Private", "score": "", "isvalidate": false, "isfocus": false }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] } }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q13", "questionSerialNo": 13 }, { "title": "Year Established?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "", "score": "" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q14", "questionSerialNo": 14 }, { "title": "Number of Employees?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "", "score": "" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q15", "questionSerialNo": 15 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Financial Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please provide with your financial Information?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Combination Matrix", "type": "grid-type-combination", "template": "grid-type-combination" }, "questionResponse": { "rows": [{ "title": "Revenue ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Net Income ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Total Cash ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Total Debt ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q16", "questionSerialNo": 16 }, { "title": "Has your company ever filed for bankruptcy? If yes, explain", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q17", "questionSerialNo": 17 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Account Management and Service", "description": "An individual be assigned as a National Account Manager to perform the following specific duties at a minimum:\n 1) Closely work with the Category Manager in respect to IT Systems Supplies\n 2) Proactive communication of product availability, back orders, and any other delivery or customer service related issues\n 3) Reporting of late shipments\n 4) Travel to meet with Category Manager as needed\n 5) Proactively monitor inventory and suggest improved efficiencies\n 6) Assist Category Manager in forecasting\n 7) Prepare and present monthly reviews for managers", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Quality", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please list your company's quality certifications (ISO-9000, ISO-14000, etc.)", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Combination Matrix", "type": "grid-type-combination", "template": "grid-type-combination" }, "questionResponse": { "rows": [{ "title": "Certifications and Awards", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Organization", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Date", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q18", "questionSerialNo": 18 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Payment Terms", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Payment terms are Net 45 days. Do you comply?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": {}, "config": [{ "options": [{ "title": "Yes", "score": "", "isvalidate": false, "isfocus": false }] }, { "options": [{ "title": "No", "score": "", "isvalidate": false, "isfocus": false }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] } }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q19", "questionSerialNo": 19 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Additional details", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Date and time when your company was incorporated", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.43, "lock": false, "questionType": { "name": "Date/Time", "type": "date-time", "template": "date-time" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q20", "checkdate": true, "date": "", "questionSerialNo": 20 }] }
        //    ];
        //}
        if ($state.params.pageFor == 'scorecard') {
            //var scorecardQuestionnaireData = {
            //    method: 'GET',
            //    url: 'shared/questionnaire/models/questionnaireData.json'
            //};

            //$http(scorecardQuestionnaireData).then(function (response) {

            //    $scope.questionnaireData = response.data;


            //}, function (error) {
            //    console.log(JSON.stringify(error));
            //});
            $scope.questionnaireScorecard = true;
            $scope.pagePreview = true;

        }
        if ($state.params.pageFor == 'scorecard' && $state.params.mode == 'edit') {
            $scope.scoreCardCancelBtn = true;
            $scope.questionnaireScorecard = true;
            $scope.supplierReadonly = false;
            $scope.readonlySupData = false;

        }
        if ($state.params.pageFor == 'scorecard' && $state.params.mode == 'preview') {
            $scope.scoreCardCancelBtn = true;
            $scope.questionnaireScorecard = true;
            $scope.supplierReadonly = true;
            $scope.readonlySupData = true;
        }
        $scope.supplierConfirm = function () {

            var quesCreatedNotif = {
                type: "success",
                message: "Questionnaire has been succesfully created",
                buttons: [
                    { "title": "OK", "result": "yes" }
                ]
            };
            notification.notify(quesCreatedNotif, function (response) {
                if ($state.params.pageFor == 'sourcing') {
                    routeSvc.stateTo('sourcing.rfx.new');
                }
                else if ($state.params.pageFor == 'form') {
                    routeSvc.stateTo('supplier.form', { mode: 'savedDraft' });
                }
                else if ($state.params.pageFor == 'scorecard') {
                    routeSvc.stateTo('supplier.scorecard', { mode: 'savedDraft' });
                }
                else {
                    routeSvc.stateTo('supplier.new');
                }

            });



        };
        $scope.isQuestionnaireTypeVisible = false;
        $scope.pageTitle = "KPI";
        $scope.pageForSourcing = false;
        $scope.fieldName = "KPI Name";
        $scope.backTo = "supplier.new";
        $scope.supplierPublicRfx = false;
        if ($state.params.pageFor == 'sourcingPublicRfx') {
            $scope.supplierPublicRfx = true;
            $scope.isQuestionnaireTypeVisible = true;
        }
        if ($state.params.pageFor == 'sourcing' || $state.params.pageFor == 'sourcingPublicRfx') {
            $scope.isQuestionnaireTypeVisible = true;
            $scope.pageFor = 'sourcing';
            $scope.pageTitle = 'QUESTIONNAIRE';
            $scope.pageForSourcing = true;
            $scope.fieldName = 'Questionnaire Name';
            $scope.isAutoWeight = true;
            $scope.backTo = "sourcing.rfx.new";
        }
        $scope.pageForForm = false;
        if ($state.params.pageFor == 'form') {
            if ($state.params.mode == 'preview') { $scope.readonlyFormData = true; }
            if ($state.params.mode == 'edit') { $scope.readonlyFormData = false; }

            $scope.pageFor = 'form';
            $scope.pageTitle = 'QUESTIONNAIRE';
            $scope.pageForForm = true;
            $scope.fieldName = 'Questionnaire Name';
            $scope.isAutoWeight = true;
            $scope.backTo = "supplier.form";
        }
        $scope.manufacturingOptions = [{ name: 'Yes' }, { name: 'No' }];
        $scope.selectedManufacturingOption = { name: 'Yes' };
        $scope.labourOptions = [{ name: 'Yes' }, { name: 'No' }];
        $scope.selectedLabourOption = { name: 'Yes' };

        function gridRowColMerge(parentind, ind) {
            var questionnaireCols = $scope.questionnaireData[parentind]['question'][ind]['questionResponse']['cols'];
            if ($scope.questionnaireData[parentind]['question'][ind].hasOwnProperty('questionResponse')) {
                angular.forEach($scope.questionnaireData[parentind]['question'][ind]['questionResponse']['rows'], function (valQuest, keyQuest) {
                    valQuest['cols'] = angular.copy(questionnaireCols);
                });
            }
            questionnaireCols = {};
        };
        $scope.questionnaireDataTlength = 0;
        $scope.emptyText = '';
        $scope.scoreformula = '(Response1*Response2)/2'; // Temp scope variable - '$scope.scoreformula' need to be removed.
        $scope.$on('LastRepeaterElement', function (scope, element, attrs) {
            attrs.parentindex = !attrs.parentindex ? 0 : attrs.parentindex;
            if (!$scope.readonlySupData) {
                gridRowColMerge(attrs.parentindex, attrs.childindex);

            }
            //var questionnaireCols = $scope.questionnaireData[attrs.parentindex]['question'][attrs.childindex]['questionResponse']['cols'];
            //angular.forEach($scope.questionnaireData[attrs.parentindex]['question'][attrs.childindex]['questionResponse']['rows'], function (valQuest, keyQuest) {
            //	valQuest['cols'] = angular.copy(questionnaireCols);
            //});
            //questionnaireCols = {};
        });

        $scope.gridTypechangeFn = function (ind) {
            gridRowColMerge(0, ind);
        };
        //$scope.onSort = function (e) {
        //	console.log(e)
        //}
        $scope.onChangesectionTypeOptions = function (data) {
            $scope.sectionSelectedOption = data;
        };
        $scope.parentPreview = true;
        $scope.pagePreview = false;
        $scope.TotalAmount = 0;
        $scope.conditionalQuestionTypeOptions = [];
        $scope.conditionalQuestionTypeOptionsFlag = false;

        var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
        $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
        // Start: Add guideline popup
        $scope.addDocumentPoupUrl = "shared/popup/views/popupUploadDoc.html";
        $scope.addDocumentPopup = false;



        $scope.addDocumentPopupCallback = function ($index) {

            $scope.attachDocFlag = true;
            $scope.hideDownloadTemplate = false;

            setTimeout(function () {
                questionScrollTo.perform(document.getElementById('subsection-1-' + ($index + 1)), 400);
            }, 200);
        }
        $scope.showPreviewAttchmnentList = false;
        $scope.attachAction = function () {

            $timeout(function () {

                $scope.showPreviewAttchmnentList = true;
            }, 500);
        }

        $scope.hideAddDocumentPopupCallback = function () {
            $scope.addDocumentPopup = false;
        };
        // Start: Upload events
        $scope.attachFlag = false;
        $scope.attachmentList = [
            {
                name: "AttachmentOne.xls",
                status: "fail",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
            },
            {
                name: "AttachmentTwo.xls",
                status: "fail",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
            },
            {
                name: "AttachmentThree.xls",
                status: "fail",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
            },
            {
                name: "AttachmentFour.xls",
                status: "success",
                referenceName: "Add Name",
                isShow: true,
                actionIconDelete: false
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
        // End: Upload events

        // Start: questionnaire type popup
        $scope.qualificationCheckContent = false;
        $scope.questionnaireTypeOptions01 = [{ title: 'Event questionnaire' }];
        $scope.questionnaireTypeOptions02 = [{ title: 'Qualification questionnaire' }];
        $scope.selectedQType = { title: 'Qualification questionnaire' };
        $scope.selectedquestionnaireType = { title: 'Event questionnaire' };
        $scope.qualificationCheck = function () {
            $scope.qualificationCheckContent = true;
        };
        $scope.questionnaireCheck = function () {
            $scope.qualificationCheckContent = false;
        };
        $scope.questionnaireTypeAdded = { title: 'Event questionnaire' };
        $scope.questionnaireTypePopup = false;
        $scope.questionnaireTypePopupCallback = function (e) {
            $scope.questionnaireTypePopup = true;
        };
        $scope.popupTypeApplyCallback = function () {

            if ($scope.qualificationCheckContent) {
                for (var i = 0; i < $scope.conditionsData.length; i++) {
                    if ($scope.conditionsData[i].fromRange === '' || $scope.conditionsData[i].fromRange === null) {
                        $scope.conditionsData[i].isValidate = true;
                        return;
                    }

                }
                $scope.questionnaireTypeAdded = { title: 'Qualification questionnaire' };
            }
            else {
                $scope.questionnaireTypeAdded = { title: 'Event questionnaire' };
            }
            $scope.questionnaireTypePopup = false;
        };

        $scope.questionnaireTypePopUpOnHideCallback = function (e) {
            $scope.questionnaireTypePopup = false;
        };

        $scope.questionsNo = [{ title: 'Questions 1' }, { title: 'Questions 2' }, { title: 'Questions 3' }, { title: 'Questions 4' }];
        $scope.selectedServicesInfo1 = { title: 'Questions 1' };
        $scope.questionsNo2 = [{ title: 'greater than' }, { title: 'less than' }, { title: 'equal to' }];
        $scope.selectedServicesInfo2 = { title: 'greater than' };
        $scope.emptyRule = [
                {
                    "rule": "this === '' || this === null",
                    "error": "Enter value"
                }
        ];


        $scope.conditionsData =
           [
               {
                   "questionsNo": true,
                   "conditionValuestate": true,
                   "showRange": false,
                   "isVisibleSwitch": true,
                   "fromRange": 0,
                   "isValidate": false
               }
           ];

        $scope.addConditionData = function (data) {
            data.push({
                "questionsNo": true,
                "conditionValuestate": true,
                "showRange": false,
                "isVisibleSwitch": true,
                "fromRange": 0
            });
            conditionScrollTo.perform();
        };
        $scope.deleteConditionData = function (data, Ind) {
            data.splice(Ind, 1);
            var prevId = Ind - 1;
            setTimeout(function () {
                var item = angular.element("#conditionData" + prevId).find('a').last();
                $focusOnField(item);
            });

        };
        // END: questionnaire type popup
        $scope.questionTypeOptions = [
            { "name": "Single Line Text", "type": "single-text" },
            { "name": "Multiple Lines Text", "type": "multi-text" },
            { "name": "Multiple Lines Text (Formatted)", "type": "multi-text-format" },
            { "name": "Single Response (Radio Buttons)", "type": "single-response-radio" },
            { "name": "Single Response (Drop Down)", "type": "single-response-drop" },
            { "name": "Multiple Responses (Check Boxes)", "type": "multi-response" },
            { "name": "Multiple Responses (List Box)", "type": "list-box" },
            { "name": "Matrix Of Text Field", "type": "grid-type-text" },
            { "name": "Matrix Of Radio Buttons", "type": "grid-type-radio" },
            { "name": "Matrix Of Drop Down", "type": "grid-type-drop" },
            { "name": "Matrix Of Check Boxes", "type": "grid-type-check" },
            { "name": "Combination Matrix", "type": "grid-type-combination" },
            { "name": "Table Type", "type": "grid-type-wrow-combination" },
            { "name": "Attachment Only", "type": "attachment-only" },
            { "name": "Numeric", "type": "numeric" },
            { "name": "Multi-numeric", "type": "multi-numeric" },
            { "name": "Date/Time", "type": "date-time" }
        ];
        $scope.questionnaireGoto = { option: [], questSelectedOption: '' };
        $scope.questionnaireData = [
            {
                "question": [
                    //{
                    //	"title": "",
                    //	"isfocus": false,
                    //	"rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] },
                    //	"weight": 0,
                    //	"lock": false,
                    //	"questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" },

                    //	"questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }],
                    //	"conditional": {
                    //		"check": false,
                    //		"conditionalData": [],
                    //		"questionattachedTo": -2,
                    //	},
                    //	"conditionalQuestion": {
                    //		'selectedquestionResponse': null,
                    //		'selectedquestionType': null,
                    //	},
                    //	"attachment": { "fileUploadVal": "", "link": "" },
                    //	"mandatory": false,
                    //	"nonScoring": false,
                    //	"addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" },
                    //	"isvalidate": false
                    //}
                ]
            }
        ];
        if ($scope.questionnaireData.length === 1) {
            //$scope.questionnaireData[0]['question'][0]['preview'] = true;
        }

        //testQuest($scope);
        // For Preview Mode
        $scope.isValidate = true;
        $scope.makeReadonly = function (text) {
            var previewQuestionnaireData = angular.copy($scope.questionnaireData);
            angular.forEach($scope.questionnaireData, function (val, key) {
                previewQuestionnaireData[key]['question'] = [];
                if (val.question) {
                    angular.forEach(val.question, function (valQuest, keyQuest) {
                        valQuest.preview = false;

                        if (!valQuest.conditional.check) {
                            previewQuestionnaireData[key]['question'].push(valQuest);
                        }
                    })
                }
            });
            $scope.previewQuestionnaireData = angular.copy(previewQuestionnaireData);
            previewQuestionnaireData = [];
            text = '';
            if ($state.params.view === 'supplier') {
                $scope.pageTitle = text;
            } else {

                $scope.pageTitle = text ? 'PREVIEW - ' + text : 'PREVIEW';
            }
            $scope.pagePreview = true;
            $scope.isValidate = false;
            //$scope.templateLoad('multi-text-format');
            //setTimeout(function () {
            //	angular.element('.fieldEditable input, .fieldEditable textarea').attr('disabled', 'true');
            //}, 200);
        }

        // For Edit Mode
        $scope.getEditMode = function () {
            $scope.pagePreview = false;
            $scope.previewQuestionnaireData = [];
            $scope.pageTitle = 'QUESTIONNAIRE';
            if ($state.params.pageFor == 'sourcing') {
                $scope.pageTitle = 'EDIT - IT Systems RFP - Site Service Requirements';
            }
            if ($state.params.pageFor == 'form') {
                $scope.pageTitle = 'EDIT - General Information';
            }
            $scope.isValidate = true;
            //$timeout(function () {
            //	angular.element('.fieldEditable input, .fieldEditable textarea').removeAttr('disabled');
            //});
        }

        $scope.questionCopy = function (data, datacopy, Index) {
            var foundQuestion = $filter('filter')(data, { preview: true }, true)[0];
            if (angular.isDefined(foundQuestion))
                data[data.indexOf(foundQuestion)].preview = false;

            var datacopyItm = angular.copy(datacopy);
            datacopyItm.preview = true;
            $scope.parentPreview = true;
            data.splice((Index + 1), 0, datacopyItm);
            setTimeout(function () {
                questionScrollTo.perform(document.getElementById('subsection-1-' + (Index + 1)), 400);
            }, 200);
            conditionalNumber($scope);
        }



        $scope.addQuestion = function ($event, type) {
            var sectionPos = 0,
                questionPos = 0,
                sectionIndexTotalList = [];
            //conditionalQuestionTypeOptions = [];
            $event.stopPropagation();
            $scope.isvalidate = 0;

            //RuleEngine.setRules($scope.questionnaireData, $scope.dataModel);
            //RuleEngine.execute(function (e) {
            //	console.log(e);
            //});
            questionValidate();

            if ($scope.isvalidate) return false;
            if ($scope.questionnaireData[0].question.length == 0) {
                $scope.questionnaireData[sectionPos].question.push({
                    "title": "", "isfocus": true, "isvalidate": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 0, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2, }, "conditionalQuestion": { 'selectedquestionResponse': null, 'selectedquestionType': null, }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": true
                });

                conditionalNumber($scope);
                return false;
            }

            if ($scope.questionnaireData[0].question.length > 0) {
                sectionOffset(1, sectionIndexTotalList);

                var stickyAddPanelOffset = 100;

                //var stickyAddPanelOffset = document.getElementById('stickyAddPanel').offsetTop;
                angular.forEach(sectionIndexTotalList, function (val, key) {
                    if (stickyAddPanelOffset >= val.section) {
                        sectionPos = key;
                        //console.log(sectionIndexTotalList, "sectionIndexTotalList")
                        angular.forEach(val.question, function (valquest, keyquest) {

                            //console.log(stickyAddPanelOffset,valquest, keyquest);
                            if (stickyAddPanelOffset >= (valquest - 20)) {
                                questionPos = keyquest;
                            }
                        });
                        return false;
                    }
                })
            }
            //console.log(questionPos, " questionPos ", sectionPos, sectionIndexTotalList)
            //$scope.conditionalQuestionTypeOptions = conditionalQuestionTypeOptions;
            //conditionalQuestionTypeOptions = [];

            if (stickyAddPanelOffset < sectionIndexTotalList[sectionPos].question[0]) {
                if (type) {
                    $scope.questionnaireData[sectionPos].question.splice((questionPos), 0, {
                        "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "", "description": "", "isfocus": true, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2, }
                    });
                } else {
                    $scope.questionnaireData[sectionPos].question.splice((questionPos), 0, { "title": "", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 0, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2, }, "conditionalQuestion": { 'selectedquestionResponse': null, 'selectedquestionType': null, }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": true });
                }
            } else {
                if ($scope.questionnaireData[sectionPos].question.length >= 1) {
                    if (type) {
                        $scope.questionnaireData[sectionPos].question.push({ "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "", "description": "", "isfocus": true, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2, } });
                    } else {
                        $scope.questionnaireData[sectionPos].question.push({
                            "title": "", "isfocus": true, "isvalidate": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 0, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2, }, "conditionalQuestion": { 'selectedquestionResponse': null, 'selectedquestionType': null, }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": true
                        });
                    }
                }
                //else {
                //    if (type) {
                //        $scope.questionnaireData[sectionPos].question.splice((questionPos + 1), 0, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "", "description": "", "isfocus": true, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2, } });
                //    } else {
                //        $scope.questionnaireData[sectionPos].question.splice((questionPos + 1), 0, { "title": "", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 0, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2, }, "conditionalQuestion": { 'selectedquestionResponse': null, 'selectedquestionType': null, }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": true });
                //    }
                //}
            }

            $scope.parentPreview = true;
            setTimeout(function () {
                if (stickyAddPanelOffset < sectionIndexTotalList[sectionPos].question[0]) {
                    questionScrollTo.perform(document.getElementById('subsection-' + (sectionPos + 1) + '-1'), -$scope.scrollDiffpos);
                } else {
                    if ($scope.questionnaireData[sectionPos].question.length === 1) {
                        questionScrollTo.perform(document.getElementById('subsection-' + (sectionPos + 1) + '-1'), -$scope.scrollDiffpos);
                    } else {
                        questionScrollTo.perform(document.getElementById('subsection-' + (sectionPos + 1) + '-' + ($scope.questionnaireData[sectionPos].question.length)), -$scope.scrollDiffpos);
                    }
                }
            }, 350);

            $scope.questionnaireDataTlength = 0;

            //if ($scope.isAutoWeight) {
            //    $scope.onChangeWeight(true);
            //}
            conditionalNumber($scope);
        };
        $scope.questionDelete = function (parentIndex, Index) {

            //Need to check console panel
            if ($scope.questionnaireData.length === 1 && $scope.questionnaireData[0]['question'].length === 1) return false;
            $scope.questionnaireData[parentIndex].question.splice(Index, 1);
            $scope.questionnaireDataTlength = $scope.questionnaireData[$scope.questionnaireData.length - 1].question.length >= 1 ? 0 : 1;

            setTimeout(function () {
                document.getElementById('stickyAddPanel').style.top = (document.getElementById('subsection-' + (parentIndex + 1) + '-' + (Index + 1)).offsetTop) + 'px';
            }, 100);
            if ($scope.isAutoWeight) {
                $scope.onChangeWeight(true);
            }
            conditionalNumber($scope);
        };
        $scope.onChangeWeight = function (isAutoWeight) {
            $scope.isAutoWeight = isAutoWeight;
            var lockFlag = 0,
                lockFlagVal = 0,
                unLockFlagVal = 0,
                TotalAmount = 0,
                unLockFlag = 0;
            if (isAutoWeight) {
                angular.forEach($scope.questionnaireData, function (val, key) {
                    if (val.question) {
                        angular.forEach(val.question, function (valQuest, keyQuest) {
                            if (valQuest.lock) {
                                lockFlag++;
                                //if (valQuest.nonScoring) {
                                //	valQuest.weight = 0;
                                //}
                                lockFlagVal += parseFloat(valQuest.weight);
                            } else {
                                unLockFlag++;
                            }
                        })
                    }
                });

                unLockFlagVal = ((100 - lockFlagVal) / unLockFlag);
                unLockFlagVal = +unLockFlagVal.toFixed(2);
                TotalAmount += lockFlagVal;

                angular.forEach($scope.questionnaireData, function (val, key) {
                    if (val.question) {
                        angular.forEach(val.question, function (valQuest, keyQuest) {
                            if (!valQuest.lock) {
                                unLockFlag--;
                                valQuest.weight = unLockFlag ? unLockFlagVal : +(100 - TotalAmount).toFixed(2);
                                TotalAmount += valQuest.weight;
                            }
                        })
                    }
                });
                $scope.TotalAmount = TotalAmount;
                TotalAmount = 0;
                unLockFlagVal = 0;
            }
        };
        $scope.onChangeSingleWeight = function (val) {
            var TotalAmount = 0;
            if (!val.weight && val.weight !== 0) {
                val.weight = 0;
            }
            angular.forEach($scope.questionnaireData, function (val, key) {
                if (val.question) {
                    angular.forEach(val.question, function (valQuest, keyQuest) {
                        TotalAmount += parseFloat(valQuest.weight);
                    })
                }
            });
            $scope.TotalAmount = +TotalAmount.toFixed(2);
            TotalAmount = 0;
        }
        $scope.sectionGoTo = function (parentIndex, Index) {
            var parentIndex = parentIndex ? parentIndex : 1;
            //Index = Index.split('Q')[1];
            if (Index) {
                questionScrollTo.perform(document.getElementById('subsection-' + parentIndex + '-' + Index), -$scope.scrollDiffpos);
            }
        }
        $scope.addQuestionSection = function () {
            var sectionPos = 0,
                sectionIndexTotalList = [];
            $scope.isvalidate = 0;

            questionValidate();
            if ($scope.isvalidate) return false;

            if ($scope.questionnaireData.length > 0) {
                sectionOffset(1, sectionIndexTotalList);
                var stickyAddPanelOffset = document.getElementById('stickyAddPanel').offsetTop;
                angular.forEach(sectionIndexTotalList, function (val, key) {
                    if (stickyAddPanelOffset >= (val.section - 25)) {
                        sectionPos = key;
                        return false;
                    }
                })
            }

            if ($scope.questionnaireData.length === 1) {
                $scope.questionnaireData.push({ "title": "", "isfocus": true, "description": "", "rank": $scope.questionnaireData.length, "question": [] });
            } else {
                $scope.questionnaireData.splice((sectionPos + 1), 0, { "title": "", "isfocus": true, "name": "Section " + (sectionPos + 2), "description": "", "rank": sectionPos + 1, "question": [] });
            }
            setTimeout(function () {
                questionScrollTo.perform(document.getElementById('section-' + (sectionPos + 2)), (30 - $scope.scrollDiffpos));
            }, 350);
            $scope.questionnaireDataTlength = 1;
        }
        $scope.WeightText = 'Auto Weight'
        $scope.vSupplierText = 'Visible to Supplier'
        $scope.sectionDelete = function (dataIndex) {
            if ($scope.questionnaireData[dataIndex].question.length > 0) {
                notification.notify({
                    type: 'confirm',
                    message: '<p class="left-align">Do you want to delete this section and its questions?</p>',
                    buttons: [{
                        "title": "yes",
                        "result": 1
                    },
                    {
                        "title": "No",
                        "result": 0
                    }]
                }, function (result) {
                    if (result.result) {

                        $scope.questionnaireData.splice(dataIndex, 1);
                        if ($scope.isAutoWeight) {
                            $scope.onChangeWeight(true);
                        }
                    } else {

                    }
                });
            } else {
                $scope.questionnaireData.splice(dataIndex, 1);
                $scope.questionnaireDataTlength = $scope.questionnaireData[$scope.questionnaireData.length - 1].question.length >= 1 ? 0 : 1;
            }

        }
        $scope.questionLock = function (questionItem, str, $event) {
            $event.stopPropagation();
            questionItem.lock = !questionItem.lock;
            questionItem.weightFieldReadonly = !questionItem.weightFieldReadonly;

            //angular.element('#' + str + ' input').attr('disabled', questionItem.lock);
        };

        // Condition Questions and its Responses
        $scope.onConditionalQuestionTypeOption = [{ 'title': 'Select Response of above Question' }];
        $scope.onConditionalQuestionTypeChg = function (questionItem) {

            $scope.onConditionalQuestionTypeOption = [];
            questionItem.conditionalQuestion.selectedquestionResponse = '';
            if ($scope.questionnaireData[questionItem.conditionalQuestion.selectedquestionType.sectionIndex].question[questionItem.conditionalQuestion.selectedquestionType.questionIndex].questionType.type === 'single-response-radio') {
                angular.forEach($scope.questionnaireData[questionItem.conditionalQuestion.selectedquestionType.sectionIndex].question[questionItem.conditionalQuestion.selectedquestionType.questionIndex].questionResponse.config, function (val, key) {
                    $scope.onConditionalQuestionTypeOption.push(val.options[0]);
                });
            } else if ($scope.questionnaireData[questionItem.conditionalQuestion.selectedquestionType.sectionIndex].question[questionItem.conditionalQuestion.selectedquestionType.questionIndex].questionType.type === 'single-response-drop') {
                angular.forEach($scope.questionnaireData[questionItem.conditionalQuestion.selectedquestionType.sectionIndex].question[questionItem.conditionalQuestion.selectedquestionType.questionIndex].questionResponse.config, function (val, key) {
                    $scope.onConditionalQuestionTypeOption.push(val);
                });
            } else {
                $scope.onConditionalQuestionTypeOption = $scope.questionnaireData[questionItem.conditionalQuestion.selectedquestionType.sectionIndex].question[questionItem.conditionalQuestion.selectedquestionType.questionIndex].questionResponse;
            }
            if (questionItem['conditional']['questionattachedTo'] < 0) {
                $scope.questionnaireData[questionItem.conditionalQuestion.selectedquestionType.sectionIndex].question[questionItem.conditionalQuestion.selectedquestionType.questionIndex]['conditional']['conditionalData'].push(questionItem);
            }
            questionItem['conditional']['questionattachedTo'] = $scope.questionnaireData[questionItem.conditionalQuestion.selectedquestionType.sectionIndex].question[questionItem.conditionalQuestion.selectedquestionType.questionIndex]['conditional']['conditionalData'].length - 1;

        }
        $scope.removeCondition = function (data) {
            if (!data.conditional.check) {
                if (data.conditional.questionattachedTo >= 0) {
                    $scope.questionnaireData[data.conditionalQuestion.selectedquestionType.sectionIndex].question[data.conditionalQuestion.selectedquestionType.questionIndex]['conditional']['conditionalData'].splice(data.conditional.questionattachedTo, 1);
                    $scope.conditionalQuestionTypeOptions = [];
                    data.conditionalQuestion.selectedquestionType = null;
                    data.conditionalQuestion.selectedquestionResponse = null;

                }
            } else {
                $scope.conditionalQuestionTypeOptions = [];
                var conditionalQuestionTypeOptions = [];
                angular.forEach($scope.questionnaireData, function (val, key) {
                    if (val.question) {
                        angular.forEach(val.question, function (valQuest, keyQuest) {
                            if (data.title !== valQuest.title) {
                                if (valQuest.questionType.type === "multi-response" || valQuest.questionType.type === "single-response-radio" || valQuest.questionType.type === "single-response-drop") {
                                    conditionalQuestionTypeOptions.push({ "title": valQuest['title'], "sectionIndex": key, "questionIndex": keyQuest })
                                }
                            }
                        })
                    }
                });
                $scope.conditionalQuestionTypeOptions = conditionalQuestionTypeOptions;
                conditionalQuestionTypeOptions = [];
            }
        };
        $scope.addquestionResponse = function ($event, questionData, gridType) {
            $event.stopPropagation();
            switch (questionData.questionType.type) {
                case "multi-response":
                    questionData.questionResponse.push({ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": true });
                    break;
                case "single-response-radio":
                    questionData.questionResponse.config.push({ "options": [{ "title": "", "score": "", "isvalidate": false, "isfocus": true }] });
                    break;
                case "single-response-drop":
                    questionData.questionResponse.config.push({ "title": "", "score": "", "isvalidate": false, "isfocus": true });
                    break;
                case "grid-type-drop":
                    (gridType === 'row') ? questionData.questionResponse.rows.push({ "title": "", "isvalidate": false, "isfocus": true }) : questionData.questionResponse.cols.push({ "title": "", "isvalidate": false, "isfocus": true, "type": { "SelectedType": { "name": "Dropdown" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } });
                    break;
                case "grid-type-radio":
                    (gridType === 'row') ? questionData.questionResponse.rows.push({ "title": "", "isvalidate": false, "isfocus": true }) : questionData.questionResponse.cols.push({ "title": "", "isvalidate": false, "isfocus": true, "type": { "SelectedType": { "name": "Radio" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } });
                    break;
                case "grid-type-check":
                    (gridType === 'row') ? questionData.questionResponse.rows.push({ "title": "", "isvalidate": false, "isfocus": true }) : questionData.questionResponse.cols.push({ "title": "", "isvalidate": false, "isfocus": true, "type": { "SelectedType": { "name": "Checkbox" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } });
                    break;
                case "grid-type-text":
                case "grid-type-combination":
                case "grid-type-wrow-combination":
                    (gridType === 'row') ? questionData.questionResponse.rows.push({ "title": "", "isvalidate": false, "isfocus": true }) : questionData.questionResponse.cols.push({ "title": "", "isvalidate": false, "isfocus": true, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } });
                    break;
                case "multi-numeric":
                    questionData.questionResponse.value.push({ "question": "", "value": "", "isvalidate": false, "isfocus": true });
                    break;
                case "list-box":
                    questionData.questionResponse.config.push({ "title": "", "score": "", "isvalidate": false, "isfocus": true, "isChecked": false });
                    break;
                default:
            }

        }
        $scope.deletequestionResponse = function ($event, questionData, Index, gridType) {
            $event.stopPropagation();
            switch (questionData.questionType.type) {
                case "multi-response":
                    questionData.questionResponse.splice(Index, 1);
                    break;
                case "single-response-radio":
                case "single-response-drop":
                case "list-box":
                    questionData.questionResponse.config.splice(Index, 1);
                    break;
                case "grid-type-text":
                case "grid-type-drop":
                case "grid-type-radio":
                case "grid-type-check":
                case "grid-type-combination":
                case "grid-type-wrow-combination":
                    (gridType === 'row') ? questionData.questionResponse.rows.splice(Index, 1) : questionData.questionResponse.cols.splice(Index, 1);
                    break;
                case "multi-numeric":
                    questionData.questionResponse.value.splice(Index, 1);
                    break;
                default:
            }
        }

        //$scope.makegridFocuse = function (arg1, arg2, arg3, arg4) {
        //	var textId = "gridTextField_" + arg1 + arg2 + arg3 + arg4;
        //	setTimeout(function () {
        //		$('#' + textId + ' input').focus();
        //	},100)		
        //};

        // Question Template Load
        //$scope.templateLoad = function (arg) {
        //	setTimeout(function () {
        //		if (arg === 'multi-text-format') {
        //			//CKEDITOR.replace('editor1');
        //		}
        //	}, 100)
        //}
        $scope.onQuestionType = function (questionType, questionData) {
            questionData.questionType.template = questionType.type;
            if (questionData.addAttachment.disable) {
                questionData.addAttachment.disable = false;
                questionData.addAttachment.check = false;
            }
            // Json for grid type 
            //{  
            //	"title":"",
            //	"type":{  
            //		"SelectedType":{  
            //			"name":"Dropdown"
            //		},
            //	   "config":[  
            //		  {  
            //		  	"name":"",
            //		  	"score":""
            //		  }
            //	   ],
            //	   "Textfield":"Please Enter",
            //	   "radioOption":{  
            //	   	"selectedradioOption":{  

            //	   	},
            //		  "config":[  
            //			 {  
            //			 	"name":""
            //			 }
            //		  ]
            //	   }
            //	}
            //}
            switch (questionType.type) {
                case "multi-response":
                    questionData.questionResponse = [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": true }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }];
                    break;
                case "single-response-radio":
                    questionData.questionResponse = { "selected": {}, "config": [{ "options": [{ "title": "", "score": "", "isvalidate": false, "isfocus": true }] }, { "options": [{ "title": "", "score": "", "isvalidate": false, "isfocus": false }] }] };
                    break;
                case "single-response-drop":
                    questionData.questionResponse = { "config": [{ "title": "", "infochip": "2 Subquestions", "score": "", "isvalidate": false, "isfocus": true }, { "title": "", "score": "", "isvalidate": false, "isfocus": false }] };
                    break;
                case "grid-type-drop":
                    questionData.questionType.template = "grid-type-combination";
                    questionData.questionResponse = { "rows": [{ "title": "", "isvalidate": false, "isfocus": true }, { "title": "", "isvalidate": false, "isfocus": false }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Dropdown" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "", "type": { "SelectedType": { "name": "Dropdown" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] } }] };
                    break;
                case "grid-type-radio":
                    questionData.questionType.template = "grid-type-combination";
                    questionData.questionResponse = { "rows": [{ "title": "", "isvalidate": false, "isfocus": true }, { "title": "", "isvalidate": false, "isfocus": false }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Radio" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "", "type": { "SelectedType": { "name": "Radio" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] } }] };
                    break;
                case "grid-type-check":
                    questionData.questionType.template = "grid-type-combination";
                    questionData.questionResponse = { "rows": [{ "title": "", "isvalidate": false, "isfocus": true }, { "title": "", "isvalidate": false, "isfocus": false }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Checkbox" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "", "type": { "SelectedType": { "name": "Checkbox" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] } }] };
                    break;
                case "grid-type-text":
                case "grid-type-combination":
                    questionData.questionType.template = "grid-type-combination";
                    questionData.questionResponse = { "rows": [{ "title": "", "isvalidate": false, "isfocus": true }, { "title": "", "isvalidate": false, "isfocus": false }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] } }] };
                    break;
                case "grid-type-wrow-combination":
                    questionData.questionType.template = "grid-type-combination";
                    questionData.questionResponse = { "rows": [{ "title": "", "isvalidate": false, "isfocus": true }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] } }] };
                    break;
                case "attachment-only":
                    questionData.addAttachment.disable = true;
                    questionData.addAttachment.check = true;
                    break;
                case "numeric":
                    questionData.questionResponse = { "formula": "", "value": "", "score": "" };
                    break;
                case "multi-numeric":
                    questionData.questionResponse = { "formula": "", "value": [{ "question": "", "value": "", "isvalidate": false, "isfocus": true }, { "question": "", "value": "", "isvalidate": false, "isfocus": false }], "score": "" };
                    break;
                case "date-time":
                case "multi-text":
                case "multi-text-format":
                case "single-text":
                    questionData.questionResponse = {};
                    break;
                case "list-box":
                    questionData.questionResponse = { "selected": [], "config": [{ "title": "", "score": "", "isvalidate": false, "isfocus": true, "isChecked": false }, { "title": "", "score": "", "isvalidate": false, "isfocus": false, "isChecked": false }] };
                    break;
                default:
            }
        }

        if ($state.params.mode === 'preview' || $state.params.mode === 'edit') {
            if ($state.params.pageFor == 'scorecard') {

                $scope.pagePreview = true;
                $scope.questionnaireData = [{ "question": [{ "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Customer Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "How many customers do you currently supply to?", "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 4, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "219", "score": "", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": { "fileUploadVal": "", "link": "", "list": [{ "name": "attachment1.xls" }, { "name": "attachment2.xls" }, { "name": "attachment3.xls" }, { "name": "attachment4.xls" }] }, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "isvalidate": false, "preview": false, "name": "Q1", "questionSerialNo": 1 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Company Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please describe any past and planned changes to your business operations including expansions and facility closings.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3, "lock": false, "questionType": { "name": "Multiple Lines Text (Formatted)", "type": "multi-text-format", "template": "multi-text-format" }, "questionResponse": { "FormatText": "<p>March 2016 - Maersk corporations established 17th plant in Asia region.</p>" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q2", "questionSerialNo": 2 }, { "title": "Information required about any and all lawsuits, liens, restraining orders, consent decrees, foreclosures, or other legal/financial actions either now pending, in progress, or which have been brought against the company or any of its officers/principals in the past three years.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 5, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": { "isvalidate": false, "multiText": "None" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q3", "questionSerialNo": 3 }, { "title": "What are your capabilities for electronic payment and ordering?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": { "multiText": "We support ACH, Card Payments and Electronic Funds Transfer", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q4", "questionSerialNo": 4 }, { "title": "Do you have any volume limitations? Please specify if any.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 4, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": { "multiText": "We have transportation limit of 250,000 tonnes", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q5", "questionSerialNo": 5 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Financial Basics", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "What is your D & B Registration #:", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": { "singleText": "DB87R122", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q6", "questionSerialNo": 6 }, { "title": "Please attach a D&B Report on your Company?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Attachment Only", "type": "attachment-only", "template": "attachment-only" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": true, "check": true, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q7", "questionSerialNo": 7 }, { "title": "What is your approach to managing price volatility?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": { "multiText": "We sign agreement with client", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q8", "questionSerialNo": 8 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Delivery", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Can you provide delivery to the following location: Hamilton, MS - 39746 and Green River, WY - 82935?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": { "title": "Yes", "score": "", "isvalidate": false, "isfocus": false, "disable": true }, "config": [{ "options": [{ "title": "Yes", "score": "", "isvalidate": false, "isfocus": false }] }, { "options": [{ "title": "No", "score": "", "isvalidate": false, "isfocus": false }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] }, "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q9", "questionSerialNo": 9 }, { "title": "Which is the nearest Distribution Center to above locations?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "Hamilton", "score": "", "isvalidate": false, "isfocus": false }, { "check": true, "title": "New York", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q10", "questionSerialNo": 10 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Company Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Company Name", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": { "singleText": "GEP Solutions", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q11", "questionSerialNo": 11 }, { "title": "Web Address", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": { "singleText": "gepsolutions@gep.com", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q12", "questionSerialNo": 12 }, { "title": "Company Public or Privately held?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": { "title": "Public", "score": "", "isvalidate": false, "isfocus": false, "disable": true }, "config": [{ "options": [{ "title": "Public", "score": "", "isvalidate": false, "isfocus": false, "disable": true }] }, { "options": [{ "title": "Private", "score": "", "isvalidate": false, "isfocus": false, "disable": true }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] }, "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q13", "questionSerialNo": 13 }, { "title": "Year Established?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "1999", "score": "", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q14", "questionSerialNo": 14 }, { "title": "Number of Employees?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "1500", "score": "", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q15", "questionSerialNo": 15 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Financial Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please provide with your financial Information?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Combination Matrix", "type": "grid-type-combination", "template": "grid-type-combination" }, "questionResponse": { "rows": [{ "title": "Revenue ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "1000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "50000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "400000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Net Income ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "2300000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "300000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "1000000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Total Cash ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "1000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "6000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "400000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Total Debt ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "1000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "10000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "75000000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q16", "questionSerialNo": 16 }, { "title": "Has your company ever filed for bankruptcy? If yes, explain", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": { "multiText": "No", "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q17", "questionSerialNo": 17 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Account Management and Service", "description": "An individual be assigned as a National Account Manager to perform the following specific duties at a minimum:\n 1) Closely work with the Category Manager in respect to IT Systems Supplies\n 2) Proactive communication of product availability, back orders, and any other delivery or customer service related issues\n 3) Reporting of late shipments\n 4) Travel to meet with Category Manager as needed\n 5) Proactively monitor inventory and suggest improved efficiencies\n 6) Assist Category Manager in forecasting\n 7) Prepare and present monthly reviews for managers", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Quality", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please list your company's quality certifications (ISO-9000, ISO-14000, etc.)", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Combination Matrix", "type": "grid-type-combination", "template": "grid-type-combination" }, "questionResponse": { "rows": [{ "title": "Certifications and Awards", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "ISO-9000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "ISO-14000", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "ISO-500", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Organization", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "Norton", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "Horizon", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "Sementec", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Date", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "06-30-2017", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "04-23-1999", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "01-22-2002", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q18", "questionSerialNo": 18 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Payment Terms", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Payment terms are Net 45 days. Do you comply?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": { "title": "Yes", "score": "", "isvalidate": false, "isfocus": false, "disable": true }, "config": [{ "options": [{ "title": "Yes", "score": "", "isvalidate": false, "isfocus": false, "disable": true }] }, { "options": [{ "title": "No", "score": "", "isvalidate": false, "isfocus": false, "disable": true }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] }, "isvalidate": false }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q19", "questionSerialNo": 19 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Additional details", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Date and time when your company was incorporated", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.43, "lock": false, "questionType": { "name": "Date/Time", "type": "date-time", "template": "date-time" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q20", "checkdate": true, "date": 1497896999000, "questionSerialNo": 20 }] }]
            }

            else {
                $scope.questionnaireData = [
              { "question": [{ "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Customer Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "How many customers do you currently supply to?", "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "", "score": "" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": { "fileUploadVal": "", "link": "", "list": [{ "name": "attachment1.xls" }, { "name": "attachment2.xls" }, { "name": "attachment3.xls" }, { "name": "attachment4.xls" }] }, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "isvalidate": false, "preview": false, "name": "Q1", "questionSerialNo": 1 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Company Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please describe any past and planned changes to your business operations including expansions and facility closings.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text (Formatted)", "type": "multi-text-format", "template": "multi-text-format" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q2", "questionSerialNo": 2 }, { "title": "Information required about any and all lawsuits, liens, restraining orders, consent decrees, foreclosures, or other legal/financial actions either now pending, in progress, or which have been brought against the company or any of its officers/principals in the past three years.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q3", "questionSerialNo": 3 }, { "title": "What are your capabilities for electronic payment and ordering?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q4", "questionSerialNo": 4 }, { "title": "Do you have any volume limitations? Please specify if any.", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q5", "questionSerialNo": 5 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Financial Basics", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "What is your D & B Registration #:", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q6", "questionSerialNo": 6 }, { "title": "Please attach a D&B Report on your Company?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Attachment Only", "type": "attachment-only", "template": "attachment-only" }, "questionResponse": [{ "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": true, "check": true, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q7", "questionSerialNo": 7 }, { "title": "What is your approach to managing price volatility?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q8", "questionSerialNo": 8 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Delivery", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Can you provide delivery to the following location: Hamilton, MS - 39746 and Green River, WY - 82935?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": {}, "config": [{ "options": [{ "title": "Yes", "score": "", "isvalidate": false, "isfocus": false }] }, { "options": [{ "title": "No", "score": "", "isvalidate": false, "isfocus": false }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] } }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q9", "questionSerialNo": 9 }, { "title": "Which is the nearest Distribution Center to above locations?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Responses (Check Boxes)", "type": "multi-response", "template": "multi-response" }, "questionResponse": [{ "check": false, "title": "Hamilton", "score": "", "isvalidate": false, "isfocus": false }, { "check": false, "title": "New York", "score": "", "isvalidate": false, "isfocus": false }], "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q10", "questionSerialNo": 10 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Company Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Company Name", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q11", "questionSerialNo": 11 }, { "title": "Web Address", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Line Text", "type": "single-text", "template": "single-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q12", "questionSerialNo": 12 }, { "title": "Company Public or Privately held?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": {}, "config": [{ "options": [{ "title": "Public", "score": "", "isvalidate": false, "isfocus": false }] }, { "options": [{ "title": "Private", "score": "", "isvalidate": false, "isfocus": false }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] } }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q13", "questionSerialNo": 13 }, { "title": "Year Established?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "", "score": "" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q14", "questionSerialNo": 14 }, { "title": "Number of Employees?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Numeric", "type": "numeric", "template": "numeric" }, "questionResponse": { "formula": "", "value": "", "score": "" }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q15", "questionSerialNo": 15 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Financial Information", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please provide with your financial Information?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Combination Matrix", "type": "grid-type-combination", "template": "grid-type-combination" }, "questionResponse": { "rows": [{ "title": "Revenue ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Net Income ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Total Cash ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Total Debt ($ million)", "isvalidate": false, "isfocus": false, "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "2012", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2013", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "2014", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q16", "questionSerialNo": 16 }, { "title": "Has your company ever filed for bankruptcy? If yes, explain", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Multiple Lines Text", "type": "multi-text", "template": "multi-text" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q17", "questionSerialNo": 17 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Account Management and Service", "description": "An individual be assigned as a National Account Manager to perform the following specific duties at a minimum:\n 1) Closely work with the Category Manager in respect to IT Systems Supplies\n 2) Proactive communication of product availability, back orders, and any other delivery or customer service related issues\n 3) Reporting of late shipments\n 4) Travel to meet with Category Manager as needed\n 5) Proactively monitor inventory and suggest improved efficiencies\n 6) Assist Category Manager in forecasting\n 7) Prepare and present monthly reviews for managers", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Quality", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Please list your company's quality certifications (ISO-9000, ISO-14000, etc.)", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Combination Matrix", "type": "grid-type-combination", "template": "grid-type-combination" }, "questionResponse": { "rows": [{ "title": "Certifications and Awards", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Organization", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, { "title": "Date", "isvalidate": false, "isfocus": false, "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }], "optionsType": [{ "name": "Text field" }, { "name": "Radio" }, { "name": "Checkbox" }, { "name": "Dropdown" }], "cols": [{ "title": "1", "isvalidate": false, "isfocus": false, "type": { "dropdownApplied": false, "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "isvalidate": false, "isfocus": true, "name": "", "score": "" }] } }, { "title": "2", "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "score": "" }] }, "isvalidate": false, "isfocus": false }, { "title": "3", "isvalidate": false, "isfocus": false, "type": { "SelectedType": { "name": "Text field" }, "Textfield": "", "radioOption": { "selectedradioOption": {}, "config": [{ "name": "" }] }, "config": [{ "name": "", "isvalidate": false, "isfocus": true, "score": "" }] } }] }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q18", "questionSerialNo": 18 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Payment Terms", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Payment terms are Net 45 days. Do you comply?", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.33, "lock": false, "questionType": { "name": "Single Response (Radio Buttons)", "type": "single-response-radio", "template": "single-response-radio" }, "questionResponse": { "selected": {}, "config": [{ "options": [{ "title": "Yes", "score": "", "isvalidate": false, "isfocus": false }] }, { "options": [{ "title": "No", "score": "", "isvalidate": false, "isfocus": false }] }], "radioModel": { "config": [{ "title": 0, "disable": true }] } }, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q19", "questionSerialNo": 19 }, { "questionType": { "name": "label-type", "type": "label-type", "template": "label-type" }, "title": "Additional details", "description": "", "isfocus": false, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "name": "Label", "preview": false, "weight": 3.33, "questionSerialNo": "Label" }, { "title": "Date and time when your company was incorporated", "isvalidate": false, "isfocus": false, "rating": { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }] }, "weight": 3.43, "lock": false, "questionType": { "name": "Date/Time", "type": "date-time", "template": "date-time" }, "questionResponse": {}, "conditional": { "check": false, "conditionalData": [], "questionattachedTo": -2 }, "conditionalQuestion": { "selectedquestionResponse": null, "selectedquestionType": null }, "attachment": {}, "mandatory": false, "nonScoring": false, "addAttachment": { "disable": false, "check": false, "fileUploadVal": "", "link": "" }, "preview": false, "name": "Q20", "checkdate": true, "date": "", "questionSerialNo": 20 }] }
                ];
            }



            $scope.questionnaireDesc = "1) The supplier is expected to have inventory available in a 2-hour window for emergencies \n" +
                                        "2) The supplier is required to perform multiple deliveries instead of one consolidated delivery \n" +
                                        "3) The supplier is required to provide VMI services";


            //$scope.questionnaireGoto = { "option": [{ "name": "1", "questionSectionIndex": 2 }, { "name": "2", "questionSectionIndex": 4 }, { "name": "3", "questionSectionIndex": 5 }, { "name": "4", "questionSectionIndex": 6 }, { "name": "5", "questionSectionIndex": 7 }, { "name": "6", "questionSectionIndex": 9 }, { "name": "7", "questionSectionIndex": 10 }, { "name": "8", "questionSectionIndex": 11 }, { "name": "9", "questionSectionIndex": 13 }, { "name": "10", "questionSectionIndex": 14 }, { "name": "11", "questionSectionIndex": 16 }, { "name": "12", "questionSectionIndex": 17 }, { "name": "13", "questionSectionIndex": 18 }, { "name": "14", "questionSectionIndex": 19 }, { "name": "15", "questionSectionIndex": 20 }, { "name": "16", "questionSectionIndex": 22 }, { "name": "17", "questionSectionIndex": 23 }, { "name": "18", "questionSectionIndex": 26 }, { "name": "19", "questionSectionIndex": 28 }, { "name": "20", "questionSectionIndex": 30 }], "questSelectedOption": { "name": "1", "questionSectionIndex": 2 } };
            var counterWoLableNew = 0;
            for (var counterN = 0; counterN < $scope.questionnaireData[0].question.length; counterN++) {
            if (angular.isDefined($scope.questionnaireData[0].question[counterN].questionType.type) && $scope.questionnaireData[0].question[counterN].questionType.type !== 'label-type') {
                counterWoLableNew++;
                
                $scope.questionnaireGoto.option[counterN] = { name: counterWoLableNew + '', questionSectionIndex: counterN + 1 };
                //console.log(counterWoLable, "counterWoLable", scope.questionnaireData[0].question[counter].name)
            } 
            else {
                    $scope.questionnaireGoto.option[counterN] = { name: 'Label', questionSectionIndex: counterN + 1 };
                }
            }
            $scope.questionnaireGoto.questSelectedOption = { "name": "Label", "questionSectionIndex": 1 };
           
            if ($state.params.pageFor == 'sourcing') {
                $scope.questionnaireTitle = "IT Systems RFP - Site Service Requirements";
                $scope.pageTitle = 'EDIT - IT Systems RFP - Site Service Requirements';
            }
            else if ($state.params.pageFor == 'form') {
                $scope.questionnaireTitle = "General Information";
                $scope.pageTitle = 'EDIT - General Information';
            }
            else {
                $scope.questionnaireTitle = "IT Systems RFP - Site Service Requirements";
            }
            if ($state.params.mode === 'preview') {
                $scope.pagePreview = true;
                $scope.makeReadonly($scope.questionnaireTitle);
            }
            if ($state.params.view == 'supplier') {
                $scope.pageTitle = 'RESPOND - IT Systems RFP - Site Service Requirements';
            }

        }
        $scope.responseCompleteData = [{ 'label': 'Mandatory', 'respondData': 30, 'respondTotalData': 60 }, { 'label': 'Non Mandatory', 'respondData': 20, 'respondTotalData': 60 }]
        $scope.stateParamsView = $state.params.view;
        if ($state.params.view === 'supplier') {
            $scope.supplierView = true;
            //code for page filters 
            $scope.supSideQuesSubmit = function () {

                var supplierSideQuestionnaireSubmit = {
                    type: 'success',
                    message: '<p class="left-align">Questionnaire Submitted Sucsessfully</p>',
                    buttons: [{
                        "title": "Done",
                        "result": "yes"
                    },
                    {
                        "title": "No",
                        "result": "yes"
                    }]

                }

                //sucsess notification supplier view
                notification.notify(supplierSideQuestionnaireSubmit, function (response) { $state.go('sourcing.rfx.new', { view: 'supplier' }); });

            }




        }


        //for rfx supplier view filters
        $scope.resultFilter = function () {
            $scope.rfxQuestionnaireFilters = true;
        }
        $scope.questionnaireFiltersRfx = function () {
            $scope.rfxQuestionnaireFilters = false;
        }
        //for rfx supplier view filters

        /* Start: Add Attachment */
        var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.<br />Limited to file(s) of 10MB each.\<br /> Maximum 5 files can be uploaded.";
        $scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
        $scope.addAttachmentUrl = "shared/popup/views/popupUploadDoc.html";
        $scope.attachementAdded = true;
        $scope.attachementAdded1 = true;
        $scope.addAttachmentPopup = false;
        $scope.questAttachement = false;
        var mode = '';
        $scope.addAttachmentCallback = function (e) {
            $scope.addAttachmentPopup = true;
            mode = e;
            if (e == 'edit') {
                $scope.attachementAdded = false;
            }
            else {
                //$scope.attachementAdded1 = false;
            }


        };
        $scope.addAttachmentPopUpOnHideCallback = function (e) {
            $scope.addAttachmentPopup = false;
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


        //show more show less attachmentList 


        $scope.incrementLimit = function (data) {
            data.attachmentLimit = data.attachmentList.length;
        };
        $scope.decrementLimit = function (data) {
            data.attachmentLimit = 2;
        };

        $scope.supIncrementLimit = function (data) {
            data.attachmentListLimit = data.attachmentList.length;
        };
        $scope.supDecrementLimit = function (data) {
            data.attachmentListLimit = 2;
        };




        //show more show less attachmentList 


        $scope.closePopover = function () {
            angular.element(document).triggerHandler('click');
            $scope.isApplyFilters = false;

        }
        $scope.applyFilter = function () {
            angular.element(document).triggerHandler('click');
            $scope.isApplyFilters = true;
        }





        // Question Highlight
        $scope.questionBlockClick = function (parIndex, index, $event) {
            var blockClickFlag = !$scope.questionnaireData[parIndex]['question'][index]['preview'];
            if (angular.element($event.target).closest('.questionnaireWeightField').hasClass('questionnaireWeightField')) return 0;
            angular.forEach($scope.questionnaireData, function (val, key) {
                if (val.question) {
                    angular.forEach(val.question, function (valQuest, keyQuest) {
                        valQuest.preview = false;
                        if (parIndex === key && index === keyQuest) {
                            if (!$scope.pagePreview) {
                                valQuest.preview = true;
                                $scope.parentPreview = true;
                            }
                        }
                    })
                }
            });
            if (blockClickFlag) {
                setTimeout(function () {
                    document.getElementById('stickyAddPanel').style.top = document.getElementById('subsection-' + (parIndex + 1) + '-' + (index + 1)).offsetTop + 'px';
                }, 350);
            }
        }

        $scope.sectionBlockClick = function (index, $event) {
            document.getElementById('stickyAddPanel').style.top = document.getElementById('section-' + (index + 1)).offsetTop + 'px';
            //document.getElementById('section-' + (index + 1)).style.top = '50px';
        }

        $document.on('click', handler);
        $scope.$on('$destroy', function () {
            $document.off('click', handler);
        })

        // Rating Popup
        $scope.questionnaireRating = { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }, { "from": 0, "to": 0, "color": "#ef5350", "description": "" }] };
        $scope.addRatingData = function () {
            $scope.ratingPopupData.value.push({ "from": 0, "to": 0, "color": "#ef5350", "description": "" });
            smartColorPicker();
        }
        $scope.DeleteRatingData = function (Index) {
            if ($scope.ratingPopupData.value.length === 1) return false;
            $scope.ratingPopupData.value.splice(Index, 1);
            smartColorPicker();
        }
        $scope.ratingApplyAll = function (ratingPopupData) {

            $scope.showRatingPopup = false;
            notification.notify({
                type: 'confirm',
                message: '<p class="left-align">This action will copy the ratings from the Questionnaire to the questions within.<br/>Do you still wish to continue?</p>',
                buttons: [{
                    "title": "yes",
                    "result": 1
                },
                {
                    "title": "No",
                    "result": 0
                }]
            }, function (result) {
                if (result.result) {
                    ratingPopupData.applied = true;
                    ratingPopupData.title = 'Edit Rating';
                    angular.forEach($scope.questionnaireData, function (val, key) {
                        if (val.question) {
                            angular.forEach(val.question, function (valQuest, keyQuest) {
                                valQuest.rating = ratingPopupData;
                            })
                        }
                    });
                    $scope.questionnaireRating = ratingPopupData;
                    $scope.ratingPopupData = [];
                } else {
                    $scope.showRatingPopup = true;
                }
            });
        }
        $scope.resetRatingData = function (ratingPopupData) {

            $scope.showRatingPopup = false;
            notification.notify({
                type: 'confirm',
                message: '<p class="left-align">This action will remove the custom ratings you have set for this Questionnaire. It will however not affect any of the questions within.<br/>Do you still wish to continue?</p>',
                buttons: [{
                    "title": "yes",
                    "result": 1
                },
                    {
                        "title": "No",
                        "result": 0
                    }]
            }, function (result) {
                if (result.result) {
                    //Action code need to be written		    
                    $scope.ratingPopupData = { "applied": false, "title": "Add Rating", "value": [{ "from": 0, "to": 0, "color": "#ef5350", "description": "" }, { "from": 0, "to": 0, "color": "#ef5350", "description": "" }] };
                    smartColorPicker();

                }
                $scope.showRatingPopup = true;

            });
        }
        $scope.ratingApply = function (parentIndex, childIndex, ratingPopupData) {
            ratingPopupData.applied = true;
            ratingPopupData.title = 'Edit Rating';
            if (typeof parentIndex !== 'undefined') {
                $scope.questionnaireData[parentIndex].question[childIndex].rating = ratingPopupData;
            } else {
                $scope.questionnaireRating = ratingPopupData;
            }
            $scope.ratingPopupData = [];
        }
        $scope.showRatingPopup = false;
        $scope.hideRatingPopupCallback = function () {
            $scope.showRatingPopup = false;
        };
        $scope.RatingData = function (data, parentIndex, childIndex) {
            $scope.ratingPopupData = angular.copy(data);
            $scope.parentIndex = parentIndex;
            $scope.childIndex = childIndex;
            $scope.showRatingPopup = true;
            smartColorPicker();
        }
        // Start: Color Picker
        $scope.triggerColorPicker = function (e) {
            e.stopImmediatePropagation();
            angular.element(e.currentTarget).next('.colorPickerWrap').find(".colorPicker").colorpicker("showPalette");
        };


        // Rearrange Popup
        $scope.showRearrangePopup = false;
        $scope.isRearrangeSelected = false;

        $scope.hideRearrangePopupCallback = function () {
            $scope.showRearrangePopup = false;
        };
        $scope.showRearrange = function () {
            $scope.isRearrangeSelected = false;
            $scope.rearrangePopupData = angular.copy($scope.questionnaireData);
            $scope.showRearrangePopup = true;
            $scope.shiftSection = false;
            $scope.shiftQuestion = false;
        }
        $scope.rearrangeConfirm = function () {
            $scope.questionnaireData = angular.copy($scope.rearrangePopupData);
            conditionalNumber($scope);
        }
        $scope.moveAfter = function (data, moveAfterOption) {
            var indexes;
            $scope.isRearrangeSelected = true;
            indexes = $.map(data, function (obj, index) {
                if (obj.check == true) {
                    return index;
                }
            });
            var b = [],
                c;
            for (var i = 0; i < indexes.length; i++) {
                b.push(data.splice(indexes[i] - i, 1)[0]);
            }
            c = data.splice($.map(data, function (obj, index) {
                if (obj.title == moveAfterOption.title) {
                    return index;
                }
            })[0] + 1);

            for (var i = 0; i < b.length; i++) {
                data.push(b[i]);
            }
            for (var i = 0; i < c.length; i++) {
                data.push(c[i]);
            }
            $scope.shiftSection = false;
            $scope.shiftQuestion = false;
            angular.forEach(data, function (valQuest, keyQuest) {
                valQuest.check = false;
            });
            $scope.moveAfterDD.selectedOption = "";
        }

        $scope.cancelMoveAfter = function (data) {
            $scope.isRearrangeSelected = false;
            angular.forEach(data, function (valQuest, keyQuest) {
                valQuest.check = false;
            });
            $scope.moveAfterDD.selectedOption = "";
            $scope.shiftSection = false;
            $scope.shiftQuestion = false;
        }

        $scope.applyRearrangeOption = function (data) {
            angular.extend($scope.questionnaireData, data);
            $scope.rearrangePopupData = [];
        };

        $scope.onParentChange = function (data, flag, Index) {
            $scope.shiftQuestion = false;
            angular.forEach(data[Index].question, function (valQuest, keyQuest) {
                valQuest.check = flag;
            });

            var initialDisplayTextTemp = $filter('filter')(data, { check: true });
            if (initialDisplayTextTemp.length > 0) {
                $scope.shiftSection = true;
            } else {
                $scope.shiftSection = false;
            }
            initialDisplayTextTemp = [];
        };
        $scope.moveAfterDD = {
            "selectedOption": "",
            "options": {}
        };
        $scope.onChildChange = function (data, flag, Index, ParentIndex) {
            var isCheck;
            $scope.moveAfterDD.options = angular.copy(data[ParentIndex].question);

            $scope.shiftQuestion = true;

            //To check current Block
            var initialDisplayTextTemp = $filter('filter')(data[ParentIndex].question, { check: true });
            if (initialDisplayTextTemp.length !== data[ParentIndex].question.length) {
                data[ParentIndex].check = false;
                $scope.shiftSection = false;
            } else {
                data[ParentIndex].check = true;
                $scope.shiftSection = true;
            }
            initialDisplayTextTemp = [];

            var parentCheck = 0,
                childCheck = 0,
                index = 0;
            angular.forEach(data, function (val, key) {
                parentCheck = val.check ? ++parentCheck : parentCheck;
                index = 0;
                angular.forEach(val.question, function (valQuest, keyQuest) {
                    if(valQuest.check){
                        childCheck++;
                        $scope.moveAfterDD.options.splice(index, 1);
                        index--;
                    }
                    index++;
                });
            });


            if (childCheck > 0) {
                $scope.shiftQuestion = true;
                //$scope.isRearrangeSelected = true;
            } else {
                $scope.shiftQuestion = false;
                //$scope.isRearrangeSelected = false;
            }

            if (parentCheck > 0) {
                $scope.shiftSection = true;
                $scope.shiftQuestion = false;
            } else {
                $scope.shiftSection = false;
            }

        };

        // Dropdown Popup
        $scope.showDropdownPopup = false;
        $scope.hideDropdownPopupCallback = function () {
            $scope.showDropdownPopup = false;
        };
        $scope.dropdownPopup = function (data, scoreFlag, ind) {
            $scope.dropdownPopupData = angular.copy(data);
            $scope.parentIndex = data;
            $scope.scoreFlag = scoreFlag;
            $scope.showDropdownPopup = true;
            $scope.childCntInd = ind;
        }
        $scope.addDropdownOption = function ($event, data) {
            $event.stopPropagation();
            data.push({ "name": "", "score": "", "isfocus": true });
        };
        $scope.deleteDropdownOption = function ($event, data, Index) {
            $event.stopPropagation();
            if (data.length === 1) return false;
            data.splice(Index, 1);
        };
        $scope.applyDropdownOption = function (data) {
            var isvalidate = 0;
            angular.forEach(data, function (valDrop, keyDrop) {
                if (!valDrop.name) {
                    valDrop.isvalidate = true;
                    isvalidate = 1;
                }
            });
            if (isvalidate) return false;

            $scope.showDropdownPopup = false;
            $scope.parentIndex.type.dropdownApplied = true;
            $scope.parentIndex.type.config = data;
            gridRowColMerge(0, $scope.childCntInd);
            $scope.dropdownPopupData = [];
        };

        // Score Popup
        $scope.showScorePopup = false;
        $scope.hideScorePopupCallback = function () {
            $scope.showScorePopup = false;
        };
        $scope.showScore = function () {
            $scope.showScorePopup = true;
        }



        // Sub Question Hide Show
        var resizeTimer;
        $scope.showQuestion = function ($e) {
            var $subQuestionnarie = angular.element($e.currentTarget).closest('.questionResponseContainer').find('.subQuestionnarie');
            if ($subQuestionnarie) {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    $subQuestionnarie.slideToggle();
                }, 10);
            }
        }

        $scope.onSingleRespChange = function (arg, arg1) {
            // Need to complete code - DEV WORK
            // $scope.showQuestion();
        }

        function sectionOffset(sectionIndexList, sectionIndexTotalList) {
            sectionIndexTotalList.push({ 'section': document.getElementById('section-' + sectionIndexList).offsetTop, 'question': [] });
            angular.forEach($scope.questionnaireData[sectionIndexList - 1].question, function (val, key) {
                sectionIndexTotalList[sectionIndexList - 1].question.push(document.getElementById('subsection-' + sectionIndexList + '-' + (key + 1)).offsetTop);
            });
            sectionIndexList++;
            if ($scope.questionnaireData.length >= sectionIndexList) {
                sectionOffset(sectionIndexList, sectionIndexTotalList)
            }
        }

        function handler($event) {

            if (angular.element($event.target).closest('.questionnaireSectionNavContainer').hasClass('questionnaireSectionNavContainer') || angular.element($event.target).closest('.lean-overlay').hasClass('lean-overlay') || angular.element($event.target).closest('.modal').hasClass('modal')) {

            } else {
                if ($scope.parentPreview) {
                    angular.forEach($scope.questionnaireData, function (val, key) {
                        if (val.question) {
                            angular.forEach(val.question, function (valQuest, keyQuest) {
                                valQuest.preview = false;
                            })
                        }
                    });
                    $scope.parentPreview = false;
                    $scope.$digest();
                }
            }
        }
        function smartColorPicker() {
            setTimeout(function () {
                $('.colorPicker').colorpicker({
                    showOn: "button"
                });
            }, 100)
        }

        function questionValidate() {
            angular.forEach($scope.questionnaireData, function (val, key) {
                if (val.question) {
                    angular.forEach(val.question, function (valQuest, keyQuest) {

                        // Question Field Validation
                        valQuest.preview = false;
                        if (!valQuest.title) {
                            valQuest.isvalidate = true;
                            $scope.isvalidate = 1;
                            valQuest.preview = true;
                            setTimeout(function () {
                                questionScrollTo.perform(document.getElementById('subsection-' + (key + 1) + '-' + (keyQuest + 1)), -$scope.scrollDiffpos);
                            }, 200);
                        }
                        switch (valQuest.questionType.type) {
                            case "multi-response":
                                angular.forEach(valQuest.questionResponse, function (valResp, keyResp) {
                                    if (!valResp.title) {
                                        valResp.isvalidate = true;
                                        $scope.isvalidate = 1;
                                        valQuest.preview = true;
                                        setTimeout(function () {
                                            questionScrollTo.perform(document.getElementById('subsection-' + (key + 1) + '-' + (keyQuest + 1)), -$scope.scrollDiffpos);
                                        }, 200);
                                    }
                                });
                                break;

                            case "single-response-radio":
                                angular.forEach(valQuest.questionResponse.config, function (valResp, keyResp) {
                                    if (!valResp.options[0].title) {
                                        valResp.options[0].isvalidate = true;
                                        $scope.isvalidate = 1;
                                        valQuest.preview = true;
                                        setTimeout(function () {
                                            questionScrollTo.perform(document.getElementById('subsection-' + (key + 1) + '-' + (keyQuest + 1)), -$scope.scrollDiffpos);
                                        }, 200);
                                    }
                                });
                                break;
                            case "single-response-drop":
                                angular.forEach(valQuest.questionResponse.config, function (valResp, keyResp) {
                                    if (!valResp.title) {
                                        valResp.isvalidate = true;
                                        $scope.isvalidate = 1;
                                        valQuest.preview = true;
                                        setTimeout(function () {
                                            questionScrollTo.perform(document.getElementById('subsection-' + (key + 1) + '-' + (keyQuest + 1)), -$scope.scrollDiffpos);
                                        }, 200);
                                    }
                                });
                                break;
                            case "grid-type-drop":
                            case "grid-type-radio":
                            case "grid-type-check":
                            case "grid-type-text":
                            case "grid-type-combination":
                            case "grid-type-wrow-combination":
                                angular.forEach(valQuest.questionResponse.rows, function (valResp, keyResp) {
                                    if (!valResp.title) {
                                        valResp.isvalidate = true;
                                        $scope.isvalidate = 1;
                                        valQuest.preview = true;
                                        setTimeout(function () {
                                            questionScrollTo.perform(document.getElementById('subsection-' + (key + 1) + '-' + (keyQuest + 1)), -$scope.scrollDiffpos);
                                        }, 200);
                                    }
                                });
                                angular.forEach(valQuest.questionResponse.cols, function (valResp, keyResp) {
                                    if (!valResp.title) {
                                        valResp.isvalidate = true;
                                        $scope.isvalidate = 1;
                                        valQuest.preview = true;
                                        setTimeout(function () {
                                            questionScrollTo.perform(document.getElementById('subsection-' + (key + 1) + '-' + (keyQuest + 1)), -$scope.scrollDiffpos);
                                        }, 200);
                                    }
                                });
                                break;
                            case "multi-numeric":
                                angular.forEach(valQuest.questionResponse.value, function (valResp, keyResp) {
                                    if (!valResp.question) {
                                        valResp.isvalidate = true;
                                        $scope.isvalidate = 1;
                                        valQuest.preview = true;
                                        setTimeout(function () {
                                            questionScrollTo.perform(document.getElementById('subsection-' + (key + 1) + '-' + (keyQuest + 1)), -$scope.scrollDiffpos);
                                        }, 200);

                                    }
                                });
                                break;
                                //case "single-response-drop":

                                //	break;
                        }

                        // Conditional Checkbox Flag
                        if (valQuest.questionType.type === "multi-response" || valQuest.questionType.type === "single-response-radio" || valQuest.questionType.type === "single-response-drop") {
                            $scope.conditionalQuestionTypeOptionsFlag = true;
                        }
                    });
                }
            });
        };
        $scope.questionnaireWeightRule = [{
            "rule": "this > 100",
            "error": " "
        }];
        $scope.validateNum = function (evt, key) {
            var evtTemp = evt[key].replace(/[^[\d\.]/ig, "");
            if (evtTemp.split('.').length > 2) {
                evtTemp = evtTemp.replace(/\.(?!.*\.)/, '');
            }
            evt[key] = evtTemp;
        }
        $scope.validateNumBlur = function (evt, key) {
            if (!evt[key] && evt[key] !== 0) {
                evt[key] = 0;
            }
        }

        $scope.onSort = function (args, responseType) {
            switch (responseType) {
                case 'multiResponse':
                    $scope.questionnaireData[0].question[0].questionResponse = linearSwap($scope.questionnaireData[0].question[0].questionResponse, args.startIndex, args.endIndex);
                    break;
                case 'multiNumeric':
                    $scope.questionnaireData[0].question[0].questionResponse.value = linearSwap($scope.questionnaireData[0].question[0].questionResponse.value, args.startIndex, args.endIndex);
                    break;
                case 'singleResponseRadio':
                    $scope.questionnaireData[0].question[0].questionResponse.config = linearSwap($scope.questionnaireData[0].question[0].questionResponse.config, args.startIndex, args.endIndex);
                    break;
                case 'multiRow':
                    $scope.questionnaireData[0].question[0].questionResponse.rows = linearSwap($scope.questionnaireData[0].question[0].questionResponse.rows, args.startIndex, args.endIndex);
                    break;
                case 'multiColumn':
                    $scope.questionnaireData[0].question[0].questionResponse.cols = linearSwap($scope.questionnaireData[0].question[0].questionResponse.cols, args.startIndex, args.endIndex);
                    break;
                case 'newDragDrop':
                    $scope.rearrangePopupData[0].question = linearSwap($scope.rearrangePopupData[0].question, args.startIndex, args.endIndex);
                    $scope.isRearrangeSelected = true;
                    break;
            }

        }

        function linearSwap(data, sind, tind) {
            var a = data, b, c, d;
            if (sind < tind) {
                b = a.splice(sind, 1);
                c = a.splice(tind);
                a.push(b[0]);

                for (var i = 0; i < c.length; i++) {
                    a.push(c[i])
                }
                d = a;
            } else if (sind > tind) {
                b = a.splice(sind, 1);
                c = a.splice(0, tind);
                c.push(b[0]);

                for (var i = 0; i < a.length; i++) {
                    c.push(a[i])
                }
                d = c;
            }
            return d;
        }
    };
})(angular);