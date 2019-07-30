(function (angular) {
    'use strict';

    angular
    .module('SMART2')
    .service('commonUtilities', ['$translate', 'APPCONSTANTS', '$timeout', commonUtilitiesFunc])
    .filter('nineplus', plusRoundOffFunc);

    function commonUtilitiesFunc($translate, APPCONSTANTS, $timeout) {
        this.translateDocumentKeys = function (allGroups, deleteEmpty) {
            if (allGroups.length == 0)
                return;
            allGroups = angular.forEach(allGroups, function (mval, mkey) {
                if (deleteEmpty && mval.documents.length == 0) {
                    // allGroups.splice(mkey, 1);
                    allGroups[mkey] = null;
                } else {
                    mval.translatedGroupname = $translate.instant(mval.groupName.toLowerCase());
                    // Translation of keys within document 
                    angular.forEach(mval.documents, function (docVal, docKey) {
                        // var eachDoc = docVal.document;
                        var eachDoc = docVal;
                        eachDoc.translatedStatus = $translate.instant(eachDoc.status);
                        angular.forEach(eachDoc.attributes, function (attrVal, attrKey) {
                            attrVal.translatedKey = $translate.instant(attrVal.key);
                        });
                        angular.forEach(eachDoc.actions, function (actionVal, actionKey) {
                            actionVal.translatedAction = $translate.instant(actionVal.key);
                        });
                        mval.documents[docKey] = eachDoc;
                    });

                    // Translation of Filters within document 
                    angular.forEach(mval.filters, function (filterVal, filterKey) {
                        var eachFilter = filterVal;
                        eachFilter.translatedFilterKey = $translate.instant(eachFilter.key);
                        eachFilter.translatedFilterValue = $translate.instant(eachFilter.value);
                        // mval.filters[filterKey] = eachFilter;
                    });
                }

            });
            allGroups = _.filter(allGroups, function (eachGroup) {
                return eachGroup !== null;
            });
            return allGroups;
        }

        this.translateConfirmationPopup = function () {
            var returnObj = {};
            returnObj.displayTitle = $translate.instant("confirm");
            returnObj.displayAffirmative = $translate.instant("yes");
            returnObj.displayNegative = $translate.instant("no");
            returnObj.displayContent = $translate.instant("confirmationmessage");
            return returnObj;
        };

        this.uniqueIDGenerator = function () {
            var d = new Date().getTime();
            var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uniqueID;
        };

        this.setValue = function (docType) {
            if (docType) {
                docType = docType.toLowerCase();
                var docImg = APPCONSTANTS.doctypeImages;
                return "#icon_" + docImg[docType];
            }
        };

        this.setBucketImage = function (CardTypeName) {
            if (CardTypeName) {
                CardTypeName = CardTypeName.toLowerCase();
                var CardImg = APPCONSTANTS.docStateImages;
                return "#icon_" + CardImg[CardTypeName];
            }
        };
        this.setBucketColor = function (CardTypeName) {
            if (CardTypeName) {
                CardTypeName = CardTypeName.toLowerCase();
                var CardImg = APPCONSTANTS.docStateColors;
                return "card-header " + CardImg[CardTypeName];
            }
        };
        this.setValueColor = function (docType) {
            if (docType) {
                docType = docType.toLowerCase();
                var docColor = APPCONSTANTS.doctypeColors;
                return "icon iconSmall circle " + docColor[docType];
            }
        };
        this.replaceOrAddParticularCard = function (allCardsData, replacementCard, forceAdd) {
            var replacementFound = false;
            if (replacementCard) {
                if (replacementCard.length !== 1) {
                    return null; // search results of replacement card value on mytask filter applying is returning more than one entry value. Hence returning null to controller
                }
                var allCardRef = allCardsData;
                for (var w = 0; w < allCardRef.length && !forceAdd; w++) {
                    if (_.isEqual(allCardRef[w].groupName, replacementCard[0].groupName)) {
                        replacementFound = true;
                        break;
                    }
                }
                if (replacementFound) {
                    allCardsData[w] = replacementCard[0];
                } else if (forceAdd) {
                    allCardsData.push(replacementCard[0]);
                } else if (!replacementFound) {
                    return null;
                }
                return allCardsData;
            }
            return null;
        };
        this.swapArrayElements = function (arr, indexA, indexB) {
            var temp = arr[indexA];
            arr[indexA] = arr[indexB];
            arr[indexB] = temp;
        };

        this.callTimeout = function (funcnToCall, timeoutDuration) {
            if (!timeoutDuration) {
                timeoutDuration = 0;
            }
            $timeout(function () {
                funcnToCall();
            }, timeoutDuration);
        };
        
        this.capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
    }

    function plusRoundOffFunc() {
        return function (noToRound, mode) {
            if (!mode) {
                mode = 3;
            }
            if (mode > 0) {
                if (mode === 3 && noToRound > 999) {
                    return "'999+'";
                }
                else if (mode === 2 && noToRound > 99) {
                    return "'99+'";
                }
                else if (mode === 1 && noToRound > 9) {
                    return "'9+'";
                }
                else {
                    return noToRound;
                }
            } else {
                return noToRound;
            }
        }
    }
})(angular);
