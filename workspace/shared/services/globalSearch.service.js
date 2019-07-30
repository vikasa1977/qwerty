'use strict';

angular
.module('SMART2')
.service('globalSearchService', ['RESTURLs', 'httpService','$q', getGlobalSearchResult]);

function getGlobalSearchResult(RESTURLs, httpService, $q) {
    this.get = get;
    this.data = {};

    this.getContents = getContents;

    function get(searchValue) {

        //append domain name and service path
        URL = "http://127.0.0.1:81/" + RESTURLs.globalSearchServiceURL ;
        var SearchPanel = [];
        SearchPanel.criteria = {};
        var searchKeyword = searchValue;
        SearchPanel.criteria.searchKeyword = searchKeyword;
        SearchPanel.criteria.Filters = new Array();
        SearchPanel.criteria.Filters.push("searchScope:all");
        SearchPanel.criteria.Filters.push("pageNumber:1");
        SearchPanel.criteria.Filters.push("module:all");
        SearchPanel.criteria.Filters.push("isGlobalSearch:true");
        SearchPanel.criteria.Filters.push("moduleScope:all");
        SearchPanel.criteria.Filters.push("noOfRecords:0");
  

        return httpService.post(URL, SearchPanel.criteria);

    };

    function getContent(searchValue, searchModule, count) {
        //append domain name and service path
        URL = "http://127.0.0.1:81/" + RESTURLs.globalSearchServiceURL;
        var SearchPanel = [];
        SearchPanel.criteria = {};
        var searchKeyword = searchValue;
        SearchPanel.criteria.searchKeyword = searchValue;
        SearchPanel.criteria.globalSearchText = searchValue;
        SearchPanel.criteria.Filters = new Array();
        SearchPanel.criteria.Filters.push("moduleScope:" + searchModule);
        SearchPanel.criteria.Filters.push("pageNumber:1");
        SearchPanel.criteria.Filters.push("noOfRecords:" + count);
        SearchPanel.criteria.Filters.push("isSeeAllResult:true");
        SearchPanel.criteria.Filters.push("sortField:SORT_Relevance|DESC");
        SearchPanel.criteria.Filters.push("fieldkey:");

        return httpService.post(URL, SearchPanel.criteria);



    };

    function getContents(modules, searchValue,count) {
        var promises = [];

        if (count > 0) {
            for (var i = 0; i < count; i++) {
                promises.push(getContent(searchValue, modules[i].ModuleName, modules[i].count));
            }
        }
        else {
            angular.forEach(modules, function (key, item) {
              
                promises.push(getContent(searchValue, item, key));
          
            });
        }
       
        return $q.all(promises);
    }

    
};