'use strict';

angular
.module('SMART2')
.constant('RESTURLs', getRESTURLsValues());

function getRESTURLsValues(){
	var urls = {};
	urls.userData = "http://jsonplaceholder.typicode.com/posts/:userId";
	urls.testPost = "http://jsonplaceholder.typicode.com/posts";
	urls.globalSearchServiceURL = "Controls/BaseSearch/GetSearchResultForWeb";
	urls.P2pServiceURL = "http://localhost:3000/p2p/";
    // Below URL will be used in track status
    // These are the P2P 1.0 controller
	urls.trackStatusGetRelatedDocuments = "/Common/ManageCommon/GetRelatedDocuments";
	urls.trackStatusGetRelatedDocumentsDetails = "/Common/ManageCommon/getRelatedDocumentsDetails";
	urls.trackStatusGetDocumentApprovalCycle = "/Common/ManageCommon/GetDocumentApprovalCycle";
	urls.trackStatusHasAccessToViewEntity = "/Common/ManageCommon/HasAccessToViewEntity";
	urls.trackStatusGetTrackStatusDetailsByInstanceId = "/Common/ManageCommon/GetTrackStatusDetailsByInstanceId";
	urls.trackStatusGetDispatchDetails = "/Common/ManageCommon/GetApprovalWorkFlow";
	urls.trackStatusGetDispatchDetailsOrder = "/Order/ManageOrder/GetDispatchDetails";
	urls.trackStatusGetDispatchDetailsInvoice = "/Invoice/ManageInvoice/GetDispatchDetails";    
    return urls;
};