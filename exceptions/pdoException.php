<?php
header("content-type:text/html;charset=utf8");
try {
  	$pdo = new Pdo("mysql:host=localhost;dbname=test",'root1','root');
  	var_dump($pdo);
  	echo '<hr/>';
  echo 'continue...';
}catch(PDOException $e){
  	echo $e->getMessage();
}
//SQLSTATE[28000] [1045] Access denied for user 'root1'@'localhost' (using password: YES)this is a test
echo 'this is a test';
echo '<hr/>';
try {
	$splObj = new SPLFileObject('txt.txt','r');
	echo 'read File';
}catch(Exception $e){
  	echo $e->getMessage();
}
echo '<hr/>';
echo 'hello world';
echo '<hr/>';
//SplFileObject::__construct(txt.txt) [splfileobject.--construct]: failed to open stream: No such file or directory hello world
try {
	throw new Exception('测试异常1');
}catch(Exception $e){
  	echo $e->getMessage();
  	echo '<hr/>';
  	try {
  		throw new Exception('测试异常2');
    }catch(Exception $e){
		echo $e->getMessage();
	}
}
echo '<hr/>continue';
