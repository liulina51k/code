<?php
//1.*******************������ҳ**************
$perpage = 1;
$pagecount = $res['num'];
$totalpage = ceil($pagecount/$perpage);
					
$curpage = empty ( $curpage ) ? 1 : intval($curpage);
					
$start = ($curpage-1) * $perpage;
					
$prepage = ($curpage-1)>0 ? $curpage-1 : 1;
$nextpage = ($curpage+1)<=$totalpage ? $curpage+1 : $totalpage;
//2.******************ͼƬ�������󣬻��һ���********
function right_xiang(){
      $(".pic_tu_nr").children().slice(0,5).hide();
      $(".pic_tu_nr").children().slice(5,10).show();
}
  
function left_xiang(){
  $(".pic_tu_nr").children().slice(5,10).hide();
  $(".pic_tu_nr").children().slice(0,5).show();
}
//3.****************�ٲ��������ʽ******************
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
//4.******************�ٲ��������¼�***********************
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
	    m = $(this).index() //ȡ�õ�ǰ�����
		$(this).children("a").addClass("current01") // ��������tab��ɵ�ǰ״̬
		$(this).siblings().children("a").removeClass("current01") // ����tab��ɷǵ�ǰ״̬
        $($(".pic_01")[m]).show()  //��ʾ��ǰtab��Ӧ��div		
		$($(".pic_01")[m]).siblings("div").hide()//��������div
		
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

//5.******************����ÿ��ķ�����*********************
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
//6.*****************�Ե�ѡ���ֵ�����޸�********************
 if($(this).attr("type") == "radio"){
	  $(this).each(function(i){
             if($(this).attr("checked"))
             paramArray[$(this).attr("name")] = $(this).val();   
	  });
 }else{
             paramArray[$(this).attr("name")] = $(this).val();
 }
 //7.***************�����ݿ�ȡ�����ݵĴ���*******************
 while($value = $db->fetch_array($query)){
			$value['artid'] = !empty($value['modelid']) ? $value['artid'].$value['modelid'] : $value['artid'].$modelid;   
			$key = date('m��d��',$value['pubdate']);
			
			$artlist[$key][]= array(
			          'pubdate'=>date('h:i',$value['pubdate']),
			          'url'=>$value['url'],
			          'subject'=>$value['subject']
			                        
			);
			
}
//8.***************ͨ��������ʵ�ֵĲ鿴���๦��*******************
$(document).ready(function(){
	$('#number').attr('value',15);
});
//�鿴����
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
//9.***************������ť����ʾ������*******************
function navi(){
	
    if($(".tuan_nav").attr("style"))
	     $(".tuan_nav").removeAttr("style");
	else
	     $(".tuan_nav").attr("style","display:none;");
}
//10.***************��ǩ�л����ܵ�ʵ��*******************
$(function(){
	$(".bar_nav li").click(function(){
		m = $(this).index() //ȡ�õ�ǰ�����
		$(this).addClass("on") // ��������tab��ɵ�ǰ״̬
		$(this).siblings().removeClass("on") // ����tab��ɷǵ�ǰ״̬
		$($(".nav_content_item")[m]).show(); //��ʾ��ǰtab��Ӧ��div	
		$($(".nav_content_item")[m]).siblings("div").hide();//��������div
	});
});
//11.***************���б�ǩ�л��鿴���๦�ܵ�ʵ��*******************
var m=0;
$(function(){
	$(".bar_nav li").click(function(){
		m = $(this).index() //ȡ�õ�ǰ�����
		$(this).addClass("on") // ��������tab��ɵ�ǰ״̬
		$(this).siblings().removeClass("on") // ����tab��ɷǵ�ǰ״̬
		$($(".nav_content_item")[m]).show(); //��ʾ��ǰtab��Ӧ��div	
		$($(".nav_content_item")[m]).siblings("div").hide();//��������div
		$($(".nav_content_item")[m]).attr("style","width: 1885px; display: table-cell; vertical-align: top;");
		
	});
});
$(document).ready(function(){
	$('#number').attr('value',3);
});
//�鿴����
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
//12.***************���·�ҳ��ʵ��************
$(document).ready(function(){
	$('#number').attr('value',0);
});

//��һҳ
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
//��һҳ
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
��һ�ַ�ʽ�����������в�ͬ��
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
//13.***************js���ύ******************
document.getElementById("myform").submit();
//14.***************����js�е�Swipe��ʵ�ֵ��ֻ���ͼƬ����****************
$(function(){
	    imgSlideInit('#main_img');
	    //$("#down").attr('href',firstimgurl);
	});
	
	//ͼƬ����
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
		    startSlide: 0,//��ʼͼƬ�л�������λ��
		    auto: 0,      //�����Զ��л�ʱ�䣬��λ����
		    speed: 400,
		    callback: function(event, index, elem){
		    	//�ص��������л�ʱ����
		    	//$("#down").attr('href',elem);
		    	list2 = '('+(index+1)+'/'+(len+1)+')';
		        $("#imgTotal").html(list2);
		        introID.find('p').eq(index).show().siblings().hide();
		        
				//ͼƬԤ����
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
//15***************���ˮӡͼ****************
    /*
	 * ��ͼƬ��ˮӡ
	 * ����˵��
	 * @ src ԭͼ
	 * @ addsrc ˮӡԭͼ
	 * @ dst Ŀ��ͼ
	 * @ rate ����ԭͼ���ű���
	 * @ n ˮӡͼ�����Ҳ�ľ���
    */
    public function mark($src,$addsrc,$dst,$rate,$n){
	$srcimg = new Imagick($src);
    $addsrc = new Imagick($addsrc);
   
    //����ԭͼƬ�Ŀ��
    $geo = $srcimg->getImageGeometry();
    $src_w = $geo['width'];
    $src_h = $geo['height'];
    
    //����ˮӡԭͼ�Ŀ��
    $geo1 =  $addsrc->getImageGeometry();
    $add_w = $geo1['width'];
    $add_h = $geo1['height'];
    
    //����ˮӡͼ�Ŀ��
	$thumb_x = intval($rate*$src_w-$n);
    $thumb_y = intval(($rate*$src_w-$n)*$add_h/$add_w);
   
    if($thumb_x<$src_w && $thumb_y<$src_h){
      $clone = $addsrc->clone();
      //����Ҫ�ӵ�ˮӡͼ
      $clone->scaleImage($thumb_x,$thumb_y);
    } 
    
    //������������ϽǵĿ���
    $w = intval($src_w-$thumb_x - $n);
    $h = intval(0.5*($src_h-$thumb_y));
    //��ˮӡ
    $srcimg->compositeImage($clone,$clone->getImageCompose(), $w, $h);
    $srcimg->writeImage($dst);
  }
 //16***************�������е�<br />��ǩ�滻��<p>��ǩ****************
        $blogart['message'] = explode("<br />",$blogart['message']);
        $data = '';
		foreach ($blogart['message'] as $v)
		{
			if($v=='')
				continue;
			$data .="<p>".$v."</p>";
				
		}
	 //��2��.���������滻�����ǵ�һ���滻���ɹ���
	$blogart['message'] = preg_replace('/<br \/>(.*?)<br \/>/','<p>$1<p>',$blogart['message']);
 //17***************��ʱ��һ�ų�ͼ��div������������ʾ��****************
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
//18***************js��ͨ��������ýڵ�****************
function getClass(tagName,className) //��ñ�ǩ��ΪtagName,����className��Ԫ��
{
     if(document.getElementsByClassName) //֧���������
    {        return document.getElementsByClassName(className);
     }
     else
    {    var tags=document.getElementsByTagName(tagName);//��ȡ��ǩ
         var tagArr=[];//���ڷ�������ΪclassName��Ԫ��
        for(var i=0;i < tags.length; i++)
        {
            if(tags[i].class == className)
             {
                tagArr[tagArr.length] = tags[i];//��������������Ԫ��
            }
        }
        return tagArr;
    }

 }
 //19***************getJSON��������****************
 $.getJSON(site+"/do.php?do=sjtodayhead&inajax=ajax&ac=listHead&number=0&jsoncallback=?",function(v){
		    $("#content").html(v.data);
		}
);
  // ����λ�öԷ������ݵĴ���
   $callback = $_GET['jsoncallback'];
   $str = json_encode($html);
   echo $callback."({data:$str})";
//19***************ajax������****************
  $.ajax({
	  url:"http://fxtiyu.com/do.php?do=comment&inajax=ajax&ac=listComment",
	  type:"post",
	  data:"artid="+artid+"&categoryid="+categoryid,
	  success:function(v){
		  
		  $('#comm').html(v);
	  }
  });
//20***************ԭ��ajaxʵ�ֲ鿴���๦��****************
	<script type="text/javascript">
	window.onload = function(){
		document.getElementById("number").setAttribute("value",16);
		var oDiv = document.getElementById("gengduo");//���gengduo�ڵ�
		if(total < 16)
		   oDiv.setAttribute("style","display:none");
	}

	function parseDom(arg) //���ַ���ת����dom����
	{
		  var objN = document.createElement("div");
		  objN.innerHTML = arg;
		  return objN.childNodes;
	}
	function loadmore() //���ظ���
	{
		
		 var xmlHttp;//����ajax����
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
				 alert("�����������֧��AJAX��");
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
				  
				  var oDiv = document.getElementById("gengduo");//���gengduo�ڵ�
				  var oBody = document.getElementsByTagName('body')[0];//���body�ڵ�
				  var oList1 = parseDom(list1); //��list1ת��dom�ڵ㣬�����б�
				  var oList2 = parseDom(list2);// ��list2ת��dom�ڵ㣬�����б�
				  
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
//21***************��������wap��ͼƬ����ҳͼƬ����ʵ��****************
<script type="text/javascript">
    var oBody = document.getElementsByTagName('body')[0];//���body�ڵ�
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
ͼƬ����
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
   
        for(var i=0;i < oP.length;i++)//����oP����,ֻ��һ��p��ǩ��ʾ
		    {
		    	if(i != 0)
                   oP[i].setAttribute("style","display:none");
                else
                   oP[i].setAttribute("style","");
                  
		 }
		 
    id = new Swipe(document.getElementById(sId), {
        startSlide: 0, //��ʼͼƬ�л�������λ��
        auto: 0,  //�����Զ��л�ʱ�䣬��λ����
        speed: 400,
        callback: function(event, index, elem){
        	//�ص��������л�ʱ����
        	var list2 = '(<b>'+(index+1)+'</b>/'+len+')'; 
		    oSpan.innerHTML = list2;
		    
		    for(var i=0;i < oP.length;i++)//����oP����,ֻ��ʾ��ǰ��p��ǩ
		    {
		    	if(i != index)
                   oP[i].setAttribute("style","display:none");
                else
                   oP[i].setAttribute("style","");
                  
		    }
		    //����ͼƬ����
		    var pic = new Image();
		    pic.src = oImg[index].getAttribute("imgsrc");

		    pic.onload=function(){
		       	    src=pic.src;
		       	    var oBody = document.getElementsByTagName('body')[0];//���body�ڵ�
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
//22***************���ַ���ת��dom����****************
function parseDom(arg) //���ַ���ת����dom����
{
	  var objN = document.createElement("div");
	  objN.innerHTML = arg;
	  return objN.childNodes;
}
//23***************��ͼ��ͼƬ��ʾ�߶ȵĿ���****************
//js��ʽ
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
//jquery��ʽ
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
//24***************����������ҳͼƬ��ʾ��ȵĿ���****************
var oBody = document.getElementsByTagName('body')[0];//���body�ڵ�
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
//25***************������ʾ����ʱ��ǰ��������ʽ****************
    //��һ��
    $hour = date('H',time()-$v['pubdate']);
	$min  = date('i',time()-$v['pubdate']);
	if($v['pubdate'] > strtotime("-1 day")){
		if($v['pubdate'] > strtotime("-1 hour")){
			$newsarray['milhot751'][$k]['pubdate'] = $min.'����ǰ';
		}else{
			$newsarray['milhot751'][$k]['pubdate'] = $hour.'Сʱǰ';
		}
	}else{
		$newsarray['milhot751'][$k]['pubdate'] = date('m��d��',$newsarray['milhot751'][$k]['pubdate']);
	}
	//�ڶ���
	//ʱ���ʽ��(����д��)
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
				$result = intval($time/3600).'Сʱǰ';
			} elseif ($time > 60) {
				$result = intval($time/60).'����ǰ';
			} elseif ($time > 0) {
				$result = $time.'��ǰ';
			} else {
				$result = '����';
			}
		} else {
			$result = gmdate($dateformat, $timestamp);
		}
		return $result;
	}
//25***************����������ҳ�����ݽ��зֶγ���****************
//���һ��
$blogart['message'] = explode("<br />",$blogart['message']);
$data = '';
foreach ($blogart['message'] as $v)
{
	if($v=='')
		continue;
	$data .="<p>".$v."</p>";
		
}
$blogart['message'] = $data;
//�������
$artarr['message'] = explode("\n",$artarr['message']);
$data = '';
foreach ($artarr['message'] as $k => $v)
{
	if( $k%2 == 0)
	   $data .= "<p>".$v."</p>";	
}
$artarr['message'] = $data;
