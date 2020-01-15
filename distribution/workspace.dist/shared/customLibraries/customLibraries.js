var Resources = {};

(function () {
    // Adding a translation table for the English language

    // var res= eval("Resources_" + userInfo.UserBasicDetails.Culture);   //[{a:1, b:2, c:3}, {d:4, e:5}];
    // _.each(res,function(item, index, list){
    if (eval("typeof Resources$" + userInfo.UserBasicDetails.Culture.replace("-", "_")) !== 'undefined') {
        _.each(eval("Resources$" + userInfo.UserBasicDetails.Culture.replace("-", "_")), function (item, index, list) {
            Resources = _.extend(Resources, item);
        });
    } 
})();