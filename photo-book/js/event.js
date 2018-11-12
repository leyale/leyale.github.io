// JavaScript Document
var test = {
	/*初始化*/
	int:function(){
		var _this = test;
		_this.bindevent();
		document.body.style.height = Math.max(view().h,view().sh) + 'px';
	},
	/*绑定事件*/
	bindevent:function(){
		var _this = test;
		var downX = downY = null;
		bind(document,'mousedown',function( ev ){
			var ev = ev || event;
			var target = ev.target || srcElement;  //兼容Ie
			var dataset = target.dataset || $(target).data();  
			var parent = target.parentNode;
			var num = 0;
			for( a in dataset){
				num ++ ;
			}
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

function view() {  //获取相关尺寸，有使用
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
		sh:document.body.scrollHeight
    };
}

function bind(obj, ev, fn) { //事件绑定，有使用
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function stopPP(obj) { //阻止点击事件冒泡，暂未使用，需要添加
    bind(obj, 'mousedown', function(ev) {
        var ev = ev || event;
        //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
    });
};
