function CompileDemo(){
   var rs;
   var s = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPp";
   // 只为大写字母创建正则表达式。
   var r = new RegExp("[A-Z]", "g");
   var a1 = s.match(r);             // 查找匹配。
   // 只为小写字母编译正则表达式。
   r.compile("[a-z]", "g");
   var a2 = s.match(r);             // 查找匹配。
   return(a1 + "\n" + a2);
}
console.log(CompileDemo());