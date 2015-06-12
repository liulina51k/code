<?php
header("content-type:text/html;charset=utf8");
/*
 * try{
	代码段
	throw new Exception
  } catch( Exception $e ) {
	echo $e->getMessage();
  } 
 */
  $num=NULL;
  try {
  	$num = 3/0;
  	var_dump($num);
  }catch(Exception $e) {
  	echo $e->getMessage();
  	$num=12;
  }
  echo '<hr/>';
  echo 'continue...';
  var_dump($num);
//Warning: Division by zero in D:\chinaiiss\code\exceptions\testException.php on line 13
//bool(false) 遇到错误，会报错，不会触发异常，须手动触发。
  echo '<hr/>';

  try {
  	$num1 = 3;
  	$num2 = 0;
  	if($num2 == 0) {
  		throw new Exception('o不能当做除数');//必须通过throw手动抛出异常。java中则可以自动抛出异常。
  		echo 'this is a test';//永远不会被执行
  	}else {
  		$res = $num1/$num2;
  	}
  }catch(Exception $e) {
  	echo $e->getMessage();
  	die();
  }
  //o不能当做除数
  echo '<hr/>';
  try {
  	if($username == 'king'){
  		echo 'hello king';
  	}else{
  		throw new Exception('非法管理员');
  	}
  }catch(Exception $e){//没有catch会报错
  	echo $e->getMessage();
  	echo '<hr/>';
  	die();
  }
  echo 'continue...';