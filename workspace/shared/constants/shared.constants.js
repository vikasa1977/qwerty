'use strict';

angular
.module('SMART2')
.constant('PLATFORMURLs', getPLATFORMURLsValues());

function getPLATFORMURLsValues() {

    var searchURLBase = "https://gepdevsmart-search.servicebus.windows.net:443/";
    var portalRestService = "https://gepdevsmart-rest.servicebus.windows.net/PortalRestService/";
    var portalRestServiceLocal = "https://gepdevsmart-rest.servicebus.windows.net/PortalRestServiceLocal2/";
    
    return {
        getMyTasksData: {
            getMyTasksURL: searchURLBase + 'search/GetSearchRest'
        },
        getFavoritesData: {
            getFavoritesURL: portalRestService + "GetUserPreferences"
        },
        saveFavoritesData: {
            saveFavoritesURL: portalRestService + "SaveUserPreferences"
        },
        deleteFavoriteData: {
            deleteFavoriteURL: portalRestService + "DeleteUserPreferencesDetails"
        }
    }
};