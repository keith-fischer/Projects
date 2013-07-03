using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Newtonsoft.Json;


namespace ChemAnalysis
{

    [JsonObject(MemberSerialization = MemberSerialization.OptIn), Serializable]
    public class GCDevices
    {
        [JsonProperty()]
        public IList<GCDevice> DeviceList=new List<GCDevice>();
        //[JsonProperty()]
        //public Dictionary<string, class4> DataDict;
        [JsonProperty()]
        public GCDevice DefaultGCDevice;

        [JsonProperty()]
        public string SMPPPort { get; set; }


        [JsonProperty()]
        public string SMPPIP { get; set; }

        [JsonProperty()]
        public string WebAPIPort { get; set; }

        [JsonProperty()]
        public string RemoteWebAPIPort { get; set; }

        [JsonProperty()]
        public string MongoIPPort { get; set; }

        [JsonProperty()]
        public string MongoDBName { get; set; }

        [JsonProperty()]
        public string MongoTableName { get; set; }

        [JsonProperty()]
        public Boolean Encrypted { get; set; }

        [JsonProperty()]
        public int MaxSystemLogs { get; set; }


        //[JsonProperty()]
        //internal DateTime LastEvent { get; set; }
        //[JsonProperty()]
        //public string logPath { get; set; }

    }


    [JsonObject(MemberSerialization = MemberSerialization.OptIn), Serializable]
    public class GCDevice
    {
        [JsonProperty()]
        public string MIN { get; set; }
        [JsonProperty()]
        public string MDN { get; set; }
        [JsonProperty()]
        public string MEID { get; set; }
        [JsonProperty()]
        public string CryptoKey { get; set; }
        [JsonProperty()]
        public string BrewHdr { get; set; }
        [JsonProperty()]
        public string Device { get; set; }
        [JsonProperty()]
        public string Name { get; set; }
        //[JsonProperty()]
        //public DateTime LastEvent { get; set; }

        //[JsonProperty()]
        //public string procname { get; set; }
        //[JsonProperty()]
        //public string dinterval { get; set; }//needs converted to double
        //[JsonProperty()]
        //public int SizeX { get; set; }
        //[JsonProperty()]
        //public int SizeY { get; set; }
    }



}
