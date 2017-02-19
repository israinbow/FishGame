/**
 * Created by Administrator on 2016/12/30.
 */
//大鱼吃食物的光圈
var waveObj=function(){
    this.x=[];
    this.y=[];
    this.r=[];
    this.alive=[];           //数量池
};

waveObj.prototype.num=10;

waveObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.x[i]=0;
        this.y[i]=0;
        this.r[i]=0;
        this.alive[i]=false;
    }
};

waveObj.prototype.draw=function(){
    ctx1.save();
    ctx1.lineWidth=2;
    ctx1.shadowBlur=10;      //阴影
    ctx1.shadowColor="white";
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
          this.r[i]+=deltaTime*0.05;
            if(this.r[i]>50){
                this.alive[i]=false;      //足够大的时候就应该消失了
                break;
            }
            var alpha=1-this.r[i]/50;       //模糊程度与半径成反比
            ctx1.beginPath();
            ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
            ctx1.stroke();
            ctx1.closePath();
        }
    }
    ctx1.restore();
};

//大鱼吃到果实了，开始来生成一个小圆圈
waveObj.prototype.born=function(x,y){
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]){
            //出生
            this.alive[i]=true;
            this.x[i]=x;
            this.y[i]=y;
            this.r[i]=10;    //开始时圆心半径为10
            return;
        }
    }
};

