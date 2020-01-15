var StateGenerator = window.StateGenerator || (window.StateGenerator = {});
$.ajaxSetup({ cache: true });
(function(sg) {
    'use strict';

    var stateName = "";
    var stateProps = function() {};
    stateProps.prototype = {
        // url: "",
        // templateUrl: "",
        // templateProvider: function() {},
        // resolve: {},
        // controller: "",
        // controllerAs: "",
        // onEnter: function() {}
    };
    sg.stateCollection = [];
    sg.addState = addStateFunc;

    function addStateFunc($stateProvider, stateCollection) {
        console.log(arguments);
        sg.stateCollection = stateCollection;
        while (stateCollection.length > 0) {
            var stateItem;
            stateItem = stateCollection.pop();
            console.log(stateItem);
            var statePropsObj = new stateProps();
            if (stateItem.stateConfig.lazyLoadTemplate) {
                statePropsObj.templateProvider = ['$q', '$templateCache', function($q, $templateCache) {
                    console.log(this.lazyLoadTemplate);
                    var deferred = $q.defer();
                    var thisTemplateURL = this.lazyLoadTemplate.TemplateURL;
                    $.getScript(this.lazyLoadTemplate.ScriptURL)
                        .done(function(script, textStatus) {
                            template($templateCache);
                            // if ((typeof template1).toLowerCase() !== "undefined") {
                            //     template1($templateCache);
                            // } else if ((typeof template2).toLowerCase() !== "undefined") {
                            //     template2($templateCache);
                            // }
                            deferred.resolve($templateCache.get(thisTemplateURL));
                        })
                        .fail(function(jqxhr, settings, exception) {
                            deferred.reject("");
                        });
                    return deferred.promise;
                }.bind(stateItem.stateConfig)];
            }
            if (stateItem.stateConfig.lazyLoadScript) {
                statePropsObj.resolve = {
                    deps: ['$q', function($q) {
                        var childDeferList = [];
                        console.log(this.self.lazyLoadScript);
                        getScriptFunc(this.self.lazyLoadScript);
                        return $q.all(childDeferList).then(function() {
                            console.log(arguments);
                        }, function() {
                            console.log(arguments);
                        });

                        function getScriptFunc(paths) {
                            var deferred = $q.defer();
                            var currentFile = paths.pop();
                            $.getScript(currentFile)
                                .done(function(script, textStatus) {
                                    deferred.resolve();
                                })
                                .fail(function(jqxhr, settings, exception) {
                                    deferred.reject();
                                });
                            childDeferList.push(deferred.promise);
                            if (paths.length > 0) {
                                getScriptFunc(paths);
                            }
                            return deferred.promise;
                        };
                    }]
                };
            }
            stateItem.stateConfig.resolve = angular.extend({}, stateItem.stateConfig.resolve, statePropsObj.resolve);
            $stateProvider.state(stateItem.name, angular.extend({}, stateItem.stateConfig, statePropsObj));
        }
    }
})(StateGenerator);
