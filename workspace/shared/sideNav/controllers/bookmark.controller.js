(function(angular) {
    'use strict';
    angular
        .module('SMART2')
        .controller('bookmarkCtrl', ['$scope', '$translate', '$rootScope', '$compile', 'httpService', 'PLATFORMURLs', 'APPCONSTANTS', 'notification', bookmarkCtrlFunc]);

    function bookmarkCtrlFunc($scope, $translate, $rootScope, $compile, httpService, PLATFORMURLs, APPCONSTANTS, notification) {
        //debugger;
        
        $scope.addBookmark = addBookmarkFunc;
        $scope.closePopup = closePopup;
        $scope.addAsBookmarkLabel = $translate.instant("add") + " " + $translate.instant("as") + " " + $translate.instant("bookmark");
        $scope.addANameLabel = $translate.instant("addAName");
        $scope.addLabel = $translate.instant("add");
        $scope.shareLabel = $translate.instant("Share");
        $scope.editLabel = $translate.instant("Edit");
        $scope.deleteLabel = $translate.instant("Delete");
        $scope.addBtnConfig = { title: $translate.instant("add") };
        $scope.cancelBtnConfig = { title: $translate.instant("cancel") };
 //       $scope.togglePopup = togglePopupFunc;
        $scope.addAsBookmarkLabel = $translate.instant("add") + " " + $translate.instant("as") + " " + $translate.instant("bookmark");
        $scope.deleteBookmark = deleteBookmarkFunc;
        $scope.shareBookmark = shareBookmarkFunc;

        $scope.closeSideBar = function () {
            $scope.$parent.$parent.$parent.$parent.$parent.$parent.$parent.hideProfileOverlayCall();
            $scope.$parent.$parent.$parent.$parent.$parent.$parent.$parent.resetPanes();
        };


        $scope.bookmarkPopupFlag1 = false;
        $scope.isAddAnnouncementClicked = false;
        $scope.addAnnouncementPopupCallback1 = function (item, tabData, evt) {
            evt.preventDefault();
            $scope.isAddAnnouncementClicked = true;
            setTimeout(function () {
                $scope.isAddAnnouncementClicked = false;
                $scope.$apply();
            }, 2000);
            $rootScope.bookmarkPopupFlag1 = true;            
            tabData.addState(item);
        }
        $scope.bookmarkEdit = false;
       
        $scope.smart = [{
            'bookMarkName': "Create Contract",
            'bookMarkUrl': '#/contract/new',
            'type': 'Smart',
        }, {
            'bookMarkName': "My RFX",
            'bookMarkUrl': '#/sourcing/rfx/new',
            'type': 'Smart',
        }, {
            'bookMarkName': "Laptops for the Team",
            'bookMarkUrl': '#/catalog/requestercatalog/search',
            'type': 'Smart',
        }, {
            'bookMarkName': "Payment Requests created by Me",
            'bookMarkUrl': '#/p2p/order/new',
            'type': 'Smart',
        }],
        $scope.external = [{
            'bookMarkName': "Create Contract",
            'bookMarkUrl': '#/contract/new',
            'type': 'External',
        }, {
            'bookMarkName': "My RFX",
            'bookMarkUrl': '#/sourcing/rfx/new',
            'type': 'External',
        }, {
            'bookMarkName': "Laptops for the Team",
            'bookMarkUrl': '#/catalog/requestercatalog/search',
            'type': 'External',
        }, {
            'bookMarkName': "Payment Requests created by Me",
            'bookMarkUrl': '#/p2p/order/new',
            'type': 'External',
        }];
       var _currentItem;
        $scope.setFavorite = function (currentItem, AllItems) {
            if (_currentItem) {
                _currentItem.isfavourite = false;
            } else {
                for (var i = 0; i < AllItems.length; i++) {
                    if (AllItems[i].isfavourite == true) {
                        AllItems[i].isfavourite = false;
                        break;
                    }
                }
            };
            if (_currentItem && (_currentItem.bookMarkName == currentItem.bookMarkName)) {
                _currentItem = currentItem;
                currentItem.isfavourite = false;
            }
            else {
                _currentItem = currentItem;
                currentItem.isfavourite = true;
            }
            Materialize.toast('"'+ currentItem.bookMarkName + '"' + ' has been marked as your homepage!', 3500);
        };
        $scope.editBookmarkPopupCallback = function (item, tabData, index) {
            $scope.bookmarkEdit = false;
            $rootScope.bookmarkPopupFlag1 = true;
           // tabData.addState(item);
            if (item.type == "Smart") {
                tabData.editState(item, index, $scope.smart);
            } else {
                tabData.editState(item, index, $scope.external);
            }
        }

        $scope.deleteBookmarkPopup = function () {
            var deleteWarn = {
                type: "warning",
                message: "Are you sure you want to delete this item ?",
                buttons: [
                    {
                        title: "Yes",
                        result: "yes"
                    },
                    {
                        title: "No",
                        result: "no"
                    }
                ]
            };
            notification.notify(deleteWarn);
        }

             

        var htmlStr = '<smart-popup template-url="shared/sideNav/views/addBookmark.html" show="{{$root.bookmarkPopup}}" type="small" style="z-index: 1003" callback="$root.closePopup"/>';

        //function togglePopupFunc() {
        //    console.log("function togglePopupFunc");
        //    var appendHTML = angular.element(htmlStr);
        //    var compiled = $compile(appendHTML);
        //    angular.element("body").append(compiled(angular.element("body").scope()));
        //    $rootScope.bookmarkPopup = true;
        //};
     

        $scope.smartExternalBookmarkData = [{
                "title": "SMART",
                "contentUrl": "shared/sideNav/views/smartBookmarkTemplate.html",
                "active": true
            },
          {
              "title": "EXTERNAL",
              "contentUrl": "shared/sideNav/views/externalBookmarkTemplate.html"
          }
        ];

        function addBookmarkFunc() {
            console.log('addBookmark ' + $scope.col);
            var reqObj = {
                "Content-Type": "application/json",
                "UserExecutionContext": APPCONSTANTS.userPreferences.UserBasicDetails
            };
            var dataObj = { "ContactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode };
            $.ajax({
                    type: 'POST',
                    url: PLATFORMURLs.getFavoritesData.getFavoritesURL,
                    headers: reqObj,
                    data: dataObj
                })
                .done(function() {
                    alert("second success");
                    console.log(arguments);
                })
                .fail(function() {
                    alert("error");
                    console.log(arguments);
                })
                .always(function() {
                    alert("finished");
                    console.log(arguments);
                });


            // var bookmarkService = httpService.directhttp({ "url": PLATFORMURLs.getFavoritesData.getFavoritesURL, reqObj });
            // bookmarkService
            //     .then(function(data) {
            //         console.log(data);
            //         _displayActions(data.GetSearchRestResult.Value);
            //     })
            //     .catch(function(errorCallback) {
            //         console.log("errorCallback...");
            //         console.log(arguments);
            //     });
            closePopup();
        };

        function deleteBookmarkFunc(data) {
            console.log('deleteBookmark ' + $scope.col);
   //         $scope.buttonsObjects.bookmark.data = _.without($scope.buttonsObjects.bookmark.data, _.findWhere($scope.buttonsObjects.bookmark.data, { bookMarkUrl: data.bookMarkUrl }));

            var reqObj = {
                "ContactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
            };
  //          var bookmarkService = httpService.directhttp({ "url": PLATFORMURLs.getFavoritesData.getFavoritesURL, reqObj });
            //bookmarkService.then(function(data) {
            //        console.log(data);
            //        _displayActions(data.GetSearchRestResult.Value);
            //    })
            //    .catch(function(errorCallback) {
            //        console.log("errorCallback...");
            //        console.log(arguments);
            //    });
            closePopup();
        };

        function editBookmarkFunc(data) {
            console.log('editBookmark ' + $scope.col);
            var reqObj = {
                "ContactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode
            };
            //var bookmarkService = httpService.directhttp({ "url": PLATFORMURLs.getFavoritesData.getFavoritesURL, reqObj });
            //bookmarkService
            //    .then(function(data) {
            //        console.log(data);
            //        _displayActions(data.GetSearchRestResult.Value);
            //    })
            //    .catch(function(errorCallback) {
            //        console.log("errorCallback...");
            //        console.log(arguments);
            //    });
            closePopup();
        };

        function shareBookmarkFunc(){

        };

        function closePopup() {
            console.log('closePopup');
            $rootScope.bookmarkPopup = false;
        };
    };
})(angular);
