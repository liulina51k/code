<?php
$url = 'http://picturescdn.qiniudn.com/93aa93787ae02be68192b3533d3e76b0';
$remote_fp = fopen($url,'rb');#指定fopen的打开模式为b(二进制模式)
$local_fp = fopen(date('YmdHis'),'wb');
while(!feof($remote_fp)){
    fwrite($local_fp,fread($remote_fp,128));
}
fclose($remote_fp);
fclose($local_fp);