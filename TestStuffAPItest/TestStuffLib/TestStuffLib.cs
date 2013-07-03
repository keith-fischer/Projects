using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Web;
using System.Net;
using System.Collections.Specialized;

namespace TestStuffLib
{
    /// <summary>
    /// 
    /// </summary>
     public class Account
    {
        public Account(string login, string password)
        {
            Username = login;
            Pasword = password;
        }
        public Account(string login, string password,string url)
        {
            Username = login;
            Pasword = password;
            Url = url;
        }
        public string Username { get; set; }//= "keith.fischer@greatcall.com";
        public string Password  {get;set;}//= "qwerty1!";
        public string Url { get; set; }//= "https://service2.testuff.com/api/v0/run/";


    }
    /// <summary>
    /// 
    /// </summary>
    public class Transaction
    {
        /// <summary>
        /// 0. None, 1. IE-Internet Explorer,2. FF-Firefox,3. SF-Safari,4. GC-Googlechrome,5. WS-web service,other
        /// </summary>
        public Account userAccount { get; set; }//= "keith.fischer@greatcall.com";
        public string url { get; set; }//= "https://service2.testuff.com/api/v0/run/";
        public string TestID { get; set; }//TestID can get auto assigned with given TestcaseName
        public string TestcaseName { get; set; }//if TestID is not assigned & TestcaseName is assigned, will auto look up in TestStuffIDList
        public string Status { get; set; }
        public string LabName { get; set; }
        public string RunConfig { get; set; }
        public string Version { get; set; }
        public string Comment { get; set; }
        public string TestIDListPath { get; set; }
        public TestStuffLib.TestStepBrowserType Browsertest { get; set; }
        public TestStuffLib CurrentTestStuffLib { get; set; }
        public TestStuffLib.TestResultType TestPassedFailedMaybe { get; set; }

        public string TestStep { get; set; }
        public Exception LastError { get; set; }

        public Transaction(TestStuffLib.LoginUser login)
        {
            if (login == TestStuffLib.LoginUser.KEITH)//admin
            {
                this.username = "keith.fischer@greatcall.com";
                this.password = "qwerty1!";
            }
            else if (login == TestStuffLib.LoginUser.SQAAUTO)//test runner only
            {
                this.username = "gcsqa@greatcall.com";
                this.password = "gcsqaauto";
            }
            else if (login == TestStuffLib.LoginUser.NONE)//custom login
            {
                this.username = "";
                this.password = "";
            }
            else
            {
                this.username = "";
                this.password = "";
            }

            this.url = "https://service2.testuff.com/api/v0/run/";
            this.Browsertest = TestStuffLib.TestStepBrowserType.NONE;
        }
    }


    public class TestStuffLib : TestStuffAPI
    {
        public enum LoginUser { NONE, KEITH, SQAAUTO }
        public enum TestResultType { PASSED, FAILED, MAYBE }
        public enum TestStepBrowserType { NONE, IE, FF, SF, GC, WS, Other }
        public TestStuffTransaction CurrentTestStuffTransaction { get; set; }
        public TestStuffLib()
        {

        }

        public TestStuffLib(TestStuffTransaction _TestStuffTransaction)
        {
            this.CurrentTestStuffTransaction = _TestStuffTransaction;
        }

        public TestStuffTransaction SubmitTestTransaction()
        {
            return this.SubmitTestTransaction(this.CurrentTestStuffTransaction);
        }
        public TestStuffTransaction SubmitTestTransaction(TestStuffTransaction _TestStuffTransaction)
        {
            this.CurrentTestStuffTransaction = _TestStuffTransaction;
            
            return _TestStuffTransaction;
        }

        
    }


    /// <summary>
    /// This class works directly with the teststuff API
    /// </summary>
    public class TestStuffAPI :TestIDLookup
    {
        internal string TestStuffURL { get; set; }

        internal string getBrowsertestStepID(TestStuffLib.TestStepBrowserType Browsertest)
        {
            
            string rc = "";
            if (Browsertest != TestStuffLib.TestStepBrowserType.NONE)
                rc = Browsertest.ToString();

            return rc;
        }

        internal bool SendTestStuffTestStepResult(TestStuffTransaction _TestStuffTransaction)
        {
            bool rc = false;
            // set Web API connectivity parameters
            // replace email, password and serviceX with your account details
            string s_username = "keith.fischer@greatcall.com";
            string s_password = "qwerty1!";
            string s_url = "https://service2.testuff.com/api/v0/run/";

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
            s_JSON_builder.Append("{ ");
            s_JSON_builder.Append("\"" + "test_id" + "\": " + "\"" + s_test_id + "\"");
            s_JSON_builder.Append(",\"" + "status" + "\": " + "\"" + s_status + "\"");
            s_JSON_builder.Append(",\"" + "steps_failed" + "\": " + "\"" + s_steps_failed + "\"");
            s_JSON_builder.Append(",\"" + "steps_passed" + "\": " + "\"" + s_steps_passed + "\"");
            //s_JSON_builder.Append(",\"" + "steps_maybe" + "\": " + "\"" + s_steps_maybe + "\"");
            //s_JSON_builder.Append(",\"" + "branch_name" + "\": " + "\"" + branch_name + "\"");
            s_JSON_builder.Append(",\"" + "lab_name" + "\": " + "\"" + lab_name + "\"");
            s_JSON_builder.Append(",\"" + "run_configuration" + "\": " + "\"" + run_configuration + "\"");
            s_JSON_builder.Append(",\"" + "version" + "\": " + "\"" + version + "\"");

            s_JSON_builder.Append(",\"" + "comment" + "\": " + "\"" + s_comment + "\"");
            s_JSON_builder.Append("}");
            //s_JSON_builder.Append("{\"test_id\":\"d5e94a3a0eb0970859f2642c9f4786d\",\"status\":\"failed\",\"steps_failed\":\"2\",\"comment\":\"automated test comment\"}");
            string s_JSON = s_JSON_builder.ToString();

            string res = "";// rest.Content;
            try
            {
                // System.Net.HttpWebRequest adds the header 'HTTP header "Expect: 100-Continue"' to every request by default
                System.Net.ServicePointManager.Expect100Continue = false;
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(s_url);
                req.Credentials = new NetworkCredential(s_username, s_password); //This line ensures the request is processed through Basic Authentication

                req.ContentType = "application/json";
                req.Method = "POST";
                //req.PreAuthenticate = true;
                req.KeepAlive = true;
                req.Timeout = 50000;
                req.AllowAutoRedirect = false;
                req.ContentLength = s_JSON.Length;

                Stream s = req.GetRequestStream();
                s.Write(System.Text.Encoding.ASCII.GetBytes(s_JSON), 0, s_JSON.Length);
                s.Close();

                HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                res = "Created: " + resp.Headers["Location"];
            }
            catch (Exception e)
            {
                res = "Error: " + e.Message + e.Data;
            }

            Console.WriteLine(res);

            return rc;
        }
    }

    internal class TestIDLookup : Utils
    {
        internal Dictionary<string, string> TestIDDict = new Dictionary<string, string>();
       
        internal void LoadDict(string path)
        {
            this.TestIDDict = this.getList(path);



        }
    }
}
