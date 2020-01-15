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
                if (config.field && config.field != 'IsCloseForReceiving' && config.field != 'IsCloseForInvoicing') {
                    return '<div ng-class="{\'text-strikethrough\': row.entity.ItemStatus.id===121}"><div ng-if="!row.groupHeader" >{{' + config.attributes.rule + '|  minPrecisionHandler:' + config.attributes.minmaxprecisionfilter + '}}</div></div>';
                }
                else {
                    return '<div ng-class="{\'text-strikethrough\': row.entity.ItemStatus.id===121}"><div ng-if="!row.groupHeader" >{{' + config.attributes.rule + '}}</div></div>';
                }
            }
            else if (config.type == 'editable') {

                if (config.attributes && config.attributes.type && config.attributes.type == "number") {
                    if (templateType == "cellTemplate") {
                        return '<div ng-class="{\'text-strikethrough\': row.entity.ItemStatus.id===121, \'ui-grid-cell-contents right-align paddingRight5\': true}" ng-style="{color: COL_FIELD === \'\' || COL_FIELD == undefined || COL_FIELD == null ? \'transparent\' : \'\'}" title="{{COL_FIELD}}">{{COL_FIELD === \'\' || COL_FIELD == undefined || COL_FIELD == null ? \'-\' : row.entity.' + (config.data != undefined ? config.data : config.field) + '}}</div>'
                    }
                    else if (templateType == "editableCellTemplate") {
                        //var min = "";
                        //min = config.attributes.minValue ? 'min="' + config.attributes.minValue + '"' : "";
                        var minimumPrecision = "";
                        if (config.attributes.minmaxprecision != undefined)
                            minimumPrecision = 'minmaxprecision="' + config.attributes.minmaxprecision + '"';
                        var maxlength = "";
                        if (config.attributes.maxlength != undefined)
                            maxlength = 'maxlength="' + config.attributes.maxlength + '"';

                        return '<div title="{{COL_FIELD }}"><div><smart-textfield  class="ui-grid-cell-contents" type="number" focus="true" ' + minimumPrecision + ' ng-model="row.entity.' + config.field + '" ' + maxlength + ' on-key-up="grid.appScope.textOrNumberKeyUp($event,col,row)" zero-case-handler uigrid-compatible></smart-textfield></div></div>';
                    }
                }
                else if (config.attributes && config.attributes.type && config.attributes.type == "autocomplete") {
                    if (templateType == "cellTemplate") {
                        return '<div ng-class="{\'text-strikethrough\': row.entity.ItemStatus.id===121, \'padding0\': true}" ng-style="{color: COL_FIELD === \'\' || COL_FIELD == undefined || COL_FIELD == null ? \'transparent\' : \'\'}" title="{{COL_FIELD}}">{{COL_FIELD === \'\' || COL_FIELD == undefined || COL_FIELD == null ? \'-\' : COL_FIELD}}</div>';
                    }
                    else if (templateType == "editableCellTemplate") {
                        return '<div class="padding0" title="{{COL_FIELD}}"><div><smart-textfield class="ui-grid-cell-contents" type="autocomplete" width="230px" ' +
                    ' displayformat="' + config.attributes.displayformat + '" optionformat="' + config.attributes.optionformat + '" filterkeys="' + ("['" + config.attributes.filterkeys.join("','") + "']") +
                    '" ng-model="row.entity.' + config.attributes.model + '" options="grid.appScope.autoSuggestOptions"  on-change="grid.appScope.autoSuggestOnChange($event,col,row)" on-select="grid.appScope.autoSuggestOnSelect($event,row.entity.' + config.attributes.model + ',row,col)" uigrid-compatible></smart-textfield></div></div>';
                    }
                }
                else if (config.attributes && config.attributes.type && config.attributes.type == "date") {
                    if (templateType == "cellTemplate") {
                        return "<div  ng-class='{\"text-strikethrough\": row.entity.ItemStatus.id===121}' ng-style='{color: COL_FIELD === \"\" || COL_FIELD == undefined || COL_FIELD == null ? \"transparent\" : \"\", height: \"100%\"}'>{{COL_FIELD === \'\' || COL_FIELD == undefined || COL_FIELD == null ? \'-\' : (COL_FIELD | smartDateFormat:'" + config.attributes.format + "')}}</div>";
                    } else if (templateType == "editableCellTemplate") {
                        return '<div grid-date-template-provider></div>'
                    }
                }
                var maxlength = "";
                if (config.attributes.maxlength != undefined)
                    maxlength = 'maxlength="' + config.attributes.maxlength + '"';
                if (templateType == "cellTemplate") {
                    return '<div ng-class="{\'text-strikethrough\': row.entity.ItemStatus.id===121, \'padding0\': true}" ng-style="{color: COL_FIELD === \'\' || COL_FIELD == undefined || COL_FIELD == null ? \'transparent\' : \'\'}" title="{{COL_FIELD | translate}}">{{COL_FIELD === \'\' || COL_FIELD == undefined || COL_FIELD == null ? \'-\' : (row.entity.' + (config.data != undefined ? config.data : config.field) + ' | translate)}}</div>';
                } else if (templateType == "editableCellTemplate") {
                    return '<div title="{{COL_FIELD}}"><div><smart-textfield class="ui-grid-cell-contents" type="text"' +
                                        ' ng-model="row.entity.' + config.field + '" ' + maxlength + ' on-key-up="grid.appScope.textOrNumberKeyUp($event,col,row)" uigrid-compatible></smart-textfield></div></div>';
                }

            } else if (config.type == 'dropdown') {
                config.attributes.options.map(function (x) { x[config.attributes.datakey] = $filter('translate')(x[config.attributes.datakey]) });
                if (templateType == "cellTemplate") {
                    return "<div ng-class='{\"text-strikethrough\": row.entity.ItemStatus.id===121}'><div ng-if='grid.appScope.isObject(COL_FIELD)' style='height:100%;' uigrid-compatible>{{COL_FIELD." + config.attributes.dataKey + " | translate}}</div><div ng-if='!grid.appScope.isObject(COL_FIELD)' IDK={{" + config.attributes.idKey + "}} style='height:100%;' uigrid-compatible>{{COL_FIELD | translate}}</div></div>";
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

                var defaultLabel = "\"" + config.attributes.defaultTitle + "\"";
                if (typeof config.attributes.defaultLabelCondition != "undefined") {
                    var defaultLabel = config.attributes.defaultLabelCondition;
                }


                if (templateType == "cellTemplate") {
                    if (config.attributes.type === 'categoryPopup')
                        return '<div title = "{{COL_FIELD}}" class="ui-grid-cell-contents padding0"><a ng-if="!row.groupHeader" ng-class="{\'waves-effect waves-light btn-flat\': true, \'disabled\': row.entity.source.id!==1,\'text-strikethrough\': row.entity.ItemStatus.id===121}">{{(COL_FIELD != undefined && (COL_FIELD != "") && (COL_FIELD != "1")) ?' + displayLabel + ' : ' + defaultLabel + '}}</a></div>';
                    else
                        return '<div title = "{{COL_FIELD}}" class="ui-grid-cell-contents padding0"><a ng-if="!row.groupHeader" ng-class="{\'waves-effect waves-light btn-flat\': true, \'disabled\': ' + !config.enableCellEdit + ',\'text-strikethrough\': row.entity.ItemStatus.id===121}">{{(COL_FIELD != undefined && (COL_FIELD != "") && (COL_FIELD != "1")) ?' + displayLabel + ' : ' + defaultLabel + '}}</a></div>';


                }
                else if (templateType == "editableCellTemplate") {
                    return '<div title="{{COL_FIELD}}"><smart-button flat="true"  config=\'{"title": (row.entity.' + config.field + ' != undefined && row.entity.' + config.field + ' != "1" && row.entity.' + config.field + ' != "")?' + displayLabel + ' : ' + defaultLabel + ' }\' on-click="grid.appScope.popUpButtonClickCallback(row,col)" uigrid-compatible></smart-button></div>';
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
                        $rootScope.$broadcast("closedPopup");
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
            var outputDate;
            try {
                if (input) {
                    var b = Common.convertServerDateTimeToNormalDateTime(input);
                    if (!_.contains(format.split(' '), 'hh:mm')) {
                        b = new Date(b.getFullYear(), b.getMonth(), b.getDate());
                    }
                    outputDate = $filter('date')(b, format); //, timezone)
                } else {
                    outputDate = "";
                }
            }
            catch (e) {
                outputDate = input;
            }
            return outputDate;
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
            if (typeof RegionalSettingEnable !="undefined" && RegionalSettingEnable) {
                var currencySymbol = '';

                if (!isNaN(input)) {
                    var value = input;
                    try {
                        var temp = $("<input>");
                        var _decimals;
                        var decimalLength;
                        var tempValue;

                        var minPrecessionValue = decimals != undefined ? decimals : (MinPrecessionValue ? MinPrecessionValue : 2);

                        var maxPrecessionValue = maxDecimals != undefined ? maxDecimals : (MaxPrecessionValue ? MaxPrecessionValue : 4);

                        minPrecessionValue = parseInt(minPrecessionValue);

                        maxPrecessionValue = parseInt(maxPrecessionValue);

                        if (minPrecessionValue > maxPrecessionValue) {
                            maxPrecessionValue = minPrecessionValue;
                        }                        
                        //tempValue = Math.round(value * Math.pow(10, maxPrecessionValue)) / Math.pow(10, maxPrecessionValue);

                        var d = maxPrecessionValue || 0;
                        var m = Math.pow(10, d);
                        var n = +(d ? value * m : value); // Avoid rounding errors
                        var i = Math.floor(n), f = n - i;
                        var r = (f == 0.5) ? ((i % 2 == 0) ? i : i + 1) : Math.round(n);
                        tempValue = d ? r / m : r;

                        if (Number.isInteger(tempValue)) {
                            decimalLength = minPrecessionValue;
                        }
                        else if (Number.isNaN(tempValue)) {
                            throw "Value cannot change to number."
                        }
                        else {
                            decimalLength = tempValue.toString().split('.')[1].length;
                        }

                        if (decimalLength <= minPrecessionValue) {
                            _decimals = minPrecessionValue
                        }
                        else if (decimalLength >= maxPrecessionValue) {
                            _decimals = maxPrecessionValue;
                        }
                        else {
                            _decimals = decimalLength;
                        }

                        temp.autoNumeric('init', {
                            mDec: _decimals,
                            aPad: true
                        });

                        temp.autoNumeric('set', tempValue);

                        var newValue = temp.val();

                        return currencySymbol + newValue;
                    }
                    catch (error) {
                        console.log(error);

                        console.log("error happend at numberformat filter. value : (" + value + ") minPrecessionValue : " + minPrecessionValue + " maxPrecessionValue : " + maxPrecessionValue);

                        return currencySymbol + value;
                    }
                }
                else {
                    return currencySymbol + input;
                }
            } else {
                if (input != undefined) {
                    if (input == 0)
                        return $filter('number')(0, decimals);
                    if (input != 0) {
                        postDecimalNumbers = ((input + "").split(".")[1] != undefined) ? (input + "").split(".")[1].length : 0;
                        if (postDecimalNumbers > maxDecimals) {
                            var d = maxDecimals || 0;
                            var m = Math.pow(10, d);
                            var n = +(d ? input * m : input); // Avoid rounding errors
                            var i = Math.floor(n), f = n - i;
                            var r = (f == 0.5) ? ((i % 2 == 0) ? i : i + 1) : Math.round(n);
                            var output = d ? r / m : r;                          
                            var postDecimalOtp = ((output + "").split(".")[1] != undefined) ? (output + "").split(".")[1].length : 0;
                            if (postDecimalOtp < decimals)
                                return $filter('number')(output, decimals);
                            return $filter('addCommasToNumbers')(output);
                        } else if (postDecimalNumbers > decimals && postDecimalNumbers < maxDecimals) {
                            return $filter('addCommasToNumbers')(input);
                        }
                        else if (postDecimalNumbers <= decimals)
                            return $filter('number')(input, decimals);
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
        }
    }]);
    angular.module('SMART2').service('SmartToast', [function () {
        this.show = function (config) {
            Materialize.toast(config.message, config.duration ? config.duration : 500);
        };
    }]);

    angular.module('SMART2').filter('addCommasToNumbers', ['$filter', function ($filter) {
        return function (input) {
            var postDecimalNumbers = ((input + "").split(".")[1] != undefined) ? (input + "").split(".")[1] : 0;
            var preDecimalNubmers =  ((input + "").split(".")[0] != undefined) ? (input + "").split(".")[0] : 0;
            preDecimalNubmers = $filter('number')(preDecimalNubmers);
            return  preDecimalNubmers + "." +  postDecimalNumbers;

        }
    }]);


    angular.module('SMART2').service('smartPaginate', [function () {
        var lineItems=[];
        var pageSize = 10;
        var smartTableInstance;

        var _setLineItems = function (tmpLineItems) {
            lineItems = tmpLineItems;
        };

        var _getLineItems = function (pageIndex, pageSize) {
            return lineItems.slice(pageIndex, pageSize);
        };

        var _setSmartTableInstance = function (instance) {
            smartTableInstance = instance;
        };

        var _getSmartTableInstance = function () {
            return smartTableInstance;
        };

        var _getAllLineItems = function () {
            return lineItems;
        };

        var _getLineItemsCount = function () {
            return lineItems.length;
        };

        var _getLineItemsPagesCount = function () {
            return Math.ceil(lineItems.length / pageSize) - 1;
        };

        return {
            externalPaginationThreshold: 300,
            setLineItems: _setLineItems,
            getLineItems: _getLineItems,
            getAllLineItems: _getAllLineItems,
            getLineItemsCount: _getLineItemsCount,
            getLineItemsPagesCount: _getLineItemsPagesCount,
            setSmartTableInstance: _setSmartTableInstance,
            getSmartTableInstance: _getSmartTableInstance


        }
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
    angular.module('SMART2').service('$focusOnField', [function () {
        return function (fields) {
            if (fields) {
                var field = $(fields);
            if (field.attr('type') == "checkbox" || field.attr('type') == "radio") {
                field.focus().addClass('tabbed');
            } else {
                field.focus()
            }
            }
        };
}])
})();

(function () {
    'use strict';

    angular.module('SMART2').service('formWidgetUtils', [function () {
        var _this = this;

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
                var str = '',
                    tLen = arrEvents.length;
                for (var i = 0; i < tLen; i++) {
                    var tObj = arrEvents[i];
                    if (tObj.listener) {
                        str = str + ' ' + tObj.type + '="' + tObj.listener + '"';
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
                var arrIndexesToBeDeleted = [],
                    tLen = params.length;
                for (var i = 0; i < tLen; i++) {
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
                var deleteLength = arrIndexesToBeDeleted.length;
                for (var i = 0; i < deleteLength; i++) {
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
                        case 'modelOptions':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'model-options', '=', scope, isSection);
                            break;
                        //case 'focus':
                        //case 'validate':
                        //    str += this.convertAndGetAttributeMapping(attributeType, key, key, '=', scope, isSection);
                        //    break;
                        case 'rules':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'rules', '@', scope, isSection);
                            break;
                        case 'errorModel':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'error-model', '=', scope, isSection);
                            break;
                        case 'clienterror':
                            str += this.convertAndGetAttributeMapping(attributeType, key, 'clienterror', '=', scope, isSection);
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
                            var attrList = [];
                            if (scope.property.type == 'textfield') {
                                attrList = ['validate', 'focus', 'parentelement', 'errormessage', 'setfromgrid', 'align', 'datanumeric', 'spinner', 'patternreg', 'step', 'format', 'timepicker', 'isvaluedateobj', 'prefixicon', 'suffixicon', 'maxlength', 'min', 'max', 'timepicker12hour', 'minuteincrement', 'charactercounter', 'decimalprecision', 'minmaxprecision', 'placeholder', 'autocomplete', 'removable', 'datakey', 'filterkeys', 'optionformat', 'displayformat', 'width', 'minchars', 'loading', 'count', 'nosuggestionnotice', 'shownosuggestion', 'ngmodel', 'smart-character-restrict', 'showinfo', 'showwarning', 'allowpaste'];
                            }
                            else if (scope.property.type == 'select' || scope.property.type == 'dropdown') {
                                attrList = ['label', 'ngmodelcopy', 'validate', 'focus', 'parentelement', 'multiple', 'datakey', 'displaykey', 'removable', 'preview', 'customoption', 'ngmodel', 'config', 'show', 'stopprog', 'showinfo', 'showwarning'];
                            }
                            else if (scope.property.type == 'radio') {
                                attrList = ['label', 'ngmodelcopy', 'layout', 'validate', 'focus', 'parentelement', 'errormessage', 'datakey', 'optionid', 'removable', 'groupid', 'ngmodel'];
                            }
                            else if (scope.property.type == 'checkbox') {
                                attrList = ['label', 'minheight', 'fill', 'validate', 'focus', 'parentelement', 'errormessage',  'removable', 'ngmodel', 'showinfo'];
                            }
                            else if (scope.property.type == 'switch') {
                                attrList = ['label', 'rightlabel', 'leftlabel', 'validate', 'focus', 'parentelement', 'errormessage', 'removable', 'minheight', 'fill', 'ngmodel'];
                            }
                            
                            if (attrList.indexOf(key.toLowerCase()) > -1) {
                                str += ' ' + key + '="{{property.attributes.' + key + '}}" ';
                            }
                            break;
                    }
                }
            }
            return str;
        };


        /*
         *  Alternative of broadcast event
         */
        var arrEvents = [];
        var eventCounter = 0;


        /*
         *  Deregister an event or events
         */
        this.removeEventListener = function (event) {
            var eventLen = arrEvents.length;
            for (var i = 0; i < eventLen; i++) {
                var tObj = arrEvents[i];
                if (tObj.eventName == event.eventName && tObj.eventId == event.eventId) {
                    tObj.callback = null;
                    arrEvents.splice(i, 1);
                    break;
                }
            }
        };


        /*
         *  Register a listener
         */
        this.on = function (eventName, callback) {
            eventCounter++;
            arrEvents.push({
                eventName: eventName,
                callback: callback,
                eventId: 'smart-broadcast-event-' + eventCounter
            });
            var objEvent = {
                eventName: eventName,
                eventId: 'smart-broadcast-event-' + eventCounter
            };
            return function () {
                _this.removeEventListener(objEvent);
            };
        };


        /*
         *  Fire an event
         */
        this.broadcast = function (eventName, data) {
            var broadcastEvLen = arrEvents.length;
            for (var i = 0; i < broadcastEvLen; i++) {
                var tData = arrEvents[i];
                if (eventName == tData.eventName) {
                    angular.isFunction(tData.callback) && tData.callback({}, data);
                }
            }
        };



        /*
         *  Custom javascript watcher 
         */
        this.watch = function (obj, prop, callback) {
            Object.defineProperty(angular.isDefined(obj) && angular.isObject(obj) ? obj : window, prop, {
                get: function () {
                    return this['custom_watcher_' + prop];
                },
                set: function (newVal) {
                    if (!angular.equals(this['custom_watcher_' + prop], newVal)) {
                        var oldVal = this['custom_watcher_' + prop];
                        this['custom_watcher_' + prop] = newVal;
                        angular.isFunction(callback) && callback(newVal, oldVal);
                    }
                },
                enumerable: true,
                configurable: true
            });
        };


        /*
         *  Show PLEASE WAIT label
         */
        this.showPleaseWait = function () {
            angular.element('#divPleaseWait').css('display', 'table');
        };


        /*
         *  Hide PLEASE WAIT label
         */
        this.hidePleaseWait = function () {
            angular.element('#divPleaseWait').css('display', 'none');
        };
    }]);
})();
(function () {
    'use strict';

    angular.module('SMART2').service('gridConfigProvider', ['cellTemplateProvider', '$filter', 'formWidgetUtils', function (cellTemplateProvider, $filter, formWidgetUtils) {

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
                finalObject.maxWidth = 260;
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
                finalObject.treeAggregationType = 2;
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
                            if (finalObject.cellTemplate == undefined || finalObject.cellTemplate == null) {
                                finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "cellTemplate");
                            }
                            finalObject.editableCellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "editableCellTemplate");
                        }
                        if (finalObject.attributes && finalObject.attributes.type == "number") {
                            finalObject.cellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "cellTemplate");
                            finalObject.editableCellTemplate = cellTemplateProvider.getCellTemplate(finalObject, "editableCellTemplate");
                        }
                        if (finalObject.attributes && (finalObject.attributes.type == "text" || finalObject.attributes.type == undefined)) {
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
                            if (angular.isDefined(finalObject.filterObject.cellCondition)) {
                                try {
                                    cellConditionResult = eval(finalObject.filterObject.cellCondition);
                                }
                                catch (e) { }
                            }

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
        };



        function getSmartTableConfig(conf, scope, cellClassFunction, cellEditableConditionFunction) {
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
                finalObject.maxWidth = 260;
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
                finalObject.treeAggregationType = 2;
            }

            finalObject.displayKey = finalObject.displayName;
            if (finalObject.isMandatory) {
                finalObject.displayName = $filter('translate')(finalObject.displayName) + " *";
            }
            else {
                finalObject.displayName = $filter('translate')(finalObject.displayName);
            }


            if (finalObject.type) {
                switch (finalObject.type) {
                    case "dropdown":
                        if (!finalObject.attributes.idKey) {
                            finalObject.attributes.idKey = 'id'
                        }
                        break;

                    case "calculated":
                        finalObject.cellTemplate = function (row, column) {
                            if (column.colDef.field && column.colDef.field != 'IsCloseForReceiving' && column.colDef.field != 'IsCloseForInvoicing') {
                                var inputValue = 0;
                                if (column.colDef.field &&(column.colDef.field.toLowerCase() == 'subtotal' || column.colDef.field.toLowerCase() == 'total')) {
                                    function BankerevenRound(num, decimalPlaces) {
                                        var d = decimalPlaces || 0;
                                        var m = Math.pow(10, d);
                                        var n = +(d ? num * m : num); 
                                        var i = Math.floor(n), f = n - i;
                                        var r = (f == 0.5) ? ((i % 2 == 0) ? i : i + 1) : Math.round(n);
                                        return d ? r / m : r;
                                    }

                                    var unitPriceRounding = 0;
                                    var taxesRounding = 0;
                                    var shippingChargesRounding = 0;
                                    var otherChargesRounding = 0;
                                    unitPriceRounding = BankerevenRound((parseFloat(row.entity.unitPrice) * parseFloat(row.entity.quantity)), parseInt(column.colDef.attributes.minmaxprecisionfilter.split(':')[1]));
                                    taxesRounding = row.entity.taxes > 0 ? BankerevenRound(parseFloat(row.entity.taxes), parseInt(column.colDef.attributes.taxesandchargestotal)) : 0;
                                    shippingChargesRounding = row.entity.shippingCharges > 0 ? BankerevenRound(parseFloat(row.entity.shippingCharges), parseInt(column.colDef.attributes.taxesandchargestotal)) : 0;
                                    otherChargesRounding = row.entity.otherCharges > 0 ? BankerevenRound(parseFloat(row.entity.otherCharges), parseInt(column.colDef.attributes.taxesandchargestotal)) : 0;
                                    if (column.colDef.field && column.colDef.field.toLowerCase() == 'subtotal')
                                        inputValue = unitPriceRounding;
                                    else if (column.colDef.field && column.colDef.field.toLowerCase() == 'total')
                                        inputValue = unitPriceRounding + taxesRounding + shippingChargesRounding + otherChargesRounding;
                                }
                                else
                                    inputValue = eval(column.colDef.attributes.rule);
                                return $filter('minPrecisionHandler')(inputValue, column.colDef.attributes.minmaxprecisionfilter.split(':')[0], column.colDef.attributes.minmaxprecisionfilter.split(':')[1], false);
                            }
                            else {
                                return eval(column.colDef.attributes.rule);
                            }
                        };
                        finalObject.enableCellEdit = false;
                        break;

                    case 'popup':
                        switch (finalObject.attributes.type) {
                            case 'splitsPopup':
                                finalObject.cellTemplate = function (row, column) {
                                    return row.entity.splitType == 0 ? (row.entity.type.id == 1 ? $filter('translate')('P2P_Common_Quantity') : $filter('translate')('P2P_Common_Amount')) : $filter('translate')('P2P_Common_Percentage');
                                };
                                break;

                            case 'commentsAndAttachmentsPopup':
                                finalObject.cellTemplate = function (row, column) {
                                    return row.entity.notes && row.entity.notes.length > 0 ? $filter('translate')('P2P_Common_View') : $filter('translate')('P2P_Common_Add');
                                };
                                break;

                            case 'customAttributesPopup':
                                finalObject.placeHolder = $filter('translate')('P2P_Common_View');
                                break;

                            case 'manufacturerPopup':
                                finalObject.cellTemplate = function (row, column) {
                                    if (row.entity.manufacturer && row.entity.manufacturerPartNumber && row.entity.ManufacturerModel) {
                                        row.entity.manufacturerName = row.entity.manufacturer + ":" + row.entity.manufacturerPartNumber + ":" + row.entity.ManufacturerModel;
                                    }
                                    return row.entity.manufacturerName ? (row.entity.manufacturerName) : $filter('translate')('P2P_Common_Add');
                                };
                                break;

                            case 'categoryPopup':
                                finalObject.debounce = 250;
                                break;

                            case 'taxesPopup':
                                finalObject.cellTemplate = function (row, column) {
                                    return row.entity.isTaxExempt ? $filter('translate')('P2P_Common_Exempt') : row.entity.taxes;
                                };
                                break;
                        }
                        break;
                };
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
                            if (angular.isDefined(finalObject.filterObject.cellCondition)) {
                                try {
                                    cellConditionResult = eval(finalObject.filterObject.cellCondition);
                                }
                                catch (e) { }
                            }

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

                //  filter condition for split type column
                if (finalObject.attributes.type == 'splitsPopup') {
                    finalObject.filter.condition = function (searchTerm, row, col) {
                        return (row.splitType == 0 ? (row.type.id == 1 ? 'Quantity' : 'Amount') : 'Percentage').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    };
                }
            }
            else {
                finalObject.enableFiltering = false;
            }

            switch (finalObject.field) {
                case 'total':
                    finalObject.sortCondition = function (data, column, isAscending) {
                        if (angular.isDefined(column.attributes.rule)) {
                            return data.sort(function (a, b) {
                                a = eval(column.attributes.rule.replace(/row.entity/g, 'a'));
                                b = eval(column.attributes.rule.replace(/row.entity/g, 'b'));
                                return a > b ? (isAscending ? -1 : 1) : (a < b ? (isAscending ? 1 : -1) : 0);
                            });
                        }
                        return data;
                    };
                    break;
            }

            finalObject.uiType = finalObject.type;
            delete finalObject.type;

            return finalObject;
        };


        this.getMassagedSmartTableConfig = function (confArr, scope, cellClassFunction, cellEditableConditionFunction) {
            var massagedConf = [];
            _.each(confArr, function (conf) {
                massagedConf.push(getSmartTableConfig(conf, scope, cellClassFunction, cellEditableConditionFunction));
            });
            return massagedConf;
        };

        this.eavluateScopeBindedExpressions = function (val, scope, obj) {
            return formWidgetUtils.convertAndGetValue(val, scope, obj)
        };
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
            requestToAbort = _.find(pendingRequests, function (pendingRequest) {
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
            }, angular.isDefined(urlfordata.timeout) ? urlfordata.timeout : 120000);

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
(function () {
    'use strict';

    angular.module('SMART2').service('menuListItemServ', [function () {
        return function (list) {
            var getcontent = list;
            if (getcontent.parent().attr("role") == null) {
                getcontent.parent().attr("role", "listbox")
            }
            if (getcontent.attr("isItemList") == null && getcontent.length != 0) {
                getcontent.on("keydown", function (e) {
                    var $this = $(this);
                    if (e.keyCode == 40) {
                        $this.next().focus();
                    } else if (e.keyCode == 38) {
                        $this.prev().focus();
                    } else if (e.keyCode == 13) {
                        
                        if ($this.find('[ng-click]') != undefined || $this.find('[href]') != undefined) {
                            if ($this.find('[ng-click]').length > 0) {
                                $this.find('[ng-click]').trigger("click");
                            } else {
                                $this.find('[href]').trigger('click');
                            }
                        } else if ($this.attr('ng-click') != undefined) {
                            $this.trigger('click');
                        }
                    }
                    e.preventDefault();
                });
            };
            getcontent.attr("role", "option").attr("isItemList", "").attr('tabindex', '0').children().attr('tabindex', '-1');
        };
}])


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

(function (angular, window) {
    'use strict';

    angular
        .module('SMART2')
        .service('persistenceService', ['APPCONSTANTS', '$timeout', 'PLATFORMURLs', 'persistenceApiService', 'sectionsPersistenceService', 'nPlusOneService' , persistenceServiceFunc])
        .factory('persistenceApiService', ['APPCONSTANTS', '$timeout', 'PLATFORMURLs', 'httpService', '$http', '$window', '$filter', persistenceApiServiceFunc])
        .service('sectionsPersistenceService', ['APPCONSTANTS', '$timeout', 'PLATFORMURLs', 'persistenceApiService', sectionsPersistenceServiceFunc])
        .service('nPlusOneService', ['APPCONSTANTS', '$window','$timeout', 'PLATFORMURLs', 'persistenceApiService', nPlusOneServiceFunc])
   
    
function persistenceServiceFunc(APPCONSTANTS, $timeout, PLATFORMURLs, persistenceApiService, sectionsPersistenceService, nPlusOneService) {

        var _api = persistenceApiService;
        var _sectionPersistence = sectionsPersistenceService;
        var _nPlusOne = nPlusOneService;
        var _userData = {};
        var _state = ''
        var _documentType = ''
      
        function redirectToPreviousNode() {
            _nPlusOne.redirectToPreviousNode();
        }
        function getUserData(docType) {
            if (typeof _userData == 'object' && typeof _userData.length == 'undefined') {
                angular.extend(_userData, _api.getUserData(_api.storeLocation.DB, docType));
            }
        }

        function updateUserData(key, value) {
            if (_userData == undefined) {
                _userData = {};
            }
            _userData[key] = value;
        }
        function getModelData(newConfig, modelData, unbindModelDataWatcher, initChipsWatcher) {
            if (typeof newConfig.documentType != 'undefined') {
                _documentType = newConfig.documentType;
                _nPlusOne.getModelData(_documentType, modelData, unbindModelDataWatcher, initChipsWatcher)
            }
        }

        function saveRecentDocument(newVal, modelData) {
            _nPlusOne.saveRecentDocument(newVal, modelData);
        }

        function saveWorkspaceRecentDocument(newVal) {
            _nPlusOne.saveWorkspaceRecentDocument(newVal);
        }

        function saveUserData(docType) {
            if (typeof _userData == 'object' && typeof _userData.length == 'undefined') {
                _api.saveUserData(_api.storeLocation.DB, docType, null, _userData);
            }
        }






        var service = {
            userData: _userData,
            api: _api,
            sectionPersistence: _sectionPersistence,
            nPlusOne: _nPlusOne,
            getUserData: getUserData,
            updateUserData: updateUserData,
            saveUserData: saveUserData,
            redirectToPreviousNode: redirectToPreviousNode,
            getModelData: getModelData,
            saveRecentDocument: saveRecentDocument,
            saveWorkspaceRecentDocument: saveWorkspaceRecentDocument

        }
        return service;
    }

    function persistenceApiServiceFunc(APPCONSTANTS, $timeout, PLATFORMURLs, httpService, $http, $window, $filter) {

        var _userData = {};
        var _StoreLocation = {
            "DB": 1,
            "LocalStorage": 2,
            "SessionStorage": 3,
            "IndexDB": 4
        };






        function _getUserDataFromLocalStorage(key) {

            if (typeof localStorage[key] != 'undefined' && localStorage[key] != '') {
                return localStorage[key];
            }
            return null;
        };

        function _getUserDataFromSessionStorage(key) {

            if (typeof sessionStorage[key] != 'undefined' && sessionStorage[key] != '') {
                return sessionStorage[key];
            }
            return null;
        };

        function _getUserDataFromIndexDBStorage(key) {

            if (typeof indexedDB[key] != 'undefined' && indexedDB[key] != '') {
                return indexedDB[key];
            }
            return null;
        };

        function _getUserDataFromDB(docType) {
            var postData = {
                "contactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                "partnerCode": APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode,
                "documentType": docType
            };


            $.ajax({
                url: APPCONSTANTS.userPreferences.URLs.AppURL+'/getSmartActions?oloc=' + APPCONSTANTS.oloc.Persistence,
                method: "POST",
                async: false,
                dataType: 'json',
                timeout: 3000,
                data: JSON.stringify(postData),
                contentType: "application/json",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                success: function (data) {
                    if (data) {
                        if (data.length > 0) {
                            while (typeof data == 'string') {
                                data = JSON.parse(data);
                            }
                        }
                        if (typeof data[0] != 'undefined') {
                            if (typeof data[0]['events'] != 'undefined') {
                                while (typeof data[0]['events'] == 'string') {
                                    data[0]['events'] = JSON.parse(data[0]['events']);
                                }
                                _userData = data[0]['events'];
                            }
                        }

                    }
                    //userData={};
                },
                error: function (err) {
                    //return null;
                }
            });
        }



        function _setUserDataInLocalStorage(key, value) {
            if (key != null && key != '') {
                localStorage[key] = value;
            }
        };

        function _setUserDataInSessionStorage(key, value) {
            if (key != null && key != '') {
                sessionStorage[key] = value;
            }
        };

        function _setUserDataInIndexDBStorage(key, value) {
            if (key != null && key != '') {
                indexedDB[key] = value;
            }
        };

        function _saveUserDataInDB(docType, userData, documentType) {
            var request = {
                method: 'POST',
                params: {
                    bpc: APPCONSTANTS.userPreferences.EncryptedBPC
                },
                url: APPCONSTANTS.userPreferences.URLs.AppURL+'/saveSmartActions?oloc=' + APPCONSTANTS.oloc.Persistence,
                header: {
                    "Content-Type": "application/json",
                    "UserExecutionContext": JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails),
                    'Pragma': 'no-cache',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            if (typeof documentType == 'undefined') {
                documentType = docType;
            }

            var postData = {
                "contactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                "partnerCode": APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode,
                "documentType": documentType,
                "events": JSON.stringify(userData)
            };
            request.data = angular.toJson(postData);
            $http(request).then(function (response) {

            })
        }

        function _getUserData(storeLocation, docType, key) {
            if (storeLocation == 1) {
                _getUserDataFromDB(docType);
                return _userData;
            }
            else if (storeLocation == 2) {
                return _getUserDataFromLocalStorage(key);
            }
            else if (storeLocation == 3) {
                return _getUserDataFromSessionStorage(key);
            }
            else if (storeLocation == 4) {
                return _getUserDataFromIndexDBStorage(key);
            }
        };

        function _saveUserData(storeLocation, docType, key, value, documentType) {
            if (storeLocation == 1) {
                _saveUserDataInDB(docType, value, documentType);
            }
            else if (storeLocation == 2) {
                _setUserDataInLocalStorage(key, value);
            }
            else if (storeLocation == 3) {
                _setUserDataInSessionStorage(key, value);
            }
            else if (storeLocation == 4) {
                _setUserDataInIndexDBStorage(key, value);
            }
        };

        var service = {
            storeLocation: _StoreLocation,
            getUserData: _getUserData,
            saveUserData: _saveUserData,
            userData: _userData
        }
        return service;
    }

    function sectionsPersistenceServiceFunc(APPCONSTANTS, $timeout, PLATFORMURLs, persistenceApiService) {

        var _userData = {};


        function _getSections(jsonObj) {
            try {
                if (typeof jsonObj['sections'] != 'undefined') {
                    return jsonObj['sections'];
                }
                return [];
            } catch (err) { }
            return [];
        }

        function _setState(key, value) {
            if (typeof _userData[0] == 'undefined') {
                _userData = {};
            }
            _state = key;
            _userData[key] = value;
        }

        function _setUserData(key, value) {
            try {
                if (_state != '') {
                    _userData[_state][key] = value;
                } else {
                    _userData[key] = value;
                }

            } catch (err) { }
            // return [];
        }

        function getSectionsPersistence(formConfig, userData) {
            if (formConfig && typeof formConfig.documentType != 'undefined') {
                //persistenceService.getUserData(formConfig.documentType);
                var usersSections = _getSections(userData);
                if (usersSections) {
                    if (usersSections.length > 0) {
                        var sIndex = 100;
                        angular.forEach(formConfig.sections, function (section) {
                            if (typeof section.id != 'undefined') {
                                for (var i = 0; i < usersSections.length; i++) {
                                    if (section.id == usersSections[i]) {
                                        section.sectionIndex = i;
                                        break;
                                    }
                                }
                            }
                            else {
                                sIndex++;
                                section.sectionIndex = sIndex;
                            }
                        });
                        formConfig.sections = _.sortBy(formConfig.sections, 'sectionIndex');
                    }
                }
            }
        };




        var service = {
            getSectionsPersistence: getSectionsPersistence,

            setState: _setState,
            setUserData: _setUserData
        }
        return service;
    }

    function nPlusOneServiceFunc(APPCONSTANTS, $window, $timeout, PLATFORMURLs, persistenceApiService) {
        var docDetailsTemplate = {};
        var docDetails = {};
        var dirtyCheck = [];
        var docType = -10;
        var selectedSectionId = '';
        function _redirectToPreviousNode() {
            //changes
            if (typeof sessionStorage.workspace2_Enabled != "undefined") {
                if (sessionStorage.workspace2_Enabled == true) {
                    var recDocs = persistenceApiService.getUserData(persistenceApiService.storeLocation.SessionStorage, '', 'recentDocuments');
                    if (typeof recDocs != 'undefined' && recDocs != null && recDocs != 'undefined') {
                        if (typeof recDocs == 'string') {
                            recDocs = JSON.parse(recDocs)
                            if (recDocs.length == 0) {
                                recDocs = [];
                            }
                        }
                    }
                    if (recDocs.length > 1) {
                        var prevDoc = recDocs[recDocs.length - 2];
                        delete recDocs[recDocs.length - 1];
                        window.location.href = buildUrl(prevDoc);
                    }
                }
                else { history.go(-1); }
            }
            else { history.go(-1); }



            //var currentURL = $window.location.href;
            //if (currentURL.indexOf('rfx/edit') > -1)
            //    history.go(-2);
            //else
            //    history.go(-1);
        };

        function _historyIsEmpty() {
            if (history.length > 1) {
                return false;
            }
            return true;
        }

        function buildUrl(docDetails) {
            var docUrl = '';
            if (docDetails.docType == -9) {
                docUrl = docDetails.docCode;
            } else
            {
                docUrl = docDetails.urlFormat;
            }
            return docUrl;
        }

        function getDocDataOnChip(documentType) {

            switch (documentType) {
                //RFX
                case 1: docDetails =
                    {
                        "docAttrs": [{ "key": "docName", "value": "setup.EventName" },
                        //{ "key": "docNumber", "value": "" },
                        { "key": "docCode", "value": "setup.DocumentCode" }],
                        "docConditions": { "initialCondition": "" },
                        "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                        "dd": "dc={docCode}&bpc={bpc}",
                        "urlFormat": "/Sourcing/Rfx?oloc=" + APPCONSTANTS.oloc.rfxOloc + "&dd={}"
                        //https://smartqc.gep.com//Sourcing/Rfx?oloc=216&dd=ZGM9MTc3NTImYnBjPTQ0MzUxNQ2 
                    };
                    return docDetails;

                //Invoice
                case 9:
                    docDetails =
                        {
                            "docAttrs": [{ "key": "docName", "value": "InvoiceData.name" },
                            { "key": "docNumber", "value": "InvoiceData.number" },
                            { "key": "docCode", "value": "InvoiceData.documentCode" }],
                            "docConditions": { "initialCondition": "typeof modelData.InvoiceData.documentCode != 'undefined' && modelData.InvoiceData.documentCode > 0 && typeof modelData.InvoiceData.number != 'undefined' && modelData.InvoiceData.number != null" },
                            "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                            "dd": "dc={docCode}&bpc={bpc}&st=15",
                            "urlFormat": "/P2P/Invoice?dd={}&oloc=" + APPCONSTANTS.oloc.invoiceOloc + "#/invoice"

                        };
                    return docDetails;

                //Order
                case 8:
                    docDetails =
                        {
                            "docAttrs": [{ "key": "docName", "value": "orderData.name" },
                            { "key": "docNumber", "value": "orderData.number" },
                            { "key": "docCode", "value": "orderData.documentCode" }],
                            "docConditions": { "initialCondition": "typeof modelData.orderData.documentCode != 'undefined' && modelData.orderData.documentCode > 0 && typeof modelData.orderData.number != 'undefined' && modelData.orderData.number != null" },
                            "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                            "dd": "dc={docCode}&bpc={bpc}&st=15",
                            "urlFormat": "/P2P/Order?dd={}&oloc=" + APPCONSTANTS.oloc.orderOloc + "#/po"

                        };
                    return docDetails;

                //Requisition
                case 7:
                    docDetails =
                        {
                            "docAttrs": [{ "key": "docName", "value": "ReqData.name" },
                            { "key": "docNumber", "value": "ReqData.number" },
                            { "key": "docCode", "value": "ReqData.documentCode" }],
                            "docConditions": { "initialCondition": "typeof modelData.ReqData.documentCode!= 'undefined' && typeof modelData.ReqData.number!= 'undefined' && modelData.ReqData.number != '' " },
                            "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                            "dd": "dc={docCode}&bpc={bpc}&st=15",
                            "urlFormat": "/P2P/Index?dd={}&oloc=" + APPCONSTANTS.oloc.reqOloc + "#/requisitions/{}"
                            //https://smartdev.gep.com/P2P/Index?dd=ZGM9MCZicGM9Mjg2Mjkmc3Q9MQ2&oloc=216#/requisitions/ZGM9MCZicGM9Mjg2Mjkmc3Q9MQ2
                        };
                    return docDetails;

                //IR
                case 14:
                    docDetails =
                        {
                            "docAttrs": [{ "key": "docName", "value": "IRData.name" },
                            { "key": "docNumber", "value": "IRData.number" },
                            { "key": "docCode", "value": "IRData.documentCode" }],
                            "docConditions": { "initialCondition": "typeof modelData.IRData.documentCode != 'undefined' && modelData.IRData.documentCode > 0" },
                            "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                            "dd": "dc={docCode}&bpc={bpc}&st=15",
                            "urlFormat": "/P2P/IR?dd={}&oloc=" + APPCONSTANTS.oloc.irOloc + "#/ir"
                            //https://smartdev.gep.com/P2P/IR?dd=ZGM9MCZicGM9Mjg2Mjkmc3Q9MQ2&oloc=225#/ir
                        };
                    return docDetails;


                ////Receipts
                //case 11:  
                //    docDetails = 
                //        {
                //            "docAttrs": [{ "key": "docName", "value": "" },
                //                         { "key": "docNumber", "value": "" },
                //                         { "key": "docCode", "value": "" }],
                //            "docConditions": { "initialCondition":  }
                //        };
                //    return docDetails;

                //Forms
                case 11:
                    docDetails =
                        {
                            "docAttrs": [{ "key": "docName", "value": "setup.formName" },
                            //{ "key": "docNumber", "value": "" },
                            { "key": "docCode", "value": "$('#hdnFormCode').val()" }],
                            "docConditions": { "initialCondition": "" },
                            "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                            "dd": "dc={docCode}&bpc={bpc}&st=15",
                            "urlFormat": "/PartnerManagement/Form/CreateForm?dd={}&oloc=" + APPCONSTANTS.oloc.formOloc
                            //https://smartdev.gep.com/PartnerManagement/Form/CreateForm?dd=ZGM9MCZicGM9Mjg2Mjkmc3Q9MQ2&oloc=105 
                        };
                    return docDetails;

                //Assessment or scorecard
                case 12:
                    docDetails =
                        {
                            "docAttrs": [{ "key": "docName", "value": "setup.name" },
                            // { "key": "docNumber", "value": "" },
                            { "key": "docCode", "value": "$('#hdnAssessmentCode').val()" }],
                            "docConditions": { "initialCondition": "typeof modelData.setup.name != 'undefined' && modelData.setup.name != '' " },
                            "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                            "dd": "dc={docCode}&bpc={bpc}&st=15",
                            "urlFormat": "/supplierManagement/Scorecard?dd={}&oloc=" + APPCONSTANTS.oloc.scorcardOloc + "#/supplier/scorecard"
                            //https://smartqc.gep.com/supplierManagement/Scorecard?dd=ZGM9MCZicGM9NDQzNTE1JnN0PTE1&oloc=216#/supplier/scorecard

                        };
                    return docDetails;

                //Partnerprofile
                case 19: docDetails =
                    {
                        "docAttrs": [{ "key": "docName", "value": "partnerDetails.objPartnerDetails.LegalCompanyName" },
                        { "key": "docCode", "value": "partnerDetails.objPartnerDetails.PartnerCode" }],
                        "docConditions": { "initialCondition": "" },
                        "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                        "dd": "spc={docCode}&bpc={bpc}",
                        "urlFormat": "/supplierManagement/Profile?dd={}&oloc=" + APPCONSTANTS.oloc.partnerOloc + "#/supplier/profile"
                        // https://smartqc.gep.com/supplierManagement/Profile?dd=c3BjPTUxMjU2MyZicGM9NDQzNTE10&oloc=216#/supplier/profile 
                    };
                    return docDetails;

                //P2P Contract
                case 5: docDetails =
                    {
                        "docAttrs": [{ "key": "docName", "value": "ContractInfo.ContractDetails.DocumentName " },
                        { "key": "docNumber", "value": "ContractInfo.ContractDetails.DocumentNumber" },
                        { "key": "docCode", "value": "ContractInfo.ContractDetails.DocumentCode " }],
                        "docConditions": { "initialCondition": "typeof modelData.ContractInfo.ContractDetails.DocumentCode != 'undefined' &&  modelData.ContractInfo.ContractDetails.DocumentCode > 0 && typeof modelData.ContractInfo.ContractDetails.DocumentNumber != 'undefined' && modelData.ContractInfo.ContractDetails.DocumentNumber != null  && typeof modelData.ContractInfo.ContractDetails.DocumentName != 'undefined' && modelData.ContractInfo.ContractDetails.DocumentName != null" },
                        "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                        "dd": "dc={docCode}&bpc={bpc}&st=15",
                        "urlFormat": "/Contract/ContractInfo/Index?oloc=" + APPCONSTANTS.oloc.contractOloc + "&dd={}&dt=5#/contract/new"
                        //https://smartqc.gep.com/Contract/ContractInfo/Index?oloc=104&dd=ZGM9MCZicGM9NDQyMjQ1JnN0PTE1&dt=5#/contract/new  
                    };
                    return docDetails;

                //Catalog 
                //no user
                case 6: docDetails =
                    {
                        "docAttrs": [{ "key": "docName", "value": "" },
                        { "key": "docNumber", "value": "" },
                        { "key": "docCode", "value": "" }],
                        "docConditions": { "initialCondition": "" },
                        "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode"
                    };
                    return docDetails;

                //Auction
                //case 6: docDetails = 
                //    {
                //        "docAttrs": [{ "key": "docName", "value": "" },
                //                     { "key": "docNumber", "value": "" },
                //                     { "key": "docCode", "value": "" }],
                //        "docConditions": { "initialCondition":  }
                //    };
                //    return docDetails;

                //Project
                //case 6: docDetails =
                //    {
                //        "docAttrs": [{ "key": "docName", "value": "" },
                //        { "key": "docNumber", "value": "" },
                //        { "key": "docCode", "value": "" }],
                //        "docConditions": { "initialCondition": "" },
                //        "bpc": "",
                //        "urlFormat": "/req/Index?dd={dc={docCode}&bpc={bpc}&st=15}"
                //    };
                //    return docDetails;

                //Project
                case 21:
                    docDetails =
                        {
                            "docAttrs": [{ "key": "docName", "value": "Project.Title" },
                            { "key": "docNumber", "value": "Project.DocumentNumber" },
                            { "key": "docCode", "value": "Project.DocumentCode" }],
                            "docConditions": { "initialCondition": "" },
                            "bpc": "APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode",
                            "dd": "dc={docCode}&bpc={bpc}",
                            "urlFormat": "/?dd={}&oloc=" + APPCONSTANTS.oloc.projectOloc + "#/ppst/edit?dd={}"
                            //https://smartqc.gep.com/?dd=ZGM9MTc1NzUmYnBjPTQ0MzUxNQ2&oloc=223#/ppst/edit?dd=ZGM9MTc1NzUmYnBjPTQ0MzUxNQ2 
                        };
                    return docDetails;
            }

        }

        function getModelData(documentType, modelData, unbindModelDataWatcher, initChipsWatcher) {
            docType = documentType;
            var docDetailsTemplate = {};
            docDetailsTemplate = getDocDataOnChip(documentType);
            var listOfDocData = {};
            var ModelAttrList = [];
            if (typeof docDetailsTemplate != 'undefined' && typeof docDetailsTemplate.docAttrs != 'undefined') {
                docDetailsTemplate.docAttrs.forEach(function (obj) {
                    listOfDocData[obj.key] = "";
                    var modelAttrs = obj.value.split('.');
                    var tempObj;
                    ModelAttrList.push('modelData.' + obj.value)

                });

                if (ModelAttrList.length > 0) {
                    initChipsWatcher(ModelAttrList);
                    unbindModelDataWatcher();
                }
            } else {
                unbindModelDataWatcher();
            }

        }


        function saveRecentDocument(newVal, modelData) {
            console.log(APPCONSTANTS.userPreferences);
            try {
                var enableSave = true;
                // if (docDetails.docConditions.initialCondition!= "" )
                // {
                //     // try{
                //     //     if(eval(docDetails.docConditions.initialCondition) != true){
                //     //         enableSave=false;
                //     //     }
                //     // }catch(err)
                //     // {
                //     //     console.log(err);
                //     // }

                // }
                if (docDetails.hasOwnProperty('bpc')) {
                    try {
                        docDetails.bpc = eval(docDetails.bpc);
                    } catch (e) {
                        enableSave = false;
                    }
                }

                if (enableSave) {
                    var currentDoc = {};
                    for (var i = 0; i < docDetails.docAttrs.length; i++) {
                        if (docDetails.docAttrs[i].value.indexOf('$') > -1) {
                            currentDoc[docDetails.docAttrs[i].key] = eval(docDetails.docAttrs[i].value);
                        }
                        else {
                            currentDoc[docDetails.docAttrs[i].key] = newVal[i];
                        }
                    }

                    if (docDetails.hasOwnProperty('urlFormat')) {
                        currentDoc['urlFormat'] = docDetails.urlFormat;
                    }

                    if (docDetails.hasOwnProperty('bpc')) {
                        currentDoc['bpc'] = docDetails.bpc;
                    }

                    if (docDetails.hasOwnProperty('dd')) {
                        currentDoc['dd'] = docDetails.dd;
                    }
                    currentDoc['docType'] = docType;
                    currentDoc['selectedSectionId'] = selectedSectionId;
                    //Save in localStorage
                    saveRecentDoc(persistenceApiService.storeLocation.LocalStorage, currentDoc);
                    // Save in SessionStorage
                    saveRecentDoc(persistenceApiService.storeLocation.SessionStorage, currentDoc);
                    //Save in DB
                    saveRecentDoc(persistenceApiService.storeLocation.DB, currentDoc, '-9');

                }

            } catch (err) {
                console.log(err);
            }
        }


        function saveWorkspaceRecentDocument(newVal) {
            console.log(APPCONSTANTS.userPreferences);
            try {
                var enableSave = true;
              

                if (enableSave) {
                    var currentDoc = {};
                  
                    currentDoc['docName'] = newVal.docName;
                    currentDoc['docCode'] = newVal.docCode ;                  
                    currentDoc['urlFormat'] ='/'+ newVal.urlFormat.replace(APPCONSTANTS.userPreferences.URLs.AppURL, "");
                    currentDoc['docType'] = newVal.docType;
                    
                    // Save in SessionStorage
                    saveRecentDoc(persistenceApiService.storeLocation.SessionStorage, currentDoc);
                    //Save in DB
                    saveRecentDoc(persistenceApiService.storeLocation.DB, currentDoc, '-9');

                }

            } catch (err) {
                console.log(err);
            }
        }


        function saveRecentDoc(locationStore, currentDoc, documentType) {
            if (locationStore != persistenceApiService.storeLocation.DB) {
                var recentDocsHistoryLength = 10;
                var recentDocs = persistenceApiService.getUserData(locationStore, 0, 'recentDocuments');
                if (typeof recentDocs != 'undefined' && recentDocs != null && recentDocs != 'undefined') {
                    if (typeof recentDocs == 'string') {
                        recentDocs = JSON.parse(recentDocs)
                        if (recentDocs.length == 0) {
                            recentDocs = [];
                        }
                    }
                }
                else {
                    recentDocs = [];
                }
                var lastIndex = recentDocs.length;

                var jObj = {};
                if (typeof currentDoc.dd != 'undefined') {
                    currentDoc.dd = currentDoc.dd.replace("{docCode}", currentDoc.docCode);
                    currentDoc.dd = currentDoc.dd.replace("{bpc}", currentDoc.bpc);
                }
                var encodedString = encode(currentDoc.dd);
                if (typeof currentDoc.urlFormat != 'undefined') {
                    currentDoc.urlFormat = currentDoc.urlFormat.replace("{}", encodedString);
                    if (currentDoc.docType == 7 || currentDoc.docType == 21)
                    {
                        currentDoc.urlFormat = currentDoc.urlFormat.replace("{}", encodedString);
                    }
                    currentDoc.urlFormat = currentDoc.urlFormat.replace("==", 2);
                }
                if (recentDocs.length > recentDocsHistoryLength) {
                    recentDocs.shift();
                    console.log(recentDocs);
                }

                if (locationStore == persistenceApiService.storeLocation.SessionStorage) {

                    var documentIsExist = false;
                    if (recentDocs.length >= 1) {
                        var previousDoc = recentDocs.length - 1;
                        if (recentDocs[previousDoc].docType == currentDoc.docType) {
                            if (recentDocs[previousDoc].docCode == 0 || (recentDocs[previousDoc].docCode == currentDoc.docCode)) {
                                var compareDocs = JSON.stringify(recentDocs[previousDoc]) === JSON.stringify(currentDoc)
                                documentIsExist = true;
                                if (compareDocs == false) {
                                    Object.assign(recentDocs[previousDoc], currentDoc)
                                }
                            }
                        }
                    }
                    if (documentIsExist == false) {
                        recentDocs.push(currentDoc);
                        if (recentDocs.length > recentDocsHistoryLength) {
                            recentDocs.shift();
                        }
                    }
                    persistenceApiService.saveUserData(locationStore, 0, 'recentDocuments', JSON.stringify(recentDocs));
                }
                else if (locationStore == persistenceApiService.storeLocation.LocalStorage) {
                    if (currentDoc.docCode > 0) {
                        var documentIsExist = false;
                        if (recentDocs.length > 0) {
                            for (var i = recentDocs.length - 1; i >= 0; i--) {
                                if (recentDocs[i].docType == currentDoc.docType) {
                                    if (recentDocs[i].docCode == currentDoc.docCode) {
                                        var compareDocs = JSON.stringify(recentDocs[i]) === JSON.stringify(currentDoc)
                                        documentIsExist = true;
                                        if (compareDocs == false) {
                                            Object.assign(recentDocs[i], currentDoc);
                                        }
                                    }
                                }
                            }
                        }
                        if (documentIsExist == false) {
                            recentDocs.push(currentDoc);
                            if (recentDocs.length > recentDocsHistoryLength) {
                                recentDocs.shift();
                            }
                        }
                        persistenceApiService.saveUserData(locationStore, 0, 'recentDocuments', JSON.stringify(recentDocs));
                    }

                }
            }
            else if (locationStore == persistenceApiService.storeLocation.DB) {
                if (typeof currentDoc.dd != 'undefined') {
                    currentDoc.dd = currentDoc.dd.replace("{docCode}", currentDoc.docCode);
                    currentDoc.dd = currentDoc.dd.replace("{bpc}", currentDoc.bpc);
                }
                var encodedString = encode(currentDoc.dd);
                if (typeof currentDoc.urlFormat != 'undefined') {
                    currentDoc.urlFormat = currentDoc.urlFormat.replace("{}", encodedString);
                    if (currentDoc.docType == 7 || currentDoc.docType == 21) {
                        currentDoc.urlFormat = currentDoc.urlFormat.replace("{}", encodedString);
                    }
                }
                if (currentDoc.docCode > 0 && currentDoc.docType != -9) {

                    var recentDocuments = {};
                    recentDocuments['recentDocuments'] = [];
                    recentDocuments.recentDocuments.push(currentDoc)


                    persistenceApiService.saveUserData(locationStore, 0, 'recentDocuments', recentDocuments, documentType);
                }

            }


        }

        var saveSelectedSection = function (SectionId) {
            if (docType != -10) {
                var recentDocs = persistenceApiService.getUserData(persistenceApiService.storeLocation.SessionStorage, 0, 'recentDocuments');
                if (typeof recentDocs != 'undefined' && recentDocs != null) {
                    if (typeof recentDocs == 'string') {
                        recentDocs = JSON.parse(recentDocs)
                        if (recentDocs.length > 0) {
                            var lastIndex = recentDocs.length;
                            var recentDoc = recentDocs[lastIndex - 1];
                            recentDoc.selectedSectionId = SectionId;
                            persistenceApiService.saveUserData(persistenceApiService.storeLocation.SessionStorage, 0, 'recentDocuments', JSON.stringify(recentDocs));
                            selectedSectionId = SectionId;
                        }
                    }
                }


            }
        }

        var getSelectedSection = function () {
            if (docType != -10) {
                if (selectedSectionId == '') {
                    var recentDocs = persistenceApiService.getUserData(persistenceApiService.storeLocation.SessionStorage, 0, 'recentDocuments');
                    if (typeof recentDocs != 'undefined' && recentDocs != null) {
                        if (typeof recentDocs == 'string') {
                            recentDocs = JSON.parse(recentDocs)
                            if (recentDocs.length > 0) {
                                var lastIndex = recentDocs.length;
                                // var doc= recentDocs[lastIndex-1];
                                selectedSectionId = recentDocs[lastIndex - 1].selectedSectionId;
                                return selectedSectionId;
                            }
                        }
                    }
                } else {
                    return selectedSectionId;
                }

            }
            else {
                return '';
            }
        }

        //Script to create the base64 encode for the url
        var PADCHAR = '=';

        var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        function getbyte64(s, i) {
            var idx = ALPHA.indexOf(s.charAt(i));
            if (idx === -1) {
                throw "Cannot decode base64";
            }
            return idx;
        }

        function decode(s) {
            // convert to string
            s = "" + s;
            var pads, i, b10;
            var imax = s.length;
            if (imax === 0) {
                return s;
            }

            if (imax % 4 !== 0) {
                throw "Cannot decode base64";
            }

            pads = 0;
            if (s.charAt(imax - 1) === PADCHAR) {
                pads = 1;
                if (s.charAt(imax - 2) === PADCHAR) {
                    pads = 2;
                }
                // either way, we want to ignore this last block
                imax -= 4;
            }

            var x = [];
            for (i = 0; i < imax; i += 4) {
                b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) |
                    (getbyte64(s, i + 2) << 6) | getbyte64(s, i + 3);
                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
            }

            switch (pads) {
                case 1:
                    b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) | (getbyte64(s, i + 2) << 6);
                    x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
                    break;
                case 2:
                    b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12);
                    x.push(String.fromCharCode(b10 >> 16));
                    break;
            }
            return x.join('');
        }

        function getbyte(s, i) {
            var x = s.charCodeAt(i);
            if (x > 255) {
                throw "INVALID_CHARACTER_ERR: DOM Exception 5";
            }
            return x;
        }

        function encode(s) {
            if (arguments.length !== 1) {
                throw "SyntaxError: Not enough arguments";
            }

            var i, b10;
            var x = [];

            // convert to string
            s = "" + s;

            var imax = s.length - s.length % 3;

            if (s.length === 0) {
                return s;
            }
            for (i = 0; i < imax; i += 3) {
                b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8) | getbyte(s, i + 2);
                x.push(ALPHA.charAt(b10 >> 18));
                x.push(ALPHA.charAt((b10 >> 12) & 0x3F));
                x.push(ALPHA.charAt((b10 >> 6) & 0x3f));
                x.push(ALPHA.charAt(b10 & 0x3f));
            }
            switch (s.length - imax) {
                case 1:
                    b10 = getbyte(s, i) << 16;
                    x.push(ALPHA.charAt(b10 >> 18) + ALPHA.charAt((b10 >> 12) & 0x3F) +
                        PADCHAR + PADCHAR);
                    break;
                case 2:
                    b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8);
                    x.push(ALPHA.charAt(b10 >> 18) + ALPHA.charAt((b10 >> 12) & 0x3F) +
                        ALPHA.charAt((b10 >> 6) & 0x3f) + PADCHAR);
                    break;
            }
            return x.join('');
        }


        var service = {
            redirectToPreviousNode: _redirectToPreviousNode,
            historyIsEmpty: _historyIsEmpty,
            getModelData: getModelData,
            saveRecentDocument: saveRecentDocument,
            docDetails: docDetails,
            saveSelectedSection: saveSelectedSection,
            getSelectedSection: getSelectedSection,
            saveWorkspaceRecentDocument: saveWorkspaceRecentDocument
        }
        return service;
    }





})(angular, window);
(function () {
    'use strict';

    angular.module('SMART2').service('requestClicked', requestClickedFunc);

    function requestClickedFunc() {
        var isRequestClicked = false;
        return {
            getProperty: function () {
                return isRequestClicked;
            },
            setProperty: function (value) {
                isRequestClicked = value;
            }
        };
    };
})();

(function () {
    'use strict';

    //  functions for rule engine
    window.isObject = function (val) {
        return angular.isObject(val);
    };

    window.isDate = function (val) {
        return angular.isDate(val);
    };

    window.isNumber = function (val) {
        return angular.isNumber(val);
    };

    window.isDefined = function (val) {
        return angular.isDefined(val)
    };

    window.isUndefined = function (val) {
        return angular.isUndefined(val)
    };

    window.isString = function (val) {
        return angular.isString(val)
    };

    window.isUndefinedOrEmptyOrNull = function (m) {
        if (isObject(m) && m.hasOwnProperty('ui')) {
            var result;
            try {
                result = eval('m.dataModel.' + m.ui.field);
            }
            catch (e) { }
            return result === '' || result === undefined || result === null;
        }
        return m === '' || m === undefined || m === null;
    };

    window.isEmptyOrNull = function (m) {
        if (isObject(m) && m.hasOwnProperty('ui')) {
            var result;
            try {
                result = eval('m.dataModel.' + m.ui.field);
            }
            catch (e) { }
            return result === '' || result === null;
        }
        return m === '' || m === null;
    };

    window.isUndefinedOrNull = function (m) {
        if (isObject(m) && m.hasOwnProperty('ui')) {
            var result;
            try {
                result = eval('m.dataModel.' + m.ui.field);
            }
            catch (e) { }
            return result === undefined || result === null;
        }
        return m === undefined || m === null;
    };

    angular.module('SMART2').service('RuleEngine', ['$translate', function ($translate) {
        var service = this;
        this.utils = {};

        this.setRules = function (dataConfig, dataModel, cumulativeRules, rules, ruleType) {
            this.dataConfig = dataConfig;
            this.dataModel = dataModel;
            this.cumulativeRules = cumulativeRules;                 //  Cumulative rules
            this.rules = rules;                                     //  Rules object
            this.type = angular.isDefined(ruleType) ? ruleType : 'header';
            this.isNoolsEnabled = !angular.isObject(rules);
        };

        this.setDocumentRules = function (rules) {
            this.documentRules = rules;
        };

        this.setUtils = function (utils) {
            this.utils = utils;
        };

        //Added inorder to translate the errorString which is being appended to the grid rules
        function appendErrorString(result) {
            var resultantString = '';
            if (result && result.params && _.isArray(result.params)) {
                _.each(result.params, function (data, index) {
                    if (data && data.isToBeTranslated) {
                        resultantString += $translate.instant(data.text);
                    } else {
                        resultantString += data.text;
                    }
                });

                result.error = resultantString;
                delete result['params'];
            }
            return result;
        }

        this.executeNools = function (callback, scope) {
            var failedRules = [];
            var headerOrGridConfig = this.dataConfig;
            var dataModel = this.dataModel;
            var ruleType = this.type;
            var rulesObj = this.rules;
            var isNoolsEnabled = this.isNoolsEnabled;
            var tmpRules, tmpRule, tmpRuleResult;

            var invalidArray = [], disableArray = [], totalErrosArray = [];

            if (ruleType == 'grid') {
                _.each(dataModel, function (model, rowIndex) {
                    var virtualDatamodel = angular.copy(model);

                    _.each(angular.isArray(headerOrGridConfig) ? headerOrGridConfig[0].cloumnDefs : headerOrGridConfig.cloumnDefs, function (column, columnIndex) {
                        if (column.hasOwnProperty('rules') && column.rules.length > 0) {
                            angular.extend(column, {
                                fieldName: column.field,
                                errorFieldDisplayName: $translate.instant(column.displayName)
                            });

                            if (column.attributes.type == 'date') {
                                changeDateFormatForNools(column, virtualDatamodel, 'grid');
                            }

                            //  Javascript implementation
                            if (!isNoolsEnabled) {
                                var messageModel = {
                                    ui: angular.extend(column, {
                                        data: column.field,
                                        errorFieldDisplayName: $translate.instant(column.displayName)
                                    }),
                                    dataModel: virtualDatamodel,
                                    index: {
                                        row: rowIndex,
                                        column: columnIndex
                                    },
                                    scope: ''
                                };

                                tmpRules = rulesObj.get(messageModel);

                                for (var i = 0; i < column.rules.length; i++) {
                                    tmpRule = tmpRules[column.rules[i]];
                                    if (angular.isDefined(tmpRule) && angular.isFunction(tmpRule.condition) && tmpRule.condition()) {
                                        //  If rule fails

                                        tmpRuleResult = appendErrorString(tmpRule.result());
                                        if (angular.isDefined(tmpRuleResult.rowColIndex)) {
                                            if (tmpRuleResult.state == 'invalid') {
                                                invalidArray.push(tmpRuleResult.rowColIndex)
                                                totalErrosArray.push(tmpRuleResult);
                                            }
                                            else if (tmpRuleResult.state == 'disable') {
                                                disableArray.push(tmpRuleResult.rowColIndex);
                                            }
                                        }
                                        else {
                                            if (tmpRuleResult.state == 'invalid') {
                                                failedRules.push(tmpRuleResult);
                                            }
                                        }
                                        break;
                                    };
                                }
                            }
                            else {
                                //  Nools implementation
                                var messageModel = [new Message({
                                    ui: angular.extend(column, {
                                        data: column.field
                                    }),
                                    dataModel: virtualDatamodel,
                                    scope: ''
                                })];
                                var rules = messageModel[0].ui.rules;
                                var session = flow.getSession.apply(flow, messageModel);
                                for (var i = 0; i < rules.length; i++) {
                                    session.focus("" + rules[i] + "");
                                }
                                session.on("error", function (data) {
                                    if (data.errors[0].rowColIndex !== undefined) {
                                        if (data.errors[0].state == 'invalid') {
                                            invalidArray.push(data.errors[0].rowColIndex)
                                            totalErrosArray.push(data.errors[0]);
                                            session.dispose();
                                        }
                                        else if (data.errors[0].state == 'disable') {
                                            disableArray.push(data.errors[0].rowColIndex);
                                        }
                                    }
                                    else {
                                        if (data.errors[0].state == 'invalid') {
                                            failedRules.push(data.errors[0]);
                                            session.dispose();
                                        }
                                    }
                                });
                                session.match();
                            }
                        }
                    });
                });

                if (invalidArray.length > 0 || disableArray.length > 0 || totalErrosArray.length > 0) {
                    failedRules.push(invalidArray);
                    failedRules.push(disableArray);
                    failedRules.push(totalErrosArray);
                }
            }
            else if (ruleType == 'cell' && headerOrGridConfig.colDef.hasOwnProperty('rules') && headerOrGridConfig.colDef.rules.length > 0) {
                headerOrGridConfig.colDef.fieldName = headerOrGridConfig.colDef.field;
                var virtualDatamodel = angular.copy(dataModel.entity);

                if (headerOrGridConfig.colDef.attributes.type == 'date') {
                    //scope consists total column defs of line tab.
                    changeDateFormatForNools(scope, virtualDatamodel, 'cell');
                }

                //  Javascript implementation
                if (!isNoolsEnabled) {
                    var messageModel = {
                        ui: angular.extend(headerOrGridConfig.colDef, {
                            errorFieldDisplayName: $translate.instant(headerOrGridConfig.colDef.displayKey)
                        }),
                        dataModel: virtualDatamodel,
                        scope: ''
                    };

                    tmpRules = rulesObj.get(messageModel);

                    for (var i = 0; i < headerOrGridConfig.colDef.rules.length; i++) {
                        tmpRule = tmpRules[headerOrGridConfig.colDef.rules[i]];
                        if (angular.isDefined(tmpRule) && angular.isFunction(tmpRule.condition) && tmpRule.condition()) {
                            //  If rule fails
                            failedRules.push(appendErrorString(tmpRule.result()));
                            break;
                        };
                    }
                }
                else {
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
            }
            else if (ruleType == 'chargeGrid') {
                dataModel = dataModel.orderData.ItemChargesForHeader;
                _.each(dataModel, function (model) {
                    var virtualDatamodel = angular.copy(model);
                    var columnArr = [];
                    _.each(headerOrGridConfig[0].cloumnDefs, function (column) {
                        angular.extend(column, {
                            fieldName: column.field
                        });
                        if (column.hasOwnProperty('rules')) {
                            if (column.attributes.type == 'date') {
                                changeDateFormatForNools(column, virtualDatamodel);
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

            if (angular.isFunction(callback)) {
                callback({
                    success: failedRules.length == 0,
                    failedRules: failedRules
                });
            }
            else {
                return {
                    success: failedRules.length == 0,
                    failedRules: failedRules
                };
            }
        };

        this.isValid = function (rule, callback) {
            if (typeof Header == "undefined") {
                var tmpRules = this.documentRules.get({
                    ui: '',
                    dataModel: this.dataModel,
                    scope: '',
                    utils: this.utils
                });

                var tmpRule = tmpRules[rule];

                if (angular.isDefined(tmpRule) && angular.isFunction(tmpRule.condition) && tmpRule.condition()) {
                    angular.isFunction(callback) && callback({
                        success: false,
                        errorData: appendErrorString(tmpRule.result())
                    });
                }
            }
            else {
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
            }
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
            var rulesObj = this.rules;
            var isNoolsEnabled = this.isNoolsEnabled;
            var tmpRules, tmpRule, tmpRuleResult;


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
                                if (typeof eval('this.dataModel.' + this.dataConfig[i].rows[j].properties[k].data) == 'object' && this.dataConfig[i].rows[j].properties[k].type != 'subsection') {
                                    if (this.dataConfig[i].rows[j].properties[k].attributes != undefined)
                                        var datakey = this.dataConfig[i].rows[j].properties[k].attributes.displayformat != undefined ? this.dataConfig[i].rows[j].properties[k].attributes.displayformat : this.dataConfig[i].rows[j].properties[k].attributes.datakey;
                                    else if (this.dataConfig[i].rows[j].properties[k].ui != undefined)
                                        var datakey = this.dataConfig[i].rows[j].properties[k].ui.displayformat ? this.dataConfig[i].rows[j].properties[k].ui.displayformat : this.dataConfig[i].rows[j].properties[k].ui.datakey;

                                    datakey = datakey.split('-');
                                    tmpPropertyValue = '';
                                    for (var m = 0; m < datakey.length; m++) {
                                        if (datakey[m].indexOf('{') > -1)
                                            datakey[m] = datakey[m].replace("{", '').replace("}", '');

                                        tmpPropertyValue += eval('this.dataModel.' + this.dataConfig[i].rows[j].properties[k].data + '.' + datakey[m]).trim();
                                    }
                                }
                                else
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
                                if ((this.dataConfig[i].rows[j].properties[k].isMandatory && (tmpPropertyValue == undefined || tmpPropertyValue === "" || tmpPropertyValue == null || isNaN(tmpPropertyValue))) || (!this.dataConfig[i].rows[j].properties[k].isMandatory && isNaN(tmpPropertyValue) && tmpPropertyValue != undefined)) {
                                    failedRules.push({
                                        type: 'required',
                                        section: this.dataConfig[i],
                                        uiConfig: this.dataConfig[i].rows[j].properties[k],
                                        rule: "isNaN(this)",
                                        error: $translate.instant('PLATFORM_ThisFieldShouldBeNumber')
                                    });
                                }
                            }

                            else if (Object(this.dataConfig[i].rows[j].properties[k].attributes).hasOwnProperty('type') && this.dataConfig[i].rows[j].properties[k].attributes.type == 'autocomplete') {
                                isValidated = true;
                                if (this.dataConfig[i].rows[j].properties[k].isMandatory && (tmpPropertyValue + '' == '' || tmpPropertyValue == null || tmpPropertyValue == undefined)) {
                                    failedRules.push({
                                        type: 'required',
                                        section: this.dataConfig[i],
                                        uiConfig: this.dataConfig[i].rows[j].properties[k],
                                        rule: "this == ''",
                                        error: $translate.instant('PLATFORM_ThisFieldShouldNotBeBlank')
                                    });
                                }
                            }
                        }

                        if (!isValidated && this.dataConfig[i].rows[j].properties[k].type != 'subsection' && this.dataConfig[i].rows[j].properties[k].type != 'checkbox' && this.dataConfig[i].rows[j].properties[k].type != 'switch' && this.dataConfig[i].rows[j].properties[k].isMandatory && (tmpPropertyValue == '' || tmpPropertyValue == undefined || tmpPropertyValue == null)) {
                            failedRules.push({
                                type: 'required',
                                section: this.dataConfig[i],
                                uiConfig: this.dataConfig[i].rows[j].properties[k],
                                rule: "this == ''",
                                error: $translate.instant('PLATFORM_ThisFieldShouldNotBeBlank')
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
                                            failedRules.push({
                                                type: 'inline',
                                                section: this.dataConfig[i],
                                                uiConfig: this.dataConfig[i].rows[j].properties[k],
                                                rule: this.dataConfig[i].rows[j].properties[k].rules[l].rule,
                                                error: this.dataConfig[i].rows[j].properties[k].rules[l].error
                                            });
                                        }
                                    }
                                    else if (isNoolsEnabled) {
                                        var messageModel = [new Header({
                                            ui: this.dataConfig[i].rows[j].properties[k],
                                            dataModel: this.dataModel,
                                            scope: currentScope,
                                            utils: this.utils
                                        })];

                                        var session = headerFlow.getSession.apply(headerFlow, messageModel).focus(this.dataConfig[i].rows[j].properties[k].rules[l]);
                                        var _section = this.dataConfig[i];
                                        var _uiElement = _section.rows[j].properties[k];
                                        session.on("error", function (data) {
                                            data.errors[0].uiConfig = _uiElement;
                                            data.errors[0].section = _section;
                                            failedRules.push(data.errors[0]);
                                            session.dispose();
                                        });

                                        session.match();
                                    }
                                    else {
                                        var messageModel = {
                                            ui: {
                                                section: this.dataConfig[i],
                                                property: this.dataConfig[i].rows[j].properties[k],
                                            },
                                            dataModel: this.dataModel,
                                            scope: currentScope,
                                            utils: this.utils
                                        };

                                        tmpRules = rulesObj.get(messageModel);
                                        tmpRule = tmpRules[this.dataConfig[i].rows[j].properties[k].rules[l]];

                                        if (angular.isDefined(tmpRule) && angular.isFunction(tmpRule.condition) && tmpRule.condition()) {
                                            //  If rule fails
                                            this.dataConfig[i].rows[j].properties[k].validate = true;
                                            failedRules.push(appendErrorString(tmpRule.result()));
                                            break;
                                        }
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
            if (angular.isDefined(this.cumulativeRules) && angular.isArray(this.cumulativeRules) && this.cumulativeRules.length > 0) {
                tmpRules = angular.isDefined(this.rules) && angular.isFunction(this.rules.get) && this.rules.get({
                    ui: {},
                    dataModel: this.dataModel,
                    scope: currentScope,
                    utils: this.utils
                });

                for (var i = 0; i < this.cumulativeRules.length; i++) {
                    if (typeof this.cumulativeRules[i] != 'string' && eval((this.cumulativeRules[i].rule).replace(/this/g, 'this.dataModel'))) {
                        failedRules.push({
                            type: 'cumulative',
                            rule: this.cumulativeRules[i].rule,
                            error: this.cumulativeRules[i].error
                        });
                    }
                    else if (isNoolsEnabled) {
                        var messageModel = [new Header({
                            ui: {},
                            dataModel: this.dataModel,
                            scope: currentScope,
                            utils: this.utils
                        })];

                        var session = headerFlow.getSession.apply(headerFlow, messageModel).focus(this.cumulativeRules[i]);

                        session.on("error", function (data) {
                            failedRules.push(data.errors[0]);
                            session.dispose();
                        });

                        session.match();
                    }
                    else {
                        tmpRule = tmpRules[this.cumulativeRules[i]];

                        if (angular.isDefined(tmpRule) && angular.isFunction(tmpRule.condition) && tmpRule.condition()) {
                            //  If rule fails
                            failedRules.push(appendErrorString(tmpRule.result()));
                            break;
                        }
                    }
                }
            }

            if (failedRules.length > 0 && failedRules[0].section) {
                failedRules[0].section.isContentLoaded = true;
                failedRules[0].section.isActive = true;
            }

            angular.forEach(failedRules, function (value, key) {
                if (value.uiConfig) {
                    value.uiConfig.validate = true;
                }
            });

            if (failedRules.length > 0 && ((failedRules[0].hasOwnProperty('uiConfig') && failedRules[0].uiConfig != undefined) || (failedRules[0].hasOwnProperty('property') && failedRules[0].property != '' && failedRules[0].property != undefined))) {
                typeof failedRules[0].uiConfig != 'undefined' ? failedRules[0].uiConfig.focus = true : failedRules[0].property.focus = true;
            }

            tmpRules = null;
            tmpRule = null;
            tmpRuleResult = null;

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
            if (this.cumulativeRules) {
                for (var i = 0; i < this.cumulativeRules.length; i++) {
                    if (eval((this.cumulativeRules[i].rule).replace(/this/g, 'this.dataModel'))) {
                        failedRules.push({
                            type: 'cumulative',
                            rule: this.cumulativeRules[i].rule,
                            error: this.cumulativeRules[i].error
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


        function changeDateFormatForNools(colDefs, virtualDatamodel, type) {
            if (colDefs != '' && type == 'cell') {
                _.each(colDefs.cloumnDefs, function (colDef) {
                    if (colDef.attributes.type == 'date') {
                        var field = colDef.field;
                        var fieldVal = field.split('.');
                        if (fieldVal.length > 1) {
                            var fieldzeroval = eval('virtualDatamodel.' + fieldVal[0]);
                            if (fieldzeroval !== undefined && fieldzeroval !== null) {
                                var dateVar = eval('virtualDatamodel.' + fieldVal[1]);
                                if (dateVar != undefined & dateVar != '')
                                    virtualDatamodel[field] = convertDate(dateVar);
                                else
                                    virtualDatamodel[field] = "";
                            }
                        }
                        else {
                            var dateVar = eval('virtualDatamodel.' + fieldVal[0]);
                            if (dateVar != undefined & dateVar != '')
                                virtualDatamodel[field] = convertDate(dateVar);
                            else
                                virtualDatamodel[field] = "";
                        }
                    }
                });
            }
            else if (colDefs != '' && type == 'grid') {
                var field = colDefs.field;
                var fieldVal = field.split('.');
                if (fieldVal.length > 1) {
                    var fieldzeroval = eval('virtualDatamodel.' + fieldVal[0]);
                    if (fieldzeroval !== undefined && fieldzeroval !== null) {
                        var dateVar = eval('virtualDatamodel.' + fieldVal[1]);
                        if (dateVar != undefined & dateVar != '')
                            virtualDatamodel[field] = convertDate(dateVar);
                        else
                            virtualDatamodel[field] = "";
                    }
                }
                else {
                    var dateVar = eval('virtualDatamodel.' + fieldVal[0]);
                    if (dateVar != undefined & dateVar != '')
                        virtualDatamodel[field] = convertDate(dateVar);
                    else
                        virtualDatamodel[field] = "";
                }
            }
        };


        function convertDate(dateVar) {
            if (typeof dateVar != 'undefined' && dateVar != null && isNaN(dateVar) && dateVar.indexOf('/Date(') > -1) {
                var res = dateVar.replace("/Date(", "");
                var datestring = res.replace(")/", "");
                var newdate = new Date(parseInt(datestring));
                return new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() + 1);
            }
            else if (typeof dateVar != 'undefined' && dateVar != null && !isNaN(dateVar) && angular.isFunction(dateVar.getFullYear)) {

                var newdate = new Date(dateVar);
                return new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() + 1);
            }
            else if (typeof dateVar != 'undefined' && dateVar != null && !isNaN(dateVar)) {
                var newdate = new Date(parseInt(dateVar));
                return new Date(newdate.getFullYear(), newdate.getMonth(), newdate.getDate() + 1);
            }
        };
    }]);
})();
(function () {
    'use strict';
	
    angular.module('SMART2').service('scrollPosition', ['$filter', '$state', function ($filter, $state) {
    	var isEnabledScroll,
    		scrollValue = [];

    	this.setEnableScroll = function (enableScroll) {
    		isEnabledScroll = enableScroll
    	}

    	this.getEnableScroll = function () {
    		return isEnabledScroll;
    	}

		this.set = function (pos, currentUrl) {
			if (scrollValue.length === 0)
				scrollValue.push({ 'scroll': pos, 'currentUrl': currentUrl });
			else {
				var foundItem = $filter('filter')(scrollValue, { 'currentUrl': currentUrl }, true)[0];
				var foundItemIndex = scrollValue.indexOf(foundItem);
				if (foundItem) {
					scrollValue.splice(foundItemIndex, 1);
					scrollValue.push({ 'scroll': pos, 'currentUrl': currentUrl });
				}
				else
					scrollValue.push({ 'scroll': pos, 'currentUrl': currentUrl });
			}
		}

		this.get = function () {
			return scrollValue;
		}

		this.performScroll = function (staticValue, aSpeed, onComplete) {
			angular.element('body,html').animate({ scrollTop: staticValue }, 3500, 'linear');
		}

		this.scrollWitgetsection = function (config) {
		    var state = $state,
                scrollToconfig;
		    setTimeout(function () {
		        if (state.previous.scrollTo && state.previous.scrollTo.state === state.current.name) {
		            scrollToconfig = config.filter(function (c) { return state.previous.scrollTo.sectionId === c.sectionId });
		            var $cont = $('#' + scrollToconfig[0].sectionKey);
		            if ($cont.length && $cont.find('.collapsible-header').hasClass('active')) {
		                var displacementItem = $cont.offset().top - angular.element('#' + scrollToconfig[0].sectionKey.split('-section')[0] + '-sortable').offset().top;

		                displacementItem = displacementItem + 62;

		                angular.element('body,html').animate({
		                    scrollTop: displacementItem
		                }, "medium");
		            } else {
		                $cont.find('.collapsible-header').trigger('click');
		            }
		        }
		    }, 100);
		}
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
                angular.element(source.closest('.modal').length > 0 ? source.closest('.modal') : 'body,html').animate({
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