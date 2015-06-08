<?php

//让crontab定时执行的脚步程序 */5 * * * * /user/bin/php /data/www/app/cron.php

//想获取video中6条数据

require_once("./db.php");
require_once("./file.php");
$sql = "select * from video where status = 1 order by orderby desc";
try {
	$connect = Db::getInstance()->connect();
}catch(Exception $e) {
	//$e->getMessage();(调试模式使用)
	file_put_contents('./logs/'.date('y-m-d').'txt',$e->getMessage());
	return;
}
$result = mysql_query($sql,$connect);
$videos = array();
while($video = mysql_fetch_assoc($result)) {
	$videos[] = $video;
}
$file = new File();
if($videos) {
	$file -> cacheData('index_cron_cache',$videos);
}else {
	file_put_contents('./logs/'.date('y-m-d').'txt','没有相关数据');
	return;
}
return;