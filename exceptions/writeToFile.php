<?php
header("content-type:text/html;charset=utf8");
class FileException extends Exception{
	public function getDetails(){
		switch($this->code) {
			case 0:
				return '没有提供文件';
				break;
			case 1:
				return '文件不存在';
				break;
			case 2:
				return '不是一个文件';
				break;
			case 3:
				return '文件不可写';
				break;
			case 4:
				return '非法文件的操作模式';
				break;
			case 5:
				return '数据写入失败';
				break;
			case 6:
				return '文件不能被关闭';
				break;
			default:
				return '非法';
				break;
		}
	}
}
class WriteData{
	private $_message='';
	private $_fp='';
	public function __construct($filename=null,$mode='w'){
		$this->_message="文件:{$filename} 模式:{$mode}";
		if(empty($filename)) throw new FileException($this->_message,0);
		if(!file_exists($filename)) throw new FileException($this->_message,1);
		if(!is_file($filename)) throw new FileException($this->_message,2);
		if(!is_writeable($filename)) throw new FileException($this->_message,3);
		if(!in_array($mode,array('w','w+','a','a+'))) throw new FileException($this->_message,4);
		$this->_fp=fopen($filename,$mode);
	}
	public function write($data){
		if(@!fwrite($this->_fp,$data.PHP_EOL)) throw new FileException($this->_message,5);
	}
	public function close(){
		if($this->_fp){
			if(@!fclose($this->_fp)) throw new FileException($this->_message,6);
			$this->_fp=null;
		}
	}
	public function __destruct(){
		$this->close();
	}
}
try{
	$fp=new WriteData('test.txt','w');//数据写入成功
	//$fp=new WriteData();//没有提供文件
	$fp->write('this is a test');
	$fp->close();
	echo '数据写入成功<hr/>';
}catch(FileException $e){
	echo '出现问题了'.$e->getMessage().'详细信息如下:'.$e->getDetails();
}