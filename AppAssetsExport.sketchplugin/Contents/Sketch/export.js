@import 'common.js'
@import 'i18n.js'
@import 'icon-generator.js'

var presets = {
        xcodeProjectPath: '/Users/Shared/AppIcon/Assets.xcassets',
        androidResPath:'/Users/Shared/AppIcon/res',
        otherPath:'/Users/Shared/AppIcon',
        exportXcode:1,
        export_iOSIcon:1,
        export_watchOSIcon:0,
        exportAndroid:1,
        exportOther:1,
        desktopAppPath: '/Users/Shared/AppIcon/DesktopApp',
        exportDesktopApp:0,
        exportWinIco:0,
        export_macOSIcon:0,
        exportWebFav:0,
}   ;    

function generateAppleIconInfo(imageIdiom, imagePlatform, imageScale, imageSize) {
  const asset = {
    idiom: imageIdiom,
    platform: imagePlatform,
    scale: imageScale,
    size: imageSize
  };
  return asset;
}

const iOSIconInfos = [
  generateAppleIconInfo("universal", "ios", "2x", "20x20"),
  generateAppleIconInfo("universal", "ios", "3x", "20x20"),
  generateAppleIconInfo("universal", "ios", "2x", "29x29"),
  generateAppleIconInfo("universal", "ios", "3x", "29x29"),
  generateAppleIconInfo("universal", "ios", "2x", "38x38"),
  generateAppleIconInfo("universal", "ios", "3x", "38x38"),
  generateAppleIconInfo("universal", "ios", "2x", "40x40"),
  generateAppleIconInfo("universal", "ios", "3x", "40x40"),
  generateAppleIconInfo("universal", "ios", "2x", "60x60"),
  generateAppleIconInfo("universal", "ios", "3x", "60x60"),
  generateAppleIconInfo("universal", "ios", "2x", "64x64"),
  generateAppleIconInfo("universal", "ios", "3x", "64x64"),
  generateAppleIconInfo("universal", "ios", "2x", "68x68"),
  generateAppleIconInfo("universal", "ios", "2x", "76x76"),
  generateAppleIconInfo("universal", "ios", "2x", "83.5x83.5"),
  generateAppleIconInfo("universal", "ios", undefined, "1024x1024")
];


function generateImageContent(imageFilename, appleIconInfo) {
  const asset = {
    filename: imageFilename,
    idiom: appleIconInfo.idiom,
    platform: appleIconInfo.platform,
    scale: appleIconInfo.scale,
    size: appleIconInfo.size
  };
  return asset;
}

var I18N = Resources.I18N;

var doc,
    exportDir, 
    exportInfo,
    appIconSetPath,
    currentLayer,

    androidDirArray = ["ldpi","mdpi","hdpi","xhdpi","xxhdpi","xxxhdpi"],
    androidSizeArray = [ 36,48,72,96,144,192],

    storeSuffixArray = [ "iTunesArtwork","iTunesArtwork@2x","GooglePlay","mi-90","mi-136","mi-168","mi-192","mi-224","qq-16","qq-512"],
    storeSizeArray = [ 512,1024,512,90,136,168,192,224,16,512];

    macSuffixArray = ["16x16","16x16@2x","32x32","32x32@2x","128x128","128x128@2x","256x256","256x256@2x","512x512","512x512@2x"];
    macSizeArray = [16,32,32,64,128,256,256,512,512,1024];


  var userDefaults = loadDefaults(presets);

  /*
    用法
      var template1="我是{0}，今年{1}了";
 var template2="我是{name}，今年{age}了";
 var result1=template1.format("loogn",22);
 var result2=template2.format({name:"loogn",age:22});
 //两个结果都是"我是loogn，今年22了"
  */

    String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
    }
    



//lowcast : file name  to 
function exportScaleLayer(layer, dir, width, suffix){
     
  frame = [layer frame];
  var scale = width / [frame width];

  if(typeof suffix == 'undefined'){

    var name = layer.name()+".png";
    var path = dir+"/" + name.toLowerCase();

    log("exportScaleLayer "+path);

    exportLayerToPath(layer,path,scale,"png");
  } else {

    var name2 = layer.name()+"-"+suffix+".png";
    var path =  dir+"/"+ name2;

    log("exportScaleLayer2 "+path)

    exportLayerToPath(layer,path,scale,"png","-"+suffix);
  }

  return  name2;  
 }



 function initVars(context){
 	doc = context.document;
 	exportDir = "/Users/pro/Documents/AppIcon";

 	
 }

 function checkExportDir(path,suffix){
    if(typeof path == 'undefined'){
       path  = "/User/Shared/AppIcon";
    }

    if(path.endsWith("/"+suffix)){
       createFolderAtPath(path);

       
       
    }
    else {

      createFolderAtPath(path);


       path += "/"+suffix;

       createFolderAtPath(path);

       log("checkExportDir5 "+path+",num="+getSketchVersionNumber()); 
    }

    appIconSetPath = path;

    log("checkExportDir4 "+path);
 }


//Assets.xcassets
//Images.xcassets

function findImage(imagesArray,filename){

 

  for(i=0;i<imagesArray.length; i++){
      var imageObj =  imagesArray[i];
      if(imageObj.filename == filename)
        return true;

  }

  return false;
}

//在Content中增加相应记录

function calculateResultSize(scale, size) {
  if (scale && size) {
    const scaleValue = parseFloat(scale);
    const [width, height] = size.split("x").map(parseFloat);
    return `${scaleValue * width}x${scaleValue * height}`;
  } else if (size) {
    const [width, height] = size.split("x").map(parseFloat);
    return `${width}x${height}`;
  } else {
    return undefined;
  }
}

function addIconContentOfXCAssets(imagesArray, name, appleIconInfo){

  
  var suffix = calculateResultSize(appleIconInfo.scale, appleIconInfo.size)
  var filename = name+"-"+suffix+".png";
  
  const [width, height] = suffix.split("x").map(parseFloat);

  //查找是否已经生成,如果没有则生成
  if(!findImage(imagesArray, filename)){
      log("no find "+filename+",export ");
      exportScaleLayer(currentLayer, appIconSetPath, width, suffix);
  }
  else {
    log(" find "+filename);
  }

  imagesArray.push(generateImageContent(filename, appleIconInfo))   

}

function exportIconOfiOSContentJson(layer,imagesArray){

   var name = layer.name();

   for (var i = 0; i < iOSIconInfos.length; i++) {
    addIconContentOfXCAssets(imagesArray, name, iOSIconInfos[i])
   }
}

function exportWatchContentJson(layer,imagesArray){
  
}

function exportIOSIcon(layer) {
  //var tmpDir =  "/Users/pro/Documents/AppIcon";

  log("exportIOSIcon 1"+getSketchVersionNumber());


  checkExportDir(userDefaults.xcodeProjectPath,"AppIcon.appiconset");
  
  //输出所需图片
  var imagesArray = [];
  currentLayer = layer;

  if(userDefaults.export_iOSIcon ==1){
    exportIconOfiOSContentJson(layer,imagesArray);
  }


  exportInfo += I18N.EXPORT_IOS_ICON + appIconSetPath +"\n\n";


  // const currentDate = new Date();
  // const version = currentDate.getFullYear() * 10000 + (currentDate.getMonth() + 1) * 100 + currentDate.getDate();

  imageContent = {
    info : {
      version : 1, //version can't change for xcode
      author : "xcode"
    },
    images : imagesArray
  }

  log("exportIOSIcon 3");
  var filePath = appIconSetPath + "/Contents.json"
  log("json file2 "+filePath);

  const jsonString = JSON.stringify(imageContent, (key, value) => {
    if (value === undefined) return undefined;
      return value;
  }, 2);

  log("exportIOSIcon 4");
  writeTextToFile(jsonString, filePath)

  log("exportIOSIcon 5");
}

  function createGroup(mask){
   var group = [[mask parentGroup] addLayerOfType: 'group'];
    [group setName: groupName];
   copyLayerSize(mask, group);
    copyLayerPosition(mask, group); 
    return group;
 }

  function createMask(group, layer){
    var parentGroup = [layer parentGroup],
       newLayer = [layer duplicate];
     //clone
     [parentGroup removeLayer:newLayer];
    [group addLayer: newLayer];
     [parentGroup removeLayer: layer];
 
    //Set as mask
    [newLayer setName:"mask"]
    [newLayer setHasClippingMask: true];
     
     [[newLayer frame] setX:0];
    [[newLayer frame] setY:0];
 
    return layer;
   }

function exportMiniAppsIcon(layer,path){

  log("exportMiniAppsIcon2 "+path ); //MSOvalShape
   //exportScaleLayer(layer,path,200,"miniapps");

//https://github.com/bomberstudios/Sketch-Notebook/blob/master/library/notebook.js

}

function exportStoreIcon(layer){
       
        

          checkExportDir(userDefaults.otherPath,"store");

          log("exportStoreIcon3 "+appIconSetPath);

         // exportScaleLayer(layer,appIconSetPath,200,"miniapps");
         exportMiniAppsIcon(layer,appIconSetPath);

            for(var i=0; i< storeSuffixArray.length;i++){

            

            var suffix = storeSuffixArray[i];
            var size = storeSizeArray[i];

             exportScaleLayer(layer,appIconSetPath,size,suffix);
          }



          exportInfo += I18N.EXPORT_STORE_ICON+ appIconSetPath +"\n\n";



}

function exportAndroidIcon(layer){
  

           checkExportDir(userDefaults.androidResPath,"res");

          for(var i=0; i< androidDirArray.length;i++){

            

            var suffix = androidDirArray[i];
            var size = androidSizeArray[i];


             var path =  appIconSetPath+"/drawable-"+suffix;
             if (!createFolderAtPath(path)) {
                   log("create "+path+" failure!");
                   continue;
           
                  }

             exportScaleLayer(layer,path,size);
          }


          exportInfo += I18N.EXPORT_ANDROID_ICON+ appIconSetPath +"\n\n";


 }



 function export_macOSIcon(layer){

    checkExportDir(userDefaults.desktopAppPath, layer.name()+".iconset");

    var path = userDefaults.desktopAppPath + "/" + layer.name()+".iconset";

     for(var i=0; i< macSuffixArray.length;i++){

            

             var suffix = macSuffixArray[i];
             var size = macSizeArray[i];

              var name2 = "icon_"+suffix+".png";
             var scale = size / [[layer frame] width];
             
               exportLayerToPath(layer,path+"/"+ name2,scale,"png","-"+suffix);
          }

     //调用 icoutil 进行转换
     var convertTask = [[NSTask alloc] init];
     //convertTask.setLaunchPath("/bin/bash");
     //iconutil -c icon.icns <path to .iconset file>
     var convertIcns = "/usr/bin/iconutil -c icns  \""+ path+"\" -o \"" +userDefaults.desktopAppPath +"/"+layer.name()+".icns\""; 

     log("export_macOSIcon "+convertIcns);

      [convertTask setLaunchPath:@"/bin/bash"]
      [convertTask setArguments:["-c", convertIcns]]
      [convertTask launch]
      [convertTask waitUntilExit]

      if ([convertTask terminationStatus] == 0){
        log("export icns success");
      }
   

 }

 function  exportDesktopIcon(layer){
    
    
    if(userDefaults.exportWinIco == 1){

    }

   if(userDefaults.export_macOSIcon == 1){
        //checkExportDir(userDefaults.desktopAppPath,"iconset");
        export_macOSIcon(layer);
    }

     if(userDefaults.exportWebFav == 1){

    }

 }

 


 function exportMiniAppsIcon(context,text){

 }

 function showMultiText(context,text){
    var alert = NSAlert.alloc().init();
    log("showText "+text);
    alert.setMessageText(text);

    alert.addButtonWithTitle(I18N.CLOSE);
    
    alert.setIcon(NSImage.alloc().initWithContentsOfFile(
      context.plugin.urlForResourceNamed('logo.png').path()
      ));
   
    var responseCode = alert.runModal();


 }



