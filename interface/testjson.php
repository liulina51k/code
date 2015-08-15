<?php
require_once('./json.php');
$data = array(
	'id' => 1,
	'name' => 'singwa',
	'type' => array(4,5,6),
	'test' => array(1,45,67=>array(123,'tsysa'),),
);
Response::show(200,'数据返回成功',$data);