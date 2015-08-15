<?php
error_reporting(-1);
ini_set('display_errors',0);
ini_set('log_errors',1);
ini_set('error_log','syslog');
openlog('PHP5.3',LOG_PID,LOG_SYSLOG);//打开与系统日志的连接
syslog(LOG_ERR,'this is a test of syslog'.date('Y/m/d H:i:s'));//发送内容到系统日志
closelog();//关闭系统日志
