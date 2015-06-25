/*
//Math类的使用，该类为静态类，可以之间通过类调用相应的方法
console.log(Math.abs(-1));//1 (返回数的绝对值)
console.log(Math.ceil(4.5));//5 （对一个数进行上舍入）
console.log(Math.floor(4.5));//4（对一个数进行下舍入）
console.log(Math.max(4,5));//5 （求最大值）
console.log(Math.min(4,5));//4（求最小值）
console.log(Math.round(4.5));//5（对一个数进行四舍五入）
console.log(Math.random());//0.5753722707740963（一个大于0小于1的16位小数位的数字）

//返回1到100之间的随机数
console.log(Math.round(Math.random()*100));*/

/*
//日期Date类的使用，该类为动态类，该类需要通过对象来调用相应的方法。
console.log(Date()); //返回当前日期和时间
var date = new Date();
console.log(date.getDate()); //从Date对象返回一个月中的某一天
console.log(date.getDay()); //从Date对象返回一周中的某一天
console.log(date.getMonth()); //从Date对象返回月份
console.log(date.getYear()); //从Date对象返回年
console.log(date.getHours()); //从Date对象返回小时数
console.log(date.getMinutes()); //从Date对象返回分钟
console.log(date.getSeconds()); //从Date对象返回秒数*/

/*
//String类的使用,该类为动态类，该类需要通过对象来调用相应的方法。
//strObj.indexOf(subString[, startIndex])
//返回 String 对象内第一次出现子字符串的字符位置。
function IndexDemo(str2){
   var str1 = "BABEBIBOBUBABEBIBOBU"
   var s = str1.indexOf(str2);
   return(s);
}
console.log(IndexDemo('BI'));//4
//strObj.lastIndexOf(substring[, startindex])
//返回 String 对象中子字符串最后出现的位置。
function lastIndexDemo(str2)
{
   var str1 = "BABEBIBOBUBABEBIBOBU"
   var s = str1.lastIndexOf(str2);
   return(s);
}
console.log(lastIndexDemo('BI'));//14
//stringObj.split([separator[, limit]])
//将一个字符串分割为子字符串，然后将结果作为字符串数组返回。
function SplitDemo(){
   var s, ss;
   var s = "The rain in Spain falls mainly in the plain.";
   // 在每个空格字符处进行分解。
   ss = s.split(" ");
   return(ss);
}
console.log(SplitDemo());//['The','rain','in','Spain',...,'plain.']
//stringvar.substr(start [, length ])
//返回一个从指定位置开始的指定长度的子字符串。
function SubstrDemo(){
   var s, ss;                // 声明变量。
   var s = "The rain in Spain falls mainly in the plain.";
   ss = s.substr(12, 5);  // 获取子字符串。
   return(ss);               // 返回 "Spain"。
}
console.log(SubstrDemo());//Spain
//strVariable.substring(start, end)或者"String Literal".substring(start, end)
//返回位于 String 对象中指定位置的子字符串。 
function SubstringDemo(){
   var ss;                         // 声明变量。
   var s = "The rain in Spain falls mainly in the plain..";
   ss = s.substring(12, 17);   // 取子字符串。
   return(ss);                     // 返回子字符串。
}
console.log(SubstringDemo());//Spain
//strObj.charAt(index)
//返回指定索引位置处的字符。
function charAtTest(n){
   var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 初始化变量。
   var s;                                  // 声名变量。
   s = str.charAt(n - 1);                  // 从索引为n – 1的位置处
                                           // 获取正确的字符。
   return(s);                              //返回字符。
}
console.log(charAtTest(5));//E
//strVariable.length"或者String Literal".length 
//返回 String 对象的长度。
//objectname.toString([radix]) radix 代表进制数
//返回对象的字符串表示。toString 方法是所有内建的 JScript 对象的成员
//stringObj.match(rgExp) 
//使用正则表达式模式对字符串执行查找，并将包含查找的结果作为数组返回。
function MatchDemo(){
   var r, re;         // 声明变量。
   var s = "The rain in Spain falls mainly in the plain";
   re = /ain/i;    // 创建正则表达式模式。
   r = s.match(re);   // 尝试匹配搜索字符串。
   return(r);         // 返回第一次出现 "ain" 的地方。
}
console.log(MatchDemo());//['ain',index:5,input:'The rain in Spain falls mainly in the plain']
function MatchDemo2(){
   var r, re;         // 声明变量。
   var s = "The rain in Spain falls mainly in the plain";
   re = /ain/ig;      // 创建正则表达式模式。
   r = s.match(re);   // 尝试去匹配搜索字符串。
   return(r);         // 返回的数组包含了所有 "ain" 
                      // 出现的四个匹配。
}
console.log(MatchDemo2());//['ain','ain','ain','ain']
//stringObj.replace(rgExp, replaceText)
//返回根据正则表达式进行文字替换后的字符串的复制。
function ReplaceDemo(){
   var r, re;                    // 声明变量。
   var ss = "The man hit the ball with the bat.\n";
   ss += "while the fielder caught the ball with the glove.";
   re = /The/g;             // 创建正则表达式模式。
   r = ss.replace(re, "A");    // 用 "A" 替换 "The"。
   return(r);                   // 返回替换后的字符串。
}
console.log(ReplaceDemo());//A man hit the ball with the bat.
//while the fielder caught the ball with the glove.
//stringObj.search(rgExp)
//返回与正则表达式查找内容匹配的第一个子字符串的位置。
//search 方法指明是否存在相应的匹配。如果找到一个匹配，search 方法将返回一个整数值，指明这个匹配距离字符串开始的偏移位置。如果没有找到匹配，则返回 -1。
function SearchDemo(){
   var r, re;                   // 声明变量。
   var s = "The rain in Spain falls mainly in the plain.";
   re = /falls/i;            // 创建正则表达式模式。
   r = s.search(re);            // 查找字符串。
   return(r);                   // 返回 Boolean 结果。
}
console.log(SearchDemo());//18 */

/*
//Array类的使用，该类为动态类，该类需要通过对象来调用相应的方法。
//方式一
var myArr1 = new Array();
//可以动态的添加元素:myArr1[0] = 3;myArr1[1] = 'hello'.
//方式二
var myArr2 = new Array(12,34,3.56,"白骨精");
//myArr2[0] = '牛魔王';myArr2[1] = '红孩儿';myArr2[1] = '铁扇公主'.
//常用方法
myArr1.pop();//出栈
myArr1.push();//入栈
//Array类没有下标越界问题*/

/*
//Boolean类的使用，该类是一个把布尔值打包的布尔对象，这个对象在实际编程中用的不是很多，了解即可。
//toString() 把逻辑值转换为字符串，并返回结果
//valueOf() 返回布尔对象的原始值
*/

/*
//Number类的使用，该对象是原始数值的包装类。常用的函数有:
//toString() 把一个Number对象转换为字符串，并返回结果
//toFixed() 把数字转换为字符串，结果的小数点后有指定位数的数字
//请输出23的二进制字符串和16进制的字符串
//计算7/3的结果，并保留小数点后两位（四舍五入）
var b = 23;
console.log(b.toString(2));
console.log(b.toString(16));*/

//js中的函数分为三大类，自定义函数，js内部类的成员函数（方法），系统函数（全局函数）。
//系统函数也叫全局函数，可以直接使用，是js设计者们为了编程方便提供的。
//常见的一些系统函数
//eval() 可以把一个字符串当成一个脚步来运行，用处很大
//parseInt() 把字符串转成正数
//parseFloat() 把字符串转成小数
//isNaN() //判断某个值是不是数（该函数不是特别完美）

//最后总结：内部类和系统函数多查查javascript参考手册。


















