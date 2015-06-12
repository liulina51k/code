/**********************************************************
************
************Author: bowen
************
**********************************************************/

var ua = navigator.userAgent.toLowerCase();
var browserInfo = {
    ie:/msie/.test(ua)&& !(/opera/.test(ua)),
    op:/opera/.test(ua),
    sa:/version.*safari/.test(ua),
    ch:/chrome/.test(ua),
    ff:/gecko/.test(ua)
};

var logDisabled = false;

document.createElement("section");

$ = function(selector){
	var classExg = /^\.[a-zA-Z]+[a-zA-Z_0-9-]*$/;
	var roleExg = /^%[a-zA-Z]+[a-zA-Z_0-9-]*$/;
	var idExg = /^#[a-zA-Z]+[a-zA-Z_0-9-]*$/;
	var nameExg = /^@[a-zA-Z]+[a-zA-Z_0-9-]*$/;
	var tagExg = /^[a-zA-Z]/;

	if(classExg.test(selector)){
		var localSelector = selector.substring(1);
		return getElementsByClassName(localSelector);
	}else if(roleExg.test(selector)){
		var localSelector = selector.substring(1);
		return getElementsByRole(localSelector);
	}else if(idExg.test(selector)){
		var localSelector = selector.substring(1);
		return document.getElementById(localSelector);
	}else if(nameExg.test(selector)){
		var localSelector = selector.substring(1);
		return document.getElementsByName(localSelector);
	}else if(tagExg.test(selector)){
		return document.getElementsByTagName(selector);
	}
}

function hasClass(ele,className){
	if(!ele){
		return false;
	}
	if(ele.className && typeof ele.className == "string"){
		return ele.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
	}else{
		return false;
	}
}

function addClass(ele,className){
	if(!ele){
		return false;
	}
	if(!hasClass(ele,className)){
		ele.className += " "+className;
		return true;
	}else return false;	
}

function removeClass(ele,className){
	if(!ele){
		return false;
	}
	if(hasClass(ele,className)){
		ele.className = ele.className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
		return true;
	}else{
		return false;
	}
}

function getElementsByRole(role){
	var eleAll = document.all?document.all:document.getElementsByTagName("*");
	var result = new Array();
	var index = 0;

	for(var i=0;i<eleAll.length;i++){
		if(role==getRole(eleAll[i])){
			result[index] = eleAll[i];
			index++;
		}
	}
	return result;
}

function getElementsByClassName(className){
	var eleAll = document.all?document.all:document.getElementsByTagName("*");
	var result = new Array();
	var index = 0;

	for(var i=0;i<eleAll.length;i++){
		//if(className == eleAll[i].className){
		if(hasClass(eleAll[i],className)){
			result[index] = eleAll[i];
			index++;
		}
	}

	return result;
}

function setRole(el,role){
	if(browerInfo.ie==true){
		el["data-role"] = role;
	}else{
		el.setAttribute("data-role");
	}
}

function getRole(el){
	if(browserInfo.ie == true){
		return el["data-role"];
	}else{
		return el.getAttribute("data-role");
	}
}


function maxValue(x,y){
	return x>y?x:y;
}


function maxNegativeValue(x,y){
	x = x<0?0:x;
	y = y<0?0:y;
	return x>y?x:y;
}

function minNegativeValue(x,y){
	x = x<0?0:x;
	y = y<0?0:y;
	return x<y?x:y;
}

function wholePageOffsetTop(toScroll,height){
	height = height||document.body.clientHeight;
	height = Math.round(height);
	toScroll = Math.round(toScroll);

	if(toScroll%height < 5){
		return Math.round(toScroll/height)*height;
	}

	if(toScroll%height == height -5){
		return Math.round(toScroll/height)*height;
	}

	return toScroll;
}

/*
function addEvent(fn,evtype,obj){
	var oldFn;
	if(obj[evtype] instanceof Function){
		oldFn = obj[evtype];
	}

	obj[evtype]=function(){
		if(oldFn){
			oldFn.call(this);
		}
		fn.call(this);
	};
}
*/

eventHandlesCounter = 1;
function addEvent(fn,evtype,obj){
	if(!obj){
		return;
	}

	if(!fn._EventID){
		fn._EventID = eventHandlesCounter++;
	}

	if(!obj._EventHandles){
		obj._EventHandles = [];
	}

	if(!obj._EventHandles[evtype]){
		obj._EventHandles[evtype]={};
		if(obj['on'+evtype] instanceof Function){
			obj._EventHandles[evtype][0] = obj['on'+evtype];
		}
		obj['on'+evtype] = handleEvents;
	}

	obj._EventHandles[evtype][fn._EventID] = fn;
	var aa = obj['on'+evtype];

	function handleEvents(){
		var fns = obj._EventHandles[evtype];
		for(var i in fns){
			fns[i].call(this);
		}
	}

}

function delEvent(fn,evtype,obj){
	if(!obj._EventHandles || !obj._EventHandles[evtype] || fn._EventID){
		return false;
	}

	if(obj._EventHandles[evtype][fn._EventID]==fn){
		delete obj._EventHandles[evtype][fn._EventID];
	}
}


function getQueryParams(qs) {
	qs = qs.split("+").join(" ");

	var params = {}, tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
};

function addPostParam(sParams, sParamName, sParamValue){
	if(!(sParamName && sParamValue && sParamName.length == sParamValue.length)){
		return encodeURIComponent("参数错误");
	}
	for(var i=0;i<sParamName;i++){
		if(sParams.length>0){sParams += "&"};
		sParams += encodeURIComponent(sParamName) + "=" + encodeURIComponent(sParamName);
	}
    return sParams;
}

function jsonToPostParam(jsonObj){
	if(!jsonObj||jsonObj.count<1){
		return "";
	}
	console.log(jsonObj);
	var sParams = "";
	for(var i in jsonObj){
		if(sParams.length>0){
			sParams += "&";
		}
		sParams += encodeURIComponent(i)+"="+encodeURIComponent(json2str(jsonObj[i]));
	}

	console.log(sParams);

	return sParams;
}

function json2str(o) { 
	var arr = []; 
	var fmt = function(s) { 
	if (typeof s == 'object' && s != null) return json2str(s); 
	return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s; 
	} 
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i])); 
	return '{' + arr.join(',') + '}'; 
} 

function readLocalStorage(ele){
	return localStorage[ele];
}

function setLocalStorage(ele,value){
	localStorage[ele] = value;
}

function logLocalStorage(){
	console.log(localStorage);
}

function selfLog(obj){
	if(!logDisabled){
		console.log(obj);
	}
}

/***********************************************************************************************
GET请求的模板，其中async为是否同步的标识：async为true时为异步请求，即ajax请求；async为false时为
同步请求，fnSucc为成功时的回调，fnFailed为失败时的回调
***********************************************************************************************/
function ajaxGET(url,async,fnSucc, fnFailed){
	var oAjax = null;

	if(window.XMLHttpRequest){
		oAjax = new XMLHttpRequest();
	}else{
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	oAjax.open('GET',url,async);

	oAjax.send();


	if(!async){
		fnSucc(oAjax.responseText);
	}else{
		oAjax.onreadystatechange = function(){
			if(oAjax.readyState == 4){
				if(oAjax.status == 200){
					fnSucc(oAjax.responseText);
				}else{
					if(fnFailed){
						fnFailed();
					}
				}
			}
		}
	}
}
/***********************************************************************************************
POST请求的模板，其中data为是post请求数据，当前统一设定为同步请求，fnSucc为成功时的回调，fnFailed为失败时的回调
***********************************************************************************************/

function ajaxPOST(url,data,fnSucc, fnFailed){
	var params = "";
	if(data){
		params = jsonToPostParam(data);
	}

	var oAjax = null;

	if(window.XMLHttpRequest){
		oAjax = new XMLHttpRequest();
	}else{
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	oAjax.open("post",url,false);
	oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	oAjax.send(params);
	oAjax.onreadystatechange = function(){
			if(oAjax.readyState == 4) {  
	         //判断对象状态是否交互成功,如果成功则为200  
	        if(oAjax.status == 200) {  
	            //接收数据,得到服务器输出的纯文本数据  
	            var response = oAjax.responseText;  
	            //得到div的节点将数据显示在div上  
	            fnSucc(response);  
	        }  
	    }
    } 
	var response = oAjax.responseText;  
}

/*************************************************************************************************
扩展canvas，使之可以画虚线。
**********************************************************************************************************/
CanvasRenderingContext2D.prototype.dashLineTo = function (fromX,fromY,toX,toY,pattern){
	var dx = toX - fromX;
	var dy = toY - fromY;

	if(typeof pattern === undefined || pattern == 0){
		pattern = 5;
	}

	var distance = Math.sqrt(dx*dx + dy*dy);
	var dashlineInteval = pattern>0?distance/pattern:distance;
	var deltaX = (dx/distance)*pattern;
	var deltaY = (dy/distance)*pattern;

	this.beginPath();
	for(var step=0;step<dashlineInteval;step++){
		if(step%2){
			this.lineTo(fromX+step*deltaX,fromY+step*deltaY);
		}else{
			this.moveTo(fromX+step*deltaX,fromY+step*deltaY);
		}
	}
	this.stroke();
}

String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}












