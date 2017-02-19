/**
 * Created by Administrator on 2016/12/24.
 */
//绘制海葵
var aneObj=function(){
    this.x=[];      //控制海葵的x轴的位置
    this.len=[];    //控制海葵的高度
};

aneObj.prototype.num=50;   //有多少条海葵

aneObj.prototype.init=function(){
    //数据赋值
    for(var i=0;i<this.num;i++){
        //定义每一个海葵的大小出来
        this.x[i]=i*16 + Math.random()*20;
        this.len[i]=200 + Math.random()*50;      //200-250
    }
};

aneObj.prototype.draw=function(){
    ctx2.save();
    ctx2.lineWidth=20;
    ctx2.lineCap="round";     //圆角
    ctx2.globalAlpha=0.6;    //透明度
    ctx2.strokeStyle="#3B1441";

    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.x[i],canHeight);        //起始点
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);        //终点
        ctx2.stroke();
    }
    ctx2.restore();
};