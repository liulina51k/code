//******************1.number.toExponential(fractionDigits) 函数的使用，******************
//该方法把这个number转换成一个指数形式的字符串。可选参数fractionDigits控制其小数点后的数字
//位数。它的值必须在0到20之间。
function toExponential1() {
	console.log(Math.PI.toExponential(0)); //3e+0
	console.log(Math.PI.toExponential(2)); //3.14e+0
}
//******************2.number.toFixed(fractionDigits) 函数的使用，******************
//该方法把这个number转换成一个十进制数形式的字符串。可选参数fractionDigits控制其小数点后的
//数字位数。它的值必须在0到20之间。默认为0。
function toFixed1() {
	console.log(Math.PI.toFixed(0)); //3
	console.log(Math.PI.toFixed(2)); //3.14
}
//******************3.number.toPrecision(precision) 函数的使用，******************
//该方法把这个number转换成一个十进制数形式的字符串。可选参数precision控制有效数字的
//位数。它的值必须在0到21之间。
function toPrecision1() {
	console.log(Math.PI.toPrecision(2)); //3.1
	console.log(Math.PI.toPrecision(7)); //3.141593
}
//******************4.number.toString(radix) 函数的使用，******************
//该方法把这个number转换成一个字符串。可选参数radix控制基数。它的值必须在2和36之间。默认的
//radix是以10为基数的。radix最常用的是整数，但是它可以用任意的数字。
//在最普通的情况下，number.toString()可以更简单的写为String(number)。
function toString1() {
	console.log(Math.PI.toString(2)); 
	                              //11.001001000011111101101010100010001000010110100011
	console.log(Math.PI.toString(8)); //3.1103755242102643
	console.log(Math.PI.toString(16)); //3.243f6a8885a3
	console.log(Math.PI.toString()); //3.141592653589793
}