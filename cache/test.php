<?php
require_once('./file.php');
$data = array(
	'id' => 1,
	'name' => 'singwa',
	'type' => array(4,5,6),
	'test' => array(1,45,67=>array(123,'tsysa'),),
);
$file = new File();

if($res = $file->cacheData('index_mk_cache',null)){
	echo 'success';
}else{
	echo 'fail';
}