<?php
class shutdown {
	public function endScript(){
		if(error_get_last()){
			echo '<pre>';
			print_r(error_get_last());
			echo '</pre>';
		}
		file_put_contents('D:\chinaiiss\code\exceptions\testError.txt', 'this is a test');
		die('end script');
	}
}
register_shutdown_function(array(new shutdown(),'endScript'));
echo md6();