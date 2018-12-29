/*函数名：Stack()
 *功能：用于存储一个wordladder
 */
function Stack() {
    this.stack = [];
}
//添加
Stack.prototype.push = function (value) {
    this.stack.push(value);
};
//删除
Stack.prototype.pop = function () {
    return this.stack.pop();
};
//得到顶端元素
Stack.prototype.peek = function () {
    return this.stack[this.stack.length - 1];
};
//得到长度
Stack.prototype.length = function () {
    return this.stack.length;
};
/*函数名：Queue()
 *功能：用于存储一系列wordladder
 */
function Queue() {
    this.queue = [];
}
//添加
Queue.prototype.enqueue = function (value) {
    this.queue.push(value);
};
//删除
Queue.prototype.dequeue = function () {
    return this.queue.shift();
};
//得到队列前端元素
Queue.prototype.peek = function () {
    return this.queue[0];
};
//得到长度
Queue.prototype.length = function () {
    return this.queue.length;
};
/*函数名：deepCloneStack(stack)
 *功能：用于将stack深拷贝
 */
function deepCloneStack(stack){
    //新建一个Stack
    var x = new Stack();
    var len = stack.length();
    //将stack中元素存入新建的stack
    for(var i = 0;i<len;i++) {
        var s = stack.pop();
        x.push(s);
    }
    //新建一个Stack
    var y = new Stack();
    //为了使顺序一致且原stack不变，将x的元素传入新建stack和原stack
    for(var i=0;i<len;i++) {
        var s = x.pop();
        y.push(s);
        stack.push(s);
    }
    return y;
}
/*函数名：check(s1, dic)
 *功能：检查单词是否在词典中
 */
function check(s1, dic)
{
    if(dic.has(s1))
        return true;
    return false;
}
/*函数名：Check(flag1,flag2)
 *功能：用来处理不合法的word1和word2的情况
 */
function Check(flag1,flag2)
{
    if(flag1==0 & flag2==0) {
        document.getElementById("result").innerHTML = "Invalid Word1 and Word2.";
    } else if(flag1==0) {
        document.getElementById("result").innerHTML = "Invalid Word1.";
    } else if(flag2==0) {
        document.getElementById("result").innerHTML = "Invalid Word2.";
    }
}
/*函数名：wordladder(dic)
 *功能：用来得到word1到word2的wordladder
 */
function wordladder(dic)
{
    //得到word1和word2并判断其是否合法
    var word1 = document.getElementById("word1").value;
    var word2 = document.getElementById("word2").value;
    var s1 = word1.toLowerCase();
    var s2 = word2.toLowerCase();
    var flag1 = 1;
    var flag2 = 1;
    if(!check(s1,dic)) {
        flag1=0;
    }
    else {
        flag1=1;
    }
    if(!check(s2,dic)) {
        flag2=0;
    }
    else {
        flag2=1;
    }
    Check(flag1,flag2);
    if(s1==s2) {
        document.getElementById("result").innerHTML = "Word1 and Word2 are the same.";
        return;
    }
    if(s1.length != s2.length ) {
        document.getElementById("result").innerHTML = "Word1 and Word2 are of different length.";
        return;
    }
    if(flag1==0 || flag2==0) {
        return;
    }
    //寻找wordladder
    var word = new Stack();
    var ladder = new Queue();
    var first = new Stack();
    first.push(s1);
    ladder.enqueue(first);
    var pre_words = new Set();
    pre_words.add(s1);
    var length = s1.length;
    var flag = 1;
    while (true) {
        var _last = deepCloneStack(ladder.peek()) ;
        ladder.dequeue();
        var pre = _last.peek();
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < 26; j++) {
                var change = String.fromCharCode((97 + j));
                var change_word = pre;
                var a = change_word.replace(change_word[i], change);
                change_word = a;
                if (dic.has(change_word) & !pre_words.has(change_word)) {
                    var _new = deepCloneStack(_last);
                    _new.push(change_word);
                    ladder.enqueue(_new);
                    pre_words.add(change_word);
                    if (change_word === s2) {
                        word = _new;
                        flag = 0;
                    }
                }
                if(flag === 0)
                    break;
            }
            if(flag === 0)
                break;
        }
        if(flag === 0) {
            var len = word.length();
            var out = "";
            for(var i = 0; i < len - 1;i++) {
                var s = word.pop();
                out += s;
                out += " => "
            }
            out += word.pop();
            document.getElementById("result").innerHTML = out;
            break;
        }
        if (ladder.length() === 0) {
            document.getElementById("result").innerHTML = "There is no way.";
            break;
        }
    }
}
/*函数名：ajax()
 *功能：用来读取本地文件
 */
function ajax() {
    //声明异步请求对象：
    var xmlHttp = null;
    if (window.ActiveXObject) {
        // 用于IE6, IE5 浏览器
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest)
    {
        // 用于IE7+, Firefox, Chrome, Opera, Safari 浏览器
        xmlHttp = new XMLHttpRequest();
    }
    //如果实例化成功，调用open()读取文件
    if (xmlHttp != null) {
        xmlHttp.open("get", "dictionary.txt", true);
        xmlHttp.send();
        //设置回调函数
        xmlHttp.onreadystatechange = doResult;
    }
    /*函数名：doResult()
     *功能：用来存储文件信息
     */
    function doResult() {
        //如果执行完成
        if (xmlHttp.readyState == 4)
        {
            //如果执行成功
            if (xmlHttp.status == 200)
            {
                var f = new String();
                f = xmlHttp.responseText;
                var g = f.split("\n");
                //创建词典
                var dic = new Set();
                for(var i=0;i<g.length;i++)
                {
                    dic.add(g[i]);
                }
                //将词典传入wordladder()进行寻找wordladder操作
                wordladder(dic);
            }
        }
    }
}