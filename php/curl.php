<?php
require 'common.fun.php';
//初始化
$curlobj=curl_init('http://www.baidu.com');//初始化culr
$curlobj = curl_init();			
curl_setopt($curlobj, CURLOPT_URL, "http://www.baidu.com");// 初始化，两种
//相关常用的option
curl_setopt($curlobj, CURLOPT_RETURNTRANSFER, true);	// 执行之后不直接打印出来，否则会直接输出
$output=curl_exec($curlobj);// 执行
// 如果模拟cookie登录 要先设置cookie
date_default_timezone_set('PRC'); // 使用Cookie时，必须先设置时区
curl_setopt($curlobj, CURLOPT_COOKIESESSION, 1); 
curl_setopt($curlobj, CURLOPT_HEADER, 0); 
curl_setopt($curlobj, CURLOPT_FOLLOWLOCATION, 1); // 支持页面链接跳转  这个设置必须关闭安全模式 
//以及关闭open_basedir，金额贝尔不过对服务器安全不利
//将数据post
$postdata='username=buzzmjx@126.com&password=123456';
curl_setopt($curlobj, CURLOPT_POST, 1);  //允许post
curl_setopt($curlobj, CURLOPT_POSTFIELDS, $postdata);  //post 数据
curl_setopt($curlobj, CURLOPT_HTTPHEADER, array("application/x-www-form-urlencoded; charset=utf-8",
 "Content-length: ".strlen($postdata))); 
//从ftp下载
curl_setopt($curlobj, CURLOPT_TIMEOUT, 300); // times out after 300s
curl_setopt($curlobj, CURLOPT_USERPWD, "buzzmjx:123456");//FTP用户名：密码
$outfile = fopen('dest.txt', 'wb');//保存到本地的文件名
curl_setopt($curlobj, CURLOPT_FILE, $outfile);
//上传ftp
$fp = fopen('test.php', 'r');
curl_setopt($curlobj, CURLOPT_UPLOAD, 1);
curl_setopt($curlobj, CURLOPT_INFILE, $fp);
curl_setopt($curlobj, CURLOPT_INFILESIZE, filesize($localfile));
$rtn = curl_exec($curlobj);  
 
// 设置HTTPS支持
date_default_timezone_set('PRC'); // 使用Cookie时，必须先设置时区
curl_setopt($curlobj, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查从证书中检查
//SSL加密算法是否存在
curl_setopt($curlobj, CURLOPT_SSL_VERIFYHOST, 2); // 
//webservice
curl_setopt($curlobj, CURLOPT_POSTFIELDS, $data); //data为soapxml 
curl_setopt($curlobj, CURLOPT_HTTPHEADER, array("Content-Type: application/soap+xml; charset=utf-8", 
	"Content-length: ".strlen($data),
"SOAPAction:\"http://WebXml.com.cn/getWeatherbyCityName\"")); 
//关闭
curl_close($curlobj);