@import 'common.js'
@import 'export.js'
    

var onRun = function onRun(context){

  log("Open Setting Page");

  var userDefaults = loadDefaults(presets);

// NSMakeRect 的原点是左下角

  context.document.showMessage("show setting");

    var accessory = NSView.alloc().initWithFrame(NSMakeRect(0,0,300,280));


  var checkboxXCode = NSButton.alloc().initWithFrame(NSMakeRect(0,214,300,25));
    checkboxXCode.setButtonType(3);
    checkboxXCode.title = 'Input XCode Project (xcodeproj) folder';
    checkboxXCode.state =  userDefaults.exportXcode;

   
 var textXcode = NSTextView.alloc().initWithFrame(NSMakeRect(0,194,300,20));
    textXcode.string = '( or drop you project or workspace file to here)';
    textXcode.drawsBackground = false;
    textXcode.editable = false;


   var xcodeInput = NSTextField.alloc().initWithFrame(NSMakeRect(0,170,300,25));
    xcodeInput.stringValue = userDefaults.xcodeProjectPath;
    xcodeInput.editable = true;
    xcodeInput.placeholder="Drop you project or workspace file to here"

    var checkboxAndroid = NSButton.alloc().initWithFrame(NSMakeRect(0,124,300,25));
    checkboxAndroid.setButtonType(3);
    checkboxAndroid.title = 'Input Android Resource (res) folder';
    checkboxAndroid.state = userDefaults.exportAndroid;



var textAndroid = NSTextView.alloc().initWithFrame(NSMakeRect(0,104,300,20));
    textAndroid.string = '(or drop you AndroidManifest.xml file to here)';
    textAndroid.drawsBackground = false;
    textAndroid.editable = false;

   var androidInput = NSTextField.alloc().initWithFrame(NSMakeRect(0,80,300,25));
    androidInput.stringValue = userDefaults.androidResPath;
    androidInput.editable = true;


      var checkboxOther = NSButton.alloc().initWithFrame(NSMakeRect(0,36,300,25));
    checkboxOther.setButtonType(3);
    checkboxOther.title = 'Input open SDK icon directory';
   checkboxOther.state = userDefaults.exportOther;

var otherInput = NSTextField.alloc().initWithFrame(NSMakeRect(0,12,300,25));
    otherInput.stringValue = userDefaults.otherPath;
    otherInput.editable = true;


   accessory.addSubview(xcodeInput);
   accessory.addSubview(textXcode);
   accessory.addSubview(checkboxOther);
   accessory.addSubview(androidInput);
    accessory.addSubview(textAndroid);
   accessory.addSubview(checkboxAndroid);
    accessory.addSubview(otherInput);
     accessory.addSubview(checkboxXCode);


    var alert = NSAlert.alloc().init();
    alert.setMessageText('App Asset export directory');
    alert.addButtonWithTitle('Save preferences');
    alert.addButtonWithTitle('Cancel');
     alert.setIcon(NSImage.alloc().initWithContentsOfFile(
      context.plugin.urlForResourceNamed('logo.png').path()));
    alert.setAccessoryView(accessory);

    var responseCode = alert.runModal();


     if (responseCode === 1000) {

         userDefaults.xcodeProjectPath = xcodeInput.stringValue();
         userDefaults.androidResPath = androidInput.stringValue();
         userDefaults.otherPath = otherInput.stringValue();

         //log(@"save input xcode"+xcodeInput.stringValue())
        saveValues(userDefaults)  ;

        //NSApplication.sharedApplication().displayDialog_withTitle_("result", xcodeInput.stringValue);
    }
    else {
       //NSApplication.sharedApplication().displayDialog_withTitle_("result2", androidInput.stringValue);
    }
}


var onSetting = function onSetting(context){

  log("Open Setting Page");
  
  log("export222 "+I18N.LAETVERSION);

  log("userDefaults.xcodeProjectPath ="+userDefaults.xcodeProjectPath);

    var accessory = NSView.alloc().initWithFrame(NSMakeRect(0,0,300,340));


    var checkboxDesktop = NSButton.alloc().initWithFrame(NSMakeRect(0,295,300,25));
    checkboxDesktop.setButtonType(3);
    checkboxDesktop.title = I18N.INPUT_DESKTOP_APP_FLODER;
    checkboxDesktop.state =  userDefaults.exportDesktopApp;

  

   var desktopAppInput = NSTextField.alloc().initWithFrame(NSMakeRect(0,270,300,25));
    desktopAppInput.stringValue = userDefaults.desktopAppPath;
    desktopAppInput.editable = true;
    //desktopAppInput.placeholder="Drop you project or workspace file to here"


    var checkboxWinIco = NSButton.alloc().initWithFrame(NSMakeRect(20,246,300,25));
    checkboxWinIco.setButtonType(3);
    checkboxWinIco.title = 'Win Ico';
    checkboxWinIco.state =  userDefaults.exportWinIco;

    var checkboxMacIcns = NSButton.alloc().initWithFrame(NSMakeRect(100,246,300,25));
    checkboxMacIcns.setButtonType(3);
    checkboxMacIcns.title = 'Mac Icns';
    checkboxMacIcns.state =  userDefaults.export_macOSIcon;

    var checkboxWebFav = NSButton.alloc().initWithFrame(NSMakeRect(180,246,300,25));
    checkboxWebFav.setButtonType(3);
    checkboxWebFav.title = 'Web Favicon';
    checkboxWebFav.state =  userDefaults.exportWebFav;



  //var checkboxXCode = NSButton.alloc().initWithFrame(NSMakeRect(0,264,300,25));
  var checkboxXCode = NSButton.alloc().initWithFrame(NSMakeRect(0,199,300,25));
    checkboxXCode.setButtonType(3);
    checkboxXCode.title = I18N.INPUT_XCODE_FLODER;
    checkboxXCode.state =  userDefaults.exportXcode;

  

   var xcodeInput = NSTextField.alloc().initWithFrame(NSMakeRect(0,175,300,25));
    xcodeInput.stringValue = userDefaults.xcodeProjectPath;
    xcodeInput.editable = true;
    xcodeInput.placeholder="Drop you project or workspace file to here"


    var checkboxIphone = NSButton.alloc().initWithFrame(NSMakeRect(20,147,300,25));
    checkboxIphone.setButtonType(3);
    checkboxIphone.title = 'iOS';
    checkboxIphone.state =  userDefaults.export_iOSIcon;

    var checkboxAppleWatch = NSButton.alloc().initWithFrame(NSMakeRect(180,147,300,25));
    checkboxAppleWatch.setButtonType(3);
    checkboxAppleWatch.title = 'watchOS';
    checkboxAppleWatch.state =  userDefaults.export_watchOSIcon;


   // var checkboxAndroid = NSButton.alloc().initWithFrame(NSMakeRect(0,124,300,25));
    var checkboxAndroid = NSButton.alloc().initWithFrame(NSMakeRect(0,104,300,25));
    checkboxAndroid.setButtonType(3);
    checkboxAndroid.title = I18N.INPUT_ANDROID_FLODER;
    checkboxAndroid.state = userDefaults.exportAndroid;



// var textAndroid = NSTextView.alloc().initWithFrame(NSMakeRect(0,104,300,20));
//     textAndroid.string = '(or drop you AndroidManifest.xml file to here)';
//     textAndroid.drawsBackground = false;
//     textAndroid.editable = false;

   var androidInput = NSTextField.alloc().initWithFrame(NSMakeRect(0,80,300,25));
    androidInput.stringValue = userDefaults.androidResPath;
    androidInput.editable = true;


      var checkboxOther = NSButton.alloc().initWithFrame(NSMakeRect(0,36,300,25));
    checkboxOther.setButtonType(3);
    checkboxOther.title = I18N.INPUT_STORE_FLODER;
   checkboxOther.state = userDefaults.exportOther;

var otherInput = NSTextField.alloc().initWithFrame(NSMakeRect(0,12,300,25));
    otherInput.stringValue = userDefaults.otherPath;
    otherInput.editable = true;


   accessory.addSubview(checkboxDesktop);
   accessory.addSubview(desktopAppInput);
   accessory.addSubview(checkboxWinIco);
   accessory.addSubview(checkboxMacIcns);
   accessory.addSubview(checkboxWebFav);

   accessory.addSubview(xcodeInput);
 //  accessory.addSubview(textXcode);
   accessory.addSubview(checkboxOther);
   accessory.addSubview(checkboxIphone);
   accessory.addSubview(checkboxAppleWatch);
   accessory.addSubview(androidInput);
 //   accessory.addSubview(textAndroid);
   accessory.addSubview(checkboxAndroid);
    accessory.addSubview(otherInput);
     accessory.addSubview(checkboxXCode);


    var alert = NSAlert.alloc().init();
   alert.setMessageText(I18N.EXPORT_DIRCTORY);
    alert.addButtonWithTitle(I18N.SAVE_PREF);
    alert.addButtonWithTitle(I18N.CANCEL);
     alert.setIcon(NSImage.alloc().initWithContentsOfFile(
      context.plugin.urlForResourceNamed('logo.png').path()));
    alert.setAccessoryView(accessory);

    var responseCode = alert.runModal();


     if (responseCode === 1000) {

      

         userDefaults.desktopAppPath = desktopAppInput.stringValue();
         userDefaults.exportDesktopApp = checkboxDesktop.state();
         userDefaults.exportWinIco = checkboxWinIco.state();
         userDefaults.export_macOSIcon = checkboxMacIcns.state();
         userDefaults.exportWebFav = checkboxWebFav.state();

         userDefaults.xcodeProjectPath = xcodeInput.stringValue();
         userDefaults.androidResPath = androidInput.stringValue();
         userDefaults.otherPath = otherInput.stringValue();

         userDefaults.exportXcode = checkboxXCode.state();

         userDefaults.export_iOSIcon = checkboxIphone.state() ;

         userDefaults.export_watchOSIcon = checkboxAppleWatch.state();

         userDefaults.exportAndroid = checkboxAndroid.state();

         userDefaults.exportOther = checkboxOther.state();

         //log(@"save input xcode"+xcodeInput.stringValue())
        saveValues(userDefaults)  ;

        
    }
    else {
       
    }
 }

var onExportIcon = function onExportIcon(context)
{
    log("onExportIcon");

    console.log("context info -->")
    console.log(context)
    console.log("<--- context info")

    var userDefaults = loadDefaults(presets);

    //log("onExportIcon context: " + context + "--->");// + typeof(context));


    parseContext(context);

     //initVars(context);

    log("userDefaults.xcodeProjectPath ="+userDefaults.xcodeProjectPath);

    var selection = context.selection;

    exportInfo = ""; //输出文本


    log("onExportIcon section: "+selection+"--->"+typeof(selection));

    if(selection.count() >0) {

      var layer =    selection.firstObject();

      log("exportOther ="+userDefaults.exportOther.intValue());

      if(userDefaults.exportDesktopApp ==1) {
            exportDesktopIcon(layer);
      }

      //export_macOSIcon(layer);

      
      if(userDefaults.exportOther ==1)  
        exportStoreIcon(layer);

      if(userDefaults.exportXcode ==1)  
        exportIOSIcon(layer);
    
      if(userDefaults.exportAndroid ==1)    
        exportAndroidIcon(layer);
        
  
      if(exportInfo == "") {
         doc.showMessage(I18N.NONE_ICON_EXPORT);
      } else {
        showMultiText(context,exportInfo);
         //doc.showMessage(exportInfo);
      }
      
    } else { 
        doc.showMessage(I18N.PLEASE_SELECT_LAYER);
        console.log("-- fail info ---");
        console.log("doc:"+doc);
        console.log("selection:"+selection);
        console.log("scriptPath:"+scriptPath);
        console.log("command:"+currentCommand);
        console.log("plugin:"+plugin);
    }

     log("onExportIcon finished");
}
