<?php
header('Content-Type:text/html;charset=utf8');
/*
error_reporting(-1);
//@抑制错误输出
@settype($var,'king');*/
$num1=1;
$num2='2a';
//判断$num1和$num2是否是合法数值
if(!(is_numeric($num1) && is_numeric($num2))) {
	//trigger_error('num1和num2必须为合法数值',E_USER_NOTICE);//Notice: num1和num2必须为合法数值 in D:\chinaiiss\code\exceptions\test3.php on line 11
	//程序继续向下执行
    //trigger_error('num1和num2必须为合法数值',E_USER_WARNING);//Warning: num1和num2必须为合法数值 in D:\chinaiiss\code\exceptions\test3.php on line 12
    //程序继续向下执行
    trigger_error('num1和num2必须为合法数值',E_USER_ERROR);//Fatal error: num1和num2必须为合法数值 in D:\chinaiiss\code\exceptions\test3.php on line 13
}else {
	echo $num1+$num2;
}
echo '<br/>程序继续向下执行';