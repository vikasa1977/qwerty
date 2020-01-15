//angular.module('SMART2').directive('smartWidgetizedSearch', function () {
//    return {
//        transclude: 'element',
//        scope: {
//            color: '='
//        },
//        restrict: 'E',
//        replace:true,
//        link: function (scope, elem, attrs) {
//            elem.bind('click', function () {

//                elem.css('background-color', 'white');

//                scope.$apply(function () {
//                    scope.color = "white";
//                });

//            });

//            elem.bind('mouseover', function () {
//                elem.css('cursor', 'pointer');
//            });

//        },
//        template: '<p style="background-color:{{color}}">Hello World!!</p>',
//    };
//});

angular.module('SMART2').directive('smartWidgetizedSearch', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ngModel: "=?",
            searchinList: "=?"
        },
        link: function (scope, elem, attrs) {
            scope.searchFlag = true;
            scope.mysearch = false;
            scope.showClose = false;

            scope.searchKeyPress = function () {
                scope.showClose = true;
            };

            scope.reset = function () {
                scope.showClose = false;
            };

            console.log("Testing : ",scope.ngModel);
            scope.ngModelTemp = [];

            
            if (scope.ngModel === true) {
            }

            scope.addItem = function (item) {
                debugger;
                if (item.isSection === false) {
                    scope.ngModel.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex].isVisible = !scope.ngModel.sections[item.sectionIndex].rows[item.rowIndex].properties[item.propertyIndex].isVisible;
                }
                else {
                    //scope.ngModel.sections[item.sectionIndex].isMandatory = !scope.ngModel.sections[item.sectionIndex].isMandatory;
                    scope.ngModel.sections[item.oldIndex].isVisible = !scope.ngModel.sections[item.oldIndex].isVisible;
                }
            };



            for (var i = 0; i < scope.ngModel.sections.length; i++) {
                scope.ngModelTemp = scope.ngModelTemp.concat(scope.ngModel.sections[i].optionalFields);
            };

            for (var j = 0; j < scope.ngModel.sections.length; j++) {
                if (!scope.ngModel.sections[j].isMandatory) {
                    scope.ngModel.sections[j].oldIndex = j;
                    scope.ngModelTemp = scope.ngModelTemp.concat(scope.ngModel.sections[j]);
                }
            };
        },
        
        templateUrl: 'shared/directives/widgetizedSearch/smartWidgetizedSearchTemplate.html',
    };
});