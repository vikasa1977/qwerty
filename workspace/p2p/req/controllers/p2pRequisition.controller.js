'use strict';

angular
    .module('SMART2')
/**
 * @ngdoc controller
 * @name SMART2.controller:p2pReqCtrl
 * @description
 * Controller of P2P Request.
 */
    .controller('p2pRequisitionCtrl', ['$scope', '$http', '$rootScope', 'document', 'config', 'CONSTANTS', '$translate', 'reqDetailsService', 'configService', 'RuleEngine', '$state', 'httpService', 'logSvc', p2pRequisitionCtrlFunc]);

/**
 * @ngdoc method
 * @name p2pReqCtrlFunc
 * @methodOf SMART2.controller:p2pReqCtrl
 * @description
 * The method of the p2pReqCtrl controller.
 *
 * @param {Object} $scope Scope of the controller
 */
function p2pRequisitionCtrlFunc($scope, $http, $rootScope, document, config, CONSTANTS, $translate, reqDetailsService, configService, RuleEngine, $state, httpService, logSvc) {
    var bypass = { flag: false };
    var isDirty = false;
    $scope.dataModel = document.data.result;
    if ($scope.dataModel && !$scope.dataModel.items)
        $scope.dataModel.items = [];
    var unchangedVal = angular.copy($scope.dataModel);
    $scope.saveForm = saveForm;    
    $scope.submitForm = submitForm;
    configService.setDBConfig(config.data.result);
    $scope.config = configService.getUIConfig('header');
    $scope.$watch('dataModel', checkDirty, true);

    $scope.DocStatus = DocStatus;
    $scope.DocumentName = DocumentName;
    $scope.DocumentNumber = DocumentNumber;
    $rootScope.$on('$stateChangeStart', saveChangesAlert);
    $scope.GetTotalPrice = GetTotalPrice;
    $scope.GetDocVal = GetDocVal;
    $scope.GetShipping = GetShipping;
    $scope.GetTaxes = GetTaxes;
    $scope.isProrate = false;
    $scope.toggleProrate = toggleProrate;
    $scope.applyProrate = applyProrate;
    $scope.prorate = {};
    $scope.prorate.Val = GetShipping(1);

    $scope.showPopup = false;
    $scope.popUpOnHideCallback = popUpOnHideCallback;
    $scope.templateContent = "p2p/shared/views/popupTemplate.html";

    $scope.item = {};
    $scope.preselection = { key: "", title: "" };
    $scope.showCategoryComponent = false;
    $scope.selectionCallbackForCategory = selectionCallbackForCategory;
    $scope.$watch('item', itemWatch, true);
    $scope.hideCallbackForCategory = hideCallbackForCategory;

    //hack moved from itemdetails controller start
    $scope.dataModel.items.map(function (x) {
        if (x.type && x.type.id === 0)
            x.type.id = 1;
    });
    //hack moved from itemdetails controller end

    function toggleProrate() {
        $scope.isProrate = !$scope.isProrate;
    }

    function applyProrate() {
        var totalProrate = GetDocVal(1);
        $scope.dataModel.items.map(function (x) {
            if (x.type.id == 1) {
                if (totalProrate)
                    x.shippingCharges = reqDetailsService.parseNumber($scope.prorate.Val * reqDetailsService.parseNumber(x.quantity) * reqDetailsService.parseNumber(x.unitPrice) / totalProrate);
            }
        });
        toggleProrate();
    }

    function checkDirty(newVal, oldVal) {
        if (newVal && oldVal && unchangedVal && jsondiffpatch.diff(newVal, unchangedVal)) {
            $scope.prorate.Val = GetShipping(1);
            isDirty = true;
        }
    }

    function selectionCallbackForCategory(e) {
        $scope.item.id = e.key;
        $scope.item.name = e.title;
    };

    function itemWatch(newModel, oldModel) {
        if (newModel) {
            $scope.preselection.key = newModel.id;
            $scope.preselection.title = newModel.name;
        }
    }

    function hideCallbackForCategory() {
        $scope.showCategoryComponent = false;
    };

    function popUpOnHideCallback() {
        $scope.showPopup = false;
    };

    function DocumentName() {
        return getText(1);
    }

    function DocumentNumber() {
        return getText(2);
    }

    function DocStatus() {
        return getText(3);
    }

    function getText(type) {
        var txt = "";
        switch (type) {
            case 1:
                txt = $scope.dataModel.name;
                break;
            case 2:
                txt = $scope.dataModel.number;
                break;
            case 3:
                txt = $scope.dataModel.status.name;
                break;
        }
        return txt;
    }

    function onSuccess() { }

    function onSubmitSuccess() { }

    function onError() { }

    function onChangesYes(toState, toParams) {
        bypass.flag = true;
        $scope.showPopup = false;
        $state.go(toState, toParams);
    }

    function onChangesNo() {
        bypass.flag = false;
        $scope.showPopup = false;
    }

    function saveForm() {
        req.method = 'PUT';
        req.url = nodeSvcLocation + 'req/riteaid';
        req.data = angular.toJson($scope.dataModel);
        var messageObj = {};
        messageObj.button1 = {};
        messageObj.button1.text = "OK";
        $http(req).then(function (response) {
            console.log(response);
            if (!response.data.success) {
                messageObj.type = CONSTANTS.ALERT_TYPES.FAILURE;
                messageObj.message = response.data.message;
                reqDetailsService.setAlertMsg(messageObj);
                messageObj.button1.callback = onError;
            } else {
                $scope.dataModel = response.data.result;
                unchangedVal = angular.copy($scope.dataModel);
                messageObj.type = CONSTANTS.ALERT_TYPES.SUCCESS;
                messageObj.message = CONSTANTS.ALERT_MESSAGES.SAVE_SUCCESS;
                messageObj.button1.callback = onSuccess;
                reqDetailsService.setAlertMsg(messageObj);
            }
            $scope.showPopup = true;
        }, function (error) {
            messageObj.type = CONSTANTS.ALERT_TYPES.FAILURE;
            messageObj.message = error.toString();
            reqDetailsService.setAlertMsg(messageObj);
            messageObj.button1.callback = onError;
            $scope.showPopup = true;
        });
    };

//TODO: Arun to move this to constants
    var SubAppCodes = {
        Portal: 101,
        Partner: 102,
        Sourcing: 103,
        Contract: 104,
        Partner: 105,
        Reports: 106,
        P2P: 107,
        Catalog: 108,
        Repository: 109,
        WorkBench: 110,
        Template: 111
    }
    $scope.OBO_OnChange = function (e) {

        //To implement this
    };


    $scope.OBO_OnKeyPress = function (e) {
        var controller_OBO = window.location.origin + "/" + "Requisition/Manage/GetAllOnBehalfOfUsers";
        var OBOService = httpService.directhttp({ "url": controller_OBO, "params": { "oloc": SubAppCodes.P2P, "term": e.currentTarget.value } });
        OBOService
        .then(function (data) {
            var obo_data = new Array();
            for (var i = 0; i < data.length; i++) {
                var User_item = {};
                User_item.id = data[i].UserId;
                User_item.name = (data[i].FirstName + " " + data[i].LastName);
                obo_data.push(User_item);
            }
            //TODO: Yatish to make it generic to elminate usage of index to locate options
            $scope.config.sections[1].rows[0].properties[5].attributes.options = obo_data;

        })
        .catch(function (errorCallback) {
            logSvc.log(errorCallback.message);
        });

    };

    $scope.OBO_Onblur = function (e) {
        if (e.currentTarget.value != '') {
            //To implement this   
        }

    };

    function submitForm() {
        if (validateForm()) {
            req.method = 'POST';
            req.url = nodeSvcLocation + 'ord/riteaid';
            req.data = angular.toJson($scope.dataModel);
            var messageObj = {};
            $http(req).then(function (response) {
                console.log(response);
                if (!response.data.success) {
                    messageObj.type = CONSTANTS.ALERT_TYPES.FAILURE;
                    messageObj.message = response.data.message;
                    reqDetailsService.setAlertMsg(messageObj);
                    messageObj.button1.callback = onError;
                } else {
                    $scope.dataModel = response.data.result;
                    unchangedVal = angular.copy($scope.dataModel);
                    messageObj.type = CONSTANTS.ALERT_TYPES.SUCCESS;
                    messageObj.message = CONSTANTS.ALERT_MESSAGES.SUBMIT_SUCCESS;
                    reqDetailsService.setAlertMsg(messageObj);
                    messageObj.button1.callback = onSubmitSuccess;
                }
                $scope.showPopup = true;
            }, function (error) {
                messageObj.type = CONSTANTS.ALERT_TYPES.FAILURE;
                messageObj.message = error.toString();
                reqDetailsService.setAlertMsg(messageObj);
                messageObj.button1.callback = onError;
                $scope.showPopup = true;
            });
        } else {
            messageObj.type = CONSTANTS.ALERT_TYPES.FAILURE;
            messageObj.message = CONSTANTS.ALERT_MESSAGES.VALIDATION_FAILURE;
            reqDetailsService.setAlertMsg(messageObj);
            messageObj.button1.callback = onError;
            $scope.showPopup = true;
        }
    };

    function validateForm() {
        //RuleEngine.setRules($scope.config.sections, $scope.dataModel, $scope.config.rules);
        //RuleEngine.execute(function (e) {
        //    console.log(e);
        //});
        return true;
    };

    function saveChangesAlert(event, toState, toParams, fromState, fromParams) {
        if (!isDirty || bypass.flag) {
            return;
        };
        bypass.flag = false;
        var messageObj = {};
        messageObj.type = CONSTANTS.ALERT_TYPES.WARNING;
        messageObj.message = CONSTANTS.ALERT_MESSAGES.SAVE_CHANGES;
        messageObj.button1 = {};
        messageObj.button1.text = "YES";
        messageObj.button1.callback = onChangesYes.bind(undefined, toState, toParams);
        messageObj.button2 = {};
        messageObj.button2.text = "NO";
        messageObj.button2.callback = onChangesNo;
        reqDetailsService.setAlertMsg(messageObj);
        $scope.showPopup = true;
        event.preventDefault();
    };

    function GetTotalPrice() {
        var price = 0;
        $scope.dataModel.items.map(function (x) {
            price = price + (reqDetailsService.parseNumber(x.unitPrice) * reqDetailsService.parseNumber(x.quantity));
            price = price + reqDetailsService.parseNumber(x.shippingCharges);
            price = price + reqDetailsService.parseNumber(x.otherCharges) + reqDetailsService.parseNumber(x.taxes);
        });
        return reqDetailsService.parseNumber(price);
    };

    function GetDocVal(type) {
        var price = 0;
        $scope.dataModel.items.map(function (x) {
            if (!type || (type && type === x.type.id))
                price = price + (reqDetailsService.parseNumber(x.unitPrice) * reqDetailsService.parseNumber(x.quantity));
        });
        return reqDetailsService.parseNumber(price);
    };

    function GetShipping(type) {
        var price = 0;
        $scope.dataModel.items.map(function (x) {
            if (!type || (type && type === x.type.id))
                price = price + reqDetailsService.parseNumber(x.shippingCharges);
        });
        return price;
    };

    function GetTaxes() {
        var price = 0;
        $scope.dataModel.items.map(function (x) {
            price = price + reqDetailsService.parseNumber(x.otherCharges) + reqDetailsService.parseNumber(x.taxes);
        });
        return reqDetailsService.parseNumber(price);
    };

};


