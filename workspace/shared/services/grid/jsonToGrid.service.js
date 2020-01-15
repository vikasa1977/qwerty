var nonClickableColums = [];

/*
 *  NOTE: columns/data mapping keys mentioned in nonClickableColums will not be clickable even if 
 *  they are supposed to if the device type is mobile
 */  

angular.module('SMART2').service("jsonToGrid", [function($translate) {
    this.obtainHeaderData = function (inputjson, clickableColumns) {
        return inputjson;
        var massagedInputJson = [];
        for (var i = 0; i < inputjson.length; i++) {
            if ((inputjson[i].hasOwnProperty('visible') && inputjson[i].visible == true) || (inputjson[i].hasOwnProperty('Visible') && inputjson[i].Visible == true)) {
                $translate.instant(inputjson[i].title);
                massagedInputJson.push(inputjson[i]);
            }
        }
        return massagedInputJson;
    };
}]);
