var SmartController = window.SmartController || (window.SmartController = {});
(function(sg) {
    'use strict';

    sg.type = "";
    sg.appName = "SMART2";
    sg.create = createFunc;
    sg.createService = createServFunc;
    

    function createFunc(name, dependencies, forceRegister) {
        if (this.type === "launcher" || forceRegister === false) {
            return angular.module(this.appName).controller(name, dependencies);
        } else {
            return angular.module(this.appName).controllerProvider.register(name, dependencies);
        }
    }
    function createServFunc(name, dependencies, forceRegister) {
        if (this.type === "launcher" || forceRegister === false) {
            return angular.module(this.appName).service(name, dependencies);
        } else {
            return angular.module(this.appName).provide.service(name, dependencies);
        }
    }
})(SmartController);
