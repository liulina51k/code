<?php
require_once 'MyErrorHandler.php';
error_reporting(-1);
set_error_handler(array('MyErrorHandler','deal'));
echo $test;
settype($var,'king');