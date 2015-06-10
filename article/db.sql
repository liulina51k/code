#article表 文章表
CREATE TABLE `article` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '文章编号',
	`title` char(100) NOT NULL COMMENT '文章标题',
	`author` char(50) NOT NULL COMMENT '文章作者',
	`description` varchar(255) NOT NULL COMMENT '文章简介',
	`content` text NOT NULL COMMENT '文章内容',
	`dateline` int(11) NOT NULL COMMENT '发布时间',
	PRIMARY KEY(`id`)
)ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;