(function (angular) {
    angular
	    .module('SMART2')
	    .service('storeTempService', storeTempServiceFunc);
    function storeTempServiceFunc() {
        this.storage = {};

        this.get = function (name) {
            return this.storage;
        };
        this.set = function (value) {
            this.storage = value;
        };

    };
})(angular);
