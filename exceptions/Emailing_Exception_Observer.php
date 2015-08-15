<?php
class Emailing_Exception_Observer implements Exception_Observer{
	protected $_email='2047333472@qq.com';
	public function __construct($email=null){
		if($email!==null && filter_var($email,FILTER_VALIDATE_EMAIL)){
			$this->_email=$email;
		}
	}
	/*
	* 发送邮件
	*/
	public function update(Observer_Exception $e){
		$message="时间: ".date('Y-m-d H:i:s').PHP_EOL;
		$message.="信息: ".$e->getMessage().PHP_EOL;
		$message.="追踪信息: ".$e->getTraceAsString().PHP_EOL;
		$message.="文件: ".$e->getFile().PHP_EOL;
		$message.="行号: ".$e->getLine().PHP_EOL;
		error_log($message,1,$this->_email);//发送到邮件
	}
}