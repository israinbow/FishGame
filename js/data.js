/**
 * Created by Administrator on 2016/12/28.
 */
//游戏数据
var dataObj=function(){
    this.fruitNum=0;   //吃的果实的个数
    this.double=1;     //蓝色果实的分数翻倍
    this.score=0;      //定义分数
    this.gameOver=false;
    this.alpha=0;     //透明度
};

dataObj.prototype.reset=function(){
    this.fruitNum=0;
    this.double=1;
}

dataObj.prototype.draw=function(){
    ctx1.save();
    ctx1.fillStyle="white";
    ctx1.font="30px 微软雅黑";
    ctx1.textAlign="center";
    ctx1.shadowBlur=10;      //阴影
    ctx1.shadowColor="white";
    ctx1.fillText("SCORE:"+this.score,canWidth*0.5,canHeight-20);
    if(this.gameOver){
        this.alpha+=deltaTime*0.005;
        if(this.alpha>1){
            this.alpha=1;
        }
        ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
        ctx1.fillText("GAMEOVER",canWidth*0.5,canHeight*0.5);
    }
    ctx1.restore();
}