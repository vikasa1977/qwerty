(function () {
    'use strict';
    angular.module('SMART2').factory('notification', ['$rootScope', function ($rootScope) {
        var Obj = {};
        Obj.show = false;
        Obj.notify = function (config, callback) {
            this.show = true;
            this.config = config;
            this.broadcastItem();
            this.resultCallBack = function (result) {
                callback(result);
            }
        }
        Obj.broadcastItem = function () {
            $rootScope.$broadcast('handleBroadcast');
        }
        return Obj;
    }]);
    angular.module('SMART2').directive('smartNotification', ['notification', '$translate', '$sce', function (notification, $translate, $sce) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                showN: "@"
            },
            link: function (scope, element, attrs) {
                scope.$on('handleBroadcast', function () {
                    scope.showN = notification.show;
                    scope.config = notification.config;
                    scope.buttons = scope.config.buttons;
                    switch (scope.config.type) {
                        case "success":
                            scope.notifyClass = 'notify-success';
                            scope.title = $translate.instant("SUCCESS") + "!";
                            scope.icon = "#icon_CircleCheck";
                            break;
                        case "error":
                            scope.notifyClass = 'notify-error';
                            scope.title = $translate.instant("ERROR") + "!";
                            scope.icon = "#icon_Exclamation";
                            break;
                        case "warning":
                            scope.notifyClass = 'notify-warning';
                            scope.icon = "#icon_Warning";
                            scope.title = $translate.instant("WARNING") + "!";
                            break;
                        case "confirm":
                            scope.notifyClass = 'notify-confirm';
                            scope.icon = "#icon_Help";
                            scope.title = $translate.instant("CONFIRMATION");
                            break;
                        case "inform":
                            scope.notifyClass = 'notify-information';
                            scope.icon = "#icon_Info";
                            scope.title = $translate.instant("INFORMATION");
                            break;
                        case "sessiontimeout":
                            scope.notifyClass = 'notify-session-timeout';
                            scope.icon = "#icon_Warning";
                            scope.title = "WARNING!";
                            break;
                        case "sessionexpire":
                            scope.notifyClass = 'notify-session-expire';
                            scope.icon = "#icon_Warning";
                            scope.title = "WARNING!";
                            break;
                    };
                    scope.message = $sce.trustAsHtml(scope.config.message);
                    scope.checkboxText = scope.config.checkMessage;
                    scope.isCheckSelect = false;
                });
                scope.showN = false;
                scope.clickCallbackFunction = function (e) {
                    scope.showN = false;
                    var responceObj = {
                        "result": e,
                        "isChecked": scope.isCheckSelect
                    }
                    notification.resultCallBack(responceObj);
                }
            },
            templateUrl: 'shared/directives/notification/notificationTemplate.html',
        }
    }]);
})();
