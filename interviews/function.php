<?php

/*
 * 测试函数
 */
function printr($array){
    echo '<pre>';
    print_r($array);die;
    echo '</pre>';
}
/*
 * 取得上一个月的最后一天
 * */
function get_last_month_last_day($date = ''){
    if($date != ''){
        $time = strtotime($date);
    }else{
        $time = time();
    }
    $day = date('j',$time);
    return date('Y-m-d',strtotime("-{$day} days",$time));
}
//echo get_last_month_last_day();
//echo get_last_month_last_day('2013-3-21');
/*
 * 冒泡排序
 */
function bubble_sort(&$arr){
    for($len=count($arr),$i=0;$i<$len;$i++){
        for($j=1;$j<$len-$i;$j++){
            if($arr[$j] < $arr[$j-1]){
                $temp = $arr[$j];
                $arr[$j] = $arr[$j-1];
                $arr[$j-1] = $temp;
            }
        }
    }
}
//$arr = array(10,2,36,14,10,25,23,85,99,45);
//bubble_sort($arr);
//printr($arr);

//指定部分数组元素全部向后移动一位
function move(Array $arr, $start = null, $end = null) {
  if(!isset($start) || $start < 0) $start = 0;
 if(!isset($end) || $end >= count($arr)) $end = count($arr) - 2;    #最后只能选到倒数第二个元素
for($i = $end; $i >= $start; $i--) {
            $arr[$i + 1] = $arr[$i];
 }
 return $arr;
}

//插入排序,使用同一个数组后移方法实现
function insertSort(Array $arr) {
     for($i = 1; $i < count($arr); $i++) {    #未排序数组,从第二个元素开始
             $insertEle = $arr[$i];    #待插入元素
     for($j = 0; $j < $i; $j++) {    #已排序好数组,从第一个元素开始
                     if($arr[$j] > $arr[$i]) {    #按升序排序
                             $arr = move($arr, $j, $i - 1);    #先将已排序好数组中大于待插入元素的元素全部后移一位
             $arr[$j] = $insertEle;    #插入待插入元素
             break;
         }
     }
 }
 return $arr;
}

$arr = array(5, 1, 7, 4, 6, 2);
$arr = insertSort($arr);
printr($arr);
