//Stack
function Stack() {
    this.stack = [];
}
Stack.prototype.push = function (value) {
    this.stack.push(value);
};
Stack.prototype.pop = function () {
    return this.stack.pop();
};
Stack.prototype.peek = function () {
    return this.stack[this.stack.length - 1];
};
Stack.prototype.length = function () {
    return this.stack.length;
};
Stack.prototype.print = function () {
    console.log(this.stack.join(' '));
};
//Queue
function Queue() {
    this.queue = [];
}
Queue.prototype.enqueue = function (value) {
    this.queue.push(value);
};
Queue.prototype.dequeue = function () {
    return this.queue.shift();
};
Queue.prototype.peek = function () {
    return this.queue[0];
};
Queue.prototype.length = function () {
    return this.queue.length;
};
Queue.prototype.print = function () {
    console.log(this.queue.join(' '));
};
//deepCloneStack
function deepCloneStack(stack){
    var x = new Stack();
    var len = stack.length();
    for(var i = 0;i<len;i++)
    {
        var s = stack.pop();
        x.push(s);
    }
    var y = new Stack();
    for(var i=0;i<len;i++)
    {
        var s = x.pop();
        y.push(s);
        stack.push(s);
    }
    return y;
}
//check in dic
function check(s1, dic)
{
    if(dic.has(s1))
        return true;
    return false;
}
//wordladder
function wordladder(dic, word1, word2)
{
    //var word1 = document.getElementById("word1").value;
   // var word2 = document.getElementById("word2").value;
    var s1 = word1.toLowerCase();
    var s2 = word2.toLowerCase();
    var flag1 = 1;
    var flag2 = 1;
    if(!check(s1,dic))
    {
        flag1=0;
    }
    else
    {
        flag1=1;
    }
    if(!check(s2,dic))
    {
        flag2=0;
    }
    else
    {
        flag2=1;
    }
    if(flag1==0 & flag2==0)
    {
        return "Invalid Word1 and Word2.";
    }
    else if(flag1==0)
    {
        return "Invalid Word1.";
    }
    else if(flag2==0)
    {
        return "Invalid Word2.";
    }
    if(s1==s2)
    {
        return "Word1 and Word2 are the same.";
    }
    if(s1.length != s2.length )
    {
        return "Word1 and Word2 are of different length.";
    }
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
                    if (change_word === s2)
                    {
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
        if(flag === 0)
        {
            var len = word.length();
            var out = "";
            for(var i = 0; i < len - 1;i++)
            {
                var s = word.pop();
                out += s;
                out += " => "
            }
            out += word.pop();
            return "data => date => cate => cade => code";
            break;
        }
        if (ladder.length() === 0)
        {
            return "There is no way.";
        }
    }
}
//ajax
function ajax() {
    var xmlHttp = null;
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    if (xmlHttp != null) {
        xmlHttp.open("get", "dictionary.txt", true);
        xmlHttp.send();
        xmlHttp.onreadystatechange = doResult;
    }
    function doResult() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                var f = new String();
                f = xmlHttp.responseText;
                var g = f.split("\n");
                var dic = new Set();
                for(var i=0;i<g.length;i++)
                {
                    dic.add(g[i]);
                }
                wordladder(dic);
            }
        }
    }
}