var query = getQueryParams(document.location.search);
var postId = query.postId||0;
var postUrl = "http://api.vocinno.com/vocinno/nosession/post/post?postId=45252";
var postAnalysisUrl = "http://api.vocinno.com/vocinno/nosession/post/getPostAnalysisByPost?postId="+postId;
var postImageUrl = "http://www.bengjiujie.com/public/images/";
var toVoteHost="http://api.vocinno.com/vocinno/nosession/post/vote";
var commentHost="http://api.vocinno.com/vocinno/nosession/post/comment";

//帖子详情及投票分析结果
var postObj = {};
var postAnalysisObj={};

//投票信息
var optionInfo={};

var dataPage = {
  'dataTabs': {},
  'isDataPageNeverDisplayed': true,
  'dataViewed': [false,false,false,false],
  'SUM_DATA': 0x00000,
  'GENDER_DATA' : 0x00001,
  'ASTRO_DATA' : 0x00002,
  'YEARS_DATA' : 0x00003
}

var turntableOpts = {
  'currentRotate': 0,
  'centerX': 310,
  'centerY': 240,
  'blindDis': 20,
  'turntablLastX': 0,
  'turntableLastY': 0,
  'turntableLastTime': 0,
  'turntablLastAstroIndex': 0,
  'astroStringArr': ["摩羯座","水瓶座","双鱼座","白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座"]
}

var pageOneLastX = 0,pageOneLastY = 0, pageThreeLastX = 0, pageThreeLastY = 0;

// var rotateTimer;
// var restStep = 20;

var drawSumOpts = {
  'drawDataSumTimer': {},
  'arcOptionOneForSum': {},
  'arcOptionTwoForSum': {},
  'dOptionOneForSum': "",
  'dOptionTwoForSum': "",
  'startingDot': {},
  'startingDotX': 155,
  'startingDotY': 75,
  'startingDotRadius': 3,
  'scopeLine': {},
  'scopeLinePath': '',
  'breakingDotX': 175,
  'breakingDotY': 55,
  'endingDotX': 315,
  'endingDotY': 55,
  'endingDot': {},
  'SPEED': 20,
  'optionOneRadian': 70,
  'optionTwoRadian': 290,
  'STEP': 100,
  'SUM_CIRCLE_STEP': 50,
  'DOT_STEP': 20,
  'SCOPE_STEP': 10,
  'LINE_STEP': 20,
  'RADIUS':100,
  'currentStep': 0,
  'strokeWidth': 20,
  'centerX': 120,
  'centerY': 120,
  'drawOptionArcTimer': {}
}

var drawGenderOpts = {
  'DRAW_GENDER_CIRCLE_PRIOD': 40,
  'DRAW_GENDER_CIRCLE_STEP': 50,
  'genderPer': [{x:0.75,y:0.25},{x:0.75,y:0.25}],
  'genderStep': [{x:0,y:0},{x:0,y:0}],
  'star': [{x:3*Math.PI/2,y:3*Math.PI/2},{x:3*Math.PI/2,y:3*Math.PI/2}],
  'genderCount': 0,
  'genderTimer': null,
  'genderCtx': [document.getElementById("manCanvas").getContext("2d"),document.getElementById("womanCanvas").getContext("2d")]
}

var drawAstroOpts = {
  'astrobiumCanvas': {},
  'astroCtx': {},
  'drawAstroStep': 0,
  'drawAstrobiumTimer': null,
  'constellationString': ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],
  'AstroNameArray': ["双鱼座","白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座","摩羯座","水瓶座"],
  'constellationData': [],

  "ASTROBIUM_DRAW_SPEED":20,

  "ASTROBIUM_CIRCLES_ANIM_STEP":15,
  "ASTROBIUM_LINES_ANIM_STEP":10,
  "ASTROBIUM_DATA_ANIM_STEP":25,

  "ASTROBIUM_OPTION_ONE_FILL":"rgba(62,230,249,0.3)",
  "ASTROBIUM_OPTION_TWO_FILL":"rgba(254,207,67,0.3)",
  "ASTROBIUM_OPTION_ONE_STROKE":"#3EE6F9",
  "ASTROBIUM_OPTION_TWO_STROKE":"#FECF43",
  "ASTROBIUM_DASHED_LINE_STROKE":"rgba(240,240,240,0.6)",
  "ASTROBIUM_INNER_CIRCLE_FILL":"rgba(120,120,120,0.8)",
  "ASTROBIUM_MIDDLE_CIRCLE_FILL":"rgba(70,70,70,0.8)",
  "ASTROBIUM_OUTER_CIRCLE_FILL":"rgba(100,100,100,0.8)",

  "ASTROBIUM_RADIUS":100,
  "ASTROBIUM_INNER_RADIUS":30,
  "ASTROBIUM_OUTER_RADIUS":150,
  "ASTROBIUM_CENTER_X":160,
  "ASTROBIUM_CENTER_Y":160,

  "ASTROBIUM_DOTS_RADIUS":3
}

var drawYearOpts = {
  'width': 236,
  'height': 18,
  'rectWidth': 200,
  'yearsPer': [{x:0.1,y:0.9},{x:0.7,y:0.3},{x:0.25,y:0.75},{x:0.5,y:0.5}],
  'rw': [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  'yearsStep': [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  'yearsCount': 0,//画布所画次数
  'yearsTimer': null,
  'yearsBarCircleRadius': 9,
  'ctx': [document.getElementById("aCanvas1").getContext("2d"),document.getElementById("aCanvas2").getContext("2d"),document.getElementById("aCanvas3").getContext("2d"),document.getElementById("aCanvas4").getContext("2d")]
}

var opts = {
  isThisPostVoted:false,
  postObj:{},
  user:{},
  guest:{},
  guestOpts:{},

  imgHost:"http://www.bengjiujie.com/public/images/",
  postHost:"http://api.vocinno.com/vocinno/nosession/post/post",
  commentListHost:"http://api.vocinno.com/vocinno/nosession/post/commentList",
  tagHost:"http://api.vocinno.com/vocinno/nosession/post/postTags",
  voteHost:"http://api.vocinno.com/vocinno/nosession/post/voteList",
  toVoteHost:"http://api.vocinno.com/vocinno/nosession/post/vote",
  hotPostHost:"http://api.vocinno.com/vocinno/nosession/post/PostOnWeb",
  commentHost:"http://api.vocinno.com/vocinno/nosession/post/comment",

  defaultHotpostAmount:3,
  astroArr:["魔羯","水瓶","双鱼","牡羊","金牛","双子","巨蟹","狮子","处女","天秤","天蝎","射手"],
  astroCircleInit:6,
  astroLiInit:1,
  messageReady:0,
  postType:0,                 //默认情况为有两张图片的情况，为1时表示只有一张图片
  commentTextWords:100,
};

/****************************************************
首先判断是否对此贴投过票
****************************************************/

~(function(){
  setLocalStorage('lastPost',postId);
  if(readLocalStorage('post'+postId+'vote') == undefined){
    opts.isThisPostVoted = false;
    setLocalStorage('post'+postId+'vote', -1);
  }else if(readLocalStorage('post'+postId+'vote') != -1){
    opts.isThisPostVoted = true;
  }
})();

window.onload = function(){
  ajaxGET(postUrl,false,renderPostData,null);

  initListener();
}

/********************************************************
页面中得各种监听
********************************************************/

//初始化监听器
function initListener(){
  addEvent(function(){
    handleDownload();
  },'click',$("#appDownload-img-andriod"));

  addEvent(function(){
    handleDownload();
  },'click',$("#appDownload-img-ios"));

  addEvent(function(){
    $("#panel-relative").style.display="none";
    $("#main-panel-info-wrap").style.display="block";
    var choiceStr = $("#picture-topic-one").innerText;

    $("#choice").innerText = choiceStr;
    optionInfo.chosen=0;
  },'click',$("#choose-button-one"));

  addEvent(function(){
    $("#panel-relative").style.display="none";
    $("#main-panel-info-wrap").style.display="block";
    var choiceStr = $("#picture-topic-two").innerText;
    $("#choice").innerText = choiceStr;
    optionInfo.chosen=1;
  },'click',$("#choose-button-two"));

  addEvent(function(){
    $("#info-man-img").src = "static/img/share_btn_portrait_male_active.png";
    $("#info-woman-img").src = "static/img/share_btn_portrait_female.png";
    optionInfo.gender=0;
  },'click',$("#info-man-img"));

  addEvent(function(){
    $("#info-man-img").src = "static/img/share_btn_portrait_male.png";
    $("#info-woman-img").src = "static/img/share_btn_portrait_female_active.png";
     optionInfo.gender=1;
  },'click',$("#info-woman-img"));

  addEvent(function(){
    $("#info-age-70-img").src = "static/img/share_btn_seven_active.png";
    $("#info-age-90-img").src = "static/img/share_btn_nine.png";
    $("#info-age-60-img").src = "static/img/share_btn_six.png";
    $("#info-age-80-img").src = "static/img/share_btn_eight.png";
    $("#info-age-00-img").src = "static/img/share_btn_zero.png";
     optionInfo.year=1970;
  },'click',$("#info-age-70-img"));

  addEvent(function(){
    $("#info-age-70-img").src = "static/img/share_btn_seven.png";
    $("#info-age-90-img").src = "static/img/share_btn_nine_active.png";
    $("#info-age-60-img").src = "static/img/share_btn_six.png";
    $("#info-age-80-img").src = "static/img/share_btn_eight.png";
    $("#info-age-00-img").src = "static/img/share_btn_zero.png";
    optionInfo.year=1990;
  },'click',$("#info-age-90-img"));

  addEvent(function(){
    $("#info-age-70-img").src = "static/img/share_btn_seven.png";
    $("#info-age-90-img").src = "static/img/share_btn_nine.png";
    $("#info-age-60-img").src = "static/img/share_btn_six_active.png";
    $("#info-age-80-img").src = "static/img/share_btn_eight.png";
    $("#info-age-00-img").src = "static/img/share_btn_zero.png";
    optionInfo.year=1960;
  },'click',$("#info-age-60-img"));

  addEvent(function(){
    $("#info-age-70-img").src = "static/img/share_btn_seven.png";
    $("#info-age-90-img").src = "static/img/share_btn_nine.png";
    $("#info-age-60-img").src = "static/img/share_btn_six.png";
    $("#info-age-80-img").src = "static/img/share_btn_eight_active.png";
    $("#info-age-00-img").src = "static/img/share_btn_zero.png";
    optionInfo.year=1980;
  },'click',$("#info-age-80-img"));

  addEvent(function(){
    $("#info-age-70-img").src = "static/img/share_btn_seven.png";
    $("#info-age-90-img").src = "static/img/share_btn_nine.png";
    $("#info-age-60-img").src = "static/img/share_btn_six.png";
    $("#info-age-80-img").src = "static/img/share_btn_eight.png";
    $("#info-age-00-img").src = "static/img/share_btn_zero_active.png";
    optionInfo.year=2000;
  },'click',$("#info-age-00-img"));

  addEvent(function(){
    $("#main-panel-info-wrap").style.display = "none";
    $("#panel-relative").style.display = "block";
  },'click',$("#info-cancel-img"));

  addEvent(function(){
    //console.log(optionInfo.gender+"--"+optionInfo.year);
    if(optionInfo.gender  ===undefined){
      window.alert("性别不能为空");
      return false;
    }else if(optionInfo.year === undefined){
      window.alert("年龄不能为空");
      return false;
    }else{
      $("#main-panel-info-wrap").style.display = "none";
      $("#main-panel-xingzuo-wrap").style.display = "block";
    }
  },'click',$("#info-button-next"));

  addEvent(function(){
    var message=$("#xingzuo-input").value;
    optionInfo.message=message;
    submitVote(postObj);
  },'click',$("#xingzuo-button-submit"));

  addEvent(function(){
    $("#main-panel-xingzuo-wrap").style.display = "none";
    $("#main-panel-info-wrap").style.display = "block";
  },'click',$("#xingzuo-info-cancel-img"));

  $("#zhuanpan").addEventListener('touchstart',function(e){console.log(1);
    var touches = e.touches[0];
    
    turntableOpts.turntablLastX = touches.clientX;
    turntableOpts.turntableLastY = touches.clientY;
    turntableOpts.turntableLastTime = (new Date()).valueOf();
    isTouchMove = false;
  },false);

 
  $("#zhuanpan").addEventListener('touchmove',function(e){
    isTouchMove = true;
    var touches = e.changedTouches[0];
    var thisX = touches.clientX;
    var thisY = touches.clientY;

    //只有在触点离转盘中心距离超过20像素点的长度时才转动
    if((thisX - turntableOpts.centerX)*(thisX - turntableOpts.centerX)+(thisY -turntableOpts.centerY)*(thisY-turntableOpts.centerY)>400){
      //利用移动前和移动后位置与转盘中心的夹角差值计算转盘应当转动的角度，注意角度单位的变换
      if(thisX===positionCenterX){
        thisX=thisX-1;
      } 
      if(turntableOpts.turntablLastX===positionCenterX){
        turntableOpts.turntablLastX=turntableOpts.turntablLastX-1;
      }
      var edgeWidth=(screen.width-310)/2;
      var positionCenterX=turntableOpts.centerX + edgeWidth;
      var thelta = 180*Math.atan((thisY - turntableOpts.centerY)/(thisX - positionCenterX))/Math.PI;
      var lastThelta = 180*Math.atan((turntableOpts.turntableLastY - turntableOpts.centerY)/(turntableOpts.turntablLastX - positionCenterX))/Math.PI;
      var toDeg = turntableOpts.currentRotate + thelta - lastThelta;
     /* var a=(thisY - turntableOpts.centerY)/(thisX - positionCenterX)+"--"+thisY+"--"+thisX,c=(thisY - turntableOpts.centerY)/(thisX - positionCenterX);
      var d=(turntableOpts.turntableLastY - turntableOpts.centerY)/(turntableOpts.turntablLastX - positionCenterX);
      var b=(turntableOpts.turntableLastY - turntableOpts.centerY)/(turntableOpts.turntablLastX - positionCenterX)+"--"+turntableOpts.turntableLastY +"--"+turntableOpts.turntablLastX;
      console.log("----"); console.log(a); console.log(Math.atan(c));console.log(b);console.log(Math.atan(d));console.log("----");console.log(positionCenterX);
     */
      

      $("#zhuanpan").style.transform="rotate("+toDeg+"deg)";
      $("#zhuanpan").style.webkitTransform="rotate("+toDeg+"deg)";
      turntableOpts.currentRotate = toDeg;
      turntableOpts.turntablLastX = thisX;
      turntableOpts.turntableLastY = thisY;
      genAstroAfterRotate(turntableOpts.currentRotate);
    }

    e.preventDefault();
  },false);

  $("#zhuanpan").addEventListener('touchend',function(e){
    // var touches = e.changedTouches[0];
    
    // var currentTime = (new Date()).valueOf();
    // var timeDelta = currentTime - turntableOpts.turntableLastTime;
    // turntableOpts.turntableLastTime = currentTime;

    // var dX = touches.clientX;
    // var dY = touches.clientY;


    // // selfLog(genDelta(turntableOpts.turntablLastX,turntableOpts.turntableLastY,dX,dY));
    // startRotate(genDelta(turntableOpts.turntablLastX,turntableOpts.turntableLastY,dX,dY));
    // // startRotate(genDelta(turntableOpts.turntablLastX,turntableOpts.turntableLastY,dX,dY));

    // turntableOpts.currentRotate = toDeg;
    e.preventDefault();
  },false);

  $("#page-3").addEventListener('touchstart',function(e){
    var touches = e.touches[0];

    pageThreeLastX = touches.clientX;
    pageThreeLastY = touches.clientY;
  },false);

  $("#page-3").addEventListener('touchmove',function(e){

    e.preventDefault();
  },false);

  $("#page-3").addEventListener('touchend',function(e){
    var touches = e.changedTouches[0];
    var thisX = touches.clientX;
    var thisY = touches.clientY;

    if(Math.abs(thisY - pageThreeLastY)>Math.abs(thisX - pageThreeLastX) && thisY > pageThreeLastY + 100){
      //若从浏览器重新打开后没有投票则跳回投票页面，否则跳回数据页面
      if(opts.isThisPostVoted){
        switchToDataPage();
      }else{
        switchToDataDetail();
      }
    }

    // e.preventDefault();
  },false);
}

//转动后重新计算当前选中的星座
function genAstroAfterRotate(rotate){
  rotate = rotate?rotate:turntableOpts.currentRotate;
  rotate = -rotate;

  var index = Math.ceil(rotate)/30 + 2;
  var indexInt = Math.floor(index)%12;

  if(indexInt != turntableOpts.turntablLastAstroIndex){
    optionInfo.constellation = indexInt>-1?indexInt:indexInt+12;
    if(optionInfo.constellation === -0){
      optionInfo.constellation = 0;
    }
    $("#xingzuo").innerText = turntableOpts.astroStringArr[optionInfo.constellation];
  }

  turntableOpts.turntablLastAstroIndex = indexInt;
}

/***************************************************************************
获取帖子内容后的一系列操作，包括调整帖子标题字号，加载帖子详情等
***************************************************************************/

//获取到帖子内容后，全局加载帖子详情内容
function renderPostData(data){
  var jsonObj = JSON.parse(data);
 
  try{
    postObj = jsonObj.resultData;
  }catch(e){
    selfLog("get result data failed");
  }

  if(postObj!=null){
    adjustTitle(postObj.title);
    showPostDetail(postObj);
    initDataPage();
  }

  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") 
  {
    var downloadConfirm = confirm("直接进入下载页？");
    if(downloadConfirm){
      $("#page-1").style.display = "none";
      $("#page-3").style.display = "block";
    }else{
    }
  }
}

//依据帖子标题的字数调整对应位置的字号
function adjustTitle(title){
  var  word=$("#topic1");

  if(title.length<12){
    word.style.fontSize="2em";
  }else if(title.length<20){
    word.style.fontSize="1.5em"; 
  }
}

//加载帖子详情
function showPostDetail(info){
  $("#topic1").innerHTML=info.title;
  $("#first-picture").src=postImageUrl+info.imageOne;
  //$("#second-picture").src=postImageUrl+info.imageOne;
  $("#picture-topic-one").innerHTML=info.optionOne;
  $("#picture-topic-two").innerHTML=info.optionTwo;

  if(opts.isThisPostVoted){
    showVotedNote();
  }
}

//隐藏投票按钮，提示已经投票，并引导用户向下滑动
function showVotedNote(){
  $("#choose-button-one").style.display = "none";
  $("#choose-button-two").style.display = "none";
  $("#voted-note").style.display = "block";


  $("#page-1").addEventListener('touchstart',function(e){
    var touches = e.touches[0];

    pageOneLastX = touches.clientX;
    page1LastY = touches.clientY;
  },false);

  $("#page-1").addEventListener('touchmove',function(e){

    e.preventDefault();
  },false);

  $("#page-1").addEventListener('touchend',function(e){
    var touches = e.changedTouches[0];
    var thisX = touches.clientX;
    var thisY = touches.clientY;

    if(Math.abs(thisY - page1LastY)>Math.abs(thisX - pageOneLastX) && thisY < page1LastY - 100){
      switchToDataPage();
    }
  },false);
}

/*******************************************************************
数据页各功能的初始化
*******************************************************************/

//初始化数据页滑动模块，并获得星盘画板上下文
function initDataPage(){
  var tabs = [];
  var tabItems = [];

  for(var i = 0;i<4;i++){
    tabs.push($("#tab-"+(i+1)));
    tabItems.push($("#tab-selector-"+(i+1)));
  }
  
  dataPage.dataTabs = new DataTabs(tabs,tabItems,0,"current-tab","current-tab-item");
  dataPage.dataTabs.actionBeforeSwitch = initDataPageSwitchBefore;
  dataPage.dataTabs.actionAfterSwitch = initDataPageSwitchAfter;
  dataPage.dataTabs.swipeUp = dataPageSwipeUp;
  dataPage.dataTabs.swipeDown = dataPageSwipeDown;

  drawAstroOpts.astrobiumCanvas = $("#astrobium-canvas");
  drawAstroOpts.astroCtx = drawAstroOpts.astrobiumCanvas.getContext("2d");
}

//设置数据页切换前的操作
function initDataPageSwitchBefore(){
  switch(dataPage.dataTabs.currentItem){
    case dataPage.SUM_DATA:
      if(!dataPage.dataViewed[dataPage.SUM_DATA]){
        removeClass($("#inner-circle"),"inner-circle-animation");
        removeClass($("#inner-plane"),"inner-plane-rotate");
      }
    break;
    case dataPage.GENDER_DATA:
      if(!dataPage.dataViewed[dataPage.GENDER_DATA]){

      }
    break;
    case dataPage.ASTRO_DATA:
      removeClass($("#astro-background-1"),"background-circle-animate1");
      removeClass($("#astro-background-2"),"background-circle-animate2");
      removeClass($("#astro-background-3"),"background-circle-animate3");
      removeClass($("#astro-astrolabium"),"astro-astrolabium-animation");
    break;
    case dataPage.YEARS_DATA:
      if(!dataPage.dataViewed[dataPage.YEARS_DATA]){

      }
    break;
  }

  removeClass($(".conclusion-title-icon")[dataPage.dataTabs.currentItem],"conclusion-title-icon-animation");
}

//设置数据页切换后的操作
function initDataPageSwitchAfter(){
  switch(dataPage.dataTabs.currentItem){
    case dataPage.SUM_DATA:
      if(!dataPage.dataViewed[dataPage.SUM_DATA]){
        startSumDataAnimation();
        dataPage.dataViewed[dataPage.SUM_DATA] = true;
      }
    break;
    case dataPage.GENDER_DATA:
      if(!dataPage.dataViewed[dataPage.GENDER_DATA]){
        startGenderDataAnimation();
        setTimeout("showGenderConclusion()",2000);
        dataPage.dataViewed[dataPage.GENDER_DATA] = true;
      }
    break;
    case dataPage.ASTRO_DATA:
      if(!dataPage.dataViewed[dataPage.ASTRO_DATA]){
        startAstroDataAnimation();
        setTimeout("showAstroConclusion()",1500);
        dataPage.dataViewed[dataPage.ASTRO_DATA] = true;
      }
    break;
    case dataPage.YEARS_DATA:
      if(!dataPage.dataViewed[dataPage.YEARS_DATA]){
        startYearsDataAnimation();
        setTimeout("showYearsConclusion()",1500);
        dataPage.dataViewed[dataPage.YEARS_DATA] = true;
      }
    break;
  }
}

//启动总数据动画
function startSumDataAnimation(){

}

//启动性别动画
function startGenderDataAnimation(){
  genderPlay();
}

//启动星盘动画
function startAstroDataAnimation(){
  drawAstroOpts.drawAstrobiumTimer = setInterval("drawAstrobium()",drawAstroOpts.ASTROBIUM_DRAW_SPEED);
}

//启动年代秀动画
function startYearsDataAnimation(){
  playYearsShow();
}


//在数据页中向上滑动
function dataPageSwipeUp(){
  switchToDataDetail();
}

//在数据页中向下滑动
function dataPageSwipeDown(){
  switchToDownloadPage();
}

//切换到帖子详情页面
function switchToDataDetail(){
  $("#page-3").style.display = "none";
  $("#page-2").style.display = "none";
  $("#page-1").style.display = "block";
}

//切换到数据页
function switchToDataPage(){
  $("#page-1").style.display = "none";
  $("#page-3").style.display = "none";
  $("#page-2").style.display = "block";

  if(dataPage.isDataPageNeverDisplayed){
    var postAnalysis = {};

    ajaxGET(postAnalysisUrl,false,displayData,alertFailure);

    var innerPlane = $("#inner-plane");
    addClass(innerPlane,"inner-plane-rotate");
    dataPage.isDataPageNeverDisplayed = false;
  }
}

//切换到下载页面
function switchToDownloadPage(){
  $("#page-1").style.display = "none";
  $("#page-2").style.display = "none";
  $("#page-3").style.display = "block";
}

/******************************************************************
利用外积求法向高度及其正负号，适用于在滑动完毕后才开始转动的情况
******************************************************************/
// function genDelta(x0,y0,x1,y1){
//   var dX1 = x0 - centerX, dX2 = x1 - x0, dY1 = y0 - centerY, dY2 = y1 - y0;
//   return (dX1*dY2 - dX2*dY1)/200;
// }

// function startRotate(angle){
//   // selfLog(angle);
//   var direction = angle>0?1:-1;
//   if(rotateTimer != null && rotateTimer != undefined){
//     clearInterval(rotateTimer);
//     restStep = 20;
//   }

//   rotateTimer = setInterval(function(){
//     var speed = 10;

//     if(angle<100 && direction==1){
//       speed = restStep/2;
//       restStep--;
//       if(angle<5){
//         clearInterval(rotateTimer);
//         restStep = 20;
//         rotateTimer = null;
//       }
//     }else if(angle>-100 && direction == -1){
//       speed = restStep/2;
//       restStep--;
//       if(angle>-5){
//         clearInterval(rotateTimer);
//         restStep = 20;
//         rotateTimer = null;
//       }
//     }
//     // selfLog("speed:"+speed);

//     angle = angle - direction*speed;
//     var toDeg = turntableOpts.currentRotate + direction*speed;
//     var rotateStr = "rotate("+toDeg+"deg)";

//     $("#zhuanpan").style.transform=rotateStr;
//     $("#zhuanpan").style.webkitTransform=rotateStr;
//     turntableOpts.currentRotate += direction*speed;
//   },50);
// }

/**************************************************************
提交投票引发的操作，先校验投票信息是否完整，提交ajaxGET请求后跳转到数据页
***************************************************************/

//提交投票信息
function submitVote(obj){
  var date = new Date();
  var t = date.valueOf();

  if(typeof optionInfo.gender === undefined){
    alert("请选择性别");
  }

  if(typeof optionInfo.year === undefined){
    alert("请选择年龄段");
  }

  var getURL =toVoteHost+"?postId="+obj.id+"&chosen="+optionInfo.chosen+"&gender="+optionInfo.gender+"&year="+optionInfo.year+"&constellation="+optionInfo.constellation+"&t="+t;
  ajaxGET(getURL,false,getGuestInfoAndShowDataPage,alertFailure);
  opts.isThisPostVoted = true;
  setLocalStorage('post'+postId+'vote', optionInfo.chosen);
  showVotedNote();
  $("#main-panel-xingzuo-wrap").style.display = "none";
  $("#panel-relative").style.display = "block";
  // var commentData = {"postId":postObj.postId,"content":optionInfo.message};
  // if(optionInfo.message != ""&&optionInfo.message !="输入点什么呗"){
  //   var commentURL = commentHost+"?postId="+postObj.postId;
  //   commentData.user = postObj.user;
  //   //ajaxPOST(commentListURL,commentData,defaultPOSTSuccess,alertFailed);
  //   commentURL += "&token="+commentData.user.token+"&content="+encodeURIComponent(optionInfo.message )+"&t="+t;
  //   // ajaxGET(commentURL,false,displayMessage,alertFailed);
  // }
}

//投票后跳转到数据页
function getGuestInfoAndShowDataPage(data){
  var jsonObj = JSON.parse(data);

  try{
    postAnalysisObj = jsonObj.resultData;
  }catch(e){
    selfLog("get result data failed");
  }

  if(postAnalysisObj!=null){
    switchToDataPage(true);
  }
}

/******************************************************************
首次进入数据页时的各种操作，补全选项信息，生成后续种类的数据，并且开始总数据的动画
******************************************************************/

//请求到投票数据后计算出各种分类数据
function displayData(data){
  var jsonObj = JSON.parse(data);

  try{
    postAnalysis = jsonObj.resultData;
  }catch(e){
    selfLog("get result data failed");
  }

  if(postAnalysis!=null){
    renderInfo();

    for(var i=0;i<12;i++){
      drawAstroOpts.constellationData[i] = [];
      for(var j=0;j<2;j++){
        drawAstroOpts.constellationData[i][j] = postAnalysis["percentage"+drawAstroOpts.constellationString[i]+"Option"+(j?"One":"Two")];
      }
    }
    drawSumOpts.optionOneRadian = postAnalysis.percentageOptionOne*3.6;
    drawSumOpts.optionTwoRadian = postAnalysis.percentageOptionTwo*3.6;

    drawGenderOpts.genderPer[0].x = postAnalysis.percentageMaleOptionOne/100;
    drawGenderOpts.genderPer[0].y = postAnalysis.percentageMaleOptionTwo/100;

    drawGenderOpts.genderPer[1].x = postAnalysis.percentageFemaleOptionOne/100;
    drawGenderOpts.genderPer[1].y = postAnalysis.percentageFemaleOptionTwo/100;

    drawYearOpts.yearsPer[0].x = postAnalysis.percentage70OptionOne/100;
    drawYearOpts.yearsPer[0].y = postAnalysis.percentage70OptionTwo/100;
    drawYearOpts.yearsPer[1].x = postAnalysis.percentage80OptionOne/100;
    drawYearOpts.yearsPer[1].y = postAnalysis.percentage80OptionTwo/100;
    drawYearOpts.yearsPer[2].x = postAnalysis.percentage90OptionOne/100;
    drawYearOpts.yearsPer[2].y = postAnalysis.percentage90OptionTwo/100;
    drawYearOpts.yearsPer[3].x = postAnalysis.percentage00OptionOne/100;
    drawYearOpts.yearsPer[3].y = postAnalysis.percentage00OptionTwo/100;

    //启动总数据动画
    drawSumDataCircle();
    setTimeout("drawSumDataAmount(postAnalysis.post.voteCount)",2000);
    setTimeout("showSumConclusion()",2000);
  }
}

//填充数据页中的数据详情
function renderInfo(){console.log(1);
  var optionOneTextArray = $(".option-one-text-field");
  var optionTwoTextArray = $(".option-two-text-field");
  console.log(optionOneTextArray);
  for(var i=0,len = optionOneTextArray.length;i<len;i++){
    optionOneTextArray[i].innerText = postAnalysis.post.optionOne;
    optionTwoTextArray[i].innerText = postAnalysis.post.optionTwo;
  }

  $("#sum-data-ratio-one-value").innerText = postAnalysis.percentageOptionOne+"%";
  $("#sum-data-ratio-two-value").innerText = postAnalysis.percentageOptionTwo+"%";
  $("#male-option-one-percentage").innerText = postAnalysis.percentageMaleOptionOne+"%";
  $("#male-option-two-percentage").innerText = postAnalysis.percentageMaleOptionTwo+"%";
  $("#female-option-one-percentage").innerText = postAnalysis.percentageFemaleOptionOne+"%";
  $("#female-option-two-percentage").innerText = postAnalysis.percentageFemaleOptionTwo+"%";
  $("#labelFor70").innerText = ((postAnalysis.percentage70OptionOne<postAnalysis.percentage70OptionTwo)?postAnalysis.percentage70OptionTwo:postAnalysis.percentage70OptionOne)+"%";
  $("#labelFor80").innerText = ((postAnalysis.percentage80OptionOne<postAnalysis.percentage80OptionTwo)?postAnalysis.percentage80OptionTwo:postAnalysis.percentage80OptionOne)+"%";
  $("#labelFor90").innerText = ((postAnalysis.percentage90OptionOne<postAnalysis.percentage90OptionTwo)?postAnalysis.percentage90OptionTwo:postAnalysis.percentage90OptionOne)+"%";
  $("#labelFor00").innerText = ((postAnalysis.percentage00OptionOne<postAnalysis.percentage00OptionTwo)?postAnalysis.percentage00OptionTwo:postAnalysis.percentage00OptionOne)+"%";
  $("#summary-detail-sum").innerText = genDataSummary(postAnalysis,dataPage.SUM_DATA);
  $("#summary-detail-gender").innerText = genDataSummary(postAnalysis,dataPage.GENDER_DATA);
  $("#summary-detail-astro").innerText = genDataSummary(postAnalysis,dataPage.ASTRO_DATA);
  $("#summary-detail-years").innerText = genDataSummary(postAnalysis,dataPage.YEARS_DATA);
}

/*********************************************************************
绘制总数据的各种操作
*********************************************************************/

//绘制总数据中的圈圈
function drawSumDataCircle(){
  var svg = $("#sum-data-canvas");
  drawSumOpts.arcOptionOneForSum = document.createElementNS('http://www.w3.org/2000/svg','path');
  drawSumOpts.arcOptionTwoForSum = document.createElementNS('http://www.w3.org/2000/svg','path');
  drawSumOpts.arcOptionOneForSum.setAttributeNS(null,'stroke','#3EE6F9');
  drawSumOpts.arcOptionOneForSum.setAttributeNS(null,'stroke-width',drawSumOpts.strokeWidth+'');
  drawSumOpts.arcOptionOneForSum.setAttributeNS(null,'fill','none');
  drawSumOpts.arcOptionTwoForSum.setAttributeNS(null,'stroke','#FECF43');
  drawSumOpts.arcOptionTwoForSum.setAttributeNS(null,'stroke-width',''+drawSumOpts.strokeWidth);
  drawSumOpts.arcOptionTwoForSum.setAttributeNS(null,'fill','none');

  drawSumOpts.dOptionOneForSum += 'M'+drawSumOpts.centerX+','+(drawSumOpts.centerY-drawSumOpts.RADIUS);
  drawSumOpts.dOptionTwoForSum += 'M'+drawSumOpts.centerX+','+(drawSumOpts.centerY-drawSumOpts.RADIUS);
  drawSumOpts.dOptionOneForSum += 'A'+drawSumOpts.RADIUS+' '+drawSumOpts.RADIUS+' '+90+' 0 0 '+(drawSumOpts.centerX-drawSumOpts.RADIUS*Math.sin(drawSumOpts.currentStep*drawSumOpts.optionOneRadian/drawSumOpts.SUM_CIRCLE_STEP))+' '+(drawSumOpts.centerY-drawSumOpts.RADIUS*Math.cos(drawSumOpts.currentStep*drawSumOpts.optionOneRadian/drawSumOpts.SUM_CIRCLE_STEP));
  drawSumOpts.dOptionTwoForSum += 'A'+drawSumOpts.RADIUS+' '+drawSumOpts.RADIUS+' '+90+' 0 1 '+(drawSumOpts.centerX-drawSumOpts.RADIUS*Math.sin(drawSumOpts.currentStep*drawSumOpts.optionTwoRadian/drawSumOpts.SUM_CIRCLE_STEP))+' '+(drawSumOpts.centerY-drawSumOpts.RADIUS*Math.cos(drawSumOpts.currentStep*drawSumOpts.optionTwoRadian/drawSumOpts.SUM_CIRCLE_STEP));
  drawSumOpts.arcOptionOneForSum.setAttributeNS(null,'d',drawSumOpts.dOptionOneForSum);
  drawSumOpts.arcOptionTwoForSum.setAttributeNS(null,'d',drawSumOpts.dOptionTwoForSum);
  svg.appendChild(drawSumOpts.arcOptionOneForSum);
  svg.appendChild(drawSumOpts.arcOptionTwoForSum);

  drawSumOpts.startingDot = document.createElementNS('http://www.w3.org/2000/svg','circle');
  drawSumOpts.startingDot.setAttributeNS(null,'style','fill:transparent');
  drawSumOpts.startingDot.setAttributeNS(null,'cx',drawSumOpts.startingDotX);
  drawSumOpts.startingDot.setAttributeNS(null,'cy',drawSumOpts.startingDotY);
  drawSumOpts.startingDot.setAttributeNS(null,'r',drawSumOpts.startingDotRadius);
  svg.appendChild(drawSumOpts.startingDot);

  drawSumOpts.scopeLine = document.createElementNS('http://www.w3.org/2000/svg','path');
  drawSumOpts.scopeLine.setAttributeNS(null,'style','stroke:#FFFFFF;stroke-width:2;fill:none;');
  drawSumOpts.scopeLinePath += 'M'+drawSumOpts.startingDotX+','+drawSumOpts.startingDotY+' ';
  svg.appendChild(drawSumOpts.scopeLine);

  drawSumOpts.endingDot = document.createElementNS('http://www.w3.org/2000/svg','circle');
  drawSumOpts.endingDot.setAttributeNS(null,'style','fill:transparent;');
  drawSumOpts.endingDot.setAttributeNS(null,'cx',drawSumOpts.endingDotX);
  drawSumOpts.endingDot.setAttributeNS(null,'cy',drawSumOpts.endingDotY);
  drawSumOpts.endingDot.setAttributeNS(null,'r',drawSumOpts.startingDotRadius);
  svg.appendChild(drawSumOpts.endingDot);

  drawSumOpts.drawOptionArcTimer = setInterval('updatePath()',drawSumOpts.SPEED);
}

//绘制总数据中得折线
function updatePath(){
  if(drawSumOpts.currentStep<drawSumOpts.STEP){
    drawSumOpts.currentStep++;
  }else{
    clearInterval(drawSumOpts.drawOptionArcTimer);
    return;
  }

  if(drawSumOpts.currentStep<=drawSumOpts.SUM_CIRCLE_STEP){
    drawSumOpts.dOptionOneForSum += 'A'+drawSumOpts.RADIUS+' '+drawSumOpts.RADIUS+' '+(90-drawSumOpts.currentStep*drawSumOpts.optionOneRadian/drawSumOpts.SUM_CIRCLE_STEP)+' 0 0 '+(drawSumOpts.centerX-drawSumOpts.RADIUS*Math.sin((drawSumOpts.currentStep*drawSumOpts.optionOneRadian/drawSumOpts.SUM_CIRCLE_STEP)*Math.PI/180))+' '+(drawSumOpts.centerY-drawSumOpts.RADIUS*Math.cos((drawSumOpts.currentStep*drawSumOpts.optionOneRadian/drawSumOpts.SUM_CIRCLE_STEP)*Math.PI/180));
    drawSumOpts.arcOptionOneForSum.setAttributeNS(null,'d',drawSumOpts.dOptionOneForSum);
    drawSumOpts.dOptionTwoForSum += 'A'+drawSumOpts.RADIUS+' '+drawSumOpts.RADIUS+' '+(90-drawSumOpts.currentStep*drawSumOpts.optionOneRadian/drawSumOpts.SUM_CIRCLE_STEP)+' 0 1 '+(drawSumOpts.centerX+drawSumOpts.RADIUS*Math.sin((drawSumOpts.currentStep*drawSumOpts.optionTwoRadian/drawSumOpts.SUM_CIRCLE_STEP)*Math.PI/180))+' '+(drawSumOpts.centerY-drawSumOpts.RADIUS*Math.cos((drawSumOpts.currentStep*drawSumOpts.optionTwoRadian/drawSumOpts.SUM_CIRCLE_STEP)*Math.PI/180));
    drawSumOpts.arcOptionTwoForSum.setAttributeNS(null,'d',drawSumOpts.dOptionTwoForSum);
  }else if(drawSumOpts.currentStep<=drawSumOpts.SUM_CIRCLE_STEP+drawSumOpts.DOT_STEP){
    drawSumOpts.startingDot.setAttributeNS(null,'style','fill:rgb(255,255,255)');
    // drawSumOpts.startingDot.setAttributeNS(null,'style','fill:rgba(255,255,255,'+genStartingDotAlpha(drawSumOpts.currentStep-drawSumOpts.SUM_CIRCLE_STEP));
  }else if(drawSumOpts.currentStep<drawSumOpts.SUM_CIRCLE_STEP+drawSumOpts.DOT_STEP+drawSumOpts.SCOPE_STEP){
    drawSumOpts.scopeLinePath = 'M'+drawSumOpts.startingDotX+','+drawSumOpts.startingDotY+ 'L'+genScopeDot(drawSumOpts.currentStep-drawSumOpts.SUM_CIRCLE_STEP-drawSumOpts.DOT_STEP);
    drawSumOpts.scopeLine.setAttributeNS(null,'d',drawSumOpts.scopeLinePath);
  }else if(drawSumOpts.currentStep<drawSumOpts.SUM_CIRCLE_STEP+drawSumOpts.DOT_STEP+drawSumOpts.SCOPE_STEP+drawSumOpts.LINE_STEP){
    drawSumOpts.scopeLinePath = 'M'+drawSumOpts.startingDotX+','+drawSumOpts.startingDotY+ 'L'+genScopeDot(drawSumOpts.currentStep-drawSumOpts.SUM_CIRCLE_STEP-drawSumOpts.DOT_STEP)+'L'+genFlatLineDot(drawSumOpts.currentStep-drawSumOpts.SUM_CIRCLE_STEP-drawSumOpts.DOT_STEP-drawSumOpts.SCOPE_STEP);
    drawSumOpts.scopeLine.setAttributeNS(null,'d',drawSumOpts.scopeLinePath);
  }else{
    drawSumOpts.scopeLinePath = 'M'+drawSumOpts.startingDotX+','+drawSumOpts.startingDotY+ 'L'+genScopeDot(drawSumOpts.currentStep-drawSumOpts.SUM_CIRCLE_STEP-drawSumOpts.DOT_STEP)+'L'+genFlatLineDot(drawSumOpts.LINE_STEP);
    drawSumOpts.scopeLine.setAttributeNS(null,'d',drawSumOpts.scopeLinePath);
    drawSumOpts.endingDot.setAttributeNS(null,'style','fill:#FFFFFF;');
  }
}

//生成折线起点闪动时的透明度
function genStartingDotAlpha(step){
  if(step<7){
    return Math.abs(step-3)/6;
  }else{
    return Math.abs(step-8)/4;
  }
}

//生成折线中当前步数的坐标
function genScopeDot(step){
  var result = '';
  if(step<drawSumOpts.SCOPE_STEP){
    result += (drawSumOpts.startingDotX + (drawSumOpts.breakingDotX - drawSumOpts.startingDotX)*step/drawSumOpts.SCOPE_STEP);
    result += ',' + (drawSumOpts.startingDotY + (drawSumOpts.breakingDotY - drawSumOpts.startingDotY)*step/drawSumOpts.SCOPE_STEP);
  }else{
    result += drawSumOpts.breakingDotX+','+drawSumOpts.breakingDotY;
  }
  return result;
}

//生成水平线段中当前步数的坐标
function genFlatLineDot(step){
  var result = '';
  if(step<drawSumOpts.LINE_STEP){
    result += (drawSumOpts.breakingDotX+(step*(drawSumOpts.endingDotX-drawSumOpts.breakingDotX)/drawSumOpts.LINE_STEP))+','+(drawSumOpts.breakingDotY+step*(drawSumOpts.endingDotY-drawSumOpts.breakingDotY)/drawSumOpts.LINE_STEP);
  }else{
    result += drawSumOpts.endingDotX+','+drawSumOpts.endingDotY;
  }

  return result;
}

//绘制当前总数据文字
function drawSumDataAmount(voteCount){
  voteCount = voteCount?voteCount:224;
  var drawDataStep = 0;
  var sumDataAmount = $("#sum-data-note-value");
  var randomArray = [];
  for(var i=0;i<10;i++){
    randomArray.push(Math.round(voteCount*Math.random()));
  }
  randomArray.sort(sortIncrease);
  randomArray.push(voteCount);
  drawSumOpts.drawDataSumTimer = setInterval(function(){
    if(drawDataStep>10){
      clearInterval(drawSumOpts.drawDataSumTimer);
      return;
    }
    sumDataAmount.innerText = ""+randomArray[drawDataStep];
    drawDataStep++;
  },100);
}

//数值数据的升序排列方法
function sortIncrease(a,b){
  return a-b;
}

/******************************************************************
绘制男女有别的各种操作
******************************************************************/

//绘制男女有别的线程
function genderPlay(){ 
  drawGenderOpts.genderTimer=setInterval(drawGenderCircle,drawYearOpts.DRAW_GENDER_CIRCLE_PRIOD);
};

//绘制男女有别的环形数据
function drawGenderCircle(){
  var genderDrawingStartAngle=3*Math.PI/2;
  drawGenderOpts.genderCount=drawGenderOpts.genderCount+1;
  for(var i=0;i<2;i++){
    if(drawGenderOpts.genderPer[i].x == 0 && drawGenderOpts.genderPer[i].y == 0){
      drawGenderOpts.genderStep[i].y = 2*Math.PI/drawGenderOpts.DRAW_GENDER_CIRCLE_STEP;
      drawGenderOpts.genderCtx[i].clearRect(0,0,150,150);
      drawGenderOpts.genderCtx[i].beginPath();
      drawGenderOpts.genderCtx[i].strokeStyle="#3A3A3A";
      drawGenderOpts.genderCtx[i].lineWidth=15;
      drawGenderOpts.genderCtx[i].arc(75,75,65,genderDrawingStartAngle,drawGenderOpts.star[i].y+drawGenderOpts.genderStep[i].y,false);

      drawGenderOpts.genderCtx[i].stroke();
    }else{    
      drawGenderOpts.genderStep[i].x=2*Math.PI*drawGenderOpts.genderPer[i].x/drawGenderOpts.DRAW_GENDER_CIRCLE_STEP;
      drawGenderOpts.genderStep[i].y=2*Math.PI*drawGenderOpts.genderPer[i].y/drawGenderOpts.DRAW_GENDER_CIRCLE_STEP;
      drawGenderOpts.genderCtx[i].clearRect(0,0,150,150);
      drawGenderOpts.genderCtx[i].beginPath();
      drawGenderOpts.genderCtx[i].strokeStyle="#4DE3F4";
      drawGenderOpts.genderCtx[i].lineWidth=15;
      drawGenderOpts.genderCtx[i].arc(75,75,65,genderDrawingStartAngle,drawGenderOpts.star[i].x-drawGenderOpts.genderStep[i].x,true);

      drawGenderOpts.genderCtx[i].stroke(); 

      drawGenderOpts.genderCtx[i].beginPath();
      drawGenderOpts.genderCtx[i].strokeStyle="#FECF43";
      drawGenderOpts.genderCtx[i].lineWidth=15;
      drawGenderOpts.genderCtx[i].arc(75,75,65,genderDrawingStartAngle,drawGenderOpts.star[i].y+drawGenderOpts.genderStep[i].y,false);

      drawGenderOpts.genderCtx[i].stroke();
    }
  }

  for(var i=0;i<2;i++){
    drawGenderOpts.star[i].x=drawGenderOpts.star[i].x-drawGenderOpts.genderStep[i].x;
    drawGenderOpts.star[i].y=drawGenderOpts.star[i].y+drawGenderOpts.genderStep[i].y;
  }

  if(drawGenderOpts.genderCount>drawGenderOpts.DRAW_GENDER_CIRCLE_STEP-1){
    clearInterval(drawGenderOpts.genderTimer);
  } 
}

/**************************************************************
绘制星盘的各种操作
***************************************************************/

//绘制星盘
function drawAstrobium(){
  if(drawAstroOpts.drawAstroStep < drawAstroOpts.ASTROBIUM_CIRCLES_ANIM_STEP + drawAstroOpts.ASTROBIUM_LINES_ANIM_STEP + drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP){
    refreshAstribiumCanvas();
    if(drawAstroOpts.drawAstroStep < drawAstroOpts.ASTROBIUM_CIRCLES_ANIM_STEP){
    }else if(drawAstroOpts.drawAstroStep < drawAstroOpts.ASTROBIUM_CIRCLES_ANIM_STEP + drawAstroOpts.ASTROBIUM_LINES_ANIM_STEP){
      drawAstrobiumLines(drawAstroOpts.drawAstroStep - drawAstroOpts.ASTROBIUM_CIRCLES_ANIM_STEP);
    }else{
      drawAstrobiumLines(drawAstroOpts.ASTROBIUM_LINES_ANIM_STEP);
      drawDataLines(drawAstroOpts.drawAstroStep-drawAstroOpts.ASTROBIUM_LINES_ANIM_STEP-drawAstroOpts.ASTROBIUM_CIRCLES_ANIM_STEP);
    }
    
  }else{
    clearInterval(drawAstroOpts.drawAstrobiumTimer);
  }
  drawAstroOpts.drawAstroStep++;
}

//绘制星盘中的虚线
function drawAstrobiumLines(step){
  if(typeof step === undefined){
    step = drawAstroOpts.ASTROBIUM_DASHED_LINE_STROKE;
  }

  drawAstroOpts.astroCtx.strokeStyle = drawAstroOpts.ASTROBIUM_DASHED_LINE_STROKE;
  drawAstroOpts.astroCtx.fillStyle = drawAstroOpts.ASTROBIUM_DASHED_LINE_STROKE;
  drawAstroOpts.astroCtx.beginPath();

  if(step<drawAstroOpts.ASTROBIUM_LINES_ANIM_STEP){
    for(var i=0;i<12;i++){
      drawAstroOpts.astroCtx.dashLineTo(drawAstroOpts.ASTROBIUM_CENTER_X,drawAstroOpts.ASTROBIUM_CENTER_Y,Math.round((step/drawAstroOpts.ASTROBIUM_LINES_ANIM_STEP)*drawAstroOpts.ASTROBIUM_RADIUS * Math.cos(Math.PI * i*30/180) + drawAstroOpts.ASTROBIUM_CENTER_X),Math.round((step/drawAstroOpts.ASTROBIUM_LINES_ANIM_STEP)*drawAstroOpts.ASTROBIUM_RADIUS * Math.sin(Math.PI * i*30/180) + drawAstroOpts.ASTROBIUM_CENTER_Y),4);
    }
    drawAstroOpts.astroCtx.stroke();
  }else{
    for(var i=0;i<12;i++){
      drawAstroOpts.astroCtx.dashLineTo(drawAstroOpts.ASTROBIUM_CENTER_X,drawAstroOpts.ASTROBIUM_CENTER_Y,Math.round(drawAstroOpts.ASTROBIUM_RADIUS * Math.cos(Math.PI * i*30/180) + drawAstroOpts.ASTROBIUM_CENTER_X),Math.round((drawAstroOpts.ASTROBIUM_RADIUS * Math.sin(Math.PI * i*30/180) + drawAstroOpts.ASTROBIUM_CENTER_Y)),4);
    }
    drawAstroOpts.astroCtx.stroke();

    for(var i=0;i<12;i++){
      drawAstroOpts.astroCtx.beginPath();
      drawAstroOpts.astroCtx.arc(Math.round(
        drawAstroOpts.ASTROBIUM_RADIUS * Math.cos(Math.PI * i*30/180) + 
        drawAstroOpts.ASTROBIUM_CENTER_X
      ),Math.round(
        (drawAstroOpts.ASTROBIUM_RADIUS * Math.sin(Math.PI * i*30/180) +
         drawAstroOpts.ASTROBIUM_CENTER_Y)
      ),
      drawAstroOpts.ASTROBIUM_DOTS_RADIUS,
      0,
      2*Math.PI);
      drawAstroOpts.astroCtx.fill();
    }
  }
}

//绘制星盘中的数据部分
function drawDataLines(step){
  if(typeof step === undefined){
    step = drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP;
  }

  var index = 0;
  var max = [0,0],min = [drawAstroOpts.constellationData[0][0],drawAstroOpts.constellationData[0][1]];

  for(index = 0;index<12;index++){
    max[0] = max[0] > drawAstroOpts.constellationData[index][0]?max[0]:drawAstroOpts.constellationData[index][0];
    max[1] = max[1] > drawAstroOpts.constellationData[index][1]?max[1]:drawAstroOpts.constellationData[index][1];
    min[0] = min[0] < drawAstroOpts.constellationData[index][0]?min[0]:drawAstroOpts.constellationData[index][0];
    min[1] = min[1] < drawAstroOpts.constellationData[index][1]?min[1]:drawAstroOpts.constellationData[index][1];
  }

  if(step < drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP){
    for(var indexOfTwoLine = 0;indexOfTwoLine<2;indexOfTwoLine++){
      drawAstroOpts.astroCtx.beginPath();
      if(indexOfTwoLine){
        drawAstroOpts.astroCtx.fillStyle = drawAstroOpts.ASTROBIUM_OPTION_ONE_FILL;
        drawAstroOpts.astroCtx.strokeStyle = drawAstroOpts.ASTROBIUM_OPTION_ONE_STROKE;
      }else{
        drawAstroOpts.astroCtx.fillStyle = drawAstroOpts.ASTROBIUM_OPTION_TWO_FILL;
        drawAstroOpts.astroCtx.strokeStyle = drawAstroOpts.ASTROBIUM_OPTION_TWO_STROKE;
      }

      if(max[indexOfTwoLine] == min[indexOfTwoLine] && max[indexOfTwoLine] == 0){
        drawAstroOpts.astroCtx.moveTo(drawAstroOpts.ASTROBIUM_CENTER_X+(step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.sin(0*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+(step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.cos(0*Math.PI/6));
        for(index = 0;index < 12; index++){
          drawAstroOpts.astroCtx.lineTo(drawAstroOpts.ASTROBIUM_CENTER_X+(step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.sin(index*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+(step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.cos(index*Math.PI/6));
        }
      }else if(max[indexOfTwoLine] == min[indexOfTwoLine] && max[indexOfTwoLine] != 0){
        drawAstroOpts.astroCtx.moveTo(drawAstroOpts.ASTROBIUM_CENTER_X+drawAstroOpts.ASTROBIUM_RADIUS*Math.sin(0*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+drawAstroOpts.ASTROBIUM_RADIUS*Math.cos(0*Math.PI/6));
        for(index = 0;index < 12; index++){
          drawAstroOpts.astroCtx.lineTo(drawAstroOpts.ASTROBIUM_CENTER_X+(step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*drawAstroOpts.ASTROBIUM_RADIUS*Math.sin(index*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+(step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*drawAstroOpts.ASTROBIUM_RADIUS*Math.cos(index*Math.PI/6));
        }
      }else{
        drawAstroOpts.astroCtx.moveTo(drawAstroOpts.ASTROBIUM_CENTER_X+
          (step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*
          (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
            (drawAstroOpts.ASTROBIUM_RADIUS - drawAstroOpts.ASTROBIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[0][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
          )*Math.sin(6*Math.PI/6),
          drawAstroOpts.ASTROBIUM_CENTER_Y+
          (step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*
          (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
            (drawAstroOpts.ASTROBIUM_RADIUS - opts.ASOBTRIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[0][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
          )*Math.cos(6*Math.PI/6));
        for(index = 0;index < 12; index++){
          drawAstroOpts.astroCtx.lineTo(drawAstroOpts.ASTROBIUM_CENTER_X+
            (step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*
            (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
              (drawAstroOpts.ASTROBIUM_RADIUS - drawAstroOpts.ASTROBIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[index][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
            )*Math.sin((18-index)*Math.PI/6),
            drawAstroOpts.ASTROBIUM_CENTER_Y+
            (step/drawAstroOpts.ASTROBIUM_DATA_ANIM_STEP)*
            (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
              (drawAstroOpts.ASTROBIUM_RADIUS - drawAstroOpts.ASTROBIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[index][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
            )*Math.cos((18-index)*Math.PI/6)); 
        }
        drawAstroOpts.astroCtx.closePath();
      }
      drawAstroOpts.astroCtx.stroke();
      drawAstroOpts.astroCtx.fill();
    }
  }else{
    for(var indexOfTwoLine = 0;indexOfTwoLine<2;indexOfTwoLine++){
      drawAstroOpts.astroCtx.beginPath();
      if(indexOfTwoLine){
        drawAstroOpts.astroCtx.fillStyle = drawAstroOpts.ASTROBIUM_OPTION_ONE_FILL;
        drawAstroOpts.astroCtx.strokeStyle = drawAstroOpts.ASTROBIUM_OPTION_ONE_STROKE;
      }else{
        drawAstroOpts.astroCtx.fillStyle = drawAstroOpts.ASTROBIUM_OPTION_TWO_FILL;
        drawAstroOpts.astroCtx.strokeStyle = drawAstroOpts.ASTROBIUM_OPTION_TWO_STROKE;
      }

      if(max[indexOfTwoLine] == min[indexOfTwoLine] && max[indexOfTwoLine] == 0){
        drawAstroOpts.astroCtx.moveTo(drawAstroOpts.ASTROBIUM_CENTER_X+drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.sin(0*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.cos(0*Math.PI/6));
        for(index = 0;index < 12; index++){
          drawAstroOpts.astroCtx.lineTo(drawAstroOpts.ASTROBIUM_CENTER_X+drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.sin(index*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+drawAstroOpts.ASTROBIUM_INNER_RADIUS*Math.cos(index*Math.PI/6));
        }
      }else if(max[indexOfTwoLine] == min[indexOfTwoLine] && max[indexOfTwoLine] != 0){
        drawAstroOpts.astroCtx.moveTo(drawAstroOpts.ASTROBIUM_CENTER_X+drawAstroOpts.ASTROBIUM_RADIUS*Math.sin(0*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+drawAstroOpts.ASTROBIUM_RADIUS*Math.cos(0*Math.PI/6));
        for(index = 0;index < 12; index++){
          drawAstroOpts.astroCtx.lineTo(drawAstroOpts.ASTROBIUM_CENTER_X+drawAstroOpts.ASTROBIUM_RADIUS*Math.sin(index*Math.PI/6),drawAstroOpts.ASTROBIUM_CENTER_Y+drawAstroOpts.ASTROBIUM_RADIUS*Math.cos(index*Math.PI/6));
        }
      }else{
        drawAstroOpts.astroCtx.moveTo(drawAstroOpts.ASTROBIUM_CENTER_X+
          (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
            (drawAstroOpts.ASTROBIUM_RADIUS - drawAstroOpts.ASTROBIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[0][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
          )*Math.sin(6*Math.PI/6),
          drawAstroOpts.ASTROBIUM_CENTER_Y+
          (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
            (drawAstroOpts.ASTROBIUM_RADIUS - drawAstroOpts.ASTROBIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[0][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
          )*Math.cos(6*Math.PI/6));
        for(index = 0;index < 12; index++){
          drawAstroOpts.astroCtx.lineTo(drawAstroOpts.ASTROBIUM_CENTER_X+
            (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
              (drawAstroOpts.ASTROBIUM_RADIUS - drawAstroOpts.ASTROBIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[index][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
            )*Math.sin((18-index)*Math.PI/6),
            drawAstroOpts.ASTROBIUM_CENTER_Y+
            (drawAstroOpts.ASTROBIUM_INNER_RADIUS + 
              (drawAstroOpts.ASTROBIUM_RADIUS - drawAstroOpts.ASTROBIUM_INNER_RADIUS)*genLambda(drawAstroOpts.constellationData[index][indexOfTwoLine],max[indexOfTwoLine],min[indexOfTwoLine])
            )*Math.cos((18-index)*Math.PI/6)); 
        }
        drawAstroOpts.astroCtx.closePath();
      }
      drawAstroOpts.astroCtx.stroke();
      drawAstroOpts.astroCtx.fill();
    }
  }
}

//计算当前星座在对应线段上的插值
function genLambda(interpolator,max,min){
  if(max < min){
    var temp = min;
    min = max;
    max = temp;
  }

  if(max == min && interpolator == max){
    return 1;
  }else if(max == min && interpolator != max){
    return Infinity;
  }else{
    return (interpolator - min)/(max - min);
  }
}

//清空星盘画板
function refreshAstribiumCanvas(){
  drawAstroOpts.astroCtx.clearRect(0,0,330,330);
}

/*********************************************************************
绘制年代秀的各种操作
*********************************************************************/

//绘制年代秀中进度条的任务
function playYearsShow(){
  drawYearOpts.yearsTimer=setInterval(drawYearsBar,5);
};

//绘制年代秀中进度条的当前步骤
function drawYearsBar(){
  drawYearOpts.yearsCount= drawYearOpts.yearsCount+1;
  for(var i=0;i<4;i++){  
    if(drawYearOpts.yearsPer[i].x == 0 && drawYearOpts.yearsPer[i].y ==0){
      continue;
    }

    drawYearOpts.yearsStep[i].x=drawYearOpts.rectWidth*drawYearOpts.yearsPer[i].x/50;
    drawYearOpts.yearsStep[i].y=drawYearOpts.rectWidth*drawYearOpts.yearsPer[i].y/50;
    drawYearOpts.ctx[i].fillStyle="#4DE3F4";
    drawYearOpts.ctx[i].clearRect(0,0,drawYearOpts.rw[i].x+drawYearOpts.height,drawYearOpts.height);
    drawYearOpts.ctx[i].beginPath();
    drawYearOpts.ctx[i].arc(drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,Math.PI/2,3*Math.PI/2);
    drawYearOpts.ctx[i].closePath();
    drawYearOpts.ctx[i].fill();
    drawYearOpts.ctx[i].fillRect(drawYearOpts.yearsBarCircleRadius,0,drawYearOpts.rw[i].x+1,drawYearOpts.height);
    drawYearOpts.ctx[i].beginPath();
    drawYearOpts.ctx[i].arc(drawYearOpts.yearsBarCircleRadius+drawYearOpts.rw[i].x-1,drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,3*Math.PI/2,Math.PI/2);
    drawYearOpts.ctx[i].closePath();
    drawYearOpts.ctx[i].fill();

    drawYearOpts.ctx[i].fillStyle="#FECF43";
    drawYearOpts.ctx[i].clearRect(drawYearOpts.width-drawYearOpts.rw[i].y-drawYearOpts.height,0,drawYearOpts.rw[i].y+drawYearOpts.height,drawYearOpts.height);
    drawYearOpts.ctx[i].beginPath();
    drawYearOpts.ctx[i].arc(drawYearOpts.width-drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,3*Math.PI/2,Math.PI/2);
    drawYearOpts.ctx[i].closePath();
    drawYearOpts.ctx[i].fill();
    drawYearOpts.ctx[i].fillRect(drawYearOpts.width-drawYearOpts.rw[i].y-drawYearOpts.yearsBarCircleRadius-1,0,drawYearOpts.rw[i].y+2,drawYearOpts.height);
    drawYearOpts.ctx[i].beginPath();
    drawYearOpts.ctx[i].arc(drawYearOpts.width-drawYearOpts.yearsBarCircleRadius-drawYearOpts.rw[i].y,drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,Math.PI/2,3*Math.PI/2);
    drawYearOpts.ctx[i].closePath();
    drawYearOpts.ctx[i].fill();
    drawYearOpts.rw[i].x=drawYearOpts.rw[i].x+drawYearOpts.yearsStep[i].x;
    drawYearOpts.rw[i].y=drawYearOpts.rw[i].y+drawYearOpts.yearsStep[i].y ;
  }

  if(drawYearOpts.yearsCount>51){
    clearInterval(drawYearOpts.yearsTimer);

    drawYearsEndCircle();
    showYearsBubble();
  } 
}

//年代秀中进度条的最后一步绘制边缘圆角
function drawYearsEndCircle(){
//接触时画一个圆
  for(var i=0;i<4;i++){
    if(drawYearOpts.yearsStep[i].x>=drawYearOpts.yearsStep[i].y && drawYearOpts.yearsPer[i].x != 0){
      drawYearOpts.ctx[i].fillStyle="#4DE3F4";
      drawYearOpts.ctx[i].fillRect(drawYearOpts.rw[i].x+drawYearOpts.yearsBarCircleRadius-drawYearOpts.yearsStep[i].x,0,drawYearOpts.yearsBarCircleRadius,drawYearOpts.height);
      drawYearOpts.ctx[i].beginPath();
      drawYearOpts.ctx[i].arc(drawYearOpts.rw[i].x+drawYearOpts.height,drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,0,2*Math.PI);
      drawYearOpts.ctx[i].closePath();
      drawYearOpts.ctx[i].fill();
    }else if(drawYearOpts.yearsStep[i].x<drawYearOpts.yearsStep[i].y){
      drawYearOpts.ctx[i].fillStyle="#FECF43";
      drawYearOpts.ctx[i].fillRect(drawYearOpts.width-drawYearOpts.rw[i].y-drawYearOpts.height,0,drawYearOpts.yearsBarCircleRadius,drawYearOpts.height);
      drawYearOpts.ctx[i].beginPath();
      drawYearOpts.ctx[i].arc(drawYearOpts.width-drawYearOpts.rw[i].y-drawYearOpts.height,drawYearOpts.yearsBarCircleRadius,drawYearOpts.yearsBarCircleRadius,0,2*Math.PI);
      drawYearOpts.ctx[i].closePath();
      drawYearOpts.ctx[i].fill();
    }else if(drawYearOpts.yearsPer[i].x == 0 && drawYearOpts.yearsPer[i].y == 0){
      //不会绘制
    }
  }
}

//显示年代秀中的气泡
function showYearsBubble(){
  //得到百分比
  var label=new Array();
  label[0]=document.getElementById("labelFor70");
  label[1]=document.getElementById("labelFor80");
  label[2]=document.getElementById("labelFor90");
  label[3]=document.getElementById("labelFor00");

  for(var i =0;i<4;i++){
    if(drawYearOpts.yearsStep[i].x>=drawYearOpts.yearsStep[i].y && drawYearOpts.yearsPer[i].x != 0){
      // dialog[i].src="./picture/data_age_bubble_blue.png";
      // dialog[i].style.display="block";
      // dialog[i].style.marginLeft=drawYearOpts.rw[i].x+70+"px";43px 38px
      label[i].style.backgroundImage='url("static/img/data_age_bubble_blue.png")';
      label[i].style.backgroundSize='41px 38px';
      // label[i].style.background="#FFFFFF";
      label[i].style.display="block";
      label[i].style.marginLeft=drawYearOpts.rw[i].x+60+"px";
    }else if(drawYearOpts.yearsStep[i].x<drawYearOpts.yearsStep[i].y){
      // dialog[i].src="./picture/data_age_bubble_yellow.png";
      // dialog[i].style.display="block";
      // dialog[i].style.marginLeft=width-drawYearOpts.rw[i].y-height+46+"px";
      label[i].style.backgroundImage='url("static/img/data_age_bubble_yellow.png")';
      label[i].style.backgroundSize='41px 38px';
      // label[i].style.background="#ABCDFF";
      label[i].style.display="block";
      label[i].style.marginLeft=drawYearOpts.width-drawYearOpts.rw[i].y-drawYearOpts.height+55+"px";
    }else if(drawYearOpts.yearsPer[i].x == 0 && drawYearOpts.yearsPer[i].y == 0){
      //尚无此年龄段投票
    }
  }
}

/***************************************************************************
数据结论中的各种操作，包括生成各种结论以及切换数据页时动画的启动
***************************************************************************/

//启动总数据中结论的动画
function showSumConclusion(){
  removeClass($('#conclusion-detail-sum'),'conclusion-detail-before-animation');
  addClass($('#conclusion-detail-sum'),'conclusion-detail-after-animation');
}

//启动男女有别中结论的动画
function showGenderConclusion(){
  removeClass($('#conclusion-detail-gender'),'conclusion-detail-before-animation');
  addClass($('#conclusion-detail-gender'),'conclusion-detail-after-animation');
}

//启动星座秀中结论的动画
function showAstroConclusion(){
  removeClass($('#conclusion-detail-astro'),'conclusion-detail-before-animation');
  addClass($('#conclusion-detail-astro'),'conclusion-detail-after-animation');
}

//启动年代秀中结论的动画
function showYearsConclusion(){
  removeClass($('#conclusion-detail-years'),'conclusion-detail-before-animation');
  addClass($('#conclusion-detail-years'),'conclusion-detail-after-animation');
}

//生成数据总结
function genDataSummary(postAnalysis,type){
  switch(type){
    case dataPage.SUM_DATA:
      return genSumDataSummary(postAnalysis.post.optionOne,postAnalysis.post.optionTwo,postAnalysis.percentageOptionOne,postAnalysis.percentageOptionTwo);
    case dataPage.GENDER_DATA:
      return genGenderDataSummary(postAnalysis.post.optionOne,postAnalysis.post.optionTwo,postAnalysis.percentageMaleOptionOne,postAnalysis.percentageMaleOptionTwo,postAnalysis.percentageFemaleOptionOne,postAnalysis.percentageFemaleOptionTwo);
    case dataPage.ASTRO_DATA:
      var optionOneArrayForAstro = [];
      var optionTwoArrayForAstro = [];
      optionOneArrayForAstro[0] = postAnalysis.percentageAriesOptionOne;
      optionOneArrayForAstro[1] = postAnalysis.percentageTaurusOptionOne;
      optionOneArrayForAstro[2] = postAnalysis.percentageGeminiOptionOne;
      optionOneArrayForAstro[3] = postAnalysis.percentageCancerOptionOne;
      optionOneArrayForAstro[4] = postAnalysis.percentageLeoOptionOne;
      optionOneArrayForAstro[5] = postAnalysis.percentageVirgoOptionOne;
      optionOneArrayForAstro[6] = postAnalysis.percentageLibraOptionOne;
      optionOneArrayForAstro[7] = postAnalysis.percentageScorpioOptionOne;
      optionOneArrayForAstro[8] = postAnalysis.percentageSagittariusOptionOne;
      optionOneArrayForAstro[9] = postAnalysis.percentageCapricornOptionOne;
      optionOneArrayForAstro[10] = postAnalysis.percentageAquariusOptionOne;
      optionOneArrayForAstro[11] = postAnalysis.percentagePiscesOptionOne;
      
      optionTwoArrayForAstro[0] = postAnalysis.percentageAriesOptionTwo;
      optionTwoArrayForAstro[1] = postAnalysis.percentageTaurusOptionTwo;
      optionTwoArrayForAstro[2] = postAnalysis.percentageGeminiOptionTwo;
      optionTwoArrayForAstro[3] = postAnalysis.percentageCancerOptionTwo;
      optionTwoArrayForAstro[4] = postAnalysis.percentageLeoOptionTwo;
      optionTwoArrayForAstro[5] = postAnalysis.percentageVirgoOptionTwo;
      optionTwoArrayForAstro[6] = postAnalysis.percentageLibraOptionTwo;
      optionTwoArrayForAstro[7] = postAnalysis.percentageScorpioOptionTwo;
      optionTwoArrayForAstro[8] = postAnalysis.percentageSagittariusOptionTwo;
      optionTwoArrayForAstro[9] = postAnalysis.percentageCapricornOptionTwo;
      optionTwoArrayForAstro[10] = postAnalysis.percentageAquariusOptionTwo;
      optionTwoArrayForAstro[11] = postAnalysis.percentagePiscesOptionTwo;

      return genAstroDataSummary(postAnalysis.post.optionOne,postAnalysis.post.optionTwo,optionOneArrayForAstro,optionTwoArrayForAstro);
    case dataPage.YEARS_DATA:
      var optionOneArrayForYears = [];
      var optionTwoArrayForYears = [];

      optionOneArrayForYears[0] = postAnalysis.percentage70OptionOne;
      optionOneArrayForYears[1] = postAnalysis.percentage80OptionOne;
      optionOneArrayForYears[2] = postAnalysis.percentage90OptionOne;
      optionOneArrayForYears[3] = postAnalysis.percentage00OptionOne;
      optionTwoArrayForYears[0] = postAnalysis.percentage70OptionTwo;
      optionTwoArrayForYears[1] = postAnalysis.percentage80OptionTwo;
      optionTwoArrayForYears[2] = postAnalysis.percentage90OptionTwo;
      optionTwoArrayForYears[3] = postAnalysis.percentage00OptionTwo;
      return genYearsDataSummary(postAnalysis.post.optionOne,postAnalysis.post.optionTwo,optionOneArrayForYears,optionTwoArrayForYears);
  }


  //生成总数据总结
  function genSumDataSummary(optionOneText,optionTwoText,optionOneVote,optionTwoVote){
    var result = "";
    if(optionOneVote<optionTwoVote){
      result = "选择“"+optionTwoText+"”的人多";
    }else if(optionOneVote > optionTwoVote){
      result = "选择“"+optionOneText+"”的人多";
    }else{
      result = "大家的选择很平均， 这该如何是好？";
    }
    
    return result+"\n";
  }
  
  //生成男女有别数据总结
  function genGenderDataSummary(optionOneText, optionTwoText, maleOptionOneVote, maleOptionTwoVote, femaleOptionOneVote, femaleOptionTwoVote){
    var result = "";
    if(maleOptionOneVote==maleOptionTwoVote&&femaleOptionOneVote==femaleOptionTwoVote){
      result += "男女生的选择都很平均";
    }else{
      if(maleOptionOneVote<maleOptionTwoVote){
        result += "男生选择“"+optionTwoText+"”的多\n";
      }else if(maleOptionOneVote>maleOptionTwoVote){
        result += "男生选择“"+optionOneText+"”的多\n";
      }else{
        result += "男生的选择很平均\n";
      }
      
      if(femaleOptionOneVote<femaleOptionTwoVote){
        result += "女生选择“"+optionTwoText+"”的多";
      }else if(femaleOptionOneVote>femaleOptionTwoVote){
        result += "女生选择“"+optionOneText+"”的多";
      }else{
        result += "女生的选择很平均";
      }
    }
    
    return result;
  }

  //生成星座秀数据总结
  function genAstroDataSummary(optionOneText, optionTwoText, optionOneVoteArray, optionTwoVoteArray){
    var result = "";
    var maxFlagVoteOne = [];
    var maxFlagVoteTwo = [];
    var minFlagVoteOne = [];
    var minFlagVoteTwo = [];
    var voteOneMaxValue = 0;
    var voteTwoMaxValue = 0;
    var voteOneMinValue = optionOneVoteArray[0];
    var voteTwoMinValue = optionTwoVoteArray[0];
    var maxCountOne = 0, maxCountTwo = 0, minCountOne = 0, minCountTwo = 0;
    
    for(var i=0;i<12;i++){
      maxFlagVoteOne[i] = false;
      maxFlagVoteTwo[i] = false;
      minFlagVoteOne[i] = false;
      minFlagVoteTwo[i] = false;
      voteOneMaxValue = voteOneMaxValue<optionOneVoteArray[i]?optionOneVoteArray[i]:voteOneMaxValue;
      voteTwoMaxValue = voteTwoMaxValue<optionTwoVoteArray[i]?optionTwoVoteArray[i]:voteTwoMaxValue;
      voteOneMinValue = voteOneMinValue>optionOneVoteArray[i]?optionOneVoteArray[i]:voteOneMinValue;
      voteTwoMinValue = voteTwoMinValue>optionTwoVoteArray[i]?optionTwoVoteArray[i]:voteTwoMinValue;
    }
    
    for(var i=0;i<12;i++){
      if(voteOneMaxValue == optionOneVoteArray[i]){
        maxFlagVoteOne[i] = true;
        maxCountOne++;
      }else if(voteOneMinValue == optionOneVoteArray[i]){
        minFlagVoteOne[i] = true;
        minCountOne++;
      }
      
      if(voteTwoMaxValue == optionTwoVoteArray[i]){
        maxFlagVoteTwo[i] = true;
        maxCountTwo++;
      }else if(voteTwoMinValue == optionTwoVoteArray[i]){
        minFlagVoteTwo[i] = true;
        minCountTwo++;
      }
    }
    
    if(maxCountOne<4){
      result += "选择“"+optionOneText+"”的";
      for(var i=0;i<maxCountOne;i++){
        var index = 0;
        for(var j=0;j<12;j++){
          if(maxFlagVoteOne[j]){
            if(index == i){
              result+=drawAstroOpts.AstroNameArray[j]+"、";
              break;
            }
            index++;
          }
        }
      }
      result = result.substring(0, result.length-1);
      result += "最多\n";
    }else if(minCountOne<4){
      result += "选择“"+optionOneText+"”的";
      for(var i=0;i<minCountOne;i++){
        var index = 0;
        for(var j=0;j<12;j++){
          if(minFlagVoteOne[j]){
            if(index == i){
              result+=drawAstroOpts.AstroNameArray[j]+"、";
              break;
            }
            index++;
          }
        }
      }
      result = result.substring(0, result.length-1);
      result += "最少\n";
    }else if(maxCountTwo <4 && minCountTwo<4){
      result += "各星座的选择没有特别明显的差别";
      return result;
    }else{
      result += "各星座选择“"+optionOneText+"”的没有特别明显的差别\n";
    }
    
    
    if(maxCountTwo<4){
      result += "选择“"+optionTwoText+"”的";
      for(var i=0;i<maxCountTwo;i++){
        var index = 0;
        for(var j=0;j<12;j++){
          if(maxFlagVoteTwo[j]){
            if(index == i){
              result+=drawAstroOpts.AstroNameArray[j]+"、";
              break;
            }
            index++;
          }
        }
      }
      result = result.substring(0, result.length-1);
      result += "最多";
    }else if(minCountTwo<4){
      result += "选择“"+optionTwoText+"”的";
      for(var i=0;i<minCountTwo;i++){
        var index = 0;
        for(var j=0;j<12;j++){
          if(minFlagVoteTwo[j]){
            if(index == i){
              result+=drawAstroOpts.AstroNameArray[j]+"、";
              break;
            }
            index++;
          }
        }
      }
      result = result.substring(0, result.length-1);
      result += "最少";
    }else{
      result += "各星座选择“"+optionTwoText+"”的没有特别明显的差别";
    }
    return result;
  }
  
  //生成年代秀数据总结
  function genYearsDataSummary(optionOneText, optionTwoText, optionOneVoteArray, optionTwoVoteArray){
    var result = "";
    
    if(optionOneVoteArray[2]<optionTwoVoteArray[2]){
      result="90后选择“"+optionTwoText+"”的人多";
    }else if(optionOneVoteArray[2]>optionTwoVoteArray[2]){
      result="90后选择“"+optionOneText+"”的人多";
    }else if(optionOneVoteArray[1]<optionTwoVoteArray[1]){
      result="80后选择“"+optionTwoText+"”的人多";
    }else if(optionOneVoteArray[1]>optionTwoVoteArray[1]){
      result="80后选择“"+optionTwoText+"”的人多";
    }else if(optionOneVoteArray[3]<optionTwoVoteArray[3]){
      result="00后选择“"+optionTwoText+"”的人多";
    }else if(optionOneVoteArray[3]>optionTwoVoteArray[3]){
      result="00后选择“"+optionOneText+"”的人多";
    }else if(optionOneVoteArray[0]<optionTwoVoteArray[0]){
      result="70后选择“"+optionTwoText+"”的人多";
    }else if(optionOneVoteArray[0]>optionTwoVoteArray[0]){
      result="70后选择“"+optionOneText+"”的人多";
    }else{
      result="各个年代人的选择都很平均";
    }
    
    return result+"\n";
  }
}

/******************************************************
处理下载操作
******************************************************/

//处理下载请求
function handleDownload(){
  if(window.event) oEvent = window.event;
    var ua = navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i)=="micromessenger") 
    {
      $("#note-in-weixin").style.height=document.body.offsetHeight + "px";
      $("#note-in-weixin").style.display= "block";
      return;
    }else{ 
      var isIPhone = /iPhone/i.test(navigator.userAgent),
        isIPad = /iPad/i.test(navigator.userAgent),
        isAndroid = /android/i.test(navigator.userAgent);
        var isIOS = isIPhone  || isIPad; 
        if(isAndroid){
          window.open("http://www.bengjiujie.com/public/download/a/bengjiujie.apk");
        }else if(isIOS){
          window.open("https://appsto.re/cn/_e722.i");
        }else{
          alert("请在手机中打开此网页");
        }
    }
}

//获取数据失败时打印错误
function alertFailure(data){
  selfLog(data);
}