import java
import os
from time import strftime

global targetApp
#need the guide extension
#from guide import *

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
    Log(logpath,"SetAppRegion: Find W=" + str(RegWidth)+" - H="+str(RegHeight))
    AppObject.focus()
    wait(1)
    # r = AppObject.window(2)
    #Found: HUAWEI(7448) Region[1181,56 496x914]@Screen(0)[0,0 1680x1050] E:Y, T:3.0 E:Y, T:3.0
    for i in range(100):
        w = AppObject.window(i)
        if not w: 
            Log(logpath,str(i)+" - SetAppRegion:Window Not Found" )
            break
            #exit("Window Not Found")
        else:
            Log(logpath,str(i) +" - SetAppRegion - W="+str(w.getW())+" - H="+ str(w.getH()))
            if w.exists("global_vncregion_title.png"):
                print i, " # ", w   
                Log(logpath,"SetAppRegion:Found by Title: " + getRegionInfo(w))
                w.highlight(3)
                break
            elif w.getW() >= RegWidth:
                if w.getH() >= RegHeight:
                    w.highlight(3)
                    print i, " # ", w   
                    Log(logpath,"SetAppRegion:Found by Size: " + getRegionInfo(w))
                    break
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
    AppTitle = "HUAWEI"
    Log(logpath,"SetVNCAppRegion:Find "+AppTitle)
    targetApp = SetApp(AppTitle)
    vncregion = SetAppRegionExitOnNull(targetApp, 496,914)
    if not vncregion:
        Log(logpath,"SetVNCAppRegion: Found")
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
    # getImagePath() returns a Java array of unicode strings
    imgPath = list(getImagePath()) # makes it a Python list
    # to loop through
    if imgPath:
        for p in imgPath:
            print "IMAGE PATH: " + p
    else:
        print "imgPath not found"



####################################################
### 
####################################################
def Log2(pathname,msg):
    if not pathname:
        return
    if not msg:
        return
    try:
        f=open(pathname, 'a')
        f.write(msg+"\r\n")
    finally:
        f.close()

####################################################
### 
####################################################
def Log(pathname,msg):
    s = strftime("%H:%M:%S")+"\t"
    try:
        Log2(pathname,s+msg)
    except:
        Log2(pathname,s+str(msg))

def strCharBlock(char,count):
    rc=""
    for x in range(count):
        rc+=char
    return rc


def switchAppVNC():
    switchApp("HUAWEI M881")
    Log(logpath,"switchAppVNC:")
####################################################
### 
####################################################
#def getRegionInfo(imageregion):
#    info = vncregion.find(imageregion).getFileName()
#    return info


####################################################
### 
####################################################
def TabFields(imgRegion,TabCount):
    #App.focus("vncviewer.exe")
    Log(logpath,"TabFields:")
    switchAppVNC()
    for i in range(TabCount):
        imgRegion.type(Key.TAB)

####################################################
### 
####################################################
def SwipeUp(imgRegion):
    Log(logpath,"SwipeUp:")
    #App.focus("vncviewer.exe")#App.focus method does not work
    switchAppVNC()
    
    LocStart =  imgRegion.getCenter().above(20)
    LocStop  =  imgRegion.getCenter().above(260)
    imgRegion.drag(LocStart)
    imgRegion.dropAt(LocStop)
#    imgRegion.mouseMove(LocStart)
#    imgRegion.mouseDown(Button.LEFT)
#    imgRegion.mouseMove(LocStop)
#    imgRegion.mouseUp()

####################################################
### WheelUp(imgRegion):
####################################################
def WheelUp(imgRegion):
    Log(logpath,"WheelUp:")
    switchAppVNC()
    imgRegion.wheel(WHEEL_UP, 1)

####################################################
### WheelDown(imgRegion):
####################################################
def WheelDown(imgRegion):
    Log(logpath,"WheelDown:")
    switchAppVNC()
    imgRegion.wheel(WHEEL_DOWN, 1)

####################################################
### 
####################################################
def SwipeDown(imgRegion):
    Log(logpath,"SwipeDown:")
    #App.focus("vncviewer.exe") #App.focus method does not work
    switchAppVNC()
    LocStart =  imgRegion.getCenter().above(260)
    LocStop  =  imgRegion.getCenter().above(20)
    imgRegion.drag(LocStart)
    imgRegion.dropAt(LocStop)
    
#    imgRegion.mouseMove(LocStart)
#    imgRegion.mouseDown(Button.LEFT)
#    imgRegion.mouseMove(LocStop)
#    imgRegion.mouseUp(Button.LEFT)

    
####################################################
### 
####################################################
def ClickHighlight(imgClick):
    Log(logpath,"ClickHighlight:")
#    imageFound=WaitHighlight(imgRegion,imgClick,10)
    imgClick.highlight(1)
    ClickImage(imgClick)

####################################################
### 
####################################################
def ClickImage(imgClick):
    Log(logpath,"ClickImage:")
    imgClick.click()


####################################################
### returns found region, not found is none
### highlights the found region
####################################################
def IsFindImage(imgRegion,imgFind,timeout):
    Log(logpath,"IsFindImage:" + imgFind)
    if imgRegion.exists(imgFind,timeout):
            imgFound=imgRegion.find(imgFind)
            Log(logpath,"IsFindImage:FOUND" )
            return imgFound
    else:
        Log(logpath,"IsFindImage:NOT FOUND" )
        return

####################################################
### 
####################################################
def WaitHighlight(imgRegion,imgHighlight):
    return WaitHighlight(imgRegion,imgHighlight,2)

####################################################
### returns found match object imgHighlight within imgRegion, not found is none
### highlights the found imgHighlight
####################################################
def WaitHighlight(imgRegion,imgHighlight,timeout):
    Log(logpath,"WaitHighlight:" + imgHighlight)
    foundimg = IsFindImage(imgRegion,imgHighlight,timeout)
    if foundimg:
        foundimg.highlight(1)
        Log(logpath,"WaitHighlight:Found")
        return foundimg
    else:
        Log(logpath,"WaitHighlight:Not Found")
        return


####################################################
### Scrolls list until target is visible and clicks target
####################################################
def TabScroll(imgRegion, imgFind, TabCount):
    Log(logpath,"TabScroll:" + imgFind)

    for x in range(TabCount):
        waitregion = WaitHighlight(imgRegion,imgFind,1)
        if waitregion:
            Log(logpath,"TabScroll: FOUND")
            return waitregion
        else:
            Log(logpath,"TabScroll: "+ str(x))
            TabFields(imgRegion,1)


#search failed        
    Log(logpath,"FAILED:TabScroll:" + imgFind)
    return none




####################################################
### Scrolls list until target is visible and clicks target
####################################################
def FindScroll(imgRegion, imgFind, WHEEL_UP_DOWN, WHEEL_MOVE, WHEEL_MOVE_COUNT):
    Log(logpath,"FindScroll:" + imgFind)
    #targetApp.focus()
#    location0 = new Location(0,0)
    switchAppVNC()
#    imgRegion.click(location0)
    #imgRegion.click(imgRegion.getCenter())
    trycount=0
    for x in range(WHEEL_MOVE_COUNT):
        waitregion = WaitHighlight(imgRegion,imgFind,2)
        if waitregion:
            Log(logpath,"FindScroll: FOUND")
            return waitregion
        else:
            Log(logpath,"FindScroll: SWIPEUP" + str(x))
            SwipeUp(imgRegion)
            waitregion = WaitHighlight(imgRegion,imgFind,1)
            if waitregion:
                Log(logpath,"FindScroll: FOUND")
                return waitregion
            else:
                WheelUp(imgRegion)


    for x in range(WHEEL_MOVE_COUNT):
        waitregion = WaitHighlight(imgRegion,imgFind,2)
        if waitregion:
            Log(logpath,"FindScroll: FOUND")
            return waitregion
        else:
            Log(logpath,"FindScroll: SWIPEDOWN" + str(x))
#            TabFields(imgRegion,10)
            SwipeDown(imgRegion)
            waitregion = WaitHighlight(imgRegion,imgFind,1)
            if waitregion:
                Log(logpath,"FindScroll: FOUND")
                return waitregion            
            else:
                WheelDown(imgRegion)

#search failed        
    Log(logpath,"FAILED:FindScroll:" + imgFind)
    return none




####################################################
### Scrolls list until target is visible and clicks target
####################################################
def ClickScroll(imgRegion, imgClick, WHEEL_UP_DOWN, WHEEL_MOVE, WHEEL_MOVE_COUNT):
    Log(logpath,"ClickScroll:" + imgClick)
    #imgRegion.click(imgRegion.getCenter())
    for x in range(WHEEL_MOVE_COUNT):
        waitregion = FindScroll(imgRegion,imgClick,1,1,WHEEL_MOVE_COUNT)
        #waitregion = WaitHighlight(imgRegion,imgClick,2)
        if waitregion:
            ClickHighlight(waitregion)
            Log(logpath,"ClickScroll: Clicked")
            return waitregion
        else:
            Log(logpath,"ClickScroll:" + str(x))
#            SwipeUp(imgRegion)
            #imgRegion.wheel(WHEEL_DOWN, WHEEL_MOVE)
            wait(3)
    Log(logpath,"FAILED:ClickScroll:" + imgClick)
    exit()

####################################################
### 
####################################################
def ClickVerify(imgRegion,imgClick,imgVerify):
    Log(logpath,"ClickVerify:" + ":"+imgClick+":"+imgVerify)
    for x in range(2):
        waitregion = WaitHighlight(imgRegion,imgClick,10)
        if waitregion:
            Log(logpath,"ClickVerify:Click" )
            ClickHighlight(waitregion)
            waitVregion = WaitHighlight(imgRegion,imgVerify,10)
            if waitVregion:
                Log(logpath,"ClickVerify:Found" )
                return waitVregion
            else:
                Log(logpath,"ClickVerify:NOT Found" )
        else:
            Log(logpath,"ClickVerify:" + str(x))
    Log(logpath,"FAILED:ClickVerify" + imgClick)
    exit()

####################################################
### 
####################################################
def ClickScrollVerify(imgRegion,imgClick,imgVerify,WHEEL_UP_DOWN,WHEEL_MOVE,WHEEL_MOVE_COUNT):
    Log(logpath,"ClickScrollVerify:"+imgClick+":"+imgVerify)
    for x in range(2):
        waitregion = ClickScroll(imgRegion,imgClick,WHEEL_DOWN,WHEEL_MOVE,2)
        if waitregion:
            Log(logpath,"ClickScrollVerify:Clicked")
            waitregion = WaitHighlight(imgRegion,imgVerify,10)
            if waitregion:
                Log(logpath,"ClickScrollVerify:Found")
                return waitregion
            else:
                Log(logpath,"FAILED:ClickScrollVerify:Verify:" + imgVerify)
        else:
            Log(logpath,"ClickScrollVerify:Click:" + str(x))
    Log(logpath,"FAILED:ClickScrollVerify:Click:" + imgClick)
    exit(1)

####################################################
### 
####################################################
def FieldInput(imgRegion,imgField,keyText):
    Log(logpath,"FieldInput:" + keyText)
    imgfound = TabScroll(imgRegion,imgField,10)
    if imgfound:
        click(imgfound)
        imgfound.type(keyText)
        TabFields(imgRegion,1)
        Log(logpath,"FieldInput: Found")
        return
    Log(logpath,"FieldInput: FAILED") 
    exit()
    
####################################################
### 
####################################################
def FieldInputSelectItem(imgRegion,imgField,imgFldSelectDefault,imgSelectPick,imgFldSelected):
    Log(logpath,"FieldInputSelectItem:" )
    #do phone type select first for default phone field image
    TabScroll(vncregion,imgField,10)
    ClickVerify(vncregion,imgFldSelectDefault ,imgSelectPick )
    ClickVerify(vncregion,imgSelectPick   ,imgFldSelected )
    Log(logpath,"FieldInputSelectItem:Selected" )


##########################################
#Script START DEBUG: this is temp code for test debug/construction
##########################################


def TestDebug(vncregion):
    Log(logpath,"\n\r-------------------------------------")
    Log(logpath,"START: TestDebug")

    type("People_NewContacName.png", "testContactName1")

    type( "People_NewAddOrganizationName.png" , "testOrganization1")

    type( "People_NewTitleName.png" , "testTitle1")

    FindScroll(vncregion, "People_AddNewPhone.png",WHEEL_DOWN,1,1)

    type( "People_AddNewPhone.png" , "testPhone1")

    ClickVerify(vncregion,"people_AddNewMobile.png"  ,"people_SelectPhoneType.png"  )
    ClickVerify(vncregion,"people_SelectPhoneType.png"   ,"people_selectedPhoneTypeHome.png"  )




    ClickVerify(vncregion,"people_SelectRingtone.png"  ,"people_selectRingtoneTypeDialog.png"  )

    ClickVerify(vncregion,"people_selectRingtoneItem.png"  ,"people_RingtoneList.png"  )

    ClickVerify(vncregion,"people_selectArgoItem.png" ,"people_SelectedArgoItem.png"  )

    ClickVerify(vncregion,"people_SelectDefaultItem.png" , "people_SelectedDefaultItem.png" )

    ClickVerify(vncregion,"people_ringtonesListOK.png" , "people_contactsDonebutton.png" )

    exit()

    Log(logpath,"PASSED: TestDebug ")
##########################################
#Script END DEBUG
##########################################


##########################################
#Script Start VoiceMail
##########################################

def TestVoiceMail(vncregion):
    Log(logpath,"\n\r-------------------------------------")
    Log(logpath,"START: TestVoiceMail ")
    ClickVerify(vncregion,"App_PeopleTab.png" , "Apps_PeopleTab.png" )

    ClickVerify(vncregion, "Apps_AppsTab.png" , "Apps_verifyAppsPeopleTabs.png" )
    
    ClickVerify(vncregion,"Home_Voicemail.png" ,"Home_headVoicemail.png"  )

    ClickVerify(vncregion,"Home_VoicemailHangup.png"  , "Home_Voicemail.png"  )

    Log(logpath,"PASSED: TestVoiceMail")
##########################################
#Script Start Home
##########################################

#ClickVerify(vncregion,"Home_GreatCall.png" ,"Home_Head-GreatCall.png" )



##########################################
#Script Home Contacts Us
##########################################
def TestContactUs(vncregion):
    Log(logpath,"\n\r-------------------------------------")
    Log(logpath,"START: TestContactUs ")
    ClickVerify(vncregion,"Home_GreatCall.png" ,"Home_Head-GreatCall.png" )

    ClickVerify(vncregion,"Home_ContactUs.png","Home_ContactUs_verifyNeedHelpAccount.png")

    ClickVerify(vncregion,"Global_BackButton.png","Home_Head-GreatCall.png")
    
    ClickVerify(vncregion,"Global_BackButton.png","Home_GreatCall.png")
    
    #ClickVerify(vncregion,"Home_GreatCall.png" ,"Home_Head-GreatCall.png" )
    Log(logpath,"PASSED: TestContactUs")
##########################################
#-->Script Home Featured Apps
##########################################
def TestFeaturedApps(vncregion):

    Log(logpath,"\n\r-------------------------------------")
    Log(logpath,"START: TestFeaturedApps ")
    ClickVerify(vncregion,"Home_GreatCall.png" ,"Home_Head-GreatCall.png" )
    
    ClickVerify(vncregion,"Home_FeaturedApps.png","Home_FeaturedApps_headFeaturedApps.png")
    
    ClickVerify(vncregion,"FeaturedApps_5Star.png","FeaturedApps_PlayStore.png")

    
    ClickVerify(vncregion,"Global_BackButton.png","Home_FeaturedApps_headFeaturedApps.png")
    ClickVerify(vncregion,"Global_BackButton.png","Home_Head-GreatCall.png")

    ClickVerify(vncregion,"Global_BackButton.png","Apps_verifyAppsPeopleTabs.png")
    Log(logpath,"PASSED: TestFeaturedApps")
##########################################
#<--Script Home Featured Apps
##########################################
    
##########################################
#-->Script Home People Add contact
#start from home
##########################################
def TestAddContact(vncregion):
    Log(logpath,"\n\r-------------------------------------")    
    Log(logpath,"START: TestAddContact ")
    
    ClickVerify(vncregion,"App_PeopleTab.png" , "Apps_PeopleTab.png" )
#ClickScrollVerify(vncregion,  ,  ,WHEEL_DOWN,10,10)

    find("Apps_PeopleTab_NoContacts.png")
    
    ClickVerify(vncregion,"global_menu.png" , "home_people_menu_AddNew.png" )

    ClickVerify(vncregion, "home_people_menu_AddNew.png", "home_people_Addnew_verifyDoneContact.png" )



#FieldInput(vncregion, "People_AddNewContactPhoneContact.png",    "Phone Contact1")

    FieldInput(vncregion, "People_AddNewContact_Name.png",    "Contact Name1")

    FieldInput(vncregion,"People_AddNewContact_AddOrganization.png" ,    "")

    FieldInput(vncregion,"People_AddNewContact_Company.png" ,    "Company1")

    FieldInput(vncregion,"People_AddNewContact_Title.png" ,    "Title1")

#People_AddNewContact
    FieldInputSelectItem(vncregion,"People_AddNewPhone.png","people_AddNewMobile.png" ,"people_SelectPhoneType.png","People_AddNewContact_PhoneTypeHomeSelected.png")

    FieldInput(vncregion, "People_AddNewPhone.png","555-555-5555")

#TabScroll(vncregion,"People_AddNewPhone.png",10)

#do phone type select first for default phone field image
#ClickVerify(vncregion,"people_AddNewMobile.png"  ,"people_SelectPhoneType.png"  )
#ClickVerify(vncregion,"people_SelectPhoneType.png"   ,"People_AddNewContact_PhoneTypeHomeSelected.png" )


    FieldInputSelectItem(vncregion,"People_AddNewContact_Email-1.png","People_AddNewContact_PhoneTypeHomeSelected.png","People_AddNewContact_pickMobile.png","people_AddNewMobile.png" )


#ClickVerify(vncregion,"people_AddNewMobile.png"  ,"people_SelectPhoneType.png"  )

    FieldInput(vncregion,"People_AddNewContact_Email-1.png" ,"email1@email1.com")

    TabScroll(vncregion,"People_AddNewContact_PhoneTypeHomeSelected.png",10)#default

    FieldInputSelectItem(vncregion,"people_AddContact_Address.png","People_AddNewContact_PhoneTypeHomeSelected.png","people_NewContact_SelectItem_Work.png","People_AddNewContact_SelectedWork.png" )

    FieldInput(vncregion,"people_AddContact_AddressEdit.png" ,"123 street, city state zip")

    FieldInputSelectItem(vncregion,"people_NewContactSelectGroupName.png","people_NewContactSelectGroupName.png","people_NewContactSelectGrpName_Work.png","people_SelectedGrpNameWork.png" )

    ClickVerify(vncregion, "people_GroupNameItemFieldSeleted_Work.png" ,"people_GroupNameItemFieldSeleted_Work.png")

#FieldInput(vncregion, "people_AddContactEventsDate.png","02/03/2013")

#FieldInput(vncregion, "people_AddContact_DateGroups.png","01/05/2013")

#FieldInput(vncregion,"people_AddContact_GroupName.png","My group name")


    #ClickVerify(vncregion, "home_people_Addnew_verifyDoneContact.png" ,"newContact_Save.png" )
    
    #ClickVerify(vncregion, "newContact_Save.png" ,"home_people_Addnew_verifyDoneContact.png" )
    
    ClickVerify(vncregion, "global_menu.png" ,"Apps_ExitContacts_Cancel.png" )    
    
    ClickVerify(vncregion ,"Apps_ExitContacts_Cancel.png"   ,"Apps_ExitContacts_Cancel.png" )    

    #ClickVerify(vncregion, "global_menu.png" ,"Apps_ExitContacts_Delete.png")    
    wait(3)
    ClickVerify(vncregion,find( "NewContacts_DialogTitle_DiscardChanges.png").below("App_DeleteContact_OK.png"),"Apps_PeopleTab.png")    

#ClickVerify(vncregion,"App_PeopleTab.png" , "Apps_PeopleTab.png" )

    ClickVerify(vncregion, "Apps_AppsTab.png" , "Apps_verifyAppsPeopleTabs.png" )

    Log(logpath,"PASSED: TestAddContact ")    
##########################################
#<--Script Home People Add contact
#start from home
##########################################

##########################################
#Script Home  Apps
#start from home
##########################################

def SelectFavoriteApps(vncregion):
    Log(logpath,"\n\r-------------------------------------")
    Log(logpath,"START: SelectFavoriteApps")
    ClickScrollVerify(vncregion,"Apps_LiveNurse.png"  , "Apps_LiveNurse_headLiveNurse.png" ,WHEEL_DOWN,10,10)


    ClickVerify(vncregion,"Global_BackButton.png","Apps_verifyAppsPeopleTabs.png")



#ClickVerify(vncregion,"App_PeopleTab.png" , "Apps_PeopleTab.png" )

#ClickVerify(vncregion, "Apps_AppsTab.png" , "Apps_verifyAppsPeopleTabs.png" )

    ClickScrollVerify(vncregion, "Apps_MedCoach.png" , "Apps_MedCoach_headMedCoach.png" ,WHEEL_DOWN,10,10)

    ClickVerify(vncregion,"Global_BackButton.png","Apps_verifyAppsPeopleTabs.png")


    #ClickVerify(vncregion, "App_HomeGreatCall.png" , "Home_Head-GreatCall.png" )
    Log(logpath,"PASSED: SelectFavoriteApps")

##########################################
#<--Script Home  Apps
#return to  home
##########################################

##########################################
#Script Home HELP
##########################################

def TestHelp(vncregion):
    Log(logpath,"\n\r-------------------------------------")
    Log(logpath,"START: TestHelp ")
    ClickVerify(vncregion, "App_HomeGreatCall.png" , "Home_Head-GreatCall.png" )
    vncregion.wait("Home_Head-GreatCall.png")

#srnshotfile = Screen.capture(vncregion)



    ClickVerify(vncregion,"Home_Help.png","Home_Help_headHelp.png")

    ClickVerify(vncregion,"Home_Help_gettingStarted.png","Home_help_headGettingStarted.png")

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
    
    #FindScroll(vncregion,"Home_Help_StatusBar.png",5,5,5)
    
    ClickScrollVerify(vncregion,"Home_Help_StatusBar.png","Home_Help_head-StatusBar.png",WHEEL_DOWN,10,10)

    ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")
    
    #FindScroll(vncregion,"Home_Help_Keyboard.png",5,5,5)
    
    ClickScrollVerify(vncregion,"Home_Help_Keyboard.png","Home_Help_head-Keyboard.png",WHEEL_DOWN,10,10)

    WaitHighlight(vncregion,"Home_Help_head-KeyboardDiagram.png",2)

    ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

    #FindScroll(vncregion,"Home_Help_Voicemail.png",5,5,5)

    ClickScrollVerify(vncregion,"Home_Help_Voicemail.png","Home_Help_head-Voicemail.png",WHEEL_DOWN,10,10)

    ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

    #FindScroll(vncregion,"Home_Help_Camera.png",5,5,5)
        

    ClickScrollVerify(vncregion,"Home_Help_Camera.png","Home_Help_head-Camera.png",WHEEL_DOWN,10,10)

    ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

    #FindScroll(vncregion,"Home_Help_DownloadingApps.png",5,5,5)

    ClickScrollVerify(vncregion,"Home_Help_DownloadingApps.png","Home_Help_head-DownloadApps.png",WHEEL_DOWN,10,10)

    ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

    ClickScrollVerify(vncregion,"Home_Help_FeaturedApps.png","Home_Help_head-FeaturedApps.png",WHEEL_DOWN,10,10)

    ClickVerify(vncregion,"Home_Help_button-Help-list.png","Home_Help_gettingStarted.png")

    ClickVerify(vncregion,"Home_Help_CloseHelp.png","Home_Head-GreatCall.png")

    ClickVerify(vncregion,"Global_BackButton.png","Home_Head-GreatCall.png")
    ClickVerify(vncregion,"Global_BackButton.png","Apps_verifyAppsPeopleTabs.png")
    
    Log(logpath,"PASSED: TestHelp")
##########################################
#Script END Home HELP
##########################################





##########################################
### define functions above main script ###
##########################################

##########################################
#Script Start
##########################################
#setShowActions(true)

AppTitle = ""
vnc = ""
testscriptname="HomescreenRegression"
dt=strftime("%Y%m%d%H%M%S")
#os.makedirs(dt)
rootdir="C:\\Automation\\Sikuli\\HomeScreen\\TestResults\\"
#rootdir="G:\\SWDev\\Private\\SQA Tests\\Automation\\Mobile\\Sikuli\\HomeScreen\\TestResults\\"
TestFolder = rootdir + testscriptname + "_" + dt

os.makedirs(TestFolder)
logpath = TestFolder +"\\"+testscriptname+"_Log_" +dt +".txt"
Log(logpath,"Start Framework Environment")
getEnvironment()
vncregion = SetVNCAppRegion()
step=0
#need guide extension to use
#Guide.tooltip(vncregion,"VNC Mobile Window")

#########################################################
### Script Start
Log(logpath,"****Script Start *****")
#########################################################
#ok
TestVoiceMail(vncregion)
#ok
SelectFavoriteApps(vncregion)
#ok
TestContactUs(vncregion)
#ok
TestFeaturedApps(vncregion)
#bug: seems not scrolloing help list
TestHelp(vncregion)
TestAddContact(vncregion)
