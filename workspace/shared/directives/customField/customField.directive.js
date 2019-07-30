angular.module('SMART2').directive('customField', ['$filter', '$timeout', customFieldFunc]);


function customFieldFunc($filter, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'shared/directives/customField/customFieldTemplate.html',
        scope: {
            config: '=',
            useWithFormWidget: '@'
        },
        link: function (scope, element, attrs) {
            scope.dataModel = scope.config;
            function uniqueIDGenerator() {
                var d = new Date().getTime();
                var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uniqueID;
            };

            scope.returnColClass = function (que) {
                var q = que.question;
                if (que.colspan) {
                    switch (parseFloat(que.colspan)) {
                        case 1:
                            return 'col s12 m6 l4 xl4 xxl2';
                            break;
                        case 2:
                            return 'col s12 m12 l8 xl6 xxl4';
                            break;
                        case 3:
                            return 'col s12 m12 l12 xl9 xxl6';
                            break;
                        case 4:
                            return 'col s12 m12 l12 xl12 xxl8';
                            break;
                        case 5:
                            return 'col s12 m12 l12 xl12 xxl10';
                            break;
                        case 6:
                            return 'col s12 m12 l12 xl12 xxl12';
                            break;
                        default:
                            return 'col s12 m6 l4 xl4 xxl2';
                            break;
                    }
                }
                else {
                    if (q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" && que.type != "grid-type-combination" && que.type != "grid-type-wrow-combination" && que.type != "list-box" && que.type != "multi-numeric" || q.length < 20 && que.type != "multi-text" && que.type != "multi-text-with-icon" && que.type != "grid-type-combination" && que.type != "grid-type-wrow-combination" && que.type != "list-box" && que.type != "multi-numeric" && q == "") {
                        return "s12 m6 l4 xl4 xxl4";
                    }
                    else if (q.length >= 21 && q.length <= 40 && que.type != "multi-text" && que.type != "multi-text-with-icon" && que.type != "grid-type-combination" && que.type != "grid-type-wrow-combination" && que.type != "list-box" && que.type != "multi-numeric") {
                        return "s12 m12 l6 xl6 xxl6";
                    }
                    else {
                        return "s12 marginBtm25";
                    }
                }
            }

            scope.returnField = function (fieldType) {

                switch (fieldType) {
                    case 'single-text':
                    case 'numeric':
                        return 'single-text.html'
                        break;
                    case 'multi-text':
                        return 'multi-text.html'
                        break;
                    case 'multi-text-with-icon':
                        return 'multi-text-with-icon.html'
                        break;
                    case 'single-response-radio':
                        return 'single-response-radio.html'
                        break;
                    case 'single-response-drop':
                        return 'single-response-drop.html'
                        break;
                    case 'multi-response':
                        return 'multi-response.html'
                        break;
                    case 'date-time':
                        return 'date-time.html'
                        break;
                    case 'multi-text-format':
                        return 'multi-text-format.html'
                        break;

                    case 'attachment-only':
                        return 'attachment-only.html'
                        break;
                    case 'multi-numeric':
                        return 'multi-numeric.html'
                        break;
                    case "grid-type-text":
                    case "grid-type-combination":
                    case "grid-type-wrow-combination":
                        return 'grid-type-combination.html'
                        break;
                    case "list-box":
                        return 'list-box.html'
                }
            }

            function fn_createOptFieldList() {
                angular.forEach(scope.dataModel, function (dataVal, dataIndex) {
                    dataVal.optFieldList = [];
                    dataVal.uID = uniqueIDGenerator();
                    angular.forEach(dataVal.levels, function (levelVal, levelIndex) {
                        angular.forEach(levelVal.questions, function (queVal, queIndex) {
                            if (queVal.mandatory == false) {
                                var tempList = {};
                                tempList.title = queVal.question;
                                tempList.isVisible = queVal.isVisible != undefined ? queVal.isVisible : true;
                                tempList.dataId = dataIndex;
                                tempList.level = levelIndex;
                                tempList.id = queIndex;
                                dataVal.optFieldList.push(tempList);
                            }
                        });
                    });
                });
            }

            fn_createOptFieldList();

            var foundItem;
            scope.hideShowedField = function (item, dataModelIdx) {
                item.isVisible = false;
                foundItem = $filter('filter')(scope.dataModel[dataModelIdx].optFieldList, item.question, true)[0];
                foundItem.isVisible = false;
            }

            scope.onOptionalFieldClick = function (item) {
                if (item.isVisible) {
                    scope.dataModel[item.dataId].levels[item.level].questions[item.id].isVisible = false;
                }
                else {
                    scope.dataModel[item.dataId].levels[item.level].questions[item.id].isVisible = true;
                }
                item.isVisible = !item.isVisible;
            }

            scope.showUploadPopup = false;
            scope.showUploadPopupCallback = function () {
                scope.showUploadPopup = true;
            }

            scope.hideUploadPopupCallback = function () {
                scope.showUploadPopup = false;
            }

            scope.dropDownConfig = {
                inDuration: 300,
                outDuration: 225,
                constrain_width: false, // Does not change width of dropdown to that of the activator
                hover: false, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'right' // Displays dropdown with edge aligned to the left of button
            };
        }//end link 
    }//end return
}