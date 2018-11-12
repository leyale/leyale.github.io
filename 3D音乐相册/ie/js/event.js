// JavaScript Document
var test = {
	/*初始化*/
	int:function(){
		var _this = test;
		_this.images = [];//上传文件用到的全局变量
		_this.bindevent();
		document.body.style.height = Math.max(view().h,view().sh) + 'px';
	},
	/*绑定事件*/
	bindevent:function(){
		var _this = test;
		var downX = downY = null;
		bind(document,'mousedown',function( ev ){
			var ev = ev || event;
			var target = ev.target || ev.srcElement;
			var dataset = target.dataset || $(target).data();
			for(b in dataset){
				if(_this.clickArea[b]){
					_this.clickArea[b]({obj:target,ev:ev,target:dataset[b]});
				}
			}
		});
	}
};
test.int();



/*---------------------工具函数------------------------------*/
function s(obj) {
    return document.getElementById(obj);
};

function addClass(obj, sClass) { //添加class样式
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}


function removeClass(obj, sClass) { //移除class样式
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
		sh:document.body.scrollHeight
    };
}

function bind(obj, ev, fn) { //事件绑定
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function remove( obj ){
	obj.parentNode.removeChild( obj );
}

function getByClass(parent, tagname, classname) { //通过Class名字获取元素
    var aEls = parent.getElementsByTagName(tagname);
    var arr = [];
    var re = new RegExp('(^|\\s)' + classname + '(\\s|$)');
    for (var i = 0; i < aEls.length; i++) {
        if (re.test(aEls[i].className)) {
            arr.push(aEls[i]);
        }
    }
    return arr;
}

function getByParent(obj, tagname, classname) { // 通过父级的className以及tagName获取元素
    var re = new RegExp('(^|\\s)' + classname + '(\\s|$)');
    while (obj.parentNode) {
        if(obj.parentNode.tagName != tagname){
            obj = obj.parentNode;
        }else{
            if (re.test(obj.parentNode.className)) {
                return obj.parentNode;
            }else{
                obj = obj.parentNode;
            }
        }

    }
}

function stopPP(obj) { //阻止点击事件冒泡
    bind(obj, 'mousedown', function(ev) {
        var ev = ev || event;
        //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
    });
};
