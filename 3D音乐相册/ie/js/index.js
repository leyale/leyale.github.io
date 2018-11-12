$(function(){
	
	var oNav = document.getElementsByTagName('nav')[0];
	var box = oNav.getElementsByClassName('box')[0];
	var right = oNav.getElementsByClassName('right')[0];
	var left = oNav.getElementsByClassName('left')[0];
	var oUl = oNav.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var oLogo = oNav.getElementsByClassName('logo')[0];
	var aText = oLogo.getElementsByClassName('text');
	var aImg = oLogo.getElementsByTagName('img');
	var oSpan = oLogo.getElementsByTagName('span')[0];
	var oLogeAll = oLogo.getElementsByClassName('logoAll')[0];
	var leftNum = aLi[0].offsetLeft;
	var topNum = aLi[0].offsetTop;
	var index = 0;
	var num = 0;
	var bOff = 0;
	var bOff2 = true;
	var iTimer = 0;
	box.style.left = leftNum + 'px';
	box.style.top = topNum + 'px';
	box.style.width = aLi[0].offsetWidth + 'px';
	for(var i=0; i<aLi.length; i++){
		
		aLi[i].index = i;
		aLi[i].onmouseenter = function(){
			
			clearTimeout(iTimer);
			starMove(this);
			
		}
		
	}
	oUl.onmouseleave = function(){
		
		iTimer = setTimeout(function(){
			
			starMove(aLi[index]);
			
		},100);
		
	};
	oLogo.onmouseenter = function(){
		
		if(bOff2){
			
			bOff2 = false;
			aImg[0].style.transform = 'scale(1.05)';
			aImg[1].style.top = '47px';
			aImg[2].style.top = '-25px';
			oLogeAll.style.opacity = 0;
			oSpan.style.left = '-100px';
			move(oSpan,{ left: 270 },300,'linear',function(){
				
				move(aImg[1],{ top:0 },300);
				move(aImg[2],{ top:0 },300,"linear",function(){
					
					move(oLogeAll,{ opacity:1 },300,'linear',function(){
						
						bOff2 = true;
						
					});
					
				});
				
			});
			
		}
		
	};
	oLogo.onmouseleave = function(){
		
		aImg[0].style.transform = 'scale(1)';
		
	};
	function starMove(obj){
		
		if(obj.offsetLeft>box.offsetLeft){
				
			bOff = 1;
			
		}else if(obj.offsetLeft<box.offsetLeft){
			
			bOff = 2;
			
		}else{
			
			bOff = 0;
			
		}
		if(bOff){
			
			var size = Math.abs(obj.offsetLeft - box.offsetLeft)*0.8;
			if(obj.index!=num){
				
				box.style.filter = 'blur(2px)';
				box.style.WebkitFilter = 'blur(2px)';
				
			}
			move(box,{left:obj.offsetLeft,width:obj.offsetWidth},size,'easeOut',function(){
				
				
				switch (bOff) {
					
					case 1: toRight();
						break;
					case 2: toLeft();
						break;
					default: move(right,{ width:0, right: 0 },30);
							move(left,{ width:0, left: 0 },30);
						break;
					
				}
				box.style.filter = 'blur(0)';
				box.style.WebkitFilter = 'blur(0)';
				
			});
			if(obj.offsetLeft>box.offsetLeft){
				
				right.style.background = '#e15671';
				left.style.background = 'url(images/nav_bg.gif) repeat-x';
				move(right,{ width:40, right: -20 },150);
				move(left,{ width:40, left: -20 },150);
				
			}else if(obj.offsetLeft<box.offsetLeft){
				
				right.style.background = 'url(images/nav_bg.gif) repeat-x';
				left.style.background = '#e15671';
				move(right,{ width:40, right: -20 },150);
				move(left,{ width:40, left: -20 },150);
				
			}
			num = obj.index;
			
		}
		
	}
	function toRight(){
		
		move(right,{ width:0, right: 0 },80,'linear',function(){
						
			right.style.background = 'url(images/nav_bg.gif) repeat-x';
			move(right,{ width:20, right: -10 },80,'linear',function(){
				
				move(right,{ width:0, right: 0 },50,'linear')
				
			})
			
		});
		move(left,{ width:0, left: 0 },80,'linear',function(){
			
			left.style.background = '#e15671';
			move(left,{ width:20, left: -10 },80,'linear',function(){
				
				move(left,{ width:0, left: 0 },50,'linear')
				
			})
			
		});
		
	}
	function toLeft(){
		
		move(right,{ width:0, right: 0 },80,'linear',function(){
						
			right.style.background = 'url(images/nav_bg.gif) repeat-x';
			move(right,{ width:20, right: -10 },80,'linear',function(){
				
				move(right,{ width:0, right: 0 },50,'linear')
				
			})
			
		});
		move(left,{ width:0, left: 0 },80,'linear',function(){
			
			left.style.background = '#e15671';
			move(left,{ width:20, left: -10 },80,'linear',function(){
				
				move(left,{ width:0, left: 0 },50,'linear')
				
			})
			
		});
		
	}
	
});