using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Web;
using System.Net;
using System.Collections.Specialized;
using Newtonsoft.Json;
using JSONIO;
//using httpRestClient;
            //httpRestClient.httpRestClient rest = new httpRestClient.httpRestClient();
//rest.URL = "https://service2.testuff.com/api/v0/run/";
            //rest.ResourceTemplate = s_JSON;
            //rest.Request();

namespace TestStuffAPItest
{
    class Program
    {
        
        static void Main(string[] args)
        {
            // set Web API connectivity parameters
            // replace email, password and serviceX with your account details
            //string s_username = "keith.fischer@greatcall.com";
            //string s_password = "qwerty1!";
            string s_username = "gcsqa@greatcall.com";
            string s_password = "gcsqaauto";
            //string s_url = "https://service6.testuff.com/api/v0/run/";
            string s_url = "https://service6.testuff.com/api/v0/test/?summary__contains=R100";

            // set test scenario parameters
            string s_test_id = "d5e94a3a0eb0970859f2642c9f4786d5";// "2 Automation Smoke tests";
            string s_status = "FAILED";
            string s_steps_failed = "1,3";
            string s_steps_passed = "2";
            string s_steps_maybe = "3";
            string s_comment = "Automated comment";

            string branch_name = "Automated branch1";
            string lab_name = "AutomatedLab1";
            string run_configuration = "Automated config ";
            string version = "Automated version1";

            StringBuilder s_JSON_builder = new StringBuilder();
            //s_JSON_builder.Append("{ ");
            //s_JSON_builder.Append("\"" + "?summary__contains=TestTemplate_STE" + "\"");

            //s_JSON_builder.Append("\"" + "?summary__contains" + "\": " + "\"" + "TestTemplate_STE" + "\"");
            //s_JSON_builder.Append("\"" + "test_id" + "\": " + "\"" + s_test_id + "\"");
            //s_JSON_builder.Append(",\"" + "status" + "\": " + "\"" + s_status + "\"");
            //s_JSON_builder.Append(",\"" + "steps_failed" + "\": " + "\"" + s_steps_failed + "\"");
            //s_JSON_builder.Append(",\"" + "steps_passed" + "\": " + "\"" + s_steps_passed + "\"");
            ////s_JSON_builder.Append(",\"" + "steps_maybe" + "\": " + "\"" + s_steps_maybe + "\"");
            ////s_JSON_builder.Append(",\"" + "branch_name" + "\": " + "\"" + branch_name + "\"");
            //s_JSON_builder.Append(",\"" + "lab_name" + "\": " + "\"" + lab_name + "\"");
            //s_JSON_builder.Append(",\"" + "run_configuration" + "\": " + "\"" + run_configuration + "\"");
            //s_JSON_builder.Append(",\"" + "version" + "\": " + "\"" + version + "\"");

            //s_JSON_builder.Append(",\"" + "comment" + "\": " + "\"" + s_comment + "\"");
            //s_JSON_builder.Append("}");
            //s_JSON_builder.Append("{\"test_id\":\"d5e94a3a0eb0970859f2642c9f4786d\",\"status\":\"failed\",\"steps_failed\":\"2\",\"comment\":\"automated test comment\"}");
            string s_JSON = s_JSON_builder.ToString();

            string res = "";// rest.Content;
            try
            {
                // System.Net.HttpWebRequest adds the header 'HTTP header "Expect: 100-Continue"' to every request by default
                System.Net.ServicePointManager.Expect100Continue = false;
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(s_url);
                req.Credentials = new NetworkCredential(s_username, s_password); //This line ensures the request is processed through Basic Authentication

                //req.ContentType = "application/json";
                //req.Method = "POST";
                req.Method = "GET";

                //req.PreAuthenticate = true;
                req.KeepAlive = true;
                req.Timeout = 50000;
                req.AllowAutoRedirect = false;
                req.ContentLength = s_JSON.Length;

                //Stream s = req.GetRequestStream();
                //s.Write(System.Text.Encoding.ASCII.GetBytes(s_JSON), 0, s_JSON.Length);
                //s.Close();

                HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                if (req.HaveResponse)
                {
                    res = "Created: " + resp.Headers["Location"];
                    foreach (string s in resp.Headers)
                    {
                        res += "\r\n" + s + " : " + resp.Headers[s];
                    }
                    string response;
                    Stream sres = resp.GetResponseStream();
                    Encoding encode = System.Text.Encoding.GetEncoding("utf-8");
                    StreamReader readStream = new StreamReader(sres, encode,true);
                    response = readStream.ReadToEnd();
                    //Console.WriteLine("\r\nResponse stream received.");
                    //Char[] read = new Char[256];
                    //// Reads 256 characters at a time.     
                    //int count = readStream.Read(read, 0, 256);
                    //Console.WriteLine("HTML...\r\n");
                    //while (count > 0)
                    //{
                    //    // Dumps the 256 characters on a string and displays the string to the console.
                    //    String str = new String(read, 0, count);
                    //    Console.Write(str);
                    //    count = readStream.Read(read, 0, 256);
                    //}

                    //Dictionary<string, IList<string>> objDict = new Dictionary<string, IList<string>>();

                    //readStream.Close();
                    //sres.Close();
                    //resp.Close();
                    JSONIO.JSON_IO jio = new JSONIO.JSON_IO();
                    JSON_IO_OBJ jobj = null;
                    Exception ee = null;
                    //string tab="";
                    //char c='+';
                    //string node = "";
                    //JsonTextReader jreader = new JsonTextReader(new StringReader(response));
                    //while (jreader.Read())
                    //{
                    //    tab = tab.PadLeft(jreader.Depth, c);
                    //    if (jreader.Value != null)
                    //    {
                    //        var tt = jreader.TokenType;
                    //        var vt = jreader.ValueType;
                    //        var v = jreader.Value;
                    //        jreader.Read();
                    //        if (jreader.Value == null)
                    //        {
                    //            Console.WriteLine("{0} {1}", tab, v);
                    //            node = v.ToString();
                    //            //if (!objDict.ContainsKey(node))
                    //            //    objDict.Add(node, new List<string>());
                    //        }
                    //        else
                    //        {
                    //            Console.WriteLine("{0} {1}={2}", tab, v, jreader.Value);
                    //            //node = v.ToString();
                    //            if (!objDict.ContainsKey(node+":"+v.ToString()))
                    //            {
                    //                IList<string> item = new List<string>();
                    //                item.Add(jreader.Value.ToString());
                    //                objDict.Add(node + ":" + v.ToString(), item);
                    //            }
                    //            else
                    //            {
                    //                objDict[node + ":" + v.ToString()].Add(jreader.Value.ToString());
                    //            }

                    //        }
                    //    }
                    //    else
                    //        Console.WriteLine("{0} {1}",tab, jreader.TokenType);
                    //}
                    //jreader.Close();
                    //Console.WriteLine("---------");
                    //foreach (string key in objDict.Keys)
                    //{
                    //    int count = 0;
                    //    foreach (string item in objDict[key])
                    //    {
                    //        count++;
                    //        Console.WriteLine("{0}.{1}={2}",count, key, item);
                    //    }
                    //}
                    if (jio.JSON_Deserialize<JSON_IO_OBJ>(response, out jobj, out ee))
                    {
                        res += "\r\n" + "OBJ" + " : " + "\r\n" + jobj.objects[0].summary;
                        foreach (JSON_IO_OBJ1 obj1 in jobj.objects)
                        {
                            res += "\r\n\t" + "OBJ" + " : " + ":" + obj1.ToString();
                            //foreach (object obj in obj1.objects)
                            //{
                            //    res += "\r\n\t\t" + "OBJ" + " : " + ":" + obj.ToString();

                            //}


                        }

                    }
                    else
                        res += "\r\n" + "FAILED:" + " : " + "\r\n" + ee.Message;
                    res += "\r\n" + "JSON" + " : " + "\r\n" + response;

                }

            }
            catch (Exception e)
            {
                res = "Error: " + e.Message + e.Data;
            }

            Console.WriteLine(res);
            Console.WriteLine("DONE");
            Console.ReadLine();
        }

    }
}