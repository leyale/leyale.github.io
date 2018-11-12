// 点击翻页的函数，在event.js中执行

test.clickArea={
	leaf:function( option ){
		var _this = $(option.obj);
		if(option.target == 'true'){_this = $(option.obj).parent()}
		if(option.target == 'sibling'){
			_this = $(option.obj).parents('.bookMain').find('.tabMain').eq(1);
		}
		
		if($(_this).parent().hasClass('rotate')){
			var length = $(_this).parent().nextAll('.paper').length;
			css($(_this).parent().get(0),'zIndex','99');
			$(_this).parent().nextAll('.paper').add($(_this).parent()).each(function( i,v ){
				tweenMove({
					obj:$(v).get(0),
					oTarget:{rotateY:0,translateX:0,zIndex:(length-i)+1},
					iTime:500,
					iType:'easeBoth',
					fnDuring:function(b,MT,t,d){
						if(t>d/2){
							css($(v).get(0),'translateZ',(length-i)+1);
							$(v).removeClass('rotate');
						}
					}
				});
			});
		}else{
			if(option.target == 'sibling'){ return false;}
			
			var length = $(_this).parent().prevAll('.paper').length;
			$(_this).parent().prevAll('.paper').add($(_this).parent()).each(function( i,v ){
				tweenMove({
					obj:$(v).get(0),
					oTarget:{rotateY:-180,translateX:12,zIndex:i+1},
					iTime:500,
					iType:'easeBoth',
					fnDuring:function(b,MT,t,d){
						if(t>d/2){
							css($(v).get(0),'translateZ',i+1);
							$(v).addClass('rotate');
						}
					}
				});
			});
		}
	}
}
