using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TestStuffLib
{
    public class TestAccount
    {
        public string User { get; set; }
        public string Password { get; set; }
        
        public TestAccount()
        {
            this.User = "gcsqa@greatcall.com";
            this.Password = "gcsqaauto";
        }
        public TestAccount(string user, string password)
        {
            this.User = user;
            this.Password = password;
            
        }
    }
    public class TestRequestData : TestAccount
    {
        public TestRequestData(RequestType Request)
        {
            this.APIRequest = Request;
            this.UserAccount = new TestAccount();

        }
        public TestRequestData(RequestType Request,string login,string pw)
        {
            this.APIRequest = Request;
            this.UserAccount = new TestAccount(login, pw);
        }
        public enum RequestType{summary__contains,SET_TESTSTEP_RESULT};
        public RequestType APIRequest { get; set; }
        public TestAccount UserAccount { get; set; }
        //public string User {get;set;}// "gcsqa@greatcall.com";
        //public string Password {get;set;} // "gcsqaauto";
         
        //string s_url = "https://service6.testuff.com/api/v0/run/";
        public string URL {get;set;}// = "https://service6.testuff.com/api/v0/test/?summary__contains=R100";

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


    }
}
