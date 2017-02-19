/**
 * Created by Administrator on 2016/12/23.
 */
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

//创建背景图片
var bgPic=new Image();

var ane;         //海葵
var fruit;       //果实
var mom;        //大鱼
var baby;       //小鱼

var mx;         //鼠标的x轴
var my;         //鼠标的y轴

var babyTail=[];     //定义小鱼的尾巴
var babyEye=[];     //定义小鱼的眼镜
var babyBody=[];    //定义小鱼的身体

var momTail=[];     //定义大鱼的尾巴
var momEye=[];     //定义大鱼的眼镜
var momBodyOrange=[];        //定义大鱼红色的身体
var momBodyBlue=[];          //定义大鱼蓝色的身体

var data;

var wave;   //大鱼吃果实的时候画的小圆圈

var light;    //大鱼碰小鱼的光圈

window.onload=game();

function game(){
    //游戏初始化
    init();
    lastTime=Date.now();    //获取当前的时间
    gameloop();            //做这个游戏里面所有的动画
}

function init(){
    can1=document.getElementById("canvas1");
    can2=document.getElementById("canvas2");

    can1.addEventListener("mousemove",onMouseMove,false);    //事件

    ctx1=can1.getContext("2d");   //绘制鱼
    ctx2=can2.getContext("2d");  //绘制背景,草，果实

    //定义游戏的数据
    data=new dataObj();

    //在canvas里面绘制图片
    canWidth=can1.width;
    canHeight=can1.height;

    //定义好这个图片的路径
    bgPic.src="./images/background.jpg";
    ctx2.drawImage(bgPic,0,0,canWidth,canHeight);

    ane=new aneObj();      //高内聚，低耦合
    ane.init();      //初始化数据

    fruit=new fruitObj();
    fruit.init();

    mom=new momObj();
    mom.init();

    baby=new babyObj();
    baby.init();

    mx=canWidth*0.5;
    my=canHeight*0.5;

    for(var i=0;i<8;i++){
        babyTail[i]=new Image;
        babyTail[i].src="./images/babyTail"+i+".png";
        momTail[i]=new Image;
        momTail[i].src="./images/bigTail"+i+".png";
    }
    for(var i=0;i<2;i++){
        babyEye[i]=new Image;
        babyEye[i].src="./images/babyEye"+i+".png";
        momEye[i]=new Image;
        momEye[i].src="./images/bigEye"+i+".png";
    }
    for(var i=0;i<20;i++){
        babyBody[i]=new Image;
        babyBody[i].src="./images/babyFade"+i+".png";
    }
    for(var i=0;i<8;i++){
        momBodyOrange[i]=new Image();
        momBodyBlue[i]=new Image();
        momBodyOrange[i].src="./images/bigSwim"+i+".png";
        momBodyBlue[i].src="./images/bigSwimBlue"+i+".png";
    }

    wave=new waveObj();
    wave.init();

    light=new lightObj();
    light.init();
}

function gameloop(){
    requestAnimFrame( gameloop );     //智能计算，计算一次循环所花费的时间，然后，把时间作为定时器的时间
    var now=Date.now();
    //时间差
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>50){
        deltaTime=50;
    }

    ctx2.drawImage(bgPic,0,0,canWidth,canHeight);

    ane.draw();      //开始绘制
    fruit.draw();
    fruitCount();

    //重新清空一下画布
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    momFruitCollision();

    baby.draw();

    momBabyCollision();

    data.draw();

    wave.draw();

    light.draw();
}

function onMouseMove(e){
   if(!data.gameOver){
       //获取鼠标的坐标位置
       mx=e.offsetX;
       my=e.offsetY;
   }
}
