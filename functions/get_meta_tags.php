<?php
// 假设上边的标签是在 www.example.com 中
$tags = get_meta_tags('http://www.example.com/');

// 注意所有的键（key）均为小写，而键中的‘.’则转换成了‘_’。
echo $tags['author'];       // name
echo $tags['keywords'];     // php documentation
echo $tags['description'];  // a php manual
echo $tags['geo_position']; // 49.33;-86.59
?>
