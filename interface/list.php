<?php
//http://app.com/list.php?page=1&pagesize=12
require_once("./response.php");
require_once("./db.php");
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$pageSize = isset($_GET['pagesize']) ? $_GET['pagesize'] : 1;
if(!is_numeric($page) || !is_numeric($pageSize)) {
	return Response::show(401,'数据不合法');
}
$offset = ($page-1)*$pageSize;
$sql = "select * from video where status = 1 order by orderby desc limit ".$offset.",".$pageSize;
$cache = new File();
try {
	$connect = Db::getInstance()->connect();
}catch(Exception $e) {
	//$e->getMessage();(调试模式使用)
	return Response::show(403,'数据库链接失败');
}
$result = mysql_query($sql,$connect);

$videos = array();
while($video = mysql_fetch_assoc($result)) {
	$videos[] = $video;
}
if($videos) {
	return Response::show(200,'首页数据获取成功',$videos);
}else {
	return Response::show(400,'首页数据获取失败');
}