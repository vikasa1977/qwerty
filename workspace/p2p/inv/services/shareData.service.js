(function() {
    angular.module('SMART2').service('shareData', shareDataFunc);

    function shareDataFunc() {
        return {
            typeChanged: function (value) {
                this.getType(value);
            },
            getType: function () { }
        };
    }
})();
