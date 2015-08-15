<?php 
	$img = imagecreate(250, 500);
	$blue = imagecolorallocate($img, 0, 0, 255);
	$red = imagecolorallocate($img, 255, 0, 0);
	imagerectangle($img, 175, 165, 200, 225, $blue);
	imagefill($img, 10, 10, $red);
	imagestring($img, 3, 170, 220, "welcome to the world of php", $blue);
	//输出图像
	header("Content-type: image/png");
	imagepng($img);
	imagedestroy($img);
?>