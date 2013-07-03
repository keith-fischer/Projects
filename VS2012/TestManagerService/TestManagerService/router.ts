///<reference path="definitions/node.d.ts"/>


function route(handle, pathname, response, postData, session) {
    console.log(session + " - Request: " + pathname + " - postData: " + postData);
    
	//response.write("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		try {
			console.log(session + " - Starting " + pathname + " - " + postData);
			response = handle[pathname](response, postData, session);
		} catch (e) {
			console.log(session + " ERROR: " + pathname + " - " + postData);
			response.writeHead(401, {
				"Content-Type" : "text/html"
			});
			response.write("ERROR: 401 " + pathname);
			response.end();
		}
		
	} else {
		console.log(session + " No request handler found for " + pathname + " - " + postData);
		response.writeHead(404, {
			"Content-Type" : "text/html"
		});
		response.write("404 Not found");
		response.end();
		
	}
	return response;
}

exports.route = route;
