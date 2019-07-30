(function (angular) {
    'use strict';
    //angular
    //    .module('SMART2')
    //.service('myTaskOps', ['$translate', '$q', 'PLATFORMURLs', 'APPCONSTANTS', 'httpService', myTaskOpsFunc]);
    SmartController.createService('myTaskOps', ['$translate', '$q', 'PLATFORMURLs', 'APPCONSTANTS', 'httpService', myTaskOpsFunc]);

    function myTaskOpsFunc($translate, $q, PLATFORMURLs, APPCONSTANTS, httpService) {

        var allMinicardTracker;
        var filterReqObj;  // This var will contain the request object to be sent in any recent service call.
        var mostRecentTrigger;    // Variable to indicate that content to be sent in request object are modified by which particular mode of entry in the expanded landing page
        /*
        ENUM FOR BUCKETS ON MYTASK PAGE

        All=0,
        Drafts=1,
        PendingApprovals=2,
        PendingAcceptance=3,
        FollowUp=4,
        PendingReceivings=5

        Based on Group of Cards from where Mini Filtering calls are originating, 
        currentPageTitle should have appropriate value
        */

        var enumForServiceCode = {
            "all": 0,
            "drafts": 1,
            "pendingapprovals": 2,
            "pendingacceptance": 3,
            "followup": 4,
            "pendingreceivings": 5
        };

        /*
         ENUM FOR SERVICE TRIGGER MODES

         fromMiniFilter = 1,
         fromMegaFilter = 2,
         fromSavedFilter = 3,
         fromShowAll = 4

         Set on basis of the location of page from where the filterContents are applied
         This content is expected to be sent via url parameters
         It will help in deciding which http function calling service has to be invoked 
         */
        var enumForServiceTriggerCode = {
            "fromMiniFilter": 1,
            "fromMegaFilter": 2,
            "fromSavedFilter": 3,
            "fromShowAll": 4
        };

        var deferObj;
        function _initTaskReqObject() {
            return {
                "SearchRequest": {
                    "BuyerPartnerCode": APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode,
                    "ContactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
                    "GroupId": 0,
                    "PageIndex": 0,
                    "PageSize": 15,
                    "QueryTerms": null,
                    "FilterTerms": null,
                    "SortOrder": null
                }
            };
        }

        function applyMiniFilterAtCard(miniFilterSelections, cardIdentifier, successCB, failureCB) {
            var miniFilterReqObj = _initTaskReqObject();
            miniFilterReqObj.SearchRequest.PageSize = 100;  // Fetching all documents
            miniFilterReqObj.SearchRequest.FilterTerms = createReqObjQueryContents(miniFilterSelections);
            miniFilterReqObj.SearchRequest.GroupId = setGroupEnumVal(cardIdentifier);
            makeServiceCall(PLATFORMURLs.getMyTasksURL, miniFilterReqObj, successCB, failureCB);
        };

        function fetchAllCardsForBucket(cardIdentifier, successCB, failureCB) {
            var allDocsForCardReqObj = _initTaskReqObject();
            allDocsForCardReqObj.SearchRequest.PageSize = 100;  // Fetching all documents
            allDocsForCardReqObj.SearchRequest.GroupId = setGroupEnumVal(cardIdentifier);
            makeServiceCall(PLATFORMURLs.getMyTasksURL, allDocsForCardReqObj, successCB, failureCB);
        };

        this.doRequiredAction = function (allActionObj) {
            var extractParams;
            if (allActionObj.params) {
                extractParams = JSON.parse(allActionObj.params);
            }
            makeServiceCall(allActionObj.url, extractParams, null, null, allActionObj.method);
        };

        this.fetchInitialContentFor = function (successCB, failureCB) {
            var fetchReqObj = _initTaskReqObject();
            makeServiceCall(PLATFORMURLs.getMyTasksURL, fetchReqObj, successCB, failureCB);
        };

        this.initCallForMiniFilter = function (successCB, failureCB) {
            applyMiniFilterAtCard(filterReqObj["reqFilter"], filterReqObj["groupName"], successCB, failureCB);
        }

        this.initCallForWholeBucket = function (successCB, failureCB) {
            fetchAllCardsForBucket(filterReqObj["groupName"], successCB, failureCB);
        };

        this.setModeAndRequestObj = function (serviceMode, newReqObj) {
            updateRequestObj(newReqObj);
            updateServiceMode(serviceMode);
        };

        function updateServiceMode(serviceInput) {
            mostRecentTrigger = serviceInput;
        };

        function updateRequestObj(newReqObj) {
            filterReqObj = newReqObj;
        };

        this.findIndexOfGroup = function (allCardContents, groupName) {
            var groupFound = false;

            for (var h = 0; h < allCardContents.length; h++) {
                if (allCardContents[h].groupName === groupName) {
                    groupFound = true;
                    break;
                }
            }
            if (groupFound)
                return h;
            else
                return null;
        }

        function createReqObjQueryContents(filterElems) {
            var reqWithFilter = [{
                "key": "dM_Documents.documentTypeCode",
                "value": ""
            }];
            var arrToJoin = [];
            for (var t = 0; t < filterElems.length; t++) {
                arrToJoin.push(filterElems[t].key);
            }
            reqWithFilter[0].value = arrToJoin.join(",");
            return reqWithFilter;
        }

        function makeServiceCall(taskURL, reqObj, successCB, failureCB, methodType) {
            var requestObjCreator = {};
            if (taskURL) {
                requestObjCreator.url = taskURL;
                if (reqObj)
                    requestObjCreator.data = reqObj;
                if (methodType)
                    requestObjCreator.method = methodType;

                var MyTaskService = httpService.directhttp(requestObjCreator);
                MyTaskService
                .then(function (data) {
                    if (successCB) {
                        successCB(data);
                    }
                }).catch(function (errorData) {
                    if (failureCB) {
                        failureCB(errorData);
                    }
                });
            }
        }

        function setGroupEnumVal(currentBucketID) {
            var returnGroupCode = 0;
            if (currentBucketID) {
                currentBucketID = currentBucketID.toLowerCase();
                returnGroupCode = enumForServiceCode[currentBucketID];
            }
            return returnGroupCode;
        }

    };
})(angular);