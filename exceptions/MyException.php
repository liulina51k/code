<?php
header("content-type:text/html;charset=utf8");
class MyException extends Exception {
	public function __construct($message,$code=0){
		parent::__construct($message,$code);
	}
	public function __toString(){
		$message="<h2>出现异常了，信息如下</h2>";
		$message.="<p>".__CLASS__."[{$this->code}]:{$this->message}</p>";
		return $message;
	}
	public function test(){
		echo "this is a test";
	}
	public function stop(){
		exit("script end...");
	}
	//自定义其他方法
}
/*
try{
	echo '出现异常啦';
	throw new MyException('测试自定义异常',2);
}catch(MyException $e){
	echo $e->getMessage();
	echo '<hr/>';
	echo $e;
	echo '<hr/>';
	$e->test();
	echo '<hr/>';
	$e->stop();
}
echo 'continue...';*/
try{
	throw new MyException('测试自定义异常',2);
}catch(Exception $e){
	echo 'aa<br/>';
	echo $e->getMessage();
	$e->test();
	$e->stop();
}catch(MyException $e){
	echo 'bb<br/>';
	echo $e->getMessage();
}
echo '<hr/>';
echo 'continue...';