using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestStuffLib;
namespace TestTestStuffLib
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            TestStuffLib.TestStuffTransaction TST = 
                new TestStuffTransaction(TestStuffLib.TestStuffLib.LoginUser.SQAAUTO);

            TestStuffLib.TestStuffLib TSL = new TestStuffLib.TestStuffLib();





        }
    }
}
