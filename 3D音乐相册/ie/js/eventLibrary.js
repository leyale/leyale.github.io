// JavaScript Document

test.clickArea={
	drag:function(option){
		var obj = option.obj,ev = option.ev;
		obj.style.position = 'absolute';
		var downX = ev.clientX;
		var downY = ev.clientY;
		var objleft = downX - obj.offsetLeft;
		var objtop = downY - obj.offsetTop;
		obj.onmousemove = document.onmousemove = function( ev ){
			var ev = ev || event;
			obj.style.left = ev.clientX - objleft + 'px';
			obj.style.top = ev.clientY - objtop + 'px';
		}
		obj.onmouseup = document.onmouseup = function(){
			 obj.onmousemove = document.onmousemove = null;
		}
	},
	backtop:function(){
		$('body,html').animate({scrollTop:0},300);
	},
	scrollto:function( option ){
		$(option.obj).siblings().removeClass('active');
		$(option.obj).addClass('active');
		$('body,html').animate({scrollTop:option.target},300);
	},
	activeclass:function( option ){
		$(option.obj).addClass(option.target);
		$(option.obj).on('mouseup',function(){
			$(this).removeClass('active');
		});
	},
	leaf:function( option ){
		console.log($(option.obj).parents('.bookMain').find('.paper').length);
		var parent = $(option.obj).parents('.bookMain');
		parent.find('.tabMain').removeClass('active');
		$(option.obj).addClass('active');
		$(option.obj).parent().siblings('.paper').animate({zIndex:0},300);
		$(option.obj).parent().animate({zIndex:11},300);
	}
}

test.popup = function( option ){
	var text = document.createElement('div');
        text.className = 'popup';
        text.innerHTML = option;
    document.body.appendChild(text);
	setTimeout(function(){
		remove( text );
	},3000);
}

test.uploding = function( option ){
	if( option && !option.off ){
		remove( s('mask') );
	}
	var mask = document.createElement('div');
	mask.className = 'mask';
	mask.id = 'mask';
	mask.innerHTML = '<div class="loding">&nbsp;</div>';
	document.body.appendChild(mask);
}