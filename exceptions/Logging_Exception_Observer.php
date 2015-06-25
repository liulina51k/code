<?php
class Logging_Exception_Observer implements Exception_Observer{
	protected $_filename='D:/chinaiiss/code/exceptions/logException.log';
	public function __construct($filename=null){
		if($filename!==null && is_string($filename)){
			$this->_filename=$filename;
		}
	}
	/*
	 * 写入日志
	 */
	public function update(Observer_Exception $e){
		$message="时间: ".date('Y-m-d H:i:s').PHP_EOL;
		$message.="信息: ".$e->getMessage().PHP_EOL;
		$message.="追踪信息: ".$e->getTraceAsString().PHP_EOL;
		$message.="文件: ".$e->getFile().PHP_EOL;
		$message.="行号: ".$e->getLine().PHP_EOL;
		error_log($message,3,$this->_filename);//写到日志中
	}
}


