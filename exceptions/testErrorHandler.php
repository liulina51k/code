<?php
require_once 'MyErrorHandler.php';
error_reporting(-1);
ini_set('display_errors',0);
set_error_handler(array('MyErrorHandler','deal'));
echo $test;
settype($var,'king');
test();
trigger_error('我是手动抛出的致命错误',E_USER_ERROR);