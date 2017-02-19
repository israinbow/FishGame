/**
 * Created by Administrator on 2016/12/25.
 */
//大鱼
var momObj=function(){
    this.x;
    this.y;
    this.angle;
    this.bigBody=new Image();

    //鱼尾巴的定时器
    this.momTailTimer=0;
    this.momTailCount=0;     //用来计数

    //鱼眼镜
    this.momEyeTimer=0;
    this.momEyeCount=0;
    //鱼闭眼和睁眼之间的时间
    this.momEyeInterval=300;

    //鱼身体，当鱼吃到果实的时候，身体才发生改变
    this.momBodyCount=0;
}

momObj.prototype.init=function(){
    this.x=canWidth*0.5;     //大鱼居中
    this.y=canHeight*0.5;
    this.angle=0;
    this.bigBody.src="./images/bigSwim0.png";
}

momObj.prototype.draw=function(){
    this.x=lerpDistance(mx,this.x,0.9);    //鱼随着鼠标移动
    this.y=lerpDistance(my,this.y,0.9);

    //开始计算旋转的角度
    var deltaX=mx-this.x;
    var deltaY=my-this.y;
    var rotate=Math.atan2(deltaY,deltaX) + Math.PI;    //因为返回值的范围为(-180,180)，我们要360度旋转
    this.angle=lerpAngle(rotate,this.angle,0.6);

    //动态的改变鱼尾巴
    this.momTailTimer+=deltaTime;
    if(this.momTailTimer>50){       //鱼尾动的时间
        //改变
        this.momTailCount=( this.momTailCount+1 ) % 8;         //[0-7]的范围
        //时间也要重新计算
        this.momTailTimer%=50;
    }

    var momTailCount=this.momTailCount;

    //动态改变鱼眼镜
    this.momEyeTimer+=deltaTime;
    if(this.momEyeTimer>this.momEyeInterval){
        this.momEyeCount=(this.momEyeCount+1)%2;
        this.momEyeTimer%=this.momEyeInterval;

        //要知道鱼到这一秒到底是睁眼还是闭眼
        if(this.momEyeCount==0){     //说明是闭眼的，要睁眼了
            this.momEyeInterval = Math.random()*1500 +1500;   //1.5~3.0之间
        }else{
            this.momEyeInterval = 300;   //睁眼闭上的时间是固定的
        }
    }

    var momEyeCount=this.momEyeCount;

    var momBodyCount=this.momBodyCount;

    ctx1.save();
    //移动
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
    if(data.double==1){
        //绘制红色的
        ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);
    }else{
        //绘制蓝色的
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
    }

    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5 +30,-momTail[momTailCount].height*0.5);
    ctx1.restore();
}