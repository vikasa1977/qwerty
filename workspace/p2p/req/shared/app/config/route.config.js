'use strict';

angular
    .module('SMART2')
    .constant("CONSTANTS", {
        "TABS": {
            "1": 'line',
            "2": 'accounting',
            "3": 'shipping',
            "4": 'others'
        },
        "TYPES": {
            "1": 'materials',
            "2": 'services'
        },
        "ALERT_MESSAGES": {
            "SAVE_CHANGES": "Unsaved data will be lost! Do you want to continue?",
            "SAVE_SUCCESS": "Requisition Saved Successfully",
            "SUBMIT_SUCCESS": "Requisition Submiited Successfully",
            "VALIDATION_FAILURE": "Validation failed"
        },
        "ALERT_TYPES": {
            "SUCCESS": 0,
            "FAILURE": 1,
            "WARNING": 2
        }
    })
/**
 * @ngdoc service
 * @name SMART2.config
 * @description
 * Config of SMART2 project. Among other configurations, it also contains the routing configuration.
 */
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$sceProvider', 'APPCONSTANTS', config]);

/**
 * @ngdoc method
 * @name config
 * @methodOf SMART2.config
 * @description
 * The method of the SMART2 config.
 *
 * @param {Object} $stateProvider The new $stateProvider works similar to Angular's v1 router, but it focuses purely on state.
 * @param {Object} $urlRouterProvider $urlRouterProvider has the responsibility of watching $location. When $location changes it runs through a list of rules one by one until a match is found. $urlRouterProvider is used behind the scenes anytime you specify a url in a state configuration. All urls are compiled into a UrlMatcher object. <br/><br/> There are several methods on $urlRouterProvider that make it useful to use directly in your module config.
 */
//ANGULAR UI ROUTING
function config($stateProvider, $urlRouterProvider, $translateProvider, $sceProvider, APPCONSTANTS) {
    APPCONSTANTS.userPreferences = userInfo;
    $sceProvider.enabled(false);
    //function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/requisitions/create');
    $stateProvider
        
        .state('req', {
            url: '/requisitions/{id:string}',
            templateUrl: 'p2p/req/views/requisition.html',
            controller: 'p2pRequisitionCtrl',
            controllerAs: 'p2pReq',
            resolve: {
                document: ['$http', '$stateParams', function ($http, $stateParams) {
                    var id;
                    try {
                        id = parseInt($stateParams.id);
                    }
                    catch (e) {
                        console.log('this is create request')
                    };
                    var req = {
                        method: 'POST',
                        url: nodeSvcLocation + 'req/riteaid'
                    };
                    if (id) {
                        req.method = 'GET';
                        req.url = req.url + '/' + id;
                    }
                    return $http(req).then(function (response) {
                        console.log(response);
                        return response
                    });
                }],
                config: ['$http', '$stateParams', function ($http, $stateParams) {
                    var req = {
                        method: 'GET',
                        url: nodeSvcLocation + 'settings/riteaid'
                    };
                    return $http(req).then(function (response) {
                        console.log(response);
                        return response
                    });
                }]
            }
        })

    $translateProvider.translations(userInfo.UserBasicDetails.Culture, Resources);

    $translateProvider.preferredLanguage(userInfo.UserBasicDetails.Culture);

};