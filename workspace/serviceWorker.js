/* global self, caches, fetch, URL, Response */
'use strict';

importScripts('/smart2ux/workspace/shared/resources/js/sw-cache-polyfill.js');

var config = {
    version: 'gorgon',
    staticCacheItems: [
        './shared/resources/css/common.min.css',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/workspace.dist/shared/libraries/platformJSLibs.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/workspace.dist/shared/libraries/sourcingJSLib.js',
        './shared/resources/js/go.js',
        './shared/resources/js/dataInspector.js',
        './shared/resources/js/ResizeMultipleTool.js',
        './shared/libraries/jquery.autocomplete.min.lib.js',
        './shared/libraries/wijmo.min.js',
        './shared/libraries/wijmo.input.min.js',
        './shared/libraries/wijmo.grid.min.js',
        './shared/libraries/wijmo.grid.filter.min.js',
        './shared/libraries/wijmo.grid.sheet.min.js',
        './shared/libraries/wijmo.angular.min.js',
        './shared/libraries/ng-ckeditor.min.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/platform/externalLibraries/ui-grid.js',
        './shared/resources/svg/icons-svg.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/locale_dist/groupedByLocales/common/common_combined.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/locale_dist/groupedByLocales/p2p/p2p_combined.js',
        './shared/resources/ckeditor/ckeditor.js',
        './shared/resources/js/labels.js',
        './shared/resources/js/slick.js',
        './shared/customLibraries/createLocaleResource.service.js',
        './shared/customLibraries/smartController.service.js',
        './shared/app/config/app.config.js',
        './shared/app/config/route.config_forLauncher.js',
        './shared/constants/paths.constants.js',
        './shared/constants/application_ux.constants.js',
        './shared/constants/shared.constants.js',
        './p2p/inv/services/scannedInvoice.service.js',
        './p2p/inv/services/shareData.service.js',
        './shared/services/log.service.js',
        './shared/services/RuleEngine.service.js',
        './shared/services/grid/jsonToGrid.service.js',
        './shared/services/Http.service.js',
        './shared/services/utilities.service.js',
        './shared/services/route.service.js',
        './shared/services/favorites.service.js',
        './shared/services/globalSearch.service.js',
        './shared/admin/services/ng.upload.file.js',
        './shared/admin/services/ng-file-upload-shim.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/platform/shared/services/services.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/platform/shared/directives/directives.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/platform/shared/directives/directivesTemplate.js',
        './shared/header/directives/smartProfileOverlay/profileOverlay.directive.js',
        './shared/services/notification.service.js',
        './shared/myTask/services/mytask.service.js',
        './shared/directives/zoom/zoom.js',
        './shared/quickAddSupplier/filter/ordinal.filter.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/workspace.dist/directives/directives.js',
        'https://gepmtstorage.blob.core.windows.net/smart2ux/distribution/workspace.dist/directives/directivesTemplate.min.js',
        './shared/directives/highchart/highcharts-ng.js',
        './spend/mapping/shared/lib/js/slick.core.js',
        './spend/mapping/shared/lib/js/slick.dataview.js',
        './spend/mapping/shared/lib/js/slick.formatters.js',
        './spend/mapping/shared/lib/js/slick.columngroup.js',
        './spend/mapping/shared/lib/js/slick.grid.js',
        './shared/libraries/pdf.compat.js',
        './shared/libraries/pdf.js',
        './index_launcher.html#/platform'

    ],
    cachePathPattern: /^\/(?:(20[0-9]{2}|about|blog|css|images|js)\/(.+)?)?$/,
    offlineImage: '<svg role="img" aria-labelledby="offline-title"'
      + ' viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">'
      + '<title id="offline-title">Offline</title>'
      + '<g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/>'
      + '<text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold">'
      + '<tspan x="93" y="172">offline</tspan></text></g></svg>',
    offlinePage: './index_launcher.html#/platform'
};


    /* global navigator, window */
    //if ('serviceWorker' in navigator) {
    //    navigator.serviceWorker.register('/smart2ux/workspace/serviceWorker.js');
    //    window.addEventListener('load', function () {
    //        if (navigator.serviceWorker.controller) {
    //            navigator.serviceWorker.controller.postMessage({ 'command': 'trimCaches' });
    //        }
    //    });
    //}

    function cacheName(key, opts) {
        return `${opts.version}-${key}`;
    }

    function addToCache(cacheKey, request, response) {
        if (response.ok) {
            var copy = response.clone();
            caches.open(cacheKey).then(cache => {
                cache.put(request, copy);
            });
        }
        return response;
    }

    function fetchFromCache(event) {
        return caches.match(event.request).then(response => {
            if (!response) {
                throw Error(`${event.request.url} not found in cache`);
            }
            return response;
        });
    }

    function offlineResponse(resourceType, opts) {
        if (resourceType === 'image') {
            return new Response(opts.offlineImage,
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
        } else if (resourceType === 'content') {
            return caches.match(opts.offlinePage);
        }
        return undefined;
    }

    self.addEventListener('install', event => {
        function onInstall(event, opts) {
            var cacheKey = cacheName('static', opts);
            return caches.open(cacheKey)
              .then(cache => cache.addAll(opts.staticCacheItems));
        }

        event.waitUntil(
          onInstall(event, config).then(() => self.skipWaiting())
        );
    });

    self.addEventListener('activate', event => {
        function onActivate(event, opts) {
            return caches.keys()
              .then(cacheKeys => {
                  var oldCacheKeys = cacheKeys.filter(key => key.indexOf(opts.version) !== 0);
                  var deletePromises = oldCacheKeys.map(oldKey => caches.delete(oldKey));
                  return Promise.all(deletePromises);
              });
        }

        event.waitUntil(
          onActivate(event, config)
            .then(() => self.clients.claim())
        );
    });

    self.addEventListener('fetch', event => {

        function shouldHandleFetch(event, opts) {
            var request = event.request;
            var url = new URL(request.url);
            var criteria = {
                matchesPathPattern: !!(opts.cachePathPattern.exec(url.pathname)),
                isGETRequest: request.method === 'GET',
                isFromMyOrigin: url.origin === self.location.origin
            };
            var failingCriteria = Object.keys(criteria)
              .filter(criteriaKey => !criteria[criteriaKey]);
            return !failingCriteria.length;
        }

        function onFetch(event, opts) {
            var request = event.request;
            var acceptHeader = request.headers.get('Accept');
            var resourceType = 'static';
            var cacheKey;

            if (acceptHeader.indexOf('text/html') !== -1) {
                resourceType = 'content';
            } else if (acceptHeader.indexOf('image') !== -1) {
                resourceType = 'image';
            }

            cacheKey = cacheName(resourceType, opts);

            if (resourceType === 'content') {
                event.respondWith(
                  fetch(request)
                    .then(response => addToCache(cacheKey, request, response))
                    .catch(() => fetchFromCache(event))
                    .catch(() => offlineResponse(resourceType, opts))
                );
            } else {
                event.respondWith(
                  fetchFromCache(event)
                    .catch(() => fetch(request))
                      .then(response => addToCache(cacheKey, request, response))
                    .catch(() => offlineResponse(resourceType, opts))
                );
            }
        }
        if (shouldHandleFetch(event, config)) {
            onFetch(event, config);
        }

    });