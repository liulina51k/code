<?php
header("Content-Type:text/html;charset=utf8");
ini_set('display_errors',0);
ini_set('date.timezone','PRC');
error_reporting(-1);
ini_set('log_errors',1);
ini_set('error_log','D:\chinaiiss\code\exceptions\testError.log');
ini_set('ignore_repeated_errors','on');
ini_set('ignore_repeated_source','on');
$username = $_POST['username'];
$password = $_POST['password'];

if($username=='admin'&&$password=='admin') {
	echo '登陆成功';
}else {
	$date = date("Y-m-d H:i:s",time());
	$ip = $_SERVER['REMOTE_ADDR'];
	$message = "用户：{$username}在{$date}以密码：{$password}尝试登陆系统!IP地址为{$ip}";
 	error_log($message);
 	header('location:login.html');
}