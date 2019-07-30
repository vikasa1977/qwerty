'use strict';

angular
.module('SMART2')
.service('trackStatus', ['RESTURLs', 'httpService', '$q', trackStatus]);

function trackStatus(RESTURLs, httpService, $q) {
    this.get = get;
    this.getAll = getAll;
    this.data = {};
    function get(documentCode, documentType, instanceId, isInstanceActive, authoriseAmount, currency) {

        //append domain name and service path
        var arrURLs = new Array();

        URL = "";
        var trackStatus = [];
        trackStatus.RelatedDocument = {};
         return httpService.post(URL);

    };
    function getContent(documentCode, documentType, instanceId, isInstanceActive, authoriseAmount, currency,getAction) {

        //Set headerbar data
        switch (getAction)
        {
            case "GetRelatedDocuments":
                URL =  RESTURLs.trackStatusGetRelatedDocuments + '?bpc=NTk1NA2&oloc=107&documentCode=' + documentCode + '&documentType=' + documentType + '&outDocumentType=7';
                break;
            case "GetRelatedDocumentsDetails":
                URL =  RESTURLs.trackStatusGetRelatedDocumentsDetails + '?bpc=NTk1NA2&oloc=107&documentCode=' + documentCode + '&documentType=' + documentType + '&outDocumentType=7';
                break;
            case "GetDocumentApprovalCycle":
                URL =  RESTURLs.trackStatusGetDocumentApprovalCycle + '?bpc=NTk1NA2&oloc=107&documentCode=' + documentCode + '&documentType=' + documentType + '&outDocumentType=7';
                break;
            case "HasAccessToViewEntity":
                URL =  RESTURLs.trackStatusHasAccessToViewEntity + '?bpc=NTk1NA2&oloc=107&documentCode=' + documentCode + '&documentType=' + documentType + '&outDocumentType=7';
                break;
            case "GetTrackStatusDetailsByInstanceId":
                URL =  RESTURLs.trackStatusGetTrackStatusDetailsByInstanceId + '?bpc=NTk1NA2&oloc=107&instanceId=' + instanceId + '&documentCode=' + documentCode + '&isInstanceActive=' + isInstanceActive + '&authoriseAmount=' + authoriseAmount + '&currency=' + currency + '&docTypeId=' + documentType;
                break;
            default:
                break;
        }
        //append domain name and service path
        
        return httpService.post(URL);//, SearchPanel.criteria);



    };
    function getWorkFlowData(documentCode, documentType, instanceId, isInstanceActive, authoriseAmount, currency)
    {
        var URL = getContent(documentCode, documentType, instanceId, isInstanceActive, authoriseAmount, currency, "GetTrackStatusDetailsByInstanceId");
        return httpService.post(URL);
    }
    function getAll(documentCode, documentType, instanceId, isInstanceActive, authoriseAmount, currency) {
        var promises = [];
        switch (documentType) {
            case "7":

                promises.push(getContent(documentCode, documentType,'','','','', "GetRelatedDocuments"));
                promises.push(getContent(documentCode, documentType,'','','','', "GetRelatedDocumentsDetails"));
                promises.push(getContent(documentCode, documentType,'','','','', "GetDocumentApprovalCycle"));
                promises.push(getContent(documentCode, documentType,'','','','', "HasAccessToViewEntity"));
                promises.push(getContent(documentCode, documentType, instanceId, isInstanceActive, authoriseAmount, currency, "GetTrackStatusDetailsByInstanceId"));
               // setHeaderBarData(documentCode)
               // this.loadHeaderBar();
               // this.loadCycles(documentCode, 7);
                break;
            case 6:
                this.headerData = $GEPTrackStatus.getCatalogBasicDetailsById(documentCode);
                this.loadHeaderBarForCatalog();
                this.loadCycles(documentCode, 6);
                break;
            case 8:
               
                //$("#headBarTitle").text("Order");
                this.setHeaderBarData();
                this.loadHeaderBarForOrder();
                this.loadCycles(documentCode, 8);
                this.loadDispatchCycles(documentCode, 8);
                break;
            case 9:
                this.setHeaderBarData();
                if (this.headerData != null || this.headerData != undefined) {
                    this.loadHeaderBarForOrder();
                }
                this.loadCycles(documentCode, 9);
                this.loadInvoiceDispatchCycles(documentCode, 9);
                break;
            case 10:
                this.setHeaderBarData();
                this.loadHeaderBarForOrder();
                this.loadCycles(documentCode, 10);
                break;
            case 14:
               
                this.setHeaderBarData();
                this.loadHeaderBarForOrder();
                this.loadCycles(documentCode, 14);
                break;
            case 24:
                this.setHeaderBarData();
                this.loadHeaderBar();
                this.loadCycles(documentCode, 24);
                break;
            case 27:
                this.setHeaderBarData();
                this.loadHeaderBarForOrder();
                this.loadCycles(documentCode, 27);
                break;
            case 20:
                this.setHeaderBarData();
                this.loadHeaderBarForOrder();
                this.loadCycles(documentCode, 20);
                break;
            case 22:
                this.setHeaderBarData();
                this.loadHeaderBarForOrder();
                this.loadCycles(documentCode, 22);
                break;
            default:
               break;
        }

        //if (count > 0) {
        //    for (var i = 0; i < count; i++) {
        //        promises.push(getContent(searchValue, modules[i].ModuleName, modules[i].count));
        //    }
        //}
        //else {
        //    angular.forEach(modules, function (key, item) {

        //        promises.push(getContent(searchValue, item, key));

        //    });
        //}

        return $q.all(promises);
    }
};

