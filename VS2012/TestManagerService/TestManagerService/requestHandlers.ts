///<reference path="definitions/node.d.ts"/>

//declare function require(name: string);

/// <reference path="MEIDMgrHandlers.js" />
var MEIDMgr = require("./MEIDMgrHandlers");
var counter = 0;
var TestCaseLoggerCounter = 0;
//var meid = new MEID_AutomationMgr();
//C:\Users\keith.fischer\Desktop\SQA_Automation\CostGuardUtil
//"C:\Users\keith.fischer\Desktop\SQA_Automation\CostGuardUtil\CostGuardUtil.exe"
//var rootpath="C:\\SVN\\SQA\\Automation\\Tools\\";
var rootpath="C:\\Users\\Public\\Desktop\\SQA_Automation\\";
//Dev debugC:\Users\keith.fischer\Desktop\SQA_Automation\PhoneProvisioningUtil
var nodejstestApp = rootpath + "NodeJSTest\\NodeJSTest\\bin\\Debug\\NodeJSTest";
var costGuardApp = rootpath + "CostGuardUtil\\CostGuardUtil";
var costGuardApp2 =  rootpath + "CostGuardUtil2\\CostGuardUtil";
var phoneProvApp= rootpath + "PhoneProvisioningUtil\\PhoneProvisioningPortalTestCmd";
var TestReportApp = rootpath + "EmailExchangeClientTest\\TestStatsReaderCmd\\bin\\Debug\\TestStatsReaderCmd";
var TestCaseLoggerApp = rootpath + "TestCaseLogger\\TestCaseLogger\\TestCaseLogger";

var VARS = {
    VAR: [],
    SetVar: function (key, data) {
        return;
    },
    GetVar: function (key) {
        return;
    }

}
//Automation server
//nodejstestApp="C:\\Documents and Settings\\All Users\Desktop\\SQA_Automation\\NodeJSAutomation\\NodeJSTest";
//costGuardApp="C:\\Documents and Settings\\All Users\\Desktop\\SQA_Automation\\CostGuardUtil\\CostGuardUtil";
//phoneProvApp="C:\\Documents and Settings\\All Users\\Desktop\\SQA_Automation\\PhoneProvisioningUtil\\PhoneProvisioningPortalTestCmd";

function start(response, postData, session) {
	console.log("Request handler 'start' was called.");
	
	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
		'</head>' +
		/*    '<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="ordernum" rows="10" cols="10"></textarea>'+
		'<textarea name="acctnum" rows="10" cols="10"></textarea>'+
		'<input type="submit" value="Submit ordernum" />'+
		'</form>'+
		'</body>'+
		'</html>';
		 */
		'<body>' +
		'<form action="/upload" method="post">' +
		'<p>Order Number</p>' +
		'<p> <input name="ordernum" type="text" /></p>' +
		'<p>Account Number</p>' +
		'<p> <input name="acctnum" type="text" /></p>' +
		'<p></p>' +
		'<p> ' +
		'<input type="submit" value="Submit" /></p>' +
		'</form>' +
		'</body>';
	response.writeHead(200, {
		"Content-Type" : "text/html"
	});
	response.write(body);
	response.end();
}

function upload(response, postData, session) {
	console.log("Request handler 'upload' was called.");
	console.log("postData=" + postData + "  response=" + response);
	response.writeHead(200, {
		"Content-Type" : "text/html"
	});
	response.write("Order Number: " + querystring.parse(postData)['ordernum']);
	response.write("<p></p>");
	response.write("Account Number: " + querystring.parse(postData)['acctnum']);
	response.write("<p></p>");
	response.write("<p>Logged</p>");
	response.end();
}

function RunApp(response, postData, session) {
	counter++;
	console.log("Session:" + session + ": Request handler 'RunApp' was called.");
	//var util = require('util'),
	spawn = require('child_process').spawn,
	ls = spawn(nodejstestApp, [session]);
	response.writeHead(200, {
		"Content-Type" : "text/html"
	});
	
	ls.stdout.on('data', function (data) {
		console.log('Session=' + session + ' stdout: '); //+ data);
		response.write("<p>Session=" + session + ":RunApp</p>");
		response.write(data);
	});
	
	ls.stderr.on('data', function (data) {
		console.log('Session:' + session + '. stderr: ' + data);
		response.writeHead(200, {
			"Content-Type" : "text/html"
		});
		response.write("<p>stderr:" + counter + "RunApp</p>child process exited with code " + code);
		response.end();
	});
	
	ls.on('exit', function (code) {
		console.log('Session:' + session + '- child process exited with code ' + code);
		response.write("<p>Session:" + session + " - RunApp</p>child process exited with code " + code);
		response.end();
	});
	
	console.log('Session:' + session + ' - Spawned child pid: ' + ls.pid);
	ls.stdin.end();
	//return response;
	
}

function Transaction(response, postData, session) {
	console.log(counter + "." + session + ": Request handler 'Transaction' was called.");
}

function Report(response, postData, session) {
	console.log(counter + "." + session + " - " + postData + " : Request handler 'Report' was called.");
}

function Api(response, postData, session) {
	console.log(counter + "." + session + ": Request handler 'Api' was called.");
}

function CostGuard(response, postData, session) {
    counter++;
    TestCaseLoggerCounter
	console.log("CostGuard Session:" + session);
	console.log("CostGuard postData:" + postData);
	var arg = new Array();
	arg = postData.split("%20");
	
	
	//var arg=["-order", "7032773"];//, "-output", "C:\\temp"];
	
	var util = require('util'),
	spawn = require('child_process').spawn,
	ls = spawn(costGuardApp, arg);
	response.writeHead(200, {
		"Content-Type" : "text/html"
	});
	
	ls.stdout.on('data', function (data) {
		console.log('Session=' + session ); //+ data);
		//response.write("<p>Session=" + session + ":CostGuard</p>");
		response.write(data);
	});
	
	ls.stderr.on('data', function (data) {
		console.log('Session:' + session + '. stderr: ' + data);
		response.writeHead(200, {
			"Content-Type" : "text/html"
		});
		response.write("<p>stderr:" + counter + "CostGuard</p>child process exited with code " + code);
		response.end();
	});
	
	ls.on('exit', function (code) {
		console.log('Session:' + session + '- child process exited with code ' + code);
		response.write("<p>Session:" + session + " - CostGuard</p>child process exited with code " + code);
		response.end();
	});
	
	console.log('Session:' + session + ' - Spawned child pid: ' + ls.pid);
	ls.stdin.end();
	//return response;
	
}

function PhoneProv(response, postData, session) {
	counter++;
	console.log("PhoneProv Session:" + session);
	console.log("PhoneProv postData:" + postData);
	var arg = new Array();
	arg = postData.split("%20");
	//var arg=["-order", "7032773"];//, "-output", "C:\\temp"];

	
	var util = require('util'),
	spawn = require('child_process').spawn,
	ls = spawn(phoneProvApp, arg);
	response.writeHead(200, {
		"Content-Type" : "text/html"
	});
	 
	ls.stdout.on('data', function (data) {
		console.log('Session=' + session + ' stdout: '); //+ data);
		//response.write("<p>Session=" + session + ":PhoneProvision</p>");
		response.write(data);
	});
	
	ls.stderr.on('data', function (data) {
		console.log('Session:' + session + '. stderr: ' + data);
		response.writeHead(200, {
			"Content-Type" : "text/html"
		});
		response.write("<p>stderr:" + counter + "PhoneProvision</p>child process exited with code " + code);
		response.end();
	});
	
	ls.on('exit', function (code) {
		console.log('Session:' + session + '- child process exited with code ' + code);
		response.write("<p>Session:" + session + " - PhoneProvision</p>child process exited with code " + code);
		response.end();
	});
	
	console.log('Session:' + session + ' - Spawned child pid: ' + ls.pid);
	ls.stdin.end();
	//return response;
	
}

function TestCaseLogger(response, postData, session) {
    counter++;
    console.log("TestCaseLogger Session:" + session);
    console.log("TestCaseLogger postData:" + postData);
    var arg = new Array();
    arg = postData.split("%20");


    //var arg=["-order", "7032773"];//, "-output", "C:\\temp"];

    var util = require('util'),
	spawn = require('child_process').spawn,
	ls = spawn(costGuardApp2, arg);
    response.writeHead(200, {
        "Content-Type": "text/html"
    });

    ls.stdout.on('data', function (data) {
        console.log('Session=' + session); //+ data);
        //response.write("<p>Session=" + session + ":CostGuard</p>");
        response.write(data);
    });

    ls.stderr.on('data', function (data) {
        console.log('Session:' + session + '. stderr: ' + data);
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("<p>stderr:" + counter + "TestCaseLogger</p>child process exited with code " + code);
        response.end();
    });

    ls.on('exit', function (code) {
        console.log('Session:' + session + '- child process exited with code ' + code);
        response.write("<p>Session:" + session + " - TestCaseLogger</p>child process exited with code " + code);
        response.end();
    });

    console.log('Session:' + session + ' - Spawned child pid: ' + ls.pid);
    ls.stdin.end();
    //return response;

}




function MEIDManager(response, postData, session) {
	counter++;
    
	console.log("MEIDManager Session:" + session);
	console.log("MEIDManager postData:" + postData);
	//console.log("MEIDManager response:" + response);
return;

	var meidstatus = []; //"not found";
	meidstatus.err = "not found";
	try {
	    
//	    meidstatus =  MEIDMgr.MEIDProvisionMgr(response, postData, session);
	}
	catch (err) {
	    console.log("ERR:MEIDManager=" + err); 
	}
	
    //build response page
	response.writeHead(200, {
	    "Content-Type": "text/html"
	});
	response.write("<p>MEIDManager Response</p>");
	response.write("<p>POST - " + postData + "</p>");
	response.write("Error:" + meidstatus.Error + "<br>");
	response.write("Status:" + meidstatus.Status + "<br>");
	response.write("sku:" + meidstatus.sku + "<br>");
	response.write("meid:" + meidstatus.meid + "<br>");
//	response.write("<p>orderid:" + meidstatus.ordernum + "</p>");
//	response.write("<p>meidstatus:" + meidstatus.toString() + "</p>");
	response.end();

}

function TestReport(response, postData, session) {
    counter++;
    console.log("TestReport Session:" + session);
    console.log("TestReport postData:" + postData);
    var arg = new Array();
    arg = postData.split("%20");
    //var arg=["-order", "7032773"];//, "-output", "C:\\temp"];
    //    -browser firefox -environ Stage -logpath "C:\temp\testcasefail.log" -outpath "C:\temp\ "
//    http: //localhost:8888/TestReport/-browser%20firefox%20-environ%20Stage%20-logpath%20C:%5Ctemp%5Ctestcasefail.log%20putclipboard

    var util = require('util'),
	spawn = require('child_process').spawn,
	ls = spawn(TestReportApp, arg);
    response.writeHead(200, {
        "Content-Type": "text/html"
    });

    ls.stdout.on('data', function (data) {
        console.log('Session=' + session + ' stdout: '); //+ data);
        //response.write("<p>Session=" + session + ":PhoneProvision</p>");
        response.write(data);
    });

    ls.stderr.on('data', function (data) {
        console.log('Session:' + session + '. stderr: ' + data);
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("<p>stderr:" + counter + "TestReport</p>child process exited with code " + code);
        response.end();
    });

    ls.on('exit', function (code) {
        console.log('Session:' + session + '- child process exited with code ' + code);
        response.write("<p>Session:" + session + " - TestReport</p>child process exited with code " + code);
        response.end();
    });

    console.log('Session:' + session + ' - Spawned child pid: ' + ls.pid);
    ls.stdin.end();
    //return response;

}

//http://nodemanual.org/0.6.8/nodejs_ref_guide/streams.html#streams.WritableStream
//http://stackoverflow.com/questions/8389974/how-to-run-commands-via-nodejs-child-process/8391295#8391295
//http://overapi.com/nodejs/
//start smpp client with args
//use stdin for user control like send message, exit, clear log,   set trx modes
//need to detect end of browser session and auto exit the smpp client via stdin command
function SMPP(response, postData, session) {
    counter++;
    console.log("SMPP Session:" + session);
    console.log("SMPP postData:" + postData);
    var arg = new Array();
    arg = postData.split("%20");


    //var arg=["-order", "7032773"];//, "-output", "C:\\temp"];

    var util = require('util'),
	spawn = require('child_process').spawn,
	ls = spawn(costGuardApp2, arg);
    response.writeHead(200, {
        "Content-Type": "text/html"
    });

    ls.stdout.on('data', function (data) {
        console.log('Session=' + session); //+ data);
        //response.write("<p>Session=" + session + ":CostGuard</p>");
        response.write(data);
    });

    ls.stderr.on('data', function (data) {
        console.log('Session:' + session + '. stderr: ' + data);
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("<p>stderr:" + counter + "SMPP</p>child process exited with code " + code);
        response.end();
    });

    ls.on('exit', function (code) {
        console.log('Session:' + session + '- child process exited with code ' + code);
        response.write("<p>Session:" + session + " - SMPP</p>child process exited with code " + code);
        response.end();
    });

    console.log('Session:' + session + ' - Spawned child pid: ' + ls.pid);
    ls.stdin.end();
    //return response;

}



function TargetVersion(response, postData, session) {
    counter++;

    console.log("MEIDManager Session:" + session);
    console.log("MEIDManager postData:" + postData);
    //console.log("MEIDManager response:" + response);


    var meidstatus = []; //"not found";
    meidstatus.err = "not found";
    try {

        meidstatus = MEIDMgr.MEIDProvisionMgr(response, postData, session);
    }
    catch (err) {
        console.log("ERR:MEIDManager=" + err);
    }

    //build response page
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write("<p>MEIDManager Response</p>");
    response.write("<p>POST - " + postData + "</p>");
    response.write("Error:" + meidstatus.Error + "<br>");
    response.write("Status:" + meidstatus.Status + "<br>");
    response.write("sku:" + meidstatus.sku + "<br>");
    response.write("meid:" + meidstatus.meid + "<br>");
    //	response.write("<p>orderid:" + meidstatus.ordernum + "</p>");
    //	response.write("<p>meidstatus:" + meidstatus.toString() + "</p>");
    response.end();

}

//function sleep(milliSeconds) {
//    var startTime = new Date().getTime(); // get the current time
//    while (new Date().getTime() < startTime + milliSeconds); // hog cpu
//}

exports.start = start;
exports.upload = upload;
exports.RunApp = RunApp;
exports.CostGuard = CostGuard;
exports.PhoneProv = PhoneProv;
exports.Transaction = Transaction;
exports.Report = Report;
exports.Api = Api;
exports.MEIDManager = MEIDManager;
exports.TestReport = TestReport;
exports.SMPP = SMPP;
