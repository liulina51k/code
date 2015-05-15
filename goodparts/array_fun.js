//******************array.concat(item...) 函数的使用，******************
//返回一个新数组，将参数分别附在调用它的对象内容的后面。如果为数组，则分
//别依次追加其后面。参数可以为多个。
function concat1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.concat(b,true);
    console.log(c);//[ 'a', 'b', 'c', 'x', 'y', 'z', true ]
}
//******************array.join(separator) 函数的使用，******************
//该方法把一个array构成一个字符串。连接符默认为',',可以使用空字符。
//如果想用把大量的片段组装成一个字符串，可以把他们放到数组中，并用join连接。比用"+"快
function join1() {
	var a = ['a','b','c'];
	a.push('d');
	var c = a.join('');
	console.log(c);//abcd
}
//******************array.pop 函数的使用，******************
//该方法使数组像堆栈一样工作，移除数组中的最后一个元素，并返回，如果数组为空返回undefined
//pop可以这样实现
Array.prototype.pop2=function(){
	return this.splice(this.length-1,1)[0];
};
function pop1() {
	var a = ['a','b','c'];
	var c = a.pop2();//c
}pop1();
//******************array.push(item...) 函数的使用，******************
//该方法把一个参数，或多个参数item,附加到一个数组的尾部，会修改该数组，若参数为数组，整体
//作为一个单元插入到新数组，返回新数组的长度。
function push1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
//******************array.reverse 函数的使用，******************
//该方法把
//
function reverse1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
//******************array.shift 函数的使用，******************
//该方法把
//
function shift1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
//******************array.slice(start,end) 函数的使用，******************
//该方法把
//
function slice1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
//******************array.sort(comparefn) 函数的使用，******************
//该方法把
//
function sort1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
//******************array.splice(start,deleteCount,item...) 函数的使用，******************
//该方法把
//
function splice1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
//******************array.unshift(item...) 函数的使用，******************
//该方法把
//
function unshift1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
