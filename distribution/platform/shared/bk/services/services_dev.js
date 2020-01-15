(function () {
    'use strict';
    angular.module('SMART2').service('ActivityCheck', ['APPCONSTANTS', function (APPCONSTANTS) {
        var service = this;
        this.viewOrderCheck = function () {
            var vieworder = _.contains(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.VIEW_ORDER);
            var reqtoorder = _.contains(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.FLIP_REQUISITIONS_TO_ORDER);
            var modifyorder = _.contains(APPCONSTANTS.userPreferences.Activities, APPCONSTANTS.userActivityStatus.MODIFY_ORDER);
            if (vieworder && !reqtoorder && !reqtoorder)
                return true;
            else
                return false;
        }

    }]);
})();
(function (angular) {
    'use strict';
     angular.module('SMART2').service('cacheHelperService', [cacheHelperServiceFunc]);

    function cacheHelperServiceFunc() {

        var colDef;
        var filterDef;
        var groupDef;

        function setColDef(_dataModel) {
            colDef = _dataModel;
        }

        function getColDef() {
            if (typeof colDef != undefined) {
                return colDef;
            }
        }

        function setFilterDef(_dataModel) {
            filterDef = _dataModel;
        }

        function getFilterDef() {
            if (typeof filterDef != undefined) {
                return filterDef;
            }
        }

        function setGroupDef(_dataModel) {
            groupDef = _dataModel;
        }

        function getGroupDef() {
            if (typeof groupDef != undefined) {
                return groupDef;
            }
        }

        // It takes savedViews as 1st param and the 2nd parameter represents whether we want the systemDefaultView view flag as true or false.
        function getDefaultSavedView(savedViews, sysDefaultFlag) {
            var defaultView;
            if (sysDefaultFlag) {
                defaultView = _.find(savedViews, function(x) {
                    return x.IsSystemDefault == true;
                });
            } else {
                defaultView = _.find(savedViews, function(x) {
                    return (x.IsSystemDefault == false && ((x.isDefault == true) || (x.IsDefaultView == true)))
                });
            }
            return defaultView;
        }

        var service = {
            setColDef: setColDef,
            getColDef: getColDef,
            setFilterDef: setFilterDef,
            getFilterDef: getFilterDef,
            setGroupDef: setGroupDef,
            getGroupDef: getGroupDef,
            getDefaultSavedView: getDefaultSavedView
        };

        return service;
    };
})(angular);
(function () {
    'use strict';

    angular.module('SMART2').factory('cellTemplateProvider', ['$filter', '$translate', 'smartDateFormatFilter', function ($filter, $translate, smartDateFormatFilter) {
        function applyLocalizationFilter(text) {
            return $filter('translate')(text);
        };

        function _getCellTemplate(config, templateType) {
            if (config.type == 'calculated') {
                return '<div><div ng-if="!row.groupHeader" >{{' + config.attributes.rule + '|  minPrecisionHandler:' + config.attributes.minmaxprecisionfilter + '}}</div></div>';

            }
            else if (config.type == 'editable') {

                if (config.attributes && config.attributes.type && config.attributes.type == "number") {
                    if (templateType == "cellTemplate") {
                        return '<div title="{{COL_FIELD | minPrecisionHandler:' + config.attributes.minmaxprecisionfilter + '}}" class="ui-grid-cell-contents">{{row.entity.' + (config.data != undefined ? config.data : config.field) + ' | minPrecisionHandler:' + config.attributes.minmaxprecisionfilter + '}}</div>'
                    }
                    else if (templateType == "editableCellTemplate") {
                        return '<div title="{{COL_FIELD }}"><div><smart-textfield class="ui-grid-cell-contents" type="number" ' + 'minmaxprecision="' + config.attributes.minmaxprecision + '" ng-model="row.entity.' + config.field + '" zero-case-handler></smart-textfield></div></div>';
                    }
                }
                if (config.attributes && config.attributes.type && config.attributes.type == "autocomplete") {
                    return '<div class="padding0" title="{{COL_FIELD}}"><div><smart-textfield class="ui-grid-cell-contents" type="autocomplete" width="230px" ' +
                        ' displayformat="' + config.attributes.displayformat + '" optionformat="' + config.attributes.optionformat + '" filterkeys="' + ("['" + config.attributes.filterkeys.join("','") + "']") +
                        '" ng-model="row.entity.' + config.attributes.model + '" options="grid.appScope.autoSuggestOptions"  on-change="grid.appScope.autoSuggestOnChange($event,col)" on-select="grid.appScope.autoSuggestOnSelect()" uigrid-compatible></smart-textfield></div></div>';
                }
                if (config.attributes && config.attributes.type && config.attributes.type == "date") {
                    if (templateType == "cellTemplate") {
                        return "<div style='height:100%;'>{{COL_FIELD | smartDateFormat:'" + config.attributes.format + "'}}</div>";
                    } else if (templateType == "editableCellTemplate") {
                        return '<div grid-date-template-provider></div>'
                    }
                }
                return '<div title="{{COL_FIELD}}"><div><smart-textfield class="ui-grid-cell-contents" type="text"' +
                    ' ng-model="row.entity.' + config.field + '" ></smart-textfield></div></div>';
            } else if (config.type == 'dropdown') {
                config.attributes.options.map(function (x) { x[config.attributes.datakey] = $filter('translate')(x[config.attributes.datakey]) });
                if (templateType == "cellTemplate") {
                    return "<div><div ng-if='grid.appScope.isObject(COL_FIELD)' style='height:100%;' uigrid-compatible>{{COL_FIELD." + config.attributes.dataKey + " | translate}}</div><div ng-if='!grid.appScope.isObject(COL_FIELD)' IDK={{" + config.attributes.idKey + "}} style='height:100%;' uigrid-compatible>{{COL_FIELD | translate}}</div></div>";
                }
                else if (templateType == "editableCellTemplate") {
                    return "<div class='ui-grid-cell-contents'><form name='inputForm'><select model = {{row.entity." + config.attributes.model + "}} ui-grid-edit-dropdown ng-model='row.entity." + config.attributes.model + "' ng-change='grid.appScope.dropDownOnChange(row.entity, col , row.entity." + config.field + ")' ng-options='option." + config.attributes.dataKey + " for option in grid.appScope.dropDownOptions track by option." + config.attributes.idKey + "' uigrid-compatible></select></form></div>";
                }
            } else if (config.type == 'checkbox') {
                if (templateType == "cellTemplate") {
                    return '<div title="{{COL_FIELD}}"><div><smart-checkbox fill="true" class="ui-grid-cell-contents" ng-model="row.entity.' + config.attributes.model +
                        '" on-change="grid.appScope.checkBoxOnChange(row.entity, col , row.entity.' + config.field + ')"  uigrid-compatible></smart-checkbox></div></div>';
                }
            } else if (config.type == 'popup') {
                var displayLabel = "";
                var appendingString = "\+\"-\"\+";
                if (typeof config.appendedLabels != "undefined") {
                    for (var i = 0; i < config.appendedLabels.length; i++) {
                        displayLabel = displayLabel + 'row.entity.' + config.appendedLabels[i] + appendingString;
                    }
                    displayLabel = "(" + displayLabel.slice(0, -(appendingString.length)) + ")";

                }
                else {
                    displayLabel = (templateType == "cellTemplate") ? ("row.entity." + config.field) : 'COL_FIELD';
                }

                if (templateType == "cellTemplate") {
                    return '<div title = "{{COL_FIELD}}" class="ui-grid-cell-contents padding0"><a ng-if="!row.groupHeader" ng-class="{\'waves-effect waves-light btn-flat\': true, \'disabled\': false}">{{(COL_FIELD != undefined && (COL_FIELD != "") && (COL_FIELD != "1")) ?' + displayLabel + ' : "' + config.attributes.defaultTitle + '"}}</a></div>';
                }
                else if (templateType == "editableCellTemplate") {
                    return '<div title="{{COL_FIELD}}"><smart-button flat="true"  config=\'{"title": (row.entity.' + config.field + ' != undefined && row.entity.' + config.field + ' != "1" && row.entity.' + config.field + ' != "")?' + displayLabel + ' : "' + config.attributes.defaultTitle + '" }\' on-click="grid.appScope.popUpButtonClickCallback(row,col)" uigrid-compatible></smart-button></div>';
                }
            } else if (config.type == 'subsection' && config.data == 'notes') {
                if (config.data && config.attributes && config.attributes.readonly !== undefined) {
                    return '<div><smart-button flat="true" disable="grid.appScope.IsCellReadOnly(row.entity' + ',\'' + config.data + '\',' + config.attributes.readonly + ')" config=\'{"title":grid.appScope.getCommentText(row.entity.notes)}\' callback-params="row.entity"} callback="grid.appScope.showCommentsPopupCallback"  uigrid-compatible></smart-button><div>';
                }
            } else if (config.type == 'subsection' && config.data == 'manufacturer') {
                if (config.data && config.attributes && config.attributes.readonly !== undefined) {
                    return '<div title="{{COL_FIELD}}"><smart-button flat="true" disable="grid.appScope.IsCellReadOnly(row.entity' + ',\'' + config.data + '\',' + config.attributes.readonly + ')" config=\'{"title":grid.appScope.setManufacturerDisplayName(row.entity)}\' callback-params="row.entity" callback="grid.appScope.showManufacturerPopupCallback"  uigrid-compatible></smart-button><div>';
                }
            } else if (config.data == 'splitType') {
                if (config.data && config.attributes && config.attributes.readonly !== undefined) {
                    return '<div title="{{COL_FIELD}}"><smart-button flat="true" disable="grid.appScope.IsCellReadOnly(row.entity' + ',\'' + config.data + '\',' + config.attributes.readonly + ')"  config=\'{"title":grid.appScope.splitType(row.entity.splitType)}\'  callback-params="row.entity"} callback="grid.appScope.showSplitsPopup"  uigrid-compatible></smart-button><div>';
                } else {
                    return '<div title="{{COL_FIELD}}"><smart-button flat="true" config=\'{"title":grid.appScope.splitType(row.entity.splitType)}\'  callback-params="row.entity"} callback="grid.appScope.showSplitsPopup"  uigrid-compatible></smart-button><div>';
                }
            } else if (config.data == 'splitValue') {
                //return '<div title="{{COL_FIELD}}" class="ui-grid-cell-contents">{{grid.appScope.getSplitValue(row.entity)}}</div>';
                return '<div title="{{COL_FIELD | minPrecisionHandler: ' + config.attributes.minmaxprecisionfilter + '}}" class="ui-grid-cell-contents">{{grid.appScope.getSplitValue(row.entity) | minPrecisionHandler: ' + config.attributes.minmaxprecisionfilter + '}}</div>';
            } else if (config.data == 'taxes') {
                if (config.data && config.attributes && config.attributes.readonly !== undefined) {
                    return '<div title="{{COL_FIELD}}"><smart-button flat="true" disable="grid.appScope.IsCellReadOnly(row.entity' + ',\'' + config.data + '\',' + config.attributes.readonly + ')" config=\'{"title":grid.appScope.showExempted(row.entity)}\' callback-params="row.entity"} callback="grid.appScope.openTaxPopup"  uigrid-compatible></smart-button></div>';
                }
            } else if (config.data == 'total') {
                return '<div title="{{COL_FIELD | minPrecisionHandler:' + config.attributes.minmaxprecisionfilter + '}}" class="ui-grid-cell-contents">{{grid.appScope.getTotal(row.entity) | minPrecisionHandler:' + config.attributes.minmaxprecisionfilter + '}}</div>';
            }
        }

        var serviceObj = {
            getCellTemplate: _getCellTemplate
        };

        return serviceObj;
    }]);

    angular.module('SMART2').directive('gridDateTemplateProvider', ['$rootScope', '$timeout', '$filter', function ($rootScope, $timeout, $filter) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                scope.onDateChange = function (date) {
                    if (date != '') {
                        scope.row.entity[scope.col.colDef.field] = getServerDateFormat(date);
                    }
                }
                function getServerDateFormat(value) {
                    if (value) { } else {
                        //current date or 0
                        value = 0;
                    }
                    var serverDateInNumber = getServerDateInNumber(value);
                    if (serverDateInNumber) {
                        return "\/Date(" + serverDateInNumber + ")\/";
                    } else {
                        return serverDateInNumber;
                    }
                };

                function getServerDateInNumber(value) {
                    //CONVERT DATE FROM ALMOST ANY VALID DATE FORMAT TO "/Date(1455883450840+0000)/" form
                    var IS_UNEXPECTED_DATE_VALUE = false;
                    if (value) {
                        if ((typeof value).toLowerCase() === "string") {
                            if (value.indexOf("Date") > -1) {
                                var a = (value + '').replace(new RegExp("/", "ig"), '');
                                a = a.split('+');
                                var b = eval('new ' + a[0] + (a.length > 1 ? ')' : ''));
                            } else {
                                IS_UNEXPECTED_DATE_VALUE = true;
                            }
                        } else {
                            IS_UNEXPECTED_DATE_VALUE = true;
                        }
                        if (IS_UNEXPECTED_DATE_VALUE) {
                            if (isNaN(new Date(value))) {
                                return new Date(0).getTime();
                            } else {
                                var b = new Date(value);
                            }
                        }
                        return b.getTime();
                    } else {
                        return null;
                    }
                };
            },
            template: '<div style="width:100%;height:100%" ><smart-textfield focus="" set-from-grid=true on-date-change="onDateChange($date)" type="date" ng-model="row.entity[col.colDef.field]" format="{{col.colDef.attributes.format}}" uigrid-compatible></smart-textfield></div>'
        };
    }]);

    angular.module('SMART2').filter('smartDateFormat', ['$filter', 'Common', function ($filter, Common) {
        return function (input, format) {
            if (input) {
                var b = Common.convertServerDateTimeToNormalDateTime(input);
                if (!_.contains(format.split(' '), 'hh:mm')) {
                    b = new Date(b.getFullYear(), b.getMonth(), b.getDate());
                }
                return $filter('date')(b, format); //, timezone)
            } else {
                return "";
            }
        };
    }]);

    angular.module('SMART2').directive('zeroCaseHandler', [function zeroCaseHandler() {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.push(function (value) {
                    if (isNaN(value)) {
                        return 0;
                    }
                    return value;
                });
            }
        };
    }]);


   
})();


(function () {
    'use strict';

    angular.module('SMART2').service('Common', [function () {
        this.convertServerDateTimeToNormalDateTime = function (input) {
            var IS_UNEXPECTED_DATE_INPUT = false;
            if ((typeof input).toLowerCase() === "string") {
                if (input.indexOf("Date") > -1) {
                    var a = (input + '').replace(new RegExp("/", "ig"), '');
                    a = a.split('+');
                    var b = eval('new ' + a[0] + (a.length > 1 ? ')' : ''));
                } else {
                    IS_UNEXPECTED_DATE_INPUT = true;
                }
            } else {
                IS_UNEXPECTED_DATE_INPUT = true;
            }
            if (IS_UNEXPECTED_DATE_INPUT) {
                if (isNaN(new Date(input))) {
                    return input;
                } else {
                    var b = new Date(input);
                }
            }
            return b;
        };
        
        this.uniqueIDGenerator = function () {
            var d = new Date().getTime();
            var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uniqueID;
        };

    }]);

    angular.module('SMART2').filter('minPrecisionHandler', ['$filter', function ($filter) {
        var postDecimalNumbers = 0;
        return function (input, decimals, maxDecimals, flag) {
            if (input != undefined) {
                if (input == 0)
                    return $filter('number')(0, decimals);
                if (input != 0) {
                    postDecimalNumbers = ((input + "").split(".")[1] != undefined) ? (input + "").split(".")[1].length : 0;
                    if (postDecimalNumbers > maxDecimals)
                        return $filter('number')(input, maxDecimals);
                    else if (postDecimalNumbers < decimals)
                        return $filter('number')(input, decimals);
                    else
                        return $filter('number')(input, postDecimalNumbers);

                }
                if (flag && flag == true && input != 0)
                    return '';
                else
                    return input;
            }
            if (flag && flag == true)
                return '';
            else
                return 0;
        }
    }]);
    angular.module('SMART2').service('SmartToast', [function () {
        this.show = function (config) {
            Materialize.toast(config.message, config.duration ? config.duration : 500);
        };
    }]);
})();
(function () {
    'use strict';

    angular.module('SMART2').service('debouncer', ['$timeout', function ($timeout) {
        var functionTimeout;

        this.add = function (callback, duration) {
            if (functionTimeout) {
                $timeout.cancel(functionTimeout);
            }
            functionTimeout = $timeout(function () {
                angular.isFunction(callback) && callback();
            }, duration ? duration : 1000);
        };

        this.cancel = function () {
            $timeout.cancel(functionTimeout);
            functionTimeout = null;
        };
    }]);
})();
(function () {
    'use strict';

    angular.module('SMART2').service('formWidgetUtils', [function () {
        /*
         *  Get colspan class according to the number passed
         */
        this.getColspanClass = function (colspan) {
            switch (colspan) {
                case 1:
                    return 'col s12 m6 l4 xl3 xxl2';
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
                    return 'col s12 m6 l4 xl3 xxl2';
                    break;
            }
        };

        /*
         *  Convert value into actual scope variable/function and evaluate it
         */
        this.convertAndGetValue = function (val, scope, property) {
            if (val == '' || val == undefined || val == null) {
                return false;
            }
            var dataType;
            try {
                dataType = typeof eval(val);
            }
            catch (e) { }
            if (dataType == undefined) {
                //  If function
                if (val.indexOf(')') == val.length - 1) {
                    return eval(this.generateFunctionWithParams(val, 'scope.$parent'));
                }
                var result = eval('scope.$parent.' + val);
                dataType = typeof result;
                if (dataType == 'boolean') {
                    return result;
                }
                dataType = dataType == 'function' ? 'function' : 'string';
            }
            if (dataType == 'function') {
                return eval(this.generateFunctionWithParams(val, 'scope.$parent'));
            }
            else if (dataType == 'string') {
                return eval('scope.$parent.' + val);
            }
            else {
                return eval(val);
            }
        };

        /*
         *  Map events
         */
        this.mapEvents = function (arrEvents) {
            if (typeof arrEvents == 'object') {
                var str = '';
                for (var i = 0; i < arrEvents.length; i++) {
                    if (arrEvents[i].listener) {
                        str = str + ' ' + arrEvents[i].type + '="' + arrEvents[i].listener + '"';
                    }
                }
                return str + ' ';
            }
            return '';
        };

        /*
         *  Generate params list from function name
         */
        this.getParamsFromEvents = function (event, scopeString) {
            var params = event.split('(');
            if (params.length > 1) {
                params = params[1].trim().split(')');
                params = params[0].split(',');
                var arrIndexesToBeDeleted = [];
                for (var i = 0; i < params.length; i++) {
                    params[i] = params[i].trim();
                    if (params[i] != '$event') {
                        if (params[i] == '') {
                            arrIndexesToBeDeleted.push(params[i]);
                        }
                        else {
                            var paramValue = undefined;
                            try {
                                paramValue = eval(params[i]);
                            }
                            catch (e) { }
                            if (angular.isDefined(paramValue)) {
                                params[i] = params[i].trim();
                            }
                            else {
                                params[i] = (scopeString == '' || scopeString == undefined || scopeString == null ? '' : scopeString + '.') + params[i].trim();
                            }
                        }
                    }
                }
                for (var i = 0; i < arrIndexesToBeDeleted.length; i++) {
                    params.splice(arrIndexesToBeDeleted[i], 1);
                }
            }
            else {
                params = [];
            }
            return params;
        };

        /*
         *  Convert function and its parameters into actual scope
         *  For e.g. onChange(modelData) would be converted into scopeString.onChange(scopeString.modelData)
         *  scopeString is the scope reference
         */
        this.generateFunctionWithParams = function (event, scopeString, isSection) {
            var functionName = '';
            if (!event) {
                return functionName;
            }
            var params = this.getParamsFromEvents(event, scopeString);
            functionName = (event.split('(')[0]).trim();
            if (params.length > 0) {
                params.push(isSection ? 'section' : 'property');
                functionName = scopeString + '.' + functionName + '(' + params.join(',') + ')';
            }
            else {
                functionName = scopeString + '.' + functionName + (isSection ? '(section)' : '(property)');
            }
            return functionName;
        };

        /*
         *  Convert attribute value into actual scope
         *  For e.g. isReqNameMandatory(modelData.reqName) would be converted into scope.isReqNameMandatory(scope.modelData.reqName)
         *  scope is the scope reference
         */
        this.convertAndGetAttributeMapping = function (attributeType, key, attr, bindingType, scope, isSection) {
            var str = attr + '="' + (bindingType == '@' ? '{{' : '') + (isSection ? 'section.' : (attributeType == 'primary' ? 'property.' : 'property.attributes.')) + key + (bindingType == '@' ? '}}' : '') + '"';
            var dataType;
            var objProperty;
            if (attributeType == 'primary' && isSection) {
                objProperty = scope.section;
            }
            else if (attributeType == 'primary' && !isSection) {
                objProperty = scope.property;
            }
            else {  //  secondary attributes
                objProperty = scope.property.attributes;
            }
            try {
                dataType = typeof eval(objProperty[key]);
            }
            catch (e) { }
            if (dataType == undefined) {
                dataType = typeof eval('scope.parentScope.' + objProperty[key]);
                if (dataType == 'function') {
                    str = attr + '="' + (bindingType == '@' ? '{{' : '') + this.generateFunctionWithParams(objProperty[key], 'parentScope', isSection) + (bindingType == '@' ? '}}' : '') + '"';
                }
                else {
                    str = attr + '="' + (bindingType == '@' ? '{{' : '') + 'parentScope.' + (objProperty[key]) + (bindingType == '@' ? '}}' : '') + '"';
                }
            }
            return ' ' + str + ' ';
        };

        /*
         *  Map attribute and its value
         */
        this.getAttributesMapping = function (attributeType, attrs, scope, isSection) {
            var str = '';
            if (attributeType == 'primary') {
                for (var key in attrs) {
                    switch (key) {
                        case 'isMandatory':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'is-mandatory', '@', scope, isSection);
                            break;
                        case 'isVisible':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'is-visible', '=', scope, isSection);
                            break;
                        case 'isCollapsible':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'is-collapsible', '@', scope, isSection);
                            break;
                        case 'isDraggable':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'is-draggable', '@', scope, isSection);
                            break;
                        case 'isActive':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'is-active', '=', scope, isSection);
                            break;
                        case 'isHeader':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'is-header', '@', scope, isSection);
                            break;
                        case 'headerTemplate':
                            str += ' ' + 'header-template="{{section.' + key + '}}" ';
                            break;
                        //case 'focus':
                        //case 'validate':
                        //    str += this.convertAndGetAttributeMapping(attributeType, key, key, '=', scope, isSection);
                        //    break;
                        case 'rules':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'rules', '@', scope, isSection);
                            break;
                    }
                }
            }
            else {
                for (var key in attrs) {
                    switch (key) {
                        case 'type':
                            if (scope.property.type == 'textfield') {
                                var textfieldTypes = ['text', 'number', 'date', 'time', 'dateTime', 'area', 'autocomplete'];
                                if (textfieldTypes.indexOf(scope.property.attributes.type) == -1) {
                                    var arrSplitFunction = scope.property.attributes.type.split('(');
                                    var evalResult;
                                    var property = scope.property;  //  Property is element's config
                                    //  If function call is passed
                                    if (arrSplitFunction.length > 1) {
                                        evalResult = eval('scope.' + this.generateFunctionWithParams(scope.property.attributes.type, 'parentScope'));
                                    }
                                    else {
                                        evalResult = eval('scope.parentScope.' + scope.property.attributes.type);
                                        //  If function reference is passed
                                        if (typeof evalResult == 'function') {
                                            evalResult = eval('scope.' + this.generateFunctionWithParams(scope.property.attributes.type, 'parentScope'));
                                        }
                                    }
                                    str += ' type="' + evalResult + '"';
                                }
                                else {
                                    str += ' type="{{property.attributes.type}}" ';
                                }
                            }
                            break;
                        case 'options':
                            /*
                             *  Check if type of value passed is string. If yes convert the same into controller scope variable.
                             *  So that when the scope variable's value gets changed, the same would be reflected in directive.
                             */
                            if (typeof eval('scope.property.attributes.options') == 'string') {
                                str += ' options="parentScope.' + scope.property.attributes.options + '" ';
                            }
                            else {
                                str += ' options="property.attributes.options" ';
                            }
                            break;
                        case 'readonly':
                        case 'disable':
                            str += this.convertAndGetAttributeMapping(attributeType, key, key, '@', scope, isSection);
                            break;
                        case 'ngModelOptions':
                            str += ' ng-model-options="property.attributes.ngModelOptions" ';
                            break;
                        case 'validateOn':
                            str += ' validate-on="{{property.attributes.validateOn}}" ';
                            break;
                        default:
                            str += ' ' + key + '="{{property.attributes.' + key + '}}" ';
                            break;
                    }
                }
            }
            return str;
        };
    }]);
})();
(function () {
    'use strict';

    angular.module('SMART2').service('gridConfigProvider', ['uiGridGroupingConstants', 'cellTemplateProvider', '$filter', 'formWidgetUtils', function (uiGridGroupingConstants, cellTemplateProvider, $filter, formWidgetUtils) {

        function getDefaultGridConfigObject() {
            return {
                "field": "",
                "displayName": "",
                "groupingShowAggregationMenu": false,
                "enableHiding": false,
                //"suppressRemoveSort": true,
                "groupingShowGroupingMenu": false,
                "enablePinning": false
            };
        }

        function getGridConfig(conf, scope, cellClassFunction, cellEditableConditionFunction) {
            var finalObject = _.extend(new getDefaultGridConfigObject(), conf);

            if (finalObject.isVisible != undefined) {
                finalObject.visible = formWidgetUtils.convertAndGetValue(finalObject.isVisible, scope, finalObject);
            }

            finalObject.enableCellEdit = true;

            if (finalObject.isReadOnly != undefined) {
                finalObject.enableCellEdit = !formWidgetUtils.convertAndGetValue(finalObject.isReadOnly, scope, finalObject);
            }

            if (finalObject.isFixed) {
                if (finalObject.isFixed == "Left")
                    finalObject.pinnedLeft = true;
                if (finalObject.isFixed == "Right")
                    finalObject.pinnedRight = true;
            }
            if (finalObject.isGrouped) {
                finalObject.grouping = {
                    "groupPriority": 0
                }
                //finalObject.sort = {
                //    "priority": 0,
                //    "direction": "asc"
                //}
            }
            if (finalObject.aggregation) {
                finalObject.treeAggregationType = uiGridGroupingConstants.aggregation.SUM;
            }

            finalObject.displayKey = finalObject.displayName;
            if (finalObject.isMandatory) {
                finalObject.displayName = $filter('translate')(finalObject.displayName) + " *";
            } else {
                finalObject.displayName = $filter('translate')(finalObject.displayName);
            }


            if (finalObject.type) {
                switch (finalObject.type) {
                    case "popup":
                        finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "cellTemplate");
                        finalObject.editableCellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "editableCellTemplate");
                        break;
                    case "editable":
                        if (finalObject.attributes && finalObject.attributes.type == "date") {
                            finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "cellTemplate");
                            finalObject.editableCellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "editableCellTemplate");
                        }
                        if (finalObject.attributes && finalObject.attributes.type == "autocomplete") {
                            finalObject.editableCellTemplate = cellTemplateProvider.getCellTemplate(finalObject);
                        }
                        if (finalObject.attributes && finalObject.attributes.type == "number") {
                            finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "cellTemplate");
                            finalObject.editableCellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "editableCellTemplate");
                        }
                        break;
                    case "dropdown":
                        if (!finalObject.attributes.idKey) {
                            finalObject.attributes.idKey = 'id'
                        }
                        finalObject.editableCellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "editableCellTemplate");
                        finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "cellTemplate");
                        break;
                    case "calculated":
                        finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject);
                        if (finalObject.enableCellEdit) finalObject.enableCellEdit = false;
                        break;
                    case "checkbox":
                        finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "cellTemplate");
                        break;
                };
                //if (finalObject.editableCellTemplate) {
                //finalObject.enableCellEdit = true;
                //};
            }

            finalObject.cellClass = cellClassFunction;
            finalObject.cellEditableCondition = cellEditableConditionFunction;

            if (finalObject.hasOwnProperty('filterObject')) {
                finalObject.enableFiltering = finalObject.filterObject.enableFiltering;
                if (finalObject.enableFiltering) {
                    finalObject.filter = {
                        placeholder: "Search"
                    }
                    if (finalObject.filterObject.hasOwnProperty('filterKeys')) {
                        finalObject.filter.condition = function (searchTerm, cellValue, row, col) {
                            var result = false;
                            if (typeof finalObject.filterObject.filterKeys != 'object' || typeof cellValue != 'object' || (typeof finalObject.filterObject.filterKeys == 'object' && finalObject.filterObject.filterKeys.length == 0)) {
                                result = true;
                            }
                            for (var key in cellValue) {
                                if (finalObject.filterObject.filterKeys.indexOf(key) > -1) {
                                    if (typeof cellValue[key] == 'string' && cellValue[key].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                                        result = true;
                                    }
                                }
                            }

                            var cellConditionResult = true;
                            try {
                                cellConditionResult = eval(finalObject.filterObject.cellCondition);
                            }
                            catch (e) { }

                            return result && cellConditionResult;
                        };
                    }
                    else if (finalObject.filterObject.isDate) {
                        finalObject.filter.condition = function (searchTerm, cellValue, row, col) {
                            var result = false;
                            if (searchTerm == undefined || searchTerm == null || (angular.isDefined(searchTerm) && searchTerm.trim() == "")) {
                                result = true;
                            }
                            if (angular.isDefined(searchTerm) && (cellValue == undefined || cellValue == null)) {
                                result = false;
                            }
                            if (angular.isDefined(searchTerm) && angular.isDefined(cellValue)) {
                                var formattedDate = (cellValue).replace(new RegExp("/", "ig"), '');
                                formattedDate = formattedDate.split('+');
                                formattedDate = eval('new ' + formattedDate[0] + (formattedDate.length > 1 ? ')' : ''));
                                var month = formattedDate.getMonth() + 1 + '';
                                if (month.length === 1) {
                                    month = 0 + '' + month;
                                }
                                formattedDate = formattedDate.getDate() + '/' + month + '/' + formattedDate.getFullYear();
                                result = formattedDate.toLowerCase().trim().indexOf(escape(searchTerm).replace(/%5C/g, '').trim()) > -1;

                                var cellConditionResult = true;
                                try {
                                    cellConditionResult = eval(finalObject.filterObject.cellCondition);
                                }
                                catch (e) { }

                                return result && cellConditionResult;
                            }
                        };
                    }
                    else if (finalObject.filterObject.hasOwnProperty('cellCondition')) {
                        finalObject.filter.condition = function (searchTerm, cellValue, row, col) {
                            var result = false;
                            if (cellValue && cellValue.toLocaleLowerCase().indexOf(searchTerm) > -1) {
                                result = true;
                            }
                            else {
                                result = false;
                            }
                            var cellConditionResult = true;
                            try {
                                cellConditionResult = eval(finalObject.filterObject.cellCondition);
                            }
                            catch (e) { }
                            return result && cellConditionResult;
                        };
                    }
                }
            }
            else {
                finalObject.enableFiltering = false;
            }

            finalObject.uiType = finalObject.type;
            delete finalObject.type;

            return finalObject;
        }

        this.getMassagedGirdConfig = function (confArr, scope, cellClassFunction, cellEditableConditionFunction) {
            var massagedConf = [];
            _.each(confArr, function (conf) {
                massagedConf.push(getGridConfig(conf, scope, cellClassFunction, cellEditableConditionFunction));
            });
            return massagedConf;
        }

        this.eavluateScopeBindedExpressions = function (val, scope, obj) {
            return formWidgetUtils.convertAndGetValue(val, scope, obj)
        }
    }]);
})();

(function () {
    'use strict';
    angular.module('SMART2').service('httpService', ['$http', '$q', 'APPCONSTANTS', function ($http, $q, APPCONSTANTS) {
        delete $http.defaults.headers.common['X-Requested-With'];

        var httpService = this;
        var pendingRequests = [];
        httpService.isNetworkOnline = true;

        /*
         * Lister network change
         */
        // window.on('networkChange', function(e) {
        // httpService.isNetworkOnline = e.online;
        // if(!e.online) {
        // httpService.abortAll(true);
        // }
        // });

        /*
         * Massage result data
         * This is required because sometimes if a service fails, the same is notified in success callback
         */
        httpService.massageResultData = function (data) {
            data.success = true;
            if (data.config.timeout && angular.isDefined(data.config.timeout.status)) {
                data.status = data.config.timeout.status;     //  timeout can be either actual service timeout or request abort
                data.statusText = data.config.timeout.statusText;
                data.success = false;
            }
            else if ([200, 201, 202, 203].indexOf(data.status) == -1) {
                data.statusText = 'An error occured while fetching data.';
                data.success = false;
            }
            return data;
        };


        /*
         *  Abort all pending requests
         *  Services added to 'excludeServices' array will be skipped (will not be aborted)
         */
        httpService.abortAll = function (isNetworkLost) {
            angular.forEach(pendingRequests, function (pendingRequest) {
                pendingRequest.canceller.promise.status = isNetworkLost ? 0 : 499;
                pendingRequest.canceller.promise.statusText = isNetworkLost ? 'The Internet connection appears to be offline.' : 'Request cancelled.';
                pendingRequest.canceller.resolve();
            });
            pendingRequests = [];
        };


        /*
         *  Abort request
         */
        httpService.abort = function (urlfordata) {
            if (!urlfordata) {
                return;
            }
            var requestToAbort = undefined;
            requestToAbort = _.findWhere(pendingRequests, function () {
                return pendingRequest.url == urlfordata.url && angular.equals(pendingRequest.requestArgs, (urlfordata.params ? urlfordata.params : (urlfordata.data ? urlfordata.data : {})));
            });
            requestToAbort.canceller.promise.status = 499;
            requestToAbort.canceller.promise.statusText = 'Request cancelled.';
            requestToAbort.canceller.resolve();
            pendingRequests = _.filter(pendingRequests, function (pendingRequest) {
                return pendingRequest.url != urlfordata.url && !angular.equals(pendingRequest.requestArgs, (urlfordata.params ? urlfordata.params : (urlfordata.data ? urlfordata.data : {})));
            });
        };


        /*
         * Get data from service
         */
        httpService.directhttp = function (urlfordata) {
            var returnpromise = $q.defer();

            var responseURL = 'Result';
            var requestPromise, canceller = $q.defer();

            /*
             *  If you don't want a service to be aborted on abortAll(), 
             *  pass a parameter named 'abortable' and set the value to false.
             *  abort() can still be used to abort the same service.
             */
            var abortable = angular.isDefined(urlfordata.abortable) && urlfordata.abortable == false ? false : true;
            /*
             * Service timeout
             */
            var requestTimeout = setTimeout(function () {
                canceller.promise.status = 408;
                canceller.promise.statusText = 'Request timed out.';
                canceller.resolve();
            }, 30000);

            if (abortable) {
                pendingRequests.push({
                    url: urlfordata.url,
                    requestArgs: urlfordata.params || urlfordata.data,
                    canceller: canceller
                });
            }

            var reqParams = {
                url: urlfordata.url,
                method: urlfordata.method ? urlfordata.method.toUpperCase() : "POST",
                cache: false,
                timeout: canceller.promise,
                headers: {
                    "Content-Type": "application/json",
                    "UserExecutionContext": JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails)
                }
            };

            angular.merge(reqParams, urlfordata);

            requestPromise = $http(reqParams).then(function (result) {
                result = httpService.massageResultData(result);
                if (result.success) {
                    returnpromise.resolve(result.data);
                }
                else {
                    returnpromise.reject(result);
                }
            }, function (errorData) {
                errorData = httpService.massageResultData(errorData);
                returnpromise.reject(errorData);
            });


            /*
             *  Once a request has failed or succeeded, remove it from the pending list
             */
            requestPromise.finally(function () {
                clearTimeout(requestTimeout);
                if (abortable) {
                    pendingRequests = _.filter(pendingRequests, function (pendingRequest) {
                        return pendingRequest.url != urlfordata.url && !angular.equals(pendingRequest.requestArgs, ((urlfordata.params ? urlfordata.params : (urlfordata.data ? urlfordata.data : {}))));
                    });
                }
            });

            return returnpromise.promise;
        };
    }]);
})();
(function() {
    'use strict';
    angular.module('SMART2').service('NoolsEngine', [function () {
        this.execute = function (config) {
            var arrFields = [];
            var arrErrors = [];
            var headerOrGridConfig = config.uiConfig;
            var dataModel = config.dataModel;
            var ruleType = config.type;
            var rulesObj = config.rules;
            var scope = config.scope;

            if (ruleType == 'grid') {
                _.each(headerOrGridConfig[0].cloumnDefs, function (def) {
                    arrFields.push({
                        field: def.field,
                        type: def.type
                    });
                });
            }
            else if (ruleType == 'header') {
                _.each(headerOrGridConfig.sections, function (section) {
                    _.each(section.rows[0].properties, function (def) {
                        arrFields.push({
                            field: def.data,
                            type: def.type,
                            attributes: def.attributes
                        });
                    });
                });
            }

            var flow = nools.compile(rulesObj, { name: 'totalErrors' });
            var Message = flow.getDefined("message");

            if (ruleType == 'grid') {
                dataModel = dataModel.orderData.items[0];
            }
            else {
                dataModel = dataModel;
            }

            _.each(arrFields, function (man) {
                var messageModel = [new Message({
                    ui: man,
                    dataModel: dataModel,
                    scope: scope
                })];

                var session = flow.getSession.apply(flow, messageModel).focus('empty');

                session.on("error", function (data) {
                    arrErrors.push(data.errors[0]);
                }).on('fire', function (name) { });

                session.match(function (data) {
                    session.dispose();
                    nools.deleteFlow('totalErrors');
                });
            });

            if (arrErrors.length == 0) {
                angular.isFunction(config.success) && config.success();
            }
            else {
                angular.isFunction(config.error) && config.error({
                    data: arrErrors
                });
            }

            return dataModel;
        };
    }]);
})();
(function () {
    'use strict';
    angular.module('SMART2').service('RuleEngine', [function () {
        var service = this;
        this.utils = {};

        this.setRules = function (dataConfig, dataModel, rules, nools, ruleType) {
            this.dataConfig = dataConfig;
            this.dataModel = dataModel;
            this.rules = rules;                 //  Cumulative rules
            this.nools = nools;                 //  Nools object
            this.type = angular.isDefined(ruleType) ? ruleType : 'header';
        };

        this.setUtils = function (utils) {
            this.utils = utils;
        };

        this.executeNools = function (callback, scope) {
            var failedRules = [];
            var headerOrGridConfig = this.dataConfig;
            var dataModel = this.dataModel;
            var ruleType = this.type;
            var noolsObj = this.nools;

            if (ruleType == 'grid') {
                _.each(dataModel, function (model) {
                    var virtualDatamodel = angular.copy(model);
                    var columnArr = [];
                    _.each(headerOrGridConfig[0].cloumnDefs, function (column) {
                        angular.extend(column, {
                            fieldName: column.field
                        });
                        if (column.hasOwnProperty('rules')) {
                            if (column.attributes.type == 'date') {
                                changeDateFormatForNools(column, virtualDatamodel, 'grid');
                            }
                            var messageModel = [new Message({
                                ui: angular.extend(column, {
                                    data: column.field
                                }),
                                dataModel: virtualDatamodel,
                                scope: ''
                            })];
                            columnArr.push(messageModel);
                        }
                    });
                    _.each(columnArr, function (col) {
                        var rules = col[0].ui.rules;
                        var session = flow.getSession.apply(flow, col);
                        for (var i = 0; i < rules.length; i++) {
                            session.focus("" + rules[i] + "");
                        }
                        session.on("error", function (data) {
                            if (data.errors[0].state == 'invalid') {
                                failedRules.push(data.errors[0]);
                                session.dispose();
                            }
                        });
                        session.match();
                    });
                });
            }
            else if (ruleType == 'cell') {
                headerOrGridConfig.colDef.fieldName = headerOrGridConfig.colDef.field;
                var virtualDatamodel = angular.copy(dataModel.entity);
                if (headerOrGridConfig.colDef.attributes.type == 'date') {
                    //scope consists total column defs of line tab.
                    changeDateFormatForNools(scope, virtualDatamodel, 'cell');
                }
                var messageModel = [new Message({
                    ui: headerOrGridConfig.colDef,
                    dataModel: virtualDatamodel,
                    scope: ''
                })];
                var session = flow.getSession.apply(flow, messageModel);
                var rules = headerOrGridConfig.colDef.rules;
                for (var i = 0; i < rules.length; i++) {
                    session.focus("" + rules[i] + "");
                }
                session.on("error", function (data) {
                    failedRules.push(data.errors[0]);
                    session.dispose();
                });

                session.match();
            }

            angular.isFunction(callback) && callback({
                success: failedRules.length == 0,
                failedRules: failedRules
            });
        };

        function changeDateFormatForNools(colDefs, virtualDatamodel, type) {
            if (colDefs != '' && type == 'cell') {
                _.each(colDefs.cloumnDefs, function (colDef) {
                    if (colDef.attributes.type == 'date') {
                        var field = colDef.field;
                        var dateVar = eval('virtualDatamodel.' + field);
                        virtualDatamodel[field] = convertDate(dateVar);
                    }
                });
            }
            else if (colDefs != '' && type == 'grid') {
                var field = colDefs.field;
                var dateVar = eval('virtualDatamodel.' + field);
                virtualDatamodel[field] = convertDate(dateVar);
            }
        }
        function convertDate(dateVar) {
            if (typeof dateVar != 'undefined' && dateVar != null && isNaN(dateVar) && dateVar.indexOf('/Date(') > -1) {
                var res = dateVar.replace("/Date(", "");
                var datestring = res.replace(")/", "");
                var newdate = new Date(parseInt(datestring));
                return new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() + 1);
            }
            else if (typeof dateVar != 'undefined' && dateVar != null && !isNaN(dateVar)) {
                var newdate = new Date(parseInt(dateVar));
                return new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() + 1);
            }
        }

        this.isValid = function (rule, callback) {
            var messageModel = [new Header({
                ui: '',
                dataModel: this.dataModel,
                scope: '',
                utils: this.utils
            })];
            var session = headerFlow.getSession.apply(headerFlow, messageModel).focus(rule);
            session.on("error", function (data) {
                angular.isFunction(callback) && callback({
                    success: false,
                    errorData: data.errors[0]
                });
                session.dispose();
            });
            session.match();
        };

        this.execute = function (callback, currentScope) {
            if (angular.isDefined(this.type) && this.type != 'header') {
                this.executeNools(callback, currentScope);
                return;
            }

            //  Inline validations
            var isValid = true;
            var tmpPropertyValue;
            var failedRules = [];

            /*
             * Inline validation
             */
            for (var i = 0; i < this.dataConfig.length; i++) {
                if (this.dataConfig[i].isHidden) {
                    continue;
                }
                for (var j = 0; j < this.dataConfig[i].rows.length; j++) {
                    for (var k = 0; k < this.dataConfig[i].rows[j].properties.length; k++) {
                        if (this.dataConfig[i].rows[j].properties[k].isHidden) {
                            continue;
                        }

                        //skip rules, when readonly
                        if (Object(this.dataConfig[i].rows[j].properties[k]).hasOwnProperty('attributes')) {
                            if (this.dataConfig[i].rows[j].properties[k].attributes.readonly) {
                                continue;
                            }
                        }

                        tmpPropertyValue = undefined;

                        if (this.dataConfig[i].rows[j].properties[k].attributes && this.dataConfig[i].rows[j].properties[k].attributes.hasOwnProperty('ngModelOptions') && this.dataConfig[i].rows[j].properties[k].attributes.ngModelOptions.getterSetter) {
                            tmpPropertyValue = eval('currentScope.' + this.dataConfig[i].rows[j].properties[k].data + '()');
                        }
                        else {
                            try {
                                tmpPropertyValue = eval('this.dataModel.' + this.dataConfig[i].rows[j].properties[k].data);
                            }
                            catch (e) { }
                        }

                        /*
                         * Mandatory rule
                         */
                        var isValidated = false;
                        if (Object(this.dataConfig[i].rows[j].properties[k]).hasOwnProperty('attributes')) {
                            if (Object(this.dataConfig[i].rows[j].properties[k].attributes).hasOwnProperty('type') && this.dataConfig[i].rows[j].properties[k].attributes.type == 'number') {
                                isValidated = true;
                                if (this.dataConfig[i].rows[j].properties[k].isMandatory && isNaN(tmpPropertyValue) || (!this.dataConfig[i].rows[j].properties[k].isMandatory && tmpPropertyValue == undefined)) {
                                    this.dataConfig[i].rows[j].properties[k].validate = true;
                                    failedRules.push({
                                        type: 'required',
                                        uiConfig: this.dataConfig[i].rows[j].properties[k],
                                        rule: "isNaN(this)",
                                        error: "This field should be a number"
                                    });
                                }
                            }
                        }
                        else if (Object(this.dataConfig[i].rows[j].properties[k].attributes).hasOwnProperty('type') && this.dataConfig[i].rows[j].properties[k].attributes.type == 'autocomplete') {
                            isValidated = true;
                            if (this.dataConfig[i].rows[j].properties[k].isMandatory && (scope.ngModel + '' == '' || scope.ngModel == null || scope.ngModel == undefined)) {
                                this.dataConfig[i].rows[j].properties[k].validate = true;
                                failedRules.push({
                                    type: 'required',
                                    uiConfig: this.dataConfig[i].rows[j].properties[k],
                                    rule: "this == ''",
                                    error: "This field should not be blank"
                                });
                            }
                        }

                        if (!isValidated && this.dataConfig[i].rows[j].properties[k].type != 'subsection' && this.dataConfig[i].rows[j].properties[k].type != 'checkbox' && this.dataConfig[i].rows[j].properties[k].type != 'switch' && this.dataConfig[i].rows[j].properties[k].isMandatory && (tmpPropertyValue == '' || tmpPropertyValue == undefined || tmpPropertyValue == null)) {
                            this.dataConfig[i].rows[j].properties[k].validate = true;
                            failedRules.push({
                                type: 'required',
                                uiConfig: this.dataConfig[i].rows[j].properties[k],
                                rule: "this == ''",
                                error: "This field should not be blank"
                            });
                        }

                        /*
                         * Inline rules
                         */
                        if (Object(this.dataConfig[i].rows[j].properties[k]).hasOwnProperty('rules')) {
                            if (this.dataConfig[i].rows[j].properties[k].rules) {
                                for (var l = 0; l < this.dataConfig[i].rows[j].properties[k].rules.length; l++) {
                                    if (typeof this.dataConfig[i].rows[j].properties[k].rules[l] != 'string') {
                                        if (eval((this.dataConfig[i].rows[j].properties[k].rules[l].rule).replace(/this/g, 'tmpPropertyValue'))) {
                                            this.dataConfig[i].rows[j].properties[k].validate = true;
                                            failedRules.push({
                                                type: 'inline',
                                                uiConfig: this.dataConfig[i].rows[j].properties[k],
                                                rule: this.dataConfig[i].rows[j].properties[k].rules[l].rule,
                                                error: this.dataConfig[i].rows[j].properties[k].rules[l].error
                                            });
                                        }
                                    }
                                    else if (angular.isDefined(this.nools)) {
                                        var messageModel = [new Header({
                                            ui: this.dataConfig[i].rows[j].properties[k],
                                            dataModel: this.dataModel,
                                            scope: currentScope,
                                            utils: this.utils
                                        })];

                                        var session = headerFlow.getSession.apply(headerFlow, messageModel).focus(this.dataConfig[i].rows[j].properties[k].rules[l]);

                                        session.on("error", function (data) {
                                            data.ui.validate = true;
                                            failedRules.push(data.errors[0]);
                                            session.dispose();
                                        });

                                        session.match();
                                    }
                                }
                            }
                        }
                    }
                }
            }

            /*
             *  Cumulative validations  
             */
            if (this.rules) {
                for (var i = 0; i < this.rules.length; i++) {
                    if (typeof this.rules[i] != 'string' && eval((this.rules[i].rule).replace(/this/g, 'this.dataModel'))) {
                        failedRules.push({
                            type: 'cumulative',
                            rule: this.rules[i].rule,
                            error: this.rules[i].error
                        });
                    }
                    else if (angular.isDefined(this.nools)) {
                        var messageModel = [new Header({
                            ui: {},
                            dataModel: this.dataModel,
                            scope: currentScope,
                            utils: this.utils
                        })];

                        var session = headerFlow.getSession.apply(headerFlow, messageModel).focus(this.rules[i]);

                        session.on("error", function (data) {
                            failedRules.push(data.errors[0]);
                            session.dispose();
                        });

                        session.match();
                    }
                }
            }

            if (failedRules.length > 0 && (failedRules[0].hasOwnProperty('uiConfig') || (failedRules[0].hasOwnProperty('property') && failedRules[0].property != ''))) {
                typeof failedRules[0].uiConfig != 'undefined' ? failedRules[0].uiConfig.focus = true : failedRules[0].property.focus = true;
            }

            angular.isFunction(callback) && callback({
                success: failedRules.length == 0,
                failedRules: failedRules
            });
        };


        this.executeOnStaticForm = function (callback) {
            var isValid = true;
            var failedRules = [];

            for (var key in this.dataConfig) {
                for (var i = 0; i < this.dataConfig[key].rules.length; i++) {
                    if (eval(this.dataConfig[key].rules[i].rule.replace(/this/g, 'this.dataModel.' + key))) {
                        failedRules.push({
                            type: 'inline',
                            rule: this.dataConfig[key].rules[i].rule,
                            error: this.dataConfig[key].rules[i].error
                        });
                        this.dataConfig[key].validate = true;
                        if (failedRules.length == 1) {
                            this.dataConfig[key].focus = true;
                        }
                        isValid = false;
                    }
                }
            }

            /*
             *  Cumulative validations  
             */
            if (this.rules) {
                for (var i = 0; i < this.rules.length; i++) {
                    if (eval((this.rules[i].rule).replace(/this/g, 'this.dataModel'))) {
                        failedRules.push({
                            type: 'cumulative',
                            rule: this.rules[i].rule,
                            error: this.rules[i].error
                        });
                        isValid = false;
                    }
                }
            }

            if (angular.isFunction(callback)) {
                callback({
                    success: isValid,
                    data: failedRules
                });
            }
        };
    }]);
})();
(function () {
    'use strict';

    angular.module('SMART2').service('ScrollTo', [function () {
        var scrollingTopMargin = 0;
        this.setScrollingTopMargin = function (_scrollingTopMargin) {
            scrollingTopMargin = _scrollingTopMargin;
        }
        this.perform = function (source, destination, onComplete) {
            try {
                angular.element('body,html').animate({
                    scrollTop: (source.offset().top - destination.offset().top) + scrollingTopMargin,

                }, 400, function () {
                    if (typeof onComplete != "undefined") {
                        onComplete();
                    }
                });
            } catch (e) { }
        };
    }]);
})();