<?php
class Observable_Exception extends Exception{
	//保存观察者信息
	public static $_observers=array();
	public static function attach(Exception_Observer $observer){
		self::$_observers[]=$observer;
	}
	public function __construct($message=null,$code=0){
		parent::__construct($message=null,$code);
		$this->notify();
	}
	public function notify(){
		foreach(self::$_observers as $observer){
			$observer->update($this);
		}
	}
}