using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//using Utils;
using Newtonsoft.Json;


namespace JSONFactory
{
    class JSON_IO
    {
        public JSON_IO(string json_path)
        {
            this.JSON_Path = json_path;
        }
        public string JSON_Path { get; set; }

        public bool JSON_Serialize(GCDevices objectClass, out string JSONData, out Exception eSerialize)
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

        public bool JSON_DeserializeX(string json, out object objectClass, out Exception eDeserialize)
        {
            bool rc = false;
            objectClass = null;
            eDeserialize = null;
            try
            {

                objectClass = JsonConvert.DeserializeObject(json, Type.GetType("GCDevices"));

                if (objectClass != null)
                    rc = true;
            }
            catch (Exception e) { eDeserialize = e; rc = false; }

            return rc;

        }
        public bool JSON_Deserialize<T>(string json, out GCDevices objectClass, out Exception eDeserialize)
        {
            bool rc = false;
            objectClass = null;
            eDeserialize = null;
            try
            {

                objectClass = JsonConvert.DeserializeObject<GCDevices>(json);

                if (objectClass != null)
                {
                    rc = true;
                }
            }
            catch (Exception e) { eDeserialize = e; rc = false; }

            return rc;

        }

        public void JSON_Save(string path, string jsonData)
        {
            JSONFactory.GeneralUtils.SaveText(this.JSON_Path, jsonData);
        }

        public void JSON_Save(string jsonData)
        {
            GeneralUtils.SaveText(this.JSON_Path, jsonData);
        }

        public string JSON_Read(string path)
        {

            return GeneralUtils.GetText(this.JSON_Path);

        }
        public string JSON_Read()
        {
            return GeneralUtils.GetText(this.JSON_Path);
        }


    }
}
