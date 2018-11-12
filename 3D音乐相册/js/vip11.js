/**
 * Created by Administrator on 2015/12/9.
 */
$(function(){

    var iTimer;
    var scrollTop;
    var windowHeight = $(window).height();
    window.pc = true;
    window.phone = true;
    window.game = true;
    window.service = true;
    window.video = true;
    iTimer = setInterval(function(){

        scrollTop = $(window).scrollTop();
        var height = windowHeight + scrollTop;

        if(height>=700&window.pc){

            pc();

        }
        if(height>=1440&window.phone){

            phone();

        }
        if(height>=2200&window.game){

            game();

        }
        if(height>=3000){

            service();

        }
        if(height>=3900){

            video();

        }
        if(height>=4300){

        }
        if(!window.pc&!window.phone&!window.game&!window.service&!window.video){

            clearInterval(iTimer);

        };

    },12);

    function pc(){

        window.pc = false;
        var arr = [2,1,4,0,5,3];
        var num = 0;
        $(".vip_pc div").css("opacity",'1');
        var iTimer = setInterval(function(){

            $(".vip_pc li").eq(arr[num]).css("transform","scale(1)");
            num++;
            if(num>=$(".vip_pc li").length){

                clearInterval(iTimer);

            }

        },200);

    }
    function phone(){

        window.phone = false;
        var num = 0;
        var iTimer = setInterval(function(){

            $("#phone div").eq(num).css("transform","translateX(-112px)");
            num++;
            if(num>=$("#phone div").length){

                clearInterval(iTimer);

            }

        },300);

    }
    function game(){

        window.game = false;
        var arr = [-62,135,-140];
        $(".phone_3dbox img").eq(0).css({transform:'rotateX(-74deg)'}).next().css({transform:'translateZ(227px) translateY(-66px) rotateX(65deg)'}).next().css({transform:'translateZ(13px) translateY(-168px) rotateX(-74deg)'});
        for(var i=0; i<$(".monster img").length; i++){

            $(".monster img").eq(i).css({transform:'translate(0,0)',opacity:1});

        }

    }
    function service(){

        window.service = false;
        var num = 0;
        var iTimer = setInterval(function(){

            $(".circle").eq(num).css("transform","scale(1)");
            num++;
            if(num>=$(".circle").length){

                clearInterval(iTimer);

            }

        },250);

    }
    function video(){

        window.video = false;
        var num = $(".video li").length-1;
        $(".rocket").css({width:"540px",height:"640px"});
        var iTimer = setInterval(function(){

            $(".video li").eq(num).find(".date").css({transform:"translateX(0)",opacity:1}).parent().find(".spot").css("transform","scale(1)").parent().find(".link").css({transform:"translateX(0)",opacity:1});
            num--;
            if(num<0){

                clearInterval(iTimer);

            }

        },150);

    }

});