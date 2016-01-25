var GUI = require('nw.gui');
var MAR = require('mysql-activerecord');
var CRYPTO = require('crypto');

chrome.webRequest.onBeforeRequest.addListener(function(a,b,c,d){
	
	console.log(a,b,c,d)
}, {
	urls: ["*://*.zoomcharts-cloud.com/*"]
}, ['blocking']);