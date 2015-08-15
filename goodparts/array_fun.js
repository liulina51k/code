//******************1.array.concat(item...) 函数的使用，******************
//返回一个新数组，将参数分别附在调用它的对象内容的后面。如果为数组，则分
//别依次追加其后面。参数可以为多个。
function concat1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.concat(b,true);
    console.log(c);//[ 'a', 'b', 'c', 'x', 'y', 'z', true ]
}
//******************2.array.join(separator) 函数的使用，******************
//该方法把一个array构成一个字符串。连接符默认为',',可以使用空字符。
//如果想用把大量的片段组装成一个字符串，可以把他们放到数组中，并用join连接。比用"+"快
function join1() {
	var a = ['a','b','c'];
	a.push('d');
	var c = a.join('');
	console.log(c);//abcd
}
//******************3.array.pop 函数的使用，******************
//该方法使数组像堆栈一样工作，移除数组中的最后一个元素，并返回，如果数组为空返回undefined
//给类型添加方法
Function.prototype.method=function(name,func){
	this.prototype[name] = func;
	return this;
}
//pop可以这样实现
Array.method('pop2',function(){
	return this.splice(this.length-1,1)[0];
})
function pop1() {
	var a = ['a','b','c'];
	var c = a.pop2();//c
	console.log(c);
}
//******************4.array.push(item...) 函数的使用，******************
//该方法把一个参数，或多个参数item,附加到一个数组的尾部，会修改该数组，若参数为数组，整体
//作为一个单元插入到新数组，返回新数组的长度。
//push 可以这样实现
Array.method('push2',function(){
	this.splice.apply(
		this,
		[this.length,0].
			concat(Array.prototype.slice.apply(arguments)));
	return this.length;
});
function push1() {
	var a = ['a','b','c'];
	var b = ['x','y','z'];
	var c = a.push2(b,true);
	console.log(c);//c 是 5
	console.log(a);//[ 'a', 'b', 'c', [ 'x', 'y', 'z' ], true ]
}
//******************5.array.reverse 函数的使用，******************
//该方法反转array中元素的顺序。它返回当前的array.
function reverse1() {
	var a = ['a','b','c'];
	var b = a.reverse();
	console.log(a);// a 是 ['c','b','a']
	console.log(b);// b 是 ['c','b','a']
}
//******************6.array.shift 函数的使用，******************
//该方法使数组像堆栈一样工作，移除数组中的第一个元素，并返回，如果数组为空返回undefined
//shift 通常比pop慢的多.
//shift可以这样实现
Array.method('shift2',function(){
	return this.splice(0,1)[0];
});
function shift1() {
	var a = ['a','b','c'];
	var c = a.shift2();
	console.log(c);//c 是 a
	console.log(a);//a 是 [ 'b', 'c']
}
//******************7.array.slice(start,end) 函数的使用，******************
//该方法对array中的一段做浅复制。第一个被复制的元素是array[start],它将一直复制到array[end
//]为止。end参数可选，默认为array.length。如果start 大于array.length,得到的是一个新数组。
function slice1(start,end) {
	var a = ['a','b','c'];
	var b = a.slice(0,1);
	var c = a.slice(1);
	var d = a.slice(1,2);
	console.log(b);//b 是 ['a']
	console.log(c);//c 是 ['b','c']
	console.log(d);//d 是 ['b']
}
//******************8.array.sort(comparefn) 函数的使用，******************
//该方法对array中的内容进行适当的排序，它不能给数字进行确切的排序。
function sort1() {
	var n = [4,8,15,16,23,42];
	n.sort();
	console.log(n);
}
//javascript的默认比较函数假定所有被排序的元素都是字符串，可以使用自己的比较函数来替换默
//认的比较函数，接受两个参数，相等则返回0，如果第一个参数，排在前面，则返回负数，如果第二
//个参数排在前面，则返回正数。类似于（FORTRAN 2的算术IF语句）
function sort2() {
	var n = [4,8,15,16,23,42];
	n.sort(function(a,b){
		return a - b;
	});
	console.log(n);
}
//上面这个函数能给数字排序，但它不能给字符串排序。如果我们想要给任何简单值数组排序，则必
//须做更多的工作。
function sort3() {
	var m = ['aa','bb','a',4,8,15,16,23,42];
	m.sort(function(a,b){
		if(a === b) {
			return 0;
		}
		if(typeof a === typeof b) {
			return a < b ? -1 : 1;
		}
		return typeof a < typeof b ? -1 : 1;
	});
}
//更智能的比较函数，对对象数组的排序
//by函数接受一个成语名字符串作为参数
//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数。
var by = function(name) {
    return function(o,p) {
    	var a,b;
    	if(typeof o === 'object' && typeof p === 'object' && o && p) {
    		a = o[name];
    		b = p[name];
    		if(a === b) {
    			return 0;
    		}
    		if(typeof a === typeof b) {
			return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
    	}else {
    		throw {
    			name : 'Error',
    			message : 'expect an object'
    		};
    	}
    };
}
//关于sort更深一层，本人了解的也不是很多，有兴趣的自己去了解。
//******************9.array.splice(start,deleteCount,item...) 函数的使用，******************
//该方法从array中移除一个或多个元素，并用新的item替换它们，start起始位置，deleteCount删除
//个数，item后面的所有参数，被插入到被删除元素的位置。它返回一个包含被删除元素的数组。
//splice 最主要的用处是 从一个数组中删除元素。
function splice1() {
	var a = ['a','b','c'];
	var r = a.splice(1,1,'ache','bug');
	console.log(a);//a 是 [ 'a', 'ache', 'bug','c']
	console.log(r);//r 是 ['b']
}
//******************10.array.unshift(item...) 函数的使用，******************
//该方法和push一样，用来把元素加入到数组中，但它是把item插入到数组的起始部分，而不是末尾
//。它返回array的新的长度值。
//unshift可以像这样实现
Array.method('unshift2',function(){
	this.splice.apply(
		this,
		[0,0].concat(Array.prototype.slice.apply(arguments)));
	return this.length;
});
function unshift1() {
	var a = ['a','b','c'];
	var r = a.unshift2('?','@');
	console.log(a);//a 是 ['?','@','a','b','c']
	console.log(r);//r 是 5
}
