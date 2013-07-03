
///<reference path="definitions/node.d.ts"/>

///// <reference path="MEIDMgrHandlers.js" />



/*******************************************************
1. Contains a reserved list of MEID's for each sku
function ProvisionMEID(sku)
2. With given sku, looks up a first found unprovisioned meid.
3. Tags the unprovisioned meid as provisioned.
4. Further meid provision requests will not provision tagged provisioned meids.
function UnProvisionMEID(sku,meid)
5. Automation will unprovision the sku meid for further use for
the next round provisioning meid tests.
*******************************************************/

/*************************************
* 
*/
var MEID_AutomationMgr = {
    /********************************
    * provisioned meid data object
    * if the meid is provisioned it will exist in the provisioned_MEIDs array
    * unprovisioned meid's will get deleted.
    * provisioned_MEIDs contains mixed sku meid's
    */

    //    Object.size : function () {
    //        var len = this.length ? --this.length : -1;
    //        for (var k in this)
    //            len++;
    //        return len;
    //    }


    /********************************************
    * 
    */
    MEID_ProvisionData: function () {
        /// <returns type="MEID_ProvisionData" />
        this.sku = "";
        this.meid = "";
        this.receiptorderid = "";
        this.mdn = ""; //service number
        this.swver = "";
        this.min = "";
        this.orderitemid = "";
        this.ordernum = "";
        this.testcase = "";
        this.startdate = new Date();
        this.starttime = "";
        this.lastmethod = "";
        this.testemail = "";
        this.automationgcteststate = "";
        this.provisiontool = "NO";
        this.prodtype = "";
        this.environment = "";
        this.unitprice = "";
        this.qty = "";
        this.description = "";
        this.acctnumber = "";
    },

    /********************************************
    * 
    */
    MEID_provisioned_MEIDs: [],

    /********************************************
    * 
    */
    MEID_AutomationGCTestState: new Array("NotProvisionedNewOrder",
									"WaitingVerizonServiceMDN",
									"VerizonServiceMDN",
									"ProvisionedMEID"
									),

    /********************************************
    * 
    */
    MEID_provisioned_R100MEIDs: [],

    /********************************************
    * 
    */
    MEID_UnitPriceR100: "39.9900",

    /********************************************
    * 
    */
    MEID_skuR100: "R100-49-W",

    /********************************************
    * HW allocated for production only
    */
    MEID_R100MEIDs_PROD: Array("A0000024257B61",
		"A0000023932B37"),
    /********************************************
    * 
    */
    MEID_R100MEIDs: Array("A000001DE21F52",
		"A000001DE21F53",
		"A000001DE21F56",
		"A000001DE21FAA",
		"A000001DE22046",
		"A000001DE22048",
		"A000001DE2204C",
		"A000001DE22070",
		"A000001DE220C0",
		"A000001DE220D1",
		"A000001DE22102",
		"A000001DE22103",
		"A000001E190CE0",
		"A000001E190DC4",
		"A000001E190DEB",
		"A000001E193291",
		"A000001E1933C6",
		"A000001E1945F9",
		"A000001E194612",
		"A000001E194BC7",
		"A000001E194BC8",
		"A000001E194BCC",
		"A000001E19618E",
		"A000001E19618F",
		"A000001E196395",
		"A000001E196397",
		"A000001E196398",
		"A000001E196399",
		"A000001E19639F",
		"A000001E1963AD",
		"A000001E1963B0",
		"A000001E1963B1",
		"A000001E1963B2",
		"A000001E1963B3",
		"A000001E1963B4",
		"A000001E1963B5",
		"A000001E1963B8"),

    /********************************************
    * 
    */
    MEID_provisioned_JBRedMEIDs: [],

    /********************************************
    * 
    */
    MEID_UnitPriceJBRed: "99",

    /********************************************
    * 
    */
    MEID_skuJBRed: "JBG3-147-W-Red",


    /********************************************
    * HW allocated for production only
    */
    MEID_JBRedMEIDs_PROD: new Array("A000002AF05DDE",
		"A000002AF0B621"),

    /********************************************
    * 
    */
    MEID_JBRedMEIDs: new Array("A000001DEA97A3",
		"A000001DEA97CB",
		"A000001DEA97EE",
		"A000001DEA9A2A",
		"A000001DEA9A3C",
		"A000001DEA9A6C",
		"A000001DEA9A77",
		"A000001DEA9A8F",
		"A000001DEA9AA1",
		"A000001DEA9AAE",
		"A000001DEA9AB9",
		"A000001DEA9B7A",
		"A000001DEA9BEB",
		"A000001DEA9DA9",
		"A000001DEA9DD6",
		"A000001DEA9EBF",
		"A000001DEA9EFE",
		"A000001DEA9F1E",
		"A000001DEA9F22",
		"A000001DEA9F38",
		"A000001DEA9FF7",
		"A000001DEAA044",
		"A000001DEAA1B2",
		"A000001DEAA209",
		"A000001DEAA26C",
		"A000001DEAA399",
		"A000001DEAA3A6",
		"A000001DEAA3CD",
		"A000001DEAA461",
		"A000001DEAA49C",
		"A000001DEAA4C4",
		"A000001DEAA502",
		"A000001DEAA550",
		"A000001DEAA688",
		"A000001DEAA72F",
		"A000001DEAA748",
		"A000001DEAA7C4",
		"A000001DEAA88D"),

    /********************************************
    * 
    */
    MEID_provisioned_JBGraphMEIDs: [],

    /********************************************
    * 
    */
    MEID_UnitPriceJBGraph: "99",

    /********************************************
    * 
    */
    MEID_skuJBGraph: "JBG3-147-W-Graphite",

    /********************************************
    * HW allocated for production only
    */
    MEID_JBGraphMEIDs_PROD: new Array("A000002A75FD0D",
		"A000002AF06BF2"),


    /********************************************
    * 
    */
    MEID_JBGraphMEIDs: new Array("A0000014D79C44",
		"A0000014D79C74",
		"A0000014D79CE4",
		"A0000014D79D2D",
		"A0000014D79D42",
		"A0000014D79E0D",
		"A0000014D79E7D",
		"A0000014D7A035",
		"A0000014D7A12A",
		"A0000014D7A281",
		"A0000014D7A2DB",
		"A0000014D7A31A",
		"A0000014D7A36E",
		"A0000014D7A3DA",
		"A0000014D7A41E",
		"A0000014D7A44A",
		"A0000014D7A4FF",
		"A0000014D7A5FA",
		"A0000014D7A60B",
		"A0000014D7A703",
		"A0000014D7A7A3",
		"A0000014D7A7C0",
		"A0000014D7A962",
		"A0000014D7AAC9",
		"A0000014D7AAEA",
		"A0000014D7ABB8",
		"A0000014D7ABD0",
		"A0000014D7ACC0",
		"A0000014D7AD29",
		"A0000014D7ADCB",
		"A0000014D7ADD3",
		"A0000014D7AEC8",
		"A0000014D7AF17",
		"A0000014D7AF25",
		"A0000014D7AF4B",
		"A0000014D7AFCE",
		"A0000014D7B079",
		"A0000014D7B116"),

    /********************************************
    * 
    */
    MEID_provisioned_GCBlack: [],

    /********************************************
    * 
    */
    MEID_UnitPriceGCBlack: "49.9900",

    /********************************************
    * 
    */
    MEID_skuGCBlack: "GC02A-W-BLCK",

    /********************************************
    * HW allocated for production only
    */
    MEID_GCBlack_PROD: new Array("10804895754",
						"10804908312"),
    /********************************************
    * 
    */
    MEID_GCBlack: new Array("4878668",
						"4878673",
						"4878675",
						"4878677",
						"4878683",
						"4878643",
						"4878694",
						"4878696",
						"4878697",
						"4878698",
						"4878699",
						"4878702",
						"4878705",
						"4878706",
						"4878707",
						"4878711",
						"4878712",
						"4878713",
						"4878715",
						"4878717",
						"4878720",
						"4878723",
						"4878724",
						"4878725",
						"4878726",
						"4878728",
						"4878729",
						"4878730",
						"4878731",
						"4878732",
						"4878735",
						"4878739",
						"4878740",
						"4878741",
						"4878742",
						"4878743",
						"4878744",
						"4878745",
						"4878746"),

    /********************************************
    * 
    */
    MEID_provisioned_GCSilver: [],

    /********************************************
    * 
    */
    MEID_UnitPriceGCSilver: "49.9900",

    /********************************************
    * 
    */
    MEID_skuGCSilver: "GC02A-W-SLVR",

    /********************************************
    * HW allocated for production only
    */
    MEID_GCSilver_PROD: new Array("10804879364",
						"10804879295"),
    /********************************************
    * 
    */
    MEID_GCSilver: new Array("4834691",
						"4863417",
						"4863418",
						"4863419",
						"4863420",
						"4863421",
						"4863422",
						"4863423",
						"4863424",
						"4863425",
						"4863426",
						"4863427",
						"4863428",
						"4863429",
						"4863430",
						"4863431",
						"4863432",
						"4863433",
						"4863434",
						"4863435",
						"4863436",
						"4863437",
						"4863438",
						"4863439",
						"4863440",
						"4863441",
						"4863442",
						"4863444",
						"4863445",
						"4863446",
						"4863447",
						"4863448",
						"4863449",
						"4863450",
						"4863451",
						"4863452",
						"4863453",
						"4863454",
						"4863455"),

    LookupLables: {
        meidlist: new Array(),
        ProvisionList: new Array()
    },


    /********************************************
    * 
    */
    MEID_GetMEIDProvisionDataObj: function (sku,
		    shopcartOrderNum,
		    ShopCartAcctNumber,
		    OrderItemID,
		    mdn,
		    UnitPrice,
		    Description,
		    SWVer) {
        ///<returns type="MEID_ProvisionData" />
        var meidDatObj = new MEID_ProvisionData();
        meidDatObj.SKU = sku;
        meidDatObj.MDN = mdn;
        meidDatObj.OrderItemID = OrderItemID;
        meidDatObj.OrderNum = shopcartOrderNum;
        meidDatObj.SWVer = SWVer;
        meidDatObj.UnitPrice = UnitPrice;
        meidDatObj.Description = Description;
        meidDatObj.AcctNumber = ShopCartAcctNumber;
        return meidDatObj;

    },

    /****************************************
    * With the given sku returns the source meid list
    */
    MEID_getSKUArray: function (sku, prod) {
        /// <returns type="Array" />
        console.log("MEID_getSKUArray sku:" + sku);
        //        var skuarray = new Array();
        console.log(this.MEID_skuJBGraph + ": " + sku);
        console.log(this.MEID_skuJBRed + ": " + sku);
        console.log(this.MEID_skuR100 + ": " + sku);

        if (sku == this.MEID_skuJBGraph.toLowerCase()) {
            if (prod == 'true') {
                console.log("Found: MEID_JBGraphMEIDs_PROD: " + sku);
                return this.MEID_JBGraphMEIDs_PROD;
            }
            else {
                console.log("Found: MEID_JBGraphMEIDs: " + sku);
                return this.MEID_JBGraphMEIDs;
            }
        }
        else if (sku == this.MEID_skuJBRed.toLowerCase()) {
            if (prod == 'true') {
                console.log("Found: MEID_JBRedMEIDs_PROD: " + sku);
                return this.MEID_JBRedMEIDs_PROD;
            }
            else {
                console.log("Found: MEID_JBRedMEIDs: " + sku);
                return this.MEID_JBRedMEIDs;
            }
        }
        else if (sku == this.MEID_skuR100.toLowerCase()) {
            if (prod == 'true') {
                console.log("Found: MEID_R100MEIDs_PROD: " + sku);
                return this.MEID_R100MEIDs_PROD;
            }
            else {
                console.log("Found: MEID_R100MEIDs: " + sku);
                return this.MEID_R100MEIDs;
            }

        }
        else if (sku == this.MEID_skuGCBlack.toLowerCase()) {
            if (prod == 'true') {
                console.log("Found: MEID_GCBlack_PROD: " + sku);
                return this.MEID_GCBlack_PROD;
            }
            else {
                console.log("Found: MEID_GCBlack: " + sku);
                return this.MEID_GCBlack;
            }
        }
        else if (sku == this.MEID_skuGCSilver.toLowerCase()) {
            if (prod == 'true') {
                console.log("Found: MEID_GCSilver_PROD: " + sku);
                return this.MEID_GCSilver_PROD;
            }
            else {
                console.log("Found: MEID_GCSilver: " + sku);
                return this.MEID_GCSilver;
            }

        }

        return null;
    },

    /************************************
    * 
    * 
    */
    MEID_getMEIDProvisionData: function (meid) {
        ///<returns type="MEID_ProvisionData" />
        var pmeid = null;
        try {
            pmeid = this.MEID_provisioned_MEIDs[meid];
        }
        catch (err) { pmeid = null; }
        return pmeid;

    },
    /*********************************************
    * provisions the first available meid
    * 
    */
    MEID_ProvisionMEID: function (args) {
        console.log("MEID_ProvisionMEID:" + args.sku);
        var meidlist = new Array();
        args.meid = "";
        meidlist = this.MEID_getSKUArray(args.sku, args.prod);
        console.log("meidlist:" + meidlist.length);
        if (meidlist.length > 0) {
            var meid;
            for (meid = 0; meid < meidlist.length; meid++) {
                console.log("search meid: " + meidlist[meid] + "<>" + typeof (this.MEID_provisioned_MEIDs[meidlist[meid]]));
                console.log("MEID_provisioned_MEIDs: " + this.MEID_provisioned_MEIDs[meidlist[meid]]);
                if (this.MEID_provisioned_MEIDs[meidlist[meid]] == undefined || this.MEID_provisioned_MEIDs[meidlist[meid]] == null) {

                    console.log("Not found: " + meidlist[meid]);
                    args.meid = meidlist[meid];
                    this.MEID_provisioned_MEIDs[meidlist[meid]] = args;
                    return args;
                }
                else {
                    console.log("found: " + this.MEID_provisioned_MEIDs[meidlist[meid]].meid);
                }

            }
        }
        args.Status += "Meid's are all provisioned";
        args.Error += "Meid failed to provision";
        return args;
    },

    /******************************************
    * 
    */
    MEID_UnProvisionMEID: function (args) {
        console.log("MEID_UnProvisionMEID:" + this.MEID_provisioned_MEIDs.length + "-" + args.meid);


        try {
            console.log("MEID_provisioned_MEIDs[args.meid].meid" + this.MEID_provisioned_MEIDs[args.meid].meid);
            args = this.MEID_provisioned_MEIDs[args.meid];
            this.MEID_provisioned_MEIDs[args.meid] = null;
            this.MEID_provisioned_MEIDs[args.meid] = undefined;
            delete this.MEID_provisioned_MEIDs[args.meid];
        } catch (err) { args.Status += "MEID is not found:"; }
        args.Status += "MEID is not provisioned:" + args.meid;

        return args;
    },

    /*******************************
    * create an email with current date time
    * Like: AutoTest_120308131346@MEID_1234567.net
    */
    MEID_getNewTestEmail: function (meid) {
        var dt = this.MEID_getNewDateStr();
        var testemail = "AutoTest_" + dt + "@MEID_" + meid + ".net";
        testemail = testemail.replace(" ", "-");
        return testemail;
    },

    /********************************
    * pads string length of 1 with zero
    * pass if txt==="1"
    * returns "01"
    * supports function getNewDateStr
    */
    MEID_PadTxt: function (txt) {
        if (txt.length === 1) { txt = "0" + txt };
        return txt;
    },

    /**********************************
    * returns date format like:
    * 120308131346
    * YYMMDDhhmmss
    * pass null will create current datetime
    */
    MEID_getNewDateStr: function (datetime) {
        if (datetime === undefined || datetime === null) datetime = new Date();

        return this.MEID_PadTxt(datetime.getYear().toString()) +
             this.MEID_PadTxt((datetime.getMonth() + 1).toString()) +
             this.MEID_PadTxt(datetime.getDate().toString()) +
             this.MEID_PadTxt(datetime.getHours().toString()) +
             this.MEID_PadTxt(datetime.getMinutes().toString()) +
             this.MEID_PadTxt(datetime.getSeconds().toString());
    }
}

/********************************************
* 
*/
function ProvisionMeid(args) {
    console.log("ProvisionMeid:" + args.sku);
    args = MEID_AutomationMgr.MEID_ProvisionMEID(args);
    
    if (args.meid.length > 0) {
        args.Status += args.meid;
        args.Status += "ProvisionMeid ok";
    }
    else {
        args.Status += "ProvisionMeid Not Found";
        args.Error += "\nMEID Not  Found";

    }
    return args;
}


/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level,counter) {
    if (!level) level = 1;
    if (!counter) counter = 1;
    var dumped_text = "<table border=\"1\" style=\"width: 100%\"><caption  style=\"text-align:left;margin-left:0;margin-right:auto;\"><strong>Provisioned [[id]]</strong></caption>  <col />  <col />  <tbody>";
    if (level == 1)
        dumped_text = dumped_text.replace("[[id]]", "");
	var padtxt = '-';
	//The padding given at the beginning of the line.
	var level_padding = "";
	for (var j = 0; j < level + 1; j++) level_padding += padtxt;
	//var counter = 0;
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];

			dumped_text = dumped_text.replace("[[id]]", counter);
			if(typeof(value) == 'object') { //If it is an array,
			    //dumped_text += 'item:' + level_padding + "'" + item + "' ...\n";
			    //dumped_text += "<tr>";
			    
			    dumped_text += dump(value,level+1,counter++);
			    
			} else {
			    //dumped_text += 'field:' + level_padding + "'" + item + "' => \"" + value + "\"\n";
			dumped_text += "<tr><td><param name=\""+item+"\" />"+item+"</td>     <td>"+value+"</td>    </tr>";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		//dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text+"  </tbody></table>";
}

/********************************************
* 
*/
function dumptxt(arr, level) {
    var dumped_text = "<pre>";
    if (!level) level = 0;
    var padtxt = '-';
    //The padding given at the beginning of the line.
    var level_padding = "";
    for (var j = 0; j < level + 1; j++) level_padding += padtxt;

    if (typeof (arr) == 'object') { //Array/Hashes/Objects 
        for (var item in arr) {
            var value = arr[item];
            
            if (typeof (value) == 'object') { //If it is an array,
                //dumped_text += 'item:' + level_padding + "'" + item + "' ...\n";
                dumped_text += "-------\n";
                dumped_text += dump(value, level + 1);

            } else {
                //dumped_text += 'field:' + level_padding + "'" + item + "' => \"" + value + "\"\n";
                dumped_text += level_padding + item + "= \"" + value + "\"\n";
            }
        }
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
    }
    return dumped_text + "</pre>";
}

/********************************************
* 
*/
function ReleaseMeid(args) {
    console.log("ReleaseMeid:" + args.meid);
    args = MEID_AutomationMgr.MEID_UnProvisionMEID(args);

    return args;
}

/********************************************
* 
*/
function ProvisionedMeidList(args) {
    console.log("ProvisionedMeidList:" + MEID_AutomationMgr.MEID_provisioned_MEIDs.length);
    args.Status=dump(MEID_AutomationMgr.MEID_provisioned_MEIDs);

    return args;
}

/********************************************
* 
*/
function ParsePostToMEID_ProvisionData(postData) {
    /// <returns type="MEID_ProvisionData" />

    console.log("ParsePostToMEID_ProvisionData postData:" + postData);
    var querystring = require('querystring');
    var args = [];
    args.Error = "";
    args.Status = "";
//    action: NewMEID || getMEID || RelMeid
    args['action'] = querystring.parse(postData).action;
    if (args['action'] == 'getMEID' ||
        args['action'] == 'relMEID' || 
        args['action'] == 'provMEID' ) {
            args['sku'] = querystring.parse(String(postData).toLowerCase()).sku;
            args['meid'] = querystring.parse(String(postData)).meid;
            args['receiptorderid'] = querystring.parse(String(postData).toLowerCase()).receiptorderid;
            args['mdn'] = querystring.parse(String(postData).toLowerCase()).mdn; //service number
            args['swver'] = querystring.parse(String(postData).toLowerCase()).swver;
            args['min'] = querystring.parse(String(postData).toLowerCase()).min;
            args['orderitemid'] = querystring.parse(String(postData).toLowerCase()).orderitemid;
            args['ordernum'] = querystring.parse(String(postData).toLowerCase()).ordernum;
            args['testcase'] = querystring.parse(String(postData).toLowerCase()).testcase;
            args['startdate']  = querystring.parse(String(postData).toLowerCase()).startdate;
            args['starttime'] = querystring.parse(String(postData).toLowerCase()).starttime;
            args['lastmethod'] = querystring.parse(String(postData).toLowerCase()).lastmethod;
            args['testemail'] = querystring.parse(String(postData).toLowerCase()).testemail;
            args['automationgcteststate'] = querystring.parse(String(postData).toLowerCase()).automationgcteststate;
            args['provisiontool'] = querystring.parse(String(postData).toLowerCase()).provisiontool;
            args['prodtype'] = querystring.parse(String(postData).toLowerCase()).prodtype;
            args['environment'] = querystring.parse(String(postData).toLowerCase()).environment;
            args['unitprice'] = querystring.parse(String(postData).toLowerCase()).unitprice;
            args['qty'] = querystring.parse(String(postData).toLowerCase()).qty;
            args['description'] = querystring.parse(String(postData).toLowerCase()).description;
            args['acctnumber'] = querystring.parse(String(postData).toLowerCase()).acctnumber;
            args['prod'] = querystring.parse(String(postData).toLowerCase()).prod;

            if (args['action'] == 'getMEID') {
                args.startdate=MEID_AutomationMgr.MEID_getNewDateStr(new Date());
                //args.startdate = Date();
                args =  ProvisionMeid(args);
            }
            else if (args['action'] == 'relMEID') {
                args =  ReleaseMeid(args);
            }
            else if (args['action'] == 'provMEID') {
                args = ProvisionedMeidList(args);
            }
            else
                args.Error = 'No action';
    }
    else
        args.Error = 'No action';

    return args;
}



/********************************************
* 
*/
function MEIDProvisionMgr(response, postData, session) {


    console.log("MEIDProvisionMgr Session:" + session);
    console.log("MEIDProvisionMgr postData:" + postData);

    var newmeid = [];
    try {
//        newmeid = "Not found";
        //newmeid = this.ParsePostToMEID_ProvisionDataMEID_getMEIDProvisionData();
        newmeid = ParsePostToMEID_ProvisionData(postData);
        if (newmeid.Error.length > 0)
            console.log("ERR:MEIDProvisionMgr=" + newmeid.Error);

    } catch (err) { console.log("ERR:MEIDProvisionMgr=" + err); }


    return newmeid;
};




exports.MEID_AutomationMgr = MEID_AutomationMgr;
exports.MEIDProvisionMgr = MEIDProvisionMgr;

