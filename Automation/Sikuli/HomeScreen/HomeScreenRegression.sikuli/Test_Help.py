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

####################################################
### 
####################################################
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

####################################################
### 
####################################################
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

####################################################
### 
####################################################
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

 
####################################################
### 
####################################################   
def SetVNCAppRegion():
    Log(logpath,"SetVNCAppRegion")
    AppTitle = "HUAWEI"
    vnc = SetApp(AppTitle)
    vncregion = SetAppRegionExitOnNull(vnc, 496,914)
    return vncregion

####################################################
### 
####################################################
def getEnvironment():
    Log(logpath,"getEnvironment")
    envOS=Env.getOS()
    envOSVer=Env.getOSVersion()
    envSikuliVer=Env.getSikuliVersion()
    print "OS",envOS
    print "OS Version",envOSVer
    print "Sikuli Ver: ",envSikuliVer

####################################################
### 
####################################################
def Log(pathname,msg):
    if not pathname:
        return
    if not msg:
        return
    f=open(pathname, 'a')
    f.write(msg+"\r\n")
    f.close()
    
#def getRegionInfo(imageregion):
#    info = vncregion.find(imageregion).getFileName()
#    return info

####################################################
### 
####################################################
def ClickHighlight(imgRegion,imgClick):
    Log(logpath,"ClickHighlight:" + imgClick)
    if WaitHighlight(imgRegion,imgClick):
        imgRegion.click(imgClick)
        imgRegion.click(imgClick)

####################################################
### returns found region, not found is none
### highlights the found region
####################################################
def WaitHighlight(imgRegion,imgHighlight):
    Log(logpath,"WaitHighlight:" + imgHighlight)
    for x in range(5):
        Log(logpath,"WaitHighlight:" + str(x))
        if imgRegion.exists(imgHighlight,5.0):
            foundimg = imgRegion.find(imgHighlight)
            foundimg.highlight(1)
            return foundimg
        else:
            return

####################################################
### 
####################################################
def ClickScroll(imgRegion,imgClick,WHEEL_UP_DOWN,WHEEL_MOVE,WHEEL_MOVE_COUNT):
    Log(logpath,"ClickScroll:" + imgClick)
    imgRegion.click(imgRegion.getCenter())
    for x in range(WHEEL_MOVE_COUNT):
        Log(logpath,"ClickScroll:" + str(x))
        imgRegion.click(imgRegion.getCenter())
        if ClickHighlight(imgRegion,imgClick):
            break
        else:
            imgRegion.wheel(WHEEL_DOWN, WHEEL_MOVE)
    exit("FAILED:ClickScroll")

####################################################
### 
####################################################
def ClickVerify(imgRegion,imgClick,imgVerify):
    Log(logpath,"ClickVerify:" + ":"+imgClick+":"+imgVerify)
    for x in range(5):
        ClickHighlight(imgRegion,imgClick)
        waitregion = WaitHighlight(imgRegion,imgVerify)
        if waitregion:
            return waitregion
        else:
            Log(logpath,"ClickVerify:" + str(x))
    exit("FAILED:ClickVerify")

####################################################
### 
####################################################
def ClickScrollVerify(imgRegion,imgClick,imgVerify,WHEEL_UP_DOWN,WHEEL_MOVE,WHEEL_MOVE_COUNT):
    Log(logpath,"ClickScrollVerify:" + ":"+imgClick+":"+imgVerify)
    for x in range(2):
        ClickScroll(imgRegion,imgClick,WHEEL_DOWN,WHEEL_MOVE,WHEEL_MOVE_COUNT)
        waitregion = WaitHighlight(imgRegion,imgVerify)
        if waitregion:
            return waitregion
        else:
            Log(logpath,"ClickScrollVerify:" + str(x))
    exit("FAILED:ClickScrollVerify")



##########################################
### define functions above main script ###
##########################################

##########################################
#Script Start
##########################################
#setShowActions(true)

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

ClickScrollVerify(vncregion,"Home_Help_StatusBar.png","Home_Help_head-StatusBar.png",WHEEL_DOWN,10,10)

vncregion.wait("Home_Head-GreatCall.png")


ClickVerify(vncregion,"Home_Help.png","Home_Help_headHelp.png")


ClickVerify(vncregion,"Home_Help_gettingStarted.png","Home_Help_head-GetStarted.png")

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickVerify(vncregion,"Home_Help_UsingTouchScreen.png","Home_Help_head-Using-Touch-Screen.png")


ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickVerify(vncregion,"Home_Help_PhoneButtons.png" ,"Home_Help_head-PhoneButtons.png" )

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickVerify(vncregion,"Home_Help_AppsTab.png" ,"Home_Help_head-AppsTab.png" )
ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickVerify(vncregion,"Home_Help_PeopleTab.png","Home_Help_head-PeopleTab.png")

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickVerify(vncregion,"Home_Help_AddNewPeople.png" , "Home_Help_head-AddNewPeople.png")

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickVerify(vncregion,"Home_Help_MakeCall.png" , "Home_Help_head-MakeACall.png")

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickVerify(vncregion,"Home_Help_ReceivePhoneCalls.png" ,"Home_Help_head-ReceivePhoneCalls.png" )

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickScrollVerify(vncregion,"Home_Help_StatusBar.png","Home_Help_head-StatusBar.png",WHEEL_DOWN,10,10)

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickScrollVerify(vncregion,"Home_Help_Keyboard.png","Home_Help_head-Keyboard.png",WHEEL_DOWN,10,10)


WaitHighlight(vncregion,"Home_Help_head-KeyboardDiagram.png")

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickScrollVerify(vncregion,"Home_Help_Voicemail.png","Home_Help_head-Voicemail.png",WHEEL_DOWN,10,10)


ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickScrollVerify(vncregion,"Home_Help_Camera.png","Home_Help_head-Camera.png",WHEEL_DOWN,10,10)


ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickScrollVerify(vncregion,"Home_Help_DownloadingApps.png","Home_Help_head-DownloadApps.png",WHEEL_DOWN,10,10)


ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

ClickScrollVerify(vncregion,"Home_Help_FeaturedApps.png","Home_Help_head-FeaturedApps.png",WHEEL_DOWN,10,10)

ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")



ClickVerify(vncregion,"Home_Help_CloseHelp.png","Home_Head-GreatCall.png")

