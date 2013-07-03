import java
import os
from time import strftime
#import sikuli.Sikuli *

##########################################
#set app object
##########################################
def SetApp(appTitle):
    Log(logpath,"SetApp")
    a=App(appTitle)
    a.focus()
    return a

##########################################
#set region object
#assumes ultravnc single window(0)
##########################################

def getRegionInfo(thisRegion):
    rc = ""
    if not thisRegion:
        return rc

    rc += "X=" + str(thisRegion.getX()) + ","
    rc += "Y=" + str(thisRegion.getY()) + ","
    rc += "W=" + str(thisRegion.getW()) + ","
    rc += "H=" + str(thisRegion.getH()) + ","
    rc+= "CX=" + str(thisRegion.getCenter().getX())+","
    rc+= "CY=" + str(thisRegion.getCenter().getY())+","
    
    return rc

def SetAppRegion(AppObject,RegWidth,RegHeight):
    Log(logpath,"SetAppRegion")
    AppObject.focus()
    wait(1)
   # r = AppObject.window(2)
    #Found: HUAWEI(7448) Region[1181,56 496x914]@Screen(0)[0,0 1680x1050] E:Y, T:3.0 E:Y, T:3.0
    for i in range(100):
        w = AppObject.window(i)
        if not w: 
            Log(logpath,"SetAppRegion:Window Not Found" )
            exit("Window Not Found")
        else:
        #vncregion = vnc.window(i)
            #w.highlight(5)
            #print i, " # ", w
            if w.getW() >= RegWidth:
                if w.getH() >= RegHeight:
                    w.highlight(3)
                    print i, " # ", w   
                    Log(logpath,"SetAppRegion:Found " + getRegionInfo(w))
                    break
            #w.highlight(1)
    return w

def SetAppRegionExitOnNull(AppObject,RegWidth,RegHeight):
    Log(logpath,"SetAppRegionExitOnNull")
    r = SetAppRegion(AppObject,RegWidth,RegHeight)
    #Validate region not null
    if not r: 
        print "Not Found: " ,AppObject, r
        r = selectRegion("Select the VNC window region")
        if not r:
            exit("Not Found") #exit script target app window region is invalid
        else:
            print "Found: " ,AppObject, r
    else: 
        print "Found: " ,AppObject, r
        return r

    
def SetVNCAppRegion():
    Log(logpath,"SetVNCAppRegion")
    AppTitle = "HUAWEI"
    vnc = SetApp(AppTitle)
    vncregion = SetAppRegionExitOnNull(vnc, 496,914)
    return vncregion

def getEnvironment():
    Log(logpath,"getEnvironment")
    envOS=Env.getOS()
    envOSVer=Env.getOSVersion()
    envSikuliVer=Env.getSikuliVersion()
    print "OS",envOS
    print "OS Version",envOSVer
    print "Sikuli Ver: ",envSikuliVer

def Log(pathname,msg):
    if not pathname:
        return
    if not msg:
        return
    f=open(pathname, 'a')
    f.write(msg+"\r\n")
    f.close()
    



##########################################
### define functions above main script ###
##########################################

##########################################
#Script Start
##########################################
AppTitle = ""
vnc = ""
testscriptname="homescreen1"
dt=strftime("%Y%m%d%H%M%S")
os.makedirs(dt)
TestFolder = "G:\\SWDev\\Private\\SQA Tests\\Automation\\Mobile\\Sikuli\\HomeScreen\\TestResults\\" + testscriptname + "_" + dt

os.makedirs(TestFolder)
logpath = TestFolder +"\\"+testscriptname+"_Log_" +dt +".txt"
Log(logpath,"START")
getEnvironment()
vncregion = SetVNCAppRegion()

# getImagePath() returns a Java array of unicode strings
imgPath = list(getImagePath()) # makes it a Python list
# to loop through
if imgPath:
    for p in imgPath:
        print "PATH: " + p
    else:
        print "imgPath not found"



 vncregion.wait("1370373531810.png")
 vncregion.find(Pattern("1370373564415.png").targetOffset(-48,0))

 vncregion.click(Pattern("1370373564415.png").targetOffset(-49,-4))


 vncregion.wait("1370373702533.png")
 

vncregion.wait("Help_gettingStarted.png")

vncregion.find("Help_UsingTouchScreen.png")


vncregion.find("Help_PhoneButtons.png")

vncregion.find("Help_AppsTab.png")

vncregion.find("Help_PeopleTab.png")


vncregion.find("Help_AddNewPeople.png")


vncregion.find("Help_MakeCall.png")


vncregion.find("Options_Help_ReceivePhoneCalls.png")


vncregion.find("Options_Help_StatusBar.png")



vncregion.find("Options_Help_Keyboard.png")


vncregion.find("Options_Help_Voicemail.png")


vncregion.find("Options_Help_Camera.png")


vncregion.find("Options_Help_DownloadingApps.png")


vncregion.find("Options_Help_FeaturedApps.png")


vncregion.find(Pattern("Global_BackButton.png").targetOffset(-1,-1))


vncregion.click(Pattern("Global_BackButton.png").targetOffset(-1,-1))


vncregion.find()






















 
 