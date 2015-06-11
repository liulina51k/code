<?php
class MyErrorHandler{
	public $message='';
	public $filename='';
	public $line=0;
	public $vars=array();
	protected $_noticeLog='D:\chinaiiss\code\exceptions\noticeLog.log';
	public function __construct($message,$filename,$line,$vars){
		$this->message=$message;
		$this->filename=$filename;
		$this->line=$line;
		$this->vars=$vars;
	}
	public static function deal($errno,$errmsg,$filename,$line,$vars){
		$self=new self($errmsg,$filename,$line,$vars);
		switch($errno){
			case E_USER_ERROR:
				return $self->dealError();
				break;
			case E_USER_WARNING:
			case E_WARNING:
			 	return $self->dealWarning();
			 	break;
			case E_USER_NOTICE:
			case E_NOTICE:
			 	return $self->dealNotice();
			 	break;
			default:
				return false;
		}
	}
	/*
	 * 如何处理致命错误
	 */
	public function dealError(){
		ob_start();
		debug_print_backtrace();
		$backtrace=ob_get_flush();
		$errorMsg=<<<EOF
		出现了致命错误，如下：
产生错误的文件:{$this->filename}
产生错误的信息: {$this->message}
产生错误的行号: {$this->line}
追踪信息: {$backtrace}
EOF;
		error_log($errorMsg,1,'2047333472@qq.com');
		exit(1);
	}
	/*
	 * 如何处理警告
	 * @return boolean
	 */
	public function dealWarning(){
		$errorMsg=<<<EOF
		出现了警告错误，如下：
产生警告的文件:{$this->filename}
产生警告的信息: {$this->message}
产生警告的行号: {$this->line}
EOF;
	    return error_log($errorMsg,1,'2047333472@qq.com');
	}
	/*
	 * 如何处理通知级别的错误
	 * @return boolean
	 */
	public function dealNotice(){
		$datetime=date('Y-m-d H:i:s',time());
		$errorMsg=<<<EOF
		出现了通知错误，如下：
产生通知的文件:{$this->filename}
产生通知的信息: {$this->message}
产生通知的行号: {$this->line}
产生通知的时间: {$datetime}
EOF;
	    return error_log($errorMsg,3,$this->_noticeLog);
	}
}