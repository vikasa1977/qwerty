/*
	The MIT License (MIT)

	Copyright (c) 2015 Simeon Cheeseman

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	@license md-date-time
	@author SimeonC
	@license 2015 MIT
	@version 0.1.0
	Github url: https://github.com/SimeonC/md-date-time
	Code Example url: http://codepen.io/SimeonC/pen/XJdWPy
*/
(function () {
	angular.module('SMART2')
.directive('timeDatePicker', [
        '$filter',
        '$sce',
        function ($filter, $sce) {
        	return {
        		restrict: 'AE',
        		replace: true,
        		scope: { _modelValue: '=ngModel' },
        		require: 'ngModel',
        		templateUrl: 'scDateTime-material.tpl',
        		link: function (scope, element, attrs, ngModel) {
        			var ref;
        			scope._mode = (ref = attrs.defaultMode) != null ? ref : 'date';
        			scope._displayMode = attrs.displayMode;
        			ngModel.$render = function () {
        				scope.date = ngModel.$modelValue != null && ngModel.$modelValue.toString() !== 'Invalid Date' ? new Date(ngModel.$modelValue) : new Date();       			
        				scope.calendar._year = scope.date.getFullYear();
        				scope.calendar._month = scope.date.getMonth();
        				return scope.clock._minutes = scope.date.getMinutes();
        			};
        			scope.save = function () {
        				return scope._modelValue = scope.date;
        			};
        			return scope.cancel = function () {
        				return ngModel.$render();
        			};
        		},
        		controller: [
                    '$scope',
                    function (scope) {
                    	scope.date = new Date();
                    	scope.display = {
                    		title: function () {
                    			if (scope._mode === 'date') {
                    				return $filter('date')(scope.date, 'EEEE h:mm a');
                    			} else {
                    				return $filter('date')(scope.date, 'MMMM d yyyy');
                    			}
                    		},
                    		'super': function () {
                    			if (scope._mode === 'date') {
                    				return $filter('date')(scope.date, 'MMM');
                    			} else {
                    				return '';
                    			}
                    		},
                    		main: function () {
                    			var scopeVal = scope._mode === 'date' ? $filter('date')(scope.date, 'd') : $filter('date')(scope.date, 'h:mm') + '<small>' + $filter('date')(scope.date, 'a') + '</small>';
                    			if (scopeVal.toString() === 'Invalid Date') return;
                    			return $sce.trustAsHtml(scope._mode === 'date' ? $filter('date')(scope.date, 'd') : $filter('date')(scope.date, 'h:mm') + '<small>' + $filter('date')(scope.date, 'a') + '</small>');
                    		},
                    		sub: function () {
                    			if (scope._mode === 'date') {
                    				return $filter('date')(scope.date, 'yyyy');
                    			} else {
                    				return $filter('date')(scope.date, 'HH:mm');
                    			}
                    		}
                    	};
                    	scope.calendar = {
                    		_month: 0,
                    		_year: 0,
                    		_months: [
                                'January',
                                'February',
                                'March',
                                'April',
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                                'November',
                                'December'
                    		],
                    		offsetMargin: function () {
                    		
                    			return new Date(this._year, this._month).getDay() * 34 + 'px';
                    		},
                    		isVisible: function (d) {
                    			return new Date(this._year, this._month, d).getMonth() === this._month;
                    		},
                    		'class': function (d) {
                    			if (new Date(this._year, this._month, d).getTime() === new Date(scope.date.getTime()).setHours(0, 0, 0, 0)) {
                    				return 'selected';
                    			} else if (new Date(this._year, this._month, d).getTime() === new Date().setHours(0, 0, 0, 0)) {
                    				return 'today';
                    			} else {
                    				return '';
                    			}
                    		},
                    		select: function (d) {
                    			return scope.date.setFullYear(this._year, this._month, d);
                    		},
                    		monthChange: function () {
                    			if (this._year == null || isNaN(this._year)) {
                    				this._year = new Date().getFullYear();
                    			}
                    			scope.date.setFullYear(this._year, this._month);
                    			if (scope.date.getMonth() !== this._month) {
                    				return scope.date.setDate(0);
                    			}
                    		}
                    	};
                    	scope.clock = {
                    		_minutes: 0,
                    		_hour: function () {
                    			var _h;
                    			_h = scope.date.getHours();
                    			_h = _h % 12;
                    			if (_h === 0) {
                    				return 12;
                    			} else {
                    				return _h;
                    			}
                    		},
                    		setHour: function (h) {
                    			if (h === 12 && this.isAM()) {
                    				h = 0;
                    			}
                    			h += !this.isAM() ? 12 : 0;
                    			if (h === 24) {
                    				h = 12;
                    			}
                    			return scope.date.setHours(h);
                    		},
                    		setAM: function (b) {
                    			if (b && !this.isAM()) {
                    				return scope.date.setHours(scope.date.getHours() - 12);
                    			} else if (!b && this.isAM()) {
                    				return scope.date.setHours(scope.date.getHours() + 12);
                    			}
                    		},
                    		isAM: function () {
                    			return scope.date.getHours() < 12;
                    		}
                    	};
                    	scope.$watch('clock._minutes', function (val) {
                    		if (val != null && val !== scope.date.getMinutes()) {
                    			return scope.date.setMinutes(val);
                    		}
                    	});
                    	scope.setNow = function () {
                    		scope.date = new Date();
                    		return this.save();
                    		 
                    	};
                    	scope._mode = 'date';
                    	scope.modeClass = function () {
                    		if (scope._displayMode != null) {
                    			scope._mode = scope._displayMode;
                    		}
                    		if (scope._displayMode === 'time') {
                    			return 'time-only';
                    		} else if (scope._displayMode === 'date') {
                    			return 'date-only';
                    		} else if (scope._mode === 'date') {
                    			return 'date-mode';
                    		} else {
                    			return 'time-mode';
                    		}
                    	};
                    	return scope.modeSwitch = function () {
                    		var ref;
                    		return scope._mode = (ref = scope._displayMode) != null ? ref : scope._mode === 'date' ? 'time' : 'date';
                    	};
                    }
        		]
        	};
        }
	]);
}.call(this));

'use strict';

angular.module('SMART2').run(['$templateCache', function ($templateCache) {

	$templateCache.put('scDateTime-material.tpl', '<div ng-class="modeClass()" class="time-date"> <div ng-click="modeSwitch()" class="display"> <div class="title">{{display.title()}}</div><div class="content"> <div class="super-title">{{display.super()}}</div><div ng-bind-html="display.main()" class="main-title"></div><div class="sub-title">{{display.sub()}}</div></div></div><div class="control"> <div class="slider"> <div class="date-control"> <div class="title"><span class="month-part">{{date | date:\'MMMM\'}}<select ng-model="calendar._month" ng-change="calendar.monthChange()" ng-options="calendar._months.indexOf(month) as month for month in calendar._months"></select></span> <input ng-model="calendar._year" ng-change="calendar.monthChange()" type="number" class="year-part"/> </div><div class="headers"> <div class="day-cell">S</div><div class="day-cell">M</div><div class="day-cell">T</div><div class="day-cell">W</div><div class="day-cell">T</div><div class="day-cell">F</div><div class="day-cell">S</div></div><div class="days"> <div ng-style="{\'margin-left\': calendar.offsetMargin()}" ng-class="calendar.class(1)" ng-show="calendar.isVisible(1)" ng-click="calendar.select(1)" class="day-cell">1</div><div ng-class="calendar.class(2)" ng-show="calendar.isVisible(2)" ng-click="calendar.select(2)" class="day-cell">2</div><div ng-class="calendar.class(3)" ng-show="calendar.isVisible(3)" ng-click="calendar.select(3)" class="day-cell">3</div><div ng-class="calendar.class(4)" ng-show="calendar.isVisible(4)" ng-click="calendar.select(4)" class="day-cell">4</div><div ng-class="calendar.class(5)" ng-show="calendar.isVisible(5)" ng-click="calendar.select(5)" class="day-cell">5</div><div ng-class="calendar.class(6)" ng-show="calendar.isVisible(6)" ng-click="calendar.select(6)" class="day-cell">6</div><div ng-class="calendar.class(7)" ng-show="calendar.isVisible(7)" ng-click="calendar.select(7)" class="day-cell">7</div><div ng-class="calendar.class(8)" ng-show="calendar.isVisible(8)" ng-click="calendar.select(8)" class="day-cell">8</div><div ng-class="calendar.class(9)" ng-show="calendar.isVisible(9)" ng-click="calendar.select(9)" class="day-cell">9</div><div ng-class="calendar.class(10)" ng-show="calendar.isVisible(10)" ng-click="calendar.select(10)" class="day-cell">10</div><div ng-class="calendar.class(11)" ng-show="calendar.isVisible(11)" ng-click="calendar.select(11)" class="day-cell">11</div><div ng-class="calendar.class(12)" ng-show="calendar.isVisible(12)" ng-click="calendar.select(12)" class="day-cell">12</div><div ng-class="calendar.class(13)" ng-show="calendar.isVisible(13)" ng-click="calendar.select(13)" class="day-cell">13</div><div ng-class="calendar.class(14)" ng-show="calendar.isVisible(14)" ng-click="calendar.select(14)" class="day-cell">14</div><div ng-class="calendar.class(15)" ng-show="calendar.isVisible(15)" ng-click="calendar.select(15)" class="day-cell">15</div><div ng-class="calendar.class(16)" ng-show="calendar.isVisible(16)" ng-click="calendar.select(16)" class="day-cell">16</div><div ng-class="calendar.class(17)" ng-show="calendar.isVisible(17)" ng-click="calendar.select(17)" class="day-cell">17</div><div ng-class="calendar.class(18)" ng-show="calendar.isVisible(18)" ng-click="calendar.select(18)" class="day-cell">18</div><div ng-class="calendar.class(19)" ng-show="calendar.isVisible(19)" ng-click="calendar.select(19)" class="day-cell">19</div><div ng-class="calendar.class(20)" ng-show="calendar.isVisible(20)" ng-click="calendar.select(20)" class="day-cell">20</div><div ng-class="calendar.class(21)" ng-show="calendar.isVisible(21)" ng-click="calendar.select(21)" class="day-cell">21</div><div ng-class="calendar.class(22)" ng-show="calendar.isVisible(22)" ng-click="calendar.select(22)" class="day-cell">22</div><div ng-class="calendar.class(23)" ng-show="calendar.isVisible(23)" ng-click="calendar.select(23)" class="day-cell">23</div><div ng-class="calendar.class(24)" ng-show="calendar.isVisible(24)" ng-click="calendar.select(24)" class="day-cell">24</div><div ng-class="calendar.class(25)" ng-show="calendar.isVisible(25)" ng-click="calendar.select(25)" class="day-cell">25</div><div ng-class="calendar.class(26)" ng-show="calendar.isVisible(26)" ng-click="calendar.select(26)" class="day-cell">26</div><div ng-class="calendar.class(27)" ng-show="calendar.isVisible(27)" ng-click="calendar.select(27)" class="day-cell">27</div><div ng-class="calendar.class(28)" ng-show="calendar.isVisible(28)" ng-click="calendar.select(28)" class="day-cell">28</div><div ng-class="calendar.class(29)" ng-show="calendar.isVisible(29)" ng-click="calendar.select(29)" class="day-cell">29</div><div ng-class="calendar.class(30)" ng-show="calendar.isVisible(30)" ng-click="calendar.select(30)" class="day-cell">30</div><div ng-class="calendar.class(31)" ng-show="calendar.isVisible(31)" ng-click="calendar.select(31)" class="day-cell">31</div></div></div><div ng-click="modeSwitch()" class="button switch-control"> <i class="icon small icon-timezone"> <svg> <use xlink:href="#icon_TimeZone"></use> </svg> </i><i class="icon small icon-calendar"> <svg> <use xlink:href="#icon_Calendar"></use> </svg> </i></div><div class="time-control"> <div class="clock"> <div class="clock-face"> <div class="center"></div><div ng-click="clock.setHour(1)" ng-class="{\'selected\': clock._hour()==1}" class="hand">1</div><div ng-click="clock.setHour(2)" ng-class="{\'selected\': clock._hour()==2}" class="hand">2</div><div ng-click="clock.setHour(3)" ng-class="{\'selected\': clock._hour()==3}" class="hand">3</div><div ng-click="clock.setHour(4)" ng-class="{\'selected\': clock._hour()==4}" class="hand">4</div><div ng-click="clock.setHour(5)" ng-class="{\'selected\': clock._hour()==5}" class="hand">5</div><div ng-click="clock.setHour(6)" ng-class="{\'selected\': clock._hour()==6}" class="hand">6</div><div ng-click="clock.setHour(7)" ng-class="{\'selected\': clock._hour()==7}" class="hand">7</div><div ng-click="clock.setHour(8)" ng-class="{\'selected\': clock._hour()==8}" class="hand">8</div><div ng-click="clock.setHour(9)" ng-class="{\'selected\': clock._hour()==9}" class="hand">9</div><div ng-click="clock.setHour(10)" ng-class="{\'selected\': clock._hour()==10}" class="hand">10</div><div ng-click="clock.setHour(11)" ng-class="{\'selected\': clock._hour()==11}" class="hand">11</div><div ng-click="clock.setHour(12)" ng-class="{\'selected\': clock._hour()==12}" class="hand">12</div></div></div><div class="buttons"> <button ng-click="clock.setAM(true)" ng-class="{\'active\': clock.isAM()}" type="button" class="btn btn-link pull-left">AM</button> <input value="30" type="number" min="0" max="59" ng-model="clock._minutes"/> <button ng-click="clock.setAM(false)" ng-class="{\'active\': !clock.isAM()}" type="button" class="btn btn-link pull-right">PM</button> </div></div></div></div><div class="buttons"> <button ng-click="setNow()" type="button" class="btn-flat">Now</button> <button ng-click="cancel()" type="button" class="modal-close btn-flat">Cancel</button> <button ng-click="save()" type="button" class="modal-close btn-flat">OK</button> </div></div>');
	$templateCache.put("shared/directives/uiElements/smartTextfield/smartTextfielddateTimeTemplate.html", "<div data-time-date-picker data-ng-model=\"current.dateModel\"></div>");
}]);

