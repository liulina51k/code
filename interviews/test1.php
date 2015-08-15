<?php
/*
 * 将1234567890转换成1,234,567,890每三位用逗号隔开的形式。
 */
//$str = '2211234567890';
function str($str){
    $str = strrev($str);
    $str = chunk_split($str,3,',');
    $str = strrev($str);
    //$str = ltrim($str,',');
    return $str;
//    echo $str;die;
}
/*
 * 反转utf8的字符串，使用正则和数组实现
 * @param string $str
 * @return string
 * */
function strrev_utf8($str){
    print_r(preg_split("//u",$str));die;
    return join("",array_reverse(preg_split("//u",$str)));
}
//$str = "传智博客PHP学院";
/*
 * 根据某列对二维数组进行排序
 * @param $arr array 要排序的数组
 * @param $row string 排序依据列
 * @param $type string asc,正序，desc逆序
 * @return array 返回排序好的数组
 */
function array_sort($arr,$row,$type){
    $arr_temp = array();
    //将排序依据列作为数组的键名
    foreach($arr as $v){
        $arr_temp[$v[$row]] = $v;
    }
    print_r($arr_temp);die;
    //返回排序结果
    return $arr_temp;
}
$person = array(
    array('id'=>2,'name'=>'zhangsan','age'=>23),
    array('id'=>5,'name'=>'lisi','age'=>28),
    array('id'=>3,'name'=>'apple','age'=>17),
);
array_sort($person,'name');