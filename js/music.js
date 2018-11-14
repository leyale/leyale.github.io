function getNum( option ){
    var min = option.min || 0;
    var num = option.num;//随机数个数
    var max = option.max;//随机数最大值
    var sort = option.sort;//是否排序  '>'：从大到小排序   '<'：从小到大排序  不传则不排序

    var arr = []; //[10,20]
    var json = {}; //{'10':1,'20':1}   10

    while( arr.length < num ){

        var iNum =  Math.round( Math.random()*max );

        if( !json[iNum] && iNum > min ){

            arr.push( iNum );
            json[iNum] = 1;
            //必须是一个真值，否则过滤不掉重复的数字。
        }

    }

    if(sort=='>'){
        arr.sort( function(a,b){ return b - a; } );
        return arr;
    }else if(sort=='<'){
        arr.sort( function(a,b){ return a - b; } );
        return arr;
    }else{
        return arr;
    }
}

var aImg = document.querySelectorAll("img");  

(function (){
        var audio = new Audio();
        var audioContext,analyser,sourceNode,freqArray,nowMusic,nowbtn;  
        var btn = document.querySelectorAll('.lines .btn')//获取到所有音乐控制圆球
        var stop = document.getElementById('btn5');  //获取到暂停圆球
        var mList = document.querySelectorAll('.lines .progress')//获取到所有音乐控制线条
   
        var color = [  //圆球等的颜色
            '#ffd96d',
            '#8cf6f3',
            '#92aef0',
            '#b897e4',
            '#ff5f5b',
            '#ffb66e',
            '#e1f48b'
        ];
        
        var musicList = [  //所有的音乐列表
            'img/Decently leave.mp3',
            'img/Rihanna - Only Girl (In The World).mp3',
            'img/Remix.mp3',
            'img/The Wind Rises.mp3'
        ];
        
        function int(){  //暂停当前播放的音乐，并且将顶端的线条高度设为0。
            audio.pause();  
            audio = null;
            audio = new Audio();
            for(var i=0;i<mList.length;i++){
                mList[i].style.height = '0px';
            };
        }
        
        for(var i=0;i<btn.length;i++){
            btn[i].index = i;
            btn[i].onclick = function(){
                var col = getNum( {min:0,max:7,num:1} )-1;
             
                for(var j=0;j<btn.length;j++){ //将控制音乐的全球相关样式清空
                    btn[j].classList.remove('active');
                    btn[j].style.background = '#FFF';
                    btn[j].parentNode.style.background = '#FFF';
                
                    if(j == btn.length-1){  //如果点击的事暂停按钮，则调用int将音乐停止
                        int();
                       
                        audio.src = musicList[this.index];
                        play();
                        // 获取到当前播放的控制球顶部线条：nowMusic
                        nowMusic = document.querySelectorAll('.lines .progress')[this.index];
                        nowbtn = this;
                        // 获取到当前播放的控制球加上active样式，也就是颜色以及字体颜色的更改
                        this.classList.add('active')
                        this.style.background = color[col];
                        this.parentNode.style.background = color[col];
                        // console.log(color[col],col)
                    }
                };
                
            };
        };
        
        stop.onclick = function(){
            int();
            audio.pause();
        }
        
        //监听音频加载完成触发的事件,canplay:该视频已准备好开始播放时触发
        function play(){
            audio.addEventListener("canplay", function(e) { 
                    analyser = sourceNode = null;
                    setup();
            }, false);
        };
        

        function setup() {
            // 为了得到音频数据创建的对象
            // audioContext:由音频模块链接而成的音频处理图，我们需要依靠这个来处理控制球根据音乐的节奏来上下跳动
            audioContext = audioContext || new AudioContext();

            // 调用音频解码器。createAnalyser()：能创建一个AnalyserNode，可以用来获取音频时间和频率数据，以及实现数据可视化。
            analyser = (analyser || audioContext.createAnalyser());

            //audioContext.createMediaElementSource(audio)：输入某个存在的<audio> 或者 <video> 元素, 对应的音频即可被播放或者修改.
            sourceNode = audioContext.createMediaElementSource(audio);
            //audioContext.destination：一般表示音频渲染设备。
            sourceNode.connect(analyser);
            sourceNode.connect(audioContext.destination);

            audio.play();

            update();
        }
        function update() {
            
            //audio.paused  设置或返回音频/视频是否暂停
            //audio.currentTime 设置或返回音频/视频中的当前播放位置（以秒计）
            //console.log(audio.duration);
            
            nowMusic.style.height = (audio.currentTime/audio.duration)*(nowMusic.parentNode.offsetHeight-50)+'px';
            
            //得到的音频是一个二进制的，需要，解析数据
            freqArray = new Uint8Array(analyser.frequencyBinCount);
            //得到数组
            analyser.getByteFrequencyData(freqArray);

            fn(freqArray);
            
            if(audio.paused){
                freqArray = null;
                for( var i = 0; i < 7; i++ ){
                    // aImg[i].style.cssText = '';
                }
            }else{
                requestAnimationFrame(update);
            }
        };

        function fn(arr){
            var step = Math.round(arr.length / 8); 
            for( var i = 0; i < 7; i++ ){
                var num = arr[i * step];
                var k = (num) / aImg[i].offsetHeight * 100;
                var m = 100 - k;
                var n = (m-30)>0?(m-30):0;
                if(i==0){
                    nowMusic.style.background = 'rgb('+ num +','+ num +','+ num +')';
                    nowbtn.style.webkitTransform = 'translateY('+ -m/2 +'px)';
                };
            }
        }

        
})();
