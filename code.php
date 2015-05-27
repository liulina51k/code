<?php
//1.*******************基本分页**************
$perpage = 1;
$pagecount = $res['num'];
$totalpage = ceil($pagecount/$perpage);
					
$curpage = empty ( $curpage ) ? 1 : intval($curpage);
					
$start = ($curpage-1) * $perpage;
					
$prepage = ($curpage-1)>0 ? $curpage-1 : 1;
$nextpage = ($curpage+1)<=$totalpage ? $curpage+1 : $totalpage;
//2.******************图片整体向左，或右滑动********
function right_xiang(){
      $(".pic_tu_nr").children().slice(0,5).hide();
      $(".pic_tu_nr").children().slice(5,10).show();
}
  
function left_xiang(){
  $(".pic_tu_nr").children().slice(5,10).hide();
  $(".pic_tu_nr").children().slice(0,5).show();
}
//3.****************瀑布流点击方式******************
<script type="text/javascript">
 var numm={$num};

 var attpath = '{$attpath}';
{literal}
 $(function(){
   if(numm<=10)
      $('.xia_tiao').hide();
  else
       $('.xia_tiao').show();
     
 });
var page = 1;
function loadmore(){
	++page;
	
	$.getJSON(site+"/loadmore.php?page="+page+"&format=json&jsoncallback=?",function(data){
	var num = data.artlist.length;
	alert(num);
    for(var k in data['artlist']){
        if(k%4==0)
        {
         list = '<div class="pic_block a"><a href='+data['artlist'][k]['url']+'><img src='+attpath+data['artlist'][k]['presspic']+'><p><a href='+data['artlist'][k]['url']+'>'+data['artlist'][k]['subject']+' </a></p></div>';
    	 $(".a").last().after(list);
        }else if(k%4==1)
        {
         list = '<div class="pic_block b"><a href='+data['artlist'][k]['url']+'><img src='+attpath+data['artlist'][k]['presspic']+'><p><a href='+data['artlist'][k]['url']+'>'+data['artlist'][k]['subject']+' </a></p></div>';
    	 $(".b").last().after(list);
        }
        else if(k%4==2)
        {
         list = '<div class="pic_block c"><a href='+data['artlist'][k]['url']+'><img src='+attpath+data['artlist'][k]['presspic']+'><p><a href='+data['artlist'][k]['url']+'>'+data['artlist'][k]['subject']+' </a></p></div>';
    	 $(".c").last().after(list);
        }
        else if(k%4==3)
        {
         list = '<div class="pic_block d"><a href='+data['artlist'][k]['url']+'><img src='+attpath+data['artlist'][k]['presspic']+'><p><a href='+data['artlist'][k]['url']+'>'+data['artlist'][k]['subject']+' </a></p></div>';
    	 $(".d").last().after(list);
        }
        if(num<10){
$('.xia_tiao').hide();
}else{
$('.xia_tiao').show();
}
    }
  
   });
}
{/literal}
</script>
//4.******************瀑布流滑动事件***********************
<script type="text/javascript"> 
var site = '{$site}';
var attpath = '{$attpath}';
var pagecount0 ={$pagecount0};
var pagecount1 ={$pagecount1};
var total0 ={$total0};
var total1 ={$total1};
var categoryid = {$categoryid};
{literal}

var curpage = 1;
var loading = false;
var m = 0;
 $(function(){
    
     $(".topsBtnDiv_01 li").click(function(){
	    m = $(this).index() //取得当前的序号
		$(this).children("a").addClass("current01") // 所触发的tab变成当前状态
		$(this).siblings().children("a").removeClass("current01") // 其他tab变成非当前状态
        $($(".pic_01")[m]).show()  //显示当前tab对应的div		
		$($(".pic_01")[m]).siblings("div").hide()//隐藏其他div
		
		if(eval("total"+m) < 11){
 		$($(".pic_01")[m]).find(".jiazia_pic").hide();
		$($(".pic_01")[m]).find(".look").show();
 	}else{
 		$($(".pic_01")[m]).find(".jiazia_pic").show();
		$($(".pic_01")[m]).find(".look").hide();
 	}
	 })
 });
 
 $(function(){
 	
 	if(eval("total"+m) < 11){
 		$($(".pic_01")[m]).find(".jiazia_pic").hide();
		$($(".pic_01")[m]).find(".look").show();
 	}else{
 		$($(".pic_01")[m]).find(".jiazia_pic").show();
		$($(".pic_01")[m]).find(".look").hide();
 	}
 });

function getPageList(page,m){
 
    pagecount=eval("pagecount"+m);
	if(page<=pagecount && !loading){
		
		$($(".pic_01")[m]).find(".jiazia_pic").show();
		$($(".pic_01")[m]).find(".look").hide();
		loading = true;
		
		$.ajax({
            type : 'GET',
            url : site+'/loadMore.php?page='+page+'&m='+m+'&categoryid='+categoryid,
            success : function(data){
            	
                var data = eval('('+data+')');
                var num = data.length;
                
				for(var k in data){
		        if(k%4==0)
		        {
		         list = '<div class="block_pic a"><a href='+data[k]['url']+'><img src='+attpath+data[k]['pic']+'><p><a href='+data[k]['url']+'>'+data[k]['subject']+' </a></p></div>';
		         
		    	 $($(".pic_01")[m]).find(".a").last().after(list);
		    	 
		        }else if(k%4==1)
		        {
		         list = '<div class="block_pic"><a href='+data[k]['url']+'><img src='+attpath+data[k]['pic']+'><p><a href='+data[k]['url']+'>'+data[k]['subject']+' </a></p></div>';
		    	 $($(".pic_01")[m]).find(".b").last().after(list);
		        }
		        else if(k%4==2)
		        {
		         list = '<div class="block_pic"><a href='+data[k]['url']+'><img src='+attpath+data[k]['pic']+'><p><a href='+data[k]['url']+'>'+data[k]['subject']+' </a></p></div>';
		    	 $($(".pic_01")[m]).find(".c").last().after(list);
		        }
		        else if(k%4==3)
		        {
		         list = '<div class="block_pic"><a href='+data[k]['url']+'><img src='+attpath+data[k]['pic']+'><p><a href='+data[k]['url']+'>'+data[k]['subject']+' </a></p></div>';
		    	 $($(".pic_01")[m]).find(".d").last().after(list);
		        }
		       }
				curpage++;	
				
				if(num < 12)
				{
					$($(".pic_01")[m]).find(".jiazia_pic").hide();
		            $($(".pic_01")[m]).find(".look").show();
				}
				else{
					$($(".pic_01")[m]).find(".jiazia_pic").show();
		            $($(".pic_01")[m]).find(".look").hide();
		            loading=false;
				}
				
            }
        });
	}
}

window.onscroll=function(){ 
	var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
	if ($(document).height() <= totalheight)
	{
		getPageList(curpage+1,m);
	}
}

//5.******************设置每天的访问量*********************
$ymd = date('y-m-d',time());
$ymd = strtotime($ymd);
$sql = "select dayview from iissblog_viewnum where viewtime=".$ymd." and uid=".$uid;
$query = $db->query($sql);
$value = $db->fetch_array($query);
$num = $value['dayview'];
if(count($value) > 0)
{   
	$db->query("update iissblog_user set todayview=$num+1 where uid=".$uid);
	$db->query("update iissblog_viewnum set dayview=$num+1 where uid=".$uid);
	
}else{
	$db->query("update iissblog_user set todayview=1 where uid=".$uid);
	$arr = array(
      'uid' => $uid,
      'dayview' => 1,
      'viewtime' => $ymd,
    );
    $db -> insertTable('iissblog_viewnum', $arr, 1);
}
//6.*****************对单选框的值进行修改********************
 if($(this).attr("type") == "radio"){
	  $(this).each(function(i){
             if($(this).attr("checked"))
             paramArray[$(this).attr("name")] = $(this).val();   
	  });
 }else{
             paramArray[$(this).attr("name")] = $(this).val();
 }
 //7.***************对数据库取出数据的处理*******************
 while($value = $db->fetch_array($query)){
			$value['artid'] = !empty($value['modelid']) ? $value['artid'].$value['modelid'] : $value['artid'].$modelid;   
			$key = date('m月d日',$value['pubdate']);
			
			$artlist[$key][]= array(
			          'pubdate'=>date('h:i',$value['pubdate']),
			          'url'=>$value['url'],
			          'subject'=>$value['subject']
			                        
			);
			
}
//8.***************通过隐藏域实现的查看更多功能*******************
$(document).ready(function(){
	$('#number').attr('value',15);
});
//查看更多
function more(){
	var num = document.getElementById("number").value;
	var num2 =Number(num)+Number(15);
	$.get(wapurl+"/do.php", {inajax:1,do:'touch', ac:'getnextarticle',number:num,vtype:'touch',topid:topid}, function(data){
		
		var articlelist = eval("(" + data + ")");
		
		$.each(articlelist['list'],function(index1,objval){
			 var val = $(".p").last().text();
			 var i=0;
			 if(index1 != val){
			 	 var list = '<div class="wap_list_top"><div class="wap_block">';
			     list +='<p class="p">'+index1+'</p>';
			     list +='<div class="clear"></div><div class="wap_block_nr"><ul>';
			     $.each(objval,function(index2,objval2) {
			     	      i++;
	             });
			     $.each(objval,function(index2,objval2) {
			          if(index2 != (i-1))
			     	     list +='<li><span>'+objval2['pubdate']+'</span><a href="'+objval2['url']+'">'+objval2['subject']+'</a></li>';
			     	  else
			     	     list +='<li class="ts_listli"><span>'+objval2['pubdate']+'</span><a href="'+objval2['url']+'">'+objval2['subject']+'</a></li>';
	             });
	             
				 list +='</ul></div></div></div>';
		         $('.wap_list_top').last().after(list);
			 }else {
				 list = '<div class="clear"></div>';
			     list +='<div class="wap_block_nr"><ul>';
	             $.each(objval,function(index2,objval2) {
	             	
			     	     list +='<li><span>'+objval2['pubdate']+'</span><a href="'+objval2['url']+'">'+objval2['subject']+'</a></li>';
			     	 
	             });
				 list +='</ul></div>';
				 $('.p').last().after(list);
			 }
			 
			 $('#number').attr('value',num2);
			 
		});
		if(articlelist['num']<15){
			$('#look_bg').hide();
	    }
		
	});
}
//9.***************导航按钮的显示与隐藏*******************
function navi(){
	
    if($(".tuan_nav").attr("style"))
	     $(".tuan_nav").removeAttr("style");
	else
	     $(".tuan_nav").attr("style","display:none;");
}
//10.***************标签切换功能的实现*******************
$(function(){
	$(".bar_nav li").click(function(){
		m = $(this).index() //取得当前的序号
		$(this).addClass("on") // 所触发的tab变成当前状态
		$(this).siblings().removeClass("on") // 其他tab变成非当前状态
		$($(".nav_content_item")[m]).show(); //显示当前tab对应的div	
		$($(".nav_content_item")[m]).siblings("div").hide();//隐藏其他div
	});
});
//11.***************带有标签切换查看更多功能的实现*******************
var m=0;
$(function(){
	$(".bar_nav li").click(function(){
		m = $(this).index() //取得当前的序号
		$(this).addClass("on") // 所触发的tab变成当前状态
		$(this).siblings().removeClass("on") // 其他tab变成非当前状态
		$($(".nav_content_item")[m]).show(); //显示当前tab对应的div	
		$($(".nav_content_item")[m]).siblings("div").hide();//隐藏其他div
		$($(".nav_content_item")[m]).attr("style","width: 1885px; display: table-cell; vertical-align: top;");
		
	});
});
$(document).ready(function(){
	$('#number').attr('value',3);
});
//查看更多
function more(){
	var num = document.getElementById("number").value;
	var num2 =Number(num)+Number(3);
	$.get(wapurl+"/do.php", {inajax:1,do:'touch', ac:'getnextimage',number:num,vtype:'touch',param:m}, function(data){
		
		var articlelist = eval("(" + data + ")");
		
		$.each(articlelist['list'],function(index1,objval){
			 var list ='<div class="tuzu_pic">';
             list +='<a href="'+wapurl+'/touch/view/'+objval['imgid']+'"><img src="'+objval['pic']+'"></a>';
             list +='<h2><a href="'+wapurl+'/touch/view/'+objval['imgid']+'">'+objval['subject']+'</a></h2>';
             list +='</div>';
			 $($(".nav_content_item")[m]).find(".tuzu_pic").last().after(list);
			 $('#number').attr('value',num2);
			 
		});
		if(articlelist['num']<3){
			$($(".nav_content_item")[m]).find(".chakan").hide();
	    }
		
	});
}
//12.***************上下翻页的实现************
$(document).ready(function(){
	$('#number').attr('value',0);
});

//上一页
function previous(){
	var num = document.getElementById("number").value;
	var num2 =Number(num)-Number(1);
	if(num2<0)
	       num2=0;
	if(num2<artnumber){
		$.get(wapurl+"/do.php", {inajax:1,do:'touch', ac:'getmorearticle',number:num2,vtype:'touch',tempid:artid}, function(data){
			
				var articlelist = eval("(" + data + ")");
			    $('.zhengwen').html(articlelist);
			    $("#curpage").text(parseInt(num2)+1);
			    $('#number').attr('value',num2);
		});
	}
}
//下一页
function next(){
	var num = document.getElementById("number").value;
	var num2 =Number(num)+Number(1);
	
	if(num2<artnumber){
		$.get(wapurl+"/do.php", {inajax:1,do:'touch', ac:'getmorearticle',number:num2,vtype:'touch',tempid:artid}, function(data){
			
			var articlelist = eval("(" + data + ")");
			$('.zhengwen').html(articlelist);
			$("#curpage").text(parseInt(num2)+1);
			$('#number').attr('value',num2);
		});
	}
}
另一种方式：（二者略有不同）
function next(){
	var num = document.getElementById("number").value;
    var num2 = Number(num)+Number(6);
    if(num2<total){
    	$.getJSON(site+"/do.php?do=sjtodayhead&inajax=ajax&ac=listHead&number="+num2+"&jsoncallback=?",function(v){
		    $("#content").html(v.data);
		    $('#number').attr('value',num2);
		}
       );	
    }
} 
function previous(){
	var num = document.getElementById("number").value;
    var num2 = Number(num)-Number(6);
    if(num2<0)
         num2 = 0;
    $.getJSON(site+"/do.php?do=sjtodayhead&inajax=ajax&ac=listHead&number="+num2+"&jsoncallback=?",function(v)	{ 
		    $("#content").html(v.data);
		    $('#number').attr('value',num2);
	});
}  
//13.***************js表单提交******************
document.getElementById("myform").submit();
//14.***************利用js中的Swipe类实现的手机端图片滑动****************
$(function(){
	    imgSlideInit('#main_img');
	    //$("#down").attr('href',firstimgurl);
	});
	
	//图片滑动
    function imgSlideInit(sId){
		var oSlider = $(sId),
		introID = $(".jieshuo"),
		imgId = $("#img_inner");
		id = sId.substr(1),
		oImg = oSlider.find('.img'),
		len = oImg.length;
		list1 = '(1/'+(len+1)+')';
		$("#imgTotal").html(list1);

		
		id = new Swipe(document.getElementById(id), {
		    startSlide: 0,//起始图片切换的索引位置
		    auto: 0,      //设置自动切换时间，单位毫秒
		    speed: 400,
		    callback: function(event, index, elem){
		    	//回调函数，切换时触发
		    	//$("#down").attr('href',elem);
		    	list2 = '('+(index+1)+'/'+(len+1)+')';
		        $("#imgTotal").html(list2);
		        introID.find('p').eq(index).show().siblings().hide();
		        
				//图片预加载
		        var pic = new Image();
		        pic.src=$($(".img")[index]).attr("imgsrc");
		        pic.onload=function(){
		       	   src=pic.src;
		       	   $($(".img")[index]).attr("src",src);
		           $($(".img")[index]).attr("width","320");
		        };
				if((index+1)==len){
					
					if(isLast){
						$(".img_inner").attr("style","display:none");
						$(".img_w").attr("style","width: 320px; vertical-align: middle;");
					    
					}else{
						isLast = true;
					}
				}else{
					isLast = false;
				}
		    }
		});
    }
//15***************添加水印图****************
    /*
	 * 给图片加水印
	 * 函数说明
	 * @ src 原图
	 * @ addsrc 水印原图
	 * @ dst 目标图
	 * @ rate 按照原图缩放比例
	 * @ n 水印图距离右侧的距离
    */
    public function mark($src,$addsrc,$dst,$rate,$n){
	$srcimg = new Imagick($src);
    $addsrc = new Imagick($addsrc);
   
    //计算原图片的宽高
    $geo = $srcimg->getImageGeometry();
    $src_w = $geo['width'];
    $src_h = $geo['height'];
    
    //计算水印原图的宽高
    $geo1 =  $addsrc->getImageGeometry();
    $add_w = $geo1['width'];
    $add_h = $geo1['height'];
    
    //计算水印图的宽高
	$thumb_x = intval($rate*$src_w-$n);
    $thumb_y = intval(($rate*$src_w-$n)*$add_h/$add_w);
   
    if($thumb_x<$src_w && $thumb_y<$src_h){
      $clone = $addsrc->clone();
      //生成要加的水印图
      $clone->scaleImage($thumb_x,$thumb_y);
    } 
    
    //计算出距离左上角的宽，高
    $w = intval($src_w-$thumb_x - $n);
    $h = intval(0.5*($src_h-$thumb_y));
    //加水印
    $srcimg->compositeImage($clone,$clone->getImageCompose(), $w, $h);
    $srcimg->writeImage($dst);
  }
 //16***************将文章中的<br />标签替换成<p>标签****************
        $blogart['message'] = explode("<br />",$blogart['message']);
        $data = '';
		foreach ($blogart['message'] as $v)
		{
			if($v=='')
				continue;
			$data .="<p>".$v."</p>";
				
		}
	 //（2）.利用正则替换，但是第一行替换不成功。
	$blogart['message'] = preg_replace('/<br \/>(.*?)<br \/>/','<p>$1<p>',$blogart['message']);
 //17***************定时让一张长图在div中依次向上显示。****************
	    <body>
		 <div style="width:117px;height:100px;border:1px solid black;overflow:hidden;position:absolute">
			<img src="./shouye.jpg" style="position:absolute;top:0px;"/>
		 </div>
	    </body>
		<script>
			$(function(){
				load();
				function load(){
					var height=parseFloat($("img").css("height"));
					var top=parseFloat($("img").css("top"));
					top-=100;
					if(Math.abs(top)>=height)
						top=0;
					$("img").css("top",top);
					
						setTimeout(load,1000);
					}
			});
		</script>
//18***************js中通过类名获得节点****************
function getClass(tagName,className) //获得标签名为tagName,类名className的元素
{
     if(document.getElementsByClassName) //支持这个函数
    {        return document.getElementsByClassName(className);
     }
     else
    {    var tags=document.getElementsByTagName(tagName);//获取标签
         var tagArr=[];//用于返回类名为className的元素
        for(var i=0;i < tags.length; i++)
        {
            if(tags[i].class == className)
             {
                tagArr[tagArr.length] = tags[i];//保存满足条件的元素
            }
        }
        return tagArr;
    }

 }
 //19***************getJSON跨域请求****************
 $.getJSON(site+"/do.php?do=sjtodayhead&inajax=ajax&ac=listHead&number=0&jsoncallback=?",function(v){
		    $("#content").html(v.data);
		}
);
  // 请求位置对返回内容的处理
   $callback = $_GET['jsoncallback'];
   $str = json_encode($html);
   echo $callback."({data:$str})";
//19***************ajax请求案例****************
  $.ajax({
	  url:"http://fxtiyu.com/do.php?do=comment&inajax=ajax&ac=listComment",
	  type:"post",
	  data:"artid="+artid+"&categoryid="+categoryid,
	  success:function(v){
		  
		  $('#comm').html(v);
	  }
  });
//20***************原生ajax实现查看更多功能****************
	<script type="text/javascript">
	window.onload = function(){
		document.getElementById("number").setAttribute("value",16);
		var oDiv = document.getElementById("gengduo");//获得gengduo节点
		if(total < 16)
		   oDiv.setAttribute("style","display:none");
	}

	function parseDom(arg) //将字符串转换成dom对象
	{
		  var objN = document.createElement("div");
		  objN.innerHTML = arg;
		  return objN.childNodes;
	}
	function loadmore() //加载更多
	{
		
		 var xmlHttp;//生成ajax对象
		 try
			{
		   // Firefox, Opera 8.0+, Safari
			xmlHttp=new XMLHttpRequest();
			}
		 catch (e)
		  {
		  // Internet Explorer
		   try
			  {
			  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
			  }
			   catch (e)
			{
			  try
				 {
				 xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
				 }
			  catch (e)
				 {
				 alert("您的浏览器不支持AJAX！");
				 return false;
				 }
			  }
		  }
		  
		var num = document.getElementById("number").value;
		var num2 = Number(num)+Number(15);
		
		xmlHttp.open('get',wapurl+"/do.php?inajax=1&do=touch&ac=getnextarticle&number="+num+"&vtype=touch&categoryid="+categoryid);
		xmlHttp.send(null);
		xmlHttp.onreadystatechange = function(){
			if(xmlHttp.readyState == 4){
				  var jn = xmlHttp.responseText;
				  eval("var jnobj ="+jn);
				  
				  var list1 = '<div class="list_fx"><ul>';
				  var list2 = '<div class="list_fx"><ul>';
				  for(var k in jnobj.list){
					  if(k >=0 && k<8)
						 list1 += '<li><a href="'+wapurl+'/view/'+jnobj.list[k].artid+'">'+jnobj.list[k].subject+'</a></li>';
				  }
				  for(var k in jnobj.list){
					  if(k >=8 && k<jnobj.list.length)
						 list2 += '<li><a href="'+wapurl+'/view/'+jnobj.list[k].artid+'">'+jnobj.list[k].subject+'</a></li>';
				  }
				  list1 += '</ul></div>';
				  list2 += '</ul></div>';
				  
				  var oDiv = document.getElementById("gengduo");//获得gengduo节点
				  var oBody = document.getElementsByTagName('body')[0];//获得body节点
				  var oList1 = parseDom(list1); //将list1转成dom节点，返回列表
				  var oList2 = parseDom(list2);// 将list2转成dom节点，返回列表
				  
				  oBody.insertBefore(oList1[0],oDiv);
				  oBody.insertBefore(oList2[0],oDiv);
				  
				  document.getElementById("number").value = num2;
				  if(jnobj.num < 16) 
				  {
					  oDiv.setAttribute("style","display:none");
				  }
			}
		}
	}
//21***************飞翔体育wap端图片正文页图片滑动实现****************
<script type="text/javascript">
    var oBody = document.getElementsByTagName('body')[0];//获得body节点
    var maxwidth = document.defaultView.getComputedStyle(oBody, null).width;
    maxwidth = parseFloat(maxwidth);
    if(maxwidth>980) 
           maxwidth = "980px"; 
    else
           maxwidth = maxwidth+"px";
    var oMain = document.getElementById("main_img");
    oMain.style.width = maxwidth;
       
window.onload=function()
{
    imgSlideInit('main_img');
}
/**
图片滑动
*/
function imgSlideInit(sId){
    var oSlider = document.getElementById(sId),
	    introID = document.getElementById('jieshuo'),
        oImg    = oSlider.getElementsByTagName('img'),
        oP      = introID.getElementsByTagName('p');
        oSpan   = document.getElementById('imgTotal'),
        len = oImg.length;
        oImg[0].style.width = maxwidth;
        var list1= '(<b>1</b>/'+len+')'; 
        oSpan.innerHTML = list1;
   
        for(var i=0;i < oP.length;i++)//遍历oP对象,只第一个p标签显示
		    {
		    	if(i != 0)
                   oP[i].setAttribute("style","display:none");
                else
                   oP[i].setAttribute("style","");
                  
		 }
		 
    id = new Swipe(document.getElementById(sId), {
        startSlide: 0, //起始图片切换的索引位置
        auto: 0,  //设置自动切换时间，单位毫秒
        speed: 400,
        callback: function(event, index, elem){
        	//回调函数，切换时触发
        	var list2 = '(<b>'+(index+1)+'</b>/'+len+')'; 
		    oSpan.innerHTML = list2;
		    
		    for(var i=0;i < oP.length;i++)//遍历oP对象,只显示当前的p标签
		    {
		    	if(i != index)
                   oP[i].setAttribute("style","display:none");
                else
                   oP[i].setAttribute("style","");
                  
		    }
		    //生成图片对象
		    var pic = new Image();
		    pic.src = oImg[index].getAttribute("imgsrc");

		    pic.onload=function(){
		       	    src=pic.src;
		       	    var oBody = document.getElementsByTagName('body')[0];//获得body节点
				    var maxwidth = document.defaultView.getComputedStyle(oBody, null).width;
				    maxwidth = parseFloat(maxwidth);
				    if(maxwidth>980) 
				          maxwidth = "980px"; 
				    else
                          maxwidth = maxwidth+"px";
		       	    oImg[index].setAttribute("src",src);
		       	    oImg[index].style.width = maxwidth;
		       	    oTag  =  oSlider.getElementsByTagName('a');
		       	    oTag[index].style.verticalAlign = "top";
		       	    oMain.style.height = oImg[index].height+"px";
		    };
        }  
    });
}		
</script>
//22***************将字符串转成dom对象****************
function parseDom(arg) //将字符串转换成dom对象
{
	  var objN = document.createElement("div");
	  objN.innerHTML = arg;
	  return objN.childNodes;
}
//23***************对图组图片显示高度的控制****************
//js方式
var maxwidth = document.defaultView.getComputedStyle(oBody, null).width;
maxwidth = parseFloat(maxwidth);
if(maxwidth>=640){
	picmaxheight = "300px";
}else{
	picmaxheight = "150px";
}
var oMain = document.getElementsByClassName('imgwidth');
var length = oMain.length;
for(var i=0;i<length;i++){
	document.getElementsByClassName('imgwidth')[i].style.height = picmaxheight;
}
//jquery方式
var maxwidth = $(document.body).width();
if(maxwidth>=640){
	picmaxheight = "300";
}else{
	picmaxheight = "150";
}
var length = $(".imgwidth").length;
for(var i=0;i<length;i++){
	$(".imgwidth")[i].height = picmaxheight;
}
//24***************对文章正文页图片显示宽度的控制****************
var oBody = document.getElementsByTagName('body')[0];//获得body节点
var maxwidth = document.defaultView.getComputedStyle(oBody, null).width;
maxwidth = parseFloat(maxwidth);
if(maxwidth>=640){
	maxwidth = "640px";
	maxheight = "300px";
}else{
	maxwidth = "250px";
	maxheight = "95px";
}

var oMain = document.getElementsByClassName('zhengwen')[0].getElementsByTagName("img");
var length = oMain.length;
for(var i=0;i<length;i++){
	document.getElementsByClassName('zhengwen')[0].getElementsByTagName("img")[i].style.width=maxwidth;
}
//25***************关于显示多少时间前的两种形式****************
    //第一种
    $hour = date('H',time()-$v['pubdate']);
	$min  = date('i',time()-$v['pubdate']);
	if($v['pubdate'] > strtotime("-1 day")){
		if($v['pubdate'] > strtotime("-1 hour")){
			$newsarray['milhot751'][$k]['pubdate'] = $min.'分钟前';
		}else{
			$newsarray['milhot751'][$k]['pubdate'] = $hour.'小时前';
		}
	}else{
		$newsarray['milhot751'][$k]['pubdate'] = date('m月d日',$newsarray['milhot751'][$k]['pubdate']);
	}
	//第二种
	//时间格式化(别人写的)
	function sgmdate($dateformat, $timestamp='', $format=0) {
		global $_IGLOBAL;
		if(empty($timestamp)) {
			$timestamp = $_IGLOBAL['timestamp'];
		}
		$result = '';
		if($format) {
			$time = $_IGLOBAL['timestamp'] - $timestamp;
			if($time > 24*3600) {
				$result = gmdate($dateformat, $timestamp);
			} elseif ($time > 3600) {
				$result = intval($time/3600).'小时前';
			} elseif ($time > 60) {
				$result = intval($time/60).'分钟前';
			} elseif ($time > 0) {
				$result = $time.'秒前';
			} else {
				$result = '现在';
			}
		} else {
			$result = gmdate($dateformat, $timestamp);
		}
		return $result;
	}
//25***************对文章正文页的内容进行分段出来****************
//情况一：
$blogart['message'] = explode("<br />",$blogart['message']);
$data = '';
foreach ($blogart['message'] as $v)
{
	if($v=='')
		continue;
	$data .="<p>".$v."</p>";
		
}
$blogart['message'] = $data;
//情况二：
$artarr['message'] = explode("\n",$artarr['message']);
$data = '';
foreach ($artarr['message'] as $k => $v)
{
	if( $k%2 == 0)
	   $data .= "<p>".$v."</p>";	
}
$artarr['message'] = $data;
