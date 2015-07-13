//将时间戳改成日期形式
/*
var date = new Date();
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds();
console.log(Y+M+D+h+m+s);*/

/*
//将日期格式改成时间戳
date = new Date('2014-04-23 18:55:49:123');
//有三种方式获取
time1 = date.getTime(); //
time2 = date.valueOf();
time3 = Date.parse(date);
//三种获取的区别
//第一、二种会精确到毫秒。
//第三种，只能精确到秒,毫秒将用0来代替。
// 比如上面代码输出的结果(一眼就能看出区别)：
//  1398250549123
//  1398250549123
//  1398250549000 */

//js数组去重
Array.prototype.unique3 = function(){
	var res = [1,2,3,4,1,2,3,4];
	var json = {};
	for(var i = 0; i < this.length; i++){
			if(!json[this[i]]) {
				res.push(this[i]);
				json[this[i]] = true;
			}
	}
	return res;
}
console.log(unique3());