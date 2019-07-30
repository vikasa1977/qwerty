'use strict';

angular
.module('SMART2')
.service('logSvc', ['$log', logSvcFunc]);

function logSvcFunc($log){
  	this.log = log;

  	function log(msg){
  		$log.log(msg);
  		newrelic.addPageAction('Error logged',{user:'user01', message:msg});
  	};
};