<?php
//统计数组中所有的值出现的次数
$array = array(1, "hello", 1, "world", "hello");
print_r(array_count_values($array));
/*
Array
(
    [1] => 2
    [hello] => 2
    [world] => 1
)
*/
?>
