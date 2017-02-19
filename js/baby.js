/**
 * Created by Administrator on 2016/12/25.
 */
//小鱼
var babyObj=function(){
    this.x;
    this.y;
    this.angle;

    //鱼尾巴的定时器
    this.babyTailTimer=0;
    this.babyTailCount=0;     //用来计数

    //鱼眼镜
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    //鱼闭眼和睁眼之间的时间
    this.babyEyeInterval=300;

    //小鱼的身体
    this.babyBodyTimer=0;
    this.babyBodyCount=0;
}

babyObj.prototype.init=function(){
    this.x=canWidth*0.5-50;     //小鱼在大鱼的左下角
    this.y=canHeight*0.5+50;
    this.angle=0;
}

babyObj.prototype.draw=function(){
    this.x=lerpDistance(mom.x,this.x,0.97);    //鱼随着大鱼移动
    this.y=lerpDistance(mom.y,this.y,0.97);

    //开始计算旋转的角度
    var deltaX=mom.x-this.x;
    var deltaY=mom.y-this.y;
    var rotate=Math.atan2(deltaY,deltaX) + Math.PI;    //因为返回值的范围为(-180,180)，我们要360度旋转
    this.angle=lerpAngle(rotate,this.angle,0.6);

    //动态的改变鱼尾巴
    this.babyTailTimer+=deltaTime;
    if(this.babyTailTimer>50){       //鱼尾动的时间
        //改变
        this.babyTailCount=( this.babyTailCount+1 ) % 8;         //[0-7]的范围
        //时间也要重新计算
        this.babyTailTimer%=50;
    }

    var babyTailCount=this.babyTailCount;

    //动态改变鱼眼镜
    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount=(this.babyEyeCount+1)%2;
        this.babyEyeTimer%=this.babyEyeInterval;

        //要知道鱼到这一秒到底是睁眼还是闭眼
        if(this.babyEyeCount==0){     //说明是闭眼的，要睁眼了
            this.babyEyeInterval = Math.random()*1500 +1500;   //1.5~3.0之间
        }else{
            this.babyEyeInterval = 300;   //睁眼闭上的时间是固定的
        }
    }

    var babyEyeCount=this.babyEyeCount;

    //动态的改变鱼的身体
    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>300){       //鱼身体改变的时间
        //改变
        this.babyBodyCount=this.babyBodyCount+1 ;         //[0-7]的范围
        //时间也要重新计算
        this.babyBodyTimer%=300;
        //一旦鱼的身体这个i如果变成了19，那么小鱼死了，游戏结束
        if(this.babyBodyCount>19){
            this.babyBodyCount=19;
            //游戏结束
            data.gameOver=true;
            data.score=0;
        }
    }

    var babyBodyCount=this.babyBodyCount;

    ctx1.save();
    //移动
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+20,-babyTail[babyTailCount].height*0.5);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);

    ctx1.restore();
}