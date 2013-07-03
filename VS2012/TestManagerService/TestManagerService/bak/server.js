
var http = require("http");
var url = require("url");
var sessionid = 0;
var concurrent = 0;

function start(route, handle) {
	function onRequest(request, response) {
		
		var thissession = ++sessionid;
		
		var pathname1 = url.parse(request.url).pathname;
		var ss = new Array();
		ss = pathname1.split("/")
			var postData = "";
		if (ss.length > 1)
			postData = ss[2];
		var pathname = ss[1];
		if (postData === undefined)
			postData = '';
		
		console.log(++concurrent + " - Request for " + pathname + " postData - " + postData);
		
		request.setEncoding("utf8");
		
		request.addListener("data", function (postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		
		request.addListener("end", function () {
			route(handle, pathname, response, postData, thissession);
			console.log(--concurrent + " - Request for " + pathname + " END.");
			
		});
		
	}

	http.createServer(onRequest).listen(8888);
    
	console.log("Server has started.");
}

exports.start = start;
