using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

using Utils;
using JSONFactory;

namespace ChemAnalysis
{
    public partial class Form1 : Form
    {
        JSONFactory.JSONObjects settings=null;
        ImageManager _ImageManager = null;
        public Form1()
        {
            InitializeComponent();
            JSONFactory.JSON_IO JIO = new JSON_IO(Utils.Utils.this_Path() + "\\TestTubeObjects.txt");
            string jsondata=JIO.JSON_Read();
            //JSONFactory.JSONObjects settings;
            Exception ee;
            if (!JIO.JSON_Deserialize<JSONFactory.JSONObjects>(jsondata, out settings, out ee))
                this.labelStatus.Text = ee.Message;
            else
                Init();
        }
        private void Init()
        {
            this.labelTestTitle.Text = this.settings.TitleLabel;
            this.tabControl1.TabIndexChanged += new EventHandler(tabControl1_TabIndexChanged);
            _ImageManager = new ImageManager();
            _ImageManager.RootFolder = Utils.Utils.this_Path() + "\\Images";
            _ImageManager.FindImages(settings.CurrentTestIndex);


        }

        void tabControl1_TabIndexChanged(object sender, EventArgs e)
        {
            if (this.tabControl1.SelectedTab.Text == "Analysis")
            {
                NextTest();
            }
        }


        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {
            AddSlider((int)numericUpDown1.Value);
            //for (int. i = 0; i < Controls.Count; i++)
            //{
            //    if(Controls[
            //}
        }
        private void RemoveSLiderScreen()
        {

        }
        private void RemoveSliders()
        {
             TryAgain:
           bool done = true;
             for (int i = 0; i < this.tabPageAnalysisWorkflow.Controls.Count; i++)
            {
                try
                {
                    
                    if (this.tabPageAnalysisWorkflow.Controls[i].Name.Contains("Slider_"))
                    {
                        int n = this.tabPageAnalysisWorkflow.Controls.IndexOfKey(this.tabPageAnalysisWorkflow.Controls[i].Name);
                        this.tabPageAnalysisWorkflow.Controls.RemoveAt(n);
                        //this.Refresh();
                        done = false;
                    }
                }
                catch { }
            }
            if(!done)
            goto TryAgain;
        }
        private void NextTest()
        {
            RemoveSliders();
            for (int i = 0; i < settings.TestSCreensList[settings.CurrentTestIndex].TestTubeCount; i++)
            {
                AddSlider(i);
                //string sliderkey = "Slider_" + i.ToString();
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sliderID">value 0-n</param>
        private void AddSlider(int sliderID)
        {
            int newID = sliderID;
             SliderImageControl.SliderImageControl slider1 = getSliderByControlKey((sliderID - 1));
           SliderImageControl.SliderImageControl slider2 = getSliderByControlKey(sliderID);
            SliderImageControl.SliderImageControl slider3 = getSliderByControlKey((sliderID + 1));

            if (slider3 != null)
            {//reverse
                slider2 = slider3;
                newID = sliderID + 1;
            }
            if (slider1 == null && slider2==null)
               slider1 = this.sliderImageControl0;

            string sliderkey = "Slider_" + newID.ToString();
            if (this.tabPageAnalysisWorkflow.Controls.ContainsKey(sliderkey))
            {
                this.tabPageAnalysisWorkflow.Controls.RemoveByKey(sliderkey);
            }
            else
            {
                if (slider2 == null)
                    slider2 = new SliderImageControl.SliderImageControl();
                slider2.ImageControl.Image = GetSliderImage(newID.ToString());
                slider2.Name = sliderkey;
                slider2.SliderTitle.Text = "Test Tube " + sliderID.ToString();
                if (this.tabPageAnalysisWorkflow.Controls.Count == 2)
                    slider2.Left = this.tabPageAnalysisWorkflow.Left + 10;
                else
                    slider2.Left = slider1.Left + slider1.Width+5;
                slider2.Top = slider1.Top;
                //slider2.
                //slider2.MinimumSize = 0;
                this.tabPageAnalysisWorkflow.Controls.Add(slider2);
            }

        }
        private Image GetSliderImage(string id)
        {
            string imagepath=Utils.Utils.this_Path() + "\\Images\\Untitled" + id+".png";

            if(!System.IO.File.Exists(imagepath))
                imagepath = Utils.Utils.this_Path() + "\\Images\\DefaultTestTube.jpg";
            Image sliderimage = Image.FromFile(imagepath);
            return sliderimage;
            
        }
        private SliderImageControl.SliderImageControl getSliderByControlKey(int sliderkey)
        {
            SliderImageControl.SliderImageControl slider = null;
            string slidername = "Slider_" + sliderkey.ToString();
            if (this.tabPageAnalysisWorkflow.Controls.ContainsKey(slidername))
                slider =this.tabPageAnalysisWorkflow.Controls[slidername] as SliderImageControl.SliderImageControl;

            return slider;
        }

        private void buttonNext_Click(object sender, EventArgs e)
        {
            //Random rd = new Random();
            //int n = rd.Next(1, 38);
            //NextTest();
            settings.CurrentTestIndex++;
            if (settings.CurrentTestIndex >= settings.TestSCreensList.Count)
                settings.CurrentTestIndex = 0;
            //this._ImageManager.FindImages(settings.CurrentTestIndex);

            //if (settings.CurrentTestIndex > settings.ObjList.Count)
            //    settings.CurrentTestIndex = settings.ObjList.Count - 1;
            NextTest();
        }

        private void buttonPrev_Click(object sender, EventArgs e)
        {
            settings.CurrentTestIndex--;
            if (settings.CurrentTestIndex <0)
                settings.CurrentTestIndex = 0;
            NextTest();
        }

    }
}
