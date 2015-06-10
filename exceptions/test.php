<?php
header("Content-Type:text/html;charset=utf8");
//$username = 'imooc'
//echo $username;
//deprecated级别的错误，最级别的
if(ereg('imooc','this is imooc show time',$matches)) {
	print_r($matches);
}else {
	echo 'nothing found';
}
echo '<hr/>';
echo mysql_escape_string('\' or 1=1 #');
//Notice级别的错误
echo $king;
echo '<hr>';
$userInfo = array('username'=>'king','age'=>12);
echo $userInfo['username'];
echo '<hr/>';
echo $userInfo[age];

//Warning级别的错误
settype($var,'int');
var_dump($var);
settype($var,'king');
echo '<hr/>';
var_dump($var);
echo '<hr/>';
//Parse Error语法解析错误
echo 'this is a test'
echo md6('king');
echo '程序继续向下执行';


