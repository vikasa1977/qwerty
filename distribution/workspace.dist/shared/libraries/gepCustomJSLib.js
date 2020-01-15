/*!
 * ASP.NET SignalR JavaScript Library v2.0.2
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies.Auction = this.createHubProxy('Auction');
        proxies.Auction.client = {};
        proxies.Auction.server = {
            changePartnerRank: function (eventDetails, notifyTo, auctionId) {
                /// <summary>Calls the ChangePartnerRank method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"auctionId\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["ChangePartnerRank"], $.makeArray(arguments)));
            },

            disconnectFromGroup: function (eventDetails, notifyTo) {
                /// <summary>Calls the DisconnectFromGroup method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["DisconnectFromGroup"], $.makeArray(arguments)));
            },

            getBestBidofLot: function (eventDetails, notifyTo) {
                /// <summary>Calls the GetBestBidofLot method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["GetBestBidofLot"], $.makeArray(arguments)));
            },

            joinGroup: function (eventDetails, notifyTo) {
                /// <summary>Calls the JoinGroup method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["JoinGroup"], $.makeArray(arguments)));
            },

            pauseResumeAction: function (eventDetails, notifyTo) {
                /// <summary>Calls the PauseResumeAction method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["PauseResumeAction"], $.makeArray(arguments)));
            },

            sendBidToAll: function (eventDetails, notifyTo, bidProxy) {
                /// <summary>Calls the SendBidToAll method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"bidProxy\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["SendBidToAll"], $.makeArray(arguments)));
            },

            updateAllStatus: function (eventDetails, notifyTo, timerData) {
                /// <summary>Calls the UpdateAllStatus method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"timerData\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["UpdateAllStatus"], $.makeArray(arguments)));
            },

            updateAuctionStatus: function (eventDetails, notifyTo, timerData) {
                /// <summary>Calls the UpdateAuctionStatus method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"timerData\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["UpdateAuctionStatus"], $.makeArray(arguments)));
            },

            updateEventStatus: function (eventDetails, notifyTo, timerData) {
                /// <summary>Calls the UpdateEventStatus method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"timerData\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["UpdateEventStatus"], $.makeArray(arguments)));
            },

            updateAuctionStepTicker: function (eventDetails, notifyTo, timerData) {
                /// <summary>Calls the UpdateEventStatus method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"timerData\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["UpdateAuctionStepTicker"], $.makeArray(arguments)));
            },

            updateAuctionRangeTicker: function (eventDetails, notifyTo, timerData) {
                /// <summary>Calls the UpdateEventStatus method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"timerData\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["UpdateAuctionRangeTicker"], $.makeArray(arguments)));
            },

            sendExtensionAlert: function (eventDetails, notifyTo, extData) {
                /// <summary>Calls the UpdateAllStatus method on the server-side Auction hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"timerData\" type=\"String\">Server side type is System.String</param>
                return proxies.Auction.invoke.apply(proxies.Auction, $.merge(["SendExtensionAlert"], $.makeArray(arguments)));
            }
        };

        proxies.FileManager = this.createHubProxy('FileManager');
        proxies.FileManager.client = {};
        proxies.FileManager.server = {
            disconnectFromGroup: function (bpc, eventCode, contactCode) {
                /// <summary>Calls the DisconnectFromGroup method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["DisconnectFromGroup"], $.makeArray(arguments)));
            },

            exportPartnerResponse: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportPartnerResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportPartnerResponse"], $.makeArray(arguments)));
            },
            exportContractDetails: function ( bpc,  documentCode,  contactCode,  fileId,  fileName,  requestType,  completeTime) {
                /// <summary>Calls the ExportPartnerResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportContractDetails"], $.makeArray(arguments)));
            },
            exportPricesheet: function (bpc, documentCode, contactCode, LotId, LotName, fileId, fileName, requestType, completeTime, IsError, ErrorMessage) {
                /// <summary>Calls the ExportPricesheet method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportPricesheet"], $.makeArray(arguments)));
            },

            exportSurvey: function (bpc, documentCode, contactCode, QuestionSetCode, QuestionSetName, fileId, fileName, requestType, completeTime, IsError, ErrorMessage) {
                /// <summary>Calls the ExportSurvey method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"QuestionSetCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"QuestionSetName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportSurvey"], $.makeArray(arguments)));
            },

            exportInitialBid: function (bpc, documentCode, contactCode, LotId, LotName, fileId, fileName, requestType, completeTime, IsError, ErrorMessage) {
                /// <summary>Calls the ExportSurvey method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"QuestionSetCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"QuestionSetName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportInitialBid"], $.makeArray(arguments)));
            },

            exportReportResponse: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportReportResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportReportResponse"], $.makeArray(arguments)));
            },

            exportSourcingBidHistory: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportSourcingBidHistory method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportSourcingBidHistory"], $.makeArray(arguments)));
            },

            exportSourcingEvent: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportSourcingEvent method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportSourcingEvent"], $.makeArray(arguments)));
            },
            SingleExportGuideline: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the SingleExportGuideline method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["SingleExportGuideline"], $.makeArray(arguments)));
            },
            SingleExportMultipleGuideline: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the SingleExportMultipleGuideline method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["SingleExportMultipleGuideline"], $.makeArray(arguments)));
            },
            UpdateEventFromExcel: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the SingleExportMultipleGuideline method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["UpdateEventFromExcel"], $.makeArray(arguments)));
            },

            exportSourcingPartnerAttachments: function (bpc, documentCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportSourcingPartnerAttachments method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportSourcingPartnerAttachments"], $.makeArray(arguments)));
            },

            exportSourcingResponse: function (bpc, eventCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportSourcingResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportSourcingResponse"], $.makeArray(arguments)));
            },

            exportPTLFileUploadResponse: function (bpc, contactCode) {
                /// <summary>Calls the ExportPTLFileUploadResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportPTLFileUploadResponse"], $.makeArray(arguments)));
            },

            importPricesheet: function (bpc, documentCode, contactCode, LotId, LotName, requestType, completeTime, IsError, ErrorMessage) {
                /// <summary>Calls the ImportPricesheet method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ImportPricesheet"], $.makeArray(arguments)));
            },

            importSurvey: function (bpc, documentCode, contactCode, QuestionSetCode, QuestionSetName, requestType, completeTime, IsError, ErrorMessage) {
                /// <summary>Calls the importSurvey method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"QuestionSetCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"QuestionSetName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ImportSurvey"], $.makeArray(arguments)));
            },

            importInitialBid: function (bpc, documentCode, contactCode, LotId, LotName, requestType, completeTime, IsError, ErrorMessage) {
                /// <summary>Calls the importSurvey method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ImportInitialBid"], $.makeArray(arguments)));
            },

            importSourcingResponse: function (bpc, eventCode, contactCode, requestType, IsError, ErrorMessage) {
                /// <summary>Calls the ImportSourcingResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ImportSourcingResponse"], $.makeArray(arguments)));
            },
            submitAllPartnerResponseForQuantitativeScorecard: function (bpc, documentCode, contactCode, QuestionSetCodes, AssesseeId) {
                /// <summary>Calls the SubmitAllPartnerResponseForQuantitativeScorecard method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"QuestionSetCodes\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"AssesseeId\" type=\"Number\">Server side type is System.Int64</param>
                return proxies['FileManager'].invoke.apply(proxies['FileManager'], $.merge(["SubmitAllPartnerResponseForQuantitativeScorecard"], $.makeArray(arguments)));
            },
            exportPricesheetComment: function (bpc, eventCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportPricesheet method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportPricesheetComment"], $.makeArray(arguments)));
            },

            ExportSourcingResponsewithOptions: function (bpc, eventCode, contactCode, fileId, fileName, requestType, hasdata) {
                /// <summary>Calls the ExportSourcingResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportSourcingResponsewithOptions"], $.makeArray(arguments)));
            },

            ExportScoringInstruction: function (bpc, eventCode, contactCode, fileId, fileName, requestType, completeTime) {
                /// <summary>Calls the ExportSourcingResponse method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportScoringInstruction"], $.makeArray(arguments)));
            },

            ExportAllPricesheet: function (bpc, documentCode, contactCode, LotId, LotName, fileId, fileName, requestType, completeTime, IsError, ErrorMessage) {
                /// <summary>Calls the ExportAllPricesheet method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"documentCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"LotName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"fileId\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"fileName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"requestType\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"completeTime\" type=\"String\">Server side type is System.String</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["ExportAllPricesheet"], $.makeArray(arguments)));
            },

            joinGroup: function (bpc, eventCode, contactCode) {
                /// <summary>Calls the JoinGroup method on the server-side FileManager hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"bpc\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"contactCode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.FileManager.invoke.apply(proxies.FileManager, $.merge(["JoinGroup"], $.makeArray(arguments)));
            }
        };

        proxies.GepChat = this.createHubProxy('GepChat');
        proxies.GepChat.client = {};
        proxies.GepChat.server = {
            broadCast: function (_BroadCastTo, Message, eventDetails, notifyTo, FromContact, FromContactName) {
                /// <summary>Calls the BroadCast method on the server-side GepChat hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"_BroadCastTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+BroadCastTo</param>
                /// <param name=\"Message\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                /// <param name=\"FromContact\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"FromContactName\" type=\"String\">Server side type is System.String</param>
                return proxies.GepChat.invoke.apply(proxies.GepChat, $.merge(["BroadCast"], $.makeArray(arguments)));
            },

            disconnectFromGroup: function (ContactCode, eventDetails, notifyTo) {
                /// <summary>Calls the DisconnectFromGroup method on the server-side GepChat hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"ContactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                return proxies.GepChat.invoke.apply(proxies.GepChat, $.merge(["DisconnectFromGroup"], $.makeArray(arguments)));
            },

            joinGroup: function (ContactCode, eventDetails, notifyTo) {
                /// <summary>Calls the JoinGroup method on the server-side GepChat hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"ContactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                return proxies.GepChat.invoke.apply(proxies.GepChat, $.merge(["JoinGroup"], $.makeArray(arguments)));
            },

            lotJoinGroup: function (ContactCode, eventDetails, notifyTo) {
                /// <summary>Calls the LotJoinGroup method on the server-side GepChat hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"ContactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"eventDetails\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails</param>
                /// <param name=\"notifyTo\" type=\"Object\">Server side type is GEP.Cumulus.NotificationHub.Entites.EventDetails+NotifyTo</param>
                return proxies.GepChat.invoke.apply(proxies.GepChat, $.merge(["LotJoinGroup"], $.makeArray(arguments)));
            },

            sendMessage: function (FromContact, Message, ToGroup, FromContactName) {
                /// <summary>Calls the SendMessage method on the server-side GepChat hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"FromContact\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"Message\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"ToGroup\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"FromContactName\" type=\"String\">Server side type is System.String</param>
                return proxies.GepChat.invoke.apply(proxies.GepChat, $.merge(["SendMessage"], $.makeArray(arguments)));
            }
        };

        proxies.GEPNotifications = this.createHubProxy('GEPNotifications');
        proxies.GEPNotifications.client = {};
        proxies.GEPNotifications.server = {
            disconnectFromGroup: function (ContactCode) {
                /// <summary>Calls the DisconnectFromGroup method on the server-side GEPNotifications hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"ContactCode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.GEPNotifications.invoke.apply(proxies.GEPNotifications, $.merge(["DisconnectFromGroup"], $.makeArray(arguments)));
            },

            joinGroup: function (ContactCode) {
                /// <summary>Calls the JoinGroup method on the server-side GEPNotifications hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"ContactCode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.GEPNotifications.invoke.apply(proxies.GEPNotifications, $.merge(["JoinGroup"], $.makeArray(arguments)));
            },

            sendReadMailNotification: function (ContactCode, RowKey, PartitionKey) {
                /// <summary>Calls the SendReadMailNotification method on the server-side GEPNotifications hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"ContactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"RowKey\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"PartitionKey\" type=\"String\">Server side type is System.String</param>
                return proxies.GEPNotifications.invoke.apply(proxies.GEPNotifications, $.merge(["SendReadMailNotification"], $.makeArray(arguments)));
            },

            sentMailNotification: function (ContactCode, Message) {
                /// <summary>Calls the SentMailNotification method on the server-side GEPNotifications hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"ContactCode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"Message\" type=\"String\">Server side type is System.String</param>
                return proxies.GEPNotifications.invoke.apply(proxies.GEPNotifications, $.merge(["SentMailNotification"], $.makeArray(arguments)));
            },

            updateEmailCount: function (who, count) {
                /// <summary>Calls the UpdateEmailCount method on the server-side GEPNotifications hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"who\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"count\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.GEPNotifications.invoke.apply(proxies.GEPNotifications, $.merge(["UpdateEmailCount"], $.makeArray(arguments)));
            }
        };

        proxies.SourcingEventWithDraw = this.createHubProxy('SourcingEventWithDraw');
        proxies.SourcingEventWithDraw.client = {};
        proxies.SourcingEventWithDraw.server = {
            disconnectFromGroup: function (groupName, contactcode) {
                /// <summary>Calls the DisconnectFromGroup method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"contactcode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["DisconnectFromGroup"], $.makeArray(arguments)));
            },

            disqualifyPartner: function (groupName, contactcode, lotId, isQualified) {
                /// <summary>Calls the DisqualifyPartner method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"contactcode\" type=\"Number\">Server side type is System.Int64</param>
                /// <param name=\"lotId\" type=\"Number\">Server side type is System.Int32</param>
                /// <param name=\"isQualified\" type=\"\">Server side type is System.Boolean</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["DisqualifyPartner"], $.makeArray(arguments)));
            },

            joinGroup: function (groupName, contactcode) {
                /// <summary>Calls the JoinGroup method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"contactcode\" type=\"Number\">Server side type is System.Int64</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["JoinGroup"], $.makeArray(arguments)));
            },

            pauseAllEventsOnServiceStop: function (groupName, timerData) {
                /// <summary>Calls the PauseAllEventsOnServiceStop method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"timerData\" type=\"String\">Server side type is System.String</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["PauseAllEventsOnServiceStop"], $.makeArray(arguments)));
            },

            revokePartner: function (groupName, legalCompanyName, revokeComments) {
                /// <summary>Calls the RevokePartner method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"legalCompanyName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"revokeComments\" type=\"String\">Server side type is System.String</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["RevokePartner"], $.makeArray(arguments)));
            },

            revokePartnerCC: function (groupName, legalCompanyName, revokeComments) {
                /// <summary>Calls the RevokePartnerCC method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"legalCompanyName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"revokeComments\" type=\"String\">Server side type is System.String</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["RevokePartnerCC"], $.makeArray(arguments)));
            },

            withDraw: function (groupName, legalCompanyName) {
                /// <summary>Calls the WithDraw method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"legalCompanyName\" type=\"String\">Server side type is System.String</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["WithDraw"], $.makeArray(arguments)));
            },
            silentwithDraw: function (groupName, legalCompanyName) {
                /// <summary>Calls the WithDraw method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"legalCompanyName\" type=\"String\">Server side type is System.String</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["silentwithDraw"], $.makeArray(arguments)));
            },
            eventCancelled: function (groupName, legalCompanyName, ContactCode) {
                /// <summary>Calls the WithDraw method on the server-side SourcingEventWithDraw hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                /// <param name=\"groupName\" type=\"String\">Server side type is System.String</param>
                /// <param name=\"legalCompanyName\" type=\"String\">Server side type is System.String</param>
                return proxies.SourcingEventWithDraw.invoke.apply(proxies.SourcingEventWithDraw, $.merge(["eventCancelled"], $.makeArray(arguments)));
            }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));