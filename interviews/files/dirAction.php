<?php

//$path = '/home/liulina/code/interviews/files/data/cache';
//$result = mkdir($path);
//var_dump($result);
function readDirS($path,$deep=0){
    if(is_dir($path)){
        $handle = opendir($path);
        while(($file = readdir($handle)) !== false){
            if($file != '.' || $file != '..') continue;
            echo str_repeat('&nbsp;',$deep),$file,'<br>';var_dump($file);
            if(is_dir($path.'/'.$file)){
                readDirS($path.'/'.$file,$deep+4);
            }

        }
        closedir($handle);
    }
}
$path = '/home/liulina/code/functions/';
readDirS($path);