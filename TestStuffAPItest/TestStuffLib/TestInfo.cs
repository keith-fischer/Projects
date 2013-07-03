using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Web;
using System.Net;

using JSONIO;
using TestStuffLib;
namespace TestStuffLib
{
    public class TestInfo
    {
        
        public enum StatusType{FOUND,FAILED,ERROR}
        public delegate void status(StatusType statusID, string msg);
        public event status Status;
        private JSONIO.SUITE mTestCase;
        public JSONIO.SUITE TestCase { get { return mTestCase; } set { mTestCase = value; } }
        public string JSON { get; set; }
        public string TestCaseName { get; set; }
        public Exception LastError {get;set;}
        public bool SetTestCase(string FindTestName)
        {
            bool rc = false;
            this.TestCaseName = FindTestName;

            return rc;
        }
        private void updateStatus(StatusType statusID, string msg)
        {
            if (this.Status != null)
                this.Status(statusID, msg);
        }


        private bool FindTest()
        {
            bool rc = false;
            JSONIO.JSON_IO jio = new JSON_IO();
            Exception e;

            if (jio.JSON_Deserialize<JSONIO.SUITE>(this.JSON, out mTestCase, out e))
            {
                updateStatus(StatusType.FOUND, mTestCase.total_count.ToString());
            }
            else
            {
                this.LastError = e;
                if(this.LastError!=null)
                    updateStatus(StatusType.ERROR, e.Message);
                else
                    updateStatus(StatusType.FAILED, "Not found");
            }

            return rc;
        }

    }
}
