using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.IO;

namespace ChemAnalysis
{
    internal class ImageManager
    {
        internal class ImageFile
        {
            internal string Filename { get; set; }
            internal int WorkflowID { get; set; }
            internal int TestID { get; set; }
            internal int ImageID { get; set; }
            internal string ElementName { get; set; }
            internal string Comment { get; set; }
            internal string Extension { get; set; }
            internal Image ImageData {get;set;}
        }
        internal ImageManager()
        {
            this.FileType = ".png";
        }
        internal string RootFolder { get; set; }
        internal string FileType { get; set; }
        internal IList<ImageFile> ImageFileList = new List<ImageFile>();
        internal int FindImages(int workflowID)
        {
            int rc = 0;
            rc = LoadImages(workflowID);
            return rc;
        }
        private int getInt(string val)
        {
            int n;
            if (int.TryParse(val, out n))
                return n;
            return -1;
        }

        private enum FileNameParse { WorkflowID, TestID, ImageID, ElementName, Comment }
        private int LoadImages(int workflowID)
        {
            int rc = 0;
            if (!Directory.Exists(this.RootFolder))
                return rc;
            string[] dirlist = Directory.GetFiles(this.RootFolder,"*"+this.FileType);

            if (dirlist == null || dirlist.Length == 0)
                return rc;

            ImageFileList.Clear();
            foreach (string f in dirlist)
            {
                ImageFile imgf = new ImageFile();
                imgf.Filename=Path.GetFileNameWithoutExtension(f);
                imgf.Extension = Path.GetExtension(f);
                string[] nameitems = imgf.Filename.Split(new char[] { '_' });
                if (nameitems == null || nameitems.Length < 4)
                    continue;
                int n;
                if (int.TryParse(nameitems[(int)FileNameParse.WorkflowID], out n))
                {
                    imgf.WorkflowID = n;
                    if (imgf.WorkflowID != workflowID)
                        continue;
                }
                else
                    continue;
                if (int.TryParse(nameitems[(int)FileNameParse.TestID], out n))
                    imgf.TestID = n;
                else
                    continue;

                if (int.TryParse(nameitems[(int)FileNameParse.ImageID], out n))
                    imgf.ImageID = n;
                else
                    continue;

                if (nameitems.Length > (int)FileNameParse.ElementName)
                    imgf.ElementName = nameitems[(int)FileNameParse.ElementName];

                if (string.IsNullOrEmpty(imgf.ElementName))
                    continue;

                if (nameitems.Length > (int)FileNameParse.Comment)
                    imgf.Comment = nameitems[(int)FileNameParse.Comment];

                imgf.ImageData = Image.FromFile(f);
                if(imgf.ImageData!=null)
                    this.ImageFileList.Add(imgf);
            }
            return rc;

        }
    }
}
