(function (a) {
    "use strict";
    var app = angular.module("SMART2");
    app.factory("$notification", ["$timeout", smartNotification]);

    function smartNotification($timeout) {
        return {
            timeoutID: null,
            init: function (t) {
                var _this = this;
                if (this.timeoutID !== null) {
                    this.killed = false;
                    this.pause = false;
                    clearTimeout(this.timeoutID);
                    this.call();
                } else {
                    setTimeout(function () {
                        this.toastMessage(t);
                    }.bind(this), 4000);

                    $(window).focus(function () {
                        _this.resume()
                    }).blur(function () {
                        _this.pause = true;
                    });
                }
            },
            toastMessage: function (t) {
                this.timeout = this.timeout ? this.timeout : t;
                if (!this.pause && !this.killed) {
                    // Materialize.toast('Document Autosaved Successfully!!', 1000);
                    this.call(this.timeout);
                } else {
                    clearTimeout(this.timeoutID);
                }
            },
            call: function (t) {
                this.timeout = this.timeout ? this.timeout : t;
                this.timeoutID = setTimeout(function () { this.toastMessage() }.bind(this), this.timeout);
                //console.log(this.timeoutID);
            },
            pause: false,
            resume: function () {
                if (this.pause && !this.killed) {
                    this.pause = false;
                    clearTimeout(this.timeoutID);
                    this.call();
                }
            },
            kill: function () {
                if (this.timeoutID) {
                    this.killed = true;
                    clearTimeout(this.timeoutID);
                }
            }
        };
    }
})(angular);