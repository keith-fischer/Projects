/*globals _comma_separated_list_of_variables_*/
///<reference path="definitions/node.d.ts"/>



var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
//declare function require(name: string);

var handle = {};

handle["/"] = requestHandlers.start;
handle["start"] = requestHandlers.start;
handle["upload"] = requestHandlers.upload;
handle["RunApp"] = requestHandlers.RunApp;
handle["CostGuard"] = requestHandlers.CostGuard;
handle["Transaction"] = requestHandlers.Transaction;
handle["Report"] = requestHandlers.Report;
handle["Api"] = requestHandlers.Api;
handle["PhoneProv"] = requestHandlers.PhoneProv;
handle["MEIDManager"] = requestHandlers.MEIDManager;
handle["TestReport"] = requestHandlers.TestReport;
handle["SNPP"] = requestHandlers.SMPP;
handle["TestCaseLogger"] = requestHandlers.SMPP;

server.start(router.route, handle);

