(function (angular) {
    'use strict';
    angular.module('SMART2').directive('documentRoute', ['$timeout', '$http', '$compile', '$templateCache', 'APPCONSTANTS', 'routeSvc', function ($timeout, $http, $compile, $templateCache, APPCONSTANTS, routeSvc) {
        return {
            restrict: 'AE',
            scope: {
                linker: "="
            },
            link: function (scope, element, attrs) {

                var onDemandLoadedTemplateForProduct;
                var emptyCreateConfig = {
                    "msg": "",
                    "options": []
                }, defaultConfig;
                getDefaultJson();
                var dataMapperReq;
                function getDefaultJson() {
                    var getRespond = {
                        method: 'GET',
                        url: APPCONSTANTS.userPreferences.URLs.ContentURL + 'smartcontent/clientConfig/create/config.json'
                    };
                    if (!dataMapperReq) {
                        dataMapperReq = $http(getRespond).then(function (response) {
                            defaultConfig = response.data['createConfig'];
                        }, function (error) {
                            console.log(JSON.stringify(error));
                        });
                    }
                }
                function includeOnDemandTemplate(url, docID) {
                    if (url) {
                        element.append($compile($templateCache.get(url))(scope));
                        onDemandLoadedTemplateForProduct = docID;
                    }
                };

                scope.isCreationActive = false;
                scope.animateDelayFlag = false;
                scope.animationRemoved = false;
                var callCreationPhase = function (config) {
                    var configuration = config;
                    scope.creationPhaseConfiguration = configuration.options;
                    scope.creationMsg = configuration.msg;
                    openOverlay();
                }

                scope.closeCreationPhase = function (result, e) {
                    e.stopPropagation();
                    if (typeof result == "object" && result.disable === false) {
                        (result.url) ? redirection(result.url) : (scope.linker.callback) ? scope.linker.callback(result) : null;
                    }
                    closeOverlay();
                }

                function redirection(url) {
                    routeSvc.goTo(url);
                }

                function removeOnDemandCreatedTemplate() {
                    onDemandLoadedTemplateForProduct = null;
                    element.find("[ng-controller]").remove();
                }

                function closeOverlay() {
                    scope.animateDelayFlag = false;
                    $timeout(function () {
                        scope.isCreationActive = false;
                    });
                }

                function openOverlay() {
                    scope.isCreationActive = true;
                    scope.animationRemoved = true;
                    scope.animateDelayFlag = true;
                    $timeout(function () {
                        scope.animationRemoved = false;
                    });
                }

                function evaluateLinkerBindings(config) {
                    _.each(config, function (value, key, object) {
                        epressionBinder(value, key, object);
                        if (key == "options") {
                            _.each(config.options, function (value, key, object) {
                                _.each(value, function (value, key, object) {
                                    epressionBinder(value, key, object);
                                })
                            })
                        }
                    });
                    return config;
                }

                function epressionBinder(value, key, object) {
                    if (typeof value === "string" && value.indexOf("(") > -1 && angular.isFunction(scope.linker[value.split("(")[0]])) {
                        object[key] = scope.linker[value.split("(")[0]](object);
                    }
                }

                function checkForRedirectionOnParentLevel(product) {
                    var config = angular.copy((typeof _clientSpecificConfigSettings !== 'undefined' && _clientSpecificConfigSettings['createConfig'][product.docID]) ? _clientSpecificConfigSettings['createConfig'][product.docID] : defaultConfig ? defaultConfig[product.docID] : defaultConfig);
                    if (config) {
                        if (product.docID != onDemandLoadedTemplateForProduct) {
                            removeOnDemandCreatedTemplate();
                            includeOnDemandTemplate(config.onDemandTemplate, product.docID);
                        }
                        config = evaluateLinkerBindings(config);
                        if (product.href && !config.url) {
                            config.url = product.href;
                        }
                        if (config.url) {
                            redirection(config.url);
                        } else {
                            callCreationPhase(config);
                        }
                    }
                    else {
                        redirection(product.href);
                    }
                };

                if (scope.linker) {
                    scope.linker.setActiveProduct = function (product) {
                        checkForRedirectionOnParentLevel(product);
                    }
                    scope.linker.closeCreateOverlay = function () {
                        closeOverlay();
                    }
                    scope.linker.openCreateOverlay = function () {
                        openOverlay();
                    }
                }

            },
            templateUrl: 'shared/directives/documentRoute/documentRouteTemplate.html'
        };
    }]);
})(angular);