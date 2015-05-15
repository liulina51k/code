<html>
<head>
</head>
<body>
	<?php 
		$img = imagecreate(100, 100);
		$bgcolor = imagecolorallocate($img, 200, 200, 200);
		$pixelcolor = imagecolorallocate($img, 255, 0, 0);
		imagesetpixel($img, 50, 50, $pixelcolor);
		imagepng($img,"pic.png");
		imagedestroy($img);
	?>
	<img src="pic.png" border=0>
</body>
</html>