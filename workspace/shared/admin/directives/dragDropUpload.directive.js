(function () {
    'use strict';
    angular.module('SMART2').directive('smartDragDropUpload', ['Upload', '$timeout', 'notification', function (Upload, $timeout, notification) {
        return {
            restrict: 'AE',
            replace: true,
            link: function (scope, element, attrs) {
                scope.AddName = 'Add Name';
                //scope.newFile = scope.newFile || [];
                scope.invalidFiles = [];
                scope.progressVisible = false;

                scope.$watch('files', function () {
                    scope.upload(scope.files);
                   
                });
                scope.$watch('file', function () {
                    if (scope.file != null) {
                        scope.files = [scope.file];
                    }
                });

                scope.deleteattchmentFn = function (t,type) {
                    var t = t,
                        msg = type === 'single' ? 'Are you sure you want to delete the attachment?' : 'Are you sure you want to delete all the attachments?';
                    notification.notify({
                        type: "confirm",
                        message: msg,
                        buttons: [
                            { "title": "YES", "result": "yes" },
                            { "title": "NO", "result": "no" }
                        ]
                    }, function (response) {
                        if (response.result == 'yes') {
                            type === 'single' ? scope.newFile.splice(t, 1) : scope.newFile = [];

                           
                        }
                    });

                }
                scope.attachmentStatus = function () {
                    var d = scope.newFile;
                    if (!d.length) return false;

                    
                    //console.log("IM in")
                    var i,
                        Leng = d.length;
                    for (i = 0; i < Leng; i++) {
                        if (d[i].status === 'fail') {
                            return 'fail';
                        } else if (d[i].status === 'loading') {
                            return 'loading';
                        }
                    }
                    return 'success';
                };

                scope.log = '';

                scope.upload = function (files) {
                    if (files && files.length) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            if (!file.$error) {
                                Upload.upload({
                                    url: 'shared/admin/directives/',
                                    data: {
                                        file: file
                                    }
                                }).then(function (resp) {
                                    $timeout(function () {
                                        scope.log = resp.config.data.file.name; + '\n' + scope.log;
                                        scope.newFile.push({ 'fileName': resp.config.data.file.name.split('.')[0], 'extn': resp.config.data.file.name.split('.')[1], 'size': '500KB', status: 'success', errorMsg: "File size exceeded." });
                                        scope.removeItem = function (index) {
                                            scope.newFile.splice(index, 1);
                                            scope.invalidFiles.splice(index, 1);
                                        }
                                    }, 100);

                                    scope.progressVisible = true;
                                }, null, function (evt) {
                                    scope.progress = Math.round(evt.loaded * 100 / evt.total);
                                });
                            }
                            
                        }
                    }

                };


            },
            templateUrl: 'shared/admin/directives/dragDropUpload.html'
        };
    }]);
    /**
      * @memberof SMART2
      * @ngdoc directive
      * @name smartUploadTemplate 
      * @description This directive is useful for displaying attachment list
      * 
      * @attr {Object} downloadList: two way binded scope variable.
      *    
      * @attr {String} attachmenttype: 'writemode' | 'viewmode' -> for displaying attachment in view mode or edit mode.
      *       
      * @attr {function} addUploadcallback: 
      *    function for calling upload popup
      *       
      * @attr {function} callback: 
      *    callback function for deleting and loading of the data.

      * @example
      Dynamic:
      Controller:
          $scope.attachment = [{ "fileName": "document","extn": "doc",  "status": "fail" }];

       Usage:
          <div callback="callback(data)" add-uploadcallback="adduploadCallback(e, 'comment');" smart-upload-template download-list="attachment" attachmenttype="{{list.commenttype == 'sender' ? 'writemode' : 'viewmode'}}"></div>
      * 
    **/
    angular.module('SMART2').directive('smartUploadTemplate', [ '$timeout', 'notification', function ($timeout, notification) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                downloadList: "=",
                attachmenttype: "@",
                addBtn: "@",
                callback: "&",
                addUploadcallback: "&"
            },
            link: function (scope, element, attrs) {
                
                scope.addBtn = attrs.addBtn
                scope.deleteattchmentFn = function (t, type) {
                    var t = t,
                        msg = type === 'single' ? 'Are you sure you want to delete the attachment?' : 'Are you sure you want to delete all the attachments?';
                    notification.notify({
                        type: "confirm",
                        message: msg,
                        buttons: [
                            { "title": "YES", "result": "yes" },
                            { "title": "NO", "result": "no" }
                        ]
                    }, function (response) {
                        if (response.result == 'yes') {
                            type === 'single' ? scope.downloadList.splice(t, 1) : scope.downloadList = [];

                            if (attrs.callback) {
                                scope.callback({ data: { index: t, type: 'delete', data: scope.downloadList } })
                            }
                        }
                    });

                }
                scope.attachmentStatus = function () {
                    var d = scope.downloadList;
                    if (!d.length) return false;


                    //console.log("IM in")
                    var i,
                        Leng = d.length;
                    for (i = 0; i < Leng; i++) {
                        if (d[i].status === 'fail') {
                            return 'fail';
                        } else if (d[i].status === 'loading') {
                            return 'loading';
                        }
                    }
                    return 'success';
                };

                scope.clickcallback = function (e) {
                    if (attrs.addUploadcallback) {
                        scope.addUploadcallback({ data: e })
                    }  
                };
            },
            templateUrl: 'shared/admin/directives/uploadTemplate.html'
        };
    }]);

})();