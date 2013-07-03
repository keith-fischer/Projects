using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//using Utils;
using Newtonsoft;
using Newtonsoft.Json;
using JSONIO;

namespace JSONIO
{

    //public JSON_IO_OBJ parseJSON(string json)
    //{
    //    JSON_IO_OBJ jobj=new JSON_IO_OBJ();

    //}

    [JsonObject(MemberSerialization = MemberSerialization.OptIn), Serializable]
    public class SUITE
    {
        [JsonProperty()]
        public IList<TEST> objects = new List<TEST>();

        [JsonProperty()]
        public int limit {get;set;}
        [JsonProperty()]
        public string next { get; set; }
        [JsonProperty()]
        public int offset { get; set; }
        [JsonProperty()]
        public string previous { get; set; }

        [JsonProperty()]
        public int total_count {get;set;}



    }

    [JsonObject(MemberSerialization = MemberSerialization.OptIn), Serializable]
    public class STEPS
    {
            //"description": "Browser IE - Test Case - TestTemplate_STE..xlsx",
        [JsonProperty()]
        public string description {get;set;}
          //"expected": "Passed",
        [JsonProperty()]
        public string expected {get;set;}
          //"id": "b4470c4c3a36b5b4735a2e29f717b3e0",
        [JsonProperty()]
        public string id {get;set;}
          //"position": 0,
                 [JsonProperty()]
        public int position {get;set;}
         //"resource_uri": "/api/v0/step/b4470c4c3a36b5b4735a2e29f717b3e0/"
                 [JsonProperty()]
        public string resource_uri {get;set;}
   }


    [JsonObject(MemberSerialization = MemberSerialization.OptIn), Serializable]
    public class TEST 
    {
        //[JsonProperty()]
        //public IList<object> objects = new List<object>();
        [JsonProperty()]
        public string automation_id {get;set;}
        [JsonProperty()]
        public DateTime create_date {get;set;}
        [JsonProperty()]
        public string create_user_id {get;set;}
        [JsonProperty()]
        public DateTime? estimated_time {get;set;}
        [JsonProperty()]
        public string id {get;set;}
        [JsonProperty()]
        public DateTime? last_run_date {get;set;}
        [JsonProperty()]
        public string last_run_status {get;set;}
        [JsonProperty()]
        public string last_run_user_id {get;set;}
        [JsonProperty()]
        public int position_in_suite {get;set;}
        [JsonProperty()]
        public string preconditions {get;set;}
        [JsonProperty()]
        public string priority {get;set;}
        [JsonProperty()]
        public string resource_uri {get;set;}
        [JsonProperty()]
        public string rtl {get;set;}
        [JsonProperty()]
        public string softlink_of_test_id {get;set;}
        [JsonProperty()]
        public string status {get;set;}

        [JsonProperty()]
        public IList<STEPS> steps =new List<STEPS>();

        [JsonProperty()]
        public string suite {get;set;}
        [JsonProperty()]
        public string suite_id {get;set;}
        [JsonProperty()]
        public string summary {get;set;}
        [JsonProperty()]
        public string test_category {get;set;}
        [JsonProperty()]
        public DateTime update_date {get;set;}



    }


    class JSON_IO
    {
        public JSON_IO()
        {

        }
        public JSON_IO(string json_path)
        {
            this.JSON_Path = json_path;
        }
        public string JSON_Path { get; set; }

        public bool JSON_Serialize(SUITE objectClass, out string JSONData, out Exception eSerialize)
        {
            bool rc = false;
            eSerialize = null;
            JSONData = "";
            try
            {

                JSONData = JsonConvert.SerializeObject(objectClass, Formatting.Indented);
                if (JSONData.Length > 3)
                    rc = true;
            }
            catch (Exception e) { eSerialize = e; rc = false; }

            return rc;
        }

        public bool JSON_DeserializeX(string json, out SUITE objectClass, out Exception eDeserialize)
        {
            bool rc = false;
            objectClass = null;
            eDeserialize = null;
            try
            {

                objectClass = (SUITE)JsonConvert.DeserializeObject(json, Type.GetType("SUITE"));

                if (objectClass != null)
                    rc = true;
            }
            catch (Exception e) { eDeserialize = e; rc = false; }

            return rc;

        }
        public bool JSON_Deserialize<T>(string json, out SUITE objectClass, out Exception eDeserialize)
        {
            bool rc = false;
            objectClass = null;
            eDeserialize = null;
            try
            {

                objectClass = JsonConvert.DeserializeObject<SUITE>(json);

                if (objectClass != null)
                {
                    rc = true;
                }
            }
            catch (Exception e) { eDeserialize = e; rc = false; }

            return rc;

        }

        //public void JSON_Save(string path, string jsonData)
        //{
        //    GeneralUtils.SaveText(this.JSON_Path, jsonData);
        //}

        //public void JSON_Save(string jsonData)
        //{
        //    GeneralUtils.SaveText(this.JSON_Path, jsonData);
        //}

        //public string JSON_Read(string path)
        //{

        //    return GeneralUtils.GetText(this.JSON_Path);

        //}
        //public string JSON_Read()
        //{
        //    return GeneralUtils.GetText(this.JSON_Path);
        //}


    }
}
