#版本升级信息表
CREATE TABLE `version_upgrade` (
	`id` smallint(4) unsigned NOT NULL AUTO_INCREMENT,
	`app_id` smallint(4) unsigned NOT NULL DEFAULT '0' COMMENT '客户端设备id 1 安卓pad',
	`version_id` smallint(4) unsigned DEFAULT '0' COMMENT '大版本号id',
    `version_mini` mediumint(8) unsigned DEFAULT '0' COMMENT '小版本号',
    `version_code` varchar(10) DEFAULT NULL COMMENT '版本标识1.2',
    `type` tinyint(2) unsigned DEFAULT NULL COMMENT '是否升级 1升级，0不升级，2强制升级'
    `apk_url` varchar(255) DEFAULT NULL,
    `upgrade_point` varchar(255) DEFAULT NULL COMMENT '升级提示',
    `status` tinyint(2) DEFAULT NULL,
    `create_time` int(11) DEFAULT NULL,
    `update_time` int(11) DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB AUTOINCREMENT=1 DEFAULT CHARSET=utf8;
#app表 客户端表
CREATE TABLE `app` (
	`id` smallint(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id',
	`name` varchar(10) DEFAULT NULL COMMENT 'APP类型名称 如：安卓手机',
	`is_encryption` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否加密 1加密 0不加密',
	`key` varchar(20) NOT NULL DEFAULT '0' COMMENT '加密key',
	`image_size` text COMMENT '按json_encode存储',
	`create_time` int(11) NOT NULL COMMENT '创建时间',
	`update_time` int(11) NOT NULL COMMENT '更新时间',
	`status` tinyint NOT NULL DEFAULT '1' COMMENT '状态 1正常 0删除',
	PRIMARY KEY(`id`)
)ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;