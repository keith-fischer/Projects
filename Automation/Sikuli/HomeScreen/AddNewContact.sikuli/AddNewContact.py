

##########################################
#-->Script Home People Add contact
#start from home
##########################################
def TestAddContact(vncregion):
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



    FieldInputSelectItem(vncregion,"people_AddContact_Address.png","People_AddNewContact_PhoneTypeHomeSelected.png","People_AddNewContactPickWork.png","People_AddNewContact_SelectedWork.png" )


    FieldInput(vncregion, "people_AddContact_Address.png","123 street, city state zip")

#FieldInput(vncregion, "people_AddContactEventsDate.png","02/03/2013")

#FieldInput(vncregion, "people_AddContact_DateGroups.png","01/05/2013")

#FieldInput(vncregion,"people_AddContact_GroupName.png","My group name")


    ClickVerify(vncregion, "home_people_Addnew_verifyDoneContact.png" ,"newContact_Save.png" )
    ClickVerify(vncregion, "newContact_Save.png" ,"home_people_Addnew_verifyDoneContact.png" )
    ClickVerify(vncregion, "global_menu.png" ,"Apps_ExitContacts_Cancel.png" )    
    ClickVerify(vncregion ,"Apps_ExitContacts_Cancel.png"   ,"Apps_ExitContacts_Cancel.png" )    
    

#ClickVerify(vncregion,"App_PeopleTab.png" , "Apps_PeopleTab.png" )

    ClickVerify(vncregion, "Apps_AppsTab.png" , "Apps_verifyAppsPeopleTabs.png" )
##########################################
#<--Script Home People Add contact
#start from home
##########################################