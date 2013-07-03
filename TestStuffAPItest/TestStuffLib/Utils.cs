using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Reflection;

namespace TestStuffLib
{
    class Utils
    {
        internal string getThisPath()
        {
            return Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        }

        /// <summary>
        /// Populates a Dict obj for Testscript file name lookup for testID results reporting
        /// </summary>
        /// <param name="path">Path to "TestStuffTestIDList.txt"</param>
        /// <returns>Invalid path returns null dictionary obj</returns>
        internal Dictionary<string,string> getList(string path)
        {
            string data=GetText(path);
            string[] list = data.Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
            if (list == null || list.Length == 0)
                return null;
            string[] hash;
            Dictionary<string, string> TestIDDict = new Dictionary<string, string>();
            foreach (string item in list)
            {
                hash = item.Split(new string[] { " : " }, StringSplitOptions.RemoveEmptyEntries);
                if (hash != null && hash.Length == 2)
                {
                    if (!TestIDDict.ContainsKey(hash[0].Trim()))
                        TestIDDict.Add(hash[0].Trim(), hash[1].Trim());
                }
            }

            return TestIDDict;
        }
        
        internal string GetText(string path)
        {
            System.IO.StreamReader sr = null;
            string textout = null;
            try
            {
                if (System.IO.File.Exists(path))
                {
                    sr = System.IO.File.OpenText(path);
                    textout = sr.ReadToEnd();

                }

            }
            catch (Exception e)
            {
                
            }
            finally
            {
                if (sr != null)
                    sr.Close();
            }
            return textout;
        }
    }
}
