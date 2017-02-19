/**
 * Created by Administrator on 2016/12/24.
 */
//绘制果实
var fruitObj=function(){
    this.alive=[];  //判断果实是否消失   boolean
    this.x=[];
    this.y=[];    //果实生成的坐标位置
    this.l=[];    //控制果实生长的大小
    this.speed=[];    //果实成长和离开的速度
    this.fruitType=[];    //果实的类型
    this.orange=new Image();
    this.blue=new Image();
};

fruitObj.prototype.num=30;        //果实的数量

fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=true;      //可以生长
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.fruitType[i]="";
        this.speed[i]=Math.random()*0.02 + 0.003;
        //this.born(i);     //生成果实
    }
    this.orange.src="./images/fruit.png";       //黄色的果实
    this.blue.src="./images/blue.png";          //蓝色的果实
};

fruitObj.prototype.draw=function(){
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            //果实的颜色
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            //判断大小
            if(this.l[i] <= 15){
                //说明果实没有成熟，继续生长
                this.l[i] += this.speed[i]*deltaTime;
            }else{
                //说明果实已经成熟，可以离开海葵了
                this.y[i] -= this.speed[i]*deltaTime*7;
            }

            //ctx1.clearRect(0,0,canWidth,canHeight);

            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

            if(this.y[i]<10){
                //超出屏幕，死亡
                this.alive[i]=false;
            }
        }
    }
};

fruitObj.prototype.born=function(i){
    //生成果实
    //先找到一个海葵
    var aneId=Math.floor( Math.random()*ane.num );
    //然后获取这个海葵的坐标，再绘制
    this.x[i]=ane.x[aneId];
    this.y[i]=canHeight-ane.len[aneId];

    this.l[i]=0;       //重新定义大小
    this.alive[i]=true;

    //控制一下，蓝色果实生成的机率
    var ran=Math.random();
    if(ran<0.15){
        //蓝色
        this.fruitType[i]="blue";
    }else{
        //黄色
        this.fruitType[i]="orange";
    }
};

function fruitCount(){
    //监听在网页里面果实的数量
    var num=0;      //用来放这个屏幕最多生成的果实的数量
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            num++;
        }
    }
    if(num<15){
        sendFruit();      //如果这个屏幕里面的果实少于15个，那么，去生成
        return;
    }
}

function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if( !fruit.alive[i] ){       //只有当果实超出屏幕，或者，被鱼吃掉了，就可以重新绘制了
            fruit.born(i);
            return;
        }
    }
}

//果实被吃掉
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
    return;
}