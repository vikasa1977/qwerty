(function(angular) {
    'use strict';
    angular
        .module('SMART2')
        .service('favoriteOps', ['$translate', 'PLATFORMURLs', 'APPCONSTANTS', 'httpService', favoriteOpsFunc]);

    function favoriteOpsFunc($translate, PLATFORMURLs, APPCONSTANTS, httpService) {

        var allFavoritesTracker;

        /*
        [EnumMember(Value = "Task")]
        Task = 1,
        [EnumMember(Value = "Manage")]
        Manage = 2,
        [EnumMember(Value = "Create")]
        Create = 3,
        [EnumMember(Value = "Search")]
        Search = 4

        Based on Pages from where favorite calls are originating, 
        currentPageTitle/NAV should have appropriate value
        */


        function _initFavObject() {
            return {
                "ContactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                "Params": [],
                "TypeOfUserPreference": 2
            };
        }

        function getFavouritesArray(forPage) {
            if (typeof forPage === "string") {
                forPage = Number(forPage);
            }
            var allFavArr = [];
            if (allFavoritesTracker) {
                if (allFavoritesTracker.GetUserPreferencesResult.UserPreferenceDetails) {
                    if (allFavoritesTracker.GetUserPreferencesResult.UserPreferenceDetails.Favorites) {
                        var filtersForPage = _.filter(allFavoritesTracker.GetUserPreferencesResult.UserPreferenceDetails.Favorites, function (eachFav) {
                            return eachFav.NAV === forPage;
                        });

                        allFavArr = _.pluck(filtersForPage, 'FavoriteCard');
                    }
                }
         
            }
            return allFavArr;
        }

        function _deleteFromAllFavTracker(currentPageTitle, favCardIdentifier) {
            var allFavJSON = allFavoritesTracker.GetUserPreferencesResult;
            var favArr = [];
            if (allFavJSON) {
                if (allFavJSON.UserPreferenceDetails.Favorites) {
                    favArr = allFavJSON.UserPreferenceDetails.Favorites;
                    for (var w = 0; w < favArr.length; w++) {
                        if (typeof favArr[w].FavoriteCard === "string") {
                            if (favArr[w].NAV + "" === currentPageTitle && (favArr[w].FavoriteCard).toLowerCase() === favCardIdentifier) {
                                favArr.splice(w, 1);
                                break;
                            }
                        }
                    }
                    allFavJSON.UserPreferenceDetails.Favorites = favArr;
                }
            }
            allFavoritesTracker.GetUserPreferencesResult = allFavJSON;
        }

        function _addToAllFavTracker(currentPageTitle, favCardIdentifier) {
            var allFavJSON = allFavoritesTracker.GetUserPreferencesResult;

            if (allFavJSON) {
                if (allFavJSON.UserPreferenceDetails) {
                    if (allFavJSON.UserPreferenceDetails.Favorites) {
                        var favArr = allFavJSON.UserPreferenceDetails.Favorites;
                        if (favArr !== undefined || favArr !== null) {
                            allFavJSON.UserPreferenceDetails.Favorites = [];
                            favArr = [];
                        }
                        var favToAdd = {
                            "NAV": -1,
                            "FavoriteCard": ""
                        };
                        favToAdd.NAV = currentPageTitle;
                        favToAdd.FavoriteCard = favCardIdentifier;
                        // Insert only unique values in favorities allFavoritesTracker
                        if (!(_.findWhere(favArr, favToAdd))) {
                            favArr.push(favToAdd);
                        }

                        allFavoritesTracker.GetUserPreferencesResult.UserPreferenceDetails.Favorites = favArr;
                    }
                }
            }
        }

        this.addToFavorites = function(currentPageTitle, favCardIdentifier, successCB, failureCB) {
            var favReqObj = _initFavObject();
            favReqObj.Params.push(currentPageTitle + ""); // Push string, if in case number is passed
            favReqObj.Params.push(favCardIdentifier);

            var addFavsSvc = httpService.directhttp({
                "url": PLATFORMURLs.saveFavoritesData.saveFavoritesURL,
                "data": favReqObj
            });
            addFavsSvc
                .then(function(data) {
                    console.log("addFavsSvc", data);
                    if (successCB) {
                        successCB();
                    }
                })
                .catch(function(errorCallback) {
                    console.log("addFavsSvc", errorCallback);
                    /* Since Adding operation failed, deleting favorite that was wrongly added to local copy*/
                    _deleteFromAllFavTracker(currentPageTitle, favCardIdentifier);
                    if (failureCB) {
                        failureCB();
                    }
                });

            _addToAllFavTracker(currentPageTitle, favCardIdentifier);
        };

        this.removeFromFavorites = function(currentPageTitle, favCardIdentifier, successCB, failureCB) {
            var rmvReqObj = _initFavObject();
            rmvReqObj.Params.push(currentPageTitle + ""); // Push string, if in case number is passed
            rmvReqObj.Params.push(favCardIdentifier);

            var rmvFavsSvc = httpService.directhttp({
                "url": PLATFORMURLs.deleteFavoriteData.deleteFavoriteURL,
                "data": rmvReqObj
            });
            rmvFavsSvc
                .then(function(data) {
                    console.log("rmvFavsSvc", data);
                    if (successCB) {
                        successCB();
                    }
                })
                .catch(function(errorCallback) {
                    console.log("rmvFavsSvc", errorCallback);
                    /* Since Remove operation failed, adding favorite that was wrongly deleted from local copy*/
                    _addToAllFavTracker(currentPageTitle, favCardIdentifier);
                    if (failureCB) {
                        failureCB();
                    }
                });

            _deleteFromAllFavTracker(currentPageTitle, favCardIdentifier);
        };

        this.fetchServerFavorites = function(successCB, failureCB) {
            var fetchReqObj = _initFavObject();
            delete fetchReqObj.Params;
            delete fetchReqObj.TypeOfUserPreference;
            var fetchFavsSvc = httpService.directhttp({
                "url": PLATFORMURLs.getFavoritesData.getFavoritesURL,
                "data": fetchReqObj
            });
            fetchFavsSvc
                .then(function(favData) {
                    favData.GetUserPreferencesResult = JSON.parse(favData.GetUserPreferencesResult);
                    allFavoritesTracker = favData;
                    if (successCB) {
                        successCB();
                    }
                })
                .catch(function(errorCallback) {
                    //console.log("fetchFavsSvc errorCallback", errorCallback);
                    var favData = {
                        "GetUserPreferencesResult": "{\"PreferenceId\":2,\"ContactCode\":1,\"UserPreferenceDetails\":{\"Bookmarks\":[{\"Id\":0,\"Name\":\"test1\",\"URL\":\"www.smart.gep.com/-nzdi-=asnasd(0)^\\u0026!@!#*\\u0026%\\u003c\\u003e?L{}adsd\"},{\"Id\":0,\"Name\":\"test1\",\"URL\":\"www.smart.gep.com//google.com\"},{\"Id\":1,\"Name\":\"1\",\"URL\":\"text\"},{\"Id\":2,\"Name\":\"1\",\"URL\":\"text\"},{\"Id\":3,\"Name\":\"1\",\"URL\":\"text\"}],\"Favorites\":[{\"NAV\":1,\"FavoriteCard\":\"Draft\"},{\"NAV\":2,\"FavoriteCard\":\"Requisition\"}],\"LastLoginDate\":\"\\/Date(1480550400000)\\/\",\"LastloginURL\":\"http://www.smartdevgep.com/\"}}"
                    };

                    favData.GetUserPreferencesResult = JSON.parse(favData.GetUserPreferencesResult);
                    allFavoritesTracker = favData;
                    if (failureCB) {
                        failureCB();
                    }
                });
        };

        this.actionOnFavoriteChanged = function(currentPageTitle, favCardIdentifier, successCB, failureCB) {

            var foundObj = _findCurrentStateOfSelection(currentPageTitle, favCardIdentifier);
            
            var currentState = foundObj.currentState;
            if (currentState === true) { // Favorites is enabled in current display.
                this.removeFromFavorites(foundObj.currentPageTitle, foundObj.favCardIdentifier, successCB, failureCB);
                return false;
            }
            if (currentState === false) { // Favorites is disabled in current display.
                this.addToFavorites(foundObj.currentPageTitle, foundObj.favCardIdentifier, successCB, failureCB);
                return true;
            }
            // View updation should be instant for Favorites content. Hence sending returning the boolean instantly
            return null;
        };
        
        function reorderCardsAsPerFavs(cardsArrWithFav, favMarkedCards) {
            var favMarkedCards = [];
            if(cardsArrWithFav && cardsArrWithFav.length > 0){
                for(var h=0;h<cardsArrWithFav.length;h++){
                    if(cardsArrWithFav[h].isFavCard == true){
                        favMarkedCards.push(cardsArrWithFav[h]);
                        cardsArrWithFav[h] = null;
                    }
                }
                // Remove all the null marked cards
                cardsArrWithFav = _.filter(cardsArrWithFav, function (eachCard) { return eachCard !== null; });
                if(favMarkedCards.length > 0){
                    for(var j=0;j<favMarkedCards.length;j++){
                        cardsArrWithFav.unshift(favMarkedCards[j]);
                    }
                }
            }
            return cardsArrWithFav;
        }

        function getCurrentFavArrSequence(cardsArrWithFav, forceFalse){
            var isFavCardArr = [];
            if(cardsArrWithFav){
                 for(var v=0;v<cardsArrWithFav.length;v++){
                    if(forceFalse){
                        isFavCardArr.push(false);
                    }else{
                        isFavCardArr.push(cardsArrWithFav[v].isFavCard);    
                    }
                 }
            }
            return isFavCardArr;
        }

        this.shuffleCardsAsPerFavs = function (allCardsData, forPage) {
            var allFavsForThisPage = getFavouritesArray(forPage);

            var returnObj = {};
            returnObj.cardsData;
            returnObj.favsData;
            var forceAllFalse = false;

            // Delete all empty document responses of card.
            // Find if current card groupname entry is present in saved favorites
            // Restructure cards according to the new favorites list
            if(allCardsData.length > 0 && allFavsForThisPage.length > 0){
                allCardsData = angular.forEach(allCardsData, function (mval, mkey) {
                    if(mval.documents.length == 0){
                        // allGroups.splice(mkey, 1);
                        allCardsData[mkey] = null;
                    } else {
                        allCardsData[mkey].isFavCard = _.contains(allFavsForThisPage, (allCardsData[mkey].groupName).toLowerCase());
                    }
                });
               
            }else{

                forceAllFalse = true;

            }
            returnObj.cardsData = _.filter(allCardsData, function (eachCard) {
                var checkingForNullContents = true;
                if(eachCard == null ){
                    checkingForNullContents = false;
                }else{
                    if(!eachCard.documents || !(eachCard.documents.length > 0)){
                         checkingForNullContents = false;
                    }
                }
                return checkingForNullContents; 
            });

            if(!forceAllFalse){
                returnObj.cardsData = reorderCardsAsPerFavs(returnObj.cardsData);
            }
            
            returnObj.favsData = [];
            var favListArray = getCurrentFavArrSequence(returnObj.cardsData, forceAllFalse);
            for (var t = 0; t < favListArray.length; t++) {
                returnObj.favsData = this.updateIconFillingArrayForClass(favListArray[t], t, returnObj.favsData);
            }
            
            return returnObj;
        };

        this.updateIconFillingArrayForClass = function (enableFav, atIndex, wholeArray) {
            if (!wholeArray) {
                wholeArray = [];
            }
            if (enableFav) {
                // wholeArray[atIndex] = "#icon_StarFill";
                wholeArray[atIndex]= true;
            } else {
                // wholeArray[atIndex] = "#icon_Star";
                wholeArray[atIndex] = false;
            }
            return wholeArray;
        };

        function _findCurrentStateOfSelection(currentPageTitle, favCardIdentifier) {
            var allFavJSON = allFavoritesTracker.GetUserPreferencesResult;
            var returnFoundFlag = false;

            if (allFavJSON) {
                if (allFavJSON.UserPreferenceDetails) {
                    if (allFavJSON.UserPreferenceDetails.Favorites) {
                        var favArr = allFavJSON.UserPreferenceDetails.Favorites;

                        // Convert numbers to Strings
                        if (typeof currentPageTitle === "number") {
                            currentPageTitle = currentPageTitle + "";
                        }
                        if (typeof favCardIdentifier === "number") {
                            favCardIdentifier = favCardIdentifier + "";
                        }

                        // Convert Strings of bucket codes to lowercase for ease of comparison
                        if (typeof currentPageTitle === "string") {
                            currentPageTitle = currentPageTitle.toLowerCase();
                        }
                        if (typeof favCardIdentifier === "string") {
                            favCardIdentifier = favCardIdentifier.toLowerCase();
                        }

                        if (!favArr) {
                            favArr = [];
                        }
                        for (var w = 0; w < favArr.length; w++) {
                            if (typeof favArr[w].FavoriteCard === "string") {
                                if (favArr[w].NAV + "" === currentPageTitle && (favArr[w].FavoriteCard).toLowerCase() === favCardIdentifier) {
                                    returnFoundFlag = true;
                                    break;
                                }
                            }
                        }

                    }
                }
            }
        
            return { "currentState": returnFoundFlag, "favCardIdentifier": favCardIdentifier, "currentPageTitle": currentPageTitle };

        }
    };
})(angular);