/**
 * Created by Administrator on 2016/12/25.
 */
//碰撞检测
function momFruitCollision(){
    if(!data.gameOver){
        for(var i=0;i<fruit.num;i++){
            if(fruit.alive[i]){
                //计算距离
                var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l<400){
                    //果实会被吃掉
                    fruit.dead(i);
                    //每吃掉一个，就要被就记录一个
                    data.fruitNum++;
                    mom.momBodyCount++;     //大鱼身体变换
                    if(mom.momBodyCount>7){
                        mom.momBodyCount=7;
                    }
                    //如果吃的是蓝色的果实，那么分数就翻倍
                    if(fruit.fruitType[i]=="blue"){
                        data.double=2;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }

}

//大鱼喂小鱼
function momBabyCollision(){
  if( data.fruitNum>0 && !data.gameOver ){
      var l=calLength2(mom.x,mom.y,baby.x,baby.y);
      if(l<900){
          //小鱼满血复活
          baby.babyBodyCount=0;
          data.score+=data.fruitNum*100*data.double;    //分数的改变
          //大鱼吃的果实数据还原
          data.reset();
          mom.momBodyCount=0;    //大鱼的果实喂给小鱼之后，身体要还原
          light.born(baby.x,baby.y);
      }
  }
}