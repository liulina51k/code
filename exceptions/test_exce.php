<?php
header('content-type:text/html;charset=utf8');
require_once 'Exception_Observer.php';
require_once 'Observable_Exception.php';
require_once 'Logging_Exception_Observer.php';
require_once 'Emailing_Exception_Observer.php';

Observable_Exception::attach(new Logging_Exception_Observer());
Observable_Exception::attach(new Logging_Exception_Observer('testExce.txt'));
Observable_Exception::attach(new Emailing_Exception_Observer());
class MyException extends Observable_Exception{
	public function test(){
		echo 'this is';
	}
	public function test1(){
		echo '我是自定义的方法处理异常';
	}
}
try{
	throw new MyException('出现异常了,记录一下下!!!');
}catch(MyException $e){
	echo $e->getMessage();
	echo '<hr/>';
	$e->test();
	echo '<hr/>';
	$e->test1();
}