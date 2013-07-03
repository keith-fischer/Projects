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
    class TestStuffAPI 
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string URL { get; set; }
        public string TEST_ID { get; set; }

        public TestStuffAPI(string login,string pw,string testid)
        {
            this.Login = "keith.fischer@greatcall.com";
            this.Password = "qwerty1!";
            this.URL = "https://service2.testuff.com/api/v0/run/";



        }
    }
}
