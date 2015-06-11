<?php
echo error_reporting();
echo '<hr/>';
//显示所有的错误
error_reporting(E_ALL&~E_NOTICE);
//屏蔽错误,屏蔽不掉解析错误
error_reporting(0);
//显示错误
error_reporting(-1);
echo '<hr/>';
//int_set():运行时设置配置选项的值
ini_set('error_reporting',0);
ini_set('error_reporting',-1);
ini_set('display_errors',0);
echo $test;
echo '<hr/>';
settype($var,'king');
echo '<hr/>';
imooc();