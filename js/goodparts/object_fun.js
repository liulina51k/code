//******************1.object.hasOwnProperty(name) 函数的使用，******************
//如果这个object包含了一个名为name的属性，那么该方法返回true。原型链中的同名属性是不会被检
//查的。这个方法对name就是hasOwnProperty时不起作用，此时会返回false。
if(typeof Object.beget !== 'function') {
	Object.beget = function(O) {
		var F = function() {};
		F.prototype = O;
		return new F();
	}
}
function hasOwnProperty1() {
	var a = {member: true};
	var b = Object.beget(a);
	var t = a.hasOwnProperty('member');
	var u = b.hasOwnProperty('member');
	var v = b.member;
	console.log(b);//b 是 {}
	console.log(t);//t 是 true
	console.log(u);//u 是 false
	console.log(v);//v 是 true
}
