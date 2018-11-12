/**
 * Created by Administrator on 2015/12/9.
 */
$(function(){

    $(".back").on('click',function(){
    	
    	console.log(1);
    	$('body,html').animate({scrollTop:0},300);
    	
    });

});